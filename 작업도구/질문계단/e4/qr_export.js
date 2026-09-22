// 질문 고르기 화면에서 학년을 골라 [내보내기]한 내용을 8977 로 보낸다 (테스트용)
async function qrExportTo(grade, name){
  const tab = document.getElementById('qreviewTab'); tab.style.display = 'block'; qrRender();
  await new Promise(r => setTimeout(r, 300));
  const s = tab.querySelector('select'); s.value = grade; s.dispatchEvent(new Event('change', { bubbles:true }));
  await new Promise(r => setTimeout(r, 300));
  const OB = window.Blob; let got = null; window.Blob = function(p, o){ got = p.join(''); return new OB(p, o); };
  const oc = HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click = function(){};
  try { [...tab.querySelectorAll('button')].find(b => b.textContent.trim() === '내보내기').click(); }
  finally { window.Blob = OB; HTMLAnchorElement.prototype.click = oc; }
  await fetch('http://127.0.0.1:8977/' + name, { method:'POST', body:got });
  return JSON.parse(got).items.length;
}
async function qrImportText(txt){
  const tab = document.getElementById('qreviewTab'); tab.style.display = 'block'; qrRender();
  await new Promise(r => setTimeout(r, 300));
  let cap = null; const oc = HTMLInputElement.prototype.click;
  HTMLInputElement.prototype.click = function(){ if(this.type === 'file') cap = this; else oc.call(this); };
  [...tab.querySelectorAll('button')].find(b => b.textContent.trim() === '불러오기').click();
  HTMLInputElement.prototype.click = oc;
  const dt = new DataTransfer(); dt.items.add(new File([txt], 'm.json', { type:'application/json' })); cap.files = dt.files;
  window.confirm = () => true; window.alert = () => {};
  cap.dispatchEvent(new Event('change', { bubbles:true }));
  await new Promise(r => setTimeout(r, 800));
}
