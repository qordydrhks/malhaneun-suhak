# -*- coding: utf-8 -*-
"""초6-2 「5. 원의 넓이」 「6. 원기둥, 원뿔, 구」 질문 그림 (2026-09-28)

고른 기준 — 대전제 세부 원칙(2026-09-23) 그대로
  ✅ 그림이 **조건**을 주는 질문에만 — 특히 「색칠한 부분」 활용 문제는 그림이 없으면 답할 수 없다
  ❌ 뜻·성질 질문에는 안 넣는다 ("원주율이 뭐야?" · "원뿔의 모선이 뭐야?")
  ❌ 답이 되는 것은 그리지 않는다 — 유도 그림에 '원주의 1/2'·'반지름' 라벨 금지 ·
     돌려 만든 입체 질문에 완성된 입체 금지 · 모선이 빗변임을 보여 주는 그림 금지
  ❌ 같은 모양을 두 질문에 쓰지 않는다 — 비슷한 질문 쌍은 하나만 그린다

살아 있는 질문 73개 중 18개.
"""
import os, sys, math, importlib.util
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)

FIGS = {}
SF, SE = D.SHADE
RED = '#B55B45'

def _pt(c, r, deg):
    t = math.radians(deg)
    return (c[0] + r * math.cos(t), c[1] + r * math.sin(t))

# ══════════════════════════════════ 5. 원의 넓이 ══════════════════════════════════

# 5-01 계단2칸 — 원 안의 정육각형 · 원 밖의 정사각형 (둘레 수치는 적지 않는다 = 답)
def _f501():
    c, r = (0, 0), 64
    hexa = [_pt(c, r, -90 + 60 * i) for i in range(6)]
    sq = [(-r, -r), (r, -r), (r, r), (-r, r)]
    f = D.merge(
        D.poly(sq, 'amber', fill=False),
        D.circle(c, r, 'blue'),
        D.poly(hexa, 'green', fill=False),
        D.seg((-r, 0), (r, 0), 'dashed', '#6E6A86', 1.2),
        D.tag(0, -8, '지름', D.SOFT, 11.5, 600),
    )
    return D.svg(f, note='원 안에 정육각형, 원 밖에 정사각형을 그렸어요.')
FIGS['c501'] = _f501()

# 5-02 1회차 — 지름 60 cm 굴렁쇠를 한 바퀴 굴림
def _f502():
    r = 34
    g = 100
    f = D.merge(
        D.seg((-10, g), (3.2 * r * 2 + 70, g), 'solid', '#8A7BB0', 2),
        D.circle((r, g - r), r, 'amber', fill=False, sw=3),
        D.seg((0, g - r), (2 * r, g - r), 'solid', '#A97C22', 1.2),
        D.tag(r, g - r - 7, '60 cm', D.SOFT, 12),
        D.dot((r, g), None, RED),
        D.circle((r + 2 * r * 3.14, g - r), r, '#FFFFFF00', fill=False, style='dashed', sw=1.4),
        D.dot((r + 2 * r * 3.14, g), None, RED),
        D.dim_h(r, r + 2 * r * 3.14, g + 16, '?'),
        D.tag(r + r * 3.14, g - 2 * r - 12, '한 바퀴 굴렸어요 →', RED, 11.5, 600),
    )
    return D.svg(f)
FIGS['c502'] = _f502()

# 5-03 2회차 — 모눈 위의 원 (칸을 칠하지 않는다 = 어림하는 방법이 답)
def _f503a():
    u, n = 15, 12
    g = D.Fig()
    for i in range(n + 1):
        g = D.merge(g, D.seg((i * u, 0), (i * u, n * u), 'solid', '#DCE6F5', 1),
                       D.seg((0, i * u), (n * u, i * u), 'solid', '#DCE6F5', 1))
    f = D.merge(g, D.circle((6 * u, 6 * u), 5 * u, 'blue', fill=False, sw=2))
    return D.svg(f, note='모눈 한 칸은 1 cm²예요.')
FIGS['c503a'] = _f503a()

# 5-03 1회차 — 원 안의 정사각형 · 원 밖의 정사각형 (수치 없음)
def _f503b():
    c, r = (0, 0), 62
    inner = [_pt(c, r, -90 + 90 * i) for i in range(4)]            # 마름모꼴로 선 정사각형
    outer = [(-r, -r), (r, -r), (r, r), (-r, r)]
    f = D.merge(D.poly(outer, 'amber'), D.circle(c, r, 'blue'), D.poly(inner, 'green'))
    return D.svg(f, note='원 안에 꼭 맞는 정사각형과 원 밖에 꼭 맞는 정사각형이에요.')
FIGS['c503b'] = _f503b()

# 5-04 1회차 — 원을 16조각으로 잘라 번갈아 붙이기 (반지름·원주의 1/2 라벨 금지 = 답)
def _f504():
    R, n = 58, 16
    th = 360.0 / n
    P3u, P3d = D.PAL['blue'], D.PAL['green']
    # 왼쪽: 자른 원 — 위쪽 반은 파랑, 아래쪽 반은 초록
    left = D.Fig()
    for k in range(n):
        a1, a2 = -180 + k * th, -180 + (k + 1) * th
        p1, p2 = _pt((0, 0), R, a1), _pt((0, 0), R, a2)
        col, edge = (P3u['left'], P3u['edge']) if k < n // 2 else (P3d['left'], P3d['edge'])
        left = D.merge(left, D.path('M0,0 L%.1f,%.1f A%d,%d 0 0 1 %.1f,%.1f Z' % (p1[0], p1[1], R, R, p2[0], p2[1]),
                                    [(0, 0), p1, p2, (-R, -R), (R, R)], col, edge, 1))
    # 오른쪽: 번갈아 붙인 모양
    hs = R * math.sin(math.radians(th / 2))
    hc = R * math.cos(math.radians(th / 2))
    right = D.Fig()
    ox, oy = 0, 0
    for j in range(n // 2):
        ax = ox + j * 2 * hs + hs                      # 아래 꼭짓점 → 호가 위 (파랑)
        p1, p2 = (ax - hs, oy - hc), (ax + hs, oy - hc)
        right = D.merge(right, D.path('M%.1f,%.1f L%.1f,%.1f A%d,%d 0 0 1 %.1f,%.1f Z'
                                      % (ax, oy, p1[0], p1[1], R, R, p2[0], p2[1]),
                                      [(ax, oy), p1, p2, (ax, oy - R)], P3u['left'], P3u['edge'], 1))
        bx = ox + j * 2 * hs + 2 * hs                  # 위 꼭짓점 → 호가 아래 (초록)
        top = (bx, oy - hc)
        q1, q2 = (bx + hs, top[1] + hc), (bx - hs, top[1] + hc)
        right = D.merge(right, D.path('M%.1f,%.1f L%.1f,%.1f A%d,%d 0 0 1 %.1f,%.1f Z'
                                      % (top[0], top[1], q1[0], q1[1], R, R, q2[0], q2[1]),
                                      [top, q1, q2, (bx, top[1] + R)], P3d['left'], P3d['edge'], 1))
    return D.svg(D.row([left, D.to_arrow(0, 0, '잘라서 붙이면'), right], gap=30),
                 note='원을 16조각으로 잘라 번갈아 붙였어요.')
FIGS['c504'] = _f504()

# 5-05 1회차 — 색칠한 부분의 넓이 (정사각형 − 사분원)
def _f505a():
    a = 124
    d = ('M0,0 L%d,0 L%d,%d L0,%d Z M0,%d A%d,%d 0 0 0 %d,0 L0,0 Z' % (a, a, a, a, a, a, a, a))
    f = D.merge(D.path(d, [(0, 0), (a, a)], SF, SE, 1.6, evenodd=True),
                D.path('M0,%d A%d,%d 0 0 0 %d,0' % (a, a, a, a), [(0, 0), (a, a)], 'none', SE, 1.4))
    return D.svg(f, note='정사각형 안에 한 꼭짓점을 중심으로 하는 원의 일부를 그렸어요.')
FIGS['c505a'] = _f505a()

# 5-05 2회차 — 일부를 옮기면 간단해지는 모양 (옮긴 결과는 그리지 않는다 = 답)
def _f505b():
    w, h, r = 156, 72, 26
    cx1, cx2 = 52, 104
    d = ('M0,0 L%d,0 A%d,%d 0 0 1 %d,0 L%d,0 L%d,%d L%d,%d A%d,%d 0 0 0 %d,%d L0,%d Z'
         % (cx1 - r, r, r, cx1 + r, w, w, h, cx2 + r, h, r, r, cx2 - r, h, h))
    f = D.path(d, [(0, -r), (w, h)], SF, SE, 1.6)
    return D.svg(f, note='위로 튀어나온 반원과 아래로 파인 반원은 크기가 같아요.')
FIGS['c505b'] = _f505b()

# 5-05 1회차 — 한 변 6 cm 정사각형 안에 꼭 맞는 원, 원을 뺀 부분 색칠
def _f505c():
    a = 132; r = a / 2
    d = ('M0,0 L%d,0 L%d,%d L0,%d Z M%.1f,%.1f A%.1f,%.1f 0 1 0 %.1f,%.1f A%.1f,%.1f 0 1 0 %.1f,%.1f Z'
         % (a, a, a, a, 0, r, r, r, a, r, r, r, 0, r))
    f = D.merge(D.path(d, [(0, 0), (a, a)], SF, SE, 1.6, evenodd=True),
                D.seg((r, r), (a, r), 'solid', '#6E6A86', 1.2),
                D.dot((r, r), None, '#6E6A86'),
                D.tag(r + r / 2, r - 7, '3 cm', D.SOFT, 12),
                D.dim_h(0, a, a + 16, '6 cm'))
    return D.svg(f)
FIGS['c505c'] = _f505c()

# 5-05 2회차 — 반지름 10 cm 피자를 똑같이 4조각, 한 조각 색칠
def _f505d():
    r = 70
    f = D.merge(
        D.circle((0, 0), r, 'amber'),
        D.path('M0,0 L%d,0 A%d,%d 0 0 1 0,%d Z' % (r, r, r, r), [(0, 0), (r, r)], SF, SE, 1.6),
        D.seg((-r, 0), (r, 0), 'solid', '#A97C22', 1.3), D.seg((0, -r), (0, r), 'solid', '#A97C22', 1.3),
        D.tag(-r / 2, -7, '10 cm', D.SOFT, 12),
    )
    return D.svg(f, note='똑같이 4조각으로 나눈 것 중 한 조각에 색칠했어요.')
FIGS['c505d'] = _f505d()

# 5-05 계단1칸 — 한 변 4 cm 정사각형 안에서 반원 두 개를 뺀 부분
def _f505e():
    a = 128; r = a / 2
    d = ('M0,0 L%d,0 L%d,%d L0,%d Z '
         'M0,0 A%.1f,%.1f 0 0 1 0,%d Z '
         'M%d,0 A%.1f,%.1f 0 0 0 %d,%d Z' % (a, a, a, a, r, r, a, a, r, r, a, a))
    f = D.merge(D.path(d, [(0, 0), (a, a)], SF, SE, 1.6, evenodd=True),
                D.dim_h(0, a, a + 16, '4 cm'))
    return D.svg(f, note='정사각형의 왼쪽 변과 오른쪽 변을 지름으로 하는 반원 두 개를 뺐어요.')
FIGS['c505e'] = _f505e()

# 5-05 계단2칸 — 직사각형 양 끝에 반원이 붙은 운동장 (나누는 선은 그리지 않는다 = 방법)
def _f505f():
    w, h = 150, 84; r = h / 2
    d = ('M%.1f,0 L%.1f,0 A%.1f,%.1f 0 0 1 %.1f,%d L%.1f,%d A%.1f,%.1f 0 0 1 %.1f,0 Z'
         % (r, r + w, r, r, r + w, h, r, h, r, r, r))
    f = D.merge(D.path(d, [(0, 0), (w + h, h)], '#DDF0E6', '#3C8B64', 2),
                D.path('M%.1f,10 L%.1f,10 A%.1f,%.1f 0 0 1 %.1f,%d L%.1f,%d A%.1f,%.1f 0 0 1 %.1f,10 Z'
                       % (r, r + w, r - 10, r - 10, r + w, h - 10, r, h - 10, r - 10, r - 10, r),
                       [(10, 10), (w + h - 10, h - 10)], 'none', '#FFFFFF', 1.4))
    return D.svg(f, note='직사각형의 양쪽 끝에 반원이 붙은 운동장이에요.')
FIGS['c505f'] = _f505f()

# ══════════════════════════════════ 6. 원기둥, 원뿔, 구 ══════════════════════════════════

# 6-01 2회차 — 세로로 긴 직사각형을 왼쪽 변을 기준으로 돌림 (완성된 원기둥은 그리지 않는다)
def _f601a():
    A, B, C, Dd = (0, 0), (64, 0), (64, 120), (0, 120)
    f = D.merge(D.poly([A, B, C, Dd], 'blue'),
                D.spin(A, Dd),
                D.dot(A, 'ㄱ', '#3B6FA8', 'left'), D.dot(B, 'ㄴ', '#3B6FA8', 'right'),
                D.dot(C, 'ㄷ', '#3B6FA8', 'right'), D.dot(Dd, 'ㄹ', '#3B6FA8', 'left'))
    return D.svg(f)
FIGS['c601a'] = _f601a()

# 6-01 계단3칸 — 가로로 긴 직사각형을 아래 변을 기준으로 돌림 (앞 그림과 방향이 다르다)
def _f601b():
    A, B, C, Dd = (0, 0), (150, 0), (150, 58), (0, 58)
    f = D.merge(D.poly([A, B, C, Dd], 'amber'),
                D.spin(Dd, C, '변 ㄹㄷ이 기준'),
                D.dot(A, 'ㄱ', '#A97C22', 'above'), D.dot(B, 'ㄴ', '#A97C22', 'above'),
                D.dot(C, 'ㄷ', '#A97C22', 'below'), D.dot(Dd, 'ㄹ', '#A97C22', 'below'))
    return D.svg(f)
FIGS['c601b'] = _f601b()

# 6-02 2회차 — 원기둥의 전개도 (길이 라벨 없음 = 이유를 말하게)
def _f602a():
    w, h, r = 176, 84, 28
    cx = 60
    f = D.merge(
        D.circle((cx, -r), r, 'blue'),
        D.poly([(0, 0), (w, 0), (w, h), (0, h)], 'blue'),
        D.circle((cx, h + r), r, 'blue'),
    )
    return D.svg(f, note='원기둥을 잘라 펼친 전개도예요.')
FIGS['c602a'] = _f602a()

# 6-02 2회차 — 밑면의 지름 10 cm · 높이 8 cm 원기둥
def _f602b():
    r, h = 50, 80
    f = D.merge(D.cyl(r, h, 0, 0, 'green'),
                D.seg((-r, 0), (r, 0), 'solid', '#3C8B64', 1.2),
                D.tag(0, -r * D.EK - 8, '10 cm', D.SOFT, 12),
                D.dim_v(0, h, r + 14, '8 cm', left=False))
    return D.svg(f)
FIGS['c602b'] = _f602b()

# 6-03 2회차 — 직각삼각형을 한 변을 기준으로 돌림 (원뿔은 그리지 않는다)
def _f603():
    A, B, C = (0, 0), (0, 120), (72, 120)
    f = D.merge(D.poly([A, B, C], 'rose'),
                D.right_angle(B, A, C),
                D.spin(A, B),
                D.dot(A, 'ㄱ', RED, 'left'), D.dot(B, 'ㄴ', RED, 'left'), D.dot(C, 'ㄷ', RED, 'right'))
    return D.svg(f)
FIGS['c603'] = _f603()

# 6-04 2회차 — 반원을 지름을 기준으로 돌림 (구는 그리지 않는다)
def _f604a():
    r = 64
    f = D.merge(D.path('M0,%d A%d,%d 0 0 1 0,%d Z' % (-r, r, r, r), [(0, -r), (r, r)], '#DDF0E6', '#3C8B64', 1.6),
                D.spin((0, -r), (0, r), '지름을 기준으로 한 바퀴'),
                D.dot((0, 0), 'ㅇ', '#3C8B64', 'left'),
                D.seg((0, 0), _pt((0, 0), r, -30), 'solid', '#3C8B64', 1.2))
    return D.svg(f, note='점 ㅇ은 반원의 중심이에요.')
FIGS['c604a'] = _f604a()

# 6-04 계단2칸 — 원기둥 · 원뿔 · 구 (본 모양은 그리지 않는다 = 답)
def _f604b():
    return D.svg(D.row([
        D.merge(D.cyl(34, 70, 0, 0, 'blue'), D.tag(0, -34, '원기둥', D.SOFT, 12.5)),
        D.merge(D.cone(38, 84, 0, -14, 'rose'), D.tag(0, -34, '원뿔', D.SOFT, 12.5)),
        D.merge(D.sphere(40, (0, 35), 'green'), D.tag(0, -34, '구', D.SOFT, 12.5)),
    ], gap=44))
FIGS['c604b'] = _f604b()


MAP = [
 ('5', '01', 'L2',          'c501'),
 ('5', '02', 'qa22e6222',   'c502'),
 ('5', '03', 't0L2',        'c503a'),
 ('5', '03', 't0H1',        'c503b'),
 ('5', '04', 't0H1',        'c504'),
 ('5', '05', 't0L1',        'c505a'),
 ('5', '05', 't0H2',        'c505b'),
 ('5', '05', 'qrecall',     'c505c'),
 ('5', '05', 'qa22e6251',   'c505d'),
 ('5', '05', 'L1',          'c505e'),
 ('5', '05', 'L2',          'c505f'),

 ('6', '01', 't0H1',        'c601a'),
 ('6', '01', 'L3',          'c601b'),
 ('6', '02', 't0H1',        'c602a'),
 ('6', '02', 'qa22e6221',   'c602b'),
 ('6', '03', 't0H1',        'c603'),
 ('6', '04', 't0H1',        'c604a'),
 ('6', '04', 'L2',          'c604b'),
]

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for k, v in FIGS.items():
        print('%-7s %5d자' % (k, len(v)))
    print('그림 %d장 · 붙일 곳 %d개' % (len(FIGS), len(MAP)))
