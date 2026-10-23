# -*- coding: utf-8 -*-
"""중3-1 이차함수 견본 2판 — 좌표평면·포물선 그림(SVG) 도구 (2026-10-23)
   교재(숨마쿰·쎈) 그래프 모양을 따른다: 가는 축 + 화살표 · 𝑥 𝑦 기울임 · 원점 O · 필요한 눈금 숫자만 · 점선 보조선.
   그림 원칙(설계규칙): 조건만 그린다(구하는 점·값은 찍지 않음) · 질문마다 새 그래프(재탕 금지).
   누르기 대상은 data-t 를 붙인 <g> — hot={'이름'} 이면 정답 그림(주황)으로 칠한다.

   g = Graph((-2, 6), (-6, 5), w=230)       # x 범위 · y 범위 · 폭(px). 세로 배율은 sy 로 따로(교재처럼 납작하게)
   g.curve(1, -4, 3)                       # y = x² − 4x + 3
   g.pt(2, -1, 'A', 'se') · g.xt(1) · g.yt(3) · g.vline(2) · g.seg((0,3),(4,3), dash=True)
   g.svg(hot={'L'})
"""
import math, html
INK, SOFT, GRID, HOT, BLUE, FILLC = '#1c2230', '#6b7280', '#e5e7eb', '#E07B39', '#2f5fb3', '#eaf1fb'
CURVE = '#c2412d'      # 교재 포물선 빨강 계열
CURVE2 = '#6d3fd0'     # 둘째 그래프 보라
MI = {c: chr(0x1D44E + i) for i, c in enumerate('abcdefghijklmnopqrstuvwxyz')}
MI['h'] = 'ℎ'      # 수학 기울임 h 는 따로 있는 글자
def mi(s): return ''.join(MI.get(ch, ch) for ch in s)
def num(v):
    """눈금 글자 — 음수는 −, 분수는 a/b"""
    from fractions import Fraction
    f = Fraction(v).limit_denominator(12)
    s = str(abs(f.numerator)) if f.denominator == 1 else '%d/%d' % (abs(f.numerator), f.denominator)
    return ('−' if f < 0 else '') + s

class Graph:
    def __init__(self, xr, yr, w=230, sy=None, axes=True, o=True, pad=14):
        self.x0, self.x1 = xr; self.y0, self.y1 = yr
        self.sx = w / (self.x1 - self.x0); self.sy = sy if sy else self.sx
        self.W, self.H = w, (self.y1 - self.y0) * self.sy
        self.el = []; self.pad = pad; self.o = o; self.ax = axes
    def P(self, x, y): return (round((x - self.x0) * self.sx, 1), round((self.y1 - y) * self.sy, 1))
    def add(self, s, tap=None, z=0):
        self.el.append((z, tap, s))
    # ── 그리기 ──
    def fn(self, f, xr=None, col=CURVE, w=2.0, dash=False, tap=None, z=2, clip=True):
        a, b = xr or (self.x0, self.x1)
        pts, seg = [], []
        n = 160
        for i in range(n + 1):
            x = a + (b - a) * i / n; y = f(x)
            if clip and (y < self.y0 - 0.02 * (self.y1 - self.y0) or y > self.y1 + 0.02 * (self.y1 - self.y0)):
                if len(seg) > 1: pts.append(seg)
                seg = []; continue
            seg.append(self.P(x, y))
        if len(seg) > 1: pts.append(seg)
        d = ' '.join('M' + ' L'.join('%.1f,%.1f' % p for p in s) for s in pts)
        st = ' stroke-dasharray="5 4"' if dash else ''
        body = '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f" stroke-linecap="round" stroke-linejoin="round"%s/>' % (d, col, w, st)
        if tap: body = '<path d="%s" fill="none" stroke="transparent" stroke-width="18" class="hit"/>' % d + body
        self.add(body, tap, z)
        return self
    def curve(self, a, b, c, **k): return self.fn(lambda x: a * x * x + b * x + c, **k)
    def line(self, m, k, **kw): kw.setdefault('col', BLUE); return self.fn(lambda x: m * x + k, **kw)
    def seg(self, p, q, col=INK, w=1.6, dash=False, tap=None, z=3, hitw=16):
        a, b = self.P(*p), self.P(*q)
        st = ' stroke-dasharray="4 3"' if dash else ''
        body = '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%.1f" stroke-linecap="round"%s/>' % (a[0], a[1], b[0], b[1], col, w, st)
        if tap: body = '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="transparent" stroke-width="%d" class="hit"/>' % (a[0], a[1], b[0], b[1], hitw) + body
        self.add(body, tap, z); return self
    def vline(self, x, col=SOFT, dash=True, label=None, w=1.2):
        self.seg((x, self.y0), (x, self.y1), col, w, dash, z=1)
        if label: self.text(x, self.y1, label, dx=4, dy=8, anchor='start', col=col, size=11.5)
        return self
    def hline(self, y, col=SOFT, dash=True, w=1.2): return self.seg((self.x0, y), (self.x1, y), col, w, dash, z=1)
    def guide(self, x, y):
        """점에서 두 축으로 내린 점선(교재식)"""
        if abs(y) > 1e-9: self.seg((x, 0), (x, y), SOFT, 1.1, True, z=1)
        if abs(x) > 1e-9: self.seg((0, y), (x, y), SOFT, 1.1, True, z=1)
        return self
    def poly(self, pts, fill='#f7d9c4', op=.7, stroke='none', tap=None, z=1):
        s = ' '.join('%.1f,%.1f' % self.P(*p) for p in pts)
        self.add('<polygon points="%s" fill="%s" fill-opacity="%.2f" stroke="%s" stroke-width="1.6" stroke-linejoin="round"/>' % (s, fill, op, stroke), tap, z); return self
    def pt(self, x, y, label=None, pos='ne', col=INK, r=3.2, hollow=False, tap=None, z=5, size=13):
        a = self.P(x, y)
        body = '<circle cx="%s" cy="%s" r="%.1f" fill="%s" stroke="%s" stroke-width="1.5"/>' % (a[0], a[1], r, '#fff' if hollow else col, col)
        if tap: body = '<circle cx="%s" cy="%s" r="15" fill="transparent" class="hit"/>' % (a[0], a[1]) + body
        self.add(body, tap, z)
        if label: self.lab(x, y, label, pos, size=size)
        return self
    def lab(self, x, y, s, pos='ne', size=13, col=INK, d=9):
        dx, dy = {'n': (0, -d - 3), 's': (0, d + 5), 'e': (d, 1), 'w': (-d, 1), 'ne': (d - 2, -d), 'nw': (-d + 2, -d),
                  'se': (d - 2, d + 3), 'sw': (-d + 2, d + 3)}[pos]
        anc = 'start' if 'e' in pos else 'end' if 'w' in pos else 'middle'
        return self.text(x, y, s, dx=dx, dy=dy, anchor=anc, size=size, col=col)
    def text(self, x, y, s, dx=0, dy=0, anchor='middle', size=12.5, col=INK, w=600, ital=False):
        a = self.P(x, y)
        t = html.escape(mi(s))      # 그림 속 글자의 문자는 늘 수학 기울임(교재처럼)
        self.add('<text x="%.1f" y="%.1f" text-anchor="%s" dominant-baseline="central" font-size="%.1f" fill="%s" font-weight="%d" paint-order="stroke" stroke="#fff" stroke-width="3">%s</text>'
                 % (a[0] + dx, a[1] + dy, anchor, size, col, w, t), None, 6); return self
    def xt(self, x, s=None, mark=True):
        """x축 눈금 숫자(아래)"""
        a = self.P(x, 0)
        if mark: self.add('<line x1="%s" y1="%.1f" x2="%s" y2="%.1f" stroke="%s" stroke-width="1"/>' % (a[0], a[1] - 3, a[0], a[1] + 3, INK), None, 4)
        self.add('<text x="%.1f" y="%.1f" text-anchor="middle" font-size="11.5" fill="%s" paint-order="stroke" stroke="#fff" stroke-width="3">%s</text>' % (a[0], a[1] + 14, INK, s or num(x)), None, 6)
        return self
    def yt(self, y, s=None, mark=True, right=False):
        a = self.P(0, y)
        if mark: self.add('<line x1="%.1f" y1="%s" x2="%.1f" y2="%s" stroke="%s" stroke-width="1"/>' % (a[0] - 3, a[1], a[0] + 3, a[1], INK), None, 4)
        self.add('<text x="%.1f" y="%.1f" text-anchor="%s" dominant-baseline="central" font-size="11.5" fill="%s" paint-order="stroke" stroke="#fff" stroke-width="3">%s</text>'
                 % (a[0] + 5 if right else a[0] - 5, a[1], 'start' if right else 'end', INK, s or num(y)), None, 6)
        return self
    def arrow(self, p, q, col=BLUE, w=1.6):
        a, b = self.P(*p), self.P(*q); ang = math.atan2(b[1] - a[1], b[0] - a[0])
        h1 = (b[0] - 8 * math.cos(ang - .45), b[1] - 8 * math.sin(ang - .45)); h2 = (b[0] - 8 * math.cos(ang + .45), b[1] - 8 * math.sin(ang + .45))
        self.add('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%.1f"/><polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>'
                 % (a[0], a[1], b[0], b[1], col, w, b[0], b[1], h1[0], h1[1], h2[0], h2[1], col), None, 4); return self
    def lattice(self, xs, ys, tap_prefix='g'):
        """누르기용 격자점(아이 화면) — 이름 g:x,y"""
        for x in xs:
            for y in ys:
                a = self.P(x, y)
                self.add('<circle cx="%s" cy="%s" r="2" fill="#c7cdd8"/>' % a, None, 1)
        return self
    # ── 축·출력 ──
    def _axes(self):
        o = []
        if self.y0 < 0 < self.y1 or True:
            a, b = self.P(self.x0, 0), self.P(self.x1, 0)
            o.append('<line x1="%s" y1="%s" x2="%.1f" y2="%s" stroke="%s" stroke-width="1.2"/>' % (a[0] - 4, a[1], b[0] + 6, b[1], INK))
            o.append('<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (b[0] + 12, b[1], b[0] + 4, b[1] - 4, b[0] + 4, b[1] + 4, INK))
            o.append('<text x="%.1f" y="%.1f" font-size="14" fill="%s" dominant-baseline="central">%s</text>' % (b[0] + 15, b[1] + 1, INK, mi('x')))
        if self.x0 <= 0 <= self.x1:
            a, b = self.P(0, self.y0), self.P(0, self.y1)
            o.append('<line x1="%s" y1="%.1f" x2="%s" y2="%.1f" stroke="%s" stroke-width="1.2"/>' % (a[0], a[1] + 4, b[0], b[1] - 6, INK))
            o.append('<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (b[0], b[1] - 12, b[0] - 4, b[1] - 4, b[0] + 4, b[1] - 4, INK))
            o.append('<text x="%.1f" y="%.1f" font-size="14" fill="%s" text-anchor="middle">%s</text>' % (b[0], b[1] - 16, INK, mi('y')))
            if self.o and self.y0 <= 0 <= self.y1:
                c = self.P(0, 0); o.append('<text x="%.1f" y="%.1f" font-size="12" fill="%s" text-anchor="end" font-family="Malgun Gothic,sans-serif">O</text>' % (c[0] - 4, c[1] + 13, INK))
        return ''.join(o)
    def svg(self, hot=(), width=None, cls=''):
        hot = set(hot or ())
        body = [self._axes()] if self.ax else []
        for z, tap, s in sorted(self.el, key=lambda e: e[0]):
            if tap:
                if tap in hot:
                    s = s.replace('stroke="%s"' % CURVE, 'stroke="%s"' % HOT).replace('stroke="%s"' % INK, 'stroke="%s"' % HOT).replace('fill="%s"' % INK, 'fill="%s"' % HOT) \
                         .replace('stroke="%s"' % SOFT, 'stroke="%s"' % HOT).replace('stroke="%s"' % BLUE, 'stroke="%s"' % HOT).replace('fill="#f7d9c4"', 'fill="%s"' % HOT)
                    s = s.replace('stroke-width="2.0"', 'stroke-width="3.6"').replace('stroke-width="1.6"', 'stroke-width="3.4"').replace('r="3.2"', 'r="5.5"')
                body.append('<g data-t="%s" class="tp">%s</g>' % (html.escape(tap), s))
            else: body.append(s)
        p = self.pad
        vb = '%.1f %.1f %.1f %.1f' % (-p - 8, -p - 22, self.W + 2 * p + 34, self.H + 2 * p + 40)
        w = width or int(self.W + 2 * p + 34)
        return ('<svg class="gph %s" viewBox="%s" width="%d" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Times New Roman,Malgun Gothic,serif">%s</svg>'
                % (cls, vb, w, ''.join(body)))

def para(a, b, c): return lambda x: a * x * x + b * x + c
