/* 새 앱 — 선생님 화면(teacher.html). 마스터 10/3: 설명은 걷어내고 깔끔하게.
   · PIN = 옛 앱과 같은 것(공유 저장소 config:teacherPin, 처음은 0000). 이 탭에서만 기억(sessionStorage).
   · 학생 목록: 등급·이해 점수(선생님만)·밝힌 행성·지금 위치·막힌 질문 수·마지막 활동
   · 학생 한 명: 막힌 곳 / 도움 받고 통과한 곳 / 별(대단원)마다 탐사 진도 + 회차 열기 / 최근 기록(말한 내용) / 학부모 리포트 링크·선생님 한마디
   · 진도는 학생 기기가 쓴 공유 저장소(app:prog:<학생>:e4-2)를 읽기만 한다. 선생님이 바꾸는 것(회차 열기)은 따로(app:open:…) 둔다. */
(() => {
  'use strict';
  const A = window.APP, E = A.E, esc = A.esc, fm = A.fm, $ = s => document.querySelector(s);
  const root = () => $('#app');
  const SK = 'app:teacher';
  const HELP = {kw: '키워드', short: '짧은 설명', long: '긴 설명', none: '', '': ''};
  const ST = {first: '한 번에', reask: '되묻기 뒤', kw: '키워드 뒤', short: '짧은 설명', long: '긴 설명', lock: '막힘', timeout: '시간 초과', again: '다음 날', nextday: '다음 날', review: '다시 빛내기', practice: '연습', battle: '대결'};

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
      <span class="crumb">${esc(opt.crumb || 'E4-2 은하')}</span><span class="who"><button class="ghost small" id="tOut">나가기</button></span></header><main class="tmain">${inner}</main>`;
    $('#tOut').onclick = () => { try { sessionStorage.removeItem(SK); } catch (e) {} pin(); };
    if (opt.back) $('#tBack').onclick = opt.back;
    window.scrollTo(0, 0);
  }

  // ── PIN ──
  function pin(msg) {
    root().innerHTML = `<main class="center"><form class="login" id="pf" autocomplete="off">
      <div class="title"><div class="mark">✦</div><h1>선생님</h1><p>말하는 수학 · E4-2</p></div>
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
    const [studs, progs, opens, sets, stars] = await Promise.all([A.loadStudents(), A.sbSelect('ai_cache', like('app:prog:*:e4-2')), A.sbSelect('ai_cache', like('app:open:*:e4-2')), A.sbSelect('ai_cache', like('app:set:*:e4-2')), A.sbSelect('ai_cache', like('app:star:*:e4-2')), A.S.loadSems()]);
    PROG = {}; OPEN = {}; SETS = {}; STAR = {};
    for (const r of stars || []) STAR[r.key.split(':')[2]] = r.value;
    try { const v = await A.N.all(); NB = {n: v.rows.filter(x => x.mod !== 'hide').length, fresh: v.rows.filter(x => !x.mod).length}; } catch (e) {}
    try { ACAD = ((await A.store.get('app:academy')) || {}).name || ''; } catch (e) {}
    for (const r of sets || []) SETS[r.key.split(':')[2]] = r.value;
    for (const r of progs || []) PROG[r.key.split(':')[2]] = r.value;
    for (const r of opens || []) OPEN[r.key.split(':')[2]] = r.value;
    STU = (studs || []).filter(s => /초\s*4|4학년/.test(s.grade || '') || PROG[s.id]).map(s => ({id: s.id, name: s.name, grade: s.grade || ''}));
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
    return {rk, bk, p, stuck, helped, nx, at: p.at || 0, any: !!PROG[s.id], ses: E.sessionMin(), qmin: E.qmin()};
  }

  // ── 학생 목록 (마스터 10/13: 한 화면에 다 보여 주지 말고, 누르면 보이게) ──
  async function list() {
    frame('<div class="loading">불러오는 중…</div>');
    try { await loadAll(); } catch (e) { frame(`<p class="sub center">서버에서 불러오지 못했어요. (${esc(e.message)})</p>`); return; }
    const rows = STU.map(s => ({s, v: look(s)}));
    rows.sort((a, b) => (b.v.stuck.length - a.v.stuck.length) || (b.v.at - a.v.at) || a.s.name.localeCompare(b.s.name, 'ko'));
    A.session.student = null;
    frame(`<div class="thead"><h2>학생 ${rows.length}명</h2><button class="ghost small" id="tRe">↻ 새로고침</button></div>
      <div class="tmenu two">
        <button class="tmbtn ${NB.fresh ? 'hot' : ''}" id="tNb"><i>✦</i><b>별빛노트</b><small>${NB.fresh ? '새 대답 ' + NB.fresh + '개 확인' : '새 대답 없음'}</small></button>
        <button class="tmbtn" id="tSet"><i>⚙</i><b>설정</b><small>학원 이름 · 학기 · 기기</small></button>
      </div>
      <div class="tlist">${rows.map(({s, v}) => `<button class="tstu" data-id="${esc(s.id)}">
        <span class="tsn"><b>${esc(s.name)}</b><small>${esc(s.grade)}</small></span>
        <span class="tsr">${v.any && v.rk.score != null ? `${v.rk.icon} ${v.rk.name}` : '<i>시작 전</i>'}</span>
        <span class="tsx">${v.stuck.length ? `<em>막힘 ${v.stuck.length}</em>` : ''}<small>${ago(v.at)}</small></span><span class="tsgo">›</span></button>`).join('') || '<p class="sub">초4 학생이 없어요.</p>'}</div>`);
    $('#tRe').onclick = list;
    $('#tNb').onclick = () => noteAdmin(false);
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
      <div class="tbox"><h3>다른 화면</h3><div class="row"><a class="secondary small" href="index.html">학생 화면 ›</a><a class="secondary small" href="../dodream.html">학생 등록 · 비밀번호 · AI 연결 (옛 선생님 화면) ›</a></div></div>`,
      {back: list, backText: '학생', crumb: '설정'});
    bindSem();
    $('#tAcadS').onclick = async () => { ACAD = $('#tAcad').value.trim(); await A.store.set('app:academy', {name: ACAD, at: Date.now()}); $('#tAcadM').textContent = '저장했어요'; };
    $('#tBuzz').onclick = () => { try { if (!buzz) { localStorage.removeItem('app:buzz'); navigator.vibrate && navigator.vibrate(30); } else localStorage.setItem('app:buzz', '0'); } catch (e) {} settings(); };
    $('#tDev').onclick = () => { try { if (dev) localStorage.removeItem('dd:academyDevice'); else localStorage.setItem('dd:academyDevice', '1'); } catch (e) {} settings(); };
  }

  /* 학기 별빛 = 학생 요약의 날짜별 별빛을 지금 학기 날짜로 더한 것(마스터가 학기 날짜를 바꾸면 바로 다시 계산) */
  const semStars = sid => { const v = STAR[sid]; if (!v || !v.days) return 0; const sm = A.S.sem(); return Object.entries(v.days).reduce((a, [d, n]) => a + ((d >= sm.start && (!sm.end || d < sm.end)) ? n : 0), 0); };
  // ── 학기 시작일(마스터 10/13: 실제 학기와 학원 학기가 다를 수 있어서 직접 정한다) ──
  function semEditor() {
    const list = (A.S.sems() || []).slice().sort((a, b) => (a.start < b.start ? -1 : 1)), cur = A.S.sem();
    const row = x => `<div class="semrow"><input type="date" class="semd" value="${esc(x.start || '')}"><input class="semn" maxlength="20" placeholder="이름 (예: 2026년 2학기)" value="${esc(x.name || '')}"><button type="button" class="ghost small semx">빼기</button></div>`;
    return `<h3>학기 <small>지금: ${esc(cur.name)} (${cur.start}부터${cur.end ? ' ~ ' + cur.end + ' 전날' : ''})</small></h3>
      <div class="tsem"><p class="sub">학원 학기가 시작하는 날을 적어 두면 그날부터 <b>학기 별빛</b>이 0에서 다시 모여요(전체 별빛은 그대로). 아무것도 없으면 3월 1일 · 9월 1일로 바뀌어요.</p>
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
      <p class="sub">학생에게는 질문마다 100점 대답 중 무작위 하나(없으면 90점)가 보여요. AI 가 다시 확인해서 통과한 것만 올라와요.<br>틀린 내용이 있으면 <b>숨기기</b> — 다른 대답이 대신 보여요. 괜찮으면 <b>확인</b>(새로 올라옴 표시가 사라져요).</p>
      <ul class="tli tnb">${rows.map(x => { const ix = qOf(x); return `<li data-k="${esc(x.key)}"><div class="tqq"><span class="code">${esc(ix ? where(ix) : x.code)}</span><div class="tqt">${ix ? fm(ix.q) : ''}</div></div>
        <div class="tmeta"><b>${esc(x.name)}</b> · ${x.q}점 · ${ago(x.at)}${x.mod === 'hide' ? ' · 숨김' : x.mod === 'ok' ? ' · 확인함' : ' · 새로 올라옴'}${x.why ? ' · AI: ' + esc(x.why) : ''}</div>
        <p class="tans">${fm(x.ans)}</p>
        <div class="row">${x.mod !== 'ok' ? '<button class="secondary small" data-m="ok">✓ 확인</button>' : ''}${x.mod !== 'hide' ? '<button class="ghost small" data-m="hide">숨기기</button>' : '<button class="ghost small" data-m="">다시 보이기</button>'}</div></li>`; }).join('') || '<li class="sub">확인할 대답이 없어요</li>'}</ul>`, {back: list, backText: '학생', crumb: '별빛노트'});
    $('#nbAll').onclick = () => noteAdmin(!showAll);
    root().querySelectorAll('[data-m]').forEach(b => b.onclick = async () => { b.disabled = true; await A.N.setMod(b.closest('li').dataset.k, b.dataset.m); noteAdmin(showAll); });
  }

  // ── 학생 한 명 (마스터 10/13: 요약 + 메뉴 버튼 → 누르면 그 내용만) ──
  const PASS_ST = ['first', 'reask', 'kw', 'again', 'nextday', 'review'];
  const SEC = {stuck: '막힌 곳', helped: '도움 받고 통과', stars: '단원별 진도', rec: '최근 기록', open: '시간 · 잠금 풀기', time: '시간 설정', parent: '학부모 리포트', fun: '별빛 · 대결 · 계산'};
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
        ['time', '⏱', v.ses + '분' + (v.qmin ? ' · 질문당 ' + v.qmin + '분' : ' · 질문당 기본')],
        ['parent', '📨', '한마디 · 링크 복사'],
        ['fun', '🏅', '⭐ ' + semStars(s.id).toLocaleString('ko-KR')]];
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
      try { subs = await A.sbSelect('submissions', 'student_id=eq.' + encodeURIComponent(s.id) + '&course_id=eq.e4-2&select=*&order=created_at.desc&limit=80') || []; } catch (e) {}
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
      body = `<p class="sub">별(큰 단원)마다 난이도 1·2·3 진도예요. 「열린 난이도」를 바꾸면 학생이 그 난이도까지 바로 할 수 있어요.</p><div class="tbigs">${E.bigs().map(b => {
        const open = E.openRound(b.no), tOpen = +(OPEN[s.id] || {})[b.no] || 0;
        return `<div class="tbigc"><div class="tbh"><span class="code">${b.code}</span><b>${esc(b.title)}</b></div>
          <div class="tbr">${[1, 2, 3].map(r => { const c = E.bigCount(b, r), mis = b.smalls.filter(sm => A.M.done(sm, r)).length, bh = E.state(b.bh.id + ':r' + r).k === 'done';
            return `<div class="tbcell ${r > open ? 'off' : c.n && c.done === c.n ? 'full' : ''}"><small>난이도 ${r}</small><b>${r > open ? '🔒' : c.done + '/' + c.n}</b><i>${r <= open ? 'mission ' + mis + '/' + b.smalls.length + (bh ? ' · 블랙홀 ✓' : '') : '닫힘'}</i></div>`; }).join('')}</div>
          <label class="tbo">열린 난이도 <select data-big="${b.no}" class="topen">${[1, 2, 3].map(r => `<option value="${r}" ${r === open ? 'selected' : ''}>난이도 ${r}까지</option>`).join('')}</select>${tOpen ? '<small>선생님이 엶</small>' : ''}</label></div>`;
      }).join('')}</div>`;
    } else if (sec === 'rec') {
      body = `<p class="sub">최근 40개 · 「말한 내용 보기」를 누르면 아이가 말한 그대로 보여요.</p><ul class="tli">${subs.slice(0, 40).map(r => {
        const ix = IDX[r.question_id], ok = r.quality != null || PASS_ST.includes(r.stage), old = !r.stage;
        return qItem(ix, r.question, `${ago(new Date(r.created_at).getTime())} · ${old ? '옛 앱' : ok ? '통과' : '아직'}${r.stage ? ' · ' + esc(ST[r.stage] || r.stage) : ''}${r.quality != null ? ' · ' + r.quality + '점' : ''}${r.help && r.help !== 'none' ? ' · ' + esc(HELP[r.help] || r.help) : ''}`,
          (r.misconception ? `<div class="tmis">생각: ${esc(r.misconception)}</div>` : '') + said(r.transcript));
      }).join('') || '<li class="sub">아직 기록이 없어요</li>'}</ul>`;
    } else if (sec === 'open') {
      body = `<div class="tbox"><h3>⏱ 오늘 공부 시간 더 주기</h3><div class="row"><button class="secondary" data-cmd="5">5분 더</button><button class="secondary" data-cmd="10">10분 더</button></div></div>
        <div class="tbox"><h3>🔓 오늘 잠긴 질문 다시 열기</h3><p class="sub">지금 잠긴 질문 ${todayLocked}개 · 다시 연 질문은 '다음 날' 점수로 남아요.</p><div class="row"><button class="secondary" data-cmd="u" ${todayLocked ? '' : 'disabled'}>다시 열기</button></div></div>
        <p class="sub" id="tCmdM">학생 태블릿이 30초 안에 받아요.</p>`;
    } else if (sec === 'time') {
      body = `<div class="tbox"><h3>한 번 앉는 시간</h3><select id="tSes" class="tin">${E.SESSIONS.map(m => `<option value="${m}" ${m === E.sessionMin() ? 'selected' : ''}>${m}분</option>`).join('')}</select></div>
        <div class="tbox"><h3>질문 하나에 주는 시간</h3><select id="tPace" class="tin"><option value="0" ${!E.qmin() ? 'selected' : ''}>기본 (난이도 1 2분 · 2 3분 · 3 4분)</option>${E.QMINS.map(m => `<option value="${m}" ${m === E.qmin() ? 'selected' : ''}>${m}분</option>`).join('')}</select><p class="sub">계산이 필요한 질문은 1분 더</p></div>
        <p class="sub" id="tSetMsg">바꾸면 바로 저장돼요 · 다음 행성부터 적용</p>`;
    } else if (sec === 'parent') {
      const comment = (await A.store.get('app:comment:' + s.id + ':e4-2')) || {};
      body = `<div class="tbox"><h3>선생님 한마디</h3><p class="sub">리포트에 그대로 보여요.</p><textarea id="tCm" class="tin" rows="4">${esc(comment.text || '')}</textarea><div class="row"><button class="secondary small" id="tCmS">한마디 저장</button></div></div>
        <div class="tbox"><h3>리포트 링크</h3><p class="sub">학부모님께 보낼 주소예요. 한 번 만들면 늘 같은 주소예요.</p><div class="row"><button class="primary" id="tLink">링크 복사</button></div><input id="tUrl" class="turl" readonly hidden></div>
        <p class="sub" id="tMsg"></p>`;
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
      const saveSet = async () => { const nv = {session: +$('#tSes').value, qmin: +$('#tPace').value, at: Date.now()}; await A.store.set(E.skey(s.id), nv); SETS[s.id] = nv; $('#tSetMsg').textContent = '✓ 저장했어요 · 다음 행성부터 적용'; };
      $('#tSes').onchange = saveSet; $('#tPace').onchange = saveSet;
    }
    if ($('#tCmS')) $('#tCmS').onclick = async () => { await A.store.set('app:comment:' + s.id + ':e4-2', {text: $('#tCm').value.trim(), at: Date.now()}); $('#tMsg').textContent = '✓ 한마디를 저장했어요'; };
    if ($('#tLink')) $('#tLink').onclick = async () => {
      const url = await parentLink(s.id);
      const box = $('#tUrl'); box.value = url; box.hidden = false;
      try { await navigator.clipboard.writeText(url); $('#tMsg').textContent = '✓ 복사했어요'; }
      catch (e) { box.select(); $('#tMsg').textContent = '위 주소를 길게 눌러 복사하세요'; }
    };
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
