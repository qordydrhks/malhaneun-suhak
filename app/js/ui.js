/* 새 앱 — 화면. 한 화면에 한 가지 일만(마스터 10/8: 최대한 간단하고 직관적으로, 뭘 해야 할지 바로 알게). */
(() => {
  'use strict';
  const A = window.APP, E = A.E, $ = s => document.querySelector(s), esc = A.esc, fm = A.fm;
  const root = () => $('#app');

  // ── 숫자 친구 ──
  const FR = {exi: ['엑시', '#c58ad8'], pola: ['폴라', '#f2737a'], aresi: ['아레시', '#4fb3e6'], iris: ['이리스', '#6f63e0'], lemma: ['렘마', '#5fc9a4']};
  const IMG = '../characters/img/';
  const BLINK = {question: 1, listening: 1, thinking: 1, hint: 1, solving: 1, retry: 1};
  let friend = null, lastLine = {};
  const myFriend = () => friend || A.ls.raw('dd:char:' + A.session.student.id) || null;
  const line = (sit) => {
    const id = myFriend() || 'exi', arr = (window.DDC_LINES?.[id]?.[sit]) || [''];
    let s = arr[Math.floor(Math.random() * arr.length)];
    if (arr.length > 1 && s === lastLine[sit]) s = arr[(arr.indexOf(s) + 1) % arr.length];
    return (lastLine[sit] = s);
  };
  const buddy = (state, size) => {
    const id = myFriend() || 'exi';
    return `<div class="buddy ${size || ''}" data-state="${state}"><img src="${IMG}${id}/${state}.webp" alt="${FR[id][0]}" data-id="${id}" data-st="${state}"></div>`;
  };
  setInterval(() => {                                          // 가끔 눈을 깜빡인다
    document.querySelectorAll('.buddy img').forEach(img => {
      const st = img.dataset.st; if (!BLINK[st] || Math.random() > 0.35) return;
      img.src = IMG + img.dataset.id + '/' + st + '-blink.webp';
      setTimeout(() => { img.src = IMG + img.dataset.id + '/' + st + '.webp'; }, 150);
    });
  }, 2600);
  const setBuddy = (state) => document.querySelectorAll('.stage .buddy img').forEach(img => { img.dataset.st = state; img.src = IMG + img.dataset.id + '/' + state + '.webp'; img.parentNode.dataset.state = state; });

  // ── 공통 틀 ──
  function frame(inner, opt) {
    opt = opt || {};
    const s = A.session.student;
    root().innerHTML = `<header class="bar">${opt.back ? `<button class="ghost" data-go="${opt.back}">‹ ${esc(opt.backText || '뒤로')}</button>` : `<span class="logo">${esc(A.academy || '말하는 수학')}</span>`}
      <span class="crumb">${esc(opt.crumb || '')}</span>
      <span class="who">${s ? `<button class="ghost small" data-go="logout">${esc(s.name)} · 나가기</button>` : ''}</span></header><main class="${opt.cls || ''}">${inner}</main>`;
    window.scrollTo(0, 0);
    tickClock();
  }
  /* 한 번 앉는 시간 시계(마스터 10/12: 10분 제한이 안 보여 조절이 안 됨) — 첫 질문을 시작하면 줄어든다 */
  let clockWarned = false;
  function tickClock() {
    if (!A.session.student || document.body.classList.contains('intro-on')) { document.getElementById('sclock')?.remove(); return; }
    const el = clockEl();
    const o = sess(), st = o.start, left = o.done ? 0 : sessLeft(o);
    el.querySelector('b').textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
    el.dataset.say = !st ? `오늘 공부 시간은 ${E.sessionMin() + (o.extra || 0)}분이야. 질문을 시작하면 줄어들어!` : left ? `오늘 공부 시간이 ${Math.ceil(left / 60)}분 남았어` : '오늘 시간이 다 됐어!';
    el.classList.toggle('idle', !st && !o.done); el.classList.toggle('low', !!st && left > 0 && left <= 60); el.classList.toggle('end', left === 0);
    if (st && left === 60 && !el.dataset.b60) { el.dataset.b60 = '1'; A.buzz(40); }
    if (st && left === 0 && !o.done && !clockWarned) { clockWarned = true; A.buzz([60, 80, 60]); toast('오늘 시간이 다 됐어! 지금 질문까지만 하자.'); }
    if (left > 0) clockWarned = false;
  }
  setInterval(tickClock, 1000);
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-go]'); if (!b) return;
    const g = b.dataset.go;
    if (g === 'home') home(); else if (g === 'logout') { A.logout(); login(); }
    else if (g.startsWith('big:')) star(+g.slice(4)); else if (g.startsWith('small:')) planet(g.slice(6), +b.dataset.r); else if (g.startsWith('bh:')) blackhole(+g.slice(3), +b.dataset.r); else if (g === 'record') record(); else if (g === 'guide') guide();
  });

  // ── 뒤로 가기(폰의 뒤로·취소 버튼) = 앱 안의 이전 화면 (옛 앱 v81.7 과 같은 방식) ──
  /* 화면을 누를 때(사용자 조작 순간) history 에 한 칸씩 쌓고, 뒤로 가면 그 칸의 화면을 다시 그린다.
     ⚠️ popstate 안에서는 pushState 를 하지 않는다(크롬이 조작 없이 넣은 칸을 건너뛰어 앱이 나가 버림 — 옛 앱 v81.5 에서 겪음).
     질문·mission 화면은 칸 하나('q')로 치고, 그 안에서 뒤로 가면 그만두고 앞 화면(행성 입구)으로. */
  const NAV = {cur: null, stack: [], restoring: false, silent: false, quit: null, backQuit: false};
  function navMark(route) {
    const key = JSON.stringify(route);
    if (route[0] !== 'q') NAV.quit = null;           // 질문 화면을 떠나면 그만두기 연결도 끊는다
    if (NAV.restoring) { NAV.cur = route; return; }
    const c = NAV.cur;
    if (c && JSON.stringify(c) === key) return;
    const st = {app: route, i: 0};
    try {
      if (!NAV.stack.length) { history.replaceState(st, ''); NAV.stack = [key]; }
      else if (NAV.stack.length >= 2 && NAV.stack[NAV.stack.length - 2] === key) { NAV.silent = true; history.back(); }   // 앱 안 ‹ 버튼으로 바로 앞 화면에 가면 칸을 쌓지 않고 되돌린다
      else if (c && c[0] === route[0] && (route[0] === 'record' || (route[0] === 'star' && c[1] === route[1]))) { st.i = NAV.stack.length - 1; history.replaceState(st, ''); NAV.stack[st.i] = key; }   // 탭만 바꿈
      else { st.i = NAV.stack.length; history.pushState(st, ''); NAV.stack.push(key); }
    } catch (e) {}
    NAV.cur = route;
  }
  function navGo(rt) {
    NAV.restoring = true;
    try { ({home, star, planet, record, guide, blackhole})[rt[0]](...rt.slice(1)); } finally { NAV.restoring = false; }
  }
  addEventListener('popstate', e => {
    const st = e.state && e.state.app ? e.state : null;
    if (!st || !A.session.student) return;
    NAV.stack.length = Math.min(NAV.stack.length, st.i + 1);
    if (NAV.silent) { NAV.silent = false; NAV.cur = st.app; return; }
    if (NAV.quit) { const q = NAV.quit; NAV.quit = null; NAV.backQuit = !!q(); }   // 질문·mission 중 → 그만두기(기록 없음)
    if (st.app[0] === 'q') { NAV.cur = st.app; history.back(); return; }              // 끝난 질문 칸은 건너뛴다
    navGo(st.app);
  });


  // ── 오늘 공부 시간 — 기기에 날짜별로 기억(새로고침·다시 로그인해도 이어짐, 새벽 4시에 새 날) ──
  /* 마스터 10/12: 시간이 끝나면 선생님이 시간을 더 주기 전까지는 다시 시작하지 않는다 */
  const SKEY = () => 'app:sess:' + A.session.student.id;
  const sess = () => { let o = A.ls.get(SKEY(), null); if (!o || o.day !== A.today()) o = {day: A.today(), start: 0, extra: 0, done: false}; return o; };
  const sessSave = o => A.ls.set(SKEY(), o);
  const sessTotal = o => (E.sessionMin() + (o.extra || 0)) * 60;
  const sessLeft = o => (o.start ? Math.max(0, Math.ceil(sessTotal(o) - (Date.now() - o.start) / 1000)) : sessTotal(o));
  const sessOver = o => !!(o.done || (o.start && sessLeft(o) === 0));
  const addTime = min => {                                         // 이미 끝났으면 '지금부터 min 분'
    const o = sess();
    if (sessOver(o) && o.start) o.extra = Math.ceil((Date.now() - o.start) / 60000) - E.sessionMin() + min; else o.extra = (o.extra || 0) + min;
    o.done = false; sessSave(o); tickClock();
  };

  // ── 🔑 선생님 열쇠(마스터 10/12) — 아이 태블릿에서 PIN 을 넣고 바로: 시간 더 주기 · 오늘 잠긴 질문 다시 열기 ──
  function keyModal(after) {
    document.querySelector('.kpop')?.remove();
    const d = document.createElement('div'); d.className = 'kpop';
    const locked = Object.values(E.prog().st).filter(x => x.st !== 'pass' && x.day === A.today()).length;
    d.innerHTML = `<form class="kpop-in" id="kf" autocomplete="off"><b>🔑 선생님 열쇠</b>
      <label>선생님 PIN<input id="kp" type="password" inputmode="numeric" autocomplete="off"></label><div class="kmsg" id="km"></div>
      <div class="krow" id="kact" hidden><button type="button" class="secondary" data-a="5">⏱ 5분 더</button><button type="button" class="secondary" data-a="10">⏱ 10분 더</button>
        <button type="button" class="secondary" data-a="u" ${locked ? '' : 'disabled'}>🔓 오늘 잠긴 질문 다시 열기 (${locked}개)</button></div>
      <div class="krow"><button type="submit" class="primary" id="kok">확인</button><button type="button" class="ghost" id="kx">닫기</button></div></form>`;
    document.body.appendChild(d);
    const close = () => d.remove();
    d.querySelector('#kx').onclick = close;
    d.onclick = e => { if (e.target === d) close(); };
    d.querySelector('#kp').focus();
    d.querySelector('#kf').onsubmit = async e => {
      e.preventDefault();
      if (!d.querySelector('#kact').hidden) return;
      d.querySelector('#km').textContent = '확인 중…';
      let ok = false; try { ok = await A.checkPin(d.querySelector('#kp').value); } catch (err) {}
      if (!ok) { d.querySelector('#km').textContent = 'PIN 이 맞지 않아요.'; return; }
      d.querySelector('#km').textContent = '무엇을 할까요?'; d.querySelector('#kact').hidden = false; d.querySelector('#kok').hidden = true; d.querySelector('label').hidden = true;
    };
    d.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      const a = b.dataset.a, p = E.prog(); p.log = p.log || [];
      if (a === 'u') { const n = E.unlockToday(); p.log.push({at: Date.now(), teacher: 'unlock', n}); await E.save(); toast(`선생님이 잠긴 질문 ${n}개를 다시 열어 주셨어!`); }
      else { addTime(+a); p.log.push({at: Date.now(), teacher: 'time', add: +a}); await E.save(); toast(`선생님이 ${a}분을 더 주셨어!`); }
      A.buzz([20, 40, 20]); close(); if (after) after();
    });
  }
  const keyBtn = () => '<button class="kbtn" data-key="1" aria-label="선생님 열쇠">🔑</button>';
  document.addEventListener('click', e => { if (e.target.closest('[data-key]')) { const f = NAV.cur; keyModal(() => f && f[0] !== 'q' ? navGo(f) : home()); } });

  // ── 선생님 화면에서 보낸 명령 받기(30초마다) ──
  async function applyCmds() {
    if (!A.session.student || !E.prog()) return;
    let v = null; try { v = await A.store.get(E.ckey(A.session.student.id)); } catch (e) { return; }
    const p = E.prog(), seen = p.cmdSeen || 0, nw = ((v && v.cmds) || []).filter(c => c.id > seen);
    if (!nw.length) return;
    let add = 0, n = 0;
    for (const c of nw) { if (c.add) { addTime(+c.add); add += +c.add; } if (c.unlock) n += E.unlockToday(); }
    p.cmdSeen = Math.max(...nw.map(c => c.id)); p.log = p.log || []; p.log.push({at: Date.now(), teacher: 'remote', add, n});
    await E.save(); A.buzz([20, 40, 20]);
    toast(add && n ? `선생님이 ${add}분을 더 주고 잠긴 질문 ${n}개를 열어 주셨어!` : add ? `선생님이 ${add}분을 더 주셨어!` : `선생님이 잠긴 질문 ${n}개를 다시 열어 주셨어!`);
    const f = NAV.cur; if (f && !NAV.quit && ['home', 'star', 'planet'].includes(f[0])) navGo(f);
  }
  setInterval(() => { if (document.visibilityState === 'visible') applyCmds(); }, 30000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') applyCmds(); });   // 화면이 다시 켜지면 바로
  A.applyCmds = applyCmds;

  // ── 용어 설명(마스터 10/12: 우리끼리 정한 이름은 가볍게 쓰되, 누르면 뜻이 나오게) ──
  const TERMS = {
    '난이도': '같은 별(큰 단원)을 세 번 공부해요. 난이도 1은 기본 뜻과 방법, 난이도 2는 조금 더 깊게, 난이도 3은 여러 개념을 이어서 생각해요. 앞 난이도를 다 하면 다음이 열려요.',
    '탐험가 등급': '얼마나 잘 이해했는지 보여 주는 등급이에요. 루나(달) → 테라(지구) → 솔(태양) → 갤럭시(은하) → 코스모스(우주) 순서로 올라가요. 스스로 한 번에 설명할수록 빨리 올라가요.',
    'mission': '행성 질문을 다 마치면 열리는 문제 풀기예요. 보기에서 답을 골라요.',
    '블랙홀 관문': '별의 행성을 모두 밝히면 열리는 마무리 질문이에요. 퉁구리가 숨어 있는 곳!',
    '다시 빛내기': '도움을 받아 통과한 질문을 일주일 뒤에 다시 물어봐요. 스스로 답하면 별빛이 다시 환해져요.',
    '다시 열린 질문': '어제 못 했던 질문이 오늘 다시 열렸어요. 먼저 해 보자!'
  };
  function showTerm(k) {
    document.querySelector('.tpop')?.remove();
    const d = document.createElement('div'); d.className = 'tpop';
    d.innerHTML = `<div class="tpop-in"><b>${esc(k)}</b><p>${esc(TERMS[k] || '')}</p><button class="ghost small">알겠어</button></div>`;
    d.onclick = () => d.remove(); document.body.appendChild(d); A.buzz(8);
  }
  document.addEventListener('click', e => {                           // 용어를 누르면 설명(바깥 버튼이 눌리지 않게 먼저 잡는다)
    const t = e.target.closest('[data-term]'); if (!t) return;
    e.preventDefault(); e.stopPropagation(); showTerm(t.dataset.term);
  }, true);

  // ── 진동(안드로이드만 — 아이패드·아이폰은 웹에서 진동을 막아 둠) ──
  /* 진동 넣는 곳(마스터 10/12 승인): 통과 톡톡 · 행성 밝힘 두-둥 · 큰 성취(mission 다 맞힘·블랙홀 통과·다음 난이도) 리듬 · 마이크 켜고 끌 때 톡 · 시계 1분/끝.
     틀렸을 때는 넣지 않는다(벌처럼 느껴져 되묻기·도움을 피하게 됨). 버튼마다 넣지 않는다 */
  const BZ = {pass: [25, 50, 25], planet: [60, 50, 140], big: [30, 40, 30, 40, 160], micOn: 14, micOff: 8, tap: 15};
  A.BZ = BZ;
  A.buzz = p => { try { if (p && navigator.vibrate && localStorage.getItem('app:buzz') !== '0') navigator.vibrate(p); } catch (e) {} };
  document.addEventListener('click', e => {                           // 캐릭터를 누르면 살짝 흔들리고 톡
    const img = e.target.closest('.buddy img'); if (!img) return;
    img.classList.remove('wig'); void img.offsetWidth; img.classList.add('wig'); A.buzz(BZ.tap);
  });

  // ── 오늘 공부 시간 시계 — 떠 있는 작은 시계, 끌어서 아무 데나 옮긴다(마스터 10/12) ──
  function clockEl() {
    let el = document.getElementById('sclock');
    if (el) return el;
    el = document.createElement('div'); el.id = 'sclock'; el.className = 'sclock'; el.setAttribute('role', 'timer'); el.title = '오늘 남은 공부 시간 · 끌어서 옮길 수 있어요';
    el.innerHTML = '<img src="img/ddoopi.webp" alt=""><b>10:00</b>';
    document.body.appendChild(el);
    const pos = A.ls.get('app:clockPos', null);
    const place = (x, y) => {                                        // 화면 밖으로 나가지 않게
      const w = el.offsetWidth || 90, h = el.offsetHeight || 34;
      x = Math.min(Math.max(4, x), innerWidth - w - 4); y = Math.min(Math.max(4, y), innerHeight - h - 4);
      el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.right = 'auto'; el.style.bottom = 'auto';
    };
    if (pos) requestAnimationFrame(() => { if (!el.dataset.dragged) place(pos.x * innerWidth, pos.y * innerHeight); });
    let drag = null;
    el.addEventListener('pointerdown', e => { const r = el.getBoundingClientRect(); drag = {dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY, moved: false}; el.setPointerCapture(e.pointerId); el.classList.add('hold'); });
    el.addEventListener('pointermove', e => { if (!drag) return; if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 6) drag.moved = true; if (drag.moved) place(e.clientX - drag.dx, e.clientY - drag.dy); });
    const up = () => {
      if (!drag) return; el.classList.remove('hold');
      if (drag.moved) { el.dataset.dragged = '1'; const r = el.getBoundingClientRect(); A.ls.set('app:clockPos', {x: r.left / innerWidth, y: r.top / innerHeight}); }
      else { el.classList.remove('wig'); void el.offsetWidth; el.classList.add('wig'); toast(el.dataset.say || '오늘 남은 공부 시간이야'); }
      drag = null;
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    addEventListener('resize', () => { const r = el.getBoundingClientRect(); place(r.left, r.top); });
    return el;
  }
  const toast = (t) => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.classList.add('on'), 20); setTimeout(() => { d.classList.remove('on'); setTimeout(() => d.remove(), 400); }, 2600); };

  // ── 1. 로그인 ──
  function login(msg) { A.intro(enter, msg); }
  async function enter() {
    root().innerHTML = '<div class="loading">불러오는 중…</div>';
    await E.load();
    try { A.academy = ((await A.store.get('app:academy')) || {}).name || ''; } catch (e) {}
    await applyCmds();
    friend = (A.ls.raw('dd:char:' + A.session.student.id) || '').replace(/"/g, '');
    if (!FR[friend]) friend = null;
    if (!friend) { const v = await A.store.get('char:' + A.session.student.id); if (v && FR[v.id]) { friend = v.id; try { localStorage.setItem('dd:char:' + A.session.student.id, v.id); } catch (e) {} } }
    if (!friend) return pick();
    if (!(await storySeen())) return story(home);
    home();
  }
  async function storySeen() {
    if (A.ls.raw('app:story:' + A.session.student.id)) return true;
    const v = await A.store.get('story:' + A.session.student.id); if (v) { A.ls.set('app:story:' + A.session.student.id, '1'); return true; }
    return false;
  }

  // ── 2. 친구 고르기 ──
  function pick() {
    frame(`<section class="pick"><h2>함께 탐험할 친구를 골라 줘</h2><div class="cards">${Object.keys(FR).map(id => `<button class="fcard" data-id="${id}"><img src="${IMG}${id}/card.webp" alt=""><b>${FR[id][0]}</b></button>`).join('')}</div><p class="sub">나중에 바꿀 수 있어요</p></section>`);
    root().querySelectorAll('.fcard').forEach(b => b.onclick = () => {
      friend = b.dataset.id; try { localStorage.setItem('dd:char:' + A.session.student.id, friend); } catch (e) {}
      A.store.set('char:' + A.session.student.id, {id: friend, at: new Date().toISOString()});
      storySeen().then(seen => (seen ? home() : story(home)));
    });
  }

  // ── 2-1. 처음 안내(이야기 4장) — 처음 한 번만, 우주 안내서에서 다시 보기 ──
  const storyKey = () => 'app:story:' + A.session.student.id;
  const SLIDES = [
    {who: 'tung', t: '큰일 났어!', b: '우주 몬스터 <b>퉁구리</b>가 E4-2 은하의 별빛을 몽땅 삼키고 어딘가에 숨어 버렸어.'},
    {who: 'me', st: 'question', t: '퉁구리의 약점은 수학!', b: '퉁구리는 <b>우주의 언어, 수학</b>을 못 알아들어. 네가 수학을 <b>네 말로 설명</b>하면 행성에 별빛이 다시 켜져.'},
    {who: 'me', st: 'hint', t: '막히면 내가 도와줄게', b: '대답하다 막히면 내가 생각할 방향을 알려 줄게. <b>스스로 한 번에 답하면 빛이 더 크게 모여.</b> 그래도 힌트를 보는 건 안 하는 것보다 훨씬 나아!'},
    {who: 'me', st: 'praise', t: '블랙홀까지 가자!', b: '별의 행성을 다 밝히면 끝에 있는 <b>블랙홀 관문</b>이 열려. 거기가 퉁구리 은신처야. 출동!'},
  ];
  function story(done) {
    let i = 0;
    const fin = () => { A.ls.set(storyKey(), '1'); A.store.set('story:' + A.session.student.id, {at: new Date().toISOString()}); done(); };
    const draw = () => {
      const s = SLIDES[i], last = i === SLIDES.length - 1;
      const pic = s.who === 'tung' ? `<img class="st-tung" src="img/tunguri.webp" alt="퉁구리">` : buddy(s.st, 'st-me');
      root().innerHTML = `<section class="story stage" data-i="${i}">
        <div class="st-top">${last ? '' : '<button class="ghost small" id="stSkip">건너뛰기 ›</button>'}</div>
        <div class="st-pic">${pic}</div>
        <h2>${s.t}</h2><p>${s.b}</p>
        <div class="st-dots">${SLIDES.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
        <div class="st-nav">${i ? '<button class="ghost" id="stPrev">‹ 이전</button>' : '<span></span>'}<button class="primary" id="stNext">${last ? '출동!' : '다음 ›'}</button></div>
      </section>`;
      window.scrollTo(0, 0);
      document.getElementById('stNext').onclick = () => (last ? fin() : (i++, draw()));
      const pv = document.getElementById('stPrev'); if (pv) pv.onclick = () => { i--; draw(); };
      const sk = document.getElementById('stSkip'); if (sk) sk.onclick = fin;
    };
    draw();
  }

  // ── 2-2. 우주 안내서 — 궁금한 아이가 눌러서 보는 설명(마스터 10/2: 설명은 늘 띄우지 않는다) ──
  function guide() {
    navMark(['guide']);
    const tiers = E.TIERS.map(t => `<li><span>${t[2]}</span><b>${t[0]}</b><small>${t[1]}</small></li>`).join('');
    const bigs = E.bigs().map(b => `<li><b>${esc(b.title)}</b><small>행성 ${b.smalls.length}개</small></li>`).join('');
    frame(`<section class="guide">
      <h2>E4-2 은하 탐험 안내</h2><p class="sub">4학년 2학기 수학이 하나의 은하예요. 퉁구리가 삼킨 별빛을 모두 되찾으면 클리어!</p>
      <details open><summary>🌌 은하 · 별 · 행성</summary><p><b>은하</b> = 한 학기 수학 전체 · <b>별</b> = 큰 단원 · <b>행성</b> = 작은 단원이에요. 이 은하에는 별이 6개 있어요.</p><ul class="g-bigs">${bigs}</ul></details>
      <details open><summary>✦ 어떻게 클리어해요?</summary><ol class="g-steps">
        <li>행성을 골라 <b>질문에 내 말로 설명</b>해요. 질문을 다 통과하면 행성이 밝아져요.</li>
        <li>행성을 다 밝히면 <b>mission</b>(문제 풀기)이 열려요.</li>
        <li>별의 행성을 모두 밝히면 별 옆의 <b>블랙홀 관문</b>이 열려요. 퉁구리가 숨은 곳이에요!</li>
        <li>별 하나를 다 하면 그 별의 <b>다음 난이도</b>가 열려요. 난이도 3까지 다 하면 그 별은 완전히 빛나요.</li></ol></details>
      <details><summary>🎚 난이도 1 · 2 · 3</summary><p>같은 별을 세 번 탐험해요.<br><b>난이도 1</b>(행성 탐사) 기본 뜻과 방법 · <b>난이도 2</b>(별계 탐사) 조금 더 깊게 · <b>난이도 3</b>(은하 탐사) 여러 개념을 이어서 생각하기. 지난 난이도는 언제든 연습할 수 있어요(점수는 그대로).</p></details>
      <details><summary>🎙 질문에 답하는 법</summary><p>마이크를 누르고 말하거나, <b>글로 쓰기</b>를 눌러 써도 돼요. 분수는 <b>분수·대분수 버튼</b>을 누르면 네모칸이 생겨요.<br>질문마다 <b>시간</b>이 있어요(위쪽 막대). 시간이 다 되면 그 질문은 내일 다시 열려요.</p></details>
      <details><summary>🤔 막히면?</summary><p>친구가 먼저 생각할 방향을 물어봐 줘요(<b>되묻기</b>). 그래도 어려우면 <b>도움</b>을 열어요. 키워드를 보면 오늘 다시 도전하고, 설명을 보면 <b>내일</b> 비슷한 질문으로 다시 물어봐요.</p></details>
      <details><summary>🎯 mission · hard mission</summary><p>행성 질문을 다 마치면 열리는 문제 풀기예요. 보기에서 답을 골라요. <b>hard mission</b>은 더 어려운 문제로, 하고 싶은 친구만! 틀려도 깎이지 않아요. 처음 푼 결과만 기록돼요.</p></details>
      <details><summary>✨ 다시 빛내기</summary><p>도움을 받아 통과한 질문은 일주일 뒤에 다시 물어봐요. 이번에 스스로 답하면 별빛이 다시 환해져요.</p></details>
      <details><summary>🏅 탐험가 등급</summary><p>이해가 커질수록 더 큰 세상으로 가요.</p><ul class="g-tiers">${tiers}</ul><p>스스로 한 번에 답하면 빛이 더 크게 모여요. 힌트를 봐도 안 한 것보다 훨씬 나아요. 갤럭시는 난이도 2, 코스모스는 난이도 3까지 해야 될 수 있어요.</p></details>
      <details><summary>⏱ 오늘 공부 시간</summary><p>화면에 떠 있는 작은 시계는 <b>오늘 남은 공부 시간</b>이에요. 다 되면 지금 질문까지만 하고 쉬어요. 시계는 <b>꾹 눌러 끌면</b> 다른 곳으로 옮길 수 있어요.</p></details>
      <details><summary>🔒 잠긴 질문</summary><p>오늘 못 한 질문은 <b>다음 날 새벽 4시</b>에 다시 열려요.</p></details>
      <details><summary>👋 친구 · 이야기</summary><p>숫자 탐험대 다섯 친구 중 네가 고른 친구가 함께 다녀요.</p><button class="ghost small" id="gPick">친구 바꾸기 ›</button> <button class="ghost small" id="gStory">이야기 다시 보기 ›</button></details>
    </section>`, {back: 'home', backText: '은하', crumb: '탐험 안내'});
    document.getElementById('gStory').onclick = () => story(guide);
    document.getElementById('gPick').onclick = () => pick();
  }


  // ── 3. 은하(홈) ──
  const HUES = ['#f3c969', '#7aa7ff', '#f29b8f', '#8fd6b4', '#c9a6ff', '#ffb36b'];
  function home() {
    navMark(['home']);
    const nx = E.nextPlace();
    const rk = E.rank();
    const lv = r => `${E.ROUND[r]}<span class="lvt tm" data-term="난이도">난이도 ${r}</span>`;
    frame(`<div class="homebar"><button class="rankbtn" data-go="record"><span class="rk-l">탐험가 등급<i class="tq" data-term="탐험가 등급">?</i></span><span class="rk-i">${rk.icon}</span><b>${rk.name}</b><small>밝힌 행성 ${rk.lit}/${rk.total} ›</small></button></div>
      <section class="hero stage">${buddy('idle')}<div class="bubble">${esc(line('hello'))}</div></section>
      ${nx ? (nx.why === 'bh'
               ? `<button class="primary big go" data-go="bh:${nx.big.no}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${esc(nx.big.title)} · <span class="tm" data-term="블랙홀 관문">블랙홀 관문</span> · ${lv(nx.r)}</small></button>`
               : `<button class="primary big go" data-go="small:${nx.small.code}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${esc(nx.small.title)} · ${lv(nx.r)}${nx.why === 'again' ? ' · <span class="tm" data-term="다시 열린 질문">다시 열린 질문</span>' : nx.why === 'mission' ? ` · <span class="tm" data-term="mission">${A.M.name(nx.r)}</span>` : nx.why === 'review' ? ' · <span class="tm" data-term="다시 빛내기">다시 빛내기</span>' : ''}</small></button>`)
             : `<div class="done-all">지금 열린 곳은 모두 탐험했어요 ✦</div>`}
      <button class="galbtn" data-go="guide"><b>E4-2 은하</b><span>4학년 2학기 · 탐험 안내 ›</span></button><div class="mapbox">${A.galaxyMap()}</div>`, {crumb: ''});
  }


  // ── 4. 별(대단원) ──
  const PLANET = ['#e8b04b', '#5b8def', '#e07a6a', '#55b892', '#a07ce0', '#e98b3f', '#4cb3c4', '#c46aa0'];
  function star(no, r) {
    const b = E.big(no), open = E.openRound(no);
    r = r || open;
    navMark(['star', no, r]);
    const tabs = [1, 2, 3].map(k => `<button class="tab ${k === r ? 'on' : ''}" ${k > open ? 'disabled' : ''} data-r="${k}">${k > open ? '🔒 ' : ''}${E.RL(k)}</button>`).join('');
    const c = E.bigCount(b, r);
    frame(`<h2 class="ttl"><span class="code">${b.code}</span>${esc(b.title)}</h2><div class="tabs">${tabs}</div>
      <div class="mapbox">${A.starMap(b, r)}</div>
      <p class="sub center">${E.RL(r)} — 밝힌 행성 ${b.smalls.filter(s => { const k = E.count(s, r); return k.n && k.done === k.n; }).length}/${b.smalls.length}${r < open ? ' · 지난 탐사는 연습(점수·등급 그대로)' : ''}</p>
      <ul class="plist">${b.smalls.map((s, i) => {                   // 행성 이름은 지도 아래 목록으로(마스터 10/12: 지도 글씨가 너무 작다)
        const c = E.count(s, r), t = E.tasks(s, r), k = t.map(x => E.state(x.id).k);
        const done = c.n && c.done === c.n;
        const st = done ? '✦ 밝힘' : k.includes('next') ? '다시 열림' : (k.includes('today') && !k.includes('new')) ? '내일 열림' : c.done ? c.done + '/' + c.n : '';
        return `<li><button class="prow ${done ? 'lit' : ''}" data-go="small:${s.code}" data-r="${r}"><i style="--p:${A.planetColor(i)}">${i + 1}</i><span>${esc(s.title)}</span><b>${st}</b></button></li>`;
      }).join('')}</ul>`, {back: 'home', backText: '은하', crumb: b.code});
    root().querySelectorAll('.tab').forEach(t => t.onclick = () => star(no, +t.dataset.r));
    const bh = document.getElementById('bhBtn');
    if (bh) bh.onclick = () => (A.bhOpen(b, r) ? blackhole(no, r) : toast(E.RT(r) + '의 행성을 모두 밝히면 열려요'));
  }

  // ── 5. 행성 입구 ──
  function planet(code, r) {
    navMark(['planet', code, r]);
    const {big, small} = E.small(code), t = E.tasks(small, r);
    const todo = t.filter(x => ['new', 'next'].includes(E.state(x.id).k));
    const locked = t.filter(x => E.state(x.id).k === 'today').length;
    const rv = E.reviewList(small, r);
    const practice = !todo.length && !locked;
    const min = Math.round(E.limit(r) / 60 * 2) / 2;
    frame(`<section class="entry stage"><div class="orb big" style="--p:${PLANET[big.smalls.indexOf(small) % 8]}"></div>
      <div class="code">${small.code}</div><h2>${esc(small.title)}</h2><div class="chip">${E.RL(r)}</div>
      <p class="sub">${todo.length ? `질문 ${todo.length}개 · 하나에 약 ${min}분` : (locked ? `남은 질문 ${locked}개는 내일 다시 열려요` : '다 탐험했어요')}</p>${locked && !todo.length ? keyBtn() : ''}
      ${rv.length ? `<button class="primary big" id="rv"><span>다시 빛내기 ${rv.length}개</span><small>일주일 전에 도움을 받았던 질문이야</small></button>` : ''}
      ${todo.length ? `<button class="primary big" id="go">출발</button>` : ''}
      ${!todo.length && A.M.ready(small, r) ? missionBtns(small, r) : ''}
      ${practice ? `<button class="secondary" id="pr">질문 연습하기 (점수는 그대로)</button>` : ''}</section>`, {back: 'big:' + big.no, backText: big.code, crumb: small.code});
    if ($('#go')) $('#go').onclick = () => run(big, small, r, todo, false);
    if ($('#rv')) $('#rv').onclick = () => run(big, small, r, rv, 'review');
    bindMission(big, small, r);
    if ($('#pr')) $('#pr').onclick = () => run(big, small, r, t, true);
  }

  // ── 6. 한 행성의 질문들 ──
  async function run(big, small, r, list, practice) {
    if (!A.isAcademyDevice()) return blocked();
    await E.loadSettings();                       // 선생님이 바꾼 시간이 바로 들어오게
    await applyCmds();
    { const o = sess(); if (sessOver(o)) return sessionEnd(0); if (!o.start) { o.start = Date.now(); sessSave(o); } }
    tickClock();
    let opened = 0, passed = 0;
    for (let i = 0; i < list.length; i++) {
      if (!practice && E.tasks(small, r).filter(x => E.state(x.id).k !== 'done').length <= 2) A.M.prefetch(small, r);
      const out = await ask(big, small, list[i], i, list.length, practice);
      if (out === 'quit') { if (NAV.backQuit) { NAV.backQuit = false; return; } return planet(small.code, r); }
      if (out && out.pass) passed++;
      if (out && out.opened) opened = out.opened;
      if (sessOver(sess()) && i < list.length - 1) return sessionEnd(passed);
    }
    finish(big, small, r, passed, list.length, opened, practice);
  }
  function blocked() {
    frame(`<section class="center-msg stage">${buddy('retry')}<h2>학원 태블릿에서만 공부할 수 있어요</h2><p class="sub">선생님이 이 기기를 학원 기기로 등록하면 열려요.</p><button class="secondary" data-go="home">은하로</button><a class="ghost small" href="teacher.html">선생님: 이 기기 등록하기 ›</a></section>`);
  }
  function sessionEnd(passed) {
    const o = sess(); o.done = true; sessSave(o); tickClock();
    frame(`<section class="center-msg stage">${buddy('praise')}<h2>오늘은 여기까지!</h2><p class="sub">${passed ? `오늘 질문 ${passed}개에 불을 켰어요.` : `오늘 공부 시간을 다 썼어요. 다음에 또 만나!`}</p><button class="primary big" data-go="home">은하로 돌아가기</button>${keyBtn()}</section>`);
  }
  function finish(big, small, r, passed, n, opened, practice) {
    if (!practice) A.buzz(opened ? BZ.big : passed === n ? BZ.planet : 0);
    frame(`<section class="center-msg stage">${buddy(passed ? 'praise' : 'idle')}<h2>${practice ? '연습 끝!' : (passed === n ? '행성에 불이 켜졌어!' : '탐사 끝!')}</h2>
      <p class="sub">${esc(small.title)} · ${E.RL(r)} — 통과 ${passed}/${n}${passed < n && !practice ? ' · 남은 질문은 내일 다시 열려요' : ''}</p>
      ${opened ? `<div class="unlock">✦ ${esc(big.title)}의 ${E.RT(opened)}가 열렸어요!</div>` : ''}
      ${!practice && A.M.ready(small, r) && !A.M.done(small, r) ? missionBtns(small, r) : `<button class="primary big" data-go="big:${big.no}">${big.code}로</button>`}
      <button class="ghost" data-go="home">은하로</button></section>`);
    bindMission(big, small, r);
  }

  // ── 블랙홀 관문 (퉁구리 은신처) ──
  async function blackhole(no, r) {
    if (!A.isAcademyDevice()) return blocked();
    const big = E.big(no), id = A.bhTaskId(big, r), done = A.bhDone(big, r), st = E.state(id);
    if (!A.bhOpen(big, r)) return star(no, r);
    navMark(['blackhole', no, r]);
    if (st.k === 'today') return frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>블랙홀이 닫혔어</h2><p class="sub">내일 새벽 4시에 다시 열려요.</p><button class="primary big" data-go="big:${no}">${big.code}로</button></section>`);
    frame(`<section class="center-msg stage bhin"><div class="bhole"></div><img class="mload peek" src="img/tunguri.webp" alt="">
      <h2>${big.code} 블랙홀 관문</h2><p class="sub">퉁구리가 이 안에 별빛을 숨겼어!<br>${E.RT(r)}에서 배운 것을 말하면 블랙홀을 통과할 수 있어.</p>
      <button class="primary big" id="bgo">${done ? '다시 들어가기 (연습)' : '들어가기'}</button><button class="ghost" data-go="big:${no}">${big.code}로</button></section>`, {back: 'big:' + no, backText: big.code, crumb: big.code + ' · 블랙홀'});
    $('#bgo').onclick = async () => {
      const pseudo = {code: big.code + ' 블랙홀', title: '블랙홀 관문', unitId: '', unitLabel: '🕳 블랙홀 · ' + big.title, key: ''};
      const out = await ask(big, pseudo, {kind: 'bh', id, r, src: big.bh[r]}, 0, 1, done);
      if (out === 'quit') { if (NAV.backQuit) { NAV.backQuit = false; return; } return star(no, r); }
      if (out && out.pass && !done) {
        A.buzz(BZ.big);
        frame(`<section class="center-msg stage"><div class="chest">✦</div><h2>별빛 상자를 찾았어!</h2>
          <p class="sub">퉁구리가 숨겨 둔 별빛을 되찾았어. 퉁구리는 깜짝 놀라 다음 별로 도망갔어!</p>
          <img class="mload flee" src="img/tunguri.webp" alt=""><button class="primary big" data-go="home">은하로</button></section>`);
      } else star(no, r);
    };
  }

  // ── 나의 기록 ──
  function record(which) {
    navMark(['record', which || null]);
    const rk = E.rank(), bk = E.book();
    const LBL = {one: ['한 번에', 'one pass'], h1: ['되묻기 뒤', 'hint 1'], h2: ['도움 뒤', 'hint 2'], yet: ['아직', '다시 하면 빛나요']};
    const nameOf = it => it.t.kind === 'bh' ? it.b.title + ' 블랙홀 · ' + E.RT(it.r) : it.s.title + ' · ' + E.RT(it.r);
    const qOf = it => { const x = E.status(it.t.id); return it.t.kind === 'bh' ? it.b.bh[it.r].q : it.t.kind === 'lad' ? it.t.src.q : it.t.src.q; };
    const list = which ? bk[which].map(it => `<li><button class="rec" ${which === 'yet' && it.s ? `data-go="small:${it.s.code}" data-r="${it.r}"` : (which === 'yet' ? `data-go="bh:${it.b.no}" data-r="${it.r}"` : '')}>
        <span class="code">${esc(nameOf(it))}</span><span>${fm(qOf(it))}</span>${which === 'yet' ? '<b>다시 하기 →</b>' : ''}</button></li>`).join('') : '';
    frame(`<section class="book">
      <div class="rankcard"><div class="ri">${rk.icon}</div><div><div class="rn">${rk.name} <small>(${rk.ko})</small></div>
        <div class="sub">행성 ${rk.lit}/${rk.total}개를 밝혔어</div></div></div>
      <details class="how"><summary>등급은 어떻게 올라가?</summary><p>스스로 한 번에 답하면 빛이 가장 크게 모여. 되묻기나 도움을 봐도 안 하는 것보다 훨씬 많이 모여!<br>
        루나 → 테라 → 솔 → 갤럭시 → 코스모스. 갤럭시는 별계 탐사, 코스모스는 은하 탐사까지 해야 될 수 있어.</p></details>
      <div class="stats">${Object.keys(LBL).map(k => `<button class="stat ${which === k ? 'on' : ''}" data-k="${k}"><b>${bk[k].length}</b><span>${LBL[k][0]}</span><small>${LBL[k][1]}</small></button>`).join('')}</div>
      ${which ? `<ul class="reclist">${list || '<li class="sub">아직 없어요</li>'}</ul>` : '<p class="sub center">숫자를 누르면 그 질문들을 볼 수 있어.</p>'}
    </section>`, {back: 'home', backText: '은하', crumb: '나의 기록'});
    root().querySelectorAll('.stat').forEach(b => b.onclick = () => record(b.dataset.k === which ? null : b.dataset.k));
  }

  // ── mission (문제 풀기) ──
  function missionBtns(small, r) {
    const res = A.M.result(small, r), hres = A.M.result(small, r, true);
    if (!res) return `<button class="primary big mbtn" id="mGo"><span>${A.M.name(r)}</span><small>문제 ${A.M.count(small, r)}개 · 퉁구리가 숨긴 별빛 찾기</small></button>`;
    return `<div class="mres">${A.M.name(r)} ✦ ${res.c}/${res.n}${hres ? ` · ${A.M.name(r, true)} ✦ ${hres.c}/${hres.n}` : ''}</div>
      ${!hres ? `<button class="secondary mbtn" id="mHard"><b>${A.M.name(r, true)}</b> <small>도전해 볼래? (선택 · 틀려도 괜찮아)</small></button>` : ''}
      <button class="ghost" id="mAgain">${A.M.name(r)} 다시 풀기 (연습)</button>`;
  }
  function bindMission(big, small, r) {
    if ($('#mGo')) $('#mGo').onclick = () => mission(big, small, r, false);
    if ($('#mHard')) $('#mHard').onclick = () => mission(big, small, r, true);
    if ($('#mAgain')) $('#mAgain').onclick = () => mission(big, small, r, false);
  }
  /* AI 문제의 대분수 "1 2/9"(띄어 씀) → "1과 2/9" 로 바꿔 교재처럼 자연수 바로 옆에 분수가 붙게 (mfmt 가 와/과 꼴을 대분수로 그린다) */
  const mx = t => String(t ?? '').replace(/(^|[^\d.\/])(\d+) (\d+\/\d+)/g, (m, p, w, f) => p + w + ({0: '과', 1: '과', 3: '과', 6: '과', 7: '과', 8: '과'}[w.slice(-1)] || '와') + ' ' + f);
  async function mission(big, small, r, hard) {
    if (!A.isAcademyDevice()) return blocked();
    const name = A.M.name(r, hard);
    navMark(['q']); let alive = true; NAV.quit = () => { alive = false; };
    frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>${esc(name)}</h2><p class="sub"><span class="spin"></span> 퉁구리가 숨겨 둔 문제를 찾는 중…</p></section>`, {crumb: small.code + ' · ' + name});
    let quiz;
    try { quiz = await A.M.get(small, r, hard); if (!alive) return; }
    catch (e) {
      if (!alive) return;
      NAV.quit = null;
      frame(`<section class="center-msg stage">${buddy('retry')}<h2>문제를 못 찾았어</h2><p class="sub">${esc(e.message)}</p><button class="primary big" id="rt">다시 찾기</button><button class="ghost" data-go="big:${big.no}">${big.code}로</button></section>`);
      $('#rt').onclick = () => mission(big, small, r, hard);
      return;
    }
    const first = !A.M.done(small, r, hard);
    let k = 0, ok = 0;
    const one = () => {
      const it = quiz[k];
      const dots = quiz.map((_, j) => `<i class="${j < k ? 'd' : j === k ? 'c' : ''}"></i>`).join('');
      frame(`<div class="qtop"><div class="dots">${dots}</div><span class="mtag">${esc(name)}${first ? '' : ' · 연습'}</span></div>
        <section class="qcard mq"><div class="q">${fm(mx(it.stem))}</div>
        <div class="chs">${it.choices.map((c, j) => `<button class="ch" data-j="${j}"><span class="cn">${'①②③④'[j]}</span><span class="ct">${fm(mx(c))}</span></button>`).join('')}</div>
        <div class="say" id="say"></div></section><div class="row" id="nx"></div>`, {back: 'big:' + big.no, backText: '그만하기', crumb: small.code});
      root().querySelectorAll('.ch').forEach(b => b.onclick = () => {
        const j = +b.dataset.j, right = j === it.answer; if (right) ok++;
        root().querySelectorAll('.ch').forEach(x => { x.disabled = true; if (+x.dataset.j === it.answer) x.classList.add('right'); });
        if (!right) b.classList.add('wrong');
        $('#say').innerHTML = `<div class="sbubble ${right ? 'ok' : 'warn'}"><b>${right ? '정답!' : '아쉬워!'}</b> ${fm(mx(it.explain))}</div>`;
        $('#nx').innerHTML = `<button class="primary big" id="nb">${k < quiz.length - 1 ? '다음 문제' : '결과 보기'}</button>`;
        $('#nb').onclick = () => { k++; k < quiz.length ? one() : done(); };
      });
    };
    const done = async () => {
      NAV.quit = null;
      const saved = first ? await A.M.save(big, small, r, hard, ok, quiz.length) : false;
      const all = ok === quiz.length;
      if (all && first) A.buzz(BZ.big);
      frame(`<section class="center-msg stage">${all ? buddy('praise') : `<img class="mload" src="img/tunguri.webp" alt="">`}
        <h2>${all ? '별빛을 모두 되찾았어!' : ok ? '별빛을 조금 되찾았어!' : '퉁구리가 도망갔어…'}</h2>
        <div class="score">${ok}<small> / ${quiz.length}</small></div>
        <p class="sub">${esc(name)}${saved ? '' : ' · 연습(처음 결과는 그대로)'}</p>
        ${!hard && !A.M.done(small, r, true) ? `<button class="secondary mbtn" id="mHard"><b>${A.M.name(r, true)}</b> <small>도전해 볼래? (선택 · 틀려도 괜찮아)</small></button>` : ''}
        <button class="primary big" data-go="big:${big.no}">${big.code}로</button><button class="ghost" data-go="home">은하로</button></section>`);
      bindMission(big, small, r);
    };
    one();
  }

  // ── 7. 질문 하나 (상태 흐름) ──
  /* 할 일 → 이번에 보여 줄 질문 모양 */
  function shape(task, practice) {
    const st = E.state(task.id), x = task.src;
    const mode = practice === 'review' ? 'review' : practice ? 'practice' : st.k === 'next' ? ((st.help === 'short' || st.help === 'long') ? 'again' : 'nextday') : 'first';
    if (task.kind === 'q') {
      const h = x.help, ag = h.again;
      if (mode === 'review') return {mode, q: ag.q, keys: ag.keys, ans: ag.ans, fig: ag.fig || '', asks: (ag.keys.length === h.ask.length ? h.ask : []), help: h, base: E.Q.review, need: ag.need};
      if (mode === 'again') return {mode, q: ag.q, keys: ag.keys, ans: ag.ans, fig: ag.fig || '', asks: (ag.keys.length === h.ask.length ? h.ask : []), help: h, base: E.Q[st.help], need: ag.need};
      return {mode, q: x.q, keys: x.keys, ans: x.ans, fig: x.fig, asks: h.ask, help: h, base: mode === 'nextday' ? E.Q.nextday : E.Q.first, pre: x.pre, need: x.need};
    }
    if (task.kind === 'bh') {
      const base = mode === 'nextday' ? E.Q.nextday : E.Q.first;
      if (task.r === 1) return {mode, q: x.q, words: x.words, need: x.need, keys: x.words, ans: '이 별의 낱말: ' + x.words.join(' · '), fig: '', asks: ['다른 행성들에서 배운 낱말도 떠올려 봐.'], help: {}, base};
      return {mode, q: x.q, keys: x.keys, ans: x.keys.join(' / '), fig: '', asks: x.keys.map(() => '이 별의 행성들을 하나씩 떠올려 봐. 빠진 내용은 없어?'), help: {}, base, feel: x.feel};
    }
    const keys = x.ideas.map(d => d.t), asks = x.ideas.map(d => d.ask);
    const help = {kw: null, short: x.teach, long: null, lfig: ''};
    if (mode === 'again' || mode === 'review') return {mode, q: x.again, keys, ans: x.teach, fig: '', asks, help, base: mode === 'review' ? E.Q.review : E.Q.short};
    return {mode, q: x.q, keys, ans: x.teach, fig: x.fig, asks, help, base: mode === 'nextday' ? E.Q.nextday : E.Q.first};
  }

  /* ── 글로 쓰기: 수식 넣기(마스터 10/12 — 매쓰홀릭처럼) ──
     「분수」「대분수」를 누르면 그 자리에 네모칸이 있는 분수가 생기고, 칸에 숫자만 넣으면 교재 모양 그대로 보인다.
     답으로 보낼 때는 글자로 바꾼다: 3/5 · 2와 1/3 (자연수 끝소리에 따라 와/과) — 채점·기록·선생님 화면이 그대로 읽는 모양 */
  const SYMS = [['×', '×'], ['÷', '÷'], ['+', '+'], ['−', '−'], ['=', '='], ['<', '<'], ['>', '>'], ['°', '°'], ['cm', ' cm'], ['.', '.']];
  const FRAC_ICON = mixed => `<span class="fico">${mixed ? '<i class="w"></i>' : ''}<span><i></i><i></i></span></span>`;
  const MI = (() => {
    const JOSA = {0: '과', 1: '과', 2: '와', 3: '과', 4: '와', 5: '와', 6: '과', 7: '과', 8: '과', 9: '와'};
    const box = (cls, label) => `<input class="${cls}" inputmode="numeric" pattern="[0-9]*" maxlength="4" aria-label="${label}" autocomplete="off">`;
    const chip = mixed => { const s = document.createElement('span'); s.className = 'fx'; s.contentEditable = 'false';
      s.innerHTML = (mixed ? box('fw', '자연수') : '') + `<span class="fs">${box('fn', '분자')}${box('fd', '분모')}</span>`; return s; };
    let saved = null;
    const inTa = (ta, n) => n && ta.contains(n);
    const caretEnd = ta => { const r = document.createRange(); r.selectNodeContents(ta); r.collapse(false); return r; };
    const put = (ta, r) => { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); saved = r.cloneRange(); };
    const where = ta => {                                            // 넣을 자리: 분수 칸 안이면 그 분수 바로 뒤, 아니면 마지막 커서 자리
      const ae = document.activeElement;
      if (ae && ae.tagName === 'INPUT' && inTa(ta, ae)) { const r = document.createRange(); r.setStartAfter(ae.closest('.fx')); r.collapse(true); return r; }
      return saved && inTa(ta, saved.startContainer) ? saved.cloneRange() : caretEnd(ta);
    };
    const size = inp => { inp.style.width = Math.max(1, inp.value.length) * 0.62 + 0.75 + 'em'; inp.classList.toggle('on', !!inp.value); };
    const after = (ta, fx) => { const r = document.createRange(); r.setStartAfter(fx); r.collapse(true); ta.focus(); put(ta, r); };
    return {
      value(ta) {
        let s = '';
        ta.childNodes.forEach(n => {
          if (n.nodeType === 3) s += n.nodeValue;
          else if (n.classList && n.classList.contains('fx')) {
            const w = (n.querySelector('.fw')?.value || '').trim(), a = n.querySelector('.fn').value.trim(), b = n.querySelector('.fd').value.trim();
            if (!a && !b) { if (w) s += w; return; }
            s += (w ? w + JOSA[w.slice(-1)] + ' ' : '') + (a || '□') + '/' + (b || '□');
          } else if (n.nodeName === 'BR') s += ' ';
          else s += n.textContent;
        });
        return s.replace(/\u00a0/g, ' ').replace(/[ \t]+/g, ' ').replace(/(\/\d+|□) (이|가|은|는|을|를|와|과|의|에|로|으로|도|만)(?=\s|$|[^가-힣])/g, '$1$2');   // 분수 뒤 조사는 붙여 쓴다
      },
      focusEmpty(ta) { const e = [...ta.querySelectorAll('.fx input')].find(i => !i.value.trim() && !i.classList.contains('fw')); if (e) e.focus(); },
      bind(ta, changed) {
        document.onselectionchange = () => { const s = getSelection(); if (s.rangeCount && inTa(ta, s.anchorNode) && s.anchorNode.nodeName !== 'INPUT') saved = s.getRangeAt(0).cloneRange(); };
        ta.addEventListener('input', e => { if (e.target.tagName === 'INPUT') { e.target.value = e.target.value.replace(/[^0-9]/g, ''); size(e.target); } changed(); });
        ta.addEventListener('keydown', e => {                          // 칸 안에서 Enter·→ : 다음 칸으로, 마지막 칸이면 분수 뒤로
          const t = e.target; if (t.tagName !== 'INPUT') return;
          const atEnd = t.selectionStart === t.value.length;
          if (e.key === 'Enter' || (e.key === 'ArrowRight' && atEnd)) {
            e.preventDefault(); const fx = t.closest('.fx'), list = [...fx.querySelectorAll('input')], k = list.indexOf(t);
            if (k < list.length - 1) list[k + 1].focus(); else after(ta, fx);
          } else if (e.key === 'Backspace' && !t.value) {             // 빈 칸에서 지우기: 앞 칸으로, 첫 칸이면 분수를 지운다
            e.preventDefault(); const fx = t.closest('.fx'), list = [...fx.querySelectorAll('input')], k = list.indexOf(t);
            if (k > 0) list[k - 1].focus(); else { const r = document.createRange(); r.setStartBefore(fx); r.collapse(true); fx.remove(); ta.focus(); put(ta, r); changed(); }
          }
        });
        root().querySelectorAll('.sym').forEach(b => {
          b.onmousedown = e => e.preventDefault();                     // 누르는 순간 입력칸 커서를 잃지 않게
          b.onclick = () => {
            const r = where(ta);
            if (b.dataset.f != null) {
              const fx = chip(b.dataset.f === '1'); r.deleteContents(); r.insertNode(fx);
              const sp = document.createTextNode('\u00a0'); fx.after(sp);
              const r2 = document.createRange(); r2.setStart(sp, 1); r2.collapse(true); saved = r2;
              fx.querySelectorAll('input').forEach(size); fx.querySelector('input').focus();
            } else {
              const tn = document.createTextNode(SYMS[+b.dataset.k][1]); r.deleteContents(); r.insertNode(tn);
              const r2 = document.createRange(); r2.setStartAfter(tn); r2.collapse(true); ta.focus(); put(ta, r2);
            }
            changed();
          };
        });
      }
    };
  })();
  function ask(big, small, task, i, n, practice) {
    return new Promise(resolve => {
      const S = shape(task, practice);
      const limit = E.limit(task.r, task.src.calc);
      let answers = [], reasks = 0, used = new Set(), helpNow = '', kwShown = false, last = null, left = limit, ticking = false, done = false;
      let tim = null;
      const dots = Array.from({length: n}, (_, k) => `<i class="${k < i ? 'd' : k === i ? 'c' : ''}"></i>`).join('');
      frame(`<div class="qtop"><div class="dots">${dots}</div><div class="timer"><b></b></div></div>
        <section class="stage qstage">${buddy('question', 'mini')}<div class="qcard">
          ${S.pre ? `<div class="pre">🌱 ${esc(S.pre)}에서 배운 것</div>` : ''}${S.mode === 'again' ? '<div class="pre">어제 본 설명으로 다시 묻기</div>' : ''}
          <div class="q" id="qt">${fm(S.q)}</div>${S.fig ? `<div class="figbox">${S.fig}</div>` : ''}<div class="say" id="say"></div></div></section>
        <section class="answer" id="ans"></section>`, {back: 'quit', backText: '그만하기', crumb: E.RT(task.r)});
      root().querySelector('[data-go="quit"]').onclick = (e) => { e.stopPropagation(); NAV.quit = null; stop(); resolve('quit'); };
      navMark(['q']); NAV.quit = () => { stop(); resolve('quit'); return true; };
      const say = (t, cls) => { $('#say').innerHTML = t ? `<div class="sbubble ${cls || ''}">${t}</div>` : ''; };
      const stop = () => { done = true; clearInterval(tim); try { rec && rec.stop(); } catch (e) {} };
      // 타이머 — 채점하는 동안은 멈춘다. 다 되면 떨어진 것과 같다(내일 다시)
      const drawT = () => { const b = $('.timer b'); if (b) { b.style.width = Math.max(0, left / limit * 100) + '%'; b.parentNode.classList.toggle('low', left < 30); } };
      tim = setInterval(() => { if (!ticking || done) return; left -= 0.25; drawT(); if (left <= 0) { ticking = false; timeout(); } }, 250);

      // 답 입력(말하기 기본 · 글 입력 대안)
      let rec = null, recFails = 0, typed = false;
      function input(prompt, onSubmit) {
        ticking = true;
        $('#ans').innerHTML = `<div class="prompt">${prompt || ''}</div>
          <div class="tr" id="tr" ${typed ? '' : 'hidden'}><div id="ta" class="ced" contenteditable="true" data-ph="여기에 써도 돼" role="textbox" aria-multiline="true"></div>
            <div class="syms"><button type="button" class="sym fbtn" data-f="0" aria-label="분수 넣기">${FRAC_ICON(false)}<small>분수</small></button><button type="button" class="sym fbtn" data-f="1" aria-label="대분수 넣기">${FRAC_ICON(true)}<small>대분수</small></button>${SYMS.map((x, k) => `<button type="button" class="sym" data-k="${k}">${x[0]}</button>`).join('')}</div></div>
          <div class="live" id="live"></div>
          <div class="row"><button class="mic" id="mic" aria-label="말하기"><span></span></button></div>
          <div class="row"><button class="ghost small" id="tw">${typed ? '말로 하기' : '글로 쓰기'}</button><button class="ghost small" id="clr">지우고 다시</button><button class="primary" id="sub" disabled>${typed ? '다 썼어' : '다 말했어'}</button></div>`;
        let text = '';
        const ta = $('#ta'), live = $('#live'), sub = $('#sub');
        const upd = t => { text = t; live.textContent = typed ? '' : t; sub.disabled = !text.trim(); };
        MI.bind(ta, () => upd(MI.value(ta)));
        $('#tw').onclick = () => { typed = !typed; stopRec(); input(prompt, onSubmit); };
        $('#clr').onclick = () => { stopRec(); ta.innerHTML = ''; upd(''); };
        $('#mic').onclick = () => (rec ? stopRec() : startRec());
        sub.onclick = () => {
          stopRec(); const t = (typed ? MI.value(ta) : text).trim(); if (!t) return;
          if (typed && t.includes('□')) { toast('분수 칸을 모두 채워 줘'); MI.focusEmpty(ta); return; }
          ticking = false; onSubmit(t);
        };
        function startRec() {
          const R = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!R) { typed = true; return input(prompt, onSubmit); }
          let base = text ? text + ' ' : '';
          rec = new R(); rec.lang = 'ko-KR'; rec.interimResults = true; rec.continuous = true;
          rec.onresult = ev => { let fin = '', inter = ''; for (let k = ev.resultIndex; k < ev.results.length; k++) { const t = ev.results[k][0].transcript; if (ev.results[k].isFinal) fin += t; else inter += t; } if (fin) base += fin; upd((base + inter).trim()); };
          rec.onerror = ev => { if (ev.error === 'not-allowed' || ++recFails >= 2) { typed = true; toast('글로 써도 괜찮아'); input(prompt, onSubmit); } };
          rec.onend = () => { rec = null; $('#mic')?.classList.remove('on'); setBuddy('question'); };
          try { rec.start(); $('#mic').classList.add('on'); setBuddy('listening'); A.buzz(BZ.micOn); } catch (e) { rec = null; }
        }
        function stopRec() { if (rec) { try { rec.stop(); } catch (e) {} rec = null; $('#mic')?.classList.remove('on'); A.buzz(BZ.micOff); } }
        if (typed) { ta.focus(); put0(ta); }
      }
      function put0(ta) { const r = document.createRange(); r.selectNodeContents(ta); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

      async function judge(t) {
        answers.push(t);
        $('#ans').innerHTML = `<div class="thinking"><span class="spin"></span> ${esc(line('thinking'))}</div>`; setBuddy('thinking');
        if (S.words) {
          const all = answers.join(' ').replace(/\s+/g, '');
          const hits = S.words.map(w => ({hit: all.includes(w.replace(/\s+/g, '')), evidence: ''})), h = hits.filter(x => x.hit).length;
          return (last = {hits, h, n: hits.length, miss: h >= S.need ? -1 : 0, misconception: '', ack: h ? '낱말 ' + h + '개를 말했어!' : '좋아, 하나씩 떠올려 보자.'});
        }
        try { last = await E.grade({question: S.q, keys: S.keys, need: S.need, answer: t, prev: answers.length > 1 ? answers.slice(0, -1).join(' / ') : '', unitId: small.unitId}); }
        catch (e) { answers.pop(); setBuddy('retry'); say(esc(e.message), 'warn'); return null; }   // AI 실패 → 기록 없음, 다시 말하기
        return last;
      }
      // 답 받기 → 채점 → 다음 단계 (AI 가 실패하면 기록 없이 같은 자리에서 다시 말하기)
      const answerThen = (prompt, cb) => input(prompt, async t => { const g = await judge(t); if (!g) return answerThen('다시 말해 줄래?', cb); cb(g); });
      say(esc(line('question')));
      answerThen('', step);

      let feel = '';
      function step(g) {
        if (g.miss < 0 && S.feel && !feel) {
          setBuddy('question'); say(`${esc(g.ack)}<br>${esc(S.feel)}`, 'hint');
          return input('', t => { feel = t; answers.push('느낀 점: ' + t); pass(); });
        }
        if (g.miss < 0) return pass();
        if (g.misconception && !kwShown && S.help.kw) {            // 틀린 생각 → "살짝 부족해" + 핵심 키워드만
          kwShown = true; helpNow = 'kw'; setBuddy('hint');
          say(`${esc(g.ack)}<br><b>살짝 부족해.</b> ${chips(S.help.kw)}`, 'hint');
          return answerThen('키워드를 생각하면서 다시 말해 줘.', step);
        }
        const k = (g.cand && g.cand.length ? g.cand : [g.miss]).find(j => S.asks[j] && !used.has(j));
        if (k != null) {                                            // 빠진 핵심마다 되묻기 1번(방향만)
          used.add(k); reasks++; setBuddy('hint');
          say(`${esc(g.ack)}<br>${fm(S.asks[k])}`, 'hint');
          return answerThen('', step);
        }
        helpMenu(g);
      }
      const chips = arr => '<span class="kw">' + arr.map(k => `<span>${fm(k)}</span>`).join('') + '</span>';

      function helpMenu(g) {
        ticking = false; setBuddy('retry');
        const H = S.help;
        say(`${esc(g ? g.ack : '')}<br><b>살짝 부족해.</b> ${H.kw || H.short || H.long ? '도움을 볼까?' : '내일 다시 도전하자!'}`, 'hint');
        $('#ans').innerHTML = `<div class="helps">
          ${H.kw && !kwShown ? `<button class="hbtn" data-h="kw"><b>🔑 키워드</b><small>오늘 다시 답할 수 있어요</small></button>` : ''}
          ${H.short ? `<button class="hbtn" data-h="short"><b>💬 짧은 설명</b><small>내일 다시 묻기로 확인해요</small></button>` : ''}
          ${H.long ? `<button class="hbtn" data-h="long"><b>📖 긴 설명 · 그림</b><small>내일 다시 묻기로 확인해요</small></button>` : ''}
          <button class="hbtn plain" data-h="none"><b>내일 다시 할게</b><small>내일 새벽 4시에 열려요</small></button></div>`;
        $('#ans').querySelectorAll('.hbtn').forEach(b => b.onclick = () => useHelp(b.dataset.h));
      }
      function useHelp(h) {
        if (h === 'kw') {
          kwShown = true; helpNow = 'kw'; setBuddy('hint'); say(chips(S.help.kw), 'hint');
          return answerThen('키워드를 보고 다시 말해 줘.', g => (g.miss < 0 ? pass() : helpMenu(g)));
        }
        if (h === 'short' || h === 'long') {
          helpNow = h; setBuddy('hint');
          say(`<div class="expl">${fm(h === 'short' ? S.help.short : S.help.long)}</div>${h === 'long' && S.help.lfig ? `<div class="figbox">${S.help.lfig}</div>` : ''}`, 'expl');
          $('#ans').innerHTML = `<div class="prompt">설명을 잘 읽었으면, 내일 비슷한 질문으로 다시 물어볼게.</div><div class="row"><button class="primary big" id="ok">알겠어</button></div>`;
          return $('#ok').onclick = () => end({st: 'wait', help: h, stage: h, pass: false});
        }
        end({st: 'lock', help: 'none', stage: 'lock', pass: false, needTeacher: true});
      }
      function timeout() {
        stop(); say('<b>시간이 다 됐어.</b> 내일 다시 열려요.', 'warn'); setBuddy('retry');
        $('#ans').innerHTML = `<div class="row"><button class="primary big" id="ok">다음</button></div>`;
        $('#ok').onclick = () => end({st: 'lock', help: helpNow || 'none', stage: 'timeout', pass: false}, true);
      }
      function pass() {
        stop();
        const q = S.mode === 'practice' ? null : Math.min(S.base, helpNow === 'kw' ? E.Q.kw : reasks ? E.Q.reask : E.Q.first);
        setBuddy('praise'); A.buzz(BZ.pass);
        const keysHtml = S.keys.map((k, j) => `<li class="${last && last.hits[j]?.hit ? 'hit' : ''}">${last && last.hits[j]?.hit ? '✓' : '·'} ${fm(k)}</li>`).join('');
        say(`<b>${esc(line('praise'))}</b>`, 'ok');
        $('#ans').innerHTML = `<div class="result">${q != null ? `<div class="score">${q}<small>점</small></div>` : '<div class="score small">연습</div>'}
          <ul class="keys">${keysHtml}</ul><div class="model"><b>모범 답</b>${fm(S.ans)}</div>
          <div class="row"><button class="primary big" id="ok">${i < n - 1 ? '다음 질문' : '끝내기'}</button></div></div>`;
        $('#ok').onclick = () => end({st: 'pass', q, help: helpNow || (S.mode === 'again' || S.mode === 'nextday' ? (E.status(task.id)?.help || '') : ''), helpNow: !!helpNow, stage: helpNow === 'kw' ? 'kw' : reasks ? 'reask' : (S.mode === 'first' ? 'first' : S.mode), pass: true});
      }
      async function end(r, already) {
        if (!already) stop();
        let opened = 0;
        const score = r.pass ? Math.max(70, r.q || 70) : Math.round(60 * (last ? last.h / Math.max(1, last.n) : 0));
        if (practice === 'review') {
          E.review(task.id, r.pass, r.q);
          await E.submit({big, small, task, question: S.q, transcript: answers.map((a, k) => (k + 1) + '차: ' + a).join('\n'), score, pass: r.pass, stage: 'review',
                          help: r.help || 'none', quality: r.pass ? r.q : null, misconception: last?.misconception || '', ack: last?.ack || '', attempt: answers.length, reasks, practice: 'review'});
          await E.save();
        } else if (!practice) {
          opened = E.record(big.no, task.id, {st: r.st, q: r.q, help: r.help, helpNow: r.helpNow});
          await E.submit({big, small, task, question: S.q, transcript: answers.map((a, k) => (k + 1) + '차: ' + a).join('\n'), score, pass: r.pass, stage: r.stage,
                          help: r.help || 'none', quality: r.q ?? null, misconception: last?.misconception || '', ack: last?.ack || '', attempt: answers.length, reasks, needTeacher: r.needTeacher});
          await E.save();
        } else {
          await E.submit({big, small, task, question: S.q, transcript: answers.join('\n'), score, pass: r.pass, stage: 'practice', help: r.help, quality: null, practice: true, attempt: answers.length, reasks});
        }
        NAV.quit = null;
        resolve({pass: r.pass, opened});
      }
    });
  }

  // ── 시작 ──
  A.start = async () => {
    try { if (await A.autoLogin()) return enter(); } catch (e) {}
    login();
  };
})();
