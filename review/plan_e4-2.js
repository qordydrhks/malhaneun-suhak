/* 질문 고르기 — 기본으로 실어 두는 분류안 (초4-2)
   Claude 분류(2026-09-22): 기준표_초등_질문.md 1~11절 · 초5 마스터 검토 기준 그대로. 원천 작업도구/질문계단/e4/spec_e42.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e4-2_2026-09-22b', data:{
"format": "qr-plan-2",
"grade": "e4-2",
"rounds": 3,
"items": [
{
"id": "1vv921z:t0L1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분모가 같은 분수끼리 더할 때 어떻게 계산해?",
"newQBy": "claude",
"answer": "분모는 그대로 두고 분자끼리 더해.",
"keys": [
"분모는 그대로",
"분자끼리 더한다"
],
"answerBy": "claude"
},
{
"id": "1vv921z:t0L2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3/6 + 2/6을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "분모 6은 그대로 두고 분자끼리 3 + 2 = 5를 더해서 5/6이야.",
"keys": [
"분모는 그대로 6",
"분자끼리 더해 5/6"
],
"answerBy": "claude"
},
{
"id": "1vv921z:t0L3",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1vv921z:t0H1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "분모가 같은 분수를 더할 때 분모는 그대로 두고 분자만 더하는 이유를 피자로 예를 들어 설명해 봐.",
"newQBy": "claude",
"answer": "분모는 피자 한 판을 몇 조각으로 나눴는지라서 조각의 크기는 그대로야. 1/6 조각 3개와 2개를 모으면 1/6 조각이 5개니까 5/6이야.",
"keys": [
"분모는 조각의 크기라 그대로",
"분자는 조각의 개수라 더한다"
],
"answerBy": "claude"
},
{
"id": "1vv921z:t0H2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "5/6 + 2/6처럼 합이 1보다 커지면 어떻게 마무리해?",
"newQBy": "claude",
"answer": "분자끼리 더하면 7/6인데 가분수니까 대분수 1과 1/6로 바꿔.",
"keys": [
"7/6은 가분수",
"대분수 1과 1/6로 바꾼다"
],
"answerBy": "claude"
},
{
"id": "1vv921z:qrecall",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1vv921z:qreason",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1vv921z:qexample",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "분모가 7인 진분수 두 개를 더해서 합이 1보다 커지는 덧셈식을 네가 하나 만들어 계산해 봐.",
"newQBy": "claude",
"answer": "예를 들어 4/7 + 5/7 = 9/7 = 1과 2/7이야. 분자의 합이 7보다 크면 돼.",
"keys": [
"분자의 합이 7보다 크게",
"가분수를 대분수로"
],
"answerBy": "claude"
},
{
"id": "1vv921z:qcondition",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1vv921z:qerror",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3/6 + 2/6을 분모끼리도 더해서 5/12라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분모는 조각의 크기라서 더하면 안 돼. 분모 6은 그대로 두고 분자만 더해서 5/6이야.",
"keys": [
"분모는 더하지 않는다",
"5/6"
],
"answerBy": "claude"
},
{
"id": "1vv921z:qa22e4211",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "강호는 실을 5/16 m, 서희는 6/16 m 사용했어. 두 사람이 사용한 실은 모두 몇 m야? 식과 답을 말해 봐.",
"answer": "5/16 + 6/16 = 11/16이니까 모두 11/16 m야.",
"keys": [
"5/16 + 6/16",
"11/16 m"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:t0L1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "2와 1/4 + 1과 2/4를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "자연수끼리 2 + 1 = 3, 분수끼리 1/4 + 2/4 = 3/4을 더해서 3과 3/4이야.",
"keys": [
"자연수끼리 더한다",
"분수끼리 더한다"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:t0L2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "대분수끼리 더했더니 분수 부분이 가분수가 됐어. 어떻게 해?",
"newQBy": "claude",
"answer": "분수 부분의 가분수를 대분수로 바꿔서 1을 자연수 부분에 더해.",
"keys": [
"분수 부분을 대분수로 바꾼다",
"1을 자연수 부분에 더한다"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:t0H1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1o4hyjt:t0H2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "1과 3/4 + 1과 2/4를 대분수를 가분수로 바꾸어 더하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "1과 3/4은 7/4, 1과 2/4는 6/4야. 7/4 + 6/4 = 13/4이고, 대분수로 바꾸면 3과 1/4이야.",
"keys": [
"가분수로 바꾼다",
"분자끼리 더하고 대분수로"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:qrecall",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1o4hyjt:qreason",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "1과 3/5 + 2와 4/5에서 분수 부분 3/5 + 4/5가 7/5이 돼. 여기서 자연수 1이 생기는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "7/5은 5/5와 2/5을 더한 거고 5/5는 1이야. 그래서 1이 생기고, 답은 4와 2/5야.",
"keys": [
"5/5 = 1",
"답 4와 2/5"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:qexample",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1o4hyjt:qcondition",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1o4hyjt:qerror",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 1과 2/5 + 2와 4/5를 계산해서 3과 6/5라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분수 부분 6/5은 1보다 크니까 1과 1/5로 바꿔서 자연수에 1을 더해야 해. 바른 답은 4와 1/5야.",
"keys": [
"6/5을 1과 1/5로",
"4와 1/5"
],
"answerBy": "claude"
},
{
"id": "1o4hyjt:qa22e4221",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (2)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "무게가 1과 6/10 kg인 상자에 자갈 4와 7/10 kg을 넣었어. 자갈을 넣은 상자의 무게는 몇 kg이야? 식과 답을 말해 봐.",
"answer": "1과 6/10 + 4와 7/10 = 5와 13/10 = 6과 3/10이니까 6과 3/10 kg이야.",
"keys": [
"1과 6/10 + 4와 7/10",
"6과 3/10 kg"
],
"answerBy": "claude"
},
{
"id": "on02hi:t0L1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분모가 같은 분수끼리 뺄 때 어떻게 계산해?",
"newQBy": "claude",
"answer": "분모는 그대로 두고 분자끼리 빼.",
"keys": [
"분모는 그대로",
"분자끼리 뺀다"
],
"answerBy": "claude"
},
{
"id": "on02hi:t0L2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "6/8 − 1/8을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "분모 8은 그대로 두고 분자끼리 6 − 1 = 5를 빼서 5/8이야.",
"keys": [
"분모는 그대로 8",
"5/8"
],
"answerBy": "claude"
},
{
"id": "on02hi:t0H1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "on02hi:t0H2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "분모가 같은 분수의 뺄셈은 덧셈과 어떤 점이 비슷해?",
"newQBy": "claude",
"answer": "둘 다 분모는 그대로 두고 분자끼리 계산해. 덧셈은 분자끼리 더하고, 뺄셈은 분자끼리 빼.",
"keys": [
"분모는 그대로",
"분자끼리 계산한다"
],
"answerBy": "claude"
},
{
"id": "on02hi:qrecall",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "on02hi:qreason",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "on02hi:qexample",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "분모가 9인 두 분수를 빼서 3/9가 되는 뺄셈식을 네가 만들어 봐.",
"newQBy": "claude",
"answer": "예를 들어 7/9 − 4/9 = 3/9야. 분자끼리 뺀 값이 3이면 돼.",
"keys": [
"분자의 차가 3",
"예: 7/9 − 4/9"
],
"answerBy": "claude"
},
{
"id": "on02hi:qerror",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "on02hi:qa22e4231",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "1 − 3/8을 계산하는 과정을 말해 봐.",
"answer": "1을 8/8로 바꿔서 8/8 − 3/8 = 5/8이야.",
"keys": [
"1을 8/8로 바꾼다",
"5/8"
],
"answerBy": "claude"
},
{
"id": "on02hi:qa22e4232",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "주스 1 L 중에서 4/10 L를 마셨어. 남은 주스는 몇 L야? 식과 답을 말해 봐.",
"answer": "1 − 4/10 = 10/10 − 4/10 = 6/10이니까 6/10 L야.",
"keys": [
"1 − 4/10",
"6/10 L"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:t0L1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3과 5/8 − 1과 3/8을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "자연수끼리 3 − 1 = 2, 분수끼리 5/8 − 3/8 = 2/8이니까 2와 2/8이야.",
"keys": [
"자연수끼리 뺀다",
"분수끼리 뺀다"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:t0L2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3 − 1과 3/4을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "3을 2와 4/4로 바꿔서 자연수끼리 2 − 1 = 1, 분수끼리 4/4 − 3/4 = 1/4이니까 1과 1/4이야.",
"keys": [
"3을 2와 4/4로",
"1과 1/4"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:t0H1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kamf0o:t0H2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "4 − 1과 2/5를 두 수를 모두 가분수로 바꾸어 빼는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "4는 20/5, 1과 2/5는 7/5야. 20/5 − 7/5 = 13/5이고, 대분수로 바꾸면 2와 3/5이야.",
"keys": [
"가분수로 바꾼다",
"13/5 = 2와 3/5"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:qrecall",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1kamf0o:qreason",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "3 − 1과 3/4을 계산할 때 왜 자연수 1을 4/4로 바꿔야 해?",
"newQBy": "claude",
"answer": "3에는 분수 부분이 없어서 3/4을 뺄 수 없어. 1을 4/4로 바꾸면 분수끼리 뺄 수 있어.",
"keys": [
"분수 부분이 없어 뺄 수 없다",
"1을 4/4로 바꾸면 뺄 수 있다"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:qexample",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1kamf0o:qcondition",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "5 − 2와 3/7을 계산할 때 자연수 1을 어떤 가분수로 바꿔야 해? 왜 그런지도 말해 봐.",
"newQBy": "claude",
"answer": "7/7로 바꿔야 해. 빼는 분수의 분모가 7이라서 분모를 같게 해야 분자끼리 뺄 수 있어.",
"keys": [
"7/7로 바꾼다",
"빼는 분수와 분모를 같게"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:qerror",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3 − 1과 3/4을 자연수끼리만 빼서 2라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "3/4은 빼지 않았어. 3을 2와 4/4로 바꿔서 빼면 1과 1/4이야.",
"keys": [
"3/4을 빼지 않았다",
"1과 1/4"
],
"answerBy": "claude"
},
{
"id": "1kamf0o:qa22e4241",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "쌀가루 5 kg 중에서 가래떡을 만드는 데 3과 5/7 kg을 썼어. 남은 쌀가루는 몇 kg이야? 식과 답을 말해 봐.",
"answer": "5 − 3과 5/7 = 4와 7/7 − 3과 5/7 = 1과 2/7이니까 1과 2/7 kg이야.",
"keys": [
"5 − 3과 5/7",
"1과 2/7 kg"
],
"answerBy": "claude"
},
{
"id": "dqd0ou:t0L1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3과 1/4 − 1과 3/4처럼 분수 부분끼리 뺄 수 없을 때 어떻게 해?",
"newQBy": "claude",
"answer": "자연수 3에서 1을 4/4로 바꿔 분수에 더하면 2와 5/4가 돼. 그다음 자연수끼리 2 − 1 = 1, 분수끼리 5/4 − 3/4 = 2/4니까 1과 2/4야.",
"keys": [
"자연수에서 1을 가분수로 바꿔 분수에 더한다",
"1과 2/4"
],
"answerBy": "claude"
},
{
"id": "dqd0ou:t0L2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dqd0ou:t0H1",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dqd0ou:t0H2",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "분수의 받아내림은 세 자리 수 뺄셈의 받아내림과 어떤 점이 비슷해?",
"newQBy": "claude",
"answer": "둘 다 아랫자리에서 뺄 수 없으면 윗자리에서 1을 빌려 와. 분수는 빌려 온 1을 4/4처럼 분모만큼의 가분수로 바꾸고, 세 자리 수는 10으로 바꿔.",
"keys": [
"뺄 수 없으면 윗자리에서 빌린다",
"1을 4/4처럼 바꿔 더한다"
],
"answerBy": "claude"
},
{
"id": "dqd0ou:qrecall",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "dqd0ou:qreason",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "dqd0ou:qexample",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "dqd0ou:qerror",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3과 1/4 − 1과 3/4에서 1/4에서 3/4을 뺄 수 없으니까 거꾸로 빼서 2와 2/4라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "작은 분수에서 큰 분수를 거꾸로 빼면 안 돼. 3에서 1을 받아내려 2와 5/4 − 1과 3/4 = 1과 2/4야.",
"keys": [
"거꾸로 빼면 안 된다",
"1과 2/4"
],
"answerBy": "claude"
},
{
"id": "dqd0ou:qa22e4251",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "4와 1/5 − 1과 3/5을 두 가지 방법으로 계산하는 과정을 말해 봐.",
"answer": "방법 1은 4와 1/5을 3과 6/5로 바꿔서 3과 6/5 − 1과 3/5 = 2와 3/5이야. 방법 2는 가분수로 바꿔서 21/5 − 8/5 = 13/5 = 2와 3/5이야.",
"keys": [
"자연수에서 1을 받아내린다",
"가분수로 바꿔 뺀다"
],
"answerBy": "claude"
},
{
"id": "dqd0ou:qa22e4252",
"big": "1. 분수의 덧셈과 뺄셈",
"small": "05. 분수의 뺄셈 (3)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "학교에서 집까지는 2와 3/11 km이고, 도서관에서 집까지는 9/11 km야. 도서관이 학교와 집 사이의 길 위에 있을 때 학교에서 도서관까지는 몇 km야? 식과 답을 말해 봐.",
"answer": "2와 3/11 − 9/11 = 1과 14/11 − 9/11 = 1과 5/11이니까 1과 5/11 km야.",
"keys": [
"2와 3/11 − 9/11",
"1과 5/11 km"
],
"answerBy": "claude"
},
{
"id": "1h45dum:t0L1",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "이등변삼각형은 어떤 삼각형이야?",
"newQBy": "claude",
"answer": "두 변의 길이가 같은 삼각형이야.",
"keys": [
"두 변의 길이가 같다"
],
"answerBy": "claude"
},
{
"id": "1h45dum:t0L2",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "정삼각형은 어떤 삼각형이야?",
"newQBy": "claude",
"answer": "세 변의 길이가 모두 같은 삼각형이야.",
"keys": [
"세 변의 길이가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "1h45dum:t0H1",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1h45dum:t0H2",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "정삼각형도 이등변삼각형이라고 할 수 있어. 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "정삼각형은 세 변이 모두 같으니까 두 변의 길이가 같다는 조건도 맞아. 그래서 이등변삼각형이기도 해.",
"keys": [
"세 변이 같으면 두 변도 같다",
"이등변삼각형의 조건에 맞는다"
],
"answerBy": "claude"
},
{
"id": "1h45dum:qrecall",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1h45dum:qreason",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1h45dum:qexample",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "두 변만 길이가 같은 이등변삼각형의 세 변의 길이를 네가 정해서 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 5 cm, 5 cm, 3 cm야. 두 변만 같고 나머지 한 변은 달라.",
"keys": [
"두 변만 같게",
"예: 5 cm, 5 cm, 3 cm"
],
"answerBy": "claude"
},
{
"id": "1h45dum:qcondition",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1h45dum:qerror",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1h45dum:qa22e4211",
"big": "2. 삼각형",
"small": "01. 변의 길이에 따라 삼각형 분류하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "세 변의 길이의 합이 27 cm인 정삼각형이 있어. 한 변의 길이는 몇 cm야? 어떻게 구했는지 말해 봐.",
"answer": "정삼각형은 세 변의 길이가 같으니까 27 ÷ 3 = 9, 한 변은 9 cm야.",
"keys": [
"세 변의 길이가 같다",
"27 ÷ 3 = 9 cm"
],
"answerBy": "claude"
},
{
"id": "wa7fit:t0L1",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "이등변삼각형에서 크기가 같은 두 각은 어디에 있어?",
"newQBy": "claude",
"answer": "길이가 같은 두 변에 있는 두 각, 곧 나머지 한 변의 양 끝에 있는 두 각이 같아.",
"keys": [
"길이가 같은 두 변에 있는 두 각"
],
"answerBy": "claude"
},
{
"id": "wa7fit:t0L2",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wa7fit:t0H1",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "이등변삼각형 모양의 종이를 반으로 접어서 두 각의 크기가 같다는 것을 어떻게 확인해?",
"newQBy": "claude",
"answer": "길이가 같은 두 변이 겹치게 반으로 접으면 두 각이 완전히 겹쳐. 그래서 두 각의 크기가 같아.",
"keys": [
"길이가 같은 두 변이 겹치게 접는다",
"두 각이 완전히 겹친다"
],
"answerBy": "claude"
},
{
"id": "wa7fit:t0H2",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "이등변삼각형에서 크기가 같은 두 각 중 하나가 40°야. 나머지 한 각을 구하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "다른 한 각도 40°야. 세 각의 합 180°에서 40°를 두 번 빼면 100°야.",
"keys": [
"다른 한 각도 40°",
"180° − 40° − 40° = 100°"
],
"answerBy": "claude"
},
{
"id": "wa7fit:qrecall",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "wa7fit:qreason",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "wa7fit:qexample",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "wa7fit:qcondition",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "이등변삼각형에서 길이가 같은 두 변 사이의 각이 80°야. 나머지 두 각은 어떻게 구해?",
"newQBy": "claude",
"answer": "나머지 두 각은 크기가 같아. 180° − 80° = 100°를 둘로 똑같이 나누면 각각 50°야.",
"keys": [
"나머지 두 각은 같다",
"(180° − 80°) ÷ 2 = 50°"
],
"answerBy": "claude"
},
{
"id": "wa7fit:qerror",
"big": "2. 삼각형",
"small": "02. 이등변삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:t0L1",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "정삼각형의 세 각의 크기는 어때?",
"newQBy": "claude",
"answer": "세 각의 크기가 모두 같아.",
"keys": [
"세 각의 크기가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "8cn1lo:t0L2",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "정삼각형의 한 각은 몇 도야? 어떻게 알 수 있어?",
"newQBy": "claude",
"answer": "60°야. 세 각의 합 180°를 3으로 똑같이 나누면 돼.",
"keys": [
"180° ÷ 3",
"60°"
],
"answerBy": "claude"
},
{
"id": "8cn1lo:t0H1",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:t0H2",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:qrecall",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:qreason",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:qexample",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "8cn1lo:qerror",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 큰 정삼각형은 한 각이 90°쯤 될 거라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "정삼각형은 크기와 상관없이 세 각이 모두 같고 합이 180°라서 한 각은 항상 60°야.",
"keys": [
"크기와 상관없다",
"한 각은 항상 60°"
],
"answerBy": "claude"
},
{
"id": "8cn1lo:qa22e4231",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "자와 컴퍼스로 정삼각형을 그리는 방법을 얘기해 줘.",
"answer": "선분을 하나 긋고, 두 끝점을 각각 중심으로 선분 길이만큼 원을 그려. 두 원이 만나는 점과 선분의 두 끝점을 이으면 돼.",
"keys": [
"두 끝점을 중심으로 선분 길이만큼 원",
"만나는 점과 두 끝점을 잇는다"
],
"answerBy": "claude"
},
{
"id": "8cn1lo:qa22e4232",
"big": "2. 삼각형",
"small": "03. 정삼각형의 성질",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 변이 7 cm인 정삼각형 2개를 겹치지 않게 이어 붙여 사각형을 만들었어. 만든 사각형의 네 변의 길이의 합은 몇 cm야? 어떻게 구했는지 말해 봐.",
"answer": "이어 붙인 변은 안쪽에 들어가서 둘레는 7 cm인 변 4개야. 7 × 4 = 28 cm야.",
"keys": [
"바깥쪽 변은 4개",
"28 cm"
],
"answerBy": "claude"
},
{
"id": "1f3b02w:t0L1",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "예각삼각형은 어떤 삼각형이야?",
"newQBy": "claude",
"answer": "세 각이 모두 예각인 삼각형이야.",
"keys": [
"세 각이 모두 예각"
],
"answerBy": "claude"
},
{
"id": "1f3b02w:t0L2",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "직각삼각형과 둔각삼각형은 각각 어떤 삼각형이야?",
"newQBy": "claude",
"answer": "한 각이 직각이면 직각삼각형, 한 각이 둔각이면 둔각삼각형이야.",
"keys": [
"한 각이 직각",
"한 각이 둔각"
],
"answerBy": "claude"
},
{
"id": "1f3b02w:t0H1",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1f3b02w:t0H2",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "한 삼각형에 둔각이 두 개 있을 수 없는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "둔각은 90°보다 커서 두 개만 더해도 180°가 넘어. 세 각의 합은 180°라서 둔각은 하나뿐이야.",
"keys": [
"둔각은 90°보다 크다",
"세 각의 합이 180°"
],
"answerBy": "claude"
},
{
"id": "1f3b02w:qrecall",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1f3b02w:qreason",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1f3b02w:qexample",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "세 각의 크기를 합이 180°가 되게 네가 정하고, 어떤 삼각형인지 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 30°, 40°, 110°면 한 각이 둔각이라 둔각삼각형이야.",
"keys": [
"세 각의 합 180°",
"각을 보고 이름을 정한다"
],
"answerBy": "claude"
},
{
"id": "1f3b02w:qerror",
"big": "2. 삼각형",
"small": "04. 각의 크기에 따라 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 한 각이 40°인 걸 보고 예각삼각형이라고 했어. 그런데 다른 한 각이 110°였어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "예각삼각형은 세 각이 모두 예각이어야 해. 110°는 둔각이라서 이 삼각형은 둔각삼각형이야.",
"keys": [
"세 각을 모두 봐야 한다",
"둔각삼각형"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:t0L1",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "삼각형을 분류하는 두 가지 기준은 뭐야?",
"newQBy": "claude",
"answer": "변의 길이와 각의 크기야.",
"keys": [
"변의 길이",
"각의 크기"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:t0L2",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lssy6y:t0H1",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "두 변이 5 cm로 같고 한 각이 직각인 삼각형의 이름을 두 가지로 말해 봐.",
"newQBy": "claude",
"answer": "두 변이 같으니 이등변삼각형이고, 한 각이 직각이니 직각삼각형이야.",
"keys": [
"이등변삼각형",
"직각삼각형"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:t0H2",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lssy6y:qrecall",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1lssy6y:qreason",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1lssy6y:qexample",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "이등변삼각형이면서 둔각삼각형인 삼각형의 세 각의 크기를 네가 정해서 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 30°, 30°, 120°야. 두 각이 같아서 이등변삼각형이고, 120°가 둔각이야.",
"keys": [
"두 각을 같게",
"한 각을 둔각으로"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:qcondition",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "정삼각형은 각의 크기로 보면 항상 어떤 삼각형이야? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "세 각이 모두 60°라서 예각이니까 항상 예각삼각형이야.",
"keys": [
"세 각이 모두 60°",
"항상 예각삼각형"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:qerror",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 이등변삼각형이니까 예각삼각형이라고는 부를 수 없다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "삼각형은 변과 각 두 기준으로 이름을 함께 붙일 수 있어. 세 각이 모두 예각인 이등변삼각형은 예각삼각형이기도 해.",
"keys": [
"두 기준으로 함께 붙인다",
"이등변이면서 예각삼각형일 수 있다"
],
"answerBy": "claude"
},
{
"id": "1lssy6y:qa22e4251",
"big": "2. 삼각형",
"small": "05. 두 가지 기준으로 삼각형 분류하기",
"kind": "add",
"round": 3,
"by": "claude",
"q": "문제에서 삼각형이 나온다면 이름을 알아내려고 가장 먼저 살펴봐야 하는 두 가지는 뭐야?",
"answer": "변의 길이가 같은지와, 각이 예각인지 직각인지 둔각인지를 봐. 모르는 각은 세 각의 합 180°로 구해.",
"keys": [
"변의 길이",
"각의 크기(모르면 180°로 구한다)"
],
"answerBy": "claude"
},
{
"id": "11jvn30:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분수 1/100을 소수로 어떻게 쓰고 읽어?",
"newQBy": "claude",
"answer": "0.01이라 쓰고 영 점 영일이라고 읽어.",
"keys": [
"0.01",
"영 점 영일"
],
"answerBy": "claude"
},
{
"id": "11jvn30:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "11jvn30:t0L3",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1.27에서 각 자리 숫자는 얼마를 나타내?",
"newQBy": "claude",
"answer": "1은 1, 2는 0.2, 7은 0.07을 나타내. 그래서 1.27 = 1 + 0.2 + 0.07이야.",
"keys": [
"2는 0.2",
"7은 0.07"
],
"answerBy": "claude"
},
{
"id": "11jvn30:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "11jvn30:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "11jvn30:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "11jvn30:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "11jvn30:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "소수 두 자리 수를 네가 하나 만들어서 각 자리 숫자가 얼마를 나타내는지 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 3.58에서 3은 3, 5는 0.5, 8은 0.08을 나타내.",
"keys": [
"소수 첫째 자리는 0.1이 몇 개",
"소수 둘째 자리는 0.01이 몇 개"
],
"answerBy": "claude"
},
{
"id": "11jvn30:qcondition",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "0.1과 0.01 중 어느 게 더 커? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "0.1이 더 커. 0.1은 0.01이 10개 모인 수야.",
"keys": [
"0.1이 더 크다",
"0.1은 0.01이 10개"
],
"answerBy": "claude"
},
{
"id": "11jvn30:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "01. 소수 두 자리 수",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 1.27의 7이 0.7을 나타낸다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "7은 소수 둘째 자리 숫자라서 0.07을 나타내. 0.7은 소수 첫째 자리에 있을 때야.",
"keys": [
"소수 둘째 자리",
"0.07"
],
"answerBy": "claude"
},
{
"id": "1w7jc7f:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분수 1/1000을 소수로 어떻게 쓰고 읽어?",
"newQBy": "claude",
"answer": "0.001이라 쓰고 영 점 영영일이라고 읽어.",
"keys": [
"0.001",
"영 점 영영일"
],
"answerBy": "claude"
},
{
"id": "1w7jc7f:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "4.219에서 숫자 9는 어느 자리 숫자이고 얼마를 나타내?",
"newQBy": "claude",
"answer": "소수 셋째 자리 숫자라서 0.009를 나타내.",
"keys": [
"소수 셋째 자리",
"0.009"
],
"answerBy": "claude"
},
{
"id": "1w7jc7f:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1w7jc7f:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "5.555에는 숫자 5가 네 번 나와. 각각 얼마를 나타내는지 말해 봐.",
"newQBy": "claude",
"answer": "앞에서부터 5, 0.5, 0.05, 0.005를 나타내. 같은 숫자라도 자리에 따라 나타내는 값이 달라.",
"keys": [
"자리에 따라 값이 다르다",
"5, 0.5, 0.05, 0.005"
],
"answerBy": "claude"
},
{
"id": "1w7jc7f:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1w7jc7f:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1w7jc7f:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1w7jc7f:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 4.219의 9가 0.09를 나타낸다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "9는 소수 셋째 자리 숫자라서 0.009야. 0.09는 소수 둘째 자리 값이야.",
"keys": [
"소수 셋째 자리",
"0.009"
],
"answerBy": "claude"
},
{
"id": "1w7jc7f:qa22e4221",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "02. 소수 세 자리 수",
"kind": "add",
"round": 2,
"by": "claude",
"q": "1이 3개, 0.1이 2개, 0.01이 7개, 0.001이 4개인 수는 얼마야? 어떻게 알았는지 말해 봐.",
"answer": "각 개수를 그 자리에 차례로 쓰면 3.274야.",
"keys": [
"자리마다 개수를 쓴다",
"3.274"
],
"answerBy": "claude"
},
{
"id": "qb7py2:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "두 소수의 크기는 어느 자리부터 비교해?",
"newQBy": "claude",
"answer": "자연수 부분부터 비교하고, 같으면 소수 첫째 자리, 둘째 자리 차례로 높은 자리부터 비교해.",
"keys": [
"자연수 부분부터",
"높은 자리부터 차례로"
],
"answerBy": "claude"
},
{
"id": "qb7py2:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qb7py2:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qb7py2:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qb7py2:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "qb7py2:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"answer": "0.3은 0.1이 3개이고 0.1은 0.01이 10개라서, 0.3은 0.01이 30개인 0.30과 같아.",
"keys": [
"0.1은 0.01이 10개",
"소수 끝의 0은 크기를 바꾸지 않는다"
],
"answerBy": "claude"
},
{
"id": "qb7py2:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "소수점 아래 자리 수가 다른 두 소수를 네가 만들고, 어느 것이 더 큰지 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 0.5와 0.48이면 소수 첫째 자리에서 5 > 4라서 0.5가 더 커.",
"keys": [
"높은 자리부터 비교",
"자리 수가 많다고 크지 않다"
],
"answerBy": "claude"
},
{
"id": "qb7py2:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 0.9와 0.42 중 숫자가 더 많은 0.42가 더 크다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "소수는 숫자가 많다고 큰 게 아니야. 소수 첫째 자리에서 9 > 4라서 0.9가 더 커.",
"keys": [
"숫자가 많다고 크지 않다",
"0.9가 더 크다"
],
"answerBy": "claude"
},
{
"id": "qb7py2:qa22e4231",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "add",
"round": 1,
"by": "claude",
"q": "7.532와 7.538 중 어느 수가 더 커? 어떻게 비교했는지 말해 봐.",
"answer": "자연수 부분과 소수 첫째·둘째 자리가 같고, 소수 셋째 자리에서 2 < 8이라서 7.538이 더 커.",
"keys": [
"높은 자리부터 비교",
"7.538이 더 크다"
],
"answerBy": "claude"
},
{
"id": "qb7py2:qa22e4232",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "03. 소수의 크기 비교",
"kind": "add",
"round": 2,
"by": "claude",
"q": "수 카드 2, 4, 6과 소수점 카드를 한 번씩 써서 소수 한 자리 수를 만들 때, 가장 큰 수와 가장 작은 수는 어떻게 만들어?",
"answer": "가장 큰 수는 큰 수부터 차례로 놓아 64.2, 가장 작은 수는 작은 수부터 차례로 놓아 24.6이야.",
"keys": [
"큰 수를 높은 자리에",
"64.2와 24.6"
],
"answerBy": "claude"
},
{
"id": "12ej6cd:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "12ej6cd:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "어떤 소수를 10배 하면 소수점을 기준으로 수가 어느 쪽으로 움직여?",
"newQBy": "claude",
"answer": "왼쪽으로 한 자리 움직여. 예를 들어 0.37을 10배 하면 3.7이야.",
"keys": [
"왼쪽으로 한 자리"
],
"answerBy": "claude"
},
{
"id": "12ej6cd:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "12ej6cd:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "수를 1/10로 하면 소수점을 기준으로 수가 어느 쪽으로 움직여? 5.2를 예로 말해 봐.",
"newQBy": "claude",
"answer": "오른쪽으로 한 자리 움직여. 5.2의 1/10은 0.52야.",
"keys": [
"오른쪽으로 한 자리",
"0.52"
],
"answerBy": "claude"
},
{
"id": "12ej6cd:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "12ej6cd:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 1,
"newQ": "0.4는 0.04의 몇 배야? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "10배야. 0.04를 10배 하면 수가 왼쪽으로 한 자리 움직여서 0.4가 돼.",
"keys": [
"10배",
"왼쪽으로 한 자리 움직인다"
],
"answerBy": "claude"
},
{
"id": "12ej6cd:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "12ej6cd:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "04. 소수 사이의 관계",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 0.04를 10배 하면 0.004가 된다고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "10배 하면 수가 커져서 왼쪽으로 움직여야 해. 바른 답은 0.4야. 0.004는 1/10 한 값이야.",
"keys": [
"10배는 왼쪽으로",
"0.4"
],
"answerBy": "claude"
},
{
"id": "qq1pgj:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3.4 + 2.8을 세로로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "소수점을 맞춰 쓰고 자연수의 덧셈처럼 계산해. 4 + 8 = 12라서 1을 받아올리고 3 + 2 + 1 = 6, 소수점을 내려 찍으면 6.2야.",
"keys": [
"소수점을 맞춰 쓴다",
"소수점을 그대로 내려 찍는다"
],
"answerBy": "claude"
},
{
"id": "qq1pgj:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3.5 + 2.4를 0.1이 몇 개인지로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "3.5는 0.1이 35개, 2.4는 0.1이 24개야. 모두 0.1이 59개니까 5.9야.",
"keys": [
"0.1의 개수로 바꾼다",
"5.9"
],
"answerBy": "claude"
},
{
"id": "qq1pgj:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qq1pgj:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qq1pgj:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "qq1pgj:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "소수의 덧셈에서 소수점의 자리를 맞춰 써야 하는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "같은 자리끼리 더해야 해서야. 소수점을 맞추면 일의 자리는 일의 자리끼리, 소수 첫째 자리는 소수 첫째 자리끼리 더하게 돼.",
"keys": [
"같은 자리끼리 더해야 한다"
],
"answerBy": "claude"
},
{
"id": "qq1pgj:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "qq1pgj:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3.5 + 2.4를 35 + 24 = 59로 계산하고 답을 59라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "계산한 뒤 소수점을 내려 찍지 않았어. 0.1이 59개니까 5.9야.",
"keys": [
"소수점을 찍지 않았다",
"5.9"
],
"answerBy": "claude"
},
{
"id": "qq1pgj:qa22e4251",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "05. 소수 한 자리 수의 덧셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "우유를 오전에 0.8 L, 오후에 1.5 L 마셨어. 하루에 마신 우유는 몇 L야? 식과 답을 말해 봐.",
"answer": "0.8 + 1.5 = 2.3이니까 2.3 L야.",
"keys": [
"0.8 + 1.5",
"2.3 L"
],
"answerBy": "claude"
},
{
"id": "fa866w:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "fa866w:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "0.25 + 0.43을 0.01이 몇 개인지로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "0.25는 0.01이 25개, 0.43은 0.01이 43개라서 모두 68개니까 0.68이야.",
"keys": [
"0.01의 개수로 바꾼다",
"0.68"
],
"answerBy": "claude"
},
{
"id": "fa866w:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "2.59 + 1.36을 세로로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "소수점을 맞춰 쓰고, 소수 둘째 자리 9 + 6 = 15라서 1을 받아올려. 소수 첫째 자리 5 + 3 + 1 = 9, 일의 자리 2 + 1 = 3이라서 3.95야.",
"keys": [
"소수점을 맞춰 쓴다",
"받아올림",
"3.95"
],
"answerBy": "claude"
},
{
"id": "fa866w:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "fa866w:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "fa866w:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "fa866w:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "fa866w:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 1.36 + 2.47을 계산해서 1.313이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "6 + 7 = 13에서 1을 받아올리지 않고 13을 그대로 썼어. 받아올려 계산하면 3.83이야.",
"keys": [
"받아올림을 하지 않았다",
"3.83"
],
"answerBy": "claude"
},
{
"id": "fa866w:qa22e4261",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "2.4 + 0.36처럼 소수점 아래 자리 수가 다른 두 소수를 더하는 과정을 말해 봐.",
"answer": "소수점을 맞춰 쓰고 2.4를 2.40으로 봐. 같은 자리끼리 더하면 2.76이야.",
"keys": [
"소수점을 맞춘다",
"빈 자리는 0으로 본다"
],
"answerBy": "claude"
},
{
"id": "fa866w:qa22e4262",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "06. 소수 두 자리 수의 덧셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "강아지는 3.45 kg, 고양이는 2.8 kg이야. 두 동물의 무게를 합하면 몇 kg이야? 식과 답을 말해 봐.",
"answer": "3.45 + 2.8 = 3.45 + 2.80 = 6.25이니까 6.25 kg이야.",
"keys": [
"3.45 + 2.80",
"6.25 kg"
],
"answerBy": "claude"
},
{
"id": "hcf9fu:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf9fu:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "3.7 − 1.2를 0.1이 몇 개인지로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "3.7은 0.1이 37개, 1.2는 0.1이 12개라서 37 − 12 = 25개니까 2.5야.",
"keys": [
"0.1의 개수로 바꾼다",
"2.5"
],
"answerBy": "claude"
},
{
"id": "hcf9fu:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hcf9fu:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "소수의 뺄셈은 덧셈과 어떤 점이 비슷해?",
"newQBy": "claude",
"answer": "둘 다 소수점을 맞춰 쓰고, 자연수처럼 같은 자리끼리 계산한 뒤 소수점을 그대로 내려 찍어.",
"keys": [
"소수점을 맞춘다",
"같은 자리끼리 계산",
"소수점을 내려 찍는다"
],
"answerBy": "claude"
},
{
"id": "hcf9fu:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "hcf9fu:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "hcf9fu:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "hcf9fu:qcondition",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 1,
"newQ": "6.1 − 2.4를 세로로 계산할 때 소수 첫째 자리 1에서 4를 뺄 수 없어. 어떻게 해?",
"newQBy": "claude",
"answer": "일의 자리에서 1을 받아내려 11 − 4 = 7, 일의 자리는 5 − 2 = 3이라서 3.7이야.",
"keys": [
"일의 자리에서 받아내린다",
"3.7"
],
"answerBy": "claude"
},
{
"id": "hcf9fu:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 5.2 − 1.7에서 2에서 7을 뺄 수 없으니까 거꾸로 7에서 2를 빼서 4.5라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "거꾸로 빼면 안 돼. 일의 자리에서 1을 받아내려 12 − 7 = 5, 4 − 1 = 3이니까 3.5야.",
"keys": [
"거꾸로 빼면 안 된다",
"3.5"
],
"answerBy": "claude"
},
{
"id": "hcf9fu:qa22e4271",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "07. 소수 한 자리 수의 뺄셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "설탕 5.2 kg 중에서 1.3 kg을 썼어. 남은 설탕은 몇 kg이야? 식과 답을 말해 봐.",
"answer": "5.2 − 1.3 = 3.9니까 3.9 kg이야.",
"keys": [
"5.2 − 1.3",
"3.9 kg"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:t0L1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "6.52 − 2.37을 세로로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "소수점을 맞춰 써. 소수 둘째 자리 2에서 7을 뺄 수 없어서 소수 첫째 자리에서 받아내려 12 − 7 = 5, 4 − 3 = 1, 6 − 2 = 4라서 4.15야.",
"keys": [
"소수점을 맞춘다",
"받아내림",
"4.15"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:t0L2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "nj2tv1:t0H1",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "nj2tv1:t0H2",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "소수의 받아내림은 세 자리 수 뺄셈의 받아내림과 어떤 점이 비슷해?",
"newQBy": "claude",
"answer": "둘 다 아랫자리에서 뺄 수 없으면 바로 윗자리에서 1을 빌려 와서 10을 더해 계산해.",
"keys": [
"윗자리에서 1을 빌린다",
"10을 더해 계산한다"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:qrecall",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "nj2tv1:qreason",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "nj2tv1:qexample",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "nj2tv1:qcondition",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "4.02 − 1.38처럼 소수 첫째 자리가 0이라 바로 빌려 올 수 없으면 어떻게 해?",
"newQBy": "claude",
"answer": "일의 자리에서 먼저 받아내려 소수 첫째 자리를 10으로 만들고, 거기서 다시 소수 둘째 자리로 받아내려. 12 − 8 = 4, 9 − 3 = 6, 3 − 1 = 2라서 2.64야.",
"keys": [
"일의 자리부터 차례로 받아내린다",
"2.64"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:qerror",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3.52 − 1.68에서 2에서 8을 뺄 수 없으니까 거꾸로 빼서 2.46이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "거꾸로 빼면 안 돼. 받아내려 12 − 8 = 4, 소수 첫째 자리도 받아내려 14 − 6 = 8, 일의 자리 2 − 1 = 1이라서 1.84야.",
"keys": [
"거꾸로 빼면 안 된다",
"1.84"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:qa22e4281",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "리본 4.1 m 중에서 1.25 m를 쓰고, 다시 0.8 m를 썼어. 남은 리본은 몇 m야? 식과 답을 말해 봐.",
"answer": "4.1 − 1.25 = 2.85이고, 2.85 − 0.8 = 2.05니까 2.05 m야.",
"keys": [
"4.1 − 1.25 = 2.85",
"2.85 − 0.8 = 2.05 m"
],
"answerBy": "claude"
},
{
"id": "nj2tv1:qa22e4282",
"big": "3. 소수의 덧셈과 뺄셈",
"small": "08. 소수 두 자리 수의 뺄셈",
"kind": "add",
"round": 3,
"by": "claude",
"q": "문제에서 소수의 덧셈이나 뺄셈이 나오면 계산하기 전에 가장 먼저 확인해야 하는 것은 뭐야?",
"answer": "소수점의 자리를 맞췄는지 확인해. 소수점 아래 자리 수가 다르면 빈 자리에 0이 있다고 생각하고 같은 자리끼리 계산해.",
"keys": [
"소수점의 자리를 맞춘다",
"빈 자리는 0으로 본다"
],
"answerBy": "claude"
},
{
"id": "1kjtpv9:t0L1",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "두 직선이 서로 수직이라는 건 무슨 뜻이야?",
"newQBy": "claude",
"answer": "두 직선이 만나서 이루는 각이 직각이라는 뜻이야.",
"keys": [
"만나서 이루는 각이 직각"
],
"answerBy": "claude"
},
{
"id": "1kjtpv9:t0L2",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "수선은 뭐야?",
"newQBy": "claude",
"answer": "두 직선이 서로 수직일 때 한 직선을 다른 직선에 대한 수선이라고 해.",
"keys": [
"서로 수직인 두 직선",
"한 직선을 다른 직선에 대한 수선이라 한다"
],
"answerBy": "claude"
},
{
"id": "1kjtpv9:t0H1",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kjtpv9:t0H2",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "각도기로 직선 가에 대한 수선을 긋는 방법을 얘기해 줘.",
"newQBy": "claude",
"answer": "각도기의 중심을 직선 가 위의 점 ㄱ에 맞추고 밑금을 직선에 맞춰. 90°가 되는 눈금에 점 ㄴ을 찍고, 점 ㄱ과 점 ㄴ을 이으면 수선이야.",
"keys": [
"각도기 중심과 밑금을 맞춘다",
"90° 눈금에 점을 찍어 잇는다"
],
"answerBy": "claude"
},
{
"id": "1kjtpv9:qrecall",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1kjtpv9:qreason",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1kjtpv9:qexample",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1kjtpv9:qcondition",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "두 직선이 서로 수직인지 확인하려면 어떻게 해?",
"newQBy": "claude",
"answer": "두 직선이 만나서 이루는 각을 삼각자의 직각이나 각도기로 재서 90°인지 확인해.",
"keys": [
"만나서 이루는 각을 잰다",
"90°인지 확인"
],
"answerBy": "claude"
},
{
"id": "1kjtpv9:qerror",
"big": "4. 사각형",
"small": "01. 수직과 수선",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1repvwt:t0L1",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "평행은 무슨 뜻이야?",
"newQBy": "claude",
"answer": "아무리 길게 늘여도 서로 만나지 않는 두 직선을 평행하다고 해.",
"keys": [
"늘여도 만나지 않는 두 직선"
],
"answerBy": "claude"
},
{
"id": "1repvwt:t0L2",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "평행선은 뭐야?",
"newQBy": "claude",
"answer": "평행한 두 직선을 평행선이라고 해.",
"keys": [
"평행한 두 직선"
],
"answerBy": "claude"
},
{
"id": "1repvwt:t0H1",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "한 직선에 수직인 두 직선은 서로 평행해. 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "두 직선이 한 직선과 똑같이 직각으로 만나서 같은 방향으로 뻗어 나가. 그래서 아무리 늘여도 만나지 않아.",
"keys": [
"둘 다 직각으로 만난다",
"같은 방향이라 만나지 않는다"
],
"answerBy": "claude"
},
{
"id": "1repvwt:t0H2",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1repvwt:qrecall",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1repvwt:qreason",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1repvwt:qexample",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1repvwt:qerror",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 두 선분의 길이가 다르니까 평행이 아니라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "평행은 길이와 상관없이 늘여도 만나지 않는지로 정해. 길이가 달라도 평행할 수 있어.",
"keys": [
"길이와 상관없다",
"늘여도 만나지 않으면 평행"
],
"answerBy": "claude"
},
{
"id": "1repvwt:qa22e4221",
"big": "4. 사각형",
"small": "02. 평행과 평행선",
"kind": "add",
"round": 2,
"by": "claude",
"q": "삼각자 2개로 점 ㄱ을 지나고 직선 가와 평행한 직선을 긋는 방법을 얘기해 줘.",
"answer": "한 삼각자의 한 변을 직선 가에 맞추고 다른 삼각자를 붙여 대. 붙인 삼각자를 고정하고 처음 삼각자를 점 ㄱ까지 밀어서 그 변을 따라 그어.",
"keys": [
"한 삼각자를 직선에 맞추고 다른 삼각자를 댄다",
"고정하고 밀어서 긋는다"
],
"answerBy": "claude"
},
{
"id": "1eqmtpm:t0L1",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "평행선 사이의 거리는 무엇이야?",
"newQBy": "claude",
"answer": "평행선의 한 직선에서 다른 직선에 수직인 선분을 그었을 때, 그 선분의 길이야.",
"keys": [
"수직인 선분의 길이"
],
"answerBy": "claude"
},
{
"id": "1eqmtpm:t0L2",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:t0H1",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "평행선 사이의 거리를 비스듬한 선분이 아니라 수직인 선분으로 재는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "평행선 사이의 선분 중에서 수직인 선분이 가장 짧고, 어디서 재도 길이가 같아서야.",
"keys": [
"수직인 선분이 가장 짧다",
"어디서 재도 같다"
],
"answerBy": "claude"
},
{
"id": "1eqmtpm:t0H2",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:qrecall",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:qreason",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:qexample",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:qcondition",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "평행선 사이의 거리를 왼쪽에서 잴 때와 오른쪽에서 잴 때 달라져? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "달라지지 않아. 평행선은 늘 같은 간격이라서 어디서 수직으로 재도 거리가 같아.",
"keys": [
"어디서 재도 같다",
"평행선은 같은 간격"
],
"answerBy": "claude"
},
{
"id": "1eqmtpm:qerror",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1eqmtpm:qa22e4231",
"big": "4. 사각형",
"small": "03. 평행선 사이의 거리",
"kind": "add",
"round": 2,
"by": "claude",
"q": "삼각자로 평행선 사이의 거리를 재는 방법을 얘기해 줘.",
"answer": "삼각자의 직각을 이용해 한 직선에서 다른 직선에 수직인 선분을 긋고, 그 선분의 길이를 자로 재.",
"keys": [
"수직인 선분을 긋는다",
"그 선분의 길이를 잰다"
],
"answerBy": "claude"
},
{
"id": "1d2b3s1:t0L1",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "사다리꼴은 어떤 사각형이야?",
"newQBy": "claude",
"answer": "평행한 변이 있는 사각형이야. 평행한 변이 한 쌍만 있어도 돼.",
"keys": [
"평행한 변이 있는 사각형"
],
"answerBy": "claude"
},
{
"id": "1d2b3s1:t0L2",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:t0H1",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:t0H2",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:qrecall",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:qreason",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:qexample",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:qcondition",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1d2b3s1:qerror",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 평행사변형은 평행한 변이 두 쌍이라서 사다리꼴이 아니라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "평행한 변이 한 쌍이라도 있으면 사다리꼴이야. 평행사변형도 평행한 변이 있으니까 사다리꼴이야.",
"keys": [
"평행한 변이 한 쌍이라도 있으면 사다리꼴",
"평행사변형도 사다리꼴"
],
"answerBy": "claude"
},
{
"id": "1d2b3s1:qa22e4241",
"big": "4. 사각형",
"small": "04. 사다리꼴",
"kind": "add",
"round": 2,
"by": "claude",
"q": "사다리꼴을 그리는 방법을 얘기해 줘.",
"answer": "먼저 서로 평행한 선분 한 쌍을 그어. 그다음 두 선분의 끝을 이어서 네 변이 되게 하면 사다리꼴이야.",
"keys": [
"평행한 선분 한 쌍을 긋는다",
"끝을 이어 사각형을 만든다"
],
"answerBy": "claude"
},
{
"id": "2hbzf:t0L1",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "평행사변형은 어떤 사각형이야?",
"newQBy": "claude",
"answer": "마주 보는 두 쌍의 변이 서로 평행한 사각형이야.",
"keys": [
"마주 보는 두 쌍의 변이 평행"
],
"answerBy": "claude"
},
{
"id": "2hbzf:t0L2",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "평행사변형의 변과 각에는 어떤 성질이 있어?",
"newQBy": "claude",
"answer": "마주 보는 두 변의 길이가 같고, 마주 보는 두 각의 크기가 같아. 이웃한 두 각의 합은 180°야.",
"keys": [
"마주 보는 변의 길이가 같다",
"마주 보는 각의 크기가 같다",
"이웃한 두 각의 합 180°"
],
"answerBy": "claude"
},
{
"id": "2hbzf:t0H1",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2hbzf:t0H2",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2hbzf:qrecall",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "2hbzf:qreason",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "2hbzf:qexample",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "2hbzf:qcondition",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "평행사변형이려면 네 변의 길이가 모두 같아야 해? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "아니야. 마주 보는 두 쌍의 변이 평행하기만 하면 돼. 네 변의 길이가 모두 같으면 마름모야.",
"keys": [
"두 쌍의 변이 평행하면 된다",
"네 변이 같으면 마름모"
],
"answerBy": "claude"
},
{
"id": "2hbzf:qerror",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 평행사변형의 한 각이 70°니까 이웃한 각도 70°라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "70°인 각과 같은 건 마주 보는 각이야. 이웃한 두 각의 합은 180°라서 이웃한 각은 110°야.",
"keys": [
"같은 것은 마주 보는 각",
"이웃한 각은 110°"
],
"answerBy": "claude"
},
{
"id": "2hbzf:qa22e4251",
"big": "4. 사각형",
"small": "05. 평행사변형",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 변이 5 cm, 다른 한 변이 3 cm인 평행사변형의 네 변의 길이의 합은 몇 cm야? 어떻게 구했는지 말해 봐.",
"answer": "마주 보는 변의 길이가 같아서 5 cm가 두 개, 3 cm가 두 개야. (5 + 3) × 2 = 16 cm야.",
"keys": [
"마주 보는 변의 길이가 같다",
"16 cm"
],
"answerBy": "claude"
},
{
"id": "qdglf1:t0L1",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "마름모는 어떤 사각형이야?",
"newQBy": "claude",
"answer": "네 변의 길이가 모두 같은 사각형이야.",
"keys": [
"네 변의 길이가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "qdglf1:t0L2",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qdglf1:t0H1",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "qdglf1:t0H2",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "마름모에서 마주 보는 꼭짓점끼리 이은 두 선분은 어떻게 만나?",
"newQBy": "claude",
"answer": "서로 수직으로 만나고, 서로를 똑같이 둘로 나눠.",
"keys": [
"수직으로 만난다",
"서로를 똑같이 둘로 나눈다"
],
"answerBy": "claude"
},
{
"id": "qdglf1:qrecall",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "qdglf1:qreason",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "네 변의 길이가 모두 같은데 왜 마름모가 정사각형이 아닐 수도 있어?",
"newQBy": "claude",
"answer": "정사각형은 네 각도 모두 직각이어야 하는데, 마름모는 각이 직각이 아닐 수 있어서야.",
"keys": [
"정사각형은 네 각이 직각",
"마름모는 직각이 아닐 수 있다"
],
"answerBy": "claude"
},
{
"id": "qdglf1:qexample",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "qdglf1:qcondition",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "마름모의 두 대각선은 길이도 서로 같아? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "항상 같지는 않아. 두 대각선의 길이가 같은 것은 정사각형일 때야. 보통 마름모는 한 대각선이 더 길어.",
"keys": [
"항상 같지는 않다",
"같은 것은 정사각형일 때"
],
"answerBy": "claude"
},
{
"id": "qdglf1:qerror",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "qdglf1:qa22e4261",
"big": "4. 사각형",
"small": "06. 마름모",
"kind": "add",
"round": 2,
"by": "claude",
"q": "마름모의 한 각이 60°야. 나머지 세 각은 어떻게 구해?",
"answer": "마주 보는 각은 크기가 같아서 60°이고, 이웃한 각은 180° − 60° = 120°야. 그래서 60°, 120°, 60°, 120°야.",
"keys": [
"마주 보는 각은 같다",
"이웃한 각은 180° − 60°"
],
"answerBy": "claude"
},
{
"id": "1c2e69e:t0L1",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "직사각형과 정사각형은 각각 어떤 사각형이야?",
"newQBy": "claude",
"answer": "직사각형은 네 각이 모두 직각인 사각형이고, 정사각형은 네 각이 모두 직각이고 네 변의 길이도 모두 같은 사각형이야.",
"keys": [
"직사각형은 네 각이 직각",
"정사각형은 네 변도 같다"
],
"answerBy": "claude"
},
{
"id": "1c2e69e:t0L2",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1c2e69e:t0H1",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "정사각형이 직사각형이면서 마름모인 이유를 말해 봐.",
"newQBy": "claude",
"answer": "네 각이 모두 직각이라서 직사각형이고, 네 변의 길이가 모두 같아서 마름모야.",
"keys": [
"네 각이 직각이라 직사각형",
"네 변이 같아 마름모"
],
"answerBy": "claude"
},
{
"id": "1c2e69e:t0H2",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1c2e69e:qrecall",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1c2e69e:qreason",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "'모든 정사각형은 직사각형이다'와 '모든 직사각형은 정사각형이다' 중 어느 말이 맞아? 틀린 말은 예를 들어 말해 봐.",
"newQBy": "claude",
"answer": "'모든 정사각형은 직사각형이다'가 맞아. 가로 5 cm, 세로 3 cm인 직사각형은 네 변이 같지 않아서 정사각형이 아니야.",
"keys": [
"정사각형은 직사각형이다",
"틀린 예: 가로·세로가 다른 직사각형"
],
"answerBy": "claude"
},
{
"id": "1c2e69e:qexample",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1c2e69e:qcondition",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "마름모이면서 직사각형인 사각형은 어떤 사각형이야? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "정사각형이야. 네 변이 같아야 마름모이고 네 각이 직각이어야 직사각형인데, 둘 다 되는 건 정사각형이야.",
"keys": [
"정사각형",
"네 변이 같고 네 각이 직각"
],
"answerBy": "claude"
},
{
"id": "1c2e69e:qerror",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1c2e69e:qa22e4271",
"big": "4. 사각형",
"small": "07. 여러 가지 사각형",
"kind": "add",
"round": 3,
"by": "claude",
"q": "문제에서 사각형의 이름을 모두 찾으라고 하면 무엇을 차례로 살펴봐야 하는지 말해 봐.",
"answer": "평행한 변이 몇 쌍인지, 네 변의 길이가 모두 같은지, 네 각이 모두 직각인지를 차례로 봐. 해당하는 이름을 모두 써.",
"keys": [
"평행한 변이 몇 쌍인지",
"네 변의 길이",
"네 각이 직각인지"
],
"answerBy": "claude"
},
{
"id": "fd0rtj:t0L1",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "꺾은선그래프는 어떤 그래프야?",
"newQBy": "claude",
"answer": "연속적으로 변하는 양을 점으로 찍고, 그 점들을 선분으로 이어 그린 그래프야.",
"keys": [
"점으로 찍는다",
"선분으로 잇는다"
],
"answerBy": "claude"
},
{
"id": "fd0rtj:t0L2",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "식물의 월별 키를 나타낸 꺾은선그래프에서 가로와 세로는 각각 무엇을 나타내?",
"newQBy": "claude",
"answer": "가로는 월, 세로는 키를 나타내.",
"keys": [
"가로는 월",
"세로는 키"
],
"answerBy": "claude"
},
{
"id": "fd0rtj:t0H1",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "fd0rtj:t0H2",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "막대그래프와 꺾은선그래프는 각각 어떤 것을 나타내기에 좋아?",
"newQBy": "claude",
"answer": "막대그래프는 자료의 크기를 비교하기 좋고, 꺾은선그래프는 시간에 따라 변하는 모양을 알아보기 좋아.",
"keys": [
"막대그래프는 크기 비교",
"꺾은선그래프는 변화"
],
"answerBy": "claude"
},
{
"id": "fd0rtj:qrecall",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "fd0rtj:qreason",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "fd0rtj:qexample",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "꺾은선그래프로 나타내면 좋은 자료를 하나 말하고, 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "예를 들어 하루 동안 시각별 기온이야. 시간에 따라 변하는 모양을 보기 좋아서 꺾은선그래프가 알맞아.",
"keys": [
"시간에 따라 변하는 자료",
"예: 시각별 기온"
],
"answerBy": "claude"
},
{
"id": "fd0rtj:qcondition",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "fd0rtj:qerror",
"big": "5. 꺾은선그래프",
"small": "01. 꺾은선그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 좋아하는 색깔별 학생 수를 꺾은선그래프로 나타냈어. 뭐가 알맞지 않은지 말해 봐.",
"newQBy": "claude",
"answer": "색깔별 학생 수는 시간에 따라 변하는 자료가 아니라 크기를 비교하는 자료라서 막대그래프가 알맞아.",
"keys": [
"시간에 따라 변하는 자료가 아니다",
"막대그래프가 알맞다"
],
"answerBy": "claude"
},
{
"id": "137fdqh:t0L1",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "꺾은선그래프에서 필요 없는 부분을 생략할 때 무엇을 써?",
"newQBy": "claude",
"answer": "물결선을 써.",
"keys": [
"물결선"
],
"answerBy": "claude"
},
{
"id": "137fdqh:t0L2",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "꺾은선이 많이 기울어질수록 무엇을 뜻해?",
"newQBy": "claude",
"answer": "변화가 크다는 뜻이야.",
"keys": [
"변화가 크다"
],
"answerBy": "claude"
},
{
"id": "137fdqh:t0H1",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "물결선을 넣으면 변화하는 모습이 더 잘 보여. 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "필요 없는 부분을 줄이면 세로 눈금 한 칸의 크기를 작게 할 수 있어서 선분이 더 크게 기울어져 보여.",
"keys": [
"필요 없는 부분을 줄인다",
"눈금 한 칸을 작게 할 수 있다"
],
"answerBy": "claude"
},
{
"id": "137fdqh:t0H2",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "오전 10시에 20 mm, 낮 12시에 30 mm였어. 오전 11시에는 얼마쯤이었을지 어떻게 예상해?",
"newQBy": "claude",
"answer": "두 점을 이은 선분의 가운데쯤이니까, 두 값의 중간인 25 mm쯤으로 예상해.",
"keys": [
"두 점을 이은 선분의 가운데",
"약 25 mm"
],
"answerBy": "claude"
},
{
"id": "137fdqh:qrecall",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "137fdqh:qreason",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "137fdqh:qexample",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "137fdqh:qcondition",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "137fdqh:qerror",
"big": "5. 꺾은선그래프",
"small": "02. 꺾은선그래프의 내용 알아보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 꺾은선이 위쪽에 있는 부분을 보고 여기가 변화가 가장 크다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "위쪽에 있다는 건 값이 크다는 뜻이야. 변화가 가장 큰 곳은 선분이 가장 많이 기울어진 곳이야.",
"keys": [
"위쪽은 값이 큰 것",
"변화는 기울어진 정도로 본다"
],
"answerBy": "claude"
},
{
"id": "1x8fr6b:t0L1",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1x8fr6b:t0L2",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1x8fr6b:t0H1",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "표를 보고 꺾은선그래프를 그리는 순서를 말해 봐.",
"newQBy": "claude",
"answer": "가로와 세로에 무엇을 나타낼지 정하고, 눈금 한 칸의 크기와 물결선을 정해. 그다음 점을 찍고 선분으로 이은 뒤 제목을 써.",
"keys": [
"가로·세로 정하기",
"눈금 정하기",
"점 찍고 잇고 제목"
],
"answerBy": "claude"
},
{
"id": "1x8fr6b:t0H2",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1x8fr6b:qrecall",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1x8fr6b:qreason",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "점을 찍기 전에 왜 세로 눈금 한 칸의 크기부터 정해야 해?",
"newQBy": "claude",
"answer": "눈금 한 칸의 크기가 정해져야 자료 값이 세로 어디에 오는지 알 수 있어서야. 가장 큰 값까지 나타낼 수 있게 정해야 해.",
"keys": [
"눈금이 있어야 점의 위치를 안다",
"가장 큰 값까지 나타낼 수 있게"
],
"answerBy": "claude"
},
{
"id": "1x8fr6b:qexample",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "일주일 동안 매일 잰 키를 꺾은선그래프로 그린다면 가로와 세로에 각각 무엇을 나타낼지 말해 봐.",
"newQBy": "claude",
"answer": "가로에는 날짜, 세로에는 키를 나타내.",
"keys": [
"가로는 날짜",
"세로는 키"
],
"answerBy": "claude"
},
{
"id": "1x8fr6b:qerror",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 요일별 점을 순서 없이 아무렇게나 선분으로 이었어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "꺾은선그래프는 시간에 따라 변하는 모양을 나타내서, 왼쪽부터 차례로 이웃한 점끼리 이어야 해.",
"keys": [
"시간 순서대로 잇는다",
"이웃한 점끼리"
],
"answerBy": "claude"
},
{
"id": "1x8fr6b:qa22e4231",
"big": "5. 꺾은선그래프",
"small": "03. 꺾은선그래프로 나타내기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "월별 판매량이 152개, 157개, 164개, 160개야. 꺾은선그래프에 물결선을 넣는다면 어디에 넣으면 좋은지, 왜 그런지 말해 봐.",
"answer": "가장 작은 값이 152개니까 0개와 150개 사이에 물결선을 넣어. 그 아래는 자료가 없는 필요 없는 부분이야.",
"keys": [
"가장 작은 값보다 아래",
"0개와 150개 사이"
],
"answerBy": "claude"
},
{
"id": "zvlhc9:t0L1",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "꺾은선그래프에서 값이 가장 많이 변한 곳은 어떻게 찾아?",
"newQBy": "claude",
"answer": "선분이 가장 많이 기울어진 곳을 찾아.",
"keys": [
"가장 많이 기울어진 곳"
],
"answerBy": "claude"
},
{
"id": "zvlhc9:t0L2",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "꺾은선이 오른쪽 위로 올라가면 값은 어떻게 변한 거야?",
"newQBy": "claude",
"answer": "값이 늘어난 거야. 오른쪽 아래로 내려가면 줄어든 거야.",
"keys": [
"올라가면 늘어났다",
"내려가면 줄어들었다"
],
"answerBy": "claude"
},
{
"id": "zvlhc9:t0H1",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "zvlhc9:t0H2",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "2020년부터 2024년까지 노트북 판매량이 계속 늘어난 꺾은선그래프가 있어. 2025년 판매량은 어떻게 예상해?",
"newQBy": "claude",
"answer": "지금까지 계속 늘어났으니까 그 흐름이 이어진다고 보고, 2024년보다 늘어날 것이라고 예상해.",
"keys": [
"변화의 흐름을 본다",
"흐름이 이어진다고 예상"
],
"answerBy": "claude"
},
{
"id": "zvlhc9:qrecall",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "zvlhc9:qreason",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "zvlhc9:qexample",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "zvlhc9:qcondition",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "꺾은선이 평평하게 이어지면 무엇을 뜻하는지 말해 봐.",
"newQBy": "claude",
"answer": "값이 변하지 않았다는 뜻이야. 값이 0이라는 뜻은 아니야.",
"keys": [
"값이 변하지 않았다",
"0이라는 뜻은 아니다"
],
"answerBy": "claude"
},
{
"id": "zvlhc9:qerror",
"big": "5. 꺾은선그래프",
"small": "04. 꺾은선그래프 해석하기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "10c4idu:t0L1",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "다각형은 어떤 도형이야?",
"newQBy": "claude",
"answer": "선분으로만 둘러싸인 도형이야.",
"keys": [
"선분으로만 둘러싸인 도형"
],
"answerBy": "claude"
},
{
"id": "10c4idu:t0L2",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "다각형의 이름은 어떻게 정해? 변이 6개인 다각형은 뭐라고 해?",
"newQBy": "claude",
"answer": "변의 수에 따라 이름이 정해져. 변이 6개면 육각형이야.",
"keys": [
"변의 수로 정한다",
"육각형"
],
"answerBy": "claude"
},
{
"id": "10c4idu:t0L3",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10c4idu:t0H1",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10c4idu:t0H2",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "원이나 곡선이 섞인 도형은 왜 다각형이 아니야?",
"newQBy": "claude",
"answer": "다각형은 선분으로만 둘러싸여야 하는데, 곡선이 있어서 다각형이 아니야.",
"keys": [
"선분으로만 둘러싸여야 한다",
"곡선이 있다"
],
"answerBy": "claude"
},
{
"id": "10c4idu:qrecall",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "10c4idu:qreason",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "다각형에서 변의 개수와 꼭짓점의 개수는 어떤 관계야? 오각형으로 예를 들어 말해 봐.",
"newQBy": "claude",
"answer": "변의 개수와 꼭짓점의 개수가 같아. 오각형은 변도 5개, 꼭짓점도 5개야.",
"keys": [
"변과 꼭짓점의 개수가 같다",
"오각형은 5개씩"
],
"answerBy": "claude"
},
{
"id": "10c4idu:qexample",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "10c4idu:qcondition",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "다각형이려면 변의 길이가 모두 같아야 해? 왜 그런지 말해 봐.",
"newQBy": "claude",
"answer": "아니야. 선분으로만 둘러싸이면 다각형이야. 변의 길이와 각의 크기가 모두 같으면 정다각형이라고 해.",
"keys": [
"선분으로만 둘러싸이면 된다",
"모두 같으면 정다각형"
],
"answerBy": "claude"
},
{
"id": "10c4idu:qerror",
"big": "6. 다각형",
"small": "01. 다각형",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:t0L1",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "정다각형은 어떤 다각형이야?",
"newQBy": "claude",
"answer": "변의 길이가 모두 같고 각의 크기도 모두 같은 다각형이야.",
"keys": [
"변의 길이가 모두 같다",
"각의 크기가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "q8epcq:t0L2",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:t0H1",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:t0H2",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "변의 길이는 모두 같은데 각의 크기가 다른 도형은 왜 정다각형이 아니야? 예를 들어 말해 봐.",
"newQBy": "claude",
"answer": "정다각형은 각의 크기도 모두 같아야 해. 마름모는 네 변이 같지만 각이 달라서 정다각형이 아니야.",
"keys": [
"각의 크기도 같아야 한다",
"예: 마름모"
],
"answerBy": "claude"
},
{
"id": "q8epcq:qrecall",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:qreason",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:qexample",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:qcondition",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:qerror",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "q8epcq:qa22e4221",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 변이 5 cm인 정육각형의 모든 변의 길이의 합은 몇 cm야? 어떻게 구했는지 말해 봐.",
"answer": "정육각형은 여섯 변의 길이가 같아서 5 × 6 = 30 cm야.",
"keys": [
"여섯 변의 길이가 같다",
"30 cm"
],
"answerBy": "claude"
},
{
"id": "q8epcq:qa22e4222",
"big": "6. 다각형",
"small": "02. 정다각형",
"kind": "add",
"round": 2,
"by": "claude",
"q": "정사각형과 정오각형의 모든 변의 길이의 합이 같아. 정사각형의 한 변이 5 cm이면 정오각형의 한 변은 몇 cm야?",
"answer": "정사각형의 둘레는 5 × 4 = 20 cm야. 정오각형도 20 cm니까 한 변은 20 ÷ 5 = 4 cm야.",
"keys": [
"정사각형 둘레 20 cm",
"20 ÷ 5 = 4 cm"
],
"answerBy": "claude"
},
{
"id": "flyy7b:t0L1",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "대각선은 무엇이야?",
"newQBy": "claude",
"answer": "다각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분이야.",
"keys": [
"이웃하지 않는 두 꼭짓점을 이은 선분"
],
"answerBy": "claude"
},
{
"id": "flyy7b:t0L2",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "사각형에 그을 수 있는 대각선은 몇 개야? 어떻게 알 수 있어?",
"newQBy": "claude",
"answer": "2개야. 서로 마주 보는 꼭짓점끼리 이으면 두 개가 생겨.",
"keys": [
"2개",
"마주 보는 꼭짓점끼리 잇는다"
],
"answerBy": "claude"
},
{
"id": "flyy7b:t0H1",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "flyy7b:t0H2",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "직사각형, 마름모, 정사각형의 두 대각선은 각각 어떤 성질이 있어?",
"newQBy": "claude",
"answer": "직사각형은 두 대각선의 길이가 같고, 마름모는 두 대각선이 수직으로 만나. 정사각형은 둘 다야.",
"keys": [
"직사각형은 길이가 같다",
"마름모는 수직으로 만난다",
"정사각형은 둘 다"
],
"answerBy": "claude"
},
{
"id": "flyy7b:qrecall",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "flyy7b:qreason",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "꼭짓점이 ㄱ, ㄴ, ㄷ, ㄹ, ㅁ 차례로 있는 오각형에서 꼭짓점 ㄱ에서 그을 수 있는 대각선을 모두 말하고, 선분 ㄱㄴ과 ㄱㅁ을 세지 않는 이유도 말해 봐.",
"newQBy": "claude",
"answer": "선분 ㄱㄷ과 ㄱㄹ이야. 선분 ㄱㄴ과 ㄱㅁ은 이웃한 꼭짓점을 이은 변이라서 대각선이 아니야.",
"keys": [
"ㄱㄷ과 ㄱㄹ",
"이웃한 꼭짓점을 이으면 변이다"
],
"answerBy": "claude"
},
{
"id": "flyy7b:qexample",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "flyy7b:qcondition",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "flyy7b:qerror",
"big": "6. 다각형",
"small": "03. 대각선",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:t0L1",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "모양 조각을 이어 붙여 새로운 모양을 만들 때 어떻게 붙여야 해?",
"newQBy": "claude",
"answer": "조각의 변과 변이 꼭 맞닿게 이어 붙여.",
"keys": [
"변과 변이 맞닿게"
],
"answerBy": "claude"
},
{
"id": "10kztdr:t0L2",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "모양 조각으로 주어진 모양을 채울 때 지켜야 할 것은 뭐야?",
"newQBy": "claude",
"answer": "빈틈없이, 서로 겹치지 않게 채워야 해.",
"keys": [
"빈틈없이",
"겹치지 않게"
],
"answerBy": "claude"
},
{
"id": "10kztdr:t0H1",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:t0H2",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qrecall",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qreason",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qexample",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qcondition",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qerror",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "10kztdr:qa22e4241",
"big": "6. 다각형",
"small": "04. 모양 만들기, 모양 채우기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "사다리꼴 모양 조각 1개를 정삼각형 모양 조각으로 채우려면 몇 개가 필요해? 어떻게 알았는지 말해 봐.",
"answer": "3개야. 사다리꼴 조각은 정삼각형 조각 3개를 이어 붙인 모양이야.",
"keys": [
"3개",
"정삼각형 조각 3개로 나뉜다"
],
"answerBy": "claude"
}
],
"seen": []
}});
