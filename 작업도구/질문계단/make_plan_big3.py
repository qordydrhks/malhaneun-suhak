# -*- coding: utf-8 -*-
"""초6-2 3단원 다시 만들기 → plan_e6-2.js key e6-2_2026-09-23c + review/fig_e6-2.js
  ① 마스터 3단원 검토(검토3)에서 뺀 것·고친 것 반영
  ② 그림이 있어야 답할 수 있는 질문 17개 추가 (소단원 맨 앞부터 차례로)
  ③ 그림 버전이 대신하는 기존 질문 2개는 뺀다
  ④ 그림 11장 → review/fig_e6-2.js 의 window.QR_FIG (질문 번호로 붙는다, v88.8)
"""
import json, io, sys, os, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
E6 = ROOT + r'\작업도구\질문계단\e6'
_sp = importlib.util.spec_from_file_location('spec3', E6 + r'\spec_e62_big3.py')
S3 = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(S3)

BASE = json.load(open(ROOT + r'\작업도구\회차\export\e6-2_2026-09-23pre_빈기기.json', encoding='utf-8'))
M    = json.load(open(ROOT + r'\작업도구\질문고르기\질문고르기_e6-2_2026-09-23_마스터검토3.json', encoding='utf-8'))
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

# ── ① 마스터 3단원 결정을 다른 기기에도 ────────────────────────────────
for m in M['items']:
    if not m['big'].startswith('3.'): continue
    a = byid.get(m['id'])
    if not a: continue
    r, ch = rec(a), False
    if T(m) != T(a): r['newQ'] = T(m); r['qWas'] = T(a); ch = True; log.append(('마스터 문장', T(m)[:50]))
    if m['round'] != a['round'] and not m['off']:
        r['round'] = m['round']; r['rWas'] = a['round']; ch = True
    if bool(m['off']) != bool(a['off']):
        r['off'] = bool(m['off']); r['offWas'] = bool(a['off']); ch = True
        log.append(('마스터 ' + ('뺌' if m['off'] else '되살림'), T(m)[:50]))
    if m.get('ok'): r['ok'] = True; ch = True
    if not ch and not m.get('ok'): out.pop(m['id'], None)

# ── ①-2 마스터가 되살린 질문의 모범 답 (뺀 질문이라 비어 있었다) ──────────
ANS = [('3', '03', 'qrecall',
        '그 줄에 있는 자리 중 적어도 한 자리는 2층으로 쌓여 있다는 뜻이야.',
        ['그 줄에 2층인 자리가 적어도 하나 있다'])]
for b, sm, t, na, nk in ANS:
    x = key3.get((b, sm, t))
    if not x: raise SystemExit('못 찾음 %s-%s-%s' % (b, sm, t))
    r = rec(x)
    r['answer'] = na; r['keys'] = nk; r['answerBy'] = 'claude'
    r['ansWas'] = {'a': x.get('answer') or '', 'k': x.get('keys') or []}
    log.append(('모범 답(마스터가 되살린 질문)', T(x)[:50]))

# ── ③ 그림 질문이 대신하는 기존 질문은 뺀다 ────────────────────────────
REPLACED = [
 ('3', '04', 'qrecall', '그림에 수를 써 준 질문이 대신한다(말로만 "1, 4, 2, 3" 을 부르지 않게)'),
 ('3', '05', 'qrecall', '그림으로 층별 모양을 보여 주는 질문이 대신한다'),
]
for b, s, t, why in REPLACED:
    x = key3.get((b, s, t))
    if not x: raise SystemExit('못 찾음 %s-%s-%s' % (b, s, t))
    r = rec(x); r['off'] = True; r['offBy'] = 'claude'; r['offWas'] = False
    log.append(('뺌(그림 질문이 대신)', T(x)[:50]))

# ── ② 새 질문 — 기존에 같은 것이 살아 있으면 넣지 않는다 ─────────────────
SKIP = {   # (소단원, 질문 앞부분) — 기존 질문과 겹쳐서 넣지 않음
 ('03', '앞에서 본 모양을 그릴 때 각 줄에서'),
 ('03', '친구가 앞에서 본 모양의 어느 줄이'),
 ('04', '위에서 본 모양의 각 자리에 쓴 수는'),
 ('04', '위에서 본 모양에 수를 쓰면 쌓은 모양을'),
 ('05', '층별로 나타낸 모양에서 1층 모양은 위에서 본 모양과'),
 ('05', '친구가 층별 모양이 1층 5칸'),
 ('05', '층별로 나타낸 모양에서 1층 모양은 왜'),
 ('06', '쌓기나무 3개로 만든 모양에 1개를 붙여서'),
 ('06', '뒤집거나 돌렸을 때 같은 모양을 한 가지로'),
}
def skipped(sm, q):
    return any(sm == a and q.startswith(b) for a, b in SKIP)

fig_map, ordn = {}, {}
added = 0
for sm, rnd, figkey, q, ans, keys in S3.Q:
    if skipped(sm, q):
        log.append(('안 넣음(기존과 겹침)', q[:50])); continue
    x = key3.get(('3', sm, 't0L1')) or key3.get(('3', sm, 't0H1'))
    if not x: raise SystemExit('소단원 못 찾음 3-%s' % sm)
    code = x['id'].split(':', 1)[0]
    ordn[sm] = ordn.get(sm, 0) + 1
    qid = '%s:qab3%s%02d' % (code, sm, ordn[sm])
    out[qid] = {'id': qid, 'big': x['big'], 'small': x['small'], 'kind': 'add',
                'q': q, 'round': rnd, 'ord': ordn[sm] - 1,
                'answer': ans, 'keys': keys, 'answerBy': 'claude', 'by': 'claude'}
    if figkey: fig_map[qid] = S3.FIGS[figkey]
    added += 1
    log.append(('추가 r%d%s' % (rnd, ' +그림' if figkey else ''), q[:50]))

items = list(out.values())
for r in items: r.setdefault('by', 'claude')
plan = {'format': 'qr-plan-2', 'grade': 'e6-2', 'rounds': 3, 'items': items, 'seen': []}
head = ('\n/* [big3] 2026-09-23 초6-2 3단원 다시 만들기 — 그림을 보고 답하는 질문으로 (마스터 지시).\n'
        '   "그림 없이 말로만 질문하고 답한다는 게 말이 안 되는 것 같아서" 마스터가 검토를 중단하셨다.\n'
        '   그림은 review/fig_e6-2.js · 원천 작업도구/질문계단/e6/{draw,figs_big3,spec_e62_big3}.py */\n')
p = ROOT + r'\review\plan_e6-2.js'
s = io.open(p, encoding='utf-8', newline='').read()
if '\n/* [big3]' in s: s = s[:s.index('\n/* [big3]')]
s = s.rstrip() + '\n' + head + ("(window.QR_BASE_PLANS = window.QR_BASE_PLANS || []).push({ key:'e6-2_2026-09-23c', data:"
    + json.dumps(plan, ensure_ascii=False, indent=0) + '});\n')
io.open(p, 'w', encoding='utf-8', newline='').write(s)

# ── ④ 그림 파일 ────────────────────────────────────────────────────
lines = ['/* 🖼 질문에 붙는 그림 — 초6-2 3단원 (2026-09-23)',
         '   { 질문번호: {svg:"…"} }  renderCurrentQuestion 이 질문 번호로 찾아 질문 바로 위에 그린다(v88.8).',
         '   쌓기나무는 입체라 ddFig 로 못 그린다 → 작업도구/질문계단/e6/draw.py 에서 SVG 로 직접 그렸다.',
         '   고칠 때는 이 파일을 손대지 말고 figs_big3.py 를 고쳐 make_plan_big3.py 를 다시 돌릴 것. */',
         'window.QR_FIG = window.QR_FIG || {};',
         '(function(m){ for(var k in m) window.QR_FIG[k] = m[k]; })({']
for i, (qid, svg) in enumerate(fig_map.items()):
    lines.append('  %s: { svg: %s }%s' % (json.dumps(qid, ensure_ascii=False),
                 json.dumps(svg, ensure_ascii=False), ',' if i < len(fig_map) - 1 else ''))
lines.append('});')
io.open(ROOT + r'\review\fig_e6-2.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')

print('plan 항목 %d개 · 새 질문 %d개 · 그림 붙은 질문 %d개' % (len(items), added, len(fig_map)))
for l in log: print('  ', ' | '.join(str(x)[:62] for x in l))
