# -*- coding: utf-8 -*-
"""초4-2 「2. 삼각형」 「4. 사각형」 「6. 다각형」 질문 그림 (2026-09-26)

고른 기준 — 초5-1 6단원에서 마스터가 잡아 주신 것 그대로 (대전제 세부 원칙 2026-09-23)
  ✅ 넣는다: 그림이 **조건**을 주는 질문 — 각도·길이·배치·조각 모양처럼 말로만 하면 머릿속에 안 그려지는 것
  ❌ 안 넣는다: 뜻·성질을 묻는 질문("이등변삼각형은 어떤 삼각형이야?"). 스스로 떠올려야 하는데 그림을 보고 말하게 된다
  ❌ 그림에 **답을 적지 않는다**: 구하는 각은 '?' 로, 성질(수직·같은 길이)을 묻는 질문에는 그 표시를 넣지 않는다

질문 121개 중 22개에만 붙인다. 그림은 질문마다 배치·수를 다르게 한다(재탕 금지 — 마스터).
"""
import os, sys, math, importlib.util
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)
S = D.S          # 1 cm = 26 px

FIGS = {}

# ══════════════════════════════════════ 2. 삼각형 ══════════════════════════════════════

# 2-01 계단3칸 — 같은 두 변이 10 cm, 세 변의 합이 50 cm인 이등변삼각형
def _f201():
    A, B, C = (0, 0), (150, 0), (75, -104)          # 밑변이 긴 이등변삼각형
    f = D.merge(
        D.poly([A, B, C], 'blue'),
        D.ticks(A, C, 1), D.ticks(B, C, 1),          # 두 변이 같다 = 문제에 주어진 조건
        D.tag(24, -60, '10 cm', D.SOFT, 12, anchor='end'),
        D.tag(126, -60, '10 cm', D.SOFT, 12, anchor='start'),
        D.dim_h(0, 150, 16, '?'),
    )
    return D.svg(f, note='세 변의 길이의 합은 50 cm예요.')
FIGS['t201'] = _f201()

# 2-02 2회차 — 크기가 같은 두 각 중 하나가 40°
def _f202a():
    A, B, C = (0, 0), (140, 0), (70, -112)
    f = D.merge(
        D.poly([A, B, C], 'green'),
        D.ticks(A, C, 1), D.ticks(B, C, 1),
        D.ang(A, B, C, '40°'), D.ang(B, C, A, '?'),
    )
    return D.svg(f)
FIGS['t202a'] = _f202a()

# 2-02 2회차(조건) — 같은 두 변 사이의 각이 80°  → 꼭지각을 위에 두어 앞 그림과 다르게
def _f202b():
    A, B, C = (0, 0), (118, 0), (59, -128)           # 위가 뾰족한(길쭉한) 이등변삼각형
    f = D.merge(
        D.poly([A, B, C], 'amber'),
        D.ticks(A, C, 1), D.ticks(B, C, 1),
        D.ang(C, A, B, '80°', r=26),
        D.ang(A, B, C, '?'), D.ang(B, C, A, '?'),
    )
    return D.svg(f)
FIGS['t202b'] = _f202b()

# 2-02 계단3칸 — 두 각 중 하나가 25°  → 옆으로 누운 배치로 앞의 둘과 또 다르게
def _f202c():
    A, B, C = (0, 0), (0, 130), (132, 65)            # 세로로 선 이등변삼각형
    f = D.merge(
        D.poly([A, B, C], 'rose'),
        D.ticks(A, C, 1), D.ticks(B, C, 1),
        D.ang(A, B, C, '25°'), D.ang(B, C, A, '?'),
    )
    return D.svg(f)
FIGS['t202c'] = _f202c()

# 2-03 계단3칸 — 정삼각형의 한 변을 곧게 늘였을 때 바깥쪽 각
def _f203():
    A, B, C = (0, 0), (120, 0), (60, -104)
    E = (206, 0)                                      # 변을 오른쪽으로 곧게 늘인 끝
    f = D.merge(
        D.poly([A, B, C], 'blue'),
        D.ticks(A, B, 1), D.ticks(B, C, 1), D.ticks(A, C, 1),
        D.seg(B, E, 'solid', '#3B6FA8', 1.6),
        D.ang(B, E, C, '?', r=30),
    )
    return D.svg(f, note='정삼각형의 한 변을 오른쪽으로 곧게 늘였어요.')
FIGS['t203'] = _f203()

# 2-05 계단3칸 — 일부가 지워져 두 각 60°, 60° 만 보이는 삼각형
def _f205():
    A, B = (0, 0), (156, 0)
    torn = [A, B, (120, -58), (92, -40), (58, -62), (26, -44)]   # 위쪽이 찢겨 나간 결
    f = D.merge(
        D.poly(torn, 'amber'),
        D.ang(A, B, (26, -44), '60°'), D.ang(B, A, (120, -58), '60°'),
        D.tag(74, -76, '\u2702 지워진 부분', D.SOFT, 11.5, 600),
    )
    return D.svg(f, note='삼각형의 위쪽이 지워져서 두 각만 보여요.')
FIGS['t205'] = _f205()

# ══════════════════════════════════════ 4. 사각형 ══════════════════════════════════════

# 4-01 2회차 — 각도기로 직선 가에 대한 수선 긋기 (조건만: 직선과 점)
def _f401a():
    f = D.merge(
        D.ray((0, 60), (200, 60), '가', over=18),
        D.dot((120, 60), 'ㄱ', at='below'),
    )
    return D.svg(f, note='직선 가 위의 점 ㄱ 이에요.')
FIGS['t401a'] = _f401a()

# 4-01 계단3칸 — 수직인 두 직선 + 20° 를 이루는 다른 직선
def _f401b():
    O = (100, 70)
    f = D.merge(
        D.ray((0, 70), (200, 70), '나', over=16),                       # 가로
        D.ray((100, 0), (100, 140), '가', over=16),                     # 세로(수직)
        D.right_angle(O, (200, 70), (100, 0)),
        D.ray(O, (100 + 132 * math.cos(math.radians(-20)),
                  70 + 132 * math.sin(math.radians(-20))), '다', over=0, color='#B55B45'),
        D.ang(O, (200, 70), (232, 25), '20°', r=40),
    )
    return D.svg(f, note='직선 가는 직선 나에 대한 수선이에요.')
FIGS['t401b'] = _f401b()

# 4-02 2회차 — 점 ㄱ 을 지나고 직선 가와 평행한 직선 긋기 (조건만)
def _f402():
    f = D.merge(
        D.ray((0, 96), (226, 96), '가', over=18),
        D.dot((104, 38), 'ㄱ', at='above'),
    )
    return D.svg(f, note='점 ㄱ 은 직선 가 밖에 있어요.')
FIGS['t402'] = _f402()

# 4-03 계단2칸 — 평행선 사이에 그은 여러 선분 (직각 표시 없이 = 답을 안 알려 준다)
def _f403a():
    y1, y2 = 20, 118
    f = D.merge(
        D.ray((0, y1), (230, y1), over=14),
        D.ray((0, y2), (230, y2), over=14),
        D.seg((40, y1), (92, y2), color='#B55B45', width=1.6),
        D.seg((120, y1), (120, y2), color='#3B6FA8', width=1.6),
        D.seg((170, y1), (215, y2), color='#3C8B64', width=1.6),
        D.tag(60, y1 - 8, '㉠', D.INK, 12.5), D.tag(120, y1 - 8, '㉡', D.INK, 12.5),
        D.tag(186, y1 - 8, '㉢', D.INK, 12.5),
    )
    return D.svg(f, note='두 직선은 서로 평행해요.')
FIGS['t403a'] = _f403a()

# 4-03 계단3칸 — 사다리꼴에 여러 길이가 적혀 있다
def _f403b():
    u = S
    A, B = (0, 0), (6 * u, 0)                      # 윗변 6 cm
    C, Dd = (9 * u, 4 * u), (0, 4 * u)             # 아랫변 9 cm · 높이 4 cm → 빗변 5 cm
    f = D.merge(
        D.poly([A, B, C, Dd], 'blue'),
        D.dim_h(0, 6 * u, -14, '6 cm', below=False),
        D.dim_h(0, 9 * u, 4 * u + 16, '9 cm'),
        D.tag(-8, 2 * u + 4, '4 cm', D.SOFT, 12, anchor='end'),
        D.tag(7.9 * u, 2 * u - 6, '5 cm', D.SOFT, 12, anchor='start'),
    )
    return D.svg(f, note='위아래 두 변이 서로 평행한 사다리꼴이에요.')
FIGS['t403b'] = _f403b()

# 4-05 1회차 — 한 변 5 cm, 다른 변 3 cm 인 평행사변형
def _f405a():
    A = (0, 78); B = (130, 78); C = (168, 0); Dd = (38, 0)
    f = D.merge(
        D.poly([A, B, C, Dd], 'green'),
        D.dim_h(0, 130, 94, '5 cm'),
        D.tag(160, 42, '3 cm', D.SOFT, 12, anchor='start'),
    )
    return D.svg(f)
FIGS['t405a'] = _f405a()

# 4-05 2회차 오류 찾기 — 한 각이 70°
def _f405b():
    A = (0, 84); B = (146, 84); C = (176, 0); Dd = (30, 0)
    f = D.merge(
        D.poly([A, B, C, Dd], 'amber'),
        D.ang(A, B, Dd, '70°', r=24),
        D.ang(B, C, A, '?', r=24),
    )
    return D.svg(f, note='친구는 ? 자리도 70°라고 했어요.')
FIGS['t405b'] = _f405b()

# 4-05 계단3칸 — 한 각이 55° (앞 두 그림과 기울기·방향 다르게)
def _f405c():
    A = (44, 96); B = (188, 96); C = (144, 0); Dd = (0, 0)
    f = D.merge(
        D.poly([A, B, C, Dd], 'rose'),
        D.ang(Dd, A, C, '55°', r=24),
        D.ang(A, B, Dd, '?', r=22), D.ang(B, C, A, '?', r=22), D.ang(C, Dd, B, '?', r=22),
    )
    return D.svg(f)
FIGS['t405c'] = _f405c()

# 4-06 2회차 — 마름모의 한 각이 60°
def _f406():
    A, B, C, Dd = (0, 62), (76, 0), (152, 62), (76, 124)
    f = D.merge(
        D.poly([A, B, C, Dd], 'blue'),
        D.ticks(A, B, 1), D.ticks(B, C, 1), D.ticks(C, Dd, 1), D.ticks(Dd, A, 1),
        D.ang(B, A, C, '60°', r=24),
        D.ang(A, B, Dd, '?', r=22), D.ang(C, B, Dd, '?', r=22), D.ang(Dd, A, C, '?', r=22),
    )
    return D.svg(f)
FIGS['t406'] = _f406()

# 4-07 계단3칸 — 폭이 다른 직사각형 종이 띠 2장을 비스듬히 겹침
def _f407():
    f = D.merge(
        D.poly([(0, 36), (220, 36), (220, 92), (0, 92)], 'amber'),            # 가로 띠(폭 넓음)
        D.poly([(74, 0), (118, 0), (186, 140), (142, 140)], 'green'),         # 비스듬한 띠(폭 좁음)
        D.tag(24, 70, '가', D.SOFT, 12.5), D.tag(92, 20, '나', D.SOFT, 12.5),
    )
    return D.svg(f, note='폭이 다른 두 종이 띠를 비스듬히 겹쳐 놓았어요.')
FIGS['t407'] = _f407()

# ══════════════════════════════════════ 6. 다각형 ══════════════════════════════════════

# 6-01 2회차 — 곡선이 섞인 도형 / 끊어진 도형 (다각형이 아닌 예)
def _f601():
    # 질문은 '곡선이 섞인 도형'만 묻는다 → 곡선이 든 도형 두 가지만 보여 준다
    a = D.Fig()
    a.add('<path d="M0,0 L96,0 A48,48 0 0 1 0,0 z" fill="#E8F1FC" stroke="#3B6FA8" '
          'stroke-width="1.6"/>', [(0, -4), (96, 50)])
    b = D.Fig()
    b.add('<path d="M0,0 L84,0 L84,66 Q42,104 0,66 z" fill="#FCEAE5" stroke="#B55B45" '
          'stroke-width="1.6"/>', [(0, -4), (84, 92)])
    return D.svg(D.row([
        D.merge(a, D.tag(48, 72, '㈜', D.INK, 12.5)),
        D.merge(b, D.tag(42, 112, '㈝', D.INK, 12.5)),
    ], gap=58))
FIGS['t601'] = _f601()

# 6-02 1회차 — 한 변이 5 cm 인 정육각형 (변이 몇 개인지 세어야 답이 나온다)
def _f602():
    pts = D.regular(6, 62, (0, 0))
    f = D.poly(pts, 'green')
    for i in range(6):
        f = D.merge(f, D.ticks(pts[i], pts[(i + 1) % 6], 1))
    f = D.merge(f, D.tag(pts[0][0] + 34, (pts[0][1] + pts[1][1]) / 2 - 4, '5 cm', D.SOFT, 12, anchor='start'))
    return D.svg(f)
FIGS['t602'] = _f602()

# 6-03 2회차 — 꼭짓점이 ㄱ ㄴ ㄷ ㄹ ㅁ 인 오각형 (대각선은 그리지 않는다 = 답)
def _f603a():
    names = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ']
    pts = D.regular(5, 66)
    f = D.poly(pts, 'blue')
    ats = ['above', 'right', 'below', 'below', 'left']
    for p, n, a in zip(pts, names, ats):
        f = D.merge(f, D.dot(p, n, at=a))
    return D.svg(f)
FIGS['t603a'] = _f603a()

# 6-03 계단3칸 — 오각형 (앞 그림과 다른 모양: 찌그러진 오각형, 이름 없이)
def _f603b():
    pts = [(10, 0), (108, 14), (140, 106), (58, 148), (0, 78)]
    f = D.poly(pts, 'rose')
    for p in pts:
        f = D.merge(f, D.dot(p, None, '#B55B45'))
    return D.svg(f, note='꼭짓점이 5개인 오각형이에요.')
FIGS['t603b'] = _f603b()

# 6-04 2회차 — 사다리꼴 조각 1개 · 정삼각형 조각 1개 (채운 결과는 그리지 않는다 = 답)
def _f604a():
    t = 52
    tri = [(0, t * math.sqrt(3) / 2), (t, t * math.sqrt(3) / 2), (t / 2, 0)]
    trap = [(0, t * math.sqrt(3) / 2), (1.5 * t, t * math.sqrt(3) / 2), (1.25 * t, 0), (0.25 * t, 0)]
    return D.svg(D.row([
        D.poly(trap, 'amber', title='사다리꼴 조각'),
        D.poly(tri, 'green', title='정삼각형 조각'),
    ], gap=56), note='두 조각의 변의 길이는 서로 같아요.')
FIGS['t604a'] = _f604a()

# 6-04 계단2칸 — 정육각형 조각 1개 · 정삼각형 조각 1개
def _f604b():
    t = 46
    tri = [(0, t * math.sqrt(3) / 2), (t, t * math.sqrt(3) / 2), (t / 2, 0)]
    return D.svg(D.row([
        D.poly(D.regular(6, 46), 'blue', title='정육각형 조각'),
        D.poly(tri, 'green', title='정삼각형 조각'),
    ], gap=56), note='두 조각의 변의 길이는 서로 같아요.')
FIGS['t604b'] = _f604b()


# ── 어느 질문에 붙이나 (대단원, 소단원번호, 질문꼬리, 그림이름) ────────────────
# 꼬리가 L1·L2·L3 이면 계단 칸이다 (make_fig.py 규칙)
MAP = [
 ('2', '01', 'L3',         't201'),
 ('2', '02', 't0H2',       't202a'),
 ('2', '02', 'qcondition', 't202b'),
 ('2', '02', 'L3',         't202c'),
 ('2', '03', 'L3',         't203'),
 ('2', '05', 'L3',         't205'),

 ('4', '01', 'L3',         't401b'),
 ('4', '02', 'qa22e4221',  't402'),
 ('4', '03', 'L2',         't403a'),
 ('4', '03', 'L3',         't403b'),
 ('4', '05', 'qa22e4251',  't405a'),
 ('4', '05', 'qerror',     't405b'),
 ('4', '05', 'L3',         't405c'),
 ('4', '06', 'qa22e4261',  't406'),
 ('4', '07', 'L3',         't407'),

 ('6', '01', 't0H2',       't601'),
 ('6', '03', 'qreason',    't603a'),
 ('6', '03', 'L3',         't603b'),
 ('6', '04', 'qa22e4241',  't604a'),
 ('6', '04', 'L2',         't604b'),
]

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for k, v in FIGS.items():
        print('%-8s %5d자' % (k, len(v)))
    print('그림 %d장 · 붙일 곳 %d개' % (len(FIGS), len(MAP)))
