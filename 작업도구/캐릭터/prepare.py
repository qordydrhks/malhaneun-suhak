# -*- coding: utf-8 -*-
"""GPT 캐릭터 그림(docs/character-design/images) → 앱용 이미지(characters/img).

표정마다 잘린 폭·위치가 달라서, 그대로 바꿔 끼우면 캐릭터가 덜컹거린다.
→ 몸(불투명한 부분)의 가로 중심과 발끝을 같은 자리에 맞춘 같은 크기 캔버스로 옮긴다.
   기본 그림(base)은 크기가 달라서 표정 그림의 몸 높이에 맞춰 줄인다.
실행: python -X utf8 작업도구/캐릭터/prepare.py
"""
import os, statistics
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'docs', 'character-design', 'images')
OUT = os.path.join(ROOT, 'characters', 'img')

CHARS = {'0-exi': 'exi', '1-pola': 'pola', '2-aresi': 'aresi', '7-iris': 'iris', '8-lemma': 'lemma'}
STATES = {'01-curious-question': 'question', '02-warm-listening': 'listening', '03-deep-thinking': 'thinking',
          '04-aha-surprise': 'hint', '05-focused-solving': 'solving', '06-joy-correct': 'praise',
          '07-sad-retry': 'retry', '08-bored-waiting': 'idle'}

CW, CH = 480, 520        # 맞춤 캔버스
FOOT = 512               # 발끝 줄
SCALE = 0.7              # 저장 크기 336×364 (화면 160px 쯤을 2배 화질로)


def body_box(im):
    a = im.getchannel('A')
    bb = a.point(lambda v: 255 if v > 60 else 0).getbbox()
    # 가로 중심 = 아래쪽 60%(몸통·발)의 아주 불투명한 부분 무게중심 — 물음표·별 같은 효과에 끌려가지 않게
    w, h = im.size
    top = bb[1] + int((bb[3] - bb[1]) * 0.4)
    px = a.load()
    sx = n = 0
    for y in range(top, bb[3], 2):
        for x in range(0, w, 2):
            if px[x, y] > 200:
                sx += x; n += 1
    cx = sx / n if n else (bb[0] + bb[2]) / 2
    return bb, cx


def place(im, scale=1.0, ref=None):
    if scale != 1.0:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    bb, cx = body_box(ref if ref is not None else im)
    can = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
    can.alpha_composite(im, (round(CW / 2 - cx), FOOT - bb[3]))
    return can


def blink_frame(orig, blink_path):
    """눈 감은 그림 → 원래 표정 그림에 '눈 부분만' 붙인 깜빡임 그림.
    GPT 가 다시 그리면 눈썹·얼굴이 조금씩 바뀐다 → 통째로 바꾸면 깜빡일 때 얼굴이 흔들린다.
    두 그림의 차이가 큰 덩어리 중 얼굴 위쪽의 큰 두 개(=두 눈)만 골라 그 자리만 옮긴다."""
    import numpy as np
    from scipy import ndimage
    from PIL import ImageFilter
    b = Image.open(blink_path).convert('RGBA').resize(orig.size, Image.LANCZOS)
    A = np.asarray(orig).astype(int); B = np.asarray(b).astype(int)
    flat = lambda X: X[..., :3] * (X[..., 3:4] / 255) + 255 * (1 - X[..., 3:4] / 255)
    d = np.abs(flat(A) - flat(B)).sum(2) > 90
    d = ndimage.binary_opening(d, iterations=1)
    d = ndimage.binary_closing(d, iterations=4)
    lab, n = ndimage.label(d)
    h = orig.height
    comps = []
    for i in range(1, n + 1):
        ys, xs = np.nonzero(lab == i)
        if ys.mean() < h * 0.62 and len(ys) > 120:
            comps.append((len(ys), i))
    comps.sort(reverse=True)
    keep = np.isin(lab, [i for _, i in comps[:2]])
    keep = ndimage.binary_fill_holes(ndimage.binary_dilation(keep, iterations=10))
    mask = Image.fromarray((keep * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(3))
    out = orig.copy(); out.paste(b, (0, 0), mask)
    return out, len(comps[:2])


def save(can, path):
    can = can.resize((round(CW * SCALE), round(CH * SCALE)), Image.LANCZOS)
    can.save(path, 'WEBP', quality=86, method=6)
    return os.path.getsize(path)


def main():
    total = 0
    blinks = {}
    for folder, cid in CHARS.items():
        od = os.path.join(OUT, cid)
        os.makedirs(od, exist_ok=True)
        heights = []
        for src, st in STATES.items():
            im = Image.open(os.path.join(SRC, folder, src + '.png')).convert('RGBA')
            bb, _ = body_box(im)
            heights.append(bb[3] - bb[1])
            total += save(place(im), os.path.join(od, st + '.webp'))
            # 깜빡임: <원본이름>-blink.png 가 있으면 눈만 바꾼 그림을 같은 자리에
            bp = os.path.join(SRC, folder, src + '-blink.png')
            if os.path.exists(bp):
                fr, k = blink_frame(im, bp)
                total += save(place(fr, ref=im), os.path.join(od, st + '-blink.webp'))
                blinks.setdefault(cid, []).append(st)
                print('  깜빡임', cid, st, '(눈 %d개 찾음)' % k)
        base = Image.open(os.path.join(SRC, folder, 'base.png')).convert('RGBA')
        bb, _ = body_box(base)
        k = statistics.median(heights) / (bb[3] - bb[1])
        total += save(place(base, k), os.path.join(od, 'base.webp'))
        # 고르기 화면용 큰 그림(카드에 크게) — 원본 비율 그대로 높이 480
        big = base.crop(bb)
        big.thumbnail((400, 480), Image.LANCZOS)
        big.save(os.path.join(od, 'card.webp'), 'WEBP', quality=86, method=6)
        total += os.path.getsize(os.path.join(od, 'card.webp'))
        print(cid, 'ok')
    print('합계 %.0f KB' % (total / 1024))
    # chars.js 의 깜빡임 목록 줄을 고친다(이 줄만)
    import json, re
    js = os.path.join(ROOT, 'characters', 'chars.js')
    t = open(js, encoding='utf-8').read()
    line = '  const BLINK = ' + json.dumps(blinks) + ';   // ← 작업도구/캐릭터/prepare.py 가 고치는 줄'
    t2 = re.sub(r'^  const BLINK = .*$', line, t, count=1, flags=re.M)
    if t2 != t:
        with open(js, 'w', encoding='utf-8', newline='') as f:
            f.write(t2)
    print('깜빡임 목록', blinks)


if __name__ == '__main__':
    main()
