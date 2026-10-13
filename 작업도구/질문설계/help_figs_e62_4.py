# -*- coding: utf-8 -*-
"""초6-2 4단원(비례식과 비례배분) '긴 설명' 그림 — help_figs_e62_2 의 식 도구(SEQ·BRK)를 같이 쓴다 (2026-10-14).
   LFIG[tag][i] = 그림 이름 — help_e62_4.H[tag][i] 의 긴 설명에 붙는다. 숫자는 긴 설명의 예와 같게, 다시 묻기와 다르게. 재탕 금지.
   그림만 보기: python -X utf8 help_figs_e62_4.py → 그림_긴설명_초6-2_4단원.html
"""
from help_figs_e52_1 import S, T, L, R, BOX, AR, CURVE, ok, no, LINE, BLUE, ORG, GRN, RED, SUB, PALE, FILL, GBG
from help_figs_e52_2 import EXPR, BAR, SH, SH2, EMP, EDGE
from help_figs_e62_2 import SEQ, BRK, NOTE, HL, HL2, PINK

F = {}
def fig(fn): F[fn.__name__] = fn; return fn

def RT(x, y, a, b, a2, b2, lab, sz=17):
    """a : b → a2 : b2 — 전항끼리(위)·후항끼리(아래) 같은 배수 화살표"""
    s, cs, ex = SEQ(x, y, [a, ':', b], sz, {0: (LINE, HL), 2: (LINE, HL2)})
    s2, cs2, ex2 = SEQ(ex + 40, y, [a2, ':', b2], sz, {0: (LINE, HL), 2: (LINE, HL2)})
    o = s + s2 + BRK(cs[0], cs2[0], y - sz - 2, lab, True) + BRK(cs[2], cs2[2], y + 8, lab, False)
    return o, ex2

def PROP(x, y, a, b, c, d, sz=18, prod=True):
    """a : b = c : d — 외항(위 굽은 선)·내항(아래 굽은 선)"""
    s, cs, ex = SEQ(x, y, [a, ':', b, '=', c, ':', d], sz, {0: (BLUE, None), 6: (BLUE, None), 2: (ORG, None), 4: (ORG, None)})
    o = s
    o += '<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f" fill="none" stroke="%s" stroke-width="1.5"/>' % (cs[0], y - sz, (cs[0] + cs[6]) / 2, y - sz - 34, cs[6], y - sz, BLUE)
    o += '<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f" fill="none" stroke="%s" stroke-width="1.5"/>' % (cs[2], y + 8, (cs[2] + cs[4]) / 2, y + 30, cs[4], y + 8, ORG)
    o += T((cs[0] + cs[6]) / 2, y - sz - 28, '외항', BLUE, 11.5, 'middle', 700) + T((cs[2] + cs[4]) / 2, y + 36, '내항', ORG, 11.5, 'middle', 700)
    return o, ex, cs

def SPLIT(x, y, total, parts, w=300, h=26, names=None, unit=''):
    """전체 total 을 parts 비로 나눈 띠 — 칸마다 같은 크기, 사람마다 색"""
    n = sum(parts); cw = w / n; o = ''; k = 0; cols = [SH, SH2, '#b7e1c1']
    for j, p in enumerate(parts):
        for _ in range(p):
            o += '<rect x="%.1f" y="%.1f" width="%.1f" height="%d" fill="%s" stroke="%s" stroke-width="1.1"/>' % (x + k * cw, y, cw, h, cols[j % 3], EDGE); k += 1
        x0 = x + (k - p) * cw; x1 = x + k * cw
        o += L((x0, y + h + 6), (x1, y + h + 6), cols[j % 3] if j else ORG, 2) + T((x0 + x1) / 2, y + h + 22, (names[j] if names else '') + ' ' + str(total * p // n) + unit, LINE, 12, 'middle', 700)
    o += T(x + w + 10, y + h / 2 + 5, '전체 %s%s' % (total, unit), SUB, 12, 'start')
    return o

# ───────── 4-01 비의 성질 ─────────
@fig
def f41_ratio27():
    s, cs, ex = SEQ(70, 46, ['2', ':', '7'], 20, {0: (ORG, None), 2: (BLUE, None)})
    b = T(cs[0] + 4, 76, '비교하는 양', ORG, 11.5, 'end') + T(cs[2] - 4, 76, '기준량', BLUE, 11.5, 'start')
    e, _ = EXPR(ex + 40, 40, ['→', '비율', ('f', 2, 7)], 17)
    return S(360, 92, s + b + e)

@fig
def f41_front58():
    s, cs, ex = SEQ(80, 50, ['5', ':', '8'], 22, {0: (LINE, HL), 2: (LINE, HL2)})
    b = T(cs[0], 84, '전항', ORG, 13, 'middle', 700) + T(cs[2], 84, '후항', BLUE, 13, 'middle', 700) + T(cs[1], 20, '기호 : 의 앞과 뒤', SUB, 11)
    return S(260, 100, s + b)

@fig
def f41_x2():
    o, ex = RT(26, 56, '4', '5', '8', '10', '×2')
    e, _ = EXPR(26, 124, ['비율', ('f', 4, 5), '=', ('f', 8, 10)], 15)
    return S(int(ex) + 40, 162, o + e)

@fig
def f41_zero():
    s1, _, e1 = SEQ(40, 34, ['3 : 4', '→', '0 : 0'], 16)
    s2, _, e2 = SEQ(40, 74, ['2 : 9', '→', '0 : 0'], 16)
    b = T(28, 34, '×0', RED, 11, 'end') + T(28, 74, '×0', RED, 11, 'end') + NOTE(e1 + 14, 54, '← 서로 다른 비가 모두 0 : 0', RED)
    return S(400, 94, s1 + s2 + b)

@fig
def f41_wrong56():
    s0, _, _ = SEQ(20, 28, ['5', ':', '6'], 16)
    s1, _, e1 = SEQ(40, 68, ['15', ':', '6'], 16)
    s2, _, e2 = SEQ(40, 106, ['15', ':', '18'], 16)
    b = no(22, 68) + ok(22, 106) + NOTE(e1 + 14, 68, '전항에만 ×3 → 비율 15/6', RED) + NOTE(e2 + 14, 106, '둘 다 ×3 → 비율 15/18 = 5/6', GRN)
    return S(380, 122, s0 + s1 + s2 + b)

@fig
def f41_div5():
    o, ex = RT(26, 56, '15', '25', '3', '5', '÷5')
    e, _ = EXPR(26, 124, ['비율', ('f', 15, 25), '=', ('f', 3, 5)], 15)
    return S(int(ex) + 40, 162, o + e)

@fig
def f41_812():
    o1, e1 = RT(40, 56, '8', '12', '2', '3', '÷4')
    o2, e2 = RT(40, 150, '2', '3', '6', '9', '×3')
    return S(int(max(e1, e2)) + 30, 190, o1 + o2 + T(18, 62, '①', SUB, 14) + T(18, 156, '②', SUB, 14))

# ───────── 4-02 간단한 자연수의 비 ─────────
@fig
def f42_0615():
    o1, e1 = RT(40, 56, '0.6', '1.5', '6', '15', '×10')
    o2, e2 = RT(40, 150, '6', '15', '2', '5', '÷3')
    return S(int(max(e1, e2)) + 30, 190, o1 + o2 + T(18, 62, '①', SUB, 14) + T(18, 156, '②', SUB, 14))

@fig
def f42_frac27():
    e, x2 = EXPR(26, 44, [('f', 1, 2), ':', ('f', 3, 7), '→', '7', ':', '6'], 17)
    return S(320, 108, e + NOTE(26, 98, '두 분모 2와 7의 공배수 14를 곱해요'))

@fig
def f42_mix():
    e1, x1 = EXPR(26, 34, [('f', 1, 5), ':', '0.3', '→', ('f', 1, 5), ':', ('f', 3, 10), '→', '2', ':', '3'], 15)
    e2, x2 = EXPR(26, 100, ['0.2', ':', '0.3', '→', '2', ':', '3'], 15)
    return S(int(max(x1, x2)) + 200, 130, e1 + e2 + NOTE(x2 + 6, 104, '(모두 소수로 바꿔도 같아요)'))

@fig
def f42_samediff():
    e1, x1 = EXPR(40, 30, [('f', 2, 7), ':', ('f', 5, 7), '→', '2', ':', '5'], 14)
    e2, x2 = EXPR(40, 86, [('f', 1, 3), ':', ('f', 1, 2), '→', '2', ':', '3'], 14)
    b = ok(22, 38) + ok(22, 94) + NOTE(x1 + 10, 40, '분모가 같으면 분자끼리와 같아요', GRN) + NOTE(x2 + 10, 96, '분모가 다르면 공배수 6을 곱해요', GRN)
    b += no(22, 140) + T(40, 144, '1/3 : 1/2 → 1 : 1 (분자끼리)', RED, 13, 'start', 700)
    return S(460, 156, e1 + e2 + b)

@fig
def f42_3240():
    o1, e1 = RT(40, 56, '32', '40', '16', '20', '÷2')
    o2, e2 = RT(40, 150, '16', '20', '4', '5', '÷4')
    return S(380, 212, o1 + o2 + T(18, 62, '①', SUB, 14) + T(18, 156, '②', SUB, 14) + NOTE(20, 204, '처음부터 최대공약수 8로 나누면 한 번에 4 : 5'))

@fig
def f42_mixed():
    e, x2 = EXPR(26, 44, [('m', 1, 1, 5), ':', ('f', 3, 10), '→', ('f', 6, 5), ':', ('f', 3, 10), '→', '12', ':', '3', '→', '4', ':', '1'], 16)
    return S(max(int(x2) + 20, 360), 108, e + NOTE(26, 98, '대분수 → 가분수 → 공배수 10을 곱하고 3으로 나누어요'))

# ───────── 4-03 비례식 ─────────
@fig
def f43_14():
    o, ex, cs = PROP(30, 70, '1', '4', '2', '8', prod=False)
    e, _ = EXPR(ex + 30, 64, ['비율', ('f', 1, 4), '=', ('f', 2, 8)], 15)
    return S(int(ex) + 230, 120, o + e)

@fig
def f43_2369():
    o, ex, cs = PROP(40, 70, '2', '3', '6', '9')
    return S(int(ex) + 40, 120, o)

@fig
def f43_cmp():
    s1, _, e1 = SEQ(40, 34, ['2 : 5', '=', '4 : 10'], 16)
    s2, _, e2 = SEQ(40, 78, ['2 : 5', '≠', '4 : 9'], 16)
    b = ok(22, 34) + no(22, 78) + NOTE(e1 + 14, 34, '비율 2/5 = 4/10', GRN) + NOTE(e2 + 14, 78, '비율 2/5와 4/9가 달라요', RED)
    return S(400, 96, s1 + s2 + b)

@fig
def f43_7214():
    o, ex, cs = PROP(40, 70, '7', '2', '14', '4')
    return S(int(ex) + 230, 120, o + NOTE(ex + 20, 70, '앞의 비 7 : 2가 외항이 아니에요', RED))

@fig
def f43_4312():
    o1, e1 = RT(20, 56, '4', '3', '12', '9', '×3')
    o2, e2, cs = PROP(e1 + 50, 64, '4', '3', '12', '9')
    return S(int(e2) + 20, 116, o1 + o2)

# ───────── 4-04 비례식의 성질 ─────────
@fig
def f44_34912():
    o, ex, cs = PROP(30, 64, '3', '4', '9', '12')
    b = NOTE(ex + 24, 40, '외항의 곱 3 × 12 = 36', BLUE) + NOTE(ex + 24, 66, '내항의 곱 4 × 9 = 36', ORG)
    return S(int(ex) + 210, 112, o + b)

@fig
def f44_4q615():
    o, ex, cs = PROP(30, 64, '4', '□', '6', '15')
    s, _, x2 = SEQ(ex + 24, 52, ['4 × 15', '=', '□ × 6'], 14)
    s2, _, _ = SEQ(ex + 24, 84, ['□ × 6 = 60', '→', '□ = 10'], 14)
    return S(int(x2) + 120, 112, o + s + s2)

@fig
def f44_cmp():
    s1, _, e1 = SEQ(40, 34, ['4 : 5 = 12 : 15'], 15)
    s2, _, e2 = SEQ(40, 76, ['4 : 5 = 12 : 16'], 15)
    b = ok(22, 34) + no(22, 76) + NOTE(e1 + 14, 34, '4 × 15 = 60, 5 × 12 = 60', GRN) + NOTE(e2 + 14, 76, '4 × 16 = 64, 5 × 12 = 60', RED)
    return S(400, 94, s1 + s2 + b)

@fig
def f44_2315():
    o, ex, cs = PROP(40, 64, '2', '3', '□', '15')
    b = ok(ex + 16, 52) + T(ex + 32, 56, '2 × 15 = 3 × □ → □ = 10', GRN, 13, 'start', 700)
    b += no(ex + 16, 86) + T(ex + 32, 90, '2 × 3 (앞의 비끼리)', RED, 13, 'start', 700)
    return S(int(ex) + 250, 112, o + b)

@fig
def f44_frac():
    e, x2 = EXPR(30, 40, [('f', 2, 3), ':', ('f', 1, 6), '=', '12', ':', '□'], 16)
    e2, x3 = EXPR(30, 100, [('f', 2, 3), '×', '□', '=', ('f', 1, 6), '×', '12', '=', '2'], 14)
    return S(int(max(x2, x3)) + 120, 136, e + e2 + NOTE(x3 + 8, 104, '→ □ = 3'))

# ───────── 4-05 비례식 활용 ─────────
def UNITSEQ(x, y, a, b, c, d):
    s, cs, ex = SEQ(x, y, [a, ':', b, '=', c, ':', d], 15, {0: (LINE, HL), 4: (LINE, HL), 2: (LINE, HL2), 6: (LINE, HL2)})
    return s, cs, ex

@fig
def f45_water():
    s, cs, ex = UNITSEQ(30, 50, '3분', '12 L', '5분', '□ L')
    b = T((cs[0] + cs[4]) / 2, 22, '(시간) : (양) = (시간) : (양)', SUB, 11.5)
    s2, _, _ = SEQ(30, 94, ['3 × □ = 12 × 5', '→', '□ = 20'], 14)
    return S(int(ex) + 30, 112, s + b + s2)

@fig
def f45_tang():
    s, cs, ex = UNITSEQ(30, 50, '6개', '4200원', '8개', '□원')
    s2, _, _ = SEQ(30, 94, ['6 × □ = 4200 × 8', '→', '□ = 5600'], 14)
    return S(int(ex) + 40, 112, s + s2 + T((cs[0] + cs[4]) / 2, 22, '(개수) : (값) = (개수) : (값)', SUB, 11.5))

@fig
def f45_order():
    s1, _, e1 = SEQ(40, 34, ['2시간 : 90 km', '=', '5시간 : □ km'], 14)
    s2, _, e2 = SEQ(40, 76, ['2시간 : 90 km', '=', '□ km : 5시간'], 14)
    b = ok(22, 34) + no(22, 76) + NOTE(e1 + 10, 34, '같은 순서', GRN) + NOTE(e2 + 10, 76, '순서가 바뀜', RED)
    return S(int(max(e1, e2)) + 100, 96, s1 + s2 + b)

@fig
def f45_sugar():
    s, cs, ex = UNITSEQ(30, 50, '2 g', '50 g', '□ g', '125 g')
    s2, _, _ = SEQ(30, 94, ['50 × □ = 2 × 125', '→', '□ = 5'], 14)
    return S(int(ex) + 30, 112, s + s2 + T((cs[0] + cs[4]) / 2, 22, '(설탕) : (물) = (설탕) : (물)', SUB, 11.5))

# ───────── 4-06 비례배분 ─────────
@fig
def f46_bead(): return S(420, 80, SPLIT(20, 14, 12, [1, 3], 280, 26, ['가', '나'], '개'))
@fig
def f46_paper():
    e, _ = EXPR(20, 110, ['30', '×', ('f', 2, 5), '=', '12', ',', '30', '×', ('f', 3, 5), '=', '18'], 13)
    return S(430, 140, SPLIT(20, 14, 30, [2, 3], 300, 26, ['앞', '뒤'], '장') + e)
@fig
def f46_369():
    o = SPLIT(20, 14, 36, [4, 5], 300, 26, ['앞', '뒤'])
    return S(430, 110, o + NOTE(20, 100, '전체를 4 + 5 = 9묶음으로 → 앞의 몫 36 × 4/9 = 16'))
@fig
def f46_27():
    o = SPLIT(20, 14, 27, [4, 5], 300, 26)
    s, _, _ = SEQ(20, 100, ['12 + 15 = 27', ',', '12 : 15 = 4 : 5'], 13)
    s2 = ok(250, 104)
    return S(430, 116, o + s + s2)
@fig
def f46_flow():
    b = BOX(10, 10, 150, 46, ['① 무엇과 무엇의 비?', '순서 확인'], '#f8fafc', '#cbd2dc', LINE, 11, True)
    b += AR((162, 33), (180, 33), SUB) + BOX(182, 10, 150, 46, ['② 간단한 자연수의 비로', '소수·분수 → 자연수'], '#f8fafc', '#cbd2dc', LINE, 11, True)
    b += AR((334, 33), (352, 33), SUB) + BOX(354, 4, 150, 58, ['③ 비례식 또는 비례배분', '같은 것끼리 같은 자리', '전체를 나누면 비례배분'], PALE, '#e7c27a', ORG, 10.5, True)
    e, _ = EXPR(12, 104, ['밀가루 : 설탕 = 3 : 1', '→', '600', '×', ('f', 3, 4), '=', '450 g'], 13)
    return S(520, 130, b + e)

LFIG = {
    '4-01': ['f41_ratio27', 'f41_front58', 'f41_x2', 'f41_zero', 'f41_wrong56', 'f41_div5', 'f41_812'],
    '4-02': ['f42_0615', 'f42_frac27', 'f42_mix', 'f42_samediff', 'f42_3240', 'f42_mixed'],
    '4-03': ['f43_14', 'f43_2369', 'f43_cmp', 'f43_7214', 'f43_4312'],
    '4-04': ['f44_34912', 'f44_4q615', 'f44_cmp', 'f44_2315', 'f44_frac'],
    '4-05': ['f45_water', 'f45_tang', 'f45_order', 'f45_sugar'],
    '4-06': ['f46_bead', 'f46_paper', 'f46_369', 'f46_27', 'f46_flow'],
}
AFIG = {}
def lfig(tag, i): return F[LFIG[tag][i]]()

if __name__ == '__main__':
    import os
    o = ['<!doctype html><meta charset="utf-8"><title>긴 설명 그림</title><body style="font:13px Malgun Gothic;max-width:760px;margin:20px auto">']
    for tag, names in LFIG.items():
        for i, n in enumerate(names): o.append('<div style="border:1px solid #ddd;margin:8px 0;padding:6px"><b>%s · %d · %s</b><br>%s</div>' % (tag, i + 1, n, F[n]()))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '그림_긴설명_초6-2_4단원.html')
    open(p, 'w', encoding='utf-8').write(''.join(o)); print(p, sum(len(v) for v in LFIG.values()))
