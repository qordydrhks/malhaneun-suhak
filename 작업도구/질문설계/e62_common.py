# -*- coding: utf-8 -*-
"""초6-2 설계 공통 — e42_common 의 인쇄 틀을 그대로 쓰고, 6학년 그림(조건만)만 여기에 더한다.
   K.build(units, title, src, ask, rules, name) → PDF 경로
"""
import e42_common as C
from e42_common import _svg, _t, _poly

def fr(x, y, n, d, w='', c='#374151', sz=13):
    """세운 분수(자연수 앞에 붙일 수 있음). (x, y) = 가로선 가운데"""
    o = ''
    if w:
        o += _t(x - 9, y + 5, w, c, sz + 1, 'end'); x += 0
    fw = max(len(str(n)), len(str(d))) * 8 + 4
    cx = x + fw / 2 - 6 if w else x
    o += _t(cx, y - 3, str(n), c, sz) + _t(cx, y + 13, str(d), c, sz)
    o += '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.2"/>' % (cx - fw / 2, y + 1, cx + fw / 2, y + 1, c)
    return o

FIGS = {}

def _trap62():   # 사다리꼴: 윗변 1과 1/4 m · 아랫변 2와 1/2 m · 높이 ? · 넓이 4와 1/2 m²
    A, B, Cc, D = (120, 40), (200, 40), (265, 150), (105, 150)   # 윗변 80 : 아랫변 160 = 1 : 2
    body = _poly([A, B, Cc, D])
    body += '<line x1="120" y1="40" x2="120" y2="150" stroke="#374151" stroke-width="1.4" stroke-dasharray="5 4"/>'
    body += '<polyline points="120,140 130,140 130,150" fill="none" stroke="#374151" stroke-width="1.2"/>'
    body += fr(162, 20, 1, 4, '1') + _t(176, 25, 'm', '#374151', 12, 'start')
    body += fr(185, 172, 1, 2, '2') + _t(199, 177, 'm', '#374151', 12, 'start')
    body += _t(128, 104, '?', '#b45309', 16, 'start')
    body += _t(185, 88, '넓이', '#5b6270', 11) + fr(188, 104, 1, 2, '4') + _t(202, 109, 'm²', '#5b6270', 11, 'start')
    return _svg(290, 200, body)
FIGS['trap62'] = _trap62

_fig42 = C.fig
def fig(key):
    f = FIGS.get(key)
    return f() if f else _fig42(key)
C.fig = fig

def build(units, title, src, ask, rules, name):
    html = C.render(units, title, src, ask, rules).replace('1단원 검토에서 받은 수정을 이번 설계에 적용한 것', '초4-2 검토에서 쌓인 규칙(설계규칙.md)을 이번 설계에 적용한 것')
    return C.make_pdf(html, name)

def register(figs):
    """{키: (svg, 폭px)} 를 설계 PDF 그림으로 등록 — 폭이 넓으면 질문 아래에 따로 놓는다"""
    for k, (svg, w) in figs.items():
        st = 'float:right;margin:0 0 4px 10px' if w <= 240 else 'clear:both;margin:4px 0 4px 24px'
        FIGS[k] = (lambda s=svg, w=w, st=st: '<div style="%s;width:%dpx">%s</div>' % (st, w, s.replace('style="max-width:100%;height:auto"', 'style="width:100%;height:auto"')))
