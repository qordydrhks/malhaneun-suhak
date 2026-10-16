# -*- coding: utf-8 -*-
"""초5-2 3단원(합동과 대칭) 그림 — 질문(조건만) · 다시 묻기(AFIG) · 긴 설명(LFIG) · 3회차를 한 곳에서 계산으로 그린다 (2026-10-12).
   draw.py(질문계단) 도구를 쓴다. 길이를 적은 그림은 1 cm = 16 px 실제 비율. 각을 적은 그림은 실제 각도로 그린다.
   질문 그림에는 답을 적지 않는다(구할 것은 ? 또는 ㉠). 긴 설명 그림은 설명이라 답·라벨을 적어도 된다.
   그림만 보기: python -X utf8 figs_e52_3.py → 그림_긴설명_초5-2_3단원.html
"""
import math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
S = 16
RED = '#B55B45'; SOFT = D.SOFT; INK = D.INK; GRN = '#3C8B64'; BLU = '#3B6FA8'

def M(*f): return D.merge(*f)
def mid(p, q): return ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
def lab(p, q, text, off=(0, 0), c=SOFT, sz=12):
    m = mid(p, q); return D.tag(m[0] + off[0], m[1] + off[1] + 4, text, c, sz)
def outoff(p, q, cen, d=14):
    """변 pq 의 바깥쪽(중심 cen 반대쪽)으로 d 만큼 — 길이 글자 자리"""
    m = mid(p, q); vx, vy = m[0] - cen[0], m[1] - cen[1]; L = math.hypot(vx, vy) or 1
    return (vx / L * d, vy / L * d)
def cen(pts): return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))
def at_of(p, c):
    dx, dy = p[0] - c[0], p[1] - c[1]
    return ('right' if dx > 0 else 'left') if abs(dx) > abs(dy) else ('below' if dy > 0 else 'above')
def names(pts, nm, c=None, color=BLU):
    c = c or cen(pts); f = D.Fig()
    for p, n in zip(pts, nm):
        if n: f = M(f, D.dot(p, n, color, at_of(p, c)))
    return f
def sides(pts, labels, c=None, d=15):
    c = c or cen(pts); f = D.Fig()
    for k, t in enumerate(labels):
        if t:
            p, q = pts[k], pts[(k + 1) % len(pts)]; o = outoff(p, q, c, d); f = M(f, lab(p, q, t, o))
    return f
def tri(ab, bc, ac, s=S, B=(0, 0)):
    """ㄱ(위)·ㄴ(왼쪽 아래)·ㄷ(오른쪽 아래) — 세 변 ㄱㄴ, ㄴㄷ, ㄱㄷ"""
    x = (ab * ab - ac * ac + bc * bc) / (2 * bc); y = math.sqrt(ab * ab - x * x)
    return [(B[0] + x * s, B[1] - y * s), B, (B[0] + bc * s, B[1])]
def rot(pts, c): return [(2 * c[0] - x, 2 * c[1] - y) for x, y in pts]
def flip(pts, mx): return [(2 * mx - x, y) for x, y in pts]
def shift(pts, dx, dy): return [(x + dx, y + dy) for x, y in pts]
def svg(f, w=None): s = D.svg(f); return s

# ───────── 질문 그림 (조건만) ─────────
def pair(ab, bc, ac, mode, l1, l2, nm2=('ㄹ', 'ㅁ', 'ㅂ'), gap=60, color2='amber'):
    """합동인 두 삼각형 — 첫째 ㄱㄴㄷ, 둘째는 mode 'rot'(180° 돌림) / 'flip'(뒤집음). l1·l2 = 변 글자(ㄱㄴ, ㄴㄷ, ㄷㄱ 순)"""
    P = tri(ab, bc, ac)
    w = bc * S
    if mode == 'rot':
        Q = rot(P, ((w + gap + w) / 2 + 0, P[0][1] / 2))
    else:
        Q = shift(flip(P, w / 2), w + gap, 0)
    f = M(D.poly(P, 'blue'), D.poly(Q, color2), names(P, ['ㄱ', 'ㄴ', 'ㄷ']), names(Q, list(nm2)), sides(P, l1), sides(Q, l2))
    return f

def q_tri_b():   # 02 2회차: 각 ㄹㅁㅂ과 크기가 같은 각 — 뒤집어 놓은 합동 삼각형(ㄱㄴ 5 · ㄴㄷ 8 · ㄷㄱ 6)
    return D.svg(pair(5, 8, 6, 'flip', ['5 cm', '8 cm', '6 cm'], ['5 cm', '8 cm', '']))
def q_tri_c():   # 02 2회차: 위치로 대응점을 정한 오류 — 180° 돌려 놓은 합동 삼각형(ㄱㄴ 7 · ㄴㄷ 9 · ㄷㄱ 5)
    return D.svg(pair(7, 9, 5, 'rot', ['7 cm', '9 cm', '5 cm'], ['7 cm', '', '5 cm']))

def sym_hex(names6=('ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅂ', 'ㅁ'), sx=3.2, sy=1.4, lx=2.2, ly=2.4, top=3.0, bot=2.6, show_s=True, lens=None):
    """세로 대칭축을 가진 육각형: ㄱ(위, 축) · ㄴ(오른쪽 위) · ㄷ(오른쪽 아래) · ㄹ(아래, 축) · ㅂ(왼쪽 아래) · ㅁ(왼쪽 위). 선분 ㄴㅁ 과 축이 만나는 점 ㅅ"""
    T, N, Dd, R, B, Mm = (0, -top * S), (sx * S, -sy * S), (lx * S, ly * S), (0, bot * S), (-lx * S, ly * S), (-sx * S, -sy * S)
    pts = [T, N, Dd, R, B, Mm]
    f = M(D.poly(pts, 'green'), D.seg((0, -(top + 1) * S), (0, (bot + 1) * S), 'dashed', RED, 1.4), D.seg(N, Mm, 'dashed', '#6E6A86', 1.1),
          names(pts, list(names6), (0, 0)))
    if show_s: f = M(f, D.dot((0, -sy * S), None, RED), D.tag(9, -sy * S + 17, 'ㅅ', INK, 12.5))
    if lens: f = M(f, sides(pts, lens, (0, 0)))
    return f
def q_sym_b(): return D.svg(sym_hex(sx=3.2, sy=1.0, lx=2.0, ly=2.0, top=3.6, bot=3.6))

def pt_hex(P1, P2, P3, nm=('ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ'), dash=(0, 3), lens=None, color='rose'):
    pts = [P1, P2, P3, (-P1[0], -P1[1]), (-P2[0], -P2[1]), (-P3[0], -P3[1])]
    f = M(D.poly(pts, color), names(pts, list(nm), (0, 0)), D.dot((0, 0), 'ㅇ', RED, 'below'))
    if dash: f = M(f, D.seg(pts[dash[0]], pts[dash[1]], 'dashed', '#6E6A86', 1.1))
    if lens: f = M(f, sides(pts, lens, (0, 0)))
    return f
def q_pt_b():    # 04 2회차: 선분 ㄱㅇ — 다른 모양의 점대칭 육각형, ㄱ과 ㄹ을 잇는 점선
    return D.svg(pt_hex((-72, -10), (-30, -46), (40, -40)))

# ───────── 다시 묻기 그림 (AFIG) ─────────
def a_tri0(): return D.svg(pair(4, 8, 6, 'rot', ['4 cm', '8 cm', '6 cm'], ['', '', '']))                 # 변 ㄹㅁ 몇 cm (4)
def a_tri1(): return D.svg(pair(6, 9, 7, 'flip', ['6 cm', '9 cm', '7 cm'], ['6 cm', '', '7 cm']))       # 각 ㄹㅂㅁ과 같은 각 (ㄱㄷㄴ)
def a_tri2(): return D.svg(pair(6, 8, 4, 'rot', ['6 cm', '8 cm', '4 cm'], ['6 cm', '', '4 cm']))       # 위치로 대응점 오류
def sym_pent(top=3.6, nx=3.0, ny=1.2, dx=2.2, dy=2.6, lens_nd=None, show=True):
    T, N, Dd, R, Mm = (0, -top * S), (nx * S, -ny * S), (dx * S, dy * S), (-dx * S, dy * S), (-nx * S, -ny * S)
    pts = [T, N, Dd, R, Mm]
    f = M(D.poly(pts, 'green'), D.seg((0, -(top + 1) * S), (0, (dy + 0.8) * S), 'dashed', RED, 1.4), D.seg(N, Mm, 'dashed', '#6E6A86', 1.1),
          names(pts, ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ'], (0, 0)), D.dot((0, dy * S), 'ㅂ', BLU, 'below'), D.dot((0, -ny * S), None, RED), D.tag(9, -ny * S + 17, 'ㅅ', INK, 12.5))
    if lens_nd: f = M(f, lab(N, Dd, lens_nd, outoff(N, Dd, (0, 0), 18)))
    return f
def a_sym0():    # 변 ㄴㄷ 5 cm 인 다른 오각형 (길이 글자는 실제 길이에서)
    nx, ny, dx = 3.6, 0.8, 2.6; dy = math.sqrt(25 - (nx - dx) ** 2) - ny
    return D.svg(sym_pent(top=3.2, nx=nx, ny=ny, dx=dx, dy=dy, lens_nd='%d cm' % round(math.hypot(nx - dx, ny + dy))))
def a_sym1(): return D.svg(sym_hex(sx=3.8, sy=0.4, lx=2.4, ly=2.4, top=3.0, bot=4.0))
def a_pt0():     # 변 ㄱㄴ 6 · ㄴㄷ 4 · ㄷㄹ 3 cm 점대칭 육각형
    return D.svg(pt_hex(*pt_by_lengths(6, 4, 3), dash=None, lens=['6 cm', '4 cm', '3 cm', '', '', '']))
def a_pt1(): return D.svg(pt_hex((-60, 24), (-50, -40), (36, -44), dash=(1, 4)))

def pt_by_lengths(a, b, c, y1=-30.0):
    """점대칭 육각형 꼭짓점: ㄱ(왼쪽 위)–ㄴ: a, ㄴ–ㄷ: b, ㄷ–ㄹ: c (ㄹ = −ㄱ)"""
    P1 = (-(a * S) * 0.75, y1); P2 = (P1[0] + a * S, y1)
    c1, r1, c2, r2 = P2, b * S, (-P1[0], -P1[1]), c * S
    dx, dy = c2[0] - c1[0], c2[1] - c1[1]; d = math.hypot(dx, dy)
    aa = (r1 * r1 - r2 * r2 + d * d) / (2 * d); h = math.sqrt(max(r1 * r1 - aa * aa, 1))
    bx, by = c1[0] + aa * dx / d, c1[1] + aa * dy / d
    return P1, P2, (bx + h * dy / d, by - h * dx / d)

AFIG = {('3-02', 1): a_tri0, ('3-02', 2): a_tri1, ('3-02', 3): a_tri2,
        ('3-03', 1): a_sym0, ('3-03', 2): a_sym1, ('3-04', 1): a_pt0, ('3-04', 2): a_pt1}
AFIG[('3-03', 4)] = lambda: a_para_mid()   # 마스터 10/16: 평행사변형 오류 질문에 그림 — 다시 묻기도 새 그림

# ───────── 3회차 그림 (조건만) ─────────
def r_row5():    # 합동인 정삼각형 5개를 이어 붙임(한 변 4 cm)
    s = 4 * S * 1.1; h = s * math.sqrt(3) / 2; f = D.Fig()
    for k in range(5):
        if k % 2 == 0: P = [((k // 2) * s, h), ((k // 2) * s + s, h), ((k // 2) * s + s / 2, 0)]
        else: P = [((k // 2) * s + s / 2, 0), ((k // 2) * s + s * 1.5, 0), ((k // 2) * s + s, h)]
        f = M(f, D.poly(P, 'blue'))
    return D.svg(M(f, lab((0, h), (s, h), '4 cm', (0, 14))))
def r_two_right():   # 삼각형 ㄱㄴㄷ ≅ 삼각형 ㄷㄹㅁ (직각 ㄴ, ㄹ) · ㄱㄴ 5 cm · ㄹㅁ 12 cm · 선분 ㄴㄹ = ?
    s = 11; B, Cc, R = (0, 0), (12 * s, 0), (17 * s, 0); A, Mm = (0, -5 * s), (17 * s, -12 * s)
    f = M(D.poly([A, B, Cc], 'blue'), D.poly([Cc, R, Mm], 'amber'), D.right_angle(B, A, Cc), D.right_angle(R, Cc, Mm),
          D.dot(A, 'ㄱ', BLU, 'above'), D.dot(B, 'ㄴ', BLU, 'below'), D.dot(Cc, 'ㄷ', BLU, 'below'), D.dot(R, 'ㄹ', BLU, 'below'), D.dot(Mm, 'ㅁ', BLU, 'above'),
          lab(A, B, '5 cm', (-24, 0)), lab(R, Mm, '12 cm', (28, 0)), D.dim_h(0, 17 * s, 26, '?'))
    return D.svg(f)
def r_cross():   # 삼각형 ㄱㄴㄷ ≅ 삼각형 ㄹㄷㄴ · 각 ㄱㄴㄷ 70° · 각 ㄴㄱㄷ 75° · ㉠ = 각 ㄴㅁㄷ
    W = 200.0; a, b = math.radians(70), math.radians(35)
    x = W * math.tan(b) / (math.tan(a) + math.tan(b)); h = x * math.tan(a)
    A, B, Cc = (x, -h), (0, 0), (W, 0); Rr = (W - x, -h)
    # 교점 ㅁ: 선분 ㄱㄷ 과 ㄹㄴ
    t = (W / 2 - x) / (W - x); Mp = (x + (W - x) * t, -h + h * t)
    f = M(D.poly([A, B, Cc], 'blue', fill=False), D.poly([Rr, Cc, B], 'amber', fill=False),
          D.dot(A, 'ㄱ', BLU, 'above'), D.dot(B, 'ㄴ', BLU, 'below'), D.dot(Cc, 'ㄷ', BLU, 'below'), D.dot(Rr, 'ㄹ', BLU, 'above'), D.dot(Mp, 'ㅁ', BLU, 'above'),
          D.ang(B, A, Cc, '70°', 24), D.ang(A, B, Cc, '75°', 20), D.ang(Mp, B, Cc, '㉠', 16))
    return D.svg(f)
def r_para():    # 평행사변형 ㄱㄴㄷㄹ(위 변 ㄱㄹ 가로) · 대각선이 ㅁ에서 만남 · 각 ㄱㄹㅁ 40° · 각 ㄴㄷㅁ 55° · ㉠ = 각 ㄱㅁㄹ
    Lw = 150.0; ta, tr = math.tan(math.radians(55)), math.tan(math.radians(40))
    x = Lw * tr / (ta + tr); y = x * ta
    A, Rr, O = (0, 0), (Lw, 0), (x, y)
    Cc, B = (2 * x, 2 * y), (2 * x - Lw, 2 * y)
    pts = [A, B, Cc, Rr]
    f = M(D.poly(pts, 'blue'), D.seg(A, Cc, 'solid', '#6E6A86', 1.2), D.seg(B, Rr, 'solid', '#6E6A86', 1.2),
          D.dot(A, 'ㄱ', BLU, 'left'), D.dot(B, 'ㄴ', BLU, 'left'), D.dot(Cc, 'ㄷ', BLU, 'right'), D.dot(Rr, 'ㄹ', BLU, 'right'),
          D.dot(O, None, BLU), D.tag(O[0] + 16, O[1] + 6, 'ㅁ', INK, 12.5),
          D.ang(Rr, A, O, '40°', 30), D.ang(Cc, B, O, '55°', 30), D.ang(O, A, Rr, '㉠', 16))
    return D.svg(f)

def r_fold():    # 직사각형 ㄱㄴㄷㄹ 을 선분 ㄴㅁ 으로 접음 · 각 ㅂㄴㄷ 40° · ㉠ = 각 ㅂㅁㄹ
    H, W = 100.0, 180.0; A, B, Cc, Rr = (0, 0), (0, H), (W, H), (W, 0)
    Mm = (H * math.tan(math.radians(25)), 0); Bp = (H * math.sin(math.radians(50)), H - H * math.cos(math.radians(50)))
    f = M(D.seg(Mm, Rr, 'solid', BLU, 1.6), D.seg(Rr, Cc, 'solid', BLU, 1.6), D.seg(Cc, B, 'solid', BLU, 1.6),      # 남은 직사각형 테두리
          D.seg(A, Mm, 'dashed', BLU, 1.3), D.seg(A, B, 'dashed', BLU, 1.3), D.poly([B, Mm, Bp], 'amber'),           # 접혀 나간 자리 = 점선(마스터 10/16)
          D.dot(A, 'ㄱ', BLU, 'left'), D.dot(B, 'ㄴ', BLU, 'left'), D.dot(Cc, 'ㄷ', BLU, 'right'), D.dot(Rr, 'ㄹ', BLU, 'right'), D.dot(Mm, 'ㅁ', BLU, 'above'), D.dot(Bp, 'ㅂ', BLU, 'right'),
          D.ang(B, Bp, Cc, '40°', 30), D.ang(Mm, Bp, Rr, '㉠', 18))
    return D.svg(f)
def r_shapes():  # 선대칭도형 찾기 — ㉠ 등변사다리꼴 ㉡ 평행사변형 ㉢ 직사각형 ㉣ Z 모양 ㉤ 화살표 ㉥ 정삼각형
    f = D.Fig(); gx = 92
    shapes = [
        [(-22, 18), (22, 18), (34, -18), (-34, -18)][::-1],
        [(-34, 18), (14, 18), (34, -18), (-14, -18)],
        [(-30, 20), (30, 20), (30, -20), (-30, -20)],
        [(-30, -22), (30, -22), (30, -10), (-6, 10), (30, 10), (30, 22), (-30, 22), (-30, 10), (6, -10), (-30, -10)],
        [(0, -24), (26, 0), (10, 0), (10, 22), (-10, 22), (-10, 0), (-26, 0)],
        [(0, -24), (25, 20), (-25, 20)],
    ]
    cols = ['blue', 'amber', 'green', 'rose', 'blue', 'amber']
    for k, (pts, c) in enumerate(zip(shapes, cols)):
        x0 = (k % 3) * gx; y0 = (k // 3) * 84
        f = M(f, D.poly(shift(pts, x0, y0), c), D.tag(x0 - 40, y0 - 22, '㉠㉡㉢㉣㉤㉥'[k], INK, 13))
    return D.svg(f)
def r_kite():    # 사각형 ㄱㄴㄷㄹ 은 선분 ㄱㄷ 을 대칭축으로 하는 선대칭도형 · 각 ㄴㄱㄷ 35° · 각 ㄱㄷㄹ 25° · ㉠ = 각 ㄱㄴㄷ
    Lh = 190.0; A, Cc = (0, 0), (0, Lh)
    a, c = math.radians(35), math.radians(25)
    # ㄹ: ㄱ 에서 아래로 35°, ㄷ 에서 위로 25° (오른쪽)
    x = Lh / (1 / math.tan(a) + 1 / math.tan(c)); y = x / math.tan(a)
    Rr, B = (x, y), (-x, y)
    f = M(D.poly([A, B, Cc, Rr], 'green'), D.seg((0, -16), (0, Lh + 16), 'dashed', RED, 1.4),
          D.dot(A, 'ㄱ', BLU, 'above'), D.dot(B, 'ㄴ', BLU, 'left'), D.dot(Cc, 'ㄷ', BLU, 'below'), D.dot(Rr, 'ㄹ', BLU, 'right'),
          D.ang(A, B, Cc, '35°', 30), D.ang(Cc, A, Rr, '25°', 36), D.ang(B, A, Cc, '㉠', 20, lab_d=7))
    return D.svg(f)
def r_pt_part():  # 점 ㅇ 을 대칭의 중심으로 하는 점대칭도형의 일부분 · ㄴㄷ 6 · ㄷㄹ 5 cm · 변 ㄱㄴ = ?
    s = 10.0; A, Rr = (0, -70), (0, 70)
    Nn = (60, -3)
    c1, r1, c2, r2 = Nn, 6 * s, Rr, 5 * s
    dx, dy = c2[0] - c1[0], c2[1] - c1[1]; d = math.hypot(dx, dy)
    aa = (r1 * r1 - r2 * r2 + d * d) / (2 * d); h = math.sqrt(r1 * r1 - aa * aa)
    bx, by = c1[0] + aa * dx / d, c1[1] + aa * dy / d
    Dd = (bx - h * dy / d, by + h * dx / d)
    if Dd[0] < bx: Dd = (bx + h * dy / d, by - h * dx / d)
    pts = [A, Nn, Dd, Rr]
    f = M(D.seg(A, Nn, 'solid', BLU, 1.8), D.seg(Nn, Dd, 'solid', BLU, 1.8), D.seg(Dd, Rr, 'solid', BLU, 1.8), D.seg(A, Rr, 'dashed', '#6E6A86', 1.1),
          D.dot(A, 'ㄱ', BLU, 'above'), D.dot(Nn, 'ㄴ', BLU, 'right'), D.dot(Dd, 'ㄷ', BLU, 'right'), D.dot(Rr, 'ㄹ', BLU, 'below'), D.dot((0, 0), 'ㅇ', RED, 'left'),
          lab(Nn, Dd, '6 cm', outoff(Nn, Dd, (20, 20), 18)), lab(Dd, Rr, '5 cm', outoff(Dd, Rr, (20, 0), 16)), lab(A, Nn, '?', outoff(A, Nn, (20, 20), 14), RED))
    return D.svg(f)
def r_para_area():   # 평행사변형(점대칭) ㄱㄴㄷㄹ · 대칭의 중심 ㅇ · 삼각형 ㄱㅇㄹ 넓이 9 cm²
    A, B, Cc, Rr = (-40, -50), (-100, 50), (40, 50), (100, -50); O = (0, 0)
    f = M(D.poly([A, B, Cc, Rr], 'blue', fill=False), D.poly([A, O, Rr], 'amber'), D.seg(A, Cc, 'solid', '#6E6A86', 1.2), D.seg(B, Rr, 'solid', '#6E6A86', 1.2),
          D.dot(A, 'ㄱ', BLU, 'above'), D.dot(B, 'ㄴ', BLU, 'below'), D.dot(Cc, 'ㄷ', BLU, 'below'), D.dot(Rr, 'ㄹ', BLU, 'above'), D.dot(O, 'ㅇ', RED, 'below'),
          D.tag(20, -28, '9 cm²', '#A97C22', 12))
    return D.svg(f)
SEG7 = {'2': 'abged', '3': 'abgcd', '5': 'afgcd', '7': 'abc', '8': 'abcdefg'}
def seven(x, y, d, w=22, h=40, c='#B55B45'):
    P = {'a': ((x, y), (x + w, y)), 'b': ((x + w, y), (x + w, y + h / 2)), 'c': ((x + w, y + h / 2), (x + w, y + h)), 'd': ((x, y + h), (x + w, y + h)),
         'e': ((x, y + h / 2), (x, y + h)), 'f': ((x, y), (x, y + h / 2)), 'g': ((x, y + h / 2), (x + w, y + h / 2))}
    f = D.Fig()
    for k in SEG7[d]: f = M(f, D.seg(P[k][0], P[k][1], 'solid', c, 5))
    return f
def r_digits():
    f = D.Fig()
    for k, dch in enumerate('23578'): f = M(f, seven(k * 50, 0, dch))
    return D.svg(f)

def q_para_diag():   # 03 2회차: 평행사변형 + 친구가 말한 대각선(접는 선, 점선) — 조건만
    P = [(-30, -32), (-66, 32), (30, 32), (66, -32)]
    f = M(D.poly(P, 'amber'), D.seg(P[1], P[3], 'dashed', RED, 1.4),
          D.dot(P[0], 'ㄱ', BLU, 'above'), D.dot(P[1], 'ㄴ', BLU, 'left'), D.dot(P[2], 'ㄷ', BLU, 'right'), D.dot(P[3], 'ㄹ', BLU, 'above'))
    return D.svg(f)
def a_para_mid():    # 다시 묻기: 다른 평행사변형 + 가운데 가로선(점선)
    P = [(-20, -36), (-54, 36), (44, 36), (78, -36)]
    f = M(D.poly(P, 'green'), D.seg((-37 - 8, 0), (61 + 8, 0), 'dashed', RED, 1.4),
          D.dot(P[0], 'ㄱ', BLU, 'above'), D.dot(P[1], 'ㄴ', BLU, 'left'), D.dot(P[2], 'ㄷ', BLU, 'right'), D.dot(P[3], 'ㄹ', BLU, 'above'))
    return D.svg(f)

R3 = {'r53row5': (r_row5, 300), 'r53right': (r_two_right, 300), 'r53cross': (r_cross, 260), 'r53para': (r_para, 260), 'r53fold': (r_fold, 260),
      'r53shapes': (r_shapes, 320), 'r53kite': (r_kite, 250), 'r53ptpart': (r_pt_part, 250), 'r53parea': (r_para_area, 240), 'r53digits': (r_digits, 260)}
Q2 = {'q53trib': (q_tri_b, 330), 'q53tric': (q_tri_c, 330), 'q53symb': (q_sym_b, 200), 'q53ptb': (q_pt_b, 220), 'q53paraf': (q_para_diag, 200)}

# ───────── 긴 설명 그림 (LFIG) ─────────
def l_congruent():   # 포개면 완전히 겹침
    P = tri(4, 6, 5); Q = shift(P, 150, 0)
    f = M(D.poly(P, 'blue'), D.poly(Q, 'blue'), D.to_arrow(110, -20, '포개면'), D.poly(shift(P, 250, 0), 'amber'), D.poly(shift(P, 254, -3), 'blue', fill=False, style='dashed'),
          D.tag(296, 26, '완전히 겹쳐요', GRN, 12))
    return D.svg(f)
def l_size():        # 모양은 같지만 크기가 다르면 합동이 아님(정삼각형 2 cm · 4 cm)
    P = tri(2, 2, 2, 22); Q = shift(tri(4, 4, 4, 22), 90, 0)
    return D.svg(M(D.poly(P, 'blue'), D.poly(Q, 'amber'), lab(P[1], P[2], '2 cm', (0, 14)), lab(Q[1], Q[2], '4 cm', (0, 14)),
                   D.tag(130, 40, '모양은 같지만 크기가 달라서 합동이 아니에요', RED, 12)))
def l_turn():        # 돌리기 · 뒤집기 해도 합동
    P = tri(3, 5, 4, 18)
    Q = shift(rot(P, cen(P)), 150, 0); Rf = shift(flip(P, 45), 300, 0)
    return D.svg(M(D.poly(P, 'blue'), D.to_arrow(102, -24, '돌리기'), D.poly(Q, 'amber'), D.to_arrow(252, -24, '뒤집기'), D.poly(Rf, 'green'),
                   D.tag(190, 40, '모양과 크기가 그대로 → 모두 합동', GRN, 12)))
def l_cut():         # 직사각형을 잘라 합동인 도형 2개 / 4개
    f = D.Fig(); W, H = 80, 54
    cuts = [[((W / 2, 0), (W / 2, H))], [((0, 0), (W, H))], [((W / 2, 0), (W / 2, H)), ((0, H / 2), (W, H / 2))], [((0, 0), (W, H)), ((W, 0), (0, H))]]
    for k, cs in enumerate(cuts):
        x0 = k * 100
        f = M(f, D.poly([(x0, 0), (x0 + W, 0), (x0 + W, H), (x0, H)], 'green'))
        for p, q in cs: f = M(f, D.seg((x0 + p[0], p[1]), (x0 + q[0], q[1]), 'dashed', RED, 1.5))
    f = M(f, D.tag(90, H + 20, '두 조각으로', SOFT, 12), D.tag(290, H + 20, '네 조각으로', SOFT, 12))
    return D.svg(f)
def l_perim():       # 둘레가 같아도 합동이 아닌 직사각형(6 × 2, 5 × 3 → 둘레 16)
    s = 14; A = [(0, 0), (6 * s, 0), (6 * s, 2 * s), (0, 2 * s)]; B = shift([(0, 0), (5 * s, 0), (5 * s, 3 * s), (0, 3 * s)], 120, -8)
    return D.svg(M(D.poly(A, 'blue'), D.poly(B, 'amber'), D.dim_h(0, 6 * s, 2 * s + 12, '6 cm'), D.dim_v(0, 2 * s, -12, '2 cm'),
                   D.dim_h(120, 120 + 5 * s, 3 * s + 4, '5 cm'), D.dim_v(-8, 3 * s - 8, 120 + 5 * s + 12, '3 cm', left=False),
                   D.tag(100, 82, '둘레는 둘 다 16 cm, 하지만 포개면 겹치지 않아요', RED, 12)))
def l_corr():        # 대응점·대응변·대응각 (교재 64쪽 모양)
    P = tri(4, 6, 5); Q = shift(P, 150, 0)
    f = M(D.poly(P, 'blue'), D.poly(Q, 'amber'), names(P, ['ㄱ', 'ㄴ', 'ㄷ']), names(Q, ['ㄹ', 'ㅁ', 'ㅂ']),
          D.seg(P[0], Q[0], 'dashed', RED, 1), D.tag(mid(P[0], Q[0])[0], P[0][1] - 8, '대응점', RED, 11.5),
          D.seg(P[1], P[2], 'solid', GRN, 3), D.seg(Q[1], Q[2], 'solid', GRN, 3), D.tag(mid(P[2], Q[1])[0], 30, '대응변', GRN, 11.5),
          D.ang(P[1], P[0], P[2], None, 16), D.ang(Q[1], Q[0], Q[2], None, 16))
    return D.svg(f)
def l_table():       # 대응점을 먼저 찾으면 대응변이 바로 나온다(돌려 놓은 두 삼각형, 4 · 6 · 7)
    f = pair(4, 7, 6, 'rot', ['4 cm', '7 cm', '6 cm'], ['4 cm', '7 cm', '6 cm'])
    f = M(f, D.tag(140, 50, 'ㄱ ↔ ㄹ   ㄴ ↔ ㅁ   ㄷ ↔ ㅂ', RED, 12.5), D.tag(140, 70, '변 ㄱㄷ ↔ 변 ㄹㅂ', SOFT, 12))
    return D.svg(f)
def l_angles():      # 대응각은 크기가 같다 — 색으로 짝
    P = tri(5, 7, 6, 15); Q = shift(flip(P, P[2][0] / 2), 160, 0)
    f = M(D.poly(P, 'blue', fill=False), D.poly(Q, 'amber', fill=False), names(P, ['ㄱ', 'ㄴ', 'ㄷ']), names(Q, ['ㄹ', 'ㅁ', 'ㅂ']))
    for k, c in enumerate(['#B55B45', '#3C8B64', '#3B6FA8']):
        for T in (P, Q): f = M(f, D.ang(T[k], T[(k + 1) % 3], T[(k + 2) % 3], None, 15, c))
    return D.svg(M(f, D.tag(110, 30, '같은 색 = 대응각(크기가 같음)', SOFT, 12)))
def l_back():        # 돌려 놓은 삼각형을 다시 돌려 포개 보기
    P = tri(5, 8, 6, 14); c = (8 * 14 + 30, P[0][1] / 2); Q = rot(P, c)
    f = M(D.poly(P, 'blue'), D.poly(Q, 'amber'), names(P, ['ㄱ', 'ㄴ', 'ㄷ']), names(Q, ['ㄹ', 'ㅁ', 'ㅂ']),
          D.tag(c[0], c[1] - 40, '180° 돌려 포개면', SOFT, 12), D.tag(c[0], 34, '위·아래가 아니라 겹치는 점이 대응점', RED, 12))
    return D.svg(f)
def l_perim2():      # 합동인 두 삼각형(3 · 5 · 6 cm)의 둘레는 같다
    P = tri(3, 6, 5, 18); Q = shift(rot(P, cen(P)), 140, 0)
    return D.svg(M(D.poly(P, 'blue'), D.poly(Q, 'amber'), sides(P, ['3 cm', '6 cm', '5 cm']), sides(Q, ['3 cm', '6 cm', '5 cm']),
                   D.tag(130, 40, '3 + 6 + 5 = 14 cm — 둘 다 14 cm', GRN, 12)))
def l_symdef():      # 선대칭도형: 대칭축을 따라 접으면 완전히 겹침
    P = [(0, -70), (54, 40), (-54, 40)]
    return D.svg(M(D.poly(P, 'blue'), D.seg((0, -84), (0, 54), 'solid', RED, 2), D.tag(0, -90, '대칭축', RED, 12),
                   D.to_arrow(80, 0, '접으면'), D.poly([(140, -70), (194, 40), (140, 40)], 'amber'), D.tag(170, 64, '양쪽이 완전히 겹쳐요', GRN, 12)))
def l_symprop():     # 대응변 같음 · 대응점을 이은 선분은 대칭축과 수직 · 똑같이 둘로
    f = sym_pent(top=3.4, nx=3.4, ny=1.0, dx=2.4, dy=2.8)
    N, Mm = (3.4 * S, -1.0 * S), (-3.4 * S, -1.0 * S); Sx = (0, -1.0 * S)
    f = M(f, D.right_angle(Sx, N, (0, -3.4 * S)), D.ticks(Sx, N, 1, RED), D.ticks(Mm, Sx, 1, RED),
          D.ticks(N, (2.4 * S, 2.8 * S), 2, GRN), D.ticks(Mm, (-2.4 * S, 2.8 * S), 2, GRN))
    return D.svg(f)
def l_symhalf():     # 대칭축이 대응점을 이은 선분을 둘로 똑같이 나눔 (8 cm → 4 cm, 4 cm)
    f = sym_hex(sx=3.0, sy=1.0, lx=2.0, ly=2.6, top=3.2, bot=2.8)
    N, Mm, Sx = (3.0 * S, -1.0 * S), (-3.0 * S, -1.0 * S), (0, -1.0 * S)
    return D.svg(M(f, D.tag(N[0] / 2, Sx[1] + 16, '4 cm', RED, 11.5), D.tag(Mm[0] / 2, Sx[1] + 16, '4 cm', RED, 11.5), D.tag(0, -5.6 * S, '선분 ㄴㅁ 8 cm', SOFT, 12)))
def l_axes():        # 직사각형 대칭축 2개 · 정사각형 4개 (교재 66쪽 오른쪽)
    a = 60; f = D.poly([(0, 0), (90, 0), (90, a), (0, a)], 'blue')
    f = M(f, D.seg((45, -10), (45, a + 10), 'dashed', RED, 1.4), D.seg((-10, a / 2), (100, a / 2), 'dashed', RED, 1.4), D.tag(45, a + 26, '직사각형: 2개', SOFT, 12))
    x0 = 140; f = M(f, D.poly([(x0, -5), (x0 + 70, -5), (x0 + 70, 65), (x0, 65)], 'amber'))
    for p, q in [((x0 + 35, -15), (x0 + 35, 75)), ((x0 - 10, 30), (x0 + 80, 30)), ((x0 - 8, -13), (x0 + 78, 73)), ((x0 + 78, -13), (x0 - 8, 73))]:
        f = M(f, D.seg(p, q, 'dashed', RED, 1.3))
    return D.svg(M(f, D.tag(x0 + 35, a + 26, '정사각형: 4개', SOFT, 12)))
def l_para_fold():   # 평행사변형은 대각선으로 접어도 겹치지 않음
    P = [(-60, 30), (30, 30), (60, -30), (-30, -30)]
    Q = [(-60, 30), (60, -30), (-30, -30)]
    # 대각선 (-60,30)-(60,-30) 로 접은 삼각형: 점 (-30,-30) 을 대각선에 대해 반사
    ax, ay, bx, by = -60, 30, 60, -30; px, py = -30, -30
    dx, dy = bx - ax, by - ay; t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy); fx, fy = ax + t * dx, ay + t * dy
    Rp = (2 * fx - px, 2 * fy - py)
    f = M(D.poly(P, 'blue', fill=False, style='dashed'), D.poly([(-60, 30), (30, 30), (60, -30)], 'blue'), D.poly([(-60, 30), (60, -30), Rp], 'amber'),
          D.tag(0, 60, '대각선으로 접으면 삐져나와요 — 겹치지 않아요', RED, 12))
    return D.svg(f)
def l_ptdef():       # 점대칭도형: 대칭의 중심으로 180° 돌리면 완전히 겹침
    P = [(-50, 30), (10, 30), (50, -30), (-10, -30)]
    f = M(D.poly(P, 'blue'), names(P, ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'], (0, 0)), D.dot((0, 0), '', RED), D.tag(0, 68, '가운데 점 = 대칭의 중심', RED, 11.5),
          D.to_arrow(70, 0, '180°'), D.poly(shift(P, 170, 0), 'amber'), names(shift(P, 170, 0), ['ㄷ', 'ㄹ', 'ㄱ', 'ㄴ'], (170, 0)), D.tag(170, 68, '처음과 완전히 겹쳐요', GRN, 11.5))
    return D.svg(f)
def l_ptprop():      # 대응변(같은 색)의 길이가 같음 (변 ㄱㄴ = 변 ㄹㅁ …)
    P1, P2, P3 = pt_by_lengths(6, 4, 3)
    f = pt_hex(P1, P2, P3, dash=None)
    pts = [P1, P2, P3, (-P1[0], -P1[1]), (-P2[0], -P2[1]), (-P3[0], -P3[1])]
    for k, c in enumerate([RED, GRN, BLU]):
        f = M(f, D.seg(pts[k], pts[k + 1], 'solid', c, 3.2), D.seg(pts[k + 3], pts[(k + 4) % 6], 'solid', c, 3.2))
    return D.svg(M(f, D.tag(0, 78, '같은 색 변끼리 길이가 같아요', SOFT, 12)))
def l_pthalf():      # 대칭의 중심은 대응점을 이은 선분을 둘로 똑같이 나눔 (선분 ㄴㅇ 5 cm → ㄴㅁ 10 cm)
    f = pt_hex((-72, -10), (-30, -46), (40, -40), nm=('', 'ㄴ', '', '', 'ㅁ', ''), dash=(1, 4))
    N = (-30, -46); Mm = (30, 46)
    return D.svg(M(f, D.ticks(N, (0, 0), 1, RED), D.ticks((0, 0), Mm, 1, RED), D.tag(-34, -18, '5 cm', RED, 11.5), D.tag(34, 26, '5 cm', RED, 11.5)))
def l_compare():     # 선대칭 = 접기(축 여러 개 가능) · 점대칭 = 180° 돌리기(중심 1개)
    f = M(D.poly([(-40, 30), (40, 30), (0, -40)], 'blue'), D.seg((0, -52), (0, 42), 'dashed', RED, 1.6), D.tag(0, 60, '선대칭: 접어서 겹침', SOFT, 12))
    P = shift([(-44, 24), (14, 24), (44, -24), (-14, -24)], 170, 0)
    f = M(f, D.poly(P, 'amber'), D.dot((170, 0), '', RED), D.tag(170, 60, '점대칭: 180° 돌려 겹침', SOFT, 12))
    return D.svg(f)
def l_tri180():      # 정삼각형을 180° 돌리면 꼭짓점이 아래로 → 겹치지 않음
    P = [(0, -46), (40, 24), (-40, 24)]; c = (0, 0); Q = shift(rot(P, c), 0, 0)
    return D.svg(M(D.poly(P, 'blue'), D.poly(Q, 'amber', fill=False, style='dashed'), D.dot(c, '', RED), D.tag(0, 70, '180° 돌린 모양(점선)과 겹치지 않아요', RED, 12)))
def l_flow3():
    f = M(D.tag(60, 0, '① 대응점 찾기', BLU, 13), D.to_arrow(120, -4, ''), D.tag(250, 0, '② 대응변·대응각은 같다', GRN, 13),
          D.tag(150, 34, '③ 대칭이면: 축·중심이 대응점을 이은 선분을 둘로 똑같이', RED, 12))
    return D.svg(f)

def _tick(p, q, n=1):   # 같은 길이 표시(빗금)
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2; dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy); ux, uy = -dy / L * 5, dx / L * 5
    return M(*[D.seg((mx + ux + k * dx / L * 4, my + uy + k * dy / L * 4), (mx - ux + k * dx / L * 4, my - uy + k * dy / L * 4), 'solid', RED, 1.3) for k in range(n)])
def l_symdraw():     # 선대칭도형 그리기(교재 70쪽): 수선 → 같은 거리에 대응점 → 차례로 잇기
    G = [(-24, -46), (-62, -6), (-30, 42)]; Mr = [(-x, y) for x, y in G]
    f = M(D.seg((0, -62), (0, 60), 'dashed', RED, 1.4), D.seg(G[0], G[1], 'solid', BLU, 1.8), D.seg(G[1], G[2], 'solid', BLU, 1.8),
          D.seg(Mr[0], Mr[1], 'solid', '#A97C22', 1.8), D.seg(Mr[1], Mr[2], 'solid', '#A97C22', 1.8), D.seg(G[0], Mr[0], 'solid', '#A97C22', 1.8), D.seg(G[2], Mr[2], 'solid', '#A97C22', 1.8))
    for p, q in zip(G, Mr): f = M(f, D.seg(p, q, 'dashed', '#6E6A86', 1.0), _tick(p, (0, p[1])), _tick((0, p[1]), q))
    f = M(f, D.seg((0, -6), (7, -6), 'solid', '#6E6A86', 1), D.seg((7, -6), (7, -13), 'solid', '#6E6A86', 1), D.seg((7, -13), (0, -13), 'solid', '#6E6A86', 1),
          D.dot(G[1], 'ㄴ', BLU, 'left'), D.dot(Mr[1], 'ㅁ', '#A97C22', 'right'), D.dot((0, -6), 'ㅅ', INK, 'below'),
          D.tag(0, 82, '수선 → 대칭축까지 같은 거리에 대응점 → 차례로 잇기', SOFT, 11.5, 400))
    return D.svg(f)
def l_ptdraw():      # 점대칭도형 그리기(교재 72쪽): 대칭의 중심을 지나는 직선 → 같은 거리에 대응점 → 차례로 잇기
    G = [(-88, -12), (-44, 48), (34, 48)]; Mr = [(-x, -y) for x, y in G]
    f = M(D.seg(G[0], G[1], 'solid', BLU, 2), D.seg(G[1], G[2], 'solid', BLU, 2),
          D.seg(G[2], Mr[0], 'solid', '#A97C22', 2), D.seg(Mr[0], Mr[1], 'solid', '#A97C22', 2), D.seg(Mr[1], Mr[2], 'solid', '#A97C22', 2), D.seg(Mr[2], G[0], 'solid', '#A97C22', 2))
    for k, (p, q) in enumerate(zip(G, Mr)): f = M(f, D.seg(p, q, 'dashed', '#6E6A86', 1.0), _tick(p, (0, 0), k + 1), _tick((0, 0), q, k + 1))
    f = M(f, D.dot((0, 0), 'ㅇ', RED, 'above'), D.dot(G[1], 'ㄴ', BLU, 'below'), D.dot(Mr[1], 'ㅁ', '#A97C22', 'above'),
          D.tag(0, 82, '대칭의 중심을 지나는 직선 → 같은 거리에 대응점 → 차례로 잇기', SOFT, 11.5, 400))
    return D.svg(f)

LFIG = {
    '3-01': ['l_congruent', 'l_size', 'l_turn', 'l_cut', 'l_perim'],
    '3-02': ['l_corr', 'l_table', 'l_angles', 'l_back', 'l_perim2'],
    '3-03': ['l_symdef', 'l_symprop', 'l_symhalf', 'l_axes', 'l_para_fold', 'l_symdraw'],
    '3-04': ['l_ptdef', 'l_ptprop', 'l_pthalf', 'l_compare', 'l_tri180', 'l_ptdraw', 'l_flow3'],
}
F = {k: v for k, v in globals().items() if k.startswith('l_')}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    o = ['<!doctype html><meta charset="utf-8"><title>3단원 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    o.append('<h3>질문 그림(새로)</h3>')
    for k, (fn, w) in list(Q2.items()) + list(R3.items()): o.append('<div style="border:1px solid #ccd;margin:8px 0;padding:6px"><b>%s</b><br>%s</div>' % (k, fn()))
    o.append('<h3>다시 묻기</h3>')
    for k, fn in AFIG.items(): o.append('<div style="border:1px dashed #99a;margin:8px 0;padding:6px"><b>%s</b><br>%s</div>' % (k, fn()))
    o.append('<h3>긴 설명</h3>')
    for tag, ns in LFIG.items():
        for i, n in enumerate(ns): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_3단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p)
