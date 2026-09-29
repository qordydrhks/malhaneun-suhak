# -*- coding: utf-8 -*-
"""초4-2 에 초6-2 검수에서 쌓인 기준(기준표 13~18절)을 다시 적용 → plan 끝에 key e4-2_2026-09-29a (1단원은 마스터 검수 끝 — 오류 찾기 문장 1개만)

  ① 대단원마다 「○○가 나오면 가장 먼저 생각할 것」(18절 ①) — 비슷한 질문이 이미 있는 단원은 건너뜀
  ② 오류 찾기 질문이 "어떻게 틀렸는지"를 미리 말하면 그 부분을 지운다(13절) — 모범 답도 새로(reopen)
  ③ 초5-2 뺌: 같은 실수를 두 번 묻는 오류 찾기(18절 ⑥) · 옆 질문이 정면으로 묻는 오류 찾기(13절)
  마스터가 직접 고친 문장·답은 qWas·ansWas 로 보호한다(그 기기 값이 지금 값과 같을 때만 바꿈).
"""
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'

SPEC = {
'e4-2': {
 'edit': [
  ('1', '01', 'qerror', '친구가 3/6 + 2/6를 5/12라고 했어. 어떻게 잘못 계산한 건지 찾고, 바른 답도 말해 봐.',
   '분모끼리도 더했어. 분모가 같으면 분모는 그대로 두고 분자끼리만 더해서 5/6이야.', ['분모는 그대로 둔다', '5/6']),
 ],
 'off': [
  ('2', '03', 'qerror', '13절 옆 t0L2(정삼각형의 한 각은 몇 도야?)가 정면으로 묻는다'),
  ('3', '01', 'qerror', '13절 옆 t0L3(1.27에서 각 자리 숫자는 얼마를 나타내?)가 정면으로 묻는다'),
  ('3', '02', 'qerror', '13절 옆 t0L2(4.219에서 숫자 9는 얼마를 나타내?)가 정면으로 묻는다'),
 ],
 'add': [
  ('1', '05', 1, '분모가 같은 분수의 덧셈이나 뺄셈이 나오면 가장 먼저 생각해야 할 것은 뭐야?',
   '분모는 그대로 두고 분자끼리 계산한다는 거야. 대분수면 자연수는 자연수끼리 계산하고, 분수 부분끼리 뺄 수 없으면 자연수에서 1을 받아내려.',
   ['분모는 그대로, 분자끼리 계산', '분수 부분끼리 뺄 수 없으면 받아내림']),
  ('5', '04', 1, '꺾은선그래프가 나오면 가장 먼저 살펴봐야 할 것은 뭐야?',
   '가로와 세로가 각각 무엇을 나타내는지와 세로 눈금 한 칸의 크기야. 그래야 점이 나타내는 값과 변화의 크기를 바르게 읽을 수 있어.',
   ['가로·세로가 나타내는 것', '세로 눈금 한 칸의 크기']),
  ('6', '02', 1, '다각형이 나오면 가장 먼저 무엇을 봐야 해?',
   '선분으로만 둘러싸였는지와 변의 수를 봐. 변의 수로 이름을 정하고, 변의 길이와 각의 크기가 모두 같으면 정다각형이야.',
   ['선분으로만 둘러싸였는지', '변의 수로 이름을 정한다']),
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
        qid = '%s:qa29f%s%s%d' % (x['id'].split(':')[0], b, s, n)
        assert qid not in {i['id'] for i in E['items']}
        items.append({'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'by': 'claude',
                      'q': q, 'round': rnd, 'answer': a, 'keys': k, 'answerBy': 'claude'})
        log.append(('추가 r%d' % rnd, q[:50]))
    plan = {'format': 'qr-plan-2', 'grade': g, 'rounds': 3, 'items': items, 'seen': []}
    head = ('\n/* [0929e4] 2026-09-28 5·6학년 검수 기준(기준표 13~19절)을 %s 2~6단원에 적용 (make_plan_0929e4.py) */\n' % g)
    p = ROOT + r'\review\plan_%s.js' % g
    t = io.open(p, encoding='utf-8', newline='').read()
    if '\n/* [0929e4]' in t: t = t[:t.index('\n/* [0929e4]')]
    t = t.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'%s_2026-09-29a', data:" % g
        + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
    io.open(p, 'w', encoding='utf-8', newline='').write(t)
    print(g, '항목', len(items))
    for l in log: print('  ', ' | '.join(l))
