// clova-stt — 태블릿 마이크 소리를 네이버 CLOVA Speech 실시간 인식(gRPC)으로 이어 주는 중계 (10/23, 따라 그리기 시안용)
//   브라우저 ──웹소켓(16kHz·16bit·1채널 PCM)──▶ 이 함수 ──gRPC + 비밀 키──▶ clovaspeech-gw.ncloud.com:50051
//   브라우저 ◀──{type:'tr', text, s, e, al}──── 이 함수 ◀──인식 결과(0.4초 안팎 조각)
// 브라우저 → 함수: 바이너리 = 소리 조각 · 글 {"type":"end"} = 다 말함
// 함수 → 브라우저: {"type":"tr"} 인식 조각 · {"type":"done"} 끝 · {"type":"error","msg"} · {"type":"limit"} 시간 다 됨
// 키: Supabase Secrets CLOVA_SPEECH_SECRET (Basic 「스트리밍 인식」 도메인). JWT 검증 끔 — 공개 키만 확인(ai 함수와 같음).
// 쓴 시간은 ai_usage 에 task 'stt' 로 남긴다(15초 단위 5원, VAT 별도 → 달러로 바꿔 cost_usd).
// 문서: https://api.ncloud-docs.com/docs/ai-application-service-clovaspeech-grpc
import * as grpc from 'npm:@grpc/grpc-js@1.12.6';
import { Buffer } from 'node:buffer';
import { createClient } from 'npm:@supabase/supabase-js@2';

declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void } | undefined;

const MAX_MS = 110_000;           // 한 번 켜서 최대 110초(무료 플랜 함수 벽시계 150초 안)
const KRW_PER_15S = 5, KRW_PER_USD = 1400;   // 비용 기록용 추정 환율

// 수학 낱말 부스팅 — 작업도구/음성인식비교/clova_compare.py 의 BOOST 와 같은 목록(비교에서 89% → 94%)
const BOOST = '엇각,맞꼭지각,동위각,합동,닮음,닮음비,무게중심,중선,판별식,인수분해,이등변삼각형,평행사변형,대변,밑각,꼭짓점,이차방정식,공통,평행,SAS,ASA,SSS,루트,통분,표준형,원주각,중심각,음수,이상,미만,제곱,선분';

// ── nest.proto 를 손으로 인코딩 (필드가 몇 개뿐이라 라이브러리 없이)
//   NestRequest { RequestType type = 1; oneof part { NestConfig config = 2; NestData data = 3; } }   RequestType { CONFIG = 0; DATA = 1; }
//   NestConfig { string config = 1; }   NestData { bytes chunk = 1; string extra_contents = 2; }   NestResponse { string contents = 1; }
const te = new TextEncoder(), td = new TextDecoder();
function varint(n: number): number[] { const o: number[] = []; while (n > 127) { o.push((n & 127) | 128); n >>>= 7; } o.push(n); return o; }
function lenField(no: number, b: Uint8Array): Uint8Array {
  const h = [(no << 3) | 2, ...varint(b.length)]; const o = new Uint8Array(h.length + b.length); o.set(h); o.set(b, h.length); return o;
}
function cat(...a: Uint8Array[]): Uint8Array { const o = new Uint8Array(a.reduce((s, x) => s + x.length, 0)); let i = 0; for (const x of a) { o.set(x, i); i += x.length; } return o; }
const reqConfig = (cfg: unknown) => cat(new Uint8Array([0x08, 0]), lenField(2, lenField(1, te.encode(JSON.stringify(cfg)))));
const reqData = (chunk: Uint8Array, extra: unknown) =>
  cat(new Uint8Array([0x08, 1]), lenField(3, cat(lenField(1, chunk), lenField(2, te.encode(JSON.stringify(extra))))));
function decodeResp(b: Uint8Array): string {
  let i = 0, out = '';
  while (i < b.length) {
    const tag = b[i++]; let len = 0, sh = 0, x;
    if ((tag & 7) !== 2) return out;
    do { x = b[i++]; len |= (x & 127) << sh; sh += 7; } while (x & 128);
    if (tag >> 3 === 1) out += td.decode(b.subarray(i, i + len));
    i += len;
  }
  return out;
}

const env = (k: string) => Deno.env.get(k) || '';
function keysOf(name: string): string[] {   // ai 함수와 같은 방식
  const raw = env(name); if (!raw) return [];
  try { const v = JSON.parse(raw); return typeof v === 'string' ? [v] : Object.values(v).map(String); } catch { return [raw]; }
}
async function logUsage(row: Record<string, unknown>) {
  try {
    const key = keysOf('SUPABASE_SECRET_KEYS')[0] || env('SUPABASE_SERVICE_ROLE_KEY'), url = env('SUPABASE_URL');
    if (!key || !url) return;
    const { error } = await createClient(url, key, { auth: { persistSession: false } }).from('ai_usage').insert(row);
    if (error) console.warn('ai_usage 기록 실패:', error.message);
  } catch (e) { console.warn('ai_usage 기록 실패:', String(e)); }
}

Deno.serve((req) => {
  const u = new URL(req.url);
  const pub = [...keysOf('SUPABASE_PUBLISHABLE_KEYS'), env('SUPABASE_ANON_KEY')].filter(Boolean);
  if (pub.length && !pub.includes(u.searchParams.get('apikey') || '')) return new Response('허용되지 않은 요청', { status: 401 });
  if ((req.headers.get('upgrade') || '').toLowerCase() !== 'websocket') return new Response('웹소켓으로만 연결해요', { status: 426 });
  const secret = env('CLOVA_SPEECH_SECRET');
  const student = (u.searchParams.get('student') || '').slice(0, 60) || null;

  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.binaryType = 'arraybuffer';
  let closed = false, ended = false, bytes = 0, seq = 0, errMsg = '';
  let client: grpc.Client | null = null, call: grpc.ClientDuplexStream<Uint8Array, string> | null = null;
  let quietT: ReturnType<typeof setTimeout> | undefined, limitT: ReturnType<typeof setTimeout> | undefined;
  const send = (o: unknown) => { if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(o)); };
  const finish = () => {   // 네이버 쪽을 닫고 브라우저에 끝을 알린다(여러 번 불려도 한 번만)
    if (closed) return; closed = true;
    clearTimeout(quietT); clearTimeout(limitT);
    try { client?.close(); } catch (_) { /* */ }
    send(errMsg ? { type: 'error', msg: errMsg } : { type: 'done' });
    try { socket.close(); } catch (_) { /* */ }
  };
  // 「다 말함」 뒤에는 남은 소리를 네이버가 다 처리할 때까지 기다렸다 닫는다(바로 닫으면 뒷부분을 버림)
  const quiet = () => { clearTimeout(quietT); quietT = setTimeout(() => { try { call?.end(); } catch (_) { /* */ } setTimeout(finish, 1500); }, 2000); };
  const endTalk = () => {
    if (ended || !call) return; ended = true;
    try { call.write(reqData(new Uint8Array(3200), { seqId: seq++, epFlag: true })); } catch (_) { /* */ }   // 0.1초 무음으로 마무리
    quiet();
  };

  const done = new Promise<void>((resolve) => {
    socket.onclose = () => {
      clearTimeout(quietT); clearTimeout(limitT);
      try { client?.close(); } catch (_) { /* */ }
      closed = true;
      const sec = bytes / 32000;
      const units = Math.ceil(sec / 15);
      logUsage({ kind: 'student', task: 'stt', provider: 'naver', model: 'clova-stream', student_id: student, grade_id: 'trace',
                 input_tokens: Math.round(sec), output_tokens: 0, cost_usd: units * KRW_PER_15S / KRW_PER_USD,
                 ok: !errMsg, error: errMsg || null }).finally(resolve);
    };
  });
  try { EdgeRuntime?.waitUntil(done); } catch (_) { /* */ }

  socket.onopen = () => {
    if (!secret) { errMsg = '서버에 CLOVA 키가 없어요'; return finish(); }
    try {
      client = new grpc.Client('clovaspeech-gw.ncloud.com:50051', grpc.credentials.createSsl());
      const md = new grpc.Metadata(); md.add('authorization', 'Bearer ' + secret);
      call = client.makeBidiStreamRequest('/com.nbp.cdncp.nest.grpc.proto.v1.NestService/recognize',
        (b: Uint8Array) => Buffer.from(b), (b: Buffer) => decodeResp(new Uint8Array(b)), md) as grpc.ClientDuplexStream<Uint8Array, string>;
    } catch (e) { errMsg = '음성 인식 서버에 연결하지 못했어요 (' + String(e) + ')'; return finish(); }
    call.on('data', (s: string) => {
      let j: any; try { j = JSON.parse(s); } catch { return; }
      const t = j.transcription;
      if (t && typeof t.text === 'string') {
        send({ type: 'tr', text: t.text, s: t.startTimestamp, e: t.endTimestamp, ep: !!t.epFlag,
               al: (t.alignInfos || []).map((a: any) => [a.word, a.start, a.end]) });
      }
      if (ended) quiet();
    });
    call.on('error', (e: grpc.ServiceError) => {
      if (!closed && e.code !== grpc.status.CANCELLED) errMsg = '음성 인식 오류: ' + (e.details || e.message);
      finish();
    });
    call.on('end', finish);
    call.write(reqConfig({ transcription: { language: 'ko' }, keywordBoosting: { boostings: [{ words: BOOST, weight: 1 }] } }));
    limitT = setTimeout(() => { send({ type: 'limit' }); endTalk(); }, MAX_MS);
  };
  socket.onmessage = (ev) => {
    if (closed || !call) return;
    if (typeof ev.data === 'string') { try { if (JSON.parse(ev.data).type === 'end') endTalk(); } catch (_) { /* */ } return; }
    if (ended) return;
    const b = new Uint8Array(ev.data as ArrayBuffer); if (!b.length) return;
    bytes += b.length;
    try { call.write(reqData(b, { seqId: seq++, epFlag: false })); } catch (_) { /* */ }
  };
  socket.onerror = () => finish();
  return response;
});
