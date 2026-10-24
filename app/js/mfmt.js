/* 수식 표시기 mfmt — dodream.html(v92) 에서 그대로 옮김. 표시 전용(채점·저장에 쓰지 말 것). */
(function(){
  function esc(s){ return String(s==null?'':s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  var OPS = /[=+\-*\/^√∪∩⊂⊄∈∉≤≥≠×÷²³⁻]/;
  // 수식 덩어리 후보: 영문/숫자/여는괄호/√ 로 시작
  var GREEK = 'πθαβγλμφωΔΣΩ';
  var RUN = /[A-Za-z0-9(√πθ∠][A-Za-z0-9 +\-*\/^=<>≤≥≠()\[\]{}∪∩⊂⊄∈∉∅√|,.×÷·²³⁻¹⁰′°_πθαβγλμφωΔΣΩ∠∽≡∥⊥½⅓¼⅔¾]*/g;

  // 균형 잡힌 괄호 덩어리를 s[i]부터 읽는다. 여는 괄호가 아니면 null.
  function group(s,i){
    if(s[i]!=='(') return null;
    var d=0;
    for(var j=i;j<s.length;j++){
      if(s[j]==='(') d++;
      else if(s[j]===')'){ d--; if(!d) return s.slice(i,j+1); }
    }
    return null;
  }
  // 분수의 한쪽 피연산자를 뒤/앞에서 읽는다
  var TOKEN = /[A-Za-z0-9²³ⁿ_.]+$/;
  function leftOperand(s,i){            // s[0..i-1] 의 끝에서
    if(s[i-1]===')'){ var d=0; for(var j=i-1;j>=0;j--){ if(s[j]===')')d++; else if(s[j]==='('){d--; if(!d){ if(s[j-1]==='√') j--; return [j,s.slice(j,i)]; }} } return null; }
    var m=TOKEN.exec(s.slice(0,i)); if(!m||!m[0]) return null;
    var b=i-m[0].length; if(s[b-1]==='√') b--;      // [0.21.2] √2/2 · √(x-1)/2 는 √까지 분자로
    return [b, s.slice(b,i)];
  }
  function rightOperand(s,i){           // s[i..] 의 앞에서
    var gp=group(s,i); if(gp) return gp;
    var m=/^[A-Za-z0-9²³ⁿ_.]+/.exec(s.slice(i)); return m?m[0]:null;
  }

  function strip(t){ return (t.length>1 && t[0]==='(' && group(t,0)===t) ? t.slice(1,-1) : t; }

  // 한 덩어리 안을 재귀적으로 꾸민다
  function inner(t){
    var out='', i=0;
    while(i<t.length){
      var ch=t[i];
      // 근호
      if(ch==='√'){
        var gp=group(t,i+1), body;
        if(gp){ body=gp.slice(1,-1); i+=1+gp.length; }
        else { var m=/^[A-Za-z0-9²³_.]+/.exec(t.slice(i+1)); if(m){ body=m[0]; i+=1+m[0].length;
          var fg=/^[fgh]$/.test(body)?group(t,i):null; if(fg){ body+=fg; i+=fg.length; }   // [0.21.2] √f(2) 는 f(2) 전체에 지붕
        } else { out+='√'; i++; continue; } }
        out+='<span class="mf-rad"><span class="mf-rcd"><span class="mf-rs" aria-hidden="true">'+RSIGN+'</span><span class="mf-rt">√</span>'+expr(body)+'</span></span>';
        continue;
      }
      // 위첨자
      if(ch==='^'){
        var gp2=group(t,i+1), sup;
        if(gp2){ sup=gp2.slice(1,-1); i+=1+gp2.length; }
        else { var m2=/^-?[A-Za-z0-9]+/.exec(t.slice(i+1)); if(m2){ sup=m2[0]; i+=1+m2[0].length; } else { out+='^'; i++; continue; } }
        out+='<sup class="mf-sup">'+inner(sup)+'</sup>';
        continue;
      }
      // [v82.7] 영문 낱말은 교재 규칙대로: 변수는 기울임, 점·도형 이름·단위·함수 이름은 세움
      if(/[A-Za-z]/.test(ch)){
        var w=/^[A-Za-z]+/.exec(t.slice(i))[0];
        if(isRoman(w,t,i)){ out+=esc(w); i+=w.length; continue; }
        i+=w.length;
        var md=/^\d+/.exec(t.slice(i)), body='';
        for(var q=0;q<w.length;q++) body+=mvar(w[q]);
        if(md){ body+='<sub class="mf-sub">'+md[0]+'</sub>'; i+=md[0].length; }
        out+=body; continue;
      }
      out+=esc(ch); i++;
    }
    return out;
  }

  // [v82.6] 문자는 교재와 같은 "수학 기울임체"(유니코드 math italic)로 그린다.
  //   보통 글자에 기울임만 주면 x 가 대문자처럼 보여서 마스터가 지적함.
  //   글꼴이 이 글자를 못 그리는 기기에서는 예전처럼 <i> 기울임으로 돌아간다.
  var MI_OK = null, MI_FONT = '"Cambria Math","STIX Two Math","Latin Modern Math","Noto Sans Math","Times New Roman",serif';
  function mathItalicOk(){
    if(MI_OK !== null) return MI_OK;
    try{
      var c = document.createElement('canvas').getContext('2d');
      c.font = '20px ' + MI_FONT;
      var w1 = c.measureText(String.fromCodePoint(0x1D465)).width;   // 수학 기울임 x
      var w2 = c.measureText(String.fromCodePoint(0x10FFFF)).width;  // 없는 글자(네모)
      MI_OK = w1 > 0 && Math.abs(w1 - w2) > 0.5;
    }catch(e){ MI_OK = false; }
    return MI_OK;
  }
  // [v82.7] 교재(숨마쿰 라우데)에서 세워서 쓰는 것들
  //   · 점·선분·도형 이름: AB, ABC, ∠A, A(-3)   · 단위: cm, L, mL   · 함수 이름: sin, tan, log
  //   기울여 쓰는 것: 변수 a x p k, 집합 A B U, 판별식 D, 넓이 S …
  var UNITS = {mm:1,cm:1,m:1,km:1,mg:1,g:1,kg:1,t:1,mL:1,ml:1,L:1,kL:1,cc:1,mol:1,s:1};
  var FUNCS = {sin:1,cos:1,tan:1,sec:1,csc:1,cot:1,log:1,ln:1,lim:1,max:1,min:1,gcd:1,lcm:1,mod:1};
  var MF_CTX = '';                                    // 이 수식 덩어리 바로 앞의 우리말
  var POINT_WORD = /(점|각|원|호|선분|중심|꼭짓점|지점|삼각형|사각형|다각형|평행사변형|마름모|사다리꼴|정점|둘레)\s*$/;
  function isRoman(w,t,i){
    if(w.length>1 && FUNCS[w.toLowerCase()]) return true;              // sin, tan, log
    if(UNITS[w] && w.length>1 && /\d\s*$/.test(t.slice(0,i))) return true;  // 10cm, 1000 mL
    if(UNITS[w] && MF_UNIT) return true;                               // 단위 이야기 속의 한 글자 단위 (1 L, 3 g)
    if(UNITS[w] && t[i-1]==='(' && t[i+w.length]===')') return true;   // 홀로 괄호 안의 단위 — (m), (cm)
    if(w.length>1 && /^[A-Z]+$/.test(w)) return true;                  // AB, ABC — 점·선분·도형
    if(w.length>3 && /^[a-z]+$/.test(w)) return true;                  // 영어 낱말
    if(w.length===1 && /[A-Z]/.test(w)){
      var pch=t.slice(0,i).replace(/\s+$/,'').slice(-1);
      if(pch && '\u2220\u25B3\u25B1\u223D\u2261'.indexOf(pch)>=0) return true;  // ∠A △A
      if(/^\(\s*[-\u2212+]?[\d.]+\s*(,\s*[-\u2212+]?[\d.]+\s*)*\)/.test(t.slice(i+1))) return true;  // A(-3), B(5, 2)
      if(i===0 && POINT_WORD.test(MF_CTX)) return true;                // 점 A, 원 O
    }
    return false;
  }
  function mvar(ch){
    if(mathItalicOk()){
      if(ch === 'h') return '<span class="mf-mi">\u210E</span>';   // ℎ 는 따로 있는 글자
      var code = ch.charCodeAt(0);
      var base = (code >= 97) ? 0x1D44E + (code - 97) : 0x1D434 + (code - 65);
      return '<span class="mf-mi">' + String.fromCodePoint(base) + '</span>';
    }
    return '<i class="mf-v">' + ch + '</i>';
  }

  // [0.21.2] 근호 — 글꼴 √ 대신 직접 그린 기호. 지붕(.mf-rcd 윗줄)과 끊기지 않고 안의 식 높이만큼 늘어난다.
  var RSIGN='<svg viewBox="0 0 10 20" preserveAspectRatio="none"><path d="M0.5 12.4 2.6 10.8" class="mf-rs1"/><path d="M2.6 10.8 5.4 19.4" class="mf-rs3"/><path d="M5.4 19.4 9.5 0 11 0" class="mf-rs2"/></svg>';
  // t[k] 가 √( … ) 괄호 안이면 true
  function inRad(t,k){ var st=[]; for(var j=0;j<k;j++){ if(t[j]==='(') st.push(t[j-1]==='√'); else if(t[j]===')') st.pop(); } return st.indexOf(true)>=0; }

  // 분수 처리 후 inner()
  function expr(t){
    var k=t.indexOf('/');
    while(k>0){
      if(t[k-1]!=='/' && t[k+1]!=='/' && !inRad(t,k)){
        var L=leftOperand(t,k), R=L?rightOperand(t,k+1):null;
        if(L && R){
          return expr(t.slice(0,L[0]))
            + '<span class="mf-frac"><span class="mf-num">'+expr(strip(L[1]))+'</span>'
            + '<span class="mf-den">'+expr(strip(R))+'</span></span>'
            + expr(t.slice(k+1+R.length));
        }
      }
      k=t.indexOf('/',k+1);
    }
    return inner(t);
  }

  // [v82.7] 수식 덩어리 밖에 홀로 있는 변수 한 글자도 교재처럼 기울인다.
  //   "x의 값", "y축", "꼭짓점 (p, q)", "n각형" … 숫자 뒤의 단위(500 g)와 영어 낱말은 건드리지 않는다.
  var LONE = /(^|[^A-Za-z0-9])([a-z])(?![A-Za-z0-9])/g;
  // 단위로도 쓰이는 글자(m 미터·g 그램·t 톤·l 리터·s 초·h 시간)는, 그 글에 단위 이야기가 있으면 변수로 보지 않는다.
  //   "2 km는 몇 m일까요?" 의 m 은 변수가 아니라 단위다.
  var UNIT_CH = 'mgtlsh';
  var UNIT_CTX = /(mm|cm|km|kg|mg|mL|kL|㎜|㎝|㎞|㎏|㎖|㎠|㎤|단위|그램|킬로|리터|미터|센티|밀리|톤|무게|들이|길이는|시간의)/;
  var MF_UNIT = false;
  var SET_UP = /(집합)(\s*)([A-Z](?:\s*,\s*[A-Z])*)(?![A-Za-z0-9])/g;   // 집합 A, 전체집합 U, 부분집합 A, B
  function plain(t){
    var src=String(t==null?'':t), out='', last=0, m;
    LONE.lastIndex=0;
    while((m=LONE.exec(src))){
      var at=m.index+m[1].length;
      if(/\d\s*$/.test(src.slice(0,at))){ continue; }        // 500 g, 3 m — 단위
      if(MF_UNIT && UNIT_CH.indexOf(m[2])>=0){ continue; }   // 단위 이야기 속의 m·g·t·l
      out += esc(src.slice(last,at)) + '<span class="mf">'+mvar(m[2])+'</span>';
      last = at+1; LONE.lastIndex = last;
    }
    out += esc(src.slice(last));
    // 집합 이름은 대문자라도 기울인다 (점 A·원 O 는 그대로 세움)
    return out.replace(SET_UP, function(_, k, sp, names){
      return k + sp + names.replace(/[A-Z]/g, function(c){ return '<span class="mf">' + mvar(c) + '</span>'; });
    });
  }

  // 안 닫힌 √( 의 '(' 자리(덩어리 안 위치), 없으면 -1
  function radOpen(t){ var st=[]; for(var j=0;j<t.length;j++){ if(t[j]==='(') st.push(j); else if(t[j]===')') st.pop(); }
    for(var q=0;q<st.length;q++) if(t[st[q]-1]==='√') return st[q]; return -1; }

  // [v85.7] 대분수 "2와 1/3"·"1과1/2" → 교재처럼 자연수 바로 옆에 분수. 화면에서 한글 '와/과'를 뺀다.
  //   앞이 숫자·'/'·'.' 이면(3/4과 5/6 같은 분수 두 개) 건드리지 않는다. 채점·음성은 원래 글자를 쓰므로 영향 없음.
  var MIXED = /(^|[^\d\/.])(\d+)\s*[와과]\s*(?=\d+\s*\/\s*\d+)/g;
  function mfmt(s){
    var src=String(s==null?'':s).replace(MIXED, '$1$2\u2009'), out='', last=0, m;
    MF_UNIT = UNIT_CTX.test(src);
    RUN.lastIndex=0;
    while((m=RUN.exec(src))){
      var raw=m[0], start=m.index;
      var trimmed=raw.replace(/\s+$/,'');
      // [0.21.2] √( 가 이 덩어리 안에서 안 닫히면(안에 − 같은 글자가 있어 끊김) 짝 괄호까지 늘린다
      var rp=radOpen(trimmed);
      if(rp>=0){ var gq=group(src,start+rp); if(gq) trimmed=src.slice(start,start+rp+gq.length); }
      if(trimmed.length<2 || !OPS.test(trimmed)){ continue; }
      MF_CTX = src.slice(Math.max(0,start-12), start);
      out += plain(src.slice(last,start)) + '<span class="mf">'+expr(trimmed)+'</span>';
      last = start + trimmed.length;
      RUN.lastIndex = last;
    }
    return out + plain(src.slice(last));
  }
  window.mfmt = mfmt;
})();
