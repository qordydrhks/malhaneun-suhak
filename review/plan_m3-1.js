/* [v84.6] 질문 고르기 — 기본으로 실어 두는 분류안 (중3-1)
   마스터 견본(2026-09-18: 38 인수분해란·51 항이 4개인 식 + 1단원 문장 고침) + Claude 2단원 나머지 25소단원
   (연산 질문으로 고침 newQBy:'claude' · 회차 by · 뺌 offBy · 모범 답 answerBy). 화면 열 때 한 번만 넣음.
   [b] 마스터 검토2(3단원 55·56·59·63·70) 반영 + Claude 3단원 나머지 17소단원(활용 73~77은 대표 문제를 주고 식 세우기로). */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'m3-1_2026-09-18b', data:{
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
"id": "14b60r4:t0L1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"answer": "인수분해라고 해.",
"keys": [
"인수분해"
],
"answerBy": "claude",
"ok": true
},
{
"id": "14b60r4:t0L2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"answer": "서로 반대 과정이야. 전개는 곱을 풀어서 하나의 다항식으로 만들고, 인수분해는 하나의 다항식을 곱의 꼴로 나타내.",
"keys": [
"서로 반대 과정",
"전개는 곱을 풀기, 인수분해는 곱으로 나타내기"
],
"answerBy": "claude",
"ok": true
},
{
"id": "14b60r4:t0L3",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "low",
"round": 1,
"answer": "곱해진 각각의 다항식을 처음 다항식의 인수라고 해.",
"keys": [
"인수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "14b60r4:t0H1",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "38. 인수분해란?",
"kind": "high",
"round": 2,
"answer": "인수분해는 하나의 다항식을 두 개 이상의 다항식의 곱으로 나타내는 거야. 예를 들어 x²+5x+6=(x+2)(x+3)이고, 거꾸로 (x+2)(x+3)을 풀어 x²+5x+6으로 만드는 게 전개라서 둘은 반대 과정이야.",
"keys": [
"다항식을 곱으로 나타낸다",
"전개와 반대 과정"
],
"answerBy": "claude",
"ok": true
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
"answer": "예를 들어 x²+5x+6=(x+2)(x+3)이고, 인수는 x+2와 x+3이야.",
"keys": [
"인수분해된 식을 만든다",
"곱해진 각각이 인수"
],
"answerBy": "claude",
"ok": true
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
"answer": "두 항씩 묶어 공통인수를 만든 뒤 한 번 더 묶는 방법(2+2)과, 세 항을 완전제곱식으로 만들고 남은 한 항과 제곱의 차로 만들어 합차 공식을 쓰는 방법(3+1)이 있어.",
"keys": [
"2+2로 묶어 공통인수",
"3+1로 묶어 완전제곱식-제곱"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1a3d8ww:t0H2",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "high",
"round": 2,
"answer": "두 항씩 묶었을 때 괄호 안이 같아지면 2+2로 묶어. 세 항이 x²+2x+1처럼 완전제곱식이 되고 나머지 한 항이 y² 같은 제곱이면 3+1로 묶어.",
"keys": [
"괄호 안이 같아지면 2+2",
"완전제곱식+제곱이면 3+1"
],
"answerBy": "claude",
"ok": true
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
"answer": "예를 들어 x²+2x+1-y²은 (x+1)²-y²으로 묶어서 (x+1+y)(x+1-y)야.",
"keys": [
"세 항이 완전제곱식",
"합차 공식으로 인수분해"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1a3d8ww:qerror",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "qset",
"round": 2,
"answer": "x²-6x+9가 완전제곱식이라서 3+1로 묶어야 해. (x²-6x+9)-y²=(x-3)²-y²=(x-3+y)(x-3-y)야.",
"keys": [
"x²-6x+9를 한 묶음으로",
"(x-3+y)(x-3-y)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1a3d8ww:qamu6pqs89n71e",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "add",
"round": 1,
"answer": "x²+2x+1을 한 묶음으로 보면 (x+1)²-y²이 돼. 합차 공식으로 (x+1+y)(x+1-y)야.",
"keys": [
"(x+1)²-y²",
"(x+y+1)(x-y+1)"
],
"answerBy": "claude",
"q": "𝑥²−𝑦²+2𝑥+1 인수분해 하는 과정을 간단히 얘기해봐",
"ok": true
},
{
"id": "1a3d8ww:qamu6psfuae3ju",
"big": "2. 다항식의 곱셈과 인수분해",
"small": "51. 항이 4개인 식은 어떻게 인수분해할까?",
"kind": "add",
"round": 1,
"answer": "두 항씩 묶으면 x(y+1)+(y+1)이고, (y+1)로 묶으면 (y+1)(x+1)이야.",
"keys": [
"두 항씩 묶는다",
"(y+1)(x+1)"
],
"answerBy": "claude",
"q": "xy+x+y+1 인수분해 하는 과정을 간단히 얘기해봐",
"ok": true
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
},
{
"id": "1iiqpnh:t0L1",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "low",
"round": 1,
"newQ": "① 어떤식을 이차방정식이라고 하는지 말해봐",
"answer": "모든 항을 좌변으로 이항해서 정리했을 때 (x에 대한 이차식)=0 꼴이 되는 방정식을 x에 대한 이차방정식이라고 해.",
"keys": [
"모든 항을 좌변으로 정리",
"(x에 대한 이차식)=0"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:t0L2",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "low",
"off": true,
"ok": true
},
{
"id": "1iiqpnh:t0L3",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "low",
"round": 1,
"newQ": "③ 이차항의 계수는 0이 될 수 없는 이유는?",
"answer": "이차항의 계수가 0이면 x² 항이 없어져서 이차식이 아니게 돼. 그러면 이차방정식이 아니야.",
"keys": [
"x² 항이 없어진다",
"이차방정식이 아니게 된다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:t0H1",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "high",
"round": 2,
"newQ": "① 이차방정식에 대해 자세히 설명해 봐.",
"answer": "x에 대한 이차방정식은 모든 항을 좌변으로 옮겨 정리했을 때 ax²+bx+c=0(a, b, c는 상수, a≠0) 꼴이 되는 방정식이야. x²의 계수 a는 0이 아니어야 하고, b와 c는 0이어도 돼.",
"keys": [
"ax²+bx+c=0 꼴",
"a≠0",
"b, c는 0이어도 된다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:t0H2",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "high",
"round": 2,
"off": true,
"newQ": "② 문제에서 주어진 식이 이차방정식인지 확인하는 과정을 설명해줘",
"ok": true
},
{
"id": "1iiqpnh:t0H3",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "high",
"round": 2,
"newQ": "③ 어떤 식이 이차방정식인지 판단하는 방법 또는 순서를 설명해 봐.",
"answer": "먼저 괄호가 있으면 전개하고, 모든 항을 좌변으로 이항해서 동류항끼리 정리해. 그다음 x²의 계수가 0이 아닌지 확인해. 0이 아니면 이차방정식이야.",
"keys": [
"전개하고 좌변으로 정리",
"x²의 계수가 0이 아닌지 확인"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:qrecall",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "qset",
"round": 1,
"newQ": "이차방정식이 어떤 모양의 방정식인지 식의 꼴을 얘기해봐",
"answer": "ax²+bx+c=0 꼴이야. 단, a, b, c는 상수이고 a≠0이야.",
"keys": [
"ax²+bx+c=0",
"a≠0"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:qreason",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "qset",
"round": 2,
"answer": "a=0이면 x² 항이 없어져서 bx+c=0이라는 일차방정식(또는 등식)이 돼. 그래서 이차방정식이 되려면 a≠0이 꼭 필요해.",
"keys": [
"a=0이면 x² 항이 없다",
"일차방정식이 된다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:qexample",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "qset",
"round": 2,
"answer": "예를 들어 2x²-3x+1=0은 x²의 계수가 2로 0이 아니니까 x에 대한 이차방정식이야.",
"keys": [
"(x에 대한 이차식)=0 꼴",
"x²의 계수가 0이 아니다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1iiqpnh:qerror",
"big": "3. 이차방정식",
"small": "55. 이차방정식이란?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1u3lf76:t0L1",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "low",
"round": 1,
"answer": "이차항의 계수가 0이 아니어야 해.",
"keys": [
"0이 아니다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:t0L2",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "low",
"round": 1,
"answer": "a≠0이어야 해.",
"keys": [
"a≠0"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:t0L3",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "low",
"round": 1,
"answer": "a=0이면 b가 0이 아닐 때 일차 방정식, b=0일 때 c=0 꼴의 등식이 된다.",
"ok": true
},
{
"id": "1u3lf76:t0H1",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "high",
"round": 2,
"newQ": "① 이차방정식이 되기 위한 조건을 설명해 봐.",
"answer": "ax²+bx+c=0 꼴로 정리했을 때 x²의 계수 a가 0이 아니어야 해. b와 c는 0이어도 상관없어.",
"keys": [
"a≠0",
"b, c는 0이어도 된다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:t0H2",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "1u3lf76:t0H3",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "high",
"round": 2,
"newQ": "③ 일반형의 꼴에서 이차항의 계수인 a가  0일 때 일차방정식이 되는 조건을 설명해 봐.",
"answer": "a=0이면 식이 bx+c=0이 돼. 이때 b≠0이면 일차방정식이야. b=0이면 x가 없어져서 방정식이 아니게 돼.",
"keys": [
"a=0이면 bx+c=0",
"b≠0일 때 일차방정식"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:qrecall",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "qset",
"round": 1,
"answer": "먼저 모든 항을 좌변으로 이항해서 정리해. 그러면 (a-5)x²+5x-3=0이 돼. 그다음 x²의 계수 a-5가 0이 아닌지 확인해.",
"keys": [
"좌변으로 이항해 정리",
"(a-5)x²+5x-3=0",
"x²의 계수가 0이 아닌지"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:qreason",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "qset",
"round": 2,
"answer": "양변에 x²이 있으면 이항할 때 서로 없어질 수 있어. 예를 들어 x²+2x=x²-1은 정리하면 2x+1=0이라 일차방정식이야. 그래서 정리한 뒤에 판단해야 해.",
"keys": [
"x² 항이 없어질 수 있다",
"정리한 뒤 판단"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:qexample",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "qset",
"round": 1,
"answer": "x²의 계수 a-2가 0이 아니어야 하니까 a≠2야.",
"keys": [
"a-2≠0",
"a≠2"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:qcondition",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "qset",
"round": 2,
"answer": "정리하면 (a-5)x²+5x-3=0이니까 a-5≠0, 즉 a≠5야.",
"keys": [
"(a-5)x²+5x-3=0",
"a≠5"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1u3lf76:qerror",
"big": "3. 이차방정식",
"small": "56. 이차방정식이 되기 위한 조건은?",
"kind": "qset",
"round": 2,
"answer": "이차방정식이 되는 조건은 x²의 계수만 0이 아니면 돼. b, c는 0이어도 상관없어. 이 식은 a≠5이기만 하면 이차방정식이야.",
"keys": [
"x²의 계수만 0이 아니면 된다",
"a≠5"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:t0L1",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "low",
"round": 1,
"answer": "AB=0이면 A=0 또는 B=0이라는 성질을 이용해.",
"keys": [
"AB=0이면 A=0 또는 B=0"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:t0L2",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "low",
"round": 1,
"answer": "x=a 또는 x=b야.",
"keys": [
"x=a 또는 x=b"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:t0L3",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "low",
"round": 1,
"off": true,
"ok": true
},
{
"id": "50her:t0H1",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "high",
"round": 2,
"answer": "먼저 우변을 0으로 만들고 좌변을 인수분해해. 그다음 AB=0이면 A=0 또는 B=0이라는 성질로 각 일차식이 0이 되는 x를 구해. 예) x²-5x+6=0 → (x-2)(x-3)=0 → x=2 또는 x=3",
"keys": [
"우변을 0으로",
"인수분해",
"AB=0 성질로 해를 구한다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:t0H2",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "50her:t0H3",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "high",
"round": 2,
"answer": "모든 항을 좌변으로 이항해서 (이차식)=0 꼴로 만들고, 좌변을 인수분해한 다음 각 인수가 0이 되는 x를 구해.",
"keys": [
"좌변으로 이항해 우변 0",
"인수분해",
"각 인수를 0으로"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:qrecall",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "50her:qreason",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "qset",
"round": 2,
"answer": "AB=0 성질은 곱이 0일 때만 쓸 수 있어. 우변이 0이 아니면 (x+3)(x-1)=5처럼 곱이 5라서, 각 인수가 무엇인지 알 수 없어.",
"keys": [
"곱이 0일 때만 성질을 쓸 수 있다",
"우변이 0이 아니면 알 수 없다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:qexample",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "qset",
"round": 1,
"answer": "(x+4)(x-3)=0이니까 x=-4 또는 x=3이야.",
"keys": [
"(x+4)(x-3)=0",
"x=-4 또는 x=3"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:qerror",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "qset",
"round": 2,
"answer": "x+3=0이면 x=-3, x-2=0이면 x=2야. 부호를 거꾸로 했어. 해는 x=-3 또는 x=2야.",
"keys": [
"부호를 거꾸로 했다",
"x=-3 또는 x=2"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "50her:qamu6srpo18th9",
"big": "3. 이차방정식",
"small": "59. 인수분해를 이용하여 이차방정식의 해를 어떻게 구할까?",
"kind": "add",
"round": 1,
"q": "이차 방정식을 풀 때 가정 먼저 생각 해봐야 할 방법이 뭐지?",
"answer": "먼저 인수분해가 되는지 생각해 봐. 인수분해가 되면 가장 빠르고, 안 되면 완전제곱식이나 근의 공식을 써.",
"keys": [
"인수분해가 되는지 먼저",
"안 되면 완전제곱식·근의 공식"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "n72gx0:t0L1",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"off": true,
"ok": true
},
{
"id": "n72gx0:t0L2",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"round": 1,
"newQ": "② 이차식을 완전제곱식으로 만드는 순서를 말해봐",
"answer": "x²의 계수를 1로 만들고, 상수항을 우변으로 옮겨. 그다음 양변에 (x의 계수의 반)²을 더해서 좌변을 완전제곱식으로 만들어.",
"keys": [
"x²의 계수를 1로",
"상수항을 우변으로",
"양변에 (x의 계수의 반)²을 더한다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "n72gx0:t0L3",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"round": 1,
"newQ": "③ 완전제곱식으로 고친 뒤 (x-p)^2=q의 꼴에서부터는 어떤 방법으로 풀어야 하지?",
"answer": "제곱근을 이용해서 풀어. x-p=±√q라서 x=p±√q야.",
"keys": [
"제곱근을 이용한다",
"x=p±√q"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "n72gx0:t0H1",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"round": 2,
"answer": "인수분해가 안 될 때 쓰는 방법이야. 상수항을 우변으로 옮기고 양변에 (x의 계수의 반)²을 더해 (x-p)²=q 꼴로 만든 다음, 제곱근을 이용해서 x=p±√q로 풀어.",
"keys": [
"(x-p)²=q 꼴로 만든다",
"제곱근을 이용해 푼다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "n72gx0:t0H2",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "n72gx0:t0H3",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "n72gx0:qrecall",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "n72gx0:qreason",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "n72gx0:qexample",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 1,
"answer": "x²-4x=1로 옮기고 양변에 (-4/2)²=4를 더하면 (x-2)²=5야. 그래서 x-2=±√5, x=2±√5야.",
"keys": [
"(x-2)²=5",
"x=2±√5"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "n72gx0:qerror",
"big": "3. 이차방정식",
"small": "63. 완전제곱식을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 2,
"answer": "등식이 성립하려면 양변에 똑같이 더해야 해. 우변에도 4를 더해서 (x-2)²=5로 만들어야 해.",
"keys": [
"양변에 똑같이 더해야 한다",
"(x-2)²=5"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0L1",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "low",
"round": 1,
"newQ": "① 판별식(b^2-4ac)이 뭐야?",
"answer": "이차방정식 ax²+bx+c=0에서 b²-4ac를 판별식이라고 해. 근의 공식의 근호 안에 있는 식이고, 이 값의 부호로 근의 개수를 알 수 있어.",
"keys": [
"b²-4ac",
"근의 개수를 알 수 있다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0L2",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "low",
"round": 1,
"newQ": "② 서로 다른 근이 2개이면 판별식이 어때야하지?",
"answer": "b²-4ac>0이어야 해.",
"keys": [
"b²-4ac>0"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0L3",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "low",
"round": 1,
"answer": "b²-4ac=0이면 중근(1개), b²-4ac<0이면 근이 없어.",
"keys": [
"=0이면 중근",
"<0이면 근이 없다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0H1",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "high",
"round": 2,
"answer": "ax²+bx+c=0에서 b²-4ac의 값을 계산해서 부호를 봐. 양수면 서로 다른 두 근, 0이면 중근, 음수면 근이 없어.",
"keys": [
"b²-4ac의 부호를 본다",
"양수 2개, 0이면 중근, 음수 0개"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0H2",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "high",
"round": 2,
"answer": "b²-4ac>0이면 서로 다른 두 근, b²-4ac=0이면 중근(한 근), b²-4ac<0이면 근이 없어.",
"keys": [
">0 서로 다른 두 근",
"=0 중근",
"<0 근이 없다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:t0H3",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "high",
"off": true,
"ok": true
},
{
"id": "1tsm4gk:qrecall",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1tsm4gk:qreason",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "qset",
"round": 2,
"answer": "근의 공식에서 √(b²-4ac)를 구해야 하는데, 근호 안이 음수면 제곱해서 음수가 되는 수가 없어서 값을 구할 수 없어. 그래서 근이 없어.",
"keys": [
"근호 안이 음수",
"제곱해서 음수가 되는 수는 없다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:qexample",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1tsm4gk:qcondition",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "qset",
"round": 2,
"answer": "a=1, b=3, c=5이니까 b²-4ac=9-20=-11<0이라서 근이 없어.",
"keys": [
"9-20=-11",
"근이 없다"
],
"answerBy": "claude",
"reopen": true
},
{
"id": "1tsm4gk:qerror",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "qset",
"off": true,
"ok": true
},
{
"id": "1tsm4gk:qamu6t9gs71vds",
"big": "3. 이차방정식",
"small": "70. 이차방정식의 해를 구하지 않고 근의 개수를 알 수 있다?",
"kind": "add",
"round": 2,
"answer": "주어진 식에 미정계수가 보일 때\n중근이라는 조건이 나올 때\n근의 개수와 관련된 조건이 나올 때",
"q": "판별식은 언제 생각해야되지?",
"ok": true
},
{
"id": "1laojbm:t0L1",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"off": true
},
{
"id": "dd7jjg:t0L1",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "이차방정식을 참이 되게 하는 미지수의 값을 해 또는 근이라고 해.",
"keys": [
"해(근)",
"방정식을 참이 되게 하는 값"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:t0L2",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② x=2가 x²-5x+6=0의 해인지 어떻게 확인해?",
"newQBy": "claude",
"answer": "x=2를 대입해서 참이 되는지 봐. 4-10+6=0이라서 참이니까 x=2는 해야.",
"keys": [
"직접 대입한다",
"4-10+6=0이라 해"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:t0L3",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "이차방정식의 해는 최대 2개까지 있어.",
"keys": [
"최대 2개"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:t0H1",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dd7jjg:t0H2",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dd7jjg:t0H3",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "이차방정식은 (x-a)(x-b)=0처럼 두 일차식의 곱으로 나타낼 수 있어서, 해는 x=a 또는 x=b로 많아야 2개야. 두 일차식이 같으면 해가 1개(중근)야.",
"keys": [
"두 일차식의 곱으로 나타낸다",
"해는 많아야 2개"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:qrecall",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dd7jjg:qreason",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "해는 방정식을 참이 되게 하는 값이라서, 대입해서 좌변과 우변이 같아지는지 확인해야 정확히 알 수 있어.",
"keys": [
"해는 참이 되게 하는 값",
"대입해서 확인한다"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:qexample",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "x=3을 넣으면 9-3-6=0이라 참이니까 x=3은 해야. x=-2도 4+2-6=0이라 해야.",
"keys": [
"x=3 또는 x=-2",
"대입하면 0이 된다"
],
"answerBy": "claude"
},
{
"id": "dd7jjg:qerror",
"big": "3. 이차방정식",
"small": "57. 이차방정식의 해란 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x=1을 대입하면 1-1-6=-6이라 0이 아니야. 참이 되지 않으니까 해가 아니야.",
"keys": [
"대입하면 -6",
"해가 아니다"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:t0L1",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "적어도 하나는 0이야.",
"keys": [
"적어도 하나는 0"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:t0L2",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3bxxw0:t0L3",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3bxxw0:t0H1",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3bxxw0:t0H2",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "이차방정식을 (x-a)(x-b)=0처럼 곱이 0인 꼴로 만들면, 이 성질로 x-a=0 또는 x-b=0이라는 일차방정식 두 개로 쪼갤 수 있어. 그래서 쉽게 풀 수 있어.",
"keys": [
"곱이 0인 꼴로 만든다",
"일차방정식 두 개로 쪼갠다"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:t0H3",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "high",
"round": 1,
"by": "claude",
"newQ": "③ (x-2)(x+5)=0에 이 성질을 적용해서 풀어봐.",
"newQBy": "claude",
"answer": "x-2=0 또는 x+5=0이니까 x=2 또는 x=-5야.",
"keys": [
"x-2=0 또는 x+5=0",
"x=2 또는 x=-5"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:qrecall",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3bxxw0:qreason",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0이 아닌 두 수를 곱하면 0이 될 수 없어. 그래서 곱이 0이면 둘 중 적어도 하나는 0이어야 해.",
"keys": [
"0이 아닌 수끼리의 곱은 0이 아니다",
"적어도 하나는 0"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:qexample",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 A=x-3, B=x+1이면 (x-3)(x+1)=0에서 x=3일 때 A=0, x=-1일 때 B=0이야.",
"keys": [
"곱해서 0이 되는 두 식",
"A=0 또는 B=0"
],
"answerBy": "claude"
},
{
"id": "3bxxw0:qerror",
"big": "3. 이차방정식",
"small": "58. AB=0이면 A, B는 어떤 값이 되어야 할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "둘 다 0일 필요는 없고 둘 중 하나만 0이면 돼. 그래서 x-2=0 또는 x+5=0, 즉 x=2 또는 x=-5야.",
"keys": [
"'또는'이다",
"x=2 또는 x=-5"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:t0L1",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 해가 중복되어 서로 같을 때 그 해를 중근이라고 해.",
"keys": [
"중근"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:t0L2",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(x-a)²=0처럼 (완전제곱식)=0 꼴이 돼.",
"keys": [
"(완전제곱식)=0"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:t0L3",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "③ x²+8x+16=0의 해를 구해봐.",
"newQBy": "claude",
"answer": "(x+4)²=0이니까 x=-4(중근)야.",
"keys": [
"(x+4)²=0",
"x=-4 중근"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:t0H1",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1fuv6rq:t0H2",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1fuv6rq:t0H3",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "(x-a)²=0은 (x-a)(x-a)=0이라서 x=a가 두 번 나와. 두 근이 따로 있는데 값이 겹친 거라서 중근이라고 불러.",
"keys": [
"(x-a)(x-a)=0",
"같은 근이 두 번 나온다"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:qrecall",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1fuv6rq:qreason",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "좌변이 (x-a)²이면 (x-a)(x-a)=0이라서 두 인수가 같아. 그래서 두 근이 모두 x=a로 같아지니까 중근이야.",
"keys": [
"두 인수가 같다",
"두 근이 같다"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:qexample",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 x²-6x+9=0은 (x-3)²=0이라서 중근 x=3을 가져.",
"keys": [
"완전제곱식 꼴",
"중근 x=3"
],
"answerBy": "claude"
},
{
"id": "1fuv6rq:qerror",
"big": "3. 이차방정식",
"small": "60. 이차방정식의 중근이란?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x=3이 두 번 나온 건 같은 근이 겹친 거라서 서로 다른 두 근이 아니야. 근은 x=3 하나이고 중근이라고 해.",
"keys": [
"같은 근이 겹친 것",
"중근 x=3"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:t0L1",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "좌변이 완전제곱식 꼴이어야 해.",
"keys": [
"완전제곱식"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:t0L2",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13lxc2q:t0L3",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "x²의 계수가 1일 때 상수항이 (x의 계수의 반)²이어야 해. x²+ax+b=0이면 b=(a/2)²이야.",
"keys": [
"상수항=(x의 계수의 반)²",
"b=(a/2)²"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:t0H1",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13lxc2q:t0H2",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13lxc2q:t0H3",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "ax²+bx+c=0에서 b²-4ac=0이면 근의 공식의 근호 부분이 0이 돼서 근이 하나로 겹쳐. 그래서 판별식이 0이면 중근이야.",
"keys": [
"b²-4ac=0",
"근호가 0이라 근이 하나"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:qrecall",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13lxc2q:qreason",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "b=(a/2)²이면 x²+ax+b=(x+a/2)²으로 완전제곱식이 돼. 그러면 (x+a/2)²=0이라서 중근 x=-a/2를 가져.",
"keys": [
"완전제곱식이 된다",
"(x+a/2)²=0"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:qexample",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 a=6, b=9이면 x²+6x+9=(x+3)²=0이라서 중근 x=-3을 가져.",
"keys": [
"b=(a/2)²이 되게 정한다",
"완전제곱식 확인"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:qcondition",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "k=(10/2)²=25야.",
"keys": [
"(10/2)²",
"k=25"
],
"answerBy": "claude"
},
{
"id": "13lxc2q:qerror",
"big": "3. 이차방정식",
"small": "61. 이차방정식은 어떤 경우에 중근을 가질까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x의 계수의 반을 제곱해야 해. k=(10/2)²=25야. 5는 제곱하지 않은 값이야.",
"keys": [
"반을 제곱해야 한다",
"k=25"
],
"answerBy": "claude"
},
{
"id": "1ri20xy:t0L1",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "x는 제곱해서 5가 되는 수니까 x=±√5야.",
"keys": [
"제곱근을 이용한다",
"x=±√5"
],
"answerBy": "claude"
},
{
"id": "1ri20xy:t0L2",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② (x-2)²=9의 해를 구하는 과정을 말해봐.",
"newQBy": "claude",
"answer": "x-2는 9의 제곱근이니까 x-2=±3이야. 그래서 x=5 또는 x=-1이야.",
"keys": [
"x-2=±3",
"x=5 또는 x=-1"
],
"answerBy": "claude"
},
{
"id": "1ri20xy:t0L3",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ri20xy:t0H1",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ri20xy:t0H2",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "x²=k는 x가 k의 제곱근이라는 뜻이야. k>0이면 제곱근은 양수와 음수 두 개라서 x=±√k야.",
"keys": [
"x는 k의 제곱근",
"양수의 제곱근은 2개"
],
"answerBy": "claude"
},
{
"id": "1ri20xy:t0H3",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ 2(x+1)²-10=0을 제곱근을 이용해서 풀어봐.",
"newQBy": "claude",
"answer": "(x+1)²=5로 정리하면 x+1=±√5라서 x=-1±√5야.",
"keys": [
"(x+1)²=5로 정리",
"x=-1±√5"
],
"answerBy": "claude"
},
{
"id": "1ri20xy:qrecall",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ri20xy:qreason",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ri20xy:qexample",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ri20xy:qerror",
"big": "3. 이차방정식",
"small": "62. 제곱근을 이용하여 이차방정식을 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x²=3이면 x는 3의 제곱근이라 -√3도 해야. x=±√3이라고 해야 해.",
"keys": [
"-√3을 빠뜨렸다",
"x=±√3"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:t0L1",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x+p)²=k 꼴의 이차방정식이 근을 가지려면 k가 어때야 해?",
"newQBy": "claude",
"answer": "k≥0이어야 해. 제곱한 값은 음수가 될 수 없으니까.",
"keys": [
"k≥0",
"제곱은 음수가 아니다"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:t0L2",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ki4o2q:t0L3",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ki4o2q:t0H1",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "ax²+bx+c=0의 근은 근의 공식에서 √(b²-4ac)가 있어야 구해져. 근호 안이 음수면 안 되니까 b²-4ac≥0일 때 근을 가져.",
"keys": [
"근호 안은 음수가 될 수 없다",
"b²-4ac≥0"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:t0H2",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ki4o2q:t0H3",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ki4o2q:qrecall",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ki4o2q:qreason",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+p)²은 어떤 수를 제곱한 거라서 0 이상이야. 그런데 k<0이면 제곱한 값이 음수가 돼야 하니까 그런 x는 없어.",
"keys": [
"제곱은 0 이상",
"음수와 같아질 수 없다"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:qexample",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 (x+2)²=-3은 제곱한 값이 음수가 될 수 없으니까 근이 없어.",
"keys": [
"k<0인 식",
"근이 없다"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:qcondition",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x²+6x+k=0을 (x+3)²=9-k로 바꾸면 9-k≥0이어야 해. 그래서 k≤9야.",
"keys": [
"(x+3)²=9-k",
"k≤9"
],
"answerBy": "claude"
},
{
"id": "1ki4o2q:qerror",
"big": "3. 이차방정식",
"small": "64. 이차방정식이 근을 가질 조건은 무엇일까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+3)²=9-k에서 9-k가 음수이면 근이 없어. 예를 들어 k=10이면 (x+3)²=-1이라 근이 없어. k≤9일 때만 근을 가져.",
"keys": [
"k에 따라 근이 없을 수 있다",
"k≤9"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:t0L1",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "근의 공식이나 완전제곱식을 이용해서 풀어.",
"keys": [
"근의 공식"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:t0L2",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 3x²-5x+1=0에서 근의 공식에 넣을 a, b, c는 각각 얼마야?",
"newQBy": "claude",
"answer": "a=3, b=-5, c=1이야. b의 부호까지 그대로 넣어야 해.",
"keys": [
"a=3, b=-5, c=1",
"부호까지 넣는다"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:t0L3",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7bzpa2:t0H1",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "ax²+bx+c=0의 근은 x=(-b±√(b²-4ac))/(2a)야. 인수분해가 잘 안 될 때 쓰고, b²-4ac≥0이면 언제든 근을 구할 수 있어.",
"keys": [
"x=(-b±√(b²-4ac))/(2a)",
"인수분해가 어려울 때"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:t0H2",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "ax²+bx+c=0의 양변을 a로 나누고 완전제곱식으로 만들어 제곱근을 이용해 풀면, 그 결과가 바로 근의 공식이야.",
"keys": [
"a로 나누고 완전제곱식으로",
"제곱근으로 풀면 근의 공식"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:t0H3",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7bzpa2:qrecall",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "ax²+bx+c=0의 근은 x=(-b±√(b²-4ac))/(2a)야. (단, b²-4ac≥0)",
"keys": [
"x=(-b±√(b²-4ac))/(2a)"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:qreason",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7bzpa2:qexample",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "a=1, b=-4, c=-1이니까 x=(4±√(16+4))/2=(4±2√5)/2=2±√5야.",
"keys": [
"a=1, b=-4, c=-1",
"x=2±√5"
],
"answerBy": "claude"
},
{
"id": "7bzpa2:qerror",
"big": "3. 이차방정식",
"small": "65. 이차방정식의 근의 공식이란?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모 2a를 빠뜨렸어. 근의 공식은 x=(-b±√(b²-4ac))/(2a)야.",
"keys": [
"분모 2a를 빠뜨렸다"
],
"answerBy": "claude"
},
{
"id": "1xtbzku:t0L1",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "① 2x²+6x-1=0에서 b'는 얼마이고, 짝수 공식으로 풀면 어떻게 돼?",
"newQBy": "claude",
"answer": "b=6=2×3이라서 b'=3이야. x=(-3±√(9+2))/2=(-3±√11)/2야.",
"keys": [
"b'=3",
"x=(-3±√11)/2"
],
"answerBy": "claude"
},
{
"id": "1xtbzku:t0L2",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xtbzku:t0L3",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xtbzku:t0H1",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xtbzku:t0H2",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "b=2b'를 근의 공식에 넣으면 분자와 분모에 공통으로 2가 생겨서 약분돼. 그래서 x=(-b'±√(b'²-ac))/a로 간단해져.",
"keys": [
"b=2b'를 넣으면 2가 약분된다",
"x=(-b'±√(b'²-ac))/a"
],
"answerBy": "claude"
},
{
"id": "1xtbzku:t0H3",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xtbzku:qrecall",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "ax²+2b'x+c=0의 근은 x=(-b'±√(b'²-ac))/a야. (단, b'²-ac≥0)",
"keys": [
"x=(-b'±√(b'²-ac))/a"
],
"answerBy": "claude"
},
{
"id": "1xtbzku:qreason",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xtbzku:qexample",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "b'=-4이니까 x=4±√(16-10)=4±√6이야.",
"keys": [
"b'=-4",
"x=4±√6"
],
"answerBy": "claude"
},
{
"id": "1xtbzku:qerror",
"big": "3. 이차방정식",
"small": "66. 일차항의 계수가 짝수일 때 쓰는 근의 공식이 따로 있다?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "짝수 공식에는 b의 반인 b'를 넣어야 해. b를 그대로 넣으면 공식이 달라져서 틀린 답이 나와.",
"keys": [
"b'=b/2를 넣어야 한다"
],
"answerBy": "claude"
},
{
"id": "rs69hv:t0L1",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "양변에 10, 100 같은 10의 거듭제곱을 곱해서 계수를 정수로 만들어.",
"keys": [
"10, 100을 곱한다"
],
"answerBy": "claude"
},
{
"id": "rs69hv:t0L2",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "양변에 분모의 최소공배수를 곱해.",
"keys": [
"분모의 최소공배수"
],
"answerBy": "claude"
},
{
"id": "rs69hv:t0L3",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "③ x²/2+x/3-1/6=0을 정수 계수로 바꿔서 풀어봐.",
"newQBy": "claude",
"answer": "분모 2, 3, 6의 최소공배수 6을 곱하면 3x²+2x-1=0이야. (3x-1)(x+1)=0이라서 x=1/3 또는 x=-1이야.",
"keys": [
"6을 곱해 3x²+2x-1=0",
"x=1/3 또는 x=-1"
],
"answerBy": "claude"
},
{
"id": "rs69hv:t0H1",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rs69hv:t0H2",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rs69hv:t0H3",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rs69hv:qrecall",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rs69hv:qreason",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "등식의 양변에 0이 아닌 같은 수를 곱해도 등식은 그대로 성립해. 그래서 참이 되게 하는 x의 값, 즉 해도 달라지지 않아.",
"keys": [
"양변에 같은 수를 곱해도 등식 성립",
"해가 같다"
],
"answerBy": "claude"
},
{
"id": "rs69hv:qexample",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "양변에 10을 곱하면 5x²-3x-2=0이야. (5x+2)(x-1)=0이라서 x=1 또는 x=-2/5야.",
"keys": [
"10을 곱해 5x²-3x-2=0",
"x=1 또는 x=-2/5"
],
"answerBy": "claude"
},
{
"id": "rs69hv:qerror",
"big": "3. 이차방정식",
"small": "67. 계수가 소수 또는 분수인 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "5를 곱하면 2.5x²-1.5x-1=0이라 아직 정수가 아니야. 소수 첫째 자리까지 있으니까 10을 곱해야 해.",
"keys": [
"5를 곱하면 정수가 안 된다",
"10을 곱한다"
],
"answerBy": "claude"
},
{
"id": "2mux8w:t0L1",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "괄호를 풀어 전개하고, 한쪽으로 옮겨 ax²+bx+c=0 꼴로 정리해.",
"keys": [
"전개한다",
"ax²+bx+c=0으로 정리"
],
"answerBy": "claude"
},
{
"id": "2mux8w:t0L2",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② x(x-4)=5를 풀어봐.",
"newQBy": "claude",
"answer": "전개해서 정리하면 x²-4x-5=0이야. (x-5)(x+1)=0이라서 x=5 또는 x=-1이야.",
"keys": [
"x²-4x-5=0",
"x=5 또는 x=-1"
],
"answerBy": "claude"
},
{
"id": "2mux8w:t0L3",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2mux8w:t0H1",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2mux8w:t0H2",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2mux8w:t0H3",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2mux8w:qrecall",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2mux8w:qreason",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "AB=0일 때만 A=0 또는 B=0을 쓸 수 있어. (x-2)(x+3)=0은 바로 x=2, x=-3이지만, (x-2)(x+3)=6은 우변이 0이 아니라서 전개해 x²+x-12=0으로 정리한 뒤 (x+4)(x-3)=0으로 풀어야 해. 그러면 x=-4, x=3이야.",
"keys": [
"우변이 0일 때만 바로 쓸 수 있다",
"정리하면 x=-4 또는 x=3"
],
"answerBy": "claude"
},
{
"id": "2mux8w:qexample",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "전개하면 x²+6x+9=2x+10이고, 정리하면 x²+4x-1=0이야. 근의 공식으로 x=-2±√5야.",
"keys": [
"x²+4x-1=0으로 정리",
"x=-2±√5"
],
"answerBy": "claude"
},
{
"id": "2mux8w:qerror",
"big": "3. 이차방정식",
"small": "68. 괄호가 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x+3)²=2x+10은 곱이 0인 꼴이 아니라서 그렇게 바꿀 수 없어. 전개해서 x²+4x-1=0으로 정리한 다음 풀어야 해.",
"keys": [
"곱이 0인 꼴이 아니다",
"전개해서 정리한다"
],
"answerBy": "claude"
},
{
"id": "1xc8y87:t0L1",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① (x-1)²-2(x-1)-8=0에서 무엇을 치환하면 편해?",
"newQBy": "claude",
"answer": "반복되는 x-1을 A로 놓으면 A²-2A-8=0으로 간단해져.",
"keys": [
"x-1=A"
],
"answerBy": "claude"
},
{
"id": "1xc8y87:t0L2",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xc8y87:t0L3",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xc8y87:t0H1",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xc8y87:t0H2",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xc8y87:t0H3",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "치환해서 구한 것은 A의 값이라서, A=x-1처럼 원래 식에 넣으면 x-1=4 같은 새 방정식이 생겨. 그걸 다시 풀어야 x를 구할 수 있어.",
"keys": [
"구한 것은 A의 값",
"A=(x의 식)을 다시 푼다"
],
"answerBy": "claude"
},
{
"id": "1xc8y87:qrecall",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xc8y87:qreason",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "문제에서 구하라는 것은 x인데, 치환해서 구한 것은 A의 값이야. 되돌리지 않으면 x가 아닌 다른 값을 답으로 쓰게 돼.",
"keys": [
"구할 것은 x",
"A는 잠깐 바꾼 문자"
],
"answerBy": "claude"
},
{
"id": "1xc8y87:qexample",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x-1=A로 놓으면 A²-2A-8=0, (A-4)(A+2)=0이라서 A=4 또는 A=-2야. x-1=4 또는 x-1=-2라서 x=5 또는 x=-1이야.",
"keys": [
"A=4 또는 A=-2",
"x=5 또는 x=-1"
],
"answerBy": "claude"
},
{
"id": "1xc8y87:qerror",
"big": "3. 이차방정식",
"small": "69. 공통부분이 있는 이차방정식은 어떻게 풀까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "A=4, A=-2는 x-1의 값이야. x-1=4, x-1=-2를 풀어서 x=5 또는 x=-1이라고 해야 해.",
"keys": [
"A는 x-1의 값",
"x=5 또는 x=-1"
],
"answerBy": "claude"
},
{
"id": "ojujoz:t0L1",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "ax²+bx+c=0의 두 근의 합은 -b/a야.",
"keys": [
"-b/a"
],
"answerBy": "claude"
},
{
"id": "ojujoz:t0L2",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "ax²+bx+c=0의 두 근의 곱은 c/a야.",
"keys": [
"c/a"
],
"answerBy": "claude"
},
{
"id": "ojujoz:t0L3",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ojujoz:t0H1",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ojujoz:t0H2",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "근의 공식으로 두 근을 (-b+√D)/(2a), (-b-√D)/(2a)로 쓰고 더하면 √D가 없어져서 -b/a, 곱하면 합차 공식으로 (b²-D)/(4a²)=c/a가 돼. (D=b²-4ac)",
"keys": [
"두 근을 더하면 √D가 없어진다",
"곱하면 c/a"
],
"answerBy": "claude"
},
{
"id": "ojujoz:t0H3",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "③ x²-6x+4=0의 두 근을 α, β라 할 때, α²+β²의 값을 구해봐.",
"newQBy": "claude",
"answer": "α+β=6, αβ=4이고 α²+β²=(α+β)²-2αβ=36-8=28이야.",
"keys": [
"α+β=6, αβ=4",
"(α+β)²-2αβ=28"
],
"answerBy": "claude"
},
{
"id": "ojujoz:qrecall",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ojujoz:qreason",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ojujoz:qexample",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "a=1, b=-6, c=4이니까 α+β=6, αβ=4야.",
"keys": [
"α+β=6",
"αβ=4"
],
"answerBy": "claude"
},
{
"id": "ojujoz:qerror",
"big": "3. 이차방정식",
"small": "71. 이차방정식의 근과 계수 사이에는 어떤 관계가 있을까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "두 근의 합은 -b/a라서 -(-6)/1=6이야. b를 그대로 쓰면 부호가 틀려.",
"keys": [
"-b/a",
"6"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:t0L1",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(x-α)(x-β)로 나타내. 앞에 x²의 계수 a를 곱해서 a(x-α)(x-β)=0으로 써.",
"keys": [
"(x-α)(x-β)",
"a(x-α)(x-β)=0"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:t0L2",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pu5ll1:t0L3",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "③ a(x-α)(x-β)=0을 전개하면 어떤 꼴이 돼?",
"newQBy": "claude",
"answer": "a{x²-(α+β)x+αβ}=0이 돼. 두 근의 합과 곱이 계수에 나타나.",
"keys": [
"a{x²-(α+β)x+αβ}=0",
"합과 곱이 계수에 나온다"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:t0H1",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "① 두 근이 1/2, 3이고 x²의 계수가 2인 이차방정식을 세워봐.",
"newQBy": "claude",
"answer": "2(x-1/2)(x-3)=0이고, 정리하면 (2x-1)(x-3)=0, 즉 2x²-7x+3=0이야.",
"keys": [
"2(x-1/2)(x-3)=0",
"2x²-7x+3=0"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:t0H2",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pu5ll1:t0H3",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pu5ll1:qrecall",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "pu5ll1:qreason",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "(x-α)(x-β)=0은 AB=0 꼴이라서 x-α=0 또는 x-β=0, 즉 x=α 또는 x=β가 해가 돼.",
"keys": [
"AB=0 꼴",
"x=α 또는 x=β"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:qexample",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "(x+2)(x-4)=0이고, 전개하면 x²-2x-8=0이야.",
"keys": [
"(x+2)(x-4)=0",
"x²-2x-8=0"
],
"answerBy": "claude"
},
{
"id": "pu5ll1:qerror",
"big": "3. 이차방정식",
"small": "72. 두 근이 α, β이고, x²의 계수가 a인 이차방정식은 어떻게 나타낼까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "근이 -2이면 x-(-2)=x+2, 근이 4이면 x-4라서 (x+2)(x-4)=0이야. 부호를 거꾸로 썼어.",
"keys": [
"부호를 거꾸로 썼다",
"(x+2)(x-4)=0"
],
"answerBy": "claude"
},
{
"id": "ohzvbp:t0L1",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 어떤 정사각형의 가로를 5cm 늘이고 세로를 2cm 줄였더니 넓이가 18cm²가 되었어. 처음 정사각형의 한 변의 길이를 x cm로 놓으면, 새 직사각형의 가로와 세로는 각각 어떻게 나타내?",
"newQBy": "claude",
"answer": "가로는 (x+5) cm, 세로는 (x-2) cm야.",
"keys": [
"가로 x+5",
"세로 x-2"
],
"answerBy": "claude"
},
{
"id": "ohzvbp:t0L2",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 같은 문제에서 '넓이가 18cm²'라는 조건으로 식을 세워봐.",
"newQBy": "claude",
"answer": "(가로)×(세로)=18이니까 (x+5)(x-2)=18이야.",
"keys": [
"(x+5)(x-2)=18"
],
"answerBy": "claude"
},
{
"id": "ohzvbp:t0L3",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:t0H1",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:t0H2",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:t0H3",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:qrecall",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:qreason",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ohzvbp:qexample",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "같은 문제에서 (x+5)(x-2)=18을 풀어서 처음 정사각형의 한 변의 길이를 구해봐.",
"newQBy": "claude",
"answer": "전개하면 x²+3x-28=0이고 (x+7)(x-4)=0이라서 x=-7 또는 x=4야. 길이는 양수이고 x-2>0이어야 하니까 4cm야.",
"keys": [
"x²+3x-28=0",
"x=4만 답(4cm)"
],
"answerBy": "claude"
},
{
"id": "ohzvbp:qerror",
"big": "3. 이차방정식",
"small": "73. 이차방정식의 활용 문제에 접근하는 노하우는?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "x는 정사각형의 한 변의 길이라서 음수가 될 수 없어. 또 세로 x-2도 양수여야 해. 그래서 x=4만 답이야.",
"keys": [
"길이는 양수",
"x=4만 답"
],
"answerBy": "claude"
},
{
"id": "17gdy7f:t0L1",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 연속하는 두 자연수의 곱이 132야. 작은 수를 x로 놓으면 큰 수는 어떻게 나타내?",
"newQBy": "claude",
"answer": "큰 수는 x+1이야.",
"keys": [
"x+1"
],
"answerBy": "claude"
},
{
"id": "17gdy7f:t0L2",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 연속하는 두 짝수의 곱이 80이야. 작은 짝수를 x로 놓고 식을 세워봐.",
"newQBy": "claude",
"answer": "연속하는 짝수는 2씩 차이 나니까 큰 짝수는 x+2야. 식은 x(x+2)=80이야.",
"keys": [
"큰 짝수는 x+2",
"x(x+2)=80"
],
"answerBy": "claude"
},
{
"id": "17gdy7f:t0L3",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "③ 연속하는 세 자연수에서 가장 큰 수의 제곱이 나머지 두 수의 제곱의 합과 같아. 가운데 수를 x로 놓고 식을 세워봐.",
"newQBy": "claude",
"answer": "세 수는 x-1, x, x+1이야. 식은 (x+1)²=(x-1)²+x²이야. 풀면 x²-4x=0이라 x=0 또는 x=4인데, 자연수여야 하니까 x=4, 세 수는 3, 4, 5야.",
"keys": [
"x-1, x, x+1",
"(x+1)²=(x-1)²+x²",
"3, 4, 5"
],
"answerBy": "claude"
},
{
"id": "17gdy7f:t0H1",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17gdy7f:t0H2",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17gdy7f:t0H3",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17gdy7f:qrecall",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17gdy7f:qreason",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17gdy7f:qexample",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "연속하는 두 자연수의 곱이 132일 때, 식을 세워서 두 자연수를 구해봐.",
"newQBy": "claude",
"answer": "x(x+1)=132를 정리하면 x²+x-132=0, (x+12)(x-11)=0이야. 자연수여야 하니까 x=11, 두 수는 11과 12야.",
"keys": [
"x(x+1)=132",
"11과 12"
],
"answerBy": "claude"
},
{
"id": "17gdy7f:qerror",
"big": "3. 이차방정식",
"small": "74. 연속하는 수에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "구하는 수가 자연수라서 -12는 답이 될 수 없어. x=11만 맞고, 두 수는 11과 12야.",
"keys": [
"자연수 조건",
"11과 12"
],
"answerBy": "claude"
},
{
"id": "p06587:t0L1",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① n각형의 대각선의 개수는 n(n-3)/2개야. 대각선이 35개인 다각형을 구하려면 어떤 식을 세워?",
"newQBy": "claude",
"answer": "n(n-3)/2=35로 세워.",
"keys": [
"n(n-3)/2=35"
],
"answerBy": "claude"
},
{
"id": "p06587:t0L2",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② n명이 서로 한 번씩 악수하면 악수 횟수는 n(n-1)/2번이야. 악수를 모두 45번 했을 때 몇 명인지 구하는 식을 세워봐.",
"newQBy": "claude",
"answer": "n(n-1)/2=45야. 정리하면 n²-n-90=0, (n-10)(n+9)=0이라서 10명이야.",
"keys": [
"n(n-1)/2=45",
"10명"
],
"answerBy": "claude"
},
{
"id": "p06587:t0L3",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "p06587:t0H1",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "p06587:t0H2",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "p06587:t0H3",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "p06587:qrecall",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "p06587:qreason",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "n은 다각형의 변의 개수라서 3 이상의 자연수여야 해. 이차방정식을 풀면 그런 조건과 상관없이 음수 해도 나오니까, 조건에 맞지 않는 해는 버려야 해.",
"keys": [
"n은 3 이상의 자연수",
"조건에 맞지 않는 해를 버린다"
],
"answerBy": "claude"
},
{
"id": "p06587:qexample",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "n(n-3)/2=35를 풀어서 대각선이 35개인 다각형이 몇 각형인지 구해봐.",
"newQBy": "claude",
"answer": "양변에 2를 곱하면 n²-3n-70=0, (n-10)(n+7)=0이야. n은 자연수니까 n=10, 십각형이야.",
"keys": [
"n²-3n-70=0",
"십각형"
],
"answerBy": "claude"
},
{
"id": "p06587:qerror",
"big": "3. 이차방정식",
"small": "75. 간단한 공식을 적용하는 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "n은 다각형의 변의 개수라서 음수가 될 수 없어. n=10만 답이라서 십각형이야.",
"keys": [
"n은 3 이상의 자연수",
"십각형"
],
"answerBy": "claude"
},
{
"id": "1laojbm:t0L2",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "땅에 떨어지는 순간 높이는 0m야.",
"keys": [
"0m"
],
"answerBy": "claude"
},
{
"id": "1laojbm:t0L3",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "③ 초속 30m로 던진 공의 t초 후 높이가 (30t-5t²) m야. 높이가 40m가 되는 순간을 구하려면 어떤 식을 세워?",
"newQBy": "claude",
"answer": "30t-5t²=40으로 세워. 정리하면 t²-6t+8=0, (t-2)(t-4)=0이라서 2초 후와 4초 후야.",
"keys": [
"30t-5t²=40",
"2초, 4초"
],
"answerBy": "claude"
},
{
"id": "1laojbm:t0H1",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1laojbm:t0H2",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1laojbm:t0H3",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1laojbm:qrecall",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1laojbm:qreason",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "같은 공이 높이 40m를 지나는 시각이 2초와 4초 두 번 나와. 왜 두 번일까?",
"newQBy": "claude",
"answer": "공이 올라가면서 한 번(2초), 가장 높이 올라간 뒤 내려오면서 또 한 번(4초) 40m를 지나기 때문이야.",
"keys": [
"올라갈 때 한 번",
"내려올 때 한 번"
],
"answerBy": "claude"
},
{
"id": "1laojbm:qexample",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "땅에 떨어질 때 높이는 0이니까 30t-5t²=0이야. 5t(6-t)=0이라서 t=0 또는 t=6인데, t=0은 던지는 순간이니까 6초 후에 떨어져.",
"keys": [
"30t-5t²=0",
"t=0은 던지는 순간, 6초"
],
"answerBy": "claude"
},
{
"id": "1laojbm:qerror",
"big": "3. 이차방정식",
"small": "76. 쏘아 올린 물체에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "t=0은 공을 던지는 순간이야. 그때도 높이가 0이라서 해로 나온 거야. 땅에 떨어지는 시각은 t=6, 6초 후야.",
"keys": [
"t=0은 던지는 순간",
"6초 후"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:t0L1",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 가로가 세로보다 3cm 긴 직사각형의 넓이가 40cm²야. 세로를 x cm로 놓으면 가로는 어떻게 나타내?",
"newQBy": "claude",
"answer": "가로는 (x+3) cm야.",
"keys": [
"x+3"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:t0L2",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 같은 문제에서 넓이 조건으로 식을 세워봐.",
"newQBy": "claude",
"answer": "(가로)×(세로)=40이니까 x(x+3)=40이야.",
"keys": [
"x(x+3)=40"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:t0L3",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "③ 가로 20m, 세로 15m인 땅에 폭이 x m로 일정한 길을 가로, 세로로 하나씩 냈더니 남은 땅의 넓이가 204m²야. 식을 어떻게 세워?",
"newQBy": "claude",
"answer": "길을 한쪽으로 모으면 남은 땅은 가로 (20-x) m, 세로 (15-x) m인 직사각형이야. 그래서 (20-x)(15-x)=204이고, 풀면 x=3 또는 x=32인데 x<15여야 하니까 3m야.",
"keys": [
"남은 땅을 한쪽으로 모은다",
"(20-x)(15-x)=204",
"x=3"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:t0H1",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pbz0il:t0H2",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pbz0il:t0H3",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pbz0il:qrecall",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1pbz0il:qreason",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "길이는 0보다 커야 해서 음수는 실제 길이가 될 수 없어. 방정식은 그런 조건을 모르니까 음수 해도 나오고, 그건 버려야 해.",
"keys": [
"길이는 양수",
"방정식은 조건을 모른다"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:qexample",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "같은 문제에서 x(x+3)=40을 풀어서 세로의 길이를 구해봐.",
"newQBy": "claude",
"answer": "x²+3x-40=0, (x+8)(x-5)=0이라서 x=-8 또는 x=5야. 길이는 양수니까 세로는 5cm야.",
"keys": [
"x²+3x-40=0",
"5cm"
],
"answerBy": "claude"
},
{
"id": "1pbz0il:qerror",
"big": "3. 이차방정식",
"small": "77. 도형의 넓이에 관한 문제는 어떻게 해결할까?",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "길이는 음수가 될 수 없어서 -8은 버려야 해. 세로는 5cm야.",
"keys": [
"길이는 양수",
"5cm"
],
"answerBy": "claude"
}
],
"seen": [
"M3111",
"M3112"
]
} });
