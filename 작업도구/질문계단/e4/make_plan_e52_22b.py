# 초5-2 2단원 마스터 검토(2026-09-22 (1)) 반영 + 같은 기준을 3~6단원에 → review/plan_e5-2.js 에 key e5-2_2026-09-22b
import json, io
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
O = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22.json', encoding='utf-8'))
M = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22 (1).json', encoding='utf-8'))
io.open(ROOT + r'\작업도구\질문고르기\질문고르기_e5-2_2026-09-22_마스터검토2_2단원.json', 'w', encoding='utf-8').write(json.dumps(M, ensure_ascii=False, indent=1))
o = {i['id']: i for i in O['items']}
cur = lambda i: i.get('newQ') or i['q']
def rec(x): return {k: x[k] for k in ('id', 'big', 'small', 'kind', 'round', 'off') if k in x}

NEWANS = {
 '1rbp9gq:t0H1': ("방법 1은 대분수를 가분수로 바꿔서 곱하는 거야. 3/2 × 7/3 = 21/6 = 3과 1/2이야. 방법 2는 1과 1/2을 자연수 1과 분수 1/2로 나눠서 1 × 2와 1/3 = 2와 1/3, 1/2 × 2와 1/3 = 7/6 을 구해 더하는 거야. 2와 1/3 + 1과 1/6 = 3과 1/2로 답이 같아.",
                  ["가분수로 바꿔서 곱한다", "대분수를 자연수와 분수로 나눠 각각 곱해서 더한다"]),
 '1rbp9gq:qamu9e52be2mvvk': ("밭의 넓이는 1과 2/5 × 1과 2/5 = 7/5 × 7/5 = 49/25 m²야. 오이를 심고 남은 밭은 1 − 1/4 = 3/4이고, 그중 2/3에 호박을 심었으니 남은 땅은 49/25 × 3/4 × 1/3 = 49/100 m²야.",
                             ["밭의 넓이 7/5 × 7/5 = 49/25", "남은 비율 3/4 × 1/3", "49/100 m²"]),
}
items = []
for x in M['items']:
    if not x['big'].startswith('2.'): continue
    y = o[x['id']]
    r = rec(x)
    if x.get('ok'): r['ok'] = True
    if cur(x) != cur(y):
        if x['kind'] == 'add':
            r['q'] = x['q']; r['qWas'] = y['q']
        else:
            r['newQ'] = cur(x)
            if y.get('newQ'): r['qWas'] = y['newQ']
    if x['round'] != y['round']: r['rWas'] = y['round']
    if x['off'] != y['off']: r['offWas'] = y['off']
    if x['id'] in NEWANS:
        a, k = NEWANS[x['id']]
        r['answer'] = a; r['keys'] = k; r['answerBy'] = 'claude'
        r['ansWas'] = {'a': y.get('answer') or '', 'k': y.get('keys') or []}
    items.append(r)

# 3~6단원에 같은 기준: 곱이 커지는지 작아지는지 이유를 묻는 질문은 살린다 · 마지막 계산 소단원의 활용 문장제는 여러 단계로
m = {i['id']: i for i in M['items']}
x = m['yc1vsn:qreason']   # 4-05 0.4×0.6의 값은 0.4보다 클까, 작을까?
items.append(dict(rec(x), off=False, offWas=True, newQ='0.4 × 0.6 의 값은 0.4보다 커, 작아? 왜 그런지 말해 봐.', by='claude'))
x = m['ladder:qamu9e52dex2epi']   # 4-06 철근 활용 (추가 질문)
items.append(dict(rec(x), q='1 m의 무게가 2.4 kg인 철근 1.5 m 중에서 0.7 m를 잘라 썼어. 남은 철근의 무게는 몇 kg이야? 식과 답을 말해 봐.', qWas=x['q'], by='claude',
                  answer='남은 길이는 1.5 − 0.7 = 0.8 m야. 2.4 × 0.8 = 1.92니까 남은 철근은 1.92 kg이야.', keys=['1.5 − 0.7 = 0.8', '2.4 × 0.8 = 1.92 kg'], answerBy='claude',
                  ansWas={'a': x.get('answer') or '', 'k': x.get('keys') or []}))

plan = {'format': 'qr-plan-2', 'grade': 'e5-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [e] 2026-09-22 2단원 마스터 검토 반영(질문고르기_e5-2_2026-09-22_마스터검토2_2단원.json) + 같은 기준을 3~6단원에:\n'
        '       곱이 커지나 작아지나 이유 질문 되살림(4-05) · 마지막 계산 소단원 활용 문장제를 여러 단계로(4-06 철근) */\n')
p = ROOT + r'\review\plan_e5-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
assert "e5-2_2026-09-22b" not in s
s = s.rstrip() + '\n' + head + "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-2_2026-09-22b', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n'
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('items', len(items), [ (r['id'], [k for k in ('newQ','q','qWas','offWas','rWas','answer') if k in r]) for r in items if any(k in r for k in ('newQ','qWas','offWas','rWas','answer'))])
