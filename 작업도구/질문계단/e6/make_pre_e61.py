# -*- coding: utf-8 -*-
# 🌱 초6-1 선수 개념 질문 (2026-09-28) — make_pre.py 와 같은 모양. 기준표 15·18절.
# make_pre.py 를 다시 돌리면 다른 학년 pre 블록이 plan 파일 맨 끝으로 옮겨져 마스터 결정(뺌) 순서가 꼬이므로 초6-1만 따로 만든다.
# 만드는 것: ① review/plan_e6-1.js 끝에 key e6-1_pre_2026-09-28 블록 ② review/pre_e6-1.js (window.QR_PRE)
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
E = json.load(open(ROOT + r'\작업도구\회차\export\e6-1_blank.json', encoding='utf-8'))
km = {}
for x in E['items']:
    k = (x['big'].split('.')[0], x['small'].split('.')[0])
    km.setdefault(k, {'key': x['id'].split(':')[0], 'big': x['big'], 'small': x['small']})

# (대단원, 소단원, 배운 곳, 무엇, 질문, 모범 답, 꼭 말할 핵심)
SPEC = [
 ('1','01','초3','분수의 의미','3/4은 1을 똑같이 몇으로 나눈 것 중에 몇 개라는 뜻이야?',
  '1을 똑같이 4로 나눈 것 중에 3개라는 뜻이야.', ['똑같이 4로 나눈다','그중 3개']),
 ('1','02','초5-2','분수의 곱셈','2/3 × 1/4은 얼마야?',
  '분자끼리, 분모끼리 곱하면 2/12이고 약분하면 1/6이야.', ['분자끼리, 분모끼리 곱한다','1/6']),
 ('1','03','초4-2','대분수를 가분수로','2와 3/5을 가분수로 바꾸면 얼마야?',
  '자연수 2는 10/5이니까 10/5 + 3/5 = 13/5야.', ['자연수를 분수로 바꾼다','13/5']),
 ('2','01','초5-2','직육면체','직육면체는 어떤 도형이야? 면은 몇 개야?',
  '직사각형 6개로 둘러싸인 도형이야. 면은 6개야.', ['직사각형 6개로 둘러싸인 도형','면 6개']),
 ('3','01','초3-2','나눗셈 확인하기','38 ÷ 4의 몫과 나머지를 구하고, 맞는지 확인하는 식을 말해 봐.',
  '몫은 9, 나머지는 2야. 4 × 9 + 2 = 38이 되니까 맞아.', ['몫 9, 나머지 2','4 × 9 + 2 = 38']),
 ('3','05','초5-1','분수를 소수로','3/5을 소수로 나타내면 얼마야?',
  '3/5 = 6/10이니까 0.6이야.', ['6/10','0.6']),
 ('4','03','초5-1','약분','6/10을 기약분수로 나타내면 얼마야?',
  '6과 10의 최대공약수 2로 나누면 3/5야.', ['최대공약수로 나눈다','3/5']),
 ('4','05','초5-1','분모가 100인 분수','3/4을 분모가 100인 분수로 나타내면 얼마야?',
  '분모와 분자에 25를 곱하면 75/100이야.', ['분모와 분자에 같은 수를 곱한다','75/100']),
 ('5','01','초5-2','반올림','18758을 반올림하여 천의 자리까지 나타내면 얼마야?',
  '백의 자리 숫자가 7이라 올려서 19000이야.', ['바로 아래 자리(백의 자리)를 본다','19000']),
 ('5','02','초6-1 4단원','백분율','학생 20명 중 5명은 전체의 몇 %야?',
  '5/20 × 100 = 25이니까 25 %야.', ['5/20 × 100','25 %']),
]
items, pre = [], {}
for big, small, frm, what, q, a, keys in SPEC:
    x = km[(big, small)]
    qid = '%s:qapre%s%s' % (x['key'], big.zfill(2), small)
    items.append({'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'q': q, 'round': 1, 'ord': 0,
                  'answer': a, 'keys': keys, 'answerBy': 'claude', 'by': 'claude'})
    pre[qid] = {'from': frm, 'what': what}
plan = {'format': 'qr-plan-2', 'grade': 'e6-1', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [pre] 2026-09-28 🌱 선수 개념 질문 — 소단원 맨 앞(ord 0) · 1회차. 어른 화면 구분 표시는 review/pre_e6-1.js.\n'
        '   원천 작업도구/질문계단/e6/make_pre_e61.py */\n')
p = ROOT + r'\review\plan_e6-1.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [pre]' in s: s = s[:s.index('\n/* [pre]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-1_pre_2026-09-28', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
lines = ['/* 🌱 선수 개념 질문 표 — e6-1 (2026-09-28)', '   { 질문번호: {from:"배운 곳", what:"무엇"} }',
         '   질문 자체는 plan_e6-1.js 의 key e6-1_pre_2026-09-28 블록에 있다. */',
         'window.QR_PRE = window.QR_PRE || {};', '(function(m){ for(var k in m) window.QR_PRE[k] = m[k]; })({']
for i, (qid, v) in enumerate(pre.items()):
    lines.append('  %s: { from: %s, what: %s }%s' % (json.dumps(qid, ensure_ascii=False), json.dumps(v['from'], ensure_ascii=False),
                 json.dumps(v['what'], ensure_ascii=False), ',' if i < len(pre) - 1 else ''))
lines.append('});')
io.open(ROOT + r'\review\pre_e6-1.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')
print('e6-1 선수 개념 질문 %d개' % len(items))
