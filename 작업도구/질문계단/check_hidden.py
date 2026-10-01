# -*- coding: utf-8 -*-
"""쌓기나무 입체 그림에서 **기둥 맨 위 면이 얼마나 보이는지** 잰다 (마스터 지적 2026-09-29).
   앞·오른쪽 대각선에 더 높은 기둥이 있으면 뒤 기둥이 통째로 가려져 아이가 몇 층인지 알 수 없다.
   0% 인 기둥이 있으면 그 그림은 쓰지 말 것(모양을 바꾼다).
   쓰는 법:  from check_hidden import visible;  visible({(열,행): 높이, …})  → [((열,행), 높이, 보이는 %)]
"""
import draw as D
from PIL import Image, ImageDraw

def visible(h, S=4):
    im = Image.new('I', (1600, 1600), 0); d = ImageDraw.Draw(im)
    bl = [(c, r, k) for (c, r), n in h.items() for k in range(n)]
    ids = {}
    for i, (c, r, k) in enumerate(sorted(bl, key=lambda b: (b[0] + b[1], b[2]))):
        x = (c - r) * D.W; y = (c + r) * D.H - k * D.Z
        T = lambda pts: [(800 + px * S, 800 + py * S) for px, py in pts]
        d.polygon(T([(x - D.W, y + D.H), (x, y + 2 * D.H), (x, y + 2 * D.H + D.Z), (x - D.W, y + D.H + D.Z)]), fill=0)
        d.polygon(T([(x, y + 2 * D.H), (x + D.W, y + D.H), (x + D.W, y + D.H + D.Z), (x, y + 2 * D.H + D.Z)]), fill=0)
        ids[1000 + i] = (c, r, k)
        d.polygon(T([(x, y), (x + D.W, y + D.H), (x, y + 2 * D.H), (x - D.W, y + D.H)]), fill=1000 + i)
    px = im.load(); cnt = {}
    for yy in range(0, 1600, 2):
        for xx in range(0, 1600, 2):
            v = px[xx, yy]
            if v >= 1000: cnt[v] = cnt.get(v, 0) + 1
    tops = [(tid, c, r) for tid, (c, r, k) in ids.items() if k == h[(c, r)] - 1]
    mx = max(cnt.get(t, 0) for t, _, _ in tops) or 1
    return [((c, r), h[(c, r)], round(100 * cnt.get(t, 0) / mx)) for t, c, r in tops]
