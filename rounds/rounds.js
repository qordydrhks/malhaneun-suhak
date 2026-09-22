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
  const cache = {sid:null, map:{}, qdone:new Set()};   // qdone: 서버 quiz_logs 에서 읽은 '과정|유형번호|r회차' [v87.8]
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
    // [v87.8] 문제 풀기 끝 표시가 그 기기(localStorage)에만 있어서 다른 기기에선 회차가 안 넘어가던 것 → 서버 기록도 본다
    //   level 'r2' 처럼 회차가 적힌 기록은 그 회차, 예전 기록(회차 없음)은 1회차로 친다. '응용 도전'은 빼고.
    try {
      if (typeof checkSupabase === 'function' && await checkSupabase()) {
        const rows = await sbSelect('quiz_logs', 'student_id=eq.' + encodeURIComponent(s.id) + '&select=course_id,unit_id,level,unit_label');
        const set = new Set();
        (rows || []).forEach(r => {
          if (/응용 도전/.test(String(r.unit_label || ''))) return;
          const mm = /^r(\d)$/.exec(String(r.level || ''));
          set.add(r.course_id + '|' + r.unit_id + '|r' + (mm ? mm[1] : 1));
        });
        cache.qdone = set;
      }
    } catch (e) {}
  }
  function entry(g, bigName, smallName) { const d = data(g); return d ? d[g + '|' + bigName + '|' + smallName] || null : null; }

  // [v86.8] 소단원마다 회차를 차례로 — 선생님이 2회차를 열어도 이 소단원의 1회차를 다 통과해야 2회차가 나온다 (흐름점검 1번)
  //   (예전엔 학기 전체에 한 번에 걸려서, 1회차를 안 한 소단원도 곧바로 2회차였다)
  const passedQ = (g, x) => { try { return typeof cpStatusForQuestion === 'function' && cpStatusForQuestion(g, x.q, x.id) === 'pass'; } catch (e) { return false; } };
  //   질문을 다 통과해도 그 회차 문제 풀기를 안 했으면 아직 그 회차 (안 그러면 1회차 문제를 건너뛰고 2회차로 넘어간다)
  function quizDoneAt(g, bigName, smallName, k) {
    try {
      const s = student(); if (!s) return true;
      const m = cpModel(g), big = m && m.bigUnits.find(b => b.name === bigName);
      const sm = big && cpBigMiddles(big).flatMap(x => x.smalls || []).find(x => x.name === smallName);
      if (!sm) return true;
      return (sm.types || []).some(t => localStorage.getItem('dd:quizdone:' + s.id + ':' + g + ':' + t.unitId + ':r' + k)
                                       || cache.qdone.has(g + '|' + t.unitId + '|r' + k));
    } catch (e) { return true; }
  }
  // [v87.9] 이름에 '테스트'가 들어간 학생은 차례 규칙 없이 열어 준 회차가 바로 보인다 (마스터 확인용, 마스터 결정 9/22)
  const isTester = () => { const s = student(); return !!(s && /테스트/.test(String(s.name || ''))); };
  function roundAt(g, bigName, smallName) {
    let r = round(g);
    if (isTester()) return r;
    const e = entry(g, bigName, smallName); if (!e) return r;
    for (let k = 1; k < r; k++) {
      const prev = e.items.filter(x => x.r === k);
      if (prev.length && (!prev.every(x => passedQ(g, x)) || !quizDoneAt(g, bigName, smallName, k))) return k;
    }
    return r;
  }
  // 이 소단원에서 회차별로 다 통과했나 {1:true, 2:false} — 선생님 화면·리포트용
  function stageOf(g, bigName, smallName, isPass) {
    const e = entry(g, bigName, smallName); if (!e) return null;
    const out = {};
    [1, 2].forEach(k => { const its = e.items.filter(x => x.r === k); out[k] = its.length ? its.every(x => isPass(x)) : null; });
    return out;
  }

  // 한 소단원의 질문 목록. which: 'now'(지금 회차) | 'past'(지난 회차 — 다시 보기)
  function items(g, bigName, smallName, which) {
    const e = entry(g, bigName, smallName); if (!e) return [];
    const r = roundAt(g, bigName, smallName), key = typeof ddqConceptKey === 'function' ? ddqConceptKey(g, bigName, smallName) : '';
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
    const kp = String(key).split('|');
    return {
      open:roundAt(g, kp[1], kp[2]) >= 3,
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
    const m = /^r(\d)(re|rv)?(c)?$/.exec(String(l || ''));   // [v87.1] rv = 7일 복습
    return m ? m[1] + '회차' + (m[2] === 're' ? ' 다시 보기' : m[2] === 'rv' ? ' · 🔁 복습' : '') + (m[3] ? ' · 📖 개념 보고 답함' : '') : null;
  }
  // [v86.2] 개념 다시 보기를 열고 한 답 → 점수가 높아도 그날은 통과로 치지 않는다 (다음 날 혼자 설명해야 통과)
  function noPass(l) { return /^r\d(re|rv)?c$/.test(String(l || '')); }
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
    const r = roundAt(g, c.big, c.sm), qc = c.e.quiz || {};
    if (r >= 3) {
      // [v86.5] 3회차: 계단 칸 수만큼(숨긴 칸 제외) + 3회차로 분류한 질문 — 칸(질문)마다 문제 하나 (마스터 결정 2026-09-21)
      //   개수를 정해 두지 않고 개념 내용(계단)을 따라간다 → 중·고등처럼 계단이 긴 곳도 문제가 모자라지 않게
      const key = g + '|' + c.big + '|' + c.sm, raw = (window.DL_LADDERS || {})[key] || [];
      const lv = ladder(key, raw), hid = new Set(lv.hide);
      const qs = lv.steps.filter((s, i) => !hid.has(i)).map(s => s.q).concat(items(g, c.big, c.sm, 'now').map(x => x.q));
      if (qs.length) return {round:r, count:Math.min(10, qs.length), level:QLEVEL[3], roundQs:qs.slice(0, 10), perItem:true};
      return {round:r, count:3, level:QLEVEL[3], roundQs:items(g, c.big, c.sm, 'past').map(x => x.q)};   // 계단이 없는 소단원
    }
    const qs = items(g, c.big, c.sm, 'now').map(x => x.q);
    return {round:r, count:Number(qc[r]) || 2, level:QLEVEL[r], roundQs:qs};
  }
  if (typeof window.quizDoneKey === 'function') {
    const origKey = window.quizDoneKey;
    window.quizDoneKey = function() {
      const k = origKey.apply(this, arguments);
      try { if (!on(state.gradeId)) return k; const c = curEntry(); return k + ':r' + (c ? roundAt(state.gradeId, c.big, c.sm) : round(state.gradeId)); } catch (e) { return k; }
    };
  }
  // [v87.8] 문제 풀기 결과 기록(quiz_logs)의 level 에 회차를 적는다 → 다른 기기에서도 '그 회차 문제 끝'을 알 수 있게
  if (typeof window.saveQuizResult === 'function') {
    const origSave = window.saveQuizResult;
    window.saveQuizResult = function(correct, total, isAdv) {
      let lv0 = null;
      try {
        const c = curEntry();
        if (!isAdv && c && on(state.gradeId)) {
          const k = roundAt(state.gradeId, c.big, c.sm);
          lv0 = state.level; state.level = 'r' + k;
          cache.qdone.add(state.gradeId + '|' + state.unitId + '|r' + k);
        }
      } catch (e) {}
      const p = origSave.apply(this, arguments);   // 기록 줄은 여기서 바로 만들어진다
      if (lv0 !== null) state.level = lv0;
      return p;
    };
  }
  if (typeof window.getOrGenerateQuiz === 'function') {
    const origGen = window.getOrGenerateQuiz;
    window.getOrGenerateQuiz = function(grade, unit, opts) {
      opts = opts || {};
      // 선생님 미리 만들기·편집기 미리보기·'응용 도전'(따로 누르는 도전)은 예전 그대로
      const plan = (!opts.pregen && !opts.noSave && opts.level !== 'adv' && grade) ? quizPlan(grade.id) : null;
      if (plan) {
        opts = Object.assign({}, opts, {round:plan.round, count:plan.count, level:plan.level, roundQs:plan.roundQs, perItem:!!plan.perItem});
        try { const m = document.getElementById('quizMeta'); if (m && !/회차 문제/.test(m.textContent)) m.textContent += ' · ' + plan.round + '회차 문제(' + QNAME[plan.round] + ' ' + plan.count + '개)'; } catch (e) {}
      }
      return origGen.call(this, grade, unit, opts);
    };
  }

  // ── [v86.4] 선생님: 학생별·학기별 회차 열기 ('회차 열기' 메뉴) ─────────────────────────
  const T = {grade:null, maps:{}, sel:new Set(), busy:false};
  const escT = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const gradeName = g => { try { return (GRADES.find(x => x.id === g) || {}).name || g; } catch (e) { return g; } };
  async function allStudents() {
    let list = [];
    try { list = (typeof RAIL_CACHE !== 'undefined' && RAIL_CACHE.students && RAIL_CACHE.students.length) ? RAIL_CACHE.students : await getAllStudents(); } catch (e) {}
    return (list || []).slice().sort((a, b) => String(a.name).localeCompare(String(b.name), 'ko'));
  }
  // 모든 학생의 회차를 한 번에 (서버) → 안 되면 한 명씩
  async function loadAll(students) {
    const maps = {};
    let done = false;
    try {
      if (typeof checkSupabase === 'function' && await checkSupabase()) {
        const rows = await sbSelect('ai_cache', 'key=like.round%3A*&select=key,value');
        (rows || []).forEach(r => { const id = String(r.key).slice(6); if (r.value && typeof r.value === 'object') maps[id] = r.value; });
        done = true;
      }
    } catch (e) {}
    if (!done) await Promise.all(students.map(async s => { try { const m = await storageGet('round:' + s.id); if (m) maps[s.id] = m; } catch (e) {} }));
    return maps;
  }
  async function setRound(sid, g, r) {
    let m = null;
    try { m = await storageGet('round:' + sid); } catch (e) {}
    m = (m && typeof m === 'object') ? Object.assign({}, m) : {};
    m[g] = r;
    const ok = await storageSet('round:' + sid, m);
    if (ok) T.maps[sid] = m;
    return ok;
  }
  async function teacherRender(host) {
    if (!host) return;
    const grades = Object.keys(window.DD_ROUNDS || {});
    if (!grades.length) { host.innerHTML = '<p class="dd-ui-caption">회차가 준비된 학기가 아직 없어요.</p>'; return; }
    if (!T.grade || !grades.includes(T.grade)) T.grade = grades[0];
    host.innerHTML = '<p class="dd-ui-caption">불러오는 중…</p>';
    const students = await allStudents();
    T.maps = await loadAll(students);
    T.students = students;
    // [v86.8] 학생별 진도 — 소단원마다 1회차·2회차 질문을 다 통과했나 (흐름점검 1번: 진도를 보고 회차를 올리게)
    T.pass = {};
    try {
      const subs = typeof getAllSubmissions === 'function' ? await getAllSubmissions() : [];
      (subs || []).forEach(x => { if (x && x.pass && x.questionId) (T.pass[x.studentId] = T.pass[x.studentId] || new Set()).add(x.questionId); });
    } catch (e) {}
    draw(host);
  }
  function draw(host) {
    const grades = Object.keys(window.DD_ROUNDS || {}), g = T.grade, students = T.students || [];
    const cur = s => Math.min(MAX, Math.max(1, Number((T.maps[s.id] || {})[g]) || 1));
    const keys = Object.keys(data(g) || {});
    const prog = s => {
      const ok = T.pass && T.pass[s.id]; let d1 = 0, d2 = 0;
      keys.forEach(k => { const e = data(g)[k], st = {1:true, 2:true};
        [1, 2].forEach(r => { const its = e.items.filter(x => x.r === r); st[r] = its.length > 0 && !!ok && its.every(x => ok.has(x.id)); });
        if (st[1]) d1++; if (st[1] && st[2]) d2++; });
      return '1회차 끝 ' + d1 + '/' + keys.length + ' · 2회차 끝 ' + d2 + '/' + keys.length;
    };
    const count = [1, 2, 3].map(r => students.filter(s => cur(s) === r).length);
    const rbtn = (r, act, extra) => '<button type="button" class="' + (act ? 'dd-ui-primary' : 'dd-ui-secondary') + '" ' + extra + '>' + r + '회차</button>';
    host.innerHTML =
      '<div class="ddr-t">'
      + '<p class="dd-ui-caption">학생마다 공부할 회차를 정해요. 회차를 올려도 소단원마다 앞 회차 질문을 다 통과해야 다음 회차가 나와요(안 끝낸 소단원은 앞 회차부터). 회차를 올리면 지난 회차 질문은 \'다시 보기\'로 남아요. (1회차 뜻·성질 / 2회차 응용·이유 / 3회차 질문 계단·종합)</p>'
      + '<div class="ddr-bar"><label>학기 <select id="ddrGrade">' + grades.map(x => '<option value="' + x + '"' + (x === g ? ' selected' : '') + '>' + escT(gradeName(x)) + '</option>').join('') + '</select></label>'
      + '<span class="ddr-sum">1회차 ' + count[0] + '명 · 2회차 ' + count[1] + '명 · 3회차 ' + count[2] + '명</span></div>'
      + '<div class="ddr-bar"><button type="button" class="dd-ui-text" data-ddr="all">모두 선택</button><button type="button" class="dd-ui-text" data-ddr="none">선택 해제</button>'
      + '<span>선택한 <b id="ddrSelN">' + T.sel.size + '</b>명을</span>' + [1, 2, 3].map(r => rbtn(r, false, 'data-ddr="bulk" data-r="' + r + '"')).join('') + '<span>로</span></div>'
      + '<div class="ddr-list">' + (students.map(s => {
          const r = cur(s);
          return '<div class="ddr-row"><label><input type="checkbox" data-ddr="pick" data-sid="' + escT(s.id) + '"' + (T.sel.has(s.id) ? ' checked' : '') + '> <b>' + escT(s.name) + '</b> <small>' + escT(s.grade || '') + '</small> <small class="ddr-prog">' + prog(s) + '</small></label>'
            + '<span class="ddr-btns">' + [1, 2, 3].map(x => rbtn(x, x === r, 'data-ddr="one" data-sid="' + escT(s.id) + '" data-r="' + x + '"')).join('') + '</span></div>';
        }).join('') || '<p class="dd-ui-caption">등록된 학생이 없어요.</p>') + '</div></div>';
  }
  async function onClick(e) {
    const el = e.target.closest('[data-ddr]'); if (!el) return;
    const host = document.getElementById('ddUiTeacherRounds'); if (!host || !host.contains(el)) return;
    const k = el.dataset.ddr;
    if (k === 'pick') { el.checked ? T.sel.add(el.dataset.sid) : T.sel.delete(el.dataset.sid); const n = document.getElementById('ddrSelN'); if (n) n.textContent = T.sel.size; return; }
    if (k === 'all') { (T.students || []).forEach(s => T.sel.add(s.id)); draw(host); return; }
    if (k === 'none') { T.sel.clear(); draw(host); return; }
    if (T.busy) return;
    const r = Number(el.dataset.r), ids = k === 'one' ? [el.dataset.sid] : Array.from(T.sel);
    if (!ids.length) { alert('먼저 학생을 골라 주세요.'); return; }
    if (k === 'bulk' && !confirm(ids.length + '명을 ' + gradeName(T.grade) + ' ' + r + '회차로 바꿀까요?')) return;
    T.busy = true; el.disabled = true;
    let fail = 0;
    for (const sid of ids) { if (!(await setRound(sid, T.grade, r))) fail++; }
    T.busy = false;
    draw(host);
    if (fail) alert(fail + '명은 저장하지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요.');
  }
  document.addEventListener('click', e => { onClick(e).catch(err => { T.busy = false; console.warn('[회차 열기]', err); }); });
  document.addEventListener('change', e => {
    if (e.target && e.target.id === 'ddrGrade') { T.grade = e.target.value; T.sel.clear(); draw(document.getElementById('ddUiTeacherRounds')); }
  });
  const css = document.createElement('style');
  css.textContent = '.ddr-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0}.ddr-sum{color:#6b6a64;font-size:14px}'
    + '.ddr-list{border-top:1px solid #e4e2da}.ddr-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eeede7}'
    + '.ddr-row label{display:flex;gap:6px;align-items:center;min-width:0}.ddr-row small{color:#8a887f}.ddr-prog{font-size:12px}.ddr-btns{display:flex;gap:6px}.ddr-btns button,.ddr-bar button{padding:6px 12px;min-height:36px}';
  document.head.appendChild(css);

  window.DDR = {version:'87.8', on, round, roundAt, quizDoneAt, stageOf, load, items, entry, ladder, answerText, levelName, noPass, hintMode, quizPlan, teacherRender, MAX,
    _setForTest(g, r) { const s = student(); if (s) { cache.sid = s.id; cache.map[g] = r; } }};
})();
