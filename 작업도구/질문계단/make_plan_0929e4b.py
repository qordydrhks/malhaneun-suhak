# -*- coding: utf-8 -*-
"""초4-2 4-07 「여러 가지 사각형」 1회차에 같은 질문이 두 번 나오던 것 (마스터 발견 9/29) → key e4-2_2026-09-29b

  원래 질문 t0L1 을 v87.5(spec_e42)에서 "직사각형과 정사각형은 각각 어떤 사각형이야?"로 고쳤는데,
  v88.7 선수 개념(make_pre.py)이 같은 소단원 맨 앞에 글자까지 같은 🌱 질문을 넣었다.
  → 🌱 쪽(초3 내용이라 어른 화면에 '작년 내용'으로 표시됨)을 남기고 t0L1 을 뺀다.
  ⚠️ make_plan_0929e4.py 를 다시 돌리면 그 뒤 블록이 잘린다 → 이 파일도 다시 돌릴 것.
  같이 만드는 것: 빈 기기 내보내기(29)에 이 뺌을 얹은 파일 → make_rounds 원천.
"""
import json, io, sys, copy
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
G, QID = 'e4-2', '1c2e69e:t0L1'

src = ROOT + r'\작업도구\회차\export\e4-2_2026-09-29_빈기기.json'
E = json.load(open(src, encoding='utf-8'))
x = next(i for i in E['items'] if i['id'] == QID)
assert not x['off'] and x['round'] == 1 and x['small'].startswith('07.'), x
pre = next(i for i in E['items'] if i['id'] == '1c2e69e:qapre0407')
assert pre['q'] == x['newQ'], '두 질문이 이제 다르다 — 뺄 필요 없음'

item = {'id': QID, 'big': x['big'], 'small': x['small'], 'kind': x['kind'], 'by': 'claude',
        'off': True, 'offWas': False, 'offBy': 'claude'}
plan = {'format': 'qr-plan-2', 'grade': G, 'rounds': 3, 'items': [item], 'seen': []}
head = '\n/* [0929e4b] 4-07 선수 개념과 글자까지 같은 t0L1 뺌 (make_plan_0929e4b.py) */\n'
p = ROOT + r'\review\plan_%s.js' % G
t = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0929e4b]' in t: t = t[:t.index('\n/* [0929e4b]')]
t = t.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'%s_2026-09-29b', data:" % G
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(t)

# 빈 기기에서 이 블록까지 넣고 내보낸 것과 같은 모양
E2 = copy.deepcopy(E)
for i in E2['items']:
    if i['id'] == QID:
        i['off'] = True; i['round'] = 0
        for k in ('answer', 'keys'): i.pop(k, None)
E2['exportedAt'] = '2026-09-29T(0929e4b 적용)'
out = ROOT + r'\작업도구\회차\export\e4-2_2026-09-29b_빈기기.json'
json.dump(E2, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('plan 블록 추가 · 뺌', x['newQ'], '→', out)
