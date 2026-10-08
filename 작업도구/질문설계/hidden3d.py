# -*- coding: utf-8 -*-
"""쌓기나무 입체 그림에서 기둥이 **면 하나라도** 보이는지 잰다(check_hidden 은 위 면만 잼).
   colpix(h, (c, r)) → 그 기둥이 화면에 보이는 픽셀 수(0 이면 완전히 숨음)"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
from PIL import Image, ImageDraw
def colpix(h, target, S=3):
    im = Image.new('L', (1200, 1200), 0); d = ImageDraw.Draw(im)
    bl = sorted([(c, r, k) for (c, r), n in h.items() for k in range(n)], key=lambda b: (b[0] + b[1], b[2]))
    for (c, r, k) in bl:
        x = (c - r) * D.W; y = (c + r) * D.H - k * D.Z
        T = lambda pts: [(600 + px * S, 600 + py * S) for px, py in pts]
        v = 7 if (c, r) == target else 1
        for poly in ([(x - D.W, y + D.H), (x, y + 2 * D.H), (x, y + 2 * D.H + D.Z), (x - D.W, y + D.H + D.Z)],
                     [(x, y + 2 * D.H), (x + D.W, y + D.H), (x + D.W, y + D.H + D.Z), (x, y + 2 * D.H + D.Z)],
                     [(x, y), (x + D.W, y + D.H), (x, y + 2 * D.H), (x - D.W, y + D.H)]):
            d.polygon(T(poly), fill=v)
    return im.histogram()[7]
def maxhidden(h, p, top=5):
    """p 자리에 몇 층까지 숨을 수 있나 (1층도 보이면 0)"""
    m = 0
    for n in range(1, top + 1):
        g = dict(h); g[p] = n
        if colpix(g, p) == 0: m = n
        else: break
    return m
