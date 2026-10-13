/* 새 앱 — ⚔ 친구와 대결(마스터 10/13). 계산 대결 · 개념 대결 + 승리 배지.
   연결: 태블릿에서 따로 할 일은 없다. 「대결」을 누르면 대기실에 들어가고(공유 저장소에 '여기 있어요' 표시를 4초마다),
   같은 대기실의 친구를 누르면 초대 → 친구가 「좋아!」 → 둘 다 같은 문제로 시작. 대결마다 방이 따로라 여러 쌍이 동시에 해도 된다.
   서버는 지금 쓰는 공유 저장소(ai_cache) 하나 — 1~2초마다 상대 진행을 읽는다(실시간 연결을 따로 열지 않음).
   저장: 대기 app:bw:<학생> · 초대 app:binv:<받는 학생> · 방 app:broom:<방> · 각자 진행 app:broom:<방>:<학생>
   규칙
   · 계산 대결: 같은 10문제 → 많이 맞힌 쪽, 같으면 빠른 쪽.
   · 개념 대결: 소단원(행성)의 질문 2~3개를 둘 다 말로 → 점수(핵심을 짚은 정도) 평균이 5점 넘게 차이 나면 높은 쪽, 5점 이내면 빨리 답한 쪽.
     대결 대답도 진짜 공부로 친다: 처음 통과하면 진도·별빛에 들어간다(한 번에 통과 100). 이미 통과한 질문은 별빛이 더 생기지 않는다.
     못 통과해도 그 질문을 잠그지 않는다(대결엔 되묻기가 없어서) — 나중에 행성에서 되묻기·도움과 함께 다시 한다.
   · 배지: 이긴 횟수만 센다(진 것은 보이지 않음). */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const B = A.B = {};
  const C = 'e4-2';
  const me = () => A.session.student;
  const lk = p => 'key=like.' + encodeURIComponent(p) + '&select=key,value&limit=200';
  const get = k => A.store.get(k), set = (k, v) => A.store.set(k, v);
  B.FRESH = 12000;                                     // 대기실 표시가 12초 안이면 '있음'
  B.INV_LIFE = 45000;

  // ── 대기실 ──
  let hb = null, here = null;
  B.enter = kind => { here = kind; const beat = () => { const s = me(); if (s && here) set('app:bw:' + s.id, {sid: s.id, name: s.name, grade: s.grade || '', kind: here, course: C, at: Date.now(), badge: B.top()}); }; beat(); clearInterval(hb); hb = setInterval(beat, 4000); };
  B.leave = () => { clearInterval(hb); hb = null; const s = me(); if (s && here) set('app:bw:' + s.id, {sid: s.id, kind: '', at: 0}); here = null; };
  B.busy = on => { const s = me(); if (s) set('app:bw:' + s.id, {sid: s.id, name: s.name, kind: on ? 'busy' : here || '', course: C, at: on ? 0 : Date.now()}); };
  B.list = async kind => {
    let rows = []; try { rows = await A.sbSelect('ai_cache', lk('app:bw:*')) || []; } catch (e) {}
    const s = me(), now = Date.now();
    return rows.map(r => r.value).filter(v => v && v.sid !== (s && s.id) && v.kind === kind && v.course === C && now - (v.at || 0) < B.FRESH);
  };

  // ── 초대 · 방 ──
  const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  B.invite = async (to, room) => {
    const s = me(); room.id = room.id || rid(); room.a = {sid: s.id, name: s.name}; room.b = {sid: to.sid, name: to.name}; room.at = Date.now();
    await set('app:broom:' + room.id, room);
    await set('app:broom:' + room.id + ':' + s.id, {acc: true, k: 0, ok: 0, at: Date.now()});
    await set('app:binv:' + to.sid, {id: room.id, from: {sid: s.id, name: s.name}, kind: room.kind, title: room.title, at: Date.now()});
    return room;
  };
  B.inbox = async () => { const s = me(); if (!s) return null; const v = await get('app:binv:' + s.id); return v && v.id && Date.now() - v.at < B.INV_LIFE ? v : null; };
  B.clearInbox = () => { const s = me(); if (s) set('app:binv:' + s.id, {id: '', at: 0}); };
  B.room = id => get('app:broom:' + id);
  B.answer = async (room, ok) => { const s = me(); B.clearInbox(); await set('app:broom:' + room.id + ':' + s.id, {acc: !!ok, k: 0, ok: 0, at: Date.now()}); };
  B.mine = (room, st) => set('app:broom:' + room.id + ':' + me().id, Object.assign({acc: true, at: Date.now()}, st));
  B.theirs = room => get('app:broom:' + room.id + ':' + (room.a.sid === me().id ? room.b.sid : room.a.sid));
  B.other = room => (room.a.sid === me().id ? room.b : room.a);
  /* 기다리기: 조건이 맞을 때까지 1.2초마다 상대 진행을 읽는다(최대 ms) */
  B.wait = async (room, cond, ms, alive) => {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
      if (alive && !alive()) return null;
      const v = await B.theirs(room); if (v && cond(v)) return v;
      await new Promise(r => setTimeout(r, 1200));
    }
    return null;
  };
  /* 결과 판정 — 계산: 맞힌 수 → 시간 / 개념: 점수 차 5점 넘게 → 점수, 아니면 시간 */
  B.judge = (kind, a, b) => {
    if (a.quit && !b.quit) return -1; if (b.quit && !a.quit) return 1;
    if (kind === 'calc') { if (a.ok !== b.ok) return a.ok > b.ok ? 1 : -1; return a.t === b.t ? 0 : a.t < b.t ? 1 : -1; }
    if (Math.abs(a.score - b.score) > 5) return a.score > b.score ? 1 : -1;
    return a.t === b.t ? 0 : a.t < b.t ? 1 : -1;
  };

  // ── 승리 배지(마스터 10/13: 이긴 것만 · 영단어 앞글자에 색과 모양 · 누르면 뜻) ──
  B.STEPS = [1, 5, 15, 30, 60];
  B.BADGE = {
    concept: {title: '개념 대결', words: [['S', 'Smart', '스마트 — 똑똑하게 설명했어'], ['B', 'Brain', '브레인 — 생각하는 힘이 커지고 있어'], ['G', 'Genius', '지니어스 — 천재처럼 꿰뚫어 봐'], ['M', 'Master', '마스터 — 개념을 마음대로 다뤄'], ['L', 'Legend', '레전드 — 전설이 된 설명왕']]},
    calc: {title: '계산 대결', words: [['W', 'Wind', '바람 — 바람처럼 빨라'], ['S', 'Sonic', '음속 — 소리만큼 빨라'], ['J', 'Jet', '제트 — 제트기처럼 날아'], ['R', 'Rocket', '로켓 — 로켓처럼 솟아올라'], ['L', 'Light', '광속 — 빛처럼 빨라']]}
  };
  const COL = [['#d99a5a', '#8a4f1f'], ['#e3e7ef', '#7d879c'], ['#ffd76a', '#b87c0c'], ['#c9a6ff', '#5b2fb4'], ['#7ef0ff', '#c4369a']];
  B.wins = kind => ((E.prog() && E.prog().badge) || {})[kind] || 0;
  B.tier = n => { let t = -1; B.STEPS.forEach((s, i) => { if (n >= s) t = i; }); return t; };
  B.top = () => ({concept: B.tier(B.wins('concept')), calc: B.tier(B.wins('calc'))});
  B.win = kind => { const P = E.prog(); P.badge = P.badge || {}; const before = B.tier(P.badge[kind] || 0); P.badge[kind] = (P.badge[kind] || 0) + 1; return B.tier(P.badge[kind]) > before; };
  /* 배지 그림 — 단계마다 모양이 커진다: 원 → 방패 → 육각형 → 별 → 빛나는 별 */
  B.svg = (kind, t, size) => {
    if (t < 0) return '';
    size = size || 44; const [c1, c2] = COL[t], L = B.BADGE[kind].words[t][0], id = 'bg' + kind + t + Math.random().toString(36).slice(2, 6);
    const shp = [
      '<circle cx="50" cy="50" r="40"/>',
      '<path d="M50 8 L86 20 L82 58 Q76 82 50 94 Q24 82 18 58 L14 20 Z"/>',
      '<polygon points="50,6 88,28 88,72 50,94 12,72 12,28"/>',
      '<polygon points="50,4 62,36 96,38 69,58 79,92 50,72 21,92 31,58 4,38 38,36"/>',
      '<polygon points="50,2 60,30 90,14 72,42 98,52 70,60 84,90 54,74 50,98 46,74 16,90 30,60 2,52 28,42 10,14 40,30"/>'][t];
    const glyph = kind === 'calc' ? '<path d="M70 18 L58 40 L68 40 L52 62" fill="none" stroke="#fff8" stroke-width="4" stroke-linecap="round"/>' : '';
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-label="${B.BADGE[kind].words[t][1]}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <g fill="url(#${id})" stroke="#fff" stroke-width="3" stroke-linejoin="round">${shp}</g>${glyph}
      ${t >= 3 ? `<circle cx="50" cy="52" r="23" fill="${c2}" stroke="#fff" stroke-width="2.5"/>` : ''}
      <text x="50" y="${t >= 3 ? 64 : 64}" text-anchor="middle" font-family="Black Han Sans, Pretendard, sans-serif" font-weight="900" font-size="${t >= 3 ? 32 : 40}" fill="#fff" stroke="#0009" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${L}</text></svg>`;
  };
})();
