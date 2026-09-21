/* [v84.5] 질문 고르기 — 기본으로 실어 두는 분류안 (초5-2)
   Claude 분류(by:'claude') · 겹쳐서 뺀 것(offBy:'claude') · 모범 답(answerBy:'claude') — 초5-1 마스터 견본·검토 기준으로 전 과정.
   [b] 2026-09-21 초5-1 검수 기준표(작업도구/질문고르기/기준표_초등_질문.md)로 전 과정 2차 다듬기:
       문장 130 · 뺌 69 · 회차 바꿈 6 · 모범 답 다시 씀 35 · 활용 문장제 등 추가 질문 26.
   [c] 2026-09-21 같은 소단원·같은 회차에서 같은 숫자를 되풀이하던 질문 숫자 바꿈(마스터 지시): 문장 11 · 추가 질문 4개 새 번호로 바꿔 넣음.
       계단 11칸은 작업도구/질문계단/e5/ladder_E5_2.json 에서 바꿈.
   review.js 가 화면 열 때 한 번만 넣는다(이 기기에 적어 둔 것은 안 덮음). key 를 바꾸면 다시 넣는다. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-2_2026-09-21b', data:{
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
"answerBy": "claude",
"newQ": "① 125 이상인 수는 어떤 수야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 160 이하인 수는 어떤 수야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"round": 1,
"by": "claude",
"answer": "38에 색칠한 점(●)을 찍고 오른쪽으로 선을 그어. 38도 들어가니까 색칠한 점이야.",
"keys": [
"38에 색칠한 점(●)",
"오른쪽으로 선을 긋는다"
],
"answerBy": "claude",
"newQ": "② 수직선에 38 이상인 수를 어떻게 나타내?",
"newQBy": "claude",
"rWas": 2,
"ansWas": {
"a": "125에 색칠한 점(●)을 찍고 오른쪽으로 선을 그어. 125도 들어가니까 색칠한 점이야.",
"k": [
"125에 색칠한 점(●)",
"오른쪽으로 선을 긋는다"
]
},
"qWas": "② 수직선에 125 이상인 수를 어떻게 나타내?"
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
"answerBy": "claude",
"newQ": "40 이상인 자연수 중에서 가장 작은 수는 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "'5 이상인 수'와 '5보다 큰 수'는 뭐가 달라?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "키가 140 cm 이상인 사람만 탈 수 있는 놀이기구가 있어. 키가 140 cm인 친구는 탈 수 있어? 왜 그런지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|01. 이상과 이하:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|01. 이상과 이하:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|01. 이상과 이하:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 125 초과인 수는 어떤 수야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 160 미만인 수는 어떤 수야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answer": "125 초과는 125가 들어가지 않으니까 125에 빈 점(○)을 찍고, 125 이상은 125가 들어가니까 색칠한 점(●)을 찍어. 둘 다 오른쪽으로 선을 그어.",
"keys": [
"초과는 빈 점(○)",
"이상은 색칠한 점(●)",
"125가 들어가는지가 다르다"
],
"answerBy": "claude",
"newQ": "② 수직선에 125 초과인 수를 나타낼 때, '125 이상인 수'와 어떻게 다르게 그려?",
"newQBy": "claude",
"ansWas": {
"a": "이상·이하는 기준이 되는 수를 포함하고, 초과·미만은 포함하지 않아. 그래서 수직선에 이상·이하는 ●, 초과·미만은 ○로 나타내.",
"k": [
"이상·이하는 포함, 초과·미만은 포함하지 않는다",
"●와 ○로 구분한다"
]
}
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
"answerBy": "claude",
"newQ": "10 초과인 자연수 중에서 가장 작은 수는 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "몸무게가 30 kg 미만인 사람만 참가할 수 있어. 몸무게가 30 kg인 친구는 참가할 수 있어? 왜 그런지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|02. 초과와 미만:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|02. 초과와 미만:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|02. 초과와 미만:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "② '10 이상 20 미만'은 어떤 수들이야?",
"newQBy": "claude"
},
{
"id": "19xudqz:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "10은 들어가고 20은 들어가지 않으니까 '10 이상 20 미만'이야.",
"keys": [
"10은 들어간다 → 10 이상",
"20은 안 들어간다 → 20 미만"
],
"answerBy": "claude",
"newQ": "① 수직선에서 10에는 색칠한 점(●), 20에는 빈 점(○)을 찍고 그 사이를 이었어. 이 범위를 말로 나타내 봐.",
"newQBy": "claude",
"rWas": 1,
"ansWas": {
"a": "범위의 시작과 끝에 각각 이상·초과 중 하나, 이하·미만 중 하나를 붙여서 나타내. 끝의 수를 포함하면 이상·이하, 포함하지 않으면 초과·미만을 써.",
"k": [
"시작과 끝에 하나씩 붙인다",
"포함하면 이상·이하, 아니면 초과·미만"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "'25 초과 30 이하'인 자연수를 모두 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "19xudqz:qcondition",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "달라. '30 이상 40 이하'는 30과 40이 들어가지만, '30 초과 40 미만'은 30과 40이 들어가지 않아.",
"keys": [
"이상·이하는 30과 40이 들어간다",
"초과·미만은 30과 40이 안 들어간다"
],
"answerBy": "claude",
"newQ": "'30 이상 40 이하'와 '30 초과 40 미만'은 들어가는 수가 어떻게 달라?",
"newQBy": "claude",
"qWas": "'10 이상 20 이하'와 '10 초과 20 미만'은 들어가는 수가 어떻게 달라?",
"ansWas": {
"a": "달라. '10 이상 20 이하'는 10과 20이 들어가지만, '10 초과 20 미만'은 10과 20이 들어가지 않아.",
"k": [
"다르다",
"10과 20의 포함 여부"
]
}
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|03. 수의 범위 활용하기:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|03. 수의 범위 활용하기:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|03. 수의 범위 활용하기:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 올림이 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 321을 올림하여 십의 자리까지 나타내면 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answer": "320이야. 일의 자리가 0이라 올릴 수가 없어서 그대로야.",
"keys": [
"320",
"일의 자리가 0이라 올릴 게 없다"
],
"answerBy": "claude",
"newQ": "320을 올림하여 십의 자리까지 나타내면 얼마야? 왜 그런지도 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "일의 자리가 0이라서 올릴 수가 없어. 그래서 그대로 320이야.",
"k": [
"아래 자리가 0",
"올릴 것이 없다"
]
}
},
{
"id": "4k34j1:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "십의 자리를 1 크게 하면서 일의 자리 4를 0으로 만들지 않았어. 바른 답은 370이야.",
"keys": [
"일의 자리를 0으로 해야 한다",
"370"
],
"answerBy": "claude",
"newQ": "친구가 364를 올림하여 십의 자리까지 나타내면 374라고 했어. 어떻게 잘못한 건지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "십의 자리까지 올림하면 일의 자리 4를 올려서 십의 자리 6이 7이 돼. 374가 아니라 370이야.",
"k": [
"일의 자리를 0으로 만든다",
"370"
]
}
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|04. 올림:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|04. 올림:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|04. 올림:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 버림이 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 321을 버림하여 십의 자리까지 나타내면 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "glvzvi:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "십의 자리까지가 아니라 백의 자리까지 버림했어. 십의 자리까지는 일의 자리만 버려서 360이야.",
"keys": [
"백의 자리까지 버림한 것",
"360"
],
"answerBy": "claude",
"newQ": "친구가 364를 버림하여 십의 자리까지 나타내면 300이라고 했어. 어떻게 잘못한 건지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "십의 자리까지 버림하면 일의 자리만 버려서 360이야. 300은 백의 자리까지 버림한 값이야.",
"k": [
"일의 자리만 버린다",
"360"
]
}
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|05. 버림:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|05. 버림:2",
"kind": "ladder"
},
{
"id": "1re59:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "구하려는 자리 바로 아래 숫자가 0, 1, 2, 3, 4이면 버리고, 5, 6, 7, 8, 9이면 올리는 방법이야.",
"keys": [
"바로 아래 자리 숫자를 본다",
"0~4는 버림",
"5~9는 올림"
],
"answerBy": "claude",
"newQ": "① 반올림이 뭐야?",
"newQBy": "claude",
"ansWas": {
"a": "버려. 아래 자리 숫자가 0, 1, 2, 3, 4이면 버림해.",
"k": [
"버린다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "2453을 반올림하여 백의 자리까지 나타내면 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 365를 반올림하여 십의 자리까지 나타낼 때, 5는 애매하니까 버려서 360이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|06. 반올림:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|06. 반올림:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|06. 반올림:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 올림·버림·반올림은 각각 어떤 상황에 써?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"round": 1,
"by": "claude",
"answer": "올림하면 350, 버림하면 340, 반올림하면 일의 자리가 7이라 350이야.",
"keys": [
"올림 350",
"버림 340",
"반올림 350"
],
"answerBy": "claude",
"newQ": "② 347을 올림, 버림, 반올림하여 십의 자리까지 나타내면 각각 얼마야?",
"newQBy": "claude",
"rWas": 2,
"ansWas": {
"a": "예를 들어 347을 십의 자리까지 나타내면 올림은 350, 버림은 340, 반올림은 350이야. 같은 수라도 방법에 따라 달라져.",
"k": [
"예로 든 수를 세 방법으로 나타낸다",
"결과가 다를 수 있다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "25명이 한 조에 8명씩 조를 짜. 모두 조에 들어가려면 최소 몇 조가 필요해? 어떤 어림 방법을 썼는지도 말해 봐.",
"newQBy": "claude"
},
{
"id": "yehjwt:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "남는 8장은 10장이 안 돼서 한 묶음으로 팔 수 없어. 버림을 써서 13묶음이야.",
"keys": [
"남는 8장은 팔 수 없다",
"버림",
"13묶음"
],
"answerBy": "claude",
"newQ": "색종이 138장을 10장씩 묶어서 팔아. 친구가 14묶음을 팔 수 있다고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "남는 8장은 10장이 안 돼서 한 다발로 팔 수 없어. 버림을 써서 13다발만 팔 수 있어.",
"k": [
"모자란 묶음은 팔 수 없다",
"버림, 13다발"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|07. 올림·버림·반올림 활용하기:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|07. 올림·버림·반올림 활용하기:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|1. 수의 범위와 어림하기|07. 올림·버림·반올림 활용하기:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 1/5 × 3을 덧셈식으로 나타내 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② (분수)×(자연수)는 분자와 분모 중 어디에 자연수를 곱해?",
"newQBy": "claude"
},
{
"id": "11m6g9r:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1/5 × 3은 피자 1/5조각을 3번 더한 거야. 조각 크기(분모 5)는 그대로고 조각 수(분자)만 3개가 돼서 3/5이야.",
"keys": [
"1/5을 3번 더한 것",
"조각 크기(분모)는 그대로",
"조각 수(분자)만 3배"
],
"answerBy": "claude",
"newQ": "① 1/5 × 3에서 왜 분모는 그대로 두고 분자에만 3을 곱해? 피자로 예를 들어 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "1/5×3은 1/5을 3번 더한 것이라서, 한 조각 크기(분모)는 그대로이고 조각 수(분자)만 3배가 돼. 그래서 3/5이야.",
"k": [
"1/5을 3번 더한 것",
"조각 크기는 그대로, 조각 수만 늘어난다"
]
}
},
{
"id": "11m6g9r:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "분모 12와 자연수 4를 4로 약분하면 5/3 × 1이 돼. 그래서 5/3, 대분수로 1과 2/3이야.",
"keys": [
"분모와 자연수를 약분",
"5/3 = 1과 2/3"
],
"answerBy": "claude",
"newQ": "② 5/12 × 4를 약분해서 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"rWas": 2,
"ansWas": {
"a": "먼저 약분하면 곱하는 수가 작아져서 계산이 쉽고, 결과를 다시 약분할 필요가 없어.",
"k": [
"수가 작아져 계산이 쉽다",
"나중에 약분하지 않아도 된다"
]
}
},
{
"id": "11m6g9r:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "분자에 3을 곱해서 6/7이야.",
"keys": [
"분자에만 곱한다",
"6/7"
],
"answerBy": "claude",
"newQ": "2/7 × 3은 얼마야?",
"newQBy": "claude",
"qWas": "2/7 × 4는 얼마야?",
"ansWas": {
"a": "분자에 4를 곱해서 8/7이고, 대분수로 나타내면 1과 1/7이야.",
"k": [
"2×4=8",
"8/7=1과 1/7"
]
}
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
"answerBy": "claude",
"newQ": "친구가 2/7 × 4를 분모에도 4를 곱해서 8/28이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "계산 결과가 대분수가 되는 (분수)×(자연수) 식을 네가 하나 만들어서 계산해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|01. (분수)×(자연수):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|01. (분수)×(자연수):2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|01. (분수)×(자연수):3",
"kind": "ladder"
},
{
"id": "1h3g8qe:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "6 × 2/3은 6의 2/3만큼이야. 6 × 2 = 12를 분자에 두면 12/3이고, 12/3 = 4야.",
"keys": [
"자연수를 분자에 곱한다",
"12/3 = 4"
],
"answerBy": "claude",
"newQ": "① 6 × 2/3을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "자연수를 분모가 1인 분수(6=6/1)로 생각하거나, 6의 2/3만큼이라고 생각하면 돼. 6×2/3=12/3=4야.",
"k": [
"6=6/1로 생각한다",
"6의 2/3"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1h3g8qe:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "10 × 3/5은 10을 5묶음으로 나눈 것 중 3묶음, 즉 10의 일부만큼이야. 전체보다 적으니까 10보다 작은 6이 돼.",
"keys": [
"10의 3/5만큼(일부)",
"전체보다 적다"
],
"answerBy": "claude",
"newQ": "② 10 × 3/5이 10보다 작은 이유를 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "6 × 2/3은 6을 3묶음으로 나눈 것 중 2묶음, 즉 6의 일부만큼이야. 전체보다 적으니까 6보다 작은 4가 돼.",
"k": [
"6의 2/3만큼(일부)",
"전체보다 적다"
]
},
"qWas": "② 6 × 2/3이 6보다 작은 이유를 말해 봐."
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 8 × 3/4을 8을 분모에 곱해서 3/32이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "계산 결과를 약분해야 하는 (자연수)×(분수) 식을 네가 하나 만들어서 계산해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "6 × 2/3은 자연수가 되는데 5 × 2/3은 왜 자연수가 안 돼?",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|02. (자연수)×(분수):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|02. (자연수)×(분수):2",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 진분수끼리는 어떻게 곱해?",
"newQBy": "claude"
},
{
"id": "fjim33:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "3과 9를 3으로, 8과 4를 4로 약분하면 1/2 × 1/3이 돼. 그래서 1/6이야.",
"keys": [
"분자와 다른 분수의 분모끼리 약분",
"1/6"
],
"answerBy": "claude",
"newQ": "② 3/8 × 4/9를 곱하기 전에 약분하는 과정을 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "한 분수의 분자와 다른 분수의 분모에 공약수가 있으면, 곱하기 전에 약분하면 편리해.",
"k": [
"분자와 분모에 공약수가 있을 때",
"곱하기 전에 약분"
]
}
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
"answerBy": "claude",
"newQ": "① 진분수의 곱셈에서 왜 분모끼리 곱하는지 네모를 나누는 그림으로 설명해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "3/4 × 2/5는 얼마야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 3/4 × 2/5를 분모를 20으로 통분한 뒤 분자끼리 더했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "fjim33:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "작아. 1/2 × 1/3은 피자 반 판을 다시 3조각으로 나눈 것 중 한 조각이라 1/6이야. 반 판의 일부니까 1/2보다 작아.",
"keys": [
"작다",
"1/2의 1/3만큼(일부)",
"1/6"
],
"answerBy": "claude",
"newQ": "1/2 × 1/3은 1/2보다 커, 작아? 피자로 예를 들어 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "작아져. 1보다 작은 수를 곱하면 그 일부만 가지게 되니까, 두 분수 어느 것보다도 작아.",
"k": [
"작아진다",
"1보다 작은 수를 곱하면 일부만 가진다"
]
}
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|03. 진분수의 곱셈:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|03. 진분수의 곱셈:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|03. 진분수의 곱셈:3",
"kind": "ladder"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "① 1과 1/2 × 2와 1/3을 계산하는 과정을 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 1과 1/2 × 2와 1/3을 자연수끼리(1×2), 분수끼리(1/2×1/3) 따로 곱해서 더했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "네가 대분수 두 개를 정해서 곱하는 식을 만들고 계산해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|04. 여러 가지 분수의 곱셈:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|04. 여러 가지 분수의 곱셈:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|2. 분수의 곱셈|04. 여러 가지 분수의 곱셈:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 두 도형이 서로 합동이라는 건 무슨 뜻이야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 뒤집거나 돌려서 완전히 겹쳐도 합동이야? 왜 그런지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "두 도형이 합동인지 어떻게 확인해?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 큰 정삼각형과 작은 정삼각형은 모양이 같으니까 합동이라고 했어. 뭐가 잘못됐을까?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "우리 주변 물건 중에서 서로 합동인 것 두 개를 예로 들어 봐.",
"newQBy": "claude"
},
{
"id": "qebay6:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "아니야. 가로 2 cm, 세로 8 cm인 직사각형과 한 변이 4 cm인 정사각형은 넓이가 16 cm²로 같지만 모양이 달라서 겹치지 않아.",
"keys": [
"넓이가 같아도 합동이 아닐 수 있다",
"모양이 다르면 겹치지 않는다"
],
"answerBy": "claude",
"newQ": "넓이가 같은 두 도형은 항상 합동이야? 예를 들어 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "응, 같아. 합동인 두 도형은 완전히 겹치니까 차지하는 크기인 넓이도 같아.",
"k": [
"넓이도 같다",
"완전히 겹친다"
]
}
},
{
"id": "ladder:e5-2|3. 합동과 대칭|01. 도형의 합동:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|01. 도형의 합동:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|01. 도형의 합동:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 합동인 두 도형에서 겹치는 점, 변, 각을 각각 뭐라고 해?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 합동인 두 도형에서 대응변의 길이와 대응각의 크기는 어때?",
"newQBy": "claude"
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
"round": 1,
"by": "claude",
"answer": "변 ㄹㅁ은 변 ㄱㄴ의 대응변이라 5 cm, 각 ㄹㅁㅂ은 각 ㄱㄴㄷ의 대응각이라 60°야. 합동이면 대응변의 길이와 대응각의 크기가 같아.",
"keys": [
"변 ㄹㅁ = 5 cm",
"각 ㄹㅁㅂ = 60°",
"대응변·대응각은 같다"
],
"answerBy": "claude",
"newQ": "② 삼각형 ㄱㄴㄷ과 삼각형 ㄹㅁㅂ이 합동이야. 변 ㄱㄴ이 5 cm, 각 ㄱㄴㄷ이 60°이면 변 ㄹㅁ과 각 ㄹㅁㅂ은 얼마야? 왜 그런지도 말해 봐.",
"newQBy": "claude",
"rWas": 2,
"ansWas": {
"a": "합동인 도형에서는 대응변의 길이와 대응각의 크기가 같으니까, 한 도형의 길이나 각을 알면 다른 도형의 대응하는 곳도 똑같이 알 수 있어.",
"k": [
"대응변·대응각은 같다",
"한쪽을 알면 다른 쪽도 안다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 합동인 두 삼각형은 대응각의 크기는 같지만 대응변의 길이는 다를 수도 있다고 했어. 뭐가 잘못됐을까?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|02. 합동인 도형의 성질:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|02. 합동인 도형의 성질:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|02. 합동인 도형의 성질:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 선대칭도형이 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "② 선대칭도형에서 대응점끼리 이은 선분과 대칭축은 어떤 관계야?",
"newQBy": "claude"
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
"answer": "접으면 대칭축 양쪽의 두 각이 완전히 겹쳐서 크기가 같아. 두 각을 합하면 180°니까 각각 90°, 그래서 수직이야.",
"keys": [
"접으면 양쪽 두 각이 겹쳐 같다",
"합이 180°라 각각 90°"
],
"answerBy": "claude",
"newQ": "선대칭도형을 대칭축으로 접는 모습을 생각해서, 대응점끼리 이은 선분이 왜 대칭축과 수직으로 만나는지 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "접으면 A와 B가 겹치니까 AM과 BM도 겹쳐서 길이가 같아. 점 M 양쪽의 두 각도 겹치는데, 두 각을 합하면 180°이니까 각각 90°야.",
"k": [
"AM과 BM이 겹쳐 길이가 같다",
"양쪽 각이 겹치고 합이 180°라 각각 90°"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "네가 아는 선대칭도형을 하나 말하고, 대칭축이 어디인지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "정사각형의 대칭축은 몇 개야? 어디에 있는지도 말해 봐.",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|03. 선대칭도형과 그 성질:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|03. 선대칭도형과 그 성질:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|03. 선대칭도형과 그 성질:3",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|03. 선대칭도형과 그 성질:4",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 점대칭도형이 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 점대칭도형에서 대칭의 중심이 뭐야?",
"newQBy": "claude"
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
"round": 1,
"by": "claude",
"answer": "대응점끼리 이은 선분은 대칭의 중심을 지나고, 대칭의 중심이 그 선분을 똑같이 둘로 나눠.",
"keys": [
"대칭의 중심을 지난다",
"선분을 똑같이 둘로 나눈다"
],
"answerBy": "claude",
"newQ": "② 점대칭도형에서 대응점끼리 이은 선분과 대칭의 중심은 어떤 관계야?",
"newQBy": "claude",
"rWas": 2,
"ansWas": {
"a": "180° 돌리면 한 점은 대칭의 중심을 지나 정반대쪽으로 가서 대응점과 겹쳐. 그래서 대응점끼리 이은 선분은 항상 대칭의 중심을 지나고, 중심이 그 선분을 똑같이 둘로 나눠.",
"k": [
"180° 돌리면 정반대쪽으로 간다",
"중심을 지나고 둘로 똑같이 나뉜다"
]
}
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
"answerBy": "claude",
"newQ": "평행사변형이 점대칭도형인 이유를 말해 봐. 대칭의 중심은 어디야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 어떤 도형을 120° 돌렸더니 처음 모양과 겹쳐서 점대칭도형이라고 했어. 뭐가 잘못됐을까?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "정삼각형은 점대칭도형이야? 왜 그런지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|04. 점대칭도형과 그 성질:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|04. 점대칭도형과 그 성질:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|04. 점대칭도형과 그 성질:3",
"kind": "ladder"
},
{
"id": "ladder:e5-2|3. 합동과 대칭|04. 점대칭도형과 그 성질:4",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 0.9 × 3을 덧셈식으로 나타내 봐.",
"newQBy": "claude"
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
"answer": "0.7을 7/10으로 바꾸면 7/10 × 4 = 28/10이야. 다시 소수로 나타내면 2.8이야.",
"keys": [
"0.7 = 7/10",
"28/10 = 2.8"
],
"answerBy": "claude",
"newQ": "① 0.7 × 4를 분수의 곱셈으로 바꿔 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"qWas": "① 0.9 × 3을 분수의 곱셈으로 바꿔 계산하는 과정을 말해 봐.",
"ansWas": {
"a": "소수를 분모가 10, 100인 분수로 바꾸고 분자에 자연수를 곱한 다음, 다시 소수로 나타내. 예) 0.9×3=9/10×3=27/10=2.7",
"k": [
"소수를 분수로 바꾼다",
"분자에 곱하고 다시 소수로"
]
}
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
"answerBy": "claude",
"newQ": "② 0.9 × 3을 0.1이 몇 개인지로 생각해서 계산해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|01. (소수)×(자연수) (1):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|01. (소수)×(자연수) (1):2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|01. (소수)×(자연수) (1):3",
"kind": "ladder"
},
{
"id": "43tvot:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자연수처럼 오른쪽 끝을 맞춰 쓰고 139 × 2 = 278을 계산해. 1.39가 소수 두 자리니까 소수점을 찍으면 2.78이야.",
"keys": [
"오른쪽 끝을 맞춰 자연수처럼 곱한다",
"소수점을 그대로 내려 찍는다",
"2.78"
],
"answerBy": "claude",
"newQ": "① 1.39 × 2를 세로셈으로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "자연수의 곱셈처럼 오른쪽 끝을 맞춰 써.",
"k": [
"오른쪽 끝을 맞춘다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "43tvot:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "2.36은 0.01이 236개야. 236 × 3 = 708이니까 0.01이 708개라서 7.08이야.",
"keys": [
"2.36은 0.01이 236개",
"0.01이 708개 = 7.08"
],
"answerBy": "claude",
"newQ": "① 2.36 × 3을 0.01이 몇 개인지로 생각해서 설명해 봐.",
"newQBy": "claude",
"qWas": "① 1.39 × 2를 0.01이 몇 개인지로 생각해서 왜 2.78인지 설명해 봐.",
"ansWas": {
"a": "1.39는 0.01이 139개야. 139×2=278이니까 0.01이 278개라서 2.78이야. 그래서 자연수처럼 곱한 뒤 소수점 아래 자리 수를 그대로 맞춰 찍어.",
"k": [
"0.01이 몇 개인지로 생각한다",
"소수점 아래 자리 수가 그대로"
]
}
},
{
"id": "43tvot:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "4.17을 약 4로 보면 4 × 2 = 8쯤이야. 계산한 답 8.34는 8에 가까우니까 소수점이 맞아. 83.4나 0.834면 틀린 거야.",
"keys": [
"4.17 ≒ 4, 답은 약 8",
"8.34가 맞다"
],
"answerBy": "claude",
"newQ": "② 4.17 × 2를 어림해서 답이 맞는지 확인하는 방법을 말해 봐.",
"newQBy": "claude",
"qWas": "② 1.39 × 2를 어림해서 답이 맞는지 확인하는 방법을 말해 봐.",
"ansWas": {
"a": "1.39를 약 1.4로 보면 1.4×2는 약 3이야. 2.78은 3에 가까우니까 소수점이 맞게 찍힌 거야. 27.8이나 0.278이면 틀린 거지.",
"k": [
"어림한 값과 비교한다",
"값의 크기가 비슷한지 본다"
]
}
},
{
"id": "43tvot:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "곱셈은 소수점끼리 맞출 필요가 없어. 자연수처럼 오른쪽 끝을 맞춰 325 × 6 = 1950을 계산하고, 소수 두 자리니까 19.50, 즉 19.5야.",
"keys": [
"오른쪽 끝을 맞춰 쓴다",
"소수점은 곱한 뒤에 찍는다"
],
"answerBy": "claude",
"newQ": "친구가 3.25 × 6을 세로셈으로 쓸 때 소수점끼리 맞춰 써야 한다고 했어. 뭐가 잘못됐을까?",
"newQBy": "claude",
"qWas": "친구가 1.39 × 2를 세로셈으로 쓸 때 소수점끼리 맞춰 써야 한다고 했어. 뭐가 잘못됐을까?",
"ansWas": {
"a": "곱셈은 덧셈처럼 소수점끼리 맞출 필요가 없어. 자연수의 곱셈처럼 오른쪽 끝을 맞춰 쓰고 계산한 다음 소수점을 찍으면 돼.",
"k": [
"곱셈은 오른쪽 끝을 맞춘다",
"계산한 뒤 소수점을 찍는다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "소수 세 자리 수에 자연수를 곱하는 식을 네가 만들고, 소수점을 어디에 찍는지 말해 봐.",
"newQBy": "claude"
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
"id": "ladder:e5-2|4. 소수의 곱셈|02. (소수)×(자연수) (2):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|02. (소수)×(자연수) (2):2",
"kind": "ladder"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "① 3 × 0.9를 분수의 곱셈으로 바꿔 계산하는 과정을 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 3 × 0.9가 3보다 작은 이유를 말해 봐.",
"newQBy": "claude"
},
{
"id": "6o59ch:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.8은 8이 아니라 8/10이야. 5 × 8 = 40을 10으로 나눠서 4가 맞아. 40은 5보다 훨씬 커서 말이 안 돼.",
"keys": [
"0.8은 8/10",
"답은 4"
],
"answerBy": "claude",
"newQ": "친구가 5 × 0.8은 소수점을 무시하고 5 × 8 = 40이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"qWas": "친구가 3 × 0.9는 소수점을 무시하고 3 × 9 = 27이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"ansWas": {
"a": "0.9는 9가 아니라 9/10이야. 3×9=27을 10으로 나눠서 2.7이 맞아. 27은 3보다 훨씬 커서 말이 안 돼.",
"k": [
"0.9=9/10",
"2.7"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|03. (자연수)×(소수) (1):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|03. (자연수)×(소수) (1):2",
"kind": "ladder"
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
"answer": "1.39는 139의 1/100이니까 2 × 1.39도 278의 1/100이야. 그래서 2.78이야.",
"keys": [
"1.39는 139의 1/100",
"278의 1/100 = 2.78"
],
"answerBy": "claude",
"newQ": "② 2 × 139 = 278을 이용해서 2 × 1.39를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "1.39는 139의 1/100이니까 2×139=278의 1/100인 2.78이야.",
"k": [
"139의 1/100",
"2.78"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cjber7:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "곱셈은 두 수의 순서를 바꾸어 곱해도 결과가 같아. 3 × 2.4와 2.4 × 3은 둘 다 7.2야.",
"keys": [
"둘 다 7.2",
"순서를 바꿔도 곱은 같다"
],
"answerBy": "claude",
"newQ": "② 3 × 2.4와 2.4 × 3의 계산 결과를 비교해 봐.",
"newQBy": "claude",
"qWas": "② 2 × 1.39와 1.39 × 2의 계산 결과를 비교해 봐.",
"ansWas": {
"a": "곱셈은 두 수의 순서를 바꾸어 곱해도 결과가 같아. 2×1.39와 1.39×2는 둘 다 2.78이야.",
"k": [
"순서를 바꿔도 같다",
"2.78"
]
}
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
"answerBy": "claude",
"newQ": "친구가 2 × 139 = 278을 구한 뒤 2 × 1.39를 27.8이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "자연수에 소수를 곱하면 항상 원래 수보다 작아져? 예를 들어 설명해 봐.",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|04. (자연수)×(소수) (2):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|04. (자연수)×(소수) (2):2",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "② 소수끼리 곱하면 답의 소수점 아래 자리 수는 어떻게 정해져?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "① 0.4 × 0.6을 분수의 곱셈으로 바꿔 계산하는 과정을 말해 봐.",
"newQBy": "claude"
},
{
"id": "yc1vsn:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "0.4 = 4/10, 0.6 = 6/10이라 곱하면 분모가 10 × 10 = 100이 돼. 24/100이니까 소수 두 자리인 0.24야.",
"keys": [
"분모 10 × 10 = 100",
"24/100 = 0.24"
],
"answerBy": "claude",
"newQ": "② 0.4 × 0.6의 답이 왜 소수 두 자리인지 분수로 생각해서 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "소수를 분수로 바꾸면 분모가 10, 100이 되고, 분모끼리 곱하면 10×10=100처럼 0의 개수가 더해져. 분모의 0의 개수가 소수점 아래 자리 수라서 두 자리 수를 더한 것이 돼.",
"k": [
"분모 10, 100으로 바꾼다",
"분모의 0의 개수가 더해진다"
]
}
},
{
"id": "yc1vsn:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.3과 0.7은 각각 소수 한 자리라서 곱은 소수 두 자리가 돼야 해. 0.21이 맞아.",
"keys": [
"소수 한 자리 × 소수 한 자리 = 소수 두 자리",
"0.21"
],
"answerBy": "claude",
"newQ": "친구가 0.3 × 0.7을 3 × 7 = 21을 구한 뒤 2.1이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"qWas": "친구가 0.4 × 0.6을 4 × 6 = 24를 구한 뒤 2.4라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"ansWas": {
"a": "0.4와 0.6은 각각 소수점 아래 한 자리라서 곱은 두 자리가 돼야 해. 0.24가 맞아.",
"k": [
"자리 수를 더해 두 자리",
"0.24"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|05. (소수)×(소수) (1):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|05. (소수)×(소수) (1):2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|05. (소수)×(소수) (1):3",
"kind": "ladder"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answer": "소수점을 생각하지 않고 12 × 34 = 408을 계산해. 소수점 아래 자리 수가 1+2=3이니까 0.408이야.",
"keys": [
"자연수처럼 12 × 34 = 408",
"소수점 아래 1+2=3자리",
"0.408"
],
"answerBy": "claude",
"newQ": "① 1.2 × 0.34를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "소수점을 생각하지 않고 자연수처럼 곱한 다음, 두 소수의 소수점 아래 자리 수를 더한 만큼 오른쪽에서부터 세어 소수점을 찍어. 예) 1.2×0.34: 12×34=408 → 1+2=3자리 → 0.408",
"k": [
"자연수처럼 곱한다",
"자리 수를 더한 만큼 소수점을 찍는다"
]
}
},
{
"id": "zkxrl3:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "1.2는 약 1, 0.34는 약 0.3이니까 답은 약 0.3이야. 그래서 4.08이 아니라 0.408이야.",
"keys": [
"1.2 × 0.34 ≒ 1 × 0.3 = 0.3",
"0.408"
],
"answerBy": "claude",
"newQ": "② 1.2 × 0.34의 답이 0.408인지 4.08인지 어림으로 어떻게 알아?",
"newQBy": "claude",
"ansWas": {
"a": "곱하는 수를 어림해서 대략 얼마인지 먼저 생각해. 1.2×0.34는 약 1×0.3=0.3이니까 0.408이 맞고, 4.08이나 40.8이면 소수점이 틀린 거야.",
"k": [
"어림한 값을 먼저 구한다",
"크기가 비슷한지 비교한다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "소수점 아래 자리 수가 서로 다른 두 소수를 곱하는 식을 네가 만들고, 답이 소수 몇 자리가 되는지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|06. (소수)×(소수) (2):1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|06. (소수)×(소수) (2):2",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 소수에 10, 100, 1000을 곱하면 소수점이 어떻게 움직여?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 자연수에 0.1, 0.01, 0.001을 곱하면 소수점이 어떻게 움직여?",
"newQBy": "claude"
},
{
"id": "2onq6p:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "10을 곱하면 각 숫자의 자리값이 10배가 돼. 3은 30, 0.2는 2, 0.05는 0.5가 되니까 32.5야. 소수점이 오른쪽으로 한 칸 옮겨진 것과 같아.",
"keys": [
"각 자리값이 10배",
"소수점이 오른쪽으로 한 칸"
],
"answerBy": "claude",
"newQ": "① 3.25 × 10이 왜 32.5가 되는지 자리값으로 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "10을 곱하면 각 숫자가 한 자리씩 커져서 소수점이 오른쪽으로 한 칸 옮겨진 것처럼 돼. 100은 10을 두 번 곱한 것이라 두 칸이야.",
"k": [
"10을 곱하면 자리가 하나씩 커진다",
"0의 개수만큼 옮겨진다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 0.47 × 1000을 소수점을 오른쪽으로 세 칸 옮겨서 47이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "6.2 × 0.01은 얼마야? 소수점이 어느 쪽으로 몇 칸 움직이는지도 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"id": "ladder:e5-2|4. 소수의 곱셈|07. 곱의 소수점의 위치:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|07. 곱의 소수점의 위치:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|4. 소수의 곱셈|07. 곱의 소수점의 위치:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 직육면체가 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 정육면체가 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "③ 직육면체에서 면, 모서리, 꼭짓점은 각각 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 정육면체는 직육면체라고 할 수 있어. 그런데 직육면체는 왜 정육면체라고 할 수 없어?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "직육면체의 면, 모서리, 꼭짓점은 각각 몇 개야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "우리 주변에서 직육면체 모양인 물건을 하나 찾아 말하고, 정육면체인지 아닌지도 말해 봐.",
"newQBy": "claude"
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
"id": "ladder:e5-2|5. 직육면체|01. 직(정)사각형 6개로 둘러싸인 도형:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|01. 직(정)사각형 6개로 둘러싸인 도형:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|01. 직(정)사각형 6개로 둘러싸인 도형:3",
"kind": "ladder"
},
{
"id": "1dsdr7k:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "직육면체에서 서로 마주 보는 두 면은 평행해. 이렇게 평행한 두 면을 밑면이라고 해.",
"keys": [
"마주 보는 두 면은 평행",
"평행한 두 면이 밑면"
],
"answerBy": "claude",
"newQ": "① 직육면체에서 밑면이 뭐야?",
"newQBy": "claude",
"ansWas": {
"a": "서로 마주 보는 면은 평행해. 이렇게 평행한 두 면을 직육면체의 밑면이라고 해.",
"k": [
"마주 보는 면은 평행",
"밑면"
]
}
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
"answerBy": "claude",
"newQ": "② 직육면체에서 밑면과 옆면은 어떻게 만나?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "① 직육면체에서 서로 평행한 면은 몇 쌍이야? 어떻게 짝지어지는지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 직육면체에서 한 면을 밑면으로 정하면 옆면은 왜 4개야?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "친구가 직육면체에서 서로 만나는 두 면도 평행하다고 했어. 뭐가 잘못됐을까?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|5. 직육면체|02. 직육면체의 성질:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|02. 직육면체의 성질:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|02. 직육면체의 성질:3",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 겨냥도에서 보이는 모서리와 보이지 않는 모서리는 각각 어떻게 그려?",
"newQBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1u6qpfn:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "보이는 모서리는 9개, 보이지 않는 모서리는 3개, 보이지 않는 꼭짓점은 1개야.",
"keys": [
"보이는 모서리 9개",
"보이지 않는 모서리 3개",
"보이지 않는 꼭짓점 1개"
],
"answerBy": "claude",
"newQ": "직육면체의 겨냥도에서 보이는 모서리, 보이지 않는 모서리, 보이지 않는 꼭짓점은 각각 몇 개야?",
"newQBy": "claude",
"ansWas": {
"a": "보이는 모서리는 9개야. 보이지 않는 모서리는 3개야.",
"k": [
"9개"
]
}
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
"answerBy": "claude",
"newQ": "겨냥도와 전개도는 어떻게 달라?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "직육면체 모양 상자를 앞에서 비스듬히 보고 그릴 때, 점선으로 그려야 할 모서리는 어디야?",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|5. 직육면체|03. 직육면체의 겨냥도:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|03. 직육면체의 겨냥도:2",
"kind": "ladder"
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
"answerBy": "claude",
"newQ": "① 전개도가 뭐야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "② 전개도에서 잘린 모서리와 잘리지 않은 모서리는 각각 어떻게 그려?",
"newQBy": "claude"
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
"answer": "한 줄로 이어진 면에서 하나 건너뛴 면이 접으면 마주 보니까 평행한 면이야. 모서리를 함께 쓰는 이웃한 면은 접으면 만나니까 수직인 면이야.",
"keys": [
"한 줄에서 하나 건너뛴 면 → 평행",
"이웃한 면 → 수직"
],
"answerBy": "claude",
"newQ": "② 정육면체의 전개도를 접었을 때 서로 평행한 면과 수직인 면은 어떻게 찾아?",
"newQBy": "claude",
"ansWas": {
"a": "접었을 때 만나는 선분끼리는 길이가 같아. 서로 마주 보게 되는 면끼리는 평행하고, 이웃한 면끼리는 수직이 돼.",
"k": [
"만나는 선분은 길이가 같다",
"마주 보는 면은 평행, 이웃한 면은 수직"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "정사각형 6개를 이어 붙이면 모두 정육면체의 전개도가 돼? 안 되는 예도 말해 봐.",
"newQBy": "claude"
},
{
"id": "kxb2zb:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "마주 보는 면끼리 합동이라 3쌍이야.",
"keys": [
"마주 보는 면끼리 합동",
"3쌍"
],
"answerBy": "claude",
"newQ": "직육면체의 전개도에서 서로 합동인 면은 몇 쌍이야?",
"newQBy": "claude",
"ansWas": {
"a": "마주 보는 면 3쌍이 합동이야.",
"k": [
"3쌍"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|5. 직육면체|04. 정(직)육면체의 전개도:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|04. 정(직)육면체의 전개도:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|5. 직육면체|04. 정(직)육면체의 전개도:3",
"kind": "ladder"
},
{
"id": "v61qpj:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자료의 값을 모두 더해 자료의 수로 나눈 값이야. 자료를 고르게 했을 때의 값이야.",
"keys": [
"모두 더해 자료의 수로 나눈 값"
],
"answerBy": "claude",
"newQ": "① 평균이 뭐야?",
"newQBy": "claude",
"ansWas": {
"a": "자료의 값을 모두 더한 다음 자료의 수로 나눠.",
"k": [
"모두 더한다",
"자료의 수로 나눈다"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"newQ": "2, 4, 6, 8의 평균을 구하는 과정을 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "평균이 자료 중 어느 값과도 같지 않은 예를 네가 들어 봐.",
"newQBy": "claude"
},
{
"id": "v61qpj:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "7에서 2를 3으로 옮기면 5, 5, 5가 돼. 이 값 5가 (3+5+7)÷3=5와 같아서, 고르게 만든 값이 평균이야.",
"keys": [
"똑같이 만들면 5",
"고르게 만든 값 = 평균"
],
"answerBy": "claude",
"newQ": "3, 5, 7에서 많은 쪽을 적은 쪽으로 옮겨서 셋을 똑같이 만들면 얼마가 돼? 그 값이 평균과 어떤 관계인지 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "많은 것에서 적은 것으로 옮겨서 모두 똑같이 만들면 그 값이 평균이야. 모두 더해 똑같이 나누는 것과 같으니까 고르게 나눈 값이라고 해.",
"k": [
"많은 곳에서 적은 곳으로 옮긴다",
"똑같이 나누는 것과 같다"
]
}
},
{
"id": "ladder:e5-2|6. 평균과 가능성|01. 평균 알아보기:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|01. 평균 알아보기:2",
"kind": "ladder"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kwi8f7:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "네 번 평균이 85점이면 합이 85×4=340점이야. 세 번의 합은 240점이니까 340-240=100점을 받아야 해.",
"keys": [
"필요한 합 = 85×4 = 340",
"340-240 = 100점"
],
"answerBy": "claude",
"newQ": "② 수학 시험 세 번의 점수가 80점, 70점, 90점이야. 네 번의 평균이 85점이 되려면 네 번째에 몇 점을 받아야 해? 어떻게 구했는지 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "(평균)×(자료의 수)=(합)이라서, 목표 평균을 알면 필요한 합을 구하고 지금까지의 합을 빼서 남은 값을 구할 수 있어. 예) 4번 평균 80점이 목표이고 3번 합이 230점이면 마지막에 320-230=90점이 필요해.",
"k": [
"(평균)×(자료의 수)=(합)",
"필요한 합에서 지금까지의 합을 뺀다"
]
}
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
"answerBy": "claude",
"newQ": "어느 모둠 5명의 점수 합이 400점이야. 이 모둠의 평균은 몇 점이야?",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "A 모둠은 4명이 합 320점, B 모둠은 5명이 합 375점이야. 친구가 합이 큰 B 모둠이 더 잘했다고 했어. 뭐가 잘못됐는지 찾고, 어느 모둠이 더 잘했는지 말해 봐.",
"newQBy": "claude"
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
"answerBy": "claude",
"newQ": "평균이 같은 두 모둠은 점수도 모두 같아? 예를 들어 설명해 봐.",
"newQBy": "claude"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|02. 평균 이용하기:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|02. 평균 이용하기:2",
"kind": "ladder"
},
{
"id": "1sv592k:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "불가능하다는 0, 반반이다는 1/2, 확실하다는 1이야.",
"keys": [
"불가능하다 0",
"반반이다 1/2",
"확실하다 1"
],
"answerBy": "claude",
"newQ": "① 일이 일어날 가능성을 수로 나타내면 '불가능하다', '반반이다', '확실하다'는 각각 얼마야?",
"newQBy": "claude",
"ansWas": {
"a": "0으로 표현해.",
"k": [
"0"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1sv592k:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "3 이하의 눈은 1, 2, 3으로 6개 중 3개야. 반반이고 수로 1/2이야.",
"keys": [
"6개 중 3개",
"반반이다, 1/2"
],
"answerBy": "claude",
"newQ": "주사위를 굴릴 때 3 이하의 눈이 나올 가능성을 말과 수로 나타내 봐.",
"newQBy": "claude",
"ansWas": {
"a": "주사위에서 3 이하의 눈은 1, 2, 3으로 6개 중 3개야. 그래서 가능성은 반반이고 수로 1/2이야.",
"k": [
"1, 2, 3으로 6개 중 3개",
"반반, 1/2"
]
}
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
"answerBy": "claude",
"newQ": "동전을 던졌을 때 그림면이 나올 가능성을 수로 나타내면 얼마야?",
"newQBy": "claude"
},
{
"id": "1sv592k:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "흰 공만 든 상자에서 공을 꺼낼 때 흰 공이 나올 가능성은 1이야. 그 상자에서 검은 공이 나올 가능성은 0이야.",
"keys": [
"가능성 1: 반드시 일어나는 일",
"가능성 0: 절대 일어나지 않는 일"
],
"answerBy": "claude",
"newQ": "가능성이 1인 일과 0인 일을 하나씩 예로 들어 봐.",
"newQBy": "claude",
"ansWas": {
"a": "예를 들어 흰 공만 들어 있는 상자에서 공을 꺼내면 흰 공이 나올 가능성은 1이야.",
"k": [
"반드시 일어나는 상황"
]
}
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
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|03. 일이 일어날 가능성을 비교하고 수로 표현하기:1",
"kind": "ladder"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|03. 일이 일어날 가능성을 비교하고 수로 표현하기:2",
"kind": "ladder"
},
{
"id": "ladder:e5-2|6. 평균과 가능성|03. 일이 일어날 가능성을 비교하고 수로 표현하기:3",
"kind": "ladder"
},
{
"id": "ladder:qamu9e52ghnu3fd",
"big": "1. 수의 범위와 어림하기",
"small": "03. 수의 범위 활용하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "편지 요금이 25 g 이하는 350원, 25 g 초과 50 g 이하는 400원이야. 무게가 25 g인 편지를 보내려면 얼마를 내야 해? 왜 그런지 말해 봐.",
"answer": "25 g은 '25 g 이하'에 들어가니까 350원이야. '25 g 초과'에는 25 g이 들어가지 않아.",
"keys": [
"25 g은 25 g 이하에 들어간다",
"350원"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e524ml4ez2",
"big": "1. 수의 범위와 어림하기",
"small": "03. 수의 범위 활용하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "15 이상 ㉠ 미만인 자연수가 5개야. ㉠은 얼마야? 어떻게 구했는지 말해 봐.",
"answer": "15 이상이니까 15, 16, 17, 18, 19가 5개야. 미만은 그 수가 안 들어가니까 ㉠은 20이야.",
"keys": [
"15부터 5개: 15~19",
"미만이라 ㉠은 20"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52n9qjvaw",
"big": "1. 수의 범위와 어림하기",
"small": "04. 올림",
"kind": "add",
"round": 1,
"by": "claude",
"q": "3.214를 올림하여 소수 첫째 자리까지 나타내면 얼마야?",
"answer": "소수 첫째 자리 아래 0.014를 올려서 3.3이야.",
"keys": [
"3.3"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e5277rm8y0",
"big": "1. 수의 범위와 어림하기",
"small": "06. 반올림",
"kind": "add",
"round": 1,
"by": "claude",
"q": "4.36을 반올림하여 소수 첫째 자리까지 나타내면 얼마야?",
"answer": "소수 둘째 자리 숫자가 6이라서 올려. 4.4야.",
"keys": [
"소수 둘째 자리 숫자 6을 본다",
"4.4"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52eeawo6e",
"big": "1. 수의 범위와 어림하기",
"small": "06. 반올림",
"kind": "add",
"round": 2,
"by": "claude",
"q": "반올림하여 십의 자리까지 나타내면 50이 되는 자연수는 어떤 수들이야? 이상과 미만으로 말해 봐.",
"answer": "45부터 54까지야. 45 이상 55 미만인 자연수야.",
"keys": [
"45부터 54까지",
"45 이상 55 미만"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e526v8skki",
"big": "1. 수의 범위와 어림하기",
"small": "07. 올림·버림·반올림 활용하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "3760원짜리 물건을 1000원짜리 지폐로만 사려면 최소 몇 장을 내야 해? 어떤 어림 방법을 썼는지도 말해 봐.",
"answer": "3000원으로는 모자라니까 올림해서 4000원, 1000원짜리 4장을 내야 해.",
"keys": [
"모자라면 안 되니까 올림",
"4장"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e5260ciewu",
"big": "2. 분수의 곱셈",
"small": "01. (분수)×(자연수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 명이 피자를 3/8판씩 먹었어. 4명이 먹은 피자는 모두 몇 판이야? 식과 답을 말해 봐.",
"answer": "3/8 × 4 = 12/8 = 3/2 = 1과 1/2이야. 모두 1과 1/2판이야.",
"keys": [
"3/8 × 4",
"1과 1/2판"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:qamu9e529pwwkhy",
"big": "2. 분수의 곱셈",
"small": "02. (자연수)×(분수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "색 테이프 12 m 중에서 3/4을 사용했어. 사용한 색 테이프는 몇 m야? 식과 답을 말해 봐.",
"answer": "12의 3/4만큼이니까 12 × 3/4 = 36/4 = 9야. 9 m를 사용했어.",
"keys": [
"12 × 3/4",
"9 m"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:qamu9e52hi33bog",
"big": "2. 분수의 곱셈",
"small": "03. 진분수의 곱셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "우리 반 학생의 3/5이 여학생이고, 여학생의 1/2이 안경을 썼어. 안경을 쓴 여학생은 우리 반 전체의 얼마야? 식과 답을 말해 봐.",
"answer": "3/5의 1/2만큼이니까 3/5 × 1/2 = 3/10이야.",
"keys": [
"3/5 × 1/2",
"3/10"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:qamu9e52tj7i4vf",
"big": "2. 분수의 곱셈",
"small": "04. 여러 가지 분수의 곱셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "1/2 × 2/3 × 3/4을 계산하는 과정을 말해 봐.",
"answer": "분자끼리, 분모끼리 곱하면 6/24인데, 먼저 약분하면 더 쉬워. 2와 2, 3과 3을 약분하면 1/1 × 1/1 × 1/4이라 1/4이야.",
"keys": [
"세 분수의 분자끼리, 분모끼리 곱한다",
"1/4"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52cvs8aiw",
"big": "2. 분수의 곱셈",
"small": "04. 여러 가지 분수의 곱셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 변이 2와 1/2 m인 정사각형 모양 밭의 넓이는 몇 m²야? 식과 답을 말해 봐.",
"answer": "2와 1/2 × 2와 1/2 = 5/2 × 5/2 = 25/4 = 6과 1/4이야. 넓이는 6과 1/4 m²야.",
"keys": [
"5/2 × 5/2",
"6과 1/4 m²"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ladder:qamu9e52x3wjd1m",
"big": "3. 합동과 대칭",
"small": "02. 합동인 도형의 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "합동인 두 삼각형이 있어. 한 삼각형의 세 변이 5 cm, 6 cm, 7 cm이면 다른 삼각형의 둘레는 몇 cm야? 왜 그런지 말해 봐.",
"answer": "합동이면 대응변의 길이가 같아서 다른 삼각형의 세 변도 5 cm, 6 cm, 7 cm야. 둘레는 5+6+7=18(cm)야.",
"keys": [
"대응변의 길이가 같다",
"18 cm"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52i0xwv9z",
"big": "3. 합동과 대칭",
"small": "03. 선대칭도형과 그 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "선대칭도형에서 대응점끼리 이은 선분의 길이가 10 cm야. 한 점에서 대칭축까지의 거리는 몇 cm야? 왜 그런지 말해 봐.",
"answer": "대칭축이 대응점끼리 이은 선분을 똑같이 둘로 나누니까 10÷2=5(cm)야.",
"keys": [
"대칭축이 선분을 똑같이 둘로 나눈다",
"5 cm"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52c33maxt",
"big": "3. 합동과 대칭",
"small": "04. 점대칭도형과 그 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "점대칭도형에서 대응점 ㄱ과 ㄷ을 이은 선분의 길이가 12 cm야. 대칭의 중심에서 점 ㄱ까지는 몇 cm야? 왜 그런지 말해 봐.",
"answer": "대칭의 중심이 대응점끼리 이은 선분을 똑같이 둘로 나누니까 12÷2=6(cm)야.",
"keys": [
"중심이 선분을 똑같이 둘로 나눈다",
"6 cm"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e523ci3lxp",
"big": "3. 합동과 대칭",
"small": "04. 점대칭도형과 그 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "선대칭도형이면서 점대칭도형인 도형을 하나 말하고, 왜 그런지 말해 봐.",
"answer": "직사각형이야. 가로·세로 가운데를 지나는 직선으로 접으면 겹치고, 두 대각선이 만나는 점을 중심으로 180° 돌려도 겹쳐.",
"keys": [
"예: 직사각형(정사각형, 원)",
"접어도 겹치고 180° 돌려도 겹친다"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52ai9gjog",
"big": "4. 소수의 곱셈",
"small": "01. (소수)×(자연수) (1)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "우유를 하루에 0.3 L씩 마셔. 일주일 동안 마신 우유는 몇 L야? 식과 답을 말해 봐.",
"answer": "일주일은 7일이니까 0.3 × 7 = 2.1이야. 2.1 L를 마셨어.",
"keys": [
"0.3 × 7",
"2.1 L"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52p7gxsoi",
"big": "4. 소수의 곱셈",
"small": "02. (소수)×(자연수) (2)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 봉지에 1.25 kg인 밀가루 4봉지는 모두 몇 kg이야? 식과 답을 말해 봐.",
"answer": "1.25 × 4 = 5.00이니까 5 kg이야. 소수점 아래 끝자리 0은 지워도 돼.",
"keys": [
"1.25 × 4",
"5 kg"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52tsrk0hl",
"big": "4. 소수의 곱셈",
"small": "03. (자연수)×(소수) (1)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "1 m에 800원인 끈을 0.6 m 샀어. 얼마를 내야 해? 식과 답을 말해 봐.",
"answer": "800 × 0.6 = 480이야. 480원을 내야 해.",
"keys": [
"800 × 0.6",
"480원"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e523z23q11",
"big": "4. 소수의 곱셈",
"small": "04. (자연수)×(소수) (2)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "집에서 학교까지는 800 m이고, 집에서 도서관까지는 그 1.2배야. 집에서 도서관까지는 몇 m야? 식과 답을 말해 봐.",
"answer": "800 × 1.2 = 960이야. 960 m야.",
"keys": [
"800 × 1.2",
"960 m"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52nwby3dc",
"big": "4. 소수의 곱셈",
"small": "05. (소수)×(소수) (1)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "가로 0.8 m, 세로 0.5 m인 직사각형 액자의 넓이는 몇 m²야? 식과 답을 말해 봐.",
"answer": "0.8 × 0.5 = 0.40이니까 0.4 m²야.",
"keys": [
"0.8 × 0.5",
"0.4 m²"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52dex2epi",
"big": "4. 소수의 곱셈",
"small": "06. (소수)×(소수) (2)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "1 m의 무게가 2.4 kg인 철근이 있어. 이 철근 1.5 m의 무게는 몇 kg이야? 식과 답을 말해 봐.",
"answer": "2.4 × 1.5 = 3.60이니까 3.6 kg이야.",
"keys": [
"2.4 × 1.5",
"3.6 kg"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52kvmvy0s",
"big": "4. 소수의 곱셈",
"small": "07. 곱의 소수점의 위치",
"kind": "add",
"round": 2,
"by": "claude",
"q": "32 × 14 = 448이야. 이것을 이용해서 3.2 × 1.4는 얼마인지 구하고, 소수점을 어떻게 찍었는지 말해 봐.",
"answer": "3.2와 1.4는 각각 소수 한 자리니까 답은 소수 두 자리야. 448에 소수점을 찍으면 4.48이야.",
"keys": [
"소수점 아래 1+1=2자리",
"4.48"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52dng4rsq",
"big": "5. 직육면체",
"small": "01. 직(정)사각형 6개로 둘러싸인 도형",
"kind": "add",
"round": 2,
"by": "claude",
"q": "가로 5 cm, 세로 3 cm, 높이 4 cm인 직육면체의 모든 모서리 길이의 합은 몇 cm야? 어떻게 구했는지 말해 봐.",
"answer": "길이가 같은 모서리가 4개씩 있어. (5+3+4) × 4 = 48(cm)야.",
"keys": [
"같은 길이 모서리가 4개씩",
"(5+3+4) × 4 = 48 cm"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e528mittd9",
"big": "5. 직육면체",
"small": "02. 직육면체의 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "주사위에서 서로 평행한 두 면의 눈의 수를 더하면 7이야. 1의 눈과 평행한 면의 눈은 몇이야? 1의 눈과 수직인 면의 눈도 모두 말해 봐.",
"answer": "1과 평행한 면은 7-1=6의 눈이야. 수직인 면은 평행한 면을 뺀 나머지 2, 3, 4, 5의 눈이야.",
"keys": [
"평행한 면: 6",
"수직인 면: 2, 3, 4, 5"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52o5iw20i",
"big": "6. 평균과 가능성",
"small": "02. 평균 이용하기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "평균이 80점인 모둠 4명의 점수를 모두 더하면 몇 점이야?",
"answer": "(평균)×(자료의 수)=(합)이니까 80×4=320점이야.",
"keys": [
"평균 × 사람 수 = 합",
"320점"
],
"answerBy": "claude"
},
{
"id": "ladder:qamu9e52pjheu8r",
"big": "6. 평균과 가능성",
"small": "03. 일이 일어날 가능성을 비교하고 수로 표현하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "빨간 공 2개, 파란 공 2개가 든 상자에서 공 하나를 꺼낼 때 빨간 공이 나올 가능성을 수로 말해 봐. 빨간 공만 4개 들어 있으면 어떻게 돼?",
"answer": "빨간 공이 4개 중 2개라 반반, 1/2이야. 빨간 공만 4개면 반드시 빨간 공이 나오니까 1이야.",
"keys": [
"2개 중 반반 → 1/2",
"빨간 공만 있으면 1"
],
"answerBy": "claude"
},
{
"id": "11m6g9r:qamu9e52b0cibs5",
"big": "2. 분수의 곱셈",
"small": "01. (분수)×(자연수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 명이 피자를 3/8판씩 먹었어. 3명이 먹은 피자는 모두 몇 판이야? 식과 답을 말해 봐.",
"answer": "3/8 × 3 = 9/8 = 1과 1/8이야. 모두 1과 1/8판이야.",
"keys": [
"3/8 × 3",
"1과 1/8판"
],
"answerBy": "claude"
},
{
"id": "1h3g8qe:qamu9e52bzx7vdq",
"big": "2. 분수의 곱셈",
"small": "02. (자연수)×(분수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "색 테이프 15 m 중에서 2/5를 사용했어. 사용한 색 테이프는 몇 m야? 식과 답을 말해 봐.",
"answer": "15의 2/5만큼이니까 15 × 2/5 = 30/5 = 6이야. 6 m를 사용했어.",
"keys": [
"15 × 2/5",
"6 m"
],
"answerBy": "claude"
},
{
"id": "fjim33:qamu9e52bzutkzk",
"big": "2. 분수의 곱셈",
"small": "03. 진분수의 곱셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "우리 반 학생의 3/5이 여학생이고, 여학생의 1/4이 안경을 썼어. 안경을 쓴 여학생은 우리 반 전체의 얼마야? 식과 답을 말해 봐.",
"answer": "3/5의 1/4만큼이니까 3/5 × 1/4 = 3/20이야.",
"keys": [
"3/5 × 1/4",
"3/20"
],
"answerBy": "claude"
},
{
"id": "1rbp9gq:qamu9e52be2mvvk",
"big": "2. 분수의 곱셈",
"small": "04. 여러 가지 분수의 곱셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 변이 1과 2/5 m인 정사각형 모양 밭의 넓이는 몇 m²야? 식과 답을 말해 봐.",
"answer": "1과 2/5 × 1과 2/5 = 7/5 × 7/5 = 49/25 = 1과 24/25야. 넓이는 1과 24/25 m²야.",
"keys": [
"7/5 × 7/5",
"1과 24/25 m²"
],
"answerBy": "claude"
}
],
"seen": []
}});
