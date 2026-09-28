# -*- coding: utf-8 -*-
"""초6-2 3단원 마스터 검토(2026-09-28) 반영 + 같은 기준을 4~6단원에 → plan 끝에 key e6-2_2026-09-28a

마스터가 이번에 한 것 (질문고르기_e6-2_2026-09-28_마스터검토.json, 9/26 파일과 비교)
  뺌 6   3-03 막연한 방법 질문 · 3-05 "층이 3개니까 쌓기나무도 3개" · 3-06 말로만 하는 모양 만들기 4개
  되살림 1  3-03 "세 방향에서 본 모양이 같아도 쌓은 모양이 여러 가지일 수 있는 이유" → 1회차
  지움 1   3-04 Claude 추가 질문 "가장 큰 수 3이 전체 개수라고 했어" (오류 찾기)
  지시    "3개짜리에서 1개를 붙여 만드는 문제는 **미리 3개짜리 그림을 주고** 만들라고 해야지"

읽은 기준 (기준표 16절)
  ① 말도 안 되게 틀린 오류 찾기는 뺀다 — 실제 아이가 하지 않는 실수라 이해를 가려내지 못한다
  ② 옆에 구체적인 질문이 있으면 막연한 "방법을 말해 봐"는 뺀다
  ③ 그림 없이 말로 하기 어려운 질문은 빼고, 그림을 준 질문으로 대신한다
  ④ 개념의 한계·예외를 묻는 이유 질문은 살린다

4~6단원 적용 (초4-2·초5-2 미검수 단원도 봤지만 ①에 걸리는 것 없음 — 모두 실제로 하는 실수)
  뺌 3   6-01 "원기둥에는 밑면이 1개뿐" · 6-04 "구의 중심은 겉면 아무 점" (①) ·
         6-03 "모선과 높이가 같다" (옆 t0H2 "모선이 높이보다 긴 이유"가 덮음)
  되살림 1  4-01 "전항과 후항에 0을 곱하면 안 되는 이유" (④ — 비의 성질의 예외)
"""
import json, io, os, sys, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
Q = ROOT + r'\작업도구\질문계단'
_sp = importlib.util.spec_from_file_location('draw', Q + r'\draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)

BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-23c_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-28_마스터검토.json', encoding='utf-8'))
byid = {x['id']: x for x in BASE['items']}
mbyid = {x['id']: x for x in M['items']}
key3 = {(x['big'].split('.')[0], x['small'].split('.')[0], x['id'].split(':', 1)[1]): x for x in BASE['items']}
def T(x): return x.get('newQ') or x.get('q') or ''

out, log = {}, []
def rec(x):
    if x['id'] not in out:
        out[x['id']] = {k: x[k] for k in ('id', 'big', 'small', 'kind') if k in x}
    return out[x['id']]

# ── ① 마스터 3단원 결정을 다른 기기에도 ────────────────────────────────
for a in BASE['items']:
    if not a['big'].startswith('3.'): continue
    m = mbyid.get(a['id'])
    if m is None:                                    # 마스터가 지운 추가 질문 → 다른 기기에서는 뺌으로
        r = rec(a); r['off'] = True; r['offWas'] = bool(a['off'])
        log.append(('마스터 지움 → 뺌', T(a)[:50])); continue
    r, ch = rec(a), False
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:50]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True
    if m.get('ok'): r['ok'] = True; ch = True
    if not ch: out.pop(a['id'], None)

# 마스터가 되살린 질문에 모범 답이 없으면 붙인다
x = key3[('3', '03', 't0H2')]
if not (mbyid[x['id']].get('answer')):
    r = rec(x)
    r['answer'] = ('앞·옆에서는 뒤에 있는 쌓기나무가 앞의 것에 가려서 안 보여. 그래서 가려진 자리에 '
                   '쌓기나무가 있는지 없는지에 따라 쌓은 모양이 여러 가지가 될 수 있어.')
    r['keys'] = ['뒤에 있는 쌓기나무는 앞의 것에 가려 보이지 않는다',
                 '가려진 자리에 쌓기나무가 있어도 없어도 세 방향 모양이 같을 수 있다']
    r['answerBy'] = 'claude'; r['ansWas'] = {'a': x.get('answer') or '', 'k': x.get('keys') or []}
    r['reopen'] = True
    log.append(('모범 답(마스터가 되살린 질문)', T(x)[:50]))

# ── ② 3-06 — 3개짜리 그림을 주고 1개를 붙여 만들게 (마스터 지시) ─────────────────
code = key3[('3', '06', 't0L1')]['id'].split(':')[0]
import re as _re
def _big(svg, k=1.7):
    """정육면체 3개짜리는 원래 크기가 작다(약 120 px) → 화면 폭을 k 배로 (viewBox 는 그대로라 선명하게 커진다)"""
    return _re.sub(r'width="([0-9.]+)"', lambda m: 'width="%d"' % round(float(m.group(1)) * k), svg, count=1)
FIGS = {
 'b3_tri_line': _big(D.svg(D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0)], 'blue'))),
 'b3_tri_bent': _big(D.svg(D.cubes([(0, 0, 0), (1, 0, 0), (1, 1, 0)], 'green'))),
}
NEWQ = [
 (4, 1, 'b3_tri_line',
  '그림은 쌓기나무 3개를 한 줄로 붙인 모양이야. 여기에 쌓기나무 1개를 더 붙여서 서로 다른 4개짜리 모양을 만들려면 어디에 붙여 봐야 해?',
  '끝에 이어 붙이면 4개가 한 줄이 되고, 끝 쌓기나무의 옆에 붙이면 ㄱ자, 가운데 쌓기나무의 옆에 붙이면 ㅗ자 모양이 돼. '
  '위에 얹어도 돌려 보면 이 가운데 하나와 같아서 서로 다른 모양은 3가지야.',
  ['끝에 이어 붙이면 한 줄 모양이 된다', '끝의 옆·가운데의 옆에 붙이면 서로 다른 모양이 된다',
   '돌려서 겹치는 모양은 한 가지로 센다']),
 (5, 2, 'b3_tri_bent',
  '그림은 쌓기나무 3개를 ㄱ자로 붙인 모양이야. 여기에 1개를 더 붙여서 만들 수 있는 4개짜리 모양을 하나 만들고, 어디에 붙였는지 말해 봐.',
  '예를 들어 꺾인 곳의 쌓기나무 위에 1개를 얹으면 가운데가 위로 솟은 모양이 되고, 한쪽 끝에 이어 붙이면 ㄱ자의 한쪽이 길어진 모양이 돼.',
  ['3개짜리 모양의 한 면에 1개를 붙인다', '붙인 자리를 분명히 말한다']),
]
fig_map = {}
for n, rnd, fk, q, ans, keys in NEWQ:
    qid = '%s:qab306%02d' % (code, n)
    assert qid not in byid, qid
    out[qid] = {'id': qid, 'big': key3[('3', '06', 't0L1')]['big'], 'small': key3[('3', '06', 't0L1')]['small'],
                'kind': 'add', 'q': q, 'round': rnd, 'ord': n - 1,
                'answer': ans, 'keys': keys, 'answerBy': 'claude', 'by': 'claude'}
    fig_map[qid] = FIGS[fk]
    log.append(('추가 r%d +그림' % rnd, q[:50]))

# ── ③ 4~6단원에 같은 기준 ─────────────────────────────────────────
OFF = [('6', '01', 'qerror', '① 말도 안 되게 틀린 오류 — 옆 t0L2(밑면·옆면·높이)가 덮음'),
       ('6', '04', 'qerror', '① 말도 안 되게 틀린 오류 — 옆 t0L1(구의 중심)이 덮음'),
       ('6', '03', 'qerror', '옆 t0H2 "모선이 높이보다 긴 이유"가 같은 것을 묻는다')]
for b, s, t, why in OFF:
    x = key3[(b, s, t)]
    assert not x['off'], (b, s, t)
    r = rec(x); r['off'] = True; r['offBy'] = 'claude'; r['offWas'] = False
    log.append(('뺌(%s)' % why[:18], T(x)[:44]))

x = key3[('4', '01', 't0H2')]
r = rec(x)
r['off'] = False; r['offWas'] = True; r['round'] = 2; r['rWas'] = x['round']
r['newQ'] = '비의 전항과 후항에 0을 곱하면 안 되는 이유를 말해 봐.'; r['qWas'] = T(x); r['newQBy'] = 'claude'
r['answer'] = '전항과 후항에 0을 곱하면 0 : 0이 돼서 원래 비가 어떤 비였는지, 비율이 얼마인지 알 수 없게 돼.'
r['keys'] = ['0을 곱하면 0 : 0이 된다', '원래 비의 비율을 알 수 없게 된다']
r['answerBy'] = 'claude'; r['ansWas'] = {'a': x.get('answer') or '', 'k': x.get('keys') or []}
log.append(('되살림 r2 (④ 한계를 묻는 이유)', r['newQ']))

items = list(out.values())
for r in items: r.setdefault('by', 'claude')
plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [0928] 2026-09-28 초6-2 3단원 마스터 검토 반영 + 4~6단원에 같은 기준 (make_plan_0928.py).\n'
        '   3-06 은 3개짜리 그림을 주고 1개를 붙여 만들게 (마스터 지시) — 그림은 review/fig_e6-2c.js */\n')
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [0928]' in s: s = s[:s.index('\n/* [0928]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-28a', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)

lines = ['/* 🖼 초6-2 3-06 「3개에 1개 붙이기」 그림 (2026-09-28) — make_plan_0928.py 가 만든다. 손으로 고치지 말 것.',
         '   fig_e6-2.js 는 3단원 첫 작업(make_plan_big3.py) 몫이라 따로 둔다(덮어쓰면 그쪽 그림이 사라진다). */',
         'window.QR_FIG = window.QR_FIG || {};',
         '(function(m){ for(var k in m) window.QR_FIG[k] = m[k]; })({']
for i, (qid, svg) in enumerate(fig_map.items()):
    lines.append('  %s: { svg: %s }%s' % (json.dumps(qid), json.dumps(svg, ensure_ascii=False), ',' if i < len(fig_map) - 1 else ''))
lines.append('});')
io.open(ROOT + r'\review\fig_e6-2c.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')

print('plan 항목 %d개 · 그림 %d장' % (len(items), len(fig_map)))
for l in log: print('  ', ' | '.join(l))
