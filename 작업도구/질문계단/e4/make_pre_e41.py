# -*- coding: utf-8 -*-
# 🌱 초4-1 선수 개념 질문 (2026-09-29) — make_pre.py 와 같은 모양. 기준표 15·18절.
# make_pre.py 를 다시 돌리면 다른 학년 pre 블록이 plan 파일 맨 끝으로 옮겨져 마스터 결정(뺌) 순서가 꼬이므로 초6-1만 따로 만든다.
# 만드는 것: ① review/plan_e4-1.js 끝에 key e4-1_pre_2026-09-29 블록 ② review/pre_e4-1.js (window.QR_PRE)
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
E = json.load(open(ROOT + r'\작업도구\회차\export\e4-1_blank.json', encoding='utf-8'))
km = {}
for x in E['items']:
    k = (x['big'].split('.')[0], x['small'].split('.')[0])
    km.setdefault(k, {'key': x['id'].split(':')[0], 'big': x['big'], 'small': x['small']})

# (대단원, 소단원, 배운 곳, 무엇, 질문, 모범 답, 꼭 말할 핵심)
SPEC = [
 ('1','01','초2','네 자리 수','3572에서 5는 어느 자리 숫자이고 얼마를 나타내?',
  '백의 자리 숫자이고 500을 나타내.', ['백의 자리','500']),
 ('2','01','초3-1','직각','직각은 어떤 각이야?',
  '종이를 반듯하게 두 번 접었을 때 생기는 각처럼, 두 변이 수직으로 만나는 각이야. 90°야.', ['반듯하게 접어 생기는 각','90°']),
 ('3','01','초3-2','(세 자리 수)×(한 자리 수)','163 × 2는 얼마야?',
  '100 × 2 + 60 × 2 + 3 × 2 = 326이야.', ['자리별로 곱해 더한다','326']),
 ('3','03','초3-2','나머지가 있는 나눗셈','38 ÷ 4의 몫과 나머지는 얼마야?',
  '4 × 9 = 36이라서 몫은 9, 나머지는 2야.', ['4 × 9 = 36','몫 9, 나머지 2']),
 ('5','01','초3-2','그림그래프','그림그래프는 어떤 그래프야?',
  '조사한 수량을 그림으로 나타낸 그래프야. 큰 그림과 작은 그림으로 수량을 나타내.', ['수량을 그림으로 나타낸다']),
]
items, pre = [], {}
for big, small, frm, what, q, a, keys in SPEC:
    x = km[(big, small)]
    qid = '%s:qapre%s%s' % (x['key'], big.zfill(2), small)
    items.append({'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'q': q, 'round': 1, 'ord': 0,
                  'answer': a, 'keys': keys, 'answerBy': 'claude', 'by': 'claude'})
    pre[qid] = {'from': frm, 'what': what}
plan = {'format': 'qr-plan-2', 'grade': 'e4-1', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [pre] 2026-09-29 🌱 선수 개념 질문 — 소단원 맨 앞(ord 0) · 1회차. 어른 화면 구분 표시는 review/pre_e4-1.js.\n'
        '   원천 작업도구/질문계단/e4/make_pre_e41.py */\n')
p = ROOT + r'\review\plan_e4-1.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [pre]' in s: s = s[:s.index('\n/* [pre]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e4-1_pre_2026-09-29', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
lines = ['/* 🌱 선수 개념 질문 표 — e4-1 (2026-09-29)', '   { 질문번호: {from:"배운 곳", what:"무엇"} }',
         '   질문 자체는 plan_e4-1.js 의 key e4-1_pre_2026-09-29 블록에 있다. */',
         'window.QR_PRE = window.QR_PRE || {};', '(function(m){ for(var k in m) window.QR_PRE[k] = m[k]; })({']
for i, (qid, v) in enumerate(pre.items()):
    lines.append('  %s: { from: %s, what: %s }%s' % (json.dumps(qid, ensure_ascii=False), json.dumps(v['from'], ensure_ascii=False),
                 json.dumps(v['what'], ensure_ascii=False), ',' if i < len(pre) - 1 else ''))
lines.append('});')
io.open(ROOT + r'\review\pre_e4-1.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')
print('e4-1 선수 개념 질문 %d개' % len(items))
