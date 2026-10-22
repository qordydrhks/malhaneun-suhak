/* 도형 따라 그리기 시안 (마스터 10/22) — trace.html
   「삼각형·각·변의 이름을 말로 정확히 부르기 힘들다」 → 말은 그대로 하면서, 도형의 그 부분을 손가락으로 대강 따라 그리면
   앱이 어느 부분인지 알아맞혀 입력칸에 △ABD · ∠BAD · 선분 AB · 점 A 로 끼워 넣는다.
   · 그림은 데이터(점 좌표 + 한 직선 위의 점들)라서 알아맞힐 수 있다 — 그림 파일이면 안 된다.
   · 따라 그리기: 닫힌 선 = 삼각형·사각형 / 변을 따라 슥 = 선분 / 각 = 한 변을 따라 와서 꼭짓점을 지나 다른 변으로(또는 꼭짓점 근처 작은 호) / 톡 = 점.
   · 보조선(10/22): 「보조선」 → 시작·끝을 차례로 누름. 꼭짓점이면 그 점, 변 위 어정쩡한 곳이면 후보 점 3개(맞는 점 포함)가 떠서 고른다.
   · 말과 이름 잇기(10/22): 「이 삼각형」「이 각」「이 변」「이거」 같은 가리키는 말 자리에 그린 차례대로 이름을 넣는다(음성이 늦게 와도 맞음).
     가리키는 말이 없으면 그린 시각으로 어림해 끼운다.
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
    // ── 블랙라벨 중2-2 심화 5문제(체험판 try.js HM2 와 같은 그림·숫자) — 좌표는 교재식(y 위로)으로 적고 mk 가 화면 좌표로 ──
    m2a: mk(392, 228, [104, 166, 11], {A: [0, 12], B: [0, 0], C: [20, 0], D: [20, 12], E: [12, 0], F: [0, 8], H: [-6, 12]},
      [['H', 'A', 'D'], ['A', 'F', 'B'], ['B', 'E', 'C'], ['C', 'D'], ['D', 'E'], ['H', 'F', 'E']],
      {fs: 14, lab: {A: [0, -12], B: [-11, 9], C: [11, 9], D: [10, -10], E: [0, 14], F: [-12, 0], H: [-4, -12]}, quads: [['A', 'B', 'C', 'D']],
       ra: [['E', 'D', 'F']], dims: [['C', 'D', '12 cm', -18], ['B', 'C', '20 cm', -24]]}),
    m2b: mk(340, 262, [46, 214, 14], {P: [0, 1.6], Q: [0, 0], R: [-2, 0], B: [12, 0], H: [15, 0], C: [18, 0], A: [15, 12]},
      [['R', 'Q', 'B', 'H', 'C'], ['Q', 'P'], ['A', 'B'], ['A', 'C'], ['A', 'H']],
      {fs: 13, lab: {P: [-11, -4], Q: [0, 14], R: [-2, 14], B: [-3, 14], H: [0, 14], C: [3, 14], A: [0, -12]}, dash: [['A', 'H']], ra: [['H', 'C', 'A']],
       dims: [['R', 'Q', '2 m', -17], ['Q', 'B', '12 m', -17]], extra: P => {
         const arrows = [0, 1, 2].map(i => { const sx = 46 + (17.6 + i * .9) * 14, sy = 214 - (13.6 - i * .9) * 14, ex = sx - 22, ey = sy + 17.6;
           return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#d07a12" stroke-width="2"/><polygon points="${ex},${ey} ${ex + 8},${ey - 1.5} ${ex + 3.4},${ey - 7}" fill="#d07a12"/>`; }).join('');
         return `<rect x="${P.R[0]}" y="${P.Q[1] - 2.5}" width="${P.Q[0] - P.R[0]}" height="5" fill="#b9bfca"/>${arrows}<text x="${46 + 16.2 * 14}" y="${214 - 14.2 * 14}" font-size="12" fill="#b0650c" text-anchor="middle">햇빛</text><text x="${P.P[0] - 30}" y="${P.P[1] + 10}" font-size="12" fill="#4a5160" text-anchor="middle">1.6 m</text>`; }}),
    m2c: mk(254, 238, [34, 214, 11.5], {A: [0, 12], B: [0, 0], C: [9, 0], G: [3, 4], H: [3, 0], E: [12, 0], D: [12, 16]},
      [['A', 'B'], ['A', 'C'], ['B', 'H', 'C', 'E'], ['B', 'G', 'D'], ['G', 'H'], ['D', 'E']],
      {fs: 13, lab: {A: [-10, -5], B: [-10, 9], C: [1, 13], G: [-12, -6], H: [0, 13], E: [9, 11], D: [0, -12]}, ra: [['B', 'A', 'C'], ['H', 'G', 'C'], ['E', 'D', 'B']],
       dims: [['E', 'D', '16 cm', -22]], cands: [{on: ['A', 'B'], ts: [.5, 1 / 3, 2 / 3]}, {on: ['B', 'C'], ts: [.5, .25, .75]}, {on: ['A', 'C'], ts: [.5, 1 / 3, 2 / 3]}]}),
    m2d: (() => { const q = 2.1, pp = Math.sqrt(9 - q * q), t = u => [-4 * q / 3 + 7 * q * u / 3, -pp / 3 + pp * u / 3];
      return mk(270, 258, [150, 128, 44], {A: [0, pp], B: [-q, 0], C: [0, -pp], D: [q, 0], E: [-4 * q / 3, -pp / 3], F: t(1 / 4), G: t(4 / 7)},
        [['A', 'B', 'E'], ['B', 'F', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'G', 'C'], ['E', 'F', 'G', 'D']],
        {fs: 13, lab: {A: [0, -12], B: [-9, -9], C: [0, 13], D: [12, 0], E: [-11, 4], F: [-4, 14], G: [12, -8]}, quads: [['A', 'B', 'C', 'D']],
         fills: [[['A', 'C', 'D'], '#e3eecf'], [['G', 'F', 'C'], '#cfe1f7']], dims: [['B', 'A', '3 cm', 15], ['E', 'B', '1 cm', 14]]}); })(),
    m2e: mk(276, 244, [70, 212, 10], {A: [0, 18], B: [0, 0], C: [18, 0], D: [18, 18], H: [6, 0], E: [2, 6], F: [8, 12], G: [14, 6]},
      [['A', 'B'], ['B', 'H', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'H'], ['D', 'H'], ['E', 'F'], ['F', 'G'], ['G', 'E']],
      {fs: 13, lab: {A: [-10, -8], B: [-10, 9], C: [10, 9], D: [10, -8], H: [0, 13], E: [-10, 3], F: [0, -12], G: [11, 3]}, quads: [['A', 'B', 'C', 'D']],
       fills: [[['E', 'F', 'G'], '#cfe1f7']], dims: [['B', 'A', '18 cm', 20]],
       cands: [{on: ['A', 'B'], ts: [.5, 1 / 3, 2 / 3]}, {on: ['A', 'D'], ts: [.5, 1 / 3, 2 / 3]}, {on: ['D', 'C'], ts: [.5, 1 / 3, 2 / 3]}]}),
  };
  function mk(w, h, [ox, oy, k], pts, lines, o) {   // 교재 좌표(y 위로) → 화면 좌표
    const P = {}; for (const n in pts) P[n] = [+(ox + pts[n][0] * k).toFixed(2), +(oy - pts[n][1] * k).toFixed(2)];
    return Object.assign({w, h, P, lines}, o);
  }
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
  ].concat([
    {id: 'm2a', q: '가로 BC = 20 cm, 세로 AB = 12 cm인 직사각형 ABCD에서 BC 위에 BE : EC = 3 : 2가 되도록 점 E를 잡고, AB 위에 ∠DEF = 90°가 되도록 점 F를 잡았다. AD의 연장선과 EF의 연장선의 교점을 H라 할 때, AF와 AH의 길이를 각각 구하시오.',
     ans: 'AF = 4 cm, AH = 6 cm — ∠B = ∠C = 90°, ∠BFE = ∠CED라서 △FBE ∽ △ECD(AA 닮음). FB : EC = BE : CD에서 FB : 8 = 12 : 12, FB = 8이라 AF = 4. AH ∥ BE라서 △FAH ∽ △FBE, AH : BE = AF : FB = 1 : 2라 AH = 6.', src: '블랙라벨 중2-2 64쪽 종합 사고력 01 (숫자 바꿈)'},
    {id: 'm2b', q: '키가 1.6 m인 학생(PQ)의 그림자 QR의 길이가 2 m인 시각에, 피라미드의 그림자 끝이 이 학생이 선 곳 Q와 일치하였다. QB = 12 m이고, 피라미드를 옆에서 보면 높이 AH와 밑변 BC의 길이의 비가 2 : 1인 이등변삼각형일 때, 피라미드의 높이 AH를 구하시오.',
     ans: '12 m — 같은 시각에는 (높이) : (그림자 길이)가 같다. 피라미드의 그림자는 꼭짓점 바로 아래 H부터 재야 하므로 BC = x m라 하면 그림자 길이 QH는 12 + x/2, 높이는 2x. 1.6 : 2 = 2x : (12 + x/2)에서 x = 6, AH = 12 m.', src: '블랙라벨 중2-2 64쪽 종합 사고력 03 (숫자 바꿈)', tip: '햇빛의 방향은 「보조선」으로 그어 봐.'},
    {id: 'm2c', q: '∠B = 90°인 직각삼각형 ABC의 무게중심을 G라 하자. 점 G에서 BC에 내린 수선의 발을 H라 하고, BG의 연장선 위의 점 D에서 BC의 연장선에 내린 수선의 발을 E라 하자. DE = 16 cm, HC : CE = 2 : 1일 때, GH의 길이를 구하시오.',
     ans: '4 cm — 무게중심 G는 중선 CM(M은 AB의 중점)을 2 : 1로 나누고 GH ∥ AB라서 BH : HC = 1 : 2. HC : CE = 2 : 1이니 BH = CE = k라 하면 BE = 4k. GH ∥ DE라서 △BGH ∽ △BDE, GH : 16 = 1 : 4에서 GH = 4 cm.', src: '블랙라벨 중2-2 74쪽 A등급 29 (숫자 바꿈)', tip: '무게중심을 쓰려면 「보조선」으로 중선을 그어 봐.'},
    {id: 'm2d', q: 'AB = 3 cm인 마름모 ABCD가 있다. AB의 연장선 위에 BE = 1 cm가 되도록 점 E를 잡고, ED가 BC, AC와 만나는 점을 각각 F, G라 할 때, (1) BF : AD (2) FG : GD (3) △GFC : △ACD를 각각 가장 간단한 자연수의 비로 나타내시오.',
     ans: '(1) 1 : 4 (2) 3 : 4 (3) 9 : 28 — BF ∥ AD라서 △EBF ∽ △EAD(닮음비 1 : 4), BF = 3/4, FC = 9/4. FC ∥ AD라서 △GFC ∽ △GDA(닮음비 3 : 4). △GFC = 9a, △GDA = 16a이고 △GDC는 △GFC와 높이가 같아 12a, △ACD = 28a.', src: '블랙라벨 중2-2 75쪽 종합 사고력 03 (숫자 바꿈)'},
    {id: 'm2e', q: '한 변의 길이가 18 cm인 정사각형 ABCD가 있다. BC 위의 한 점 H에 대하여 세 삼각형 ABH, AHD, DHC의 무게중심을 각각 E, F, G라 할 때, △EFG의 넓이를 구하시오.',
     ans: '36 cm² — AB, AD, DC의 중점을 M, N, P라 하면 E, F, G는 HM, HN, HP를 H로부터 2 : 1로 나누는 점이라 △EFG ∽ △MNP(닮음비 2 : 3). △MNP = 18 × 9 ÷ 2 = 81이니 △EFG = 81 × 4/9 = 36 cm². H가 BC 위 어디에 있어도 같다.', src: '블랙라벨 중2-2 74쪽 A등급 28 (숫자 바꿈)', tip: '무게중심을 쓰려면 「보조선」으로 중선을 그어 봐.'},
  ].map(m => ({id: m.id, fig: m.id, sec: '블랙라벨 중2-2 심화 · 닮음', qh: esc(m.q), ansh: esc(m.ans), src: m.src, black: true,
    tip: m.tip || '풀이를 말로 설명해 봐. 삼각형·각·선분은 그려서 넣고, 필요하면 「보조선」으로 선을 그어.'})));

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
    const angles = [], RAYS = {};
    names.forEach(v => {
      const rays = RAYS[v] = [];
      f.lines.forEach(l => { const i = l.indexOf(v); if (i < 0) return;
        if (i > 0) rays.push({p: l[i - 1], a: ang(P[v], P[l[i - 1]]), side: l.slice(0, i).reverse()});
        if (i < l.length - 1) rays.push({p: l[i + 1], a: ang(P[v], P[l[i + 1]]), side: l.slice(i + 1)}); });
      for (let i = 0; i < rays.length; i++) for (let j = i + 1; j < rays.length; j++) {
        const d = nrm(rays[j].a - rays[i].a);
        if (d < Math.PI - .03) angles.push({v, r1: rays[i], r2: rays[j], th: d});
        else if (TAU - d < Math.PI - .03) angles.push({v, r1: rays[j], r2: rays[i], th: TAU - d});
      }
    });
    return {P, segs, polys, angles, rays: RAYS, xp: f.xp || []};
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
    { const fx = fullTurn(G, pts, s); if (fx) return fx; }
    const closed = diag * s > 60 && dist(pts[0], pts[pts.length - 1]) < Math.max(px(48), .32 * diag);
    // 삼각형·사각형: 둘레를 얼마나 덮었나
    let poly = null;
    if (closed) {
      const T = px(30);
      for (const pg of G.polys) {
        const ring = [...pg, pg[0]].map(n => P[n]); let hit = 0, edge = 1;
        let me = Infinity; for (let i = 1; i < ring.length; i++) me = Math.min(me, dist(ring[i - 1], ring[i]));
        const Te = Math.min(T, .3 * me);   // 작은 삼각형은 덮였다고 보는 폭도 좁게(두 변만 지나간 ㄱ자를 삼각형으로 보지 않게)
        for (let i = 1; i < ring.length; i++) { let h = 0; for (let k = 1; k < 18; k++) { const t = k / 18; if (polyDist([ring[i - 1][0] + t * (ring[i][0] - ring[i - 1][0]), ring[i - 1][1] + t * (ring[i][1] - ring[i - 1][1])], pts) < Te) h++; } hit += h; edge = Math.min(edge, h / 17); }
        const cov = hit / (17 * (ring.length - 1));
        const dm = pts.reduce((a, q) => a + polyDist(q, ring), 0) / pts.length;
        const sc = cov - .4 * dm / T;
        if (dm < T * 1.25 && (!poly || sc > poly.sc)) poly = {pg, sc, cov, edge};
      }
    }
    // 한 바퀴 돌아 처음 자리 근처로 왔으면 삼각형·사각형. 아니면(작은 삼각형의 두 변만 지나간 ㄱ자) 각을 먼저 본다
    const shut = dist(pts[0], pts[pts.length - 1]) * s < 36;
    if (poly && poly.cov >= .6 && poly.edge >= .45 && (shut || (poly.cov >= .85 && poly.edge >= .6))) return {kind: poly.pg.length === 3 ? 'tri' : 'quad', ids: orderLoop(poly.pg, pts, P)};
    // 각(선 따라): 한 변을 따라 와서 꼭짓점을 지나 다른 변으로 — 어느 변 두 개를 지났는지로 정하니 겹친 각도 정확하다
    { const vx = vAngle(G, pts, s); if (vx) return vx; }
    if (poly && poly.cov >= .6 && poly.edge >= .45) return {kind: poly.pg.length === 3 ? 'tri' : 'quad', ids: orderLoop(poly.pg, pts, P)};   // 좁은 각은 처음과 끝이 가까워 닫힌 선처럼 보이기도 한다
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
    // 각: 꼭짓점 근처 호 — 호가 덮은 방향 범위와 두 반직선 사이 범위가 얼마나 겹치는지(겹침 ÷ 합침)로 고른다.
    //     작은 각·둔각·평각(반원)·180°보다 큰 각(부채꼴의 큰 쪽 중심각)을 모두 같은 방법으로. 둔각의 호는 변과 거의 나란해서, 변 위를 바로 따라갔는지(dm)로 가른다
    let angX = diag * s < 170 ? arcAngle(G, pts, s) : null;
    if (!closed && seg && seg.cov >= .55 && (!angX || seg.dm * s < 9)) return segX();
    if (angX) return angX;
    if (closed && poly && poly.cov >= .45 && poly.edge >= .3) return {kind: poly.pg.length === 3 ? 'tri' : 'quad', ids: orderLoop(poly.pg, pts, P)};
    if (seg && seg.cov >= .45 && !closed) { const [a, b] = seg.ab; return {kind: 'seg', ids: dist(pts[0], P[a]) <= dist(pts[0], P[b]) ? [a, b] : [b, a]}; }
    return null;
  }
  // 호가 꼭짓점 V 둘레를 돈 방향: 처음 방향에서 잰 누적 각(범위 lo~hi)
  function sweep(V, pts, minR) {
    const qs = pts.filter(q => dist(q, V) > minR); if (qs.length < 4) return null;
    let a0 = ang(V, qs[0]), acc = 0, lo = 0, hi = 0, prev = a0;
    for (const q of qs.slice(1)) { const a = ang(V, q); let d = a - prev; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; acc += d; prev = a; lo = Math.min(lo, acc); hi = Math.max(hi, acc); }
    return {a0, lo, hi, acc};
  }
  function fullTurn(G, pts, s) {   // 점 둘레에 작은 원 한 바퀴 → 「점 D 주위의 각(360°)」
    const P = G.P; let best = null;
    for (const v in P) { const V = P[v], ds = pts.map(q => dist(q, V));
      if (Math.max(...ds) * s > 75 || Math.min(...ds) * s < 8 || Math.max(...ds) > 3 * Math.min(...ds)) continue;   // 꼭짓점을 지나가는 ㄱ자·삼각형은 빼고, 점을 감싸 도는 것만
      if (dist(pts[0], pts[pts.length - 1]) > Math.max(30 / s, 1.2 * ds.reduce((x, y) => x + y, 0) / ds.length)) continue;
      const w = sweep(V, pts, 0); if (!w || Math.abs(w.acc) < TAU * .82) continue;
      const m = ds.reduce((a, b) => a + b, 0) / ds.length; if (!best || m < best.m) best = {m, v}; }
    return best && {kind: 'full', ids: [best.v]};
  }
  function arcAngle(G, pts, s) {
    const P = G.P, ovl = (a0, a1, b0, b1) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0)); let best = null;
    for (const v in P) {
      const V = P[v], ds = pts.map(q => dist(q, V)); if (Math.max(...ds) * s > 110 || Math.min(...ds) * s < 9) continue;
      const w = sweep(V, pts, 0); if (!w || w.hi - w.lo < .2) continue;
      const S0 = nrm(w.a0 + w.lo), SL = w.hi - w.lo, rays = G.rays[v] || [];
      for (const r1 of rays) for (const r2 of rays) { if (r1 === r2) continue;
        const L = nrm(r2.a - r1.a); if (L < .05) continue;   // r1 에서 시계 반대(화면에서는 시계) 방향으로 r2 까지
        const off = nrm(r1.a - S0), ov = ovl(0, SL, off, off + L) + ovl(0, SL, off - TAU, off - TAU + L), iou = ov / (SL + L - ov);
        const m = ds.reduce((a, b) => a + b, 0) / ds.length;
        if (iou > .45 && (!best || iou - .001 * m * s > best.sc)) best = {sc: iou - .001 * m * s, v, r1, r2, L, cw: w.acc > 0};
      }
    }
    if (!best) return null;
    const {v, r1, r2, L} = best, g = {v, r1, r2, th: L}, kind = Math.abs(L - Math.PI) < .06 ? 'straight' : L > Math.PI ? 'big' : '';
    const ids = best.cw ? [r1.p, v, r2.p] : [r2.p, v, r1.p];   // 그린 방향대로
    return {kind: 'ang', ids, g, sub: kind};
  }
  function vAngle(G, pts, s) {
    const P = G.P, px = v => v / s; let best = null;
    for (const v in P) {
      const V = P[v]; let im = 0, dm = Infinity; pts.forEach((q, i) => { const d = dist(q, V); if (d < dm) { dm = d; im = i; } });
      if (dm * s > 22) continue;
      const half = (a, b) => { const part = pts.slice(a, b).filter(q => dist(q, V) > px(10)); if (part.length < 2) return null;
        let L = 0; for (let i = 1; i < part.length; i++) L += dist(part[i - 1], part[i]); if (Math.max(...part.map(q => dist(q, V))) * s < 22) return null;
        let ux = 0, uy = 0; part.forEach(q => { const d = dist(q, V); ux += (q[0] - V[0]) / d; uy += (q[1] - V[1]) / d; }); return {a: Math.atan2(uy, ux), far: Math.max(...part.map(q => dist(q, V)))}; };
      const h1 = half(0, im + 1), h2 = half(im, pts.length); if (!h1 || !h2) continue; const a1 = h1.a, a2 = h2.a;
      const rays = []; G.angles.filter(g => g.v === v).forEach(g => { [g.r1, g.r2].forEach(r => { if (!rays.some(x => Math.abs(nrm(x.a - r.a + Math.PI) - Math.PI) < .02)) rays.push(r); }); });
      const pick = a => { let b = null, bd = Infinity; rays.forEach(r => { const d = Math.abs(nrm(a - r.a + Math.PI) - Math.PI); if (d < bd) { bd = d; b = r; } }); return bd < .38 ? {r: b, d: bd} : null; };
      const r1 = pick(a1), r2 = pick(a2); if (!r1 || !r2 || r1.r === r2.r) continue;
      const g = G.angles.find(x => x.v === v && ((x.r1 === r1.r && x.r2 === r2.r) || (x.r1 === r2.r && x.r2 === r1.r)))
        || G.angles.find(x => x.v === v && [x.r1.p, x.r2.p].sort().join() === [r1.r.p, r2.r.p].sort().join());
      if (!g) continue;
      const sc = dm * s + 20 * (r1.d + r2.d);
      // 이름: 그 변 위의 점 중 손가락이 뻗은 끝에 가장 가까운 점(보조선이 지나며 생긴 교점은 다른 점이 없을 때만)
      const nameOn = (r, far) => { const c = r.side.filter(n => !G.xp.includes(n)); return (c.length ? c : r.side).slice().sort((x, y) => Math.abs(dist(P[x], V) - far) - Math.abs(dist(P[y], V) - far))[0]; };
      if (!best || sc < best.sc) best = {sc, x: {kind: 'ang', ids: [nameOn(r1.r, h1.far), v, nameOn(r2.r, h2.far)], g}};
    }
    return best && best.x;
  }
  function orderLoop(pg, pts, P) {   // 시작한 꼭짓점부터, 손가락이 지나간 차례대로 꼭짓점 이름
    const first = pg.slice().sort((a, b) => dist(pts[0], P[a]) - dist(pts[0], P[b]))[0], cut = Math.floor(pts.length * .12);
    const idx = pg.filter(n => n !== first).map(n => { let m = Infinity, at = 0; pts.forEach((q, i) => { if (i < cut) return; const d = dist(q, P[n]); if (d < m) { m = d; at = i; } }); return {n, at}; });
    return [first, ...idx.sort((a, b) => a.at - b.at).map(x => x.n)];
  }
  const TXT = {pt: x => '점 ' + x.ids[0], seg: x => '선분 ' + x.ids.join(''), tri: x => '△' + x.ids.join(''), quad: x => '사각형 ' + x.ids.join(''), ang: x => '∠' + x.ids.join('') + (x.sub === 'straight' ? '(평각)' : x.sub === 'big' ? '(180°보다 큰 쪽)' : ''), full: x => '점 ' + x.ids[0] + ' 주위의 각',
    aux: x => '보조선 ' + x.ids.join('') + (x.made.length ? '(' + x.made.map(m => m.n + ': ' + m.desc).join(', ') + ')' : '')};
  const HTM = {pt: x => '점 ' + esc(x.ids[0]), seg: x => ov(x.ids.join('')), tri: x => '△' + esc(x.ids.join('')), quad: x => '□' + esc(x.ids.join('')), ang: x => '∠' + esc(x.ids.join('')) + (x.sub === 'straight' ? ' <small>평각</small>' : x.sub === 'big' ? ' <small>큰 쪽</small>' : ''), full: x => '<small>점 ' + esc(x.ids[0]) + ' 주위의 각</small>',
    aux: x => '<small>보조선</small> ' + ov(x.ids.join(''))};

  // ════════ 보조선 — 그림에 선을 더하고, 지나는 점·만나는 점을 이어 붙인다 ════════
  const NEXT = 'MNPQRSTKLIJOUVWXYZ';
  const nextName = f => [...NEXT].find(c => !(c in f.P)) || '?';
  function insertOn(f, line, n) {   // 직선 위의 점 차례(첫 점에서 거리 순)에 끼우기
    const o = f.P[line[0]], key = q => dist(o, q) * Math.sign(((q[0] - o[0]) * (f.P[line[line.length - 1]][0] - o[0]) + (q[1] - o[1]) * (f.P[line[line.length - 1]][1] - o[1])) || 1);
    line.push(n); line.sort((a, b) => key(f.P[a]) - key(f.P[b]));
  }
  function addLine(f, a, b) {
    const pa = f.P[a], pb = f.P[b], eps = 1.2, L = [];
    for (const n in f.P) { const r = segDist(f.P[n], pa, pb); if (r.d < eps && r.t > -1e-6 && r.t < 1 + 1e-6) L.push(n); }
    f.lines.forEach(l => { if (l.includes(a) && l.includes(b)) return;
      const q1 = f.P[l[0]], q2 = f.P[l[l.length - 1]], X = cross(pa, pb, q1, q2); if (!isFinite(X[0])) return;
      const r1 = segDist(X, pa, pb), r2 = segDist(X, q1, q2); if (r1.d > .5 || r2.d > .5) return;
      if (Object.values(f.P).some(q => dist(q, X) < 2.5)) return;
      const n = nextName(f); f.P[n] = X; f.made.push(n); f.xp.push(n); insertOn(f, l, n); L.push(n);
    });
    const line = []; L.forEach(n => { if (!line.includes(n)) line.push(n); }); line.sort((x, y) => segDist(f.P[x], pa, pb).t - segDist(f.P[y], pa, pb).t);
    line.aux = true; f.lines.push(line);
  }
  function applyAux(base, auxes) {
    const f = Object.assign({}, base, {P: Object.assign({}, base.P), lines: base.lines.map(l => Object.assign([...l], {aux: l.aux})), made: [], xp: []});
    auxes.forEach(x => {
      x.pts.forEach(e => { if (e.xy) { f.P[e.n] = e.xy; f.made.push(e.n); const l = f.lines.find(l => l.includes(e.side[0]) && l.includes(e.side[1])); if (l) insertOn(f, l, e.n); } });
      addLine(f, x.pts[0].n, x.pts[1].n);
    });
    return f;
  }
  function fracText(t) {   // 0.5 → 「중점」, 1/3 → 1 : 2
    for (let q = 2; q <= 8; q++) { const k = Math.round(t * q); if (k > 0 && k < q && Math.abs(t - k / q) < .004) { const g = (x, y) => y ? g(y, x % y) : x, d = g(k, q - k); return k === q - k ? '중점' : `${k / d} : ${(q - k) / d}로 나누는 점`; } }
    return '사이의 점';
  }
  // 변 위를 눌렀을 때 후보 점 3개 — 그 문제에 적어 둔 후보(맞는 점 포함)가 있으면 그것, 없으면 중점·삼등분점
  function candsAt(f, G, q, s) {
    let best = null; f.lines.forEach(l => { const r = segDist(q, f.P[l[0]], f.P[l[l.length - 1]]); if (r.d * s < 26 && (!best || r.d < best.d)) best = {l, d: r.d}; });
    if (!best) return null;
    const l = best.l; let spec = (f.cands || []).find(c => l.includes(c.on[0]) && l.includes(c.on[1]) && (() => { const r = segDist(q, f.P[c.on[0]], f.P[c.on[1]]); return r.t > 0 && r.t < 1; })());
    let a, b, ts, okT = null;
    if (spec) { [a, b] = spec.on; ts = spec.ts; okT = ts[0]; }
    else { const tt = l.map(n => segDist(f.P[n], f.P[l[0]], f.P[l[l.length - 1]]).t), tq = segDist(q, f.P[l[0]], f.P[l[l.length - 1]]).t;
      let i = 0; while (i < l.length - 2 && tt[i + 1] < tq) i++; a = l[i]; b = l[i + 1]; ts = [.5, 1 / 3, 2 / 3]; }
    const out = ts.map(t => ({xy: [f.P[a][0] + t * (f.P[b][0] - f.P[a][0]), f.P[a][1] + t * (f.P[b][1] - f.P[a][1])], side: [a, b], t, ok: okT == null ? null : t === okT}))
      .filter(c => !Object.values(f.P).some(p => dist(p, c.xy) * s < 14));
    return out.length ? out : null;
  }

  // ════════ 그림 그리기 ════════
  function svgOf(f) {
    const P = f.P, nm = Object.keys(P), cx = nm.reduce((a, n) => a + P[n][0], 0) / nm.length, cy = nm.reduce((a, n) => a + P[n][1], 0) / nm.length;
    const isDash = (a, b) => (f.dash || []).some(d => (d[0] === a && d[1] === b) || (d[0] === b && d[1] === a));
    const ends = l => [P[l[0]], P[l[l.length - 1]]];
    const lines = f.lines.map(l => { const [a, b] = ends(l); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"${l.aux ? ' class="aux"' : isDash(l[0], l[l.length - 1]) ? ' stroke-dasharray="5 4"' : ''}/>`; }).join('');
    const fills = (f.fills || []).map(([ps, c]) => `<polygon points="${ps.map(n => P[n].join(',')).join(' ')}" fill="${c}" stroke="none"/>`).join('');
    const ras = (f.ra || []).map(([v, a, b]) => { const V = P[v], u = P[a], w = P[b], s = 9, nu = dist(V, u), nw = dist(V, w);
      const p1 = [V[0] + (u[0] - V[0]) / nu * s, V[1] + (u[1] - V[1]) / nu * s], p2 = [V[0] + (w[0] - V[0]) / nw * s, V[1] + (w[1] - V[1]) / nw * s], c = [p1[0] + p2[0] - V[0], p1[1] + p2[1] - V[1]];
      return `<polyline points="${p1.join(',')} ${c.join(',')} ${p2.join(',')}" fill="none" stroke="#1c2230" stroke-width="1.1"/>`; }).join('');
    const dims = (f.dims || []).map(([a, b, t, off]) => { const A_ = P[a], B_ = P[b], dx = B_[0] - A_[0], dy = B_[1] - A_[1], n = Math.hypot(dx, dy), nx = dy / n * off, ny = -dx / n * off;
      const p = [A_[0] + nx, A_[1] + ny], q = [B_[0] + nx, B_[1] + ny];
      return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#7a8190" stroke-width="1" stroke-dasharray="3 3"/><text class="dim" x="${(p[0] + q[0]) / 2 + nx * .9}" y="${(p[1] + q[1]) / 2 + ny * .9}">${esc(t)}</text>`; }).join('');
    const labs = nm.map(n => { const [x, y] = P[n]; let dx, dy;
      if (f.lab && f.lab[n]) [dx, dy] = f.lab[n]; else { const L = Math.hypot(x - cx, y - cy) || 1; dx = (x - cx) / L * 15; dy = (y - cy) / L * 15; }
      return `<circle cx="${x}" cy="${y}" r="3" class="tp${f.made && f.made.includes(n) ? ' new' : ''}"/><text class="pl${f.made && f.made.includes(n) ? ' new' : ''}" x="${x + dx}" y="${y + dy}">${n}</text>`; }).join('');
    return `<svg id="fg" viewBox="0 0 ${f.w} ${f.h}" style="--fs:${f.fs || 20}px" xmlns="http://www.w3.org/2000/svg">${fills}${f.extra ? f.extra(P) : ''}<g class="tl">${lines}</g>${ras}${dims}<g id="hl"></g>${labs}<g id="cand"></g><path id="ink" class="ink" d=""/></svg>`;
  }
  function highlight(G, x) {
    const P = G.P, g = document.getElementById('hl'); if (!g) return;
    let s = '';
    if (x.kind === 'pt') s = `<circle cx="${P[x.ids[0]][0]}" cy="${P[x.ids[0]][1]}" r="11"/>`;
    else if (x.kind === 'seg') s = `<line x1="${P[x.ids[0]][0]}" y1="${P[x.ids[0]][1]}" x2="${P[x.ids[1]][0]}" y2="${P[x.ids[1]][1]}"/>`;
    else if (x.kind === 'tri' || x.kind === 'quad') s = `<polygon points="${x.ids.map(n => P[n].join(',')).join(' ')}"/>`;
    else if (x.kind === 'ang') { const a = x.g, V = P[a.v], r = Math.min(30, .3 * Math.min(dist(V, P[a.r1.p]), dist(V, P[a.r2.p]))), p1 = [V[0] + r * Math.cos(a.r1.a), V[1] + r * Math.sin(a.r1.a)], p2 = [V[0] + r * Math.cos(a.r1.a + a.th), V[1] + r * Math.sin(a.r1.a + a.th)];
      s = `<path d="M${V[0]},${V[1]} L${p1[0]},${p1[1]} A${r},${r} 0 ${a.th > Math.PI ? 1 : 0} 1 ${p2[0]},${p2[1]} Z"/>`; }
    else if (x.kind === 'full') s = `<circle class="fl" cx="${P[x.ids[0]][0]}" cy="${P[x.ids[0]][1]}" r="20"/>`;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g'); el.setAttribute('class', 'hk ' + x.kind); el.innerHTML = s; g.appendChild(el);
    setTimeout(() => el.classList.add('fade'), 1300); setTimeout(() => el.remove(), 2100);
  }

  // ════════ 말 + 그린 것 합치기 ════════
  // ① 「이 삼각형」「이 각」「이 변」「이거」「여기」 같은 가리키는 말이 있으면, 그린 차례대로 그 자리에 이름을 넣는다
  //    (음성 글자가 1~2초 늦게 와도 자리가 맞는다 — 기다릴 필요 없음). 종류가 맞는 가리키는 말만 쓴다.
  // ② 가리키는 말이 없으면 말한 시간(t0~t1) 비율로 낱말 사이에 끼운다(어림).
  const DEI_N = {삼각형: ['tri'], 사각형: ['quad'], 각: ['ang', 'full'], 변: ['seg', 'aux'], 선분: ['seg', 'aux'], 보조선: ['aux'], 선: ['seg', 'aux'], 점: ['pt']};
  const NOUN = /^(삼각형|사각형|보조선|선분|각(?!각)|변|선|점)(.*)$/, GEN = /^(이거|이것|여기|요기|이게|이걸|얘)(.*)$/, ANY = ['tri', 'quad', 'ang', 'full', 'seg', 'aux', 'pt'];
  function compose(S) {
    const W = []; S.speech.forEach(sp => { const ws = sp.text.split(' ').filter(Boolean); ws.forEach((w, k) => W.push({w, t: sp.t0 + (k + .5) / ws.length * (sp.t1 - sp.t0), sp})); });
    const D = [];   // 가리키는 말: {i(첫 낱말), n(낱말 수), kinds, suf}
    for (let i = 0; i < W.length; i++) {
      const w = W[i].w, nx = W[i + 1] && W[i + 1].w; let m;
      if (/^(이|요|그|저)$/.test(w) && nx && (m = nx.match(NOUN))) { D.push({i, n: 2, kinds: DEI_N[m[1]], suf: m[2]}); i++; }
      else if ((m = w.match(/^(이|요|그)(삼각형|사각형|보조선|선분|각(?!각)|변|선|점)(.*)$/))) D.push({i, n: 1, kinds: DEI_N[m[2]], suf: m[3]});
      else if ((m = w.match(GEN))) D.push({i, n: 1, kinds: ANY, suf: m[2]});
    }
    const gs = S.marks.slice().sort((a, b) => a.t - b.t), at = {}, loose = []; let last = -1;
    gs.forEach(g => { const d = D.find(d => d.i > last && !d.g && d.kinds.includes(g.x.kind)); if (d) { d.g = g; last = d.i; at[d.i] = d; } else loose.push(g); });
    const out = []; let li = 0;
    for (let i = 0; i < W.length; i++) {
      const sp = W[i].sp, t0 = sp.t0;
      if (i === 0 || W[i - 1].sp !== sp) while (li < loose.length && loose[li].t < t0) out.push({g: loose[li++]});
      while (li < loose.length && loose[li].t >= t0 && loose[li].t <= sp.t1 && loose[li].t < W[i].t) out.push({g: loose[li++]});
      const d = at[i]; if (d) { out.push({g: d.g, suf: d.suf}); i += d.n - 1; continue; }
      out.push({w: W[i].w});
    }
    while (li < loose.length) out.push({g: loose[li++]});
    return out;
  }
  // 조사를 이름 끝소리에 맞춘다 — 「이 삼각형과」 → △ABD와(디: 받침 없음) · 받침 있는 글자 이름은 L(엘)·M(엠)·N(엔)·R(알)뿐
  function josa(x, suf) {
    if (!suf) return '';
    const last = x.ids[x.ids.length - 1], tail = x.kind === 'full' || x.sub, b = tail || /[LMNR]$/.test(last), rieul = !tail && /[LR]$/.test(last);   // 「…주위의 각」「(평각)」「(…큰 쪽)」은 받침으로 끝남
    if (/^(으로|로)/.test(suf)) return (b && !rieul ? '으로' : '로') + suf.replace(/^(으로|로)/, '');
    const one = {과: ['과', '와'], 와: ['과', '와'], 은: ['은', '는'], 는: ['은', '는'], 을: ['을', '를'], 를: ['을', '를'], 가: ['이', '가']}[suf[0]];
    if (one) return (b ? one[0] : one[1]) + suf.slice(1);
    if (suf === '이') return b ? '이' : '가';
    if (suf[0] === '이') return b ? suf : suf.slice(1);   // 이고·이야·이므로·이랑 → 받침 없으면 고·야·므로·랑
    return suf;
  }
  const plain = seq => seq.map(z => z.w ?? TXT[z.g.x.kind](z.g.x) + josa(z.g.x, z.suf)).join(' ').replace(/\s+/g, ' ').trim();
  const html = (seq, del) => seq.map(z => z.w != null ? esc(z.w) : `<span class="chip" ${del ? `data-del="${z.g.id}"` : ''}>${HTM[z.g.x.kind](z.g.x)}${del ? '<i>×</i>' : ''}</span>${esc(josa(z.g.x, z.suf))}`).join(' ');

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
      ${PROBS.map((p, i) => `${i && PROBS[i - 1].sec === p.sec ? '' : `<div class="t-sec">${esc(p.sec)}</div>`}<button class="t-item" data-id="${p.id}"><div class="t-iq">${p.qh}</div></button>`).join('')}
      <div class="t-src" style="margin-top:26px;text-align:center">따라 그리기 시안 0.4 (10/22)</div>
    </div>`;
    $('#back').onclick = () => { location.href = 'try.html'; };
    $('#how').onclick = () => { const b = $('#howBox'); b.innerHTML = b.innerHTML ? '' : HOW; };
    root().querySelectorAll('.t-item').forEach(b => b.onclick = () => run(PROBS.find(p => p.id === b.dataset.id)));
  }
  const HOW = `<div class="tc-help"><div><b>삼각형 · 사각형</b> 변을 따라 한 바퀴 빙 — 시작한 꼭짓점부터 그린 차례로 이름이 붙어요</div><div><b>선분</b> 그 변을 따라 슥</div><div><b>각</b> 한 변을 따라 와서 꼭짓점을 지나 다른 변으로 ㄱ자처럼 (꼭짓점 근처 작은 호도 돼요)</div><div><b>평각 · 큰 각 · 360°</b> 일직선 가운데 점 둘레에 반원 = 평각 · 반대쪽으로 크게 돈 호 = 180°보다 큰 쪽(부채꼴의 큰 중심각) · 점 둘레에 작은 원 한 바퀴 = 그 점 주위의 각(360°)</div><div><b>점</b> 톡</div><div><b>보조선</b> 「보조선」을 누르고 시작할 곳 → 끝낼 곳을 눌러요. 변 위를 누르면 후보 점 3개 중에서 골라요</div><div><b>말과 잇기</b> 「이 삼각형」「이 각」「이 변」「이거」처럼 말하면서 그리면 그 말 자리에 이름이 들어가요 — 말이 늦게 나타나도 기다리지 않아도 돼요</div><div class="t-sub">잘못 들어간 이름은 눌러서 빼요.</div></div>`;

  function run(p) {
    stopRec(); window.scrollTo(0, 0);
    const base = FIGS[p.fig]; if (base.init && !base._ok) { base.init(base); base._ok = true; }
    let f = base, G = build(f);
    const S = {speech: [], marks: [], typed: false, nid: 0, aux: [], am: null};
    root().innerHTML = `<div class="t-wrap">
      <div class="t-top"><button class="t-back" id="back">‹ 목록</button><span class="t-sp"></span><span class="t-tag r3">시안</span></div>
      <div class="t-card"><div class="t-q tc-q">${p.qh}</div>
        ${p.src ? `<div class="t-src">${esc(p.src)}</div>` : ''}
        <div class="tc-fig" id="figbox"></div>
        <div class="tc-tools"><button class="t-btn small" id="auxb">＋ 보조선</button><span class="t-sub tc-tip" id="tip">${esc(p.tip)}</span></div>
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
    const dropMark = m => {   // 보조선을 빼면 그 뒤에 그은 보조선도 같이 뺀다(그 점을 쓸 수 있어서)
      if (m.x.kind === 'aux') { const k = S.aux.indexOf(m.x.rec); const gone = S.aux.splice(k); S.marks = S.marks.filter(z => !(z.x.kind === 'aux' && gone.includes(z.x.rec))); remount(); }
      else S.marks = S.marks.filter(z => z !== m);
      draw();
    };
    live.onclick = e => { const d = e.target.closest('[data-del]'); if (!d) return; const m = S.marks.find(m => String(m.id) === d.dataset.del); if (m) dropMark(m); };
    draw();

    // ── 따라 그리기 + 보조선 ──
    let cur = null;
    const tipEl = $('#tip'), auxb = $('#auxb');
    const setTip = t => { tipEl.textContent = t || p.tip; tipEl.classList.toggle('on', !!t); };
    const put = (x, t) => {   // 알아맞힌 것을 입력칸(또는 글 칸)에
      if (S.typed) { const ta = $('#ta'), w = TXT[x.kind](x), i = ta.selectionStart ?? ta.value.length; const pre = ta.value.slice(0, i), post = ta.value.slice(i);
        ta.value = pre + (pre && !/\s$/.test(pre) ? ' ' : '') + w + (post && !/^\s/.test(post) ? ' ' : '') + post; draw(); return; }
      S.marks.push({id: ++S.nid, x, t}); draw();
    };
    const gotBadge = h => { const got = $('#got'); got.innerHTML = '✓ ' + h; got.classList.remove('on'); void got.offsetWidth; got.classList.add('on'); };
    function remount() {
      f = S.aux.length ? applyAux(base, S.aux) : base; G = build(f);
      $('#figbox').innerHTML = '<div class="tc-got" id="got"></div>' + svgOf(f);
      const svg = $('#fg'), ink = $('#ink');
      const toFig = e => { const m = svg.getScreenCTM().inverse(), q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(m); return [r.x, r.y]; };
      svg.addEventListener('pointerdown', e => { e.preventDefault(); try { svg.setPointerCapture(e.pointerId); } catch (er) {} cur = {pts: [toFig(e)], t0: Date.now()}; ink.setAttribute('d', ''); ink.classList.remove('bad', 'fade'); });
      svg.addEventListener('pointermove', e => { if (!cur || S.am) return; const q = toFig(e), l = cur.pts[cur.pts.length - 1]; if (dist(q, l) < .8) return; cur.pts.push(q); ink.setAttribute('d', 'M' + cur.pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L')); });
      svg.addEventListener('pointerup', e => {
        if (!cur) return; const c = cur; cur = null; const sc = svg.getScreenCTM().a;
        if (S.am) return auxTap(toFig(e), sc);
        const x = recog(G, c.pts, sc);
        if (!x) { ink.classList.add('bad'); setTimeout(() => ink.classList.add('fade'), 500); setTimeout(() => { if (!cur) ink.setAttribute('d', ''); }, 1100); toast('어느 부분인지 모르겠어요. 선을 따라 다시 그려 봐'); return; }
        ink.classList.add('fade'); setTimeout(() => { if (!cur) ink.setAttribute('d', ''); }, 650); highlight(G, x);
        gotBadge(HTM[x.kind](x)); put(x, (c.t0 + Date.now()) / 2);
      });
      svg.addEventListener('pointercancel', () => { cur = null; ink.setAttribute('d', ''); });
    }
    remount();

    // 보조선: 시작 → 끝. 꼭짓점이면 그 점, 변 위면 후보 점 3개(투명) 중에서 고른다
    const candLayer = () => document.getElementById('cand');
    const endAux = () => { S.am = null; auxb.classList.remove('on'); setTip(''); if (candLayer()) candLayer().innerHTML = ''; };
    auxb.onclick = () => { if (S.am) return endAux(); S.am = {}; auxb.classList.add('on'); setTip('보조선을 시작할 꼭짓점이나 변 위를 눌러 봐'); };
    function auxTap(q, sc) {
      const am = S.am;
      if (am.cands) {   // 후보 점 중 하나를 눌렀나
        const k = am.cands.findIndex(c => dist(c.xy, q) * sc < 22);
        if (k >= 0) return chosen(Object.assign({}, am.cands[k], {xy0: am.cands[k].xy}));
        am.cands = null; candLayer().innerHTML = am.start ? `<circle class="pk" cx="${am.start.xy0[0]}" cy="${am.start.xy0[1]}" r="8"/>` : '';
      }
      let vn = null, vd = Infinity; for (const n in f.P) { const d = dist(f.P[n], q); if (d < vd) { vd = d; vn = n; } }
      if (vd * sc < 24) return chosen({n: vn, xy0: f.P[vn]});
      const cs = candsAt(f, G, q, sc);
      if (!cs) return toast('꼭짓점이나 변 위를 눌러 줘');
      am.cands = cs; candLayer().innerHTML = (am.start ? `<circle class="pk" cx="${am.start.xy0[0]}" cy="${am.start.xy0[1]}" r="8"/>` : '') + cs.map(c => `<circle class="cd" cx="${c.xy[0]}" cy="${c.xy[1]}" r="7.5"/>`).join('');
      setTip('후보 점 중에서 하나를 골라 눌러 봐');
    }
    function chosen(pt) {
      const am = S.am; am.cands = null;
      if (!am.start) { am.start = pt; am.t = Date.now(); candLayer().innerHTML = `<circle class="pk" cx="${pt.xy0[0]}" cy="${pt.xy0[1]}" r="8"/>`; setTip('이제 보조선을 끝낼 꼭짓점이나 변 위를 눌러 봐'); return; }
      const a = am.start, b = pt;
      if (dist(a.xy0, b.xy0) < 3) return toast('다른 곳을 눌러 줘');
      if (a.n && b.n && f.lines.some(l => l.includes(a.n) && l.includes(b.n))) { toast('이미 있는 선이야'); endAux(); return; }
      // 새 점 이름 붙이기(지금 그림 기준) → 기록
      const tmp = Object.assign({}, f, {P: Object.assign({}, f.P)}), pts = [a, b].map(e => {
        if (e.n) return {n: e.n};
        const n = nextName(tmp); tmp.P[n] = e.xy; return {n, xy: e.xy, side: e.side, t: e.t, ok: e.ok};
      });
      const made = pts.filter(e => e.xy).map(e => ({n: e.n, desc: e.side.join('') + '의 ' + fracText(e.t), ok: e.ok}));
      const rec = {pts}; S.aux.push(rec); remount();
      const x = {kind: 'aux', ids: [pts[0].n, pts[1].n], made, rec};
      endAux(); gotBadge(HTM.aux(x)); put(x, (am.t + Date.now()) / 2);
    }

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
    $('#undo').onclick = () => { if (S.typed) return toast('글로 쓸 때는 글자를 지워 주세요'); const m = S.marks.slice().sort((a, b) => b.t - a.t)[0]; if (m) dropMark(m); };
    $('#clr').onclick = () => { stopRec(); mic.classList.remove('on'); S.speech = []; S.marks = []; S.aux = []; if (S.am) endAux(); remount(); if (S.typed) $('#ta').value = ''; draw(); $('#res').innerHTML = ''; };
    sub.onclick = () => {
      stopRec(); mic.classList.remove('on');
      const seq = S.typed ? null : compose(S), mine = S.typed ? esc($('#ta').value.trim()) : html(seq, false);
      const drawn = S.typed ? '' : S.marks.slice().sort((a, b) => a.t - b.t).map(m => HTM[m.x.kind](m.x)).join(' · ');
      const auxRec = S.marks.filter(m => m.x.kind === 'aux').map(m => `${HTM.aux(m.x)}${m.x.made.map(d => ` — ${esc(d.n)}: ${esc(d.desc)}${d.ok === true ? ' <b style="color:var(--ok)">(이 문제에 쓰는 점)</b>' : d.ok === false ? ' <b style="color:var(--warn)">(다른 점을 고름)</b>' : ''}`).join('')}`).join('<br>');
      $('#res').innerHTML = `<div class="t-note"><h3>내가 한 말</h3><div class="tc-mine">${mine}</div>
        ${drawn ? `<div class="t-sub" style="margin-top:6px">그려서 넣은 것: ${drawn}</div>` : ''}
        ${auxRec ? `<div class="t-sub" style="margin-top:6px">어른 기록 · 그은 보조선<br>${auxRec}</div>` : ''}
        ${p.ansh ? `<h3 style="margin-top:12px">모범 답</h3><div class="tc-mine">${p.ansh}</div>` : ''}
        <div class="t-sub" style="margin-top:10px">시안이라 채점은 하지 않아요. AI 에게는 「${esc(S.typed ? $('#ta').value.trim().slice(0, 40) : plain(seq).slice(0, 40))}…」처럼 글자로 넘어가요.</div></div>`;
    };
  }

  window.TRACE_TEST = {FIGS, build, recog, compose, plain, applyAux, candsAt, PROBS};   // 시험용
  home();
})();
