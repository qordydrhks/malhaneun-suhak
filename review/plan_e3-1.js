/* 질문 고르기 — 기본으로 실어 두는 분류안 (초3-1)
   Claude 분류(2026-09-29): 기준표_초등_질문.md 1~19절 그대로. 1단원 01~05 는 마스터 9/16 고친 문장·뺀 것 반영. 원천 작업도구/질문계단/e3/spec_e31.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e3-1_2026-09-29a', data:{
"format": "qr-plan-2",
"grade": "e3-1",
"rounds": 3,
"items": [
{
"id": "a54far:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "받아올림이 없는 세 자리 수를 더하는 방법을 말해봐~",
"answer": "같은 자리끼리 줄을 맞춰 쓰고 일의 자리, 십의 자리, 백의 자리끼리 더해. 123 + 135는 3 + 5 = 8, 2 + 3 = 5, 1 + 1 = 2라서 258이야.",
"keys": [
"같은 자리끼리 더한다",
"일·십·백의 자리"
],
"answerBy": "claude"
},
{
"id": "a54far:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"off": true
},
{
"id": "a54far:t0L3",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "a54far:t1L1",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "313을 몇백몇십쯤으로 어림하면 얼마쯤이야?",
"newQBy": "claude",
"answer": "313은 310에 가까워서 310쯤이야.",
"keys": [
"310쯤"
],
"answerBy": "claude"
},
{
"id": "a54far:t1L2",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "a54far:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "세 자리 수의 덧셈에서 계산할 때 가장 중요한 게 뭐지?",
"answer": "같은 자리 수끼리 줄을 맞춰 쓰고, 같은 자리끼리 더하는 거야.",
"keys": [
"같은 자리끼리 맞춰 쓴다",
"같은 자리끼리 더한다"
],
"answerBy": "claude"
},
{
"id": "a54far:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"off": true
},
{
"id": "a54far:t0H3",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "세 자리 수의 덧셈 계산 순서를 얘기해봐.",
"answer": "일의 자리부터 더하고, 다음에 십의 자리, 마지막에 백의 자리를 더해.",
"keys": [
"일의 자리부터",
"십의 자리, 백의 자리 순서"
],
"answerBy": "claude"
},
{
"id": "a54far:t1H1",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "313 + 336은 대략 얼마쯤일지 어림하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "313은 약 300, 336은 약 300으로 어림하면 300 + 300 = 600쯤이야.",
"keys": [
"몇백으로 어림한다",
"600쯤"
],
"answerBy": "claude"
},
{
"id": "a54far:t1H2",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "어림한 값과 실제로 계산한 값이 비슷하면 무엇을 알 수 있어?",
"newQBy": "claude",
"answer": "계산을 맞게 했다는 걸 알 수 있어. 많이 다르면 계산을 다시 확인해야 해.",
"keys": [
"계산이 맞는지 확인할 수 있다"
],
"answerBy": "claude"
},
{
"id": "a54far:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "a54far:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "받아올림이 없는 덧셈에서는 더하는 순서를 백의 자리부터 하든, 일의 자리부터 하든 상관없어? 그 이유는?",
"answer": "상관없어. 받아올림이 없으면 한 자리에서 더한 값이 다른 자리로 넘어가지 않아서 어느 자리부터 더해도 답이 같아.",
"keys": [
"상관없다",
"다른 자리로 넘어가는 수가 없다"
],
"answerBy": "claude"
},
{
"id": "a54far:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "a54far:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "민수가 124 + 135를 계산하면서 앞에 있는 수의 2와 뒤에 있는 수의 5를 더해버렸대. 어디에서 잘못했는지 말하고 바르게 하는 방법을 알려줘",
"answer": "2는 십의 자리 숫자, 5는 일의 자리 숫자라서 자리가 달라. 같은 자리끼리 더해야 해서 4 + 5 = 9, 2 + 3 = 5, 1 + 1 = 2로 259야.",
"keys": [
"자리가 다른 숫자를 더했다",
"같은 자리끼리 더한다",
"259"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1rf86yz:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "받아올림이 무슨 뜻이야?",
"newQBy": "claude",
"answer": "같은 자리 수끼리 더한 값이 10이거나 10보다 크면, 10을 바로 윗자리의 1로 올려 주는 거야.",
"keys": [
"10이 넘으면",
"윗자리로 1을 올린다"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:t0L3",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "452 + 176에서 일의 자리를 더할 때와 십의 자리를 더할 때의 차이점이 뭐야?",
"answer": "일의 자리는 2 + 6 = 8이라 그대로 쓰고, 십의 자리는 5 + 7 = 12라서 2를 쓰고 1을 백의 자리로 받아올림해. 그래서 628이야.",
"keys": [
"일의 자리는 받아올림이 없다",
"십의 자리는 받아올림이 있다",
"628"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "세 자리 수 덧셈에서 일의 자리에서 더한 값이 13이 되었어. 어떻게 해야 돼?",
"answer": "일의 자리에 3을 쓰고, 10은 십의 자리로 1을 받아올림해서 십의 자리 계산에 같이 더해.",
"keys": [
"일의 자리에 3",
"십의 자리로 1 받아올림"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"off": true
},
{
"id": "1rf86yz:t0H3",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1rf86yz:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 2,
"newQ": "일의 자리에서 6+4=10이 되었어. 일의 자리에는 무엇을 쓰고, 십의 자리에는 얼마를 더할까?",
"answer": "일의 자리에는 0을 쓰고, 십의 자리에 1을 더해.",
"keys": [
"일의 자리에 0",
"십의 자리에 1"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true
},
{
"id": "1rf86yz:qcondition",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1rf86yz:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "245 + 138을 만들면 일의 자리 5 + 8 = 13이라 3을 쓰고 1을 올려. 십의 자리 4 + 3 + 1 = 8, 백의 자리 2 + 1 = 3이라서 383이야.",
"keys": [
"받아올림이 한 번 생기는 식",
"올린 1을 윗자리에 더한다"
],
"answerBy": "claude"
},
{
"id": "1rf86yz:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "02. (세 자리 수)+(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "6 + 8 = 14에서 받아올림한 1을 십의 자리에 더하지 않았어. 바른 답은 244야. 받아올림한 1은 10을 뜻해서 빠뜨리면 10이 작아져.",
"keys": [
"받아올림한 1을 안 더했다",
"244",
"1은 10을 뜻한다"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"off": true
},
{
"id": "1wvzosj:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "259 + 164처럼 일의 자리와 십의 자리에서 모두 받아올림이 생기면 어떻게 계산해?",
"newQBy": "claude",
"answer": "일의 자리 9 + 4 = 13이라 3을 쓰고 1을 올려. 십의 자리 5 + 6 + 1 = 12라 2를 쓰고 1을 올려. 백의 자리 2 + 1 + 1 = 4라서 423이야.",
"keys": [
"일의 자리부터 차례로",
"올린 1을 윗자리에 더한다",
"423"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t1L1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:t1L2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "257 + 148 + 203은 어떻게 계산해?",
"newQBy": "claude",
"answer": "앞의 두 수를 먼저 더하면 257 + 148 = 405이고, 여기에 203을 더하면 608이야.",
"keys": [
"두 수를 먼저 더한다",
"608"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t2L1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:t2L2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "받아올림이 두 번 이상 생기는 덧셈을 계산할 때 일의 자리부터 계산하지 않고 백의 자리부터 계산하면 어떻게 될까?",
"answer": "아래 자리에서 받아올림한 수를 윗자리에 더해야 하는데, 백의 자리부터 계산하면 이미 쓴 답을 다시 고쳐야 해서 틀리기 쉬워.",
"keys": [
"받아올림한 수를 윗자리에 더해야 한다",
"다시 고쳐야 한다"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:t1H1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"off": true
},
{
"id": "1wvzosj:t1H2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "세 수를 더할 때 더하는 순서를 앞의 두 수를 먼저 더할 때랑 뒤의 두 수를 먼저 더할 때랑 어떤 차이가 있어?",
"answer": "답은 똑같아. 덧셈은 어느 두 수를 먼저 더해도 결과가 같아서 계산하기 편한 쪽을 먼저 더하면 돼.",
"keys": [
"답은 같다",
"편한 쪽을 먼저 더해도 된다"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t2H1",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "덧셈으로 계산해야 되는 문제들은 주로 어떤 말이 들어가 있어? 예를 들어서 한두 개만 얘기해봐.",
"answer": "\"모두 몇 개\", \"합하면\", \"더 많이 넣으면\"처럼 두 양을 합치는 말이 들어가 있어.",
"keys": [
"모두",
"합하면"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:t2H2",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "어제 345개, 오늘 217개를 만들었다면 모두 몇 개야? 식과 답을 말해 봐.",
"newQBy": "claude",
"answer": "345 + 217 = 562라서 모두 562개야.",
"keys": [
"345 + 217",
"562개"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "168+175를 세로로 계산하고, 받아올림이 있을 때 받아올림 숫자가 항상 1인 이유가 뭘까?",
"answer": "168 + 175 = 343이야. 한 자리 수 두 개를 더하면 가장 커도 9 + 9 = 18이고, 올린 1을 더해도 19라서 20이 안 돼. 그래서 받아올림은 늘 1이야.",
"keys": [
"343",
"가장 커도 19라서 1만 올라간다"
],
"answerBy": "claude"
},
{
"id": "1wvzosj:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1wvzosj:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "03. (세 자리 수)+(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "하늘이가 168 + 175를 계산하면서 일의 자리 8+5=13은 맞게 받아올림했는데, 십의 자리 6+7+1=14에서 받아올림한 1을 백의 자리에 더하는 걸 빠뜨렸대. 그럼 바르게 계산한 결과와 차이가 얼마나 생길까?",
"answer": "하늘이는 243이 나오고 바른 답은 343이라서 100만큼 차이가 나. 백의 자리로 올린 1은 100을 뜻하기 때문이야.",
"keys": [
"243과 343",
"100만큼 차이"
],
"answerBy": "claude"
},
{
"id": "1iixbgk:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "세 자리 수끼리 뺄 때는 어느 자리부터 계산해?",
"newQBy": "claude",
"answer": "일의 자리부터 같은 자리끼리 빼고, 십의 자리, 백의 자리 순서로 빼.",
"keys": [
"일의 자리부터",
"같은 자리끼리"
],
"answerBy": "claude"
},
{
"id": "1iixbgk:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "358 - 135를 어떻게 계산하는지 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 8 - 5 = 3, 십의 자리 5 - 3 = 2, 백의 자리 3 - 1 = 2라서 223이야.",
"keys": [
"같은 자리끼리 뺀다",
"223"
],
"answerBy": "claude"
},
{
"id": "1iixbgk:t0L3",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1iixbgk:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1iixbgk:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1iixbgk:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1iixbgk:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "358 - 135를 135 - 358로 바꿔서 계산하면 안 되는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "덧셈은 순서를 바꿔도 답이 같지만, 뺄셈은 큰 수에서 작은 수를 빼는 거라서 순서를 바꾸면 답이 달라져.",
"keys": [
"뺄셈은 순서를 바꾸면 답이 달라진다",
"덧셈과 다르다"
],
"answerBy": "claude"
},
{
"id": "1iixbgk:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "687 - 254를 만들면 7 - 4 = 3, 8 - 5 = 3, 6 - 2 = 4라서 433이야. 윗수의 숫자가 모두 아랫수보다 크거나 같아서 받아내림이 없어.",
"keys": [
"받아내림이 없는 식",
"같은 자리끼리 뺀다"
],
"answerBy": "claude"
},
{
"id": "1iixbgk:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "04. (세 자리 수)-(세 자리 수) (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 586 - 32를 계산해서 266이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "32를 백의 자리부터 맞춰 써서 320을 뺀 것처럼 계산했어. 일의 자리끼리 맞춰 쓰면 586 - 32 = 554야.",
"keys": [
"자리를 잘못 맞췄다",
"554"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "xiqt5i:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "받아내림이 무슨 뜻이야?",
"newQBy": "claude",
"answer": "같은 자리끼리 뺄 수 없을 때 바로 윗자리에서 10을 빌려 와서 빼는 거야.",
"keys": [
"뺄 수 없을 때",
"윗자리에서 10을 빌려 온다"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:t0L3",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "같은 자릿수끼리 뺄 수 없을 땐 어떻게 해야 돼?",
"answer": "바로 윗자리에서 10을 받아내려서 빼. 받아내려 준 윗자리 숫자는 1 작아져.",
"keys": [
"윗자리에서 10을 받아내린다",
"윗자리 숫자는 1 작아진다"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "463 - 237을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 3 - 7은 뺄 수 없어서 십의 자리에서 10을 받아내려 13 - 7 = 6. 십의 자리는 5 - 3 = 2, 백의 자리는 4 - 2 = 2라서 226이야.",
"keys": [
"십의 자리에서 받아내린다",
"226"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "받아내림을 하면 빌려준 자리의 수가 왜 1 줄어드는지 말해 줘.",
"newQBy": "claude",
"answer": "윗자리의 1은 아랫자리에서 10과 같아. 그 1을 10으로 바꿔 아랫자리에 주었으니 윗자리는 1 줄어들어.",
"keys": [
"윗자리 1 = 아랫자리 10",
"빌려준 만큼 줄어든다"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:t0H3",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "xiqt5i:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "xiqt5i:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "xiqt5i:qcondition",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "xiqt5i:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "542 - 127을 만들면 일의 자리 2 - 7은 뺄 수 없어서 12 - 7 = 5, 십의 자리 3 - 2 = 1, 백의 자리 5 - 1 = 4라서 415야.",
"keys": [
"받아내림이 한 번 생기는 식",
"윗자리에서 10을 받아내린다"
],
"answerBy": "claude"
},
{
"id": "xiqt5i:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "05. (세 자리 수)-(세 자리 수) (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 352 - 128 = 236이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 2 - 8을 할 수 없는데 8 - 2를 해 버렸어. 십의 자리에서 10을 받아내려 12 - 8 = 4, 4 - 2 = 2, 3 - 1 = 2라서 224야.",
"keys": [
"8 - 2를 했다",
"받아내림을 해야 한다",
"224"
],
"answerBy": "claude"
},
{
"id": "1ponco4:t0L1",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:t0L2",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "534 - 268처럼 일의 자리와 십의 자리에서 모두 받아내려야 하면 어떻게 계산해?",
"newQBy": "claude",
"answer": "일의 자리 4 - 8은 십의 자리에서 받아내려 14 - 8 = 6. 십의 자리는 2가 되어 2 - 6을 할 수 없으니 백의 자리에서 받아내려 12 - 6 = 6. 백의 자리 4 - 2 = 2라서 266이야.",
"keys": [
"일의 자리부터 차례로 받아내린다",
"받아내려 준 자리는 1 작아진다",
"266"
],
"answerBy": "claude"
},
{
"id": "1ponco4:t1L1",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "\"얼마나 더 많아?\", \"얼마나 남았어?\"를 구할 때는 어떤 계산을 해?",
"newQBy": "claude",
"answer": "뺄셈을 해. 두 수의 차이나 남은 양을 구하는 거라서 큰 수에서 작은 수를 빼.",
"keys": [
"뺄셈",
"차이·남은 양"
],
"answerBy": "claude"
},
{
"id": "1ponco4:t1L2",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "뺄셈의 답이 맞는지 덧셈으로 어떻게 확인해?",
"newQBy": "claude",
"answer": "뺄셈의 답에 뺀 수를 더해서 처음 수가 나오면 맞은 거야.",
"keys": [
"답 + 뺀 수",
"처음 수가 나오면 맞다"
],
"answerBy": "claude"
},
{
"id": "1ponco4:t0H1",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:t0H2",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:t1H1",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:t1H2",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "뺄셈의 답에 뺀 수를 다시 더하면 원래 수가 되는 이유를 말해 줘.",
"newQBy": "claude",
"answer": "뺄셈은 처음 수에서 뺀 수를 덜어 낸 거라서, 남은 수에 덜어 낸 만큼 다시 더하면 처음 수로 돌아가.",
"keys": [
"덜어 낸 만큼 다시 더한다",
"처음 수로 돌아간다"
],
"answerBy": "claude"
},
{
"id": "1ponco4:qrecall",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:qreason",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:qexample",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1ponco4:qerror",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 523 - 256 = 277이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "십의 자리가 일의 자리에 10을 받아내려 줘서 1이 되었는데, 원래 숫자 2로 계산했어. 1 - 5를 할 수 없으니 백의 자리에서 받아내려 11 - 5 = 6, 4 - 2 = 2라서 267이야.",
"keys": [
"받아내려 준 자리가 1 작아진 걸 잊었다",
"267"
],
"answerBy": "claude"
},
{
"id": "1ponco4:qa29e3161",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "세 자리 수의 덧셈이나 뺄셈이 나오면 가장 먼저 무엇을 해야 해?",
"answer": "같은 자리끼리 줄을 맞춰 쓰고 일의 자리부터 계산해. 그 자리에서 받아올림이나 받아내림이 필요한지 먼저 봐.",
"keys": [
"같은 자리끼리 맞춰 쓴다",
"일의 자리부터",
"받아올림·받아내림 확인"
],
"answerBy": "claude"
},
{
"id": "1ponco4:qa29e3162",
"big": "1. 덧셈과 뺄셈",
"small": "06. (세 자리 수)-(세 자리 수) (3)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "줄넘기를 민수는 412번, 지우는 275번 했어. 민수는 지우보다 몇 번 더 했어? 식과 답을 말해 봐.",
"answer": "412 - 275 = 137이라서 137번 더 했어. 받아내림이 두 번 생겨.",
"keys": [
"412 - 275",
"137번"
],
"answerBy": "claude"
},
{
"id": "ek452z:t0L1",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ek452z:t0L2",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ek452z:t0L3",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ek452z:t0H1",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "선분, 직선, 반직선은 무엇을 보고 구별해?",
"newQBy": "claude",
"answer": "끝점이 몇 개인지 보고 구별해. 선분은 끝점이 두 개, 반직선은 한 개, 직선은 없어.",
"keys": [
"끝점의 개수",
"선분 2 · 반직선 1 · 직선 0"
],
"answerBy": "claude"
},
{
"id": "ek452z:t0H2",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "반직선 ㄱㄴ과 반직선 ㄴㄱ이 왜 서로 다른지 말해 줘.",
"newQBy": "claude",
"answer": "반직선 ㄱㄴ은 점 ㄱ에서 시작해 ㄴ 쪽으로, 반직선 ㄴㄱ은 점 ㄴ에서 시작해 ㄱ 쪽으로 늘어나. 시작하는 점과 늘어나는 방향이 달라.",
"keys": [
"시작하는 점이 다르다",
"늘어나는 방향이 다르다"
],
"answerBy": "claude"
},
{
"id": "ek452z:t0H3",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ek452z:qrecall",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "선분은 두 점을 곧게 이은 선, 반직선은 한 점에서 한쪽으로 끝없이 늘인 곧은 선, 직선은 양쪽으로 끝없이 늘인 곧은 선이야.",
"keys": [
"선분: 두 점을 곧게 이은 선",
"반직선: 한쪽으로 끝없이",
"직선: 양쪽으로 끝없이"
],
"answerBy": "claude"
},
{
"id": "ek452z:qreason",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "직선은 왜 길이를 잴 수 없어?",
"newQBy": "claude",
"answer": "직선은 양쪽으로 끝없이 늘어나서 끝이 없기 때문이야. 길이는 끝과 끝 사이를 재는 거라서 잴 수 없어.",
"keys": [
"양쪽으로 끝없이 늘어난다",
"끝이 없다"
],
"answerBy": "claude"
},
{
"id": "ek452z:qexample",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "ek452z:qerror",
"big": "2. 평면도형",
"small": "01. 선의 종류",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0L1",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0L2",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0L3",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0L4",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "직각은 어떤 각이야?",
"newQBy": "claude",
"answer": "종이를 반듯하게 두 번 접었다 펼쳤을 때 접힌 선이 만나서 이루는 각이야.",
"keys": [
"반듯하게 두 번 접어 생기는 각"
],
"answerBy": "claude"
},
{
"id": "13mpyi8:t0L5",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0H1",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0H2",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "각 ㄱㄴㄷ에서 꼭짓점은 어느 점이야? 왜 그 점을 가운데에 읽어?",
"newQBy": "claude",
"answer": "꼭짓점은 점 ㄴ이야. 각을 읽을 때는 꼭짓점을 가운데에 넣어 읽기로 약속해서, 가운데 글자를 보면 꼭짓점을 알 수 있어.",
"keys": [
"꼭짓점은 ㄴ",
"꼭짓점을 가운데에 읽는다"
],
"answerBy": "claude"
},
{
"id": "13mpyi8:t0H3",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:t0H4",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13mpyi8:qrecall",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "각은 한 점에서 그은 두 반직선으로 이루어진 도형이야. 그 점이 꼭짓점이고, 두 반직선이 변이야.",
"keys": [
"한 점에서 그은 두 반직선",
"꼭짓점과 변"
],
"answerBy": "claude"
},
{
"id": "13mpyi8:qreason",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "각의 두 변을 더 길게 그리면 각의 크기는 어떻게 돼? 왜 그래?",
"newQBy": "claude",
"answer": "크기는 그대로야. 각의 크기는 두 변이 벌어진 정도로 정해지고 변의 길이와는 상관없어.",
"keys": [
"그대로다",
"두 변이 벌어진 정도"
],
"answerBy": "claude"
},
{
"id": "13mpyi8:qexample",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "교실에서 직각을 찾아 두 가지만 말해 봐.",
"newQBy": "claude",
"answer": "칠판의 모서리, 책상 모서리, 공책의 모서리처럼 반듯하게 꺾인 곳이 직각이야.",
"keys": [
"반듯하게 꺾인 모서리"
],
"answerBy": "claude"
},
{
"id": "13mpyi8:qerror",
"big": "2. 평면도형",
"small": "02. 각과 직각",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "각의 꼭짓점과 한 변을 삼각자의 직각에 맞추었더니, 다른 변이 삼각자 직각의 안쪽으로 들어왔어. 이 각은 직각이야? 그렇게 생각한 이유도 말해 봐.",
"newQBy": "claude",
"answer": "직각이 아니야. 다른 변이 삼각자와 꼭 맞게 겹쳐야 직각인데, 안쪽으로 들어왔으니 직각보다 작은 각이야.",
"keys": [
"직각이 아니다",
"꼭 맞게 겹쳐야 직각",
"직각보다 작다"
],
"answerBy": "claude"
},
{
"id": "f6cqy4:t0L1",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f6cqy4:t0L2",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f6cqy4:t0L3",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "어떤 삼각형이 직각삼각형인지 어떻게 확인해?",
"newQBy": "claude",
"answer": "삼각자의 직각 부분을 각에 대어 보고, 꼭 맞게 겹치는 각이 하나 있으면 직각삼각형이야.",
"keys": [
"삼각자의 직각을 대어 본다",
"직각이 하나 있으면"
],
"answerBy": "claude"
},
{
"id": "f6cqy4:t0H1",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f6cqy4:t0H2",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f6cqy4:qrecall",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "직각삼각형은 어떤 삼각형이야?",
"newQBy": "claude",
"answer": "한 각이 직각인 삼각형이야.",
"keys": [
"한 각이 직각인 삼각형"
],
"answerBy": "claude"
},
{
"id": "f6cqy4:qreason",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "직사각형은 네 각이 모두 직각이라서, 자른 두 조각에 직사각형의 직각이 하나씩 남아. 그래서 두 조각 모두 한 각이 직각인 삼각형이야.",
"keys": [
"직사각형의 네 각은 직각",
"각 조각에 직각이 하나씩 남는다"
],
"answerBy": "claude"
},
{
"id": "f6cqy4:qexample",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "f6cqy4:qerror",
"big": "2. 평면도형",
"small": "03. 직각삼각형",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 삼각형은 모두 직각삼각형이라고 했어. 어디가 틀렸는지 말해 봐.",
"newQBy": "claude",
"answer": "직각삼각형은 한 각이 직각인 삼각형만 말해. 직각이 없는 삼각형도 있어서 모든 삼각형이 직각삼각형은 아니야.",
"keys": [
"한 각이 직각이어야 한다",
"직각이 없는 삼각형도 있다"
],
"answerBy": "claude"
},
{
"id": "7spmcy:t0L1",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7spmcy:t0L2",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7spmcy:t0L3",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "직사각형에서 마주 보는 두 변의 길이는 어때?",
"newQBy": "claude",
"answer": "마주 보는 두 변의 길이가 서로 같아.",
"keys": [
"마주 보는 두 변의 길이가 같다"
],
"answerBy": "claude"
},
{
"id": "7spmcy:t0H1",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "7spmcy:t0H2",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "크기와 모양이 서로 다른 두 사각형을 모두 직사각형이라고 부를 수 있는 건 무엇을 보고 정하기 때문이야?",
"newQBy": "claude",
"answer": "직사각형은 네 각이 모두 직각인지로 정해. 크기나 길쭉한 정도가 달라도 네 각이 모두 직각이면 직사각형이야.",
"keys": [
"네 각이 모두 직각인지로 정한다",
"크기와 상관없다"
],
"answerBy": "claude"
},
{
"id": "7spmcy:t0H3",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "가로 7 cm, 세로 4 cm인 직사각형의 네 변의 길이의 합은 얼마야?",
"newQBy": "claude",
"answer": "마주 보는 변의 길이가 같아서 7 + 4 + 7 + 4 = 22라서 22 cm야.",
"keys": [
"7 cm 두 개, 4 cm 두 개",
"22 cm"
],
"answerBy": "claude"
},
{
"id": "7spmcy:qrecall",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "직사각형은 어떤 사각형이야?",
"newQBy": "claude",
"answer": "네 각이 모두 직각인 사각형이야.",
"keys": [
"네 각이 모두 직각인 사각형"
],
"answerBy": "claude"
},
{
"id": "7spmcy:qreason",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "7spmcy:qexample",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "7spmcy:qerror",
"big": "2. 평면도형",
"small": "04. 직사각형",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "직사각형은 네 각이 모두 직각이면 돼. 네 변의 길이가 다 같을 필요는 없고, 마주 보는 두 변의 길이만 같아.",
"keys": [
"네 각이 직각이면 된다",
"네 변이 같을 필요는 없다"
],
"answerBy": "claude"
},
{
"id": "v0karp:t0L1",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0L2",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0L3",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0L4",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0L5",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0H1",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:t0H2",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "네 변의 길이가 같아도 정사각형이 아닐 수 있는 경우를 말해 줘.",
"newQBy": "claude",
"answer": "네 변의 길이가 같아도 네 각이 직각이 아니면 정사각형이 아니야. 비스듬히 기운 모양이 그래.",
"keys": [
"네 각이 직각이 아니면 아니다"
],
"answerBy": "claude"
},
{
"id": "v0karp:t0H3",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "정사각형을 직사각형이라고 할 수 있는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "직사각형은 네 각이 모두 직각인 사각형인데, 정사각형도 네 각이 모두 직각이라서 직사각형이라고 할 수 있어.",
"keys": [
"정사각형도 네 각이 모두 직각"
],
"answerBy": "claude"
},
{
"id": "v0karp:t0H4",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "가로 4 cm, 세로 2 cm인 직사각형은 정사각형이야? 가로와 세로가 모두 4 cm이면 어때?",
"newQBy": "claude",
"answer": "가로와 세로가 다르면 네 변의 길이가 같지 않아서 정사각형이 아니야. 가로와 세로가 모두 4 cm이면 네 변이 모두 같아서 정사각형이야.",
"keys": [
"4 cm, 2 cm는 정사각형이 아니다",
"모두 4 cm면 정사각형"
],
"answerBy": "claude"
},
{
"id": "v0karp:qrecall",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "정사각형은 어떤 사각형이야?",
"newQBy": "claude",
"answer": "네 각이 모두 직각이고 네 변의 길이가 모두 같은 사각형이야.",
"keys": [
"네 각이 모두 직각",
"네 변의 길이가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "v0karp:qreason",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:qexample",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:qerror",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "v0karp:qa29e3151",
"big": "2. 평면도형",
"small": "05. 정사각형",
"kind": "add",
"round": 1,
"by": "claude",
"q": "사각형이 직사각형인지 정사각형인지 알아볼 때 가장 먼저 무엇을 확인해야 해?",
"answer": "네 각이 모두 직각인지 먼저 확인하고, 그다음에 네 변의 길이가 모두 같은지 확인해.",
"keys": [
"네 각이 직각인지 먼저",
"네 변의 길이가 같은지"
],
"answerBy": "claude"
},
{
"id": "1328q60:t0L1",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "사과 10개를 접시 5개에 똑같이 나누면 한 접시에 몇 개씩이야? 나눗셈식으로 말해 봐.",
"newQBy": "claude",
"answer": "10 ÷ 5 = 2라서 한 접시에 2개씩이야.",
"keys": [
"10 ÷ 5 = 2",
"2개씩"
],
"answerBy": "claude"
},
{
"id": "1328q60:t0L2",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1328q60:t0L3",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1328q60:t0H1",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1328q60:t0H2",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "10 ÷ 5 = 2에서 10, 5, 2를 각각 뭐라고 불러?",
"newQBy": "claude",
"answer": "10은 나누어지는 수, 5는 나누는 수, 2는 몫이야.",
"keys": [
"나누어지는 수",
"나누는 수",
"몫"
],
"answerBy": "claude"
},
{
"id": "1328q60:qrecall",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "10 ÷ 5 = 2는 어떻게 읽어?",
"newQBy": "claude",
"answer": "10 나누기 5는 2와 같습니다라고 읽어.",
"keys": [
"10 나누기 5는 2와 같습니다"
],
"answerBy": "claude"
},
{
"id": "1328q60:qreason",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "한 접시에 4개씩 3접시면 4 × 3 = 12라서 12개가 딱 맞아. 곱셈으로 확인할 수 있어.",
"keys": [
"4 × 3 = 12",
"곱셈으로 확인한다"
],
"answerBy": "claude"
},
{
"id": "1328q60:qexample",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "연필 16자루를 4명에게 똑같이 나누면 16 ÷ 4 = 4라서 한 명에게 4자루씩이야.",
"keys": [
"똑같이 나누는 상황",
"나눗셈식과 몫"
],
"answerBy": "claude"
},
{
"id": "1328q60:qerror",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "나누어지는 수와 나누는 수의 자리를 바꿨어. 사탕 15개를 3명에게 나누는 거라서 15 ÷ 3 = 5라고 써야 해.",
"keys": [
"자리를 바꿨다",
"15 ÷ 3 = 5"
],
"answerBy": "claude"
},
{
"id": "e8z8ws:t0L1",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "사과 20개를 5개씩 덜어 내면 몇 번 덜어 낼 수 있어? 나눗셈식으로 말해 봐.",
"newQBy": "claude",
"answer": "20 - 5 - 5 - 5 - 5 = 0이라서 4번이야. 나눗셈식으로 20 ÷ 5 = 4야.",
"keys": [
"4번",
"20 ÷ 5 = 4"
],
"answerBy": "claude"
},
{
"id": "e8z8ws:t0L2",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "e8z8ws:t0H1",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "e8z8ws:t0H2",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "같은 수를 계속 빼서 0이 될 때까지 뺀 횟수가 왜 몫이 되는지 말해 봐.",
"newQBy": "claude",
"answer": "한 번 뺄 때마다 한 묶음을 덜어 낸 거라서, 뺀 횟수가 묶음의 수가 돼. 그게 몫이야.",
"keys": [
"한 번 빼면 한 묶음",
"뺀 횟수 = 묶음의 수 = 몫"
],
"answerBy": "claude"
},
{
"id": "e8z8ws:qrecall",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "몇 개씩 덜어 내서 나누는 나눗셈에서, 나온 몫은 무엇을 나타내?",
"newQBy": "claude",
"answer": "몇 묶음이 되는지, 즉 묶음의 수를 나타내.",
"keys": [
"묶음의 수"
],
"answerBy": "claude"
},
{
"id": "e8z8ws:qreason",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "둘 다 전체를 똑같은 크기로 나누는 거라서 같은 나눗셈식이 돼. 5명에게 나누면 몫은 한 명이 받는 수, 5개씩 덜어 내면 몫은 묶음의 수야.",
"keys": [
"둘 다 똑같이 나눈다",
"몫의 뜻만 다르다"
],
"answerBy": "claude"
},
{
"id": "e8z8ws:qexample",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "e8z8ws:qerror",
"big": "3. 나눗셈",
"small": "02. 똑같이 나누어 볼까요 (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1svlzhe:t0L1",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1svlzhe:t0L2",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1svlzhe:t0H1",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "곱셈식 2 × 5 = 10 하나로 나눗셈식 두 개가 나오는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "2씩 5묶음이 10이니까 10을 2씩 나누면 5묶음(10 ÷ 2 = 5), 10을 5묶음으로 나누면 2씩(10 ÷ 5 = 2)이야. 곱셈과 나눗셈은 서로 반대라서 그래.",
"keys": [
"곱셈과 나눗셈은 반대",
"10 ÷ 2 = 5, 10 ÷ 5 = 2"
],
"answerBy": "claude"
},
{
"id": "1svlzhe:t0H2",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1svlzhe:qrecall",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "28 ÷ 4 = 7, 28 ÷ 7 = 4야.",
"keys": [
"28 ÷ 4 = 7",
"28 ÷ 7 = 4"
],
"answerBy": "claude"
},
{
"id": "1svlzhe:qreason",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 1,
"newQ": "나눗셈식 15 ÷ 3 = 5로 만들 수 있는 곱셈식 두 개를 말해 봐.",
"newQBy": "claude",
"answer": "3 × 5 = 15, 5 × 3 = 15야.",
"keys": [
"3 × 5 = 15",
"5 × 3 = 15"
],
"answerBy": "claude"
},
{
"id": "1svlzhe:qexample",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1svlzhe:qerror",
"big": "3. 나눗셈",
"small": "03. 곱셈과 나눗셈의 관계",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "몫을 잘못 썼고 나눗셈식도 하나만 썼어. 5 × 6 = 30으로는 30 ÷ 5 = 6, 30 ÷ 6 = 5 두 개를 만들 수 있어.",
"keys": [
"30 ÷ 5 = 6",
"30 ÷ 6 = 5"
],
"answerBy": "claude"
},
{
"id": "iwvo6h:t0L1",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "24 ÷ 3의 몫을 곱셈식으로 어떻게 구해?",
"newQBy": "claude",
"answer": "3 × □ = 24에서 □를 찾으면 돼. 3 × 8 = 24라서 몫은 8이야.",
"keys": [
"3 × □ = 24",
"몫 8"
],
"answerBy": "claude"
},
{
"id": "iwvo6h:t0L2",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "iwvo6h:t0H1",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "iwvo6h:t0H2",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "나눗셈을 곱셈식으로 바꿔서 몫을 찾을 수 있는 이유를 말해 줘.",
"newQBy": "claude",
"answer": "곱셈과 나눗셈은 서로 반대라서, 나누는 수에 얼마를 곱해야 나누어지는 수가 되는지 찾으면 그 수가 몫이야.",
"keys": [
"곱셈과 나눗셈은 반대",
"곱해서 나누어지는 수가 되는 수가 몫"
],
"answerBy": "claude"
},
{
"id": "iwvo6h:qrecall",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "iwvo6h:qreason",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "28은 32보다 작으니까 7보다 큰 8을 넣어 봐야 해. 4 × 8 = 32라서 몫은 8이야.",
"keys": [
"28이 32보다 작다",
"더 큰 수 8",
"몫 8"
],
"answerBy": "claude"
},
{
"id": "iwvo6h:qexample",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "iwvo6h:qerror",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "나누는 수 3에 몫을 곱해야 나누어지는 수 27이 돼. 3 × □ = 27로 써야 하고, 3 × 9 = 27이라서 몫은 9야.",
"keys": [
"3 × □ = 27",
"몫 9"
],
"answerBy": "claude"
},
{
"id": "iwvo6h:qa29e3141",
"big": "3. 나눗셈",
"small": "04. 나눗셈의 몫을 곱셈식으로 구하기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "귤 35개를 5명에게 똑같이 나누어 주면 한 명이 몇 개씩 가져? 곱셈식으로 몫을 구해 봐.",
"answer": "35 ÷ 5야. 5 × 7 = 35라서 한 명이 7개씩 가져.",
"keys": [
"35 ÷ 5",
"5 × 7 = 35",
"7개"
],
"answerBy": "claude"
},
{
"id": "14je7an:t0L1",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "30 ÷ 6의 몫은 몇 단 곱셈구구로 구해? 몫도 말해 봐.",
"newQBy": "claude",
"answer": "나누는 수가 6이라서 6단 곱셈구구로 구해. 6 × 5 = 30이라서 몫은 5야.",
"keys": [
"6단",
"몫 5"
],
"answerBy": "claude"
},
{
"id": "14je7an:t0L2",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:t0H1",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:t0H2",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:qrecall",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:qreason",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:qexample",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "14je7an:qerror",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "나누는 수는 7이라서 7단 곱셈구구에서 찾아야 해. 7 × 6 = 42라서 몫은 6이야.",
"keys": [
"나누는 수의 단",
"7단",
"몫 6"
],
"answerBy": "claude"
},
{
"id": "14je7an:qa29e3151",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "나눗셈이 나오면 가장 먼저 생각해야 할 것은 뭐야?",
"answer": "나누는 수가 얼마인지 보고, 그 수의 단 곱셈구구를 떠올려. 나누는 수에 얼마를 곱하면 나누어지는 수가 되는지 찾으면 돼.",
"keys": [
"나누는 수를 본다",
"그 수의 단 곱셈구구"
],
"answerBy": "claude"
},
{
"id": "14je7an:qa29e3152",
"big": "3. 나눗셈",
"small": "05. 나눗셈의 몫을 곱셈구구로 구하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "학생 56명이 한 모둠에 8명씩 앉으면 모둠은 몇 개야? 식을 세우고 몫을 구하는 방법까지 말해 봐.",
"answer": "56 ÷ 8이야. 8단에서 8 × 7 = 56이라서 모둠은 7개야.",
"keys": [
"56 ÷ 8",
"8 × 7 = 56",
"7개"
],
"answerBy": "claude"
},
{
"id": "8kky9b:t0L1",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:t0L2",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:t0L3",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:t0H1",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "20 × 4를 2 × 4에 0을 붙여 계산해도 되는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "20은 2의 10배라서 20 × 4도 2 × 4의 10배야. 8의 10배는 80이라 0을 하나 붙이면 돼.",
"keys": [
"20은 2의 10배",
"곱도 10배"
],
"answerBy": "claude"
},
{
"id": "8kky9b:t0H2",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:qrecall",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "60 × 3을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "6 × 3 = 18을 먼저 구하고, 60은 6의 10배라서 0을 하나 붙여 180이야.",
"keys": [
"6 × 3 = 18",
"0을 붙여 180"
],
"answerBy": "claude"
},
{
"id": "8kky9b:qreason",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:qexample",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "8kky9b:qerror",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 30 × 4 = 1200이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "0을 하나만 붙여야 하는데 두 개를 붙였어. 3 × 4 = 12에 0을 하나 붙여 120이야.",
"keys": [
"0을 하나만 붙인다",
"120"
],
"answerBy": "claude"
},
{
"id": "1vk6pvj:t0L1",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:t0L2",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:t0H1",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "21 × 3을 20 × 3과 1 × 3으로 나누어 곱한 뒤 더하면 답이 같은 이유를 설명해 봐.",
"newQBy": "claude",
"answer": "21은 20과 1을 합한 수라서, 21을 3번 더한 것은 20을 3번, 1을 3번 더한 것과 같아. 그래서 60 + 3 = 63이야.",
"keys": [
"21 = 20 + 1",
"각각 곱해 더해도 같다",
"63"
],
"answerBy": "claude"
},
{
"id": "1vk6pvj:t0H2",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:qrecall",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "43 × 2를 계산하는 방법을 처음부터 끝까지 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 3 × 2 = 6, 십의 자리 40 × 2 = 80을 더해서 86이야.",
"keys": [
"일의 자리부터 곱한다",
"86"
],
"answerBy": "claude"
},
{
"id": "1vk6pvj:qreason",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:qexample",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:qerror",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1vk6pvj:qcondition",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"answer": "10보다 작으면 그대로 일의 자리에 써. 10이거나 크면 일의 자리 숫자만 쓰고 십의 자리 숫자는 올려서 십의 자리 곱에 더해.",
"keys": [
"10보다 작으면 그대로",
"10 이상이면 올림"
],
"answerBy": "claude"
},
{
"id": "1vk6pvj:qa29e3121",
"big": "4. 곱셈",
"small": "02. (몇십몇)×(몇) (1)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 상자에 연필이 12자루씩 들어 있어. 4상자에는 모두 몇 자루야? 식과 답을 말해 봐.",
"answer": "12 × 4 = 48이라서 48자루야.",
"keys": [
"12 × 4",
"48자루"
],
"answerBy": "claude"
},
{
"id": "1v1uw1t:t0L1",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:t0L2",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:t0H1",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:t0H2",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:qrecall",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "15 × 4를 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 5 × 4 = 20이라 0을 쓰고 2를 올려. 십의 자리 1 × 4 = 4에 2를 더해 6이라서 60이야.",
"keys": [
"일의 자리 곱에서 올림",
"올린 2를 더한다",
"60"
],
"answerBy": "claude"
},
{
"id": "1v1uw1t:qreason",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:qexample",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1v1uw1t:qerror",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 18 × 4 = 42라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "8 × 4 = 32에서 올린 3을 십의 자리에 더하지 않았어. 1 × 4 = 4에 3을 더해 7이라서 72야.",
"keys": [
"올린 3을 안 더했다",
"72"
],
"answerBy": "claude"
},
{
"id": "1v1uw1t:qa29e3131",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 줄에 16명씩 5줄로 서 있으면 모두 몇 명이야? 식과 답을 말해 봐.",
"answer": "16 × 5야. 6 × 5 = 30이라 0을 쓰고 3을 올리고, 1 × 5 = 5에 3을 더해 8이라서 80명이야.",
"keys": [
"16 × 5",
"80명"
],
"answerBy": "claude"
},
{
"id": "17z65if:t0L1",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:t0L2",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:t0H1",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:t0H2",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:qrecall",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "63 × 3을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 3 × 3 = 9, 십의 자리 6 × 3 = 18이야. 18에서 8은 십의 자리, 1은 백의 자리에 써서 189야.",
"keys": [
"십의 자리 곱 18",
"백의 자리로 올린다",
"189"
],
"answerBy": "claude"
},
{
"id": "17z65if:qreason",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "십의 자리 5 × 3 = 15는 사실 50 × 3 = 150이야. 150은 100과 50이라서 100은 백의 자리에 1로, 50은 십의 자리에 5로 써. 그래서 156이야.",
"keys": [
"15는 150을 뜻한다",
"100은 백의 자리로",
"156"
],
"answerBy": "claude"
},
{
"id": "17z65if:qexample",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:qerror",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "17z65if:qa29e3141",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 봉지에 사탕이 31개씩 들어 있어. 5봉지에는 모두 몇 개야? 식과 답을 말해 봐.",
"answer": "31 × 5야. 1 × 5 = 5, 3 × 5 = 15라서 155개야.",
"keys": [
"31 × 5",
"155개"
],
"answerBy": "claude"
},
{
"id": "16gxtvh:t0L1",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "35 × 4를 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 5 × 4 = 20이라 0을 쓰고 2를 올려. 십의 자리 3 × 4 = 12에 2를 더해 14라서 140이야.",
"keys": [
"일의 자리부터 곱한다",
"올린 수를 더한다",
"140"
],
"answerBy": "claude"
},
{
"id": "16gxtvh:t0L2",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:t0H1",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:t0H2",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:qrecall",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:qreason",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:qexample",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "16gxtvh:qerror",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 37 × 5 = 155라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "7 × 5 = 35에서 올린 3을 십의 자리에 더하지 않았어. 3 × 5 = 15에 3을 더해 18이라서 185야.",
"keys": [
"올린 3을 안 더했다",
"185"
],
"answerBy": "claude"
},
{
"id": "16gxtvh:qa29e3151",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "(몇십몇)×(몇)을 계산할 때 가장 먼저 생각할 것은 뭐야?",
"answer": "일의 자리부터 곱하고, 곱이 10이 넘으면 올림한 수를 바로 윗자리 곱에 더해야 한다는 거야.",
"keys": [
"일의 자리부터 곱한다",
"올림한 수를 윗자리 곱에 더한다"
],
"answerBy": "claude"
},
{
"id": "16gxtvh:qa29e3152",
"big": "4. 곱셈",
"small": "05. (몇십몇)×(몇) (4)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 상자에 달걀이 24개씩 들어 있어. 7상자에는 모두 몇 개야? 식과 답을 말해 봐.",
"answer": "24 × 7이야. 4 × 7 = 28이라 8을 쓰고 2를 올리고, 2 × 7 = 14에 2를 더해 16이라서 168개야.",
"keys": [
"24 × 7",
"168개"
],
"answerBy": "claude"
},
{
"id": "ihgji0:t0L1",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ihgji0:t0L2",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1 cm는 몇 mm야?",
"newQBy": "claude",
"answer": "1 cm는 10 mm야.",
"keys": [
"10 mm"
],
"answerBy": "claude"
},
{
"id": "ihgji0:t0L3",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "13 cm 5 mm는 몇 mm로 나타낼 수 있어?",
"newQBy": "claude",
"answer": "13 cm는 130 mm라서 130 + 5 = 135 mm야.",
"keys": [
"13 cm = 130 mm",
"135 mm"
],
"answerBy": "claude"
},
{
"id": "ihgji0:t0H1",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "1 cm보다 작은 단위 mm는 언제 필요해?",
"newQBy": "claude",
"answer": "길이가 cm 눈금 사이에 걸려서 cm만으로 정확히 나타낼 수 없을 때 필요해.",
"keys": [
"cm로 정확히 나타낼 수 없을 때"
],
"answerBy": "claude"
},
{
"id": "ihgji0:t0H2",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ihgji0:qrecall",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "ihgji0:qreason",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ihgji0:qexample",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "ihgji0:qerror",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "단위를 바꾸지 않고 2와 4를 더했어. 2 cm는 20 mm라서 20 + 4 = 24 mm야.",
"keys": [
"2 cm = 20 mm",
"24 mm"
],
"answerBy": "claude"
},
{
"id": "13jhduv:t0L1",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1 km는 몇 m야?",
"newQBy": "claude",
"answer": "1 km는 1000 m야.",
"keys": [
"1000 m"
],
"answerBy": "claude"
},
{
"id": "13jhduv:t0L2",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "2 km 800 m는 몇 m로 나타낼 수 있어?",
"newQBy": "claude",
"answer": "2 km는 2000 m라서 2000 + 800 = 2800 m야.",
"keys": [
"2 km = 2000 m",
"2800 m"
],
"answerBy": "claude"
},
{
"id": "13jhduv:t0H1",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13jhduv:t0H2",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "mm, cm, m, km는 서로 어떤 관계야?",
"newQBy": "claude",
"answer": "1 cm는 10 mm, 1 m는 100 cm, 1 km는 1000 m야. mm에서 km로 갈수록 큰 단위야.",
"keys": [
"1 cm = 10 mm",
"1 m = 100 cm",
"1 km = 1000 m"
],
"answerBy": "claude"
},
{
"id": "13jhduv:qrecall",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "13jhduv:qreason",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "13jhduv:qexample",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "13jhduv:qerror",
"big": "5. 길이와 시간",
"small": "02. 1 m보다 큰 단위 (km)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "3 km를 3 m처럼 계산했어. 3 km는 3000 m라서 3000 + 500 = 3500 m야.",
"keys": [
"3 km = 3000 m",
"3500 m"
],
"answerBy": "claude"
},
{
"id": "1q6tapp:t0L1",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1q6tapp:t0L2",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1q6tapp:t0H1",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "물건의 길이나 거리에 알맞은 단위는 어떻게 골라?",
"newQBy": "claude",
"answer": "짧은 물건은 mm나 cm, 교실처럼 조금 긴 것은 m, 도시 사이처럼 먼 거리는 km를 골라.",
"keys": [
"짧으면 mm·cm",
"길면 m",
"먼 거리는 km"
],
"answerBy": "claude"
},
{
"id": "1q6tapp:t0H2",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "길이를 어림한다는 건 뭐야?",
"newQBy": "claude",
"answer": "자로 재지 않고 대강 얼마쯤인지 짐작하는 거야.",
"keys": [
"재지 않고 짐작한다"
],
"answerBy": "claude"
},
{
"id": "1q6tapp:qrecall",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1q6tapp:qreason",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "어림은 자로 재지 않고 짐작하는 거라서, 사람마다 기준(한 뼘 등)과 느낌이 달라 값이 조금씩 달라져.",
"keys": [
"재지 않고 짐작한다",
"기준이 사람마다 다르다"
],
"answerBy": "claude"
},
{
"id": "1q6tapp:qexample",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1q6tapp:qerror",
"big": "5. 길이와 시간",
"small": "03. 길이와 거리를 어림하고 재기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "km는 먼 거리를 나타내는 단위라서 지우개에는 맞지 않아. 지우개는 약 5 cm라고 해야 해.",
"keys": [
"km는 먼 거리 단위",
"5 cm"
],
"answerBy": "claude"
},
{
"id": "1p73mij:t0L1",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1p73mij:t0L2",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1분은 몇 초야?",
"newQBy": "claude",
"answer": "1분은 60초야.",
"keys": [
"60초"
],
"answerBy": "claude"
},
{
"id": "1p73mij:t0L3",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1p73mij:t0H1",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "1분 30초는 몇 초야? 어떻게 구했는지도 말해 봐.",
"newQBy": "claude",
"answer": "1분은 60초라서 60 + 30 = 90초야.",
"keys": [
"1분 = 60초",
"90초"
],
"answerBy": "claude"
},
{
"id": "1p73mij:t0H2",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "초바늘이 한 바퀴를 돌면 긴바늘은 어떻게 움직이는지 말해 줘.",
"newQBy": "claude",
"answer": "초바늘이 한 바퀴 돌면 60초, 즉 1분이 지나서 긴바늘은 작은 눈금 한 칸을 움직여.",
"keys": [
"한 바퀴 = 60초 = 1분",
"긴바늘이 한 칸 움직인다"
],
"answerBy": "claude"
},
{
"id": "1p73mij:qrecall",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1p73mij:qreason",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1p73mij:qexample",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "손을 씻는 데 약 30초, 이름을 쓰는 데 약 10초가 걸려.",
"keys": [
"1분보다 짧은 일",
"몇 초로 어림"
],
"answerBy": "claude"
},
{
"id": "1p73mij:qerror",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "1분을 1초로 생각했어. 1분은 60초라서 60 + 20 = 80초야.",
"keys": [
"1분 = 60초",
"80초"
],
"answerBy": "claude"
},
{
"id": "1aqvjq:t0L1",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1시간 20분 30초 + 2시간 15분 10초는 어떻게 계산해?",
"newQBy": "claude",
"answer": "시는 시끼리, 분은 분끼리, 초는 초끼리 더해. 3시간 35분 40초야.",
"keys": [
"같은 단위끼리 더한다",
"3시간 35분 40초"
],
"answerBy": "claude"
},
{
"id": "1aqvjq:t0L2",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "초끼리 더한 값이 60초가 넘으면 어떻게 해?",
"newQBy": "claude",
"answer": "60초를 1분으로 바꿔서 분에 1을 더하고, 남은 초만 써.",
"keys": [
"60초 = 1분",
"분으로 받아올림"
],
"answerBy": "claude"
},
{
"id": "1aqvjq:t0H1",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:t0H2",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:qrecall",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:qreason",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:qexample",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:qcondition",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1aqvjq:qerror",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "75분을 그대로 뒀어. 60분은 1시간이라서 75분은 1시간 15분이야. 그래서 4시간 15분이야.",
"keys": [
"60분 = 1시간",
"4시간 15분"
],
"answerBy": "claude"
},
{
"id": "1aqvjq:qa29e3151",
"big": "5. 길이와 시간",
"small": "05. 시간의 덧셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "오전 9시 50분에 출발해 2시간 25분 걸려 도착했어. 도착한 시각은 몇 시 몇 분이야?",
"answer": "9시 50분 + 2시간 25분 = 11시 75분이고, 75분은 1시간 15분이라서 낮 12시 15분이야.",
"keys": [
"11시 75분",
"낮 12시 15분"
],
"answerBy": "claude"
},
{
"id": "1cjvvww:t0L1",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3시간 40분 25초 - 1시간 15분 10초는 어떻게 계산해?",
"newQBy": "claude",
"answer": "시는 시끼리, 분은 분끼리, 초는 초끼리 빼. 2시간 25분 15초야.",
"keys": [
"같은 단위끼리 뺀다",
"2시간 25분 15초"
],
"answerBy": "claude"
},
{
"id": "1cjvvww:t0L2",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "초끼리 뺄 수 없으면 어떻게 해?",
"newQBy": "claude",
"answer": "분에서 1분을 받아내려 60초로 바꿔서 빼.",
"keys": [
"1분을 60초로 받아내린다"
],
"answerBy": "claude"
},
{
"id": "1cjvvww:t0H1",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cjvvww:t0H2",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "시간의 뺄셈의 받아내림은 세 자리 수 뺄셈의 받아내림과 무엇이 같고 무엇이 달라?",
"newQBy": "claude",
"answer": "뺄 수 없을 때 윗단위에서 빌려 온다는 점은 같아. 세 자리 수는 10을 받아내리지만 시간은 60을 받아내리는 게 달라.",
"keys": [
"윗단위에서 빌려 온다",
"수는 10, 시간은 60"
],
"answerBy": "claude"
},
{
"id": "1cjvvww:qrecall",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1cjvvww:qreason",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1cjvvww:qexample",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1cjvvww:qcondition",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1cjvvww:qerror",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "20분에서 50분을 뺄 수 없어서 50 - 20을 한 것 같아. 1시간을 60분으로 받아내리면 2시간 80분 - 1시간 50분 = 1시간 30분이야.",
"keys": [
"1시간 = 60분 받아내림",
"1시간 30분"
],
"answerBy": "claude"
},
{
"id": "1cjvvww:qa29e3161",
"big": "5. 길이와 시간",
"small": "06. 시간의 뺄셈",
"kind": "add",
"round": 1,
"by": "claude",
"q": "길이나 시간을 계산하는 문제가 나오면 가장 먼저 무엇을 확인해야 해?",
"answer": "단위를 확인하고 같은 단위끼리 계산해. 받아올림이나 받아내림을 할 때 시간은 60, cm와 mm는 10, km와 m는 1000으로 바뀐다는 걸 생각해.",
"keys": [
"같은 단위끼리",
"시간은 60씩"
],
"answerBy": "claude"
},
{
"id": "159neiy:t0L1",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "159neiy:t0L2",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "159neiy:t0H1",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "159neiy:t0H2",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "꼭 곧은 선이 아니어도 똑같이 나눌 수 있는 이유를 말해 줘.",
"newQBy": "claude",
"answer": "똑같이 나눈다는 건 나눈 조각들의 모양과 크기가 같다는 뜻이라서, 굽은 선으로 잘라도 조각이 서로 꼭 같으면 똑같이 나눈 거야.",
"keys": [
"조각의 모양과 크기가 같으면 된다"
],
"answerBy": "claude"
},
{
"id": "159neiy:qrecall",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "나눈 조각들의 모양과 크기가 모두 같게 나누는 거야.",
"keys": [
"조각의 모양과 크기가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "159neiy:qreason",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "159neiy:qexample",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "네모 모양 종이를 똑같이 넷으로 나누는 방법을 두 가지 말해 봐.",
"newQBy": "claude",
"answer": "가로로 세 번 잘라 긴 띠 네 개로 나누거나, 가로와 세로로 한 번씩 반 잘라 작은 네모 네 개로 나눌 수 있어.",
"keys": [
"띠 네 개로",
"가로·세로 반씩"
],
"answerBy": "claude"
},
{
"id": "159neiy:qerror",
"big": "6. 분수와 소수",
"small": "01. 똑같이 나누어 보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "조각의 수가 아니라 크기가 같아야 똑같이 나눈 거야. 세 조각의 크기가 모두 같아야 해.",
"keys": [
"크기가 같아야 한다"
],
"answerBy": "claude"
},
{
"id": "1blq3rf:t0L1",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1blq3rf:t0L2",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1blq3rf:t0L3",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1blq3rf:t0H1",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1blq3rf:t0H2",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "색칠한 부분이 전체의 2/5라는 건 무슨 뜻이야?",
"newQBy": "claude",
"answer": "전체를 똑같이 5로 나눈 것 중 2만큼 색칠했다는 뜻이야.",
"keys": [
"똑같이 5로 나눈 것 중 2"
],
"answerBy": "claude"
},
{
"id": "1blq3rf:qrecall",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "분모는 전체를 똑같이 나눈 수, 분자는 그중 몇 개인지를 나타내.",
"keys": [
"분모: 똑같이 나눈 수",
"분자: 그중 몇 개"
],
"answerBy": "claude"
},
{
"id": "1blq3rf:qreason",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "조각의 크기가 다르면 한 조각이 전체의 얼마인지 정할 수 없어. 똑같이 나누어야 한 조각의 크기가 정해져서 분수로 나타낼 수 있어.",
"keys": [
"크기가 다르면 정할 수 없다",
"똑같이 나눠야 한 조각의 크기가 정해진다"
],
"answerBy": "claude"
},
{
"id": "1blq3rf:qexample",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1blq3rf:qerror",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "분모와 분자를 바꿔 썼어. 전체를 나눈 수 5가 아래 분모, 색칠한 2가 위 분자라서 2/5야.",
"keys": [
"분모와 분자를 바꿨다",
"2/5"
],
"answerBy": "claude"
},
{
"id": "1blq3rf:qa29e3121",
"big": "6. 분수와 소수",
"small": "02. 분수 알아보기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "리본을 똑같이 7도막으로 나누어 3도막을 썼어. 남은 리본은 전체의 얼마인지 분수로 말해 봐.",
"answer": "남은 것은 7도막 중 4도막이라서 4/7야.",
"keys": [
"남은 도막 4",
"4/7"
],
"answerBy": "claude"
},
{
"id": "1gu24ci:t0L1",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:t0L2",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:t0H1",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:t0H2",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:qrecall",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "1/2, 1/3처럼 분자가 1인 분수야.",
"keys": [
"분자가 1인 분수"
],
"answerBy": "claude"
},
{
"id": "1gu24ci:qreason",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:qexample",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1gu24ci:qerror",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "분모가 아니라 분자가 1인 분수가 단위분수야. 1/4, 1/5 같은 분수야.",
"keys": [
"분자가 1이어야 한다"
],
"answerBy": "claude"
},
{
"id": "1gu24ci:qa29e3131",
"big": "6. 분수와 소수",
"small": "03. 단위분수 알아보기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "4/7는 1/7이 몇 개인 수야?",
"answer": "4/7는 1/7이 4개인 수야.",
"keys": [
"1/7이 4개"
],
"answerBy": "claude"
},
{
"id": "2csgbi:t0L1",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분모가 같은 분수는 무엇을 보고 크기를 비교해?",
"newQBy": "claude",
"answer": "분자를 보고 비교해. 분자가 클수록 큰 분수야.",
"keys": [
"분자를 비교한다"
],
"answerBy": "claude"
},
{
"id": "2csgbi:t0L2",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "4/9와 7/9 중 어느 것이 더 커?",
"newQBy": "claude",
"answer": "분모가 같으니 분자를 비교하면 7이 커서 7/9이 더 커.",
"keys": [
"분자 비교",
"7/9"
],
"answerBy": "claude"
},
{
"id": "2csgbi:t0H1",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2csgbi:t0H2",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2csgbi:qrecall",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "2csgbi:qreason",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "4/6가 2/6보다 큰 이유를 조각 하나의 크기를 이용해서 설명해 봐.",
"newQBy": "claude",
"answer": "분모가 같으면 조각 하나의 크기가 1/6로 같아. 4/6는 그 조각이 4개, 2/6는 2개라서 4/6가 더 커.",
"keys": [
"조각 하나의 크기가 같다",
"조각의 개수가 더 많다"
],
"answerBy": "claude"
},
{
"id": "2csgbi:qexample",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "2csgbi:qcondition",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "2csgbi:qerror",
"big": "6. 분수와 소수",
"small": "04. 분모가 같은 분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "분모가 같으면 크기가 같은 게 아니라 분자를 비교해야 해. 3/5은 1/5이 3개, 2/5는 2개라서 3/5이 더 커.",
"keys": [
"분모가 같으면 분자를 비교",
"3/5이 더 크다"
],
"answerBy": "claude"
},
{
"id": "1u1abxs:t0L1",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1u1abxs:t0L2",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1/4과 1/7 중 어느 것이 더 커?",
"newQBy": "claude",
"answer": "단위분수는 분모가 작을수록 커서 1/4이 더 커.",
"keys": [
"분모가 작을수록 크다",
"1/4"
],
"answerBy": "claude"
},
{
"id": "1u1abxs:t0H1",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "단위분수에서 분모가 클수록 오히려 크기가 작아지는 이유를 설명해 봐.",
"newQBy": "claude",
"answer": "분모가 클수록 전체를 더 많은 조각으로 나눈 거라서 한 조각의 크기가 작아져.",
"keys": [
"더 많이 나눈다",
"한 조각이 작아진다"
],
"answerBy": "claude"
},
{
"id": "1u1abxs:t0H2",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1u1abxs:qrecall",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "분모가 클수록 크기가 작아져.",
"keys": [
"분모가 클수록 작다"
],
"answerBy": "claude"
},
{
"id": "1u1abxs:qreason",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1u1abxs:qexample",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1u1abxs:qerror",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1u1abxs:qa29e3151",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "add",
"round": 1,
"by": "claude",
"q": "분수의 크기를 비교할 때 가장 먼저 무엇을 확인해야 해?",
"answer": "분모가 같은지, 분자가 1인 단위분수인지 확인해. 분모가 같으면 분자가 큰 쪽이, 단위분수끼리는 분모가 작은 쪽이 커.",
"keys": [
"분모가 같은지",
"단위분수인지"
],
"answerBy": "claude"
},
{
"id": "1u1abxs:qa29e3152",
"big": "6. 분수와 소수",
"small": "05. 단위분수의 크기 비교",
"kind": "add",
"round": 2,
"by": "claude",
"q": "3/7과 5/7는 분자로, 1/3과 1/5은 분모로 비교했어. 두 경우는 무엇이 달라서 비교하는 방법이 달라?",
"answer": "3/7과 5/7는 분모가 같아서 조각 크기가 같으니 조각 수(분자)로 비교해. 1/3과 1/5은 조각 수가 1개로 같으니 조각 크기(분모)로 비교해.",
"keys": [
"분모가 같으면 분자로",
"분자가 같으면 분모로"
],
"answerBy": "claude"
},
{
"id": "1bhodch:t0L1",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1bhodch:t0L2",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1bhodch:t0L3",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "0.6은 0.1이 몇 개야?",
"newQBy": "claude",
"answer": "0.6은 0.1이 6개야.",
"keys": [
"0.1이 6개"
],
"answerBy": "claude"
},
{
"id": "1bhodch:t0H1",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1bhodch:t0H2",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1bhodch:qrecall",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "0.1이라고 쓰고 영 점 일이라고 읽어.",
"keys": [
"0.1",
"영 점 일"
],
"answerBy": "claude"
},
{
"id": "1bhodch:qreason",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "3/10은 1/10이 3개야. 1/10이 0.1이니까 0.1이 3개인 0.3과 같아.",
"keys": [
"1/10이 3개",
"0.1이 3개 = 0.3"
],
"answerBy": "claude"
},
{
"id": "1bhodch:qexample",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1bhodch:qerror",
"big": "6. 분수와 소수",
"small": "06. 소수 알아보기 (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:t0L1",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3과 0.5를 합한 수는 소수로 어떻게 쓰고 읽어?",
"newQBy": "claude",
"answer": "3.5라고 쓰고 삼 점 오라고 읽어.",
"keys": [
"3.5",
"삼 점 오"
],
"answerBy": "claude"
},
{
"id": "m2b857:t0L2",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:t0L3",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "8.4는 0.1이 몇 개야? 어떻게 알았어?",
"newQBy": "claude",
"answer": "8은 0.1이 80개이고 0.4는 0.1이 4개라서 모두 84개야.",
"keys": [
"8 = 0.1이 80개",
"84개"
],
"answerBy": "claude"
},
{
"id": "m2b857:t0H1",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "6.2에서 6과 2는 각각 무엇을 나타내?",
"newQBy": "claude",
"answer": "6은 자연수 부분으로 6을, 2는 소수 부분으로 0.2(0.1이 2개)를 나타내.",
"keys": [
"6은 자연수 부분",
"2는 0.2"
],
"answerBy": "claude"
},
{
"id": "m2b857:t0H2",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:qrecall",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:qreason",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:qexample",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "m2b857:qerror",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "소수점을 빼고 읽었어. 3.5는 3과 0.5를 합한 수라서 삼 점 오라고 읽어야 해.",
"keys": [
"소수점을 빼고 읽었다",
"삼 점 오"
],
"answerBy": "claude"
},
{
"id": "m2b857:qa29e3171",
"big": "6. 분수와 소수",
"small": "07. 소수 알아보기 (2)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "끈의 길이가 5 cm 7 mm야. 몇 cm인지 소수로 말해 봐.",
"answer": "1 mm는 0.1 cm라서 7 mm는 0.7 cm야. 그래서 5.7 cm야.",
"keys": [
"7 mm = 0.7 cm",
"5.7 cm"
],
"answerBy": "claude"
},
{
"id": "1l4r7zx:t0L1",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1l4r7zx:t0L2",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "0.7과 0.5 중 어느 것이 더 커? 어떻게 알았어?",
"newQBy": "claude",
"answer": "0.7은 0.1이 7개, 0.5는 0.1이 5개라서 0.7이 더 커.",
"keys": [
"0.1의 개수로 비교",
"0.7"
],
"answerBy": "claude"
},
{
"id": "1l4r7zx:t0H1",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1l4r7zx:t0H2",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "2.8은 3보다 얼마만큼 작아? 어떻게 알았어?",
"newQBy": "claude",
"answer": "3은 0.1이 30개, 2.8은 0.1이 28개라서 0.1이 2개 차이 나. 그래서 0.2만큼 작아.",
"keys": [
"0.1이 30개와 28개",
"0.2만큼 작다"
],
"answerBy": "claude"
},
{
"id": "1l4r7zx:qrecall",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "자연수 부분부터 비교하고, 자연수 부분이 같으면 소수 부분을 비교해.",
"keys": [
"자연수 부분부터",
"같으면 소수 부분"
],
"answerBy": "claude"
},
{
"id": "1l4r7zx:qreason",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1l4r7zx:qexample",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1l4r7zx:qcondition",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1l4r7zx:qerror",
"big": "6. 분수와 소수",
"small": "08. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"answer": "자연수 부분을 먼저 봐야 해. 1.2는 자연수 부분이 1, 0.9는 0이라서 1.2가 더 커.",
"keys": [
"자연수 부분부터 비교",
"1.2가 더 크다"
],
"answerBy": "claude"
}
],
"seen": []
}});

/* [29b] 2026-09-29 초3 교재 대조 — 4단원 (2)=십의 자리 올림 · (3)=일의 자리 올림으로 바로잡음. 원천 작업도구/질문계단/e3/make_plan_e31b.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e3-1_2026-09-29b', data:{
"format": "qr-plan-2",
"grade": "e3-1",
"rounds": 3,
"items": [
{
"id": "1v1uw1t:t0H1",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "high",
"by": "claude",
"round": 1,
"off": false,
"offWas": true,
"newQ": "43 × 3을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "일의 자리 3 × 3 = 9를 쓰고, 십의 자리 4 × 3 = 12에서 2는 십의 자리, 1은 백의 자리에 써서 129야.",
"keys": [
"십의 자리 곱 12",
"1은 백의 자리",
"129"
],
"answerBy": "claude"
},
{
"id": "1v1uw1t:t0H2",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "high",
"by": "claude",
"round": 2,
"off": false,
"offWas": true,
"newQ": "43 × 3에서 십의 자리 4 × 3 = 12의 1을 백의 자리에 쓰는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "십의 자리 4는 40이라서 40 × 3 = 120이야. 120의 100은 백의 자리에 1로, 20은 십의 자리에 2로 써.",
"keys": [
"4 × 3은 40 × 3 = 120",
"100은 백의 자리"
],
"answerBy": "claude"
},
{
"id": "1v1uw1t:qrecall",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offWas": false,
"offBy": "claude"
},
{
"id": "1v1uw1t:qerror",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offWas": false,
"offBy": "claude"
},
{
"id": "1v1uw1t:qa29e3131",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "add",
"by": "claude",
"round": 1,
"q": "한 줄에 41명씩 4줄로 서 있으면 모두 몇 명이야? 식과 답을 말해 봐.",
"answer": "41 × 4야. 1 × 4 = 4, 4 × 4 = 16이라서 164명이야.",
"keys": [
"41 × 4",
"164명"
],
"answerBy": "claude",
"qWas": "한 줄에 16명씩 5줄로 서 있으면 모두 몇 명이야? 식과 답을 말해 봐.",
"ansWas": {
"a": "16 × 5야. 6 × 5 = 30이라 0을 쓰고 3을 올리고, 1 × 5 = 5에 3을 더해 8이라서 80명이야.",
"k": [
"16 × 5",
"80명"
]
}
},
{
"id": "1v1uw1t:qa29e3132",
"big": "4. 곱셈",
"small": "03. (몇십몇)×(몇) (2)",
"kind": "add",
"by": "claude",
"round": 2,
"q": "친구가 62 × 4 = 48이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"answer": "십의 자리 6 × 4 = 24에서 백의 자리로 올린 2를 빠뜨렸어. 일의 자리 8, 십의 자리 4, 백의 자리 2라서 248이야.",
"keys": [
"백의 자리 2를 빠뜨렸다",
"248"
],
"answerBy": "claude"
},
{
"id": "17z65if:t0H1",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "high",
"by": "claude",
"round": 2,
"off": false,
"offWas": true,
"newQ": "26 × 3에서 일의 자리 6 × 3 = 18의 1을 십의 자리 곱에 더해 주는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "18의 1은 10을 뜻해서 십의 자리 값이야. 그래서 십의 자리 곱 2 × 3 = 6에 더해 7이 되고, 답은 78이야.",
"keys": [
"올린 1은 10을 뜻한다",
"십의 자리 곱에 더한다",
"78"
],
"answerBy": "claude"
},
{
"id": "17z65if:qrecall",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "26 × 3을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"qWas": "63 × 3을 계산하는 방법을 말해 봐.",
"answer": "일의 자리 6 × 3 = 18에서 8을 쓰고 1을 올려. 십의 자리 2 × 3 = 6에 1을 더해 7이라서 78이야.",
"keys": [
"일의 자리 곱에서 올림",
"올린 1을 더한다",
"78"
],
"answerBy": "claude",
"ansWas": {
"a": "일의 자리 3 × 3 = 9, 십의 자리 6 × 3 = 18이야. 18에서 8은 십의 자리, 1은 백의 자리에 써서 189야.",
"k": [
"십의 자리 곱 18",
"백의 자리로 올린다",
"189"
]
}
},
{
"id": "17z65if:qreason",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offWas": false,
"offBy": "claude"
},
{
"id": "17z65if:qa29e3141",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "add",
"by": "claude",
"round": 1,
"q": "한 봉지에 사탕이 15개씩 들어 있어. 6봉지에는 모두 몇 개야? 식과 답을 말해 봐.",
"answer": "15 × 6이야. 5 × 6 = 30에서 0을 쓰고 3을 올려. 1 × 6 = 6에 3을 더해 9라서 90개야.",
"keys": [
"15 × 6",
"90개"
],
"answerBy": "claude",
"qWas": "한 봉지에 사탕이 31개씩 들어 있어. 5봉지에는 모두 몇 개야? 식과 답을 말해 봐.",
"ansWas": {
"a": "31 × 5야. 1 × 5 = 5, 3 × 5 = 15라서 155개야.",
"k": [
"31 × 5",
"155개"
]
}
},
{
"id": "17z65if:qa29e3142",
"big": "4. 곱셈",
"small": "04. (몇십몇)×(몇) (3)",
"kind": "add",
"by": "claude",
"round": 2,
"q": "친구가 18 × 4 = 42라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.",
"answer": "8 × 4 = 32에서 올린 3을 십의 자리에 더하지 않았어. 1 × 4 = 4에 3을 더해 7이라서 72야.",
"keys": [
"올린 3을 안 더했다",
"72"
],
"answerBy": "claude"
}
],
"seen": []
}});

/* [pre] 2026-09-29 🌱 선수 개념 질문 — 소단원 맨 앞(ord 0) · 1회차. 어른 화면 구분 표시는 review/pre_e3-1.js.
   원천 작업도구/질문계단/e3/make_pre_e31.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e3-1_pre_2026-09-29', data:{
"format": "qr-plan-2",
"grade": "e3-1",
"rounds": 3,
"items": [
{
"id": "a54far:qapre0101",
"big": "1. 덧셈과 뺄셈",
"small": "01. (세 자리 수)+(세 자리 수) (1)",
"kind": "add",
"q": "352에서 5는 어느 자리 숫자이고 얼마를 나타내?",
"round": 1,
"ord": 0,
"answer": "십의 자리 숫자이고 50을 나타내.",
"keys": [
"십의 자리",
"50"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "1328q60:qapre0301",
"big": "3. 나눗셈",
"small": "01. 똑같이 나누어 볼까요 (1)",
"kind": "add",
"q": "6 × 4는 얼마야? 6을 몇 번 더한 것과 같아?",
"round": 1,
"ord": 0,
"answer": "24야. 6을 4번 더한 것과 같아.",
"keys": [
"24",
"6을 4번 더한 것"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "8kky9b:qapre0401",
"big": "4. 곱셈",
"small": "01. (몇십)×(몇)",
"kind": "add",
"q": "5 × 3은 어떤 덧셈과 같아?",
"round": 1,
"ord": 0,
"answer": "5를 3번 더한 5 + 5 + 5와 같아서 15야.",
"keys": [
"5 + 5 + 5",
"15"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "ihgji0:qapre0501",
"big": "5. 길이와 시간",
"small": "01. 1 cm보다 작은 단위 (mm)",
"kind": "add",
"q": "1 m는 몇 cm야?",
"round": 1,
"ord": 0,
"answer": "1 m는 100 cm야.",
"keys": [
"100 cm"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "1p73mij:qapre0504",
"big": "5. 길이와 시간",
"small": "04. 1분보다 작은 단위 (초)",
"kind": "add",
"q": "1시간은 몇 분이야?",
"round": 1,
"ord": 0,
"answer": "1시간은 60분이야.",
"keys": [
"60분"
],
"answerBy": "claude",
"by": "claude"
}
],
"seen": []
}});
