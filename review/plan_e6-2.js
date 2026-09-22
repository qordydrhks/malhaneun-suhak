/* 질문 고르기 — 기본으로 실어 두는 분류안 (초6-2)
   Claude 분류(2026-09-22): 기준표_초등_질문.md 1~11절 · 초5 마스터 검토 기준 그대로. 원천 작업도구/질문계단/e6/spec_e62.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-22b', data:{
"format": "qr-plan-2",
"grade": "e6-2",
"rounds": 3,
"items": [
{
"id": "4tqc50:t0L1",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "4/5 ÷ 1/5는 무엇을 세어서 구해?",
"newQBy": "claude",
"answer": "4/5에서 1/5을 몇 번 덜어 낼 수 있는지 세. 1/5이 4번 들어가니까 4야.",
"keys": [
"1/5을 몇 번 덜어 낼 수 있는지",
"답 4"
],
"answerBy": "claude"
},
{
"id": "4tqc50:t0L2",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분모가 같은 분수끼리 나눌 때 어떻게 계산해?",
"newQBy": "claude",
"answer": "분모가 같으면 분자끼리 나누면 돼.",
"keys": [
"분자끼리 나눈다"
],
"answerBy": "claude"
},
{
"id": "4tqc50:t0H1",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "6/7 ÷ 3/7 = 6 ÷ 3 = 2가 되는 이유를 1/7이 몇 개인지로 설명해 봐.",
"newQBy": "claude",
"answer": "6/7은 1/7이 6개, 3/7은 1/7이 3개야. 6개를 3개씩 덜어 내면 2번이니까 6 ÷ 3 = 2야.",
"keys": [
"6/7은 1/7이 6개, 3/7은 3개",
"6 ÷ 3 = 2"
],
"answerBy": "claude"
},
{
"id": "4tqc50:t0H2",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "8/9 ÷ 1/9와 8/9 ÷ 2/9 중 어느 몫이 더 큰지, 계산하지 않고 이유로 말해 봐.",
"newQBy": "claude",
"answer": "나누는 수가 작을수록 여러 번 덜어 낼 수 있어. 1/9이 2/9보다 작으니까 8/9 ÷ 1/9의 몫이 더 커.",
"keys": [
"나누는 수가 작을수록 몫이 크다",
"8/9 ÷ 1/9이 더 크다"
],
"answerBy": "claude"
},
{
"id": "4tqc50:qrecall",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "4tqc50:qreason",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "4tqc50:qexample",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "4tqc50:qerror",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 6/7 ÷ 2/7을 분모끼리도 나눠서 3/1이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분모가 같으면 분자끼리만 나눠. 6 ÷ 2 = 3이니까 답은 3이야. 분모끼리 나누는 게 아니야.",
"keys": [
"분자끼리만 나눈다",
"답 3"
],
"answerBy": "claude"
},
{
"id": "4tqc50:qa22e6211",
"big": "1. 분수의 나눗셈",
"small": "01. 분모가 같은 (분수)÷(분수)(1)·나누어떨어지는 경우",
"kind": "add",
"round": 2,
"by": "claude",
"q": "리본 12/13 m를 2/13 m씩 자르면 몇 도막이 돼? 식과 답을 말해 봐.",
"answer": "12/13 ÷ 2/13 = 12 ÷ 2 = 6이니까 6도막이야.",
"keys": [
"12/13 ÷ 2/13",
"6도막"
],
"answerBy": "claude"
},
{
"id": "1wjql2g:t0L1",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "5/8 ÷ 2/8처럼 분자끼리 나누어떨어지지 않으면 몫을 어떻게 나타내?",
"newQBy": "claude",
"answer": "분자끼리 5 ÷ 2를 해서 몫을 분수 5/2로 나타내. 대분수로 2와 1/2이야.",
"keys": [
"5 ÷ 2",
"분수 5/2 = 2와 1/2"
],
"answerBy": "claude"
},
{
"id": "1wjql2g:t0L2",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wjql2g:t0H1",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "7/10 ÷ 3/10을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "분모가 같으니까 분자끼리 7 ÷ 3을 해. 7 ÷ 3 = 7/3이고 대분수로 2와 1/3이야.",
"keys": [
"분자끼리 7 ÷ 3",
"7/3 = 2와 1/3"
],
"answerBy": "claude"
},
{
"id": "1wjql2g:t0H2",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "5/8 안에 2/8이 2번 들어가고 반이 남아. 이게 5/8 ÷ 2/8 = 2와 1/2과 어떻게 이어지는지 말해 봐.",
"newQBy": "claude",
"answer": "2/8이 2번 들어가서 2이고, 남은 1/8은 2/8의 반이라서 1/2이야. 그래서 몫이 2와 1/2이야.",
"keys": [
"2번 들어가서 2",
"남은 1/8은 2/8의 반"
],
"answerBy": "claude"
},
{
"id": "1wjql2g:qrecall",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1wjql2g:qreason",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1wjql2g:qexample",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1wjql2g:qerror",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 7/9 ÷ 2/9를 7 ÷ 2 = 3이라고만 답했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "나머지를 버리면 안 돼. 7 ÷ 2 = 7/2이니까 몫은 3과 1/2이야.",
"keys": [
"나머지를 버리면 안 된다",
"3과 1/2"
],
"answerBy": "claude"
},
{
"id": "1wjql2g:qa22e6221",
"big": "1. 분수의 나눗셈",
"small": "02. 분모가 같은 (분수)÷(분수)(2)·나누어떨어지지 않는 경우",
"kind": "add",
"round": 2,
"by": "claude",
"q": "물 9/10 L를 한 컵에 4/10 L씩 담으면 몇 컵이 돼? 식과 답을 말해 봐.",
"answer": "9/10 ÷ 4/10 = 9 ÷ 4 = 9/4 = 2와 1/4이니까 2와 1/4컵이야.",
"keys": [
"9/10 ÷ 4/10",
"2와 1/4컵"
],
"answerBy": "claude"
},
{
"id": "rl95sd:t0L1",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rl95sd:t0L2",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분모가 다른 분수끼리 나눌 때 먼저 어떻게 해?",
"newQBy": "claude",
"answer": "두 분수를 통분해서 분모를 같게 만든 다음 분자끼리 나눠.",
"keys": [
"통분한다",
"분자끼리 나눈다"
],
"answerBy": "claude"
},
{
"id": "rl95sd:t0H1",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "2/3 ÷ 2/9를 통분해서 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "2/3을 6/9로 통분하면 6/9 ÷ 2/9야. 분자끼리 6 ÷ 2 = 3이야.",
"keys": [
"6/9 ÷ 2/9로 통분",
"6 ÷ 2 = 3"
],
"answerBy": "claude"
},
{
"id": "rl95sd:t0H2",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rl95sd:qrecall",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "3/4 ÷ 1/6을 통분해서 계산해 봐.",
"newQBy": "claude",
"answer": "9/12 ÷ 2/12로 통분하면 9 ÷ 2 = 9/2 = 4와 1/2이야.",
"keys": [
"9/12 ÷ 2/12",
"4와 1/2"
],
"answerBy": "claude"
},
{
"id": "rl95sd:qreason",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "분모가 다른 분수끼리 나눌 때 왜 통분부터 해야 해?",
"newQBy": "claude",
"answer": "분모가 같아야 둘 다 같은 크기의 조각이 몇 개인지로 볼 수 있어. 그래야 분자끼리 나눌 수 있어.",
"keys": [
"같은 단위분수의 개수로 본다",
"그래야 분자끼리 나눌 수 있다"
],
"answerBy": "claude"
},
{
"id": "rl95sd:qexample",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "rl95sd:qerror",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 2/3 ÷ 2/9를 통분하지 않고 분자끼리, 분모끼리 나눠서 1/3이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분모가 다르면 먼저 통분해야 해. 6/9 ÷ 2/9 = 6 ÷ 2 = 3이니까 바른 답은 3이야.",
"keys": [
"먼저 통분한다",
"답 3"
],
"answerBy": "claude"
},
{
"id": "rl95sd:qa22e6231",
"big": "1. 분수의 나눗셈",
"small": "03. 분모가 다른 (분수)÷(분수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "페인트 5/6 L로 벽 1/4 m²를 칠했어. 1 L로는 몇 m²를 칠할 수 있어? 식을 말해 봐.",
"answer": "1 L로 칠한 넓이는 1/4 ÷ 5/6이야. 통분하면 3/12 ÷ 10/12 = 3/10이니까 3/10 m²야.",
"keys": [
"1/4 ÷ 5/6",
"3/10 m²"
],
"answerBy": "claude"
},
{
"id": "rymc4w:t0L1",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "2 ÷ 1/3은 어떻게 계산해?",
"newQBy": "claude",
"answer": "1 안에 1/3이 3번 들어가니까 2 안에는 2 × 3 = 6번 들어가. 답은 6이야.",
"keys": [
"1 안에 1/3이 3번",
"2 × 3 = 6"
],
"answerBy": "claude"
},
{
"id": "rymc4w:t0L2",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "rymc4w:t0H1",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "8 ÷ 4/5를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "먼저 8 ÷ 4 = 2로 1/5이 나타내는 양을 구해. 5/5는 그 5배니까 2 × 5 = 10이야.",
"keys": [
"8 ÷ 4 = 2",
"2 × 5 = 10"
],
"answerBy": "claude"
},
{
"id": "rymc4w:t0H2",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "넓이가 3/8 m²이고 높이가 5/7 m인 삼각형의 밑변을 구하는 식을 말해 봐.",
"newQBy": "claude",
"answer": "삼각형의 넓이는 밑변 × 높이 ÷ 2야. 그래서 밑변은 3/8 × 2 ÷ 5/7로 구해.",
"keys": [
"넓이 × 2 ÷ 높이",
"3/8 × 2 ÷ 5/7"
],
"answerBy": "claude"
},
{
"id": "rymc4w:qrecall",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "9 ÷ 3/4을 계산해 봐.",
"newQBy": "claude",
"answer": "9 ÷ 3 = 3이고 3 × 4 = 12야. 답은 12야.",
"keys": [
"9 ÷ 3 = 3",
"3 × 4 = 12"
],
"answerBy": "claude"
},
{
"id": "rymc4w:qreason",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "2 ÷ 1/3을 할 때 왜 2에 3을 곱하면 돼?",
"newQBy": "claude",
"answer": "1 안에 1/3이 3번 들어가니까 2 안에는 3번씩 두 번, 곧 2 × 3번 들어가.",
"keys": [
"1 안에 1/3이 3번",
"2 × 3번"
],
"answerBy": "claude"
},
{
"id": "rymc4w:qexample",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "rymc4w:qerror",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 8 ÷ 4/5를 (8 ÷ 5) × 4로 계산했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분자로 나누고 분모를 곱해야 해. (8 ÷ 4) × 5 = 10이 바른 답이야.",
"keys": [
"분자로 나누고 분모를 곱한다",
"답 10"
],
"answerBy": "claude"
},
{
"id": "rymc4w:qa22e6241",
"big": "1. 분수의 나눗셈",
"small": "04. (자연수)÷(분수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "고구마 6 kg을 캐는 데 3/4시간이 걸렸어. 1시간 동안 캘 수 있는 고구마는 몇 kg이야? 식과 답을 말해 봐.",
"answer": "6 ÷ 3/4 = (6 ÷ 3) × 4 = 8이니까 8 kg이야.",
"keys": [
"6 ÷ 3/4",
"8 kg"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:t0L1",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "분수의 나눗셈을 분수의 곱셈으로 바꿀 때 어떻게 해?",
"newQBy": "claude",
"answer": "나눗셈을 곱셈으로 바꾸고, 나누는 분수의 분모와 분자를 바꿔서 곱해.",
"keys": [
"곱셈으로 바꾼다",
"나누는 분수의 분모와 분자를 바꾼다"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:t0L2",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1jx91nq:t0H1",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "5/7 ÷ 3/4를 분수의 곱셈으로 바꿔 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "5/7 × 4/3으로 바꿔서 계산하면 20/21이야.",
"keys": [
"5/7 × 4/3",
"20/21"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:t0H2",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "어떤 수를 4/7로 나누었더니 2/3이 됐어. 어떤 수는 어떻게 구해?",
"newQBy": "claude",
"answer": "어떤 수 ÷ 4/7 = 2/3이니까 어떤 수는 2/3 × 4/7로 구해. 8/21이야.",
"keys": [
"곱셈으로 거꾸로 구한다",
"2/3 × 4/7 = 8/21"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:qrecall",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1jx91nq:qreason",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "3/5 ÷ 1/2이 3/5 × 2와 같은 이유를 말해 봐.",
"newQBy": "claude",
"answer": "1/2이 몇 번 들어가는지 세는 거니까, 1 안에 1/2이 2번 들어가는 것처럼 3/5 안에는 3/5의 2배만큼 들어가. 그래서 3/5 × 2야.",
"keys": [
"1 안에 1/2이 2번",
"3/5의 2배"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:qexample",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1jx91nq:qerror",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 5/7 ÷ 3/4를 앞의 분수를 뒤집어서 7/5 × 3/4라고 했어. 뭐가 잘못됐는지 찾고, 바른 식도 말해 봐.",
"newQBy": "claude",
"answer": "분모와 분자를 바꾸는 건 나누는 분수야. 5/7 × 4/3이 바른 식이야.",
"keys": [
"나누는 분수를 바꾼다",
"5/7 × 4/3"
],
"answerBy": "claude"
},
{
"id": "1jx91nq:qa22e6251",
"big": "1. 분수의 나눗셈",
"small": "05. (분수)÷(분수)를 분수의 곱셈으로 나타내기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "넓이가 9/10 m²인 직사각형의 가로가 3/4 m야. 세로는 몇 m야? 식과 답을 말해 봐.",
"answer": "세로는 9/10 ÷ 3/4 = 9/10 × 4/3 = 6/5 = 1과 1/5이니까 1과 1/5 m야.",
"keys": [
"9/10 ÷ 3/4",
"1과 1/5 m"
],
"answerBy": "claude"
},
{
"id": "1hebvay:t0L1",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "대분수가 있는 나눗셈은 먼저 어떻게 해?",
"newQBy": "claude",
"answer": "대분수를 가분수로 바꿔.",
"keys": [
"대분수를 가분수로"
],
"answerBy": "claude"
},
{
"id": "1hebvay:t0L2",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hebvay:t0H1",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "2와 1/3 ÷ 2/5를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "2와 1/3을 7/3으로 바꿔. 7/3 × 5/2 = 35/6 = 5와 5/6이야.",
"keys": [
"7/3으로 바꾼다",
"7/3 × 5/2 = 5와 5/6"
],
"answerBy": "claude"
},
{
"id": "1hebvay:t0H2",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "10 < 20 ÷ 4/□ < 30을 만족하는 자연수 □는 어떻게 찾아?",
"newQBy": "claude",
"answer": "20 ÷ 4/□ = 20 × □/4 = 5 × □야. 10 < 5 × □ < 30이니까 □는 3, 4, 5야.",
"keys": [
"20 ÷ 4/□ = 5 × □",
"□는 3, 4, 5"
],
"answerBy": "claude"
},
{
"id": "1hebvay:qrecall",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1hebvay:qreason",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "주스 1과 1/2 L를 한 컵에 1/2 L씩 담으면 몇 컵이야? 1과 1/2을 3/2로 바꾸는 게 무슨 뜻인지도 말해 봐.",
"newQBy": "claude",
"answer": "1과 1/2 L는 1/2 L가 3개라서 3/2야. 그래서 3/2 ÷ 1/2 = 3컵이야.",
"keys": [
"1/2 L가 3개",
"3컵"
],
"answerBy": "claude"
},
{
"id": "1hebvay:qexample",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1hebvay:qerror",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 2와 1/3 ÷ 2/5를 자연수 2와 1/3을 따로 2/5로 나눠서 더했어. 뭐가 잘못됐는지 찾고, 바른 방법도 말해 봐.",
"newQBy": "claude",
"answer": "대분수를 가분수 7/3으로 바꿔서 한 번에 나눠야 해. 7/3 × 5/2 = 5와 5/6이야.",
"keys": [
"가분수로 바꿔 한 번에 나눈다",
"5와 5/6"
],
"answerBy": "claude"
},
{
"id": "1hebvay:qa22e6261",
"big": "1. 분수의 나눗셈",
"small": "06. 분수의 나눗셈을 계산해 볼까요·(대분수)÷(분수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "길이가 3과 3/4 m인 끈을 5/8 m씩 자르면 몇 도막이 돼? 식과 답을 말해 봐.",
"answer": "3과 3/4 = 15/4이고 15/4 ÷ 5/8 = 15/4 × 8/5 = 6이니까 6도막이야.",
"keys": [
"15/4 ÷ 5/8",
"6도막"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:t0L1",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1f2rp7u:t0L2",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "나누어지는 수와 나누는 수를 똑같이 10배 하면 몫은 어떻게 돼?",
"newQBy": "claude",
"answer": "몫은 변하지 않고 같아.",
"keys": [
"몫은 같다"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:t0H1",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "6.4 ÷ 0.4를 자연수의 나눗셈으로 바꿔 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "두 수를 똑같이 10배 해서 64 ÷ 4로 바꾸면 16이야.",
"keys": [
"두 수를 10배",
"64 ÷ 4 = 16"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:t0H2",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "세로로 계산할 때 두 수의 소수점을 같은 자리만큼 옮기는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "두 수를 똑같이 10배 하는 것과 같아서 몫이 변하지 않기 때문이야. 한쪽만 옮기면 몫이 달라져.",
"keys": [
"두 수를 똑같이 10배",
"몫이 변하지 않는다"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:qrecall",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "9.6 ÷ 1.2를 계산해 봐.",
"newQBy": "claude",
"answer": "두 수를 10배 하면 96 ÷ 12 = 8이야.",
"keys": [
"96 ÷ 12",
"8"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:qreason",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1f2rp7u:qexample",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1f2rp7u:qerror",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 6.4 ÷ 0.4를 6.4만 10배 해서 64 ÷ 0.4로 계산했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "두 수를 똑같이 10배 해야 해. 64 ÷ 4 = 16이 바른 답이야.",
"keys": [
"두 수를 똑같이 10배",
"답 16"
],
"answerBy": "claude"
},
{
"id": "1f2rp7u:qa22e6211",
"big": "2. 소수의 나눗셈",
"small": "01. (소수 한 자리 수)÷(소수 한 자리 수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "리본 7.2 m를 0.6 m씩 자르면 몇 도막이 돼? 식과 답을 말해 봐.",
"answer": "7.2 ÷ 0.6 = 72 ÷ 6 = 12니까 12도막이야.",
"keys": [
"7.2 ÷ 0.6",
"12도막"
],
"answerBy": "claude"
},
{
"id": "ou2559:t0L1",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ou2559:t0L2",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "소수 두 자리 수끼리 나눌 때는 두 수를 몇 배 해서 자연수로 만들어?",
"newQBy": "claude",
"answer": "두 수를 똑같이 100배 해.",
"keys": [
"두 수를 100배"
],
"answerBy": "claude"
},
{
"id": "ou2559:t0H1",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "1.28 ÷ 0.16을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "두 수를 100배 해서 128 ÷ 16 = 8이야.",
"keys": [
"128 ÷ 16",
"8"
],
"answerBy": "claude"
},
{
"id": "ou2559:t0H2",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ou2559:qrecall",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "ou2559:qreason",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "소수 두 자리 수끼리 나눌 때는 왜 10배가 아니라 100배를 해?",
"newQBy": "claude",
"answer": "소수 둘째 자리까지 있어서 10배 하면 아직 소수가 남아. 100배 해야 둘 다 자연수가 돼.",
"keys": [
"10배 하면 소수가 남는다",
"100배 해야 자연수"
],
"answerBy": "claude"
},
{
"id": "ou2559:qexample",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "ou2559:qerror",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 1.28 ÷ 0.16을 두 수를 10배 해서 12.8 ÷ 1.6으로 바꿨어. 뭐가 잘못됐는지, 어떻게 바꿔야 하는지 말해 봐.",
"newQBy": "claude",
"answer": "틀린 식은 아니지만 아직 소수라서 계산이 쉬워지지 않아. 100배 해서 128 ÷ 16 = 8로 계산해야 편해.",
"keys": [
"10배로는 아직 소수",
"100배 해서 128 ÷ 16 = 8"
],
"answerBy": "claude"
},
{
"id": "ou2559:qa22e6221",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "3.24 ÷ 0.12를 계산하는 과정을 말해 봐.",
"answer": "두 수를 100배 해서 324 ÷ 12 = 27이야.",
"keys": [
"324 ÷ 12",
"27"
],
"answerBy": "claude"
},
{
"id": "ou2559:qa22e6222",
"big": "2. 소수의 나눗셈",
"small": "02. (소수 두 자리 수)÷(소수 두 자리 수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "고무줄 4.56 m를 0.38 m씩 자르면 몇 도막이 돼? 식과 답을 말해 봐.",
"answer": "4.56 ÷ 0.38 = 456 ÷ 38 = 12니까 12도막이야.",
"keys": [
"4.56 ÷ 0.38",
"12도막"
],
"answerBy": "claude"
},
{
"id": "1dkf48z:t0L1",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "4.68 ÷ 2.6처럼 자릿수가 다른 소수끼리 나눌 때 어떻게 해?",
"newQBy": "claude",
"answer": "나누는 수가 자연수가 되도록 두 수의 소수점을 똑같이 옮겨. 4.68 ÷ 2.6은 46.8 ÷ 26이 돼.",
"keys": [
"나누는 수를 자연수로",
"두 수의 소수점을 똑같이 옮긴다"
],
"answerBy": "claude"
},
{
"id": "1dkf48z:t0L2",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "세로로 계산할 때 몫의 소수점은 어디에 찍어?",
"newQBy": "claude",
"answer": "옮긴 나누어지는 수의 소수점 위치에 맞춰 찍어.",
"keys": [
"옮긴 소수점 위치에 맞춘다"
],
"answerBy": "claude"
},
{
"id": "1dkf48z:t0H1",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "4.68 ÷ 2.6을 세로로 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "두 수의 소수점을 한 자리씩 옮기면 46.8 ÷ 26이야. 계산하면 1.8이고, 몫의 소수점은 옮긴 자리에 맞춰 찍어.",
"keys": [
"46.8 ÷ 26",
"1.8"
],
"answerBy": "claude"
},
{
"id": "1dkf48z:t0H2",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1dkf48z:qrecall",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1dkf48z:qreason",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1dkf48z:qexample",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1dkf48z:qerror",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 4.68 ÷ 2.6을 나누는 수만 10배 해서 4.68 ÷ 26으로 계산했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "나누어지는 수도 똑같이 10배 해야 해. 46.8 ÷ 26 = 1.8이 바른 답이야.",
"keys": [
"두 수를 똑같이 10배",
"1.8"
],
"answerBy": "claude"
},
{
"id": "1dkf48z:qa22e6231",
"big": "2. 소수의 나눗셈",
"small": "03. 자릿수가 다른 (소수)÷(소수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "7.14 ÷ 0.7을 계산하는 과정을 말해 봐.",
"answer": "두 수를 10배 해서 71.4 ÷ 7 = 10.2야.",
"keys": [
"71.4 ÷ 7",
"10.2"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:t0L1",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1d7jkp3:t0L2",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "세로로 계산할 때 자연수는 소수점이 어디 있는 수로 봐?",
"newQBy": "claude",
"answer": "자연수는 맨 끝에 소수점이 생략된 수로 봐. 10은 10.0이나 10.00처럼 볼 수 있어.",
"keys": [
"끝에 소수점이 생략된 수",
"0을 붙여 볼 수 있다"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:t0H1",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "10 ÷ 1.25를 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "두 수를 100배 해서 1000 ÷ 125 = 8이야.",
"keys": [
"1000 ÷ 125",
"8"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:t0H2",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1d7jkp3:qrecall",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "20 ÷ 1.6을 계산해 봐.",
"newQBy": "claude",
"answer": "두 수를 10배 해서 200 ÷ 16 = 12.5야.",
"keys": [
"200 ÷ 16",
"12.5"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:qreason",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "자연수를 소수로 나눌 때 왜 자연수도 나누는 소수와 같은 배로 늘려야 해?",
"newQBy": "claude",
"answer": "두 수를 같은 배로 늘려야 몫이 변하지 않아. 나누는 수만 늘리면 몫이 달라져.",
"keys": [
"같은 배로 늘려야 몫이 같다"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:qexample",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1d7jkp3:qerror",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 15 ÷ 0.6을 나누는 수만 10배 해서 15 ÷ 6이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "15도 10배 해야 해. 150 ÷ 6 = 25가 바른 답이야.",
"keys": [
"15도 10배",
"25"
],
"answerBy": "claude"
},
{
"id": "1d7jkp3:qa22e6241",
"big": "2. 소수의 나눗셈",
"small": "04. (자연수)÷(소수)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "물 18 L를 0.75 L 병에 나누어 담으면 몇 병이 돼? 식과 답을 말해 봐.",
"answer": "18 ÷ 0.75 = 1800 ÷ 75 = 24니까 24병이야.",
"keys": [
"18 ÷ 0.75",
"24병"
],
"answerBy": "claude"
},
{
"id": "8i73lk:t0L1",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "몫이 나누어떨어지지 않으면 몫을 어떻게 나타내?",
"newQBy": "claude",
"answer": "구하려는 자리까지 반올림해서 어림해 나타내.",
"keys": [
"반올림해서 나타낸다"
],
"answerBy": "claude"
},
{
"id": "8i73lk:t0L2",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8i73lk:t0H1",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "10 ÷ 7의 몫을 반올림하여 소수 첫째 자리까지 나타내는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "소수 둘째 자리까지 구하면 1.42야. 둘째 자리 숫자 2가 5보다 작으니 버려서 1.4야.",
"keys": [
"소수 둘째 자리까지 구한다",
"1.4"
],
"answerBy": "claude"
},
{
"id": "8i73lk:t0H2",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8i73lk:qrecall",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "8i73lk:qreason",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "나누어떨어지지 않을 때 몫을 왜 반올림해서 나타내?",
"newQBy": "claude",
"answer": "몫이 끝없이 이어져서 끝까지 다 쓸 수 없어. 그래서 필요한 자리까지 어림해서 나타내.",
"keys": [
"몫이 끝없이 이어진다",
"필요한 자리까지 어림"
],
"answerBy": "claude"
},
{
"id": "8i73lk:qexample",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "8i73lk:qerror",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 10 ÷ 7 = 1.428…을 소수 첫째 자리까지 반올림하면서 첫째 자리 숫자 4를 보고 1.5라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "바로 아래 자리인 소수 둘째 자리 숫자 2를 보고 정해야 해. 2는 5보다 작으니 버려서 1.4야.",
"keys": [
"바로 아래 자리를 본다",
"1.4"
],
"answerBy": "claude"
},
{
"id": "8i73lk:qa22e6251",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "17 ÷ 3의 몫을 반올림하여 소수 첫째 자리까지 나타내 봐.",
"answer": "17 ÷ 3 = 5.66…이야. 둘째 자리 6이 5보다 크니 올려서 5.7이야.",
"keys": [
"5.66…",
"5.7"
],
"answerBy": "claude"
},
{
"id": "8i73lk:qa22e6252",
"big": "2. 소수의 나눗셈",
"small": "05. 몫을 반올림하여 나타내 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "음료수 2 L를 3명이 똑같이 나눠 마시면 한 명이 몇 L야? 반올림하여 소수 첫째 자리까지 말해 봐.",
"answer": "2 ÷ 3 = 0.66…이니까 반올림해서 0.7 L야.",
"keys": [
"2 ÷ 3",
"0.7 L"
],
"answerBy": "claude"
},
{
"id": "1tom1oz:t0L1",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "7.4 L를 2 L씩 나누어 줄 때 사람 수는 어디까지 구해?",
"newQBy": "claude",
"answer": "사람 수는 소수로 나눌 수 없으니 몫을 자연수까지만 구해.",
"keys": [
"몫을 자연수까지만"
],
"answerBy": "claude"
},
{
"id": "1tom1oz:t0L2",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1tom1oz:t0H1",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "7.4 ÷ 2에서 나누어 줄 수 있는 사람 수와 남는 양을 구하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "몫을 자연수까지 구하면 3명이고, 7.4 − 2 × 3 = 1.4니까 1.4 L가 남아.",
"keys": [
"3명",
"1.4 L 남는다"
],
"answerBy": "claude"
},
{
"id": "1tom1oz:t0H2",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "나누는 수 × 몫 + 남는 양이 처음 양이 되는지로 답을 확인할 수 있는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "나누어 준 양은 나누는 수 × 몫이고, 거기에 남는 양을 더하면 처음 양 전체가 돼야 해. 2 × 3 + 1.4 = 7.4야.",
"keys": [
"나누어 준 양 + 남는 양 = 처음 양",
"2 × 3 + 1.4 = 7.4"
],
"answerBy": "claude"
},
{
"id": "1tom1oz:qrecall",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1tom1oz:qreason",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1tom1oz:qexample",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1tom1oz:qerror",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 7.4 L를 2 L씩 나누어 주는 문제에서 몫을 3.7이라고 하고 남는 게 없다고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "사람 수는 3.7명처럼 나눌 수 없어. 몫을 자연수 3까지만 구하면 3명에게 주고 1.4 L가 남아.",
"keys": [
"사람 수는 자연수",
"3명, 1.4 L"
],
"answerBy": "claude"
},
{
"id": "1tom1oz:qa22e6261",
"big": "2. 소수의 나눗셈",
"small": "06. 나누어 주고 남는 양을 알아볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "쌀 25.3 kg을 한 봉지에 4 kg씩 담으면 몇 봉지가 되고 몇 kg이 남는지 말해 봐.",
"answer": "몫을 자연수까지 구하면 6봉지이고 25.3 − 4 × 6 = 1.3이니까 1.3 kg이 남아.",
"keys": [
"6봉지",
"1.3 kg 남는다"
],
"answerBy": "claude"
},
{
"id": "1niet2v:t0L1",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "같은 물건도 보는 방향이 달라지면 모습이 어떻게 돼?",
"newQBy": "claude",
"answer": "보는 방향에 따라 보이는 모습이 달라져.",
"keys": [
"보는 방향에 따라 달라진다"
],
"answerBy": "claude"
},
{
"id": "1niet2v:t0L2",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1niet2v:t0H1",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "여러 방향에서 찍은 사진을 보고 어느 방향에서 찍었는지 어떻게 알아내?",
"newQBy": "claude",
"answer": "사진 속 물건들의 앞뒤 순서와 왼쪽·오른쪽 위치를 보고, 그렇게 보이는 자리가 어디인지 찾아.",
"keys": [
"물건의 순서와 위치를 본다",
"그렇게 보이는 자리를 찾는다"
],
"answerBy": "claude"
},
{
"id": "1niet2v:t0H2",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1niet2v:qrecall",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1niet2v:qreason",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "빨간 상자가 파란 상자 앞에 있어. 빨간 상자가 파란 상자를 가린 사진은 앞과 뒤 중 어디서 찍었을까? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "앞에서 찍은 거야. 앞에서 보면 빨간 상자가 더 가까워서 뒤에 있는 파란 상자를 가려.",
"keys": [
"앞에서 찍었다",
"가까운 상자가 뒤의 상자를 가린다"
],
"answerBy": "claude"
},
{
"id": "1niet2v:qexample",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1niet2v:qerror",
"big": "3. 공간과 입체",
"small": "01. 어느 방향에서 보았는지 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 사진 한 장만 보고 어느 방향에서 찍어도 똑같이 보일 거라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "보는 방향이 바뀌면 가려지는 물건과 물건의 순서가 달라져. 그래서 방향마다 다르게 보여.",
"keys": [
"방향마다 다르게 보인다",
"가려지는 것과 순서가 달라진다"
],
"answerBy": "claude"
},
{
"id": "1svq0id:t0L1",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "보이는 위의 면과 위에서 본 모양이 같으면 숨겨진 쌓기나무가 있어?",
"newQBy": "claude",
"answer": "위에서 본 모양의 모든 자리가 보이니까 숨겨진 쌓기나무가 없어.",
"keys": [
"숨겨진 쌓기나무가 없다"
],
"answerBy": "claude"
},
{
"id": "1svq0id:t0L2",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1svq0id:t0H1",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "위에서 본 모양을 이용해 쌓기나무의 개수를 알아보는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "위에서 본 모양으로 1층에 놓인 자리를 알아. 그리고 보이지 않는 자리에 숨은 쌓기나무가 있는지 생각해서 개수를 세.",
"keys": [
"위에서 본 모양 = 1층 자리",
"숨은 쌓기나무를 생각한다"
],
"answerBy": "claude"
},
{
"id": "1svq0id:t0H2",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "숨겨진 쌓기나무 때문에 개수가 여러 가지일 때, 가장 적은 개수와 가장 많은 개수는 어떻게 정해?",
"newQBy": "claude",
"answer": "보이는 모양을 그대로 만드는 데 꼭 필요한 것만 놓으면 가장 적고, 보이지 않는 자리에 쌓을 수 있는 만큼 다 채우면 가장 많아.",
"keys": [
"꼭 필요한 것만 = 가장 적다",
"보이지 않는 곳을 다 채우면 가장 많다"
],
"answerBy": "claude"
},
{
"id": "1svq0id:qrecall",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1svq0id:qreason",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "위에서 본 모양만으로는 왜 쌓기나무의 개수를 정확히 알 수 없어?",
"newQBy": "claude",
"answer": "위에서 본 모양은 어느 자리에 놓였는지만 보여 주고, 그 자리에 몇 층으로 쌓였는지는 안 보여 줘.",
"keys": [
"자리는 보이지만 층수는 안 보인다"
],
"answerBy": "claude"
},
{
"id": "1svq0id:qexample",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1svq0id:qerror",
"big": "3. 공간과 입체",
"small": "02. 쌓은 모양과 쌓기나무의 개수(1)·위에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 위에서 본 모양이 5칸이니까 쌓기나무도 무조건 5개라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "한 칸 위에 여러 개가 쌓여 있을 수 있어. 그래서 5개보다 많을 수 있어.",
"keys": [
"한 칸에 여러 층이 쌓일 수 있다",
"5개보다 많을 수 있다"
],
"answerBy": "claude"
},
{
"id": "13f0an5:t0L1",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "13f0an5:t0L2",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "앞에서 본 모양은 각 줄에서 어떤 높이로 보여?",
"newQBy": "claude",
"answer": "각 줄에서 가장 높이 쌓인 층까지 보여.",
"keys": [
"가장 높은 층까지 보인다"
],
"answerBy": "claude"
},
{
"id": "13f0an5:t0H1",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "위, 앞, 옆에서 본 모양을 보고 쌓기나무 개수를 구하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "위에서 본 모양으로 1층 자리를 정하고, 앞과 옆에서 본 모양으로 각 자리에 몇 층까지 쌓였는지 찾아서 더해.",
"keys": [
"위에서 본 모양 = 1층 자리",
"앞·옆으로 각 자리의 층수를 정한다"
],
"answerBy": "claude"
},
{
"id": "13f0an5:t0H2",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "세 방향에서 본 모양이 같아도 쌓은 모양이 여러 가지일 수 있는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "앞과 옆에서는 각 줄의 가장 높은 층만 보여. 그래서 가려진 자리의 높이는 여러 가지로 달라질 수 있어.",
"keys": [
"각 줄의 가장 높은 층만 보인다",
"가려진 자리의 높이는 달라질 수 있다"
],
"answerBy": "claude"
},
{
"id": "13f0an5:qrecall",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "13f0an5:qreason",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "13f0an5:qexample",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "13f0an5:qerror",
"big": "3. 공간과 입체",
"small": "03. 쌓은 모양과 쌓기나무의 개수(2)·위·앞·옆에서 본 모양",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 앞에서 본 모양의 어느 줄이 2층이라서 그 줄의 모든 자리가 2층이라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "앞에서 보면 그 줄에서 가장 높은 자리만 보여. 그 줄의 한 자리만 2층이고 나머지는 1층일 수도 있어.",
"keys": [
"가장 높은 자리만 보인다",
"다른 자리는 더 낮을 수 있다"
],
"answerBy": "claude"
},
{
"id": "doo3rd:t0L1",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "위에서 본 모양의 각 자리에 쓴 수는 뭘 뜻해?",
"newQBy": "claude",
"answer": "그 자리에 쌓인 쌓기나무의 개수야.",
"keys": [
"그 자리에 쌓인 개수"
],
"answerBy": "claude"
},
{
"id": "doo3rd:t0L2",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "doo3rd:t0H1",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "doo3rd:t0H2",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "위에서 본 모양에 수를 쓰면 쌓은 모양을 정확히 알 수 있는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "자리마다 몇 층인지 다 적혀 있어서 숨겨진 쌓기나무가 없어. 그래서 모양과 개수가 하나로 정해져.",
"keys": [
"자리마다 층수가 적혀 있다",
"하나로 정해진다"
],
"answerBy": "claude"
},
{
"id": "doo3rd:qrecall",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "위에서 본 모양의 각 자리에 1, 4, 2, 3이 쓰여 있으면 쌓기나무는 모두 몇 개야?",
"newQBy": "claude",
"answer": "각 자리의 수를 모두 더하면 1 + 4 + 2 + 3 = 10이니까 10개야.",
"keys": [
"각 자리의 수를 더한다",
"10개"
],
"answerBy": "claude"
},
{
"id": "doo3rd:qreason",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "doo3rd:qexample",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "doo3rd:qerror",
"big": "3. 공간과 입체",
"small": "04. 쌓은 모양과 쌓기나무의 개수(3)·위에서 본 모양에 수 쓰기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 위에서 본 모양에 2, 3, 1, 2가 쓰인 걸 보고 가장 큰 수 3이 전체 개수라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "3은 한 자리에 쌓인 개수일 뿐이야. 모두 더해서 2 + 3 + 1 + 2 = 8개야.",
"keys": [
"각 자리의 수를 모두 더한다",
"8개"
],
"answerBy": "claude"
},
{
"id": "wgfdv4:t0L1",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wgfdv4:t0L2",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "층별로 나타낸 모양에서 1층 모양은 위에서 본 모양과 어떤 관계야?",
"newQBy": "claude",
"answer": "1층 모양과 위에서 본 모양은 같아.",
"keys": [
"1층 모양 = 위에서 본 모양"
],
"answerBy": "claude"
},
{
"id": "wgfdv4:t0H1",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "층별로 나타낸 모양을 보고 쌓은 모양을 알아보는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "1층 모양을 먼저 놓고, 2층·3층 모양을 보며 그 위 어느 자리에 쌓는지 차례로 올려.",
"keys": [
"1층부터 놓는다",
"위층을 차례로 올린다"
],
"answerBy": "claude"
},
{
"id": "wgfdv4:t0H2",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wgfdv4:qrecall",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "층별 모양이 1층 4칸, 2층 2칸이면 쌓기나무는 모두 몇 개야?",
"newQBy": "claude",
"answer": "층마다 칸 수를 더해서 4 + 2 = 6개야.",
"keys": [
"층마다 칸 수를 더한다",
"6개"
],
"answerBy": "claude"
},
{
"id": "wgfdv4:qreason",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "층별로 나타낸 모양에서 1층 모양은 왜 위에서 본 모양과 같아?",
"newQBy": "claude",
"answer": "쌓기나무는 1층 위에만 쌓을 수 있어서 위에서 보면 1층에 놓인 자리가 모두 보여.",
"keys": [
"1층 위에만 쌓는다",
"위에서 보면 1층 자리가 다 보인다"
],
"answerBy": "claude"
},
{
"id": "wgfdv4:qexample",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "wgfdv4:qerror",
"big": "3. 공간과 입체",
"small": "05. 쌓은 모양과 쌓기나무의 개수(4)·층별로 나타낸 모양",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 층별 모양이 1층 5칸, 2층 3칸, 3층 1칸인데 층이 3개니까 쌓기나무도 3개라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "층 수가 아니라 층마다 칸 수를 더해야 해. 5 + 3 + 1 = 9개야.",
"keys": [
"층마다 칸 수를 더한다",
"9개"
],
"answerBy": "claude"
},
{
"id": "ogp9kt:t0L1",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "쌓기나무 4개로 서로 다른 모양은 어떻게 만들어?",
"newQBy": "claude",
"answer": "쌓기나무 3개로 만든 모양에 1개를 여러 자리에 붙여 봐.",
"keys": [
"3개 모양에 1개를 붙인다"
],
"answerBy": "claude"
},
{
"id": "ogp9kt:t0L2",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "뒤집거나 돌려서 완전히 겹치는 두 모양은 몇 가지로 세?",
"newQBy": "claude",
"answer": "같은 모양이니까 1가지로 세.",
"keys": [
"1가지로 센다"
],
"answerBy": "claude"
},
{
"id": "ogp9kt:t0H1",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ogp9kt:t0H2",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "뒤집거나 돌렸을 때 같은 모양을 한 가지로 세는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "돌리거나 뒤집는 건 놓는 방향만 바꾼 거고 쌓기나무의 연결은 그대로야. 그래서 같은 모양이야.",
"keys": [
"방향만 바뀌었다",
"연결은 그대로"
],
"answerBy": "claude"
},
{
"id": "ogp9kt:qrecall",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "ogp9kt:qreason",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ogp9kt:qexample",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "ogp9kt:qerror",
"big": "3. 공간과 입체",
"small": "06. 여러 가지 모양을 만들어 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 쌓기나무 모양 두 개를 만들었는데, 하나를 돌리니 다른 하나와 완전히 겹쳤어. 그런데도 서로 다른 2가지라고 셌어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "돌려서 완전히 겹치면 같은 모양이라서 1가지로 세야 해.",
"keys": [
"돌려서 겹치면 같은 모양",
"1가지"
],
"answerBy": "claude"
},
{
"id": "1rppnci:t0L1",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비 2 : 3에서 전항과 후항은 각각 뭐야?",
"newQBy": "claude",
"answer": "기호 : 앞의 2가 전항, 뒤의 3이 후항이야.",
"keys": [
"2가 전항",
"3이 후항"
],
"answerBy": "claude"
},
{
"id": "1rppnci:t0L2",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비의 전항과 후항에 0이 아닌 같은 수를 곱하면 비율은 어떻게 돼?",
"newQBy": "claude",
"answer": "비율은 변하지 않고 같아. 나누어도 마찬가지야.",
"keys": [
"비율은 같다"
],
"answerBy": "claude"
},
{
"id": "1rppnci:t0H1",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "전항과 후항에 같은 수를 곱해도 비율이 같은 이유를 2 : 3으로 설명해 봐.",
"newQBy": "claude",
"answer": "2 : 3의 비율은 2/3이야. 둘 다 2를 곱한 4 : 6의 비율 4/6도 약분하면 2/3이라 같아.",
"keys": [
"2/3",
"4/6 = 2/3"
],
"answerBy": "claude"
},
{
"id": "1rppnci:t0H2",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1rppnci:qrecall",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1rppnci:qreason",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1rppnci:qexample",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "2 : 5와 비율이 같은 비를 두 개 만들어 봐.",
"newQBy": "claude",
"answer": "전항과 후항에 같은 수를 곱하면 돼. 4 : 10, 6 : 15처럼 만들 수 있어.",
"keys": [
"같은 수를 곱한다",
"예: 4 : 10, 6 : 15"
],
"answerBy": "claude"
},
{
"id": "1rppnci:qerror",
"big": "4. 비례식과 비례배분",
"small": "01. 비의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 3 : 5의 전항에만 2를 곱해서 6 : 5가 비율이 같은 비라고 했어. 뭐가 잘못됐는지 찾고, 바른 비도 말해 봐.",
"newQBy": "claude",
"answer": "전항과 후항에 똑같이 곱해야 해. 6 : 10이 비율이 같은 비야.",
"keys": [
"전항과 후항에 똑같이",
"6 : 10"
],
"answerBy": "claude"
},
{
"id": "rnej04:t0L1",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "0.3 : 0.7을 간단한 자연수의 비로 나타내는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "전항과 후항에 10을 곱하면 3 : 7이야.",
"keys": [
"10을 곱한다",
"3 : 7"
],
"answerBy": "claude"
},
{
"id": "rnej04:t0L2",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1/2 : 1/3을 간단한 자연수의 비로 나타내는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "두 분모의 최소공배수 6을 곱하면 3 : 2야.",
"keys": [
"분모의 공배수 6을 곱한다",
"3 : 2"
],
"answerBy": "claude"
},
{
"id": "rnej04:t0H1",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "1.2 : 1.8을 간단한 자연수의 비로 나타내는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "10을 곱하면 12 : 18이고, 최대공약수 6으로 나누면 2 : 3이야.",
"keys": [
"10을 곱해 12 : 18",
"6으로 나눠 2 : 3"
],
"answerBy": "claude"
},
{
"id": "rnej04:t0H2",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "1/4 : 0.13처럼 분수와 소수가 섞인 비는 어떻게 간단한 자연수의 비로 나타내?",
"newQBy": "claude",
"answer": "먼저 1/4을 0.25로 바꿔서 둘 다 소수로 맞춰. 0.25 : 0.13에 100을 곱하면 25 : 13이야.",
"keys": [
"분수나 소수 하나로 맞춘다",
"25 : 13"
],
"answerBy": "claude"
},
{
"id": "rnej04:qrecall",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "rnej04:qreason",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "분수의 비를 자연수의 비로 나타낼 때 왜 두 분모의 공배수를 곱해?",
"newQBy": "claude",
"answer": "공배수를 곱해야 두 분수가 한꺼번에 자연수가 돼. 한쪽 분모만 곱하면 다른 쪽은 분수로 남아.",
"keys": [
"두 분수가 한꺼번에 자연수가 된다"
],
"answerBy": "claude"
},
{
"id": "rnej04:qexample",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "rnej04:qerror",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 1/2 : 1/3의 전항에는 2, 후항에는 3을 곱해서 1 : 1이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "전항과 후항에 같은 수를 곱해야 해. 6을 곱하면 3 : 2야.",
"keys": [
"같은 수를 곱한다",
"3 : 2"
],
"answerBy": "claude"
},
{
"id": "rnej04:qa22e6221",
"big": "4. 비례식과 비례배분",
"small": "02. 간단한 자연수의 비로 나타내 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "밀가루 1.5 kg과 설탕 0.9 kg을 섞었어. 밀가루와 설탕의 양을 간단한 자연수의 비로 나타내 봐.",
"answer": "1.5 : 0.9에 10을 곱하면 15 : 9이고, 3으로 나누면 5 : 3이야.",
"keys": [
"15 : 9",
"5 : 3"
],
"answerBy": "claude"
},
{
"id": "1ewb7xm:t0L1",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비례식이 뭐야?",
"newQBy": "claude",
"answer": "비율이 같은 두 비를 기호 =를 써서 나타낸 식이야.",
"keys": [
"비율이 같은 두 비",
"=로 나타낸 식"
],
"answerBy": "claude"
},
{
"id": "1ewb7xm:t0L2",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비례식에서 외항과 내항은 각각 뭐야?",
"newQBy": "claude",
"answer": "바깥쪽에 있는 두 항이 외항, 안쪽에 있는 두 항이 내항이야.",
"keys": [
"바깥쪽 = 외항",
"안쪽 = 내항"
],
"answerBy": "claude"
},
{
"id": "1ewb7xm:t0H1",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ewb7xm:t0H2",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ewb7xm:qrecall",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "2 : 3 = 4 : 6에서 외항과 내항을 말해 봐.",
"newQBy": "claude",
"answer": "외항은 2와 6, 내항은 3과 4야.",
"keys": [
"외항 2와 6",
"내항 3과 4"
],
"answerBy": "claude"
},
{
"id": "1ewb7xm:qreason",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "3 : 4와 9 : 12로 비례식을 세울 수 있는지 어떻게 확인해?",
"newQBy": "claude",
"answer": "두 비의 비율을 구해서 같은지 봐. 3/4와 9/12 = 3/4로 같으니까 3 : 4 = 9 : 12로 세울 수 있어.",
"keys": [
"비율을 비교한다",
"둘 다 3/4"
],
"answerBy": "claude"
},
{
"id": "1ewb7xm:qexample",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1ewb7xm:qerror",
"big": "4. 비례식과 비례배분",
"small": "03. 비례식을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 2 : 3과 4 : 6은 수가 서로 달라서 비례식이 아니라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "수가 달라도 비율이 같으면 비례식이야. 2/3와 4/6 = 2/3로 같으니까 2 : 3 = 4 : 6이야.",
"keys": [
"비율이 같으면 비례식",
"2/3로 같다"
],
"answerBy": "claude"
},
{
"id": "301yqk:t0L1",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비례식에서 외항의 곱과 내항의 곱은 어떤 관계야?",
"newQBy": "claude",
"answer": "외항의 곱과 내항의 곱은 같아.",
"keys": [
"외항의 곱 = 내항의 곱"
],
"answerBy": "claude"
},
{
"id": "301yqk:t0L2",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "301yqk:t0H1",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "5 : 3 = 10 : □에서 □를 구하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "외항의 곱과 내항의 곱이 같으니까 5 × □ = 3 × 10 = 30이야. 그래서 □는 6이야.",
"keys": [
"5 × □ = 3 × 10",
"□ = 6"
],
"answerBy": "claude"
},
{
"id": "301yqk:t0H2",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "301yqk:qrecall",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "301yqk:qreason",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "2 : 3 = 4 : 6에서 외항의 곱과 내항의 곱이 같은지 확인하고, 왜 같아지는지 말해 봐.",
"newQBy": "claude",
"answer": "외항의 곱 2 × 6 = 12, 내항의 곱 3 × 4 = 12로 같아. 4 : 6은 2 : 3의 각 항에 2를 곱한 거라서 두 곱이 똑같이 커져.",
"keys": [
"2 × 6 = 3 × 4 = 12",
"각 항에 같은 수를 곱한 비"
],
"answerBy": "claude"
},
{
"id": "301yqk:qexample",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "301yqk:qerror",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 5 : 3 = 10 : □에서 5 × 10 = 3 × □로 놓았어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "외항끼리, 내항끼리 곱해야 해. 5 × □ = 3 × 10이니까 □는 6이야.",
"keys": [
"외항끼리, 내항끼리 곱한다",
"□ = 6"
],
"answerBy": "claude"
},
{
"id": "301yqk:qa22e6241",
"big": "4. 비례식과 비례배분",
"small": "04. 비례식의 성질을 알아볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "4 : 7 = □ : 21에서 □를 구하는 과정을 말해 봐.",
"answer": "외항의 곱 4 × 21 = 84와 내항의 곱 7 × □가 같으니까 □는 12야.",
"keys": [
"4 × 21 = 7 × □",
"□ = 12"
],
"answerBy": "claude"
},
{
"id": "1ukj7lx:t0L1",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비례식으로 문제를 풀 때 먼저 어떻게 해?",
"newQBy": "claude",
"answer": "구하려는 것을 □로 놓고, 같은 순서로 두 비를 맞춰 비례식을 세워.",
"keys": [
"구하려는 것을 □로",
"비례식을 세운다"
],
"answerBy": "claude"
},
{
"id": "1ukj7lx:t0L2",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ukj7lx:t0H1",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "6분 동안 8 km를 가는 차가 30분 동안 가는 거리를 비례식으로 구하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "6 : 8 = 30 : □로 세워. 6 × □ = 8 × 30 = 240이니까 □는 40, 곧 40 km야.",
"keys": [
"6 : 8 = 30 : □",
"40 km"
],
"answerBy": "claude"
},
{
"id": "1ukj7lx:t0H2",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ukj7lx:qrecall",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1ukj7lx:qreason",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1ukj7lx:qexample",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1ukj7lx:qerror",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 4분에 6 km를 가는 자전거가 20분 동안 가는 거리를 6 : 4 = 20 : □로 세웠어. 뭐가 잘못됐는지 찾고, 바른 식도 말해 봐.",
"newQBy": "claude",
"answer": "두 비의 순서가 서로 달라. 시간 : 거리로 맞춰 4 : 6 = 20 : □로 세워야 하고, □는 30 km야.",
"keys": [
"두 비의 순서를 맞춘다",
"4 : 6 = 20 : □, 30 km"
],
"answerBy": "claude"
},
{
"id": "1ukj7lx:qa22e6251",
"big": "4. 비례식과 비례배분",
"small": "05. 비례식을 활용해 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "쌀과 보리를 5 : 2로 섞으려고 해. 쌀을 15컵 넣으면 보리는 몇 컵 넣어야 해? 식과 답을 말해 봐.",
"answer": "5 : 2 = 15 : □로 세우면 5 × □ = 30이니까 보리는 6컵이야.",
"keys": [
"5 : 2 = 15 : □",
"6컵"
],
"answerBy": "claude"
},
{
"id": "1nja8s4:t0L1",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "비례배분이 뭐야?",
"newQBy": "claude",
"answer": "전체를 주어진 비로 나누는 거야.",
"keys": [
"전체를 주어진 비로 나눈다"
],
"answerBy": "claude"
},
{
"id": "1nja8s4:t0L2",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1nja8s4:t0H1",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "15를 2 : 3으로 비례배분하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "전체 몫은 2 + 3 = 5야. 15 × 2/5 = 6, 15 × 3/5 = 9로 나눠.",
"keys": [
"2 + 3 = 5",
"6과 9"
],
"answerBy": "claude"
},
{
"id": "1nja8s4:t0H2",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "비례배분할 때 왜 전항과 후항의 합을 분모로 하는 분수를 곱해?",
"newQBy": "claude",
"answer": "2 : 3으로 나누면 전체가 5몫이고 그중 2몫, 3몫을 가져. 그래서 전체의 2/5, 3/5를 곱해.",
"keys": [
"전체가 합만큼의 몫",
"각각 2/5, 3/5"
],
"answerBy": "claude"
},
{
"id": "1nja8s4:qrecall",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1nja8s4:qreason",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1nja8s4:qexample",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1nja8s4:qerror",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 15를 2 : 3으로 비례배분하면서 15 × 2/2와 15 × 3/2로 계산했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "분모는 전항과 후항의 합 5여야 해. 15 × 2/5 = 6, 15 × 3/5 = 9야.",
"keys": [
"분모는 합 5",
"6과 9"
],
"answerBy": "claude"
},
{
"id": "1nja8s4:qa22e6261",
"big": "4. 비례식과 비례배분",
"small": "06. 비례배분을 해 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "구슬 36개를 형과 동생이 4 : 5로 나누어 가지면 각각 몇 개야? 과정과 답을 말해 봐.",
"answer": "4 + 5 = 9니까 형은 36 × 4/9 = 16개, 동생은 36 × 5/9 = 20개야.",
"keys": [
"36 × 4/9, 36 × 5/9",
"16개와 20개"
],
"answerBy": "claude"
},
{
"id": "1muug30:t0L1",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원주가 뭐야?",
"newQBy": "claude",
"answer": "원의 둘레를 원주라고 해.",
"keys": [
"원의 둘레"
],
"answerBy": "claude"
},
{
"id": "1muug30:t0L2",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원주율이 뭐야?",
"newQBy": "claude",
"answer": "원의 지름에 대한 원주의 비율이야. 원주 ÷ 지름으로 구하고, 보통 3.14를 써.",
"keys": [
"원주 ÷ 지름",
"3.14"
],
"answerBy": "claude"
},
{
"id": "1muug30:t0H1",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1muug30:t0H2",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1muug30:qrecall",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "지름이 4 cm인 원의 원주가 12.56 cm야. 원주율은 어떻게 구해?",
"newQBy": "claude",
"answer": "원주 ÷ 지름이니까 12.56 ÷ 4 = 3.14야.",
"keys": [
"원주 ÷ 지름",
"3.14"
],
"answerBy": "claude"
},
{
"id": "1muug30:qreason",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "두 원의 지름과 원주가 4 cm와 12.56 cm, 8 cm와 25.12 cm야. 두 원의 원주율을 비교하고, 원이 커져도 왜 같은지 말해 봐.",
"newQBy": "claude",
"answer": "둘 다 3.14야. 원이 커지면 지름과 원주가 같은 비율로 함께 커져서 원주 ÷ 지름은 변하지 않아.",
"keys": [
"둘 다 3.14",
"지름과 원주가 같은 비율로 커진다"
],
"answerBy": "claude"
},
{
"id": "1muug30:qexample",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1muug30:qerror",
"big": "5. 원의 둘레와 넓이",
"small": "01. 원주와 원주율을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 원이 커지면 원주율도 커진다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "원주율은 원의 크기와 상관없이 항상 같아. 원이 커지면 원주와 지름이 함께 커지기 때문이야.",
"keys": [
"원주율은 항상 같다",
"원주와 지름이 함께 커진다"
],
"answerBy": "claude"
},
{
"id": "2357m1:t0L1",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "지름을 알 때 원주는 어떻게 구해?",
"newQBy": "claude",
"answer": "지름 × 원주율로 구해.",
"keys": [
"지름 × 원주율"
],
"answerBy": "claude"
},
{
"id": "2357m1:t0L2",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원주를 알 때 지름은 어떻게 구해?",
"newQBy": "claude",
"answer": "원주 ÷ 원주율로 구해.",
"keys": [
"원주 ÷ 원주율"
],
"answerBy": "claude"
},
{
"id": "2357m1:t0H1",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "지름이 10 cm인 원의 원주를 구하는 과정을 말해 봐. 원주율은 3.14야.",
"newQBy": "claude",
"answer": "원주는 지름 × 원주율이니까 10 × 3.14 = 31.4 cm야.",
"keys": [
"10 × 3.14",
"31.4 cm"
],
"answerBy": "claude"
},
{
"id": "2357m1:t0H2",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2357m1:qrecall",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "2357m1:qreason",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "2357m1:qexample",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "2357m1:qerror",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 반지름이 4 cm인 원의 원주를 4 × 3.14 = 12.56 cm라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "원주는 반지름이 아니라 지름에 원주율을 곱해. 지름 8 cm × 3.14 = 25.12 cm야.",
"keys": [
"지름에 곱한다",
"25.12 cm"
],
"answerBy": "claude"
},
{
"id": "2357m1:qa22e6221",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "원주가 37.68 cm인 원의 지름을 구하는 과정을 말해 봐. 원주율은 3.14야.",
"answer": "지름은 원주 ÷ 원주율이니까 37.68 ÷ 3.14 = 12 cm야.",
"keys": [
"37.68 ÷ 3.14",
"12 cm"
],
"answerBy": "claude"
},
{
"id": "2357m1:qa22e6222",
"big": "5. 원의 둘레와 넓이",
"small": "02. 원주와 지름을 구해 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "지름이 60 cm인 굴렁쇠를 한 바퀴 굴리면 몇 cm를 가? 식과 답을 말해 봐. 원주율은 3.14야.",
"answer": "한 바퀴 가는 거리는 원주와 같아. 60 × 3.14 = 188.4 cm야.",
"keys": [
"한 바퀴 = 원주",
"188.4 cm"
],
"answerBy": "claude"
},
{
"id": "10ptnmf:t0L1",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원의 넓이는 어떤 도형으로 어림해?",
"newQBy": "claude",
"answer": "원 안에 꼭 맞는 정사각형과 원 밖을 둘러싼 정사각형으로 어림해.",
"keys": [
"원 안의 정사각형",
"원 밖의 정사각형"
],
"answerBy": "claude"
},
{
"id": "10ptnmf:t0L2",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10ptnmf:t0H1",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "원 안과 밖의 정사각형을 이용해 원의 넓이를 어림하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "원 안의 정사각형 넓이보다는 크고, 원 밖의 정사각형 넓이보다는 작다고 어림해.",
"keys": [
"안의 정사각형보다 크다",
"밖의 정사각형보다 작다"
],
"answerBy": "claude"
},
{
"id": "10ptnmf:t0H2",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "10ptnmf:qrecall",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "원 안의 정사각형 넓이가 50 cm², 원 밖의 정사각형 넓이가 100 cm²야. 원의 넓이는 어느 범위에 있어?",
"newQBy": "claude",
"answer": "50 cm²보다 크고 100 cm²보다 작아.",
"keys": [
"50 cm²보다 크다",
"100 cm²보다 작다"
],
"answerBy": "claude"
},
{
"id": "10ptnmf:qreason",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "10ptnmf:qexample",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "10ptnmf:qerror",
"big": "5. 원의 둘레와 넓이",
"small": "03. 원의 넓이를 어림해 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 원 안의 정사각형 넓이가 200 cm²라서 원의 넓이도 정확히 200 cm²라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "원 안의 정사각형은 원보다 작아. 그래서 원의 넓이는 200 cm²보다 커.",
"keys": [
"안의 정사각형은 원보다 작다",
"200 cm²보다 크다"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:t0L1",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wbcjzk:t0L2",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원의 넓이는 어떻게 구해?",
"newQBy": "claude",
"answer": "반지름 × 반지름 × 원주율로 구해.",
"keys": [
"반지름 × 반지름 × 원주율"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:t0H1",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "원을 잘라 직사각형으로 만들어서 원의 넓이 공식이 나오는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "직사각형의 가로는 원주의 1/2, 세로는 반지름이야. 원주의 1/2은 반지름 × 원주율이라 넓이는 반지름 × 반지름 × 원주율이야.",
"keys": [
"가로 = 원주의 1/2, 세로 = 반지름",
"반지름 × 반지름 × 원주율"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:t0H2",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "반지름이 2배가 되면 원의 넓이는 몇 배가 되는지 이유와 함께 말해 봐.",
"newQBy": "claude",
"answer": "넓이 식에서 반지름을 두 번 곱하니까 2 × 2 = 4배가 돼.",
"keys": [
"반지름을 두 번 곱한다",
"4배"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:qrecall",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "반지름이 4 cm인 원의 넓이를 구해 봐. 원주율은 3.14야.",
"newQBy": "claude",
"answer": "4 × 4 × 3.14 = 50.24 cm²야.",
"keys": [
"4 × 4 × 3.14",
"50.24 cm²"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:qreason",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "wbcjzk:qexample",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "wbcjzk:qerror",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 반지름이 5 cm인 원의 넓이를 지름으로 10 × 10 × 3.14 = 314 cm²라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "넓이는 지름이 아니라 반지름을 두 번 곱해. 5 × 5 × 3.14 = 78.5 cm²야.",
"keys": [
"반지름을 두 번 곱한다",
"78.5 cm²"
],
"answerBy": "claude"
},
{
"id": "wbcjzk:qa22e6241",
"big": "5. 원의 둘레와 넓이",
"small": "04. 원의 넓이를 구하는 방법을 알아볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "둘레가 31.4 cm인 원의 넓이는 어떤 차례로 구해? 원주율은 3.14야.",
"answer": "먼저 지름을 31.4 ÷ 3.14 = 10 cm로 구해. 반지름은 5 cm라서 넓이는 5 × 5 × 3.14 = 78.5 cm²야.",
"keys": [
"둘레로 지름·반지름을 구한다",
"78.5 cm²"
],
"answerBy": "claude"
},
{
"id": "ctfuf0:t0L1",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "색칠한 부분의 넓이를 전체 넓이에서 빼서 구하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "색칠한 부분을 담고 있는 전체 도형의 넓이를 구하고, 색칠하지 않은 부분의 넓이를 빼.",
"keys": [
"전체 넓이를 구한다",
"색칠하지 않은 부분을 뺀다"
],
"answerBy": "claude"
},
{
"id": "ctfuf0:t0L2",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ctfuf0:t0H1",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ctfuf0:t0H2",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "색칠한 부분의 일부를 옮겨 간단한 모양으로 바꿔도 넓이가 변하지 않는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "모양의 자리만 옮긴 거라서 빠지거나 더해진 부분이 없어. 그래서 넓이는 같아.",
"keys": [
"자리만 옮겼다",
"빠지거나 더해진 부분이 없다"
],
"answerBy": "claude"
},
{
"id": "ctfuf0:qrecall",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "한 변이 6 cm인 정사각형 안에 반지름 3 cm인 원이 꼭 맞게 있어. 정사각형에서 원을 뺀 넓이를 구해 봐. 원주율은 3.14야.",
"newQBy": "claude",
"answer": "6 × 6 = 36에서 3 × 3 × 3.14 = 28.26을 빼면 7.74 cm²야.",
"keys": [
"36 − 28.26",
"7.74 cm²"
],
"answerBy": "claude"
},
{
"id": "ctfuf0:qreason",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ctfuf0:qexample",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "ctfuf0:qerror",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 정사각형 안에 원이 있는 그림에서 정사각형에서 원을 뺀 넓이를 구하는데, 원의 넓이만 답으로 썼어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "구하는 건 정사각형에서 원을 뺀 부분이야. 정사각형 넓이를 구해서 원의 넓이를 빼야 해.",
"keys": [
"정사각형 넓이를 구한다",
"원의 넓이를 뺀다"
],
"answerBy": "claude"
},
{
"id": "ctfuf0:qa22e6251",
"big": "5. 원의 둘레와 넓이",
"small": "05. 원의 둘레와 넓이를 활용해 볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "반지름이 10 cm인 원 모양의 피자를 똑같이 4조각으로 나눴어. 한 조각의 넓이를 구하는 과정을 말해 봐. 원주율은 3.14야.",
"answer": "원의 넓이는 10 × 10 × 3.14 = 314 cm²이고, 4로 나누면 78.5 cm²야.",
"keys": [
"원의 넓이 314 cm²",
"÷ 4 = 78.5 cm²"
],
"answerBy": "claude"
},
{
"id": "16ugm2:t0L1",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원기둥은 어떤 입체도형이야?",
"newQBy": "claude",
"answer": "서로 평행하고 합동인 두 원을 밑면으로 하고, 옆면이 굽은 면인 입체도형이야.",
"keys": [
"평행하고 합동인 두 원",
"옆면은 굽은 면"
],
"answerBy": "claude"
},
{
"id": "16ugm2:t0L2",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원기둥의 밑면, 옆면, 높이는 각각 뭐야?",
"newQBy": "claude",
"answer": "서로 평행하고 합동인 두 면이 밑면, 두 밑면과 만나는 굽은 면이 옆면, 두 밑면 사이의 거리가 높이야.",
"keys": [
"밑면 = 평행한 두 원",
"옆면 = 굽은 면",
"높이 = 두 밑면 사이의 거리"
],
"answerBy": "claude"
},
{
"id": "16ugm2:t0H1",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "직사각형 종이를 한 변을 기준으로 한 바퀴 돌려 원기둥을 만들면 직사각형의 변들은 원기둥의 어디가 되는지 말해 봐.",
"newQBy": "claude",
"answer": "기준이 된 변은 원기둥의 높이가 되고, 그 변에 수직인 변이 밑면의 반지름이 돼.",
"keys": [
"기준 변 = 높이",
"수직인 변 = 반지름"
],
"answerBy": "claude"
},
{
"id": "16ugm2:t0H2",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "원기둥과 각기둥의 같은 점과 다른 점을 말해 봐.",
"newQBy": "claude",
"answer": "둘 다 두 밑면이 서로 평행하고 합동이야. 원기둥은 밑면이 원이고 옆면이 굽은 면이며 꼭짓점과 모서리가 없어.",
"keys": [
"두 밑면이 평행하고 합동",
"원기둥은 꼭짓점·모서리가 없다"
],
"answerBy": "claude"
},
{
"id": "16ugm2:qrecall",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "16ugm2:qreason",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "16ugm2:qexample",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "16ugm2:qerror",
"big": "6. 원기둥, 원뿔, 구",
"small": "01. 원기둥을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 원기둥에는 밑면이 1개뿐이라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "원기둥에는 서로 평행하고 합동인 밑면이 2개 있어.",
"keys": [
"밑면은 2개"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:t0L1",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "nc4ahp:t0L2",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원기둥의 전개도에서 밑면과 옆면은 각각 어떤 모양이야?",
"newQBy": "claude",
"answer": "밑면은 합동인 원 2개, 옆면은 직사각형 1개야.",
"keys": [
"밑면 = 원 2개",
"옆면 = 직사각형"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:t0H1",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "원기둥 전개도에서 옆면의 가로는 왜 밑면의 둘레와 같아?",
"newQBy": "claude",
"answer": "옆면이 밑면을 한 바퀴 빙 둘러싸기 때문이야.",
"keys": [
"옆면이 밑면을 한 바퀴 둘러싼다"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:t0H2",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "원기둥 전개도에서 옆면의 세로는 원기둥의 어느 길이와 같아?",
"newQBy": "claude",
"answer": "원기둥의 높이와 같아.",
"keys": [
"높이와 같다"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:qrecall",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "밑면의 반지름이 3 cm인 원기둥의 전개도에서 옆면의 가로는 어떻게 구해? 원주율은 3.14야.",
"newQBy": "claude",
"answer": "옆면의 가로는 밑면의 둘레니까 6 × 3.14 = 18.84 cm야.",
"keys": [
"밑면의 둘레",
"18.84 cm"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:qreason",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "원기둥의 전개도에서 두 밑면의 크기는 왜 서로 같아야 해?",
"newQBy": "claude",
"answer": "원기둥의 두 밑면은 서로 합동이라서 전개도에서도 크기가 같아야 접었을 때 원기둥이 돼.",
"keys": [
"두 밑면은 합동",
"크기가 달라야 접히지 않는다"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:qexample",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "nc4ahp:qerror",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 원기둥 전개도를 그리면서 옆면의 가로를 밑면의 지름 길이로 그렸어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "옆면의 가로는 밑면을 한 바퀴 둘러싸야 해서 지름이 아니라 밑면의 둘레와 같아야 해.",
"keys": [
"가로 = 밑면의 둘레",
"지름이 아니다"
],
"answerBy": "claude"
},
{
"id": "nc4ahp:qa22e6221",
"big": "6. 원기둥, 원뿔, 구",
"small": "02. 원기둥의 전개도를 알아볼까요",
"kind": "add",
"round": 2,
"by": "claude",
"q": "밑면의 지름이 10 cm이고 높이가 8 cm인 원기둥의 옆면 넓이는 어떻게 구해? 원주율은 3.14야.",
"answer": "옆면은 가로가 10 × 3.14 = 31.4 cm, 세로가 8 cm인 직사각형이야. 넓이는 31.4 × 8 = 251.2 cm²야.",
"keys": [
"가로 31.4 cm, 세로 8 cm",
"251.2 cm²"
],
"answerBy": "claude"
},
{
"id": "p5tqmr:t0L1",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원뿔은 어떤 입체도형이야?",
"newQBy": "claude",
"answer": "평평한 면이 원 1개이고, 옆면이 굽은 면인 뿔 모양의 입체도형이야.",
"keys": [
"밑면이 원 1개",
"뿔 모양"
],
"answerBy": "claude"
},
{
"id": "p5tqmr:t0L2",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "원뿔의 꼭짓점, 모선, 높이는 각각 뭐야?",
"newQBy": "claude",
"answer": "뾰족한 점이 꼭짓점, 꼭짓점과 밑면 둘레의 한 점을 이은 선분이 모선, 꼭짓점에서 밑면에 수직으로 내린 선분의 길이가 높이야.",
"keys": [
"모선 = 꼭짓점과 밑면 둘레를 이은 선분",
"높이 = 꼭짓점에서 밑면에 수직인 길이"
],
"answerBy": "claude"
},
{
"id": "p5tqmr:t0H1",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "직각삼각형 종이를 한 변을 기준으로 한 바퀴 돌려 원뿔을 만들면 삼각형의 변들은 원뿔의 어디가 되는지 말해 봐.",
"newQBy": "claude",
"answer": "기준이 된 변은 높이, 그 변에 수직인 변은 밑면의 반지름, 빗변은 모선이 돼.",
"keys": [
"기준 변 = 높이",
"수직인 변 = 반지름, 빗변 = 모선"
],
"answerBy": "claude"
},
{
"id": "p5tqmr:t0H2",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "원뿔에서 모선의 길이가 높이보다 긴 이유를 말해 봐.",
"newQBy": "claude",
"answer": "높이는 꼭짓점에서 밑면까지 수직으로 내린 가장 짧은 길이야. 모선은 비스듬히 기울어져 있어서 더 길어.",
"keys": [
"높이는 수직인 가장 짧은 길이",
"모선은 비스듬하다"
],
"answerBy": "claude"
},
{
"id": "p5tqmr:qrecall",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "p5tqmr:qreason",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "p5tqmr:qexample",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "p5tqmr:qerror",
"big": "6. 원기둥, 원뿔, 구",
"small": "03. 원뿔을 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 원뿔의 모선과 높이는 길이가 같다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "높이는 밑면에 수직인 길이고 모선은 비스듬한 길이라서 모선이 높이보다 길어.",
"keys": [
"모선이 높이보다 길다"
],
"answerBy": "claude"
},
{
"id": "dxxntc:t0L1",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "구의 중심과 구의 반지름은 각각 뭐야?",
"newQBy": "claude",
"answer": "구에서 가장 안쪽에 있는 점이 중심이고, 중심과 겉면의 한 점을 이은 선분이 반지름이야.",
"keys": [
"가장 안쪽 점 = 중심",
"중심과 겉면을 이은 선분 = 반지름"
],
"answerBy": "claude"
},
{
"id": "dxxntc:t0L2",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "한 구에서 반지름은 몇 개이고 길이는 어때?",
"newQBy": "claude",
"answer": "셀 수 없이 많고 길이는 모두 같아.",
"keys": [
"셀 수 없이 많다",
"길이가 모두 같다"
],
"answerBy": "claude"
},
{
"id": "dxxntc:t0H1",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "반원 모양의 종이를 지름을 기준으로 한 바퀴 돌려 구를 만들면 반원의 중심과 반지름은 구의 어디가 되는지 말해 봐.",
"newQBy": "claude",
"answer": "반원의 중심은 구의 중심이 되고, 반원의 반지름은 구의 반지름이 돼.",
"keys": [
"반원의 중심 = 구의 중심",
"반원의 반지름 = 구의 반지름"
],
"answerBy": "claude"
},
{
"id": "dxxntc:t0H2",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "구는 어느 방향에서 보아도 모양이 원인 이유를 말해 봐.",
"newQBy": "claude",
"answer": "구는 중심에서 겉면까지의 거리가 어느 방향이나 같아서 어느 쪽에서 보아도 반지름이 같은 원으로 보여.",
"keys": [
"중심에서 겉면까지 거리가 모두 같다",
"어느 방향에서나 원"
],
"answerBy": "claude"
},
{
"id": "dxxntc:qrecall",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "dxxntc:qreason",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "dxxntc:qexample",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "dxxntc:qerror",
"big": "6. 원기둥, 원뿔, 구",
"small": "04. 구를 알아볼까요",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 구의 중심은 겉면 위의 아무 점이나 될 수 있다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "구의 중심은 겉면이 아니라 구의 가장 안쪽에 있는 한 점이야.",
"keys": [
"중심은 가장 안쪽의 한 점"
],
"answerBy": "claude"
}
],
"seen": []
}});
