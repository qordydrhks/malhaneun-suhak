// 계단 조각(ladder_*.json) 채점 시험 → 검토 페이지용 데이터(.js)로 저장.
// 로컬 앱(dodream.html)에서 grade_test3.js 를 먼저 불러 둔 뒤 실행:
//   gradeChunks(['작업도구/질문계단/m3/ladder_M1.json', ...], 'review_m31_1.js')
// 칸마다 절반 답 2번(판정 흔들림 측정) · 틀린 답 · 모범 답 → 4번 호출. 결과는 recv.py(8977)로.

async function gradeChunks(paths, outName, onProgress){
  const ladders = [];
  for(const p of paths){ const r = await fetch(p+'?t='+Date.now()); (await r.json()).forEach(x=>ladders.push(x)); }
  const results = {};
  let done = 0, total = ladders.reduce((s,l)=>s+l.steps.length,0);
  for(const L of ladders){
    const key = L.small;
    results[key] = [];
    for(const s of L.steps){
      const r = {};
      const run = async (ans)=>{ try{ return await ladder3Grade(s, ans); }catch(e){ return {error:String(e&&e.message||e)}; } };
      if(s.half){ r.half = await run(s.half); r.half2 = await run(s.half); }
      r.wrong = await run(s.wrong);
      r.full = await run(s.ideas.map(x=>x[0]).join('. '));
      results[key].push(r);
      done++; if(onProgress) onProgress(done, total);
    }
  }
  const body = 'window.REVIEW = ' + JSON.stringify({ made:new Date().toISOString(), ladders, results }) + ';\n';
  await fetch('http://127.0.0.1:8977/'+outName, {method:'POST', body});
  const all = Object.values(results).flat();
  const cnt = (f)=>all.filter(f).length;
  return { steps: all.length,
    fullPass: cnt(r=>r.full.verdict==='pass'),
    halfTotal: cnt(r=>r.half), halfPartial: cnt(r=>r.half && r.half.verdict==='partial'),
    wrongNotPass: cnt(r=>r.wrong.verdict!=='pass'),
    halfFlip: cnt(r=>r.half && r.half2 && r.half.verdict!==r.half2.verdict),
    errors: cnt(r=>['half','half2','wrong','full'].some(k=>r[k] && (r[k].error || r[k].parsed===false))) };
}
