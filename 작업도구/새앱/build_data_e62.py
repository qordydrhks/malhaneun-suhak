# -*- coding: utf-8 -*-
"""새 앱 데이터 만들기 — 초6-2 (2026-10-21, 마스터 「6학년 2학기도 똑같이 — 앱에서 하나하나 풀어 보며 테스트」)
   python -X utf8 작업도구/새앱/build_data_e62.py  → app/data/e6-2.js
 원천(정본은 전부 설계 파일 — 이 결과 파일은 직접 고치지 말 것) = 완성본 PDF(make_full_pdf_e62.py)와 같은 것
   질문      작업도구/질문설계/e62_1 ~ e62_6
   핵심·계단  app_e62_data.KEYS(ALT 붙음) · LAD · G · LADPATH(다른 풀이 길) · TAP(누르기 단계) · PRE_FROM
   도움      help_e62_1~6.H (apply_alt — 다시 묻기 핵심에도 같은 뜻의 다른 말)
   그림      e62_common.fig(질문 — e62 모듈을 불러오면 등록됨) · help_figs_e62_N.lfig(자세한 설명) · AFIG(다시 묻기)
   통과 기준  ../새앱/pass_e62.NEED · 블랙홀 blackhole_e62
   소단원 번호 app/data/units_e6-2.json — 옛 앱 GRADES 의 unit id·label(옛 선생님 화면이 새 기록을 읽게)
 질문 번호: <소단원 코드>:r<회차>-<회차 안 순서> (6-2 는 앱에 처음 들어가므로 옛 기록과 이을 것이 없다)
"""
import io, json, os, re, sys, importlib
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
QD = os.path.join(ROOT, '작업도구', '질문설계')
sys.path.insert(0, QD); sys.path.insert(0, HERE)
import e42_common as C, e62_common, app_e62_data as D

G = 'e6-2'
MODS = {n: 'e62_%d' % n for n in range(1, 7)}
def unit(n):
    M = importlib.import_module(MODS[n])
    return getattr(M, 'U%d' % n)
    return [v for k, v in vars(M).items() if re.fullmatch(r'U\d*', k) and isinstance(v, dict)][0]
OLD = json.loads(io.open(os.path.join(ROOT, 'app', 'data', 'units_%s.json' % G), encoding='utf-8').read())
try:   # 옛 회차 데이터의 문제 수(소단원마다 mission 문제 수)
    rt = io.open(os.path.join(ROOT, 'rounds', 'data-%s.js' % G), encoding='utf-8').read()
    ROUNDS = json.loads(rt[rt.index('= {') + 2: rt.rindex('}') + 1])
except Exception: ROUNDS = {}

def clean_svg(h, w=340):
    if not h: return ''
    m = re.search(r'<svg[\s\S]*</svg>', h)
    if not m: return ''
    s = re.sub(r'\swidth="[\d.]+"', '', m.group(0), count=1)
    s = re.sub(r'\sstyle="[^"]*"', '', s, count=1) if s.startswith('<svg style') else s
    return s.replace('<svg ', '<svg class="fig" style="max-width:100%%;width:%dpx;height:auto" ' % w, 1)

def qfig(q):
    if len(q) > 5 and q[5]:
        h = C.fig(q[5]); m = re.search(r'width:(\d+)px', h); w = int(m.group(1)) if m else 300
        return clean_svg(h, min(max(w, 240), 420))
    return ''

def tap_steps(st):
    """D.TAP 단계 → 앱 모양 {mode, q, ans, hint, cards?}"""
    out = []
    for s in st:
        o = {'mode': s[0], 'q': s[1], 'ans': s[2], 'hint': s[3]}
        if len(s) > 4: o['cards'] = list(s[4])
        out.append(o)
    return out

CALC = re.compile(r'\d+(?:\.\d+)?(?:/\d+)?\s*[+−\-×÷]\s*\d|몇 cm|몇 °|몇 도|얼마|구해|구하는')
out = {'grade': G, 'code': 'E6-2', 'name': '6학년 2학기', 'oldName': OLD['name'], 'bigs': []}
n = {'q': 0, 'lad': 0, 'fig': 0, 'lfig': 0, 'afig': 0, 'calc': 0, 'tap': 0, 'path': 0, 'word': 0}
TAP = getattr(D, 'TAP', {})
used_tap = set()
for ui in range(1, 7):
    U = unit(ui)
    H = D.apply_alt(importlib.import_module('help_e62_%d' % ui).H)
    LF = importlib.import_module('help_figs_e62_%d' % ui)
    AF = getattr(LF, 'AFIG', {})
    big = {'no': ui, 'code': 'E6-2-%d' % ui, 'smalls': []}
    for si, s in enumerate(U['smalls'], 1):
        tag = '%d-%s' % (ui, s['no'])
        old = [u for u in OLD['units'] if u['big'].startswith('%d.' % ui) and u['small'].startswith(s['no'] + '.')]
        assert len(old) == 1, (tag, old)
        old = old[0]
        if not big.get('title'): big['title'] = old['big'].split('. ', 1)[1]
        rkey = '%s|%s|%s' % (G, old['big'], old['small'])
        code = 'E6-2-%d-%d' % (ui, si)
        a = [q for q in s['qs'] if q[0] < 3]; b = [q for q in s['qs'] if q[0] == 3]
        assert len(a) == len(H[tag]) == len(D.KEYS[tag]), (tag, len(a), len(H[tag]), len(D.KEYS[tag]))
        items, cnt = [], {}
        for i, q in enumerate(a):
            h = H[tag][i]; r = max(1, q[0]); cnt[r] = cnt.get(r, 0) + 1
            ag = dict(h['again'])
            afn = AF.get((tag, i))
            ag['fig'] = clean_svg(afn()) if afn else ''
            if afn: n['afig'] += 1
            lf = clean_svg(LF.lfig(tag, i), 360)
            if lf: n['lfig'] += 1
            calc = bool(CALC.search(q[2]))
            it = {'id': '%s:r%d-%d' % (code, r, cnt[r]), 'r': r, 'pre': (D.PRE_FROM.get(tag, '') if q[0] == 0 and hasattr(D, 'PRE_FROM') else ''),
                  'q': q[2], 'ans': q[3], 'keys': D.KEYS[tag][i], 'fig': qfig(q), 'calc': calc,
                  'help': {'ask': h['ask'], 'again': ag, 'kw': h['kw'], 'short': h['short'], 'long': h['long'], 'lfig': lf, 'src': h.get('src', ''),
                           **({'word': list(h['word'])} if h.get('word') else {})}}
            assert len(h['ask']) == len(it['keys']), (tag, i, '되묻기 수 ≠ 핵심 수')
            tp = TAP.get((tag, '12', i))
            if tp: it['tap'] = tap_steps(tp); used_tap.add((tag, '12', i)); n['tap'] += 1
            n['word'] += bool(h.get('word'))
            if it['fig']: n['fig'] += 1
            n['calc'] += calc; n['q'] += 1
            items.append(it)
        steps = []
        for j, q in enumerate(b):
            L = D.LAD[tag][j]; g = D.G[tag][j]
            assert len(g) == len(q[4]), (tag, j)
            st = {'id': 'ladder:%s:%d' % (rkey, j + 1), 'q': q[2], 'src': q[1],
                  'ideas': [{'t': g[k], 'ask': q[4][k]} for k in range(len(g))],
                  'teach': ' '.join(L['ideas']), 'again': L['again'], 'record': L['record'], 'miscon': L['miscon'], 'fig': qfig(q)}
            pt = getattr(D, 'LADPATH', {}).get((tag, j))
            if pt:
                st['paths'] = [{'name': p['name'], 'ideas': [{'t': p['g'][k], 'ask': p['ask'][k]} for k in range(len(p['g']))]} for p in ([pt] if isinstance(pt, dict) else pt)]
                n['path'] += 1
            tp = TAP.get((tag, '3', j))
            if tp: st['tap'] = tap_steps(tp); used_tap.add((tag, '3', j)); n['tap'] += 1
            if st['fig']: n['fig'] += 1
            steps.append(st); n['lad'] += 1
        big['smalls'].append({'no': s['no'], 'code': code, 'title': old['small'].split('. ', 1)[1], 'page': s.get('page', ''),
                              'key': rkey, 'unitId': old['id'], 'unitLabel': old['label'],
                              'quiz': (ROUNDS.get(rkey) or {}).get('quiz', {'1': 2, '2': 2}), 'items': items, 'ladder': steps})
    out['bigs'].append(big)
assert used_tap == set(TAP), ('누르기 단계가 질문에 안 붙음', set(TAP) - used_tap)

import blackhole_e62
blackhole_e62.build(out['bigs'])

import pass_e62
for sub, need in pass_e62.NEED:
    hit = [it for b_ in out['bigs'] for s_ in b_['smalls'] for it in s_['items'] if sub in it['q']]
    if not hit:   # 다시 묻기 질문에 붙인 기준(다시 묻기 문장도 따로 적었다)
        agh = [it for b_ in out['bigs'] for s_ in b_['smalls'] for it in s_['items'] if sub in it['help']['again'].get('q', '')]
        assert len(agh) == 1, ('통과 기준 질문을 하나로 못 찾음', sub, len(agh))
        assert all(0 <= k < len(agh[0]['help']['again']['keys']) for gg in need for k in gg), sub
        agh[0]['help']['again']['need'] = need; n['need'] = n.get('need', 0) + 1
        continue
    assert len(hit) == 1, ('통과 기준 질문을 하나로 못 찾음', sub, len(hit))
    it = hit[0]
    assert all(0 <= k < len(it['keys']) for gg in need for k in gg), sub
    it['need'] = need
    ag = it['help']['again']
    if ag.get('keys') and len(ag['keys']) == len(it['keys']): ag['need'] = need
    n['need'] = n.get('need', 0) + 1

ids = [it['id'] for b_ in out['bigs'] for s_ in b_['smalls'] for it in s_['items']] + [st['id'] for b_ in out['bigs'] for s_ in b_['smalls'] for st in s_['ladder']]
assert len(ids) == len(set(ids)), '질문 번호 겹침'
js = ('/* 새 앱 데이터 — 초6-2. 만들기: 작업도구/새앱/build_data_e62.py (직접 고치지 말 것) */\n'
      'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA["%s"] = %s;\n' % (G, json.dumps(out, ensure_ascii=False)))
p = os.path.join(ROOT, 'app', 'data', '%s.js' % G)
io.open(p, 'w', encoding='utf-8', newline='\n').write(js)
print(n, '%.0f KB' % (len(js.encode('utf-8')) / 1024))
