// 로컬 앱(http://127.0.0.1:8975/dodream.html)에서 실행: 설계도를 실제로 그려서 잰다.
// 사용:  await (await fetch('작업도구/개념그림/check_render.js')).text() 를 eval 한 뒤
//        await ddRenderCheck(['작업도구/개념그림/h1/scenes_A.json', ...], 'preview_h1.html')
// 결과: 개념별 문제 요약(배열) 반환 + 미리보기 HTML 을 recv.py(8977)로 보냄
async function ddRenderCheck(paths, previewName){
  const rows=[];
  for(const p of paths){ const r=await fetch(p+'?t='+Date.now()); (await r.json()).forEach(x=>rows.push(Object.assign({file:p.split('/').pop()},x))); }
  const host=document.createElement('div');
  host.style.cssText='position:absolute;left:0;top:0;width:900px;background:#fff;z-index:99999';
  document.body.appendChild(host);
  const report=[], cards=[];
  const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  for(const r of rows){
    if(r.skip){ report.push({small:r.small, skip:r.skip}); cards.push('<div class="c skip"><h3>'+esc(r.grade+' · '+r.small)+'</h3><p>건너뜀: '+esc(r.skip)+'</p></div>'); continue; }
    const issues=ddFigCheck(r.scene);
    let svg=''; try{ svg=ddFig(r.scene); }catch(e){ issues.push('throw '+e.message); }
    host.innerHTML=svg;
    const el=host.querySelector('svg');
    let out=0, overlap=0, card=true;
    try{ card=!!ddGetCard(r.grade,r.big,r.small); }catch(e){ card=false; }
    if(!card) issues.push('카드 못 찾음');
    if(el){
      const vb=(el.getAttribute('viewBox')||'').split(/[ ,]+/).map(Number);
      const [vx,vy,vw,vh]=vb.length===4?vb:[0,0,+el.getAttribute('width'),+el.getAttribute('height')];
      const boxes=[];
      el.querySelectorAll('text,circle,ellipse,line,path,polygon,polyline,rect').forEach(n=>{
        let b; try{ b=n.getBBox(); }catch(e){ return; }
        if(b.width===0 && b.height===0) return;
        if(b.x<vx-1 || b.y<vy-1 || b.x+b.width>vx+vw+1 || b.y+b.height>vy+vh+1) out++;
        if(n.tagName==='text' && n.textContent.trim()) boxes.push(b);
      });
      for(let i=0;i<boxes.length;i++) for(let j=i+1;j<boxes.length;j++){
        const a=boxes[i], b=boxes[j];
        const ix=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x), iy=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);
        if(ix>2 && iy>2) overlap++;
      }
    }
    report.push({small:r.small, issues, out, overlap});
    const flag=(issues.length||out)?' bad':'';
    cards.push('<div class="c'+flag+'"><h3>'+esc(r.grade+' · '+r.small)+'</h3>'+svg
      +'<p class="m">'+(issues.length?'⚠ '+esc(issues.join(' / ')):'')+(out?' · 화면 밖 '+out:'')+(overlap?' · 글자 겹침 '+overlap:'')+'</p></div>');
  }
  host.remove();
  if(previewName){
    const html='<!doctype html><meta charset="utf-8"><title>그림 미리보기</title><style>body{font-family:system-ui,sans-serif;background:#f4f3ef;margin:0;padding:16px}'
      +'.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.c{background:#fff;border-radius:10px;padding:10px 12px;border:1px solid #e3e1da}'
      +'.c svg{width:100%!important;max-width:100%;height:auto!important}.c h3{font-size:14px;margin:0 0 6px}.bad{border:2px solid #D85A30}.skip{opacity:.6}.m{font-size:12px;color:#D85A30;margin:4px 0 0}</style>'
      +'<h2>개념카드 그림 미리보기 ('+rows.length+'개)</h2><div class="g">'+cards.join('')+'</div>';
    await fetch('http://127.0.0.1:8977/'+previewName,{method:'POST',body:html});
  }
  return report;
}
