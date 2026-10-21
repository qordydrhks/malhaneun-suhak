/* 새 앱 — 선생님 화면(teacher.html). 마스터 10/3: 설명은 걷어내고 깔끔하게.
   · PIN = 옛 앱과 같은 것(공유 저장소 config:teacherPin, 처음은 0000). 이 탭에서만 기억(sessionStorage).
   · 학생 목록: 등급·이해 점수(선생님만)·밝힌 행성·지금 위치·막힌 질문 수·마지막 활동
   · 학생 한 명: 막힌 곳 / 도움 받고 통과한 곳 / 별(대단원)마다 탐사 진도 + 회차 열기 / 최근 기록(말한 내용) / 학부모 리포트 링크·선생님 한마디
   · 진도는 학생 기기가 쓴 공유 저장소(app:prog:<학생>:e4-2)를 읽기만 한다. 선생님이 바꾸는 것(회차 열기)은 따로(app:open:…) 둔다.
     단, 「다시 하기」(마스터 10/21)는 진도를 직접 지우고 같은 내용을 학생 태블릿에 명령으로도 보낸다(태블릿이 옛 진도로 덮어써도 명령을 받으면 다시 지워지게). */
(() => {
  'use strict';
  const A = window.APP, E = A.E, esc = A.esc, fm = A.fm, $ = s => document.querySelector(s);
  const root = () => $('#app');
  const SK = 'app:teacher';
  /* 과정(학기) — 마스터 10/19 5-2 넣기. 선생님이 고른 과정은 이 탭에 기억 */
  try { const c = sessionStorage.getItem('app:tcid'); if (c && (window.APP_DATA || {})[c]) A.session.cid = c; } catch (e) {}
  const HELP = {kw: '키워드', short: '간단한 설명', long: '자세한 설명', none: '', '': ''};
  const ST = {first: '한 번에', reask: '되묻기 뒤', kw: '키워드 뒤', short: '간단한 설명', long: '자세한 설명', lock: '막힘', timeout: '시간 초과', again: '다음 날', nextday: '다음 날', review: '다시 빛내기', practice: '연습', battle: '대결'};

  // ── 질문 번호 → 어디의 무슨 질문인지 ──
  const IDX = {};
  for (const b of E.bigs()) {
    for (const s of b.smalls) for (let r = 1; r <= 3; r++) for (const t of E.tasks(s, r)) IDX[t.id] = {b, s, r, t, q: t.src.q, ans: t.kind === 'lad' ? t.src.teach : t.src.ans};
    for (let r = 1; r <= 3; r++) if (b.bh) IDX[b.bh.id + ':r' + r] = {b, s: null, r, t: {kind: 'bh'}, q: b.bh[r].q};
  }
  const where = x => x ? (x.s ? x.s.code : x.b.code + ' 블랙홀') + ' · ' + E.RT(x.r) : '';
  const ago = t => {
    if (!t) return '—';
    const d0 = A.dayKey(t), today = A.today();
    const hm = new Date(t).toTimeString().slice(0, 5);
    if (d0 === today) return '오늘 ' + hm;
    const days = Math.round((new Date(today) - new Date(d0)) / 864e5);
    return days === 1 ? '어제' : days + '일 전';
  };

  // ── 화면 틀 ──
  function frame(inner, opt) {
    opt = opt || {};
    root().innerHTML = `<header class="bar">${opt.back ? `<button class="ghost" id="tBack">‹ ${esc(opt.backText || '뒤로')}</button>` : '<span class="logo">선생님</span>'}
      <span class="crumb">${esc(opt.crumb || E.course().code + ' 은하')}</span><span class="who"><button class="ghost small" id="tOut">나가기</button></span></header><main class="tmain">${inner}</main>`;
    $('#tOut').onclick = () => { try { sessionStorage.removeItem(SK); } catch (e) {} pin(); };
    if (opt.back) $('#tBack').onclick = opt.back;
    window.scrollTo(0, 0);
  }

  // ── PIN ──
  function pin(msg) {
    root().innerHTML = `<main class="center"><form class="login" id="pf" autocomplete="off">
      <div class="title"><div class="mark">✦</div><h1>선생님</h1><p>말하는 수학</p></div>
      <label>PIN<input id="pv" type="password" inputmode="numeric" autocomplete="current-password"></label>
      <button class="primary big" type="submit">들어가기</button><div class="msg" id="pm">${esc(msg || '')}</div></form></main>`;
    $('#pv').focus();
    $('#pf').onsubmit = async e => {
      e.preventDefault();
      const v = $('#pv').value; $('#pm').textContent = '확인 중…';
      try {
        const saved = await A.store.get('config:teacherPin');
        const want = saved && saved.hash ? saved.hash : await A.sha256('0000');
        if ((await A.sha256(v)) !== want) { $('#pm').textContent = 'PIN이 맞지 않아요.'; return; }
        try { sessionStorage.setItem(SK, '1'); } catch (e2) {}
        list();
      } catch (err) { $('#pm').textContent = '서버에 연결하지 못했어요.'; }
    };
  }

  // ── 데이터 ──
  let STU = [], PROG = {}, OPEN = {}, SETS = {}, STAR = {}, ACAD = '', NB = {n: 0, fresh: 0};
  async function loadAll() {
    const like = p => 'key=like.' + encodeURIComponent(p) + '&select=key,value&limit=1000';
    const [studs, progs, opens, sets, stars] = await Promise.all([A.loadStudents(), A.sbSelect('ai_cache', like('app:prog:*:' + A.cid())), A.sbSelect('ai_cache', like('app:open:*:' + A.cid())), A.sbSelect('ai_cache', like('app:set:*:' + A.cid())), A.sbSelect('ai_cache', like('app:star:*:' + A.cid())), A.S.loadSems()]);
    PROG = {}; OPEN = {}; SETS = {}; STAR = {};
    for (const r of stars || []) STAR[r.key.split(':')[2]] = r.value;
    try { const v = await A.N.all(); NB = {n: v.rows.filter(x => x.mod !== 'hide').length, fresh: v.rows.filter(x => !x.mod).length}; } catch (e) {}
    try { ACAD = ((await A.store.get('app:academy')) || {}).name || ''; } catch (e) {}
    for (const r of sets || []) SETS[r.key.split(':')[2]] = r.value;
    for (const r of progs || []) PROG[r.key.split(':')[2]] = r.value;
    for (const r of opens || []) OPEN[r.key.split(':')[2]] = r.value;
    const gno = (/e(\d)/.exec(A.cid()) || [0, 4])[1], gre = new RegExp('초\\s*' + gno + '|' + gno + '학년');
    STU = (studs || []).filter(s => gre.test(s.grade || '') || PROG[s.id]).map(s => ({id: s.id, name: s.name, grade: s.grade || ''}));
  }
  /* 학생 한 명의 진도를 엔진에 올려 계산한다 */
  function look(s) {
    A.session.student = {id: s.id, name: s.name, grade: s.grade};
    E.use(PROG[s.id] ? JSON.parse(JSON.stringify(PROG[s.id])) : null, OPEN[s.id] || {}); E.useSettings(SETS[s.id]);
    const rk = E.rank(), bk = E.book(), p = E.prog();
    const stuck = [], helped = [];
    for (const [id, x] of Object.entries(p.st)) {
      const ix = IDX[id]; if (!ix) continue;
      if (x.st !== 'pass') stuck.push({id, x, ix});
      else if ((x.qFirst ?? x.q ?? 100) < 90) helped.push({id, x, ix});
    }
    stuck.sort((a, b) => (b.x.at || 0) - (a.x.at || 0)); helped.sort((a, b) => (b.x.at || 0) - (a.x.at || 0));
    const nx = E.nextPlace();
    return {rk, bk, p, stuck, helped, nx, at: p.at || 0, any: !!PROG[s.id], ses: E.sessionMin(), qmin: E.qmin(), noT: E.timerOff()};
  }

  // ── 학생 목록 (마스터 10/13: 한 화면에 다 보여 주지 말고, 누르면 보이게) ──
  async function list() {
    frame('<div class="loading">불러오는 중…</div>');
    try { await loadAll(); } catch (e) { frame(`<p class="sub center">서버에서 불러오지 못했어요. (${esc(e.message)})</p>`); return; }
    const rows = STU.map(s => ({s, v: look(s)}));
    rows.sort((a, b) => (b.v.stuck.length - a.v.stuck.length) || (b.v.at - a.v.at) || a.s.name.localeCompare(b.s.name, 'ko'));
    A.session.student = null;
    frame(`${A.courses().length > 1 ? `<div class="krow ctabs">${A.courses().map(id => `<button class="${id === A.cid() ? 'primary' : 'secondary'} small" data-c="${id}">${esc(window.APP_DATA[id].code)} · ${esc(window.APP_DATA[id].name)}</button>`).join('')}</div>` : ''}
      <div class="thead"><h2>학생 ${rows.length}명</h2><button class="ghost small" id="tRe">↻ 새로고침</button></div>
      <div class="tmenu three">
        <button class="tmbtn" id="tMg"><i>👥</i><b>학생 관리</b><small>등록 · 수정 · 비밀번호</small></button>
        <button class="tmbtn ${NB.fresh ? 'hot' : ''}" id="tNb"><i>✦</i><b>별빛노트</b><small>${NB.fresh ? '새 대답 ' + NB.fresh + '개 확인' : '새 대답 없음'}</small></button>
        <button class="tmbtn" id="tSet"><i>⚙</i><b>설정</b><small>학원 이름 · 학기 · 기기</small></button>
      </div>
      <div class="tlist">${rows.map(({s, v}) => `<button class="tstu" data-id="${esc(s.id)}">
        <span class="tsn"><b>${esc(s.name)}</b><small>${esc(s.grade)}</small></span>
        <span class="tsr">${v.any && v.rk.score != null ? `${v.rk.icon} ${v.rk.name}` : '<i>시작 전</i>'}</span>
        <span class="tsx">${v.stuck.length ? `<em>막힘 ${v.stuck.length}</em>` : ''}<small>${ago(v.at)}</small></span><span class="tsgo">›</span></button>`).join('') || `<p class="sub">${esc(E.course().name)} 학생이 없어요. 「학생 관리」에서 등록해 주세요.</p>`}</div>`);
    $('#tRe').onclick = list;
    root().querySelectorAll('.ctabs [data-c]').forEach(b => b.onclick = () => { A.session.cid = b.dataset.c; try { sessionStorage.setItem('app:tcid', b.dataset.c); } catch (e) {} list(); });
    $('#tNb').onclick = () => noteAdmin(false);
    $('#tMg').onclick = () => manage();
    $('#tSet').onclick = settings;
    root().querySelectorAll('.tstu').forEach(b => b.onclick = () => detail(STU.find(s => s.id === b.dataset.id)));
  }
  function settings() {
    const dev = A.isAcademyDevice(), buzz = localStorage.getItem('app:buzz') !== '0';
    frame(`<div class="thead"><h2>⚙ 설정</h2></div>
      <div class="tbox"><h3>학원 이름</h3><p class="sub">학생 화면 왼쪽 위에 보여요(비우면 「말하는 수학」)</p>
        <div class="row"><input id="tAcad" class="tin" maxlength="20" placeholder="예: 두드림 수학" value="${esc(ACAD)}"><button class="secondary small" id="tAcadS">저장</button><span class="sub" id="tAcadM"></span></div></div>
      <div class="tbox">${semEditor()}</div>
      <div class="tbox"><h3>이 기기</h3>
        <div class="row"><button class="secondary small" id="tDev">${dev ? '✅ 학원 기기로 등록됨 · 해제' : '이 기기를 학원 기기로 등록'}</button>
        <button class="secondary small" id="tBuzz">${buzz ? '📳 진동 켜짐 · 끄기' : '📳 진동 꺼짐 · 켜기'}</button></div></div>
      <div class="tbox"><h3>선생님 PIN 바꾸기</h3><p class="sub">선생님 화면에 들어올 때 쓰는 번호예요(옛 선생님 화면과 같은 번호).</p>
        <div class="row"><input id="pOld" class="tin" type="password" inputmode="numeric" placeholder="지금 PIN" autocomplete="off">
        <input id="pNew" class="tin" type="password" inputmode="numeric" placeholder="새 PIN" autocomplete="off">
        <input id="pNew2" class="tin" type="password" inputmode="numeric" placeholder="새 PIN 한 번 더" autocomplete="off">
        <button class="secondary small" id="pSave">바꾸기</button><span class="sub" id="pMsg"></span></div></div>
      <div class="tbox"><h3>다른 화면</h3><div class="row"><a class="secondary small" href="index.html">학생 화면 ›</a><a class="secondary small" href="../dodream.html">고급 — 문제 미리 만들기 · AI 비용 (옛 선생님 화면) ›</a></div></div>`,
      {back: list, backText: '학생', crumb: '설정'});
    bindSem();
    $('#tAcadS').onclick = async () => { ACAD = $('#tAcad').value.trim(); await A.store.set('app:academy', {name: ACAD, at: Date.now()}); $('#tAcadM').textContent = '저장했어요'; };
    $('#tBuzz').onclick = () => { try { if (!buzz) { localStorage.removeItem('app:buzz'); navigator.vibrate && navigator.vibrate(30); } else localStorage.setItem('app:buzz', '0'); } catch (e) {} settings(); };
    $('#pSave').onclick = async () => {
      const o = $('#pOld').value, n = $('#pNew').value, n2 = $('#pNew2').value;
      if (!o || !n) { $('#pMsg').textContent = '지금 PIN과 새 PIN을 넣어 주세요.'; return; }
      if (n.length < 4) { $('#pMsg').textContent = '새 PIN은 4자리 이상으로 해 주세요.'; return; }
      if (n !== n2) { $('#pMsg').textContent = '새 PIN 두 번이 서로 달라요.'; return; }
      let ok = false; try { ok = await A.checkPin(o); } catch (e) {}
      if (!ok) { $('#pMsg').textContent = '지금 PIN이 맞지 않아요.'; return; }
      try { await A.store.set('config:teacherPin', {hash: await A.sha256(n)}); } catch (e) { $('#pMsg').textContent = '저장하지 못했어요.'; return; }
      ['#pOld', '#pNew', '#pNew2'].forEach(s => { $(s).value = ''; }); $('#pMsg').textContent = '✅ 바꿨어요. 다음부터 새 PIN으로 들어와요.';
    };
    $('#tDev').onclick = () => { try { if (dev) localStorage.removeItem('dd:academyDevice'); else localStorage.setItem('dd:academyDevice', '1'); } catch (e) {} settings(); };
  }

  // ── 👥 학생 관리(마스터 10/20) — 옛 선생님 화면과 같은 서버 표(students: id·name·grade·pin_hash)를 쓴다 ──
  const GRADES_OPT = ['초1', '초2', '초3', '초4', '초5', '초6', '중1', '중2', '중3', '고1', '고2', '고3'];
  const gradeSel = (id, v) => `<select id="${id}" class="tin"><option value="">학년 고르기</option>${GRADES_OPT.map(g => `<option ${g === v ? 'selected' : ''}>${g}</option>`).join('')}${v && !GRADES_OPT.includes(v) ? `<option selected>${esc(v)}</option>` : ''}</select>`;
  async function manage(msg) {
    frame('<div class="loading">불러오는 중…</div>', {back: list, backText: '학생', crumb: '학생 관리'});
    let all = [];
    try { all = await A.loadStudents(); } catch (e) { frame(`<p class="sub center">서버에서 불러오지 못했어요. (${esc(e.message)})</p>`, {back: list, backText: '학생'}); return; }
    const by = {};
    for (const s of all) (by[s.grade || '학년 없음'] = by[s.grade || '학년 없음'] || []).push(s);
    const order = Object.keys(by).sort((a, b) => (GRADES_OPT.indexOf(a) + 1 || 99) - (GRADES_OPT.indexOf(b) + 1 || 99));
    frame(`<div class="thead"><h2>👥 학생 관리 <small class="sub">${all.length}명</small></h2></div>
      ${msg ? `<p class="tmsg">${esc(msg)}</p>` : ''}
      <div class="tbox"><h3>새 학생 등록</h3>
        <div class="row"><input id="mName" class="tin" maxlength="20" placeholder="이름" autocomplete="off">${gradeSel('mGrade', '')}
        <input id="mPw" class="tin" type="text" maxlength="20" placeholder="비밀번호" autocomplete="off">
        <button class="primary small" id="mAdd">등록</button></div><span class="sub" id="mMsg">같은 이름이 있으면 이름 뒤에 구분자를 붙여 주세요(예: 김민준B)</span></div>
      ${order.map(g => `<div class="tbox"><h3>${esc(g)} <small>${by[g].length}명</small></h3>
        <div class="mlist">${by[g].map(s => `<button class="mstu" data-id="${esc(s.id)}"><b>${esc(s.name)}</b><span>수정 ›</span></button>`).join('')}</div></div>`).join('')}`,
      {back: list, backText: '학생', crumb: '학생 관리'});
    $('#mAdd').onclick = async () => {
      const name = $('#mName').value.trim(), grade = $('#mGrade').value, pw = $('#mPw').value;
      if (!name || !grade || !pw) { $('#mMsg').textContent = '이름, 학년, 비밀번호를 모두 넣어 주세요.'; return; }
      if (all.some(s => s.name === name)) { $('#mMsg').textContent = '같은 이름의 학생이 이미 있어요. 이름 뒤에 구분자를 붙여 주세요.'; return; }
      $('#mMsg').textContent = '등록 중…';
      try { await A.sbUpsert('students', {id: 's' + Date.now(), name, grade, pin_hash: await A.sha256(pw)}); }
      catch (e) { $('#mMsg').textContent = '저장하지 못했어요. 인터넷을 확인해 주세요.'; return; }
      manage(`✅ ${name} 학생을 등록했어요. 첫 화면에서 이름과 비밀번호로 들어갈 수 있어요.`);
    };
    root().querySelectorAll('.mstu').forEach(b => b.onclick = () => editStu(all.find(s => s.id === b.dataset.id), all));
  }
  function editStu(s, all) {
    frame(`<div class="thead"><h2>✏️ ${esc(s.name)} <small class="sub">${esc(s.grade || '')}</small></h2></div>
      <div class="tbox"><h3>정보 수정</h3>
        <label class="sub">이름</label><input id="eName" class="tin" maxlength="20" value="${esc(s.name)}">
        <label class="sub">학년</label>${gradeSel('eGrade', s.grade || '')}
        <label class="sub">새 비밀번호 <small>(바꿀 때만 — 아이가 잊었으면 새로 정해서 알려 주세요. 예전 비밀번호는 볼 수 없어요)</small></label>
        <input id="ePw" class="tin" type="text" maxlength="20" placeholder="비워 두면 그대로" autocomplete="off">
        <div class="row"><button class="primary small" id="eSave">저장</button><span class="sub" id="eMsg"></span></div></div>
      <div class="tbox"><h3>학생 지우기</h3><p class="sub">학생 계정만 지워요. 지금까지의 공부 기록은 서버에 남아요. 되돌릴 수 없어요.</p>
        <div class="row"><button class="ghost small danger" id="eDel">${esc(s.name)} 지우기</button></div></div>`,
      {back: () => manage(), backText: '학생 관리', crumb: s.name});
    $('#eSave').onclick = async () => {
      const name = $('#eName').value.trim(), grade = $('#eGrade').value, pw = $('#ePw').value;
      if (!name || !grade) { $('#eMsg').textContent = '이름과 학년을 넣어 주세요.'; return; }
      if (name !== s.name && all.some(x => x.name === name)) { $('#eMsg').textContent = '같은 이름의 학생이 이미 있어요.'; return; }
      $('#eMsg').textContent = '저장 중…';
      try { await A.sbUpsert('students', {id: s.id, name, grade, pin_hash: pw ? await A.sha256(pw) : s.pin_hash}); }
      catch (e) { $('#eMsg').textContent = '저장하지 못했어요. 인터넷을 확인해 주세요.'; return; }
      manage(pw ? `✅ ${name} 저장했어요. 새 비밀번호를 학생에게 알려 주세요.` : `✅ ${name} 저장했어요.`);
    };
    $('#eDel').onclick = async () => {
      if (!confirm(`${s.name} 학생을 지울까요? 되돌릴 수 없어요.`)) return;
      try { await A.sbDelete('students', 'id=eq.' + encodeURIComponent(s.id)); }
      catch (e) { alert('지우지 못했어요. 인터넷을 확인해 주세요.'); return; }
      manage(`${s.name} 학생을 지웠어요.`);
    };
  }

  /* 학기 별빛 = 학생 요약의 날짜별 별빛을 지금 학기 날짜로 더한 것(마스터가 학기 날짜를 바꾸면 바로 다시 계산) */
  const semStars = sid => { const v = STAR[sid]; if (!v || !v.days) return 0; const sm = A.S.sem(); return Object.entries(v.days).reduce((a, [d, n]) => a + ((d >= sm.start && (!sm.end || d < sm.end)) ? n : 0), 0); };
  // ── 학기 시작일(마스터 10/13: 실제 학기와 학원 학기가 다를 수 있어서 직접 정한다) ──
  function semEditor() {
    const list = (A.S.sems() || []).slice().sort((a, b) => (a.start < b.start ? -1 : 1)), cur = A.S.sem();
    const row = x => `<div class="semrow"><input type="date" class="semd" value="${esc(x.start || '')}"><input class="semn" maxlength="20" placeholder="이름 (예: 2026년 2학기)" value="${esc(x.name || '')}"><button type="button" class="ghost small semx">빼기</button></div>`;
    return `<h3>학기 <small>지금: ${esc(cur.name)} (${cur.start}부터${cur.end ? ' ~ ' + cur.end + ' 전날' : ''})</small></h3>
      <div class="tsem"><p class="sub">시작하는 날부터 학기 별빛이 0에서 다시 모여요 <details class="tq2"><summary>?</summary>전체 별빛은 그대로예요. 아무것도 없으면 3월 1일 · 9월 1일로 바뀌어요.</details></p>
      <div id="semRows">${list.map(row).join('')}</div>
      <div class="row"><button class="secondary small" id="semAdd">+ 학기 추가</button><button class="primary small" id="semSave">학기 저장</button><span class="sub" id="semMsg"></span></div></div>`;
  }
  function bindSem() {
    const rows = $('#semRows'); if (!rows) return;
    const bindX = () => rows.querySelectorAll('.semx').forEach(b => b.onclick = () => b.parentNode.remove());
    bindX();
    $('#semAdd').onclick = () => { const d = document.createElement('div'); d.className = 'semrow'; d.innerHTML = '<input type="date" class="semd"><input class="semn" maxlength="20" placeholder="이름 (예: 2026년 2학기)"><button type="button" class="ghost small semx">빼기</button>'; rows.appendChild(d); bindX(); d.querySelector('.semd').focus(); };
    $('#semSave').onclick = async () => {
      const out = [...rows.querySelectorAll('.semrow')].map(r => ({start: r.querySelector('.semd').value, name: r.querySelector('.semn').value.trim()})).filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x.start));
      out.forEach(x => { if (!x.name) x.name = x.start.slice(0, 4) + '년 ' + (+x.start.slice(5, 7) >= 2 && +x.start.slice(5, 7) <= 6 ? '1학기' : '2학기'); });
      out.sort((a, b) => (a.start < b.start ? -1 : 1));
      await A.store.set('app:semesters', {list: out, at: Date.now()}); A.S.useSems(out);
      $('#semMsg').textContent = '저장했어요'; setTimeout(settings, 500);
    };
  }

  // ── ✦ 별빛노트 관리(마스터 10/13) — 새로 올라온 것부터 · 확인 / 숨기기 ──
  async function noteAdmin(showAll) {
    frame('<div class="loading">불러오는 중…</div>', {back: list, backText: '학생', crumb: '별빛노트'});
    const v = await A.N.all();
    const rows = showAll ? v.rows : v.rows.filter(x => !x.mod);
    const qOf = x => { const ix = IDX[x.qid]; return ix ? ix : null; };
    frame(`<div class="thead"><h2>✦ 별빛노트</h2><button class="ghost small" id="nbAll">${showAll ? '확인 안 한 것만' : '전부 보기'}</button></div>
      <p class="sub">틀린 내용이면 <b>숨기기</b> · 괜찮으면 <b>확인</b> <details class="tq2"><summary>?</summary>학생에게는 질문마다 100점 대답 중 무작위 하나(없으면 90점)가 보여요. AI 가 다시 확인해서 통과한 것만 올라와요. 숨기면 다른 대답이 대신 보여요.</details></p>
      <ul class="tli tnb">${rows.map(x => { const ix = qOf(x); return `<li data-k="${esc(x.key)}"><div class="tqq"><span class="code">${esc(ix ? where(ix) : x.code)}</span><div class="tqt">${ix ? fm(ix.q) : ''}</div></div>
        <div class="tmeta"><b>${esc(x.name)}</b> · ${x.q}점 · ${ago(x.at)}${x.mod === 'hide' ? ' · 숨김' : x.mod === 'ok' ? ' · 확인함' : ' · 새로 올라옴'}${x.why ? ' · AI: ' + esc(x.why) : ''}</div>
        <p class="tans">${fm(x.ans)}</p>
        <div class="row">${x.mod !== 'ok' ? '<button class="secondary small" data-m="ok">✓ 확인</button>' : ''}${x.mod !== 'hide' ? '<button class="ghost small" data-m="hide">숨기기</button>' : '<button class="ghost small" data-m="">다시 보이기</button>'}</div></li>`; }).join('') || '<li class="sub">확인할 대답이 없어요</li>'}</ul>`, {back: list, backText: '학생', crumb: '별빛노트'});
    $('#nbAll').onclick = () => noteAdmin(!showAll);
    root().querySelectorAll('[data-m]').forEach(b => b.onclick = async () => { b.disabled = true; await A.N.setMod(b.closest('li').dataset.k, b.dataset.m); noteAdmin(showAll); });
  }

  // ── 학생 한 명 (마스터 10/13: 요약 + 메뉴 버튼 → 누르면 그 내용만) ──
  const PASS_ST = ['first', 'reask', 'kw', 'again', 'nextday', 'review'];
  const SEC = {stuck: '막힌 곳', helped: '도움 받고 통과', stars: '단원별 진도', rec: '최근 기록', open: '시간 · 잠금 풀기', time: '시간 설정', parent: '학부모 리포트', fun: '별빛 · 대결 · 계산', reset: '다시 하기'};
  const qItem = (ixOrNull, q, meta, extra) => `<li><div class="tqq">${ixOrNull ? `<span class="code">${esc(where(ixOrNull))}</span>` : ''}<div class="tqt">${fm(q || '')}</div></div><div class="tmeta">${meta}</div>${extra || ''}</li>`;
  const said = t => t ? `<details><summary>말한 내용 보기</summary><p>${esc(t)}</p></details>` : '';
  async function detail(s, sec) {
    const v = look(s);
    A.session.student = null;
    const bk = v.bk, todayLocked = v.stuck.filter(z => z.x.day === A.today()).length;
    if (!sec) {
      const done = bk.one.length + bk.h1.length + bk.h2.length;
      const items = [
        ['stuck', '🚧', v.stuck.length ? v.stuck.length + '개' : '없음', v.stuck.length > 0],
        ['helped', '💡', v.helped.length + '개'],
        ['stars', '🪐', '행성 ' + v.rk.lit + '/' + v.rk.total + ' · 난이도 열기'],
        ['rec', '📝', '말한 내용까지'],
        ['open', '🔓', todayLocked ? '잠긴 질문 ' + todayLocked + '개' : '시간 더 주기', todayLocked > 0],
        ['time', '⏱', v.noT ? '시간 제한 꺼짐(보강)' : v.ses + '분' + (v.qmin ? ' · 질문당 ' + v.qmin + '분' : ' · 질문당 기본'), v.noT],
        ['parent', '📨', '한마디 · 링크 복사'],
        ['fun', '🏅', '⭐ ' + semStars(s.id).toLocaleString('ko-KR')],
        ['reset', '🔄', '통과한 것 지우고 다시']];
      frame(`<div class="thead"><h2>${esc(s.name)} <small>${esc(s.grade)}</small></h2><span class="sub">마지막 ${ago(v.at)}</span></div>
        <div class="tcards four">
          <div class="tcard"><b>${v.rk.score != null ? Math.round(v.rk.score) : '—'}</b><span>이해 점수</span><small>선생님만</small></div>
          <div class="tcard"><b>${v.rk.icon} ${v.rk.name}</b><span>등급</span></div>
          <div class="tcard"><b>${done ? Math.round(100 * bk.one.length / done) + '%' : '—'}</b><span>한 번에 통과</span><small>${bk.one.length}/${done}</small></div>
          <div class="tcard ${bk.yet.length ? 'warn' : ''}"><b>${bk.yet.length}</b><span>아직 못 한 질문</span></div>
        </div>
        <div class="tmenu">${items.map(([k, ic, sub, hot]) => `<button class="tmbtn ${hot ? 'hot' : ''}" data-sec="${k}"><i>${ic}</i><b>${SEC[k]}</b><small>${esc(sub)}</small></button>`).join('')}</div>`,
        {back: list, backText: '학생', crumb: s.name});
      root().querySelectorAll('[data-sec]').forEach(b => b.onclick = () => detail(s, b.dataset.sec));
      return;
    }
    const opt = {back: () => detail(s), backText: s.name, crumb: SEC[sec]};
    const head = `<div class="thead"><h2>${SEC[sec]}</h2><span class="sub">${esc(s.name)}</span></div>`;
    let subs = [];
    if (['stuck', 'rec'].includes(sec)) {
      frame('<div class="loading">불러오는 중…</div>', opt);
      try { subs = await A.sbSelect('submissions', 'student_id=eq.' + encodeURIComponent(s.id) + '&course_id=eq.' + A.cid() + '&select=*&order=created_at.desc&limit=80') || []; } catch (e) {}
    }
    const lastSub = {}; for (const r of subs) if (r.question_id && !lastSub[r.question_id]) lastSub[r.question_id] = r;
    const helpTxt = x => HELP[x.help] ? '도움: ' + HELP[x.help] : '';
    let body = '';
    if (sec === 'stuck') {
      body = `<p class="sub">아직 통과하지 못한 질문이에요. 그때 아이가 한 생각과 말한 내용을 볼 수 있어요.</p><ul class="tli">${v.stuck.map(({id, x, ix}) => {
        const ls = lastSub[id], state = x.day === A.today() ? '내일 다시 열림' : '다시 열림';
        return qItem(ix, ix.q, esc([ST[ls?.stage] || (x.st === 'wait' ? '설명 보고 내일' : '막힘'), helpTxt(x), (x.tries || 1) + '번째', x.by === 'teacher' ? '선생님이 다시 열어 줌' : state].filter(Boolean).join(' · ')),
          (ls && ls.misconception ? `<div class="tmis">생각: ${esc(ls.misconception)}</div>` : '') + said(ls && ls.transcript));
      }).join('') || '<li class="sub">없어요</li>'}</ul>`;
    } else if (sec === 'helped') {
      body = `<p class="sub">되묻기·키워드·설명을 본 뒤에 통과한 질문이에요.</p><ul class="tli">${v.helped.map(({x, ix}) => qItem(ix, ix.q,
        `${x.qFirst ?? x.q}점 · ${esc(helpTxt(x) || '다음 날 통과')}${x.rv ? ' · 다시 빛내기 통과(' + x.q + ')' : ''}${x.by === 'teacher' ? ' · 선생님이 다시 열어 줌' : ''}`)).join('') || '<li class="sub">없어요</li>'}</ul>`;
    } else if (sec === 'stars') {
      body = `<p class="sub">「열린 난이도」를 바꾸면 학생이 그 난이도까지 바로 할 수 있어요.</p><div class="tbigs">${E.bigs().map(b => {
        const open = E.openRound(b.no), tOpen = +(OPEN[s.id] || {})[b.no] || 0;
        return `<div class="tbigc"><div class="tbh"><span class="code">${b.code}</span><b>${esc(b.title)}</b></div>
          <div class="tbr">${[1, 2, 3].map(r => { const c = E.bigCount(b, r), mis = b.smalls.filter(sm => A.M.done(sm, r)).length, bh = E.state(b.bh.id + ':r' + r).k === 'done';
            return `<div class="tbcell ${r > open ? 'off' : c.n && c.done === c.n ? 'full' : ''}"><small>난이도 ${r}</small><b>${r > open ? '🔒' : c.done + '/' + c.n}</b><i>${r <= open ? 'mission ' + mis + '/' + b.smalls.length + (bh ? ' · 블랙홀 ✓' : '') : '닫힘'}</i></div>`; }).join('')}</div>
          <label class="tbo">열린 난이도 <select data-big="${b.no}" class="topen">${[1, 2, 3].map(r => `<option value="${r}" ${r === open ? 'selected' : ''}>난이도 ${r}까지</option>`).join('')}</select>${tOpen ? '<small>선생님이 엶</small>' : ''}</label></div>`;
      }).join('')}</div>`;
    } else if (sec === 'rec') {
      body = `<p class="sub">최근 40개</p><ul class="tli">${subs.slice(0, 40).map(r => {
        const ix = IDX[r.question_id], ok = r.quality != null || PASS_ST.includes(r.stage), old = !r.stage;
        return qItem(ix, r.question, `${ago(new Date(r.created_at).getTime())} · ${old ? '옛 앱' : ok ? '통과' : '아직'}${r.stage ? ' · ' + esc(ST[r.stage] || r.stage) : ''}${r.quality != null ? ' · ' + r.quality + '점' : ''}${r.help && r.help !== 'none' ? ' · ' + esc(HELP[r.help] || r.help) : ''}`,
          (r.misconception ? `<div class="tmis">생각: ${esc(r.misconception)}</div>` : '') + said(r.transcript));
      }).join('') || '<li class="sub">아직 기록이 없어요</li>'}</ul>`;
    } else if (sec === 'open') {
      body = `<div class="tbox"><h3>⏱ 오늘 공부 시간 더 주기</h3><div class="row"><button class="secondary" data-cmd="5">5분 더</button><button class="secondary" data-cmd="10">10분 더</button></div></div>
        <div class="tbox"><h3>🔓 오늘 잠긴 질문 다시 열기</h3><p class="sub">지금 잠긴 질문 ${todayLocked}개 · 다시 연 질문은 '다음 날' 점수로 남아요.</p><div class="row"><button class="secondary" data-cmd="u" ${todayLocked ? '' : 'disabled'}>다시 열기</button></div></div>
        <p class="sub" id="tCmdM">학생 태블릿이 30초 안에 받아요.</p>`;
    } else if (sec === 'time') {
      body = `<div class="tbox"><h3>시간 제한</h3><label class="tchk"><input type="checkbox" id="tNoT" ${E.timerOff() ? 'checked' : ''}> 시간 제한 끄기 (보강)</label><p class="sub">끄면 질문 시간과 한 번 앉는 시간이 모두 멈춰요. 제대로 말할 때까지 남겨서 보강할 때 쓰세요. 친구와 대결은 그대로예요.</p></div>
        <div class="tbox"><h3>한 번 앉는 시간</h3><select id="tSes" class="tin">${E.SESSIONS.map(m => `<option value="${m}" ${m === E.sessionMin() ? 'selected' : ''}>${m}분</option>`).join('')}</select></div>
        <div class="tbox"><h3>질문 하나에 주는 시간</h3><select id="tPace" class="tin"><option value="0" ${!E.qmin() ? 'selected' : ''}>기본 (난이도 1 2분 · 2 3분 · 3 4분)</option>${E.QMINS.map(m => `<option value="${m}" ${m === E.qmin() ? 'selected' : ''}>${m}분</option>`).join('')}</select><p class="sub">계산이 필요한 질문은 1분 더</p></div>
        <p class="sub" id="tSetMsg">바꾸면 바로 저장돼요 · 다음 행성부터 적용</p>`;
    } else if (sec === 'parent') {
      const comment = (await A.store.get('app:comment:' + s.id + ':' + A.cid())) || {};
      body = `<div class="tbox"><h3>선생님 한마디</h3><p class="sub">리포트에 그대로 보여요.</p><textarea id="tCm" class="tin" rows="4">${esc(comment.text || '')}</textarea><div class="row"><button class="secondary small" id="tCmS">한마디 저장</button></div></div>
        <div class="tbox"><h3>리포트 링크</h3><p class="sub">학부모님께 보낼 주소예요. 한 번 만들면 늘 같은 주소예요.</p><div class="row"><button class="primary" id="tLink">링크 복사</button></div><input id="tUrl" class="turl" readonly hidden></div>
        <p class="sub" id="tMsg"></p>`;
    } else if (sec === 'reset') {
      const rr = RR, rounds = rr ? [rr] : [1, 2, 3], P = v.p;
      const tag = id => { const x = P.st[id]; return x ? (x.st === 'pass' ? '통과 ' + (x.qFirst ?? x.q ?? 100) + '점' : '아직') : ''; };
      const sm = (b, sml) => { const w = wipeOf(P, b, sml, rounds); return `<details class="trs"><summary><span><span class="code">${sml.code}</span> ${esc(sml.title)}</span><em>${w.nq ? '질문 ' + w.nq : ''}${w.nm ? ' · mission ' + w.nm : ''}</em></summary>
          <div class="row"><button class="secondary small" data-rs="s" data-k="${sml.code}" ${w.n ? '' : 'disabled'}>이 행성 전체 다시</button></div>
          <ul class="tli">${rounds.flatMap(r => E.tasks(sml, r).filter(t => P.st[t.id]).map(t => `<li><div class="tqq"><span class="code">${E.RT(r)}</span><div class="tqt">${fm(t.src.q.length > 70 ? t.src.q.slice(0, 70) + '…' : t.src.q)}</div></div><div class="tmeta">${tag(t.id)} <button class="ghost small" data-rs="q" data-k="${esc(t.id)}">다시</button></div></li>`)).join('') || '<li class="sub">아직 한 질문이 없어요</li>'}</ul></details>`; };
      body = `<p class="sub">아이가 보고 답했거나 성의 없이 통과한 것을 지우고 처음부터 다시 하게 해요. 그 질문의 점수·별빛·mission 결과가 지워지고, 말한 내용은 「최근 기록」에 남아요.</p>
        <label class="tbo">난이도 <select id="tRr" class="tin">${[0, 1, 2, 3].map(r => `<option value="${r}" ${r === rr ? 'selected' : ''}>${r ? '난이도 ' + r + '만' : '모든 난이도'}</option>`).join('')}</select></label>
        ${E.bigs().map(b => { const w = wipeOf(P, b, null, rounds); return `<div class="tbox"><div class="tbh"><span class="code">${b.code}</span><b>${esc(b.title)}</b></div>
          <p class="sub">${w.n ? `질문 ${w.nq}개 · mission ${w.nm}개 · 블랙홀 ${w.nb}개를 했어요` : '아직 한 것이 없어요'}</p>
          <div class="row"><button class="secondary small" data-rs="b" data-k="${b.no}" ${w.n ? '' : 'disabled'}>이 대단원 전체 다시</button></div>
          ${b.smalls.map(x => sm(b, x)).join('')}</div>`; }).join('')}
        <p class="sub" id="tRsM"></p>`;
    } else if (sec === 'fun') {
      const st = STAR[s.id] || {}, calc = v.p.calc || {}, bd = v.p.badge || {};
      const units = Object.entries(calc).map(([k, r]) => { const u = A.C && A.C.unit ? A.C.unit(k) : null; return `<li><b>${esc(u ? u.g.name + ' ' + u.u.title : A.C && A.C.wunit && A.C.wunit(k) ? '📖 용어 ' + A.C.wunit(k).gid.replace('e', '초') + ' ' + A.C.wunit(k).title : k.startsWith('w:') ? '용어 맞히기' : k)}</b><span>${r.plays}판 · 퉁구리 ${r.wins}승 · 최고 ${r.best.c}/${r.best.n || 10} ${r.best.t}초</span></li>`; }).join('');
      body = `<div class="tcards">
          <div class="tcard"><b>⭐ ${semStars(s.id).toLocaleString('ko-KR')}</b><span>학기 별빛</span><small>${esc(A.S.sem().name)}</small></div>
          <div class="tcard"><b>🌌 ${(st.total || 0).toLocaleString('ko-KR')}</b><span>이 과정 전체 별빛</span></div>
          <div class="tcard"><b>${bk.one.length} · ${bk.h1.length} · ${bk.h2.length}</b><span>한 번에 · 되묻기 뒤 · 도움 뒤</span></div>
          <div class="tcard"><b>${bd.concept || 0}승 · ${bd.calc || 0}승</b><span>대결 (개념 · 계산)</span></div></div>
        <div class="tbox"><h3>⚡ 계산 연습</h3><ul class="tcalc">${units || '<li class="sub">아직 안 했어요</li>'}</ul></div>`;
    }
    frame(head + body, opt);
    root().querySelectorAll('.topen').forEach(sel => sel.onchange = async () => {
      const t = Object.assign({}, OPEN[s.id] || {}); t[sel.dataset.big] = +sel.value;
      await A.store.set(E.okey(s.id), t); OPEN[s.id] = t; detail(s, 'stars');
    });
    root().querySelectorAll('[data-cmd]').forEach(b => b.onclick = async () => {
      const k = E.ckey(s.id), cur = (await A.store.get(k)) || {}, cmds = (cur.cmds || []).slice(-9);
      cmds.push({id: Date.now(), add: b.dataset.cmd === 'u' ? 0 : +b.dataset.cmd, unlock: b.dataset.cmd === 'u'});
      await A.store.set(k, {cmds}); $('#tCmdM').textContent = '✓ 보냈어요 · 학생 태블릿이 30초 안에 받아요'; if (b.dataset.cmd === 'u') b.disabled = true;
    });
    if ($('#tSes')) {
      const saveSet = async () => { const nv = {session: +$('#tSes').value, qmin: +$('#tPace').value, notimer: $('#tNoT').checked, at: Date.now()}; await A.store.set(E.skey(s.id), nv); SETS[s.id] = nv; $('#tSetMsg').textContent = '✓ 저장했어요 · 다음 행성부터 적용'; };
      $('#tSes').onchange = saveSet; $('#tPace').onchange = saveSet; $('#tNoT').onchange = saveSet;
    }
    if ($('#tRr')) $('#tRr').onchange = () => { RR = +$('#tRr').value; detail(s, 'reset'); };
    root().querySelectorAll('[data-rs]').forEach(bt => bt.onclick = async () => {
      const rounds = RR ? [RR] : [1, 2, 3], k = bt.dataset.k, P = v.p;
      let w, what;
      if (bt.dataset.rs === 'b') { const b = E.big(+k); w = wipeOf(P, b, null, rounds); what = b.code + ' ' + b.title + ' 전체'; if (!RR) w.open = [b.no]; }
      else if (bt.dataset.rs === 's') { const f = E.small(k); w = wipeOf(P, f.big, f.small, rounds); what = f.small.code + ' ' + f.small.title; }
      else { const ix = IDX[k]; w = {ids: [k], mis: [], n: 1, nq: 1, nm: 0, nb: 0}; what = '질문 하나 — ' + (ix ? ix.q : k); }
      const parts = [w.nq && '질문 ' + w.nq + '개', w.nm && 'mission ' + w.nm + '개', w.nb && '블랙홀 ' + w.nb + '개'].filter(Boolean).join(' · ');
      if (!confirm(`${s.name} — ${what}${RR ? ' (난이도 ' + RR + ')' : ''}

${parts}의 결과(점수·별빛)를 지우고 다시 하게 할까요?
말한 내용은 「최근 기록」에 남아요.`)) return;
      bt.disabled = true; $('#tRsM').textContent = '지우는 중…';
      try { await resetApply(s, {ids: w.ids, mis: w.mis, open: w.open || []}); $('#tRsM').textContent = '✓ 지웠어요 · 학생 태블릿이 30초 안에 받아요'; setTimeout(() => detail(s, 'reset'), 900); }
      catch (e) { bt.disabled = false; $('#tRsM').textContent = '지우지 못했어요 (' + (e.message || e) + ')'; }
    });
    if ($('#tCmS')) $('#tCmS').onclick = async () => { await A.store.set('app:comment:' + s.id + ':' + A.cid(), {text: $('#tCm').value.trim(), at: Date.now()}); $('#tMsg').textContent = '✓ 한마디를 저장했어요'; };
    if ($('#tLink')) $('#tLink').onclick = async () => {
      const url = await parentLink(s.id);
      const box = $('#tUrl'); box.value = url; box.hidden = false;
      try { await navigator.clipboard.writeText(url); $('#tMsg').textContent = '✓ 복사했어요'; }
      catch (e) { box.select(); $('#tMsg').textContent = '위 주소를 길게 눌러 복사하세요'; }
    };
  }

  /* ── 다시 하기 ── 한 대단원(sml 없음)·한 소단원에서 지울 것 모으기(rounds 의 난이도만). 결과가 있는 것만 */
  let RR = 0;
  function wipeOf(P, b, sml, rounds) {
    const ids = [], mis = []; let nq = 0, nm = 0, nb = 0;
    for (const x of (sml ? [sml] : b.smalls)) for (const r of rounds) {
      for (const t of E.tasks(x, r)) if (P.st[t.id]) { ids.push(t.id); nq++; }
      const mk = x.code + ':r' + r; if (P.mis && P.mis[mk]) { mis.push(mk); nm++; }
    }
    if (!sml && b.bh) for (const r of rounds) { const id = b.bh.id + ':r' + r; if (P.st[id]) { ids.push(id); nb++; } }
    return {ids, mis, nq, nm, nb, n: nq + nm + nb};
  }
  /* 서버 진도에서 바로 지우고(선생님 화면·리포트가 곧바로 바뀌게) + 학생 태블릿에 같은 명령(그 기기가 옛 진도를 갖고 있어도 받으면 지워지게) */
  async function resetApply(s, w) {
    const pk = 'app:prog:' + s.id + ':' + A.cid(), cur = await A.store.get(pk);
    if (cur) {
      E.wipe(cur, w); await A.store.set(pk, cur); PROG[s.id] = cur;
      try { A.session.student = {id: s.id, name: s.name, grade: s.grade}; E.use(JSON.parse(JSON.stringify(cur)), OPEN[s.id] || {}); A.S.push(); } finally { A.session.student = null; }
    }
    const k = E.ckey(s.id), c = (await A.store.get(k)) || {}, cmds = (c.cmds || []).slice(-9);
    cmds.push({id: Date.now(), reset: w});
    await A.store.set(k, {cmds});
  }

  /* 학부모 링크 = 학생마다 긴 무작위 글자(학생 번호만으로는 열리지 않게). 한 번 만들면 계속 같은 주소 */
  async function parentLink(sid) {
    let tk = await A.store.get('app:ptoken:' + sid);
    if (!tk || !tk.t) {
      const a = new Uint8Array(18); crypto.getRandomValues(a);
      tk = {t: Array.from(a, x => x.toString(36).padStart(2, '0')).join('').slice(0, 24)};
      await A.store.set('app:parent:' + tk.t, {sid, at: Date.now()});
      await A.store.set('app:ptoken:' + sid, tk);
    }
    return location.href.replace(/[^/]*$/, '') + 'parent.html?t=' + tk.t;
  }

  A.teacherStart = () => { let ok = false; try { ok = sessionStorage.getItem(SK) === '1'; } catch (e) {} ok ? list() : pin(); };
})();
