# -*- coding: utf-8 -*-
"""초5-1 · 초5-2 에 초6-2 검수에서 쌓인 기준(기준표 13~18절)을 다시 적용 → 각 plan 끝에 key <학년>_2026-09-28a

  ① 대단원마다 「○○가 나오면 가장 먼저 생각할 것」(18절 ①) — 비슷한 질문이 이미 있는 단원은 건너뜀
  ② 오류 찾기 질문이 "어떻게 틀렸는지"를 미리 말하면 그 부분을 지운다(13절) — 모범 답도 새로(reopen)
  ③ 초5-2 뺌: 같은 실수를 두 번 묻는 오류 찾기(18절 ⑥) · 옆 질문이 정면으로 묻는 오류 찾기(13절)
  마스터가 직접 고친 문장·답은 qWas·ansWas 로 보호한다(그 기기 값이 지금 값과 같을 때만 바꿈).
"""
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'

SPEC = {
'e5-1': {
 'edit': [
  ('1', '03', 'qerror', '친구가 (3+2)×4-6÷2를 계산해서 8이라고 했어. 어떻게 잘못 계산한 건지 찾고, 바른 답도 말해 봐.',
   '괄호 안을 먼저 계산하지 않았어. (3+2)×4-6÷2 = 5×4-3 = 17이야.', ['괄호를 먼저 계산해야 한다', '17']),
  ('4', '03', 'qerror', '친구가 1/2과 1/3을 통분해서 1/6과 1/6이라고 했어. 뭐가 잘못됐는지 찾고, 바르게 통분해 봐.',
   '분모만 6으로 바꾸고 분자에는 같은 수를 곱하지 않았어. 1/2은 3/6, 1/3은 2/6이야.', ['분자에도 같은 수를 곱한다', '3/6과 2/6']),
  ('6', '05', 'qerror', '밑변이 8 cm이고 옆으로 비스듬한 변의 길이가 6 cm, 수직 높이가 5 cm인 평행사변형에서 친구가 넓이를 8×6=48 cm²라고 했어. 뭐가 잘못됐을까?',
   '비스듬한 변을 높이로 썼어. 높이는 밑변에 수직인 길이 5 cm라서 넓이는 8×5=40 cm²야.', ['높이는 밑변에 수직인 길이', '8×5=40 cm²']),
 ],
 'off': [],
 'add': [
  ('1', '03', 1, '여러 가지 연산이 섞인 식이 나오면 가장 먼저 생각해야 할 것은 뭐야?',
   '계산 순서야. 괄호 안을 가장 먼저, 그다음 곱셈과 나눗셈, 마지막에 덧셈과 뺄셈을 앞에서부터 계산해.',
   ['괄호 → 곱셈·나눗셈 → 덧셈·뺄셈', '같은 단계는 앞에서부터']),
  ('3', '02', 1, '대응 관계 문제가 나오면 가장 먼저 무엇을 해야 해?',
   '두 양이 무엇인지 정하고 표로 늘어놓아서, 한 양이 변할 때 다른 양이 어떻게 변하는지 규칙을 찾아. 그 규칙을 ○, △로 식으로 나타내.',
   ['두 양을 표로 나타낸다', '규칙을 찾아 식으로 나타낸다']),
 ],
},
'e5-2': {
 'edit': [
  ('2', '01', 'qerror', '친구가 2/7 × 4를 8/28이라고 했어. 어떻게 잘못 계산한 건지 찾고, 바른 답도 말해 봐.',
   '분모에도 4를 곱했어. 자연수는 분자에만 곱해서 8/7 = 1과 1/7이야.', ['분자에만 곱한다', '8/7 = 1과 1/7']),
  ('2', '03', 'qerror', '친구가 3/4 × 2/5를 통분해서 계산했더니 23/20이 나왔어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.',
   '통분해서 더해 버렸어. 분수의 곱셈은 분자끼리, 분모끼리 곱해서 6/20 = 3/10이야.', ['분자끼리, 분모끼리 곱한다', '3/10']),
  ('2', '04', 'qerror', '친구가 1과 1/2 × 2와 1/3을 2와 1/6이라고 했어. 어떻게 잘못 계산한 건지 찾고, 바른 답도 말해 봐.',
   '자연수끼리, 분수끼리 따로 곱해서 더했어. 가분수로 바꾸면 3/2 × 7/3 = 7/2 = 3과 1/2이야.', ['대분수를 가분수로 바꿔 곱한다', '3과 1/2']),
  ('4', '03', 'qerror', '친구가 5 × 0.8을 40이라고 했어. 뭐가 잘못됐는지 찾고, 바른 답도 말해 봐.',
   '소수점을 빠뜨렸어. 5 × 8 = 40이고 0.8은 8의 1/10이라서 답은 4야.', ['0.8은 8의 1/10', '4']),
 ],
 'off': [
  ('2', '02', 'qerror', '18절 ⑥ 같은 실수(분모에 곱하기)를 2-01 오류 찾기가 이미 묻는다'),
  ('4', '04', 'qerror', '13절 옆 t0L2(2 × 139 = 278을 이용해 2 × 1.39)가 정면으로 묻는다'),
  ('4', '05', 'qerror', '13절 옆 t0L2(소수점 아래 자리 수가 어떻게 정해져?)가 정면으로 묻는다'),
  ('4', '07', 'qerror', '13절 옆 t0L1(10, 100, 1000을 곱하면 소수점이 어떻게 움직여?)이 정면으로 묻는다'),
 ],
 'add': [
  ('1', '03', 1, '수의 범위 문제가 나오면 가장 먼저 생각해야 할 것은 뭐야?',
   '경계에 있는 수가 들어가는지야. 이상·이하는 그 수가 들어가고, 초과·미만은 그 수가 들어가지 않아.',
   ['경계의 수가 들어가는지', '이상·이하는 포함, 초과·미만은 포함하지 않는다']),
  ('4', '06', 1, '소수의 곱셈이 나오면 가장 먼저 생각해야 할 것은 뭐야?',
   '소수점을 어디에 찍는지야. 자연수처럼 곱한 뒤 곱하는 두 수의 소수점 아래 자리 수를 더한 만큼 소수점을 찍고, 어림해서 확인해.',
   ['자연수처럼 곱한다', '소수점 아래 자리 수의 합만큼 소수점을 찍는다']),
 ],
},
}

for g, sp in SPEC.items():
    E = json.load(open(ROOT + r'\작업도구\회차\export\%s_2026-09-23pre_빈기기.json' % g, encoding='utf-8'))
    key3 = {(x['big'].split('.')[0], x['small'].split('.')[0], x['id'].split(':', 1)[1]): x for x in E['items']}
    first = {}
    for x in E['items']:
        if x['kind'] in ('low', 'high', 'qset'):
            first.setdefault((x['big'].split('.')[0], x['small'].split('.')[0]), x)
    def T(x): return x.get('newQ') or x.get('q') or ''
    items, log = [], []
    for b, s, lid, q, a, k in sp['edit']:
        x = key3[(b, s, lid)]; assert not x['off'], (g, b, s, lid)
        items.append({'id': x['id'], 'big': x['big'], 'small': x['small'], 'kind': x['kind'], 'by': 'claude',
                      'newQ': q, 'qWas': T(x), 'newQBy': 'claude',
                      'answer': a, 'keys': k, 'answerBy': 'claude',
                      'ansWas': {'a': x.get('answer') or '', 'k': x.get('keys') or []}, 'reopen': True})
        log.append(('문장', q[:50]))
    for b, s, lid, why in sp['off']:
        x = key3[(b, s, lid)]; assert not x['off'], (g, b, s, lid)
        items.append({'id': x['id'], 'big': x['big'], 'small': x['small'], 'kind': x['kind'], 'by': 'claude',
                      'off': True, 'offWas': False, 'offBy': 'claude'})
        log.append(('뺌', T(x)[:50]))
    for n, (b, s, rnd, q, a, k) in enumerate(sp['add'], 1):
        x = first[(b, s)]
        qid = '%s:qa28f%s%s%d' % (x['id'].split(':')[0], b, s, n)
        assert qid not in {i['id'] for i in E['items']}
        items.append({'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'by': 'claude',
                      'q': q, 'round': rnd, 'answer': a, 'keys': k, 'answerBy': 'claude'})
        log.append(('추가 r%d' % rnd, q[:50]))
    plan = {'format': 'qr-plan-2', 'grade': g, 'rounds': 3, 'items': items, 'seen': []}
    head = ('\n/* [0928e5] 2026-09-28 초6-2 검수 기준(기준표 13~18절)을 %s 에 다시 적용 (make_plan_0928e5.py) */\n' % g)
    p = ROOT + r'\review\plan_%s.js' % g
    t = io.open(p, encoding='utf-8', newline='').read()
    if '\n/* [0928e5]' in t: t = t[:t.index('\n/* [0928e5]')]
    t = t.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'%s_2026-09-28a', data:" % g
        + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
    io.open(p, 'w', encoding='utf-8', newline='').write(t)
    print(g, '항목', len(items))
    for l in log: print('  ', ' | '.join(l))
