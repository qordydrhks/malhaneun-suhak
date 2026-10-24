/* 새 앱 — 📒 개념 노트(마스터 10/23·10/24). ⚠️ note.js 는 「별빛노트」(친구 대답 모음)라 다른 것.
   · 학생이 스스로 고른 설명만 담는다(저절로 담지 않음). 도움 화면 · 통과 화면 · 나의 기록에서 「📒 노트에 담기」.
   · 담을 수 있는 설명 = 이미 통과한 질문의 간단한·자세한 설명, 또는 그 질문에서 이미 본 설명(별지도를 쓰지 않고 설명을 보는 길이 되지 않게).
   · 빼기도 학생이 직접. 선생님·부모님 화면에는 보이지 않는다(학생 혼자 쓰는 복습 노트).
   · 노트 칸에서: 🗣 개념 질문 다시 해 보기(연습 — 점수·기록·별빛 그대로) · 📝 그 행성의 mission(예제 문제) 풀기.
   저장 = 진도 P.cnote = {질문번호: {s: 담은 시각(간단한 설명), l: 담은 시각(자세한 설명), at}} (과정마다 따로, 기기를 바꿔도 이어짐) */
(() => {
  'use strict';
  const A = window.APP, E = A.E, esc = A.esc, fm = A.fm;
  const CN = A.CN = {};
  const box = () => { const P = E.prog(); return P.cnote || (P.cnote = {}); };
  const find = id => { for (const it of E.all()) if (it.t.id === id) return it; return null; };
  /* 질문 하나의 두 설명 — 계단 칸(LEVEL Ⅲ)은 짧은 설명 하나뿐 */
  CN.expl = t => {
    if (!t || !t.src) return {};
    if (t.kind === 'q') { const h = t.src.help || {}; return {s: h.short || '', l: h.long || '', fig: h.lfig || ''}; }
    if (t.kind === 'lad') return {s: t.src.teach || '', l: '', fig: ''};
    return {};
  };
  CN.has = (id, w) => { const o = box()[id]; return !!(o && (w ? o[w] : (o.s || o.l))); };
  CN.count = () => Object.keys(box()).filter(id => CN.has(id)).length;
  /* 이 설명을 담아도 되나 — 통과했거나, 그 설명을 이미 본 질문만(seen = 지금 화면에서 본 것) */
  CN.can = (t, w, seen) => {
    const x = CN.expl(t); if (!x[w]) return false;
    if (seen) return true;
    const st = E.status(t.id); if (!st) return false;
    return st.st === 'pass' || (w === 's' ? st.help === 'short' : st.help === 'long');
  };
  CN.add = (id, w) => { const b = box(), o = b[id] || (b[id] = {}); o[w] = Date.now(); o.at = o.at || o[w]; E.save(); };
  CN.del = (id, w) => { const b = box(); if (!b[id]) return; if (w) delete b[id][w]; if (!w || (!b[id].s && !b[id].l)) delete b[id]; E.save(); };

  /* 담기 버튼 — 담겼으면 「✓ 노트에 있어」(누르면 빼기) */
  CN.btn = (id, w, cls) => `<button class="${cls || 'ghost small'} cnb ${CN.has(id, w) ? 'in' : ''}" data-cn="${esc(id)}" data-w="${w}">${CN.has(id, w) ? '✓ 노트에 담겼어' : '📒 노트에 담기'}</button>`;
  CN.bind = (rootEl, onChange) => rootEl.querySelectorAll('.cnb[data-cn]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const id = b.dataset.cn, w = b.dataset.w;
    if (CN.has(id, w)) { CN.del(id, w); A.UI.toast('노트에서 뺐어'); } else { CN.add(id, w); A.buzz(15); A.UI.toast('📒 개념 노트에 쏙!'); }
    b.classList.toggle('in', CN.has(id, w)); b.textContent = CN.has(id, w) ? '✓ 노트에 담겼어' : '📒 노트에 담기';
    if (onChange) onChange();
  });
  /* 어떤 설명을 담을지 고르기(통과 화면 · 나의 기록) */
  CN.pick = (t, onChange) => {
    const x = CN.expl(t), opts = [['s', '💬 간단한 설명'], ['l', '📖 자세한 설명 · 그림']].filter(([w]) => x[w] && CN.can(t, w));
    if (!opts.length) return A.UI.toast('이 질문은 담을 설명이 없어');
    document.querySelector('.kpop')?.remove();
    const d = document.createElement('div'); d.className = 'kpop';
    const draw = () => {
      d.innerHTML = `<div class="kpop-in"><b>📒 노트에 무엇을 담을까?</b><div class="cnq">${fm(t.src.q || '')}</div>
        <div class="cnopts">${opts.map(([w, nm]) => `<button class="cnopt ${CN.has(t.id, w) ? 'in' : ''}" data-w="${w}"><b>${nm}</b><small>${CN.has(t.id, w) ? '✓ 담겨 있어 · 누르면 빼기' : '누르면 담겨'}</small></button>`).join('')}</div>
        <div class="krow"><button class="ghost" id="cnx">닫기</button></div></div>`;
      d.querySelector('#cnx').onclick = () => d.remove();
      d.querySelectorAll('.cnopt').forEach(b => b.onclick = () => {
        const w = b.dataset.w;
        if (CN.has(t.id, w)) CN.del(t.id, w); else { CN.add(t.id, w); A.buzz(15); }
        draw(); if (onChange) onChange();
      });
    };
    d.onclick = e => { if (e.target === d) d.remove(); };
    draw(); document.body.appendChild(d);
  };

  /* ── 노트 화면 — 대단원(누르면 펼침) → 소단원 → 질문 칸(누르면 설명 · 다시 해 보기 · 예제 문제 · 빼기) ── */
  CN.open = () => {
    const U = A.UI;
    U.navMark(['cnote']);
    const b = box(), ids = Object.keys(b).filter(id => CN.has(id));
    const items = ids.map(find).filter(Boolean);
    const groups = E.bigs().map(bg => {
      const mine = items.filter(it => it.b === bg); if (!mine.length) return null;
      const sm = bg.smalls.map(s => [s, mine.filter(it => it.s === s).sort((p, q) => p.r - q.r)]).filter(x => x[1].length);
      return {bg, n: mine.length, sm};
    }).filter(Boolean);
    const card = it => {
      const t = it.t, x = CN.expl(t), o = b[t.id], st = E.status(t.id), passed = st && st.st === 'pass';
      const ready = A.M.ready(it.s, it.r), done = A.M.done(it.s, it.r);
      return `<details class="cncard"><summary><span class="cnlv">${E.RL(it.r)}</span><span class="cnqt">${fm(t.src.q)}</span></summary><div class="cnbody">
        ${o.s ? `<div class="cnex"><div class="cnh">💬 간단한 설명</div><div class="expl">${fm(x.s)}</div></div>` : ''}
        ${o.l ? `<div class="cnex"><div class="cnh">📖 자세한 설명</div><div class="expl">${fm(x.l)}</div>${x.fig ? `<div class="figbox">${x.fig}</div>` : ''}</div>` : ''}
        ${!o.s && CN.can(t, 's') ? `<button class="ghost small cnmore" data-cn="${esc(t.id)}" data-w="s">+ 간단한 설명도 담기</button>` : ''}${!o.l && CN.can(t, 'l') ? `<button class="ghost small cnmore" data-cn="${esc(t.id)}" data-w="l">+ 자세한 설명도 담기</button>` : ''}
        <div class="cnact">
          ${passed ? `<button class="secondary" data-cnp="${esc(t.id)}"><b>🗣 다시 말해 보기</b><small>연습 · 점수 그대로</small></button>` : `<button class="secondary" data-go="small:${it.s.code}" data-r="${it.r}"><b>🪐 행성에서 도전</b><small>${st && st.st === 'wait' ? '다시 묻기가 열리면 해 봐' : '아직 통과 전이야'}</small></button>`}
          ${ready ? `<button class="secondary" data-cnm="${esc(t.id)}"><b>📝 예제 문제</b><small>${done ? A.M.name(it.r) + ' 다시 풀기 · 연습' : A.M.name(it.r) + ' 풀기'}</small></button>` : ''}
        </div><button class="ghost small cndel" data-cnd="${esc(t.id)}">노트에서 빼기</button></div></details>`;
    };
    U.frame(`<section class="cnote"><h2>📒 개념 노트</h2>
      ${groups.length ? `<p class="sub">내가 담은 설명 ${items.length}개 · 질문을 누르면 펼쳐져</p>
        <div class="recgroups">${groups.map(g => `<details class="recbig"${groups.length === 1 ? ' open' : ''}><summary><span class="rbc">${esc(g.bg.code)}</span><span class="rbt">${esc(g.bg.title)}</span><b class="rbn">${g.n}</b></summary>
          ${g.sm.map(([s, its]) => `<div class="recsm"><div class="rst">${esc(s.code + ' ' + s.title)}</div><div class="cnlist">${its.map(card).join('')}</div></div>`).join('')}</details>`).join('')}</div>`
        : `<div class="cnempty"><div class="cnei">📒</div><p>아직 담은 설명이 없어.</p><p class="sub">질문에서 설명을 볼 때, 통과한 뒤, 또는 <b>나의 기록</b>에서<br>「📒 노트에 담기」를 누르면 여기에 쏙 들어와.</p><button class="secondary" data-go="record">나의 기록 보기</button></div>`}
    </section>`, {back: 'home', backText: '은하', crumb: '개념 노트'});
    const R = document.querySelector('#app');
    R.querySelectorAll('.cnmore').forEach(bt => bt.onclick = () => { CN.add(bt.dataset.cn, bt.dataset.w); A.buzz(15); reopen(bt.dataset.cn); });
    R.querySelectorAll('[data-cnd]').forEach(bt => bt.onclick = () => { CN.del(bt.dataset.cnd); U.toast('노트에서 뺐어'); CN.open(); });
    R.querySelectorAll('[data-cnp]').forEach(bt => bt.onclick = () => { const it = find(bt.dataset.cnp); U.practice(it, () => reopen(it.t.id)); });
    R.querySelectorAll('[data-cnm]').forEach(bt => bt.onclick = () => { const it = find(bt.dataset.cnm); U.mission(it.b, it.s, it.r, false, null, {fn: () => reopen(it.t.id), text: '개념 노트로'}); });
  };
  /* 다시 그린 뒤 보던 칸을 펼쳐 둔다 */
  const reopen = id => {
    CN.open();
    const bt = document.querySelector(`[data-cnd="${CSS.escape(id)}"]`); if (!bt) return;
    const c = bt.closest('.cncard'), g = bt.closest('.recbig'); if (g) g.open = true; if (c) { c.open = true; c.scrollIntoView({block: 'center'}); }
  };
})();
