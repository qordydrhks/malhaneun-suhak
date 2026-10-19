# -*- coding: utf-8 -*-
"""초5-2 1단원 '긴 설명' 그림 (help_figs_e42_4.py 와 같은 방식, 2026-10-12).
   LFIG[tag][i] = 그림 이름 — help_e52_1.H[tag][i] 의 긴 설명에 붙는다.
   설명 그림이라 답·라벨을 적어도 된다. 숫자는 그 긴 설명의 예와 같게, 다시 묻기와는 다르게. 재탕 금지.
   수직선 표기는 교재(디딤돌 5-2 8~12쪽) 그대로: 이상·이하 = 색칠된 원 ●, 초과·미만 = 빈 원 ○.
   그림만 보기: python -X utf8 help_figs_e52_1.py → 그림_긴설명_초5-2_1단원.html
"""
import html
e = html.escape
LINE = '#374151'; BLUE = '#2f5fb3'; ORG = '#b45309'; GRN = '#15803d'; RED = '#c0392b'; SUB = '#6b7280'
RNG = '#d9480f'; PALE = '#fdf6ec'; FILL = '#eef3fb'; GBG = '#ecfdf3'

def S(w, h, body):
    return ('<svg viewBox="0 0 %d %d" width="%d" style="max-width:100%%;height:auto" xmlns="http://www.w3.org/2000/svg" '
            'font-family="Malgun Gothic,sans-serif">%s</svg>') % (w, h, int(w * .7), body)
def T(x, y, s, c=LINE, sz=13, a='middle', w=400):
    return '<text x="%.1f" y="%.1f" font-size="%s" fill="%s" text-anchor="%s" font-weight="%d">%s</text>' % (x, y, sz, c, a, w, e(str(s)))
def L(p, q, c=LINE, w=1.6, dash=''):
    return '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%s" stroke-linecap="round"%s/>' % (p[0], p[1], q[0], q[1], c, w, (' stroke-dasharray="%s"' % dash) if dash else '')
def R(x, y, w, h, fill='#f8fafc', stroke='#cbd2dc', rx=8, sw=1.3):
    return '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%s" fill="%s" stroke="%s" stroke-width="%s"/>' % (x, y, w, h, rx, fill, stroke, sw)
def BOX(x, y, w, h, lines, fill='#f8fafc', stroke='#cbd2dc', c=LINE, sz=12, bold=False):
    if isinstance(lines, str): lines = [lines]
    o = R(x, y, w, h, fill, stroke); n = len(lines); y0 = y + h / 2 - (n - 1) * 8 + 4.5
    for k, s in enumerate(lines): o += T(x + w / 2, y0 + k * 16, s, c, sz, 'middle', 700 if bold and k == 0 else 400)
    return o
def AR(p, q, c=SUB, w=1.6):
    import math
    a = math.atan2(q[1] - p[1], q[0] - p[0]); h = 7
    l1 = (q[0] - h * math.cos(a - .45), q[1] - h * math.sin(a - .45)); l2 = (q[0] - h * math.cos(a + .45), q[1] - h * math.sin(a + .45))
    return L(p, q, c, w) + '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (q + l1 + l2 + (c,))
def CURVE(p, q, c=ORG, up=True, h=26, w=1.7):   # 굽은 화살표 (p → q)
    import math
    mx, my = (p[0] + q[0]) / 2, min(p[1], q[1]) - h if up else max(p[1], q[1]) + h
    a = math.atan2(q[1] - my, q[0] - mx); k = 7
    l1 = (q[0] - k * math.cos(a - .45), q[1] - k * math.sin(a - .45)); l2 = (q[0] - k * math.cos(a + .45), q[1] - k * math.sin(a + .45))
    return ('<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f" fill="none" stroke="%s" stroke-width="%s"/>' % (p[0], p[1], mx, my, q[0], q[1], c, w)
            + '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (q + l1 + l2 + (c,)))
def ok(x, y): return T(x, y, '✓', GRN, 16, 'middle', 700)
def no(x, y): return T(x, y, '✗', RED, 16, 'middle', 700)
def DOT(x, y, kind, c=RNG, r=5.5):   # kind 'f' 색칠된 원 · 'o' 빈 원
    return '<circle cx="%.1f" cy="%.1f" r="%s" fill="%s" stroke="%s" stroke-width="2"/>' % (x, y, r, c if kind == 'f' else '#ffffff', c)
def PT(x, y, c=BLUE, r=3.4): return '<circle cx="%.1f" cy="%.1f" r="%s" fill="%s"/>' % (x, y, r, c)

class NL:
    """수직선: x0 에서 lo 시작, 1당 s px. labels: 숫자를 적을 큰 눈금 값(None=모두), minor: 작은 눈금 간격"""
    def __init__(self, x0, y, lo, hi, s, labels=None, minor=None, sz=11.5, step=1):
        self.x0, self.y, self.lo, self.hi, self.s = x0, y, lo, hi, s
        o = L((self.X(lo) - 14, y), (self.X(hi) + 14, y), '#6b7280', 1.5)
        if minor:
            for k in range(int(round((hi - lo) / minor)) + 1):
                v = lo + k * minor; o += L((self.X(v), y - 3), (self.X(v), y + 3), '#9ca3af', 1)
        for k in range(int(round((hi - lo) / step)) + 1):
            v = round(lo + k * step, 6)
            o += L((self.X(v), y - 6), (self.X(v), y + 6), '#6b7280', 1.3)
            if labels is None or any(abs(v - l) < 1e-6 for l in labels):
                o += T(self.X(v), y + 22, ('%g' % v), LINE, sz)
        self.o = o
    def X(self, v): return self.x0 + (v - self.lo) * self.s
    def rng(self, a, b, ka, kb, c=RNG):   # a·b None = 끝까지(화살표)
        xa = self.X(a) if a is not None else self.X(self.lo) - 12
        xb = self.X(b) if b is not None else self.X(self.hi) + 12
        o = L((xa, self.y), (xb, self.y), c, 3.6)
        if a is None: o += '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (xa - 8, self.y, xa + 1, self.y - 5.5, xa + 1, self.y + 5.5, c)
        if b is None: o += '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (xb + 8, self.y, xb - 1, self.y - 5.5, xb - 1, self.y + 5.5, c)
        if a is not None and ka: o += DOT(xa, self.y, ka, c)
        if b is not None and kb: o += DOT(xb, self.y, kb, c)
        self.o += o; return self
    def mark(self, v, text, c=BLUE, above=True, sz=11.5):
        x = self.X(v); y = self.y - 15 if above else self.y + 38
        self.o += PT(x, self.y - 8 if above else self.y + 8, c) + T(x, y if above else y, text, c, sz); return self
    def add(self, s): self.o += s; return self

def digits(x, y, num, hl=(), hlc='#fde7c7', sz=26, gap=24, strike=False):
    """숫자를 한 자씩. hl = 강조할 자리 번호(0부터)"""
    o = ''
    for i, ch in enumerate(str(num)):
        cx = x + i * gap
        if i in hl:
            o += R(cx - gap / 2 + 1, y - sz + 2, gap - 2, sz + 6, hlc, 'none', 4, 0)
        o += T(cx, y, ch, LINE, sz, 'middle', 700)
        if strike and i in hl:
            o += L((cx - 7, y - 4), (cx + 7, y - sz + 8), RED, 1.8)
    return o

def crate(x, y, w=58, h=40, n=10, label='10개', full=True):
    o = R(x, y, w, h, '#fbe9c8' if full else '#fff8ec', '#b7791f', 4, 1.4) + L((x, y + 10), (x + w, y + 10), '#b7791f', 1)
    k = 0
    for r in range(2):
        for c in range(5):
            if k < n: o += '<circle cx="%.1f" cy="%.1f" r="4.2" fill="#f59e0b" stroke="#c2410c" stroke-width=".8"/>' % (x + 8 + c * 10.5, y + 19 + r * 10)
            k += 1
    return o + T(x + w / 2, y + h + 15, label, SUB, 11)

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 1-01 이상과 이하 ─────────
@fig
def f_ige125():
    n = NL(28, 70, 124, 129, 62, minor=0.2).rng(125, None, 'f', None)
    n.mark(125.2, '125.2', above=True).mark(126, '126').mark(128.5, '128.5')
    b = n.o + T(n.X(125), 112, '125에 색칠된 원', RNG, 11.5)
    b += BOX(96, 2, 236, 26, '125와 같거나 큰 수 → 125부터 오른쪽', PALE, '#e7c27a', ORG, 12)
    return S(380, 124, b)

@fig
def f_ile160():
    n = NL(24, 74, 153, 161, 40, minor=0.5).rng(None, 160, None, 'f')
    n.mark(159.8, '159.8').mark(158, '158').mark(154.4, '154.4')
    b = n.o + T(n.X(160), 116, '160에 색칠된 원', RNG, 11.5)
    b += BOX(48, 2, 260, 26, '160과 같거나 작은 수 → 160부터 왼쪽', PALE, '#e7c27a', ORG, 12)
    m = NL(390, 52, 0, 2, 26, labels=[]).rng(1, None, 'f', None); b += m.o + T(416, 30, '이상 → 오른쪽', SUB, 11)
    m = NL(390, 102, 0, 2, 26, labels=[]).rng(None, 1, None, 'f'); b += m.o + T(416, 80, '이하 → 왼쪽', SUB, 11)
    return S(470, 128, b)

@fig
def f_ige12():
    n = NL(26, 46, 9, 15, 48).rng(12, None, 'f', None)
    b = n.o
    for v in (12, 13, 14, 15):
        b += '<circle cx="%.1f" cy="%.1f" r="12" fill="none" stroke="%s" stroke-width="1.6"/>' % (n.X(v), 64, BLUE)
    b += T(n.X(13.5), 98, '12 이상인 자연수: 12, 13, 14, 15, …', BLUE, 12)
    b += BOX(40, 112, 300, 26, '가장 작은 자연수 = 12 (기준이 되는 수 자신)', PALE, '#e7c27a', ORG, 12, True)
    return S(366, 146, b)

@fig
def f_ile16():
    n = NL(20, 52, 0, 17, 20).rng(None, 16, None, 'f')
    b = n.o
    for v in range(1, 17):
        b += PT(n.X(v), 30, BLUE, 3.6)
    b += L((n.X(1), 20), (n.X(1), 14), BLUE, 1.2) + L((n.X(16), 20), (n.X(16), 14), BLUE, 1.2) + L((n.X(1), 14), (n.X(16), 14), BLUE, 1.2)
    b += T(n.X(8.5), 9, '1부터 16까지 → 16개', BLUE, 12, 'middle', 700)
    b += T(n.X(16), 96, '16도 들어감(●)', RNG, 11.5)
    return S(390, 108, b)

@fig
def f_height145():
    n = NL(30, 86, 143, 148, 72, minor=0.5).rng(145, None, 'f', None)
    b = n.o
    def person(v, good):
        x = n.X(v)
        o = '<circle cx="%.1f" cy="18" r="7" fill="#dbe7f8" stroke="%s" stroke-width="1.4"/>' % (x, BLUE)
        o += L((x, 25), (x, 48), BLUE, 2) + L((x - 9, 33), (x + 9, 33), BLUE, 1.8) + L((x, 48), (x - 6, 62), BLUE, 1.8) + L((x, 48), (x + 6, 62), BLUE, 1.8)
        o += L((x, 64), (x, 80), '#9ca3af', 1, '2 2')
        return o + (ok(x + 17, 20) if good else no(x - 17, 20))
    b += person(144.5, False) + person(145, True) + person(146.5, True)
    b += T(n.X(144.5) - 10, 126, '144.5 cm 못 탐', RED, 11, 'end') + T(n.X(146.5), 126, '145 cm, 146.5 cm 탈 수 있음', GRN, 11)
    b += BOX(150, 138, 120, 24, '키 145 cm 이상', PALE, '#e7c27a', ORG, 11.5)
    return S(420, 168, b)

@fig
def f_cmp70():
    a = NL(110, 40, 68, 73, 52, minor=0.5).rng(70, None, 'f', None)
    c = NL(110, 112, 68, 73, 52, minor=0.5).rng(70, None, 'o', None)
    b = a.o + c.o + T(14, 45, '70 이상', LINE, 13, 'start', 700) + T(14, 117, '70 초과', LINE, 13, 'start', 700)
    b += T(a.X(70), 18, '70 들어감', GRN, 11.5, 'middle', 700) + T(c.X(70), 90, '70 안 들어감', RED, 11.5, 'middle', 700)
    for v in (70.5, 71.5, 72.5): b += PT(c.X(v), 104, BLUE)
    b += T(c.X(71.5), 152, '70.5, 71.5, 72.5 … 70보다 큰 수', BLUE, 11)
    return S(420, 160, b)

@fig
def f_lt160():
    n = NL(24, 70, 150, 161, 30, minor=0.5).rng(None, 160, None, 'o')
    n.mark(159.9, '159.9').mark(157.6, '157.6').mark(155.3, '155.3').mark(151, '151.0')
    b = n.o + T(n.X(160) - 4, 112, '160에 빈 원 — 160은 안 들어감', RNG, 11.5, 'end')
    b += BOX(52, 0, 220, 26, '160보다 작은 수 → 160보다 왼쪽', PALE, '#e7c27a', ORG, 12)
    return S(390, 122, b)

@fig
def f_gt12_fix():
    a = NL(52, 30, 9, 16, 36).rng(12, None, 'f', None)
    c = NL(52, 104, 9, 16, 36).rng(12, None, 'o', None)
    b = a.o + c.o + no(22, 36) + ok(22, 110)
    b += T(52, 70, '● = 12가 들어감 → 이건 12 이상', RED, 11.5, 'start') + T(52, 144, '○ = 12가 안 들어감 → 12 초과', GRN, 11.5, 'start', 700)
    return S(360, 154, b)

@fig
def f_lt16():
    n = NL(22, 56, 9, 17, 38).rng(None, 16, None, 'o')
    b = n.o
    for v in range(10, 16): b += PT(n.X(v), 34, BLUE, 3.8)
    b += T(n.X(12.5), 22, '15, 14, 13, 12, …', BLUE, 12, 'middle', 700)
    b += '<circle cx="%.1f" cy="34" r="10" fill="none" stroke="%s" stroke-width="1.6"/>' % (n.X(15), ORG)
    b += BOX(60, 96, 270, 26, '16은 안 들어감(○) → 가장 큰 자연수는 15', PALE, '#e7c27a', ORG, 12, True)
    return S(390, 130, b)

@fig
def f_lt20_max():   # 20 미만에서 20에 끝없이 가까워지는 수 — 확대해 보기
    a = NL(40, 44, 19, 20, 300, labels=[19, 20], minor=0.1).rng(None, 20, None, 'o')
    a.mark(19.9, '19.9')
    b = NL(40, 132, 19.9, 20, 3000, labels=[19.9, 20], minor=0.01, step=0.1).rng(None, 20, None, 'o')
    b.mark(19.99, '19.99')
    o = a.o + b.o
    o += L((a.X(19.9), 52), (b.X(19.9), 110), SUB, 1.2, '4 3') + L((a.X(20), 52), (b.X(20), 110), SUB, 1.2, '4 3')
    o += T(372, 136, '확대', SUB, 11.5, 'start')
    o += BOX(40, 170, 330, 26, '20에 더 가까운 수가 끝없이 → 가장 큰 수는 정할 수 없어', PALE, '#e7c27a', ORG, 12, True)
    return S(410, 204, o)

@fig
def f_gt40():
    n = NL(30, 70, 40, 41.2, 280, labels=[40, 41], minor=0.1, step=0.1).rng(40, None, 'o', None)
    b = n.o
    b += AR((n.X(40.1), 26), (n.X(40.1), 60), BLUE) + T(n.X(40.1) - 6, 18, '40.1 — 가장 작은 소수 한 자리 수', BLUE, 11.5, 'start', 700)
    b += AR((n.X(41), 26), (n.X(41), 60), GRN) + T(n.X(41), 18, '41 — 가장 작은 자연수', GRN, 11.5, 'middle', 700)
    b += T(n.X(40), 112, '40은 빈 원 — 안 들어감', RNG, 11, 'start')
    return S(400, 124, b)

@fig
def f_four():
    b = ''
    rows = [('2 이상 6 이하', 'f', 'f'), ('2 이상 6 미만', 'f', 'o'), ('2 초과 6 이하', 'o', 'f'), ('2 초과 6 미만', 'o', 'o')]
    for k, (name, ka, kb) in enumerate(rows):
        y = 26 + k * 52
        n = NL(134, y, 1, 9, 30, sz=10.5).rng(2, 6, ka, kb)
        b += n.o + T(10, y + 5, name, LINE, 12.5, 'start', 700)
    b += BOX(400, 40, 84, 50, ['● 포함', '(이상·이하)'], GBG, '#6fbf8b', GRN, 11.5) + BOX(400, 110, 84, 50, ['○ 안 포함', '(초과·미만)'], '#fdecea', '#e9a39b', RED, 11.5)
    return S(492, 222, b)

@fig
def f_read64():
    n = NL(40, 76, 62, 71, 34).rng(64, 69, 'o', 'o')
    b = n.o
    b += AR((n.X(64) - 30, 22), (n.X(64) - 3, 64), ORG) + T(n.X(64) - 34, 16, '왼쪽 끝 ○ → 64 초과', ORG, 12, 'middle', 700)
    b += AR((n.X(69) + 30, 22), (n.X(69) + 3, 64), ORG) + T(n.X(69) + 30, 16, '오른쪽 끝 ○ → 69 미만', ORG, 12, 'middle', 700)
    b += BOX(110, 112, 180, 26, '64 초과 69 미만인 수', PALE, '#e7c27a', ORG, 12.5, True)
    return S(400, 146, b)

@fig
def f_same21():
    a = NL(150, 34, 20, 26, 40).rng(21, 24, 'o', 'f')
    c = NL(150, 108, 20, 26, 40).rng(22, 25, 'f', 'o')
    b = a.o + c.o + T(10, 39, '21 초과 24 이하', LINE, 12.5, 'start', 700) + T(10, 113, '22 이상 25 미만', LINE, 12.5, 'start', 700)
    for n in (a, c):
        for v in (22, 23, 24): b += '<circle cx="%.1f" cy="%.1f" r="9" fill="none" stroke="%s" stroke-width="1.4"/>' % (n.X(v), n.y, BLUE)
    b += L((a.X(21.5), a.y - 16), (a.X(21.5), a.y - 4), GRN, 1.6) + T(a.X(21.5), a.y - 20, '21.5 ✓', GRN, 11, 'middle', 700)
    b += L((c.X(21.5), c.y - 16), (c.X(21.5), c.y - 4), RED, 1.6) + T(c.X(21.5), c.y - 20, '21.5 ✗', RED, 11, 'middle', 700)
    b += T(250, 160, '자연수는 둘 다 22, 23, 24 — 소수까지 보면 다른 범위', SUB, 11.5)
    return S(430, 172, b)

@fig
def f_age6_13():
    n = NL(26, 80, 4, 15, 30).rng(6, 13, 'f', 'o')
    b = n.o
    b += T(n.X(6), 46, '6세', LINE, 12, 'middle', 700) + ok(n.X(6), 28)
    b += T(n.X(13), 46, '13세', LINE, 12, 'middle', 700) + no(n.X(13), 28)
    b += BOX(60, 112, 250, 26, '어린이 요금: 만 6세 이상 만 13세 미만', PALE, '#e7c27a', ORG, 12)
    return S(390, 146, b)

# ───────── 1-04 올림 ─────────
@fig
def f_up4718():
    b = digits(30, 60, 4718, hl=(2, 3)) + AR((116, 52), (174, 52)) + T(145, 40, '올림', SUB, 11.5) + digits(198, 60, 4800, hl=(1,), hlc='#dff3e5')
    b += T(66, 90, '18을 100으로 봄', ORG, 12, 'middle', 700) + T(222, 90, '7이 1 커짐', GRN, 12, 'middle', 700)
    b += BOX(40, 104, 260, 26, '백의 자리 아래 수는 0, 백의 자리 숫자는 1 커짐', '#f8fafc', '#cbd2dc', LINE, 11.5)
    return S(320, 138, b)

def jump(x0, y, lo, hi, v, to, lab, c=ORG, w=300):
    n = NL(x0, y, lo, hi, w / (hi - lo), labels=[lo, hi], minor=(hi - lo) / 10)
    o = n.o + PT(n.X(v), y, BLUE, 5) + T(n.X(v), y + 22, '%g' % v, BLUE, 12, 'middle', 700)
    o += CURVE((n.X(v), y - 22), (n.X(to), y - 8), c, True, 30) + T((n.X(v) + n.X(to)) / 2, y - 50, lab, c, 12, 'middle', 700)
    return o, n

@fig
def f_up184():
    o, n = jump(30, 80, 180, 190, 184, 190, '올림 → 190')
    o += T(n.X(186), 122, '일의 자리 4를 10으로 봄', SUB, 11.5, 'start')
    return S(360, 130, o)

@fig
def f_up2310():
    b = digits(30, 40, 2310, hl=(3,), hlc='#e5e7eb') + AR((126, 33), (180, 33)) + digits(206, 40, 2310)
    b += T(304, 36, '그대로', GRN, 12, 'start', 700) + T(102, 64, '일의 자리가 0 → 올릴 것이 없음', SUB, 11)
    b += digits(30, 114, 2311, hl=(3,)) + AR((126, 107), (180, 107)) + digits(206, 114, 2320, hl=(2,), hlc='#dff3e5')
    b += T(102, 138, '일의 자리 1을 10으로 봄', ORG, 11, 'middle', 700)
    return S(370, 150, b)

@fig
def f_up_vs_down3002():
    n = NL(40, 90, 3000, 4000, 0.3, labels=[3000, 4000], minor=100, step=1000)
    b = n.o + PT(n.X(3002), 90, BLUE, 5) + T(n.X(3002) + 2, 112, '3002', BLUE, 12, 'start', 700)
    b += CURVE((n.X(3002) + 4, 80), (n.X(4000), 80), GRN, True, 44) + T(n.X(3500), 30, '올림: 2도 1000으로 봄 → 4000', GRN, 12, 'middle', 700)
    b += BOX(110, 126, 170, 26, '버림: 2를 0으로 봄 → 3000', '#f3f4f6', '#cbd2dc', SUB, 11.5)
    return S(380, 156, b)

@fig
def f_up90():
    n = NL(20, 74, 79, 92, 26)
    b = n.o
    for v in range(81, 91): b += PT(n.X(v), 60, BLUE, 3.8)
    b += L((n.X(81), 48), (n.X(90), 48), BLUE, 1.3) + L((n.X(81), 48), (n.X(81), 54), BLUE, 1.3) + L((n.X(90), 48), (n.X(90), 54), BLUE, 1.3)
    b += T(n.X(85.5), 40, '81 ~ 90 → 올림하면 90', BLUE, 12, 'middle', 700)
    b += T(n.X(80), 124, '80 → 80', SUB, 11) + T(n.X(91), 124, '91 → 100', SUB, 11)
    return S(380, 134, b)

@fig
def f_dn2795():
    b = digits(30, 60, 2795, hl=(2, 3), strike=True) + AR((116, 52), (174, 52)) + T(145, 40, '버림', SUB, 11.5) + digits(198, 60, 2700, hl=(1,), hlc='#e5e7eb')
    b += T(66, 90, '95를 0으로 봄', RED, 12, 'middle', 700) + T(222, 90, '7은 그대로', SUB, 12, 'middle', 700)
    b += BOX(40, 104, 260, 26, '백의 자리 아래 수는 0, 백의 자리 숫자는 그대로', '#f8fafc', '#cbd2dc', LINE, 11.5)
    return S(320, 138, b)

@fig
def f_updn763():
    n = NL(40, 90, 760, 770, 30, labels=[760, 770], minor=1)
    b = n.o + PT(n.X(763), 90, BLUE, 5) + T(n.X(763), 120, '763', BLUE, 12, 'middle', 700)
    b += CURVE((n.X(763) + 2, 80), (n.X(770), 80), GRN, True, 40) + T(n.X(767), 28, '올림 → 770', GRN, 12, 'middle', 700)
    b += CURVE((n.X(763) - 2, 80), (n.X(760), 80), SUB, True, 26) + T(n.X(760) + 8, 42, '버림 → 760', SUB, 12, 'middle', 700)
    return S(380, 132, b)

@fig
def f_dn4196():
    b = T(14, 42, '✗', RED, 18, 'start', 700) + digits(48, 44, 4196) + AR((140, 37), (190, 37), RED) + digits(214, 44, 4200) + T(318, 40, '올려 버림', RED, 11.5, 'start')
    b += T(14, 112, '✓', GRN, 18, 'start', 700) + digits(48, 114, 4196, hl=(3,), strike=True) + AR((140, 107), (190, 107), GRN) + digits(214, 114, 4190) + T(318, 110, '6을 0으로', GRN, 11.5, 'start', 700)
    return S(400, 136, b)

@fig
def f_dn50():
    n = NL(20, 74, 49, 61, 28)
    b = n.o
    for v in range(50, 60): b += PT(n.X(v), 60, BLUE, 3.8)
    b += L((n.X(50), 48), (n.X(59), 48), BLUE, 1.3) + L((n.X(50), 48), (n.X(50), 54), BLUE, 1.3) + L((n.X(59), 48), (n.X(59), 54), BLUE, 1.3)
    b += T(n.X(54.5), 40, '50 ~ 59 → 버림하면 50', BLUE, 12, 'middle', 700)
    b += T(n.X(60) + 8, 122, '60 → 60', SUB, 11) + T(n.X(54.5), 122, '가장 큰 자연수 59', ORG, 12, 'middle', 700)
    return S(380, 134, b)

@fig
def f_same830():
    b = R(10, 8, 360, 120, '#ffffff', '#cbd2dc')
    b += T(70, 32, '수', SUB, 12, 'middle', 700) + T(190, 32, '올림(십의 자리)', SUB, 12, 'middle', 700) + T(310, 32, '버림(십의 자리)', SUB, 12, 'middle', 700)
    b += L((10, 44), (370, 44), '#e3e6ec', 1)
    b += T(70, 74, '832', LINE, 15, 'middle', 700) + T(190, 74, '840', LINE, 15) + T(310, 74, '830', LINE, 15) + T(370 - 6, 74, '다름', RED, 11, 'end')
    b += L((10, 88), (370, 88), '#e3e6ec', 1)
    b += R(14, 92, 352, 32, GBG, 'none', 6, 0) + T(70, 114, '830', LINE, 15, 'middle', 700) + T(190, 114, '830', GRN, 15, 'middle', 700) + T(310, 114, '830', GRN, 15, 'middle', 700) + T(370 - 6, 114, '같음', GRN, 11, 'end', 700)
    return S(380, 136, b)

# ───────── 1-06 반올림 ─────────
@fig
def f_round2738():
    b = T(12, 30, '십의 자리까지', SUB, 11.5, 'start', 700) + digits(30, 62, 2738, hl=(3,)) + T(102, 86, '8 → 올림', ORG, 11.5, 'middle', 700)
    b += AR((130, 55), (176, 55)) + digits(200, 62, 2740, hl=(2,), hlc='#dff3e5')
    b += T(12, 112, '백의 자리까지', SUB, 11.5, 'start', 700) + digits(30, 144, 2738, hl=(2,), hlc='#e5e7eb') + T(78, 168, '3 → 버림', SUB, 11.5, 'middle', 700)
    b += AR((130, 137), (176, 137)) + digits(200, 144, 2700)
    b += BOX(304, 64, 100, 54, ['0, 1, 2, 3, 4 → 버림', '5, 6, 7, 8, 9 → 올림'], PALE, '#e7c27a', ORG, 10.5)
    return S(412, 178, b)

def band(x0, y, a, mid, b2, va, vb, val, unit='', w=320):
    s = w / (b2 - a)
    X = lambda v: x0 + (v - a) * s
    o = '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="#c9e5c3" stroke="#6b7280" stroke-width="1"/>' % (X(a), y - 22, X(mid) - 8, y - 22, X(mid), y, X(a), y)
    o += '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="#c7d3f0" stroke="#6b7280" stroke-width="1"/>' % (X(mid), y, X(mid) + 8, y - 22, X(b2), y - 22, X(b2), y)
    o += T((X(a) + X(mid)) / 2, y - 6, '%g' % va, LINE, 12, 'middle', 700) + T((X(mid) + X(b2)) / 2, y - 6, '%g' % vb, LINE, 12, 'middle', 700)
    o += L((X(a), y), (X(b2), y), '#6b7280', 1.3)
    for v in (a, (a + mid) / 2 if False else None, mid, b2):
        if v is not None: o += L((X(v), y), (X(v), y + 6), '#6b7280', 1.2) + T(X(v), y + 20, '%g' % v, SUB, 10.5)
    o += DOT(X(a), y, 'f', '#374151', 3.6) + DOT(X(b2), y, 'o', '#374151', 3.6)
    o += AR((X(val), y + 40), (X(val), y + 4), RED) + T(X(val), y + 54, '%g%s' % (val, unit), RED, 12, 'middle', 700)
    return o

@fig
def f_band1274():
    b = band(30, 50, 1150, 1250, 1350, 1200, 1300, 1274)
    b += BOX(40, 116, 300, 26, '십의 자리 숫자 7 → 올림 → 1300 (1300에 더 가까움)', PALE, '#e7c27a', ORG, 11.5)
    return S(380, 150, b)

@fig
def f_once1847():
    b = T(14, 38, '✓', GRN, 18, 'start', 700) + digits(48, 40, 1847, hl=(2,)) + AR((140, 33), (190, 33), GRN) + digits(214, 40, 1800) + T(316, 36, '십의 자리 4만 봄', GRN, 11.5, 'start', 700)
    b += T(14, 112, '✗', RED, 18, 'start', 700) + digits(48, 114, 1847, hl=(3,), hlc='#fde2e2') + AR((140, 107), (178, 107), RED) + digits(198, 114, 1850, sz=22, gap=20)
    b += AR((270, 107), (300, 107), RED) + digits(318, 114, 1900, sz=22, gap=20) + T(240, 140, '두 번 어림함 — 틀림', RED, 11.5, 'middle', 700)
    return S(410, 150, b)

@fig
def f_mid185():
    n = NL(40, 90, 180, 190, 30, labels=[180, 185, 190], minor=1)
    b = n.o + L((n.X(185), 50), (n.X(185), 84), '#9ca3af', 1.2, '3 3') + T(n.X(185), 44, '딱 가운데', SUB, 11.5)
    b += PT(n.X(185), 90, RED, 5) + CURVE((n.X(185) + 3, 80), (n.X(190), 80), GRN, True, 26) + T(n.X(189), 58, '5는 올림 → 190', GRN, 12, 'middle', 700)
    return S(380, 124, b)

@fig
def f_to80():
    n = NL(20, 80, 73, 86, 26)
    b = n.o
    for v in range(75, 80): b += PT(n.X(v), 64, ORG, 3.8)
    for v in range(80, 85): b += PT(n.X(v), 64, BLUE, 3.8)
    b += T(n.X(77), 46, '75~79 올려서 80', ORG, 11.5, 'middle', 700) + T(n.X(82), 46, '80~84 버려서 80', BLUE, 11.5, 'middle', 700)
    b += T(n.X(74), 130, '74 → 70', SUB, 11) + T(n.X(85), 130, '85 → 90', SUB, 11)
    return S(380, 140, b)

@fig
def f_box34():
    b = crate(14, 30) + crate(80, 30) + crate(146, 30) + crate(222, 30, n=4, label='4개', full=False)
    b += T(110, 18, '10개씩 3상자', SUB, 11.5) + T(251, 18, '남은 4개도 담아야 함', ORG, 11.5, 'middle', 700)
    b += AR((296, 50), (322, 50)) + BOX(326, 30, 70, 40, ['올림', '→ 40'], PALE, '#e7c27a', ORG, 12, True)
    b += T(200, 112, '필요한 상자는 최소 4개', LINE, 12.5, 'middle', 700)
    return S(404, 124, b)

@fig
def f_bill35270():
    b = ''
    for k in range(3):
        x = 14 + k * 82
        b += R(x, 30, 74, 38, '#e2efd9', '#5f8f4e', 4, 1.4) + T(x + 37, 54, '10000원', '#3f6b32', 12, 'middle', 700)
    for k in range(4):
        b += '<circle cx="%d" cy="49" r="11" fill="#f5e6b8" stroke="#a97c22" stroke-width="1.2"/>' % (276 + k * 24)
    b += T(312, 84, '5270원 — 바꿀 수 없음', RED, 11.5, 'middle', 700) + T(130, 20, '30000원까지 바꿈', GRN, 12, 'middle', 700)
    b += BOX(40, 98, 300, 26, '35270을 버림하여 만의 자리까지 → 30000', PALE, '#e7c27a', ORG, 12)
    return S(380, 132, b)

@fig
def f_scale347():
    b = band(30, 50, 33.5, 34.5, 35.5, 34, 35, 34.7, ' kg')
    b += BOX(30, 116, 320, 26, '0.7 kg은 0 kg과 1 kg 중 1 kg에 더 가까움 → 35 kg', PALE, '#e7c27a', ORG, 11.5)
    return S(380, 150, b)

@fig
def f_tank1326():
    b = ''
    for k in range(13):
        x = 12 + k * 22
        b += R(x, 34, 18, 22, '#dbeafe', '#3b82f6', 3, 1)
    b += T(154, 24, '100마리씩 13개 = 1300마리', BLUE, 11.5, 'middle', 700)
    b += R(312, 30, 30, 30, '#fff8ec', '#b7791f', 3, 1.4) + T(327, 50, '26', ORG, 11, 'middle', 700) + T(327, 76, '남은 26마리', ORG, 11, 'middle', 700)
    b += BOX(40, 92, 300, 26, '1326을 올림하여 백의 자리까지 → 1400 → 어항 14개', PALE, '#e7c27a', ORG, 11.5)
    return S(360, 128, b)

@fig
def f_summary():   # 10/19: 어림 문제는 「남는 것을 어떻게 해야 하나」부터
    b = R(8, 8, 300, 150, '#f8fafc', '#cbd2dc') + T(158, 30, '남는 것을 어떻게 해야 할까?', LINE, 13, 'middle', 700)
    b += BOX(24, 42, 268, 32, '남은 것도 담아야 함 · 모자라면 안 됨 → 올림', PALE, '#e7c27a', ORG, 11)
    b += BOX(24, 80, 268, 32, '다 채운 것만 셈 · 최대 → 버림', '#f3f4f6', '#cbd2dc', SUB, 11)
    b += BOX(24, 118, 268, 32, '가까운 쪽 → 반올림', '#eef3fb', '#9fb6e0', BLUE, 11)
    return S(316, 166, b)

LFIG = {
    '1-01': ['f_ige125', 'f_ile160', 'f_ige12', 'f_ile16', 'f_height145'],
    '1-02': ['f_cmp70', 'f_lt160', 'f_gt12_fix', 'f_lt16', 'f_lt20_max', 'f_gt40'],
    '1-03': ['f_four', 'f_read64', 'f_same21', 'f_age6_13'],
    '1-04': ['f_up4718', 'f_up184', 'f_up2310', 'f_up_vs_down3002', 'f_up90'],
    '1-05': ['f_dn2795', 'f_updn763', 'f_dn4196', 'f_dn50', 'f_same830'],
    '1-06': ['f_round2738', 'f_band1274', 'f_once1847', 'f_mid185', 'f_to80'],
    '1-07': ['f_box34', 'f_bill35270', 'f_scale347', 'f_tank1326', 'f_summary'],
}
def a3_read52():   # 다시 묻기: 52 ○ — 58 ○ (범위 이름은 적지 않음)
    n = NL(26, 34, 50, 60, 30).rng(52, 58, 'o', 'o')
    return S(352, 70, n.o)
AFIG = {('1-03', 1): a3_read52}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for k, f in AFIG.items(): o.append('<div style="border:1px dashed #99a;margin:8px 0;padding:6px"><b>다시 묻기 %s</b><br>%s</div>' % (k, f()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_1단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
