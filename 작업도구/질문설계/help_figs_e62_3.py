# -*- coding: utf-8 -*-
"""초6-2 3단원(공간과 입체) '긴 설명' 그림(LFIG) · '다시 묻기' 새 그림(AFIG) (2026-10-14).
   쌓기나무는 figs_e62_3 의 도구(draw.py 입체 · 위·앞·옆 모양)로 그리고, 답은 __main__ 에서 계산해 검산한다.
   좌표 (c, r): c = 오른쪽으로, r = 앞쪽으로. 질문 그림과 같은 모양은 쓰지 않는다(재탕 금지).
   그림만 보기: python -X utf8 help_figs_e62_3.py → 그림_긴설명_초6-2_3단원.html (+ 검산 출력)
"""
import figs_e62_3 as G
from figs_e62_3 import D, iso, top, sidev, layer, fview, rview, lview, _map

F = {}
def fig(fn): F[fn.__name__] = fn; return fn
def V(f, note=None): return D.svg(f, note=note) if note else D.svg(f)

# ── 레이아웃(모두 __main__ 에서 숨은 기둥·앞·옆·개수 검산) ──
H = {
 # 02
 'a02_0': {(0, 0): 3, (1, 0): 2, (0, 1): 2, (1, 1): 1, (0, 2): 1},                       # 숨은 것 없음 · 9개
 'l02_0': {(0, 0): 2, (1, 0): 1, (0, 1): 2, (1, 1): 1, (1, 2): 1},                       # 숨은 것 없음 · 7개
 'a02_1': {(0, 0): 1, (1, 0): 1, (2, 0): 3, (0, 1): 1, (1, 1): 1, (2, 1): 3},            # (1,0) 숨음 · 1~2층 → 10개 또는 11개
 'l02_1': {(0, 0): 1, (1, 0): 1, (2, 0): 1, (0, 1): 1, (1, 1): 3, (2, 1): 1},            # (0,0) 숨음 · 1~2층 → 8개 또는 9개
 'a02_2': {(0, 0): 3, (1, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 1},                       # 위 5칸 · 8개
 'l02_2': {(0, 0): 2, (1, 0): 3, (2, 0): 1, (1, 1): 1},                                  # 위 4칸 · 7개
 'l02_3a': {(0, 0): 1, (1, 0): 1, (2, 0): 1, (0, 1): 1, (1, 1): 1},
 'l02_3b': {(0, 0): 2, (1, 0): 1, (2, 0): 1, (0, 1): 2, (1, 1): 1},
 # 03
 'a03_0': {(0, 0): 2, (1, 0): 3, (2, 0): 1, (0, 1): 2, (1, 1): 1, (2, 1): 2},            # 앞에서 1번·3번 안 보임
 'l03_0': {(0, 0): 2, (1, 0): 3, (0, 1): 2, (1, 1): 1},                                  # 앞에서 1번 안 보임
 'a03_1': {(0, 0): 2, (1, 0): 1, (2, 0): 3, (0, 1): 1, (1, 1): 2},                       # 3번 칸: 앞 오른쪽 줄 3층 하나뿐
 'l03_1': {(0, 0): 1, (1, 0): 2, (0, 1): 3, (1, 1): 1},
 'a03_2': {(0, 0): 3, (1, 0): 1, (0, 1): 1, (1, 1): 2, (2, 1): 1},
 'l03_2': {(0, 0): 2, (1, 0): 1, (2, 0): 1, (0, 1): 3, (1, 1): 1},
 'a03_3': {(0, 0): 1, (1, 0): 2, (1, 1): 1, (2, 1): 2},
 'l03_3': {(0, 0): 2, (1, 0): 1, (0, 1): 2, (1, 1): 2},
 'a03_4': {(0, 0): 1, (1, 0): 3, (2, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 2},            # 6번 맨 위를 빼면 옆만 바뀜
 'l03_4': {(0, 0): 3, (1, 0): 1, (0, 1): 2, (1, 1): 2, (0, 2): 1},
 # 04
 'a04_0': {(0, 0): 2, (1, 0): 3, (2, 0): 1, (0, 1): 1, (1, 1): 2, (2, 1): 1},            # 10개
 'l04_0': {(0, 0): 3, (1, 0): 1, (0, 1): 2, (0, 2): 1},                                  # 3 + 1 + 2 + 1 = 7
 'a04_1': {(0, 0): 1, (1, 0): 2, (2, 0): 3, (0, 1): 2, (1, 1): 1, (1, 2): 2},
 'l04_1': {(0, 0): 2, (1, 0): 1, (2, 0): 3, (0, 1): 1, (1, 1): 2},
 'l04_2a': {(0, 0): 2, (1, 0): 1, (0, 1): 1, (1, 1): 2},
 'l04_2b': {(0, 0): 2, (1, 0): 2, (0, 1): 2, (1, 1): 2},
 'a04_3': {(0, 0): 2, (1, 0): 1, (2, 0): 2, (0, 1): 1, (1, 1): 3},
 'l04_3': {(0, 0): 1, (1, 0): 1, (0, 1): 3, (1, 1): 2},
 # 05
 'a05_0': {(0, 0): 3, (1, 0): 1, (2, 0): 2, (0, 1): 2, (1, 1): 1, (2, 1): 1},            # 6 + 3 + 1 = 10
 'l05_0': {(0, 0): 3, (1, 0): 1, (0, 1): 2, (1, 1): 1, (2, 1): 1},                       # 5 + 2 + 1 = 8
 'l05_1': {(0, 0): 2, (1, 0): 1, (2, 0): 1, (0, 1): 3, (1, 1): 1},
 'a05_3': {(0, 0): 2, (1, 0): 1, (0, 1): 3, (1, 1): 1, (2, 1): 2, (1, 2): 1},
 'l05_3': {(0, 0): 3, (1, 0): 3, (0, 1): 1, (1, 1): 2, (0, 2): 1},
}

def T3(h, nums=None, title='위'): return top(h, nums=nums, title=title)
def ISO(h, nums=None): return iso(h, nums)
def NUMS(h): return {p: str(n) for p, n in h.items()}
def BYN(h):
    """번호 1, 2, 3 … (뒷줄 왼쪽부터 → 앞줄)"""
    ps = sorted(h, key=lambda p: (p[1], p[0])); return {p: str(k + 1) for k, p in enumerate(ps)}

# ───────── 01 어느 방향에서 보았는지 ─────────
@fig
def a01_0(): return V(_map([('tree', 60, 62, '나무'), ('house', 150, 128, '집'), ('car', 240, 60, '자동차')], [('㉠', 150, 250, 0, -42)]))
@fig
def a01_1(): return V(_map([('tower', 60, 96, '탑'), ('flower', 150, 50, '꽃밭'), ('bench', 240, 120, '벤치')], [('㉠', 150, 250, 0, -42), ('㉢', 150, -58, 0, 42)]))
@fig
def a01_2(): return V(_map([('tree', 80, 100, '나무'), ('car', 220, 100, '자동차'), ('house', 150, 36, '집')], [('㉠', 150, 254, 0, -42), ('㉡', -60, 100, 42, 0), ('㉢', 360, 100, -42, 0)]))

def STRIP(x, y, names, cam, color='#B55B45'):
    f = D.tag(x - 30, y + 5, cam, color, 16)
    for k, n in enumerate(names):
        f = D.merge(f, D.poly([(x + k * 70, y - 14), (x + k * 70 + 62, y - 14), (x + k * 70 + 62, y + 14), (x + k * 70, y + 14)], 'blue'), D.tag(x + k * 70 + 31, y + 5, n, D.INK, 12.5))
    return f

@fig
def l01_0():
    m = _map([('flower', 60, 70, '꽃밭'), ('bench', 150, 130, '벤치'), ('tower', 240, 60, '탑')], [('㉠', 150, 250, 0, -42)])
    return V(D.row([m, STRIP(40, 0, ['꽃밭', '벤치', '탑'], '㉠ 사진')], 60))
@fig
def l01_1():
    m = _map([('house', 60, 60, '집'), ('tree', 150, 128, '나무'), ('flower', 240, 64, '꽃밭')], [('㉠', 150, 250, 0, -42), ('㉢', 150, -58, 0, 42)])
    s = D.merge(STRIP(40, -30, ['집', '나무', '꽃밭'], '㉠'), STRIP(40, 30, ['꽃밭', '나무', '집'], '㉢'))
    return V(D.row([m, s], 60), note='마주 보는 방향에서는 왼쪽과 오른쪽이 반대로 보여요')
@fig
def l01_2():
    m = _map([('house', 70, 96, '집'), ('flower', 220, 96, '꽃밭'), ('tree', 150, 30, '나무')], [('㉡', -60, 96, 42, 0)])
    m = D.merge(m, D.seg((-18, 96), (300, 96), style='dashed', color='#B55B45'))
    return V(m, note='㉡에서 보면 집이 같은 줄의 꽃밭보다 가까워요 → 가까운 높은 집이 뒤의 꽃밭을 가려요')
@fig
def l01_3():
    ball = D.merge(D.circle((70, 80), 16, 'rose'), D.tag(70, 120, '공', D.INK, 13))
    boxx = D.merge(D.poly([(130, 64), (170, 64), (170, 96), (130, 96)], 'amber'), D.tag(150, 120, '상자', D.INK, 13))
    f = D.merge(ball, boxx, D.arrow(110, 190, 110, 150), D.tag(110, 206, '앞', D.SOFT, 13), D.arrow(110, -30, 110, 10), D.tag(110, -38, '뒤', D.SOFT, 13))
    s = D.merge(STRIP(40, -20, ['공', '상자'], '앞'), STRIP(40, 40, ['상자', '공'], '뒤'))
    return V(D.row([f, s], 70))

# ───────── 02 쌓기나무의 개수(1) ─────────
@fig
def a02_0(): h = H['a02_0']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양')]))
@fig
def a02_1(): h = H['a02_1']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양')]))
@fig
def a02_2(): h = H['a02_2']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양')]))
@fig
def l02_0(): h = H['l02_0']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양')]), note='보이는 위의 면 5개 = 위에서 본 모양 5칸 → 숨겨진 쌓기나무 없음 → 7개')
@fig
def l02_1():
    h = H['l02_1']; nums = {(0, 0): '㉠'}
    return V(D.row([iso(h, arrows=('front',)), T3(h, nums=nums, title='위에서 본 모양')]), note='㉠ 자리는 보이지 않아요 → 1개이면 8개, 2개이면 9개')
@fig
def l02_2():
    h = H['l02_2']; return V(D.row([iso(h, arrows=('front',)), T3(h, nums=NUMS(h), title='위에서 본 모양')]), note='위에서 본 모양은 4칸 · 자리마다 쌓인 수를 더하면 2 + 3 + 1 + 1 = 7개')
@fig
def l02_3():
    a, b = H['l02_3a'], H['l02_3b']
    return V(D.row([iso(a, arrows=()), iso(b, arrows=()), T3(a, title='둘 다 위에서 본 모양')], 40), note='모두 1층이면 5칸 = 5개 · 2층을 쌓은 자리가 있으면 7개')

# ───────── 03 쌓기나무의 개수(2) ─────────
@fig
def a03_0(): h = H['a03_0']; return V(iso(h, BYN(h)))
@fig
def a03_1(): h = H['a03_1']; return V(D.row([top(h, nums=BYN(h), title='위'), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34))
@fig
def a03_2(): h = H['a03_2']; return V(D.row([iso(h), sidev(fview(h), '가'), sidev(lview(h), '나'), sidev(rview(h), '다')], 34))
@fig
def a03_3():
    h = H['a03_3']; wrong = fview(h); wrong[1] = h[(1, 0)] + h[(1, 1)]
    return V(D.row([iso(h), sidev(wrong, '친구가 그린 앞에서 본 모양')]))
@fig
def a03_4(): h = H['a03_4']; return V(iso(h, BYN(h)))
@fig
def l03_0():
    h = H['l03_0']; return V(D.row([iso(h, BYN(h)), sidev(fview(h), '앞에서 본 모양')]), note='1번(2층)은 바로 앞 3번(2층)과 높이가 같아 가려져요 · 2번(3층)은 맨 위가 보여요')
@fig
def l03_1():
    h = H['l03_1']; return V(D.row([top(h, nums=BYN(h), title='위'), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34), note='앞의 왼쪽 줄 3층 → 그 줄의 1번은 옆에서 뒷줄이 2층이라 2층까지 → 3번이 3층')
@fig
def l03_2():
    h = H['l03_2']
    return V(D.row([iso(h, arrows=('front', 'right', 'left')), sidev(fview(h), '앞'), sidev(rview(h), '오른쪽 옆'), sidev(lview(h), '왼쪽 옆')], 30), note='오른쪽 옆에서는 앞줄이 왼쪽 · 왼쪽 옆에서는 앞줄이 오른쪽')
@fig
def l03_3():
    h = H['l03_3']; wrong = [h[(0, 0)] + h[(0, 1)], h[(1, 0)] + h[(1, 1)]]
    return V(D.row([iso(h), sidev(fview(h), '✓ 앞에서 본 모양'), sidev(wrong, '✗ 앞뒤를 더함')], 34), note='앞에서 본 모양은 각 줄에서 가장 높은 층만')
@fig
def l03_4():
    h = H['l03_4']; return V(D.row([iso(h, BYN(h)), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34), note='1번 맨 위를 빼면 앞의 왼쪽 줄 3층과 옆의 뒷줄 3층이 함께 낮아져요')

# ───────── 04 위에서 본 모양에 수 쓰기 ─────────
@fig
def a04_0(): h = H['a04_0']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양')]))
@fig
def a04_1(): h = H['a04_1']; return V(top(h, nums=NUMS(h), title='위'))
@fig
def a04_3(): h = H['a04_3']; return V(top(h, nums=NUMS(h), title='위'))
@fig
def l04_0(): h = H['l04_0']; return V(D.row([iso(h, arrows=('front',)), top(h, nums=NUMS(h), title='위')]), note='자리마다 쌓인 개수를 써요 → 3 + 1 + 2 + 1 = 7개')
@fig
def l04_1(): h = H['l04_1']; return V(D.row([top(h, nums=NUMS(h), title='위'), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34), note='앞: 세로줄마다 가장 큰 수 · 옆: 가로줄마다 가장 큰 수(앞줄이 왼쪽)')
@fig
def l04_2():
    a, b = H['l04_2a'], H['l04_2b']
    return V(D.row([top(a, nums=NUMS(a), title='가'), top(b, nums=NUMS(b), title='나'), sidev(fview(a), '가·나 앞'), sidev(rview(a), '가·나 옆')], 30), note='위·앞·옆 모양이 같아도 6개와 8개 — 수를 쓰면 하나로 정해져요')
@fig
def l04_3(): h = H['l04_3']; return V(D.row([top(h, nums=NUMS(h), title='위'), sidev(rview(h), '✓ 옆'), sidev(lview(h), '✗ 줄을 거꾸로')], 34), note='오른쪽 옆에서 보면 앞줄(아래 줄)이 왼쪽에 보여요')

# ───────── 05 층별로 나타낸 모양 ─────────
@fig
def a05_0(): h = H['a05_0']; return V(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30))
@fig
def a05_2():
    cells = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1)]
    return V(D.row([D.grid(cells, color='blue', title='1층', dim=[(2, 0)]), D.grid(cells, color='blue', title='2층', dim=[(0, 0), (1, 0), (0, 1)])], 30))
@fig
def a05_3(): h = H['a05_3']; return V(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30))
@fig
def l05_0():
    h = H['l05_0']; return V(D.row([iso(h, arrows=('front',)), layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30), note='5 + 2 + 1 = 8개')
@fig
def l05_1():
    h = H['l05_1']; return V(D.row([iso(h, arrows=('front',)), T3(h, title='위에서 본 모양'), layer(h, 1, '1층')], 34), note='위에서 본 모양과 1층 모양은 같아요')
@fig
def l05_2():
    cells = [(0, 0), (1, 0), (0, 1), (1, 1)]
    ok = D.row([D.grid(cells, color='blue', title='1층', dim=[(1, 1)]), D.grid(cells, color='blue', title='2층 ✓', dim=[(1, 0), (0, 1), (1, 1)])], 24)
    no = D.grid(cells, color='rose', title='2층 ✗', dim=[(0, 0), (1, 0), (0, 1)])
    return V(D.row([ok, no], 40), note='2층 쌓기나무는 1층 쌓기나무가 있는 칸 위에만 놓을 수 있어요')
@fig
def l05_3():
    h = H['l05_3']; return V(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층'), top(h, nums=NUMS(h), title='위')], 30), note='3층 자리에 3, 2층까지인 자리에 2, 나머지에 1')

# ───────── 06 여러 가지 모양 ─────────
LINE3 = [(0, 0, 0), (1, 0, 0), (2, 0, 0)]; BENT3 = [(0, 0, 0), (1, 0, 0), (0, 1, 0)]
@fig
def a06_1():
    a = D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0), (1, 1, 0)], 'amber', title='가')
    b = D.cubes([(0, 0, 0), (0, 0, 1), (0, 0, 2), (1, 0, 1)], 'amber', title='나')
    return V(D.row([a, b], 50))
@fig
def a06_3():
    base = D.cubes(LINE3, 'amber', title='처음 모양')
    o1 = D.cubes(LINE3 + [(1, 0, 1)], 'green', title='가')
    o2 = D.cubes([(0, 0, 0), (1, 0, 0), (0, 1, 0), (1, 1, 0)], 'green', title='나')
    o3 = D.cubes(LINE3 + [(3, 0, 0)], 'green', title='다')
    return V(D.row([base, o1, o2, o3], 40))
@fig
def l06_0(): return V(D.row([D.cubes(LINE3, 'amber', title='한 줄'), D.cubes(BENT3, 'amber', title='꺾인 모양')], 50), note='쌓기나무 3개로 만들 수 있는 서로 다른 모양은 2가지')
@fig
def l06_1():
    a = D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0), (2, 1, 0)], 'amber', title='눕힌 모양')
    b = D.cubes([(0, 0, 0), (0, 0, 1), (0, 0, 2), (1, 0, 0)], 'amber', title='돌려 세운 모양')
    return V(D.row([a, b], 50), note='돌려서 겹쳐지면 같은 모양이에요')
@fig
def l06_2():
    b1 = D.cubes(LINE3 + [(3, 0, 0)], 'amber', title='한 줄 + 1')
    b2 = D.cubes(LINE3 + [(1, 0, 1)], 'amber', title='한 줄 + 1')
    b3 = D.cubes(BENT3 + [(0, 0, 1)], 'amber', title='꺾인 + 1')
    b4 = D.cubes(BENT3 + [(1, 1, 0)], 'amber', title='꺾인 + 1')
    return V(D.row([b1, b2, b3, b4], 34), note='3개 모양에 1개씩 여러 자리에 붙여 보고, 같은 모양은 하나로 세요')
@fig
def l06_3():
    base = D.cubes(BENT3, 'amber', title='처음 모양')
    o1 = D.cubes(BENT3 + [(1, 1, 0)], 'green', title='✓ 빈 곳에 붙임')
    o2 = D.cubes(LINE3 + [(3, 0, 0)], 'rose', title='✗ 꺾인 곳이 없음')
    return V(D.row([base, o1, o2], 46), note='붙이기만 하면 처음 모양은 그대로 남아 있어야 해요')
@fig
def l06_4():
    b = D.merge(
        D.poly([(0, 0), (150, 0), (150, 48), (0, 48)], 'blue'), D.tag(75, 20, '① 숨은 쌓기나무?', D.INK, 12), D.tag(75, 38, '위의 면 ↔ 위 모양', D.SOFT, 11),
        D.arrow(156, 24, 180, 24),
        D.poly([(186, 0), (336, 0), (336, 48), (186, 48)], 'blue'), D.tag(261, 20, '② 위 = 바닥(1층)', D.INK, 12), D.tag(261, 38, '앞·옆 = 줄마다 가장 높은 층', D.SOFT, 11),
        D.arrow(342, 24, 366, 24),
        D.poly([(372, 0), (522, 0), (522, 48), (372, 48)], 'amber'), D.tag(447, 20, '③ 오른쪽 옆에서는', D.INK, 12), D.tag(447, 38, '앞줄이 왼쪽', D.SOFT, 11))
    return V(b)

LFIG = {
    '3-01': ['l01_0', 'l01_1', 'l01_2', 'l01_3'],
    '3-02': ['l02_0', 'l02_1', 'l02_2', 'l02_3'],
    '3-03': ['l03_0', 'l03_1', 'l03_2', 'l03_3', 'l03_4'],
    '3-04': ['l04_0', 'l04_1', 'l04_2', 'l04_3'],
    '3-05': ['l05_0', 'l05_1', 'l05_2', 'l05_3'],
    '3-06': ['l06_0', 'l06_1', 'l06_2', 'l06_3', 'l06_4'],
}
AFIG = {('3-01', 0): F['a01_0'], ('3-01', 1): F['a01_1'], ('3-01', 2): F['a01_2'],
        ('3-02', 0): F['a02_0'], ('3-02', 1): F['a02_1'], ('3-02', 2): F['a02_2'],
        ('3-03', 0): F['a03_0'], ('3-03', 1): F['a03_1'], ('3-03', 2): F['a03_2'], ('3-03', 3): F['a03_3'], ('3-03', 4): F['a03_4'],
        ('3-04', 0): F['a04_0'], ('3-04', 1): F['a04_1'], ('3-04', 3): F['a04_3'],
        ('3-05', 0): F['a05_0'], ('3-05', 2): F['a05_2'], ('3-05', 3): F['a05_3'],
        ('3-06', 1): F['a06_1'], ('3-06', 3): F['a06_3']}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    from check_hidden import visible
    from hidden3d import colpix, maxhidden
    for k, h in H.items():
        bad = [(p, n, v) for p, n, v in visible(h) if v < 25]
        hid = [p for p in h if colpix(h, p) == 0]
        print(k, '개수', sum(h.values()), '위', len(h), '앞', fview(h), '옆', rview(h), '번호', {v: h[p] for p, v in BYN(h).items()},
              '가려짐' if bad else '', bad, ('숨은 자리 최대 %s' % [(p, maxhidden({q: (1 if q == p else n) for q, n in h.items()}, p)) for p in hid]) if hid else '')
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for (tag, i), fn in AFIG.items(): o.append('<div style="border:1px dashed #99c;margin:8px 0;padding:6px"><b>다시 묻기 %s · %d · %s</b><br>%s</div>' % (tag, i + 1, fn.__name__, fn()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초6-2_3단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()), len(AFIG))
