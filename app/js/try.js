/* 중등·고등 체험판 (마스터 10/16 「직접 조작해 봐야 느낌이 온다」) — try.html
   목적: 「말은 생각만, 식은 손으로」(식 누르기 · 식 조각 카드 · 짧은 말)와 고등 「지점 지도」 대화형을 실제로 해 보기.
   · 기록은 진도·별빛에 넣지 않는다(체험 전용). 마지막에 어른에게 보일 기록 모양만 보여 준다.
   · AI 채점은 학원 태블릿에서만(또는 선생님 PIN). 누르기·카드·짧은 말(낱말 맞춤)은 AI 없이도 된다.
   · 견본 원천: 작업도구/질문설계/m31_03.py(중3-1 03) · h_calc1_maxmin.py(고등 미적분Ⅰ) */
(() => {
  'use strict';
  const A = window.APP, esc = A.esc, fm = A.fm;
  /* 중3 견본의 A(치환한 문자)는 늘 기울임 — 표시기는 (A−2)처럼 괄호 안 홑 대문자를 점 이름으로 세운다. 고등 견본의 A는 점이라 그대로 */
  let VARA = false;
  const F = t => fm(VARA ? String(t ?? '').replace(/(?<![A-Za-z])A(?![A-Za-z])/g, '𝐴')
                         : String(t ?? '').replace(/(?<![A-Za-z])t(?![A-Za-z])/g, '𝑡').replace(/(?<![A-Za-z])f(?=[′(])/g, '𝑓'));   // 고등: 변수 t·함수 f 는 기울임
  /* 질문 문장 안의 식도 교재 글씨체로 — 태그(<b> 등)는 그대로 두고 글자 부분만 */
  const FH = h => String(h ?? '').split(/(<[^>]+>)/).map(x => x.startsWith('<') ? x : F(x.replace(/&lt;/g, '<').replace(/&gt;/g, '>'))).join('');
  const root = () => document.getElementById('tr');
  const $ = s => root().querySelector(s);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const toast = (t, ms = 2600) => { document.querySelector('.t-toast')?.remove(); const d = document.createElement('div'); d.className = 't-toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), ms); };
  const canAI = () => A.isAcademyDevice() || sessionStorage.getItem('try:unlock') === '1';
  const doneSet = () => new Set(A.ls.get('try:done', []));
  const markDone = id => { const s = doneSet(); s.add(id); A.ls.set('try:done', [...s]); };

  // ── 음성 인식 교정(중·고등 낱말) ──
  const FIX = {'인수 분해': '인수분해', '완전 제곱식': '완전제곱식', '완전 제곱': '완전제곱', '제곱에 차': '제곱의 차', '제곱 의 차': '제곱의 차', '치 환': '치환',
    '에이로': 'A로', '에이 로': 'A로', '에이를': 'A를', '도 함수': '도함수', '증감 표': '증감표', '극 소': '극소', '극 대': '극대', '판별 식': '판별식', '기울 기': '기울기'};
  const fix = t => { let s = A.fixSpeech(t || ''); for (const k in FIX) s = s.split(k).join(FIX[k]); return s; };

  // ── AI 채점(중·고등) — 핵심마다 짚었는지만. 되묻기 문장은 앱이 가진 것을 쓴다 ──
  const IDS = 'abcdefghijkl';
  const SYS = `너는 중·고등학생의 수학 선생님이야. 학생이 질문 하나에 말로 답한 것(음성 인식 텍스트)을 보고 [꼭 말할 핵심]을 하나씩 짚었는지 판정해.
규칙:
- 뜻이 같으면 표현이 달라도 인정. 식을 정확히 읽지 않아도 무엇을 하는지 말로 설명했으면 인정(예: "엑스 제곱 빼기 엑스를 에이로 놓아" = x²−x를 A로 치환).
- 음성 인식이 수학 말을 틀리게 적은 것은 소리가 비슷하고 문맥상 분명하면 맞게 말한 것으로 봐.
- 질문이 방법을 정해 주지 않았으면 그 단원에서 배우는 어떤 바른 방법으로 답해도 인정.
- [이전 답]이 있으면 합쳐서 판정. 틀린 내용을 말했으면 misconception 에 한 줄로, 없으면 "".
- ack: 20자 안팎 한 문장, 맞게 말한 부분만 구체적으로 인정(정답·빠진 핵심은 넣지 마). 맞은 게 없으면 "좋아, 하나씩 짚어 보자."
반드시 JSON만: {"hits":[{"id":"a","hit":true}],"misconception":"","ack":"..."}`;
  async function grade(question, keys, answer, prev, gid) {
    const user = `[질문] ${question}\n[꼭 말할 핵심]\n${keys.map((k, i) => IDS[i] + ') ' + k).join('\n')}\n` + (prev ? `[이전 답] ${prev}\n` : '') + `[학생의 답(음성 인식)] ${answer}`;
    const raw = await A.ai({task: 'grade', system: SYS, messages: [{role: 'user', content: user}], max_tokens: 600, grade_id: gid || 'try'});
    let o = null; try { o = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)); } catch (e) {}
    if (!o) throw new Error('채점이 잘 안 됐어. 한 번 더 말해 줘.');
    return {hits: keys.map((_, i) => !!((o.hits || []).find(h => h && h.id === IDS[i]) || {}).hit), mis: String(o.misconception || '').trim(), ack: String(o.ack || '').trim()};
  }

  // ── 질문 읽어 주기(마스터 10/20 시험 — 체험판 한 문제만) · 기기 목소리(speechSynthesis) · 수식은 읽는 글(speak)을 따로 둔다 ──
  const hush = () => { try { speechSynthesis.cancel(); } catch (e) {} document.querySelectorAll('.t-say.on').forEach(b => b.classList.remove('on')); };
  function sayQ(text, btn) {
    if (!('speechSynthesis' in window)) return toast('이 기기는 읽어 주기가 안 돼요');
    if (btn.classList.contains('on')) return hush();
    hush(); stopRec();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ko-KR'; u.rate = 0.95;
    const v = speechSynthesis.getVoices().find(x => /^ko/i.test(x.lang)); if (v) u.voice = v;
    u.onend = u.onerror = () => btn.classList.remove('on');
    btn.classList.add('on'); speechSynthesis.speak(u);
  }

  // ── 말하기 칸(말 기본 · 글 대안) — 새 앱 ui.js 마이크와 같은 방식(확정 문장만 · 끊기면 다시 켬) ──
  let REC = null;
  const stopRec = () => { if (REC) { const r = REC; REC = null; try { r._stop && r._stop(); r.stop(); } catch (e) {} } };
  const MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  function voice(box, onSubmit, ph) {
    let typed = false, text = '';
    const draw = () => {
      box.innerHTML = `<div class="t-voice"><div class="t-live" id="vlive">${typed ? '<textarea id="vta" placeholder="여기에 써도 돼"></textarea>' : `<span class="t-ph">${esc(ph || '마이크를 누르고 말해 봐')}</span>`}</div>
        <div class="t-row">${typed ? '' : `<button class="t-mic" id="vmic" aria-label="말하기">${MIC}</button>`}<button class="t-btn small" id="vtw">${typed ? '말로 하기' : '글로 쓰기'}</button><button class="t-btn small" id="vclr">지우고 다시</button><span class="t-sp"></span><button class="t-btn pri" id="vsub" disabled>${typed ? '다 썼어' : '다 말했어'}</button></div></div>`;
      const sub = box.querySelector('#vsub'), live = box.querySelector('#vlive');
      const upd = t => { text = t; sub.disabled = !text.trim(); if (!typed) live.innerHTML = t ? esc(t) : `<span class="t-ph">${esc(ph || '마이크를 누르고 말해 봐')}</span>`; };
      if (typed) { const ta = box.querySelector('#vta'); ta.value = text; ta.oninput = () => upd(ta.value); setTimeout(() => ta.focus(), 30); }
      const cut = () => { if (REC && REC.clova) { const r = REC; REC = null; r.abort(); } else stopRec(); };   // 글로 쓰기·지우기: CLOVA 는 남은 글자를 기다리지 않고 바로 끊음
      box.querySelector('#vtw').onclick = () => { cut(); typed = !typed; draw(); };
      box.querySelector('#vclr').onclick = () => { cut(); text = ''; if (typed) box.querySelector('#vta').value = ''; upd(''); };
      sub.onclick = () => {
        if (REC && REC.clova) {   // CLOVA: 마지막 말 조각이 다 올 때까지 기다렸다 채점(0.5~2초)
          const r = REC; REC = null; sub.disabled = true; sub.textContent = '마지막 말 받는 중…';
          r.finish().then(() => { sub.textContent = '다 말했어'; sub.onclick(); }); return;
        }
        stopRec(); const t = (typed ? box.querySelector('#vta').value : text).trim(); if (t) onSubmit(fix(t));
      };
      const mic = box.querySelector('#vmic');
      // 말하기 ② — 학원 기기·선생님 PIN 이면 네이버 CLOVA 실시간(js/clova.js · 서버 함수 clova-stt). 연결이 안 되면 브라우저 음성 인식(①)
      const clova = () => {
        const pre = text;   // 앞서 말한 것 뒤에 이어 붙인다
        const R = CLOVA.start({
          pts: () => [],    // 중고등은 x·a 같은 문자가 많아 대문자로 바꾸지 않는다(SAS 같은 이름만)
          onWords: ws => upd(fix(((pre ? pre + ' ' : '') + ws.map(x => x.w).join(' ')).trim())),
          onState: st => {
            if (st === 'on') { mic.classList.add('on'); mic.title = '네이버 음성 인식으로 듣는 중'; if (!text) live.innerHTML = '<span class="t-ph">듣고 있어… 다 말하면 마이크를 다시 눌러 줘</span>'; }
            else if (st === 'wait') mic.classList.add('wait');
            else { if (REC === R) REC = null; if (!REC) mic.classList.remove('on', 'wait'); mic.title = ''; }
          },
          onFail: msg => { toast(msg, 3200); if (REC === R) REC = null; if (!REC) browser(); },
          onError: msg => toast(msg, 3200)
        });
        R._stop = () => {}; R.stop = () => R.finish(); REC = R;
      };
      if (mic) mic.onclick = () => {
        if (REC) { stopRec(); if (!REC) mic.classList.remove('on'); return; }
        hush();   // 읽어 주는 소리를 아이 말로 받아 적지 않게
        if (canAI() && window.CLOVA && CLOVA.ok()) clova(); else browser();
      };
      // 말하기 ① — 브라우저 음성 인식
      const browser = () => {
        const R = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!R) { toast('이 기기는 말하기가 안 돼서 글로 써 줘'); typed = true; return draw(); }
        const pieces = text ? [text] : []; let manual = false, started = false, restarts = 0;
        const r = new R(); r.lang = 'ko-KR'; r.continuous = true; r.interimResults = false; r.maxAlternatives = 3;
        REC = r; r._stop = () => { manual = true; };
        const wd = setTimeout(() => { if (!started) { try { r.abort(); } catch (e) {} REC = null; typed = true; toast('말하기가 시작되지 않아요. 글로 써 줘'); draw(); } }, 4000);
        r.onstart = () => { started = true; clearTimeout(wd); mic.classList.add('on'); if (!text) live.innerHTML = '<span class="t-ph">듣고 있어… 다 말하면 마이크를 다시 눌러 줘</span>'; };
        r.onresult = ev => { for (let k = ev.resultIndex; k < ev.results.length; k++) { const res = ev.results[k]; if (res.isFinal) { const t = (res[0].transcript || '').trim(); if (t) pieces.push(t); } } upd(fix(pieces.join(' ').replace(/\s+/g, ' ').trim())); };
        r.onerror = ev => { clearTimeout(wd); if (['not-allowed', 'service-not-allowed', 'network', 'audio-capture'].includes(ev.error)) { manual = true; REC = null; typed = true; toast('마이크를 쓸 수 없어 글로 써 줘 (' + ev.error + ')'); draw(); } };
        r.onend = () => { clearTimeout(wd); if (!manual && REC === r && restarts < 30) { restarts++; try { r.start(); return; } catch (e) {} } if (REC === r) REC = null; mic.classList.remove('on'); };
        try { r.start(); } catch (e) { clearTimeout(wd); REC = null; typed = true; draw(); }
      };
    };
    draw();
  }

  // ════════ 견본 데이터 ════════
  const M3 = [
    {id: 'm1', r: 1, kind: '개념 · 말', how: '말로 답하기 — 핵심 두 개를 AI 가 판정, 빠진 것만 되묻기',
     q: '(x+y)²−5(x+y)+6에서 x+y를 A로 놓으면 식이 어떤 모양이 돼? 그렇게 하면 왜 편해?', src: '숨마쿰 Q049 · 107쪽',
     type: 'say', keys: ['식에 두 번 나오는 공통부분을 한 문자로 놓는다', '그러면 아는 인수분해 공식 꼴(A²−5A+6)이 된다'],
     asks: ['식에서 두 번 나오는 덩어리를 A로 바꾸면 무엇이 좋아져?', 'A로 바꾼 식은 우리가 아는 어떤 꼴이야?'],
     teach: '두 번 나오는 x+y를 A로 놓으면 A²−5A+6이 돼. x²+(a+b)x+ab 꼴이라 (A−2)(A−3)으로 바로 인수분해할 수 있어.',
     ans: 'A²−5A+6이 돼. 우리가 아는 x²+(a+b)x+ab 꼴이라 (A−2)(A−3)으로 바로 인수분해할 수 있어.'},
    {id: 'm2', r: 1, kind: '과정 이해 · 말', how: '말로 답하기 — 왜 그 단계가 필요한지',
     q: 'x+y를 A로 놓고 (A−2)(A−3)까지 인수분해했어. 여기서 끝내면 왜 틀린 답이야?', src: '숨마쿰 Q049 · 108쪽',
     type: 'say', keys: ['A는 계산을 편하게 하려고 잠깐 쓴 문자이다', '원래 식(x+y)을 다시 대입해야 한다'],
     asks: ['A는 원래 무엇을 대신한 문자야?', '그럼 답은 어떤 문자로 나타내야 해?'],
     teach: 'A는 계산을 편하게 하려고 잠깐 쓴 문자야. 문제는 x, y의 식이니까 A에 x+y를 다시 넣어 (x+y−2)(x+y−3)으로 나타내야 해.',
     ans: 'A는 잠깐 쓴 문자라서, A에 x+y를 다시 넣어 (x+y−2)(x+y−3)으로 나타내야 해.'},
    {id: 'm3', r: 2, kind: '유형 · 누르기 + 카드 + 짧은 말', how: '긴 과정을 단계로 — 식은 누르고 고르고, 말은 「무엇을 할지」만',
     q: '2(x²−x)²−3(x²−x)−2를 인수분해하면 인수가 모두 무엇이야?', src: '쎈 유형02 마지막 0763 · 109쪽(숫자 바꿈) — 견본 29번',
     type: 'steps', ans: '(2x²−2x+1)(x−2)(x+1)',
     steps: [
       {k: 'tap', label: '되풀이되는 부분 찾기', p: '식에서 <b>되풀이되는 부분</b>을 눌러 봐.', toks: ['2(', {t: 'x²−x', g: 'a'}, ')²', {t: '−3', g: 'n1'}, '(', {t: 'x²−x', g: 'a'}, ')', {t: '−2', g: 'n2'}], want: 'a',
        hint: '두 번 나오는 덩어리를 찾아봐.', teach: '<b>x²−x</b>가 두 번 나와. 이 덩어리를 하나로 보면 식이 간단해져.'},
       {k: 'say', label: '무엇을 할지(치환)', p: '그 부분을 어떻게 할 거야? <small>(짧게 말해 봐)</small>', re: /(A|에이|문자|치환|하나로|바꿔|바꾸|놓)/,
        key: '되풀이되는 식을 한 문자(A)로 바꾼다(치환)', ask: '두 번 나오는 덩어리를 한 글자로 바꾸면 어떻게 될까?', teach: '되풀이되는 식은 <b>한 문자로 바꿔(치환)</b> 생각해.',
        note: 'x²−x = A 로 놓으면  →  2A² − 3A − 2'},
       {k: 'cards', label: 'A의 식 인수분해', p: '2A² − 3A − 2를 인수분해한 <b>두 인수</b>를 골라 놓아 봐.', deck: ['(2A+1)', '(A−2)', '(2A−1)', '(A+2)', '(2A+2)', '(A−1)'], want: ['(2A+1)', '(A−2)'],
        trap: {'(2A−1)': '(2A−1)(A+2)를 전개하면 2A²+3A−2야. 가운데 항의 부호를 봐.', '(A+2)': '(2A−1)(A+2)를 전개하면 2A²+3A−2야. 가운데 항의 부호를 봐.', '(2A+2)': '(2A+2)는 2로 묶을 수 있는 식이야. 곱해서 상수항이 −2가 되는지 봐.', '(A−1)': '두 인수를 곱해 상수항이 −2, 가운데 항이 −3A가 되는지 확인해 봐.'},
        note: '2A² − 3A − 2 = (2A+1)(A−2)'},
       {k: 'say', label: '끝까지 했는지 판단', p: 'A 자리에 x²−x를 다시 넣었어: <b>(2x²−2x+1)(x²−x−2)</b>. 여기서 끝이야?', pre: '= (2x²−2x+1)(x²−x−2)  ← A에 x²−x를 다시 넣음',
        re: /(아니|안 ?끝|더 |한 ?번 ?더|끝까지|또 |다시 인수)/, key: '대입한 인수가 더 인수분해되는지 보고 끝까지 인수분해한다', ask: '두 인수 중에 아직 더 인수분해되는 식이 있지 않을까?',
        teach: '대입한 뒤에도 <b>더 인수분해되는 인수</b>가 있는지 꼭 봐야 해. x²−x−2는 더 인수분해돼.'},
       {k: 'cards', label: '끝까지 인수분해', p: '끝까지 인수분해한 <b>인수를 모두</b> 골라 놓아 봐.', deck: ['(2x²−2x+1)', '(x−2)', '(x+1)', '(x+2)', '(x−1)', '(x²−x−2)'], want: ['(2x²−2x+1)', '(x−2)', '(x+1)'],
        trap: {'(x²−x−2)': 'x²−x−2는 아직 더 인수분해돼. 곱이 −2, 합이 −1인 두 수는?', '(x+2)': '(x+2)(x−1)을 전개하면 x²+x−2야. 부호를 확인해 봐.', '(x−1)': '(x+2)(x−1)을 전개하면 x²+x−2야. 부호를 확인해 봐.'},
        note: '= (2x²−2x+1)(x−2)(x+1)'}]},
    {id: 'm4', r: 2, kind: '유형 · 여러 개 누르기 + 카드 + 짧은 말', how: '항을 골라 묶기 — 어느 세 항을 묶을지는 손으로',
     q: '9x²−25+6xy+y²을 인수분해해 봐.', src: '쎈 유형07 마지막 0784 · 112쪽(숫자 바꿈)',
     type: 'steps', ans: '(3x+y+5)(3x+y−5)',
     steps: [
       {k: 'tap', multi: true, label: '묶을 세 항 고르기', p: '<b>완전제곱식이 되는 세 항</b>을 모두 눌러 봐.', toks: [{t: '9x²', g: 0}, {t: '−25', g: 1}, {t: '+6xy', g: 2}, {t: '+y²', g: 3}], want: [0, 2, 3],
        trapMsg: {1: '−25는 x, y가 없는 수야. x, y가 있는 세 항으로 ( )² 꼴을 만들어 봐.'}, hint: '( )² 꼴로 묶이는 세 항을 찾아봐. 순서를 바꿔도 돼.', teach: '<b>9x², 6xy, y²</b>은 (3x+y)²으로 묶여.',
        note: '9x² + 6xy + y² − 25  ← 순서를 바꿔 묶음'},
       {k: 'cards', label: '무엇의 제곱인지', p: '9x² + 6xy + y²은 무엇의 제곱이야? 골라 놓아 봐.', deck: ['(3x+y)²', '(9x+y)²', '(3x−y)²', '(3x+3y)²'], want: ['(3x+y)²'],
        trap: {'(9x+y)²': '9x²은 (3x)²이야.', '(3x−y)²': '가운데 항 6xy가 +라서 부호를 다시 봐.', '(3x+3y)²': '(3x+3y)²을 전개하면 y²이 아니라 9y²이 나와.'}, note: '= (3x+y)² − 25'},
       {k: 'say', label: '어떤 공식인지', p: '(3x+y)² − 25는 어떤 공식으로 인수분해해?', re: /(제곱의 ?차|제곱 ?차|합 ?과 ?차|합차|a ?제곱 ?빼기 ?b ?제곱)/,
        key: '( )² − ( )² 꼴이라 제곱의 차 공식을 쓴다', ask: '25는 무엇의 제곱이야? 그럼 식이 어떤 꼴이 돼?', teach: '25 = 5²이라 (3x+y)² − 5², <b>제곱의 차</b> a²−b² = (a+b)(a−b)를 써.', note: '= (3x+y)² − 5²'},
       {k: 'cards', label: '인수 고르기', p: '인수를 골라 놓아 봐.', deck: ['(3x+y+5)', '(3x+y−5)', '(3x+y+25)', '(3x+y−25)', '(3x−y+5)'], want: ['(3x+y+5)', '(3x+y−5)'],
        trap: {'(3x+y+25)': '25는 5의 제곱이야. ( )² − 5² 꼴로 봐.', '(3x+y−25)': '25는 5의 제곱이야. ( )² − 5² 꼴로 봐.', '(3x−y+5)': '3x+y를 한 덩어리로 그대로 둬.'},
        note: '= (3x+y+5)(3x+y−5)'}]},
    {id: 'm5', r: 3, kind: '심화 · 전략만 말하기', how: '풀지 않고 「어떤 차례로 생각할지」만 — 막히면 아이디어마다 되묻기',
     q: 'x²+4xy+4y²−6x−12y+9를 인수분해하려면 어떤 차례로 생각해? (풀지 말고 차례만)', src: '쎈 C 0814',
     type: 'say', keys: ['완전제곱식이 되는 부분과 공통부분 x+2y를 찾는다', '공통부분을 치환하면 다시 완전제곱식이 된다'],
     asks: ['앞의 세 항은 어떤 식의 제곱이야? 그 식이 뒤에도 나와?', '그 식을 A로 놓으면 A의 식은 어떤 꼴이야?'],
     teach: '앞의 세 항이 (x+2y)², 다음 두 항이 −6(x+2y)라서 x+2y=A로 놓으면 A²−6A+9 = (A−3)², 곧 (x+2y−3)²이야.',
     ans: '앞의 세 항이 (x+2y)², 다음 두 항이 −6(x+2y)라서 x+2y=A로 놓으면 A²−6A+9=(A−3)², 곧 (x+2y−3)²이야.'}
  ];

  // 고등 — 지점 지도(꼭 거칠 지점 + 풀이 길 두 개)
  const HS = {id: 'h1', kind: '대화형 · 지점 지도', how: '할 일을 말하면 앱이 풀이 노트에 식을 써 줌 · 결정적인 칸만 직접 · 길이 둘(거리 제곱 / 수직)',
    q: '곡선 y = x² 위를 움직이는 점 P와 점 A(10, 2) 사이의 거리가 최소일 때, 점 P의 좌표와 그때의 거리를 구하시오.', src: '숨마쿰 미적분Ⅰ 175~180쪽 「최댓값과 최솟값의 활용」(숫자 바꿈)',
    ans: 'P(2, 4), 최소 거리 2√17'};
  const ST = {
    M1: {name: '점을 문자로', sum: '곡선 위의 점 P를 한 문자로 나타낸다(예: P(t, t²))', q: '움직이는 점 P를 어떻게 나타내고 시작할래?',
      keys: ['곡선 위의 점 P를 x좌표 하나의 문자로 나타낸다(P(t, t²), 다른 문자도 됨)'], ask: 'P는 곡선 y = x² 위에 있어. x좌표를 t라 하면 y좌표는?',
      teach: '곡선 위를 움직이는 점은 x좌표 하나만 문자로 놓으면 y좌표가 따라 정해져. 그래서 변수 하나로 거리를 나타낼 수 있어.', note: '점 P(t, t²)'},
    A2: {name: '거리를 t의 식으로', sum: '두 점 사이의 거리를 t의 식으로 나타낸다', q: '점 A와 점 P 사이의 거리를 t로 나타내 볼래? 어떤 공식을 써?',
      keys: ['두 점 사이의 거리 공식으로 AP를 t의 식으로 나타낸다'], ask: '두 점 사이의 거리는 x좌표의 차와 y좌표의 차로 어떻게 나타내?',
      teach: '두 점 사이의 거리는 √((x좌표의 차)² + (y좌표의 차)²)이야.', note: 'AP = √((t − 10)² + (t² − 2)²)'},
    A3: {name: '√ 안의 식을 최소로', sum: '거리 대신 거리의 제곱(√ 안의 식)을 가장 작게 만든다', q: 'AP에는 √가 있어. 무엇을 가장 작게 만들면 될까? 왜 그래도 돼?',
      keys: ['√ 안의 식, 곧 AP²을 가장 작게 만든다', 'AP는 0 이상이라 AP가 가장 작을 때 AP²도 가장 작다'], ask: 'AP가 가장 작은 t에서 AP²은 어때? AP가 음수가 될 수 있어?',
      teach: '거리는 0 이상이라, 거리가 가장 작아지는 t에서 거리의 제곱도 가장 작아져. 그래서 √를 없앤 다항식 AP²만 미분하면 돼.', note: 'f(t) = AP² = (t − 10)² + (t² − 2)² = t⁴ − 3t² − 20t + 104', noteBy: '전개는 앱이'},
    A4: {name: '도함수가 0인 t', sum: '미분해서 도함수가 0이 되는 t를 찾는다', q: 'f(t)가 가장 작아지는 t를 찾으려면 무엇을 해?',
      keys: ['f′(t) = 0인 t를 찾는다(미분해서 0이 되는 곳)'], ask: '극값이 생길 수 있는 곳은 도함수가 어떤 값일 때야?',
      teach: '최대·최소가 될 수 있는 곳은 도함수가 0인 곳이야.', note: 'f′(t) = 4t³ − 6t − 20 = 2(t − 2)(2t² + 4t + 5)', noteBy: '미분·인수분해는 앱이',
      extra: [{k: 'input', label: 'f′(t) = 0의 실근', p: 'f′(t) = 0의 <b>실근</b> t는? <small>(직접 써 봐)</small>', want: ['2'], pre: 't = ', hint: '2(t − 2)(2t² + 4t + 5) = 0에서 실수인 근만 골라 봐.', teach: 't − 2 = 0에서 <b>t = 2</b>.', note: 't = 2'},
              {k: 'say', label: '버리는 근의 까닭', p: '2t² + 4t + 5 = 0의 근은 왜 안 써?', re: /(판별|실근이 ?없|근이 ?없|음수|허근)/, key: '판별식이 음수라서 실근이 없다', ask: '이차방정식에 실근이 있는지는 무엇으로 알아?', teach: '판별식 D/4 = 4 − 10 < 0이라 <b>실근이 없어</b>.'}]},
    A5: {name: '정말 최소인지', sum: '증감을 보고 극소이자 최소인지 확인한다', q: 't = 2에서 f′(t) = 0이야. 그런데 이 점에서 거리가 「가장 작다」는 건 어떻게 알 수 있어?',
      keys: ['t = 2 앞에서 f′(t) < 0(감소), 뒤에서 f′(t) > 0(증가)이라 극소이다', '극값이 이것 하나뿐이라 극소가 곧 최소이다'], ask: 't가 2보다 조금 작을 때와 조금 클 때 f′(t)의 부호는?',
      teach: 'f′(t) = 0인 점은 「후보」일 뿐이야. 앞뒤로 감소 → 증가면 극소고, 극값이 이것 하나뿐이면 그 극소가 최소야.',
      extra: [{k: 'choice', label: '증감표 빈칸 ①', p: '증감표 빈칸: t &lt; 2일 때 f′(t)의 부호는?', opts: ['+', '−'], want: '−', hint: 't = 1을 넣어 4 − 6 − 20의 부호를 봐.'},
              {k: 'choice', label: '증감표 빈칸 ②', p: 't &gt; 2일 때 f′(t)의 부호는?', opts: ['+', '−'], want: '+', hint: 't = 3을 넣어 108 − 18 − 20의 부호를 봐.', note: '증감표:  t … 2 …  /  f′(t)  −  0  +  /  f(t)  ↘  68  ↗'}]},
    B2: {name: '최소일 때 수직', sum: '거리가 최소일 때 선분 AP와 점 P에서의 접선이 수직이라는 것을 쓴다', q: '', keys: ['거리가 가장 짧을 때 선분 AP는 점 P에서의 접선과 수직이다'], note: 'AP ⊥ (점 P에서의 접선)'},
    B3: {name: '두 기울기를 t로', sum: '접선의 기울기를 미분으로 구한다', q: '점 P에서의 접선의 기울기와 직선 AP의 기울기를 t로 나타내 볼래?',
      keys: ['접선의 기울기는 y = x²을 미분한 2t이다', 'AP의 기울기는 (t² − 2)/(t − 10)이다'], ask: '곡선 위 점에서의 접선의 기울기는 무엇으로 구해?',
      teach: '곡선 y = f(x) 위의 점 (t, f(t))에서의 접선의 기울기는 f′(t)야. 직선 AP의 기울기는 (y좌표의 차)/(x좌표의 차).', note: '접선 기울기 2t,  AP 기울기 (t² − 2)/(t − 10)'},
    B4: {name: '수직 → 기울기의 곱 −1', sum: '수직인 두 직선의 기울기의 곱이 −1임을 쓴다', q: '두 직선이 수직이면 기울기 사이에 어떤 관계가 있어?',
      keys: ['수직인 두 직선의 기울기의 곱은 −1이다'], ask: '기울기가 m인 직선과 수직인 직선의 기울기는?', teach: '수직인 두 직선의 기울기의 곱은 −1이야.',
      note: '2t · (t² − 2)/(t − 10) = −1  →  2t³ − 3t − 10 = 0  →  (t − 2)(2t² + 4t + 5) = 0', noteBy: '정리·인수분해는 앱이',
      extra: [{k: 'input', label: '수직이 되는 t', p: '수직이 되는 t는? <small>(직접 써 봐)</small>', want: ['2'], pre: 't = ', hint: '(t − 2)(2t² + 4t + 5) = 0에서 실수인 근만 골라 봐.', teach: '<b>t = 2</b> (2t² + 4t + 5 = 0은 실근이 없어).', note: 't = 2'}]},
    B5: {name: '수직이면 꼭 최소?', sum: '', q: '수직이 되는 점이 t = 2 하나뿐이네. 그런데 수직이 되기만 하면 꼭 「가장 가까운」 점일까?',
      keys: ['수직은 최소가 될 후보를 찾는 조건일 뿐이다', '수직인 점이 하나뿐이고 P가 멀어지면 거리가 커지므로 그 점이 최소다'], ask: '가장 먼 점이나 극대인 점에서도 수직이 될 수 있지 않을까?',
      teach: '수직 조건은 후보를 찾는 것이라 최소인지는 따로 확인해야 해. 이 문제는 수직인 점이 하나뿐이고 P가 멀리 갈수록 거리가 커지니 그 점이 최소야.'},
    A6: {name: '답 되돌리기', sum: '', q: '', keys: [],
      extra: [{k: 'input', label: '점 P의 좌표', p: '점 P의 좌표는?', want: ['(2,4)', '2,4'], pre: 'P', hint: 't = 2일 때 P(t, t²)는?', teach: '점 P(2, 4)', note: '점 P(2, 4)'},
              {k: 'input', label: '최소 거리', p: '최소 거리는? <small>(√ 단추를 써도 돼)</small>', want: ['2√17', '√68'], keys: ['√', '(', ')'], hint: 'f(2) = 68은 AP²의 값이야. 거리 AP는?', teach: '√68 = <b>2√17</b>', note: '최소 거리 √f(2) = √68 = 2√17'}]}
  };
  const PATH = {A: ['M1', 'A2', 'A3', 'A4', 'A5', 'A6'], B: ['M1', 'B2', 'B3', 'B4', 'B5', 'A6']};
  const START_KEYS = ['M1', 'A2', 'A3', 'A4', 'A5', 'B2', 'B3', 'B4'];

  // 고1 공통수학2 — 역함수 그래프와의 교점(심화) · 같은 지점 지도 틀, 길이 둘(y = x 위 / 역함수를 직접 구해서)
  const HS2 = {id: 'h2', kind: '대화형 · 지점 지도', how: '할 일을 말하면 앱이 풀이 노트에 식을 써 줌 · 결정적인 칸만 직접 · 길이 둘(y = x 위의 교점 / 역함수를 직접 구해서)',
    q: '함수 f(x) = x² − 4x + 6 (x ≥ 2)의 역함수를 g(x)라 할 때, 두 함수 y = f(x), y = g(x)의 그래프의 교점의 좌표를 모두 구하시오.',
    src: '숨마쿰 공통수학2 312쪽 「역함수의 그래프」 · 교점 문제(숫자 바꿈)', ans: '(2, 2), (3, 3) — f(x)가 x ≥ 2에서 증가하므로 교점은 직선 y = x 위에 있고, f(x) = x를 풀면 x = 2, 3'};
  const ST2 = {
    M1: {name: '역함수 그래프의 성질', sum: '함수의 그래프와 그 역함수의 그래프는 직선 y = x에 대하여 대칭이다', q: '어떤 함수의 그래프와 그 역함수의 그래프는 어떤 관계에 있어?',
      keys: ['직선 y = x에 대하여 대칭이다'], ask: '역함수는 x와 y를 바꾼 함수야. x와 y를 바꾸면 그래프는 어느 직선에 대하여 뒤집혀?',
      teach: '역함수는 x와 y를 바꾼 것이라, 두 그래프는 직선 y = x에 대하여 대칭이야.', note: 'y = f(x)와 y = g(x)는 직선 y = x에 대하여 대칭'},
    A2: {name: '교점은 y = x 위', sum: 'f(x)가 증가하는 함수라서 두 그래프의 교점은 직선 y = x 위에 있다(f(x) = x를 푼다)', q: '그럼 두 그래프의 교점은 어디에 있을까? 그렇게 말할 수 있는 까닭도 말해 봐.',
      keys: ['f(x)가 x ≥ 2에서 증가하는 함수이다', '그래서 두 그래프의 교점은 직선 y = x 위에 있다(f(x) = x를 푼다)'], ask: 'x ≥ 2에서 x가 커지면 f(x)는 어떻게 변해? 그런 함수와 그 역함수의 그래프는 어디에서 만나?',
      teach: 'f(x) = (x − 2)² + 2는 x ≥ 2에서 증가해. 증가하는 함수와 그 역함수의 그래프의 교점은 직선 y = x 위에 있어서 f(x) = x만 풀면 돼. (감소하는 함수면 y = x 밖에서도 만날 수 있어.)'},
    A3: {name: 'f(x) = x 풀기', sum: 'f(x) = x로 놓고 방정식을 푼다', q: '교점의 x좌표를 구하려면 어떤 방정식을 세워?',
      keys: ['f(x) = x(또는 x² − 4x + 6 = x)로 놓는다'], ask: '직선 y = x 위의 점은 x좌표와 y좌표가 어때? 그럼 y = f(x)와 y = x를 같게 놓으면?',
      teach: '교점이 y = x 위에 있으니 f(x) = x로 놓으면 돼.', note: 'x² − 4x + 6 = x  →  x² − 5x + 6 = 0  →  (x − 2)(x − 3) = 0', noteBy: '정리·인수분해는 앱이',
      extra: [{k: 'input', label: '교점의 x좌표', p: '교점의 x좌표를 모두 써 봐. <small>(쉼표로)</small>', want: ['2,3', '3,2'], pre: 'x = ', hint: '(x − 2)(x − 3) = 0의 근은?', teach: '<b>x = 2, 3</b>', note: 'x = 2, 3'},
              {k: 'say', label: '두 근을 다 쓰는 까닭', p: 'x = 2, 3을 둘 다 답으로 써도 될까? 왜?', re: /(2 ?이상|정의역|범위|둘 ?다|모두).*(돼|되|들어|맞|포함|만족)/, key: '두 근이 모두 정의역 x ≥ 2에 들어간다', ask: '이 함수는 x가 어떤 범위일 때만 정의돼 있어?', teach: '두 근 모두 <b>정의역 x ≥ 2</b> 안에 있어서 둘 다 써.'}]},
    B2: {name: '역함수 직접 구하기', sum: 'y = f(x)를 x에 대하여 풀고 x와 y를 바꾸어 g(x)를 구한다', q: '역함수 g(x)를 직접 구해 볼래? 어떤 차례로 구해?',
      keys: ['y = f(x)를 x에 대하여 풀고 x와 y를 바꾼다'], ask: '역함수를 구할 때는 y = f(x)를 무엇에 대하여 풀고, 그다음 무엇을 바꿔?',
      teach: 'y = f(x)를 x에 대하여 풀고 x와 y를 바꾸면 역함수야.', note: 'y = (x − 2)² + 2  →  (x − 2)² = y − 2', noteBy: '완전제곱식은 앱이',
      extra: [{k: 'choice', label: '제곱근의 부호', p: 'x ≥ 2라서 x − 2 = ±√(y − 2) 중 어느 쪽을 골라?', opts: ['+', '−'], want: '+', hint: 'x ≥ 2이면 x − 2는 0보다 커, 작아?', note: 'x = 2 + √(y − 2)  →  g(x) = 2 + √(x − 2) (x ≥ 2)'}]},
    B3: {name: 'f(x) = g(x) 풀기', sum: 'f(x) = g(x)로 놓고 방정식을 푼다', q: '두 그래프의 교점을 구하려면 어떤 방정식을 세워?',
      keys: ['f(x) = g(x)로 놓는다'], ask: '두 그래프가 만나는 점에서는 두 함숫값이 어때?',
      teach: '두 그래프의 교점에서는 함숫값이 같으니 f(x) = g(x)로 놓아.', note: '(x − 2)² + 2 = 2 + √(x − 2)  →  x − 2 = t (t ≥ 0)로 놓으면 t² = √t  →  t⁴ = t  →  t(t − 1)(t² + t + 1) = 0  →  t = 0, 1', noteBy: '치환·정리는 앱이',
      extra: [{k: 'input', label: '교점의 x좌표', p: 't = 0, 1일 때 교점의 x좌표를 모두 써 봐. <small>(쉼표로)</small>', want: ['2,3', '3,2'], pre: 'x = ', hint: 'x − 2 = t였어.', teach: '<b>x = 2, 3</b>', note: 'x = 2, 3'}]},
    B5: {name: '교점이 모두 y = x 위', sum: '', q: '구한 x좌표로 두 교점의 좌표를 떠올려 봐. 두 교점은 어떤 직선 위에 있고, 왜 그럴까?',
      keys: ['두 교점이 모두 직선 y = x 위에 있다', 'f(x)가 증가하는 함수라서 그 역함수와의 교점은 y = x 위에 있다'], ask: 'x ≥ 2에서 f(x)는 증가해, 감소해? 그런 함수와 그 역함수의 그래프는 어디에서 만나?',
      teach: '두 교점 모두 y = x 위에 있어. f(x)가 증가하는 함수라서 그래. 그래서 처음부터 f(x) = x만 풀어도 같은 답이 나와(더 쉬운 길).'},
    A6: {name: '답 되돌리기', sum: '', q: '', keys: [],
      extra: [{k: 'input', label: '교점의 좌표', p: '교점의 좌표를 모두 써 봐.', want: ['(2,2),(3,3)', '(3,3),(2,2)', '(2,2)(3,3)', '(3,3)(2,2)'], keys: ['(', ')', ','], hint: '교점은 y = x 위에 있으니 y좌표는 x좌표와 같아.', teach: '<b>(2, 2), (3, 3)</b>', note: '교점 (2, 2), (3, 3)'}]}
  };
  const PATH2 = {A: ['M1', 'A2', 'A3', 'A6'], B: ['B2', 'B3', 'B5', 'A6']};
  const START2 = ['M1', 'A2', 'A3', 'B2', 'B3'];

  function figProblem() {
    const X = x => 26 + (x + 1.6) * 23.5, Y = y => 228 - (y + 1) * 15.5, p = [];
    for (let k = -32; k < 72; k++) p.push(X(k / 20).toFixed(1) + ',' + Y((k / 20) ** 2).toFixed(1));
    const tp = 1.25;
    return `<svg viewBox="0 0 340 250" width="300" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif">
      <line x1="${X(-1.6)}" y1="${Y(0)}" x2="${X(11.3)}" y2="${Y(0)}" stroke="#555" stroke-width="1.2"/><line x1="${X(0)}" y1="${Y(-1)}" x2="${X(0)}" y2="${Y(13.2)}" stroke="#555" stroke-width="1.2"/>
      <text x="${X(11.3) - 2}" y="${Y(0) + 15}" font-size="13" font-style="italic">x</text><text x="${X(0) + 5}" y="${Y(13.2) + 4}" font-size="13" font-style="italic">y</text><text x="${X(0) - 13}" y="${Y(0) + 14}" font-size="12">O</text>
      <polyline points="${p.join(' ')}" fill="none" stroke="#1f4fa8" stroke-width="2.2"/>
      <text x="${X(3.7)}" y="${Y(12.5)}" font-size="13" fill="#1f4fa8"><tspan font-style="italic">y</tspan>=<tspan font-style="italic">x</tspan>²</text>
      <line x1="${X(tp)}" y1="${Y(tp * tp)}" x2="${X(10)}" y2="${Y(2)}" stroke="#9a5b00" stroke-width="1.6" stroke-dasharray="5 4"/>
      <circle cx="${X(tp)}" cy="${Y(tp * tp)}" r="3.6" fill="#1c2230"/><text x="${X(tp) - 16}" y="${Y(tp * tp) - 4}" font-size="13">P</text>
      <circle cx="${X(10)}" cy="${Y(2)}" r="3.6" fill="#1c2230"/><text x="${X(10) - 30}" y="${Y(2) - 9}" font-size="13">A(10, 2)</text></svg>`;
  }

  function figProblem2() {   // 조건만 — y = f(x) (x ≥ 2) 곡선. 직선 y = x·역함수 그래프·교점은 그리지 않는다(= 답)
    const X = x => 30 + x * 34, Y = y => 220 - y * 34, p = [];
    for (let k = 0; k <= 60; k++) { const x = 2 + k * 0.05; p.push(X(x).toFixed(1) + ',' + Y(x * x - 4 * x + 6).toFixed(1)); }
    return `<svg viewBox="0 0 260 240" width="230" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif">
      <line x1="${X(-0.4)}" y1="${Y(0)}" x2="${X(6.6)}" y2="${Y(0)}" stroke="#555" stroke-width="1.2"/><line x1="${X(0)}" y1="${Y(-0.4)}" x2="${X(0)}" y2="${Y(6.2)}" stroke="#555" stroke-width="1.2"/>
      <text x="${X(6.6) - 2}" y="${Y(0) + 15}" font-size="13" font-style="italic">x</text><text x="${X(0) + 5}" y="${Y(6.2) + 4}" font-size="13" font-style="italic">y</text><text x="${X(0) - 13}" y="${Y(0) + 14}" font-size="12">O</text>
      <polyline points="${p.join(' ')}" fill="none" stroke="#1f4fa8" stroke-width="2.2"/><circle cx="${X(2)}" cy="${Y(2)}" r="3.4" fill="#1f4fa8"/>
      <text x="${X(4.05)}" y="${Y(5.6)}" font-size="13" fill="#1f4fa8"><tspan font-style="italic">y</tspan>=<tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>`;
  }
  // 고등 문제 묶음 — 같은 지점 지도 엔진(runMap)으로 돈다
  const HSL = [
    {hs: HS, st: ST, path: PATH, start: START_KEYS, fig: figProblem, gid: 'h-mijeok', sec: '고등 미적분Ⅰ · 최댓값과 최솟값의 활용', bIds: ['B2', 'B3', 'B4'], bMsg: '<b>수직 조건</b>으로 가는 길이구나. 그 생각으로 가 보자.'},
    {hs: HS2, st: ST2, path: PATH2, start: START2, fig: figProblem2, gid: 'h1-2', sec: '고1 공통수학2 · 합성함수와 역함수 (심화)', bIds: ['B2', 'B3'], bOnlyIfNot: 'A2', bMsg: '<b>역함수를 직접 구하는</b> 길이구나. 그 생각으로 가 보자.'}
  ];

  // ── 중2-2 닮음 심화 5문제(마스터 10/20 「도형 쪽으로 더 테스트」) — 같은 지점 지도 틀 · 원천 블랙라벨 중2-2(쎈 중2 PDF 없음) · 숫자는 모두 바꿈 ──
  // 그림은 조건만(길이·배치). 구하는 길이·닮은 삼각형·보조선은 그리지 않는다
  const SV = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" width="${Math.min(w, 330)}" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif" font-size="13" fill="#1c2230">${body}</svg>`;
  const T = (ox, oy, k) => (x, y) => [+(ox + x * k).toFixed(1), +(oy - y * k).toFixed(1)];
  const LN = (a, b, o = '') => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#1c2230" stroke-width="1.6" stroke-linecap="round" ${o}/>`;
  const PG = (ps, fill = 'none', o = '') => `<polygon points="${ps.map(p => p.join(',')).join(' ')}" fill="${fill}" stroke="#1c2230" stroke-width="1.6" stroke-linejoin="round" ${o}/>`;
  const LB = (p, t, dx = 0, dy = 0, o = '') => `<text x="${p[0] + dx}" y="${p[1] + dy}" text-anchor="middle" dominant-baseline="central" ${o}>${t}</text>`;
  const DT = p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.8" fill="#1c2230"/>`;
  const RA = (p, q, r, s = 9) => { const u = [(q[0] - p[0]), (q[1] - p[1])], v = [(r[0] - p[0]), (r[1] - p[1])], nu = Math.hypot(...u), nv = Math.hypot(...v);
    const a = [p[0] + u[0] / nu * s, p[1] + u[1] / nu * s], b = [p[0] + v[0] / nv * s, p[1] + v[1] / nv * s], c = [a[0] + v[0] / nv * s, a[1] + v[1] / nv * s];
    return `<polyline points="${a.join(',')} ${c.join(',')} ${b.join(',')}" fill="none" stroke="#1c2230" stroke-width="1.1"/>`; };
  const DIM = (a, b, t, off, o = '') => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), nx = dy / n * off, ny = -dx / n * off;
    const p = [a[0] + nx, a[1] + ny], q = [b[0] + nx, b[1] + ny];
    return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#7a8190" stroke-width="1" stroke-dasharray="3 3"/>${LB([(p[0] + q[0]) / 2 + nx * 0.9, (p[1] + q[1]) / 2 + ny * 0.9], t, 0, 0, `font-size="12" fill="#4a5160" ${o}`)}`; };

  function figM2a() {   // 직사각형 · ∠DEF = 90° · H는 AD 연장선과 EF 연장선의 교점
    const P = T(104, 166, 11), A = P(0, 12), B = P(0, 0), C = P(20, 0), D = P(20, 12), E = P(12, 0), F = P(0, 8), H = P(-6, 12);
    return SV(392, 228, `${PG([A, B, C, D])}${LN(D, E)}${LN(H, E)}${LN(H, A, 'stroke-width="1.2"')}${RA(E, D, F)}
      ${LB(A, 'A', 0, -11)}${LB(B, 'B', -10, 9)}${LB(C, 'C', 10, 9)}${LB(D, 'D', 9, -10)}${LB(E, 'E', 0, 13)}${LB(F, 'F', -11, 0)}${LB(H, 'H', -4, -11)}
      ${DIM(C, D, '12 cm', -16)}${DIM(B, C, '20 cm', -22)}`);
  }
  function figM2b() {   // 학생·그림자·피라미드 옆모습 · 햇빛 방향만
    const P = T(46, 214, 14), foot = P(0, 0), head = P(0, 1.6), B = P(12, 0), Hh = P(15, 0), Cc = P(18, 0), Ap = P(15, 12), tip = P(-2, 0);
    const arrows = [0, 1, 2].map(i => { const s = P(17.6 + i * 0.9, 13.6 - i * 0.9), e = [s[0] - 22, s[1] + 17.6]; return `<line x1="${s[0]}" y1="${s[1]}" x2="${e[0]}" y2="${e[1]}" stroke="#d07a12" stroke-width="2"/><polygon points="${e[0]},${e[1]} ${e[0] + 8},${e[1] - 1.5} ${e[0] + 3.4},${e[1] - 7}" fill="#d07a12"/>`; }).join('');
    return SV(340, 262, `<rect x="${tip[0]}" y="${foot[1] - 2.5}" width="${foot[0] - tip[0]}" height="5" fill="#b9bfca"/><rect x="${foot[0]}" y="${foot[1] - 2.5}" width="${B[0] - foot[0]}" height="5" fill="#dde1e8"/>
      ${LN(P(-3.2, 0), P(19.6, 0), 'stroke="#7a8190" stroke-width="1.2"')}${PG([Ap, B, Cc], '#efe3c4')}${LN(Ap, Hh, 'stroke-width="1.2" stroke-dasharray="4 3"')}${RA(Hh, Cc, Ap, 7)}
      ${LN(foot, head, 'stroke-width="2.2"')}<circle cx="${head[0]}" cy="${head[1] - 3.5}" r="3.5" fill="#1c2230"/>${arrows}${LB(P(16.2, 14.2), '햇빛', 0, 0, 'font-size="12" fill="#b0650c"')}
      ${LB(Ap, 'A', 0, -11)}${LB(B, 'B', -2, 13)}${LB(Hh, 'H', 0, 13)}${LB(Cc, 'C', 2, 13)}
      ${LB(head, '1.6 m', -24, -2, 'font-size="12" fill="#4a5160"')}${DIM(tip, foot, '2 m', -22)}${DIM(foot, B, '12 m', -22)}`);
  }
  function figM2c() {   // ∠B = 90° 직각삼각형 · G 무게중심 · GH ⊥ BC · D는 BG 연장선 위 · DE ⊥ (BC 연장선)
    const P = T(34, 214, 11.5), A = P(0, 12), B = P(0, 0), C = P(9, 0), G = P(3, 4), H = P(3, 0), E = P(12, 0), D = P(12, 16);
    return SV(254, 238, `${PG([A, B, C])}${LN(C, E)}${LN(B, D)}${LN(D, E)}${LN(G, H, 'stroke-width="1.2"')}${DT(G)}
      ${RA(B, A, C)}${RA(H, G, C, 7)}${RA(E, D, B)}
      ${LB(A, 'A', -10, -4)}${LB(B, 'B', -10, 9)}${LB(C, 'C', 1, 12)}${LB(G, 'G', -11, -6)}${LB(H, 'H', 0, 12)}${LB(E, 'E', 9, 10)}${LB(D, 'D', 0, -11)}
      ${DIM(E, D, '16 cm', -20)}`);
  }
  function figM2d() {   // 마름모 ABCD · E는 AB 연장선 위 · ED가 BC, AC와 만나는 점 F, G
    const q = 2.1, p = Math.sqrt(9 - q * q), P = T(150, 128, 44), A = P(0, p), B = P(-q, 0), C = P(0, -p), D = P(q, 0), E = P(-4 * q / 3, -p / 3);
    const at = t => P(-4 * q / 3 + 7 * q * t / 3, -p / 3 + p * t / 3), F = at(1 / 4), Gp = at(4 / 7);
    return SV(270, 258, `${PG([A, C, D], '#e3eecf', 'stroke="none"')}${PG([Gp, F, C], '#cfe1f7', 'stroke="none"')}${PG([A, B, C, D])}${LN(A, C)}${LN(E, B)}${LN(E, D)}
      ${LB(A, 'A', 0, -11)}${LB(B, 'B', -8, -9)}${LB(C, 'C', 0, 12)}${LB(D, 'D', 11, 0)}${LB(E, 'E', -10, 4)}${LB(F, 'F', -3, 13)}${LB(Gp, 'G', 11, -7)}
      ${DIM(B, A, '3 cm', 14)}${DIM(E, B, '1 cm', 13)}`);
  }
  function figM2e() {   // 정사각형 · BC 위의 점 H · 세 삼각형의 무게중심 E, F, G
    const P = T(70, 212, 10), A = P(0, 18), B = P(0, 0), C = P(18, 0), D = P(18, 18), H = P(6, 0), E = P(2, 6), F = P(8, 12), G = P(14, 6);
    return SV(276, 244, `${PG([E, F, G], '#cfe1f7')}${PG([A, B, C, D])}${LN(A, H)}${LN(D, H)}${DT(E)}${DT(F)}${DT(G)}
      ${LB(A, 'A', -9, -8)}${LB(B, 'B', -9, 9)}${LB(C, 'C', 9, 9)}${LB(D, 'D', 9, -8)}${LB(H, 'H', 0, 12)}${LB(E, 'E', -9, 3)}${LB(F, 'F', 0, -11)}${LB(G, 'G', 10, 3)}
      ${DIM(B, A, '18 cm', 18)}`);
  }

  const HM2 = [
    {id: 'm2a', q: '가로 BC = 20 cm, 세로 AB = 12 cm인 직사각형 ABCD에서 BC 위에 BE : EC = 3 : 2가 되도록 점 E를 잡고, AB 위에 ∠DEF = 90°가 되도록 점 F를 잡았다. AD의 연장선과 EF의 연장선의 교점을 H라 할 때, AF와 AH의 길이를 각각 구하시오.',
      speak: '가로 비씨가 20센티미터, 세로 에이비가 12센티미터인 직사각형 에이비씨디에서, 비씨 위에 비이 대 이씨가 3 대 2가 되도록 점 이를 잡고, 에이비 위에 각 디이에프가 90도가 되도록 점 에프를 잡았다. 에이디의 연장선과 이에프의 연장선의 교점을 에이치라 할 때, 에이에프와 에이에이치의 길이를 각각 구하시오.',
      src: '블랙라벨 중2-2 64쪽 「도형의 닮음」 종합 사고력 01 (숫자 바꿈)', how: '닮은 두 삼각형은 눌러서 고르고, 까닭과 할 일은 말로 · 길이는 직접',
      ans: 'AF = 4 cm, AH = 6 cm — ∠B = ∠C = 90°, ∠BFE = ∠CED라서 △FBE ∽ △ECD(AA 닮음). FB : EC = BE : CD에서 FB : 8 = 12 : 12, FB = 8이라 AF = 4. AH ∥ BE라서 △FAH ∽ △FBE, AH : BE = AF : FB = 1 : 2라 AH = 6.'},
    {id: 'm2b', q: '키가 1.6 m인 학생의 그림자 길이가 2 m인 시각에, 피라미드의 그림자 끝이 이 학생이 선 곳과 일치하였다. 학생이 선 곳에서 피라미드 밑변의 끝 B까지의 거리는 12 m이고, 피라미드를 옆에서 보면 높이 AH와 밑변 BC의 길이의 비가 2 : 1인 이등변삼각형일 때, 피라미드의 높이 AH를 구하시오.',
      src: '블랙라벨 중2-2 64쪽 「도형의 닮음」 종합 사고력 03 (숫자 바꿈)', how: '닮음을 어디에 쓰는지 말로 · 비례식은 눌러서 고르기 · 높이는 직접',
      ans: '12 m — 같은 시각에는 (높이) : (그림자 길이)가 같다. 피라미드의 그림자는 꼭짓점 바로 아래 H부터 재야 하므로 BC = x m라 하면 그림자 길이는 12 + x/2, 높이는 2x. 4 : 5 = 2x : (12 + x/2)에서 x = 6, AH = 12 m.'},
    {id: 'm2c', q: '∠B = 90°인 직각삼각형 ABC의 무게중심을 G라 하자. 점 G에서 BC에 내린 수선의 발을 H라 하고, BG의 연장선 위의 점 D에서 BC의 연장선에 내린 수선의 발을 E라 하자. DE = 16 cm, HC : CE = 2 : 1일 때, GH의 길이를 구하시오.',
      src: '블랙라벨 중2-2 74쪽 「닮음의 활용」 A등급 29 (숫자 바꿈)', how: '무게중심 성질과 닮음을 말로 · 비와 길이는 직접',
      ans: '4 cm — 무게중심 G는 중선 CM(M은 AB의 중점)을 2 : 1로 나누고 GH ∥ AB라서 BH : HC = 1 : 2. HC : CE = 2 : 1이니 BH = CE = k라 하면 BE = 4k. GH ∥ DE라서 △BGH ∽ △BDE, GH : 16 = 1 : 4에서 GH = 4 cm.'},
    {id: 'm2d', q: 'AB = 3 cm인 마름모 ABCD가 있다. AB의 연장선 위에 BE = 1 cm가 되도록 점 E를 잡고, ED가 BC, AC와 만나는 점을 각각 F, G라 할 때, (1) BF : AD (2) FG : GD (3) △GFC : △ACD를 각각 가장 간단한 자연수의 비로 나타내시오.',
      src: '블랙라벨 중2-2 75쪽 「닮음의 활용」 종합 사고력 03 (숫자 바꿈)', how: '어떤 평행선·닮음을 쓰는지 말로 · 비는 직접',
      ans: '(1) 1 : 4 (2) 3 : 4 (3) 9 : 28 — BF ∥ AD라서 △EBF ∽ △EAD(닮음비 1 : 4), BF = 3/4, FC = 9/4. FC ∥ AD라서 △GFC ∽ △GDA(닮음비 3 : 4). △GFC = 9a, △GDA = 16a이고 △GDC는 △GFC와 높이가 같아 12a, △ACD = 28a.'},
    {id: 'm2e', q: '한 변의 길이가 18 cm인 정사각형 ABCD가 있다. BC 위의 한 점 H에 대하여 세 삼각형 ABH, AHD, DHC의 무게중심을 각각 E, F, G라 할 때, △EFG의 넓이를 구하시오.',
      src: '블랙라벨 중2-2 74쪽 「닮음의 활용」 A등급 28 (숫자 바꿈)', how: '보조선(세 중선)과 닮음을 말로 · 넓이는 직접 · 마지막에 「H를 옮기면?」',
      ans: '36 cm² — AB, AD, DC의 중점을 M, N, P라 하면 E, F, G는 HM, HN, HP를 H로부터 2 : 1로 나누는 점이라 △EFG ∽ △MNP(닮음비 2 : 3). △MNP = 18 × 9 ÷ 2 = 81이니 △EFG = 81 × 4/9 = 36 cm². H가 BC 위 어디에 있어도 같다.'}
  ].map(h => Object.assign({kind: '대화형 · 지점 지도'}, h));
  const ST_M2 = {
    m2a: {
      M1: {name: '닮은 두 삼각형', sum: '∠DEF = 90°를 써서 △FBE와 △ECD가 AA 닮음임을 찾는다', q: '', keys: [], extra: [
        {k: 'tap', label: '닮은 두 삼각형', p: '∠DEF = 90°를 쓰려면 어떤 두 삼각형을 봐야 할까? 바르게 쓴 것을 눌러 봐.', toks: [{t: '△FBE ∽ △ECD', g: 'a'}, '　', {t: '△FBE ∽ △DCE', g: 'b'}, '　', {t: '△FBE ∽ △EFD', g: 'c'}], want: 'a', skipIfHit: true,
          hint: '∠BFE와 크기가 같은 각은 △ECD의 어느 각이야? 닮음은 크기가 같은 각끼리 차례대로 써.', teach: '∠BFE = ∠CED라서 F ↔ E, B ↔ C, E ↔ D로 짝지어 <b>△FBE ∽ △ECD</b>야.'},
        {k: 'say', label: '닮은 까닭', p: '두 삼각형이 왜 닮았어?', key: '∠B = ∠C = 90°이고 ∠BFE = ∠CED(∠BEF + ∠CED = 90°)라서 AA 닮음이다', skipIfHit: true,
          ask: '∠BEF + ∠DEF + ∠CED = 180°야. 그럼 ∠BEF + ∠CED는 몇 도야? ∠BFE와 크기가 같은 각은?', teach: '∠B = ∠C = 90°이고, ∠BEF + ∠CED = 90° = ∠BEF + ∠BFE라서 <b>∠BFE = ∠CED</b>. 두 각이 같으니 AA 닮음이야.', note: '△FBE ∽ △ECD (AA 닮음)'}]},
      A2: {name: '닮음비로 AF', sum: '대응변의 비(FB : EC = BE : CD)로 FB를 구하고 AF를 구한다', q: 'AF를 구하려면 닮음에서 어떤 변끼리 비를 세워?',
        keys: ['대응하는 변끼리 비를 세운다(FB : EC = BE : CD)'], ask: '△FBE에서 FB와 짝이 되는 변은 △ECD의 어느 변이야? BE와 짝이 되는 변은?',
        teach: '대응변끼리 FB : EC = BE : CD로 세우면 돼.', note: 'BE = 12 cm, EC = 8 cm  →  FB : 8 = 12 : 12', noteBy: 'BE·EC 계산은 앱이',
        extra: [{k: 'input', label: 'AF의 길이', p: 'AF는 몇 cm야? <small>(직접 써 봐)</small>', want: ['4', '4cm'], pre: 'AF = ', hint: 'FB를 먼저 구하고 AB = 12에서 빼 봐.', teach: 'FB = 8이라 AF = 12 − 8 = <b>4 cm</b>.', note: 'FB = 8 cm,  AF = 4 cm'}]},
      A3: {name: 'H 쪽의 닮음', sum: 'AH ∥ BE라서 F를 사이에 둔 △FAH와 △FBE의 닮음으로 AH를 구한다', q: '이번엔 AH야. 어떤 닮음을 쓸 거고, 왜 닮았어?',
        keys: ['AH ∥ BE라서 점 F를 사이에 둔 두 삼각형(△FAH, △FBE)이 닮음이다'], ask: 'AD와 BC는 어떤 관계야? 그럼 AH와 BE는? 점 F에서 마주 보는 두 삼각형을 봐.',
        teach: 'AD ∥ BC라서 AH ∥ BE야. 맞꼭지각 ∠AFH = ∠BFE, 엇각 ∠FAH = ∠FBE라서 <b>△FAH ∽ △FBE</b>.', note: 'AH : BE = AF : FB = 4 : 8',
        extra: [{k: 'input', label: 'AH의 길이', p: 'AH는 몇 cm야?', want: ['6', '6cm'], pre: 'AH = ', hint: 'AH : 12 = 4 : 8을 풀어 봐.', teach: 'AH : 12 = 1 : 2라서 <b>AH = 6 cm</b>.', note: 'AH = 6 cm'}]}},
    m2b: {
      M1: {name: '같은 시각의 그림자', sum: '같은 시각에는 (높이) : (그림자 길이)의 비가 같다(햇빛이 평행해 닮음)', q: '피라미드 높이를 학생의 키·그림자와 어떻게 이어 볼 수 있어?',
        keys: ['같은 시각에는 (높이) : (그림자 길이)의 비가 같다(햇빛이 평행해 닮은 직각삼각형이 생긴다)'], ask: '햇빛은 서로 평행하게 들어와. 학생과 그림자가 만드는 직각삼각형, 피라미드와 그 그림자가 만드는 직각삼각형은 어떤 관계야?',
        teach: '햇빛이 평행하게 들어와서 두 직각삼각형이 닮아. 그래서 같은 시각에는 (높이) : (그림자 길이)가 1.6 : 2로 같아.', note: '(높이) : (그림자 길이) = 1.6 : 2 = 4 : 5'},
      A2: {name: '그림자는 H부터', sum: '피라미드의 그림자 길이는 꼭짓점 바로 아래 H부터 재야 한다(12 m에 BH를 더한다)', q: '피라미드의 그림자 길이는 어디부터 어디까지로 봐야 해?',
        keys: ['꼭짓점 A 바로 아래인 H부터 그림자 끝(학생이 선 곳)까지이다', '그래서 12 m에 BH를 더해야 한다'], ask: '높이 AH와 짝을 이루는 그림자는 A 바로 아래 점에서 시작해. 그 점은 어디야? 12 m만 쓰면 무엇이 빠져?',
        teach: '높이 AH의 짝은 H에서 그림자 끝까지야. B까지의 12 m에 BH를 더해야 해.', note: 'BC = x m라 하면  AH = 2x,  BH = x/2,  그림자 길이 = 12 + x/2', noteBy: '문자로 놓기는 앱이'},
      A3: {name: '비례식 풀기', sum: '', q: '', keys: [], extra: [
        {k: 'tap', label: '비례식', p: '바르게 세운 비례식을 눌러 봐.', toks: [{t: '4 : 5 = 2x : 12', g: 'b'}, '　', {t: '4 : 5 = 2x : (12 + x/2)', g: 'a'}, '　', {t: '4 : 5 = x : (12 + x/2)', g: 'c'}], want: 'a',
          hint: '높이는 AH = 2x야. 그림자는 H부터 재야 해.', teach: '높이 2x, 그림자 12 + x/2라서 <b>4 : 5 = 2x : (12 + x/2)</b>.', note: '4(12 + x/2) = 5 × 2x  →  48 + 2x = 10x  →  x = 6'},
        {k: 'input', label: '피라미드의 높이', p: '피라미드의 높이 AH는 몇 m야?', want: ['12', '12m'], pre: 'AH = ', hint: 'x = 6이고 AH = 2x야.', teach: 'AH = 2 × 6 = <b>12 m</b>.', note: 'AH = 12 m'}]}},
    m2c: {
      M1: {name: 'H가 BC를 나누는 비', sum: '무게중심의 성질(중선을 2 : 1)과 GH ∥ AB로 BH : HC = 1 : 2를 얻는다', q: 'G가 무게중심이야. 그럼 점 H는 BC를 어떤 비로 나눠? 왜 그래?',
        keys: ['무게중심은 중선을 꼭짓점 쪽부터 2 : 1로 나눈다', 'GH ∥ AB라서 BH : HC = 1 : 2이다'], ask: '꼭짓점 C에서 AB의 중점 M으로 중선을 그어 봐. G는 CM을 어떻게 나눠? GH와 AB는 어떤 관계야?',
        teach: 'G는 중선 CM을 CG : GM = 2 : 1로 나눠. GH와 AB는 모두 BC에 수직이라 평행하니 CH : HB = CG : GM = 2 : 1, 곧 <b>BH : HC = 1 : 2</b>야.', note: 'BH : HC = 1 : 2'},
      A2: {name: 'BE를 한 문자로', sum: '', q: '', keys: [], extra: [
        {k: 'input', label: 'BH : BE', p: 'BH = k라 하면 BE는 k의 몇 배야? BH : BE를 가장 간단한 자연수의 비로 써 봐.', want: ['1:4'], keys: [':'], pre: 'BH : BE = ', hint: 'HC = 2k이고 HC : CE = 2 : 1이니 CE는?',
          teach: 'HC = 2k, CE = k라서 BE = k + 2k + k = 4k, <b>BH : BE = 1 : 4</b>.', note: 'BH = k,  HC = 2k,  CE = k  →  BE = 4k'}]},
      A3: {name: '닮음으로 GH', sum: 'GH ∥ DE라서 △BGH ∽ △BDE, 닮음비 BH : BE로 GH를 구한다', q: '이제 GH를 구하려면 어떤 닮음을 써? 왜 닮았어?',
        keys: ['B를 꼭짓점으로 하는 두 삼각형(△BGH, △BDE)의 닮음을 쓴다', 'GH ∥ DE(둘 다 BE에 수직)라서 닮음이다'], ask: 'GH와 DE는 둘 다 BE에 수직이야. 그럼 둘은 어떤 관계고, 점 B에서 보면 어떤 두 삼각형이 생겨?',
        teach: 'GH와 DE는 모두 BE에 수직이라 평행해. 그래서 <b>△BGH ∽ △BDE</b>(AA 닮음)이고 닮음비는 BH : BE야.', note: 'GH : DE = BH : BE = 1 : 4',
        extra: [{k: 'input', label: 'GH의 길이', p: 'GH는 몇 cm야?', want: ['4', '4cm'], pre: 'GH = ', hint: 'GH : 16 = 1 : 4를 풀어 봐.', teach: 'GH = 16 × 1/4 = <b>4 cm</b>.', note: 'GH = 4 cm'}]}},
    m2d: {
      M1: {name: '평행한 변', sum: '마름모는 마주 보는 변이 평행하다(BC ∥ AD)는 것을 쓴다', q: '이 문제에서 마름모의 어떤 성질을 쓸 거야?',
        keys: ['마주 보는 변이 평행하다(BC ∥ AD)'], ask: '마름모는 평행사변형이기도 해. 마주 보는 두 변은 어떤 관계야?',
        teach: '마름모는 평행사변형이라 마주 보는 변이 평행해. 특히 <b>BC ∥ AD</b>가 핵심이야.', note: 'BC ∥ AD,  AB = BC = CD = DA = 3 cm'},
      A2: {name: 'BF : AD', sum: 'BF ∥ AD라서 △EBF ∽ △EAD, 닮음비 EB : EA = 1 : 4', q: 'BF : AD는 어떤 닮음으로 구할 수 있어? 닮음비는?',
        keys: ['BF ∥ AD라서 점 E를 꼭짓점으로 하는 두 삼각형(△EBF, △EAD)이 닮음이다', '닮음비는 EB : EA = 1 : 4이다'], ask: '점 E에서 보면 BF와 AD는 평행한 두 선분이야. 그럼 어떤 두 삼각형이 닮았고, EA는 몇 cm야?',
        teach: 'BF ∥ AD라서 △EBF ∽ △EAD야. EB = 1, EA = 1 + 3 = 4라서 닮음비는 1 : 4.',
        extra: [{k: 'input', label: '(1) BF : AD', p: 'BF : AD를 가장 간단한 자연수의 비로 써 봐.', want: ['1:4'], keys: [':'], pre: 'BF : AD = ', hint: 'EB : EA를 써 봐.', teach: '<b>BF : AD = 1 : 4</b>', note: 'BF : AD = 1 : 4  →  BF = 3/4 cm,  FC = 3 − 3/4 = 9/4 cm'}]},
      A3: {name: 'FG : GD', sum: 'FC ∥ AD라서 △GFC ∽ △GDA, 닮음비 FC : DA = 3 : 4', q: 'FG : GD는 어떤 닮음으로 구해? 닮음비는 어떻게 구해?',
        keys: ['FC ∥ AD라서 점 G를 사이에 둔 두 삼각형(△GFC, △GDA)이 닮음이다', '닮음비는 FC : DA이다(FC = BC − BF)'], ask: '점 G에서 마주 보는 두 삼각형을 봐. FC와 AD는 어떤 관계야? FC는 몇 cm야?',
        teach: 'FC ∥ AD라서 △GFC ∽ △GDA(맞꼭지각, 엇각). 닮음비는 FC : DA = 9/4 : 3 = 3 : 4야.',
        extra: [{k: 'input', label: '(2) FG : GD', p: 'FG : GD를 가장 간단한 자연수의 비로 써 봐.', want: ['3:4'], keys: [':'], pre: 'FG : GD = ', hint: 'FC : DA = 9/4 : 3을 간단히 해 봐.', teach: '<b>FG : GD = 3 : 4</b>', note: 'FG : GD = FC : DA = 3 : 4'}]},
      A4: {name: '넓이의 비', sum: '닮음비 3 : 4 → 넓이의 비 9 : 16, △GDC는 △GFC와 높이가 같아 밑변의 비로 구해 △ACD를 나눈다', q: '△GFC와 △ACD의 넓이를 비교하려면 어떻게 할래?',
        keys: ['닮음비가 3 : 4이면 넓이의 비는 9 : 16이다(△GFC : △GDA)', '△GDC는 △GFC와 높이가 같아 밑변의 비 GD : GF로 넓이를 구한다(△ACD = △GDA + △GDC)'],
        ask: '닮음비가 3 : 4이면 넓이의 비는? △ACD는 어떤 두 삼각형으로 나뉘어? △GDC와 △GFC는 무엇이 같아?',
        teach: '△GFC : △GDA = 3² : 4² = 9 : 16. △GDC는 △GFC와 꼭짓점 C에서의 높이가 같아서 GD : GF = 4 : 3으로 △GDC = 12가 돼. △ACD = 16 + 12 = 28이야.',
        note: '△GFC = 9a,  △GDA = 16a,  △GDC = 12a  →  △ACD = 28a', noteBy: '넓이를 a로 나타내기는 앱이',
        extra: [{k: 'input', label: '(3) △GFC : △ACD', p: '△GFC : △ACD를 가장 간단한 자연수의 비로 써 봐.', want: ['9:28'], keys: [':'], pre: '△GFC : △ACD = ', hint: '△ACD = △GDA + △GDC야.', teach: '<b>9 : 28</b>', note: '△GFC : △ACD = 9 : 28'}]}},
    m2e: {
      M1: {name: '무게중심과 중선', sum: 'E, F, G는 H에서 AB, AD, DC의 중점으로 그은 중선을 H로부터 2 : 1로 나누는 점이다', q: 'E, F, G는 각각 어떤 선분 위의 어느 점이야? 점 H에서 보면 셋의 공통점은?',
        keys: ['E, F, G는 H에서 AB, AD, DC의 중점으로 그은 중선 위에 있다', '세 점 모두 그 중선을 H로부터 2 : 1로 나눈다'], ask: '무게중심은 중선 위에 있어. 세 삼각형이 함께 가진 꼭짓점은? 그 꼭짓점에서 마주 보는 변의 중점으로 중선을 그으면?',
        teach: '세 삼각형은 모두 꼭짓점 H를 가져. AB, AD, DC의 중점을 M, N, P라 하면 E, F, G는 HM, HN, HP를 H로부터 2 : 1로 나누는 점이야.', note: 'AB, AD, DC의 중점 M, N, P  →  HE : HM = HF : HN = HG : HP = 2 : 3'},
      A2: {name: '닮은 삼각형', sum: '△EFG ∽ △MNP(닮음비 2 : 3)라서 넓이의 비는 4 : 9', q: '그럼 △EFG와 △MNP는 어떤 관계야? 넓이는 어떻게 비교돼?',
        keys: ['△EFG와 △MNP는 닮음이고 닮음비는 2 : 3이다', '넓이의 비는 2² : 3² = 4 : 9이다'], ask: 'HE : HM = HF : HN = 2 : 3이면 EF와 MN은 어떤 관계야? 닮음비가 2 : 3이면 넓이의 비는?',
        teach: '세 점이 모두 H로부터 2 : 3인 곳이라 EF ∥ MN, FG ∥ NP, GE ∥ PM이고 △EFG ∽ △MNP(닮음비 2 : 3). 넓이의 비는 4 : 9야.', note: '△EFG : △MNP = 4 : 9'},
      A3: {name: '넓이 구하기', sum: '', q: '', keys: [], extra: [
        {k: 'input', label: '△MNP의 넓이', p: '△MNP의 넓이는 몇 cm²야?', want: ['81', '81cm²', '81cm2'], pre: '△MNP = ', hint: 'M, P는 AB, DC의 중점이라 MP = 18이고, N은 MP에서 9만큼 위에 있어.', teach: 'MP = 18, 높이 9라서 18 × 9 ÷ 2 = <b>81 cm²</b>.', note: '△MNP = 18 × 9 ÷ 2 = 81 cm²'},
        {k: 'input', label: '△EFG의 넓이', p: '△EFG의 넓이는 몇 cm²야?', want: ['36', '36cm²', '36cm2'], pre: '△EFG = ', hint: '81 × 4/9를 계산해 봐.', teach: '81 × 4/9 = <b>36 cm²</b>.', note: '△EFG = 81 × 4/9 = 36 cm²'}]},
      A4: {name: 'H를 옮기면?', sum: '', q: '', keys: [], extra: [
        {k: 'say', label: 'H를 옮기면', p: '점 H를 BC 위의 다른 곳으로 옮기면 △EFG의 넓이는 어떻게 될까? 왜?', key: '변하지 않는다(M, N, P는 H와 상관없이 변의 중점이라 △MNP의 넓이가 그대로다)',
          ask: '△MNP의 꼭짓점 M, N, P는 H가 움직이면 따라 움직여?', teach: 'M, N, P는 정사각형의 변의 중점이라 H와 상관없어. 그래서 △EFG = △MNP × 4/9 = 36 cm²로 <b>H가 어디에 있어도 같아</b>.'}]}}
  };
  const PATH_M2 = {m2a: ['M1', 'A2', 'A3'], m2b: ['M1', 'A2', 'A3'], m2c: ['M1', 'A2', 'A3'], m2d: ['M1', 'A2', 'A3', 'A4'], m2e: ['M1', 'A2', 'A3', 'A4']};
  const START_M2 = {m2a: ['M1', 'A2', 'A3'], m2b: ['M1', 'A2'], m2c: ['M1', 'A3'], m2d: ['M1', 'A2', 'A3', 'A4'], m2e: ['M1', 'A2']};
  const FIG_M2 = {m2a: figM2a, m2b: figM2b, m2c: figM2c, m2d: figM2d, m2e: figM2e};
  HM2.forEach((h, i) => HSL.push({hs: h, st: ST_M2[h.id], path: {A: PATH_M2[h.id], B: PATH_M2[h.id]}, start: START_M2[h.id], fig: FIG_M2[h.id], gid: 'm2-2',
    sec: '중2-2 · 닮음 (심화 5문제)', band: '중2', tag: `심화 ${i + 1}`, bIds: []}));

  // ── 도형 「조건 풀기」 시안(마스터 10/20) — 앱이 조건을 하나씩 짚고 → 아이가 떠올린 것이 그림에 쌓이고 → 그림에서 닮은 삼각형을 눌러 찾고 → 구한다 ──
  // 그림 층: data-h = 지금 짚는 조건(밝게) · data-m = 아이가 떠올리면 생기는 표시 · data-r = 눌러 고르는 칸(삼각형·사각형)
  const ARC = (p, a, b, r, sym, col) => {
    const t1 = Math.atan2(a[1] - p[1], a[0] - p[0]); let d = Math.atan2(b[1] - p[1], b[0] - p[0]) - t1;
    while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
    const s = [p[0] + r * Math.cos(t1), p[1] + r * Math.sin(t1)].map(v => v.toFixed(1)), e = [p[0] + r * Math.cos(t1 + d), p[1] + r * Math.sin(t1 + d)].map(v => v.toFixed(1)), m = t1 + d / 2;
    return `<path d="M${s} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e}" fill="none" stroke="${col}" stroke-width="1.5"/><text x="${(p[0] + (r + 8) * Math.cos(m)).toFixed(1)}" y="${(p[1] + (r + 8) * Math.sin(m)).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="${col}">${sym}</text>`;
  };
  function figC2a() {
    const P = T(112, 190, 12), A = P(0, 12), B = P(0, 0), C = P(20, 0), D = P(20, 12), E = P(12, 0), F = P(0, 8), H = P(-6, 12), K = '#1f6fb5', HL = 'stroke="#ffb02e" stroke-width="8" stroke-opacity=".55" stroke-linecap="round" fill="none"';
    const RAc = (p, q, r) => RA(p, q, r, 9).replace('stroke="#1c2230"', `stroke="${K}"`);
    const chev = p => `<polyline points="${p[0] - 4},${p[1] - 5} ${p[0] + 3},${p[1]} ${p[0] - 4},${p[1] + 5}" fill="none" stroke="${K}" stroke-width="1.6"/>`;
    const lab = (p, t, dx, dy) => LB(p, t, dx, dy, `font-size="12.5" fill="${K}" font-weight="700"`);
    const reg = (id, ps) => `<polygon data-r="${id}" points="${ps.map(p => p.join(',')).join(' ')}"/>`;
    return `<svg viewBox="0 0 400 236" width="400" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif" font-size="13" fill="#1c2230">
      ${reg('FBE', [F, B, E])}${reg('ECD', [E, C, D])}${reg('AFED', [A, F, E, D])}${reg('HAF', [H, A, F])}
      <g pointer-events="none">
      <g data-h="1">${PG([A, B, C, D], 'none', HL)}</g><g data-h="2">${LN(B, C, HL)}</g><g data-h="3">${LN(E, D, HL)}${LN(E, F, HL)}</g><g data-h="4">${LN(H, A, HL)}${LN(H, F, HL)}</g>
      ${PG([A, B, C, D])}${LN(D, E)}${LN(H, E)}${LN(H, A, 'stroke-width="1.2"')}${RA(E, D, F)}
      <g data-m="right">${RAc(A, B, D)}${RAc(B, A, C)}${RAc(C, B, D)}${RAc(D, C, A)}</g>
      <g data-m="par">${chev(P(9.6, 12))}${chev(P(5, 0))}</g>
      <g data-m="cd">${lab(P(20, 6), '12', 14, 0)}</g>
      <g data-m="len">${lab(P(6, 0), '12', 0, -11)}${lab(P(16, 0), '8', 0, -11)}</g>
      <g data-m="ang">${ARC(E, C, D, 17, '●', K)}${ARC(F, B, E, 17, '●', K)}${ARC(E, B, F, 24, '×', K)}${ARC(D, C, E, 20, '×', K)}</g>
      <g data-m="ah">${RAc(A, H, F)}${ARC(F, A, H, 15, '●', K)}${ARC(H, A, F, 24, '×', K)}</g>
      ${LB(A, 'A', 0, -11)}${LB(B, 'B', -10, 9)}${LB(C, 'C', 10, 9)}${LB(D, 'D', 9, -10)}${LB(E, 'E', 0, 13)}${LB(F, 'F', -11, 2)}${LB(H, 'H', -4, -11)}
      ${DIM(B, C, '20 cm', -22)}${DIM(B, A, '12 cm', 22)}</g></svg>`;
  }
  const CL = [{id: 'c2a', fig: figC2a, gid: 'm2-2', sec: '중2-2 · 닮음 — 「조건 풀기」 시안 (1번을 새 방식으로)',
    kind: '조건 풀기 · 시안', how: '앱이 조건을 하나씩 짚어 줌 → 떠올린 것이 그림에 표시됨 → 같은 표시의 삼각형을 그림에서 눌러 찾기 → 구하기',
    qParts: ['가로 BC = 20 cm, 세로 AB = 12 cm인 ', {c: 1, t: '직사각형 ABCD'}, '에서 BC 위에 ', {c: 2, t: 'BE : EC = 3 : 2'}, '가 되도록 점 E를 잡고, AB 위에 ', {c: 3, t: '∠DEF = 90°'},
      '가 되도록 점 F를 잡았다. ', {c: 4, t: 'AD의 연장선과 EF의 연장선의 교점을 H'}, '라 할 때, AF와 AH의 길이를 각각 구하시오.'],
    src: '블랙라벨 중2-2 64쪽 「도형의 닮음」 종합 사고력 01 (숫자 바꿈)',
    ans: 'AF = 4 cm, AH = 6 cm — 직사각형이라 네 각이 직각, CD = 12. BE = 12, EC = 8. ∠DEF = 90°에서 ∠BFE = ∠CED라서 △FBE ∽ △ECD, FB : 8 = 12 : 12에서 FB = 8, AF = 4. AH ∥ BE라서 △HAF ∽ △EBF, AH : 12 = 4 : 8에서 AH = 6.',
    names: {FBE: '△FBE', ECD: '△ECD', AFED: '사각형 AFED', HAF: '△HAF'},
    steps: [
      {k: 'cond', c: 1, label: '조건 ① 직사각형', q: '「<b>직사각형 ABCD</b>」라는 조건이 있어. 이 조건에서 무엇을 떠올릴 수 있어?',
        keys: ['네 각이 모두 직각이다', '마주 보는 두 변은 평행하고 길이가 같다(AD ∥ BC, CD = AB)'], ask: '직사각형의 네 각은 어때? 마주 보는 두 변은 서로 어떤 관계야?',
        teach: '직사각형은 <b>네 각이 모두 직각</b>이고, <b>마주 보는 두 변이 평행하고 길이가 같아</b>. 그래서 AD ∥ BC이고 CD = AB = 12 cm야.', show: ['right', 'par', 'cd'],
        note: '∠A = ∠B = ∠C = ∠D = 90°,  AD ∥ BC,  CD = AB = 12 cm'},
      {k: 'input', c: 2, label: '조건 ② BE : EC = 3 : 2', p: '「<b>BE : EC = 3 : 2</b>」라는 조건이 있어. BE와 EC의 길이를 써 봐. <small>(쉼표로)</small>', want: ['12,8'], pre: 'BE, EC = ',
        hint: 'BC = 20 cm를 3 : 2로 나눠 봐. 전체를 3 + 2 = 5로 나눈 것 중 3과 2야.', teach: 'BE = 20 × 3/5 = <b>12 cm</b>, EC = 20 × 2/5 = <b>8 cm</b>.', show: ['len'], note: 'BE = 12 cm,  EC = 8 cm'},
      {k: 'cond', c: 3, label: '조건 ③ ∠DEF = 90°', q: '「<b>∠DEF = 90°</b>」라는 조건이 있어. 점 E에 모인 각들을 보면 무엇을 알 수 있어?',
        keys: ['∠BEF + ∠CED = 90°이다(직선 BC 위의 각은 180°)', '그래서 ∠BFE = ∠CED이다(직각삼각형 FBE에서도 ∠BFE + ∠BEF = 90°)'],
        ask: '직선 BC 위에서 점 E에 모인 세 각의 합은 몇 도야? 그럼 ∠BEF + ∠CED는? 직각삼각형 FBE의 나머지 두 각의 합과 비교해 봐.',
        teach: '직선 위의 각은 180°라 ∠BEF + ∠CED = 90°야. 직각삼각형 FBE에서도 ∠BFE + ∠BEF = 90°라서 <b>∠BFE = ∠CED(●)</b>. 같은 방법으로 ∠BEF = ∠CDE(×)야.', show: ['ang'],
        note: '∠BFE = ∠CED (●),  ∠BEF = ∠CDE (×)'},
      {k: 'find', label: '닮은 두 삼각형 찾기', p: '그림에 생긴 표시(직각, ●, ×)를 봐. <b>표시가 같은 삼각형 두 개</b>를 그림에서 눌러 봐.', want: ['FBE', 'ECD'], blink: ['ang', 'right'],
        hint1: '반짝이는 표시를 봐. 직각과 ●, ×가 <b>모두</b> 들어 있는 삼각형은 어느 것과 어느 것이야?', hint2: '점선으로 둘러싼 두 칸을 봐. 각 표시가 어떻게 같아?',
        teach: '△FBE와 △ECD는 직각과 ●가 같아서 <b>AA 닮음(△FBE ∽ △ECD)</b>이야.', note: '△FBE ∽ △ECD (AA 닮음)'},
      {k: 'cond', label: 'AF를 구하려면', q: '이제 <b>AF</b>를 구해 보자. AF를 구하려면 무엇을 먼저 알아야 하고, 닮음에서 어떤 변끼리 비를 세워?',
        keys: ['AF = AB − FB라서 FB를 먼저 구한다', '대응하는 변끼리 FB : EC = BE : CD로 비를 세운다'], ask: 'AF는 AB에서 무엇을 뺀 길이야? FB는 △FBE의 변이야. △ECD에서 FB와 짝이 되는 변은?',
        teach: 'AF = 12 − FB야. FB의 짝은 EC라서 <b>FB : EC = BE : CD</b>로 세우면 돼.', note: 'FB : 8 = 12 : 12', noteBy: '비례식은 앱이'},
      {k: 'input', label: 'AF의 길이', p: 'AF는 몇 cm야?', want: ['4', '4cm'], pre: 'AF = ', hint: 'FB : 8 = 12 : 12에서 FB를 먼저 구하고 12에서 빼 봐.', teach: 'FB = 8이라 AF = 12 − 8 = <b>4 cm</b>.', note: 'FB = 8 cm,  AF = 4 cm'},
      {k: 'cond', c: 4, label: '조건 ④ 교점 H', q: '「<b>AD의 연장선과 EF의 연장선의 교점 H</b>」라는 조건이 있어. 이 조건으로 무엇을 떠올릴 수 있어?',
        keys: ['AH ∥ BE이다(AD ∥ BC이므로)', '그래서 ∠HAF = ∠FBE(= 90°)이고 맞꼭지각 ∠AFH = ∠BFE이다'], ask: 'AH는 AD를 늘인 선이야. AH와 BE는 어떤 관계야? 점 F에서 마주 보는 두 각은 어때?',
        teach: 'AH ∥ BE라서 <b>∠HAF = ∠FBE = 90°</b>, 맞꼭지각이라 <b>∠AFH = ∠BFE(●)</b>야.', show: ['ah'], note: 'AH ∥ BE,  ∠HAF = ∠FBE = 90°,  ∠AFH = ∠BFE (●)'},
      {k: 'find', label: '또 닮은 두 삼각형', p: '이번에도 표시가 같은 <b>삼각형 두 개</b>를 그림에서 눌러 봐. <small>(한 삼각형은 다시 골라도 돼)</small>', want: ['HAF', 'FBE'], blink: ['ah', 'ang'],
        hint1: '점 F를 사이에 두고 마주 보는 두 삼각형을 봐. 직각과 ●가 같은 것은?', hint2: '점선으로 둘러싼 두 칸을 봐. 각 표시가 어떻게 같아?',
        teach: '△HAF와 △EBF는 직각과 ●가 같아서 <b>AA 닮음(△HAF ∽ △EBF)</b>이야.', note: '△HAF ∽ △EBF  →  AH : BE = AF : BF'},
      {k: 'input', label: 'AH의 길이', p: 'AH는 몇 cm야?', want: ['6', '6cm'], pre: 'AH = ', hint: 'AH : BE = AF : BF, 곧 AH : 12 = 4 : 8을 풀어 봐.', teach: 'AH : 12 = 1 : 2라서 <b>AH = 6 cm</b>.', note: 'AH = 6 cm'}]}];

  const nextBtn = (t = '다음') => new Promise(res => { const r = document.createElement('div'); r.className = 't-row'; r.innerHTML = `<span class="t-sp"></span><button class="t-btn pri">${t} ›</button>`; $('#stp').appendChild(r); r.querySelector('button').onclick = () => { r.remove(); res(); }; r.scrollIntoView({block: 'nearest', behavior: 'smooth'}); });
  // 말로 떠올리기 — 되묻기 한 번, 그래도 빠지면 짧은 설명
  async function askSay(s, gid) {
    const st = s.keys.map(() => false); let tries = 0; const said = [];
    while (true) {
      const q = tries ? s.ask : s.q;
      const t = await new Promise(res => { const p = document.createElement('div'); p.className = 't-step'; p.innerHTML = `<div class="t-prompt"><span class="t-pk">${esc(s.label)}</span>${FH(q)}</div>`; const b = document.createElement('div'); p.appendChild(b); $('#stp').appendChild(p);
        voice(b, t => { b.outerHTML = `<div class="t-ans"><b>내 답</b> ${esc(t)}</div><div class="t-think">채점하는 중…</div>`; res(t); }); });
      said.push(t);
      let r = null; try { r = await grade(q.replace(/<[^>]+>/g, ''), s.keys, t, said.slice(0, -1).join(' / '), gid); } catch (e) { toast(e.message); said.pop(); }
      $('#stp').querySelectorAll('.t-think').forEach(x => x.remove());
      if (!r) continue;
      r.hits.forEach((h, i) => { if (h) st[i] = true; });
      if (st.every(Boolean)) { say(`<b>${esc(r.ack || '맞아.')}</b>`, 'ok'); return {st: tries ? 'ask' : 'solo', memo: ''}; }
      tries++;
      if (tries >= 2) { say(`<b>설명</b> ${FH(s.teach)}`, 'warn'); return {st: 'tea', memo: '말한 것: ' + said.join(' / ')}; }
      if (r.mis) say(`살짝 다른 생각: ${esc(r.mis)}`);
    }
  }
  // 그림에서 눌러 찾기 — 틀리면 ① 표시 반짝 ② 후보 칸 점선 ③ 정답 보여 주기
  function findTri(s, svg, names) {
    return new Promise(resolve => {
      const w = document.createElement('div'); w.className = 't-step';
      w.innerHTML = `<div class="t-prompt"><span class="t-pk">${esc(s.label)}</span>${FH(s.p)}</div><div class="t-row"><span class="t-sub" id="fsel">아직 안 골랐어</span><span class="t-sp"></span><button class="t-btn pri" id="fok" disabled>다 골랐어</button></div><div id="fmsg"></div>`;
      $('#stp').appendChild(w); w.scrollIntoView({block: 'nearest', behavior: 'smooth'});
      const regs = [...svg.querySelectorAll('[data-r]')]; regs.forEach(r => r.classList.remove('sel', 'hint', 'got')); svg.classList.add('tap');
      const sel = new Set(); let tries = 0; const memo = [];
      const upd = () => { w.querySelector('#fsel').innerHTML = sel.size ? '고른 것: ' + [...sel].map(k => F(names[k])).join(', ') : '아직 안 골랐어'; w.querySelector('#fok').disabled = !sel.size; };
      const msg = (h, c) => { w.querySelector('#fmsg').innerHTML = `<div class="t-msg ${c || 'hint'}">${h}</div>`; };
      regs.forEach(r => r.onclick = () => { if (!svg.classList.contains('tap')) return; const k = r.dataset.r; sel.has(k) ? sel.delete(k) : sel.add(k); r.classList.toggle('sel'); upd(); });
      const end = st => { svg.classList.remove('tap'); regs.forEach(r => { r.onclick = null; r.classList.remove('sel', 'hint'); r.classList.toggle('got', s.want.includes(r.dataset.r)); }); w.querySelector('#fok').remove(); resolve({st, memo: memo.join(' · ')}); };
      w.querySelector('#fok').onclick = () => {
        if (sel.size === s.want.length && s.want.every(k => sel.has(k))) { msg('맞아. ' + FH(s.teach), 'ok'); return end(tries ? 'ask' : 'solo'); }
        tries++; memo.push('고른 것: ' + [...sel].map(k => names[k]).join(', '));
        sel.clear(); regs.forEach(r => r.classList.remove('sel')); upd();
        if (tries === 1) { msg(FH(s.hint1)); (s.blink || []).forEach(m => svg.querySelectorAll(`[data-m="${m}"]`).forEach(g => { g.classList.remove('blink'); void g.getBBox(); g.classList.add('blink'); })); }
        else if (tries === 2) { msg(FH(s.hint2)); regs.filter(r => s.want.includes(r.dataset.r)).forEach(r => r.classList.add('hint')); }
        else { msg(`<b>설명</b> ${FH(s.teach)}`, 'warn'); end('tea'); }
      };
    });
  }
  async function runCond(P) {
    VARA = false;
    frame({q: '', src: P.src, fig: P.fig()}, `<span class="t-tag r3">중2</span><span class="t-tag">${esc(P.kind)}</span>`);
    root().querySelector('.t-q').innerHTML = P.qParts.map(x => typeof x === 'string' ? F(x) : `<span class="cq" data-c="${x.c}">${F(x.t)}</span>`).join('');
    if (!canAI()) { $('#stp').innerHTML = lockBox(); bindLock(() => runCond(P)); return; }
    const svg = root().querySelector('.t-fig svg'); svg.classList.add('cf');
    const hl = c => { root().querySelectorAll('.cq').forEach(x => x.classList.toggle('on', +x.dataset.c === c)); svg.querySelectorAll('[data-h]').forEach(g => g.classList.toggle('on', +g.dataset.h === c)); };
    const clear = () => $('#stp').querySelectorAll('.t-msg,.t-step,.t-row').forEach(x => { if (!x.classList.contains('t-done')) x.remove(); });
    const log = [];
    say('조건을 <b>하나씩</b> 짚어 볼게. 문제에서 밝게 표시된 조건을 보고, 그 조건으로 떠올린 것을 말해 줘. 떠올린 것은 <b>그림에 표시</b>로 생겨.');
    await nextBtn('시작');
    for (const s of P.steps) {
      clear(); hl(s.c || 0);
      const r = s.k === 'cond' ? await askSay(s, P.gid) : s.k === 'find' ? await findTri(s, svg, P.names) : await step(s, P.gid);
      (s.show || []).forEach(m => svg.querySelectorAll(`[data-m="${m}"]`).forEach(g => g.classList.add('on')));
      if (s.c) root().querySelector(`.cq[data-c="${s.c}"]`)?.classList.add('done');
      log.push({what: s.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo});
      if (s.note) noteAdd(s.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고 · 앱이 씀' : (s.noteBy || ''));
      if (r.st === 'tea' || s.k === 'find' || (s.show && s.k === 'cond')) await nextBtn(); else await sleep(900);
      hl(0);
      if (s.k !== 'input') { clear(); const d = document.createElement('div'); $('#stp').appendChild(d); fold(d, s.label, r.st); }
    }
    clear(); markDone(P.id);
    showLog(log, P.ans, '<div class="t-src" style="margin-top:8px">조건마다 혼자 떠올렸는지 · 되묻기 뒤인지 · 설명을 봤는지가 남아요 → 어느 조건에서 생각이 끊겼는지 보여요.</div>');
    $('#again').onclick = () => runCond(P);
  }

  // ── 도형 「사실 판」 시안 2(마스터 10/20) — 먼저 스스로 → 막히면 쪼개기. 아이가 알아낸 것(각의 관계·닮은 삼각형)을 순서 없이 판에 넣고,
  //    참·거짓은 그림 좌표로 앱이 직접 계산한다. 문제마다 적는 것은 「열쇠 사실」과 도움 사다리뿐 ──
  const SECT = (p, a, b, r) => {
    const t1 = Math.atan2(a[1] - p[1], a[0] - p[0]); let d = Math.atan2(b[1] - p[1], b[0] - p[0]) - t1;
    while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
    const s = [p[0] + r * Math.cos(t1), p[1] + r * Math.sin(t1)].map(v => v.toFixed(1)), e = [p[0] + r * Math.cos(t1 + d), p[1] + r * Math.sin(t1 + d)].map(v => v.toFixed(1));
    return `M${p[0]},${p[1]} L${s} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e} Z`;
  };
  const B2 = {id: 'c2b', gid: 'm2-2', sec: '중2-2 · 닮음 — 「사실 판」 시안 2 (먼저 스스로 → 막히면 쪼개기)', kind: '사실 판 · 시안 2',
    how: '각·삼각형을 그림에서 눌러 알아낸 것을 판에 넣기(순서 자유) · 참거짓은 앱이 계산 · 막히면 「도움」에서만 조건을 쪼갬',
    qParts: ['가로 BC = 20 cm, 세로 AB = 12 cm인 ', {c: 1, t: '직사각형 ABCD'}, '에서 BC 위에 ', {c: 2, t: 'BE : EC = 3 : 2'}, '가 되도록 점 E를 잡고, AB 위에 ', {c: 3, t: '∠DEF = 90°'},
      '가 되도록 점 F를 잡았다. ', {c: 4, t: 'AD의 연장선과 EF의 연장선의 교점을 H'}, '라 할 때, AF와 AH의 길이를 각각 구하시오.'],
    src: '블랙라벨 중2-2 64쪽 「도형의 닮음」 종합 사고력 01 (숫자 바꿈)', ans: CL[0].ans,
    pts: {A: [0, 12], B: [0, 0], C: [20, 0], D: [20, 12], E: [12, 0], F: [0, 8], H: [-6, 12]},
    angs: ['FBE', 'ECD', 'CDE', 'ADE', 'HAF', 'FAD', 'BEF', 'FED', 'CED', 'BFE', 'AFH', 'AFE', 'AHF'],
    angR: {E: 27, F: 25},
    regs: {FBE: ['F', 'B', 'E'], ECD: ['E', 'C', 'D'], AFED: ['A', 'F', 'E', 'D'], HAF: ['H', 'A', 'F']},
    // 쓰이는 사실(그림에 표시가 생김) — 이 밖의 참인 사실은 「맞아」 하고 회색으로만 남긴다
    useful: ['eq:BFE,CED', 'eq:BEF,CDE', 'eq:ECD,FBE', 'eq:AFH,BFE', 'eq:AHF,BEF', 'eq:FBE,HAF', 's90:BEF,CED', 's90:BEF,BFE', 's90:CDE,CED', 's180:BEF,CED,FED'],
    why: {'eq:BFE,CED': 'w1', 'eq:BEF,CDE': 'w1', 'eq:AFH,BFE': 'w2', 'eq:AHF,BEF': 'w3'},
    whys: {
      w1: {label: '왜 같을까', q: '두 각의 크기가 왜 같아? <small>(짧게 말해 봐)</small>', keys: ['둘 다 90°에서 같은 각을 뺀 크기다(일직선 180°에서 90°를 빼거나, 직각삼각형의 나머지 두 각의 합이 90°라서)'],
        ask: '점 E에 모인 세 각은 일직선 위에 있어. 그리고 직각삼각형에서 직각이 아닌 두 각을 더하면 몇 도야?', teach: '∠BEF + ∠CED = 90°이고 직각삼각형 FBE에서 ∠BEF + ∠BFE = 90°라서, 둘 다 90°에서 ∠BEF를 뺀 크기야. 그래서 ∠BFE = ∠CED.'},
      w2: {label: '왜 같을까', q: '두 각의 크기가 왜 같아? <small>(짧게 말해 봐)</small>', keys: ['맞꼭지각이라서'], ask: '두 직선이 점 F에서 만날 때 마주 보는 두 각을 뭐라고 해?', teach: '두 직선이 만나서 마주 보는 각, <b>맞꼭지각</b>이라 같아.'},
      w3: {label: '왜 같을까', q: '두 각의 크기가 왜 같아? <small>(짧게 말해 봐)</small>', keys: ['AH ∥ BE라서 엇각이 같다'], ask: 'AH와 BE는 어떤 관계야? 평행한 두 직선과 한 직선이 만나서 생기는 각 중 크기가 같은 것은?', teach: 'AD ∥ BC라서 AH ∥ BE이고, 두 각은 <b>엇각</b>이라 같아.'}},
    goals: [
      {label: '열쇠 ① 닮은 두 삼각형', p: '먼저 <b>AF</b>를 구하려고 해. 그림에서 알아낸 것을 판에 넣어 봐. <small>각을 눌러 관계를 고르거나, 삼각형을 눌러 닮음을 골라. 순서는 마음대로야.</small>',
        key: 'sim:ECD,FBE', need: ['eq:BFE,CED', 'eq:BEF,CDE'],
        help: [{t: 'AF는 AB에서 FB를 뺀 길이야. <b>FB가 들어 있는 삼각형</b>을 생각해 봐. 그 삼각형과 각의 크기가 같은 삼각형은 어디 있을까?'},
               {t: '문제의 이 조건을 봐. 이 조건 때문에 점 E에 모인 각들 사이에 어떤 관계가 생길까? 각을 눌러 판에 넣어 봐.', c: 3},
               {t: '그림에 표시를 그렸어. 표시가 같은 각을 찾아 봐.', marks: ['BFE', 'CED', 'BEF', 'CDE', 'FBE', 'ECD']},
               {t: '설명: ∠BFE = ∠CED, ∠B = ∠C = 90°라서 <b>△FBE ∽ △ECD</b>(AA 닮음)야.', add: ['eq:BFE,CED', 'eq:ECD,FBE', 'sim:ECD,FBE']}],
        after: [{k: 'input', label: 'BE와 EC', p: 'BE : EC = 3 : 2야. BE와 EC는 몇 cm야? <small>(쉼표로)</small>', want: ['12,8'], pre: 'BE, EC = ', hint: 'BC = 20을 3 : 2로 나눠 봐.', teach: 'BE = <b>12</b>, EC = <b>8</b>', note: 'BE = 12 cm,  EC = 8 cm'},
                {k: 'input', label: 'AF의 길이', p: '판의 닮음을 보고 AF를 구해 봐. AF는 몇 cm야?', want: ['4', '4cm'], pre: 'AF = ', hint: '대응하는 변끼리: FB : EC = BE : CD야. FB를 구해서 AB = 12에서 빼 봐.', teach: 'FB : 8 = 12 : 12라 FB = 8, AF = 12 − 8 = <b>4 cm</b>.', note: 'FB : 8 = 12 : 12  →  FB = 8 cm,  AF = 4 cm'}]},
      {label: '열쇠 ② 닮은 두 삼각형', p: '이제 <b>AH</b>를 구해 보자. 같은 방법으로 알아낸 것을 판에 넣어 봐.',
        key: 'sim:FBE,HAF', need: ['eq:AFH,BFE', 'eq:AHF,BEF'],
        help: [{t: '<b>AH가 들어 있는 삼각형</b>을 생각해 봐. 그 삼각형과 각의 크기가 같은 삼각형은 어디 있을까?'},
               {t: '문제의 이 조건을 봐. AH와 BE는 어떤 관계야? 그때 크기가 같아지는 각을 눌러 판에 넣어 봐.', c: 4},
               {t: '그림에 표시를 그렸어. 표시가 같은 각을 찾아 봐.', marks: ['AFH', 'BFE', 'AHF', 'BEF', 'HAF', 'FBE']},
               {t: '설명: 맞꼭지각 ∠AFH = ∠BFE, ∠HAF = ∠FBE = 90°라서 <b>△HAF ∽ △EBF</b>(AA 닮음)야.', add: ['eq:AFH,BFE', 'eq:FBE,HAF', 'sim:FBE,HAF']}],
        after: [{k: 'input', label: 'AH의 길이', p: '판의 닮음을 보고 AH를 구해 봐. AH는 몇 cm야?', want: ['6', '6cm'], pre: 'AH = ', hint: 'AH : BE = AF : FB, 곧 AH : 12 = 4 : 8이야.', teach: 'AH : 12 = 1 : 2라서 <b>AH = 6 cm</b>.', note: 'AH : 12 = 4 : 8  →  AH = 6 cm'}]}]};

  function figC2b(P) {
    const M = T(112, 190, 12), Q = {}; for (const k in P.pts) Q[k] = M(...P.pts[k]);
    const {A, B, C, D, E, F, H} = Q, K = '#1f6fb5', HL = 'stroke="#ffb02e" stroke-width="8" stroke-opacity=".55" stroke-linecap="round" fill="none"';
    const RAc = (p, q, r) => RA(p, q, r, 9).replace('stroke="#1c2230"', `stroke="${K}"`);
    const mk = {BFE: ARC(F, B, E, 17, '●', K), CED: ARC(E, C, D, 17, '●', K), AFH: ARC(F, A, H, 15, '●', K), BEF: ARC(E, B, F, 23, '×', K), CDE: ARC(D, C, E, 20, '×', K), AHF: ARC(H, A, F, 24, '×', K),
      FBE: RAc(B, A, C), ECD: RAc(C, B, D), HAF: RAc(A, H, F), FAD: RAc(A, B, D)};
    const wedge = id => `<path data-a="${id}" d="${SECT(Q[id[1]], Q[id[0]], Q[id[2]], P.angR[id[1]] || 28)}"/>`;
    return `<svg viewBox="0 0 400 236" width="470" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif" font-size="13" fill="#1c2230">
      ${Object.entries(P.regs).map(([id, vs]) => `<polygon data-r="${id}" points="${vs.map(v => Q[v].join(',')).join(' ')}"/>`).join('')}
      ${P.angs.map(wedge).join('')}
      <g pointer-events="none">
      <g data-h="3">${LN(E, D, HL)}${LN(E, F, HL)}</g><g data-h="4">${LN(H, A, HL)}${LN(H, F, HL)}</g>
      ${PG([A, B, C, D])}${LN(D, E)}${LN(H, E)}${LN(H, A, 'stroke-width="1.2"')}${RA(E, D, F)}
      ${Object.entries(mk).map(([id, s]) => `<g data-m="${id}">${s}</g>`).join('')}
      ${LB(A, 'A', 0, -11)}${LB(B, 'B', -10, 9)}${LB(C, 'C', 10, 9)}${LB(D, 'D', 9, -10)}${LB(E, 'E', 0, 13)}${LB(F, 'F', -11, 2)}${LB(H, 'H', -4, -11)}
      ${DIM(B, C, '20 cm', -22)}${DIM(B, A, '12 cm', 22)}</g></svg>`;
  }

  async function runBoard(P) {
    VARA = false;
    frame({q: '', src: P.src, fig: figC2b(P)}, `<span class="t-tag r3">중2</span><span class="t-tag">${esc(P.kind)}</span>`);
    root().querySelector('.t-q').innerHTML = P.qParts.map(x => typeof x === 'string' ? F(x) : `<span class="cq" data-c="${x.c}">${F(x.t)}</span>`).join('');
    if (!canAI()) { $('#stp').innerHTML = lockBox(); bindLock(() => runBoard(P)); return; }
    const svg = root().querySelector('.t-fig svg'); svg.classList.add('cf', 'bdm');
    // ── 좌표로 계산 ──
    const ang = id => { const [a, v, b] = id.split('').map(k => P.pts[k]); const t = Math.atan2(a[1] - v[1], a[0] - v[0]) - Math.atan2(b[1] - v[1], b[0] - v[0]); let d = Math.abs(t * 180 / Math.PI) % 360; return d > 180 ? 360 - d : d; };
    const near = (x, y) => Math.abs(x - y) < 0.6;
    const triAngs = id => { const v = P.regs[id]; return v.map((_, i) => ang(v[(i + 2) % 3] + v[i] + v[(i + 1) % 3])); };
    const simOrder = (a, b) => {   // b의 꼭짓점을 a에 맞게 — 「△FBE ∽ △ECD」처럼 대응 순서대로 써 준다
      const A1 = triAngs(a), vb = P.regs[b], B1 = triAngs(b); const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
      const pm = perms.find(p => p.every((j, i) => near(A1[i], B1[j]))); return pm ? pm.map(j => vb[j]).join('') : null; };
    const kid = (type, items) => type + ':' + items.slice().sort().join(',');
    const show = (f, ord) => { const [type, rest] = f.split(':'), it = ord || rest.split(',');
      if (type === 'eq') return `∠${it[0]} = ∠${it[1]}`; if (type === 's90') return it.map(x => '∠' + x).join(' + ') + ' = 90°'; if (type === 's180') return it.map(x => '∠' + x).join(' + ') + ' = 180°';
      const o = simOrder(it[0], it[1]); return type === 'sim' ? `△${it[0]} ∽ △${o || it[1]}` : `△${it[0]} ≡ △${it[1]}`; };
    // ── 판 화면 ──
    const bd = document.createElement('div'); bd.className = 'bd'; root().querySelector('#mapc').after(bd);
    bd.innerHTML = `<div class="bd-h">알아낸 것 <small>판</small></div><div class="bd-facts" id="bdf"><span class="t-sub">아직 없어</span></div>
      <div class="bd-tool"><div class="bd-mode"><button class="t-btn small on" data-md="a">각 고르기</button><button class="t-btn small" data-md="t">삼각형 고르기</button></div>
      <div class="bd-sel" id="bds">그림에서 각을 눌러 봐</div><div class="bd-rel" id="bdr"></div>
      <div class="t-row"><button class="t-btn small" id="bdc">지우고 다시</button><span class="t-sp"></span><button class="t-btn small" id="bdh">막혔어 · 도움</button></div><div id="bdm"></div></div>`;
    let mode = 'a'; const sel = []; const facts = []; let onAdd = null, onHelp = null;
    const REL = {a: [['eq', '크기가 같다'], ['s90', '더하면 90°'], ['s180', '더하면 180°']], t: [['sim', '닮음'], ['cong', '합동']]};
    const bmsg = (h, c) => { bd.querySelector('#bdm').innerHTML = h ? `<div class="t-msg ${c || 'hint'}">${h}</div>` : ''; };
    const drawSel = () => {
      svg.querySelectorAll('[data-a],[data-r]').forEach(x => x.classList.toggle('sel', sel.includes(x.dataset.a || x.dataset.r)));
      bd.querySelector('#bds').innerHTML = sel.length ? '고른 것: ' + sel.map(x => F(mode === 'a' ? '∠' + x : (P.regs[x].length === 3 ? '△' : '사각형 ') + x)).join(', ') : (mode === 'a' ? '그림에서 각을 눌러 봐' : '그림에서 삼각형을 눌러 봐');
      bd.querySelector('#bdr').innerHTML = REL[mode].map(([k, t]) => `<button class="t-key" data-rel="${k}"${sel.length >= 2 ? '' : ' disabled'}>${t}</button>`).join('');
      bd.querySelectorAll('[data-rel]').forEach(b => b.onclick = () => submit(b.dataset.rel));
    };
    const setMode = m => { mode = m; sel.length = 0; svg.classList.toggle('amode', m === 'a'); svg.classList.toggle('tmode', m === 't'); bd.querySelectorAll('[data-md]').forEach(b => b.classList.toggle('on', b.dataset.md === m)); drawSel(); };
    bd.querySelectorAll('[data-md]').forEach(b => b.onclick = () => setMode(b.dataset.md));
    svg.querySelectorAll('[data-a],[data-r]').forEach(x => x.onclick = () => { const id = x.dataset.a || x.dataset.r; const i = sel.indexOf(id); i >= 0 ? sel.splice(i, 1) : sel.push(id); drawSel(); bmsg(''); });
    bd.querySelector('#bdc').onclick = () => { sel.length = 0; drawSel(); bmsg(''); };
    bd.querySelector('#bdh').onclick = () => onHelp && onHelp();
    const drawFacts = () => { bd.querySelector('#bdf').innerHTML = facts.length ? facts.map(f => `<span class="bd-f ${f.cls}">${F(show(f.id, f.ord))}${f.by === 'app' ? '<small> 앱</small>' : ''}</span>`).join('') : '<span class="t-sub">아직 없어</span>'; };
    const marksFor = f => { const [type, rest] = f.split(':'); if (type === 'sim' || type === 'cong') return; rest.split(',').forEach(a => svg.querySelector(`[data-m="${a}"]`)?.classList.add('on')); };
    const addFact = (id, by, ord) => { if (facts.find(f => f.id === id)) return; const cls = P.useful.includes(id) || id.startsWith('sim') ? 'use' : 'off'; facts.push({id, by, cls, ord}); if (cls === 'use') marksFor(id); drawFacts(); };
    // 참·거짓 판정
    function judge(type, items) {
      if (type === 'sim' || type === 'cong') {
        if (items.length !== 2 || items.some(x => P.regs[x].length !== 3)) return {ok: false, why: '닮음·합동은 <b>삼각형 두 개</b>를 골라 줘.'};
        const o = simOrder(items[0], items[1]); if (!o) return {ok: false, why: '두 삼각형의 각을 다시 봐. 크기가 같은 각이 두 쌍 있어?'};
        if (type === 'cong') return {ok: false, why: '각은 같아도 변의 길이가 달라. 크기가 다른 같은 모양이면 뭐라고 해?'};
        return {ok: true};
      }
      const v = items.map(ang), s = v.reduce((x, y) => x + y, 0);
      if (type === 'eq') return items.length === 2 && near(v[0], v[1]) ? {ok: true} : {ok: false, why: items.length !== 2 ? '「크기가 같다」는 <b>각 두 개</b>를 골라 줘.' : '두 각을 다시 봐. 정말 크기가 같아?'};
      return near(s, type === 's90' ? 90 : 180) ? {ok: true} : {ok: false, why: `고른 각들을 더하면 정말 ${type === 's90' ? 90 : 180}°가 될까? 다시 봐.`};
    }
    function submit(type) {
      const items = sel.slice(); const r = judge(type, items); const id = kid(type, items);
      sel.length = 0; drawSel();
      if (!r.ok) { bmsg(r.why, 'warn'); return onAdd && onAdd({id, ok: false, txt: items.join(',') + ' ' + type}); }
      if (facts.find(f => f.id === id)) { bmsg('이미 판에 있어.'); return; }
      onAdd && onAdd({id, ok: true, ord: items});
    }
    setMode('a');
    const log = [];
    const clear = () => $('#stp').querySelectorAll('.t-msg,.t-step,.t-row').forEach(x => { if (!x.classList.contains('t-done')) x.remove(); });
    const hl = c => { root().querySelectorAll('.cq').forEach(x => x.classList.toggle('on', +x.dataset.c === c)); svg.querySelectorAll('[data-h]').forEach(g => g.classList.toggle('on', +g.dataset.h === c)); };
    const asked = new Set();
    for (const G of P.goals) {
      clear(); say(G.p);
      let lvl = 0, wrong = 0, off = 0; const memo = [];
      const st = await new Promise(resolve => {
        const giveHelp = auto => {
          if (lvl >= G.help.length) return; const h = G.help[lvl++];
          hl(h.c || 0); (h.marks || []).forEach(a => svg.querySelector(`[data-m="${a}"]`)?.classList.add('on'));
          bmsg((auto ? '<b>힌트</b> ' : '') + FH(h.t), h.add ? 'warn' : 'hint');
          memo.push('도움 ' + lvl + '단계');
          if (h.add) { h.add.forEach(f => addFact(f, 'app')); setTimeout(() => resolve('tea'), 300); }
        };
        onHelp = () => giveHelp(false);
        onAdd = async ({id, ok, ord}) => {
          if (!ok) { wrong++; memo.push('틀린 사실: ' + show(id)); if (wrong + off >= 2 && lvl === 0) giveHelp(true); return; }
          if (id.startsWith('sim') && id === G.key) {
            if (!G.need.some(n => facts.find(f => f.id === n))) { bmsg('닮았다고 하려면 크기가 같은 각이 두 쌍 필요해. <b>직각 말고 같은 각 한 쌍</b>을 먼저 판에 넣어 봐.', 'hint'); memo.push('닮음을 먼저 고름(같은 각 근거 없이)'); return; }
            addFact(id, 'kid', ord); bmsg('맞아. ' + F(show(id, ord)) + ' — 열쇠를 찾았어!', 'ok'); G.ord = ord; return resolve(lvl ? 'ask' : 'solo');
          }
          addFact(id, 'kid', ord);
          const f = facts.find(x => x.id === id);
          if (f.cls === 'off') { off++; memo.push('안 쓰인 사실: ' + show(id)); bmsg('맞아. 판에 적어 둘게. <small>(이번 문제의 열쇠와는 조금 거리가 있어)</small>'); if (wrong + off >= 2 && lvl === 0) giveHelp(true); return; }
          bmsg('맞아. 그림에 표시했어.', 'ok');
          const w = P.why[id];
          if (w && !asked.has(w) && !id.startsWith('sim')) {
            asked.add(w); const W = P.whys[w]; bd.style.pointerEvents = 'none';
            const r = await askSay(W, P.gid); log.push({what: W.label + ' — ' + show(id), st: r.st, memo: r.memo}); bd.style.pointerEvents = '';
            if (r.st !== 'tea') await sleep(700); else await nextBtn('계속');
            $('#stp').querySelectorAll('.t-step,.t-msg').forEach(x => x.remove()); say(G.p);
          }
        };
      });
      onAdd = onHelp = null; hl(0);
      log.push({what: G.label, st, memo: st === 'solo' && !memo.length ? '' : memo.join(' · ')});
      noteAdd(show(G.key, G.ord), st === 'tea' ? 'app' : 'kid', st === 'tea' ? '설명 보고 · 앱이 씀' : '');
      bd.style.pointerEvents = 'none'; await nextBtn('다음'); bmsg('');
      for (const s of G.after) { clear(); const r = await step(s, P.gid); log.push({what: s.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo}); if (s.note) noteAdd(s.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고' : ''); }
      bd.style.pointerEvents = '';
    }
    clear(); bd.style.pointerEvents = 'none'; markDone(P.id);
    showLog(log, P.ans, `<div class="t-src" style="margin-top:8px">판에 넣은 순서: ${facts.map(f => F(show(f.id, f.ord)) + (f.by === 'app' ? '(앱)' : f.cls === 'off' ? '(안 쓰임)' : '')).join(' → ')}</div>`);
    $('#again').onclick = () => runBoard(P);
  }

  // ── 도형 「번호로 말하기」 시안 3(마스터 10/20 아이디어) — 그림의 각·변·삼각형에 번호를 붙여 「1번 각과 2번 각」처럼 말하게 한다.
  //    번호는 생각하는 차례에 맞춰 그 단계에 필요한 것만 켜진다(화면은 질문 하나 + 그림 + 마이크). 번호는 문제 안에서 겹치지 않는다 ──
  function figC2c() {
    const M = T(112, 190, 12), A = M(0, 12), B = M(0, 0), C = M(20, 0), D = M(20, 12), E = M(12, 0), F = M(0, 8), H = M(-6, 12);
    const AK = '#1f6fb5', SK = '#1f8a4c', TK = '#c45f0e';
    const badge = (p, n, col, sq) => sq ? `<rect x="${p[0] - 10}" y="${p[1] - 10}" width="20" height="20" rx="5" fill="${col}"/><text x="${p[0]}" y="${p[1] + 0.5}" text-anchor="middle" dominant-baseline="central" font-size="12.5" font-weight="700" fill="#fff" font-family="Malgun Gothic,sans-serif">${n}</text>`
      : `<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="${col}"/><text x="${p[0]}" y="${p[1] + 0.5}" text-anchor="middle" dominant-baseline="central" font-size="12.5" font-weight="700" fill="#fff" font-family="Malgun Gothic,sans-serif">${n}</text>`;
    const angN = (n, v, a, b, r) => { const t1 = Math.atan2(a[1] - v[1], a[0] - v[0]); let d = Math.atan2(b[1] - v[1], b[0] - v[0]) - t1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI; const m = t1 + d / 2;
      return `<g data-n="${n}"><path d="${SECT(v, a, b, r)}" fill="${AK}" fill-opacity=".18" stroke="${AK}" stroke-width="1.4"/>${badge([v[0] + (r + 13) * Math.cos(m), v[1] + (r + 13) * Math.sin(m)], n, AK)}</g>`; };
    const sideN = (n, a, b, dx, dy) => `<g data-n="${n}">${LN(a, b, `stroke="${SK}" stroke-width="5" stroke-opacity=".55"`)}${badge([(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy], n, SK, true)}</g>`;
    const triN = (n, ps, dx = 0, dy = 0) => { const c = [ps.reduce((s, p) => s + p[0], 0) / 3 + dx, ps.reduce((s, p) => s + p[1], 0) / 3 + dy]; return `<g data-n="${n}">${PG(ps, '#f7c896', `stroke="${TK}" stroke-width="2" fill-opacity=".55"`)}${badge(c, n, TK, true)}</g>`; };
    return `<svg viewBox="0 0 400 250" width="470" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif" font-size="13" fill="#1c2230">
      ${triN(4, [F, B, E], 0, 4)}${triN(5, [E, C, D], 8, 6)}${triN(10, [H, A, F], -12, -32)}
      ${PG([A, B, C, D])}${LN(D, E)}${LN(H, E)}${LN(H, A, 'stroke-width="1.2"')}${RA(E, D, F)}
      ${angN(1, E, B, F, 22)}${angN(2, E, C, D, 22)}${angN(3, F, B, E, 22)}${angN(11, F, A, H, 18)}
      ${sideN(6, F, B, 13, 0)}${sideN(7, E, C, 0, 13)}${sideN(8, B, E, 0, 13)}${sideN(9, C, D, 14, 0)}${sideN(12, A, F, 13, 0)}${sideN(13, H, A, 0, -13)}
      ${LB(A, 'A', 0, -11)}${LB(B, 'B', -10, 9)}${LB(C, 'C', 10, 9)}${LB(D, 'D', 9, -10)}${LB(E, 'E', 0, 13)}${LB(F, 'F', -11, 2)}${LB(H, 'H', -4, -11)}
      ${DIM(B, C, '20 cm', -26)}${DIM(B, A, '12 cm', 26)}</svg>`;
  }
  const N3 = {id: 'c2c', gid: 'm2-2', sec: '중2-2 · 닮음 — 「번호로 말하기」 시안 3', kind: '번호로 말하기 · 시안 3', how: '그 단계에 필요한 각·변·삼각형에만 번호가 켜짐 → 「1번 각과 2번 각은…」처럼 번호로 말하기',
    q: CL[0].qParts.map(x => typeof x === 'string' ? x : x.t).join(''), src: CL[0].src, ans: CL[0].ans,
    steps: [
      {k: 'say', on: [1, 2], label: '1번 · 2번 각', q: '1번 각과 2번 각은 어떤 관계야?',
        keys: ['1번 각과 2번 각을 더하면 90°이다(일직선 180°에서 ∠DEF 90°를 뺀다)'], ask: '점 E에서 1번 각, 직각, 2번 각이 한 직선 위에 있어. 세 각을 다 더하면 몇 도야?',
        teach: '한 직선 위의 세 각을 더하면 180°야. 가운데가 90°라서 <b>1번 + 2번 = 90°</b>.', note: '1번 + 2번 = 90°'},
      {k: 'say', on: [1, 2, 3], label: '3번 각', q: '그럼 3번 각은 어느 각과 크기가 같아? 왜?',
        keys: ['3번 각은 2번 각과 크기가 같다', '1번 + 3번도 90°이기 때문이다(직각삼각형에서 직각이 아닌 두 각의 합이 90°)'], ask: '3번 각과 1번 각이 들어 있는 삼각형은 직각삼각형이야. 1번 + 3번은 몇 도야? 1번 + 2번과 비교해 봐.',
        teach: '직각삼각형이라 1번 + 3번 = 90°, 그리고 1번 + 2번 = 90°라서 <b>3번 = 2번</b>이야.', note: '3번 = 2번'},
      {k: 'say', on: [4, 5], label: '4번 · 5번 삼각형', q: '4번 삼각형과 5번 삼각형은 어떤 관계야? 왜?',
        keys: ['두 삼각형은 닮음이다', '직각이 같고 2번 각과 3번 각이 같아서 두 각이 같다(AA 닮음)'], ask: '두 삼각형에서 크기가 같은 각을 두 쌍 찾아 봐. 그럼 두 삼각형은 어떤 관계야?',
        teach: '직각이 같고 2번 = 3번이라 두 각이 같아. 그래서 <b>4번 ∽ 5번(AA 닮음)</b>이야.', note: '4번 삼각형 ∽ 5번 삼각형 (△FBE ∽ △ECD)'},
      {k: 'input', on: [7, 8], label: '7번 · 8번 변', p: 'BE : EC = 3 : 2야. 8번 변과 7번 변의 길이를 차례대로 써 봐. <small>(쉼표로)</small>', want: ['12,8'], pre: '8번, 7번 = ',
        hint: 'BC = 20을 3 : 2로 나눠 봐.', teach: '8번(BE) = <b>12</b>, 7번(EC) = <b>8</b>', note: '8번 = 12 cm,  7번 = 8 cm'},
      {k: 'say', on: [6, 7, 8, 9], label: '6번 변 구하기', q: '6번 변의 길이를 구하려면 7번, 8번, 9번 변으로 어떤 비례식을 세워?',
        keys: ['6번 : 7번 = 8번 : 9번(대응하는 변끼리 비가 같다)'], ask: '4번 삼각형의 6번 변과 짝이 되는 5번 삼각형의 변은 몇 번이야? 8번 변의 짝은?',
        teach: '대응하는 변끼리 비가 같아서 <b>6번 : 7번 = 8번 : 9번</b>, 곧 6번 : 8 = 12 : 12야.', note: '6번 : 8 = 12 : 12  →  6번 = 8 cm'},
      {k: 'input', on: [12], label: 'AF의 길이', p: '12번 변(AF)은 몇 cm야?', want: ['4', '4cm'], pre: 'AF = ', hint: 'AB = 12에서 6번 변을 빼 봐.', teach: 'AF = 12 − 8 = <b>4 cm</b>', note: 'AF = 4 cm'},
      {k: 'say', on: [10, 4, 11, 3], label: '10번 · 4번 삼각형', q: '10번 삼각형과 4번 삼각형은 어떤 관계야? 왜?',
        keys: ['두 삼각형은 닮음이다', '11번 각과 3번 각이 맞꼭지각으로 같고, 직각(또는 AH ∥ BE의 엇각)이 같아서 두 각이 같다'], ask: '11번 각과 3번 각은 어떤 사이야? A의 각과 B의 각은 몇 도야?',
        teach: '11번과 3번은 맞꼭지각이라 같고, A와 B의 각이 모두 직각이야. 그래서 <b>10번 ∽ 4번(AA 닮음)</b>.', note: '10번 삼각형 ∽ 4번 삼각형 (△HAF ∽ △EBF)'},
      {k: 'say', on: [12, 6], label: '닮음비', q: '10번 삼각형과 4번 삼각형의 닮음비는 얼마야? 몇 번 변을 보고 알았어?',
        keys: ['12번 변(4 cm)과 6번 변(8 cm)을 보고 닮음비가 1 : 2임을 안다'], ask: '12번 변과 6번 변은 서로 짝이 되는 변이야. 각각 몇 cm였어?',
        teach: '짝이 되는 변 12번(4 cm)과 6번(8 cm)을 보면 닮음비는 <b>1 : 2</b>야.', note: '닮음비 = 12번 : 6번 = 4 : 8 = 1 : 2'},
      {k: 'input', on: [13, 8], label: 'AH의 길이', p: '13번 변(AH)은 몇 cm야?', want: ['6', '6cm'], pre: 'AH = ', hint: '13번의 짝은 8번(12 cm)이고 닮음비는 1 : 2야.', teach: 'AH = 12 × 1/2 = <b>6 cm</b>', note: 'AH = 6 cm'}]};

  async function runNum(P) {
    VARA = false;
    frame({q: P.q, src: P.src, fig: figC2c()}, `<span class="t-tag r3">중2</span><span class="t-tag">${esc(P.kind)}</span>`);
    if (!canAI()) { $('#stp').innerHTML = lockBox(); bindLock(() => runNum(P)); return; }
    const svg = root().querySelector('.t-fig svg'); svg.classList.add('nf');
    const light = ns => svg.querySelectorAll('[data-n]').forEach(g => g.classList.toggle('on', ns.includes(+g.dataset.n)));
    const clear = () => $('#stp').querySelectorAll('.t-msg,.t-step,.t-row').forEach(x => { if (!x.classList.contains('t-done')) x.remove(); });
    const log = [];
    for (const s of P.steps) {
      clear(); light(s.on);
      const r = s.k === 'say' ? await askSay(Object.assign({}, s, {q: s.q, keys: s.keys}), P.gid) : await step(s, P.gid);
      log.push({what: s.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo});
      if (s.note) noteAdd(s.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고' : '');
      if (r.st === 'tea') await nextBtn(); else await sleep(800);
      if (s.k !== 'input') { clear(); const d = document.createElement('div'); $('#stp').appendChild(d); fold(d, s.label, r.st); }
    }
    clear(); light([]); markDone(P.id);
    showLog(log, P.ans);
    $('#again').onclick = () => runNum(P);
  }

  // ════════ 화면 ════════
  const RT = {1: '1회차', 2: '2회차', 3: '3회차'};
  function home() {
    stopRec();
    const d = doneSet();
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><h1>말하는 수학 · 중등·고등 체험</h1><span class="t-sp"></span><a href="index.html">초등 앱 ›</a></div>
      <p class="t-lead">견본 문제를 직접 해 보는 체험 화면이에요. <b>말은 생각만, 식은 손으로</b> — 무엇을 할지는 짧게 말하고, 식은 누르거나 카드로 골라요. 기록은 진도에 남지 않아요.</p>
      ${canAI() ? '' : lockBox()}
      <div class="t-sec">도형 · 말하면서 따라 그리기 (10/22 시안)</div>
      <a class="t-item" href="trace.html" style="text-decoration:none"><span class="t-tag r3">시안 4</span><span class="t-tag">말 + 따라 그리기</span><div class="t-iq">말하면서 도형의 그 부분을 손가락으로 대강 따라 그리면 △ABD · ∠BAD · 선분 AB 가 입력칸에 들어가요.</div></a>
      ${(VARA = false, '')}${window.TRY_GRAPH ? TRY_GRAPH.list(d) : ''}
      <div class="t-sec">중3-1 · 03 인수분해 공식의 활용</div>
      ${(VARA = true, '')}${M3.map(it => `<button class="t-item${d.has(it.id) ? ' done' : ''}" data-id="${it.id}"><span class="t-tag r${it.r}">${RT[it.r]}</span><span class="t-tag">${esc(it.kind)}</span><div class="t-iq">${F(it.q)}</div><div class="t-how">${esc(it.how)}</div></button>`).join('')}
      ${(VARA = false, '')}${HSL.map((m, i) => `${i && HSL[i - 1].sec === m.sec ? '' : `<div class="t-sec">${esc(m.sec)}</div>`}
      <button class="t-item${d.has(m.hs.id) ? ' done' : ''}" data-id="${m.hs.id}"><span class="t-tag r3">${esc(m.tag || '1문제')}</span><span class="t-tag">${esc(m.hs.kind)}</span><div class="t-iq">${F(m.hs.q)}</div><div class="t-how">${esc(m.hs.how)}</div></button>`).join('')}
      ${CL.map(c => `<div class="t-sec">${esc(c.sec)}</div>
      <button class="t-item${d.has(c.id) ? ' done' : ''}" data-id="${c.id}"><span class="t-tag r3">시안</span><span class="t-tag">${esc(c.kind)}</span><div class="t-iq">${F(c.qParts.map(x => typeof x === 'string' ? x : x.t).join(''))}</div><div class="t-how">${esc(c.how)}</div></button>`).join('')}
      <div class="t-sec">${esc(N3.sec)}</div>
      <button class="t-item${d.has(N3.id) ? ' done' : ''}" data-id="${N3.id}"><span class="t-tag r3">시안 3</span><span class="t-tag">${esc(N3.kind)}</span><div class="t-iq">${F(N3.q)}</div><div class="t-how">${esc(N3.how)}</div></button>
      <div class="t-src" style="margin-top:26px;text-align:center">체험판 0.9 (10/23 · 이차함수 그래프 누르기·카드·대강 그리기 · 학원 기기는 네이버 음성 인식) · ${esc(A.VERSION)}</div>
    </div>`;
    root().querySelectorAll('.t-item').forEach(b => b.onclick = () => open(b.dataset.id));
    bindLock(home);
  }
  function lockBox() {
    return `<div class="t-lock" id="lock">AI 채점은 <b>학원 태블릿</b>에서만 돼요. 여기서 해 보려면 선생님 PIN을 넣어 주세요. <span style="white-space:nowrap"><input id="lockPin" type="password" inputmode="numeric" placeholder="PIN"><button class="t-btn small" id="lockGo">열기</button></span><br><small>누르기·카드·짧은 말은 PIN 없이도 돼요.</small></div>`;
  }
  function bindLock(after) {
    const go = $('#lockGo'); if (!go) return;
    go.onclick = async () => { if (await A.checkPin($('#lockPin').value)) { sessionStorage.setItem('try:unlock', '1'); toast('이 창에서 AI 채점이 열렸어요'); after(); } else toast('PIN이 맞지 않아요'); };
  }
  function open(id) {
    if (window.TRY_GRAPH && TRY_GRAPH.has(id)) { window.scrollTo(0, 0); VARA = false; return TRY_GRAPH.open(id); }   // 이차함수 그래프 견본(graph.js)
    const hm = HSL.find(m => m.hs.id === id);
    window.scrollTo(0, 0); VARA = !hm;
    if (hm) return runMap(hm);
    const cm = CL.find(c => c.id === id); if (cm) return runCond(cm);
    if (id === B2.id) return runBoard(B2);   // 시안 2 — 마스터 10/20 기각, 목록에서 뺌(코드만 남김)
    if (id === N3.id) return runNum(N3);
    const it = M3.find(x => x.id === id); if (!it) return home();
    if (it.type === 'say') return runSay(it);
    return runSteps(it);
  }
  function frame(it, tags) {
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><button class="t-back" id="back">‹ 목록</button><span class="t-sp"></span>${tags}</div>
      <div class="t-card"><div class="t-q">${F(it.q)}</div>${it.speak ? '<button class="t-say" id="sayQ">🔊 질문 듣기</button>' : ''}<div class="t-src">${esc(it.src || '')}</div>${it.fig ? `<div class="t-fig">${it.fig}</div>` : ''}<div id="mapc"></div>
        <div id="stp"></div><div class="t-note" id="note" hidden><h3>풀이 노트</h3><div id="nl"></div></div></div>
      <div id="after"></div></div>`;
    $('#back').onclick = () => { hush(); home(); };
    if (it.speak) $('#sayQ').onclick = () => sayQ(it.speak, $('#sayQ'));
  }
  const noteAdd = (t, cls, by) => { $('#note').hidden = false; const d = document.createElement('div'); d.className = 't-nl ' + (cls || ''); d.innerHTML = F(t) + (by ? `<small>${esc(by)}</small>` : ''); $('#nl').appendChild(d); };
  const say = (html, cls) => { const d = document.createElement('div'); d.className = 't-msg ' + (cls || 'hint'); d.innerHTML = html; $('#stp').appendChild(d); d.scrollIntoView({block: 'nearest', behavior: 'smooth'}); return d; };
  const PILL = {solo: '혼자', ask: '되묻기 뒤', tea: '설명 보고', app: '앱이 써 줌'};
  /* 끝난 단계는 한 줄로 접는다(대전제 3 — 지금 할 일 하나만 크게). 무엇을 했는지는 풀이 노트에 남는다 */
  const fold = (el, label, st) => { el.className = 't-done'; el.innerHTML = `<span class="t-ck">✓</span> ${esc(label)} <span class="t-pill ${st}">${PILL[st] || ''}</span>`; };
  function showLog(log, ans, extra) {
    $('#after').innerHTML = `<div class="t-card"><div class="t-prompt" style="margin-bottom:6px">모범 답</div><div style="font-size:16px;line-height:1.7">${F(ans)}</div></div>
      <div class="t-card t-log"><div class="t-prompt" style="margin-bottom:4px">선생님·부모님에게 보이는 기록 <small style="color:#5b6270;font-weight:500">(체험이라 저장 안 함)</small></div>
        <table>${log.map(r => `<tr><td>${F(r.what)}${r.memo ? `<br><small style="color:#8a1c16">${esc(r.memo)}</small>` : ''}</td><td><span class="t-pill ${r.st}">${PILL[r.st]}</span></td></tr>`).join('')}</table>${extra || ''}</div>
      <div class="t-row"><button class="t-btn" id="again">다시 해 보기</button><span class="t-sp"></span><button class="t-btn pri" id="toList">목록으로</button></div>`;
    $('#again').onclick = () => { $('#after').innerHTML = ''; return null; };
    $('#toList').onclick = home;
    $('#after').scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  // ── ① 말로 답하기 ──
  function runSay(it) {
    frame(it, `<span class="t-tag r${it.r}">${RT[it.r]}</span><span class="t-tag">${esc(it.kind)}</span>`);
    const st = it.keys.map(() => null), answers = [], asked = new Set();
    if (!canAI()) { $('#stp').innerHTML = lockBox(); bindLock(() => runSay(it)); return; }
    const box = document.createElement('div'); box.className = 't-step';
    const ask = prompt => { $('#stp').querySelectorAll('.t-msg').forEach(m => m.remove()); const p = document.createElement('div'); p.className = 't-step'; p.innerHTML = prompt ? `<div class="t-prompt">${prompt}</div>` : ''; const b = document.createElement('div'); p.appendChild(b); $('#stp').appendChild(p); voice(b, t => judge(t, p)); };
    async function judge(t, p) {
      p.innerHTML = `<div class="t-ans"><b>내 답</b> ${esc(t)}</div><div class="t-think">채점하는 중…</div>`;
      answers.push(t);
      let g; try { g = await grade(it.q, it.keys, t, answers.slice(0, -1).join(' / '), 'm3-1'); } catch (e) { p.querySelector('.t-think').remove(); toast(e.message); answers.pop(); return ask(''); }
      p.querySelector('.t-think').remove();
      g.hits.forEach((h, i) => { if (h && !st[i]) st[i] = answers.length === 1 ? 'solo' : 'ask'; });
      if (st.every(Boolean)) {
        say(`<b>${esc(g.ack || '좋아!')}</b> 핵심을 모두 짚었어.`, 'ok'); return end();
      }
      const k = st.findIndex((s, i) => !s && !asked.has(i));
      if (k >= 0) { asked.add(k); say(`${esc(g.ack)}${g.mis ? `<br><small>살짝 다른 생각: ${esc(g.mis)}</small>` : ''}`); return ask(F(it.asks[k])); }
      st.forEach((s, i) => { if (!s) st[i] = 'tea'; });
      say(`<b>설명</b> ${F(it.teach)}`, 'warn'); end();
    }
    function end() {
      markDone(it.id);
      showLog(it.keys.map((k, i) => ({what: k, st: st[i]})), it.ans);
      $('#again').onclick = () => runSay(it);
    }
    ask('');
  }

  // ── ② 단계형(누르기 · 카드 · 짧은 말 · 칸 입력 · 고르기) — 한 단계씩, 끝나면 풀이 노트에 한 줄 ──
  async function step(s, gid) {
    return new Promise(resolve => {
      const w = document.createElement('div'); w.className = 't-step'; $('#stp').appendChild(w);
      w.innerHTML = `<div class="t-prompt"><span class="t-pk">${esc(s.label)}</span>${FH(s.p)}</div><div class="t-body"></div>`;
      const body = w.querySelector('.t-body');
      let tries = 0; const memo = [];
      const finish = (st, extraMemo) => { if (extraMemo) memo.push(extraMemo); fold(w, s.label, st); resolve({st, memo: memo.join(' · ')}); };
      const msg = (h, c) => { body.querySelectorAll('.t-msg').forEach(x => x.remove()); const d = document.createElement('div'); d.className = 't-msg ' + (c || 'hint'); d.innerHTML = h; body.appendChild(d); };
      if (s.k === 'tap') {
        body.innerHTML = `<div class="t-expr">${s.toks.map((x, i) => typeof x === 'string' ? `<span class="t-tok">${F(x)}</span>` : `<span class="t-tok sel" data-i="${i}" data-g="${x.g}">${F(x.t)}</span>`).join('')}</div>${s.multi ? '<div class="t-row"><span class="t-sp"></span><button class="t-btn pri" id="tapOk" disabled>다 골랐어</button></div>' : ''}`;
        const toks = [...body.querySelectorAll('.t-tok.sel')];
        if (!s.multi) {
          toks.forEach(el => el.onclick = () => {
            toks.forEach(t => t.classList.remove('no'));
            if (el.dataset.g === s.want) { toks.filter(t => t.dataset.g === s.want).forEach(t => t.classList.add('on')); toks.forEach(t => t.onclick = null); msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 600); }
            el.classList.add('no'); tries++; memo.push('「' + el.textContent + '」 누름');
            if (tries >= 2) { toks.filter(t => t.dataset.g === s.want).forEach(t => t.classList.add('on')); toks.forEach(t => t.onclick = null); msg(FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1600); }
            msg(F(s.hint));
          });
        } else {
          const ok = body.querySelector('#tapOk'); const sel = new Set();
          toks.forEach(el => el.onclick = () => { const g = +el.dataset.g; sel.has(g) ? sel.delete(g) : sel.add(g); el.classList.toggle('on'); el.classList.remove('no'); ok.disabled = !sel.size; });
          ok.onclick = () => {
            const want = new Set(s.want), right = sel.size === want.size && [...sel].every(g => want.has(g));
            if (right) { toks.forEach(t => t.onclick = null); ok.remove(); msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 600); }
            tries++; const trap = [...sel].find(g => s.trapMsg && s.trapMsg[g]); memo.push('고른 항: ' + [...sel].map(g => s.toks[g].t).join(', '));
            if (tries >= 2) { toks.forEach(t => { t.onclick = null; t.classList.toggle('on', want.has(+t.dataset.g)); }); ok.remove(); msg(FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1600); }
            msg(F(trap != null ? s.trapMsg[trap] : s.hint));
          };
        }
      } else if (s.k === 'cards') {
        const tray = [], deck = s.deck.slice();
        body.innerHTML = `<div class="t-tray" id="tray"></div><div class="t-deck" id="deck"></div><div class="t-row"><button class="t-btn small" id="cClr">비우기</button><span class="t-sp"></span><button class="t-btn pri" id="cOk" disabled>다 놓았어</button></div>`;
        const draw = () => {
          body.querySelector('#tray').innerHTML = tray.length ? tray.map((c, i) => `<button class="t-cd in" data-t="${i}">${F(c)}</button>`).join('') : '<span class="t-tph">아래 카드를 눌러 여기에 놓아 봐</span>';
          body.querySelector('#deck').innerHTML = deck.map((c, i) => `<button class="t-cd${tray.includes(c) ? ' gone' : ''}" data-d="${i}">${F(c)}</button>`).join('');
          body.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { tray.splice(+b.dataset.t, 1); draw(); });
          body.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { const c = deck[+b.dataset.d]; if (!tray.includes(c)) tray.push(c); draw(); });
          body.querySelector('#cOk').disabled = !tray.length;
        };
        body.querySelector('#cClr').onclick = () => { tray.length = 0; draw(); };
        body.querySelector('#cOk').onclick = () => {
          const want = s.want.slice().sort(), got = tray.slice().sort();
          if (want.length === got.length && want.every((c, i) => c === got[i])) { body.querySelectorAll('button').forEach(b => b.disabled = true); msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 600); }
          tries++; const trap = tray.find(c => s.trap && s.trap[c]); memo.push('고른 카드: ' + tray.join(' '));
          if (tries >= 2) { tray.length = 0; tray.push(...s.want); draw(); body.querySelectorAll('button').forEach(b => b.disabled = true); msg('바른 인수는 ' + s.want.map(x => F(x)).join(' ') + ' 이야.', 'warn'); return setTimeout(() => finish('tea'), 1800); }
          msg(trap ? F(s.trap[trap]) : (tray.length < s.want.length ? '인수가 아직 모자라. 더 인수분해되는 건 없는지 봐.' : '필요 없는 카드가 섞여 있어. 곱해서 처음 식이 나오는지 확인해 봐.'));
        };
        draw();
      } else if (s.k === 'say') {
        const b = document.createElement('div'); body.appendChild(b);
        const run = () => voice(b, async t => {
          b.innerHTML = `<div class="t-ans"><b>내 답</b> ${esc(t)}</div>`;
          let hit = s.re && s.re.test(t);
          if (!hit && canAI()) { b.insertAdjacentHTML('beforeend', '<div class="t-think">채점하는 중…</div>'); try { hit = (await grade(s.p.replace(/<[^>]+>/g, ''), [s.key], t, '', gid)).hits[0]; } catch (e) { toast(e.message); } b.querySelector('.t-think')?.remove(); }
          if (hit) { msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 600); }
          tries++; memo.push('말한 것: ' + t);
          if (tries >= 2) { msg(FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1800); }
          msg(F(s.ask)); const nb = document.createElement('div'); body.appendChild(nb); voiceAgain(nb);
        }, '짧게 말해 봐');
        const voiceAgain = nb => voice(nb, async t => { nb.innerHTML = ''; b.innerHTML = `<div class="t-ans"><b>내 답</b> ${esc(t)}</div>`; let hit = s.re && s.re.test(t);
          if (!hit && canAI()) { try { hit = (await grade(s.p.replace(/<[^>]+>/g, ''), [s.key], t, memo.join(' / '), gid)).hits[0]; } catch (e) { toast(e.message); } }
          if (hit) { msg('맞아.', 'ok'); return setTimeout(() => finish('ask'), 600); }
          memo.push('말한 것: ' + t); msg(FH(s.teach), 'warn'); setTimeout(() => finish('tea'), 1800); }, '짧게 말해 봐');
        run();
      } else if (s.k === 'input') {
        body.innerHTML = `<div class="t-row"><span style="font-size:18px">${F(s.pre || '')}</span><input class="t-num" id="inp" autocomplete="off"><button class="t-btn pri" id="inOk">확인</button></div>${s.keys ? `<div class="t-keys">${s.keys.map(k => `<button class="t-key" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>` : ''}`;
        const inp = body.querySelector('#inp');
        body.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { inp.value += b.dataset.k; inp.focus(); });
        const norm = v => String(v).replace(/\s+/g, '').replace(/루트/g, '√').replace(/[−–]/g, '-').replace(/[()]/g, m => m);
        body.querySelector('#inOk').onclick = () => {
          const v = norm(inp.value); if (!v) return;
          if (s.want.map(norm).includes(v) || s.want.map(norm).includes(v.replace(/^\(|\)$/g, ''))) { inp.disabled = true; msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 600); }
          tries++; memo.push('쓴 답: ' + inp.value);
          if (tries >= 2) { inp.disabled = true; msg(FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1600); }
          msg(F(s.hint));
        };
        inp.onkeydown = e => { if (e.key === 'Enter') body.querySelector('#inOk').click(); };
      } else if (s.k === 'choice') {
        body.innerHTML = `<div class="t-row">${s.opts.map(o => `<button class="t-key" data-o="${esc(o)}" style="min-width:56px;font-size:20px">${esc(o)}</button>`).join('')}</div>`;
        body.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
          if (b.dataset.o === s.want) { body.querySelectorAll('button').forEach(x => x.disabled = true); b.style.background = '#d9f2e3'; msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 500); }
          tries++; b.style.background = '#fbe9e7'; memo.push('「' + b.dataset.o + '」 고름');
          if (tries >= 2) { body.querySelectorAll('button').forEach(x => x.disabled = true); msg('바른 답은 ' + esc(s.want) + '야.', 'warn'); return setTimeout(() => finish('tea'), 1400); }
          msg(F(s.hint));
        });
      }
    });
  }

  async function runSteps(it) {
    frame(it, `<span class="t-tag r${it.r}">${RT[it.r]}</span><span class="t-tag">${esc(it.kind)}</span>`);
    const log = [];
    for (const s of it.steps) {
      if (s.pre) noteAdd(s.pre, 'app', '앱이 써 줌');
      const r = await step(s, 'm3-1');
      log.push({what: s.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo});
      if (s.note) noteAdd(s.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고' : '');
      await sleep(200);
    }
    markDone(it.id);
    showLog(log, it.ans);
    $('#again').onclick = () => runSteps(it);
  }

  // ── ③ 고등 — 지점 지도 ──
  async function runMap(M) {
    const HS = M.hs, ST = M.st, PATH = M.path, START_KEYS = M.start, GID = M.gid;
    const it = Object.assign({fig: M.fig()}, HS);
    frame(it, `<span class="t-tag r3">${esc(M.band || '고등')}</span><span class="t-tag">${esc(HS.kind)}</span>`);
    if (!canAI()) { $('#stp').innerHTML = lockBox(); bindLock(() => runMap(M)); return; }
    const status = {}; let path = PATH.A; const log = [];
    // 아직 안 간 지점은 이름을 가린다 — 지점 이름이 곧 풀이 길이라 미리 보이면 답을 알려 주는 셈(대전제: 질문이 답을 미리 말하지 않는다)
    const drawMap = cur => { $('#mapc').innerHTML = `<div class="t-map">${path.map(id => `<span class="t-st ${status[id] || ''}${id === cur ? ' cur' : ''}">${status[id] ? esc(ST[id].name) : id === cur ? '지금' : '?'}</span>`).join('')}</div>`; };
    drawMap();
    // 첫마디 — 할 일을 생각나는 만큼
    const first = await new Promise(res => { const p = document.createElement('div'); p.className = 't-step'; p.innerHTML = '<div class="t-prompt">어떻게 풀지, <b>처음에 할 일</b>을 말해 봐. 생각나는 만큼 이어서 말해도 돼. <small>(식은 안 읽어도 돼 — 무엇을 할지만)</small></div>'; const b = document.createElement('div'); p.appendChild(b); $('#stp').appendChild(p); voice(b, t => { p.innerHTML = `<div class="t-ans"><b>내 답</b> ${esc(t)}</div>`; res(t); }); });
    let g = null;
    for (let i = 0; i < 2 && !g; i++) { try { g = await grade(HS.q, START_KEYS.map(id => ST[id].sum), first, '', GID); } catch (e) { toast(e.message); } }
    const hit = {}; if (g) START_KEYS.forEach((id, i) => { if (g.hits[i]) hit[id] = true; });
    if (M.bIds.some(id => hit[id]) && !(M.bOnlyIfNot && hit[M.bOnlyIfNot])) { path = PATH.B; say(M.bMsg, 'ok'); }
    else if (Object.keys(hit).length) say(`${esc(g.ack || '좋아.')} 그 생각으로 이어 가 보자.`, 'ok');
    else say('좋아, 하나씩 짚어 보자.');
    for (const id of path) if (hit[id]) status[id] = 'solo';
    drawMap();
    // 지점마다 — 이미 말한 지점은 식만 써 주고, 못 간 첫 지점부터 묻는다
    for (const id of path) {
      const s = ST[id]; drawMap(id); $('#stp').querySelectorAll('.t-msg,.t-step').forEach(x => { if (!x.classList.contains('t-done')) x.remove(); });
      if (!status[id] && s.keys.length && s.q) {
        const st = s.keys.map(() => false); let tries = 0; const said = [];
        while (true) {
          const t = await new Promise(res => { const p = document.createElement('div'); p.className = 't-step'; p.innerHTML = `<div class="t-prompt"><span class="t-pk">지점 ${path.indexOf(id) + 1}</span>${F(tries ? s.ask : s.q)}</div>`; const b = document.createElement('div'); p.appendChild(b); $('#stp').appendChild(p); voice(b, t => { p.innerHTML = `<div class="t-prompt"><span class="t-pk">지점 ${path.indexOf(id) + 1}</span>${F(tries ? s.ask : s.q)}</div><div class="t-ans"><b>내 답</b> ${esc(t)}</div>`; res(t); }); });
          said.push(t);
          let r = null; try { r = await grade(tries ? s.ask : s.q, s.keys, t, said.slice(0, -1).join(' / '), GID); } catch (e) { toast(e.message); continue; }
          r.hits.forEach((h, i) => { if (h) st[i] = true; });
          if (st.every(Boolean)) { status[id] = tries ? 'ask' : 'solo'; say(`<b>${esc(r.ack || '맞아.')}</b>`, 'ok'); break; }
          tries++;
          if (tries >= 2) { status[id] = 'tea'; say(`<b>설명</b> ${F(s.teach)}`, 'warn'); log.push({what: s.name, st: 'tea', memo: '말한 것: ' + said.join(' / ')}); break; }
          if (r.mis) say(`살짝 다른 생각: ${esc(r.mis)}`);
        }
      } else if (!status[id] && !s.q && s.keys.length) status[id] = 'solo';
      if (status[id] && !log.find(x => x.what === s.name)) log.push({what: s.name, st: status[id]});
      if (status[id] && s.q) { await sleep(700); $('#stp').querySelectorAll('.t-msg,.t-step').forEach(x => { if (!x.classList.contains('t-done')) x.remove(); }); const d = document.createElement('div'); $('#stp').appendChild(d); fold(d, s.name, status[id]); }
      if (s.note) noteAdd(s.note, status[id] === 'tea' ? 'app' : 'kid', s.noteBy || (status[id] === 'tea' ? '설명 보고 · 앱이 씀' : ''));
      for (const x of (s.extra || [])) {
        if (x.skipIfHit && hit[id]) { if (x.note) noteAdd(x.note, 'kid', ''); continue; }   // 첫마디에서 이미 말한 것은 다시 묻지 않는다
        const r = await step(x, GID);
        log.push({what: x.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo});
        if (x.note) noteAdd(x.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고' : '');
      }
      if (!status[id]) status[id] = log.filter(x => (s.extra || []).some(e => e.label === x.what)).some(x => x.st === 'tea') ? 'tea' : 'solo';
      drawMap();
      await sleep(150);
    }
    drawMap();
    markDone(HS.id);
    showLog(log, HS.ans, `<div class="t-src" style="margin-top:8px">지점 지도: ${path.map(id => `${ST[id].name}(${PILL[status[id]] || '-'})`).join(' → ')}</div>`);
    $('#again').onclick = () => runMap(M);
  }

  A.tryStart = home; A.tryGrade = grade;   // 시험용
  A.tryKit = {frame, step, noteAdd, showLog, markDone, fold, F, FH, sleep};   // graph.js(이차함수 그래프 조작 견본)가 쓰는 도구
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', home); else home();
})();
