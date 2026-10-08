/* 새 앱 — 지도 그림(SVG). 이름(마스터 10/8): 행성 탐사 → 별계 탐사 → 은하 탐사.
   별계(대단원) 그림: 가운데 별 · 행성(소단원)은 저마다 궤도를 돈다 · 끝에 블랙홀(퉁구리 은신처)
     행성 탐사를 마친 행성 = 불이 켜짐 · 별계 탐사를 마친 행성 = 궤도가 금빛으로 이어짐 · 은하 탐사를 마친 행성 = 행성끼리 별자리 선으로 이어짐
   은하(홈) 그림: 별 6개가 나선 팔을 따라 놓이고, 밝힌 만큼 빛난다. */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const COL = ['#e8b04b', '#5b8def', '#e07a6a', '#55b892', '#a07ce0', '#e98b3f', '#4cb3c4', '#c46aa0'];
  const STARC = ['#f3c969', '#7aa7ff', '#f29b8f', '#8fd6b4', '#c9a6ff', '#ffb36b'];
  A.planetColor = i => COL[i % 8];
  const esc = A.esc;
  const short = (t, n) => (t.length > n ? t.slice(0, n - 1) + '…' : t);

  /* 별계 지도 — r: 지금 보고 있는 탐사 */
  A.starMap = (big, r) => {
    const n = big.smalls.length, W = 640, H = 480, cx = 300, cy = 236;
    const bi = big.no - 1, sc = STARC[bi % 6];
    let defs = `<defs><radialGradient id="sg${bi}"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${sc}"/><stop offset="1" stop-color="${sc}" stop-opacity="0"/></radialGradient>
      <radialGradient id="bh"><stop offset="0" stop-color="#000"/><stop offset=".55" stop-color="#05040c"/><stop offset=".72" stop-color="#7c4dff" stop-opacity=".55"/><stop offset="1" stop-color="#7c4dff" stop-opacity="0"/></radialGradient>`;
    const st = [], orbits = [], links = [], pls = [];
    const pos = [];
    for (let i = 0; i < n; i++) {
      const rx = 118 + i * (152 / Math.max(1, n - 1)), ry = rx * 0.5, a = (-90 + i * 360 / n + (i % 2) * 22) * Math.PI / 180;
      const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      pos.push([x, y]);
      const s = big.smalls[i];
      const d1 = E.count(s, 1), d2 = E.count(s, 2), d3 = E.count(s, 3);
      const done1 = d1.n && d1.done === d1.n, done2 = d2.n && d2.done === d2.n, done3 = d3.n && d3.done === d3.n;
      const cur = E.count(s, r), part = cur.done > 0 && cur.done < cur.n;
      orbits.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="${done2 ? '#f2c45f' : '#2a3460'}" stroke-width="${done2 ? 1.8 : 1}" ${done2 ? '' : 'stroke-dasharray="3 5"'} opacity="${done2 ? .85 : .7}"/>`);
      const c = COL[i % 8], lit = done1;
      defs += `<radialGradient id="p${bi}_${i}" cx=".35" cy=".3"><stop offset="0" stop-color="#fff" stop-opacity="${lit ? .85 : .25}"/><stop offset=".25" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="1"/></radialGradient>`;
      const today = E.tasks(s, r).some(t => E.state(t.id).k === 'today'), again = E.tasks(s, r).some(t => E.state(t.id).k === 'next');
      const ly = y + 30;
      pls.push(`<g class="pl" data-go="small:${s.code}" data-r="${r}" style="cursor:pointer">
        ${lit ? `<circle cx="${x}" cy="${y}" r="24" fill="${c}" opacity=".22"/>` : ''}
        <circle cx="${x}" cy="${y}" r="15" fill="url(#p${bi}_${i})" ${lit ? '' : 'style="filter:saturate(.25) brightness(.55)"'}/>
        ${part ? `<circle cx="${x}" cy="${y}" r="19" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="${(cur.done / cur.n * 119).toFixed(1)} 200" transform="rotate(-90 ${x} ${y})"/>` : ''}
        ${done3 ? `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>` : ''}
        <text x="${x}" y="${ly}" text-anchor="middle" font-size="12.5" fill="#dfe5f7" font-weight="700">${i + 1}. ${esc(short(s.title, 12))}</text>
        ${today || again ? `<text x="${x}" y="${ly + 15}" text-anchor="middle" font-size="11" fill="${again ? '#7ff0d2' : '#9aa3c0'}">${again ? '다시 열림' : '내일 열림'}</text>` : ''}
      </g>`);
      st.push(done3);
    }
    for (let i = 0; i < n - 1; i++) if (st[i] && st[i + 1]) links.push(`<line x1="${pos[i][0]}" y1="${pos[i][1]}" x2="${pos[i + 1][0]}" y2="${pos[i + 1][1]}" stroke="#ffffff" stroke-width="1.4" opacity=".7"/>`);
    // 블랙홀(퉁구리 은신처) — 이 탐사의 행성을 모두 마치면 열린다
    const bhOpen = A.bhOpen(big, r), bhDone = A.bhDone(big, r);
    const bx = 590, by = 70;
    const bh = `<g id="bhBtn" class="bh ${bhOpen ? 'open' : ''}" style="cursor:${bhOpen ? 'pointer' : 'default'}">
      <circle cx="${bx}" cy="${by}" r="44" fill="url(#bh)"/>
      <ellipse cx="${bx}" cy="${by}" rx="40" ry="11" fill="none" stroke="#b79cff" stroke-width="2" opacity="${bhOpen ? .9 : .3}" transform="rotate(-18 ${bx} ${by})"><animateTransform attributeName="transform" type="rotate" from="-18 ${bx} ${by}" to="342 ${bx} ${by}" dur="14s" repeatCount="indefinite"/></ellipse>
      <circle cx="${bx}" cy="${by}" r="14" fill="#000"/>
      <text x="${bx}" y="${by + 60}" text-anchor="middle" font-size="12" fill="${bhOpen ? '#cdbaff' : '#5d6690'}" font-weight="700">${bhDone ? '✦ 블랙홀 통과' : bhOpen ? '블랙홀 관문 열림!' : '🔒 블랙홀'}</text></g>`;
    defs += '</defs>';
    return `<svg class="starmap" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${defs}
      ${orbits.join('')}${links.join('')}
      <circle cx="${cx}" cy="${cy}" r="46" fill="url(#sg${bi})" opacity=".9"/><circle cx="${cx}" cy="${cy}" r="11" fill="#fff"/>
      <text x="${cx}" y="${cy + 30}" text-anchor="middle" font-size="12" fill="${sc}" font-weight="700" letter-spacing="1.5">${big.code}</text>
      ${bh}${pls.join('')}</svg>`;
  };

  /* 은하 지도(홈) */
  A.galaxyMap = () => {
    const W = 640, H = 330, bigs = E.bigs();
    const P = [[110, 236], [220, 128], [350, 92], [470, 150], [540, 252], [400, 266]];
    let path = 'M' + P.map(p => p.join(',')).join(' L');
    const st = bigs.map((b, i) => {
      const open = E.openRound(b.no), c = E.bigCount(b, open), lit = c.n ? c.done / c.n : 0, col = STARC[i % 6];
      const [x, y] = P[i];
      return `<g data-go="big:${b.no}" style="cursor:pointer">
        <circle cx="${x}" cy="${y}" r="${30 + lit * 18}" fill="${col}" opacity="${0.08 + lit * 0.22}"/>
        <circle cx="${x}" cy="${y}" r="${7 + lit * 5}" fill="${col}" opacity="${0.55 + lit * 0.45}" style="filter:drop-shadow(0 0 ${4 + lit * 10}px ${col})"/>
        <text x="${x}" y="${y + 36}" text-anchor="middle" font-size="12" fill="${col}" font-weight="700" letter-spacing="1">${b.code}</text>
        <text x="${x}" y="${y + 52}" text-anchor="middle" font-size="13" fill="#e6ebf8" font-weight="700">${esc(b.title)}</text>
        <text x="${x}" y="${y + 67}" text-anchor="middle" font-size="11" fill="#9aa3c0">${E.ROUND[open]} ${c.done}/${c.n}</text></g>`;
    }).join('');
    return `<svg class="galmap" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" fill="none" stroke="#2c3866" stroke-width="1.4" stroke-dasharray="2 6"/>${st}</svg>`;
  };

  // 블랙홀 관문 상태
  A.bhTaskId = (big, r) => big.bh.id + ':r' + r;
  A.bhOpen = (big, r) => { const c = E.bigCount(big, r); return c.n > 0 && c.done === c.n; };
  A.bhDone = (big, r) => E.state(A.bhTaskId(big, r)).k === 'done';
})();
