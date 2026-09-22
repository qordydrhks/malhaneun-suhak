# 초5-2 1단원 마스터 검토(2026-09-22) 반영 + 같은 기준을 2~6단원에 적용 → review/plan_e5-2.js 에 새 key 로 덧붙인다
import json, io
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
B = json.load(open(ROOT + r'\작업도구\질문계단\e4\base_e5-2.json', encoding='utf-8'))
M = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22.json', encoding='utf-8'))
io.open(ROOT + r'\작업도구\질문고르기\질문고르기_e5-2_2026-09-22_마스터검토_1단원.json', 'w', encoding='utf-8').write(json.dumps(M, ensure_ascii=False, indent=1))
b = {i['id']: i for i in B['items']}
items = []
def base_rec(x):
    return {k: x[k] for k in ('id', 'big', 'small', 'kind', 'round', 'off') if k in x}

# ① 1단원: 마스터가 확인(ok)한 86개 전부 + 바뀐 것
ANS_NEW = {
 '4k34j1:qamubz76rrygr3': ("물건이 모자라면 안 될 때 올림을 생각해. 예를 들어 사과 23개를 10개씩 상자에 모두 담으려면 남는 3개도 담아야 하니까 상자가 3개 필요해.",
                           ["모자라면 안 되는 상황", "남는 것도 담아야 할 때(상자·버스 등)"]),
 'glvzvi:qamubzcaoqbm6v': ("모자란 묶음은 셀 수 없을 때 버림을 생각해. 예를 들어 사탕 47개를 10개씩 묶어 팔면 남는 7개는 한 묶음이 안 돼서 4묶음만 팔 수 있어.",
                           ["모자란 묶음은 셀 수 없는 상황", "묶어서 팔기·지폐로 바꾸기 같은 때"]),
}
for x in M['items']:
    if not x['big'].startswith('1.'):
        continue
    y = b.get(x['id'])
    r = base_rec(x)
    if x.get('ok'): r['ok'] = True
    if x['kind'] == 'add' and not y:
        r['q'] = x['q']; r['by'] = 'master'
        a, k = ANS_NEW[x['id']]; r['answer'] = a; r['keys'] = k; r['answerBy'] = 'claude'
        items.append(r); continue
    if y:
        cq, bq = x.get('newQ') or x['q'], y.get('newQ') or y['q']
        if cq != bq:
            r['newQ'] = cq
            if y.get('newQ'): r['qWas'] = y['newQ']
        if x['round'] != y['round']: r['rWas'] = y['round']
        if x['off'] != y['off']: r['offWas'] = y['off']
    items.append(r)

# ② 같은 기준을 2~6단원에: "왜 필요해 / 언제 써" 질문은 살린다 · 생활 속 예 질문(3회차)
def find(pred):
    got = [i for i in B['items'] if pred(i)]
    assert len(got) == 1, got
    return got[0]
g = find(lambda i: i['id'] == '1u6qpfn:t0L2')   # 5-03 겨냥도는 왜 그릴까?
items.append(dict(base_rec(g), off=False, offWas=True, newQ='② 겨냥도는 왜 그려?', by='claude'))
g = find(lambda i: i['id'] == '1kwi8f7:t0L1')   # 6-02 평균을 이용하면 어떤 점이 좋을까?
items.append(dict(base_rec(g), off=False, offWas=True, newQ='① 두 모둠의 기록을 비교할 때 평균을 이용하면 뭐가 좋아?', by='claude'))
items.append({'id': 'v61qpj:qamu22a01avg', 'big': '6. 평균과 가능성', 'small': '01. 평균 알아보기', 'kind': 'add', 'round': 3, 'off': False, 'by': 'claude',
              'q': '우리가 생활에서 어떤 때 평균을 쓰는지 예를 들어 봐.',
              'answer': '여러 번 잰 기록이 대체로 어느 정도인지 알고 싶을 때 평균을 써. 예를 들어 일주일 동안 읽은 쪽수의 평균을 구하면 하루에 보통 몇 쪽 읽는지 알 수 있어.',
              'keys': ['자료가 대체로 어느 정도인지 알고 싶을 때', '기록·점수·쪽수 같은 예'], 'answerBy': 'claude'})

plan = {'format': 'qr-plan-2', 'grade': 'e5-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [d] 2026-09-22 1단원 마스터 검토 반영(질문고르기_e5-2_2026-09-22_마스터검토_1단원.json) + 같은 기준을 2~6단원에:\n'
        '       "왜 필요해·언제 써" 질문 되살림(겨냥도·평균 비교) · 생활 속 예 질문 3회차(평균). offWas = 되살리기 */\n')
p = ROOT + r'\review\plan_e5-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
assert "e5-2_2026-09-22a" not in s
s = s.rstrip() + '\n' + head + "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-2_2026-09-22a', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n'
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('items', len(items), 'changed', sum(1 for r in items if any(k in r for k in ('newQ', 'rWas', 'offWas', 'q'))))
