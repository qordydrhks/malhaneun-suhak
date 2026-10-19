# -*- coding: utf-8 -*-
"""초4-2 4단원(사각형) mission 견본 — 5지선다 + 누르기형 (마스터 2026-10-19)

마스터 결정
  · 문제는 AI 즉석 출제 대신 Claude 가 미리 만들고 그림은 개념 질문과 같은 도구(draw.py)로 그린다.
  · 5지선다. 기본 문제에는 누르기형(그림을 눌러 답)을 '필요한 문제에만' 섞는다.
  · 근거: mission(기본) = 디딤돌 기본 4-2 소단원 문제 수준 / hard mission(응용) = 디딤돌 발전 문제 · 최상위 S 4-2 수준.
  · 견본 범위: 4단원 7개 행성 × 1회차 × (기본 2 + 응용 2) = 28문항. 승인 뒤 2·3회차와 다른 단원.

실행: python -X utf8 mis_e42_4.py  → 검산(assert) → 견본_문제_초4-2_4단원.pdf
"""
import os, sys, math, html
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '질문계단'))
import draw as D
from draw import Fig, merge, svg, tag, seg, ang, right_angle, dot, ray, dim_h, dim_v, _txt, _textw

INK, SOFT = D.INK, D.SOFT
EDGE = '#3B6FA8'; FILL = '#E8F1FC'; HOT = '#E07B39'; HOTF = '#FDE6D3'; GRAY = '#6E6A86'
CM = D.S            # 1 cm = 26 px
G = 22              # 모눈 한 칸

# ───────────── 그리기 도우미 ─────────────
def pt(p, s=CM):
    return (p[0] * s, p[1] * s)

def gridbg(c0, r0, c1, r1, s=G):
    """옅은 모눈 (c0..c1, r0..r1 칸 경계)"""
    f = Fig()
    for c in range(c0, c1 + 1):
        f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#D6E2F2" stroke-width="0.8"/>' % (c * s, r0 * s, c * s, r1 * s), [(c * s, r0 * s), (c * s, r1 * s)])
    for r in range(r0, r1 + 1):
        f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#D6E2F2" stroke-width="0.8"/>' % (c0 * s, r * s, c1 * s, r * s), [(c0 * s, r * s), (c1 * s, r * s)])
    return f

def line(p, q, color=GRAY, w=1.6, dash=False):
    f = Fig()
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%s" stroke-linecap="round"%s/>'
          % (p[0], p[1], q[0], q[1], color, w, ' stroke-dasharray="5 4"' if dash else ''), [p, q])
    return f

def shape(pts, color=EDGE, fill=FILL, w=1.7, dash=False):
    f = Fig()
    d = ' '.join('%.1f,%.1f' % p for p in pts)
    f.add('<polygon points="%s" fill="%s" stroke="%s" stroke-width="%s" stroke-linejoin="round"%s/>'
          % (d, fill, color, w, ' stroke-dasharray="5 4"' if dash else ''), pts)
    return f

def tapg(tid, inner, hot):
    """누르기 단위 — 앱에서는 <g data-t> 를 누른다. hot 이면 정답 표시(견본 PDF 의 정답 그림)"""
    f = Fig()
    f.body.append('<g data-t="%s">' % tid); f.body += inner.body; f.body.append('</g>')
    f.xs += inner.xs; f.ys += inner.ys
    return f

def tline(tid, p, q, hot, label=None, lab_at=None):
    """누를 수 있는 선 — 보이는 선 + 손가락용 넓은 투명 선"""
    col = HOT if hot else GRAY
    f = Fig()
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="transparent" stroke-width="18"/>' % (p[0], p[1], q[0], q[1]), [p, q])
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%s" stroke-linecap="round"/>'
          % (p[0], p[1], q[0], q[1], col, 3.2 if hot else 1.8), [p, q])
    g = tapg(tid, f, hot)
    if label:
        g = merge(g, tag(lab_at[0], lab_at[1], label, INK, 13))
    return g

def tshape(tid, pts, hot, label=None):
    f = shape(pts, HOT if hot else EDGE, HOTF if hot else FILL, 2.6 if hot else 1.7)
    g = tapg(tid, f, hot)
    if label:
        cx = sum(p[0] for p in pts) / len(pts); cy = sum(p[1] for p in pts) / len(pts)
        g = merge(g, tag(cx, cy + 5, label, INK, 13.5))
    return g

def deg(a):
    """수학 각도(반시계, 0°=오른쪽) → 화면 단위벡터"""
    return (math.cos(math.radians(a)), -math.sin(math.radians(a)))

def at(o, a, r):
    u = deg(a); return (o[0] + u[0] * r, o[1] + u[1] * r)

def lab(p, text, dx=0, dy=0, size=13.5, color=INK, anchor='middle'):
    return tag(p[0] + dx, p[1] + dy, text, color, size, 700, anchor)

def cmlab(p, q, text, side=1, d=14):
    """선분 옆 길이 글자 (side=1: 진행 방향 왼쪽 → 화면에선 위/바깥)"""
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy) or 1
    nx, ny = dy / L * side, -dx / L * side
    return tag(mx + nx * d, my + ny * d + 4, text, SOFT, 12.5)

# ───────────── 검산 도우미 ─────────────
def vec(a, b): return (b[0] - a[0], b[1] - a[1])
def cross(u, v): return u[0] * v[1] - u[1] * v[0]
def par(u, v): return abs(cross(u, v)) < 1e-9
def quad_par_pairs(q):
    """사각형에서 서로 평행한 변 쌍의 수 (마주 보는 변끼리)"""
    e = [vec(q[i], q[(i + 1) % 4]) for i in range(4)]
    return int(par(e[0], e[2])) + int(par(e[1], e[3]))
def simple(q):
    """사각형이 꼬이지 않았나 (마주 보는 변끼리 안 만남)"""
    def inter(a, b, c, d):
        d1, d2 = cross(vec(a, b), vec(a, c)), cross(vec(a, b), vec(a, d))
        d3, d4 = cross(vec(c, d), vec(c, a)), cross(vec(c, d), vec(c, b))
        return d1 * d2 < 0 and d3 * d4 < 0
    return not inter(q[0], q[1], q[2], q[3]) and not inter(q[1], q[2], q[3], q[0])
def angle_at(o, p, q):
    u, v = vec(o, p), vec(o, q)
    c = (u[0] * v[0] + u[1] * v[1]) / (math.hypot(*u) * math.hypot(*v))
    return math.degrees(math.acos(max(-1, min(1, c))))

P = []       # 문제 모음
def add(**k):
    P.append(k)

# ════════════════ E4-2-4-1 수직과 수선 ════════════════
def f411(hl=()):
    o = (0, 0); A = 15                       # 직선 가 방향 15°
    a0, a1 = at(o, A, -40), at(o, A, 360)
    f = merge(line(a0, a1, INK, 1.8), lab(at(o, A, 378), '가', 0, 5))
    spec = [('d', 50, A + 55), ('a', 130, A + 90), ('b', 210, A + 120), ('c', 290, A + 90)]
    for tid, t, a in spec:
        c = at(o, A, t)
        f = merge(f, tline(tid, at(c, a, -62), at(c, a, 62), tid in hl))
    return f
add(code='E4-2-4-1', title='수직과 수선', r=1, lv='basic', kind='tap',
    stem='직선 가에 대한 수선을 모두 눌러 보세요.',
    fig=f411, tap=['a', 'c'],
    explain='직선 가와 만나서 이루는 각이 직각인 직선이 직선 가에 대한 수선이에요.',
    wrong={'하나만 누름': '수선이 하나뿐이라고 생각했어요.', '비스듬한 선을 누름': '만나기만 하면 수선이라고 생각했어요(직각인지 안 봄).'},
    src='디딤돌 기본 96쪽 1번 유형')

def f412():
    o = (0, 0); R = 120
    f = merge(line(at(o, 0, -R), at(o, 0, R), INK, 1.8), line(at(o, 90, -R + 20), at(o, 90, R - 10), INK, 1.8),
              line(o, at(o, 38, R - 8), GRAY, 1.6),
              lab(at(o, 0, R + 16), '가', 0, 5), lab(at(o, 90, R + 6), '나', 0, 0),
              right_angle(o, at(o, 180, 10), at(o, 270, 10), 11),
              ang(o, at(o, 0, 40), at(o, 38, 40), '38°', 34, lab_d=17), ang(o, at(o, 38, 40), at(o, 90, 40), '㉠', 26, lab_d=14))
    return f
add(code='E4-2-4-1', title='수직과 수선', r=1, lv='basic', kind='mc',
    stem='직선 가와 직선 나는 서로 수직입니다. ㉠의 크기는 몇 도입니까?', fig=f412,
    choices=['38°', '42°', '128°', '52°', '142°'], answer=3, val=90 - 38,
    explain='두 직선이 수직이라 사이의 각은 90°예요. 90° − 38° = 52°예요.',
    wrong={0: '38°를 그대로 답했어요.', 2: '90°에 38°를 더했어요.', 4: '180°에서 38°를 뺐어요(직선의 각과 헷갈림).'},
    src='디딤돌 기본 96쪽 4번 유형')

def f413():
    o = (0, 0); R = 120
    return merge(line(at(o, 0, -R), at(o, 0, R), INK, 1.8), line(at(o, 90, -R + 30), at(o, 90, R - 10), INK, 1.8),
                 line(o, at(o, 60, R - 8), GRAY, 1.6),
                 lab(at(o, 0, R + 16), '가', 0, 5), lab(at(o, 90, R + 6), '나', 0, 0), lab(at(o, 60, R + 4), '다', 0, 4),
                 right_angle(o, at(o, 180, 10), at(o, 270, 10), 11),
                 ang(o, at(o, 0, 40), at(o, 60, 40), '㉠', 32, lab_d=14), ang(o, at(o, 60, 40), at(o, 90, 40), '㉡', 50, lab_d=13))
add(code='E4-2-4-1', title='수직과 수선', r=1, lv='hard', kind='mc',
    stem='직선 가와 직선 나는 서로 수직입니다. ㉠의 크기가 ㉡의 크기의 2배일 때, ㉠은 몇 도입니까?', fig=f413,
    choices=['60°', '30°', '45°', '90°', '120°'], answer=0, val=60,
    explain='㉠ + ㉡ = 90°예요. ㉠이 ㉡의 2배이니 90°를 3으로 나눈 30°가 ㉡, ㉠은 30° × 2 = 60°예요.',
    wrong={1: '㉡을 구하고 멈췄어요.', 2: '90°를 똑같이 둘로 나눴어요.', 4: '180°를 기준으로 생각했어요.'},
    src='디딤돌 발전 114쪽 4~6번 · 최상위 S 94쪽 유형')

def f414():
    o = (0, 0); R = 120
    return merge(line(at(o, 0, -R), at(o, 0, R), INK, 1.8), line(at(o, 90, -R + 10), at(o, 90, R - 10), INK, 1.8),
                 line(at(o, 25, -R), at(o, 25, R), INK, 1.8),
                 lab(at(o, 0, R + 16), '가', 0, 5), lab(at(o, 90, R + 4), '나', 0, 0), lab(at(o, 25, R + 14), '다', 0, 5),
                 right_angle(o, at(o, 0, 10), at(o, 270, 10), 11),
                 ang(o, at(o, 0, 40), at(o, 25, 40), '25°', 58, lab_d=17), ang(o, at(o, 90, 40), at(o, 205, 40), '㉠', 28, lab_d=14))
add(code='E4-2-4-1', title='수직과 수선', r=1, lv='hard', kind='mc',
    stem='직선 가와 직선 나는 서로 수직이고, 직선 다는 두 직선이 만나는 점을 지납니다. ㉠의 크기는 몇 도입니까?', fig=f414,
    choices=['65°', '90°', '105°', '155°', '115°'], answer=4, val=90 + 25,
    explain='직선 나와 직선 다 사이의 작은 각은 90° − 25° = 65°예요. ㉠은 그 각과 나란히 직선 다를 이루니 180° − 65° = 115°예요.',
    wrong={0: '90° − 25°만 하고 멈췄어요.', 3: '180° − 25°로 직선 가의 각과 헷갈렸어요.', 1: '수직이라 무조건 90°라고 생각했어요.'},
    src='디딤돌 발전 114쪽 6번 유형')

# ════════════════ E4-2-4-2 평행과 평행선 ════════════════
L421 = {'가': ((1, 3), (7, 1)), '나': ((8, 3), (14, 0)), '다': ((1, 6), (7, 4)),
        '라': ((9, 6), (13, 5)), '마': ((8, 9), (14, 7)), '바': ((1, 9), (7, 5))}
def f421(hl=()):
    f = gridbg(0, 0, 15, 10)
    for k, (p, q) in L421.items():
        P1, P2 = pt(p, G), pt(q, G)
        if k == '가':
            f = merge(f, line(P1, P2, INK, 2.2), lab(P1, k, -12, 2))
        else:
            f = merge(f, tline(k, P1, P2, k in hl, k, (P1[0] - 12, P1[1] + 2)))
    return f
add(code='E4-2-4-2', title='평행과 평행선', r=1, lv='basic', kind='tap',
    stem='모눈 위에 직선을 그렸습니다. 직선 가와 평행한 직선을 모두 눌러 보세요.', fig=f421,
    tap=['다', '마'], explain='직선 가는 오른쪽으로 3칸 갈 때 위로 1칸 올라가요. 똑같이 기울어진 직선 다, 마는 아무리 늘여도 직선 가와 만나지 않아요.',
    wrong={'라를 누름': '오른쪽 4칸에 위로 1칸 — 기울기가 조금 달라서 늘이면 만나요.', '바를 누름': '방향만 비슷해 보이면 평행이라고 생각했어요.'},
    src='디딤돌 기본 98쪽 8번 유형')

PENT = [(0, 4), (7, 4), (7, 2), (5, 0), (0, 0)]
def f422():
    return merge(gridbg(-1, -1, 8, 5), shape([pt(p, G) for p in PENT]))
add(code='E4-2-4-2', title='평행과 평행선', r=1, lv='basic', kind='mc',
    stem='도형에서 서로 평행한 변은 모두 몇 쌍입니까?', fig=f422,
    choices=['1쌍', '2쌍', '3쌍', '4쌍', '5쌍'], answer=1, val='2쌍',
    explain='위 변과 아래 변이 평행하고, 왼쪽 변과 오른쪽 변이 평행해요. 비스듬한 변과 평행한 변은 없어요. 그래서 2쌍이에요.',
    wrong={0: '가로 변끼리만 보고 세로 변끼리는 놓쳤어요.', 2: '비스듬한 변도 어딘가와 평행하다고 봤어요.'},
    src='디딤돌 기본 101쪽 18번 유형')

add(code='E4-2-4-2', title='평행과 평행선', r=1, lv='hard', kind='mc',
    stem='직선 가와 직선 나는 모두 직선 마에 수직입니다. 직선 다와 직선 라는 모두 직선 바에 수직이고, 직선 마와 직선 바는 서로 수직입니다. 서로 평행한 직선끼리 바르게 모은 것은 어느 것입니까?',
    fig=None,
    choices=['가와 나, 다와 라만 서로 평행합니다.', '가, 나, 다, 라가 모두 서로 평행합니다.', '마와 바만 서로 평행합니다.',
             '가와 다, 나와 라가 서로 평행합니다.', '가, 나, 바가 서로 평행하고, 다, 라, 마가 서로 평행합니다.'],
    answer=4, val='가나바/다라마',
    explain='한 직선에 수직인 두 직선은 평행해요. 마에 수직인 것은 가, 나, 바 → 셋이 평행. 바에 수직인 것은 다, 라, 마 → 셋이 평행이에요.',
    wrong={0: '마와 바가 수직이라는 조건을 쓰지 않았어요.', 1: '수직이 많으니 모두 평행이라고 생각했어요.', 2: '수직과 평행을 헷갈렸어요.'},
    src='디딤돌 기본 94쪽 개념 · 최상위 S 유형(조건 여러 번 쓰기)')

def f424():
    W, H = 9 * CM, 4.5 * CM
    return merge(shape([(0, 0), (W, 0), (W, H), (0, H)], EDGE, '#FDF3E0'),
                 lab((0, 0), 'ㄱ', -10, -6), lab((W, 0), 'ㄴ', 10, -6), lab((W, H), 'ㄷ', 10, 14), lab((0, H), 'ㄹ', -10, 14))
add(code='E4-2-4-2', title='평행과 평행선', r=1, lv='hard', kind='mc',
    stem='직사각형 모양의 종이를 변 ㄱㄴ이 변 ㄹㄷ에 닿도록 반으로 접고, 접은 채로 한 번 더 같은 방향으로 반을 접었다가 펼쳤습니다. 접힌 선과 종이의 네 변 가운데 변 ㄱㄴ과 평행한 것은 모두 몇 개입니까?',
    fig=f424, choices=['4개', '2개', '3개', '5개', '6개'], answer=0, val=4,
    explain='두 번 접으면 접힌 선이 가로로 3개 생겨요(가운데 1개 + 그 위아래 2개). 여기에 변 ㄹㄷ까지 4개가 변 ㄱㄴ과 평행해요.',
    wrong={2: '접힌 선만 세고 변 ㄹㄷ을 빠뜨렸어요.', 1: '접은 횟수만큼 선이 생긴다고 생각했어요.', 3: '변 ㄱㄴ 자기 자신까지 셌어요.'},
    src='디딤돌 기본 94쪽 개념 · 발전 문제 응용')

# ════════════════ E4-2-4-3 평행선 사이의 거리 ════════════════
def f431(hl=()):
    Wd, H = 360, 112
    f = merge(line((-10, 0), (Wd, 0), INK, 1.8), line((-10, H), (Wd, H), INK, 1.8), lab((Wd + 16, 0), '가', 0, 5), lab((Wd + 16, H), '나', 0, 5))
    segs = {'a': ((28, 0), (88, H)), 'b': ((128, 0), (128, H)), 'c': ((200, 0), (148, H)), 'd': ((246, 0), (246, H)), 'e': ((280, 0), (340, H))}
    for k, (p, q) in segs.items():
        f = merge(f, tline(k, p, q, k in hl))
    return f
add(code='E4-2-4-3', title='평행선 사이의 거리', r=1, lv='basic', kind='tap',
    stem='직선 가와 직선 나는 서로 평행합니다. 평행선 사이의 거리를 나타내는 선분을 모두 눌러 보세요.', fig=f431,
    tap=['b', 'd'], explain='평행선 사이의 거리는 두 직선에 수직인 선분의 길이예요. 수직인 선분 2개를 모두 골라야 해요.',
    wrong={'비스듬한 선분을 누름': '두 직선을 잇기만 하면 거리라고 생각했어요.', '하나만 누름': '평행선 사이의 거리를 나타내는 선분이 하나뿐이라고 생각했어요.'},
    src='디딤돌 기본 100쪽 14번 유형')

def f432():
    A, B, C, Dd = pt((3, 0)), pt((-3, 8)), pt((13, 8)), pt((9, 0))
    M = pt((9, 8))
    return merge(shape([A, B, C, Dd]), line(Dd, M, GRAY, 1.5, True), right_angle(M, Dd, C, 10),
                 lab(A, 'ㄱ', -8, -8), lab(B, 'ㄴ', -12, 8), lab(C, 'ㄷ', 12, 8), lab(Dd, 'ㄹ', 8, -8), lab(M, 'ㅁ', 0, 20),
                 tag((A[0] + Dd[0]) / 2, -10, '6 cm', SOFT, 12.5), tag((B[0] + C[0]) / 2, C[1] + 34, '16 cm', SOFT, 12.5),
                 cmlab(B, A, '10 cm', -1, 18), tag(M[0] + 30, (Dd[1] + M[1]) / 2 + 4, '8 cm', SOFT, 12.5))
add(code='E4-2-4-3', title='평행선 사이의 거리', r=1, lv='basic', kind='mc',
    stem='사각형 ㄱㄴㄷㄹ에서 변 ㄱㄹ과 변 ㄴㄷ은 서로 평행합니다. 평행선 사이의 거리는 몇 cm입니까?', fig=f432,
    choices=['6 cm', '10 cm', '8 cm', '16 cm', '22 cm'], answer=2, val=8,
    explain='평행한 두 변에 수직인 선분 ㄹㅁ의 길이가 평행선 사이의 거리예요. 8 cm예요.',
    wrong={1: '비스듬한 변 ㄱㄴ의 길이를 골랐어요.', 0: '평행한 변의 길이를 거리라고 생각했어요.', 3: '평행한 변의 길이를 거리라고 생각했어요.'},
    src='디딤돌 발전 114쪽 7·8번 유형')

add(code='E4-2-4-3', title='평행선 사이의 거리', r=1, lv='hard', kind='mc',
    stem='직선 가와 직선 나는 서로 평행하고, 평행선 사이의 거리는 4 cm입니다. 직선 나와 평행하고 직선 나와의 거리가 7 cm인 직선 다를 그었습니다. 직선 가와 직선 다 사이의 거리가 될 수 있는 것을 모두 고른 것은 어느 것입니까?',
    fig=None, choices=['3 cm', '11 cm', '4 cm, 7 cm', '3 cm, 11 cm', '28 cm'], answer=3, val='3,11',
    explain='직선 다는 직선 나의 위쪽에도, 아래쪽에도 그을 수 있어요. 직선 가와 같은 쪽이면 7 − 4 = 3 cm, 반대쪽이면 4 + 7 = 11 cm예요.',
    wrong={0: '직선 다를 한쪽에만 그렸어요.', 1: '직선 다를 한쪽에만 그렸어요.', 2: '주어진 거리를 그대로 골랐어요.'},
    src='디딤돌 발전 114쪽 3번 · 최상위 S 유형')

def f434():
    s = [3, 5, 7]; x = 0; f = Fig(); base = 7 * CM
    nm = ['가', '나', '다']
    for i, a in enumerate(s):
        w = a * CM
        f = merge(f, shape([(x, base - w), (x + w, base - w), (x + w, base), (x, base)], EDGE, ['#E8F1FC', '#FDF3E0', '#E6F4EC'][i]),
                  tag(x + w / 2, base - w / 2 + 5, nm[i], INK, 14))
        x += w
    W = x
    f = merge(f, lab((0, base - 3 * CM), 'ㄱ', 0, -8), lab((0, base), 'ㄴ', 0, 18), lab((W, base - 7 * CM), 'ㄹ', 0, -8), lab((W, base), 'ㄷ', 0, 18),
              dim_v(base - 3 * CM, base, -24, '3 cm'), tag(3 * CM + 2.5 * CM, base - 5 * CM - 10, '5 cm', SOFT, 12.5),
              dim_v(base - 7 * CM, base, W + 24, '7 cm', left=False))
    return f
add(code='E4-2-4-3', title='평행선 사이의 거리', r=1, lv='hard', kind='mc',
    stem='크기가 다른 정사각형 가, 나, 다를 겹치지 않게 이어 붙였습니다. 변 ㄱㄴ과 변 ㄹㄷ은 서로 평행합니다. 변 ㄱㄴ과 변 ㄹㄷ 사이의 거리는 몇 cm입니까?',
    fig=f434, choices=['7 cm', '15 cm', '10 cm', '12 cm', '20 cm'], answer=1, val=15,
    explain='거리는 변 ㄱㄴ에서 변 ㄹㄷ까지 수직으로 잰 길이, 곧 세 정사각형의 가로를 이은 길이예요. 정사각형은 네 변이 같으니 3 + 5 + 7 = 15 cm예요.',
    wrong={0: '변 ㄹㄷ의 길이를 거리라고 생각했어요.', 2: '나의 가로를 빠뜨렸어요.', 3: '가의 가로를 빠뜨렸어요.'},
    src='최상위 S 4-2 93쪽 1-1·1-2 유형')

# ════════════════ E4-2-4-4 사다리꼴 ════════════════
Q441 = {'가': [(1, 1), (3, 1), (4, 4), (0, 4)], '나': [(7, 1), (10, 1), (9, 4), (6, 4)], '다': [(12, 1), (15, 1), (15, 4), (12, 4)],
        '라': [(17, 2), (19, 0), (21, 1), (20, 4)], '마': [(23, 1), (26, 0), (26, 4), (23, 3)]}
def f441(hl=()):
    f = gridbg(-1, -1, 28, 5)
    for k, q in Q441.items():
        f = merge(f, tshape(k, [pt(p, G) for p in q], k in hl, k))
    return f
add(code='E4-2-4-4', title='사다리꼴', r=1, lv='basic', kind='tap',
    stem='사다리꼴을 모두 눌러 보세요.', fig=f441, tap=['가', '나', '다', '마'],
    explain='평행한 변이 한 쌍이라도 있으면 사다리꼴이에요. 평행사변형(나)과 직사각형(다)도 평행한 변이 있어서 사다리꼴이고, 돌려 놓은 마도 사다리꼴이에요.',
    wrong={'나·다를 빼먹음': '평행사변형·직사각형은 사다리꼴이 아니라고 생각했어요.', '마를 빼먹음': '사다리꼴은 위아래가 평행한 모양이라고만 생각했어요.', '라를 누름': '평행한 변이 있는지 확인하지 않았어요.'},
    src='디딤돌 기본 106쪽 1번 유형')

Q442 = [(1, 0), (0, 3), (3, 6), (5, 0)]       # ㄱㄴㄷㄹ
def f442():
    q = [pt(p, G) for p in Q442]
    return merge(gridbg(-1, -1, 7, 7), shape(q), lab(q[0], 'ㄱ', -8, -8), lab(q[1], 'ㄴ', -12, 4), lab(q[2], 'ㄷ', 0, 18), lab(q[3], 'ㄹ', 10, -6))
add(code='E4-2-4-4', title='사다리꼴', r=1, lv='basic', kind='mc',
    stem='사다리꼴 ㄱㄴㄷㄹ에서 변 ㄱㄴ과 평행한 변은 어느 것입니까?', fig=f442,
    choices=['변 ㄴㄷ', '변 ㄷㄹ', '변 ㄱㄹ', '변 ㄴㄷ과 변 ㄷㄹ', '평행한 변이 없습니다.'], answer=1, val='ㄷㄹ',
    explain='변 ㄱㄴ은 왼쪽으로 1칸 갈 때 아래로 3칸 내려가요. 변 ㄹㄷ은 왼쪽으로 2칸, 아래로 6칸 — 똑같이 기울어져 평행해요.',
    wrong={2: '맞은편 변이 아니라 이웃한 변을 골랐어요.', 0: '이웃한 변을 골랐어요.', 4: '모눈 칸을 세어 기울기를 비교하지 않았어요.'},
    src='디딤돌 기본 106쪽 2번 유형')

def f443():
    W, H = 12, 5
    return merge(gridbg(0, 0, W, H), shape([pt(p, G) for p in [(0, 0), (W, 0), (W, H), (0, H)]], EDGE, '#FDF3E0'),
                 line(pt((3, 0), G), pt((5, 5), G), '#B55B45', 1.8, True), line(pt((8, 0), G), pt((8, 5), G), '#B55B45', 1.8, True))
add(code='E4-2-4-4', title='사다리꼴', r=1, lv='hard', kind='mc',
    stem='직사각형 모양의 종이를 점선 2개를 따라 잘랐습니다. 잘라 낸 조각 3개 가운데 사다리꼴은 모두 몇 개입니까?', fig=f443,
    choices=['0개', '1개', '2개', '3개', '4개'], answer=3, val=3,
    explain='직사각형의 위 변과 아래 변은 평행해서, 자른 조각마다 위·아래 변이 평행하게 남아요. 오른쪽 직사각형 조각도 평행한 변이 있으니 사다리꼴이에요. 3개 모두예요.',
    wrong={2: '직사각형 조각은 사다리꼴이 아니라고 생각했어요.', 1: '사다리꼴 모양(위아래 길이가 다른 것)만 골랐어요.'},
    src='디딤돌 기본 107쪽 6번 · 발전 117쪽 22번 유형')

N444 = {'ㄴ': (0, 5), 'ㄷ': (6, 5), 'ㄹ': (5, 3)}
C444 = {'①': (0, 1), '②': (0, 3), '③': (-2, 1), '④': (1, 1), '⑤': (-1, 3)}
G444 = (4, 0)    # 지금 ㄱ (후보 점이 모두 도형 바깥에 오게)
def f444(hl=()):
    g = lambda p: pt(p, G)
    q = [g(G444), g(N444['ㄴ']), g(N444['ㄷ']), g(N444['ㄹ'])]
    f = merge(gridbg(-3, -1, 8, 6), shape(q, EDGE, FILL, 1.6),
              lab(q[0], 'ㄱ', 0, -8), lab(q[1], 'ㄴ', -10, 14), lab(q[2], 'ㄷ', 10, 14), lab(q[3], 'ㄹ', 12, -2))
    for k, p in C444.items():
        P2 = g(p); hot = k in hl
        inner = Fig(); inner.add('<circle cx="%.1f" cy="%.1f" r="13" fill="transparent"/>' % P2, [(P2[0] - 13, P2[1] - 13), (P2[0] + 13, P2[1] + 13)])
        inner.add('<circle cx="%.1f" cy="%.1f" r="%s" fill="%s"/>' % (P2[0], P2[1], 6 if hot else 4, HOT if hot else '#3B6FA8'), [P2])
        f = merge(f, tapg(k, inner, hot), lab(P2, k, 0, -11, 12.5, SOFT))
    return f
TAP444 = sorted(k for k, p in C444.items() if quad_par_pairs([p, N444['ㄴ'], N444['ㄷ'], N444['ㄹ']]) >= 1 and simple([p, N444['ㄴ'], N444['ㄷ'], N444['ㄹ']]))
add(code='E4-2-4-4', title='사다리꼴', r=1, lv='hard', kind='tap',
    stem='꼭짓점 ㄱ만 옮겨서 사각형 ㄱㄴㄷㄹ을 사다리꼴로 만들려고 합니다. 꼭짓점 ㄱ을 옮길 수 있는 점을 모두 눌러 보세요.', fig=f444,
    tap=TAP444,
    explain='변 ㄱㄹ이 변 ㄴㄷ과 평행해지는 점(②, ⑤), 또는 변 ㄱㄴ이 변 ㄹㄷ과 평행해지는 점(③, ⑤)으로 옮기면 돼요. ⑤는 두 쌍이 다 평행한 평행사변형인데, 평행사변형도 사다리꼴이에요.',
    wrong={'⑤를 빼먹음': '평행사변형은 사다리꼴이 아니라고 생각했어요.', '③을 빼먹음': '아래 변과 평행한 경우만 생각했어요(비스듬한 평행은 놓침).'},
    src='디딤돌 기본 108쪽 8번 유형(사다리꼴로 바꿈)')

# ════════════════ E4-2-4-5 평행사변형 ════════════════
def para(b, side, a_deg, o=(0, 0)):
    """ㄴ=o 에서 ㄴㄷ=b cm 오른쪽, ㄴㄱ=side cm 를 a_deg 만큼 위로 (cm)"""
    N = o; C = (o[0] + b, o[1]); A = (o[0] + side * math.cos(math.radians(a_deg)), o[1] - side * math.sin(math.radians(a_deg)))
    Dd = (A[0] + b, A[1]); return A, N, C, Dd

def f451():
    A, N, C, Dd = [pt(p) for p in para(7, 4, 65)]
    return merge(shape([A, N, C, Dd]), lab(A, 'ㄱ', -6, -8), lab(N, 'ㄴ', -10, 12), lab(C, 'ㄷ', 10, 12), lab(Dd, 'ㄹ', 8, -8),
                 ang(N, C, A, '65°', 22, lab_d=16), ang(A, N, Dd, '㉠', 20, lab_d=13))
add(code='E4-2-4-5', title='평행사변형', r=1, lv='basic', kind='mc',
    stem='평행사변형 ㄱㄴㄷㄹ입니다. ㉠의 크기는 몇 도입니까?', fig=f451,
    choices=['25°', '115°', '65°', '105°', '125°'], answer=1, val=180 - 65,
    explain='평행사변형에서 이웃한 두 각의 크기의 합은 180°예요. 180° − 65° = 115°예요.',
    wrong={2: '이웃한 두 각의 크기가 같다고 생각했어요(같은 건 마주 보는 각).', 0: '90°에서 뺐어요.'},
    src='디딤돌 기본 108쪽 9번 유형')

def f452():
    A, N, C, Dd = [pt(p) for p in para(10, 6, 110)]
    return merge(shape([A, N, C, Dd], EDGE, '#FDF3E0'), lab(A, 'ㄱ', -8, -8), lab(N, 'ㄴ', -10, 12), lab(C, 'ㄷ', 10, 12), lab(Dd, 'ㄹ', 8, -8),
                 cmlab(N, A, '6 cm', -1, 18), tag((N[0] + C[0]) / 2, N[1] + 20, '10 cm', SOFT, 12.5))
add(code='E4-2-4-5', title='평행사변형', r=1, lv='basic', kind='mc',
    stem='평행사변형 ㄱㄴㄷㄹ의 네 변의 길이의 합은 몇 cm입니까?', fig=f452,
    choices=['16 cm', '22 cm', '26 cm', '60 cm', '32 cm'], answer=4, val=32,
    explain='마주 보는 두 변의 길이가 같아요. 6 + 10 + 6 + 10 = 32 cm예요.',
    wrong={0: '보이는 두 변만 더했어요.', 1: '마주 보는 변 하나를 빠뜨렸어요.', 3: '두 길이를 곱했어요.'},
    src='디딤돌 기본 109쪽 11번 유형')

def f453():
    A, N, C, Dd = [pt(p) for p in para(4.46, 5, 75)]
    return merge(shape([A, N, C, Dd]), line(N, Dd, GRAY, 1.5), lab(A, 'ㄱ', -8, -8), lab(N, 'ㄴ', -10, 12), lab(C, 'ㄷ', 10, 12), lab(Dd, 'ㄹ', 8, -8),
                 ang(N, C, Dd, '40°', 34, lab_d=16), ang(N, Dd, A, '35°', 50, lab_d=14), ang(C, Dd, N, '㉠', 20, lab_d=13))
add(code='E4-2-4-5', title='평행사변형', r=1, lv='hard', kind='mc',
    stem='평행사변형 ㄱㄴㄷㄹ에 선분 ㄴㄹ을 그었습니다. ㉠의 크기는 몇 도입니까?', fig=f453,
    choices=['75°', '95°', '105°', '140°', '115°'], answer=2, val=180 - 75,
    explain='각 ㄱㄴㄷ = 35° + 40° = 75°예요. ㉠(각 ㄴㄷㄹ)은 각 ㄱㄴㄷ과 이웃한 각이라 180° − 75° = 105°예요.',
    wrong={0: '마주 보는 각과 이웃한 각을 헷갈렸어요.', 3: '40°만 보고 180°에서 뺐어요.', 4: '35°만 보고 계산했어요.'},
    src='디딤돌 발전 116쪽 13~15번 유형')

def f454():
    A, N, C, Dd = [pt(p) for p in para(10, 8, 62)]
    s = 9 * CM; ox = Dd[0] + 50; oy = N[1] - s
    sq = shape([(ox, oy), (ox + s, oy), (ox + s, oy + s), (ox, oy + s)], '#3C8B64', '#E6F4EC')
    return merge(shape([A, N, C, Dd]), lab(A, 'ㄱ', -8, -8), lab(N, 'ㄴ', -10, 12), lab(C, 'ㄷ', 10, 12), lab(Dd, 'ㄹ', 8, -8),
                 cmlab(N, A, '8 cm', -1, 18), sq, dim_h(ox, ox + s, oy + s + 14, '9 cm'))
add(code='E4-2-4-5', title='평행사변형', r=1, lv='hard', kind='mc',
    stem='평행사변형 ㄱㄴㄷㄹ과 정사각형의 네 변의 길이의 합이 같습니다. 변 ㄴㄷ의 길이는 몇 cm입니까?', fig=f454,
    choices=['1 cm', '4 cm', '10 cm', '18 cm', '28 cm'], answer=2, val=10,
    explain='정사각형의 네 변의 합은 9 × 4 = 36 cm예요. 평행사변형은 이웃한 두 변의 합이 그 반인 18 cm라서 18 − 8 = 10 cm예요.',
    wrong={4: '36에서 8만 뺐어요(마주 보는 변을 빠뜨림).', 3: '이웃한 두 변의 합에서 멈췄어요.', 0: '9에서 8을 뺐어요.'},
    src='디딤돌 발전 115쪽 11·12번 유형')

# ════════════════ E4-2-4-6 마름모 ════════════════
def rh(side, a_deg, o=(0, 0)):
    """마름모 ㄱ(위) ㄴ(왼) ㄷ(아래) ㄹ(오른) — ㄴ 의 각 a_deg (cm)"""
    h = side * math.sin(math.radians(a_deg / 2)); w = side * math.cos(math.radians(a_deg / 2))
    N = o; R = (o[0] + 2 * w, o[1]); A = (o[0] + w, o[1] - h); C = (o[0] + w, o[1] + h)
    return A, N, C, R

def f461():
    A, N, C, R = [pt(p) for p in rh(6, 70)]
    return merge(shape([A, N, C, R]), lab(A, 'ㄱ', 0, -8), lab(N, 'ㄴ', -12, 5), lab(C, 'ㄷ', 0, 20), lab(R, 'ㄹ', 12, 5),
                 cmlab(N, A, '6 cm', 1, 16), ang(N, A, C, '70°', 26, lab_d=17))
add(code='E4-2-4-6', title='마름모', r=1, lv='basic', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ에서 변 ㄷㄹ의 길이와 각 ㄱㄹㄷ의 크기를 차례로 쓴 것은 어느 것입니까?', fig=f461,
    choices=['6 cm, 110°', '12 cm, 70°', '6 cm, 70°', '3 cm, 110°', '6 cm, 35°'], answer=2, val=('6 cm', 70),
    explain='마름모는 네 변의 길이가 모두 같아서 변 ㄷㄹ도 6 cm예요. 각 ㄱㄹㄷ은 각 ㄱㄴㄷ과 마주 보는 각이라 70°예요.',
    wrong={0: '마주 보는 각과 이웃한 각을 헷갈렸어요.', 4: '대각선이 각을 반으로 나눈 것과 헷갈렸어요.', 1: '변 길이를 두 배로 생각했어요.'},
    src='디딤돌 기본 110쪽 14번 유형')

def f462(hl=()):
    A, N, C, R = [pt(p) for p in [(3, -5), (0, 0), (3, 5), (6, 0)]]
    O = pt((3, 0))
    f = merge(shape([A, N, C, R], EDGE, FILL, 1.6), line(A, O, '#3C8B64', 3.2),
              tline('ㅇㄴ', O, N, 'ㅇㄴ' in hl), tline('ㅇㄷ', O, C, 'ㅇㄷ' in hl), tline('ㅇㄹ', O, R, 'ㅇㄹ' in hl),
              lab(A, 'ㄱ', 0, -8), lab(N, 'ㄴ', -12, 5), lab(C, 'ㄷ', 0, 20), lab(R, 'ㄹ', 12, 5), lab(O, 'ㅇ', 12, 16))
    return f
add(code='E4-2-4-6', title='마름모', r=1, lv='basic', kind='tap',
    stem='마름모 ㄱㄴㄷㄹ의 두 대각선이 점 ㅇ에서 만납니다. 초록색 선분 ㄱㅇ과 길이가 같은 선분을 모두 눌러 보세요.', fig=f462,
    tap=['ㅇㄷ'], explain='마름모의 두 대각선은 서로를 똑같이 둘로 나눠요. 그래서 선분 ㄱㅇ과 선분 ㅇㄷ의 길이가 같아요. 선분 ㅇㄴ, ㅇㄹ은 다른 대각선의 반이라 길이가 달라요.',
    wrong={'ㅇㄴ·ㅇㄹ도 누름': '네 선분이 모두 같다고 생각했어요(정사각형일 때만 그래요).'},
    src='디딤돌 기본 111쪽 개념 확인(마름모의 성질)')

def f463():
    A, N, C, R = [pt(p) for p in rh(5, 60)]
    return merge(shape([A, N, C, R], EDGE, '#FDF3E0'), lab(A, 'ㄱ', 0, -8), lab(N, 'ㄴ', -12, 5), lab(C, 'ㄷ', 0, 20), lab(R, 'ㄹ', 12, 5))
add(code='E4-2-4-6', title='마름모', r=1, lv='hard', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ에서 각 ㄴㄱㄹ의 크기는 각 ㄱㄴㄷ의 크기의 2배입니다. 각 ㄴㄷㄹ의 크기는 몇 도입니까?', fig=f463,
    choices=['120°', '30°', '60°', '90°', '150°'], answer=0, val=120,
    explain='이웃한 두 각의 합은 180°이고, 각 ㄴㄱㄹ이 각 ㄱㄴㄷ의 2배라 각 ㄱㄴㄷ = 60°, 각 ㄴㄱㄹ = 120°예요. 각 ㄴㄷㄹ은 각 ㄴㄱㄹ과 마주 보는 각이라 120°예요.',
    wrong={2: '마주 보는 각을 잘못 짝 지었어요(각 ㄴㄷㄹ의 맞은편은 각 ㄴㄱㄹ).', 3: '네 각을 모두 같게 생각했어요.'},
    src='디딤돌 기본 111쪽 18번 유형')

def f464():
    A, N, C, R = [pt(p) for p in rh(5, 76)]
    # 정삼각형을 변 ㄱㄹ 바깥쪽(오른쪽 위)에 붙임
    ux, uy = R[0] - A[0], R[1] - A[1]
    Tp = (A[0] + ux / 2 + uy * math.sqrt(3) / 2, A[1] + uy / 2 - ux * math.sqrt(3) / 2)
    return merge(shape([A, N, C, R], EDGE, FILL), shape([A, Tp, R], '#3C8B64', '#E6F4EC'),
                 lab(A, 'ㄱ', -6, -10), lab(N, 'ㄴ', -12, 5), lab(C, 'ㄷ', 0, 20), lab(R, 'ㄹ', 12, 8), lab(Tp, 'ㅁ', 8, -6),
                 cmlab(N, C, '5 cm', 1, 16))
add(code='E4-2-4-6', title='마름모', r=1, lv='hard', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ과 정삼각형 ㄱㅁㄹ을 겹치지 않게 이어 붙였습니다. 이어 붙인 도형의 둘레는 몇 cm입니까?', fig=f464,
    choices=['15 cm', '20 cm', '35 cm', '30 cm', '25 cm'], answer=4, val=25,
    explain='마름모의 네 변과 정삼각형의 세 변은 모두 변 ㄱㄹ과 같은 5 cm예요. 둘레는 겹친 변 ㄱㄹ을 뺀 5개의 변이라 5 × 5 = 25 cm예요.',
    wrong={2: '두 도형의 둘레를 그냥 더했어요(안쪽 변 ㄱㄹ도 셈).', 3: '안쪽 변 ㄱㄹ을 한 번만 뺐어요.', 1: '마름모의 둘레만 셌어요.'},
    src='디딤돌 발전 116쪽 17·18번 유형(이어 붙인 도형)')

# ════════════════ E4-2-4-7 여러 가지 사각형 ════════════════
add(code='E4-2-4-7', title='여러 가지 사각형', r=1, lv='basic', kind='mc',
    stem='정사각형에 대한 설명으로 잘못된 것은 어느 것입니까?', fig=None,
    choices=['직사각형이라고 할 수 있습니다.', '마름모라고 할 수 있습니다.', '평행사변형이라고 할 수 있습니다.',
             '사다리꼴이라고 할 수 없습니다.', '마주 보는 꼭짓점끼리 이은 두 선분이 서로 수직으로 만납니다.'],
    answer=3, val='사다리꼴',
    explain='정사각형은 평행한 변이 있으니 사다리꼴이라고도 할 수 있어요. 나머지는 모두 맞는 말이에요.',
    wrong={4: '마름모의 성질이 정사각형에도 있다는 것을 몰랐어요.', 1: '마름모는 각이 직각이 아닌 것이라고만 생각했어요.'},
    src='디딤돌 기본 112쪽 21번 유형')

Q472 = {'가': [(0, 0), (3, 1), (4, 4), (1, 3)], '나': [(6, 1), (10, 1), (10, 3), (6, 3)], '다': [(13, 0), (17, 0), (16, 3), (12, 3)],
        '라': [(19, 0), (22, 0), (22, 3), (19, 3)], '마': [(25, 0), (27, 0), (28, 3), (24, 3)]}
def f472(hl=()):
    f = gridbg(-1, -1, 29, 5)
    for k, q in Q472.items():
        f = merge(f, tshape(k, [pt(p, G) for p in q], k in hl, k))
    return f
add(code='E4-2-4-7', title='여러 가지 사각형', r=1, lv='basic', kind='tap',
    stem='네 각이 모두 직각인 사각형을 모두 눌러 보세요.', fig=f472, tap=['나', '라'],
    explain='네 각이 모두 직각인 사각형은 직사각형이에요. 정사각형(라)도 네 각이 모두 직각이라 직사각형이에요.',
    wrong={'라를 빼먹음': '정사각형은 직사각형이 아니라고 생각했어요.', '가를 누름': '네 변이 같으면 각도 직각이라고 생각했어요(마름모).'},
    src='디딤돌 기본 112쪽 20번 유형')

add(code='E4-2-4-7', title='여러 가지 사각형', r=1, lv='hard', kind='mc',
    stem='길이가 8 cm인 막대 2개와 5 cm인 막대 2개가 있습니다. 네 막대를 모두 변으로 써서 만들 수 있는 사각형을 모두 고른 것은 어느 것입니까?',
    fig=None, choices=['평행사변형, 직사각형', '직사각형', '마름모, 정사각형',
                       '사다리꼴, 평행사변형, 직사각형, 마름모', '사다리꼴, 평행사변형, 직사각형'], answer=4, val='사평직',
    explain='같은 길이의 막대를 마주 보게 놓으면 평행사변형이 되고, 각을 직각으로 하면 직사각형이 돼요. 평행사변형은 사다리꼴이기도 해요. 네 변의 길이가 같지 않아 마름모·정사각형은 안 돼요.',
    wrong={0: '평행사변형도 사다리꼴이라는 것을 빠뜨렸어요.', 3: '마름모는 네 변의 길이가 모두 같아야 해요.', 1: '각을 직각으로 해야만 사각형이 된다고 생각했어요.'},
    src='디딤돌 기본 113쪽 22번 유형')

def f474():
    W, H = 14 * CM * 0.8, 9 * CM * 0.8
    m = 9 * CM * 0.8
    return merge(shape([(0, 0), (W, 0), (W, H), (0, H)], EDGE, '#FDF3E0'), line((m, 0), (m, H), '#B55B45', 1.8, True),
                 lab((0, 0), 'ㄱ', -10, -6), lab((W, 0), 'ㄴ', 10, -6), lab((W, H), 'ㄷ', 10, 14), lab((0, H), 'ㄹ', -10, 14),
                 lab((m, 0), 'ㅁ', 0, -8), lab((m, H), 'ㅂ', 0, 20), dim_h(0, W, -26, '14 cm', below=False), dim_v(0, H, -26, '9 cm'))
add(code='E4-2-4-7', title='여러 가지 사각형', r=1, lv='hard', kind='mc',
    stem='직사각형 ㄱㄴㄷㄹ을 선분 ㅁㅂ을 따라 잘라 정사각형 ㄱㅁㅂㄹ과 직사각형 ㅁㄴㄷㅂ으로 나누었습니다. 직사각형 ㅁㄴㄷㅂ의 네 변의 길이의 합은 몇 cm입니까?', fig=f474,
    choices=['28 cm', '18 cm', '23 cm', '32 cm', '46 cm'], answer=0, val=28,
    explain='정사각형은 네 변이 같아서 선분 ㄱㅁ = 9 cm, 선분 ㅁㄴ = 14 − 9 = 5 cm예요. 직사각형 ㅁㄴㄷㅂ의 둘레는 5 + 9 + 5 + 9 = 28 cm예요.',
    wrong={4: '처음 직사각형의 둘레를 구했어요.', 2: '마주 보는 변 하나를 빠뜨렸어요.', 1: '세로 두 변만 더했어요.'},
    src='최상위 S 4-2 90쪽 여러 가지 사각형 유형')

# ════════════════ 검산 ════════════════
def check():
    # 그림의 각이 문제의 수와 맞나
    assert abs(angle_at((0, 0), deg(0), deg(38)) - 38) < 1e-6
    # 4-1 수선: a, c 만 직각
    for tid, a in [('d', 55), ('a', 90), ('b', 120), ('c', 90)]:
        assert (abs(a - 90) < 1e-9) == (tid in ('a', 'c'))
    # 4-2 평행: 기울기 (3,-1)
    g = L421['가']; u = vec(*g)
    ans = sorted(k for k, s in L421.items() if k != '가' and par(u, vec(*s)))
    assert ans == ['다', '마'], ans
    # 오각형 평행 쌍 = 2
    E = [vec(PENT[i], PENT[(i + 1) % 5]) for i in range(5)]
    assert sum(par(E[i], E[j]) for i in range(5) for j in range(i + 1, 5)) == 2
    # 4-4 사다리꼴 찾기
    tr = sorted(k for k, q in Q441.items() if quad_par_pairs(q) >= 1)
    assert tr == ['가', '나', '다', '마'], tr
    assert quad_par_pairs(Q441['라']) == 0 and all(simple(q) for q in Q441.values())
    # 변 ㄱㄴ ∥ 변 ㄹㄷ 만
    q = Q442; assert par(vec(q[0], q[1]), vec(q[3], q[2])) and not par(vec(q[0], q[3]), vec(q[1], q[2])) and simple(q)
    # ㄱ 옮기기
    assert TAP444 == ['②', '③', '⑤'], TAP444
    assert quad_par_pairs([G444, N444['ㄴ'], N444['ㄷ'], N444['ㄹ']]) == 0
    # 평행사변형 각
    A, N, C, Dd = para(4.46, 5, 75)
    assert abs(angle_at(N, C, Dd) - 40) < 0.2 and abs(angle_at(N, Dd, A) - 35) < 0.2, (angle_at(N, C, Dd), angle_at(N, Dd, A))
    assert abs(angle_at(C, N, Dd) - 105) < 0.01
    # 마름모 각
    A, N, C, R = rh(5, 60); assert abs(angle_at(C, N, R) - 120) < 1e-6 and abs(angle_at(A, N, R) - 120) < 1e-6
    A, N, C, R = rh(6, 70); assert abs(angle_at(R, A, C) - 70) < 1e-6
    # 여러 가지 사각형: 직각 넷인 것
    rect = sorted(k for k, q in Q472.items() if all(abs(angle_at(q[i], q[i - 1], q[(i + 1) % 4]) - 90) < 1e-9 for i in range(4)))
    assert rect == ['나', '라'], rect
    v = [vec(Q472['가'][i], Q472['가'][(i + 1) % 4]) for i in range(4)]
    assert len({round(math.hypot(*x), 6) for x in v}) == 1 and abs(angle_at(*[Q472['가'][1], Q472['가'][0], Q472['가'][2]]) - 90) > 1
    # 5지 · 정답 위치 · 값
    pos = [0] * 5
    for p in P:
        if p['kind'] == 'mc':
            assert len(p['choices']) == 5 and len(set(p['choices'])) == 5, p['stem']
            pos[p['answer']] += 1
            v = p['val']
            if isinstance(v, (int, float)):
                assert str(v) in p['choices'][p['answer']], (p['stem'], v, p['choices'][p['answer']])
    print('정답 위치(①~⑤):', pos)
    print('문항', len(P), '· 5지', sum(p['kind'] == 'mc' for p in P), '· 누르기', sum(p['kind'] == 'tap' for p in P))

# ════════════════ 견본 PDF ════════════════
CSS = '''@page{size:A4;margin:10mm 11mm}
body{font-family:Pretendard,'맑은 고딕',sans-serif;color:#2A2350;font-size:12.5px;line-height:1.55;margin:0}
h1{font-size:20px;margin:0 0 6px} h2{font-size:15px;margin:14px 0 6px;padding:4px 10px;background:#EEF2FB;border-radius:6px;page-break-after:avoid;break-after:avoid}
.note{background:#FFF7D6;border:1px solid #EBD58A;border-radius:8px;padding:9px 12px;margin:8px 0}
.note li{margin:2px 0}
.card{border:1px solid #D8DCEB;border-radius:10px;padding:10px 12px;margin:9px 0;page-break-inside:avoid}
.hd{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:6px;font-size:11.5px}
.b{padding:1px 8px;border-radius:10px;background:#EEF2FB;color:#3B4A7A;font-weight:700}
.b.hard{background:#FBE7E0;color:#9A3F2B} .b.tap{background:#FFF0DC;color:#A65A16} .src{color:#8A7BB0;margin-left:auto}
.stem{font-size:14px;font-weight:700;margin:4px 0 8px}
.figs{margin:6px 0} .figs>div{display:inline-block;vertical-align:top;margin-right:22px}
.figs .cap{font-size:11px;color:#8A7BB0;text-align:center;margin-top:2px}
.ch{margin:2px 0 2px 6px} .ch.ok{color:#1F7A4D;font-weight:800}
.ex{background:#F4F8F2;border-radius:6px;padding:6px 9px;margin-top:6px}
.wr{font-size:11.5px;color:#6E6A86;margin-top:4px} .wr b{color:#9A3F2B}
table.t{border-collapse:collapse;margin:6px 0;font-size:12px} .t td,.t th{border:1px solid #D8DCEB;padding:3px 8px}
'''
NUM = '①②③④⑤'
import re
def fsvg(f, maxw, maxh):
    """그림을 정해진 칸 안으로 줄여서 (A4 한 쪽에 문제 두세 개가 들어가게)"""
    x, y, w, h = f.bbox(16)
    k = min(1.0, maxw / w, maxh / h)
    return re.sub(r'width="\d+"', 'width="%.0f"' % (w * k), svg(f), count=1), w * k

def card(p, i):
    lvn = 'mission 1 (기본)' if p['lv'] == 'basic' else 'hard mission 1 (응용)'
    kd = '👆 누르기' if p['kind'] == 'tap' else '5지선다'
    o = ['<div class="card"><div class="hd"><span class="b">%d</span><span class="b">%s %s</span><span class="b %s">%s</span><span class="b %s">%s</span><span class="src">근거: %s</span></div>'
         % (i, p['code'][-1], p['title'], 'hard' if p['lv'] == 'hard' else '', lvn, 'tap' if p['kind'] == 'tap' else '', kd, html.escape(p['src']))]
    o.append('<div class="stem">%s</div>' % html.escape(p['stem']))
    if p['kind'] == 'tap':
        s1, w1 = fsvg(p['fig'](), 320, 230)
        if w1 > 300: s1, w1 = fsvg(p['fig'](), 600, 170)      # 넓은 모눈 그림은 위아래로
        s2, _ = fsvg(p['fig'](tuple(p['tap'])), 320 if w1 <= 320 else 600, 230 if w1 <= 320 else 170)
        o.append('<div class="figs"><div>%s<div class="cap">아이 화면 — 눌러서 고름</div></div>%s<div>%s<div class="cap">정답(주황) — %s</div></div></div>'
                 % (s1, '' if w1 <= 320 else '<br>', s2, ' · '.join(p['tap'])))
    else:
        if p['fig']:
            o.append('<div class="figs"><div>%s</div></div>' % fsvg(p['fig'](), 420, 240)[0])
        for j, c in enumerate(p['choices']):
            o.append('<div class="ch%s">%s %s%s</div>' % (' ok' if j == p['answer'] else '', NUM[j], html.escape(c), ' ✔' if j == p['answer'] else ''))
    o.append('<div class="ex">해설 · %s</div>' % html.escape(p['explain']))
    if p.get('wrong'):
        w = ' · '.join('<b>%s</b> %s' % (NUM[k] if isinstance(k, int) else html.escape(k), html.escape(v)) for k, v in p['wrong'].items())
        o.append('<div class="wr">이 답을 고르면 어른 기록에 남는 것 → %s</div>' % w)
    o.append('</div>')
    return ''.join(o)

def build():
    o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>견본 문제 초4-2 4단원</title><style>%s</style></head><body>' % CSS]
    o.append('<h1>mission 견본 · 초4-2 4. 사각형 (1회차)</h1>')
    o.append('''<div class="note"><b>이 견본에 적용한 것 (마스터 10/19 결정)</b><ul>
<li>문제는 AI 즉석 출제가 아니라 <b>미리 만들어 검산</b>했고, 그림은 개념 질문과 같은 도구로 그렸어요. 그림에는 <b>조건만</b> — 구하는 값은 ㉠·□로만.</li>
<li><b>5지선다</b> · 오답 4개는 아이들이 실제로 하는 실수의 결과 · 정답 위치를 ①~⑤에 고르게(아래 표).</li>
<li><b>👆 누르기형</b>은 필요한 문제에만(28문항 중 7개, 모두 기본 또는 그림에서 위치를 골라야 하는 문제). "모두 눌러"라서 찍어 맞히기 어렵고, 무엇을 눌렀는지가 어른 기록에 남아요.</li>
<li>근거: mission(기본) = 디딤돌 기본 4-2 소단원 문제 / hard mission(응용) = 디딤돌 발전 문제 · 최상위 S 4-2. 숫자·모양은 모두 새로.</li>
<li>개념 질문 규칙 중 그대로 쓴 것: 교재 표기 · 그림이 답을 말하지 않기 · 그림 재탕 금지 · 그 소단원까지 배운 것만 · 숫자 새로·검산.</li>
<li>오답마다 <b>"이 답이 뜻하는 실수"</b>를 적었어요 → 어른 화면에 "무엇을 헷갈렸는지"로 보여 줄 수 있어요.</li></ul></div>''')
    o.append('''<div class="note"><b>세트 수</b> — 행성(소단원) 하나에 회차마다 <b>mission 1세트 + hard mission 1세트</b> → 3회차 × 2 = <b>행성당 6세트</b>.
4단원은 세트당 2문제라 7개 행성 × 12 = 84문제, 초4-2 전체 약 410문제. 이 견본은 그중 <b>1회차 28문제</b>예요.
모든 학생이 같은 세트를 풀어요(처음 결과만 기록).</div>''')
    pos = [0] * 5
    for p in P:
        if p['kind'] == 'mc': pos[p['answer']] += 1
    o.append('<table class="t"><tr><th>정답 위치</th>%s</tr><tr><td>문항 수</td>%s</tr></table>' % (''.join('<th>%s</th>' % c for c in NUM), ''.join('<td>%d</td>' % n for n in pos)))
    cur = None; i = 0
    for p in P:
        if p['code'] != cur:
            cur = p['code']; o.append('<h2>%s · %s</h2>' % (p['code'], p['title']))
        i += 1; o.append(card(p, i))
    o.append('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    check()
    sys.path.insert(0, HERE)
    import e42_common
    print(e42_common.make_pdf(build(), '견본_문제_초4-2_4단원'))
