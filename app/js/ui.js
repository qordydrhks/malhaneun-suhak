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
    root().innerHTML = `<header class="bar">${opt.back ? `<button class="ghost" data-go="${opt.back}">‹ ${esc(opt.backText || '뒤로')}</button>` : `<span class="logo">말하는 수학</span>`}
      <span class="crumb">${esc(opt.crumb || '')}</span>
      <span class="who">${s ? `<button class="ghost small" data-go="logout">${esc(s.name)} · 나가기</button>` : ''}</span></header><main class="${opt.cls || ''}">${inner}</main>`;
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-go]'); if (!b) return;
    const g = b.dataset.go;
    if (g === 'home') home(); else if (g === 'logout') { A.logout(); login(); }
    else if (g.startsWith('big:')) star(+g.slice(4)); else if (g.startsWith('small:')) planet(g.slice(6), +b.dataset.r); else if (g.startsWith('bh:')) blackhole(+g.slice(3), +b.dataset.r); else if (g === 'record') record(); else if (g === 'guide') guide();
  });
  const toast = (t) => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.classList.add('on'), 20); setTimeout(() => { d.classList.remove('on'); setTimeout(() => d.remove(), 400); }, 2600); };

  // ── 1. 로그인 ──
  function login(msg) { A.intro(enter, msg); }
  async function enter() {
    root().innerHTML = '<div class="loading">불러오는 중…</div>';
    await E.load();
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
    const tiers = E.TIERS.map(t => `<li><span>${t[2]}</span><b>${t[0]}</b><small>${t[1]}</small></li>`).join('');
    frame(`<section class="guide">
      <h2>우주 안내서</h2>
      <details open><summary>우리는 무엇을 하나요?</summary><p>퉁구리가 삼킨 별빛을 되찾는 탐험이에요. 행성마다 질문이 있고, 네 말로 설명하면 행성에 불이 켜져요. 별의 행성을 다 밝히면 블랙홀 관문이 열려요.</p><button class="ghost small" id="gStory">이야기 다시 보기 ›</button></details>
      <details><summary>행성 탐사 · 별계 탐사 · 은하 탐사</summary><p>같은 별을 세 번 탐험해요. <b>행성 탐사</b>는 기본 뜻과 방법, <b>별계 탐사</b>는 조금 더 깊게, <b>은하 탐사</b>는 여러 개념을 이어서 생각하는 탐험이에요. 앞 탐사를 마치면 다음 탐사가 열려요.</p></details>
      <details><summary>등급 이름은 왜 이렇게 생겼나요?</summary><p>이해가 커질수록 더 큰 세상으로 가요.</p><ul class="g-tiers">${tiers}</ul><p>스스로 한 번에 답하면 빛이 더 크게 모여요. 힌트를 봐도 안 한 것보다 훨씬 나아요. 깊은 탐사까지 가야 높은 등급이 열려요.</p></details>
      <details><summary>막히면 어떻게 하나요?</summary><p>친구가 먼저 생각할 방향을 알려 줘요. 그래도 어려우면 <b>도움</b>을 열어 키워드나 설명을 볼 수 있어요. 설명을 본 질문은 다음 날 다시 도전해요.</p></details>
      <details><summary>mission 은 뭐예요?</summary><p>행성의 질문을 다 하면 <b>mission</b>(문제 풀기)이 열려요. 더 어려운 <b>hard mission</b>은 하고 싶은 친구만 도전해요. 틀려도 깎이지 않아요.</p></details>
      <details><summary>다시 빛내기는 뭐예요?</summary><p>도움을 받아 통과했던 질문은 일주일 뒤에 다시 물어봐요. 이번에 스스로 답하면 별빛이 다시 환해져요.</p></details>
      <details><summary>내 친구는 누구예요?</summary><p>숫자 탐험대 다섯 친구 중 네가 고른 친구가 함께 다녀요.</p><button class="ghost small" id="gPick">친구 바꾸기 ›</button></details>
    </section>`, {back: 'home', backText: '은하', crumb: '우주 안내서'});
    document.getElementById('gStory').onclick = () => story(guide);
    document.getElementById('gPick').onclick = () => pick();
  }

  // ── 3. 은하(홈) ──
  const HUES = ['#f3c969', '#7aa7ff', '#f29b8f', '#8fd6b4', '#c9a6ff', '#ffb36b'];
  function home() {
    const nx = E.nextPlace();
    const rk = E.rank();
    frame(`<div class="homebar"><button class="guidebtn" data-go="guide" aria-label="우주 안내서">📖 안내서</button><button class="rankbtn" data-go="record"><span>${rk.icon}</span><b>${rk.name}</b><small>행성 ${rk.lit}/${rk.total} · 나의 기록 ›</small></button></div>
      <section class="hero stage">${buddy('idle')}<div class="bubble">${esc(line('hello'))}</div></section>
      ${nx ? (nx.why === 'bh'
               ? `<button class="primary big go" data-go="bh:${nx.big.no}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${nx.big.code} · 블랙홀 관문 · ${E.ROUND[nx.r]}</small></button>`
               : `<button class="primary big go" data-go="small:${nx.small.code}" data-r="${nx.r}"><span>오늘 갈 곳</span><small>${nx.small.code} · ${esc(nx.small.title)} · ${E.ROUND[nx.r]}${nx.why === 'again' ? ' · 다시 열린 질문' : nx.why === 'mission' ? ' · ' + A.M.name(nx.r) : nx.why === 'review' ? ' · 다시 빛내기' : ''}</small></button>`)
             : `<div class="done-all">지금 열린 곳은 모두 탐험했어요 ✦</div>`}
      <h3 class="sect">E4-2 은하</h3><div class="mapbox">${A.galaxyMap()}</div>`, {crumb: 'E4-2 은하'});
  }

  // ── 4. 별(대단원) ──
  const PLANET = ['#e8b04b', '#5b8def', '#e07a6a', '#55b892', '#a07ce0', '#e98b3f', '#4cb3c4', '#c46aa0'];
  function star(no, r) {
    const b = E.big(no), open = E.openRound(no);
    r = r || open;
    const tabs = [1, 2, 3].map(k => `<button class="tab ${k === r ? 'on' : ''}" ${k > open ? 'disabled' : ''} data-r="${k}">${k > open ? '🔒 ' : ''}${E.ROUND[k]}</button>`).join('');
    const c = E.bigCount(b, r);
    frame(`<h2 class="ttl"><span class="code">${b.code}</span>${esc(b.title)}</h2><div class="tabs">${tabs}</div>
      <div class="mapbox">${A.starMap(b, r)}</div>
      <p class="sub center">${E.ROUND[r]} — 불 켠 행성 ${b.smalls.filter(s => { const k = E.count(s, r); return k.n && k.done === k.n; }).length}/${b.smalls.length}${r < open ? ' · 지난 탐사는 연습(점수·등급 그대로)' : ''}</p>`, {back: 'home', backText: '은하', crumb: b.code});
    root().querySelectorAll('.tab').forEach(t => t.onclick = () => star(no, +t.dataset.r));
    const bh = document.getElementById('bhBtn');
    if (bh) bh.onclick = () => (A.bhOpen(b, r) ? blackhole(no, r) : toast(E.ROUND[r] + '의 행성을 모두 밝히면 열려요'));
  }

  // ── 5. 행성 입구 ──
  function planet(code, r) {
    const {big, small} = E.small(code), t = E.tasks(small, r);
    const todo = t.filter(x => ['new', 'next'].includes(E.state(x.id).k));
    const locked = t.filter(x => E.state(x.id).k === 'today').length;
    const rv = E.reviewList(small, r);
    const practice = !todo.length && !locked;
    const min = Math.round(E.LIMIT[r] / 60);
    frame(`<section class="entry stage"><div class="orb big" style="--p:${PLANET[big.smalls.indexOf(small) % 8]}"></div>
      <div class="code">${small.code}</div><h2>${esc(small.title)}</h2><div class="chip">${E.ROUND[r]}</div>
      <p class="sub">${todo.length ? `질문 ${todo.length}개 · 하나에 약 ${min}분` : (locked ? `남은 질문 ${locked}개는 내일 다시 열려요` : '다 탐험했어요')}</p>
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
  const sessionStart = () => { let t = +sessionStorage.getItem('app:sessionStart'); if (!t) { t = Date.now(); sessionStorage.setItem('app:sessionStart', t); } return t; };
  async function run(big, small, r, list, practice) {
    if (!A.isAcademyDevice()) return blocked();
    sessionStart();
    let opened = 0, passed = 0;
    for (let i = 0; i < list.length; i++) {
      if (!practice && E.tasks(small, r).filter(x => E.state(x.id).k !== 'done').length <= 2) A.M.prefetch(small, r);
      const out = await ask(big, small, list[i], i, list.length, practice);
      if (out === 'quit') return planet(small.code, r);
      if (out && out.pass) passed++;
      if (out && out.opened) opened = out.opened;
      if ((Date.now() - sessionStart()) / 60000 >= E.SESSION_MIN && i < list.length - 1) return sessionEnd(passed);
    }
    finish(big, small, r, passed, list.length, opened, practice);
  }
  function blocked() {
    frame(`<section class="center-msg stage">${buddy('retry')}<h2>학원 태블릿에서만 공부할 수 있어요</h2><p class="sub">선생님이 이 기기를 학원 기기로 등록하면 열려요.<br>(옛 앱 → 선생님 → AI 연결 → 학원 기기 등록)</p><button class="secondary" data-go="home">은하로</button></section>`);
  }
  function sessionEnd(passed) {
    sessionStorage.removeItem('app:sessionStart');
    frame(`<section class="center-msg stage">${buddy('praise')}<h2>오늘은 여기까지!</h2><p class="sub">${E.SESSION_MIN}분 동안 질문 ${passed}개에 불을 켰어요.</p><button class="primary big" data-go="home">은하로 돌아가기</button></section>`);
  }
  function finish(big, small, r, passed, n, opened, practice) {
    frame(`<section class="center-msg stage">${buddy(passed ? 'praise' : 'idle')}<h2>${practice ? '연습 끝!' : (passed === n ? '행성에 불이 켜졌어!' : '탐사 끝!')}</h2>
      <p class="sub">${small.code} · ${E.ROUND[r]} — 통과 ${passed}/${n}${passed < n && !practice ? ' · 남은 질문은 내일 다시 열려요' : ''}</p>
      ${opened ? `<div class="unlock">✦ ${big.code}의 ${E.ROUND[opened]}가 열렸어요!</div>` : ''}
      ${!practice && A.M.ready(small, r) && !A.M.done(small, r) ? missionBtns(small, r) : `<button class="primary big" data-go="big:${big.no}">${big.code}로</button>`}
      <button class="ghost" data-go="home">은하로</button></section>`);
    bindMission(big, small, r);
  }

  // ── 블랙홀 관문 (퉁구리 은신처) ──
  async function blackhole(no, r) {
    if (!A.isAcademyDevice()) return blocked();
    const big = E.big(no), id = A.bhTaskId(big, r), done = A.bhDone(big, r), st = E.state(id);
    if (!A.bhOpen(big, r)) return star(no, r);
    if (st.k === 'today') return frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>블랙홀이 닫혔어</h2><p class="sub">내일 새벽 4시에 다시 열려요.</p><button class="primary big" data-go="big:${no}">${big.code}로</button></section>`);
    frame(`<section class="center-msg stage bhin"><div class="bhole"></div><img class="mload peek" src="img/tunguri.webp" alt="">
      <h2>${big.code} 블랙홀 관문</h2><p class="sub">퉁구리가 이 안에 별빛을 숨겼어!<br>${E.ROUND[r]}에서 배운 것을 말하면 블랙홀을 통과할 수 있어.</p>
      <button class="primary big" id="bgo">${done ? '다시 들어가기 (연습)' : '들어가기'}</button><button class="ghost" data-go="big:${no}">${big.code}로</button></section>`, {back: 'big:' + no, backText: big.code, crumb: big.code + ' · 블랙홀'});
    $('#bgo').onclick = async () => {
      const pseudo = {code: big.code + ' 블랙홀', title: '블랙홀 관문', unitId: '', unitLabel: '🕳 블랙홀 · ' + big.title, key: ''};
      const out = await ask(big, pseudo, {kind: 'bh', id, r, src: big.bh[r]}, 0, 1, done);
      if (out === 'quit') return star(no, r);
      if (out && out.pass && !done) {
        frame(`<section class="center-msg stage"><div class="chest">✦</div><h2>별빛 상자를 찾았어!</h2>
          <p class="sub">퉁구리가 숨겨 둔 별빛을 되찾았어. 퉁구리는 깜짝 놀라 다음 별로 도망갔어!</p>
          <img class="mload flee" src="img/tunguri.webp" alt=""><button class="primary big" data-go="home">은하로</button></section>`);
      } else star(no, r);
    };
  }

  // ── 나의 기록 ──
  function record(which) {
    const rk = E.rank(), bk = E.book();
    const LBL = {one: ['한 번에', 'one pass'], h1: ['되묻기 뒤', 'hint 1'], h2: ['도움 뒤', 'hint 2'], yet: ['아직', '다시 하면 빛나요']};
    const nameOf = it => it.t.kind === 'bh' ? it.b.code + ' 블랙홀 · ' + E.ROUND[it.r] : it.s.code + ' · ' + E.ROUND[it.r];
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
  async function mission(big, small, r, hard) {
    if (!A.isAcademyDevice()) return blocked();
    const name = A.M.name(r, hard);
    frame(`<section class="center-msg stage"><img class="mload" src="img/tunguri.webp" alt=""><h2>${esc(name)}</h2><p class="sub"><span class="spin"></span> 퉁구리가 숨겨 둔 문제를 찾는 중…</p></section>`, {crumb: small.code + ' · ' + name});
    let quiz;
    try { quiz = await A.M.get(small, r, hard); }
    catch (e) {
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
        <section class="qcard mq"><div class="q">${fm(it.stem)}</div>
        <div class="chs">${it.choices.map((c, j) => `<button class="ch" data-j="${j}"><span>${'①②③④'[j]}</span>${fm(c)}</button>`).join('')}</div>
        <div class="say" id="say"></div></section><div class="row" id="nx"></div>`, {back: 'big:' + big.no, backText: '그만하기', crumb: small.code});
      root().querySelectorAll('.ch').forEach(b => b.onclick = () => {
        const j = +b.dataset.j, right = j === it.answer; if (right) ok++;
        root().querySelectorAll('.ch').forEach(x => { x.disabled = true; if (+x.dataset.j === it.answer) x.classList.add('right'); });
        if (!right) b.classList.add('wrong');
        $('#say').innerHTML = `<div class="sbubble ${right ? 'ok' : 'warn'}"><b>${right ? '정답!' : '아쉬워!'}</b> ${fm(it.explain)}</div>`;
        $('#nx').innerHTML = `<button class="primary big" id="nb">${k < quiz.length - 1 ? '다음 문제' : '결과 보기'}</button>`;
        $('#nb').onclick = () => { k++; k < quiz.length ? one() : done(); };
      });
    };
    const done = async () => {
      const saved = first ? await A.M.save(big, small, r, hard, ok, quiz.length) : false;
      const all = ok === quiz.length;
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
      if (mode === 'review') return {mode, q: ag.q, keys: ag.keys, ans: ag.ans, fig: ag.fig || '', asks: (ag.keys.length === h.ask.length ? h.ask : []), help: h, base: E.Q.review};
      if (mode === 'again') return {mode, q: ag.q, keys: ag.keys, ans: ag.ans, fig: ag.fig || '', asks: (ag.keys.length === h.ask.length ? h.ask : []), help: h, base: E.Q[st.help]};
      return {mode, q: x.q, keys: x.keys, ans: x.ans, fig: x.fig, asks: h.ask, help: h, base: mode === 'nextday' ? E.Q.nextday : E.Q.first, pre: x.pre};
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

  function ask(big, small, task, i, n, practice) {
    return new Promise(resolve => {
      const S = shape(task, practice);
      const limit = E.LIMIT[task.r] + (task.src.calc && task.r < 3 ? 60 : 0);
      let answers = [], reasks = 0, used = new Set(), helpNow = '', kwShown = false, last = null, left = limit, ticking = false, done = false;
      let tim = null;
      const dots = Array.from({length: n}, (_, k) => `<i class="${k < i ? 'd' : k === i ? 'c' : ''}"></i>`).join('');
      frame(`<div class="qtop"><div class="dots">${dots}</div><div class="timer"><b></b></div></div>
        <section class="stage qstage">${buddy('question', 'mini')}<div class="qcard">
          ${S.pre ? `<div class="pre">🌱 ${esc(S.pre)}에서 배운 것</div>` : ''}${S.mode === 'again' ? '<div class="pre">어제 본 설명으로 다시 묻기</div>' : ''}
          <div class="q" id="qt">${fm(S.q)}</div>${S.fig ? `<div class="figbox">${S.fig}</div>` : ''}<div class="say" id="say"></div></div></section>
        <section class="answer" id="ans"></section>`, {back: 'quit', backText: '그만하기', crumb: small.code + ' · ' + E.ROUND[task.r]});
      root().querySelector('[data-go="quit"]').onclick = (e) => { e.stopPropagation(); stop(); resolve('quit'); };
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
          <div class="tr" id="tr" ${typed ? '' : 'hidden'}><textarea id="ta" rows="3" placeholder="여기에 써도 돼"></textarea></div>
          <div class="live" id="live"></div>
          <div class="row"><button class="mic" id="mic" aria-label="말하기"><span></span></button></div>
          <div class="row"><button class="ghost small" id="tw">${typed ? '말로 하기' : '글로 쓰기'}</button><button class="ghost small" id="clr">지우고 다시</button><button class="primary" id="sub" disabled>다 말했어</button></div>`;
        let text = '';
        const ta = $('#ta'), live = $('#live'), sub = $('#sub');
        const upd = t => { text = t; live.textContent = typed ? '' : t; if (typed && ta.value !== t) ta.value = t; sub.disabled = !text.trim(); };
        ta.oninput = () => upd(ta.value);
        $('#tw').onclick = () => { typed = !typed; stopRec(); input(prompt, onSubmit); };
        $('#clr').onclick = () => { stopRec(); upd(''); ta.value = ''; };
        $('#mic').onclick = () => (rec ? stopRec() : startRec());
        sub.onclick = () => { stopRec(); const t = (typed ? ta.value : text).trim(); if (!t) return; ticking = false; onSubmit(t); };
        function startRec() {
          const R = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!R) { typed = true; return input(prompt, onSubmit); }
          let base = text ? text + ' ' : '';
          rec = new R(); rec.lang = 'ko-KR'; rec.interimResults = true; rec.continuous = true;
          rec.onresult = ev => { let fin = '', inter = ''; for (let k = ev.resultIndex; k < ev.results.length; k++) { const t = ev.results[k][0].transcript; if (ev.results[k].isFinal) fin += t; else inter += t; } if (fin) base += fin; upd((base + inter).trim()); };
          rec.onerror = ev => { if (ev.error === 'not-allowed' || ++recFails >= 2) { typed = true; toast('글로 써도 괜찮아'); input(prompt, onSubmit); } };
          rec.onend = () => { rec = null; $('#mic')?.classList.remove('on'); setBuddy('question'); };
          try { rec.start(); $('#mic').classList.add('on'); setBuddy('listening'); } catch (e) { rec = null; }
        }
        function stopRec() { if (rec) { try { rec.stop(); } catch (e) {} rec = null; $('#mic')?.classList.remove('on'); } }
        if (typed) ta.focus();
      }

      async function judge(t) {
        answers.push(t);
        $('#ans').innerHTML = `<div class="thinking"><span class="spin"></span> ${esc(line('thinking'))}</div>`; setBuddy('thinking');
        if (S.words) {
          const all = answers.join(' ').replace(/\s+/g, '');
          const hits = S.words.map(w => ({hit: all.includes(w.replace(/\s+/g, '')), evidence: ''})), h = hits.filter(x => x.hit).length;
          return (last = {hits, h, n: hits.length, miss: h >= S.need ? -1 : 0, misconception: '', ack: h ? '낱말 ' + h + '개를 말했어!' : '좋아, 하나씩 떠올려 보자.'});
        }
        try { last = await E.grade({question: S.q, keys: S.keys, answer: t, prev: answers.length > 1 ? answers.slice(0, -1).join(' / ') : '', unitId: small.unitId}); }
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
        if (S.asks[g.miss] && !used.has(g.miss)) {                 // 빠진 핵심마다 되묻기 1번(방향만)
          used.add(g.miss); reasks++; setBuddy('hint');
          say(`${esc(g.ack)}<br>${fm(S.asks[g.miss])}`, 'hint');
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
        setBuddy('praise');
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
