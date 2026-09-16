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
   ============================================================ */
(function(){
  'use strict';

  var PLAN_KEY = 'qr:plan:v1', EDIT_KEY = 'qr:edits:v1', SEEN_KEY = 'qr:seen:v1', ORDER_KEY = 'qr:order:v1';
  var ROUNDS = 3;                       // 학원이 3회 반복 시스템이라 3회차 (마스터 결정 2026-09-16)
  var SIM_THRESHOLD = 0.5;              // 이 이상 겹치면 "비슷한 질문"으로 묶는다

  var QR = { grade:null, big:0, view:'all', query:'' };

  /* ── 저장소 ───────────────────────────────────────────── */
  function load(k){ try{ return JSON.parse(localStorage.getItem(k) || '{}'); }catch(e){ return {}; } }
  function save(k, o){ try{ localStorage.setItem(k, JSON.stringify(o)); }catch(e){} }
  var PLAN = load(PLAN_KEY), EDITS = load(EDIT_KEY), SEEN = load(SEEN_KEY), ORDER = load(ORDER_KEY);

  // 기본값: 기본→1 · 깊이→2 · 유형별과 계단→마지막 회차(3)
  function defRound(kind){ return kind === 'low' ? 1 : kind === 'high' ? 2 : ROUNDS; }
  function planOf(qid, kind){
    var p = PLAN[qid] || {};
    return { r: p.r || defRound(kind), off: !!p.off, touched: (p.r != null || p.off != null) };
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
    try{
      var key = gradeId + '|' + bigName + '|' + small.name;
      var steps = (window.DL_LADDERS || {})[key] || [];
      steps.forEach(function(st, i){
        if(st && st.q) out.push({ id:'ladder:' + key + ':' + (i + 1), q:st.q, kind:'ladder', type:st.kind, index:i });
      });
    }catch(e){}
    return out.filter(function(x){ return x.id && x.q; });
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
    var s = { r1:0, r2:0, r3:0, off:0, total:0, edited:0, smalls:0, seen:0, empty:[] };
    var m; try{ m = cpModel(gradeId); }catch(e){ return s; }
    if(!m || !m.bigUnits) return s;
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        s.smalls++;
        if(SEEN[conceptCode(gradeId, big.name, row.sm.name)]) s.seen++;
        var live1 = 0;
        itemsOf(gradeId, big.name, row.sm).forEach(function(it){
          var p = planOf(it.id, it.kind);
          s.total++;
          if(EDITS[it.id] != null) s.edited++;
          if(p.off){ s.off++; return; }
          if(p.r === 1){ s.r1++; live1++; } else if(p.r === 2) s.r2++; else s.r3++;
        });
        if(!live1) s.empty.push(big.name + ' · ' + row.sm.name);
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
    + '@media (max-width:640px){#qreviewTab .qr-bar select,#qreviewTab .qr-bar input{max-width:none;flex:1 1 100%;}#qreviewTab .qr-row{flex-wrap:wrap;}#qreviewTab .qr-q{flex:1 1 100%;order:2;}#qreviewTab .qr-act{order:3;margin-left:75px;}}'
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
    + '#qreviewTab .qr-kind{flex:0 0 66px;font-size:11px;font-weight:800;color:#7343E6;background:#F4EFFF;border-radius:7px;padding:4px 0;text-align:center;}'
    + '#qreviewTab .qr-kind.k-high{color:#2C8459;background:#E9F5EE;}'
    + '#qreviewTab .qr-kind.k-qset{color:#B26B00;background:#FDF3E2;}'
    + '#qreviewTab .qr-kind.k-ladder{color:#1D6FA5;background:#E6F1F8;}'
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
    + '#qreviewTab .qr-note{margin:-6px 0 11px;font-size:12px;color:#8A7BB0;}';
    var st = document.createElement('style'); st.id = 'qrStyle'; st.textContent = css;
    document.head.appendChild(st);
  }

  function rowHtml(it, groupNo, canMove, isFirst, isLast){
    var p = planOf(it.id, it.kind);
    var edited = EDITS[it.id] != null;
    var btns = '';
    for(var r = 1; r <= ROUNDS; r++){
      btns += '<button data-qr="round" data-r="' + r + '"' + (p.r === r && !p.off ? ' class="on"' : '') + '>' + r + '</button>';
    }
    return '<div class="qr-row' + (p.off ? ' off' : '') + '" data-qid="' + esc(it.id) + '"'
      + ' data-plain="' + esc(textOf(it)) + '">'
      + '<span class="qr-kind k-' + it.kind + '">' + esc(kindLabel(it)) + '</span>'
      + '<div class="qr-q' + (edited ? ' edited' : '') + '" data-qr="text">'
      +   (groupNo ? '<span class="qr-sim" title="같은 소단원 안에 비슷한 질문이 있어요">비슷 ' + groupNo + '</span>' : '')
      +   show(textOf(it))
      + '</div>'
      + '<div class="qr-act">' + btns
      +   (canMove
            ? '<button data-qr="up" title="같은 종류 안에서 위로"' + (isFirst ? ' disabled' : '') + '>↑</button>'
              + '<button data-qr="down" title="같은 종류 안에서 아래로"' + (isLast ? ' disabled' : '') + '>↓</button>'
            : '')
      +   '<button data-qr="off"' + (p.off ? ' class="off-on"' : '') + '>' + (p.off ? '뺌' : '빼기') + '</button>'
      +   '<button data-qr="edit">고치기</button>'
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

    var shown = items.filter(function(it){
      var p = planOf(it.id, it.kind);
      if(QR.view === 'off') return p.off;
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
      +   (live1 ? '' : '<span class="qr-warn">1회차가 비었어요</span>')
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
      +   '<select data-qr="view">' + [['all','전체'],['todo','아직 안 본 소단원만'],['off','뺀 것만'],['r1','1회차만'],['r2','2회차만'],['r3','3회차만']].map(function(x){
            return '<option value="' + x[0] + '"' + (x[0] === QR.view ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select>'
      +   '<input data-qr="query" type="text" placeholder="질문 안에서 찾기" value="' + esc(QR.query) + '">'
      + '</div>'
      + ((QR.view !== 'all' || QR.query)
          ? '<p class="qr-note">걸러 보는 중에는 순서(↑↓)를 바꿀 수 없어요. 순서를 바꾸려면 「전체」로 두세요.</p>' : '');

    if(!big){ html += '<div class="qr-empty">이 학년에는 단원이 없어요.</div>'; }
    else {
      var n = 0, body = smallsOf(big).map(function(row){ n++; return smallHtml(QR.grade, big, row, n); }).join('');
      html += body || '<div class="qr-empty">보기 조건에 맞는 질문이 없어요.</div>';
    }

    html += '<div class="qr-foot">'
      + '<span>' + esc((gs.find(function(g){ return g.id === QR.grade; }) || {}).name || '') + ' 전체 — '
      + '1회차 <b>' + s.r1 + '</b> · 2회차 <b>' + s.r2 + '</b> · 3회차 <b>' + s.r3 + '</b> · 뺀 것 <b>' + s.off + '</b>'
      + ' · 고친 문장 <b>' + s.edited + '</b> · 다 본 소단원 <b>' + s.seen + ' / ' + s.smalls + '</b></span>'
      + (s.empty.length ? '<span class="qr-warn">1회차 빈 소단원 ' + s.empty.length + '개</span>' : '')
      + '<span class="sp">'
      +   '<button class="nbtn" data-qr="export">내보내기</button>'
      +   '<button class="nbtn" data-qr="reset">이 학년 되돌리기</button>'
      + '</span></div>';

    host.innerHTML = html;
  }

  /* ── 클릭·입력 ────────────────────────────────────────── */
  function closestSmall(el){ return el.closest ? el.closest('.qr-small') : null; }

  function onClick(e){
    var host = document.getElementById('qreviewTab');
    if(!host || host.style.display === 'none' || !host.contains(e.target)) return;
    var btn = e.target.closest('[data-qr]');
    if(!btn) return;
    var act = btn.getAttribute('data-qr');
    var rowEl = btn.closest('.qr-row');
    var qid = rowEl ? rowEl.getAttribute('data-qid') : null;

    if(act === 'round' && qid){
      setPlan(qid, { r: parseInt(btn.getAttribute('data-r'), 10), off: null });
      render(); return;
    }
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
    if(act === 'edit' && qid){ startEdit(rowEl, qid); return; }
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
    qEl.innerHTML = '<textarea class="qr-ed" rows="3">' + esc(raw) + '</textarea>'
      + '<div class="qr-edrow">'
      +   '<button class="nbtn primary" data-qr="editSave">저장</button>'
      +   '<button class="nbtn" data-qr="editCancel">취소</button>'
      +   (EDITS[qid] != null ? '<button class="nbtn" data-qr="editUndo">원래대로</button>' : '')
      + '</div>';
    var ta = qEl.querySelector('.qr-ed'); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
  }

  function onChange(e){
    var host = document.getElementById('qreviewTab');
    if(!host || !host.contains(e.target)) return;
    var k = e.target.getAttribute('data-qr');
    if(k === 'grade'){ QR.grade = e.target.value; QR.big = 0; render(); }
    else if(k === 'big'){ QR.big = parseInt(e.target.value, 10) || 0; render(); }
    else if(k === 'view'){ QR.view = e.target.value; render(); }
  }
  function onInput(e){
    var host = document.getElementById('qreviewTab');
    if(!host || !host.contains(e.target)) return;
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
    var out = { format:'qr-plan-1', grade:gradeId, rounds:ROUNDS, exportedAt:new Date().toISOString(), items:[], seen:[] };
    m.bigUnits.forEach(function(big){
      smallsOf(big).forEach(function(row){
        var code = conceptCode(gradeId, big.name, row.sm.name);
        if(SEEN[code]) out.seen.push(code);
        orderedItems(gradeId, big.name, row.sm, code).forEach(function(it, i){
          var p = planOf(it.id, it.kind);
          var rec = { id:it.id, big:big.name, small:row.sm.name, kind:it.kind, ord:i, round:p.r, off:p.off, q:it.q };
          if(it.type) rec.type = it.type;
          if(EDITS[it.id] != null) rec.newQ = EDITS[it.id];
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
        delete SEEN[c0]; delete ORDER[c0];
        itemsOf(gradeId, big.name, row.sm).forEach(function(it){
          delete PLAN[it.id]; delete EDITS[it.id];
        });
      });
    });
    save(PLAN_KEY, PLAN); save(EDIT_KEY, EDITS); save(SEEN_KEY, SEEN); save(ORDER_KEY, ORDER);
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
  document.addEventListener('DOMContentLoaded', mount);
  window.addEventListener('load', mount);
  mount();

  window.qrRender = render;   // 콘솔 확인용
})();
