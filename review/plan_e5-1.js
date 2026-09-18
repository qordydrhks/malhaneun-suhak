/* [v84.0] 질문 고르기 — 기본으로 실어 두는 분류안 (초5-1)
   마스터 견본(2026-09-17 내보내기) + Claude 분류안(1·6단원 미분류 55개, by:'claude')
   + 겹쳐서 Claude 가 뺀 9개(off:true, offBy:'claude') — 마스터 승인 2026-09-17.
   + Claude 모범 답 74개(answerBy:'claude') — 1·6단원에서 빼지 않았고 모범 답이 없던 질문 전부, 마스터 지시 2026-09-18.
   review.js 가 화면을 열 때 한 번만 넣는다(이 기기에 이미 적어 둔 것은 안 덮는다). key 를 바꾸면 다시 넣는다. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-1_2026-09-18c', data:{
"format": "qr-plan-2",
"grade": "e5-1",
"rounds": 3,
"items": [
{
"id": "5gyhzp:t0L1",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"newQ": "① 덧셈과 뺄셈이 섞인 식은 어디부터 계산해?",
"answer": "덧셈과 뺄셈이 혼합된 계산에서는 덧셈, 뺄셈 관계없이 앞에서부터 차례대로 계산하면 돼~",
"keys": [
"앞에서부터 차례대로"
]
},
{
"id": "5gyhzp:t0L2",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"newQ": "② 곱셈과 나눗셈이 섞인 식은 어디부터 계산해?",
"answer": "곱셈과 나눗셈이 섞인 식도 곱셈, 나눗셈 관계없이 앞에서부터 차례대로 계산하면 돼.",
"keys": [
"앞에서부터 차례대로"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:t0L3",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"newQ": "③ 혼합계산에서 괄호는 어떤 의미야?",
"answer": "괄호는 '이 부분을 먼저 계산해!'라는 표시야. 괄호 안을 한 덩어리로 보고 가장 먼저 계산해.",
"keys": [
"괄호 안을 가장 먼저 계산한다",
"한 덩어리로 묶는다"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"newQ": "① 덧셈과 뺄셈이 섞인 식을 앞에서부터 차례로 계산하는 이유는 뭐야~?",
"round": 2,
"by": "claude",
"answer": "순서를 바꾸면 답이 달라질 수 있기 때문이야. 10-3+2를 앞에서부터 하면 9인데, 3+2를 먼저 하면 5가 돼서 틀려.",
"keys": [
"순서를 바꾸면 답이 달라진다",
"앞에서부터 계산하기로 약속했다"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"newQ": "② 괄호가 있는 식과 없는 식의 계산 결과가 항상 다른가? 다르면 어떻게 달라지지?",
"round": 2,
"by": "claude",
"answer": "항상 다르지는 않아. (10-3)+2처럼 원래 순서대로 계산할 부분을 묶으면 답이 같고, 10-(3+2)처럼 계산 순서가 바뀌게 묶으면 답이 달라져.",
"keys": [
"항상 다르지는 않다",
"괄호가 계산 순서를 바꿀 때만 달라진다"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "앞에서부터 차례대로 계산해. 18-6=12를 먼저 하고, 12+2=14야.",
"keys": [
"18-6을 먼저 계산한다",
"답은 14"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "5gyhzp:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 20-8+5는 앞에서부터 20-8=12, 12+5=17이야.",
"keys": [
"덧셈과 뺄셈이 섞인 식을 만든다",
"앞에서부터 차례대로 계산한다"
],
"answerBy": "claude"
},
{
"id": "5gyhzp:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "뒤에 있는 5+3을 먼저 계산해서 틀렸어. 앞에서부터 12-5=7, 7+3=10이 맞아.",
"keys": [
"앞에서부터 계산하지 않았다",
"바른 답은 10"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:t0L1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "곱셈을 덧셈이나 뺄셈보다 먼저 계산해.",
"keys": [
"곱셈을 먼저 계산한다"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:t0L2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "괄호가 있으면 괄호 안을 가장 먼저 계산하고, 그다음 곱셈, 그다음 덧셈과 뺄셈을 계산해.",
"keys": [
"괄호 안을 가장 먼저",
"그다음 곱셈, 덧셈·뺄셈 순서"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"newQ": "① 덧셈·뺄셈·곱셈이 섞인 식이 주어졌을 때 계산 과정을 말해봐",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1wpszzi:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"newQ": "② 괄호를 가장 먼저 계산해야 하는 이유를 말해볼래?",
"round": 2,
"by": "claude",
"answer": "괄호는 '이 부분을 먼저 한 덩어리로 계산하라'는 약속이야. 그래서 괄호로 묶은 값을 먼저 구해야 식이 뜻하는 대로 계산돼.",
"keys": [
"괄호는 먼저 계산하라는 약속",
"묶은 부분이 한 덩어리 값이다"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "곱셈을 먼저 해. 2×4=8을 먼저 구하고, 3+8=11이야.",
"keys": [
"2×4를 먼저 계산한다",
"답은 11"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "2×3은 2가 3번 있다는 뜻이라 먼저 6이라는 한 덩어리 값으로 만들어야 해. 그래서 4+6=10이야.",
"keys": [
"2×3은 2가 3번 있는 한 덩어리",
"그 값을 먼저 구하고 더한다"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 5+3×4는 곱셈 먼저 3×4=12, 그다음 5+12=17이야.",
"keys": [
"덧셈과 곱셈이 섞인 식을 만든다",
"곱셈을 먼저 계산한다"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"newQ": "친구가 4+2×3을 앞에서부터 4+2=6을 먼저 계산해서 6×3=18이라고 했어. 바르게 계산한 값과 차이는 얼마인지 설명해봐",
"round": 2,
"by": "claude",
"answer": "곱셈을 먼저 해야 하니까 2×3=6, 4+6=10이 맞아. 친구 답 18과는 8만큼 차이 나.",
"keys": [
"곱셈을 먼저 하지 않았다",
"바른 답은 10",
"차이는 8"
],
"answerBy": "claude"
},
{
"id": "1wpszzi:qcondition",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "달라. (4+2)×3은 괄호 먼저 해서 6×3=18이고, 4+2×3은 곱셈 먼저 해서 4+6=10이야. 괄호가 먼저 계산할 부분을 바꾸기 때문이야.",
"keys": [
"답이 다르다(18과 10)",
"괄호가 계산 순서를 바꾼다"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:t0L1",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"answer": "괄호 안을 가장 먼저 계산하고, 그다음 곱셈과 나눗셈, 마지막으로 덧셈과 뺄셈을 계산해. 같은 단계끼리는 앞에서부터 해.",
"keys": [
"괄호 → 곱셈·나눗셈 → 덧셈·뺄셈",
"같은 단계는 앞에서부터"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:t0L2",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"answer": "괄호가 가장 먼저야.",
"keys": [
"괄호"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "high",
"off": true
},
{
"id": "1fe8f8x:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "high",
"round": 2,
"answer": "예를 들어 10-2×3은 곱셈 먼저 해서 10-6=4가 맞아. 그런데 앞에서부터 10-2=8, 8×3=24로 하면 답이 달라져.",
"keys": [
"예로 든 식을 바른 순서로 계산한다",
"순서를 어기면 다른 답이 나온다"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"answer": "괄호 먼저 4+3=7, 그다음 7×2=14와 8÷4=2를 계산하고, 마지막에 14-2=12야.",
"keys": [
"괄호 → 곱셈·나눗셈 → 뺄셈 순서",
"답은 12"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"answer": "(3+2)×4야. 괄호는 한 봉지에 든 구슬 수 3+2=5를 묶은 거고, 그런 봉지가 4개라서 5×4=20개야. 3+2×4는 파란 구슬만 4배 한 거라 틀려.",
"keys": [
"(3+2)×4",
"괄호는 한 봉지의 구슬 수를 묶는다"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"answer": "예를 들어 (6+2)×3-4는 괄호 먼저 8, 곱셈 8×3=24, 마지막에 24-4=20이야.",
"keys": [
"괄호, 곱셈, 뺄셈이 들어간 식을 만든다",
"괄호 → 곱셈 → 뺄셈 순서로 계산한다"
],
"answerBy": "claude"
},
{
"id": "1fe8f8x:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"answer": "괄호를 빼 버려서 3+2를 먼저 계산하지 않았어. 바르게 하면 5×4=20, 6÷2=3, 20-3=17이야.",
"keys": [
"괄호를 무시했다",
"바른 답은 17"
],
"answerBy": "claude"
},
{
"id": "iz44bc:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "low",
"round": 1,
"newQ": "① 다각형의 둘레란 어떤걸 의미 하는거야?",
"answer": "다각형의 둘레는 다각형을 만들고 있는 모든 변(선)의 길이의 합이야.",
"keys": [
"모든 변의 길이의 합"
]
},
{
"id": "iz44bc:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "low",
"round": 1,
"answer": "직사각형은 가로 두 개 세로 두 개로 이루어져 있으니까 둘레=(가로+세로)×2",
"keys": [
"(가로+세로)×2"
]
},
{
"id": "iz44bc:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "high",
"round": 1,
"newQ": "① 정다각형의 둘레를 어떻게 계산해야 하는지 설명해봐",
"answer": "정다각형은 모든 변의 길이가 같으므로 (한 변의 길이×변의 개수)로 구할 수 있어",
"keys": [
"모든 변의 길이가 같다, 한 변의 길이×변의 개수"
]
},
{
"id": "iz44bc:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "high",
"round": 2,
"newQ": "② 직사각형의 둘레를 구하는 방법을 설명해줘",
"answer": "직사각형은 가로가 2개, 세로가 2개 있어서 ((가로)+(세로))×2로 구해. (가로)×2+(세로)×2로 구해도 같아.",
"keys": [
"가로 2개, 세로 2개",
"((가로)+(세로))×2"
],
"answerBy": "claude"
},
{
"id": "iz44bc:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 1,
"newQ": "한 변이 4cm인 정칠각형의 둘레를 구해 봐.",
"answer": "정칠각형은 변이 7개이고 길이가 모두 같으니까 4×7=28(cm)이야.",
"keys": [
"변이 7개",
"답은 28 cm"
],
"answerBy": "claude"
},
{
"id": "iz44bc:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2,
"newQ": "정다각형의 둘레는 왜 (한 변의 길이)×(변의 수)로 구할 수 있을까?",
"answer": "정다각형은 모든 변의 길이가 같아서, 같은 길이를 변의 수만큼 더하는 거니까 곱셈으로 구할 수 있어.",
"keys": [
"모든 변의 길이가 같다",
"같은 수를 여러 번 더하는 것은 곱셈"
],
"answerBy": "claude"
},
{
"id": "iz44bc:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2,
"answer": "예를 들어 한 변이 5 cm인 정육각형은 변이 6개라서 5×6=30(cm)이야.",
"keys": [
"변의 수를 바르게 센다",
"(한 변의 길이)×(변의 수)로 구한다"
],
"answerBy": "claude"
},
{
"id": "iz44bc:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2,
"newQ": "가로 6cm, 세로 4cm인 직사각형의 둘레를 친구가 10cm라고 했어. 어떤 실수를 했지?",
"answer": "가로와 세로를 한 번씩만 더했어. 직사각형은 변이 4개라서 (6+4)×2=20(cm)이야.",
"keys": [
"가로와 세로를 한 번씩만 더했다",
"바른 답은 20 cm"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "한 변의 길이가 1 cm인 정사각형의 넓이야.",
"keys": [
"한 변이 1 cm인 정사각형"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "1 cm²짜리 정사각형이 몇 개 들어가는지 세는 거야.",
"keys": [
"1 cm²가 몇 개인지 센다"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jr7bdp:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "어떤 도형이든 1 cm²짜리 정사각형으로 빈틈없이 덮을 수 있어서, 그 개수가 넓이의 크기가 돼.",
"keys": [
"빈틈없이 덮을 수 있다",
"개수로 크기를 나타낸다"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "가로로 5개씩 4줄이 들어가니까 5×4=20개야. 그래서 넓이는 20 cm²야.",
"keys": [
"5개씩 4줄",
"20개(20 cm²)"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "모두 같은 기준으로 재야 누가 재도 같은 값이 나오고, 모양이 다른 도형끼리도 넓이를 비교할 수 있어.",
"keys": [
"같은 기준이면 값이 같다",
"넓이를 비교할 수 있다"
],
"answerBy": "claude"
},
{
"id": "jr7bdp:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "jr7bdp:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "1 cm²는 둘레가 아니라 한 변이 1 cm인 정사각형의 넓이야. 둘레는 길이고 넓이는 차지하는 크기라서 서로 달라.",
"keys": [
"한 변이 1 cm인 정사각형의 넓이",
"둘레(길이)와 넓이는 다르다"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(가로)×(세로)로 구해.",
"keys": [
"(가로)×(세로)"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(한 변의 길이)×(한 변의 길이)로 구해.",
"keys": [
"(한 변의 길이)×(한 변의 길이)"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "1 cm²가 가로로 (가로)만큼 한 줄에 들어가고, 그런 줄이 (세로)만큼 있어. 그래서 전체 개수가 (가로)×(세로)야.",
"keys": [
"한 줄에 (가로)개",
"그런 줄이 (세로)줄"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "정사각형은 가로와 세로가 같은 직사각형이야. 그래서 (가로)×(세로)가 (한 변)×(한 변)이 돼.",
"keys": [
"가로와 세로가 같은 직사각형",
"(가로)×(세로)와 같다"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "8×5=40이니까 넓이는 40 cm²야.",
"keys": [
"8×5",
"답은 40 cm²"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "hzg2ev:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 가로 7 cm, 세로 3 cm이면 7×3=21(cm²)이야.",
"keys": [
"(가로)×(세로)로 계산한다",
"단위를 cm²로 쓴다"
],
"answerBy": "claude"
},
{
"id": "hzg2ev:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "넓이는 가로와 세로를 곱해야 하는데 더했어. 6×4=24(cm²)가 맞아.",
"keys": [
"더하지 말고 곱해야 한다",
"바른 답은 24 cm²"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "1 m²는 10000 cm²야.",
"keys": [
"10000 cm²"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "1 km²는 1000000 m²야.",
"keys": [
"1000000 m²"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "1 m는 100 cm라서, 한 변이 1 m인 정사각형은 100 cm×100 cm야. 그래서 10000 cm²가 돼.",
"keys": [
"1 m=100 cm",
"100×100=10000"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "넓이가 작으면 cm², 방이나 교실처럼 크면 m², 도시나 산처럼 아주 넓으면 km²를 써. 수가 너무 커지거나 작아지지 않게 고르는 거야.",
"keys": [
"작으면 cm², 크면 m², 아주 넓으면 km²",
"수가 알맞은 크기가 되게 고른다"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1 m²가 10000 cm²니까 3 m²는 30000 cm²야.",
"keys": [
"1 m²=10000 cm²",
"답은 30000 cm²"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "r6ywyq:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 우리 교실은 가로 약 8 m, 세로 약 7 m라서 넓이는 약 56 m²야. 교실은 크니까 m²를 써.",
"keys": [
"m²처럼 알맞은 단위를 고른다",
"(가로)×(세로)로 어림한다"
],
"answerBy": "claude"
},
{
"id": "r6ywyq:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "길이처럼 100배만 했어. 넓이는 가로도 100 cm, 세로도 100 cm라서 100×100=10000 cm²야.",
"keys": [
"가로와 세로 모두 100 cm",
"1 m²=10000 cm²"
],
"answerBy": "claude"
},
{
"id": "135vnrh:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "밑변은 평행한 두 변 중 하나이고, 높이는 두 밑변 사이의 거리야. 밑변에 수직으로 그은 선의 길이지.",
"keys": [
"밑변은 평행한 두 변 중 하나",
"높이는 두 밑변 사이의 수직 거리"
],
"answerBy": "claude"
},
{
"id": "135vnrh:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "(밑변의 길이)×(높이)로 구해.",
"keys": [
"(밑변의 길이)×(높이)"
],
"answerBy": "claude"
},
{
"id": "135vnrh:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "평행사변형의 한쪽 삼각형을 잘라 반대쪽에 붙이면 직사각형이 돼. 그 직사각형의 가로는 밑변, 세로는 높이이고 넓이는 그대로라서 (밑변의 길이)×(높이)야.",
"keys": [
"잘라 붙이면 직사각형",
"가로=밑변, 세로=높이",
"넓이는 변하지 않는다"
],
"answerBy": "claude"
},
{
"id": "135vnrh:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "평행사변형은 잘라 붙이면 밑변과 높이가 같은 직사각형이 돼. 넓이는 밑변과 높이로만 정해지니까 기울어진 모양이 달라도 넓이는 같아.",
"keys": [
"넓이는 밑변과 높이로 정해진다",
"모양(기울기)은 넓이와 상관없다"
],
"answerBy": "claude"
},
{
"id": "135vnrh:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "7×3=21이니까 넓이는 21 cm²야.",
"keys": [
"7×3",
"답은 21 cm²"
],
"answerBy": "claude"
},
{
"id": "135vnrh:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "135vnrh:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 밑변 6 cm, 높이 4 cm이면 6×4=24(cm²)야.",
"keys": [
"(밑변의 길이)×(높이)로 계산한다",
"높이는 밑변에 수직인 길이"
],
"answerBy": "claude"
},
{
"id": "135vnrh:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "높이는 밑변에 수직인 길이인데 비스듬한 변을 썼어. 수직 높이 5 cm를 써서 8×5=40(cm²)이 맞아.",
"keys": [
"높이는 밑변에 수직인 길이",
"바른 답은 40 cm²"
],
"answerBy": "claude"
},
{
"id": "z646k9:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "low",
"round": 1,
"newQ": "① 삼각형의 넓이 구하는 식을 얘기해봐.",
"answer": "밑변×높이÷2"
},
{
"id": "z646k9:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "low",
"round": 2,
"newQ": "② 넓이 식에서 나누기 2 하는 이유가 뭐야?",
"answer": "똑같은 삼각형 두 개를 붙이면 평행사변형이 되는데, 삼각형은 그 절반이라서 2로 나눠.",
"keys": [
"삼각형 두 개로 평행사변형",
"삼각형은 그 절반"
],
"answerBy": "claude"
},
{
"id": "z646k9:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "high",
"round": 1,
"answer": "똑같은 삼각형 두 개를 붙이면 밑변과 높이가 같은 평행사변형이 돼. 삼각형은 그 평행사변형의 반이니까 (밑변의 길이)×(높이)÷2야.",
"keys": [
"두 개 붙이면 평행사변형",
"평행사변형의 반"
],
"answerBy": "claude"
},
{
"id": "z646k9:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "high",
"round": 2,
"answer": "삼각형의 넓이는 밑변과 높이로만 정해져. 그래서 꼭짓점이 옆으로 움직여 모양이 달라져도 밑변과 높이가 같으면 넓이가 같아.",
"keys": [
"넓이는 밑변과 높이로 정해진다",
"모양이 달라도 넓이가 같다"
],
"answerBy": "claude"
},
{
"id": "z646k9:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 1,
"answer": "8×5÷2=20이니까 넓이는 20 cm²야.",
"keys": [
"8×5÷2",
"답은 20 cm²"
],
"answerBy": "claude"
},
{
"id": "z646k9:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 2,
"off": true
},
{
"id": "z646k9:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 2,
"answer": "예를 들어 밑변 10 cm, 높이 6 cm이면 10×6÷2=30(cm²)이야.",
"keys": [
"(밑변의 길이)×(높이)÷2로 계산한다",
"2로 나누는 것을 잊지 않는다"
],
"answerBy": "claude"
},
{
"id": "z646k9:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 2,
"answer": "2로 나누지 않았어. 6×4=24는 평행사변형의 넓이고, 삼각형은 그 반이라서 24÷2=12(cm²)야.",
"keys": [
"2로 나누지 않았다",
"바른 답은 12 cm²"
],
"answerBy": "claude"
},
{
"id": "z646k9:qamu57w6iw8dq9",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "add",
"round": 1,
"answer": "높이는 밑변이라고 보는 변과 마주보는 꼭짓점에서 밑변 또는 밑변의 연장선에 수직인 선을 그었을 때 그 수직이 되는 선의 길이를 높이로 봐야해.",
"keys": [
"밑변과 마주보는 점, 밑변 또는 밑변의 연장선에 수직인 선을 긋는다."
],
"q": "삼각형에서 밑변은 어떤 변이든 될 수 있어. 그럼 높이는 어떻게 생각해야 하는지 얘기해봐."
},
{
"id": "q1y70m:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "low",
"round": 1,
"newQ": "① 마름모의 넓이를 구하려면 어떤 걸 알아야 하지?",
"answer": "두 대각선의 길이를 알아야 해.",
"keys": [
"두 대각선의 길이"
],
"answerBy": "claude"
},
{
"id": "q1y70m:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "low",
"round": 2,
"newQ": "② 마름모 구하는 식을 말하고 왜 나누기 2를 하는지 이유를 얘기해봐",
"answer": "(한 대각선의 길이)×(다른 대각선의 길이)÷2야. 두 대각선을 가로, 세로로 하는 직사각형을 그리면 마름모는 그 절반이라서 2로 나눠.",
"keys": [
"(한 대각선의 길이)×(다른 대각선의 길이)÷2",
"둘러싼 직사각형의 절반"
],
"answerBy": "claude"
},
{
"id": "q1y70m:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "high",
"round": 1,
"answer": "두 대각선을 가로, 세로로 하는 직사각형으로 마름모를 둘러싸면, 마름모는 그 직사각형 넓이의 절반이야. 그래서 (한 대각선의 길이)×(다른 대각선의 길이)÷2야.",
"keys": [
"대각선을 가로·세로로 하는 직사각형",
"마름모는 그 절반"
],
"answerBy": "claude"
},
{
"id": "q1y70m:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "high",
"round": 2,
"newQ": "② 문제에서 마름모의 넓이와 한 대각선의 길이가 주어지면 뭘 이용해서 어떤 걸 구해야 하지?",
"answer": "넓이 공식을 거꾸로 써서 다른 대각선의 길이를 구해. (넓이)×2÷(한 대각선의 길이)를 하면 돼.",
"keys": [
"넓이 공식을 이용한다",
"다른 대각선의 길이를 구한다"
],
"answerBy": "claude"
},
{
"id": "q1y70m:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 1,
"answer": "12×5÷2=30이니까 넓이는 30 cm²야.",
"keys": [
"12×5÷2",
"답은 30 cm²"
],
"answerBy": "claude"
},
{
"id": "q1y70m:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2,
"answer": "두 대각선을 가로, 세로로 하는 직사각형을 그리면 마름모는 그 넓이의 절반이야. 그래서 두 대각선을 곱하고 2로 나눠.",
"keys": [
"둘러싼 직사각형",
"그 넓이의 절반"
],
"answerBy": "claude"
},
{
"id": "q1y70m:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2,
"answer": "예를 들어 두 대각선이 8 cm, 6 cm이면 8×6÷2=24(cm²)야.",
"keys": [
"두 대각선을 곱한다",
"2로 나눈다"
],
"answerBy": "claude"
},
{
"id": "q1y70m:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2,
"newQ": "두 대각선이 10cm, 6cm인 마름모의 넓이를 친구가 10×3=30cm²라고 해서 맞았어. 뭘 먼저 계산한거지?",
"answer": "6 cm인 대각선을 먼저 2로 나눠서 3을 만들고, 10×3을 한 거야. 2로 나누는 걸 먼저 해도 답은 30 cm²로 같아.",
"keys": [
"한 대각선을 먼저 2로 나눴다",
"나누는 순서를 바꿔도 답이 같다"
],
"answerBy": "claude"
},
{
"id": "q1y70m:qamu5cv2ypubvl",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "add",
"round": 2,
"answer": "마름모는 네변의 길이가 같은 사각형이고, 평행사변형이라고도 말할 수 있기 때문에 마주보는 두쌍의 변이 평행하고, 마주보는 각의 크기가 같아. 그리고 두 대각선이 서로를 수직 이등분 한다는 특징이 있어.",
"keys": [
"네 변의 길이가 같다. 평행, 마주 보는 각이 같다. 대각선이 서로를 수직이등분 한다."
],
"q": "마름모의 뜻과 특징을 얘기해봐."
},
{
"id": "1p3wdn9:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "low",
"newQ": "① 사다리꼴의 넓이를 구하려면 뭘 알아야 구할 수 있어?",
"round": 1,
"by": "claude",
"answer": "윗변의 길이, 아랫변의 길이, 높이를 알아야 해.",
"keys": [
"윗변, 아랫변, 높이"
],
"answerBy": "claude"
},
{
"id": "1p3wdn9:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "low",
"newQ": "② 사다리꼴 구하는 식을 말하고 그렇게 계산하는 이유를 얘기해봐",
"round": 2,
"by": "claude",
"answer": "((윗변의 길이)+(아랫변의 길이))×(높이)÷2야. 똑같은 사다리꼴 두 개를 붙이면 밑변이 (윗변)+(아랫변)인 평행사변형이 되고, 사다리꼴은 그 절반이라서 2로 나눠.",
"keys": [
"((윗변의 길이)+(아랫변의 길이))×(높이)÷2",
"사다리꼴 두 개로 평행사변형, 그 절반"
],
"answerBy": "claude"
},
{
"id": "1p3wdn9:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "똑같은 사다리꼴 두 개를 거꾸로 붙이면 밑변이 (윗변)+(아랫변), 높이가 같은 평행사변형이 돼. 사다리꼴은 그 반이니까 ((윗변의 길이)+(아랫변의 길이))×(높이)÷2야.",
"keys": [
"밑변이 (윗변)+(아랫변)인 평행사변형",
"그 평행사변형의 반"
],
"answerBy": "claude"
},
{
"id": "1p3wdn9:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1p3wdn9:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "(5+9)×6÷2=42이니까 넓이는 42 cm²야.",
"keys": [
"(5+9)×6÷2",
"답은 42 cm²"
],
"answerBy": "claude"
},
{
"id": "1p3wdn9:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1p3wdn9:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 윗변 3 cm, 아랫변 7 cm, 높이 4 cm이면 (3+7)×4÷2=20(cm²)이야.",
"keys": [
"윗변과 아랫변을 더한다",
"높이를 곱하고 2로 나눈다"
],
"answerBy": "claude"
},
{
"id": "1p3wdn9:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "윗변 4 cm를 빼먹었어. 윗변과 아랫변을 더해서 (4+8)×5÷2=30(cm²)이 맞아.",
"keys": [
"윗변을 더하지 않았다",
"바른 답은 30 cm²"
],
"answerBy": "claude"
}
],
"seen": [
"E5111",
"E5112",
"E5113",
"E5161",
"E5167"
]
} });
