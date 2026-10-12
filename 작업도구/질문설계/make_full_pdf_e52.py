# -*- coding: utf-8 -*-
"""초5-2 '완성본' 검토용 A4 PDF — 질문 카드 하나에 설계 + 도움(1·2회차) / 계단(3회차)을 모두 (2026-10-12)
   python -X utf8 make_full_pdf_e52.py 1  → 작업도구/질문설계/완성본_초5-2_1단원.pdf
   원천: e52_<n>.py(질문·모범 답·되묻기) · app_e52_data.py(KEYS·LAD·G) · help_e52_<n>.py(도움) · help_figs_e52_<n>.py(그림)
         · ../새앱/pass_e52.py(통과 기준). make_help_pdf.py 를 본떴다.
"""
import html, importlib, os, re, sys
import e42_common as C, app_e52_data as D
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '새앱'))
import pass_e52 as P
e = html.escape
n = sys.argv[1] if len(sys.argv) > 1 else '1'
M = importlib.import_module('e52_%s' % n)          # 그림 등록(K.register)도 여기서 된다
U = [v for k, v in vars(M).items() if re.fullmatch(r'U\d*', k) and isinstance(v, dict)][0]
H = importlib.import_module('help_e52_%s' % n).H
LF = importlib.import_module('help_figs_e52_%s' % n)
RN = {0: '🌱 선수', 1: '1회차', 2: '2회차', 3: '3회차'}
TOPIC_PAGE = {'①': 14, '②': 15, '③': 16, '④': 17, '⑤': 18, '⑥': 19, '⑦': 20, '⑧': 21, '⑨': 22, '⑩': 23}   # 최상위 5-2 1단원
TOPIC_PAGES = {'1': TOPIC_PAGE}

CSS = '''@page{size:A4;margin:10mm 11mm}
body{font:9.2pt/1.5 "Pretendard","Malgun Gothic",sans-serif;color:#1f2430;margin:0}
h1{font-size:15.5pt;margin:0}.sub{color:#5b6270;font-size:8.8pt;margin:2px 0 6px}
.box{border:1px solid #d6dae2;border-radius:6px;padding:6px 9px;margin:5px 0;background:#fafbfc;font-size:8.7pt}
.box b{font-weight:700}.ask{border-color:#e7c27a;background:#fffaf0}
.sm{break-before:page}.sm.first{break-before:auto}
h2{font-size:12pt;margin:4px 0 4px;padding-bottom:3px;border-bottom:2px solid #1f2430;break-after:avoid}
h2 .pg{font-size:8.6pt;color:#5b6270;font-weight:400;margin-left:6px}
.core{font-size:8.6pt;margin:3px 0 6px;display:grid;grid-template-columns:1fr 1fr;gap:3px 12px}
.core div{break-inside:avoid}.core .c{color:#2f5fb3;font-weight:700}.core .st{color:#8a5a00}
h3{font-size:9.6pt;margin:9px 0 3px;color:#5b6270;break-after:avoid}
.card{border:1px solid #cfd4dd;border-radius:8px;margin:7px 0;break-inside:avoid;overflow:hidden}
.card.r3{border-color:#c9bdf0}
.hd{display:flex;gap:8px;align-items:flex-start;padding:6px 9px;background:#f3f4f7}
.r3 .hd{background:#f5f2ff}
.rn{flex:none;font-size:8pt;font-weight:700;border-radius:99px;padding:1px 7px;background:#1f2430;color:#fff;margin-top:1px}
.rn.r0{background:#3f8f4f}.rn.r2{background:#2f5fb3}.rn.r3{background:#6b4fc4}
.q{font-weight:700;font-size:10pt}.ans{font-size:8.7pt;color:#374151;margin-top:2px}
.fig{flex:none;width:170px}.fig svg{width:100%;height:auto}.fig .fig{width:auto}
.fig div{float:none!important;margin:0!important;width:auto!important}
.qf{margin:2px 0 4px 64px}.qf div{float:none!important;margin:0!important;width:auto!important}.qf svg{width:100%;height:auto}
table{width:100%;border-collapse:collapse}td{border-top:1px solid #e3e6ec;padding:4px 9px;vertical-align:top}
td.k{width:78px;color:#5b6270;font-size:8.3pt;font-weight:700;white-space:nowrap}
.key{display:inline-block;margin-right:10px}.n{color:#b45309;font-weight:700}
.it td.k{color:#8a5a00}.kw span{display:inline-block;border:1px solid #e7c27a;border-radius:99px;padding:0 7px;margin:0 4px 2px 0;font-size:8.5pt;background:#fffaf0}
.pass{font-size:8pt;color:#15803d;margin-left:4px}
.mk{font-size:8.3pt;color:#5b6270;text-align:right;padding:3px 9px;border-top:1px dashed #d6dae2}
.src{font-size:8pt;color:#5b6270;margin-top:1px}
.lf{margin:5px 0 2px;padding:6px 8px 4px;border:1px solid #eadfc8;border-radius:6px;background:#fffdf8}.lf svg{display:block;max-width:100%}.af{border-style:dashed;background:#fbfcff}
.step td{font-size:8.6pt}.step td.no{width:22px;color:#6b4fc4;font-weight:700;text-align:center}
.step .g{color:#1f2430}.step .t{color:#5b6270}
.adult td{font-size:8.4pt;background:#fbfbfd}'''

CIRC = '①②③④⑤'

def need_of(q):
    hits = [nd for sub, nd in P.NEED if sub in q]
    return hits[0] if len(hits) == 1 else None

def need_note(nd, k):
    if not nd: return '핵심을 모두 말해야 통과'
    g = nd[0]
    if len(g) > 1: return '%s 중 하나만 말해도 통과(같은 것을 다르게 말한 핵심)' % '·'.join(CIRC[j] for j in g)
    return '%s만 꼭 말하면 통과(나머지는 덧붙이면 좋은 것)' % CIRC[g[0]]

def qfig(q):
    """질문 그림 — 좁으면 오른쪽(fig), 넓으면 질문 아래 한 줄(qf)"""
    if len(q) > 5 and q[5]:
        try: h = C.fig(q[5])
        except Exception as ex: return '<div class="fig">[그림 오류 %s]</div>' % e(str(ex)), ''
        m = re.search(r'width:(\d+)px', h); w = int(m.group(1)) if m else 150
        if w > 240: return '', '<div class="qf" style="width:%dpx">%s</div>' % (min(w + 40, 420), h)
        return '<div class="fig">%s</div>' % h, ''
    return '', ''

def card12(q, h, keys, lsvg, asvg):
    a = h['again']; nd = need_of(q[2])
    rows = [
        ('꼭 말할 핵심', ''.join('<span class="key"><span class="n">%s</span> %s</span>' % (CIRC[j], e(k)) for j, k in enumerate(keys))
                       + '<br><span class="pass">✔ %s</span>' % e(need_note(nd, keys))),
        ('되묻기', '<br>'.join('<span class="n">%s 빠지면</span> %s' % (CIRC[j], e(x)) for j, x in enumerate(h['ask']))),
        ('다시 묻기', e(a['q']) + ('<div class="lf af">%s</div>' % asvg if asvg else '') +
                     '<br><span style="color:#5b6270">모범 답: %s</span><br><span style="color:#5b6270">핵심: %s</span>' % (e(a['ans']), ' · '.join(e(k) for k in a['keys']))),
    ]
    items = [
        ('🔑 키워드', '<span class="kw">%s</span>' % ''.join('<span>%s</span>' % e(k) for k in h['kw'])),
        ('짧은 설명', e(h['short'])),
        ('긴 설명', e(h['long']) + ('<div class="lf">%s</div>' % lsvg if lsvg else '')),
    ]
    tr = ''.join('<tr><td class="k">%s</td><td>%s</td></tr>' % r for r in rows)
    ti = ''.join('<tr class="it"><td class="k">%s</td><td>%s</td></tr>' % r for r in items)
    return ('<div class="card"><div class="hd"><span class="rn r%d">%s</span><div style="flex:1"><div class="q">%s</div>'
            '<div class="ans"><b>모범 답</b> %s</div><div class="src">교재 디딤돌 기본+응용 5-2 %s</div></div>%s</div>%s'
            '<table>%s%s</table><div class="mk">☐ 좋아요 &nbsp; ☐ 고침 &nbsp; ☐ 뺌</div></div>') % ((q[0], RN[q[0]], e(q[2]), e(q[3]), e(h.get('src', ''))) + qfig(q) + (tr, ti))

def card3(q, lad, g):
    m = re.search('[①②③④⑤⑥⑦⑧⑨⑩]', q[1]); tp = TOPIC_PAGES.get(n, {})
    src = '최상위 수학 5-2 심화유형 %s(%s쪽)' % (m.group(0), tp.get(m.group(0), '?')) if m else ''
    steps = ''.join('<tr><td class="no">%s</td><td><span class="n">되묻기</span> %s<br><span class="g"><b>짚을 아이디어</b> %s</span><br><span class="t"><b>짧은 설명</b> %s</span></td></tr>'
                    % (CIRC[j], e(q[4][j]), e(g[j]), e(lad['ideas'][j])) for j in range(len(q[4])))
    adult = ('<tr class="adult"><td class="k">다시 묻기</td><td>%s</td></tr>' % e(lad['again']) +
             '<tr class="adult"><td class="k">흔한 틀린 생각</td><td>%s <span style="color:#9ca3af">(예: "%s")</span></td></tr>' % (e(lad['miscon']), e(lad['wrong'])) +
             '<tr class="adult"><td class="k">어른 기록</td><td>%s</td></tr>' % e(lad['record']))
    return ('<div class="card r3"><div class="hd"><span class="rn r3">3회차</span><div style="flex:1"><div class="q">%s</div>'
            '<div class="ans"><b>모범 답</b> %s</div><div class="src">%s · %s</div></div>%s</div>%s'
            '<table class="step">%s</table><table>%s</table><div class="mk">☐ 좋아요 &nbsp; ☐ 고침 &nbsp; ☐ 뺌</div></div>') % ((e(q[2]), e(q[3]), e(q[1]), e(src)) + qfig(q) + (steps, adult))

def build():
    big = U['big']
    c12 = sum(1 for s in U['smalls'] for q in s['qs'] if q[0] < 3); c3 = sum(1 for s in U['smalls'] for q in s['qs'] if q[0] == 3)
    nf = sum(len(v) for v in LF.LFIG.values()) + len(getattr(LF, 'AFIG', {}))
    o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>완성본 초5-2 %s단원</title><style>%s</style></head><body>' % (n, CSS),
         '<h1>초5-2 「%s」 — 완성본 검토</h1>' % e(big),
         '<div class="sub">2026-10-12 · 질문 %d개(1·2회차 %d · 3회차 %d) · 그림 %d장 · 설계규칙.md 「되묻기 · 도움」 표대로 Claude 가 씀 · 질문마다 ☐좋아요 ☐고침 ☐뺌</div>' % (c12 + c3, c12, c3, nf),
         '<div class="box"><b>1·2회차 흐름</b> 질문 → 핵심별 판정 → 다 짚으면 통과 + 모범 답 / 빠진 핵심이 있으면 <b>그 핵심만 되묻기</b>(방향만) → '
         '그래도 모르면 아이가 도움을 고름(🔑 키워드 &lt; 짧은 설명(말로만) &lt; 긴 설명(그림과 함께)) → 설명을 봤으면 다음 날 <b>다시 묻기</b>(숫자·이름만 바꿈)로 통과. '
         '키워드만 보고 맞히면 오늘 통과(점수 조금 낮게). 틀린 생각을 말하면 "살짝 부족해" + 🔑 키워드만.<br>'
         '<b>3회차 흐름(계단)</b> 질문 → 아이디어마다 판정 → 빠진 아이디어는 <b>되묻기</b> → 그래도 막히면 그 아이디어의 <b>짧은 설명</b> → 숫자를 바꾼 <b>다시 묻기</b>(채점은 숫자 없는 "짚을 아이디어"로) → 세 번 막히면 모범 답 + 그날 잠금.</div>',
         '<div class="box ask"><b>봐 주실 것</b> ① 3회차를 <b>최상위 수학 5-2 심화유형 ①~⑩</b>으로 새로 맞춤(10개 유형 모두, 소단원마다 2~3개, 숫자 새로·전부 검산) ② 되묻기가 답을 흘리지 않는지 ③ 짧은·긴 설명이 교재(디딤돌 5-2 8~20쪽) 문장과 맞는지 ④ 통과 기준(✔ 줄) — 질문마다 무엇을 말하면 통과인지<br>'
         '<b>교재</b> 1·2회차 = 디딤돌 기본+응용 5-2 ①권(인쇄 쪽 = PDF 쪽) · 3회차 = 디딤돌 최상위 수학 5-2(인쇄 쪽 = PDF 인덱스 + 1)</div>']
    if U.get('idea'): o.append('<div class="box"><b>단원 큰 그림</b> %s</div>' % e(U['idea']))
    for s in U['smalls']:
        tag = '%s-%s' % (n, s['no'])
        o.append('<div class="sm%s"><h2>%s. %s<span class="pg">디딤돌 %s</span></h2>' % (' first' if s is U['smalls'][0] else '', e(s['no']), e(s['name']), e(s['page'])))
        o.append('<div class="core">%s%s</div>' % (''.join('<div><span class="c">%s</span> %s</div>' % (e(a), e(b)) for a, b in s['core']),
                                                  ''.join('<div class="st">⚠ 막히는 곳: %s</div>' % e(x) for x in s['stuck'])))
        qs = [q for q in s['qs'] if q[0] < 3]
        o.append('<h3>1·2회차</h3>')
        for i, q in enumerate(qs):
            af = getattr(LF, 'AFIG', {}).get((tag, i))
            o.append(card12(q, H[tag][i], D.KEYS[tag][i], LF.lfig(tag, i), af() if af else ''))
        q3 = [q for q in s['qs'] if q[0] == 3]
        if q3:
            o.append('<h3>3회차 — 계단</h3>')
            for j, q in enumerate(q3): o.append(card3(q, D.LAD[tag][j], D.G[tag][j]))
        o.append('</div>')
    o.append('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    print(C.make_pdf(build(), '완성본_초5-2_%s단원' % n))
