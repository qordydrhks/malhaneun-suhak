# -*- coding: utf-8 -*-
"""초4-2 6단원(다각형) '긴 설명' 그림(LFIG) + 다시 묻기 새 그림(AFIG).
   모양 조각 색은 교재 151쪽과 같게: 정삼각형 초록 · 사다리꼴 분홍 · 평행사변형 파랑 · 마름모 보라 · 정사각형 주황 · 정육각형 노랑.
   그림만 보기: python -X utf8 help_figs_e42_6.py → 그림_긴설명_초4-2_6단원.html
"""
import math
from help_figs_e42_4 import S, L, P, D, AR, BOX, ok, no, cap, TK, ARC, RA, ang, add, LINE, BLUE, ORG, GRN, RED, SUB, FILL, PALE, e
from help_figs_e42_1 import T

C_TRI = '#a8d98f'; C_TRAP = '#f4a3a8'; C_PAR = '#8ec5ef'; C_RHO = '#b9a2e0'; C_SQ = '#f6b97c'; C_HEX = '#fbd96a'; PUR = '#6d3fd0'

def REG(c, r, n, start=-90):
    return [(c[0] + r * math.cos(math.radians(start + 360 * k / n)), c[1] + r * math.sin(math.radians(start + 360 * k / n))) for k in range(n)]

def HEXV(c, s):   # 꼭짓점이 0°부터 (오른쪽 꼭짓점) — 위아래가 평평한 정육각형
    return [(c[0] + s * math.cos(math.radians(60 * k)), c[1] - s * math.sin(math.radians(60 * k))) for k in range(6)]

def PB(pts, fill, w=1.6): return P(pts, fill, '#4b5563', w)

F = {}; A = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 6-01 ─────────
@fig
def f6_poly_check():
    b = PB([(30, 40), (100, 26), (120, 90), (60, 116), (22, 90)], FILL) + ok(70, 140) + cap(70, 160, '선분으로만 둘러싸임')
    b += '<path d="M170 110 L170 40 L240 40 Q260 80 240 110 Z" fill="#f3f4f6" stroke="#4b5563" stroke-width="1.6"/>' + no(210, 140) + cap(210, 160, '곡선이 있어요')
    b += '<polyline points="300,110 300,40 380,30 390,110 330,110" fill="none" stroke="#4b5563" stroke-width="1.6"/>' + no(345, 140) + cap(345, 160, '둘러싸여 있지 않아요')
    return S(430, 170, b)

@fig
def f6_names():
    b = ''
    for k, (n, name) in enumerate(((5, '오각형'), (6, '육각형'), (8, '팔각형'))):
        c = (70 + k * 140, 72); pts = REG(c, 48, n, -90 + (0 if n != 8 else 22.5))
        b += PB(pts, FILL) + ''.join(D(p, ORG, 3.5) for p in pts)
        b += T(c[0], 146, '변 %d개' % n, LINE, 12, 'middle', 700) + T(c[0], 164, name, ORG, 13, 'middle', 700)
    return S(420, 176, b)

@fig
def f6_two_checks():
    b = '<path d="M30 112 L30 44 L100 44 Q124 80 100 112 Z" fill="#f3f4f6" stroke="#4b5563" stroke-width="1.6"/>'
    b += '<path d="M100 44 Q124 80 100 112" fill="none" stroke="%s" stroke-width="4"/>' % RED + T(70, 136, '① 모두 곧은 선분?', LINE, 12, 'middle', 700) + T(70, 154, '곡선 ✗', RED, 12, 'middle', 700)
    b += '<polyline points="180,112 180,44 256,36 266,112 210,112" fill="none" stroke="#4b5563" stroke-width="1.6"/>' + '<circle cx="195" cy="112" r="12" fill="none" stroke="%s" stroke-width="2.2"/>' % RED
    b += T(222, 136, '② 둘러싸여 있나?', LINE, 12, 'middle', 700) + T(222, 154, '열림 ✗', RED, 12, 'middle', 700)
    b += PB(REG((366, 76), 42, 6, 0), '#eaf7ee') + T(366, 136, '둘 다 만족', LINE, 12, 'middle', 700) + T(366, 154, '다각형 ✓', GRN, 12, 'middle', 700)
    return S(430, 166, b)

@fig
def f6_nonagon():
    c = (100, 90); pts = REG(c, 70, 9)
    b = PB(pts, FILL)
    for k, p in enumerate(pts):
        q = add(c, ang(c, p), 86); b += D(p, ORG, 4) + T(q[0], q[1] + 4, str(k + 1), ORG, 11.5, 'middle', 700)
    b += T(220, 70, '변 9개', LINE, 13, 'start', 700) + T(220, 94, '꼭짓점 9개', ORG, 13, 'start', 700) + T(220, 122, '→ 구각형', ORG, 14, 'start', 700)
    return S(380, 184, b)

# ───────── 6-02 ─────────
@fig
def f6_regular():
    b = ''
    for k, n in enumerate((5, 6)):
        c = (80 + k * 160, 80); pts = REG(c, 54, n)
        b += PB(pts, FILL) + ''.join(TK(pts[i], pts[(i + 1) % n], 1, ORG) for i in range(n))
        b += T(c[0], 156, '정오각형' if n == 5 else '정육각형', ORG, 13, 'middle', 700)
    b += T(330, 66, '변의 길이가 모두 같고', LINE, 12.5, 'start') + T(330, 88, '각의 크기가 모두 같아요', LINE, 12.5, 'start')
    return S(500, 168, b)

@fig
def f6_pent_sum():
    c = (90, 86); pts = REG(c, 60, 5)
    b = PB(pts, FILL)
    for i in range(5):
        m = ((pts[i][0] + pts[(i + 1) % 5][0]) / 2, (pts[i][1] + pts[(i + 1) % 5][1]) / 2); q = add(c, ang(c, m), 70)
        b += T(q[0], q[1] + 4, '6 cm', ORG, 11.5, 'middle', 700)
    b += T(190, 66, '6 + 6 + 6 + 6 + 6', LINE, 13, 'start') + T(190, 92, '= 6 × 5 = 30 (cm)', ORG, 13, 'start', 700)
    return S(380, 170, b)

@fig
def f6_rhom_vs_sq():
    B = (30, 120); Ap = add(B, 64, 90); C = (120, 120); Dp = (Ap[0] + 90, Ap[1]); R = [Ap, B, C, Dp]
    b = PB(R, FILL) + ''.join(TK(R[i], R[(i + 1) % 4], 1, ORG) for i in range(4))
    b += ARC(B, 0, 64, 18, BLUE, 2.4) + ARC(Dp, 180, 244, 18, BLUE, 2.4) + ARC(C, 64, 180, 14, RED, 2.4) + ARC(Ap, 244, 360, 14, RED, 2.4)
    b += T(105, 146, '변은 같지만 각이 달라요', LINE, 12, 'middle', 700) + no(105, 166)
    Q = [(250, 30), (340, 30), (340, 120), (250, 120)]
    b += PB(Q, '#eaf7ee') + ''.join(TK(Q[i], Q[(i + 1) % 4], 1, ORG) for i in range(4))
    for i in range(4): b += RA(Q[i], ang(Q[i], Q[(i + 1) % 4]), ang(Q[i], Q[i - 1]), 9)
    b += T(295, 146, '변도 각도 모두 같아요', LINE, 12, 'middle', 700) + ok(295, 166)
    b += T(80, 18, '마름모', ORG, 12.5, 'middle', 700) + T(295, 18, '정사각형', GRN, 12.5, 'middle', 700)
    return S(400, 176, b)

@fig
def f6_hept_div():
    c = (90, 88); pts = REG(c, 62, 7)
    b = PB(pts, FILL) + ''.join(TK(pts[i], pts[(i + 1) % 7], 1, ORG) for i in range(7))
    b += T(190, 66, '모든 변의 길이의 합 42 cm', LINE, 12.5, 'start') + T(190, 90, '변이 7개 → 42 ÷ 7 = 6', ORG, 13, 'start', 700) + T(190, 114, '한 변은 6 cm', ORG, 13, 'start', 700)
    return S(400, 168, b)

# ───────── 6-03 ─────────
@fig
def f6_diag_hept():
    c = (100, 92); pts = REG(c, 72, 7); v = pts[0]
    b = PB(pts, FILL)
    for k in (2, 3, 4, 5): b += L(v, pts[k], ORG, 2.4)
    b += D(v, RED, 6) + D(pts[1], '#9aa3b2', 6) + D(pts[6], '#9aa3b2', 6)
    b += T(220, 54, '빨간 점: 자기 자신', RED, 12, 'start', 700) + T(220, 76, '회색 점: 이웃한 꼭짓점 → 대각선 ✗', SUB, 12, 'start', 700)
    b += T(220, 104, '남은 4개와 이어요', ORG, 12.5, 'start', 700) + T(220, 128, '7 − 3 = 4 (개)', ORG, 13, 'start', 700)
    return S(460, 180, b)

@fig
def f6_quad_diags():
    b = ''
    shapes = [('평행사변형', [(30, 20), (110, 20), (90, 80), (10, 80)], False), ('마름모', [(170, 14), (205, 50), (170, 86), (135, 50)], True),
              ('직사각형', [(240, 22), (330, 22), (330, 80), (240, 80)], False), ('정사각형', [(370, 18), (432, 18), (432, 80), (370, 80)], True)]
    for name, Q, perp in shapes:
        b += PB(Q, '#eaf7ee' if perp else FILL) + L(Q[0], Q[2], ORG, 1.8) + L(Q[1], Q[3], ORG, 1.8)
        if perp:
            o = ((Q[0][0] + Q[2][0]) / 2, (Q[0][1] + Q[2][1]) / 2); b += RA(o, ang(o, Q[0]), ang(o, Q[1]), 8, RED)
        cx = sum(p[0] for p in Q) / 4; b += T(cx, 104, name, GRN if perp else LINE, 12, 'middle', 700) + (ok(cx, 124) if perp else '')
    b += T(225, 150, '두 대각선이 서로 수직으로 만나요 → 마름모, 정사각형', ORG, 12.5, 'middle', 700)
    return S(450, 160, b)

@fig
def f6_tri_nodiag():
    A_, B_, C_ = (90, 20), (24, 130), (156, 130)
    b = PB([A_, B_, C_], FILL) + D(A_, RED, 5) + D(B_, BLUE, 5) + D(C_, BLUE, 5)
    b += T(90, 14, 'ㄱ', LINE, 13, 'middle', 700) + T(14, 140, 'ㄴ', LINE, 13, 'middle', 700) + T(166, 140, 'ㄷ', LINE, 13, 'middle', 700)
    b += T(210, 60, '점 ㄱ과 이웃한 점: ㄴ, ㄷ', LINE, 12.5, 'start') + T(210, 84, '→ 이웃하지 않는 점이 없어요', ORG, 12.5, 'start', 700)
    b += T(210, 112, '꼭짓점끼리 이으면 모두 변', LINE, 12.5, 'start') + T(210, 136, '→ 대각선 0개', ORG, 13, 'start', 700)
    return S(450, 154, b)

@fig
def f6_count_diag():
    Q = [(30, 30), (110, 30), (110, 110), (30, 110)]
    b = PB(Q, FILL) + L(Q[0], Q[2], ORG, 2.2) + L(Q[1], Q[3], ORG, 2.2) + T(70, 136, '사각형: 2개', ORG, 13, 'middle', 700)
    c = (240, 72); pts = REG(c, 52, 5)
    b += PB(pts, FILL) + ''.join(L(pts[i], pts[(i + 2) % 5], ORG, 2.2) for i in range(5)) + T(240, 146, '오각형: 5개', ORG, 13, 'middle', 700)
    b += T(320, 56, '(선분 ㄱㄷ) = (선분 ㄷㄱ)', LINE, 12, 'start') + T(320, 80, '같은 대각선을 두 번', LINE, 12, 'start') + T(320, 100, '세지 않게 주의해요', RED, 12, 'start', 700)
    return S(490, 158, b)

# ───────── 6-04 ─────────
@fig
def f6_fill_rules():
    b = ''
    for k, kind in enumerate(('ok', 'gap', 'over')):
        c = (70 + k * 150, 70); V = HEXV(c, 50)
        b += P(V, '#fff', '#4b5563', 1.6)
        if kind == 'ok':
            b += PB([c, V[0], V[1], V[2], V[3]], C_TRAP) + PB([c, V[3], V[4], V[5], V[0]], C_TRAP)
        elif kind == 'gap':
            b += PB([c, V[0], V[1], V[2], V[3]], C_TRAP) + PB([c, V[3], V[4]], C_TRI) + PB([c, V[5], V[0]], C_TRI)
        else:
            b += PB([c, V[0], V[1], V[2], V[3]], C_TRAP) + P([add(c, 270, 6), add(V[3], 270, 6), add(V[4], 270, 6), add(V[5], 270, 6), add(V[0], 270, 6)], C_TRAP, '#4b5563', 1.6, .75)
        b += (ok(c[0], 140) if kind == 'ok' else no(c[0], 140)) + cap(c[0], 160, {'ok': '빈틈없이 · 변이 맞닿게', 'gap': '빈틈이 있어요', 'over': '겹쳤어요'}[kind])
    return S(440, 170, b)

@fig
def f6_hex6():
    c = (90, 84); V = HEXV(c, 64)
    b = P(V, C_HEX, '#4b5563', 1.6) + ''.join(L(c, v, '#4b5563', 1.3, '5 4') for v in V) + PB([c, V[0], V[1]], C_TRI, 2)
    b += T(200, 66, '한가운데와 꼭짓점을 이으면', LINE, 12.5, 'start') + T(200, 90, '정삼각형 6개로 나뉘어요', ORG, 12.5, 'start', 700)
    return S(420, 166, b)

@fig
def f6_hex_trap():
    c = (90, 84); V = HEXV(c, 64)
    b = PB([c, V[0], V[1], V[2], V[3]], C_TRAP) + PB([c, V[3], V[4], V[5], V[0]], '#f9cdd0')
    b += L(c, V[1], '#4b5563', 1, '4 3') + L(c, V[2], '#4b5563', 1, '4 3') + L(c, V[4], '#4b5563', 1, '4 3') + L(c, V[5], '#4b5563', 1, '4 3')
    b += T(200, 56, '사다리꼴 = 정삼각형 3개 크기', LINE, 12.5, 'start') + T(200, 80, '정육각형 = 정삼각형 6개 크기', LINE, 12.5, 'start')
    b += T(200, 108, '6 ÷ 3 = 2 → 사다리꼴 2개', ORG, 13, 'start', 700)
    return S(440, 166, b)

@fig
def f6_hex3ways():
    b = ''
    for k in range(3):
        c = (66 + k * 140, 70); V = HEXV(c, 54)
        if k == 0:
            for i in range(6): b += PB([c, V[i], V[(i + 1) % 6]], C_TRI)
            s = '정삼각형 6개'
        elif k == 1:
            for i in (0, 2, 4): b += PB([c, V[i], V[i + 1], V[(i + 2) % 6]], C_PAR)
            s = '평행사변형 3개'
        else:
            b += PB([c, V[0], V[1], V[2], V[3]], C_TRAP) + PB([c, V[3], V[4], V[5], V[0]], C_TRAP); s = '사다리꼴 2개'
        b += T(c[0], 144, s, LINE, 12.5, 'middle', 700)
    b += T(206, 166, '한 가지 조각으로 채우는 방법 = 3가지', ORG, 12.5, 'middle', 700)
    return S(420, 176, b)

@fig
def f6_trap_join():
    s = 46; h = s * math.sqrt(3) / 2; y = 76
    t1 = [(40, y), (40 + 2 * s, y), (40 + 1.5 * s, y - h), (40 + .5 * s, y - h)]
    t2 = [(40, y), (40 + 2 * s, y), (40 + 1.5 * s, y + h), (40 + .5 * s, y + h)]
    b = PB(t1, C_TRAP) + PB(t2, '#f9cdd0') + T(40 + s, 150, '아랫변끼리 붙이면 → 정육각형', LINE, 12, 'middle', 700)
    x0 = 230; yb = 100
    p1 = [(x0, yb), (x0 + 2 * s, yb), (x0 + 1.5 * s, yb - h), (x0 + .5 * s, yb - h)]
    p2 = [(x0 + 1.5 * s, yb - h), (x0 + 3.5 * s, yb - h), (x0 + 3 * s, yb), (x0 + 2 * s, yb)]
    b += PB(p1, C_TRAP) + PB(p2, '#f9cdd0') + T(x0 + 1.75 * s, 150, '한 조각을 돌려 붙이면 → 평행사변형', LINE, 12, 'middle', 700)
    return S(420, 162, b)

@fig
def f6_square_gap():
    c = (100, 90); V = HEXV(c, 70)
    b = P(V, C_HEX, '#4b5563', 1.6)
    v = V[3]; a1 = ang(v, V[2]); sq = [v, add(v, a1, 46), add(add(v, a1, 46), a1 - 90, 46), add(v, a1 - 90, 46)]
    b += PB(sq, C_SQ) + RA(v, a1, a1 - 90, 10, LINE)
    gap = [v, add(v, a1 - 90, 46), add(v, ang(v, V[4]), 46)]
    b += P(gap, '#ffffff', RED, 2) + T(sq[3][0] + 2, sq[3][1] + 30, '빈틈', RED, 12, 'start', 700)
    b += T(210, 66, '정사각형 모서리: 직각', LINE, 12.5, 'start') + T(210, 90, '정육각형 모서리: 직각보다 커요', LINE, 12.5, 'start') + T(210, 116, '→ 꼭 맞지 않아 빈틈이 생겨요', RED, 12.5, 'start', 700)
    return S(460, 176, b)

@fig
def f6_flow():
    b = BOX(6, 34, 118, 64, ['① 선분으로만', '둘러싸였나?'], '#f8fafc', '#cbd2dc', LINE, 11.5)
    b += AR((124, 66), (142, 66)) + BOX(144, 34, 118, 64, ['② 변의 수를 세어', '이름 정하기'], PALE, ORG, ORG, 11.5)
    b += AR((262, 66), (280, 66)) + BOX(282, 34, 148, 64, ['③ 변의 길이와 각의 크기', '모두 같으면 정다각형'], '#ecfdf3', '#6fbf8b', GRN, 11.5)
    return S(438, 110, b)

def a6_pick():   # 다시 묻기: ②곡선 ③열림이 다각형이 아니다
    b = PB(REG((48, 64), 36, 6, 0), FILL) + T(48, 122, '①', ORG, 14, 'middle', 700)
    b += '<path d="M110 96 L110 34 L170 34 L170 70 Q150 104 110 96 Z" fill="#eef3fb" stroke="#4b5563" stroke-width="1.6"/>' + T(140, 122, '②', ORG, 14, 'middle', 700)
    b += '<polyline points="210,96 216,34 270,40 282,96 236,96" fill="none" stroke="#4b5563" stroke-width="1.6"/>' + T(246, 122, '③', ORG, 14, 'middle', 700)
    b += PB(REG((340, 64), 36, 5), FILL) + T(340, 122, '④', ORG, 14, 'middle', 700)
    return S(390, 132, b)
A[('6-01', 2)] = a6_pick

LFIG = {
    '6-01': ['f6_poly_check', 'f6_names', 'f6_two_checks', 'f6_nonagon'],
    '6-02': ['f6_regular', 'f6_pent_sum', 'f6_rhom_vs_sq', 'f6_hept_div'],
    '6-03': ['f6_diag_hept', 'f6_quad_diags', 'f6_tri_nodiag', 'f6_count_diag'],
    '6-04': ['f6_fill_rules', 'f6_hex6', 'f6_hex_trap', 'f6_hex3ways', 'f6_trap_join', 'f6_square_gap', 'f6_flow'],
}
AFIG = A
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for k, fn in A.items(): o.append('<div style="border:2px dashed #e7c27a;margin:8px 0;padding:6px"><b>다시 묻기 %s · %d</b><br>%s</div>' % (k[0], k[1] + 1, fn()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_6단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()), len(A))
