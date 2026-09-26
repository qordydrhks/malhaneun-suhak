# -*- coding: utf-8 -*-
"""초5-2 「3. 합동과 대칭」 「5. 직육면체」 질문 그림 (2026-09-26)

고른 기준 — 대전제 세부 원칙(2026-09-23) 그대로
  ✅ 그림이 **조건**을 주는 질문에만 (치수·배치·꼭짓점 이름·대칭축 자리)
  ❌ 뜻·성질을 묻는 질문에는 안 넣는다 ("합동이 뭐야?" · "대응변은 어때?")
  ❌ 그림에서 **세면 답이 나오는** 것도 안 넣는다 (면·모서리·꼭짓점이 몇 개인지 묻는 질문)
  ❌ 구하는 값·대칭의 중심·수직 표시처럼 **답이 되는 것은 그리지 않는다** — '?' 로 둔다

도형 단원 살아 있는 질문 79개 중 21개.
"""
import os, sys, math, importlib.util
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)
S = D.S

FIGS = {}

def _rot(pts, deg, c=(0, 0)):
    """점 목록을 c 를 중심으로 deg 만큼 돌린다"""
    t = math.radians(deg)
    return [(c[0] + (x - c[0]) * math.cos(t) - (y - c[1]) * math.sin(t),
             c[1] + (x - c[0]) * math.sin(t) + (y - c[1]) * math.cos(t)) for x, y in pts]

def _flipx(pts, x0=0):
    return [(2 * x0 - x, y) for x, y in pts]

# ══════════════════════════════════ 3. 합동과 대칭 ══════════════════════════════════

# 3-01 2회차 — 뒤집거나 돌려도 합동인가 (빗금·이름을 넣지 않는다 = 답을 안 준다)
def _f301():
    t = [(0, 0), (104, 0), (30, -72)]
    return D.svg(D.row([
        D.poly(t, 'blue', title='㉠'),
        D.poly(_flipx(t, 52), 'blue', title='㉡ — ㉠을 뒤집은 것'),
        D.poly(_rot(t, 150, (45, -24)), 'blue', title='㉢ — ㉠을 돌린 것'),
    ], gap=40))
FIGS['s301'] = _f301()

# 3-02 1회차 — 합동인 두 삼각형, 한쪽에만 5 cm·60°
def _f302a():
    A, B, C = (0, 0), (126, 0), (34, -84)
    Dp, E, F = (0, 0), (126, 0), (34, -84)
    f1 = D.merge(D.poly([A, B, C], 'blue'),
                 D.dot(C, 'ㄱ', '#3B6FA8', 'above'), D.dot(A, 'ㄴ', '#3B6FA8', 'below'),
                 D.dot(B, 'ㄷ', '#3B6FA8', 'below'),
                 D.tag(6, -46, '5 cm', D.SOFT, 12, anchor='end'),
                 D.ang(A, B, C, '60°', r=26))
    g = _rot([Dp, E, F], 25, (60, -30))
    f2 = D.merge(D.poly(g, 'green'),
                 D.dot(g[2], 'ㄹ', '#3C8B64', 'above'), D.dot(g[0], 'ㅁ', '#3C8B64', 'below'),
                 D.dot(g[1], 'ㅂ', '#3C8B64', 'right'),
                 D.ang(g[0], g[1], g[2], '?', r=26),
                 D.tag((g[0][0] + g[2][0]) / 2 - 9, (g[0][1] + g[2][1]) / 2 + 4,
                       '?', '#B55B45', 13.5, 800, 'end'))
    return D.svg(D.row([f1, f2], gap=54), note='두 삼각형은 서로 합동이에요.')
FIGS['s302a'] = _f302a()

# 3-02 2회차 — 세 변 5·6·7 인 삼각형과 그것에 합동인 삼각형
def _f302b():
    # 5·6·7 을 실제 비율로 (한 칸 = 18 px)
    u = 18
    a, b, c = 7 * u, 6 * u, 5 * u          # 밑변 7 · 왼쪽 5 · 오른쪽 6
    x = (c * c + a * a - b * b) / (2.0 * a)
    y = -math.sqrt(max(c * c - x * x, 1))
    A, B, C = (0, 0), (a, 0), (x, y)
    f1 = D.merge(D.poly([A, B, C], 'blue'),
                 D.tag((A[0] + C[0]) / 2 - 10, (A[1] + C[1]) / 2 + 4, '5 cm', D.SOFT, 12, anchor='end'),
                 D.tag((B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2 + 4, '6 cm', D.SOFT, 12, anchor='start'),
                 D.dim_h(0, a, 16, '7 cm'))
    f2 = D.poly(_rot([A, B, C], 195, (a / 2, y / 2)), 'green')
    return D.svg(D.row([f1, f2], gap=52), note='두 삼각형은 서로 합동이에요.')
FIGS['s302b'] = _f302b()

# 3-02 계단3칸 — 대응점을 헷갈리기 쉽게 한쪽을 돌려 놓은 사각형 두 개
def _f302c():
    q = [(0, 0), (96, -14), (112, 66), (18, 78)]
    f1 = D.poly(q, 'blue')
    for p, nm, at in zip(q, ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'], ['above', 'above', 'below', 'below']):
        f1 = D.merge(f1, D.dot(p, nm, '#3B6FA8', at))
    g = _rot(q, 200, (56, 32))
    f2 = D.poly(g, 'green')
    for p, nm, at in zip(g, ['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ'], ['below', 'below', 'above', 'above']):
        f2 = D.merge(f2, D.dot(p, nm, '#3C8B64', at))
    return D.svg(D.row([f1, f2], gap=56), note='두 사각형은 서로 합동이에요. 오른쪽은 돌려 놓았어요.')
FIGS['s302c'] = _f302c()

# 3-03 3회차 — 대칭축과 반쪽 도형 (그리는 방법을 묻는 질문의 '재료')
def _f303a():
    ax = 0                                   # 대칭축 = x = 0
    half = [(0, 0), (-70, -18), (-96, 40), (-52, 96), (0, 96)]
    f = D.merge(
        D.poly(half, 'blue'),
        D.seg((0, -44), (0, 140), 'dashed', '#B55B45', 1.6),
        D.tag(9, 152, '대칭축', '#B55B45', 12, 700, 'start'),
    )
    return D.svg(f, note='대칭축의 왼쪽만 그려져 있어요.')
FIGS['s303a'] = _f303a()

# 3-03 2회차 — 대응점끼리 이은 선분이 10 cm (수직 표시는 하지 않는다 = 답)
def _f303b():
    f = D.merge(
        D.seg((90, -26), (90, 150), 'dashed', '#B55B45', 1.6),
        D.tag(99, 162, '대칭축', '#B55B45', 12, 700, 'start'),
        D.dot((20, 62), 'ㄱ'), D.dot((160, 62), 'ㄴ'),
        D.seg((20, 62), (160, 62), 'solid', '#3B6FA8', 1.5),
        D.tag(90, 46, '10 cm', D.SOFT, 12),
        D.tag(55, 92, '?', '#B55B45', 13.5, 800),
    )
    return D.svg(f, note='점 ㄱ과 점 ㄴ은 서로 대응점이에요.')
FIGS['s303b'] = _f303b()

# 3-03 2회차 — 선대칭도형 그리는 방법 (s303a 와 다른 모양·다른 축 방향)
def _f303c():
    half = [(0, 0), (58, 0), (96, 34), (60, 58), (92, 92), (0, 92)]
    f = D.merge(
        D.poly(_flipx(half, 0), 'green'),      # 축 왼쪽에 반쪽
        D.seg((0, -30), (0, 122), 'dashed', '#B55B45', 1.6),
        D.tag(9, 134, '대칭축', '#B55B45', 12, 700, 'start'),
    )
    return D.svg(f, note='대칭축의 왼쪽만 그려져 있어요.')
FIGS['s303c'] = _f303c()

# 3-03 계단4칸 — 모눈 + 대칭축 + 점 하나 (대응점을 어떻게 찾나)
def _f303d():
    g = D.Fig()
    n, m, u = 8, 6, 26
    for i in range(n + 1):
        g = D.merge(g, D.seg((i * u, 0), (i * u, m * u), 'solid', '#DCE6F5', 1))
    for j in range(m + 1):
        g = D.merge(g, D.seg((0, j * u), (n * u, j * u), 'solid', '#DCE6F5', 1))
    f = D.merge(g,
        D.seg((5 * u, -18), (5 * u, m * u + 18), 'dashed', '#B55B45', 1.6),
        D.tag(5 * u + 9, m * u + 34, '대칭축', '#B55B45', 12, 700, 'start'),
        D.dot((2 * u, 2 * u), 'ㄱ'),
    )
    return D.svg(f, note='모눈 한 칸은 1 cm 예요.')
FIGS['s303d'] = _f303d()

# 3-04 2회차 — 평행사변형 (대칭의 중심은 찍지 않는다 = 답)
def _f304a():
    A, B, C, Dd = (0, 92), (132, 92), (170, 0), (38, 0)
    return D.svg(D.poly([A, B, C, Dd], 'blue'))
FIGS['s304a'] = _f304a()

# 3-04 2회차 — 대응점 ㄱ·ㄷ 을 이은 선분이 12 cm, 대칭의 중심은 주어진 조건
def _f304b():
    P = [(0, 0), (74, -20), (120, 24), (46, 44)]       # 점대칭 사각형(평행사변형 꼴)
    c = (60, 12)
    f = D.merge(
        D.poly(P, 'green'),
        D.seg(P[0], P[2], 'solid', '#3C8B64', 1.5),
        D.dot(P[0], 'ㄱ', '#3C8B64', 'left'), D.dot(P[2], 'ㄷ', '#3C8B64', 'right'),
        D.dot(c, None, '#B55B45'),
        D.tag(60, 4, '대칭의 중심', '#B55B45', 11.5, 600),
        D.tag(60, 62, '12 cm', D.SOFT, 12),
        D.tag(24, 30, '?', '#B55B45', 13.5, 800),
    )
    return D.svg(f)
FIGS['s304b'] = _f304b()

# 3-04 2회차 — 점대칭도형 그리는 방법 (반쪽 + 대칭의 중심)
def _f304c():
    half = [(0, 0), (86, 0), (86, 30), (44, 30), (44, 62), (0, 62)]
    c = (86, 62)
    f = D.merge(
        D.poly(half, 'blue'),
        D.dot(c, None, '#B55B45'),
        D.tag(96, 66, '대칭의 중심', '#B55B45', 11.5, 600, 'start'),
    )
    return D.svg(f, note='대칭의 중심의 왼쪽 위만 그려져 있어요.')
FIGS['s304c'] = _f304c()

# 3-04 계단3칸 — 대칭의 중심을 어떻게 찾나 (중심을 찍지 않는다 = 답)
def _f304d():
    P = [(0, 24), (52, 0), (128, 16), (140, 84), (88, 108), (12, 92)]   # 점대칭 육각형
    f = D.poly(P, 'rose')
    for p in P:
        f = D.merge(f, D.dot(p, None, '#B55B45'))
    return D.svg(f, note='이 도형은 점대칭도형이에요.')
FIGS['s304d'] = _f304d()

# ══════════════════════════════════ 5. 직육면체 ══════════════════════════════════

# 5-01 2회차 — 가로 5 · 세로 3 · 높이 4 (모든 모서리 길이의 합)
FIGS['s501'] = D.svg(D.box(5, 3, 4, dims={'w': '5 cm', 'd': '3 cm', 'h': '4 cm'}))

# 5-02 1회차 — 평행한 면은 몇 쌍인가 (꼭짓점 이름으로 면을 부를 수 있게)
FIGS['s502a'] = D.svg(D.box(6, 3.4, 4, color='green', verts=True),
                      note='위 면은 면 ㄱㄴㄷㄹ, 아래 면은 면 ㅁㅂㅅㅇ 이에요.')

# 5-02 2회차 — 밑면을 하나 정했을 때 옆면 (밑면만 옅게 칠한다)
FIGS['s502b'] = D.svg(D.box(4.6, 3, 5, color='blue', verts=True, base=True),
                      note='노란색으로 칠한 면을 밑면으로 정했어요.')

# 5-03 2회차 — 어느 모서리를 점선으로 그려야 하나 (12개를 전부 실선으로 그려 둔다)
FIGS['s503'] = D.svg(D.box(5.4, 3, 3.6, color='amber', all_solid=True),
                     note='모서리 12개를 모두 실선으로 그려 놓았어요.')

# 5-04 2회차 — 전개도를 접었을 때 평행한 면·수직인 면 찾기
def _f504a():
    u = 46
    # 아래 qreason 이 십자 배치를 쓰므로 여기는 **어긋난 배치**로 (같은 그림 재탕 금지)
    cells = [(0, 0), (0, 1), (1, 1), (2, 1), (3, 1), (2, 2)]
    lab = {(0, 0): '㉠', (0, 1): '㉡', (1, 1): '㉢', (2, 1): '㉣', (3, 1): '㉤', (2, 2): '㉥'}
    return D.svg(D.net(cells, [u] * 4, [u] * 3, lab, 'blue'))
FIGS['s504a'] = _f504a()

# 5-04 2회차 — A B C D 가로, B 위에 E, B 아래에 F (질문 문장 그대로의 배치)
def _f504b():
    u = 46
    cells = [(0, 1), (1, 1), (2, 1), (3, 1), (1, 0), (1, 2)]
    lab = {(0, 1): 'A', (1, 1): 'B', (2, 1): 'C', (3, 1): 'D', (1, 0): 'E', (1, 2): 'F'}
    return D.svg(D.net(cells, [u] * 4, [u] * 3, lab, 'green'))
FIGS['s504b'] = _f504b()

# 5-04 2회차 — 전개도를 그리는 방법 (재료 = 직육면체 겨냥도)
FIGS['s504c'] = D.svg(D.box(4, 2, 6, color='rose',
                            dims={'w': '4 cm', 'd': '2 cm', 'h': '6 cm'}))

# 5-04 3회차 — 전개도를 보면 먼저 생각할 두 가지 (앞과 다른 배치·직육면체 전개도)
def _f504d():
    a, b, c = 56, 30, 40                     # 가로 · 세로(깊이) · 높이
    cells = [(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)]
    return D.svg(D.net(cells, [b, a, b, a], [b, c, b], None, 'amber'))
FIGS['s504d'] = _f504d()

# 5-04 계단3칸 — 모서리를 몇 군데 잘라야 펼쳐지나
FIGS['s504e'] = D.svg(D.box(3.6, 3.6, 3.6, color='blue', verts=True),
                      note='정육면체예요.')


# ── 어느 질문에 붙이나 (대단원, 소단원번호, 질문꼬리, 그림이름) ────────────────
MAP = [
 ('3', '01', 't0H2',               's301'),
 ('3', '02', 't0H2',               's302a'),
 ('3', '02', 'qamu9e52x3wjd1m',    's302b'),
 ('3', '02', 'L3',                 's302c'),
 ('3', '03', 'qreason',            's303a'),
 ('3', '03', 'qamu9e52i0xwv9z',    's303b'),
 ('3', '03', 'qamuc1wbr9f6di',     's303c'),
 ('3', '03', 'L4',                 's303d'),
 ('3', '04', 'qreason',            's304a'),
 ('3', '04', 'qamu9e52c33maxt',    's304b'),
 ('3', '04', 'qamuc2aejvneff',     's304c'),
 ('3', '04', 'L3',                 's304d'),

 ('5', '01', 'qamu9e52dng4rsq',    's501'),
 ('5', '02', 't0H1',               's502a'),
 ('5', '02', 't0H2',               's502b'),
 ('5', '03', 'qexample',           's503'),
 ('5', '04', 't0H2',               's504a'),
 ('5', '04', 'qreason',            's504b'),
 ('5', '04', 'qamu22c01net',       's504c'),
 ('5', '04', 'qamu22c02net',       's504d'),
 ('5', '04', 'L3',                 's504e'),
]

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for k, v in FIGS.items():
        print('%-8s %5d자' % (k, len(v)))
    print('그림 %d장 · 붙일 곳 %d개' % (len(FIGS), len(MAP)))
