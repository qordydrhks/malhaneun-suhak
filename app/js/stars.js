/* 새 앱 — ⭐ 별빛(누적 점수). 마스터 10/13:
   · 질문에 답해 점수가 나올 때마다 화면에 점수 + 효과음 + 위쪽 별빛 숫자에 더해지는 모습.
   · 학기 별빛 = 학기가 바뀌면 0부터(과정마다 따로 — 선행하는 아이는 과정마다 별빛이 따로 쌓인다) · 전체 별빛 = 모든 과정·모든 학기를 합친 것(리셋 없음).
   · 학기 시작일은 선생님 화면에서 마스터가 정한다(실제 학기와 학원 학기가 다를 수 있어서) — 공유 저장소 app:semesters = {list:[{start:'YYYY-MM-DD', name}]}.
   · 별빛은 처음 통과할 때만 한 번. 연습·이미 통과한 질문은 0(대결도 같은 규칙).
   별빛 = 이해 점수 × 난이도 무게(난이도 1 ×1 · 2 ×1.5 · 3 ×2) / mission 맞힌 문제 하나 20(hard 30) / 다시 빛내기 통과 30.
   장부: 진도 P.pts = [{id, n, at, why, r}] — why: one(한 번에) · reask(되묻기 뒤) · kw(키워드 뒤) · help(설명 뒤·다음 날) · mis · hard · rv
   요약: 공유 저장소 app:star:<학생>:<과정> — 순위·상(③)이 모든 학생 것을 한 번에 읽는다. */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const S = A.S = {};
  S.COURSE = 'e4-2';
  S.W = {1: 1, 2: 1.5, 3: 2};
  S.MIS = {basic: 20, hard: 30};
  S.REVIEW = 30;
  S.ptsFor = (r, q) => Math.round((q || 0) * (S.W[r] || 1));

  // ── 학기 ──
  let SEMS = null;
  S.loadSems = async () => { try { const v = await A.store.get('app:semesters'); SEMS = v && Array.isArray(v.list) && v.list.length ? v.list.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x.start)) : null; } catch (e) {} return SEMS; };
  S.useSems = list => { SEMS = list && list.length ? list : null; };
  S.sems = () => SEMS;
  /* 정해 둔 학기가 없으면: 3~8월 = 1학기(3월 1일부터) · 9~2월 = 2학기(9월 1일부터) */
  S.defaultSem = day => { const y = +day.slice(0, 4), m = +day.slice(5, 7); if (m >= 3 && m <= 8) return {start: y + '-03-01', name: y + '년 1학기'}; const yy = m >= 9 ? y : y - 1; return {start: yy + '-09-01', name: yy + '년 2학기'}; };
  S.sem = day => {
    day = day || A.today();
    const list = (SEMS || []).slice().sort((a, b) => (a.start < b.start ? -1 : 1));
    let cur = null; for (const s of list) if (s.start <= day) cur = s;
    if (!cur) { const d = S.defaultSem(day), nx = list.find(s => s.start > d.start); return {start: d.start, name: d.name, end: nx ? nx.start : null}; }
    const nx = list.find(s => s.start > cur.start);
    return {start: cur.start, name: cur.name || cur.start + ' 학기', end: nx ? nx.start : null};
  };
  S.weekStart = day => { const d = new Date((day || A.today()) + 'T12:00:00'); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  // ── 장부 ──
  const pts = () => { const P = E.prog(); return (P && P.pts) || []; };
  S.add = (id, n, why, r) => {
    const P = E.prog(); if (!P || !n || n <= 0) return 0;
    P.pts = P.pts || [];
    if (P.pts.some(x => x.id === id)) return 0;
    P.pts.push({id, n: Math.round(n), at: Date.now(), why, r: r || 0});
    return Math.round(n);
  };
  S.whyOf = stage => stage === 'first' ? 'one' : stage === 'reask' ? 'reask' : stage === 'kw' ? 'kw' : 'help';
  /* 별빛 장부가 생기기 전의 기록 → 한 번만 장부로 옮긴다(통과한 날짜 그대로) */
  S.backfill = () => {
    const P = E.prog(); if (!P || P.pts) return false;
    const out = [], rOf = {};
    for (const it of E.all()) rOf[it.t.id] = it.r;
    for (const [id, x] of Object.entries(P.st || {})) {
      if (x.st !== 'pass' || !(id in rOf)) continue;
      const q = x.qFirst ?? x.q ?? 100, r = rOf[id];
      out.push({id, n: S.ptsFor(r, q), at: x.at || Date.now(), why: q >= 100 ? 'one' : q >= 90 ? 'reask' : q >= 85 ? 'kw' : 'help', r});
      if (x.rv) out.push({id: id + ':rv', n: S.REVIEW, at: x.rv, why: 'rv', r});
    }
    for (const [k, m] of Object.entries(P.mis || {})) {
      const r = +(k.split(':r')[1] || 1);
      if (m.basic && m.basic.c) out.push({id: 'mis:' + k + ':basic', n: m.basic.c * S.MIS.basic, at: m.basic.at || Date.now(), why: 'mis', r});
      if (m.hard && m.hard.c) out.push({id: 'mis:' + k + ':hard', n: m.hard.c * S.MIS.hard, at: m.hard.at || Date.now(), why: 'hard', r});
    }
    out.sort((a, b) => a.at - b.at);
    P.pts = out;
    return true;
  };
  S.sum = (from, to) => pts().filter(x => { const d = A.dayKey(x.at); return (!from || d >= from) && (!to || d < to); }).reduce((a, x) => a + x.n, 0);
  S.semPts = () => { const s = S.sem(); return S.sum(s.start, s.end); };
  S.coursePts = () => S.sum();
  /* 전체 별빛 = 다른 과정(선행) 요약에 적힌 것 + 이 과정의 장부 */
  let OTHER = 0;
  S.loadOther = async () => {
    const st = A.session.student; if (!st) return 0;
    try {
      const rows = await A.sbSelect('ai_cache', 'key=like.' + encodeURIComponent('app:star:' + st.id + ':*') + '&select=key,value&limit=50') || [];
      OTHER = rows.filter(r => !r.key.endsWith(':' + S.COURSE)).reduce((a, r) => a + (+(r.value && r.value.total) || 0), 0);
    } catch (e) {}
    return OTHER;
  };
  S.totalPts = () => OTHER + S.coursePts();

  /* 공유 요약(③ 순위·상이 읽는 것) */
  S.summary = () => {
    const st = A.session.student, P = E.prog(), sem = S.sem(), wk = S.weekStart();
    const all = pts(), inWk = all.filter(x => A.dayKey(x.at) >= wk);
    const days = {}; for (const x of all) { const d = A.dayKey(x.at); days[d] = (days[d] || 0) + x.n; }   // 날짜별 — 마스터가 학기 날짜를 바꿔도 순위가 다시 계산되게
    const came = new Set((P.log || []).filter(l => l.at && l.id && A.dayKey(l.at) >= wk).map(l => A.dayKey(l.at)));
    return {sid: st.id, name: st.name, grade: st.grade || '', course: S.COURSE, at: Date.now(), total: S.coursePts(), days,
            sem: {id: sem.start, name: sem.name, n: S.sum(sem.start, sem.end)},
            wk: {id: wk, n: inWk.reduce((a, x) => a + x.n, 0), one: inWk.filter(x => x.why === 'one').length,
                 grit: inWk.filter(x => ['reask', 'kw', 'help'].includes(x.why)).length, came: came.size}};
  };
  S.push = () => { const st = A.session.student; if (!st || !E.prog()) return; A.store.set('app:star:' + st.id + ':' + S.COURSE, S.summary()).catch(() => {}); };
  /* 진도를 저장할 때마다 요약도 같이(학생 기기에서만 — 선생님 화면은 E.save 를 부르지 않는다) */
  const save0 = E.save;
  E.save = async () => { await save0(); S.push(); };
  const load0 = E.load;
  E.load = async () => { const p = await load0(); await S.loadSems(); const moved = S.backfill(); await S.loadOther(); if (moved) await E.save(); else S.push(); return p; };

  // ── 효과음(파일 없이 — WebAudio) · 끄기: 나의 기록 화면 ──
  let AC = null;
  S.soundOn = () => A.ls.raw('app:sound') !== '0';
  S.sound = kind => {
    if (!S.soundOn()) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      const t0 = AC.currentTime + 0.02;
      const notes = kind === 'big' ? [523, 659, 784, 1047, 1319] : kind === 'tick' ? [1568] : [784, 1047, 1319];
      notes.forEach((f, i) => {
        const o = AC.createOscillator(), g = AC.createGain(), t = t0 + i * (kind === 'tick' ? 0 : 0.09);
        o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(kind === 'tick' ? 0.05 : 0.16, t + 0.015); g.gain.exponentialRampToValueAtTime(0.001, t + (kind === 'tick' ? 0.08 : 0.45));
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.5);
      });
    } catch (e) {}
  };

  // ── 위쪽 별빛 숫자 + 더해지는 모습 ──
  const fmt = n => Math.round(n).toLocaleString('ko-KR');
  S.badge = () => `<button class="starct" data-go="record" aria-label="학기 별빛"><i>⭐</i><b id="starCt">${fmt(S.semPts())}</b></button>`;
  let shown = null;
  /* n 만큼 더해진 모습: from(요소)에서 별 가루가 위쪽 숫자로 날아가고, 숫자가 올라간다. 장부에는 먼저 넣어 둔다(S.add) */
  S.gain = (n, from, big) => {
    const ct = document.getElementById('starCt'); if (!n) return;
    const now = S.semPts(), start = now - n;
    if (ct) ct.textContent = fmt(start);
    S.sound(big ? 'big' : 'gain');
    const r0 = (from || document.body).getBoundingClientRect(), r1 = ct ? ct.getBoundingClientRect() : {left: innerWidth - 60, top: 10, width: 40, height: 20};
    const x0 = r0.left + r0.width / 2, y0 = r0.top + r0.height / 2, x1 = r1.left + r1.width / 2, y1 = r1.top + r1.height / 2;
    const K = big ? 14 : 9;
    for (let i = 0; i < K; i++) {
      const d = document.createElement('i'); d.className = 'sdust'; d.textContent = '✦';
      d.style.left = x0 + 'px'; d.style.top = y0 + 'px';
      document.body.appendChild(d);
      const dx = (Math.random() - 0.5) * 120, dy = -30 - Math.random() * 60, delay = i * 45;
      d.animate([{transform: 'translate(-50%,-50%) scale(.4)', opacity: 0},
                 {transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1)`, opacity: 1, offset: 0.35},
                 {transform: `translate(calc(-50% + ${x1 - x0}px), calc(-50% + ${y1 - y0}px)) scale(.5)`, opacity: 0.9}],
                {duration: 950, delay, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards'}).onfinish = () => d.remove();
    }
    const T = 600, t0 = performance.now() + 900;
    const btn = ct && ct.closest('.starct');
    const step = t => {
      const el = document.getElementById('starCt'); if (!el) return;
      const k = Math.max(0, Math.min(1, (t - t0) / T));
      el.textContent = fmt(start + n * (1 - Math.pow(1 - k, 3)));
      if (k > 0 && btn && !btn.classList.contains('bump')) { btn.classList.add('bump'); S.sound('tick'); }
      if (k < 1) requestAnimationFrame(step); else { el.textContent = fmt(now); setTimeout(() => btn && btn.classList.remove('bump'), 400); }
    };
    requestAnimationFrame(step);
    shown = now;
  };
  /* 결과 화면의 '별빛 +n' 표 */
  S.chip = (n, r, why) => n ? `<div class="gain" id="gainChip"><b>✦ 별빛 +${fmt(n)}</b>${r > 1 && why !== 'mis' ? `<small>난이도 ${r}라서 ×${S.W[r]}</small>` : why === 'rv' ? '<small>다시 빛내기</small>' : ''}</div>` : '';

  // ── 등급표(안내) ──
  S.TIER_RANGE = [['0 ~ 49', ''], ['50 ~ 69', ''], ['70 ~ 79', ''], ['80 ~ 89', '난이도 2까지 해야'], ['90 ~ 100', '난이도 3까지 해야']];
})();
