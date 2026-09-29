# 초3-1 4단원 (2)·(3) 교재 대조 고침 (2026-09-29, v91.0) → review/plan_e3-1.js 에 key e3-1_2026-09-29b 블록을 [pre] 블록 앞에 넣는다.
# 교재 디딤돌 3-1: (2) 102쪽 = 십의 자리에서 올림(43×3) · (3) 104쪽 = 일의 자리에서 올림(26×3).
# 첫 분류안(29a)은 개념카드를 따라 반대로 만들었다 → 이미 29a 가 들어간 기기도 offWas·qWas·ansWas 로 안전하게 바꾼다.
# ⚠️ make_plan_e31.py 를 다시 돌리면 이 블록이 지워진다 — 그 뒤에 이 파일도 다시 돌릴 것(spec_e31.py 도 같은 내용으로 고쳐 둠).
import json, io
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
B, S3, S4 = '4. 곱셈', '03. (몇십몇)×(몇) (2)', '04. (몇십몇)×(몇) (3)'
P3, P4 = '1v1uw1t', '17z65if'
def base(p, s, lid, kind): return {'id': '%s:%s' % (p, lid), 'big': B, 'small': s, 'kind': kind, 'by': 'claude'}
def on(p, s, lid, kind, r, q, a, k):
    d = base(p, s, lid, kind); d.update(round=r, off=False, offWas=True, newQ=q, newQBy='claude', answer=a, keys=k, answerBy='claude'); return d
def off(p, s, lid, kind, typ):
    d = base(p, s, lid, kind); d.update(type=typ, off=True, offWas=False, offBy='claude'); return d
def add(p, s, lid, r, q, a, k, qWas=None, ansWas=None):
    d = base(p, s, lid, 'add'); d.update(round=r, q=q, answer=a, keys=k, answerBy='claude')
    if qWas: d['qWas'] = qWas
    if ansWas: d['ansWas'] = ansWas
    return d
items = [
 # ── 03. (2) 십의 자리에서 올림 ──
 on(P3, S3, 't0H1', 'high', 1, '43 × 3을 계산하는 방법을 말해 봐.',
    '일의 자리 3 × 3 = 9를 쓰고, 십의 자리 4 × 3 = 12에서 2는 십의 자리, 1은 백의 자리에 써서 129야.', ['십의 자리 곱 12', '1은 백의 자리', '129']),
 on(P3, S3, 't0H2', 'high', 2, '43 × 3에서 십의 자리 4 × 3 = 12의 1을 백의 자리에 쓰는 이유를 말해 봐.',
    '십의 자리 4는 40이라서 40 × 3 = 120이야. 120의 100은 백의 자리에 1로, 20은 십의 자리에 2로 써.', ['4 × 3은 40 × 3 = 120', '100은 백의 자리']),
 off(P3, S3, 'qrecall', 'qset', 'recall'),
 off(P3, S3, 'qerror', 'qset', 'error'),
 add(P3, S3, 'qa29e3131', 1, '한 줄에 41명씩 4줄로 서 있으면 모두 몇 명이야? 식과 답을 말해 봐.',
     '41 × 4야. 1 × 4 = 4, 4 × 4 = 16이라서 164명이야.', ['41 × 4', '164명'],
     qWas='한 줄에 16명씩 5줄로 서 있으면 모두 몇 명이야? 식과 답을 말해 봐.',
     ansWas={'a': '16 × 5야. 6 × 5 = 30이라 0을 쓰고 3을 올리고, 1 × 5 = 5에 3을 더해 8이라서 80명이야.', 'k': ['16 × 5', '80명']}),
 add(P3, S3, 'qa29e3132', 2, '친구가 62 × 4 = 48이라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.',
     '십의 자리 6 × 4 = 24에서 백의 자리로 올린 2를 빠뜨렸어. 일의 자리 8, 십의 자리 4, 백의 자리 2라서 248이야.', ['백의 자리 2를 빠뜨렸다', '248']),
 # ── 04. (3) 일의 자리에서 올림 ──
 on(P4, S4, 't0H1', 'high', 2, '26 × 3에서 일의 자리 6 × 3 = 18의 1을 십의 자리 곱에 더해 주는 이유를 말해 봐.',
    '18의 1은 10을 뜻해서 십의 자리 값이야. 그래서 십의 자리 곱 2 × 3 = 6에 더해 7이 되고, 답은 78이야.', ['올린 1은 10을 뜻한다', '십의 자리 곱에 더한다', '78']),
 dict(base(P4, S4, 'qrecall', 'qset'), type='recall', round=1, newQ='26 × 3을 계산하는 방법을 말해 봐.', newQBy='claude',
      qWas='63 × 3을 계산하는 방법을 말해 봐.',
      answer='일의 자리 6 × 3 = 18에서 8을 쓰고 1을 올려. 십의 자리 2 × 3 = 6에 1을 더해 7이라서 78이야.', keys=['일의 자리 곱에서 올림', '올린 1을 더한다', '78'], answerBy='claude',
      ansWas={'a': '일의 자리 3 × 3 = 9, 십의 자리 6 × 3 = 18이야. 18에서 8은 십의 자리, 1은 백의 자리에 써서 189야.', 'k': ['십의 자리 곱 18', '백의 자리로 올린다', '189']}),
 off(P4, S4, 'qreason', 'qset', 'reason'),
 add(P4, S4, 'qa29e3141', 1, '한 봉지에 사탕이 15개씩 들어 있어. 6봉지에는 모두 몇 개야? 식과 답을 말해 봐.',
     '15 × 6이야. 5 × 6 = 30에서 0을 쓰고 3을 올려. 1 × 6 = 6에 3을 더해 9라서 90개야.', ['15 × 6', '90개'],
     qWas='한 봉지에 사탕이 31개씩 들어 있어. 5봉지에는 모두 몇 개야? 식과 답을 말해 봐.',
     ansWas={'a': '31 × 5야. 1 × 5 = 5, 3 × 5 = 15라서 155개야.', 'k': ['31 × 5', '155개']}),
 add(P4, S4, 'qa29e3142', 2, '친구가 18 × 4 = 42라고 했어. 어디가 틀렸는지 찾고 바른 답도 말해 봐.',
     '8 × 4 = 32에서 올린 3을 십의 자리에 더하지 않았어. 1 × 4 = 4에 3을 더해 7이라서 72야.', ['올린 3을 안 더했다', '72']),
]
plan = {'format': 'qr-plan-2', 'grade': 'e3-1', 'rounds': 3, 'items': items, 'seen': []}
blk = ('\n/* [29b] 2026-09-29 초3 교재 대조 — 4단원 (2)=십의 자리 올림 · (3)=일의 자리 올림으로 바로잡음. 원천 작업도구/질문계단/e3/make_plan_e31b.py */\n'
       "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e3-1_2026-09-29b', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
p = ROOT + r'\review\plan_e3-1.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [29b]' in s:
    a = s.index('\n/* [29b]'); b = s.index('\n/* [pre]', a) if '\n/* [pre]' in s[a:] else len(s)
    s = s[:a] + s[b:]
i = s.index('\n/* [pre]')
s = s[:i].rstrip('\n') + '\n' + blk + s[i:]
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('29b items', len(items))
