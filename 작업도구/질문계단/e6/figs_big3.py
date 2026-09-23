# -*- coding: utf-8 -*-
"""초6-2 「3. 공간과 입체」 그림 — 학생 질문 화면에 뜨는 SVG (2026-09-23, 2차)

1차에 마스터가 지적한 것
  ① "그림이 좀 허접해 보인다" → 단색 네모 격자뿐이었다. 이번엔 **쌓기나무를 실제 입체로** 그린다.
  ② "너무 같은 그림으로 재탕하는 느낌" → 질문마다 **배치와 수를 다르게**. 같은 그림을 두 번 쓰지 않는다.
  ③ "6학년 문제로 보기 힘들다" → 그림을 보고 **세거나 추론해야** 답이 나오게 만든다.

방향 약속 (그림끼리 어긋나면 아이가 헷갈린다 — 꼭 지킬 것)
  · 입체 cubes: c = 오른쪽, **r = 앞쪽**, h = 위 (화면에서 c·r 이 커질수록 아래 = 보는 사람 쪽)
  · 위에서 본 모양 topview(): (c, r) 그대로 → 화면 아래가 앞쪽 (입체와 방향이 같다)
  · 앞·옆에서 본 모양 side([층수, …]): **아래 줄이 1층**
"""
import os, sys, importlib.util
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)

def stack(spec):
    """{(c,r): 층수} → 정육면체 목록"""
    return [(c, r, k) for (c, r), n in spec.items() for k in range(n)]

FIGS = {}

# ── 3-01 어느 방향에서 보았는지 ─────────────────────────────────────────
# 상자 세 개를 서로 다른 자리에 놓은 입체 배치. 색이 곧 이름이라 글자 라벨은 넣지 않는다(겹침 방지).
def _place3():
    back  = D.cubes(stack({(0, 0): 2}), 'blue')     # 왼쪽 뒤, 2층
    right = D.cubes(stack({(2, 0): 1}), 'green')    # 오른쪽 뒤
    front = D.cubes(stack({(0, 2): 1}), 'rose')     # 왼쪽 앞
    f = D.merge(back, right, front)
    x0, y0, w, h = f.bbox(0)
    a1 = D.arrow(x0 + w * 0.30, y0 + h + 46, x0 + w * 0.30, y0 + h + 10, '앞에서 보는 쪽')
    a2 = D.arrow(x0 + w + 74, y0 + h * 0.52, x0 + w + 16, y0 + h * 0.52, '오른쪽 옆에서')
    return D.svg(D.merge(f, a1, a2),
                 note='빨강·초록 상자는 1층, 파랑 상자만 2층 높이예요.')

FIGS['b3_place'] = _place3()

def _place_wrong():
    back  = D.cubes(stack({(2, 0): 2}), 'green')    # 오른쪽 뒤, 2층
    mid   = D.cubes(stack({(1, 1): 1}), 'blue')     # 가운데
    front = D.cubes(stack({(0, 2): 1}), 'rose')     # 왼쪽 앞
    f = D.merge(back, mid, front)
    x0, y0, w, h = f.bbox(0)
    ar = D.arrow(x0 + w * 0.42, y0 + h + 46, x0 + w * 0.42, y0 + h + 10, '앞에서 보는 쪽')
    return D.svg(D.merge(f, ar), note='빨강 상자가 가장 앞줄에 있어요.')

FIGS['b3_wrong'] = _place_wrong()

# ── 3-02 위에서 본 모양 · 숨겨진 쌓기나무 ───────────────────────────────
S02 = {(0, 0): 1, (1, 0): 2, (2, 0): 1, (0, 1): 3, (1, 1): 1}      # 합 8, 자리 5
FIGS['b3_hidden'] = D.svg(D.row([
    D.cubes(stack(S02), 'blue', title='쌓은 모양'),
    D.topview(S02, 'amber', title='위에서 본 모양'),
], gap=58), note='쌓기나무는 모두 8개를 썼어요.')

S02b = {(0, 0): 2, (1, 0): 1, (1, 1): 2, (2, 1): 1}                # 합 6, 자리 4
FIGS['b3_hidden2'] = D.svg(D.row([
    D.cubes(stack(S02b), 'green', title='쌓은 모양'),
    D.topview(S02b, 'amber', title='위에서 본 모양'),
], gap=58))

# ── 3-03 위·앞·옆 — 가장 적을 때·가장 많을 때 ──────────────────────────
# 위 2×2 · 앞 두 줄 모두 2층 · 옆 두 줄 모두 2층 → 가장 적을 때 6개, 가장 많을 때 8개
FIGS['b3_minmax'] = D.svg(D.row([
    D.topview([(0, 0), (1, 0), (0, 1), (1, 1)], 'blue', title='위에서 본 모양'),
    D.side([2, 2], 'amber', title='앞에서 본 모양'),
    D.side([2, 2], 'green', title='옆에서 본 모양'),
], gap=46), note='위에서 본 네 자리에는 쌓기나무가 적어도 1개씩 있어요.')

# 개수가 한 가지로 정해지는 경우 (비교용) — 위 ㄱ자 4자리 · 앞 [2,1,1] · 옆 [2,1]
FIGS['b3_three_fix'] = D.svg(D.row([
    D.topview([(0, 0), (1, 0), (2, 0), (0, 1)], 'blue', title='위에서 본 모양'),
    D.side([2, 1, 1], 'amber', title='앞에서 본 모양'),
    D.side([2, 1], 'green', title='옆에서 본 모양'),
], gap=46))

# ── 3-04 위에서 본 모양에 수 쓰기 ──────────────────────────────────────
N04 = {(0, 0): 3, (1, 0): 1, (2, 0): 2, (0, 1): 1}                 # 합 7
FIGS['b3_nums'] = D.svg(D.topview(N04, 'blue', title='위에서 본 모양에 쓴 수', nums=N04),
                        note='각 자리의 수는 그 자리에 쌓은 쌓기나무의 개수예요.')

N04b = {(0, 0): 1, (1, 0): 3, (2, 0): 2, (1, 1): 2, (2, 1): 1}     # 합 9
FIGS['b3_nums2'] = D.svg(D.topview(N04b, 'green', title='위에서 본 모양에 쓴 수', nums=N04b))

# ── 3-05 층별로 나타낸 모양 ───────────────────────────────────────────
FIGS['b3_layers'] = D.svg(D.row([
    D.topview([(0, 0), (1, 0), (2, 0), (0, 1)], 'blue',  title='1층'),
    D.topview([(0, 0), (2, 0)],                 'amber', title='2층'),
    D.topview([(0, 0)],                         'green', title='3층'),
], gap=48), note='각 층을 위에서 내려다본 모양이에요.')

L05 = {(0, 0): 2, (1, 0): 1, (0, 1): 1, (1, 1): 3}                 # 합 7
FIGS['b3_layers2'] = D.svg(D.row([
    D.cubes(stack(L05), 'rose', title='쌓은 모양'),
    D.topview(L05, 'blue', title='1층'),
], gap=58))

# ── 3-06 여러 가지 모양 ───────────────────────────────────────────────
FIGS['b3_shape4'] = D.svg(D.row([
    D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0), (2, 0, 1)], 'blue',  title='㉠'),
    D.cubes([(0, 0, 0), (1, 0, 0), (1, 1, 0), (1, 0, 1)], 'green', title='㉡'),
], gap=62), note='쌓기나무 4개로 만든 두 모양이에요.')

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for k, v in FIGS.items():
        print('%-14s %5d자' % (k, len(v)))
    print('그림 %d장' % len(FIGS))

# ── 🪜 계단(3회차) 칸에 붙는 그림 ─────────────────────────────────────
# 계단도 질문 번호(ladder:<소단원키>:<칸>)로 같은 표에서 그림을 찾는다 (v89.0).
# 질문용 그림과 배치·수를 모두 다르게 한다.

# 03칸2 — 개수가 한 가지로 안 정해지는 예 (가장 적을 때 8개 · 가장 많을 때 10개)
FIGS['b3l_minmax'] = D.svg(D.row([
    D.topview([(0,0),(1,0),(2,0),(0,1),(1,1),(2,1)], 'blue', title='위에서 본 모양'),
    D.side([2, 2, 1], 'amber', title='앞에서 본 모양'),
    D.side([2, 2],    'green', title='옆에서 본 모양'),
], gap=44), note='왼쪽·가운데 줄은 2층으로, 오른쪽 줄은 1층으로 보여요.')

# 04칸2 — 수를 쓴 것을 보고 앞에서 본 모양 알아내기
_N = {(0,0): 2, (1,0): 1, (2,0): 3, (1,1): 2}
FIGS['b3l_nums'] = D.svg(D.topview(_N, 'rose', title='위에서 본 모양에 쓴 수', nums=_N))

# 05칸2 — 2층은 1층의 어느 자리 위에만 있을 수 있나
FIGS['b3l_layers'] = D.svg(D.row([
    D.topview([(0,0),(1,0),(0,1)], 'blue',  title='1층'),
    D.topview([(0,0)],             'amber', title='2층'),
], gap=52))

# 02칸1 — 위에서 본 모양만으로는 개수를 알 수 없는 예
_H = {(0,0): 1, (1,0): 2, (1,1): 1}
FIGS['b3l_hidden'] = D.svg(D.row([
    D.cubes(stack(_H), 'green', title='쌓은 모양'),
    D.topview(_H, 'amber', title='위에서 본 모양'),
], gap=58))

# 06칸2 — 3개짜리 두 조각으로 만든 모양
FIGS['b3l_two'] = D.svg(D.row([
    D.cubes([(0,0,0),(1,0,0),(0,0,1)], 'blue',  title='조각 ㉮'),
    D.cubes([(0,0,0),(0,1,0),(0,1,1)], 'green', title='조각 ㉯'),
], gap=62), note='쌓기나무 3개씩으로 만든 두 조각이에요.')
