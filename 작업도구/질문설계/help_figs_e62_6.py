# -*- coding: utf-8 -*-
"""초6-2 6단원(원기둥, 원뿔, 구) '긴 설명' 그림(LFIG) · '다시 묻기' 새 그림(AFIG) — draw.py 로 (2026-10-14).
   숫자는 긴 설명의 예와 같게, 다시 묻기와 다르게. 질문 그림(e62_6)과 같은 모양·수는 쓰지 않는다.
   돌려 만드는 '다시 묻기' 그림은 돌리기 전 도형과 축만(완성 입체 = 답). 긴 설명에는 결과를 그려도 된다.
   그림만 보기: python -X utf8 help_figs_e62_6.py → 그림_긴설명_초6-2_6단원.html
"""
import os, sys, math
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
INK, SOFT = D.INK, D.SOFT
GRN, RED, BLUE, ORG = '#2F8A57', '#C0392B', '#3B6FA8', '#B5651D'
EK = D.EK

F = {}
def fig(fn): F[fn.__name__] = fn; return fn
def V(f, note=None): return D.svg(f, note=note) if note else D.svg(f)
def TX(x, y, s, c=INK, sz=12, a='middle', w=700): return D.tag(x, y, s, c, sz, w, a)
def LINES(x, y, rows, gap=22, sz=12.5):
    f = D.Fig()
    for k, r in enumerate(rows):
        t, c = (r if isinstance(r, tuple) else (r, INK))
        f = D.merge(f, TX(x, y + k * gap, t, c, sz, 'start'))
    return f
def LINE(p, q, c=ORG, w=2.4, dash=False): return D.seg(p, q, 'dashed' if dash else 'solid', c, w)

def PRISM(n, r, h, rot=90, cx=0, color='blue'):
    """n각기둥 겨냥도 — 위 밑면은 다 보이고, 뒤쪽 모서리는 점선"""
    P3 = D.PAL[color]; e = P3['edge']
    ang = [math.radians(rot + 360 * i / n) for i in range(n)]
    top = [(cx + r * math.cos(a), r * EK * math.sin(a)) for a in ang]
    bot = [(x, y + h) for x, y in top]
    xs = [p[0] for p in top]; L, R = xs.index(min(xs)), xs.index(max(xs))
    f = D.Fig()
    hull = HULL(top + bot)
    f.add('<polygon points="%s" fill="%s" stroke="none"/>' % (' '.join('%.1f,%.1f' % p for p in hull), P3['left']), top + bot)
    back = [math.sin(a) < -1e-6 for a in ang]
    for i in range(n):
        j = (i + 1) % n
        f = D.merge(f, D.seg(bot[i], bot[j], 'dashed' if (back[i] and back[j]) or (back[i] and i not in (L, R)) or (back[j] and j not in (L, R)) else 'solid', e, 1.4))
        f = D.merge(f, D.seg(top[i], bot[i], 'dashed' if back[i] and i not in (L, R) else 'solid', e, 1.4))
    f.add('<polygon points="%s" fill="%s" stroke="%s" stroke-width="1.6"/>' % (' '.join('%.1f,%.1f' % p for p in top), P3['top'], e), top)
    return f

def HULL(pts):
    P = sorted(set((round(x, 2), round(y, 2)) for x, y in pts))
    def cr(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for q in P:
        while len(lo) >= 2 and cr(lo[-2], lo[-1], q) <= 0: lo.pop()
        lo.append(q)
    for q in reversed(P):
        while len(up) >= 2 and cr(up[-2], up[-1], q) <= 0: up.pop()
        up.append(q)
    return lo[:-1] + up[:-1]

def CYL(r, h, cx=0, top=0, color='blue'): return D.cyl(r, h, cx, top, color)

def NET(r, H, up=0.3, dn=0.65, color='blue', ok=True):
    W = 2 * 3.14 * r
    f = D.merge(D.poly([(0, 0), (W, 0), (W, H), (0, H)], color), D.circle((W * up, -r), r, 'amber'))
    f = D.merge(f, D.circle((W * dn, H + r) if ok else (W * dn, -r), r, 'amber'))
    return f, W

def LYING(r, Lg, x0=0, y0=0, color='blue'):
    P3 = D.PAL[color]; e = P3['edge']; rx = r * EK
    d = 'M%.1f,%.1f L%.1f,%.1f A%.1f,%.1f 0 0 1 %.1f,%.1f L%.1f,%.1f Z' % (x0, y0 - r, x0 + Lg, y0 - r, rx, r, x0 + Lg, y0 + r, x0, y0 + r)
    f = D.path(d, [(x0, y0 - r), (x0 + Lg + rx, y0 + r)], P3['left'], e, 1.6)
    f.add('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s" stroke="%s" stroke-width="1.6"/>' % (x0, y0, rx, r, P3['top'], e),
          [(x0 - rx, y0 - r), (x0 + rx, y0 + r)])
    return f

def SEMI(r, cx=0, cy=0):   # 지름이 세로인 반원(오른쪽으로 볼록)
    return D.path('M%.1f,%.1f A%.1f,%.1f 0 0 1 %.1f,%.1f Z' % (cx, cy - r, r, r, cx, cy + r), [(cx, cy - r), (cx + r, cy + r)], '#E6F4EC', '#3C8B64', 1.6)

# ───────── 6-01 원기둥 ─────────
@fig
def l601_0():
    f = PRISM(5, 62, 92)
    f = D.merge(f, TX(0, -32, '밑면(오각형)', BLUE, 12), TX(0, 92 + 44, '밑면(오각형)', BLUE, 12), TX(78, 52, '옆면 = 직사각형', GRN, 12, 'start'))
    return V(f, note='두 밑면은 서로 평행하고 합동 · 옆면은 모두 직사각형')

@fig
def l601_1():
    r, h = 56, 104
    f = D.merge(CYL(r, h), TX(r + 14, 4, '원', BLUE, 12, 'start'), TX(r + 14, h + 6, '원', BLUE, 12, 'start'),
                D.arrow(r + 30, 14, r + 30, h - 6), TX(r + 40, h / 2 + 4, '평행 · 합동', SOFT, 11.5, 'start'))
    return V(f, note='두 면이 서로 평행하고 합동인 원 → 원기둥')

@fig
def l601_2():
    r, h = 56, 104
    f = D.merge(CYL(r, h, 0, 0, 'green'))
    f.add('<ellipse cx="0" cy="0" rx="%.1f" ry="%.1f" fill="#DCEAFB" stroke="#3B6FA8" stroke-width="2.2"/>' % (r, r * EK), [(-r, -r * EK), (r, r * EK)])
    f = D.merge(f, LINE((r + 16, 0), (r + 16, h), ORG, 2.4), D.seg((r + 10, 0), (r + 22, 0), 'solid', ORG, 1.4), D.seg((r + 10, h), (r + 22, h), 'solid', ORG, 1.4),
                TX(r + 26, h / 2 + 4, '높이', ORG, 12, 'start'), TX(-r - 10, 4, '밑면', BLUE, 12, 'end'), TX(-r - 10, h + 6, '밑면', BLUE, 12, 'end'), TX(0, h / 2 + 4, '옆면(굽은 면)', GRN, 12))
    return V(f, note='두 밑면 사이의 거리 = 높이')

@fig
def l601_3():
    s = 14; w, h = 3 * s, 7 * s
    left = D.merge(D.poly([(0, 0), (w, 0), (w, h), (0, h)], 'blue'), D.spin((0, 0), (0, h), '세로를 기준으로'), D.dim_h(0, w, h + 12, '3 cm'), D.dim_v(0, h, w + 14, '7 cm', left=False))
    right = D.merge(CYL(w, h), D.seg((0, 0), (0, h), 'dashed', '#B55B45', 1.4), LINE((0, h), (w, h), ORG, 2), TX(w / 2, h + w * EK + 16, '반지름 3 cm', ORG, 11.5),
                    D.dim_v(0, h, w + 14, '7 cm', left=False))
    f = D.row([left, right], 70)
    return V(f, note='기준인 세로 7 cm = 높이 · 가로 3 cm = 밑면의 반지름(지름 6 cm)')

@fig
def l601_4():
    a = D.merge(PRISM(6, 50, 86, 0, 0, 'amber'), TX(0, 86 + 42, '육각기둥', INK, 12.5))
    b = D.merge(CYL(50, 86), TX(0, 86 + 42, '원기둥', INK, 12.5))
    f = D.row([a, b], 60)
    return V(f, note='같은 점: 평행하고 합동인 두 밑면 · 다른 점: 밑면 모양 · 옆면 · 꼭짓점과 모서리')

@fig
def l601_5():
    r, Lg = 34, 120
    f = D.merge(LYING(r, Lg, 0, 0), D.seg((-30, r), (Lg + 70, r), 'solid', '#6E6A86', 1.6))
    f = D.merge(f, D.arrow(Lg / 2 - 20, -r - 16, Lg / 2 + 40, -r - 16), TX(Lg / 2 + 10, -r - 26, '굴러감', GRN, 12), TX(Lg / 2, r + 22, '굽은 옆면이 바닥에 닿아요', SOFT, 11.5))
    return V(f)

@fig
def l601_6():
    s = 12
    a = D.merge(CYL(2 * s, 5 * s), D.dim_v(0, 5 * s, 2 * s + 14, '5 cm', left=False), LINE((0, 5 * s), (2 * s, 5 * s), ORG, 2), TX(s, 5 * s + 30, '가로 기준', INK, 12),
                TX(s, 5 * s + 48, '반지름 2 cm · 높이 5 cm', SOFT, 11))
    b = D.merge(CYL(5 * s, 2 * s, 0, 3 * s), D.dim_v(3 * s, 5 * s, 5 * s + 14, '2 cm', left=False), LINE((0, 5 * s), (5 * s, 5 * s), ORG, 2), TX(0, 5 * s + 30, '세로 기준', INK, 12),
                TX(0, 5 * s + 48, '반지름 5 cm · 높이 2 cm', SOFT, 11))
    return V(D.row([a, b], 70), note='가로 5 cm, 세로 2 cm인 직사각형 — 기준이 된 변이 높이')

@fig
def l601_7():
    r, h = 40, 76
    a = D.merge(CYL(r, h), TX(0, h + 40, '원기둥', INK, 12))
    b = D.merge(D.circle((0, h / 2), r, 'blue'), TX(0, h + 40, '위에서 본 모양', INK, 12))
    c = D.merge(D.poly([(-r, 0), (r, 0), (r, h), (-r, h)], 'blue'), TX(0, h + 40, '앞(옆)에서 본 모양', INK, 12))
    return V(D.row([a, b, c], 46))

# ───────── 6-02 원기둥의 전개도 ─────────
@fig
def l602_0():
    a = CYL(30, 70)
    b, W = NET(22, 70)
    f = D.row([a, D.merge(D.arrow(0, 35, 40, 35), TX(20, 25, '펼치기', SOFT, 11)), b], 30)
    return V(f, note='원 2개(밑면) + 직사각형 1개(옆면) — 두 원은 합동')

@fig
def l602_1():
    r = 3 * 9; H = 5 * 14
    f, W = NET(r, H)
    f.add('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="none" stroke="%s" stroke-width="3"/>' % (W * .3, -r, r, BLUE), [])
    f = D.merge(f, LINE((0, H), (W, H), BLUE, 3), LINE((W, 0), (W, H), GRN, 3), TX(W / 2, H + 2 * r + 26, '가로 = 밑면의 둘레 6 × 3.14 = 18.84 cm', BLUE, 12),
                TX(W + 10, H / 2 + 4, '세로 = 높이 5 cm', GRN, 12, 'start'))
    return V(f)

@fig
def l602_2():
    a, W = NET(18, 52)
    b, W2 = NET(18, 52, ok=False)
    a = D.merge(a, TX(W / 2, 52 + 2 * 18 + 28, '○ 위와 아래에 하나씩', GRN, 12))
    b = D.merge(b, TX(W2 / 2, 52 + 2 * 18 + 28, '✕ 같은 쪽에 둘 → 겹침', RED, 12))
    return V(D.row([a, b], 50))

@fig
def l602_3():
    r = 44
    a = D.merge(D.circle((0, 0), r, 'blue'), D.dot((0, r), 'ㄱ', at='below'), D.path('M %.1f %.1f A %.1f %.1f 0 1 1 %.1f %.1f' % (-4, r + 8, r + 8, r + 8, 4, r + 8), [(-r - 8, -r - 8), (r + 8, r + 8)], 'none', ORG, 2.2),
                TX(0, -r - 16, '한 바퀴', ORG, 12))
    b = D.merge(LINE((0, 0), (2 * 3.14 * 30, 0), ORG, 3), D.dot((0, 0), 'ㄱ', at='below'), D.dot((2 * 3.14 * 30, 0), 'ㄱ', at='below'), TX(3.14 * 30, -12, '곧게 펴면 = 밑면의 둘레', ORG, 12))
    return V(D.row([a, D.merge(D.arrow(0, 0, 36, 0)), b], 26), note='옆면의 가로 = 밑면 둘레를 한 바퀴 돈 길이')

@fig
def l602_4():
    s = 16; W, H = 6.28 * s, 6 * s
    f = D.merge(D.poly([(0, 0), (W, 0), (W, H), (0, H)], 'blue'), D.dim_h(0, W, H + 12, '2 × 3.14 = 6.28 cm'), D.dim_v(0, H, W + 14, '6 cm', left=False),
                LINES(W + 70, 30, ['옆면 = 직사각형', '넓이 = 가로 × 세로', ('6.28 × 6 = 37.68 cm²', ORG)]))
    return V(f, note='밑면의 반지름 1 cm, 높이 6 cm인 원기둥의 옆면')

# ───────── 6-03 원뿔 ─────────
@fig
def l603_0():
    r, h = 60, 110
    f = D.merge(D.cone(r, h), D.dot((0, 0), '원뿔의 꼭짓점', at='above'), TX(r + 12, h + 8, '밑면(원)', BLUE, 12, 'start'), TX(r * .55 + 14, h * .45, '옆면(굽은 면)', GRN, 12, 'start'))
    return V(f)

@fig
def l603_1():
    r, h = 60, 110
    f = D.merge(D.cone(r, h), LINE((0, 0), (0, h), GRN, 2.4), D.right_angle((0, h), (0, 0), (r, h), 9), LINE((0, 0), (-r, h), ORG, 2.6), D.dot((0, h)),
                TX(-r / 2 - 14, h / 2, '모선', ORG, 12, 'end'), TX(r + 10, h * .62, '높이(초록 선)', GRN, 12, 'start'))
    return V(f, note='모선: 꼭짓점 → 밑면 둘레의 한 점 · 높이: 꼭짓점 → 밑면에 수직')

@fig
def l603_2():
    s = 20; w, h = 3 * s, 4 * s
    left = D.merge(D.poly([(0, 0), (0, h), (w, h)], 'green'), D.right_angle((0, h), (0, 0), (w, h)), D.spin((0, 0), (0, h), '높이를 기준으로'),
                   D.dim_h(0, w, h + 12, '3 cm'), D.dim_v(0, h, -12, '4 cm'))
    right = D.merge(D.cone(w, h), D.seg((0, 0), (0, h), 'dashed', '#B55B45', 1.3), LINE((0, h), (w, h), ORG, 2), TX(w / 2, h + w * EK + 16, '반지름 3 cm', ORG, 11.5),
                    D.dim_v(0, h, -w - 14, '4 cm'))
    return V(D.row([left, right], 80), note='기준 변 4 cm = 높이 · 밑변 3 cm = 밑면의 반지름 · 빗변 = 모선')

@fig
def l603_3():
    s = 22; r, h = 3 * s, 4 * s
    f = D.merge(D.poly([(-r, h), (r, h), (0, 0)], 'rose'), LINE((0, 0), (0, h), GRN, 2.4), LINE((0, h), (r, h), BLUE, 2.4), LINE((0, 0), (r, h), ORG, 2.8),
                D.right_angle((0, h), (0, 0), (r, h), 9), TX(-r / 2 - 12, h / 2 + 4, '높이 4 cm(초록 선)', GRN, 11.5, 'end'), TX(r / 2, h + 18, '반지름 3 cm', BLUE, 11.5),
                TX(r / 2 + 12, h / 2 - 6, '모선 5 cm', ORG, 11.5, 'start'))
    return V(f, note='꼭짓점과 밑면의 중심을 지나게 자른 면 — 모선이 가장 긴 변')

@fig
def l603_4():
    r, h = 66, 110; ry = r * EK
    f = D.cone(r, h)
    for k in range(9):
        p = (r * math.cos(math.radians(180 + k * 22.5)), h + ry * math.sin(math.radians(k * 22.5)))
        f = D.merge(f, LINE((0, 0), p, ORG, 1.6), D.dot(p))
    return V(f, note='밑면 둘레의 점마다 모선 — 셀 수 없이 많고 길이가 모두 같아요')

@fig
def l603_5():
    r, h = 44, 80
    a = D.merge(D.cone(r, h), TX(0, h + 36, '원뿔', INK, 12))
    b = D.merge(D.poly([(-r, h), (r, h), (0, 0)], 'rose'), TX(0, h + 36, '앞에서 본 모양', INK, 12), TX(0, h + 16, '이등변삼각형', SOFT, 11))
    c = D.merge(D.circle((0, h / 2), r, 'rose'), D.dot((0, h / 2)), TX(0, h + 36, '위에서 본 모양', INK, 12), TX(0, h + 16 + 0, '원', SOFT, 11))
    return V(D.row([a, b, c], 44))

# ───────── 6-04 구 ─────────
@fig
def l604_0():
    r = 62
    a, b = (r * .71, -r * .71), (-r * .5, r * .87)
    f = D.merge(D.sphere(r), LINE((0, 0), a, ORG, 2.2), LINE((0, 0), b, ORG, 2.2), D.dot((0, 0)), D.dot(a), D.dot(b),
                TX(r * .71 + 8, -r * .71 - 6, '반지름', ORG, 12, 'start'), TX(-r * .5 - 10, r * .87 + 14, '반지름', ORG, 12, 'end'),
                D.arrow(r + 40, 6, 8, 2), TX(r + 44, 10, '구의 중심', INK, 12, 'start'))
    return V(f, note='구의 중심과 겉면의 한 점을 이은 선분 = 구의 반지름')

@fig
def l604_1():
    s = 16; r = 4 * s
    left = D.merge(SEMI(r), D.spin((0, -r), (0, r), '지름을 기준으로'), D.dot((0, 0)), LINE((0, 0), (r, 0), ORG, 2), TX(r / 2, -8, '4 cm', ORG, 11.5))
    right = D.merge(D.sphere(r), D.dot((0, 0)), LINE((0, 0), (r, 0), ORG, 2), TX(r / 2, -r * EK - 8, '4 cm', ORG, 11.5))
    return V(D.row([left, D.merge(D.arrow(0, 0, 40, 0)), right], 30), note='반원의 반지름 = 구의 반지름 (지름 8 cm)')

@fig
def l604_2():
    r = 40
    a = D.merge(D.circle((0, 0), r, 'blue'), TX(0, r + 24, '원기둥', INK, 12))
    b = D.merge(D.circle((0, 0), r, 'rose'), D.dot((0, 0)), TX(0, r + 24, '원뿔', INK, 12))
    c = D.merge(D.circle((0, 0), r, 'green'), TX(0, r + 24, '구', INK, 12))
    return V(D.row([a, b, c], 44), note='위에서 본 모양 — 모두 원 · 셋 다 굽은 면이 있어요')

@fig
def l604_3():
    cols = [('원기둥', 'blue'), ('원뿔', 'rose'), ('구', 'green')]; rows = ['앞에서 본 모양', '밑면의 수', '꼭짓점']
    vals = [['직사각형', '삼각형', '원'], ['2개', '1개', '없음'], ['없음', '있음', '없음']]
    cw, rh, x0 = 100, 34, 116
    f = D.Fig()
    for j, (n, c) in enumerate(cols):
        f = D.merge(f, D.poly([(x0 + j * cw, 0), (x0 + (j + 1) * cw, 0), (x0 + (j + 1) * cw, rh), (x0 + j * cw, rh)], c), TX(x0 + j * cw + cw / 2, 22, n, INK, 12.5))
    for i, rname in enumerate(rows):
        y = (i + 1) * rh
        f = D.merge(f, D.poly([(0, y), (x0, y), (x0, y + rh), (0, y + rh)], 'amber'), TX(x0 / 2, y + 22, rname, INK, 12))
        for j in range(3):
            f = D.merge(f, D.poly([(x0 + j * cw, y), (x0 + (j + 1) * cw, y), (x0 + (j + 1) * cw, y + rh), (x0 + j * cw, y + rh)], 'blue', fill=False), TX(x0 + j * cw + cw / 2, y + 22, vals[i][j], INK, 12))
    return V(f)

@fig
def l604_4():
    a = D.merge(CYL(40, 70), D.seg((-60, 70 + 40 * EK), (60, 70 + 40 * EK), 'solid', '#6E6A86', 1.6), TX(0, 70 + 40, '평평한 밑면 2개', SOFT, 11.5))
    b = D.merge(D.sphere(44, (0, 70 - 44 + 40 * EK)), D.seg((-60, 70 + 40 * EK), (60, 70 + 40 * EK), 'solid', '#6E6A86', 1.6), D.dot((0, 70 + 40 * EK)),
                TX(0, 70 + 40, '한 점만 닿아요 · 밑면 없음', SOFT, 11.5))
    return V(D.row([a, b], 60))

@fig
def l604_5():
    b = D.Fig(); xs = [0, 175, 350]
    texts = [('① 돌린 도형', '기준 변 = 높이, 다른 변 = 반지름'), ('② 지름? 반지름?', '앞에서 본 밑변 = 지름'), ('③ 전개도', '옆면의 가로 = 밑면의 둘레')]
    for k, (t1, t2) in enumerate(texts):
        x = xs[k]
        b = D.merge(b, D.poly([(x, 0), (x + 162, 0), (x + 162, 50), (x, 50)], 'blue' if k < 2 else 'amber'), TX(x + 81, 21, t1, INK, 12), TX(x + 81, 40, t2, SOFT, 10.5))
        if k < 2: b = D.merge(b, D.arrow(x + 164, 25, x + 173, 25))
    return V(b)

# ───────── 다시 묻기 새 그림 ─────────
@fig
def a601_3():   # 가로 6 cm, 세로 5 cm · 세로를 기준으로 (결과 원기둥은 안 그림)
    s = 12; w, h = 6 * s, 5 * s
    return V(D.merge(D.poly([(0, 0), (w, 0), (w, h), (0, h)], 'amber'), D.spin((0, 0), (0, h), '세로를 기준으로 한 바퀴'),
                     D.dim_h(0, w, h + 12, '6 cm'), D.dim_v(0, h, w + 14, '5 cm', left=False)))

@fig
def a602_2():   # 두 밑면이 모두 옆면 아래에 붙은 전개도
    r = 17; W = 2 * 3.14 * r; H = 58
    f = D.merge(D.poly([(0, 0), (W, 0), (W, H), (0, H)], 'blue'), D.circle((r + 8, H + r), r, 'amber'), D.circle((W - r - 8, H + r), r, 'amber'))
    return V(f, note='친구가 그린 전개도')

@fig
def a603_2():   # 밑변 7 cm, 높이 9 cm 직각삼각형 · 높이를 기준으로
    s = 10; w, h = 7 * s, 9 * s
    return V(D.merge(D.poly([(0, 0), (0, h), (w, h)], 'rose'), D.right_angle((0, h), (0, 0), (w, h)), D.spin((0, 0), (0, h), '높이를 기준으로 한 바퀴'),
                     D.dim_h(0, w, h + 12, '7 cm'), D.dim_v(0, h, -12, '9 cm')))

LFIG = {
    '6-01': ['l601_0', 'l601_1', 'l601_2', 'l601_3', 'l601_4', 'l601_5', 'l601_6', 'l601_7'],
    '6-02': ['l602_0', 'l602_1', 'l602_2', 'l602_3', 'l602_4'],
    '6-03': ['l603_0', 'l603_1', 'l603_2', 'l603_3', 'l603_4', 'l603_5'],
    '6-04': ['l604_0', 'l604_1', 'l604_2', 'l604_3', 'l604_4', 'l604_5'],
}
AFIG = {('6-01', 3): F['a601_3'], ('6-02', 2): F['a602_2'], ('6-03', 2): F['a603_2']}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for (tag, i), fn in AFIG.items(): o.append('<div style="border:1px dashed #99c;margin:8px 0;padding:6px"><b>다시 묻기 %s · %d · %s</b><br>%s</div>' % (tag, i + 1, fn.__name__, fn()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초6-2_6단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()), len(AFIG))
