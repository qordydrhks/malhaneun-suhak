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

// 수학 낱말 부스팅(10/24 마스터 「초중고 수학 낱말 충분히 · 발음이 어렵거나 섞이기 쉬운 것은 전부」)
//   BOOST = 초3~고등 교과 낱말(가중치 1) · BOOST_HARD = 발음이 어렵거나 비슷한 소리와 섞이는 낱말(가중치 2: 평행사변형·동위각·밑각·닮음비 …)
//   한 글자 낱말(면·호·근·해·비 …)은 아무 말에나 끼어들 수 있어 넣지 않는다. 띄어쓰기 없이 쉼표로만(네이버 문서: 공백도 낱말 일부)
//   같은 녹음 20문장 시험: 예전 31낱말 98/104 → 이 목록 100/104(「닮음 b」→닮음비, 「넓이의 b」→넓이의비), 나빠진 문장 없음
//   작업도구/음성인식비교/clova_compare.py 가 이 두 줄을 읽어 같은 목록으로 비교한다
const BOOST = '덧셈,뺄셈,곱셈,세로셈,나머지,나누어떨어진다,자연수,짝수,홀수,분수,단위분수,소수,소수점,소수첫째자리,약수,배수,공통분모,혼합계산,계산순서,어림,어림하기,올림,버림,반올림,이상,이하,초과,미만,수직선,수의범위,규칙과대응,선분,반직선,직선,직각,예각,둔각,평각,각도기,각도,삼각형,사각형,직각삼각형,예각삼각형,둔각삼각형,수직,평행,평행선,평행선사이의거리,직사각형,정사각형,다각형,정다각형,오각형,육각형,정육각형,팔각형,원의중심,컴퍼스,원주,원의넓이,원의둘레,둘레,넓이,밑변,높이,윗변,아랫변,제곱센티미터,제곱미터,제곱킬로미터,세제곱센티미터,세제곱미터,밀리리터,리터,센티미터,밀리미터,킬로미터,킬로그램,합동,대칭의중심,밑면,옆면,각기둥,각뿔,원기둥,원뿔,모선,쌓기나무,앞에서본모양,옆에서본모양,위에서본모양,비율,백분율,퍼센트,기준량,비교하는양,비례식,비례배분,외항,내항,비의성질,평균,가능성,막대그래프,꺾은선그래프,그림그래프,띠그래프,원그래프,물결선,정수,실수,양수,음수,양의정수,음의정수,소인수분해,소인수,거듭제곱,지수,루트,유한소수,무한소수,일차식,다항식,단항식,등식,방정식,항등식,일차방정식,가감법,대입법,일차부등식,연립부등식,함수,함숫값,정의역,치역,공역,좌표,좌표평면,순서쌍,원점,x좌표,y좌표,x축,y축,일차함수,정비례,반비례,그래프,평행이동,대칭이동,사분면,제1사분면,제2사분면,제3사분면,제4사분면,일반형,중근,서로다른두근,곱셈공식,전개,치환,교점,교선,작도,눈금없는자,합동조건,SSS,ASA,SAS,RHA,RHS,외각,내각,내각의크기의합,외각의크기의합,접점,접선의길이,다면체,회전체,정다면체,정사면체,정팔면체,정십이면체,정이십면체,겉넓이,부피,옆넓이,닮음,부피의비,길이의비,닮음의위치,삼각형의중점연결정리,사인,코사인,탄젠트,확률,도수분포표,계급,계급값,도수,도수분포다각형,줄기와잎그림,산점도,상관관계,복소수,허수단위,실근,허근,근과계수의관계,이차부등식,두점사이의거리,직선의방정식,점과직선사이의거리,원의방정식,집합,원소,부분집합,진부분집합,공집합,합집합,교집합,벤다이어그램,명제,진리집합,필요조건,충분조건,귀류법,절대부등식,산술평균,기하평균,일대일함수,일대일대응,항등함수,상수함수,유리함수,무리함수,순열,조합,팩토리얼,로그,지수함수,로그함수,삼각함수,라디안,호도법,주기,등차중항,등비중항,수학적귀납법,극한,수렴,발산,연속,접선의기울기,증가,감소,극대,극소,최댓값,최솟값,적분상수,속도,가속도,미분,적분,더하기,빼기,곱하기,나누기,플러스,마이너스,제곱,세제곱,괄호,등호,부등호,분의,공통';
const BOOST_HARD = '평행사변형,이등변삼각형,정삼각형,맞꼭지각,동위각,엇각,밑각,대변,대각,대각선,꼭짓점,사다리꼴,마름모,직육면체,정육면체,겨냥도,전개도,모서리,받아올림,받아내림,나눗셈,약분,통분,기약분수,대분수,가분수,진분수,분모,분자,최대공약수,최소공배수,공약수,공배수,선대칭도형,점대칭도형,대칭축,대응변,대응각,대응점,원주율,반지름,지름,원주각,중심각,부채꼴,접선,할선,외접원,내접원,무게중심,외심,내심,중선,수선,수직이등분선,판별식,근의공식,인수분해,완전제곱식,이차방정식,이차함수,포물선,축의방정식,표준형,절댓값,순환소수,순환마디,유리수,무리수,제곱근,근호,분모의유리화,동류항,이항,계수,차수,상수항,연립방정식,부등식,기울기,x절편,y절편,닮음비,넓이의비,피타고라스정리,빗변,삼각비,산포도,편차,분산,표준편차,최빈값,중앙값,대푯값,히스토그램,상대도수,경우의수,조립제법,나머지정리,인수정리,켤레복소수,허수,내분점,외분점,여집합,차집합,대우,필요충분조건,합성함수,역함수,점근선,상용로그,진수,등차수열,등비수열,공차,공비,시그마,점화식,도함수,미분계수,극댓값,극솟값,변곡점,정적분,부정적분';

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
    call.write(reqConfig({ transcription: { language: 'ko' }, keywordBoosting: { boostings: [{ words: BOOST, weight: 1 }, { words: BOOST_HARD, weight: 2 }] } }));
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
