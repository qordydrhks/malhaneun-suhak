# 고2 대수 질문 그림 (ddFig 설계도) — 마스터 지시 2026-09-22 "웬만하면 많이 넣는 방향"
# 규칙: 질문에 주어진 상황만 그린다. 구하려는 답(교점 좌표·최댓값·결과 식)은 그리지 않는다.
# F[개념Q] = [(질문 문장 일부, 설계도), ...] — 계단 칸도 같은 방식(문장 일부로 찾음)
from math import cos, sin, radians, sqrt, atan2, degrees
B, O, G, GR = '#185FA5', '#D85A30', '#3FB98C', '#9A9890'
PI = 3.141592653589793

def ax(x0, x1, y0, y1, **k):
    a = {'xMin': x0, 'xMax': x1, 'yMin': y0, 'yMax': y1}; a.update(k); return {'axes': a}
def sc(base, **k):
    d = dict(base); d.update(k); return d
def cv(fn, label=None, at=None, color=B, **k):
    c = {'fn': fn, 'color': color}
    if label: c['label'] = label
    if at is not None: c['labelAt'] = at
    if 'from_' in k: k['from'] = k.pop('from_')
    if 'to_' in k: k['to'] = k.pop('to_')
    c.update(k); return c
def dot(x, y, text='', dx=6, dy=-6):
    return {'at': [x, y], 'text': text, 'dot': True, 'dx': dx, 'dy': dy}
def txt(x, y, text, dx=0, dy=0):
    return {'at': [x, y], 'text': text, 'dot': False, 'dx': dx, 'dy': dy}
def piax(x0, x1, y0, y1, marks, ystep=1):
    """삼각함수용: 눈금 숫자 끄고 π 눈금을 글자로"""
    s = ax(x0, x1, y0, y1, ticks=False, grid=False)
    s['labels'] = [txt(v, 0, t, 0, 14) for v, t in marks]
    import math as _m
    s['labels'] += [txt(0, y, ('−' + str(-y)) if y < 0 else str(y), -12, 4) for y in range(_m.ceil(y0), _m.floor(y1) + 1) if y != 0 and y % ystep == 0]
    return s
PM = [(-2 * PI, '−2π'), (-PI, '−π'), (PI, 'π'), (2 * PI, '2π')]
PM2 = [(PI / 2, 'π/2'), (PI, 'π'), (3 * PI / 2, '3π/2'), (2 * PI, '2π')]

# ── 화면 좌표 삼각형 도우미 (y 아래로) ──
def tri(A, Bp, C, sides=None, angs=None, extra=None, names=('A', 'B', 'C'), cap=None):
    P = dict(zip(names, (A, Bp, C)))
    s = {'points': P, 'shapes': [{'points': list(names)}],
         'labels': [{'point': n, 'text': n, 'dx': dx, 'dy': dy} for n, dx, dy in
                    ((names[0], -4, -12), (names[1], -16, 14), (names[2], 8, 14))]}
    for (p, q), t in (sides or {}).items():
        (x1, y1), (x2, y2) = P[p], P[q]; mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        cx = sum(v[0] for v in P.values()) / 3; cy = sum(v[1] for v in P.values()) / 3
        nx, ny = mx - cx, my - cy; L = sqrt(nx * nx + ny * ny) or 1
        s['labels'].append({'at': [mx + nx / L * 16, my + ny / L * 16], 'text': t, 'dot': False})
    if angs:
        s['angles'] = [{'at': a, 'to': [b, c], 'label': t} for a, (b, c), t in angs]
    if extra:
        for k, v in extra.items():
            if isinstance(v, list): s.setdefault(k, []).extend(v)
            elif isinstance(v, dict): s.setdefault(k, {}).update(v)
            else: s[k] = v
    if cap: s['caption'] = cap
    return s
def circ3(A, Bp, C):
    (ax_, ay), (bx, by), (cx, cy) = A, Bp, C
    d = 2 * (ax_ * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax_**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
    uy = ((ax_**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax_ - cx) + (cx**2 + cy**2) * (bx - ax_)) / d
    return (ux, uy), sqrt((ax_ - ux)**2 + (ay - uy)**2)
def incircle(A, Bp, C):
    a = sqrt((Bp[0] - C[0])**2 + (Bp[1] - C[1])**2); b = sqrt((A[0] - C[0])**2 + (A[1] - C[1])**2); c = sqrt((A[0] - Bp[0])**2 + (A[1] - Bp[1])**2)
    p = a + b + c; I = ((a * A[0] + b * Bp[0] + c * C[0]) / p, (a * A[1] + b * Bp[1] + c * C[1]) / p)
    s = p / 2; area = sqrt(s * (s - a) * (s - b) * (s - c)); return I, area / s
def tri_sides(a, b, c, base=260, ox=90, oy=320):
    """세 변 a(=BC), b(=CA), c(=AB) 로 실제 모양 삼각형. B 왼쪽 아래, C 오른쪽 아래"""
    k = base / a; Bp = (ox, oy); C = (ox + a * k, oy)
    x = (c * c + a * a - b * b) / (2 * a); y = sqrt(max(c * c - x * x, 0))
    return (ox + x * k, oy - y * k), Bp, C
def tri_SAS(b, c, Adeg, size=250):
    """A 에서 AB=c(오른쪽 아래로), AC=b, 끼인각 A"""
    k = size / max(b, c)
    A = (120, 90); B_ = (A[0] + c * k * cos(radians(90 - Adeg / 2 + 0)), 0)
    th1 = radians(250); th2 = th1 + radians(Adeg)
    Bp = (A[0] + c * k * cos(th1) * -1, A[1] + c * k * sin(th1) * -1)
    C = (A[0] + b * k * cos(th2) * -1, A[1] + b * k * sin(th2) * -1)
    return A, Bp, C
def unit(deg, name='P', label='P(x, y)', r=1, rlab='r', theta='θ', extra_lbl=None):
    s = ax(-1.6, 1.6, -1.4, 1.4, ticks=False, grid=False)
    s['circles'] = [{'center': [0, 0], 'r': r, 'color': GR}]
    s['derive'] = [{'name': name, 'type': 'onCircle', 'center': [0, 0], 'r': r, 'deg': deg},
                   {'name': 'X1', 'type': 'onCircle', 'center': [0, 0], 'r': 0.35, 'deg': 0},
                   {'name': 'T1', 'type': 'onCircle', 'center': [0, 0], 'r': 0.35, 'deg': deg}]
    s['points'] = {'O': [0, 0]}
    s['shapes'] = [{'points': ['O', name], 'close': False, 'stroke': B, 'strokeWidth': 2}]
    s['arcs'] = [{'center': [0, 0], 'from': 'X1', 'to': 'T1', 'r': 0.3, 'color': O, 'label': theta}] if theta else []
    s['labels'] = [{'point': name, 'text': label, 'dx': 8 if cos(radians(deg)) >= 0 else -60, 'dy': -8}]
    if rlab: s['labels'].append({'at': [0.5 * cos(radians(deg)), 0.5 * sin(radians(deg))], 'text': rlab, 'dot': False, 'dx': -14, 'dy': -4})
    if extra_lbl: s['labels'] += extra_lbl
    return s

F = {}
# ─────────── Ⅰ. 지수 ───────────
F[2] = [('무엇을 보고 정해', sc(ax(-3, 3, -5, 9, step=1, yStep=2), curves=[cv('x^3', 'y=x³', -1.6, O), cv('x^4', 'y=x⁴', 1.55)],
                              lines=[{'y': 4, 'style': 'dashed', 'color': GR, 'label': 'y=a (a>0)'}, {'y': -3, 'style': 'dashed', 'color': GR, 'label': 'y=a (a<0)'}],
                              caption='n이 홀수(y=x³)일 때와 짝수(y=x⁴)일 때 직선 y=a와 만나는 점을 세어 봐')),
        ('네제곱근 중 실수인 것이 없는', sc(ax(-3, 3, -20, 20, step=1, yStep=5), curves=[cv('x^4', 'y=x⁴', 1.9)],
                                    lines=[{'y': -16, 'style': 'dashed', 'color': O, 'label': 'y=−16'}]))]
# ─────────── Ⅰ. 지수함수 ───────────
E2 = ax(-3, 3, -1, 7)
F[24] = [('지수함수가 뭐야', sc(E2, curves=[cv('2^x', 'y=2^x', 2.4)])),
         ('y=x³과 y=3^x', sc(ax(-2, 2.5, -3, 9), curves=[cv('x^3', 'y=x³', -1.3, O), cv('3^x', 'y=3^x', 1.85)]))]
F[25] = [('밑이 1이면 안 되는', sc(ax(-3, 3, -1, 3), lines=[{'y': 1, 'color': O, 'label': 'y=1^x'}],
                            caption='밑이 1이면 x가 무엇이든 1^x=1이야'))]
F[26] = [('y=2^x의 그래프를 그리는 방법', sc(ax(-3, 3, -1, 5), labels=[dot(-2, 0.25, '(−2, 1/4)', -10, -10), dot(-1, 0.5, '(−1, 1/2)', -10, -10), dot(0, 1, '(0, 1)', 6, -8), dot(1, 2, '(1, 2)', 6, 0), dot(2, 4, '(2, 4)', 6, 0)],
                                  caption='이 점들을 매끄럽게 이어 봐'))]
F[27] = [('그래프는 어떤 성질이 있어', sc(ax(-3, 3, -1, 6), curves=[cv('2^x', 'y=2^x', 2.3), cv('(1/2)^x', 'y=(1/2)^x', -2.5, O)])),
         ('x축과 만나지 않는 이유', sc(ax(-5, 2, -1, 4), curves=[cv('2^x', 'y=2^x', 1.6)])),
         ('일대일함수인 이유', sc(ax(-2, 3, -1, 7), curves=[cv('2^x', 'y=2^x', 2.5)], lines=[{'x': 1, 'style': 'dashed', 'color': GR}, {'x': 2, 'style': 'dashed', 'color': GR}],
                                labels=[txt(1, 0, 'x₁', 0, 14), txt(2, 0, 'x₂', 0, 14)])),
         ('두 지수함수의 그래프가 만나는 점', sc(ax(-1, 4, -1, 9), curves=[cv('2^x', 'y=2^x', 3.0), cv('4^(x-1)', 'y=4^(x−1)', 2.9, O)]))]
F[28] = [('y=2^x와 y=3^x 중 어느 그래프가 위', sc(ax(-3, 2.5, -1, 8), curves=[cv('2^x', 'y=2^x', 2.3), cv('3^x', 'y=3^x', 1.8, O)]))]
F[29] = [('y=2^x와 y=(1/2)^x의 그래프는 어떤 관계', sc(ax(-3, 3, -1, 6), curves=[cv('2^x', 'y=2^x', 2.3), cv('(1/2)^x', 'y=(1/2)^x', -2.5, O)]))]
F[30] = [('x축 방향으로 1만큼, y축 방향으로 3만큼', sc(ax(-3, 4, -1, 8), curves=[cv('2^x', 'y=2^x', 2.6)], caption='y=2^x를 옮겨 봐')),
         ('x축에 대하여 대칭이동한 식과 원점', sc(ax(-3, 3, -6, 6), curves=[cv('3^x', 'y=3^x', 1.4)])),
         ('점근선은 어떻게 구해', sc(ax(-2, 5, -1, 9), curves=[cv('2^(x-1)+3', 'y=2^(x−1)+3', 3.5)])),
         ('미정계수를 구할 때', sc(ax(-3, 4, -1, 8), curves=[cv('2^(x-1)+3', None)], lines=[{'y': 3, 'style': 'dashed', 'color': GR}], labels=[dot(1, 4, '(1, 4)', 6, -6)],
                              caption='점근선과 지나는 점이 주어진 그래프'))]
F[31] = [('정의역이 −1≤x≤2일 때 y=3^x', sc(ax(-2, 3, -1, 10), curves=[cv('3^x', 'y=3^x', 1.6)],
                                     lines=[{'x': -1, 'style': 'dashed', 'color': GR}, {'x': 2, 'style': 'dashed', 'color': GR}])),
         ('밑을 먼저 보는 이유', sc(ax(-1, 3, -1, 5), curves=[cv('2^x', 'y=2^x', 2.2), cv('(1/2)^x', 'y=(1/2)^x', 2.4, O)],
                               lines=[{'x': 0, 'style': 'dashed', 'color': GR}, {'x': 2, 'style': 'dashed', 'color': GR}]))]
F[32] = [('y=2^(x²−2x)의 최솟값', sc(ax(-1, 3, -2, 4), curves=[cv('x^2-2x', '지수 x²−2x', 2.7, O)], caption='지수 부분 x²−2x의 그래프'))]
F[33] = [('2^x=5처럼', sc(ax(-1, 4, -1, 8), curves=[cv('2^x', 'y=2^x', 2.8)], lines=[{'y': 5, 'style': 'dashed', 'color': O, 'label': 'y=5'}]))]
F[34] = [('밑이 1보다 작으면 왜 부등호', sc(ax(-3, 3, -1, 6), curves=[cv('(1/2)^x', 'y=(1/2)^x', 1.8)], lines=[{'x': -2, 'style': 'dashed', 'color': GR}, {'x': 1, 'style': 'dashed', 'color': GR}],
                                   labels=[txt(-2, 0, 'x₁', 0, 14), txt(1, 0, 'x₂', 0, 14)]))]
# ─────────── Ⅰ. 로그함수 ───────────
LG = 'ln(x)/ln(2)'
F[35] = [('로그함수가 뭐야', sc(ax(-1, 6, -3, 3), curves=[cv(LG, 'y=log₂x', 4.8, from_=0.05)]))]
INV = sc(ax(-3, 5, -3, 5), curves=[cv('2^x', 'y=2^x', 2.1), cv(LG, 'y=log₂x', 4.3, O, from_=0.05), cv('x', 'y=x', 4.2, GR, style='dashed')])
F[36] = [('어떤 관계야', INV),
         ('어떤 직선에 대하여 대칭', sc(INV, labels=[dot(1, 2, '(1, 2)', -44, -6), dot(2, 1, '(2, 1)', 6, 12)])),
         ('역함수를 구하는 과정', sc(ax(-2, 5, -1, 9), curves=[cv('2^(x-1)+3', 'y=2^(x−1)+3', 3.4)])),
         ('두 점 사이 거리나 넓이', sc(INV, labels=[dot(1, 2, 'P', -14, -6), dot(2, 1, 'Q', 6, 12)]))]
F[37] = [('y=log_2 x의 그래프를 그리는 방법', sc(ax(-1, 5, -3, 3), labels=[dot(0.25, -2, '(1/4, −2)', 6, 4), dot(0.5, -1, '(1/2, −1)', 6, 4), dot(1, 0, '(1, 0)', 6, -8), dot(2, 1, '(2, 1)', 6, -6), dot(4, 2, '(4, 2)', 6, -6)],
                                        caption='이 점들을 매끄럽게 이어 봐')),
         ('로그함수 그래프와 직선의 교점', sc(ax(-1, 5, -2, 4), curves=[cv(LG, 'y=log₂x', 4.4, from_=0.05), cv('-x+3', 'y=−x+3', 0.6, O)]))]
F[38] = [('그래프는 어떤 성질이 있어', sc(ax(-1, 5, -3, 3), curves=[cv(LG, 'y=log₂x', 4.2, from_=0.05), cv('-ln(x)/ln(2)', 'y=log½x', 4.2, O, from_=0.05)])),
         ('정의역과 치역이 지수함수와 서로 바뀌는', INV),
         ('두 로그함수 그래프의 교점이 몇 개', sc(ax(-1, 6, -3, 3), curves=[cv(LG, 'y=log₂x', 5, from_=0.05), cv('ln(x)/ln(4)', 'y=log₄x', 5.5, O, from_=0.05)])),
         ('도형의 넓이를 묻는', sc(ax(-1, 5, -2, 3), curves=[cv(LG, 'y=log₂x', 4.5, from_=0.05)], points={'A': [2, 1], 'B': [4, 2], 'O': [0, 0]},
                                 shapes=[{'points': ['O', 'A', 'B'], 'fill': O, 'style': 'solid'}], labels=[{'point': 'A', 'text': 'A', 'dx': -12, 'dy': -6}, {'point': 'B', 'text': 'B', 'dx': 6, 'dy': -6}]))]
F[39] = [('y=log_2 x와 y=log_3 x 중 어느 그래프가 위', sc(ax(-1, 9, -3, 4), curves=[cv(LG, 'y=log₂x', 8, from_=0.05), cv('ln(x)/ln(3)', 'y=log₃x', 8.6, O, from_=0.05)]))]
F[40] = [('y=log_2 x와 y=log_(1/2) x', sc(ax(-1, 5, -3, 3), curves=[cv(LG, 'y=log₂x', 4.2, from_=0.05), cv('-ln(x)/ln(2)', 'y=log½x', 4.2, O, from_=0.05)]))]
L3 = 'ln(x)/ln(3)'
F[41] = [('x축 방향으로 2만큼, y축 방향으로 1만큼', sc(ax(-1, 8, -3, 3), curves=[cv(L3, 'y=log₃x', 7, from_=0.05)], caption='y=log₃x를 옮겨 봐')),
         ('정의역과 점근선은 어떻게 구해', sc(ax(-1, 9, -2, 4), curves=[cv('ln(x-2)/ln(3)+1', 'y=log₃(x−2)+1', 7.5, from_=2.03)])),
         ('y축에 대하여 대칭이동한 식과 직선 y=x', sc(ax(-5, 5, -3, 4), curves=[cv(LG, 'y=log₂x', 4.2, from_=0.05)]))]
F[42] = [('정의역이 2≤x≤8일 때 y=log_2 x', sc(ax(-1, 9, -2, 4), curves=[cv(LG, 'y=log₂x', 7.6, from_=0.05)], lines=[{'x': 2, 'style': 'dashed', 'color': GR}, {'x': 8, 'style': 'dashed', 'color': GR}])),
         ('y=log_(1/3) x는 어디에서 최댓값', sc(ax(-2, 29, -4, 3, step=3), curves=[cv('-ln(x)/ln(3)', 'y=log⅓x', 24, from_=0.02)], lines=[{'x': 1 / 9, 'style': 'dashed', 'color': GR}, {'x': 27, 'style': 'dashed', 'color': GR}],
                                              labels=[txt(1 / 9, 0, '1/9', 10, 14), txt(27, 0, '27', 0, 14)]))]
F[43] = [('y=log_(1/3)(x²−2x+10)의 최댓값', sc(ax(-2, 4, -1, 16, yStep=3), curves=[cv('x^2-2x+10', '진수 x²−2x+10', 3.2, O)], caption='진수 부분의 그래프'))]
F[44] = [('log_2 (x+1)=3을 푸는', sc(ax(-2, 9, -3, 4), curves=[cv('ln(x+1)/ln(2)', 'y=log₂(x+1)', 5.5, from_=-0.95)], lines=[{'y': 3, 'style': 'dashed', 'color': O, 'label': 'y=3'}]))]
F[45] = [('log_2 x<3을 푸는', sc(ax(-1, 10, -3, 4), curves=[cv(LG, 'y=log₂x', 4, from_=0.05)], lines=[{'y': 3, 'style': 'dashed', 'color': O, 'label': 'y=3'}])),
         ('log_(1/3) x>−3을 풀 때', sc(ax(-2, 30, -4, 3, step=3), curves=[cv('-ln(x)/ln(3)', 'y=log⅓x', 12, from_=0.02)], lines=[{'y': -3, 'style': 'dashed', 'color': O, 'label': 'y=−3'}]))]

# ─────────── Ⅱ. 삼각함수 (일반각·호도법·정의) ───────────
def ray(deg, lbl='P', theta='', R=150, arcr=40, cap=None, arrow_neg=False):
    """화면 좌표: O(200,210) 에서 시초선 OX(오른쪽) · 동경 OP"""
    Ox, Oy = 200, 210
    P = (Ox + R * cos(radians(deg)), Oy - R * sin(radians(deg)))
    s = {'points': {'O': [Ox, Oy], 'X': [Ox + R + 30, Oy], 'P': list(P)},
         'derive': [{'name': 'a1', 'type': 'onCircle', 'center': 'O', 'r': arcr, 'deg': 0},
                    {'name': 'a2', 'type': 'onCircle', 'center': 'O', 'r': arcr, 'deg': deg % 360}],
         'shapes': [{'points': ['O', 'X'], 'close': False}, {'points': ['O', 'P'], 'close': False, 'stroke': B, 'strokeWidth': 2.5}],
         'arcs': [{'center': 'O', 'from': 'a1', 'to': 'a2', 'r': arcr, 'color': O, 'label': theta}] if theta else [],
         'labels': [{'point': 'O', 'text': 'O', 'dx': -14, 'dy': 14}, {'point': 'X', 'text': 'X', 'dx': 6, 'dy': 4}, {'point': 'P', 'text': lbl, 'dx': 6, 'dy': -6}]}
    if cap: s['caption'] = cap
    return s
F[46] = [('시초선과 동경이 뭐야', ray(50, 'P', '∠XOP')),
         ('+와 −를 붙이는 기준', sc(ray(50, 'P', ''), caption='동경 OP가 시초선 OX에서 어느 방향으로 돌았는지 봐'))]
F[47] = [('일반각이 뭐야', ray(40, 'P', '40°')),
         ('40°, 400°, −320°가 모두 같은 동경', ray(40, 'P', '40°'))]
QUAD = sc(ax(-3, 3, -3, 3, ticks=False, grid=False), labels=[txt(1.5, 1.5, '제1사분면'), txt(-1.5, 1.5, '제2사분면'), txt(-1.5, -1.5, '제3사분면'), txt(1.5, -1.5, '제4사분면')])
F[48] = [('제2사분면의 각이라는 건', sc(QUAD, points={'O': [0, 0], 'P': [-1.8, 1.2]}, shapes=[{'points': ['O', 'P'], 'close': False, 'stroke': B, 'strokeWidth': 2.5}],
                                      labels=QUAD['labels'] + [{'point': 'P', 'text': 'P', 'dx': -12, 'dy': -6}])),
         ('좌표축 위에 있는 90°, 180°', sc(QUAD, points={'O': [0, 0], 'P': [0, 2.4]}, shapes=[{'points': ['O', 'P'], 'close': False, 'stroke': B, 'strokeWidth': 2.5}],
                                       labels=QUAD['labels'] + [{'point': 'P', 'text': 'P', 'dx': 8, 'dy': 0}]))]
RAD = {'points': {'O': [160, 260], 'A': [360, 260]}, 'derive': [{'name': 'Bq', 'type': 'onCircle', 'center': 'O', 'r': 200, 'deg': 57.3},
       {'name': 'a1', 'type': 'onCircle', 'center': 'O', 'r': 40, 'deg': 0}, {'name': 'a2', 'type': 'onCircle', 'center': 'O', 'r': 40, 'deg': 57.3}],
       'shapes': [{'points': ['O', 'A'], 'close': False}, {'points': ['O', 'Bq'], 'close': False}],
       'arcs': [{'center': 'O', 'from': 'A', 'to': 'Bq', 'color': B, 'width': 3}, {'center': 'O', 'from': 'a1', 'to': 'a2', 'r': 40, 'color': O, 'label': 'α°'}],
       'labels': [{'point': 'O', 'text': 'O', 'dx': -14, 'dy': 12}, {'point': 'A', 'text': 'A', 'dx': 6, 'dy': 12}, {'point': 'Bq', 'text': 'B', 'dx': 6, 'dy': -4},
                  {'at': [260, 276], 'text': 'r', 'dot': False}, {'at': [205, 170], 'text': 'r', 'dot': False}, {'at': [338, 160], 'text': '호의 길이 r', 'dot': False}]}
F[49] = [('1라디안이 뭐야', RAD), ('반지름의 길이에 관계없이', RAD)]
def sector(deg, rl='r', al='θ', ll='l', R=210, cap=None):
    s = {'points': {'O': [120, 300]}, 'derive': [{'name': 'A', 'type': 'onCircle', 'center': 'O', 'r': R, 'deg': 10}, {'name': 'Bq', 'type': 'onCircle', 'center': 'O', 'r': R, 'deg': 10 + deg},
         {'name': 'a1', 'type': 'onCircle', 'center': 'O', 'r': 36, 'deg': 10}, {'name': 'a2', 'type': 'onCircle', 'center': 'O', 'r': 36, 'deg': 10 + deg},
         {'name': 'M', 'type': 'onCircle', 'center': 'O', 'r': R + 22, 'deg': 10 + deg / 2}, {'name': 'MA', 'type': 'onCircle', 'center': 'O', 'r': R / 2, 'deg': 10}],
         'shapes': [{'points': ['O', 'A'], 'close': False}, {'points': ['O', 'Bq'], 'close': False}],
         'arcs': [{'center': 'O', 'from': 'A', 'to': 'Bq', 'color': B, 'width': 3}, {'center': 'O', 'from': 'a1', 'to': 'a2', 'r': 36, 'color': O, 'label': al}],
         'labels': [{'point': 'O', 'text': 'O', 'dx': -14, 'dy': 12}, {'point': 'MA', 'text': rl, 'dot': False, 'dx': 0, 'dy': 16}, {'point': 'M', 'text': ll, 'dot': False}]}
    if cap: s['caption'] = cap
    return s
F[52] = [('부채꼴의 호의 길이와 넓이를 말해', sector(60)), ('l=rθ로 간단해지는', sector(60)),
         ('반지름이 4, 호의 길이가 6인', sector(86, '4', '', '6')),
         ('둘레의 길이가 일정할 때 넓이의 최댓값', sector(70, 'r', 'θ', 'l', cap='둘레 = 2r + l'))]
F[53] = [('삼각함수 sinθ, cosθ, tanθ를 어떻게 정해', sc(unit(55), labels=unit(55)['labels'] + [txt(0.57, 0, 'x', 0, 14), txt(0.57, 0.82, '', 0, 0)],
                                                  lines=[{'x': 0.5736, 'style': 'dashed', 'color': GR}])),
         ('점 P(4, −3)을 지나는 동경', sc(ax(-6, 6, -6, 6), circles=[{'center': [0, 0], 'r': 5, 'color': GR}], points={'O': [0, 0], 'P': [4, -3]},
                                        shapes=[{'points': ['O', 'P'], 'close': False, 'stroke': B, 'strokeWidth': 2.5}], labels=[{'point': 'P', 'text': 'P(4, −3)', 'dx': 6, 'dy': 12}])),
         ('tanθ는 언제 정의되지 않아', unit(90, label='P(0, r)', theta='θ'))]
F[54] = [('제2사분면의 각에서 sinθ, cosθ, tanθ의 부호', unit(135)),
         ('사분면으로 정해지는 이유', sc(QUAD, caption='각 사분면에서 x, y의 부호를 떠올려 봐'))]
F[55] = [('단위원으로 말해 봐', sc(unit(40, label='P(cosθ, sinθ)', rlab='1'), lines=[{'x': 0.766, 'style': 'dashed', 'color': GR}])),
         ('제3사분면의 각이고 sinθ=−3/5', unit(217, label='P', rlab='1'))]
# ─────────── Ⅱ. 삼각함수의 그래프 ───────────
ZZ = sc(ax(-7, 7, -1, 3, ticks=True, step=2, grid=False), points={'p%d' % i: [x, (2 if i % 2 else 0)] for i, x in enumerate(range(-6, 8, 2))},
        shapes=[{'points': ['p%d' % i for i in range(7)], 'close': False, 'stroke': B, 'strokeWidth': 2.5}], labels=[txt(6.5, 2, 'y=f(x)', 0, -8)])
F[56] = [('주기함수와 주기가 뭐야', ZZ)]
F[57] = [('주기가 4인 함수 f(x)', ZZ)]
SINX = sc(piax(-2 * PI - 0.5, 2 * PI + 0.5, -1.6, 1.6, PM), curves=[cv('sin(x)', 'y=sin x', 5.4)], labels=piax(-7, 7, -1.6, 1.6, PM)['labels'] + [txt(0, 1, '1', -10, 4), txt(0, -1, '−1', -14, 4)])
F[58] = [('정의역, 치역, 주기를 말해', SINX), ('원점에 대하여 대칭인 이유', SINX),
         ('sin 1, sin 2, sin 3처럼', sc(ax(-0.3, 3.6, -0.4, 1.3, grid=False, step=1), curves=[cv('sin(x)', 'y=sin x', 2.2, from_=0, to_=3.5)],
                                     lines=[{'x': 1, 'style': 'dashed', 'color': GR}, {'x': 2, 'style': 'dashed', 'color': GR}, {'x': 3, 'style': 'dashed', 'color': GR}],
                                     labels=[txt(PI / 2, 0, 'π/2', 0, 14), txt(PI, 0, 'π', 0, 14)])),
         ('y=|sin x|의 그래프는 어떻게 그려', SINX)]
def trig2(f1, l1, f2, l2, x0=-0.4, x1=2 * PI + 0.4, y0=-2.6, y1=2.6, marks=PM2, at1=5.6, at2=4.4):
    s = piax(x0, x1, y0, y1, marks)
    s['curves'] = [cv(f1, l1, at1, GR, style='dashed')] + ([cv(f2, l2, at2)] if f2 else [])
    return s
F[59] = [('y=2sin x의 최댓값', trig2('sin(x)', 'y=sin x', '2sin(x)', 'y=2sin x')),
         ('y=a sin x에서 a가 바꾸는 것', trig2('sin(x)', 'y=sin x', '2sin(x)', 'y=2sin x'))]
F[60] = [('y=sin 2x의 주기를 구하는 방법', trig2('sin(x)', 'y=sin x', 'sin(2x)', 'y=sin 2x', y0=-1.6, y1=1.6)),
         ('b가 커지면 주기가 짧아지는 이유', trig2('sin(x)', 'y=sin x', 'sin(2x)', 'y=sin 2x', y0=-1.6, y1=1.6)),
         ('y=3sin(x/3)의 주기와 최댓값', trig2('sin(x)', 'y=sin x', None, None, y0=-1.6, y1=1.6))]
F[61] = [('y=cos x의 그래프는 y=sin x의 그래프와', sc(piax(-2 * PI - 0.5, 2 * PI + 0.5, -1.6, 1.6, PM), curves=[cv('sin(x)', 'y=sin x', 5.2, GR, style='dashed'), cv('cos(x)', 'y=cos x', -5.6)])),
         ('y축에 대하여 대칭인 이유', sc(piax(-2 * PI - 0.5, 2 * PI + 0.5, -1.6, 1.6, PM), curves=[cv('cos(x)', 'y=cos x', 5.6)]))]
F[62] = [('y=−2cos x의 최댓값', trig2('cos(x)', 'y=cos x', None, None, y0=-2.6, y1=2.6))]
F[63] = [('y=cos 4x의 주기', trig2('cos(x)', 'y=cos x', 'cos(4x)', 'y=cos 4x', y0=-1.6, y1=1.6))]
def tanpieces(fn, k=1, lbl='y=tan x', color=B, n=(-1, 0, 1)):
    h = PI / 2 / k; out = []
    for j in n:
        c0 = j * PI / k
        out.append(cv(fn, lbl if j == n[-1] else None, c0 + h * 0.75, color, from_=c0 - h + 0.06, to_=c0 + h - 0.06))
    return out
TANX = sc(piax(-3 * PI / 2 - 0.3, 3 * PI / 2 + 0.3, -4, 4, [(-PI, '−π'), (-PI / 2, '−π/2'), (PI / 2, 'π/2'), (PI, 'π')], ystep=2), curves=tanpieces('tan(x)'))
F[64] = [('y=tan x의 그래프는 어떤 성질', TANX), ('주기가 2π가 아니라 π인 이유', TANX),
         ('점근선이 생기는 이유', sc(TANX, lines=[{'x': -PI / 2, 'style': 'dashed', 'color': GR}, {'x': PI / 2, 'style': 'dashed', 'color': GR}]))]
F[65] = [('y=2tan x는 y=tan x와', sc(TANX, curves=tanpieces('tan(x)', color=GR, lbl='y=tan x') + tanpieces('2tan(x)', lbl='y=2tan x', n=(0,))))]
F[66] = [('y=tan 2x의 주기와 점근선', TANX)]
F[67] = [('어떤 그래프를 평행이동한 거야', sc(piax(-0.5, 6 * PI + 0.5, -3.5, 2.6, [(3 * PI / 2, '3π/2'), (3 * PI, '3π'), (9 * PI / 2, '9π/2'), (6 * PI, '6π')]), curves=[cv('2sin(x/3)', 'y=2sin(x/3)', 16)])),
         ('주기, 최댓값, 최솟값 중 무엇이 바뀌어', trig2('sin(x)', 'y=sin x', 'sin(x-pi/3)+1', 'y=sin(x−π/3)+1', y0=-1.6, y1=2.6)),
         ('a, b, c, d를 구하는 문제', sc(piax(-3 * PI - 0.5, 4 * PI, -3.6, 1.6, [(-3 * PI / 2, '−3π/2'), (3 * PI / 2, '3π/2'), (9 * PI / 2 - 3 * PI, '3π')]),
                                       curves=[cv('2sin(x/3+pi/2)-1', None)], caption='이 그래프가 y=a sin(bx+c)+d의 그래프야'))]
F[68] = [('sin(2nπ+θ)는 왜 sinθ와 같아', SINX)]
F[69] = [('cos(−θ)=cosθ인 이유', sc(unit(35, label='P', rlab='1'), derive=unit(35)['derive'] + [{'name': 'Q', 'type': 'onCircle', 'center': [0, 0], 'r': 1, 'deg': -35}],
                                  shapes=unit(35)['shapes'] + [{'points': ['O', 'Q'], 'close': False, 'stroke': O, 'strokeWidth': 2.5}],
                                  labels=unit(35, label='P', rlab='1')['labels'] + [{'point': 'Q', 'text': 'Q', 'dx': 8, 'dy': 12}, txt(0.5, -0.2, '−θ', 8, 4)]))]
F[70] = [('sin(π+x)=−sin x가 되는 이유', trig2('sin(x)', 'y=sin x', 'sin(x+pi)', 'y=sin(x+π)', x0=-PI - 0.4, y0=-1.6, y1=1.6, marks=[(-PI, '−π')] + PM2))]
F[71] = [('삼각형 ABC에서 sin(A+B)', tri((220, 70), (80, 320), (380, 320)))]
F[72] = [('sin x=√3/2를 푸는', sc(trig2('sin(x)', 'y=sin x', None, None, y0=-1.6, y1=1.6), lines=[{'y': 0.866, 'style': 'dashed', 'color': O, 'label': 'y=√3/2'}])),
         ('2sin²x−sin x−1=0', sc(trig2('sin(x)', 'y=sin x', None, None, y0=-1.6, y1=1.6), lines=[{'y': 1, 'style': 'dashed', 'color': O, 'label': 'y=1'}, {'y': -0.5, 'style': 'dashed', 'color': O, 'label': 'y=−1/2'}]))]
F[73] = [('cos x>1/2을 푸는', sc(trig2('cos(x)', 'y=cos x', None, None, y0=-1.6, y1=1.6), lines=[{'y': 0.5, 'style': 'dashed', 'color': O, 'label': 'y=1/2'}])),
         ('2sin²x+3cos x−3≥0', trig2('cos(x)', 'y=cos x', None, None, y0=-1.6, y1=1.6))]
for k in (59, 60, 62, 63, 72, 73):   # trig2 는 기본으로 점선 회색이라, 곡선이 하나면 파랑 실선으로
    for _, s in F[k]:
        if len(s['curves']) == 1: s['curves'][0].update(color=B, style='solid', labelAt=4.2)
# ─────────── Ⅱ. 사인법칙·코사인법칙·넓이 ───────────
T1 = ((210, 70), (80, 320), (390, 320))
Cc, Rr = circ3(*T1)
F[74] = [('사인법칙을 말해', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'},
                            extra={'circles': [{'center': list(Cc), 'r': Rr, 'color': GR}], 'points': {'O1': list(Cc)}, 'labels': [{'point': 'O1', 'text': 'O', 'dx': 6, 'dy': -4}]})),
         ('a/sinA가 왜 2R인지', tri(*T1, sides={('B', 'C'): 'a'},
                                   extra={'circles': [{'center': list(Cc), 'r': Rr, 'color': GR}], 'points': {'O1': list(Cc), "A'": [2 * Cc[0] - 80, 2 * Cc[1] - 320]},
                                          'shapes': [{'points': ['B', "A'"], 'close': False, 'style': 'dashed'}, {'points': ["A'", 'C'], 'close': False, 'style': 'dashed'}],
                                          'labels': [{'point': 'O1', 'text': 'O', 'dx': 6, 'dy': -4}, {'point': "A'", 'text': "A'", 'dx': 6, 'dy': -6}]}))]
A75, B75, C75 = tri_sides(sqrt(6), sqrt(3) + 1, 2)
F[75] = [('A=60°, C=45°, c=2일 때 a', tri(A75, B75, C75, sides={('A', 'B'): '2', ('B', 'C'): 'a'}, angs=[('A', ('B', 'C'), '60°'), ('C', ('A', 'B'), '45°')]))]
F[76] = [('sinA:sinB:sinC=3:5:7', tri(*tri_sides(3, 5, 7), sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'}, cap='a : b : c = sinA : sinB : sinC'))]
F[77] = [('코사인법칙을 말해', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)])),
         ('피타고라스 정리와 어떻게 이어지는지', tri((380, 80), (80, 320), (380, 320), sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'},
                                              extra={'rightAngles': [{'at': 'C', 'to': ['A', 'B']}]})),
         ('a²=b²+c²−2bc cosA를 유도하는', tri((110, 300), (400, 300), (250, 80), names=('A', 'B', 'C'),
                                              extra={'derive': [{'name': 'H', 'type': 'foot', 'point': 'C', 'over': ['A', 'B']}],
                                                     'shapes': [{'points': ['C', 'H'], 'close': False, 'style': 'dashed'}],
                                                     'rightAngles': [{'at': 'H', 'to': ['C', 'B']}], 'labels': [{'point': 'H', 'text': 'H', 'dx': -16, 'dy': 16}]},
                                              sides={('A', 'C'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)]))]
A78, B78, C78 = tri_sides(sqrt(13), 4, 3)
F[78] = [('b=4, c=3, A=60°일 때 a', tri(A78, B78, C78, sides={('A', 'B'): '3', ('C', 'A'): '4', ('B', 'C'): 'a'}, angs=[('A', ('B', 'C'), '60°')])),
         ('직접 잴 수 없는 두 지점', tri((250, 80), (80, 320), (400, 300), names=('C', 'A', 'B'), sides={('C', 'A'): '잴 수 있음', ('C', 'B'): '잴 수 있음', ('A', 'B'): '?'},
                                       angs=[('C', ('A', 'B'), '각')], cap='A와 B 사이에 연못이 있어서 바로 잴 수 없어'))]
F[79] = [('세 변 7, 8, 3에서', tri(*tri_sides(8, 7, 3), sides={('B', 'C'): '8', ('C', 'A'): '7', ('A', 'B'): '3'})),
         ('a²=b²+c²−bc인 삼각형', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)]))]
F[80] = [('끼인각이 A인 삼각형의 넓이', tri(*T1, sides={('C', 'A'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)])),
         ('(1/2)bc sinA인 이유', tri((110, 300), (400, 300), (250, 80), extra={'derive': [{'name': 'H', 'type': 'foot', 'point': 'C', 'over': ['A', 'B']}],
                                         'shapes': [{'points': ['C', 'H'], 'close': False, 'style': 'dashed'}], 'rightAngles': [{'at': 'H', 'to': ['C', 'B']}],
                                         'labels': [{'point': 'H', 'text': 'H', 'dx': -16, 'dy': 16}]}, sides={('A', 'C'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)])),
         ('넓이의 최댓값을 묻는', tri(*T1, sides={('C', 'A'): 'b', ('A', 'B'): 'c'}, angs=[('A', ('B', 'C'), False)]))]
F[81] = [('외접원의 반지름 R을 알 때', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'},
                                  extra={'circles': [{'center': list(Cc), 'r': Rr, 'color': GR}], 'points': {'O1': list(Cc)},
                                         'shapes': [{'points': ['O1', 'B'], 'close': False, 'style': 'dashed'}], 'labels': [{'point': 'O1', 'text': 'O', 'dx': 6, 'dy': -4}, {'at': [(Cc[0] + 80) / 2 - 10, (Cc[1] + 320) / 2], 'text': 'R', 'dot': False}]}))]
Ic, ir = incircle(*T1)
F[82] = [('내접원의 반지름이 r인 삼각형의 넓이', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'},
                                        extra={'circles': [{'center': list(Ic), 'r': ir, 'color': GR}], 'points': {'I': list(Ic)},
                                               'shapes': [{'points': ['I', 'A'], 'close': False, 'style': 'dashed'}, {'points': ['I', 'B'], 'close': False, 'style': 'dashed'}, {'points': ['I', 'C'], 'close': False, 'style': 'dashed'}],
                                               'labels': [{'point': 'I', 'text': 'I', 'dx': 6, 'dy': -4}]})),
         ('세 변의 길이만 주어지고 내접원의 반지름', tri(*T1, extra={'circles': [{'center': list(Ic), 'r': ir, 'color': GR}], 'points': {'I': list(Ic)}, 'labels': [{'point': 'I', 'text': 'I', 'dx': 6, 'dy': -4}]},
                                                  sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'}))]
F[83] = [('세 변 5, 6, 7인 삼각형의 넓이', tri(*tri_sides(5, 6, 7), sides={('B', 'C'): '5', ('C', 'A'): '6', ('A', 'B'): '7'}))]
F[84] = [('헤론의 공식을 말해', tri(*T1, sides={('B', 'C'): 'a', ('C', 'A'): 'b', ('A', 'B'): 'c'}))]
PG = {'points': {'A': [140, 90], 'B': [80, 300], 'C': [360, 300], 'D': [420, 90]}, 'shapes': [{'points': ['A', 'B', 'C', 'D']}],
      'angles': [{'at': 'B', 'to': ['C', 'A'], 'label': 'θ'}],
      'labels': [{'point': 'A', 'text': 'A', 'dx': -6, 'dy': -8}, {'point': 'B', 'text': 'B', 'dx': -16, 'dy': 12}, {'point': 'C', 'text': 'C', 'dx': 6, 'dy': 12}, {'point': 'D', 'text': 'D', 'dx': 6, 'dy': -8},
                 {'at': [220, 322], 'text': 'b', 'dot': False}, {'at': [92, 190], 'text': 'a', 'dot': False}]}
QD = {'points': {'A': [120, 170], 'B': [180, 320], 'C': [420, 280], 'D': [330, 70]}, 'shapes': [{'points': ['A', 'B', 'C', 'D']}, {'points': ['A', 'C'], 'close': False, 'style': 'dashed'}, {'points': ['B', 'D'], 'close': False, 'style': 'dashed'}],
      'derive': [{'name': 'E', 'type': 'intersect', 'a': ['A', 'C'], 'b': ['B', 'D']}], 'angles': [{'at': 'E', 'to': ['C', 'D'], 'label': 'θ'}],
      'labels': [{'point': 'A', 'text': 'A', 'dx': -14, 'dy': 0}, {'point': 'B', 'text': 'B', 'dx': -6, 'dy': 16}, {'point': 'C', 'text': 'C', 'dx': 6, 'dy': 10}, {'point': 'D', 'text': 'D', 'dx': 6, 'dy': -6},
                 {'at': [150, 205], 'text': 'p', 'dot': False}, {'at': [282, 140], 'text': 'q', 'dot': False}]}
F[85] = [('평행사변형의 넓이를 말해', PG), ('두 대각선의 길이가 p, q이고 사잇각', QD)]
# ─────────── Ⅲ. 수열 ───────────
F[92] = [('일차식으로 보면 공차는', sc(ax(-0.5, 6, -1, 14, step=1, yStep=2), labels=[dot(n, 2 * n + 1, '') for n in range(1, 6)] + [txt(5, 11, 'an=2n+1', 10, 0)],
                                   caption='점 (n, an)을 찍은 그림'))]
F[99] = [('지수함수와 비교하면', sc(ax(-0.5, 6, -2, 34, step=1, yStep=4), labels=[dot(n, 2 ** (n - 1) * 2, '') for n in range(1, 5)] + [txt(4, 16, 'an=2ⁿ', 10, 0)],
                                   curves=[cv('2^x', 'y=2ˣ', 4.8, GR, style='dashed', from_=0, to_=5)]))]
F[105] = [('그림이나 거꾸로 더하기로', {'points': {'p%d' % i: [60 + 40 * i, 320 - 40 * i] for i in range(6)},
                                    'shapes': [{'points': ['s%d%d' % (i, j) for j in range(4)]} for i in range(0)],
                                    'labels': [{'at': [60 + 40 * i + 20, 320 - 20 * (j * 2 + 1) + 0], 'text': '■', 'dot': False, 'color': B if j <= i else O} for i in range(5) for j in range(6)],
                                    'caption': '1+2+3+4+5(파랑)를 거꾸로 하나 더 붙이면(주황) 가로 5, 세로 6인 직사각형'})]

# ── 후처리: 모든 그림에 공통 적용 (그림을 더 쓸 때는 이 줄 위에 넣는다) ──
SUP = [('2^(x−1)+3', '2ˣ⁻¹+3'), ('4^(x−1)', '4ˣ⁻¹'), ('(1/2)^x', '(1/2)ˣ'), ('2^x', '2ˣ'), ('3^x', '3ˣ'), ('1^x', '1ˣ'), ('a^x', 'aˣ')]
def _sup(t):
    if not isinstance(t, str): return t
    for a, b in SUP: t = t.replace(a, b)
    return t
def _fix(sc):
    for key in ('curves', 'lines', 'labels'):
        for it in sc.get(key, []):
            for f in ('label', 'text'):
                if f in it: it[f] = _sup(it[f])
    if isinstance(sc.get('caption'), str): sc['caption'] = _sup(sc['caption'])
    a = sc.get('axes')
    if a and 'scale' not in a:
        dx, dy = a['xMax'] - a['xMin'], a['yMax'] - a['yMin']
        if dy / dx > 1.3 or dy / dx < 0.55:          # 너무 길쭉하거나 납작하면 가로·세로 눈금을 따로
            a['scale'] = round(320 / dx, 2); a['yScale'] = round(min(260, max(180, 320 * dy / dx)) / dy, 2)
    return sc
import copy as _c
for _k, _lst in F.items():
    F[_k] = [(s, _fix(_c.deepcopy(d))) for s, d in _lst]
