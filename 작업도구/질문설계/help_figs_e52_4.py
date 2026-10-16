# -*- coding: utf-8 -*-
"""초5-2 4단원(소수의 곱셈) '긴 설명' 그림 — 교재(디딤돌 5-2 88~106쪽) 모양: 0.1·0.01 모형 · 식 · 1/10배 화살표 · 모눈 넓이 · 자리 옮김 표 (2026-10-12)
   숫자는 help_e52_4.H 의 긴 설명 예와 같다. 그림만 보기: python -X utf8 help_figs_e52_4.py → 그림_긴설명_초5-2_4단원.html
"""
from help_figs_e52_1 import S, T, L, R, BOX, AR, ok, no, PT, LINE, BLUE, ORG, GRN, RED, SUB, PALE, GBG
from help_figs_e52_2 import EXPR, FR

EDGE = '#6b7280'; C1 = '#f4b183'; C2 = '#9fc3e8'; C3 = '#b9dfb0'

def strips(per, groups, unit=0.1, title=''):
    """0.1(또는 0.01 띠) 모형: 한 줄 10칸 = 1. per 칸씩 groups 묶음을 번갈아 색칠"""
    tot = per * groups; rows = (tot + 9) // 10; cw, ch = 24, 22; o = ''
    for r in range(max(rows, 1)):
        for c in range(10):
            k = r * 10 + c
            col = (C1 if (k // per) % 2 == 0 else C2) if k < tot else '#ffffff'
            o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s" stroke="%s" stroke-width="1"/>' % (20 + c * cw, 26 + r * (ch + 8), cw, ch, col, EDGE)
        o += T(20 + 10 * cw + 10, 26 + r * (ch + 8) + 16, '= 1' if (r + 1) * 10 <= tot else '', SUB, 11.5, 'start')
    h = 26 + max(rows, 1) * (ch + 8)
    o += T(20, 16, title, LINE, 12.5, 'start', 700)
    return o, h

def hund(per, groups, title=''):
    """0.01 모형: 10 × 10 모눈 = 1. per 칸씩 groups 묶음"""
    tot = per * groups; s = 13; o = ''
    for k in range(100):
        r, c = divmod(k, 10)
        col = (C1 if (k // per) % 2 == 0 else C2) if k < tot else '#ffffff'
        o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s" stroke="#cbd2dc" stroke-width=".8"/>' % (20 + c * s, 26 + r * s, s, s, col)
    o += '<rect x="20" y="26" width="130" height="130" fill="none" stroke="%s" stroke-width="1.6"/>' % LINE
    o += T(20, 16, title, LINE, 12.5, 'start', 700) + T(85, 172, '전체 = 1 (작은 칸 하나 = 0.01)', SUB, 11)
    return o, 180

def eqs(lines, x=20, y0=34, gap=46, sz=14):
    o = ''; xm = 0
    for k, it in enumerate(lines):
        e, xe = EXPR(x, y0 + k * gap, it, sz); o += e; xm = max(xm, xe)
    return o, xm, y0 + (len(lines) - 1) * gap + 30

def note(x, y, w, text, kind='pale'):
    st = {'pale': (PALE, '#e7c27a', ORG), 'green': (GBG, '#6fbf8b', GRN), 'red': ('#fdecea', '#e9a39b', RED), 'gray': ('#f3f4f6', '#cbd2dc', SUB)}[kind]
    return BOX(x, y, w, 26, text, st[0], st[1], st[2], 11.5)

def vert(a, b, p, da, db, dp, lab_a='1/10배', lab_b=None, lab_p='1/10배'):
    """자연수의 곱셈 → 소수의 곱셈 (교재 1/10배 화살표 모양). da/db/dp = 소수로 쓴 수"""
    o = ''
    for k, (x, A, B, P) in enumerate([(70, a, b, p), (290, da, db, dp)]):
        o += T(x, 34, A, LINE, 18, 'end', 700) + T(x - 60, 64, '×', SUB, 18, 'start') + T(x, 64, B, LINE, 18, 'end', 700)
        o += L((x - 70, 74), (x + 4, 74), LINE, 1.6) + T(x, 100, P, LINE, 18, 'end', 700)
    for y, lab in ((28, lab_a), (58, lab_b), (94, lab_p)):
        if lab: o += AR((96, y), (206, y), ORG) + T(151, y - 6, lab, ORG, 11.5, 'middle', 700)
    return o

def areagrid(gx, gy, title=''):
    s = 15; o = ''
    for r in range(10):
        for c in range(10):
            on = c < gx and r >= 10 - gy
            o += '<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s" stroke="#cbd2dc" stroke-width=".8"/>' % (40 + c * s, 20 + r * s, s, s, '#f6b8b8' if on else '#fff')
    o += '<rect x="40" y="20" width="150" height="150" fill="none" stroke="%s" stroke-width="1.6"/>' % LINE
    o += L((40, 182), (40 + gx * s, 182), SUB, 1) + T(40 + gx * s / 2, 197, '0.%d' % gx, SUB, 12)
    o += L((28, 170), (28, 170 - gy * s), SUB, 1) + T(22, 170 - gy * s / 2 + 4, '0.%d' % gy, SUB, 12, 'end')
    o += T(40, 12, '1', SUB, 11) + T(196, 26, '1', SUB, 11, 'start')
    return o

def shift(rows, cols=('백', '십', '일', '소수 첫째', '둘째', '셋째')):
    """자리 옮김 표: rows = [(왼쪽 식, 숫자들 dict{열번호: 숫자}, 소수점 열(그 열 숫자 뒤), 오른쪽 설명)]"""
    cw = 34; x0 = 170; o = ''
    for k, c in enumerate(cols): o += T(x0 + k * cw + cw / 2, 18, c, SUB, 9.5 if len(c) > 2 else 11)
    for r, (lt, dg, dp, rt) in enumerate(rows):
        y = 48 + r * 34
        o += T(160, y, lt, LINE, 14, 'end', 700)
        for c, ch in dg.items(): o += T(x0 + c * cw + cw / 2, y, ch, ORG if ch == '0' and r and False else LINE, 16, 'middle', 700)
        if dp is not None: o += '<circle cx="%.1f" cy="%.1f" r="2.6" fill="%s"/>' % (x0 + (dp + 1) * cw, y + 2, RED)
        o += T(x0 + len(cols) * cw + 10, y, rt, ORG, 11.5, 'start', 700)
    for k in range(len(cols) + 1): o += L((x0 + k * cw, 26), (x0 + k * cw, 26 + len(rows) * 34), '#e3e6ec', 1, '3 3')
    return o, 26 + len(rows) * 34 + 10

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 4-01 ─────────
@fig
def u01_frac():
    o, h = strips(6, 1, title='0.6 = 6/10 (1을 10칸으로 나눈 것 중 6칸)')
    e, x, _ = eqs([[0.6, '=', ('f', 6, 10)], ['0.25', '=', ('f', 25, 100)]], 340, 40, 50)
    return S(470, max(h, 120) + 10, o + e)
@fig
def u01_tenths():
    o, h = strips(2, 3, title='0.2 × 3 → 0.1이 2개씩 3묶음 = 0.1이 6개')
    e, x, y = eqs([['0.2', '×', 3, '=', '0.6']], 20, h + 30)
    return S(380, y + 6, o + e)
@fig
def u01_frac28():
    e, x, y = eqs([['0.28', '×', 3, '=', ('f', 28, 100), '×', 3, '=', ('f', '28 × 3', 100), '=', ('f', 84, 100), '=', '0.84']], 20, 36)
    return S(max(int(x) + 10, 330), y + 30, e + note(20, y - 4, 290, '소수 두 자리 수는 ●▲/100로 나타내요'))
@fig
def u01_08x5():
    o, h = strips(8, 5, title='0.8 × 5 → 0.1이 8개씩 5묶음 = 0.1이 40개')
    return S(380, h + 40, o + note(20, h + 6, 260, '0.1이 10개면 1 → 0.1이 40개는 4', 'green'))
@fig
def u01_hund():
    o, h = hund(4, 7, '0.04 × 7 → 0.01이 4개씩 7묶음')
    o += T(170, 80, '0.01이 28개', LINE, 13, 'start', 700) + T(170, 104, '= 0.28', LINE, 13, 'start', 700) + T(170, 136, '100개가 되어야 1', RED, 11.5, 'start', 700)
    return S(320, h, o)
@fig
def u01_tenth_x():
    return S(360, 112, vert('2', '3', '6', '0.2', '3', '0.6', '1/10배', None, '1/10배'))

# ───────── 4-02 ─────────
@fig
def u02_vert17():
    return S(360, 112, vert('17', '4', '68', '1.7', '4', '6.8'))
@fig
def u02_vert171():
    return S(360, 112, vert('171', '4', '684', '1.71', '4', '6.84', '1/100배', None, '1/100배'))
@fig
def u02_split16():
    u = 34; o = ''
    for k in range(5):
        x = 20 + k * 74
        o += R(x, 20, u, 34, C2, EDGE, 2, 1) + T(x + u / 2, 42, '1', LINE, 12, 'middle', 700)
        o += R(x + u, 20, 0.6 * u * 1.4, 34, C1, EDGE, 2, 1) + T(x + u + 14, 42, '0.6', LINE, 10.5, 'middle', 700)
    e, x, y = eqs([[1, '×', 5, '+', '0.6', '×', 5, '=', 5, '+', 3, '=', 8]], 20, 92)
    return S(400, y + 6, o + e)
@fig
def u02_est21():
    o = L((30, 60), (330, 60), EDGE, 1.5)
    for v in range(0, 11):
        x = 30 + v * 30; o += L((x, 54), (x, 66), EDGE, 1.2) + T(x, 84, '%d' % (v * 1) if v in (0, 2, 4, 6, 8, 10) else '', SUB, 11)
    o += T(30 + 8 * 30, 46, '어림 8', ORG, 12, 'middle', 700) + PT(30 + 8.4 * 30, 60, BLUE, 5) + T(30 + 8.4 * 30 + 6, 108, '정확히 8.4', BLUE, 12, 'start', 700)
    e, _, _ = eqs([['2.1', '×', 4, '→', 2, '×', 4, '=', 8, '정도']], 20, 130, 40, 13)
    return S(360, 160, o + e)
@fig
def u02_zero():
    e, x, y = eqs([['0.25', '×', 4, '=', '1.00', '=', 1], ['2.50', '=', '2.5']], 20, 36, 46)
    return S(max(int(x) + 10, 300), y + 34, e + note(20, y + 2, 260, '소수점 아래 끝자리의 0은 생략할 수 있어요', 'gray'))

# ───────── 4-03 ─────────
@fig
def u03_est():
    o = L((30, 50), (330, 50), EDGE, 1.5)
    for k in range(11):
        x = 30 + k * 30; o += L((x, 44), (x, 56), EDGE, 1.1)
    o += T(30, 74, '0', SUB, 11) + T(240, 74, '0.7', ORG, 11.5, 'middle', 700) + T(330, 74, '1', SUB, 11) + PT(30 + 7.2 * 30, 50, BLUE, 5) + T(30 + 7.2 * 30 + 4, 32, '0.72', BLUE, 12, 'start', 700)
    e, _, y = eqs([[3, '×', '0.72', '→', 3, '×', '0.7', '=', '2.1', '정도']], 20, 104, 40, 13)
    return S(360, y + 6, o + e)
@fig
def u03_frac():
    e, x, y = eqs([[3, '×', '0.7', '=', 3, '×', ('f', 7, 10), '=', ('f', '3 × 7', 10), '=', ('f', 21, 10), '=', '2.1'],
                   [3, '×', '0.72', '=', 3, '×', ('f', 72, 100), '=', ('f', 216, 100), '=', '2.16']], 20, 36, 54)
    return S(int(x) + 10, y + 6, e)
@fig
def u03_half():
    u = 40   # 1 = 40 px
    o = ''
    for k, (lab, v, c) in enumerate([('5 × 0.5', 2.5, C1), ('5 × 1', 5, C2), ('5 × 1.5', 7.5, C3)]):
        y = 18 + k * 36; o += R(100, y, v * u, 26, c, EDGE, 3, 1) + T(90, y + 18, lab, LINE, 12, 'end', 700) + T(106 + v * u, y + 18, '%g' % v, LINE, 12, 'start', 700)
    o += L((100 + 5 * u, 12), (100 + 5 * u, 124), ORG, 1.4, '4 3') + T(100 + 5 * u, 140, '5', ORG, 11.5, 'middle', 700)
    o += T(20, 164, '1보다 작은 수를 곱하면 작아지고, 1보다 큰 수를 곱하면 커져요', SUB, 11.5, 'start')
    return S(440, 176, o)

@fig
def u03_swap():
    o, h = strips(3, 4, title='0.3 × 4 → 0.1이 3개씩 4묶음 = 1.2')
    e, x, y = eqs([[4, '×', '0.3', '=', '0.3', '×', 4, '=', '1.2']], 20, h + 30)
    return S(380, y + 30, o + e + note(20, y - 2, 300, '두 수를 바꾸어 곱해도 계산 결과는 같아요', 'green'))
@fig
def u03_09():
    o = R(20, 20, 300, 30, C2, EDGE, 3, 1.2) + T(170, 41, '3 × 1 = 3', LINE, 12, 'middle', 700)
    o += R(20, 70, 270, 30, C1, EDGE, 3, 1.2) + R(290, 70, 30, 30, '#fdecea', RED, 3, 1.2) + T(155, 91, '3 × 0.9 = 2.7', LINE, 12, 'middle', 700) + T(330, 91, '← 3 × 0.1 = 0.3', RED, 11.5, 'start', 700)
    return S(470, 120, o)

# ───────── 4-04 ─────────
@fig
def u04_vert13():
    return S(360, 112, vert('2', '13', '26', '2', '1.3', '2.6', None, '1/10배', '1/10배'))
@fig
def u04_est139():
    o = L((30, 50), (330, 50), EDGE, 1.5)
    for k in range(11):
        x = 30 + k * 30; o += L((x, 44), (x, 56), EDGE, 1.1)
    o += T(30, 74, '1', SUB, 11) + T(30 + 4 * 30, 74, '1.4', ORG, 11.5, 'middle', 700) + T(330, 74, '2', SUB, 11) + PT(30 + 3.9 * 30, 50, BLUE, 5) + T(30 + 3.9 * 30 - 4, 32, '1.39', BLUE, 12, 'end', 700)
    e, _, y = eqs([[2, '×', '1.39', '→', 2, '×', '1.4', '=', '2.8', '정도']], 20, 104, 40, 13)
    return S(360, y + 32, o + e + note(20, y + 4, 260, '1.39는 1보다 커서 곱은 2보다 커요', 'green'))
@fig
def u04_split12():
    o = R(20, 20, 150, 40, C2, EDGE, 2, 1.2) + R(170, 20, 30, 40, C1, EDGE, 2, 1.2)
    o += T(95, 45, '3 × 1 = 3', LINE, 12, 'middle', 700) + T(185, 76, '3 × 0.2 = 0.6', ORG, 11.5, 'middle', 700) + T(95, 76, '', SUB, 11)
    e, _, y = eqs([[3, '×', '1.2', '=', 3, '+', '0.6', '=', '3.6']], 220, 46, 40, 14)
    return S(420, 96, o + e)
@fig
def u04_compare():
    o = ''
    for k, (lab, v, c) in enumerate([('10 × 0.5', 5, C1), ('10 × 1', 10, C2), ('10 × 1.5', 15, C3)]):
        y = 18 + k * 36; o += R(110, y, v * 16, 26, c, EDGE, 3, 1) + T(100, y + 18, lab, LINE, 12, 'end', 700) + T(116 + v * 16, y + 18, '%g' % v, LINE, 12, 'start', 700)
    o += L((110 + 160, 12), (110 + 160, 124), ORG, 1.4, '4 3')
    return S(420, 132, o)
@fig
def u04_wrong34():
    e1, x1, _ = eqs([[2, '×', '3.4', '=', 6, '+', '0.8', '=', '6.8']], 44, 36)
    e2, x2, _ = eqs([[2, '×', '3.4', '=', '6.08']], 44, 86)
    return S(380, 120, e1 + e2 + ok(22, 40) + no(22, 90) + T(220, 90, '6과 0.8을 붙여 씀', RED, 11.5, 'start', 700))

# ───────── 4-05 ─────────
@fig
def u05_frac():
    e, x, y = eqs([['0.6', '×', '0.4', '=', ('f', 6, 10), '×', ('f', 4, 10), '=', ('f', 24, 100), '=', '0.24'],
                   ['0.06', '×', '0.4', '=', ('f', 6, 100), '×', ('f', 4, 10), '=', ('f', 24, 1000), '=', '0.024']], 20, 36, 54)
    return S(int(x) + 10, y + 6, e)
@fig
def u05_places():
    o = T(140, 34, '6', LINE, 18, 'end', 700) + T(80, 64, '×', SUB, 18, 'start') + T(140, 64, '4', LINE, 18, 'end', 700) + L((70, 74), (144, 74), LINE, 1.6) + T(140, 100, '24', LINE, 18, 'end', 700)
    o += T(330, 34, '0.06', LINE, 18, 'end', 700) + T(262, 64, '×', SUB, 18, 'start') + T(330, 64, '0.4', LINE, 18, 'end', 700) + L((256, 74), (334, 74), LINE, 1.6) + T(330, 100, '0.024', LINE, 18, 'end', 700)
    o += T(344, 30, '← 소수 두 자리 수', ORG, 11, 'start', 700) + T(344, 60, '← 소수 한 자리 수', ORG, 11, 'start', 700) + T(344, 96, '← 소수 세 자리 수', RED, 11, 'start', 700)
    o += T(200, 126, '0을 채워서 세 자리로', SUB, 11.5)
    return S(470, 134, o)
@fig
def u05_grid():
    o = areagrid(6, 4) + T(210, 90, '색칠한 칸 6 × 4 = 24칸', LINE, 12, 'start', 700) + T(210, 112, '→ 0.24', LINE, 12, 'start', 700) + T(210, 140, '전체 넓이가 1이라 1보다 작아요', SUB, 11, 'start')
    return S(410, 206, o)
@fig
def u05_wrong():
    e1, _, _ = eqs([['0.5', '×', '0.24', '→', 5, '×', 24, '=', 120]], 20, 34)
    o = T(20, 84, '소수점 아래 자리 수: 1 + 2 = 3자리', ORG, 12, 'start', 700)
    e2, _, _ = eqs([['0.120', '=', '0.12']], 20, 116)
    return S(360, 144, e1 + o + e2)
@fig
def u05_vert():
    o = vert('6', '4', '24', '0.6', '0.4', '0.24', '1/10배', '1/10배', '1/100배')
    return S(360, 112, o)

# ───────── 4-06 ─────────
@fig
def u06_est():
    e, x, y = eqs([['2.8', '×', '3.1', '→', 3, '×', 3, '=', 9, '정도'], [28, '×', 31, '=', 868, '→', '8.68']], 20, 34, 46)
    return S(max(int(x) + 10, 310), y + 34, e + note(20, y + 2, 270, '어림한 9와 가까워요 → 소수점 바르게', 'green'))
@fig
def u06_frac():
    e, x, y = eqs([['2.83', '×', '3.1', '=', ('f', 283, 100), '×', ('f', 31, 10), '=', ('f', 8773, 1000), '=', '8.773']], 20, 36)
    return S(max(int(x) + 10, 340), y + 34, e + note(20, y + 2, 300, '소수점 아래 자리 수 2 + 1 = 3', 'pale'))
@fig
def u06_wrong():
    o = L((30, 60), (350, 60), EDGE, 1.5)
    for v in range(0, 41, 5): x = 30 + v * 8; o += L((x, 54), (x, 66), EDGE, 1.1) + T(x, 84, '%d' % v, SUB, 11)
    o += PT(30 + 4 * 8, 60, GRN, 5) + T(30 + 4 * 8, 42, '어림 4', GRN, 12, 'middle', 700) + PT(30 + 3.99 * 8, 60, BLUE, 3)
    o += PT(30 + 39.9 * 8, 60, RED, 5) + T(30 + 39.9 * 8, 42, '39.9?', RED, 12, 'middle', 700)
    e, _, y = eqs([['1.9', '×', '2.1', '=', '3.99']], 20, 112, 40, 13)
    return S(380, 140, o + e)
@fig
def u06_bigsmall():
    o = ''
    for k, (lab, v, c) in enumerate([('3.2 × 0.5', 1.6, C1), ('3.2 × 1', 3.2, C2), ('3.2 × 2', 6.4, C3)]):
        y = 18 + k * 36; o += R(120, y, v * 36, 26, c, EDGE, 3, 1) + T(110, y + 18, lab, LINE, 12, 'end', 700) + T(126 + v * 36, y + 18, '%g' % v, LINE, 12, 'start', 700)
    o += L((120 + 3.2 * 36, 12), (120 + 3.2 * 36, 124), ORG, 1.4, '4 3')
    return S(400, 132, o)
@fig
def u06_vert():
    return S(360, 112, vert('28', '31', '868', '2.8', '3.1', '8.68', '1/10배', '1/10배', '1/100배'))

# ───────── 4-07 ─────────
@fig
def u07_x10():
    o, h = shift([('0.25 × 1', {2: '0', 3: '2', 4: '5'}, 2, ''), ('0.25 × 10', {3: '2', 4: '5'}, 3, '→ 한 칸'),
                  ('0.25 × 100', {3: '2', 4: '5'}, 4, '→ 두 칸'), ('0.25 × 1000', {3: '2', 4: '5', 5: '0'}, 5, '→ 세 칸 (0을 채움)')])
    rows = [('0.25 × 1', '0.25'), ('0.25 × 10', '2.5'), ('0.25 × 100', '25'), ('0.25 × 1000', '250')]
    o = ''
    for r, (lt, val) in enumerate(rows):
        y = 40 + r * 34; o += T(150, y, lt, LINE, 14, 'end', 700) + T(166, y, '=', SUB, 14) + T(250, y, val, BLUE, 17, 'end', 700)
    o += T(270, 74, '← 오른쪽으로 한 칸', ORG, 11.5, 'start', 700) + T(270, 108, '← 오른쪽으로 두 칸', ORG, 11.5, 'start', 700) + T(270, 142, '← 세 칸 (0을 채움)', ORG, 11.5, 'start', 700)
    o += note(20, 160, 330, '곱하는 수의 0의 수만큼 소수점이 오른쪽으로', 'pale')
    return S(440, 194, o)
@fig
def u07_x01():
    rows = [('270 × 1', '270'), ('270 × 0.1', '27'), ('270 × 0.01', '2.7'), ('270 × 0.001', '0.27')]
    o = ''
    for r, (lt, val) in enumerate(rows):
        y = 40 + r * 34; o += T(150, y, lt, LINE, 14, 'end', 700) + T(166, y, '=', SUB, 14) + T(250, y, val, BLUE, 17, 'end', 700)
    o += T(270, 74, '← 왼쪽으로 한 칸', ORG, 11.5, 'start', 700) + T(270, 108, '← 왼쪽으로 두 칸', ORG, 11.5, 'start', 700) + T(270, 142, '← 왼쪽으로 세 칸', ORG, 11.5, 'start', 700)
    o += note(20, 160, 360, '곱하는 수의 소수점 아래 자리 수만큼 왼쪽으로', 'pale')
    return S(440, 194, o)
@fig
def u07_fill0():
    o = T(20, 40, '27 × 0.001', LINE, 15, 'start', 700) + T(130, 40, '→', SUB, 15) + T(150, 40, '0 . 0 2 7', BLUE, 18, 'start', 700)
    o += L((176, 50), (192, 50), RED, 2) + T(184, 66, '0을 채움', RED, 11, 'middle', 700)
    o += no(20, 104) + T(44, 104, '27 × 0.001 = 0.27 (두 칸만 옮김)', RED, 12.5, 'start')
    return S(360, 120, o)
@fig
def u07_find():
    e, x, y = eqs([['0.25', '×', '□', '=', 25, '→', '오른쪽 두 칸', '→', '□ = 100'], [25, '×', '□', '=', '0.25', '→', '왼쪽 두 칸', '→', '□ = 0.01']], 20, 34, 46, 13)
    return S(int(x) + 10, y + 6, e)
@fig
def u07_same():
    e, x, y = eqs([['3.2', '×', '0.5', '=', '1.6', '(1 + 1 = 2자리)'], ['0.32', '×', 5, '=', '1.6', '(2 + 0 = 2자리)']], 20, 34, 46, 13)
    return S(max(int(x) + 10, 360), y + 34, e + note(20, y + 2, 320, '자리 수의 합이 같으면 곱도 같아요', 'green'))
@fig
def u07_flow():
    o = BOX(10, 14, 110, 40, ['① 어림하기', '(대략 얼마?)'], '#f8fafc', '#cbd2dc', LINE, 11.5) + AR((122, 34), (146, 34))
    o += BOX(148, 14, 120, 40, ['② 자연수처럼', '곱하기'], '#f8fafc', '#cbd2dc', LINE, 11.5) + AR((270, 34), (294, 34))
    o += BOX(296, 14, 140, 40, ['③ 자리 수의 합만큼', '소수점 찍기'], PALE, '#e7c27a', ORG, 11.5) + AR((366, 56), (366, 74))
    o += BOX(230, 76, 206, 30, '④ 어림한 값과 비교하기', GBG, '#6fbf8b', GRN, 11.5)
    return S(446, 114, o)

LFIG = {
    '4-01': ['u01_frac', 'u01_tenths', 'u01_frac28', 'u01_08x5', 'u01_hund', 'u01_tenth_x'],
    '4-02': ['u02_vert17', 'u02_vert171', 'u02_split16', 'u02_est21', 'u02_zero'],
    '4-03': ['u03_est', 'u03_frac', 'u03_half', 'u03_swap', 'u03_09'],
    '4-04': ['u04_vert13', 'u04_est139', 'u04_split12', 'u04_compare', 'u04_wrong34'],
    '4-05': ['u05_frac', 'u05_places', 'u05_grid', 'u05_wrong', 'u05_vert'],
    '4-06': ['u06_est', 'u06_frac', 'u06_wrong', 'u06_bigsmall', 'u06_vert'],
    '4-07': ['u07_x10', 'u07_x01', 'u07_fill0', 'u07_find', 'u07_same', 'u07_flow'],
}
def q_grid46():   # 4-05 질문: 0.4 × 0.6 (교재 102쪽 모양 — 칸 0.1, 칠한 부분만, 답은 아이가)
    return S(230, 210, areagrid(4, 6))
def a_grid57():   # 다시 묻기: 0.5 × 0.7
    return S(230, 210, areagrid(5, 7))
AFIG = {('4-05', 2): a_grid57}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_4단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
