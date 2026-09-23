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

def regular(n, r, center=(0, 0), color='blue', start=-90):
    """정n각형"""
    import math
    cx, cy = center
    pts = [(cx + r * math.cos(math.radians(start + 360.0 * i / n)),
            cy + r * math.sin(math.radians(start + 360.0 * i / n))) for i in range(n)]
    return pts
