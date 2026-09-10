// Static visual snapshots of the real DOM after offline test interactions.
const fs=require('node:fs'),path=require('node:path');
const {boot,tick,root}=require('./smoke.cjs');
const out=process.env.UI_VISUAL_DIR||path.join(root,'tools/ui-integration/visuals');
fs.mkdirSync(out,{recursive:true});
async function main(){
  const a=await boot();
  function capture(name){
    const doc=a.w.document.cloneNode(true);
    doc.querySelectorAll('script').forEach(el=>el.remove());
    doc.querySelectorAll('input[type=password]').forEach(el=>el.setAttribute('value',''));
    const link=doc.querySelector('link[href^="ui-integration/"]');if(link)link.remove();
    const style=doc.createElement('style');style.textContent=fs.readFileSync(path.join(root,'ui-integration/app-ui.css'),'utf8');doc.head.appendChild(style);
    fs.writeFileSync(path.join(out,name+'.html'),'<!doctype html>\n'+doc.documentElement.outerHTML);
    fs.writeFileSync(path.join(out,name+'-mobile.html'),'<!doctype html><meta charset="utf-8"><title>390px mobile visual check</title><style>body{margin:0;background:#e4eaf4;display:grid;place-items:center}iframe{width:390px;height:850px;border:0;background:white;max-width:100vw}</style><iframe title="390px mobile" src="'+name+'.html"></iframe>');
  }
  try{
    capture('login');
    a.ev("session.student={id:'visual-test',name:'연습',grade:'초3'};enterStudentView()");
    await tick();await a.action('grades');await a.action('grade','[data-grade="e3-1"]');await a.action('big');await a.action('small');capture('questions');
    await a.action('home');capture('student-home');await a.action('continue');capture('lesson');
    a.ev("session.teacher=true;session.role='owner';showView('viewTeacher')");capture('teacher-home');
    a.w.DD_UI.showTeacher('students');await a.action('teacher-register');capture('teacher-register');
    a.w.DD_UI.showTeacher('cards');a.$('ceSearch').value='E3111';a.$('ceGo').click();capture('teacher-editor');
    console.log(out);
  }finally{a.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1});
