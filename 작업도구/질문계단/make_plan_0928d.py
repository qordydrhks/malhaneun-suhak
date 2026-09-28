# -*- coding: utf-8 -*-
"""초6-2 6단원 마스터 검토(2026-09-28 네 번째 파일) 반영 → plan 끝에 key e6-2_2026-09-28d  — 초6-2 검수 끝

마스터가 이번에 한 것 (질문고르기_e6-2_2026-09-28d_마스터검토.json, 28c 빈 기기와 비교)
  뺌 1   6-04 "구는 어느 방향에서 보아도 모양이 원인 이유" (옆에 새로 넣은 "원기둥, 원뿔, 구는 무엇을 기준으로 구별해?"가 대신한다)
  🤔 2개는 그대로 두심 — 「원기둥의 전개도가 나오면 먼저 생각할 것」 안 넣음 · 「두 밑면은 왜 같아야 해?」 안 살림
이 블록: 마스터 결정(뺌·되살림·문장·모범 답·확인 표시)을 학년 전체에서 다른 기기에도 넣는다.
"""
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-28c_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-28d_마스터검토.json', encoding='utf-8'))
mbyid = {x['id']: x for x in M['items']}
def T(x): return x.get('newQ') or x.get('q') or ''
def A(x): return (x.get('answer') or '', list(x.get('keys') or []))
out, log = {}, []
for a in BASE['items']:
    m = mbyid.get(a['id'])
    if m is None: continue                     # 이미 지운 것(3-04·5-04)은 앞 블록에서 뺌 처리됨
    r = {k: a[k] for k in ('id', 'big', 'small', 'kind') if k in a}; ch = False
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:50]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True; log.append(('회차', T(m)[:50]))
    if a['kind'] != 'ladder' and T(m) != T(a):
        r['newQ'] = T(m); r['qWas'] = T(a); ch = True; log.append(('문장', T(m)[:50]))
    if not m['off'] and A(m) != A(a) and A(m)[0]:
        r['answer'], r['keys'] = A(m); r['ansWas'] = {'a': A(a)[0], 'k': A(a)[1]}; ch = True; log.append(('모범 답', T(m)[:40]))
    if m.get('ok'): r['ok'] = True; ch = True
    if ch: out[a['id']] = r
items = list(out.values())
for r in items: r.setdefault('by', 'claude')
plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = '\n/* [0928d] 2026-09-28 초6-2 6단원 마스터 검토 반영 — 초6-2 검수 끝 (make_plan_0928d.py) */\n'
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0928d]' in s: s = s[:s.index('\n/* [0928d]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-28d', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('plan 항목 %d개' % len(items))
for l in log: print('  ', ' | '.join(l))
