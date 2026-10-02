# -*- coding: utf-8 -*-
"""초4-2 새 방식 질문(e42_1 · e42_23 · e42_456 설계) → 앱 파일 (2026-10-02, 마스터 "4학년 2학기 끝났으니 앱에 넣어").
   python -X utf8 작업도구/질문설계/to_app_e42.py
 만드는 것
   rounds/data-e4-2.js        1·2회차(선수는 1회차 맨 앞) — 질문·모범 답·꼭 말할 핵심(app_e42_data.KEYS)
   작업도구/질문계단/e4/ladder_E4_2_v2.json → (export_app.py) ladder/data-e4-2.js   3회차 = 계단 칸
   review/fig_e4-2.js         질문·계단 칸 그림(설계 PDF 와 같은 그림) · review/fig_e4-2b.js 는 비움(옛 그림이 새 칸에 붙지 않게)
   review/pre_e4-2.js         🌱 선수 개념 표시 · review/ask_e4-2.js 비움(🤔 없음)
 번호: 소단원마다 기존 번호 앞머리(개념 해시)를 그대로 쓰고 꼬리를 qn<회차><순서> 로 — 새 질문이라 옛 기록과 겹치지 않는다.
"""
import io, json, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
import e42_1, e42_23, e42_456, e42_common as C, app_e42_data as D

G = 'e4-2'
UNITS = [e42_1.UNIT, e42_23.U2, e42_23.U3, e42_456.U4, e42_456.U5, e42_456.U6]

# 기존 회차 데이터에서 소단원 키·번호 앞머리·문제 개수 설정을 읽는다
old_t = io.open(os.path.join(ROOT, 'rounds', 'data-%s.js' % G), encoding='utf-8').read()
OLD = json.loads(old_t[old_t.index('= {') + 2: old_t.rindex('}') + 1])
BIGS = []
for k in OLD:
    b = k.split('|')[1]
    if b not in BIGS: BIGS.append(b)
assert len(BIGS) == 6, BIGS

def svg_of(key):
    if key == 'dist':
        h = e42_1.DIST
    else:
        h = C.fig(key)
    assert h, key
    m = re.search(r'<svg[\s\S]*</svg>', h)
    s = m.group(0)
    s = re.sub(r'\swidth="\d+"', '', s, count=1)
    return s.replace('<svg ', '<svg style="max-width:100%;width:340px;height:auto" ', 1)

rounds, ladders, figs, pre = {}, [], {}, {}
n12 = n3 = 0
for ui, U in enumerate(UNITS, 1):
    big = BIGS[ui - 1]
    for s in U['smalls']:
        cands = [k for k in OLD if k.split('|')[1] == big and k.split('|')[2].startswith(s['no'] + '.')]
        assert len(cands) == 1, (big, s['no'], cands)
        key = cands[0]; small = key.split('|')[2]
        prefix = OLD[key]['items'][0]['id'].split(':')[0]
        tag = '%d-%s' % (ui, s['no'])
        a = [q for q in s['qs'] if q[0] < 3]; b = [q for q in s['qs'] if q[0] == 3]
        items = []
        for i, q in enumerate(a):
            r = max(1, q[0])
            qid = '%s:qn%d%02d' % (prefix, q[0], i + 1)
            it = {'id': qid, 'q': q[2], 'r': r, 'kind': 'add', 'ans': q[3], 'keys': D.KEYS[tag][i]}
            items.append(it)
            if q[0] == 0:
                pre[qid] = {'from': D.PRE_FROM[tag], 'what': re.sub(r'에 대해 설명해 봐\.?$', '', q[2])}
            if len(q) > 5 and q[5]: figs[qid] = {'svg': svg_of(q[5])}
            n12 += 1
        rounds[key] = {'items': items, 'quiz': OLD[key].get('quiz', {'1': 3, '2': 2})}
        steps = []
        for i, q in enumerate(b):
            L = D.LAD[tag][i]; g = D.G[tag][i]
            steps.append({'kind': '전략', 'q': q[2],
                          'ideas': [[g[j], q[4][j]] for j in range(len(g))],
                          'teach': ' '.join(L['ideas']), 'again': L['again'], 'fig': False, 'src': q[1],
                          'half': g[0], 'wrong': L['wrong'], 'miscon': L['miscon'], 'record': L['record']})
            if len(q) > 5 and q[5]: figs['ladder:%s:%d' % (key, i + 1)] = {'svg': svg_of(q[5])}
            n3 += 1
        ladders.append({'grade': G, 'big': big, 'middle': None, 'small': small, 'steps': steps})

# 1) 회차 데이터
crlf = b'\r\n' in open(os.path.join(ROOT, 'rounds', 'data-%s.js' % G), 'rb').read()
body = ('/* 회차 데이터 — 초4-2 새 방식 질문(2026-10-02). 원천: 작업도구/질문설계/e42_*.py + app_e42_data.py, 만들기: to_app_e42.py. 직접 고치지 말 것. */\n'
        'window.DD_ROUNDS = window.DD_ROUNDS || {};\n'
        'window.DD_ROUNDS["%s"] = %s;\n' % (G, json.dumps(rounds, ensure_ascii=False)))
io.open(os.path.join(ROOT, 'rounds', 'data-%s.js' % G), 'w', encoding='utf-8', newline='\r\n' if crlf else '\n').write(body)

# 2) 계단
lp = os.path.join(ROOT, '작업도구', '질문계단', 'e4', 'ladder_E4_2_v2.json')
io.open(lp, 'w', encoding='utf-8', newline='\n').write(json.dumps(ladders, ensure_ascii=False, indent=1))
subprocess.run([sys.executable, '-X', 'utf8', os.path.join(ROOT, '작업도구', '질문계단', 'export_app.py'), G, 'e4/ladder_E4_2_v2.json'], check=True)

# 3) 그림 · 선수 · 🤔
def jsmap(head, var, m):
    return (head + 'window.%s = window.%s || {};\n(function(m){ for(var k in m) window.%s[k] = m[k]; })(' % (var, var, var)
            + json.dumps(m, ensure_ascii=False, indent=0) + ');\n')
io.open(os.path.join(ROOT, 'review', 'fig_%s.js' % G), 'w', encoding='utf-8', newline='\n').write(jsmap(
    '/* 🖼 질문에 붙는 그림 — e4-2 새 방식 질문(2026-10-02)\n   { 질문번호 또는 ladder:<소단원키>:<칸>: {svg:"…"} }  원천: 작업도구/질문설계 설계 그림, 만들기: to_app_e42.py */\n', 'QR_FIG', figs))
io.open(os.path.join(ROOT, 'review', 'fig_%sb.js' % G), 'w', encoding='utf-8', newline='\n').write(
    '/* (2026-10-02) 옛 e4-2 그래프·분수 그림 — 새 방식 질문으로 바꾸면서 비움. 그림은 fig_e4-2.js 하나에 있다. */\n')
io.open(os.path.join(ROOT, 'review', 'pre_%s.js' % G), 'w', encoding='utf-8', newline='\n').write(jsmap(
    '/* 🌱 선수 개념 질문 표 — e4-2 새 방식 질문(2026-10-02)\n   { 질문번호: {from:"배운 곳", what:"무엇"} }  만들기: to_app_e42.py */\n', 'QR_PRE', pre))
io.open(os.path.join(ROOT, 'review', 'ask_%s.js' % G), 'w', encoding='utf-8', newline='\n').write(
    '/* 🤔 Claude 가 자신 없는 질문 — e4-2: 새 방식 질문은 마스터가 설계 PDF 로 전부 검토함(2026-10-02) → 없음 */\nwindow.QR_ASK = window.QR_ASK || {};\n')
print('1·2회차 %d · 계단 칸 %d · 그림 %d · 선수 %d · 소단원 %d' % (n12, n3, len(figs), len(pre), len(rounds)))
