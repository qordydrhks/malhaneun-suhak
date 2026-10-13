# -*- coding: utf-8 -*-
"""초6-2 「3. 공간과 입체」 설계 그림 — 쌓기나무는 draw.py 로 입체, 답은 여기서 계산해 검산한다.
   좌표: (c, r) c = 오른쪽으로, r = 앞쪽으로(클수록 보는 사람 쪽). 높이 표 h = {(c, r): 층수}.
   python -X utf8 figs_e62_3.py  → 레이아웃마다 앞·옆 모양 · 가려진 기둥(check_hidden) 출력
"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
from check_hidden import visible

def blocks(h): return [(c, r, k) for (c, r), n in h.items() for k in range(n)]
def fview(h):   # 앞에서 본 모양: 왼쪽(c 작은 쪽)부터 각 줄의 가장 높은 층
    cs = sorted({c for c, _ in h}); return [max(n for (c2, _), n in h.items() if c2 == c) for c in cs]
def rview(h):   # 오른쪽 옆에서 본 모양: 왼쪽 = 앞쪽(r 큰 쪽)부터
    rs = sorted({r for _, r in h}, reverse=True); return [max(n for (_, r2), n in h.items() if r2 == r) for r in rs]
def lview(h): return list(reversed(rview(h)))

def _num(c, r, n, s):
    x = (c - r) * D.W; y = (c + r) * D.H - (n - 1) * D.Z + D.H
    f = D.Fig()
    f.add('<circle cx="%.1f" cy="%.1f" r="8.5" fill="#fff" stroke="#2A2350" stroke-width="1.1"/>' % (x, y), [(x - 9, y - 9), (x + 9, y + 9)])
    return D.merge(f, D.tag(x, y + 4.5, s, D.INK, 11.5))

def iso(h, nums=None, color='blue', arrows=('front', 'right'), colors=None):
    if colors:   # 기둥마다 색 — (c+r) 순서로 한 기둥씩 겹쳐 그린다
        f = D.Fig()
        for (c, r) in sorted(h, key=lambda p: p[0] + p[1]):
            f = D.merge(f, D.cubes([(c, r, k) for k in range(h[(c, r)])], colors[(c, r)]))
    else:
        f = D.cubes(blocks(h), color)
    for (c, r), s in (nums or {}).items(): f = D.merge(f, _num(c, r, h[(c, r)], s))
    out = f
    for a in arrows: out = D.merge(out, D.view_arrow(f, a, {'front': '앞', 'right': '옆', 'left': '왼쪽 옆'}[a]))
    return out

def top(h, nums=None, title='위에서 본 모양', color='blue', side=True):
    """위에서 본 모양 + 교재처럼 아래에 '앞', 오른쪽에 '옆' 화살표"""
    f = D.topview(list(h), color, title=title, nums=nums)
    cs = [c for c, _ in h]; rs = [r for _, r in h]
    x0, x1 = min(cs) * D.CELL, (max(cs) + 1) * D.CELL; y1 = (max(rs) + 1) * D.CELL; y0 = min(rs) * D.CELL
    f = D.merge(f, D.arrow((x0 + x1) / 2, y1 + 34, (x0 + x1) / 2, y1 + 8), D.tag((x0 + x1) / 2, y1 + 50, '앞', D.SOFT, 12, 600))
    if side:
        f = D.merge(f, D.arrow(x1 + 34, (y0 + y1) / 2, x1 + 8, (y0 + y1) / 2), D.tag(x1 + 48, (y0 + y1) / 2 + 5, '옆', D.SOFT, 12, 600))
    return f
def sidev(hs, title, color='amber'): return D.side(hs, color, title=title)
def layer(h, k, title):
    cells = [p for p, n in h.items() if n >= k]
    allc = list(h)
    f = D.grid(allc, color='blue', title=title, dim=[p for p in allc if p not in cells])
    return f

def S(f, w): return (D.svg(f), w)

# ── 레이아웃 (모두 아래 __main__ 에서 검산) ──
L = {
 '301col': {(0, 1): 3, (1, 1): 1, (2, 1): 1, (1, 0): 2, (2, 0): 2},
 '302a':   {(0, 0): 2, (1, 0): 2, (2, 0): 1, (0, 1): 1, (1, 1): 1, (0, 2): 1},
 '302b':   {(0, 0): 1, (1, 0): 2, (2, 0): 1, (1, 1): 3, (2, 1): 1, (0, 1): 1},
 '302c':   {(0, 0): 3, (1, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 1, (1, 2): 1},
 '302d':   {(0, 0): 3, (1, 0): 2, (2, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 1},
 '302e':   {(1, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 1, (0, 2): 1, (1, 2): 3, (2, 2): 2},   # ㉠(0,1) 2층까지 · ㉡(1,1) 1층만 숨을 수 있음(hidden3d)
 '303a':   {(0, 0): 3, (1, 0): 2, (2, 0): 1, (0, 1): 2, (1, 1): 2, (2, 1): 1},
 '303b':   {(0, 0): 1, (1, 0): 3, (2, 0): 2, (0, 1): 2, (1, 1): 1},
 '303c':   {(0, 0): 1, (1, 0): 1, (2, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 3},
 '303d':   {(0, 0): 2, (0, 1): 1, (1, 1): 2, (2, 0): 1},
 '303e':   {(0, 0): 3, (1, 0): 3, (2, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 1},
 '303f':   {(0, 0): 3, (1, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 2},     # 한 가지 쌓은 예(가장 적을 때)
 '303g':   {(0, 0): 3, (1, 0): 3, (2, 0): 1, (0, 1): 3, (1, 1): 1, (2, 1): 1},
 '304a':   {(0, 0): 3, (1, 0): 2, (2, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 1},
 '304b':   {(0, 0): 2, (1, 0): 3, (2, 0): 1, (0, 1): 1, (1, 1): 2, (0, 2): 3},
 '304c':   {(0, 0): 1, (1, 0): 2, (2, 0): 3, (0, 1): 2, (1, 1): 1},
 '304d':   {(0, 0): 1, (1, 0): 3, (2, 0): 1, (0, 1): 2, (1, 1): 1, (2, 1): 2},
 '304e':   {(0, 0): 3, (1, 0): 1, (0, 1): 1, (1, 1): 2, (0, 2): 2, (1, 2): 1},
 '305a':   {(0, 0): 3, (1, 0): 2, (0, 1): 2, (1, 1): 1, (0, 2): 1},
 '305c':   {(0, 0): 1, (1, 0): 3, (2, 0): 1, (1, 1): 2, (1, 2): 1},
 '305d':   {(0, 0): 1, (1, 0): 2, (2, 0): 1, (0, 1): 3, (1, 1): 1, (2, 1): 2},
 '305e':   {(0, 0): 3, (1, 0): 2, (0, 1): 2, (1, 1): 1, (2, 1): 1},     # 겉넓이: 위 5 · 앞 6 · 옆 5 → 32면, 보이지 않는 면 없음(면 계산 32)
}
# 3회차 ⑦·⑨ — 세 방향 모양만 주는 그림(답은 __main__ 에서 가짓수·최대·최소 계산)
VIEWS = {
 '304f': ([(0, 0), (1, 0), (0, 1), (1, 1), (2, 1)], [2, 3, 1], [3, 2]),            # 5가지
 '306c': ([(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)], [3, 2, 1], [2, 3]),    # 9개 ~ 11개
}
NUM = {
 '303a': {(0, 0): '1', (1, 0): '2', (2, 0): '3', (0, 1): '4', (1, 1): '5', (2, 1): '6'},
 '303b': {(0, 0): '1', (1, 0): '2', (2, 0): '3', (0, 1): '4', (1, 1): '5'},
 '303e': {(0, 0): '1', (1, 0): '2', (2, 0): '3', (0, 1): '4', (1, 1): '5', (0, 2): '6'},
 '303f': {(0, 0): '1', (1, 0): '2', (0, 1): '3', (1, 1): '4', (2, 1): '5'},
 '303g': {(0, 0): '1', (1, 0): '2', (2, 0): '3', (0, 1): '4', (1, 1): '5', (2, 1): '6'},
}

def _map(objs, cams):
    """위에서 내려다본 배치도. objs = [(종류, x, y, 이름)], cams = [(기호, x, y, 방향 dx, dy)]"""
    f = D.poly([(0, 0), (300, 0), (300, 190), (0, 190)], 'green')
    for kind, x, y, name in objs:
        if kind == 'house':
            f = D.merge(f, D.poly([(x - 26, y - 22), (x + 26, y - 22), (x + 26, y + 22), (x - 26, y + 22)], 'rose'), D.seg((x - 26, y), (x + 26, y), color='#B55B45'))
        elif kind == 'tree':
            f = D.merge(f, D.circle((x, y), 22, 'green'), D.circle((x, y), 9, '#7FBF9A'))
        elif kind == 'car':
            f = D.merge(f, D.poly([(x - 20, y - 11), (x + 20, y - 11), (x + 20, y + 11), (x - 20, y + 11)], 'blue'))
        elif kind == 'tower':
            f = D.merge(f, D.poly([(x - 16, y - 16), (x + 16, y - 16), (x + 16, y + 16), (x - 16, y + 16)], 'amber'), D.circle((x, y), 7, '#E5C07B'))
        elif kind == 'bench':
            f = D.merge(f, D.poly([(x - 24, y - 7), (x + 24, y - 7), (x + 24, y + 7), (x - 24, y + 7)], 'amber'))
        elif kind == 'flower':
            f = D.merge(f, D.circle((x, y), 20, 'rose'), D.circle((x, y), 6, '#F0B5A8'))
        f = D.merge(f, D.tag(x, y + 44 if kind != 'bench' else y + 30, name, D.INK, 16))
    for s, x, y, dx, dy in cams:
        f = D.merge(f, D.arrow(x, y, x + dx, y + dy), D.tag(x + (dx * -0.5 if dx else 0), y + (dy * -0.5 if dy else 0) + 7, s, '#B55B45', 20))
    return f

def build():
    F = {}
    h = L['301col']; F['301col'] = S(D.row([iso(h)]), 230)
    F['301map'] = S(_map([('house', 60, 60, '집'), ('car', 150, 128, '자동차'), ('tree', 240, 62, '나무')],
                         [('㉠', 150, 250, 0, -42), ('㉡', 360, 62, -42, 0), ('㉢', 150, -58, 0, 42)]), 300)
    F['301mapB'] = S(_map([('tower', 70, 96, '탑'), ('bench', 228, 96, '벤치'), ('flower', 150, 34, '꽃밭')],
                          [('㉠', 150, 254, 0, -42), ('㉡', -60, 96, 42, 0), ('㉢', 360, 96, -42, 0)]), 300)
    F['301color'] = S(iso({(0, 0): 1, (1, 0): 3, (2, 0): 2}, colors={(0, 0): 'rose', (1, 0): 'amber', (2, 0): 'blue'}), 200)
    for k in ('302a', '302b', '302c'):
        F[k] = S(D.row([iso(L[k], arrows=('front',)), top(L[k])]), 330)
    F['302d'] = S(iso(L['302d'], arrows=('front',)), 200)
    h = L['302e']; F['302e'] = S(D.row([iso(h, arrows=('front',)), top(h, nums={(0, 1): '㉠', (1, 1): '㉡'})]), 330)
    F['303a'] = S(iso(L['303a'], NUM['303a']), 220)
    h = L['303b']; F['303b'] = S(D.row([top(h, nums=NUM['303b'], title='위'), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34), 330)
    h = L['303c']; F['303c'] = S(D.row([iso(h), sidev(lview(h), '가'), sidev(rview(h), '나'), sidev(fview(h), '다')], 34), 440)
    h = L['303d']; wrong = fview(h); wrong[0] = h[(0, 0)] + h[(0, 1)]
    F['303d'] = S(D.row([iso(h), sidev(wrong, '친구가 그린 앞에서 본 모양')]), 330)
    F['303e'] = S(iso(L['303e'], NUM['303e']), 220)
    h = L['303f']; F['303f'] = S(D.row([top(h, nums=NUM['303f'], title='위'), sidev(fview(h), '앞'), sidev(rview(h), '옆')], 34), 330)
    F['303g'] = S(iso(L['303g'], NUM['303g']), 220)
    h = L['304a']; F['304a'] = S(D.row([iso(h, arrows=('front',)), top(h)]), 330)
    for k in ('304b', '304c', '304d', '304e'):
        h = L[k]; F[k] = S(D.row([top(h, nums={p: str(n) for p, n in h.items()}, title='위'), D.tag(0, 0, ' ')]), 150)
    h = L['305a']; F['305a'] = S(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30), 330)
    F['305b'] = S(D.row([D.grid([(0, 0), (1, 0), (0, 1), (1, 1)], color='blue', title='1층', dim=[(1, 1)]),
                         D.grid([(0, 0), (1, 0), (0, 1), (1, 1)], color='blue', title='2층', dim=[(1, 0), (0, 1)])], 30), 230)
    h = L['305c']; F['305c'] = S(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30), 360)
    h = L['305d']; F['305d'] = S(D.row([layer(h, 1, '1층'), layer(h, 2, '2층'), layer(h, 3, '3층')], 30), 360)
    a = D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0), (0, 1, 0)], 'amber', title='가')
    b = D.cubes([(0, 0, 0), (0, 0, 1), (0, 0, 2), (1, 0, 0)], 'amber', title='나')
    F['306a'] = S(D.row([a, b], 50), 260)
    base = D.cubes([(0, 0, 0), (1, 0, 0), (0, 1, 0)], 'amber', title='처음 모양')
    o1 = D.cubes([(0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1)], 'green', title='가')
    o2 = D.cubes([(0, 0, 0), (1, 0, 0), (2, 0, 0), (3, 0, 0)], 'green', title='나')
    o3 = D.cubes([(0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 2, 0)], 'green', title='다')
    F['306b'] = S(D.row([base, o1, o2, o3], 40), 440)
    for k, (cells, fv, rv) in VIEWS.items():
        F[k] = S(D.row([top({p: 1 for p in cells}, title='위'), sidev(fv, '앞'), sidev(rv, '옆')], 34), 330)
    F['305e'] = S(iso(L['305e']), 220)
    return F

if __name__ == '__main__':
    from hidden3d import colpix, maxhidden
    for k in ('302b', '302e'):
        h = L[k]; hid = [p for p in h if colpix(h, p) == 0]
        print(k, '숨은 자리', [(p, maxhidden(dict(h, **{}) if False else {q: (1 if q == p else n) for q, n in h.items()}, p)) for p in hid])
    import itertools
    for k, (cells, fv, rv) in VIEWS.items():
        sols = [dict(zip(cells, hs)) for hs in itertools.product(range(1, 4), repeat=len(cells))]
        sols = [h for h in sols if fview(h) == fv and rview(h) == rv]; ns = [sum(h.values()) for h in sols]
        print(k, '가짓수', len(sols), '가장 적을 때', min(ns), '가장 많을 때', max(ns))
    for k, h in L.items():
        vis = visible(h); bad = [(p, n, v) for p, n, v in vis if v < 25]
        print(k, '개수', sum(h.values()), '앞', fview(h), '옆', rview(h), '가려짐' if bad else '', bad)
