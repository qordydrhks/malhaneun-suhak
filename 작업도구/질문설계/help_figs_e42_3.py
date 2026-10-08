# -*- coding: utf-8 -*-
"""초4-2 3단원(소수의 덧셈과 뺄셈) '긴 설명' 그림 — 교재(58~61·70~73쪽)처럼 자릿값 표 · 모눈 · 수직선 · 세로셈.
   그림만 보기: python -X utf8 help_figs_e42_3.py → 그림_긴설명_초4-2_3단원.html
"""
import math
from help_figs_e42_4 import S, L, P, D, AR, BOX, ok, no, cap, LINE, BLUE, ORG, GRN, RED, SUB, FILL, PALE, e
from help_figs_e42_1 import T, BAR, NL, OC, GC, BC

PUR = '#6d3fd0'; HEAD = '#f0f4fc'

def GRID(x, y, size, n=10, cells=0, rows_full=0, col=OC, line='#9aa3b2'):
    """1 을 나타내는 정사각형 모눈(n×n). rows_full 줄을 통째로, 그다음 cells 칸을 칠한다(왼쪽 위부터 세로줄 먼저)."""
    c = size / n; o = '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="#fff"/>' % (x, y, size, size)
    k = 0
    for i in range(n):
        for j in range(n):
            if i < rows_full or (i == rows_full and j < cells):
                o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (x + i * c, y + j * c, c, c, col)
    for i in range(1, n): o += L((x + i * c, y), (x + i * c, y + size), line, .6) + L((x, y + i * c), (x + size, y + i * c), line, .6)
    return o + '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="none" stroke="%s" stroke-width="1.6"/>' % (x, y, size, size, LINE)

def PVT(x, y, heads, rows, cw=74, rh=30, hl=None, labels=None):
    """자릿값 표. heads: 칸 이름, rows: [칸마다 글자] (소수점은 칸 사이에 '.' 로 따로 그린다 — rows 의 '.' 칸 없음). hl: {(행,열): 색}."""
    o = ''; lw = 76 if labels else 0
    for k, h in enumerate(heads):
        o += '<rect x="%.1f" y="%.1f" width="%d" height="26" fill="%s" stroke="#cbd2dc"/>' % (x + lw + k * cw, y, cw, HEAD) + T(x + lw + k * cw + cw / 2, y + 18, h, BLUE, 11.5, 'middle', 700)
    for r, row in enumerate(rows):
        yy = y + 26 + r * rh
        if labels: o += T(x + lw - 8, yy + rh / 2 + 5, labels[r], SUB, 11.5, 'end', 700)
        for k, s in enumerate(row):
            fill = (hl or {}).get((r, k), '#fff')
            o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s" stroke="#cbd2dc"/>' % (x + lw + k * cw, yy, cw, rh, fill) + T(x + lw + k * cw + cw / 2, yy + rh / 2 + 6, s, LINE, 15, 'middle', 700)
    return o

def VC(x, y, a, b, op, res, ni=1, nd=1, cw=26, rh=30, marks=(), cross=(), redcell=(), dot=True, rescol=ORG, resdot=True):
    """세로셈. a, b, res 는 '3.4' 꼴 글자. marks: [(행, 칸, 글, 색)] 칸 = ('i', 왼쪽부터 k) 또는 ('d', j). 행 0 = 위 수."""
    def cx(key):
        kind, k = key
        return x + k * cw + cw / 2 if kind == 'i' else x + ni * cw + (12 if dot else 0) + k * cw + cw / 2
    def put(s, yy, col, row):
        ip, dp = (s.split('.') + [''])[:2]
        o = ''
        for k, ch in enumerate(ip.rjust(ni)):
            if ch != ' ': o += T(cx(('i', k)), yy, ch, RED if (row, ('i', k)) in redcell else col, 19, 'middle', 700)
        for j, ch in enumerate(dp): o += T(cx(('d', j)), yy, ch, RED if (row, ('d', j)) in redcell else col, 19, 'middle', 700)
        if dot and '.' in s and (row != 2 or resdot): o += '<circle cx="%.1f" cy="%.1f" r="2.4" fill="%s"/>' % (x + ni * cw + 6, yy - 2, col)
        return o
    ys = [y, y + rh, y + 2 * rh + 12]
    o = put(a, ys[0], LINE, 0) + put(b, ys[1], LINE, 1) + T(x - 14, ys[1], op, LINE, 19, 'middle', 700)
    w = ni * cw + (12 if dot else 0) + nd * cw
    o += L((x - 24, ys[1] + 10), (x + w + 4, ys[1] + 10), LINE, 1.8) + put(res, ys[2], rescol, 2)
    for row, key in cross:
        cxx = cx(key); yy = ys[row]; o += L((cxx - 8, yy - 3), (cxx + 8, yy - 13), RED, 1.6)
    for row, key, s, col in marks: o += T(cx(key), ys[row] - 22, s, col, 12, 'middle', 700)
    return o

def COLS(x, y, h, ni, nd, cw=26, dot=True):   # 세로셈 뒤에 깔리는 자리별 띠
    o = ''; cols = ['#eef3fb', '#fff3e3', '#eaf7ee', '#f5efff']
    for k in range(ni): o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s"/>' % (x + k * cw, y, cw, h, '#f3f4f6')
    for j in range(nd): o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s"/>' % (x + ni * cw + (12 if dot else 0) + j * cw, y, cw, h, cols[(j + 1) % 4])
    return o

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 3-01 ─────────
@fig
def f3_tenth():
    b = BAR(30, 24, 10, 7, 36, col=BC)
    b2, X = NL(30, 390, 76, 0, 1, .1, {}); b += b2
    for k in (1, 3, 5, 7, 9): b += T(X(k / 10), 104, '0.%d' % k, SUB, 11)
    b += D((X(.7), 76), ORG, 5) + T(X(.7), 62, '0.7', ORG, 12.5, 'middle', 700)
    b += T(210, 136, '0.1이 7개 = 0.7 = 7/10', ORG, 13, 'middle', 700)
    return S(420, 150, b)

@fig
def f3_hundredth():
    b = GRID(30, 14, 130, cells=1, col=ORG) + AR((60, 26), (190, 46), ORG)
    b += T(200, 52, '100칸 중 1칸', LINE, 12.5, 'start') + T(200, 84, '1/100 = 0.01', ORG, 14, 'start', 700) + T(200, 108, '(영 점 영일)', SUB, 12, 'start')
    return S(400, 156, b)

@fig
def f3_pv257():
    b = PVT(10, 10, ['일의 자리', '소수 첫째 자리', '소수 둘째 자리'], [['2', '5', '7'], ['2', '0.5', '0.07']], cw=96, labels=['각 자리 숫자', '나타내는 수'], hl={(1, 1): '#fff3e3', (1, 2): '#eaf7ee'})
    b += T(10 + 76 + 144, 120, '2.57 = 2 + 0.5 + 0.07', ORG, 14, 'middle', 700)
    return S(380, 134, b)

@fig
def f3_read351():
    ds = [('3', '삼'), ('.', '점'), ('5', '오'), ('1', '일')]; b = ''
    for k, (d, r) in enumerate(ds):
        x = 40 + k * 56
        b += '<rect x="%d" y="18" width="46" height="46" rx="8" fill="%s" stroke="#cbd2dc"/>' % (x, '#fff8ee' if k >= 2 else '#f8fafc')
        b += T(x + 23, 50, d, LINE, 22, 'middle', 700) + T(x + 23, 88, r, ORG if k >= 2 else LINE, 15, 'middle', 700)
    b += T(270, 46, '"삼 점 오일"', GRN, 14, 'start', 700) + ok(372, 48) + T(270, 80, '"삼 점 오십일"', RED, 14, 'start', 700) + no(380, 82)
    b += cap(140, 116, '소수점 아래는 숫자만 하나씩 읽어요')
    return S(410, 128, b)

@fig
def f3_digit658():
    b = ''
    for k, d in enumerate('6.58'):
        b += T(60 + k * 40, 50, d, ORG if d == '5' else LINE, 30, 'middle', 700)
    for xx, v, col in ((60, '6', LINE), (140, '0.5', ORG), (180, '0.08', LINE)):
        b += AR((xx, 60), (xx + (0 if xx == 60 else (20 if xx == 140 else 50)), 96), col) + T(xx + (0 if xx == 60 else (20 if xx == 140 else 50)), 116, v, col, 15, 'middle', 700)
    b += T(280, 50, '5는 소수 첫째 자리', ORG, 12.5, 'start', 700) + T(280, 72, '→ 0.1이 5개 = 0.5', ORG, 12.5, 'start', 700)
    b += T(280, 104, '6.58 = 6 + 0.5 + 0.08', LINE, 12.5, 'start')
    return S(450, 132, b)

# ───────── 3-02 ─────────
@fig
def f3_thousandth():
    b = GRID(20, 20, 110, cells=1, col='#cfe0f6') + '<rect x="18" y="18" width="15" height="15" fill="none" stroke="%s" stroke-width="2"/>' % RED
    b += AR((36, 26), (170, 36), RED)
    x0, y0, s = 176, 20, 110
    b += '<rect x="%d" y="%d" width="%d" height="%d" fill="#fff" stroke="%s" stroke-width="1.6"/>' % (x0, y0, s, s, LINE)
    b += '<rect x="%d" y="%d" width="%.1f" height="%d" fill="%s"/>' % (x0, y0, s / 10, s, ORG)
    for k in range(1, 10): b += L((x0 + k * s / 10, y0), (x0 + k * s / 10, y0 + s), '#9aa3b2', .8)
    b += T(75, 150, '한 칸 = 0.01', SUB, 12) + T(231, 150, '0.01을 10으로 나눈 1칸', SUB, 12)
    b += T(310, 60, '1/1000 = 0.001', ORG, 14, 'start', 700) + T(310, 84, '(영 점 영영일)', SUB, 12, 'start')
    return S(450, 162, b)

@fig
def f3_pv8493():
    b = PVT(10, 10, ['일', '소수 첫째', '소수 둘째', '소수 셋째'], [['8', '4', '9', '3'], ['8', '0.4', '0.09', '0.003']], cw=82, labels=['각 자리 숫자', '나타내는 수'])
    b += T(10 + 76 + 164, 120, '8.493 = 8 + 0.4 + 0.09 + 0.003', ORG, 14, 'middle', 700)
    return S(420, 134, b)

@fig
def f3_zero2408():
    b = PVT(10, 10, ['일', '소수 첫째', '소수 둘째', '소수 셋째'], [['2', '4', '0', '8'], ['2', '4', '8', '']], cw=74, labels=['2.408', '2.48'], hl={(0, 3): '#eaf7ee', (1, 2): '#fdecec', (0, 2): '#fff3e3'})
    b += AR((86 + 74 * 3 + 37, 72), (86 + 74 * 2 + 50, 92), RED)
    b += T(400, 50, '8 → 0.008', GRN, 12.5, 'start', 700) + T(400, 80, '8 → 0.08', RED, 12.5, 'start', 700)
    b += T(210, 118, '0을 빼면 8의 자리가 바뀌어 다른 수가 돼요', ORG, 12.5, 'middle', 700)
    return S(500, 130, b)

@fig
def f3_nl_zoom():
    b, X = NL(30, 430, 40, .5, .6, .01, {})
    b += T(X(.5), 66, '0.5', LINE, 12, 'middle', 700) + T(X(.6), 66, '0.6', LINE, 12, 'middle', 700)
    for v in (.51, .52): b += T(X(v), 26, '%.2f' % v, ORG, 11.5, 'middle', 700)
    b2, Y = NL(30, 430, 120, 0, 1, .1, {})
    b2 = b2.replace('>0<', '><').replace('>1<', '><')
    b += b2 + L((X(.51), 48), (30, 112), ORG, 1, '4 3') + L((X(.52), 48), (430, 112), ORG, 1, '4 3')
    for k, s in ((0, '0.51'), (1, '0.511'), (2, '0.512'), (5, '…'), (9, '0.519'), (10, '0.52')):
        b += T(30 + k * 40, 146, s, ORG if k in (1, 2, 9) else LINE, 11, 'middle', 700)
    b += T(230, 170, '한 칸 = 0.001', ORG, 13, 'middle', 700)
    return S(460, 182, b)

# ───────── 3-03 ─────────
@fig
def f3_050():
    b = GRID(30, 16, 120, rows_full=5, col=BC) + T(90, 156, '10줄 중 5줄 → 0.5', LINE, 12.5, 'middle', 700)
    b += T(186, 82, '=', LINE, 24, 'middle', 700)
    b += GRID(222, 16, 120, rows_full=5, col=OC) + T(282, 156, '100칸 중 50칸 → 0.50', LINE, 12.5, 'middle', 700)
    b += T(400, 70, '0.5 = 0.50', ORG, 14, 'start', 700) + T(400, 94, '끝에 0을 붙여도', SUB, 12, 'start') + T(400, 112, '같은 수', SUB, 12, 'start')
    return S(520, 168, b)

@fig
def f3_compare_steps():
    b = ''
    steps = [('자연수 부분', 0), ('소수 첫째', 2), ('소수 둘째', 3), ('소수 셋째', 4)]
    for k, (name, idx) in enumerate(steps):
        x = 10 + k * 118
        b += '<rect x="%d" y="30" width="100" height="64" rx="8" fill="#fff" stroke="#cbd2dc"/>' % x + T(x + 50, 22, name, BLUE, 11.5, 'middle', 700)
        for r, s in enumerate(('7.532', '7.538')):
            for j, ch in enumerate(s):
                b += T(x + 24 + j * 13, 56 + r * 26, ch, ORG if j == idx else LINE, 15, 'middle', 700 if j == idx else 400)
        if k < 3: b += AR((x + 102, 62), (x + 116, 62)) + T(x + 109, 110, '같으면', SUB, 10.5)
    b += T(235, 136, '셋째 자리 2 < 8 → 7.532 < 7.538', ORG, 13, 'middle', 700)
    return S(480, 148, b)

@fig
def f3_29_215():
    b = PVT(10, 10, ['일', '소수 첫째', '소수 둘째'], [['2', '9', '0'], ['2', '1', '5']], cw=70, labels=['2.9', '2.15'], hl={(0, 1): '#fff3e3', (1, 1): '#fff3e3'})
    b += T(320, 50, '자연수 부분: 2 = 2', LINE, 12.5, 'start') + T(320, 74, '소수 첫째 자리: 9 > 1', ORG, 12.5, 'start', 700) + T(320, 98, '→ 2.9가 더 커요', ORG, 12.5, 'start', 700)
    return S(480, 118, b)

@fig
def f3_nl_065():
    b, X = NL(30, 430, 60, .6, .7, .01, {})
    b += T(X(.6), 86, '0.6', LINE, 12, 'middle', 700) + T(X(.7), 86, '0.7 = 0.70', LINE, 12, 'middle', 700)
    b += D((X(.65), 60), BLUE, 5.5) + T(X(.65), 40, '0.65', BLUE, 12.5, 'middle', 700) + D((X(.7), 60), ORG, 5.5) + T(X(.7), 40, '0.70', ORG, 12.5, 'middle', 700)
    b += T(230, 116, '오른쪽에 있을수록 큰 수 → 0.7 > 0.65', ORG, 13, 'middle', 700)
    return S(460, 128, b)

# ───────── 3-04 ─────────
@fig
def f3_relation():
    b = ''; xs = [20, 140, 260, 380]; s = 80
    b += '<rect x="%d" y="40" width="%d" height="%d" fill="#cfe0f6" stroke="%s" stroke-width="1.6"/>' % (xs[0], s, s, LINE)
    b += GRID(xs[1], 40, s, n=10, rows_full=1, col='#f4c3c3')
    b += GRID(xs[2], 40, s, n=10, cells=1, col='#9fd48a')
    b += GRID(xs[3], 40, s, n=10, cells=1, col='#fff') + '<rect x="%d" y="40" width="%.1f" height="%.1f" fill="none" stroke="%s" stroke-width="2"/>' % (xs[3], s / 10, s / 10, RED)
    for k, v in enumerate(['1', '0.1', '0.01', '0.001']): b += T(xs[k] + s / 2, 140, v, LINE, 14, 'middle', 700)
    for k in range(3):
        b += AR((xs[k] + s - 6, 30), (xs[k + 1] + 10, 30), BLUE) + T((xs[k] + xs[k + 1] + s) / 2 + 2, 22, '1/10', BLUE, 12, 'middle', 700)
        b += AR((xs[k + 1] + 10, 152), (xs[k] + s - 6, 152), RED) + T((xs[k] + xs[k + 1] + s) / 2 + 2, 172, '10배', RED, 12, 'middle', 700)
    return S(480, 180, b)

def shift_tbl(rows, labels, arrows, note, hl=None, heads=('십', '일', '소수 첫째', '소수 둘째', '소수 셋째'), w=520):
    b = PVT(10, 10, list(heads), rows, cw=70, rh=30, labels=labels, hl=hl)
    for (r0, c0, r1, c1, col) in arrows:
        p0 = (86 + c0 * 70 + 35, 36 + r0 * 30 + 22); p1 = (86 + c1 * 70 + 35, 36 + r1 * 30 + 8)
        b += AR(p0, p1, col)
    b += T(86 + len(heads) * 35, 58 + len(rows) * 30, note, ORG, 13, 'middle', 700)
    return S(w, 72 + len(rows) * 30, b)

@fig
def f3_tenth42():
    return shift_tbl([['', '4', '2', '', ''], ['', '0', '4', '2', '']], ['4.2', '1/10 → 0.42'], [(0, 1, 1, 2, BLUE), (0, 2, 1, 3, BLUE)],
                     '오른쪽으로 한 자리 · 빈자리에는 0', hl={(1, 1): '#fdecec'})

@fig
def f3_hundred036():
    return shift_tbl([['', '0', '0', '3', '6'], ['', '0', '3', '6', ''], ['', '3', '6', '', '']], ['0.036', '10배 → 0.36', '10배 → 3.6'],
                     [(0, 3, 1, 2, RED), (0, 4, 1, 3, RED), (1, 2, 2, 1, RED), (1, 3, 2, 2, RED)], '100배 = 10배를 두 번 → 왼쪽으로 두 자리')

@fig
def f3_ten59():
    return shift_tbl([['', '5', '9', '', ''], ['5', '9', '', '', '']], ['5.9', '10배 → 59'], [(0, 1, 1, 0, RED), (0, 2, 1, 1, RED)],
                     '10배는 왼쪽으로 한 자리 (5.90은 5.9와 같은 수)')

# ───────── 3-05 ─────────
@fig
def f3_nl_0608():
    b, X = NL(30, 440, 70, 0, 1.5, .1, {})
    for v in (.5,): b += T(X(v), 94, '0.5', SUB, 11)
    b += '<path d="M%.1f 64 Q %.1f 20 %.1f 64" fill="none" stroke="%s" stroke-width="2"/>' % (X(0), X(.3), X(.6), ORG) + T(X(.3), 30, '0.1이 6개', ORG, 11.5, 'middle', 700)
    b += '<path d="M%.1f 64 Q %.1f 20 %.1f 64" fill="none" stroke="%s" stroke-width="2"/>' % (X(.6), X(1), X(1.4), GRN) + T(X(1), 30, '0.1이 8개', GRN, 11.5, 'middle', 700)
    b += D((X(1.4), 70), RED, 5) + T(X(1.4), 104, '1.4', RED, 13, 'middle', 700)
    b += T(235, 130, '0.1이 14개 = 1.4', ORG, 13, 'middle', 700)
    return S(470, 142, b)

@fig
def f3_vc_3428():
    b = ''
    for k, (res, marks, rd, note) in enumerate((('', (), True, '① 소수점의 위치를 맞추어 써'), ('6.2', ((0, ('i', 0), '1', RED),), False, '② 같은 자리 수끼리 계산'), ('6.2', ((0, ('i', 0), '1', RED),), True, '③ 소수점을 그대로 내려 찍어'))):
        x = 50 + k * 160
        b += COLS(x, 14, 104, 1, 1) + VC(x, 44, '3.4', '2.8', '+', res, marks=marks, resdot=rd)
        b += cap(x + 20, 140, note, SUB, 11)
    return S(500, 150, b)

@fig
def f3_carry1957():
    b = BAR(20, 30, 10, 10, 26, cols=[OC] * 9 + [GC]) + BAR(300, 30, 10, 6, 26, col=GC)
    b += T(150, 22, '0.1이 10개 = 1', ORG, 12.5, 'middle', 700) + T(378, 22, '0.1이 6개', GRN, 12.5, 'middle', 700)
    b += T(290, 92, '0.1이 9개(주황) + 0.1이 7개(초록) = 0.1이 16개', LINE, 12.5, 'middle')
    b += T(290, 118, '10개는 1로 바꿔 일의 자리로 올리고 6을 써요 → 7.6', ORG, 13, 'middle', 700)
    return S(580, 132, b)

@fig
def f3_45():
    b = ''
    for k in range(4): b += '<rect x="%d" y="24" width="64" height="64" fill="#cfe0f6" stroke="%s" stroke-width="1.6"/>' % (16 + k * 74, LINE)
    b += GRID(320, 24, 64, n=10, rows_full=5, col=OC)
    b += T(160, 112, '4', BLUE, 15, 'middle', 700) + T(352, 112, '0.5', ORG, 15, 'middle', 700)
    b += T(200, 140, '4.5 = 4 + 0.5', ORG, 14, 'middle', 700)
    return S(400, 152, b)

# ───────── 3-06 ─────────
@fig
def f3_align_cols():
    b = COLS(70, 14, 108, 1, 2) + VC(70, 44, '0.13', '2.15', '+', '2.28', nd=2)
    for k, (s, col) in enumerate((('일', '#9aa3b2'), ('첫째', '#c27a1a'), ('둘째', '#3f8a2c'))):
        xx = 70 + 13 + (0 if k == 0 else 12 + 26 * k)
        b += T(xx, 10, s, col, 11, 'middle', 700)
    b += T(200, 56, '소수점을 맞추면', LINE, 12.5, 'start') + T(200, 78, '같은 자리끼리 한 줄', ORG, 12.5, 'start', 700) + T(200, 100, '0.01이 13개 + 215개 = 228개', SUB, 12, 'start')
    return S(440, 138, b)

@fig
def f3_vc_259():
    b = COLS(70, 14, 108, 1, 2) + VC(70, 44, '2.59', '1.36', '+', '3.95', nd=2, marks=((0, ('d', 0), '1', RED),))
    b += T(200, 46, '둘째 자리 9 + 6 = 15', LINE, 12.5, 'start') + T(200, 68, '→ 5를 쓰고 1을 첫째 자리로', RED, 12.5, 'start', 700)
    b += T(200, 92, '첫째 5 + 3 + 1 = 9, 일 2 + 1 = 3', LINE, 12.5, 'start') + T(200, 116, '= 3.95', ORG, 13, 'start', 700)
    return S(440, 138, b)

@fig
def f3_vc_360():
    b = COLS(70, 14, 108, 1, 2) + VC(70, 44, '3.60', '2.75', '+', '6.35', nd=2, marks=((0, ('i', 0), '1', RED),), redcell=((0, ('d', 1)),))
    b += T(200, 52, '3.6 = 3.60 (빨간 0을 붙여요)', RED, 12.5, 'start', 700) + T(200, 78, '소수점을 맞추고', LINE, 12.5, 'start') + T(200, 100, '같은 자리끼리 더해 6.35', ORG, 12.5, 'start', 700)
    return S(440, 138, b)

@fig
def f3_wrong_align():
    b = ''
    # 틀린 쪽: 끝을 맞춤
    for r, s in enumerate((' 1.2', '0.05')):
        for j, ch in enumerate(s): b += T(50 + j * 22, 44 + r * 30, ch, LINE, 18, 'middle', 700)
    b += T(32, 74, '+', LINE, 18, 'middle', 700) + L((24, 84), (130, 84), LINE, 1.6) + T(50 + 1 * 22, 116, '0.17', RED, 18, 'start', 700) + no(150, 120)
    b += cap(80, 144, '끝을 맞추면 ✗')
    b += COLS(250, 14, 108, 1, 2) + VC(250, 44, '1.20', '0.05', '+', '1.25', nd=2) + ok(350, 120) + cap(290, 144, '소수점을 맞추면 ✓')
    return S(420, 156, b)

# ───────── 3-07 ─────────
@fig
def f3_juice():
    b = ''
    for k in range(3): b += '<rect x="%d" y="30" width="80" height="34" fill="#f7d6a8" stroke="%s" stroke-width="1.6"/>' % (20 + k * 90, LINE)
    b += L((200, 34), (280, 60), RED, 1.8) + L((280, 34), (200, 60), RED, 1.8)
    b += BAR(290, 30, 10, 7, 14, h=34, col='#f7d6a8', cross=(5, 6))
    b += T(150, 22, '1 L가 3개 + 0.1 L가 7개 = 3.7 L', LINE, 12, 'middle', 700)
    b += T(250, 100, '1.2 L만큼 × → 남은 주스 2.5 L', ORG, 13, 'middle', 700)
    return S(450, 116, b)

@fig
def f3_vc_borrow43():
    b = COLS(70, 14, 108, 1, 1) + VC(70, 44, '4.3', '2.7', '−', '1.6', marks=((0, ('i', 0), '3', RED), (0, ('d', 0), '10', RED)), cross=((0, ('i', 0)),))
    b += T(190, 48, '3에서 7을 뺄 수 없어요', LINE, 12.5, 'start') + T(190, 70, '일의 자리 1 = 0.1이 10개', RED, 12.5, 'start', 700)
    b += T(190, 94, '13 − 7 = 6, 3 − 2 = 1', LINE, 12.5, 'start') + T(190, 118, '= 1.6', ORG, 13, 'start', 700)
    return S(430, 138, b)

@fig
def f3_check8():
    b = '<rect x="30" y="30" width="400" height="34" rx="4" fill="#cfe0f6" stroke="%s" stroke-width="1.6"/>' % LINE + T(230, 52, '처음 수 8', BLUE, 13, 'middle', 700)
    b += '<rect x="30" y="76" width="180" height="34" fill="#f7d6a8" stroke="%s" stroke-width="1.6"/>' % LINE + T(120, 98, '뺀 수 3.6', LINE, 12.5, 'middle', 700)
    b += '<rect x="210" y="76" width="220" height="34" fill="#cdeccf" stroke="%s" stroke-width="1.6"/>' % LINE + T(320, 98, '답 4.4', LINE, 12.5, 'middle', 700)
    b += T(230, 138, '답 + 뺀 수 = 4.4 + 3.6 = 8 → 맞아요', ORG, 13, 'middle', 700)
    return S(460, 150, b)

@fig
def f3_wrong52():
    b = VC(60, 44, '5.2', '1.8', '−', '4.6', rescol=RED) + no(150, 120) + cap(70, 148, '8 − 2로 거꾸로 ✗')
    b += COLS(260, 14, 108, 1, 1) + VC(260, 44, '5.2', '1.8', '−', '3.4', marks=((0, ('i', 0), '4', RED), (0, ('d', 0), '10', RED)), cross=((0, ('i', 0)),)) + ok(350, 120)
    b += cap(290, 148, '받아내려 10 + 2 − 8 = 4 ✓')
    return S(420, 160, b)

# ───────── 3-08 ─────────
@fig
def f3_vc_twin():
    b = VC(60, 44, '642', '218', '−', '424', ni=3, nd=0, dot=False, marks=((0, ('i', 1), '3', RED), (0, ('i', 2), '10', RED)), cross=((0, ('i', 1)),)) + cap(100, 148, '자연수')
    b += COLS(270, 14, 108, 1, 2) + VC(270, 44, '6.42', '2.18', '−', '4.24', nd=2, marks=((0, ('d', 0), '3', RED), (0, ('d', 1), '10', RED)), cross=((0, ('d', 0)),)) + cap(320, 148, '소수: 소수점만 맞추고 내려 찍기')
    return S(440, 160, b)

@fig
def f3_vc_534():
    b = COLS(70, 14, 108, 1, 2) + VC(70, 44, '5.34', '1.25', '−', '4.09', nd=2, marks=((0, ('d', 0), '2', RED), (0, ('d', 1), '10', RED)), cross=((0, ('d', 0)),))
    b += T(200, 46, '둘째 자리 4에서 5를 못 빼요', LINE, 12.5, 'start') + T(200, 68, '첫째 자리에서 받아내림 → 14', RED, 12.5, 'start', 700)
    b += T(200, 92, '14 − 5 = 9, 2 − 2 = 0, 5 − 1 = 4', LINE, 12.5, 'start') + T(200, 116, '= 4.09 (0도 꼭 써요)', ORG, 13, 'start', 700)
    return S(450, 138, b)

@fig
def f3_bar_box():
    b = '<rect x="30" y="30" width="400" height="34" rx="4" fill="#fff5f5" stroke="%s" stroke-width="1.6"/>' % RED + T(230, 52, '처음 수 □', RED, 13, 'middle', 700)
    b += '<rect x="30" y="76" width="152" height="34" fill="#f7d6a8" stroke="%s" stroke-width="1.6"/>' % LINE + T(106, 98, '뺀 수 1.46', LINE, 12.5, 'middle', 700)
    b += '<rect x="182" y="76" width="248" height="34" fill="#cdeccf" stroke="%s" stroke-width="1.6"/>' % LINE + T(306, 98, '남은 수 2.38', LINE, 12.5, 'middle', 700)
    b += T(230, 138, '□ = 2.38 + 1.46 = 3.84', ORG, 13, 'middle', 700)
    return S(460, 150, b)

@fig
def f3_vc_82():
    b = VC(60, 44, '8.2', '3.17', '−', '5.17', nd=2, rescol=RED) + no(170, 120) + cap(90, 148, '빈자리를 비워 두면 ✗')
    b += COLS(270, 14, 108, 1, 2) + VC(270, 44, '8.20', '3.17', '−', '5.03', nd=2, redcell=((0, ('d', 1)),), marks=((0, ('d', 0), '1', RED), (0, ('d', 1), '10', RED)), cross=((0, ('d', 0)),)) + ok(380, 120)
    b += cap(320, 148, '8.20으로 보고 받아내림 ✓')
    return S(440, 160, b)

@fig
def f3_flow():
    b = BOX(6, 30, 140, 66, ['① 소수점의 위치를', '맞추어 써', '(자릿수 다르면 0 붙이기)'], PALE, ORG, ORG, 11)
    b += AR((146, 63), (166, 63)) + BOX(168, 30, 140, 66, ['② 자연수처럼', '같은 자리 수끼리', '계산해'], '#f0f4fc', '#9fb6e0', BLUE, 11.5)
    b += AR((308, 63), (328, 63)) + BOX(330, 30, 140, 66, ['③ 소수점을', '그대로 내려 찍어'], '#ecfdf3', '#6fbf8b', GRN, 11.5)
    return S(478, 110, b)

LFIG = {
    '3-01': ['f3_tenth', 'f3_hundredth', 'f3_pv257', 'f3_read351', 'f3_digit658'],
    '3-02': ['f3_thousandth', 'f3_pv8493', 'f3_zero2408', 'f3_nl_zoom'],
    '3-03': ['f3_050', 'f3_compare_steps', 'f3_29_215', 'f3_nl_065'],
    '3-04': ['f3_relation', 'f3_tenth42', 'f3_hundred036', 'f3_ten59'],
    '3-05': ['f3_nl_0608', 'f3_vc_3428', 'f3_carry1957', 'f3_45'],
    '3-06': ['f3_align_cols', 'f3_vc_259', 'f3_vc_360', 'f3_wrong_align'],
    '3-07': ['f3_juice', 'f3_vc_borrow43', 'f3_check8', 'f3_wrong52'],
    '3-08': ['f3_vc_twin', 'f3_vc_534', 'f3_bar_box', 'f3_vc_82', 'f3_flow'],
}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_3단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
