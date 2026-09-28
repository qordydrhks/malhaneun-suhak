# -*- coding: utf-8 -*-
"""[견본] 초6-2 3-01 「어느 방향에서 보았는지」 문제 풀기 2문제 — 그림을 넣은 모양 (2026-09-28)

마스터: "이런 것도 그림이 같이 나와 주면 좋을 것 같은데?" (AI 가 만든 글로만 된 상자 배치 문제를 보고)
AI 는 입체를 못 그린다 → Claude 가 draw.py 로 그림을 그려 문제를 미리 만드는 방식의 견본.
앱에는 아직 안 넣는다(마스터 확인 뒤).

⚠️ 보는 방향과 사진의 좌우는 손으로 정하지 않고 view() 로 **계산**한다 (방향 헷갈림 = 오답 문제가 된다).
  정면(+r 쪽에서 봄)  : 사진 왼쪽 → 오른쪽 = c 작은 것 → 큰 것
  오른쪽(+c 쪽에서 봄): 사진 왼쪽 = 앞(r 큰 것)   · 동쪽에 서서 서쪽을 보면 왼손이 남쪽(앞)
  뒤(r=0 뒤에서 봄)   : 사진 왼쪽 = c 큰 것
  왼쪽(c=0 옆에서 봄) : 사진 왼쪽 = 뒤(r 작은 것)
"""
import os, sys, io, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
_d = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('draw', os.path.dirname(_d) + os.sep + 'draw.py')
D = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(D)

def cubes_of(boxes):
    """boxes = [(c, r, 층수, 색)] → 색마다 정육면체 목록"""
    return D.merge(*[D.cubes([(c, r, k) for k in range(h)], col) for c, r, h, col in boxes])

def view(boxes, side):
    """보는 쪽에서 찍은 사진: 왼쪽 열부터 [아래층 색, 위층 색, …]"""
    cells = {}
    for c, r, h, col in boxes:
        for k in range(h):
            cells[(c, r, k)] = col
    C = sorted({c for c, r, h, col in boxes}); R = sorted({r for c, r, h, col in boxes})
    H = max(b[2] for b in boxes)
    if side == 'front':   cols, near = [(c, None) for c in C], lambda c, r: -r          # 앞(큰 r)이 가깝다
    elif side == 'back':  cols, near = [(c, None) for c in reversed(C)], lambda c, r: r
    elif side == 'right': cols, near = [(None, r) for r in reversed(R)], lambda c, r: -c
    else:                 cols, near = [(None, r) for r in R], lambda c, r: c           # left
    out = []
    for cc, rr in cols:
        col_stack = []
        for k in range(H):
            cand = [(near(c, r), cells[(c, r, k)]) for (c, r, kk) in cells
                    if kk == k and (cc is None or c == cc) and (rr is None or r == rr)]
            col_stack.append(min(cand)[1] if cand else None)
        out.append(col_stack)
    return out

def photo(stacks, title='사진'):
    """사진 = 칸마다 그 색으로 칠한 앞모습"""
    u = 30
    f = D.Fig()
    H = max(len(s) for s in stacks)
    for i, st in enumerate(stacks):
        for k, col in enumerate(st):
            if not col: continue
            x, y = i * u, (H - 1 - k) * u
            bg, edge = D.PAL[col]['left'], D.PAL[col]['edge']
            pts = [(x, y), (x + u, y), (x + u, y + u), (x, y + u)]
            f.add(D._poly(pts, bg, edge, 1.3), pts)
    x0, y0, w, h = f.bbox(0)
    f = D.merge(f, D.tag(x0 + w / 2, y0 - 12, title, D.SOFT, 12.5))
    return f

# ── 문제 1 — AI 가 글로만 냈던 문제를 그림으로 ─────────────────────────────
B1 = [(1, 0, 1, 'amber'), (1, 1, 1, 'rose'), (0, 0, 1, 'blue')]     # 노랑 뒤 · 빨강 앞 · 파랑은 노랑 왼쪽
f1 = cubes_of(B1)
FIG1 = D.svg(D.merge(f1, D.view_arrow(f1, 'left', '왼쪽 옆에서 보는 쪽')))   # 배치는 그림이 보여 준다
V1 = view(B1, 'left')
Q1 = {'stem': '그림처럼 상자를 놓았어요. 왼쪽 옆에서 보았을 때 가장 가까이 보이는 상자는 무슨 색일까요?',
      'choices': ['파란색 상자', '빨간색 상자', '노란색 상자', '세 상자가 똑같이 가까워요'],
      'answer': 0,
      'explain': '왼쪽 옆에서 보면 가장 왼쪽에 놓인 파란색 상자가 가장 가까워요. 노란색 상자는 파란색 상자에 가려져요.'}

# ── 문제 2 — 사진을 보고 찍은 방향 고르기 (교재 대표 유형) ─────────────────
B2 = [(0, 0, 2, 'blue'), (1, 0, 1, 'green'), (0, 1, 1, 'rose')]     # 파랑 2층(왼쪽 뒤) · 초록(오른쪽 뒤) · 빨강(왼쪽 앞)
f2 = cubes_of(B2)
x0, y0, w, h = f2.bbox(0)
arrows = D.merge(D.view_arrow(f2, 'front', '㉠'), D.view_arrow(f2, 'right', '㉡'))
# 뒤·왼쪽 화살표는 위쪽에 — view_arrow 의 'left' 가 왼쪽 위에서 들어오므로 뒤(㉢)는 오른쪽 위에서 직접 그린다
import math
Lh = math.hypot(D.W, D.H); ux, uy = D.W / Lh, D.H / Lh
hb = (x0 + w * 0.74, y0 - 10); tb = (hb[0] + ux * 64, hb[1] - uy * 64)
back = D.Fig()
back.add('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="1.6" stroke-dasharray="5 4" '
         'marker-end="url(#ah)"/>' % (tb[0], tb[1], hb[0], hb[1], D.SOFT), [tb, hb])
back = D.merge(back, D.tag(tb[0] + 4, tb[1] - 6, '㉢', D.SOFT, 12, 600, 'start'))
arrows = D.merge(arrows, back, D.view_arrow(f2, 'left', '㉣'))
views = {s: view(B2, s) for s in ('front', 'right', 'back', 'left')}
ANSWER_SIDE = 'right'
FIG2 = D.svg(D.row([D.merge(f2, arrows), photo(views[ANSWER_SIDE], '사진')], gap=60),
             note='파란색 상자만 2층이에요.')
Q2 = {'stem': '상자를 그림처럼 놓고 사진을 찍었어요. 사진은 ㉠, ㉡, ㉢, ㉣ 중 어느 방향에서 찍은 것일까요?',
      'choices': ['㉠', '㉡', '㉢', '㉣'], 'answer': 1,
      'explain': '오른쪽 옆(㉡)에서 보면 왼쪽에 앞쪽 빨간색 상자, 오른쪽에 초록색 상자와 그 뒤로 2층인 파란색 상자의 윗부분이 보여요.'}

# ── 검산: 사진이 정답 방향 하나에만 맞는가 ─────────────────────────────────
same = [s for s, v in views.items() if v == views[ANSWER_SIDE]]
print('문제 2 사진과 똑같이 보이는 방향:', same)
for s, v in views.items():
    print('  %-5s' % s, v)
assert same == [ANSWER_SIDE], '사진이 두 방향 이상에서 똑같다 — 문제가 성립하지 않는다'
print('문제 1 왼쪽 옆 사진:', V1)

# ── 미리보기 HTML ────────────────────────────────────────────────────────
def card(no, q, fig):
    ch = ''.join('<div class=ch%s>%s %s</div>' % (' ok' if i == q['answer'] else '', '①②③④'[i], c)
                 for i, c in enumerate(q['choices']))
    return ('<div class=c><div class=h>문제 %d</div><div class=q>%s</div><div class=f>%s</div>%s'
            '<div class=a>정답 %s · %s</div></div>' % (no, q['stem'], fig, ch, '①②③④'[q['answer']], q['explain']))
html = '''<!doctype html><meta charset="utf-8"><title>문제 풀기 그림 견본</title>
<style>body{margin:0;background:#F6F4FB;font:15px/1.6 Pretendard,'맑은 고딕',sans-serif;color:#2A2350}
header{padding:18px 22px;background:#fff;border-bottom:1px solid #E7E3F3} h1{margin:0 0 4px;font-size:18px}
header p{margin:0;color:#6B6785;font-size:13.5px}
.wrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:16px;padding:18px}
.c{background:#fff;border:1px solid #E7E3F3;border-radius:16px;padding:16px 18px}
.h{display:inline-block;background:#E8EEFF;color:#3B5BDB;font-size:12px;font-weight:800;padding:2px 10px;border-radius:999px}
.q{font-weight:800;font-size:16px;margin:10px 0 8px}.f{max-width:360px;margin:0 auto 10px}
.ch{border:1.5px solid #DCE3F0;border-radius:12px;padding:9px 14px;margin:7px 0;font-weight:600}
.ch.ok{border-color:#3C8B64;background:#EEF8F2}.a{margin-top:10px;font-size:13px;color:#6B6785;border-top:1px dashed #E7E3F3;padding-top:8px}
</style><header><h1>[견본] 초6-2 「어느 방향에서 보았는지 알아볼까요」 문제 풀기 — 그림을 넣은 모양</h1>
<p>AI 가 즉석에서 만드는 대신 Claude 가 그림을 그려 미리 만든 문제입니다. 초록 칸이 정답(학생 화면에는 표시 안 됨).
사진이 정답 방향 하나에서만 그렇게 보이는지 코드로 검산했습니다.</p></header><div class=wrap>''' + \
    card(1, Q1, FIG1) + card(2, Q2, FIG2) + '</div>'
p = os.path.join(_d, '문제그림_견본_초6-2_3-01.html')
io.open(p, 'w', encoding='utf-8').write(html)
print(p)
