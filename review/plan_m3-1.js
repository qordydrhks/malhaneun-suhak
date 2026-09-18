/* [v84.6] 질문 고르기 — 기본으로 실어 두는 분류안 (중3-1)
   마스터 견본(2026-09-18: 38 인수분해란·51 항이 4개인 식 + 1단원 문장 고침) + Claude 2단원 나머지 25소단원
   (연산 질문으로 고침 newQBy:'claude' · 회차 by · 뺌 offBy · 모범 답 answerBy). 화면 열 때 한 번만 넣음. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'m3-1_2026-09-18a', data:{
"format": "qr-plan-2",
"grade": "m3-1",
"rounds": 3,
"items": [
{
"id": "w3kgck:t0L1",
"big": "1. 실수와 그 계산",
"small": "01. 제곱근이란 무엇일까?",
"kind": "low",
"newQ": "① 제곱수의 뜻이랑 제곱근의 뜻이랑 둘다 말해봐"
},
{
"id": "w3kgck:t0L3",
"big": "1. 실수와 그 계산",
"small": "01. 제곱근이란 무엇일까?",
"kind": "low",
"newQ": "③ 4의 제곱인 수와 4의 제곱근인 수를 차례대로 말해봐"
},
{
"id": "w3kgck:qerror",
"big": "1. 실수와 그 계산",
"small": "01. 제곱근이란 무엇일까?",
"kind": "qset",
"newQ": "어떤 친구가 9^2의 제곱근을 물었더니 '3이야'라고 대답했어. 정확한 답을 얘기하고 설명해줘"
},
{
"id": "yf76ek:t0L1",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "low",
"newQ": "① a의 제곱근의 개수가 결정되는 기준은 뭐야?"
},
{
"id": "yf76ek:t0L2",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "low",
"newQ": "② 제곱근의 수가 1개인 숫자는 몇이지? 정답하고 이유를 말해봐"
},
{
"id": "yf76ek:t0H1",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "high",
"round": 2
},
{
"id": "yf76ek:qreason",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "qset",
"round": 2
},
{
"id": "yf76ek:qcondition",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "qset",
"off": true
},
{
"id": "yf76ek:qerror",
"big": "1. 실수와 그 계산",
"small": "02. 어떤 수든지 제곱근은 항상 2개일까?",
"kind": "qset",
"newQ": "어떤 친구가 '어떤 두 수의 제곱근의 개수는 모두 1개라고 했어' 어떤 두 수에 대해서 이야기 해봐"
},
{
"id": "1spz3kx:t0L2",
"big": "1. 실수와 그 계산",
"small": "07. a<0일 때, √(a²)의 값은?",
"kind": "low",
"newQ": "② 루트 안의 수가 음수가 될 수 없는 이유를 설명해봐"
},
{
"id": "4v7qgf:t0L2",
"big": "1. 실수와 그 계산",
"small": "08. √((-3)²)+(-√10)²-√25를 계산하면?",
"kind": "low",
"newQ": "② 루트 안의 수 또는 식이 어떤 꼴이어야 루트를 없앨 수 있지?"
},
{
"id": "14b60r4:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"ok": true,
"answer": "인수분해라고 해.",
"keys": [
"인수분해"
],
"answerBy": "claude"
},
{
"id": "14b60r4:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"ok": true,
"answer": "서로 반대 과정이야. 전개는 곱을 풀어서 하나의 다항식으로 만들고, 인수분해는 하나의 다항식을 곱의 꼴로 나타내.",
"keys": [
"서로 반대 과정",
"전개는 곱을 풀기, 인수분해는 곱으로 나타내기"
],
"answerBy": "claude"
},
{
"id": "14b60r4:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"ok": true,
"answer": "곱해진 각각의 다항식을 처음 다항식의 인수라고 해.",
"keys": [
"인수"
],
"answerBy": "claude"
},
{
"id": "14b60r4:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "high",
"round": 2,
"ok": true,
"answer": "인수분해는 하나의 다항식을 두 개 이상의 다항식의 곱으로 나타내는 거야. 예를 들어 x²+5x+6=(x+2)(x+3)이고, 거꾸로 (x+2)(x+3)을 풀어 x²+5x+6으로 만드는 게 전개라서 둘은 반대 과정이야.",
"keys": [
"다항식을 곱으로 나타낸다",
"전개와 반대 과정"
],
"answerBy": "claude"
},
{
"id": "14b60r4:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "14b60r4:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "14b60r4:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "14b60r4:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "14b60r4:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "qset",
"round": 2,
"newQ": "인수분해 되어있는 식을 하나 만들어보고, 그 식에 있는 인수를 두 개 말해봐",
"ok": true,
"answer": "예를 들어 x²+5x+6=(x+2)(x+3)이고, 인수는 x+2와 x+3이야.",
"keys": [
"인수분해된 식을 만든다",
"곱해진 각각이 인수"
],
"answerBy": "claude"
},
{
"id": "14b60r4:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"newQ": "① 항이 4개 있는 식의 풀이 방법 두 가지를 얘기해봐.",
"answer": "1.두 항씩 공통인수로 묶은 후 다시 공통 인수로 한 번 더 인수분해 한다.\n2.항을 3개 1개로 구분해서 완전제곱식-제곱 꼴이 되게하여 합차 공식으로 인수분해 한다.",
"ok": true
},
{
"id": "1a3d8ww:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "low",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "low",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"ok": true,
"answer": "두 항씩 묶어 공통인수를 만든 뒤 한 번 더 묶는 방법(2+2)과, 세 항을 완전제곱식으로 만들고 남은 한 항과 제곱의 차로 만들어 합차 공식을 쓰는 방법(3+1)이 있어.",
"keys": [
"2+2로 묶어 공통인수",
"3+1로 묶어 완전제곱식-제곱"
],
"answerBy": "claude"
},
{
"id": "1a3d8ww:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"ok": true,
"answer": "두 항씩 묶었을 때 괄호 안이 같아지면 2+2로 묶어. 세 항이 x²+2x+1처럼 완전제곱식이 되고 나머지 한 항이 y² 같은 제곱이면 3+1로 묶어.",
"keys": [
"괄호 안이 같아지면 2+2",
"완전제곱식+제곱이면 3+1"
],
"answerBy": "claude"
},
{
"id": "1a3d8ww:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1a3d8ww:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"ok": true,
"answer": "예를 들어 x²+2x+1-y²은 (x+1)²-y²으로 묶어서 (x+1+y)(x+1-y)야.",
"keys": [
"세 항이 완전제곱식",
"합차 공식으로 인수분해"
],
"answerBy": "claude"
},
{
"id": "1a3d8ww:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"ok": true,
"answer": "x²-6x+9가 완전제곱식이라서 3+1로 묶어야 해. (x²-6x+9)-y²=(x-3)²-y²=(x-3+y)(x-3-y)야.",
"keys": [
"x²-6x+9를 한 묶음으로",
"(x-3+y)(x-3-y)"
],
"answerBy": "claude"
},
{
"id": "1a3d8ww:qamu6pqs89n71e",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "add",
"round": 1,
"q": "𝑥²−𝑦²+2𝑥+1 인수분해 하는 과정을 간단히 얘기해봐",
"ok": true,
"answer": "x²+2x+1을 한 묶음으로 보면 (x+1)²-y²이 돼. 합차 공식으로 (x+1+y)(x+1-y)야.",
"keys": [
"(x+1)²-y²",
"(x+y+1)(x-y+1)"
],
"answerBy": "claude"
},
{
"id": "1a3d8ww:qamu6psfuae3ju",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "add",
"round": 1,
"q": "xy+x+y+1 인수분해 하는 과정을 간단히 얘기해봐",
"ok": true,
"answer": "두 항씩 묶으면 x(y+1)+(y+1)이고, (y+1)로 묶으면 (y+1)(x+1)이야.",
"keys": [
"두 항씩 묶는다",
"(y+1)(x+1)"
],
"answerBy": "claude"
},
{
"id": "ladder:m3-1|2. 다항식의 곱셈과 인수분해|51. 항이 4개인 식은 어떻게 인수분해할까?:1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:m3-1|2. 다항식의 곱셈과 인수분해|51. 항이 4개인 식은 어떻게 인수분해할까?:2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "ladder",
"ok": true
},
{
"id": "1hdyx03:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (a+b)(c+d)를 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "분배법칙으로 a를 c, d에 각각 곱하고, b도 c, d에 각각 곱해서 더해. (a+b)(c+d)=ac+ad+bc+bd야.",
"keys": [
"각 항을 빠짐없이 곱한다",
"ac+ad+bc+bd"
],
"answerBy": "claude"
},
{
"id": "1hdyx03:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "전개라고 해.",
"keys": [
"전개"
],
"answerBy": "claude"
},
{
"id": "1hdyx03:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "③ (x+2)(x+3)을 전개하면 동류항이 생겨. 어떻게 정리해?",
"newQBy": "claude",
"answer": "전개하면 x²+3x+2x+6인데, 동류항 3x와 2x를 더해서 x²+5x+6으로 정리해.",
"keys": [
"x²+3x+2x+6",
"동류항을 모아 x²+5x+6"
],
"answerBy": "claude"
},
{
"id": "1hdyx03:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hdyx03:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hdyx03:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hdyx03:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hdyx03:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "앞의 두 항이 각각 뒤의 두 항과 한 번씩 곱해지니까 2×2=4개의 항이 생겨.",
"keys": [
"앞의 각 항이 뒤의 각 항과 곱해진다",
"2×2=4"
],
"answerBy": "claude"
},
{
"id": "1hdyx03:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(2x+1)(x-3)을 전개하고 동류항을 정리해봐.",
"newQBy": "claude",
"answer": "2x×x=2x², 2x×(-3)=-6x, 1×x=x, 1×(-3)=-3이라서 2x²-6x+x-3=2x²-5x-3이야.",
"keys": [
"네 번 곱한다",
"2x²-5x-3"
],
"answerBy": "claude"
},
{
"id": "1hdyx03:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "28. (다항식)×(다항식)은 어떻게 계산할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "앞의 각 항을 뒤의 모든 항에 곱해야 하는데 ad와 bc를 빠뜨렸어. (a+b)(c+d)=ac+ad+bc+bd야.",
"keys": [
"ad, bc를 빠뜨렸다",
"ac+ad+bc+bd"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+3)²을 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "(a+b)²=a²+2ab+b²을 쓰면 x²+2×x×3+3²=x²+6x+9야.",
"keys": [
"(a+b)²=a²+2ab+b²",
"x²+6x+9"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② (2x-1)²을 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "(a-b)²=a²-2ab+b²을 쓰면 (2x)²-2×2x×1+1²=4x²-4x+1이야.",
"keys": [
"(a-b)²=a²-2ab+b²",
"4x²-4x+1"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "③ (a+b)²과 (a-b)²의 전개 공식을 각각 말해봐.",
"newQBy": "claude",
"answer": "(a+b)²=a²+2ab+b², (a-b)²=a²-2ab+b²이야.",
"keys": [
"(a+b)²=a²+2ab+b²",
"(a-b)²=a²-2ab+b²"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ip6ewl:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "(a+b)²=(a+b)(a+b)를 전개하면 ab가 한 번, ba가 한 번 나와서 둘을 더하면 2ab가 돼.",
"keys": [
"(a+b)(a+b)로 전개한다",
"ab가 두 번 나온다"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "(a-b)²=(a-b)(a-b)를 전개하면 a×(-b)와 (-b)×a가 나와서 -ab가 두 번, 즉 -2ab가 돼. 마지막 (-b)×(-b)=b²은 양수야.",
"keys": [
"-ab가 두 번 나온다",
"b²은 양수"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ip6ewl:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ip6ewl:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "a=3, b=1을 넣어서 (a+b)²=a²+2ab+b²이 맞는지 확인해봐.",
"newQBy": "claude",
"answer": "(3+1)²=16이고, 3²+2×3×1+1²=9+6+1=16이라서 맞아.",
"keys": [
"왼쪽 16",
"오른쪽 9+6+1=16"
],
"answerBy": "claude"
},
{
"id": "ip6ewl:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "29. (a+b)²과 (a-b)²은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "가운데 항 2ab를 빠뜨렸어. (a+b)²=a²+2ab+b²이야. 예를 들어 (1+2)²=9인데 1²+2²=5라서 달라.",
"keys": [
"2ab를 빠뜨렸다",
"a²+2ab+b²"
],
"answerBy": "claude"
},
{
"id": "19zyll1:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+4)(x-4)를 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "전개하면 x²-4x+4x-16인데 -4x와 4x가 없어져서 x²-16이야. (a+b)(a-b)=a²-b²이지.",
"keys": [
"가운데 항이 없어진다",
"x²-16"
],
"answerBy": "claude"
},
{
"id": "19zyll1:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "low",
"round": 2,
"by": "claude",
"answer": "(a+b)(a-b)를 전개하면 -ab와 +ab가 나오는데, 크기는 같고 부호가 반대라서 더하면 0이 돼.",
"keys": [
"-ab와 +ab",
"더하면 0"
],
"answerBy": "claude"
},
{
"id": "19zyll1:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 수의 제곱의 차가 돼. (a+b)(a-b)=a²-b²이야.",
"keys": [
"제곱의 차",
"a²-b²"
],
"answerBy": "claude"
},
{
"id": "19zyll1:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19zyll1:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19zyll1:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ 합차 공식을 이용해서 21×19를 계산하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "21×19=(20+1)(20-1)=20²-1²=400-1=399야.",
"keys": [
"(20+1)(20-1)로 본다",
"399"
],
"answerBy": "claude"
},
{
"id": "19zyll1:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19zyll1:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19zyll1:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(3x+2y)(3x-2y)를 전개해봐.",
"newQBy": "claude",
"answer": "(3x)²-(2y)²=9x²-4y²이야.",
"keys": [
"(3x)²-(2y)²",
"9x²-4y²"
],
"answerBy": "claude"
},
{
"id": "19zyll1:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "30. (a+b)(a-b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "가운데 항은 없어지지만 b²의 부호는 음수야. (a+b)(a-b)=a²-b²이야.",
"keys": [
"b² 앞의 부호는 -",
"a²-b²"
],
"answerBy": "claude"
},
{
"id": "re22kf:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+2)(x+5)를 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x의 계수는 2+5=7, 상수항은 2×5=10이라서 x²+7x+10이야.",
"keys": [
"x의 계수는 합, 상수항은 곱",
"x²+7x+10"
],
"answerBy": "claude"
},
{
"id": "re22kf:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② (x+a)(x+b)를 전개하면 x의 계수와 상수항은 각각 무엇이 돼?",
"newQBy": "claude",
"answer": "x의 계수는 a+b, 상수항은 ab야. (x+a)(x+b)=x²+(a+b)x+ab",
"keys": [
"x의 계수 a+b",
"상수항 ab"
],
"answerBy": "claude"
},
{
"id": "re22kf:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "re22kf:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "re22kf:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "전개하면 x×b=bx와 a×x=ax가 나와서 둘을 더하면 (a+b)x가 되고, 상수끼리 곱한 a×b=ab가 상수항이 돼.",
"keys": [
"ax와 bx를 더한다",
"상수끼리 곱한 것이 상수항"
],
"answerBy": "claude"
},
{
"id": "re22kf:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "re22kf:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "re22kf:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "re22kf:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(x-3)(x+5)를 전개해봐. 부호에 주의해서.",
"newQBy": "claude",
"answer": "x의 계수는 -3+5=2, 상수항은 (-3)×5=-15라서 x²+2x-15야.",
"keys": [
"x의 계수 -3+5=2",
"상수항 -15"
],
"answerBy": "claude"
},
{
"id": "re22kf:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "31. (x+a)(x+b)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x의 계수는 곱이 아니라 합이야. 2+3=5라서 x²+5x+6이고, 2×3=6은 상수항이야.",
"keys": [
"x의 계수는 합",
"x²+5x+6"
],
"answerBy": "claude"
},
{
"id": "15wcohf:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (2x+1)(3x+4)를 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "2x×3x=6x², 바깥끼리 2x×4=8x, 안쪽끼리 1×3x=3x, 1×4=4라서 6x²+11x+4야.",
"keys": [
"네 번 곱한다",
"6x²+11x+4"
],
"answerBy": "claude"
},
{
"id": "15wcohf:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "바깥끼리 곱한 ad와 안쪽끼리 곱한 bc를 더해서 ad+bc로 구해.",
"keys": [
"ad+bc",
"바깥끼리, 안쪽끼리 곱해 더한다"
],
"answerBy": "claude"
},
{
"id": "15wcohf:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "15wcohf:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "15wcohf:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "15wcohf:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "15wcohf:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "15wcohf:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x가 들어 있는 항은 ax×d=adx와 b×cx=bcx 두 개뿐이라서, 더하면 (ad+bc)x가 돼.",
"keys": [
"x항은 두 개 나온다",
"adx+bcx=(ad+bc)x"
],
"answerBy": "claude"
},
{
"id": "15wcohf:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(3x-2)(2x+5)를 전개해봐.",
"newQBy": "claude",
"answer": "3x×2x=6x², 3x×5=15x, (-2)×2x=-4x, (-2)×5=-10이라서 6x²+11x-10이야.",
"keys": [
"네 번 곱한다",
"6x²+11x-10"
],
"answerBy": "claude"
},
{
"id": "15wcohf:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "32. (ax+b)(cx+d)는 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x의 계수는 바깥끼리 곱한 2×4=8에 안쪽끼리 곱한 1×3=3도 더해야 해. 8+3=11이라서 6x²+11x+4야.",
"keys": [
"안쪽끼리 곱한 것도 더한다",
"6x²+11x+4"
],
"answerBy": "claude"
},
{
"id": "kwi8db:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (a-b+2)(a-b+1)에서 무엇을 한 문자로 바꾸면 편할까?",
"newQBy": "claude",
"answer": "두 괄호에 똑같이 들어 있는 a-b를 A로 바꾸면 편해.",
"keys": [
"공통부분 a-b",
"A로 바꾼다"
],
"answerBy": "claude"
},
{
"id": "kwi8db:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(A+2)(A+1)이 돼.",
"keys": [
"(A+2)(A+1)"
],
"answerBy": "claude"
},
{
"id": "kwi8db:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "kwi8db:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "kwi8db:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "kwi8db:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ (a-b+2)(a-b+1)을 치환해서 끝까지 전개하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "a-b=A로 놓으면 (A+2)(A+1)=A²+3A+2야. A를 다시 a-b로 바꾸면 (a-b)²+3(a-b)+2=a²-2ab+b²+3a-3b+2야.",
"keys": [
"A²+3A+2",
"A를 a-b로 되돌려 정리한다"
],
"answerBy": "claude"
},
{
"id": "kwi8db:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "kwi8db:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "a-b가 두 번 나와서 한 문자로 바꾸면 (A+2)(A+1)처럼 간단한 곱셈 공식 꼴이 돼. 항이 적어서 계산이 쉽고 실수가 줄어.",
"keys": [
"공통부분이 반복된다",
"곱셈 공식 꼴로 간단해진다"
],
"answerBy": "claude"
},
{
"id": "kwi8db:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(x+y-3)(x+y+5)를 치환해서 전개해봐.",
"newQBy": "claude",
"answer": "x+y=A로 놓으면 (A-3)(A+5)=A²+2A-15야. 되돌리면 (x+y)²+2(x+y)-15=x²+2xy+y²+2x+2y-15야.",
"keys": [
"x+y=A로 치환",
"x²+2xy+y²+2x+2y-15"
],
"answerBy": "claude"
},
{
"id": "kwi8db:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "33. (a-b+2)(a-b+1)은 어떻게 전개할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "A는 계산을 편하게 하려고 잠깐 바꾼 문자라서, 마지막에 A 대신 a-b를 넣어 다시 정리해야 해. (a-b)²+3(a-b)+2까지 정리해야 답이야.",
"keys": [
"A를 a-b로 되돌려야 한다",
"끝까지 정리한다"
],
"answerBy": "claude"
},
{
"id": "16qwt8s:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 곱셈 공식을 이용해서 103×97을 계산하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "103×97=(100+3)(100-3)=100²-3²=10000-9=9991이야.",
"keys": [
"(100+3)(100-3)",
"9991"
],
"answerBy": "claude"
},
{
"id": "16qwt8s:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 곱셈 공식을 이용해서 102²을 계산하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "102²=(100+2)²=100²+2×100×2+2²=10000+400+4=10404야.",
"keys": [
"(100+2)²",
"10404"
],
"answerBy": "claude"
},
{
"id": "16qwt8s:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16qwt8s:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16qwt8s:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16qwt8s:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ 98²과 51×49는 각각 어떤 곱셈 공식을 쓰면 좋을지 말하고, 왜 그런지 말해봐.",
"newQBy": "claude",
"answer": "98²은 (100-2)²으로 보고 (a-b)² 공식을, 51×49는 (50+1)(50-1)로 보고 합차 공식을 써. 100, 50처럼 계산하기 쉬운 수에 가깝게 바꿀 수 있어서야.",
"keys": [
"98²=(100-2)²",
"51×49=(50+1)(50-1)",
"계산하기 쉬운 수에 가깝게"
],
"answerBy": "claude"
},
{
"id": "16qwt8s:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16qwt8s:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "998과 1002는 1000보다 2 작고 2 커서 (1000-2)(1000+2)로 볼 수 있어. 합차 공식으로 1000²-2²=999996처럼 쉽게 계산돼.",
"keys": [
"1000에서 같은 만큼 떨어져 있다",
"합차 공식, 999996"
],
"answerBy": "claude"
},
{
"id": "16qwt8s:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16qwt8s:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "34. 곱셈 공식으로 복잡한 수의 곱을 계산한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "가운데 항 2×100×2=400을 빠뜨렸어. (100+2)²=10000+400+4=10404야.",
"keys": [
"2ab를 빠뜨렸다",
"10404"
],
"answerBy": "claude"
},
{
"id": "1ldtkrn:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 1/(√3+√2)의 분모를 유리화하려면 분모와 분자에 무엇을 곱해야 해?",
"newQBy": "claude",
"answer": "분모의 부호를 바꾼 √3-√2를 분모와 분자에 똑같이 곱해야 해.",
"keys": [
"√3-√2",
"분모와 분자에 똑같이 곱한다"
],
"answerBy": "claude"
},
{
"id": "1ldtkrn:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 1/(√3+√2)를 유리화하는 과정을 끝까지 말해봐.",
"newQBy": "claude",
"answer": "분모와 분자에 √3-√2를 곱하면 분모는 (√3)²-(√2)²=3-2=1이 돼서 답은 √3-√2야.",
"keys": [
"합차 공식으로 분모가 1",
"√3-√2"
],
"answerBy": "claude"
},
{
"id": "1ldtkrn:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ldtkrn:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ldtkrn:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ldtkrn:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ 2/(√5-√3)을 유리화해봐.",
"newQBy": "claude",
"answer": "분모와 분자에 √5+√3을 곱하면 분모는 5-3=2, 분자는 2(√5+√3)이라서 약분하면 √5+√3이야.",
"keys": [
"√5+√3을 곱한다",
"√5+√3"
],
"answerBy": "claude"
},
{
"id": "1ldtkrn:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ldtkrn:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(√a+√b)(√a-√b)는 합차 공식으로 (√a)²-(√b)²=a-b가 돼. 제곱하면 근호가 없어지니까 분모가 유리수가 돼.",
"keys": [
"합차 공식",
"제곱하면 근호가 없어진다"
],
"answerBy": "claude"
},
{
"id": "1ldtkrn:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ldtkrn:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "35. (a+b)(a-b)의 전개식을 이용하여 분모를 유리화한다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모에만 곱하면 분수의 값이 달라져. 분모와 분자에 똑같이 √7+√5를 곱해야 값이 그대로야. 답은 (√7+√5)/2야.",
"keys": [
"분모와 분자에 똑같이 곱해야 한다",
"(√7+√5)/2"
],
"answerBy": "claude"
},
{
"id": "n5prjg:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① a²+b²을 a+b와 ab를 써서 나타내면 어떻게 돼?",
"newQBy": "claude",
"answer": "(a+b)²=a²+2ab+b²이니까 a²+b²=(a+b)²-2ab야.",
"keys": [
"a²+b²=(a+b)²-2ab"
],
"answerBy": "claude"
},
{
"id": "n5prjg:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "n5prjg:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "n5prjg:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "n5prjg:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "n5prjg:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ a+b=5, ab=4일 때 (a-b)²의 값을 구하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "(a-b)²=a²-2ab+b²=(a+b)²-4ab야. 그래서 5²-4×4=25-16=9야.",
"keys": [
"(a-b)²=(a+b)²-4ab",
"9"
],
"answerBy": "claude"
},
{
"id": "n5prjg:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "n5prjg:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(a+b)²을 전개하면 a²+2ab+b²이라서 a²+b²보다 2ab가 더 있어. 그래서 (a+b)²에서 2ab를 빼면 a²+b²이 돼.",
"keys": [
"(a+b)²=a²+2ab+b²",
"2ab를 뺀다"
],
"answerBy": "claude"
},
{
"id": "n5prjg:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"newQ": "a+b=5, ab=3일 때 a²+b²의 값을 구해봐.",
"newQBy": "claude",
"answer": "(a+b)²-2ab=25-6=19야.",
"keys": [
"(a+b)²-2ab",
"19"
],
"answerBy": "claude"
},
{
"id": "n5prjg:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "36. a+b, ab의 값을 이용하여 a²+b²의 값을 구할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(a+b)²에는 2ab가 들어 있어서 그걸 빼야 해. 36-2×7=22야.",
"keys": [
"2ab를 빼야 한다",
"22"
],
"answerBy": "claude"
},
{
"id": "1lq8ljt:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x=3+√2일 때 x²-6x+5의 값을 구하려면, 대입하기 전에 무엇을 먼저 하면 편할까?",
"newQBy": "claude",
"answer": "x-3=√2로 정수 부분을 옮긴 다음 양변을 제곱해. 그러면 x²-6x+9=2라서 x²-6x=-7을 얻을 수 있어.",
"keys": [
"정수 부분을 이항한다",
"양변을 제곱해 근호를 없앤다"
],
"answerBy": "claude"
},
{
"id": "1lq8ljt:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lq8ljt:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lq8ljt:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lq8ljt:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lq8ljt:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ x=3+√2일 때 x²-6x+5의 값을 끝까지 구해봐.",
"newQBy": "claude",
"answer": "x-3=√2의 양변을 제곱하면 x²-6x+9=2라서 x²-6x=-7이야. 그래서 x²-6x+5=-7+5=-2야.",
"keys": [
"x²-6x=-7",
"-2"
],
"answerBy": "claude"
},
{
"id": "1lq8ljt:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lq8ljt:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "그대로 넣으면 (3+√2)²처럼 근호가 있는 계산을 여러 번 해야 해서 복잡하고 실수하기 쉬워. 이항해서 제곱하면 근호가 한 번에 없어져서 간단해.",
"keys": [
"그대로 넣으면 근호 계산이 복잡하다",
"제곱하면 근호가 없어진다"
],
"answerBy": "claude"
},
{
"id": "1lq8ljt:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "x=2-√3일 때 x²-4x의 값을 구해봐.",
"newQBy": "claude",
"answer": "x-2=-√3의 양변을 제곱하면 x²-4x+4=3이라서 x²-4x=-1이야.",
"keys": [
"x-2=-√3을 제곱한다",
"-1"
],
"answerBy": "claude"
},
{
"id": "1lq8ljt:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "37. x=(무리수)일 때, 식의 값을 어떻게 구할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x-3)²은 x²-9가 아니라 x²-6x+9야. 가운데 항 -6x를 빠뜨렸어.",
"keys": [
"(x-3)²=x²-6x+9",
"-6x를 빠뜨렸다"
],
"answerBy": "claude"
},
{
"id": "k8t835:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "공통인수라고 해.",
"keys": [
"공통인수"
],
"answerBy": "claude"
},
{
"id": "k8t835:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 2x²+6x를 공통인수로 묶어 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "두 항에 공통으로 있는 2x로 묶으면 2x(x+3)이야.",
"keys": [
"공통인수 2x",
"2x(x+3)"
],
"answerBy": "claude"
},
{
"id": "k8t835:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "k8t835:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "k8t835:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "② 6a²b-9ab²에서 공통인수를 찾는 방법을 말해봐.",
"newQBy": "claude",
"answer": "계수 6과 9의 최대공약수 3, 문자는 공통인 a와 b를 가장 낮은 차수로 골라서 3ab가 공통인수야. 그래서 3ab(2a-3b)야.",
"keys": [
"계수의 최대공약수",
"공통인 문자를 낮은 차수로",
"3ab(2a-3b)"
],
"answerBy": "claude"
},
{
"id": "k8t835:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "k8t835:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "k8t835:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "덜 묶으면 괄호 안에 아직 공통인수가 남아서 인수분해가 끝난 게 아니야. 예를 들어 4x²+8x를 2x(2x+4)로 하면 안에 2가 남아서 4x(x+2)까지 해야 해.",
"keys": [
"괄호 안에 공통인수가 남는다",
"끝까지 묶어야 인수분해 완성"
],
"answerBy": "claude"
},
{
"id": "k8t835:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "k8t835:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "39. 공통인수를 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "세 항 모두에 공통인수 a가 있으니까 전체를 묶어야 해. ax+ay-a=a(x+y-1)이야.",
"keys": [
"모든 항을 묶어야 한다",
"a(x+y-1)"
],
"answerBy": "claude"
},
{
"id": "aj6e1g:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x(a+b)+y(a+b)를 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "(a+b)를 한 덩어리 공통인수로 보고 묶으면 (a+b)(x+y)야.",
"keys": [
"(a+b)가 공통인수",
"(a+b)(x+y)"
],
"answerBy": "claude"
},
{
"id": "aj6e1g:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "aj6e1g:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "aj6e1g:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "aj6e1g:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "aj6e1g:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ a(x-y)-b(y-x)는 어떻게 인수분해해?",
"newQBy": "claude",
"answer": "y-x=-(x-y)라서 -b(y-x)=+b(x-y)야. 그러면 a(x-y)+b(x-y)=(x-y)(a+b)야.",
"keys": [
"y-x=-(x-y)",
"(x-y)(a+b)"
],
"answerBy": "claude"
},
{
"id": "aj6e1g:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "aj6e1g:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "두 항에 똑같은 (a+b)가 곱해져 있어서, 분배법칙을 거꾸로 쓰면 (a+b)를 앞으로 꺼낼 수 있어.",
"keys": [
"두 항에 (a+b)가 곱해져 있다",
"분배법칙을 거꾸로"
],
"answerBy": "claude"
},
{
"id": "aj6e1g:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(x+1)²-3(x+1)을 인수분해해봐.",
"newQBy": "claude",
"answer": "x+1이 공통이니까 묶으면 (x+1){(x+1)-3}=(x+1)(x-2)야.",
"keys": [
"(x+1)로 묶는다",
"(x+1)(x-2)"
],
"answerBy": "claude"
},
{
"id": "aj6e1g:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "40. 괄호로 묶인 부분이 공통인수일 때는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(a+b)가 두 항에 공통으로 있으니까 전개하지 말고 그대로 묶어야 해. 답은 (a+b)(x+y)야. 전개한 식은 인수분해가 아니야.",
"keys": [
"괄호를 한 덩어리로 본다",
"(a+b)(x+y)"
],
"answerBy": "claude"
},
{
"id": "1hsfeqs:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① ax+a+bx+b를 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "두 항씩 묶으면 a(x+1)+b(x+1)이고, 다시 (x+1)로 묶으면 (x+1)(a+b)야.",
"keys": [
"두 항씩 묶는다",
"(x+1)(a+b)"
],
"answerBy": "claude"
},
{
"id": "1hsfeqs:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hsfeqs:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hsfeqs:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hsfeqs:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hsfeqs:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ xy-x+y-1은 어떻게 묶어야 인수분해가 돼?",
"newQBy": "claude",
"answer": "xy-x와 y-1로 묶으면 x(y-1)+(y-1)이 돼서 (y-1)(x+1)이야. 묶었을 때 괄호 안이 같아지게 짝지어야 해.",
"keys": [
"괄호 안이 같아지게 묶는다",
"(y-1)(x+1)"
],
"answerBy": "claude"
},
{
"id": "1hsfeqs:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hsfeqs:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "두 항씩 묶으면 a(x+1)과 b(x+1)처럼 똑같은 (x+1)이 생겨. 이 (x+1)이 공통인수가 돼서 한 번 더 묶을 수 있어.",
"keys": [
"묶으면 같은 괄호가 생긴다",
"그 괄호로 다시 묶는다"
],
"answerBy": "claude"
},
{
"id": "1hsfeqs:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"newQ": "ab+2a+3b+6을 인수분해해봐.",
"newQBy": "claude",
"answer": "a(b+2)+3(b+2)=(b+2)(a+3)이야.",
"keys": [
"두 항씩 묶는다",
"(b+2)(a+3)"
],
"answerBy": "claude"
},
{
"id": "1hsfeqs:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "41. ax+a+bx+b는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "a(x+1)+b(x+1)은 아직 두 항의 합이라 인수분해가 끝나지 않았어. 공통인 (x+1)로 한 번 더 묶어서 (x+1)(a+b)로 해야 해.",
"keys": [
"아직 합의 꼴이다",
"(x+1)(a+b)"
],
"answerBy": "claude"
},
{
"id": "6gfmmw:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x²+10x+25를 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x²=x², 25=5², 가운데 10x=2×x×5라서 완전제곱식이야. (x+5)²이야.",
"keys": [
"25=5², 10x=2×x×5",
"(x+5)²"
],
"answerBy": "claude"
},
{
"id": "6gfmmw:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(다항식)²처럼 어떤 다항식의 제곱으로 된 식, 또는 그 식에 수를 곱한 식이야. 예) (x+3)², 2(x-1)²",
"keys": [
"다항식의 제곱",
"또는 그것의 상수배"
],
"answerBy": "claude"
},
{
"id": "6gfmmw:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "③ 4x²-12x+9를 인수분해해봐.",
"newQBy": "claude",
"answer": "4x²=(2x)², 9=3², 가운데가 -12x=-2×2x×3이라서 (2x-3)²이야.",
"keys": [
"(2x)², 3²",
"(2x-3)²"
],
"answerBy": "claude"
},
{
"id": "6gfmmw:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6gfmmw:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6gfmmw:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6gfmmw:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6gfmmw:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(a+b)²을 전개하면 가운데 항이 +2ab, (a-b)²은 -2ab야. 그래서 가운데 항이 +이면 (a+b)², -이면 (a-b)²이야.",
"keys": [
"(a+b)²은 +2ab",
"(a-b)²은 -2ab"
],
"answerBy": "claude"
},
{
"id": "6gfmmw:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6gfmmw:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "42. a²+2ab+b², a²-2ab+b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "가운데 항이 -6x라서 (x-3)²이야. (x+3)²을 전개하면 x²+6x+9가 돼서 달라.",
"keys": [
"가운데 항이 음수",
"(x-3)²"
],
"answerBy": "claude"
},
{
"id": "u7mz11:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x²+6x+□가 완전제곱식이 되려면 □는 얼마여야 해?",
"newQBy": "claude",
"answer": "x의 계수 6의 반인 3을 제곱해서 9야. x²+6x+9=(x+3)²",
"keys": [
"(x의 계수의 반)²",
"9"
],
"answerBy": "claude"
},
{
"id": "u7mz11:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "② 9x²+12x+4가 완전제곱식인지 어떻게 확인해?",
"newQBy": "claude",
"answer": "9x²=(3x)², 4=2²이고, 가운데 항이 2×3x×2=12x인지 확인해. 맞으니까 (3x+2)²이야.",
"keys": [
"양 끝이 제곱인지 본다",
"가운데가 2×(3x)×2인지 확인",
"(3x+2)²"
],
"answerBy": "claude"
},
{
"id": "u7mz11:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+m)²=x²+2mx+m²이라서 x의 계수는 2m, 상수항은 m²이야. 그래서 x의 계수의 반인 m을 제곱한 것이 상수항이 돼야 해.",
"keys": [
"(x+m)²=x²+2mx+m²",
"계수의 반을 제곱"
],
"answerBy": "claude"
},
{
"id": "u7mz11:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u7mz11:qcondition",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x²의 계수가 1이면 (x의 계수의 반)²이 상수항인지만 보면 돼. 1이 아니면 양 끝이 (2x)², 3² 같은 제곱인지 보고, 가운데 항이 2×(2x)×3처럼 되는지 확인해.",
"keys": [
"계수가 1이면 (반)²만 본다",
"1이 아니면 양 끝 제곱과 가운데 2배를 확인"
],
"answerBy": "claude"
},
{
"id": "u7mz11:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "43. 완전제곱식으로 인수분해할 식인지 어떻게 확인할 수 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x의 계수 8의 반인 4의 제곱은 16인데 상수항이 15라서 완전제곱식이 아니야. x²+8x+15=(x+3)(x+5)야.",
"keys": [
"(8의 반)²=16≠15",
"완전제곱식이 아니다"
],
"answerBy": "claude"
},
{
"id": "68hod3:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② x²+□x+25가 완전제곱식이 되도록 하는 □의 값을 구하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "25=5²이니까 (x+5)² 또는 (x-5)²이 돼야 해. 가운데 항은 ±2×x×5=±10x라서 □=10 또는 -10이야.",
"keys": [
"25=5²",
"□=±10"
],
"answerBy": "claude"
},
{
"id": "68hod3:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "25=5²=(-5)²이라서 (x+5)²과 (x-5)² 둘 다 상수항이 25야. 두 식의 가운데 항이 10x, -10x라서 □는 두 값이야.",
"keys": [
"(x+5)²과 (x-5)² 둘 다 가능",
"±10"
],
"answerBy": "claude"
},
{
"id": "68hod3:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "68hod3:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "qset",
"round": 1,
"by": "claude",
"newQ": "x²+□x+49가 완전제곱식이 되도록 □를 구해봐.",
"newQBy": "claude",
"answer": "49=7²이니까 □=±2×7=±14야.",
"keys": [
"49=7²",
"□=±14"
],
"answerBy": "claude"
},
{
"id": "68hod3:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "44. x²+□x+25가 완전제곱식이 되도록 하는 □의 값은?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x-5)²=x²-10x+25도 완전제곱식이라서 -10도 답이야. □=10 또는 -10이야.",
"keys": [
"-10을 빠뜨렸다",
"±10"
],
"answerBy": "claude"
},
{
"id": "1edqgvx:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x²-25를 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x²-5²으로 보고 a²-b²=(a+b)(a-b)를 쓰면 (x+5)(x-5)야.",
"keys": [
"x²-5²",
"(x+5)(x-5)"
],
"answerBy": "claude"
},
{
"id": "1edqgvx:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(a+b)(a-b)=a²-b²이라는 곱셈 공식을 거꾸로 쓴 거야.",
"keys": [
"(a+b)(a-b)=a²-b²의 역"
],
"answerBy": "claude"
},
{
"id": "1edqgvx:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1edqgvx:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1edqgvx:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1edqgvx:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1edqgvx:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1edqgvx:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(a+b)(a-b)를 전개하면 -ab와 +ab가 없어져서 a²-b²이 돼. 그래서 거꾸로 a²-b²은 (a+b)(a-b)로 인수분해돼.",
"keys": [
"전개하면 가운데 항이 없어진다",
"거꾸로 인수분해"
],
"answerBy": "claude"
},
{
"id": "1edqgvx:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "9x²-4y²을 인수분해해봐.",
"newQBy": "claude",
"answer": "(3x)²-(2y)²으로 보면 (3x+2y)(3x-2y)야.",
"keys": [
"(3x)²-(2y)²",
"(3x+2y)(3x-2y)"
],
"answerBy": "claude"
},
{
"id": "1edqgvx:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "45. a²-b²은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x-4)²을 전개하면 x²-8x+16이라서 x²-16과 달라. 제곱의 차니까 (x+4)(x-4)야.",
"keys": [
"(x-4)²≠x²-16",
"(x+4)(x-4)"
],
"answerBy": "claude"
},
{
"id": "6swa1s:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x²+5x+6을 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "곱해서 6, 더해서 5가 되는 두 수 2와 3을 찾으면 (x+2)(x+3)이야.",
"keys": [
"곱 6, 합 5인 두 수",
"(x+2)(x+3)"
],
"answerBy": "claude"
},
{
"id": "6swa1s:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6swa1s:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6swa1s:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6swa1s:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6swa1s:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ x²-2x-15를 인수분해할 때 두 수의 부호는 어떻게 정해?",
"newQBy": "claude",
"answer": "곱이 -15로 음수니까 두 수의 부호가 달라. 합이 -2로 음수니까 절댓값이 큰 쪽이 음수야. 그래서 3과 -5, (x+3)(x-5)야.",
"keys": [
"곱이 음수면 부호가 다르다",
"합의 부호로 큰 쪽을 정한다",
"(x+3)(x-5)"
],
"answerBy": "claude"
},
{
"id": "6swa1s:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6swa1s:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+a)(x+b)를 전개하면 x²+(a+b)x+ab야. 그래서 합이 x의 계수, 곱이 상수항인 두 수를 찾으면 그 두 수가 a, b가 돼.",
"keys": [
"(x+a)(x+b)=x²+(a+b)x+ab",
"합과 곱이 맞으면 a, b"
],
"answerBy": "claude"
},
{
"id": "6swa1s:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"newQ": "x²-7x+12를 인수분해해봐.",
"newQBy": "claude",
"answer": "곱이 12, 합이 -7인 두 수는 -3과 -4라서 (x-3)(x-4)야.",
"keys": [
"곱 12, 합 -7",
"(x-3)(x-4)"
],
"answerBy": "claude"
},
{
"id": "6swa1s:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "46. x²+(a+b)x+ab는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "1+(-6)=-5라서 x의 계수 1과 달라. 곱이 -6, 합이 1인 두 수는 3과 -2라서 (x+3)(x-2)야.",
"keys": [
"합도 확인해야 한다",
"(x+3)(x-2)"
],
"answerBy": "claude"
},
{
"id": "qa2uvd:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"newQ": "① 3x²+5x+2를 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "3x²=3x×x, 2=2×1로 나누어 놓고 대각선으로 곱해 더해 봐. 3x×1+x×2=5x로 맞으니까 (3x+2)(x+1)이야.",
"keys": [
"x²의 계수와 상수항을 두 수의 곱으로",
"대각선 곱의 합이 5x",
"(3x+2)(x+1)"
],
"answerBy": "claude"
},
{
"id": "qa2uvd:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qa2uvd:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(ax+b)(cx+d)를 전개하면 x항은 ax×d와 b×cx 두 개야. 대각선으로 곱한 것이 바로 이 두 항이라서, 더하면 x의 계수가 맞는지 알 수 있어.",
"keys": [
"x항은 adx와 bcx",
"대각선 곱이 그 두 항"
],
"answerBy": "claude"
},
{
"id": "qa2uvd:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "6x²-x-2를 인수분해해봐.",
"newQBy": "claude",
"answer": "6x²=2x×3x, -2=1×(-2)로 놓으면 대각선 곱의 합이 2x×(-2)+1×3x=-x야. 그래서 (2x+1)(3x-2)야.",
"keys": [
"대각선 곱의 합 -x",
"(2x+1)(3x-2)"
],
"answerBy": "claude"
},
{
"id": "qa2uvd:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "47. acx²+(ad+bc)x+bd는 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(2x+3)(x+1)을 전개하면 2x²+5x+3이라서 7x가 안 나와. 대각선 곱의 합이 7x가 되는 (2x+1)(x+3)이 맞아.",
"keys": [
"대각선 곱의 합을 확인해야 한다",
"(2x+1)(x+3)"
],
"answerBy": "claude"
},
{
"id": "pz1wmy:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 다항식이 x-2를 인수로 가지면, x=2를 대입했을 때 식의 값은 얼마가 돼?",
"newQBy": "claude",
"answer": "0이 돼. (x-2)×(다른 인수)에서 x=2이면 x-2=0이라 곱이 0이야.",
"keys": [
"0",
"x-2=0이 되기 때문"
],
"answerBy": "claude"
},
{
"id": "pz1wmy:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pz1wmy:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pz1wmy:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pz1wmy:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "high",
"round": 1,
"by": "claude",
"newQ": "② 2x²+Ax-6이 x-2로 나누어떨어질 때, A의 값을 구하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x=2를 대입하면 0이 돼야 해. 2×4+2A-6=0이라서 2A=-2, A=-1이야.",
"keys": [
"x=2를 대입해 0",
"A=-1"
],
"answerBy": "claude"
},
{
"id": "pz1wmy:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pz1wmy:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pz1wmy:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x-2가 인수면 식을 (x-2)×(다른 식)으로 쓸 수 있어. x=2를 넣으면 x-2가 0이 되니까 곱 전체가 0이 돼.",
"keys": [
"(x-2)×(다른 식)",
"x=2이면 0을 곱하게 된다"
],
"answerBy": "claude"
},
{
"id": "pz1wmy:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "x²+ax-10이 x+2로 나누어떨어질 때 a의 값을 구해봐.",
"newQBy": "claude",
"answer": "x+2=0이 되는 x=-2를 대입하면 4-2a-10=0이라서 a=-3이야.",
"keys": [
"x=-2를 대입한다",
"a=-3"
],
"answerBy": "claude"
},
{
"id": "pz1wmy:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "48. 2x²+Ax-6이 x-2로 나누어 떨어질 때, A의 값은?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x-2가 0이 되는 값은 x=2야. x=-2를 넣으면 x-2=-4가 돼서 0이 되지 않아.",
"keys": [
"x-2=0이 되는 x=2",
"부호를 거꾸로 했다"
],
"answerBy": "claude"
},
{
"id": "hcf6wg:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+y)²+10(x+y)+24를 인수분해할 때 무엇을 한 문자로 바꾸면 편해?",
"newQBy": "claude",
"answer": "반복되는 x+y를 A로 바꾸면 A²+10A+24로 간단해져.",
"keys": [
"반복되는 x+y",
"A로 바꾼다"
],
"answerBy": "claude"
},
{
"id": "hcf6wg:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf6wg:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf6wg:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"newQ": "① (x+y)²+10(x+y)+24를 치환해서 끝까지 인수분해하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x+y=A로 놓으면 A²+10A+24=(A+4)(A+6)이야. A를 되돌리면 (x+y+4)(x+y+6)이야.",
"keys": [
"(A+4)(A+6)",
"A를 되돌려 (x+y+4)(x+y+6)"
],
"answerBy": "claude"
},
{
"id": "hcf6wg:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf6wg:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf6wg:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf6wg:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x+y가 반복돼서 A로 바꾸면 A²+10A+24처럼 익숙한 이차식이 돼. 그대로 전개하면 항이 많아져서 복잡해.",
"keys": [
"반복되는 부분을 한 문자로",
"익숙한 이차식이 된다"
],
"answerBy": "claude"
},
{
"id": "hcf6wg:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "(a+1)²-5(a+1)+6을 인수분해해봐.",
"newQBy": "claude",
"answer": "a+1=A로 놓으면 A²-5A+6=(A-2)(A-3)이야. 되돌리면 (a+1-2)(a+1-3)=(a-1)(a-2)야.",
"keys": [
"a+1=A",
"(a-1)(a-2)"
],
"answerBy": "claude"
},
{
"id": "hcf6wg:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "49. 치환을 이용하여 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "A는 잠깐 바꾼 문자라서 마지막에 x+y로 되돌려야 해. 답은 (x+y+4)(x+y+6)이야.",
"keys": [
"A를 되돌려야 한다",
"(x+y+4)(x+y+6)"
],
"answerBy": "claude"
},
{
"id": "jysd0p:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+1)(x+2)(x+3)(x+4)-24를 인수분해하려면 네 일차식을 어떻게 짝지어 곱해야 해?",
"newQBy": "claude",
"answer": "상수항의 합이 같아지게 (x+1)(x+4)와 (x+2)(x+3)으로 짝지어. 그러면 x²+5x+4와 x²+5x+6이 돼서 x²+5x가 공통으로 생겨.",
"keys": [
"상수항의 합이 같게 짝짓는다",
"x²+5x가 공통"
],
"answerBy": "claude"
},
{
"id": "jysd0p:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "① (x+1)(x+2)(x+3)(x+4)-24를 끝까지 인수분해해봐.",
"newQBy": "claude",
"answer": "(x²+5x+4)(x²+5x+6)-24에서 x²+5x=A로 놓으면 (A+4)(A+6)-24=A²+10A=A(A+10)이야. 되돌리면 (x²+5x)(x²+5x+10)=x(x+5)(x²+5x+10)이야.",
"keys": [
"짝지어 곱하고 x²+5x=A",
"A(A+10)",
"x(x+5)(x²+5x+10)"
],
"answerBy": "claude"
},
{
"id": "jysd0p:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+a)(x+b)=x²+(a+b)x+ab라서 상수항의 합 a+b가 x의 계수가 돼. 두 짝의 합이 같으면 x²과 x항이 똑같아져서 공통부분이 생겨.",
"keys": [
"상수항의 합이 x의 계수",
"합이 같으면 x²+(합)x가 같다"
],
"answerBy": "claude"
},
{
"id": "jysd0p:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jysd0p:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "50. ( )( )( )( )+k 꼴은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "순서대로 묶으면 x²-4x+3과 x²+6x+8이라 공통부분이 안 생겨. 상수항의 합이 같게 (x-1)(x+2)와 (x-3)(x+4)로 묶어야 둘 다 x²+x가 들어가서 치환할 수 있어.",
"keys": [
"공통부분이 생기지 않는다",
"(x-1)(x+2), (x-3)(x+4)로 묶는다"
],
"answerBy": "claude"
},
{
"id": "z3a7vj:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "차수가 가장 낮은 문자에 대해 내림차순으로 정리해.",
"keys": [
"차수가 낮은 문자",
"내림차순으로 정리"
],
"answerBy": "claude"
},
{
"id": "z3a7vj:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "차수가 낮은 문자로 정리하면 그 문자가 들어간 항이 적고 간단해서, 나머지 부분에서 공통인수나 인수분해 공식이 잘 보여.",
"keys": [
"항이 간단해진다",
"공통인수·공식이 잘 보인다"
],
"answerBy": "claude"
},
{
"id": "z3a7vj:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ x²+xy+2x+y+1을 y에 대해 정리해서 인수분해해봐.",
"newQBy": "claude",
"answer": "y는 1차라서 y에 대해 정리하면 y(x+1)+(x²+2x+1)=y(x+1)+(x+1)²이야. (x+1)로 묶으면 (x+1)(x+y+1)이야.",
"keys": [
"y(x+1)+(x+1)²",
"(x+1)(x+y+1)"
],
"answerBy": "claude"
},
{
"id": "z3a7vj:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "z3a7vj:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "52. 항이 5개 이상인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "항을 정리하지 않으면 공통부분이 안 보여. x²-2xy+y²=(x-y)², -7x+7y=-7(x-y)로 정리하면 (x-y)²-7(x-y)+12가 돼서 (x-y-3)(x-y-4)야.",
"keys": [
"정리해서 공통부분 x-y를 찾는다",
"(x-y-3)(x-y-4)"
],
"answerBy": "claude"
},
{
"id": "1pesxge:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 인수분해를 이용해서 99²-1을 계산하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "99²-1²=(99+1)(99-1)=100×98=9800이야.",
"keys": [
"합차 공식",
"9800"
],
"answerBy": "claude"
},
{
"id": "1pesxge:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 인수분해를 이용해서 18×101+18×99를 계산해봐.",
"newQBy": "claude",
"answer": "공통인수 18로 묶으면 18×(101+99)=18×200=3600이야.",
"keys": [
"18로 묶는다",
"3600"
],
"answerBy": "claude"
},
{
"id": "1pesxge:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pesxge:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pesxge:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pesxge:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ 57²-43²과 17×23+17×77은 각각 어떤 인수분해를 쓰면 좋을지 말하고 계산해봐.",
"newQBy": "claude",
"answer": "57²-43²은 제곱의 차라서 (57+43)(57-43)=100×14=1400이야. 17×23+17×77은 공통인수 17로 묶어서 17×100=1700이야.",
"keys": [
"제곱의 차는 합차 공식",
"공통인수로 묶는다",
"1400, 1700"
],
"answerBy": "claude"
},
{
"id": "1pesxge:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pesxge:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "18로 묶으면 101+99=200처럼 딱 떨어지는 수가 먼저 나와서, 곱셈을 한 번만 하면 돼.",
"keys": [
"괄호 안이 계산하기 쉬운 수",
"곱셈을 한 번만 한다"
],
"answerBy": "claude"
},
{
"id": "1pesxge:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pesxge:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "53. 인수분해를 이용하여 수의 계산을 빠르게 할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① x=102, y=98일 때 x²-y²의 값을 구하려면, 대입하기 전에 무엇을 하면 편할까?",
"newQBy": "claude",
"answer": "먼저 x²-y²=(x+y)(x-y)로 인수분해해. 그러면 (102+98)(102-98)=200×4=800으로 쉽게 구할 수 있어.",
"keys": [
"먼저 인수분해한다",
"800"
],
"answerBy": "claude"
},
{
"id": "1eeesrf:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:t0H3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:qrecall",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eeesrf:qreason",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x²+2x+1=(x+1)²이라서 x=99를 넣으면 100²=10000이야. 인수분해하면 99+1=100처럼 계산하기 쉬운 수가 나와.",
"keys": [
"(x+1)²으로 인수분해",
"100²=10000"
],
"answerBy": "claude"
},
{
"id": "1eeesrf:qexample",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"newQ": "x=2.5, y=1.5일 때 x²+2xy+y²의 값을 구해봐.",
"newQBy": "claude",
"answer": "x²+2xy+y²=(x+y)²이라서 (2.5+1.5)²=4²=16이야.",
"keys": [
"(x+y)²으로 인수분해",
"16"
],
"answerBy": "claude"
},
{
"id": "1eeesrf:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "54. 인수분해하면 식의 값을 편리하게 구할 수 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "그대로 계산해도 되지만 복잡하고 실수하기 쉬워. (x+1)²으로 인수분해하면 100²=10000으로 바로 나와.",
"keys": [
"인수분해하면 쉬운 수가 된다",
"10000"
],
"answerBy": "claude"
}
],
"seen": [
"M3111",
"M3112"
]
} });
