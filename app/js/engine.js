/* 새 앱 — 학습 엔진 하나: 질문 하나가 거치는 단계를 한 규칙으로 (설계서 2판 5절)
   질문 → 채점(핵심별) → 다 짚음: 통과 / 빠짐: 그 핵심만 되묻기(핵심마다 1번) → 그래도 빠짐: "살짝 부족해" + 도움 고르기
     🔑 키워드 → 같은 질문에 다시 답 → 통과면 오늘 통과(85)
     짧은 설명 · 긴 설명 → 다음 날 다시 묻기(숫자·이름 바꾼 질문)로 확인(75 · 60)
     내일 다시 → 다음 날 같은 질문(60)
   이해 점수 품질(마스터 10/8, 100 기준): 한 번에 100 · 되묻기 뒤 90 · 키워드 뒤 85 · 짧은 설명→다음 날 75 · 긴 설명→다음 날/그냥 다음 날 60 · 복습 회복 80
   잠금: 그날 못 한 질문은 새벽 4시에 자동으로 열린다.
   회차: 대단원의 한 회차를 다 통과하면 그 대단원의 다음 회차가 자동으로 열린다. 지난 회차는 연습으로 언제든(점수·등급 그대로). */
(() => {
  'use strict';
  const A = window.APP;
  const E = A.E = {};
  E.ROUND = {1: '행성 탐사', 2: '별계 탐사', 3: '은하 탐사'};
  E.LIMIT = {1: 120, 2: 180, 3: 240};               // 질문당 초(채점 시간 빼고) · 계산 필요하면 1·2회차 +60
  E.Q = {first: 100, reask: 90, kw: 85, short: 75, long: 60, nextday: 60, review: 80};
  E.SESSION_MIN = 10;                                // 한 번 앉는 시간(마스터 10/8: 처음엔 10분)

  // ── 데이터 ──
  E.course = () => window.APP_DATA['e4-2'];
  E.bigs = () => E.course().bigs;
  E.big = no => E.bigs().find(b => b.no === no);
  E.small = code => { for (const b of E.bigs()) for (const s of b.smalls) if (s.code === code) return {big: b, small: s}; return null; };
  /* 소단원의 한 회차 할 일 목록. kind q = 1·2회차 질문, lad = 3회차 계단 칸 */
  E.tasks = (s, r) => r === 3
    ? s.ladder.map((st, i) => ({kind: 'lad', id: st.id, r: 3, idx: i, src: st}))
    : s.items.filter(it => it.r === r).map(it => ({kind: 'q', id: it.id, r, src: it}));

  // ── 진도(공유 저장소 app:prog:<학생>:<과정>) ──
  let P = null;
  const pkey = () => 'app:prog:' + A.session.student.id + ':e4-2';
  E.blank = () => ({v: 1, st: {}, open: {}, resume: null, log: []});
  E.load = async () => {
    P = (await A.store.get(pkey())) || E.blank();
    P.st = P.st || {}; P.open = P.open || {};
    return P;
  };
  E.save = async () => { if (P) { P.at = Date.now(); await A.store.set(pkey(), P); } };
  E.prog = () => P;
  E.status = id => P.st[id] || null;
  /* 지금 이 할 일을 할 수 있나: done(통과) · today(오늘 잠김) · next(다음 날 다시 — 어떤 모양으로) · new */
  E.state = id => {
    const x = E.status(id);
    if (!x) return {k: 'new'};
    if (x.st === 'pass') return {k: 'done', q: x.q};
    if (x.day === A.today()) return {k: 'today', help: x.help};
    return {k: 'next', help: x.help};
  };
  E.openRound = bigNo => (A.isTester() ? 3 : Math.max(1, P.open[bigNo] || 1));
  /* 소단원·회차 진행: 통과 수 / 전체 */
  E.count = (s, r) => { const t = E.tasks(s, r); return {done: t.filter(x => E.state(x.id).k === 'done').length, n: t.length}; };
  E.bigCount = (b, r) => b.smalls.reduce((a, s) => { const c = E.count(s, r); return {done: a.done + c.done, n: a.n + c.n}; }, {done: 0, n: 0});
  /* 결과 반영 → 대단원 회차가 다 끝났으면 다음 회차 열기(돌려준 값 = 새로 열린 회차) */
  E.record = (bigNo, id, rec) => {
    const prev = P.st[id];
    if (prev && prev.st === 'pass') return 0;      // 처음 통과만 센다(연습은 바뀌지 않음)
    const tries = (prev?.tries || 0) + 1;
    P.st[id] = Object.assign({}, rec, {day: A.today(), tries, at: Date.now(), help: rec.help || prev?.help || ''});
    if (rec.st === 'pass' && prev && prev.help && !rec.helpNow) P.st[id].help = prev.help;
    const b = E.big(bigNo), cur = Math.max(1, P.open[bigNo] || 1);
    if (cur < 3) {
      const c = E.bigCount(b, cur);
      if (c.n && c.done === c.n) { P.open[bigNo] = cur + 1; return cur + 1; }
    }
    return 0;
  };
  /* 「오늘 갈 곳」(마스터 10/8 확정): ① 다시 열린 질문(어제 잠긴 것) ② 열린 회차에서 아직 안 한 다음 행성 */
  E.nextPlace = () => {
    for (const b of E.bigs()) for (let r = 1; r <= 3; r++) for (const s of b.smalls)
      if (E.tasks(s, r).some(x => E.state(x.id).k === 'next')) return {big: b, small: s, r, why: 'again'};
    for (const b of E.bigs()) {
      const open = E.openRound(b.no);
      for (let r = 1; r <= open; r++) for (const s of b.smalls)
        if (E.tasks(s, r).some(x => E.state(x.id).k === 'new')) return {big: b, small: s, r, why: 'new'};
    }
    return null;
  };

  // ── 채점 (질문계단 grade 와 같은 규칙 — 핵심별 판정) ──
  const IDS = 'abcdef';
  const SYSTEM = `너는 초등학생 수학 친구야. 학생이 질문 하나에 말로 답한 것(음성 인식 텍스트)을 보고 [꼭 말할 핵심]을 하나씩 짚었는지 판정해. 되묻기 질문은 앱이 따로 붙이니까 너는 만들지 마.
[판정 규칙]
- 핵심마다 hit(true/false). true면 학생 말에서 근거가 된 부분을 짧게 그대로 인용(evidence). 인용할 곳이 없으면 false.
- 뜻이 같으면 표현이 달라도 인정. 수식·기호를 정확히 읽지 않아도 말로 설명했으면 인정. 음성 인식이 수학 말을 틀리게 적은 것은 소리가 비슷하고 문맥상 분명하면 맞게 말한 것으로 봐("오분의 삼"=3/5).
- 핵심에 숫자 답이 있으면 그 숫자(또는 같은 값)를 말해야 인정.
- "네", "될 것 같아요"처럼 결론만 있고 내용이 없으면 인정하지 마. 핵심의 절반만 말했으면 인정하지 마.
- 같은 답이면 언제 채점해도 같은 판정이 나오게, 애매하면 "핵심이 분명히 들어 있는가" 하나로만 판단.
- [이전 답]이 있으면 이전 답과 이번 답을 합쳐서 판정.
- 틀린 내용을 말했으면 misconception 에 학생 생각을 한 줄로. 없으면 "".
- focus: 아직 못 짚은 핵심 중 틀리게 말한 내용과 가장 관련된 것의 id. 틀린 말이 없으면 못 짚은 첫 핵심의 id. 다 짚었으면 "".
[ack] 25자 안팎 반말 한 문장. 맞게 말한 부분만 구체적으로 인정. 맞은 게 없으면 "좋아, 같이 하나씩 생각해 보자." 같은 격려만. ack 에 정답·빠진 핵심·힌트를 절대 넣지 마.
반드시 JSON만: {"hits":[{"id":"a","hit":true,"evidence":"..."}],"misconception":"","focus":"b","ack":"..."}`;
  E.grade = async ({question, keys, answer, prev, unitId}) => {
    const user = `[질문] ${question}\n[꼭 말할 핵심]\n${keys.map((k, i) => IDS[i] + ') ' + k).join('\n')}\n` + (prev ? `[이전 답] ${prev}\n` : '') + `[학생의 답(음성 인식)] ${answer}`;
    const raw = await A.ai({task: 'grade', system: SYSTEM, messages: [{role: 'user', content: user}], max_tokens: 700, grade_id: 'e4-2', unit_id: unitId});
    let o = null; try { o = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)); } catch (e) {}
    if (!o) throw new Error('친구가 답을 잘 못 알아들었어. 한 번 더 말해 줄래?');
    const hits = keys.map((k, i) => { const f = (o.hits || []).find(h => h && h.id === IDS[i]); return {hit: !!(f && f.hit), evidence: (f && f.hit && f.evidence) || ''}; });
    let miss = hits.findIndex(h => !h.hit);
    const fi = typeof o.focus === 'string' ? o.focus.trim().charCodeAt(0) - 97 : -1;
    if (miss >= 0 && fi >= 0 && fi < hits.length && !hits[fi].hit) miss = fi;
    return {hits, h: hits.filter(x => x.hit).length, n: hits.length, miss, misconception: String(o.misconception || '').trim(), ack: String(o.ack || '').trim()};
  };

  // ── 기록(submissions — 옛 선생님 화면이 그대로 읽는 모양 + 새 칸 help·stage·quality) ──
  let noNewCols = false;
  E.submit = async ({big, small, task, question, transcript, score, pass, stage, help, quality, misconception, ack, attempt, reasks, needTeacher, practice}) => {
    const s = A.session.student; if (!s) return;
    const row = {
      student_id: s.id, name: s.name, student_grade: s.grade || '',
      course_id: 'e4-2', course_name: E.course().oldName || '초4-2학기',
      unit_id: task.kind === 'lad' ? '' : small.unitId, unit_label: (task.kind === 'lad' ? '🪜 ' + small.key.split('|')[2] : small.unitLabel),
      level: task.kind === 'lad' ? (practice ? 'ladder' : 'ladder') : ('r' + task.r + (practice ? 're' : '')),
      question, question_id: task.id, transcript, score: Math.round(score),
      praise: ack || '', hint: help && help !== 'none' ? ('도움: ' + ({kw: '키워드', short: '짧은 설명', long: '긴 설명'}[help] || help)) : '',
      retry_point: '', misconception: misconception || '', attempt: attempt || 1, need_teacher: !!needTeacher,
      hints_used: reasks || 0, review_due: pass ? new Date(Date.now() + 7 * 864e5).toISOString() : null
    };
    const extra = {help: help || 'none', stage, quality: quality ?? null};
    try { await A.sbInsert('submissions', noNewCols ? row : Object.assign({}, row, extra)); }
    catch (e) {
      if (!noNewCols && /help|stage|quality|column/i.test(String(e.body || e.message))) {
        noNewCols = true;
        try { await A.sbInsert('submissions', row); } catch (e2) { console.warn('기록 저장 실패', e2); }
      } else console.warn('기록 저장 실패', e);
    }
    P.log = (P.log || []).slice(-300); P.log.push({id: task.id, stage, help, quality, score: Math.round(score), pass, at: Date.now(), practice: !!practice});
  };
})();
