# -*- coding: utf-8 -*-
"""질문 계단 칸 전용 그림 (ddFig 설계도). 칸의 질문에 맞는 그림을 따로 둔다.
 · 규칙: 칸이 묻는 "결론"을 그림 글자로 적지 않는다(학생이 그림을 읽고 답하지 않게). 상황·모양만 보여 준다.
   python figs_m31.py → figs_m31.json   (export_app.py 가 칸의 figScene 으로 붙인다)"""
import io, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
B, O, G, P = '#185FA5', '#D85A30', '#9A9890', '#534AB7'

def graph(xr, yr, curves, points=None, labels=None, lines=None, ticks=True, ystep=None, title=''):
    s = {'title': title, 'axes': {'xMin': xr[0], 'xMax': xr[1], 'yMin': yr[0], 'yMax': yr[1], 'ticks': ticks}, 'curves': curves}
    if ystep: s['axes']['yStep'] = ystep
    if points: s['points'] = points
    if labels: s['labels'] = labels
    if lines: s['lines'] = lines
    return s
def cv(fn, color=B, label=None, at=None, style=None, fr=None, to=None):
    c = {'fn': fn, 'color': color}
    if label: c['label'] = label; c['labelAt'] = at
    if style: c['style'] = style
    if fr is not None: c['from'] = fr
    if to is not None: c['to'] = to
    return c
def lab(point=None, at=None, text='', dx=6, dy=-8, dot=None, color=None):
    d = {'text': text, 'dx': dx, 'dy': dy}
    if point: d['point'] = point
    if at: d['at'] = at
    if dot is not None: d['dot'] = dot
    if color: d['color'] = color
    return d

F = {}
# ── 1대단원 ───────────────────────────────────────────
F[('03.', 2)] = {'title': '넓이가 5인 정사각형',
  'points': {'A': [120, 80], 'B': [300, 80], 'C': [300, 260], 'D': [120, 260]},
  'shapes': [{'points': ['A', 'B', 'C', 'D'], 'fill': '#eef3f9', 'stroke': B}],
  'labels': [lab(at=[210, 170], text='넓이 5', dx=-24, dy=6), lab(at=[210, 260], text='한 변의 길이 = ?', dx=-52, dy=24)]}
F[('10.', 1)] = {'title': '넓이가 3, 5인 두 정사각형',
  'points': {'A': [60, 110], 'B': [190, 110], 'C': [190, 240], 'D': [60, 240], 'E': [240, 72], 'F': [408, 72], 'G': [408, 240], 'H': [240, 240]},
  'shapes': [{'points': ['A', 'B', 'C', 'D'], 'fill': '#eef3f9', 'stroke': B}, {'points': ['E', 'F', 'G', 'H'], 'fill': '#fdeee8', 'stroke': O}],
  'labels': [lab(at=[125, 175], text='넓이 3', dx=-22, dy=6), lab(at=[324, 160], text='넓이 5', dx=-22, dy=6),
             lab(at=[125, 240], text='√3', dx=-8, dy=22), lab(at=[324, 240], text='√5', dx=-8, dy=22)]}
F[('14.', 1)] = graph([-2, 2.4], [-1.6, 1.8], [], ticks=True,
  points={'O': [0, 0], 'A': [1, 0], 'B': [1, 1], 'C': [0, 1], 'P': [1.4142, 0]},
  labels=[lab(point='B', text='', dx=0, dy=0), lab(point='P', text='P', dx=4, dy=16)], title='한 변이 1인 정사각형과 원')
F[('14.', 1)]['shapes'] = [{'points': ['O', 'A', 'B', 'C'], 'stroke': B}, {'points': ['O', 'B'], 'close': False, 'stroke': O}]
F[('14.', 1)]['circles'] = [{'center': 'O', 'through': 'B', 'color': G, 'style': 'dashed'}]
F[('14.', 2)] = graph([-1, 3.2], [-1.6, 1.8], [], ticks=True,
  points={'A': [1, 0], 'B': [2, 0], 'C': [2, 1], 'D': [1, 1], 'Q': [2.4142, 0]},
  labels=[lab(point='Q', text='Q', dx=4, dy=16)], title='점 1을 꼭짓점으로 하는 정사각형')
F[('14.', 2)]['shapes'] = [{'points': ['A', 'B', 'C', 'D'], 'stroke': B}, {'points': ['A', 'C'], 'close': False, 'stroke': O}]
F[('14.', 2)]['circles'] = [{'center': 'A', 'through': 'C', 'color': G, 'style': 'dashed'}]

# ── 2대단원 (넓이 모형) ────────────────────────────────
def grid_rect(x0, y0, w1, w2, h1, h2, top, left, fill='#eef3f9'):
    x1, x2, y1, y2 = x0 + w1, x0 + w1 + w2, y0 + h1, y0 + h1 + h2
    pts = {'A': [x0, y0], 'B': [x2, y0], 'C': [x2, y2], 'D': [x0, y2], 'T': [x1, y0], 'U': [x1, y2], 'L': [x0, y1], 'R': [x2, y1]}
    return {'points': pts,
      'shapes': [{'points': ['A', 'B', 'C', 'D'], 'fill': fill, 'stroke': B}, {'points': ['T', 'U'], 'close': False, 'stroke': B}, {'points': ['L', 'R'], 'close': False, 'stroke': B}],
      'labels': [lab(at=[x0 + w1 / 2, y0], text=top[0], dx=-6, dy=-10), lab(at=[x1 + w2 / 2, y0], text=top[1], dx=-6, dy=-10),
                 lab(at=[x0, y0 + h1 / 2], text=left[0], dx=-26, dy=5), lab(at=[x0, y1 + h2 / 2], text=left[1], dx=-26, dy=5)]}
F[('29.', 1)] = dict(grid_rect(90, 60, 170, 80, 170, 80, ['a', 'b'], ['a', 'b']), title='한 변이 a+b인 정사각형')
F[('30.', 1)] = {'title': '한 변이 a인 정사각형에서 한 변이 b인 정사각형을 떼어 냄',
  'points': {'A': [100, 60], 'B': [320, 60], 'C': [320, 280], 'D': [100, 280], 'E': [240, 200], 'F': [320, 200], 'G': [240, 280]},
  'shapes': [{'points': ['A', 'B', 'C', 'D'], 'fill': '#eef3f9', 'stroke': B}, {'points': ['E', 'F', 'C', 'G'], 'fill': '#ffffff', 'stroke': O, 'style': 'dashed'}],
  'labels': [lab(at=[210, 60], text='a', dx=-4, dy=-10), lab(at=[100, 170], text='a', dx=-20, dy=5), lab(at=[280, 280], text='b', dx=-4, dy=20), lab(at=[320, 240], text='b', dx=8, dy=5)]}
F[('32.', 1)] = dict(grid_rect(100, 60, 180, 70, 150, 60, ['ax', 'b'], ['cx', 'd']), title='가로 ax+b, 세로 cx+d인 직사각형')
F[('39.', 1)] = {'title': '세로 m, 가로 a와 b인 두 직사각형',
  'points': {'A': [80, 110], 'T': [240, 110], 'B': [360, 110], 'C': [360, 220], 'U': [240, 220], 'D': [80, 220]},
  'shapes': [{'points': ['A', 'B', 'C', 'D'], 'fill': '#eef3f9', 'stroke': B}, {'points': ['T', 'U'], 'close': False, 'stroke': B}],
  'labels': [lab(at=[160, 110], text='a', dx=-4, dy=-10), lab(at=[300, 110], text='b', dx=-4, dy=-10), lab(at=[80, 165], text='m', dx=-22, dy=5)]}
F[('45.', 1)] = F[('30.', 1)]
F[('46.', 1)] = dict(grid_rect(100, 60, 170, 60, 170, 90, ['x', '2'], ['x', '3']), title='가로 x+2, 세로 x+3인 직사각형')

# ── 4대단원 (그래프) ──────────────────────────────────
F[('81.', 1)] = graph([-3.5, 3.5], [-1, 9.5], [cv('x^2', B, 'y=x²', 2.6)], ystep=2, title='y=x²의 그래프')
F[('81.', 2)] = graph([-3.5, 3.5], [-1, 9.5], [cv('x^2', B, 'y=x²', 2.6)], ystep=2, points={'V': [0, 0]},
  lines=[{'x': 0, 'color': O, 'style': 'dashed'}], labels=[lab(point='V', text='', dx=0, dy=0)], title='y=x²의 그래프와 대칭인 선')
F[('82.', 1)] = graph([-3.5, 3.5], [-9.5, 9.5], [cv('x^2', G, 'y=x²', 2.7, 'dashed'), cv('-x^2', B, 'y=−x²', 2.7)], ystep=2, title='y=x²과 y=−x²')
F[('82.', 2)] = graph([-3.5, 3.5], [-9.5, 2], [cv('-x^2', B, 'y=−x²', 2.6)], ystep=2, title='y=−x²의 그래프')
F[('83.', 1)] = graph([-3, 3], [-1, 9.5], [cv('x^2', G, 'y=x²', 2.8, 'dashed'), cv('2*x^2', B, 'y=2x²', -1.9)], ystep=2,
  points={'P': [1, 1], 'Q': [1, 2]}, labels=[lab(point='P', text='', dx=0, dy=0), lab(point='Q', text='', dx=0, dy=0)], title='y=x²과 y=2x²')
F[('83.', 2)] = graph([-4, 4], [-8.5, 8.5], [cv('0.5*x^2', B, 'y=½x²', 3.3), cv('-0.5*x^2', O, 'y=−½x²', 3.3)], ystep=2, title='y=½x²과 y=−½x²')
F[('84.', 1)] = graph([-3.5, 3.5], [-9, 9], [cv('2*x^2', B, 'a=2', -2), cv('x^2', '#3FB98C', 'a=1', 2.8), cv('0.5*x^2', P, 'a=½', 3.3),
  cv('-x^2', O, 'a=−1', -2.8)], ystep=2, title='a의 값이 다른 y=ax²')
F[('84.', 2)] = graph([-3, 3], [-9.5, 9.5], [cv('-3*x^2', O, 'y=−3x²', 1.6), cv('2*x^2', B, 'y=2x²', 2)], ystep=2, title='y=−3x²과 y=2x²')
F[('85.', 1)] = graph([-3.5, 3.5], [-1, 10], [cv('x^2', G, 'y=x²', 2.9, 'dashed'), cv('x^2+3', B, 'y=x²+3', -2.4)], ystep=2, title='y=x²과 y=x²+3')
F[('85.', 2)] = graph([-3, 3], [-3, 4], [cv('-x^2+2', B)], ticks=False, title='어떤 y=ax²+q의 그래프')
F[('86.', 1)] = graph([-3, 5], [-1, 9.5], [cv('x^2', G, 'y=x²', -2.6, 'dashed'), cv('(x-2)^2', B, 'y=(x−2)²', 4.6)], ystep=2, title='y=x²과 y=(x−2)²')
F[('86.', 2)] = graph([-3, 5], [-1, 9.5], [cv('x^2', G, 'y=x²', -2.6, 'dashed'), cv('(x-2)^2', B)], ystep=2,
  points={'V': [2, 0]}, labels=[lab(point='V', text='(2, 0)', dx=6, dy=16)], title='y=x²을 x축 방향으로 2만큼 옮긴 그래프')
F[('87.', 1)] = graph([-3, 6.5], [-1, 9.5], [cv('x^2', G, 'y=x²', -2.6, 'dashed'), cv('(x-3)^2+2', B, 'y=(x−3)²+2', 5.4)], ystep=2,
  points={'V': [3, 2]}, labels=[lab(point='V', text='', dx=0, dy=0)], title='y=x²과 y=(x−3)²+2')
F[('87.', 2)] = graph([-4, 2], [-10, 2], [cv('-2*(x+1)^2-3', B, 'y=−2(x+1)²−3', 0.4)], ystep=2, points={'V': [-1, -3]},
  labels=[lab(point='V', text='', dx=0, dy=0)], title='y=−2(x+1)²−3의 그래프')
F[('88.', 1)] = graph([-1.5, 6], [-1, 9], [cv('(x-1)^2+1', G, None, None, 'dashed'), cv('(x-3)^2+3', B)], ystep=2,
  points={'V': [1, 1], 'W': [3, 3]}, labels=[lab(point='V', text='(p, q)', dx=-40, dy=14), lab(point='W', text='?', dx=8, dy=14)], title='그래프를 평행이동')
F[('88.', 2)] = graph([-2.5, 2.5], [-1, 10], [cv('3*x^2+1', G, 'y=3x²+1', -1.6, 'dashed'), cv('3*x^2+5', B)], ystep=2, title='y=3x²+1을 y축 방향으로 4만큼 옮긴 그래프')
F[('89.', 1)] = graph([-1, 7], [-7, 7], [cv('0.5*(x-3)^2+1', B, 'y=½(x−3)²+1', 6.3), cv('-0.5*(x-3)^2-1', O, '?', 6.3)], ystep=2, title='x축에 대칭인 두 그래프')
F[('89.', 2)] = graph([-7, 7], [-2, 7], [cv('0.5*(x-3)^2+1', B, 'y=½(x−3)²+1', 6.2), cv('0.5*(x+3)^2+1', O, '?', -6.2)], ystep=2, title='y축에 대칭인 두 그래프')
F[('91.', 1)] = graph([-3.5, 2.5], [-3, 5], [cv('x^2+x-2', B, 'y=x²+x−2', 1.9)], points={'P': [-2, 0], 'Q': [1, 0], 'R': [0, -2]},
  labels=[lab(point='P', text='', dx=0, dy=0), lab(point='Q', text='', dx=0, dy=0), lab(point='R', text='', dx=0, dy=0)], title='y=x²+x−2의 그래프')
F[('91.', 2)] = graph([-3, 3], [-3, 6], [cv('x^2+1', B), cv('x^2', '#3FB98C'), cv('x^2-2', O)], ticks=False, title='x축과 만나는 모양이 다른 세 포물선')
F[('92.', 1)] = graph([-4.5, 2.5], [-5, 6], [cv('x^2+2*x-3', B, 'y=x²+2x−3', 2)], title='y=x²+2x−3의 그래프')
F[('92.', 2)] = graph([-4.5, 2.5], [-5, 6], [cv('x^2+2*x-3', B)], points={'P': [-3, 0], 'Q': [1, 0]},
  labels=[lab(point='P', text='−3', dx=-18, dy=-8), lab(point='Q', text='1', dx=6, dy=-8)], title='x축과 두 점에서 만나는 포물선')
F[('93.', 1)] = graph([-4, 2.5], [-3, 5], [cv('-x^2-2*x+3', B)], ticks=False, title='어떤 y=ax²+bx+c의 그래프')
F[('93.', 2)] = graph([-1.5, 5.5], [-3, 5], [cv('x^2-4*x+2', B)], ticks=False, lines=[{'x': 2, 'color': O, 'style': 'dashed'}], title='축이 y축의 오른쪽에 있는 포물선')

out = {'%s|%d' % k: v for k, v in F.items()}
io.open(os.path.join(HERE, 'figs_m31.json'), 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
print('그림', len(out))
