# 초4-2 1단원 마스터 검토(2026-09-22 17:07) 반영 + 같은 기준을 초4-2 2~6단원·초6-2 전체에 → plan 파일 끝에 key ..._22c 블록
#  읽은 기준: ① 소단원의 가장 쉬운 계산과 같은 한 단계 문장제는 1회차 ② 옆 질문(어떻게 해?·왜 바꿔?)이 이미 정면으로 묻는
#  같은 실수를 되풀이하는 오류 찾기는 뺌 ③ 분수 뒤 조사는 분자 소리로("3/9이" = 구분의 삼이)
import json, io, sys, copy
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
sys.path.insert(0, ROOT + r'\작업도구\질문계단')
from josa_check import check
M = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e4-2_2026-09-22_마스터검토.json', encoding='utf-8'))

def fix(t):
    if not isinstance(t, str): return t
    for bad, good in check(t): t = t.replace(bad, good, 1)
    return t

RULES = {
 'e4-2': {'r1': [(2, 1, '+1'), (4, 5, '+1')], 'off': [(3, 4), (3, 7), (3, 8)]},
 'e6-2': {'r1': [(1, 1, '+1'), (2, 1, '+1'), (4, 5, '+1'), (4, 6, '+1'), (5, 2, '+2')], 'off': [(1, 3), (2, 1), (2, 3), (2, 4)]},
}
EXPORT = {'e4-2': 'e4-2_2026-09-22_빈기기.json', 'e6-2': 'e6-2_2026-09-22_빈기기.json'}
PFX = {'e4-2': 'qa22e42', 'e6-2': 'qa22e62'}

def build(g):
    E = json.load(open(ROOT + r'\작업도구\회차\export\\' + EXPORT[g], encoding='utf-8'))
    byid = {i['id']: i for i in E['items']}
    key = lambda i: (int(i['big'].split('.')[0]), int(i['small'].split('.')[0]))
    items, log = [], []
    def base(i): return {k: i[k] for k in ('id', 'big', 'small', 'kind') if k in i}
    out = {}
    def get(i):
        if i['id'] not in out: out[i['id']] = base(i)
        return out[i['id']]
    for i in E['items']:
        if i['kind'] == 'ladder' or i['off']: continue
        k = key(i); lid = i['id'].split(':', 1)[1]
        cur = i.get('newQ') or i['q']
        # ③ 조사
        nq = fix(cur)
        if nq != cur:
            r = get(i)
            if i['kind'] == 'add': r['q'] = nq; r['qWas'] = cur
            else:
                r['newQ'] = nq; r['newQBy'] = 'claude'
                if i.get('newQ'): r['qWas'] = i['newQ']
            log.append(('조사', cur, '->', nq))
        a, ks = i.get('answer') or '', i.get('keys') or []
        na, nks = fix(a), [fix(x) for x in ks]
        if na != a or nks != ks:
            r = get(i); r['answer'] = na; r['keys'] = nks; r['answerBy'] = 'claude'; r['ansWas'] = {'a': a, 'k': ks}
            log.append(('조사(답)', a, '->', na))
        # ① 한 단계 문장제 → 1회차
        is_add = lid.startswith(PFX[g])
        if is_add and (k[0], k[1], '+' + lid[len(PFX[g]) + len(str(k[1])):]) in RULES[g]['r1'] and i['round'] != 1:
            r = get(i); r['round'] = 1; r['rWas'] = i['round']; log.append(('1회차로', cur))
        # ② 옆 질문이 덮는 오류 찾기 → 뺌
        if lid == 'qerror' and k in RULES[g]['off']:
            r = get(i); r['off'] = True; r['offBy'] = 'claude'; r['offWas'] = False; log.append(('뺌', cur))
    # 마스터 검토분(초4-2 1단원): 바꾼 것 + 확인 표시
    if g == 'e4-2':
        for x in M['items']:
            if not x['big'].startswith('1.'): continue
            y = byid.get(x['id'])
            r = out.get(x['id']) or base(x)
            ch = False
            if y and x['round'] != y['round']: r['round'] = x['round']; r['rWas'] = y['round']; ch = True
            if y and x['off'] != y['off']: r['off'] = x['off']; r['offWas'] = y['off']; ch = True
            if x.get('ok'): r['ok'] = True; ch = True
            if ch: out[x['id']] = r
    items = list(out.values())
    for r in items:
        r.setdefault('by', 'claude')
    return items, log

for g in ('e4-2', 'e6-2'):
    items, log = build(g)
    plan = {'format': 'qr-plan-2', 'grade': g, 'rounds': 3, 'items': items, 'seen': []}
    head = ('\n/* [22c] 2026-09-22 초4-2 1단원 마스터 검토 기준 적용: 쉬운 한 단계 문장제는 1회차 · 옆 질문이 덮는 오류 찾기 뺌 · '
            '분수 뒤 조사는 분자 소리로. 원천 작업도구/질문계단/make_plan_22c.py */\n')
    p = ROOT + r'\review\plan_' + g + '.js'
    s = io.open(p, encoding='utf-8', newline='').read()
    k = g + '_2026-09-22c'
    if k in s: s = s[:s.index('\n/* [22c]')]
    s = s.rstrip() + '\n' + head + "(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'" + k + "', data:" + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n'
    io.open(p, 'w', encoding='utf-8', newline='').write(s)
    print('#', g, 'items', len(items), 'ok', sum(1 for r in items if r.get('ok')))
    for l in log: print('  ', *[str(x)[:70] for x in l])
