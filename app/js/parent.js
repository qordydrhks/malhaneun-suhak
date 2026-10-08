/* 새 앱 — 학부모 리포트(parent.html?t=<학생마다 긴 무작위 글자>). 대전제 ②: 수학을 모르는 부모님도 아이 상태를 정확히 알고 "무엇을 시키면 되는지" 바로 알게.
   · 이해 점수(숫자)는 선생님만 본다(마스터 10/3) → 여기는 등급·진도·한 번에 설명한 비율·막힌 곳만
   · 막힌 곳마다: 질문 그대로 + 집에서 할 일(① 말로 설명해 보게 ② 핵심 낱말 ③ 교재 쪽) — 모범 답은 주지 않는다(외워 통과 방지)
   · 앞 학년 내용(🌱)에서 막혔으면 따로 알린다 */
(() => {
  'use strict';
  const A = window.APP, E = A.E, esc = A.esc, fm = A.fm, $ = s => document.querySelector(s);
  const root = () => $('#app');
  const IDX = {};
  for (const b of E.bigs()) for (const s of b.smalls) for (let r = 1; r <= 3; r++) for (const t of E.tasks(s, r)) IDX[t.id] = {b, s, r, t};
  const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

  function fail(msg) { root().innerHTML = `<main class="center"><div class="pfail"><h2>리포트를 열 수 없어요</h2><p class="sub">${esc(msg)}</p></div></main>`; }

  A.parentStart = async () => {
    const t = new URLSearchParams(location.search).get('t') || '';
    if (!/^[0-9a-z]{16,40}$/.test(t)) return fail('주소가 맞지 않아요. 선생님께 받은 주소를 그대로 열어 주세요.');
    let map, studs, prog, open, subs = [], comment;
    try {
      map = await A.store.get('app:parent:' + t);
      if (!map || !map.sid) return fail('주소가 맞지 않아요. 선생님께 다시 받아 주세요.');
      [studs, prog, open, comment] = await Promise.all([A.loadStudents(), A.store.get('app:prog:' + map.sid + ':e4-2'), A.store.get('app:open:' + map.sid + ':e4-2'), A.store.get('app:comment:' + map.sid + ':e4-2')]);
      subs = await A.sbSelect('submissions', 'student_id=eq.' + encodeURIComponent(map.sid) + '&course_id=eq.e4-2&select=question_id,question,transcript,pass,stage,quality,created_at,level&order=created_at.desc&limit=300') || [];
    } catch (e) { return fail('서버에 연결하지 못했어요. 잠시 뒤 다시 열어 주세요.'); }
    const s = (studs || []).find(x => x.id === map.sid);
    if (!s) return fail('학생 정보를 찾지 못했어요.');
    A.session.student = {id: s.id, name: s.name, grade: s.grade || ''};
    E.use(prog, open || {});
    render(s, subs, comment || {});
  };

  function render(s, subs, comment) {
    const rk = E.rank(), bk = E.book(), p = E.prog();
    const name = s.name;
    // 이번 주(월~일)
    const now = new Date(), di = (now.getDay() + 6) % 7, ws = new Date(now.getFullYear(), now.getMonth(), now.getDate() - di);
    const wk = subs.filter(r => new Date(r.created_at) >= ws);
    const onDay = new Set(wk.map(r => (new Date(r.created_at).getDay() + 6) % 7));
    const wkPass = new Set(wk.filter(r => r.pass && !/re$|rv$/.test(r.level || '')).map(r => r.question_id)).size;
    // 지금까지 통과한 것 중 한 번에 설명한 비율
    const passed = bk.one.length + bk.h1.length + bk.h2.length;
    // 별(대단원)마다
    const stars = E.bigs().map(b => {
      const open = E.openRound(b.no);
      const parts = [1, 2, 3].map(r => { const c = E.bigCount(b, r); return {r, c, on: r <= open}; });
      const now1 = parts.filter(x => x.on).pop();
      const started = parts.some(x => x.c.done);
      return `<li><span class="pst">${esc(b.title)}</span><span class="pbar">${parts.map(x => `<i class="${x.on ? (x.c.n && x.c.done === x.c.n ? 'full' : x.c.done ? 'half' : '') : 'off'}" title="${E.ROUND[x.r]}"></i>`).join('')}</span>
        <span class="sub">${started ? E.ROUND[now1.r] + ' ' + now1.c.done + '/' + now1.c.n : '아직'}</span></li>`;
    }).join('');
    // 더 연습이 필요한 것: 아직 통과 못 한 것 → 설명을 보고 통과한 것
    const yet = [], helped = [];
    for (const [id, x] of Object.entries(p.st)) {
      const ix = IDX[id]; if (!ix || ix.t.kind !== 'q') continue;
      if (x.st !== 'pass') yet.push({ix, x}); else if ((x.qFirst ?? x.q ?? 100) <= 75 && !x.rv) helped.push({ix, x});
    }
    yet.sort((a, b) => (b.x.at || 0) - (a.x.at || 0)); helped.sort((a, b) => (b.x.at || 0) - (a.x.at || 0));
    const todo = yet.concat(helped).slice(0, 5);
    const card = ({ix, x}) => {
      const it = ix.t.src, h = it.help || {}, kw = (h.kw || []).slice(0, 3);
      const pre = it.pre;
      return `<li class="ptodo">
        <div class="pq">${fm(it.q)}</div>
        <div class="pwhy">${x.st !== 'pass' ? (x.help === 'short' || x.help === 'long' ? '설명을 보고 내일 다시 확인해요' : '아직 설명이 어려워요') : '설명을 보고 다음 날 통과했어요'}${pre ? ` · <b>🌱 ${esc(pre)}</b>에서 배운 내용` : ''}</div>
        <ol class="phow"><li>아이에게 이 질문을 <b>말로 설명해 보라고</b> 해 주세요. 정답을 먼저 알려 주지 마세요.</li>
          ${kw.length ? `<li>막히면 이 낱말을 넣어 다시 말해 보게 해 주세요: ${kw.map(k => `<span class="pkw">${fm(k)}</span>`).join(' ')}</li>` : ''}
          <li>${pre ? `${esc(pre)} 단원(지난 학년 교과서)을` : `교재 ${esc(ix.s.page || '')}을`} 같이 펴 보세요.</li></ol></li>`;
    };
    // 아이의 멋진 설명(한 번에 통과한 것 중 가장 최근)
    const good = subs.find(r => r.pass && r.stage === 'first' && r.transcript && r.transcript.length > 12);
    const goodIx = good && IDX[good.question_id];
    root().innerHTML = `<main class="preport">
      <header class="phead"><div class="sub">말하는 수학 · 4학년 2학기</div><h1>${esc(name)}의 우주 탐험</h1><div class="sub">${now.getMonth() + 1}월 ${now.getDate()}일 기준</div></header>
      <section class="pcard prank"><div class="pri">${rk.icon}</div><div><div class="prn">${rk.name} <small>${rk.ko}</small></div>
        <div class="sub">밝힌 행성 ${rk.lit} / ${rk.total} · 등급은 루나 → 테라 → 솔 → 갤럭시 → 코스모스 순서로 올라가요</div></div></section>
      <section class="pcard"><h2>이번 주</h2>
        <div class="pdays">${DAYS.map((d, i) => `<span class="${onDay.has(i) ? 'on' : ''}">${d}</span>`).join('')}</div>
        <p>이번 주에 질문 <b>${wkPass}개</b>를 말로 설명해 통과했어요.</p>
        ${passed ? `<p>지금까지 통과한 질문 ${passed}개 중 <b>${bk.one.length}개</b>는 도움 없이 한 번에 설명했어요.</p>` : ''}</section>
      <section class="pcard"><h2>어디까지 왔나</h2><p class="sub">한 단원을 세 번(행성 탐사 → 별계 탐사 → 은하 탐사) 점점 깊게 공부해요.</p><ul class="pstars">${stars}</ul></section>
      <section class="pcard"><h2>집에서 함께 볼 것</h2>
        ${todo.length ? `<ul class="ptodos">${todo.map(card).join('')}</ul>` : '<p class="sub">지금은 특별히 어려워한 질문이 없어요.</p>'}</section>
      ${goodIx ? `<section class="pcard"><h2>아이의 멋진 설명</h2><div class="pq">${fm(good.question || goodIx.t.src.q)}</div><blockquote>${esc(good.transcript.replace(/^\d차:\s*/, ''))}</blockquote></section>` : ''}
      <section class="pcard"><h2>선생님 한마디</h2>${comment.text ? `<p class="pcm">${esc(comment.text)}</p>` : '<p class="sub">선생님이 곧 한마디를 남겨 주실 거예요.</p>'}</section>
    </main>`;
  }
})();
