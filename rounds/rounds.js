/* 말하는 수학 — 회차(1·2·3회차) 흐름 [v86.0 ⑧]
 * 격리 모듈: 회차 데이터(rounds/data-<학년>.js)가 있는 학년에서만 켜진다. 없는 학년은 예전 흐름 그대로.
 *  · 선생님이 학생마다·학기마다 회차를 연다 → 서버 ai_cache 의 'round:<학생 id>' = {"e5-1":2, …}. 없으면 1회차.
 *  · 학생 화면: 지금 회차 질문만 보인다. 3회차 = 질문 계단(+3회차로 분류된 질문).
 *  · 다시 보기: 지난 회차 질문을 "다시 답하기"만 한다. 지난 답·점수·피드백·모범 답은 보여 주지 않는다
 *    (2회차 답이 1회차 답과 비슷한 경우가 많아서 보고 따라 할 수 있음 — 마스터 지시 2026-09-21).
 *  · 채점: 질문마다 적힌 모범 답·꼭 말할 핵심을 기준으로(state._roundItem). 기록 번호는 질문 고르기 번호 그대로.
 */
(() => {
  'use strict';
  const MAX = 3;
  const cache = {sid:null, map:{}};
  const data = g => (window.DD_ROUNDS || {})[g] || null;
  const student = () => (typeof session !== 'undefined' && session.student && !session.teacher) ? session.student : null;

  // 이 학년에 회차 흐름이 켜져 있나 (학생일 때만)
  function on(g) { return !!(g && data(g) && student()); }
  function round(g) {
    const s = student(); if (!s || !data(g)) return 1;
    if (cache.sid !== s.id) return 1;
    const r = Number(cache.map[g]) || 1;
    return Math.min(MAX, Math.max(1, r));
  }
  // 로그인한 학생의 회차 불러오기 (서버 → 없으면 이 기기)
  async function load() {
    const s = student(); if (!s) return;
    let m = null;
    try { if (typeof storageGet === 'function') m = await storageGet('round:' + s.id); } catch (e) {}
    cache.sid = s.id; cache.map = (m && typeof m === 'object') ? m : {};
  }
  function entry(g, bigName, smallName) { const d = data(g); return d ? d[g + '|' + bigName + '|' + smallName] || null : null; }

  // 한 소단원의 질문 목록. which: 'now'(지금 회차) | 'past'(지난 회차 — 다시 보기)
  function items(g, bigName, smallName, which) {
    const e = entry(g, bigName, smallName); if (!e) return [];
    const r = round(g), key = typeof ddqConceptKey === 'function' ? ddqConceptKey(g, bigName, smallName) : '';
    return e.items.filter(x => which === 'past' ? x.r < r : x.r === r).map((x, i) => {
      const loc = String(x.id).split(':').pop();                    // t0L1 · t1H2 · qrecall · qa…
      const m = /^t(\d+)([LH])/.exec(loc);
      return {
        q:x.q, id:x.id, r:x.r, ans:x.ans || '', keys:x.keys || [], type:(x.kind === 'qset' || x.kind === 'typed') ? (x.type || null) : null,
        ti:m ? Number(m[1]) : 0, lv:m ? (m[2] === 'L' ? 'low' : 'high') : (x.r === 1 ? 'low' : 'high'),
        index:i, kind:'round', past:which === 'past', ck:key
      };
    });
  }
  // 계단(3회차): 숨긴 칸·고친 문장. 3회차가 아니면 계단을 열지 않는다.
  function ladder(key, steps) {
    const g = String(key).split('|')[0];
    if (!on(g)) return {open:true, steps, hide:[]};
    const e = data(g)[key] || {};
    const text = e.ladderText || {};
    return {
      open:round(g) >= 3,
      steps:steps.map((s, i) => text[i] != null ? Object.assign({}, s, {q:text[i]}) : s),
      hide:(e.ladderHide || []).slice()
    };
  }
  // 채점·기록에 쓸 모범 답
  function answerText(it) {
    if (!it || !it.ans) return '';
    return it.ans + (it.keys && it.keys.length ? '\n[꼭 말할 핵심]\n- ' + it.keys.join('\n- ') : '');
  }

  // 기록 번호: 회차 질문이면 질문 고르기 번호 그대로 (문장을 고쳐도 번호가 같다)
  if (typeof window.ddqCurrentId === 'function') {
    const orig = window.ddqCurrentId;
    window.ddqCurrentId = function(text) {
      try { const it = state._roundItem; if (it && it.id && text === it.q) return it.id; } catch (e) {}
      return orig.apply(this, arguments);
    };
  }

  // 기록의 level 글자 → 선생님 화면 이름 ('r2' → '2회차', 'r1re' → '1회차 다시 보기', 끝의 c = 개념 보고 답함). 회차 기록이 아니면 null
  function levelName(l) {
    const m = /^r(\d)(re)?(c)?$/.exec(String(l || ''));
    return m ? m[1] + '회차' + (m[2] ? ' 다시 보기' : '') + (m[3] ? ' · 📖 개념 보고 답함' : '') : null;
  }
  // [v86.2] 개념 다시 보기를 열고 한 답 → 점수가 높아도 그날은 통과로 치지 않는다 (다음 날 혼자 설명해야 통과)
  function noPass(l) { return /^r\d(re)?c$/.test(String(l || '')); }
  // [v86.2] 힌트: 1회차(뜻·성질·간단한 계산)는 없음 · 2·3회차는 비유 빼고 '스스로 떠올려봐'부터, 모범 답의 핵심 말은 금지
  function hintMode() {
    try { const it = state._roundItem; if (!it) return 'normal'; return it.r === 1 ? 'none' : 'guided'; } catch (e) { return 'normal'; }
  }

  // [v86.3] 문제 풀기도 회차마다: 개수(데이터의 quiz — 2·3·4) · 수준(1 기본 / 2 응용 / 3 종합) · '이미 풀었음'도 회차별
  const QLEVEL = {1:'basic', 2:'adv', 3:'mix'};
  const QNAME = {1:'기본', 2:'응용', 3:'종합'};
  function curEntry() {
    try { const big = cpCurrentBig(), sm = cpCurrentSmall(); return big && sm ? {e:entry(state.gradeId, big.name, sm.name), big:big.name, sm:sm.name} : null; } catch (e) { return null; }
  }
  function quizPlan(g) {
    const c = curEntry(); if (!c || !c.e || !on(g)) return null;
    const r = round(g), qc = c.e.quiz || {};
    const qs = items(g, c.big, c.sm, r >= 3 ? 'past' : 'now').map(x => x.q).concat(r >= 3 ? items(g, c.big, c.sm, 'now').map(x => x.q) : []);
    return {round:r, count:Number(qc[r]) || (r >= 3 ? 3 : 2), level:QLEVEL[r], roundQs:qs};
  }
  if (typeof window.quizDoneKey === 'function') {
    const origKey = window.quizDoneKey;
    window.quizDoneKey = function() {
      const k = origKey.apply(this, arguments);
      try { return on(state.gradeId) ? k + ':r' + round(state.gradeId) : k; } catch (e) { return k; }
    };
  }
  if (typeof window.getOrGenerateQuiz === 'function') {
    const origGen = window.getOrGenerateQuiz;
    window.getOrGenerateQuiz = function(grade, unit, opts) {
      opts = opts || {};
      // 선생님 미리 만들기·편집기 미리보기·'응용 도전'(따로 누르는 도전)은 예전 그대로
      const plan = (!opts.pregen && !opts.noSave && opts.level !== 'adv' && grade) ? quizPlan(grade.id) : null;
      if (plan) {
        opts = Object.assign({}, opts, {round:plan.round, count:plan.count, level:plan.level, roundQs:plan.roundQs});
        try { const m = document.getElementById('quizMeta'); if (m && !/회차 문제/.test(m.textContent)) m.textContent += ' · ' + plan.round + '회차 문제(' + QNAME[plan.round] + ' ' + plan.count + '개)'; } catch (e) {}
      }
      return origGen.call(this, grade, unit, opts);
    };
  }

  window.DDR = {version:'86.3', on, round, load, items, entry, ladder, answerText, levelName, noPass, hintMode, quizPlan, MAX,
    _setForTest(g, r) { const s = student(); if (s) { cache.sid = s.id; cache.map[g] = r; } }};
})();
