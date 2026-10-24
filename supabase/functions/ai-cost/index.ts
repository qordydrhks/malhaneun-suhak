// ai-cost — 선생님 화면 「💰 AI 비용」(10/24 마스터 「얼마나 썼는지 실시간으로 선생님 화면에서」)
// ai_usage 표(앱은 못 읽음)를 비밀 키로 읽어 오늘·이번 달 합계와 학생별 합계를 돌려준다.
// 선생님 PIN 을 확인한 요청만(공유 저장소 config:teacherPin 의 sha256, 처음은 0000). JWT 검증 끔 — 공개 키만 확인(ai 함수와 같음).
// 금액은 달러(cost_usd, 공식 단가로 계산한 추정치) 그대로 주고 원화는 화면에서 바꾼다.
import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8' } });
const env = (k: string) => Deno.env.get(k) || '';
function keysOf(name: string): string[] {   // ai 함수와 같은 방식
  const raw = env(name); if (!raw) return [];
  try { const v = JSON.parse(raw); return typeof v === 'string' ? [v] : Object.values(v).map(String); } catch { return [raw]; }
}
const sha256 = async (t: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))).map((b) => b.toString(16).padStart(2, '0')).join('');

type Sum = { n: number; usd: number; sec: number };
const zero = (): Sum => ({ n: 0, usd: 0, sec: 0 });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST 요청만 받아요.' }, 405);
  const pub = [...keysOf('SUPABASE_PUBLISHABLE_KEYS'), env('SUPABASE_ANON_KEY')].filter(Boolean);
  if (pub.length && !pub.includes(req.headers.get('apikey') || '')) return json({ error: '허용되지 않은 요청이에요.' }, 401);
  let body: any = {}; try { body = await req.json(); } catch { /* */ }

  const key = keysOf('SUPABASE_SECRET_KEYS')[0] || env('SUPABASE_SERVICE_ROLE_KEY');
  if (!key || !env('SUPABASE_URL')) return json({ error: '서버가 DB 에 연결되지 않았어요.' }, 500);
  const d = createClient(env('SUPABASE_URL'), key, { auth: { persistSession: false } });

  // 선생님 PIN 확인
  const { data: cfg } = await d.from('ai_cache').select('value').eq('key', 'config:teacherPin').maybeSingle();
  const want = (cfg && (cfg as any).value && (cfg as any).value.hash) || await sha256('0000');
  if (await sha256(String(body.pin || '')) !== want) return json({ error: 'PIN이 맞지 않아요.' }, 403);

  // 한국 날짜 기준 오늘 · 이번 달
  const kst = new Date(Date.now() + 9 * 3600e3), today = kst.toISOString().slice(0, 10), month = today.slice(0, 8) + '01';
  const rows: any[] = [];
  for (let i = 0; i < 50; i++) {   // 1000줄씩 최대 5만 줄
    const { data, error } = await d.from('ai_usage').select('day,kind,task,student_id,input_tokens,cost_usd').gte('day', month).order('id').range(i * 1000, i * 1000 + 999);
    if (error) return json({ error: '기록을 읽지 못했어요: ' + error.message }, 500);
    rows.push(...(data || [])); if (!data || data.length < 1000) break;
  }
  const part = (r: any) => r.task === 'stt' ? 'stt' : r.kind === 'gen' ? 'gen' : 'ai';   // 음성 인식 · 문제 출제(Opus) · AI 채점·도움(Gemini)
  const tot = { today: { stt: zero(), ai: zero(), gen: zero() } as Record<string, Sum>, month: { stt: zero(), ai: zero(), gen: zero() } as Record<string, Sum> };
  const stu: Record<string, Record<string, Sum>> = {};
  for (const r of rows) {
    const p = part(r), usd = Number(r.cost_usd) || 0, sec = p === 'stt' ? Number(r.input_tokens) || 0 : 0;
    const add = (s: Sum) => { s.n++; s.usd += usd; s.sec += sec; };
    add(tot.month[p]); if (r.day === today) add(tot.today[p]);
    if (r.student_id && r.kind === 'student') { const s = stu[r.student_id] ||= { stt: zero(), ai: zero() }; add(s[p === 'stt' ? 'stt' : 'ai']); }
  }
  return json({ today, month, ...tot, students: stu, at: Date.now() });
});
