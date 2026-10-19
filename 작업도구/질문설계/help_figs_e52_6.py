# -*- coding: utf-8 -*-
"""초5-2 6단원(평균과 가능성) 그림 — 3회차 조건(R3) · 긴 설명(LFIG) (2026-10-13)
   막대는 '고르게 하기'(교재 154쪽: 큰 값에서 작은 값으로 옮김), 가능성은 0 · 1/2 · 1 수직선(교재 158쪽) 모양.
   그림만 보기: python -X utf8 help_figs_e52_6.py → 그림_긴설명_초5-2_6단원.html
"""
import math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '질문계단'))
import draw as D
RED = '#B55B45'; SOFT = D.SOFT; INK = D.INK; GRN = '#3C8B64'; BLU = '#3B6FA8'; ORG = '#C77A1E'; YEL = '#F4C430'
def M(*f): return D.merge(*f)
def T(x, y, s, c=INK, sz=12, w=700, a='middle'): return D.tag(x, y, s, c, sz, w, a)
def RECT(x, y, w, h, fill, stroke='#6E6A86', sw=1.1, dash=False):
    pts = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]; f = D.Fig()
    f.add('<polygon points="%s" fill="%s" stroke="%s" stroke-width="%s"%s/>' % (' '.join('%.1f,%.1f' % p for p in pts), fill, stroke, sw, ' stroke-dasharray="4 3"' if dash else ''), pts)
    return f
def pie(cx, cy, r, n, yellow, start=-90):
    """n칸 회전판, yellow = 노랑 칸 번호들"""
    f = D.Fig(); cols = ['#7FB3E6', '#F28B82', '#9AD0A2', '#C3A6E0', '#9FD8E6', '#B0B7C3']
    k2 = 0
    for k in range(n):
        a1 = math.radians(start + 360 * k / n); a2 = math.radians(start + 360 * (k + 1) / n)
        p1 = (cx + r * math.cos(a1), cy + r * math.sin(a1)); p2 = (cx + r * math.cos(a2), cy + r * math.sin(a2))
        if k in yellow: col = YEL
        else: col = cols[k2 % len(cols)]; k2 += 1
        big = 1 if (a2 - a1) > math.pi else 0
        f.add('<path d="M%.1f %.1f L%.1f %.1f A%.1f %.1f 0 %d 1 %.1f %.1f Z" fill="%s" stroke="#FFFFFF" stroke-width="1.6"/>' % (cx, cy, p1[0], p1[1], r, r, big, p2[0], p2[1], col),
              [(cx - r, cy - r), (cx + r, cy + r)])
    f.add('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="none" stroke="#6E6A86" stroke-width="1.4"/><line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#333" stroke-width="2"/>' % (cx, cy, r, cx, cy, cx + r * .2, cy - r * .7), [])
    return f
def bars(vals, x0=0, base=130, unit=12, bw=34, gap=14, cols=None, labels=None, avg=None):
    f = D.Fig()
    for k, v in enumerate(vals):
        x = x0 + k * (bw + gap)
        f = M(f, RECT(x, base - v * unit, bw, v * unit, (cols or {}).get(k, '#F9D9A6'), '#A97C22'), T(x + bw / 2, base - v * unit - 6, '%g' % v, INK, 11.5))
        if labels: f = M(f, T(x + bw / 2, base + 16, labels[k], SOFT, 11))
    f = M(f, D.seg((x0 - 6, base), (x0 + len(vals) * (bw + gap) - gap + 6, base), 'solid', '#6E6A86', 1.3))
    if avg is not None:
        y = base - avg * unit; f = M(f, D.seg((x0 - 10, y), (x0 + len(vals) * (bw + gap), y), 'dashed', RED, 1.6), T(x0 + len(vals) * (bw + gap) + 4, y + 4, '평균 %g' % avg, RED, 11.5, 700, 'start'))
    return f

# ───────── 3회차 조건 그림 ─────────
def r_spin():   # ㉠ 2칸 중 1 · ㉡ 6칸 중 1 · ㉢ 3칸 중 1 · ㉣ 4칸 중 3 이 노랑
    f = D.Fig()
    for k, (n, y, t) in enumerate(((2, [1], '㉠'), (6, [2], '㉡'), (3, [0], '㉢'), (4, [0, 1, 3], '㉣'))):
        cx = 40 + k * 92; f = M(f, pie(cx, 50, 34, n, y), T(cx, 104, t, INK, 13))
    return D.svg(f)
def r_kings():
    rows = [['왕', '태조', '세종', '성종', '중종', '선조'], ['재위 기간', '6년 2개월', '31년 6개월', '25년 1개월', '38년 2개월', '40년 7개월']]
    return D.svg(D.table(rows, [70, 72, 80, 80, 80, 80], 28, (0, 0), 'amber'))
R3 = {'r56a': (r_spin, 330), 'r56b': (r_kings, 420)}

# ───────── 긴 설명 그림 ─────────
def l_cups():   # 20 · 30 · 10 mL → 모두 20 mL (교재 154쪽 예)
    f = bars([20, 30, 10], 0, 130, 3, 40, 18, labels=['①', '②', '③'], avg=20)
    f = M(f, T(230, 50, '(20 + 30 + 10) ÷ 3 = 20', INK, 12.5, 700, 'start'), T(230, 74, '평균 = (자료의 값을 모두 더한 수) ÷ (자료의 수)', SOFT, 11, 600, 'start'))
    return D.svg(f)
def l_level():  # 7, 4, 5, 4 모둠 → 5 (교재 방법 1)
    f = bars([7, 4, 5, 4], 0, 120, 12, 32, 12, cols={0: '#F9D9A6'}, labels=['1', '2', '3', '4'], avg=5)
    f = M(f, D.arrow(16, 120 - 7 * 12 + 6, 60, 120 - 4 * 12 - 4, None, RED), D.arrow(16, 120 - 6 * 12 + 6, 148, 120 - 4 * 12 - 4, None, RED))
    return D.svg(M(f, T(100, 160, '큰 값에서 작은 값으로 옮겨 고르게 → 모두 5', SOFT, 11.5)))
def l_notin():   # 1, 3, 8 → 고르게 하면 4, 4, 4
    f = bars([1, 3, 8], 0, 120, 11, 34, 14, cols={2: '#F9D9A6'}, labels=['', '', ''], avg=4)
    f = M(f, D.arrow(104, 40, 22, 100, None, RED), D.arrow(116, 52, 78, 80, None, RED))
    return D.svg(M(f, T(80, 152, '평균 4는 자료 1, 3, 8에 없는 값이에요', RED, 11.5)))
def l_max():     # 9, 5, 7 → 9에서 2를 5로 → 7, 7, 7
    f = bars([9, 5, 7], 0, 120, 11, 34, 14, labels=['', '', ''], avg=7)
    f = M(f, D.seg((-8, 120 - 99), (150, 120 - 99), 'dashed', ORG, 1.4), T(154, 120 - 95, '가장 큰 값 9', ORG, 11.5, 700, 'start'),
          D.arrow(18, 120 - 9 * 11 + 8, 60, 120 - 5 * 11 - 6, None, RED))
    return D.svg(M(f, T(100, 152, '큰 값은 옮기면 줄기만 해요 → 평균은 9보다 클 수 없어요', SOFT, 11.5)))
def l_add():
    f = bars([10, 12, 14, 16], 0, 120, 6, 32, 14, cols={3: '#B9DFB0'}, labels=['', '', '', '새로 넣음'])
    f = M(f, D.seg((-8, 120 - 72), (140, 120 - 72), 'dashed', RED, 1.4), T(200, 120 - 68, '처음 평균 12', RED, 11, 700, 'start'), D.seg((-8, 120 - 78), (190, 120 - 78), 'dashed', GRN, 1.4), T(200, 120 - 82, '새 평균 13', GRN, 11, 700, 'start'))
    return D.svg(M(f, T(100, 160, '평균보다 큰 16을 넣으면 평균이 12 → 13으로 커져요', SOFT, 11.5)))
def l_compare():
    t = D.table([['학급', '1반', '2반', '3반'], ['학생 수(명)', '3', '5', '4'], ['연필 수(자루)', '15', '20', '16'], ['한 명당 평균', '5', '4', '4']], [90, 50, 50, 50], 26, (0, 0), 'blue')
    return D.svg(M(t, T(120, 126, '학생 수가 다르면 평균으로 비교 → 1반', BLU, 11.5)))
def l_unknown():
    t = D.table([['반', '1', '2', '3', '4', '평균'], ['학생 수(명)', '27', '30', '□', '26', '28']], [80, 40, 40, 40, 40, 50], 26, (0, 0), 'green')
    f = M(t, T(0, 76, '평균식 (27 + 30 + □ + 26) ÷ 4 = 28', INK, 12, 700, 'start'), T(0, 98, '① 27 + 30 + □ + 26 = 28 × 4 = 112', INK, 12, 700, 'start'),
          T(0, 120, '② □ = 112 − 83 = 29명', INK, 12, 700, 'start'))
    return D.svg(f)
def l_sumtrap():
    f = M(bars([30], 0, 110, 2.2, 50, 0, labels=['3명 합 30']), bars([40], 110, 110, 2.2, 50, 0, labels=['8명 합 40']))
    return D.svg(M(f, T(80, 150, '합은 오른쪽이 크지만 한 명당은 10 > 5', RED, 11.5)))
def l_times():
    f = bars([140, 140, 140, 140], 0, 120, 0.6, 30, 10, labels=['', '', '', ''], avg=None)
    return D.svg(M(f, T(80, 150, '평균 140 cm인 4명 → 합 = 140 × 4 = 560 cm', SOFT, 11.5)))
def l_flow6():
    f = M(RECT(0, 0, 250, 30, '#F3F7FD', '#9FB6E0'), T(125, 20, '평균 = 합 ÷ 자료의 수', BLU, 12.5))
    f = M(f, D.arrow(125, 32, 125, 52, None, SOFT), RECT(0, 54, 250, 30, '#FFF6E5', '#E7C27A'), T(125, 74, '합 = 평균 × 자료의 수', ORG, 12.5))
    return D.svg(M(f, T(125, 104, '합과 자료의 수를 먼저 확인 — 모르면 평균식을 세워 구해요', SOFT, 11)))
def scale(x0=0, y=60, w=320, marks=None):
    f = D.seg((x0, y), (x0 + w, y), 'solid', '#6E6A86', 1.6)
    for k, (t, lab) in enumerate((('0', '불가능하다'), ('1/2', '반반이다'), ('1', '확실하다'))):
        x = x0 + w * k / 2; f = M(f, D.seg((x, y - 6), (x, y + 6), 'solid', '#6E6A86', 1.4), T(x, y + 24, t, INK, 12.5), T(x, y - 14, lab, SOFT, 11))
    for x, t, c in (marks or []): f = M(f, D.arrow(x0 + w * x, y - 52, x0 + w * x, y - 24, None, c), T(x0 + w * x, y - 58, t, c, 11.5))
    return f
def l_dice7(): return D.svg(scale(20, 80, 320, [(0, '7의 눈', RED)]))
def l_coin():
    f = M(scale(20, 90, 320, [(0.5, '그림 면', BLU)]))
    f.add('<circle cx="80" cy="18" r="14" fill="#F4D58D" stroke="#A97C22" stroke-width="1.4"/><circle cx="120" cy="18" r="14" fill="#E8E8E8" stroke="#888" stroke-width="1.4"/>', [(60, 0), (140, 34)])
    f = M(f, T(80, 22, '그림', INK, 9.5), T(120, 22, '숫자', INK, 9.5))
    return D.svg(f)
def l_balls():
    f = scale(20, 90, 320, [(0.75, '빨간 공', RED)])
    for k, c in enumerate(['#E06666', '#E06666', '#E06666', '#6FA8DC']):
        f.add('<circle cx="%d" cy="18" r="9" fill="%s"/>' % (110 + k * 22, c), [(100 + k * 22, 8), (120 + k * 22, 28)])
    return D.svg(M(f, T(170, 132, '~일 것 같다: 반반보다 높지만 확실하지는 않아요', SOFT, 11.5)))
def l_range():
    f = scale(20, 90, 260, [(1, '흰 바둑돌 → 1', GRN)])
    return D.svg(M(f, T(300, 70, '4는 1보다 커서 ✗', RED, 11.5, 700, 'start'), T(150, 132, '가능성은 0부터 1까지의 수', SOFT, 11.5)))
def l_flow7():   # 빨간 공 수 ↔ 다른 공 수 → 불가능 · 반반 · ~일 것 같다
    f = scale(20, 110, 320, [(0, '빨간 공 0개', RED), (0.5, '빨강 2 · 파랑 2', RED), (0.86, '빨강 3 · 파랑 1', RED)])
    return D.svg(M(f, T(180, 150, '빨간 공의 수와 다른 공의 수를 세어 비교해요', SOFT, 11.5)))

LFIG = {
    '6-01': ['l_cups', 'l_level', 'l_notin', 'l_max', 'l_add'],
    '6-02': ['l_compare', 'l_unknown', 'l_sumtrap', 'l_times', 'l_flow6'],
    '6-03': ['l_dice7', 'l_coin', 'l_balls', 'l_range', 'l_flow7'],
}
AFIG = {}
F = {k: v for k, v in globals().items() if k.startswith('l_')}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    o = ['<!doctype html><meta charset="utf-8"><title>6단원 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for k, (fn, w) in R3.items(): o.append('<div style="border:1px solid #ccd;margin:8px 0;padding:6px"><b>%s</b><br>%s</div>' % (k, fn()))
    for tag, ns in LFIG.items():
        for i, n in enumerate(ns): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초5-2_6단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p)
