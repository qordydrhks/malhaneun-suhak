/* [v84.0] 질문 고르기 — 기본으로 실어 두는 분류안 (초5-1)
   마스터 견본(2026-09-17 내보내기) + Claude 분류안(1·6단원 미분류 55개, by:'claude').
   review.js 가 화면을 열 때 한 번만 넣는다(이 기기에 이미 적어 둔 것은 안 덮는다). key 를 바꾸면 다시 넣는다. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-1_2026-09-17a', data:{
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
"newQ": "② 곱셈과 나눗셈이 섞인 식은 어디부터 계산해?"
},
{
"id": "5gyhzp:t0L3",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "low",
"round": 1,
"newQ": "③ 혼합계산에서 괄호는 어떤 의미야?"
},
{
"id": "5gyhzp:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"newQ": "① 덧셈과 뺄셈이 섞인 식을 앞에서부터 차례로 계산하는 이유는 뭐야~?",
"round": 2,
"by": "claude"
},
{
"id": "5gyhzp:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"newQ": "② 괄호가 있는 식과 없는 식의 계산 결과가 항상 다른가? 다르면 어떻게 달라지지?",
"round": 2,
"by": "claude"
},
{
"id": "5gyhzp:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "5gyhzp:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "5gyhzp:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "5gyhzp:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1wpszzi:t0L1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "1wpszzi:t0L2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "1wpszzi:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"newQ": "① 덧셈·뺄셈·곱셈이 섞인 식이 주어졌을 때 계산 과정을 말해봐",
"round": 1,
"by": "claude"
},
{
"id": "1wpszzi:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"newQ": "② 괄호를 가장 먼저 계산해야 하는 이유를 말해볼래?",
"round": 2,
"by": "claude"
},
{
"id": "1wpszzi:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "1wpszzi:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1wpszzi:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1wpszzi:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"newQ": "친구가 4+2×3을 앞에서부터 4+2=6을 먼저 계산해서 6×3=18이라고 했어. 바르게 계산한 값과 차이는 얼마인지 설명해봐",
"round": 2,
"by": "claude"
},
{
"id": "1wpszzi:qcondition",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1fe8f8x:t0L1",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "low",
"round": 1
},
{
"id": "1fe8f8x:t0L2",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "low",
"round": 1
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
"round": 2
},
{
"id": "1fe8f8x:qrecall",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2
},
{
"id": "1fe8f8x:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2
},
{
"id": "1fe8f8x:qexample",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2
},
{
"id": "1fe8f8x:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "qset",
"round": 2
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
"newQ": "② 직사각형의 둘레를 구하는 방법을 설명해줘"
},
{
"id": "iz44bc:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 1,
"newQ": "한 변이 4cm인 정칠각형의 둘레를 구해 봐."
},
{
"id": "iz44bc:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2,
"newQ": "정다각형의 둘레는 왜 (한 변의 길이)×(변의 수)로 구할 수 있을까?"
},
{
"id": "iz44bc:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2
},
{
"id": "iz44bc:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "qset",
"round": 2,
"newQ": "가로 6cm, 세로 4cm인 직사각형의 둘레를 친구가 10cm라고 했어. 어떤 실수를 했지?"
},
{
"id": "jr7bdp:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "jr7bdp:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "jr7bdp:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "high",
"round": 1,
"by": "claude"
},
{
"id": "jr7bdp:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "high",
"round": 2,
"by": "claude"
},
{
"id": "jr7bdp:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "jr7bdp:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "jr7bdp:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "jr7bdp:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "hzg2ev:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "hzg2ev:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "hzg2ev:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "high",
"round": 1,
"by": "claude"
},
{
"id": "hzg2ev:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "high",
"round": 2,
"by": "claude"
},
{
"id": "hzg2ev:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "hzg2ev:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "hzg2ev:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "hzg2ev:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "r6ywyq:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "r6ywyq:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "r6ywyq:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 1,
"by": "claude"
},
{
"id": "r6ywyq:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 2,
"by": "claude"
},
{
"id": "r6ywyq:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "r6ywyq:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "r6ywyq:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "r6ywyq:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "135vnrh:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "135vnrh:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "low",
"round": 1,
"by": "claude"
},
{
"id": "135vnrh:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "high",
"round": 1,
"by": "claude"
},
{
"id": "135vnrh:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "high",
"round": 2,
"by": "claude"
},
{
"id": "135vnrh:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "135vnrh:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "135vnrh:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "135vnrh:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
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
"newQ": "② 넓이 식에서 나누기 2 하는 이유가 뭐야?"
},
{
"id": "z646k9:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "high",
"round": 1
},
{
"id": "z646k9:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "high",
"round": 2
},
{
"id": "z646k9:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 1
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
"round": 2
},
{
"id": "z646k9:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "qset",
"round": 2
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
"newQ": "① 마름모의 넓이를 구하려면 어떤 걸 알아야 하지?"
},
{
"id": "q1y70m:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "low",
"round": 2,
"newQ": "② 마름모 구하는 식을 말하고 왜 나누기 2를 하는지 이유를 얘기해봐"
},
{
"id": "q1y70m:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "high",
"round": 1
},
{
"id": "q1y70m:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "high",
"round": 2,
"newQ": "② 문제에서 마름모의 넓이와 한 대각선의 길이가 주어지면 뭘 이용해서 어떤 걸 구해야 하지?"
},
{
"id": "q1y70m:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 1
},
{
"id": "q1y70m:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2
},
{
"id": "q1y70m:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2
},
{
"id": "q1y70m:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "qset",
"round": 2,
"newQ": "두 대각선이 10cm, 6cm인 마름모의 넓이를 친구가 10×3=30cm²라고 해서 맞았어. 뭘 먼저 계산한거지?"
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
"by": "claude"
},
{
"id": "1p3wdn9:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "low",
"newQ": "② 사다리꼴 구하는 식을 말하고 그렇게 계산하는 이유를 얘기해봐",
"round": 2,
"by": "claude"
},
{
"id": "1p3wdn9:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "high",
"round": 1,
"by": "claude"
},
{
"id": "1p3wdn9:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "high",
"round": 2,
"by": "claude"
},
{
"id": "1p3wdn9:qrecall",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 1,
"by": "claude"
},
{
"id": "1p3wdn9:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1p3wdn9:qexample",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
},
{
"id": "1p3wdn9:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude"
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
