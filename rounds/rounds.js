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
        q:x.q, id:x.id, r:x.r, ans:x.ans || '', keys:x.keys || [], type:x.kind === 'typed' ? x.type : null,
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

  // 기록의 level 글자 → 선생님 화면 이름 ('r2' → '2회차', 'r1re' → '1회차 다시 보기'). 회차 기록이 아니면 null
  function levelName(l) {
    const m = /^r(\d)(re)?$/.exec(String(l || ''));
    return m ? m[1] + '회차' + (m[2] ? ' 다시 보기' : '') : null;
  }

  window.DDR = {version:'86.1', on, round, load, items, entry, ladder, answerText, levelName, MAX,
    _setForTest(g, r) { const s = student(); if (s) { cache.sid = s.id; cache.map[g] = r; } }};
})();
