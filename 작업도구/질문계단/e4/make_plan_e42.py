# spec_e42.py → review/plan_e4-2.js (질문 고르기 분류안, 분류안 하나짜리 파일)
import json, io, os, sys
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
sys.path.insert(0, HERE)
from spec_e42 import S
E = json.load(io.open(os.path.join(ROOT, '작업도구', '회차', 'export', 'e4-2_blank.json'), encoding='utf-8'))
by_small = {}
for i in E['items']:
    if i['kind'] == 'ladder': continue
    key = (int(i['big'].split('.')[0]), int(i['small'].split('.')[0]))
    by_small.setdefault(key, {'big': i['big'], 'small': i['small'], 'items': {}})['items'][i['id'].split(':', 1)[1]] = i
items, miss, cnt = [], [], {1: 0, 2: 0, 3: 0, 'x': 0, 'add': 0}
for key, sm in sorted(by_small.items()):
    spec = S.get(key)
    assert spec, ('spec 없음', key, sm['small'])
    prefix = next(iter(sm['items'].values()))['id'].split(':')[0]
    for lid, it in sm['items'].items():
        if lid not in spec: miss.append((sm['small'], lid)); continue
        r, nq, a, k = spec[lid]
        rec = {'id': it['id'], 'big': sm['big'], 'small': sm['small'], 'kind': it['kind'], 'by': 'claude'}
        if it.get('type'): rec['type'] = it['type']
        if r == 'x':
            rec['off'] = True; rec['offBy'] = 'claude'; cnt['x'] += 1
        else:
            rec['round'] = r; cnt[r] += 1
            if nq and nq != it['q']: rec['newQ'] = nq; rec['newQBy'] = 'claude'
            rec['answer'] = a; rec['keys'] = k; rec['answerBy'] = 'claude'
        items.append(rec)
    for lid in spec:
        if lid.startswith('+'):
            r, q, a, k = spec[lid]
            rec = {'id': '%s:qa22e42%s%s' % (prefix, key[1], lid[1:]), 'big': sm['big'], 'small': sm['small'], 'kind': 'add',
                   'round': r, 'by': 'claude', 'q': q, 'answer': a, 'keys': k, 'answerBy': 'claude'}
            items.append(rec); cnt[r] += 1; cnt['add'] += 1
        elif lid not in sm['items']:
            miss.append(('spec에만', sm['small'], lid))
assert not miss, miss
plan = {'format': 'qr-plan-2', 'grade': 'e4-2', 'rounds': 3, 'items': items, 'seen': []}
body = ('/* 질문 고르기 — 기본으로 실어 두는 분류안 (초4-2)\n'
        '   Claude 분류(2026-09-22): 기준표_초등_질문.md 1~11절 · 초5 마스터 검토 기준 그대로. 원천 작업도구/질문계단/e4/spec_e42.py */\n'
        "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e4-2_2026-09-22a', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(os.path.join(ROOT, 'review', 'plan_e4-2.js'), 'w', encoding='utf-8', newline='').write(body)
print(cnt, 'items', len(items))
