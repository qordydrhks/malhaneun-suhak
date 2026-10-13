# -*- coding: utf-8 -*-
"""초6-2 2단원(소수의 나눗셈) '긴 설명' 그림 — help_figs_e52_1·2 의 그리기 도구를 같이 쓴다 (2026-10-14).
   LFIG[tag][i] = 그림 이름 — help_e62_2.H[tag][i] 의 긴 설명에 붙는다. 숫자는 긴 설명의 예와 같게, 다시 묻기와 다르게. 재탕 금지.
   세로셈은 교재(디딤돌 6-2 38~48쪽) 모양: 옮긴 소수점은 빨간 굽은 화살표, 몫의 소수점은 옮긴 소수점 위치에 맞춤.
   그림만 보기: python -X utf8 help_figs_e62_2.py → 그림_긴설명_초6-2_2단원.html
"""
from help_figs_e52_1 import S, T, L, R, BOX, AR, CURVE, ok, no, PT, LINE, BLUE, ORG, GRN, RED, SUB, PALE, FILL, GBG
from help_figs_e52_2 import FR, EXPR, BAR, SH, SH2, EMP, EDGE

F = {}
def fig(fn): F[fn.__name__] = fn; return fn
PINK = '#e8590c'; HL = '#fde7c7'; HL2 = '#dbe7fb'

def _w(ch, sz):
    if ch == '.': return sz * .32
    if ch in ' ': return sz * .3
    if ch in '÷×=+−→': return sz * .9
    if ord(ch) > 0x1100: return sz * .98
    return sz * .6

def SEQ(x, y, toks, sz=16, cols=None):
    """식 한 줄 — toks = 글자 조각 목록. 돌려줌: (svg, [조각마다 가운데 x], 끝 x). cols = {조각 번호: (글자색, 바탕색)}"""
    o = ''; cs = []
    for k, t in enumerate(toks):
        t = str(t); w = sum(_w(c, sz) for c in t) + (8 if k else 0)
        cx = x + w / 2 + (4 if k else 0); cs.append(cx)
        fc, bg = (cols or {}).get(k, (SUB if t in ('÷', '=', '×', '→', '+', '−') else LINE, None))
        if bg: o += R(cx - w / 2 + 2, y - sz * .9, w - 4, sz * 1.25, bg, bg, 4)
        o += T(cx, y, t, fc, sz, 'middle', 700 if fc != SUB else 400)
        x += w
    return o, cs, x

def BRK(xa, xb, y, lab, up=True, c=SUB):
    """두 조각을 잇는 꺾인 화살표(교재의 10배 표시) — 위(up) 또는 아래"""
    d = -1 if up else 1; h = 16
    o = L((xa, y), (xa, y + d * h), c, 1.3) + L((xa, y + d * h), (xb, y + d * h), c, 1.3) + AR((xb, y + d * h), (xb, y + d * 2), c, 1.3)
    return o + T((xa + xb) / 2, y + d * h + (-4 if up else 13), lab, c, 11, 'middle', 700)

def TIMES(x, y, a, b, a2, b2, q, lab='10배', sz=17):
    """a ÷ b   a2 ÷ b2 = q  — 위·아래 꺾인 화살표로 같은 배수"""
    s, cs, ex = SEQ(x, y, [a, '÷', b], sz, {0: (LINE, HL), 2: (LINE, HL2)})
    s2, cs2, ex2 = SEQ(ex + 34, y, [a2, '÷', b2, '=', q], sz, {0: (LINE, HL), 2: (LINE, HL2)})
    o = s + s2 + BRK(cs[0], cs2[0], y - sz - 2, lab, True) + BRK(cs[2], cs2[2], y + 8, lab, False)
    return o, ex2

def LD(x0, y, dv, dd, *, q=True, stop=None, sz=17, moves=(), added=0, qcol=BLUE, pt_dd=True):
    """세로셈. dv = 나누는 수(글자, 자연수면 계산까지) · dd = 나누어지는 수(글자, 소수점 가능)
       stop = 몫을 이 자리(정수 자리 수)까지만 구하고 나머지를 남는 양으로 · moves = [('dv'|'dd', 처음 틈, 옮긴 틈)]
       added = dd 뒤에 붙인 0 개수(빨간 글자) · 돌려줌 (svg, 오른쪽 끝 x, 아래 끝 y)"""
    cw = sz * .8; rh = sz * 1.35
    dvd = dv.replace('.', ''); ddd = dd.replace('.', '')
    p = dd.index('.') if '.' in dd else len(dd)          # 나누어지는 수의 소수점 틈 번호
    pv = dv.index('.') if '.' in dv else len(dv)
    n = len(ddd); o = ''
    # 나누는 수
    xv = x0 - 12 - cw * len(dvd)
    for i, c in enumerate(dvd): o += T(xv + cw * (i + .5), y, c, LINE, sz, 'middle', 700)
    if '.' in dv: o += PT(xv + cw * pv, y - 1.5, LINE, 2.3)
    # 괄호와 윗줄
    o += '<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f" fill="none" stroke="%s" stroke-width="1.6"/>' % (x0 - 7, y - sz - 2, x0 + 1, y - sz * .35, x0 - 7, y + 7, LINE)
    o += L((x0 - 7, y - sz - 2), (x0 + cw * n + 6, y - sz - 2), LINE, 1.6)
    for i, c in enumerate(ddd):
        col = RED if i >= n - added else LINE
        o += T(x0 + cw * (i + .5), y, c, col, sz, 'middle', 700)
    if '.' in dd and pt_dd: o += PT(x0 + cw * p, y - 1.5, LINE, 2.3)
    for who, a, b in moves:
        base = xv if who == 'dv' else x0
        o += CURVE((base + cw * a, y + 6), (base + cw * b, y + 6), PINK, False, 9, 1.5)
    yb = y + 8
    if q:
        D = [int(c) for c in ddd]; dvn = int(dvd); rem = 0; started = False; k = 0; last = n if stop is None else stop
        qd = {}
        for i in range(last):
            cur = rem * 10 + D[i]; qq = cur // dvn
            if qq or started or i >= p - 1: qd[i] = qq
            if qq or started:
                if not started and i > 0:
                    pass
                started = started or qq > 0
                if qq:
                    pr = str(qq * dvn); k += 1
                    for j, c in enumerate(pr): o += T(x0 + cw * (i - len(pr) + 1 + j + .5), y + rh * k, c, LINE, sz, 'middle', 700)
                    o += L((x0 + cw * (i - len(pr) + 1) - 2, y + rh * k + 6), (x0 + cw * (i + 1) + 2, y + rh * k + 6), LINE, 1.3)
                rem = cur - qq * dvn
                k += 1
                if i + 1 < last:
                    s = (str(rem) if rem else '') + str(D[i + 1])
                    for j, c in enumerate(s): o += T(x0 + cw * (i + 1 - len(s) + 1 + j + .5), y + rh * k, c, LINE, sz, 'middle', 700)
                else:
                    rest = str(rem) + ''.join(str(d) for d in D[last:]) if stop is not None else str(rem)
                    end = n - 1 if stop is not None else i
                    if stop is not None:
                        rest = rest.lstrip('0') or '0'
                        rest = rest.rjust(n - last + 1, '0')
                    for j, c in enumerate(rest): o += T(x0 + cw * (end - len(rest) + 1 + j + .5), y + rh * k, c, ORG if stop is not None else LINE, sz, 'middle', 700)
                    if stop is not None and p < n: o += PT(x0 + cw * p, y + rh * k - 1.5, ORG, 2.3)
            else:
                rem = cur
        for i, v in qd.items(): o += T(x0 + cw * (i + .5), y - sz - 8, v, qcol, sz, 'middle', 700)
        if p < (last if stop is not None else n) and stop is None: o += PT(x0 + cw * p, y - sz - 9.5, RED, 2.5)
        yb = y + rh * k + 8
    return o, x0 + cw * n + 6, yb

def NOTE(x, y, s, c=SUB, sz=11.5): return T(x, y, s, c, sz, 'start')

def TAPE(x, y, total, unit, w=300, h=24, lab='m', parts=None, rest_c='#e5e7eb'):
    """길이 total 을 unit 씩 나눈 띠 — 자연수 개의 묶음 + 남는 부분"""
    n = int(total // unit + 1e-9); sc = w / total; o = ''
    for k in range(n):
        o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="%s" stroke="%s" stroke-width="1.2"/>' % (x + k * unit * sc, y, unit * sc, h, SH if k % 2 == 0 else '#f8c99c', EDGE)
    rest = total - n * unit
    if rest > 1e-9:
        o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="%s" stroke="%s" stroke-width="1.2" stroke-dasharray="4 2"/>' % (x + n * unit * sc, y, rest * sc, h, rest_c, EDGE)
    o += T(x, y + h + 16, '0', LINE, 11) + T(x + w, y + h + 16, ('%g' % total) + ' ' + lab, LINE, 11)
    for k in range(n): o += T(x + (k + .5) * unit * sc, y + h / 2 + 5, k + 1, LINE, 11.5, 'middle', 700)
    return o, n, rest

def TAG(x, y, s): return T(x, y, s, ORG, 13, 'start', 700)

# ───────── 2-01 (소수 한 자리 수)÷(소수 한 자리 수) ─────────
@fig
def f_tenth06():
    b = BAR(30, 20, 10, 6, 300, 28)
    for k in range(11): b += T(30 + 30 * k, 64, '%g' % (k / 10), SUB if k not in (0, 6, 10) else LINE, 10.5)
    b += T(30, 98, '0.6 = 0.1이 6개', LINE, 13, 'start', 700)
    e, _ = EXPR(136, 93, ['=', ('f', 6, 10)], 14)
    b += NOTE(30, 128, '소수 한 자리 수 → 분모가 10인 분수')
    return S(360, 140, b + e)

@fig
def f_84frac():
    s, cs, ex = SEQ(20, 42, ['6.4', '÷', '0.4', '='], 17)
    e, x2 = EXPR(ex + 4, 37, [('f', 64, 10), '÷', ('f', 4, 10), '=', '64', '÷', '4', '=', '16'], 16)
    return S(int(x2) + 20, 92, s + e + NOTE(20, 82, '분모가 같으면 분자끼리 나누어요 (6학년 1학기)'))

@fig
def f_48div04():
    o, ex = TIMES(26, 58, '4.8', '0.4', '48', '4', '12')
    return S(int(ex) + 40, 124, o + NOTE(26, 116, '두 수를 각각 10배 해도 몫은 같아요'))

@fig
def f_wrong45():
    s1, _, e1 = SEQ(40, 32, ['4.5', '÷', '5', '=', '0.9'], 16)
    s2, _, e2 = SEQ(40, 74, ['45', '÷', '5', '=', '9'], 16)
    b = no(22, 32) + ok(22, 74) + NOTE(e1 + 12, 32, '← 0.5만 10배: 몫이 달라짐', RED) + NOTE(e2 + 12, 74, '← 두 수 모두 10배', GRN)
    return S(400, 96, s1 + s2 + b)

@fig
def f_tape16():
    o, n, _ = TAPE(30, 22, 1.6, 0.4, 280, 26)
    s, _, ex = SEQ(30, 104, ['1.6', '÷', '0.4', '=', '16', '÷', '4', '=', '4'], 15)
    return S(380, 122, o + s + TAG(318, 40, '→ 4도막'))

@fig
def f_make5():
    s1, c1, e1 = SEQ(90, 40, ['35', '÷', '7', '=', '5'], 17)
    s2, c2, e2 = SEQ(90, 104, ['3.5', '÷', '0.7', '=', '5'], 17, {4: (GRN, None)})
    b = AR((c1[0], 50), (c2[0], 86), PINK) + AR((c1[2], 50), (c2[2], 86), PINK)
    b += T(c1[0] - 14, 72, '각각 1/10', PINK, 11, 'end', 700)
    return S(320, 120, s1 + s2 + b + NOTE(e2 + 10, 104, '몫 그대로'))

# ───────── 2-02 (소수 두 자리 수)÷(소수 두 자리 수) ─────────
@fig
def f_ld128():
    o1, x1, _ = LD(70, 54, '0.16', '1.28', q=False, moves=[('dv', 1, 3), ('dd', 1, 3)], pt_dd=True)
    o2, x2, yb = LD(x1 + 90, 54, '16', '128')
    return S(max(int(x2) + 30, 420), int(yb) + 30, o1 + AR((x1 + 8, 48), (x1 + 34, 48), SUB) + o2 + NOTE(24, yb + 20, '나누는 수가 자연수가 되도록 소수점을 오른쪽으로 두 자리씩'))

@fig
def f_518div007():
    o, ex = TIMES(26, 58, '5.18', '0.07', '518', '7', '74', '100배')
    return S(int(ex) + 40, 124, o + NOTE(26, 116, '두 수를 각각 100배 해도 몫은 같아요'))

@fig
def f_wrong135():
    s0, _, _ = SEQ(20, 28, ['1.35', '÷', '0.15'], 16)
    s1, c1, e1 = SEQ(40, 70, ['13.5', '÷', '15', '=', '0.9'], 16)
    s2, c2, e2 = SEQ(40, 110, ['135', '÷', '15', '=', '9'], 16)
    b = no(22, 70) + ok(22, 110) + NOTE(e1 + 12, 70, '← 10배와 100배를 섞음', RED) + NOTE(e2 + 12, 110, '← 둘 다 100배', GRN)
    return S(400, 126, s0 + s1 + s2 + b)

@fig
def f_x10x100():
    s0, _, _ = SEQ(20, 30, ['1.65', '÷', '0.05'], 16)
    s1, _, e1 = SEQ(40, 72, ['16.5', '÷', '0.5'], 16)
    s2, _, e2 = SEQ(40, 112, ['165', '÷', '5', '=', '33'], 16)
    b = T(30, 72, '×10', SUB, 11, 'end') + T(30, 112, '×100', SUB, 11, 'end')
    b += NOTE(e1 + 12, 72, '아직 소수의 나눗셈', RED) + NOTE(e2 + 12, 112, '자연수의 나눗셈', GRN)
    return S(360, 128, s0 + s1 + s2 + b)

@fig
def f_tape135():
    o, n, _ = TAPE(30, 22, 1.35, 0.45, 300, 26)
    s, _, _ = SEQ(30, 104, ['1.35', '÷', '0.45', '=', '135', '÷', '45', '=', '3'], 15)
    return S(420, 122, o + s + TAG(338, 40, '→ 3도막'))

# ───────── 2-03 자릿수가 다른 (소수)÷(소수) ─────────
@fig
def f_ld468():
    o1, x1, _ = LD(60, 56, '2.6', '4.68', q=False, moves=[('dv', 1, 2), ('dd', 1, 2)])
    o2, x2, yb = LD(x1 + 80, 56, '26', '46.8')
    b = AR((x1 + 6, 50), (x1 + 30, 50), SUB) + NOTE(x2 + 6, 30, '← 몫의 소수점은', RED) + NOTE(x2 + 6, 46, '   옮긴 소수점 위에', RED)
    return S(int(x2) + 130, int(yb) + 12, o1 + o2 + b)

@fig
def f_392div14():
    o, ex = TIMES(26, 58, '3.92', '1.4', '39.2', '14', '2.8')
    return S(int(ex) + 60, 124, o + NOTE(26, 116, '나누는 수가 자연수가 되도록 두 수를 각각 10배'))

@fig
def f_324div180():
    o, ex = TIMES(26, 58, '3.24', '1.8', '324', '180', '1.8', '100배')
    return S(int(ex) + 60, 124, o + NOTE(26, 116, '1.8은 두 자리 옮길 수 없어서 0을 써요 → 180'))

@fig
def f_ld552():
    o, x1, yb = LD(70, 56, '24', '55.2')
    b = NOTE(x1 + 14, 36, '✓ 2.3 — 55.2의 소수점 위에', GRN) + NOTE(x1 + 14, 56, '✗ 0.23 — 5.52의 원래 소수점 위에', RED)
    return S(int(x1) + 240, int(yb) + 12, o + b)

@fig
def f_rod15():
    b = BAR(30, 24, 3, 3, 240, 26) + T(30, 70, '0', LINE, 11) + T(270, 70, '1.5 m', LINE, 11) + T(150, 16, '4.35 kg', ORG, 12, 'middle', 700)
    b += L((30, 82), (190, 82), BLUE, 2) + T(110, 98, '1 m → ?', BLUE, 12, 'middle', 700)
    s, _, ex = SEQ(30, 130, ['4.35', '÷', '1.5', '=', '43.5', '÷', '15', '=', '2.9'], 15)
    return S(int(ex) + 20, 146, b + s)

# ───────── 2-04 (자연수)÷(소수) ─────────
@fig
def f_6frac():
    s, cs, ex = SEQ(20, 42, ['6', '÷', '0.75', '='], 17)
    e, x2 = EXPR(ex + 4, 37, [('f', 600, 100), '÷', ('f', 75, 100), '=', '600', '÷', '75', '=', '8'], 16)
    return S(int(x2) + 20, 92, s + e + NOTE(20, 82, '0.75가 소수 두 자리 수라서 6도 분모가 100인 분수로'))

@fig
def f_ld1000():
    o1, x1, _ = LD(70, 56, '1.25', '10', q=False, moves=[('dv', 1, 3)])
    o2, x2, yb = LD(x1 + 92, 56, '125', '1000', added=2)
    b = AR((x1 + 6, 50), (x1 + 34, 50), SUB) + NOTE(24, yb + 20, '자연수 10은 소수점이 생략된 수 → 0을 두 개 붙여 1000')
    return S(max(int(x2) + 30, 440), int(yb) + 30, o1 + o2 + b)

@fig
def f_wrong18():
    s1, _, e1 = SEQ(40, 32, ['18', '÷', '6', '=', '3'], 16)
    s2, _, e2 = SEQ(40, 74, ['180', '÷', '6', '=', '30'], 16)
    b = no(22, 32) + ok(22, 74) + NOTE(e1 + 12, 32, '← 0.6만 10배', RED) + NOTE(e2 + 12, 74, '← 18도 10배', GRN)
    return S(330, 92, s1 + s2 + b)

@fig
def f_tap12():
    b = R(30, 18, 70, 90, '#eef3fb', '#9fb6e0', 6) + T(65, 70, '12 L', BLUE, 14, 'middle', 700)
    b += T(130, 46, '1분에 0.6 L', ORG, 13, 'start', 700)
    s, _, ex = SEQ(130, 86, ['12', '÷', '0.6', '=', '120', '÷', '6', '=', '20'], 15)
    return S(int(ex) + 20, 124, b + s + NOTE(130, 112, '(전체 양) ÷ (1분에 나오는 양) = 20분'))

@fig
def f_cmp6():
    s1, _, e1 = SEQ(40, 36, ['6', '÷', '2', '=', '3'], 17)
    s2, _, e2 = SEQ(40, 82, ['6', '÷', '0.2', '=', '30'], 17, {4: (GRN, None)})
    b = NOTE(e1 + 14, 36, '1보다 큰 수로 나누면 작아져요', SUB) + NOTE(e2 + 14, 82, '1보다 작은 수로 나누면 커져요', GRN)
    return S(400, 100, s1 + s2 + b)

# ───────── 2-05 몫을 반올림하여 나타내기 ─────────
@fig
def f_round243():
    b = ''
    for k, (num, hl, res, how) in enumerate([('243', 1, '200', '4 → 버림'), ('361', 1, '400', '6 → 올림')]):
        y = 38 + k * 46
        for j, c in enumerate(num):
            if j == hl: b += R(40 + j * 18 - 9, y - 16, 18, 22, HL, HL, 3)
            b += T(40 + j * 18, y, c, LINE, 17, 'middle', 700)
        b += AR((100, y - 5), (140, y - 5), SUB) + T(170, y, res, BLUE, 17, 'middle', 700) + NOTE(210, y, '십의 자리 ' + how)
    return S(340, 124, b + NOTE(30, 118, '백의 자리까지 → 바로 아래 십의 자리 숫자를 봐요'))

@fig
def f_10div7():
    s, cs, ex = SEQ(30, 40, ['10', '÷', '7', '=', '1.428…'], 17)
    b = T(40, 84, '소수 첫째 자리까지', SUB, 11.5, 'start') + T(190, 84, '1.4', BLUE, 15, 'start', 700) + NOTE(230, 84, '← 둘째 자리 2를 버림')
    b += T(40, 116, '소수 둘째 자리까지', SUB, 11.5, 'start') + T(190, 116, '1.43', BLUE, 15, 'start', 700) + NOTE(240, 116, '← 셋째 자리 8을 올림')
    return S(400, 132, s + b)

@fig
def f_ld11():
    o, x1, yb = LD(60, 58, '6', '11.000', added=3)
    b = NOTE(x1 + 16, 40, '일의 자리까지 → 2') + NOTE(x1 + 16, 60, '소수 첫째 자리까지 → 1.8') + NOTE(x1 + 16, 80, '소수 둘째 자리까지 → 1.83')
    return S(int(x1) + 200, int(yb) + 12, o + b)

@fig
def f_cut83():
    s, cs, ex = SEQ(40, 30, ['8', '÷', '3', '=', '2.66…'], 16)
    s1, _, e1 = SEQ(40, 72, ['2.6'], 16)
    s2, _, e2 = SEQ(40, 108, ['2.7'], 16)
    b = no(22, 72) + ok(22, 108) + NOTE(e1 + 12, 72, '첫째 자리에서 멈춤 = 버림', RED) + NOTE(e2 + 12, 108, '둘째 자리 6을 보고 올림 = 반올림', GRN)
    return S(390, 124, s + s1 + s2 + b)

@fig
def f_51div09():
    s, cs, ex = SEQ(30, 40, ['5.1', '÷', '0.9', '=', '51', '÷', '9', '=', '5.66…'], 16)
    b = AR((cs[8], 52), (cs[8], 80), SUB) + T(cs[8], 98, '6', BLUE, 17, 'middle', 700) + NOTE(cs[8] + 16, 96, '← 소수 첫째 자리 6을 올림')
    return S(int(ex) + 150, 112, s + b)

@fig
def f_1div7():
    b = BOX(20, 14, 200, 40, ['1 ÷ 7 = 0.142857…'], FILL, '#9fb6e0', BLUE, 15, True)
    b += NOTE(26, 74, '나누어떨어지지 않아요')
    b += AR((222, 34), (262, 34), SUB) + BOX(266, 14, 150, 40, ['반올림 → 0.14'], GBG, '#9ad7b4', GRN, 14, True)
    b += NOTE(266, 74, '(올림·버림으로 어림할 수도)')
    return S(430, 88, b)

# ───────── 2-06 나누어 주고 남는 양 ─────────
@fig
def f_tape74():
    o, n, rest = TAPE(30, 22, 7.4, 2, 300, 26, 'L')
    b = T(30 + 300 * 7 / 7.4, 18, '1.4 L', ORG, 12, 'middle', 700)
    s, _, ex = SEQ(30, 104, ['7.4', '−', '2', '−', '2', '−', '2', '=', '1.4'], 15)
    return S(360, 140, o + b + s + NOTE(30, 130, '3번 덜어 냄 → 3명에게 주고 1.4 L가 남아요'))

@fig
def f_check232():
    o, n, rest = TAPE(30, 22, 23.2, 5, 300, 26)
    s, _, ex = SEQ(30, 104, ['5', '×', '4', '+', '3.2', '=', '23.2'], 15, {4: (ORG, None)})
    return S(360, 132, o + s + NOTE(30, 126, '나누어 준 양 + 남는 양 = 처음 양'))

@fig
def f_bag96():
    o, n, rest = TAPE(30, 22, 9.6, 2, 300, 26, 'kg')
    s1, _, _ = SEQ(40, 100, ['4.8봉지'], 15)
    s2, _, e2 = SEQ(40, 134, ['4봉지', '+', '1.6 kg'], 15)
    b = no(22, 100) + ok(22, 134) + NOTE(140, 100, '봉지 수는 자연수', RED)
    return S(360, 150, o + s1 + s2 + b)

@fig
def f_ld97():
    o, x1, yb = LD(60, 56, '3', '9.7', stop=1)
    b = NOTE(x1 + 16, 40, '몫 3 = 나누어 준 사람 수') + NOTE(x1 + 16, 62, '0.7 = 남는 양', ORG) + NOTE(x1 + 16, 84, '(9.7의 소수점 위치에 맞춤)', ORG)
    return S(int(x1) + 220, int(yb) + 14, o + b)

@fig
def f_flow2():
    b = BOX(10, 14, 150, 44, ['① 나누는 수를 자연수로', '두 수의 소수점을 같이 옮김'], '#f8fafc', '#cbd2dc', LINE, 11, True)
    b += AR((162, 36), (182, 36), SUB) + BOX(184, 14, 130, 44, ['② 몫의 소수점', '옮긴 위치에 맞춤'], '#f8fafc', '#cbd2dc', LINE, 11, True)
    b += AR((316, 36), (336, 36), SUB) + BOX(338, 8, 140, 56, ['③ 상황 보기', '끝나지 않으면 반올림', '사람 수면 자연수까지'], PALE, '#e7c27a', ORG, 10.5, True)
    s, _, ex = SEQ(14, 104, ['5.4', '÷', '0.7', '→', '54', '÷', '7', '=', '7.71…', '→', '7.7'], 14)
    return S(490, 124, b + s)

LFIG = {
    '2-01': ['f_tenth06', 'f_84frac', 'f_48div04', 'f_wrong45', 'f_tape16', 'f_make5'],
    '2-02': ['f_ld128', 'f_518div007', 'f_wrong135', 'f_x10x100', 'f_tape135'],
    '2-03': ['f_ld468', 'f_392div14', 'f_324div180', 'f_ld552', 'f_rod15'],
    '2-04': ['f_6frac', 'f_ld1000', 'f_wrong18', 'f_tap12', 'f_cmp6'],
    '2-05': ['f_round243', 'f_10div7', 'f_ld11', 'f_cut83', 'f_51div09', 'f_1div7'],
    '2-06': ['f_tape74', 'f_check232', 'f_bag96', 'f_ld97', 'f_flow2'],
}
AFIG = {}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초6-2_2단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
