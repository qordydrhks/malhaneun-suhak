# -*- coding: utf-8 -*-
"""초5-2 5단원(직육면체) 그림 — 질문 조건(Q2·R3) · 다시 묻기(AFIG) · 긴 설명(LFIG)을 한 곳에서 (2026-10-13).
   겨냥도·전개도는 draw.box / draw.net(교재 규칙: 보이는 모서리 실선·보이지 않는 3개 점선 / 잘린 모서리 실선·접는 모서리 점선).
   전개도의 마주 보는 면·겹치는 선분은 cube_fold.py 로 계산해 확인했다.
   그림만 보기: python -X utf8 figs_e52_5.py → 그림_긴설명_초5-2_5단원.html
"""
import math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
import cube_fold as CF
RED = '#B55B45'; SOFT = D.SOFT; INK = D.INK; GRN = '#3C8B64'; BLU = '#3B6FA8'; ORG = '#C77A1E'
def M(*f): return D.merge(*f)
def P(pts, fill, stroke='#6E6A86', sw=1.2, op=1.0, dash=False):
    f = D.Fig()
    f.add('<polygon points="%s" fill="%s" fill-opacity="%s" stroke="%s" stroke-width="%s"%s/>' % (
        ' '.join('%.1f,%.1f' % p for p in pts), fill, op, stroke, sw, ' stroke-dasharray="4 3"' if dash else ''), pts)
    return f
def T(x, y, s, c=INK, sz=12, w=700, a='middle'): return D.tag(x, y, s, c, sz, w, a)
FACES = {'front': (0, 1, 5, 4), 'right': (1, 2, 6, 5), 'top': (0, 1, 2, 3), 'back': (3, 2, 6, 7), 'left': (0, 3, 7, 4), 'bottom': (4, 5, 6, 7)}
def shade(w, d, h, face, col, op=0.55, origin=(0, 0)):
    g = D.box_pts(w, d, h, origin); return P([g[i] for i in FACES[face]], col, 'none', 0, op)
def cen(pts): return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))
def fc(w, d, h, face, origin=(0, 0)):
    g = D.box_pts(w, d, h, origin); return cen([g[i] for i in FACES[face]])

def net_fig(cells, labels=None, s=34, color='blue', origin=(0, 0)):
    xs = [c for c, r in cells]; ys = [r for c, r in cells]
    c0, r0 = min(xs), min(ys)
    cells2 = [(c - c0, r - r0) for c, r in cells]
    nc, nr = max(xs) - c0 + 1, max(ys) - r0 + 1
    lab = {(c - c0, r - r0): t for (c, r), t in (labels or {}).items()}
    return D.net(cells2, [s] * nc, [s] * nr, lab, color, origin)

# ───────── 질문 그림 (조건만) ─────────
Q2 = {'f55net2': (lambda: D.svg(net_fig([(0, 0), (0, 1), (1, 1), (2, 1), (2, 2), (3, 2)],
                                         {(0, 0): '가', (0, 1): '나', (1, 1): '다', (2, 1): '라', (2, 2): '마', (3, 2): '바'}, color='amber')), 170)}

def r_a():   # 모서리 합 88 cm · 가로 10 · 세로 □ · 높이 5
    return D.svg(D.box(5, 3.5, 2.5, dims={'w': '10 cm', 'd': '□ cm', 'h': '5 cm'}, color='amber'))
def r_b():   # 앞에서 본 모양 6×3, 옆에서 본 모양 4×3
    s = 18
    f = M(D.poly([(0, 0), (6 * s, 0), (6 * s, 3 * s), (0, 3 * s)], 'blue'), D.dim_h(0, 6 * s, 3 * s + 12, '6 cm'), D.dim_v(0, 3 * s, -12, '3 cm'),
          T(3 * s, 3 * s + 46, '앞', BLU, 13))
    x0 = 6 * s + 50
    f = M(f, D.poly([(x0, 0), (x0 + 4 * s, 0), (x0 + 4 * s, 3 * s), (x0, 3 * s)], 'green'), D.dim_h(x0, x0 + 4 * s, 3 * s + 12, '4 cm'),
          D.dim_v(0, 3 * s, x0 + 4 * s + 12, '3 cm', left=False), T(x0 + 2 * s, 3 * s + 46, '옆', GRN, 13))
    return D.svg(f)
def cube3(x0, y0, top, front, right, a=46, e=20):
    """숫자가 쓰인 정육면체 하나(앞면 정사각형 · 위 · 오른쪽 면은 비스듬히)"""
    FTL, FTR, FBL, FBR = (x0, y0), (x0 + a, y0), (x0, y0 + a), (x0 + a, y0 + a)
    BTL, BTR, BBR = (x0 + e, y0 - e), (x0 + a + e, y0 - e), (x0 + a + e, y0 + a - e)
    f = M(P([FTL, FTR, FBR, FBL], '#FCEFD8', '#A97C22', 1.4), P([FTL, FTR, BTR, BTL], '#FFF7E6', '#A97C22', 1.4), P([FTR, BTR, BBR, FBR], '#F3DDB5', '#A97C22', 1.4))
    f = M(f, T(*cen([FTL, FTR, FBR, FBL])[:1], cen([FTL, FTR, FBR, FBL])[1] + 6, front, INK, 17),
          T(cen([FTL, FTR, BTR, BTL])[0], cen([FTL, FTR, BTR, BTL])[1] + 5, top, INK, 14), T(cen([FTR, BTR, BBR, FBR])[0], cen([FTR, BTR, BBR, FBR])[1] + 5, right, INK, 14))
    return f
def r_c():   # 세 방향에서 본 정육면체 — 마주 보는 면: 1·4, 2·6, 3·5 (위1 앞2 오른3 / 위1 앞6 오른5 / 위3 앞2 오른4)
    return D.svg(M(cube3(0, 30, '1', '2', '3'), cube3(110, 30, '1', '6', '5'), cube3(220, 30, '3', '2', '4')))
def pip(f, pts, n):
    """평행사변형 면(위면) 위에 주사위 눈 n개"""
    A, B, Cc, Dd = pts   # 앞왼, 앞오, 뒤오, 뒤왼
    def at(u, v): return (A[0] + (B[0] - A[0]) * u + (Dd[0] - A[0]) * v, A[1] + (B[1] - A[1]) * u + (Dd[1] - A[1]) * v)
    spots = {3: [(.25, .25), (.5, .5), (.75, .75)]}[n]
    for u, v in spots:
        x, y = at(u, v); f.add('<ellipse cx="%.1f" cy="%.1f" rx="3.6" ry="2.6" fill="#B55B45"/>' % (x, y), [(x - 4, y - 3), (x + 4, y + 3)])
    return f
def r_d():   # 주사위 3개를 위로 쌓음 · 맨 위 눈 3
    a, e = 50, 22; f = D.Fig()
    for k in range(3):
        y0 = 30 + k * a
        FTL, FTR, FBL, FBR = (0, y0), (a, y0), (0, y0 + a), (a, y0 + a)
        BTL, BTR, BBR = (e, y0 - e), (a + e, y0 - e), (a + e, y0 + a - e)
        f = M(f, P([FTL, FTR, FBR, FBL], '#FFFFFF', '#6E6A86', 1.4), P([FTR, BTR, BBR, FBR], '#EDEFF5', '#6E6A86', 1.4))
        if k == 0:
            top = [FTL, FTR, BTR, BTL]; f = M(f, P(top, '#FFFFFF', '#6E6A86', 1.4)); f = pip(f, top, 3)
    f = M(f, T(a + e + 16, 30 - e / 2 + 4, '← 맨 위 면', SOFT, 11.5, 600, 'start'), T(a + e + 16, 30 + 3 * a - e / 2, '← 바닥과 맞닿는 면 ?', RED, 11.5, 700, 'start'))
    return D.svg(f)
def r_e():   # 보이지 않는 모서리 합 21 cm (치수 없음)
    return D.svg(D.box(4.5, 3.5, 3, color='green'))
def r_f():   # 끈으로 십자 모양 둘러 묶음 · 16 × 12 × 9
    w, d, h = 6.4, 4.8, 3.6
    f = D.box(w, d, h, dims={'w': '16 cm', 'd': '12 cm', 'h': '9 cm'}, color='amber')
    g = D.box_pts(w, d, h); FTL, FTR, BTR, BTL, FBL, FBR, BBR, BBL = g
    mid = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
    S = lambda p, q: D.seg(p, q, 'solid', '#D9480F', 2.6)
    a1, a2 = mid(FTL, BTL), mid(FTR, BTR)          # 위면, 가로 방향
    b1, b2 = mid(FTL, FTR), mid(BTL, BTR)          # 위면, 세로 방향
    f = M(f, S(a1, a2), S(b1, b2), S(a2, mid(FBR, BBR)), S(b1, mid(FBL, FBR)))
    return D.svg(f)
NET_G = [(0, 0), (1, 0), (1, 1), (2, 1), (3, 1), (3, 2)]
NET_G_V = dict(zip([(0, 0), (1, 0), (2, 0), (2, 1), (3, 1), (4, 1), (4, 2), (4, 3), (3, 3), (3, 2), (2, 2), (1, 2), (1, 1), (0, 1)], 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'))
def r_g():   # 겹치는 선분 찾기 — 꼭짓점 이름 14개 (cube_fold.glue 로 확인: ㄱㄴ↔ㅅㅂ · ㄴㄷ↔ㅂㅁ · ㄷㄹ↔ㅁㄹ · ㅌㅋ↔ㅇㅈ · ㅋㅊ↔ㅈㅊ)
    s = 38; f = net_fig(NET_G, None, s, 'green')
    for (x, y), t in NET_G_V.items():
        touch = [(c + .5, r + .5) for c, r in NET_G if c <= x <= c + 1 and r <= y <= r + 1]
        mx = sum(a for a, b in touch) / len(touch); my = sum(b for a, b in touch) / len(touch)
        dx, dy = x - mx, y - my; L = math.hypot(dx, dy) or 1
        f = M(f, D.dot((x * s, y * s), None, '#3C8B64'), T(x * s + dx / L * 13, y * s + dy / L * 13 + 4.5, t, INK, 12.5))
    return D.svg(f)

def r_h():   # 직육면체 전개도 — 옆면 4개를 이은 길이 22 cm · 높이 5 cm · 윗면 세로 3 cm  (가로 8 · 세로 3 · 높이 5)
    k = 10; cw = [8 * k, 3 * k, 8 * k, 3 * k]; rh = [3 * k, 5 * k, 3 * k]
    f = D.net([(0, 0), (0, 1), (1, 1), (2, 1), (3, 1), (0, 2)], cw, rh, None, 'blue')
    X = [0, 80, 110, 190, 220]; Y = [0, 30, 80, 110]
    f = M(f, D.dim_h(X[0], X[4], Y[3] + 14, '22 cm'), D.dim_v(Y[1], Y[2], X[4] + 12, '5 cm', left=False), D.dim_v(Y[0], Y[1], -12, '3 cm'))
    f = M(f, T(110, Y[3] + 50, '옆면 4개를 이은 길이가 22 cm', SOFT, 11, 600))
    return D.svg(f)
NET_I = [(0, 0), (1, 0), (1, 1), (2, 1), (3, 1)]
NET_I_C = [((-1, 0), '㉠'), ((0, 1), '㉡'), ((2, 0), '㉢'), ((4, 1), '㉣'), ((2, 2), '㉤'), ((3, 2), '㉥')]   # 가능: ㉠ ㉤ ㉥ (cube_fold 로 확인)
def r_i():
    s = 34; f = D.Fig()
    f = M(f, D.net([(c + 1, r) for c, r in NET_I], [s] * 5, [s] * 3, dict(zip([(c + 1, r) for c, r in NET_I], '가나다라마')), 'blue'))   # 면 이름(누르기 단계에서 부름)
    for (c, r), t in NET_I_C:
        x0, y0 = (c + 1) * s, r * s
        f = M(f, P([(x0 + 3, y0 + 3), (x0 + s - 3, y0 + 3), (x0 + s - 3, y0 + s - 3), (x0 + 3, y0 + s - 3)], '#FFFFFF', '#9AA3B2', 1, 1, True), T(x0 + s / 2, y0 + s / 2 + 5, t, RED, 13))
    return D.svg(f)
NET_J = [(1, 1), (1, 0), (0, 1), (2, 1), (3, 1), (1, 2)]   # 십자 전개도 · 앞면이 (1,1) — cube_fold.corners 로 꼭짓점 이름 계산(ㄱ 앞 위 왼 … ㅇ 뒤 아래 왼)
NET_J_V = {(1, 0): 'ㄹ', (2, 0): 'ㄷ', (0, 1): 'ㄹ', (1, 1): 'ㄱ', (2, 1): 'ㄴ', (3, 1): 'ㄷ', (4, 1): 'ㄹ', (0, 2): 'ㅇ', (1, 2): 'ㅁ', (2, 2): 'ㅂ', (3, 2): 'ㅅ', (4, 2): 'ㅇ', (1, 3): 'ㅇ', (2, 3): 'ㅅ'}
def r_j():   # 전개도(선분 ㄱㄷ = 윗면 대각선 · 선분 ㄷㅇ = 뒷면 대각선) + 겨냥도(이름 같음, 선분은 아이가)
    s = 30; f = net_fig(NET_J, None, s, 'green')
    for (x, y), t in NET_J_V.items():
        touch = [(c + .5, r + .5) for c, r in NET_J if c <= x <= c + 1 and r <= y <= r + 1]
        mx = sum(a for a, b in touch) / len(touch); my = sum(b for a, b in touch) / len(touch)
        dx, dy = x - mx, y - my; L = math.hypot(dx, dy) or 1
        f = M(f, D.dot((x * s, y * s), None, '#3C8B64'), T(x * s + dx / L * 12, y * s + dy / L * 12 + 4.5, t, INK, 11.5))
    f = M(f, D.seg((1 * s, 1 * s), (2 * s, 0), 'solid', RED, 2.2), D.seg((3 * s, 1 * s), (4 * s, 2 * s), 'solid', RED, 2.2))
    f = M(f, D.box(3.2, 3.2, 3.2, origin=(4 * s + 70, 1.4 * s), color='blue', verts=True))
    return D.svg(f)
R3 = {'r55j': (r_j, 330), 'r55a': (r_a, 220), 'r55b': (r_b, 300), 'r55c': (r_c, 330), 'r55d': (r_d, 230), 'r55e': (r_e, 180), 'r55f': (r_f, 260),
      'r55g': (r_g, 320), 'r55h': (r_h, 300), 'r55i': (r_i, 300)}

# ───────── 다시 묻기 그림 (AFIG) ─────────
def a_box_par(): return D.svg(D.box(6, 2.5, 3.5, verts=True, color='amber'))        # 면 ㄴㄷㅅㅂ과 평행 → ㄱㄹㅇㅁ
def a_box_perp(): return D.svg(D.box(3.5, 4, 4.5, verts=True, color='rose'))       # 면 ㄱㄴㅂㅁ과 수직 4개
def a_solid(): return D.svg(D.box(3.5, 3.5, 3.5, all_solid=True, color='blue'))   # 정육면체 — 모두 실선
def a_net_par(): return D.svg(net_fig([(0, 0), (0, 1), (1, 1), (2, 1), (3, 1), (3, 2)], {(0, 0): '가', (0, 1): '나', (1, 1): '다', (2, 1): '라', (3, 1): '마', (3, 2): '바'}, color='rose'))   # 나↔라 · 다↔마
def a_badnet(): return D.svg(net_fig([(0, 1), (1, 1), (2, 1), (3, 1), (4, 1), (2, 0)], None, 30, 'green'))   # 한 줄에 5개
def a_net_perp(): return D.svg(net_fig([(0, 0), (1, 0), (1, 1), (1, 2), (2, 2), (1, 3)], {(0, 0): '가', (1, 0): '나', (1, 1): '다', (1, 2): '라', (2, 2): '마', (1, 3): '바'}, color='blue'))   # 나↔라
AFIG = {('5-02', 0): a_box_par, ('5-02', 1): a_box_perp, ('5-03', 2): a_solid, ('5-04', 1): a_net_par, ('5-04', 2): a_badnet, ('5-04', 4): a_net_perp}

# ───────── 긴 설명 그림 (LFIG) ─────────
def l_rects():
    s = 16; f = M(D.poly([(0, 0), (7 * s, 0), (7 * s, 4 * s), (0, 4 * s)], 'blue'), T(3.5 * s, 4 * s + 22, '직사각형', BLU, 12.5), T(3.5 * s, 4 * s + 40, '네 각이 모두 직각', SOFT, 11))
    for p, a, b in (((0, 0), (1, 0), (0, 1)), ((7 * s, 0), (-1, 0), (0, 1)), ((7 * s, 4 * s), (-1, 0), (0, -1)), ((0, 4 * s), (1, 0), (0, -1))):
        f = M(f, D.right_angle(p, (p[0] + a[0] * 20, p[1] + a[1] * 20), (p[0] + b[0] * 20, p[1] + b[1] * 20)))
    x0 = 7 * s + 80; q = [(x0, 0), (x0 + 4 * s, 0), (x0 + 4 * s, 4 * s), (x0, 4 * s)]
    f = M(f, D.poly(q, 'amber'), T(x0 + 2 * s, 4 * s + 22, '정사각형', ORG, 12.5), T(x0 + 2 * s, 4 * s + 40, '네 각 직각 + 네 변 길이 같음', SOFT, 11))
    for k in range(4): f = M(f, D.ticks(q[k], q[(k + 1) % 4], 1))
    return D.svg(f)

def l_boxcube():
    f = M(D.box(5, 2.5, 3, color='rose'), T(55, 92, '직육면체: 직사각형 6개', RED, 12))
    f = M(f, D.box(3, 3, 3, origin=(160, 0), color='amber'), T(195, 92, '정육면체: 정사각형 6개', ORG, 12))
    return D.svg(f)
def l_parts():
    f = D.box(5, 3, 3.5, color='green'); g = D.box_pts(5, 3, 3.5)
    c = fc(5, 3, 3.5, 'front')
    f = M(f, D.arrow(c[0] - 70, c[1] - 30, c[0] - 8, c[1] - 4, '면', SOFT), D.dot(g[1], None, RED), T(g[1][0] - 4, g[1][1] - 12, '꼭짓점', RED, 11.5))
    m = ((g[5][0] + g[6][0]) / 2, (g[5][1] + g[6][1]) / 2)
    f = M(f, D.seg(g[5], g[6], 'solid', GRN, 3.2), T(m[0] + 26, m[1] + 18, '모서리', GRN, 11.5))
    t = D.table([['', '면', '모서리', '꼭짓점'], ['개수', '6개', '12개', '8개']], [46, 46, 56, 56], 26, (170, 10), 'green')
    return D.svg(M(f, t))
def l_incl():
    f = M(P([(0, 0), (230, 0), (230, 110), (0, 110)], '#F3F7FD', '#3B6FA8', 1.6), T(115, 22, '직육면체 (면이 직사각형)', BLU, 12.5))
    f = M(f, P([(60, 40), (170, 40), (170, 98), (60, 98)], '#FFF6E5', '#C77A1E', 1.6), T(115, 74, '정육면체', ORG, 13))
    f = M(f, T(115, 136, '정사각형은 직사각형 → 정육면체는 직육면체', SOFT, 12))
    return D.svg(f)
def l_notcube():
    f = D.box(6, 2.5, 3, dims={'w': '6 cm', 'd': '2.5 cm', 'h': '3 cm'}, color='rose')
    return D.svg(M(f, T(80, 112, '모서리 길이가 서로 달라 면이 정사각형이 아니에요', RED, 11.5)))
def l_same_diff():
    t = D.table([['', '직육면체', '정육면체'], ['면·모서리·꼭짓점', '6 · 12 · 8', '6 · 12 · 8'], ['면의 모양', '직사각형', '정사각형'], ['모서리 길이', '다를 수 있음', '모두 같음']], [110, 90, 90], 28, (0, 0), 'blue')
    return D.svg(t)
def l_parallel():
    w, d, h = 5, 3, 3.5
    f = M(D.box(w, d, h, color='blue'), shade(w, d, h, 'top', '#F6B26B'), shade(w, d, h, 'bottom', '#F6B26B', 0.35))
    g = D.box_pts(w, d, h)
    f = M(f, D.arrow(g[2][0] + 20, g[2][1] - 4, g[2][0] + 20, g[2][1] - 30, None, ORG), D.arrow(g[6][0] + 20, g[6][1] + 4, g[6][0] + 20, g[6][1] + 30, None, ORG))
    return D.svg(M(f, T(80, 132, '마주 보는 두 면은 늘여도 만나지 않아요 → 평행', ORG, 11.5)))
def l_perp4():
    w, d, h = 4.5, 3, 3.5; f = D.box(w, d, h, color='green')
    f = M(f, shade(w, d, h, 'top', '#F6B26B'), shade(w, d, h, 'front', '#9FC3E8'), shade(w, d, h, 'right', '#9FC3E8'))
    return D.svg(M(f, T(70, 112, '윗면과 만나는 옆면 4개가 모두 수직', BLU, 11.5)))
def l_bases():
    f = D.Fig()
    for k, (a, b) in enumerate((('top', 'bottom'), ('front', 'back'), ('left', 'right'))):
        o = (k * 110, 0); w, d, h = 3.2, 2.2, 2.6
        f = M(f, D.box(w, d, h, o, 'blue'), shade(w, d, h, a, '#F6B26B', 0.65, o), shade(w, d, h, b, '#F6B26B', 0.35, o))
    return D.svg(M(f, T(160, 92, '평행한 면 3쌍 — 어느 쌍이든 밑면이 될 수 있어요', ORG, 11.5)))
def l_perp_reason():
    t = D.table([['면 1개', '평행한 면', '수직인 면'], ['자기 자신', '1개', '나머지 4개']], [80, 80, 90], 28, (0, 0), 'amber')
    return D.svg(M(t, T(125, 80, '6 − 1 − 1 = 4', ORG, 13)))
def l_corner():
    w, d, h = 4, 3, 3; f = D.box(w, d, h, color='rose'); g = D.box_pts(w, d, h)
    p = g[1]
    f = M(f, D.right_angle(p, g[0], g[5]), D.right_angle(p, g[2], g[5], 9, RED), D.right_angle(p, g[0], g[2], 9, RED), D.dot(p, None, RED))
    return D.svg(M(f, T(60, 96, '한 꼭짓점에서 만나는 세 면은 서로 수직', RED, 11.5)))
def l_views():
    g = D.box_pts(3.6, 3.6, 3.6); FTL, FTR, BTR, BTL, FBL, FBR, BBR, BBL = g
    f = D.Fig()
    for pts, col in (([FTL, FTR, FBR, FBL], '#A8D8C0'), ([FTR, BTR, BBR, FBR], '#8CC7A8'), ([FTL, FTR, BTR, BTL], '#D7EFE3')):
        f.add('<polygon points="%s" fill="%s" stroke="#3C8B64" stroke-width="1.4"/>' % (' '.join('%.1f,%.1f' % p for p in pts), col), pts)
    f = M(f, T(45, 100, '보이는 면만 그리면 모양을 잘 몰라요', SOFT, 11))
    f = M(f, D.to_arrow(125, 40, ''), D.box(3.6, 3.6, 3.6, origin=(190, 0), color='green'), T(235, 100, '안 보이는 모서리는 점선', GRN, 11.5))
    return D.svg(f)

def l_hidden():
    w, d, h = 5, 3, 3.5; f = D.box(w, d, h, color='blue'); g = D.box_pts(w, d, h)
    for p, q in ((g[3], g[7]), (g[7], g[6]), (g[4], g[7])): f = M(f, D.seg(p, q, 'dashed', RED, 2.6))
    f = M(f, D.dot(g[7], None, RED), T(g[7][0] + 14, g[7][1] - 14, '보이지 않는 꼭짓점 1개', RED, 11, 700, 'start'))
    return D.svg(M(f, T(70, 112, '보이지 않는 모서리 3개(빨간 점선)', RED, 11.5)))
def l_fix():
    f = M(D.box(3.6, 2.6, 3, all_solid=True, color='amber'), T(44, 90, '✗ 모두 실선', RED, 12))
    f = M(f, D.box(3.6, 2.6, 3, origin=(140, 0), color='amber'), T(184, 90, '✓ 보이지 않는 3개는 점선', GRN, 12))
    return D.svg(f)
def l_count():
    t = D.table([['', '보이는 것', '보이지 않는 것', '모두'], ['면', '3', '3', '6'], ['모서리', '9', '3', '12'], ['꼭짓점', '7', '1', '8']], [60, 70, 90, 50], 26, (0, 0), 'green')
    return D.svg(t)
def l_netlines():
    f = net_fig([(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)], None, 32, 'blue')
    f = M(f, T(150, 12, '바깥 실선 = 자른 모서리', BLU, 11.5, 700, 'start'), T(150, 100, '안쪽 점선 = 접는 모서리', SOFT, 11.5, 700, 'start'))
    return D.svg(f)
def l_netpairs():
    s = 32; cells = [(0, 1), (1, 1), (2, 1), (3, 1), (1, 0), (1, 2)]
    cols = {(1, 0): '#F6B26B', (1, 2): '#F6B26B', (1, 1): '#9FC3E8', (3, 1): '#9FC3E8', (0, 1): '#B9DFB0', (2, 1): '#B9DFB0'}
    f = D.Fig()
    for (c, r), col in cols.items(): f = M(f, P([(c * s, r * s), ((c + 1) * s, r * s), ((c + 1) * s, (r + 1) * s), (c * s, (r + 1) * s)], col, '#6E6A86', 1.2))
    return D.svg(M(f, T(80, 3 * s + 24, '같은 색 = 접으면 마주 보는 면', SOFT, 11.5)))
def l_badnet():
    f = M(net_fig([(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1)], None, 28, 'rose'), T(56, 86, '✗ 2칸씩 두 줄 → 면이 겹쳐요', RED, 11.5))
    f = M(f, net_fig([(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)], None, 28, 'green', (170, -10)), T(226, 96, '✓ 마주 보는 면이 3쌍', GRN, 11.5))
    return D.svg(f)
def l_cut7():
    f = M(D.box(3.4, 3.4, 3.4, color='amber'), T(40, 94, '모서리 12개', SOFT, 12))
    f = M(f, D.to_arrow(112, 40, ''), T(127, 30, '펼치기', SOFT, 11), net_fig([(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)], None, 26, 'amber', (160, -6)))
    return D.svg(M(f, T(200, 96, '붙어 있는 5군데 + 자른 7군데 = 12', ORG, 11.5)))
def l_netperp():
    s = 32; cells = [(0, 0), (0, 1), (1, 1), (2, 1), (2, 2), (3, 2)]
    f = D.Fig()
    opp = {(0, 0): (2, 2)}
    for (c, r) in cells:
        col = '#F6B26B' if (c, r) == (0, 0) else ('#EEEEEE' if (c, r) == (2, 2) else '#9FC3E8')
        f = M(f, P([(c * s, r * s), ((c + 1) * s, r * s), ((c + 1) * s, (r + 1) * s), (c * s, (r + 1) * s)], col, '#6E6A86', 1.2))
    f = M(f, T(s / 2, s / 2 + 5, '★', ORG, 13), T(2.5 * s, 2.5 * s + 5, '마주 봄', SOFT, 9.5))
    return D.svg(M(f, T(150, 3 * s + 24, '★과 수직인 면 = 마주 보는 면을 뺀 4개(파랑)', BLU, 11.5)))
def l_flow5():
    f = D.Fig()
    for k, (t, c) in enumerate((('면 6 · 모서리 12 · 꼭짓점 8', BLU), ('같은 길이 모서리 4개씩', GRN), ('마주 보는 면 평행 · 만나는 면 수직', ORG))):
        f = M(f, P([(0, k * 38), (270, k * 38), (270, k * 38 + 28), (0, k * 38 + 28)], '#F8FAFC', '#CBD2DC', 1.2), T(135, k * 38 + 19, t, c, 12))
    return D.svg(f)

LFIG = {
    '5-01': ['l_rects', 'l_boxcube', 'l_parts', 'l_incl', 'l_notcube', 'l_same_diff'],
    '5-02': ['l_parallel', 'l_perp4', 'l_bases', 'l_perp_reason', 'l_corner'],
    '5-03': ['l_views', 'l_hidden', 'l_fix', 'l_count'],
    '5-04': ['l_netlines', 'l_netpairs', 'l_badnet', 'l_cut7', 'l_netperp', 'l_flow5'],
}
F = {k: v for k, v in globals().items() if k.startswith('l_')}
def lfig(tag, i): return F[LFIG[tag][i]]()

def _check():
    assert CF.is_net(NET_G) and CF.is_net([(0, 0), (0, 1), (1, 1), (2, 1), (2, 2), (3, 2)])
    ok = [t for (c, r), t in NET_I_C if CF.is_net(NET_I + [(c, r)])]
    assert ok == ['㉠', '㉤', '㉥'], ok
    assert not CF.is_net([(0, 1), (1, 1), (2, 1), (3, 1), (4, 1), (2, 0)])
_check()

if __name__ == '__main__':
    o = ['<!doctype html><meta charset="utf-8"><title>5단원 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for k, (fn, w) in list(Q2.items()) + list(R3.items()): o.append('<div style="border:1px solid #ccd;margin:8px 0;padding:6px"><b>%s</b><br>%s</div>' % (k, fn()))
    for k, fn in AFIG.items(): o.append('<div style="border:1px dashed #99a;margin:8px 0;padding:6px"><b>다시 %s</b><br>%s</div>' % (k, fn()))
    for tag, ns in LFIG.items():
        for i, n in enumerate(ns): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_5단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p)
