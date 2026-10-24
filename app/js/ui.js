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
      <span class="who">${s && E.prog() && A.S && !opt.nostar ? A.S.badge() : ''}${s ? `<button class="ghost small" data-go="logout">${esc(s.name)} · 나가기</button>` : ''}</span></header><main class="${opt.cls || ''}">${inner}</main>`;
    window.scrollTo(0, 0);
    tickClock();
  }
  /* 한 번 앉는 시간 시계(마스터 10/12: 10분 제한이 안 보여 조절이 안 됨) — 첫 질문을 시작하면 줄어든다 */
  let clockWarned = false;
  function tickClock() {
    if (!A.session.student || document.body.classList.contains('intro-on')) { document.getElementById('sclock')?.remove(); return; }
    const el = clockEl();
    if (E.timerOff()) { el.querySelector('b').textContent = '보강'; el.dataset.say = '선생님이 시간 제한을 꺼 두셨어. 천천히 제대로 말해 보자!'; el.classList.remove('idle', 'low', 'end'); return; }
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
    if (g === 'home') home(); else if (g === 'logout') { whereClear(); A.logout(); login(); }
    else if (g === 'hall') hall(); else if (g === 'play') playHub(); else if (g === 'calc') calcHub(); else if (g === 'battle') battleHub(); else if (g === 'words') wordHub();
    else if (g.startsWith('big:')) star(+g.slice(4)); else if (g.startsWith('small:')) planet(g.slice(6), +b.dataset.r); else if (g.startsWith('bh:')) blackhole(+g.slice(3), +b.dataset.r); else if (g === 'record') record(); else if (g === 'guide') guide(); else if (g === 'cnote') A.CN.open();
  });

  // ── 뒤로 가기(폰의 뒤로·취소 버튼) = 앱 안의 이전 화면 (옛 앱 v81.7 과 같은 방식) ──
  /* 화면을 누를 때(사용자 조작 순간) history 에 한 칸씩 쌓고, 뒤로 가면 그 칸의 화면을 다시 그린다.
     ⚠️ popstate 안에서는 pushState 를 하지 않는다(크롬이 조작 없이 넣은 칸을 건너뛰어 앱이 나가 버림 — 옛 앱 v81.5 에서 겪음).
     질문·mission 화면은 칸 하나('q')로 치고, 그 안에서 뒤로 가면 그만두고 앞 화면(행성 입구)으로. */
  const NAV = {cur: null, stack: [], restoring: false, silent: false, quit: null, backQuit: false};
  /* 새로고침해도 보던 화면에 머물기(마스터 10/19) — 이 탭에만(sessionStorage) 마지막 화면과 mission 진행을 기억한다.
     질문(말하기) 도중이면 그 행성 입구로, mission 이면 풀던 문제 번호·맞힌 수 그대로 이어서. */
  const WKEY = 'app:where';
  const whereGet = () => { try { return JSON.parse(sessionStorage.getItem(WKEY) || 'null'); } catch (e) { return null; } };
  const whereSet = o => { try { const sid = A.session.student && A.session.student.id; if (!sid) return; const w = whereGet(); sessionStorage.setItem(WKEY, JSON.stringify(Object.assign(w && w.sid === sid ? w : {sid}, o))); } catch (e) {} };
  const whereClear = () => { try { sessionStorage.removeItem(WKEY); } catch (e) {} };
  function navMark(route) {
    const key = JSON.stringify(route);
    if (route[0] !== 'q') { NAV.quit = null; whereSet({route, mis: null}); }   // 질문 화면을 떠나면 그만두기 연결도 끊는다
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
    try { ({home, star, planet, record, guide, blackhole, note, hall, calc: calcHub, calcu: calcUnit, battle: battleHub, words: wordHub, wordu: wordUnit, play: playHub, cnote: () => A.CN.open()})[rt[0]](...rt.slice(1)); } finally { NAV.restoring = false; }
  }
  /* 맨 아래 칸 = 로그인 화면(마스터 10/20 「뒤로 가면 마지막은 로그인 화면, 그다음 앱이 나가게」).
     처음 그린 화면(홈)은 기록 맨 첫 칸을 덮어쓰므로, 아이가 처음 화면을 누를 때(사용자 조작 순간) 그 밑에 로그인 칸을 깐다.
     ⚠️ 페이지가 뜰 때 바로 pushState 하면 크롬이 조작 없이 넣은 칸으로 보고 뒤로 가기에서 건너뛴다 → 꼭 누를 때 한다. */
  const LOGIN_KEY = JSON.stringify(['login']);
  addEventListener('click', e => {
    try {
      const hs = history.state;
      if (!A.session.student || !hs || !hs.app || hs.i !== 0 || hs.app[0] === 'login') return;
      if (e.target.closest && e.target.closest('[data-go="logout"]')) return;
      history.replaceState({app: ['login'], i: 0}, '');
      history.pushState({app: hs.app, i: 1}, '');
      NAV.stack = [LOGIN_KEY, NAV.stack[0] || JSON.stringify(hs.app)];
    } catch (err) {}
  }, true);
  addEventListener('popstate', e => {
    const st = e.state && e.state.app ? e.state : null;
    if (!st || !A.session.student) return;
    if (st.app[0] === 'login') {                                    // 로그인 칸까지 뒤로 왔으면 = 로그아웃(앱 안 「로그아웃」과 같음)
      if (NAV.quit) { const q = NAV.quit; NAV.quit = null; try { q(); } catch (err) {} }
      NAV.stack = []; NAV.cur = null; NAV.silent = false;
      whereClear(); A.logout(); login();
      return;
    }
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
  const sessOver = o => !E.timerOff() && !!(o.done || (o.start && sessLeft(o) === 0));   // 시간 제한 끄면(보강) 끝나지 않음
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
        <button type="button" class="secondary" data-a="u" ${locked ? '' : 'disabled'}>🔓 오늘 잠긴 질문 다시 열기 (${locked}개)</button>
        <button type="button" class="secondary" data-a="m">🗺 별지도 2장 더 (지금 ${E.maps()}장)</button>
        <button type="button" class="secondary" data-a="t">${E.timerOff() ? '⏱ 시간 제한 다시 켜기' : '⏸ 시간 제한 끄기 (보강)'}</button></div>
      <div class="krow"><button type="submit" class="primary" id="kok">확인</button><button type="button" class="ghost" id="kx">닫기</button></div></form>`;
    document.body.appendChild(d);
    const close = () => d.remove(); let okPin = false;
    d.querySelector('#kx').onclick = close;
    d.onclick = e => { if (e.target === d) close(); };
    d.querySelector('#kp').focus();
    d.querySelector('#kf').onsubmit = async e => {
      e.preventDefault();
      if (!d.querySelector('#kact').hidden) return;
      d.querySelector('#km').textContent = '확인 중…';
      let ok = false; try { ok = await A.checkPin(d.querySelector('#kp').value); } catch (err) {}
      if (!ok) { d.querySelector('#km').textContent = 'PIN 이 맞지 않아요.'; return; }
      okPin = true;
      d.querySelector('#km').textContent = '무엇을 할까요?'; d.querySelector('#kact').hidden = false; d.querySelector('#kok').hidden = true; d.querySelector('label').hidden = true;
    };
    d.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      if (!okPin) return;   // PIN 확인 전에는 아무것도 안 함(10/13 마스터: PIN 없이 시간 연장되던 것)
      const a = b.dataset.a, p = E.prog(); p.log = p.log || [];
      if (a === 'u') { const n = E.unlockToday(); p.log.push({at: Date.now(), teacher: 'unlock', n}); await E.save(); toast(`선생님이 잠긴 질문 ${n}개를 다시 열어 주셨어!`); }
      else if (a === 't') {
        const sid = A.session.student.id, cur = (await A.store.get(E.skey(sid))) || {}, nv = {...cur, notimer: !E.timerOff(), at: Date.now()};
        await A.store.set(E.skey(sid), nv); E.useSettings(nv); p.log.push({at: Date.now(), teacher: 'timer', off: nv.notimer}); await E.save(); tickClock();
        toast(nv.notimer ? '선생님이 시간 제한을 껐어. 천천히 제대로 말해 보자!' : '시간 제한이 다시 켜졌어.');
      }
      else if (a === 'm') { E.giveMap(2); p.log.push({at: Date.now(), teacher: 'map', add: 2}); await E.save(); toast('선생님이 별지도 2장을 더 주셨어!'); }
      else { addTime(+a); p.log.push({at: Date.now(), teacher: 'time', add: +a}); await E.save(); toast(`선생님이 ${a}분을 더 주셨어!`); }
      A.buzz([20, 40, 20]); close(); if (after) after();
    });
  }
  const keyBtn = () => '<button class="kbtn" data-key="1" aria-label="선생님 열쇠">🔑</button>';
  document.addEventListener('click', e => { if (e.target.closest('[data-key]')) { const f = NAV.cur; keyModal(() => f && f[0] !== 'q' ? navGo(f) : home()); } });

  // ── 선생님 화면에서 보낸 명령 받기(30초마다) ──
  /* 다른 기기에서 같은 학생으로 로그인 → 이 기기는 로그아웃(마스터 10/21) */
  const KICK_MSG = '다른 기기에서 로그인해서 여기서는 로그아웃됐어요.';
  A.onKicked = () => {
    if (!A.session.student) return;
    A.visitEnd('kicked'); NAV.quit = null; whereClear(); A.logout(); login(KICK_MSG);
  };
  async function applyCmds() {
    if (!A.session.student || !E.prog()) return;
    if (!(await A.loginValid())) return A.onKicked();
    let oc = false; try { oc = await E.loadOpen(); } catch (e) {}       // 선생님이 회차를 바꿨으면 지도·목록을 다시 그린다
    const redraw = () => { const f = NAV.cur; if (f && !NAV.quit && ['home', 'star', 'planet'].includes(f[0])) navGo(f); };
    let v = null; try { v = await A.store.get(E.ckey(A.session.student.id)); } catch (e) { if (oc) redraw(); return; }
    const p = E.prog(), seen = p.cmdSeen || 0, nw = ((v && v.cmds) || []).filter(c => c.id > seen);
    if (!nw.length) { if (oc) redraw(); return; }
    let add = 0, n = 0, rs = 0;
    for (const c of nw) { if (c.add) { addTime(+c.add); add += +c.add; } if (c.unlock) n += E.unlockToday(); if (c.reset) rs += E.wipe(p, c.reset) || 1; }
    p.cmdSeen = Math.max(...nw.map(c => c.id)); p.log = p.log || []; p.log.push({at: Date.now(), teacher: 'remote', add, n, reset: rs});
    await E.save(); A.buzz([20, 40, 20]);
    toast(rs ? '선생님이 몇 개를 다시 해 보게 하셨어. 다시 설명해 보자!' : add && n ? `선생님이 ${add}분을 더 주고 잠긴 질문 ${n}개를 열어 주셨어!` : add ? `선생님이 ${add}분을 더 주셨어!` : `선생님이 잠긴 질문 ${n}개를 다시 열어 주셨어!`);
    const f = NAV.cur; if (f && !NAV.quit && ['home', 'star', 'planet'].includes(f[0])) navGo(f);
  }
  setInterval(() => { if (document.visibilityState === 'visible') { applyCmds(); A.visitBeat(); } }, 30000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { applyCmds(); A.visitBeat(); } });   // 화면이 다시 켜지면 바로
  A.applyCmds = applyCmds;

  // ── 용어 설명(마스터 10/12: 우리끼리 정한 이름은 가볍게 쓰되, 누르면 뜻이 나오게) ──
  const TERMS = {
    'LEVEL': '같은 별(큰 단원)을 세 번 공부해요. LEVEL Ⅰ은 기본 뜻과 방법, LEVEL Ⅱ는 조금 더 깊게, LEVEL Ⅲ은 여러 개념을 이어서 생각해요. 앞 LEVEL의 질문을 모두 통과해야 다음 LEVEL이 열려요.',
    '탐험가 등급': '얼마나 잘 이해했는지 보여 주는 등급이에요. 루나(달) → 테라(지구) → 솔(태양) → 갤럭시(은하) → 코스모스(우주) 순서로 올라가요. 스스로 한 번에 설명할수록 빨리 올라가요.',
    'mission': '행성 질문을 다 마치면 열리는 문제 풀기예요. 보기에서 답을 골라요.',
    '블랙홀 관문': '별의 행성을 모두 밝히면 열리는 마무리 질문이에요. 퉁구리가 숨어 있는 곳!',
    '다시 빛내기': '도움을 받아 통과한 질문을 일주일 뒤에 다시 물어봐요. 스스로 답하면 별빛이 다시 환해져요.',
    '다시 열린 질문': '어제 못 했던 질문이 오늘 다시 열렸어요. 먼저 해 보자!',
    '연습': '지난 LEVEL은 언제든 다시 해 볼 수 있어요. 연습은 점수와 등급이 바뀌지 않아요(처음 통과한 점수 그대로).',
    '은하': '한 학기 수학이 하나의 은하예요. 별(큰 단원)을 누르면 행성(작은 단원)이 보이고, 행성의 질문에 내 말로 답하면 행성에 불이 켜져요. 퉁구리가 삼킨 별빛을 모두 되찾으면 클리어!',
    '별지도': '우주 탐험가가 길을 잃었을 때 펼쳐 보는 밤하늘 지도예요. 옛날 뱃사람과 탐험가들은 별의 자리를 그린 지도를 보고 길을 찾았어요. 질문에서 막혔을 때 도움(🔑 키워드 · 💬 간단한 설명 · 📖 자세한 설명)을 하나 펼쳐 볼 때 1장을 써요. 매일 2장이 생기고, 새벽 4시에 다시 2장으로 채워져요(남은 장은 모아 두지 않아요). 다 쓰면 그 질문은 내일 다시 도전해요. 선생님 열쇠로 더 받을 수도 있어요. 틀린 생각을 말했을 때 저절로 나오는 키워드와 되묻기는 별지도를 쓰지 않아요.',
    '용어 맞히기': '대단원마다 한 판 12문제예요. 뜻을 보고 낱말을 말로 답하고, 낱말을 보고 바른 뜻이나 알맞은 예를 골라요. 예전에 배운 낱말도 섞여 나와요. 10문제 이상 맞히고 퉁구리보다 먼저 도착하면 이겨요(하루 3번까지 별빛 +10).',
    '별빛노트': '친구들의 별처럼 빛나는 대답 모음이에요. 질문마다 100점을 받은 친구 대답 중에서 무작위로 하나를 골라 보여 줘요(100점이 없으면 90점). 행성 질문을 다 마치면 볼 수 있어요. 네 대답도 오를 수 있어!'
  };
  A.S.TOP.forEach(t => { TERMS[t[1] + ' ' + t[0]] = t[2]; });
  A.S.AWARDS.forEach(t => { TERMS[t[2]] = t[3] + ' 월요일마다 새로 뽑아요. 한 친구가 상을 여러 개 받지 않게 나눠요.'; });
  TERMS['빛나는 탐험가'] = '이번 학기 별빛을 가장 많이 모은 세 친구(학년 상관없이)와 이번 주 상을 받은 친구들이에요. 별빛은 질문을 처음 통과할 때 모여요.';
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
  // 🎙 네이버 CLOVA 실시간 음성 인식을 쓸지 — 학원 기기에서만(돈이 드는 길) · 선생님 설정 「네이버 음성 인식」을 끄면 브라우저 음성 인식
  const useClova = () => !A.sttOff && A.isAcademyDevice() && !!window.CLOVA && CLOVA.ok();
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
    A.session.cid = A.courseFor(A.session.student);
    if (window.APP_DATA[A.cid()]) calcGrade = wordGrade = A.cid();
    await E.load();
    A.visitStart(A.loginHow || 'auto'); A.loginHow = '';
    try { A.academy = ((await A.store.get('app:academy')) || {}).name || ''; } catch (e) {}
    A.store.get('app:stt').then(v => { A.sttOff = !!(v && v.off); }).catch(() => {});   // 선생님 설정 「네이버 음성 인식 끄기」
    await applyCmds();
    friend = (A.ls.raw('dd:char:' + A.session.student.id) || '').replace(/"/g, '');
    if (!FR[friend]) friend = null;
    if (!friend) { const v = await A.store.get('char:' + A.session.student.id); if (v && FR[v.id]) { friend = v.id; try { localStorage.setItem('dd:char:' + A.session.student.id, v.id); } catch (e) {} } }
    if (!friend) return pick();
    if (!(await storySeen())) return story(home);
    if (!resume()) home();
  }
  /* 새로고침 뒤 — 브라우저 기록(history.state, 새로고침해도 남음)과 이 탭의 기억으로 보던 화면을 다시 연다 */
  function resume() {
    const w = whereGet(), hs = history.state;
    if (!w || w.sid !== A.session.student.id || !hs || !hs.app || !w.route) return false;
    NAV.stack = Array.from({length: hs.i + 1}, () => '');
    try {
      if (w.mis && hs.app[0] === 'q') {
        const m = w.mis, big = E.big(m.no), sm = big && E.small(m.code);
        if (!sm || !sm.small) return false;
        NAV.stack[hs.i] = JSON.stringify(['q']); NAV.cur = ['q'];
        mission(big, sm.small, m.r, m.hard, m);
        return true;
      }
      if (hs.app[0] === 'q' && hs.i > 0) {         // 질문 칸 → 그 질문을 연 화면(바로 앞 칸)으로 돌아가며 다시 그린다
        NAV.stack.length = hs.i; NAV.stack[hs.i - 1] = JSON.stringify(w.route);
        navGo(w.route); NAV.silent = true; history.back();
        return true;
      }
      const rt = hs.app[0] === 'q' ? w.route : hs.app;
      if (hs.app[0] === 'q') history.replaceState({app: rt, i: hs.i}, '');
      NAV.stack[hs.i] = JSON.stringify(rt);
      navGo(rt);
      return true;
    } catch (e) { console.warn('화면 되살리기 실패', e); NAV.stack = []; NAV.cur = null; return false; }
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
    {who: 'tung', t: '큰일 났어!', b: '우주 몬스터 <b>퉁구리</b>가 수학 은하의 별빛을 몽땅 삼키고 어딘가에 숨어 버렸어.'},
    {who: 'me', st: 'question', t: '퉁구리의 약점은 수학!', b: '수학을 <b>네 말로 설명</b>하면 행성에 별빛이 다시 켜져.'},
    {who: 'me', st: 'hint', t: '막히면 내가 도와줄게', b: '막히면 생각할 방향을 알려 줄게. <b>스스로 한 번에 답하면 빛이 더 크게 모여!</b>'},
    {who: 'me', st: 'praise', t: '블랙홀까지 가자!', b: '행성을 다 밝히면 <b>블랙홀 관문</b>이 열려. 퉁구리 은신처야!'},
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
      <h2>📖 안내서</h2>
      <details><summary>🌌 은하 · 별 · 행성</summary><p><b>은하</b> = 한 학기 수학 전체 · <b>별</b> = 큰 단원 · <b>행성</b> = 작은 단원이에요. 이 은하에는 별이 6개 있어요.</p><ul class="g-bigs">${bigs}</ul></details>
      <details><summary>✦ 어떻게 클리어해요?</summary><ol class="g-steps">
        <li>행성을 골라 <b>질문에 내 말로 설명</b>해요. 질문을 다 통과하면 행성이 밝아져요.</li>
        <li>행성을 다 밝히면 <b>mission</b>(문제 풀기)이 열려요.</li>
        <li>별의 행성을 모두 밝히면 별 옆의 <b>블랙홀 관문</b>이 열려요. 퉁구리가 숨은 곳이에요!</li>
        <li>별 하나를 다 하면 그 별의 <b>다음 LEVEL</b>이 열려요. LEVEL Ⅲ까지 다 하면 그 별은 완전히 빛나요.</li></ol></details>
      <details><summary>🎚 LEVEL Ⅰ · Ⅱ · Ⅲ</summary><p>같은 별을 세 번 탐험해요.<br><b>LEVEL Ⅰ</b>(행성 탐사) 기본 뜻과 방법 · <b>LEVEL Ⅱ</b>(별계 탐사) 조금 더 깊게 · <b>LEVEL Ⅲ</b>(은하 탐사) 여러 개념을 이어서 생각하기. 지난 LEVEL은 언제든 연습할 수 있어요(점수는 그대로).</p></details>
      <details><summary>🎙 질문에 답하는 법</summary><p>마이크를 누르고 말하거나, <b>글로 쓰기</b>를 눌러 써도 돼요. 분수는 <b>분수·대분수 버튼</b>을 누르면 네모칸이 생겨요.<br>질문마다 <b>시간</b>이 있어요(위쪽 막대). 시간이 다 되면 그 질문은 내일 다시 열려요.</p></details>
      <details><summary>🤔 막히면?</summary><p>친구가 먼저 생각할 방향을 물어봐 줘요(<b>되묻기</b>). 그래도 어려우면 <b>도움</b>을 열어요. 키워드를 보면 오늘 다시 도전하고, 설명을 보면 <b>내일</b> 비슷한 질문으로 다시 물어봐요.</p></details>
      <details><summary>🗺 별지도</summary><p>도움을 하나 펼쳐 볼 때 <b>별지도 1장</b>을 써요. 매일 <b>2장</b>이 생기고 새벽 4시에 다시 2장으로 채워져요(모아 두지 않아요). 다 쓰면 그 질문은 내일 다시 도전해요. 지금 <b>${E.maps()}장</b> 있어요. <span class="tm" data-term="별지도">더 알아보기</span></p></details>
      <details><summary>🎯 mission · hard mission</summary><p>행성 질문을 다 마치면 열리는 문제 풀기예요. 보기에서 답을 골라요. <b>hard mission</b>은 더 어려운 문제로, 하고 싶은 친구만! 틀려도 깎이지 않아요. 처음 푼 결과만 기록돼요.</p></details>
      <details><summary>✨ 다시 빛내기</summary><p>도움을 받아 통과한 질문은 일주일 뒤에 다시 물어봐요. 이번에 스스로 답하면 별빛이 다시 환해져요.</p></details>
      <details><summary>🏅 탐험가 등급</summary><p>이해가 커질수록 더 큰 세상으로 가요.</p><ul class="g-tiers">${tiers}</ul><p>스스로 한 번에 답하면 빛이 더 크게 모여요. 힌트를 봐도 안 한 것보다 훨씬 나아요. 갤럭시는 LEVEL Ⅱ, 코스모스는 LEVEL Ⅲ까지 해야 될 수 있어요.</p></details>
      <details><summary>⭐ 별빛 · 🏆 빛나는 탐험가</summary><p>질문을 <b>처음 통과</b>하면 점수만큼 별빛이 모여요(LEVEL Ⅱ는 1.5배, LEVEL Ⅲ은 2배). <b>학기 별빛</b>은 학기마다 새로, <b>전체 별빛</b>은 계속 쌓여요.<br>학기 별빛이 가장 많은 세 친구는 <b>🌟 북극성 · ✨ 샛별 · 💫 혜성</b>! 이번 주 상도 다섯 가지가 있어요.</p></details>
      <details><summary>📒 개념 노트</summary><p>질문에서 본 <b>간단한 설명·자세한 설명</b> 중 다시 보고 싶은 것을 「📒 노트에 담기」로 골라 담아요. 빼는 것도 내 마음대로! 노트에서 그 질문을 <b>다시 말해 보거나</b> 예제 문제(mission)를 풀 수 있어요. 연습이라 점수·기록은 그대로예요.</p></details>
      <details><summary>✦ 별빛노트</summary><p>행성 질문을 다 마치면 친구들의 100점 대답을 볼 수 있어요. 질문마다 무작위로 하나씩 골라 보여 줘요. 네 대답도 오를 수 있어!</p></details>
      <details><summary>📖 용어 맞히기</summary><p>대단원마다 12문제. 뜻을 보고 낱말을 <b>말로</b> 답하고, 낱말을 보고 바른 뜻이나 알맞은 예를 골라요. 보기는 대충 보면 헷갈리게 나와요. 예전에 배운 낱말도 섞여 있어요.</p></details>
      <details><summary>⚡ 계산 연습 · ⚔ 친구와 대결</summary><p><b>계산 연습</b>은 퉁구리와 경주해요. 8문제 이상 맞히고 먼저 도착하면 이겨요(하루 3번까지 별빛 +10).<br><b>친구와 대결</b>은 대기실에서 친구에게 신청해요. 개념 대결은 정확하고 꼼꼼하게 설명한 쪽이, 계산 대결은 많이 맞힌 쪽이 이겨요. 이기면 배지가 자라요!</p></details>
      <details><summary>⏱ 오늘 공부 시간</summary><p>화면에 떠 있는 작은 시계는 <b>오늘 남은 공부 시간</b>이에요. 다 되면 지금 질문까지만 하고 쉬어요. 시계는 <b>꾹 눌러 끌면</b> 다른 곳으로 옮길 수 있어요.</p></details>
      <details><summary>🔒 잠긴 질문</summary><p>오늘 못 한 질문은 <b>다음 날 새벽 4시</b>에 다시 열려요.</p></details>
      <details><summary>👋 친구 · 이야기</summary><p>숫자 탐험대 다섯 친구 중 네가 고른 친구가 함께 다녀요.</p><button class="ghost small" id="gPick">친구 바꾸기 ›</button> <button class="ghost small" id="gStory">이야기 다시 보기 ›</button></details>
    </section>`, {back: 'home', backText: '은하', crumb: '안내서'});
    document.getElementById('gStory').onclick = () => story(guide);
    document.getElementById('gPick').onclick = () => pick();
  }


  // ── 3. 은하(홈) ──
  const HUES = ['#f3c969', '#7aa7ff', '#f29b8f', '#8fd6b4', '#c9a6ff', '#ffb36b'];
  function home() {
    navMark(['home']);
    const nx = E.nextPlace();
    const rk = E.rank();
    frame(`<section class="hero stage">${buddy('idle')}<div class="bubble">${esc(line('hello'))}</div></section>
      ${nx ? (nx.why === 'bh'
               ? `<button class="primary big go" data-go="bh:${nx.big.no}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${esc(nx.big.title)} · <span class="tm" data-term="블랙홀 관문">블랙홀 관문</span></small></button>`
               : `<button class="primary big go" data-go="small:${nx.small.code}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${esc(nx.small.title)}${nx.why === 'again' ? ' · <span class="tm" data-term="다시 열린 질문">다시 열린 질문</span>' : nx.why === 'mission' ? ` · <span class="tm" data-term="mission">${A.M.name(nx.r)}</span>` : nx.why === 'review' ? ' · <span class="tm" data-term="다시 빛내기">다시 빛내기</span>' : ''}</small></button>`)
             : `<div class="done-all">지금 열린 곳은 모두 탐험했어요 ✦</div>`}
      <nav class="homenav"><button data-go="play"><span>🎮</span>놀이터</button><button data-go="record"><span>${rk.icon}</span>나의 기록</button><button data-go="cnote"><span>📒</span>개념 노트</button><button data-go="guide"><span>📖</span>안내서</button></nav>
      <h3 class="galttl">${E.course().code} 은하 <i class="tq" data-term="은하">?</i>${A.isTester() && A.courses().length > 1 ? ' <button class="ghost small" id="cSwap">학년 바꾸기</button>' : ''}</h3><div class="mapbox">${A.galaxyMap()}</div>`, {crumb: ''});
    if ($('#cSwap')) $('#cSwap').onclick = courseSwap;
  }
  /* 학년(과정) 바꾸기(시험 학생만) — 과정마다 진도·기록·별빛이 따로 */
  function courseSwap() {
    document.querySelector('.kpop')?.remove();
    const d = document.createElement('div'); d.className = 'kpop';
    d.innerHTML = `<div class="kpop-in"><b>어느 은하로 갈까?</b><div class="krow">${A.courses().map(id => `<button class="${id === A.cid() ? 'primary' : 'secondary'}" data-c="${id}">${esc(window.APP_DATA[id].code)} · ${esc(window.APP_DATA[id].name)}</button>`).join('')}</div><div class="krow"><button class="ghost" id="cx">닫기</button></div></div>`;
    document.body.appendChild(d);
    d.querySelector('#cx').onclick = () => d.remove();
    d.onclick = e => { if (e.target === d) d.remove(); };
    d.querySelectorAll('[data-c]').forEach(b => b.onclick = async () => {
      d.remove(); if (b.dataset.c === A.cid()) return;
      A.setCourse(b.dataset.c); calcGrade = wordGrade = A.cid();
      root().innerHTML = '<div class="loading">불러오는 중…</div>';
      await E.load(); await applyCmds(); home();
    });
  }


  // ── 🎮 놀이터(마스터 10/14: 홈에는 개념 질문만 — 나머지는 여기로) ──
  function playHub() {
    navMark(['play']);
    frame(`<section class="play"><h2>🎮 놀이터</h2><div class="playgrid">
      <button class="funbtn" data-go="calc"><span>⚡</span><b>계산 연습</b><small>퉁구리와 경주</small></button>
      <button class="funbtn wq" data-go="words"><span>📖</span><b>용어 맞히기</b><small>대단원마다 12문제</small></button>
      <button class="funbtn vs" data-go="battle"><span>⚔</span><b>친구와 대결</b><small>개념 · 계산</small></button>
      <button class="funbtn hl" data-go="hall"><span>🏆</span><b>빛나는 탐험가</b><small>이번 학기 1·2·3등</small></button></div></section>`, {back: 'home', backText: '은하', crumb: '놀이터'});
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
      <p class="lvline center"><span class="tm" data-term="LEVEL">${E.LVL(r)}</span>${r < open ? ' · <span class="tm" data-term="연습">연습</span>' : ''}</p>
      <ul class="plist">${b.smalls.map((s, i) => {                   // 행성 이름은 지도 아래 목록으로(마스터 10/12: 지도 글씨가 너무 작다)
        const c = E.count(s, r), t = E.tasks(s, r), k = t.map(x => E.state(x.id).k);
        const done = c.n && c.done === c.n;
        const note = done ? '' : k.includes('next') ? '다시 열림' : (k.includes('today') && !k.includes('new')) ? '내일 열림' : '';
        return `<li><button class="prow ${done ? 'lit' : ''}" data-go="small:${s.code}" data-r="${r}"><i style="--p:${A.planetColor(i)}">${i + 1}</i><span>${esc(s.title)}</span><b>${note ? `<small>${note}</small> ` : ''}${c.done}/${c.n}</b></button></li>`;
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
      <div class="code">${small.code}</div><h2>${esc(small.title)}</h2><div class="chip">${E.RL(r)}</div>${r === 3 && todo.length ? '<p class="prep">📝 은하 탐사는 연습장과 연필을 준비하고 출발해!</p>' : ''}
      <p class="sub">${todo.length ? `질문 ${todo.length}개 · 하나에 약 ${min}분` : (locked ? `남은 질문 ${locked}개는 내일 다시 열려요` : '다 탐험했어요')}</p>${locked && !todo.length ? keyBtn() : ''}
      ${rv.length ? `<button class="primary big" id="rv"><span>다시 빛내기 ${rv.length}개</span><small>일주일 전에 도움을 받았던 질문이야</small></button>` : ''}
      ${todo.length ? `<button class="primary big" id="go">출발</button>` : ''}
      ${!todo.length && A.M.ready(small, r) ? missionBtns(small, r) + noteBtn() : ''}
      ${practice ? `<button class="secondary" id="pr">질문 연습하기 (점수는 그대로)</button>` : ''}</section>`, {back: 'big:' + big.no, backText: big.code, crumb: small.code});
    if ($('#go')) $('#go').onclick = () => run(big, small, r, todo, false);
    if ($('#rv')) $('#rv').onclick = () => run(big, small, r, rv, 'review');
    bindMission(big, small, r);
    bindNote(small, r);
    if ($('#pr')) $('#pr').onclick = () => run(big, small, r, t, true);
  }

  // ── 6. 한 행성의 질문들 ──
  async function run(big, small, r, list, practice) {
    if (!A.isAcademyDevice()) return blocked();
    MYSUBS = null;
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
      if (out && out.timedOut && practice !== true) return sessionEnd(passed, 'timeout');
      if (sessOver(sess()) && i < list.length - 1) return sessionEnd(passed);
    }
    finish(big, small, r, passed, list.length, opened, practice);
  }
  /* 오늘 공부가 끝났으면(시간이 다 됨 · 질문 시간 초과) 질문으로 들어가는 모든 길을 막는다 — 계산 연습·계산 대결은 질문이 아니라 열어 둠 */
  const studyOver = () => { const o = sess(); if (sessOver(o)) { sessionEnd(0); return true; } return false; };
  function blocked() {
    frame(`<section class="center-msg stage">${buddy('retry')}<h2>학원 태블릿에서만 공부할 수 있어요</h2><p class="sub">선생님이 이 기기를 학원 기기로 등록하면 열려요.</p><button class="secondary" data-go="home">은하로</button><a class="ghost small" href="teacher.html">선생님: 이 기기 등록하기 ›</a></section>`);
  }
  function sessionEnd(passed, why) {
    const o = sess(); o.done = true; sessSave(o); tickClock();
    frame(`<section class="center-msg stage">${buddy(why === 'timeout' ? 'retry' : 'praise')}<h2>오늘은 여기까지!</h2><p class="sub">${why === 'timeout' ? '질문 시간이 다 돼서 오늘 공부는 여기서 끝났어요.<br>' : ''}${passed ? `오늘 질문 ${passed}개에 불을 켰어요.` : why === 'timeout' ? '내일 다시 도전하자!' : `오늘 공부 시간을 다 썼어요. 다음에 또 만나!`}</p><button class="primary big" data-go="home">은하로 돌아가기</button>${keyBtn()}</section>`);
  }
  function finish(big, small, r, passed, n, opened, practice) {
    if (!practice) A.buzz(opened ? BZ.big : passed === n ? BZ.planet : 0);
    frame(`<section class="center-msg stage">${buddy(passed ? 'praise' : 'idle')}<h2>${practice ? '연습 끝!' : (passed === n ? '행성에 불이 켜졌어!' : '탐사 끝!')}</h2>
      <p class="sub">${esc(small.title)} · ${E.RL(r)} — 통과 ${passed}/${n}${passed < n && !practice ? ' · 남은 질문은 내일 다시 열려요' : ''}</p>
      ${opened ? `<div class="unlock">✦ ${esc(big.title)}의 ${E.RT(opened)}가 열렸어요!</div>` : ''}
      ${!practice && A.M.ready(small, r) && !A.M.done(small, r) ? missionBtns(small, r) : `<button class="primary big" data-go="big:${big.no}">${big.code}로</button>`}${A.M.ready(small, r) ? noteBtn() : ''}
      <button class="ghost" data-go="home">은하로</button></section>`);
    bindMission(big, small, r);
    bindNote(small, r);
  }

  // ── 블랙홀 관문 (퉁구리 은신처) ──
  async function blackhole(no, r) {
    if (!A.isAcademyDevice()) return blocked();
    const big = E.big(no), id = A.bhTaskId(big, r), done = A.bhDone(big, r), st = E.state(id);
    if (!A.bhOpen(big, r)) return star(no, r);
    navMark(['blackhole', no, r]);
    if (st.k === 'today') return frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>블랙홀이 닫혔어</h2><p class="sub">내일 새벽 4시에 다시 열려요.</p><button class="primary big" data-go="big:${no}">${big.code}로</button></section>`);
    frame(`<section class="center-msg stage bhin"><div class="bhole"></div><img class="mload peek" src="img/tunguri.webp" alt="">
      <h2>${big.code} 블랙홀 관문</h2><p class="sub">퉁구리가 이 안에 별빛을 숨겼어!</p>
      <button class="primary big" id="bgo">${done ? '다시 들어가기 (연습)' : '들어가기'}</button><button class="ghost" data-go="big:${no}">${big.code}로</button></section>`, {back: 'big:' + no, backText: big.code, crumb: big.code + ' · 블랙홀'});
    $('#bgo').onclick = async () => {
      if (studyOver()) return;
      const pseudo = {code: big.code + ' 블랙홀', title: '블랙홀 관문', unitId: '', unitLabel: '🕳 블랙홀 · ' + big.title, key: ''};
      const out = await ask(big, pseudo, {kind: 'bh', id, r, src: big.bh[r]}, 0, 1, done);
      if (out === 'quit') { if (NAV.backQuit) { NAV.backQuit = false; return; } return star(no, r); }
      if (out && out.timedOut && !done) return sessionEnd(0, 'timeout');
      if (out && out.pass && !done) {
        A.buzz(BZ.big);
        frame(`<section class="center-msg stage"><div class="chest">✦</div><h2>별빛 상자를 찾았어!</h2>
          <p class="sub">퉁구리가 숨겨 둔 별빛을 되찾았어. 퉁구리는 깜짝 놀라 다음 별로 도망갔어!</p>
          <img class="mload flee" src="img/tunguri.webp" alt=""><button class="primary big" data-go="home">은하로</button></section>`);
      } else star(no, r);
    };
  }

  // ── ⚡ 계산 연습(마스터 10/13) — 퉁구리와 경주. 데이터·문제 생성은 js/calc.js ──
  const C = A.C;
  let calcGrade = 'e4-2';                       // 들어올 때(enter) 지금 과정으로
  function calcHub(gid) {
    calcGrade = gid || calcGrade; navMark(['calc', calcGrade]);
    const g = C.GRADES.find(x => x.id === calcGrade) || C.GRADES[0], rec = E.prog().calc || {};
    const best = k => { const r = rec[k]; return r ? `최고 ${r.best.c}/10 · ${r.best.t}초${r.wins ? ' · 🏁 ' + r.wins + '승' : ''}` : '아직 안 해 봤어'; };
    frame(`<section class="calc"><h2>⚡ 계산 연습</h2>
      <div class="tabs">${C.GRADES.map(x => `<button class="tab ${x.id === g.id ? 'on' : ''}" data-g="${x.id}">${x.name}</button>`).join('')}</div>
      <ul class="cunits">${g.units.map(u => `<li><button class="cunit" data-k="${u.key}"><b>${esc(u.title)}</b><i>${best(u.key)}</i></button></li>`).join('')}
        </ul></section>`,
      {back: 'play', backText: '놀이터', crumb: '계산 연습'});
    root().querySelectorAll('[data-g]').forEach(b => b.onclick = () => calcHub(b.dataset.g));
    root().querySelectorAll('.cunit').forEach(b => b.onclick = () => calcUnit(b.dataset.k));
  }
  function calcUnit(key) {
    navMark(['calcu', key]);
    const word = key.startsWith('w:'), info = word ? null : C.unit(key), gid = word ? key.slice(2) : info.g.id;
    const tips = word ? [['용어 맞히기', ['뜻을 끝까지 읽고 어떤 낱말인지 골라요.', '비슷한 낱말이 함께 나오니 뜻의 작은 차이를 잘 봐!', '']]] : info.u.types.map(t => [C.T[t].name, C.TIP[t] || []]);
    let sp = A.ls.get('app:calcSpeed', 'mid'); if (!C.SPEED[sp]) sp = 'mid';
    frame(`<section class="calc"><h2>${esc(word ? '📖 용어 맞히기' : info.u.title)}</h2><p class="sub">${esc(word ? (C.GRADES.find(x => x.id === gid) || {}).name : info.g.name)} · 10문제</p>
      <div class="cspeed"><span>상대</span>${Object.entries(C.SPEED).map(([k, v]) => `<button class="${k === sp ? 'on' : ''}" data-s="${k}">${v[0]}</button>`).join('')}</div>
      <button class="primary big" id="cGo">퉁구리와 출발!</button>
      <div class="ctips">${tips.map(([nm, L]) => `<div class="ctip"><b>💡 ${esc(nm)}</b><ul>${L.filter(Boolean).map((x, k) => `<li class="${k === L.length - 1 && L.length === 3 && /[=→]/.test(x) ? 'ex' : ''}">${fm(x)}</li>`).join('')}</ul></div>`).join('')}</div></section>`, {back: 'calc', backText: '계산 연습', crumb: '팁'});
    root().querySelector('[data-go="calc"]').onclick = e => { e.stopPropagation(); calcHub(gid); };
    root().querySelectorAll('[data-s]').forEach(b => b.onclick = () => { A.ls.set('app:calcSpeed', b.dataset.s); root().querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); });
    $('#cGo').onclick = () => calcPlay(key, A.ls.get('app:calcSpeed', 'mid'));
  }
  async function calcPlay(key, sp, opt) {
    opt = opt || {};
    const word = key.startsWith('wq:'), list = opt.list || (word ? C.wround(key) : C.round(key)), sp1 = C.SPEED[sp] || C.SPEED.mid;
    const need = word ? Math.ceil(list.length * 0.8) : 8;
    const total = Math.round(list.reduce((a, p) => a + p.sec, 0) * sp1[1]);
    navMark(['q']); let alive = true; NAV.quit = () => { alive = false; clearInterval(tim); return false; };
    let k = 0, ok = 0, t0 = 0, tim = null, lock = false, inp = {};
    frame(`<div class="race"><div class="lane"><span class="tok me" id="rMe"><img src="${IMG}${myFriend() || 'exi'}/card.webp" alt=""></span></div>
        <div class="lane">${opt.vs ? `<span class="tok tg vsn" id="rTg"><b>${esc(String(opt.vs.name || '?').slice(0, 1))}</b></span><span class="lname">${esc(opt.vs.name || '')}</span>` : '<span class="tok tg" id="rTg"><img src="img/tunguri.webp" alt=""></span>'}</div><div class="goal">🏁</div></div>
      <div class="cnum"><span><span id="cK">1</span> / ${list.length}</span><b id="cT">0초</b></div>
      <section class="ccard" id="cQ"></section><section id="cA"></section>`, {back: 'calc', backText: '그만하기', crumb: opt.crumb || (word ? '용어 맞히기' : '계산 연습'), nostar: !!opt.vs});
    root().querySelector('[data-go="calc"]').onclick = e => { e.stopPropagation(); alive = false; clearInterval(tim); stopW(); NAV.quit = null; opt.onQuit ? opt.onQuit() : word ? wordUnit(key) : calcUnit(key); };
    /* 🎙 용어 맞히기 — 말로 답하기(보기 없음). 낱말 하나라 한 번 듣고 끝(continuous 아님) · 다른 낱말을 말하면 틀림 · 못 알아들으면 두 번까지 다시 */
    let wrec = null;
    function stopW() { if (wrec) { const r = wrec; wrec = null; try { r.onend = null; r.abort(); } catch (e) {} } }
    function sayDraw(p) {
      const myK = k; let tries = 0;
      $('#cA').innerHTML = `<div class="wsay"><div class="live" id="wLive"></div>
        <div class="row"><button class="mic" id="wMic" aria-label="말하기"><span></span></button></div>
        <div class="row wtype" id="wTy" hidden><input id="wIn" autocomplete="off" placeholder="낱말을 써 줘"><button class="primary" id="wOk">확인</button></div>
        <div class="row"><button class="ghost small" id="wTw">글로 쓰기</button><button class="ghost small" id="wNo">모르겠어</button></div></div>`;
      const live = $('#wLive'), hint = t => { if (live) live.innerHTML = `<span class="hear">${t}</span>`; };
      const judge = (heard, typedIn) => {
        if (lock || k !== myK) return;
        const m = C.wmatch(p, heard);
        if (m.v === 'right') return submit({c: p.ans});
        if (m.v === 'wrong' || typedIn || tries >= 2) return submit({c: m.said || heard[0] || ''});
        tries++; hint(`「${esc(heard[0] || '')}」? 잘 못 들었어. 다시 말해 줘`); listen();
      };
      const typeMode = msg => { stopW(); if (msg) toast(msg); const ty = $('#wTy'); if (!ty) return; ty.hidden = false; $('#wTw').hidden = true; $('#wIn').focus(); };
      function listen() { if (useClova()) listenClova(); else listenBrowser(); }
      /* 🎙 CLOVA 로 낱말 하나 듣기 — 글자가 오고 1.2초 동안 새 글자가 없으면 끝내고 채점 · 8초 동안 아무 말이 없으면 멈춤 */
      function listenClova() {
        stopW(); try { A.S.quiet(); } catch (e) {}
        let heard = '', lastAt = 0, cancel = false; const t0 = Date.now();
        const r = CLOVA.start({
          pts: () => [],
          onWords: ws => { const t = A.fixSpeech(ws.map(x => x.w).join(' ').replace(/[.?!]+$/, '').trim()); if (t && t !== heard) { heard = t; lastAt = Date.now(); hint(esc(t) + ' …'); } },
          onState: st => { if (st === 'on') { $('#wMic')?.classList.add('on'); if (!tries) hint('듣고 있어… 낱말을 말해 줘'); } else if (st === 'off') { clearInterval(tm); $('#wMic')?.classList.remove('on', 'wait'); if (wrec === r) wrec = null; } },
          onFail: msg => { toast(msg); clearInterval(tm); if (wrec === r) wrec = null; if (!cancel) listenBrowser(); },
          onError: msg => toast(msg)
        });
        const abort0 = r.abort; r.abort = () => { cancel = true; clearInterval(tm); abort0(); }; r.onend = null; wrec = r;   // stopW() 가 부르는 모양
        const tm = setInterval(() => {
          if (cancel || lock || k !== myK) { r.abort(); return; }
          if (heard && Date.now() - lastAt > 1200) { clearInterval(tm); if (wrec === r) wrec = null; r.finish().then(() => { if (!cancel && !lock && k === myK) judge([heard]); }); }
          else if (!heard && Date.now() - t0 > 8000) { r.abort(); if (wrec === r) wrec = null; hint('마이크를 누르고 말해 줘'); }
        }, 200);
      }
      function listenBrowser() {
        const R = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!R) return typeMode('이 기기는 말하기가 안 돼서 글로 써 줘');
        stopW(); try { A.S.quiet(); } catch (e) {}
        const r = new R(); r.lang = 'ko-KR'; r.continuous = false; r.interimResults = true; r.maxAlternatives = 5; wrec = r; let got = false, interim = [];   // 한 글자 낱말은 확정 결과가 안 오고 끝나는 일이 있어 중간 결과도 받아 둔다
        r.onstart = () => { $('#wMic')?.classList.add('on'); if (!tries) hint('듣고 있어… 낱말을 말해 줘'); };
        r.onresult = ev => {
          const alts = []; let fin = false;
          for (let i = ev.resultIndex; i < ev.results.length; i++) { const res = ev.results[i]; if (res.isFinal) fin = true; for (let a = 0; a < res.length; a++) { const t = ((res[a] && res[a].transcript) || '').trim(); if (t) alts.push(A.fixSpeech ? A.fixSpeech(t) : t); } }
          if (!fin) { if (alts.length) { interim = alts; hint(esc(alts[0]) + ' …'); } return; }
          got = true; if (wrec === r) wrec = null; $('#wMic')?.classList.remove('on');
          if (alts.length) judge(alts.concat(interim));
        };
        r.onerror = ev => { if (['not-allowed', 'service-not-allowed', 'audio-capture', 'network'].includes(ev.error)) { if (wrec === r) wrec = null; typeMode(ev.error === 'network' ? '음성 인식 서버에 연결하지 못했어. 글로 써 줘' : '마이크가 막혀 있어. 글로 써 줘 (' + ev.error + ')'); } };
        r.onend = () => { $('#wMic')?.classList.remove('on'); if (wrec === r) { wrec = null; if (!got && !lock && k === myK) { if (interim.length) { got = true; judge(interim); } else hint('마이크를 누르고 말해 줘'); } } };
        try { r.start(); } catch (e) { wrec = null; hint('마이크를 누르고 말해 줘'); }
      }
      $('#wMic').onclick = () => (wrec ? stopW() : listen());
      $('#wTw').onclick = () => typeMode();
      $('#wOk').onclick = () => { const t = $('#wIn').value.trim(); if (t) judge([t], true); };
      $('#wIn').onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); $('#wOk').click(); } };
      $('#wNo').onclick = () => submit({c: ''});
      listen();
    }
    const pos = () => {
      const el = (Date.now() - t0) / 1000;
      $('#cT') && ($('#cT').textContent = Math.floor(el) + '초');
      const tg = $('#rTg'); if (tg && !opt.vs) tg.style.left = Math.min(1, el / total) * 88 + '%';
      if (opt.tick) opt.tick(el, k, ok);
    };
    const draw = () => {
      const p = list[k]; inp = p.form === 'frac' ? {w: '', n: '', d: '', f: 'w'} : {v: ''};
      $('#cK').textContent = k + 1;
      const tag = p.say ? '🎙 이 뜻을 가진 낱말을 말해 봐' : p.kind === 'p' ? '👆 이 낱말의 바른 뜻은?' : p.kind === 'e' ? '🤔 어느 것일까?' : p.word ? '📖 이 뜻을 가진 낱말은?' : '';
      $('#cQ').innerHTML = `${tag ? `<div class="ctag">${tag}</div>` : ''}${p.from ? `<div class="cfrom">🌱 ${esc(p.from)}</div>` : ''}<div class="cq ${p.kind === 'p' ? 'cword' : ''}">${fm(p.q)}</div>${p.fig ? `<div class="figbox">${p.fig}</div>` : ''}<div class="cfb" id="cFb"></div>`;
      if (p.say) sayDraw(p);
      else if (p.word) {
        $('#cA').innerHTML = `<div class="cchs ${p.kind === 'p' || p.long || (p.kind && p.choices.length === 3) ? 'long' : ''}">${p.choices.map((c, j) => `<button class="ch" data-j="${j}">${p.kind ? fm(c) : esc(c)}</button>`).join('')}</div>`;
        $('#cA').querySelectorAll('.ch').forEach(b => b.onclick = () => submit({c: p.choices[+b.dataset.j]}, b));
      } else {
        const box = f => `<button class="kbox ${inp.f === f ? 'on' : ''}" data-f="${f}">${esc(inp[f]) || '&nbsp;'}</button>`;
        $('#cA').innerHTML = `<div class="kdisp">${p.form === 'frac' ? `<span class="kmix">${box('w')}<span class="kfr">${box('n')}<i></i>${box('d')}</span></span>` : `<span class="kone">${esc(inp.v) || '&nbsp;'}</span>`}${p.unit ? `<span class="kunit">${esc(p.unit)}</span>` : ''}</div>
          ${p.form === 'frac' ? '<p class="khint">자연수 → 분자 → 분모 차례로 · 자연수가 없으면 「다음 칸」</p>' : ''}
          <div class="kpad">${['7', '8', '9', '⌫', '4', '5', '6', p.form === 'frac' ? '→' : '.', '1', '2', '3', '확인', '0'].map(x => `<button class="${x === '확인' ? 'kok' : x === '0' ? 'kz' : ''}" data-x="${x}">${x === '→' ? '다음 칸' : x}</button>`).join('')}</div>`;
        $('#cA').querySelectorAll('.kbox').forEach(b => b.onclick = () => { inp.f = b.dataset.f; redraw(); });
        $('#cA').querySelectorAll('[data-x]').forEach(b => b.onclick = () => key1(b.dataset.x));
      }
    };
    const redraw = () => {
      const p = list[k]; if (!p || p.word) return;
      if (p.form === 'frac') $('#cA').querySelectorAll('.kbox').forEach(b => { b.innerHTML = esc(inp[b.dataset.f]) || '&nbsp;'; b.classList.toggle('on', inp.f === b.dataset.f); });
      else $('#cA').querySelector('.kone').innerHTML = esc(inp.v) || '&nbsp;';
    };
    const key1 = x => {
      if (lock) return; const p = list[k]; if (!p || p.word) return;
      const f = p.form === 'frac' ? inp.f : 'v';
      if (x === '확인') return submit(inp);
      if (x === '⌫') inp[f] = inp[f].slice(0, -1);
      else if (x === '→') inp.f = {w: 'n', n: 'd', d: 'w'}[inp.f];
      else if (x === '.') { if (!inp.v.includes('.')) inp.v = (inp.v || '0') + '.'; }
      else if ((inp[f] || '').length < 7) inp[f] = (inp[f] || '') + x;
      redraw();
    };
    const onKey = e => {
      if (!alive) return removeEventListener('keydown', onKey);
      const p = list[k]; if (!p) return;
      if (p.word) { if (p.say) return; const j = +e.key - 1; if (j >= 0 && j < 4) { const b = $('#cA').querySelectorAll('.ch')[j]; b && b.click(); } return; }
      if (/^[0-9]$/.test(e.key)) key1(e.key); else if (e.key === 'Backspace') key1('⌫'); else if (e.key === 'Enter') key1('확인');
      else if (e.key === '.') key1(p.form === 'frac' ? '→' : '.'); else if (e.key === 'Tab' || e.key === '/') { e.preventDefault(); key1('→'); }
    };
    addEventListener('keydown', onKey);
    const submit = (v, btn) => {
      if (lock) return; const p = list[k];
      if (!p.word && !C.parse(v, p.form)) { toast(p.form === 'frac' ? '분자와 분모를 채워 줘' : '답을 넣어 줘'); return; }
      lock = true; stopW();
      const right = C.check(p, v), fb = $('#cFb');
      if (right) { ok++; A.S.sound('tick'); A.buzz(12); const bt = C.better(p, v); fb.innerHTML = `<span class="ok">✓ 정답!${bt ? ' <small>(' + fm(bt) + ')</small>' : ''}</span>`; }
      else fb.innerHTML = `<span class="no">아쉬워! 정답은 <b>${fm(C.answerText(p))}</b></span>`;
      if (btn) { btn.classList.add(right ? 'right' : 'wrong'); if (!right) $('#cA').querySelectorAll('.ch').forEach(b => { if (p.choices && p.choices[+b.dataset.j] === p.ans) b.classList.add('right'); }); }
      if (p.say) $('#cA').querySelectorAll('button,input').forEach(b => b.disabled = true);
      $('#rMe').style.left = (k + 1) / list.length * 88 + '%';
      if (opt.onAnswer) opt.onAnswer(k, right);
      setTimeout(() => { if (!alive) return; lock = false; k++; if (k < list.length) draw(); else end(); }, right ? 650 : (p.say || p.kind ? 2200 : 1500));
    };
    const end = async () => {
      alive = false; clearInterval(tim); stopW(); removeEventListener('keydown', onKey); NAV.quit = null;
      const T = Math.round((Date.now() - t0) / 1000);
      if (opt.onEnd) return opt.onEnd({ok, n: list.length, t: T});
      const win = ok >= need && T <= total, P = E.prog(), why = word ? 'word' : 'calc';
      P.calc = P.calc || {}; const r = P.calc[key] = P.calc[key] || {plays: 0, wins: 0, best: {c: 0, t: 999}};
      r.plays++; if (win) r.wins++;
      if (ok > r.best.c || (ok === r.best.c && T < r.best.t)) r.best = {c: ok, t: T, n: list.length};
      let gain = 0;
      if (win) { const day = A.today(), n = (P.pts || []).filter(x => x.why === why && A.dayKey(x.at) === day).length; if (n < C.WIN_MAX) gain = A.S.add(why + ':' + day + ':' + n, C.WIN_STARS, why, 0); }
      await E.save();
      if (win) A.buzz(BZ.big);
      frame(`<section class="center-msg stage">${win ? buddy('praise') : '<img class="mload" src="img/tunguri.webp" alt="">'}
        <h2>${win ? '퉁구리를 이겼어!' : ok >= need ? '정확했는데 퉁구리가 조금 더 빨랐어!' : '퉁구리가 먼저 도착했어…'}</h2>
        <div class="score">${ok}<small> / ${list.length}</small></div>${A.S.chip(gain, 0, why)}
        <p class="sub">나 ${T}초 · ${esc(sp1[0])} ${total}초${!win && ok < need ? ' · ' + need + '문제 이상 맞히고 먼저 도착하면 이겨' : ''}${win && !gain ? ' · 오늘 받을 수 있는 별빛은 다 받았어' : ''}</p>
        <button class="primary big" id="cAg">한 번 더!</button><button class="secondary" id="cTip">팁 다시 보기</button><button class="ghost" data-go="${word ? 'words' : 'calc'}">다른 단원</button></section>`, {crumb: word ? '용어 맞히기' : '계산 연습'});
      if (gain) A.S.gain(gain, $('#gainChip'), true);
      $('#cAg').onclick = () => calcPlay(key, sp); $('#cTip').onclick = () => (word ? wordUnit(key) : calcUnit(key));
    };
    // 3 · 2 · 1 출발
    $('#cQ').innerHTML = '<div class="count" id="cCnt">3</div>';
    for (const c of ['3', '2', '1']) { if (!alive) return; $('#cCnt') && ($('#cCnt').textContent = c); A.S.sound('tick'); await new Promise(r => setTimeout(r, 650)); }
    if (!alive) return;
    t0 = Date.now(); tim = setInterval(() => { if (alive) pos(); }, 200); draw();
  }
  // ── 📖 용어 맞히기(마스터 10/13) — 대단원마다 12문제 · 말로 6 + 고르기 6 · 데이터 js/words.js ──
  let wordGrade = 'e4-2';
  function wordHub(gid) {
    wordGrade = gid || wordGrade; navMark(['words', wordGrade]);
    const gs = C.GRADES.filter(x => C.WQ[x.id]), g = gs.find(x => x.id === wordGrade) || gs[0], rec = E.prog().calc || {}, units = C.WQ[g.id];
    const best = k => { const r = rec[k]; return r ? `최고 ${r.best.c}/${r.best.n || 12} · ${r.best.t}초${r.wins ? ' · 🏁 ' + r.wins + '승' : ''}` : '아직 안 해 봤어'; };
    frame(`<section class="calc"><h2>📖 <span class="tm" data-term="용어 맞히기">용어 맞히기</span></h2>
      <div class="tabs">${gs.map(x => `<button class="tab ${x.id === g.id ? 'on' : ''}" data-g="${x.id}">${x.name}</button>`).join('')}</div>
      <ul class="cunits">${Object.keys(units).map(no => { const k = C.wkey(g.id, no); return `<li><button class="cunit word" data-k="${k}"><b>${no}. ${esc(units[no][0])}</b><i>${best(k)}</i></button></li>`; }).join('')}</ul></section>`,
      {back: 'play', backText: '놀이터', crumb: '용어 맞히기'});
    root().querySelectorAll('[data-g]').forEach(b => b.onclick = () => wordHub(b.dataset.g));
    root().querySelectorAll('.cunit').forEach(b => b.onclick = () => wordUnit(b.dataset.k));
  }
  function wordUnit(key) {
    const u = C.wunit(key); if (!u) return wordHub();
    navMark(['wordu', key]);
    let sp = A.ls.get('app:calcSpeed', 'mid'); if (!C.SPEED[sp]) sp = 'mid';
    const g = C.GRADES.find(x => x.id === u.gid) || {};
    const tips = [['🎙 뜻을 보고 낱말을 말해요', ['마이크가 저절로 켜져. 낱말만 또박또박 말해 봐!', '「구」·「몫」처럼 한 글자 낱말은 「구예요」처럼 끝을 붙여 말하면 더 잘 알아들어.', '잘 못 들으면 한 번 더 말할 수 있어. 「글로 쓰기」로 써도 돼.']],
                  ['👆 낱말을 보고 바른 뜻을 골라요', ['보기가 한두 낱말만 달라. 끝까지 꼼꼼히 읽고 골라!']],
                  ['🤔 예를 보고 골라요', ['뜻을 떠올려서 그 예에 맞는지 따져 봐.']]];
    frame(`<section class="calc"><h2>📖 ${esc(u.title)}</h2><p class="sub">${esc(g.name || '')} · 12문제</p>
      <div class="cspeed"><span>상대</span>${Object.entries(C.SPEED).map(([k, v]) => `<button class="${k === sp ? 'on' : ''}" data-s="${k}">${v[0]}</button>`).join('')}</div>
      <button class="primary big" id="cGo">퉁구리와 출발!</button>
      <div class="ctips">${tips.map(([nm, L]) => `<div class="ctip"><b>${esc(nm)}</b><ul>${L.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></section>`, {back: 'words', backText: '용어 맞히기', crumb: '팁'});
    root().querySelectorAll('[data-s]').forEach(b => b.onclick = () => { A.ls.set('app:calcSpeed', b.dataset.s); root().querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); });
    $('#cGo').onclick = () => calcPlay(key, A.ls.get('app:calcSpeed', 'mid'));
  }
  A.UI = {frame, buddy, toast, navMark, esc, fm, calcPlay, NAV, root};

  // ── ⚔ 친구와 대결(마스터 10/13) — 연결·규칙·배지는 js/battle.js ──
  const BT = A.B;
  const nmj = (n, j) => { n = String(n || ''); const c = n.charCodeAt(n.length - 1); return n + (c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 ? '이' : '') + j; };   // 린이와 · 지우와
  const RULE = {
    concept: '같은 행성의 질문 2~3개에 둘 다 내 말로 설명해. <b>정확하고 꼼꼼하게 설명한 쪽</b>이 이겨! 점수가 5점 넘게 차이 나면 점수가 높은 쪽, 5점 안쪽이면 더 빨리 답한 쪽이 이겨. 처음 보는 질문을 한 번에 통과하면 진짜 통과로 별빛도 모여(이미 통과한 질문은 별빛이 더 생기지 않아).',
    calc: '같은 문제 10개를 동시에 풀어. <b>더 많이 맞힌 쪽</b>이 이기고, 맞힌 수가 같으면 더 빨리 끝낸 쪽이 이겨.'
  };
  let bKind = 'concept', bPoll = null;
  const stopPoll = () => { clearInterval(bPoll); bPoll = null; };
  const badgeChips = (top, size) => ['concept', 'calc'].map(k => top && top[k] >= 0 ? `<span class="bdg" data-bdg="${k}" data-t="${top[k]}">${BT.svg(k, top[k], size || 26)}</span>` : '').join('');
  function badgePop(kind) {
    document.querySelector('.tpop')?.remove();
    const d = document.createElement('div'); d.className = 'tpop';
    const info = BT.BADGE[kind], n = BT.wins(kind), t = BT.tier(n);
    d.innerHTML = `<div class="tpop-in"><b>🏅 ${info.title} 배지</b><p>대결에서 이기면 배지가 자라요. 지금 <b>${n}승</b>${t >= 0 ? ' — ' + info.words[t][1] + '!' : ''}</p>
      <ul class="bdglist">${info.words.map((w, i) => `<li class="${i === t ? 'me' : i > t ? 'off' : ''}">${BT.svg(kind, i, 34)}<span><b>${w[0]} = ${w[1]}</b><small>${esc(w[2])} · ${BT.STEPS[i]}승</small></span></li>`).join('')}</ul>
      <button class="ghost small">알겠어</button></div>`;
    d.onclick = () => d.remove(); document.body.appendChild(d); A.buzz(8);
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-bdg]'); if (b) { e.stopPropagation(); badgePop(b.dataset.bdg); } }, true);
  A.UI.badgeChips = badgeChips;

  async function battleHub(kind) {
    const dev = A.isAcademyDevice();
    bKind = kind || bKind; if (!dev) bKind = 'calc';
    navMark(['battle', bKind]);
    if (bKind === 'concept' && studyOver()) return;
    BT.enter(bKind); stopPoll();
    const draw = list => {
      if (!NAV.cur || NAV.cur[0] !== 'battle') return;
      const L = root().querySelector('#bList'); if (!L) return;
      L.innerHTML = list.length ? list.map(f => `<li><span class="bf">${esc(f.name)}<small>${esc(f.grade || '')}</small></span><span class="bb">${badgeChips(f.badge, 22)}</span><button class="primary small" data-inv="${esc(f.sid)}" data-nm="${esc(f.name)}">대결 신청</button></li>`).join('')
                              : '<li class="sub">대기실에 아직 친구가 없어</li>';
      L.querySelectorAll('[data-inv]').forEach(b => b.onclick = () => pickContent({sid: b.dataset.inv, name: b.dataset.nm}));
    };
    frame(`<section class="battle"><h2>⚔ 친구와 대결</h2>
      <div class="tabs two">${['concept', 'calc'].map(k => `<button class="tab ${k === bKind ? 'on' : ''}" data-k="${k}" ${k === 'concept' && !dev ? 'disabled' : ''}>${k === 'concept' ? (dev ? '🎙 개념 대결' : '🔒 개념 대결') : '⚡ 계산 대결'}</button>`).join('')}</div>
      ${dev ? '' : '<p class="sub">🔒 개념 대결은 학원 태블릿에서만</p>'}
      <details class="brule"><summary>규칙 보기</summary>${RULE[bKind]}</details>
      <div class="bme"><span>내 배지</span>${badgeChips(BT.top(), 30) || '<small>아직 없어</small>'}<button class="ghost small" id="bWhy">배지 보기 ›</button></div>
      <h3 class="hsec">대기실</h3><ul class="blist" id="bList"><li class="sub">찾는 중…</li></ul></section>`, {back: 'play', backText: '놀이터', crumb: '친구와 대결'});
    root().querySelectorAll('[data-k]').forEach(b => b.onclick = () => battleHub(b.dataset.k));
    $('#bWhy').onclick = () => badgePop(bKind);
    root().querySelector('[data-go="play"]').addEventListener('click', () => { stopPoll(); BT.leave(); });
    const tick = async () => {
      if (!NAV.cur || NAV.cur[0] !== 'battle') { stopPoll(); BT.leave(); return; }
      const inv = await BT.inbox(); if (inv && NAV.cur && NAV.cur[0] === 'battle' && !document.querySelector('.bpop')) invited(inv);
      draw(await BT.list(bKind));
    };
    tick(); bPoll = setInterval(tick, 2500);
  }
  /* 대결 신청: 무엇으로 할지 고르기 */
  function pickContent(to) {
    const d = document.createElement('div'); d.className = 'kpop bpick';
    const close = () => d.remove();
    if (bKind === 'calc') {
      d.innerHTML = `<div class="kpop-in"><b>⚡ ${esc(nmj(to.name, '와'))} 무엇으로 대결할까?</b>${C.GRADES.map(g => `<div class="bpg"><small>${g.name}</small>${g.units.map(u => `<button class="secondary small" data-u="${u.key}">${esc(u.title.replace(/^\d+\. /, ''))}</button>`).join('')}</div>`).join('')}<button class="ghost" id="bx">닫기</button></div>`;
      document.body.appendChild(d); d.querySelector('#bx').onclick = close;
      d.querySelectorAll('[data-u]').forEach(b => b.onclick = () => { close(); const {u} = C.unit(b.dataset.u); sendInvite(to, {kind: 'calc', key: b.dataset.u, title: u.title, list: C.round(b.dataset.u)}); });
      return;
    }
    const opts = [];
    for (const bg of E.bigs()) for (const sm of bg.smalls) for (const r of [1, 2]) { const t = E.tasks(sm, r).filter(x => x.kind === 'q'); if (t.length >= 2) opts.push({bg, sm, r, n: t.length}); }
    d.innerHTML = `<div class="kpop-in"><b>🎙 ${esc(nmj(to.name, '와'))} 어느 행성으로 대결할까?</b><div class="bpscroll">${E.bigs().map(bg => `<div class="bpg"><small>${esc(bg.code + ' ' + bg.title)}</small>${opts.filter(o => o.bg === bg).map(o => `<button class="secondary small" data-c="${o.sm.code}" data-r="${o.r}">${esc(o.sm.title)} · ${E.LVL(o.r)}</button>`).join('')}</div>`).join('')}</div><button class="ghost" id="bx">닫기</button></div>`;
    document.body.appendChild(d); d.querySelector('#bx').onclick = close;
    d.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
      close(); const {small} = E.small(b.dataset.c), r = +b.dataset.r;
      const t = E.tasks(small, r).filter(x => x.kind === 'q').sort(() => Math.random() - .5).slice(0, 3).map(x => x.id);
      sendInvite(to, {kind: 'concept', code: small.code, r, title: small.title + ' · ' + E.LVL(r), ids: t});
    });
  }
  async function sendInvite(to, room) {
    stopPoll(); BT.busy(true);
    let alive = true; navMark(['q']); NAV.quit = () => { alive = false; BT.leave(); return false; };
    frame(`<section class="center-msg stage">${buddy('question')}<h2>${esc(to.name)}에게 대결을 신청했어!</h2><p class="sub">${esc(room.title)}<br>친구가 「좋아!」를 누르면 바로 시작해.</p><span class="spin"></span><button class="ghost" id="bCan">취소</button></section>`, {crumb: '대결 신청'});
    $('#bCan').onclick = () => { alive = false; NAV.quit = null; battleHub(); };
    room = await BT.invite(to, room);
    const v = await BT.wait(room, x => x.acc === true || x.acc === false, BT.INV_LIFE, () => alive);
    if (!alive) return;
    NAV.quit = null;
    if (!v || !v.acc) {
      frame(`<section class="center-msg stage">${buddy('retry')}<h2>${v ? esc(nmj(to.name, '는')) + ' 다음에 하재' : '대답이 없어'}</h2><p class="sub">다른 친구에게 신청해 볼까?</p><button class="primary big" data-go="battle">대기실로</button></section>`, {crumb: '대결'});
      return;
    }
    play(room);
  }
  function invited(inv) {
    const d = document.createElement('div'); d.className = 'kpop bpop';
    d.innerHTML = `<div class="kpop-in"><b>⚔ ${esc(nmj(inv.from.name, '가'))} ${inv.kind === 'calc' ? '계산' : '개념'} 대결을 신청했어!</b><p class="sub">${esc(inv.title || '')}</p>
      <div class="krow"><button class="primary" id="bY">좋아!</button><button class="ghost" id="bN">다음에</button></div></div>`;
    document.body.appendChild(d); A.buzz([20, 40, 20]); A.S.sound('gain');
    d.querySelector('#bN').onclick = async () => { d.remove(); const room = await BT.room(inv.id); if (room) BT.answer(room, false); else BT.clearInbox(); };
    d.querySelector('#bY').onclick = async () => {
      if (inv.kind !== 'calc' && !A.isAcademyDevice()) { d.remove(); toast('개념 대결은 학원 태블릿에서만 할 수 있어'); const rm = await BT.room(inv.id); if (rm) BT.answer(rm, false); return; }
      if (inv.kind !== 'calc' && sessOver(sess())) { d.remove(); toast('오늘 공부 시간이 끝나서 개념 대결은 내일 하자'); const rm = await BT.room(inv.id); if (rm) BT.answer(rm, false); return; }
      d.remove(); const room = await BT.room(inv.id);
      if (!room) { toast('대결이 사라졌어. 다시 신청해 줘'); BT.clearInbox(); return; }
      stopPoll(); BT.busy(true); await BT.answer(room, true); play(room);
    };
  }
  /* 둘 다 같은 방에서 시작 */
  async function play(room) {
    const other = BT.other(room), kind = room.kind;
    let alive = true;
    const finish = async mine => {
      await BT.mine(room, Object.assign({done: true}, mine));
      navMark(['q']); NAV.quit = () => { alive = false; return false; };
      frame(`<section class="center-msg stage">${buddy('thinking')}<h2>${esc(nmj(other.name, '를'))} 기다리는 중…</h2><p class="sub">친구가 끝나면 바로 결과가 나와</p><span class="spin"></span></section>`, {crumb: '대결'});
      const o = await BT.wait(room, x => x.done || x.quit, 6 * 60000, () => alive);
      if (!alive) return;
      NAV.quit = null; BT.leave();
      const res = o ? BT.judge(kind, mine, o) : 1;
      let up = false; if (res > 0) up = BT.win(kind);
      await E.save();
      if (res > 0) A.buzz(BZ.big);
      const line2 = kind === 'calc' ? x => `${x.ok}/${room.list.length} 맞힘 · ${x.t}초` : x => `${x.score}점 · ${x.t}초`;
      const t = BT.tier(BT.wins(kind));
      frame(`<section class="center-msg stage">${res > 0 ? buddy('praise') : buddy(res < 0 ? 'retry' : 'idle')}
        <h2>${res > 0 ? '이겼어!' : res < 0 ? '아쉽게 졌어' : '비겼어!'}</h2>
        <div class="bres"><div class="${res > 0 ? 'win' : ''}"><small>나</small><b>${line2(mine)}</b></div><div class="${res < 0 ? 'win' : ''}"><small>${esc(other.name)}</small><b>${o ? (o.quit ? '중간에 나감' : line2(o)) : '대답 없음'}</b></div></div>
        ${mine.gain ? `<p class="sub">별빛 +${mine.gain}</p>` : ''}
        ${res > 0 && t >= 0 ? `<div class="bnew">${BT.svg(kind, t, up ? 72 : 46)}<span>${up ? '새 배지! ' : ''}${BT.BADGE[kind].words[t][1]} · ${BT.wins(kind)}승</span></div>` : ''}
        <button class="primary big" data-go="battle">대기실로</button><button class="ghost" data-go="home">은하로</button></section>`, {crumb: '대결 결과'});
      if (mine.gain) A.S.gain(mine.gain, root().querySelector('.bres'));
    };
    if (kind === 'calc') {
      let seen = 0;
      return calcPlay(room.key, 'mid', {list: room.list, vs: other, crumb: '계산 대결 · ' + other.name,
        onAnswer: (k, right) => BT.mine(room, {k: k + 1, ok: 0}),
        tick: async el => { if (Date.now() - seen < 1500) return; seen = Date.now(); const o = await BT.theirs(room); const tg = $('#rTg'); if (o && tg) tg.style.left = Math.min(1, (o.k || 0) / room.list.length) * 88 + '%'; },
        onEnd: r => finish({ok: r.ok, t: r.t}),
        onQuit: () => { BT.mine(room, {quit: true, done: true}); BT.leave(); battleHub('calc'); }});
    }
    // 개념 대결: 질문을 차례로(되묻기 없이) — 상대가 몇 개 답했는지 위에 작게
    const {big, small} = E.small(room.code);
    const tasks = room.ids.map(id => E.tasks(small, room.r).find(x => x.id === id)).filter(Boolean);
    const vs = setInterval(async () => {
      if (!alive) return clearInterval(vs);
      const o = await BT.theirs(room); let b = document.querySelector('.vsbar');
      if (!b) { const q = document.querySelector('.qtop'); if (!q) return; b = document.createElement('div'); b.className = 'vsbar'; q.after(b); }
      b.textContent = `⚔ ${other.name} · ${o ? (o.quit ? '나감' : (o.k || 0) + '/' + tasks.length + ' 답함') : '준비 중'}`;
    }, 1500);
    let sum = 0, tt = 0, gain = 0;
    for (let i = 0; i < tasks.length; i++) {
      const out = await ask(big, small, tasks[i], i, tasks.length, 'battle');
      if (out === 'quit') { alive = false; clearInterval(vs); await BT.mine(room, {quit: true, done: true}); BT.leave(); return battleHub('concept'); }
      sum += out.score; tt += out.t; gain += out.gain || 0;
      await BT.mine(room, {k: i + 1, score: Math.round(sum / (i + 1))});
    }
    clearInterval(vs);
    finish({score: Math.round(sum / Math.max(1, tasks.length)), t: tt, gain});
  }

  // ── 🏆 빛나는 탐험가 ──
  async function hall() {
    navMark(['hall']);
    frame('<div class="loading">별빛을 세는 중…</div>', {back: 'play', backText: '놀이터', crumb: '빛나는 탐험가'});
    const h = await A.S.hall();
    if (!NAV.cur || NAV.cur[0] !== 'hall') return;
    const me = A.session.student.id;
    const pod = [1, 0, 2].map(k => { const x = h.top[k], t = A.S.TOP[k];
      return `<div class="pod p${k + 1} ${x && x.sid === me ? 'me' : ''}"><div class="pod-ic">${t[1]}</div><div class="pod-t tm" data-term="${t[1]} ${t[0]}">${t[0]}</div>
        <b>${x ? esc(x.name) : '—'}</b><small>${x ? '⭐ ' + x.sem.toLocaleString('ko-KR') : '아직 비어 있어요'}</small><div class="pod-bar"></div></div>`; }).join('');
    frame(`<section class="hall"><h2><span class="tm" data-term="빛나는 탐험가">🏆 빛나는 탐험가</span></h2>
      <p class="sub">${esc(h.sem.name)}</p>
      <div class="podium">${pod}</div>
      <h3 class="hsec">이번 주 상</h3>
      <ul class="awards">${h.awards.map(a => `<li class="${a.who && a.who.sid === me ? 'me' : ''}"><span class="aw-ic">${a.ic}</span><span class="aw-n tm" data-term="${a.nm}">${a.nm}</span>
        <b>${a.who ? esc(a.who.name) + (a.who.sid === me ? ' (나!)' : '') : '<i>이번 주 주인공을 기다려요</i>'}</b></li>`).join('')}</ul>
      <p class="sub center">내 학기 별빛 ⭐ ${A.S.semPts().toLocaleString('ko-KR')}</p></section>`, {back: 'play', backText: '놀이터', crumb: '빛나는 탐험가'});
  }

  // ── 나의 기록 ──
  /* 마스터 10/13: 별빛(학기·전체)을 따로 보여 주고, 질문 목록에서 내가 어떻게 대답했는지도 볼 수 있게(서버 기록 submissions 에서 읽음) */
  let MYSUBS = null, MYSUBS_AT = 0;
  async function mySubs() {
    if (MYSUBS && Date.now() - MYSUBS_AT < 60000) return MYSUBS;
    const sid = encodeURIComponent(A.session.student.id), base = 'student_id=eq.' + sid + '&course_id=eq.' + A.cid() + '&order=created_at.desc&limit=1000&select=question_id,transcript,score,created_at,level';   // ⚠️ 서버 표에 pass 칸은 없다(있다고 쓰면 읽기 전체가 실패)
    let rows = null;
    try { rows = await A.sbSelect('submissions', base + ',stage'); } catch (e) { try { rows = await A.sbSelect('submissions', base); } catch (e2) {} }
    if (!rows) return MYSUBS || {};
    rows.forEach(r => { r.pass = (r.score || 0) >= 70; });
    const m = {};
    for (const r of rows) {
      if (!r.question_id) continue;
      const o = m[r.question_id] || (m[r.question_id] = {});
      const prac = r.stage === 'practice' || /re$/.test(r.level || '');
      if (r.pass && !prac && !o.pass) o.pass = r;
      if (!o.last && !prac) o.last = r;                          // 연습(개념 노트·나의 기록에서 다시 해 본 것)은 「내가 한 말」을 바꾸지 않는다
    }
    MYSUBS = m; MYSUBS_AT = Date.now();
    return m;
  }
  const ansHtml = t => { const L = String(t || '').trim().split('\n'); return L.length > 1 ? L.map(x => esc(x).replace(/^(\d+)차:\s*/, '<small>$1번째</small> ')).join('<br>') : esc(L[0].replace(/^\d+차:\s*/, '')); };
  function tierPop(score) {
    document.querySelector('.tpop')?.remove();
    const d = document.createElement('div'); d.className = 'tpop';
    const cur = E.rank().tier;
    d.innerHTML = `<div class="tpop-in"><b>탐험가 등급표</b>
      <table class="tiers">${E.TIERS.map((t, k) => `<tr class="${k === cur && score != null ? 'me' : ''}"><td>${t[2]}</td><td><b>${t[0]}</b> <small>${t[1]}</small></td><td>${A.S.TIER_RANGE[k][0]}점</td><td><small>${A.S.TIER_RANGE[k][1]}</small></td></tr>`).join('')}</table>
      <p>등급 점수는 지금까지 한 질문을 <b>얼마나 잘 설명했는지</b>의 평균이야. 스스로 한 번에 설명하면 100, 되묻기 뒤면 90처럼 모여.${score != null ? ` 지금 내 등급 점수는 <b>${Math.round(score)}점</b>.` : ''}<br>별빛은 쌓은 양이고, 등급은 이해한 정도야.</p>
      <button class="ghost small">알겠어</button></div>`;
    d.onclick = () => d.remove(); document.body.appendChild(d); A.buzz(8);
  }
  async function record(which) {
    navMark(['record', which || null]);
    const rk = E.rank(), bk = E.book(), sem = A.S.sem();
    const LBL = {one: ['한 번에', 'one pass'], h1: ['되묻기 뒤', 'hint 1'], h2: ['도움 뒤', 'hint 2'], yet: ['아직', '다시 하면 빛나요']};
    const qOf = it => it.t.kind === 'bh' ? it.b.bh[it.r].q : it.t.src.q;
    const subs = which ? await mySubs() : {};
    if (NAV.cur && NAV.cur[0] !== 'record') return;               // 불러오는 사이 다른 화면으로 갔으면 그리지 않는다
    /* 마스터 10/14: 쭉 나열하지 말고 대단원(별) → 소단원(행성)별로 묶어 보여 준다. 대단원은 눌러야 펼쳐짐 */
    const liOf = it => {
      const o = subs[it.t.id] || {}, row = which === 'yet' ? o.last : (o.pass || o.last);
      const go = which === 'yet' ? (it.s ? `data-go="small:${it.s.code}" data-r="${it.r}"` : `data-go="bh:${it.b.no}" data-r="${it.r}"`) : '';
      const id = esc(it.t.id), cn = ['s', 'l'].some(w => A.CN.can(it.t, w));
      /* 마스터 10/24: 통과한 질문은 누르면 바로 다시 풀어 보기(연습 — 기록·점수·별빛 그대로) · 📒 개념 노트에 담기 */
      return `<li class="rec"><span class="code">${it.t.kind === 'bh' ? '블랙홀 · ' : ''}${E.RL(it.r)}</span><span${which !== 'yet' ? ` class="rq" data-rp="${id}"` : ''}>${fm(qOf(it))}</span>
        ${row && row.transcript ? `<details class="myd"><summary>🗣 내가 한 말 보기</summary><div class="myd-in"><b>내가 한 말</b><p>${ansHtml(row.transcript)}</p>${which !== 'yet' && it.t.src && it.t.src.ans ? `<b>모범 답</b><p class="mod">${fm(it.t.src.ans)}</p>` : ''}</div></details>` : '<small class="sub">남아 있는 대답이 없어요</small>'}
        <div class="recact">${which === 'yet' ? `<button class="ghost small redo" ${go}>다시 하기 →</button>` : `<button class="ghost small redo" data-rp="${id}">↻ 다시 풀어 보기 <small>연습</small></button>`}${cn ? `<button class="ghost small redo cnr ${A.CN.has(it.t.id) ? 'in' : ''}" data-rn="${id}">${A.CN.has(it.t.id) ? '✓ 노트에 있어' : '📒 노트에 담기'}</button>` : ''}</div></li>`;
    };
    /* 그 행성에서 이미 푼 mission 은 여기서 바로 다시 풀기(연습) */
    const misRedo = s => [1, 2, 3].map(r => [r, A.M.result(s, r)]).filter(x => x[1]).map(([r, m]) => `<button class="ghost small mredo" data-mc="${s.code}" data-mr="${r}">📝 ${A.M.name(r)} 다시 풀기 <small>${m.c}/${m.n} · 연습</small></button>`).join('');
    let list = '';
    if (which) {
      const groups = E.bigs().map(b => {
        const mine = bk[which].filter(it => it.b === b); if (!mine.length) return null;
        const subs2 = b.smalls.map(s => [s.code + ' ' + s.title, mine.filter(it => it.s === s), s]).concat([['🕳 블랙홀 관문', mine.filter(it => !it.s), null]]).filter(x => x[1].length);
        return {b, n: mine.length, subs2};
      }).filter(Boolean);
      list = groups.map(g => `<details class="recbig"${groups.length === 1 ? ' open' : ''}><summary><span class="rbc">${esc(g.b.code)}</span><span class="rbt">${esc(g.b.title)}</span><b class="rbn">${g.n}</b></summary>
        ${g.subs2.map(([t, its, s]) => `<div class="recsm"><div class="rst">${esc(t)}</div><ul class="reclist">${its.map(liOf).join('')}</ul>${s && misRedo(s) ? `<div class="recmis">${misRedo(s)}</div>` : ''}</div>`).join('')}</details>`).join('');
    }
    frame(`<section class="book">
      <div class="starcards"><div class="scard"><span>⭐ 학기 별빛</span><b>${A.S.semPts().toLocaleString('ko-KR')}</b><small>${esc(sem.name)} · ${E.course().code}</small></div>
        <div class="scard all"><span>🌌 전체 별빛</span><b>${A.S.totalPts().toLocaleString('ko-KR')}</b></div></div>
      <div class="rankcard"><div class="ri">${rk.icon}</div><div><div class="rn">${rk.name} <small>(${rk.ko})</small></div>
        <div class="sub">행성 ${rk.lit}/${rk.total}개를 밝혔어</div></div><button class="rkscore" id="rkS"><small>등급 점수</small><b>${rk.score != null ? Math.round(rk.score) : '—'}</b><small>등급표 ›</small></button></div>
      ${badgeChips(A.B.top(), 34) ? `<div class="bme"><span>🏅 대결 배지</span>${badgeChips(A.B.top(), 34)}</div>` : ''}
      <details class="how"><summary>별빛은 어떻게 모아?</summary><p>질문을 처음 통과하면 받은 점수만큼 별빛이 모여. LEVEL Ⅱ는 1.5배, LEVEL Ⅲ은 2배!<br>
        mission 은 맞힌 문제마다 20(hard mission 은 30), 다시 빛내기를 통과하면 30.<br>
        <b>학기 별빛</b>은 학기가 바뀌면 0부터 다시 모으고, <b>전체 별빛</b>은 계속 쌓여. 연습으로 다시 한 질문은 별빛이 더 생기지 않아.</p></details>
      <div class="stats">${Object.keys(LBL).map(k => `<button class="stat ${which === k ? 'on' : ''}" data-k="${k}"><b>${bk[k].length}</b><span>${LBL[k][0]}</span><small>${LBL[k][1]}</small></button>`).join('')}</div>
      ${which ? (list ? `<div class="recgroups">${list}</div>` : '<p class="sub center">아직 없어요</p>') : ''}
      <p class="center"><button class="ghost small" id="sndT">${A.S.soundOn() ? '🔊 효과음 켜짐 · 끄기' : '🔇 효과음 꺼짐 · 켜기'}</button></p>
    </section>`, {back: 'home', backText: '은하', crumb: '나의 기록'});
    root().querySelectorAll('.stat').forEach(b => b.onclick = () => record(b.dataset.k === which ? null : b.dataset.k));
    $('#rkS').onclick = () => tierPop(rk.score);
    $('#sndT').onclick = () => { if (A.S.soundOn()) A.ls.set('app:sound', 0); else { A.ls.del('app:sound'); A.S.sound('gain'); } record(which); };
    if (!which) return;
    const byId = {}; bk[which].forEach(it => { byId[it.t.id] = it; });
    const keepOpen = id => () => {                                // 다시 그린 뒤 보던 대단원을 펼쳐 둔다
      record(which);
      const el = root().querySelector(`[data-rp="${CSS.escape(id)}"],[data-rn="${CSS.escape(id)}"]`);
      const g = el && el.closest('.recbig'); if (g) { g.open = true; el.closest('.rec').scrollIntoView({block: 'center'}); }
    };
    root().querySelectorAll('[data-rp]').forEach(b => b.onclick = () => { const it = byId[b.dataset.rp]; if (it) practiceOne(it, keepOpen(it.t.id)); });
    root().querySelectorAll('[data-rn]').forEach(b => b.onclick = () => { const it = byId[b.dataset.rn]; if (it) A.CN.pick(it.t, () => { const n = A.CN.has(it.t.id); b.classList.toggle('in', n); b.textContent = n ? '✓ 노트에 있어' : '📒 노트에 담기'; }); });
    root().querySelectorAll('.mredo').forEach(b => b.onclick = () => { const {big, small} = E.small(b.dataset.mc); mission(big, small, +b.dataset.mr, false, null, {fn: () => record(which), text: '나의 기록으로'}); });
  }

  /* 한 질문만 바로 다시 해 보기(마스터 10/24 — 나의 기록·개념 노트에서). 연습이라 기록·점수·별빛·잠금은 그대로, 도움도 무료 */
  async function practiceOne(it, back) {
    if (!A.isAcademyDevice()) return blocked();
    if (studyOver()) return;
    { const o = sess(); if (!o.start) { o.start = Date.now(); sessSave(o); } }
    tickClock();
    const big = it.b, r = it.r;
    let small = it.s, task = it.t;
    if (task.kind === 'bh') { small = {code: big.code + ' 블랙홀', title: '블랙홀 관문', unitId: '', unitLabel: '🕳 블랙홀 · ' + big.title, key: ''}; task = Object.assign({}, task, {src: big.bh[r]}); }
    const out = await ask(big, small, task, 0, 1, true);
    if (out === 'quit' && NAV.backQuit) { NAV.backQuit = false; return; }
    back();
  }
  A.UI = {frame, navMark, toast, practice: practiceOne, mission: (...a) => mission(...a)};

  // ── ✦ 별빛노트(마스터 10/13) — 행성 질문을 다 마친 아이가 친구들의 잘한 대답을 본다 ──
  const noteBtn = () => `<button class="notebtn" id="nbGo"><span class="nbs">✦</span><span class="nbt"><b><span class="tm" data-term="별빛노트">별빛노트</span></b><small>100점을 받은 친구들의 대답</small></span><span class="nba">›</span></button>`;
  function bindNote(small, r) { if ($('#nbGo')) $('#nbGo').onclick = () => note(small.code, r); }
  let NOTE = null;
  async function note(code, r, again) {
    const {big, small} = E.small(code);
    navMark(['note', code, r]);
    if (!again || !NOTE || NOTE.code !== code || NOTE.r !== r) {
      frame('<div class="loading">별빛노트를 펼치는 중…</div>', {back: 'small:' + code, crumb: small.code + ' · 별빛노트'});
      root().querySelector('[data-go="small:' + code + '"]').dataset.r = r;
      NOTE = {code, r, at: Date.now()};
    }
    const L = await A.N.load(small, r);
    if (!NAV.cur || NAV.cur[0] !== 'note') return;
    const any = L.some(x => x.pick), many = L.some(x => x.n > 1);
    frame(`<section class="snote"><div class="sn-head"><span class="nbs big">✦</span><div><h2><span class="tm" data-term="별빛노트">별빛노트</span></h2><p class="sub">${esc(small.title)} · ${E.RL(r)}</p></div></div>
      <p class="sn-note">질문마다 <b>100점을 받은 친구 대답 중에서 무작위로 하나</b>를 골랐어요. 100점 대답이 없으면 90점 대답 중에서 골라요.</p>
      <ol class="sn-list">${L.map((x, k) => `<li><div class="sn-q"><span class="sn-n">${k + 1}</span>${fm(x.task.src.q)}</div>
        ${x.pick ? `<div class="sn-a ${x.pick.mine ? 'mine' : ''}"><div class="sn-who">⭐ ${x.pick.mine ? '내 대답이 뽑혔어!' : esc(x.pick.name) + '의 대답'}<small>${x.level === 100 ? '100점' : '90점 · 되묻기 뒤'}${x.pick.fresh ? ' · 새로 올라옴' : ''}</small></div><p>${fm(x.pick.ans)}</p></div>`
                 : `<div class="sn-a none">아직 별빛노트에 오른 대답이 없어. 다음에 이 질문에서 별처럼 빛날 대답을 기다리고 있어 ✦</div>`}</li>`).join('')}</ol>
      ${many ? '<button class="secondary" id="snMore">다른 친구 대답 보기</button>' : ''}
      ${any ? '' : '<p class="sub center">친구들이 이 행성을 더 탐험하면 대답이 쌓여요.</p>'}
      <button class="primary big" data-go="small:${code}" data-r="${r}">행성으로</button></section>`, {back: 'small:' + code, backText: small.code, crumb: '별빛노트'});
    root().querySelectorAll('[data-go="small:' + code + '"]').forEach(b => b.dataset.r = r);
    if ($('#snMore')) $('#snMore').onclick = () => note(code, r, true);
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
  /* back = {fn, text: '나의 기록으로'}: 나의 기록·개념 노트에서 연 mission — 그만하기·끝난 뒤 그 화면으로 돌아간다 */
  async function mission(big, small, r, hard, res, back) {
    if (!A.isAcademyDevice()) return blocked();
    if (studyOver()) return;
    const name = A.M.name(r, hard);
    navMark(['q']); let alive = true; NAV.quit = () => { alive = false; whereSet({mis: null}); };
    const misSave = (k, ok) => whereSet({mis: {no: big.no, code: small.code, r, hard: !!hard, k, ok}});
    misSave(res ? res.k : 0, res ? res.ok : 0);
    frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>${esc(name)}</h2><p class="sub"><span class="spin"></span> 퉁구리가 숨겨 둔 문제를 찾는 중…</p></section>`, {crumb: small.code + ' · ' + name});
    let quiz;
    try { quiz = await A.M.get(small, r, hard); if (!alive) return; }
    catch (e) {
      if (!alive) return;
      NAV.quit = null;
      frame(`<section class="center-msg stage">${buddy('retry')}<h2>문제를 못 찾았어</h2><p class="sub">${esc(e.message)}</p><button class="primary big" id="rt">다시 찾기</button>${back ? `<button class="ghost" id="mbk">${esc(back.text)}</button>` : `<button class="ghost" data-go="big:${big.no}">${big.code}로</button>`}</section>`);
      $('#rt').onclick = () => mission(big, small, r, hard, null, back);
      if (back) $('#mbk').onclick = () => back.fn();
      return;
    }
    const first = !A.M.done(small, r, hard);
    let k = res ? Math.min(res.k, quiz.length) : 0, ok = res ? res.ok : 0;
    const one = () => {
      const it = quiz[k], tap = it.kind === 'tap';
      const dots = quiz.map((_, j) => `<i class="${j < k ? 'd' : j === k ? 'c' : ''}"></i>`).join('');
      /* 미리 만든 문제(5지선다 · 그림 · 누르기, 마스터 10/20)와 예전 AI 문제(4지선다) 둘 다 그린다 */
      frame(`<div class="qtop"><div class="dots">${dots}</div><span class="mtag">${esc(name)}${first ? '' : ' · 연습'}</span></div>
        <section class="qcard mq"><div class="q">${fm(mx(it.stem))}</div>
        ${it.fig ? `<div class="mfig${tap ? ' tapme' : ''}" id="mfig">${it.fig}</div>` : ''}
        ${tap ? `<div class="tapbar"><span class="sub" id="tsel">그림에서 눌러 골라 봐</span><button class="primary" id="tok" disabled>다 골랐어</button></div>`
              : `<div class="chs">${it.choices.map((c, j) => `<button class="ch" data-j="${j}"><span class="cn">${'①②③④⑤'[j]}</span><span class="ct">${fm(mx(c))}</span></button>`).join('')}</div>
                 <div class="subbar"><button class="primary" id="msub" disabled>제출</button></div>`}
        <div class="say" id="say"></div></section><div class="row" id="nx"></div>`, {back: back ? 'mback' : 'big:' + big.no, backText: '그만하기', crumb: small.code});
      if (back) root().querySelector('[data-go="mback"]').onclick = e => { e.stopPropagation(); alive = false; NAV.quit = null; whereSet({mis: null}); back.fn(); };
      const after = right => {
        if (right) ok++;
        misSave(k + 1, ok);                       // 답을 고른 뒤 새로고침하면 다음 문제부터(같은 문제를 다시 풀지 않게)
        $('#say').innerHTML = `<div class="sbubble ${right ? 'mok' : 'warn'}"><b>${right ? '꼭 확인!' : '아쉬워!'}</b> ${fm(mx(it.explain))}</div>`;
        $('#nx').innerHTML = `<button class="primary big" id="nb">${k < quiz.length - 1 ? '다음 문제' : '결과 보기'}</button>`;
        $('#nb').onclick = () => { k++; k < quiz.length ? one() : done(); };
      };
      if (tap) {
        const fig = $('#mfig'), sel = new Set();
        fig.querySelectorAll('[data-t]').forEach(g => g.onclick = () => {
          if (!fig.classList.contains('tapme')) return;
          const id = g.dataset.t; sel.has(id) ? sel.delete(id) : sel.add(id);
          fig.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('sel', sel.has(x.dataset.t)));
          $('#tok').disabled = !sel.size;
        });
        $('#tok').onclick = () => {
          const want = new Set(it.tap), right = sel.size === want.size && [...sel].every(id => want.has(id));
          fig.classList.remove('tapme'); fig.innerHTML = it.figAns; $('#tok').remove();
          $('#tsel').textContent = right ? '' : '주황색으로 칠한 것이 맞는 답이야';
          after(right);
        };
      } else {
        /* 마스터 10/21: 보기를 누르면 고르기만 하고, 「제출」을 눌러야 채점(고른 뒤 바꿀 수 있게) */
        let pick = -1;
        const chs = root().querySelectorAll('.mq .ch');
        chs.forEach(b => b.onclick = () => { pick = +b.dataset.j; chs.forEach(x => x.classList.toggle('sel', x === b)); $('#msub').disabled = false; });
        $('#msub').onclick = () => {
          if (pick < 0) return;
          const right = pick === it.answer;
          chs.forEach(x => { x.disabled = true; x.classList.remove('sel'); if (+x.dataset.j === it.answer) x.classList.add('right'); else if (+x.dataset.j === pick) x.classList.add('wrong'); });
          $('#msub').closest('.subbar').remove();
          after(right);
        };
      }
    };
    const done = async () => {
      NAV.quit = null; whereSet({mis: null});
      const gain = first && ok ? A.S.add('mis:' + small.code + ':r' + r + ':' + (hard ? 'hard' : 'basic'), ok * A.S.MIS[hard ? 'hard' : 'basic'], hard ? 'hard' : 'mis', r) : 0;
      const saved = first ? await A.M.save(big, small, r, hard, ok, quiz.length) : false;
      const all = ok === quiz.length;
      if (all && first) A.buzz(BZ.big);
      frame(`<section class="center-msg stage">${all ? buddy('praise') : `<img class="mload" src="img/tunguri.webp" alt="">`}
        <h2>${all ? '별빛을 모두 되찾았어!' : ok ? '별빛을 조금 되찾았어!' : '퉁구리가 도망갔어…'}</h2>
        <div class="score">${ok}<small> / ${quiz.length}</small></div>${A.S.chip(gain, r, 'mis')}
        <p class="sub">${esc(name)}${saved ? '' : ' · 연습(처음 결과는 그대로)'}</p>
        ${!hard && !A.M.done(small, r, true) ? `<button class="secondary mbtn" id="mHard"><b>${A.M.name(r, true)}</b> <small>도전해 볼래? (선택 · 틀려도 괜찮아)</small></button>` : ''}
        ${back ? `<button class="primary big" id="mbk">${esc(back.text)}</button>` : `<button class="primary big" data-go="big:${big.no}">${big.code}로</button>`}<button class="ghost" data-go="home">은하로</button></section>`);
      bindMission(big, small, r);
      if (back) $('#mbk').onclick = () => back.fn();
      if (gain) A.S.gain(gain, $('#gainChip'), all);
    };
    k < quiz.length ? one() : done();
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
      return {mode, q: x.q, keys: x.keys, ans: x.ans, fig: x.fig, asks: h.ask, help: h, base: mode === 'nextday' ? E.Q.nextday : E.Q.first, pre: x.pre, need: x.need, tap: x.tap};
    }
    if (task.kind === 'bh') {
      const base = mode === 'nextday' ? E.Q.nextday : E.Q.first;
      if (task.r === 1) return {mode, q: x.q, words: x.words, need: x.need, keys: x.words, ans: '이 별에서 떠올릴 것: ' + x.words.join(' · '), fig: '', asks: ['이 별의 다른 행성들에서 배운 것도 떠올려 봐.'], help: {}, base};
      return {mode, q: x.q, keys: x.keys, ans: x.keys.join(' / '), fig: '', asks: x.keys.map(() => '이 별의 행성들을 하나씩 떠올려 봐. 빠진 내용은 없어?'), help: {}, base, feel: x.feel};
    }
    const keys = x.ideas.map(d => d.t), asks = x.ideas.map(d => d.ask);
    let paths = null;   // 다른 풀이 길(마스터 10/16): 길마다 아이디어를 뒤에 덧붙이고, 어느 길이든 다 짚으면 통과
    if (Array.isArray(x.paths) && x.paths.length) {
      paths = [keys.map((_, i) => i)];
      x.paths.forEach(p => { const s0 = keys.length; p.ideas.forEach(d => { keys.push(d.t); asks.push(d.ask); }); paths.push(p.ideas.map((_, i) => s0 + i)); });
    }
    const help = {kw: null, short: x.teach, long: null, lfig: ''};
    if (mode === 'again' || mode === 'review') return {mode, q: x.again, keys, paths, ans: x.teach, fig: '', asks, help, base: mode === 'review' ? E.Q.review : E.Q.short};
    return {mode, q: x.q, keys, paths, ans: x.teach, fig: x.fig, asks, help, base: mode === 'nextday' ? E.Q.nextday : E.Q.first, tap: x.tap};
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
      const stop = () => { done = true; clearInterval(tim); try { rec && (rec.clova ? rec.abort() : rec.stop()); } catch (e) {} };
      // 타이머 — 채점하는 동안은 멈춘다. 다 되면 떨어진 것과 같다(내일 다시)
      const drawT = () => { const b = $('.timer b'); if (b) { b.style.width = Math.max(0, left / limit * 100) + '%'; b.parentNode.classList.toggle('low', left < 30); } };
      const noT = E.timerOff() && practice !== 'battle';
      if (noT) { const t = root().querySelector('.qtop .timer'); if (t) t.classList.add('off'); }
      tim = setInterval(() => { if (!ticking || done || noT) return; left -= 0.25; drawT(); if (left <= 0) { ticking = false; timeout(); } }, 250);

      // 답 입력(말하기 기본 · 글 입력 대안)
      let rec = null, recFails = 0, typed = false; const altPieces = [];
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
        const cut = () => { if (rec && rec.clova) { const r = rec; rec = null; r.abort(); } else stopRec(); };   // 글로 쓰기·지우기: CLOVA 는 남은 글자를 기다리지 않고 바로 끊음
        $('#tw').onclick = () => { typed = !typed; cut(); input(prompt, onSubmit); };
        $('#clr').onclick = () => { cut(); ta.innerHTML = ''; altPieces.length = 0; upd(''); };
        $('#mic').onclick = () => (rec ? stopRec() : startRec());
        sub.onclick = () => {
          if (rec && rec.clova) {   // CLOVA: 마지막 말 조각이 다 올 때까지 기다렸다 채점(0.5~2초)
            const r = rec; rec = null; sub.disabled = true; sub.textContent = '마지막 말 받는 중…'; A.buzz(BZ.micOff);
            r.finish().then(() => { if (done) return; sub.textContent = '다 말했어'; sub.disabled = !text.trim(); if (text.trim()) sub.onclick(); }); return;
          }
          stopRec(); const t = (typed ? MI.value(ta) : text).trim(); if (!t) return;
          if (typed && t.includes('□')) { toast('분수 칸을 모두 채워 줘'); MI.focusEmpty(ta); return; }
          ticking = false; onSubmit(t);
        };
        /* 마이크 — 옛 앱(dodream.html startRecording)과 같은 방식(마스터 10/12 "이전 앱이랑 똑같이")
           · interimResults=false: 확정된 문장만 받는다 → 중간 결과가 겹쳐 반복되는 문제(안드로이드) 원천 차단
           · 새로 확정된 조각만 resultIndex 부터 모은다 · 2순위 이하 인식 후보도 모아 채점에 같이 넘긴다
           · 안드로이드가 저절로 끊으면 다시 켠다(직접 멈춘 때만 끝) · 4초 안에 안 켜지면 글로 쓰기로 */
        function startRec() { if (useClova()) startClova(); else browserRec(); }
        /* 🎙 네이버 CLOVA 실시간(10/24 마스터 「앱 전체에서」) — 학원 기기에서만(돈이 드는 길) · 선생님 설정에서 끌 수 있음.
           js/clova.js → 서버 함수 clova-stt. 글자는 0.4초 조각(확정)으로 와서 겹침 문제가 없다. 연결이 안 되면 아래 브라우저 방식으로 */
        function startClova() {
          try { A.S.quiet(); } catch (e) {}
          const pre = text;   // 앞서 말한 것 뒤에 이어 붙인다
          const r = CLOVA.start({
            pts: () => [],
            onWords: ws => upd(A.fixSpeech(((pre ? pre + ' ' : '') + ws.map(x => x.w).join(' ')).replace(/\s+/g, ' ').trim())),
            onState: st => {
              if (st === 'on') { $('#mic')?.classList.add('on'); setBuddy('listening'); if (!live.textContent) live.innerHTML = '<span class="hear">듣고 있어… 다 말하면 마이크를 다시 눌러 줘</span>'; }
              else if (st === 'wait') $('#mic')?.classList.add('wait');
              else { if (rec === r) rec = null; if (!rec) { $('#mic')?.classList.remove('on', 'wait'); setBuddy('question'); } if (!text.trim() && !typed) live.textContent = ''; }
            },
            onFail: msg => { toast(msg); if (rec === r) rec = null; if (!rec && !done) browserRec(); },
            onError: msg => toast(msg)
          });
          r._stop = () => {}; r.stop = () => r.finish(); rec = r; A.buzz(BZ.micOn);
        }
        function browserRec() {
          const R = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!R) { typed = true; toast('이 기기는 말하기가 안 돼서 글로 써 줘'); return input(prompt, onSubmit); }
          try { A.S.quiet(); } catch (e) {}                              // 효과음 장치를 먼저 잠재운다(안드로이드에서 마이크를 뺏는 일) · 기다리지 않는다(아이폰은 누른 순간에 시작해야 함)
          const pieces = text ? [text] : [];
          let manualStop = false, started = false, restarts = 0, lastErr = '';
          const r = new R(); r.lang = 'ko-KR'; r.continuous = true; r.interimResults = false; r.maxAlternatives = 5;
          rec = r; r._stop = () => { manualStop = true; };
          const render = () => upd(A.fixSpeech(pieces.join(' ').replace(/\s+/g, ' ').trim()));
          const watchdog = setTimeout(() => { if (!started) { try { r.abort(); } catch (e) {} rec = null; typed = true; toast('이 기기에서 말하기가 시작되지 않아요. 글로 써 줘'); input(prompt, onSubmit); } }, 4000);
          r.onstart = () => { started = true; clearTimeout(watchdog); $('#mic')?.classList.add('on'); setBuddy('listening'); if (!live.textContent) live.innerHTML = '<span class="hear">듣고 있어… 다 말하면 마이크를 다시 눌러 줘</span>'; };
          r.onresult = ev => {
            for (let k = ev.resultIndex; k < ev.results.length; k++) {
              const res = ev.results[k]; if (!res.isFinal) continue;
              const t = (res[0].transcript || '').trim(); if (t) pieces.push(t);
              const alts = []; for (let a = 1; a < res.length && a < 5; a++) { const at = ((res[a] && res[a].transcript) || '').trim(); if (at && at !== t) alts.push(at); }
              if (alts.length) altPieces.push(alts.join(' / '));
            }
            render();
          };
          r.onerror = ev => {
            clearTimeout(watchdog);
            lastErr = ev.error || '';
            if (ev.error === 'no-speech' || ev.error === 'aborted') return;
            if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed' || ev.error === 'network' || ev.error === 'audio-capture') {
              manualStop = true; rec = null; typed = true;
              toast(ev.error === 'network' ? '음성 인식 서버에 연결하지 못했어. 글로 써 줘'
                  : ev.error === 'audio-capture' ? '마이크를 다른 곳에서 쓰고 있어. 앱을 다시 열거나 글로 써 줘 (audio-capture)'
                  : '마이크가 막혀 있어. 글로 써 줘 (' + ev.error + ')');
              input(prompt, onSubmit);
            } else toast('말하기 오류: ' + ev.error);
          };
          r.onend = () => {
            clearTimeout(watchdog);
            if (!manualStop && rec === r && restarts < 30) { restarts++; try { r.start(); return; } catch (e) {} }   // 안드로이드가 끊은 것 → 이어서 듣기(끝없이 되풀이하지 않게 30번까지)
            if (!manualStop && rec === r && !text.trim()) toast('말소리를 못 들었어. 마이크를 다시 눌러 줘' + (lastErr ? ' (' + lastErr + ')' : ''));
            if (rec === r) rec = null;
            $('#mic')?.classList.remove('on'); setBuddy('question');
            if (!text.trim() && !typed) live.textContent = '';
          };
          try { r.start(); A.buzz(BZ.micOn); } catch (e) { clearTimeout(watchdog); rec = null; typed = true; toast('마이크를 시작할 수 없어. 글로 써 줘'); input(prompt, onSubmit); }
        }
        function stopRec() { if (rec) { const r = rec; rec = null; try { r._stop && r._stop(); r.stop(); } catch (e) {} $('#mic')?.classList.remove('on'); A.buzz(BZ.micOff); } }
        if (typed) { ta.focus(); put0(ta); }
      }
      function put0(ta) { const r = document.createRange(); r.selectNodeContents(ta); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

      async function judge(t) {
        answers.push(t);
        $('#ans').innerHTML = `<div class="thinking"><span class="spin"></span> ${esc(line('thinking'))}</div>`; setBuddy('thinking');
        if (S.words) {
          const all = answers.join(' ').replace(/\s+/g, '');
          const hits = S.words.map(w => ({hit: all.includes(w.replace(/\s+/g, '')), evidence: ''})), h = hits.filter(x => x.hit).length;
          return (last = {hits, h, n: hits.length, miss: h >= S.need ? -1 : 0, misconception: '', ack: h ? h + '가지를 말했어!' : '좋아, 하나씩 떠올려 보자.'});
        }
        try { last = await E.grade({question: S.q, keys: S.keys, need: S.need, paths: S.paths, alt: altPieces.join(' | '), answer: t, prev: answers.length > 1 ? answers.slice(0, -1).join(' / ') : '', unitId: small.unitId}); }
        catch (e) { answers.pop(); setBuddy('retry'); say(esc(e.message), 'warn'); return null; }   // AI 실패 → 기록 없음, 다시 말하기
        return last;
      }
      // 답 받기 → 채점 → 다음 단계 (AI 가 실패하면 기록 없이 같은 자리에서 다시 말하기)
      const answerThen = (prompt, cb) => input(prompt, async t => { const g = await judge(t); if (!g) return answerThen('다시 말해 줄래?', cb); cb(g); });
      if (S.tap && S.tap.length && practice !== 'battle') tapRun();
      else { say(esc(line('question'))); answerThen('', step); }

      /* 👆 누르기 질문(마스터 10/16 5-2 5단원 「말하기 힘든 질문 = 누르기」) — 단계마다 그림에서 누르기 · 이름 카드 · 짧은 말.
         한 번 틀리면 「막히면」 힌트, 두 번 틀리면 답을 보여 주고 다음 단계로. 답을 본 단계가 있으면 내일 다시 묻기(간단한 설명과 같게),
         힌트만 봤으면 되묻기 뒤 통과(90), 모두 한 번에 맞히면 한 번에 통과(100). 누른 것은 기록(transcript)에 남는다. */
      function tapRun() {
        const steps = S.tap; let si = 0, shown = 0;
        const norm = x => String(x).replace(/\s+/g, '');
        const want = s => {
          const raw = s.ans.replace(/\([^)]*\)/g, '').trim(), ordered = raw.includes('→');
          let parts = raw.split(/\s*(?:→|·)\s*/).map(x => x.replace(/^(면|점|선분)\s*/, '').replace(/\s*\d+\s*개$/, '').trim()).filter(Boolean);
          if (s.mode === 'fig' && /^선분\s/.test(raw)) parts = [...parts.join('').replace(/\s/g, '')];   // 선분 ㅅㅂ → 두 끝점
          return {parts, ordered};
        };
        const fin = () => {
          last = {hits: S.keys.map(() => ({hit: !shown, evidence: ''})), h: shown ? 0 : S.keys.length, n: S.keys.length, miss: shown ? 0 : -1, misconception: '', ack: ''};
          if (!shown) return pass();
          stop(); setBuddy('hint');
          say(`<b>답을 함께 봤어.</b> 내일 비슷한 질문으로 다시 물어볼게.`, 'hint');
          $('#ans').innerHTML = `<div class="row"><button class="primary big" id="ok">알겠어</button></div>`;
          $('#ok').onclick = () => end({st: 'wait', help: 'short', stage: 'short', pass: false});
        };
        const next = () => { si++; si < steps.length ? one() : fin(); };
        const result = (ok, got, tries, s, w) => {
          answers.push(`${si + 1}단계 ${s.mode === 'say' ? '말' : '누름'}: ${got}${ok ? '' : ' ✗'}`);
          if (ok) { setBuddy('praise'); say(`<b>좋아!</b>`, 'ok'); return setTimeout(next, 650); }
          if (tries === 1) { reasks++; setBuddy('hint'); say(`<b>다시 생각해 봐.</b> ${fm(s.hint)}`, 'hint'); return one(2); }
          shown++; setBuddy('retry'); say(`<b>답은 이거야</b> — ${fm(s._show || s.ans)}`, 'warn');
          $('#ans').innerHTML = `<div class="row"><button class="primary" id="nx">다음</button></div>`; $('#nx').onclick = next;
        };
        function one(tries) {
          tries = tries || 1; ticking = true;
          const s = steps[si], w = want(s), dots = steps.map((_, k) => `<i class="${k < si ? 'd' : k === si ? 'c' : ''}"></i>`).join('');
          const head = `<div class="tapsteps">${dots}</div><div class="prompt">${fm(s.q)}</div>`;
          if (tries === 1) say('');
          if (s.mode === 'say') {
            return input(`${head}`, async t => {
              $('#ans').innerHTML = `<div class="thinking"><span class="spin"></span> ${esc(line('thinking'))}</div>`; setBuddy('thinking');
              let g = null;
              try { g = await E.grade({question: s.q, keys: [s.ans], answer: t, prev: '', alt: altPieces.join(' | '), unitId: small.unitId}); }
              catch (e) { setBuddy('retry'); say(esc(e.message), 'warn'); return one(tries); }
              result(!!(g && g.miss < 0), t, tries, s, w);
            });
          }
          if (s.mode === 'card') {
            const multi = w.parts.length > 1, pick = new Set();
            const key = x => [...norm(String(x).replace(/^(면|점|선분)\s*/, ''))].sort().join('');   // 면 이름은 글자 차례와 상관없이(면 ㄹㄷㅅㅇ = 면 ㄷㄹㅇㅅ)
            const cardOk = c => w.parts.some(p => key(c) === key(p));
            s._show = s.cards.filter(cardOk).join(' · ') || s.ans;
            $('#ans').innerHTML = `${head}<div class="tcards">${s.cards.map((c, k) => `<button class="tcard" data-k="${k}">${fm(c)}</button>`).join('')}</div>
              <div class="row"><button class="primary" id="tok" disabled>${multi ? '다 골랐어' : '골랐어'}</button></div>`;
            $('#ans').querySelectorAll('.tcard').forEach(b => b.onclick = () => {
              const k = +b.dataset.k;
              if (!multi) { pick.clear(); $('#ans').querySelectorAll('.tcard').forEach(x => x.classList.remove('on')); }
              pick.has(k) ? pick.delete(k) : pick.add(k); b.classList.toggle('on', pick.has(k)); $('#tok').disabled = !pick.size;
            });
            $('#tok').onclick = () => {
              ticking = false; const got = [...pick].map(k => s.cards[k]);
              const ok = got.length === w.parts.length && got.every(cardOk) && new Set(got.map(key)).size === got.length;
              result(ok, got.join(' · '), tries, s, w);
            };
            return;
          }
          // 그림에서 누르기 — 그림 속 이름 글자(가 · ㄱ · ㉠ …)에 손가락 자리를 겹친다
          const svg = root().querySelector('.qcard .figbox svg');
          if (!svg) { $('#ans').innerHTML = `${head}<p class="sub">그림이 없어서 이 단계는 건너뛸게.</p>`; return setTimeout(next, 900); }
          svg.querySelectorAll('.thit,.tord').forEach(x => x.remove());
          const NS = 'http://www.w3.org/2000/svg', picked = [];
          const labs = [...svg.querySelectorAll('text')].filter(tx => { const v = tx.textContent.trim(); return v && v.length <= 2 && !/\d|cm|°/.test(v); });
          const mark = () => {
            svg.querySelectorAll('.tord').forEach(x => x.remove());
            labs.forEach(tx => tx._hit.classList.toggle('on', picked.includes(tx)));
            if (w.ordered) picked.forEach((tx, k) => { const b = tx.getBBox(), o = document.createElementNS(NS, 'text'); o.setAttribute('class', 'tord'); o.setAttribute('x', b.x + b.width + 6); o.setAttribute('y', b.y + 2); o.textContent = k + 1; svg.appendChild(o); });
            $('#tok').disabled = !picked.length;
          };
          labs.forEach(tx => {
            const b = tx.getBBox(), c = document.createElementNS(NS, 'circle');
            c.setAttribute('class', 'thit'); c.setAttribute('cx', b.x + b.width / 2); c.setAttribute('cy', b.y + b.height / 2); c.setAttribute('r', Math.max(15, b.width * 0.9));
            tx.parentNode.insertBefore(c, tx); tx._hit = c;
            const tap = () => { const k = picked.indexOf(tx); if (k >= 0) picked.splice(k, 1); else picked.push(tx); mark(); };
            c.addEventListener('click', tap); tx.style.cursor = 'pointer'; tx.onclick = tap;
          });
          $('#ans').innerHTML = `${head}<div class="sub tapsub">그림에서 이름을 눌러 골라 줘${w.ordered ? ' (누른 차례대로 번호가 붙어)' : ''}. 다시 누르면 취소돼.</div>
            <div class="row"><button class="ghost small" id="tclr">다 지우기</button><button class="primary" id="tok" disabled>다 골랐어</button></div>`;
          $('#tclr').onclick = () => { picked.length = 0; mark(); };
          $('#tok').onclick = () => {
            ticking = false; const got = picked.map(tx => tx.textContent.trim());
            const uniq = [...new Set(got)], ok = w.ordered ? (got.length === w.parts.length && got.every((v, k) => norm(v) === norm(w.parts[k])))
              : (uniq.length === w.parts.length && w.parts.every(p => uniq.some(v => norm(v) === norm(p))));
            picked.length = 0; mark();
            result(ok, got.join(w.ordered ? ' → ' : ' · '), tries, s, w);
          };
        }
        say(esc(line('question')));
        one();
      }

      let feel = '';
      /* ⚔ 개념 대결: 되묻기 없이 한 번에 채점. 처음 보는 질문을 한 번에 통과하면 진짜 통과(100)로 기록, 아니면 연습으로만(잠그지 않음) */
      async function battleDone(g) {
        stop();
        const pass = !!(g && g.miss < 0), score = g ? (pass ? 100 : Math.round(100 * g.h / Math.max(1, g.n))) : 0, used = Math.round(limit - left);
        setBuddy(pass ? 'praise' : 'idle');
        let gain = 0, real = false;
        if (pass && E.state(task.id).k === 'new') {
          E.record(big.no, task.id, {st: 'pass', q: 100, help: '', helpNow: false}); real = true;
          gain = A.S.add(task.id, A.S.ptsFor(task.r, 100), 'one', task.r);
          A.N.post({task, small, r: task.r, q: 100, answers: answers.slice(), keys: S.keys, question: S.q, ans: S.ans});
        }
        await E.submit({big, small, task, question: S.q, transcript: answers.join('\n'), score, pass, stage: 'battle', help: 'none', quality: real ? 100 : null,
                        misconception: g?.misconception || '', ack: g?.ack || '', attempt: answers.length, reasks: 0, practice: !real});
        await E.save();
        NAV.quit = null;
        resolve({battle: true, pass, score, t: used, gain, real});
      }
      function step(g) {
        if (practice === 'battle') return battleDone(g);
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
        const free = practice === true, mp = E.maps(), none = !free && mp <= 0, any = H.kw || H.short || H.long;
        say(`${esc(g ? g.ack : '')}<br><b>살짝 부족해.</b> ${any ? (none ? '오늘 별지도를 다 썼어. 내일 다시 도전하자!' : '도움을 볼까?') : '내일 다시 도전하자!'}`, 'hint');
        const cost = free ? '' : ' · 🗺 1장';
        $('#ans').innerHTML = `${any && !free ? `<div class="mapct"><span class="tm" data-term="별지도">🗺 별지도</span> <b>${mp}장</b> 남음${none ? ' · 새벽 4시에 2장이 다시 생겨요' : ''}</div>` : ''}<div class="helps">
          ${H.kw && !kwShown ? `<button class="hbtn" data-h="kw" ${none ? 'disabled' : ''}><b>🔑 키워드</b><small>오늘 다시 답할 수 있어요${cost}</small></button>` : ''}
          ${H.short ? `<button class="hbtn" data-h="short" ${none ? 'disabled' : ''}><b>💬 간단한 설명</b><small>내일 다시 묻기로 확인해요${cost}</small></button>` : ''}
          ${H.long ? `<button class="hbtn" data-h="long" ${none ? 'disabled' : ''}><b>📖 자세한 설명 · 그림</b><small>내일 다시 묻기로 확인해요${cost}</small></button>` : ''}
          <button class="hbtn plain" data-h="none"><b>내일 다시 할게</b><small>내일 새벽 4시에 열려요</small></button></div>`;
        $('#ans').querySelectorAll('.hbtn').forEach(b => b.onclick = () => useHelp(b.dataset.h));
      }
      function useHelp(h) {
        if (h !== 'none' && practice !== true) {                     // 🗺 별지도 1장(연습은 점수가 없어 무료)
          if (!E.useMap()) { toast('오늘 별지도를 다 썼어. 내일 다시 도전하자!'); return helpMenu(null); }
          E.save(); toast(`🗺 별지도 1장을 썼어 (남은 별지도 ${E.maps()}장)`);
        }
        if (h === 'kw') {
          kwShown = true; helpNow = 'kw'; setBuddy('hint'); say(chips(S.help.kw), 'hint');
          return answerThen('키워드를 보고 다시 말해 줘.', g => (g.miss < 0 ? pass() : helpMenu(g)));
        }
        if (h === 'short' || h === 'long') {
          helpNow = h; setBuddy('hint');
          say(`<div class="expl">${fm(h === 'short' ? S.help.short : S.help.long)}</div>${h === 'long' && S.help.lfig ? `<div class="figbox">${S.help.lfig}</div>` : ''}`, 'expl');
          const cw = h === 'short' ? 's' : 'l', cnOk = ['q', 'lad'].includes(task.kind) && A.CN.expl(task)[cw];
          $('#ans').innerHTML = `<div class="prompt">설명을 잘 읽었으면, ${practice === true ? '다시 해 보자.' : '내일 비슷한 질문으로 다시 물어볼게.'}</div>${cnOk ? `<div class="row">${A.CN.btn(task.id, cw, 'secondary')}</div>` : ''}<div class="row"><button class="primary big" id="ok">알겠어</button></div>`;
          if (cnOk) A.CN.bind($('#ans'));   // 📒 학생이 고르면 이 설명이 개념 노트에 쏙(마스터 10/24)
          return $('#ok').onclick = () => end({st: 'wait', help: h, stage: h, pass: false});
        }
        end({st: 'lock', help: 'none', stage: 'lock', pass: false, needTeacher: true});
      }
      function timeout() {
        if (practice === 'battle') return battleDone(null);
        stop(); setBuddy('retry');
        if (practice !== true) { const o = sess(); o.done = true; sessSave(o); tickClock(); }   // 마스터 10/13: 질문 시간이 다 되면 오늘 공부는 여기서 끝(다른 질문도 닫힘)
        say('<b>시간이 다 됐어.</b> 오늘 공부는 여기까지야. 이 질문은 내일 다시 열려요.', 'warn');
        $('#ans').innerHTML = `<div class="row"><button class="primary big" id="ok">다음</button></div>`;
        $('#ok').onclick = () => end({st: 'lock', help: helpNow || 'none', stage: 'timeout', pass: false}, true);
      }
      function pass() {
        stop();
        const q = S.mode === 'practice' ? null : Math.min(S.base, helpNow === 'kw' ? E.Q.kw : reasks ? E.Q.reask : E.Q.first);
        setBuddy('praise'); A.buzz(BZ.pass);
        const keysHtml = S.keys.map((k, j) => `<li class="${last && last.hits[j]?.hit ? 'hit' : ''}">${last && last.hits[j]?.hit ? '✓' : '·'} ${fm(k)}</li>`).join('');
        say(`<b>${esc(line('praise'))}</b>`, 'ok');
        const rr = {st: 'pass', q, help: helpNow || (S.mode === 'again' || S.mode === 'nextday' ? (E.status(task.id)?.help || '') : ''), helpNow: !!helpNow, stage: helpNow === 'kw' ? 'kw' : reasks ? 'reask' : (S.mode === 'first' ? 'first' : S.mode), pass: true};
        /* ⭐ 별빛(마스터 10/13): 점수가 나오면 바로 별빛이 위쪽 숫자에 더해진다. 처음 통과 때만 · 연습은 0 */
        let gain = 0, why = '';
        if (practice === 'review') { why = 'rv'; gain = A.S.add(task.id + ':rv', A.S.REVIEW, why, task.r); }
        else if (!practice) { why = A.S.whyOf(rr.stage); gain = A.S.add(task.id, A.S.ptsFor(task.r, q), why, task.r); }
        const saving = commit(rr, true);                         // 결과가 보이는 순간 저장(이 화면에서 나가도 통과가 남는다)
        $('#ans').innerHTML = `<div class="result">${q != null ? `<div class="score">${q}<small>점</small></div>` : '<div class="score small">연습</div>'}${A.S.chip(gain, task.r, why)}
          <ul class="keys">${keysHtml}</ul><div class="model"><b>모범답 꼭! 확인</b>${fm(S.ans)}</div>
          ${['q', 'lad'].includes(task.kind) ? `<div class="row"><button class="ghost small" id="cnP">${A.CN.has(task.id) ? '✓ 개념 노트에 있어' : '📒 개념 노트에 담기'}</button></div>` : ''}
          <div class="row"><button class="primary big" id="ok">${i < n - 1 ? '다음 질문' : '끝내기'}</button></div></div>`;
        if (gain) A.S.gain(gain, $('#gainChip'));
        if ($('#cnP')) $('#cnP').onclick = () => saving.then(() => A.CN.pick(task, () => { const b = $('#cnP'); if (b) b.textContent = A.CN.has(task.id) ? '✓ 개념 노트에 있어' : '📒 개념 노트에 담기'; }));   // 통과를 저장한 뒤라 두 설명 모두 담을 수 있다
        if (!practice && q >= 90) A.N.post({task, small, r: task.r, q, answers: answers.slice(), keys: S.keys, question: S.q, ans: S.ans});   // ✦ 별빛노트 후보(AI 가 한 번 더 보고 올린다)
        $('#ok').onclick = async () => { $('#ok').disabled = true; const opened = await saving; NAV.quit = null; resolve({pass: true, opened}); };
      }
      async function end(r, already) { const opened = await commit(r, already); NAV.quit = null; resolve({pass: r.pass, opened, timedOut: r.stage === 'timeout'}); }
      async function commit(r, already) {
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
        return opened;
      }
    });
  }

  // ── 시작 ──
  A.start = async () => {
    try { if (await A.autoLogin()) return enter(); } catch (e) {}
    login(A.kicked ? KICK_MSG : '');
  };
})();
