/* 중3-1 이차함수 견본 2판 — 그래프 조작 체험 (2026-10-23, try.html 에 붙음)
   마스터 10/23: 「그래프도 도형처럼 그리거나 고를 수 있게」 — 그래프를 말로 묘사시키지 않고
     ① 그래프 위를 누르기  ② 그래프 카드 고르기(보기마다 왜 아닌지)  ③ 대강 따라 그리기
   원천: 작업도구/질문설계/m31_quad.py (11번 증가하는 부분 · 9번 그래프 카드 · 4번 대강 그리기) — 문제·숫자는 그 파일과 같다.
   try.js 와는 A.tryKit(frame · step · noteAdd · showLog …)으로만 이어진다. 기록은 저장하지 않는다(체험). */
(() => {
  'use strict';
  const A = window.APP;
  const INK = '#1c2230', SOFT = '#6b7280', CUR = '#c2412d', HOT = '#E07B39', BLUE = '#2f5fb3';
  const MI = c => /[a-z]/.test(c) ? (c === 'h' ? 'ℎ' : String.fromCodePoint(0x1D44E + c.charCodeAt(0) - 97)) : c;
  const mi = s => String(s).replace(/[a-z]/g, MI);
  const neg = v => (v < 0 ? '−' : '') + Math.abs(v);

  /* ── 좌표평면 그림(SVG) — 작업도구/질문설계/graph_m31.py 와 같은 모양 ── */
  class Graph {
    constructor(xr, yr, w = 300, sy) {
      [this.x0, this.x1] = xr; [this.y0, this.y1] = yr;
      this.sx = w / (this.x1 - this.x0); this.sy = sy || this.sx; this.W = w; this.H = (this.y1 - this.y0) * this.sy; this.el = [];
    }
    P(x, y) { return [+((x - this.x0) * this.sx).toFixed(1), +((this.y1 - y) * this.sy).toFixed(1)]; }
    M(px, py) { return [px / this.sx + this.x0, this.y1 - py / this.sy]; }   // 화면 → 수
    add(s, z = 2) { this.el.push([z, s]); return this; }
    fn(f, xr, o = {}) {
      const [a, b] = xr || [this.x0, this.x1], segs = []; let cur = [];
      for (let i = 0; i <= 160; i++) { const x = a + (b - a) * i / 160, y = f(x);
        if (y < this.y0 - .3 || y > this.y1 + .3) { if (cur.length > 1) segs.push(cur); cur = []; continue; } cur.push(this.P(x, y)); }
      if (cur.length > 1) segs.push(cur);
      const d = segs.map(s => 'M' + s.map(p => p.join(',')).join(' L')).join(' ');
      const t = o.tap ? ` data-t="${o.tap}"` : '';
      return this.add(`<g${t} class="${o.tap ? 'gtp' : ''}">${o.tap ? `<path d="${d}" fill="none" stroke="transparent" stroke-width="26"/>` : ''}<path class="ln" d="${d}" fill="none" stroke="${o.col || CUR}" stroke-width="${o.w || 2.4}" stroke-linecap="round"${o.dash ? ' stroke-dasharray="6 5"' : ''}/></g>`, o.z || 3);
    }
    para(a, p, q, xr, o) { return this.fn(x => a * (x - p) ** 2 + q, xr, o); }
    seg(p, q, o = {}) { const a = this.P(...p), b = this.P(...q);
      return this.add(`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${o.col || SOFT}" stroke-width="${o.w || 1.2}"${o.dash ? ' stroke-dasharray="4 3"' : ''}/>`, 1); }
    pt(x, y, o = {}) { const a = this.P(x, y); return this.add(`<circle cx="${a[0]}" cy="${a[1]}" r="${o.r || 4}" fill="${o.col || INK}"/>`, 5); }
    text(x, y, s, o = {}) { const a = this.P(x, y);
      return this.add(`<text x="${a[0] + (o.dx || 0)}" y="${a[1] + (o.dy || 0)}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="central" font-size="${o.size || 14}" fill="${o.col || INK}" paint-order="stroke" stroke="#fff" stroke-width="3">${mi(s)}</text>`, 6); }
    xt(x, s) { const a = this.P(x, 0); this.add(`<line x1="${a[0]}" y1="${a[1] - 3}" x2="${a[0]}" y2="${a[1] + 3}" stroke="${INK}"/>`, 4); return this.text(x, 0, s ?? neg(x), {dy: 15, size: 12.5}); }
    yt(y, s, right) { const a = this.P(0, y); this.add(`<line x1="${a[0] - 3}" y1="${a[1]}" x2="${a[0] + 3}" y2="${a[1]}" stroke="${INK}"/>`, 4); return this.text(0, y, s ?? neg(y), {dx: right ? 7 : -7, anchor: right ? 'start' : 'end', size: 12.5}); }
    guide(x, y) { if (y) this.seg([x, 0], [x, y], {dash: true}); if (x) this.seg([0, y], [x, y], {dash: true}); return this; }
    lattice(xs, ys) { for (const x of xs) for (const y of ys) { const a = this.P(x, y); this.add(`<circle cx="${a[0]}" cy="${a[1]}" r="2.2" fill="#c9d0db"/>`, 1); } return this; }
    svg(o = {}) {
      const a = this.P(this.x0, 0), b = this.P(this.x1, 0), c = this.P(0, this.y0), d = this.P(0, this.y1), O = this.P(0, 0);
      const ax = `<line x1="${a[0] - 4}" y1="${a[1]}" x2="${b[0] + 6}" y2="${b[1]}" stroke="${INK}" stroke-width="1.3"/><polygon points="${b[0] + 13},${b[1]} ${b[0] + 4},${b[1] - 4.5} ${b[0] + 4},${b[1] + 4.5}" fill="${INK}"/>`
        + `<text x="${b[0] + 16}" y="${b[1] + 1}" font-size="16" dominant-baseline="central">${mi('x')}</text>`
        + `<line x1="${c[0]}" y1="${c[1] + 4}" x2="${d[0]}" y2="${d[1] - 6}" stroke="${INK}" stroke-width="1.3"/><polygon points="${d[0]},${d[1] - 13} ${d[0] - 4.5},${d[1] - 4} ${d[0] + 4.5},${d[1] - 4}" fill="${INK}"/>`
        + `<text x="${d[0]}" y="${d[1] - 17}" font-size="16" text-anchor="middle">${mi('y')}</text>`
        + (o.noO ? '' : `<text x="${O[0] - 5}" y="${O[1] + 15}" font-size="13" text-anchor="end" font-family="Malgun Gothic,sans-serif">O</text>`);
      const body = this.el.slice().sort((p, q) => p[0] - q[0]).map(e => e[1]).join('');
      const p = 16;
      return `<svg class="gsv${o.cls ? ' ' + o.cls : ''}" viewBox="${-p - 8} ${-p - 22} ${this.W + 2 * p + 36} ${this.H + 2 * p + 40}" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Times New Roman,serif" fill="${INK}">${ax}${body}<g class="layer"></g></svg>`;
    }
  }
  const quad = (a, p, q) => x => a * (x - p) ** 2 + q;

  /* ── 견본 세 문제 (m31_quad.py 와 같은 숫자) ── */
  const S = [
    {id: 'g1', r: 1, kind: '그래프 누르기', how: '그래프에서 올라가는 부분을 손가락으로 누르고, 범위는 카드로 — 말은 「경계가 어디인지」만',
     q: 'y=−2x²+8x−3에서 x의 값이 증가할 때 y의 값도 증가하는 x의 값의 범위를 구하려고 해. 그래프에서 그 부분을 누르고, 범위를 골라 봐.',
     src: '견본 2판 11번 · 쎈 유형06 대표 1280(숫자 바꿈)', ans: 'x<2  (y=−2(x−2)²+5 — 위로 볼록, 축 x=2의 왼쪽에서 올라감)',
     fig: () => { const g = new Graph([-0.6, 4.6], [-4, 6], 280, 24);
       g.fn(quad(-2, 2, 5), [-0.6, 2], {tap: 'L'}); g.fn(quad(-2, 2, 5), [2, 4.6], {tap: 'R'}); return g.svg(); },
     steps: [
       {k: 'gtap', label: '올라가는 부분', p: 'x의 값이 커질 때(오른쪽으로 갈 때) 그래프가 <b>올라가는 부분</b>을 눌러 봐.', want: ['L'], name: {L: '축의 왼쪽 부분', R: '축의 오른쪽 부분'},
        trap: {R: '그 부분은 오른쪽으로 갈수록 내려가지? 다시 봐.'}, teach: '왼쪽 부분이 오른쪽으로 갈수록 올라가.'},
       {k: 'say', label: '경계는 어디', p: '올라가는 부분과 내려가는 부분의 <b>경계</b>는 어디야? <small>(짧게 말해 봐)</small>', re: /(축|꼭짓점|꼭지점|가운데|대칭)/,
        key: '증가·감소는 축(꼭짓점의 x좌표)에서 바뀐다', ask: '그래프가 올라가다가 내려가기 시작하는 곳은 어디야?', teach: '포물선은 <b>축</b>(꼭짓점의 x좌표)을 경계로 증가와 감소가 바뀌어.',
        note: 'y = −2(x−2)² + 5  →  축 x = 2'},
       {k: 'cards', label: '범위 고르기', p: '범위를 골라 놓아 봐. <small>(y=−2(x−2)²+5)</small>', deck: ['x<2', 'x>2', 'x<−2', 'x>−2', 'x<5'], want: ['x<2'],
        trap: {'x>2': '위로 볼록이면 축의 오른쪽에서는 내려가.', 'x<−2': '−2(x−2)²+5에서 축은 x=?', 'x>−2': '−2(x−2)²+5에서 축은 x=?', 'x<5': '5는 꼭짓점의 y좌표야.'},
        note: '증가하는 범위: x < 2'}]},
    {id: 'g2', r: 1, kind: '그래프 카드 고르기', how: '그래프 카드 다섯 장 중 하나 — 잘못 고르면 그 카드가 어디서 틀렸는지 알려 줌',
     q: '이차함수 y=−x²+4x−1의 그래프를 카드에서 골라 봐. 그리고 무엇을 확인해서 골랐는지 말해 봐.',
     src: '견본 2판 9번 · 쎈 유형04 대표 1270(숫자 바꿈)', ans: 'A  (y=−(x−2)²+3 — 위로 볼록 · 꼭짓점 (2, 3) · y절편 −1)',
     steps: [
       {k: 'gcard', label: '그래프 고르기', p: '<b>y=−x²+4x−1</b>의 그래프를 골라 봐.', want: 'A',
        cards: [['A', -1, 2, 3], ['B', -1, -2, 3], ['C', 1, 2, 3], ['D', -0.5, 2, 3], ['E', -1, 2, -5]],
        trap: {B: '꼭짓점의 x좌표 부호를 봐. y=−(x−2)²+3이야.', C: 'x²의 계수가 음수면 어느 쪽으로 볼록해?', D: 'y절편을 봐. x=0을 넣으면 y는?', E: '−4를 괄호 밖으로 꺼낼 때 앞의 −1을 곱했는지 봐.'},
        teach: '위로 볼록 · 꼭짓점 (2, 3) · y절편 −1이 모두 맞는 건 <b>A</b>야.', note: 'y = −(x−2)² + 3 : 위로 볼록 · 꼭짓점 (2, 3) · y절편 −1'},
       {k: 'say', label: '무엇을 확인했나', p: '<b>무엇을 확인해서</b> 골랐어? <small>(짧게)</small>', re: /(꼭짓점|꼭지점)/, key: '볼록한 방향 · 꼭짓점 · y절편을 확인했다',
        ask: '카드마다 다른 게 뭐였어? 꼭짓점, 볼록한 방향, y절편 중에서?', teach: '<b>볼록한 방향 · 꼭짓점 · y절편</b> 세 가지가 모두 맞아야 해.'}]},
    {id: 'g3', r: 1, kind: '대강 그리기', how: '꼭짓점·y절편을 점으로 찍고, 손가락으로 포물선을 대강 그리면 앱이 확인하고 바른 그래프를 겹쳐 줌',
     q: 'y=−x²+6x−5의 그래프를 좌표평면에 대강 그려 봐.',
     src: '견본 2판 4번 · 숨마쿰 Q092 223쪽 · 쎈 유형04', ans: '위로 볼록 · 꼭짓점 (3, 4) · y절편 −5인 포물선  (y=−(x−3)²+4)',
     steps: [
       {k: 'say', label: '먼저 알아볼 것', p: '그래프를 그리려면 <b>무엇을 먼저</b> 알아봐야 해? <small>(짧게)</small>', re: /(꼭짓점|꼭지점)/,
        key: '볼록한 방향 · 꼭짓점 · y절편', ask: '포물선의 어느 점을 알면 위치가 정해질까?', teach: '<b>볼록한 방향(x²의 계수의 부호) · 꼭짓점 · y절편</b>을 알아봐.'},
       {k: 'cards', label: '꼴 바꾸기', p: 'y=a(x−p)²+q 꼴로 고친 식을 골라 놓아 봐.', deck: ['−(x−3)²+4', '−(x+3)²+4', '−(x−3)²−14', '(x−3)²+4'], want: ['−(x−3)²+4'],
        trap: {'−(x+3)²+4': 'x²−6x+9는 (x−3)²이야.', '−(x−3)²−14': '−9를 꺼낼 때 앞의 −1을 곱하면 +9야.', '(x−3)²+4': '앞의 −를 빼먹었어.'}, note: 'y = −(x−3)² + 4'},
       {k: 'gpoint', label: '꼭짓점 찍기', p: '좌표평면에서 <b>꼭짓점</b>의 자리를 눌러 봐.', want: [3, 4], hint: 'y=−(x−3)²+4의 꼭짓점은 (p, q)야.', mark: 'v', note: '꼭짓점 (3, 4)'},
       {k: 'gpoint', label: 'y절편 찍기', p: '<b>y절편</b>의 자리를 눌러 봐.', want: [0, -5], hint: 'x=0을 넣으면 y는? 그 점은 y축 위에 있어.', mark: 'y', note: 'y절편 −5 → 점 (0, −5)'},
       {k: 'choice', label: '볼록한 방향', p: '그래프는 어느 쪽으로 볼록해?', opts: ['아래로 볼록', '위로 볼록'], want: '위로 볼록', hint: 'x²의 계수의 부호를 봐.'},
       {k: 'gdraw', label: '대강 그리기', p: '두 점을 지나도록 <b>손가락으로 포물선을 대강</b> 그려 봐. 다 그렸으면 「다 그렸어」.', a: -1, pv: [3, 4], yi: [0, -5]}]}
  ];

  /* ── 그리기 판(점 찍기 · 대강 그리기가 같이 씀) ── */
  const BOARD = () => { const g = new Graph([-1, 7], [-6, 5], 300);
    for (let x = -1; x <= 7; x++) if (x) g.xt(x); for (const y of [-6, -4, -2, 2, 4]) g.yt(y);
    g.lattice([-1, 0, 1, 2, 3, 4, 5, 6, 7], [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]); return g; };
  let marks = {};

  /* ── 새 단계 네 가지 (try.js step 과 같은 약속: {st: solo|ask|tea, memo}) ── */
  function gstep(K, s, fig) {
    return new Promise(resolve => {
      const w = document.createElement('div'); w.className = 't-step'; document.querySelector('#stp').appendChild(w);
      w.innerHTML = `<div class="t-prompt"><span class="t-pk">${A.esc(s.label)}</span>${K.FH(s.p)}</div><div class="t-body"></div>`;
      const body = w.querySelector('.t-body'); let tries = 0; const memo = [];
      const finish = st => { K.fold(w, s.label, st); resolve({st, memo: memo.join(' · ')}); };
      const msg = (h, c) => { body.querySelectorAll('.t-msg').forEach(x => x.remove()); const d = document.createElement('div'); d.className = 't-msg ' + (c || 'hint'); d.innerHTML = h; body.appendChild(d); };

      if (s.k === 'gtap') {
        body.innerHTML = `<div class="g-fig">${fig()}</div>`;
        const gs = [...body.querySelectorAll('[data-t]')];
        gs.forEach(el => el.onclick = () => {
          const t = el.dataset.t;
          if (s.want.includes(t)) { el.classList.add('on'); gs.forEach(x => x.onclick = null); msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 700); }
          el.classList.add('no'); setTimeout(() => el.classList.remove('no'), 900); tries++; memo.push('「' + (s.name[t] || t) + '」 누름');
          if (tries >= 2) { gs.forEach(x => { x.onclick = null; if (s.want.includes(x.dataset.t)) x.classList.add('on'); }); msg(K.FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1700); }
          msg(K.F(s.trap[t] || '다시 봐.'));
        });
      } else if (s.k === 'gcard') {
        body.innerHTML = `<div class="g-cards">${s.cards.map(([nm, a, p, q]) => `<button class="g-card" data-c="${nm}">${cardSvg(a, p, q)}<b>${nm}</b></button>`).join('')}</div>`;
        const bs = [...body.querySelectorAll('[data-c]')];
        bs.forEach(b => b.onclick = () => {
          const c = b.dataset.c;
          if (c === s.want) { b.classList.add('on'); bs.forEach(x => x.disabled = true); msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 700); }
          b.classList.add('no'); tries++; memo.push('카드 ' + c + ' 고름');
          if (tries >= 2) { bs.forEach(x => { x.disabled = true; if (x.dataset.c === s.want) x.classList.add('on'); }); msg(K.FH(s.teach), 'warn'); return setTimeout(() => finish('tea'), 1800); }
          msg(`<b>카드 ${c}</b> — ` + K.F(s.trap[c]));
        });
      } else if (s.k === 'gpoint') {
        const g = BOARD(); for (const m in marks) g.pt(...marks[m], {col: INK, r: 5});
        body.innerHTML = `<div class="g-fig g-board">${g.svg()}</div>`;
        const sv = body.querySelector('svg');
        sv.onclick = ev => {
          const [x, y] = toMath(sv, g, ev); const X = Math.round(x), Y = Math.round(y);
          if (Math.abs(x - X) > .45 || Math.abs(y - Y) > .45) return;   // 격자점 가까이만
          dot(sv, g, X, Y, (X === s.want[0] && Y === s.want[1]) ? HOT : '#c0392b');
          if (X === s.want[0] && Y === s.want[1]) { sv.onclick = null; marks[s.mark] = [X, Y]; msg('맞아.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 700); }
          tries++; memo.push(`(${neg(X)}, ${neg(Y)}) 누름`);
          setTimeout(() => sv.querySelector('.layer').lastChild?.remove(), 900);
          if (tries >= 2) { sv.onclick = null; marks[s.mark] = s.want; dot(sv, g, ...s.want, HOT); msg(`바른 자리는 (${neg(s.want[0])}, ${neg(s.want[1])})야.`, 'warn'); return setTimeout(() => finish('tea'), 1700); }
          msg(K.F(s.hint));
        };
      } else if (s.k === 'gdraw') {
        const g = BOARD(); for (const m in marks) g.pt(...marks[m], {col: INK, r: 5});
        body.innerHTML = `<div class="g-fig g-board g-draw">${g.svg()}</div><div class="t-row"><button class="t-btn small" id="gClr">지우고 다시</button><span class="t-sp"></span><button class="t-btn pri" id="gOk" disabled>다 그렸어</button></div>`;
        const sv = body.querySelector('svg'), lay = sv.querySelector('.layer'); let pts = [], drawing = false;
        const path = () => { lay.innerHTML = pts.length > 1 ? `<path d="M${pts.map(p => g.P(...p).join(',')).join(' L')}" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''; body.querySelector('#gOk').disabled = pts.length < 8; };
        sv.addEventListener('pointerdown', ev => { drawing = true; pts = [toMath(sv, g, ev)]; sv.setPointerCapture(ev.pointerId); path(); ev.preventDefault(); });
        sv.addEventListener('pointermove', ev => { if (!drawing) return; const p = toMath(sv, g, ev), l = pts[pts.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > .08) { pts.push(p); path(); } });
        const up = () => { drawing = false; }; sv.addEventListener('pointerup', up); sv.addEventListener('pointercancel', up);
        body.querySelector('#gClr').onclick = () => { pts = []; path(); body.querySelectorAll('.t-msg').forEach(x => x.remove()); };
        body.querySelector('#gOk').onclick = () => {
          const why = judgeDraw(pts, s);
          const overlay = () => {   // 바른 그래프(주황)를 아이가 그린 선 위에 겹친다
            const f = quad(s.a, s.pv[0], s.pv[1]), q = [];
            for (let i = 0; i <= 160; i++) { const x = g.x0 + (g.x1 - g.x0) * i / 160, y = f(x); if (y >= g.y0 - .2 && y <= g.y1 + .2) q.push(g.P(x, y).join(',')); }
            lay.insertAdjacentHTML('beforeend', `<path d="M${q.join(' L')}" fill="none" stroke="${HOT}" stroke-width="2.6" opacity=".9"/>`); };
          if (!why) { overlay(); body.querySelectorAll('button').forEach(b => b.disabled = true); msg('맞아 — 주황이 바른 그래프야. 대강 잘 그렸어.', 'ok'); return setTimeout(() => finish(tries ? 'ask' : 'solo'), 1600); }
          tries++; memo.push('그린 것: ' + why);
          if (tries >= 2) { overlay(); body.querySelectorAll('button').forEach(b => b.disabled = true); msg('주황이 바른 그래프야. 꼭짓점이 가장 높은 곳이고, y절편을 지나.', 'warn'); return setTimeout(() => finish('tea'), 2000); }
          msg(why + ' 지우고 다시 그려 봐.');
        };
      }
    });
  }
  function toMath(sv, g, ev) {
    const pt = sv.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(sv.getScreenCTM().inverse()); return g.M(p.x, p.y);
  }
  function dot(sv, g, x, y, col) { const a = g.P(x, y); sv.querySelector('.layer').insertAdjacentHTML('beforeend', `<circle cx="${a[0]}" cy="${a[1]}" r="6.5" fill="${col}"/>`); }
  /* 「대강」 확인: 가장 높은(위로 볼록) 곳이 꼭짓점 근처 · 양쪽 끝이 내려감 · y절편 근처를 지남 */
  function judgeDraw(pts, s) {
    if (pts.length < 8) return '조금 더 길게 그려 봐.';
    const xs = pts.map(p => p[0]); if (Math.min(...xs) > s.yi[0] + .8 || Math.max(...xs) < s.pv[0] + 1.5) return '꼭짓점의 왼쪽과 오른쪽을 모두 그려 봐(y절편까지).';
    const ext = s.a < 0 ? pts.reduce((m, p) => p[1] > m[1] ? p : m) : pts.reduce((m, p) => p[1] < m[1] ? p : m);
    const first = pts[0], last = pts[pts.length - 1];
    const down = s.a < 0 ? (first[1] < ext[1] - 1.5 && last[1] < ext[1] - 1.5) : (first[1] > ext[1] + 1.5 && last[1] > ext[1] + 1.5);
    if (!down) return s.a < 0 ? '위로 볼록하게 — 꼭짓점에서 양쪽으로 내려가게 그려 봐.' : '아래로 볼록하게 그려 봐.';
    if (Math.abs(ext[0] - s.pv[0]) > 1 || Math.abs(ext[1] - s.pv[1]) > 1.3) return '가장 높은 곳이 꼭짓점 (' + s.pv.map(neg).join(', ') + ')에 오게 그려 봐.';
    const near = pts.some((p, i) => i && segDist(pts[i - 1], p, s.yi) < 1);
    if (!near) return 'y절편의 점 (' + s.yi.map(neg).join(', ') + ')을 지나게 그려 봐.';
    return '';
  }
  function segDist(a, b, p) { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy || 1; let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L; t = Math.max(0, Math.min(1, t)); return Math.hypot(a[0] + t * dx - p[0], a[1] + t * dy - p[1]); }
  /* 그래프 카드 — 꼭짓점 눈금·점선, y절편 숫자(교재 1270 모양) */
  function cardSvg(a, p, q) {
    const c = a * p * p + q, lo = Math.min(q, c, 0) - 2, hi = Math.max(q, c, 0) + 2, g = new Graph([-4, 5], [lo, hi], 130, Math.min(130 / 9, 140 / (hi - lo)));
    g.para(a, p, q); g.guide(p, q); g.pt(p, q, {r: 3.2}); if (p) g.xt(p); if (q) g.yt(q, null, p < 0); if (c !== q) { g.pt(0, c, {r: 3.2}); g.yt(c, null, p < 0); }
    return g.svg({noO: true, cls: 'gcsv'});
  }

  async function run(it) {
    const K = A.tryKit; marks = {};
    K.frame(Object.assign({}, it, {fig: ''}), `<span class="t-tag r1">1회차</span><span class="t-tag">${A.esc(it.kind)}</span>`);   // 그림은 단계 안에서만(같은 그림 두 번 X)
    const log = [];
    for (const s of it.steps) {
      const r = ['gtap', 'gcard', 'gpoint', 'gdraw'].includes(s.k) ? await gstep(K, s, it.fig) : await K.step(s, 'm3-1');
      log.push({what: s.label, st: r.st, memo: r.st === 'solo' ? '' : r.memo});
      if (s.note) K.noteAdd(s.note, r.st === 'tea' ? 'app' : 'kid', r.st === 'tea' ? '설명 보고' : '');
      await K.sleep(200);
    }
    K.markDone(it.id);
    K.showLog(log, it.ans);
    document.querySelector('#again').onclick = () => run(it);
  }

  /* 스타일(격리 — try.css 는 건드리지 않음) */
  const css = `.g-fig{display:flex;justify-content:center;margin:6px 0}.g-fig svg{width:100%;max-width:360px;height:auto;touch-action:manipulation}
  .g-board svg{max-width:400px}.g-draw svg{touch-action:none;cursor:crosshair;background:#fbfcff;border-radius:10px}
  .gtp{cursor:pointer}.gtp .ln{transition:stroke .15s}.gtp:hover .ln{stroke:#e58b55}.gtp.on .ln{stroke:${HOT};stroke-width:5}.gtp.no .ln{stroke:#9aa3b2}
  .g-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px;margin:6px 0}
  .g-card{background:#fff;border:1.5px solid #d5dbe6;border-radius:12px;padding:4px 2px 6px;cursor:pointer;font:inherit}.g-card svg{width:100%;height:auto;display:block}
  .g-card b{font-size:16px}.g-card.on{border-color:${HOT};box-shadow:0 0 0 3px #fbd9c2}.g-card.no{border-color:#e9a39b;background:#fff4f2}.g-card:disabled{cursor:default}`;
  document.head.insertAdjacentHTML('beforeend', `<style id="graph-css">${css}</style>`);

  window.TRY_GRAPH = {
    has: id => S.some(s => s.id === id),
    open: id => run(S.find(s => s.id === id)),
    list: done => `<div class="t-sec">중3-1 · 이차함수 그래프 — 누르기 · 카드 · 대강 그리기 (10/23 견본 2판)</div>`
      + S.map(it => `<button class="t-item${done.has(it.id) ? ' done' : ''}" data-id="${it.id}"><span class="t-tag r1">1회차</span><span class="t-tag">${A.esc(it.kind)}</span><div class="t-iq">${A.fm(it.q)}</div><div class="t-how">${A.esc(it.how)}</div></button>`).join(''),
    _Graph: Graph, _judge: judgeDraw   // 시험용
  };
})();
