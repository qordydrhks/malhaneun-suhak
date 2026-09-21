/* [v84.0] 질문 고르기 — 기본으로 실어 두는 분류안 (초5-1)
   마스터 견본(2026-09-17 내보내기) + Claude 분류안(1·6단원 미분류 55개, by:'claude')
   + 겹쳐서 Claude 가 뺀 9개(off:true, offBy:'claude') — 마스터 승인 2026-09-17.
   + Claude 모범 답 74개(answerBy:'claude') — 1·6단원에서 빼지 않았고 모범 답이 없던 질문 전부, 마스터 지시 2026-09-18.
   [i] 마스터 검토(9/21 4단원) 반영(3·5단원 차이는 v85.3 미반영 기기라 무시) + 바뀐 질문 모범 답 4 + 4단원 기준으로 5단원 이유 질문 3개에 구체적 예·긴 오류 문장 1개 줄임.
   [h] 마스터 검토(9/21 3단원) 반영 + 3단원 기준으로 5단원 메타 질문 3개 뺌 + 바뀐 질문 모범 답 2개.
   [g] 3·4·5단원 Claude 2차 다듬기(1·2단원 검토 기준): 문장 23 · 뺌 3 · 활용 문장제 10(추가 질문).
   [f] 마스터 검토(2026-09-21, 1·2단원) 반영 + 바뀐 질문 모범 답 + 최대공약수·최소공배수 활용 질문 9개(Claude, 추가 질문).
   [e] 초5-1 2~5단원 146문항 분류·겹침 빼기·모범 답(Claude, 마스터 지시 2026-09-18 "5학년 전 과정을 기준대로") + 6-04 기본① 되돌림(qWas) · 6-03 기본① 넓이 식 채움.
   [d] 마스터 검토(2026-09-18 내보내기: 확인 57·고친 문장·빼기·회차·추가 1) 반영 + 질문을 고친 곳 모범 답 다시 씀(ansWas = 바꾸기 전 답).
   review.js 가 화면을 열 때 한 번만 넣는다(이 기기에 이미 적어 둔 것은 안 덮는다). key 를 바꾸면 다시 넣는다. */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-1_2026-09-21i', data:{
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
],
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "5gyhzp:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "① 덧셈과 뺄셈이 섞인 식을 앞에서부터 차례로 계산하는 이유는 뭐야~?",
"answer": "순서를 바꾸면 답이 달라질 수 있기 때문이야. 10-3+2를 앞에서부터 하면 9인데, 3+2를 먼저 하면 5가 돼서 틀려.",
"keys": [
"순서를 바꾸면 답이 달라진다",
"앞에서부터 계산하기로 약속했다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "5gyhzp:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "② 괄호가 있는 식과 없는 식의 계산 결과가 항상 다른가? 다르면 어떻게 달라지지?",
"answer": "항상 다르지는 않아. (10-3)+2처럼 원래 순서대로 계산할 부분을 묶으면 답이 같고, 10-(3+2)처럼 계산 순서가 바뀌게 묶으면 답이 달라져.",
"keys": [
"항상 다르지는 않다",
"괄호가 계산 순서를 바꿀 때만 달라진다"
],
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "5gyhzp:qreason",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
"offBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "1wpszzi:t0H1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"round": 1,
"by": "claude",
"off": true,
"offBy": "claude",
"newQ": "① 덧셈·뺄셈·곱셈이 섞인 식이 주어졌을 때 계산 과정을 말해봐",
"ok": true
},
{
"id": "1wpszzi:t0H2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "high",
"round": 2,
"by": "claude",
"newQ": "② 괄호를 가장 먼저 계산해야 하는 이유를 말해볼래?",
"answer": "괄호는 '이 부분을 먼저 한 덩어리로 계산하라'는 약속이야. 그래서 괄호로 묶은 값을 먼저 구해야 식이 뜻하는 대로 계산돼.",
"keys": [
"괄호는 먼저 계산하라는 약속",
"묶은 부분이 한 덩어리 값이다"
],
"answerBy": "claude",
"off": true,
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "1wpszzi:qerror",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "친구가 4+2×3을 앞에서부터 4+2=6을 먼저 계산해서 6×3=18이라고 했어. 바르게 계산한 값과 차이는 얼마인지 설명해봐",
"answer": "곱셈을 먼저 해야 하니까 2×3=6, 4+6=10이 맞아. 친구 답 18과는 8만큼 차이 나.",
"keys": [
"곱셈을 먼저 하지 않았다",
"바른 답은 10",
"차이는 8"
],
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"round": 3,
"answer": "예를 들어 10-2×3은 곱셈 먼저 해서 10-6=4가 맞아. 그런데 앞에서부터 10-2=8, 8×3=24로 하면 답이 달라져.",
"keys": [
"예로 든 식을 바른 순서로 계산한다",
"순서를 어기면 다른 답이 나온다"
],
"answerBy": "claude",
"rWas": 2,
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
],
"ok": true
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
],
"ok": true
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
],
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "jr7bdp:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "② 정사각형이나 직사각형의 넓이를 구한다는 것은 무엇을 세는 것일까?",
"answer": "정사각형이나 직사각형 안에 1 cm²짜리 정사각형이 몇 개 들어가는지 세는 거야.",
"keys": [
"1 cm²가 몇 개 들어가는지 센다"
],
"answerBy": "claude",
"ansWas": {
"a": "1 cm²짜리 정사각형이 몇 개 들어가는지 세는 거야.",
"k": [
"1 cm²가 몇 개인지 센다"
]
}
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
"newQ": "② 정사각형이나 직사각형의 넓이를 1 cm²가 몇 개인지로 나타낼 수 있는 이유를 말해 줘.",
"answer": "모든 정사각형이나 직사각형은 1 cm²짜리 정사각형으로 빈틈없이 덮을 수 있어서, 그 개수가 넓이의 크기가 돼.",
"keys": [
"빈틈없이 덮을 수 있다",
"개수로 크기를 나타낸다"
],
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "jr7bdp:qreason",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "qset",
"round": 2,
"by": "claude",
"off": true,
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
"answerBy": "claude",
"ok": true
},
{
"id": "hzg2ev:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 직사각형과 정사각형의 넓이 구하는 식의 차이점은 뭐야?",
"answer": "직사각형의 넓이는 (가로)×(세로), 정사각형의 넓이는 (한 변의 길이)×(한 변의 길이)야. 정사각형은 가로 세로의 길이가 같으니까 한변만 알면 넓이를 구할 수 있지만, 직사각형은 가로 세로의 길이가 다를 수 있으니까 가로 세로의 길이를 모두 알아야 구할 수 있어",
"keys": [
"직사각형은 (가로)×(세로), 정사각형은 (한 변의 길이)×(한 변의 길이)",
"정사각형은 가로와 세로가 같아서 한 변만 알면 된다",
"직사각형은 가로와 세로를 모두 알아야 한다"
],
"ansWas": {
"a": "정사각형은 가로 세로의 길이가 같으니까 한변만 알면 넓이를 구할 수 있지만, 직사각형은 가로 세로의 길이가 다를 수 있으니까 가로 세로의 길이를 모두 알아야 구할 수 있어",
"k": [
"(가로)×(세로)"
]
}
},
{
"id": "hzg2ev:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"off": true,
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ansWas": {
"a": "1 m²는 10000 cm²야.",
"k": [
"10000 cm²"
]
},
"qWas": "① 1 m²가 10000cm²와 같은 이유는?"
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
"answerBy": "claude",
"ok": true
},
{
"id": "r6ywyq:t0H1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 2,
"newQ": "① 1 m²가 10000 cm²인 이유를 설명해 봐.",
"answer": "1 m는 100 cm라서, 한 변이 1 m인 정사각형은 100 cm×100 cm야. 그래서 10000 cm²가 돼.",
"keys": [
"1 m=100 cm",
"100×100=10000"
],
"answerBy": "claude",
"ok": true
},
{
"id": "r6ywyq:t0H2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "high",
"round": 2,
"by": "claude",
"off": true,
"newQ": "② 다음 세 넓이 단위 cm², m², km² 에 어울리는 넓이를 우리가 일상에서 볼 수 있는 것으로 예를 들어볼래?",
"answer": "cm²는 공책이나 지우개처럼 작은 것, m²는 방이나 교실처럼 큰 것, km²는 도시나 섬처럼 아주 넓은 곳의 넓이에 어울려.",
"keys": [
"cm²는 작은 물건",
"m²는 방·교실",
"km²는 도시·섬처럼 아주 넓은 곳"
],
"answerBy": "claude",
"ansWas": {
"a": "넓이가 작으면 cm², 방이나 교실처럼 크면 m², 도시나 산처럼 아주 넓으면 km²를 써. 수가 너무 커지거나 작아지지 않게 고르는 거야.",
"k": [
"작으면 cm², 크면 m², 아주 넓으면 km²",
"수가 알맞은 크기가 되게 고른다"
]
}
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "r6ywyq:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "친구가 1km²는 1000000cm²라고 했어. 뭐가 잘못됐을까?",
"answer": "1000000은 cm²가 아니라 m²로 나타낸 값이야. 1 km²=1000000 m²이고 1 m²=10000 cm²라서, cm²로 나타내면 훨씬 커져서 10000000000 cm²야.",
"keys": [
"1 km²=1000000 m²",
"m²와 cm²를 헷갈렸다"
],
"answerBy": "claude",
"ansWas": {
"a": "길이처럼 100배만 했어. 넓이는 가로도 100 cm, 세로도 100 cm라서 100×100=10000 cm²야.",
"k": [
"가로와 세로 모두 100 cm",
"1 m²=10000 cm²"
]
}
},
{
"id": "135vnrh:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 평행사변형에서 밑변과 높이는 어떻게 정하지?",
"answer": "평행한 두 변 중 하나를 밑변으로 정하고, 그 밑변과 마주 보는 변 사이의 거리를 높이로 정해. 높이는 밑변에 수직으로 그은 선분의 길이야.",
"keys": [
"평행한 두 변 중 하나가 밑변",
"두 밑변 사이의 수직 거리가 높이"
],
"answerBy": "claude",
"ansWas": {
"a": "밑변은 평행한 두 변 중 하나이고, 높이는 두 밑변 사이의 거리야. 밑변에 수직으로 그은 선의 길이지.",
"k": [
"밑변은 평행한 두 변 중 하나",
"높이는 두 밑변 사이의 수직 거리"
]
}
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "135vnrh:qamu6jikbe3b2y",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "add",
"round": 2,
"q": "평행사변형의 넓이가 문제에서 주어지면 우리는 뭘 생각해야 할까?",
"answer": "넓이=(밑변의 길이)×(높이)라는 식을 떠올려서 모르는 밑변이나 높이를 구해. 예를 들어 넓이가 24 cm²이고 밑변이 6 cm이면 높이는 24÷6=4(cm)야.",
"keys": [
"넓이 식 (밑변의 길이)×(높이)를 떠올린다",
"모르는 밑변이나 높이를 나눗셈으로 구한다"
],
"ansWas": {
"a": "",
"k": []
},
"answerBy": "claude"
},
{
"id": "z646k9:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "low",
"round": 1,
"newQ": "① 삼각형의 넓이 구하는 식을 얘기해봐.",
"answer": "밑변×높이÷2",
"ok": true
},
{
"id": "z646k9:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "low",
"round": 2,
"newQ": "② 넓이 식에서 나누기 2 하는 이유를 말해줄 수 있어?",
"answer": "똑같은 삼각형 두 개를 붙이면 평행사변형이 되는데, 삼각형은 그 절반이라서 2로 나눠.",
"keys": [
"삼각형 두 개로 평행사변형",
"삼각형은 그 절반"
],
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"q": "삼각형에서 밑변은 어떤 변이든 될 수 있어. 그럼 높이는 어떻게 생각해야 하는지 얘기해봐.",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"q": "마름모의 뜻과 특징을 얘기해봐.",
"ok": true
},
{
"id": "1p3wdn9:t0L1",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "low",
"round": 1,
"by": "claude",
"newQ": "① 사다리꼴의 넓이를 구하려면 뭘 알아야 구할 수 있어?",
"answer": "윗변의 길이, 아랫변의 길이, 높이를 알아야 해.",
"keys": [
"윗변, 아랫변, 높이"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1p3wdn9:t0L2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "low",
"round": 2,
"by": "claude",
"newQ": "② 사다리꼴 구하는 식을 말하고 그렇게 계산하는 이유를 얘기해봐",
"answer": "((윗변의 길이)+(아랫변의 길이))×(높이)÷2야. 똑같은 사다리꼴 두 개를 붙이면 밑변이 (윗변)+(아랫변)인 평행사변형이 되고, 사다리꼴은 그 절반이라서 2로 나눠.",
"keys": [
"((윗변의 길이)+(아랫변의 길이))×(높이)÷2",
"사다리꼴 두 개로 평행사변형, 그 절반"
],
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
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
"answerBy": "claude",
"ok": true
},
{
"id": "1p3wdn9:qerror",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "qset",
"round": 2,
"by": "claude",
"newQ": "윗변 4cm, 아랫변 8cm, 높이 5cm인 사다리꼴의 넓이를 친구가 4×8×5÷2=160cm²라고 했어. 뭐가 잘못됐을까?",
"answer": "윗변과 아랫변을 더해야 하는데 곱했어. (4+8)×5÷2=30(cm²)이 맞아.",
"keys": [
"윗변과 아랫변을 곱했다(더해야 한다)",
"바른 답은 30 cm²"
],
"answerBy": "claude",
"ansWas": {
"a": "윗변 4 cm를 빼먹었어. 윗변과 아랫변을 더해서 (4+8)×5÷2=30(cm²)이 맞아.",
"k": [
"윗변을 더하지 않았다",
"바른 답은 30 cm²"
]
}
},
{
"id": "1cljfv2:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "어떤 수를 나누어떨어지게 하는 수를 그 수의 약수라고 해. 예를 들어 6은 1, 2, 3, 6으로 나누면 나누어떨어지니까 1, 2, 3, 6이 6의 약수야.",
"keys": [
"그 수를 나누어떨어지게 하는 수"
],
"answerBy": "claude",
"newQ": "① 약수가 뭐야?",
"ok": true
},
{
"id": "1cljfv2:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "어떤 수를 1배, 2배, 3배, … 한 수를 그 수의 배수라고 해.",
"keys": [
"1배, 2배, 3배, … 한 수"
],
"answerBy": "claude",
"newQ": "② 배수는 뭔데~?",
"ok": true
},
{
"id": "1cljfv2:t0L3",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "6의 약수는 1, 2, 3, 6이고, 6의 배수는 6, 12, 18, 24, …야.",
"keys": [
"6의 약수 1, 2, 3, 6",
"6의 배수 6, 12, 18, …"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1cljfv2:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "6을 1, 2, 3, 6으로 나누면 나누어떨어지니까 이 수들이 6의 약수야.",
"keys": [
"6을 나누어떨어지게 하는 수"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1cljfv2:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "어떤 수든 1로 나누면 나누어떨어지니까 1은 모든 수의 약수야. 또 자기 자신보다 큰 수로 나누면 나누어떨어지지 않으니까 가장 큰 약수는 자기 자신이야.",
"keys": [
"1로 나누면 항상 나누어떨어진다",
"자기보다 큰 수로는 나누어떨어지지 않는다"
],
"answerBy": "claude",
"newQ": "② 1은 모든 수의 약수인 이유와, 어떤 수의 가장 큰 약수는 자기 자신인 이유를 말해 줘.",
"ok": true
},
{
"id": "1cljfv2:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1부터 차례로 그 수를 나누어 보고 나누어떨어지는 수를 모두 찾아. 곱해서 그 수가 되는 두 수를 짝지어 찾으면 빠뜨리지 않아. 예) 12=1×12, 2×6, 3×4 → 1, 2, 3, 4, 6, 12",
"keys": [
"1부터 차례로 나누어 본다",
"곱이 그 수가 되는 짝을 찾는다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1cljfv2:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "약수는 그 수보다 클 수 없어서 개수가 정해져 있어. 하지만 배수는 1배, 2배, 3배, … 계속 곱할 수 있어서 끝이 없어.",
"keys": [
"약수는 그 수보다 크지 않다",
"배수는 계속 곱할 수 있다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "1cljfv2:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 8의 약수는 1, 2, 4이고, 8의 배수는 8, 16, 24야.",
"keys": [
"약수 3개를 말한다",
"배수 3개를 말한다"
],
"answerBy": "claude",
"newQ": "네가 정한 수 하나를 골라서 그 수의 약수와 배수를 각각 3개씩 말해 봐.",
"ansWas": {
"a": "예를 들어 8의 약수는 1, 2, 4, 8이고, 8의 배수는 8, 16, 24, …야.",
"k": [
"약수를 빠짐없이 말한다",
"배수를 차례로 말한다"
]
},
"reopen": true
},
{
"id": "1cljfv2:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "12는 6을 나누어떨어지게 하는 수가 아니라 6을 2배 한 수야. 그래서 12는 6의 약수가 아니라 6의 배수야.",
"keys": [
"12는 6의 배수",
"약수는 그 수를 나누어떨어지게 하는 수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "7s5g9f:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "12는 2와 6의 배수야.",
"keys": [
"배수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "7s5g9f:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "2와 6은 12의 약수야.",
"keys": [
"약수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "7s5g9f:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "2×6=12에서 2와 6은 12의 약수이고, 12는 2와 6의 배수야.",
"keys": [
"곱하는 수는 약수",
"곱은 배수"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "7s5g9f:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "곱셈식 하나에서 곱하는 두 수는 곱의 약수이고, 곱은 두 수의 배수야. 그래서 '3은 12의 약수'이면 '12는 3의 배수'처럼 늘 짝으로 함께 말할 수 있어.",
"keys": [
"■가 ●의 약수이면 ●는 ■의 배수",
"곱셈식 하나에서 함께 나온다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "7s5g9f:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "6과 7은 42의 약수이고, 42는 6과 7의 배수야.",
"keys": [
"6과 7은 42의 약수",
"42는 6과 7의 배수"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "7s5g9f:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "4×5=20이니까 20÷4=5, 20÷5=4로 나누어떨어져. 나누어떨어지게 하는 수가 약수니까 4와 5는 20의 약수야.",
"keys": [
"20÷4, 20÷5가 나누어떨어진다",
"곱셈식을 나눗셈식으로 바꿀 수 있다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "7s5g9f:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3×8=24에서 3과 8은 24의 약수이고, 24는 3과 8의 배수야.",
"keys": [
"곱하는 두 수는 약수",
"곱은 배수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "7s5g9f:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "거꾸로 말했어. 3×5=15에서 15는 3의 배수이고, 3이 15의 약수야.",
"keys": [
"15는 3의 배수",
"3이 15의 약수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1puwoi5:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 수의 공통된 약수를 공약수라고 해.",
"keys": [
"공약수"
],
"answerBy": "claude",
"newQ": "① 두 수의 약수를 각각 구했는데, 똑같은 수가 보였어. 그게 뭐지?",
"ok": true
},
{
"id": "1puwoi5:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "공약수 중에서 가장 큰 수를 최대공약수라고 해.",
"keys": [
"최대공약수"
],
"answerBy": "claude",
"newQ": "② 최대공약수가 뭐야?",
"ok": true
},
{
"id": "1puwoi5:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "8의 약수는 1, 2, 4, 8이고 12의 약수는 1, 2, 3, 4, 6, 12야. 둘 다에 있는 1, 2, 4가 공약수이고, 그중 가장 큰 4가 최대공약수야.",
"keys": [
"각각의 약수를 구한다",
"공통인 것이 공약수(1, 2, 4)",
"가장 큰 것이 최대공약수(4)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1puwoi5:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "두 수의 공약수는 모두 최대공약수의 약수야. 예를 들어 8과 12의 최대공약수는 4이고, 4의 약수 1, 2, 4가 바로 8과 12의 공약수야.",
"keys": [
"공약수는 최대공약수의 약수",
"예) 8과 12 → 4의 약수 1, 2, 4"
],
"answerBy": "claude",
"newQ": "② 두 수의 최대공약수와 두 수의 공약수와의 관계를 얘기해줘.",
"ansWas": {
"a": "8=4×2, 12=4×3처럼 두 수는 모두 최대공약수 4를 여러 번 더한 수야. 그래서 4를 나누어떨어지게 하는 1, 2는 8과 12도 나누어떨어지게 해서 공약수가 돼.",
"k": [
"두 수는 최대공약수의 배수",
"최대공약수의 약수는 두 수도 나누어떨어지게 한다"
]
},
"reopen": true
},
{
"id": "1puwoi5:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "10의 약수는 1, 2, 5, 10이고 15의 약수는 1, 3, 5, 15야. 공약수는 1, 5이고 최대공약수는 5야.",
"keys": [
"공약수 1, 5",
"최대공약수 5"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1puwoi5:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "8과 12는 모두 4의 배수라서, 4를 나누어떨어지게 하는 1과 2는 8과 12도 나누어떨어지게 해.",
"keys": [
"두 수는 4의 배수",
"4의 약수는 두 수도 나누어떨어지게 한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1puwoi5:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 12와 18이면 12의 약수 1, 2, 3, 4, 6, 12와 18의 약수 1, 2, 3, 6, 9, 18에서 공약수는 1, 2, 3, 6이고 최대공약수는 6이야.",
"keys": [
"각 수의 약수를 구한다",
"공통인 것 중 가장 큰 수가 최대공약수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1puwoi5:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "공약수는 두 수 모두의 약수여야 해. 8은 12의 약수가 아니니까 빼야 해. 8과 12의 공약수는 1, 2, 4야.",
"keys": [
"두 수 모두의 약수여야 한다",
"공약수는 1, 2, 4"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 수를 여러 수의 곱으로 나타내 공통인 부분을 찾는 방법과, 두 수를 1이 아닌 공약수로 계속 나누는 방법이 있어.",
"keys": [
"여러 수의 곱으로 나타내기",
"공약수로 나누기"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "12=2×2×3, 18=2×3×3으로 나타내면 두 곱셈식에 공통으로 들어 있는 수는 2와 3이야. 그래서 최대공약수는 2×3=6이야.",
"keys": [
"12=2×2×3, 18=2×3×3",
"공통인 2×3=6"
],
"answerBy": "claude",
"newQ": "② 12와 18을 여러수의 곱으로 나타내어, 최대공약수 구하는 방법을 풀어보고 설명해봐.",
"ansWas": {
"a": "응, 두 수를 1이 아닌 공약수로 더 나눌 수 없을 때까지 나누고, 나눈 공약수들을 곱하면 최대공약수야.",
"k": [
"공약수로 나눈다",
"나눈 공약수들을 곱한다"
]
},
"reopen": true
},
{
"id": "dljc18:t0H1",
"kind": "high",
"round": 2,
"answer": "예를 들어 12=2×2×3, 18=2×3×3으로 나타내면 두 곱셈식에 공통으로 들어 있는 2×3=6이 최대공약수야.",
"keys": [
"여러 수의 곱으로 나타낸다",
"공통인 수들을 곱한다"
],
"answerBy": "claude",
"rWas": 1
},
{
"id": "dljc18:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "두 수를 1이 아닌 공약수로 나누고, 나온 몫들을 또 공약수로 나누는 것을 더 나눌 수 없을 때까지 해. 그때까지 나눈 공약수들을 모두 곱하면 최대공약수야.",
"keys": [
"더 나눌 수 없을 때까지 나눈다",
"나눈 공약수들을 곱한다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "dljc18:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "2로 나누면 9와 12, 3으로 나누면 3과 4가 돼. 더 나눌 수 없으니까 2×3=6이 최대공약수야.",
"keys": [
"2와 3으로 나눈다",
"최대공약수 6"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "중간에 멈추면 아직 두 수에 공통으로 들어 있는 수가 남아 있어서 더 큰 공약수를 놓쳐. 끝까지 나눠야 공통인 수를 모두 곱할 수 있어.",
"keys": [
"멈추면 공통인 수가 남는다",
"끝까지 나눠야 가장 큰 공약수"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "dljc18:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 16과 24를 2로 나누면 8과 12, 또 2로 나누면 4와 6, 또 2로 나누면 2와 3이야. 2×2×2=8이 최대공약수야.",
"keys": [
"끝까지 공약수로 나눈다",
"나눈 수들을 곱한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "6과 9는 아직 공약수 3으로 나눌 수 있어서 멈추면 안 돼. 3으로 더 나누면 2와 3이 되고, 최대공약수는 2×3=6이야.",
"keys": [
"6과 9가 공약수 3을 가진다",
"최대공약수는 6"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "12i1qk9:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 수의 공통된 배수를 공배수라고 해.",
"keys": [
"공배수"
],
"answerBy": "claude",
"newQ": "① 공배수 설명해봐.",
"ok": true
},
{
"id": "12i1qk9:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "공배수 중에서 가장 작은 수를 최소공배수라고 해.",
"keys": [
"최소공배수"
],
"answerBy": "claude",
"newQ": "② 최소공배수는 뭐지?",
"ok": true
},
{
"id": "12i1qk9:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "2와 3의 공배수는 6, 12, 18, …이고, 그중 가장 작은 6이 최소공배수야.",
"keys": [
"공배수 6, 12, 18",
"최소공배수 6"
],
"answerBy": "claude",
"newQ": "① 2와 3의 공배수 3개까지 말하고 최소공배수가 뭔지 말해봐.",
"ansWas": {
"a": "2의 배수는 2, 4, 6, 8, 10, 12, …이고 3의 배수는 3, 6, 9, 12, …야. 둘 다에 있는 6, 12, 18, …이 공배수이고, 가장 작은 6이 최소공배수야.",
"k": [
"각각의 배수를 늘어놓는다",
"공통인 것이 공배수",
"가장 작은 것이 최소공배수(6)"
]
},
"reopen": true
},
{
"id": "12i1qk9:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "공배수는 끝없이 계속 커져서 가장 큰 수가 없어. 그래서 최대공배수는 구할 수 없고 최소공배수만 구해.",
"keys": [
"공배수는 끝없이 있다",
"가장 큰 공배수는 없다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "12i1qk9:qrecall",
"kind": "qset",
"round": 2,
"answer": "6의 배수와 8의 배수에 공통으로 있는 24, 48, 72, …가 공배수이고, 그중 가장 작은 24가 최소공배수야.",
"keys": [
"공통된 배수가 공배수",
"가장 작은 24가 최소공배수"
],
"answerBy": "claude",
"rWas": 1,
"newQ": "6과 8을 가지고 공배수와 최소공배수가 뭔지 설명해줘",
"ansWas": {
"a": "6의 배수 6, 12, 18, 24, …와 8의 배수 8, 16, 24, …에서 공배수는 24, 48, 72, …이고 최소공배수는 24야.",
"k": [
"공배수 24, 48, 72, …",
"최소공배수 24"
]
},
"reopen": true
},
{
"id": "12i1qk9:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "6과 8로 모두 나누어떨어지는 수 중 가장 작은 것이 24야. 그다음 공배수는 24를 한 번 더 더한 48, 72처럼 24씩 커져서, 공배수는 모두 24의 배수가 돼.",
"keys": [
"공배수는 24마다 나온다",
"공배수는 최소공배수의 배수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "12i1qk9:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 4와 10이면 4의 배수 4, 8, 12, 16, 20, …와 10의 배수 10, 20, …에서 공배수는 20, 40, …이고 최소공배수는 20이야.",
"keys": [
"각 수의 배수를 늘어놓는다",
"공통인 것 중 가장 작은 수가 최소공배수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "12i1qk9:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "두 수를 곱하면 공배수는 되지만 가장 작은 공배수가 아닐 수 있어. 4의 배수 4, 8, 12와 6의 배수 6, 12에서 12가 먼저 나오니까 최소공배수는 12야.",
"keys": [
"곱은 공배수지만 가장 작지 않을 수 있다",
"최소공배수는 12"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 수를 여러 수의 곱으로 나타내는 방법과, 공약수로 나눈 뒤 나눈 수와 남은 몫을 모두 곱하는 방법이 있어.",
"keys": [
"여러 수의 곱으로 나타내기",
"공약수로 나눈 수와 몫을 모두 곱하기"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 공약수로 나눈 다음 나눈 공약수들과 마지막 몫을 모두 곱하면 최소공배수야.",
"keys": [
"공약수로 나눈다",
"나눈 수와 몫을 모두 곱한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "pdtpr5:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "예를 들어 12=2×2×3, 18=2×3×3으로 나타내면, 공통인 2×3에 남은 2와 3을 곱해서 2×3×2×3=36이 최소공배수야.",
"keys": [
"여러 수의 곱으로 나타낸다",
"공통인 부분과 남은 수를 모두 곱한다"
],
"answerBy": "claude",
"newQ": "① 12와 18을 각각 곱셈식으로 나타내어 최소공배수를 구하는 방법을 설명해 봐.",
"ok": true
},
{
"id": "pdtpr5:t0H2",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "12와 18을 2로 나누면 6과 9, 다시 3으로 나누면 2와 3이 돼. 나눈 수 2, 3과 남은 몫 2, 3을 모두 곱하면 2×3×2×3=36이 최소공배수야.",
"keys": [
"2, 3으로 나눈다",
"나눈 수와 몫을 모두 곱해 36"
],
"answerBy": "claude",
"newQ": "12와 18을 공약수로 나눈 뒤 나눈 수들과 남은 몫을 모두 곱하면 최소공배수가 되는 과정을 말해 줘.",
"ansWas": {
"a": "두 수를 1이 아닌 공약수로 더 나눌 수 없을 때까지 나눠. 그다음 나눈 공약수들과 마지막 몫을 모두 곱하면 최소공배수야.",
"k": [
"끝까지 공약수로 나눈다",
"나눈 수와 마지막 몫을 모두 곱한다"
]
},
"reopen": true,
"ok": true
},
{
"id": "pdtpr5:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "5로 나누면 2와 3이 돼. 5×2×3=30이 최소공배수야.",
"keys": [
"5로 나눈다",
"최소공배수 30"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "pdtpr5:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "나눈 공약수들은 두 수에 공통으로 들어 있는 부분이고, 마지막 몫은 각 수에만 있는 부분이야. 두 수 모두의 배수가 되려면 둘 다 들어가야 하니까 모두 곱해. 예) 8=4×2, 12=4×3 → 4×2×3=24",
"keys": [
"나눈 수는 공통 부분, 몫은 각자의 부분",
"모두 들어가야 두 수의 배수가 된다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "pdtpr5:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 6과 9를 3으로 나누면 2와 3이야. 3×2×3=18이 최소공배수야.",
"keys": [
"공약수로 나눈다",
"나눈 수와 몫을 모두 곱한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "4는 최대공약수야. 최소공배수는 나눈 수 4와 몫 2, 3을 모두 곱한 4×2×3=24야.",
"keys": [
"4는 최대공약수",
"몫까지 곱해야 한다(24)"
],
"answerBy": "claude",
"off": true
},
{
"id": "1nhkkt4:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "탁자가 1개 늘어날 때마다 의자는 4개씩 늘어나.",
"keys": [
"함께 늘어난다",
"탁자 1개에 의자 4개씩"
],
"answerBy": "claude",
"newQ": "① 탁자 한 개에 의자가 4개씩 있어. 탁자 수가 한개씩 늘어나면 의자 수는 어떻게 변할까?",
"ansWas": {
"a": "탁자가 1개 늘어날 때마다 의자는 2개씩 늘어나.",
"k": [
"함께 늘어난다",
"탁자 1개에 의자 2개씩"
]
},
"qWas": "① 탁자 1개에 의자가 2개씩 놓여 있어. 탁자 수가 늘어나면 의자 수는 어떻게 변해?",
"reopen": true,
"ok": true
},
{
"id": "1nhkkt4:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 양을 표로 나란히 적어 보면, 한쪽이 1씩 늘 때 다른 쪽이 얼마씩 늘어나는지(변하는 부분)와 늘 그대로인 부분(변하지 않는 부분)을 찾을 수 있어.",
"keys": [
"표로 나란히 적는다",
"늘어나는 양과 그대로인 부분을 본다"
],
"answerBy": "claude",
"newQ": "② 두 양 사이에서 변하는 부분과 변하지 않는 부분은 어떻게 찾아?",
"newQBy": "claude",
"off": true,
"ok": true
},
{
"id": "1nhkkt4:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "한 양이 변할 때 다른 양도 그에 따라 일정하게 변하는 관계를 대응 관계라고 해. 탁자 수가 정해지면 의자 수가 정해지는 것처럼 두 양이 짝을 이뤄.",
"keys": [
"한 양이 변하면 다른 양도 따라 변한다",
"두 양이 짝을 이룬다"
],
"answerBy": "claude",
"newQ": "① 대응이라는 단어 뜻이 뭐야?",
"ansWas": {
"a": "탁자 수가 정해지면 의자 수가 하나로 정해져. 이렇게 한 양이 변할 때 다른 양도 따라서 정해지는 관계를 대응 관계라고 해.",
"k": [
"한 양이 정해지면 다른 양이 하나로 정해진다",
"대응 관계"
]
},
"reopen": true,
"ok": true
},
{
"id": "1nhkkt4:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "두 양을 표로 짝지어 적고, 한 양이 1씩 늘 때 다른 양이 얼마씩 변하는지 찾아.",
"keys": [
"표로 짝지어 적는다",
"늘어나는 규칙을 찾는다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1nhkkt4:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "탁자 1개에 의자가 4개니까 탁자 5개면 5×4=20개야.",
"keys": [
"(탁자 수)×4",
"20개"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1nhkkt4:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "짝지어 적으면 한 양이 1씩 늘 때 다른 양이 얼마씩 늘어나는지 한눈에 보여서, 두 양 사이의 규칙을 쉽게 찾을 수 있어.",
"keys": [
"짝이 한눈에 보인다",
"늘어나는 양이 보인다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "1nhkkt4:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 강아지 수와 다리 수는, 강아지가 1마리, 2마리, 3마리로 늘면 다리는 4개, 8개, 12개로 4개씩 늘어나.",
"keys": [
"한 양이 늘면 다른 양이 규칙적으로 변한다",
"두 양을 짝지어 말한다"
],
"answerBy": "claude",
"newQ": "네가 두 양을 정해서, 한 양이 변하면 다른 양도 어떻게 변하는지 그 대응관계를 말해봐.",
"ok": true
},
{
"id": "1nhkkt4:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "탁자 3개면 의자는 3×4=12개여야 해. 8개는 탁자 2개일 때의 의자 수야.",
"keys": [
"(탁자 수)×4",
"12개"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1nz6994:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자동차 1대에 바퀴가 4개니까 (자동차 수)×4=(바퀴 수)로 나타내.",
"keys": [
"(자동차 수)×4=(바퀴 수)"
],
"answerBy": "claude",
"newQ": "① 자동차 1대에 바퀴가 4개야. 자동차 수와 바퀴 수의 관계를 곱셈식으로 나타내 봐.",
"newQBy": "claude",
"ok": true
},
{
"id": "1nz6994:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "○, △, □ 같은 기호를 써서 두 양을 나타내.",
"keys": [
"○, △ 같은 기호"
],
"answerBy": "claude",
"newQ": "② 두 양의 관계를 간단히 나타낼 때 어떤 기호를 써?",
"newQBy": "claude",
"off": true,
"ok": true
},
{
"id": "1nz6994:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "곱셈과 나눗셈은 서로 거꾸로 된 계산이라서, (자동차 수)×4=(바퀴 수)는 (바퀴 수)÷4=(자동차 수)로도 나타낼 수 있어.",
"keys": [
"곱셈과 나눗셈은 거꾸로 된 관계",
"같은 관계를 두 식으로 나타낸다"
],
"answerBy": "claude",
"newQ": "① 자동차 수와 바퀴의 전체 개수와의 관계를 두 가지 식으로 나타낼 수 있는 이유를 설명해 봐.",
"ok": true
},
{
"id": "1nz6994:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "두 양을 긴 말 대신 짧은 기호로 쓸 수 있어서, 식을 간단하고 알아보기 쉽게 나타낼 수 있어.",
"keys": [
"간단하게 쓸 수 있다",
"알아보기 쉽다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1nz6994:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "지우개 1개가 300원이니까 ○×300=△야. △÷300=○로 나타내도 돼.",
"keys": [
"○×300=△"
],
"answerBy": "claude",
"newQ": "지우개 1개가 300원일 때, 지우개 수를 ○, 값을 △라고 하면 두 양의 관계를 식으로 어떻게 나타내는지 말해 봐.",
"ok": true
},
{
"id": "1nz6994:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "자동차 1대마다 바퀴가 4개씩 붙어 있어서, 자동차가 2배, 3배로 많아지면 바퀴 4개짜리 묶음도 2배, 3배가 돼.",
"keys": [
"자동차 1대마다 바퀴 4개",
"곱셈 관계라서 함께 몇 배가 된다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "1nz6994:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 오리 수를 ○, 오리 다리 수를 △라고 하면 ○×2=△야.",
"keys": [
"두 양을 기호로 정한다",
"대응 관계를 식으로 쓴다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1nz6994:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "자동차가 1대 늘 때 바퀴는 4개씩 늘어나니까 더하기가 아니라 곱하기야. △=○×4가 맞아. △=○+4이면 자동차 2대일 때 바퀴가 6개가 돼서 틀려.",
"keys": [
"더하기가 아니라 곱하기",
"△=○×4"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1wph6x6:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "예를 들어 세발자전거 수와 바퀴 수야. 세발자전거가 1대 늘 때마다 바퀴는 3개씩 늘어나.",
"keys": [
"두 양을 말한다",
"한 양이 변하면 다른 양이 어떻게 변하는지"
],
"answerBy": "claude",
"newQ": "① 생활 속에서 한 양이 변하면 다른 양도 따라 변하는 예를 하나 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "응, 세발자전거 수와 바퀴 수, 오징어 수와 다리 수처럼 한 양이 정해지면 다른 양이 정해지는 것들이 있어.",
"k": [
"생활 속 두 양의 예",
"한 양이 정해지면 다른 양이 정해진다"
]
},
"ok": true
},
{
"id": "1wph6x6:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 두 양을 ○, △로 정하면 ○×3=△처럼 식으로 나타낼 수 있어.",
"keys": [
"기호로 정한다",
"식으로 나타낸다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1wph6x6:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "먼저 서로 관계있는 두 양을 찾고, 표로 짝지어 적어 규칙을 찾아. 그다음 두 양을 ○, △로 정해서 ○×3=△처럼 식으로 나타내.",
"keys": [
"관계있는 두 양을 찾는다",
"표로 규칙을 찾는다",
"기호로 식을 쓴다"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "1wph6x6:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "식을 알면 표에 없는 큰 수를 넣어도 바로 계산할 수 있어서 앞으로 어떻게 될지 알 수 있어. 예) ○×3=△이면 세발자전거가 20대일 때 바퀴는 60개야.",
"keys": [
"어떤 수든 넣어 계산할 수 있다",
"규칙이 계속 이어진다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1wph6x6:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "사각형 하나에 성냥개비가 4개씩이니까 ○×4=△야.",
"keys": [
"○×4=△"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1wph6x6:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "삼각형이 1개일 때 3개, 2개일 때 6개, 3개일 때 9개야. 변을 함께 쓰지 않으니까 삼각형을 하나 새로 만들 때마다 변 3개가 모두 새로 필요해.",
"keys": [
"3개, 6개, 9개",
"변을 함께 쓰지 않아 3개씩 새로 필요"
],
"answerBy": "claude",
"off": true,
"ok": true
},
{
"id": "1wph6x6:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 필통 수를 ○, 연필 수를 △라고 하고 필통마다 연필이 5자루씩이면 ○×5=△야.",
"keys": [
"생활 속 두 양을 정한다",
"식으로 나타낸다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1wph6x6:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "세발자전거는 바퀴가 3개라서 △=○×3이어야 해.",
"keys": [
"세발자전거 바퀴는 3개",
"△=○×3"
],
"answerBy": "claude",
"off": true
},
{
"id": "1gmtybn:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "셋 다 크기가 같아.",
"keys": [
"크기가 같다"
],
"answerBy": "claude",
"newQ": "① 1/3, 2/6, 4/12는 크기가 어때?",
"newQBy": "claude",
"ok": true
},
{
"id": "1gmtybn:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모와 분자는 달라도 나타내는 크기가 같은 분수야. 예를 들어 1/2, 2/4, 3/6은 색칠한 양이 같아서 크기가 같은 분수야.",
"keys": [
"분모·분자는 달라도 크기가 같다",
"예) 1/2, 2/4, 3/6"
],
"answerBy": "claude",
"newQ": "② 어떤 분수를 크기가 같은 분수라고 하지?",
"qWas": "② 분모와 분자에 0이 아닌 같은 수를 곱하면 분수의 크기는 어떻게 돼?",
"ansWas": {
"a": "분모와 분자에 0이 아닌 같은 수를 곱하면 크기가 같은 분수가 돼.",
"k": [
"크기가 같다",
"0이 아닌 같은 수"
]
},
"reopen": true
},
{
"id": "1gmtybn:t0L3",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모와 분자를 0이 아닌 같은 수로 나누어도 크기가 같은 분수가 돼.",
"keys": [
"크기가 같다",
"같은 수로 나눈다"
],
"answerBy": "claude",
"newQ": "③ 분모와 분자를 0이 아닌 같은 수로 나누면 분수의 크기는 어떻게 돼?",
"newQBy": "claude",
"ok": true,
"off": true
},
{
"id": "1gmtybn:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "피자 한 판을 3조각으로 나눈 것 중 1조각(1/3)과 6조각으로 나눈 것 중 2조각(2/6)은 먹는 양이 같아. 더 잘게 나누면 조각 수는 늘지만 한 조각이 그만큼 작아져서 전체 양은 그대로야.",
"keys": [
"피자로 1/3과 2/6을 비교",
"조각 수가 늘면 한 조각이 작아진다"
],
"answerBy": "claude",
"newQ": "① 분모가 달라도 분수의 크기가 같을 수 있는 이유를 피자로 예를 들어 설명해 봐.",
"ansWas": {
"a": "전체를 더 잘게 나누면 조각 수는 늘지만 한 조각이 그만큼 작아져. 예를 들어 1/3의 조각을 하나씩 반으로 나누면 2/6이 되는데, 색칠한 양은 그대로라서 크기가 같아.",
"k": [
"더 잘게 나누면 조각이 작아지고 개수가 늘어난다",
"색칠한 양은 그대로"
]
},
"reopen": true
},
{
"id": "1gmtybn:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "분모와 분자에 같은 수를 곱하면 한 조각은 그만큼 작아지고 조각 수는 그만큼 많아져서 전체 크기는 그대로야.",
"keys": [
"조각이 작아지는 만큼 개수가 늘어난다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1gmtybn:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "분모와 분자에 0이 아닌 같은 수를 곱하면 돼. 2를 곱하면 4/10, 3을 곱하면 6/15야.",
"keys": [
"분모와 분자에 같은 수를 곱한다",
"예) 4/10, 6/15"
],
"answerBy": "claude",
"newQ": "2/5와 크기가 같은 분수를 만들어 봐.",
"ansWas": {
"a": "분자 2×3=6, 분모 5×3=15니까 6/15야.",
"k": [
"분모와 분자에 똑같이 3을 곱한다",
"6/15"
]
},
"reopen": true
},
{
"id": "1gmtybn:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "조각을 잘게 나누는 만큼 조각 수도 같이 늘어나서 전체 양은 변하지 않아.",
"keys": [
"조각 크기와 개수가 함께 바뀐다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1gmtybn:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1/4의 분모와 분자에 2를 곱하면 2/8이야.",
"keys": [
"분모와 분자에 같은 수를 곱한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1gmtybn:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모와 분자에 같은 수를 곱해야 해. 서로 다른 수를 곱하면 크기가 달라져. 3/6은 1/2과 같아서 1/3과 크기가 달라. 둘 다 2를 곱하면 2/6이야.",
"keys": [
"같은 수를 곱해야 한다",
"3/6은 1/3과 크기가 다르다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "g97c6k:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모와 분자를 그 공약수로 나누어 간단히 하는 것을 약분한다고 해.",
"keys": [
"분모와 분자를 공약수로 나눈다",
"간단히 한다"
],
"answerBy": "claude",
"newQ": "① 약분이 뭐야?",
"newQBy": "claude",
"ok": true
},
{
"id": "g97c6k:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모와 분자의 공약수가 1뿐인 분수를 기약분수라고 해.",
"keys": [
"분모와 분자의 공약수가 1뿐"
],
"answerBy": "claude",
"newQ": "② 기약분수가 뭐야?",
"newQBy": "claude",
"ok": true
},
{
"id": "g97c6k:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "예를 들어 6/8의 분모와 분자를 공약수 2로 나누면 3/4이 돼. 크기는 그대로이고 더 간단해져.",
"keys": [
"공약수로 나눈다",
"크기는 그대로"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "g97c6k:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "최대공약수는 분모와 분자에 공통으로 들어 있는 수를 한꺼번에 다 모은 수라서, 그걸로 나누면 남은 분모와 분자의 공약수는 1밖에 없어. 그래서 한 번에 기약분수가 돼.",
"keys": [
"공통인 수를 한꺼번에 나눈다",
"남은 공약수가 1뿐"
],
"answerBy": "claude",
"ok": true
},
{
"id": "g97c6k:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "10과 15의 최대공약수 5로 나누면 2/3이야.",
"keys": [
"5로 나눈다",
"2/3"
],
"answerBy": "claude",
"ok": true
},
{
"id": "g97c6k:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "최대공약수로 나누면 분모와 분자에 공통인 수가 남지 않아서 더 약분할 수 없어.",
"keys": [
"공통인 수가 남지 않는다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "g97c6k:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 12/18을 공약수 2로 나누면 6/9, 다시 3으로 나누면 2/3이야. 최대공약수 6으로 한 번에 나눠도 2/3이고, 더 약분할 수 없으니까 기약분수야.",
"keys": [
"공약수로 차례로 나누는 과정",
"최대공약수로 한 번에 나누면 기약분수"
],
"answerBy": "claude",
"newQ": "네가 분수를 하나 만들어서 약분하는 과정과 기약분수를 말해 봐.",
"ansWas": {
"a": "예를 들어 12/18을 2로 나누면 6/9, 3으로 나누면 4/6이고, 최대공약수 6으로 나누면 기약분수 2/3이야.",
"k": [
"공약수로 나눈다",
"최대공약수로 나누면 기약분수"
]
},
"reopen": true
},
{
"id": "g97c6k:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "5는 8과 12의 공약수가 아니라서 나누어떨어지지 않아. 공약수 2나 4로 나눠야 하고, 4로 나누면 2/3이야.",
"keys": [
"5는 공약수가 아니다",
"공약수로 나눠야 한다(2/3)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1c6uo93:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모가 다른 분수들의 크기는 바꾸지 않고 분모를 같게 만드는 것을 통분한다고 해.",
"keys": [
"크기는 그대로",
"분모를 같게 한다"
],
"answerBy": "claude",
"newQ": "① 통분이 뭐야?",
"newQBy": "claude",
"ok": true
},
{
"id": "1c6uo93:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "두 분모의 공배수가 공통분모가 될 수 있어.",
"keys": [
"두 분모의 공배수"
],
"answerBy": "claude",
"newQ": "② 공통분모가 될 수 있는 수는 뭐야?",
"newQBy": "claude",
"ok": true
},
{
"id": "1c6uo93:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "분모의 곱 24로 하면 3/4=18/24, 5/6=20/24야. 최소공배수 12로 하면 3/4=9/12, 5/6=10/12야. 분모와 분자에 같은 수를 곱해서 바꿔.",
"keys": [
"분모의 곱 24로 통분",
"최소공배수 12로 통분",
"분모와 분자에 같은 수를 곱한다"
],
"answerBy": "claude",
"newQ": "① 3/4과 5/6을 두 분모의 곱으로, 또 최소공배수로 통분하는 방법을 각각 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "두 분모를 곱한 수나 두 분모의 최소공배수를 공통분모로 정하고, 각 분수의 분모와 분자에 같은 수를 곱해서 분모를 맞춰. 예) 1/4과 1/6을 분모의 곱 24로 하면 6/24, 4/24이고, 최소공배수 12로 하면 3/12, 2/12야.",
"k": [
"분모의 곱 또는 최소공배수를 공통분모로",
"분모와 분자에 같은 수를 곱한다"
]
},
"ok": true
},
{
"id": "1c6uo93:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "공통분모가 가장 작아서 수가 작고 계산이 쉬워. 나중에 약분할 일도 줄어.",
"keys": [
"수가 작아 계산이 쉽다",
"약분할 일이 줄어든다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1c6uo93:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "공통분모를 12로 하면 2/3=8/12, 3/4=9/12야.",
"keys": [
"공통분모 12",
"8/12, 9/12"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1c6uo93:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "2/3=8/12, 1/4=3/12야. 분모와 분자에 같은 수를 곱해서 크기는 그대로이고, 둘 다 전체를 12조각으로 나눈 것이라 한 조각의 크기가 같아져.",
"keys": [
"같은 수를 곱해 크기는 그대로",
"둘 다 12조각이라 한 조각이 같아진다"
],
"answerBy": "claude",
"ok": true,
"off": true
},
{
"id": "1c6uo93:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "공통분모를 20으로 하면 1/4=5/20, 2/5=8/20이야.",
"keys": [
"공통분모 20",
"5/20, 8/20"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "1c6uo93:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모에 곱한 수를 분자에도 똑같이 곱해야 해. 1/2=3/6, 1/3=2/6이야.",
"keys": [
"분자에도 같은 수를 곱해야 한다",
"3/6, 2/6"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "통분해서 분모를 같게 한 다음 분자를 비교해. 2/3=8/12, 3/4=9/12라서 3/4이 더 커.",
"keys": [
"통분한다",
"분자를 비교한다"
],
"answerBy": "claude",
"newQ": "① 2/3와 3/4처럼 분모가 다른 두 분수의 크기는 어떻게 비교해?",
"newQBy": "claude",
"ansWas": {
"a": "두 분수를 통분해서 분모를 같게 만든 다음 분자를 비교해.",
"k": [
"통분한다",
"분자를 비교한다"
]
},
"ok": true
},
{
"id": "m3f8ul:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모가 같아졌으니까 분자를 비교해. 분자가 클수록 큰 분수야.",
"keys": [
"분자를 비교한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "m3f8ul:t0H1",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "분모가 다르면 한 조각의 크기가 달라서 조각 수만으로 비교할 수 없어. 통분하면 한 조각의 크기가 같아지니까 조각 수인 분자만 비교하면 돼.",
"keys": [
"분모가 다르면 한 조각 크기가 다르다",
"통분하면 한 조각 크기가 같아진다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "두 분수씩 차례로 통분해서 비교하거나, 세 분수를 한꺼번에 통분해서 분자를 비교해.",
"keys": [
"두 개씩 차례로 비교한다",
"한꺼번에 통분해 비교한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1/3=4/12, 1/4=3/12이니까 1/3이 더 커.",
"keys": [
"4/12와 3/12",
"1/3이 더 크다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모가 같으면 한 조각의 크기가 같으니까 조각 수가 많을수록 커.",
"keys": [
"한 조각 크기가 같다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3/4과 5/6은 9/12와 10/12이니까 5/6이 더 커.",
"keys": [
"통분한다",
"분자를 비교한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모가 달라서 분자만 보면 안 돼. 통분하면 2/3=10/15, 3/5=9/15라서 2/3이 더 커.",
"keys": [
"분모가 다르면 분자만 비교할 수 없다",
"2/3이 더 크다"
],
"answerBy": "claude",
"ok": true,
"off": true
},
{
"id": "96x5jg:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분수를 소수로 바꾸거나 소수를 분수로 바꿔서 같은 모양으로 비교해. 3/5=0.6이라서 0.7이 더 커.",
"keys": [
"같은 모양(분수나 소수)으로 바꾼다",
"3/5=0.6 < 0.7"
],
"answerBy": "claude",
"newQ": "① 3/5와 0.7처럼 분수와 소수의 크기는 어떻게 비교해?",
"newQBy": "claude",
"ansWas": {
"a": "분수를 소수로 바꾸거나 소수를 분수로 바꾸어서, 같은 모양으로 만든 다음 비교해.",
"k": [
"분수나 소수 한 가지로 바꾼다",
"같은 모양으로 비교한다"
]
},
"ok": true
},
{
"id": "96x5jg:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "응, 분모가 10, 100인 분수는 소수로, 소수는 분모가 10, 100인 분수로 바꿀 수 있어.",
"keys": [
"분수 ↔ 소수"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "96x5jg:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "예를 들어 3/5와 0.7을 비교할 때 3/5=6/10=0.6으로 바꾸면 0.6<0.7이야.",
"keys": [
"한 가지 모양으로 바꾼다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "96x5jg:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "소수 첫째 자리는 1/10(=0.1)이 몇 개인지, 둘째 자리는 1/100(=0.01)이 몇 개인지를 나타내. 그래서 분모가 10, 100인 분수는 분자를 그 자리에 맞춰 쓰기만 하면 돼.",
"keys": [
"0.1=1/10, 0.01=1/100",
"분자를 그 자리에 쓴다"
],
"answerBy": "claude",
"ok": true,
"off": true
},
{
"id": "96x5jg:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "7/10=0.7이고 0.7<0.85니까 0.85가 더 커.",
"keys": [
"7/10=0.7",
"0.85가 더 크다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "96x5jg:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "0.1이 1/10, 0.01이 1/100이라서 분자를 그 자리에 쓰면 돼.",
"keys": [
"0.1=1/10, 0.01=1/100"
],
"answerBy": "claude",
"off": true,
"offBy": "claude",
"ok": true
},
{
"id": "96x5jg:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 3/10=0.3이고, 0.25보다 커.",
"keys": [
"분모가 10, 100인 분수를 소수로 바꾼다",
"소수끼리 비교한다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "96x5jg:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "7/100은 0.01이 7개라서 0.07이야. 0.7은 7/10이야.",
"keys": [
"7/100=0.07",
"0.7=7/10"
],
"answerBy": "claude",
"ok": true,
"newQ": "친구가 7/100을 소수로 바꾸는데 0.7이라고 했어. 뭐가 잘못됐을까?"
},
{
"id": "u9z3u:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "통분해서 분모를 같게 만들어야 해.",
"keys": [
"통분한다"
],
"answerBy": "claude",
"newQ": "① 분모가 다른 분수를 더하려면 먼저 뭘 해야 돼?",
"newQBy": "claude"
},
{
"id": "u9z3u:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "통분하면 한 조각의 크기가 같아져서 분자끼리만 더하면 돼.",
"keys": [
"한 조각 크기가 같아진다",
"분자끼리 더한다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "u9z3u:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "최소공배수 12로 통분하면 1/4=3/12, 1/6=2/12야. 분모는 그대로 두고 분자끼리 더해서 5/12야.",
"keys": [
"12로 통분한다",
"분자끼리 더해 5/12"
],
"answerBy": "claude",
"newQ": "① 1/4+1/6을 통분해서 더하는 과정을 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "두 분모의 공통분모로 통분한 다음, 분모는 그대로 두고 분자끼리 더해. 결과를 약분할 수 있으면 약분해. 예) 1/2+1/3=3/6+2/6=5/6",
"k": [
"통분한다",
"분자끼리 더한다",
"약분할 수 있으면 약분한다"
]
}
},
{
"id": "u9z3u:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "분모의 곱으로 통분하면 공통분모를 찾기 쉽지만 수가 커져서 약분해야 할 때가 많아. 최소공배수로 통분하면 수가 작아서 계산이 간단해.",
"keys": [
"분모의 곱은 찾기 쉽지만 수가 크다",
"최소공배수는 수가 작아 간단하다"
],
"answerBy": "claude"
},
{
"id": "u9z3u:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1/3=2/6이니까 2/6+1/6=3/6=1/2이야.",
"keys": [
"2/6+1/6",
"3/6=1/2"
],
"answerBy": "claude"
},
{
"id": "u9z3u:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "통분하면 3/12+2/12처럼 한 조각의 크기가 1/12로 같아져. 분모는 조각의 크기라서 그대로 두고, 분자는 조각 수라서 3조각+2조각=5조각으로 더해. 그래서 5/12야.",
"keys": [
"분모는 조각의 크기라 그대로",
"분자는 조각 수라 더한다"
],
"answerBy": "claude",
"newQ": "1/4+1/6을 피자 조각으로 생각해 봐. 통분한 뒤에는 왜 분자끼리만 더하고 분모는 더하지 않는지 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "통분하면 한 조각의 크기가 같아져. 분모는 한 조각의 크기를, 분자는 조각 수를 나타내니까 조각 수인 분자만 더하고 분모는 그대로 둬.",
"k": [
"분모는 조각 크기, 분자는 조각 수",
"조각 크기는 그대로"
]
}
},
{
"id": "u9z3u:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1/4+2/3=3/12+8/12=11/12야.",
"keys": [
"통분한다",
"분자끼리 더한다"
],
"answerBy": "claude"
},
{
"id": "u9z3u:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모끼리 더하면 안 돼. 통분해서 3/6+2/6=5/6이야. 1/2에 무언가를 더했는데 2/5는 1/2보다 작아서 말이 안 돼.",
"keys": [
"분모끼리 더하면 안 된다",
"5/6"
],
"answerBy": "claude"
},
{
"id": "1v7q9ja:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분수 부분을 통분해서 3/6, 2/6으로 만든 다음, 자연수끼리 2+1=3, 분수끼리 3/6+2/6=5/6을 더해서 3과 5/6이야.",
"keys": [
"분수 부분을 통분한다",
"자연수끼리, 분수끼리 더한다"
],
"answerBy": "claude",
"newQ": "① 2와 1/2 + 1과 1/3처럼 분모가 다른 대분수를 더할 때 자연수와 분수 부분을 어떻게 계산해?",
"newQBy": "claude",
"ansWas": {
"a": "먼저 분수 부분을 통분한 뒤, 자연수는 자연수끼리, 분수는 분수끼리 더해.",
"k": [
"분수 부분을 통분한다",
"자연수끼리, 분수끼리 더한다"
]
}
},
{
"id": "1v7q9ja:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "가분수를 대분수로 바꿔서 1을 자연수 부분에 올려 더해. 예) 2와 5/4 → 3과 1/4",
"keys": [
"가분수를 대분수로 바꾼다",
"자연수에 1을 더한다"
],
"answerBy": "claude",
"newQ": "② 분수 부분을 더한 결과가 가분수이면 어떻게 해?",
"newQBy": "claude"
},
{
"id": "1v7q9ja:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "분수 부분을 통분하고, 자연수는 자연수끼리, 분수는 분수끼리 더해. 분수 부분이 가분수가 되면 대분수로 바꿔.",
"keys": [
"통분한다",
"자연수끼리, 분수끼리"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v7q9ja:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "대분수와 가분수는 같은 크기를 다르게 나타낸 것뿐이라서, 어느 모양으로 더해도 크기는 같아.",
"keys": [
"같은 크기를 다르게 나타낸 것",
"답이 같다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1v7q9ja:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "분수 부분을 통분하면 4/12와 3/12야. 자연수는 2+1=3, 분수는 4/12+3/12=7/12라서 3과 7/12야.",
"keys": [
"4/12와 3/12로 통분",
"3과 7/12"
],
"answerBy": "claude"
},
{
"id": "1v7q9ja:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "2와 1/3은 2+1/3, 1과 1/4은 1+1/4이라서 모두 더하면 2+1/3+1+1/4이야. 더하는 순서를 바꿔도 합은 같으니까 자연수끼리 2+1, 분수끼리 1/3+1/4을 더해도 돼.",
"keys": [
"대분수는 자연수+분수",
"순서를 바꿔 더해도 합은 같다"
],
"answerBy": "claude",
"newQ": "2와 1/3 + 1과 1/4을 예로 들어, 대분수를 더할 때 왜 자연수는 자연수끼리 분수는 분수끼리 따로 더해도 되는지 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "대분수는 자연수와 진분수를 더한 수라서, 더하는 순서를 바꿔 자연수끼리, 분수끼리 모아서 더해도 전체 합은 같아.",
"k": [
"대분수 = 자연수 + 분수",
"순서를 바꿔 더해도 합은 같다"
]
}
},
{
"id": "1v7q9ja:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 1과 1/2+2와 1/3은 자연수 3, 분수 3/6+2/6=5/6이라서 3과 5/6이야.",
"keys": [
"통분한다",
"자연수끼리, 분수끼리 더한다"
],
"answerBy": "claude"
},
{
"id": "1v7q9ja:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "4/3은 가분수라서 1과 1/3로 바꿔 자연수에 1을 올려야 해. 2와 4/3=3과 1/3이야.",
"keys": [
"분수 부분이 가분수",
"3과 1/3"
],
"answerBy": "claude"
},
{
"id": "1w8v5s:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "통분해서 분모를 같게 만들어야 해.",
"keys": [
"통분한다"
],
"answerBy": "claude",
"newQ": "① 분모가 다른 분수를 빼려면 먼저 뭘 해야 돼?",
"newQBy": "claude"
},
{
"id": "1w8v5s:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "분모는 그대로 두고 분자끼리 빼.",
"keys": [
"분자끼리 뺀다",
"분모는 그대로"
],
"answerBy": "claude",
"newQ": "② 통분한 뒤에는 무엇끼리 빼?",
"newQBy": "claude"
},
{
"id": "1w8v5s:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "통분한 다음 분모는 그대로 두고 분자끼리 빼. 예) 1/2-1/3=3/6-2/6=1/6",
"keys": [
"통분한다",
"분자끼리 뺀다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1w8v5s:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "덧셈처럼 먼저 통분하고, 분모는 그대로 둔 채 분자끼리 계산해. 더하느냐 빼느냐만 달라.",
"keys": [
"통분을 먼저 한다",
"분자끼리 계산, 분모는 그대로"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1w8v5s:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1/4=2/8이니까 7/8-2/8=5/8이야.",
"keys": [
"1/4=2/8",
"5/8"
],
"answerBy": "claude"
},
{
"id": "1w8v5s:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모가 다르면 한 조각의 크기가 달라서 조각 수끼리 바로 뺄 수 없어. 통분해서 조각 크기를 같게 해야 분자끼리 뺄 수 있어.",
"keys": [
"조각 크기가 다르다",
"통분하면 조각 크기가 같아진다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1w8v5s:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 5/6-1/4=10/12-3/12=7/12야.",
"keys": [
"통분한다",
"분자끼리 뺀다"
],
"answerBy": "claude"
},
{
"id": "1w8v5s:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "분모끼리 빼면 안 돼. 통분해서 3/4-2/4=1/4이야.",
"keys": [
"분모끼리 빼면 안 된다",
"1/4"
],
"answerBy": "claude"
},
{
"id": "1lwbip2:t0L1",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "통분한 뒤 분수 부분끼리 뺄 수 있는지 확인해. 3/12는 8/12보다 작아서 그대로는 뺄 수 없으니까 자연수에서 1을 받아내려야 해.",
"keys": [
"통분 후 분수 부분의 크기를 비교한다",
"작으면 1을 받아내린다"
],
"answerBy": "claude",
"newQ": "① 3과 1/4 - 1과 2/3처럼 대분수를 뺄 때, 계산하기 전에 무엇을 먼저 확인해?",
"newQBy": "claude",
"ansWas": {
"a": "통분한 뒤, 빼지는 수의 분수 부분이 빼는 수의 분수 부분보다 작지 않은지 확인해.",
"k": [
"분수 부분의 크기를 비교한다"
]
}
},
{
"id": "1lwbip2:t0L2",
"kind": "low",
"round": 1,
"by": "claude",
"answer": "자연수에서 1을 받아내려 분수로 바꿔 분수 부분에 더한 다음 빼. 예) 3과 1/5 → 2와 6/5",
"keys": [
"자연수에서 1을 받아내린다",
"1을 분수로 바꿔 더한다"
],
"answerBy": "claude",
"newQ": "② 분수 부분끼리 뺄 수 없으면 어떻게 해?",
"newQBy": "claude"
},
{
"id": "1lwbip2:t0H1",
"kind": "high",
"round": 1,
"by": "claude",
"answer": "자연수에서 1을 받아내려 5/5처럼 분수로 바꿔 분수 부분에 더하고, 자연수끼리, 분수끼리 빼.",
"keys": [
"1을 받아내린다",
"자연수끼리, 분수끼리 뺀다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lwbip2:t0H2",
"kind": "high",
"round": 2,
"by": "claude",
"answer": "받아내림이 필요할 때 대분수를 가분수로 바꾸면, 받아내림 없이 분자끼리 한 번에 뺄 수 있어서 편리해.",
"keys": [
"받아내림이 필요할 때",
"한 번에 뺄 수 있다"
],
"answerBy": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1lwbip2:qrecall",
"kind": "qset",
"round": 1,
"by": "claude",
"answer": "1/5에서 2/5를 뺄 수 없으니까 3과 1/5를 2와 6/5로 바꿔. 2-1=1, 6/5-2/5=4/5라서 1과 4/5야.",
"keys": [
"2와 6/5로 바꾼다",
"1과 4/5"
],
"answerBy": "claude"
},
{
"id": "1lwbip2:qreason",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "피자 조각이 1/5만 있으면 2/5를 뺄 수 없어. 그래서 피자 한 판(1)을 5조각으로 잘라 5/5로 바꿔 더하면 6/5가 돼서 뺄 수 있어. 3과 1/5=2와 6/5야.",
"keys": [
"분수 부분이 모자라 뺄 수 없다",
"1을 5/5로 바꿔 분수 부분에 더한다"
],
"answerBy": "claude",
"newQ": "3과 1/5 - 1과 2/5처럼 분수 부분끼리 뺄 수 없을 때, 왜 자연수에서 1을 받아내려야 하는지 피자로 예를 들어 설명해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "분수 부분이 더 작아서 그대로는 뺄 수 없어. 자연수 1은 5/5처럼 분모와 분자가 같은 분수와 같아서, 1을 빌려와 분수 부분을 크게 만들면 뺄 수 있어.",
"k": [
"분수 부분이 작아 뺄 수 없다",
"1=5/5처럼 바꿔 더한다"
]
}
},
{
"id": "1lwbip2:qexample",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "예를 들어 4와 1/3-2와 2/3은 3과 4/3-2와 2/3으로 바꿔서 1과 2/3이야.",
"keys": [
"분수 부분끼리 뺄 수 없는 식을 만든다",
"1을 받아내려 계산한다"
],
"answerBy": "claude"
},
{
"id": "1lwbip2:qerror",
"kind": "qset",
"round": 2,
"by": "claude",
"answer": "1/4에서 1/2을 뺄 수 없는데 거꾸로 1/2-1/4을 했어. 통분하면 2와 1/4-1과 2/4이고, 1을 받아내려 1과 5/4-1과 2/4=3/4이야.",
"keys": [
"분수 부분을 거꾸로 뺐다",
"받아내림, 바른 답 3/4"
],
"answerBy": "claude",
"newQ": "친구가 2와 1/4 - 1과 1/2을 1과 1/4이라고 했어. 어떻게 잘못 계산한 건지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"ansWas": {
"a": "1/4에서 1/2을 뺄 수 없는데 거꾸로 뺐어. 통분하면 2와 1/4-1과 2/4이고, 1을 받아내려 1과 5/4-1과 2/4=3/4이야.",
"k": [
"거꾸로 뺐다",
"받아내림, 답은 3/4"
]
}
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식:1",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식:2",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식:3",
"big": "1. 자연수의 혼합 계산",
"small": "01. 덧셈과 뺄셈 / 곱셈과 나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식:1",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식:2",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식:3",
"big": "1. 자연수의 혼합 계산",
"small": "02. 덧셈·뺄셈·곱셈(나눗셈)이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식:1",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식:2",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|1. 자연수의 혼합 계산|03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식:3",
"big": "1. 자연수의 혼합 계산",
"small": "03. 덧셈·뺄셈·곱셈·나눗셈이 섞인 식",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|01. 약수와 배수:1",
"big": "2. 약수와 배수",
"small": "01. 약수와 배수",
"kind": "ladder",
"newQ": "어떤 수의 약수가 뭔지 말하고, 6의 약수를 어떻게 찾는지도 얘기해 봐.",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|01. 약수와 배수:2",
"big": "2. 약수와 배수",
"small": "01. 약수와 배수",
"kind": "ladder",
"newQ": "어떤 수의 배수가 뭔지 말하고, 6의 배수는 어떻게 구해?",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|01. 약수와 배수:3",
"big": "2. 약수와 배수",
"small": "01. 약수와 배수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|01. 약수와 배수:4",
"big": "2. 약수와 배수",
"small": "01. 약수와 배수",
"kind": "ladder",
"off": true,
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|02. 곱을 이용한 약수와 배수의 관계:1",
"big": "2. 약수와 배수",
"small": "02. 곱을 이용한 약수와 배수의 관계",
"kind": "ladder",
"off": true,
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|02. 곱을 이용한 약수와 배수의 관계:2",
"big": "2. 약수와 배수",
"small": "02. 곱을 이용한 약수와 배수의 관계",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|02. 곱을 이용한 약수와 배수의 관계:3",
"big": "2. 약수와 배수",
"small": "02. 곱을 이용한 약수와 배수의 관계",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|02. 곱을 이용한 약수와 배수의 관계:4",
"big": "2. 약수와 배수",
"small": "02. 곱을 이용한 약수와 배수의 관계",
"kind": "ladder",
"newQ": "18과 3이 약수와 배수의 관계인지 아닌지 어떻게 확인해?",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|03. 공약수와 최대공약수:1",
"big": "2. 약수와 배수",
"small": "03. 공약수와 최대공약수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|03. 공약수와 최대공약수:2",
"big": "2. 약수와 배수",
"small": "03. 공약수와 최대공약수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|03. 공약수와 최대공약수:3",
"big": "2. 약수와 배수",
"small": "03. 공약수와 최대공약수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|04. 최대공약수 구하는 방법:1",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|04. 최대공약수 구하는 방법:2",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|04. 최대공약수 구하는 방법:3",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|04. 최대공약수 구하는 방법:4",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "12i1qk9:qamuapcglrsmg9",
"big": "2. 약수와 배수",
"small": "05. 공배수와 최소공배수",
"kind": "add",
"round": 1,
"q": "두 수의 공배수는 최소공배수와 어떤 관계가 있을까?",
"answer": "두 수의 공배수는 모두 최소공배수의 배수야. 예를 들어 6과 8의 공배수 24, 48, 72는 모두 최소공배수 24의 배수야.",
"keys": [
"공배수는 최소공배수의 배수",
"예) 24, 48, 72는 24의 배수"
],
"answerBy": "claude",
"reopen": true,
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|05. 공배수와 최소공배수:1",
"big": "2. 약수와 배수",
"small": "05. 공배수와 최소공배수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|05. 공배수와 최소공배수:2",
"big": "2. 약수와 배수",
"small": "05. 공배수와 최소공배수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|05. 공배수와 최소공배수:3",
"big": "2. 약수와 배수",
"small": "05. 공배수와 최소공배수",
"kind": "ladder",
"ok": true
},
{
"id": "pdtpr5:qamuapmxk6q5ib",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"round": 2,
"q": "네가 두 수를 정해서 여러수의 곱으로 나타내어 최소공배수 구하는 방법을 얘기해봐.",
"answer": "예를 들어 8=2×2×2, 12=2×2×3이야. 공통인 2×2에 남은 2와 3을 곱하면 2×2×2×3=24가 최소공배수야.",
"keys": [
"두 수를 여러 수의 곱으로 나타낸다",
"공통인 부분과 남은 수를 모두 곱한다"
],
"answerBy": "claude",
"reopen": true,
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|06. 최소공배수 구하는 방법:1",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|06. 최소공배수 구하는 방법:2",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|06. 최소공배수 구하는 방법:3",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|2. 약수와 배수|06. 최소공배수 구하는 방법:4",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "ladder",
"ok": true
},
{
"id": "dljc18:qac21b660b16d312",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "add",
"q": "사탕 24개와 초콜릿 36개를 남김없이 최대한 많은 친구에게 똑같이 나누어 주려고 해. 최대공약수와 최소공배수 중 무엇을 구해야 하고, 몇 명에게 나누어 줄 수 있어?",
"round": 1,
"by": "claude",
"answer": "두 수를 모두 똑같이 남김없이 나누는 가장 큰 수를 찾는 거라서 최대공약수를 구해. 24와 36의 최대공약수는 12라서 12명에게 나누어 줄 수 있어.",
"keys": [
"남김없이 똑같이 나누는 가장 큰 수 = 최대공약수",
"12명"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:qac21b660d109c72",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "add",
"q": "연필 30자루와 공책 42권을 남김없이 최대한 많은 학생에게 똑같이 나누어 주려고 해. 한 학생이 받는 연필과 공책은 각각 몇 개인지 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "먼저 30과 42의 최대공약수 6을 구하면 6명에게 나누어 줄 수 있어. 그다음 30÷6=5, 42÷6=7이라서 한 학생이 연필 5자루, 공책 7권을 받아.",
"keys": [
"최대공약수로 학생 수를 구한다(6명)",
"각 수를 학생 수로 나눈다(연필 5, 공책 7)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:qac21b66105ecf0",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "add",
"q": "가로 48 cm, 세로 36 cm인 직사각형 종이를 남는 부분 없이 똑같은 크기의 정사각형으로 자르려고 해. 가장 큰 정사각형의 한 변의 길이를 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "정사각형의 한 변은 48도 36도 나누어떨어지게 하는 길이여야 하니까 48과 36의 공약수야. 그중 가장 큰 것이니까 최대공약수 12 cm야.",
"keys": [
"한 변은 두 길이의 공약수",
"가장 큰 정사각형이라 최대공약수(12 cm)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "dljc18:qac21b6612166c74",
"big": "2. 약수와 배수",
"small": "04. 최대공약수 구하는 방법",
"kind": "add",
"q": "어떤 수로 26을 나누어도 2가 남고, 38을 나누어도 2가 남아. 이런 수 중에서 가장 큰 수를 구하려면 무엇을 먼저 해야 해?",
"round": 2,
"by": "claude",
"answer": "먼저 나머지 2를 빼서 24와 38-2=36을 만들어. 어떤 수는 24와 36을 모두 나누어떨어지게 하니까 공약수이고, 가장 큰 수라서 최대공약수 12야.",
"keys": [
"나머지를 빼면 나누어떨어진다(24, 36)",
"24와 36의 최대공약수 12"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qac21b66155a6e6",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"q": "A 버스는 8분마다, B 버스는 12분마다 출발해. 오전 9시에 두 버스가 동시에 출발했다면, 다음에 다시 동시에 출발하는 시각은 어떻게 구해?",
"round": 1,
"by": "claude",
"answer": "두 버스가 동시에 출발하는 때는 8의 배수이면서 12의 배수인 때야. 가장 먼저 오는 때니까 최소공배수 24를 구하면 오전 9시 24분이야.",
"keys": [
"동시에 출발하는 때 = 공배수",
"가장 먼저라서 최소공배수 24, 9시 24분"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qac21b661767c3d",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"q": "가로 6 cm, 세로 4 cm인 직사각형 카드를 같은 방향으로 빈틈없이 늘어놓아서 가장 작은 정사각형을 만들려고 해. 정사각형의 한 변의 길이를 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "정사각형의 한 변은 6의 배수이면서 4의 배수여야 해서 6과 4의 공배수야. 가장 작은 정사각형이니까 최소공배수 12 cm야.",
"keys": [
"한 변은 두 길이의 공배수",
"가장 작은 정사각형이라 최소공배수(12 cm)"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qac21b661aef603",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"q": "톱니가 12개인 톱니바퀴 가와 18개인 톱니바퀴 나가 맞물려 돌고 있어. 처음에 맞물렸던 톱니끼리 다시 맞물리려면 가는 몇 바퀴 돌아야 하는지 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "다시 맞물리려면 두 바퀴가 지나간 톱니 수가 같아야 해서 12와 18의 공배수만큼 돌아야 해. 가장 처음이니까 최소공배수 36개이고, 가는 36÷12=3바퀴 돌아.",
"keys": [
"지나간 톱니 수는 두 수의 공배수",
"최소공배수 36, 가는 3바퀴"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qac21b661c3fe62",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"q": "어떤 수를 4로 나누어도 1이 남고, 6으로 나누어도 1이 남아. 이런 수 중에서 가장 작은 두 자리 수를 구하려면 어떻게 해?",
"round": 2,
"by": "claude",
"answer": "어떤 수에서 1을 빼면 4와 6으로 모두 나누어떨어지니까 4와 6의 공배수야. 공배수 12, 24, …에 1을 더한 13, 25, … 중 가장 작은 두 자리 수는 13이야.",
"keys": [
"1을 빼면 4와 6의 공배수",
"최소공배수 12에 1을 더해 13"
],
"answerBy": "claude",
"ok": true
},
{
"id": "pdtpr5:qac21b661e9e5e",
"big": "2. 약수와 배수",
"small": "06. 최소공배수 구하는 방법",
"kind": "add",
"q": "활용 문제를 읽고 최대공약수를 구해야 할지 최소공배수를 구해야 할지 어떻게 구별해?",
"round": 2,
"by": "claude",
"answer": "남김없이 똑같이 나누거나 잘라서 '가장 큰' 것을 찾으면 최대공약수야. 여러 개를 이어 붙이거나 동시에 다시 만나는 '가장 작은' 때를 찾으면 최소공배수야.",
"keys": [
"나누기·자르기, 가장 큰 → 최대공약수",
"이어 붙이기·다시 만나기, 가장 작은 → 최소공배수"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1nz6994:qac2202c71aece5",
"big": "3. 규칙과 대응",
"small": "02. 대응 관계를 식으로 나타내기",
"kind": "add",
"q": "형은 동생보다 4살 많아. 동생의 나이를 ○, 형의 나이를 △라고 할 때 두 양의 관계를 식으로 나타내 봐.",
"round": 1,
"by": "claude",
"answer": "형은 항상 동생보다 4살 많으니까 △=○+4야. ○=△-4로 나타내도 돼.",
"keys": [
"△=○+4",
"○=△-4로도 나타낼 수 있다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "1wph6x6:qac2202c755acca",
"big": "3. 규칙과 대응",
"small": "03. 생활 속에서 대응 관계 찾기",
"kind": "add",
"q": "성냥개비로 정사각형을 옆으로 이어 붙여 만들고 있어. 정사각형이 1개면 4개, 2개면 7개, 3개면 10개가 필요해. 정사각형 수를 ○, 성냥개비 수를 △라고 할 때 대응 관계를 식으로 어떻게 나타내?",
"round": 2,
"by": "claude",
"answer": "정사각형이 하나 늘 때마다 성냥개비는 3개씩 늘어. 처음 1개가 더 있으니까 △=○×3+1이야.",
"keys": [
"정사각형이 1개 늘 때 3개씩 늘어난다",
"△=○×3+1"
],
"answerBy": "claude",
"ok": true
},
{
"id": "g97c6k:qac2202c7846371",
"big": "4. 약분과 통분",
"small": "02. 약분",
"kind": "add",
"q": "분모와 분자의 합이 20이고, 약분하면 2/3가 되는 분수를 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "2/3와 크기가 같은 분수는 분모와 분자에 같은 수를 곱한 거야. 2+3=5이고 20÷5=4라서 분모와 분자에 4를 곱하면 8/12야.",
"keys": [
"2/3의 분모와 분자에 같은 수를 곱한 분수",
"2+3=5, 20÷5=4 → 8/12"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qac2202c7b197759",
"big": "4. 약분과 통분",
"small": "04. 분수의 크기 비교",
"kind": "add",
"q": "우유를 민수는 2/3 L, 지수는 3/5 L 마셨어. 누가 더 많이 마셨는지 어떻게 알아?",
"round": 1,
"by": "claude",
"answer": "통분해서 비교해. 2/3=10/15, 3/5=9/15라서 민수가 더 많이 마셨어.",
"keys": [
"통분해서 비교한다",
"민수가 더 많이 마셨다"
],
"answerBy": "claude",
"ok": true
},
{
"id": "m3f8ul:qac2202c7e170b9f",
"big": "4. 약분과 통분",
"small": "04. 분수의 크기 비교",
"kind": "add",
"q": "1/3보다 크고 1/2보다 작은 분수 중에서 분모가 12인 분수를 어떻게 찾아?",
"round": 2,
"by": "claude",
"answer": "두 분수를 분모가 12인 분수로 바꾸면 1/3=4/12, 1/2=6/12야. 그 사이에 있는 분모가 12인 분수는 5/12야.",
"keys": [
"분모 12로 통분한다(4/12, 6/12)",
"그 사이의 분수 5/12"
],
"answerBy": "claude",
"ok": true
},
{
"id": "u9z3u:qac2202c82eeeaf",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1), (2)",
"kind": "add",
"q": "피자 한 판에서 형은 1/4을, 동생은 1/3을 먹었어. 두 사람이 먹은 양과 남은 양은 각각 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "먹은 양은 1/4+1/3=3/12+4/12=7/12야. 한 판은 1이니까 남은 양은 1-7/12=5/12야.",
"keys": [
"먹은 양은 더한다(7/12)",
"남은 양은 1에서 뺀다(5/12)"
],
"answerBy": "claude"
},
{
"id": "1v7q9ja:qac2202c8519315f",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (3)",
"kind": "add",
"q": "길이가 2와 1/3 m인 끈과 1과 3/4 m인 끈을 겹치지 않게 이으면 전체 길이는 어떻게 구해?",
"round": 1,
"by": "claude",
"answer": "두 길이를 더해. 분수 부분을 통분하면 4/12+9/12=13/12이고, 자연수는 2+1=3이라서 3과 13/12=4와 1/12 m야.",
"keys": [
"두 길이를 더한다",
"분수 부분이 가분수라 4와 1/12 m"
],
"answerBy": "claude"
},
{
"id": "1w8v5s:qac2202c88dbc71",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "add",
"q": "우유 3/4 L 중에서 1/3 L를 마셨어. 남은 우유의 양은 어떤 식으로 구하고, 얼마야?",
"round": 1,
"by": "claude",
"answer": "남은 양은 3/4-1/3로 구해. 통분하면 9/12-4/12=5/12라서 5/12 L야.",
"keys": [
"3/4-1/3",
"5/12 L"
],
"answerBy": "claude"
},
{
"id": "1w8v5s:qac2202c8b9145f",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "add",
"q": "어떤 수에 2/5를 더해야 할 것을 잘못하여 뺐더니 1/4이 되었어. 바르게 계산한 값은 어떻게 구해?",
"round": 2,
"by": "claude",
"answer": "먼저 어떤 수를 구해. 뺐더니 1/4이니까 어떤 수는 1/4+2/5=13/20이야. 바르게 더하면 13/20+2/5=21/20=1과 1/20이야.",
"keys": [
"거꾸로 더해서 어떤 수를 구한다(13/20)",
"바르게 더한다(1과 1/20)"
],
"answerBy": "claude"
},
{
"id": "1lwbip2:qac2202c8f1468cf",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2), (3)",
"kind": "add",
"q": "물 3과 1/5 L가 있었는데 1과 2/3 L를 썼어. 남은 물의 양을 구하는 과정을 말해 봐.",
"round": 2,
"by": "claude",
"answer": "3과 1/5-1과 2/3을 통분하면 3과 3/15-1과 10/15야. 3/15에서 10/15를 뺄 수 없으니 1을 받아내려 2와 18/15-1과 10/15=1과 8/15 L야.",
"keys": [
"통분한다",
"받아내림해서 1과 8/15 L"
],
"answerBy": "claude"
},
{
"id": "ladder:e5-1|3. 규칙과 대응|01. 두 양 사이의 관계:1",
"big": "3. 규칙과 대응",
"small": "01. 두 양 사이의 관계",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|01. 두 양 사이의 관계:2",
"big": "3. 규칙과 대응",
"small": "01. 두 양 사이의 관계",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|01. 두 양 사이의 관계:3",
"big": "3. 규칙과 대응",
"small": "01. 두 양 사이의 관계",
"kind": "ladder",
"off": true,
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|02. 대응 관계를 식으로 나타내기:1",
"big": "3. 규칙과 대응",
"small": "02. 대응 관계를 식으로 나타내기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|02. 대응 관계를 식으로 나타내기:2",
"big": "3. 규칙과 대응",
"small": "02. 대응 관계를 식으로 나타내기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|02. 대응 관계를 식으로 나타내기:3",
"big": "3. 규칙과 대응",
"small": "02. 대응 관계를 식으로 나타내기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|03. 생활 속에서 대응 관계 찾기:1",
"big": "3. 규칙과 대응",
"small": "03. 생활 속에서 대응 관계 찾기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|03. 생활 속에서 대응 관계 찾기:2",
"big": "3. 규칙과 대응",
"small": "03. 생활 속에서 대응 관계 찾기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|3. 규칙과 대응|03. 생활 속에서 대응 관계 찾기:3",
"big": "3. 규칙과 대응",
"small": "03. 생활 속에서 대응 관계 찾기",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|01. 크기가 같은 분수:1",
"big": "4. 약분과 통분",
"small": "01. 크기가 같은 분수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|01. 크기가 같은 분수:2",
"big": "4. 약분과 통분",
"small": "01. 크기가 같은 분수",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|01. 크기가 같은 분수:3",
"big": "4. 약분과 통분",
"small": "01. 크기가 같은 분수",
"kind": "ladder",
"ok": true,
"off": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|02. 약분:1",
"big": "4. 약분과 통분",
"small": "02. 약분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|02. 약분:2",
"big": "4. 약분과 통분",
"small": "02. 약분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|02. 약분:3",
"big": "4. 약분과 통분",
"small": "02. 약분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|02. 약분:4",
"big": "4. 약분과 통분",
"small": "02. 약분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|03. 통분:1",
"big": "4. 약분과 통분",
"small": "03. 통분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|03. 통분:2",
"big": "4. 약분과 통분",
"small": "03. 통분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|03. 통분:3",
"big": "4. 약분과 통분",
"small": "03. 통분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|03. 통분:4",
"big": "4. 약분과 통분",
"small": "03. 통분",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|04. 분수의 크기 비교:1",
"big": "4. 약분과 통분",
"small": "04. 분수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|04. 분수의 크기 비교:2",
"big": "4. 약분과 통분",
"small": "04. 분수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|04. 분수의 크기 비교:3",
"big": "4. 약분과 통분",
"small": "04. 분수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|05. 분수와 소수의 크기 비교:1",
"big": "4. 약분과 통분",
"small": "05. 분수와 소수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|05. 분수와 소수의 크기 비교:2",
"big": "4. 약분과 통분",
"small": "05. 분수와 소수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|4. 약분과 통분|05. 분수와 소수의 크기 비교:3",
"big": "4. 약분과 통분",
"small": "05. 분수와 소수의 크기 비교",
"kind": "ladder",
"ok": true
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|01. 분수의 덧셈 (1), (2):1",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1), (2)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|01. 분수의 덧셈 (1), (2):2",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1), (2)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|01. 분수의 덧셈 (1), (2):3",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1), (2)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|01. 분수의 덧셈 (1), (2):4",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "01. 분수의 덧셈 (1), (2)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|02. 분수의 덧셈 (3):1",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|02. 분수의 덧셈 (3):2",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|02. 분수의 덧셈 (3):3",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|02. 분수의 덧셈 (3):4",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "02. 분수의 덧셈 (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|03. 분수의 뺄셈 (1):1",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|03. 분수의 뺄셈 (1):2",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "03. 분수의 뺄셈 (1)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|04. 분수의 뺄셈 (2), (3):1",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2), (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|04. 분수의 뺄셈 (2), (3):2",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2), (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|04. 분수의 뺄셈 (2), (3):3",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2), (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|5. 분수의 덧셈과 뺄셈|04. 분수의 뺄셈 (2), (3):4",
"big": "5. 분수의 덧셈과 뺄셈",
"small": "04. 분수의 뺄셈 (2), (3)",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|01. 정다각형과 사각형의 둘레:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|01. 정다각형과 사각형의 둘레:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|01. 정다각형과 사각형의 둘레:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|01. 정다각형과 사각형의 둘레:4",
"big": "6. 다각형의 둘레와 넓이",
"small": "01. 정다각형과 사각형의 둘레",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|02. 1 cm²:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|02. 1 cm²:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|02. 1 cm²:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "02. 1 cm²",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|03. 직사각형의 넓이:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|03. 직사각형의 넓이:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|03. 직사각형의 넓이:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "03. 직사각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|04. 1 cm²보다 큰 넓이의 단위:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|04. 1 cm²보다 큰 넓이의 단위:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|04. 1 cm²보다 큰 넓이의 단위:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "04. 1 cm²보다 큰 넓이의 단위",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|05. 평행사변형의 넓이:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|05. 평행사변형의 넓이:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|05. 평행사변형의 넓이:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "05. 평행사변형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|06. 삼각형의 넓이:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|06. 삼각형의 넓이:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|06. 삼각형의 넓이:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|06. 삼각형의 넓이:4",
"big": "6. 다각형의 둘레와 넓이",
"small": "06. 삼각형의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|07. 마름모의 넓이:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|07. 마름모의 넓이:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|07. 마름모의 넓이:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|07. 마름모의 넓이:4",
"big": "6. 다각형의 둘레와 넓이",
"small": "07. 마름모의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|08. 사다리꼴의 넓이:1",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|08. 사다리꼴의 넓이:2",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "ladder"
},
{
"id": "ladder:e5-1|6. 다각형의 둘레와 넓이|08. 사다리꼴의 넓이:3",
"big": "6. 다각형의 둘레와 넓이",
"small": "08. 사다리꼴의 넓이",
"kind": "ladder"
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
