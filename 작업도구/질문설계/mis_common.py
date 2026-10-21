# -*- coding: utf-8 -*-
"""mission 문제 공통 틀 — 단원 파일(mis_e42_N.py · mis_e52_N.py)이 이걸 쓴다. 규칙은 문제설계규칙.md.

  U = Unit('e4-2', 1, '분수의 덧셈과 뺄셈', fname='문제_초4-2_1단원')
  U.mc(code, r, lv, stem, ans, [(오답, '이 답이 뜻하는 실수'), ×4], explain, val=…, fig=None, src='')
  U.tap(code, r, lv, stem, fig, tap=[…], explain, wrong={…}, src='')
  U.run()   → 세트 수·보기·값 검산 → PDF

· 정답 위치는 문제를 넣는 차례대로 ①~⑤를 돌아가며 놓는다(고르게).
· val 을 주면 정답 글자를 수로 읽어(대분수 "2와 1/3" · 분수 · 소수 · 자연수) val 과 같은지, 오답이 정답과 같은 값이 아닌지 본다.
"""
import os, sys, re, json, html
from fractions import Fraction as Fr
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, '..', '질문계단'))
import mis_e42_4 as B
import draw as D
from draw import Fig, merge, svg, tag, seg, fr
NUM = '①②③④⑤'
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))

def wa(n):
    """자연수 뒤 '와/과' (받침 따라)"""
    return '과' if str(n)[-1] in '013678' else '와'
def mx(w, n, d):
    """대분수 글자 'w와 n/d'"""
    return '%d%s %d/%d' % (w, wa(w), n, d)

_NUM = re.compile(r'^\s*(?:(\d+)\s*[와과]\s*(\d+)/(\d+)|(\d+)/(\d+)|(\d+(?:\.\d+)?))')
def val_of(s):
    """글자 앞머리의 수를 읽는다(뒤의 단위는 무시). 못 읽으면 None"""
    m = _NUM.match(str(s))
    if not m: return None
    if m.group(1): return Fr(int(m.group(1))) + Fr(int(m.group(2)), int(m.group(3)))
    if m.group(4): return Fr(int(m.group(4)), int(m.group(5)))
    return Fr(m.group(6))

def app_quiz(grade):
    """앱 데이터에서 행성마다 회차별 세트 문제 수(app/js/mission.js M.count 와 같게)"""
    t = open(os.path.join(ROOT, 'app', 'data', grade + '.js'), encoding='utf-8').read()
    d = json.loads(re.search(r'= (\{.*\});?\s*$', t, re.S).group(1))
    out = {}
    for b in d['bigs']:
        for s in b['smalls']:
            q = s['quiz']; lad = len(s.get('ladder', []))
            out[s['code']] = {'title': s['title'], 'big': b['no'], 1: int(q.get('1', 2)), 2: int(q.get('2', 2)), 3: min(5, max(2, lad))}
    return out

class Unit:
    def __init__(self, grade, no, title, fname, note=''):
        self.grade, self.no, self.title, self.fname, self.note = grade, no, title, fname, note
        self.Q, self.pos = [], 0
        self.need = {k: v for k, v in app_quiz(grade).items() if v['big'] == no}

    def mc(self, code, r, lv, stem, ans, wrongs, explain, val=None, fig=None, src=''):
        assert len(wrongs) == 4, stem
        k = self.pos % 5; self.pos += 1
        ch = [w[0] for w in wrongs]; ch.insert(k, ans)
        wrong = {}
        for w in wrongs:
            if w[1]: wrong[ch.index(w[0])] = w[1]
        self.Q.append(dict(code=code, r=r, lv=lv, kind='mc', stem=stem, choices=ch, answer=k, val=val,
                           wrong=wrong, explain=explain, fig=fig, src=src))

    def tap(self, code, r, lv, stem, fig, tap, explain, wrong=None, src=''):
        self.Q.append(dict(code=code, r=r, lv=lv, kind='tap', stem=stem, fig=fig, tap=tap, explain=explain,
                           wrong=wrong or {}, src=src))

    def check(self):
        cnt = {}
        for p in self.Q:
            assert p['code'] in self.need, p['code']
            cnt[(p['code'], p['r'], p['lv'])] = cnt.get((p['code'], p['r'], p['lv']), 0) + 1
            if p['kind'] == 'mc':
                assert len(set(p['choices'])) == 5, ('보기 겹침', p['stem'])
                if p['val'] is not None:
                    v = Fr(p['val']) if not isinstance(p['val'], Fr) else p['val']
                    a = val_of(p['choices'][p['answer']])
                    assert a == v, ('정답 값', p['stem'], p['choices'][p['answer']], v)
                    for j, c in enumerate(p['choices']):
                        if j != p['answer']:
                            assert val_of(c) != v, ('오답이 정답과 같은 값', p['stem'], c)
        bad = []
        for code, nd in self.need.items():
            for r in (1, 2, 3):
                for lv in ('basic', 'hard'):
                    if cnt.get((code, r, lv), 0) != nd[r]:
                        bad.append((code, r, lv, cnt.get((code, r, lv), 0), nd[r]))
        assert not bad, ('세트 문제 수가 앱과 다름(행성·회차·종류·지금·필요)', bad)
        pos = [0] * 5
        for p in self.Q:
            if p['kind'] == 'mc': pos[p['answer']] += 1
        print('%s %d단원 · 문제 %d · 5지 %d · 누르기 %d · 정답 위치 %s' % (self.grade, self.no, len(self.Q),
              sum(p['kind'] == 'mc' for p in self.Q), sum(p['kind'] == 'tap' for p in self.Q), pos))

    def card(self, p, i):
        lvn = ('mission %d (기본)' if p['lv'] == 'basic' else 'hard mission %d (응용)') % p['r']
        kd = '👆 누르기' if p['kind'] == 'tap' else '5지선다'
        o = ['<div class="card"><div class="hd"><span class="b">%d</span><span class="b %s">%s</span><span class="b %s">%s</span><span class="src">%s</span></div>'
             % (i, 'hard' if p['lv'] == 'hard' else '', lvn, 'tap' if p['kind'] == 'tap' else '', kd, html.escape(p['src']))]
        o.append('<div class="stem">%s</div>' % html.escape(p['stem']))
        if p['kind'] == 'tap':
            s1, w1 = B.fsvg(p['fig'](), 320, 230)
            if w1 > 300: s1, w1 = B.fsvg(p['fig'](), 600, 170)
            s2, _ = B.fsvg(p['fig'](tuple(p['tap'])), 320 if w1 <= 320 else 600, 230 if w1 <= 320 else 170)
            o.append('<div class="figs"><div>%s<div class="cap">아이 화면</div></div>%s<div>%s<div class="cap">정답(주황) — %s</div></div></div>'
                     % (s1, '' if w1 <= 320 else '<br>', s2, ' · '.join(p['tap'])))
        else:
            if p['fig']:
                o.append('<div class="figs"><div>%s</div></div>' % B.fsvg(p['fig'](), 420, 220)[0])
            o.append('<div class="chs">' + ''.join('<span class="ch%s">%s %s%s</span>' % (' ok' if j == p['answer'] else '', NUM[j], html.escape(c), ' ✔' if j == p['answer'] else '')
                                              for j, c in enumerate(p['choices'])) + '</div>')
        o.append('<div class="ex">해설 · %s</div>' % html.escape(p['explain']))
        if p.get('wrong'):
            w = ' · '.join('<b>%s</b> %s' % (NUM[k] if isinstance(k, int) else html.escape(k), html.escape(v)) for k, v in sorted(p['wrong'].items(), key=lambda kv: str(kv[0])))
            o.append('<div class="wr">오답이 뜻하는 것 → %s</div>' % w)
        o.append('</div>')
        return ''.join(o)

    def build(self):
        css = B.CSS + '''.chs{display:flex;flex-wrap:wrap;gap:4px 18px;margin:4px 0 2px 6px}.ch{margin:0}
h3{font-size:12.5px;margin:10px 0 2px;color:#5B4E8C}.card{padding:8px 11px;margin:6px 0}'''
        o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>%s</title><style>%s</style></head><body>' % (self.fname, css)]
        o.append('<h1>mission 문제 · %s %d. %s</h1>' % ({'e4-2': '초4-2', 'e5-2': '초5-2'}[self.grade], self.no, self.title))
        nb = sum(p['lv'] == 'basic' for p in self.Q); nt = sum(p['kind'] == 'tap' for p in self.Q)
        o.append('<div class="note">견본 2판 수준(기본 = 두세 단계 · 응용 = 여러 성질 잇기) · 행성마다 1·2·3회차 × mission + hard mission · '
                 '모두 %d문제(기본 %d · 응용 %d · 누르기 %d) · 정답 위치 ①~⑤ 고르게 · 모든 답 계산 검산.%s</div>'
                 % (len(self.Q), nb, len(self.Q) - nb, nt, (' ' + self.note) if self.note else ''))
        i = 0
        for code in self.need:
            o.append('<h2>%s · %s</h2>' % (code, self.need[code]['title']))
            for r in (1, 2, 3):
                for lv in ('basic', 'hard'):
                    ps = [p for p in self.Q if p['code'] == code and p['r'] == r and p['lv'] == lv]
                    o.append('<h3>%d회차 · %s (%d문제)</h3>' % (r, 'mission' if lv == 'basic' else 'hard mission', len(ps)))
                    for p in ps:
                        i += 1; o.append(self.card(p, i))
        o.append('</body></html>')
        return ''.join(o)

    def run(self):
        self.check()
        import e42_common
        print(e42_common.make_pdf(self.build(), self.fname))

# ───── 그림 도우미 (수직선 거리 · 테이프) ─────
def dist_fig(pts, arcs, unit='km', s=None):
    """pts = [(이름, 위치 수)] · arcs = [(앞 점, 뒤 점, (w,n,d) 또는 '?', 'up'|'dn')] — 위치 수 비율대로 그린다.
    점 이름은 선 바로 아래, 위 구간은 선 위로 굽고, 아래 구간은 점 이름보다 더 아래에서 굽는다(글자가 안 겹치게)."""
    xs = [float(v) for _, v in pts]; span = max(xs) - min(xs)
    s = s or 360.0 / span
    X = {k: (float(v) - min(xs)) * s for k, v in pts}
    f = merge(seg((-12, 0), (max(X.values()) + 12, 0), 'solid', '#2A2350', 1.8))
    for k, x in X.items():
        f = merge(f, D.dot((x, 0), None), tag(x, 19, k, '#2A2350', 13))
    nup = 0
    for a, b, lab, side in arcs:
        x1, x2 = X[a], X[b]; cx = (x1 + x2) / 2
        if side == 'up':
            nup += 1; base, peak = -4, -26 - 14 * (nup - 1)          # 위 구간이 여럿이면 높이를 달리
            ly = peak - 10
        else:
            base, peak = 30, 56
            ly = peak + 16
        ctrl = 2 * peak - base
        g = Fig(); g.add('<path d="M%.1f,%.1f Q%.1f,%.1f %.1f,%.1f" fill="none" stroke="#8A7BB0" stroke-width="1.2" stroke-dasharray="4 3"/>'
                         % (x1, base, cx, ctrl, x2, base), [(x1, base), (x2, base), (cx, peak)])
        if side != 'up':
            for x in (x1, x2):
                g.add('<line x1="%.1f" y1="4" x2="%.1f" y2="%.1f" stroke="#C9C2DE" stroke-width="1" stroke-dasharray="2 3"/>' % (x, x, base), [(x, base)])
        if lab == '?':
            g = merge(g, tag(cx, ly + 5, '?', '#B55B45', 14, 800))
        else:
            g = merge(g, fr(cx, ly - (4 if side == 'up' else 0), str(lab[0]), str(lab[1]), str(lab[2]), ' ' + unit, '#5B4E8C', 12))
        f = merge(f, g)
    return f

# ───── 평면 도형 도우미 (수학 좌표 cm, 위가 +) ─────
import math as _m
from mis_e42_4 import shape as _shape, line as _line, lab as _lab, ang as _ang, angle_at, CM as _CM, EDGE, FILL, GRAY, INK, HOT
def M(p): return (p[0] * _CM, -p[1] * _CM)
def P(a, r, o=(0, 0)): return (o[0] + r * _m.cos(_m.radians(a)), o[1] + r * _m.sin(_m.radians(a)))
def poly_(pts, color=EDGE, fill=FILL, w=1.7): return _shape([M(p) for p in pts], color, fill, w)
def L(p, q, c=GRAY, w=1.6, dash=False): return _line(M(p), M(q), c, w, dash)
def T(p, s, dx=0, dy=0): return _lab(M(p), s, dx, dy)
def A_(o, p, q, s, r=24, d=15): return _ang(M(o), M(p), M(q), s, r, lab_d=d)
def RA(o, p, q, s=10): return B.right_angle(M(o), M(p), M(q), s)
def tick(p, q, n=1): return D.ticks(M(p), M(q), n)
def cmt(p, q, s, side=1, d=14): return B.cmlab(M(p), M(q), s, side, d)
def circ_(R, o=(0, 0)):
    f = Fig(); f.add('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#F4F7FC" stroke="#3B6FA8" stroke-width="1.6"/>' % (o[0] * _CM, -o[1] * _CM, R * _CM),
                     [((o[0] - R) * _CM, (-o[1] - R) * _CM), ((o[0] + R) * _CM, (-o[1] + R) * _CM)])
    return f
def para4(b, s, a_deg, o=(0, 0)):
    """평행사변형 ㄱ(왼위) ㄴ(왼아래) ㄷ(오른아래) ㄹ(오른위): ㄴㄷ = b, ㄴㄱ = s, 각 ㄴ = a_deg"""
    N = o; C = (o[0] + b, o[1]); A = P(a_deg, s, N); Dd = (A[0] + b, A[1])
    return A, N, C, Dd
def rhomb(side, a_deg, o=(0, 0)):
    """마름모 ㄱ(위) ㄴ(왼) ㄷ(아래) ㄹ(오른), ㄴ 의 각 a_deg"""
    h = side * _m.sin(_m.radians(a_deg / 2)); w = side * _m.cos(_m.radians(a_deg / 2))
    return (o[0] + w, o[1] + h), o, (o[0] + w, o[1] - h), (o[0] + 2 * w, o[1])
def inter(p1, p2, p3, p4):
    """두 직선 p1p2, p3p4 의 만나는 점"""
    x1, y1 = p1; x2, y2 = p2; x3, y3 = p3; x4, y4 = p4
    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
def foot(p, a, b):
    """점 p 에서 직선 ab 에 내린 수선의 발"""
    ax, ay = a; bx, by = b; dx, dy = bx - ax, by - ay
    t = ((p[0] - ax) * dx + (p[1] - ay) * dy) / (dx * dx + dy * dy)
    return (ax + t * dx, ay + t * dy)
