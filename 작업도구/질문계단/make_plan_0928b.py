# -*- coding: utf-8 -*-
"""초6-2 4단원 마스터 검토(2026-09-28 두 번째 파일) 반영 → plan 끝에 key e6-2_2026-09-28b

마스터가 이번에 한 것 (질문고르기_e6-2_2026-09-28b_마스터검토.json, 28a 빈 기기와 비교)
  뺌 1     4-03 오류 찾기 "2 : 3과 4 : 6은 수가 서로 달라서 비례식이 아니다" (말도 안 되는 실수 — 16절 ①)
  되살림 2 4-02 "1.2 : 1.8을 간단한 자연수의 비로 나타내는 과정" (1회차) — 🤔 표시에 대한 답
           4-05 "세운 비례식에서 □의 값은 어떤 성질을 이용해 구할까?" (1회차, 괄호 힌트 지움)
  문장 2   4-05 "비례식으로 문제를 풀 때 먼저 어떻게 해?" → "비의 성질과 비례식의 성질을 설명해봐"
  계단 2칸 4-03 "외항과 내항은 어느 것이야?" → "외항과 내항은 어떤걸 기준으로 구분하지?"
           4-04 "외항의 곱과 내항의 곱은 어떤 관계야?" → "비례식보면 가장 먼저 생각해야 할 내용이 뭐지?"
           → 계단 칸은 채점 기준(ideas·teach)도 같이 바뀌어야 해서 원본 e6/ladder_E6_2_big4.json 을 고쳤다(ladder/data-e6-2.js).

이 블록이 하는 일
  ① 마스터 4단원 결정(뺌·되살림·문장·확인 표시)을 다른 기기에도
  ② 문장이 바뀌거나 되살린 4-05 두 질문에 모범 답 (reopen — 마스터가 답을 다시 보게)
  5·6단원: 같은 기준에 확실히 걸리는 것 없음 → 판단이 갈리는 1곳만 🤔(review/ask_e6-2.js)
"""
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-28_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-28b_마스터검토.json', encoding='utf-8'))
mbyid = {x['id']: x for x in M['items']}
key3 = {(x['big'].split('.')[0], x['small'].split('.')[0], x['id'].split(':', 1)[1]): x for x in BASE['items']}
def T(x): return x.get('newQ') or x.get('q') or ''

out, log = {}, []
def rec(x):
    if x['id'] not in out:
        out[x['id']] = {k: x[k] for k in ('id', 'big', 'small', 'kind') if k in x}
    return out[x['id']]

# ── ① 마스터 4단원 결정 ────────────────────────────────────────────
for a in BASE['items']:
    if not a['big'].startswith('4.'): continue
    m = mbyid.get(a['id'])
    assert m is not None, a['id']
    r, ch = rec(a), False
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:50]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True
    if a['kind'] != 'ladder' and T(m) != T(a):          # 계단 칸 문장은 원본 계단 파일에서 바꿨다
        r['newQ'] = T(m); r['qWas'] = T(a); ch = True
        log.append(('마스터 문장', T(m)[:50]))
    if m.get('ok'): r['ok'] = True; ch = True
    if not ch: out.pop(a['id'], None)

# ── ② 모범 답 — 문장이 바뀐 것 · 되살렸는데 답이 없는 것 ──────────────────
ANS = {
 ('4', '05', 't0L1'): (
   '비의 성질은 전항과 후항에 0이 아닌 같은 수를 곱하거나 나누어도 비율이 같다는 거야. '
   '비례식의 성질은 외항의 곱과 내항의 곱이 같다는 거야.',
   ['비의 성질: 0이 아닌 같은 수를 곱하거나 나누어도 비율이 같다',
    '비례식의 성질: 외항의 곱 = 내항의 곱']),
 ('4', '05', 't0L2'): (
   '외항의 곱과 내항의 곱이 같다는 비례식의 성질을 이용해. '
   '예를 들어 6 : 8 = 30 : □이면 6 × □ = 8 × 30이야. 비의 성질로 전항과 후항에 같은 수를 곱해 구해도 돼.',
   ['외항의 곱과 내항의 곱이 같다는 성질(또는 비의 성질)을 이용한다']),
}
for k, (ans, keys) in ANS.items():
    x = key3[k]; m = mbyid[x['id']]
    r = rec(x)
    r['answer'] = ans; r['keys'] = keys; r['answerBy'] = 'claude'
    r['ansWas'] = {'a': m.get('answer') or '', 'k': m.get('keys') or []}   # 마스터 기기에 있는 답(아무도 손 안 댐)
    r['reopen'] = True
    r.pop('ok', None)                                                         # 새 답이니 확인 표시는 붙이지 않는다
    log.append(('모범 답', T(m)[:50]))

items = list(out.values())
for r in items: r.setdefault('by', 'claude')
plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [0928b] 2026-09-28 초6-2 4단원 마스터 검토 반영 (make_plan_0928b.py).\n'
        '   계단 4-03·4-04 1칸 문장은 원본 e6/ladder_E6_2_big4.json 에서 바꿨다(채점 기준까지). */\n')
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0928b]' in s: s = s[:s.index('\n/* [0928b]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-28b', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('plan 항목 %d개' % len(items))
for l in log: print('  ', ' | '.join(l))
