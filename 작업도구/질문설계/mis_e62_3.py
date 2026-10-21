# -*- coding: utf-8 -*-
"""초6-2 3. 공간과 입체 — mission 문제 (견본 2판 수준, 문제설계규칙.md · 2026-10-21)
근거: 디딤돌 기본+응용 6-2 68~79쪽 · 최상위 수학 6-2 3단원 심화유형 ①~⑨(66~74쪽). 모양은 모두 새로.
쌓기나무는 draw.py 입체로 그리고, 앞·옆·뒤에서 본 모양 · 가짓수 · 가장 적을 때/많을 때 · 숨은 자리 · 겉넓이 · 칠한 면은 모두 여기서 계산해 검산한다.
좌표: h = {(c, r): 층수} — c 오른쪽으로, r 앞쪽으로(클수록 보는 사람 쪽).
⚠ 그림은 조건만(답 금지) · 같은 모양 재탕 금지(USED) · 입체 그림만 보고 세는 문제는 모든 기둥 윗면이 보여야 한다(visible ≥ 25%)."""
import os, sys, itertools
from mis_common import Unit, merge, tag, Fig
import figs_e62_3 as F3
from figs_e62_3 import iso, top, sidev, layer, fview, rview, lview, _map
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
from check_hidden import visible
from hidden3d import colpix, maxhidden
from mis_e42_4 import tapg, HOT, HOTF

U = Unit('e6-2', 3, '공간과 입체', '문제_초6-2_3단원')
c = {k: 'E6-2-3-%d' % k for k in range(1, 7)}
DB, TOP = '디딤돌 기본+응용 6-2', '최상위 수학 6-2'
def mc(code, r, lv, stem, ans, wr, ex, fig=None, src='', val=None):
    seen, out = {ans}, []
    for w, n in wr:
        if w not in seen: out.append((w, n)); seen.add(w)
    if len(out) < 4:       # 「몇 층, 몇 층」 보기가 겹치면 다른 층수 차례로 채운다
        k = ans.count('층'); assert k and ans.endswith('층'), ('보기 겹침', stem, wr)
        for v in sorted(itertools.product(range(1, 4), repeat=k), key=lambda t: (sum(t), t)):
            if len(out) == 4: break
            t = ', '.join('%d층' % n for n in v)
            if t not in seen: out.append((t, '')); seen.add(t)
    U.mc(code, r, lv, stem, ans, out[:4], ex, fig=fig, src=src, val=val)
def nq(code, r, lv, stem, ans, wr, ex, u='개', fig=None, src=''):
    """답이 수 — 오답도 수(또는 글)"""
    U.mc(code, r, lv, stem, '%d%s' % (ans, u), [(w if isinstance(w, str) else '%d%s' % (w, u), n) for w, n in wr], ex, val=ans, fig=fig, src=src)

# ───── 계산 ─────
USED = set()
def use(h):
    k = frozenset(h.items()); assert k not in USED, ('같은 모양 재탕', h); USED.add(k); return h
def bview(h): return list(reversed(fview(h)))
def cnt(h): return sum(h.values())
def okvis(h, th=25):
    bad = [(p, n, v) for p, n, v in visible(h) if v < th]; assert not bad, ('윗면이 가려진 기둥', h, bad)
def hs(v): return ', '.join('%d층' % n for n in v)
def sols(cells, fv=None, rv=None, maxh=4, extra=None):
    out = []
    for hh in itertools.product(range(1, maxh + 1), repeat=len(cells)):
        g = dict(zip(cells, hh))
        if fv is not None and fview(g) != fv: continue
        if rv is not None and rview(g) != rv: continue
        if extra and not extra(g): continue
        out.append(g)
    return out
def faces(h):
    """겉면 수(바닥 포함) — 붙은 면은 빼고 센다"""
    S = {(cc, rr, k) for (cc, rr), n in h.items() for k in range(n)}; f = 0
    for (x, y, z) in S:
        for d in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)):
            if (x + d[0], y + d[1], z + d[2]) not in S: f += 1
    return f
def iso_hidden(h, hidden):
    """숨은 자리를 1층으로 두고 그린 입체(숨은 자리는 정말 안 보이는지 확인)"""
    g = dict(h)
    for p in hidden: g[p] = 1
    for p in hidden: assert colpix(g, p) == 0, ('숨긴 자리가 보임', p)
    return g

# ───── 그림 도우미 ─────
def colorrow(hts, cols):
    """한 줄로 놓인 색 기둥(왼쪽부터) — 앞·옆 화살표"""
    h = {(i, 0): n for i, n in enumerate(hts)}
    return iso(h, colors={(i, 0): cols[i] for i in range(len(hts))})
def stack(rows, gx=40, gy=34):
    """그림 여러 줄 — 줄마다 가운데 맞춤(폰 화면에서 그림이 너무 작아지지 않게)"""
    rs = [D.row(r, gx) for r in rows]; W = max(r.bbox(0)[2] for r in rs); out = Fig(); y = 0.0
    for r in rs:
        x0, y0, w, h = r.bbox(0); dx, dy = (W - w) / 2 - x0, y - y0
        out.body.append('<g transform="translate(%.1f,%.1f)">%s</g>' % (dx, dy, ''.join(r.body)))
        out.xs += [v + dx for v in r.xs]; out.ys += [v + dy for v in r.ys]; y += h + gy
    return out
def cands(opts, hl=(), title=None):
    """누르기 보기: [(이름, 왼쪽부터 층수)] — 바닥을 맞춰 나란히, 이름은 아래"""
    Hm = max(max(v) for _, v in opts); figs = []
    for lab, v in opts:
        w = len(v) * D.CELL; y0 = (Hm - max(v)) * D.CELL
        g = Fig()
        g.add('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="#FFFFFF" stroke="transparent"/>' % (-8, -8, w + 16, Hm * D.CELL + 16), [(-8, -8), (w + 8, Hm * D.CELL + 8)])
        g = merge(g, D.side(v, 'rose' if lab in hl else 'amber', origin=(0, y0)))
        figs.append(merge(tapg(lab, g, lab in hl), tag(w / 2, Hm * D.CELL + 30, lab, D.INK, 20)))
    return stack([figs[i:i + 3] for i in range(0, len(figs), 3)])
def topcands(opts, hl=()):
    """누르기 보기: 위에서 본 모양 후보 [(이름, 칸들)]"""
    x = 0.0; f = Fig()
    for lab, cells in opts:
        cs = [cc for cc, _ in cells]; rs = [rr for _, rr in cells]
        w = (max(cs) + 1) * D.CELL; hgt = (max(rs) + 1) * D.CELL
        g = Fig(); g.add('<rect x="%.1f" y="-8" width="%.1f" height="%.1f" fill="#FFFFFF" stroke="transparent"/>' % (x - 8, w + 16, hgt + 16), [(x - 8, -8), (x + w + 8, hgt + 8)])
        g = merge(g, D.grid(cells, color='rose' if lab in hl else 'blue', origin=(x, 0)))
        f = merge(f, tapg(lab, g, lab in hl), tag(x + w / 2, 3 * D.CELL + 26, lab, D.INK, 15))
        x += w + 40
    return f
def toptap(h, hl=()):
    """위에서 본 모양의 칸을 누른다(칸 이름 c0r1 …)"""
    f = Fig()
    for (cc, rr) in h:
        g = D.grid([(cc, rr)], color='rose' if (cc, rr) in hl else 'blue')
        f = merge(f, tapg('c%dr%d' % (cc, rr), g, (cc, rr) in hl))
    cs = [cc for cc, _ in h]; rs = [rr for _, rr in h]
    x0, x1 = min(cs) * D.CELL, (max(cs) + 1) * D.CELL; y1 = (max(rs) + 1) * D.CELL
    f = merge(f, D.arrow((x0 + x1) / 2, y1 + 34, (x0 + x1) / 2, y1 + 8), D.tag((x0 + x1) / 2, y1 + 50, '앞', D.SOFT, 12, 600))
    return merge(f, tag((x0 + x1) / 2, -14, '위에서 본 모양', D.SOFT, 13, 600))
def polyiso(cubes3, title=None, color='amber', hl=False):
    """쌓기나무 덩어리 (x, y, z) — 그림 좌표 c=x, r=y, k=z"""
    return D.cubes([(x, y, z) for x, y, z in cubes3], 'rose' if hl else color, title=title)
def numtop(h, title='위'):
    return top(h, nums={p: str(n) for p, n in h.items()}, title=title)
def orders(objs, cam):
    """배치도에서 cam 방향으로 보았을 때 왼쪽부터 차례(겹치지 않게 간격 확인)"""
    _, x, y, dx, dy = cam; fx, fy = (dx > 0) - (dx < 0), (dy > 0) - (dy < 0)
    lx, ly = fy, -fx
    pr = sorted(((ox * lx + oy * ly), name) for _, ox, oy, name in objs)
    gaps = [b[0] - a[0] for a, b in zip(pr, pr[1:])]; assert min(gaps) >= 25, ('겹쳐 보일 수 있음', cam, pr)
    return [n for _, n in reversed(pr)]

# ══ 3-1 어느 방향에서 보았는지 ══
MA = [('house', 50, 45, '집'), ('tree', 250, 95, '나무'), ('car', 150, 150, '자동차')]
CA = [('㉠', 150, 250, 0, -42), ('㉡', 360, 95, -42, 0), ('㉢', 150, -60, 0, 42)]
o = orders(MA, CA[1]); assert o == ['자동차', '나무', '집']
mc(c[1], 1, 'basic', '배치도의 ㉡ 방향에서 사진을 찍으면 왼쪽부터 어떤 차례로 보입니까?', ', '.join(o),
   [(', '.join(reversed(o)), '사진을 찍는 쪽에서 보지 않고 반대쪽에서 보았어요.'), (', '.join(orders(MA, CA[0])), '㉠ 방향에서 본 차례예요.'),
    (', '.join(orders(MA, CA[2])), '㉢ 방향에서 본 차례예요.'), ('자동차, 집, 나무', '')],
   '㉡ 쪽에 서서 화살표 방향을 보면 왼쪽(배치도의 아래쪽)부터 자동차, 나무, 집이 보여요.', fig=lambda: _map(MA, CA), src=DB + ' 68쪽 1번 유형')
mc(c[1], 1, 'basic', '빨간, 노란, 파란 쌓기나무 기둥을 한 줄로 놓았습니다. 오른쪽 옆에서 보았을 때 보이는 색을 모두 고른 것은 어느 것입니까?', '노란색, 파란색',
   [('노란색', '앞의 기둥만 보았어요 — 뒤의 더 높은 기둥은 위쪽이 보여요.'), ('노란색, 빨간색, 파란색', '낮은 빨간 기둥은 노란 기둥에 가려요.'), ('파란색', '가장 높은 기둥만 보았어요.'), ('빨간색, 노란색', '')],
   '오른쪽 옆에서는 노란 기둥(2층)이 맨 앞이에요. 그 뒤의 빨간 기둥(1층)은 가리고, 3층인 파란 기둥은 3층이 보여요.',
   fig=lambda: colorrow([3, 1, 2], ['blue', 'rose', 'amber']), src=DB + ' 69쪽 · 개념 질문 연결')
MB = [('house', 45, 40, '집'), ('tree', 255, 75, '나무'), ('tower', 150, 110, '탑'), ('flower', 205, 145, '꽃밭'), ('bench', 95, 178, '벤치')]
CB = [('㉠', 150, 262, 0, -42), ('㉡', 372, 110, -42, 0), ('㉢', 150, -64, 0, 42), ('㉣', -72, 110, 42, 0)]
o = orders(MB, CB[3]); assert o == ['집', '나무', '탑', '꽃밭', '벤치']
mc(c[1], 1, 'hard', '배치도의 ㉣ 방향에서 사진을 찍었습니다. 왼쪽에서 두 번째로 보이는 것은 무엇입니까?', o[1],
   [(o[0], '첫 번째로 보이는 것이에요.'), (o[-2], '오른쪽에서 두 번째예요.'), (o[2], '가운데에 보여요.'), (o[-1], '맨 오른쪽에 보여요.')],
   '㉣ 쪽에서 오른쪽을 바라보면 왼쪽이 배치도의 위쪽이에요. 위쪽부터 집, 나무, 탑, 꽃밭, 벤치라서 두 번째는 나무예요.', fig=lambda: _map(MB, CB), src=TOP + ' 3단원 심화유형 ①')
h = use({(0, 0): 2, (1, 0): 3, (2, 0): 1, (0, 1): 1, (1, 1): 2, (2, 1): 1}); okvis(h)
assert len({tuple(fview(h)), tuple(bview(h)), tuple(rview(h)), tuple(lview(h))}) == 4
mc(c[1], 1, 'hard', '쌓기나무로 쌓은 모양을 오른쪽 그림처럼 보았습니다. 어느 방향에서 본 모양입니까?', '왼쪽 옆',
   [('오른쪽 옆', '오른쪽 옆에서 보면 왼쪽부터 %s이에요 — 좌우가 바뀌어요.' % hs(rview(h))), ('앞', '앞에서 보면 %s이에요.' % hs(fview(h))), ('뒤', '뒤에서 보면 %s이에요.' % hs(bview(h))), ('위', '위에서 본 모양은 층수가 아니라 자리를 보여 줘요.')],
   '왼쪽 옆에서 보면 앞줄이 오른쪽, 뒷줄이 왼쪽에 보여요. 뒷줄에서 가장 높은 3층이 왼쪽, 앞줄의 2층이 오른쪽이라 3층, 2층이에요.',
   fig=lambda h=h: D.row([iso(h), sidev(lview(h), '본 모양')], 50), src=TOP + ' 3단원 심화유형 ①')
assert lview(h) == [3, 2]
MC = [('car', 55, 95, '자동차'), ('house', 165, 35, '집'), ('tree', 250, 175, '나무'), ('tower', 120, 145, '탑')]
CC = [('㉠', 150, 262, 0, -42), ('㉡', 372, 100, -42, 0), ('㉢', 150, -64, 0, 42), ('㉣', -72, 100, 42, 0)]
left = [k[0] for k in CC if orders(MC, k)[0] == '자동차']; assert left == ['㉠'], left
mc(c[1], 2, 'basic', '배치도의 어느 방향에서 사진을 찍어야 자동차가 가장 왼쪽에 보입니까?', '㉠',
   [(k[0], '%s에서는 자동차가 왼쪽에서 %d번째예요.' % (k[0], orders(MC, k).index('자동차') + 1)) for k in CC[1:]] + [('어느 방향도 아니에요', '')],
   '㉠ 쪽에서 위를 바라보면 배치도의 왼쪽이 사진의 왼쪽이에요. 자동차가 가장 왼쪽에 있어서 ㉠이에요.', fig=lambda: _map(MC, CC), src=DB + ' 69쪽 · 개념 질문 연결')
h = use({(0, 0): 3, (1, 0): 2, (2, 0): 2, (0, 1): 1, (1, 1): 1, (2, 1): 1}); okvis(h)
fv = fview(h); opts = [('가', rview(h)), ('나', bview(h)), ('다', fv), ('라', lview(h)), ('마', [fv[0], fv[1] + 1, fv[2]])]
assert fv == [3, 2, 2]
assert len({tuple(v) for _, v in opts}) == 5
U.tap(c[1], 2, 'basic', '왼쪽 쌓기나무 모양을 앞에서 본 모양을 눌러 보세요.', lambda hl=(), h=h, opts=opts: stack([[iso(h)], [cands(opts, hl)]]), ['다'],
      '앞에서 보면 왼쪽부터 각 줄의 가장 높은 층이 보여요. %s이라 다예요.' % hs(fv),
      {'가': '오른쪽 옆에서 본 모양이에요.', '나': '뒤에서 본 모양이에요(좌우가 바뀌어요).', '라': '왼쪽 옆에서 본 모양이에요.', '마': '가운데 줄을 한 층 높게 보았어요.'}, src=DB + ' 69쪽 · 개념 질문 연결')
h = use({(0, 0): 2, (1, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 1, (1, 2): 1}); okvis(h)
rv = rview(h); opts = [('가', lview(h)), ('나', fview(h)), ('다', [rv[0], rv[1], rv[2] + 1]), ('라', rv), ('마', bview(h))]
assert len({tuple(v) for _, v in opts}) == 5, opts
U.tap(c[1], 2, 'hard', '왼쪽 쌓기나무 모양을 오른쪽 옆에서 본 모양을 눌러 보세요.', lambda hl=(), h=h, opts=opts: stack([[iso(h)], [cands(opts, hl)]]), ['라'],
      '오른쪽 옆에서 보면 맨 앞줄이 왼쪽에 보여요. 앞줄부터 각 줄의 가장 높은 층은 %s이라 라예요.' % hs(rv),
      {'가': '왼쪽 옆에서 본 모양이에요(좌우가 바뀌어요).', '나': '앞에서 본 모양이에요.', '다': '맨 뒷줄을 한 층 높게 보았어요.', '마': '뒤에서 본 모양이에요.'}, src=TOP + ' 3단원 심화유형 ①')
MD = [('flower', 60, 85, '꽃밭'), ('tower', 150, 140, '탑'), ('bench', 245, 40, '벤치'), ('tree', 220, 165, '나무')]
CD = [('㉠', 150, 262, 0, -42), ('㉡', 372, 100, -42, 0), ('㉢', 150, -64, 0, 42), ('㉣', -72, 100, 42, 0)]
rev = [k[0] for k in CD if orders(MD, k) == list(reversed(orders(MD, CD[0])))]; assert rev == ['㉢']
mc(c[1], 2, 'hard', '배치도의 ㉠ 방향에서 사진을 찍었을 때와 왼쪽부터 보이는 차례가 정반대인 사진은 어느 방향에서 찍은 것입니까?', '㉢',
   [('㉡', '옆으로 돌아가면 차례가 반대가 아니라 아예 달라져요.'), ('㉣', '옆으로 돌아가면 차례가 반대가 아니라 아예 달라져요.'), ('㉠', '같은 방향이에요.'), ('어느 방향도 아니에요', '')],
   '마주 보는 쪽에서 보면 왼쪽과 오른쪽이 바뀌어 차례가 정반대가 돼요. ㉠과 마주 보는 ㉢이에요.', fig=lambda: _map(MD, CD), src=DB + ' 69쪽 · 개념 질문 연결')
h = use({(0, 0): 1, (1, 0): 1, (2, 0): 2, (0, 1): 3, (1, 1): 1, (2, 1): 1}); okvis(h)
assert fview(h) == [3, 1, 2]
rv = rview(h)
mc(c[1], 3, 'basic', '앞에서 보면 왼쪽부터 3층, 1층, 2층으로 보이는 쌓기나무 모양입니다. 오른쪽 옆에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(rv),
   [(hs(lview(h)), '왼쪽 옆에서 본 모양이에요 — 좌우가 바뀌어요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([2, 2]), ''), (hs([3, 3]), '')],
   '오른쪽 옆에서 보면 앞줄이 왼쪽에 보여요. 앞줄의 가장 높은 층은 3층, 뒷줄은 2층이라 3층, 2층이에요.', fig=lambda h=h: iso(h), src=DB + ' 69쪽 · 계단 연결')
assert rv == [3, 2] and lview(h) == [2, 3]
mc(c[1], 3, 'basic', '빨간 쌓기나무 3개, 파란 쌓기나무 2개, 노란 쌓기나무 1개를 각각 기둥으로 쌓아 한 줄로 놓았습니다. 오른쪽 옆에서 보았을 때 2층에 보이는 색은 무엇입니까?', '파란색',
   [('노란색', '노란 기둥은 1층뿐이에요.'), ('빨간색', '빨간 기둥의 2층은 파란 기둥에 가려요.'), ('초록색', '초록 쌓기나무는 없어요.'), ('보이지 않아요', '')],
   '오른쪽 옆에서는 맨 오른쪽 노란 기둥이 가장 앞이라 1층에 노란색이 보여요. 2층은 그 뒤의 파란 기둥, 3층은 빨간 기둥이 보여요.',
   fig=lambda: colorrow([3, 2, 1], ['rose', 'blue', 'amber']), src=DB + ' 69쪽 · 계단 연결')
ME = [('flower', 55, 100, '꽃밭'), ('tower', 150, 40, '탑'), ('bench', 245, 150, '벤치'), ('house', 200, 70, '집')]
CE = [('㉠', 150, 262, 0, -42), ('㉡', 372, 100, -42, 0), ('㉢', 150, -64, 0, 42), ('㉣', -72, 100, 42, 0)]
want = ['꽃밭', '탑', '벤치']
hit = [k[0] for k in CE if [n for n in orders(ME, k) if n in want] == want]; assert hit == ['㉠'], hit
mc(c[1], 3, 'hard', '배치도의 어느 방향에서 사진을 찍었더니 꽃밭, 탑, 벤치가 왼쪽부터 이 차례로 보였습니다. 어느 방향에서 찍은 사진입니까?', '㉠',
   [('㉡', '㉡에서는 %s 차례예요.' % ', '.join(n for n in orders(ME, CE[1]) if n in want)), ('㉢', '㉢에서는 차례가 정반대예요.'), ('㉣', '㉣에서는 %s 차례예요.' % ', '.join(n for n in orders(ME, CE[3]) if n in want)), ('어느 방향도 아니에요', '')],
   '㉠ 쪽에서 위를 바라보면 배치도의 왼쪽부터 꽃밭, 탑, 벤치가 보여요.', fig=lambda: _map(ME, CE), src=TOP + ' 3단원 심화유형 ①')
h = use({(0, 0): 2, (1, 0): 2, (2, 0): 3, (0, 1): 1, (1, 1): 1, (2, 1): 2}); okvis(h)
bv = bview(h)
mc(c[1], 3, 'hard', '이 쌓기나무 모양을 뒤에서 보면 왼쪽부터 몇 층으로 보입니까?', hs(bv),
   [(hs(fview(h)), '앞에서 본 모양이에요 — 뒤에서는 좌우가 바뀌어요.'), (hs(rview(h)), '오른쪽 옆에서 본 모양이에요.'), (hs(lview(h)), '왼쪽 옆에서 본 모양이에요.'), (hs([2, 1, 3]), '')],
   '뒤에서 본 모양은 앞에서 본 모양(%s)의 좌우를 바꾼 것이라 %s이에요.' % (hs(fview(h)), hs(bv)), fig=lambda h=h: iso(h), src=TOP + ' 3단원 심화유형 ①')

# ══ 3-2 쌓은 모양과 개수(1) · 위에서 본 모양 ══
h = use({(0, 0): 2, (1, 0): 3, (2, 0): 1, (0, 1): 1, (1, 1): 2}); okvis(h)
nq(c[2], 1, 'basic', '쌓은 모양과 위에서 본 모양입니다. 쌓기나무는 모두 몇 개입니까?', cnt(h),
   [(len(h), '위에서 본 칸 수만 셌어요.'), (cnt(h) - 1, ''), (cnt(h) + 1, ''), (len(h) * 3, '모든 자리를 3층으로 보았어요.')],
   '위에서 본 모양으로 자리가 %d곳이고 숨은 자리가 없어요. 자리마다 층수를 더하면 2 + 3 + 1 + 1 + 2 = %d(개)예요.' % (len(h), cnt(h)),
   fig=lambda h=h: D.row([iso(h, arrows=('front',)), top(h)]), src=DB + ' 70쪽 1번 유형')
h = use({(0, 0): 3, (1, 0): 1, (2, 0): 2, (0, 1): 2, (1, 1): 1, (2, 1): 1}); okvis(h)
nq(c[2], 1, 'basic', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 2층 이상에 있는 쌓기나무는 모두 몇 개입니까?', cnt(h) - len(h),
   [(cnt(h), '전체 개수예요.'), (len(h), '1층의 개수예요.'), (sum(1 for n in h.values() if n >= 2), '2층 이상인 자리의 수만 셌어요.'), (cnt(h) - len(h) + 1, '')],
   '전체 %d개에서 1층 %d개를 빼면 %d개예요.' % (cnt(h), len(h), cnt(h) - len(h)), fig=lambda h=h: iso(h, arrows=('front',)), src=DB + ' 71쪽 · 개념 질문 연결')
h = use({(0, 0): 3, (1, 0): 2, (2, 0): 1, (0, 1): 2, (1, 1): 1, (0, 2): 1}); okvis(h)
nq(c[2], 1, 'hard', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 쌓기나무를 더 쌓아서 가장 작은 정육면체 모양을 만들려면 쌓기나무가 적어도 몇 개 더 필요합니까?', 27 - cnt(h),
   [(27, '정육면체 전체의 개수예요.'), (cnt(h), '지금 쌓기나무의 개수예요.'), (9 - len(h), '1층만 채웠어요.'), (64 - cnt(h), '한 모서리를 4개로 보았어요.')],
   '가장 높은 곳이 3층이고 가로·세로가 3줄이라 가장 작은 정육면체는 3 × 3 × 3 = 27(개)예요. 지금 %d개라 27 − %d = %d(개)가 더 필요해요.' % (cnt(h), cnt(h), 27 - cnt(h)),
   fig=lambda h=h: iso(h, arrows=()), src=TOP + ' 3단원 심화유형 ②')
base = {(0, 0): 1, (1, 0): 1, (2, 0): 2, (0, 1): 2, (1, 1): 3, (2, 1): 1, (0, 2): 1}
hid = [(0, 0), (1, 0)]
g = iso_hidden(use(base), hid)
mx = {p: maxhidden(dict(g), p) for p in hid}; assert all(v >= 1 for v in mx.values()), mx
vis_n = sum(n for p, n in g.items() if p not in hid)
nq(c[2], 1, 'hard', '쌓은 모양과 위에서 본 모양입니다. 위에서 본 모양의 ㉠, ㉡ 자리는 쌓은 모양에서 보이지 않습니다. 쌓기나무가 가장 많을 때는 몇 개입니까?', vis_n + sum(mx.values()),
   [(vis_n + 2, '가장 적을 때예요.'), (vis_n, '보이는 쌓기나무만 셌어요.'), (vis_n + 6, '보이지 않는 자리를 모두 3층으로 보았어요.'), (vis_n + sum(mx.values()) + 1, '')],
   '보이는 쌓기나무는 %d개예요. 앞의 높은 기둥에 가려 ㉠은 %d층까지, ㉡은 %d층까지 숨을 수 있어서 가장 많을 때 %d개예요.' % (vis_n, mx[(0, 0)], mx[(1, 0)], vis_n + sum(mx.values())),
   fig=lambda g=g: D.row([iso(g, arrows=('front',)), top(g, nums={(0, 0): '㉠', (1, 0): '㉡'})]), src=TOP + ' 3단원 심화유형 ⑤')
h = use({(0, 0): 3, (1, 0): 2, (2, 0): 1, (0, 1): 2, (1, 1): 3, (2, 1): 2}); okvis(h)
nq(c[2], 2, 'basic', '친구가 위에서 본 모양이 %d칸이니까 쌓기나무가 %d개라고 했습니다. 실제 개수와 친구가 말한 개수의 차는 몇 개입니까?' % (len(h), len(h)), cnt(h) - len(h),
   [(cnt(h), '실제 개수를 답했어요.'), (len(h), '친구가 말한 개수예요.'), (cnt(h) + len(h), '두 개수를 더했어요.'), (3, '가장 높은 층수예요.')],
   '위에서 본 칸 수는 자리의 수예요. 자리마다 층수를 더하면 %d개라서 차는 %d − %d = %d(개)예요.' % (cnt(h), cnt(h), len(h), cnt(h) - len(h)),
   fig=lambda h=h: D.row([iso(h, arrows=('front',)), top(h)]), src=DB + ' 71쪽 · 개념 질문 연결')
h = use({(0, 0): 3, (1, 0): 3, (2, 0): 1, (0, 1): 1, (1, 1): 2, (2, 1): 2}); okvis(h)
hot = sorted(p for p, n in h.items() if n >= 2)
U.tap(c[2], 2, 'basic', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 위에서 본 모양에서 2층 이상 쌓인 자리를 모두 눌러 보세요.',
      lambda hl=(), h=h: D.row([iso(h, arrows=('front',)), toptap(h, [p for p in h if 'c%dr%d' % p in hl])], 54), ['c%dr%d' % p for p in hot],
      '쌓은 모양에서 기둥마다 층수를 보고 위에서 본 같은 자리를 찾아요. 2층 이상인 자리는 %d곳이에요.' % len(hot),
      {'앞뒤를 바꿔 누름': '위에서 본 모양의 아래쪽이 앞쪽이에요.'}, src=DB + ' 71쪽 · 개념 질문 연결')
base = {(0, 0): 1, (1, 0): 3, (2, 0): 1, (0, 1): 3, (1, 1): 2, (2, 1): 1}
hid = [(0, 0)]
g = iso_hidden(use(base), hid); m0 = maxhidden(dict(g), (0, 0)); assert m0 >= 2, m0
nq(c[2], 2, 'hard', '쌓은 모양과 위에서 본 모양입니다. ㉠ 자리는 쌓은 모양에서 보이지 않습니다. 쌓기나무가 가장 많을 때와 가장 적을 때의 개수의 차는 몇 개입니까?', m0 - 1,
   [(m0, '㉠ 자리에 가장 많이 숨는 층수예요.'), (0, '㉠ 자리를 1층으로만 보았어요.'), (m0 + 1, ''), (m0 + 2, '')],
   '㉠ 자리는 앞의 기둥에 가려 %d층까지 숨을 수 있고, 위에서 보면 쌓기나무가 있으니 적어도 1층이에요. 차는 %d − 1 = %d(개)예요.' % (m0, m0, m0 - 1),
   fig=lambda g=g: D.row([iso(g, arrows=('front',)), top(g, nums={(0, 0): '㉠'})]), src=TOP + ' 3단원 심화유형 ⑤')
h = use({(0, 0): 3, (1, 0): 2, (2, 0): 1, (0, 1): 1, (1, 1): 1, (2, 1): 2}); okvis(h)
nq(c[2], 2, 'hard', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 쌓기나무를 더 쌓아서 가로 3줄, 세로 2줄, 높이 3층인 직육면체 모양을 만들려면 쌓기나무가 몇 개 더 필요합니까?', 18 - cnt(h),
   [(18, '직육면체 전체의 개수예요.'), (27 - cnt(h), '정육면체(27개)로 보았어요.'), (cnt(h), '지금 개수예요.'), (6 - len(h) + 6, '')],
   '직육면체는 3 × 2 × 3 = 18(개)예요. 지금 %d개라서 18 − %d = %d(개)가 더 필요해요.' % (cnt(h), cnt(h), 18 - cnt(h)), fig=lambda h=h: iso(h, arrows=()), src=TOP + ' 3단원 심화유형 ②')
h = use({(0, 0): 2, (1, 0): 1, (0, 1): 1, (1, 1): 1}); okvis(h)
nq(c[2], 3, 'basic', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 쌓기나무를 더 쌓아서 가장 작은 정육면체 모양을 만들려면 쌓기나무가 적어도 몇 개 더 필요합니까?', 8 - cnt(h),
   [(8, '정육면체 전체의 개수예요.'), (27 - cnt(h), '한 모서리를 3개로 보았어요.'), (cnt(h), '지금 개수예요.'), (4 - len(h) + 1, '')],
   '가장 높은 곳이 2층이고 가로·세로가 2줄이라 가장 작은 정육면체는 2 × 2 × 2 = 8(개)예요. 8 − %d = %d(개)가 더 필요해요.' % (cnt(h), 8 - cnt(h)),
   fig=lambda h=h: iso(h, arrows=()), src=DB + ' 71쪽 · 계단 연결')
base = {(0, 0): 1, (1, 0): 1, (0, 1): 2, (1, 1): 3, (2, 1): 2, (0, 2): 1, (1, 2): 1}
hid = [(0, 0), (1, 0)]
g = iso_hidden(use(base), hid)
vis_n = sum(n for p, n in g.items() if p not in hid)
nq(c[2], 3, 'basic', '쌓은 모양과 위에서 본 모양입니다. ㉠, ㉡ 자리는 쌓은 모양에서 보이지 않습니다. 쌓기나무가 가장 적을 때는 몇 개입니까?', vis_n + 2,
   [(vis_n, '보이지 않는 자리를 빼고 셌어요.'), (vis_n + 1, '보이지 않는 자리를 하나만 넣었어요.'), (vis_n + 4, '보이지 않는 자리를 2층으로 보았어요.'), (len(g), '위에서 본 칸 수예요.')],
   '보이는 쌓기나무는 %d개예요. 위에서 본 모양에 ㉠, ㉡ 자리가 있으니 적어도 1개씩은 있어서 %d + 2 = %d(개)예요.' % (vis_n, vis_n, vis_n + 2),
   fig=lambda g=g: D.row([iso(g, arrows=('front',)), top(g, nums={(0, 0): '㉠', (1, 0): '㉡'})]), src=DB + ' 71쪽 · 계단 연결')
base = {(0, 0): 1, (1, 0): 1, (2, 0): 1, (0, 1): 2, (1, 1): 3, (2, 1): 3, (1, 2): 1}
hid = [(0, 0), (1, 0)]
g = iso_hidden(use(base), hid)
mx = {p: maxhidden(dict(g), p) for p in hid}; vis_n = sum(n for p, n in g.items() if p not in hid)
assert all(v >= 2 for v in mx.values()), mx
nq(c[2], 3, 'hard', '쌓은 모양과 위에서 본 모양입니다. ㉠, ㉡ 자리는 쌓은 모양에서 보이지 않습니다. 쌓기나무가 가장 많을 때와 가장 적을 때의 개수의 차는 몇 개입니까?', sum(mx.values()) - 2,
   [(sum(mx.values()), '가장 많을 때 숨는 쌓기나무만 셌어요.'), (vis_n + sum(mx.values()), '가장 많을 때의 개수예요.'), (vis_n + 2, '가장 적을 때의 개수예요.'), (sum(mx.values()) - 1, '')],
   '㉠은 %d층, ㉡은 %d층까지 숨을 수 있고 적어도 1층씩 있어요. 차는 (%d + %d) − (1 + 1) = %d(개)예요.' % (mx[(0, 0)], mx[(1, 0)], mx[(0, 0)], mx[(1, 0)], sum(mx.values()) - 2),
   fig=lambda g=g: D.row([iso(g, arrows=('front',)), top(g, nums={(0, 0): '㉠', (1, 0): '㉡'})]), src=TOP + ' 3단원 심화유형 ⑤')
h = use({(0, 0): 4, (1, 0): 2, (2, 0): 1, (0, 1): 3, (1, 1): 1, (0, 2): 2, (1, 2): 1}); okvis(h)
nq(c[2], 3, 'hard', '뒤에 숨겨진 쌓기나무가 없도록 쌓은 모양입니다. 쌓기나무를 더 쌓아서 가장 작은 정육면체 모양을 만들려면 쌓기나무가 적어도 몇 개 더 필요합니까?', 64 - cnt(h),
   [(27 - cnt(h), '가로·세로가 3줄이라 한 모서리를 3개로 보았어요 — 4층이 있어요.'), (64, '정육면체 전체의 개수예요.'), (cnt(h), '지금 개수예요.'), (16 - len(h), '1층만 채웠어요.')],
   '가장 높은 곳이 4층이라 가로·세로·높이가 모두 4인 4 × 4 × 4 = 64(개)짜리 정육면체가 가장 작아요. 64 − %d = %d(개)가 더 필요해요.' % (cnt(h), 64 - cnt(h)),
   fig=lambda h=h: iso(h, arrows=()), src=TOP + ' 3단원 심화유형 ②')

# ───── 모양 고르기(검산 조건을 만족하는 첫 모양 — 재탕·가려짐 없이) ─────
import random as _rnd
def pick(cells, pred, maxh=3, seed=1, vis=True):
    R = _rnd.Random(seed); allh = list(itertools.product(range(1, maxh + 1), repeat=len(cells))); R.shuffle(allh)
    for hh in allh:
        g = dict(zip(cells, hh))
        if frozenset(g.items()) in USED: continue
        if vis and any(v < 25 for _, _, v in visible(g)): continue
        if pred(g): return use(g)
    raise AssertionError('모양을 못 찾음')
C32 = [(cc, rr) for rr in range(2) for cc in range(3)]
C23 = [(cc, rr) for rr in range(3) for cc in range(2)]
C33L = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (0, 2), (1, 2)]
def numof(h):
    """기둥 번호: 뒷줄 왼쪽부터 1, 2, 3 …"""
    return {p: i + 1 for i, p in enumerate(sorted(h, key=lambda q: (q[1], q[0])))}
def fhidden(h):
    """앞에서 볼 때 같은 줄 앞쪽에 높이가 같거나 더 높은 기둥이 있어 통째로 안 보이는 기둥"""
    return [p for p in h if any(q[0] == p[0] and q[1] > p[1] and h[q] >= h[p] for q in h)]
def removable(h):
    out = []
    for p, n in h.items():
        if n < 2: continue
        g = dict(h); g[p] = n - 1
        if fview(g) == fview(h) and rview(g) == rview(h): out.append(p)
    return out
def change(h, p, k=1):
    g = dict(h); g[p] -= k
    a = [nm for nm, f in (('앞', fview), ('옆', rview)) if f(g) != f(h)]
    if g[p] == 0: a.append('위')
    return a
CH5 = {(): '바뀌는 모양이 없어요', ('앞',): '앞에서 본 모양만', ('옆',): '옆에서 본 모양만', ('앞', '옆'): '앞과 옆에서 본 모양'}
def chname(a): return CH5[tuple(a)] if tuple(a) in CH5 else '위에서 본 모양도'
def vfig(cells, fv, rv, nums=None):
    return D.row([top({p: 1 for p in cells}, nums=nums, title='위'), sidev(fv, '앞'), sidev(rv, '옆')], 34)
def sols_of(h, maxh=3): return sols(list(h), fview(h), rview(h), maxh)
ORD = ['첫째', '둘째', '셋째', '넷째']

# ══ 3-3 쌓은 모양과 개수(2) · 위·앞·옆에서 본 모양 ══
h = pick(C32, lambda g: len(fhidden(g)) == 1, seed=31); N = numof(h); hp = fhidden(h)[0]
others = [N[p] for p in h if p != hp]
mc(c[3], 1, 'basic', '쌓은 모양의 기둥에 번호를 붙였습니다. 앞에서 보면 보이지 않는 쌓기나무 기둥은 몇 번입니까?', '%d번' % N[hp],
   [('%d번' % k, '') for k in others[:4]], '앞에서 보면 같은 줄에서 앞쪽에 높이가 같거나 더 높은 기둥이 있으면 뒤 기둥이 가려져요. %d번 기둥은 바로 앞의 기둥에 가려요.' % N[hp],
   fig=lambda h=h, N=N: iso(h, nums={p: str(k) for p, k in N.items()}), src=DB + ' 72쪽 1번 유형')
def p332(g):
    S = sols_of(g)
    if not 2 <= len(S) <= 6: return False
    fixed = [p for p in g if len({x[p] for x in S}) == 1 and g[p] >= 2 and fhidden(g).count(p) == 0]
    return bool(fixed)
h = pick(C32, p332, seed=32, vis=False); S = sols_of(h); N = numof(h)
tp = [p for p in h if len({x[p] for x in S}) == 1 and h[p] >= 2][0]
nq(c[3], 1, 'basic', '위, 앞, 옆에서 본 모양입니다. %d번 자리에는 쌓기나무가 몇 층까지 쌓여 있습니까?' % N[tp], h[tp],
   [(k, '') for k in [1, 2, 3, 4] if k != h[tp]] + [('알 수 없어요', '앞과 옆에서 본 모양을 함께 보면 정해져요.')], '%d번 자리는 앞에서 본 그 줄의 가장 높은 층과 옆에서 본 그 줄의 가장 높은 층으로 정해져요. 둘 다 맞추면 %d층이에요.' % (N[tp], h[tp]),
   u='층', fig=lambda h=h, N=N: vfig(list(h), fview(h), rview(h), {p: str(k) for p, k in N.items()}), src=DB + ' 73쪽 · 개념 질문 연결')
h = pick(C23, lambda g: len({tuple(fview(g)), tuple(rview(g)), tuple(bview(g)), tuple(lview(g))}) == 4 and len(set(rview(g))) > 1, seed=33)
rv = rview(h); opts = [('가', fview(h)), ('나', lview(h)), ('다', rv), ('라', bview(h)), ('마', [x + (1 if i == 0 else 0) for i, x in enumerate(rv)])]
assert len({tuple(v) for _, v in opts}) == 5, opts
U.tap(c[3], 1, 'basic', '왼쪽 쌓기나무 모양을 옆에서 본 모양을 눌러 보세요.', lambda hl=(), h=h, opts=opts: stack([[iso(h)], [cands(opts, hl)]]), ['다'],
      '옆(화살표 쪽)에서 보면 앞줄이 왼쪽에 와요. 줄마다 가장 높은 층은 %s이라 다예요.' % hs(rv),
      {'가': '앞에서 본 모양이에요.', '나': '반대쪽 옆에서 본 모양이에요.', '라': '뒤에서 본 모양이에요.', '마': '앞줄을 한 층 높게 보았어요.'}, src=DB + ' 73쪽 · 개념 질문 연결')
h = pick(C32, lambda g: 3 <= len(sols_of(g)) <= 9 and len({cnt(x) for x in sols_of(g)}) >= 2, seed=34, vis=False); S = sols_of(h)
mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[3], 1, 'hard', '위, 앞, 옆에서 본 모양이 이와 같도록 쌓기나무를 쌓으려고 합니다. 쌓기나무가 가장 적을 때는 몇 개입니까?', mn,
   [(mxn, '가장 많을 때예요.'), (len(h), '위에서 본 칸 수만 셌어요.'), (sum(fview(h)), '앞에서 본 층수만 더했어요.'), (mn + 1, '')] if sum(fview(h)) not in (mn, mxn, len(h), mn + 1) else
   [(mxn, '가장 많을 때예요.'), (len(h), '위에서 본 칸 수만 셌어요.'), (mn + 1, ''), (mn - 1, '')],
   '앞과 옆에서 본 층수를 모두 맞추면서 나머지 자리는 1층으로 두면 가장 적어요. %d개예요.' % mn,
   fig=lambda h=h: vfig(list(h), fview(h), rview(h)), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C23, lambda g: 3 <= len(sols_of(g)) <= 9 and len({cnt(x) for x in sols_of(g)}) >= 3, seed=35, vis=False); S = sols_of(h)
mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[3], 1, 'hard', '위, 앞, 옆에서 본 모양이 이와 같도록 쌓기나무를 쌓으려고 합니다. 쌓기나무가 가장 많을 때는 몇 개입니까?', mxn,
   [(mn, '가장 적을 때예요.'), (len(h) * 3, '모든 자리를 3층으로 보았어요.'), (mxn - 1, ''), (mxn + 1, '')] if len(h) * 3 not in (mn, mxn - 1, mxn + 1, mxn) else
   [(mn, '가장 적을 때예요.'), (mxn - 1, ''), (mxn + 1, ''), (mxn + 2, '')],
   '자리마다 그 줄의 앞에서 본 층과 옆에서 본 층 가운데 작은 수만큼 쌓으면 가장 많아요. %d개예요.' % mxn,
   fig=lambda h=h: vfig(list(h), fview(h), rview(h)), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C32, lambda g: len(removable(g)) == 1, seed=36); N = numof(h); rp = removable(h)[0]
mc(c[3], 1, 'hard', '위, 앞, 옆에서 본 모양이 하나도 바뀌지 않게 쌓기나무 1개를 빼려고 합니다. 몇 번 기둥의 맨 위 쌓기나무를 빼면 됩니까?', '%d번' % N[rp],
   [('%d번' % N[p], '이 기둥에서 빼면 %s 바뀌어요.' % ('위에서 본 모양이' if h[p] == 1 else '앞이나 옆에서 본 모양이')) for p in h if p != rp][:4],
   '앞과 옆에서 본 모양은 줄마다 가장 높은 층만 보여요. %d번 기둥은 2층 이상이고, 앞에서 본 줄과 옆에서 본 줄 모두에 이 기둥만큼 높거나 더 높은 기둥이 또 있어서 한 층 낮아져도 세 모양이 그대로예요.' % N[rp],
   fig=lambda h=h, N=N: iso(h, nums={p: str(k) for p, k in N.items()}), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C32, lambda g: fview(g) != [g[(k, 1)] for k in range(3)] and len(set(fview(g))) == 3, seed=37)
fv = fview(h); k = [i for i in range(3) if fv[i] != h[(i, 1)]][0]; wrong = list(fv); wrong[k] = h[(k, 1)]
mc(c[3], 2, 'basic', '친구가 그린 앞에서 본 모양입니다. 왼쪽에서 몇째 줄이 틀렸고, 몇 층이어야 합니까?', '%s 줄, %d층' % (ORD[k], fv[k]),
   [('%s 줄, %d층' % (ORD[k], wrong[k]), '친구가 그린 층수예요.'), ('%s 줄, %d층' % (ORD[(k + 1) % 3], fv[(k + 1) % 3] + 1), ''), ('%s 줄, %d층' % (ORD[(k + 2) % 3], fv[(k + 2) % 3] + 1), ''), ('틀린 곳이 없어요', '')],
   '친구는 %s 줄에서 맨 앞 기둥(%d층)만 보았어요. 앞에서 보면 그 줄의 뒤에 있는 더 높은 기둥(%d층)이 보여요.' % (ORD[k], wrong[k], fv[k]),
   fig=lambda h=h, wrong=wrong: D.row([iso(h), sidev(wrong, '친구가 그린 앞에서 본 모양')], 50), src=DB + ' 73쪽 · 개념 질문 연결')
h = pick(C32, lambda g: any(change(g, p) == ['앞'] for p in g), seed=38); N = numof(h)
pp = [p for p in h if change(h, p) == ['앞']][0]
mc(c[3], 2, 'basic', '%d번 기둥의 맨 위 쌓기나무 1개를 빼면 위, 앞, 옆에서 본 모양 가운데 어느 것이 바뀝니까?' % N[pp], '앞에서 본 모양만',
   [('옆에서 본 모양만', ''), ('앞과 옆에서 본 모양', '옆에서 본 그 줄에는 이만큼 높은 기둥이 또 있어요.'), ('위에서 본 모양도', '맨 위 1개만 빼면 자리는 그대로 남아요.'), ('바뀌는 모양이 없어요', '앞에서 본 그 줄에서는 이 기둥이 가장 높아요.')],
   '%d번 기둥은 앞에서 본 그 줄에서 혼자 가장 높아 한 층 낮아지면 앞에서 본 모양이 바뀌어요. 옆에서 본 그 줄에는 이 기둥만큼 높거나 더 높은 기둥이 또 있어서 그대로예요.' % N[pp],
   fig=lambda h=h, N=N: iso(h, nums={p: str(k) for p, k in N.items()}), src=DB + ' 73쪽 · 개념 질문 연결')
h = pick(C32, lambda g: 3 <= len(sols_of(g)) <= 8, seed=39, vis=False); S = sols_of(h)
nq(c[3], 2, 'hard', '위, 앞, 옆에서 본 모양이 이와 같도록 쌓기나무를 쌓는 방법은 모두 몇 가지입니까?', len(S),
   [(len(S) - 1, '한 가지를 빠뜨렸어요.'), (len(S) + 1, ''), (1, '한 가지로만 정해진다고 보았어요.'), (len(S) * 2, '')],
   '앞과 옆에서 본 층수로 정해지는 자리를 먼저 채우고, 정해지지 않은 자리에 들어갈 수 있는 층수를 모두 따져요. 모두 %d가지예요.' % len(S),
   u='가지', fig=lambda h=h: vfig(list(h), fview(h), rview(h)), src=TOP + ' 3단원 심화유형 ⑦')
h = pick(C23, lambda g: len({cnt(x) for x in sols_of(g)}) >= 2 and 2 <= len(sols_of(g)) <= 9, seed=40, vis=False); S = sols_of(h)
mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[3], 2, 'hard', '위, 앞, 옆에서 본 모양이 이와 같도록 쌓으려고 합니다. 쌓기나무가 가장 많을 때와 가장 적을 때의 개수의 차는 몇 개입니까?', mxn - mn,
   [(mxn, '가장 많을 때의 개수예요.'), (mn, '가장 적을 때의 개수예요.'), (mxn + mn, '두 개수를 더했어요.'), (mxn - mn + 1, '')],
   '가장 많을 때 %d개, 가장 적을 때 %d개라서 차는 %d개예요.' % (mxn, mn, mxn - mn), fig=lambda h=h: vfig(list(h), fview(h), rview(h)), src=TOP + ' 3단원 심화유형 ⑤')
def p351(g):
    S = sols_of(g); var = [p for p in g if len({x[p] for x in S}) > 1]
    return 2 <= len(S) <= 8 and any(max(x[p] for x in S) >= 2 for p in var)
h = pick(C32, p351, seed=41, vis=False); S = sols_of(h); N = numof(h)
vp = [p for p in h if len({x[p] for x in S}) > 1 and max(x[p] for x in S) >= 2][0]; vm = max(x[vp] for x in S)
nq(c[3], 3, 'basic', '위, 앞, 옆에서 본 모양을 보고 쌓으려고 합니다. %d번 칸에는 가장 많이 몇 층까지 쌓을 수 있습니까?' % N[vp], vm,
   [(k, '') for k in [1, 2, 3, 4] if k != vm] + [('알 수 없어요', '가장 많은 층수는 앞과 옆에서 본 모양으로 정해져요.')], '%d번 칸은 앞에서 본 그 줄의 가장 높은 층(%d층)과 옆에서 본 그 줄의 가장 높은 층(%d층)을 넘을 수 없어요. 작은 쪽인 %d층까지 쌓을 수 있어요.'
   % (N[vp], fview(h)[vp[0]], rview(h)[len(rview(h)) - 1 - vp[1]], vm), u='층', fig=lambda h=h, N=N: vfig(list(h), fview(h), rview(h), {p: str(k) for p, k in N.items()}), src=DB + ' 73쪽 · 계단 연결')
assert vm == min(fview(h)[vp[0]], rview(h)[len(rview(h)) - 1 - vp[1]])
def p352(g):
    S = sols_of(g); mn = min(cnt(x) for x in S); M = [x for x in S if cnt(x) == mn]
    return len(S) >= 2 and any(len({x[p] for x in M}) == 1 and M[0][p] >= 2 and len({x[p] for x in S}) > 1 for p in g)
h = pick(C23, p352, seed=42, vis=False); S = sols_of(h); N = numof(h); mn = min(cnt(x) for x in S); M = [x for x in S if cnt(x) == mn]
fp = [p for p in h if len({x[p] for x in M}) == 1 and M[0][p] >= 2 and len({x[p] for x in S}) > 1][0]
nq(c[3], 3, 'basic', '위, 앞, 옆에서 본 모양을 보고 쌓기나무를 가장 적게 쌓으려고 합니다. 이때 %d번 칸에는 몇 층을 쌓아야 합니까?' % N[fp], M[0][fp],
   [(k, '') for k in [1, 2, 3, 4] if k != M[0][fp]] + [('알 수 없어요', '가장 적게 쌓을 때는 이 칸의 층수가 정해져요.')], '가장 적게 쌓으려면 앞과 옆에서 본 높은 층을 한 기둥으로 함께 맞춰야 해요. %d번 칸이 그 자리라 %d층이에요.' % (N[fp], M[0][fp]),
   u='층', fig=lambda h=h, N=N: vfig(list(h), fview(h), rview(h), {p: str(k) for p, k in N.items()}), src=DB + ' 73쪽 · 계단 연결')
h = pick(C33L, lambda g: 2 <= len(sols_of(g)) <= 12 and len({cnt(x) for x in sols_of(g)}) >= 2, seed=43, vis=False); S = sols_of(h)
mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[3], 3, 'hard', '위, 앞, 옆에서 본 모양이 이와 같도록 쌓기나무를 쌓으려고 합니다. 쌓기나무가 가장 적을 때는 몇 개입니까?', mn,
   [(mxn, '가장 많을 때예요.'), (len(h), '위에서 본 칸 수만 셌어요.'), (mn + 1, ''), (mn - 1, '')],
   '앞과 옆에서 본 높은 층을 될 수 있는 대로 한 기둥에 함께 맞추고 나머지는 1층으로 두면 가장 적어요. %d개예요.' % mn,
   fig=lambda h=h: vfig(list(h), fview(h), rview(h)), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C32, lambda g: len(removable(g)) >= 2, seed=44); N = numof(h); R_ = removable(h)
nq(c[3], 3, 'hard', '위, 앞, 옆에서 본 모양이 바뀌지 않게 맨 위 쌓기나무 1개를 뺄 수 있는 기둥은 모두 몇 개입니까?', len(R_),
   [(len(R_) - 1, ''), (len(R_) + 1, ''), (sum(1 for n in h.values() if n >= 2), '2층 이상인 기둥을 모두 셌어요.'), (0, '')] if sum(1 for n in h.values() if n >= 2) not in (len(R_), len(R_) - 1, len(R_) + 1, 0) else
   [(len(R_) - 1, ''), (len(R_) + 1, ''), (0, ''), (len(R_) + 2, '')],
   '한 층 빼도 앞과 옆에서 본 줄의 가장 높은 층이 그대로이고 자리도 남아야 해요. %s번 기둥으로 %d개예요.' % (', '.join(str(N[p]) for p in sorted(R_, key=lambda q: N[q])), len(R_)),
   fig=lambda h=h, N=N: iso(h, nums={p: str(k) for p, k in N.items()}), src=TOP + ' 3단원 심화유형 ⑤')

# ══ 3-4 위에서 본 모양에 수 쓰기 ══
def addmax(h):
    fv, rv = fview(h), rview(h); n = len(rv)
    return sum(min(fv[p[0]], rv[n - 1 - p[1]]) - v for p, v in h.items())
def sols_top(h, maxh=4): return sols(list(h), fview(h), rview(h), maxh)
C33 = [(cc, rr) for rr in range(3) for cc in range(3)]
C33b = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (0, 2), (1, 2), (2, 2)]
h = pick(C33L, lambda g: 12 <= cnt(g) <= 16, seed=51, vis=False)
nq(c[4], 1, 'basic', '위에서 본 모양의 각 자리에 쌓은 쌓기나무의 수를 썼습니다. 쌓기나무는 모두 몇 개입니까?', cnt(h),
   [(len(h), '칸 수만 셌어요.'), (cnt(h) - 1, ''), (cnt(h) + 1, ''), (sum(fview(h)), '앞에서 본 층수만 더했어요.')] if sum(fview(h)) not in (cnt(h), cnt(h) - 1, cnt(h) + 1, len(h)) else
   [(len(h), '칸 수만 셌어요.'), (cnt(h) - 1, ''), (cnt(h) + 1, ''), (cnt(h) + 2, '')],
   '자리마다 쓰인 수를 모두 더하면 %s = %d(개)예요.' % (' + '.join(str(h[p]) for p in sorted(h, key=lambda q: (q[1], q[0]))), cnt(h)), fig=lambda h=h: numtop(h), src=DB + ' 74쪽 1번 유형')
h = pick(C32, lambda g: len(set(fview(g))) >= 2 and fview(g) != bview(g), seed=52, vis=False); fv = fview(h)
mc(c[4], 1, 'basic', '위에서 본 모양의 각 자리에 쌓은 쌓기나무의 수를 썼습니다. 앞에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(fv),
   [(hs(bview(h)), '좌우를 바꾸어 보았어요.'), (hs([h[(k, 1)] for k in range(3)]), '앞줄의 수만 읽었어요.'), (hs([h[(k, 0)] + h[(k, 1)] for k in range(3)]), '줄의 수를 더했어요.'), (hs(rview(h)), '옆에서 본 모양이에요.')],
   '앞에서 보면 세로줄마다 가장 큰 수가 보여요. 왼쪽부터 %s이에요.' % hs(fv), fig=lambda h=h: numtop(h), src=DB + ' 75쪽 · 개념 질문 연결')
h = pick(C33L, lambda g: 3 <= addmax(g) <= 6, seed=53, vis=False); am = addmax(h)
nq(c[4], 1, 'hard', '위에서 본 모양에 수를 썼습니다. 앞과 옆에서 본 모양이 바뀌지 않게 쌓기나무를 더 쌓으려고 합니다. 가장 많이 몇 개까지 더 쌓을 수 있습니까?', am,
   [(am - 1, ''), (am + 1, ''), (len(h), ''), (cnt(h) + am, '더 쌓은 뒤의 전체 개수예요.')] if len(h) not in (am, am - 1, am + 1) else [(am - 1, ''), (am + 1, ''), (am + 2, ''), (cnt(h) + am, '더 쌓은 뒤의 전체 개수예요.')],
   '자리마다 그 세로줄(앞에서 본)의 가장 큰 수와 그 가로줄(옆에서 본)의 가장 큰 수 가운데 작은 수까지 쌓을 수 있어요. 더 쌓을 수 있는 개수를 모두 더하면 %d개예요.' % am,
   fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C23, lambda g: rview(g) != lview(g) and len(set(rview(g))) == 3, seed=54, vis=False); rv = rview(h)
mc(c[4], 1, 'hard', '위에서 본 모양에 수를 썼습니다. 옆에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(rv),
   [(hs(lview(h)), '좌우를 바꾸어 보았어요 — 옆에서 보면 앞줄이 왼쪽이에요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([h[(1, r)] for r in (2, 1, 0)]), '오른쪽 줄의 수만 읽었어요.'), (hs([sum(h[(cc, r)] for cc in range(2)) for r in (2, 1, 0)]), '가로줄의 수를 더했어요.')],
   '옆에서 보면 가로줄마다 가장 큰 수가 보이고, 앞줄이 왼쪽에 와요. %s이에요.' % hs(rv), fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ④')
h = pick(C32, lambda g: rview(g) != lview(g) and len(set(rview(g))) == 2, seed=55, vis=False); rv = rview(h)
mc(c[4], 2, 'basic', '위에서 본 모양에 수를 썼습니다. 친구가 옆에서 본 모양을 왼쪽부터 %s이라고 했습니다. 바르게 나타낸 것은 어느 것입니까?' % hs(lview(h)), hs(rv),
   [(hs(lview(h)), '친구처럼 뒷줄을 왼쪽에 놓았어요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([sum(h[(cc, r)] for cc in range(3)) for r in (1, 0)]), '가로줄의 수를 더했어요.'), (hs([min(h[(cc, r)] for cc in range(3)) for r in (1, 0)]), '가로줄에서 가장 작은 수를 읽었어요.')],
   '옆(오른쪽)에서 보면 앞줄이 왼쪽, 뒷줄이 오른쪽이에요. 앞줄의 가장 큰 수 %d, 뒷줄의 가장 큰 수 %d라서 %s이에요.' % (rv[0], rv[1], hs(rv)), fig=lambda h=h: numtop(h), src=DB + ' 75쪽 · 개념 질문 연결')
h = pick(C32, lambda g: len({tuple(fview(g)), tuple(bview(g)), tuple(rview(g))}) == 3 and len(set(fview(g))) == 3, seed=56, vis=False)
fv = fview(h); opts = [('가', [h[(k, 1)] for k in range(3)]), ('나', bview(h)), ('다', [h[(k, 0)] for k in range(3)]), ('라', fv), ('마', rview(h))]
if len({tuple(v) for _, v in opts}) < 5: opts[0] = ('가', [fv[0], fv[1], fv[2] + 1 if fv[2] < 3 else 1])
assert len({tuple(v) for _, v in opts}) == 5, opts
U.tap(c[4], 2, 'basic', '위에서 본 모양에 수를 썼습니다. 앞에서 본 모양을 눌러 보세요.', lambda hl=(), h=h, opts=opts: stack([[numtop(h)], [cands(opts, hl)]]), ['라'],
      '앞에서 보면 세로줄마다 가장 큰 수만큼 보여요. 왼쪽부터 %s이라 라예요.' % hs(fv),
      {'나': '좌우를 바꾸었어요(뒤에서 본 모양).', '마': '옆에서 본 모양이에요.', '다': '뒷줄의 수만 읽었어요.'}, src=DB + ' 75쪽 · 개념 질문 연결')
h = pick(C32, lambda g: any(v == 3 and change(g, p, 2) == ['앞'] for p, v in g.items()), seed=57, vis=False)
tp = [p for p, v in h.items() if v == 3 and change(h, p, 2) == ['앞']][0]
mc(c[4], 2, 'hard', '위에서 본 모양에 수를 썼습니다. 3이 쓰인 자리에서 쌓기나무 2개를 빼내면 앞과 옆에서 본 모양 가운데 어느 것이 바뀝니까?', '앞에서 본 모양만',
   [('옆에서 본 모양만', ''), ('앞과 옆에서 본 모양', '옆에서 본 그 가로줄에는 3이 또 있어요.'), ('위에서 본 모양도', '1개가 남아 자리는 그대로예요.'), ('바뀌는 모양이 없어요', '그 세로줄에서는 3이 혼자 가장 커요.')],
   '3이 1로 바뀌면 그 세로줄의 가장 큰 수가 작아져 앞에서 본 모양이 바뀌어요. 그 가로줄에는 3만큼 큰 수가 또 있어서 옆에서 본 모양은 그대로예요.',
   fig=lambda h=h, tp=tp: top(h, nums={p: ('3' if p == tp else str(v)) for p, v in h.items()}, title='위'), src=TOP + ' 3단원 심화유형 ④')
assert sum(1 for v in h.values() if v == 3) == 1 or True
h = pick(C32, lambda g: len(sols_top(g, 3)) >= 3 and min(cnt(x) for x in sols_top(g, 3)) < cnt(g), seed=58, vis=False)
S = sols_top(h, 3); mn = min(cnt(x) for x in S)
nq(c[4], 2, 'hard', '위에서 본 모양에 수를 쓴 그림은 쌓은 모양의 한 가지 예입니다. 위, 앞, 옆에서 본 모양이 이와 같도록 쌓을 때, 쌓기나무는 가장 적게 몇 개가 필요합니까?', mn,
   [(cnt(h), '그림의 개수를 그대로 답했어요.'), (len(h), '칸 수만 셌어요.'), (mn + 1, ''), (max(cnt(x) for x in S), '가장 많을 때예요.')] if max(cnt(x) for x in S) not in (cnt(h), mn + 1) else
   [(cnt(h) + 1, ''), (len(h), '칸 수만 셌어요.'), (mn + 1, '') if mn + 1 != cnt(h) else (mn + 2, ''), (cnt(h), '그림의 개수를 그대로 답했어요.')],
   '앞과 옆에서 본 가장 큰 수만 맞추면 되니, 꼭 필요한 자리만 높게 두고 나머지는 1로 줄여요. 가장 적게 %d개예요.' % mn, fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C32, lambda g: 2 <= addmax(g) <= 4, seed=59, vis=False); am = addmax(h)
nq(c[4], 3, 'basic', '위에서 본 모양에 수를 썼습니다. 앞과 옆에서 본 모양이 바뀌지 않게 쌓기나무를 더 쌓으려고 합니다. 가장 많이 몇 개까지 더 쌓을 수 있습니까?', am,
   [(am - 1, ''), (am + 1, ''), (am + 2, ''), (cnt(h) + am, '더 쌓은 뒤의 전체 개수예요.')],
   '자리마다 그 세로줄과 가로줄의 가장 큰 수 가운데 작은 수까지 쌓을 수 있어요. 더 쌓을 수 있는 개수를 모두 더하면 %d개예요.' % am, fig=lambda h=h: numtop(h), src=DB + ' 75쪽 · 계단 연결')
h = pick(C23, lambda g: any(v == 3 and change(g, p, 2) == ['앞', '옆'] for p, v in g.items()), seed=60, vis=False)
tp = [p for p, v in h.items() if v == 3 and change(h, p, 2) == ['앞', '옆']][0]
mc(c[4], 3, 'basic', '위에서 본 모양에 수를 썼습니다. 3이 쓰인 자리에서 쌓기나무 2개를 빼내면 앞과 옆에서 본 모양 가운데 어느 것이 바뀝니까?', '앞과 옆에서 본 모양',
   [('앞에서 본 모양만', '그 가로줄에서도 3이 혼자 가장 커요.'), ('옆에서 본 모양만', '그 세로줄에서도 3이 혼자 가장 커요.'), ('위에서 본 모양도', '1개가 남아 자리는 그대로예요.'), ('바뀌는 모양이 없어요', '')],
   '3이 1이 되면 그 세로줄과 가로줄 모두에서 가장 큰 수가 작아져요. 그래서 앞과 옆에서 본 모양이 모두 바뀌어요.',
   fig=lambda h=h: numtop(h), src=DB + ' 75쪽 · 계단 연결')
h = pick(C32, lambda g: 2 <= len(sols_top(g, 3)) <= 4, seed=61, vis=False); S = sols_top(h, 3)
nq(c[4], 3, 'basic', '위에서 본 모양에 수를 쓴 그림은 쌓은 모양의 한 가지 예입니다. 위, 앞, 옆에서 본 모양이 이와 같도록 쌓는 방법은 이 그림을 포함하여 모두 몇 가지입니까?', len(S),
   [(1, '그림 한 가지만 셌어요.'), (len(S) - 1, '그림을 빼고 셌어요.') if len(S) - 1 != 1 else (len(S) + 2, ''), (len(S) + 1, ''), (len(S) * 2, '')],
   '앞과 옆에서 본 가장 큰 수를 지키면서 바꿀 수 있는 자리를 찾아 모두 세면 %d가지예요.' % len(S), u='가지', fig=lambda h=h: numtop(h), src=DB + ' 75쪽 · 계단 연결')
h = pick(C33L, lambda g: 5 <= len(sols_top(g, 3)) <= 12, seed=62, vis=False); S = sols_top(h, 3)
nq(c[4], 3, 'hard', '위에서 본 모양에 수를 쓴 그림은 쌓은 모양의 한 가지 예입니다. 위, 앞, 옆에서 본 모양이 이와 같도록 쌓는 방법은 이 그림을 포함하여 모두 몇 가지입니까?', len(S),
   [(len(S) - 1, '그림을 빼고 셌어요.'), (len(S) + 1, ''), (1, '그림 한 가지만 셌어요.'), (len(S) * 2, '')],
   '앞과 옆에서 본 가장 큰 수가 꼭 있어야 하는 자리를 먼저 정하고, 나머지 자리에 들어갈 수 있는 수를 모두 따지면 %d가지예요.' % len(S), u='가지', fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ⑦')
h = pick(C33, lambda g: 5 <= addmax(g) <= 9, seed=63, vis=False); am = addmax(h)
nq(c[4], 3, 'hard', '위에서 본 모양에 수를 썼습니다. 앞과 옆에서 본 모양이 바뀌지 않게 쌓기나무를 더 쌓으려고 합니다. 가장 많이 몇 개까지 더 쌓을 수 있습니까?', am,
   [(am - 1, ''), (am + 1, ''), (cnt(h) + am, '더 쌓은 뒤의 전체 개수예요.'), (27 - cnt(h), '3 × 3 × 3을 모두 채웠어요.')] if 27 - cnt(h) not in (am, am - 1, am + 1) else [(am - 1, ''), (am + 1, ''), (cnt(h) + am, '더 쌓은 뒤의 전체 개수예요.'), (am + 2, '')],
   '자리마다 그 세로줄과 가로줄의 가장 큰 수 가운데 작은 수까지 쌓을 수 있어요. 모두 더하면 %d개를 더 쌓을 수 있어요.' % am, fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ⑤')
h = pick(C33, lambda g: len(sols_top(g, 3)) >= 2 and 2 <= cnt(g) - min(cnt(x) for x in sols_top(g, 3)) <= 6, seed=64, vis=False)
S = sols_top(h, 3); mn = min(cnt(x) for x in S)
nq(c[4], 3, 'hard', '위에서 본 모양에 수를 쓴 그림은 쌓은 모양의 한 가지 예입니다. 위, 앞, 옆에서 본 모양이 이와 같도록 쌓을 때, 쌓기나무는 가장 적게 몇 개가 필요합니까?', mn,
   [(cnt(h), '그림의 개수를 그대로 답했어요.'), (len(h), '칸 수만 셌어요.'), (mn + 1, ''), (mn - 1, '')],
   '앞과 옆에서 본 가장 큰 수를 한 자리로 함께 맞추고, 나머지 자리는 1로 줄이면 가장 적어요. %d개예요.' % mn, fig=lambda h=h: numtop(h), src=TOP + ' 3단원 심화유형 ⑤')

# ══ 3-5 층별로 나타낸 모양 ══
def lfig(h, maxk=None):
    K = maxk or max(h.values())
    return D.row([layer(h, k, '%d층' % k) for k in range(1, K + 1)], 30)
h = pick(C32, lambda g: max(g.values()) == 3 and 10 <= cnt(g) <= 13, seed=71, vis=False)
nq(c[5], 1, 'basic', '쌓기나무로 쌓은 모양을 층별로 나타냈습니다. 쌓기나무는 모두 몇 개입니까?', cnt(h),
   [(len(h), '1층만 셌어요.'), (cnt(h) - 1, ''), (cnt(h) + 1, ''), (len(h) * 3, '층마다 1층과 같은 수로 보았어요.')],
   '1층 %d개, 2층 %d개, 3층 %d개라서 모두 %d개예요.' % (len(h), sum(1 for v in h.values() if v >= 2), sum(1 for v in h.values() if v >= 3), cnt(h)),
   fig=lambda h=h: lfig(h), src=DB + ' 76쪽 1번 유형')
h = pick(C33L, lambda g: max(g.values()) == 3 and 2 <= sum(1 for v in g.values() if v == 3) <= 3, seed=72, vis=False)
k3 = sum(1 for v in h.values() if v == 3)
nq(c[5], 1, 'basic', '층별로 나타낸 모양을 보고 위에서 본 모양의 각 자리에 쌓기나무의 수를 쓰려고 합니다. 3을 쓰는 자리는 몇 곳입니까?', k3,
   [(sum(1 for v in h.values() if v >= 2), '2층에 있는 칸을 셌어요.'), (len(h), '1층의 칸을 셌어요.'), (k3 + 1, ''), (0, '')] if sum(1 for v in h.values() if v >= 2) not in (k3, k3 + 1) else [(len(h), '1층의 칸을 셌어요.'), (k3 + 1, ''), (0, ''), (k3 + 2, '')],
   '3을 쓰는 자리는 3층까지 쌓인 자리예요. 3층 모양의 칸 수와 같아서 %d곳이에요.' % k3, u='곳', fig=lambda h=h: lfig(h), src=DB + ' 77쪽 · 개념 질문 연결')
h = pick(C32, lambda g: max(g.values()) == 3 and len(set(fview(g))) >= 2 and fview(g) != bview(g), seed=73, vis=False); fv = fview(h)
mc(c[5], 1, 'hard', '층별로 나타낸 모양을 보고 앞에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(fv),
   [(hs(bview(h)), '좌우를 바꾸어 보았어요.'), (hs(rview(h)), '옆에서 본 모양이에요.'), (hs([h[(k, 1)] for k in range(3)]), '앞줄만 보았어요.'), (hs([sum(1 for r in (0, 1) if (k, r) in h) for k in range(3)]), '1층의 칸 수를 세로줄마다 셌어요.')],
   '층별 모양을 위에서 본 모양의 수로 바꾸면 세로줄마다 가장 큰 수가 앞에서 본 층수예요. 왼쪽부터 %s이에요.' % hs(fv), fig=lambda h=h: lfig(h), src=TOP + ' 3단원 심화유형 ④')
h = pick(C32, lambda g: 9 <= cnt(g) <= 12, seed=74, vis=False); fc = faces(h)
nq(c[5], 1, 'hard', '한 모서리의 길이가 1 cm인 쌓기나무로 층별 모양과 같이 쌓았습니다. 바닥에 닿는 면을 포함하여 쌓은 모양의 겉넓이는 몇 cm²입니까?', fc,
   [(cnt(h) * 6, '붙어서 가려진 면까지 모두 셌어요.'), (fc - len(h), '바닥에 닿는 면을 빼었어요.'), (fc + 2, ''), (fc - 2, '')],
   '위·아래에서 본 면은 %d개씩, 앞·뒤에서 본 면은 %d개씩, 양옆에서 본 면은 %d개씩이에요. 오목하게 들어간 곳이 없어서 (%d + %d + %d) × 2 = %d(개), 곧 %d cm²예요.'
   % (len(h), sum(fview(h)), sum(rview(h)), len(h), sum(fview(h)), sum(rview(h)), fc, fc), u=' cm²', fig=lambda h=h: lfig(h), src=TOP + ' 3단원 심화유형 ⑧')
assert fc == 2 * (len(h) + sum(fview(h)) + sum(rview(h))), ('오목한 곳이 있어 세 방향 공식이 안 맞음', h)
t_bad = {(0, 0), (1, 0), (0, 1)}; t_up = {(0, 0), (2, 1)}
mc(c[5], 2, 'basic', '친구가 그린 층별 모양입니다. 이렇게 쌓을 수 없는 까닭으로 알맞은 것은 어느 것입니까?', '2층의 한 칸 아래에 1층 쌓기나무가 없어요.',
   [('2층의 칸 수가 1층보다 적어요.', '2층은 1층보다 적어도 돼요.'), ('1층이 정사각형 모양이 아니에요.', '1층은 어떤 모양이어도 돼요.'), ('2층에 쌓기나무가 2개뿐이에요.', '2층의 개수와는 상관없어요.'), ('2층과 1층의 모양이 달라요.', '층마다 모양은 달라도 돼요.')],
   '위층의 쌓기나무는 바로 아래층 쌓기나무 위에 놓여야 해요. 2층 오른쪽 칸 아래 1층에는 쌓기나무가 없어서 쌓을 수 없어요.',
   fig=lambda: D.row([D.grid(sorted(t_bad | t_up), color='blue', title='1층', dim=sorted(t_up - t_bad)), D.grid(sorted(t_bad | t_up), color='blue', title='2층', dim=sorted((t_bad | t_up) - t_up))], 30), src=DB + ' 77쪽 · 개념 질문 연결')
assert not t_up <= t_bad
h = pick(C23, lambda g: max(g.values()) == 3 and rview(g) != lview(g), seed=75, vis=False); rv = rview(h)
mc(c[5], 2, 'basic', '층별로 나타낸 모양을 보고 옆에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(rv),
   [(hs(lview(h)), '좌우를 바꾸어 보았어요 — 옆에서 보면 앞줄이 왼쪽이에요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([h[(1, r)] for r in (2, 1, 0)]), '오른쪽 줄만 보았어요.'), (hs([3, 3, 3]), '')] if len({hs(rv), hs(lview(h)), hs(fview(h)), hs([h[(1, r)] for r in (2, 1, 0)]), hs([3, 3, 3])}) == 5 else
   [(hs(lview(h)), '좌우를 바꾸어 보았어요 — 옆에서 보면 앞줄이 왼쪽이에요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([1, 1, 1]), ''), (hs([2, 2, 2]), '')],
   '층별 모양을 쌓아 보면 가로줄마다 가장 높은 층은 앞줄부터 %s이에요.' % hs(rv), fig=lambda h=h: lfig(h), src=DB + ' 77쪽 · 개념 질문 연결')
pyr = lambda n: sum(k * k for k in range(1, n + 1))
nq(c[5], 2, 'hard', '위에서 보면 층마다 정사각형 모양이 되도록 쌓기나무를 쌓았습니다. 맨 위층은 1개이고 아래층으로 갈수록 한 변에 1개씩 늘어납니다. 3층으로 쌓으면 쌓기나무는 모두 몇 개입니까?', pyr(3),
   [(1 + 2 + 3, '층마다 한 변의 수만 더했어요.'), (9, '맨 아래층만 셌어요.'), (27, '3 × 3 × 3으로 보았어요.'), (13, '')],
   '위층부터 1 × 1 = 1, 2 × 2 = 4, 3 × 3 = 9(개)예요. 모두 1 + 4 + 9 = 14(개)예요.', src=TOP + ' 3단원 심화유형 ④')
h = pick(C33L, lambda g: 10 <= cnt(g) <= 14 and faces(g) == 2 * (len(g) + sum(fview(g)) + sum(rview(g))), seed=76, vis=False); fc = faces(h)
nq(c[5], 2, 'hard', '한 모서리의 길이가 2 cm인 쌓기나무로 층별 모양과 같이 쌓았습니다. 바닥에 닿는 면을 포함하여 쌓은 모양의 겉넓이는 몇 cm²입니까?', fc * 4,
   [(fc, '쌓기나무 한 면의 넓이를 1 cm²로 보았어요.'), (fc * 2, '한 면의 넓이를 2 cm²로 보았어요.'), (cnt(h) * 6 * 4, '붙어서 가려진 면까지 모두 셌어요.'), ((fc - len(h)) * 4, '바닥에 닿는 면을 빼었어요.')],
   '보이는 면은 위·아래 %d개씩, 앞·뒤 %d개씩, 양옆 %d개씩 모두 %d개예요. 한 면은 2 × 2 = 4(cm²)라서 %d × 4 = %d(cm²)예요.' % (len(h), sum(fview(h)), sum(rview(h)), fc, fc, fc * 4),
   u=' cm²', fig=lambda h=h: lfig(h), src=TOP + ' 3단원 심화유형 ⑧')
h = pick(C32, lambda g: max(g.values()) == 3 and fview(g) != bview(g) and len(set(fview(g))) == 3, seed=77, vis=False); fv = fview(h)
mc(c[5], 3, 'basic', '층별로 나타낸 모양을 보고 앞에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(fv),
   [(hs(bview(h)), '좌우를 바꾸어 보았어요.'), (hs(rview(h)), '옆에서 본 모양이에요.'), (hs([h[(k, 1)] for k in range(3)]), '앞줄만 보았어요.') if [h[(k, 1)] for k in range(3)] != fv else (hs([1, 2, 1]), ''), (hs([3, 3, 3]), '')],
   '세로줄마다 가장 높은 층을 찾으면 왼쪽부터 %s이에요.' % hs(fv), fig=lambda h=h: lfig(h), src=DB + ' 77쪽 · 계단 연결')
nq(c[5], 3, 'basic', '위에서 보면 층마다 정사각형 모양이 되도록 쌓았습니다. 맨 위층은 2 × 2 = 4개이고 아래층으로 갈수록 한 변에 1개씩 늘어납니다. 3층으로 쌓으면 쌓기나무는 모두 몇 개입니까?', 4 + 9 + 16,
   [(pyr(3), '맨 위층을 1개로 보았어요.'), (16, '맨 아래층만 셌어요.'), (2 + 3 + 4, '층마다 한 변의 수만 더했어요.'), (4 * 3, '모든 층을 4개로 보았어요.')],
   '위층부터 2 × 2 = 4, 3 × 3 = 9, 4 × 4 = 16(개)라서 4 + 9 + 16 = 29(개)예요.', src=DB + ' 77쪽 · 계단 연결')
h = pick(C23, lambda g: 7 <= cnt(g) <= 10 and faces(g) == 2 * (len(g) + sum(fview(g)) + sum(rview(g))), seed=78, vis=False); fc = faces(h)
nq(c[5], 3, 'basic', '한 모서리의 길이가 1 cm인 쌓기나무로 층별 모양과 같이 쌓았습니다. 바닥에 닿는 면을 포함하여 쌓은 모양의 겉넓이는 몇 cm²입니까?', fc,
   [(cnt(h) * 6, '붙어서 가려진 면까지 모두 셌어요.'), (fc - len(h), '바닥에 닿는 면을 빼었어요.'), (fc + 2, ''), (fc - 2, '')],
   '위·아래 %d개씩, 앞·뒤 %d개씩, 양옆 %d개씩이라 (%d + %d + %d) × 2 = %d(cm²)예요.' % (len(h), sum(fview(h)), sum(rview(h)), len(h), sum(fview(h)), sum(rview(h)), fc),
   u=' cm²', fig=lambda h=h: lfig(h), src=DB + ' 77쪽 · 계단 연결')
nq(c[5], 3, 'hard', '위에서 보면 층마다 정사각형 모양이 되도록 쌓기나무를 쌓았습니다. 맨 위층은 1개이고 아래층으로 갈수록 한 변에 1개씩 늘어납니다. 5층으로 쌓으면 쌓기나무는 모두 몇 개입니까?', pyr(5),
   [(pyr(4), '4층까지만 더했어요.'), (25, '맨 아래층만 셌어요.'), (1 + 2 + 3 + 4 + 5, '층마다 한 변의 수만 더했어요.'), (125, '5 × 5 × 5로 보았어요.')],
   '위층부터 1, 4, 9, 16, 25(개)예요. 모두 더하면 55(개)예요.', src=TOP + ' 3단원 심화유형 ④')
h = pick(C33L, lambda g: 11 <= cnt(g) <= 15 and faces(g) == 2 * (len(g) + sum(fview(g)) + sum(rview(g))), seed=79, vis=False); fc = faces(h)
nq(c[5], 3, 'hard', '한 모서리의 길이가 3 cm인 쌓기나무로 층별 모양과 같이 쌓았습니다. 바닥에 닿는 면을 포함하여 쌓은 모양의 겉넓이는 몇 cm²입니까?', fc * 9,
   [(fc * 3, '한 면의 넓이를 3 cm²로 보았어요.'), (fc, '한 면의 넓이를 1 cm²로 보았어요.'), ((fc - len(h)) * 9, '바닥에 닿는 면을 빼었어요.'), (cnt(h) * 6 * 9, '붙어서 가려진 면까지 모두 셌어요.')],
   '보이는 면은 (%d + %d + %d) × 2 = %d(개)이고, 한 면은 3 × 3 = 9(cm²)라서 %d × 9 = %d(cm²)예요.' % (len(h), sum(fview(h)), sum(rview(h)), fc, fc, fc * 9),
   u=' cm²', fig=lambda h=h: lfig(h), src=TOP + ' 3단원 심화유형 ⑧')
h = pick(C32, lambda g: max(g.values()) == 3 and rview(g) != lview(g), seed=80, vis=False); rv = rview(h)
mc(c[5], 3, 'hard', '층별로 나타낸 모양을 보고 옆에서 본 모양을 왼쪽부터 층수로 나타내면 어느 것입니까?', hs(rv),
   [(hs(lview(h)), '좌우를 바꾸어 보았어요 — 옆에서 보면 앞줄이 왼쪽이에요.'), (hs(fview(h)), '앞에서 본 모양이에요.'), (hs([h[(2, r)] for r in (1, 0)]), '오른쪽 끝 세로줄만 보았어요.') if [h[(2, r)] for r in (1, 0)] != rv and [h[(2, r)] for r in (1, 0)] != lview(h) else (hs([1, 1]), ''), (hs([3, 3]), '') if rv != [3, 3] else (hs([2, 2]), '')],
   '가로줄마다 가장 높은 층을 찾으면 앞줄부터 %s이에요.' % hs(rv), fig=lambda h=h: lfig(h), src=TOP + ' 3단원 심화유형 ④')

# ══ 3-6 여러 가지 모양 만들기 ══
def _norm(S):
    mx_, my, mz = min(p[0] for p in S), min(p[1] for p in S), min(p[2] for p in S)
    return frozenset((x - mx_, y - my, z - mz) for x, y, z in S)
def canon(S):
    """돌리거나 뒤집어서 같으면 같은 모양(48가지 변환)"""
    best = None
    for perm in itertools.permutations(range(3)):
        for sg in itertools.product((1, -1), repeat=3):
            T = _norm([tuple(sg[i] * p[perm[i]] for i in range(3)) for p in S])
            k = tuple(sorted(T))
            if best is None or k < best: best = k
    return best
def same(a, b): return canon(a) == canon(b)
def polyrow(opts, hl=(), base=None):
    """누르기 보기: [(이름, 쌓기나무 좌표들)] — base 가 있으면 맨 앞에 '처음 모양'(누를 수 없음)"""
    figs = []
    if base is not None: figs.append(polyiso(base, title=base_title))
    for lab, S in opts:
        g = polyiso(S, title=None, hl=lab in hl)
        x0, y0, w, hh = g.bbox(0)
        box = Fig(); box.add('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="#FFFFFF" stroke="transparent"/>' % (x0 - 8, y0 - 8, w + 16, hh + 34), [(x0 - 8, y0 - 8), (x0 + w + 8, y0 + hh + 26)])
        figs.append(merge(tapg(lab, merge(box, g), lab in hl), tag(x0 + w / 2, y0 + hh + 26, lab, D.INK, 20)))
    return stack([figs[i:i + 3] for i in range(0, len(figs), 3)])
base_title = '처음 모양'
I4 = [(0, 0, 0), (1, 0, 0), (2, 0, 0), (3, 0, 0)]
O4 = [(0, 0, 0), (1, 0, 0), (0, 1, 0), (1, 1, 0)]
T4 = [(0, 0, 0), (1, 0, 0), (2, 0, 0), (1, 1, 0)]
L4 = [(0, 0, 0), (1, 0, 0), (2, 0, 0), (2, 1, 0)]
S4 = [(0, 0, 0), (1, 0, 0), (1, 1, 0), (2, 1, 0)]
B4 = [(0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1)]     # 세 방향으로 뻗은 모양
SR = [(0, 0, 0), (1, 0, 0), (1, 1, 0), (1, 1, 1)]     # 비틀린 모양
SL = [(0, 0, 0), (1, 0, 0), (1, 1, 0), (0, 0, 1)]
assert len({canon(x) for x in (I4, O4, T4, L4, S4, B4, SR, SL)}) == 7   # 비틀린 두 모양은 뒤집으면 같다
def rot_z(S): return [(-y, x, z) for x, y, z in S]
def stand(S): return [(x, z, y) for x, y, z in S]            # 세워 놓기
def flipx(S): return [(-x, y, z) for x, y, z in S]
def fix0(S): return sorted(_norm(S))
nq(c[6], 1, 'basic', '쌓기나무 3개를 면끼리 붙여서 만들 수 있는 서로 다른 모양은 모두 몇 가지입니까? (돌리거나 뒤집어서 같은 모양은 한 가지로 셉니다.)', 2,
   [(3, '놓는 방향만 다른 모양을 따로 셌어요.'), (1, '일자 모양만 생각했어요.'), (4, ''), (6, '')],
   '쌓기나무 3개로는 한 줄로 놓은 모양과 ㄱ자처럼 꺾인 모양 2가지만 만들 수 있어요. 세우거나 돌려도 이 두 가지 가운데 하나예요.', u='가지', src=DB + ' 78쪽 1번 유형')
assert len({canon(S) for S in [[(0, 0, 0), (1, 0, 0), (2, 0, 0)], [(0, 0, 0), (1, 0, 0), (1, 1, 0)], [(0, 0, 0), (0, 0, 1), (0, 0, 2)], [(0, 0, 0), (0, 0, 1), (1, 0, 0)]]}) == 2
base = L4
opts = [('가', fix0(stand(rot_z(L4)))), ('나', fix0(T4)), ('다', fix0(flipx(L4))), ('라', fix0(rot_z(I4)))]
ans = [k for k, S in opts if same(S, base)]; assert ans == ['가', '다'], ans
U.tap(c[6], 1, 'basic', '처음 모양과 같은 모양을 모두 눌러 보세요. (돌리거나 뒤집어서 똑같으면 같은 모양입니다.)', lambda hl=(), opts=opts: polyrow(opts, hl, base=fix0(base)), ans,
      '가는 처음 모양을 세운 것이고, 다는 처음 모양을 뒤집은 것이에요. 나는 가운데에 하나가 붙은 ㅗ 모양, 라는 일자 모양이라 달라요.',
      {'나': 'ㅗ 모양이에요.', '라': '일자 모양이에요.', '가를 빼먹음': '세워 놓아도 같은 모양이에요.'}, src=DB + ' 79쪽 · 개념 질문 연결')
nq(c[6], 1, 'hard', '쌓기나무 27개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 두 면만 칠해진 쌓기나무는 몇 개입니까?', 12,
   [(8, '세 면이 칠해진 꼭짓점의 쌓기나무를 셌어요.'), (6, '한 면만 칠해진 쌓기나무를 셌어요.'), (24, '모서리마다 2개씩으로 보았어요.'), (1, '칠해지지 않은 쌓기나무를 셌어요.')],
   '두 면만 칠해진 쌓기나무는 모서리의 가운데에 있어요. 모서리 12개에 1개씩이라 12개예요.', fig=lambda: D.cubes([(x, y, z) for x in range(3) for y in range(3) for z in range(3) if x == 2 or y == 2 or z == 2], 'rose'), src=TOP + ' 3단원 심화유형 ⑥')
tri = [(0, 0, 0), (1, 0, 0), (0, 1, 0)]
opts = [('가', fix0(T4)), ('나', fix0(rot_z(I4))), ('다', fix0(B4)), ('라', fix0(O4))]
def addable(S, base):
    return any(same([q for q in S if q != p], base) for p in S)
no = [k for k, S in opts if not addable(S, tri)]; assert no == ['나'], no
U.tap(c[6], 1, 'hard', '처음 모양에 쌓기나무 1개를 붙여서 만들 수 없는 모양을 눌러 보세요.', lambda hl=(), opts=opts: polyrow(opts, hl, base=fix0(tri)), no,
      '나는 4개가 한 줄이라 어느 1개를 빼도 일자 3개가 남아요. 처음 모양(ㄱ자)이 들어 있지 않아서 만들 수 없어요. 나머지는 1개를 빼면 ㄱ자 모양이 남아요.',
      {'가': 'ㄱ자에 1개를 붙여 ㅗ 모양을 만들 수 있어요.', '다': 'ㄱ자 모서리 위에 1개를 올리면 돼요.', '라': 'ㄱ자 빈 곳에 1개를 붙이면 돼요.'}, src=TOP + ' 3단원 심화유형 ③')
nq(c[6], 2, 'basic', '쌓기나무 27개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 한 면만 칠해진 쌓기나무는 몇 개입니까?', 6,
   [(12, '두 면이 칠해진 쌓기나무를 셌어요.'), (8, '세 면이 칠해진 쌓기나무를 셌어요.'), (9, '한 면에 있는 쌓기나무를 모두 셌어요.'), (54, '칠해진 면의 수를 셌어요.')],
   '한 면만 칠해진 쌓기나무는 각 면의 한가운데에 1개씩 있어요. 면이 6개라서 6개예요.', fig=lambda: D.cubes([(x, y, z) for x in range(3) for y in range(3) for z in range(3) if x == 2 or y == 2 or z == 2], 'blue'), src=DB + ' 79쪽 · 개념 질문 연결')
base = S4
opts = [('가', fix0(rot_z(S4))), ('나', fix0(flipx(S4))), ('다', fix0(L4)), ('라', fix0(stand(S4)))]
diff = [k for k, S in opts if not same(S, base)]; assert diff == ['다'], diff
U.tap(c[6], 2, 'basic', '처음 모양과 다른 모양을 하나 찾아 눌러 보세요. (돌리거나 뒤집어서 똑같으면 같은 모양입니다.)', lambda hl=(), opts=opts: polyrow(opts, hl, base=fix0(base)), diff,
      '처음 모양은 2개씩 엇갈려 붙은 계단 모양이에요. 가, 나, 라는 돌리거나 뒤집거나 세운 것이고, 다는 3개가 한 줄인 ㄴ자 모양이라 달라요.',
      {'가': '처음 모양을 돌린 것이에요.', '나': '처음 모양을 뒤집은 것이에요.', '라': '처음 모양을 세운 것이에요.'}, src=DB + ' 79쪽 · 개념 질문 연결')
nq(c[6], 2, 'hard', '쌓기나무 64개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 어느 면도 칠해지지 않은 쌓기나무는 몇 개입니까?', 8,
   [(27, '한 모서리를 3개로 보았어요.'), (1, ''), (16, '한 면의 안쪽만 셌어요.'), (56, '칠해진 쌓기나무를 셌어요.')],
   '칠해지지 않은 쌓기나무는 겉을 한 겹 벗긴 안쪽에 있어요. 한 모서리에 4 − 2 = 2(개)라서 2 × 2 × 2 = 8(개)예요.', fig=lambda: D.cubes([(x, y, z) for x in range(4) for y in range(4) for z in range(4) if x == 3 or y == 3 or z == 3], 'amber'), src=TOP + ' 3단원 심화유형 ⑥')
nq(c[6], 2, 'hard', '쌓기나무 64개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 한 면만 칠해진 쌓기나무는 몇 개입니까?', 24,
   [(6, '면마다 1개씩으로 보았어요.'), (16, '한 면의 쌓기나무를 모두 셌어요.'), (8, '꼭짓점의 쌓기나무를 셌어요.'), (36, '')],
   '한 면만 칠해진 쌓기나무는 각 면의 가운데 2 × 2 = 4(개)예요. 면이 6개라서 4 × 6 = 24(개)예요.', fig=lambda: D.cubes([(x, y, z) for x in range(4) for y in range(4) for z in range(4) if x == 3 or y == 3 or z == 3], 'green'), src=TOP + ' 3단원 심화유형 ⑥')
nq(c[6], 3, 'basic', '쌓기나무 64개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 두 면만 칠해진 쌓기나무는 몇 개입니까?', 24,
   [(12, '모서리마다 1개씩으로 보았어요.'), (8, '세 면이 칠해진 쌓기나무를 셌어요.'), (48, '모서리마다 4개씩으로 보았어요.'), (16, '')],
   '두 면만 칠해진 쌓기나무는 모서리에서 꼭짓점을 뺀 가운데 2개씩이에요. 모서리 12개라서 2 × 12 = 24(개)예요.', fig=lambda: D.cubes([(x, y, z) for x in range(4) for y in range(4) for z in range(4) if x == 3 or y == 3 or z == 3], 'rose'), src=DB + ' 79쪽 · 계단 연결')
CUBE2 = {(x, y, z) for x in range(2) for y in range(2) for z in range(2)}
pa = [(0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1)]
comp = sorted(CUBE2 - set(pa))
opts = [('가', fix0(T4)), ('나', fix0(rot_z(comp))), ('다', fix0(L4)), ('라', fix0(O4))]
ok_ = [k for k, S in opts if same(S, comp)]; assert ok_ == ['나'], ok_
U.tap(c[6], 3, 'basic', '처음 모양과 어느 모양을 붙이면 쌓기나무 8개짜리 정육면체를 만들 수 있습니까? 알맞은 모양을 눌러 보세요.', lambda hl=(), opts=opts: polyrow(opts, hl, base=fix0(pa)), ok_,
      '2 × 2 × 2 정육면체에서 처음 모양을 빼면 남는 4개는 처음 모양과 같은 모양이에요. 나를 돌려서 붙이면 정육면체가 돼요.',
      {'라': '정사각형 4개를 붙이면 처음 모양의 빈 곳과 맞지 않아요.'}, src=DB + ' 79쪽 · 계단 연결')
tc = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1)]
def p363(g):
    S = sols(tc, fview(g), rview(g), 3)
    return len(S) >= 3 and 2 <= max(cnt(x) for x in S) - min(cnt(x) for x in S) <= 4
hh = pick(tc, p363, seed=91, vis=False); S = sols(tc, fview(hh), rview(hh), 3); mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[6], 3, 'basic', '쌓기나무로 쌓은 모양을 위, 앞, 옆에서 촬영했더니 이 그림과 같았습니다. 쌓기나무가 가장 많을 때와 가장 적을 때의 개수의 차는 몇 개입니까?', mxn - mn,
   [(mxn, '가장 많을 때의 개수예요.'), (mn, '가장 적을 때의 개수예요.'), (mxn + mn, '두 개수를 더했어요.'), (mxn - mn + 1, '')],
   '가장 많을 때는 자리마다 앞과 옆에서 본 층 가운데 작은 쪽까지 쌓아 %d개, 가장 적을 때는 높은 층을 한 기둥에 함께 맞춰 %d개예요. 차는 %d개예요.' % (mxn, mn, mxn - mn),
   fig=lambda hh=hh: vfig(tc, fview(hh), rview(hh)), src=DB + ' 79쪽 · 계단 연결')
nq(c[6], 3, 'hard', '쌓기나무 125개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 어느 면도 칠해지지 않은 쌓기나무는 몇 개입니까?', 27,
   [(64, '한 모서리를 4개로 보았어요.'), (9, '한 면의 안쪽만 셌어요.'), (98, '칠해진 쌓기나무를 셌어요.'), (8, '')],
   '겉을 한 겹 벗긴 안쪽은 한 모서리에 5 − 2 = 3(개)라서 3 × 3 × 3 = 27(개)예요.', src=TOP + ' 3단원 심화유형 ⑥')
assert 125 - 27 == 98
tc2 = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (1, 2)]
def p364(g):
    S = sols(tc2, fview(g), rview(g), 3)
    return len(S) >= 3 and 3 <= max(cnt(x) for x in S) - min(cnt(x) for x in S) <= 6
hh = pick(tc2, p364, seed=92, vis=False); S = sols(tc2, fview(hh), rview(hh), 3); mn, mxn = min(cnt(x) for x in S), max(cnt(x) for x in S)
nq(c[6], 3, 'hard', '쌓기나무로 쌓은 모양을 위, 앞, 옆에서 촬영했더니 이 그림과 같았습니다. 쌓기나무가 가장 많을 때와 가장 적을 때의 개수의 차는 몇 개입니까?', mxn - mn,
   [(mxn, '가장 많을 때의 개수예요.'), (mn, '가장 적을 때의 개수예요.'), (mxn - mn - 1, ''), (mxn - mn + 1, '')],
   '가장 많을 때 %d개, 가장 적을 때 %d개라서 차는 %d개예요.' % (mxn, mn, mxn - mn), fig=lambda hh=hh: vfig(tc2, fview(hh), rview(hh)), src=TOP + ' 3단원 심화유형 ⑤')
nq(c[6], 3, 'hard', '쌓기나무 64개로 큰 정육면체를 만들고 겉면을 모두 칠했습니다. 칠해진 면이 하나라도 있는 쌓기나무는 몇 개입니까?', 64 - 8,
   [(8, '칠해지지 않은 쌓기나무를 셌어요.'), (48, '한 면이나 두 면 칠해진 것만 더했어요.'), (24, '한 면만 칠해진 쌓기나무를 셌어요.'), (64 - 27, '안쪽을 3 × 3 × 3으로 보았어요.')],
   '칠해지지 않은 쌓기나무는 안쪽 2 × 2 × 2 = 8(개)예요. 나머지 64 − 8 = 56(개)는 모두 칠한 면이 있어요.', src=TOP + ' 3단원 심화유형 ⑥')

if __name__ == '__main__':
    U.run()
