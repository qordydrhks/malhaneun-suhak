/* 네이버 CLOVA 실시간 음성 인식 — 브라우저 쪽 (10/23 · 따라 그리기 시안 · 중고등 체험판이 같이 씀)
   마이크 → AudioWorklet 으로 16kHz·16bit·1채널 PCM → 0.1초씩 웹소켓 → Supabase 함수 clova-stt → 네이버(gRPC).
   키는 서버 함수에만 있다. 여기 공개 키(sb_publishable_)는 core.js 와 같은, 누구나 보는 키.
   글자는 0.4초 안팎의 확정 조각으로 오고(바뀌지 않음), 글자마다 말한 시각이 붙는다 → 낱말별 시각(벽시계 ms)으로 바꿔 준다.

   쓰는 법
     if (CLOVA.ok()) const c = CLOVA.start({
       pts: () => ['A','B','C'],        // 대문자로 바꿀 점·문자 이름(없으면 [])
       onWords: ws => …,                // [{w:'삼각형', s:시각}, …] 이번에 켠 뒤 들은 낱말 전부
       onState: st => …,                // 'on' 듣는 중 · 'wait' 마지막 조각 기다림 · 'off' 끝
       onFail: msg => …,                // 연결이 안 됨(아직 들은 글자 없음) → 부른 쪽이 브라우저 음성 인식으로 바꾼다
       onError: msg => … });            // 그 밖의 오류·알림(토스트로)
     c.finish() → Promise(남은 글자까지 다 받은 뒤)  ·  c.abort() 바로 끊기 */
(() => {
  'use strict';
  const STT_URL = 'wss://cnyrbxsmxwajhlrvcdml.supabase.co/functions/v1/clova-stt';
  const STT_KEY = 'sb_publishable_e2iVXV5K1sl7-kJ-d3v1Ow_VEzNUJGv';

  // 「a b d와」→ABD와 · 「acd에서」→ACD에서 · 「a 씨가」→AC가 · 「sAS」→SAS. pts 에 있는 이름일 때만 대문자로(x·y 같은 문자는 그대로)
  const LET = {에이치: 'H', 에이: 'A', 에프: 'F', 비: 'B', 씨: 'C', 디: 'D', 지: 'G'};   // 「이」(E)는 우리말과 헷갈려 뺌
  function tidyLatin(ws, pts) {
    const isPt = s => s.length > 0 && [...s.toUpperCase()].every(ch => pts.includes(ch)), out = [];
    const NM = '(?:에이치|에이|에프|비|씨|디|지)', ok = n => pts.includes(LET[n]);
    const pre = [];   // 한 낱말 안에 붙은 글자 이름 풀기: 「변에이」→ 변 + A · 「D씨도」→ DC도
    for (const x of ws) {
      let w = x.w, m = w.match(new RegExp('^(변|선분|각|점|삼각형|사각형)(' + NM + '+)(.*)$'));
      if (m && m[2].match(new RegExp(NM, 'g')).every(ok)) { pre.push({w: m[1], s: x.s}); w = m[2].match(new RegExp(NM, 'g')).map(n => LET[n]).join('') + m[3]; }
      const nm = w.match(new RegExp('^(' + NM + '+)(.*)$')), last = pre[pre.length - 1];   // 「각 디씨에이와」처럼 이름 말 뒤에 띄워 말한 글자 이름
      if (nm && last && /^(변|선분|각|점|삼각형|사각형)$/.test(last.w) && nm[1].match(new RegExp(NM, 'g')).every(ok)) w = nm[1].match(new RegExp(NM, 'g')).map(n => LET[n]).join('') + nm[2];
      let k; while ((k = w.match(new RegExp('^([A-Za-z]+)(' + NM + ')(.*)$'))) && ok(k[2]) && isPt(k[1])) w = k[1] + LET[k[2]] + k[3];
      pre.push({w, s: x.s});
    }
    for (const x of pre) {
      let w = x.w; const m = w.match(/^([A-Za-z]+)(.*)$/);
      if (m && /^(sas|asa|sss|aa|rhs|rha)$/i.test(m[1])) w = m[1].toUpperCase() + m[2];
      else if (m && isPt(m[1])) w = m[1].toUpperCase() + m[2];
      const prev = out[out.length - 1], pl = prev && /^[A-Z]+$/.test(prev.w);
      const k = w.match(/^(에이치|에이|에프|비|씨|디|지)(.*)$/);
      if (pl && k && pts.includes(LET[k[1]])) { prev.w += LET[k[1]] + k[2]; continue; }   // 앞이 점 이름이면 「씨가」→ C가
      if (prev && /[A-Za-z]$/.test(prev.w) && /^(와|과|는|은|이|가|를|을|의|에|에서|로|으로|도|만)$/.test(w)) { prev.w += w; continue; }   // 「ABD 와」 → ABD와
      const lead = (w.match(/^[A-Z]+/) || [''])[0];
      if (pl && lead && isPt(lead) && (prev.w.length === 1 || lead.length === 1)) { prev.w += w; continue; }   // 「A B D와」 → ABD와 (「AB AC」처럼 둘 다 긴 것은 안 붙임)
      out.push({w, s: x.s});
    }
    return out;
  }
  function words(chars, pts) {   // 글자별 시각 → 낱말별 시각
    const ws = []; let cur = null;
    chars.forEach(c => {
      if (/^\s*$/.test(c.c)) { cur = null; return; }
      if (cur && /^[A-Za-z]/.test(c.c) && /[가-힣]$/.test(cur.w)) cur = null;   // 「삼각형a」처럼 붙여 오면 한글 뒤 알파벳에서 띄운다(알파벳 뒤 한글은 조사라 붙임)
      if (!cur) { cur = {w: '', s: c.t}; ws.push(cur); } cur.w += c.c.trim();
    });
    return tidyLatin(ws, pts || []);
  }

  const WORKLET = `class P extends AudioWorkletProcessor{constructor(){super();this.r=sampleRate/16000;this.p=0;this.b=new Int16Array(1600);this.n=0}
process(i){const c=i[0]&&i[0][0];if(!c)return true;for(;this.p<c.length;this.p+=this.r){const k=Math.floor(this.p),f=this.p-k,v0=c[k],v1=k+1<c.length?c[k+1]:v0;let v=v0+(v1-v0)*f;v=v<-1?-1:v>1?1:v;
this.b[this.n++]=v<0?v*32768:v*32767;if(this.n===1600){this.port.postMessage(this.b.buffer,[this.b.buffer]);this.b=new Int16Array(1600);this.n=0}}this.p-=c.length;return true}}
registerProcessor('pcm16',P)`;

  function start(o) {
    const noop = () => {}, onWords = o.onWords || noop, onState = o.onState || noop, onFail = o.onFail || noop, onError = o.onError || noop;
    const C = {clova: true, ended: false, closed: false};
    let ws = null, ctx = null, stream = null, base = null, killTimer = 0;
    const q = [], chars = [];
    let doneRes; C.done = new Promise(r => { doneRes = r; });
    const cleanup = () => { try { stream && stream.getTracks().forEach(t => t.stop()); } catch (e) {} try { ctx && ctx.close(); } catch (e) {} stream = ctx = null; };
    const close = msg => {   // 끝(정상·오류 모두, 한 번만)
      if (C.closed) return; C.closed = true; clearTimeout(killTimer); cleanup();
      try { ws && ws.readyState <= 1 && ws.close(); } catch (e) {}
      if (msg) onError(msg);
      onState('off'); doneRes();
    };
    const fail = msg => {   // 아직 들은 글자가 없으면 부른 쪽이 브라우저 음성 인식으로 바꾸게 onFail, 있으면 여기서 끝
      if (C.closed) return;
      if (chars.length || C.ended) return close(C.ended ? '' : '음성 인식 연결이 끊겼어. 마이크를 다시 눌러 줘');
      close(); onFail(msg);
    };
    C.finish = () => {   // 「다 말함」 — 남은 글자가 다 올 때까지 기다린다(최대 6초)
      if (!C.ended && !C.closed) {
        C.ended = true; cleanup(); onState('wait');
        if (ws && ws.readyState === 1) ws.send(JSON.stringify({type: 'end'}));
        else if (!ws) close();   // 아직 연결 전(마이크 허락 중) — 보낸 소리가 없다
        killTimer = setTimeout(() => close(), 6000);
      }
      return C.done;
    };
    C.abort = () => close();
    const onTr = m => {
      if (base == null) return;
      const al = (m.al || []).filter(a => a[0] !== '');
      if (al.length) al.forEach(a => chars.push({c: a[0], t: base + a[1]}));
      else if (m.text) [...m.text].forEach(c => chars.push({c, t: base + (m.s || 0)}));
      onWords(words(chars, o.pts ? o.pts() : []));
    };
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({audio: {channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true}});
      } catch (e) { C.closed = true; onState('off'); doneRes(); return onError('마이크가 막혀 있어. 글로 써 줘 (' + (e.name || e) + ')'); }
      if (C.closed || C.ended) return cleanup();
      try {
        try { ctx = new AudioContext({sampleRate: 16000}); } catch (e) { ctx = new AudioContext(); }
        await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([WORKLET], {type: 'application/javascript'})));
        const src = ctx.createMediaStreamSource(stream), node = new AudioWorkletNode(ctx, 'pcm16');
        node.port.onmessage = e => {   // 0.1초(3200바이트)마다
          if (C.ended || C.closed) return;
          if (base == null) base = Date.now() - 100;   // 첫 조각의 처음 = 네이버가 세는 0초
          if (ws && ws.readyState === 1) ws.send(e.data); else q.push(e.data);
        };
        src.connect(node); node.connect(ctx.destination);   // 출력은 무음(마이크 소리를 스피커로 내지 않음)
        if (ctx.state === 'suspended') await ctx.resume();
      } catch (e) { return fail('이 기기는 소리를 바꾸지 못해서 기본 음성 인식으로 들을게'); }
      if (C.closed) return cleanup();
      onState('on');
      const st = window.APP && APP.session && APP.session.student;
      ws = new WebSocket(STT_URL + '?apikey=' + STT_KEY + (st ? '&student=' + encodeURIComponent(st.id) : ''));
      ws.binaryType = 'arraybuffer';
      const opened = setTimeout(() => { if (ws.readyState !== 1) { ws.onclose = null; try { ws.close(); } catch (e) {} fail('네이버 음성 인식에 연결하지 못했어. 기본 음성 인식으로 들을게'); } }, 8000);
      ws.onopen = () => { clearTimeout(opened); while (q.length) ws.send(q.shift()); if (C.ended) ws.send(JSON.stringify({type: 'end'})); };
      ws.onmessage = e => {
        let m; try { m = JSON.parse(e.data); } catch (x) { return; }
        if (m.type === 'tr') onTr(m);
        else if (m.type === 'limit') { onError('110초가 지나 듣기를 멈췄어. 마이크를 다시 누르면 이어서 들어'); C.finish(); }
        else if (m.type === 'error') close(m.msg || '음성 인식 오류');
        else if (m.type === 'done') close();
      };
      ws.onclose = () => { clearTimeout(opened); if (!C.closed) { if (C.ended) close(); else fail('네이버 음성 인식 연결이 끊겼어. 기본 음성 인식으로 들을게'); } };
    })();
    return C;
  }

  window.CLOVA = {
    ok: () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.AudioWorkletNode && window.WebSocket),
    start, words, tidyLatin
  };
})();
