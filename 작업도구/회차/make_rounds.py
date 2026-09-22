# -*- coding: utf-8 -*-
"""질문 고르기 결과 → 학생용 회차 데이터 (rounds/data-<학년>.js)   [⑨ 앱에 넣기]
   python make_rounds.py e5-1 <마스터 최신 내보내기.json>

 · 원천 ① 마스터가 [내보내기] 한 파일: 질문마다 원래 글(q)·종류·유형이 다 들어 있다
        ② review/plan_<학년>.js: 그 뒤 Claude 가 고친 것(모범 답·문장·회차)까지 들어 있는 최신 분류안 — 이쪽이 이긴다
 · 뺀 질문(off)은 안 넣는다. 계단은 칸 번호(기록 번호)를 지키려고 빼지 않고 ladderHide(숨김)·ladderText(고친 문장)로만 적는다.
 · 결과 모양: window.DD_ROUNDS[학년] = { "<학년>|<대단원>|<소단원>": {items:[{id,q,r,kind,type?,ans?,keys?}], ladderHide?, ladderText?} }
"""
import io, json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
grade, exp = sys.argv[1], sys.argv[2]
# [v87.5] --noplan : 빈 기기에서 [내보내기] 한 파일(분류안이 모두 합쳐진 상태)을 그대로 쓴다.
#   plan 파일에 분류안이 여러 개(push 여러 번) 있으면 아래 plan 읽기가 안 되므로 이 방법을 쓴다.
NOPLAN = '--noplan' in sys.argv

E = json.load(io.open(exp, encoding='utf-8'))
assert E['grade'] == grade, E['grade']
if NOPLAN:
    plan = {'items': []}
else:
    s = io.open(os.path.join(ROOT, 'review', 'plan_%s.js' % grade), encoding='utf-8').read()
    assert s.count('QR_BASE_PLANS') == 1, 'plan 파일에 분류안이 여러 개 — 빈 기기 내보내기 + --noplan 으로'
    plan = json.loads(s[s.index('data:') + 5:s.rindex('});')])
P = {x['id']: x for x in plan['items']}

out, order = {}, []
def small_of(key):
    if key not in out:
        out[key] = {'items': []}; order.append(key)
    return out[key]

seen_add = set()
# 원본 질문 앞의 ①② 번호는 뺀다 (학생 화면이 번호를 따로 매긴다). 기록은 번호(id)로 찾으므로 영향 없음.
clean = lambda q: re.sub(r'^\s*[①-⑳]\s*', '', q)
for i in E['items']:
    key = '%s|%s|%s' % (grade, i['big'], i['small'])
    sm = small_of(key)
    p = dict(P.get(i['id'], {}))
    if i['kind'] == 'ladder':
        idx = int(i['id'].rsplit(':', 1)[1]) - 1
        off = p.get('off', i.get('off'))
        if off: sm.setdefault('ladderHide', []).append(idx); continue
        nq = p.get('newQ') or i.get('newQ')
        if nq: sm.setdefault('ladderText', {})[str(idx)] = nq
        continue
    if i['kind'] == 'add': seen_add.add(i['id'])
    off = p['off'] if 'off' in p else i.get('off')
    if off: continue
    r = p.get('round') or i.get('round') or 0
    assert r in (1, 2, 3), ('미분류', i['id'])
    q = p.get('newQ') or i.get('newQ') or (p.get('q') if i['kind'] == 'add' else None) or i['q']
    o = {'id': i['id'], 'q': clean(q), 'r': r, 'kind': i['kind']}
    if i.get('type'): o['type'] = i['type']
    a = p.get('answer') if 'answer' in p else i.get('answer')
    k = p.get('keys') if 'keys' in p else i.get('keys')
    if a: o['ans'] = a
    if k: o['keys'] = k
    sm['items'].append(o)

# 내보내기 뒤에 Claude 가 새로 넣은 추가 질문
for x in plan['items']:
    if x.get('kind') != 'add' or x['id'] in seen_add or x.get('off'): continue
    key = '%s|%s|%s' % (grade, x['big'], x['small'])
    o = {'id': x['id'], 'q': clean(x.get('newQ') or x['q']), 'r': x['round'], 'kind': 'add'}
    if x.get('answer'): o['ans'] = x['answer']
    if x.get('keys'): o['keys'] = x['keys']
    small_of(key)['items'].append(o)

# [v86.3] 회차마다 문제 풀기 개수 (마스터 결정 2026-09-21)
#   그 회차 질문이 적으면(3개 이하) 2문제 · 4개 이상이면 3문제 · 활용 문장제가 3개 이상이면 4문제
#   3회차(종합)는 여기서 안 정한다 — 앱이 그 소단원 계단 칸 수(숨긴 칸 제외)만큼, 칸마다 한 문제 (rounds.js quizPlan)
#   활용 문장제 = 추가 질문 중 숫자가 든 문제 상황 ("네가 ~" 로 스스로 만드는 질문은 빼고)
def is_apply(o):
    return o['kind'] == 'add' and re.search(r'\d', o['q']) and not o['q'].startswith('네가')
quiz4 = []
for k in order:
    v = out[k]; qc = {}
    for r in (1, 2):
        its = [o for o in v['items'] if o['r'] == r]
        n = 2 if len(its) <= 3 else 3
        if sum(1 for o in its if is_apply(o)) >= 3: n = 4; quiz4.append('%d회차 %s' % (r, k.split('|')[2]))
        qc[str(r)] = n
    v['quiz'] = qc
print('4문제:', quiz4)

data = {k: out[k] for k in order}
n = sum(len(v['items']) for v in data.values())
by = {1: 0, 2: 0, 3: 0}
for v in data.values():
    for o in v['items']: by[o['r']] += 1
noans = sum(1 for v in data.values() for o in v['items'] if not o.get('ans'))
dst = os.path.join(ROOT, 'rounds', 'data-%s.js' % grade)
os.makedirs(os.path.dirname(dst), exist_ok=True)
io.open(dst, 'w', encoding='utf-8', newline='').write(
    '/* 회차 데이터 — 작업도구/회차/make_rounds.py 로 만든 파일. 직접 고치지 말 것. */\n'
    'window.DD_ROUNDS = window.DD_ROUNDS || {};\n'
    'window.DD_ROUNDS[%s] = %s;\n' % (json.dumps(grade), json.dumps(data, ensure_ascii=False)))
print('소단원', len(data), '· 질문', n, '· 회차', by, '· 모범 답 없음', noans,
      '· 계단 숨김', sum(len(v.get('ladderHide', [])) for v in data.values()),
      '· 계단 고친 문장', sum(len(v.get('ladderText', {})) for v in data.values()), '→', dst)
