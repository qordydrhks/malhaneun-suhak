# 초5-2 3단원 마스터 검토(2026-09-22 (2)) 반영 + 같은 기준을 4~6단원에 → review/plan_e5-2.js 에 key e5-2_2026-09-22c
import json, io
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
O = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22 (1).json', encoding='utf-8'))
M = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22 (2).json', encoding='utf-8'))
io.open(ROOT + r'\작업도구\질문고르기\질문고르기_e5-2_2026-09-22_마스터검토3_3단원.json', 'w', encoding='utf-8').write(json.dumps(M, ensure_ascii=False, indent=1))
o = {i['id']: i for i in O['items']}
cur = lambda i: i.get('newQ') or i['q']
def rec(x): return {k: x[k] for k in ('id', 'big', 'small', 'kind', 'round', 'off') if k in x}

DRAW_SYM = "대칭축을 긋고, 각 꼭짓점에서 대칭축에 수직인 선을 그어. 대칭축까지의 거리와 같은 거리만큼 반대쪽으로 가서 대응점을 찍고, 대응점들을 차례로 이으면 선대칭도형이 돼."
ANS = {   # 마스터가 새로 쓴 질문 · 핵심만 적은 질문의 모범 답 (마스터가 적은 핵심은 그대로 둔다)
 '192l4g2:qamuc1uabzfq0w': ("합동인 두 도형이 나오면 먼저 모양과 크기가 똑같다는 걸 떠올려. 그래서 대응변의 길이가 서로 같고 대응각의 크기가 서로 같으니까, 이걸로 모르는 변의 길이나 각의 크기를 구해.", None),
 '13ncog2:qreason': (DRAW_SYM, None),
 '13ncog2:qamuc1wbr9f6di': (DRAW_SYM, ["각 꼭짓점에서 대칭축에 수직인 선을 긋는다", "대칭축까지와 같은 거리만큼 반대쪽에 대응점을 찍고 잇는다"]),
 '1isaku1:qamuc2aejvneff': ("각 꼭짓점에서 대칭의 중심을 지나는 선을 긋고, 중심까지의 길이와 같은 길이만큼 더 가서 대응점을 찍어. 대응점들을 차례로 이으면 점대칭도형이 돼.", None),
}
items = []
for x in M['items']:
    if not x['big'].startswith('3.'): continue
    y = o.get(x['id'])
    r = rec(x)
    if x.get('ok'): r['ok'] = True
    if not y:                       # 마스터가 새로 넣은 추가 질문
        r['q'] = x['q']; r['by'] = 'master'
    else:
        if cur(x) != cur(y):
            if x['kind'] == 'add': r['q'] = x['q']; r['qWas'] = y['q']
            else:
                r['newQ'] = cur(x)
                if y.get('newQ'): r['qWas'] = y['newQ']
        if x['round'] != y['round']: r['rWas'] = y['round']
        if x['off'] != y['off']: r['offWas'] = y['off']
    if x['id'] in ANS:
        a, k = ANS[x['id']]
        r['answer'] = a; r['keys'] = k or x.get('keys') or []; r['answerBy'] = 'claude'
        r['ansWas'] = {'a': x.get('answer') or '', 'k': x.get('keys') or []}   # 마스터 기기 상태
        if y and ((y.get('answer') or '') != (x.get('answer') or '') or (y.get('keys') or []) != (x.get('keys') or [])):
            items.append(dict(r, ansWas={'a': y.get('answer') or '', 'k': y.get('keys') or []}))   # 새 기기 상태(분류안 그대로)
    elif not y and (x.get('answer') or x.get('keys')):
        r['answer'] = x.get('answer') or ''; r['keys'] = x.get('keys') or []
    items.append(r)

# 4~6단원에 같은 기준: "문제에서 ○○이 나오면 먼저 떠올릴 것"(3회차) · 도형을 그리는 방법(2회차)
def add(id_, big, small, rnd, q, a, k):
    items.append({'id': id_, 'big': big, 'small': small, 'kind': 'add', 'round': rnd, 'off': False, 'by': 'claude',
                  'q': q, 'answer': a, 'keys': k, 'answerBy': 'claude'})
add('kxb2zb:qamu22c01net', '5. 직육면체', '04. 정(직)육면체의 전개도', 2,
    '직육면체의 전개도를 그리는 방법을 얘기해 줘.',
    '면 6개를 이어 그리는데, 접었을 때 마주 보는 면은 서로 합동이 되게, 맞닿는 모서리는 길이가 같게 그려. 잘린 모서리는 실선, 잘리지 않은 모서리는 점선으로 그려.',
    ['마주 보는 면은 합동, 맞닿는 모서리는 같은 길이', '잘린 모서리는 실선, 잘리지 않은 모서리는 점선'])
add('kxb2zb:qamu22c02net', '5. 직육면체', '04. 정(직)육면체의 전개도', 3,
    '문제에서 직육면체의 전개도를 본다면 가장 먼저 생각해야 하는 두 가지는 뭐야?',
    '접었을 때 서로 마주 보는 면은 3쌍이고, 마주 보는 두 면은 합동이야. 그리고 접었을 때 맞닿는 모서리는 길이가 같아. 이걸로 모르는 모서리 길이나 마주 보는 면을 찾아.',
    ['마주 보는 면 3쌍은 서로 합동', '맞닿는 모서리의 길이는 같다'])
add('1kwi8f7:qamu22c03avg', '6. 평균과 가능성', '02. 평균 이용하기', 3,
    '문제에서 평균이 주어진다면 가장 먼저 생각해야 하는 것은 뭐야?',
    '평균에 자료의 수를 곱하면 자료 값을 모두 더한 합이 된다는 거야. 그래서 합을 구한 다음 아는 값을 빼면 모르는 자료 값을 구할 수 있어.',
    ['평균 × 자료의 수 = 자료 값의 합', '합에서 아는 값을 빼면 모르는 값'])

plan = {'format': 'qr-plan-2', 'grade': 'e5-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [f] 2026-09-22 3단원 마스터 검토 반영(질문고르기_e5-2_2026-09-22_마스터검토3_3단원.json) + 같은 기준을 4~6단원에:\n'
        '       도형 그리는 방법(2회차: 전개도) · "문제에서 ○○을 보면 먼저 떠올릴 것"(3회차: 전개도·평균) */\n')
p = ROOT + r'\review\plan_e5-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
assert "e5-2_2026-09-22c" not in s
s = s.rstrip() + '\n' + head + "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e5-2_2026-09-22c', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n'
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('items', len(items), [(r['id'][-14:], [k for k in ('newQ', 'q', 'qWas', 'offWas', 'rWas', 'answer') if k in r]) for r in items if any(k in r for k in ('newQ', 'q', 'qWas', 'offWas', 'rWas', 'answer'))])
