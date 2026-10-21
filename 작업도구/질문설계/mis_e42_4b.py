# -*- coding: utf-8 -*-
"""초4-2 4단원 mission 견본 2판 — 난이도 올림 (마스터 2026-10-20)

마스터: "기본도 응용도 너무 직관적으로 바로 알 수 있는 것이 많다. 말하는 개념 질문이 아니니 더 어려워도 된다.
         3가지 유형만 기본·응용 만들어 보여 줘."
→ 수직과 수선 · 사다리꼴 · 마름모 세 행성 × (기본 2 + 응용 2) = 12문항.
  기본 = 두세 단계(디딤돌 발전 문제 수준) / 응용 = 여러 성질을 이어야 풀림(최상위 S 수준).
  4학년이 배운 것만: 직선 180° · 삼각형 180° · 사각형 360° · 이등변·정삼각형 · 수직·평행 · 평행사변형·마름모 성질.

실행: python -X utf8 mis_e42_4b.py → 검산 → 견본_문제_초4-2_4단원_2판.pdf
"""
import os, sys, math, html
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import mis_e42_4 as B
from mis_e42_4 import (Fig, merge, svg, tag, ang, right_angle, dot, line, shape, tline, tshape, tapg, gridbg,
                       lab, cmlab, pt, CM, G, INK, SOFT, EDGE, FILL, HOT, GRAY, vec, cross, par, quad_par_pairs, simple, angle_at)

def M(p):            # 수학 좌표(cm, 위가 +) → 화면 px
    return (p[0] * CM, -p[1] * CM)
def dirv(a):
    return (math.cos(math.radians(a)), math.sin(math.radians(a)))
def go(p, a, t):
    d = dirv(a); return (p[0] + d[0] * t, p[1] + d[1] * t)
def ext(p, q, over=0.9):
    """선분 p-q 를 양쪽으로 over cm 늘인 두 끝(수학 좌표)"""
    dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    return (p[0] - ux * over, p[1] - uy * over), (q[0] + ux * over, q[1] + uy * over)
def mang(o, a, b):   # 수학 좌표 세 점의 각
    return angle_at(o, a, b)

Q = []
def add(**k): Q.append(k)

# ════════ A. E4-2-4-1 수직과 수선 ════════
def fA1():
    o = (0, 0); R = 4.2
    f = merge(line(M(go(o, 0, -R)), M(go(o, 0, R)), INK, 1.8), line(M(go(o, 90, -R)), M(go(o, 90, R)), INK, 1.8),
              line(M(o), M(go(o, 130, R - 0.4)), GRAY, 1.6), line(M(o), M(go(o, 298, R - 0.4)), GRAY, 1.6),
              lab(M(go(o, 0, R + 0.5)), '가', 0, 5), lab(M(go(o, 90, R + 0.4)), '나', 0, 0),
              lab(M(go(o, 130, R)), '라', -6, -2), lab(M(go(o, 298, R)), '다', 8, 8),
              right_angle(M(o), M(go(o, 0, 1)), M(go(o, 90, 1)), 10),
              ang(M(o), M(go(o, 90, 1)), M(go(o, 130, 1)), '40°', 34, lab_d=16),
              ang(M(o), M(go(o, 270, 1)), M(go(o, 298, 1)), '28°', 38, lab_d=16),
              ang(M(o), M(go(o, 130, 1)), M(go(o, 298, 1)), '㉠', 62, lab_d=14))
    return f
add(code='E4-2-4-1', title='수직과 수선', lv='basic', kind='mc',
    stem='직선 가와 직선 나는 서로 수직입니다. ㉠의 크기는 몇 도입니까?', fig=fA1,
    choices=['118°', '158°', '140°', '192°', '168°'], answer=4, val=168,
    explain='반직선 라와 직선 가의 왼쪽 사이는 90° − 40° = 50°예요. ㉠은 그 50°와 직각 90°, 그리고 28°를 이은 각이라 50° + 90° + 28° = 168°예요.',
    wrong={0: '반직선 라와 직선 가 사이의 50°를 빼먹었어요.', 1: '40°를 그대로 더했어요(90° − 40°를 안 함).', 3: '㉠의 반대쪽 각을 구했어요.', 2: '28°를 빼먹었어요.'},
    src='디딤돌 발전 114쪽 4~6번 유형(두 단계 이상)')

def fA2():
    o = (0, 0); R = 4.0
    pN, pD = go(o, 145, 3.4), go(o, 55, 3.4)
    return merge(line(M(go(o, 180, R)), M(go(o, 0, R)), INK, 1.8), line(M(o), M(pN), GRAY, 1.7), line(M(o), M(pD), GRAY, 1.7),
                 dot(M(go(o, 180, R)), 'ㄱ', at='below'), dot(M(go(o, 0, R)), 'ㅂ', at='below'), dot(M(o), 'ㄹ', at='below'),
                 dot(M(pN), 'ㄴ', at='left'), dot(M(pD), 'ㄷ', at='right'),
                 right_angle(M(o), M(pN), M(pD), 11),
                 ang(M(o), M(go(o, 180, 1)), M(go(o, 145, 1)), '35°', 40, lab_d=18),
                 ang(M(o), M(go(o, 0, 1)), M(go(o, 55, 1)), '㉠', 30, lab_d=14))
add(code='E4-2-4-1', title='수직과 수선', lv='basic', kind='mc',
    stem='세 점 ㄱ, ㄹ, ㅂ은 한 직선 위에 있고, 선분 ㄹㄴ과 선분 ㄹㄷ은 서로 수직입니다. ㉠의 크기는 몇 도입니까?', fig=fA2,
    choices=['35°', '55°', '65°', '125°', '145°'], answer=1, val=55,
    explain='직선이 이루는 각은 180°예요. 35°와 직각 90°를 빼면 ㉠ = 180° − 35° − 90° = 55°예요.',
    wrong={0: '35°와 ㉠이 같다고 봤어요.', 4: '180° − 35°만 하고 직각을 빼지 않았어요.', 3: '35° + 90°로 각 ㄱㄹㄷ을 구했어요.'},
    src='디딤돌 발전 114쪽 5번 유형')

A3 = {}
def _a3():
    Aa = (0, 0); Bb = (4, 0)
    C = (0, Bb[1] + (0 - Bb[0]) / dirv(130)[0] * dirv(130)[1])          # 다(130°)가 나(x=0)와 만나는 점
    t = C[1] / dirv(40)[1]; Dd = (C[0] - dirv(40)[0] * t, 0)             # 라(⊥다)가 가(y=0)와 만나는 점
    A3.update(A=Aa, B=Bb, C=C, D=Dd)
_a3()
def fA3():
    A, Bb, C, Dd = A3['A'], A3['B'], A3['C'], A3['D']
    g0, g1 = (Dd[0] - 1.2, 0), (Bb[0] + 1.2, 0)
    n0, n1 = (0, -1.0), (0, C[1] + 1.0)
    d0, d1 = ext(Bb, C, 1.0); r0, r1 = ext(Dd, C, 1.0)
    return merge(line(M(g0), M(g1), INK, 1.8), line(M(n0), M(n1), INK, 1.8), line(M(d0), M(d1), GRAY, 1.7), line(M(r0), M(r1), GRAY, 1.7),
                 lab(M(g1), '가', 14, 5), lab(M(n1), '나', 0, -6), lab(M(d0), '다', 10, 12), lab(M(r0), '라', -12, 4),
                 right_angle(M(A), M((1, 0)), M((0, 1)), 10), right_angle(M(C), M(Bb), M(Dd), 10),
                 ang(M(Bb), M((0, 0)), M(C), '50°', 30, lab_d=16), ang(M(Dd), M((0, 0)), M(C), '㉠', 30, lab_d=14))
add(code='E4-2-4-1', title='수직과 수선', lv='hard', kind='mc',
    stem='직선 가와 직선 나는 서로 수직이고, 직선 라는 직선 다에 수직입니다. ㉠의 크기는 몇 도입니까?', fig=fA3,
    choices=['50°', '140°', '40°', '90°', '130°'], answer=2, val=40,
    explain='직선 가·나·다가 만드는 삼각형에서 직선 나와 다 사이 각은 180° − 90° − 50° = 40°예요. 직선 라는 다에 수직이라, 나와 라 사이 각은 90° − 40° = 50°예요. 직선 가·나·라가 만드는 삼각형에서 ㉠ = 180° − 90° − 50° = 40°예요.',
    wrong={0: '중간에 구한 50°를 답으로 했어요.', 1: '180° − 40°로 바깥쪽 각을 구했어요.', 4: '180° − 50°로 바깥쪽 각을 구했어요.'},
    src='최상위 S 4-2 94쪽 「수직은 직선의 절반」 유형 · 삼각형 세 각의 합(4-1)')

A4 = {}
def _a4():
    N = (0, 0); Dd = (4, 0); R = go(Dd, 65, 2.0)
    t = R[0] / -dirv(155)[0]; Aa = go(R, 155, t)
    A4.update(A=(0, Aa[1]), N=N, D=Dd, R=R)
_a4()
def fA4():
    A, N, Dd, R = A4['A'], A4['N'], A4['D'], A4['R']
    return merge(shape([M(A), M(N), M(Dd), M(R)]), lab(M(A), 'ㄱ', -10, -4), lab(M(N), 'ㄴ', -10, 12), lab(M(Dd), 'ㄷ', 10, 14), lab(M(R), 'ㄹ', 12, -2),
                 right_angle(M(N), M(A), M(Dd), 11), right_angle(M(R), M(A), M(Dd), 11), ang(M(A), M(N), M(R), '㉠', 26, lab_d=14))
add(code='E4-2-4-1', title='수직과 수선', lv='hard', kind='mc',
    stem='사각형 ㄱㄴㄷㄹ에서 변 ㄱㄴ과 변 ㄴㄷ은 수직이고, 변 ㄱㄹ과 변 ㄹㄷ도 수직입니다. 각 ㄴㄷㄹ이 ㉠보다 50° 클 때, ㉠의 크기는 몇 도입니까?', fig=fA4,
    choices=['115°', '90°', '40°', '130°', '65°'], answer=4, val=65,
    explain='사각형의 네 각의 합은 360°라서 ㉠ + 각 ㄴㄷㄹ = 360° − 90° − 90° = 180°예요. 합이 180°이고 차가 50°이니, ㉠ = (180° − 50°) ÷ 2 = 65°예요.',
    wrong={0: '각 ㄴㄷㄹ을 구했어요.', 3: '180° − 50°에서 멈췄어요(÷ 2를 안 함).', 2: '90°에서 50°를 뺐어요(사각형 네 각의 합을 쓰지 않음).'},
    src='최상위 S 4-2 98쪽 「사각형 네 각의 합」 유형 · 합과 차')

# ════════ B. E4-2-4-4 사다리꼴 ════════
QB1 = {'가': [(0, 3), (6, 1), (5, 3), (2, 4)], '나': [(9, 1), (13, 0), (14, 3), (10, 4)], '다': [(17, 0), (21, 1), (21, 4), (18, 4)],
       '라': [(0, 10), (6, 8), (5, 6), (1, 7)], '마': [(9, 6), (12, 6), (14, 9), (9, 9)]}
def fB1(hl=()):
    f = gridbg(-1, -1, 23, 11)
    for k, q in QB1.items():
        f = merge(f, tshape(k, [pt(p, G) for p in q], k in hl, k))
    return f
TB1 = sorted(k for k, q in QB1.items() if quad_par_pairs(q) >= 1)
add(code='E4-2-4-4', title='사다리꼴', lv='basic', kind='tap',
    stem='모눈 위의 사각형 가운데 사다리꼴을 모두 눌러 보세요.', fig=fB1, tap=TB1,
    explain='모눈 칸을 세어 기울기를 비교해요. 가는 오른쪽 3칸에 위로 1칸 가는 두 변이 평행해요. 나는 두 쌍이 평행한 평행사변형이라 사다리꼴이에요. 마는 위아래 변이 평행해요. 라는 오른쪽 6칸에 위로 2칸(3칸에 1칸)과 오른쪽 4칸에 위로 1칸이라 평행하지 않아요.',
    wrong={'라를 누름': '눈으로만 보고 평행하다고 생각했어요(칸을 세지 않음).', '가를 빼먹음': '비스듬하게 놓인 평행한 변을 못 찾았어요.', '나를 빼먹음': '평행사변형은 사다리꼴이 아니라고 생각했어요.'},
    src='디딤돌 기본 106쪽 1번 · 최상위 S 4단원 모눈 유형')

def fB2():
    A, R, Mm, N, Dd = (0, 5), (5, 5), (5, 0), (0, 0), (8, 0)
    return merge(shape([M(A), M(N), M(Dd), M(R)]), line(M(R), M(Mm), GRAY, 1.5, True), right_angle(M(Mm), M(R), M(Dd), 10),
                 lab(M(A), 'ㄱ', -8, -8), lab(M(N), 'ㄴ', -10, 12), lab(M(Dd), 'ㄷ', 10, 12), lab(M(R), 'ㄹ', 8, -8), lab(M(Mm), 'ㅁ', 0, 20),
                 tag(4 * CM, 34, '8 cm', SOFT, 12.5))
add(code='E4-2-4-4', title='사다리꼴', lv='basic', kind='mc',
    stem='사다리꼴 ㄱㄴㄷㄹ에서 변 ㄱㄹ과 변 ㄴㄷ은 평행하고, 평행선 사이의 거리는 5 cm입니다. 꼭짓점 ㄹ에서 변 ㄴㄷ에 수선 ㄹㅁ을 그었더니 사각형 ㄱㄴㅁㄹ은 정사각형이 되었습니다. 선분 ㅁㄷ의 길이는 몇 cm입니까?',
    fig=fB2, choices=['2 cm', '5 cm', '3 cm', '8 cm', '13 cm'], answer=2, val=3,
    explain='수선 ㄹㅁ의 길이가 평행선 사이의 거리라서 5 cm예요. 정사각형은 네 변이 같으니 선분 ㄴㅁ도 5 cm, 선분 ㅁㄷ = 8 − 5 = 3 cm예요.',
    wrong={1: '정사각형의 한 변을 답으로 했어요.', 4: '8과 5를 더했어요.', 0: '평행선 사이의 거리를 쓰지 못했어요.'},
    src='디딤돌 기본 106쪽 4번 · 발전 114쪽 9번 유형')

def fB3():
    A, R, N, Dd = (2, 4), (8, 4), (0, 0), (11, 0)
    L1, L2 = (1, 2), (9.5, 2)                        # 가운데 가로 선분(위·아래 변과 평행)
    P, Qq = (5, 4), (5, 0)                           # 세로 선분
    return merge(shape([M(A), M(N), M(Dd), M(R)], EDGE, '#FDF3E0'), line(M(L1), M(L2), EDGE, 1.7), line(M(P), M(Qq), EDGE, 1.7))
add(code='E4-2-4-4', title='사다리꼴', lv='hard', kind='mc',
    stem='위아래 두 변이 평행한 사다리꼴 안에 위아래 변과 평행한 선분 1개와 세로 선분 1개를 그었습니다. 그림에서 찾을 수 있는 크고 작은 사다리꼴은 모두 몇 개입니까?', fig=fB3,
    choices=['4개', '5개', '6개', '8개', '9개'], answer=4, val=9,
    explain='작은 조각 1개짜리 4개, 위아래로 붙은 2개짜리 2개, 옆으로 붙은 2개짜리 2개, 전체 1개 — 모두 위·아래 변이 평행해서 4 + 2 + 2 + 1 = 9개예요.',
    wrong={0: '작은 조각만 셌어요.', 1: '작은 조각과 전체만 셌어요.', 3: '조각 2개를 합친 사다리꼴을 하나 빠뜨렸어요.'},
    src='디딤돌 발전 117쪽 23번 · 최상위 S 4단원 「크고 작은 도형의 개수」')

BN, BD, BR = (2, 4), (5, 4), (3, 0)                  # 점 종이(가로 0~5, 세로 0~4) — 수학 좌표 아님, 모눈 좌표(아래로 +)
def _b4cands():
    out = []
    for x in range(0, 6):
        for y in range(0, 5):
            p = (x, y)
            if p in (BN, BD, BR): continue
            q = [p, BN, BD, BR]
            if not simple(q): continue
            if any(abs(cross(vec(q[i - 1], q[i]), vec(q[i], q[(i + 1) % 4]))) < 1e-9 for i in range(4)): continue   # 세 꼭짓점이 한 줄
            if quad_par_pairs(q) >= 1: out.append(p)
    return out
B4 = _b4cands()
def fB4():
    s = 30
    f = Fig()
    for x in range(0, 6):
        for y in range(0, 5):
            f.add('<circle cx="%d" cy="%d" r="2.6" fill="#9AA7C2"/>' % (x * s, y * s), [(x * s - 4, y * s - 4), (x * s + 4, y * s + 4)])
    P = lambda p: (p[0] * s, p[1] * s)
    f = merge(f, line(P(BN), P(BD), EDGE, 1.8), line(P(BD), P(BR), EDGE, 1.8),
              dot(P(BN), 'ㄴ', at='below'), dot(P(BD), 'ㄷ', at='below'), dot(P(BR), 'ㄹ', at='above'))
    return f
add(code='E4-2-4-4', title='사다리꼴', lv='hard', kind='mc',
    stem='점 종이에 세 점 ㄴ, ㄷ, ㄹ이 있습니다. 나머지 꼭짓점 ㄱ을 점 종이의 다른 점에 찍어 사각형 ㄱㄴㄷㄹ을 만들 때, 사다리꼴이 되는 점은 모두 몇 개입니까?', fig=fB4,
    choices=['3개', '4개', '5개', '6개', '7개'], answer=None, val=len(B4), cand=True,
    explain='',
    wrong={},
    src='디딤돌 기본 108쪽 8번 · 최상위 S 4단원 점 종이 유형')

# ════════ C. E4-2-4-6 마름모 ════════
def rh(side, a_deg, o=(0, 0)):        # ㄱ 위 · ㄴ 왼 · ㄷ 아래 · ㄹ 오른, ㄴ 의 각 a_deg (수학 좌표)
    h = side * math.sin(math.radians(a_deg / 2)); w = side * math.cos(math.radians(a_deg / 2))
    return (o[0] + w, o[1] + h), o, (o[0] + w, o[1] - h), (o[0] + 2 * w, o[1])

def fC1():
    A, N, C, R = rh(5, 70)
    return merge(shape([M(A), M(N), M(C), M(R)]), line(M(A), M(C), GRAY, 1.5),
                 lab(M(A), 'ㄱ', 0, -8), lab(M(N), 'ㄴ', -12, 5), lab(M(C), 'ㄷ', 0, 20), lab(M(R), 'ㄹ', 12, 5),
                 ang(M(N), M(A), M(C), '70°', 26, lab_d=17), ang(M(A), M(N), M(C), '㉠', 24, lab_d=13))
add(code='E4-2-4-6', title='마름모', lv='basic', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ에 선분 ㄱㄷ을 그었습니다. ㉠의 크기는 몇 도입니까?', fig=fC1,
    choices=['35°', '70°', '110°', '55°', '125°'], answer=3, val=55,
    explain='마름모는 네 변의 길이가 같아서 삼각형 ㄱㄴㄷ은 변 ㄴㄱ과 변 ㄴㄷ이 같은 이등변삼각형이에요. 크기가 같은 두 각의 합이 180° − 70° = 110°이니 ㉠ = 55°예요.',
    wrong={0: '70°를 반으로 나눴어요.', 2: '이웃한 각(180° − 70°)을 구하고 멈췄어요.', 1: '마주 보는 각과 헷갈렸어요.'},
    src='디딤돌 기본 110쪽 14번 · 4-2 2단원 이등변삼각형과 잇기')

def fC2():
    A, N, C, R = rh(5, 2 * math.degrees(math.atan(4 / 3)))
    O = ((N[0] + R[0]) / 2, 0)
    return merge(shape([M(A), M(N), M(C), M(R)]), line(M(A), M(C), GRAY, 1.5), line(M(N), M(R), GRAY, 1.5),
                 shape([M(A), M(N), M(O)], '#B55B45', '#FCEAE5', 1.8),
                 lab(M(A), 'ㄱ', 0, -8), lab(M(N), 'ㄴ', -12, 5), lab(M(C), 'ㄷ', 0, 20), lab(M(R), 'ㄹ', 12, 5), lab(M(O), 'ㅇ', 10, 16))
add(code='E4-2-4-6', title='마름모', lv='basic', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ의 두 대각선이 점 ㅇ에서 만납니다. 대각선 ㄱㄷ은 8 cm이고, 변 ㄱㄴ은 5 cm, 색칠한 삼각형 ㄱㄴㅇ의 세 변의 길이의 합은 12 cm입니다. 대각선 ㄴㄹ의 길이는 몇 cm입니까?', fig=fC2,
    choices=['6 cm', '3 cm', '7 cm', '8 cm', '10 cm'], answer=0, val=6,
    explain='두 대각선은 서로를 똑같이 둘로 나눠서 선분 ㄱㅇ = 4 cm예요. 선분 ㄴㅇ = 12 − 5 − 4 = 3 cm이고, 대각선 ㄴㄹ은 그 두 배라 6 cm예요.',
    wrong={1: '선분 ㄴㅇ에서 멈췄어요(두 배를 안 함).', 2: '12 − 5에서 멈췄어요(선분 ㄱㅇ을 빼지 않음).', 3: '두 대각선 길이가 같다고 생각했어요.'},
    src='디딤돌 기본 111쪽 마름모의 성질 · 발전 115쪽 10번 유형')

C3 = {}
def _c3():
    Aa = (0, 0); R = (5, 0); N = go(Aa, -100, 5); D = (N[0] + 5, N[1]); E = go(Aa, -40, 5)
    C3.update(A=Aa, R=R, N=N, D=D, E=E)
_c3()
def fC3():
    A, R, N, D, E = C3['A'], C3['R'], C3['N'], C3['D'], C3['E']
    return merge(shape([M(A), M(N), M(D), M(R)]), shape([M(A), M(N), M(E)], '#3C8B64', '#E6F4EC', 1.7), line(M(E), M(R), GRAY, 1.5),
                 lab(M(A), 'ㄱ', -8, -8), lab(M(N), 'ㄴ', -12, 10), lab(M(D), 'ㄷ', 10, 14), lab(M(R), 'ㄹ', 10, -6), lab(M(E), 'ㅁ', -2, 22),
                 ang(M(R), M(A), M(E), '㉠', 30, lab_d=13))
add(code='E4-2-4-6', title='마름모', lv='hard', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ 안에 정삼각형 ㄱㄴㅁ을 그리고 선분 ㅁㄹ을 그었습니다. 각 ㄴㄱㄹ이 100°일 때, ㉠의 크기는 몇 도입니까?', fig=fC3,
    choices=['40°', '50°', '60°', '70°', '80°'], answer=3, val=70,
    explain='각 ㅁㄱㄹ = 100° − 60° = 40°예요. 마름모의 변 ㄱㄹ과 정삼각형의 변 ㄱㅁ은 둘 다 변 ㄱㄴ과 길이가 같아서, 삼각형 ㄱㅁㄹ은 이등변삼각형이에요. ㉠ = (180° − 40°) ÷ 2 = 70°예요.',
    wrong={0: '각 ㅁㄱㄹ을 답으로 했어요.', 2: '정삼각형의 각과 헷갈렸어요.', 4: '마름모의 각 ㄱㄹㄷ(80°)을 답으로 했어요.', 1: '100°를 반으로 나눴어요.'},
    src='최상위 S 4단원 「이어 붙인·겹친 도형에서 각」 · 이등변삼각형')

C4 = {}
def _c4():
    A, N, C, R = rh(5, 50)
    u = (C[0] - R[0], C[1] - R[1]); L = math.hypot(*u); u = (u[0] / L, u[1] / L)
    nrm = (u[1], -u[0])                               # ㄹ→ㄷ 의 바깥쪽(ㄱ 반대쪽) 수직
    if (A[0] - R[0]) * nrm[0] + (A[1] - R[1]) * nrm[1] > 0: nrm = (-nrm[0], -nrm[1])
    Mm = (C[0] + nrm[0] * 5, C[1] + nrm[1] * 5); Bb = (R[0] + nrm[0] * 5, R[1] + nrm[1] * 5)
    C4.update(A=A, N=N, C=C, R=R, M=Mm, B=Bb)
_c4()
def fC4():
    A, N, C, R, Mm, Bb = (C4[k] for k in ('A', 'N', 'C', 'R', 'M', 'B'))
    return merge(shape([M(A), M(N), M(C), M(R)]), shape([M(R), M(C), M(Mm), M(Bb)], '#3C8B64', '#E6F4EC', 1.7), line(M(A), M(Bb), '#B55B45', 1.7),
                 right_angle(M(C), M(R), M(Mm), 9),
                 lab(M(A), 'ㄱ', 0, -8), lab(M(N), 'ㄴ', -12, 5), lab(M(C), 'ㄷ', -6, 18), lab(M(R), 'ㄹ', 4, -10), lab(M(Mm), 'ㅁ', 0, 18), lab(M(Bb), 'ㅂ', 12, 4),
                 ang(M(N), M(A), M(C), '50°', 34, lab_d=17), ang(M(A), M(R), M(Bb), '㉠', 46, lab_d=14))
add(code='E4-2-4-6', title='마름모', lv='hard', kind='mc',
    stem='마름모 ㄱㄴㄷㄹ과 정사각형 ㄹㄷㅁㅂ을 겹치지 않게 이어 붙이고 선분 ㄱㅂ을 그었습니다. 각 ㄱㄴㄷ이 50°일 때, ㉠의 크기는 몇 도입니까?', fig=fC4,
    choices=['20°', '25°', '40°', '45°', '70°'], answer=0, val=20,
    explain='각 ㄱㄹㄷ은 각 ㄱㄴㄷ과 마주 보는 각이라 50°예요. 그래서 각 ㄱㄹㅂ = 50° + 90° = 140°예요. 변 ㄹㄱ과 변 ㄹㅂ은 둘 다 마름모의 한 변과 같아 삼각형 ㄱㄹㅂ은 이등변삼각형이고, ㉠ = (180° − 140°) ÷ 2 = 20°예요.',
    wrong={1: '50°를 반으로 나눴어요.', 3: '정사각형의 대각선이 만드는 각(45°)과 헷갈렸어요.', 2: '각 ㄱㄹㅂ을 180° − 50° − 90°로 계산했어요.'},
    src='디딤돌 발전 116쪽 17·18번 · 최상위 S 이어 붙인 도형')

# ════════ 검산 ════════
def check():
    # A1: 라 130°, 다 298° → ㉠ 168°
    assert (298 - 130) == 168 and (90 - 40) + 90 + 28 == 168
    # A2
    assert 180 - 35 - 90 == 55 and abs((145 - 55) - 90) < 1e-9
    # A3: 그림에서 실제로 잰 각
    A, Bb, C, Dd = A3['A'], A3['B'], A3['C'], A3['D']
    assert abs(mang(Bb, A, C) - 50) < 1e-6 and abs(mang(C, Bb, Dd) - 90) < 1e-6 and abs(mang(Dd, A, C) - 40) < 1e-6, (mang(Dd, A, C))
    # A4
    A, N, Dd, R = A4['A'], A4['N'], A4['D'], A4['R']
    assert abs(mang(N, A, Dd) - 90) < 1e-6 and abs(mang(R, A, Dd) - 90) < 1e-6
    assert abs(mang(A, N, R) - 65) < 1e-6 and abs(mang(Dd, N, R) - 115) < 1e-6 and simple([A, N, Dd, R])
    # B1
    assert TB1 == ['가', '나', '마'], TB1
    assert quad_par_pairs(QB1['나']) == 2 and quad_par_pairs(QB1['라']) == 0 and all(simple(q) for q in QB1.values())
    # B2: 8 - 5
    assert 8 - 5 == 3
    # B4: 점 종이 후보
    print('B4 사다리꼴이 되는 ㄱ:', B4, len(B4))
    # C1
    A, N, C, R = rh(5, 70); assert abs(mang(A, N, C) - 55) < 1e-6
    # C2: 대각선 8, 6 → 변 5
    A, N, C, R = rh(5, 2 * math.degrees(math.atan(4 / 3)))
    assert abs(math.dist(A, C) - 8) < 1e-6 and abs(math.dist(N, R) - 6) < 1e-6 and 5 + 4 + 3 == 12
    # C3
    A, R, N, D, E = C3['A'], C3['R'], C3['N'], C3['D'], C3['E']
    assert abs(mang(A, N, R) - 100) < 1e-6 and abs(math.dist(A, E) - 5) < 1e-6 and abs(math.dist(N, E) - 5) < 1e-6
    assert abs(mang(R, A, E) - 70) < 1e-6 and abs(mang(R, A, D) - 80) < 1e-6
    # ㅁ 이 마름모 안에 있나
    q = [A, N, D, R]
    inside = all(cross(vec(q[i], q[(i + 1) % 4]), vec(q[i], E)) * cross(vec(q[0], q[1]), vec(q[0], q[2])) > 0 for i in range(4))
    assert inside, 'ㅁ 이 마름모 밖'
    # C4
    A, N, C, R, Mm, Bb = (C4[k] for k in ('A', 'N', 'C', 'R', 'M', 'B'))
    assert abs(mang(R, A, Bb) - 140) < 1e-6 and abs(mang(A, R, Bb) - 20) < 1e-6
    # 보기·정답 위치
    pos = [0] * 5
    for p in Q:
        if p['kind'] == 'mc':
            assert len(set(p['choices'])) == 5, p['stem']
            v = p['val']
            assert str(v) in p['choices'][p['answer']].split('°')[0].split(' ')[0].split('개')[0], (p['stem'], v, p['choices'][p['answer']])
            pos[p['answer']] += 1
    print('정답 위치(①~⑤):', pos, '· 문항', len(Q))

# B4 정답·해설은 검산 결과로 채운다
def _fill_b4():
    p = [x for x in Q if x.get('cand')][0]; n = len(B4)
    p['answer'] = p['choices'].index('%d개' % n)
    hz = [c for c in B4 if c[1] == BR[1]]; sl = [c for c in B4 if c[1] != BR[1]]
    p['explain'] = ('사다리꼴이 되려면 변 ㄱㄹ이 변 ㄴㄷ과 평행하거나, 변 ㄱㄴ이 변 ㄹㄷ과 평행해야 해요. '
                    '변 ㄱㄹ이 가로가 되는 점(점 ㄹ과 같은 줄)이 %d개, 그 밖에 변 ㄱㄴ이 변 ㄹㄷ과 같은 기울기(왼쪽 1칸·위 2칸)가 되는 점이 %d개라 모두 %d개예요. '
                    '(사각형이 꼬이는 점은 빼고, 두 쌍이 다 평행한 평행사변형도 사다리꼴로 세요.)' % (len(hz), len(sl), n))
    p['wrong'] = {p['choices'].index('%d개' % len(hz)): '가로로 평행한 경우만 찾고 비스듬한 평행은 놓쳤어요.',
                  p['choices'].index('%d개' % (n + 2)): '사각형이 꼬이는 점(오른쪽 두 점)까지 셌어요.'}
_fill_b4()

# ════════ PDF ════════
def build():
    o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>견본 2판 문제 초4-2 4단원</title><style>%s</style></head><body>' % B.CSS]
    o.append('<h1>mission 견본 2판 · 초4-2 4. 사각형 — 난이도 올림</h1>')
    o.append('''<div class="note"><b>마스터 10/20 「더 어렵게」 반영</b><ul>
<li><b>기본(mission)</b> = 한 번에 보이는 답이 없게 <b>두세 단계</b>를 거치게(디딤돌 발전 문제 수준). 예: 수직 + 직선 180° + 각 하나 더 / 정사각형 + 평행선 사이의 거리.</li>
<li><b>응용(hard mission)</b> = <b>여러 성질을 이어야</b> 풀림(최상위 S 수준). 예: 수직 두 번 + 삼각형 180° 두 번 / 마름모 + 정삼각형 + 이등변삼각형 / 사각형 360° + 합과 차.</li>
<li>4학년이 배운 것만 썼어요(직선 180° · 삼각형 180° · 사각형 360° · 이등변·정삼각형 · 수직·평행 · 평행사변형·마름모 성질). 엇각·동위각 같은 중학교 내용은 안 써요.</li>
<li>오답은 "중간에 멈춘 값 · 반대쪽 각 · 반으로 나눈 값"처럼 아이들이 실제로 멈추는 자리로 — 어른 기록에 어디서 멈췄는지 남아요.</li>
<li>세 행성(수직과 수선 · 사다리꼴 · 마름모) × 기본 2 + 응용 2 = 12문항. 보시고 난이도가 맞으면 이 수준으로 전부 만들게요.</li></ul></div>''')
    cur = None; i = 0
    for p in Q:
        if p['code'] != cur:
            cur = p['code']; o.append('<h2>%s · %s</h2>' % (p['code'], p['title']))
        i += 1; o.append(B.card(dict(p, r=1), i))
    o.append('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    check()
    import e42_common
    print(e42_common.make_pdf(build(), '견본_문제_초4-2_4단원_2판'))
