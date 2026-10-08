# -*- coding: utf-8 -*-
"""초4-2 1단원(분수의 덧셈과 뺄셈) '긴 설명' 그림 — 규칙은 help_figs_e42_4.py 머리말과 같다.
   교재(8~15쪽)처럼 막대 모형 · 수직선 · 자연수끼리/분수끼리 묶은 식.
   그림만 보기: python -X utf8 help_figs_e42_1.py → 그림_긴설명_초4-2_1단원.html
"""
import math
from help_figs_e42_4 import S, T, L, P, D, AR, BOX, ok, no, cap, LINE, BLUE, ORG, GRN, RED, SUB, FILL, PALE, e

import re as _re
_T = T
def _tw(s, sz):   # 글자 폭 어림 (한글 1, 그 밖 0.6)
    return sum(sz * (1.0 if '가' <= ch <= '힣' else .6) for ch in s)
def T(x, y, s, c=LINE, sz=13, a='middle', w=400):
    """글 속 분수(2/5, 1과 2/5)를 교재처럼 세워 쓴다 — 그 밖은 보통 글자."""
    s = str(s); pat = _re.compile(r'(?:(\d+)[와과] )?(\d+)/(\d+)')
    if not pat.search(s): return _T(x, y, s, c, sz, a, w)
    parts, i = [], 0
    for m in pat.finditer(s):
        if m.start() > i: parts.append(('t', s[i:m.start()]))
        parts.append(('f', m.group(1), m.group(2), m.group(3))); i = m.end()
    if i < len(s): parts.append(('t', s[i:]))
    fs = sz * .95
    def pw(p):
        if p[0] == 't': return _tw(p[1], sz)
        fw = max(len(p[2]), len(p[3])) * fs * .62 + 4
        return fw + (len(p[1]) * sz * .62 + 2 if p[1] else 0)
    W = sum(pw(p) for p in parts); cx = x - (W / 2 if a == 'middle' else W if a == 'end' else 0); o = ''
    for p in parts:
        if p[0] == 't': o += _T(cx, y, p[1], c, sz, 'start', w)
        else:
            ww = len(p[1]) * sz * .62 + 2 if p[1] else 0
            if p[1]: o += _T(cx, y, p[1], c, sz, 'start', w)
            fw = max(len(p[2]), len(p[3])) * fs * .62 + 4; mx = cx + ww + fw / 2; ly = y - sz * .33
            o += _T(mx, ly - 2, p[2], c, fs, 'middle', w) + L((mx - fw / 2 + 1, ly), (mx + fw / 2 - 1, ly), c, 1.1) + _T(mx, ly + fs * .92, p[3], c, fs, 'middle', w)
        cx += pw(p)
    return o

OC = '#f2b36b'; GC = '#9fd48a'; BC = '#9cc3ef'; EMP = '#ffffff'

def FR(x, y, num, den, whole=None, c=LINE, sz=15, w=700):
    """세운 분수(교재 모양). x = 가운데, y = 가로줄 높이. whole 이 있으면 왼쪽에 자연수. (svg, 폭)"""
    fw = max(len(str(num)), len(str(den))) * sz * .62 + 6
    o = ''
    if whole is not None:
        ww = len(str(whole)) * sz * .62 + 3
        o += T(x - fw / 2 - ww / 2, y + sz * .36, str(whole), c, sz * 1.15, 'middle', w)
    o += T(x, y - 4, str(num), c, sz, 'middle', w) + L((x - fw / 2, y), (x + fw / 2, y), c, 1.4) + T(x, y + sz * .95, str(den), c, sz, 'middle', w)
    return o, fw + (len(str(whole)) * sz * .62 + 3 if whole is not None else 0)

def EXPR(x, y, toks, sz=15, gap=9):
    """식 한 줄. toks: '+', '=', '−', '→' 같은 글자 / ('f', 자연수 또는 None, 분자, 분모, 색) / ('n', '3', 색)."""
    o = ''; cx = x
    for t in toks:
        if isinstance(t, str):
            cw = sz * .8; o += T(cx + cw / 2, y + sz * .36, t, SUB, sz * 1.05, 'middle', 700); cx += cw + gap
        elif t[0] == 'n':
            cw = len(t[1]) * sz * .62 + 4; o += T(cx + cw / 2, y + sz * .36, t[1], t[2] if len(t) > 2 else LINE, sz * 1.15, 'middle', 700); cx += cw + gap
        elif t[0] == 'm':   # 대분수: 자연수 색 · 분수 색 따로
            _, wh, nu, de, cw_, cf_ = t
            ww = len(str(wh)) * sz * .62 + 3; fw = max(len(str(nu)), len(str(de))) * sz * .62 + 6
            o += T(cx + ww / 2, y + sz * .36, str(wh), cw_, sz * 1.15, 'middle', 700)
            s, _w = FR(cx + ww + fw / 2, y, nu, de, None, cf_, sz); o += s; cx += ww + fw + gap
        else:
            _, wh, nu, de = t[:4]; col = t[4] if len(t) > 4 else LINE
            fw = max(len(str(nu)), len(str(de))) * sz * .62 + 6
            ww = (len(str(wh)) * sz * .62 + 3) if wh is not None else 0
            s, _w = FR(cx + ww + fw / 2, y, nu, de, wh, col, sz); o += s; cx += ww + fw + gap
    return o, cx - x

def BAR(x, y, n, filled, cw=22, h=24, col=OC, cols=None, cross=(), dash=True, label=None):
    """막대 모형: n 칸 중 filled 칸 색칠. cols 로 칸마다 색. cross = ×표 칸 번호."""
    o = '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="#fff" stroke="%s" stroke-width="1.6"/>' % (x, y, n * cw, h, LINE)
    for k in range(n):
        c = (cols[k] if cols and k < len(cols) else (col if k < filled else None))
        if c: o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="%s"/>' % (x + k * cw + .8, y + .8, cw - 1.6, h - 1.6, c)
        if k: o += L((x + k * cw, y), (x + k * cw, y + h), '#7b8494', 1, '3 2' if dash else '')
        if k in cross: o += L((x + k * cw + 4, y + 4), (x + (k + 1) * cw - 4, y + h - 4), RED, 1.8) + L((x + (k + 1) * cw - 4, y + 4), (x + k * cw + 4, y + h - 4), RED, 1.8)
    o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="none" stroke="%s" stroke-width="1.6"/>' % (x, y, n * cw, h, LINE)
    if label: o += T(x + n * cw + 10, y + h / 2 + 5, label, SUB, 12, 'start', 700)
    return o

def WHOLE(x, y, w=110, h=24, col=OC, cross=False):   # 나누지 않은 1
    o = '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="%s" stroke="%s" stroke-width="1.6"/>' % (x, y, w, h, col, LINE)
    if cross: o += L((x + 8, y + 4), (x + w - 8, y + h - 4), RED, 1.8) + L((x + w - 8, y + 4), (x + 8, y + h - 4), RED, 1.8)
    return o

def NL(x0, x1, y, lo, hi, step, labels):   # 수직선: lo~hi, step 칸마다 눈금, labels {값: 글}
    o = L((x0 - 8, y), (x1 + 8, y), LINE, 1.6)
    n = round((hi - lo) / step); X = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0)
    for k in range(n + 1):
        v = lo + k * step; big = abs(v - round(v)) < 1e-9
        o += L((X(v), y - (8 if big else 4)), (X(v), y + (8 if big else 4)), LINE, 1.5 if big else 1)
        if big: o += T(X(v), y + 24, str(int(round(v))), LINE, 13, 'middle', 700)
    return o, X

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 1-01 ─────────
@fig
def f1_frac35():
    b = BAR(30, 40, 5, 3, cw=56, h=34)
    for k in range(5): s, _ = FR(30 + k * 56 + 28, 26 - 6, 1, 5, None, SUB, 11); b += s
    b += T(330, 54, '1/5이 3개', ORG, 13, 'start', 700)
    s, _ = FR(70, 120, 3, 5, None, ORG, 20); b += s
    b += T(100, 108, '← 분자: 색칠한 칸 수', SUB, 12, 'start') + T(100, 140, '← 분모: 똑같이 나눈 수', SUB, 12, 'start')
    return S(440, 160, b)

@fig
def f1_add38():
    cw = 26; b = ''; X0 = 110
    b += BAR(X0, 14, 8, 3, cw, col=OC) + EXPR(40, 26, [('f', None, 3, 8)], 14)[0]
    b += BAR(X0, 54, 8, 2, cw, col=GC) + EXPR(40, 66, [('f', None, 2, 8)], 14)[0]
    b += T(X0 + 4 * cw, 98, '↓', SUB, 16, 'middle', 700)
    b += BAR(X0, 106, 8, 5, cw, cols=[OC, OC, OC, GC, GC]) + EXPR(14, 118, [('f', None, 3, 8), '+', ('f', None, 2, 8)], 14, 4)[0]
    s, _ = EXPR(90, 168, [('f', None, 3, 8), '+', ('f', None, 2, 8), '=', ('f', None, '3+2', 8, ORG), '=', ('f', None, 5, 8, ORG)], 14); b += s
    b += T(340, 70, '분모는 그대로', ORG, 12.5, 'start', 700) + T(340, 88, '분자끼리 더해요', ORG, 12.5, 'start', 700)
    return S(460, 196, b)

@fig
def f1_96():
    cw = 26
    b = BAR(20, 30, 6, 6, cw, col=OC) + BAR(20 + 6 * cw + 16, 30, 6, 3, cw, col=OC)
    b += T(20 + 3 * cw, 76, '6/6 = 1', ORG, 13, 'middle', 700) + T(20 + 9 * cw + 16, 76, '3/6', ORG, 13, 'middle', 700)
    s, _ = EXPR(70, 116, [('f', None, 9, 6), '=', ('f', 1, 3, 6, ORG)], 16); b += s
    b += T(250, 112, '가분수 → 대분수', SUB, 12.5, 'start', 700)
    return S(380, 146, b)

@fig
def f1_wrong514():
    b = BAR(20, 24, 7, 5, 40, col=OC) + T(318, 43, '5/7 — 1/7 조각 5개', GRN, 12.5, 'start', 700) + ok(306, 44)
    b += BAR(20, 74, 14, 5, 20, col='#e8c7c7') + T(318, 93, '5/14 — 1/14 조각 5개', RED, 12.5, 'start', 700) + no(306, 94)
    b += cap(160, 128, '분모까지 더하면 조각이 작아져서 엉뚱한 수가 돼요')
    return S(470, 140, b)

@fig
def f1_three():
    cw = 22; cols = [OC] * 3 + [GC] * 4 + [BC] * 3
    b = BAR(20, 30, 10, 10, cw, cols=cols) + BAR(20 + 10 * cw + 16, 30, 10, 2, cw, cols=[BC, BC])
    b += T(20 + 5 * cw, 76, '10/10 = 1', ORG, 12.5, 'middle', 700) + T(20 + 15 * cw + 16, 76, '2/10', ORG, 12.5, 'middle', 700)
    b += T(22, 20, '3', '#c27a1a', 11, 'start', 700) + T(22 + 3 * cw + 2, 20, '4', '#3f8a2c', 11, 'start', 700) + T(22 + 7 * cw + 2, 20, '5', '#2f6fb3', 11, 'start', 700)
    s, _ = EXPR(60, 112, [('f', None, '3+4+5', 10), '=', ('f', None, 12, 10), '=', ('f', 1, 2, 10, ORG)], 14); b += s
    return S(520, 140, b)

# ───────── 1-02 ─────────
def mixed_box(x, y, items, sz=16):   # 대분수 식 — 자연수는 빨강 상자, 분수는 파랑 상자로 묶어 보여 준다
    return EXPR(x, y, items, sz)

@fig
def f1_mixed_add():
    s, w = EXPR(20, 52, [('m', 2, 1, 4, RED, BLUE), '+', ('m', 1, 2, 4, RED, BLUE), '=', ('n', '3', RED), '+', ('f', None, 3, 4, BLUE), '=', ('f', 3, 3, 4, ORG)], 17)
    b = s
    b += T(24, 104, '자연수 부분끼리 2 + 1 = 3', RED, 12.5, 'start', 700) + T(24, 124, '분수 부분끼리 1/4 + 2/4 = 3/4', BLUE, 12.5, 'start', 700)
    return S(420, 138, b)

@fig
def f1_carry54():
    cw = 24
    b = BAR(20, 22, 4, 4, cw, col=OC) + BAR(20 + 4 * cw + 14, 22, 4, 1, cw, col=OC)
    b += T(20 + 2 * cw, 66, '4/4 = 1', ORG, 12.5, 'middle', 700) + T(20 + 6 * cw + 14, 66, '1/4', ORG, 12.5, 'middle', 700)
    b += T(250, 40, '분수끼리 3/4 + 2/4 = 5/4', LINE, 12.5, 'start') + T(250, 60, '5/4 = 1과 1/4 → 1을 자연수로', ORG, 12.5, 'start', 700)
    s, _ = EXPR(20, 108, [('n', '2'), '+', ('f', 1, 1, 4, ORG), '=', ('f', 3, 1, 4, ORG)], 16); b += s
    return S(480, 136, b)

@fig
def f1_improper_add():
    b = BOX(10, 14, 74, 52, [''], '#fff5f5', '#e6a3a3') + EXPR(26, 40, [('f', 1, 5, 7)], 15)[0]
    b += AR((88, 40), (110, 40)) + EXPR(116, 40, [('f', None, 12, 7, ORG)], 15)[0]
    b += BOX(10, 82, 74, 52, [''], '#fff5f5', '#e6a3a3') + EXPR(26, 108, [('f', 2, 3, 7)], 15)[0]
    b += AR((88, 108), (110, 108)) + EXPR(116, 108, [('f', None, 17, 7, ORG)], 15)[0]
    b += T(56, 152, '1 = 7/7, 2 = 14/7', SUB, 11.5)
    s, _ = EXPR(180, 76, [('f', None, 12, 7), '+', ('f', None, 17, 7), '=', ('f', None, 29, 7), '=', ('f', 4, 1, 7, ORG)], 15); b += s
    return S(470, 162, b)

@fig
def f1_whole99():
    cw = 30
    b = BAR(20, 30, 9, 9, cw, cols=[OC] * 5 + [GC] * 4)
    b += T(20 + 2.5 * cw, 22, '5/9', '#c27a1a', 12, 'middle', 700) + T(20 + 7 * cw, 22, '4/9', '#3f8a2c', 12, 'middle', 700)
    b += T(20 + 4.5 * cw, 80, '빈칸 없이 꽉 참 → 9/9 = 1', ORG, 13, 'middle', 700)
    b += T(20 + 4.5 * cw, 106, '자연수 2 + 1 = 3, 여기에 1을 더해 답은 4', LINE, 12.5)
    return S(320, 120, b)

@fig
def f1_wrong75():
    cw = 26
    b = BAR(20, 30, 5, 5, cw, col=OC) + BAR(20 + 5 * cw + 14, 30, 5, 2, cw, col=OC)
    b += T(20 + 2.5 * cw, 76, '5/5 = 1', ORG, 12.5, 'middle', 700) + T(20 + 7.5 * cw + 14, 76, '2/5', ORG, 12.5, 'middle', 700)
    s, _ = EXPR(20, 116, [('f', 3, 7, 5, RED)], 15); b += s + no(78, 122)
    b += AR((96, 116), (124, 116)) + EXPR(132, 116, [('f', 4, 2, 5, GRN)], 15)[0] + ok(190, 122)
    b += T(340, 44, '7/5은 가분수', LINE, 12.5, 'start') + T(340, 64, '= 1과 2/5', ORG, 12.5, 'start', 700) + T(340, 84, '1을 자연수에 더해요', ORG, 12.5, 'start', 700)
    return S(480, 140, b)

# ───────── 1-03 ─────────
@fig
def f1_sub57():
    b = BAR(30, 30, 7, 5, 36, col=OC, cross=(3, 4))
    s, _ = EXPR(30, 108, [('f', None, 5, 7), '−', ('f', None, 2, 7), '=', ('f', None, '5−2', 7, ORG), '=', ('f', None, 3, 7, ORG)], 14); b += s
    b += T(300, 46, '× 2칸을 빼면', SUB, 12, 'start') + T(300, 64, '3칸이 남아요', ORG, 12.5, 'start', 700)
    return S(420, 136, b)

@fig
def f1_one38():
    b = BAR(30, 30, 8, 8, 32, col=OC, cross=(5, 6, 7)) + T(30 + 4 * 32, 22, '1 = 8/8', ORG, 12.5, 'middle', 700)
    s, _ = EXPR(30, 104, [('n', '1'), '−', ('f', None, 3, 8), '=', ('f', None, 8, 8), '−', ('f', None, 3, 8), '=', ('f', None, 5, 8, ORG)], 14); b += s
    return S(330, 132, b)

@fig
def f1_split5():
    b = WHOLE(20, 34, 150) + T(95, 26, '1 (나누지 않음)', SUB, 12)
    b += AR((178, 46), (210, 46)) + T(194, 70, '똑같이 5로', SUB, 11)
    b += BAR(222, 34, 5, 5, 30, col=OC, cross=(3, 4)) + T(222 + 75, 26, '5/5 — 1/5 조각 5개', ORG, 12, 'middle', 700)
    b += T(222 + 75, 90, '2개를 빼면 3/5', ORG, 12.5, 'middle', 700) + cap(95, 90, '이대로는 2/5를 뺄 수 없어요')
    return S(400, 106, b)

@fig
def f1_missing():
    cw = 26
    b = BAR(20, 34, 11, 9, cw, cols=[OC] * 5 + ['#fde4b8'] * 4)
    b += L((20 + 5 * cw, 26), (20 + 5 * cw, 66), RED, 2)
    b += T(20 + 2.5 * cw, 26, '남은 수 5/11', '#c27a1a', 12, 'middle', 700) + T(20 + 7 * cw, 26, '□', RED, 14, 'middle', 700)
    b += T(20 + 4.5 * cw, 90, '처음 수 9/11', SUB, 12, 'middle')
    s, _ = EXPR(60, 126, [('n', '□'), '=', ('f', None, 9, 11), '−', ('f', None, 5, 11), '=', ('f', None, 4, 11, ORG)], 14); b += s
    return S(330, 150, b)

# ───────── 1-04 ─────────
@fig
def f1_mixed_sub():
    cw = 26; b = ''
    for k in range(3): b += WHOLE(20 + k * 140, 30, 130, 24, OC, cross=(k == 2))
    b += BAR(440, 30, 5, 4, cw, col=OC, cross=(2, 3))
    b += T(215, 22, '3과 4/5', LINE, 13, 'middle', 700) + T(240, 86, '자연수 1개와 2/5만큼 × → 2와 2/5', ORG, 12.5, 'middle', 700)
    return S(580, 100, b)

@fig
def f1_whole_sub():
    cw = 20; b = ''
    for k in range(3): b += WHOLE(20 + k * 150, 32, 140, 24, OC, cross=(k == 2))
    b += BAR(470, 32, 7, 7, cw, col=OC, cross=(5, 6))
    b += T(540, 24, '1 = 7/7', ORG, 12, 'middle', 700) + T(300, 92, '4 = 3과 7/7 → 1과 2/7만큼 × → 2와 5/7', ORG, 12.5, 'middle', 700)
    return S(630, 104, b)

@fig
def f1_nl_sub():
    b, X = NL(30, 430, 60, 0, 5, .2, {})
    b += D((X(5), 60), ORG, 5) + D((X(8 / 5), 60), GRN, 5)
    b += '<path d="M%.1f 52 Q %.1f 0 %.1f 52" fill="none" stroke="%s" stroke-width="1.8" stroke-dasharray="5 4"/>' % (X(5), (X(5) + X(8 / 5)) / 2, X(8 / 5), BLUE)
    b += AR((X(8 / 5) + 14, 44), (X(8 / 5) + 2, 52), BLUE)
    b += T((X(5) + X(8 / 5)) / 2, 22, '17/5만큼 되돌아가기', BLUE, 12.5, 'middle', 700)
    b += T(X(5), 104, '25/5 (= 5)', ORG, 12, 'middle', 700) + T(X(8 / 5), 104, '8/5 = 1과 3/5', GRN, 12, 'middle', 700)
    return S(460, 116, b)

@fig
def f1_den_match():
    s, _ = EXPR(20, 50, [('n', '6'), '−', ('f', 2, 3, 8)], 18); b = s
    b += '<circle cx="90.5" cy="62" r="11" fill="none" stroke="%s" stroke-width="2"/>' % RED
    b += AR((103, 64), (178, 58), RED) + T(150, 92, '분모 8에 맞춰요', RED, 12, 'middle', 700)
    s, _ = EXPR(190, 50, [('n', '6'), '=', ('f', 5, 8, 8, ORG)], 18); b += s
    b += BAR(20, 118, 8, 8, 30, col=OC) + T(20 + 4 * 30, 112, '1 = 8/8', ORG, 12, 'middle', 700)
    return S(330, 150, b)

@fig
def f1_wrong_whole():
    b, X = NL(30, 430, 56, 0, 4, 1 / 7, {})
    b += D((X(4), 56), LINE, 5)
    b += D((X(3 + 2 / 7), 56), RED, 5) + T(X(3 + 2 / 7) + 2, 30, '친구 답 3과 2/7 ✗', RED, 12, 'start', 700)
    b += D((X(2 + 5 / 7), 56), GRN, 5) + T(X(2 + 5 / 7) - 6, 30, '바른 답 2와 5/7 ✓', GRN, 12, 'end', 700)
    b += L((X(2 + 5 / 7), 100), (X(4), 100), BLUE, 2) + T((X(2 + 5 / 7) + X(4)) / 2, 116, '1과 2/7만큼', BLUE, 11.5, 'middle', 700)
    return S(500, 126, b)

# ───────── 1-05 ─────────
@fig
def f1_borrow_sub():
    cw = 24
    b = T(20, 22, '3과 1/4', LINE, 13, 'start', 700) + WHOLE(20, 30, 96) + WHOLE(124, 30, 96) + BAR(228, 30, 4, 4, cw, col='#f7d6a8') + BAR(332, 30, 4, 1, cw)
    b += T(280, 22, '1을 4/4로', ORG, 12, 'middle', 700)
    b += T(20, 92, '2와 5/4', LINE, 13, 'start', 700) + WHOLE(20, 100, 96) + WHOLE(124, 100, 96, cross=True)
    b += BAR(228, 100, 4, 4, cw, col='#f7d6a8', cross=(1, 2, 3)) + BAR(332, 100, 4, 1, cw)
    b += T(330, 150, '1과 3/4만큼 × → 1과 2/4', ORG, 12.5, 'middle', 700)
    return S(450, 160, b)

@fig
def f1_borrow_detail():
    b = T(18, 46, '3과 1/4', LINE, 14, 'start', 700) + T(90, 46, '=', SUB, 14, 'middle', 700)
    b += T(110, 46, '2', RED, 16, 'start', 700) + T(132, 46, '+', SUB, 14, 'middle', 700)
    b += BAR(146, 30, 4, 4, 22, col='#f7d6a8') + T(146 + 44, 22, '받아내린 1 = 4/4', ORG, 11.5, 'middle', 700)
    b += T(250, 46, '+', SUB, 14, 'middle', 700) + BAR(264, 30, 4, 1, 22)
    s, _ = EXPR(110, 112, [('n', '2', RED), '+', ('f', None, '4+1', 4, ORG), '=', ('f', 2, 5, 4, ORG)], 15); b += s
    b += T(330, 90, '자연수는 1 줄고', SUB, 12, 'start') + T(330, 108, '분자는 4만큼 커져요', SUB, 12, 'start')
    return S(460, 138, b)

@fig
def f1_improper_sub():
    b = EXPR(14, 40, [('f', 4, 2, 6), '→', ('f', None, 26, 6, ORG)], 15)[0] + EXPR(14, 104, [('f', 1, 5, 6), '→', ('f', None, 11, 6, ORG)], 15)[0]
    b += T(56, 140, '4 = 24/6', SUB, 11.5)
    b += L((150, 20), (150, 130), '#d6dae2', 1.4)
    s, _ = EXPR(170, 72, [('f', None, 26, 6), '−', ('f', None, 11, 6), '=', ('f', None, 15, 6), '=', ('f', 2, 3, 6, ORG)], 15); b += s
    return S(480, 150, b)

@fig
def f1_order():
    s, _ = EXPR(20, 36, [('f', None, 4, 7), '−', ('f', None, 1, 7)], 14); b = s + no(118, 42) + T(140, 40, '순서를 바꾸면 다른 계산', RED, 12, 'start', 700)
    s, _ = EXPR(20, 100, [('f', 5, 1, 7), '=', ('f', 4, 8, 7, ORG)], 15); b += s + T(150, 92, '5에서 1만큼을 7/7로', SUB, 11.5, 'start')
    s, _ = EXPR(20, 160, [('f', 4, 8, 7, ORG), '−', ('f', 2, 4, 7), '=', ('f', 2, 4, 7, GRN)], 15); b += s + ok(220, 166)
    return S(420, 184, b)

@fig
def f1_compare():
    b = BAR(70, 24, 9, 2, 30, col=OC) + BAR(70, 66, 9, 5, 30, col=GC)
    b += EXPR(16, 36, [('f', None, 2, 9)], 13)[0] + EXPR(16, 78, [('f', None, 5, 9)], 13)[0]
    b += T(70 + 4.5 * 30, 124, '2/9가 더 작아서 바로 뺄 수 없어요 → 1을 9/9로 받아내림', ORG, 12.5, 'middle', 700)
    return S(380, 136, b)

@fig
def f1_summary():
    b = BOX(6, 40, 120, 60, ['분모가 같은', '분수의 계산'], '#f8fafc', '#cbd2dc', LINE, 12)
    b += AR((126, 70), (148, 70))
    b += BOX(150, 34, 140, 72, ['① 분모는 그대로', '분자끼리 계산'], PALE, ORG, ORG, 12, True)
    b += AR((290, 70), (312, 70))
    b += BOX(314, 34, 140, 72, ['② 대분수는', '자연수끼리·분수끼리'], '#f0f4fc', '#9fb6e0', BLUE, 12, True)
    b += AR((454, 56), (476, 30)) + AR((454, 84), (476, 110))
    b += BOX(478, 8, 150, 48, ['③ 더하기: 가분수면', '1을 자연수로'], '#ecfdf3', '#6fbf8b', GRN, 11.5)
    b += BOX(478, 86, 150, 48, ['③ 빼기: 못 빼면', '1을 가분수로'], '#fff5f5', '#e6a3a3', RED, 11.5)
    return S(636, 142, b)

LFIG = {
    '1-01': ['f1_frac35', 'f1_add38', 'f1_96', 'f1_wrong514', 'f1_three'],
    '1-02': ['f1_mixed_add', 'f1_carry54', 'f1_improper_add', 'f1_whole99', 'f1_wrong75'],
    '1-03': ['f1_sub57', 'f1_one38', 'f1_split5', 'f1_missing'],
    '1-04': ['f1_mixed_sub', 'f1_whole_sub', 'f1_nl_sub', 'f1_den_match', 'f1_wrong_whole'],
    '1-05': ['f1_borrow_sub', 'f1_borrow_detail', 'f1_improper_sub', 'f1_order', 'f1_compare', 'f1_summary'],
}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os, sys
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_1단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
