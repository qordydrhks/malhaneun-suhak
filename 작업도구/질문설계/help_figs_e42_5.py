# -*- coding: utf-8 -*-
"""초4-2 5단원(꺾은선그래프) '긴 설명' 그림(LFIG) + 다시 묻기 새 그림(AFIG).
   꺾은선그래프는 설계 PDF 와 같은 그리기(e42_456._lg)를 쓴다. 막대그래프는 BG.
   그림만 보기: python -X utf8 help_figs_e42_5.py → 그림_긴설명_초4-2_5단원.html
"""
import math
from help_figs_e42_4 import S, L, P, D, AR, BOX, ok, no, cap, LINE, BLUE, ORG, GRN, RED, SUB, FILL, PALE, e
from help_figs_e42_1 import T
from e42_456 import _lg

def G(x, y, body): return '<g transform="translate(%.1f,%.1f)">%s</g>' % (x, y, body)

def BG(title, xl, vals, y0, y1, minor, major, yu='', xu='', W=270, H=190, col='#f2b36b'):
    """막대그래프 — _lg 와 같은 틀(눈금·글자 위치)."""
    Lx, R, Tp, B = 46, W - 14, 30, H - 34
    Y = lambda v: B - (v - y0) / (y1 - y0) * (B - Tp)
    X = lambda i: Lx + 16 + i * (R - Lx - 32) / max(1, len(xl) - 1)
    b = T(W / 2, 16, title, LINE, 12)
    v = y0
    while v <= y1 + 1e-9:
        maj = abs(v / major - round(v / major)) < 1e-6
        b += L((Lx, Y(v)), (R, Y(v)), '#c7cdd8' if maj else '#e6e9ef', 1 if maj else .8)
        if maj: b += T(Lx - 6, Y(v) + 4, '%g' % v, LINE, 10, 'end')
        v = round(v + minor, 6)
    bw = min(34, (R - Lx - 32) / max(1, len(xl) - 1) * .55)
    for i, (s, val) in enumerate(zip(xl, vals)):
        b += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (X(i) - bw / 2, Y(val), bw, B - Y(val), col) + T(X(i), B + 14, s, LINE, 10)
    b += L((Lx, Tp), (Lx, B), LINE, 1.4) + L((Lx, B), (R, B), LINE, 1.4)
    if yu: b += T(Lx - 4, Tp - 8, '(%s)' % yu, '#5b6270', 9.5, 'end')
    if xu: b += T(R, B + 28, '(%s)' % xu, '#5b6270', 9.5, 'end')
    return b

def pos(xl, y0, y1, W=270, H=190, wave=False):   # _lg 안의 좌표(점 위치 계산용)
    Lx, R, Tp, B = 46, W - 14, 30, H - 34; gap = 14 if wave else 0; bot = B - gap
    return (lambda i: Lx + 16 + i * (R - Lx - 32) / max(1, len(xl) - 1)), (lambda v: bot - (v - y0) / (y1 - y0) * (bot - Tp))

F = {}; A = {}
def fig(fn): F[fn.__name__] = fn; return fn

# ───────── 5-01 ─────────
@fig
def f5_bar():
    b = BG('좋아하는 운동별 학생 수', ['축구', '야구', '수영', '농구'], [9, 6, 7, 4], 0, 10, 1, 5, yu='명', xu='운동')
    b += T(300, 70, '가로: 운동 종류', LINE, 12, 'start') + T(300, 92, '세로: 학생 수', LINE, 12, 'start') + T(300, 120, '막대의 길이 = 수량', ORG, 12.5, 'start', 700)
    return S(450, 196, b)

@fig
def f5_line_parts():
    xl = ['3', '4', '5', '6']; v = [6, 9, 13, 14]
    b = _lg('고구마 순의 월별 길이', xl, [(v, RED, '')], 0, 15, 1, 5, yu='cm', xu='월')
    X, Y = pos(xl, 0, 15)
    b += AR((X(1) + 40, Y(9) + 34), (X(1) + 4, Y(9) + 4), BLUE) + T(X(1) + 44, Y(9) + 44, '점: 그때의 길이', BLUE, 11.5, 'start', 700)
    m = ((X(2) + X(3)) / 2, (Y(13) + Y(14)) / 2); b += AR((m[0] + 4, m[1] + 40), (m[0], m[1] + 6), ORG) + T(m[0] - 30, m[1] + 54, '선분: 변화', ORG, 11.5, 'start', 700)
    return S(380, 196, b)

@fig
def f5_bar_vs_line():
    xl = ['9', '10', '11', '12']; v = [18, 20, 23, 24]
    b = BG('교실의 시각별 온도', xl, v, 0, 25, 1, 5, yu='°C', xu='시', W=250) + T(125, 200, '막대로 나타냄', SUB, 12, 'middle', 700)
    b += G(260, 0, _lg('교실의 시각별 온도', xl, [(v, RED, '')], 0, 25, 1, 5, yu='°C', xu='시', W=250) + T(125, 200, '선분으로 나타냄 → 변화가 한눈에', ORG, 12, 'middle', 700))
    return S(512, 210, b)

@fig
def f5_which():
    b = BG('좋아하는 과일별 학생 수', ['사과', '귤', '포도'], [7, 5, 8], 0, 10, 1, 5, yu='명', W=230, H=170) + T(115, 186, '종류별로 비교 → 막대그래프', BLUE, 12, 'middle', 700)
    b += G(250, 0, _lg('강아지의 월별 몸무게', ['1', '2', '3', '4'], [([2, 3, 5, 6], RED, '')], 0, 8, 1, 2, yu='kg', xu='월', W=230, H=170) + T(115, 186, '시간에 따라 변화 → 꺾은선그래프', ORG, 12, 'middle', 700))
    return S(486, 196, b)

@fig
def f5_scale_zoom():
    x, y0, s = 70, 150, 22; b = L((x, y0), (x, y0 - 5 * s - 10), LINE, 1.6)
    for k in range(6):
        big = k in (0, 5); b += L((x - (10 if big else 5), y0 - k * s), (x + 120, y0 - k * s), '#c7cdd8' if big else '#e6e9ef', 1 if big else .8)
        if big: b += T(x - 14, y0 - k * s + 4, str(k), LINE, 12, 'end', 700)
    b += '<path d="M%d %d q 14 0 14 -12 v -31 q 0 -12 12 -12 q -12 0 -12 -12 v -31 q 0 -12 -14 -12" fill="none" stroke="%s" stroke-width="1.6"/>' % (x + 128, y0, ORG)
    b += T(x + 160, y0 - 52, '5칸', ORG, 13, 'start', 700)
    b += T(290, 70, '0과 5 사이가 5칸', LINE, 12.5, 'start') + T(290, 94, '5 ÷ 5 = 1', ORG, 13, 'start', 700) + T(290, 118, '→ 한 칸은 1 cm', ORG, 13, 'start', 700)
    return S(440, 168, b)

def a5_14():   # 다시 묻기: 세로 눈금 한 칸 = 2명
    return S(300, 196, _lg('요일별 도서관 방문자 수', ['월', '화', '수', '목'], [([14, 20, 18, 26], RED, '')], 0, 30, 2, 10, yu='명', xu='요일'))
A[('5-01', 4)] = a5_14

# ───────── 5-02 ─────────
@fig
def f5_wave():
    xl = ['1', '2', '3', '4']; v = [41, 44, 47, 52]
    b = _lg('(가) 날짜별 우유 판매량', xl, [(v, RED, '')], 0, 60, 2, 10, yu='갑', xu='일', W=250) + T(125, 200, '아래쪽이 텅 비어 있어요', SUB, 12, 'middle', 700)
    b += G(260, 0, _lg('(나) 날짜별 우유 판매량', xl, [(v, RED, '')], 40, 54, 1, 5, wave=True, yu='갑', xu='일', W=250) + T(125, 200, '물결선으로 0~40 생략 → 변화가 잘 보여요', ORG, 12, 'middle', 700))
    return S(512, 210, b)

@fig
def f5_slopes():
    b = ''; items = [(26, '많이 증가', RED), (10, '조금 증가', ORG), (0, '변화 없음', LINE), (-10, '조금 감소', BLUE), (-26, '많이 감소', PUR)]
    for k, (dy, s, c) in enumerate(items):
        x = 20 + k * 96; b += L((x, 60 + dy / 2), (x + 60, 60 - dy / 2), c, 2.6) + D((x, 60 + dy / 2), c, 4) + D((x + 60, 60 - dy / 2), c, 4)
        b += T(x + 30, 104, s, c, 12, 'middle', 700)
    b += T(250, 136, '선분이 많이 기울어질수록 변화가 커요', LINE, 12.5, 'middle', 700)
    return S(500, 148, b)
PUR = '#6d3fd0'

@fig
def f5_mid():
    xl = ['오전 8', '10', '낮 12', '오후 2']; v = [10, 14, 18, 16]
    b = _lg('운동장의 시각별 기온', xl, [(v, RED, '')], 0, 20, 1, 5, yu='°C', xu='시', W=300, H=200)
    X, Y = pos(xl, 0, 20, 300, 200)
    mx, my = (X(1) + X(2)) / 2, Y(16)
    b += L((mx, Y(0)), (mx, my), BLUE, 1.6, '4 3') + L((46, my), (mx, my), BLUE, 1.6, '4 3') + D((mx, my), BLUE, 5)
    b += T(mx, Y(0) + 26, '11시', BLUE, 11, 'middle', 700) + T(52, my - 6, '약 16', BLUE, 11, 'start', 700)
    b += T(320, 70, '10시 14 °C와 12시 18 °C의', LINE, 12, 'start') + T(320, 92, '가운데 → 약 16 °C', ORG, 12.5, 'start', 700)
    return S(500, 206, b)

@fig
def f5_same_value():
    xl = ['1', '2', '3', '4']; v = [82, 84, 85, 88]
    b = _lg('(가) 날짜별 물의 높이', xl, [(v, RED, '')], 0, 90, 2, 10, yu='cm', xu='일', W=250)
    X, Y = pos(xl, 0, 90, 250)
    b += '<circle cx="%.1f" cy="%.1f" r="8" fill="none" stroke="%s" stroke-width="2"/>' % (X(2), Y(85), BLUE) + T(X(2) + 12, Y(85) - 8, '85', BLUE, 11, 'start', 700)
    b2 = _lg('(나) 날짜별 물의 높이', xl, [(v, RED, '')], 80, 90, 1, 5, wave=True, yu='cm', xu='일', W=250)
    X2, Y2 = pos(xl, 80, 90, 250, wave=True)
    b2 += '<circle cx="%.1f" cy="%.1f" r="8" fill="none" stroke="%s" stroke-width="2"/>' % (X2(2), Y2(85), BLUE) + T(X2(2), Y2(85) - 14, '85', BLUE, 11, 'middle', 700)
    b += G(260, 0, b2) + T(256, 204, '3일의 값은 두 그래프 모두 85 cm — 값은 그대로, 모양만 달라요', ORG, 12, 'middle', 700)
    return S(512, 214, b)

def a5_bean():   # 다시 묻기: 가장 많이 자란 날 = 6일
    return S(300, 196, _lg('날짜별 강낭콩의 키', ['4', '5', '6', '7'], [([10, 12, 17, 19], RED, '')], 0, 20, 1, 5, yu='cm', xu='일'))
A[('5-02', 1)] = a5_bean

# ───────── 5-03 ─────────
@fig
def f5_steps():
    names = [('① 가로·세로에', '무엇을 나타낼지'), ('② 물결선을', '넣을 곳'), ('③ 세로 눈금', '한 칸의 크기'), ('④ 점을 찍고', '선분으로 잇기'), ('⑤ 제목 쓰기', '(먼저 써도 돼)')]
    b = ''
    for k, (s1, s2) in enumerate(names):
        x = 6 + k * 102; b += BOX(x, 20, 88, 56, [s1, s2], '#f8fafc' if k != 3 else PALE, '#cbd2dc' if k != 3 else ORG, LINE, 11)
        if k < 4: b += AR((x + 88, 48), (x + 100, 48))
    return S(520, 92, b)

@fig
def f5_rope_wave():
    xl = ['1', '2', '3', '4', '5']; v = [43, 47, 51, 49, 45]
    b = _lg('날짜별 줄넘기 기록', xl, [(v, RED, '')], 40, 52, 1, 5, wave=True, yu='회', xu='일', W=300, H=200)
    b += T(320, 60, '가장 작은 값 43회', LINE, 12.5, 'start') + T(320, 84, '→ 0회와 40회 사이를', ORG, 12.5, 'start', 700) + T(320, 106, '물결선으로 생략', ORG, 12.5, 'start', 700)
    return S(490, 206, b)

@fig
def f5_scale_choice():
    b = ''
    for k, (step, ok_) in enumerate(((2, False), (1, True))):
        x = 50 + k * 230; top = 18; bot = 166; vmax = 14
        Y = lambda v: bot - v / vmax * (bot - top)
        b += L((x, top), (x, bot), LINE, 1.6)
        v = 0
        while v <= vmax:
            b += L((x - 4, Y(v)), (x + 110, Y(v)), '#d6dbe6', .9) + (T(x - 8, Y(v) + 4, str(v), LINE, 10, 'end') if v % 2 == 0 else '')
            v += step
        b += D((x + 60, Y(7)), RED if not ok_ else GRN, 6) + T(x + 72, Y(7) + 4, '7 kg', RED if not ok_ else GRN, 12, 'start', 700)
        b += T(x + 50, bot + 20, '한 칸 %d kg' % step, LINE, 12, 'middle', 700) + (no(x + 120, bot + 22) if not ok_ else ok(x + 120, bot + 22))
        b += T(x + 50, bot + 38, '7 kg이 눈금 사이 ✗' if not ok_ else '7 kg이 눈금 위 ✓', RED if not ok_ else GRN, 11.5, 'middle')
    return S(470, 214, b)

@fig
def f5_plot_point():
    xl = ['9', '10', '11', '12']
    b = _lg('시각별 기온', xl, [([None, None, None, None], RED, '')], 10, 20, 1, 5, yu='°C', xu='시', W=300, H=200)
    X, Y = pos(xl, 10, 20, 300, 200)
    b += L((X(2), Y(10)), (X(2), Y(17)), BLUE, 1.8, '4 3') + L((46, Y(17)), (X(2), Y(17)), ORG, 1.8, '4 3') + D((X(2), Y(17)), RED, 6)
    b += T(320, 66, '가로의 11시에서 위로', BLUE, 12.5, 'start', 700) + T(320, 90, '세로의 17 °C에서 옆으로', ORG, 12.5, 'start', 700) + T(320, 114, '→ 만나는 자리에 점', RED, 12.5, 'start', 700)
    return S(500, 206, b)

# ───────── 5-04 ─────────
@fig
def f5_flat():
    xl = ['2020', '2021', '2022', '2023', '2024']; v = [290, 293, 297, 297, 301]
    b = _lg('연도별 1인당 하루 물 사용량', xl, [(v, RED, '')], 285, 305, 1, 5, wave=True, yu='L', xu='년', W=320, H=200)
    X, Y = pos(xl, 285, 305, 320, 200, True)
    b += '<rect x="%.1f" y="%.1f" width="%.1f" height="22" rx="8" fill="none" stroke="%s" stroke-width="2"/>' % (X(2) - 8, Y(297) - 11, X(3) - X(2) + 16, BLUE)
    b += T(340, 70, '평평한 선분', BLUE, 12.5, 'start', 700) + T(340, 94, '→ 변화 없음', BLUE, 12.5, 'start', 700) + T(340, 122, '기울어진 정도 = 변화의 정도', SUB, 11.5, 'start')
    return S(520, 206, b)

@fig
def f5_trend_up():
    xl = ['2020', '2021', '2022', '2023', '2024', '2025']; v = [320, 350, 390, 420, 460, None]
    b = _lg('연도별 도서관 방문자 수', xl, [(v, RED, '')], 300, 520, 10, 50, wave=True, yu='명', xu='년', W=340, H=200)
    X, Y = pos(xl, 300, 520, 340, 200, True)
    b += L((X(4), Y(460)), (X(5), Y(495)), RED, 2, '5 4') + T(X(5), Y(495) - 10, '?', RED, 15, 'middle', 700)
    b += T(356, 70, '계속 올라가는 흐름', LINE, 12.5, 'start') + T(356, 94, '→ 2025년에도', ORG, 12.5, 'start', 700) + T(356, 116, '늘어날 것 같다', ORG, 12.5, 'start', 700)
    return S(520, 206, b)

@fig
def f5_trend_bike():
    xl = ['2021', '2022', '2023', '2024', '2025']; v = [400, 450, 520, 600, None]
    b = _lg('연도별 자전거 판매량', xl, [(v, RED, '')], 350, 700, 10, 50, wave=True, yu='대', xu='년', W=320, H=200)
    X, Y = pos(xl, 350, 700, 320, 200, True)
    for i, d in enumerate((50, 70, 80)):
        m = ((X(i) + X(i + 1)) / 2, (Y(v[i]) + Y(v[i + 1])) / 2); b += T(m[0] - 6, m[1] - 8, '+%d' % d, BLUE, 11, 'end', 700)
    b += L((X(3), Y(600)), (X(4), Y(680)), RED, 2, '5 4') + T(X(4), Y(680) - 10, '?', RED, 15, 'middle', 700)
    b += T(336, 70, '해마다 늘었고', LINE, 12.5, 'start') + T(336, 92, '늘어난 양도 커져요', LINE, 12.5, 'start') + T(336, 118, '→ 늘어날 것 같다', ORG, 12.5, 'start', 700)
    return S(500, 206, b)

@fig
def f5_two_graphs():
    xl = ['3', '4', '5', '6']
    a = _lg('월별 이용자 수', xl, [([900, 1000, 1200, 1600], RED, '')], 0, 1800, 100, 500, yu='명', xu='월', W=250)
    c = _lg('월별 책 대여량', xl, [([2000, 2400, 2600, 3200], BLUE, '')], 0, 3500, 100, 1000, yu='권', xu='월', W=250)
    X, Y = pos(xl, 0, 1800, 250)
    band = ''.join('<rect x="%.1f" y="30" width="22" height="126" fill="#fff3e3" fill-opacity=".8"/>' % (X(i) - 11) for i in range(4))
    b = G(0, 0, band + a) + G(260, 0, band + c) + T(256, 204, '같은 달끼리 견주면 둘 다 늘었어요 → 이용자 수가 늘 때 대여량도 늘었다', ORG, 12, 'middle', 700)
    return S(512, 214, b)

@fig
def f5_maybe():
    xl = ['1', '2', '3', '4', '5']; v = [20, 24, 27, 31, None]
    b = _lg('월별 화분의 키', xl, [(v, RED, '')], 0, 45, 1, 10, yu='cm', xu='월', W=320, H=200)
    X, Y = pos(xl, 0, 45, 320, 200)
    b += L((X(3), Y(31)), (X(4), Y(38)), RED, 2, '5 4') + L((X(3), Y(31)), (X(4), Y(31)), SUB, 2, '5 4') + L((X(3), Y(31)), (X(4), Y(26)), BLUE, 2, '5 4')
    b += T(X(4) + 8, Y(38) + 4, '?', RED, 14, 'start', 700) + T(X(4) + 8, Y(31) + 4, '?', SUB, 14, 'start', 700) + T(X(4) + 8, Y(26) + 4, '?', BLUE, 14, 'start', 700)
    b += T(340, 70, '앞으로는 어떻게 될지', LINE, 12.5, 'start') + T(340, 92, '확실히 알 수 없어요', LINE, 12.5, 'start') + T(340, 118, '→ "~ 것 같다"로 예상', ORG, 12.5, 'start', 700)
    return S(520, 206, b)

@fig
def f5_checklist():
    xl = ['1', '2', '3', '4']; v = [52, 55, 54, 58]
    b = _lg('주별 해바라기의 키', xl, [(v, RED, '')], 50, 60, 1, 5, wave=True, yu='cm', xu='주', W=300, H=200)
    b += '<circle cx="78" cy="12" r="10" fill="%s"/>' % ORG + T(78, 16, '①', '#fff', 11, 'middle', 700)
    b += '<circle cx="14" cy="96" r="10" fill="%s"/>' % BLUE + T(14, 100, '②', '#fff', 11, 'middle', 700)
    b += '<circle cx="34" cy="166" r="10" fill="%s"/>' % GRN + T(34, 170, '③', '#fff', 11, 'middle', 700)
    b += T(320, 56, '① 제목 · 가로 · 세로', ORG, 12.5, 'start', 700) + T(320, 82, '② 세로 눈금 한 칸의 크기', BLUE, 12.5, 'start', 700) + T(320, 108, '③ 물결선이 있는지', GRN, 12.5, 'start', 700)
    b += T(320, 140, '그다음 점의 값과 기울기', SUB, 11.5, 'start')
    return S(510, 206, b)

def a5_note():   # 다시 묻기: 변하지 않은 때 = 4월과 5월 사이
    return S(300, 196, _lg('월별 수첩 판매량', ['3', '4', '5', '6'], [([120, 140, 140, 160], RED, '')], 100, 170, 5, 20, wave=True, yu='권', xu='월'))
def a5_paper():  # 다시 묻기: 줄어들 것 같다
    return S(320, 196, _lg('연도별 종이 신문 구독자 수', ['2021', '2022', '2023', '2024'], [([800, 720, 650, 590], RED, '')], 550, 850, 10, 50, wave=True, yu='명', xu='년', W=320))
def a5_park():   # 다시 묻기: 방문자 수가 늘 때 쓰레기 양도 늘었다
    xl = ['4', '5', '6', '7']
    a = _lg('공원의 월별 방문자 수', xl, [([300, 450, 500, 700], RED, '')], 0, 800, 50, 200, yu='명', xu='월', W=250)
    c = _lg('공원의 월별 쓰레기 양', xl, [([40, 55, 60, 80], BLUE, '')], 0, 100, 5, 20, yu='kg', xu='월', W=250)
    return S(512, 196, a + G(260, 0, c))
A[('5-04', 0)] = a5_note; A[('5-04', 2)] = a5_paper; A[('5-04', 3)] = a5_park

LFIG = {
    '5-01': ['f5_bar', 'f5_line_parts', 'f5_bar_vs_line', 'f5_which', 'f5_scale_zoom'],
    '5-02': ['f5_wave', 'f5_slopes', 'f5_mid', 'f5_same_value'],
    '5-03': ['f5_steps', 'f5_rope_wave', 'f5_scale_choice', 'f5_plot_point'],
    '5-04': ['f5_flat', 'f5_trend_up', 'f5_trend_bike', 'f5_two_graphs', 'f5_maybe', 'f5_checklist'],
}
AFIG = A
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    for k, fn in A.items(): o.append('<div style="border:2px dashed #e7c27a;margin:8px 0;padding:6px"><b>다시 묻기 %s · %d</b><br>%s</div>' % (k[0], k[1] + 1, fn()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초4-2_5단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()), len(A))
