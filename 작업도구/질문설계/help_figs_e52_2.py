# -*- coding: utf-8 -*-
"""초5-2 2단원(분수의 곱셈) '긴 설명' 그림 — help_figs_e52_1.py 의 그리기 도구를 같이 쓴다 (2026-10-12).
   식은 교재 모양(세운 분수 · 약분 표시: 지운 수 위·아래에 작은 빨간 수). 숫자는 긴 설명의 예와 같게.
   그림만 보기: python -X utf8 help_figs_e52_2.py → 그림_긴설명_초5-2_2단원.html
"""
from help_figs_e52_1 import S, T, L, R, BOX, AR, CURVE, ok, no, PT, LINE, BLUE, ORG, GRN, RED, SUB, PALE, FILL, GBG

SH = '#f4b183'; SH2 = '#9fb6e0'; EMP = '#ffffff'; EDGE = '#6b7280'

def FR(x, y, num, den, c=LINE, sz=15, cn=None, cd=None):
    """세운 분수 (x = 가운데, y = 가로선). cn/cd = 약분한 뒤의 수(있으면 원래 수에 빗금 + 작은 빨간 수)"""
    w = max(len(str(num)), len(str(den))) * sz * .62 + 6
    o = T(x, y - 5, num, c, sz, 'middle', 700) + T(x, y + sz + 2, den, c, sz, 'middle', 700)
    o += L((x - w / 2, y), (x + w / 2, y), c, 1.5)
    if cn is not None:
        o += L((x - 6, y - 7), (x + 6, y - 19), RED, 1.4) + T(x, y - 23, cn, RED, 10.5, 'middle', 700)
    if cd is not None:
        o += L((x - 6, y + 17), (x + 6, y + 5), RED, 1.4) + T(x, y + 32, cd, RED, 10.5, 'middle', 700)
    return o, w

def MX(x, y, whole, num, den, c=LINE, sz=15):
    """대분수: 자연수 바로 옆 세운 분수. x = 왼쪽 끝"""
    ww = len(str(whole)) * sz * .62
    o = T(x + ww / 2, y + sz * .45, whole, c, sz + 2, 'middle', 700)
    f, fw = FR(x + ww + 2 + (max(len(str(num)), len(str(den))) * sz * .62 + 6) / 2, y, num, den, c, sz - 2)
    return o + f, ww + 2 + fw

def EXPR(x, y, items, sz=15):
    """식 한 줄. items: ('f', 분자, 분모[, 약분분자, 약분분모]) · ('m', 자연수, 분자, 분모) · 글자(연산 기호·자연수)"""
    o = ''
    for it in items:
        if isinstance(it, tuple) and it[0] == 'f':
            cn = it[3] if len(it) > 3 else None; cd = it[4] if len(it) > 4 else None
            w = max(len(str(it[1])), len(str(it[2]))) * sz * .62 + 6
            f, _ = FR(x + w / 2, y, it[1], it[2], LINE, sz, cn, cd); o += f; x += w + 7
        elif isinstance(it, tuple) and it[0] == 'm':
            f, w = MX(x, y, it[1], it[2], it[3], LINE, sz); o += f; x += w + 7
        elif isinstance(it, tuple) and it[0] == 'n':   # 지운 자연수: ('n', 원래 수, 약분한 수)
            ww = len(str(it[1])) * sz * .62
            o += T(x + ww / 2, y + sz * .45, it[1], LINE, sz + 1, 'middle', 700) + L((x, y + 8), (x + ww, y - 6), RED, 1.4) + T(x + ww / 2, y - 12, it[2], RED, 10.5, 'middle', 700)
            x += ww + 7
        else:
            s = str(it); ww = sum(sz * (.95 if ord(ch) > 0x1100 else .62) for ch in s)
            col = SUB if s in ('×', '=', '+', '−', '→') else LINE
            o += T(x + ww / 2, y + sz * .45, s, col, sz + 1, 'middle', 700 if col == LINE else 400); x += ww + 7
    return o, x

def BAR(x, y, n, shade, w=240, h=26, cols=None, label=None):
    """띠: n칸, shade = 칠할 칸 번호 집합(또는 개수)"""
    o = ''; cw = w / n
    sh = set(range(shade)) if isinstance(shade, int) else set(shade)
    for k in range(n):
        c = (cols[k] if cols and k in cols else SH) if k in sh else EMP
        o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s" stroke="%s" stroke-width="1.2"/>' % (x + k * cw, y, cw, h, c, EDGE)
    if label: o += T(x + w + 10, y + h / 2 + 5, label, LINE, 13, 'start', 700)
    return o

def GRID(x, y, rows, cols, shade, s=180, fill=SH, title=None):
    """정사각형을 rows × cols 로 나누고 shade(행 수, 열 수)만큼 왼쪽 위부터 칠함"""
    o = ''; ch, cw = s / rows, s / cols
    for r in range(rows):
        for c in range(cols):
            on = r < shade[0] and c < shade[1]
            o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s" stroke="%s" stroke-width="%s"%s/>' % (
                x + c * cw, y + r * ch, cw, ch, fill if on else EMP, EDGE, 1, ' stroke-dasharray="3 2"' if not on else '')
    o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="none" stroke="%s" stroke-width="1.8"/>' % (x, y, s, s, LINE)
    return o

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 2-01 (분수)×(자연수) ─────────
@fig
def f_yak12_18():
    b = FR(34, 20, 12, 18, SUB, 12)[0] + BAR(70, 10, 18, 12, 270, 24)
    b += FR(34, 74, 2, 3, SUB, 12)[0] + BAR(70, 64, 3, 2, 270, 24)
    b += L((70 + 180, 34), (70 + 180, 64), RED, 1.4, '4 3') + T(260, 54, '길이가 같음', RED, 11, 'start')
    e, _ = EXPR(70, 124, [('f', 12, 18), '→', '분모·분자를 6으로 나눔', '→', ('f', 2, 3)])
    return S(420, 150, b + e)

@fig
def f_add15x4():
    b = BAR(20, 14, 5, 4, 260, 30, cols={0: '#f4b183', 1: '#f8cba6', 2: '#f4b183', 3: '#f8cba6'})
    for k in range(4): b += FR(20 + 52 * k + 26, 26, 1, 5, LINE, 10)[0]
    e, _ = EXPR(20, 82, [('f', 1, 5), '+', ('f', 1, 5), '+', ('f', 1, 5), '+', ('f', 1, 5), '=', ('f', '1 × 4', 5), '=', ('f', 4, 5)])
    return S(430, 116, b + e)

@fig
def f_mul58x2():
    e, x = EXPR(20, 34, [('f', 5, 8, None, 4), '×', ('n', 2, 1), '=', ('f', '5 × 1', 4), '=', ('f', 5, 4), '=', ('m', 1, 1, 4)])
    b = BOX(20, 80, 300, 26, '분모 8과 자연수 2를 2로 먼저 약분 · 분모는 그대로', PALE, '#e7c27a', ORG, 11.5)
    return S(max(340, int(x) + 10), 116, e + b)

@fig
def f_wrong15x3():
    b = ok(14, 30) + BAR(40, 12, 5, 3, 250, 26) + EXPR(300, 22, [('f', 3, 5), '=', ('f', 1, 5), '의 3배'], 12)[0]
    b += no(14, 84) + BAR(40, 66, 15, 3, 250, 26) + EXPR(300, 76, [('f', 3, 15), '=', ('f', 1, 5)], 12)[0]
    b += L((40 + 50, 38), (40 + 50, 66), RED, 1.2, '3 3') + T(40, 118, '분모에도 곱하면 조각만 잘게 나뉘어 크기가 그대로예요', SUB, 11.5, 'start')
    return S(440, 130, b)

@fig
def f_mixed129x3():
    b = BOX(10, 10, 210, 104, [''], '#f8fafc', '#cbd2dc') + T(115, 30, '가분수로 바꾸기', BLUE, 12, 'middle', 700)
    e, _ = EXPR(20, 64, [('m', 1, 2, 9), '×', 3, '=', ('f', 11, 9, None, 3), '×', ('n', 3, 1), '=', ('f', 11, 3)], 13); b += e
    b += BOX(232, 10, 220, 104, [''], '#f8fafc', '#cbd2dc') + T(342, 30, '나누어 곱하기', GRN, 12, 'middle', 700)
    e, _ = EXPR(242, 60, [1, '×', 3, '+', ('f', 2, 9), '×', 3], 13); b += e
    e, _ = EXPR(242, 96, ['=', 3, '+', ('f', 2, 3), '=', ('m', 3, 2, 3)], 13); b += e
    return S(462, 124, b)

@fig
def f_nat56x12():
    e1, _ = EXPR(40, 30, [('f', 5, 6), '×', 12, '=', ('f', 60, 6), '=', 10]); e2, _ = EXPR(40, 92, [('f', 5, 6), '×', 4, '=', ('f', 20, 6), '=', ('m', 3, 1, 3)])
    b = e1 + e2 + ok(18, 38) + no(18, 100) + T(300, 36, '60은 6으로 나누어떨어짐 → 자연수', GRN, 11.5, 'start', 700) + T(300, 98, '20은 6으로 나누어떨어지지 않음', RED, 11.5, 'start', 700)
    return S(520, 126, b)

# ───────── 2-02 (자연수)×(분수) ─────────
@fig
def f_20of35():
    b = ''
    for g in range(5):
        x = 16 + g * 78
        on = g < 3
        b += R(x, 12, 70, 48, '#fff4e5' if on else '#f8fafc', ORG if on else '#cbd2dc', 8, 1.6 if on else 1)
        for k in range(4): b += '<circle cx="%.1f" cy="36" r="7" fill="%s" stroke="%s" stroke-width="1"/>' % (x + 12 + k * 15.5, '#f59e0b' if on else '#e5e7eb', '#b45309' if on else '#9ca3af')
    b += T(16 + 3 * 78 / 2 + 70 / 2 - 35, 80, '3묶음 = 12개', ORG, 12.5, 'middle', 700) + T(370, 80, '5묶음 중', SUB, 11.5)
    e, _ = EXPR(90, 116, [20, '×', ('f', 3, 5), '=', ('f', 60, 5), '=', 12]); return S(420, 146, b + e)

@fig
def f_nat5x34():
    e, x = EXPR(20, 36, [5, '×', ('f', 3, 4), '=', ('f', 5, 1), '×', ('f', 3, 4), '=', ('f', '5 × 3', '1 × 4'), '=', ('f', 15, 4), '=', ('m', 3, 3, 4)])
    b = BOX(20, 82, 240, 26, '(자연수)를 (자연수)/1로 생각하기', PALE, '#e7c27a', ORG, 11.5)
    return S(int(x) + 10, 116, e + b)

@fig
def f_wrong8x34():
    e1, _ = EXPR(44, 30, [('f', 8, 1), '×', ('f', 3, 4), '=', ('f', '8 × 3', '1 × 4'), '=', ('f', 24, 4), '=', 6])
    e2, _ = EXPR(44, 96, [8, '×', ('f', 3, 4), '=', ('f', '8 × 3', '8 × 4'), '=', ('f', 24, 32)])
    b = e1 + e2 + ok(20, 38) + no(20, 104) + T(306, 104, '자연수의 분모는 1', RED, 11.5, 'start', 700)
    return S(440, 130, b)

@fig
def f_cancel16x38():
    e, x = EXPR(30, 40, [('n', 16, 2), '×', ('f', 3, 8, None, 1), '=', 2, '×', 3, '=', 6])
    b = BOX(20, 80, 250, 26, '16과 8을 8로 먼저 약분하면 수가 작아져요', PALE, '#e7c27a', ORG, 11.5)
    return S(300, 116, e + b)

@fig
def f_swap25x4():
    b = BOX(10, 10, 200, 92, [''], '#f8fafc', '#cbd2dc') + T(110, 30, '4번 더하기', BLUE, 12, 'middle', 700)
    e, _ = EXPR(36, 66, [('f', 2, 5), '×', 4, '=', ('f', 8, 5)]); b += e
    b += BOX(240, 10, 200, 92, [''], '#f8fafc', '#cbd2dc') + T(340, 30, '4의 몇 분의 몇', GRN, 12, 'middle', 700)
    e, _ = EXPR(266, 66, [4, '×', ('f', 2, 5), '=', ('f', 8, 5)]); b += e
    b += T(225, 62, '=', ORG, 22, 'middle', 700) + T(225, 124, '순서를 바꾸어도 곱은 같아요', ORG, 12, 'middle', 700)
    return S(450, 136, b)

# ───────── 2-03 진분수의 곱셈 ─────────
@fig
def f_sq45x23():
    b = GRID(20, 14, 5, 3, (4, 2), 160)
    b += T(100, 196, '가로 3칸 × 세로 5칸 = 15칸', SUB, 11.5)
    e, _ = EXPR(210, 80, [('f', 4, 5), '×', ('f', 2, 3), '=', ('f', '4 × 2', '5 × 3'), '=', ('f', 8, 15)])
    b += T(300, 140, '색칠한 칸 4 × 2 = 8칸', ORG, 12, 'middle', 700)
    return S(460, 206, b + e)

@fig
def f_sq15x13():
    b = GRID(20, 14, 5, 3, (1, 1), 150)
    b += T(95, 184, '15칸 중 1칸', ORG, 12, 'middle', 700)
    e, _ = EXPR(200, 80, [('f', 1, 5), '×', ('f', 1, 3), '=', ('f', 1, '5 × 3'), '=', ('f', 1, 15)])
    return S(420, 196, b + e)

@fig
def f_cancel58x23():
    e, x = EXPR(20, 40, [('f', 5, 8, None, 4), '×', ('f', 2, 3, 1), '=', ('f', '5 × 1', '4 × 3'), '=', ('f', 5, 12)])
    b = BOX(20, 84, 270, 26, '분자 2와 분모 8을 2로 먼저 약분', PALE, '#e7c27a', ORG, 11.5)
    return S(max(int(x) + 20, 310), 118, e + b)

@fig
def f_half34():
    b = FR(28, 22, 3, 4, SUB, 12)[0] + BAR(56, 12, 4, 3, 280, 28)
    b += T(28, 87, '그 반', SUB, 12, 'middle', 700) + T(346, 88, '진한 칸 3개', '#e8762c', 11.5, 'start', 700) + BAR(56, 68, 8, {0, 2, 4}, 280, 28, cols={0: '#e8762c', 2: '#e8762c', 4: '#e8762c'})
    for k in (1, 3, 5): b += '<rect x="%.1f" y="68" width="35" height="28" fill="#fbd7b8" stroke="%s" stroke-width="1.2"/>' % (56 + k * 35, EDGE)
    e, _ = EXPR(110, 140, [('f', 3, 4), '×', ('f', 1, 2), '=', ('f', 3, 8)])
    return S(440, 170, b + e)

@fig
def f_times6():
    b = ''; base = 150
    for k, (lab, v) in enumerate([([6, '×', ('f', 1, 2)], 3), ([6, '×', 1], 6), ([6, '×', 2], 12)]):
        x = 40 + k * 110; h = v * 10
        b += R(x, base - h, 56, h, ['#fbd7b8', '#c7d3f0', '#c9e5c3'][k], '#6b7280', 3, 1) + T(x + 28, base - h - 8, v, LINE, 14, 'middle', 700) + EXPR(x + 4, base + 14, lab, 11)[0]
    b += L((24, base), (380, base), '#6b7280', 1.4) + L((24, base - 60), (380, base - 60), ORG, 1.2, '4 3') + T(384, base - 56, '6', ORG, 12, 'start', 700)
    b += T(200, 204, '1보다 작은 수를 곱하면 작아지고, 큰 수를 곱하면 커져요', SUB, 11.5)
    return S(420, 214, b)

# ───────── 2-04 여러 가지 분수의 곱셈 ─────────
@fig
def f_mix214():
    b = BAR(20, 14, 4, 4, 120, 30) + BAR(150, 14, 4, 4, 120, 30) + BAR(280, 14, 4, 1, 120, 30)
    b += FR(80, 60, 4, 4, SUB, 11)[0] + FR(210, 60, 4, 4, SUB, 11)[0] + FR(340, 60, 1, 4, SUB, 11)[0]
    e, _ = EXPR(70, 106, [('m', 2, 1, 4), '=', ('f', '2 × 4 + 1', 4), '=', ('f', 9, 4)])
    return S(420, 140, b + e)

@fig
def f_cancel94x43():
    e1, x = EXPR(20, 40, [('m', 2, 1, 4), '×', ('m', 1, 1, 3), '=', ('f', 9, 4, 3, 1), '×', ('f', 4, 3, 1, 1), '=', 3])
    b = BOX(20, 84, 300, 26, '가분수로 바꾼 뒤 9와 3, 4와 4를 약분', PALE, '#e7c27a', ORG, 11.5)
    return S(max(int(x) + 20, 340), 118, e1 + b)

@fig
def f_three():
    e, x = EXPR(20, 44, [('f', 1, 3, None, 1), '×', ('f', 3, 4, 1, 2), '×', ('f', 2, 7, 1), '=', ('f', 1, '1 × 2 × 7'), '=', ('f', 1, 14)])
    b = BOX(20, 88, 300, 26, '세 분수도 분자끼리 · 분모끼리, 약분은 먼저', PALE, '#e7c27a', ORG, 11.5)
    return S(max(int(x) + 20, 340), 122, e + b)

@fig
def f_mix125x4():
    b = ''
    for k in range(4):
        x = 16 + k * 104
        b += R(x, 14, 46, 30, '#c7d3f0', '#3b6fa8', 3, 1.2) + T(x + 23, 34, '1', LINE, 13, 'middle', 700)
        b += BAR(x + 50, 14, 5, 2, 46, 30)
        b += MX(x + 34, 58, 1, 2, 5, SUB, 11)[0]
    b += T(210, 94, '자연수 부분도 4번, 분수 부분도 4번 더해져요', ORG, 12, 'middle', 700)
    e, _ = EXPR(60, 124, [4, '+', ('f', 8, 5), '=', 4, '+', ('m', 1, 3, 5), '=', ('m', 5, 3, 5)])
    return S(430, 152, b + e)

@fig
def f_area_split():
    u = 60; x0, y0 = 40, 20
    W = 2.5 * u; H1 = u; H2 = u / 5
    b = R(x0, y0 + H2, W, H1, '#c7d3f0', '#3b6fa8', 0, 1.4) + R(x0, y0, W, H2, '#fbd7b8', '#b45309', 0, 1.4)
    b += EXPR(x0 + 30, y0 + H2 + H1 / 2 - 4, [('m', 2, 1, 2), '×', 1], 11)[0] + T(x0 + W + 6, y0 + H2 / 2 + 5, '←', ORG, 12, 'start', 700) + EXPR(x0 + W + 22, y0 + H2 / 2 - 4, [('m', 2, 1, 2), '×', ('f', 1, 5)], 11)[0]
    b += L((x0, y0 + H1 + H2 + 14), (x0 + W, y0 + H1 + H2 + 14), SUB, 1) + MX(x0 + W / 2 - 14, y0 + H1 + H2 + 26, 2, 1, 2, SUB, 11)[0]
    b += T(x0 - 8, y0 + H2 + H1 / 2 + 5, '1', SUB, 11.5, 'end') + FR(x0 - 14, y0 + 2, 1, 5, SUB, 9)[0]
    e, _ = EXPR(250, 100, [('m', 2, 1, 2), '+', ('f', 1, 2), '=', 3], 14)
    return S(420, 140, b + e)

@fig
def f_flow():
    b = BOX(10, 10, 130, 34, '자연수 → (자연수)/1', '#f8fafc', '#cbd2dc', LINE, 11.5) + BOX(10, 54, 130, 34, '대분수 → 가분수', '#f8fafc', '#cbd2dc', LINE, 11.5)
    b += AR((142, 27), (170, 46)) + AR((142, 71), (170, 54))
    b += BOX(172, 32, 100, 34, '먼저 약분', PALE, '#e7c27a', ORG, 12, True) + AR((274, 49), (300, 49))
    b += BOX(302, 26, 130, 46, ['분자는 분자끼리', '분모는 분모끼리'], GBG, '#6fbf8b', GRN, 11.5)
    b += T(220, 108, '1보다 작은 수를 곱하면 결과가 작아지는지도 확인', SUB, 11.5)
    return S(440, 118, b)

LFIG = {
    '2-01': ['f_yak12_18', 'f_add15x4', 'f_mul58x2', 'f_wrong15x3', 'f_mixed129x3', 'f_nat56x12'],
    '2-02': ['f_20of35', 'f_nat5x34', 'f_wrong8x34', 'f_cancel16x38', 'f_swap25x4'],
    '2-03': ['f_sq45x23', 'f_sq15x13', 'f_cancel58x23', 'f_half34', 'f_times6'],
    '2-04': ['f_mix214', 'f_cancel94x43', 'f_three', 'f_mix125x4', 'f_area_split', 'f_flow'],
}
def a3_grid27():   # 다시 묻기: 2 × 7 = 14칸으로 나눈 정사각형(칠하지 않음)
    o = ''; s = 150
    for c in range(1, 7):
        x = 20 + s * c / 7; o += L((x, 20), (x, 20 + s), SUB, 1.2)
    o += L((20, 20 + s / 2), (20 + s, 20 + s / 2), SUB, 1.2)
    o += R(20, 20, s, s, 'none', LINE, 0, 2)
    return S(190, 190, o)
AFIG = {('2-03', 1): a3_grid27}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_2단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
