// Offline DOM harness: real original scripts/listeners, network disabled.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const {webcrypto}=require('node:crypto');
const {JSDOM,VirtualConsole}=require(process.env.JSDOM_PATH||'jsdom');
const root=path.resolve(__dirname,'../..');
const html=fs.readFileSync(path.join(root,'dodream.html'),'utf8');
const adapter=fs.readFileSync(path.join(root,'ui-integration/app-ui.js'),'utf8');
const tick=(ms=30)=>new Promise(r=>setTimeout(r,ms));
async function boot(query='',saved={},options={}) {
  const errors=[],logs=[];const vc=new VirtualConsole();
  vc.on('jsdomError',e=>errors.push(e.message));
  for(const name of ['error','warn'])vc.on(name,(...args)=>logs.push([name,...args.map(String)]));
  const dom=new JSDOM(html,{url:'https://offline.test/dodream.html'+query,runScripts:'dangerously',virtualConsole:vc,pretendToBeVisual:true,beforeParse(w){
    w.fetch=async()=>{throw new Error('Offline test: network disabled')};
    if(options.speech)w.SpeechRecognition=class {start(){}stop(){}};
    w.TextEncoder=TextEncoder;w.TextDecoder=TextDecoder;
    Object.defineProperty(w.crypto,'subtle',{value:webcrypto.subtle});
    w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
    w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
    w.alert=msg=>logs.push(['alert',String(msg)]);w.confirm=()=>true;
    for(const [k,v]of Object.entries(saved))w.localStorage.setItem(k,v);
  }});
  const w=dom.window;const script=w.document.createElement('script');script.textContent=adapter;w.document.body.appendChild(script);
  await tick(80);
  const $=id=>w.document.getElementById(id),ev=code=>w.eval(code);
  const action=async(name,attrs='')=>{const b=w.document.querySelector('[data-dd-ui="'+name+'"]'+attrs);assert.ok(b,'button '+name+attrs+' exists');b.click();await tick();return b;};
  return {dom,w,$,ev,errors,logs,action,close:()=>dom.window.close()};
}
if(require.main===module)boot().then(a=>{try{assert.deepEqual(a.errors,[]);assert.ok(a.w.DD_UI);console.log('PASS: original app + UI boots');}finally{a.close();}}).catch(e=>{console.error(e);process.exitCode=1});
module.exports={boot,tick,root,html};
