# -*- coding: utf-8 -*-
"""초6-2 '완성본' 검토용 A4 PDF — 질문 카드 하나에 설계 + 도움(1·2회차) / 계단(3회차)을 모두 (2026-10-14, make_full_pdf_e52.py 를 6-2 용으로)
   python -X utf8 make_full_pdf_e62.py 1  → 작업도구/질문설계/완성본_초6-2_1단원.pdf
   원천: e62_<n>.py(질문·모범 답·되묻기) · app_e62_data.py(KEYS·LAD·G) · help_e62_<n>.py(도움) · help_figs_e62_<n>.py(그림)
         · ../새앱/pass_e62.py(통과 기준). make_help_pdf.py 를 본떴다.
"""
import html, importlib, os, re, sys
import e42_common as C, app_e62_data as D
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '새앱'))
import pass_e62 as P
import blackhole_e62 as BHM
e = html.escape
n = sys.argv[1] if len(sys.argv) > 1 else '1'
M = importlib.import_module('e62_%s' % n)          # 그림 등록(K.register)도 여기서 된다
U = getattr(M, 'U' + n)
H = D.apply_alt(importlib.import_module('help_e62_%s' % n).H)
LF = importlib.import_module('help_figs_e62_%s' % n)
RN = {0: '🌱 선수', 1: '1회차', 2: '2회차', 3: '3회차'}
TOPIC_PAGES = {'1': {c: 13 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)},
               '2': {c: 39 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)},
               '3': {c: 65 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)},
               '4': {c: 91 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)},
               '5': {c: 117 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)},
               '6': {c: 143 + k for k, c in enumerate('①②③④⑤⑥⑦⑧⑨', 1)}}   # 최상위 6-2 심화유형 쪽(인쇄 쪽 = PDF 인덱스 + 1)
INFO = {'1': ('8~18쪽', '①~⑨', 9), '2': ('38~48쪽', '①~⑨', 9), '3': ('68~78쪽', '①~⑨', 9), '4': ('98~108쪽', '①~⑨', 9), '5': ('130~138쪽', '①~⑨', 9), '6': ('160~166쪽', '①~⑦·⑨(⑧ 부피는 중1 연계라 뺌)', 8)}

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

ALL1019_HEAD = '10/19 초5-2 6단원 검토 기준을 이 단원에도 — ① 모르는 값은 □로 놓고 식을 세워서 ② 반박은 예(반례)를 대도 통과 ③ 판단과 계산을 한 번에 묻지 않기 ④ 답이 주어진 수와 같으면 바꾸기 ⑤ 「가장 먼저」는 ①만 통과·불편하면 구체 상황 ⑥ 막연한 까닭은 구체 상황으로 ⑦ 모범 답은 아이 말로'
ALL1019 = {
 '1': ['01 「어떤 분수를 1/8로 나누었더니 몫이 5」: 모범 답을 <b>□ ÷ 1/8 = 5로 식을 세워서</b>(1/8이 5개인 수로 말해도 통과)',
       '06 「가장 먼저」: 대분수 → 가분수, 분모가 같은지 중 <b>하나만</b> 말해도 통과'],
 '2': ['06 「가장 먼저」: 소수점 옮기기, 몫을 나타내는 방법 중 <b>하나만</b> 말해도 통과'],
 '3': ['06 「가장 먼저」: 보이지 않는 쌓기나무, 어느 방향에서 본 모양인지 중 <b>하나만</b> 말해도 통과'],
 '4': ['06 「가장 먼저」: <b>무엇과 무엇의 비인지(순서)</b>만 말하면 통과'],
 '5': ['05 「가장 먼저」: 반지름/지름, 원주/넓이 중 <b>하나만</b> 말해도 통과'],
 '6': ['03 「모선이 항상 높이보다 긴 까닭」: 막연한 까닭 → <b>「모선이 13 cm인 원뿔의 높이가 13 cm가 될 수 있을까?」</b>',
       '04 「가장 먼저」: 반지름·높이, 지름/반지름 구별 중 <b>하나만</b> 말해도 통과'],
}
ALL1016_HEAD = '10/16 초5-2 4·5단원 검토 기준을 이 단원에도 — ① 방법을 정하지 않은 계산 질문은 답만 맞으면 통과(방법은 덧붙이면 좋은 것) ② 「무엇이 틀렸어?」·고르기는 묻는 것만 ③ 그림 속 이름을 여러 개 대는 질문은 누르기 ④ 블랙홀 3회차는 생활 예 대신 여러 성질을 잇는 문제'
ALL1016 = {
 '1': ['통과 기준: 계산 4문제(어떤 분수 ÷ 1/8 · 2/5 ÷ 3/4 · 4/5는 2/15의 몇 배 · 밀가루 8 kg)는 방법을 정하지 않았으니 답만 맞으면 통과', '블랙홀 3회차: 「끈 4와 1/2 m를 3/4 m씩 — 몇 도막, 무엇을 구하는 나눗셈, 몫이 더 큰 까닭」'],
 '2': ['통과 기준: 계산 8문제(주스 5.4 L · 2.38 ÷ 0.07 · 철사 · 7.56 ÷ 2.1 · 통나무 · 수도 · 반올림 2개)는 답만 맞으면 통과', '블랙홀 3회차: 「쌀 25.6 kg을 3 kg씩 — 8봉지와 1.6 kg, 반올림하면 안 되는 까닭」'],
 '3': ['통과 기준: 「보이지 않는 기둥은 몇 번?」·「몇 번째 줄이 틀렸어?」는 묻는 것(번호·줄과 층)만 말하면 통과', '블랙홀 3회차: 「위·앞·옆 그림만으로 개수를 모를 때가 있는 까닭과 정확히 알려 주는 법」'],
 '4': ['통과 기준: 계산 6문제(후항이 15인 비 · 간단한 자연수의 비 2개 · 비례식 □ · 공책 · 원액)는 답만 맞으면 통과', '블랙홀 3회차: 「빵 6개에 밀가루 450 g — 900 g이면 몇 개(비례식), 형과 동생이 2 : 1로」'],
 '5': ['통과 기준: 계산 5문제(원주의 범위 · 원주로 지름 · 반지름 · 넓이 2개)는 답만 맞으면 통과', '블랙홀 3회차: 「반지름 50 cm 바퀴가 굴러간 거리와 매트 넓이 — 각각 무엇을 구하는 것인지」', '조사: 분수 뒤 조사 3곳'],
 '6': ['통과 기준: 「원기둥 옆면의 넓이」는 답만 · 「반원을 돌린 구」는 어떤 구인지만 말하면 통과', '블랙홀 3회차: 「직사각형을 돌린 원기둥 — 반지름·높이와 전개도 옆면의 가로·세로」'],
}
GEN_REV = ['10/14 마스터 검토 기준 적용(초5-2 1단원 손글씨 검토에서 나온 기준을 %s 전체에)',
  '「짧은 설명 · 긴 설명」 → <b>간단한 설명 · 자세한 설명</b>(앱 이름도 같이 바꿈)',
  '본질이 같은 대답은 통과 — 핵심 옆 <b>(= …)</b>에 같은 뜻의 다른 말을 적음(다시 묻기 핵심에도). 앱 채점 규칙에도 넣음',
  '단원 공통 「가장 먼저 무엇을」 질문을 <b>쉽게 말할 수 있게</b> — "확인해야 해?"로, 핵심 2개를 짧게',
  '맨 끝에 <b>블랙홀 관문</b> — 2회차 정리에 단원에서 가장 중요한 생각, 3회차는 그 단원을 언제 쓰는지 예로',
  '앱: 3회차(은하 탐사) 출발 화면에 "연습장과 연필을 준비하고 출발해!"']

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

TAPMODE = {'fig': '👆 그림에서 누르기', 'card': '🃏 이름 카드 고르기', 'say': '🗣 짧은 말'}
def tap_html(steps):
    """누르기 질문(마스터 10/16 5단원) — 단계마다 방식 · 묻는 말 · 누를 것 · 막히면"""
    return '<br>'.join('<span class="n">%s</span> <b style="color:#0f766e">%s</b> %s<br><span class="g"><b>누를 것(정답)</b> %s%s</span><br><span class="t"><b>막히면</b> %s</span>'
                       % (CIRC[j], TAPMODE[st[0]], e(st[1]), e(st[2]), (' <span style="color:#9ca3af">(카드: %s)</span>' % e(' · '.join(st[4]))) if len(st) > 4 else '', e(st[3])) for j, st in enumerate(steps))

def card12(q, h, keys, lsvg, asvg, tap=None):
    a = h['again']; nd = need_of(q[2])
    rows = [
        ('꼭 말할 핵심', ''.join('<span class="key"><span class="n">%s</span> %s</span>' % (CIRC[j], e(k)) for j, k in enumerate(keys))
                       + '<br><span class="pass">✔ %s</span>' % e(need_note(nd, keys))),
        *([('👆 누르기 단계', tap_html(tap))] if tap else []),
        ('되묻기', '<br>'.join('<span class="n">%s 빠지면</span> %s' % (CIRC[j], e(x)) for j, x in enumerate(h['ask']))),
        ('다시 묻기', e(a['q']) + ('<div class="lf af">%s</div>' % asvg if asvg else '') +
                     '<br><span style="color:#5b6270">모범 답: %s</span><br><span style="color:#5b6270">핵심: %s</span>' % (e(a['ans']), ' · '.join(e(k) for k in a['keys']))),
    ]
    items = [
        ('🔑 키워드', '<span class="kw">%s</span>' % ''.join('<span>%s</span>' % e(k) for k in h['kw'])),
        ('간단한 설명', e(h['short'])),
        ('자세한 설명', e(h['long']) + ('<div class="lf">%s</div>' % lsvg if lsvg else '')),
    ]
    tr = ''.join('<tr><td class="k">%s</td><td>%s</td></tr>' % r for r in rows)
    ti = ''.join('<tr class="it"><td class="k">%s</td><td>%s</td></tr>' % r for r in items)
    return ('<div class="card"><div class="hd"><span class="rn r%d">%s</span><div style="flex:1"><div class="q">%s</div>'
            '<div class="ans"><b>모범 답</b> %s</div><div class="src">교재 디딤돌 기본+응용 6-2 %s</div></div>%s</div>%s'
            '<table>%s%s</table><div class="mk">☐ 좋아요 &nbsp; ☐ 고침 &nbsp; ☐ 뺌</div></div>') % ((q[0], RN[q[0]], e(q[2]), e(q[3]), e(h.get('src', ''))) + qfig(q) + (tr, ti))

def card3(q, lad, g, key=None):
    m = re.search('[①②③④⑤⑥⑦⑧⑨⑩]', q[1]); tp = TOPIC_PAGES.get(n, {})
    src = '최상위 수학 6-2 심화유형 %s(%s쪽)' % (m.group(0), tp.get(m.group(0), '?')) if m else ''
    steps = ''.join('<tr><td class="no">%s</td><td><span class="n">되묻기</span> %s<br><span class="g"><b>짚을 아이디어</b> %s</span><br><span class="t"><b>간단한 설명</b> %s</span></td></tr>'
                    % (CIRC[j], e(q[4][j]), e(g[j]), e(lad['ideas'][j])) for j in range(len(q[4])))
    tp = getattr(D, 'TAP', {}).get((key[0], '3', key[1])) if key else None
    if tp:   # 누르기 3회차 — 단계별 누르기가 되묻기를 대신, 짚을 아이디어(기록)는 그대로
        steps = '<tr><td class="no">👆</td><td>%s<br><span class="g" style="color:#5b6270"><b>짚을 아이디어(기록)</b> %s</span></td></tr>' % (tap_html(tp), e(' · '.join(g)))
    pv = getattr(D, 'LADPATH', {}).get(key) if key else None
    for pi, pth in enumerate(([pv] if isinstance(pv, dict) else pv) or []):   # 다른 풀이 길(마스터 10/16) — 어느 길이든 그 길의 아이디어를 다 짚으면 통과
        steps += '<tr><td class="no" style="color:#7c3aed">길%d</td><td><b style="color:#7c3aed">다른 풀이 길도 통과 — %s</b><br>%s</td></tr>' % (pi + 2, e(pth['name']), '<br>'.join(
            '<span class="n">%s</span> 되묻기 %s<br><span class="g"><b>짚을 아이디어</b> %s</span><br><span class="t"><b>간단한 설명</b> %s</span>' % (CIRC[j], e(pth['ask'][j]), e(pth['g'][j]), e(pth['ideas'][j])) for j in range(len(pth['g']))))
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
    o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>완성본 초6-2 %s단원</title><style>%s</style></head><body>' % (n, CSS),
         '<h1>초6-2 「%s」 — 완성본 검토</h1>' % e(big),
         '<div class="sub">2026-10-14 · 질문 %d개(1·2회차 %d · 3회차 %d) · 그림 %d장 · 설계규칙.md 「되묻기 · 도움」 표대로 Claude 가 씀 · 질문마다 ☐좋아요 ☐고침 ☐뺌</div>' % (c12 + c3, c12, c3, nf),
         '<div class="box"><b>1·2회차 흐름</b> 질문 → 핵심별 판정 → 다 짚으면 통과 + 모범 답 / 빠진 핵심이 있으면 <b>그 핵심만 되묻기</b>(방향만) → '
         '그래도 모르면 아이가 도움을 고름(🔑 키워드 &lt; 간단한 설명(말로만) &lt; 자세한 설명(그림과 함께)) → 설명을 봤으면 다음 날 <b>다시 묻기</b>(숫자·이름만 바꿈)로 통과. '
         '키워드만 보고 맞히면 오늘 통과(점수 조금 낮게). 틀린 생각을 말하면 "살짝 부족해" + 🔑 키워드만.<br>'
         '<b>3회차 흐름(계단)</b> 질문 → 아이디어마다 판정 → 빠진 아이디어는 <b>되묻기</b> → 그래도 막히면 그 아이디어의 <b>간단한 설명</b> → 숫자를 바꾼 <b>다시 묻기</b>(채점은 숫자 없는 "짚을 아이디어"로) → 세 번 막히면 모범 답 + 그날 잠금.</div>',
         ('<div class="box ask"><b>봐 주실 것</b> ① 3회차를 <b>최상위 수학 6-2 심화유형 %s</b>으로 새로 맞춤(%d개 유형 모두, 소단원마다 2~3개, 숫자 새로·전부 검산) ② 되묻기가 답을 흘리지 않는지 ③ 간단한·자세한 설명이 교재(디딤돌 6-2 %s) 문장과 맞는지 ④ 통과 기준(✔ 줄) — 질문마다 무엇을 말하면 통과인지<br>' % (INFO[n][1], INFO[n][2], INFO[n][0])) +
         '<b>교재</b> 1·2회차 = 디딤돌 기본+응용 6-2(인쇄 쪽 = PDF 인덱스 + 1) · 3회차 = 최상위 수학 6-2(인쇄 쪽 = PDF 인덱스 + 1)</div>']
    rv = [GEN_REV[0] % '초6-2'] + GEN_REV[1:]
    o.append('<div class="box ask"><b>%s</b><br>%s</div>' % (rv[0], '<br>'.join('· ' + x for x in rv[1:])))
    if n in ALL1016: o.append('<div class="box ask"><b>%s</b><br>%s</div>' % (ALL1016_HEAD, '<br>'.join('· ' + x for x in ALL1016[n])))
    if n in ALL1019: o.append('<div class="box ask"><b>%s</b><br>%s</div>' % (ALL1019_HEAD, '<br>'.join('· ' + x for x in ALL1019[n])))
    npath = sum(1 for k in getattr(D, 'LADPATH', {}) if k[0].startswith(n + '-'))
    if npath:
        o.append('<div class="box ask"><b>10/16 새 기준 — 3회차 다른 풀이 길</b><br>· 교재 풀이와 다르지만 맞는 풀이로 말해도 통과 — 3회차 카드의 보라색 「길2」 줄(이 단원 %d문제). 앱도 어느 길이든 그 길의 아이디어를 다 짚으면 통과, 되묻기는 아이가 더 많이 짚은 길에서</div>' % npath)
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
            o.append(card12(q, H[tag][i], D.KEYS[tag][i], LF.lfig(tag, i), af() if af else '', getattr(D, 'TAP', {}).get((tag, '12', i))))
        q3 = [q for q in s['qs'] if q[0] == 3]
        if q3:
            o.append('<h3>3회차 — 계단</h3>')
            for j, q in enumerate(q3): o.append(card3(q, D.LAD[tag][j], D.G[tag][j], (tag, j)))
        o.append('</div>')
    bh = BHM.BH.get(int(n))
    if bh:
        bk = '<span class="kw">%s</span> <span class="pass">✔ %d개 이상 말하면 통과</span>' % (''.join('<span>%s</span>' % e(w) for w in bh['words']), bh['need'])
        k2 = '<br>'.join('<span class="n">%s</span> %s' % (CIRC[i], e(k)) for i, k in enumerate(bh['keys2']))
        k3 = '<br>'.join('<span class="n">%s</span> %s' % (CIRC[i], e(k)) for i, k in enumerate(bh.get('keys3') or []))
        o.append('<div class="sm"><h2>블랙홀 관문<span class="pg">별계 끝 — 그 탐사의 행성을 다 밝히면 열림</span></h2>')
        o.append('<div class="card r3"><div class="hd"><span class="rn">1회차</span><div class="q">「%s」 하면 떠오르는 것을 3가지 말해 봐.</div></div><table><tr><td class="k">세는 낱말</td><td>%s</td></tr></table></div>' % (e(big), bk))
        o.append('<div class="card r3"><div class="hd"><span class="rn r2">2회차</span><div class="q">「%s」에서 배운 내용을 친구에게 설명하듯이 정리해서 말해 봐.</div></div><table><tr><td class="k">꼭 말할 핵심</td><td>%s</td></tr></table></div>' % (e(big), k2))
        o.append('<div class="card r3"><div class="hd"><span class="rn r3">3회차</span><div class="q">%s</div></div><table><tr><td class="k">꼭 말할 핵심</td><td>%s</td></tr><tr><td class="k">느낀 점</td><td>「%s」 별을 탐험하면서 느낀 점도 말해 줘. (정답은 없어! 채점 안 함 · 어른 화면에 그대로)</td></tr></table><div class="mk">☐ 좋아요 &nbsp; ☐ 고침 &nbsp; ☐ 뺌</div></div></div>' % (e(bh['q3']), k3, e(big)))
    o.append('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    print(C.make_pdf(build(), '완성본_초6-2_%s단원' % n))
