# -*- coding: utf-8 -*-
"""초6-2 5단원 마스터 검토(2026-09-28 세 번째 파일) 반영 → plan 끝에 key e6-2_2026-09-28c

마스터가 이번에 한 것 (질문고르기_e6-2_2026-09-28c_마스터검토.json, 28b 빈 기기와 비교)
  추가 3  5-01 "원을 설명해봐" · "원이 나오면 가장 중요하게 생각해야 하는것은 뭐지?" (1회차)
          5-05 "잘 알지 못하는 모양의 둘레나 넓이를 구하는 방법" (2회차, 모범 답도 직접)
  뺌 4    5-01 원주율이 똑같다는 예 · 5-03 모눈 어림(🤔 적중) · 5-03 "왜 안 정사각형보다 크고 밖보다 작아?" ·
          5-04 오류 찾기 "지름으로 넓이"
  지움 1  5-04 선수 개념 "직사각형의 넓이"
  되살림 2 5-03 "원의 넓이를 어림하는 방법을 설명해봐"(2회차) · 5-03 오류 찾기 "안 정사각형 200이라 원도 200"(1회차, 🤔 적중)
  모범 답 2 5-02 두 질문 다 "지름 × 원주율 = 원주" (공식 하나에서 거꾸로 생각하게)
  계단 1칸 5-01 "원주는 지름의 몇 배쯤 될까? (정육각형·정사각형으로 말해 봐)" → 방법 부분 지움
           → 채점 기준은 원본 e6/ladder_E6_2_big5.json 에서 고쳤다(ladder/data-e6-2.js)

이 블록이 하는 일
  ① 마스터 5단원 결정(뺌·되살림·문장·추가·모범 답·확인)을 다른 기기에도
  ② 모범 답이 없는 마스터 추가 질문 2개 + 되살린 어림 질문에 모범 답 (reopen)
  ③ 6단원 적용: "무엇을 기준으로 구별해?"(17절 ①) 질문 1개 추가 — 원기둥·원뿔·구
"""
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-28b_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-28c_마스터검토.json', encoding='utf-8'))
byid = {x['id']: x for x in BASE['items']}
mbyid = {x['id']: x for x in M['items']}
key3 = {(x['big'].split('.')[0], x['small'].split('.')[0], x['id'].split(':', 1)[1]): x for x in BASE['items']}
def T(x): return x.get('newQ') or x.get('q') or ''
def A(x): return (x.get('answer') or '', list(x.get('keys') or []))

out, log = {}, []
def rec(x):
    if x['id'] not in out:
        out[x['id']] = {k: x[k] for k in ('id', 'big', 'small', 'kind') if k in x}
    return out[x['id']]

# ── ① 마스터 5단원 결정 ────────────────────────────────────────────
for a in BASE['items']:
    if not a['big'].startswith('5.'): continue
    m = mbyid.get(a['id'])
    if m is None:                                   # 마스터가 지운 질문 → 다른 기기에서는 뺌으로
        r = rec(a); r['off'] = True; r['offWas'] = bool(a['off'])
        log.append(('마스터 지움 → 뺌', T(a)[:50])); continue
    r, ch = rec(a), False
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:50]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True
    if a['kind'] != 'ladder' and T(m) != T(a):
        r['newQ'] = T(m); r['qWas'] = T(a); ch = True
        log.append(('마스터 문장', T(m)[:50]))
    if not m['off'] and A(m) != A(a) and A(m)[0]:
        r['answer'], r['keys'] = A(m); r['ansWas'] = {'a': A(a)[0], 'k': A(a)[1]}; ch = True
        log.append(('마스터 모범 답', T(m)[:40]))
    if m.get('ok'): r['ok'] = True; ch = True
    if not ch: out.pop(a['id'], None)

for m in M['items']:                                # 마스터가 새로 넣은 질문
    if not m['big'].startswith('5.') or m['id'] in byid: continue
    r = {'id': m['id'], 'big': m['big'], 'small': m['small'], 'kind': 'add', 'q': T(m), 'round': m['round']}
    if isinstance(m.get('ord'), int): r['ord'] = m['ord']
    if A(m)[0]: r['answer'], r['keys'] = A(m)
    if m.get('ok'): r['ok'] = True
    out[m['id']] = r
    log.append(('마스터 추가 r%s' % m['round'], T(m)[:50]))

# ── ② 모범 답 ─────────────────────────────────────────────────────
def by_q(small, text):
    xs = [m for m in M['items'] if m['big'].startswith('5.') and m['small'].startswith(small) and T(m) == text]
    assert len(xs) == 1, (small, text, len(xs)); return xs[0]
ANS = [
 (by_q('01', '원을 설명해봐'),
  '원의 중심에서 원 위의 어느 점까지나 거리가 똑같은 둥근 도형이야. 그 거리가 반지름이고, 지름은 반지름의 2배야.',
  ['중심에서 원 위의 모든 점까지 거리가 같다', '반지름과 지름(반지름의 2배)']),
 (by_q('01', '원이 나오면 가장 중요하게 생각해야 하는것은 뭐지?'),
  '반지름이야. 원은 중심에서 원 위의 모든 점까지 반지름으로 거리가 같고, 원주(지름 × 원주율)와 넓이(반지름 × 반지름 × 원주율)도 반지름으로 정해져. 그래서 반지름이나 지름을 먼저 찾아.',
  ['반지름(지름)을 먼저 찾는다', '원주와 넓이가 반지름으로 정해진다']),
 (by_q('03', '원의 넓이를 어림하는 방법을 설명해봐.'),
  '원 안에 꼭 맞는 정사각형의 넓이보다는 크고, 원 밖을 둘러싼 정사각형의 넓이보다는 작다고 어림해.',
  ['원 안의 정사각형 넓이보다 크다', '원 밖의 정사각형 넓이보다 작다']),
]
for m, ans, keys in ANS:
    r = out.get(m['id']) or rec(m)
    r['answer'] = ans; r['keys'] = keys; r['answerBy'] = 'claude'
    r['ansWas'] = {'a': A(m)[0], 'k': A(m)[1]}
    r['reopen'] = True; r.pop('ok', None)
    log.append(('모범 답', T(m)[:40]))

# ── ③ 6단원 — 구별하는 기준 (17절 ①) ─────────────────────────────────
x = key3[('6', '04', 't0L1')]
qid = x['id'].split(':')[0] + ':qa28c641'
assert qid not in byid
out[qid] = {'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add', 'round': 2, 'by': 'claude',
            'q': '원기둥, 원뿔, 구는 무엇을 기준으로 구별해?',
            'answer': '평평한 밑면이 2개이면 원기둥, 밑면이 1개이고 뾰족한 꼭짓점이 있으면 원뿔, 평평한 면 없이 모두 굽은 면이면 구야.',
            'keys': ['밑면(평평한 면)의 수', '뾰족한 꼭짓점이 있는지'], 'answerBy': 'claude'}
log.append(('추가 r2 (6-04)', out[qid]['q']))

items = list(out.values())
for r in items: r.setdefault('by', 'claude')
plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [0928c] 2026-09-28 초6-2 5단원 마스터 검토 반영 + 6단원 구별 기준 질문 (make_plan_0928c.py).\n'
        '   계단 5-01 2칸 문장은 원본 e6/ladder_E6_2_big5.json 에서 바꿨다(채점 기준까지). */\n')
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0928c]' in s: s = s[:s.index('\n/* [0928c]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-28c', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('plan 항목 %d개' % len(items))
for l in log: print('  ', ' | '.join(l))
