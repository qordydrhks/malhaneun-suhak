# -*- coding: utf-8 -*-
"""중3-1 이차함수 견본 2판 — 완성본 A4 PDF 그리기(공통). 원천 파일(m31_quad.py 등)이 질문 U · 계단 L · 문제 MS 를 넘긴다.
   카드 한 장 = 질문 · 모범 답 · 꼭 말할 핵심(통과 기준) · 조작 단계(누르기·카드·그리기) · 되묻기 · 다시 묻기 · 키워드 · 간단한/자세한 설명 · 다른 풀이 길
"""
import html, re
from fractions import Fraction as Fr

SKIP = {'mission', 'hard', 'sympy', 'html', 'try', 'paths', 'cm', 'svg'}
def _ital(t):
    # 소문자 묶음(ax, bx, abc)은 글자마다 기울임 — 낱말(mission 등)과 HTML 엔티티(&lt;)는 그대로
    return re.sub(r'(?<![&#A-Za-z])([a-z]+)(?![A-Za-z;])', lambda m_: m_.group(1) if m_.group(1) in SKIP else ''.join('<i>%s</i>' % ch for ch in m_.group(1)), t)
def it(s): return _ital(html.escape(str(s), quote=False))
def ith(h):
    """HTML 조각의 글자 부분만 기울임(태그는 그대로)"""
    return ''.join(x if x.startswith('<') else _ital(x) for x in re.split(r'(<[^>]+>)', h))
def mf(s):
    """교재 글씨체 — 홑 소문자는 기울임, {분자|분모}는 세운 분수, 점 이름(대문자)은 세움"""
    out = []
    for pt in re.split(r'(\{[^{}|]+\|[^{}|]+\})', str(s)):
        m_ = re.fullmatch(r'\{([^{}|]+)\|([^{}|]+)\}', pt)
        out.append('<span class="fr"><span>%s</span><span>%s</span></span>' % (it(m_.group(1)), it(m_.group(2))) if m_ else it(pt))
    return ''.join(out)

KIND = {'B': ('기초', 'kB'), 'K': ('개념', 'kK'), 'P': ('과정 이해·증명', 'kP'), 'T': ('유형', 'kT')}
CIRC = '①②③④⑤⑥'
SK = {'card': '🃏 카드 고르기', 'gcard': '🃏 그래프 카드', 'tap': '👆 그래프 누르기', 'grid': '👆 점 찍기', 'draw': '✏️ 대강 그리기', 'say': '🗣 짧은 말',
      'input': '⌨ 칸 입력', 'choice': '☑ 고르기', 'multi': '☑ 여러 개 고르기'}

CSS = '''@page{size:A4;margin:10mm 11mm}
*{box-sizing:border-box}body{font:9.2pt/1.5 "Pretendard","Malgun Gothic",sans-serif;color:#1f2430;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
i{font-family:"Cambria Math","Times New Roman",serif;font-size:1.06em}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.84em;line-height:1.05;margin:0 1px}.fr span:first-child{border-bottom:1px solid currentColor;padding:0 2px}
h1{font-size:15pt;margin:0}.sub{color:#5b6270;font-size:8.6pt;margin:2px 0 6px}
.box{border:1px solid #d6dae2;border-radius:6px;padding:6px 10px;margin:5px 0;background:#fafbfc;font-size:8.8pt}.box ul,.box ol{margin:2px 0;padding-left:18px}
.box.ask{border-color:#e7c27a;background:#fffaf0}.idea{border-left:4px solid #2f5fb3}
.sum{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}.chip{display:inline-block;font-size:8.3pt;padding:0 8px;border-radius:99px;border:1px solid currentColor;white-space:nowrap}
.r1{color:#2563eb}.r2{color:#6d3fd0}.r3{color:#b45309}.kB{color:#4d7c0f}.kK{color:#0f766e}.kP{color:#9d174d}.kT{color:#1d4ed8}
table{width:100%;border-collapse:collapse}td,th{vertical-align:top}
.tt td,.tt th{border:1px solid #d6dae2;padding:2px 6px;font-size:8.3pt;text-align:left}.tt th{background:#f3f5f9}
.sec{break-before:page;font-size:13pt;font-weight:800;margin:0 0 4px;padding:3px 9px;border-left:6px solid currentColor;background:#f7f8fb}
.secn{font-size:8.6pt;color:#5b6270;margin:0 0 6px 4px}
.card{border:1px solid #cfd4dd;border-radius:8px;margin:7px 0;break-inside:auto}tr{break-inside:avoid}.hd,.qrow{break-inside:avoid;break-after:avoid}.mk{break-before:avoid}
.card.L{border-color:#e2c48f}
.hd{display:flex;gap:7px;align-items:flex-start;padding:6px 9px;background:#f3f4f7}.L .hd{background:#fff7ec}
.rn{flex:none;font-size:8pt;font-weight:700;border-radius:99px;padding:1px 7px;color:#fff;margin-top:2px}.rn.r1{background:#2563eb}.rn.r2{background:#6d3fd0}.rn.r3{background:#b45309}
.kd{flex:none;font-size:7.8pt;font-weight:700;border:1px solid currentColor;border-radius:99px;padding:0 6px;margin-top:2px}
.ty{flex:none;font-size:7.8pt;color:#5b6270;border:1px dashed #9aa3b2;border-radius:99px;padding:0 6px;margin-top:2px}
.q{font-weight:700;font-size:10pt;flex:1}.q .no{color:#5b6270;margin-right:4px}.src{font-size:7.9pt;color:#5b6270;font-weight:400;margin-top:1px}
.qf{padding:4px 9px 2px;display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap}.qf svg{max-width:100%;height:auto}
.qrow{display:flex;gap:10px;align-items:flex-start;padding:2px 9px}.qrow .qtx{flex:1}.qrow svg{width:170px;height:auto}
.af{display:flex;gap:10px;align-items:center}.af .aft{flex:1}.af svg{width:125px;height:auto}.af .gc svg{width:88px}
.lf svg{width:205px;height:auto}.lf svg.wide{width:310px}.lf .trio svg{width:105px}.gc svg{width:96px;height:auto}
div.items{margin:2px 0 2px 14px;font-size:9.2pt}
.cap{font-size:7.6pt;color:#5b6270;text-align:center}
td.k{width:76px;color:#5b6270;font-size:8.2pt;font-weight:700;white-space:nowrap;border-top:1px solid #e3e6ec;padding:4px 9px}
td.v{border-top:1px solid #e3e6ec;padding:4px 9px}
.key{display:block}.key .n{color:#b45309;font-weight:700;margin-right:3px}.need{display:block;font-size:7.9pt;color:#15803d}
.kw span{display:inline-block;border:1px solid #e7c27a;border-radius:99px;padding:0 7px;margin:0 4px 2px 0;font-size:8.4pt;background:#fffaf0}
.st{width:100%}.st td{border-top:1px dotted #e3e6ec;padding:2px 4px;font-size:8.5pt}.st td.sk{width:98px;color:#6d3fd0;font-weight:700;white-space:nowrap}
.st .ok{color:#15803d}.st .tr{color:#8a1c16;font-size:8pt}.st .a{color:#5b6270;font-size:8pt}
.shots{display:flex;gap:10px;margin:2px 0}.shots div{text-align:center}.shots svg{width:118px;height:auto}
.lf{margin:3px 0 1px;padding:5px 8px 3px;border:1px solid #eadfc8;border-radius:6px;background:#fffdf8;display:flex;gap:12px;align-items:center;flex-wrap:wrap}.lf .tx{flex:1;min-width:170px}
.af{margin:3px 0;padding:4px 8px;border:1px dashed #b9c3d6;border-radius:6px;background:#fbfcff}
.trio{display:flex;gap:8px;flex-wrap:wrap}
.gcs{display:flex;gap:6px;flex-wrap:wrap}.gc{border:1px solid #d6dae2;border-radius:6px;padding:1px 2px 2px;text-align:center;background:#fff}.gc b{display:block;font-size:9pt;margin-top:-4px}.gc.hot{border:2px solid #E07B39}
.sbox td{border:1px solid #eadfc8;padding:2px 6px;font-size:8.6pt}.sbox td:first-child{color:#5b6270;width:46%}
.lad td{border-top:1px solid #f0e4cf;padding:3px 8px;font-size:8.6pt;vertical-align:top}.lad td.no{width:22px;color:#b45309;font-weight:800;text-align:center}
.lad .g{font-weight:700}.lad .a{color:#5b6270}.lad .t{color:#374151}
td.note{background:#fff4f2;color:#8a1c16;font-size:8.3pt}
.mk{font-size:8.2pt;color:#5b6270;padding:3px 9px;border-top:1px dashed #d6dae2;display:flex;gap:8px;align-items:flex-end}.mk .ln{flex:1;border-bottom:1px solid #aab;height:11px}
.ms{border:1px solid #cfd4dd;border-radius:8px;margin:6px 0;padding:6px 10px;break-inside:avoid}
.ms .h{display:flex;gap:6px;align-items:center;font-size:8.2pt;margin-bottom:2px}.ms .b{border-radius:99px;padding:0 7px;background:#eef1f6;font-weight:700}.ms .b.hard{background:#fde7d8;color:#9a3412}
.chs{display:flex;flex-wrap:wrap;gap:3px 16px;margin:3px 0 2px 6px}.chs .okc{color:#15803d;font-weight:700}
.ms .qf svg{width:200px;height:auto}.ex{font-size:8.5pt;color:#374151;margin-top:2px}.wr{font-size:8.1pt;color:#8a1c16;margin-top:1px}
.lines .ln{display:block;border-bottom:1px solid #c9a36b;height:15px}
'''

NUMOF = {}
def need_txt(qd):
    nd = qd.get('need')
    if not nd: return '통과 기준: 모두 말하면 통과'
    return '통과 기준: ' + ' · '.join('+'.join(CIRC[i] for i in grp) for grp in nd) + '만 꼭 — 나머지는 덧붙이면 좋은 것(통과 뒤 모범 답으로 보여 줌)'

def step_rows(steps):
    o = ['<table class="st">']; seen = set()
    for s in steps:
        want = s.get('want')
        if s['k'] == 'grid': w = '(%s, %s)' % tuple(str(v).replace('-', '−') for v in want)
        elif s['k'] == 'draw': w = '꼭짓점 근처를 지나고, 볼록한 방향이 맞고, y절편 근처를 지나면 통과 → 바른 그래프를 겹쳐 보여 줌'
        elif isinstance(want, (list, tuple)): w = ' · '.join(mf((s.get('names') or {}).get(v, v)) for v in want)
        else: w = mf(want or '')
        tr = s.get('trap') or {}
        trs = ' · '.join('<b>%s</b> %s' % (mf((s.get('names') or {}).get(kk, kk)), mf(vv)) for kk, vv in tr.items())
        extra = ''
        if s['k'] in ('card', 'multi', 'choice'):
            extra = '<br><span class="a">보기: %s</span>' % ' · '.join(mf(v) for v in (s.get('deck') or s.get('opts')))
        if s['k'] == 'gcard' and s.get('cards'):
            extra = '<div class="gcs" style="margin:2px 0">%s</div>' % s['cards_html'] if s.get('cards_html') else ''
        shots = ''
        if s.get('fig') and s['k'] in ('tap', 'grid', 'draw'):
            hot = set(want) if s['k'] == 'tap' else set(s['hot']) if isinstance(s.get('hot'), (list, tuple, set)) else {s.get('hot')}
            kid = '' if s['fig'] in seen else '<div>%s<div class="cap">아이 화면</div></div>' % s['fig']()
            seen.add(s['fig'])
            shots = '<div class="shots">%s<div>%s<div class="cap">정답(주황)</div></div></div>' % (kid, s['fig'](hot))
        o.append('<tr><td class="sk">%s</td><td>%s%s<br><span class="ok">→ %s</span>%s%s</td></tr>' % (
            SK[s['k']], mf(s['p']), extra, w, ('<br><span class="tr">함정 · %s</span>' % trs) if trs else '', shots))
    o.append('</table>')
    return ''.join(o)

def lbox(rows): return '<table class="sbox">' + ''.join('<tr><td>%s</td><td>%s</td></tr>' % (mf(a_), mf(b_)) for a_, b_ in rows) + '</table>'
def items_html(items):
    if not items: return ''
    if items[0][:1] in 'ㄱㄴㄷㄹ': return '<div class="qf" style="display:block">' + '<br>'.join(mf(v) for v in items) + '</div>'
    return '<div class="items">' + ''.join('<div>%s %s</div>' % (CIRC[i], mf(v)) for i, v in enumerate(items)) + '</div>'

def qcard(qd):
    n = NUMOF[qd['id']]; r = qd['r']; kd = KIND[qd['kind']]
    o = ['<div class="card"><div class="hd"><span class="rn r%d">%d회차</span><span class="kd %s">%s</span>%s<div class="q"><span class="no">%d.</span>%s<div class="src">근거 · %s</div></div></div>'
         % (r, r, kd[1], kd[0], ('<span class="ty">쎈 유형 %s</span>' % qd['ty']) if qd.get('ty') else '', n, mf(qd['q']), html.escape(qd['src']))]
    if qd.get('fig') or qd.get('items'): o.append('<div class="qrow"><div class="qtx">%s</div>%s</div>' % (items_html(qd.get('items')), qd.get('fig', '')))
    if qd.get('fhtml'): o.append('<div class="qf">%s</div>' % qd['fhtml'])
    rows = [('모범 답', mf(qd['ans'])),
            ('꼭 말할 핵심', ''.join('<span class="key"><span class="n">%s</span>%s</span>' % (CIRC[i], mf(v)) for i, v in enumerate(qd['keys'])) + '<span class="need">%s</span>' % need_txt(qd))]
    if qd.get('steps'): rows.append(('조작 단계', '<span class="a" style="font-size:8pt;color:#5b6270">말은 생각만, 식·그래프는 손으로 — 한 단계씩, 끝난 단계는 한 줄로 접힘 · 단계마다 두 번 틀리면 설명을 보고 넘어감(기록: 혼자 / 되묻기 뒤 / 설명 보고 + 고른 함정)</span>' + step_rows(qd['steps'])))
    rows.append(('되묻기', ''.join('<span class="key"><span class="n">%s 빠지면</span>%s</span>' % (CIRC[i], mf(v)) for i, v in enumerate(qd['asks']))))
    ag = qd['again']
    agh = '<div class="af"><div class="aft"><b>%s</b>%s%s<div style="color:#374151">→ %s</div></div>%s</div>' % (
        mf(ag['q']), items_html(ag.get('items')), ('<div class="gcs">%s</div>' % ag['fhtml']) if ag.get('fhtml') else '', mf(ag['ans']), ag.get('fig', ''))
    rows.append(('다시 묻기', agh))
    rows.append(('키워드', '<span class="kw">' + ''.join('<span>%s</span>' % mf(v) for v in qd['kw']) + '</span>'))
    rows.append(('간단한 설명', mf(qd['short'])))
    rows.append(('자세한 설명', '<div class="lf"><div class="tx">%s</div>%s%s%s</div>' % (mf(qd['long']), qd.get('lfig', ''), qd.get('lhtml', ''), lbox(qd['lbox']) if qd.get('lbox') else '')))
    if qd.get('paths'): rows.append(('다른 풀이 길', mf(qd['paths'])))
    if qd.get('word'): rows.append(('📖 통과 뒤', mf(qd['word'])))
    if qd.get('note'): rows.append(('채점 주의', mf(qd['note'])))
    o.append('<table>' + ''.join('<tr><td class="k">%s</td><td class="v%s">%s</td></tr>' % (k_, ' note' if k_ == '채점 주의' else '', v_) for k_, v_ in rows) + '</table>')
    o.append('<div class="mk">☐ 좋아요 ☐ 고침 ☐ 뺌<span class="ln"></span></div></div>')
    return ''.join(o)

def lcard(ld):
    n = NUMOF[ld['id']]; kd = KIND[ld['kind']]
    o = ['<div class="card L"><div class="hd"><span class="rn r3">3회차</span><span class="kd %s">%s</span><span class="ty">쎈 유형 %s</span><div class="q"><span class="no">%d.</span>%s<div class="src">근거 · %s</div></div></div>'
         % (kd[1], kd[0], ld['ty'], n, mf(ld['q']), html.escape(ld['src']))]
    if ld.get('fig'): o.append('<div class="qrow"><div class="qtx"></div>%s</div>' % ld['fig'])
    if ld.get('fhtml'): o.append('<div class="qf">%s</div>' % ld['fhtml'])
    lad = ['<table class="lad">'] + ['<tr><td class="no">%s</td><td><div class="g">%s</div><div class="a">💬 되묻기 · %s</div><div class="t">📘 간단한 설명 · %s</div></td></tr>'
                                     % (CIRC[i], mf(d['g']), mf(d['ask']), mf(d['teach'])) for i, d in enumerate(ld['ideas'])] + ['</table>']
    rows = [('계단', ''.join(lad) + '<div style="font-size:8pt;color:#5b6270">아이디어(숫자 없는 전략)를 모두 짚으면 통과 · 빠진 아이디어마다 되묻기 → 그래도 못 하면 간단한 설명 → 다음 날 다시 묻기</div>'),
            ('모범 답', mf(ld['ans']))]
    if ld.get('steps'): rows.append(('조작 단계', step_rows(ld['steps'])))
    if ld.get('paths'): rows.append(('다른 풀이 길', ''.join('<div><b>%s</b> — %s</div>' % (html.escape(p['name']), ' → '.join(mf(g) for g in p['g'])) for p in ld['paths'])
                                     + '<div style="font-size:8pt;color:#5b6270">어느 길이든 그 길의 아이디어를 다 짚으면 통과(앱 paths)</div>'))
    rows += [('다시 묻기', '<div class="af"><b>%s</b><div>→ %s</div></div>' % (mf(ld['again']['q']), mf(ld['again']['ans']))),
             ('흔한 오해', mf(ld['miscon'])), ('어른 기록', mf(ld['record']))]
    if ld.get('word'): rows.append(('📖 통과 뒤', mf(ld['word'])))
    if ld.get('note'): rows.append(('채점 주의', mf(ld['note'])))
    o.append('<table>' + ''.join('<tr><td class="k">%s</td><td class="v%s">%s</td></tr>' % (k_, ' note' if k_ == '채점 주의' else '', v_) for k_, v_ in rows) + '</table>')
    o.append('<div class="mk">☐ 좋아요 ☐ 고침 ☐ 뺌<span class="ln"></span></div></div>')
    return ''.join(o)

def mscard(p, i, cardfn):
    lvn = ('mission %d (기본)' if p['lv'] == 'basic' else 'hard mission %d (응용)') % p['r']
    o = ['<div class="ms"><div class="h"><span class="b">%d</span><span class="b%s">%s</span><span style="color:#5b6270">%s</span></div><div><b>%s</b></div>'
         % (i, ' hard' if p['lv'] == 'hard' else '', lvn, html.escape(p['src']), mf(p['stem']))]
    if p['fig']: o.append('<div class="qf">%s</div>' % p['fig'])
    if p['gch']:
        cs = []
        xl = min(min(P for _, P, _ in p['choices']), 0) - 2.6; xh = max(max(P for _, P, _ in p['choices']), 0) + 2.6   # 다섯 카드가 같은 배율
        for j, (A, P, Q_) in enumerate(p['choices']):
            C_ = A * P * P + Q_; lo, hi = min(Q_, C_, 0) - 1.5, max(Q_, C_, 0) + 1.5
            svg = cardfn('MS%d.%d' % (i, j), A, P, Q_, (xl, xh), (lo, hi), w=104, sy=min(104 / (xh - xl), 110 / (hi - lo)), ticks=(p['gch'] is True))
            cs.append('<div class="gc%s">%s<b>%s%s</b></div>' % (' hot' if j == p['answer'] else '', svg, CIRC[j], ' ✔' if j == p['answer'] else ''))
        o.append('<div class="gcs">' + ''.join(cs) + '</div>')
    else:
        o.append('<div class="chs">' + ''.join('<span class="%s">%s %s%s</span>' % ('okc' if j == p['answer'] else '', CIRC[j], mf(c_), ' ✔' if j == p['answer'] else '') for j, c_ in enumerate(p['choices'])) + '</div>')
    o.append('<div class="ex">해설 · %s</div>' % mf(p['explain']))
    o.append('<div class="wr">오답이 뜻하는 것 → %s</div>' % ' · '.join('<b>%s</b> %s' % (CIRC[k_], mf(v_)) for k_, v_ in sorted(p['wrong'].items())))
    o.append('</div>')
    return ''.join(o)

def type_table(U, L, MS, names, sseen):
    rows = []
    for t_ in sorted(names):
        r1 = [NUMOF[q['id']] for q in U if q['r'] == 1 and q.get('ty') == t_]
        r2 = [NUMOF[q['id']] for q in U if q['r'] == 2 and q.get('ty') == t_]
        r3 = [NUMOF[l['id']] for l in L if l['ty'] == t_]
        ms = ['%s%d' % ('mission ' if p['lv'] == 'basic' else 'hard ', p['r']) for p in MS if ('유형' + t_) in p['src']]
        assert r1 and r2, ('유형 빠짐', t_)
        rows.append('<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>' % (
            t_, mf(names[t_]), sseen[t_], ', '.join(map(str, r1)), ', '.join(map(str, r2)), ', '.join(map(str, r3)) or '—', ' · '.join(ms) or '—'))
    return ('<table class="tt"><tr><th>쎈 유형</th><th>이름</th><th>쎈 문제</th><th>1회차 질문</th><th>2회차 질문</th><th>3회차 계단</th><th>문제 세트</th></tr>' + ''.join(rows) + '</table>')

def number(U, L):
    k_ = 0
    for r in (1, 2):              # 화면에 나오는 순서(회차 → 기초·개념·과정·유형)대로 번호
        for kk in KIND:
            for q in [q for q in U if q['r'] == r and q['kind'] == kk]: k_ += 1; NUMOF[q['id']] = k_
    for kk in KIND:
        for l in [l for l in L if l['kind'] == kk]: k_ += 1; NUMOF[l['id']] = k_

def body(U, L, MS, cardfn, notes):
    o = []
    for r in (1, 2):
        o.append('<div class="sec r%d">%d회차</div><div class="secn">%s</div>' % (r, r, notes[r]))
        for kk in KIND:
            for q in [q for q in U if q['r'] == r and q['kind'] == kk]: o.append(qcard(q))
    o.append('<div class="sec r3">3회차 — 계단</div><div class="secn">%s</div>' % notes[3])
    for kk in KIND:
        for l in [l for l in L if l['kind'] == kk]: o.append(lcard(l))
    o.append('<div class="sec">기본·응용 문제 세트 (mission · hard mission)</div><div class="secn">회차마다 mission 3 + hard mission 3 · 5지선다(그래프 보기 포함) · 정답 위치 ①~⑤ 고르게 · 오답마다 「이 답이 뜻하는 실수」 · 숫자 모두 새로 · 검산</div>')
    for i, p in enumerate(MS, 1): o.append(mscard(p, i, cardfn))
    return ''.join(o)
