// Regression tests run the real v78.6 engine. AI transport is fixture-only.
// Nothing is sent to a production database or an AI service.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),cp=require('node:child_process');
const {boot,tick,root,html}=require('./smoke.cjs');
const results=[], plain=x=>JSON.parse(JSON.stringify(x));
async function check(name,fn){await fn();results.push({name,status:'passed'});console.log('PASS '+name);}
async function teacher(a,pin='0000'){a.$('teacherPin').value=pin;a.$('teacherPinBtn').click();await tick(90);}
async function login(a,name='UI Test A',pw='test1234'){a.$('loginName').value=name;a.$('loginPw').value=pw;a.$('loginBtn').click();await tick(90);}
async function choose(a,grade='e3-1'){
  await a.action('grades');await a.action('band','[data-band="'+grade[0]+'"]');
  await a.action('grade','[data-grade="'+grade+'"]');await a.action('big','[data-big="0"]');await a.action('small','[data-small="0"]');
}
async function submit(a,score,delay=0){
  a.w.__testScore=score;a.w.__testDelay=delay;
  a.ev("callClaude=async()=>{if(window.__testDelay)await new Promise(r=>setTimeout(r,window.__testDelay));return {content:[{type:'text',text:JSON.stringify({score:window.__testScore,hit_count:0,praise:'설명했어요.',hint:'다시 떠올려요.',retry_point:'이유를 덧붙여요.',misconception:''})}]}}");
  a.$('manualText').value='설명해요';a.$('manualText').dispatchEvent(new a.w.Event('input',{bubbles:true}));a.$('submitBtn').click();await tick(delay+60);
}
async function main(){
  const a=await boot();let baselineHash,gradeStats=[];
  try{
    await check('Original app and integrated UI boot without runtime errors',async()=>{assert.deepEqual(a.errors,[]);assert.ok(a.w.DD_UI);});
    await check('All four original inline scripts and curriculum remain byte-identical',async()=>{
      const base=process.env.ORIGINAL_HTML?fs.readFileSync(process.env.ORIGINAL_HTML,'utf8'):cp.execFileSync('git',['show','ec0e179776cc7b62b8f5b0e4db9fa0fdfc7ca17a:dodream.html'],{cwd:root,maxBuffer:12e6,encoding:'utf8'});
      const scripts=s=>[...s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
      assert.deepEqual(scripts(html),scripts(base));baselineHash=crypto.createHash('sha256').update(base).digest('hex');
      assert.equal(a.ev('PASS_SCORE'),70);assert.equal(a.ev('ADVANCE_SCORE'),70);assert.equal(a.ev('QUIZ_COUNT'),3);
    });
    await check('Teacher authentication rejects wrong PIN; all eight actual menus open',async()=>{
      a.$('goTeacherBtn').click();await teacher(a,'invalid');assert.equal(a.ev('session.teacher'),false);assert.ok(a.$('pinMsg').querySelector('.error-box'));
      await teacher(a);assert.equal(a.ev('session.teacher'),true);
      const links=a.$('ddUiTeacherHome').querySelectorAll('a');assert.equal(links.length,8);
      for(const link of links){assert.equal(link.target,'_blank');assert.ok(link.rel.includes('noopener'));assert.ok(new URL(link.href).searchParams.get('teacherMenu'));}
      for(const m of a.w.DD_UI.menus){a.w.DD_UI.showTeacher(m.id);assert.equal(a.$('viewTeacher').dataset.uiMenu,m.id);}
    });
    await check('Moved student registration form saves two independent accounts',async()=>{
      a.w.DD_UI.showTeacher('students');await a.action('teacher-register');
      for(const name of ['UI Test A','UI Test B']){a.$('regName').value=name;a.$('regGrade').selectedIndex=1;a.$('regPw').value='test1234';a.$('regBtn').click();await tick(70);assert.match(a.$('regMsg').textContent,/등록 완료/);}
      const students=plain(await a.ev('getAllStudents()'));assert.equal(students.length,2);assert.notEqual(students[0].id,students[1].id);
      a.$('teacherAccountBtn').click();await tick();assert.equal(a.ev('session.teacher'),false);
    });
    await check('Real student login rejects wrong password and reaches the new home',async()=>{
      await login(a,'UI Test A','wrong');assert.equal(a.ev('session.student'),null);
      await login(a);assert.equal(a.ev('session.student.name'),'UI Test A');assert.equal(a.w.DD_UI.page,'home');
    });
    await check('All 18 grades and 1058 concept-to-unit mappings resolve',async()=>{
      gradeStats=plain(a.ev("(function(){const stats=[];for(const grade of GRADES){CP.grade=grade.id;state.gradeId=grade.id;const m=cpModel(grade.id);let concepts=0,low=0,high=0,typed=0;for(let bi=0;bi<m.bigUnits.length;bi++){CP.big=bi;const big=m.bigUnits[bi],mids=cpBigMiddles(big);for(let mi=0;mi<mids.length;mi++){CP.middle=mi;for(let si=0;si<mids[mi].smalls.length;si++){CP.small=si;const sm=cpCurrentSmall();concepts++;for(let ti=0;ti<sm.types.length;ti++){CP.type=ti;cpSyncLegacy();if(!currentUnits().some(u=>u.id===state.unitId))throw Error('Missing unit '+grade.id+'/'+bi+'/'+mi+'/'+si+'/'+ti);const t=ceApply(grade.id,big.name,sm.name,sm.types[ti],null).type;low+=(t.low||[]).length;high+=(t.high||[]).length;}typed+=((ddGetQSet(grade.id,big.name,sm.name)||{}).questions||[]).length;}}}stats.push({grade:grade.id,concepts,low,high,typed});}return stats})()"));
      assert.equal(gradeStats.length,18);assert.equal(gradeStats.reduce((n,g)=>n+g.concepts,0),1058);
      for(const g of gradeStats){assert.ok(g.concepts>0);await choose(a,g.grade);assert.ok(a.w.DD_UI.questionItems().length>0);}
    });
    await check('Concept/type question tabs match the engine completion requirements',async()=>{
      await choose(a);assert.ok(a.w.DD_UI.questionItems().some(q=>q.kind==='concept'));assert.ok(a.w.DD_UI.questionItems().some(q=>q.kind==='typed'));
      assert.deepEqual(plain(a.w.DD_UI.questionItems().map(q=>q.q)),plain(a.ev('cpUnitQuestionList()')));
      assert.equal(a.ev('cpUnitRemaining()'),a.w.DD_UI.questionItems().length);
      await a.action('kind','[data-kind="typed"]');assert.ok(a.$('ddUiStudentMain').querySelector('[data-dd-ui="question"]'));await a.action('kind','[data-kind="concept"]');
    });
    await check('Text fallback, actual submission, 69/70 boundary, skip and saved records work',async()=>{
      await a.action('question');assert.equal(a.w.DD_UI.page,'lesson');assert.equal(a.$('questionCard').dataset.input,'text');assert.equal(a.$('manualFallback').style.display,'block');
      const q=a.ev('state.questions[0]');assert.ok(a.$('qList').textContent.includes(q));await submit(a,69);
      assert.ok(a.$('retryBtn'));assert.equal(a.ev('cpStatusForQuestion(state.gradeId,state.questions[0])'),'redo');
      const count=a.w.DD_UI.remaining().length;a.$('skipQBtn').click();await tick();assert.equal(a.w.DD_UI.page,'questions');assert.equal(a.w.DD_UI.remaining().length,count);assert.equal(a.ev('getUnitQuizDone()'),null);
      await a.action('question');await submit(a,70);assert.ok(a.$('nextUnitBtn'));assert.match(a.$('nextUnitBtn').textContent,/다음 질문/);assert.match(a.$('fbArea').textContent,/남은 질문/);assert.equal(a.w.DD_UI.remaining().length,count-1);
      a.$('nextUnitBtn').click();await tick(70);assert.notEqual(a.ev('state.questions[0]'),q);assert.equal(a.w.DD_UI.page,'lesson');
      const records=plain(await a.ev('getAllSubmissions()'));assert.equal(records.length,2);assert.deepEqual(records.map(r=>r.score).sort(),[69,70]);assert.ok(records.find(r=>r.pass).reviewDue);
    });
    await check('Navigation and logout stay locked during AI evaluation and record saving',async()=>{
      const pending=submit(a,70,180);a.$('studentLogoutBtn').click();a.w.document.querySelector('[data-dd-ui="grades"]').click();
      assert.equal(a.w.DD_UI.page,'lesson');assert.equal(a.ev('session.student.name'),'UI Test A');await pending;assert.equal(a.$('viewStudent').classList.contains('dd-ui-busy'),false);
    });
    await check('AI failures unlock retry and do not fabricate pass records',async()=>{
      a.$('nextUnitBtn').click();await tick(50);const before=(await a.ev('getAllSubmissions()')).length;
      a.ev("callClaude=async()=>{throw new Error('Offline fixture failure')}");
      a.$('manualText').value='설명할게요';a.$('manualText').dispatchEvent(new a.w.Event('input',{bubbles:true}));a.$('submitBtn').click();await tick(50);
      assert.ok(a.$('fbArea').querySelector('.error-box'));assert.equal(a.$('viewStudent').classList.contains('dd-ui-busy'),false);assert.equal((await a.ev('getAllSubmissions()')).length,before);
    });
    await check('Completing required questions opens the original three-question basic quiz',async()=>{
      let guard=0;while(a.w.DD_UI.remaining().length){assert.ok(++guard<25);await a.w.DD_UI.startItem(a.w.DD_UI.remaining()[0]);await submit(a,70);}
      assert.equal(a.ev('cpUnitRemaining()'),0);
      a.w.__quizFixture={items:[1,2,3].map(n=>({stem:n+'+1은?',choices:[String(n),String(n+1),String(n+2),String(n+3)],answer:1,answer_text:String(n+1),explain:'1만큼 커져요.',type:'더하기'}))};
      a.ev("callClaude=async()=>({content:[{type:'text',text:JSON.stringify(window.__quizFixture)}]})");
      a.$('nextUnitBtn').click();await tick(120);assert.equal(a.w.DD_UI.page,'quiz');assert.equal(a.ev('state.quiz.length'),3);assert.equal(a.$('quizArea').querySelectorAll('.quiz-choice').length,12);
      for(let i=0;i<3;i++){const answer=a.ev('state.quiz['+i+'].answer');a.$('quizArea').querySelector('[data-qi="'+i+'"][data-ci="'+answer+'"]').click();}
      a.$('quizSubmitBtn').click();await tick(70);assert.equal(a.ev('getUnitQuizDone().total'),3);assert.equal(a.ev('getUnitQuizDone().correct'),3);
      assert.ok(Object.keys(a.w.localStorage).some(k=>k.startsWith('dd:quizlog:')));
      a.$('quizDoneBtn').click();await tick();assert.equal(a.w.DD_UI.page,'questions');assert.equal(a.w.document.body.classList.contains('step-focus'),false);
    });
    await check('Records and tasks are reachable and leave learning focus correctly',async()=>{
      await a.action('home');await a.action('records');assert.equal(a.w.DD_UI.page,'records');assert.ok(a.$('myHistoryHost').textContent.trim());assert.equal(a.w.document.body.classList.contains('step-focus'),false);
      await a.action('home');await a.action('inbox');assert.equal(a.w.DD_UI.page,'inbox');
    });
    await check('Actual talk engine saves current student records without main-flow review or quiz',async()=>{
      await a.action('home');await a.action('talk');assert.equal(a.w.DD_UI.page,'talk');
      const first=a.$('cvMenu').querySelector('[data-kind="grade"]');assert.ok(first);first.click();
      a.$('cvMenu').querySelector('[data-kind="unit"]').click();const type=a.$('cvMenu').querySelector('[data-kind="type"]');assert.ok(type);const id=type.dataset.id;type.click();
      a.ev("callClaude=async()=>({content:[{type:'text',text:JSON.stringify({covered:['a','b','c','d','e'],done:true,reply:'핵심을 설명했어요.'})}]})");
      a.$('cvAnswer').value='이유를 설명할게요.';a.$('cvAnswer').dispatchEvent(new a.w.Event('input',{bubbles:true}));a.$('cvSend').click();await tick(100);
      assert.ok(a.$('cvResult').textContent.includes('대화 끝'));const talk=plain(await a.ev('getAllSubmissions()')).find(r=>r.level==='talk');
      assert.ok(talk);assert.equal(talk.studentId,a.ev('session.student.id'));assert.equal(talk.unitId,id);assert.ok(!talk.reviewDue);assert.equal(a.w.DD_UI.page,'talk');
      a.$('cvBack').click();await tick();await a.action('home');await a.action('records');a.w.cvOpenType(id);await tick();assert.equal(a.w.DD_UI.page,'talk');
    });
    await check('Second student does not inherit first student completion or selection',async()=>{
      a.$('studentLogoutBtn').click();await login(a,'UI Test B');assert.equal(a.w.session.student.name,'UI Test B');assert.equal(a.ev('cpRecords.length'),0);
      await choose(a);assert.equal(a.ev('getUnitQuizDone()'),null);assert.equal(a.w.DD_UI.remaining().length,a.w.DD_UI.questionItems().length);
    });
    await check('New teacher tab requires PIN even when a saved student login exists',async()=>{
      const saved=Object.fromEntries(Object.keys(a.w.localStorage).map(k=>[k,a.w.localStorage.getItem(k)]));const tab=await boot('?teacherMenu=bank',saved);
      try{assert.ok(tab.$('viewTeacherAuth').classList.contains('active'));assert.equal(tab.ev('session.student'),null);assert.equal(tab.ev('session.teacher'),false);
        await teacher(tab);assert.equal(tab.w.DD_UI.teacherMenu,'bank');assert.equal(tab.$('bankTab').style.display,'block');assert.deepEqual(tab.errors,[]);
      }finally{tab.close();}
    });
    await check('A review card synchronizes the actual question and curriculum selection across grades',async()=>{
      a.$('studentLogoutBtn').click();await login(a,'UI Test A');
      for(const k of Object.keys(a.w.localStorage)){if(!k.startsWith('dd:sub:'))continue;const r=JSON.parse(a.w.localStorage.getItem(k));if(r.pass&&r.level!=='talk'){r.time=new Date(Date.now()-9*86400000).toISOString();r.reviewDue=new Date(Date.now()-2*86400000).toISOString();a.w.localStorage.setItem(k,JSON.stringify(r));}}
      await choose(a,'e4-1');await a.action('home');await a.action('inbox');const review=a.$('reviewHost').querySelector('.review-card');assert.ok(review);const course=review.dataset.course;
      review.click();await tick(70);assert.equal(a.w.DD_UI.page,'lesson');assert.equal(a.ev('state.gradeId'),course);assert.equal(a.ev('CP.grade'),course);assert.equal(a.ev('cpCurrentType().unitId'),a.ev('state.unitId'));
      a.$('studentLogoutBtn').click();await login(a,'UI Test B');await choose(a);
    });
    await check('High-level and typed question selection preserves original scoring context',async()=>{
      const level=a.$('ddUiLevel');level.value='high';level.dispatchEvent(new a.w.Event('change',{bubbles:true}));
      assert.deepEqual(plain(a.w.DD_UI.questionItems().map(q=>q.q)),plain(a.ev('cpUnitQuestionList()')));
      const typed=a.w.DD_UI.questionItems().find(q=>q.type==='reason');assert.ok(typed);await a.w.DD_UI.startItem(typed);
      assert.equal(a.ev('state._qType'),'reason');assert.equal(a.ev('state._baseLevel'),'high');
      assert.equal(a.ev('state.level'),a.ev("QTYPE_LEVEL.reason"));
      await a.action('lesson-back');assert.equal(a.ev('state.level'),'high');assert.equal(a.ev('state._qType'),null);
      a.$('ddUiLevel').value='low';a.$('ddUiLevel').dispatchEvent(new a.w.Event('change',{bubbles:true}));
    });
    await check('Teacher question editor saves overrides reflected in student questions',async()=>{
      a.$('studentLogoutBtn').click();a.$('goTeacherBtn').click();await teacher(a);a.w.DD_UI.showTeacher('cards');
      a.$('ceSearch').value='E3111';a.$('ceGo').click();const field=a.$('ceList').querySelector('[data-qlist="low"] .ce-qtext');assert.ok(field);
      field.value='UI 검증: 같은 자리끼리 더하는 이유를 설명해요.';
      const typeField=a.$('ceList').querySelector('.ce-qs[data-qtype="reason"] .ce-qs-q');assert.ok(typeField);typeField.value='UI 검증: 자리 맞추기가 필요한 이유는?';
      a.$('ceList').querySelector('.ce-save').click();assert.ok(a.$('ceList').querySelector('.ce-editflag'));
      a.$('teacherAccountBtn').click();await login(a,'UI Test B');await choose(a);
      assert.ok(a.w.DD_UI.questionItems().some(q=>q.q==='UI 검증: 같은 자리끼리 더하는 이유를 설명해요.'));
      assert.ok(a.w.DD_UI.questionItems().some(q=>q.type==='reason'&&q.q==='UI 검증: 자리 맞추기가 필요한 이유는?'));
    });
    await check('Teacher bank saves a real problem and reports save the selected student comment',async()=>{
      a.$('studentLogoutBtn').click();a.$('goTeacherBtn').click();await teacher(a);a.w.DD_UI.showTeacher('bank');
      a.$('bankAddBtn').click();a.$('baCourse').value='e3-1';a.$('baQuestion').value='UI 검증 문제: 2+3은?';a.$('baAnswer').value='5';a.$('baSaveBtn').click();await tick(80);
      const bank=plain(await a.ev('queryProblems({})'));assert.ok(bank.some(p=>p.question==='UI 검증 문제: 2+3은?'));
      a.w.DD_UI.showTeacher('reports');a.$('railList').querySelector('.rstu').click();await tick(60);assert.ok(a.$('shOverlay').classList.contains('open'));
      assert.ok(a.$('pmComment'));const sid=a.ev('SH_CURRENT_STUDENT.id');a.$('pmComment').value='UI 검증용 코멘트';a.$('pmSaveBtn').click();await tick(60);
      assert.equal(JSON.parse(a.w.localStorage.getItem('dd:pcomment:'+sid)).text,'UI 검증용 코멘트');
      assert.ok(a.$('pmLink').value.includes('?parent='+sid));a.$('shClose').click();
    });
    await check('Speech fallback and blank questions remain usable in the integrated shell',async()=>{
      const saved=Object.fromEntries(Object.keys(a.w.localStorage).map(k=>[k,a.w.localStorage.getItem(k)]));const speech=await boot('',saved,{speech:true});
      try{await login(speech,'UI Test B');await choose(speech);await speech.action('question');assert.equal(speech.$('questionCard').dataset.input,'voice');
        speech.$('showManualBtn').click();assert.equal(speech.$('questionCard').dataset.input,'text');assert.equal(speech.ev('state.manualMode'),true);
        await speech.action('lesson-back');speech.$('ddUiLevel').value='blank';speech.$('ddUiLevel').dispatchEvent(new speech.w.Event('change',{bubbles:true}));
        speech.ev("callClaude=async()=>({content:[{type:'text',text:JSON.stringify(['① 같은 (　　　)끼리 더해요.','② 십은 일의 (　　　)배예요.','③ 합을 구하는 계산은 (　　　)이에요.'])}]})");
        await speech.action('question');assert.equal(speech.ev('state.questions.length'),3);assert.equal(speech.ev('state.level'),'blank');assert.equal(speech.w.DD_UI.page,'lesson');assert.equal(speech.ev('cpUnitQuestionList()'),null);
        await speech.action('lesson-back');assert.equal(speech.w.DD_UI.page,'questions');assert.equal(speech.ev('Timer.id'),null);
        assert.deepEqual(speech.errors,[]);
      }finally{speech.close();}
    });
    await check('Bright CSS parses and focused panels retain visible/hidden routing',async()=>{
      const style=a.w.document.createElement('style');style.textContent=fs.readFileSync(path.join(root,'ui-integration/app-ui.css'),'utf8');a.w.document.head.appendChild(style);
      a.w.DD_UI.showTeacher('students');assert.equal(a.w.getComputedStyle(a.$('ddUiTeacherStudents')).display,'block');assert.equal(a.w.getComputedStyle(a.$('bankTab')).display,'none');
      a.$('teacherAccountBtn').click();await login(a,'UI Test B');await choose(a);await a.action('question');
      assert.equal(a.w.getComputedStyle(a.$('questionCard')).display,'block');assert.equal(a.w.getComputedStyle(a.$('setupCard')).display,'none');assert.equal(a.w.getComputedStyle(a.$('quizCard')).display,'none');
      await a.action('home');await a.action('records');assert.equal(a.w.getComputedStyle(a.$('myHistoryHost')).display,'block');assert.equal(a.w.getComputedStyle(a.$('questionCard')).display,'none');
    });
    await check('No duplicate DOM ids or uncaught integration errors remain',async()=>{
      const all=[...a.w.document.querySelectorAll('[id]')].map(el=>el.id),dup=[...new Set(all.filter((x,i)=>all.indexOf(x)!==i))];
      assert.deepEqual(dup,[]);assert.deepEqual(a.errors,[]);
    });
    const report={baseline:'ec0e179776cc7b62b8f5b0e4db9fa0fdfc7ca17a',baselineHtmlSHA256:baselineHash,integrationVersion:a.w.DD_UI.version,environment:'Node + jsdom; network disabled; AI transport fixtures',limitations:['No live AI/production database calls','No browser rendering, real microphone or mobile-device visual test'],results,gradeStats};
    fs.writeFileSync(path.join(__dirname,'test-results.json'),JSON.stringify(report,null,2)+'\n');console.log('All '+results.length+' checks passed.');
  }finally{a.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1});
