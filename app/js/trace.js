/* 도형 따라 그리기 시안 (마스터 10/22) — trace.html
   「삼각형·각·변의 이름을 말로 정확히 부르기 힘들다」 → 말은 그대로 하면서, 도형의 그 부분을 손가락으로 대강 따라 그리면
   앱이 어느 부분인지 알아맞혀 입력칸에 △ABD · ∠BAD · 선분 AB · 점 A 로 끼워 넣는다.
   · 그림은 데이터(점 좌표 + 한 직선 위의 점들)라서 알아맞힐 수 있다 — 그림 파일이면 안 된다.
   · 따라 그리기: 닫힌 선 = 삼각형·사각형 / 변을 따라 슥 = 선분 / 꼭짓점 근처 작은 호 = 각 / 톡 = 점.
   · 그린 순서대로 이름을 붙인다(대응 순서를 아이가 정함).
   · 기록은 남기지 않는다(시안). AI 채점 없음 — 모범 답과 나란히 보여 준다. */
(() => {
  'use strict';
  const A = window.APP, esc = A.esc;
  const root = () => document.getElementById('tr');
  const $ = s => root().querySelector(s);
  const toast = (t, ms = 2400) => { document.querySelector('.t-toast')?.remove(); const d = document.createElement('div'); d.className = 't-toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), ms); };
  const ov = s => `<span class="ov">${esc(s)}</span>`;   // 선분 AB — 교재처럼 윗줄

  // ════════ 그림 데이터 (점 좌표 · 한 직선 위의 점들을 차례로) ════════
  const FIGS = {
    iso: {w: 400, h: 300, P: {A: [200, 42], B: [70, 252], C: [330, 252], D: [200, 252]},
      lines: [['A', 'B'], ['A', 'C'], ['B', 'D', 'C'], ['A', 'D']], lab: {D: [0, 20]}},
    para: {w: 400, h: 300, P: {A: [118, 62], B: [52, 242], C: [292, 242], D: [358, 62]},
      lines: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C']], quads: [['A', 'B', 'C', 'D']]},
    free: {w: 400, h: 300, P: {A: [186, 38], B: [46, 258], C: [354, 258], D: [236, 258]},
      lines: [['A', 'E', 'B'], ['B', 'D', 'C'], ['A', 'C'], ['A', 'F', 'D'], ['E', 'F', 'C']], lab: {F: [6, -14], D: [0, 20]},
      init(f) {   // E 는 AB 위, F 는 AD 와 CE 의 교점 — 좌표로 계산
        const {A: a, B: b} = f.P; f.P.E = [a[0] + .42 * (b[0] - a[0]), a[1] + .42 * (b[1] - a[1])];
        f.P.F = cross(f.P.A, f.P.D, f.P.E, f.P.C);
      }},
  };
  const PROBS = [
    {id: 'p1', fig: 'iso', sec: '중2-2 · 이등변삼각형의 성질',
     qh: `△ABC에서 ${ov('AB')}=${ov('AC')}이고, ${ov('AD')}는 ∠A의 이등분선이야. △ABD와 △ACD가 합동인 까닭을 말해 봐.`,
     ansh: `△ABD와 △ACD에서 ${ov('AB')}=${ov('AC')}, ∠BAD=∠CAD, ${ov('AD')}는 공통이므로 △ABD≡△ACD (SAS 합동)`,
     tip: '예) 「(삼각형 하나 그리기)와 (다른 삼각형 그리기)에서 …」처럼 말하면서 그려요.'},
    {id: 'p2', fig: 'para', sec: '중2-2 · 평행사변형의 성질',
     qh: `평행사변형 ABCD에 대각선 ${ov('AC')}를 그었어. △ABC와 △CDA가 합동인 까닭을 말해 봐.`,
     ansh: `${ov('AB')}∥${ov('DC')}이므로 ∠BAC=∠DCA (엇각), ${ov('AD')}∥${ov('BC')}이므로 ∠BCA=∠DAC (엇각), ${ov('AC')}는 공통이므로 △ABC≡△CDA (ASA 합동)`,
     tip: '각은 꼭짓점 근처에 작은 호를 그려요.'},
    {id: 'free', fig: 'free', sec: '연습 · 아무 부분이나 그려 보기',
     qh: '선분 여러 개가 겹친 그림이에요. 삼각형·각·선분·점을 하나씩 그려 보고, 앱이 맞게 알아맞히는지 봐 주세요.',
     ansh: '', tip: '작은 삼각형(△AEF 등)도 그려 보세요.'},
  ];

  // ════════ 기하 도우미 ════════
  function cross(p, q, r, s) {   // 직선 PQ 와 RS 의 교점
    const d = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0]);
    const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / d;
    return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
  }
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  function segDist(p, a, b) {   // 점 p 와 선분 ab 사이 거리, 그리고 비율 t
    const vx = b[0] - a[0], vy = b[1] - a[1], L2 = vx * vx + vy * vy;
    const t = L2 ? ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / L2 : 0, tc = Math.max(0, Math.min(1, t));
    return {d: Math.hypot(p[0] - a[0] - tc * vx, p[1] - a[1] - tc * vy), t};
  }
  const polyDist = (p, pts) => { let m = Infinity; for (let i = 1; i < pts.length; i++) m = Math.min(m, segDist(p, pts[i - 1], pts[i]).d); return pts.length === 1 ? dist(p, pts[0]) : m; };
  const TAU = Math.PI * 2, nrm = a => ((a % TAU) + TAU) % TAU;
  const ang = (v, p) => Math.atan2(p[1] - v[1], p[0] - v[0]);

  // ════════ 그림에서 고를 수 있는 것들(선분·삼각형·각) 미리 계산 ════════
  function build(f) {
    if (f.init && !f._ok) { f.init(f); f._ok = true; }
    const P = f.P, names = Object.keys(P);
    const onLine = (a, b) => f.lines.some(l => l.includes(a) && l.includes(b));
    const segs = [], seen = new Set();
    f.lines.forEach(l => { for (let i = 0; i < l.length; i++) for (let j = i + 1; j < l.length; j++) { const k = [l[i], l[j]].sort().join(''); if (!seen.has(k)) { seen.add(k); segs.push([l[i], l[j]]); } } });
    const collinear = (a, b, c) => f.lines.some(l => l.includes(a) && l.includes(b) && l.includes(c));
    const polys = [];
    for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) for (let k = j + 1; k < names.length; k++) {
      const [a, b, c] = [names[i], names[j], names[k]];
      if (onLine(a, b) && onLine(b, c) && onLine(a, c) && !collinear(a, b, c)) polys.push([a, b, c]);
    }
    (f.quads || []).forEach(q => polys.push(q));
    // 꼭짓점마다 반직선(이름은 가장 가까운 점) → 두 반직선 사이의 각(180° 미만)
    const angles = [];
    names.forEach(v => {
      const rays = [];
      f.lines.forEach(l => { const i = l.indexOf(v); if (i < 0) return;
        if (i > 0) rays.push({p: l[i - 1], a: ang(P[v], P[l[i - 1]])});
        if (i < l.length - 1) rays.push({p: l[i + 1], a: ang(P[v], P[l[i + 1]])}); });
      for (let i = 0; i < rays.length; i++) for (let j = i + 1; j < rays.length; j++) {
        const d = nrm(rays[j].a - rays[i].a);
        if (d < Math.PI - .03) angles.push({v, r1: rays[i], r2: rays[j], th: d});
        else if (TAU - d < Math.PI - .03) angles.push({v, r1: rays[j], r2: rays[i], th: TAU - d});
      }
    });
    return {P, segs, polys, angles};
  }

  // ════════ 따라 그린 선 → 어느 부분? (s = 화면 1px 이 그림 몇 칸인지의 역수) ════════
  function recog(G, pts, s) {
    const P = G.P, px = v => v / s;   // 화면 px → 그림 단위
    let len = 0; for (let i = 1; i < pts.length; i++) len += dist(pts[i - 1], pts[i]);
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const diag = Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    // 톡 = 점
    if (len * s < 10) {
      let best = null, bd = Infinity; for (const n in P) { const d = dist(pts[0], P[n]); if (d < bd) { bd = d; best = n; } }
      return bd < px(36) ? {kind: 'pt', ids: [best]} : null;
    }
    const closed = diag * s > 60 && dist(pts[0], pts[pts.length - 1]) < Math.max(px(48), .32 * diag);
    // 삼각형·사각형: 둘레를 얼마나 덮었나
    let poly = null;
    if (closed) {
      const T = px(30);
      for (const pg of G.polys) {
        const ring = [...pg, pg[0]].map(n => P[n]), samp = [];
        for (let i = 1; i < ring.length; i++) for (let k = 0; k < 18; k++) { const t = k / 18; samp.push([ring[i - 1][0] + t * (ring[i][0] - ring[i - 1][0]), ring[i - 1][1] + t * (ring[i][1] - ring[i - 1][1])]); }
        const cov = samp.filter(q => polyDist(q, pts) < T).length / samp.length;
        const dm = pts.reduce((a, q) => a + polyDist(q, ring), 0) / pts.length;
        const sc = cov - .4 * dm / T;
        if (dm < T * 1.25 && (!poly || sc > poly.sc)) poly = {pg, sc, cov};
      }
      if (poly && poly.cov >= .6) return {kind: poly.pg.length === 3 ? 'tri' : 'quad', ids: orderLoop(poly.pg, pts, P)};
    }
    // 선분: 변을 따라 슥
    let seg = null; { const T = px(26);
      for (const [a, b] of G.segs) {
        const L = dist(P[a], P[b]); if (L * s < 30) continue;
        let cov = 0; for (let k = 0; k <= 20; k++) { const t = k / 20, q = [P[a][0] + t * (P[b][0] - P[a][0]), P[a][1] + t * (P[b][1] - P[a][1])]; if (polyDist(q, pts) < T) cov++; }
        cov /= 21;
        let dm = 0, ex = 0; const tol = px(16) / L;
        pts.forEach(q => { const r = segDist(q, P[a], P[b]); dm += r.d; if (r.t < -tol || r.t > 1 + tol) ex++; });
        dm /= pts.length; ex /= pts.length;
        // 변을 따라 그은 선은 처음→끝 방향이 그 변과 나란하다(각 표시 호는 변을 가로지른다)
        const cd = Math.abs(nrm(ang(pts[0], pts[pts.length - 1]) - ang(P[a], P[b]))), off = Math.min(cd, Math.abs(cd - Math.PI), TAU - cd);
        if (dist(pts[0], pts[pts.length - 1]) * s > 20 && off > .45) continue;
        const sc = cov - ex - .3 * dm / T;
        if (dm < T && (!seg || sc > seg.sc)) seg = {ab: [a, b], sc, cov, dm};
      } }
    const segX = () => { const [a, b] = seg.ab; return {kind: 'seg', ids: dist(pts[0], P[a]) <= dist(pts[0], P[b]) ? [a, b] : [b, a]}; };
    // 각: 꼭짓점 근처 작은 호(또는 꺾은 선) — 꼭짓점을 비켜 그린다. 둔각의 호는 변과 거의 나란해서, 변 위를 바로 따라갔는지(dm)로 가른다
    let angX = null;
    if (diag * s < 130) {
      let best = null;
      for (const g of G.angles) {
        const V = P[g.v]; if (Math.max(...pts.map(q => dist(q, V))) > px(95)) continue;
        const dirs = pts.filter(q => dist(q, V) > px(6)).map(q => nrm(ang(V, q) - g.r1.a)).map(r => r > TAU - .25 ? r - TAU : r);
        if (dirs.length < 3) continue;
        const tol = .08, inside = dirs.filter(r => r >= -tol && r <= g.th + tol);
        const fin = inside.length / dirs.length; if (fin < .8) continue;
        const cover = Math.min(1, (Math.max(...inside) - Math.min(...inside)) / g.th);
        const sc = .65 * fin + .35 * cover - .002 * pts.reduce((a, q) => a + dist(q, V), 0) / pts.length * s;
        if (!best || sc > best.sc) best = {g, sc, first: dirs[0]};
      }
      if (best && Math.min(...pts.map(q => dist(q, P[best.g.v]))) * s > 10) { const g = best.g, startNear1 = Math.abs(best.first) < Math.abs(best.first - g.th);
        angX = {kind: 'ang', ids: startNear1 ? [g.r1.p, g.v, g.r2.p] : [g.r2.p, g.v, g.r1.p], g}; }
    }
    if (!closed && seg && seg.cov >= .55 && (!angX || seg.dm * s < 9)) return segX();
    if (angX) return angX;
    if (closed && poly && poly.cov >= .45) return {kind: poly.pg.length === 3 ? 'tri' : 'quad', ids: orderLoop(poly.pg, pts, P)};
    if (seg && seg.cov >= .45 && !closed) { const [a, b] = seg.ab; return {kind: 'seg', ids: dist(pts[0], P[a]) <= dist(pts[0], P[b]) ? [a, b] : [b, a]}; }
    return null;
  }
  function orderLoop(pg, pts, P) {   // 시작한 꼭짓점부터, 손가락이 지나간 차례대로 꼭짓점 이름
    const first = pg.slice().sort((a, b) => dist(pts[0], P[a]) - dist(pts[0], P[b]))[0], cut = Math.floor(pts.length * .12);
    const idx = pg.filter(n => n !== first).map(n => { let m = Infinity, at = 0; pts.forEach((q, i) => { if (i < cut) return; const d = dist(q, P[n]); if (d < m) { m = d; at = i; } }); return {n, at}; });
    return [first, ...idx.sort((a, b) => a.at - b.at).map(x => x.n)];
  }
  const TXT = {pt: x => '점 ' + x.ids[0], seg: x => '선분 ' + x.ids.join(''), tri: x => '△' + x.ids.join(''), quad: x => '사각형 ' + x.ids.join(''), ang: x => '∠' + x.ids.join('')};
  const HTM = {pt: x => '점 ' + esc(x.ids[0]), seg: x => ov(x.ids.join('')), tri: x => '△' + esc(x.ids.join('')), quad: x => '□' + esc(x.ids.join('')), ang: x => '∠' + esc(x.ids.join(''))};

  // ════════ 그림 그리기 ════════
  function svgOf(f) {
    const P = f.P, cx = Object.values(P).reduce((a, p) => a + p[0], 0) / Object.keys(P).length, cy = Object.values(P).reduce((a, p) => a + p[1], 0) / Object.keys(P).length;
    const lines = f.lines.map(l => `<line x1="${P[l[0]][0]}" y1="${P[l[0]][1]}" x2="${P[l[l.length - 1]][0]}" y2="${P[l[l.length - 1]][1]}"/>`).join('');
    const labs = Object.keys(P).map(n => { const [x, y] = P[n]; let dx, dy;
      if (f.lab && f.lab[n]) [dx, dy] = f.lab[n]; else { const L = Math.hypot(x - cx, y - cy) || 1; dx = (x - cx) / L * 18; dy = (y - cy) / L * 18; }
      return `<circle cx="${x}" cy="${y}" r="3.2" class="tp"/><text x="${x + dx}" y="${y + dy + 6}" text-anchor="middle">${n}</text>`; }).join('');
    return `<svg id="fg" viewBox="0 0 ${f.w} ${f.h}" xmlns="http://www.w3.org/2000/svg"><g class="tl">${lines}</g><g id="hl"></g>${labs}<path id="ink" class="ink" d=""/></svg>`;
  }
  function highlight(G, x) {
    const P = G.P, g = document.getElementById('hl'); if (!g) return;
    let s = '';
    if (x.kind === 'pt') s = `<circle cx="${P[x.ids[0]][0]}" cy="${P[x.ids[0]][1]}" r="11"/>`;
    else if (x.kind === 'seg') s = `<line x1="${P[x.ids[0]][0]}" y1="${P[x.ids[0]][1]}" x2="${P[x.ids[1]][0]}" y2="${P[x.ids[1]][1]}"/>`;
    else if (x.kind === 'tri' || x.kind === 'quad') s = `<polygon points="${x.ids.map(n => P[n].join(',')).join(' ')}"/>`;
    else if (x.kind === 'ang') { const a = x.g, V = P[a.v], r = 30, p1 = [V[0] + r * Math.cos(a.r1.a), V[1] + r * Math.sin(a.r1.a)], p2 = [V[0] + r * Math.cos(a.r1.a + a.th), V[1] + r * Math.sin(a.r1.a + a.th)];
      s = `<path d="M${V[0]},${V[1]} L${p1[0]},${p1[1]} A${r},${r} 0 0 1 ${p2[0]},${p2[1]} Z"/>`; }
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g'); el.setAttribute('class', 'hk ' + x.kind); el.innerHTML = s; g.appendChild(el);
    setTimeout(() => el.classList.add('fade'), 1300); setTimeout(() => el.remove(), 2100);
  }

  // ════════ 말 + 그린 것 합치기 ════════
  // 말: 확정된 덩어리마다 {text, t0(말 시작 추정), t1(끝 추정)} · 그린 것: {x, t}
  // 말하는 도중에 그린 것은 그 덩어리 안에서 시간 비율대로 낱말 사이에 끼운다(음성 글자는 1~2초 늦게 오므로).
  function compose(S) {
    const out = [], gs = S.marks.slice().sort((a, b) => a.t - b.t); let gi = 0;
    for (const sp of S.speech) {
      while (gi < gs.length && gs[gi].t < sp.t0) out.push({g: gs[gi++]});
      const words = sp.text.split(' ').filter(Boolean), ins = [];
      while (gi < gs.length && gs[gi].t <= sp.t1) { const fr = (gs[gi].t - sp.t0) / Math.max(1, sp.t1 - sp.t0); ins.push({k: Math.round(fr * words.length), g: gs[gi++]}); }
      let k = 0; for (let w = 0; w <= words.length; w++) { while (k < ins.length && ins[k].k <= w) out.push({g: ins[k++].g}); if (w < words.length) out.push({w: words[w]}); }
    }
    while (gi < gs.length) out.push({g: gs[gi++]});
    return out;
  }
  const plain = seq => seq.map(z => z.w ?? TXT[z.g.x.kind](z.g.x)).join(' ').replace(/\s+/g, ' ').trim();
  const html = (seq, del) => seq.map(z => z.w != null ? esc(z.w) : `<span class="chip" ${del ? `data-del="${z.g.id}"` : ''}>${HTM[z.g.x.kind](z.g.x)}${del ? '<i>×</i>' : ''}</span>`).join(' ');

  // ════════ 화면 ════════
  let REC = null; const stopRec = () => { if (REC) { const r = REC; REC = null; try { r._stop(); r.stop(); } catch (e) {} } };
  const MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';

  function home() {
    stopRec();
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><button class="t-back" id="back">‹ 체험 목록</button><span class="t-sp"></span><span class="t-tag r3">시안</span></div>
      <h1 class="tc-h">도형 따라 그리기</h1>
      <p class="t-lead">말하면서 도형의 그 부분을 손가락으로 <b>대강 따라 그리면</b> 이름이 입력칸에 들어가요. <button class="tc-how" id="how">어떻게 그려?</button></p>
      <div id="howBox"></div>
      ${PROBS.map(p => `<div class="t-sec">${esc(p.sec)}</div><button class="t-item" data-id="${p.id}"><div class="t-iq">${p.qh}</div></button>`).join('')}
      <div class="t-src" style="margin-top:26px;text-align:center">따라 그리기 시안 0.2 (10/22)</div>
    </div>`;
    $('#back').onclick = () => { location.href = 'try.html'; };
    $('#how').onclick = () => { const b = $('#howBox'); b.innerHTML = b.innerHTML ? '' : HOW; };
    root().querySelectorAll('.t-item').forEach(b => b.onclick = () => run(PROBS.find(p => p.id === b.dataset.id)));
  }
  const HOW = `<div class="tc-help"><div><b>삼각형 · 사각형</b> 변을 따라 한 바퀴 빙 — 시작한 꼭짓점부터 그린 차례로 이름이 붙어요</div><div><b>선분</b> 그 변을 따라 슥</div><div><b>각</b> 꼭짓점 근처에 작은 호(두 변 사이)</div><div><b>점</b> 톡</div><div class="t-sub">잘못 들어간 이름은 눌러서 빼요.</div></div>`;

  function run(p) {
    stopRec(); window.scrollTo(0, 0);
    const f = FIGS[p.fig], G = build(f);
    const S = {speech: [], marks: [], typed: false, nid: 0};
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><button class="t-back" id="back">‹ 목록</button><span class="t-sp"></span><span class="t-tag r3">시안</span></div>
      <div class="t-card"><div class="t-q tc-q">${p.qh}</div>
        <div class="tc-fig"><div class="tc-got" id="got"></div>${svgOf(f)}</div>
        <div class="t-sub tc-tip">${esc(p.tip)}</div>
        <div class="t-live tc-live" id="live"></div>
        <div class="t-row"><button class="t-mic" id="mic" aria-label="말하기">${MIC}</button><button class="t-btn small" id="tw">글로 쓰기</button><button class="t-btn small" id="undo">마지막 그림 빼기</button><button class="t-btn small" id="clr">지우고 다시</button><span class="t-sp"></span><button class="t-btn pri" id="sub" disabled>다 말했어</button></div>
        <div id="res"></div></div></div>`;
    $('#back').onclick = () => { stopRec(); home(); };
    const live = $('#live'), sub = $('#sub'), mic = $('#mic');
    const draw = () => {
      const seq = compose(S), has = seq.length > 0;
      if (S.typed) { sub.disabled = !$('#ta')?.value.trim(); return; }
      live.innerHTML = has ? html(seq, true) : '<span class="t-ph">마이크를 누르고 말하면서, 도형의 그 부분을 따라 그려 봐</span>';
      sub.disabled = !has;
    };
    live.onclick = e => { const d = e.target.closest('[data-del]'); if (!d) return; S.marks = S.marks.filter(m => String(m.id) !== d.dataset.del); draw(); };
    draw();

    // ── 따라 그리기 ──
    const svg = $('#fg'), ink = $('#ink'); let cur = null;
    const toFig = e => { const m = svg.getScreenCTM().inverse(), q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(m); return [r.x, r.y]; };
    svg.addEventListener('pointerdown', e => { e.preventDefault(); svg.setPointerCapture(e.pointerId); cur = {pts: [toFig(e)], t0: Date.now()}; ink.setAttribute('d', ''); ink.classList.remove('bad', 'fade'); });
    svg.addEventListener('pointermove', e => { if (!cur) return; const q = toFig(e), l = cur.pts[cur.pts.length - 1]; if (dist(q, l) < .8) return; cur.pts.push(q); ink.setAttribute('d', 'M' + cur.pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L')); });
    const end = () => {
      if (!cur) return; const c = cur; cur = null;
      const s = svg.getScreenCTM().a, x = recog(G, c.pts, s);
      if (!x) { ink.classList.add('bad'); setTimeout(() => ink.classList.add('fade'), 500); setTimeout(() => { if (!cur) ink.setAttribute('d', ''); }, 1100); toast('어느 부분인지 모르겠어요. 선을 따라 다시 그려 봐'); return; }
      ink.classList.add('fade'); setTimeout(() => { if (!cur) ink.setAttribute('d', ''); }, 650); highlight(G, x);
      const got = $('#got'); got.innerHTML = '✓ ' + HTM[x.kind](x); got.classList.remove('on'); void got.offsetWidth; got.classList.add('on');
      const t = (c.t0 + Date.now()) / 2;
      if (S.typed) { const ta = $('#ta'), w = TXT[x.kind](x), i = ta.selectionStart ?? ta.value.length; const pre = ta.value.slice(0, i), post = ta.value.slice(i);
        ta.value = pre + (pre && !/\s$/.test(pre) ? ' ' : '') + w + (post && !/^\s/.test(post) ? ' ' : '') + post; draw(); return; }
      S.marks.push({id: ++S.nid, x, t}); draw();
    };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', () => { cur = null; ink.setAttribute('d', ''); });

    // ── 말하기 — 새 앱 ui.js startRec 과 똑같은 방식(마스터 10/22 「마이크는 항상 앱과 동일하게」)
    //    · interimResults=false: 확정된 문장만(중간 결과가 겹쳐 같은 말이 되풀이되는 안드로이드 문제 차단)
    //    · 새로 확정된 조각만 resultIndex 부터 · 안드로이드가 끊으면 같은 인식기로 다시 켬(30번까지) · 4초 안에 안 켜지면 글로 쓰기
    //    · 그린 것을 끼울 자리만 추가: 확정 조각이 온 시각으로 그 조각의 말한 시간(t0~t1)을 어림
    mic.onclick = () => {
      if (REC) { stopRec(); mic.classList.remove('on'); return; }
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) { toast('이 기기는 말하기가 안 돼서 글로 써 줘'); return $('#tw').click(); }
      let manualStop = false, started = false, restarts = 0, lastErr = '', last = Date.now();
      const r = new R(); r.lang = 'ko-KR'; r.continuous = true; r.interimResults = false; r.maxAlternatives = 5;
      REC = r; r._stop = () => { manualStop = true; };
      const watchdog = setTimeout(() => { if (!started) { try { r.abort(); } catch (e) {} REC = null; toast('이 기기에서 말하기가 시작되지 않아요. 글로 써 줘'); $('#tw').click(); } }, 4000);
      r.onstart = () => { started = true; clearTimeout(watchdog); mic.classList.add('on'); last = Math.max(last, Date.now());
        if (!S.speech.length && !S.marks.length) live.innerHTML = '<span class="t-ph">듣고 있어… 말하면서 도형을 따라 그려 봐. 다 말하면 마이크를 다시 눌러 줘</span>'; };
      r.onresult = ev => {
        for (let k = ev.resultIndex; k < ev.results.length; k++) {
          const res = ev.results[k]; if (!res.isFinal) continue;
          const t = (res[0].transcript || '').trim(); if (!t) continue;
          const now = Date.now(), t1 = Math.max(last + 200, now - 600), t0 = Math.max(last, t1 - 400 - t.replace(/\s/g, '').length * 180);
          S.speech.push({text: A.fixSpeech(t), t0, t1}); last = now;
        }
        draw();
      };
      r.onerror = ev => {
        clearTimeout(watchdog); lastErr = ev.error || '';
        if (ev.error === 'no-speech' || ev.error === 'aborted') return;
        if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed' || ev.error === 'network' || ev.error === 'audio-capture') {
          manualStop = true; REC = null;
          toast(ev.error === 'network' ? '음성 인식 서버에 연결하지 못했어. 글로 써 줘'
              : ev.error === 'audio-capture' ? '마이크를 다른 곳에서 쓰고 있어. 앱을 다시 열거나 글로 써 줘 (audio-capture)'
              : '마이크가 막혀 있어. 글로 써 줘 (' + ev.error + ')');
          $('#tw').click();
        } else toast('말하기 오류: ' + ev.error);
      };
      r.onend = () => {
        clearTimeout(watchdog);
        if (!manualStop && REC === r && restarts < 30) { restarts++; try { r.start(); return; } catch (e) {} }   // 안드로이드가 끊은 것 → 이어서 듣기
        if (!manualStop && REC === r && !S.speech.length) toast('말소리를 못 들었어. 마이크를 다시 눌러 줘' + (lastErr ? ' (' + lastErr + ')' : ''));
        if (REC === r) REC = null;
        mic.classList.remove('on'); draw();
      };
      try { r.start(); } catch (e) { clearTimeout(watchdog); REC = null; toast('마이크를 시작할 수 없어. 글로 써 줘'); $('#tw').click(); }
    };
    $('#tw').onclick = () => {
      stopRec(); S.typed = !S.typed;
      if (S.typed) { const cur0 = plain(compose(S)); live.innerHTML = `<textarea id="ta" placeholder="여기에 써도 돼. 도형을 그리면 커서 자리에 이름이 들어가요"></textarea>`; const ta = $('#ta'); ta.value = cur0; ta.oninput = draw; mic.style.display = 'none'; $('#tw').textContent = '말로 하기'; }
      else { const v = $('#ta').value.trim(); S.speech = v ? [{text: v, t0: 0, t1: 1}] : []; S.marks = []; mic.style.display = ''; $('#tw').textContent = '글로 쓰기'; }
      draw();
    };
    $('#undo').onclick = () => { if (S.typed) return toast('글로 쓸 때는 글자를 지워 주세요'); const m = S.marks.slice().sort((a, b) => b.t - a.t)[0]; if (m) { S.marks = S.marks.filter(z => z !== m); draw(); } };
    $('#clr').onclick = () => { stopRec(); mic.classList.remove('on'); S.speech = []; S.marks = []; if (S.typed) $('#ta').value = ''; draw(); $('#res').innerHTML = ''; };
    sub.onclick = () => {
      stopRec(); mic.classList.remove('on');
      const seq = S.typed ? null : compose(S), mine = S.typed ? esc($('#ta').value.trim()) : html(seq, false);
      const drawn = S.typed ? '' : S.marks.slice().sort((a, b) => a.t - b.t).map(m => HTM[m.x.kind](m.x)).join(' · ');
      $('#res').innerHTML = `<div class="t-note"><h3>내가 한 말</h3><div class="tc-mine">${mine}</div>
        ${drawn ? `<div class="t-sub" style="margin-top:6px">그려서 넣은 것: ${drawn}</div>` : ''}
        ${p.ansh ? `<h3 style="margin-top:12px">모범 답</h3><div class="tc-mine">${p.ansh}</div>` : ''}
        <div class="t-sub" style="margin-top:10px">시안이라 채점은 하지 않아요. AI 에게는 「${esc(S.typed ? $('#ta').value.trim().slice(0, 40) : plain(seq).slice(0, 40))}…」처럼 글자로 넘어가요.</div></div>`;
    };
  }

  window.TRACE_TEST = {FIGS, build, recog, compose, plain};   // 시험용
  home();
})();
