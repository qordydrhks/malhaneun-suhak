# -*- coding: utf-8 -*-
# 🌱 초3-1 선수 개념 질문 (2026-09-29) — make_pre.py 와 같은 모양. 기준표 15·18절.
# make_pre.py 를 다시 돌리면 다른 학년 pre 블록이 plan 파일 맨 끝으로 옮겨져 마스터 결정(뺌) 순서가 꼬이므로 초3-1만 따로 만든다.
# 만드는 것: ① review/plan_e3-1.js 끝에 key e3-1_pre_2026-09-29 블록 ② review/pre_e3-1.js (window.QR_PRE)
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
E = json.load(open(ROOT + r'\작업도구\회차\export\e3-1_blank.json', encoding='utf-8'))
km = {}
for x in E['items']:
    k = (x['big'].split('.')[0], x['small'].split('.')[0])
    km.setdefault(k, {'key': x['id'].split(':')[0], 'big': x['big'], 'small': x['small']})

# (대단원, 소단원, 배운 곳, 무엇, 질문, 모범 답, 꼭 말할 핵심)
SPEC = [
 ('1','01','초2-1','세 자리 수','352에서 5는 어느 자리 숫자이고 얼마를 나타내?',
  '십의 자리 숫자이고 50을 나타내.', ['십의 자리','50']),
 ('3','01','초2-2','곱셈구구','6 × 4는 얼마야? 6을 몇 번 더한 것과 같아?',
  '24야. 6을 4번 더한 것과 같아.', ['24','6을 4번 더한 것']),
 ('4','01','초2-1','곱셈의 뜻','5 × 3은 어떤 덧셈과 같아?',
  '5를 3번 더한 5 + 5 + 5와 같아서 15야.', ['5 + 5 + 5','15']),
 ('5','01','초2-2','길이의 단위(cm·m)','1 m는 몇 cm야?',
  '1 m는 100 cm야.', ['100 cm']),
 ('5','04','초2-2','시각과 시간','1시간은 몇 분이야?',
  '1시간은 60분이야.', ['60분']),
]
items, pre = [], {}
for big, small, frm, what, q, a, keys in SPEC:
    x = km[(big, small)]
    qid = '%s:qapre%s%s' % (x['key'], big.zfill(2), small)
    items.append({'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'q': q, 'round': 1, 'ord': 0,
                  'answer': a, 'keys': keys, 'answerBy': 'claude', 'by': 'claude'})
    pre[qid] = {'from': frm, 'what': what}
plan = {'format': 'qr-plan-2', 'grade': 'e3-1', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [pre] 2026-09-29 🌱 선수 개념 질문 — 소단원 맨 앞(ord 0) · 1회차. 어른 화면 구분 표시는 review/pre_e3-1.js.\n'
        '   원천 작업도구/질문계단/e3/make_pre_e31.py */\n')
p = ROOT + r'\review\plan_e3-1.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [pre]' in s: s = s[:s.index('\n/* [pre]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e3-1_pre_2026-09-29', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
lines = ['/* 🌱 선수 개념 질문 표 — e3-1 (2026-09-29)', '   { 질문번호: {from:"배운 곳", what:"무엇"} }',
         '   질문 자체는 plan_e3-1.js 의 key e3-1_pre_2026-09-29 블록에 있다. */',
         'window.QR_PRE = window.QR_PRE || {};', '(function(m){ for(var k in m) window.QR_PRE[k] = m[k]; })({']
for i, (qid, v) in enumerate(pre.items()):
    lines.append('  %s: { from: %s, what: %s }%s' % (json.dumps(qid, ensure_ascii=False), json.dumps(v['from'], ensure_ascii=False),
                 json.dumps(v['what'], ensure_ascii=False), ',' if i < len(pre) - 1 else ''))
lines.append('});')
io.open(ROOT + r'\review\pre_e3-1.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')
print('e3-1 선수 개념 질문 %d개' % len(items))
