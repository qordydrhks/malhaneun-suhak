/* 새 앱 — ✦ 별빛노트(잘한 대답 모음, 마스터 10/13).
   · 질문을 처음 통과할 때 100점(한 번에) 또는 90점(되묻기 뒤) 대답이면 후보가 된다.
   · 올리기 전에 AI 가 한 번 더 엄격하게 본다(틀린 말·빠진 핵심·장난 말이 없나) — 선생님이 늘 확인할 수 없어서. 통과한 것만 보인다.
   · 행성의 그 난이도 질문을 다 마친 아이만 본다(mission 고르는 화면). 질문마다 100점 대답 중 무작위 하나 — 없으면 90점, 그것도 없으면 "아직".
   · 선생님 화면: 새로 올라온 것 확인 · 숨기기(숨기면 다른 대답이 대신 뽑힌다).
   저장(공유 저장소): 대답 하나 = app:nb:e4-2:<행성코드>:r<난이도>:<질문번호>:<학생>  ·  선생님 판단 = app:nbmod:e4-2 = {키: 'ok'|'hide'} */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const N = A.N = {};
  const C = () => A.cid();
  N.key = (code, r, qid, sid) => 'app:nb:' + C() + ':' + code + ':r' + r + ':' + qid + ':' + sid;
  Object.defineProperty(N, 'MOD', {get: () => 'app:nbmod:' + C()});
  const like = p => 'key=like.' + encodeURIComponent(p) + '&select=key,value&limit=1000';

  const CHECK = `너는 초등 수학 선생님이야. 아래 학생 대답을 다른 친구들에게 '잘한 대답'으로 보여 줘도 되는지 엄격하게 판단해.
[모두 만족해야 ok:true]
- 수학적으로 틀린 말이 하나도 없다(음성 인식으로 글자가 조금 틀린 것은 뜻이 분명하면 괜찮다).
- [꼭 말할 핵심]을 모두 담고 있다.
- 질문과 상관없는 말·장난·나쁜 말·사람 이름·개인 정보가 없다.
애매하면 ok:false. 반드시 JSON만: {"ok":true,"why":"한 줄"}`;

  /* 처음 통과 때 부른다(기다리지 않음) */
  N.post = async ({task, small, r, q, answers, keys, question, ans}) => {
    try {
      const st = A.session.student; if (!st || !(q >= 90) || !small || !small.code) return;
      if (!['q', 'lad'].includes(task.kind)) return;
      const text = answers.length > 1 ? answers.join(' … ') : (answers[0] || '');
      if (text.replace(/\s/g, '').length < 6) return;
      let ok = false, why = '';
      try {
        const raw = await A.ai({task: 'grade', system: CHECK, max_tokens: 300, grade_id: C(), unit_id: small.unitId || null,
          messages: [{role: 'user', content: `[질문] ${question}\n[모범 답] ${ans}\n[꼭 말할 핵심]\n${keys.map((k, i) => (i + 1) + ') ' + k).join('\n')}\n[학생 대답] ${text}`}]});
        const o = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
        ok = o.ok === true; why = String(o.why || '').slice(0, 80);
      } catch (e) { return; }                                   // 검사를 못 했으면 올리지 않는다
      await A.store.set(N.key(small.code, r, task.id, st.id), {sid: st.id, name: st.name, q, ans: text.slice(0, 500), at: Date.now(), ok, why, code: small.code, r, qid: task.id});
    } catch (e) {}
  };

  /* 행성 한 난이도의 별빛노트: [{task, pick:{name, ans, q, mine, fresh} | null, level: 100|90|0}] */
  N.load = async (small, r) => {
    let rows = [], mod = {};
    try { [rows, mod] = await Promise.all([A.sbSelect('ai_cache', like('app:nb:' + C() + ':' + small.code + ':r' + r + ':*')), A.store.get(N.MOD)]); } catch (e) {}
    mod = mod || {};
    const me = A.session.student && A.session.student.id;
    const byQ = {};
    for (const x of rows || []) { const v = x.value; if (!v || !v.ok || mod[x.key] === 'hide') continue; (byQ[v.qid] = byQ[v.qid] || []).push(Object.assign({key: x.key, checked: mod[x.key] === 'ok'}, v)); }
    return E.tasks(small, r).map(t => {
      const all = byQ[t.id] || [];
      const top = all.filter(v => v.q >= 100), pool = top.length ? top : all.filter(v => v.q >= 90);
      const others = pool.filter(v => v.sid !== me), use = others.length ? others : pool;
      const p = use.length ? use[Math.floor(Math.random() * use.length)] : null;
      return {task: t, pick: p && {name: p.name, ans: p.ans, q: p.q, mine: p.sid === me, fresh: !p.checked && Date.now() - p.at < 864e5}, level: p ? (top.length ? 100 : 90) : 0, n: pool.length};
    });
  };

  /* 선생님 화면 — 전부 */
  N.all = async () => {
    let rows = [], mod = {};
    try { [rows, mod] = await Promise.all([A.sbSelect('ai_cache', like('app:nb:' + C() + ':*')), A.store.get(N.MOD)]); } catch (e) {}
    mod = mod || {};
    return {rows: (rows || []).filter(x => x.value && x.value.ok).map(x => Object.assign({key: x.key, mod: mod[x.key] || ''}, x.value)).sort((a, b) => b.at - a.at), mod};
  };
  N.setMod = async (key, v) => { const m = (await A.store.get(N.MOD)) || {}; if (v) m[key] = v; else delete m[key]; await A.store.set(N.MOD, m); return m; };
})();
