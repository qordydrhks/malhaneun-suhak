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
      box.querySelector('#vtw').onclick = () => { stopRec(); typed = !typed; draw(); };
      box.querySelector('#vclr').onclick = () => { stopRec(); text = ''; if (typed) box.querySelector('#vta').value = ''; upd(''); };
      sub.onclick = () => { stopRec(); const t = (typed ? box.querySelector('#vta').value : text).trim(); if (t) onSubmit(fix(t)); };
      const mic = box.querySelector('#vmic');
      if (mic) mic.onclick = () => {
        if (REC) { stopRec(); mic.classList.remove('on'); return; }
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

  // ════════ 화면 ════════
  const RT = {1: '1회차', 2: '2회차', 3: '3회차'};
  function home() {
    stopRec();
    const d = doneSet();
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><h1>말하는 수학 · 중등·고등 체험</h1><span class="t-sp"></span><a href="index.html">초등 앱 ›</a></div>
      <p class="t-lead">견본 문제를 직접 해 보는 체험 화면이에요. <b>말은 생각만, 식은 손으로</b> — 무엇을 할지는 짧게 말하고, 식은 누르거나 카드로 골라요. 기록은 진도에 남지 않아요.</p>
      ${canAI() ? '' : lockBox()}
      <div class="t-sec">중3-1 · 03 인수분해 공식의 활용</div>
      ${(VARA = true, '')}${M3.map(it => `<button class="t-item${d.has(it.id) ? ' done' : ''}" data-id="${it.id}"><span class="t-tag r${it.r}">${RT[it.r]}</span><span class="t-tag">${esc(it.kind)}</span><div class="t-iq">${F(it.q)}</div><div class="t-how">${esc(it.how)}</div></button>`).join('')}
      ${(VARA = false, '')}${HSL.map(m => `<div class="t-sec">${esc(m.sec)}</div>
      <button class="t-item${d.has(m.hs.id) ? ' done' : ''}" data-id="${m.hs.id}"><span class="t-tag r3">1문제</span><span class="t-tag">${esc(m.hs.kind)}</span><div class="t-iq">${F(m.hs.q)}</div><div class="t-how">${esc(m.hs.how)}</div></button>`).join('')}
      <div class="t-src" style="margin-top:26px;text-align:center">체험판 0.2 · ${esc(A.VERSION)}</div>
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
    const hm = HSL.find(m => m.hs.id === id);
    window.scrollTo(0, 0); VARA = !hm;
    if (hm) return runMap(hm);
    const it = M3.find(x => x.id === id); if (!it) return home();
    if (it.type === 'say') return runSay(it);
    return runSteps(it);
  }
  function frame(it, tags) {
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><button class="t-back" id="back">‹ 목록</button><span class="t-sp"></span>${tags}</div>
      <div class="t-card"><div class="t-q">${F(it.q)}</div><div class="t-src">${esc(it.src || '')}</div>${it.fig ? `<div class="t-fig">${it.fig}</div>` : ''}<div id="mapc"></div>
        <div id="stp"></div><div class="t-note" id="note" hidden><h3>풀이 노트</h3><div id="nl"></div></div></div>
      <div id="after"></div></div>`;
    $('#back').onclick = home;
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
    frame(it, `<span class="t-tag r3">고등</span><span class="t-tag">${esc(HS.kind)}</span>`);
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', home); else home();
})();
