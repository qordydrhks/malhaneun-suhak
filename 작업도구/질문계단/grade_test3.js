// 질문 계단 채점 시험 3 — 로컬 앱에서 ladder3_data.js 다음에 불러서 실행. 앱 코드는 안 바꾼다.
// 바뀐 점(시험 1에서 틀린 답에 AI가 답을 흘림):
//  · AI는 아이디어별 판정 + 근거 인용 + 오개념 + "인정 한마디"만 낸다.
//  · 되묻기 문장은 계단에 적어 둔 것(빠진 첫 아이디어의 되묻기)을 앱이 붙인다 → 답이 새지 않는다.
//  · 예/아니요 결론만 말하면 어떤 아이디어도 인정하지 않는다.

const LADDER3_SYSTEM = `너는 '말하는 수학'의 선생님 '뚜삐'야. 학생이 질문 하나에 말로 답한 것(음성 인식 텍스트)을 보고
[통과 아이디어]를 하나씩 짚었는지 판정해. 되묻기 질문은 앱이 따로 붙이니까 너는 만들지 마.

[판정 규칙]
- 아이디어마다 hit(true/false). true면 학생 말에서 근거가 된 부분을 짧게 그대로 인용(evidence). 인용할 곳이 없으면 false.
- 뜻이 같으면 표현이 달라도 인정. 수식·기호를 정확히 읽지 않아도 아이디어를 말로 설명했으면 인정.
- 음성 인식은 수학 말을 자주 틀리게 적는다("비 제곱 빼기 사 에이 씨"=b²−4ac, "판결식"=판별식, "디"=D, "근과 개수"=근과 계수). 소리가 비슷하고 문맥상 분명하면 맞게 말한 것으로 봐.
- 숫자 계산 결과는 요구하지 않는다.
- [예/아니요 금지] "네", "될 것 같아요", "쓸 수 있어요"처럼 결론만 말하고 이유·내용이 없으면 어떤 아이디어도 인정하지 마.
- 아이디어의 일부만 말했으면(예: "D>0" 이라고만 하고 무엇이 되는지 안 말함) 인정하지 마.
- [이전 답]이 있으면 이전 답과 이번 답을 합쳐서 판정해.
- 틀린 내용을 말했으면 misconception 에 학생 생각을 한 줄로 요약. 없으면 "".
- focus: 아직 못 맞힌 아이디어 중, 학생이 틀리게 말한 내용과 가장 직접 관련된 아이디어의 id. 틀린 말이 없으면 못 맞힌 첫 아이디어의 id. 다 맞았으면 "".

[ack — 인정 한마디]
- 25자 안팎 반말 한 문장. 학생이 맞게 말한 부분만 구체적으로 인정해("합은 −b/a 라고 정확히 말했어!").
- 맞게 말한 게 없으면 "좋아, 같이 하나씩 생각해 보자." 처럼 격려만. 틀린 말을 했으면 "그렇게 생각했구나." 처럼 받아 주기만.
- ack 에 정답, 빠진 아이디어의 내용, 힌트, 질문을 절대 넣지 마.

반드시 JSON만 출력: {"hits":[{"id":"a","hit":true,"evidence":"..."}],"misconception":"","focus":"b","ack":"..."}`;

async function ladder3Grade(step, answer, prev){
  const ideas = step.ideas.map((x,i)=>String.fromCharCode(97+i)+') '+x[0]).join('\n');
  const user = `[질문] ${step.q}\n[통과 아이디어]\n${ideas}\n` + (prev ? `[이전 답] ${prev}\n` : '') + `[학생의 답(음성 인식)] ${answer}`;
  const t0 = Date.now();
  const data = await callClaude({ task:'grade', model:'claude-sonnet-4-6', max_tokens:700, system:LADDER3_SYSTEM, messages:[{role:'user', content:user}] });
  const raw = (data.content||[]).map(b=>b.text||'').join('').trim();
  let o=null; try{ o=JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}')+1)); }catch(e){}
  const hits = step.ideas.map((x,i)=>{ const id=String.fromCharCode(97+i); const f=(o&&o.hits||[]).find(h=>h&&h.id===id); return {id, hit:!!(f&&f.hit), evidence:(f&&f.hit&&f.evidence)||''}; });
  let missing = hits.findIndex(h=>!h.hit);
  // [v3] 틀린 말과 관련된 아이디어를 AI가 골랐고, 그게 아직 못 맞힌 것이면 그 되묻기를 쓴다
  const fi = o && typeof o.focus==='string' ? o.focus.trim().charCodeAt(0)-97 : -1;
  if(missing>=0 && fi>=0 && fi<hits.length && !hits[fi].hit) missing = fi;
  const h = hits.filter(x=>x.hit).length;
  const verdict = missing<0 ? 'pass' : (h>0 ? 'partial' : 'none');
  // 앱이 만드는 말: 인정 한마디 + (빠진 첫 아이디어의 되묻기)
  const say = ((o&&o.ack)||'') + (missing<0 ? '' : ' ' + step.ideas[missing][1]);
  return { ms:Date.now()-t0, model:data.model||'', verdict, hits, misconception:(o&&o.misconception)||'', ack:(o&&o.ack)||'', say, parsed:!!o };
}

async function ladder3Test(){
  const res = {};
  for(const L of window.LADDER3){
    for(let k=0;k<L.steps.length;k++){
      const s=L.steps[k], key=L.id+(k+1);
      res[key] = {};
      for(const kind of ['half','wrong']){
        try{ res[key][kind] = await ladder3Grade(s, s[kind]); }catch(e){ res[key][kind] = {error:String(e&&e.message||e)}; }
      }
      // 모범 답(아이디어를 이어 말한 것)도 통과되는지
      const full = s.ideas.map(x=>x[0]).join('. ');
      try{ res[key].full = await ladder3Grade(s, full); }catch(e){ res[key].full = {error:String(e&&e.message||e)}; }
    }
  }
  await fetch('http://127.0.0.1:8977/ladder3_results.js',{method:'POST',body:'window.LADDER3_RESULTS = '+JSON.stringify(res,null,1)+';\n'});
  const all = Object.values(res).flatMap(r=>Object.entries(r).map(([k,v])=>({k,v})));
  return { calls: all.length, fullPass: all.filter(x=>x.k==='full'&&x.v.verdict==='pass').length,
    halfPartial: all.filter(x=>x.k==='half'&&x.v.verdict==='partial').length,
    wrongNone: all.filter(x=>x.k==='wrong'&&x.v.verdict==='none').length,
    errors: all.filter(x=>x.v.error||x.v.parsed===false).length };
}
