/* =====================================================================
   숫자 친구들 (초등 캐릭터) — v92.0
   설정집: docs/character-design/CHARACTER_BIBLE.md (그림 원본도 거기)
   앱용 그림: characters/img/<id>/<상태>.webp  ← 작업도구/캐릭터/prepare.py 로 만든다

   격리: 기존 화면 코드는 고치지 않는다.
     · 화면이 바뀌는 것은 MutationObserver 로 보고 캐릭터만 끼워 넣는다.
     · 녹음 시작·글자 인식·채점 결과는 버튼 class · #liveTranscript · #fbArea 를 보고 안다.
   켜지는 조건: 학생이 초등(학년 글자가 '초'로 시작)일 때만. 중·고등·선생님 화면은 그대로(뚜삐).
   ⚠️ 채점 전에는 맞다·틀리다로 들리는 말을 하지 않는다(대전제: 거짓 피드백 금지).
      칭찬은 70점 통과 뒤에만, 문제 풀기는 전부 맞혔을 때만.
   ===================================================================== */
(function(){
  'use strict';
  const V = '92.0';
  const IMG = 'characters/img/';
  const STATES = ['question','listening','thinking','hint','solving','praise','retry','idle','base'];

  /* ---------- 다섯 친구 ---------- */
  const CHARS = {
    exi: { num:'0', name:'엑시', color:'#c58ad8', tint:'#f6e9fb', tempo:3.9,
      intro:'조용히 들어 주는 친구', story:'아무것도 없어 보여도 자릿값을 지키는 0',
      hello:['왔구나. 오늘도 네 말 들려줘.','천천히, 한 가지씩.'],
      question:['네 말로 들려줘.','한 가지씩 말해 줘.','천천히, 정확하게.'],
      listening:['응, 듣고 있어.','계속 말해 줘.'],
      thinking:['잠깐, 다시 읽어 볼게.','음… 살펴보는 중.'],
      hint:['여기에 단서가 있어.','이 부분만 다시 보자.'],
      solving:['하나씩 확인하자.','조용히 집중.'],
      praise:['정확해. 멋져.','응, 바로 그거야.'],
      retry:['괜찮아. 한 조각만 더.','다시 들려줘.'],
      quizGood:['전부 맞혔어. 정확해.'], quizMid:['틀린 것만 다시 보자.'] },
    pola: { num:'1', name:'폴라', color:'#f2737a', tint:'#fdeceb', tempo:3.0,
      intro:'첫걸음을 같이 떼는 친구', story:'모든 시작의 첫걸음, 1',
      hello:['좋아, 오늘도 출발!','첫걸음부터 같이 가자!'],
      question:['어디부터 말해 볼까?','첫걸음부터 같이 가자!','좋아, 출발해 볼까?'],
      listening:['응응, 듣고 있어!','계속 말해 줘!'],
      thinking:['길을 찾는 중이야…','잠깐만, 지도 보는 중!'],
      hint:['이쪽으로 가 볼까?','여기 길이 있어!'],
      solving:['같이 풀어 보자!','한 문제씩 가자!'],
      praise:['해냈다! 최고야!','멋진 출발이었어!'],
      retry:['좋아, 다시 출발!','한 걸음만 더 가 보자!'],
      quizGood:['전부 맞혔어! 완벽한 탐험!'], quizMid:['좋아, 다시 출발해 보자!'] },
    aresi:{ num:'2', name:'아레시', color:'#4fb3e6', tint:'#e6f5fc', tempo:3.4,
      intro:'뚜삐랑 단서를 찾는 친구', story:'둘이 짝이 되는 수, 2',
      hello:['뚜삐랑 기다리고 있었어!','오늘은 어떤 신호를 보내 줄래?'],
      question:['네 말에서 단서를 찾아볼게.','뚜삐랑 같이 들을게!','신호를 보내 줘!'],
      listening:['신호 받는 중!','뚜삐도 듣고 있어.'],
      thinking:['신호 해독 중…','뚜삐랑 맞춰 보는 중이야.'],
      hint:['이 신호부터 풀어 보자.','뚜삐가 여기를 보래!'],
      solving:['단서를 모아 보자!','뚜삐랑 같이 풀자!'],
      praise:['해독 성공! 멋져!','뚜삐도 박수 쳐!'],
      retry:['신호가 조금 약했어. 한 번 더!','뚜삐랑 다시 들어 볼게.'],
      quizGood:['전부 맞혔어! 해독 완료!'], quizMid:['틀린 신호만 다시 보자!'] },
    iris: { num:'7', name:'이리스', color:'#6f63e0', tint:'#ecebfc', tempo:3.6,
      intro:'함정을 찾아내는 친구', story:'준비한 사람이 찾는 행운, 7',
      hello:['준비됐지? 시작하자.','오늘 함정도 같이 찾자.'],
      question:['조건부터 차근차근.','준비됐지? 들어 볼게.','네 생각을 말해 봐.'],
      listening:['응, 계속 말해 봐.','듣고 있어.'],
      thinking:['함정이 있나 볼게.','조건을 확인하는 중.'],
      hint:['조건 하나가 숨어 있어.','여기를 다시 봐.'],
      solving:['함정 조심, 차근차근.','조건부터 보자.'],
      praise:['완벽해. 함정도 피했네.','역시, 준비한 만큼 보여.'],
      retry:['괜찮아. 조건을 다시 보자.','한 번 더, 침착하게.'],
      quizGood:['전부 맞혔어. 깔끔해.'], quizMid:['틀린 문제의 조건만 다시 보자.'] },
    lemma:{ num:'8', name:'렘마', color:'#5fc9a4', tint:'#e8f8f1', tempo:4.8,
      intro:'생각할 시간을 주는 친구', story:'옆으로 누우면 무한대가 되는 8',
      hello:['천천히 해도 돼.','오늘도 느긋하게, 같이.'],
      question:['천천히 해도 돼. 답은 도망가지 않아.','생각이 익으면 말해 줘.','편하게 말해 봐.'],
      listening:['응, 천천히.','계속 들을게.'],
      thinking:['음… 곰곰이 생각 중.','생각이 익는 중이야.'],
      hint:['여기부터 천천히 보자.','작은 단서 하나 줄게.'],
      solving:['천천히, 하나씩.','서두르지 말고.'],
      praise:['와, 해냈다!','역시 너답다!'],
      retry:['한 번 쉬어 보고 다시 보자.','괜찮아, 다시 천천히.'],
      quizGood:['전부 맞혔어! 느긋하게 해냈네.'], quizMid:['틀린 것만 천천히 다시.'] }
  };
  const ORDER = ['exi','pola','aresi','iris','lemma'];
  // 눈 감은 그림이 있는 표정 — 그 표정일 때만 깜빡인다
  const BLINK = {"exi": ["question", "listening", "thinking", "hint", "solving", "retry"], "pola": ["question", "listening", "thinking", "hint", "solving", "retry"], "aresi": ["question", "listening", "thinking", "hint", "solving", "retry"], "iris": ["question", "listening", "thinking", "hint", "solving", "retry"], "lemma": ["question", "listening", "thinking", "hint", "solving", "retry"]};   // ← 작업도구/캐릭터/prepare.py 가 고치는 줄
  const hasBlink = (id, st) => !!(BLINK[id] && BLINK[id].indexOf(st) >= 0);

  /* ---------- 켜기 조건·저장 ---------- */
  const sess = () => { try{ return session; }catch(e){ return null; } };
  const student = () => (sess() && sess().student) || null;
  const isElem = () => { const s = student(); return !!(s && /^초/.test(String(s.grade||''))); };
  const reduced = () => { try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };
  const key = () => 'dd:char:' + (student()?.id || '');
  let chosen = null, loadedFor = null;

  function myChar(){
    const s = student(); if(!s) return null;
    if(loadedFor !== s.id){ loadedFor = s.id; chosen = null;
      try{ chosen = localStorage.getItem(key()) || null; }catch(e){}
      // 다른 기기에서 고른 것 — 서버 공유 저장소(있으면)
      if(!chosen && typeof storageGet === 'function'){
        const sid = s.id;
        storageGet('char:' + sid).then(v => {
          if(student()?.id !== sid || chosen) return;
          if(v && CHARS[v.id]){ chosen = v.id; try{ localStorage.setItem(key(), v.id); }catch(e){} refreshAll(); }
        }).catch(()=>{});
      }
    }
    return CHARS[chosen] ? chosen : null;
  }
  function choose(id){
    if(!CHARS[id]) return;
    chosen = id; loadedFor = student()?.id || null;
    try{ localStorage.setItem(key(), id); }catch(e){}
    try{ if(typeof storageSet === 'function' && student()) storageSet('char:' + student().id, {id, at:new Date().toISOString()}); }catch(e){}
    preload(id);
    refreshAll();
  }
  const on = () => isElem() && !!myChar();
  const src = (id, st) => IMG + id + '/' + st + '.webp?v=' + V;
  function preload(id){ STATES.forEach(st => { const i = new Image(); i.src = src(id, st); }); }
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- 캐릭터 한 개 (무대) ---------- */
  // <div class="ddc"> 무대 > .ddc-move(상황 몸짓) > .ddc-breath(숨쉬기) > img 두 장(표정 바꿀 때 겹쳐 바꾸기)
  function makeStage(id, opt){
    opt = opt || {};
    const c = CHARS[id];
    const el = document.createElement('div');
    el.className = 'ddc ddc-' + id + (opt.size ? ' ddc-s-' + opt.size : '') + (opt.bubbleSide ? ' ddc-b-' + opt.bubbleSide : '');
    el.style.setProperty('--ddc-tempo', c.tempo + 's');
    el.style.setProperty('--ddc-color', c.color);
    el.style.setProperty('--ddc-tint', c.tint);
    el.dataset.ddc = id;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="ddc-bubble" hidden></div><div class="ddc-fx"></div>' +
      '<div class="ddc-shadow"></div><div class="ddc-move"><div class="ddc-pose"><div class="ddc-breath">' +
      '<img class="ddc-img on" alt="" draggable="false"><img class="ddc-img" alt="" draggable="false">' +
      '<img class="ddc-blink" alt="" draggable="false">' +
      '</div></div></div>';
    const st = opt.state || 'question';
    el.querySelector('.ddc-img.on').src = src(id, st);
    el._st = st;
    setBlink(el, st); blinkLoop(el);
    if(opt.line) say(el, opt.line, opt.lineMs);
    return el;
  }
  // 표정 바꾸기: 새 그림을 다 받은 뒤 겹쳐서 바꾼다(빈 칸 깜빡임 없게)
  function setFace(el, st){
    if(!el || el._st === st) return;
    el._st = st;
    const id = el.dataset.ddc, imgs = el.querySelectorAll('.ddc-img');
    const cur = el.querySelector('.ddc-img.on'), next = imgs[0] === cur ? imgs[1] : imgs[0];
    const go = () => { if(el._st !== st) return; next.classList.add('on'); cur.classList.remove('on'); };
    next.onload = go; next.src = src(id, st);
    if(next.complete && next.naturalWidth) go();
    setBlink(el, st);
  }
  // 깜빡임: 눈만 감은 그림을 아주 잠깐(0.13초) 위에 덮는다. 2.5~6초마다 아무 때나, 가끔 두 번.
  function setBlink(el, st){
    const b = el.querySelector('.ddc-blink'); if(!b) return;
    b.classList.remove('on');
    if(hasBlink(el.dataset.ddc, st)){ b.dataset.st = st; b.src = src(el.dataset.ddc, st + '-blink'); }
    else { b.dataset.st = ''; b.removeAttribute('src'); }
  }
  function blinkOnce(el){
    const b = el.querySelector('.ddc-blink');
    if(!b || b.dataset.st !== el._st || !b.complete || !b.naturalWidth) return;
    b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 130);
  }
  function blinkLoop(el){
    clearTimeout(el._blinkT);
    const tick = () => {
      if(!el.isConnected && el._seen) return;
      if(el.isConnected) el._seen = true;
      if(!reduced() && !document.hidden && hasBlink(el.dataset.ddc, el._st)){
        blinkOnce(el);
        if(Math.random() < 0.18) setTimeout(() => blinkOnce(el), 260);
      }
      el._blinkT = setTimeout(tick, 2500 + Math.random() * 3500);
    };
    el._blinkT = setTimeout(tick, 1200 + Math.random() * 2500);
  }
  // 몸짓 한 번(애니메이션 class 를 다시 붙여 처음부터 재생)
  function gesture(el, g){
    if(!el || reduced()) return;
    const m = el.querySelector('.ddc-move');
    m.classList.remove('g-pop','g-jump','g-nod','g-hop','g-droop','g-tilt','g-wave','g-bounce');
    void m.offsetWidth;
    m.classList.add('g-' + g);
  }
  // 계속하는 자세(기울이기·흔들기)
  function pose(el, p){
    if(!el) return;
    el.classList.remove('p-lean','p-sway','p-focus','p-low');
    if(p) el.classList.add('p-' + p);
  }
  function say(el, text, ms){
    if(!el) return;
    const b = el.querySelector('.ddc-bubble');
    clearTimeout(el._sayT);
    if(!text){ b.hidden = true; return; }
    b.textContent = text; b.hidden = false;
    b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
    if(ms) el._sayT = setTimeout(() => { b.hidden = true; }, ms);
  }
  function sparkle(el, n){
    if(!el || reduced()) return;
    const fx = el.querySelector('.ddc-fx'); fx.innerHTML = '';
    n = n || 9;
    for(let i = 0; i < n; i++){
      const s = document.createElement('i');
      const a = (Math.PI * 2 * i / n) + (Math.random() - .5) * .5, r = 70 + Math.random() * 40;
      s.style.setProperty('--dx', Math.round(Math.cos(a) * r) + 'px');
      s.style.setProperty('--dy', Math.round(Math.sin(a) * r * .8 - 20) + 'px');
      s.style.animationDelay = Math.round(Math.random() * 120) + 'ms';
      if(i % 3 === 0) s.className = 'dot';
      fx.appendChild(s);
    }
    setTimeout(() => { fx.innerHTML = ''; }, 1400);
  }
  // 상태 한 번에: 표정 + 몸짓 + 자세 + 말
  function act(el, st, opt){
    if(!el) return;
    opt = opt || {};
    const c = CHARS[el.dataset.ddc];
    setFace(el, st === 'hello' ? 'base' : st);
    const plan = {
      hello:    ['wave', null], question: ['pop', null], listening:['pop', 'lean'],
      thinking: ['pop', 'sway'], hint:     ['hop', null], solving:  ['pop', 'focus'],
      praise:   ['jump', null], retry:    ['droop','low'], idle:     ['pop', null], base: ['pop', null]
    }[st] || ['pop', null];
    pose(el, plan[1]);
    gesture(el, opt.gesture || plan[0]);
    if(st === 'praise') sparkle(el);
    const line = opt.line !== undefined ? opt.line : (c[opt.lines || st] ? pick(c[opt.lines || st]) : '');
    say(el, line, opt.lineMs === undefined ? 4200 : opt.lineMs);
  }

  /* ---------- 가만히 있을 때 리듬 (홈·고르기 화면만) ---------- */
  // 같은 박자 반복이면 기계 같다 → 5~10초 사이 아무 때나 작은 몸짓 하나.
  // 질문에 답하는 화면에서는 하지 않는다(생각할 때 방해되지 않게 — 숨쉬기만).
  function fidget(el){
    clearTimeout(el._fidT);
    const tick = () => {
      if(!el.isConnected) return;
      if(!document.hidden && el.classList.contains('ddc-idle-fidget')) gesture(el, pick(['hop','tilt','bounce','tilt']));
      el._fidT = setTimeout(tick, 5000 + Math.random() * 5000);
    };
    el._fidT = setTimeout(tick, 3000 + Math.random() * 3000);
  }

  /* ---------- 1) 친구 고르기 화면 ---------- */
  let pickerOpen = false;
  function openPicker(first){
    if(pickerOpen || !isElem()) return;
    pickerOpen = true;
    const cur = myChar();
    let sel = cur || null;
    const ov = document.createElement('div');
    ov.className = 'ddc-picker'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', '함께 공부할 친구 고르기');
    ov.innerHTML =
      '<div class="ddc-pk-sky" aria-hidden="true"></div>' +
      '<div class="ddc-pk-panel">' +
        '<div class="ddc-pk-head"><p>' + (first ? '처음 오셨네요!' : '친구 바꾸기') + '</p>' +
        '<h2>함께 공부할 숫자 친구를 골라요</h2></div>' +
        '<div class="ddc-pk-row">' + ORDER.map(id => {
          const c = CHARS[id];
          return '<button type="button" class="ddc-pk-card' + (id === sel ? ' sel' : '') + '" data-id="' + id + '" style="--ddc-color:' + c.color + ';--ddc-tint:' + c.tint + '" aria-pressed="' + (id === sel) + '">' +
            '<span class="ddc-pk-num">' + c.num + '</span>' +
            '<span class="ddc-pk-stage"></span>' +
            '<b>' + esc(c.name) + '</b><small>' + esc(c.intro) + '</small></button>';
        }).join('') + '</div>' +
        '<div class="ddc-pk-foot"><p class="ddc-pk-story" aria-live="polite"></p>' +
        '<div class="ddc-pk-btns">' + (first ? '' : '<button type="button" class="ddc-pk-cancel">닫기</button>') +
        '<button type="button" class="ddc-pk-ok" disabled>친구를 골라 주세요</button></div></div>' +
      '</div>';
    document.body.appendChild(ov);
    document.body.classList.add('ddc-lock');
    const stages = {};
    ov.querySelectorAll('.ddc-pk-card').forEach(card => {
      const id = card.dataset.id;
      const st = makeStage(id, {state:'base', size:'pk'});
      st.classList.add('ddc-idle-fidget');
      card.querySelector('.ddc-pk-stage').appendChild(st);
      stages[id] = st; fidget(st);
      card.addEventListener('click', () => {
        sel = id;
        ov.querySelectorAll('.ddc-pk-card').forEach(x => { const on = x.dataset.id === id; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
        Object.keys(stages).forEach(k => { if(k !== id){ act(stages[k], 'base', {line:''}); } });
        const c = CHARS[id], hi = pick(c.hello);
        act(stages[id], 'praise', {line: hi, lineMs: 0});
        ov.querySelector('.ddc-pk-story').innerHTML = '<b>' + c.num + ' · ' + esc(c.name) + '</b> — ' + esc(c.story) +
          '<span class="ddc-pk-say">“' + esc(hi) + '”</span>';
        const ok = ov.querySelector('.ddc-pk-ok');
        ok.disabled = false; ok.textContent = c.name + (/[가-힣]$/.test(c.name) && ((c.name.charCodeAt(c.name.length-1) - 0xAC00) % 28) ? '이랑' : '랑') + ' 같이 할래요!';
      });
    });
    const close = () => { pickerOpen = false; document.body.classList.remove('ddc-lock'); ov.remove(); };
    ov.querySelector('.ddc-pk-ok').addEventListener('click', () => { if(sel){ choose(sel); close(); } });
    const cancel = ov.querySelector('.ddc-pk-cancel');
    if(cancel) cancel.addEventListener('click', close);
    if(sel){ const c = ov.querySelector('.ddc-pk-card[data-id="' + sel + '"]'); if(c) c.click(); }
  }
  window.ddcOpenPicker = () => openPicker(false);

  /* ---------- 2) 학생 홈 ---------- */
  function decorateHome(){
    const main = document.getElementById('ddUiStudentMain');
    if(!main || main.hidden) return;
    const hello = main.querySelector('.dd-ui-hello');
    if(!hello) return;
    if(!isElem()) return;
    const id = myChar();
    if(!id){ if(!pickerOpen && !sessionStorage.getItem('ddc:asked:' + student().id)){ sessionStorage.setItem('ddc:asked:' + student().id, '1'); setTimeout(() => openPicker(true), 400); }
      return; }
    if(main.querySelector('.ddc-home')) return;
    // 자리: 공부 카드(이어서 공부하기) 오른쪽 위 — 없으면 인사 줄
    const slot = main.querySelector('.dd-ui-study-top .dd-ui-mascot') || hello.querySelector('.dd-ui-mascot');
    const box = document.createElement('div');
    box.className = 'ddc-home';
    const st = makeStage(id, {state:'base', size:'home', bubbleSide:'left'});
    st.classList.add('ddc-idle-fidget');
    box.appendChild(st);
    const chg = document.createElement('button');
    chg.type = 'button'; chg.className = 'ddc-change'; chg.textContent = CHARS[id].name + ' · 친구 바꾸기';
    chg.addEventListener('click', () => openPicker(false));
    box.appendChild(chg);
    if(slot) slot.replaceWith(box); else hello.appendChild(box);
    // 한 화면에 친구는 하나 — 남은 뚜삐 그림은 숨긴다
    main.querySelectorAll('.dd-ui-mascot').forEach(m => { m.style.display = 'none'; });
    setTimeout(() => act(st, 'hello', {lines:'hello', lineMs: 5000}), 350);
    fidget(st);
  }

  /* ---------- 3) 말로 설명하기 화면 ---------- */
  let buddy = null;          // 마이크 옆 친구
  function ensureBuddy(){
    const zone = document.querySelector('#questionCard .rec-zone');
    if(!zone) return null;
    const id = myChar();
    if(buddy && (buddy.dataset.ddc !== id || !buddy.isConnected)){ buddy.remove(); buddy = null; }
    if(!buddy){
      buddy = makeStage(id, {state:'question', size:'buddy', bubbleSide:'top'});
      buddy.classList.add('ddc-buddy');
      zone.classList.add('ddc-zone');
      zone.insertBefore(buddy, zone.firstChild);
    }
    return buddy;
  }
  function removeBuddy(){
    if(buddy){ buddy.remove(); buddy = null; }
    document.querySelectorAll('.ddc-zone').forEach(z => z.classList.remove('ddc-zone'));
  }
  function onQuestionShown(){
    if(!on()){ removeBuddy(); return; }
    const b = ensureBuddy(); if(!b) return;
    b.hidden = false;
    act(b, 'question', {lineMs: 6000});
  }

  // 녹음 켜짐/꺼짐 · 글자 인식 → 귀 기울이기 · 끄덕
  let lastTxt = '';
  function watchRecording(){
    const btn = document.getElementById('recBtn'), lt = document.getElementById('liveTranscript');
    if(btn) new MutationObserver(() => {
      if(!on() || !buddy) return;
      if(btn.classList.contains('recording')){ act(buddy, 'listening', {lineMs: 2600}); lastTxt = lt ? lt.textContent : ''; }
      else if(buddy._st === 'listening'){ setFace(buddy, 'question'); pose(buddy, null); gesture(buddy, 'pop'); say(buddy, ''); }
    }).observe(btn, {attributes:true, attributeFilter:['class']});
    if(lt) new MutationObserver(() => {
      if(!on() || !buddy || buddy._st !== 'listening') return;
      const t = lt.textContent;
      if(t && t !== lastTxt && !lt.classList.contains('empty')){ lastTxt = t; gesture(buddy, 'nod'); }
    }).observe(lt, {childList:true, characterData:true, subtree:true});
    // 글로 쓰기: 입력 중이면 가끔 끄덕
    const mt = document.getElementById('manualText');
    if(mt){ let t0 = 0; mt.addEventListener('input', () => {
      if(!on() || !buddy) return;
      if(buddy._st !== 'listening'){ setFace(buddy, 'listening'); pose(buddy, 'lean'); }
      const now = Date.now(); if(now - t0 > 1500){ t0 = now; gesture(buddy, 'nod'); }
    }); }
  }

  // 채점 중 · 결과
  function decorateFeedback(){
    const fb = document.getElementById('fbArea');
    if(!fb || !on()) return;
    const id = myChar();
    const loading = fb.querySelector('.loading-row');
    if(loading && !loading.querySelector('.ddc')){
      const svg = loading.querySelector('svg'); if(svg) svg.remove();
      loading.innerHTML = loading.innerHTML.replace('뚜삐가 설명을 듣고 있어요', CHARS[id].name + '가 설명을 읽고 있어요');
      loading.classList.add('ddc-loading');
      // 한 화면에 친구는 하나 — 마이크 옆 친구가 생각하는 자세로 바뀐다(여기엔 작은 그림을 더 두지 않는다)
      if(buddy && !buddy.hidden){ act(buddy, 'thinking', {lineMs: 0}); }
      else { const st = makeStage(id, {state:'thinking', size:'mini'}); pose(st, 'sway'); loading.insertBefore(st, loading.firstChild); }
      return;
    }
    const row = fb.querySelector('.fb-score-row');
    if(row && !row.querySelector('.ddc')){
      const pass = !!fb.querySelector('.pass-badge');
      const svg = row.querySelector('svg.dd-fb'); if(svg) svg.remove();
      const st = makeStage(id, {state: pass ? 'praise' : 'retry', size:'fb', bubbleSide:'top'});
      row.insertBefore(st, row.firstChild);
      row.classList.add('ddc-row');
      if(buddy) buddy.hidden = true;   // 한 화면에 친구는 하나 — 결과 쪽으로 옮겨 간다
      setTimeout(() => {
        if(pass){ act(st, 'praise', {lineMs: 0}); }
        else {
          act(st, 'retry', {lineMs: 1800});
          // 아쉬움은 짧게 → 곧 힌트 쪽을 가리키며 다시 도전 (설정집 4절 7번)
          const hasHint = !!fb.querySelector('.fb-block.hint, .fb-block.retry');
          setTimeout(() => { if(st.isConnected) act(st, hasHint ? 'hint' : 'question', {lines: hasHint ? 'hint' : 'retry', lineMs: 0}); }, 1900);
        }
      }, 60);
    }
  }
  // 다시 설명하기 → 친구가 질문 자리로 돌아온다
  document.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('#retryBtn');
    if(t && buddy && on()){ setTimeout(() => { if(buddy){ buddy.hidden = false; act(buddy, 'question', {lines:'retry', lineMs: 4000}); } }, 50); }
  }, true);

  /* ---------- 4) 문제 풀기 ---------- */
  let qbuddy = null;
  function decorateQuiz(){
    const card = document.getElementById('quizCard'), area = document.getElementById('quizArea');
    if(!card || !area) return;
    if(!on()){ if(qbuddy){ qbuddy.remove(); qbuddy = null; } return; }
    const id = myChar();
    const loading = area.querySelector('.loading-row');
    if(loading && !loading.querySelector('.ddc')){
      const svg = loading.querySelector('svg'); if(svg) svg.remove();
      loading.innerHTML = loading.innerHTML.replace(/뚜삐가/g, CHARS[id].name + '가');
      const st = makeStage(id, {state:'thinking', size:'mini'}); pose(st, 'sway');
      loading.insertBefore(st, loading.firstChild); loading.classList.add('ddc-loading');
    }
    const hasQ = !!area.querySelector('.quiz-q');
    if(hasQ){
      if(!qbuddy || !qbuddy.isConnected || qbuddy.dataset.ddc !== id){
        if(qbuddy) qbuddy.remove();
        qbuddy = makeStage(id, {state:'solving', size:'quiz', bubbleSide:'left'});
        qbuddy.classList.add('ddc-quizbuddy');
        card.classList.add('ddc-quizcard');
        card.insertBefore(qbuddy, card.firstChild);   // 카드 오른쪽 위에 떠 있게(CSS) — 문제 자리를 밀어내지 않는다
        act(qbuddy, 'solving', {lineMs: 5000});
      }
      const res = area.querySelector('#quizResultWrap .quiz-result');
      if(res && !res._ddc){
        res._ddc = true;
        const good = res.classList.contains('good');
        // 결과는 아래쪽에 뜬다 → 결과 옆에 친구를 하나 더 두지 않고, 위 친구가 반응 + 결과 줄에 작은 얼굴
        const mini = makeStage(id, {state: good ? 'praise' : 'retry', size:'mini'});
        res.classList.add('ddc-res'); res.insertBefore(mini, res.firstChild);
        if(good){ act(mini, 'praise', {line:''}); act(qbuddy, 'praise', {lines:'quizGood', lineMs: 0}); }
        else { act(mini, 'retry', {line:''}); act(qbuddy, 'retry', {lines:'quizMid', lineMs: 0}); }
      }
    } else if(qbuddy && !loading){ qbuddy.remove(); qbuddy = null; }
  }

  /* ---------- 전부 다시 맞추기 ---------- */
  function refreshAll(){
    // 홈: 이미 붙은 것을 지우고 다시
    document.querySelectorAll('.ddc-home').forEach(h => h.remove());
    if(!on()){ removeBuddy(); document.querySelectorAll('#ddUiStudentMain .dd-ui-mascot').forEach(m => m.style.display = ''); return; }
    decorateHome();
    const qc = document.getElementById('questionCard');
    if(qc && qc.style.display !== 'none' && buddy){ buddy.remove(); buddy = null; onQuestionShown(); }
  }

  /* ---------- 연결 ---------- */
  function wrap(name, after){
    const orig = window[name];
    if(typeof orig !== 'function') return false;
    window[name] = function(){
      const out = orig.apply(this, arguments);
      try{ after.apply(this, arguments); }catch(e){ console.warn('[ddc]', name, e); }
      return out;
    };
    return true;
  }
  function boot(){
    // 질문이 화면에 뜰 때 (app-ui.js 가 감싼 것을 다시 감싼다)
    try{
      const orig = renderCurrentQuestion;
      renderCurrentQuestion = function(){ const out = orig.apply(this, arguments); try{ onQuestionShown(); }catch(e){ console.warn('[ddc]', e); } return out; };
    }catch(e){ console.warn('[ddc] renderCurrentQuestion 연결 실패', e); }
    try{
      const origR = resetRecordingUI;
      resetRecordingUI = function(){ const out = origR.apply(this, arguments); try{ if(buddy && on()){ buddy.hidden = false; if(buddy._st !== 'question') act(buddy, 'question', {line:''}); } }catch(e){} return out; };
    }catch(e){}
    try{
      const origL = doLogout;
      doLogout = function(){ removeBuddy(); document.querySelectorAll('.ddc-picker').forEach(p => p.remove()); pickerOpen = false; document.body.classList.remove('ddc-lock'); chosen = null; loadedFor = null; return origL.apply(this, arguments); };
    }catch(e){}
    const main = document.getElementById('ddUiStudentMain');
    if(main) new MutationObserver(() => { try{ decorateHome(); }catch(e){ console.warn('[ddc]', e); } }).observe(main, {childList:true});
    const fb = document.getElementById('fbArea');
    if(fb) new MutationObserver(() => { try{ decorateFeedback(); }catch(e){ console.warn('[ddc]', e); } }).observe(fb, {childList:true});
    const qa = document.getElementById('quizArea');
    if(qa) new MutationObserver(() => { try{ decorateQuiz(); }catch(e){ console.warn('[ddc]', e); } }).observe(qa, {childList:true, subtree:true});
    watchRecording();
    decorateHome();
  }
  window.DDC = { CHARS, ORDER, myChar, choose, openPicker: () => openPicker(false), makeStage, act, setFace, gesture, say, refreshAll, version: V };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
