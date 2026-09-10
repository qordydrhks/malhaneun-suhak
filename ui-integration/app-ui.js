/* 말하는 수학 v78.6: existing DOM, curriculum, grading and storage integration.
 * No copied curriculum, demo records or replacement authentication.
 * Classic-script globals below are intentional contracts with dodream.html.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ui = {page:'home', level:'low', kind:'concept', band:'e', input:'voice', busy:false, menu:null, questions:[]};
  const original = {showView, enterStudentView, setLearnStep, cpSyncLegacy, renderCurrentQuestion, resetRecordingUI, renderFeedback, saveSubmission, startQuiz, goToNextQuestion, tryAutoLogin, renderRail, openStudentHistory, doLogout, onSpeakTimeout};
  const menus = [
    ['dashboard','학생과 학습','학습 현황','오늘의 학습 · 통과 · 도움 필요','▥'],
    ['students','학생과 학습','학생 관리','학생 등록 · 정보 수정 · 학습 이력','◎'],
    ['reports','학생과 학습','학부모 리포트','학생별 리포트 · 코멘트 · 인쇄','▤'],
    ['bank','문항과 수업','문제은행','문제 찾기 · 직접 추가 · 학생 배정','▣'],
    ['cards','문항과 수업','개념·질문 편집','개념 설명 · 말하기 질문 · 기본문제','✎'],
    ['baseline','문항과 수업','기준으로 굳히기','수정한 내용을 공통 기준으로 저장','▱'],
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
  function stopTalkMic() { if($('cvMic').classList.contains('rec')) $('cvMic').click(); }
  function stage(page) {
    const focus = ['lesson','quiz','talk'].includes(page);
    if(!focus) { stopRecognitionIfActive(); Timer.hide(); restoreLevel(); }
    if(page !== 'talk') stopTalkMic();
    document.body.classList.toggle('step-focus',focus);
    ui.page=page; renderStudent(); window.scrollTo(0,0);
  }
  function restoreLevel() { state.level=ui.level; state._qType=null; state._baseLevel=ui.level; state._directSelectedQuestion=''; state._pickerQIndex=null; }
  function lock(busy) {
    ui.busy=busy; $('viewStudent').classList.toggle('dd-ui-busy',busy);
    for(const id of ['backBtn','nextUnitBtn','nextQBtn','retryBtn','skipQBtn','ddUiLessonBack']) if($(id)) $(id).disabled=busy;
  }
  function questionItems() {
    const big=cpCurrentBig(), sm=cpCurrentSmall(), list=[];
    if(!big || !sm) return list;
    (sm.types||[]).forEach((type,ti) => {
      const t=ceApply(CP.grade,big.name,sm.name,type,null).type;
      if(ui.level==='blank') list.push({q:'빈칸을 채우며 이 개념을 떠올려요.',kind:'concept',ti,index:0,blank:true});
      else (ui.level==='high'?t.high||[]:t.low||[]).forEach((q,index)=>{if(q)list.push({q,kind:'concept',ti,index});});
    });
    if(ui.level!=='blank') ((ddGetQSet(CP.grade,big.name,sm.name)||{}).questions||[]).forEach((q,index)=>{
      if(q.q) list.push({q:q.q,kind:'typed',ti:0,index,type:q.type});
    });
    return list;
  }
  const status = item => item.blank ? 'none' : cpStatusForQuestion(CP.grade,item.q);
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
    CP.type=item.ti; CP.qIndex=item.index; cpSyncLegacy();
    if(!currentUnits().some(u=>u.id===state.unitId)) { notice('질문과 단원 연결을 확인하지 못했어요. 다른 개념을 골라 주세요.'); return false; }
    state._baseLevel=ui.level; state._qType=item.type||null; state.level=item.type?(QTYPE_LEVEL[item.type]||'high'):ui.level;
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
  function catalog() {
    const m=model(); if(!m) return gradePicker();
    if(CP.big===null) return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(m.name)+'</p><h1>공부할 단원을 골라요.</h1></div>'+button('학년 바꾸기','grades','dd-ui-text')+'</div><div class="dd-ui-choice-list">'+m.bigUnits.map((x,i)=>button('<span class="dd-ui-number">'+(i+1)+'</span><strong>'+esc(x.name)+'</strong><span>›</span>','big','dd-ui-choice','data-big="'+i+'"')).join('')+'</div>';
    let number=0;
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(m.name)+'</p><h1>'+esc(m.bigUnits[CP.big].name)+'</h1></div>'+button('대단원 목록','bigs','dd-ui-text')+'</div><div class="dd-ui-choice-list">'+
      cpBigMiddles(m.bigUnits[CP.big]).map((mid,mi)=>(mid.smalls||[]).map((sm,si)=>button('<span class="dd-ui-number">'+(++number)+'</span><div><strong>'+esc(smallTitle(sm))+'</strong>'+(mid.name?'<small>'+esc(mid.name)+'</small>':'')+'</div><span>›</span>','small','dd-ui-choice','data-middle="'+mi+'" data-small="'+si+'"')).join('')).join('')+'</div>';
  }
  function questionPicker() {
    const sm=cpCurrentSmall(); if(!sm) return catalog();
    const items=questionItems(); ui.questions=items;
    const list=items.map((q,i)=>({...q,i})).filter(q=>q.kind===ui.kind), left=remaining().length;
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">'+esc(cpCurrentBig().name)+'</p><h1>'+esc(smallTitle(sm))+'</h1></div>'+button('개념 목록','catalog','dd-ui-text')+'</div>'+
      '<div class="dd-ui-section-head"><h2>질문을 골라 설명해요.</h2><label>설명 수준 <select id="ddUiLevel">'+[['low','기본 개념'],['high','깊이 설명하기'],['blank','채워보기']].map(([v,t])=>'<option value="'+v+'" '+(v===ui.level?'selected':'')+'>'+t+'</option>').join('')+'</select></label></div>'+
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
    if(advance&&ui.level!=='blank') {
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
    },true);
    $('submitBtn').addEventListener('click',()=>{
      const text=state.manualMode?$('manualText').value:state.transcript; if((text||'').trim().length>=3) {stopRecognitionIfActive();lock(true);}
    },true);
    new MutationObserver(()=>{if($('fbArea').querySelector('.error-box'))lock(false);}).observe($('fbArea'),{childList:true,subtree:true});
    new MutationObserver(()=>{if(ui.page==='talk')lock(!!$('cvTyping'));}).observe($('cvChat'),{childList:true,subtree:true});
    for(const id of ['assignHost','reviewHost']) new MutationObserver(updateInbox).observe($(id),{childList:true,subtree:true});
  }
  function teacherUrl(menu) { const u=new URL(location.href); u.search=''; u.hash=''; u.searchParams.set('teacherMenu',menu); return u.href; }
  function teacherOverview() {
    return '<div class="dd-ui-page-head"><div><p class="dd-ui-caption">선생님 전체 메뉴</p><h1>무엇을 할까요?</h1><p class="dd-ui-caption">필요한 메뉴를 선택하면 새 탭에서 열려요.</p></div></div><div class="dd-ui-menu-columns">'+
      ['학생과 학습','문항과 수업','앱 설정'].map((group,i)=>'<section class="dd-ui-menu-group group-'+i+'"><h2>'+group+'</h2>'+menus.filter(m=>m[1]===group&&(!['baseline','admin'].includes(m[0])||isOwner())).map(m=>'<a class="dd-ui-menu-card" href="'+esc(teacherUrl(m[0]))+'" target="_blank" rel="noopener noreferrer"><span class="dd-ui-menu-icon">'+m[4]+'</span><div><strong>'+m[2]+'</strong><small>'+m[3]+'</small></div><span aria-hidden="true">↗</span><span class="dd-ui-sr-only">새 탭에서 열기</span></a>').join('')+'</section>').join('')+'</div>';
  }
  function showTeacher(menu) {
    if(!session.teacher) { showView('viewTeacherAuth'); return; }
    if(['baseline','admin'].includes(menu)&&!isOwner()) menu=null;
    ui.menu=menus.some(m=>m[0]===menu)?menu:null; $('viewTeacher').dataset.uiMenu=ui.menu||'home';
    $('ddUiTeacherHome').innerHTML=teacherOverview(); const m=menus.find(m=>m[0]===ui.menu);
    $('ddUiTeacherHeading').innerHTML=m?'<div><p class="dd-ui-caption">'+m[1]+'</p><h1>'+m[2]+'</h1></div>':'';
    for(const id of ['dashTab','manageTab','bankTab','cecardsTab','ddUiTeacherStudents','ddUiTeacherAi','ddUiTeacherAdmin','ddUiTeacherBaseline']) $(id).style.display='none';
    $('ddUiTeacherHome').hidden=!!ui.menu; $('ddUiTeacherHeading').hidden=!ui.menu;
    const map={dashboard:'dashTab',students:'ddUiTeacherStudents',reports:'ddUiTeacherStudents',bank:'bankTab',cards:'cecardsTab',baseline:'ddUiTeacherBaseline',ai:'ddUiTeacherAi',admin:'ddUiTeacherAdmin'};
    if(map[ui.menu]) $(map[ui.menu]).style.display='block';
    if(ui.menu==='bank') initBankTab();
    if(['cards','baseline'].includes(ui.menu)) ceInit();
    if(ui.menu==='ai') refreshKeyStatus();
    if(['students','reports'].includes(ui.menu)) {
      $('ddUiStudentRegister').hidden=true; $('ddUiTeacherList').hidden=false; $('ddUiTeacherStudentTabs').hidden=ui.menu==='reports';
      $('railSearch').value=''; renderRail(RAIL_CACHE.students,RAIL_CACHE.subs);
    }
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
  showView=function(name) {
    if(name==='viewTeacher'&&!session.teacher) name='viewTeacherAuth';
    original.showView(name); document.body.classList.toggle('dd-ui-parent',name==='viewParent');
    if(name==='viewTeacher') showTeacher(ui.menu||teacherRoute);
  };
  tryAutoLogin=async function() { if(teacherRoute) { showView('viewTeacherAuth'); return; } return original.tryAutoLogin(); };
  enterStudentView=function() {
    session.teacher=false; session.role=null; ui.level='low'; ui.kind='concept'; lock(false); cpRecords=[];
    original.enterStudentView(); restoreSelection(); restoreLevel(); stage('home');
  };
  setLearnStep=function(n) {
    original.setLearnStep(n);
    if(n===1) { restoreLevel(); ui.page=cpCurrentSmall()?'questions':CP.grade?'catalog':'home'; }
    else ui.page=n===3?'quiz':'lesson';
    renderStudent();
  };
  cpRender=function() { renderStudent(); };
  cpSyncLegacy=function() { state.gradeId=CP.grade||null; return original.cpSyncLegacy(); };
  renderCurrentQuestion=function() { if(!state._qType&&['low','high','blank'].includes(state.level))ui.level=state.level; syncSelectionFromUnit(); const out=original.renderCurrentQuestion(); syncQuestionChrome(); return out; };
  resetRecordingUI=function() { const out=original.resetRecordingUI(); applyInputMode(); return out; };
  renderFeedback=function(result,advance,needTeacher) { const out=original.renderFeedback(result,advance,needTeacher); decorateFeedback(advance); return out; };
  saveSubmission=async function(...args) { lock(true); try { return await original.saveSubmission(...args); } finally { setTimeout(()=>{lock(false);syncQuestionChrome();},0); } };
  onSpeakTimeout=async function() { lock(true); try { return await original.onSpeakTimeout(); } catch(e) { lock(false); throw e; } };
  cpUnitRemaining=function() { const list=cpUnitQuestionList(); return list?list.filter(q=>cpStatusForQuestion(state.gradeId,q)!=='pass').length:0; };
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
  doLogout=function() { stopRecognitionIfActive(); stopTalkMic(); Timer.hide(); stopDashAutoRefresh(); session.teacher=false; session.role=null; lock(false); return original.doLogout(); };
  // The talk save hook expects window.session; always reflect the real lexical session.
  if(!Object.getOwnPropertyDescriptor(window,'session')) Object.defineProperty(window,'session',{configurable:true,get:()=>session});
  const openTalk=window.cvOpenType;
  window.cvOpenType=function(id) { if(!isStudent()||ui.busy)return; openTalk(id); if($('convoCard').style.display!=='none')stage('talk'); };
  document.addEventListener('click',async e=>{
    const el=e.target.closest('[data-dd-ui]'); if(!el)return;
    if(ui.busy&&$('viewStudent').classList.contains('active')) { notice('평가와 기록 저장을 마친 뒤 이동할 수 있어요.'); return; }
    switch(el.dataset.ddUi) {
      case 'home': if($('convoCard').style.display!=='none')$('cvBack').click(); stage('home'); cpLoadRecords(); break;
      case 'grades': stage('grades'); break;
      case 'band': ui.band=el.dataset.band; renderStudent(); break;
      case 'grade': restoreLevel(); cpChooseGrade(el.dataset.grade); CP.middle=null; ui.band=cpBandOf(CP.grade); remember(); stage('catalog'); break;
      case 'catalog': stage(CP.grade?'catalog':'grades'); break;
      case 'bigs': CP.big=null; CP.small=null; CP.type=null; stage('catalog'); break;
      case 'big': CP.big=Number(el.dataset.big); CP.middle=0; CP.small=null; CP.type=null; stage('catalog'); break;
      case 'small': CP.middle=Number(el.dataset.middle); CP.small=Number(el.dataset.small); CP.type=0; CP.qIndex=null; restoreLevel(); cpSyncLegacy(); ui.kind='concept'; remember(); stage('questions'); break;
      case 'kind': ui.kind=el.dataset.kind; renderStudent(); break;
      case 'question': await startItem(ui.questions[Number(el.dataset.index)]); break;
      case 'continue': if(!cpCurrentSmall())stage(CP.grade?'catalog':'grades'); else {const left=remaining(); if(left.length)await startItem(left[0]);else await startQuiz();} break;
      case 'quiz': await startQuiz(); break;
      case 'lesson-back': if(ui.page==='talk')$('cvBack').click(); else $('backBtn').click(); stage(cpCurrentSmall()?'questions':'catalog'); break;
      case 'help': if(ddHasCard(ddCurrentCard()))ddOpenLearn(ddCurrentCard());else notice('이 개념의 학습 자료를 준비 중이에요.'); break;
      case 'voice': stopRecognitionIfActive(); ui.input='voice'; applyInputMode(); break;
      case 'text': stopRecognitionIfActive(); ui.input='text'; $('showManualBtn').click(); applyInputMode(); $('manualText').focus(); break;
      case 'talk': stopRecognitionIfActive(); Timer.hide(); $('cvEntryBtn').click(); stage('talk'); break;
      case 'records': renderMyHistory(); stage('records'); break;
      case 'inbox': loadAssignments(); loadReviewCards(); stage('inbox'); break;
      case 'teacher-home': showTeacher(null); break;
      case 'teacher-list': case 'teacher-register': {
        const isList=el.dataset.ddUi==='teacher-list'; $('ddUiTeacherList').hidden=!isList; $('ddUiStudentRegister').hidden=isList;
        $('ddUiTeacherStudentTabs').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===el)); break;
      }
    }
  });
  document.addEventListener('change',e=>{if(e.target.id==='ddUiLevel'){ui.level=e.target.value;restoreLevel();cpSyncLegacy();renderStudent();}});
  $('levelSeg').addEventListener('click',e=>{const el=e.target.closest('[data-level]');if(el){ui.level=el.dataset.level;restoreLevel();renderStudent();}});
  document.addEventListener('click',e=>{
    if(ui.busy&&e.target.closest('#studentLogoutBtn,#backBtn,#ddUiLessonBack,#cvBack,#cvToMenu,#cvSend,#cvMic,#recBtn,#showManualBtn')){
      e.preventDefault();e.stopImmediatePropagation();notice('평가와 기록 저장을 마친 뒤 이동할 수 있어요.');
    }
  },true);
  $('cvAnswer').addEventListener('keydown',e=>{if(ui.busy&&e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();}},true);
  $('logoutBtn').addEventListener('click',()=>{lock(false);stopTalkMic();stopDashAutoRefresh();Timer.hide();});
  $('studentLogoutBtn').addEventListener('click',()=>{stopRecognitionIfActive();stopTalkMic();Timer.hide();lock(false);document.body.classList.remove('step-focus');});
  window.addEventListener('pagehide',()=>{stopRecognitionIfActive();stopTalkMic();stopDashAutoRefresh();Timer.hide();});
  setupLanding(); setupStudent(); setupTeacher(); document.body.classList.add('dd-ui'); renderStudent();
  if(teacherRoute)showView('viewTeacherAuth');
  window.DD_UI={version:'78.6-ui.1',menus:menus.map(m=>({id:m[0],name:m[2]})),get page(){return ui.page},get teacherMenu(){return ui.menu},questionItems,remaining,startItem,showTeacher};
})();
