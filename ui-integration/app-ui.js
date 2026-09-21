/* 말하는 수학 v78.6: existing DOM, curriculum, grading and storage integration.
 * No copied curriculum, demo records or replacement authentication.
 * Classic-script globals below are intentional contracts with dodream.html.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ui = {page:'home', level:'high', kind:'concept', band:'e', input:'voice', busy:false, menu:null, questions:[], rview:'now'};
  // [v81.7] 브라우저·폰 뒤로가기 → 앱 안의 직전 화면 (앱의 첫 화면에서만 앱을 나간다)
  //   stage()/showTeacher() 가 화면을 바꿀 때마다 — 즉 사람이 누른 순간에 — history 에 한 칸씩 쌓고 그 칸에 화면 정보를 담는다.
  //   뒤로가기·앞으로가기(popstate)는 그 칸의 화면으로 되돌리기만 한다.
  //   ⚠️ v81.5 는 뒤로가기가 눌린 순간 앱이 스스로 칸을 다시 넣었다. 크롬은 "사람 조작 없이 넣은 칸"을 뒤로가기 때
  //      건너뛰어서 두 번째 뒤로가기에 앱을 나가 버렸다. → popstate 안에서는 절대 pushState 하지 말 것.
  const nav = {restoring:false};
  const original = {showView, enterStudentView, setLearnStep, cpSyncLegacy, renderCurrentQuestion, resetRecordingUI, renderFeedback, saveSubmission, startQuiz, goToNextQuestion, tryAutoLogin, renderRail, openStudentHistory, doLogout, onSpeakTimeout};
  const menus = [
    ['dashboard','학생과 학습','학습 현황','오늘의 학습 · 통과 · 도움 필요','▥'],
    ['students','학생과 학습','학생 관리','학생 등록 · 정보 수정 · 학습 이력','◎'],
    ['reports','학생과 학습','학부모 리포트','학생별 리포트 · 코멘트 · 인쇄','▤'],
    ['bank','문항과 수업','문제은행','문제 찾기 · 직접 추가 · 학생 배정','▣'],
    ['cards','문항과 수업','개념·질문 편집','개념 설명 · 말하기 질문 · 기본문제','✎'],
    ['baseline','문항과 수업','기준으로 굳히기','수정한 내용을 공통 기준으로 저장','▱'],
    ['qreview','문항과 수업','질문 고르기','회차 배정 · 빼기 · 문장 고치기 [v82.9]','☰'],
    ['ai','앱 설정','AI 연결','채점에 사용할 AI 키 관리','✧'],
    ['admin','앱 설정','관리자 비밀번호','관리자 화면의 비밀번호 변경','◈']
  ];
  const query = new URLSearchParams(location.search);
  const teacherRoute = !query.has('parent') && menus.some(m => m[0] === query.get('teacherMenu')) ? query.get('teacherMenu') : null;
  const button = (text, action, cls='dd-ui-secondary', attrs='') => '<button type="button" class="'+cls+'" data-dd-ui="'+action+'" '+attrs+'>'+text+'</button>';
  const mascot = () => '<div class="dd-ui-mascot" aria-hidden="true">'+DDOOPI.listen+'</div>';
  const model = () => CP.grade ? cpModel(CP.grade) : null;
  const grade = () => GRADES.find(g => g.id === CP.grade);
  const smallTitle = sm => sm?.types?.[0]?.name || sm?.name || '공부할 개념을 골라요';
  const isStudent = () => !!session.student && !session.teacher;
  const isOwner = () => !!session.teacher && session.role === 'owner';
  function node(id, tag='div', cls='') { const n=document.createElement(tag); n.id=id; n.className=cls; return n; }
  function notice(text) { $('ddUiNotice').textContent=text; $('ddUiNotice').hidden=false; clearTimeout(notice.timer); notice.timer=setTimeout(()=>$('ddUiNotice').hidden=true,4200); }
  // [v79.1] 학원 기기에서만 학습(AI)을 연다. 아이 폰에서는 이유를 알려 주고 멈춘다.
  function academyOk() {
    if(typeof isAcademyDevice!=='function' || isAcademyDevice() || session.teacher) return true;
    notice('학원 태블릿에서만 공부할 수 있어요. 선생님께 말씀해 주세요.');
    return false;
  }
  function stopTalkMic() { if($('cvMic').classList.contains('rec')) $('cvMic').click(); }
  function stage(page) {
    const focus = ['lesson','quiz','talk'].includes(page);
    if(!focus) { stopRecognitionIfActive(); Timer.hide(); restoreLevel(); }
    if(page !== 'talk') stopTalkMic();
    document.body.classList.toggle('step-focus',focus);
    ui.page=page; renderStudent(); window.scrollTo(0,0);
    navRecord({v:'s', page, grade:CP.grade||null, big:CP.big, middle:CP.middle, small:CP.small});
  }
  function navRecord(s) {
    if(nav.restoring) return;
    const cur=history.state && history.state.ddNav;
    if(cur && JSON.stringify(cur)===JSON.stringify(s)) return;
    try {
      if(!cur) history.replaceState({ddNav:s}, '');   // 앱을 처음 연 칸: 새 칸을 만들지 않고 화면 정보만 적는다
      else history.pushState({ddNav:s}, '');
    } catch {}
  }
  // 질문·문제·대화 화면은 다시 열 수 없으므로, 그 칸으로 오면 그 소단원의 질문 목록으로 보낸다
  function navTarget(s) {
    if(s.v!=='s' || !['lesson','quiz','talk'].includes(s.page)) return s;
    return Object.assign({}, s, {page: s.small!=null ? 'questions' : (s.grade ? 'catalog' : 'home')});
  }
  function navSame(a, b) {
    if(a.v!==b.v) return false;
    if(a.v==='t') return a.menu===b.menu;
    return a.page===b.page && a.grade===b.grade && a.big===b.big && a.middle===b.middle && a.small===b.small;
  }
  function navRestore(prev) {
    if(prev.v==='t') { showTeacher(prev.menu); window.scrollTo(0,0); return; }
    // 질문·문제·대화 중이면 앱의 '‹ 질문 선택' 버튼과 같은 정리를 먼저 한다 (마이크·타이머 끄기)
    if(ui.page==='talk') { if($('convoCard').style.display!=='none') $('cvBack').click(); }
    else if(['lesson','quiz'].includes(ui.page)) $('backBtn').click();
    if(prev.grade && prev.grade!==CP.grade) { restoreLevel(); cpChooseGrade(prev.grade); ui.band=cpBandOf(CP.grade); }
    CP.big=prev.big; CP.middle=prev.middle; CP.small=prev.small; CP.type=prev.small==null?null:0;
    if(prev.small!=null) cpSyncLegacy();
    if(prev.page==='records') renderMyHistory();
    if(prev.page==='inbox') { loadAssignments(); loadReviewCards(); }
    stage(prev.page);
    if(prev.page==='home') cpLoadRecords();
  }
  window.addEventListener('popstate', e => {
    const s=e.state && e.state.ddNav;
    if(!s) return;
    if((s.v==='s' && !isStudent()) || (s.v==='t' && !session.teacher)) return;   // 로그아웃한 뒤의 옛 칸은 무시
    if(ui.busy) { notice('평가와 기록 저장을 마친 뒤 이동할 수 있어요.'); return; }
    const target=navTarget(s);
    const now = session.teacher ? {v:'t', menu:ui.menu} : {v:'s', page:ui.page, grade:CP.grade||null, big:CP.big, middle:CP.middle, small:CP.small};
    // 되돌아갈 칸이 지금 화면과 같으면(질문 화면 칸 → 질문 목록, 앱 안 버튼으로 같은 화면이 두 번 쌓인 경우) 한 칸 더 뒤로.
    //   이렇게 안 하면 뒤로가기를 눌러도 화면이 그대로라 "안 눌린 것"처럼 보인다. (코드로 부르는 back() 은 크롬이 건너뛰지 않음)
    if(navSame(target, navTarget(now))) { history.back(); return; }
    nav.restoring=true;
    try { navRestore(target); } catch(err) { console.warn('[dd-ui] 뒤로가기 복원 실패', err); }
    finally { nav.restoring=false; }
  });
  function restoreLevel() { state.level=ui.level; state._qType=null; state._baseLevel=ui.level; state._directSelectedQuestion=''; state._pickerQIndex=null; state._roundItem=null; state._roundLevel=null; state._roundSaw=false; }
  function lock(busy) {
    ui.busy=busy; $('viewStudent').classList.toggle('dd-ui-busy',busy);
    for(const id of ['backBtn','nextUnitBtn','nextQBtn','retryBtn','skipQBtn','ddUiLessonBack']) if($(id)) $(id).disabled=busy;
  }
  // [v86.0 ⑧] 회차 흐름(rounds/rounds.js)이 켜진 학년이면 지금 회차 질문만. which='past' 는 지난 회차(다시 보기).
  const roundsOn = () => !!(window.DDR && CP.grade && DDR.on(CP.grade));
  function roundItems(which) { const big=cpCurrentBig(), sm=cpCurrentSmall(); return big&&sm ? DDR.items(CP.grade,big.name,sm.name,which||'now') : []; }
  function questionItems() {
    const big=cpCurrentBig(), sm=cpCurrentSmall(), list=[];
    if(!big || !sm) return list;
    if(roundsOn()) return roundItems('now');
    (sm.types||[]).forEach((type,ti) => {
      const t=ceApply(CP.grade,big.name,sm.name,type,null,ti).type;
      const key=ddqConceptKey(CP.grade,big.name,sm.name), ids=ui.level==='high'?t.highIds||[]:t.lowIds||[];   // [v80.9] 질문 번호
      if(ui.level==='blank') list.push({q:'빈칸을 채우며 이 개념을 떠올려요.',kind:'concept',ti,index:0,blank:true});
      else (ui.level==='high'?t.high||[]:t.low||[]).forEach((q,index)=>{if(q)list.push({q,kind:'concept',ti,index,id:ids[index]?key+':'+ids[index]:''});});
    });
    if(ui.level!=='blank') ((ddGetQSet(CP.grade,big.name,sm.name)||{}).questions||[]).forEach((q,index)=>{
      if(q.q) list.push({q:q.q,kind:'typed',ti:0,index,type:q.type,id:q.id?ddqConceptKey(CP.grade,big.name,sm.name)+':'+q.id:''});
    });
    return list;
  }
  const status = item => item.blank ? 'none' : cpStatusForQuestion(CP.grade,item.q,item.id);
  const remaining = () => questionItems().filter(q => status(q)!=='pass');
  function remember() {
    if(!session.student) return;
    try {
      localStorage.setItem('dd:ui:selection:'+session.student.id,JSON.stringify({grade:CP.grade,big:CP.big,middle:CP.middle,small:CP.small}));
      if(CP.grade) localStorage.setItem('dd:lastCourse:'+session.student.id,CP.grade);
    } catch {}
  }
  function restoreSelection() {
    CP.grade=state.gradeId||null; CP.band=cpBandOf(CP.grade); ui.band=CP.band||'e';
    CP.big=null; CP.middle=null; CP.small=null; CP.type=null;
    try {
      const s=JSON.parse(localStorage.getItem('dd:ui:selection:'+session.student.id)||'null');
      if(s && s.grade===CP.grade) {
        const big=cpModel(s.grade)?.bigUnits[s.big], mid=big&&cpBigMiddles(big)[s.middle];
        if(mid?.smalls?.[s.small]) { CP.big=s.big; CP.middle=s.middle; CP.small=s.small; CP.type=0; }
      }
    } catch {}
  }
  function syncSelectionFromUnit() {
    if(CP.grade===state.gradeId && cpCurrentType()?.unitId===state.unitId) return;
    const m=cpModel(state.gradeId);
    if(!m) return;
    for(let bi=0;bi<m.bigUnits.length;bi++) {
      const mids=cpBigMiddles(m.bigUnits[bi]);
      for(let mi=0;mi<mids.length;mi++) for(let si=0;si<(mids[mi].smalls||[]).length;si++) {
        const ti=(mids[mi].smalls[si].types||[]).findIndex(t=>String(t.unitId)===String(state.unitId));
        if(ti>=0) { CP.grade=state.gradeId; CP.band=cpBandOf(CP.grade); CP.big=bi; CP.middle=mi; CP.small=si; CP.type=ti; ui.band=CP.band; remember(); return; }
      }
    }
  }
  async function startItem(item) {
    if(!item || ui.busy || !isStudent()) return false;
    if(!academyOk()) return false;   // [v79.1] 학원 기기에서만
    CP.type=item.ti; CP.qIndex=item.index; cpSyncLegacy();
    if(!currentUnits().some(u=>u.id===state.unitId)) { notice('질문과 단원 연결을 확인하지 못했어요. 다른 개념을 골라 주세요.'); return false; }
    state._baseLevel=ui.level; state._qType=item.type||null; state.level=item.type?(QTYPE_LEVEL[item.type]||'high'):ui.level;
    state._roundItem=null; state._roundLevel=null; state._roundSaw=false;
    if(item.kind==='round') {   // [v86.0 ⑧] 회차 질문: 모범 답으로 채점, 기록에 회차 표시
      if(!item.type) state.level=item.lv||'high';
      state._roundItem=item; state._roundLevel='r'+item.r+(item.past?'re':'');
    }
    state._pickerQIndex=item.index; state._directSelectedQuestion=item.blank?'':item.q; remember(); lock(true);
    try { const ok=await startSelectedQuestion(); if(ok) stage('lesson'); return ok; } finally { lock(false); }
  }
  function axes() {
    if(!CP.grade) return '';
    const a=cvxAxis(CP.grade); if(!a) return '';
    return '<section class="dd-ui-axes"><article><span>설명·문제 학습</span><strong>'+a.main+' / '+a.total+'</strong>'+cvxBar(a.main,a.total)+'</article><article><span>개념 대화</span><strong>'+(a.hasTalk?a.talk+' / '+a.total:'준비 중')+'</strong>'+(a.hasTalk?cvxBar(a.talk,a.total):'')+'</article></section>';
  }
  function home() {
    const sm=cpCurrentSmall(), qs=questionItems(), passed=qs.filter(q=>status(q)==='pass').length;
    return '<div class="dd-ui-hello"><div><h1>'+esc(session.student?.name||'')+' 학생, 어서 와요.</h1><p>알고 있는 수학을 내 말로 꺼내볼까요?</p></div>'+mascot()+'</div>'+
      (typeof isAcademyDevice==='function'&&!isAcademyDevice()?'<div class="dd-ui-device-note" role="note">📵 이 기기에서는 설명하기를 할 수 없어요. <b>학원 태블릿</b>에서 공부해 주세요. 기록 보기는 여기서도 돼요.</div>':'')+
      '<div class="dd-ui-home-grid"><section class="dd-ui-study"><div class="dd-ui-study-top"><div><span class="dd-ui-tag">'+(sm?'이어서 공부하기':'오늘의 개념')+'</span><p class="dd-ui-caption">'+esc(grade()?.name||'공부할 학년부터 선택해요')+'</p><h2>'+esc(smallTitle(sm))+'</h2></div>'+mascot()+'</div>'+
      (sm&&ui.level!=='blank'?'<div class="dd-ui-progress-label"><span>설명한 질문</span><strong>'+passed+' / '+qs.length+'</strong></div>'+cvxBar(passed,qs.length):'')+
      button((sm?'이어서 공부하기':'학년·개념 고르기')+' →','continue','dd-ui-primary dd-ui-full')+button('개념·질문 고르기','catalog','dd-ui-secondary dd-ui-full')+'</section>'+
      '<div class="dd-ui-side"><section class="dd-ui-talk"><span class="dd-ui-tag">가볍게 연습</span><h2>뚜삐와 개념 대화</h2><p>대화하며 개념을 꺼내 보아요.</p>'+button('개념 대화 시작하기 →','talk')+'</section><section class="dd-ui-quiet"><h2>복습과 배정 문제</h2><p>선생님이 낸 문제와 복습할 개념</p>'+button('할 일 보기 →','inbox')+'</section></div></div>'+
      '<div class="dd-ui-section-head"><h2>차곡차곡 쌓이는 나의 공부</h2>'+button('기록 보기','records','dd-ui-text')+'</div>'+axes();
  }
  function gradePicker() {
    return '<div class="dd-ui-page-head"><h1>공부할 학년을 골라요.</h1>'+button('학생 홈','home','dd-ui-text')+'</div>'+
      '<div class="dd-ui-tabs">'+CP_BANDS.map(x=>button(x.label,'band',ui.band===x.key?'active':'','data-band="'+x.key+'" aria-pressed="'+(ui.band===x.key)+'"')).join('')+'</div>'+
      '<div class="dd-ui-grade-grid">'+GRADES.filter(g=>g.id.startsWith(ui.band)).map(g=>button(esc(g.name),'grade','dd-ui-grade '+(CP.grade===g.id?'selected':''),'data-grade="'+g.id+'"')).join('')+'</div>';
  }
  // [v81.4] 진도 표시 — 소단원 완료 = 설명하기 질문(깊이 질문 + 유형별 질문)을 모두 통과 (기본문제 열리는 조건과 같음)
  function smallProgress(big, sm) {
    if(roundsOn()) {   // [v86.0 ⑧] 지금 회차 질문(3회차는 계단 칸도) 기준
      const list=DDR.items(CP.grade,big.name,sm.name,'now'), lad=DDR.round(CP.grade)>=3&&window.DL_LADDER&&DL_LADDER.tally?DL_LADDER.tally(CP.grade+'|'+big.name+'|'+sm.name):{pass:0,total:0};
      const pass=list.filter(x=>cpStatusForQuestion(CP.grade,x.q,x.id)==='pass').length+lad.pass, total=list.length+lad.total;
      return {pass,total,done:total>0&&pass===total};
    }
    const it=ddqItemsFor(CP.grade,big.name,sm), list=[].concat(it.high,it.qset);
    const pass=list.filter(x=>cpStatusForQuestion(CP.grade,x.q,x.id)==='pass').length;
    return {pass,total:list.length,done:list.length>0&&pass===list.length};
  }
  function bigProgress(big) {
    let done=0,total=0;
    cpBigMiddles(big).forEach(mid=>(mid.smalls||[]).forEach(sm=>{ total++; if(smallProgress(big,sm).done) done++; }));
    return {done,total};
  }
  function catalog() {
    const m=model(); if(!m) return gradePicker();
    if(CP.big===null) return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(m.name)+'</p><h1>공부할 단원을 골라요.</h1></div>'+button('학년 바꾸기','grades','dd-ui-text')+'</div><div class="dd-ui-choice-list">'+m.bigUnits.map((x,i)=>{
      const p=bigProgress(x);
      const prog='<span class="dd-ui-prog'+(p.total&&p.done===p.total?' done':'')+'">'+cvxBar(p.done,p.total)+'<span>'+p.done+' / '+p.total+(p.done?' 소단원 완료':'')+'</span></span>';
      return button('<span class="dd-ui-number">'+(i+1)+'</span><strong>'+esc(x.name)+'</strong>'+prog+'<span>›</span>','big','dd-ui-choice','data-big="'+i+'"');
    }).join('')+'</div>';
    let number=0;
    const big=m.bigUnits[CP.big];
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(m.name)+'</p><h1>'+esc(big.name)+'</h1></div>'+button('대단원 목록','bigs','dd-ui-text')+'</div><div class="dd-ui-choice-list">'+
      cpBigMiddles(big).map((mid,mi)=>(mid.smalls||[]).map((sm,si)=>{
        const p=smallProgress(big,sm);
        const prog='<span class="dd-ui-prog'+(p.done?' done':'')+'"><span>'+(p.done?'✓ 완료':p.pass?'질문 '+p.pass+' / '+p.total:'시작 전')+'</span></span>';
        return button('<span class="dd-ui-number">'+(++number)+'</span><div><strong>'+esc(smallTitle(sm))+'</strong>'+(mid.name?'<small>'+esc(mid.name)+'</small>':'')+'</div>'+prog+'<span>›</span>','small','dd-ui-choice','data-middle="'+mi+'" data-small="'+si+'"');
      }).join('')).join('')+'</div>';
  }
  // [v86.0 ⑧] 회차 흐름의 질문 목록. '다시 보기'는 지난 회차 질문을 다시 답하기만 — 지난 답·점수·모범 답은 안 보여 준다.
  function roundPicker(sm) {
    const r=DDR.round(CP.grade), now=roundItems('now'), past=r>1?roundItems('past'):[];
    if(ui.rview==='past'&&!past.length) ui.rview='now';
    const showPast=ui.rview==='past', list=showPast?past:now; ui.questions=list;
    const left=now.filter(q=>status(q)!=='pass').length;
    const tabs=r>1?'<div class="dd-ui-tabs">'+button(r+'회차 질문 <span>'+now.length+'</span>','rview',showPast?'':'active','data-rview="now" aria-pressed="'+(!showPast)+'"')+button('다시 보기 <span>'+past.length+'</span>','rview',showPast?'active':'','data-rview="past" aria-pressed="'+showPast+'"')+'</div>':'';
    const row=(q,i)=>{
      const st=showPast?'none':status(q);
      return button('<span class="dd-ui-number">'+(st==='pass'?'✓':i+1)+'</span><div><small>'+(showPast?q.r+'회차 질문 · 다시 답하기':esc(q.type?QTYPE_LABEL[q.type]||q.type:r+'회차 질문')+(st==='pass'?' · 통과':st==='redo'?' · 다시 설명하기':''))+'</small><div>'+mfmt(q.q)+'</div></div><span>›</span>','question','dd-ui-question','data-index="'+i+'"');
    };
    const empty=(showPast||r>=3)?'':'<div class="dd-ui-empty">이번 회차 질문이 없어요.</div>';
    const foot=showPast
      ?'<p class="dd-ui-caption">지난 회차 질문을 다시 설명해 봐요. 예전에 한 답과 점수는 여기서 보이지 않아요.</p>'
      :(now.length?'<div class="dd-ui-picker-foot"><div><strong>'+(now.length-left)+' / '+now.length+' 질문 통과</strong><p>'+(left?'남은 '+left+'개 질문까지 설명하면 문제 풀기로 이어져요.':'이번 회차 질문을 모두 통과했어요. 문제로 확인해요.')+'</p></div>'+button(left?'이어서 설명하기 →':'문제 풀기 →',left?'continue':'quiz','dd-ui-primary')+'</div>':'');
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(cpCurrentBig().name)+' · <b>'+r+'회차</b></p><h1>'+esc(smallTitle(sm))+'</h1></div>'+button('개념 목록','catalog','dd-ui-text')+'</div>'+
      '<div class="dd-ui-section-head"><h2>'+(showPast?'지난 회차 질문 다시 보기':'질문을 골라 설명해요.')+'</h2></div>'+tabs+
      '<div class="dd-ui-choice-list">'+(list.map(row).join('')||empty)+'</div>'+foot;
  }
  function questionPicker() {
    const sm=cpCurrentSmall(); if(!sm) return catalog();
    if(roundsOn()) return roundPicker(sm);
    const items=questionItems(); ui.questions=items;
    const list=items.map((q,i)=>({...q,i})).filter(q=>q.kind===ui.kind), left=remaining().length;
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(cpCurrentBig().name)+'</p><h1>'+esc(smallTitle(sm))+'</h1></div>'+button('개념 목록','catalog','dd-ui-text')+'</div>'+
      '<div class="dd-ui-section-head"><h2>질문을 골라 설명해요.</h2><label>설명 수준 <select id="ddUiLevel">'+[['low','기본 개념'],['high','설명하기'],['blank','채워보기']].map(([v,t])=>'<option value="'+v+'" '+(v===ui.level?'selected':'')+'>'+t+'</option>').join('')+'</select></label></div>'+
      '<div class="dd-ui-tabs">'+[['concept','개념 질문'],['typed','유형별 질문']].map(([v,t])=>button(t+' <span>'+items.filter(q=>q.kind===v).length+'</span>','kind',ui.kind===v?'active':'','data-kind="'+v+'" aria-pressed="'+(ui.kind===v)+'"')).join('')+'</div>'+
      '<div class="dd-ui-choice-list">'+(list.map(q=>button('<span class="dd-ui-number">'+(status(q)==='pass'?'✓':q.i+1)+'</span><div><small>'+esc(q.type?QTYPE_LABEL[q.type]||q.type:'개념 질문')+(status(q)==='pass'?' · 통과':status(q)==='redo'?' · 다시 설명하기':'')+'</small><div>'+mfmt(q.q)+'</div></div><span>›</span>','question','dd-ui-question','data-index="'+q.i+'"')).join('')||'<div class="dd-ui-empty">이 수준의 유형별 질문은 준비 중이에요. 개념 질문을 먼저 선택해 주세요.</div>')+'</div>'+
      (ui.level==='blank'?'<p class="dd-ui-caption">빈칸 질문은 시작할 때 만들어집니다.</p>':'<div class="dd-ui-picker-foot"><div><strong>'+(items.length-left)+' / '+items.length+' 질문 통과</strong><p>'+(left?'남은 '+left+'개 질문까지 설명하면 기본문제로 이어져요.':'모든 질문을 통과했어요. 기본문제로 확인해요.')+'</p></div>'+button(left?'이어서 설명하기 →':'기본문제로 →',left?'continue':'quiz','dd-ui-primary')+'</div>');
  }
  function syncQuestionChrome() {
    const items=questionItems(), q=state.questions?.[state.qIndex], idx=items.findIndex(x=>x.q===q), p=$('ddUiLessonProgress');
    if(!$('ddUiLessonMeta')) return;
    $('ddUiLessonMeta').textContent=ui.page==='quiz'?'기본문제로 확인':ui.page==='talk'?'개념 대화':idx>=0?'질문 '+(idx+1)+' / '+items.length:'말로 설명하기';
    p.max=items.length||1; p.value=items.filter(x=>status(x)==='pass').length; p.hidden=['talk','quiz'].includes(ui.page);
    // [v78.8] 되돌아가기 글자를 화면에 맞춘다. 대화형은 자기 '단원 선택으로 돌아가기'가 이미 있어서
    //   여기에 '질문 선택'까지 두면 되돌아가는 버튼이 네 개가 되고 뜻도 맞지 않았다.
    const back=$('ddUiLessonBack');
    if(back){
      back.hidden = (ui.page==='talk');
      back.textContent = ui.page==='quiz' ? '‹ 질문 목록' : '‹ 질문 선택';
    }
  }
  // [v78.7] cpRender를 통째로 대신하므로, 여기서 예외가 나면 학생 화면이 빈 채로 멈춘다.
  //   화면 하나가 깨져도 앱 전체가 멎지 않게 감싸고, 아이에게 되돌아갈 길을 준다.
  function renderStudent() {
    try{ renderStudentInner(); }
    catch(err){
      console.error('[dd-ui] 화면 그리기 실패', err);
      const h=$('ddUiStudentMain');
      if(h){ h.hidden=false; h.innerHTML='<div class="dd-ui-page-head"><h1>화면을 여는 데 문제가 생겼어요.</h1></div>'
        +'<p class="dd-ui-caption">잠시 뒤 다시 시도해 주세요.</p>'
        +'<div class="dd-ui-picker-foot">'+button('학생 홈으로','home','dd-ui-primary')+'</div>'; }
    }
  }
  function renderStudentInner() {
    const host=$('ddUiStudentMain'); if(!host) return;
    const views={home,grades:gradePicker,catalog,questions:questionPicker};
    host.innerHTML=views[ui.page]?views[ui.page]():''; host.hidden=!views[ui.page]; $('viewStudent').dataset.uiPage=ui.page;
    for(const [id,page] of [['questionCard','lesson'],['quizCard','quiz'],['convoCard','talk']]) if(ui.page!==page) $(id).style.display='none';
    $('ddUiStudentCourse').textContent=grade()?.name||'학년 선택';
    if(['records','inbox'].includes(ui.page)) $('ddUiUtilityHead').innerHTML='<h1>'+(ui.page==='records'?'나의 공부 기록':'복습과 배정 문제')+'</h1>'+button('학생 홈','home');
    updateInbox(); syncQuestionChrome();
  }
  function updateInbox() { if($('ddUiInboxEmpty')) $('ddUiInboxEmpty').hidden=!!($('assignHost').textContent.trim()||$('reviewHost').textContent.trim()); }
  function applyInputMode() {
    $('manualFallback').style.display='block'; $('showManualBtn').hidden=true;
    const typing=ui.input==='text'||!SpeechRecognitionCtor;
    $('questionCard').dataset.input=typing?'text':'voice'; state.manualMode=typing; $('manualText').style.display=typing?'block':'none';
    $('ddUiVoiceMode').setAttribute('aria-pressed',String(!typing)); $('ddUiTextMode').setAttribute('aria-pressed',String(typing));
    $('ddUiVoiceMode').disabled=!SpeechRecognitionCtor;
  }
  function decorateFeedback(advance) {
    const wrap=$('fbArea').querySelector('.fb-wrap'); if(!wrap) return;
    const detail=node('ddUiFeedbackDetails','details','dd-ui-details'); detail.innerHTML='<summary>자세한 피드백과 채점 질문</summary>';
    [...wrap.querySelectorAll(':scope > .fb-block.hint,:scope > .fb-block.misc,:scope > .fb-appeal')].forEach(el=>detail.appendChild(el)); wrap.appendChild(detail);
    if(state._roundSaw&&state._roundItem) {   // [v86.2 ⑧] 개념 보고 한 답: 오늘은 연습
      const badge=wrap.querySelector('.pass-badge'); if(badge) badge.textContent='개념을 보고 설명했어요. 내일 혼자 한 번 더 설명하면 통과예요.';
      const note=wrap.querySelector('.review-note'); if(note) note.hidden=true;
      if($('nextUnitBtn')) $('nextUnitBtn').textContent=state._roundItem.past?'다시 보기 목록으로 →':'다음 질문으로 →';
    }
    else if(state._roundItem&&state._roundItem.past) {   // [v86.0 ⑧] 다시 보기: 지금 회차 진도와 섞지 않는다
      const badge=wrap.querySelector('.pass-badge'); if(badge) badge.textContent='다시 답했어요.';
      const note=wrap.querySelector('.review-note'); if(note) note.hidden=true;
      if($('nextUnitBtn')) $('nextUnitBtn').textContent='다시 보기 목록으로 →';
    }
    else if(advance&&ui.level!=='blank') {
      const pending=remaining().filter(q=>q.q!==state.questions[state.qIndex]), badge=wrap.querySelector('.pass-badge');
      if(badge) badge.textContent=pending.length?'이 질문을 통과했어요. 남은 질문 '+pending.length+'개':'이 개념의 설명을 모두 통과했어요.';
      const note=wrap.querySelector('.review-note'); if(note) note.hidden=true;
      if($('nextUnitBtn')) $('nextUnitBtn').textContent=pending.length?'다음 질문으로 →':'기본문제로 확인 →';
    }
    if($('skipQBtn')) $('skipQBtn').textContent='다른 질문 고르기';
  }
  function setupStudent() {
    const root=$('viewStudent'), main=root.querySelector('.main');
    const course=node('ddUiStudentCourse','button','dd-ui-course'); course.dataset.ddUi='grades';
    const h=document.createElement('button'); h.className='dd-ui-text'; h.textContent='학생 홈'; h.dataset.ddUi='home';
    root.querySelector('.tb-right').prepend(h,course);
    const host=node('ddUiStudentMain'); main.prepend(host);
    const utilities=node('ddUiUtilities'), head=node('ddUiUtilityHead','div','dd-ui-page-head'); utilities.appendChild(head);
    const records=node('ddUiRecords'), inbox=node('ddUiInbox'); records.appendChild($('myHistoryHost')); inbox.append($('assignHost'),$('reviewHost'));
    const empty=node('ddUiInboxEmpty','p','dd-ui-empty'); empty.textContent='지금 확인할 복습이나 배정 문제가 없어요.'; inbox.appendChild(empty);
    utilities.append(records,inbox); host.after(utilities);
    const settings=node('ddUiSettings','details','dd-ui-details'); settings.innerHTML='<summary>학습 설정</summary><p class="dd-ui-caption">설명 수준과 제한 시간을 조절해요.</p>';
    for(const id of ['levelSeg','paceSeg','timerNote']) settings.appendChild($(id)); utilities.appendChild(settings);
    $('setupCard').classList.add('dd-ui-legacy-picker');
    const lesson=node('ddUiLessonHead','div','dd-ui-lesson-head');
    lesson.innerHTML=button('‹ 질문 선택','lesson-back','dd-ui-text','id="ddUiLessonBack"')+'<div><strong id="ddUiLessonMeta"></strong><progress id="ddUiLessonProgress" max="1" value="0"></progress></div>'+button('학생 홈','home','dd-ui-text');
    main.insertBefore(lesson,$('questionCard'));
    const modes=node('ddUiInputModes','div','dd-ui-tabs');
    modes.innerHTML=button('말로 설명','voice','','id="ddUiVoiceMode"')+button('글로 설명','text','','id="ddUiTextMode"');
    $('questionCard').insertBefore(modes,$('questionCard').querySelector('.rec-zone'));
    const emphasis=node('ddUiEmphasisDetails','details','dd-ui-details'); emphasis.innerHTML='<summary>설명할 때 참고하기</summary>';
    $('ddEmphasis').before(emphasis); emphasis.appendChild($('ddEmphasis'));
    const help=node('ddUiLessonTools','div','dd-ui-lesson-tools'); help.innerHTML=button('개념 다시 보기','help','dd-ui-text'); $('qList').after(help);
    $('submitBtn').textContent='설명 마치기';
    // Existing speech-error handlers invoke this button programmatically.
    // Keep the visible mode in sync so the fallback textarea is never CSS-hidden.
    $('showManualBtn').addEventListener('click',()=>{ui.input='text';applyInputMode();});
    $('manualText').addEventListener('focus',()=>{if(ui.page==='lesson'&&!ui.busy&&state.manualMode)startSpeakTimer();});
    root.addEventListener('click',e=>{
      if(e.target.closest('#skipQBtn')) { e.stopImmediatePropagation(); if(!ui.busy) { $('backBtn').click(); stage('questions'); } }
      else if(e.target.closest('#nextUnitBtn') && state._roundItem && state._roundItem.past) { e.stopImmediatePropagation(); if(!ui.busy) { $('backBtn').click(); ui.rview='past'; stage('questions'); } }
    },true);
    $('submitBtn').addEventListener('click',()=>{
      const text=state.manualMode?$('manualText').value:state.transcript; if((text||'').trim().length>=3) {stopRecognitionIfActive();lock(true);}
    },true);
    new MutationObserver(()=>{if($('fbArea').querySelector('.error-box'))lock(false);}).observe($('fbArea'),{childList:true,subtree:true});
    new MutationObserver(()=>{if(ui.page==='talk')lock(!!$('cvTyping'));}).observe($('cvChat'),{childList:true,subtree:true});
    for(const id of ['assignHost','reviewHost']) new MutationObserver(updateInbox).observe($(id),{childList:true,subtree:true});
  }
  function teacherUrl(menu) { const u=new URL(location.href); u.search=''; u.hash=''; u.searchParams.set('teacherMenu',menu); return u.href; }
  // [v78.8] 예전엔 메뉴마다 target="_blank" 로 새 탭을 열었다. 교사 로그인은 탭 안에만
  //   있는 값이라 새 탭에는 세션이 없고, 그래서 메뉴를 바꿀 때마다 PIN을 다시 물었다.
  //   → 같은 탭에서 연다. 돌아올 때는 상단 '전체 메뉴'를 쓴다.
  //   주소(?teacherMenu=)는 그대로 살려 둬서, 즐겨찾기나 Ctrl+클릭으로 새 탭을 열 수도 있다
  //   (그 경우엔 새 창이므로 PIN을 묻는 게 맞다).
  function teacherOverview() {
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">선생님 전체 메뉴</p><h1>무엇을 할까요?</h1><p class="dd-ui-caption">메뉴를 고르면 바로 열려요. 위쪽 ‘전체 메뉴’로 언제든 돌아옵니다.</p></div></div><div class="dd-ui-menu-columns">'+
      ['학생과 학습','문항과 수업','앱 설정'].map((group,i)=>'<section class="dd-ui-menu-group group-'+i+'"><h2>'+group+'</h2>'+menus.filter(m=>m[1]===group&&(!['baseline','admin','qreview'].includes(m[0])||isOwner())).map(m=>'<a class="dd-ui-menu-card" href="'+esc(teacherUrl(m[0]))+'" data-dd-ui="teacher-menu" data-menu="'+m[0]+'"><span class="dd-ui-menu-icon">'+m[4]+'</span><div><strong>'+m[2]+'</strong><small>'+m[3]+'</small></div><span aria-hidden="true">›</span></a>').join('')+'</section>').join('')+'</div>';
  }
  function showTeacher(menu) {
    if(!session.teacher) { showView('viewTeacherAuth'); return; }
    if(['baseline','admin','qreview'].includes(menu)&&!isOwner()) menu=null;
    ui.menu=menus.some(m=>m[0]===menu)?menu:null; $('viewTeacher').dataset.uiMenu=ui.menu||'home';
    try{ sessionStorage.setItem(TM_KEY, ui.menu||''); }catch(e){}   // [v85.4] 새로고침 뒤 같은 메뉴로
    $('ddUiTeacherHome').innerHTML=teacherOverview(); const m=menus.find(m=>m[0]===ui.menu);
    $('ddUiTeacherHeading').innerHTML=m?'<div><p class="dd-ui-caption">'+m[1]+'</p><h1>'+m[2]+'</h1></div>':'';
    for(const id of ['dashTab','manageTab','bankTab','cecardsTab','ddUiTeacherStudents','ddUiTeacherAi','ddUiTeacherAdmin','ddUiTeacherBaseline','qreviewTab']) { const el=$(id); if(el) el.style.display='none'; }
    $('ddUiTeacherHome').hidden=!!ui.menu; $('ddUiTeacherHeading').hidden=!ui.menu;
    const map={dashboard:'dashTab',students:'ddUiTeacherStudents',reports:'ddUiTeacherStudents',bank:'bankTab',cards:'cecardsTab',baseline:'ddUiTeacherBaseline',ai:'ddUiTeacherAi',admin:'ddUiTeacherAdmin',qreview:'qreviewTab'};
    if(map[ui.menu]&&$(map[ui.menu])) $(map[ui.menu]).style.display='block';
    if(ui.menu==='qreview'&&typeof window.qrRender==='function') window.qrRender();   // [v82.9] 질문 고르기
    if(ui.menu==='bank') initBankTab();
    if(['cards','baseline'].includes(ui.menu)) ceInit();
    if(ui.menu==='ai') refreshKeyStatus();
    if(['students','reports'].includes(ui.menu)) {
      $('ddUiStudentRegister').hidden=true; $('ddUiTeacherList').hidden=false; $('ddUiTeacherStudentTabs').hidden=ui.menu==='reports';
      $('railSearch').value=''; renderRail(RAIL_CACHE.students,RAIL_CACHE.subs);
    }
    navRecord({v:'t', menu:ui.menu});   // [v81.5]
  }
  function setupTeacher() {
    const root=$('viewTeacher'), main=root.querySelector('.main');
    main.prepend(node('ddUiTeacherHome'),node('ddUiTeacherHeading','div','dd-ui-page-head'));
    $('teacherNav').hidden=true;
    const all=document.createElement('button'); all.className='dd-ui-secondary'; all.textContent='전체 메뉴'; all.dataset.ddUi='teacher-home'; root.querySelector('.tb-right').prepend(all);
    $('teacherAccountBtn').textContent='로그아웃'; $('teacherAccountBtn').setAttribute('role','button'); $('teacherAccountBtn').tabIndex=0;
    $('teacherAccountBtn').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('teacherAccountBtn').click();}});
    const students=node('ddUiTeacherStudents'), tabs=node('ddUiTeacherStudentTabs','div','dd-ui-tabs');
    tabs.innerHTML=button('학생 목록','teacher-list','active')+button('새 학생 등록','teacher-register');
    const list=node('ddUiTeacherList'), register=node('ddUiStudentRegister'); list.appendChild($('teacherRail')); register.appendChild($('regBtn').closest('.card'));
    students.append(tabs,list,register); main.appendChild(students);
    for(const [id,el] of [['ddUiTeacherAi',$('saveKeyBtn').closest('.card')],['ddUiTeacherAdmin',$('ownerPwCard')],['ddUiTeacherBaseline',$('ceFreezeCard')]]) {
      const section=node(id); section.appendChild(el); main.appendChild(section);
    }
    $('railToggleBtn').hidden=true; $('shOverlay').classList.add('dd-ui-student-detail');
  }
  function setupLanding() {
    const intro=node('ddUiWelcome','div','dd-ui-welcome');
    intro.innerHTML=mascot()+'<h1>수학, 내 말로<br>설명하는 즐거움.</h1><p>뚜삐가 들어줄게요.<br>오늘의 개념을 함께 시작해요.</p>';
    $('viewLanding').querySelector('.login-dark').prepend(intro);
    $('loginBtn').textContent='공부하러 가기 →'; $('goTeacherBtn').textContent='선생님이신가요?';
    for(const [id,label] of [['loginName','이름'],['loginPw','비밀번호'],['teacherPin','관리자 비밀번호']]) {
      const lab=document.createElement('label'); lab.htmlFor=id; lab.className='dd-ui-field-label'; lab.textContent=label; $(id).before(lab);
    }
    // [v78.7] 예전엔 'v78.6 · UI 연결본 1'로 글자가 박혀 있어 APP_VERSION을 올려도 화면이 안 바뀌었다.
    //   마스터가 이 배지로 배포 반영을 확인하므로 실제 APP_VERSION을 따라가게 한다.
    const badge=node('ddUiVersion','span','dd-ui-version');
    const ver=(typeof window.APP_VERSION==='string' && window.APP_VERSION)
      || (document.querySelector('div[aria-label^="앱 버전 "]')||{}).textContent || '';
    badge.textContent=ver||'버전 확인 불가';
    document.body.appendChild(badge);
    const note=node('ddUiNotice','div','dd-ui-notice'); note.hidden=true; note.setAttribute('role','status'); note.setAttribute('aria-live','polite'); document.body.appendChild(note);
  }
  // Original inline engine remains byte-identical; only its UI boundaries adapt.
  // [v85.4] 새로고침해도 선생님 로그인·보던 메뉴 유지 (마스터 요청 2026-09-21).
  //   sessionStorage 라서 이 탭 안에서만 살고, 탭·브라우저를 닫으면 사라진다(학원 공용 PC 안전). 나가기·학생 입장 때 지운다.
  const TS_KEY='dd:teacherSession', TM_KEY='dd:teacherMenu';
  function tsSave(){ try{ if(session.teacher) sessionStorage.setItem(TS_KEY, JSON.stringify({role:session.role||'owner'})); }catch(e){} }
  function tsClear(){ try{ sessionStorage.removeItem(TS_KEY); sessionStorage.removeItem(TM_KEY); }catch(e){} }
  function tsLoad(){ try{ return JSON.parse(sessionStorage.getItem(TS_KEY)||'null'); }catch(e){ return null; } }
  function bootDone(){ try{ document.documentElement.classList.remove('dd-boot'); }catch(e){} }   // [v85.6] 첫 화면 감추기 풀기
  showView=function(name) {
    if(name==='viewTeacher'&&!session.teacher) name='viewTeacherAuth';
    if(name==='viewTeacher') tsSave();
    bootDone();
    original.showView(name); document.body.classList.toggle('dd-ui-parent',name==='viewParent');
    if(name==='viewTeacher') showTeacher(ui.menu||teacherRoute);
  };
  tryAutoLogin=async function() {
    const ts=tsLoad();
    if(ts) {   // [v85.4] 이 탭에서 이미 선생님으로 들어와 있었다 → PIN 없이 보던 메뉴로
      session.teacher=true; session.role=ts.role||'owner';
      const chip=$('sessionChip'); if(chip) chip.style.display='flex'; const nm=$('sessionName'); if(nm) nm.textContent='선생님 모드';
      let menu=null; try{ menu=sessionStorage.getItem(TM_KEY)||null; }catch(e){}
      ui.menu=teacherRoute||menu||null;
      showView('viewTeacher');
      try{ refreshKeyStatus(); loadBoard(); startDashAutoRefresh(); }catch(e){}
      return;
    }
    if(teacherRoute) { showView('viewTeacherAuth'); return; }
    try { return await original.tryAutoLogin(); } finally { bootDone(); }   // 자동 입장 실패(학생 없음·오프라인)면 첫 화면을 다시 보여 준다
  };
  enterStudentView=function() {
    tsClear();
    session.teacher=false; session.role=null; ui.level='high'; ui.kind='concept'; lock(false); cpRecords=[];
    original.enterStudentView(); restoreSelection(); restoreLevel(); ui.rview='now'; stage('home');
    if(window.DDR) DDR.load().then(()=>{ if(isStudent()) renderStudent(); }).catch(()=>{});   // [v86.0 ⑧] 학생별 회차
  };
  setLearnStep=function(n) {
    original.setLearnStep(n);
    if(n===1) { restoreLevel(); ui.page=cpCurrentSmall()?'questions':CP.grade?'catalog':'home'; }
    else ui.page=n===3?'quiz':'lesson';
    renderStudent();
  };
  cpRender=function() { renderStudent(); };
  cpSyncLegacy=function() { state.gradeId=CP.grade||null; return original.cpSyncLegacy(); };
  renderCurrentQuestion=function() { if(!state._qType&&['low','high','blank'].includes(state.level))ui.level=state.level;   /* [v82.8] 기본 개념을 그대로 둔다 (v81.3 에서 설명하기로 바꾸던 것 해제) */ syncSelectionFromUnit(); const out=original.renderCurrentQuestion(); syncQuestionChrome();
    if(window.DDR&&DDR.hintMode()==='none') $('qList').querySelectorAll('.hint-btn,.hint-box').forEach(el=>el.remove());   // [v86.2 ⑧] 1회차는 힌트 없음
    return out; };
  resetRecordingUI=function() { const out=original.resetRecordingUI(); applyInputMode(); return out; };
  renderFeedback=function(result,advance,needTeacher) { const out=original.renderFeedback(result,advance,needTeacher); decorateFeedback(advance); return out; };
  saveSubmission=async function(...args) {
    if(state._roundSaw && state._roundLevel && !/c$/.test(state._roundLevel)) state._roundLevel+='c';   // [v86.2 ⑧]
    if(state._roundSaw && state._roundItem && window.DL_LADDER && DL_LADDER.markCool) DL_LADDER.markCool(state._roundItem.q, state._roundItem.id);
    lock(true); try { return await original.saveSubmission(...args); } finally { setTimeout(()=>{lock(false);syncQuestionChrome();},0); } };
  onSpeakTimeout=async function() { lock(true); try { return await original.onSpeakTimeout(); } catch(e) { lock(false); throw e; } };
  cpUnitRemaining=function() { const list=cpUnitQuestionItems(); return list?list.filter(x=>cpStatusForQuestion(state.gradeId,x.q,x.id)!=='pass').length:0; };
  startQuiz=async function() {
    if(ui.busy||!isStudent()||!cpCurrentSmall()) return;
    cpSyncLegacy(); if(!state.unitId) return;
    const pending=ui.level==='blank'?[]:remaining();
    if(!state._quizRedo&&!getUnitQuizDone()&&pending.length) { await startItem(pending[0]); return; }
    lock(true); try { return await original.startQuiz(); } finally { lock(false); }
  };
  goToNextQuestion=function() { if(ui.busy)return; if(state.questions.length===1&&ui.level!=='blank'){startQuiz();return;} return original.goToNextQuestion(); };
  renderRail=function(students,subs) { const out=original.renderRail(students,subs); const h=$('teacherRail').querySelector('h3'); if(h)h.textContent=ui.menu==='reports'?'리포트를 볼 학생 선택':'학생 목록'; return out; };
  openStudentHistory=function(student,subs) { const out=original.openStudentHistory(student,subs); if(ui.menu==='reports')openParentManage(); return out; };
  doLogout=function() { tsClear(); stopRecognitionIfActive(); stopTalkMic(); Timer.hide(); stopDashAutoRefresh(); session.teacher=false; session.role=null; lock(false); return original.doLogout(); };
  // The talk save hook expects window.session; always reflect the real lexical session.
  if(!Object.getOwnPropertyDescriptor(window,'session')) Object.defineProperty(window,'session',{configurable:true,get:()=>session});
  const openTalk=window.cvOpenType;
  window.cvOpenType=function(id) { if(!isStudent()||ui.busy)return; if(!academyOk())return; openTalk(id); if($('convoCard').style.display!=='none')stage('talk'); };
  document.addEventListener('click',async e=>{
    const el=e.target.closest('[data-dd-ui]'); if(!el)return;
    // [v78.8] 선생님 메뉴는 <a href> 라서 그냥 두면 페이지가 통째로 새로 열리고
    //   교사 로그인이 풀려 PIN을 다시 묻는다. 같은 탭에서 처리하도록 기본 동작을 막는다.
    //   단 Ctrl/Cmd/Shift/가운데 클릭은 "새 탭으로 열겠다"는 뜻이므로 브라우저에 맡긴다.
    if(el.tagName==='A' && !(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button===1)) e.preventDefault();
    if(ui.busy&&$('viewStudent').classList.contains('active')) { notice('평가와 기록 저장을 마친 뒤 이동할 수 있어요.'); return; }
    switch(el.dataset.ddUi) {
      case 'home': if($('convoCard').style.display!=='none')$('cvBack').click(); stage('home'); cpLoadRecords(); break;
      case 'grades': stage('grades'); break;
      case 'band': ui.band=el.dataset.band; renderStudent(); break;
      case 'grade': restoreLevel(); cpChooseGrade(el.dataset.grade); CP.middle=null; ui.band=cpBandOf(CP.grade); remember(); stage('catalog'); break;
      case 'catalog': stage(CP.grade?'catalog':'grades'); break;
      case 'bigs': CP.big=null; CP.small=null; CP.type=null; stage('catalog'); break;
      case 'big': CP.big=Number(el.dataset.big); CP.middle=0; CP.small=null; CP.type=null; stage('catalog'); break;
      case 'small': CP.middle=Number(el.dataset.middle); CP.small=Number(el.dataset.small); CP.type=0; CP.qIndex=null; restoreLevel(); cpSyncLegacy(); ui.kind='concept'; ui.rview='now'; remember(); stage('questions'); break;
      case 'kind': ui.kind=el.dataset.kind; renderStudent(); break;
      case 'rview': ui.rview=el.dataset.rview==='past'?'past':'now'; renderStudent(); break;   // [v86.0 ⑧]
      case 'question': await startItem(ui.questions[Number(el.dataset.index)]); break;
      case 'continue': if(!cpCurrentSmall())stage(CP.grade?'catalog':'grades'); else {const left=remaining(); if(left.length)await startItem(left[0]);else if(academyOk()) await startQuiz();} break;
      case 'quiz': if(academyOk()) await startQuiz(); break;
      case 'lesson-back': if(ui.page==='talk')$('cvBack').click(); else $('backBtn').click(); stage(cpCurrentSmall()?'questions':'catalog'); break;
      case 'help':
        if(!ddHasCard(ddCurrentCard())) { notice('이 개념의 학습 자료를 준비 중이에요.'); break; }
        // [v86.2 ⑧] 회차 질문을 푸는 중에 개념을 보면: 이번 답은 '개념 보고 답함'으로 남고, 통과는 다음 날 혼자 설명할 때
        if(ui.page==='lesson' && state._roundItem && !state._roundSaw) { state._roundSaw=true; notice('개념을 보고 답하면 오늘은 연습이에요. 내일 혼자 한 번 더 설명하면 통과예요.'); }
        ddOpenLearn(ddCurrentCard()); break;
      case 'voice': stopRecognitionIfActive(); ui.input='voice'; applyInputMode(); break;
      case 'text': stopRecognitionIfActive(); ui.input='text'; $('showManualBtn').click(); applyInputMode(); $('manualText').focus(); break;
      case 'talk': if(!academyOk()) break; stopRecognitionIfActive(); Timer.hide(); $('cvEntryBtn').click(); stage('talk'); break;
      case 'records': renderMyHistory(); stage('records'); break;
      case 'inbox': loadAssignments(); loadReviewCards(); stage('inbox'); break;
      case 'teacher-home': showTeacher(null); break;
      case 'teacher-menu': showTeacher(el.dataset.menu); window.scrollTo(0,0); break;
      case 'teacher-list': case 'teacher-register': {
        const isList=el.dataset.ddUi==='teacher-list'; $('ddUiTeacherList').hidden=!isList; $('ddUiStudentRegister').hidden=isList;
        $('ddUiTeacherStudentTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===el)); break;
      }
    }
  });
  // [v86.1 ⑧] 7일 복습 카드: 회차 학년이면 옛 질문(빠진 질문일 수 있음) 대신 그 소단원 질문 목록 — 2회차부터는 '다시 보기'로
  document.addEventListener('click',e=>{
    const c=e.target.closest('#reviewHost .review-card'); if(!c||!window.DDR||!DDR.on(c.dataset.course)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if(ui.busy) return;
    state.gradeId=c.dataset.course; state.unitId=Number(c.dataset.unit); syncSelectionFromUnit();
    if(CP.small==null) { stage('catalog'); return; }
    restoreLevel(); ui.rview=DDR.round(CP.grade)>1?'past':'now'; stage('questions');
  },true);
  document.addEventListener('change',e=>{if(e.target.id==='ddUiLevel'){ui.level=e.target.value;restoreLevel();cpSyncLegacy();renderStudent();}});
  $('levelSeg').addEventListener('click',e=>{const el=e.target.closest('[data-level]');if(el){ui.level=el.dataset.level;restoreLevel();renderStudent();}});
  document.addEventListener('click',e=>{
    if(ui.busy&&e.target.closest('#studentLogoutBtn,#backBtn,#ddUiLessonBack,#cvBack,#cvToMenu,#cvSend,#cvMic,#recBtn,#showManualBtn')){
      e.preventDefault();e.stopImmediatePropagation();notice('평가와 기록 저장을 마친 뒤 이동할 수 있어요.');
    }
  },true);
  $('cvAnswer').addEventListener('keydown',e=>{if(ui.busy&&e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();}},true);
  $('logoutBtn').addEventListener('click',()=>{tsClear();lock(false);stopTalkMic();stopDashAutoRefresh();Timer.hide();});
  $('studentLogoutBtn').addEventListener('click',()=>{stopRecognitionIfActive();stopTalkMic();Timer.hide();lock(false);document.body.classList.remove('step-focus');});
  window.addEventListener('pagehide',()=>{stopRecognitionIfActive();stopTalkMic();stopDashAutoRefresh();Timer.hide();});
  setupLanding(); setupStudent(); setupTeacher(); document.body.classList.add('dd-ui'); renderStudent();
  if(teacherRoute && !tsLoad())showView('viewTeacherAuth');   // [v85.6] 이 탭에 선생님 로그인이 있으면 PIN 화면을 잠깐 띄우지 않는다
  window.DD_UI={version:'78.6-ui.1',menus:menus.map(m=>({id:m[0],name:m[2]})),get page(){return ui.page},get teacherMenu(){return ui.menu},questionItems,remaining,startItem,showTeacher,render:renderStudent,get shown(){return ui.questions}};
})();
