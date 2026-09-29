/* 질문 고르기 — 기본으로 실어 두는 분류안 (초4-1)
   Claude 분류(2026-09-29): 기준표_초등_질문.md 1~19절 그대로. 원천 작업도구/질문계단/e4/spec_e41.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e4-1_2026-09-29a', data:{
"format": "qr-plan-2",
"grade": "e4-1",
"rounds": 3,
"items": [
{
"id": "37fe23:t0L1",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1000이 10개인 수는 얼마이고 어떻게 읽어?",
"newQBy": "claude",
"answer": "10000이고, 만 또는 일만이라고 읽어.",
"keys": [
"10000",
"만(일만)"
],
"answerBy": "claude"
},
{
"id": "37fe23:t0L2",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "25936에서 각 자리의 숫자는 얼마를 나타내?",
"newQBy": "claude",
"answer": "2는 20000, 5는 5000, 9는 900, 3은 30, 6은 6을 나타내.",
"keys": [
"2는 20000",
"자리에 따라 값이 다르다"
],
"answerBy": "claude"
},
{
"id": "37fe23:t0L3",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:t0H1",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:t0H2",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:qrecall",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "25936을 어떻게 읽어?",
"newQBy": "claude",
"answer": "이만 오천구백삼십육이라고 읽어.",
"keys": [
"이만 오천구백삼십육"
],
"answerBy": "claude"
},
{
"id": "37fe23:qreason",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:qexample",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "10000보다 크고 20000보다 작은 다섯 자리 수를 하나 말하고, 만의 자리 숫자를 말해 봐.",
"newQBy": "claude",
"answer": "15432처럼 만의 자리 숫자가 1인 수야. 15432의 만의 자리 숫자는 1이야.",
"keys": [
"만의 자리 숫자가 1인 다섯 자리 수",
"만의 자리 숫자 1"
],
"answerBy": "claude"
},
{
"id": "37fe23:qcondition",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:qerror",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "37fe23:qa29e4111",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "add",
"round": 1,
"by": "claude",
"q": "10000원짜리 3장, 1000원짜리 4장, 100원짜리 2개는 모두 얼마야?",
"answer": "30000 + 4000 + 200 = 34200이니까 34200원이야.",
"keys": [
"30000 + 4000 + 200",
"34200원"
],
"answerBy": "claude"
},
{
"id": "1c538rh:t0L1",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:t0L2",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "십만, 백만, 천만은 서로 어떤 관계야?",
"newQBy": "claude",
"answer": "십만이 10개면 백만, 백만이 10개면 천만이야. 자리가 하나 올라갈 때마다 10배씩 커져.",
"keys": [
"10배씩 커진다"
],
"answerBy": "claude"
},
{
"id": "1c538rh:t0H1",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:t0H2",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:qrecall",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "10000이 10개 모이면 얼마이고 뭐라고 읽어?",
"newQBy": "claude",
"answer": "100000이고 십만이라고 읽어.",
"keys": [
"100000",
"십만"
],
"answerBy": "claude"
},
{
"id": "1c538rh:qreason",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:qexample",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "백만보다 크고 천만보다 작은 수를 하나 만들어 읽어 봐.",
"newQBy": "claude",
"answer": "3528000을 만들면 삼백오십이만 팔천이라고 읽어.",
"keys": [
"일곱 자리 수",
"만 단위로 끊어 읽는다"
],
"answerBy": "claude"
},
{
"id": "1c538rh:qcondition",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:qerror",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1c538rh:qa29e4121",
"big": "1. 큰 수",
"small": "02. 십만, 백만, 천만",
"kind": "add",
"round": 1,
"by": "claude",
"q": "37150000에서 숫자 7은 어느 자리 숫자이고 얼마를 나타내?",
"answer": "네 자리씩 끊으면 3715 | 0000이라 7은 백만의 자리 숫자이고 7000000을 나타내.",
"keys": [
"백만의 자리",
"7000000"
],
"answerBy": "claude"
},
{
"id": "x5to7v:t0L1",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1000만이 10개인 수는 뭐라고 해?",
"newQBy": "claude",
"answer": "1억이라고 해. 100000000이야.",
"keys": [
"1억"
],
"answerBy": "claude"
},
{
"id": "x5to7v:t0L2",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "1000억이 10개인 수는 뭐라고 해?",
"newQBy": "claude",
"answer": "1조라고 해.",
"keys": [
"1조"
],
"answerBy": "claude"
},
{
"id": "x5to7v:t0L3",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "큰 수는 어디부터 몇 자리씩 끊어 읽어?",
"newQBy": "claude",
"answer": "일의 자리부터 네 자리씩 끊어서 만, 억, 조를 붙여 읽어.",
"keys": [
"일의 자리부터",
"네 자리씩"
],
"answerBy": "claude"
},
{
"id": "x5to7v:t0H1",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "만, 억, 조는 서로 어떤 관계야?",
"newQBy": "claude",
"answer": "만이 10000개면 억, 억이 10000개면 조야. 만·억·조는 10000배씩 커져.",
"keys": [
"10000배씩 커진다"
],
"answerBy": "claude"
},
{
"id": "x5to7v:t0H2",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "547300000000000을 읽는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "네 자리씩 끊으면 547 | 3000 | 0000 | 0000이라서 오백사십칠조 삼천억이라고 읽어.",
"keys": [
"네 자리씩 끊는다",
"오백사십칠조 삼천억"
],
"answerBy": "claude"
},
{
"id": "x5to7v:qrecall",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "x5to7v:qreason",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "x5to7v:qexample",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "억 단위가 들어가는 수를 하나 말하고, 억의 자리 숫자를 말해 봐.",
"newQBy": "claude",
"answer": "3억 2500만을 말하면 억의 자리 숫자는 3이야.",
"keys": [
"억 단위가 들어간 수",
"억의 자리 숫자"
],
"answerBy": "claude"
},
{
"id": "x5to7v:qcondition",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "x5to7v:qerror",
"big": "1. 큰 수",
"small": "03. 억과 조",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1hc99uh:t0L1",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hc99uh:t0L2",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "어떤 수를 10배 하면 어떻게 돼?",
"newQBy": "claude",
"answer": "수의 뒤에 0이 하나 붙은 것과 같아. 각 자리 숫자가 한 자리씩 높은 자리로 올라가.",
"keys": [
"뒤에 0이 하나 붙는다"
],
"answerBy": "claude"
},
{
"id": "1hc99uh:t0H1",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1hc99uh:t0H2",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "수를 10배 하면 뒤에 0이 하나 붙는 이유를 말해 봐.",
"newQBy": "claude",
"answer": "10배 하면 각 자리 숫자가 한 자리씩 높은 자리로 올라가서 일의 자리가 비고, 그 자리에 0이 와.",
"keys": [
"한 자리씩 높은 자리로 올라간다",
"일의 자리가 0"
],
"answerBy": "claude"
},
{
"id": "1hc99uh:qrecall",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "23000에서 10000씩 3번 뛰어 세면 얼마야?",
"newQBy": "claude",
"answer": "만의 자리 숫자가 1씩 커져서 33000, 43000, 53000이야.",
"keys": [
"만의 자리 숫자가 1씩 커진다",
"53000"
],
"answerBy": "claude"
},
{
"id": "1hc99uh:qreason",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "8만 9천에서 1만씩 두 번 뛰어 세면 얼마야? 9만 9천 다음에 어떤 자리가 바뀌는지 말해 봐.",
"newQBy": "claude",
"answer": "9만 9천, 10만 9천이야. 만의 자리 9에 1을 더하면 10이 되어 십만의 자리가 생겨.",
"keys": [
"9만 9천 다음은 10만 9천",
"십만의 자리가 생긴다"
],
"answerBy": "claude"
},
{
"id": "1hc99uh:qexample",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1hc99uh:qerror",
"big": "1. 큰 수",
"small": "04. 뛰어 세기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 13000에서 10000씩 뛰어 세면서 13000, 24000, 35000이라고 했어. 뭐가 잘못됐는지 찾고, 바르게 뛰어 세어 봐.",
"newQBy": "claude",
"answer": "천의 자리 숫자까지 바꿨어. 10000씩 뛰어 세면 만의 자리만 1씩 커져서 13000, 23000, 33000이야.",
"keys": [
"만의 자리만 1씩 커진다",
"13000, 23000, 33000"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:t0L1",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gry6m8:t0L2",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gry6m8:t0H1",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gry6m8:t0H2",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1gry6m8:qrecall",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "먼저 자리 수를 비교해 자리 수가 많은 수가 커. 자리 수가 같으면 가장 높은 자리부터 차례로 비교해.",
"keys": [
"자리 수 비교",
"높은 자리부터 비교"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:qreason",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "자리 수가 다르면 왜 자리 수가 많은 쪽이 항상 더 커?",
"newQBy": "claude",
"answer": "자리 수가 많으면 더 높은 자리에 숫자가 있어서야. 가장 작은 다섯 자리 수 10000도 가장 큰 네 자리 수 9999보다 커.",
"keys": [
"더 높은 자리가 있다",
"10000 > 9999"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:qexample",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "48560000과 48720000은 여덟 자리로 같아. 십만의 자리 5와 7을 비교하면 48720000이 더 커.",
"keys": [
"자리 수가 같은 두 수",
"높은 자리부터 비교"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:qerror",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 320과 45를 비교하면서 4와 3을 비교하니까 45가 더 크다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "자리 수를 먼저 봐야 해. 320은 세 자리, 45는 두 자리라서 320이 더 커.",
"keys": [
"자리 수를 먼저 본다",
"320이 더 크다"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:qa29e4151",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "add",
"round": 1,
"by": "claude",
"q": "48560000과 48720000 중 어느 수가 더 커? 어떻게 비교했는지 말해 봐.",
"answer": "둘 다 여덟 자리야. 높은 자리부터 보면 십만의 자리에서 5 < 7이라서 48720000이 더 커.",
"keys": [
"자리 수가 같다",
"십만의 자리 5 < 7"
],
"answerBy": "claude"
},
{
"id": "1gry6m8:qa29e4152",
"big": "1. 큰 수",
"small": "05. 수의 크기 비교",
"kind": "add",
"round": 1,
"by": "claude",
"q": "큰 수가 나오면 가장 먼저 무엇을 해야 해?",
"answer": "일의 자리부터 네 자리씩 끊어서 만, 억, 조 단위를 찾아. 그래야 바르게 읽고, 자리 수를 세어 크기도 비교할 수 있어.",
"keys": [
"네 자리씩 끊는다",
"만·억·조 단위를 찾는다"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:t0L1",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "각의 크기는 무엇에 따라 정해져?",
"newQBy": "claude",
"answer": "두 변이 벌어진 정도에 따라 정해져. 변의 길이와는 상관없어.",
"keys": [
"두 변이 벌어진 정도"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:t0L2",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "각도가 뭐야? 1°는 어떤 크기야?",
"newQBy": "claude",
"answer": "각의 크기를 각도라고 해. 1°는 직각을 똑같이 90으로 나눈 것 중 하나야.",
"keys": [
"각의 크기",
"직각을 90으로 나눈 하나"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:t0L3",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3g8g8u:t0H1",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3g8g8u:t0H2",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "3g8g8u:t0H3",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "각도기로 각을 재는 순서를 말해 봐.",
"newQBy": "claude",
"answer": "각도기의 중심을 꼭짓점에, 밑금을 한 변에 맞춰. 그 변이 있는 쪽 0에서 시작하는 눈금으로 다른 변이 가리키는 곳을 읽어.",
"keys": [
"중심을 꼭짓점에, 밑금을 한 변에",
"0에서 시작하는 눈금을 읽는다"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:qrecall",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "각도기로 각을 잴 때 중심과 밑금을 어디에 맞춰?",
"newQBy": "claude",
"answer": "각도기의 중심을 각의 꼭짓점에, 밑금을 각의 한 변에 맞춰.",
"keys": [
"중심은 꼭짓점",
"밑금은 한 변"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:qreason",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "3g8g8u:qexample",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "변의 길이는 다르지만 각도는 똑같은 두 각을 어떻게 만들어?",
"newQBy": "claude",
"answer": "벌어진 정도는 같게 하고 변의 길이만 다르게 그리면 돼.",
"keys": [
"벌어진 정도를 같게",
"변의 길이만 다르게"
],
"answerBy": "claude"
},
{
"id": "3g8g8u:qerror",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:t0L1",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:t0L2",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:t0L3",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:t0H1",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:t0H2",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "각도기 없이 각도를 어림하려면 어떻게 해?",
"newQBy": "claude",
"answer": "삼각자의 30°, 45°, 60°, 90°처럼 아는 각과 비교해서 약 몇 도인지 어림해.",
"keys": [
"아는 각과 비교한다"
],
"answerBy": "claude"
},
{
"id": "2ke1m5:qrecall",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "예각과 둔각은 각각 몇 도에서 몇 도 사이야?",
"newQBy": "claude",
"answer": "예각은 0°보다 크고 90°보다 작은 각, 둔각은 90°보다 크고 180°보다 작은 각이야.",
"keys": [
"예각은 0°~90°",
"둔각은 90°~180°"
],
"answerBy": "claude"
},
{
"id": "2ke1m5:qreason",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:qexample",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:qcondition",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "90°인 각은 예각이야, 둔각이야? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "둘 다 아니고 직각이야. 예각은 90°보다 작고 둔각은 90°보다 커.",
"keys": [
"직각이다",
"90°는 기준이다"
],
"answerBy": "claude"
},
{
"id": "2ke1m5:qerror",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "2ke1m5:qa29e4121",
"big": "2. 각도",
"small": "02. 예각과 둔각 / 각도 어림하기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "시계의 긴바늘과 짧은바늘이 3시와 2시에 이루는 작은 쪽의 각은 각각 어떤 각이야?",
"answer": "3시에는 직각이고, 2시에는 60°라서 예각이야.",
"keys": [
"3시는 직각",
"2시는 예각"
],
"answerBy": "claude"
},
{
"id": "1xhbxoa:t0L1",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:t0L2",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:t0H1",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:t0H2",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "두 각을 이어 붙이면 어떤 계산이 되고, 겹치면 어떤 계산이 돼?",
"newQBy": "claude",
"answer": "이어 붙이면 두 각도의 합, 겹쳐서 남는 부분은 두 각도의 차가 돼.",
"keys": [
"이어 붙이면 합",
"겹치면 차"
],
"answerBy": "claude"
},
{
"id": "1xhbxoa:qrecall",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "60°와 25°를 더하면 얼마야?",
"newQBy": "claude",
"answer": "자연수처럼 60 + 25 = 85를 하고 °를 붙여서 85°야.",
"keys": [
"85°",
"°를 붙인다"
],
"answerBy": "claude"
},
{
"id": "1xhbxoa:qreason",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:qexample",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "두 각을 겹치지 않게 이어 붙여서 합이 100°가 되는 두 각도를 말해 봐.",
"newQBy": "claude",
"answer": "60°와 40°를 이어 붙이면 100°가 돼.",
"keys": [
"합이 100°",
"예: 60°와 40°"
],
"answerBy": "claude"
},
{
"id": "1xhbxoa:qcondition",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:qerror",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1xhbxoa:qa29e4131",
"big": "2. 각도",
"small": "03. 각도의 덧셈과 뺄셈",
"kind": "add",
"round": 2,
"by": "claude",
"q": "삼각자의 45°인 각과 60°인 각을 이어 붙이면 몇 도가 되고, 겹치면 차는 몇 도야?",
"answer": "이어 붙이면 45° + 60° = 105°이고, 겹치면 60° − 45° = 15°야.",
"keys": [
"105°",
"15°"
],
"answerBy": "claude"
},
{
"id": "f8b76z:t0L1",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f8b76z:t0L2",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f8b76z:t0H1",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "삼각형의 세 각을 잘라 꼭짓점을 한 점에 모으면 어떻게 되고, 그것으로 무엇을 알 수 있어?",
"newQBy": "claude",
"answer": "세 각이 모여 직선이 돼. 직선이 이루는 각은 180°라서 세 각의 합이 180°인 걸 알 수 있어.",
"keys": [
"직선이 된다",
"세 각의 합은 180°"
],
"answerBy": "claude"
},
{
"id": "f8b76z:t0H2",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "f8b76z:qrecall",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "삼각형의 세 각의 크기를 모두 더하면 몇 도야?",
"newQBy": "claude",
"answer": "180°야.",
"keys": [
"180°"
],
"answerBy": "claude"
},
{
"id": "f8b76z:qreason",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "f8b76z:qexample",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "두 각이 50°, 60°인 삼각형의 나머지 한 각은 몇 도야? 어떻게 구했는지도 말해 봐.",
"newQBy": "claude",
"answer": "180°에서 두 각을 빼면 180° − 50° − 60° = 70°야.",
"keys": [
"180°에서 두 각을 뺀다",
"70°"
],
"answerBy": "claude"
},
{
"id": "f8b76z:qcondition",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "삼각형의 모양이나 크기가 달라지면 세 각의 합도 달라져? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "달라지지 않아. 어떤 삼각형이든 세 각을 모으면 직선이 되어서 늘 180°야.",
"keys": [
"늘 180°",
"모으면 직선"
],
"answerBy": "claude"
},
{
"id": "f8b76z:qerror",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "f8b76z:qa29e4141",
"big": "2. 각도",
"small": "04. 삼각형의 세 각의 크기의 합",
"kind": "add",
"round": 2,
"by": "claude",
"q": "한 삼각형에 직각이 두 개 있을 수 있어? 이유도 말해 봐.",
"answer": "없어. 두 각만 더해도 180°가 되어 나머지 한 각이 0°가 되니까 삼각형이 될 수 없어.",
"keys": [
"두 각만으로 180°",
"나머지 각이 없다"
],
"answerBy": "claude"
},
{
"id": "1kys70y:t0L1",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kys70y:t0L2",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kys70y:t0H1",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "사각형의 네 각의 합이 360°인 이유를 삼각형으로 설명해 봐.",
"newQBy": "claude",
"answer": "사각형에 대각선을 그으면 삼각형 2개로 나뉘어. 삼각형 하나의 세 각의 합이 180°라서 180° × 2 = 360°야.",
"keys": [
"삼각형 2개로 나뉜다",
"180° × 2 = 360°"
],
"answerBy": "claude"
},
{
"id": "1kys70y:t0H2",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1kys70y:qrecall",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "사각형의 네 각의 크기를 모두 더하면 몇 도야?",
"newQBy": "claude",
"answer": "360°야.",
"keys": [
"360°"
],
"answerBy": "claude"
},
{
"id": "1kys70y:qreason",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1kys70y:qexample",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "세 각이 80°, 100°, 90°인 사각형의 나머지 한 각은 몇 도야?",
"newQBy": "claude",
"answer": "360° − 80° − 100° − 90° = 90°야.",
"keys": [
"360°에서 세 각을 뺀다",
"90°"
],
"answerBy": "claude"
},
{
"id": "1kys70y:qerror",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 사각형의 네 각의 합도 삼각형처럼 180°라고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "사각형은 삼각형 2개로 나뉘어서 네 각의 합은 180° × 2 = 360°야.",
"keys": [
"삼각형 2개로 나뉜다",
"360°"
],
"answerBy": "claude"
},
{
"id": "1kys70y:qa29e4151",
"big": "2. 각도",
"small": "05. 사각형의 네 각의 크기의 합",
"kind": "add",
"round": 1,
"by": "claude",
"q": "각도 문제가 나오면 가장 먼저 무엇을 떠올려야 해?",
"answer": "알고 있는 각의 합이야. 직선은 180°, 삼각형의 세 각의 합은 180°, 사각형의 네 각의 합은 360°라서 여기서 아는 각을 빼면 모르는 각이 나와.",
"keys": [
"직선 180°, 삼각형 180°, 사각형 360°",
"아는 각을 뺀다"
],
"answerBy": "claude"
},
{
"id": "11pgko1:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "11pgko1:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "163 × 2를 알면 163 × 20의 답은 어떻게 구해?",
"newQBy": "claude",
"answer": "163 × 2 = 326에 0을 하나 붙이면 돼. 163 × 20 = 3260이야.",
"keys": [
"326에 0을 하나 붙인다",
"3260"
],
"answerBy": "claude"
},
{
"id": "11pgko1:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "11pgko1:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "163 × 20이 163 × 2의 결과에 0을 하나 붙인 것과 같은 이유를 말해 봐.",
"newQBy": "claude",
"answer": "20은 2의 10배라서 곱도 10배가 돼. 10배 하면 뒤에 0이 하나 붙어.",
"keys": [
"20은 2의 10배",
"곱도 10배"
],
"answerBy": "claude"
},
{
"id": "11pgko1:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "200 × 30을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "2 × 3 = 6을 계산하고, 두 수의 0의 개수 3개만큼 0을 붙여 6000이야.",
"keys": [
"2 × 3 = 6",
"0을 3개 붙여 6000"
],
"answerBy": "claude"
},
{
"id": "11pgko1:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "11pgko1:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "214 × 30을 만들면 214 × 3 = 642에 0을 하나 붙여 6420이야.",
"keys": [
"0을 떼고 곱한다",
"뗀 0만큼 붙인다"
],
"answerBy": "claude"
},
{
"id": "11pgko1:qcondition",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "11pgko1:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "11pgko1:qa29e4111",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 상자에 245개씩 든 사탕 30상자는 모두 몇 개야? 식과 답을 말해 봐.",
"answer": "245 × 30이야. 245 × 3 = 735에 0을 붙여 7350개야.",
"keys": [
"245 × 30",
"7350개"
],
"answerBy": "claude"
},
{
"id": "1tdhn4n:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "317 × 28을 계산하는 방법을 순서대로 말해 봐.",
"newQBy": "claude",
"answer": "28을 8과 20으로 나누어 317 × 8 = 2536, 317 × 20 = 6340을 구하고 더해서 8876이야.",
"keys": [
"8과 20으로 나누어 곱한다",
"두 곱을 더한다: 8876"
],
"answerBy": "claude"
},
{
"id": "1tdhn4n:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "28을 8과 20으로 나누어 곱한 뒤 더하면 왜 317 × 28과 같아?",
"newQBy": "claude",
"answer": "317 × 28은 317을 28번 더한 것이고, 28번은 8번과 20번을 합한 것이니까 두 곱을 더하면 같아.",
"keys": [
"317을 28번 더한 것",
"8번과 20번의 합"
],
"answerBy": "claude"
},
{
"id": "1tdhn4n:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:qcondition",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "1tdhn4n:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 317 × 20을 계산하면서 317 × 2와 똑같이 634라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.",
"newQBy": "claude",
"answer": "20은 2의 10배라서 634에 0을 붙여야 해. 317 × 20 = 6340이야.",
"keys": [
"0을 붙여야 한다",
"6340"
],
"answerBy": "claude"
},
{
"id": "1tdhn4n:qa29e4121",
"big": "3. 곱셈과 나눗셈",
"small": "02. (세 자리 수)×(몇십몇)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "한 칸에 125명씩 탈 수 있는 기차 24칸에는 모두 몇 명이 탈 수 있어? 식과 답을 말해 봐.",
"answer": "125 × 24 = 125 × 4 + 125 × 20 = 500 + 2500 = 3000이니까 3000명이야.",
"keys": [
"125 × 24",
"3000명"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "vvhu9s:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "나눗셈의 나머지는 어떤 수보다 작아야 해? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "나누는 수보다 작아야 해. 나머지가 나누는 수보다 크거나 같으면 한 번 더 나눌 수 있으니까.",
"keys": [
"나누는 수보다 작다",
"크면 한 번 더 나눌 수 있다"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "high",
"by": "claude",
"round": 1,
"newQ": "163 ÷ 40의 몫과 나머지를 구하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "40 × 4 = 160이 163을 넘지 않는 가장 큰 곱이라 몫은 4이고, 163 − 160 = 3이 나머지야.",
"keys": [
"40 × 4 = 160",
"몫 4, 나머지 3"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "163 ÷ 40 = 4 … 3이 맞는지 확인하는 식을 말해 봐.",
"newQBy": "claude",
"answer": "나누는 수 × 몫 + 나머지를 계산해. 40 × 4 + 3 = 163이 되니까 맞아.",
"keys": [
"40 × 4 + 3",
"163이 되면 맞다"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "120 ÷ 30을 계산하는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "30 × 4 = 120이니까 몫은 4야. 12 ÷ 3 = 4를 이용해도 돼.",
"keys": [
"30 × 4 = 120",
"몫 4"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "vvhu9s:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "215 ÷ 30을 만들면 30 × 7 = 210이라 몫은 7, 나머지는 5야.",
"keys": [
"몇십으로 나누는 식",
"나머지는 나누는 수보다 작다"
],
"answerBy": "claude"
},
{
"id": "vvhu9s:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "vvhu9s:qa29e4131",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "구슬 250개를 30개씩 봉지에 담으면 몇 봉지가 되고 몇 개가 남아?",
"answer": "250 ÷ 30 = 8 … 10이니까 8봉지가 되고 10개가 남아.",
"keys": [
"250 ÷ 30",
"8봉지, 10개"
],
"answerBy": "claude"
},
{
"id": "22nrno:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "22nrno:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "어림한 몫이 맞는지 어떻게 확인해?",
"newQBy": "claude",
"answer": "나누는 수에 몫을 곱해 나누어지는 수를 넘지 않는지, 나머지가 나누는 수보다 작은지 확인해.",
"keys": [
"나누는 수 × 몫을 비교한다",
"나머지 < 나누는 수"
],
"answerBy": "claude"
},
{
"id": "22nrno:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "22nrno:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "나머지가 나누는 수보다 크면 몫을 어떻게 고쳐야 해?",
"newQBy": "claude",
"answer": "몫이 너무 작은 거라서 몫을 1 크게 고쳐.",
"keys": [
"몫을 1 크게"
],
"answerBy": "claude"
},
{
"id": "22nrno:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "84 ÷ 16의 몫은 어떻게 어림하고, 실제 몫은 얼마야?",
"newQBy": "claude",
"answer": "84는 80, 16은 20으로 어림하면 몫은 약 4야. 16 × 5 = 80이 84를 넘지 않아서 몫은 5, 나머지는 4야.",
"keys": [
"80 ÷ 20으로 어림",
"몫 5, 나머지 4"
],
"answerBy": "claude"
},
{
"id": "22nrno:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "22nrno:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "92 ÷ 23을 만들면 90 ÷ 20으로 약 4로 어림하고, 23 × 4 = 92라서 몫은 4야.",
"keys": [
"몫을 어림한다",
"곱해서 확인한다"
],
"answerBy": "claude"
},
{
"id": "22nrno:qcondition",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "22nrno:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "22nrno:qa29e4141",
"big": "3. 곱셈과 나눗셈",
"small": "04. 몇십몇으로 나누기 (1)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "사탕 95개를 한 명에게 31개씩 주면 몇 명에게 줄 수 있고 몇 개가 남아?",
"answer": "95 ÷ 31 = 3 … 2이니까 3명에게 줄 수 있고 2개가 남아.",
"keys": [
"95 ÷ 31",
"3명, 2개"
],
"answerBy": "claude"
},
{
"id": "wbedpa:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wbedpa:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wbedpa:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "782 ÷ 23을 계산하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "23 × 30 = 690을 빼면 92가 남고, 23 × 4 = 92라서 몫은 34, 나머지는 0이야.",
"keys": [
"23 × 30을 뺀다",
"몫 34"
],
"answerBy": "claude"
},
{
"id": "wbedpa:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wbedpa:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "어림한 몫으로 곱한 값이 나누어지는 수보다 크면 몫을 어떻게 바꿔?",
"newQBy": "claude",
"answer": "몫이 너무 큰 거라서 몫을 1 작게 바꿔.",
"keys": [
"몫을 1 작게"
],
"answerBy": "claude"
},
{
"id": "wbedpa:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "wbedpa:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "644 ÷ 28에서 십의 자리 몫을 3으로 하면 28 × 30 = 840이 644보다 커. 그래서 2로 고쳐.",
"keys": [
"곱이 나누어지는 수보다 크다",
"몫을 1 작게"
],
"answerBy": "claude"
},
{
"id": "wbedpa:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 나눗셈에서 나머지가 나누는 수와 똑같이 나왔는데 그 몫이 맞다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "나머지는 나누는 수보다 작아야 해. 나머지가 나누는 수와 같으면 한 번 더 나눌 수 있으니 몫을 1 크게 해야 해.",
"keys": [
"나머지는 나누는 수보다 작다",
"몫을 1 크게"
],
"answerBy": "claude"
},
{
"id": "wbedpa:qa29e4151",
"big": "3. 곱셈과 나눗셈",
"small": "05. 몇십몇으로 나누기 (2)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "색종이 644장을 28명에게 똑같이 나누어 주면 한 명이 몇 장씩 가져?",
"answer": "644 ÷ 28 = 23이니까 23장씩 가져.",
"keys": [
"644 ÷ 28",
"23장"
],
"answerBy": "claude"
},
{
"id": "ytmias:t0L1",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "세 자리 수를 두 자리 수로 나누면 몫은 몇 자리가 될 수 있어? 어떻게 알아?",
"newQBy": "claude",
"answer": "앞 두 자리가 나누는 수보다 작으면 몫은 한 자리, 크거나 같으면 두 자리야.",
"keys": [
"앞 두 자리와 나누는 수를 비교",
"한 자리 또는 두 자리"
],
"answerBy": "claude"
},
{
"id": "ytmias:t0L2",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ytmias:t0H1",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "636 ÷ 27의 몫과 나머지를 구하는 과정을 말해 봐.",
"newQBy": "claude",
"answer": "27 × 20 = 540을 빼면 96, 27 × 3 = 81을 빼면 15가 남아. 몫은 23, 나머지는 15야.",
"keys": [
"십의 자리 몫부터",
"몫 23, 나머지 15"
],
"answerBy": "claude"
},
{
"id": "ytmias:t0H2",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ytmias:qrecall",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"answer": "나누는 수 × 몫 + 나머지가 나누어지는 수와 같은지 확인해.",
"keys": [
"나누는 수 × 몫 + 나머지 = 나누어지는 수"
],
"answerBy": "claude"
},
{
"id": "ytmias:qreason",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ytmias:qexample",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "나누는 수가 25일 때 몫이 두 자리가 되는 세 자리 수를 하나 말하고, 왜 두 자리가 되는지 말해 봐.",
"newQBy": "claude",
"answer": "300 ÷ 25를 말하면 앞 두 자리 30이 25보다 커서 몫이 두 자리야. 몫은 12야.",
"keys": [
"앞 두 자리가 25 이상",
"예: 300 ÷ 25 = 12"
],
"answerBy": "claude"
},
{
"id": "ytmias:qcondition",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "ytmias:qerror",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "ytmias:qa29e4161",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "add",
"round": 1,
"by": "claude",
"q": "몇십몇으로 나누는 나눗셈이 나오면 가장 먼저 생각해야 할 것은 뭐야?",
"answer": "몫이 몇 자리인지와 몫을 어림하는 거야. 앞자리와 나누는 수를 비교해 몫의 자리를 정하고, 어림한 몫을 곱해 확인해. 나머지는 나누는 수보다 작아야 해.",
"keys": [
"몫의 자리 수를 정한다",
"몫을 어림해 확인한다"
],
"answerBy": "claude"
},
{
"id": "ytmias:qa29e4162",
"big": "3. 곱셈과 나눗셈",
"small": "06. 몇십몇으로 나누기 (3)",
"kind": "add",
"round": 2,
"by": "claude",
"q": "어떤 수를 24로 나누어야 할 것을 잘못하여 42로 나누었더니 몫이 16, 나머지가 12였어. 바르게 계산한 몫과 나머지를 어떤 차례로 구해?",
"answer": "먼저 42 × 16 + 12 = 684로 어떤 수를 구해. 684 ÷ 24 = 28 … 12라서 몫은 28, 나머지는 12야.",
"keys": [
"확인식으로 어떤 수를 구한다: 684",
"684 ÷ 24 = 28 … 12"
],
"answerBy": "claude"
},
{
"id": "wb6hbb:t0L1",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:t0L2",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:t0H1",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:t0H2",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:qrecall",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "점을 이동했다는 걸 나타내려면 무엇과 무엇을 말해야 해?",
"newQBy": "claude",
"answer": "어느 방향으로 몇 칸(몇 cm) 이동했는지를 말해야 해.",
"keys": [
"방향",
"칸 수(거리)"
],
"answerBy": "claude"
},
{
"id": "wb6hbb:qreason",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:qexample",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "wb6hbb:qcondition",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "점을 오른쪽으로 3칸, 위쪽으로 2칸 이동한 것과 위쪽으로 2칸, 오른쪽으로 3칸 이동한 것은 도착하는 자리가 같아? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "같아. 두 방법 모두 가로로 3칸, 세로로 2칸 이동해서 순서만 달라.",
"keys": [
"같다",
"가로·세로 칸 수가 같다"
],
"answerBy": "claude"
},
{
"id": "wb6hbb:qerror",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 점을 3칸 이동했다고만 말했어. 뭐가 부족한지 말해 봐.",
"newQBy": "claude",
"answer": "방향을 말하지 않아서 어디로 갔는지 알 수 없어. 오른쪽으로 3칸처럼 방향도 말해야 해.",
"keys": [
"방향이 없다"
],
"answerBy": "claude"
},
{
"id": "wb6hbb:qa29e4111",
"big": "4. 평면도형의 이동",
"small": "01. 점을 이동해 보기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "점 ㄱ을 오른쪽으로 3 cm, 위쪽으로 2 cm 옮긴 곳은 어떻게 찾아?",
"answer": "점 ㄱ에서 오른쪽으로 3 cm 간 다음 위쪽으로 2 cm 가면 돼.",
"keys": [
"오른쪽으로 3 cm",
"위쪽으로 2 cm"
],
"answerBy": "claude"
},
{
"id": "8ns389:t0L1",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:t0L2",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:t0H1",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:t0H2",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "모양 조각을 밀기를 반복해서 규칙적인 무늬를 만드는 방법을 말해 봐.",
"newQBy": "claude",
"answer": "모양을 오른쪽으로 미는 것을 반복해 첫째 줄을 만들고, 그 줄을 아래쪽으로 밀어서 무늬를 만들어.",
"keys": [
"오른쪽으로 밀기를 반복",
"줄을 아래로 민다"
],
"answerBy": "claude"
},
{
"id": "8ns389:qrecall",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "도형을 밀면 무엇이 변하고 무엇이 변하지 않아?",
"newQBy": "claude",
"answer": "위치만 바뀌고 모양과 크기는 변하지 않아.",
"keys": [
"위치만 바뀐다",
"모양과 크기는 그대로"
],
"answerBy": "claude"
},
{
"id": "8ns389:qreason",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:qexample",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:qerror",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "8ns389:qa29e4121",
"big": "4. 평면도형의 이동",
"small": "02. 평면도형을 밀어 보기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "도형을 왼쪽으로 3 cm 밀고 다시 오른쪽으로 3 cm 밀면 어떻게 돼?",
"answer": "처음 위치로 돌아와서 처음 도형과 똑같아.",
"keys": [
"처음 위치로 돌아온다"
],
"answerBy": "claude"
},
{
"id": "1ggibk7:t0L1",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "도형을 위쪽으로 뒤집으면 무엇과 무엇이 바뀌어?",
"newQBy": "claude",
"answer": "도형의 위쪽과 아래쪽이 서로 바뀌어.",
"keys": [
"위쪽과 아래쪽"
],
"answerBy": "claude"
},
{
"id": "1ggibk7:t0L2",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "도형을 왼쪽으로 뒤집으면 무엇과 무엇이 바뀌어?",
"newQBy": "claude",
"answer": "도형의 왼쪽과 오른쪽이 서로 바뀌어.",
"keys": [
"왼쪽과 오른쪽"
],
"answerBy": "claude"
},
{
"id": "1ggibk7:t0H1",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ggibk7:t0H2",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1ggibk7:qrecall",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "1ggibk7:qreason",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "1ggibk7:qexample",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "알파벳 F처럼 생긴 도형을 왼쪽으로 뒤집으면 어떤 모습이 되는지 말해 봐.",
"newQBy": "claude",
"answer": "왼쪽과 오른쪽이 바뀌어서 가로로 튀어나온 부분이 왼쪽을 향하는 모습이 돼.",
"keys": [
"왼쪽과 오른쪽이 바뀐다"
],
"answerBy": "claude"
},
{
"id": "1ggibk7:qcondition",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "도형을 같은 방향으로 두 번 뒤집으면 어떻게 돼? 이유도 말해 봐.",
"newQBy": "claude",
"answer": "처음 도형과 같아져. 한 번 뒤집어 바뀐 쪽이 두 번째에 다시 돌아오니까.",
"keys": [
"처음 도형과 같다",
"바뀐 쪽이 다시 돌아온다"
],
"answerBy": "claude"
},
{
"id": "1ggibk7:qerror",
"big": "4. 평면도형의 이동",
"small": "03. 평면도형을 뒤집어 보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 도형을 위쪽으로 뒤집었는데 시계 방향으로 90° 돌린 것처럼 그렸어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "위쪽으로 뒤집으면 위쪽과 아래쪽만 바뀌어야 해. 90° 돌리면 위쪽이 오른쪽으로 가서 다른 모양이야.",
"keys": [
"뒤집기는 위아래만 바뀐다",
"돌리기와 다르다"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:t0L1",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "도형을 시계 방향으로 90°만큼 돌리면 위쪽이 어디로 가?",
"newQBy": "claude",
"answer": "오른쪽으로 가.",
"keys": [
"오른쪽"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:t0L2",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "도형을 360°만큼 돌리면 어떻게 돼?",
"newQBy": "claude",
"answer": "한 바퀴 돌아서 처음 도형과 같아져.",
"keys": [
"처음 도형과 같다"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:t0H1",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ib0uc7:t0H2",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ib0uc7:qrecall",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "ib0uc7:qreason",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ib0uc7:qexample",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 1,
"newQ": "도형을 시계 반대 방향으로 90°만큼 돌리면 위쪽은 어디로 가?",
"newQBy": "claude",
"answer": "왼쪽으로 가.",
"keys": [
"왼쪽"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:qcondition",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "도형을 시계 방향으로 270° 돌린 것과 같은 모습이 되려면 시계 반대 방향으로는 몇 도를 돌려야 해?",
"newQBy": "claude",
"answer": "90°야. 시계 방향 270°는 한 바퀴에서 90° 모자라니까 시계 반대 방향으로 90° 돌린 것과 같아.",
"keys": [
"90°",
"한 바퀴 360°에서 270°를 뺀다"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:qerror",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "qset",
"by": "claude",
"type": "error",
"round": 2,
"newQ": "친구가 도형을 90°씩 두 번 돌렸더니 처음 모양과 똑같아졌다고 했어. 뭐가 잘못됐는지 말해 봐.",
"newQBy": "claude",
"answer": "90°씩 두 번이면 180°라서 위쪽이 아래쪽으로 가. 처음과 같아지려면 360°, 곧 네 번 돌려야 해.",
"keys": [
"두 번이면 180°",
"처음과 같으려면 360°"
],
"answerBy": "claude"
},
{
"id": "ib0uc7:qa29e4141",
"big": "4. 평면도형의 이동",
"small": "04. 평면도형을 돌려 보기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "도형을 움직이는 문제가 나오면 가장 먼저 무엇을 확인해야 해?",
"answer": "밀기, 뒤집기, 돌리기 중 무엇인지와 방향이야. 밀기는 모양이 그대로이고, 뒤집기는 어느 쪽이 바뀌는지, 돌리기는 위쪽이 어디로 가는지 봐.",
"keys": [
"밀기·뒤집기·돌리기 중 무엇인지",
"방향(각도)"
],
"answerBy": "claude"
},
{
"id": "zixqgu:t0L1",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "막대그래프는 무엇을 무엇으로 나타낸 그래프야?",
"newQBy": "claude",
"answer": "조사한 자료의 수량을 막대 모양으로 나타낸 그래프야.",
"keys": [
"자료의 수량",
"막대 모양"
],
"answerBy": "claude"
},
{
"id": "zixqgu:t0L2",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "가고 싶은 장소별 학생 수 막대그래프에서 가로와 세로는 각각 무엇을 나타내?",
"newQBy": "claude",
"answer": "가로는 장소, 세로는 학생 수를 나타내.",
"keys": [
"가로는 장소",
"세로는 학생 수"
],
"answerBy": "claude"
},
{
"id": "zixqgu:t0L3",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:t0H1",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:t0H2",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:qrecall",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:qreason",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 2,
"newQ": "막대그래프에 눈금이 하나도 없으면 뭐가 불편해?",
"newQBy": "claude",
"answer": "막대의 길이로 많고 적음은 알아도 정확히 몇인지 알 수 없어.",
"keys": [
"정확한 수를 알 수 없다"
],
"answerBy": "claude"
},
{
"id": "zixqgu:qexample",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "좋아하는 과일 세 가지를 조사해 막대그래프로 나타낸다면 가로와 세로에 각각 무엇을 나타낼지 말해 봐.",
"newQBy": "claude",
"answer": "가로에는 과일의 종류, 세로에는 학생 수를 나타내.",
"keys": [
"가로는 종류",
"세로는 수"
],
"answerBy": "claude"
},
{
"id": "zixqgu:qcondition",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "condition",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:qerror",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "zixqgu:qa29e4111",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "세로 눈금 0과 10 사이가 5칸으로 나뉘어 있어. 눈금 한 칸은 몇 명이야?",
"answer": "10을 5칸으로 나누면 한 칸은 2명이야.",
"keys": [
"10 ÷ 5",
"2명"
],
"answerBy": "claude"
},
{
"id": "a5og29:t0L1",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "a5og29:t0L2",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "막대그래프의 눈금 한 칸의 크기는 무엇을 보고 정해?",
"newQBy": "claude",
"answer": "조사한 수 중 가장 큰 수를 나타낼 수 있게 정해.",
"keys": [
"가장 큰 수를 나타낼 수 있게"
],
"answerBy": "claude"
},
{
"id": "a5og29:t0H1",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "a5og29:t0H2",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "a5og29:qrecall",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "막대그래프를 그리는 순서를 말해 봐.",
"newQBy": "claude",
"answer": "가로와 세로에 나타낼 것을 정하고, 눈금 한 칸의 크기를 정한 뒤, 수에 맞게 막대를 그리고 제목을 써.",
"keys": [
"가로·세로 정하기",
"눈금 → 막대 → 제목"
],
"answerBy": "claude"
},
{
"id": "a5og29:qreason",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "a5og29:qexample",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "조사한 자료 중 가장 큰 수가 47이야. 눈금 한 칸을 얼마로 정하면 좋을지 말하고 이유도 말해 봐.",
"newQBy": "claude",
"answer": "한 칸을 5로 하면 10칸으로 50까지 나타낼 수 있어서 47을 나타낼 수 있어.",
"keys": [
"예: 한 칸 5",
"47을 나타낼 수 있다"
],
"answerBy": "claude"
},
{
"id": "a5og29:qerror",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "a5og29:qa29e4121",
"big": "5. 막대그래프",
"small": "02. 막대그래프로 나타내기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "눈금 한 칸이 2명인 막대그래프에서 7명은 막대를 몇 칸으로 그려?",
"answer": "7 ÷ 2 = 3 … 1이라서 3칸 반으로 그려.",
"keys": [
"한 칸이 2명",
"3칸 반"
],
"answerBy": "claude"
},
{
"id": "q9gysf:t0L1",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "막대그래프에서 가장 많은 것과 가장 적은 것은 어떻게 찾아?",
"newQBy": "claude",
"answer": "막대가 가장 긴 것이 가장 많고, 가장 짧은 것이 가장 적어.",
"keys": [
"가장 긴 막대",
"가장 짧은 막대"
],
"answerBy": "claude"
},
{
"id": "q9gysf:t0L2",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "q9gysf:t0H1",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "q9gysf:t0H2",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "표와 막대그래프는 각각 어떤 점에서 좋아?",
"newQBy": "claude",
"answer": "표는 정확한 수와 합계를 알기 쉽고, 막대그래프는 많고 적음을 한눈에 비교하기 쉬워.",
"keys": [
"표는 정확한 수",
"막대그래프는 한눈에 비교"
],
"answerBy": "claude"
},
{
"id": "q9gysf:qrecall",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 2,
"newQ": "세로 눈금 한 칸이 2명인 막대그래프에서 축구 막대는 7칸, 농구 막대는 4칸이야. 축구를 좋아하는 학생은 농구보다 몇 명 많아? 왜 3명이 아니야?",
"newQBy": "claude",
"answer": "3칸 차이인데 한 칸이 2명이라서 6명 더 많아. 칸 수가 아니라 한 칸의 크기를 곱해야 해.",
"keys": [
"3칸 차이",
"한 칸이 2명이라 6명"
],
"answerBy": "claude"
},
{
"id": "q9gysf:qreason",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "q9gysf:qexample",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "qset",
"by": "claude",
"type": "example",
"off": true,
"offBy": "claude"
},
{
"id": "q9gysf:qcondition",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "막대그래프만 보고 조사하지 않은 것까지 알 수 있어? 어디까지 알 수 있는지 말해 봐.",
"newQBy": "claude",
"answer": "조사한 항목의 수량과 차이는 알 수 있지만 조사하지 않은 것은 알 수 없어. 다만 그래프로 앞으로 무엇을 준비할지 예상할 수는 있어.",
"keys": [
"조사한 것만 알 수 있다",
"예상은 할 수 있다"
],
"answerBy": "claude"
},
{
"id": "q9gysf:qerror",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "q9gysf:qa29e4131",
"big": "5. 막대그래프",
"small": "03. 막대그래프 활용하기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "막대그래프가 나오면 가장 먼저 무엇을 확인해야 해?",
"answer": "가로와 세로가 각각 무엇을 나타내는지와 세로 눈금 한 칸의 크기야. 그래야 막대가 나타내는 수를 바르게 읽을 수 있어.",
"keys": [
"가로·세로가 나타내는 것",
"눈금 한 칸의 크기"
],
"answerBy": "claude"
},
{
"id": "1cen7rb:t0L1",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cen7rb:t0L2",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cen7rb:t0H1",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cen7rb:t0H2",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "1cen7rb:qrecall",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "수 배열표에서 규칙을 찾을 때 이웃한 수끼리 무엇을 비교해?",
"newQBy": "claude",
"answer": "이웃한 수끼리 얼마씩 커지거나 작아지는지, 몇 배가 되는지를 비교해.",
"keys": [
"차를 비교한다",
"몇 배인지 비교한다"
],
"answerBy": "claude"
},
{
"id": "1cen7rb:qexample",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "가로로 3씩 커지는 수 배열을 하나 만들어서 처음 네 수를 말해 봐.",
"newQBy": "claude",
"answer": "5, 8, 11, 14처럼 만들 수 있어.",
"keys": [
"3씩 커진다",
"예: 5, 8, 11, 14"
],
"answerBy": "claude"
},
{
"id": "1cen7rb:qcondition",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "수 배열의 규칙이 더하는 규칙인지 곱하는 규칙인지 어떻게 구분해?",
"newQBy": "claude",
"answer": "이웃한 수의 차가 일정하면 더하는 규칙이고, 몇 배가 일정하면 곱하는 규칙이야.",
"keys": [
"차가 일정하면 더하기",
"배가 일정하면 곱하기"
],
"answerBy": "claude"
},
{
"id": "1cen7rb:qerror",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "1cen7rb:qa29e4111",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "101, 111, 121, 131 다음에 올 수는 뭐야? 규칙도 말해 봐.",
"answer": "10씩 커지는 규칙이라서 다음 수는 141이야.",
"keys": [
"10씩 커진다",
"141"
],
"answerBy": "claude"
},
{
"id": "1cen7rb:qa29e4112",
"big": "6. 규칙 찾기",
"small": "01. 수의 배열에서 규칙 찾기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "규칙 찾기 문제가 나오면 가장 먼저 무엇을 해야 해?",
"answer": "이웃한 수나 모양, 식끼리 비교해서 얼마씩, 몇 배씩 변하는지 찾아. 그 규칙으로 다음 것을 예상해.",
"keys": [
"이웃한 것끼리 비교한다",
"얼마씩·몇 배씩 변하는지 찾는다"
],
"answerBy": "claude"
},
{
"id": "dmavz9:t0L1",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:t0L2",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:t0H1",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:t0H2",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:qrecall",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "모양의 배열에서 규칙을 찾으려면 무엇을 살펴봐?",
"newQBy": "claude",
"answer": "모양의 개수가 순서마다 어떻게 늘어나는지, 어느 쪽으로 늘어나는지 살펴봐.",
"keys": [
"개수가 늘어나는 방법",
"늘어나는 방향"
],
"answerBy": "claude"
},
{
"id": "dmavz9:qreason",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:qexample",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "사각형이 2개씩 늘어나는 배열을 하나 정해서 첫째, 둘째, 셋째 모양의 개수를 말해 봐.",
"newQBy": "claude",
"answer": "첫째 1개, 둘째 3개, 셋째 5개처럼 2개씩 늘어나.",
"keys": [
"2개씩 늘어난다",
"예: 1, 3, 5"
],
"answerBy": "claude"
},
{
"id": "dmavz9:qcondition",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "모양이 1개, 3개, 6개, 10개로 늘어나. 어떤 규칙이 있고 다음에는 몇 개야?",
"newQBy": "claude",
"answer": "늘어나는 수가 2, 3, 4로 1씩 커지는 규칙이야. 다음은 5가 늘어나서 15개야.",
"keys": [
"2, 3, 4씩 늘어난다",
"15개"
],
"answerBy": "claude"
},
{
"id": "dmavz9:qerror",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "dmavz9:qa29e4121",
"big": "6. 규칙 찾기",
"small": "02. 모양의 배열에서 규칙 찾기",
"kind": "add",
"round": 1,
"by": "claude",
"q": "모형이 1개, 4개, 9개, 16개로 늘어나면 다섯째는 몇 개야? 규칙도 말해 봐.",
"answer": "1 × 1, 2 × 2, 3 × 3, 4 × 4처럼 순서의 수를 두 번 곱한 수야. 다섯째는 5 × 5 = 25개야.",
"keys": [
"순서의 수를 두 번 곱한다",
"25개"
],
"answerBy": "claude"
},
{
"id": "ttymqi:t0L1",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:t0L2",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:t0H1",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:t0H2",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:qrecall",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "recall",
"round": 1,
"newQ": "1 + 2 = 3, 2 + 3 = 5, 3 + 4 = 7에서 규칙을 찾아 다음 식과 결과를 말해 봐.",
"newQBy": "claude",
"answer": "더하는 두 수가 1씩 커지고 합은 2씩 커져. 다음 식은 4 + 5 = 9야.",
"keys": [
"두 수가 1씩 커진다",
"4 + 5 = 9"
],
"answerBy": "claude"
},
{
"id": "ttymqi:qreason",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "reason",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:qexample",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"answer": "1 + 2 = 3, 3 + 4 = 7, 5 + 6 = 11처럼 만들 수 있어. 합은 4씩 커져.",
"keys": [
"두 수가 2씩 커진다",
"합은 4씩 커진다"
],
"answerBy": "claude"
},
{
"id": "ttymqi:qerror",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
},
{
"id": "ttymqi:qa29e4131",
"big": "6. 규칙 찾기",
"small": "03. 계산식의 배열에서 규칙 찾기",
"kind": "add",
"round": 2,
"by": "claude",
"q": "1 × 1 = 1, 11 × 11 = 121, 111 × 111 = 12321에서 규칙을 찾아 다음 식과 결과를 말해 봐.",
"answer": "1이 하나씩 늘어나고, 결과는 가운데를 중심으로 1부터 커졌다 작아지는 수야. 다음은 1111 × 1111 = 1234321이야.",
"keys": [
"1이 하나씩 늘어난다",
"1234321"
],
"answerBy": "claude"
},
{
"id": "ef717z:t0L1",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "low",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ef717z:t0L2",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "low",
"by": "claude",
"round": 1,
"newQ": "등호(=)는 무엇을 나타내는 기호야?",
"newQBy": "claude",
"answer": "등호 양쪽의 크기가 같다는 것을 나타내.",
"keys": [
"양쪽의 크기가 같다"
],
"answerBy": "claude"
},
{
"id": "ef717z:t0H1",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "high",
"by": "claude",
"off": true,
"offBy": "claude"
},
{
"id": "ef717z:t0H2",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "high",
"by": "claude",
"round": 2,
"newQ": "계산하지 않고 25 + 18 = 27 + 16이 옳은 식인지 어떻게 알아?",
"newQBy": "claude",
"answer": "25가 27로 2만큼 커졌고 18이 16으로 2만큼 작아졌어. 커진 만큼 작아졌으니 합이 같아서 옳은 식이야.",
"keys": [
"2만큼 커지고 2만큼 작아졌다",
"합이 같다"
],
"answerBy": "claude"
},
{
"id": "ef717z:qrecall",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "qset",
"by": "claude",
"type": "recall",
"off": true,
"offBy": "claude"
},
{
"id": "ef717z:qreason",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "qset",
"by": "claude",
"type": "reason",
"round": 1,
"newQ": "2 + 3 = 4 + 1이 맞는 식인지 어떻게 확인해?",
"newQBy": "claude",
"answer": "양쪽을 계산해 봐. 2 + 3 = 5, 4 + 1 = 5로 같으니까 맞는 식이야.",
"keys": [
"양쪽을 계산한다",
"둘 다 5"
],
"answerBy": "claude"
},
{
"id": "ef717z:qexample",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "qset",
"by": "claude",
"type": "example",
"round": 2,
"newQ": "등호(=)를 사용해서 2 + 3과 값이 같은 다른 덧셈식을 만들어 식으로 말해 봐.",
"newQBy": "claude",
"answer": "2 + 3 = 1 + 4처럼 나타낼 수 있어.",
"keys": [
"값이 5인 덧셈식",
"예: 2 + 3 = 1 + 4"
],
"answerBy": "claude"
},
{
"id": "ef717z:qcondition",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "qset",
"by": "claude",
"type": "condition",
"round": 2,
"newQ": "등호 양쪽의 식은 계산 방법이 달라도 돼? 예를 들어 말해 봐.",
"newQBy": "claude",
"answer": "돼. 양쪽의 값만 같으면 돼. 2 + 3 = 10 − 5처럼 덧셈과 뺄셈이어도 옳은 식이야.",
"keys": [
"값만 같으면 된다",
"예: 2 + 3 = 10 − 5"
],
"answerBy": "claude"
},
{
"id": "ef717z:qerror",
"big": "6. 규칙 찾기",
"small": "04. 등호(=)가 있는 식",
"kind": "qset",
"by": "claude",
"type": "error",
"off": true,
"offBy": "claude"
}
],
"seen": []
}});

/* [pre] 2026-09-29 🌱 선수 개념 질문 — 소단원 맨 앞(ord 0) · 1회차. 어른 화면 구분 표시는 review/pre_e4-1.js.
   원천 작업도구/질문계단/e4/make_pre_e41.py */
(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e4-1_pre_2026-09-29', data:{
"format": "qr-plan-2",
"grade": "e4-1",
"rounds": 3,
"items": [
{
"id": "37fe23:qapre0101",
"big": "1. 큰 수",
"small": "01. 1000이 10개인 수와 다섯 자리 수",
"kind": "add",
"q": "3572에서 5는 어느 자리 숫자이고 얼마를 나타내?",
"round": 1,
"ord": 0,
"answer": "백의 자리 숫자이고 500을 나타내.",
"keys": [
"백의 자리",
"500"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "3g8g8u:qapre0201",
"big": "2. 각도",
"small": "01. 각의 크기 비교하기 / 재기",
"kind": "add",
"q": "직각은 어떤 각이야?",
"round": 1,
"ord": 0,
"answer": "종이를 반듯하게 두 번 접었을 때 생기는 각처럼, 두 변이 수직으로 만나는 각이야. 90°야.",
"keys": [
"반듯하게 접어 생기는 각",
"90°"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "11pgko1:qapre0301",
"big": "3. 곱셈과 나눗셈",
"small": "01. (세 자리 수)×(몇십)",
"kind": "add",
"q": "163 × 2는 얼마야?",
"round": 1,
"ord": 0,
"answer": "100 × 2 + 60 × 2 + 3 × 2 = 326이야.",
"keys": [
"자리별로 곱해 더한다",
"326"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "vvhu9s:qapre0303",
"big": "3. 곱셈과 나눗셈",
"small": "03. 몇십으로 나누기",
"kind": "add",
"q": "38 ÷ 4의 몫과 나머지는 얼마야?",
"round": 1,
"ord": 0,
"answer": "4 × 9 = 36이라서 몫은 9, 나머지는 2야.",
"keys": [
"4 × 9 = 36",
"몫 9, 나머지 2"
],
"answerBy": "claude",
"by": "claude"
},
{
"id": "zixqgu:qapre0501",
"big": "5. 막대그래프",
"small": "01. 막대그래프 알아보기",
"kind": "add",
"q": "그림그래프는 어떤 그래프야?",
"round": 1,
"ord": 0,
"answer": "조사한 수량을 그림으로 나타낸 그래프야. 큰 그림과 작은 그림으로 수량을 나타내.",
"keys": [
"수량을 그림으로 나타낸다"
],
"answerBy": "claude",
"by": "claude"
}
],
"seen": []
}});
