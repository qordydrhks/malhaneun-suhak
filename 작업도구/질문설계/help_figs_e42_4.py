# -*- coding: utf-8 -*-
"""초4-2 4단원 '긴 설명' 그림 (마스터 10/6: 짧은 설명은 말로만, 긴 설명은 그림과 함께).
   LFIG[tag][i] = 그림 이름 — help_e42_4.H[tag][i] 의 긴 설명에 붙는다.
   설명 그림이라 답·라벨을 적어도 된다(아이템으로 산 설명). 단, 숫자는 그 긴 설명의 예와 같게,
   다시 묻기·3회차 숫자와는 다르게. 같은 그림 재탕 금지 — 배치·모양·방향을 다르게.
   그림만 보기: python -X utf8 help_figs_e42_4.py → 그림_긴설명_초4-2_4단원.html
"""
import math, html
e = html.escape
LINE = '#374151'; BLUE = '#2f5fb3'; ORG = '#b45309'; GRN = '#15803d'; RED = '#c0392b'; SUB = '#6b7280'
FILL = '#eef3fb'; PALE = '#fdf6ec'

def S(w, h, body):
    return ('<svg viewBox="0 0 %d %d" width="%d" style="max-width:100%%;height:auto" xmlns="http://www.w3.org/2000/svg" '
            'font-family="Malgun Gothic,sans-serif">%s</svg>') % (w, h, int(w * .7), body)
def T(x, y, s, c=LINE, sz=13, a='middle', w=400):
    return '<text x="%.1f" y="%.1f" font-size="%s" fill="%s" text-anchor="%s" font-weight="%d">%s</text>' % (x, y, sz, c, a, w, e(s))
def L(p, q, c=LINE, w=1.8, dash=''):
    return '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%s" stroke-linecap="round"%s/>' % (p[0], p[1], q[0], q[1], c, w, (' stroke-dasharray="%s"' % dash) if dash else '')
def P(pts, fill=FILL, stroke=BLUE, w=2, op=1):
    return '<polygon points="%s" fill="%s" fill-opacity="%s" stroke="%s" stroke-width="%s" stroke-linejoin="round"/>' % (' '.join('%.1f,%.1f' % p for p in pts), fill, op, stroke, w)
def D(p, c=LINE, r=3.2): return '<circle cx="%.1f" cy="%.1f" r="%s" fill="%s"/>' % (p[0], p[1], r, c)
def U(a): return (math.cos(math.radians(a)), -math.sin(math.radians(a)))
def add(p, a, s): u = U(a); return (p[0] + u[0] * s, p[1] + u[1] * s)
def RA(p, a1, a2, s=10, c=ORG):   # 직각 표시 ⌞ (두 방향, 도)
    q1 = add(p, a1, s); q2 = add(q1, a2, s); q3 = add(p, a2, s)
    return '<polyline points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="none" stroke="%s" stroke-width="1.5"/>' % (q1 + q2 + q3 + (c,))
def ARC(c, a1, a2, r=20, col=ORG, w=1.8):   # a1 → a2 반시계(화면에서)
    p1, p2 = add(c, a1, r), add(c, a2, r)
    big = 1 if (a2 - a1) % 360 > 180 else 0
    return '<path d="M%.1f %.1f A%d %d 0 %d 0 %.1f %.1f" fill="none" stroke="%s" stroke-width="%s"/>' % (p1[0], p1[1], r, r, big, p2[0], p2[1], col, w)
def ang(p, q): return math.degrees(math.atan2(-(q[1] - p[1]), q[0] - p[0])) % 360
def TK(p, q, n=1, c=BLUE):   # 같은 길이 빗금 n줄
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2; dx, dy = q[0] - p[0], q[1] - p[1]; l = math.hypot(dx, dy)
    ux, uy = dx / l, dy / l; nx, ny = -uy * 6, ux * 6; o = ''
    for k in range(n):
        s = (k - (n - 1) / 2) * 4
        o += L((mx + ux * s - nx, my + uy * s - ny), (mx + ux * s + nx, my + uy * s + ny), c, 1.8)
    return o
def AR(p, q, c=SUB, w=1.6):   # 화살표
    a = math.atan2(q[1] - p[1], q[0] - p[0]); h = 7
    l1 = (q[0] - h * math.cos(a - .45), q[1] - h * math.sin(a - .45)); l2 = (q[0] - h * math.cos(a + .45), q[1] - h * math.sin(a + .45))
    return L(p, q, c, w) + '<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="%s"/>' % (q + l1 + l2 + (c,))
def BOX(x, y, w, h, lines, fill='#f8fafc', stroke='#cbd2dc', c=LINE, sz=12.5, bold=False):
    o = '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="9" fill="%s" stroke="%s" stroke-width="1.4"/>' % (x, y, w, h, fill, stroke)
    n = len(lines); y0 = y + h / 2 - (n - 1) * 8 + 4.5
    for k, s in enumerate(lines): o += T(x + w / 2, y0 + k * 16, s, c, sz, 'middle', 700 if bold and k == 0 else 400)
    return o
def ok(x, y): return T(x, y, '✓', GRN, 16, 'middle', 700)
def no(x, y): return T(x, y, '✗', RED, 16, 'middle', 700)
def sides(pts, cols, w=3.2):   # 변마다 색을 따로(None 이면 건너뜀)
    o = ''
    for k, c in enumerate(cols):
        if c: o += L(pts[k], pts[(k + 1) % len(pts)], c, w)
    return o
def rect_ra(pts):   # 네 꼭짓점 모두 ⌞
    o = ''
    for k in range(4):
        p = pts[k]; a = ang(p, pts[(k + 1) % 4]); b = ang(p, pts[k - 1]); o += RA(p, a, b, 9)
    return o
def rot(c, pts, deg):
    r = math.radians(deg); o = []
    for x, y in pts:
        dx, dy = x - c[0], y - c[1]
        o.append((c[0] + dx * math.cos(r) + dy * math.sin(r), c[1] - dx * math.sin(r) + dy * math.cos(r)))
    return o
def setsq(p, a1, a2, l1, l2):   # 삼각자: 직각 꼭짓점 p, 두 변 방향·길이
    return P([p, add(p, a1, l1), add(p, a2, l2)], '#fde68a', '#b7791f', 1.4, .55)
def cap(x, y, s, c=SUB, sz=12): return T(x, y, s, c, sz)

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 4-01 수직 ─────────
@fig
def f_fold():   # 직각: 종이를 반듯하게 두 번 접기 (3-1 42쪽)
    b = P([(14, 42), (40, 16), (86, 20), (108, 50), (100, 92), (60, 110), (22, 96)], PALE, '#9aa3b2', 1.6)
    b += L((4, 62), (118, 62), ORG, 1.6, '5 4') + cap(60, 134, '① 반듯하게 접기')
    b += AR((124, 62), (142, 62))
    b += P([(152, 62), (156, 40), (180, 18), (226, 22), (248, 50), (246, 62)], PALE, '#9aa3b2', 1.6) + L((152, 62), (246, 62), LINE, 2.2)
    b += L((200, 8), (200, 76), ORG, 1.6, '5 4') + cap(200, 134, '② 한 번 더 반듯하게 접기')
    b += AR((258, 62), (276, 62))
    C = (300, 104)
    b += P([C, (300, 44), (318, 26), (350, 30), (372, 60), (378, 104)], PALE, '#9aa3b2', 1.6) + L(C, (378, 104), LINE, 2.2) + L(C, (300, 44), LINE, 2.2)
    b += RA(C, 0, 90, 12) + T(330, 90, '직각 = 90°', ORG, 12.5, 'start', 700) + cap(340, 134, '③ 생긴 각이 직각')
    return S(392, 144, b)

@fig
def f_perp_def():   # 수직의 뜻: 직선과 직선 / 선분과 선분 / 수직이 아닌 것
    O = (82, 70); b = ''
    for a in (25, 115): b += L(add(O, a, 62), add(O, a + 180, 62), LINE, 2)
    b += RA(O, 25, 115, 11) + cap(82, 150, '두 직선이 직각으로 만나요') + T(82, 168, '→ 서로 수직', ORG, 12.5, 'middle', 700)
    Q = (206, 112); b += L(Q, (206, 26), BLUE, 2.4) + L(Q, (300, 112), BLUE, 2.4) + D((206, 26), BLUE) + D((300, 112), BLUE) + D(Q, BLUE)
    b += RA(Q, 0, 90, 11) + cap(253, 150, '선분과 선분도') + T(253, 168, '→ 서로 수직', ORG, 12.5, 'middle', 700)
    R = (392, 72); b += L(add(R, 15, 62), add(R, 195, 62), '#9aa3b2', 2) + L(add(R, 70, 62), add(R, 250, 62), '#9aa3b2', 2)
    b += ARC(R, 15, 70, 20, '#9aa3b2') + cap(392, 150, '직각이 아니면') + T(392, 168, '→ 수직이 아니에요', RED, 12.5, 'middle', 700)
    return S(470, 178, b)

@fig
def f_perp_line():   # 수선: 가는 나에 대한 수선 / 삼각자로 긋기
    O = (90, 100); b = L((90, 16), (90, 132), ORG, 2.4) + L((14, 100), (176, 100), LINE, 2) + RA(O, 0, 90, 11)
    b += T(102, 26, '가', ORG, 13, 'start', 700) + T(170, 92, '나', LINE, 13, 'end', 700)
    b += cap(95, 156, '직선 가는 직선 나에 대한 수선') + cap(95, 172, '직선 나도 직선 가에 대한 수선')
    Q = (322, 116); b += L((240, 116), (450, 116), LINE, 2) + T(446, 108, '나', LINE, 13, 'end', 700)
    b += setsq(Q, 0, 90, 80, 84) + L(Q, (322, 14), ORG, 2.4) + RA(Q, 0, 90, 10)
    b += cap(345, 156, '삼각자의 직각을 낀 한 변을 직선에 맞추고') + cap(345, 172, '다른 한 변을 따라 그어요')
    return S(480, 182, b)

@fig
def f_four90():   # 수직이면 네 각 모두 90° · 직선이 이루는 각 180°
    O = (90, 84); b = ''
    for a in (20, 110): b += L(add(O, a, 70), add(O, a + 180, 70), LINE, 2)
    for a in (20, 110, 200, 290): b += RA(O, a, a + 90, 11)
    b += cap(90, 172, '네 각이 모두 직각(90°)')
    Q = (290, 118); b += L((200, 118), (380, 118), LINE, 2) + L(Q, (290, 28), LINE, 2) + RA(Q, 90, 180, 11)
    b += ARC(Q, 0, 180, 40, '#9aa3b2', 1.4) + ARC(Q, 0, 90, 24, ORG) + T(326, 90, '?', ORG, 15, 'middle', 700)
    b += T(270, 104, '90°', ORG, 12.5, 'end', 700) + T(250, 80, '180°', SUB, 11.5, 'end')
    b += cap(290, 148, '직선이 이루는 각은 180°') + T(290, 168, '? = 180° − 90° = 90°', ORG, 12.5, 'middle', 700)
    return S(392, 180, b)

@fig
def f_many_perp():   # 수선은 셀 수 없이 많다 / 점을 지나면 1개
    y = 120; b = L((14, y), (380, y), LINE, 2) + T(388, y + 5, '가', LINE, 13, 'start', 700)
    for x in (40, 80, 120, 160, 200, 300, 340):
        b += L((x, y), (x, 46), '#a3abb8', 1.3, '4 4')
    G = (250, 34); b += L((250, y), G, ORG, 2.6) + RA((250, y), 0, 90, 10) + D(G, ORG, 4) + T(262, 32, 'ㄱ', ORG, 13, 'start', 700)
    b += cap(120, 36, '직선 위 어디에서나 그을 수 있어요') + cap(120, 152, '→ 셀 수 없이 많아요')
    b += T(305, 152, '점 ㄱ을 지나는 수선은 1개', ORG, 12.5, 'middle', 700)
    return S(410, 162, b)

# ───────── 4-02 평행 ─────────
@fig
def f_line_kinds():   # 선분 · 반직선 · 직선 (3-1 40쪽)
    b = ''; A, B = 236, 326
    for k, (name, l, r) in enumerate((('선분 ㄱㄴ', A, B), ('반직선 ㄱㄴ', A, 420), ('직선 ㄱㄴ', 168, 420))):
        y = 30 + k * 46
        b += T(14, y + 5, name, LINE, 13, 'start', 700) + L((l, y), (r, y), BLUE, 2.4)
        b += D((A, y), BLUE, 4) + D((B, y), BLUE, 4) + T(A, y - 9, 'ㄱ', LINE, 12) + T(B, y - 9, 'ㄴ', LINE, 12)
        if r > B: b += L((r, y), (r + 18, y), BLUE, 2.4, '2 5') + T(r + 22, y + 4, '끝없이', SUB, 11, 'start')
        if l < A: b += L((l, y), (l - 18, y), BLUE, 2.4, '2 5') + T(l - 22, y + 4, '끝없이', SUB, 11, 'end')
    b += cap(250, 160, '직선은 양쪽으로 끝없이 늘인 곧은 선 — 시작점도 끝점도 없어요')
    return S(500, 170, b)

@fig
def f_par_def():   # 한 직선에 수직인 두 직선 → 평행선
    y = 128; b = L((14, y), (300, y), LINE, 2) + T(296, y + 18, '가', LINE, 13, 'end', 700)
    for x, n in ((96, '나'), (206, '다')):
        b += L((x, y + 14), (x, 44), BLUE, 2.4) + L((x, 44), (x, 10), BLUE, 2.4, '3 5') + RA((x, y), 0, 90, 10) + T(x - 8, 58, n, BLUE, 13, 'end', 700)
    b += AR((118, 28), (184, 28), ORG) + AR((184, 28), (118, 28), ORG) + T(151, 20, '늘여도 안 만나요', ORG, 11.5)
    b += T(151, 92, '평행선', ORG, 15, 'middle', 700)
    b += T(330, 70, '직선 나와 직선 다는', LINE, 12.5, 'start') + T(330, 88, '서로 평행해요', ORG, 12.5, 'start', 700)
    return S(470, 156, b)

@fig
def f_par_slant():   # 비스듬한 직선 가에 수직인 두 직선 — 늘여도 만나지 않음
    A = (24, 140); b = L(add(A, 15, -10), add(A, 15, 330), LINE, 2) + T(add(A, 15, 330)[0] - 4, add(A, 15, 330)[1] + 18, '가', LINE, 13, 'end', 700)
    for t, n in ((90, '나'), (210, '다')):
        p = add(A, 15, t)
        b += L(add(p, 105, -14), add(p, 105, 74), BLUE, 2.4) + L(add(p, 105, 74), add(p, 105, 118), BLUE, 2.4, '3 5')
        b += RA(p, 15, 105, 10) + T(add(p, 105, 96)[0] - 10, add(p, 105, 96)[1], n, BLUE, 13, 'end', 700)
    b += T(240, 122, '두 직선 모두 직선 가에 수직', LINE, 12.5, 'start')
    b += T(240, 142, '→ 길게 늘여도 만나지 않아요 → 평행', ORG, 12.5, 'start', 700)
    return S(470, 156, b)

@fig
def f_short_seg():   # 짧은 선분: 늘이면 만나는 것 / 늘여도 안 만나는 것
    b = L((30, 40), (110, 52), BLUE, 2.8) + L((30, 100), (110, 88), BLUE, 2.8)
    b += L((110, 52), (230, 70), BLUE, 1.6, '5 4') + L((110, 88), (230, 70), BLUE, 1.6, '5 4') + D((230, 70), RED, 4.5)
    b += T(236, 60, '만나요', RED, 12, 'start', 700) + cap(130, 134, '지금은 안 만나도 늘이면 만나요') + T(130, 152, '→ 평행이 아니에요', RED, 12.5, 'middle', 700)
    b += L((330, 46), (400, 46), BLUE, 2.8) + L((330, 94), (400, 94), BLUE, 2.8)
    for y in (46, 94): b += L((290, y), (330, y), BLUE, 1.6, '5 4') + L((400, y), (450, y), BLUE, 1.6, '5 4')
    b += cap(370, 134, '늘여도 안 만나요') + T(370, 152, '→ 평행', GRN, 12.5, 'middle', 700)
    return S(470, 162, b)

@fig
def f_rect_par():   # 직사각형: 위·아래 변이 둘 다 옆 변에 수직 → 평행
    R = [(70, 28), (260, 28), (260, 128), (70, 128)]
    b = P(R, FILL, '#9aa3b2', 1.4) + sides(R, [ORG, BLUE, ORG, BLUE], 3.4) + rect_ra(R)
    b += T(165, 20, '위쪽 변', ORG, 12, 'middle', 700) + T(165, 146, '아래쪽 변', ORG, 12, 'middle', 700)
    b += T(62, 82, '왼쪽 변', BLUE, 12, 'end', 700) + T(268, 82, '오른쪽 변', BLUE, 12, 'start', 700)
    b += T(350, 56, '위·아래 변은 둘 다', LINE, 12.5, 'start') + T(350, 72, '옆 변에 수직 → 평행', ORG, 12.5, 'start', 700)
    b += T(350, 100, '왼쪽·오른쪽 변도', LINE, 12.5, 'start') + T(350, 116, '같은 까닭으로 평행', BLUE, 12.5, 'start', 700)
    return S(490, 156, b)

# ───────── 4-03 평행선 사이의 거리 ─────────
@fig
def f_dist_how():   # ① 삼각자로 수직인 선분 긋기 ② 길이 재기 (95쪽)
    b = L((10, 40), (200, 40), LINE, 2) + L((10, 120), (200, 120), LINE, 2)
    Q = (86, 120); b += setsq(Q, 0, 90, 64, 86) + L(Q, (86, 40), ORG, 2.6) + RA(Q, 0, 90, 9)
    b += cap(105, 150, '① 삼각자로 수직인 선분 긋기')
    b += L((240, 40), (430, 40), LINE, 2) + L((240, 120), (430, 120), LINE, 2) + L((316, 40), (316, 120), ORG, 2.6) + RA((316, 120), 0, 90, 9)
    b += '<rect x="324" y="34" width="22" height="92" rx="2" fill="#fff8e6" stroke="#b7791f" stroke-width="1.2"/>'
    for k in range(9): b += L((324, 40 + k * 10), (331 if k % 2 else 336, 40 + k * 10), '#b7791f', 1)
    b += cap(335, 150, '② 수직인 선분의 길이 재기')
    return S(440, 160, b)

@fig
def f_dist_short():   # 여러 선분 중 수직인 선분이 가장 짧다
    b = L((14, 30), (386, 30), LINE, 2) + L((14, 126), (386, 126), LINE, 2); Pt = (200, 30)
    for x in (52, 116, 290, 360): b += L(Pt, (x, 126), '#a3abb8', 1.8)
    b += L(Pt, (200, 126), ORG, 3) + RA((200, 126), 0, 90, 10) + D(Pt, LINE)
    b += T(212, 84, '가장 짧아요', ORG, 12.5, 'start', 700)
    b += cap(200, 152, '평행선에 수직인 선분의 길이 = 평행선 사이의 거리')
    return S(400, 162, b)

@fig
def f_dist_same():   # 어디서 재도 4 cm
    b = L((14, 34), (386, 34), LINE, 2) + L((14, 114), (386, 114), LINE, 2)
    for x, s in ((60, '왼쪽'), (200, '가운데'), (340, '오른쪽')):
        b += L((x, 34), (x, 114), ORG, 2.6) + RA((x, 114), 0, 90, 9) + T(x + 8, 79, '4 cm', ORG, 12, 'start', 700) + cap(x, 132, s)
    b += cap(200, 156, '두 평행선 사이의 거리는 항상 같아요')
    return S(400, 166, b)

@fig
def f_dist_two():   # 직선 가에서 3 cm — 위쪽에 하나, 아래쪽에 하나 (10/19: 답 2개와 겹치지 않게 3 cm)
    b = L((14, 86), (386, 86), LINE, 2.2) + T(380, 104, '가', LINE, 13, 'end', 700)
    b += L((14, 30), (386, 30), ORG, 2, '7 5') + L((14, 142), (386, 142), ORG, 2, '7 5')
    b += L((120, 86), (120, 30), BLUE, 2.2) + RA((120, 86), 0, 90, 9) + T(128, 62, '3 cm', BLUE, 12, 'start', 700)
    b += L((270, 86), (270, 142), BLUE, 2.2) + RA((270, 86), 0, 270, 9) + T(278, 118, '3 cm', BLUE, 12, 'start', 700)
    b += T(386, 22, '위쪽에 하나', ORG, 12, 'end', 700) + T(386, 160, '아래쪽에 하나', ORG, 12, 'end', 700)
    return S(400, 168, b)

# ───────── 4-04 사다리꼴 ─────────
@fig
def f_trap_def():   # 평행한 변 1쌍 ✓ / 2쌍도 ✓ / 사각형이 아니면 ✗
    A = [(40, 30), (110, 30), (140, 110), (14, 110)]
    b = P(A) + sides(A, [ORG, None, ORG, None]) + ok(76, 76) + cap(77, 138, '평행한 변이 있는') + cap(77, 154, '사각형 → 사다리꼴')
    B = [(200, 30), (292, 30), (266, 110), (174, 110)]
    b += P(B) + sides(B, [ORG, BLUE, ORG, BLUE]) + ok(233, 76) + cap(233, 138, '두 쌍이 평행해도') + cap(233, 154, '→ 사다리꼴')
    C = [(342, 64), (388, 26), (434, 64), (434, 112), (342, 112)]
    b += P(C, '#f3f4f6', '#9aa3b2') + L(C[0], C[4], ORG, 3.2) + L(C[2], C[3], ORG, 3.2) + no(388, 86)
    b += cap(388, 138, '평행한 변이 있어도') + cap(388, 154, '사각형이 아니면 ✗')
    return S(450, 164, b)

@fig
def f_trap_sort():   # 평행한 변이 없는 사각형 / 있는 사각형으로 나누기
    b = BOX(8, 8, 196, 150, [''], '#f8fafc') + T(106, 28, '평행한 변이 없는 사각형', SUB, 12, 'middle', 700)
    b += P([(30, 66), (92, 52), (100, 128), (40, 112)], '#f3f4f6', '#9aa3b2') + P([(122, 58), (186, 76), (172, 140), (116, 116)], '#f3f4f6', '#9aa3b2')
    b += BOX(216, 8, 246, 150, [''], '#fff8ee', '#e7c27a') + T(339, 28, '평행한 변이 있는 사각형 = 사다리꼴', ORG, 12, 'middle', 700)
    t1 = [(244, 62), (288, 62), (304, 128), (232, 128)]; t2 = [(320, 52), (366, 52), (394, 128), (320, 128)]; t3 = [(412, 50), (452, 70), (452, 112), (412, 136)]
    b += P(t1) + sides(t1, [ORG, None, ORG, None]) + P(t2) + sides(t2, [ORG, None, ORG, None]) + P(t3) + sides(t3, [None, ORG, None, ORG])
    return S(470, 166, b)

@fig
def f_trap_kinds():   # 여러 모양의 사다리꼴 — 모두 평행한 변이 있다
    b = ''
    shapes = [([(36, 34), (76, 34), (106, 112), (8, 112)], [ORG, None, ORG, None], '윗변이 짧은 모양'),
              ([(130, 34), (184, 34), (214, 112), (130, 112)], [ORG, None, ORG, None], '한쪽이 기울어진 모양'),
              ([(238, 44), (322, 44), (322, 104), (238, 104)], [ORG, BLUE, ORG, BLUE], '직사각형 모양'),
              (rot((396, 74), [(378, 48), (414, 48), (436, 102), (356, 102)], 25), [ORG, None, ORG, None], '돌려 놓은 모양')]
    for k, (pts, cols, name) in enumerate(shapes):
        b += P(pts) + sides(pts, cols) + cap((58, 172, 280, 396)[k], 140, name)
    b += T(225, 164, '모두 평행한 변이 있는 사각형 → 모두 사다리꼴', ORG, 12.5, 'middle', 700)
    return S(456, 174, b)

@fig
def f_trap_incl():   # 사다리꼴 안에 평행사변형
    b = BOX(8, 8, 420, 160, [''], '#fff8ee', '#e7c27a') + T(24, 30, '사다리꼴 — 평행한 변이 있는 사각형', ORG, 12.5, 'start', 700)
    t = [(54, 66), (110, 66), (140, 140), (28, 140)]; b += P(t) + sides(t, [ORG, None, ORG, None])
    b += BOX(170, 46, 244, 112, [''], '#f0f4fc', '#9fb6e0') + T(184, 66, '평행사변형 — 두 쌍이 평행', BLUE, 12, 'start', 700)
    p = [(232, 84), (352, 84), (326, 144), (206, 144)]; b += P(p) + sides(p, [ORG, BLUE, ORG, BLUE])
    b += T(386, 122, '평행한', SUB, 11, 'middle') + T(386, 136, '변이 있다', SUB, 11, 'middle')
    return S(436, 176, b)

# ───────── 4-05 평행사변형 ─────────
@fig
def f_para_count():   # 평행한 변 0쌍 / 1쌍 / 2쌍
    a = [(28, 52), (104, 34), (122, 112), (16, 104)]
    b = P(a, '#f3f4f6', '#9aa3b2') + cap(70, 140, '0쌍') + cap(70, 156, '그냥 사각형')
    t = [(176, 40), (232, 40), (262, 112), (150, 112)]; b += P(t) + sides(t, [ORG, None, ORG, None]) + cap(206, 140, '1쌍') + cap(206, 156, '사다리꼴')
    p = [(330, 40), (430, 40), (402, 112), (302, 112)]; b += P(p) + sides(p, [ORG, BLUE, ORG, BLUE]) + cap(366, 140, '2쌍') + T(366, 156, '평행사변형', ORG, 12.5, 'middle', 700)
    return S(450, 166, b)

@fig
def f_para_prop():   # 평행사변형의 성질 3가지 — 65°, 115°
    B = (36, 132); A = add(B, 65, 110); C = (236, 132); Dd = (A[0] + 200, A[1]); R = [A, B, C, Dd]
    b = P(R) + TK(A, B, 1) + TK(Dd, C, 1) + TK(B, C, 2) + TK(A, Dd, 2)
    b += ARC(B, 0, 65, 20) + T(B[0] + 32, B[1] - 8, '65°', ORG, 12, 'start', 700)
    b += ARC(C, 65, 180, 18) + T(C[0] - 10, C[1] - 24, '115°', ORG, 12, 'end', 700)
    b += ARC(Dd, 180, 245, 20) + T(Dd[0] - 30, Dd[1] + 22, '65°', ORG, 12, 'end', 700)
    b += ARC(A, 245, 360, 18) + T(A[0] + 14, A[1] + 26, '115°', ORG, 12, 'start', 700)
    b += T(310, 52, '마주 보는 두 변의 길이가 같아요', LINE, 12, 'start') + T(310, 72, '마주 보는 두 각의 크기가 같아요', LINE, 12, 'start')
    b += T(310, 92, '이웃하는 두 각의 합 = 180°', ORG, 12, 'start', 700) + T(310, 110, '(65° + 115° = 180°)', SUB, 11.5, 'start')
    return S(500, 150, b)

@fig
def f_para_len():   # 네 변의 길이의 합 24 cm, 한 변 7 cm → 이웃하는 변 5 cm
    B = (30, 128); A = add(B, 60, 100); C = (170, 128); Dd = (A[0] + 140, A[1]); R = [A, B, C, Dd]
    b = P(R, FILL, '#9aa3b2', 1.4) + L(A, Dd, ORG, 3.6) + L(Dd, C, ORG, 3.6) + L(A, B, '#9aa3b2', 2) + L(B, C, '#9aa3b2', 2)
    b += T((A[0] + Dd[0]) / 2, A[1] - 8, '7 cm', ORG, 12, 'middle', 700) + T(100, 146, '7 cm', SUB, 12)
    b += T(Dd[0] + 6, (Dd[1] + C[1]) / 2, '5 cm', ORG, 12, 'start', 700) + T(A[0] - 30, (A[1] + B[1]) / 2 + 4, '5 cm', SUB, 12, 'end')
    b += T(268, 46, '7 + 5 + 7 + 5 = 24', LINE, 12.5, 'start') + T(268, 70, '한 변 + 이웃하는 변 = 24 ÷ 2 = 12', LINE, 12.5, 'start')
    b += T(268, 94, '이웃하는 변 = 12 − 7 = 5 (cm)', ORG, 12.5, 'start', 700) + T(268, 120, '주황 두 변 = 네 변의 길이의 합의 반', SUB, 11.5, 'start')
    return S(500, 156, b)

@fig
def f_para_angles():   # 같은 색 = 마주 보는 각 / 이웃하는 각의 합 180°
    A, B, C, Dd = (56, 34), (106, 128), (292, 128), (242, 34)
    b = P([A, B, C, Dd])
    b += ARC(A, 299, 360, 22, BLUE, 3) + ARC(C, 119, 180, 22, BLUE, 3) + ARC(B, 0, 119, 20, ORG, 3) + ARC(Dd, 180, 299, 20, ORG, 3)
    b += T(48, 30, 'ㄱ', LINE, 13, 'end', 700) + T(100, 146, 'ㄴ', LINE, 13, 'end', 700) + T(300, 146, 'ㄷ', LINE, 13, 'start', 700) + T(250, 30, 'ㄹ', LINE, 13, 'start', 700)
    b += T(328, 54, '파랑끼리(각 ㄱ, 각 ㄷ) 크기가 같아요', BLUE, 12, 'start', 700) + T(328, 74, '주황끼리(각 ㄴ, 각 ㄹ) 크기가 같아요', ORG, 12, 'start', 700)
    b += T(328, 100, '이웃하는 두 각(파랑 + 주황) = 180°', LINE, 12, 'start') + T(328, 118, '네 각의 합 360°의 반', SUB, 11.5, 'start')
    return S(556, 156, b)

# ───────── 4-06 마름모 ─────────
@fig
def f_rhom_def():   # 네 변의 길이가 모두 같은 사각형 — 각은 90°가 아니어도
    B = (24, 120); A = add(B, 70, 96); C = (120, 120); Dd = (A[0] + 96, A[1]); R = [A, B, C, Dd]
    b = P(R) + ''.join(TK(R[k], R[(k + 1) % 4]) for k in range(4)) + ARC(B, 0, 70, 18) + cap(105, 146, '기울어진 마름모')
    O = (290, 76); R2 = [(290, 14), (250, 76), (290, 138), (330, 76)]
    b += P(R2) + ''.join(TK(R2[k], R2[(k + 1) % 4]) for k in range(4)) + cap(290, 156, '세워 놓은 마름모')
    b += T(420, 64, '네 변의 길이가', LINE, 12, 'middle') + T(420, 80, '모두 같아요', ORG, 12, 'middle', 700) + T(420, 104, '각은 90°가', SUB, 11.5) + T(420, 118, '아니어도 돼요', SUB, 11.5)
    return S(480, 164, b)

@fig
def f_rhom_par():   # 마름모도 마주 보는 두 쌍의 변이 평행 → 평행사변형
    B = (24, 112); A = add(B, 40, 120); C = (144, 112); Dd = (A[0] + 120, A[1]); R = [A, B, C, Dd]
    b = P(R) + sides(R, [BLUE, ORG, BLUE, ORG]) + ''.join(TK(R[k], R[(k + 1) % 4], 1, LINE) for k in range(4))
    b += T(272, 50, '주황끼리 평행, 파랑끼리 평행', LINE, 12.5, 'start') + T(272, 72, '→ 마주 보는 두 쌍의 변이 평행', LINE, 12.5, 'start')
    b += T(272, 98, '→ 마름모는 평행사변형이에요', ORG, 12.5, 'start', 700)
    return S(500, 130, b)

@fig
def f_rhom_diag():   # 두 선분은 수직으로 만나고 서로를 똑같이 둘로 나눈다 (8 cm → 4 cm)
    O = (130, 96); a, bb = 96, 54
    A, C = add(O, 30, a), add(O, 210, a); Bp, Dd = add(O, 120, bb), add(O, 300, bb)
    b = P([A, Bp, C, Dd]) + L(A, C, ORG, 2.4) + L(Bp, Dd, BLUE, 2) + RA(O, 30, 120, 10)
    b += TK(O, A, 2, ORG) + TK(O, C, 2, ORG) + TK(O, Bp, 1, BLUE) + TK(O, Dd, 1, BLUE)
    q1 = add(add(O, 30, 48), 300, 18); q2 = add(add(O, 210, 48), 300, 18)
    b += T(q1[0], q1[1] + 4, '4 cm', ORG, 12, 'start', 700) + T(q2[0], q2[1] + 6, '4 cm', ORG, 12, 'start', 700)
    b += T(262, 62, '① 서로 수직으로 만나요 (직각)', LINE, 12.5, 'start') + T(262, 86, '② 서로를 똑같이 둘로 나눠요', LINE, 12.5, 'start')
    b += T(262, 112, '8 cm인 선분 → 4 cm + 4 cm', ORG, 12.5, 'start', 700)
    return S(490, 190, b)

@fig
def f_rhom_sq():   # 네 변이 같아도: 네 각이 직각이면 정사각형, 아니면 마름모
    S1 = [(30, 26), (120, 26), (120, 116), (30, 116)]
    b = P(S1) + ''.join(TK(S1[k], S1[(k + 1) % 4]) for k in range(4)) + rect_ra(S1)
    b += cap(75, 140, '네 각이 모두 직각') + T(75, 158, '→ 정사각형', ORG, 12.5, 'middle', 700)
    B = (184, 116); A = add(B, 62, 92); C = (276, 116); Dd = (A[0] + 92, A[1]); R = [A, B, C, Dd]
    b += P(R) + ''.join(TK(R[k], R[(k + 1) % 4]) for k in range(4)) + ARC(B, 0, 62, 18)
    b += cap(270, 140, '네 각이 직각이 아니면') + T(270, 158, '→ 마름모', BLUE, 12.5, 'middle', 700)
    b += T(400, 70, '둘 다 네 변의', SUB, 11.5) + T(400, 86, '길이가 같아요', SUB, 11.5)
    return S(450, 168, b)

@fig
def f_rhom_sum():   # 5 cm × 4 = 20 cm, 20 ÷ 4 = 5
    B = (40, 118); A = add(B, 55, 90); C = (130, 118); Dd = (A[0] + 90, A[1]); R = [A, B, C, Dd]
    b = P(R) + ''.join(TK(R[k], R[(k + 1) % 4]) for k in range(4))
    mid = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
    m = mid(A, Dd); b += T(m[0], m[1] - 8, '5 cm', ORG, 12, 'middle', 700)
    m = mid(B, C); b += T(m[0], m[1] + 20, '5 cm', ORG, 12, 'middle', 700)
    m = mid(A, B); b += T(m[0] - 10, m[1] + 4, '5 cm', ORG, 12, 'end', 700)
    m = mid(Dd, C); b += T(m[0] + 10, m[1] + 4, '5 cm', ORG, 12, 'start', 700)
    b += T(272, 56, '5 + 5 + 5 + 5 = 20', LINE, 13, 'start') + T(272, 82, '같은 길이를 4번 더한 것', SUB, 11.5, 'start')
    b += T(272, 108, '20 ÷ 4 = 5 (cm)', ORG, 13, 'start', 700)
    return S(460, 144, b)

@fig
def f_rhom_half():   # 마름모 ㄱㄴㄷㄹ, 점 ㅇ — 선분 ㄴㄹ 6 cm → 3 cm씩
    O = (170, 84); A, C = (170, 28), (170, 140); Bp, Dd = (54, 84), (286, 84)
    b = P([A, Bp, C, Dd]) + L(A, C, ORG, 2.2) + L(Bp, Dd, BLUE, 2.4) + RA(O, 0, 90, 10)
    b += TK(O, A, 2, ORG) + TK(O, C, 2, ORG)
    b += T(112, 104, '3 cm', BLUE, 12, 'middle', 700) + T(228, 104, '3 cm', BLUE, 12, 'middle', 700)
    b += T(170, 20, 'ㄱ', LINE, 13, 'middle', 700) + T(46, 89, 'ㄴ', LINE, 13, 'end', 700) + T(170, 158, 'ㄷ', LINE, 13, 'middle', 700) + T(294, 89, 'ㄹ', LINE, 13, 'start', 700) + T(160, 100, 'ㅇ', LINE, 12, 'end')
    b += T(318, 54, '선분 ㄴㄹ 6 cm', BLUE, 12.5, 'start', 700) + T(318, 74, '→ 선분 ㄴㅇ 3 cm, 선분 ㄹㅇ 3 cm', BLUE, 12, 'start')
    b += T(318, 98, '선분 ㄱㅇ = 선분 ㄷㅇ (반씩)', ORG, 12, 'start') + T(318, 122, '점 ㅇ에서 생긴 각 = 90°', LINE, 12, 'start')
    return S(540, 166, b)

# ───────── 4-07 여러 가지 사각형 ─────────
@fig
def f_rect_sq():   # 직사각형 / 정사각형
    R = [(20, 30), (176, 30), (176, 118), (20, 118)]
    b = P(R) + rect_ra(R) + cap(98, 142, '직사각형') + cap(98, 158, '네 각이 모두 직각')
    Q = [(240, 30), (328, 30), (328, 118), (240, 118)]
    b += P(Q) + rect_ra(Q) + ''.join(TK(Q[k], Q[(k + 1) % 4]) for k in range(4)) + cap(284, 142, '정사각형')
    b += cap(284, 158, '네 각이 직각 + 네 변의 길이도 같음')
    return S(400, 168, b)

@fig
def f_quad_map():   # 사각형 사이의 관계 — 정사각형은 모든 이름에 들어간다
    b = BOX(6, 6, 468, 196, [''], '#fff8ee', '#e7c27a') + T(20, 26, '사다리꼴 (평행한 변이 있다)', ORG, 12.5, 'start', 700)
    b += BOX(28, 38, 424, 156, [''], '#f0f4fc', '#9fb6e0') + T(42, 58, '평행사변형 (두 쌍이 평행)', BLUE, 12.5, 'start', 700)
    b += '<rect x="52" y="72" width="236" height="110" rx="12" fill="#ecfdf3" fill-opacity=".7" stroke="#6fbf8b" stroke-width="1.6"/>'
    b += '<rect x="192" y="72" width="236" height="110" rx="12" fill="#f5efff" fill-opacity=".6" stroke="#9b85d6" stroke-width="1.6"/>'
    b += T(66, 92, '마름모', GRN, 12.5, 'start', 700) + T(66, 108, '네 변이 같다', SUB, 11, 'start')
    b += T(414, 92, '직사각형', '#6d3fd0', 12.5, 'end', 700) + T(414, 108, '네 각이 직각', SUB, 11, 'end')
    q = [(222, 118), (258, 118), (258, 154), (222, 154)]; b += P(q, '#ffffff', ORG, 2) + rect_ra(q)
    b += T(240, 174, '정사각형', ORG, 12.5, 'middle', 700)
    return S(480, 208, b)

@fig
def f_rect_is_para():   # 직사각형(돌려 놓음)도 마주 보는 두 쌍의 변이 평행
    R = rot((120, 82), [(40, 46), (200, 46), (200, 118), (40, 118)], 18)
    b = P(R) + sides(R, [ORG, BLUE, ORG, BLUE]) + rect_ra(R)
    b += T(262, 52, '주황끼리 평행, 파랑끼리 평행', LINE, 12.5, 'start') + T(262, 76, '→ 평행사변형의 뜻에 맞아요', LINE, 12.5, 'start')
    b += T(262, 102, '→ 직사각형은 평행사변형', ORG, 12.5, 'start', 700)
    return S(480, 160, b)

@fig
def f_sq_rect():   # 정사각형 → 직사각형 ✓ / 9 cm × 6 cm 직사각형 → 정사각형 ✗
    Q = [(24, 30), (114, 30), (114, 120), (24, 120)]
    b = P(Q) + rect_ra(Q) + ''.join(TK(Q[k], Q[(k + 1) % 4]) for k in range(4)) + ok(69, 80)
    b += cap(69, 144, '정사각형은') + T(69, 162, '직사각형이에요', GRN, 12.5, 'middle', 700)
    R = [(176, 30), (311, 30), (311, 120), (176, 120)]
    b += P(R) + rect_ra(R) + no(243, 80) + T(243, 22, '9 cm', SUB, 12) + T(320, 80, '6 cm', SUB, 12, 'start')
    b += cap(250, 144, '이 직사각형은') + T(250, 162, '정사각형이 아니에요', RED, 12.5, 'middle', 700)
    return S(380, 172, b)

@fig
def f_sq_both():   # 마름모의 뜻 + 직사각형의 뜻 = 정사각형
    B = (14, 112); A = add(B, 60, 84); C = (98, 112); Dd = (A[0] + 84, A[1]); R = [A, B, C, Dd]
    b = P(R) + ''.join(TK(R[k], R[(k + 1) % 4]) for k in range(4)) + cap(96, 138, '네 변의 길이가 같다') + cap(96, 154, '(마름모)')
    b += T(196, 82, '+', LINE, 22, 'middle', 700)
    Q = [(220, 44), (334, 44), (334, 112), (220, 112)]; b += P(Q) + rect_ra(Q) + cap(277, 138, '네 각이 직각') + cap(277, 154, '(직사각형)')
    b += T(358, 82, '=', LINE, 22, 'middle', 700)
    Z = [(382, 40), (454, 40), (454, 112), (382, 112)]; b += P(Z, PALE, ORG) + rect_ra(Z) + ''.join(TK(Z[k], Z[(k + 1) % 4], 1, ORG) for k in range(4))
    b += T(418, 138, '정사각형', ORG, 13, 'middle', 700)
    return S(470, 162, b)

@fig
def f_name_flow():   # 사각형 이름 정하는 차례
    b = BOX(6, 70, 104, 54, ['① 평행한 변이', '몇 쌍이야?'], '#f8fafc', '#cbd2dc', LINE, 12)
    b += AR((110, 84), (138, 52)) + AR((110, 110), (138, 142)) + AR((110, 97), (138, 97))
    b += BOX(140, 128, 104, 32, ['없음 → 사각형'], '#f3f4f6', '#cbd2dc', SUB, 11.5)
    b += BOX(140, 82, 104, 32, ['한 쌍 → 사다리꼴'], '#fff8ee', '#e7c27a', ORG, 11.5)
    b += BOX(140, 30, 104, 40, ['두 쌍 →', '평행사변형'], '#f0f4fc', '#9fb6e0', BLUE, 11.5)
    b += AR((244, 44), (270, 28)) + AR((244, 56), (270, 70))
    b += BOX(272, 8, 120, 34, ['② 네 변이 같나?'], '#f8fafc', '#cbd2dc', LINE, 11.5) + BOX(272, 56, 120, 34, ['③ 네 각이 직각?'], '#f8fafc', '#cbd2dc', LINE, 11.5)
    b += AR((392, 25), (412, 25)) + AR((392, 73), (412, 73))
    b += BOX(414, 8, 120, 34, ['같으면 마름모'], '#ecfdf3', '#6fbf8b', GRN, 11.5) + BOX(414, 56, 120, 34, ['직각이면 직사각형'], '#f5efff', '#9b85d6', '#6d3fd0', 11.5)
    b += BOX(300, 108, 234, 36, ['둘 다 맞으면 → 정사각형'], PALE, ORG, ORG, 12.5, True)
    b += L((474, 90), (474, 108), SUB, 1.4, '3 3') + L((474, 42), (474, 56), SUB, 1.4, '3 3')
    return S(540, 166, b)

LFIG = {
    '4-01': ['f_fold', 'f_perp_def', 'f_perp_line', 'f_four90', 'f_many_perp'],
    '4-02': ['f_line_kinds', 'f_par_def', 'f_par_slant', 'f_short_seg', 'f_rect_par'],
    '4-03': ['f_dist_how', 'f_dist_short', 'f_dist_same', 'f_dist_two'],
    '4-04': ['f_trap_def', 'f_trap_sort', 'f_trap_kinds', 'f_trap_incl'],
    '4-05': ['f_para_count', 'f_para_prop', 'f_para_len', 'f_para_angles'],
    '4-06': ['f_rhom_def', 'f_rhom_par', 'f_rhom_diag', 'f_rhom_sq', 'f_rhom_sum', 'f_rhom_half'],
    '4-07': ['f_rect_sq', 'f_quad_map', 'f_rect_is_para', 'f_sq_rect', 'f_sq_both', 'f_name_flow'],
}
def a4_dist():   # 다시 묻기: ①이 평행선에 수직
    b = L((20, 36), (300, 36), LINE, 2) + L((20, 126), (300, 126), LINE, 2)
    b += L((70, 36), (70, 126), BLUE, 2.2) + L((150, 36), (190, 126), BLUE, 2.2) + L((270, 36), (226, 126), BLUE, 2.2)
    b += T(82, 90, '①', ORG, 13, 'middle', 700) + T(186, 90, '②', ORG, 13, 'middle', 700) + T(262, 90, '③', ORG, 13, 'middle', 700)
    return S(320, 146, b)
def a4_quads():   # 다시 묻기: ②, ④가 사다리꼴
    b = P([(20, 40), (96, 26), (110, 100), (36, 92)], '#f3f4f6', BLUE) + T(64, 124, '①', ORG, 13, 'middle', 700)
    b += P([(146, 30), (196, 30), (222, 100), (130, 100)]) + T(176, 124, '②', ORG, 13, 'middle', 700)
    b += P([(290, 20), (322, 60), (290, 104), (258, 60)], '#f3f4f6', BLUE) + T(290, 124, '③', ORG, 13, 'middle', 700)
    b += P([(360, 30), (410, 52), (410, 96), (360, 110)]) + T(386, 124, '④', ORG, 13, 'middle', 700)
    return S(430, 134, b)
AFIG = {('4-03', 1): a4_dist, ('4-04', 1): a4_quads}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_4단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
