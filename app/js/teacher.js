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
  const ST = {first: '한 번에', reask: '되묻기 뒤', kw: '키워드 뒤', short: '짧은 설명', long: '긴 설명', lock: '막힘', timeout: '시간 초과', again: '다음 날', nextday: '다음 날', review: '다시 빛내기', practice: '연습'};

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
  let STU = [], PROG = {}, OPEN = {}, SETS = {}, ACAD = '';
  async function loadAll() {
    const like = p => 'key=like.' + encodeURIComponent(p) + '&select=key,value&limit=1000';
    const [studs, progs, opens, sets] = await Promise.all([A.loadStudents(), A.sbSelect('ai_cache', like('app:prog:*:e4-2')), A.sbSelect('ai_cache', like('app:open:*:e4-2')), A.sbSelect('ai_cache', like('app:set:*:e4-2'))]);
    PROG = {}; OPEN = {}; SETS = {};
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

  // ── 학생 목록 ──
  async function list() {
    frame('<div class="loading">불러오는 중…</div>');
    try { await loadAll(); } catch (e) { frame(`<p class="sub center">서버에서 불러오지 못했어요. (${esc(e.message)})</p>`); return; }
    const rows = STU.map(s => ({s, v: look(s)}));
    rows.sort((a, b) => (b.v.stuck.length - a.v.stuck.length) || (b.v.at - a.v.at) || a.s.name.localeCompare(b.s.name, 'ko'));
    A.session.student = null;
    const dev = A.isAcademyDevice();
    frame(`<div class="thead"><h2>학생 ${rows.length}명</h2><button class="ghost small" id="tRe">새로고침</button></div>
      <div class="tlist">${rows.map(({s, v}) => `<button class="trow" data-id="${esc(s.id)}">
        <span class="tname">${esc(s.name)}<small>${esc(s.grade)}</small></span>
        <span class="trank">${v.any && v.rk.score != null ? `${v.rk.icon} ${v.rk.name} <b>${Math.round(v.rk.score)}</b>` : '<i>시작 전</i>'}</span>
        <span class="tlit">행성 ${v.rk.lit}/${v.rk.total}</span>
        <span class="tnow">${v.any && v.nx ? esc(v.nx.small ? v.nx.small.code : v.nx.big.code + ' 블랙홀') + ' · ' + E.RT(v.nx.r) : ''}</span>
        <span class="talert ${v.stuck.length ? 'on' : ''}">${v.stuck.length ? '막힘 ' + v.stuck.length : ''}</span>
        <span class="tago">${ago(v.at)}${v.ses !== 10 || v.qmin ? `<small>⏱ ${v.ses}분${v.qmin ? ' · 질문 ' + v.qmin + '분' : ''}</small>` : ''}</span></button>`).join('') || '<p class="sub">초4 학생이 없어요.</p>'}</div>
      <div class="tacad"><label>학원 이름 <input id="tAcad" maxlength="20" placeholder="예: 두드림 수학" value="${esc(ACAD)}"></label><button class="secondary small" id="tAcadS">저장</button><span class="sub" id="tAcadM">학생 화면 왼쪽 위에 보여요(비우면 「말하는 수학」)</span></div>
      <div class="tfoot">
        <button class="secondary small" id="tDev">${dev ? '✅ 이 기기는 학원 기기 · 해제' : '이 기기를 학원 기기로 등록'}</button>
        <button class="secondary small" id="tBuzz">${localStorage.getItem('app:buzz') === '0' ? '📳 진동 꺼짐 (이 기기) · 켜기' : '📳 진동 켜짐 (이 기기) · 끄기'}</button>
        <a class="ghost small" href="index.html">학생 화면 ›</a><a class="ghost small" href="../dodream.html">학생 등록 · 비밀번호 · AI 연결 (옛 선생님 화면) ›</a>
      </div>`);
    $('#tRe').onclick = list;
    $('#tAcadS').onclick = async () => { ACAD = $('#tAcad').value.trim(); await A.store.set('app:academy', {name: ACAD, at: Date.now()}); $('#tAcadM').textContent = '저장했어요'; };
    $('#tBuzz').onclick = () => { try { if (localStorage.getItem('app:buzz') === '0') { localStorage.removeItem('app:buzz'); navigator.vibrate && navigator.vibrate(30); } else localStorage.setItem('app:buzz', '0'); } catch (e) {} list(); };
    $('#tDev').onclick = () => { try { if (dev) localStorage.removeItem('dd:academyDevice'); else localStorage.setItem('dd:academyDevice', '1'); } catch (e) {} list(); };
    root().querySelectorAll('.trow').forEach(b => b.onclick = () => detail(STU.find(s => s.id === b.dataset.id)));
  }

  // ── 학생 한 명 ──
  async function detail(s) {
    const v = look(s);
    let subs = [];
    try { subs = await A.sbSelect('submissions', 'student_id=eq.' + encodeURIComponent(s.id) + '&course_id=eq.e4-2&select=*&order=created_at.desc&limit=80') || []; } catch (e) {}
    const lastSub = {}; for (const r of subs) if (r.question_id && !lastSub[r.question_id]) lastSub[r.question_id] = r;
    const bk = v.bk;
    const helpTxt = x => HELP[x.help] ? '도움: ' + HELP[x.help] : '';
    const stuckHtml = v.stuck.map(({id, x, ix}) => {
      const ls = lastSub[id];
      const state = x.day === A.today() ? '내일 다시 열림' : '다시 열림';
      return `<li><div class="tq"><span class="code">${esc(where(ix))}</span>${fm(ix.q)}</div>
        <div class="tmeta">${esc([ST[ls?.stage] || (x.st === 'wait' ? '설명 보고 내일' : '막힘'), helpTxt(x), (x.tries || 1) + '번째', x.by === 'teacher' ? '선생님이 다시 열어 줌' : state].filter(Boolean).join(' · '))}</div>
        ${ls && ls.misconception ? `<div class="tmis">생각: ${esc(ls.misconception)}</div>` : ''}
        ${ls && ls.transcript ? `<details><summary>말한 내용</summary><p>${esc(ls.transcript)}</p></details>` : ''}</li>`;
    }).join('');
    const helpedHtml = v.helped.slice(0, 12).map(({x, ix}) => `<li><div class="tq"><span class="code">${esc(where(ix))}</span>${fm(ix.q)}</div>
        <div class="tmeta">${(x.qFirst ?? x.q)}점 · ${esc(helpTxt(x) || '다음 날 통과')}${x.rv ? ' · 다시 빛내기 통과(' + x.q + ')' : ''}${x.by === 'teacher' ? ' · 선생님이 다시 열어 줌' : ''}</div></li>`).join('');
    const bigsHtml = E.bigs().map(b => {
      const open = E.openRound(b.no), tOpen = +(OPEN[s.id] || {})[b.no] || 0;
      const cells = [1, 2, 3].map(r => {
        const c = E.bigCount(b, r), mis = b.smalls.filter(sm => A.M.done(sm, r)).length, bh = E.state(b.bh.id + ':r' + r).k === 'done';
        return `<td class="${r > open ? 'off' : c.n && c.done === c.n ? 'full' : ''}">${r > open ? '🔒' : `${c.done}/${c.n}`}<small>${r <= open ? `mission ${mis}/${b.smalls.length}${bh ? ' · 블랙홀 ✓' : ''}` : ''}</small></td>`;
      }).join('');
      return `<tr><th><span class="code">${b.code}</span>${esc(b.title)}</th>${cells}
        <td><select data-big="${b.no}" class="topen">${[1, 2, 3].map(r => `<option value="${r}" ${r === open ? 'selected' : ''}>${E.RT(r)}까지</option>`).join('')}</select>${tOpen ? '<small>선생님이 엶</small>' : ''}</td></tr>`;
    }).join('');
    const recHtml = subs.slice(0, 40).map(r => {
      const ix = IDX[r.question_id];
      return `<li><div class="tq"><span class="code">${esc(ix ? where(ix) : (r.unit_label || ''))}</span>${fm(r.question || '')}</div>
        <div class="tmeta">${ago(new Date(r.created_at).getTime())} · ${r.pass ? '통과' : '아직'} · ${esc(ST[r.stage] || r.level || '')}${r.quality != null ? ' · ' + r.quality + '점' : ''}${r.help && r.help !== 'none' ? ' · ' + esc(HELP[r.help] || r.help) : ''}</div>
        ${r.misconception ? `<div class="tmis">생각: ${esc(r.misconception)}</div>` : ''}
        ${r.transcript ? `<details><summary>말한 내용</summary><p>${esc(r.transcript)}</p></details>` : ''}</li>`;
    }).join('');
    const comment = (await A.store.get('app:comment:' + s.id + ':e4-2')) || {};
    frame(`<div class="thead"><h2>${esc(s.name)} <small>${esc(s.grade)}</small></h2><span class="sub">${ago(v.at)}</span></div>
      <div class="tcards">
        <div class="tcard"><b>${v.rk.score != null ? Math.round(v.rk.score) : '—'}</b><span>이해 점수</span><small>선생님만</small></div>
        <div class="tcard"><b>${v.rk.icon} ${v.rk.name}</b><span>등급</span><small>행성 ${v.rk.lit}/${v.rk.total}</small></div>
        <div class="tcard"><b>${bk.one.length}</b><span>한 번에</span></div>
        <div class="tcard"><b>${bk.h1.length}</b><span>되묻기 뒤</span></div>
        <div class="tcard"><b>${bk.h2.length}</b><span>도움 뒤</span></div>
        <div class="tcard ${bk.yet.length ? 'warn' : ''}"><b>${bk.yet.length}</b><span>아직</span></div>
      </div>
      <h3 class="tsec">막힌 곳 <small>${v.stuck.length}</small></h3>
      <ul class="tli">${stuckHtml || '<li class="sub">없어요</li>'}</ul>
      <h3 class="tsec">도움 받고 통과 <small>${v.helped.length}</small></h3>
      <ul class="tli">${helpedHtml || '<li class="sub">없어요</li>'}</ul>
      <h3 class="tsec">별마다 탐사</h3>
      <div class="tscroll"><table class="tbig"><thead><tr><th></th><th>행성 탐사</th><th>별계 탐사</th><th>은하 탐사</th><th>열린 회차</th></tr></thead><tbody>${bigsHtml}</tbody></table></div>
      <h3 class="tsec">오늘 다시 열어 주기</h3>
      <div class="tset"><button class="secondary small" data-cmd="5">⏱ 5분 더</button><button class="secondary small" data-cmd="10">⏱ 10분 더</button><button class="secondary small" data-cmd="u" ${v.stuck.some(z => z.x.day === A.today()) ? '' : 'disabled'}>🔓 오늘 잠긴 질문 다시 열기 (${v.stuck.filter(z => z.x.day === A.today()).length}개)</button><span class="sub" id="tCmdM">학생 태블릿이 30초 안에 받아요 · 다시 연 질문은 '다음 날' 점수로 남아요</span></div>
      <h3 class="tsec">시간</h3>
      <div class="tset"><label>한 번 앉는 시간 <select id="tSes">${E.SESSIONS.map(m => `<option value="${m}" ${m === E.sessionMin() ? 'selected' : ''}>${m}분</option>`).join('')}</select></label>
        <label>질문당 시간 <select id="tPace"><option value="0" ${!E.qmin() ? 'selected' : ''}>기본 (행성 2분 · 별계 3분 · 은하 4분)</option>${E.QMINS.map(m => `<option value="${m}" ${m === E.qmin() ? 'selected' : ''}>${m}분</option>`).join('')}</select></label>
        <span class="sub" id="tSetMsg">계산이 필요한 질문은 1분 더</span></div>
      <h3 class="tsec">학부모 리포트</h3>
      <div class="tpar"><textarea id="tCm" rows="3" placeholder="선생님 한마디 (리포트에 그대로 보여요)">${esc(comment.text || '')}</textarea>
        <div class="row"><button class="secondary small" id="tCmS">한마디 저장</button><button class="primary small" id="tLink">리포트 링크 복사</button><span class="sub" id="tMsg"></span></div>
        <input id="tUrl" class="turl" readonly hidden></div>
      <h3 class="tsec">최근 기록</h3>
      <ul class="tli">${recHtml || '<li class="sub">아직 기록이 없어요</li>'}</ul>`, {back: list, backText: '학생', crumb: s.name});
    A.session.student = null;
    root().querySelectorAll('.topen').forEach(sel => sel.onchange = async () => {
      const t = Object.assign({}, OPEN[s.id] || {}); t[sel.dataset.big] = +sel.value;
      await A.store.set(E.okey(s.id), t); OPEN[s.id] = t; detail(s);
    });
    root().querySelectorAll('[data-cmd]').forEach(b => b.onclick = async () => {
      const k = E.ckey(s.id), cur = (await A.store.get(k)) || {}, cmds = (cur.cmds || []).slice(-9);
      cmds.push({id: Date.now(), add: b.dataset.cmd === 'u' ? 0 : +b.dataset.cmd, unlock: b.dataset.cmd === 'u'});
      await A.store.set(k, {cmds}); $('#tCmdM').textContent = '보냈어요 · 학생 태블릿이 30초 안에 받아요'; if (b.dataset.cmd === 'u') b.disabled = true;
    });
    const saveSet = async () => {
      const v = {session: +$('#tSes').value, qmin: +$('#tPace').value, at: Date.now()};
      await A.store.set(E.skey(s.id), v); SETS[s.id] = v; $('#tSetMsg').textContent = '저장했어요 · 다음 행성부터 적용';
    };
    $('#tSes').onchange = saveSet; $('#tPace').onchange = saveSet;
    $('#tCmS').onclick = async () => { await A.store.set('app:comment:' + s.id + ':e4-2', {text: $('#tCm').value.trim(), at: Date.now()}); $('#tMsg').textContent = '저장했어요'; };
    $('#tLink').onclick = async () => {
      const url = await parentLink(s.id);
      const box = $('#tUrl'); box.value = url; box.hidden = false;
      try { await navigator.clipboard.writeText(url); $('#tMsg').textContent = '복사했어요'; }
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
