# -*- coding: utf-8 -*-
"""쌓기나무 그림 그리기 — 학생 질문 화면에 뜨는 SVG를 직접 만든다.

왜 직접 그리나 (마스터 2026-09-23)
  "그림이 좀 허접해 보이는 부분이 있고, 너무 같은 그림으로 재탕하는 느낌이라 더 없어 보여.
   우리가 앱을 최종적으로 완성했을 때 이 앱이 고급스러운 느낌을 줄 수 있도록 항상 생각해줘."
  → ddFig 는 평면만 그린다(입체 없음). 쌓기나무를 단색 네모 격자로만 보여 주니 허접했다.
    여기서는 **정육면체를 실제 입체로** 그린다. 면마다 밝기를 달리해 깊이를 주고,
    격자 그림도 같은 색·같은 선 굵기로 맞춰 한 앱처럼 보이게 한다.

쓰는 법
  cubes([(열,행,층), …])            쌓은 모양을 입체로
  grid(cells, nums=…, name=…)       위·앞·옆·층별 모양 (평면 격자)
  row([그림1, 그림2, …])             여러 장을 가로로 나란히
  → 모두 svg 문자열을 돌려준다. review/fig_e6-2.js 에 {svg:'…'} 로 넣는다.
"""
import html

# 앱 색조에 맞춘 색 (dodream.html 의 보라·파랑 계열)
INK   = '#2A2350'      # 글자
SOFT  = '#8A7BB0'      # 흐린 글자
LINE  = '#C9D6E8'      # 옅은 선
PAL = {
 'blue':  {'top': '#DCEAFB', 'left': '#A9C8EC', 'right': '#8DB4E2', 'edge': '#3B6FA8'},
 'amber': {'top': '#FCEFD2', 'left': '#F0D49A', 'right': '#E5C07B', 'edge': '#A97C22'},
 'green': {'top': '#DDF0E6', 'left': '#AEDAC3', 'right': '#93CBAE', 'edge': '#3C8B64'},
 'rose':  {'top': '#FBE0DA', 'left': '#F0B5A8', 'right': '#E59E8D', 'edge': '#B55B45'},
}
FLAT = {   # 평면 격자용 (채움, 테두리)
 'blue':  ('#E8F1FC', '#3B6FA8'), 'amber': ('#FDF3E0', '#A97C22'),
 'green': ('#E6F4EC', '#3C8B64'), 'rose':  ('#FCEAE5', '#B55B45'),
}

W, H, Z = 27, 15.5, 31      # 정육면체 한 칸의 가로 반폭 · 세로 반높이 · 높이


def _textw(t, size):
    """글자 폭 어림 — 한글은 글자 크기만큼, 나머지는 그 절반쯤"""
    return sum(size if ord(c) > 0x1100 else size * 0.54 for c in str(t))

def _poly(pts, fill, stroke, sw=1.1):
    d = ' '.join('%.1f,%.1f' % p for p in pts)
    return ('<polygon points="%s" fill="%s" stroke="%s" stroke-width="%s" '
            'stroke-linejoin="round"/>' % (d, fill, stroke, sw))


def _txt(x, y, s, size=13, fill=INK, weight=700, anchor='middle'):
    return ('<text x="%.1f" y="%.1f" font-size="%d" font-weight="%d" fill="%s" '
            'text-anchor="%s" font-family="Pretendard,\'맑은 고딕\',sans-serif">%s</text>'
            % (x, y, size, weight, fill, anchor, html.escape(str(s))))


class Fig:
    """그림 한 장 — 좌표를 쌓아 두었다가 마지막에 크기를 재서 SVG로 만든다."""
    def __init__(self):
        self.body, self.xs, self.ys = [], [], []

    def add(self, svg, pts):
        self.body.append(svg)
        for x, y in pts:
            self.xs.append(x); self.ys.append(y)

    def bbox(self, pad=14):
        return (min(self.xs) - pad, min(self.ys) - pad,
                max(self.xs) - min(self.xs) + 2 * pad, max(self.ys) - min(self.ys) + 2 * pad)


def cubes(blocks, color='blue', origin=(0, 0), title=None):
    """blocks: [(c, r, h), …] c=오른쪽으로, **r=앞쪽으로**, h=층(0부터).
    화면에서 c·r 이 커질수록 아래(= 보는 사람 쪽)로 온다. 그래서 (c+r) 이 작은 것부터 그려야 뒤가 먼저 깔린다."""
    f = Fig()
    ox, oy = origin
    P = PAL[color]
    for (c, r, h) in sorted(blocks, key=lambda b: (b[0] + b[1], b[2])):
        x = ox + (c - r) * W
        y = oy + (c + r) * H - h * Z
        top   = [(x, y), (x + W, y + H), (x, y + 2 * H), (x - W, y + H)]
        left  = [(x - W, y + H), (x, y + 2 * H), (x, y + 2 * H + Z), (x - W, y + H + Z)]
        right = [(x, y + 2 * H), (x + W, y + H), (x + W, y + H + Z), (x, y + 2 * H + Z)]
        f.add(_poly(left,  P['left'],  P['edge']), left)
        f.add(_poly(right, P['right'], P['edge']), right)
        f.add(_poly(top,   P['top'],   P['edge']), top)
    if title:
        x0, y0, w, _h = f.bbox(0)
        f.add(_txt(x0 + w / 2, y0 - 12, title, 13, SOFT), [(x0, y0 - 24), (x0 + w, y0 - 24)])
    return f


CELL = 44


def grid(cells, nums=None, color='blue', origin=(0, 0), title=None, dim=None):
    """평면 격자 (위·앞·옆·층별 모양). dim: 흐리게 그릴 칸 목록"""
    f = Fig()
    ox, oy = origin
    fill, edge = FLAT[color]
    for (c, r) in cells:
        x, y = ox + c * CELL, oy + r * CELL
        pts = [(x, y), (x + CELL, y), (x + CELL, y + CELL), (x, y + CELL)]
        soft = dim and (c, r) in dim
        f.add('<rect x="%.1f" y="%.1f" width="%d" height="%d" rx="4" fill="%s" stroke="%s" '
              'stroke-width="1.4"%s/>' % (x, y, CELL, CELL, fill, edge,
                                          ' stroke-dasharray="4 3" opacity=".55"' if soft else ''), pts)
        if nums and (c, r) in nums:
            f.add(_txt(x + CELL / 2, y + CELL / 2 + 6, nums[(c, r)], 16, edge), [])
    if title:
        x0, y0, w, _h = f.bbox(0)
        f.add(_txt(x0 + w / 2, y0 - 11, title, 13, SOFT), [(x0, y0 - 22), (x0 + w, y0 - 22)])
    return f


def arrow(x1, y1, x2, y2, label=None, color=SOFT):
    """보는 방향 화살표"""
    f = Fig()
    f.add('<defs><marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">'
          '<path d="M0,0 L7,3 L0,6 z" fill="%s"/></marker></defs>' % color, [])
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.6" '
          'stroke-dasharray="5 4" marker-end="url(#ah)"/>' % (x1, y1, x2, y2, color),
          [(x1, y1), (x2, y2)])
    if label:
        if abs(y2 - y1) < abs(x2 - x1):          # 가로 화살표 — 글자를 위에 두어 그림과 안 겹치게
            f.add(_txt((x1 + x2) / 2, y1 - 12, label, 12, color, 600), [((x1 + x2) / 2, y1 - 24)])
        else:
            f.add(_txt((x1 + x2) / 2, y1 + (18 if y2 >= y1 else -10), label, 12, color, 600), [])
    return f


def view_arrow(fig, side, label=None, length=64, color=SOFT):
    """입체 그림을 **어느 쪽에서 보는지** 나타내는 비스듬한 화살표.

    side = 'front'(앞) | 'right'(오른쪽 옆) | 'left'(왼쪽 옆)
    투영이 x=(c-r)*W, y=(c+r)*H 이므로 화면에서
      앞쪽(+r)은 왼쪽 아래 · 오른쪽(+c)은 오른쪽 아래로 간다.
    → 앞에서 보는 사람은 **왼쪽 아래에서 오른쪽 위로**, 오른쪽 옆에서 보는 사람은 **오른쪽 아래에서 왼쪽 위로** 본다.
    수직·수평 화살표를 쓰면 아이가 방향을 헷갈린다(마스터 지적 2026-09-26).
    """
    import math
    L = math.hypot(W, H)
    ux, uy = W / L, H / L                       # 화면에서 c 가 커지는 쪽(오른쪽 아래)의 단위 벡터
    x0, y0, w, h = fig.bbox(0)
    if side == 'front':                         # 왼쪽 아래 → 오른쪽 위
        head = (x0 + w * 0.26, y0 + h + 10)
        dx, dy = ux, -uy
        at, anc = 'below', 'end'
    elif side == 'right':                       # 오른쪽 아래 → 왼쪽 위
        head = (x0 + w * 0.78, y0 + h + 10)
        dx, dy = -ux, -uy
        at, anc = 'below', 'start'
    else:                                       # 'left' — 왼쪽 위 → 오른쪽 아래
        head = (x0 + w * 0.22, y0 - 10)
        dx, dy = ux, uy
        at, anc = 'above', 'end'
    tail = (head[0] - dx * length, head[1] - dy * length)

    f = Fig()
    f.add('<defs><marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">'
          '<path d="M0,0 L7,3 L0,6 z" fill="%s"/></marker></defs>' % color, [])
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.6" '
          'stroke-dasharray="5 4" marker-end="url(#ah)"/>'
          % (tail[0], tail[1], head[0], head[1], color), [tail, head])
    if label:
        ly = tail[1] + (16 if at == 'below' else -8)
        lx = tail[0] + (-4 if anc == 'end' else 4)
        f = merge(f, tag(lx, ly, label, color, 12, 600, anc))
    return f


def row(figs, gap=46):
    """여러 장을 가로로 나란히 — 각 그림을 자기 자리로 옮긴다"""
    out = Fig()
    dx = 0.0
    for f in figs:
        x0, y0, w, h = f.bbox(0)
        shift = dx - x0
        out.body.append('<g transform="translate(%.1f,0)">%s</g>' % (shift, ''.join(f.body)))
        out.xs += [x + shift for x in f.xs]; out.ys += f.ys
        dx += w + gap
    return out


def svg(f, pad=16, note=None):
    x, y, w, h = f.bbox(pad)
    body = ''.join(f.body)
    if note:
        need = sum(12.9 if ord(ch) > 0x1100 else 6.8 for ch in note) + 30   # 한글은 글자 크기만큼 넓다
        if need > w:
            x -= (need - w) / 2; w = need
        body += _txt(x + w / 2, y + h + 6, note, 12.5, SOFT, 500)
        h += 22
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%.1f %.1f %.1f %.1f" '
            'width="%.0f" style="max-width:100%%;height:auto">%s</svg>' % (x, y, w, h, min(w, 560), body))


def merge(*figs):
    """같은 좌표계 위에 겹쳐 그리기"""
    out = Fig()
    for f in figs:
        out.body += f.body; out.xs += f.xs; out.ys += f.ys
    return out


def side(heights, color='amber', origin=(0, 0), title=None):
    """앞·옆에서 본 모양 — heights: 왼쪽부터 각 줄의 층수. 아래 줄이 1층이 되게 쌓아 그린다."""
    top = max(heights)
    cells = [(i, top - k - 1) for i, n in enumerate(heights) for k in range(n)]
    return grid(cells, color=color, origin=origin, title=title)


def topview(spec_or_cells, color='blue', origin=(0, 0), title=None, nums=None):
    """위에서 본 모양 — 입체의 (c, r) 을 그대로 쓴다.
    입체에서도 r 이 커질수록 앞쪽(화면 아래)이고 격자도 r 이 커질수록 아래라서 방향이 이미 맞는다."""
    cells = list(spec_or_cells.keys()) if isinstance(spec_or_cells, dict) else list(spec_or_cells)
    return grid(list(cells), nums=(dict(nums) if nums else None), color=color, origin=origin, title=title)


# ══════════════════════════════════════════════════════════════════
#  평면도형 (넓이·둘레 단원) — 입체 그림과 같은 색·선 굵기로 맞춘다
# ══════════════════════════════════════════════════════════════════
S = 26          # 1 cm = 26 px

def poly(pts, color='blue', fill=True, style='solid', title=None):
    """임의 다각형. pts = [(x, y), …] (px 좌표)"""
    f = Fig()
    bg, edge = FLAT[color]
    dash = ' stroke-dasharray="5 4"' if style == 'dashed' else ''
    d = ' '.join('%.1f,%.1f' % p for p in pts)
    f.add('<polygon points="%s" fill="%s" stroke="%s" stroke-width="1.6" stroke-linejoin="round"%s/>'
          % (d, bg if fill else 'none', edge, dash), pts)
    if title:
        x0, y0, w, _h = f.bbox(0)
        f.add(_txt(x0 + w / 2, y0 - 12, title, 13, SOFT), [(x0, y0 - 24), (x0 + w, y0 - 24)])
    return f

def seg(p1, p2, style='solid', color='#6E6A86', width=1.4):
    f = Fig()
    dash = ' stroke-dasharray="5 4"' if style == 'dashed' else ''
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="%s"%s/>'
          % (p1[0], p1[1], p2[0], p2[1], color, width, dash), [p1, p2])
    return f

def dim_h(x1, x2, y, text, below=True, color=SOFT):
    """가로 치수선 (— 길이 —)"""
    f = Fig()
    t = 5 if below else -5
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1"/>'
          % (x1, y, x2, y, color), [(x1, y), (x2, y)])
    for x in (x1, x2):
        f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1"/>'
              % (x, y - 4, x, y + 4, color), [(x, y - 4), (x, y + 4)])
    yy = y + (16 if below else -8)
    w = _textw(text, 12.5)
    f.add(_txt((x1 + x2) / 2, yy, text, 12.5, color, 700),
          [((x1 + x2) / 2 - w / 2, yy + t), ((x1 + x2) / 2 + w / 2, yy + t)])
    return f

def dim_v(y1, y2, x, text, left=True, color=SOFT):
    """세로 치수선"""
    f = Fig()
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1"/>'
          % (x, y1, x, y2, color), [(x, y1), (x, y2)])
    for y in (y1, y2):
        f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1"/>'
              % (x - 4, y, x + 4, y, color), [(x - 4, y), (x + 4, y)])
    xx = x + (-9 if left else 9)
    w = _textw(text, 12.5)
    f.add(_txt(xx, (y1 + y2) / 2 + 4, text, 12.5, color, 700, 'end' if left else 'start'),
          [(xx - (w if left else 0), (y1 + y2) / 2), (xx + (0 if left else w), (y1 + y2) / 2)])
    return f

def right_angle(corner, p1, p2, size=10, color='#6E6A86'):
    """직각 표시 — corner 에서 p1·p2 쪽으로"""
    import math
    def unit(a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy) or 1
        return dx / L, dy / L
    u1, u2 = unit(corner, p1), unit(corner, p2)
    a = (corner[0] + u1[0] * size, corner[1] + u1[1] * size)
    b = (corner[0] + (u1[0] + u2[0]) * size, corner[1] + (u1[1] + u2[1]) * size)
    c = (corner[0] + u2[0] * size, corner[1] + u2[1] * size)
    f = Fig()
    f.add('<polyline points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="none" stroke="%s" stroke-width="1.3"/>'
          % (a[0], a[1], b[0], b[1], c[0], c[1], color), [a, b, c])
    return f

def ticks(p1, p2, n=1, color='#6E6A86'):
    """같은 길이 표시 — 변 가운데에 빗금 n 개"""
    import math
    mx, my = (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2
    dx, dy = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L          # 변 방향
    nx, ny = -uy, ux                 # 수직 방향
    f = Fig()
    for i in range(n):
        off = (i - (n - 1) / 2.0) * 5
        cx, cy = mx + ux * off, my + uy * off
        f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.4"/>'
              % (cx - nx * 5, cy - ny * 5, cx + nx * 5, cy + ny * 5, color),
              [(cx - nx * 5, cy - ny * 5), (cx + nx * 5, cy + ny * 5)])
    return f

def unit_grid(cols, rows, origin=(0, 0), color='blue', mark=None):
    """1 cm² 격자로 채운 직사각형. mark: 표시할 칸 [(c,r), …]"""
    f = Fig()
    ox, oy = origin
    bg, edge = FLAT[color]
    for r in range(rows):
        for c in range(cols):
            x, y = ox + c * S, oy + r * S
            hot = mark and (c, r) in mark
            f.add('<rect x="%.1f" y="%.1f" width="%d" height="%d" fill="%s" stroke="%s" stroke-width="%s"/>'
                  % (x, y, S, S, '#FFF3D4' if hot else bg, edge, 1.5 if hot else 0.7),
                  [(x, y), (x + S, y + S)])
    f.add('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="none" stroke="%s" stroke-width="1.8"/>'
          % (ox, oy, cols * S, rows * S, edge), [(ox, oy), (ox + cols * S, oy + rows * S)])
    return f

def tag(x, y, text, color=INK, size=12.5, weight=700, anchor='middle'):
    """글자. 글자가 차지하는 폭까지 화면 크기에 넣는다(안 넣으면 잘린다)"""
    w = _textw(text, size)
    x0 = x - w / 2 if anchor == 'middle' else (x if anchor == 'start' else x - w)
    f = Fig(); f.add(_txt(x, y, text, size, color, weight, anchor),
                     [(x0, y - size), (x0 + w, y + 4)])
    return f

def to_arrow(x, y, text='자르면'):
    """유도 그림 사이의 → 표시"""
    f = Fig()
    f.add('<defs><marker id="ar2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">'
          '<path d="M0,0 L7,3 L0,6 z" fill="%s"/></marker></defs>' % SOFT, [])
    f.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.6" marker-end="url(#ar2)"/>'
          % (x, y, x + 30, y, SOFT), [(x, y), (x + 30, y)])
    f.add(_txt(x + 15, y - 9, text, 11.5, SOFT, 600), [(x - 8, y - 20), (x + 38, y - 20)])
    return f

def ang(corner, p1, p2, text=None, r=22, color='#B55B45', size=12.5):
    """각 표시 — corner 에서 p1 쪽부터 p2 쪽까지 호를 그리고 가운데에 글자.
    text 를 '?' 로 두면 구해야 하는 각. **답이 되는 값은 적지 말 것**(대전제 세부 원칙)."""
    import math
    a1 = math.atan2(p1[1] - corner[1], p1[0] - corner[0])
    a2 = math.atan2(p2[1] - corner[1], p2[0] - corner[0])
    d = (a2 - a1) % (2 * math.pi)
    if d > math.pi:                      # 늘 작은 쪽 각을 그린다
        a1, a2, d = a2, a1, 2 * math.pi - d
    f = Fig()
    pa = (corner[0] + math.cos(a1) * r, corner[1] + math.sin(a1) * r)
    pb = (corner[0] + math.cos(a1 + d) * r, corner[1] + math.sin(a1 + d) * r)
    f.add('<path d="M%.1f,%.1f A%.1f,%.1f 0 0 1 %.1f,%.1f" fill="none" stroke="%s" stroke-width="1.5"/>'
          % (pa[0], pa[1], r, r, pb[0], pb[1], color), [pa, pb, corner])
    if text:
        am = a1 + d / 2
        tx, ty = corner[0] + math.cos(am) * (r + 15), corner[1] + math.sin(am) * (r + 15)
        w = _textw(text, size)
        f.add(_txt(tx, ty + 4, text, size, color, 800),
              [(tx - w / 2, ty - size), (tx + w / 2, ty + 6)])
    return f


def dot(p, label=None, color='#3B6FA8', at='above', size=12.5):
    """점 하나 + 이름. at: above/below/left/right"""
    f = Fig()
    f.add('<circle cx="%.1f" cy="%.1f" r="3.4" fill="%s"/>' % (p[0], p[1], color),
          [(p[0] - 4, p[1] - 4), (p[0] + 4, p[1] + 4)])
    if label:
        dx, dy, an = {'above': (0, -10, 'middle'), 'below': (0, 17, 'middle'),
                      'left': (-8, 4, 'end'), 'right': (8, 4, 'start')}[at]
        w = _textw(label, size)
        x0 = p[0] + dx - (w / 2 if an == 'middle' else (w if an == 'end' else 0))
        f.add(_txt(p[0] + dx, p[1] + dy, label, size, INK, 700, an),
              [(x0, p[1] + dy - size), (x0 + w, p[1] + dy + 4)])
    return f


def ray(p1, p2, label=None, style='solid', color='#6E6A86', width=1.5, over=0):
    """직선 — over 만큼 양끝을 더 늘여 그린다(직선 '가' 처럼 끝이 없는 느낌)."""
    import math
    dx, dy = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    a = (p1[0] - ux * over, p1[1] - uy * over)
    b = (p2[0] + ux * over, p2[1] + uy * over)
    f = seg(a, b, style, color, width)
    if label:
        f = merge(f, tag(b[0] + 12, b[1] + 4, label, SOFT, 12.5))
    return f


U3 = 22          # 겨냥도 1 cm = 22 px (S 보다 작게 — 입체는 세 방향으로 커진다)
DEPTH = 0.55     # 깊이 모서리를 45° 로 이만큼 줄여 그린다 (교재 겨냥도 모양)

# 꼭짓점 이름 — 위 면 ㄱㄴㄷㄹ · 아래 면 ㅁㅂㅅㅇ (ㅇ 이 보이지 않는 꼭짓점)
BOX_V = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ']


def box_pts(w, d, h, origin=(0, 0)):
    """겨냥도 꼭짓점 8개 — 앞 위왼(ㄱ)·앞 위오(ㄴ)·뒤 위오(ㄷ)·뒤 위왼(ㄹ)·
    앞 아래왼(ㅁ)·앞 아래오(ㅂ)·뒤 아래오(ㅅ)·뒤 아래왼(ㅇ) 순서."""
    ox, oy = origin
    W3, H3 = w * U3, h * U3
    e = d * U3 * DEPTH * 0.7071            # 45° 로 비스듬히
    FTL = (ox, oy);            FTR = (ox + W3, oy)
    FBL = (ox, oy + H3);       FBR = (ox + W3, oy + H3)
    BTL = (FTL[0] + e, FTL[1] - e); BTR = (FTR[0] + e, FTR[1] - e)
    BBL = (FBL[0] + e, FBL[1] - e); BBR = (FBR[0] + e, FBR[1] - e)
    return [FTL, FTR, BTR, BTL, FBL, FBR, BBR, BBL]


def box(w, d, h, origin=(0, 0), color='blue', verts=False, dims=None,
        hide=True, all_solid=False, base=False, title=None):
    """직육면체 겨냥도.
      verts=True   꼭짓점 이름 ㄱ~ㅇ (교재 방식 — 면을 '면 ㄱㄴㅂㅁ' 처럼 부를 수 있다)
      dims         {'w':'5 cm','d':'3 cm','h':'4 cm'} 중 필요한 것만
      hide=False   보이지 않는 모서리를 안 그린다
      all_solid    12개 모서리를 **전부 실선**으로 (어디가 점선이어야 하는지 묻는 질문용)
      base=True    밑면 하나를 옅게 칠한다 (밑면을 정했다는 조건)
    """
    g = box_pts(w, d, h, origin)
    FTL, FTR, BTR, BTL, FBL, FBR, BBR, BBL = g
    bg, edge = FLAT[color]
    P3 = PAL[color]
    f = Fig()
    # 면 — 앞·오른쪽·위
    for pts, col in (([FTL, FTR, FBR, FBL], P3['left']),      # 앞면
                     ([FTR, BTR, BBR, FBR], P3['right']),     # 오른쪽 면
                     ([FTL, FTR, BTR, BTL], P3['top'])):      # 위면
        f.add(_poly(pts, col, edge, 0.9), pts)
    if base:      # 밑면으로 정한 면을 옅게 칠한다.
        # ⚠️ 아래 면은 **보이지 않는 면**이라 칠하면 상자 밖에 덧붙은 것처럼 보인다(9/26 확인).
        #    질문이 '한 면을 밑면으로 정하면' 이므로 보이는 위 면을 칠한다.
        bpts = [FTL, FTR, BTR, BTL]
        f.add(_poly(bpts, '#FFF3D4', edge, 0.9), bpts)
    solid = [(FTL, FTR), (FTR, FBR), (FBR, FBL), (FBL, FTL),    # 앞면 4
             (FTL, BTL), (FTR, BTR), (BTL, BTR),                # 위 3
             (FBR, BBR), (BBR, BTR)]                            # 오른쪽 2
    dash = [(BTL, BBL), (BBL, BBR), (FBL, BBL)]                 # 보이지 않는 3
    for p, q in solid:
        f = merge(f, seg(p, q, 'solid', edge, 1.6))
    for p, q in dash:
        f = merge(f, seg(p, q, 'solid' if all_solid else 'dashed', edge, 1.6))
    if verts:
        ats = ['left', 'right', 'right', 'above', 'left', 'below', 'right', 'below']
        for pt, nm, at in zip(g, BOX_V, ats):
            f = merge(f, dot(pt, nm, edge, at, 12))
    if dims:
        if dims.get('w'): f = merge(f, tag((FBL[0] + FBR[0]) / 2, FBL[1] + 19, dims['w'], SOFT, 12))
        if dims.get('h'): f = merge(f, tag(FTL[0] - 7, (FTL[1] + FBL[1]) / 2 + 4, dims['h'], SOFT, 12, 700, 'end'))
        if dims.get('d'): f = merge(f, tag((FBR[0] + BBR[0]) / 2 + 12, (FBR[1] + BBR[1]) / 2 + 12,
                                           dims['d'], SOFT, 12, 700, 'start'))
    if title:
        x0, y0, w2, _h = f.bbox(0)
        f.add(_txt(x0 + w2 / 2, y0 - 12, title, 13, SOFT), [(x0, y0 - 24), (x0 + w2, y0 - 24)])
    return f


def net(cells, colw, rowh, labels=None, color='blue', origin=(0, 0), title=None):
    """전개도. cells = [(열, 행), …] · colw/rowh = 열 너비·행 높이 목록(px).
    바깥 둘레는 **실선**(잘린 모서리) · 안쪽 맞닿은 선은 **점선**(접는 모서리) — 교재 규칙.
    labels = {(열,행): '글자'}"""
    ox, oy = origin
    bg, edge = FLAT[color]
    X = [ox]
    for w in colw: X.append(X[-1] + w)
    Y = [oy]
    for h in rowh: Y.append(Y[-1] + h)
    have = set(cells)
    f = Fig()
    for (c, r) in cells:
        pts = [(X[c], Y[r]), (X[c + 1], Y[r]), (X[c + 1], Y[r + 1]), (X[c], Y[r + 1])]
        f.add(_poly(pts, bg, 'none', 0), pts)
    for (c, r) in cells:                   # 모서리 — 이웃이 있으면 점선(접는 선)
        e4 = [((X[c], Y[r]), (X[c + 1], Y[r]), (c, r - 1)),          # 위
              ((X[c + 1], Y[r]), (X[c + 1], Y[r + 1]), (c + 1, r)),  # 오른쪽
              ((X[c], Y[r + 1]), (X[c + 1], Y[r + 1]), (c, r + 1)),  # 아래
              ((X[c], Y[r]), (X[c], Y[r + 1]), (c - 1, r))]          # 왼쪽
        for p, q, nb in e4:
            if nb in have:
                if nb > (c, r): f = merge(f, seg(p, q, 'dashed', edge, 1.1))
            else:
                f = merge(f, seg(p, q, 'solid', edge, 1.7))
    for (c, r), t in (labels or {}).items():
        f = merge(f, tag((X[c] + X[c + 1]) / 2, (Y[r] + Y[r + 1]) / 2 + 5, t, INK, 13.5))
    if title:
        x0, y0, w2, _h = f.bbox(0)
        f.add(_txt(x0 + w2 / 2, y0 - 12, title, 13, SOFT), [(x0, y0 - 24), (x0 + w2, y0 - 24)])
    return f


SHADE = ('#F6D58E', '#A97C22')     # 색칠한 부분 (채움, 테두리)
EK = 0.30                           # 입체 밑면 타원의 납작한 정도 (세로/가로)


def path(d, pts, fill='#E8F1FC', stroke='#3B6FA8', sw=1.6, dash=False, evenodd=False):
    """곡선이 든 도형. pts = 화면 크기를 잴 점들(곡선의 바깥 끝을 꼭 넣을 것)"""
    f = Fig()
    f.add('<path d="%s" fill="%s" stroke="%s" stroke-width="%s"%s%s stroke-linejoin="round"/>'
          % (d, fill, stroke, sw, ' stroke-dasharray="5 4"' if dash else '',
             ' fill-rule="evenodd"' if evenodd else ''), pts)
    return f


def circle(c, r, color='blue', fill=True, style='solid', sw=1.6):
    bg, edge = FLAT[color] if color in FLAT else (color, '#6E6A86')
    f = Fig()
    f.add('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" stroke="%s" stroke-width="%s"%s/>'
          % (c[0], c[1], r, bg if fill else 'none', edge, sw,
             ' stroke-dasharray="5 4"' if style == 'dashed' else ''),
          [(c[0] - r, c[1] - r), (c[0] + r, c[1] + r)])
    return f


def _ell_front_back(cx, cy, rx, ry, edge, back_dash=True):
    """밑면 타원 — 앞쪽 반(아래 호)은 실선, 뒤쪽 반(위 호)은 점선"""
    f = path('M%.1f,%.1f A%.1f,%.1f 0 0 0 %.1f,%.1f' % (cx - rx, cy, rx, ry, cx + rx, cy),
             [(cx - rx, cy), (cx + rx, cy + ry)], 'none', edge, 1.6)
    f = merge(f, path('M%.1f,%.1f A%.1f,%.1f 0 0 1 %.1f,%.1f' % (cx - rx, cy, rx, ry, cx + rx, cy),
                      [(cx - rx, cy - ry), (cx + rx, cy)], 'none', edge, 1.3, dash=back_dash))
    return f


def cyl(r, h, cx=0, top=0, color='blue'):
    """원기둥 — 위 밑면은 다 보이고, 아래 밑면은 앞쪽 반만 보인다"""
    P3 = PAL[color]; edge = P3['edge']; ry = r * EK
    yb = top + h
    body = ('M%.1f,%.1f L%.1f,%.1f A%.1f,%.1f 0 0 0 %.1f,%.1f L%.1f,%.1f A%.1f,%.1f 0 0 0 %.1f,%.1f Z'
            % (cx - r, top, cx - r, yb, r, ry, cx + r, yb, cx + r, top, r, ry, cx - r, top))
    f = path(body, [(cx - r, top - ry), (cx + r, yb + ry)], P3['left'], edge, 1.6)
    f = merge(f, _ell_front_back(cx, yb, r, ry, edge))
    f.add('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s" stroke="%s" stroke-width="1.6"/>'
          % (cx, top, r, ry, P3['top'], edge), [(cx - r, top - ry), (cx + r, top + ry)])
    return f


def cone(r, h, cx=0, apex=0, color='rose'):
    """원뿔 — 밑면 뒤쪽 반은 점선"""
    P3 = PAL[color]; edge = P3['edge']; ry = r * EK
    yb = apex + h
    body = ('M%.1f,%.1f L%.1f,%.1f A%.1f,%.1f 0 0 0 %.1f,%.1f Z'
            % (cx, apex, cx - r, yb, r, ry, cx + r, yb))
    f = path(body, [(cx, apex), (cx - r, yb), (cx + r, yb + ry)], P3['left'], edge, 1.6)
    return merge(f, _ell_front_back(cx, yb, r, ry, edge))


def sphere(r, c=(0, 0), color='green'):
    """구 — 적도 타원의 뒤쪽 반은 점선"""
    P3 = PAL[color]; edge = P3['edge']
    f = Fig()
    f.add('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" stroke="%s" stroke-width="1.6"/>'
          % (c[0], c[1], r, P3['left'], edge), [(c[0] - r, c[1] - r), (c[0] + r, c[1] + r)])
    return merge(f, _ell_front_back(c[0], c[1], r, r * EK, edge))


def spin(p1, p2, label='이 변을 기준으로 한 바퀴', color='#B55B45'):
    """회전축(점선, 양끝을 늘여 그림) + 축을 도는 화살표. 결과 입체는 그리지 않는다(= 답)."""
    import math
    dx, dy = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    a = (p1[0] - ux * 34, p1[1] - uy * 34)
    b = (p2[0] + ux * 22, p2[1] + uy * 22)
    f = seg(a, b, 'dashed', color, 1.6)
    # 축의 머리 쪽에 납작한 타원 호 + 화살표
    cx, cy = p1[0] - ux * 24, p1[1] - uy * 24      # 꼭짓점 이름과 겹치지 않게 축 끝에서 떨어뜨린다
    vertical = abs(dy) >= abs(dx)
    rx, ry = (17, 5.5) if vertical else (5.5, 17)
    s_ = (cx - rx, cy) if vertical else (cx, cy - ry)
    e_ = (cx + rx * 0.2, cy + ry) if vertical else (cx + rx, cy + ry * 0.2)
    f.add('<defs><marker id="sp" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">'
          '<path d="M0,0 L7,3 L0,6 z" fill="%s"/></marker></defs>' % color, [])
    f.add('<path d="M%.1f,%.1f A%.1f,%.1f 0 1 0 %.1f,%.1f" fill="none" stroke="%s" stroke-width="1.5" '
          'marker-end="url(#sp)"/>' % (s_[0], s_[1], rx, ry, e_[0], e_[1], color),
          [(cx - rx, cy - ry), (cx + rx, cy + ry)])
    if label:
        if vertical:
            f = merge(f, tag(cx + rx + 6, cy + 4, label, color, 11.5, 600, 'start'))
        else:
            f = merge(f, tag(cx - rx - 8, cy + 4, label, color, 11.5, 600, 'end'))
    return f


GRID = '#E4E9F3'


def linegraph(xs, ys, ymin, ymax, step, W=250, H=150, color='blue', bars=False, wave=False,
              order=None, label_every=1, unit_y=None, unit_x=None, title=None, origin=(0, 0)):
    """꺾은선그래프(교재 모양). ys 에 None 이 있으면 그 자리는 점을 찍지 않고 선도 끊는다.
      bars=True  막대그래프로
      wave=True  세로축 아래에 물결선(≈) — 0부터가 아니라 ymin 부터 그렸다는 표시
      order      점을 잇는 차례(틀린 그래프용). 없으면 왼쪽부터 차례로
      unit_y / unit_x  축 끝에 단위 — ⚠️ 가로·세로가 무엇인지 묻는 질문에서는 넣지 말 것(= 답)"""
    ox, oy = origin
    bg, edge = FLAT[color]
    n = len(xs); dx = W / float(n)
    X = lambda i: ox + dx * (i + 0.5)
    Y = lambda v: oy + H - (v - ymin) * H / float(ymax - ymin)
    f = Fig()
    f.add('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="#FFFFFF"/>' % (ox, oy, W, H),
          [(ox, oy), (ox + W, oy + H)])
    v, k = ymin, 0
    while v <= ymax + 1e-9:
        y = Y(v)
        f = merge(f, seg((ox, y), (ox + W, y), 'solid', GRID, 1))
        if k % label_every == 0:
            f = merge(f, tag(ox - 7, y + 4, ('%g' % v), SOFT, 11, 600, 'end'))
        v += step; k += 1
    for i in range(n):
        f = merge(f, seg((X(i), oy), (X(i), oy + H), 'solid', GRID, 1))
        f = merge(f, tag(X(i), oy + H + 16, xs[i], SOFT, 11, 600))
    f = merge(f, seg((ox, oy), (ox, oy + H), 'solid', '#6E6A86', 1.4),
                 seg((ox, oy + H), (ox + W, oy + H), 'solid', '#6E6A86', 1.4))
    if wave:     # 물결선 — 세로축을 가로지르는 ≈
        wy = oy + H - 9
        for dy_ in (-3, 3):
            f.add('<path d="M%.1f,%.1f q4,-5 8,0 t8,0" fill="none" stroke="#FFFFFF" stroke-width="5"/>'
                  % (ox - 8, wy + dy_), [(ox - 8, wy - 8), (ox + 8, wy + 8)])
        for dy_ in (-3, 3):
            f.add('<path d="M%.1f,%.1f q4,-5 8,0 t8,0" fill="none" stroke="#6E6A86" stroke-width="1.4"/>'
                  % (ox - 8, wy + dy_), [(ox - 8, wy - 8), (ox + 8, wy + 8)])
    pts = [(X(i), Y(y_)) if y_ is not None else None for i, y_ in enumerate(ys)]
    if bars:
        for i, p in enumerate(pts):
            if p is None: continue
            bw = dx * 0.5
            r = [(p[0] - bw / 2, p[1]), (p[0] + bw / 2, p[1]), (p[0] + bw / 2, oy + H), (p[0] - bw / 2, oy + H)]
            f.add(_poly(r, PAL[color]['left'], edge, 1), r)
    else:
        seq = order if order else list(range(n))
        for a, b in zip(seq, seq[1:]):
            if pts[a] is None or pts[b] is None: continue
            f = merge(f, seg(pts[a], pts[b], 'solid', edge, 2))
        for p in pts:
            if p is None: continue
            f.add('<circle cx="%.1f" cy="%.1f" r="3.6" fill="%s" stroke="#FFFFFF" stroke-width="1.2"/>'
                  % (p[0], p[1], edge), [(p[0] - 4, p[1] - 4), (p[0] + 4, p[1] + 4)])
    if unit_y: f = merge(f, tag(ox - 4, oy - 10, unit_y, SOFT, 11, 600, 'end'))
    if unit_x: f = merge(f, tag(ox + W + 6, oy + H + 16, unit_x, SOFT, 11, 600, 'start'))
    if title:  f = merge(f, tag(ox + W / 2, oy - 12, title, INK, 12.5, 700))
    return f


def table(rows, colw, rowh=26, origin=(0, 0), color='blue'):
    """표 — 첫 줄은 머리(옅게 칠함)"""
    ox, oy = origin
    bg, edge = FLAT[color]
    f = Fig()
    X = [ox]
    for w in colw: X.append(X[-1] + w)
    for r, row in enumerate(rows):
        y = oy + r * rowh
        for c, txt in enumerate(row):
            cell = [(X[c], y), (X[c + 1], y), (X[c + 1], y + rowh), (X[c], y + rowh)]
            f.add(_poly(cell, bg if r == 0 else '#FFFFFF', edge, 1), cell)
            f = merge(f, tag((X[c] + X[c + 1]) / 2, y + rowh / 2 + 4.5, txt, INK if r else edge, 11.5, 700 if r == 0 else 600))
    return f


def fr(x, y, whole, num, den, unit='', color=INK, size=12.5):
    """세운 분수 글자 (교재 모양) — 예: fr(0,0,'2','3','11',' km') → 2 3/11 km 를 위아래로.
    x = 글자 묶음의 가운데. SVG 글자는 mfmt 를 못 쓰므로 직접 세운다."""
    ws = _textw(whole, size) if whole else 0
    wf = max(_textw(num, size - 1.5), _textw(den, size - 1.5)) + 4
    wu = _textw(unit, size) if unit else 0
    x0 = x - (ws + (2 if whole else 0) + wf + wu) / 2.0
    f = Fig()
    if whole:
        f = merge(f, tag(x0 + ws / 2, y + 5, whole, color, size, 700))
        x0 += ws + 2
    cx = x0 + wf / 2
    f = merge(f, tag(cx, y - 2, num, color, size - 1.5, 700),
                 seg((x0, y + 1.5), (x0 + wf, y + 1.5), 'solid', color, 1.1),
                 tag(cx, y + 14, den, color, size - 1.5, 700))
    if unit:
        f = merge(f, tag(x0 + wf + 2, y + 5, unit, color, size, 600, 'start'))
    return f


def regular(n, r, center=(0, 0), color='blue', start=-90):
    """정n각형"""
    import math
    cx, cy = center
    pts = [(cx + r * math.cos(math.radians(start + 360.0 * i / n)),
            cy + r * math.sin(math.radians(start + 360.0 * i / n))) for i in range(n)]
    return pts
