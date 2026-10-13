# -*- coding: utf-8 -*-
"""초6-2 5단원(원의 둘레와 넓이) '긴 설명' 그림(LFIG) · '다시 묻기' 새 그림(AFIG) — draw.py 로 (2026-10-14).
   숫자는 긴 설명의 예와 같게, 다시 묻기와 다르게. 질문 그림(e62_5)과 같은 모양·수는 쓰지 않는다.
   그림만 보기: python -X utf8 help_figs_e62_5.py → 그림_긴설명_초6-2_5단원.html
"""
import os, sys, math
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
SF, SE = D.SHADE
INK, SOFT = D.INK, D.SOFT
GRN, RED, BLUE, ORG = '#2F8A57', '#C0392B', '#3B6FA8', '#B5651D'

F = {}
def fig(fn): F[fn.__name__] = fn; return fn
def V(f, note=None): return D.svg(f, note=note) if note else D.svg(f)
def TX(x, y, s, c=INK, sz=13, a='start', w=700): return D.tag(x, y, s, c, sz, w, a)
def LINES(x, y, rows, gap=24, sz=13):
    f = D.Fig()
    for k, r in enumerate(rows):
        if isinstance(r, tuple): f = D.merge(f, TX(x, y + k * gap, r[0], r[1], sz))
        else: f = D.merge(f, TX(x, y + k * gap, r, INK, sz))
    return f
def CIR(c, r, label=None, color='blue', fill=True, dash=False):
    f = D.circle(c, r, color, fill=fill, style='dashed' if dash else 'solid')
    if label: f = D.merge(f, D.tag(c[0], c[1] + r + 18, label, INK, 12))
    return f
def RAD(c, r, text, ang=0):
    x = c[0] + r * math.cos(math.radians(ang)); y = c[1] - r * math.sin(math.radians(ang))
    return D.merge(D.seg(c, (x, y), 'solid', '#6E6A86', 1.3), D.dot(c), D.tag((c[0] + x) / 2, (c[1] + y) / 2 - 6, text, INK, 11.5))
def HEX(r, rot=0): return [(r * math.cos(math.radians(60 * i + rot)), r * math.sin(math.radians(60 * i + rot))) for i in range(6)]

# ───────── 5-01 원주와 원주율 ─────────
@fig
def l501_0():
    r = 60
    f = D.merge(CIR((0, 0), r), D.seg((-r, 0), (r, 0), 'solid', BLUE, 2), D.seg((0, 0), (r * .6, -r * .8), 'solid', ORG, 2), D.dot((0, 0), 'ㅇ', at='left'))
    f = D.merge(f, D.tag(0, r + 20, '지름 12 cm (파란 선)', BLUE, 12), D.tag(r * .6 + 8, -r * .8 - 4, '반지름 6 cm', ORG, 12, 700, 'start'))
    return V(f, note='중심을 지나는 선분 = 지름 · 중심과 원 위의 한 점 = 반지름')

@fig
def l501_1():
    f = D.row([D.merge(D.circle((0, 0), 30, 'blue', sw=3.2), D.tag(0, 52, '지름 2 cm', INK, 12)),
               D.merge(D.circle((0, 0), 60, 'blue', sw=3.2), D.tag(0, 82, '지름 4 cm', INK, 12))], 60)
    return V(f, note='굵은 둘레가 원주 — 지름이 길어지면 원주도 길어져요')

@fig
def a501_2():
    r = 56; hx = HEX(r, 30)
    f = D.merge(D.poly([(-r, -r), (r, -r), (r, r), (-r, r)], 'amber', fill=False), D.circle((0, 0), r, 'blue'), D.poly(hx, 'green', fill=False),
                D.dim_h(-r, r, r + 14, '4 cm'))
    return V(f)

@fig
def l501_2():
    s = 8; f = D.Fig()
    for k, (lab, v, col) in enumerate([('정육각형의 둘레', 30, 'green'), ('원주', 31.4, 'blue'), ('정사각형의 둘레', 40, 'amber')]):
        y = k * 34
        f = D.merge(f, D.poly([(0, y), (v * s, y), (v * s, y + 18), (0, y + 18)], col), TX(-8, y + 14, lab, INK, 12, 'end'), TX(v * s + 8, y + 14, ('%g cm' % v), INK, 12))
    return V(f, note='지름 10 cm인 원 — 30 cm < 원주 < 40 cm')

@fig
def l501_3():
    f = D.row([D.merge(CIR((0, 0), 20), TX(0, 44, '지름 2 cm', INK, 11.5, 'middle'), TX(0, 64, '원주 6.28 cm', INK, 11.5, 'middle'), TX(0, 86, '6.28 ÷ 2 = 3.14', BLUE, 12, 'middle')),
               D.merge(CIR((0, 0), 50), TX(0, 74, '지름 5 cm', INK, 11.5, 'middle'), TX(0, 94, '원주 15.7 cm', INK, 11.5, 'middle'), TX(0, 116, '15.7 ÷ 5 = 3.14', BLUE, 12, 'middle'))], 70)
    return V(f, note='원주율 = 원주 ÷ 지름 = 3.1415926… → 3.14')

@fig
def l501_4():
    f = D.row([D.merge(CIR((0, 0), 30), TX(0, 54, '9.42 ÷ 3 = 3.14', BLUE, 12, 'middle')),
               D.merge(CIR((0, 0), 60), TX(0, 84, '18.84 ÷ 6 = 3.14', BLUE, 12, 'middle'))], 60)
    return V(f, note='지름 3 cm · 6 cm — 원이 커져도 원주 ÷ 지름은 같아요')

@fig
def l501_5():
    f = D.merge(RAD((0, 0), 50, '6 cm', 0), D.circle((0, 0), 50, 'blue', fill=False))
    g = LINES(80, -10, [('✗ 37.68 ÷ 6 = 6.28 (반지름으로 나눔)', RED), ('✓ 37.68 ÷ 12 = 3.14 (지름으로 나눔)', GRN)])
    return V(D.merge(f, g), note='원주 37.68 cm · 반지름 6 cm')

@fig
def l501_6():
    s = 8; y = 30; f = D.seg((25 * s, y), (47 * s, y), 'solid', '#6E6A86', 1.6)
    for v in (33, 44):
        f = D.merge(f, D.seg((v * s, y - 6), (v * s, y + 6), 'solid', '#6E6A86', 1.4), D.tag(v * s, y + 22, '%d cm' % v, INK, 12))
    f = D.merge(f, D.dot((34.54 * s, y), '원주 34.54 cm', at='above'), D.tag(33 * s, y - 34, '지름 × 3', SOFT, 11), D.tag(44 * s, y - 34, '지름 × 4', SOFT, 11))
    return V(f, note='지름 11 cm — 원주는 33 cm보다 길고 44 cm보다 짧아요')

# ───────── 5-02 원주와 지름 ─────────
@fig
def l502_0():
    r = 54; f = D.merge(D.circle((0, 0), r, 'blue'), D.seg((-r, 0), (r, 0), 'solid', BLUE, 2), D.tag(0, -8, '9 cm', INK, 12))
    return V(D.merge(f, LINES(r + 30, -6, ['원주 = 지름 × 원주율', ('9 × 3.14 = 28.26 cm', BLUE)])))

@fig
def l502_1():
    f = D.merge(D.circle((0, 0), 54, 'blue', sw=3), D.tag(0, 76, '원주 56.52 cm', INK, 12))
    return V(D.merge(f, LINES(84, -6, ['지름 = 원주 ÷ 원주율', ('56.52 ÷ 3.14 = 18 cm', BLUE)])))

@fig
def l502_2():
    f = D.merge(D.circle((0, 0), 40, 'blue'), RAD((0, 0), 40, '3 cm', 30))
    return V(D.merge(f, LINES(64, -10, [('✗ 3 × 3.14 = 9.42 cm', RED), ('✓ 6 × 3.14 = 18.84 cm', GRN)])), note='원주는 반지름이 아니라 지름에 원주율을 곱해요')

@fig
def l502_3():
    f = LINES(0, 0, ['원주 25.12 cm', '→ 지름 = 25.12 ÷ 3.14 = 8 cm', ('→ 반지름 = 8 ÷ 2 = 4 cm', BLUE)], 28)
    return V(D.merge(D.circle((-60, 20), 36, 'blue'), D.seg((-96, 20), (-24, 20), 'dashed', '#6E6A86', 1.2), f))

@fig
def l502_4():
    f = D.row([D.merge(CIR((0, 0), 25), TX(0, 48, '지름 5 cm', INK, 11.5, 'middle'), TX(0, 68, '원주 15.7 cm', BLUE, 12, 'middle')),
               D.merge(CIR((0, 0), 50), TX(0, 74, '지름 10 cm', INK, 11.5, 'middle'), TX(0, 94, '원주 31.4 cm', BLUE, 12, 'middle'))], 70)
    return V(f, note='지름이 2배 → 원주도 2배')

# ───────── 5-03 원의 넓이 어림 ─────────
@fig
def a503_0():
    r = 50
    f = D.merge(D.poly([(-r, -r), (r, -r), (r, r), (-r, r)], 'rose', fill=False), D.circle((0, 0), r, 'blue'),
                D.poly([(0, -r), (r, 0), (0, r), (-r, 0)], 'green', fill=False), D.seg((0, 0), (-r * .7071, -r * .7071), 'solid', '#6E6A86', 1.3), D.dot((0, 0)), D.tag(-r * .5, -r * .2, '4 cm', INK, 12))
    return V(f)

@fig
def l503_0():
    r = 60
    f = D.merge(D.poly([(-r, -r), (r, -r), (r, r), (-r, r)], 'rose'), D.circle((0, 0), r, 'blue'), D.poly([(0, -r), (r, 0), (0, r), (-r, 0)], 'green'),
                D.dim_h(-r, r, r + 14, '10 cm'))
    return V(D.merge(f, LINES(r + 30, -16, [('원 안 정사각형 10 × 10 ÷ 2 = 50 cm²', GRN), ('원 밖 정사각형 10 × 10 = 100 cm²', RED), '→ 50 cm² < 원의 넓이 < 100 cm²'])))

@fig
def l503_1():
    s = 18; r = 4; f = D.Fig()
    for i in range(-5, 5):
        for j in range(-5, 5):
            xs, ys = [i, i + 1], [j, j + 1]
            far = max(math.hypot(x, y) for x in xs for y in ys)
            near = math.hypot(min(max(0, i), i + 1), min(max(0, j), j + 1))
            col = '#BFD7F2' if far <= r else ('#FBE3B8' if near < r else '#FFFFFF')
            f.add('<rect x="%g" y="%g" width="%g" height="%g" fill="%s" stroke="#C9CFDB" stroke-width="0.8"/>' % (i * s, j * s, s, s, col), [(i * s, j * s), ((i + 1) * s, (j + 1) * s)])
    f = D.merge(f, D.circle((0, 0), r * s, 'blue', fill=False, sw=2))
    g = LINES(5 * s + 24, -40, [('파란 칸(원 안에 쏙) 32칸', BLUE), ('파란 칸 + 주황 칸(원을 다 덮음) 60칸', ORG), '→ 32 cm² < 원의 넓이 < 60 cm²'], 26, 12.5)
    return V(D.merge(f, g), note='반지름 4 cm · 1칸 = 1 cm²')

@fig
def l503_2():
    r = 50
    f = D.merge(D.circle((0, 0), r, 'blue'), D.poly([(0, -r), (r, 0), (0, r), (-r, 0)], 'green'),
                D.seg((-r, 0), (r, 0), 'dashed', ORG, 1.6), D.seg((0, -r), (0, r), 'dashed', ORG, 1.6), D.tag(r / 2, -6, '6 cm', ORG, 12))
    return V(D.merge(f, LINES(r + 30, -6, ['두 대각선 = 지름 6 cm', ('6 × 6 ÷ 2 = 18 cm²', BLUE)])), note='반지름 3 cm — 원 안 정사각형은 대각선이 지름인 마름모')

@fig
def l503_3():
    r = 40
    f = D.merge(D.poly([(-r, -r), (r, -r), (r, r), (-r, r)], 'rose'), D.circle((0, 0), r, 'blue'), RAD((0, 0), r, '2 cm', 0), D.dim_h(-r, r, r + 14, '4 cm'))
    return V(D.merge(f, LINES(r + 30, -10, [('✗ 2 × 2 = 4 cm²', RED), ('✓ 4 × 4 = 16 cm²', GRN)])), note='원 밖 정사각형의 한 변 = 지름')

# ───────── 5-04 원의 넓이 ─────────
@fig
def l504_0():
    n = 8; r = 46; w = math.pi * r / n * 2
    f = D.Fig()
    for k in range(n):   # 부채꼴을 위아래로 엇갈려 놓아 직사각형에 가깝게
        x = k * w / 2
        up = k % 2 == 0
        if up: pts = [(x, r), (x + w / 2, 0), (x + w, r)]
        else: pts = [(x, 0), (x + w / 2, r), (x + w, 0)]
        f = D.merge(f, D.poly(pts, 'blue' if up else 'amber'))
    L = (n + 1) * w / 2
    f = D.merge(f, D.dim_h(0, L - w / 2, r + 14, '원주 × 1/2'), D.tag(-8, r / 2 + 5, '반지름', INK, 12, 700, 'end'))
    return V(f, note='원을 잘게 잘라 붙이면 가로 = 원주 × 1/2, 세로 = 반지름인 직사각형에 가까워요')

@fig
def l504_1():
    r = 54; f = D.merge(D.circle((0, 0), r, 'blue'), RAD((0, 0), r, '6 cm', 20))
    return V(D.merge(f, LINES(r + 30, 0, ['넓이 = 반지름 × 반지름 × 원주율', ('6 × 6 × 3.14 = 113.04 cm²', BLUE)])))

@fig
def l504_2():
    f = D.row([D.merge(CIR((0, 0), 20), TX(0, 44, '반지름 2 cm', INK, 11.5, 'middle'), TX(0, 64, '12.56 cm²', BLUE, 12, 'middle')),
               D.merge(CIR((0, 0), 60), TX(0, 84, '반지름 6 cm', INK, 11.5, 'middle'), TX(0, 104, '113.04 cm²', BLUE, 12, 'middle'))], 70)
    return V(f, note='반지름이 3배 → 넓이는 3 × 3 = 9배')

@fig
def l504_3():
    r = 45; f = D.merge(D.circle((0, 0), r, 'blue'), D.seg((-r, 0), (r, 0), 'solid', BLUE, 2), D.tag(0, -8, '6 cm', INK, 12))
    return V(D.merge(f, LINES(r + 30, -10, [('✗ 6 × 6 × 3.14 (지름을 곱함)', RED), ('✓ 3 × 3 × 3.14 = 28.26 cm²', GRN)])))

@fig
def l504_4():
    f = LINES(0, 0, ['원주 18.84 cm', '→ 지름 18.84 ÷ 3.14 = 6 cm', '→ 반지름 3 cm', ('→ 넓이 3 × 3 × 3.14 = 28.26 cm²', BLUE)], 28)
    return V(D.merge(D.circle((-56, 34), 32, 'blue', sw=3), f))

# ───────── 5-05 원의 둘레와 넓이 활용 ─────────
@fig
def l505_0():
    r = 60
    f = D.merge(D.path('M %g 0 A %g %g 0 0 1 %g 0 Z' % (-r, r, r, r), [(-r, -r), (r, 0)], fill='#E8F1FC', stroke=BLUE, sw=1.6),
                D.path('M %g 0 A %g %g 0 0 1 %g 0' % (-r, r, r, r), [(-r, -r), (r, 0)], fill='none', stroke=ORG, sw=3.2),
                D.seg((-r, 0), (r, 0), 'solid', GRN, 3), D.tag(0, 18, '지름 10 cm', GRN, 12), D.tag(0, -r - 10, '곡선 = 원주의 반', ORG, 12))
    return V(D.merge(f, LINES(r + 26, -20, [('곡선 10 × 3.14 ÷ 2 = 15.7 cm', ORG), ('직선 10 cm', GRN), '둘레 15.7 + 10 = 25.7 cm'])))

@fig
def a505_1():
    a = 108; r = a / 2
    d = 'M 0 0 H %g V %g H 0 Z M 0 %g A %g %g 0 1 0 %g %g A %g %g 0 1 0 0 %g Z' % (a, a, r, r, r, a, r, r, r, r)
    return V(D.merge(D.path(d, [(0, 0), (a, a)], fill=SF, stroke=SE, sw=1.5, evenodd=True), D.dim_h(0, a, a + 12, '6 cm')))

@fig
def l505_1():
    a = 96; r = a / 2
    d = 'M 0 0 H %g V %g H 0 Z M 0 %g A %g %g 0 1 0 %g %g A %g %g 0 1 0 0 %g Z' % (a, a, r, r, r, a, r, r, r, r)
    f = D.merge(D.path(d, [(0, 0), (a, a)], fill=SF, stroke=SE, sw=1.5, evenodd=True), D.dim_h(0, a, a + 12, '4 cm'))
    return V(D.merge(f, LINES(a + 24, 22, ['정사각형 4 × 4 = 16 cm²', '원 2 × 2 × 3.14 = 12.56 cm²', ('색칠한 부분 16 − 12.56 = 3.44 cm²', ORG)])))

@fig
def a505_2():
    s = 16; w, h = 8 * s, 5 * s; r = w / 2
    d = 'M 0 0 A %g %g 0 0 0 %g 0 L %g %g A %g %g 0 0 1 0 %g Z' % (r, r, w, w, h, r, r, h)
    return V(D.merge(D.path(d, [(0, 0), (w, h + r)], fill=SF, stroke=SE, sw=1.5), D.seg((0, 0), (w, 0), 'dashed', '#6E6A86', 1.1),
                     D.seg((0, h), (w, h), 'dashed', '#6E6A86', 1.1), D.dim_h(0, w, -12, '8 cm', below=False), D.dim_v(0, h, -12, '5 cm')))

@fig
def l505_2():
    s = 22; w, h = 4 * s, 3 * s; r = w / 2
    d = 'M 0 0 A %g %g 0 0 0 %g 0 L %g %g A %g %g 0 0 1 0 %g Z' % (r, r, w, w, h, r, r, h)
    left = D.merge(D.path(d, [(0, 0), (w, h + r)], fill=SF, stroke=SE, sw=1.5), D.dim_h(0, w, -12, '4 cm', below=False), D.dim_v(0, h, -12, '3 cm'),
                   D.arrow(w + 14, h + r * .6, w + 14, r * .4), D.tag(w + 22, h / 2 + 10, '옮김', SOFT, 11, 700, 'start'))
    right = D.merge(D.poly([(0, 0), (w, 0), (w, h), (0, h)], 'amber'), D.tag(w / 2, h + 22, '4 × 3 = 12 cm²', INK, 12))
    return V(D.row([left, right], 70), note='아래 반원을 위로 옮기면 직사각형')

@fig
def l505_3():
    r = 90
    f = D.merge(D.path('M 0 0 L %g 0 A %g %g 0 0 0 0 %g Z' % (r, r, r, -r), [(0, -r), (r, 0)], fill='#E8F1FC', stroke=BLUE, sw=1.2),
                D.path('M %g 0 A %g %g 0 0 0 0 %g' % (r, r, r, -r), [(0, -r), (r, 0)], fill='none', stroke=ORG, sw=3.2),
                D.seg((0, 0), (r, 0), 'solid', GRN, 3), D.seg((0, 0), (0, -r), 'solid', GRN, 3), D.tag(r / 2, 18, '4 cm', GRN, 12))
    return V(D.merge(f, LINES(r + 30, -50, [('곡선 8 × 3.14 ÷ 4 = 6.28 cm', ORG), ('직선 반지름 2개 = 8 cm', GRN), '둘레 6.28 + 8 = 14.28 cm'])))

@fig
def l505_4():
    b = D.Fig(); xs = [0, 170, 340]
    texts = [('① 반지름? 지름?', '무엇을 알려 줬나'), ('② 원주 = 지름 × 3.14', '넓이 = 반지름 × 반지름 × 3.14'), ('③ 색칠한 부분', '나누기 · 빼기 · 옮기기')]
    for k, (t1, t2) in enumerate(texts):
        x = xs[k]
        b = D.merge(b, D.poly([(x, 0), (x + 155, 0), (x + 155, 50), (x, 50)], 'blue' if k < 2 else 'amber'), D.tag(x + 77, 21, t1, INK, 12), D.tag(x + 77, 40, t2, SOFT, 10.5))
        if k < 2: b = D.merge(b, D.arrow(x + 157, 25, x + 168, 25))
    return V(b)

LFIG = {
    '5-01': ['l501_0', 'l501_1', 'l501_2', 'l501_3', 'l501_4', 'l501_5', 'l501_6'],
    '5-02': ['l502_0', 'l502_1', 'l502_2', 'l502_3', 'l502_4'],
    '5-03': ['l503_0', 'l503_1', 'l503_2', 'l503_3'],
    '5-04': ['l504_0', 'l504_1', 'l504_2', 'l504_3', 'l504_4'],
    '5-05': ['l505_0', 'l505_1', 'l505_2', 'l505_3', 'l505_4'],
}
AFIG = {('5-01', 2): F['a501_2'], ('5-03', 0): F['a503_0'], ('5-05', 1): F['a505_1'], ('5-05', 2): F['a505_2']}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for (tag, i), fn in AFIG.items(): o.append('<div style="border:1px dashed #99c;margin:8px 0;padding:6px"><b>다시 묻기 %s · %d · %s</b><br>%s</div>' % (tag, i + 1, fn.__name__, fn()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초6-2_5단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()), len(AFIG))
