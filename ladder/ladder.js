/* 말하는 수학 — 선생님 질문 계단 (시범) [v82.1]
 * 격리 모듈: dodream.html · app-ui.js 의 기존 흐름은 건드리지 않는다.
 *  · 소단원 질문 목록 화면에 계단이 있으면 "🪜 선생님 질문 계단" 카드를 끼워 넣는다.
 *  · 누르면 채팅 화면(겹쳐 뜨는 창)에서 칸마다: 질문 → 되묻기 → 짧은 설명 → 다시 묻기 → (막히면) 막힘 기록 후 다음 칸.
 *  · 채점: AI 는 아이디어별 판정·근거 인용·오개념·인정 한마디만. 되묻기 문장은 계단에 적힌 것을 붙인다(답이 새지 않게).
 *  · 기록: submissions 에 level='ladder' 한 칸 = 한 줄 (question_id = ladder:<소단원키>:<칸>). 선생님·부모님용 기록 문장은 misconception 칸에.
 * 데이터: ladder/data-<학년>.js (작업도구/질문계단/export_app.py 로 만든다)
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const IDS = 'abc';
  // [v82.4] 수식은 앱의 표시기(mfmt)로 그려 교재 글씨체와 같게 한다
  const fm = t => (typeof window.mfmt === 'function' ? window.mfmt(String(t == null ? '' : t)) : esc(t));
  const STAGE = {first:'한 번에', hint:'되묻기 후', teach:'설명 보고', stuck:'막힘'};

  // ── 채점 지시문 (작업도구/질문계단/grade_test3.js 에서 시험한 것과 같은 규칙) ──────────────
  const SYSTEM = `너는 '말하는 수학'의 선생님 '뚜삐'야. 학생이 질문 하나에 말로 답한 것(음성 인식 텍스트)을 보고
[통과 아이디어]를 하나씩 짚었는지 판정해. 되묻기 질문은 앱이 따로 붙이니까 너는 만들지 마.

[판정 규칙]
- 아이디어마다 hit(true/false). true면 학생 말에서 근거가 된 부분을 짧게 그대로 인용(evidence). 인용할 곳이 없으면 false.
- 뜻이 같으면 표현이 달라도 인정. 수식·기호를 정확히 읽지 않아도 아이디어를 말로 설명했으면 인정.
- 음성 인식은 수학 말을 자주 틀리게 적는다("비 제곱 빼기 사 에이 씨"=b²−4ac, "판결식"=판별식, "디"=D, "근과 개수"=근과 계수). 소리가 비슷하고 문맥상 분명하면 맞게 말한 것으로 봐.
- 숫자 계산 결과는 요구하지 않는다.
- [예/아니요 금지] "네", "될 것 같아요", "쓸 수 있어요"처럼 결론만 말하고 이유·내용이 없으면 어떤 아이디어도 인정하지 마.
- 아이디어의 핵심(무엇을 하는지, 왜 그런지)을 말했으면 예시·세부 표현·계산 결과가 빠져도 인정해. 짧은 답이라도 핵심이 분명하면 인정.
- 하지만 핵심의 절반만 말했으면 인정하지 마.
- 같은 답이면 언제 채점해도 같은 판정이 나오도록, 애매할 때는 "핵심이 분명히 들어 있는가" 하나로만 판단해.
- [이전 답]이 있으면 이전 답과 이번 답을 합쳐서 판정해.
- 틀린 내용을 말했으면 misconception 에 학생 생각을 한 줄로 요약. 없으면 "".
- focus: 아직 못 맞힌 아이디어 중, 학생이 틀리게 말한 내용과 가장 직접 관련된 아이디어의 id. 틀린 말이 없으면 못 맞힌 첫 아이디어의 id. 다 맞았으면 "".

[ack — 인정 한마디]
- 25자 안팎 반말 한 문장. 학생이 맞게 말한 부분만 구체적으로 인정해.
- 맞게 말한 게 없으면 "좋아, 같이 하나씩 생각해 보자." 처럼 격려만. 틀린 말을 했으면 "그렇게 생각했구나." 처럼 받아 주기만.
- ack 에 정답, 빠진 아이디어의 내용, 힌트, 질문을 절대 넣지 마.

반드시 JSON만 출력: {"hits":[{"id":"a","hit":true,"evidence":"..."}],"misconception":"","focus":"b","ack":"..."}`;

  async function grade(step, question, answer, prev) {
    const ideas = step.ideas.map((x, i) => IDS[i] + ') ' + x[0]).join('\n');
    const user = `[질문] ${question}\n[통과 아이디어]\n${ideas}\n` + (prev ? `[이전 답] ${prev}\n` : '') + `[학생의 답(음성 인식)] ${answer}`;
    const data = await callClaude({task:'grade', model:'claude-sonnet-4-6', max_tokens:700, system:SYSTEM, messages:[{role:'user', content:user}]});
    const raw = (data.content || []).map(b => b.text || '').join('').trim();
    let o = null; try { o = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)); } catch {}
    if (!o) throw new Error('뚜삐가 답을 알아듣지 못했어요. 한 번 더 말해 줄래?');
    const hits = step.ideas.map((x, i) => { const f = (o.hits || []).find(h => h && h.id === IDS[i]); return {id:IDS[i], hit:!!(f && f.hit), evidence:(f && f.hit && f.evidence) || ''}; });
    let miss = hits.findIndex(h => !h.hit);
    const fi = typeof o.focus === 'string' ? o.focus.trim().charCodeAt(0) - 97 : -1;
    if (miss >= 0 && fi >= 0 && fi < hits.length && !hits[fi].hit) miss = fi;
    const h = hits.filter(x => x.hit).length, mis = String(o.misconception || '').trim();
    const verdict = (h > 0 && mis) ? 'applied' : (miss < 0 ? 'pass' : (h > 0 ? 'partial' : 'none'));
    return {verdict, hits, h, n:hits.length, miss, misconception:mis, ack:String(o.ack || '').trim()};
  }

  // ── 기록 ────────────────────────────────────────────────────────────
  const scoreOf = (stage, h, n) => stage === 'first' ? 100 : stage === 'hint' ? 85 : stage === 'teach' ? 70 : Math.round(60 * h / Math.max(1, n));
  async function save(ctx, k, rec) {
    const s = session.student; if (!s) return;
    const step = ctx.steps[k], score = scoreOf(rec.stage, rec.h, rec.n), passed = rec.stage !== 'stuck';
    const gradeObj = (typeof GRADES !== 'undefined' && GRADES.find(g => g.id === ctx.grade)) || {id:ctx.grade, name:ctx.grade};
    const hitText = step.ideas.map((x, i) => (rec.hits[i] && rec.hits[i].hit ? '✓ ' : '✕ ') + x[0]).join(' / ');
    const row = {
      student_id:s.id, name:s.name, student_grade:s.grade || '',
      course_id:gradeObj.id, course_name:gradeObj.name,
      unit_id:ctx.unitId || '', unit_label:'🪜 ' + ctx.small,
      level:'ladder', question:step.q, question_id:'ladder:' + ctx.key + ':' + (k + 1),
      transcript:rec.answers.map((a, i) => (i + 1) + '차: ' + a).join('\n'),
      score, praise:'질문 계단 ' + (k + 1) + '칸 · ' + STAGE[rec.stage] + ' · ' + hitText,
      hint:passed ? '' : step.miscon || '', retry_point:'',
      misconception:passed ? (rec.misconception || '') : (step.record || rec.misconception || ''),
      attempt:rec.answers.length, need_teacher:!passed, hints_used:rec.stage === 'first' ? 0 : rec.stage === 'hint' ? 1 : 2, review_due:null
    };
    try { localStorage.setItem('dl:rec:' + s.id + ':' + row.question_id, JSON.stringify({stage:rec.stage, score, time:Date.now()})); } catch {}
    try {
      if (typeof checkSupabase === 'function' && await checkSupabase()) {
        try { await sbInsert('submissions', row); return; }
        catch (e) { if (/question_id/.test(String(e && e.message))) { const r = Object.assign({}, row); delete r.question_id; await sbInsert('submissions', r); return; } throw e; }
      }
    } catch (e) { console.warn('[질문 계단] 서버 저장 실패 → 이 기기에만 저장', e); }
    try { localStorage.setItem('dd:sub:ladder' + Date.now(), JSON.stringify({studentId:s.id, name:s.name, courseId:row.course_id, courseName:row.course_name, unitId:row.unit_id, unitLabel:row.unit_label, level:'ladder', question:row.question, questionId:row.question_id, transcript:row.transcript, score, pass:passed, praise:row.praise, misconception:row.misconception, time:new Date().toISOString()})); } catch {}
  }
  const dayKey = t => { const d = new Date(t); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); };
  function lastRecs(key, n) {
    const s = session.student; if (!s) return [];
    return Array.from({length:n}, (_, k) => { try { return JSON.parse(localStorage.getItem('dl:rec:' + s.id + ':ladder:' + key + ':' + (k + 1)) || 'null'); } catch { return null; } });
  }
  const lastStages = (key, n) => lastRecs(key, n).map(r => (r && r.stage) || null);
  // [v82.5] 한 칸의 상태: 통과(done) / 오늘은 못 봄(cooling) / 할 차례(todo)
  //   모범답안까지 본 칸은 그날 바로 다시 하면 외워서 통과하게 되므로 다음 날부터 열린다.
  function stepState(rec) {
    if (!rec) return 'todo';
    if (rec.stage !== 'stuck') return 'done';
    return dayKey(rec.time || 0) === dayKey(Date.now()) ? 'cooling' : 'todo';
  }

  // ── 질문 목록 화면에 입구 카드 끼워 넣기 ───────────────────────────────
  function currentCtx() {
    try {
      const big = cpCurrentBig(), sm = cpCurrentSmall(); if (!big || !sm || !CP.grade) return null;
      const key = CP.grade + '|' + big.name + '|' + sm.name, raw = (window.DL_LADDERS || {})[key];
      if (!raw || !raw.length) return null;
      // [v86.0 ⑧] 회차 흐름 학년: 3회차에만 열린다. 숨긴 칸은 건너뛰고(칸 번호는 그대로), 고친 문장을 쓴다.
      const rv = window.DDR ? DDR.ladder(key, raw) : {open:true, steps:raw, hide:[]};
      if (!rv.open) return null;
      const type = typeof cpCurrentType === 'function' ? cpCurrentType() : null;
      return {key, steps:rv.steps, hide:rv.hide || [], grade:CP.grade, big:big.name, small:sm.name, unitId:type && type.unitId};
    } catch { return null; }
  }
  function inject() {
    const host = $('ddUiStudentMain'), view = $('viewStudent');
    if (!host || !view || view.dataset.uiPage !== 'questions' || host.querySelector('.dl-entry')) return;
    if (!session.student || session.teacher) return;
    const ctx = currentCtx(); if (!ctx) return;
    const hid = new Set(ctx.hide || []);
    const recs = lastRecs(ctx.key, ctx.steps.length).map((r, i) => hid.has(i) ? null : r), states = recs.map((r, i) => hid.has(i) ? 'hidden' : stepState(r));
    const passed = states.filter(x => x === 'done').length, cooling = states.filter(x => x === 'cooling').length;
    const todo = states.filter(x => x === 'todo').length, done = recs.map(r => r && r.stage);
    // [v83.7] 남은 칸이 없어도 통과한 칸이 있으면 '다시 풀기'로 들어갈 수 있다 (기존 질문처럼)
    const replay = !todo && passed > 0;
    const card = document.createElement('section'); card.className = 'dl-entry';
    card.innerHTML = '<div><h2>🪜 선생님 질문 계단</h2><p>뚜삐 선생님이 한 칸씩 물어볼게요. 막히면 힌트와 설명이 나와요.</p>'
      + '<p class="dl-meta">질문 ' + (ctx.steps.length - hid.size) + '칸'
        + (recs.some(Boolean) ? ' · 통과 ' + passed + '칸' + (cooling ? ' · 오늘은 쉬는 칸 ' + cooling : '') + (todo ? ' · 남은 ' + todo + '칸' : '') : '') + '</p></div>'
      + '<button type="button" class="dd-ui-primary dl-start"' + (todo || replay ? '' : ' disabled') + '>'
        + (todo ? (recs.some(Boolean) ? '남은 칸 이어서 →' : '시작하기 →') : (replay ? (cooling ? '통과한 칸 다시 풀기 →' : '모두 통과 ✓ · 다시 풀기 →') : '내일 다시 열려요')) + '</button>';
    const btn = card.querySelector('.dl-start');
    if (!btn.disabled) btn.addEventListener('click', () => open(ctx, replay));
    const head = host.querySelector('.dd-ui-page-head');
    if (head) head.after(card); else host.prepend(card);
  }

  // ── 채팅 화면 ─────────────────────────────────────────────────────────
  const R = {ctx:null, k:0, plan:[], pi:0, phase:'ask', answers:[], busy:false, recs:[], rec:null, recog:null, heard:''};
  function el(html) { const t = document.createElement('div'); t.innerHTML = html.trim(); return t.firstChild; }
  function bubble(who, html, extra) {
    const chat = $('dlChat');
    const b = el('<div class="dl-msg ' + who + (extra ? ' ' + extra : '') + '">' + (who === 't' ? '<div class="dl-ava">' + (window.DDOOPI ? DDOOPI.listen : '🐣') + '</div>' : '') + '<div class="dl-bub">' + html + '</div></div>');
    chat.appendChild(b); b.scrollIntoView({block:'end', behavior:'smooth'}); return b;
  }
  function progress() {
    const p = $('dlProgress'); if (!p) return;
    p.innerHTML = R.ctx.steps.map((_, i) => {
      if ((R.ctx.hide || []).includes(i)) return '';
      const cls = R.recs[i] ? 'st-' + R.recs[i].stage : (R.old[i] ? 'st-' + R.old[i].stage : (i === R.k ? 'now' : ''));
      return '<span class="dl-dot ' + cls + '" title="' + (i + 1) + '칸"></span>';
    }).join('');
    $('dlCount').textContent = Math.min(R.pi + 1, R.plan.length) + ' / ' + R.plan.length + '칸';
  }
  function figureFor(step) {
    if (step.figScene) { try { return '<div class="dl-fig">' + ddFig(step.figScene) + '</div>'; } catch { return ''; } }
    if (!step.fig) return '';
    try {
      const card = ddGetCard(R.ctx.grade, R.ctx.big, R.ctx.small);
      const m = (card && card.media || []).find(x => x && x.form === 'ddfig' && x.scene);
      return m ? '<div class="dl-fig">' + ddFig(m.scene) + '</div>' : '';
    } catch { return ''; }
  }
  function ask() {
    R.k = R.plan[R.pi];
    const step = R.ctx.steps[R.k];
    R.phase = 'ask'; R.answers = []; progress();
    bubble('t', '<div class="dl-kind">' + (R.k + 1) + '칸 · ' + esc(step.kind) + '</div>' + fm(step.q) + figureFor(step));
    setInput(true);
  }
  function setInput(on) {
    R.busy = !on;
    for (const id of ['dlText', 'dlSend', 'dlMic', 'dlClear']) { const x = $(id); if (x) x.disabled = !on; }
    if (on) { const t = $('dlText'); if (t && !SpeechAvailable()) t.focus(); }
  }
  const SpeechAvailable = () => typeof SpeechRecognitionCtor !== 'undefined' && !!SpeechRecognitionCtor;
  async function submit() {
    if (R.busy) return;
    stopMic();
    let answer = ($('dlText').value || '').trim();
    if (window.fixMathSpeech) answer = window.fixMathSpeech(answer);
    if (typeof ddAnswerOk === 'function' ? !ddAnswerOk(answer) : answer.replace(/\s/g, '').length < 2) { notice('조금만 더 말해 줄래?'); return; }
    $('dlText').value = ''; R.heard = '';
    bubble('s', esc(answer));
    R.answers.push(answer); setInput(false);
    const typing = bubble('t', '<span class="dl-typing"><i></i><i></i><i></i></span>');
    const step = R.ctx.steps[R.k];
    let g;
    try {
      const question = R.phase === 'again' ? step.again : step.q;
      const prev = R.phase === 'hint' ? R.answers.slice(0, -1).join(' / ') : '';
      g = await grade(step, question, answer, prev);
    } catch (e) {
      typing.remove(); R.answers.pop();
      bubble('t', esc((e && e.message) || '채점 중 문제가 생겼어요. 잠시 뒤 다시 보내 줘.'), 'err');
      setInput(true); return;
    }
    typing.remove();
    R.last = g;
    if (g.verdict === 'pass') return finishStep(R.phase === 'ask' ? 'first' : R.phase === 'hint' ? 'hint' : 'teach', g);
    if (R.phase === 'ask') {
      R.phase = 'hint';
      const mi = g.miss >= 0 ? g.miss : 0;   // 적용 오류(핵심은 다 말했지만 틀린 말이 섞임)면 첫 아이디어부터 다시 짚는다
      bubble('t', esc(g.ack) + ' <b>' + fm(step.ideas[mi][1]) + '</b>');
      setInput(true); return;
    }
    if (R.phase === 'hint') {
      R.phase = 'again';
      bubble('t', esc(g.ack || '괜찮아, 같이 정리해 보자.'));
      bubble('t', '<div class="dl-teach"><div class="dl-kind">짧은 설명</div>' + fm(step.teach) + '</div>');
      bubble('t', '<div class="dl-kind">다시 한 번</div>' + fm(step.again));
      setInput(true); return;
    }
    finishStep('stuck', g);
  }
  function finishStep(stage, g) {
    const rec = {stage, hits:g.hits, h:g.h, n:g.n, misconception:g.misconception, answers:R.answers.slice()};
    R.recs[R.k] = rec;
    save(R.ctx, R.k, rec);
    if (stage === 'stuck') {
      // [v82.5] 세 번까지 해도 못 맞히면 정확한 모범답안을 보여 준다. 대신 이 칸은 오늘은 다시 열리지 않는다.
      const step = R.ctx.steps[R.k];
      bubble('t', '<div class="dl-answer"><div class="dl-kind">모범답안</div><ul>'
        + step.ideas.map(x => '<li>' + fm(x[0]) + '</li>').join('') + '</ul>'
        + '<p>' + fm(step.teach) + '</p></div>');
      bubble('t', '오늘은 이 칸을 여기까지 하자. <b>내일 다시 열리면</b> 네 말로 설명해 보는 거야.');
    }
    else bubble('t', esc(g.ack || '좋아!') + ' ✓', 'ok');
    R.pi++;
    progress();
    if (R.pi < R.plan.length) setTimeout(ask, 700);
    else setTimeout(summary, 700);
  }
  function summary() {
    setInput(false);
    const foot = $('dlFoot'); if (foot) foot.hidden = true;
    const rows = R.plan.map(i => { const s = R.ctx.steps[i], r = R.recs[i] || {stage:'stuck'}; return '<li class="st-' + r.stage + '"><span>' + (r.stage === 'stuck' ? '✕' : '✓') + '</span><div><b>' + (i + 1) + '칸 · ' + STAGE[r.stage] + '</b><small>' + fm(s.q) + '</small></div></li>'; }).join('');
    const ok = R.plan.filter(i => R.recs[i] && R.recs[i].stage !== 'stuck').length;
    bubble('t', '<div class="dl-sum"><div class="dl-kind">오늘의 계단</div><p><b>' + R.plan.length + '칸 중 ' + ok + '칸</b>을 설명했어!' + (ok < R.plan.length ? ' 못 푼 칸은 내일 다시 열려.' : ' 멋지다!') + '</p><ul>' + rows + '</ul>'
      + '<button type="button" class="dd-ui-primary" id="dlDone">질문 목록으로</button></div>');
    $('dlDone').addEventListener('click', close);
  }
  function notice(t) { const n = $('dlNotice'); if (!n) return; n.textContent = t; n.hidden = false; clearTimeout(notice.t); notice.t = setTimeout(() => n.hidden = true, 2600); }

  // 음성: 앱의 인식기와 따로 쓴다
  function startMic() {
    if (!SpeechAvailable() || R.busy) return;
    try { if (typeof stopRecognitionIfActive === 'function') stopRecognitionIfActive(); } catch {}
    const r = new SpeechRecognitionCtor(); R.recog = r;
    r.lang = 'ko-KR'; r.continuous = true; r.interimResults = true;
    // [v82.4] 이 인식기에서 새로 들린 것만 이어 붙인다.
    //   예전엔 ev.results 를 늘 처음부터 다시 읽어, 앞 칸에서 말한 내용이 다음 칸 답에 남았다.
    const base = ($('dlText').value || '').trim();
    let done = '';
    r.onresult = ev => {
      let mid = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) done += t + ' '; else mid += t;
      }
      $('dlText').value = ((base ? base + ' ' : '') + done + mid).replace(/\s+/g, ' ').trim();
    };
    r.onerror = e => { if (e.error === 'not-allowed') notice('마이크를 쓸 수 없어요. 글로 써 줘.'); stopMic(); };
    r.onend = () => { if (R.recog === r) stopMic(); };
    try { r.start(); $('dlMic').classList.add('recording'); $('dlMicWrap').classList.add('recording'); notice('듣고 있어요. 다 말하면 마이크를 한 번 더 눌러.'); } catch { stopMic(); }
  }
  function stopMic() {
    const r = R.recog; R.recog = null;
    if (r) { try { r.onend = null; r.stop(); } catch {} }
    const m = $('dlMic'); if (m) m.classList.remove('recording');
    const w = $('dlMicWrap'); if (w) w.classList.remove('recording');
  }

  function open(ctx, replay) {
    if (typeof isAcademyDevice === 'function' && !isAcademyDevice() && !session.teacher) { alertBox('학원 태블릿에서만 공부할 수 있어요. 선생님께 말씀해 주세요.'); return; }
    try { if (typeof stopRecognitionIfActive === 'function') stopRecognitionIfActive(); if (typeof Timer !== 'undefined') Timer.hide(); } catch {}
    const old = lastRecs(ctx.key, ctx.steps.length), states = old.map(stepState);
    const hid = new Set(ctx.hide || []);
    const plan = states.map((st, i) => !hid.has(i) && (replay ? st !== 'cooling' : st === 'todo') ? i : -1).filter(i => i >= 0);
    if (!plan.length) { alertBox(states.some(x => x === 'cooling') ? '오늘 막힌 칸은 내일 다시 열려요. 다른 개념을 해 볼까요?' : '이 계단은 모두 통과했어요!'); return; }
    Object.assign(R, {ctx, k:plan[0], plan, pi:0, old, phase:'ask', answers:[], busy:false, recs:[], last:null});
    const box = el('<div id="dlOverlay" role="dialog" aria-modal="true" aria-label="선생님 질문 계단">'
      + '<div class="dl-head"><button type="button" class="dd-ui-text" id="dlClose">‹ 나가기</button><div class="dl-title"><small>' + esc(ctx.big) + '</small><strong>' + esc(ctx.small) + '</strong></div><span id="dlCount"></span></div>'
      + '<div id="dlProgress"></div><div id="dlChat" aria-live="polite"></div>'
      + '<div id="dlNotice" hidden></div>'
      + '<div class="dl-foot" id="dlFoot">'
      + (SpeechAvailable() ? '<div class="dl-mic-wrap" id="dlMicWrap"><span class="ripple r1"></span><span class="ripple r2"></span><span class="ripple r3"></span>'
        + '<button type="button" class="dl-rec" id="dlMic" aria-label="말하기 시작"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button></div>' : '')
      + '<div class="dl-in"><textarea id="dlText" rows="2" placeholder="' + (SpeechAvailable() ? '마이크를 누르고 말해 줘. 여기에 고쳐 쓸 수도 있어.' : '여기에 설명을 써 줘') + '"></textarea>'
      + '<div class="dl-btns"><button type="button" class="dd-ui-text" id="dlClear">지우고 다시</button><button type="button" class="dd-ui-text" id="dlQuit">‹ 질문 목록</button><button type="button" class="dd-ui-primary" id="dlSend">보내기</button></div></div></div></div>');
    document.body.appendChild(box); document.body.classList.add('dl-open');
    $('dlClose').addEventListener('click', () => { if (R.busy) { notice('뚜삐가 듣는 중이에요. 잠깐만!'); return; } if (R.k < ctx.steps.length && R.k > 0 && !confirm('계단을 멈출까요? 지금까지 한 칸은 저장돼요.')) return; close(); });
    $('dlSend').addEventListener('click', submit);
    $('dlText').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); } });
    if ($('dlMic')) $('dlMic').addEventListener('click', () => R.recog ? stopMic() : startMic());
    $('dlClear').addEventListener('click', () => { stopMic(); $('dlText').value = ''; $('dlText').focus(); });
    $('dlQuit').addEventListener('click', () => $('dlClose').click());
    const doneN = R.old.filter(r => r && r.stage !== 'stuck').length;
    const coolN = R.old.filter((r, i) => stepState(r) === 'cooling').length;
    bubble('t', (replay ? (coolN ? '통과한 칸만 다시 해 보자. ' : '다 통과한 계단이야. 다시 한 번 설명해 볼까? ') : '안녕! 오늘은 ')
      + '<b>' + esc(ctx.small) + '</b>' + (replay ? ' ' : '를 ') + R.plan.length + '칸 물어볼게.'
      + (doneN && !replay ? ' 지난번에 통과한 ' + doneN + '칸은 건너뛰었어.' : '')
      + (coolN ? ' 어제 모범답안을 본 ' + coolN + '칸은 내일 다시 열려.' : '')
      + ' 생각나는 대로 설명해 줘.');
    ask();
  }
  function close() {
    stopMic();
    const box = $('dlOverlay'); if (box) box.remove();
    document.body.classList.remove('dl-open');
    R.ctx = null;
    // [v86.6] 질문 목록을 다시 그려 진도·'종합 문제 풀기' 버튼도 새로 (다시 그리면 입구 카드는 알아서 다시 붙는다)
    if (window.DD_UI && DD_UI.render && DD_UI.page === 'questions') { DD_UI.render(); return; }
    const host = $('ddUiStudentMain'); if (host) { const c = host.querySelector('.dl-entry'); if (c) c.remove(); } inject();
  }
  function alertBox(t) { if (typeof window.DD_UI !== 'undefined' && $('ddUiNotice')) { $('ddUiNotice').textContent = t; $('ddUiNotice').hidden = false; setTimeout(() => $('ddUiNotice').hidden = true, 4200); } else alert(t); }
  window.addEventListener('popstate', () => { if ($('dlOverlay') && !R.busy) close(); });

  // ── [v82.5] 개념 질문(기존 흐름)도 못 맞히면 그날은 다시 못 본다 ──────────────
  //   마스터 요청: 바로 다시 보면 힌트·설명을 외워서 통과하게 되므로 하루 뒤부터 열리게.
  const qcoolKey = item => {
    const sid = session.student && session.student.id; if (!sid || !item) return '';
    return 'dl:qcool:' + sid + ':' + (item.id || (CP.grade + '|' + item.q));
  };
  function qcooling(item) {
    const k = qcoolKey(item); if (!k) return false;
    try { const v = localStorage.getItem(k); if (!!v && v === dayKey(Date.now())) return true; } catch {}
    return qcoolingRec(item);
  }
  // [v86.8] 흐름점검 6번 — 기기에만 적어 두면 다른 태블릿에선 바로 다시 할 수 있었다 → 서버 기록(cpRecords)으로도 본다.
  //   오늘 이 질문에 통과 못 한 기록(70점 미만 · 개념 보고 답함)이 있고 아직 통과한 적 없으면 오늘은 닫는다.
  function qcoolingRec(item) {
    try {
      if (!item || item.blank || typeof cpRecords === 'undefined' || !Array.isArray(cpRecords)) return false;
      const today = dayKey(Date.now());
      const same = r => (item.id && r.questionId) ? r.questionId === item.id : (!!r.question && r.question === item.q);
      const recs = cpRecords.filter(r => r && r.courseId === CP.grade && r.level !== 'ladder' && same(r));
      if (recs.some(r => r.pass)) return false;
      return recs.some(r => !r.pass && r.time && dayKey(r.time) === today);
    } catch { return false; }
  }
  window.DL_QCOOL = qcooling;
  function markQuestionFail(question, qid) {
    const sid = session.student && session.student.id; if (!sid) return;
    const k = 'dl:qcool:' + sid + ':' + (qid || (CP.grade + '|' + question));
    try { localStorage.setItem(k, dayKey(Date.now())); } catch {}
  }
  if (typeof window.saveSubmission === 'function') {
    const origSave = window.saveSubmission;
    window.saveSubmission = async function(grade, unit, transcript, result, attempt, needTeacher) {
      try {
        if (state.level !== 'ladder' && result && (result.score || 0) < (typeof PASS_SCORE === 'number' ? PASS_SCORE : 70)) {
          const q = (state.questions && state.questions[state.qIndex]) || '';
          markQuestionFail(q, typeof ddqCurrentId === 'function' ? ddqCurrentId(q) : '');
        }
      } catch {}
      return origSave.apply(this, arguments);
    };
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-dd-ui="question"]'); if (!el) return;   // [v86.8] '이어서 설명하기'는 app-ui 가 막힌 질문을 건너뛴다
    if (!session.student || session.teacher || !window.DD_UI) return;
    let item = null;
    try { item = (DD_UI.shown || DD_UI.questionItems())[Number(el.dataset.index)]; } catch { return; }
    if (item && qcooling(item)) {
      e.preventDefault(); e.stopImmediatePropagation();
      alertBox('오늘은 이 질문을 다시 볼 수 없어요. 설명을 한 번 더 읽고 내일 말해 봐요.');
    }
  }, true);

  // ── [v82.5] 선생님 화면(학생 기록)에 질문 계단 칸 기록을 따로 보여 준다 ──────
  function ladderPanel(subs) {
    const rows = (subs || []).filter(x => x && x.level === 'ladder');
    if (!rows.length) return '';
    const by = {};
    rows.slice().sort((a, b) => new Date(a.time) - new Date(b.time)).forEach(x => { (by[x.unitLabel || ''] = by[x.unitLabel || ''] || {})[x.questionId || x.question] = x; });
    const fmtT = t => { const d = new Date(t); return isNaN(d) ? '' : (d.getMonth() + 1) + '/' + d.getDate(); };
    const body = Object.keys(by).map(label => {
      const items = Object.values(by[label]).sort((a, b) => String(a.questionId).localeCompare(String(b.questionId), 'ko', {numeric:true}));
      const okN = items.filter(x => x.pass !== false && (x.score || 0) >= 70).length;
      return '<div class="dl-rep-unit"><h4>' + esc(label) + ' <span>' + okN + ' / ' + items.length + '칸</span></h4>'
        + items.map(x => {
            const ok = (x.score || 0) >= 70;
            return '<div class="dl-rep-row' + (ok ? '' : ' bad') + '"><b>' + esc(String(x.praise || '').replace(/^질문 계단 /, '')) + '</b>'
              + (x.misconception ? '<span class="dl-rep-note">' + esc(x.misconception) + '</span>' : '')
              + '<span class="dl-rep-time">' + fmtT(x.time) + '</span></div>';
          }).join('') + '</div>';
    }).join('');
    return '<section class="dl-report"><h3>🪜 질문 계단 기록</h3><p>칸마다 한 번에 / 되묻기 후 / 설명 보고 / 막힘으로 남습니다. 막힌 칸에는 무엇을 설명하지 못했는지 적혀 있어요.</p>' + body + '</section>';
  }
  if (typeof window.openStudentHistory === 'function') {
    const origHist = window.openStudentHistory;
    window.openStudentHistory = function(student, subs) {
      const out = origHist.apply(this, arguments);
      try {
        const body = $('shBody'); if (!body) return out;
        const old = body.querySelector('.dl-report'); if (old) old.remove();
        const html = ladderPanel(subs);
        if (html) body.insertAdjacentHTML('afterbegin', html);
      } catch (e) { console.warn('[질문 계단] 기록 패널 실패', e); }
      return out;
    };
  }

  // ── 스타일 ──────────────────────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
.dl-entry{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:linear-gradient(135deg,#eef3ff,#f7f2ff);border:1px solid #d9dcf5;border-radius:16px;padding:16px 18px;margin:0 0 16px}
.dl-entry h2{margin:2px 0 4px;font-size:19px}.dl-entry p{margin:0;color:#555;font-size:14px}.dl-entry .dl-meta{margin-top:4px;font-size:13px;color:#534AB7;font-weight:600}
.dl-tag{display:inline-block;font-size:11px;font-weight:700;color:#fff;background:#534AB7;border-radius:6px;padding:1px 7px}
body.dl-open{overflow:hidden}
#dlOverlay{position:fixed;inset:0;z-index:9000;background:#f6f5f1;display:flex;flex-direction:column;max-width:100vw}
#dlOverlay .dl-head{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#fff;border-bottom:1px solid #e4e2da;width:100%;box-sizing:border-box}
#dlOverlay .dl-title{flex:1;min-width:0}#dlOverlay .dl-title small{display:block;color:#888;font-size:12px}#dlOverlay .dl-title strong{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#dlCount{font-size:13px;color:#534AB7;font-weight:700}
#dlProgress{display:flex;gap:5px;padding:8px 16px;background:#fff;border-bottom:1px solid #eee;justify-content:center}
.dl-dot{width:22px;height:8px;border-radius:4px;background:#e3e1da}.dl-dot.now{background:#9aa4f0}.dl-dot.st-first,.dl-dot.st-hint,.dl-dot.st-teach{background:#2f9e76}.dl-dot.st-stuck{background:#D85A30}
#dlChat{flex:1;overflow-y:auto;padding:16px;max-width:780px;width:100%;margin:0 auto;box-sizing:border-box}
.dl-msg{display:flex;gap:8px;margin:0 0 12px;align-items:flex-end}.dl-msg.s{justify-content:flex-end}
.dl-ava{width:34px;height:34px;flex:none}.dl-ava svg{width:34px;height:34px}
.dl-bub{max-width:82%;background:#fff;border:1px solid #e4e2da;border-radius:16px 16px 16px 4px;padding:10px 13px;font-size:16px;line-height:1.6;word-break:keep-all}
.dl-msg.s .dl-bub{background:#534AB7;color:#fff;border-color:#534AB7;border-radius:16px 16px 4px 16px}
.dl-msg.ok .dl-bub{background:#e3f4ec;border-color:#bfe5d3}.dl-msg.err .dl-bub{background:#fdeee8;border-color:#f3cdbd}
.dl-kind{font-size:12px;font-weight:700;color:#534AB7;margin-bottom:3px}
.dl-teach{background:#eef3f9;border-radius:10px;padding:8px 10px}
.dl-answer{background:#fff7ec;border:1px solid #f0ddc2;border-radius:10px;padding:8px 10px}
.dl-answer ul{margin:4px 0 6px;padding-left:18px}.dl-answer li{margin:2px 0}.dl-answer p{margin:0;color:#6b6a64;font-size:14px}
.dl-fig{margin-top:8px}.dl-fig svg{display:block;width:100%;max-width:380px;height:auto}
.dl-typing i{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#aaa;animation:dlb 1s infinite}.dl-typing i:nth-child(2){animation-delay:.15s}.dl-typing i:nth-child(3){animation-delay:.3s}
@keyframes dlb{0%,80%,100%{opacity:.3}40%{opacity:1}}
#dlOverlay .dl-foot{background:#fff;border-top:1px solid #e4e2da;padding:10px max(16px,calc((100% - 780px)/2));display:flex;flex-direction:row;gap:12px;align-items:center;width:100%;box-sizing:border-box}
.dl-in{flex:1;display:flex;flex-direction:column;gap:6px;min-width:0}
.dl-mic-wrap{position:relative;width:74px;height:74px;flex:none;display:flex;align-items:center;justify-content:center}
.dl-mic-wrap .ripple{position:absolute;inset:0;border-radius:50%;border:2px solid #FF6B47;opacity:0;pointer-events:none}
.dl-mic-wrap.recording .ripple{animation:dlknock 1.6s ease-out infinite}
.dl-mic-wrap.recording .ripple.r2{animation-delay:.5s}.dl-mic-wrap.recording .ripple.r3{animation-delay:1s}
@keyframes dlknock{0%{transform:scale(.7);opacity:.55}100%{transform:scale(1.9);opacity:0}}
.dl-rec{position:relative;width:56px;height:56px;border-radius:50%;border:none;background:#FF6B47;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(255,107,71,.35)}
.dl-rec.recording{background:#D8442A}.dl-rec:disabled{opacity:.5}
.dl-btns{align-items:center}
#dlText{flex:1;font-size:16px;border:1px solid #d6d3ca;border-radius:12px;padding:9px 11px;resize:none;font-family:inherit;min-height:46px}
.dl-btns{display:flex;flex-direction:row;gap:6px;flex:none}.dl-btns button{white-space:nowrap}#dlMic.rec{background:#D85A30;color:#fff;border-color:#D85A30}
#dlNotice{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);background:#333;color:#fff;border-radius:10px;padding:7px 14px;font-size:14px}
.dl-sum ul{list-style:none;margin:8px 0 12px;padding:0}.dl-sum li{display:grid;grid-template-columns:22px 1fr;gap:6px;padding:6px 0;border-top:1px solid #eee}
.dl-sum li span{font-weight:700;color:#2f9e76}.dl-sum li.st-stuck span{color:#D85A30}.dl-sum li small{display:block;color:#777;font-size:13px}
.dl-report{background:#fff;border:1px solid #e4e2da;border-radius:12px;padding:12px 14px;margin:0 0 12px}
.dl-report h3{margin:0 0 4px;font-size:15px}.dl-report>p{margin:0 0 8px;font-size:12px;color:#6b6a64}
.dl-rep-unit{margin:8px 0}.dl-rep-unit h4{margin:0 0 4px;font-size:13.5px}.dl-rep-unit h4 span{color:#2f9e76;font-size:12px}
.dl-rep-row{font-size:13px;padding:3px 0;border-top:1px solid #f0efe9;display:grid;grid-template-columns:1fr auto;gap:2px 8px}
.dl-rep-row.bad b{color:#D85A30}.dl-rep-note{grid-column:1/-1;color:#8a5a1a;font-size:12.5px}.dl-rep-time{color:#9a9890;font-size:12px}
@media (max-width:560px){.dl-bub{max-width:90%;font-size:15px}.dl-mic-wrap{width:62px;height:62px}.dl-rec{width:48px;height:48px}#dlOverlay .dl-foot{gap:8px}}
`;
  document.head.appendChild(css);

  const host = $('ddUiStudentMain');
  if (host) new MutationObserver(() => inject()).observe(host, {childList:true});
  inject();
  // [v86.0 ⑧] 한 소단원 계단의 통과 칸 / 전체 칸 (숨긴 칸 제외) — 3회차 소단원 진도에 쓴다
  function tally(key) {
    const raw = (window.DL_LADDERS || {})[key]; if (!raw || !raw.length) return {pass:0, total:0};
    const hid = new Set(window.DDR ? DDR.ladder(key, raw).hide : []);
    const recs = lastRecs(key, raw.length);
    let pass = 0, total = 0;
    recs.forEach((r, i) => { if (hid.has(i)) return; total++; if (stepState(r) === 'done') pass++; });
    return {pass, total};
  }
  window.DL_LADDER = {version:'86.2', open:ctx => open(ctx), currentCtx, grade, tally, markCool:markQuestionFail, get state(){ return R; }};
})();
