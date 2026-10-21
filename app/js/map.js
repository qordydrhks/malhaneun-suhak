/* 새 앱 — 지도 그림(SVG). 이름(마스터 10/8): 행성 탐사 → 별계 탐사 → 은하 탐사.
   별계(대단원) 그림: 가운데 별 · 행성(소단원)은 저마다 궤도를 돈다 · 오른쪽 위 블랙홀(퉁구리 은신처)
     그 탐사를 마친 행성 = 밝게 빛남(빛무리) · 별계 탐사를 마친 행성 = 궤도가 금빛 · 은하 탐사를 마친 행성 = 행성끼리 별자리 선
   은하(홈) 그림: 별 6개가 길을 따라 놓이고, 밝힌 행성이 많을수록 별이 커지고 환해진다.
   마스터 10/12: 폰에서 글씨가 너무 작다 → 폰은 그림을 폰 비율로 따로 그리고, 별계 지도는 행성에 번호만(이름은 아래 목록).
     통과한 행성이 안 한 것과 잘 구분되게 — 행성은 작게, 밝힌 행성은 확실히 밝게, 별은 밝힌 만큼 크게. */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const COL = ['#ffc24a', '#6fa3ff', '#ff8a78', '#5fd39f', '#b48cff', '#ff9a4d', '#4fd0e0', '#ff7fbf'];
  const STARC = ['#f3c969', '#7aa7ff', '#f29b8f', '#8fd6b4', '#c9a6ff', '#ffb36b'];
  A.planetColor = i => COL[i % 8];
  const esc = A.esc;
  const narrow = () => (window.innerWidth || 800) < 600;
  const full = (s, r) => { const c = E.count(s, r); return c.n > 0 && c.done === c.n; };

  /* 별계 지도 — r: 지금 보고 있는 탐사 */
  A.starMap = (big, r) => {
    const NAR = narrow(), n = big.smalls.length;
    const W = NAR ? 400 : 640, H = NAR ? 360 : 430, cx = NAR ? 196 : 300, cy = NAR ? 205 : 228;
    const rx0 = NAR ? 66 : 112, rxN = NAR ? 186 : 272, ryK = NAR ? 0.6 : 0.5, PR = NAR ? 13 : 12;
    const bi = big.no - 1, sc = STARC[bi % 6];
    const litN = big.smalls.filter(s => full(s, r)).length, f = n ? litN / n : 0;
    let defs = `<defs><radialGradient id="sg${bi}"><stop offset="0" stop-color="#fff"/><stop offset=".22" stop-color="${sc}"/><stop offset="1" stop-color="${sc}" stop-opacity="0"/></radialGradient>
      <radialGradient id="nv"><stop offset="0" stop-color="#fff"/><stop offset=".18" stop-color="#ffe6a8"/><stop offset=".45" stop-color="#ff9a6b" stop-opacity=".55"/><stop offset=".75" stop-color="#b48cff" stop-opacity=".25"/><stop offset="1" stop-color="#7c4dff" stop-opacity="0"/></radialGradient>
      <radialGradient id="bh"><stop offset="0" stop-color="#000"/><stop offset=".55" stop-color="#05040c"/><stop offset=".72" stop-color="#7c4dff" stop-opacity=".55"/><stop offset="1" stop-color="#7c4dff" stop-opacity="0"/></radialGradient>`;
    const orbits = [], links = [], pls = [], pos = [], st3 = [];
    for (let i = 0; i < n; i++) {
      const rx = rx0 + i * ((rxN - rx0) / Math.max(1, n - 1)), ry = rx * ryK, a = (-90 + i * 360 / n + (i % 2) * 22) * Math.PI / 180;
      const x = +(cx + rx * Math.cos(a)).toFixed(1), y = +(cy + ry * Math.sin(a)).toFixed(1);
      pos.push([x, y]);
      const s = big.smalls[i], c = COL[i % 8];
      const done2 = full(s, 2), done3 = full(s, 3), lit = full(s, r);
      const cur = E.count(s, r), part = cur.done > 0 && cur.done < cur.n;
      orbits.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="${done2 ? '#f2c45f' : c}" stroke-width="${done2 ? 2 : lit ? 1.6 : 1.3}" opacity="${done2 ? .9 : lit ? .7 : .42}"/>`);
      if (lit) defs += `<radialGradient id="p${bi}_${i}" cx=".36" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></radialGradient>
        <radialGradient id="h${bi}_${i}"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset=".45" stop-color="${c}" stop-opacity=".28"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
      pls.push(`<g class="pl ${lit ? 'lit' : ''}" data-go="small:${s.code}" data-r="${r}" style="cursor:pointer">
        <circle cx="${x}" cy="${y}" r="${PR * 2.6}" fill="${lit ? `url(#h${bi}_${i})` : 'transparent'}"/>
        <circle cx="${x}" cy="${y}" r="${PR}" fill="${lit ? `url(#p${bi}_${i})` : '#1f2542'}" stroke="${lit ? '#ffffff' : c}" stroke-opacity="${lit ? .7 : .55}" stroke-width="${lit ? 1.2 : 1.5}"/>
        ${part ? `<circle cx="${x}" cy="${y}" r="${PR + 4}" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${(cur.done / cur.n * 2 * Math.PI * (PR + 4)).toFixed(1)} 200" transform="rotate(-90 ${x} ${y})"/>` : ''}
        <text x="${x}" y="${y}" dy=".36em" text-anchor="middle" font-size="${NAR ? 14 : 13}" font-weight="800" fill="${lit ? '#1b1530' : '#aab3d3'}">${i + 1}</text>
      </g>`);
      st3.push(done3);
    }
    for (let i = 0; i < n - 1; i++) if (st3[i] && st3[i + 1]) links.push(`<line x1="${pos[i][0]}" y1="${pos[i][1]}" x2="${pos[i + 1][0]}" y2="${pos[i + 1][1]}" stroke="#ffffff" stroke-width="1.4" opacity=".7"/>`);
    // 가운데 별 — 이 탐사에서 밝힌 행성이 많을수록 커진다
    const sg = (NAR ? 34 : 42) + f * (NAR ? 30 : 38), core = 8 + f * 7;
    // 블랙홀(퉁구리 은신처) — 이 탐사의 행성을 모두 밝히면 열린다
    const bhOpen = A.bhOpen(big, r), bhDone = A.bhDone(big, r);
    const bx = W - 44, by = 44;
    const rays = Array.from({length: 12}, (_, i) => { const a = i * 30 * Math.PI / 180, l = i % 2 ? 26 : 40;
      return `<line x1="${(bx + 9 * Math.cos(a)).toFixed(1)}" y1="${(by + 9 * Math.sin(a)).toFixed(1)}" x2="${(bx + l * Math.cos(a)).toFixed(1)}" y2="${(by + l * Math.sin(a)).toFixed(1)}" stroke="${i % 2 ? '#ffd27a' : '#fff4d6'}" stroke-width="${i % 2 ? 1.6 : 2.4}" stroke-linecap="round"/>`; }).join('');
    const nova = `<g id="bhBtn" class="bh nova" style="cursor:pointer">
      <circle cx="${bx}" cy="${by}" r="46" fill="url(#nv)"/>
      <circle cx="${bx}" cy="${by}" r="20" fill="none" stroke="#ffcf7a" stroke-width="2" opacity=".8"><animate attributeName="r" values="14;44" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2.6s" repeatCount="indefinite"/></circle>
      <circle cx="${bx}" cy="${by}" r="20" fill="none" stroke="#ff8fd0" stroke-width="1.6" opacity=".6"><animate attributeName="r" values="14;44" dur="2.6s" begin="1.3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2.6s" begin="1.3s" repeatCount="indefinite"/></circle>
      <g>${rays}<animateTransform attributeName="transform" type="rotate" from="0 ${bx} ${by}" to="360 ${bx} ${by}" dur="40s" repeatCount="indefinite"/></g>
      <circle cx="${bx}" cy="${by}" r="9" fill="#fff"><animate attributeName="r" values="8;11;8" dur="1.6s" repeatCount="indefinite"/></circle>
      <text x="${bx}" y="${by + 60}" text-anchor="middle" font-size="${NAR ? 13 : 12}" fill="#ffd98a" font-weight="700">✦ 초신성</text></g>`;
    const bh = bhDone ? nova : `<g id="bhBtn" class="bh ${bhOpen ? 'open' : ''}" style="cursor:${bhOpen ? 'pointer' : 'default'}">
      <circle cx="${bx}" cy="${by}" r="40" fill="url(#bh)"/>
      <ellipse cx="${bx}" cy="${by}" rx="36" ry="10" fill="none" stroke="#b79cff" stroke-width="2" opacity="${bhOpen ? .9 : .3}" transform="rotate(-18 ${bx} ${by})"><animateTransform attributeName="transform" type="rotate" from="-18 ${bx} ${by}" to="342 ${bx} ${by}" dur="14s" repeatCount="indefinite"/></ellipse>
      <circle cx="${bx}" cy="${by}" r="13" fill="#000"/>
      <text x="${bx}" y="${by + 56}" text-anchor="middle" font-size="${NAR ? 13 : 12}" fill="${bhOpen ? '#cdbaff' : '#6d76a0'}" font-weight="700">${bhDone ? '✦ 통과' : bhOpen ? '관문 열림!' : '🔒 블랙홀'}</text></g>`;
    defs += '</defs>';
    return `<svg class="starmap" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${defs}
      ${orbits.join('')}${links.join('')}
      <circle cx="${cx}" cy="${cy}" r="${sg.toFixed(1)}" fill="url(#sg${bi})" opacity="${(.75 + f * .25).toFixed(2)}"/><circle cx="${cx}" cy="${cy}" r="${core.toFixed(1)}" fill="#fff"/>
      ${bh}${pls.join('')}</svg>`;
  };

  /* 은하 지도(홈) — 별(대단원)은 밝힌 행성이 많을수록 커지고 환해진다 */
  A.galaxyMap = () => {
    const NAR = narrow(), bigs = E.bigs();
    const W = NAR ? 360 : 640, H = NAR ? 560 : 340;
    const P = NAR ? [[92, 66], [266, 150], [92, 238], [266, 322], [92, 410], [266, 494]] : [[100, 210], [220, 104], [350, 70], [480, 126], [552, 236], [400, 250]];
    const FS = NAR ? {code: 13, title: 16, sub: 13} : {code: 12, title: 14, sub: 12};
    const path = 'M' + P.slice(0, bigs.length).map(p => p.join(',')).join(' L');
    let defs = '<defs>';
    const st = bigs.map((b, i) => {
      const open = E.openRound(b.no), c = E.bigCount(b, open), col = STARC[i % 6];
      const n1 = b.smalls.length, l1 = b.smalls.filter(s => full(s, 1)).length;
      const f = n1 ? l1 / n1 : 0, deep = (b.smalls.every(s => full(s, 2)) ? 1 : 0) + (b.smalls.every(s => full(s, 3)) ? 1 : 0);
      const R = 5 + f * 9 + deep * 3, halo = R * 3.4 + 8;
      defs += `<radialGradient id="gx${i}"><stop offset="0" stop-color="${col}" stop-opacity="${(.35 + f * .55).toFixed(2)}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>
        <radialGradient id="gc${i}" cx=".4" cy=".35"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="${col}"/><stop offset="1" stop-color="${col}"/></radialGradient>`;
      const [x, y] = P[i];
      const ty = y + Math.max(halo * .55, 24);
      return `<g data-go="big:${b.no}" style="cursor:pointer">
        <circle cx="${x}" cy="${y}" r="${halo.toFixed(1)}" fill="url(#gx${i})"/>
        <circle cx="${x}" cy="${y}" r="${R.toFixed(1)}" fill="${f ? `url(#gc${i})` : '#39406a'}" opacity="${f ? 1 : .85}"/>
        <text x="${x}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="${FS.code}" fill="${col}" font-weight="700" letter-spacing="1">${b.code}</text>
        <text x="${x}" y="${(ty + FS.title + 3).toFixed(1)}" text-anchor="middle" font-size="${FS.title}" fill="#eef1f8" font-weight="700">${esc(b.title)}</text>
        <text x="${x}" y="${(ty + FS.title + FS.sub + 7).toFixed(1)}" text-anchor="middle" font-size="${FS.sub}" fill="#9aa3c0">${c.done}/${c.n}</text></g>`;
    }).join('');
    defs += '</defs>';
    return `<svg class="galmap" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${defs}
      <path d="${path}" fill="none" stroke="#2c3866" stroke-width="1.4" stroke-dasharray="2 6"/>${st}</svg>`;
  };

  // 블랙홀 관문 상태
  A.bhTaskId = (big, r) => big.bh.id + ':r' + r;
  A.bhOpen = (big, r) => { const c = E.bigCount(big, r); return c.n > 0 && c.done === c.n; };
  A.bhDone = (big, r) => E.state(A.bhTaskId(big, r)).k === 'done';
})();
