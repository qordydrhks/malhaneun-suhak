/* 새 앱 — mission(문제 풀기). 이름(마스터 10/8): 회차마다 mission 1 · 2 · 3, 응용은 hard mission 1 처럼 앞에 붙인다.
   · 행성(소단원)의 한 회차 질문을 다 통과하면 그 회차의 mission 이 열린다.
   · 문제는 AI 가 이번 회차에 학생이 말로 설명한 질문을 바탕으로 4지선다로 만들고, 다른 호출로 다시 풀어 정답이 같을 때만 낸다(옛 앱 v80.6 과 같은 방식).
     만든 세트는 공유 저장소(ai_cache appquiz:…)에 두고 모두가 같이 쓴다.
   · 점수는 처음 푼 결과만 남는다(다시 풀기는 연습). hard mission 은 선택 — 맞히면 더하고 틀려도 깎지 않는다.
   · 기록: quiz_logs (옛 선생님 화면 · rounds.js 와 같은 모양, level 'r<회차>', hard 는 unit_label 끝에 ' · 응용 도전') */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const M = A.M = {};
  M.name = (r, hard) => (hard ? 'hard mission ' : 'mission ') + r;
  /* 미리 만든 세트(마스터 10/20 — Claude 가 만들고 검산한 5지선다·누르기, data/mis_<학년>.js). 있으면 AI 대신 이것을 쓴다 */
  const preset = (s, r, hard) => { const g = (window.APP_MIS || {})[A.cid()]; const q = g && g[s.code + ':r' + r + ':' + (hard ? 'hard' : 'basic')]; return q && q.length ? q : null; };
  M.count = (s, r) => { const p = preset(s, r, false); return p ? p.length : r === 3 ? Math.min(5, Math.max(2, s.ladder.length)) : (+s.quiz[String(r)] || 2); };
  const key = (s, r, hard) => 'appquiz:' + A.cid() + ':' + s.code + ':r' + r + ':' + (hard ? 'hard' : 'basic');
  // 진도: P.mis[코드:r회차] = {basic:{c,n,at}, hard:{c,n,at}}
  M.done = (s, r, hard) => { const m = (E.prog().mis || {})[s.code + ':r' + r]; return !!(m && m[hard ? 'hard' : 'basic']); };
  M.result = (s, r, hard) => ((E.prog().mis || {})[s.code + ':r' + r] || {})[hard ? 'hard' : 'basic'] || null;
  M.ready = (s, r) => { const c = E.count(s, r); return c.n > 0 && c.done === c.n; };   // 회차 질문을 다 통과했나

  const NOTE = `[수식 표기] 분수는 3/5, 대분수는 "2와 1/3"처럼, 곱셈 ×, 나눗셈 ÷, 각도 40°, 길이 5 cm. 역슬래시·LaTeX·마크다운 금지.`;
  const LEVEL = {
    basic: "초등 #학년 대상이야. 이번 문제는 '기본 확인' 수준이야. 이 소단원 개념을 제대로 이해한 학생이면 풀 수 있게 만들고, 꼬아 놓은 함정이나 여러 단계 응용은 넣지 마. 숫자 계산은 간단하게.",
    hard: "초등 #학년 대상이야. 단, '디딤돌 기본+응용' 교재의 응용·심화 수준으로 출제해. 계산 자체는 복잡하지 않게 하되, 개념을 정확히 이해하고 한 단계 더 생각해야(적용·비교·판단·거꾸로 생각하기) 풀 수 있는 문제로 만들어. 단순 사실 확인·정의 되묻기는 금지."
  };
  const sanitize = raw => String(raw || '').replace(/```json/gi, '').replace(/```/g, '').replace(/[\u0000-\u001F]+/g, ' ').replace(/\\(?!["\\\/bfnrtu])/g, '').trim();
  const parseObj = t => { t = sanitize(t); try { return JSON.parse(t); } catch (e) {} const a = t.indexOf('{'), b = t.lastIndexOf('}'); if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) {} } return null; };
  const norm = s => String(s || '').replace(/\s+/g, '').replace(/[.,'"]/g, '');
  function parseQuiz(raw) {
    const o = parseObj(raw); const items = (o && Array.isArray(o.items)) ? o.items : [];
    return items.filter(it => it && typeof it.stem === 'string' && Array.isArray(it.choices) && it.choices.length === 4).map(it => {
      const choices = it.choices.map(String); let answer = Number.isInteger(it.answer) ? it.answer : -1;
      if (typeof it.answer_text === 'string') { const k = choices.findIndex(c => norm(c) === norm(it.answer_text)); if (k >= 0) answer = k; }
      return {stem: it.stem.trim(), choices, answer, explain: String(it.explain || '').trim()};
    }).filter(it => it.answer >= 0 && it.answer <= 3);
  }
  async function verify(items, s) {
    const sys = `너는 수학 검산 담당이야. 아래 4지선다 문항을 네가 직접 처음부터 풀어. 출제자가 어떤 보기를 정답으로 생각했는지는 몰라. 옳은 보기가 하나면 그 번호(0-based), 없거나 둘 이상이면 -1. 반드시 JSON만: {"checks":[{"i":0,"correct":2}]}`;
    const body = items.map((it, i) => `[문항 ${i}]\n${it.stem}\n` + it.choices.map((c, k) => `${k}) ${c}`).join('\n')).join('\n\n');
    let o = null;
    try { o = parseObj(await A.ai({task: 'verify', system: sys, messages: [{role: 'user', content: '[학년] 초' + A.gradeNo() + '-2\n[개념] ' + s.title + '\n\n' + body}], max_tokens: 1500, grade_id: A.cid(), unit_id: s.unitId})); } catch (e) {}
    if (!o || !Array.isArray(o.checks)) return items;
    return items.filter((it, i) => { const ck = o.checks.find(c => Number(c.i) === i); return !ck || Number(ck.correct) === it.answer; });
  }
  const inflight = {};
  M.get = (s, r, hard) => {
    const pre = preset(s, r, hard); if (pre) return Promise.resolve(pre);
    const k = key(s, r, hard);
    if (!inflight[k]) inflight[k] = (async () => {
      const cached = await A.store.get(k);
      if (cached && cached.quiz && cached.quiz.length) return cached.quiz;
      const N = M.count(s, r);
      const qs = r === 3 ? s.ladder.map(x => x.q) : s.items.filter(it => it.r === r).map(it => it.q + ' → ' + it.ans);
      const sys = `너는 초등 수학 선생님이야. 학생이 방금 아래 [소단원]의 질문에 말로 답하는 학습을 마쳤어. 이제 그 내용을 "실제로 적용"해야 풀 수 있는 4지선다 문제를 정확히 ${N}개 만들어.
${LEVEL[hard ? 'hard' : 'basic'].replace('#', A.gradeNo())}
[출제 원칙]
- ${N}문제가 서로 다른 내용을 겨냥해. 숫자만 바꾼 같은 문제 금지. 이 소단원 밖(다음 학년·다른 단원)으로 새지 마.
- 아래 질문에 나온 식·숫자는 그대로 쓰지 말고 다른 수로.
- 그림이 있어야만 풀리는 문제 금지. 글만 읽고 풀 수 있게 조건을 문장으로 다 써.
- 오답 3개는 학생들이 실제로 자주 하는 실수의 결과로. 엉뚱한 보기 금지. 정답 위치는 문제마다 다르게.
- 해설은 왜 그 답인지 한두 문장, 결론은 정답 보기와 같은 값.
- 문제를 직접 끝까지 풀고, answer_text 에 정답 보기 텍스트를 그대로 복사해.
${NOTE}
반드시 JSON만: {"items":[{"stem":"문제","choices":["보기1","보기2","보기3","보기4"],"answer":0,"answer_text":"정답 보기 그대로","explain":"해설"}]}`;
      const user = `[학년/교재] 초등 ${A.gradeNo()}학년 2학기\n[소단원] ${s.title}\n[이번 회차에 학생이 말로 설명한 질문]\n${qs.map(q => '- ' + q).join('\n')}`;
      let best = null;
      for (let round = 0; round < 2; round++) {
        let made = null;
        for (let t = 0; t < 2 && !(made && made.length); t++) {
          try { made = parseQuiz(await A.ai({task: 'quiz', system: sys + (t ? '\n[재시도] 순수 JSON만, 문자열 안 줄바꿈·역슬래시 없이.' : ''), messages: [{role: 'user', content: user}], max_tokens: 3000, grade_id: A.cid(), unit_id: s.unitId})); } catch (e) { if (round && t) throw e; }
        }
        if (made && made.length) made = await verify(made, s);
        if (made && made.length >= N) { best = made.slice(0, N); break; }
        if (made && (!best || made.length > best.length)) best = made;
      }
      if (!best || !best.length) throw new Error('문제를 만들지 못했어. 잠시 뒤에 다시 해 줘.');
      await A.store.set(k, {quiz: best, at: new Date().toISOString(), by: 'app'});
      return best;
    })().catch(e => { delete inflight[k]; throw e; });
    return inflight[k];
  };
  M.prefetch = (s, r) => { M.get(s, r, false).catch(() => {}); };
  M.save = async (big, s, r, hard, c, n) => {
    const P = E.prog(); P.mis = P.mis || {};
    const slot = (P.mis[s.code + ':r' + r] = P.mis[s.code + ':r' + r] || {});
    const k = hard ? 'hard' : 'basic';
    if (slot[k]) return false;                                   // 처음 결과만
    slot[k] = {c, n, at: Date.now()};
    const st = A.session.student;
    try {
      await A.sbInsert('quiz_logs', {student_id: st.id, name: st.name, student_grade: st.grade || '', course_id: A.cid(), course_name: E.course().oldName,
        unit_id: s.unitId, unit_label: s.unitLabel + (hard ? ' · 응용 도전' : ''), level: 'r' + r, correct: c, total: n});
    } catch (e) { console.warn('mission 기록 실패', e); }
    await E.save();
    return true;
  };
})();
