# 초6-2 2단원 마스터 검토(2026-09-23) 반영 + 같은 기준을 3~6단원에 → plan 파일 끝에 key e6-2_2026-09-23b
#
# 읽은 기준 (기준표_초등_질문.md 14절)
#  ㉮ 소단원 제목이 곧 답인 질문은 뺀다 (뜻 질문은 예외)
#  ㉯ 그 소단원에서 배우는 방법을 "왜 쓰나" 묻는 뻔한 이유는 뺀다
#  ㉰ 1회차 대표 질문은 실제 수로 계산해 답하게 → 옆의 "…과정을 말해 봐"는 중복이라 뺀다
#  ⚠️ 13절의 "5~6개 유지"는 취소. 개수는 결과일 뿐 — 겹치거나 뻔하면 뺀다.
import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-23_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-23_마스터검토2.json', encoding='utf-8'))

byid = {x['id']: x for x in BASE['items']}
key3 = {}
for x in BASE['items']:
    key3[(x['big'].split('.')[0], x['small'].split('.')[0], x['id'].split(':', 1)[1])] = x

def T(x): return x.get('newQ') or x.get('q') or ''

out, log = {}, []
def rec(x):
    if x['id'] not in out:
        out[x['id']] = {k: x[k] for k in ('id', 'big', 'small', 'kind') if k in x}
    return out[x['id']]

# ── ① 마스터 2단원 결정을 다른 기기에도 ────────────────────────────────
for m in M['items']:
    if not m['big'].startswith('2.'): continue
    a = byid.get(m['id'])
    if not a:
        # 마스터가 새로 추가한 질문 — 다른 기기에서도 같은 번호로 만들어진다
        r = {k: m[k] for k in ('id', 'big', 'small', 'kind') if k in m}
        r['q'] = m['q']; r['round'] = m['round']
        if m.get('ok'): r['ok'] = True
        out[m['id']] = r
        log.append(('마스터 추가 질문', m['q']))
        continue
    r, ch = rec(a), False
    if T(m) != T(a):
        r['newQ'] = T(m); r['qWas'] = T(a); ch = True
        log.append(('마스터 문장', T(a)[:46], '->', T(m)[:46]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True
        log.append(('마스터 회차 %s->%s' % (a['round'], m['round']), T(m)[:46]))
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:52]))
    if m.get('ok'): r['ok'] = True; ch = True
    if not ch and not m.get('ok'): out.pop(m['id'], None)

# ── ①-2 마스터가 고치거나 새로 넣은 질문의 모범 답 ──────────────────────
ANS = [
 # 추가 질문 (번호로 바로 찾는다)
 ('1tom1oz:qamudnm8aq8bux',
  '나누는 수 × 몫 + 남는 양 = 처음 양이야. 7.4 ÷ 2면 2 × 3 + 1.4 = 7.4로 확인해.',
  ['나누는 수 × 몫 + 남는 양 = 처음 양', '2 × 3 + 1.4 = 7.4']),
 # 마스터가 문장을 바꾼 1회차 대표 질문 — 이제 실제로 계산해 답해야 한다
 (key3[('2','06','t0L1')]['id'],
  '7.4 ÷ 2를 하면 몫이 3, 남는 양이 1.4야. 3명에게 나누어 주고 1.4 L가 남아.',
  ['3명에게 나누어 준다', '1.4 L가 남는다']),
]
for qid, na, nk in ANS:
    src = byid.get(qid)
    r = out.get(qid) or (rec(src) if src else None)
    if r is None: raise SystemExit('못 찾음 ' + qid)
    r['answer'] = na; r['keys'] = nk; r['answerBy'] = 'claude'
    if src:
        r['ansWas'] = {'a': src.get('answer') or '', 'k': src.get('keys') or []}
        r['reopen'] = True                    # 마스터가 이미 확인한 질문이면 다시 보게
    out[qid] = r
    log.append(('모범 답', na[:52]))

# ── ② 3~6단원: 빼기 (㉮·㉯) ──────────────────────────────────────────
OFF = [
 ('3','01','t0L1',   '소단원 제목(어느 방향에서 보았는지)이 곧 답이라 뻔하다'),
 ('3','05','qreason','옆 1회차 질문(1층 모양은 위에서 본 모양과 어떤 관계야?)이 정면으로 같은 것을 물음'),
 ('5','03','t0L1',   '옆 질문(원 안과 밖의 정사각형으로 어림하는 방법)이 정면으로 같고, 소단원 제목이 곧 답'),
]
for b, s, t, why in OFF:
    x = key3.get((b, s, t))
    if not x: raise SystemExit('못 찾음 %s-%s-%s' % (b, s, t))
    r = rec(x); r['off'] = True; r['offBy'] = 'claude'; r['offWas'] = False
    log.append(('뺌', '%s-%s %s' % (b, s, T(x)[:46]), why))

items = list(out.values())
for r in items: r.setdefault('by', 'claude')

plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [0923b] 2026-09-23 초6-2 2단원 마스터 검토 반영 + 같은 기준을 3~6단원에.\n'
        '   기준표_초등_질문.md 14절: 1회차 대표 질문은 실제로 계산해 답하게(옆 과정 질문은 중복이라 뺌) ·\n'
        '   소단원 제목이 곧 답인 질문 뺌 · 그 소단원의 방법을 "왜 쓰나" 묻는 뻔한 이유 뺌.\n'
        '   원천 작업도구/질문계단/make_plan_0923b.py */\n')
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0923b]' in s: s = s[:s.index('\n/* [0923b]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-23b', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)

print('항목 %d개 (확인 표시 %d)' % (len(items), sum(1 for r in items if r.get('ok'))))
for l in log: print('  ', ' | '.join(str(x)[:66] for x in l))
