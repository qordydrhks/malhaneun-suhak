/* [v84.5] 질문 고르기 — 기본으로 실어 두는 분류안 (초5-2)
   Claude 분류(by:'claude') · 겹쳐서 뺀 것(offBy:'claude') · 모범 답(answerBy:'claude') — 초5-1 마스터 견본·검토 기준으로 전 과정.
   review.js 가 화면 열 때 한 번만 넣는다(이 기기에 적어 둔 것은 안 덮음). key 를 바꾸면 다시 넣는다. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-2_2026-09-18a', data:{
"format": "qr-plan-2",
"grade": "e5-2",
"rounds": 3,
"items": [
{
"id": "10gl135:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "125와 같거나 125보다 큰 수를 125 이상인 수라고 해. 125, 126, 130 같은 수야.",
"keys": [
"125와 같거나 큰 수"
],
"answerBy": "claude"
},
{
"id": "10gl135:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "160과 같거나 160보다 작은 수를 160 이하인 수라고 해.",
"keys": [
"160과 같거나 작은 수"
],
"answerBy": "claude"
},
{
"id": "10gl135:t0L3",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 이상과 이하는 기준이 되는 수를 포함해.",
"keys": [
"기준이 되는 수를 포함한다"
],
"answerBy": "claude"
},
{
"id": "10gl135:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "이상은 '같거나 큰 수', 이하는 '같거나 작은 수'라서 기준이 되는 수도 들어가.",
"keys": [
"같거나 크다, 같거나 작다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10gl135:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "색칠된 원(●)은 그 수가 범위에 들어간다는 표시야. 이상과 이하는 기준이 되는 수를 포함하니까 색칠된 원으로 나타내.",
"keys": [
"●는 그 수를 포함한다는 표시",
"이상·이하는 기준 수를 포함한다"
],
"answerBy": "claude"
},
{
"id": "10gl135:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "40 이상은 40도 포함하니까 가장 작은 자연수는 40이야.",
"keys": [
"40을 포함한다",
"40"
],
"answerBy": "claude"
},
{
"id": "10gl135:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "'크다'는 그 수를 포함하지 않지만 '이상'은 그 수와 같은 것도 포함해. 예를 들어 5보다 큰 자연수는 6부터, 5 이상인 자연수는 5부터야.",
"keys": [
"이상은 기준 수를 포함한다",
"크다는 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "10gl135:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "응, 뽑힐 수 있어. 140 cm 이상은 140 cm도 포함하니까.",
"keys": [
"뽑힐 수 있다",
"이상은 기준 수를 포함한다"
],
"answerBy": "claude"
},
{
"id": "10gl135:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "이하는 기준이 되는 수를 포함해. 그래서 30 이하인 수에는 30도 들어가.",
"keys": [
"이하는 기준 수를 포함한다",
"30도 들어간다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "125보다 큰 수를 125 초과인 수라고 해. 125는 들어가지 않아.",
"keys": [
"125보다 큰 수",
"125는 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "160보다 작은 수를 160 미만인 수라고 해. 160은 들어가지 않아.",
"keys": [
"160보다 작은 수",
"160은 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:t0L3",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "아니, 초과와 미만은 기준이 되는 수를 포함하지 않아.",
"keys": [
"기준이 되는 수를 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "초과는 '보다 큰 수', 미만은 '보다 작은 수'라서 기준이 되는 수는 들어가지 않아.",
"keys": [
"보다 크다, 보다 작다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ggg2gj:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "이상·이하는 기준이 되는 수를 포함하고, 초과·미만은 포함하지 않아. 그래서 수직선에 이상·이하는 ●, 초과·미만은 ○로 나타내.",
"keys": [
"이상·이하는 포함, 초과·미만은 포함하지 않는다",
"●와 ○로 구분한다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "10 초과는 10을 포함하지 않으니까 가장 작은 자연수는 11이야.",
"keys": [
"10을 포함하지 않는다",
"11"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니, 뽑힐 수 없어. 30 kg 미만은 30 kg을 포함하지 않으니까.",
"keys": [
"뽑힐 수 없다",
"미만은 기준 수를 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "1ggg2gj:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "초과는 기준이 되는 수를 포함하지 않아. 그래서 20 초과인 수에는 20이 들어가지 않아.",
"keys": [
"초과는 기준 수를 포함하지 않는다",
"20은 들어가지 않는다"
],
"answerBy": "claude"
},
{
"id": "19xudqz:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, '10 이상 20 미만'처럼 두 가지를 함께 써서 범위를 나타낼 수 있어.",
"keys": [
"함께 써서 범위를 나타낸다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19xudqz:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "10과 같거나 크고 20보다 작은 수야. 10은 들어가고 20은 들어가지 않아.",
"keys": [
"10은 포함",
"20은 포함하지 않는다"
],
"answerBy": "claude"
},
{
"id": "19xudqz:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "범위의 시작과 끝에 각각 이상·초과 중 하나, 이하·미만 중 하나를 붙여서 나타내. 끝의 수를 포함하면 이상·이하, 포함하지 않으면 초과·미만을 써.",
"keys": [
"시작과 끝에 하나씩 붙인다",
"포함하면 이상·이하, 아니면 초과·미만"
],
"answerBy": "claude"
},
{
"id": "19xudqz:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "나이에 따라 요금이 다른 것(예: 8세 이상 13세 이하는 어린이 요금)이나, 엘리베이터 정원(○명 이하)처럼 기준에 맞는지 정할 때 써.",
"keys": [
"요금·정원 같은 기준",
"범위에 들어가는지로 정한다"
],
"answerBy": "claude"
},
{
"id": "19xudqz:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "10, 11, 12, …, 19니까 모두 10개야.",
"keys": [
"10부터 19까지",
"10개"
],
"answerBy": "claude"
},
{
"id": "19xudqz:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "끝의 수를 포함하는지 안 하는지를 정확히 정할 수 있어서, 한 범위가 끝나는 수가 다음 범위에 들어갈지 딱 정해져. 그래서 겹치거나 빠지는 수가 없어.",
"keys": [
"끝의 수를 포함하는지 정확히 정한다",
"겹치거나 빠지지 않는다"
],
"answerBy": "claude"
},
{
"id": "19xudqz:qexample",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "26, 27, 28, 29, 30이야. 25는 들어가지 않고 30은 들어가.",
"keys": [
"25는 제외, 30은 포함",
"26, 27, 28, 29, 30"
],
"answerBy": "claude"
},
{
"id": "19xudqz:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "미만은 기준이 되는 수를 포함하지 않아서 20은 들어가지 않아. 10은 들어가.",
"keys": [
"미만은 포함하지 않는다",
"20은 들어가지 않는다"
],
"answerBy": "claude"
},
{
"id": "19xudqz:qcondition",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "달라. '10 이상 20 이하'는 10과 20이 들어가지만, '10 초과 20 미만'은 10과 20이 들어가지 않아.",
"keys": [
"다르다",
"10과 20의 포함 여부"
],
"answerBy": "claude"
},
{
"id": "4k34j1:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "구하려는 자리 아래 수를 올려서 나타내는 방법이야. 아래 자리가 0이 아니면 구하려는 자리 숫자를 1 크게 하고 아래 자리는 0으로 해.",
"keys": [
"구하려는 자리 아래 수를 올린다"
],
"answerBy": "claude"
},
{
"id": "4k34j1:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "일의 자리 1을 올려서 330이야.",
"keys": [
"330"
],
"answerBy": "claude"
},
{
"id": "4k34j1:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "올림은 구하려는 자리 아래에 조금이라도 수가 있으면 구하려는 자리를 1 올리고 아래는 0으로 나타내는 방법이야.",
"keys": [
"아래 자리를 올린다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "4k34j1:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "물건이 모자라면 안 되니까, 필요한 양보다 적어지지 않게 올림을 써. 올림한 값은 원래 수보다 작아지지 않아.",
"keys": [
"모자라면 안 된다",
"올림한 값은 원래 수보다 작지 않다"
],
"answerBy": "claude"
},
{
"id": "4k34j1:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "백의 자리 아래 48을 올려서 800이야.",
"keys": [
"800"
],
"answerBy": "claude"
},
{
"id": "4k34j1:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 493이야. 십의 자리까지 올림하면 500이 돼. 491부터 500까지 모두 돼.",
"keys": [
"491~500 중 하나",
"십의 자리까지 올림"
],
"answerBy": "claude"
},
{
"id": "4k34j1:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "일의 자리가 0이라서 올릴 수가 없어. 그래서 그대로 320이야.",
"keys": [
"아래 자리가 0",
"올릴 것이 없다"
],
"answerBy": "claude"
},
{
"id": "4k34j1:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "십의 자리까지 올림하면 일의 자리 4를 올려서 십의 자리 6이 7이 돼. 374가 아니라 370이야.",
"keys": [
"일의 자리를 0으로 만든다",
"370"
],
"answerBy": "claude"
},
{
"id": "glvzvi:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "구하려는 자리 아래 수를 버려서 0으로 나타내는 방법이야.",
"keys": [
"구하려는 자리 아래 수를 버린다"
],
"answerBy": "claude"
},
{
"id": "glvzvi:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "일의 자리 1을 버려서 320이야.",
"keys": [
"320"
],
"answerBy": "claude"
},
{
"id": "glvzvi:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "버림은 구하려는 자리 아래 수가 얼마든 모두 버리고 0으로 나타내는 방법이야.",
"keys": [
"아래 자리를 버린다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "glvzvi:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "다발로 묶어 팔 때 모자란 묶음은 팔 수 없으니까, 남는 것은 세지 않고 버림을 써.",
"keys": [
"남는 것은 한 묶음이 안 된다",
"버린다"
],
"answerBy": "claude"
},
{
"id": "glvzvi:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "백의 자리 아래 48을 버려서 700이야.",
"keys": [
"700"
],
"answerBy": "claude"
},
{
"id": "glvzvi:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 935야. 백의 자리까지 버림하면 900이 돼. 900부터 999까지 모두 돼.",
"keys": [
"900~999 중 하나",
"백의 자리까지 버림"
],
"answerBy": "claude"
},
{
"id": "glvzvi:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "항상 원래 수보다 작거나 같아. 아래 자리 수를 버리기만 하니까 커질 수 없어.",
"keys": [
"작거나 같다",
"아래 수를 버리기만 한다"
],
"answerBy": "claude"
},
{
"id": "glvzvi:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "십의 자리까지 버림하면 일의 자리만 버려서 360이야. 300은 백의 자리까지 버림한 값이야.",
"keys": [
"일의 자리만 버린다",
"360"
],
"answerBy": "claude"
},
{
"id": "1re59:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "버려. 아래 자리 숫자가 0, 1, 2, 3, 4이면 버림해.",
"keys": [
"버린다"
],
"answerBy": "claude"
},
{
"id": "1re59:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "올려. 아래 자리 숫자가 5, 6, 7, 8, 9이면 올림해.",
"keys": [
"올린다"
],
"answerBy": "claude"
},
{
"id": "1re59:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "구하려는 자리 바로 아래 숫자가 0~4이면 버리고, 5~9이면 올려.",
"keys": [
"0~4는 버림, 5~9는 올림"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1re59:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "아래 자리가 5보다 작으면 버린 쪽이 더 가깝고, 5 이상이면 올린 쪽이 더 가까워. 그래서 반올림하면 원래 수에 더 가까운 쪽으로 나타내게 돼.",
"keys": [
"가까운 쪽으로 나타낸다",
"5가 가운데 기준"
],
"answerBy": "claude"
},
{
"id": "1re59:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "십의 자리 숫자가 5니까 올려서 2500이야.",
"keys": [
"십의 자리 숫자 5를 본다",
"2500"
],
"answerBy": "claude"
},
{
"id": "1re59:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 398이야. 일의 자리가 8이라서 올리면 400이 돼. 395부터 404까지 모두 돼.",
"keys": [
"395~404 중 하나",
"일의 자리를 보고 정한다"
],
"answerBy": "claude"
},
{
"id": "1re59:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "반올림은 구하려는 자리 바로 아래 자리를 보고 정해. 십의 자리까지 나타낼 때는 바로 아래가 일의 자리라서 일의 자리 숫자를 봐.",
"keys": [
"구하려는 자리 바로 아래 자리를 본다",
"십의 자리까지면 일의 자리"
],
"answerBy": "claude"
},
{
"id": "1re59:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "반올림에서 5는 올리기로 정해져 있어. 그래서 365는 370이야.",
"keys": [
"5는 올린다",
"370"
],
"answerBy": "claude"
},
{
"id": "yehjwt:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "모자라면 안 될 때는 올림, 남는 것을 셀 수 없을 때는 버림, 대략적인 값을 알고 싶을 때는 반올림을 써.",
"keys": [
"모자라면 안 되면 올림",
"남는 것을 못 세면 버림",
"대략적인 값은 반올림"
],
"answerBy": "claude"
},
{
"id": "yehjwt:t0L2",
"kind": "low",
"round": 2,
"by": "claude",
"answer": "정확한 값이 꼭 필요하지 않거나 알기 어려울 때, 대략 얼마인지 쉽게 알고 나타내려고 어림해.",
"keys": [
"대략적인 값을 쉽게 안다",
"정확한 값이 꼭 필요하지 않을 때"
],
"answerBy": "claude"
},
{
"id": "yehjwt:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "모자라면 안 되면 올림, 모자란 묶음을 셀 수 없으면 버림, 대략적인 수를 알고 싶으면 반올림을 골라.",
"keys": [
"상황에 맞게 고른다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "yehjwt:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "예를 들어 347을 십의 자리까지 나타내면 올림은 350, 버림은 340, 반올림은 350이야. 같은 수라도 방법에 따라 달라져.",
"keys": [
"예로 든 수를 세 방법으로 나타낸다",
"결과가 다를 수 있다"
],
"answerBy": "claude"
},
{
"id": "yehjwt:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "부족하면 안 되니까 올림을 써야 해.",
"keys": [
"올림"
],
"answerBy": "claude"
},
{
"id": "yehjwt:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "25÷8=3…1이라서 3조를 짜면 1명이 남아. 남는 사람도 조에 들어가야 하니까 올림해서 4조가 필요해.",
"keys": [
"남는 사람도 들어가야 한다",
"올림, 4조"
],
"answerBy": "claude"
},
{
"id": "yehjwt:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "남는 8장은 10장이 안 돼서 한 다발로 팔 수 없어. 버림을 써서 13다발만 팔 수 있어.",
"keys": [
"모자란 묶음은 팔 수 없다",
"버림, 13다발"
],
"answerBy": "claude"
},
{
"id": "yehjwt:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "반올림은 원래 수에 가장 가까운 쪽으로 나타내서, 모자라지도 남지도 않게 실제와 가장 비슷한 값을 알 수 있어.",
"keys": [
"가장 가까운 값",
"실제와 가장 비슷하다"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "1/5+1/5+1/5로 나타낼 수 있어.",
"keys": [
"1/5을 3번 더한다"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분자에 자연수를 곱해. 분모는 그대로야.",
"keys": [
"분자에 곱한다",
"분모는 그대로"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1/5×3은 1/5을 3번 더한 것이라서, 한 조각 크기(분모)는 그대로이고 조각 수(분자)만 3배가 돼. 그래서 3/5이야.",
"keys": [
"1/5을 3번 더한 것",
"조각 크기는 그대로, 조각 수만 늘어난다"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "먼저 약분하면 곱하는 수가 작아져서 계산이 쉽고, 결과를 다시 약분할 필요가 없어.",
"keys": [
"수가 작아져 계산이 쉽다",
"나중에 약분하지 않아도 된다"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "분자에 4를 곱해서 8/7이고, 대분수로 나타내면 1과 1/7이야.",
"keys": [
"2×4=8",
"8/7=1과 1/7"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모에는 곱하지 않아. 분모까지 곱하면 8/28=2/7로 처음과 크기가 같아져. 분자에만 곱해서 8/7이 맞아.",
"keys": [
"분모에는 곱하지 않는다",
"8/7"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3/4×5=15/4=3과 3/4이야.",
"keys": [
"분자에 자연수를 곱한다",
"가분수를 대분수로 바꾼다"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "커져. 1/5을 3번 더한 것이니까 3/5이 되고, 1/5보다 커.",
"keys": [
"1/5을 3번 더한다",
"3/5으로 커진다"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자연수를 분모가 1인 분수(6=6/1)로 생각하거나, 6의 2/3만큼이라고 생각하면 돼. 6×2/3=12/3=4야.",
"keys": [
"6=6/1로 생각한다",
"6의 2/3"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "작아져. 진분수는 1보다 작으니까 그 일부만 가지는 거야.",
"keys": [
"작아진다",
"진분수는 1보다 작다"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "자연수를 (자연수)/1로 바꾸면 분수끼리의 곱셈이 돼. 분자끼리, 분모끼리 곱하면 돼. 예) 6×2/3=6/1×2/3=12/3=4",
"keys": [
"자연수를 (자연수)/1로 바꾼다",
"분자끼리, 분모끼리 곱한다"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "진분수를 곱하는 것은 자연수의 일부만큼을 구하는 거야. 전체보다 적은 부분만 가지니까 값이 작아져.",
"keys": [
"일부만큼을 구한다",
"전체보다 적다"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "8×3/4=24/4=6이야.",
"keys": [
"8×3=24",
"6"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "자연수 8은 분자에 곱해야 해. 8×3/4=24/4=6이야. 3/32는 8로 나눈 것처럼 아주 작아져서 틀려.",
"keys": [
"자연수는 분자에 곱한다",
"6"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 6×3/4=18/4인데, 약분하면 9/2=4와 1/2이야.",
"keys": [
"분자에 곱한다",
"약분해서 기약분수로"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "6×2/3=4, 5×2/3=10/3이야. 6은 3으로 나누어떨어져서 자연수가 되지만, 5는 3으로 나누어떨어지지 않아서 자연수가 안 돼.",
"keys": [
"6은 3으로 나누어떨어진다",
"5는 3으로 나누어떨어지지 않는다"
],
"answerBy": "claude"
},
{
"id": "fjim33:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분자는 분자끼리, 분모는 분모끼리 곱해.",
"keys": [
"분자끼리 곱한다",
"분모끼리 곱한다"
],
"answerBy": "claude"
},
{
"id": "fjim33:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "한 분수의 분자와 다른 분수의 분모에 공약수가 있으면, 곱하기 전에 약분하면 편리해.",
"keys": [
"분자와 분모에 공약수가 있을 때",
"곱하기 전에 약분"
],
"answerBy": "claude"
},
{
"id": "fjim33:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "3/4×2/5는 3/4의 2/5만큼이야. 전체를 4×5=20조각으로 나누면 그중 3×2=6조각이 되니까, 분모끼리 곱한 것은 조각 수, 분자끼리 곱한 것은 가진 조각 수야.",
"keys": [
"분모끼리 곱하면 전체 조각 수",
"분자끼리 곱하면 가진 조각 수"
],
"answerBy": "claude"
},
{
"id": "fjim33:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "미리 약분하면 곱하는 수가 작아져서 계산이 쉽고, 결과를 다시 약분할 일이 없어.",
"keys": [
"수가 작아진다",
"나중에 약분하지 않아도 된다"
],
"answerBy": "claude"
},
{
"id": "fjim33:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "분자끼리 3×2=6, 분모끼리 4×5=20이라서 6/20이고, 약분하면 3/10이야.",
"keys": [
"6/20",
"3/10"
],
"answerBy": "claude"
},
{
"id": "fjim33:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "곱셈은 통분하지 않아. 분자끼리, 분모끼리 곱해서 6/20=3/10이야. 통분해서 분자끼리 더하는 건 덧셈 방법이야.",
"keys": [
"곱셈은 통분하지 않는다",
"3/10"
],
"answerBy": "claude"
},
{
"id": "fjim33:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 2/3×3/4에서 3과 3을 약분하면 2/1×1/4이 되고, 약분하면 1/2이야.",
"keys": [
"곱하기 전에 약분한다",
"1/2"
],
"answerBy": "claude"
},
{
"id": "fjim33:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "작아져. 1보다 작은 수를 곱하면 그 일부만 가지게 되니까, 두 분수 어느 것보다도 작아.",
"keys": [
"작아진다",
"1보다 작은 수를 곱하면 일부만 가진다"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "대분수를 가분수로 바꿔.",
"keys": [
"가분수로 바꾼다"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "대분수에 자연수를 곱할 때는 자연수 부분과 분수 부분에 각각 곱해서 더할 수 있어. 하지만 대분수끼리는 가분수로 바꾸는 게 안전해.",
"keys": [
"각각 곱해서 더할 수 있다",
"대분수끼리는 가분수로"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1rbp9gq:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "대분수를 가분수로 바꾼 다음 분자끼리, 분모끼리 곱하고, 결과를 약분하거나 대분수로 나타내. 예) 1과 1/2×2와 1/3=3/2×7/3=21/6=7/2=3과 1/2",
"keys": [
"가분수로 바꾼다",
"분자끼리, 분모끼리 곱한다"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "자연수끼리, 분수끼리만 곱하면 자연수와 분수 부분을 곱한 값을 빠뜨리게 돼서 틀리기 쉬워.",
"keys": [
"빠뜨리는 곱이 생긴다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1rbp9gq:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "2×3+1=7이니까 7/3이야.",
"keys": [
"(자연수)×(분모)+(분자)",
"7/3"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "자연수끼리, 분수끼리만 곱하면 1×1/3이나 1/2×2 같은 곱을 빠뜨려. 가분수로 바꾸면 3/2×7/3=7/2=3과 1/2이 맞아.",
"keys": [
"빠뜨린 곱이 있다",
"가분수로 바꿔 계산(3과 1/2)"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1과 1/3×1과 1/2=4/3×3/2=12/6=2야.",
"keys": [
"가분수로 바꾼다",
"분자끼리, 분모끼리 곱한다"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "항상 커. 자연수끼리 곱한 값에, 자연수와 분수 부분을 곱한 값과 분수끼리 곱한 값이 더해지니까 더 커져. 1과 1/2×2와 1/3=3과 1/2로 2보다 커.",
"keys": [
"항상 크다",
"더해지는 곱이 더 있다"
],
"answerBy": "claude"
},
{
"id": "qebay6:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형을 서로 합동이라고 해.",
"keys": [
"모양과 크기가 같다",
"완전히 겹친다"
],
"answerBy": "claude"
},
{
"id": "qebay6:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "완전히 겹치면 두 도형은 서로 합동이야.",
"keys": [
"합동"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qebay6:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "모양만 같은 게 아니라 크기까지 같아서 포개면 빈틈없이 완전히 겹치는 도형이 합동이야.",
"keys": [
"모양과 크기가 모두 같다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qebay6:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "뒤집거나 돌려도 모양과 크기는 변하지 않아. 그래서 뒤집거나 돌려서 완전히 겹치면 합동이야.",
"keys": [
"뒤집거나 돌려도 모양과 크기는 그대로",
"완전히 겹치면 합동"
],
"answerBy": "claude"
},
{
"id": "qebay6:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "두 도형을 포개어 완전히 겹치는지 확인해. 뒤집거나 돌려서 겹쳐 봐도 돼.",
"keys": [
"포개어 본다",
"완전히 겹치는지 확인한다"
],
"answerBy": "claude"
},
{
"id": "qebay6:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "모양은 같지만 크기가 달라서 포개면 완전히 겹치지 않아. 합동은 크기까지 같아야 해.",
"keys": [
"크기가 다르다",
"합동은 크기도 같아야 한다"
],
"answerBy": "claude"
},
{
"id": "qebay6:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 같은 공책 두 권의 표지나, 같은 종류의 우표 두 장은 모양과 크기가 같아서 합동이야.",
"keys": [
"모양과 크기가 같은 두 물건"
],
"answerBy": "claude"
},
{
"id": "qebay6:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "응, 같아. 합동인 두 도형은 완전히 겹치니까 차지하는 크기인 넓이도 같아.",
"keys": [
"넓이도 같다",
"완전히 겹친다"
],
"answerBy": "claude"
},
{
"id": "192l4g2:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "겹치는 점은 대응점, 겹치는 변은 대응변, 겹치는 각은 대응각이라고 해.",
"keys": [
"대응점",
"대응변",
"대응각"
],
"answerBy": "claude"
},
{
"id": "192l4g2:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "대응변의 길이는 서로 같고, 대응각의 크기도 서로 같아.",
"keys": [
"대응변의 길이가 같다",
"대응각의 크기가 같다"
],
"answerBy": "claude"
},
{
"id": "192l4g2:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "합동인 두 도형은 완전히 겹치니까, 겹치는 변끼리 길이가 같고 겹치는 각끼리 크기가 같아.",
"keys": [
"완전히 겹친다",
"대응변·대응각이 같다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "192l4g2:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "합동인 도형에서는 대응변의 길이와 대응각의 크기가 같으니까, 한 도형의 길이나 각을 알면 다른 도형의 대응하는 곳도 똑같이 알 수 있어.",
"keys": [
"대응변·대응각은 같다",
"한쪽을 알면 다른 쪽도 안다"
],
"answerBy": "claude"
},
{
"id": "192l4g2:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "변 ㄱㄴ에 대응하는 변은 변 ㄹㅁ이야.",
"keys": [
"변 ㄹㅁ"
],
"answerBy": "claude"
},
{
"id": "192l4g2:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "합동인 두 도형은 완전히 겹치니까 대응변의 길이도 꼭 같아. 대응각만 같고 변의 길이가 다르면 합동이 아니야.",
"keys": [
"대응변의 길이도 같다",
"완전히 겹쳐야 합동"
],
"answerBy": "claude"
},
{
"id": "192l4g2:qexample",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "대응각의 크기는 같으니까 50°야.",
"keys": [
"대응각은 크기가 같다",
"50°"
],
"answerBy": "claude"
},
{
"id": "192l4g2:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니, 다를 수 없어. 합동이면 완전히 겹쳐야 하는데, 변의 개수가 다르면 모양이 달라서 겹칠 수 없어.",
"keys": [
"다를 수 없다",
"변의 개수가 다르면 겹치지 않는다"
],
"answerBy": "claude"
},
{
"id": "13ncog2:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "한 직선을 따라 접었을 때 완전히 겹치는 도형을 선대칭도형이라고 해. 그 직선이 대칭축이야.",
"keys": [
"한 직선을 따라 접으면 완전히 겹친다",
"그 직선은 대칭축"
],
"answerBy": "claude"
},
{
"id": "13ncog2:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "겹치는 점은 대응점, 겹치는 변은 대응변, 겹치는 각은 대응각이라고 해.",
"keys": [
"대응점, 대응변, 대응각"
],
"answerBy": "claude"
},
{
"id": "13ncog2:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "대칭축을 따라 접으면 양쪽이 빈틈없이 완전히 겹치는 도형이 선대칭도형이야.",
"keys": [
"대칭축을 따라 접으면 완전히 겹친다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13ncog2:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "선대칭도형에서 대응점끼리 이은 선분은 대칭축과 수직으로 만나고, 대칭축은 그 선분을 똑같이 둘로 나눠.",
"keys": [
"대칭축과 수직으로 만난다",
"대칭축이 선분을 똑같이 둘로 나눈다"
],
"answerBy": "claude"
},
{
"id": "13ncog2:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "대칭축이 될 만한 직선을 따라 접어서 완전히 겹치는지 확인해.",
"keys": [
"접어서 완전히 겹치는지 본다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13ncog2:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "접으면 A와 B가 겹치니까 AM과 BM도 겹쳐서 길이가 같아. 점 M 양쪽의 두 각도 겹치는데, 두 각을 합하면 180°이니까 각각 90°야.",
"keys": [
"AM과 BM이 겹쳐 길이가 같다",
"양쪽 각이 겹치고 합이 180°라 각각 90°"
],
"answerBy": "claude"
},
{
"id": "13ncog2:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "선대칭도형에서 대응점끼리 이은 선분은 대칭축과 꼭 수직으로 만나. 접었을 때 양쪽 각이 겹쳐서 똑같아야 하니까 각각 90°야.",
"keys": [
"꼭 수직이다",
"양쪽 각이 같아서 90°"
],
"answerBy": "claude"
},
{
"id": "13ncog2:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 이등변삼각형은 선대칭도형이고, 꼭짓점에서 밑변의 가운데로 그은 직선이 대칭축이야.",
"keys": [
"선대칭도형의 예",
"대칭축의 위치"
],
"answerBy": "claude"
},
{
"id": "13ncog2:qcondition",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "응, 있어. 정사각형은 가로, 세로 가운데를 지나는 직선 2개와 대각선 2개로 대칭축이 4개야.",
"keys": [
"대칭축이 여러 개인 도형이 있다",
"정사각형은 4개"
],
"answerBy": "claude"
},
{
"id": "1isaku1:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "한 점을 중심으로 180° 돌렸을 때 처음 도형과 완전히 겹치는 도형을 점대칭도형이라고 해.",
"keys": [
"한 점을 중심으로 180° 돌린다",
"완전히 겹친다"
],
"answerBy": "claude"
},
{
"id": "1isaku1:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "점대칭도형을 180° 돌릴 때 중심이 되는 점을 대칭의 중심이라고 해.",
"keys": [
"180° 돌릴 때 중심이 되는 점"
],
"answerBy": "claude"
},
{
"id": "1isaku1:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "대칭의 중심을 기준으로 180° 돌리면 처음 도형과 완전히 겹치는 도형이 점대칭도형이야.",
"keys": [
"180° 돌리면 완전히 겹친다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1isaku1:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "180° 돌리면 한 점은 대칭의 중심을 지나 정반대쪽으로 가서 대응점과 겹쳐. 그래서 대응점끼리 이은 선분은 항상 대칭의 중심을 지나고, 중심이 그 선분을 똑같이 둘로 나눠.",
"keys": [
"180° 돌리면 정반대쪽으로 간다",
"중심을 지나고 둘로 똑같이 나뉜다"
],
"answerBy": "claude"
},
{
"id": "1isaku1:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "한 점을 중심으로 180° 돌려서 처음 도형과 완전히 겹치는지 확인해.",
"keys": [
"180° 돌려 본다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1isaku1:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "평행사변형은 두 대각선이 만나는 점을 중심으로 180° 돌리면, 마주 보는 변과 각의 크기가 같아서 처음 모양과 완전히 겹쳐. 그래서 항상 점대칭도형이야.",
"keys": [
"대각선이 만나는 점이 중심",
"180° 돌리면 완전히 겹친다"
],
"answerBy": "claude"
},
{
"id": "1isaku1:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "점대칭도형은 180° 돌렸을 때 겹쳐야 해. 120° 돌려서 겹치는 것만으로는 점대칭도형이라고 할 수 없어.",
"keys": [
"180° 돌려야 한다",
"120°는 기준이 아니다"
],
"answerBy": "claude"
},
{
"id": "1isaku1:qcondition",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니, 정삼각형은 180° 돌리면 꼭짓점이 아래로 가서 처음 모양과 겹치지 않아. 그래서 점대칭도형이 아니야.",
"keys": [
"아니다",
"180° 돌리면 겹치지 않는다"
],
"answerBy": "claude"
},
{
"id": "1isaku1:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 직사각형은 점대칭도형이고, 두 대각선이 만나는 점이 대칭의 중심이야.",
"keys": [
"점대칭도형의 예",
"대칭의 중심 위치"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "0.9+0.9+0.9로 나타낼 수 있어.",
"keys": [
"0.9를 3번 더한다"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 0.9=9/10처럼 소수를 분수로 바꾸어 계산할 수 있어.",
"keys": [
"0.9=9/10"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1my7mv7:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "소수를 분모가 10, 100인 분수로 바꾸고 분자에 자연수를 곱한 다음, 다시 소수로 나타내. 예) 0.9×3=9/10×3=27/10=2.7",
"keys": [
"소수를 분수로 바꾼다",
"분자에 곱하고 다시 소수로"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "0.9는 0.1이 9개야. 0.9×3은 0.1이 9×3=27개라서 2.7이야. 그래서 자연수처럼 9×3을 계산하고 소수점을 찍으면 돼.",
"keys": [
"0.1이 몇 개인지로 생각한다",
"개수를 곱하고 소수점을 찍는다"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "0.7×4=7/10×4=28/10=2.8이야.",
"keys": [
"7/10×4",
"2.8"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.9는 소수 첫째 자리까지 있어서 분모가 10이야. 0.9=9/10이고, 9/100은 0.09야.",
"keys": [
"0.9=9/10",
"9/100=0.09"
],
"answerBy": "claude"
},
{
"id": "1my7mv7:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 0.6×4=0.6+0.6+0.6+0.6이야.",
"keys": [
"같은 소수를 여러 번 더한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1my7mv7:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.7과 7/10은 같은 수를 다르게 쓴 것이라서, 분수로 바꿔 계산해도 값은 그대로야. 분수의 곱셈은 우리가 이미 정확히 할 수 있으니까 답도 정확해.",
"keys": [
"0.7과 7/10은 같은 수",
"배운 분수의 곱셈으로 계산한다"
],
"answerBy": "claude"
},
{
"id": "43tvot:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자연수의 곱셈처럼 오른쪽 끝을 맞춰 써.",
"keys": [
"오른쪽 끝을 맞춘다"
],
"answerBy": "claude"
},
{
"id": "43tvot:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "곱하는 소수의 소수점 위치에 맞춰 곱에도 소수점을 그대로 내려 찍어. 1.39×2=2.78이야.",
"keys": [
"곱하는 소수의 소수점 자리대로",
"2.78"
],
"answerBy": "claude"
},
{
"id": "43tvot:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1.39는 0.01이 139개야. 139×2=278이니까 0.01이 278개라서 2.78이야. 그래서 자연수처럼 곱한 뒤 소수점 아래 자리 수를 그대로 맞춰 찍어.",
"keys": [
"0.01이 몇 개인지로 생각한다",
"소수점 아래 자리 수가 그대로"
],
"answerBy": "claude"
},
{
"id": "43tvot:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1.39를 약 1.4로 보면 1.4×2는 약 3이야. 2.78은 3에 가까우니까 소수점이 맞게 찍힌 거야. 27.8이나 0.278이면 틀린 거지.",
"keys": [
"어림한 값과 비교한다",
"값의 크기가 비슷한지 본다"
],
"answerBy": "claude"
},
{
"id": "43tvot:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "곱셈은 덧셈처럼 소수점끼리 맞출 필요가 없어. 자연수의 곱셈처럼 오른쪽 끝을 맞춰 쓰고 계산한 다음 소수점을 찍으면 돼.",
"keys": [
"곱셈은 오른쪽 끝을 맞춘다",
"계산한 뒤 소수점을 찍는다"
],
"answerBy": "claude"
},
{
"id": "43tvot:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "214×3=642이고, 소수점 아래 두 자리니까 6.42야.",
"keys": [
"214×3=642",
"6.42"
],
"answerBy": "claude"
},
{
"id": "43tvot:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1.125×3은 1125×3=3375이고, 소수점 아래 세 자리니까 3.375야.",
"keys": [
"자연수처럼 곱한다",
"소수점 아래 세 자리로 찍는다"
],
"answerBy": "claude"
},
{
"id": "43tvot:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "곱셈은 자연수처럼 계산하고 소수점은 나중에 찍으니까, 자리를 맞출 필요 없이 오른쪽 끝을 맞춰 써.",
"keys": [
"자연수처럼 계산한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6o59ch:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 0.9=9/10으로 바꾸면 3×9/10=27/10=2.7이야.",
"keys": [
"0.9=9/10"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "6o59ch:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "작아져. 1보다 작은 소수를 곱하면 자연수의 일부만큼이 되니까.",
"keys": [
"작아진다"
],
"answerBy": "claude"
},
{
"id": "6o59ch:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "소수를 분수로 바꾸고 (자연수)×(분수)로 계산한 다음 다시 소수로 나타내. 예) 3×0.9=3×9/10=27/10=2.7",
"keys": [
"소수를 분수로 바꾼다",
"분자에 곱하고 다시 소수로"
],
"answerBy": "claude"
},
{
"id": "6o59ch:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1보다 작은 소수를 곱하는 것은 자연수의 일부만큼을 구하는 거야. 3×0.9는 3의 9/10만큼이라 3보다 작아.",
"keys": [
"일부만큼을 구한다",
"3의 9/10"
],
"answerBy": "claude"
},
{
"id": "6o59ch:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.9는 9가 아니라 9/10이야. 3×9=27을 10으로 나눠서 2.7이 맞아. 27은 3보다 훨씬 커서 말이 안 돼.",
"keys": [
"0.9=9/10",
"2.7"
],
"answerBy": "claude"
},
{
"id": "6o59ch:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "5×6/10=30/10=3이야.",
"keys": [
"5×6/10",
"3"
],
"answerBy": "claude"
},
{
"id": "6o59ch:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 8×0.5=4야. 8의 반만큼이라 8보다 작아.",
"keys": [
"1보다 작은 소수를 곱한다",
"원래 수보다 작다"
],
"answerBy": "claude"
},
{
"id": "6o59ch:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.9와 9/10은 같은 수를 다른 모양으로 쓴 것뿐이라, 어느 모양으로 곱해도 값은 같아.",
"keys": [
"같은 수를 다른 모양으로 쓴 것"
],
"answerBy": "claude"
},
{
"id": "1cjber7:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 2×139를 먼저 계산하고 소수점을 찍으면 돼.",
"keys": [
"자연수 곱셈으로 계산한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cjber7:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "1.39는 139의 1/100이니까 2×139=278의 1/100인 2.78이야.",
"keys": [
"139의 1/100",
"2.78"
],
"answerBy": "claude"
},
{
"id": "1cjber7:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "소수를 자연수로 바꿔 곱한 다음, 곱하는 소수가 자연수의 1/10이면 1/10을, 1/100이면 1/100을 곱해. 예) 2×1.39: 2×139=278 → 278의 1/100=2.78",
"keys": [
"자연수로 바꿔 곱한다",
"1/10, 1/100을 곱해 되돌린다"
],
"answerBy": "claude"
},
{
"id": "1cjber7:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "곱셈은 두 수의 순서를 바꾸어 곱해도 결과가 같아. 2×1.39와 1.39×2는 둘 다 2.78이야.",
"keys": [
"순서를 바꿔도 같다",
"2.78"
],
"answerBy": "claude"
},
{
"id": "1cjber7:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "1.39는 139의 1/100이니까 278도 1/100을 해야 해. 소수점 아래 두 자리로 찍어서 2.78이 맞아. 27.8은 1/10만 한 거야.",
"keys": [
"1/100을 해야 한다",
"2.78"
],
"answerBy": "claude"
},
{
"id": "1cjber7:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "3×215=645이고, 2.15는 215의 1/100이니까 6.45야.",
"keys": [
"3×215=645",
"6.45"
],
"answerBy": "claude"
},
{
"id": "1cjber7:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "2×1.39=2.78이고 1.39×2=2.78이라 같아.",
"keys": [
"둘 다 2.78"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cjber7:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니, 항상 그렇지는 않아. 1보다 작은 소수를 곱하면 작아지지만, 1.5처럼 1보다 큰 소수를 곱하면 커져.",
"keys": [
"항상은 아니다",
"1보다 크면 커진다"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 4/10×6/10=24/100=0.24야.",
"keys": [
"분수로 바꾼다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "yc1vsn:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "곱하는 두 소수의 소수점 아래 자리 수를 더한 만큼이 돼.",
"keys": [
"소수점 아래 자리 수를 더한다"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "두 소수를 분수로 바꾸어 분자끼리, 분모끼리 곱하고 다시 소수로 나타내. 예) 0.4×0.6=4/10×6/10=24/100=0.24",
"keys": [
"분수로 바꾼다",
"분자끼리, 분모끼리 곱한다"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "소수를 분수로 바꾸면 분모가 10, 100이 되고, 분모끼리 곱하면 10×10=100처럼 0의 개수가 더해져. 분모의 0의 개수가 소수점 아래 자리 수라서 두 자리 수를 더한 것이 돼.",
"keys": [
"분모 10, 100으로 바꾼다",
"분모의 0의 개수가 더해진다"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.4와 0.6은 각각 소수점 아래 한 자리라서 곱은 두 자리가 돼야 해. 0.24가 맞아.",
"keys": [
"자리 수를 더해 두 자리",
"0.24"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "작아. 0.6은 1보다 작으니까 0.4에 0.6을 곱하면 0.4의 일부만큼이 돼.",
"keys": [
"작아진다",
"1보다 작은 수를 곱한다"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "2/10×3/10=6/100=0.06이야.",
"keys": [
"6/100",
"0.06"
],
"answerBy": "claude"
},
{
"id": "yc1vsn:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 0.5×0.4=0.2야. 0.5보다도, 0.4보다도 작아.",
"keys": [
"1보다 작은 소수끼리 곱한다",
"두 수보다 작다"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자연수의 곱셈처럼 오른쪽 끝을 맞춰 써.",
"keys": [
"오른쪽 끝을 맞춘다"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 두 소수의 소수점 아래 자리 수를 더한 만큼 곱의 소수점을 찍으면 돼.",
"keys": [
"자리 수를 더한 만큼"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "zkxrl3:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "소수점을 생각하지 않고 자연수처럼 곱한 다음, 두 소수의 소수점 아래 자리 수를 더한 만큼 오른쪽에서부터 세어 소수점을 찍어. 예) 1.2×0.34: 12×34=408 → 1+2=3자리 → 0.408",
"keys": [
"자연수처럼 곱한다",
"자리 수를 더한 만큼 소수점을 찍는다"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "곱하는 수를 어림해서 대략 얼마인지 먼저 생각해. 1.2×0.34는 약 1×0.3=0.3이니까 0.408이 맞고, 4.08이나 40.8이면 소수점이 틀린 거야.",
"keys": [
"어림한 값을 먼저 구한다",
"크기가 비슷한지 비교한다"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "곱셈은 소수점끼리 맞출 필요 없이 오른쪽 끝을 맞춰 써. 자연수처럼 곱한 다음 소수점 아래 자리 수를 더해서 소수점을 찍어.",
"keys": [
"오른쪽 끝을 맞춘다",
"계산 뒤 소수점을 찍는다"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:qrecall",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "12×34=408이고, 소수점 아래 자리 수가 1+2=3자리라서 0.408이야.",
"keys": [
"12×34=408",
"0.408"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 2.5×0.12는 25×12=300이고 1+2=3자리라서 0.300=0.3이야.",
"keys": [
"자리 수를 더한다",
"소수점 아래 세 자리"
],
"answerBy": "claude"
},
{
"id": "zkxrl3:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "소수 한 자리는 1/10, 두 자리는 1/100이야. 1/10과 1/100을 곱하면 1/1000이 되니까 소수점 아래 자리 수가 더해져.",
"keys": [
"1/10×1/100=1/1000",
"자리 수가 더해진다"
],
"answerBy": "claude"
},
{
"id": "2onq6p:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "오른쪽으로 움직여. 10을 곱하면 한 칸, 100이면 두 칸, 1000이면 세 칸이야.",
"keys": [
"오른쪽으로",
"0의 개수만큼"
],
"answerBy": "claude"
},
{
"id": "2onq6p:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "왼쪽으로 움직여. 0.1을 곱하면 한 칸, 0.01이면 두 칸, 0.001이면 세 칸이야.",
"keys": [
"왼쪽으로",
"소수점 아래 자리 수만큼"
],
"answerBy": "claude"
},
{
"id": "2onq6p:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "10을 곱하면 각 숫자가 한 자리씩 커져서 소수점이 오른쪽으로 한 칸 옮겨진 것처럼 돼. 100은 10을 두 번 곱한 것이라 두 칸이야.",
"keys": [
"10을 곱하면 자리가 하나씩 커진다",
"0의 개수만큼 옮겨진다"
],
"answerBy": "claude"
},
{
"id": "2onq6p:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "0.1을 곱하는 것은 1/10을 곱하는 것이라 각 숫자가 한 자리씩 작아져. 그래서 소수점이 왼쪽으로 한 칸 옮겨지고, 0.01은 두 칸이야.",
"keys": [
"0.1=1/10",
"자리가 하나씩 작아진다"
],
"answerBy": "claude"
},
{
"id": "2onq6p:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "소수점을 오른쪽으로 세 칸 옮기면 0.47 → 4.7 → 47 → 470이라서 470이야. 빈자리에는 0을 채워야 해.",
"keys": [
"세 칸 옮긴다",
"470"
],
"answerBy": "claude"
},
{
"id": "2onq6p:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "0.01을 곱하면 소수점이 왼쪽으로 두 칸 움직여서 0.062야.",
"keys": [
"왼쪽으로 두 칸",
"0.062"
],
"answerBy": "claude"
},
{
"id": "2onq6p:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3.25×10=32.5로 한 칸, 3.25×100=325로 두 칸 움직여.",
"keys": [
"10은 한 칸",
"100은 두 칸"
],
"answerBy": "claude"
},
{
"id": "2onq6p:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "10은 0이 1개, 100은 0이 2개라서 자리가 커지는 만큼이 달라.",
"keys": [
"0의 개수가 다르다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qptom0:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "직사각형 6개로 둘러싸인 도형을 직육면체라고 해.",
"keys": [
"직사각형 6개로 둘러싸인 도형"
],
"answerBy": "claude"
},
{
"id": "qptom0:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "정사각형 6개로 둘러싸인 도형을 정육면체라고 해.",
"keys": [
"정사각형 6개로 둘러싸인 도형"
],
"answerBy": "claude"
},
{
"id": "qptom0:t0L3",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "선분으로 둘러싸인 부분을 면, 면과 면이 만나는 선분을 모서리, 모서리와 모서리가 만나는 점을 꼭짓점이라고 해.",
"keys": [
"면",
"모서리",
"꼭짓점"
],
"answerBy": "claude"
},
{
"id": "qptom0:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "직육면체는 6개의 면이 모두 직사각형인 입체도형이야.",
"keys": [
"면 6개가 모두 직사각형"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qptom0:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "정사각형은 직사각형이라고 할 수 있으니까 정육면체는 직육면체야. 하지만 직사각형이 모두 정사각형은 아니라서 직육면체가 모두 정육면체는 아니야.",
"keys": [
"정사각형은 직사각형",
"직사각형이 모두 정사각형은 아니다"
],
"answerBy": "claude"
},
{
"id": "qptom0:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "면은 6개, 모서리는 12개, 꼭짓점은 8개야.",
"keys": [
"면 6",
"모서리 12",
"꼭짓점 8"
],
"answerBy": "claude"
},
{
"id": "qptom0:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "거꾸로 말했어. 직육면체는 모서리가 12개, 꼭짓점이 8개야.",
"keys": [
"모서리 12개",
"꼭짓점 8개"
],
"answerBy": "claude"
},
{
"id": "qptom0:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 휴지 상자는 직육면체야. 면이 모두 정사각형은 아니라서 정육면체는 아니야.",
"keys": [
"직육면체 모양 물건",
"면이 모두 정사각형인지 본다"
],
"answerBy": "claude"
},
{
"id": "qptom0:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "응, 정육면체의 면인 정사각형도 직사각형이니까 정육면체도 직육면체야.",
"keys": [
"정사각형도 직사각형"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1dsdr7k:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "서로 마주 보는 면은 평행해. 이렇게 평행한 두 면을 직육면체의 밑면이라고 해.",
"keys": [
"마주 보는 면은 평행",
"밑면"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "밑면과 옆면은 서로 수직으로 만나.",
"keys": [
"수직으로 만난다"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "직육면체의 면 6개는 마주 보는 면끼리 짝을 지으면 앞과 뒤, 왼쪽과 오른쪽, 위와 아래로 3쌍이 되고, 각 쌍은 서로 평행해.",
"keys": [
"마주 보는 면끼리 짝",
"평행한 면 3쌍"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "면 6개 중 밑면 2개(선택한 면과 마주 보는 면)를 빼면 4개가 남아. 이 4개가 밑면과 모두 수직으로 만나는 옆면이야.",
"keys": [
"6개에서 밑면 2개를 뺀다",
"남은 4개가 옆면"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "4개야.",
"keys": [
"4개"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "한 면과 마주 보는 면을 빼면 4개가 남아서 옆면이 4개야.",
"keys": [
"6-2=4"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1dsdr7k:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "서로 만나는 두 면은 평행이 아니라 수직이야. 평행한 면은 서로 마주 보는 면이야.",
"keys": [
"만나는 면은 수직",
"마주 보는 면이 평행"
],
"answerBy": "claude"
},
{
"id": "1dsdr7k:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 상자의 윗면과 아랫면은 서로 평행한 면 한 쌍이야.",
"keys": [
"마주 보는 두 면"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "보이는 모서리는 실선으로, 보이지 않는 모서리는 점선으로 그려.",
"keys": [
"보이는 모서리는 실선",
"보이지 않는 모서리는 점선"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "직육면체 모양을 한눈에 잘 알 수 있게 나타내려고 그려.",
"keys": [
"모양을 잘 알 수 있게 나타낸다"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "겨냥도는 보이는 모서리는 실선, 보이지 않는 모서리는 점선으로 그려서 직육면체 모양을 잘 알 수 있게 나타낸 그림이야.",
"keys": [
"실선과 점선으로 그린 그림"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1u6qpfn:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "보이는 면 3개와 보이지 않는 면 3개는 같은 직육면체의 면을 나눠서 센 것뿐이라서, 더하면 전체 6개가 돼.",
"keys": [
"보이는 면 3, 보이지 않는 면 3",
"나눠 센 것이라 합이 6"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "거꾸로 말했어. 보이는 모서리는 실선, 보이지 않는 모서리는 점선으로 그려.",
"keys": [
"보이는 모서리는 실선",
"보이지 않는 모서리는 점선"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "보이는 모서리는 9개야. 보이지 않는 모서리는 3개야.",
"keys": [
"9개"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "달라. 겨냥도는 입체 모양을 그대로 보이게 그린 그림이고, 전개도는 모서리를 잘라서 평면에 펼쳐 놓은 그림이야.",
"keys": [
"겨냥도는 입체 모양 그대로",
"전개도는 잘라서 펼친 그림"
],
"answerBy": "claude"
},
{
"id": "1u6qpfn:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "앞에서 비스듬히 보면 뒤쪽 아래 꼭짓점에서 만나는 모서리 3개가 안 보여. 그 3개를 점선으로 그려.",
"keys": [
"뒤쪽에 숨은 모서리",
"점선 3개"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "정육면체나 직육면체의 모서리를 잘라서 펼쳐 놓은 그림이야.",
"keys": [
"모서리를 잘라서 펼친 그림"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "잘린 모서리는 실선으로, 잘리지 않은 모서리는 점선으로 그려.",
"keys": [
"잘린 모서리는 실선",
"잘리지 않은 모서리는 점선"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "전개도는 모서리를 잘라 펼친 그림이고, 접으면 마주 보는 면 3쌍이 서로 합동이야.",
"keys": [
"잘라서 펼친 그림",
"마주 보는 면 3쌍"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "kxb2zb:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "접었을 때 만나는 선분끼리는 길이가 같아. 서로 마주 보게 되는 면끼리는 평행하고, 이웃한 면끼리는 수직이 돼.",
"keys": [
"만나는 선분은 길이가 같다",
"마주 보는 면은 평행, 이웃한 면은 수직"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "거꾸로 말했어. 잘린 모서리는 실선, 접히는(잘리지 않은) 모서리는 점선으로 그려.",
"keys": [
"잘린 모서리는 실선",
"접히는 모서리는 점선"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:qcondition",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니, 모두 접히지는 않아. 접었을 때 면이 겹치거나 빈 곳이 생기면 정육면체가 안 돼. 예를 들어 정사각형 6개를 한 줄로 붙이면 접히지 않아.",
"keys": [
"아니다",
"겹치거나 빈 곳이 생기면 안 된다"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "마주 보는 면 3쌍이 합동이야.",
"keys": [
"3쌍"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "B와 마주 보는 면은 D야. A, C, E, F는 B와 모서리를 함께 쓰는 이웃한 면이라서 접으면 B와 만나니까 마주 볼 수 없어. 한 줄로 이어진 A-B-C-D에서는 하나 건너뛴 면끼리 마주 봐.",
"keys": [
"B와 마주 보는 면은 D",
"붙어 있는 면은 이웃한 면"
],
"answerBy": "claude"
},
{
"id": "kxb2zb:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 정사각형 4개를 가로로 한 줄 붙이고, 두 번째 정사각형의 위와 아래에 하나씩 붙여서 모두 6개로 만들어.",
"keys": [
"정사각형 6개",
"접었을 때 겹치지 않게"
],
"answerBy": "claude"
},
{
"id": "v61qpj:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자료의 값을 모두 더한 다음 자료의 수로 나눠.",
"keys": [
"모두 더한다",
"자료의 수로 나눈다"
],
"answerBy": "claude"
},
{
"id": "v61qpj:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자료의 수로 나눠.",
"keys": [
"자료의 수"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v61qpj:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "평균은 자료의 값을 모두 더해 자료의 수로 나눈 값이야. 예) 2, 4, 6의 평균은 (2+4+6)÷3=4",
"keys": [
"모두 더해 자료의 수로 나눈다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v61qpj:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "평균은 자료 전체의 값을 고르게 했을 때의 값이라서, 자료가 대체로 어느 정도인지 하나의 수로 나타낼 수 있어.",
"keys": [
"자료를 고르게 한 값",
"전체를 하나의 수로 나타낸다"
],
"answerBy": "claude"
},
{
"id": "v61qpj:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "평균은 가장 큰 수가 아니라 모두 더해 자료의 수로 나눈 값이야. (3+5+7)÷3=5야.",
"keys": [
"모두 더해 나눈다",
"5"
],
"answerBy": "claude"
},
{
"id": "v61qpj:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "(2+4+6+8)÷4=20÷4=5야.",
"keys": [
"합 20",
"평균 5"
],
"answerBy": "claude"
},
{
"id": "v61qpj:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1, 2, 6의 평균은 (1+2+6)÷3=3인데, 3은 자료 중에 없어.",
"keys": [
"평균을 구한다",
"자료에 없는 값이 나온다"
],
"answerBy": "claude"
},
{
"id": "v61qpj:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "많은 것에서 적은 것으로 옮겨서 모두 똑같이 만들면 그 값이 평균이야. 모두 더해 똑같이 나누는 것과 같으니까 고르게 나눈 값이라고 해.",
"keys": [
"많은 곳에서 적은 곳으로 옮긴다",
"똑같이 나누는 것과 같다"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 모둠의 사람 수가 달라도 한 사람당 기록을 비교할 수 있어서 공평하게 비교할 수 있어.",
"keys": [
"사람 수가 달라도 비교할 수 있다",
"한 사람당 기록"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 평균은 자료의 수로 나눈 값이라 자료의 수가 달라도 비교할 수 있어.",
"keys": [
"자료의 수가 달라도 된다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kwi8f7:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "사람이 많으면 합은 당연히 커질 수 있어서 합으로 비교하면 공평하지 않아. 평균은 한 사람당 값이라 사람 수가 달라도 공평하게 비교할 수 있어.",
"keys": [
"합은 사람 수에 따라 커진다",
"평균은 한 사람당 값"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "(평균)×(자료의 수)=(합)이라서, 목표 평균을 알면 필요한 합을 구하고 지금까지의 합을 빼서 남은 값을 구할 수 있어. 예) 4번 평균 80점이 목표이고 3번 합이 230점이면 마지막에 320-230=90점이 필요해.",
"keys": [
"(평균)×(자료의 수)=(합)",
"필요한 합에서 지금까지의 합을 뺀다"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "400÷5=80이니까 평균은 80점이야.",
"keys": [
"400÷5",
"80점"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "사람 수가 달라서 합으로 비교하면 안 돼. 평균은 A모둠 320÷4=80점, B모둠 375÷5=75점이라 A모둠이 더 좋아.",
"keys": [
"합이 아니라 평균으로 비교",
"A모둠 80점, B모둠 75점"
],
"answerBy": "claude"
},
{
"id": "1kwi8f7:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3번의 평균이 70점이면 합은 210점이야. 두 번이 60점, 70점이면 나머지는 210-130=80점이야.",
"keys": [
"평균×수=합",
"합에서 아는 값을 뺀다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kwi8f7:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "응, 다를 수 있어. 예를 들어 50, 50과 30, 70은 평균이 둘 다 50이지만 점수는 달라. 평균은 고르게 했을 때의 값일 뿐이야.",
"keys": [
"다를 수 있다",
"평균은 고르게 한 값"
],
"answerBy": "claude"
},
{
"id": "1sv592k:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "0으로 표현해.",
"keys": [
"0"
],
"answerBy": "claude"
},
{
"id": "1sv592k:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "반반이다는 1/2, 확실하다는 1이야.",
"keys": [
"반반 1/2",
"확실 1"
],
"answerBy": "claude"
},
{
"id": "1sv592k:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "일어날 수 없으면 0, 일어날 가능성과 안 일어날 가능성이 같으면 1/2, 반드시 일어나면 1로 나타내.",
"keys": [
"불가능 0, 반반 1/2, 확실 1"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1sv592k:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "각 상황의 가능성을 0, 1/2, 1 같은 수나 '불가능하다~확실하다' 말로 나타내 보고, 1에 가까울수록 더 일어나기 쉬운 것으로 비교해.",
"keys": [
"가능성을 수나 말로 나타낸다",
"1에 가까울수록 일어나기 쉽다"
],
"answerBy": "claude"
},
{
"id": "1sv592k:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "주사위에서 3 이하의 눈은 1, 2, 3으로 6개 중 3개야. 그래서 가능성은 반반이고 수로 1/2이야.",
"keys": [
"1, 2, 3으로 6개 중 3개",
"반반, 1/2"
],
"answerBy": "claude"
},
{
"id": "1sv592k:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "그림면과 숫자면 중 하나가 나오니까 반반이고, 수로 1/2이야.",
"keys": [
"반반",
"1/2"
],
"answerBy": "claude"
},
{
"id": "1sv592k:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 흰 공만 들어 있는 상자에서 공을 꺼내면 흰 공이 나올 가능성은 1이야.",
"keys": [
"반드시 일어나는 상황"
],
"answerBy": "claude"
},
{
"id": "1sv592k:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "가장 일어나기 어려운 것은 절대 일어나지 않는 불가능(0)이고, 가장 일어나기 쉬운 것은 반드시 일어나는 확실(1)이야. 그보다 더 어렵거나 쉬운 경우는 없으니까 0과 1 사이에 있어.",
"keys": [
"불가능이 가장 작다(0)",
"확실이 가장 크다(1)"
],
"answerBy": "claude"
}
],
"seen": []
} });
