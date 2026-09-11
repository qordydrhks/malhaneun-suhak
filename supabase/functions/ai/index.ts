// 말하는 수학 — AI 중계 서버 (Supabase Edge Function 'ai')  [v80.0]
//
// 왜 필요한가: 유료 AI 키를 브라우저에 두면 누구나 꺼내 쓸 수 있다.
//   키 두 개(Gemini·Claude)는 이 서버의 '비밀값(Secrets)'에만 두고, 앱은 이 함수만 부른다.
//
// 무엇을 어디로 보내나 (마스터 결정 2026-09-10):
//   · 채점·힌트·빈칸·대화·이의제기·리포트  → Gemini 2.5 Flash (싸다, 매일 반복)
//   · 문제 출제(quiz)·검산(verify)          → Claude Opus 5 — 단, '출제 비밀번호'가 맞을 때만.
//     비밀번호 없이 오면 Gemini로 만든다(학생이 아직 안 만들어진 소단원을 열었을 때 막히지 않게).
//
// 대시보드 → Edge Function Secrets 에 넣을 값
//   필수: GEMINI_API_KEY, ANTHROPIC_API_KEY, DD_GEN_TOKEN(출제 비밀번호, 길고 무작위로)
//   선택: DD_DAILY_BUDGET_USD(학생 하루 예산, 기본 5) · DD_GEN_DAILY_BUDGET_USD(출제 하루 예산, 기본 30)
//         DD_STUDENT_DAILY_CALLS(학생 1명 하루 호출, 기본 300) · DD_EFFORT_QUIZ / DD_EFFORT_VERIFY(기본 high)
//         DD_GEMINI_MODEL(기본 gemini-2.5-flash)
// 이 함수는 JWT 검증을 꺼야 한다(앱은 공개 키 sb_publishable_ 만 보낸다). 대신 아래에서 공개 키를 직접 확인한다.

import Anthropic from 'npm:@anthropic-ai/sdk';
import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const env = (k: string, d = '') => Deno.env.get(k) ?? d;
const num = (k: string, d: number) => {
  const v = Number(Deno.env.get(k));
  return Number.isFinite(v) && v > 0 ? v : d;
};
function httpErr(status: number, message: string) {
  const e: any = new Error(message);
  e.status = status;
  return e;
}
// SUPABASE_PUBLISHABLE_KEYS / SUPABASE_SECRET_KEYS 는 JSON 사전이다. 이름에 상관없이 값만 꺼낸다.
function keysOf(name: string): string[] {
  const raw = Deno.env.get(name);
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    if (typeof v === 'string') return [v];
    return Object.values(v).map(String);
  } catch {
    return [raw];
  }
}

const GEMINI_MODEL = env('DD_GEMINI_MODEL', 'gemini-2.5-flash');
const OPUS_MODEL = 'claude-opus-5';
// 100만 토큰당 달러 [입력, 출력] — 2026-09 공식 가격표. 비용 '기록'용이며 실제 청구는 각 회사 콘솔이 정답.
const PRICE: Record<string, [number, number]> = {
  'claude-opus-5': [5, 25],
  'claude-opus-4-8': [5, 25], // 거절 시 대체 모델로 넘어갈 수 있다(같은 가격)
  'gemini-2.5-flash': [0.3, 2.5],
  'gemini-2.5-flash-lite': [0.1, 0.4],
};
const TASKS = new Set(['grade', 'hint', 'blanks', 'appeal', 'talk', 'report', 'comment', 'misc', 'quiz', 'verify']);
const GEN_TASKS = new Set(['quiz', 'verify']);

// 앱의 parseQuiz / verifyQuiz 가 기대하는 모양 그대로. 형식을 강제해 'JSON 깨짐 → 재시도' 비용을 없앤다.
const QUIZ_SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          stem: { type: 'string' },
          choices: { type: 'array', items: { type: 'string' } },
          answer: { type: 'integer' },
          answer_text: { type: 'string' },
          explain: { type: 'string' },
          type: { type: 'string' },
        },
        required: ['stem', 'choices', 'answer', 'answer_text', 'explain', 'type'],
        additionalProperties: false,
      },
    },
  },
  required: ['items'],
  additionalProperties: false,
};
const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    checks: {
      type: 'array',
      items: {
        type: 'object',
        properties: { i: { type: 'integer' }, correct: { type: 'integer' }, why: { type: 'string' } },
        required: ['i', 'correct', 'why'],
        additionalProperties: false,
      },
    },
  },
  required: ['checks'],
  additionalProperties: false,
};

let _db: any = null;
function db() {
  if (_db) return _db;
  const key = keysOf('SUPABASE_SECRET_KEYS')[0] || env('SUPABASE_SERVICE_ROLE_KEY');
  const url = env('SUPABASE_URL');
  if (!key || !url) return null;
  _db = createClient(url, key, { auth: { persistSession: false } });
  return _db;
}

function flatten(messages: any[]): string {
  return (messages || [])
    .map((m: any) =>
      typeof m?.content === 'string'
        ? m.content
        : Array.isArray(m?.content)
          ? m.content.map((c: any) => c?.text || '').join('')
          : '',
    )
    .join('\n');
}

// ── Gemini: 예전에 브라우저에서 하던 호출을 그대로 옮겼다(사고 끔, 잘리면 예산 2배로 한 번 더) ──
async function callGemini(system: string, user: string, maxTokens: number) {
  const key = env('GEMINI_API_KEY');
  if (!key) throw httpErr(500, '서버에 GEMINI_API_KEY 비밀값이 없어요.');
  const ask = async (budget: number) => {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig: { maxOutputTokens: budget, temperature: 0.4, thinkingConfig: { thinkingBudget: 0 } },
        }),
      },
    );
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      if (r.status === 429) throw httpErr(429, '지금 AI에 요청이 몰렸어요. 잠시 뒤 다시 해 주세요.');
      throw httpErr(502, `Gemini 오류 (${r.status}) ${t.slice(0, 200)}`);
    }
    const d = await r.json();
    const c = (d.candidates || [])[0] || {};
    const text = ((c.content && c.content.parts) || []).map((p: any) => p.text || '').join('');
    const u = d.usageMetadata || {};
    return {
      text,
      cut: c.finishReason === 'MAX_TOKENS',
      inTok: u.promptTokenCount || 0,
      outTok: (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0),
    };
  };
  const base = Math.min(Math.max(maxTokens || 1200, 512), 4000);
  let o = await ask(base);
  let inTok = o.inTok, outTok = o.outTok;
  if ((o.cut || !o.text) && base < 4000) {
    const o2 = await ask(Math.min(base * 2, 4000));
    inTok += o2.inTok;
    outTok += o2.outTok;
    o = o2;
  }
  if (!o.text) throw httpErr(502, 'AI 응답이 비어 있어요.');
  return { text: o.text, model: GEMINI_MODEL, inTok, outTok };
}

// ── Claude Opus 5: 문제 출제·검산 전용 ──
//   · 생각(thinking)은 기본으로 켜져 있다. max_tokens 는 '생각+답' 전체 한도라 넉넉히 16000.
//   · fallbacks:"default" — 안전 분류기가 거절하면 서버에서 대체 모델로 이어 준다(권장 설정).
//   · 무료 플랜 함수 제한이 150초라 SDK 제한시간을 140초·재시도 1번으로 둔다.
let _claude: any = null;
async function callOpus(task: string, system: string, user: string) {
  const key = env('ANTHROPIC_API_KEY');
  if (!key) throw httpErr(500, '서버에 ANTHROPIC_API_KEY 비밀값이 없어요.');
  if (!_claude) _claude = new Anthropic({ apiKey: key, maxRetries: 1, timeout: 140_000 });
  const isVerify = task === 'verify';
  const params: any = {
    model: OPUS_MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system,
    messages: [{ role: 'user', content: user }],
    output_config: {
      effort: isVerify ? env('DD_EFFORT_VERIFY', 'high') : env('DD_EFFORT_QUIZ', 'high'),
      format: { type: 'json_schema', schema: isVerify ? VERIFY_SCHEMA : QUIZ_SCHEMA },
    },
  };
  const r: any = await _claude.beta.messages.create(params);
  if (r.stop_reason === 'refusal') throw httpErr(422, 'AI가 이 요청을 거절했어요.');
  if (r.stop_reason === 'max_tokens') throw httpErr(502, 'AI 답이 길이 제한에 걸려 잘렸어요.');
  const text = (r.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('');
  const u = r.usage || {};
  const inTok = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
  return { text, model: String(r.model || OPUS_MODEL), inTok, outTok: u.output_tokens || 0 };
}

// ── 오늘 쓴 돈·학생 호출 수 (SQL 함수 dd_ai_today) ──
async function today(kind: string, student: string | null) {
  const d = db();
  if (!d) return { spent: 0, calls: 0, ok: false };
  const { data, error } = await d.rpc('dd_ai_today', { p_kind: kind, p_student: student || '' });
  if (error || !data || !data[0]) return { spent: 0, calls: 0, ok: false };
  return { spent: Number(data[0].spent) || 0, calls: Number(data[0].student_calls) || 0, ok: true };
}
async function log(row: Record<string, unknown>) {
  const d = db();
  if (!d) return false;
  const { error } = await d.from('ai_usage').insert(row);
  if (error) {
    console.warn('ai_usage 기록 실패:', error.message);
    return false;
  }
  return true;
}
async function report(body: any) {
  const d = db();
  if (!d) return { error: { message: '서버가 DB에 연결되지 않았어요.' } };
  const from = String(body.from || ''), to = String(body.to || '');
  const [a, b] = await Promise.all([
    d.rpc('dd_ai_report', { p_from: from, p_to: to }),
    d.rpc('dd_ai_report_students', { p_from: from, p_to: to }),
  ]);
  return { rows: a.data || [], students: b.data || [], error: a.error?.message || b.error?.message || null };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: { message: 'POST 요청만 받아요.' } }, 405);

  // 공개 키 확인 — 앱 HTML에 들어 있는 sb_publishable_ 키만 통과. (키 자체는 공개라 이것만으로 막을 순 없다.
  //   진짜 방어는 아래의 하루 예산·학생 호출 한도와 출제 비밀번호다.)
  const pub = [...keysOf('SUPABASE_PUBLISHABLE_KEYS'), env('SUPABASE_ANON_KEY')].filter(Boolean);
  if (pub.length && !pub.includes(req.headers.get('apikey') || '')) {
    return json({ error: { message: '허용되지 않은 요청이에요.' } }, 401);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: { message: '요청 형식이 잘못됐어요.' } }, 400);
  }
  const task = String(body?.task || 'misc');
  const genOK = !!env('DD_GEN_TOKEN') && body?.gen_token === env('DD_GEN_TOKEN');

  if (task === 'ping') {
    return json({
      ok: true,
      gen: genOK,
      gemini: !!env('GEMINI_API_KEY'),
      claude: !!env('ANTHROPIC_API_KEY'),
      logging: (await today('student', null)).ok,
      version: 'v80.0',
    });
  }
  if (task === 'usage') {
    if (!genOK) return json({ error: { message: '출제 비밀번호가 맞지 않아요.' } }, 403);
    return json(await report(body));
  }
  if (!TASKS.has(task)) return json({ error: { message: '알 수 없는 작업이에요.' } }, 400);

  const system = String(body.system || '');
  const user = flatten(body.messages) || String(body.user || '');
  if (system.length + user.length > 40000) return json({ error: { message: '요청이 너무 길어요.' } }, 413);

  const useOpus = GEN_TASKS.has(task) && genOK;
  const kind = useOpus ? 'gen' : 'student';
  const sid = body.student_id ? String(body.student_id).slice(0, 64) : null;

  const t = await today(kind, sid);
  const budget = kind === 'gen' ? num('DD_GEN_DAILY_BUDGET_USD', 30) : num('DD_DAILY_BUDGET_USD', 5);
  if (t.spent >= budget) {
    return json({
      error: {
        code: 'budget',
        message: kind === 'gen'
          ? '오늘 문제 만들기 예산을 다 썼어요. 내일 이어서 해 주세요.'
          : '오늘 AI 사용 한도를 다 썼어요. 선생님께 말씀해 주세요.',
      },
    }, 429);
  }
  if (kind === 'student' && sid && t.calls >= num('DD_STUDENT_DAILY_CALLS', 300)) {
    return json({ error: { code: 'student_cap', message: '오늘은 AI를 충분히 썼어요. 내일 다시 해 봐요!' } }, 429);
  }

  const base = {
    kind,
    task,
    provider: useOpus ? 'anthropic' : 'google',
    student_id: sid,
    grade_id: body.grade_id ? String(body.grade_id).slice(0, 32) : null,
    unit_id: body.unit_id != null ? String(body.unit_id).slice(0, 64) : null,
  };
  try {
    const out = useOpus
      ? await callOpus(task, system, user)
      : await callGemini(system, user, Number(body.max_tokens) || 1200);
    const p = PRICE[out.model] || PRICE[useOpus ? OPUS_MODEL : GEMINI_MODEL] || [0, 0];
    const cost = (out.inTok * p[0] + out.outTok * p[1]) / 1e6;
    const logged = await log({ ...base, model: out.model, input_tokens: out.inTok, output_tokens: out.outTok, cost_usd: cost, ok: true });
    return json({
      content: [{ type: 'text', text: out.text }],
      model: out.model,
      usage: { input_tokens: out.inTok, output_tokens: out.outTok, cost_usd: cost },
      logged,
    });
  } catch (e: any) {
    await log({ ...base, model: useOpus ? OPUS_MODEL : GEMINI_MODEL, ok: false, error: String(e?.message || e).slice(0, 300) });
    const status = Number(e?.status) >= 400 && Number(e?.status) < 600 ? Number(e.status) : 502;
    return json({ error: { message: String(e?.message || 'AI 호출 중 오류가 났어요.') } }, status);
  }
});
