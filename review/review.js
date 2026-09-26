/* ============================================================
   [v82.9] 질문 고르기 (qr~) — 마스터 전용 화면
   ------------------------------------------------------------
   무엇: 한 소단원의 모든 말하기 질문(기본·깊이·유형별)을 한 자리에 펼쳐 놓고
         ① 회차(1/2/3) 배정 ② 빼기(숨김) ③ 문장 고치기 ④ 순서 바꾸기 를 하는 화면.
   원칙: 기존 코드와 격리한다. dodream.html 은 script 태그 한 줄만 늘어난다.
         이 화면은 학생 화면을 아무것도 바꾸지 않는다 — 고른 결과는 내보내기로 나가고,
         앱에 심는 것은 따로 한다(편집기 수정본이 그 기기에만 남는 문제를 피하려고).
   저장(이 기기 localStorage):
     qr:plan:v1  { 질문번호: {r:1|2|3, off:true} }   회차·빼기
     qr:edits:v1 { 질문번호: "고친 문장" }            문장 고치기
     qr:seen:v1  { 개념코드: true }                   "다 봤음" 표시
     qr:order:v1 { 개념코드: [질문번호, …] }           질문 순서 (같은 종류 안에서만 바꾼다)
     qr:answers:v1 { 질문번호: {a:"모범 답", k:["꼭 말할 핵심", …]} }   [v83.8]
     qr:added:v1 { 개념코드: [{id, q}, …] }   새로 추가한 질문 [v83.9]
       번호 = 개념 해시 + ':' + ddqNewId('qa') — 처음부터 붙여서, 앱에 심어도 기록이 안 끊긴다.
       지운 번호는 다시 쓰지 않는다(시각+난수).
     qr:ok:v1    { 질문번호: true }   [v84.3] 마스터가 "확인했음" 체크한 질문 — 확인한 줄은 접어서 다시 안 읽게
     qr:view     "보기" 선택을 기억 (새로 열어도 「확인 안 한 것만」 그대로)
     qr:base:v1  { 분류안키: 넣은시각 }   [v84.0] 코드에 실어 둔 분류안(review/plan_*.js)을 이 기기에 넣었는지
   [v84.0] 기본 분류안: window.QR_BASE_PLANS 의 분류안을 화면을 열 때 한 번만 넣는다.
     이 기기에 이미 적어 둔 회차·고친 문장·모범 답·빼기·순서는 덮지 않는다(keepLocal).
     by:'claude' 인 회차는 줄에 「AI」 표시 — 마스터가 회차를 바꾸면 표시가 사라진다.
   [v83.8] 회차 재구성(2026-09-17 결정) 준비:
     · 기본·깊이·유형별은 처음에 "미분류"(r=0) — 계단만 3회차로 시작
     · [불러오기] — 분류 결과 파일을 한 번에 넣는다. 옛 형식(qr-plan-1)은 회차를 안 가져온다
       (그 파일의 회차는 전부 옛 기본값이라 가져오면 미분류를 덮어 버린다)
     · 질문마다 모범 답 + 꼭 말할 핵심(2~3개) 칸
   ============================================================ */
(function(){
  'use strict';

  var PLAN_KEY = 'qr:plan:v1', EDIT_KEY = 'qr:edits:v1', SEEN_KEY = 'qr:seen:v1', ORDER_KEY = 'qr:order:v1';
  var ROUNDS = 3;                       // 학원이 3회 반복 시스템이라 3회차 (마스터 결정 2026-09-16)
  var SIM_THRESHOLD = 0.5;              // 이 이상 겹치면 "비슷한 질문"으로 묶는다

  function ssGet(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } }
  function ssSet(k, v){ try{ sessionStorage.setItem(k, v); }catch(e){} }
  // [v85.4] 새로고침해도 보던 학년·대단원 그대로 (이 탭 안에서만)
  var QR = { grade:ssGet('qr:grade') || null, big:parseInt(ssGet('qr:big') || '0', 10) || 0, view:(function(){ try{ return localStorage.getItem('qr:view') || 'all'; }catch(e){ return 'all'; } })(), query:'' };
  // 고치기 칸에서 눌러 넣는 기호 (분수 1/2 · 제곱 cm^2 은 그냥 치면 되므로 뺐다)
  var SYMS = ['×','÷','−','±','≤','≥','≠','°','π','√','∠','△','⊥','∥','∽','≡','㎝','①','②','③'];

  /* ── 저장소 ───────────────────────────────────────────── */
  function load(k){ try{ return JSON.parse(localStorage.getItem(k) || '{}'); }catch(e){ return {}; } }
  function save(k, o){ try{ localStorage.setItem(k, JSON.stringify(o)); }catch(e){} }
  var ANS_KEY = 'qr:answers:v1', ADD_KEY = 'qr:added:v1', BASE_KEY = 'qr:base:v1';
  var PLAN = load(PLAN_KEY), EDITS = load(EDIT_KEY), SEEN = load(SEEN_KEY), ORDER = load(ORDER_KEY), ANS = load(ANS_KEY), ADDED = load(ADD_KEY);
  var BASEDONE = load(BASE_KEY);
  var OK_KEY = 'qr:ok:v1', OK = load(OK_KEY);
  function setOk(qid, on){ if(on) OK[qid] = true; else delete OK[qid]; save(OK_KEY, OK); }
  // [v88.4] 🤔 Claude 가 자신 없는 질문 { 질문번호: '왜 자신 없는지 한 줄' }
  //   review/ask_<학년>.js 에 실려 온다. 이 기기에 저장하지 않는다(코드가 정본).
  //   마스터는 보기 「🤔 AI가 자신 없는 것만」으로 이것만 보고, 나머지는 [🤔 빼고 전부 확인] 한 번이면 된다.
  function askOf(qid){ try{ return (window.QR_ASK || {})[qid] || ''; }catch(e){ return ''; } }
  // [v88.7] 🌱 선수 개념 질문 (앞 학년·앞 단원에서 배운 것) — review/pre_<학년>.js 의 window.QR_PRE
  function preOf(qid){ try{ return (window.QR_PRE || {})[qid] || null; }catch(e){ return null; } }
  // [v88.9] 질문에 붙은 그림 (review/fig_<학년>.js 의 window.QR_FIG) — 학생 화면과 같은 표.
  //   마스터가 "질문 + 그림"을 함께 보고 판단해야 해서 고르기 화면에도 그린다.
  function figOf(qid){ try{ var f = (window.QR_FIG || {})[qid]; return (f && f.svg) ? f.svg : null; }catch(e){ return null; } }
  // Claude 가 정한 회차 {질문번호: 회차} — 코드에 실린 분류안에서 읽는다(저장 안 함)
  var AI_OFF = {};   // Claude 가 겹쳐서 뺀 질문 {질문번호: true}
  var AI_Q = {};     // Claude 가 고친 질문 문장 {질문번호: 문장} — 마스터가 다시 고치면 표시가 사라진다
  var AI_ANS = {};   // Claude 가 쓴 모범 답 {질문번호: 모범 답} — 마스터가 고치면 표시가 사라진다
  function aiRounds(){
    var out = {};
    (window.QR_BASE_PLANS || []).forEach(function(b){
      ((b && b.data && b.data.items) || []).forEach(function(x){
        if(x && x.by === 'claude' && x.round) out[x.id] = x.round;
        if(x && x.offBy === 'claude' && x.off) AI_OFF[x.id] = true;
        if(x && x.answerBy === 'claude' && x.answer) AI_ANS[x.id] = x.answer;
        if(x && x.newQBy === 'claude' && x.newQ) AI_Q[x.id] = x.newQ;
      });
    });
    return out;
  }
  var AI_R = aiRounds();
  function isAi(qid, p){
    if(!p) return false;
    if(p.off) return !!AI_OFF[qid];              // Claude 가 뺀 것 — 마스터가 되살리면 표시가 사라진다
    return !!(AI_R[qid] && p.r === AI_R[qid]);
  }
  function newAddId(gradeId, bigName, smallName){
    var key; try{ key = ddqConceptKey(gradeId, bigName, smallName); }catch(e){ key = 'qr'; }
    var tail; try{ tail = ddqNewId('qa'); }catch(e){ tail = 'qa' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
    return key + ':' + tail;
  }
  function findAdded(qid){
    for(var code in ADDED){
      var list = ADDED[code] || [];
      for(var i = 0; i < list.length; i++) if(list[i].id === qid) return { code:code, list:list, i:i };
    }
    return null;
  }

  // 기본값 [v83.8]: 계단→3회차 · 나머지(기본·깊이·유형별)→미분류(0)
  function defRound(kind){ return kind === 'ladder' ? ROUNDS : 0; }
  function planOf(qid, kind){
    var p = PLAN[qid] || {};
    return { r: p.r || defRound(kind), off: !!p.off, touched: (p.r != null || p.off != null) };
  }
  function ansOf(qid){
    var x = ANS[qid] || {};
    return { a: x.a || '', k: (x.k || []).filter(function(s){ return String(s).trim(); }) };
  }
  function setAns(qid, a, k){
    a = String(a || '').trim();
    k = (k || []).map(function(s){ return String(s).trim(); }).filter(Boolean);
    if(a || k.length){ ANS[qid] = { a:a, k:k }; } else { delete ANS[qid]; }
    save(ANS_KEY, ANS);
  }
  function setPlan(qid, patch){
    var p = PLAN[qid] || {};
    for(var k in patch){ if(patch[k] == null) delete p[k]; else p[k] = patch[k]; }
    if(Object.keys(p).length) PLAN[qid] = p; else delete PLAN[qid];
    save(PLAN_KEY, PLAN);
  }
  function textOf(item){ return EDITS[item.id] != null ? EDITS[item.id] : item.q; }

  /* ── 비슷한 질문 찾기 (AI 안 씀 — 글자 겹침만 본다) ────── */
  function norm(t){ return String(t || '').replace(/[\s.,?!·'"“”‘’()\[\]{}~\-—:;①②③④⑤]/g, ''); }
  function grams(t){ var s = {}, i; for(i = 0; i < t.length - 1; i++) s[t.slice(i, i + 2)] = 1; return s; }
  function sim(a, b){
    var A = grams(norm(a)), B = grams(norm(b)), inter = 0, k;
    var ka = Object.keys(A), kb = Object.keys(B);
    if(!ka.length || !kb.length) return 0;
    for(k in A) if(B[k]) inter++;
    return inter / (ka.length + kb.length - inter);
  }
  // 소단원 안에서 비슷한 것끼리 묶어 그룹 번호를 준다 (없으면 0)
  function groupSimilar(items){
    var g = items.map(function(){ return 0; }), next = 1, i, j;
    for(i = 0; i < items.length; i++){
      for(j = i + 1; j < items.length; j++){
        if(sim(textOf(items[i]), textOf(items[j])) >= SIM_THRESHOLD){
          if(!g[i] && !g[j]){ g[i] = g[j] = next++; }
          else if(g[i] && !g[j]) g[j] = g[i];
          else if(!g[i] && g[j]) g[i] = g[j];
        }
      }
    }
    return g;
  }

  /* ── 데이터 모으기 ────────────────────────────────────── */
  function gradeList(){
    return (typeof GRADES !== 'undefined' ? GRADES : []).filter(function(x){
      try{ var m = cpModel(x.id); return !!(m && m.bigUnits && m.bigUnits.length); }catch(e){ return false; }
    });
  }
  function kindLabel(it){
    if(it.kind === 'low') return '기본';
    if(it.kind === 'high') return '깊이';
    if(it.kind === 'add') return '추가';
    if(it.kind === 'ladder') return '계단' + (it.type ? '·' + it.type : '');
    var L = (typeof QTYPE_LABEL !== 'undefined' && QTYPE_LABEL[it.type]) || it.type || '';
    return '유형' + (L ? '·' + L : '');
  }
  // 한 소단원의 질문 전부 (기본 → 깊이 → 유형별 → 계단 순)
  //   계단 칸의 번호는 앱이 기록에 쓰는 것과 같은 모양으로 맞춘다: ladder:<학년|대단원|소단원>:<칸>
  function itemsOf(gradeId, bigName, small){
    var it = ddqItemsFor(gradeId, bigName, small), out = [];
    (it.low  || []).forEach(function(x){ out.push({ id:x.id, q:x.q, kind:'low',  ti:x.ti, index:x.index }); });
    (it.high || []).forEach(function(x){ out.push({ id:x.id, q:x.q, kind:'high', ti:x.ti, index:x.index }); });
    (it.qset || []).forEach(function(x){ out.push({ id:x.id, q:x.q, kind:'qset', type:x.type, index:x.index }); });
    (ADDED[conceptCode(gradeId, bigName, small.name)] || []).forEach(function(x, i){
      if(x && x.id && x.q) out.push({ id:x.id, q:x.q, kind:'add', index:i });
    });
    try{
      var key = gradeId + '|' + bigName + '|' + small.name;
      var steps = (window.DL_LADDERS || {})[key] || [];
      steps.forEach(function(st, i){
        if(st && st.q) out.push({ id:'ladder:' + key + ':' + (i + 1), q:st.q, kind:'ladder', type:st.kind, index:i });
      });
    }catch(e){}
    // 글자가 똑같은 질문이 두 번 나오면 뒤엣것을 버린다.
    //   초3-1 처럼 한 소단원에 유형(types)이 2개 이상이면 같은 low/high 목록이 되풀이되어 딸려 온다.
    //   (마스터가 이 중복을 손으로 빼고 있었다 — 2026-09-16)
    var seenQ = {};
    return out.filter(function(x){
      if(!x.id || !x.q) return false;
      var k = String(x.q).replace(/\s+/g, '');
      if(seenQ[k]) return false;
      seenQ[k] = 1; return true;
    });
  }
  // 저장된 순서를 얹은 목록 (없으면 원래 순서: 기본 → 깊이 → 유형별)
  function orderedItems(gradeId, bigName, sm, code){
    var items = itemsOf(gradeId, bigName, sm), ord = ORDER[code];
    if(!ord || !ord.length) return items;
    var pos = {}; ord.forEach(function(id, i){ pos[id] = i; });
    return items.map(function(it, i){ return { it:it, k: (pos[it.id] != null ? pos[it.id] : ord.length + i) }; })
      .sort(function(a, b){ return a.k - b.k; })
      .map(function(x){ return x.it; });
  }
  // 같은 종류(기본/깊이/유형별) 안에서만 한 칸 올리고 내린다
  function moveItem(code, items, qid, dir){
    var ids = items.map(function(x){ return x.id; });
    var i = ids.indexOf(qid); if(i < 0) return false;
    var j = i + dir;
    if(j < 0 || j >= items.length || items[j].kind !== items[i].kind) return false;
    var t = ids[i]; ids[i] = ids[j]; ids[j] = t;
    ORDER[code] = ids; save(ORDER_KEY, ORDER);
    return true;
  }
  function smallsOf(big){
    var out = [];
    cpBigMiddles(big).forEach(function(mid){
      (mid.smalls || []).forEach(function(sm){ out.push({ sm:sm, middle:mid.name || '' }); });
    });
    return out;
  }
  function conceptCode(gradeId, bigName, smallName){
    try{ return ceCode(gradeId, bigName, smallName) || (gradeId + '|' + bigName + '|' + smallName); }
    catch(e){ return gradeId + '|' + bigName + '|' + smallName; }
  }

  /* ── 요약 (지금 고른 학년 전체) ───────────────────────── */
  function summary(gradeId){
    var s = { r0:0, r1:0, r2:0, r3:0, off:0, total:0, edited:0, answered:0, ok:0, smalls:0, seen:0, empty:[], ask:0, askleft:0 };
    var m; try{ m = cpModel(gradeId); }catch(e){ return s; }
    if(!m || !m.bigUnits) return s;
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        s.smalls++;
        if(SEEN[conceptCode(gradeId, big.name, row.sm.name)]) s.seen++;
        var live1 = 0, unset = 0;
        itemsOf(gradeId, big.name, row.sm).forEach(function(it){
          var p = planOf(it.id, it.kind), an = ansOf(it.id);
          s.total++;
          if(OK[it.id]) s.ok++;
          if(askOf(it.id)){ s.ask++; if(!OK[it.id]) s.askleft++; }
          if(EDITS[it.id] != null) s.edited++;
          if(an.a || an.k.length) s.answered++;
          if(p.off){ s.off++; return; }
          if(p.r === 1){ s.r1++; live1++; } else if(p.r === 2) s.r2++; else if(p.r === 3) s.r3++; else { s.r0++; unset++; }
        });
        // 1회차 빈 경고는 그 소단원 분류를 다 끝낸 뒤에만 (미분류가 남아 있으면 아직 모른다)
        if(!live1 && !unset) s.empty.push(big.name + ' · ' + row.sm.name);
      });
    });
    return s;
  }

  /* ── 화면 ─────────────────────────────────────────────── */
  function esc(t){ return String(t == null ? '' : t).replace(/[&<>"]/g, function(c){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function show(t){ try{ return mfmt(String(t)); }catch(e){ return esc(t); } }

  function styles(){
    if(document.getElementById('qrStyle')) return;
    var css = ''
    + '#qreviewTab .qr-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px;}'
    + '#qreviewTab .qr-bar select,#qreviewTab .qr-bar input{padding:7px 10px;border:1px solid #DDD6EE;border-radius:9px;font-size:13px;font-family:inherit;width:auto;max-width:280px;flex:0 0 auto;background:#fff;}'
    + '#qreviewTab .qr-bar input{flex:1 1 150px;min-width:130px;max-width:none;}'
    + '@media (max-width:640px){#qreviewTab .qr-bar select,#qreviewTab .qr-bar input{max-width:none;flex:1 1 100%;}#qreviewTab .qr-row{flex-wrap:wrap;}#qreviewTab .qr-q{flex:1 1 100%;order:2;}#qreviewTab .qr-act{order:3;margin-left:0;flex:1 1 100%;flex-wrap:wrap;}}'
    + '#qreviewTab .qr-small{border:1px solid #E7E1F5;border-radius:14px;padding:13px 15px;margin-bottom:11px;background:#fff;}'
    + '#qreviewTab .qr-small.seen{background:#FAFAFD;border-color:#EFEBF8;}'
    + '#qreviewTab .qr-sh{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:4px;}'
    + '#qreviewTab .qr-sh b{font-size:14px;color:#2A2350;}'
    + '#qreviewTab .qr-mid{font-size:11.5px;color:#8A7BB0;}'
    + '#qreviewTab .qr-warn{font-size:11.5px;font-weight:800;color:#C0392B;background:#FDECEA;padding:2px 8px;border-radius:999px;}'
    + '#qreviewTab .qr-seenbtn{margin-left:auto;font-size:12px;padding:5px 11px;border-radius:999px;border:1px solid #D9CFF0;background:#fff;color:#6B5BA8;cursor:pointer;font-family:inherit;}'
    + '#qreviewTab .qr-seenbtn.on{background:#E9F5EE;border-color:#BFE3CE;color:#2C8459;font-weight:800;}'
    + '#qreviewTab .qr-cptoggle{font-size:12px;color:#6B5BA8;background:none;border:none;cursor:pointer;padding:2px 0;font-family:inherit;text-decoration:underline;}'
    + '#qreviewTab .qr-cp{background:#F7F4FE;border-radius:10px;padding:10px 12px;margin:7px 0 9px;font-size:12.5px;color:#4A4270;line-height:1.7;}'
    + '#qreviewTab .qr-cp ul{margin:5px 0 0 16px;padding:0;}'
    + '#qreviewTab .qr-row{display:flex;gap:9px;align-items:flex-start;padding:8px 0;border-top:1px solid #F1EDF9;}'
    + '#qreviewTab .qr-row.off{opacity:.42;}'
    + '#qreviewTab .qr-row.ok{background:#F6FBF8;}'
    + '#qreviewTab .qr-row.ok .qr-q{color:#6E7A74;}'
    + '#qreviewTab .qr-row.ok .qr-ans{display:none;}'
    + '#qreviewTab .qr-row.ok.open .qr-ans{display:block;}'
    + '#qreviewTab .qr-fig{margin:8px 0 2px;padding:8px 10px;background:#fff;border:1px solid #E7E3F3;border-radius:11px;display:block;max-width:340px;}'
    + '#qreviewTab .qr-fig svg{width:100%;height:auto;display:block;}'
    + '#qreviewTab .qr-figcnt{font-size:11.5px;font-weight:800;color:#1D6FA5;background:#E6F1F8;padding:2px 8px;border-radius:999px;}'
    + '#qreviewTab .qr-act button.okbtn{min-width:52px;}'
    + '#qreviewTab .qr-act button.okbtn.on{background:#2C8459;border-color:#2C8459;color:#fff;font-weight:800;}'
    + '#qreviewTab .qr-okall{font-size:12px;padding:5px 11px;border-radius:999px;border:1px solid #BFE3CE;background:#fff;color:#2C8459;cursor:pointer;font-family:inherit;}'
    + '#qreviewTab .qr-okcnt{font-size:11.5px;font-weight:800;color:#2C8459;}'
    + '#qreviewTab .qr-kind{flex:0 0 66px;font-size:11px;font-weight:800;color:#7343E6;background:#F4EFFF;border-radius:7px;padding:4px 0;text-align:center;}'
    + '#qreviewTab .qr-kind.k-high{color:#2C8459;background:#E9F5EE;}'
    + '#qreviewTab .qr-kind.k-qset{color:#B26B00;background:#FDF3E2;}'
    + '#qreviewTab .qr-kind.k-ladder{color:#1D6FA5;background:#E6F1F8;}'
    + '#qreviewTab .qr-kind.k-add{color:#A8326E;background:#FCEAF3;}'
    + '#qreviewTab .qr-ai{font-size:10.5px;font-weight:800;color:#1D6FA5;background:#E6F1F8;border-radius:6px;padding:3px 6px;}'
    + '#qreviewTab .qr-basenote{margin:0 0 12px;padding:9px 12px;border-radius:10px;background:#E6F1F8;color:#1D4E73;font-size:12.5px;line-height:1.6;}'
    + '#qreviewTab .qr-addbtn{font-size:12px;padding:5px 11px;border-radius:999px;border:1px dashed #C9B8EE;background:#FBF9FF;color:#6B5BA8;cursor:pointer;font-family:inherit;}'
    + '#qreviewTab .qr-newrow{display:block;background:#FBF9FF;border-radius:10px;padding:10px 12px;margin-top:6px;border-top:none;}'
    + '#qreviewTab .qr-kind{flex-basis:78px;}'
    + '#qreviewTab .qr-q{flex:1;min-width:0;font-size:13.5px;color:#2A2350;line-height:1.65;}'
    + '#qreviewTab .qr-q.edited{border-left:3px solid #7343E6;padding-left:8px;}'
    + '#qreviewTab .qr-sim{display:inline-block;font-size:10.5px;font-weight:800;color:#C0392B;background:#FDECEA;border-radius:6px;padding:1px 6px;margin-right:5px;}'
    + '#qreviewTab .qr-act{flex:0 0 auto;display:flex;gap:4px;align-items:center;}'
    + '#qreviewTab .qr-act button{font-size:12px;padding:5px 9px;border-radius:8px;border:1px solid #DDD6EE;background:#fff;color:#6B5BA8;cursor:pointer;font-family:inherit;}'
    + '#qreviewTab .qr-act button.on{background:#7343E6;border-color:#7343E6;color:#fff;font-weight:800;}'
    + '#qreviewTab .qr-act button.off-on{background:#C0392B;border-color:#C0392B;color:#fff;font-weight:800;}'
    + '#qreviewTab .qr-act button[disabled]{opacity:.28;cursor:default;}'
    + '#qreviewTab .qr-ed{width:100%;box-sizing:border-box;font-family:inherit;font-size:13.5px;line-height:1.6;padding:8px 10px;border:1px solid #B9A6E8;border-radius:9px;}'
    + '#qreviewTab .qr-edrow{display:flex;gap:6px;margin-top:6px;}'
    + '#qreviewTab .qr-foot{position:sticky;bottom:0;background:#fff;border-top:1px solid #E7E1F5;padding:11px 2px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:12.5px;color:#4A4270;}'
    + '#qreviewTab .qr-foot b{color:#2A2350;}'
    + '#qreviewTab .qr-foot .sp{margin-left:auto;display:flex;gap:7px;}'
    + '#qreviewTab .qr-empty{padding:26px 6px;color:#8A7BB0;font-size:13px;}'
    + '#qreviewTab .qr-note{margin:-6px 0 11px;font-size:12px;color:#8A7BB0;}'
    + '#qreviewTab .qr-syms{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;}'
    + '#qreviewTab .qr-syms button{min-width:30px;padding:5px 7px;font-size:14px;line-height:1;border:1px solid #DDD6EE;border-radius:7px;background:#fff;color:#2A2350;cursor:pointer;font-family:inherit;}'
    + '#qreviewTab .qr-syms button:hover{background:#F4EFFF;}'
    + '#qreviewTab .qr-tip{margin:0 0 6px;font-size:11.5px;color:#8A7BB0;}'
    + '#qreviewTab .qr-tip b{color:#6B5BA8;}'
    + '#qreviewTab .qr-prev{margin-top:6px;padding:8px 10px;background:#F7F4FE;border-radius:9px;font-size:13.5px;color:#2A2350;line-height:1.65;}'
    + '#qreviewTab .qr-unset{font-size:11px;font-weight:800;color:#8C8C99;background:#F0F0F4;border-radius:6px;padding:4px 7px;}'
    + '#qreviewTab .qr-act button.ans-on{background:#E9F5EE;border-color:#BFE3CE;color:#2C8459;font-weight:800;}'
    + '#qreviewTab .qr-ans{margin-top:6px;padding:7px 10px;background:#F3FAF6;border-left:3px solid #7CC49D;border-radius:0 8px 8px 0;font-size:12.5px;color:#2F4F3E;line-height:1.65;}'
    + '#qreviewTab .qr-ans ul{margin:3px 0 0 16px;padding:0;}'
    + '#qreviewTab .qr-ans .lb{font-weight:800;color:#2C8459;margin-right:4px;}'
    + '#qreviewTab .qr-lbl{display:block;margin:8px 0 3px;font-size:12px;font-weight:800;color:#4A4270;}'
    + '#qreviewTab .qr-lbl span{font-weight:400;color:#8A7BB0;}'
    + '#qreviewTab .qr-row.askon{background:#FFFCF2;box-shadow:inset 3px 0 0 #E8B84B;}'
    + '#qreviewTab .qr-row.askon.ok{background:#F5FAF7;box-shadow:inset 3px 0 0 #CFE3C8;}'
    + '#qreviewTab .qr-askn{margin:0 0 5px;padding:6px 9px;background:#FFF6DE;border-radius:8px;font-size:12px;color:#7A5A12;line-height:1.55;}'
    + '#qreviewTab .qr-askn b{color:#9A6B00;}'
    + '#qreviewTab .qr-askcnt{font-size:11.5px;font-weight:800;color:#9A6B00;background:#FFF3D4;padding:2px 8px;border-radius:999px;}'
    + '#qreviewTab .qr-okrest{font-size:12px;padding:5px 11px;border-radius:999px;border:1px solid #E8D9A8;background:#fff;color:#9A6B00;cursor:pointer;font-family:inherit;font-weight:800;}'
    + '#qreviewTab .qr-pre{font-size:10.5px;font-weight:800;color:#2C8459;background:#E9F5EE;border-radius:6px;padding:3px 7px;margin-right:5px;}'
    + '#qreviewTab .qr-precnt{font-size:11.5px;font-weight:800;color:#2C8459;background:#E9F5EE;padding:2px 8px;border-radius:999px;}';
    var st = document.createElement('style'); st.id = 'qrStyle'; st.textContent = css;
    document.head.appendChild(st);
  }

  function rowHtml(it, groupNo, canMove, isFirst, isLast){
    var p = planOf(it.id, it.kind);
    var edited = EDITS[it.id] != null;
    var an = ansOf(it.id), hasAns = !!(an.a || an.k.length);
    var btns = (!p.r && !p.off) ? '<span class="qr-unset" title="아직 회차를 안 골랐어요">미분류</span>'
      : (isAi(it.id, p) ? '<span class="qr-ai" title="Claude 가 정한 회차예요. 다른 번호를 누르면 마스터 선택으로 바뀌어요">AI</span>' : '');
    if(p.off && isAi(it.id, p)) btns = '<span class="qr-ai" title="옆 질문과 겹쳐서 Claude 가 뺐어요. 「뺌」을 누르면 되살아나요">AI 뺌</span>';
    for(var r = 1; r <= ROUNDS; r++){
      btns += '<button data-qr="round" data-r="' + r + '"' + (p.r === r && !p.off ? ' class="on" title="한 번 더 누르면 미분류로"' : '') + '>' + r + '</button>';
    }
    var ok = !!OK[it.id];
    var ask = askOf(it.id);
    return '<div class="qr-row' + (p.off ? ' off' : '') + (ok ? ' ok' : '') + (ask ? ' askon' : '') + '" data-qid="' + esc(it.id) + '" data-kind="' + esc(it.kind) + '"'
      + ' data-plain="' + esc(textOf(it)) + '">'
      + '<span class="qr-kind k-' + it.kind + '">' + esc(kindLabel(it)) + '</span>'
      + '<div class="qr-q' + (edited ? ' edited' : '') + '" data-qr="text">'
      +   (ask ? '<div class="qr-askn">🤔 <b>봐 주세요</b> — ' + esc(ask) + '</div>' : '')
      +   (function(){ var p = preOf(it.id);
             return p ? '<span class="qr-pre" title="앞 학년·앞 단원에서 배운 것을 확인하는 질문이에요">🌱 선수 개념 · ' + esc(p.from) + ' ' + esc(p.what) + '</span>' : ''; })()
      +   (groupNo ? '<span class="qr-sim" title="같은 소단원 안에 비슷한 질문이 있어요">비슷 ' + groupNo + '</span>' : '')
      +   (AI_Q[it.id] && EDITS[it.id] === AI_Q[it.id] ? '<span class="qr-ai" title="Claude 가 고친 문장이에요" style="margin-right:5px">AI 고침</span>' : '')
      +   show(textOf(it))
      +   (function(){ var g = figOf(it.id); return g ? '<div class="qr-fig">' + g + '</div>' : ''; })()
      +   (hasAns
            ? '<div class="qr-ans">' + (an.a ? '<span class="lb">모범 답</span>'
                + (AI_ANS[it.id] && AI_ANS[it.id] === an.a ? '<span class="qr-ai" title="Claude 가 쓴 모범 답이에요. 고치면 표시가 사라져요" style="margin-right:5px">AI</span>' : '')
                + show(an.a) : '')
              + (an.k.length ? '<div><span class="lb">꼭 말할 핵심</span><ul>' + an.k.map(function(k){ return '<li>' + show(k) + '</li>'; }).join('') + '</ul></div>' : '')
              + '</div>'
            : '')
      + '</div>'
      + '<div class="qr-act">'
      +   '<button class="okbtn' + (ok ? ' on' : '') + '" data-qr="ok" title="' + (ok ? '확인 표시 지우기' : '보고 괜찮으면 누르세요') + '">' + (ok ? '✓ 확인' : '확인') + '</button>'
      +   (ok && hasAns ? '<button data-qr="okopen" title="접어 둔 모범 답 보기">답 보기</button>' : '')
      +   btns
      +   (canMove
            ? '<button data-qr="up" title="같은 종류 안에서 위로"' + (isFirst ? ' disabled' : '') + '>↑</button>'
              + '<button data-qr="down" title="같은 종류 안에서 아래로"' + (isLast ? ' disabled' : '') + '>↓</button>'
            : '')
      +   (it.kind === 'add'
            ? '<button data-qr="del" title="추가한 질문을 완전히 지워요">지우기</button>'
            : '<button data-qr="off"' + (p.off ? ' class="off-on"' : '') + '>' + (p.off ? '뺌' : '빼기') + '</button>')
      +   '<button data-qr="edit">고치기</button>'
      +   '<button data-qr="ans"' + (hasAns ? ' class="ans-on"' : '') + '>모범 답</button>'
      + '</div></div>';
  }

  function smallHtml(gradeId, big, row, n){
    var sm = row.sm, code = conceptCode(gradeId, big.name, sm.name);
    var items = orderedItems(gradeId, big.name, sm, code);
    // 걸러 보거나 찾는 중이면 순서 바꾸기를 막는다 (보이는 게 전부가 아니라 헷갈린다)
    var canMove = (QR.view === 'all' && !QR.query);
    var seen = !!SEEN[code];
    var groups = groupSimilar(items);
    var live1 = items.filter(function(it){ var p = planOf(it.id, it.kind); return !p.off && p.r === 1; }).length;
    var unset = items.filter(function(it){ var p = planOf(it.id, it.kind); return !p.off && !p.r; }).length;

    var shown = items.filter(function(it){
      var p = planOf(it.id, it.kind);
      if(QR.view === 'unok') return !OK[it.id];
      if(QR.view === 'ask') return !!askOf(it.id);
      if(QR.view === 'pre') return !!preOf(it.id);
      if(QR.view === 'fig') return !!figOf(it.id);
      if(QR.view === 'off') return p.off;
      if(QR.view === 'r0') return !p.off && !p.r;
      if(QR.view === 'ai') return isAi(it.id, p);
      if(QR.view === 'noans'){ var a0 = ansOf(it.id); return !p.off && !(a0.a || a0.k.length); }
      if(QR.view === 'r1') return !p.off && p.r === 1;
      if(QR.view === 'r2') return !p.off && p.r === 2;
      if(QR.view === 'r3') return !p.off && p.r === 3;
      return true;
    }).filter(function(it){
      if(!QR.query) return true;
      return (textOf(it) + ' ' + sm.name).toLowerCase().indexOf(QR.query.toLowerCase()) >= 0;
    });
    if(QR.view === 'todo' && seen) return '';
    if(!shown.length) return '';

    var card = null; try{ card = ddGetCard(gradeId, big.name, sm.name); }catch(e){}
    var concept = card ? ((card.concepts && card.concepts[0]) || card.concept || '') : '';
    var kps = (card && card.keyPoints) || [];

    return '<div class="qr-small' + (seen ? ' seen' : '') + '" data-code="' + esc(code) + '"'
      + ' data-big="' + esc(big.name) + '" data-small="' + esc(sm.name) + '">'
      + '<div class="qr-sh"><b>' + esc(sm.name) + '</b>'
      +   (row.middle ? '<span class="qr-mid">' + esc(row.middle) + '</span>' : '')
      +   (function(){ var n = items.filter(function(x){ return x.kind === 'ladder'; }).length;
             return n ? '<span class="qr-mid">🪜 계단 ' + n + '칸 포함</span>' : ''; })()
      +   (unset ? '<span class="qr-mid">미분류 ' + unset + '</span>'
            : (live1 ? '' : '<span class="qr-warn">1회차가 비었어요</span>'))
      +   (function(){ var n = items.filter(function(x){ return figOf(x.id); }).length;
             return n ? '<span class="qr-figcnt">🖼 그림 ' + n + '</span>' : ''; })()
      +   (function(){ var n = items.filter(function(x){ return preOf(x.id); }).length;
             return n ? '<span class="qr-precnt">🌱 선수 개념 ' + n + '</span>' : ''; })()
      +   (function(){ var n = items.filter(function(x){ return askOf(x.id); }).length;
             return n ? '<span class="qr-askcnt">🤔 봐 주세요 ' + n + '</span>' : ''; })()
      +   (function(){ var n = items.filter(function(x){ return OK[x.id]; }).length;
             var rest = items.filter(function(x){ return !OK[x.id] && !askOf(x.id); }).length;
             return '<span class="qr-okcnt">확인 ' + n + '/' + items.length + '</span>'
               + (rest ? '<button class="qr-okrest" data-qr="okrest" title="🤔 표시가 없는 질문만 확인으로 (표시된 것은 그대로 남아요)">나머지 ' + rest + '개 다 좋아요</button>' : '')
               + (n < items.length ? '<button class="qr-okall" data-qr="okall" title="이 소단원 질문을 모두 확인으로">모두 확인</button>' : ''); })()
      +   '<button class="qr-addbtn" data-qr="addNew">+ 질문 추가</button>'
      +   '<button class="qr-seenbtn' + (seen ? ' on' : '') + '" data-qr="seen">' + (seen ? '✓ 다 봤음' : '다 봤음') + '</button>'
      + '</div>'
      + ((concept || kps.length)
          ? '<button class="qr-cptoggle" data-qr="cp">개념 설명 · 핵심 포인트 보기</button>'
            + '<div class="qr-cp" hidden>' + (concept ? show(concept) : '')
            + (kps.length ? '<ul>' + kps.map(function(k){ return '<li>' + show(k) + '</li>'; }).join('') + '</ul>' : '')
            + '</div>'
          : '')
      + shown.map(function(it){
            var i = items.indexOf(it);
            var first = !(items[i - 1] && items[i - 1].kind === it.kind);
            var last  = !(items[i + 1] && items[i + 1].kind === it.kind);
            return rowHtml(it, groups[i], canMove, first, last);
          }).join('')
      + '</div>';
  }

  function render(){
    var host = document.getElementById('qreviewTab');
    if(!host) return;
    styles();
    applyBase();
    var gs = gradeList();
    if(!QR.grade) QR.grade = (gs[0] || {}).id;
    var m = null; try{ m = cpModel(QR.grade); }catch(e){}
    var bigs = (m && m.bigUnits) || [];
    if(QR.big >= bigs.length) QR.big = 0;
    var big = bigs[QR.big];
    var s = summary(QR.grade);

    var html = '<div class="page-head"><div class="page-title">질문 고르기 '
      + '<span class="sub">회차(1·2·3) 배정 · 빼기 · 문장 고치기 — 학생 화면은 바뀌지 않아요</span></div></div>'
      + '<div class="qr-bar">'
      +   '<select data-qr="grade">' + gs.map(function(g){
            return '<option value="' + esc(g.id) + '"' + (g.id === QR.grade ? ' selected' : '') + '>' + esc(g.name) + '</option>'; }).join('') + '</select>'
      +   '<select data-qr="big">' + bigs.map(function(b, i){
            return '<option value="' + i + '"' + (i === QR.big ? ' selected' : '') + '>' + esc(b.name) + '</option>'; }).join('') + '</select>'
      +   '<select data-qr="view">' + [['all','전체'],['ask','🤔 AI가 자신 없는 것만'],['pre','🌱 선수 개념만'],['fig','🖼 그림 있는 것만'],['unok','확인 안 한 것만'],['todo','아직 안 본 소단원만'],['ai','AI가 정한 것만(뺀 것 포함)'],['r0','미분류만'],['noans','모범 답 없는 것만'],['off','뺀 것만'],['r1','1회차만'],['r2','2회차만'],['r3','3회차만']].map(function(x){
            return '<option value="' + x[0] + '"' + (x[0] === QR.view ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select>'
      +   '<input data-qr="query" type="text" placeholder="질문 안에서 찾기" value="' + esc(QR.query) + '">'
      + '</div>'
      + (QR.baseNote ? '<p class="qr-basenote">' + QR.baseNote + '</p>' : '')
      + ((QR.view !== 'all' || QR.query)
          ? '<p class="qr-note">걸러 보는 중에는 순서(↑↓)를 바꿀 수 없어요. 순서를 바꾸려면 「전체」로 두세요.</p>' : '');

    if(!big){ html += '<div class="qr-empty">이 학년에는 단원이 없어요.</div>'; }
    else {
      var n = 0, body = smallsOf(big).map(function(row){ n++; return smallHtml(QR.grade, big, row, n); }).join('');
      html += body || '<div class="qr-empty">보기 조건에 맞는 질문이 없어요.</div>';
    }

    html += '<div class="qr-foot">'
      + '<span>' + esc((gs.find(function(g){ return g.id === QR.grade; }) || {}).name || '') + ' 전체 — '
      + '미분류 <b>' + s.r0 + '</b> · 1회차 <b>' + s.r1 + '</b> · 2회차 <b>' + s.r2 + '</b> · 3회차 <b>' + s.r3 + '</b> · 뺀 것 <b>' + s.off + '</b>'
      + ' · 확인 <b>' + s.ok + ' / ' + s.total + '</b>'
      + (s.ask ? ' · 🤔 봐 주세요 <b>' + s.askleft + ' / ' + s.ask + '</b>' : '')
      + ' · 고친 문장 <b>' + s.edited + '</b> · 모범 답 <b>' + s.answered + '</b> · 다 본 소단원 <b>' + s.seen + ' / ' + s.smalls + '</b></span>'
      + (s.empty.length ? '<span class="qr-warn">1회차 빈 소단원 ' + s.empty.length + '개</span>' : '')
      + '<span class="sp">'
      +   (s.ask ? '<button class="nbtn" data-qr="okrestall" title="지금 보고 있는 대단원에서 🤔 표시가 없는 질문을 모두 확인으로 바꿔요">🤔 빼고 전부 확인</button>' : '')
      +   '<button class="nbtn" data-qr="import">불러오기</button>'
      +   '<button class="nbtn" data-qr="export">내보내기</button>'
      +   '<button class="nbtn" data-qr="reset">이 학년 되돌리기</button>'
      + '</span></div>';

    host.innerHTML = html;
  }

  /* ── 클릭·입력 ────────────────────────────────────────── */
  function closestSmall(el){ return el.closest ? el.closest('.qr-small') : null; }
  // 대단원·소단원 이름으로 그 줄(row)을 되찾는다 — 보기로 걸러 안 보이는 질문까지 다루려고
  function findRow(bigName, smallName){
    var m = null; try{ m = cpModel(QR.grade); }catch(e){}
    var big = ((m && m.bigUnits) || []).filter(function(b){ return b.name === bigName; })[0];
    if(!big) return null;
    return smallsOf(big).filter(function(r){ return r.sm.name === smallName; })[0] || null;
  }

  function onClick(e){
    var host = document.getElementById('qreviewTab');
    if(!host || host.style.display === 'none' || !host.contains(e.target)) return;
    var btn = e.target.closest('[data-qr]');
    if(!btn) return;
    var act = btn.getAttribute('data-qr');
    var rowEl = btn.closest('.qr-row');
    var qid = rowEl ? rowEl.getAttribute('data-qid') : null;

    if(act === 'round' && qid){
      var rr = parseInt(btn.getAttribute('data-r'), 10);
      var kd = rowEl.getAttribute('data-kind') || 'low';
      var p0 = planOf(qid, kd);
      // 이미 켜진 회차를 한 번 더 누르면 미분류로 (계단은 기본값 3으로)
      if(p0.r === rr && !p0.off) setPlan(qid, { r: null, off: null });
      else setPlan(qid, { r: rr, off: null });
      var y0 = window.scrollY; render(); window.scrollTo(0, y0); return;
    }
    if(act === 'ans' && qid){ startAns(rowEl, qid); return; }
    if(act === 'ansSave' && qid){
      var ea = rowEl.querySelector('.qr-ed[data-f="a"]'), ek = rowEl.querySelector('.qr-ed[data-f="k"]');
      setAns(qid, ea ? ea.value : '', ek ? ek.value.split('\n') : []);
      var y1 = window.scrollY; render(); window.scrollTo(0, y1); return;
    }
    if(act === 'ansDel' && qid){
      if(!confirm('이 질문의 모범 답과 핵심을 지울까요?')) return;
      setAns(qid, '', []); var y2 = window.scrollY; render(); window.scrollTo(0, y2); return;
    }
    if(act === 'import'){ pickImport(); return; }
    if(act === 'off' && qid){
      var cur = planOf(qid, 'low');
      setPlan(qid, { off: cur.off ? null : true });
      render(); return;
    }
    if((act === 'up' || act === 'down') && qid){
      var sc = closestSmall(btn); if(!sc) return;
      var code = sc.getAttribute('data-code');
      var bigName = sc.getAttribute('data-big'), smallName = sc.getAttribute('data-small');
      var m2; try{ m2 = cpModel(QR.grade); }catch(e){ return; }
      var bigObj = (m2.bigUnits || []).filter(function(b){ return b.name === bigName; })[0];
      if(!bigObj) return;
      var smObj = smallsOf(bigObj).filter(function(r){ return r.sm.name === smallName; })[0];
      if(!smObj) return;
      if(moveItem(code, orderedItems(QR.grade, bigName, smObj.sm, code), qid, act === 'up' ? -1 : 1)){
        var y = window.scrollY; render(); window.scrollTo(0, y);
      }
      return;
    }
    if(act === 'sym' && rowEl){
      var ta2 = (LAST_ED && rowEl.contains(LAST_ED)) ? LAST_ED : rowEl.querySelector('.qr-ed'); if(!ta2) return;
      var c = btn.getAttribute('data-c');
      var a = ta2.selectionStart, b = ta2.selectionEnd;
      ta2.value = ta2.value.slice(0, a) + c + ta2.value.slice(b);
      ta2.focus(); ta2.setSelectionRange(a + c.length, a + c.length);
      updatePreview(rowEl);
      return;
    }
    if(act === 'edit' && qid){ startEdit(rowEl, qid); return; }
    if(act === 'addNew'){ startAdd(closestSmall(btn)); return; }
    if(act === 'addSave' && rowEl){
      var sc3 = closestSmall(btn); if(!sc3) return;
      var nv = (rowEl.querySelector('.qr-ed').value || '').trim();
      if(!nv){ alert('질문을 적어 주세요.'); return; }
      var code3 = sc3.getAttribute('data-code');
      var same = [].slice.call(sc3.querySelectorAll('.qr-row[data-plain]')).some(function(el){
        return el.getAttribute('data-plain').replace(/\s+/g, '') === nv.replace(/\s+/g, ''); });
      if(same){ alert('이 소단원에 글자가 똑같은 질문이 이미 있어요.'); return; }
      (ADDED[code3] = ADDED[code3] || []).push({ id: newAddId(QR.grade, sc3.getAttribute('data-big'), sc3.getAttribute('data-small')), q: nv });
      save(ADD_KEY, ADDED);
      var y3 = window.scrollY; render(); window.scrollTo(0, y3); return;
    }
    if(act === 'del' && qid){
      var fa = findAdded(qid); if(!fa) return;
      if(!confirm('추가한 질문을 지울까요?\n\n' + fa.list[fa.i].q + '\n\n(회차·모범 답도 같이 지워져요)')) return;
      fa.list.splice(fa.i, 1); if(!fa.list.length) delete ADDED[fa.code];
      delete PLAN[qid]; delete ANS[qid]; delete EDITS[qid];
      save(ADD_KEY, ADDED); save(PLAN_KEY, PLAN); save(ANS_KEY, ANS); save(EDIT_KEY, EDITS);
      var y4 = window.scrollY; render(); window.scrollTo(0, y4); return;
    }
    if(act === 'editSave' && qid && rowEl.getAttribute('data-kind') === 'add'){
      // 추가한 질문은 고친 문장을 따로 두지 않고 질문 자체를 바꾼다 (번호는 그대로)
      var fe = findAdded(qid), ev = (rowEl.querySelector('.qr-ed').value || '').trim();
      if(fe && ev){ fe.list[fe.i].q = ev; save(ADD_KEY, ADDED); }
      render(); return;
    }
    if(act === 'editSave' && qid){
      var ta = rowEl.querySelector('.qr-ed');
      var v = (ta.value || '').trim();
      if(v){ EDITS[qid] = v; } else { delete EDITS[qid]; }
      save(EDIT_KEY, EDITS); render(); return;
    }
    if(act === 'editCancel'){ render(); return; }
    if(act === 'editUndo' && qid){ delete EDITS[qid]; save(EDIT_KEY, EDITS); render(); return; }
    if(act === 'cp'){
      var box = btn.nextElementSibling;
      if(box){ box.hidden = !box.hidden; btn.textContent = box.hidden ? '개념 설명 · 핵심 포인트 보기' : '개념 설명 접기'; }
      return;
    }
    if(act === 'ok' && qid){
      setOk(qid, !OK[qid]);
      var y5 = window.scrollY; render(); window.scrollTo(0, y5); return;
    }
    if(act === 'okopen' && rowEl){ rowEl.classList.toggle('open'); btn.textContent = rowEl.classList.contains('open') ? '답 접기' : '답 보기'; return; }
    if(act === 'okall'){
      var sc5 = closestSmall(btn); if(!sc5) return;
      [].slice.call(sc5.querySelectorAll('.qr-row[data-qid]')).forEach(function(el){
        var id5 = el.getAttribute('data-qid'); if(id5 && id5 !== '__new__') OK[id5] = true; });
      // 보기로 걸러 안 보이는 질문까지 확인하지 않게, 지금 화면에 보이는 줄만
      save(OK_KEY, OK);
      var y6 = window.scrollY; render(); window.scrollTo(0, y6); return;
    }
    if(act === 'okrest'){
      var sc7 = closestSmall(btn); if(!sc7) return;
      var bg7 = sc7.getAttribute('data-big'), sn7 = sc7.getAttribute('data-small');
      var row7 = findRow(bg7, sn7); if(!row7) return;
      itemsOf(QR.grade, bg7, row7.sm).forEach(function(it){
        if(askOf(it.id)) return;                      // 🤔 표시된 것은 마스터가 볼 때까지 남긴다
        OK[it.id] = true;
      });
      save(OK_KEY, OK);
      var y7 = window.scrollY; render(); window.scrollTo(0, y7); return;
    }
    if(act === 'okrestall'){
      var m8 = null; try{ m8 = cpModel(QR.grade); }catch(e){}
      var big8 = ((m8 && m8.bigUnits) || [])[QR.big]; if(!big8) return;
      var todo = [];
      smallsOf(big8).forEach(function(row){
        itemsOf(QR.grade, big8.name, row.sm).forEach(function(it){
          if(!askOf(it.id) && !OK[it.id]) todo.push(it.id);
        });
      });
      if(!todo.length){ alert('이 대단원에는 확인할 것이 남아 있지 않아요.'); return; }
      if(!confirm(big8.name + '\n\n🤔 표시가 없는 질문 ' + todo.length + '개를 모두 「확인」으로 바꿀까요?\n(🤔 표시된 질문은 그대로 남습니다)')) return;
      todo.forEach(function(id){ OK[id] = true; });
      save(OK_KEY, OK);
      var y8 = window.scrollY; render(); window.scrollTo(0, y8); return;
    }
    if(act === 'seen'){
      var sc = closestSmall(btn); if(!sc) return;
      var code = sc.getAttribute('data-code');
      if(SEEN[code]) delete SEEN[code]; else SEEN[code] = true;
      save(SEEN_KEY, SEEN); render(); return;
    }
    if(act === 'export'){ doExport(); return; }
    if(act === 'reset'){ doReset(); return; }
  }

  function startEdit(rowEl, qid){
    var qEl = rowEl.querySelector('[data-qr="text"]');
    if(!qEl || rowEl.querySelector('.qr-ed')) return;
    // 화면에 보이는 글자는 mfmt 로 꾸민 것이라 그대로 쓰면 안 된다 → 원래 글자를 data-plain 에서 가져온다
    var raw = rowEl.getAttribute('data-plain') || '';
    qEl.innerHTML = '<div class="qr-syms">' + SYMS.map(function(c){
          return '<button type="button" data-qr="sym" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('')
        + '</div>'
      + '<p class="qr-tip">분수는 <b>1/2</b>, 대분수는 <b>2와 1/2</b>, 제곱은 <b>cm^2</b> 처럼 치면 앱이 알아서 그려요.</p>'
      + '<textarea class="qr-ed" rows="3">' + esc(raw) + '</textarea>'
      + '<div class="qr-prev" data-qr="prev">' + show(raw) + '</div>'
      + '<div class="qr-edrow">'
      +   '<button class="nbtn primary" data-qr="editSave">저장</button>'
      +   '<button class="nbtn" data-qr="editCancel">취소</button>'
      +   (EDITS[qid] != null ? '<button class="nbtn" data-qr="editUndo">원래대로</button>' : '')
      + '</div>';
    var ta = qEl.querySelector('.qr-ed'); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
  }

  // [v83.9] 새 질문 적는 칸 — 소단원 맨 아래에 붙는다
  function startAdd(sc){
    if(!sc || sc.querySelector('.qr-newrow')) return;
    var box = document.createElement('div');
    box.className = 'qr-row qr-newrow'; box.setAttribute('data-qid', '__new__');
    box.innerHTML = '<div class="qr-lbl" style="margin-top:0">새 질문 <span>— 처음엔 미분류로 들어가요</span></div>'
      + '<div class="qr-syms">' + SYMS.map(function(c){
          return '<button type="button" data-qr="sym" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('')
        + '</div>'
      + '<p class="qr-tip">분수는 <b>1/2</b>, 대분수는 <b>2와 1/2</b>, 제곱은 <b>cm^2</b> 처럼 치면 앱이 알아서 그려요.</p>'
      + '<textarea class="qr-ed" rows="3" placeholder="예) 곱셈과 나눗셈이 섞인 식은 어디서부터 계산해?"></textarea>'
      + '<div class="qr-prev" data-qr="prev"><span style="color:#B9AFD4">(비어 있음)</span></div>'
      + '<div class="qr-edrow">'
      +   '<button class="nbtn primary" data-qr="addSave">추가</button>'
      +   '<button class="nbtn" data-qr="editCancel">취소</button>'
      + '</div>';
    sc.appendChild(box);
    var ta = box.querySelector('.qr-ed'); ta.focus(); LAST_ED = ta;
  }

  // [v83.8] 모범 답 + 꼭 말할 핵심(한 줄에 하나) 적는 칸
  var LAST_ED = null;
  function startAns(rowEl, qid){
    var qEl = rowEl.querySelector('[data-qr="text"]');
    if(!qEl || rowEl.querySelector('.qr-ed')) return;
    var an = ansOf(qid);
    qEl.innerHTML = '<div style="margin-bottom:6px">' + show(rowEl.getAttribute('data-plain') || '') + '</div>'
      + '<div class="qr-syms">' + SYMS.map(function(c){
          return '<button type="button" data-qr="sym" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('')
        + '</div>'
      + '<label class="qr-lbl">모범 답 <span>— 한두 문장. 아이가 틀렸을 때 보여 줄 답</span></label>'
      + '<textarea class="qr-ed" data-f="a" rows="2">' + esc(an.a) + '</textarea>'
      + '<label class="qr-lbl">꼭 말할 핵심 <span>— 2~3개, 한 줄에 하나. 채점할 때 이것이 들어 있나 본다</span></label>'
      + '<textarea class="qr-ed" data-f="k" rows="3">' + esc(an.k.join('\n')) + '</textarea>'
      + '<div class="qr-prev" data-qr="prev"></div>'
      + '<div class="qr-edrow">'
      +   '<button class="nbtn primary" data-qr="ansSave">저장</button>'
      +   '<button class="nbtn" data-qr="editCancel">취소</button>'
      +   ((an.a || an.k.length) ? '<button class="nbtn" data-qr="ansDel">지우기</button>' : '')
      + '</div>';
    updatePreview(rowEl);
    var ta = qEl.querySelector('.qr-ed'); ta.focus(); LAST_ED = ta;
  }

  function updatePreview(rowEl){
    var pv = rowEl.querySelector('[data-qr="prev"]'); if(!pv) return;
    var ea = rowEl.querySelector('.qr-ed[data-f="a"]'), ek = rowEl.querySelector('.qr-ed[data-f="k"]');
    if(ea || ek){
      var ks = (ek ? ek.value.split('\n') : []).map(function(s){ return s.trim(); }).filter(Boolean);
      pv.innerHTML = (ea && ea.value.trim() ? '<b>모범 답</b> ' + show(ea.value) : '<span style="color:#B9AFD4">(모범 답 비어 있음)</span>')
        + (ks.length ? '<ul style="margin:4px 0 0 16px;padding:0">' + ks.map(function(k){ return '<li>' + show(k) + '</li>'; }).join('') + '</ul>'
                     : '<div style="color:#B9AFD4">(핵심 비어 있음)</div>')
        + (ks.length > 3 ? '<div style="color:#C0392B;font-size:12px">핵심이 ' + ks.length + '개예요 — 2~3개가 좋아요</div>' : '');
      return;
    }
    var ta = rowEl.querySelector('.qr-ed');
    if(ta) pv.innerHTML = show(ta.value) || '<span style="color:#B9AFD4">(비어 있음)</span>';
  }
  function onChange(e){
    var host = document.getElementById('qreviewTab');
    if(!host || !host.contains(e.target)) return;
    var k = e.target.getAttribute('data-qr');
    if(k === 'grade'){ QR.grade = e.target.value; QR.big = 0; ssSet('qr:grade', QR.grade); ssSet('qr:big', '0'); render(); }
    else if(k === 'big'){ QR.big = parseInt(e.target.value, 10) || 0; ssSet('qr:big', String(QR.big)); render(); }
    else if(k === 'view'){ QR.view = e.target.value; try{ localStorage.setItem('qr:view', QR.view); }catch(e2){} render(); }
  }
  function onInput(e){
    var host = document.getElementById('qreviewTab');
    if(!host || !host.contains(e.target)) return;
    if(e.target.classList && e.target.classList.contains('qr-ed')){
      LAST_ED = e.target;
      var row = e.target.closest('.qr-row'); if(row) updatePreview(row);
      return;
    }
    if(e.target.getAttribute('data-qr') !== 'query') return;
    QR.query = e.target.value;
    clearTimeout(onInput._t);
    onInput._t = setTimeout(function(){
      render();
      var el = document.querySelector('#qreviewTab [data-qr="query"]');
      if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    }, 250);
  }

  /* ── 내보내기 · 되돌리기 ──────────────────────────────── */
  function doExport(){
    var gradeId = QR.grade, m; try{ m = cpModel(gradeId); }catch(e){ m = null; }
    if(!m) return;
    // qr-plan-2 [v83.8]: round 0 = 미분류 · answer(모범 답) · keys(꼭 말할 핵심)
    var out = { format:'qr-plan-2', grade:gradeId, rounds:ROUNDS, exportedAt:new Date().toISOString(), items:[], seen:[] };
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        var code = conceptCode(gradeId, big.name, row.sm.name);
        if(SEEN[code]) out.seen.push(code);
        orderedItems(gradeId, big.name, row.sm, code).forEach(function(it, i){
          var p = planOf(it.id, it.kind);
          var rec = { id:it.id, big:big.name, small:row.sm.name, kind:it.kind, ord:i, round:p.r, off:p.off, q:it.q };
          if(OK[it.id]) rec.ok = true;
          var ak = askOf(it.id); if(ak) rec.ask = ak;
          if(it.type) rec.type = it.type;
          if(EDITS[it.id] != null) rec.newQ = EDITS[it.id];
          var an = ansOf(it.id);
          if(an.a) rec.answer = an.a;
          if(an.k.length) rec.keys = an.k;
          out.items.push(rec);
        });
      });
    });
    var name = '질문고르기_' + gradeId + '_' + new Date().toISOString().slice(0, 10) + '.json';
    var blob = new Blob([JSON.stringify(out, null, 1)], { type:'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function doReset(){
    var gradeId = QR.grade;
    if(!confirm(gradeId + ' 의 회차·빼기·고친 문장을 모두 처음 상태로 되돌릴까요?\n(다른 학년은 그대로 남습니다)')) return;
    var m; try{ m = cpModel(gradeId); }catch(e){ return; }
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        var c0 = conceptCode(gradeId, big.name, row.sm.name);
        delete SEEN[c0]; delete ORDER[c0]; delete ADDED[c0];
        itemsOf(gradeId, big.name, row.sm).forEach(function(it){
          delete PLAN[it.id]; delete EDITS[it.id]; delete ANS[it.id]; delete OK[it.id];
        });
      });
    });
    save(PLAN_KEY, PLAN); save(EDIT_KEY, EDITS); save(SEEN_KEY, SEEN); save(ORDER_KEY, ORDER); save(ANS_KEY, ANS); save(ADD_KEY, ADDED); save(OK_KEY, OK);
    render();
  }

  /* ── [v83.8] 불러오기 ─────────────────────────────────────
     파일에 있는 것만 더한다(없는 질문은 그대로).
     qr-plan-1(옛 내보내기)은 회차를 가져오지 않는다 — 그 회차는 전부 옛 기본값이라
     가져오면 "미분류"가 덮인다. 고친 문장·빼기·순서·다 봤음만 가져온다.
     qr-plan-2 는 회차(1~3)·모범 답·핵심까지. round 0/없음은 "건드리지 않음". */
  function pickImport(){
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json'; inp.style.display = 'none';
    inp.onchange = function(){
      var f = inp.files && inp.files[0]; inp.remove(); if(!f) return;
      var rd = new FileReader();
      rd.onload = function(){
        var d; try{ d = JSON.parse(rd.result); }catch(e){ alert('JSON 파일을 읽지 못했어요.'); return; }
        doImport(d);
      };
      rd.readAsText(f, 'utf-8');
    };
    document.body.appendChild(inp); inp.click();
  }

  function importPlan(d, opt){
    var keep = !!(opt && opt.keepLocal);   // 이 기기에 이미 적어 둔 것은 안 덮는다
    var fmt = d && d.format, gradeId = d && d.grade;
    if((fmt !== 'qr-plan-1' && fmt !== 'qr-plan-2') || !gradeId || !Array.isArray(d.items)) return { err:'질문 고르기 파일이 아니에요.' };
    var m; try{ m = cpModel(gradeId); }catch(e){ m = null; }
    if(!m || !m.bigUnits) return { err:'이 앱에 없는 학년이에요: ' + gradeId };
    // 이 학년에 실제로 있는 질문 번호 · 소단원 코드
    var known = {}, codeOf = {}, curOrd = {};
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        var code = conceptCode(gradeId, big.name, row.sm.name);
        codeOf[big.name + '|' + row.sm.name] = code;
        curOrd[code] = orderedItems(gradeId, big.name, row.sm, code).map(function(x){ return x.id; });
        itemsOf(gradeId, big.name, row.sm).forEach(function(it){ known[it.id] = it; });
      });
    });
    var c = { fmt:fmt, grade:gradeId, total:d.items.length, missing:0, added:0, round:0, off:0, edit:0, ans:0, overwrite:0, seen:0, order:0, ops:[] };
    var ordBy = {};
    d.items.forEach(function(rec){
      var it = rec && known[rec.id];
      var code = rec && codeOf[rec.big + '|' + rec.small];
      // 추가한 질문(kind 'add')은 이 기기에 없으면 새로 만든다 — 번호는 파일 것 그대로
      if(!it && rec && rec.kind === 'add' && code && rec.id && typeof rec.q === 'string' && rec.q.trim()){
        it = { id:rec.id, kind:'add', q:rec.q };
        c.added++;
        c.ops.push(function(){ (ADDED[code] = ADDED[code] || []).push({ id:rec.id, q:rec.q.trim() }); });
      } else if(it && it.kind === 'add' && typeof rec.q === 'string' && rec.q.trim() && rec.q.trim() !== it.q
                && (!keep || (typeof rec.qWas === 'string' && rec.qWas.trim() === it.q))){   // [v87.4] keep 이어도 qWas 가 이 기기 문장과 같으면(아무도 손 안 댐) 바꾼다
        c.edit++; c.overwrite++;
        c.ops.push(function(){ var f = findAdded(it.id); if(f) f.list[f.i].q = rec.q.trim(); });
      }
      if(!it){ c.missing++; return; }
      var p = planOf(it.id, it.kind);
      var lp = PLAN[it.id] || {};
      // [v84.9] rWas = 바꾸기 전 회차. 이 기기 회차가 그것과 같으면(아무도 손 안 댐) 새 회차로 바꿔도 된다
      if(fmt === 'qr-plan-2' && rec.round >= 1 && rec.round <= ROUNDS && rec.round !== p.r && !(keep && lp.r != null && lp.r !== rec.rWas)){
        if(p.r && (PLAN[it.id] || {}).r != null) c.overwrite++;
        c.round++; c.ops.push(function(){ setPlan(it.id, { r: rec.round }); });
      }
      // [v87.3] offWas = 바꾸기 전 빼기 상태. 이 기기 상태가 그것과 같으면(아무도 손 안 댐) 되살리기도 넣는다
      var offSame = typeof rec.offWas === 'boolean' && !!lp.off === rec.offWas;
      if(typeof rec.off === 'boolean' && rec.off !== p.off && !(keep && !offSame && (lp.off != null || !rec.off))){
        c.off++; c.ops.push(function(){ setPlan(it.id, { off: rec.off ? true : null }); });
      }
      // [v88.2] 이 기기에 적힌 문장이 원래 문장과 똑같으면 손 안 댄 것으로 본다(Claude 가 고친 문장이 안 들어가던 것)
      var editSame = EDITS[it.id] != null && String(EDITS[it.id]).trim() === String(it.q || '').trim();
      if(typeof rec.newQ === 'string' && rec.newQ.trim() && rec.newQ !== EDITS[it.id] && !(keep && EDITS[it.id] != null && !editSame)){
        if(EDITS[it.id] != null) c.overwrite++;
        c.edit++; c.ops.push(function(){ EDITS[it.id] = rec.newQ.trim(); });
      }
      // [v84.5] qWas = 바꾸기 전 고친 문장. 이 기기 문장이 그것과 같으면 새 문장으로(또는 newQ 가 없으면 원래 문장으로 되돌림)
      if(keep && typeof rec.qWas === 'string' && EDITS[it.id] === rec.qWas){
        var nq = (typeof rec.newQ === 'string' && rec.newQ.trim()) ? rec.newQ.trim() : null;
        c.edit++; c.ops.push(function(){ if(nq) EDITS[it.id] = nq; else delete EDITS[it.id]; if(OK[it.id]) delete OK[it.id]; });
      }
      if(fmt === 'qr-plan-2' && (rec.answer || (rec.keys && rec.keys.length))){
        var old = ansOf(it.id), na = String(rec.answer || '').trim(), nk = (rec.keys || []).map(String);
        // [v84.4] ansWas = 바꾸기 전 모범 답. 이 기기 답이 그것과 똑같으면(아무도 손 안 댐) 새 답으로 바꿔도 된다
        //   — 마스터가 질문을 고쳐서 Claude 가 모범 답을 다시 쓴 경우
        var was = rec.ansWas, same = !!(was && old.a === String(was.a || '').trim()
          && old.k.join('\n') === (was.k || []).map(function(s){ return String(s).trim(); }).filter(Boolean).join('\n'));
        if(keep && (old.a || old.k.length) && !same){ /* 이 기기에 적어 둔 모범 답은 그대로 */ }
        else if(old.a !== na || old.k.join('\n') !== nk.map(function(s){ return s.trim(); }).filter(Boolean).join('\n')){
          if(old.a || old.k.length) c.overwrite++;
          c.ans++; c.ops.push(function(){ setAns(it.id, na, nk); });
          // 모범 답이 새로 바뀌었으니 마스터가 다시 보도록 확인 표시를 푼다
          if(keep && (same || rec.reopen) && OK[it.id]){ c.ops.push(function(){ delete OK[it.id]; }); }   // reopen = 확인한 질문에 새로 모범 답을 붙였을 때 다시 보게
        }
      }
      if(code && typeof rec.ord === 'number' && !(keep && ORDER[code])){ (ordBy[code] = ordBy[code] || []).push({ id:it.id, ord:rec.ord }); }
    });
    Object.keys(ordBy).forEach(function(code){
      var ids = ordBy[code].sort(function(a, b){ return a.ord - b.ord; }).map(function(x){ return x.id; });
      // 지금 화면 순서와 같으면 건드리지 않는다 (파일에 있는 질문끼리만 비교)
      var inFile = {}; ids.forEach(function(id){ inFile[id] = 1; });
      var now = (curOrd[code] || []).filter(function(id){ return inFile[id]; });
      if(JSON.stringify(ids) !== JSON.stringify(now)){
        c.order++; c.ops.push(function(){ ORDER[code] = ids; });
      }
    });
    d.items.forEach(function(rec){
      // 이번에 새로 만드는 추가 질문(known 에 아직 없음)도 확인 표시를 옮긴다 [v84.9]
      if(rec && rec.ok === true && !OK[rec.id] && (known[rec.id] || (rec.kind === 'add' && rec.q))){ c.ok = (c.ok || 0) + 1; c.ops.push(function(){ OK[rec.id] = true; }); }
    });
    (d.seen || []).forEach(function(code){
      if(!SEEN[code]){ c.seen++; c.ops.push(function(){ SEEN[code] = true; }); }
    });
    return c;
  }

  // [v84.0] 코드에 실린 분류안을 이 기기에 한 번만 넣는다
  function applyBase(){
    (window.QR_BASE_PLANS || []).forEach(function(b){
      if(!b || !b.key || !b.data || BASEDONE[b.key]) return;
      var c = importPlan(b.data, { keepLocal:true });
      if(c.err) return;                       // 학년 모델이 아직 없으면 다음에 다시
      c.ops.forEach(function(fn){ fn(); });
      save(PLAN_KEY, PLAN); save(EDIT_KEY, EDITS); save(SEEN_KEY, SEEN); save(ORDER_KEY, ORDER); save(ANS_KEY, ANS); save(ADD_KEY, ADDED); save(OK_KEY, OK);
      BASEDONE[b.key] = new Date().toISOString(); save(BASE_KEY, BASEDONE);
      if(c.ops.length){
        QR.grade = c.grade;
        QR.baseNote = (QR.baseNote ? QR.baseNote + '<br>' : '') + '📥 <b>분류안을 넣었어요</b> (' + esc(c.grade) + ') — 회차 ' + c.round + ' · 고친 문장 ' + c.edit
          + ' · 모범 답 ' + c.ans + ' · 추가 질문 ' + c.added + ' · 빼기 ' + c.off
          + '. 이미 적어 둔 것은 그대로 두었어요. 보기에서 「AI가 정한 것만」을 고르면 Claude 가 정한 것만 볼 수 있어요.';
      }
    });
  }

  function doImport(d){
    var c = importPlan(d);
    if(c.err){ alert(c.err); return; }
    var msg = c.grade + ' 파일 (' + c.total + '개 질문)\n\n'
      + '넣을 것 — ' + (c.added ? '추가 질문 ' + c.added + ' · ' : '') + '회차 ' + c.round + ' · 모범 답 ' + c.ans + ' · 고친 문장 ' + c.edit
      + ' · 빼기 ' + c.off + ' · 다 봤음 ' + c.seen + ' · 순서 바뀐 소단원 ' + c.order + '\n'
      + (c.overwrite ? '⚠️ 이미 다르게 적어 둔 ' + c.overwrite + '개는 파일 내용으로 바뀝니다.\n' : '')
      + (c.missing ? '(이 앱에 없는 질문 ' + c.missing + '개는 건너뜁니다)\n' : '')
      + (c.fmt === 'qr-plan-1' ? '(옛 형식 파일이라 회차는 가져오지 않습니다)\n' : '')
      + '\n넣을까요?';
    if(!c.ops.length){ alert(msg.split('\n\n넣을까요?')[0] + '\n\n새로 넣을 것이 없어요.'); return; }
    if(!confirm(msg)) return;
    c.ops.forEach(function(fn){ fn(); });
    save(PLAN_KEY, PLAN); save(EDIT_KEY, EDITS); save(SEEN_KEY, SEEN); save(ORDER_KEY, ORDER); save(ANS_KEY, ANS); save(ADD_KEY, ADDED); save(OK_KEY, OK);
    QR.grade = c.grade;
    render();
  }

  /* ── 선생님 화면에 들어갈 빈 칸 만들기 ────────────────
     메뉴 등록·열고 닫기는 app-ui.js 가 한다(menus 의 'qreview').
     여기서는 그 메뉴가 보여 줄 빈 칸만 개념 편집기 옆에 만들어 둔다. */
  function mount(){
    if(document.getElementById('qreviewTab')) return;
    var anchorTab = document.getElementById('cecardsTab');
    if(!anchorTab) return;
    var box = document.createElement('div');
    box.id = 'qreviewTab'; box.style.display = 'none';
    anchorTab.parentNode.insertBefore(box, anchorTab.nextSibling);
  }

  document.addEventListener('click', onClick, true);
  document.addEventListener('change', onChange);
  document.addEventListener('input', onInput);
  // 기호 버튼이 어느 칸에 넣을지 — 마지막으로 누르거나 글자를 친 칸
  ['focusin', 'mousedown', 'click', 'keyup'].forEach(function(ev){
    document.addEventListener(ev, function(e){
      if(e.target && e.target.classList && e.target.classList.contains('qr-ed')) LAST_ED = e.target;
    }, true);
  });
  document.addEventListener('DOMContentLoaded', mount);
  window.addEventListener('load', mount);
  mount();

  window.qrRender = render;   // 콘솔 확인용
  window.qrImportPlan = importPlan;   // 콘솔 확인용 (넣지 않고 셈만 한다)
})();
