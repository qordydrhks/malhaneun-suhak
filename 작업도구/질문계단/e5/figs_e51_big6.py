# -*- coding: utf-8 -*-
"""초5-1 「6. 다각형의 둘레와 넓이」 질문 그림 (2026-09-23)

⚠️ 이 학년은 **마스터 검수가 끝난 곳**이다(v85.8). 그래서 **질문 문장은 건드리지 않고 그림만 붙인다.**
   그림에 적는 수는 질문 문장의 수와 반드시 같게 맞춘다(8 cm 라고 쓰인 질문에 7 cm 그림이 붙으면 안 된다).

넓이 공식이 나오는 과정(평행사변형을 잘라 직사각형으로 · 삼각형 두 개로 평행사변형 ·
마름모를 감싼 직사각형 · 사다리꼴 두 개로 평행사변형)은 **그림이 곧 설명**이라 유도 그림으로 그린다.
"""
import os, sys, importlib.util
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)

u = 22          # 1 cm = 22 px (넓이 단원은 8~12 cm 가 나와서 조금 작게)
FIGS = {}
M = D.merge

def rect(x, y, w, h, color='blue'):
    return D.poly([(x, y), (x + w, y), (x + w, y + h), (x, y + h)], color)

# ── 01. 정다각형과 사각형의 둘레 ──────────────────────────────────────
_hex = D.regular(6, 54)
FIGS['p601_hex'] = D.svg(M(D.poly(_hex, 'blue'),
    *[D.ticks(_hex[i], _hex[(i + 1) % 6]) for i in range(6)]),
    note='정육각형 — 여섯 변의 길이가 모두 같아요.')

_pent = D.regular(5, 54)
FIGS['p601_peri'] = D.svg(M(D.poly(_pent, 'amber', fill=False),
    D.tag(0, 6, '둘레', '#A97C22', 13)),
    note='다각형의 둘레는 모든 변의 길이를 더한 것이에요.')

FIGS['p601_rect'] = D.svg(M(rect(0, 0, 7 * u, 4 * u),
    D.dim_h(0, 7 * u, 4 * u + 12, '가로'), D.dim_v(0, 4 * u, -12, '세로')))

_hept = D.regular(7, 56)
FIGS['p601_hept'] = D.svg(M(D.poly(_hept, 'green'),
    *[D.ticks(_hept[i], _hept[(i + 1) % 7]) for i in range(7)]),
)

FIGS['p601_err'] = D.svg(M(rect(0, 0, 6 * u, 4 * u),
    D.dim_h(0, 6 * u, 4 * u + 12, '6 cm'), D.dim_v(0, 4 * u, -12, '4 cm')))

# ── 02. 1 cm² ───────────────────────────────────────────────────────
FIGS['p602_unit'] = D.svg(M(D.unit_grid(1, 1, color='amber'),
    D.dim_h(0, D.S, D.S + 12, '1 cm'), D.dim_v(0, D.S, -12, '1 cm')),
    note='한 변이 1 cm 인 정사각형의 넓이가 1 cm² 예요.')

FIGS['p602_grid54'] = D.svg(M(D.unit_grid(5, 4),
    D.dim_h(0, 5 * D.S, 4 * D.S + 12, '5 cm'), D.dim_v(0, 4 * D.S, -12, '4 cm')),
)

# ── 03. 직사각형의 넓이 ──────────────────────────────────────────────
FIGS['p603_two'] = D.svg(D.row([
    M(rect(0, 0, 6 * u, 4 * u), D.dim_h(0, 6 * u, 4 * u + 12, '가로'), D.dim_v(0, 4 * u, -12, '세로'),
      D.tag(3 * u, -12, '직사각형', D.SOFT, 13)),
    M(rect(0, 0, 4 * u, 4 * u, 'green'), D.dim_h(0, 4 * u, 4 * u + 12, '한 변'),
      D.dim_v(0, 4 * u, -12, '한 변'), D.tag(2 * u, -12, '정사각형', D.SOFT, 13)),
], gap=62))

FIGS['p603_grid'] = D.svg(M(D.unit_grid(5, 3),
    D.dim_h(0, 5 * D.S, 3 * D.S + 12, '가로 5 cm'), D.dim_v(0, 3 * D.S, -12, '세로 3 cm')),
)

FIGS['p603_85'] = D.svg(M(rect(0, 0, 8 * u, 5 * u),
    D.dim_h(0, 8 * u, 5 * u + 12, '8 cm'), D.dim_v(0, 5 * u, -12, '5 cm')))

FIGS['p603_err'] = D.svg(M(rect(0, 0, 6 * u, 4 * u, 'rose'),
    D.dim_h(0, 6 * u, 4 * u + 12, '6 cm'), D.dim_v(0, 4 * u, -12, '4 cm')))

# ── 04. 1 cm² 보다 큰 단위 ──────────────────────────────────────────
FIGS['p604_m2'] = D.svg(M(rect(0, 0, 5 * u, 5 * u, 'amber'),
    D.dim_h(0, 5 * u, 5 * u + 12, '1 m = 100 cm'), D.dim_v(0, 5 * u, -12, '1 m')),
)

# ── 05. 평행사변형의 넓이 ────────────────────────────────────────────
def para(b, h, slant, x=0, y=0, color='blue'):
    return [(x + slant, y), (x + slant + b, y), (x + b, y + h), (x, y + h)]

_p = para(7 * u, 4 * u, 2 * u)
FIGS['p605_para'] = D.svg(M(D.poly(_p, 'blue'),
    D.ticks(_p[0], _p[1], 2), D.ticks(_p[2], _p[3], 2),
    D.ticks(_p[1], _p[2], 1), D.ticks(_p[3], _p[0], 1)),
    note='마주 보는 두 쌍의 변이 서로 평행하고 길이도 같아요.')

_p2 = para(7 * u, 4 * u, 2 * u)
FIGS['p605_bh'] = D.svg(M(D.poly(_p2, 'blue'),
    D.seg((_p2[0][0], _p2[0][1]), (_p2[0][0], _p2[3][1]), 'dashed'),
    D.right_angle((_p2[0][0], _p2[3][1]), _p2[3], (_p2[0][0], _p2[0][1])),
    D.dim_h(_p2[3][0], _p2[2][0], 4 * u + 12, '밑변'),
    D.dim_v(0, 4 * u, -12, '높이')),
    note='높이는 밑변과 수직으로 잰 거리예요.')

_a = para(6 * u, 4 * u, 2 * u)
FIGS['p605_cut'] = D.svg(D.row([
    M(D.poly(_a, 'blue'), D.seg((_a[0][0], _a[0][1]), (_a[0][0], _a[3][1]), 'dashed'),
      D.tag(3 * u, -12, '평행사변형', D.SOFT, 12.5)),
    M(rect(0, 0, 6 * u, 4 * u, 'green'), D.tag(3 * u, -12, '직사각형', D.SOFT, 12.5)),
], gap=64))

FIGS['p605_same'] = D.svg(D.row([
    D.poly(para(6 * u, 4 * u, 1 * u), 'blue'),
    D.poly(para(6 * u, 4 * u, 3 * u), 'green'),
], gap=52), note='밑변과 높이가 같은 두 평행사변형이에요.')

_p3 = para(7 * u, 3 * u, 2 * u)
FIGS['p605_73'] = D.svg(M(D.poly(_p3, 'blue'),
    D.seg((_p3[0][0], _p3[0][1]), (_p3[0][0], _p3[3][1]), 'dashed'),
    D.dim_h(_p3[3][0], _p3[2][0], 3 * u + 12, '7 cm'),
    D.dim_v(0, 3 * u, -12, '3 cm')))

_p4 = para(8 * u, 5 * u, 3 * u)
FIGS['p605_err'] = D.svg(M(D.poly(_p4, 'rose'),
    D.seg((_p4[0][0], _p4[0][1]), (_p4[0][0], _p4[3][1]), 'dashed'),
    D.dim_h(_p4[3][0], _p4[2][0], 5 * u + 12, '밑변 8 cm'),
    D.dim_v(0, 5 * u, -14, '높이 5 cm'),
    D.tag(_p4[1][0] + 26, 2.6 * u, '6 cm', '#B55B45', 12.5, 700, 'start')),
)

# ── 06. 삼각형의 넓이 ────────────────────────────────────────────────
def tri(b, h, apex, x=0, y=0):
    return [(x, y + h), (x + b, y + h), (x + apex, y)]

# ⚠️ 두 조각은 **떨어뜨려** 그린다. 붙여 그리면 오른쪽 결과와 같은 그림이 되어 버린다(마스터 지적 9/26).
_t  = tri(6 * u, 4 * u, 2 * u)                                    # 그대로 (밑변 아래, 꼭짓점 위)
_tr = [(8 * u, 0), (14 * u, 0), (12 * u, 4 * u)]                   # 180° 돌린 것 (밑변 위, 꼭짓점 아래)
FIGS['p606_two'] = D.svg(D.row([
    M(D.poly(_t, 'blue'), D.poly(_tr, 'blue'),
      D.tag(7 * u, 4 * u + 26, '똑같은 삼각형 두 개', D.SOFT, 12.5)),
    M(D.poly(para(6 * u, 4 * u, 2 * u), 'green'),
      D.seg((2 * u, 0), (6 * u, 4 * u), 'dashed'),
      D.tag(3 * u, -12, '평행사변형', D.SOFT, 12.5)),
], gap=64))

FIGS['p606_same'] = D.svg(D.row([
    D.poly(tri(6 * u, 4 * u, 0), 'blue'),
    D.poly(tri(6 * u, 4 * u, 3 * u), 'green'),
    D.poly(tri(6 * u, 4 * u, 6 * u), 'amber'),
], gap=40), note='밑변과 높이가 모두 같은 세 삼각형이에요.')

_t2 = tri(8 * u, 5 * u, 3 * u)
FIGS['p606_85'] = D.svg(M(D.poly(_t2, 'blue'),
    D.seg((3 * u, 0), (3 * u, 5 * u), 'dashed'),
    D.right_angle((3 * u, 5 * u), (0, 5 * u), (3 * u, 0)),
    D.dim_h(0, 8 * u, 5 * u + 12, '8 cm'), D.dim_v(0, 5 * u, -12, '5 cm')))

_t3 = tri(6 * u, 4 * u, 2 * u)
FIGS['p606_err'] = D.svg(M(D.poly(_t3, 'rose'),
    D.seg((2 * u, 0), (2 * u, 4 * u), 'dashed'),
    D.dim_h(0, 6 * u, 4 * u + 12, '6 cm'), D.dim_v(0, 4 * u, -12, '4 cm')))

_t4 = [(0, 4 * u), (6 * u, 4 * u), (4 * u, 0)]
FIGS['p606_base'] = D.svg(M(D.poly(_t4, 'blue'),
    D.seg((4 * u, 0), (4 * u, 4 * u), 'dashed'),
    D.tag(4 * u + 24, 2 * u, '이 밑변의 높이', D.SOFT, 11.5, 600, 'start')),
    note='밑변을 어느 변으로 잡느냐에 따라 높이도 달라져요.')

# ── 07. 마름모의 넓이 ────────────────────────────────────────────────
def rhom(d1, d2, x=0, y=0):
    return [(x + d1 / 2, y), (x + d1, y + d2 / 2), (x + d1 / 2, y + d2), (x, y + d2 / 2)]

_r = rhom(7 * u, 5 * u)
FIGS['p607_rhom'] = D.svg(M(D.poly(_r, 'blue'),
    D.seg(_r[0], _r[2], 'dashed'), D.seg(_r[1], _r[3], 'dashed'),
    D.right_angle((3.5 * u, 2.5 * u), _r[0], _r[1]),
    *[D.ticks(_r[i], _r[(i + 1) % 4]) for i in range(4)]),
    note='네 변의 길이가 같고, 두 대각선은 수직으로 만나며 서로를 반으로 나눠요.')

_r2 = rhom(7 * u, 5 * u)
FIGS['p607_rect'] = D.svg(M(rect(0, 0, 7 * u, 5 * u, 'green'), D.poly(_r2, 'blue'),
    D.seg(_r2[0], _r2[2], 'dashed'), D.seg(_r2[1], _r2[3], 'dashed'),
    D.dim_h(0, 7 * u, 5 * u + 12, '한 대각선'), D.dim_v(0, 5 * u, -12, '다른 대각선')),
)

_r3 = rhom(7.2 * u, 3 * u)
FIGS['p607_125'] = D.svg(M(D.poly(_r3, 'blue'),
    D.seg(_r3[0], _r3[2], 'dashed'), D.seg(_r3[1], _r3[3], 'dashed'),
    D.dim_h(0, 7.2 * u, 3 * u + 14, '12 cm'), D.dim_v(0, 3 * u, -12, '5 cm')))

_r4 = rhom(6.5 * u, 3.9 * u)
FIGS['p607_err'] = D.svg(M(D.poly(_r4, 'rose'),
    D.seg(_r4[0], _r4[2], 'dashed'), D.seg(_r4[1], _r4[3], 'dashed'),
    D.dim_h(0, 6.5 * u, 3.9 * u + 14, '10 cm'), D.dim_v(0, 3.9 * u, -12, '6 cm')))

# ── 08. 사다리꼴의 넓이 ──────────────────────────────────────────────
def trap(top, bot, h, x=0, y=0):
    off = (bot - top) / 2.0
    return [(x + off, y), (x + off + top, y), (x + bot, y + h), (x, y + h)]

_z = trap(5 * u, 9 * u, 4 * u)
FIGS['p608_trap'] = D.svg(M(D.poly(_z, 'blue'),
    D.seg((2 * u, 0), (2 * u, 4 * u), 'dashed'),
    D.dim_h(_z[0][0], _z[1][0], -12, '윗변', below=False),
    D.dim_h(0, 9 * u, 4 * u + 12, '아랫변'),
    D.dim_v(0, 4 * u, -14, '높이')),
    note='평행한 두 변이 윗변과 아랫변이에요.')

# 사다리꼴 두 개(하나는 180° 돌린 것) → 밑변이 (윗변 + 아랫변)인 평행사변형
_za = trap(4 * u, 7 * u, 4 * u)                                              # 그대로 (짧은 변이 위)
_zb = [(10.5 * u, 4 * u), (14.5 * u, 4 * u), (16 * u, 0), (9 * u, 0)]          # 180° 돌린 것 (짧은 변이 아래)
FIGS['p608_two'] = D.svg(D.row([
    M(D.poly(_za, 'blue'), D.poly(_zb, 'blue'),
      D.tag(8 * u, 4 * u + 26, '똑같은 사다리꼴 두 개', D.SOFT, 12.5)),
    M(D.poly([(0, 4 * u), (11 * u, 4 * u), (12.5 * u, 0), (1.5 * u, 0)], 'green'),
      D.seg((5.5 * u, 0), (7 * u, 4 * u), 'dashed'),
      D.tag(6.2 * u, -12, '평행사변형', D.SOFT, 12.5)),
], gap=56))

_z2 = trap(5 * u, 9 * u, 6 * u)
FIGS['p608_596'] = D.svg(M(D.poly(_z2, 'blue'),
    D.seg((2 * u, 0), (2 * u, 6 * u), 'dashed'),
    D.dim_h(_z2[0][0], _z2[1][0], -12, '5 cm', below=False),
    D.dim_h(0, 9 * u, 6 * u + 12, '9 cm'), D.dim_v(0, 6 * u, -14, '6 cm')))

_z3 = trap(4 * u, 8 * u, 5 * u)
FIGS['p608_err'] = D.svg(M(D.poly(_z3, 'rose'),
    D.seg((2 * u, 0), (2 * u, 5 * u), 'dashed'),
    D.dim_h(_z3[0][0], _z3[1][0], -12, '4 cm', below=False),
    D.dim_h(0, 8 * u, 5 * u + 12, '8 cm'), D.dim_v(0, 5 * u, -14, '5 cm')))

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for k, v in FIGS.items(): print('%-14s %5d자' % (k, len(v)))
    print('그림 %d장' % len(FIGS))


# ── 어느 질문에 어느 그림을 붙이나 (대단원, 소단원, 질문꼬리, 그림이름) ────────
#   질문 문장은 그대로 두고 그림만 더한다. 그림의 수는 질문의 수와 반드시 같다.
MAP = [
 ('6','01','qrecall','p601_hept'),   ('6','01','qerror','p601_err'),
 ('6','02','qrecall','p602_grid54'),
 ('6','03','t0H1','p603_grid'),
 ('6','03','qrecall','p603_85'),     ('6','03','qerror','p603_err'),
 ('6','04','t0H1','p604_m2'),
 ('6','05','t0H1','p605_cut'),
 ('6','05','t0H2','p605_same'),      ('6','05','qrecall','p605_73'), ('6','05','qerror','p605_err'),
 ('6','06','t0H1','p606_two'),       ('6','06','t0H2','p606_same'),
 ('6','06','qrecall','p606_85'),     ('6','06','qerror','p606_err'),
 ('6','07','t0H1','p607_rect'),
 ('6','07','qrecall','p607_125'),    ('6','07','qerror','p607_err'),
 ('6','08','t0H1','p608_two'),
 ('6','08','qrecall','p608_596'),    ('6','08','qerror','p608_err'),
]

# ── 🪜 계단 칸에 붙는 그림 — 질문용 그림과 치수를 다르게 한다 ─────────────
_lp = para(6 * u, 4 * u, 2.5 * u)
FIGS['l605_bh'] = D.svg(M(D.poly(_lp, 'green'),
    D.seg((_lp[0][0], 0), (_lp[0][0], 4 * u), 'dashed'),
    D.right_angle((_lp[0][0], 4 * u), _lp[3], (_lp[0][0], 0)),
    D.dim_h(_lp[3][0], _lp[2][0], 4 * u + 12, '밑변'), D.dim_v(0, 4 * u, -12, '높이')))

_lt = tri(7 * u, 5 * u, 5 * u)
FIGS['l606_bh'] = D.svg(M(D.poly(_lt, 'green'),
    D.seg((5 * u, 0), (5 * u, 5 * u), 'dashed'),
    D.right_angle((5 * u, 5 * u), (0, 5 * u), (5 * u, 0)),
    D.dim_h(0, 7 * u, 5 * u + 12, '밑변'), D.dim_v(0, 5 * u, -12, '높이')))

# 높이를 잘못 그은 예 vs 바르게 그은 예 (둔각삼각형으로 헷갈리기 쉬운 자리)
_lo = [(0, 4 * u), (5 * u, 4 * u), (7 * u, 0)]
FIGS['l606_wrong'] = D.svg(D.row([
    M(D.poly(_lo, 'rose'), D.seg((7 * u, 0), (5 * u, 4 * u), 'dashed'),
      D.tag(3.5 * u, 4 * u + 26, '이렇게 그으면 ✗', '#B55B45', 12.5)),
    M(D.poly(_lo, 'green'), D.seg((7 * u, 0), (7 * u, 4 * u), 'dashed'),
      D.seg((5 * u, 4 * u), (7 * u, 4 * u), 'dashed'),
      D.right_angle((7 * u, 4 * u), (0, 4 * u), (7 * u, 0)),
      D.tag(3.5 * u, 4 * u + 26, '이렇게 ✓', '#3C8B64', 12.5)),
], gap=54), note='높이는 밑변을 늘린 선과 수직이 되게 그어요.')

# 정사각형도 마름모 — 대각선 6 cm
_sq = rhom(6 * u, 6 * u)
FIGS['l607_square'] = D.svg(M(D.poly(_sq, 'blue'),
    D.seg(_sq[0], _sq[2], 'dashed'), D.seg(_sq[1], _sq[3], 'dashed'),
    D.right_angle((3 * u, 3 * u), _sq[0], _sq[1]),
    *[D.ticks(_sq[i], _sq[(i + 1) % 4]) for i in range(4)],
    D.dim_h(0, 6 * u, 6 * u + 12, '6 cm'), D.dim_v(0, 6 * u, -12, '6 cm')),
)

_lz = trap(4 * u, 8 * u, 5 * u)
FIGS['l608_trap'] = D.svg(M(D.poly(_lz, 'green'),
    D.seg((2 * u, 0), (2 * u, 5 * u), 'dashed'),
    D.dim_h(_lz[0][0], _lz[1][0], -12, '윗변', below=False),
    D.dim_h(0, 8 * u, 5 * u + 12, '아랫변'), D.dim_v(0, 5 * u, -14, '높이')))

MAP += [
 ('6','07','L4','l607_square'),
]
