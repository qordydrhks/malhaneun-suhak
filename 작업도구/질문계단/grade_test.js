// 질문 계단 채점 시험 — 로컬 앱(http://127.0.0.1:8975/dodream.html)에서 실행. 앱 코드는 안 바꾼다.
// eval 한 뒤: await ladderGradeTest()  → 결과를 recv.py(8977)로 grade_result.json 저장
// 실제 서버(callClaude → task 'grade' → Gemini)를 부른다. 1회 수 원.

const LADDER_GRADE_SYSTEM = `너는 '말하는 수학'의 선생님 '뚜삐'야. 학생이 질문 하나에 말로 답한 것(음성 인식 텍스트)을 듣고,
[통과 아이디어]를 하나씩 짚었는지 판정하고 선생님처럼 짧게 되물어.

[판정 규칙]
- 아이디어마다 hit(true/false)와, true면 학생 말에서 그 근거가 된 부분을 짧게 그대로 인용(evidence)해. 인용할 곳이 없으면 hit=false.
- 뜻이 같으면 표현이 달라도 인정. 수식이나 기호를 정확히 읽지 않아도 아이디어를 말로 설명했으면 인정.
- 음성 인식은 수학 말을 자주 틀리게 적는다(예: "b 제곱 빼기 4ac"→"비제곱 빼기 사에이씨", "판별식"→"판별 식/판결식", "허근"→"허 근/허그는"). 소리가 비슷하고 문맥상 분명하면 맞게 말한 것으로 봐.
- 숫자 계산 결과는 요구하지 않는다. 방법·이유를 말했으면 인정.
- [이전 답]이 있으면 이전 답과 이번 답을 합쳐서 판정해(앞에서 말한 건 다시 말하지 않아도 인정).
- 틀린 내용(오개념)을 말했으면 misconception에 한 줄로. 없으면 "".
- "모르겠어요"나 질문과 무관한 말은 전부 hit=false.

[되묻기 규칙 — feedback]
- 1~2문장, 초·중등 눈높이 반말. 먼저 맞게 말한 부분을 구체적으로 인정하고, 빠진 아이디어가 있으면 그중 **하나만** 떠올리게 하는 질문으로 끝내.
- 빠진 아이디어의 정답을 직접 말하지 마. [되묻기 참고]가 있으면 그 방향으로.
- 다 맞았으면 짧게 칭찬만(질문 없이).
- 오개념이 있으면 정답을 말하지 말고 모순을 스스로 발견하게 되물어.

반드시 JSON만 출력: {"hits":[{"id":"a","hit":true,"evidence":"..."}],"misconception":"","feedback":"..."}`;

async function ladderGrade(step, answer, prev){
  const ideas = step.ideas.map((t,i)=>String.fromCharCode(97+i)+') '+t).join('\n');
  const user = `[질문] ${step.q}\n[통과 아이디어]\n${ideas}\n[되묻기 참고] ${step.hint||'-'}\n`
    + (prev ? `[이전 답] ${prev}\n` : '') + `[학생의 답(음성 인식)] ${answer}`;
  const t0 = Date.now();
  const data = await callClaude({ task:'grade', model:'claude-sonnet-4-6', max_tokens:900, system:LADDER_GRADE_SYSTEM, messages:[{role:'user', content:user}] });
  const raw = (data.content||[]).map(b=>b.text||'').join('').trim();
  let o=null; try{ o=JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}')+1)); }catch(e){}
  const hits = o && Array.isArray(o.hits) ? o.hits : [];
  const n = step.ideas.length, h = hits.filter(x=>x && x.hit).length;
  // 판정은 앱이 정한다: 전부 = 통과 / 일부 = 되묻기 / 0 = 되묻기(설명 단계 후보)
  const verdict = h>=n ? 'pass' : (h>0 ? 'partial' : 'none');
  return { ms:Date.now()-t0, model:(data.model||''), verdict, h, n, hits, misconception:o&&o.misconception, feedback:o&&o.feedback, raw: o?undefined:raw };
}

const LADDER_TESTS = [
 { id:'판별식-1', q:'이차방정식 ax²+bx+c=0 의 판별식은 무엇이고, 그 식으로 무엇을 알 수 있어?',
   ideas:['근의 공식에서 근호 안의 식 b²−4ac 이다','그 부호로 근이 실근인지 허근인지(근의 종류)를 판별한다'],
   hint:'근의 공식에서 √ 안에 있는 식을 떠올리게',
   cases:[
    ['완벽','근의 공식에서 루트 안에 있는 b제곱 빼기 4ac를 판별식이라고 하고요, 이게 양수인지 음수인지 보면 근이 실근인지 허근인지 알 수 있어요.','pass'],
    ['절반','b 제곱 빼기 4ac요.','partial'],
    ['음성오류','근의 공식 루트 안에 비제곱 빼기 사에이씨 그게 판결식이고 부호 보면 실근인지 허 근인지 알아요','pass'],
    ['모름','잘 모르겠어요','none'],
    ['되묻기후','부호를 보면 근이 실수인지 허수인지 알 수 있어요','pass','b 제곱 빼기 4ac요.']
   ]},
 { id:'판별식-3', q:'문제에 "실근을 가진다"라고 쓰여 있을 때와 "서로 다른 두 실근을 가진다"라고 쓰여 있을 때, 판별식 조건은 어떻게 달라?',
   ideas:['"실근을 가진다"는 중근도 포함하므로 D≥0','"서로 다른 두 실근"은 D>0'],
   hint:'중근도 실근인지 떠올리게',
   cases:[
    ['완벽','실근은 중근도 실근이니까 D가 0보다 크거나 같고요, 서로 다른 두 실근은 같으면 안 되니까 D가 0보다 커야 해요.','pass'],
    ['오개념','둘 다 D가 0보다 크면 돼요. 같은 말이에요.','none'],
    ['절반','서로 다른 두 실근은 D가 0보다 커요.','partial']
   ]},
 { id:'판별식-5', q:'x의 계수에 미지수 k가 들어 있는 이차방정식이 중근을 가질 때, k는 어떤 방법으로 구해?',
   ideas:['판별식 D=0 이라는 식을 세운다','그 식을 k에 대한 방정식으로 풀어 k를 구한다'],
   hint:'중근일 때 판별식이 얼마인지 떠올리게',
   cases:[
    ['완벽','중근이니까 판별식을 0으로 놓고 그걸 k에 대해서 풀면 돼요.','pass'],
    ['엉뚱','근과 계수의 관계로 두 근의 합을 구해요.','none']
   ]},
 { id:'근과계수-2', q:'근의 공식으로 구한 두 근을 더하거나 곱하면 왜 루트가 사라질까?',
   ideas:['더하면 +√D 와 −√D 가 서로 지워진다','곱하면 합차 공식으로 제곱이 되어 루트가 없어진다'],
   hint:'두 근의 루트 앞 부호가 어떻게 다른지 떠올리게',
   cases:[
    ['완벽','두 근이 루트 앞에 플러스 마이너스만 다르니까 더하면 루트끼리 없어지고, 곱하면 합차공식이라 루트가 제곱이 돼서 사라져요.','pass'],
    ['절반','더하면 루트가 플러스랑 마이너스라 없어져요.','partial'],
    ['음성오류','더하면 플마 루트디가 지워지고 곱하면 합 차 공식 이라서 제곱되니까 루트가 없어져요','pass']
   ]},
 { id:'근과계수-4', q:'근을 직접 구하지 않고 α²+β² 같은 식의 값을 구하는 방법을 말해 봐.',
   ideas:['근과 계수의 관계로 두 근의 합과 곱을 구한다','곱셈 공식의 변형으로 α²+β² 을 합과 곱으로 바꿔 계산한다'],
   hint:'α²+β² 을 합과 곱으로 바꾸는 방법을 떠올리게',
   cases:[
    ['마스터기준','근과 계수와의 관계를 이용해서 식을 곱셈공식으로 세우고 곱셈공식 변형을 통해서 구할 수 있어요.','pass'],
    ['절반','근과 계수의 관계로 알파 더하기 베타랑 알파 베타를 구해요.','partial'],
    ['음성오류','근과 개수의 관계로 알파플러스베타 알파베타 구하고 알파 제곱 더하기 베타 제곱은 합의 제곱 빼기 이 알파베타로 바꿔요','pass'],
    ['엉뚱','근의 공식으로 두 근을 구해서 제곱해서 더해요.','none']
   ]},
 { id:'이등변-4', q:'이등변삼각형 ABC(AB=AC)에서 꼭지각의 이등분선 대신, 꼭짓점 A와 밑변 BC의 중점 M을 이은 선분을 그어도 두 밑각이 같다는 걸 증명할 수 있을까? 어떤 합동조건이 돼?',
   ideas:['증명할 수 있다','AB=AC, BM=CM, AM 공통이라 SSS 합동이다'],
   hint:'두 삼각형에서 길이가 같은 변 세 쌍을 찾게',
   cases:[
    ['완벽','네 할 수 있어요. AB랑 AC가 같고 BM이랑 CM이 같고 AM은 같이 쓰니까 SSS 합동이에요.','pass'],
    ['절반','네 될 것 같아요.','partial'],
    ['오개념','안 돼요. 중점을 이으면 각을 반으로 안 나눠서 합동이 아니에요.','none']
   ]},
 { id:'이등변-6', q:'두 각의 크기가 같은 삼각형은 이등변삼각형일까? 두 밑각이 같음을 증명할 때와 비교하면 무엇이 달라져?',
   ideas:['두 각이 같은 삼각형은 이등변삼각형이다','이번엔 AB=AC 를 알 수 없어 SAS 대신 ASA 합동을 쓴다'],
   hint:'이번에는 어떤 변의 길이를 알 수 없는지 떠올리게',
   cases:[
    ['완벽','네 이등변삼각형이에요. 근데 이번에는 두 변이 같은 걸 모르니까 SAS를 못 쓰고 각을 이용해서 ASA로 합동을 보여요.','pass'],
    ['음성오류','네 이등 변 삼각형이요 이번엔 에이비 에이씨 같은지 모르니까 에스에이에스 말고 에이에스에이 합동','pass']
   ]}
];

async function ladderGradeTest(){
  const out=[];
  for(const t of LADDER_TESTS){
    for(const c of t.cases){
      let r; try{ r = await ladderGrade(t, c[1], c[3]); }catch(e){ r = {error:String(e && e.message || e)}; }
      out.push({ step:t.id, kind:c[0], expect:c[2], answer:c[1], prev:c[3]||'', ...r });
    }
  }
  const pass = out.filter(x=>x.verdict===x.expect).length;
  await fetch('http://127.0.0.1:8977/grade_result.json',{method:'POST',body:JSON.stringify(out,null,1)});
  return { total: out.length, match: pass, miss: out.filter(x=>x.verdict!==x.expect).map(x=>x.step+'/'+x.kind+':'+x.verdict), avgMs: Math.round(out.reduce((s,x)=>s+(x.ms||0),0)/out.length), models:[...new Set(out.map(x=>x.model))] };
}
