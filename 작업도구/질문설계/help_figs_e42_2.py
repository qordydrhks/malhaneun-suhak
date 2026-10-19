# -*- coding: utf-8 -*-
"""초4-2 2단원(삼각형) '긴 설명' 그림 — 규칙은 help_figs_e42_4.py 머리말과 같다. 각은 실제 크기대로 그린다.
   그림만 보기: python -X utf8 help_figs_e42_2.py → 그림_긴설명_초4-2_2단원.html
"""
import math
from help_figs_e42_4 import S, T, L, P, D, AR, BOX, ok, no, cap, TK, ARC, RA, ang, add, LINE, BLUE, ORG, GRN, RED, SUB, FILL, PALE, e

PUR = '#6d3fd0'

def tri(B, base, angB, angC):
    """밑변 왼쪽 끝 B, 길이 base, 밑각 angB(왼쪽)·angC(오른쪽) → (A, B, C). A 는 위쪽 꼭짓점."""
    C = (B[0] + base, B[1]); angA = 180 - angB - angC
    ab = base * math.sin(math.radians(angC)) / math.sin(math.radians(angA))
    return add(B, angB, ab), B, C

def AN(V, P1, P2, text=None, r=20, col=ORG, sz=12, off=14, w=2):
    """꼭짓점 V 의 안쪽 각(P1, P2 사이)에 호 + 글자."""
    a1, a2 = ang(V, P1), ang(V, P2)
    if (a2 - a1) % 360 > 180: a1, a2 = a2, a1
    o = ARC(V, a1, a1 + (a2 - a1) % 360, r, col, w)
    if text:
        mid = a1 + ((a2 - a1) % 360) / 2; p = add(V, mid, r + off)
        o += T(p[0], p[1] + 4, text, col, sz, 'middle', 700)
    return o

def NM(p, s, dx=0, dy=0, c=LINE): return T(p[0] + dx, p[1] + dy, s, c, 13, 'middle', 700)

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 2-01 ─────────
@fig
def f2_tri_parts():
    A, B, C = (120, 22), (40, 132), (210, 132)
    b = P([A, B, C]) + ''.join(D(p, ORG, 5) for p in (A, B, C))
    b += T(126, 18, '꼭짓점', ORG, 12, 'start', 700) + T(214, 146, '꼭짓점', ORG, 12, 'start', 700) + T(36, 146, '꼭짓점', ORG, 12, 'end', 700)
    b += T(125, 152, '변', BLUE, 13, 'middle', 700) + T(64, 74, '변', BLUE, 13, 'middle', 700) + T(180, 74, '변', BLUE, 13, 'middle', 700)
    b += T(290, 62, '선분 3개로 둘러싸인 도형', LINE, 12.5, 'start') + T(290, 84, '변 3개 · 꼭짓점 3개', ORG, 12.5, 'start', 700)
    return S(470, 164, b)

@fig
def f2_side_kinds():
    t1 = [(80, 18), (40, 120), (120, 120)]; t2 = [(240, 30), (190, 120), (290, 120)]; t3 = [(390, 40), (360, 120), (480, 120)]
    b = P(t1) + TK(t1[0], t1[1], 1, ORG) + TK(t1[0], t1[2], 1, ORG) + cap(80, 142, '두 변의 길이가 같아요') + T(80, 160, '이등변삼각형', ORG, 12.5, 'middle', 700)
    b += P(t2) + TK(t2[0], t2[1], 2, ORG) + TK(t2[0], t2[2], 2, ORG) + TK(t2[1], t2[2], 2, ORG) + cap(240, 142, '세 변의 길이가 같아요') + T(240, 160, '정삼각형', ORG, 12.5, 'middle', 700)
    b += P(t3, '#f3f4f6', '#9aa3b2') + cap(420, 142, '세 변의 길이가') + cap(420, 160, '모두 다른 삼각형')
    return S(500, 170, b)

@fig
def f2_eq_is_iso():
    A, B, C = tri((50, 130), 120, 60, 60)
    b = P([A, B, C]) + TK(A, B, 1, ORG) + TK(A, C, 1, ORG) + TK(B, C, 1, ORG)
    b += cap(112, 152, '어느 두 변을 골라도 길이가 같아요')
    b += '<rect x="214" y="14" width="236" height="132" rx="12" fill="#fff8ee" stroke="#e7c27a" stroke-width="1.4"/>' + T(228, 36, '이등변삼각형', ORG, 12.5, 'start', 700)
    b += '<rect x="250" y="56" width="160" height="72" rx="10" fill="#f0f4fc" stroke="#9fb6e0" stroke-width="1.4"/>' + T(330, 96, '정삼각형', BLUE, 13, 'middle', 700)
    return S(460, 162, b)

@fig
def f2_iso_sum():
    A, B, C = tri((40, 130), 120, 64.6, 64.6)   # 7 cm · 7 cm · 6 cm 비율
    b = P([A, B, C]) + TK(A, B, 1, ORG) + TK(A, C, 1, ORG)
    b += T((A[0] + B[0]) / 2 - 14, (A[1] + B[1]) / 2, '7 cm', ORG, 12, 'end', 700) + T((A[0] + C[0]) / 2 + 14, (A[1] + C[1]) / 2, '7 cm', ORG, 12, 'start', 700)
    b += T(100, 150, '□', RED, 15, 'middle', 700)
    b += T(250, 50, '세 변의 길이의 합 20 cm', LINE, 12.5, 'start') + T(250, 74, '7 + 7 + □ = 20', LINE, 12.5, 'start') + T(250, 98, '□ = 20 − 14 = 6 (cm)', ORG, 12.5, 'start', 700)
    return S(460, 162, b)

@fig
def f2_eq_div():
    A, B, C = tri((40, 132), 120, 60, 60)
    b = P([A, B, C]) + TK(A, B, 1, ORG) + TK(A, C, 1, ORG) + TK(B, C, 1, ORG)
    b += T((A[0] + B[0]) / 2 - 12, (A[1] + B[1]) / 2, '5 cm', ORG, 12, 'end', 700) + T((A[0] + C[0]) / 2 + 12, (A[1] + C[1]) / 2, '5 cm', ORG, 12, 'start', 700) + T(100, 152, '5 cm', ORG, 12, 'middle', 700)
    b += T(250, 66, '5 + 5 + 5 = 15', LINE, 13, 'start') + T(250, 92, '15 ÷ 3 = 5 (cm)', ORG, 13, 'start', 700)
    return S(420, 164, b)

# ───────── 2-02 ─────────
@fig
def f2_iso_angles():
    A, B, C = tri((50, 140), 170, 52, 52)
    b = P([A, B, C]) + TK(A, B, 1, BLUE) + TK(A, C, 1, BLUE) + AN(B, C, A, None, 24, ORG, w=3) + AN(C, A, B, None, 24, ORG, w=3)
    b += T(270, 70, '길이가 같은 두 변(빗금)에 있는', LINE, 12.5, 'start') + T(270, 92, '두 각(주황)의 크기가 같아요', ORG, 12.5, 'start', 700)
    return S(500, 156, b)

@fig
def f2_fold_cut():
    b = P([(20, 30), (90, 30), (90, 130), (20, 130)], '#fdf6ec', '#c9a36b', 1.4) + L((55, 26), (55, 134), ORG, 1.4, '5 4') + cap(55, 152, '① 반으로 접기')
    b += AR((104, 80), (128, 80))
    b += P([(150, 30), (185, 30), (185, 130), (150, 130)], '#fdf6ec', '#c9a36b', 1.4) + L((185, 30), (150, 130), RED, 1.8, '5 3') + cap(168, 152, '② 비스듬히 자르기')
    b += AR((212, 80), (236, 80))
    A, B, C = (305, 30), (255, 130), (355, 130)
    b += P([A, B, C], '#fdf0dc', '#c9a36b', 1.6) + L(A, (305, 130), ORG, 1.4, '5 4') + AN(B, C, A, None, 18, ORG, w=3) + AN(C, A, B, None, 18, ORG, w=3)
    b += cap(305, 152, '③ 펼치면 이등변삼각형')
    b += T(392, 60, '접어서 겹쳐진 부분의', LINE, 12, 'start') + T(392, 80, '변의 길이와 각의 크기는', LINE, 12, 'start') + T(392, 100, '같아요', ORG, 12.5, 'start', 700)
    return S(540, 162, b)

@fig
def f2_grid_mid():
    g = 26; ox, oy = 20, 14; b = ''
    for i in range(7): b += L((ox + i * g, oy), (ox + i * g, oy + 6 * g), '#dfe3ea', 1)
    for j in range(7): b += L((ox, oy + j * g), (ox + 6 * g, oy + j * g), '#dfe3ea', 1)
    Pp = lambda c, r: (ox + c * g, oy + r * g)
    Bn, Cn, M, A = Pp(1, 5), Pp(5, 5), Pp(3, 5), Pp(3, 1)
    b += L(M, A, RED, 1.6, '5 4') + RA(M, 0, 90, 8, RED) + L(Bn, Cn, BLUE, 2.6) + L(Bn, A, ORG, 2.2) + L(Cn, A, ORG, 2.2)
    b += TK(Bn, A, 1, ORG) + TK(Cn, A, 1, ORG) + TK(Bn, M, 2, BLUE) + TK(M, Cn, 2, BLUE)
    b += NM(Bn, 'ㄴ', 0, 20) + NM(Cn, 'ㄷ', 0, 20) + D(A, ORG, 4.5)
    b += T(200, 60, '선분 ㄴㄷ의 한가운데에서', LINE, 12.5, 'start') + T(200, 80, '바로 위로 올라간 점', LINE, 12.5, 'start') + T(200, 104, '→ ㄴ까지, ㄷ까지 길이가 같아요', ORG, 12.5, 'start', 700)
    return S(440, 186, b)

@fig
def f2_apex40():
    A, B, C = tri((40, 172), 110, 70, 70)
    b = P([A, B, C]) + TK(A, B, 1, BLUE) + TK(A, C, 1, BLUE) + AN(A, B, C, '40°', 22, RED, 12, 12) + AN(B, C, A, '70°', 22, ORG, 12, 14) + AN(C, A, B, '70°', 22, ORG, 12, 14)
    b += T(230, 86, '180° − 40° = 140°', LINE, 13, 'start') + T(230, 112, '140° ÷ 2 = 70°씩', ORG, 13, 'start', 700)
    return S(420, 190, b)

@fig
def f2_base65():
    A, B, C = tri((40, 140), 150, 65, 65)
    b = P([A, B, C]) + TK(A, B, 1, BLUE) + TK(A, C, 1, BLUE) + AN(B, C, A, '65°', 22, ORG, 12, 14) + AN(C, A, B, '65°', 22, ORG, 12, 14) + AN(A, B, C, '50°', 20, RED, 12, 12)
    b += T(240, 56, '같은 두 변에 있는 두 각 → 65°, 65°', ORG, 12.5, 'start', 700) + T(240, 84, '남은 각 = 180° − 65° − 65° = 50°', LINE, 12.5, 'start')
    return S(480, 156, b)

# ───────── 2-03 ─────────
@fig
def f2_eq_folds():
    A, B, C = tri((40, 150), 160, 60, 60)
    mid = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
    b = P([A, B, C], '#fdf0dc', '#c9a36b', 1.8)
    for v, (p, q) in ((A, (B, C)), (B, (A, C)), (C, (A, B))): b += L(v, mid(p, q), ORG, 1.3, '5 4')
    b += AN(A, B, C, '60°', 20, ORG, 11.5, 12) + AN(B, C, A, '60°', 20, ORG, 11.5, 12) + AN(C, A, B, '60°', 20, ORG, 11.5, 12)
    b += T(230, 60, '세 방향으로 접었다 펼치면', LINE, 12.5, 'start') + T(230, 82, '세 각이 모두 같아요', ORG, 12.5, 'start', 700) + T(230, 108, '180° ÷ 3 = 60°', ORG, 13, 'start', 700)
    return S(440, 168, b)

@fig
def f2_angle_sum_line():
    O = (150, 120); b = L((30, 120), (270, 120), LINE, 2)
    cols = ['#f4a3a3', '#9cc3ef', '#9fd48a']
    for k, c in enumerate(cols):
        a1, a2 = k * 60, (k + 1) * 60; p1, p2 = add(O, a1, 90), add(O, a2, 90)
        b += '<path d="M%.1f %.1f L%.1f %.1f A90 90 0 0 0 %.1f %.1f Z" fill="%s" fill-opacity=".75" stroke="#fff" stroke-width="2"/>' % (O + p1 + p2 + (c,))
        m = add(O, a1 + 30, 58); b += T(m[0], m[1] + 4, '60°', LINE, 12, 'middle', 700)
    b += T(150, 146, '세 각을 모으면 직선 → 180°', LINE, 12.5, 'middle', 700)
    b += T(300, 60, '정삼각형은 세 각이 같아요', LINE, 12.5, 'start') + T(300, 84, '180° ÷ 3 = 60°', ORG, 13, 'start', 700)
    return S(470, 156, b)

@fig
def f2_compass_steps():
    b = ''
    xs = [16, 136, 256, 376]; r = 40
    for k, x in enumerate(xs):
        A, Bp = (x + 30, 92), (x + 70, 92)
        b += L(A, Bp, LINE, 2.2) + D(A) + D(Bp)
        if k >= 1: b += '<circle cx="%.1f" cy="%.1f" r="%d" fill="none" stroke="%s" stroke-width="1.4"/>' % (A[0], A[1], r, BLUE if k == 1 else '#9fb6e0')
        if k >= 2: b += '<circle cx="%.1f" cy="%.1f" r="%d" fill="none" stroke="%s" stroke-width="1.4"/>' % (Bp[0], Bp[1], r, GRN if k == 2 else '#a9d6b4')
        if k == 3:
            Cp = (x + 50, 92 - r * math.sqrt(3) / 2); b += P([A, Bp, Cp], 'none', ORG, 2.2) + D(Cp, ORG, 4)
    for k, (s1, s2) in enumerate((('① 선분을', '그어요'), ('② 선분을 반지름으로', '원을 그려요'), ('③ 같은 반지름으로', '다른 원을 그려요'), ('④ 만나는 점과', '중심을 이어요'))):
        b += cap(xs[k] + 50, 152, s1, SUB, 11.5) + cap(xs[k] + 50, 168, s2, SUB, 11.5)
    return S(500, 176, b)

@fig
def f2_radius():
    A, Bp = (140, 120), (220, 120); r = 80; Cp = (180, 120 - r * math.sqrt(3) / 2)
    b = '<circle cx="140" cy="120" r="80" fill="none" stroke="%s" stroke-width="1.6"/>' % BLUE + '<circle cx="220" cy="120" r="80" fill="none" stroke="%s" stroke-width="1.6"/>' % GRN
    b += L(A, Bp, LINE, 2.6) + L(A, Cp, BLUE, 3) + L(Bp, Cp, GRN, 3) + ''.join(D(p) for p in (A, Bp, Cp))
    b += NM(A, 'ㄱ', -10, 18) + NM(Bp, 'ㄴ', 10, 18) + NM(Cp, 'ㄷ', 0, -10)
    b += T(330, 60, '파란 원(중심 ㄱ)의 반지름:', BLUE, 12, 'start', 700) + T(330, 78, '선분 ㄱㄴ = 선분 ㄱㄷ', BLUE, 12, 'start')
    b += T(330, 106, '초록 원(중심 ㄴ)의 반지름:', GRN, 12, 'start', 700) + T(330, 124, '선분 ㄴㄱ = 선분 ㄴㄷ', GRN, 12, 'start')
    b += T(330, 152, '→ 세 변의 길이가 같아요', ORG, 12.5, 'start', 700)
    return S(510, 210, b)

@fig
def f2_iso60_cases():
    A, B, C = tri((20, 130), 110, 60, 60)
    b = P([A, B, C]) + TK(A, B, 1, BLUE) + TK(A, C, 1, BLUE) + AN(B, C, A, '60°', 18, RED, 11, 12) + AN(C, A, B, '60°', 18, ORG, 11, 12) + AN(A, B, C, '60°', 18, ORG, 11, 12)
    b += cap(75, 152, '60°가 밑의 각일 때')
    A2, B2, C2 = tri((200, 130), 110, 60, 60)
    b += P([A2, B2, C2]) + TK(A2, B2, 1, BLUE) + TK(A2, C2, 1, BLUE) + AN(A2, B2, C2, '60°', 18, RED, 11, 12) + AN(B2, C2, A2, '60°', 18, ORG, 11, 12) + AN(C2, A2, B2, '60°', 18, ORG, 11, 12)
    b += cap(255, 152, '60°가 위의 각일 때')
    b += T(350, 70, '어느 경우든', LINE, 12.5, 'start') + T(350, 92, '세 각 모두 60°', ORG, 12.5, 'start', 700) + T(350, 114, '→ 정삼각형', ORG, 12.5, 'start', 700)
    return S(470, 162, b)

# ───────── 2-04 ─────────
@fig
def f2_angle_kinds():
    b = ''
    for k, (a, name, col) in enumerate(((50, '예각', GRN), (90, '직각', LINE), (130, '둔각', PUR))):
        O = (40 + k * 140, 100)
        b += L(O, add(O, 0, 90), LINE, 2) + L(O, add(O, a, 80), LINE, 2)
        b += RA(O, 0, 90, 11) if a == 90 else ARC(O, 0, a, 22, col, 2.2)
        b += T(O[0] + 45, 128, name, col, 13, 'middle', 700) + T(O[0] + 45, 146, '%d°' % a, SUB, 11.5)
    b += T(232, 172, '0° < 예각 < 90°(직각) < 둔각 < 180°', ORG, 12.5, 'middle', 700)
    return S(450, 184, b)

@fig
def f2_tri_angle_kinds():
    t1 = tri((14, 120), 120, 65, 55); t2 = tri((160, 120), 120, 90, 38); t3 = tri((300, 120), 150, 25, 30)
    b = P(list(t1)) + AN(t1[0], t1[1], t1[2], None, 16, GRN, w=2.4) + AN(t1[1], t1[2], t1[0], None, 16, GRN, w=2.4) + AN(t1[2], t1[0], t1[1], None, 16, GRN, w=2.4)
    b += cap(74, 142, '세 각이 모두 예각') + T(74, 160, '예각삼각형', GRN, 12.5, 'middle', 700)
    b += P(list(t2)) + RA(t2[1], 0, 90, 11) + cap(220, 142, '한 각이 직각') + T(220, 160, '직각삼각형', LINE, 12.5, 'middle', 700)
    b += P(list(t3)) + AN(t3[0], t3[1], t3[2], None, 14, PUR, w=2.6) + cap(375, 142, '한 각이 둔각') + T(375, 160, '둔각삼각형', PUR, 12.5, 'middle', 700)
    return S(460, 170, b)

@fig
def f2_406080():
    A, B, C = tri((40, 140), 200, 80, 60)   # 꼭짓점 A 40°
    b = P([A, B, C]) + AN(A, B, C, '40°', 22, GRN, 12, 12) + AN(B, C, A, '80°', 22, GRN, 12, 14) + AN(C, A, B, '60°', 22, GRN, 12, 14)
    b += T(270, 58, '40°, 60°, 80° 모두 90°보다 작아요', LINE, 12.5, 'start') + T(270, 82, '→ 세 각이 모두 예각', GRN, 12.5, 'start', 700) + T(270, 106, '→ 예각삼각형', GRN, 12.5, 'start', 700)
    return S(520, 156, b)

@fig
def f2_two_obtuse():
    O = (150, 130); b = L((40, 130), (260, 130), LINE, 2) + ARC(O, 0, 180, 70, '#c7cdd8', 1.4) + T(150, 50, '180°', SUB, 11.5)
    p1 = add(O, 100, 96)
    b += '<path d="M%.1f %.1f L%.1f %.1f A60 60 0 0 0 %.1f %.1f Z" fill="#c7b8f0" fill-opacity=".8" stroke="%s" stroke-width="1.4"/>' % (O + add(O, 0, 60) + add(O, 100, 60) + (PUR,))
    b += '<path d="M%.1f %.1f L%.1f %.1f A44 44 0 0 1 %.1f %.1f Z" fill="#f4a3a3" fill-opacity=".8" stroke="%s" stroke-width="1.4"/>' % (O + add(O, 180, 44) + add(O, 85, 44) + (RED,))
    b += T(196, 104, '100°', PUR, 12, 'middle', 700) + T(112, 116, '95°', RED, 12, 'middle', 700) + T(150, 66, '겹쳐요', RED, 11, 'end', 700)
    b += T(300, 66, '둔각 두 개: 100° + 95° = 195°', LINE, 12.5, 'start') + T(300, 90, '이미 180°를 넘어요', RED, 12.5, 'start', 700) + T(300, 114, '→ 삼각형이 될 수 없어요', RED, 12.5, 'start', 700)
    return S(510, 150, b)

@fig
def f2_3545():
    A, B, C = tri((30, 130), 230, 35, 45)
    b = P([A, B, C]) + AN(B, C, A, '35°', 30, GRN, 12, 16) + AN(C, A, B, '45°', 26, GRN, 12, 16) + AN(A, B, C, '?', 16, PUR, 14, 12, 3)
    b += T(300, 54, '? = 180° − 35° − 45°', LINE, 12.5, 'start') + T(300, 78, '= 100° → 둔각', PUR, 12.5, 'start', 700) + T(300, 102, '→ 둔각삼각형', PUR, 12.5, 'start', 700)
    return S(480, 146, b)

@fig
def f2_two_acute():
    t1 = tri((14, 120), 120, 65, 55); t2 = tri((160, 120), 120, 90, 38); t3 = tri((300, 120), 150, 25, 30)
    b = ''
    for t, k3, third, name in ((t1, 0, GRN, '예각삼각형'), (t2, 1, LINE, '직각삼각형'), (t3, 0, PUR, '둔각삼각형')):
        V = list(t); b += P(V, FILL)
        for k in range(3):
            o1, o2 = V[(k + 1) % 3], V[(k + 2) % 3]
            if k == k3: b += RA(V[k], ang(V[k], o1), ang(V[k], o2), 11, LINE) if t is t2 else AN(V[k], o1, o2, None, 14, third, w=3)
            else: b += AN(V[k], o1, o2, None, 16, GRN, w=3)
        b += T((V[1][0] + V[2][0]) / 2, 146, name, third, 12.5, 'middle', 700)
    b += T(232, 168, '초록 두 각은 셋 다 예각 → 남은 한 각을 봐야 해요', ORG, 12.5, 'middle', 700)
    return S(470, 178, b)

# ───────── 2-05 ─────────
@fig
def f2_table():
    x0, y0, cw, rh, hw = 10, 10, 104, 46, 130
    b = '<rect x="%d" y="%d" width="%d" height="%d" fill="#fff" stroke="#cbd2dc" stroke-width="1.2"/>' % (x0, y0, hw + 3 * cw, 34 + 3 * rh)
    for k, s in enumerate(['예각삼각형', '직각삼각형', '둔각삼각형']):
        b += '<rect x="%d" y="%d" width="%d" height="34" fill="#f0f4fc" stroke="#cbd2dc"/>' % (x0 + hw + k * cw, y0, cw) + T(x0 + hw + k * cw + cw / 2, y0 + 22, s, BLUE, 12, 'middle', 700)
    for j, s in enumerate(['이등변삼각형', '정삼각형', '세 변이 모두 다른']):
        b += '<rect x="%d" y="%d" width="%d" height="%d" fill="#fff8ee" stroke="#cbd2dc"/>' % (x0, y0 + 34 + j * rh, hw, rh) + T(x0 + hw / 2, y0 + 34 + j * rh + 28, s, ORG, 12, 'middle', 700)
    def mini(cx, cy, kind, iso):
        base = 44
        angs = {'a': (64, 64) if iso else (70, 50), 'r': (45, 45) if iso else (90, 35), 'o': (28, 28) if iso else (25, 35)}[kind]
        A, B, C = tri((cx - base / 2, cy + 14), base, *angs)
        o = P([A, B, C], FILL, BLUE, 1.4)
        if kind == 'r': o += RA(A if iso else B, *( (ang(A, B), ang(A, C)) if iso else (0, 90)), 6)
        return o
    for j in range(3):
        for k, kind in enumerate('aro'):
            cx, cy = x0 + hw + k * cw + cw / 2, y0 + 34 + j * rh + 16
            if j == 1 and k > 0: b += T(cx, cy + 10, '없음', '#9aa3b2', 11.5); continue
            if j == 1: A, B, C = tri((cx - 20, cy + 14), 40, 60, 60); b += P([A, B, C], FILL, BLUE, 1.4); continue
            b += mini(cx, cy, kind, j == 0)
    return S(460, 190, b)

@fig
def f2_eq_acute_row():
    A, B, C = tri((20, 130), 120, 60, 60)
    b = P([A, B, C]) + AN(A, B, C, '60°', 18, GRN, 11, 12) + AN(B, C, A, '60°', 18, GRN, 11, 12) + AN(C, A, B, '60°', 18, GRN, 11, 12)
    for k, (s, mark) in enumerate((('예각삼각형', '✓'), ('직각삼각형', '✗'), ('둔각삼각형', '✗'))):
        x = 190 + k * 92
        b += '<rect x="%d" y="54" width="88" height="56" rx="8" fill="%s" stroke="#cbd2dc"/>' % (x, '#ecfdf3' if k == 0 else '#f8fafc')
        b += T(x + 44, 76, s, LINE, 11.5, 'middle', 700) + T(x + 44, 100, mark, GRN if k == 0 else RED, 16, 'middle', 700)
    b += T(330, 136, '60°는 예각 → 정삼각형은 언제나 예각삼각형', ORG, 12.5, 'middle', 700)
    return S(480, 150, b)

@fig
def f2_right_iso():
    A, B, C = tri((40, 140), 180, 45, 45)
    b = P([A, B, C]) + TK(A, B, 1, BLUE) + TK(A, C, 1, BLUE) + RA(A, ang(A, B), ang(A, C), 12) + AN(B, C, A, '45°', 26, ORG, 12, 14) + AN(C, A, B, '45°', 26, ORG, 12, 14)
    b += T(260, 54, '두 변이 같아요 → 이등변삼각형', BLUE, 12.5, 'start', 700) + T(260, 78, '한 각이 직각 → 직각삼각형', LINE, 12.5, 'start', 700)
    b += T(260, 106, '(180° − 90°) ÷ 2 = 45°씩', ORG, 12.5, 'start', 700)
    return S(480, 156, b)

@fig
def f2_eq_no_obtuse():
    x0, x1, y = 30, 450, 70; X = lambda v: x0 + v / 180 * (x1 - x0)
    b = '<rect x="%.1f" y="%d" width="%.1f" height="22" fill="#ecfdf3"/>' % (X(0), y - 11, X(90) - X(0))
    b += '<rect x="%.1f" y="%d" width="%.1f" height="22" fill="#f3eefe"/>' % (X(90), y - 11, X(180) - X(90))
    b += L((x0, y), (x1, y), LINE, 1.6)
    for v in (0, 60, 90, 180): b += L((X(v), y - 10), (X(v), y + 10), LINE, 1.6) + T(X(v), y + 30, '%d°' % v, LINE, 12, 'middle', 700)
    b += T(X(45), y - 18, '예각', GRN, 12.5, 'middle', 700) + T(X(135), y - 18, '둔각', PUR, 12.5, 'middle', 700)
    b += D((X(60), y), ORG, 6) + T(X(60), 128, '정삼각형의 각 60°는 여기뿐', ORG, 12.5, 'middle', 700)
    b += T(X(135), 128, '둔각은 하나도 없어요', PUR, 12.5, 'middle', 700)
    return S(480, 142, b)

@fig
def f2_flow():
    b = BOX(6, 46, 92, 50, ['삼각형'], '#f8fafc', '#cbd2dc', LINE, 13, True)
    b += AR((98, 70), (118, 70))
    b += BOX(120, 6, 156, 64, ['① 길이가 같은 변?', '두 변 → 이등변', '세 변 → 정삼각형'], PALE, ORG, ORG, 11.5)
    b += BOX(120, 78, 156, 64, ['② 각의 크기?', '예각·직각·둔각', '삼각형'], '#f0f4fc', '#9fb6e0', BLUE, 11.5)
    b += AR((276, 38), (300, 60)) + AR((276, 110), (300, 82))
    b += BOX(302, 40, 166, 62, ['③ 모르는 각은', '세 각의 합 180°로'], '#ecfdf3', '#6fbf8b', GRN, 12, True)
    return S(476, 150, b)

LFIG = {
    '2-01': ['f2_tri_parts', 'f2_side_kinds', 'f2_eq_is_iso', 'f2_iso_sum', 'f2_eq_div'],
    '2-02': ['f2_iso_angles', 'f2_fold_cut', 'f2_grid_mid', 'f2_apex40', 'f2_base65'],
    '2-03': ['f2_eq_folds', 'f2_angle_sum_line', 'f2_compass_steps', 'f2_radius', 'f2_iso60_cases'],
    '2-04': ['f2_angle_kinds', 'f2_tri_angle_kinds', 'f2_406080', 'f2_two_obtuse', 'f2_3545', 'f2_two_acute'],
    '2-05': ['f2_table', 'f2_eq_acute_row', 'f2_right_iso', 'f2_eq_no_obtuse', 'f2_flow'],
}
def a2_grid():   # 다시 묻기: 선분 ㄱㄴ, ②가 한가운데 바로 위
    g = 26; ox, oy = 14, 14; b = ''
    for i in range(7): b += L((ox + i * g, oy), (ox + i * g, oy + 6 * g), '#dfe3ea', 1)
    for j in range(7): b += L((ox, oy + j * g), (ox + 6 * g, oy + j * g), '#dfe3ea', 1)
    Pp = lambda c, r: (ox + c * g, oy + r * g)
    A_, B_ = Pp(1, 5), Pp(5, 5)
    b += L(A_, B_, BLUE, 2.5) + T(A_[0], A_[1] + 18, 'ㄱ', LINE, 13, 'middle', 700) + T(B_[0], B_[1] + 18, 'ㄴ', LINE, 13, 'middle', 700)
    for (c, r), lab in (((2, 1), '①'), ((3, 2), '②'), ((5, 2), '③')):
        x, y = Pp(c, r); b += D((x, y), ORG, 4) + T(x + 12, y - 6, lab, ORG, 13, 'middle', 700)
    return S(190, 196, b)
AFIG = {('2-02', 2): a2_grid}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_2단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
