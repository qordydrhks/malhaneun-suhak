# -*- coding: utf-8 -*-
"""고등 미적분Ⅰ 「함수의 최댓값과 최솟값의 활용」 — 대화형 풀이 설계도 견본 (2026-10-16)
   마스터 10/15~16: 고등은 문제를 주고 아이 대답에 따라 다음 질문을 유연하게.
   설계 방식 = 「지점 지도」(풀이 순서 대신 꼭 거쳐야 할 지점 + 풀이 길 여러 개)
             + 계산은 「세우기·해석은 아이, 중간 계산은 앱이 써 줌, 결정적인 칸만 아이」
             + 회차마다 아이 몫을 늘림(1회차 빈칸 1 → 2회차 연습장+결과 입력 → 3회차 먼저 부딪혀 보기)
   원천: 숨마쿰 라우데 미적분Ⅰ 175~176쪽(기본 개념 029 · 개념Q) · 180쪽 기본 예제 11-3(숫자 바꿈)
         교재 파일 「고2 미적분 숨마쿰 라우데2.pdf」 인쇄 쪽 = 인덱스 + 149
   실행: python -X utf8 h_calc1_maxmin.py → 검산 후 설계_고등_미적분1_최대최소활용_견본.pdf
"""
import html, os, sys
from sympy import symbols, expand, factor, sqrt, simplify, solve, diff, discriminant, S, nsolve
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from e42_common import make_pdf
e = html.escape
t = symbols('t', real=True)

# ── 검산 ──
CHK = []
def chk(n, ok): CHK.append((n, bool(ok)))
f = (t - 10)**2 + (t**2 - 2)**2
chk('f 전개', expand(f) == t**4 - 3*t**2 - 20*t + 104)
fp = diff(f, t)
chk("f' 식", expand(fp) == 4*t**3 - 6*t - 20)
chk("f' 인수분해", expand(2*(t - 2)*(2*t**2 + 4*t + 5) - fp) == 0)
chk('2t²+4t+5 실근 없음', discriminant(2*t**2 + 4*t + 5, t) < 0)
chk('실근 t=2 하나', solve(fp, t) == [2])
chk('t<2 감소 · t>2 증가', fp.subs(t, 1.9) < 0 and fp.subs(t, 2.1) > 0)
chk('최소 거리 2√17', simplify(sqrt(f.subs(t, 2)) - 2*sqrt(17)) == 0)
chk('수직 조건 = 같은 삼차식', expand(2*t*(t**2 - 2) + (t - 10)) == 2*t**3 - 3*t - 10)
chk('삼차식 = (t-2)(2t²+4t+5)', expand((t - 2)*(2*t**2 + 4*t + 5)) == 2*t**3 - 3*t - 10)
# 2회차 숫자 바꾼 문제: 점 (5, -1)
g = (t - 5)**2 + (t**2 + 1)**2
chk('2회차 g 전개', expand(g) == t**4 + 3*t**2 - 10*t + 26)
chk("2회차 g'", expand(diff(g, t) - 2*(t - 1)*(2*t**2 + 2*t + 5)) == 0 and discriminant(2*t**2 + 2*t + 5, t) < 0)
chk('2회차 최소 거리 2√5', simplify(sqrt(g.subs(t, 1)) - 2*sqrt(5)) == 0)

# ── 지점 ──  (id, 길, 이름, 묻는 말, [인정하는 말], 앱이 써 주는 식, [되묻기], 짧은 설명, 실수 길, 회차별 표시)
P = [
 ('M1', '공통', '곡선 위의 점을 문자로',
  '움직이는 점 P를 어떻게 나타내고 시작할래?',
  ['P(t, t²) — x좌표를 문자로 놓으면 y좌표는 그 제곱', '"곡선 위니까 (a, a²)"처럼 다른 문자도 인정'],
  'P(t, t²)',
  ['P는 곡선 y = x² 위에 있어. x좌표를 t라 하면 y좌표는?'],
  '곡선 위를 움직이는 점은 x좌표 하나만 문자로 놓으면 y좌표가 따라 정해져. 그래서 변수 하나로 거리를 나타낼 수 있어. (교재 176쪽 ①)',
  '', ''),
 ('A2', '길 A', '거리를 t의 식으로',
  '점 A와 점 P 사이의 거리를 t로 나타내 볼래?',
  ['두 점 사이의 거리 공식을 쓴다', '√((t − 10)² + (t² − 2)²)'],
  'AP = √((t − 10)² + (t² − 2)²)',
  ['두 점 사이의 거리는 x좌표의 차와 y좌표의 차로 어떻게 나타내?'],
  '두 점 사이의 거리는 √((x좌표의 차)² + (y좌표의 차)²)이야.',
  '', ''),
 ('A3', '길 A', '√ 대신 √ 안의 식을 최소로',
  'AP에는 √가 있어. 무엇을 가장 작게 만들면 될까? 왜 그래도 돼?',
  ['√ 안의 식, 곧 AP²을 가장 작게 만든다', 'AP는 0 이상이라 AP가 가장 작을 때 AP²도 가장 작다(같은 t)'],
  'f(t) = AP² = (t − 10)² + (t² − 2)² = t⁴ − 3t² − 20t + 104',
  ['AP가 가장 작은 t에서 AP²은 어때? AP가 음수가 될 수 있어?'],
  '거리는 0 이상이라, 거리가 가장 작아지는 t에서 거리의 제곱도 가장 작아져. 그래서 √를 없앤 다항식 AP²만 미분하면 돼. (교재 180쪽 11-3)',
  '√가 있는 식을 그대로 미분하려 함 → 미적분Ⅰ은 다항함수만 미분함, 위 되묻기로', ''),
 ('A4', '길 A', '도함수가 0인 t 찾기',
  'f(t)가 가장 작아지는 t를 찾으려면 무엇을 해?',
  ['f′(t) = 0인 t를 찾는다(극값 후보)', '2t² + 4t + 5 = 0은 실근이 없어 버린다'],
  "f′(t) = 4t³ − 6t − 20 = 2(t − 2)(2t² + 4t + 5)  →  t = 2",
  ['극값이 생길 수 있는 곳은 도함수가 어떤 값일 때야?', '(앱이 인수분해를 보여 준 뒤) 2t² + 4t + 5 = 0의 근은 왜 안 써?'],
  '최대·최소가 될 수 있는 곳은 도함수가 0인 곳이야. 2t² + 4t + 5 = 0은 판별식이 음수라 실근이 없어.',
  '', '2회차 체크포인트: 「f′(t) = 0의 실근 t = ?」 입력'),
 ('A5', '길 A', '정말 최소인지 판정',
  't = 2에서 f′(t) = 0이야. 그런데 이 점에서 거리가 「가장 작다」는 건 어떻게 알 수 있어?',
  ['t = 2 앞에서 f′(t) < 0(감소), 뒤에서 f′(t) > 0(증가)이라 극소', '극값이 이것 하나뿐이라 극소가 곧 최소'],
  '증감표:  t … 2 …  /  f′(t)  −  0  +  /  f(t)  ↘  68  ↗',
  ['t가 2보다 조금 작을 때와 조금 클 때 f′(t)의 부호는?'],
  'f′(t) = 0인 점은 「후보」일 뿐이야. 앞뒤로 감소 → 증가면 극소고, 극값이 이것 하나뿐이면 그 극소가 최소야. (교재 176쪽 ③④)',
  'f′(t) = 0만 구하고 바로 최소라고 함 → 위 묻는 말이 바로 이 확인', '1회차 빈칸: 증감표의 f′(t) 부호 두 칸을 아이가 누름'),
 ('B2', '길 B', '최소일 때 AP ⊥ 접선',
  '(아이가 「수직」으로 시작했을 때) 좋아, 그 생각으로 가 보자.',
  ['거리가 가장 짧을 때 선분 AP는 점 P에서의 접선과 수직이다'],
  'AP ⊥ (점 P에서의 접선)',
  [], '', '', '교재 밖 풀이 — 아이가 먼저 말하면 인정하고 따라감'),
 ('B3', '길 B', '두 기울기를 t로',
  '점 P에서의 접선의 기울기와 직선 AP의 기울기를 t로 나타내 볼래?',
  ['접선의 기울기 = 2t (y = x²를 미분)', 'AP의 기울기 = (t² − 2)/(t − 10)'],
  '접선 기울기 2t,  AP 기울기 (t² − 2)/(t − 10)',
  ['곡선 위 점에서의 접선의 기울기는 무엇으로 구해?'],
  '곡선 y = f(x) 위의 점 (t, f(t))에서의 접선의 기울기는 f′(t)야.',
  '', ''),
 ('B4', '길 B', '수직 → 기울기의 곱 −1',
  '두 직선이 수직이면 기울기 사이에 어떤 관계가 있어?',
  ['기울기의 곱이 −1'],
  '2t · (t² − 2)/(t − 10) = −1  →  2t³ − 3t − 10 = 0  →  (t − 2)(2t² + 4t + 5) = 0  →  t = 2',
  ['기울기가 m인 직선과 수직인 직선의 기울기는?'],
  '수직인 두 직선의 기울기의 곱은 −1이야.',
  '', ''),
 ('B5', '길 B', '수직이면 꼭 최소인지',
  '수직이 되는 점이 t = 2 하나뿐이네. 그런데 수직이 되기만 하면 꼭 「가장 가까운」 점일까?',
  ['수직은 최소가 될 후보를 찾는 조건일 뿐이다', '수직인 점이 하나뿐이고 P가 멀어지면 거리가 한없이 커지므로 그 점이 최소다(또는 AP²의 증감으로 확인)'],
  '',
  ['가장 먼 점이나 극대인 점에서도 수직이 될 수 있지 않을까?'],
  '수직 조건은 후보를 찾는 것이라 최소인지는 따로 확인해야 해. 이 문제는 수직인 점이 하나뿐이고 P가 멀리 갈수록 거리가 커지니 그 점이 최소야.',
  '', '「한 번 더 생각해야 하는 지점」의 예'),
 ('A6', '공통', '답 되돌리기',
  '그럼 점 P의 좌표와 최소 거리는?',
  ['P(2, 4)', '최소 거리 √68 = 2√17'],
  'P(2, 4),  최소 거리 √f(2) = √68 = 2√17',
  ['68은 AP²의 값이야. 거리 AP는?'],
  '',
  '거리를 68이라고 답함 → 위 되묻기', '2회차 체크포인트: 「최소 거리 = ?」 입력(√ 키)'),
]
PD = {p[0]: p for p in P}

# ── 그림 ──
def fig_problem():
    W, H = 340, 250
    X = lambda x: 26 + (x + 1.6) * 23.5
    Y = lambda y: 228 - (y + 1) * 15.5
    s = ['<svg viewBox="0 0 %d %d" width="300" xmlns="http://www.w3.org/2000/svg" font-family="Cambria Math,Malgun Gothic,serif">' % (W, H)]
    s.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#555" stroke-width="1.2"/>' % (X(-1.6), Y(0), X(11.3), Y(0)))
    s.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#555" stroke-width="1.2"/>' % (X(0), Y(-1), X(0), Y(13.2)))
    s.append('<text x="%.1f" y="%.1f" font-size="13" font-style="italic">x</text>' % (X(11.3) - 2, Y(0) + 15))
    s.append('<text x="%.1f" y="%.1f" font-size="13" font-style="italic">y</text>' % (X(0) + 5, Y(13.2) + 4))
    s.append('<text x="%.1f" y="%.1f" font-size="12">O</text>' % (X(0) - 13, Y(0) + 14))
    pts = ' '.join('%.1f,%.1f' % (X(x / 20), Y((x / 20) ** 2)) for x in range(-32, 72))
    s.append('<polyline points="%s" fill="none" stroke="#1f4fa8" stroke-width="2.2"/>' % pts)
    s.append('<text x="%.1f" y="%.1f" font-size="13" fill="#1f4fa8"><tspan font-style="italic">y</tspan>=<tspan font-style="italic">x</tspan>²</text>' % (X(3.7), Y(12.5)))
    tp = 1.25
    s.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#9a5b00" stroke-width="1.6" stroke-dasharray="5 4"/>' % (X(tp), Y(tp * tp), X(10), Y(2)))
    s.append('<circle cx="%.1f" cy="%.1f" r="3.6" fill="#1c2230"/><text x="%.1f" y="%.1f" font-size="13">P</text>' % (X(tp), Y(tp * tp), X(tp) - 16, Y(tp * tp) - 4))
    s.append('<circle cx="%.1f" cy="%.1f" r="3.6" fill="#1c2230"/><text x="%.1f" y="%.1f" font-size="13">A(10, 2)</text>' % (X(10), Y(2), X(10) - 30, Y(2) - 9))
    s.append('</svg>')
    return ''.join(s)

ST = {'solo': ('#d9f2e3', '#1e7a46', '혼자'), 'ask': ('#dbe8fb', '#2556a8', '되묻기 뒤'), 'tea': ('#fdebd3', '#a35a00', '설명 보고'),
      'app': ('#fbdada', '#b3261e', '앱이 써 줌(막힘)'), 'no': ('#f1f2f5', '#8a909c', '안 감'), 'none': ('#ffffff', '#1c2230', '')}
def fig_map(status=None, w=640):
    status = status or {}
    bx = {'M1': (240, 40), 'A2': (90, 105), 'A3': (90, 160), 'A4': (90, 215), 'A5': (90, 270),
          'B2': (390, 105), 'B3': (390, 160), 'B4': (390, 215), 'B5': (390, 270), 'A6': (240, 335)}
    BW, BH = 170, 38
    s = ['<svg viewBox="0 0 650 %d" width="%d" xmlns="http://www.w3.org/2000/svg" font-family="Malgun Gothic,sans-serif">' % (410 if status else 380, w)]
    s.append('<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8a909c"/></marker></defs>')
    def line(a, b):
        (x1, y1), (x2, y2) = bx[a], bx[b]
        sx, ex = x1 + BW / 2, x2 + BW / 2
        if a == 'M1': sx, ex = (x1 + 40, x2 + BW - 20) if b == 'A2' else (x1 + BW - 40, x2 + 20)
        s.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#8a909c" stroke-width="1.4" marker-end="url(#ar)"/>' % (sx, y1 + BH, ex, y2 - 2))
    for a, b in [('M1', 'A2'), ('M1', 'B2'), ('A2', 'A3'), ('A3', 'A4'), ('A4', 'A5'), ('A5', 'A6'), ('B2', 'B3'), ('B3', 'B4'), ('B4', 'B5'), ('B5', 'A6')]:
        line(a, b)
    s.append('<text x="92" y="99" font-size="12" fill="#2556a8" font-weight="700">길 A · 거리 제곱</text>')
    s.append('<text x="560" y="99" font-size="12" fill="#6d3fd0" font-weight="700" text-anchor="end">길 B · 수직 조건</text>')
    s.append('<rect x="240" y="2" width="170" height="26" rx="13" fill="#1c2230"/><text x="325" y="20" font-size="12.5" fill="#fff" text-anchor="middle">문제를 보여 준다</text>')
    s.append('<line x1="325" y1="28" x2="325" y2="38" stroke="#8a909c" stroke-width="1.4" marker-end="url(#ar)"/>')
    for k, (x, y) in bx.items():
        fill, ink, _ = ST[status.get(k, 'none')]
        edge = '#2556a8' if k.startswith('A') and k != 'A6' else ('#6d3fd0' if k.startswith('B') else '#1c2230')
        s.append('<rect x="%d" y="%d" width="%d" height="%d" rx="9" fill="%s" stroke="%s" stroke-width="1.6"/>' % (x, y, BW, BH, fill, edge))
        s.append('<text x="%d" y="%d" font-size="11" font-weight="700" fill="%s">%s</text>' % (x + 9, y + 15, edge, k))
        s.append('<text x="%d" y="%d" font-size="12" fill="%s">%s</text>' % (x + 9, y + 31, ink, e(PD[k][2])))
    if status:
        lx = 18
        for key in ('solo', 'ask', 'tea', 'app', 'no'):
            fill, ink, lab = ST[key]
            s.append('<rect x="%d" y="390" width="14" height="14" rx="3" fill="%s" stroke="%s"/><text x="%d" y="402" font-size="11.5" fill="#1c2230">%s</text>' % (lx, fill, ink, lx + 19, lab))
            lx += 19 + len(lab) * 13 + 24
    s.append('</svg>')
    return ''.join(s)

CSS = '''
:root{--ink:#1c2230;--sub:#5b6270;--line:#d8dce3;--acc:#1f3a68;--A:#2556a8;--B:#6d3fd0}
@page{size:A4;margin:10mm 12mm}*{box-sizing:border-box}
body{margin:0;color:var(--ink);font:9.2pt/1.45 "Pretendard","Malgun Gothic",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-size:15.5pt;margin:0 0 2px}h2{font-size:12pt;margin:12px 0 5px;padding-left:8px;border-left:5px solid var(--acc)}
.sub{color:var(--sub);font-size:8.7pt}.pb{break-before:page}
.box{border:1px solid var(--line);border-radius:8px;padding:7px 12px;margin:6px 0;break-inside:avoid}.box ul,.box ol{margin:2px 0;padding-left:18px}
.idea{border-left:4px solid var(--acc);background:#f7f9fc}
.prob{display:flex;gap:12px;align-items:flex-start}.prob .q{flex:1;font-size:10.5pt;font-weight:600}
.m{font-family:"Cambria Math","Malgun Gothic",serif}
table{border-collapse:collapse;width:100%;font-size:8.6pt;margin:4px 0}td,th{border:1px solid var(--line);padding:3px 6px;text-align:left;vertical-align:top}th{background:#f3f5f9}
.card{border:1px solid var(--line);border-radius:8px;margin:6px 0;break-inside:avoid;overflow:hidden}
.card .hd{padding:4px 10px;font-weight:700;color:#fff}.hdA{background:var(--A)}.hdB{background:var(--B)}.hdC{background:var(--ink)}
.card .bd{padding:4px 10px 6px}.card .row{display:flex;gap:6px;margin:2px 0}.card .k{min-width:74px;color:var(--sub);font-size:8.4pt}
.note{font-size:8.4pt;background:#fff7e6;border-radius:5px;padding:1px 8px;margin-top:3px}
.chat{font-size:8.8pt;margin:3px 0}.chat .a{color:var(--acc);font-weight:700}.chat .s{color:#9a5b00;font-weight:700}.chat .n{color:var(--sub);font-size:8.3pt;margin-left:18px}
.lines .ln{display:block;border-bottom:1px solid #c9a36b;height:15px}
.chk{display:flex;align-items:flex-end;gap:10px;margin:3px 0 0;font-size:8.4pt;color:var(--sub);white-space:nowrap}.chk .ln{flex:1;border-bottom:1px solid #aab;height:12px}
'''

def card(p):
    pid, road, name, ask, ok, note, asks, teach, wrong, rnd = p
    cls = 'hdA' if road == '길 A' else ('hdB' if road == '길 B' else 'hdC')
    o = ['<div class="card"><div class="hd %s">%s · %s · %s</div><div class="bd">' % (cls, pid, e(road), e(name))]
    rows = [('묻는 말', ask), ('인정하는 말', ' / '.join(ok)), ('앱이 써 주는 식', note), ('되묻기', ' → '.join(asks)), ('짧은 설명', teach)]
    for k, v in rows:
        if v: o.append('<div class="row"><span class="k">%s</span><span class="%s">%s</span></div>' % (k, 'm' if k == '앱이 써 주는 식' else '', e(v)))
    if wrong: o.append('<div class="note">⚠ 자주 빠지는 길: %s</div>' % e(wrong))
    if rnd: o.append('<div class="note" style="background:#eef6f4">🔁 %s</div>' % e(rnd))
    o.append('<div class="chk">☐ 좋아요 ☐ 고침 ☐ 뺌<span class="ln"></span></div></div></div>')
    return ''.join(o)

def chat(lines):
    o = ['<div class="box">']
    for who, txt in lines:
        if who == 'n': o.append('<div class="chat"><div class="n">↳ %s</div></div>' % e(txt))
        else: o.append('<div class="chat"><span class="%s">%s</span> %s</div>' % ('a' if who == 'a' else 's', '앱' if who == 'a' else '학생', e(txt)))
    o.append('</div>')
    return ''.join(o)

def render():
    o = []; w = o.append
    w('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>설계 고등 미적분Ⅰ 최대최소 활용 견본</title><style>%s</style></head><body>' % CSS)
    w('<h1>고등 미적분Ⅰ 「최댓값과 최솟값의 활용」 대화형 풀이 설계도 — 견본 1문제</h1>')
    w('<div class="sub">원천: 숨마쿰 라우데 미적분Ⅰ 175~176쪽(기본 개념 029·개념 Q) · 180쪽 기본 예제 11-3 (숫자 바꿈) · 2026-10-16 · 식·값 검산 %d건 통과</div>' % len(CHK))
    w('<div class="box idea"><b>이 견본이 보여 주는 것 세 가지</b><ol>'
      '<li><b>지점 지도</b> — 풀이를 순서 하나로 정하지 않고 「꼭 거쳐야 할 지점」과 「풀이 길 두 개」로 정한다. 앱은 아이 말이 어느 지점까지 왔는지만 알아보고, 아직 못 간 가장 가까운 지점의 질문을 던진다.</li>'
      '<li><b>계산 나누기</b> — 식을 세우는 것과 결과를 해석하는 것은 아이가 말로, 길고 기계적인 계산은 앱이 풀이 노트에 써 준다(미리 풀어 검산한 식). 결정적인 칸만 아이가 채운다.</li>'
      '<li><b>회차마다 아이 몫을 늘림</b> — 1회차 앱이 이끌고 빈칸 1개 → 2회차 연습장에 풀고 결과만 입력 → 3회차 먼저 부딪혀 보기.</li></ol></div>')
    w('<h2>문제</h2><div class="box prob"><div class="q">곡선 <span class="m">y = x²</span> 위를 움직이는 점 P와 점 <span class="m">A(10, 2)</span> 사이의 거리가 최소일 때, 점 P의 좌표와 그때의 거리를 구하시오.'
      '<div class="sub" style="font-weight:400;margin-top:6px">정답: <span class="m">P(2, 4)</span>, 최소 거리 <span class="m">2√17</span> · 그림은 조건만(P는 아무 위치) — 답이 되는 점이나 수직 표시는 그리지 않는다.</div></div>%s</div>' % fig_problem())
    w('<h2>지점 지도</h2><div class="box" style="text-align:center">%s<div class="sub" style="text-align:left">길 A = 교재 풀이(거리의 제곱을 미분) · 길 B = 교재 밖 풀이(최소일 때 AP가 접선과 수직). 아이가 어느 길로 시작하든 그 길을 따라가고, 마지막 지점(A6)에서 만난다. 한 번에 여러 지점을 말하면 한꺼번에 인정한다.</div></div>' % fig_map())
    w('<div class="box"><b>다음 질문 고르는 규칙 (모든 문제에 같은 규칙)</b><ol>'
      '<li>아이 말 → AI가 지점 목록에서 <b>어디까지 왔는지</b>만 고른다(목록에서 고르기라 정확함, 뜻이 같은 다른 표현도 인정).</li>'
      '<li>「자주 빠지는 길」에 해당하면 그 되묻기를 먼저 한다.</li>'
      '<li>아니면 <b>앞 지점을 다 지난, 아직 못 간 첫 지점</b>의 「묻는 말」을 던진다.</li>'
      '<li>한 지점에서 두 번 막히면 짧은 설명 → 그래도 안 되면 앱이 그 지점 식을 써 주고 「막힘」으로 기록한 뒤 다음 지점으로.</li>'
      '<li>지점을 지날 때마다 앱이 풀이 노트에 「앱이 써 주는 식」을 한 줄씩 적는다. 아이는 노트를 보며 다음 생각을 이어 간다.</li></ol></div>')
    w('<h2>지점별 카드</h2>')
    for pid in ('M1', 'A2', 'A3', 'A4', 'A5', 'B2', 'B3', 'B4', 'B5', 'A6'):
        w(card(PD[pid]))
    w('<h2 class="pb">대화 예시 — 같은 문제, 세 아이</h2>')
    w('<div class="sub">① 빠른 아이 (1회차) — 한 번에 여러 지점을 말함</div>')
    w(chat([('a', '움직이는 점 P를 어떻게 나타내고 시작할래?'),
            ('s', 'P를 t, t제곱으로 놓고, 거리 제곱을 t로 나타내서 미분해서 0 되는 데를 찾을래요.'),
            ('n', 'M1 · A2 · A3 · A4 한꺼번에 인정 → 노트에 P(t, t²), f(t) = t⁴ − 3t² − 20t + 104, f′(t) = 2(t − 2)(2t² + 4t + 5), t = 2'),
            ('a', 't = 2에서 f′(t) = 0이야. 그런데 이 점에서 거리가 「가장 작다」는 건 어떻게 알 수 있어?'),
            ('s', '2 앞에서는 미분값이 음수, 뒤에서는 양수라서 줄다가 느니까요.'),
            ('n', 'A5 인정(증감표의 부호 칸 빈칸은 아이가 이미 말했으니 건너뜀) → 노트에 증감표'),
            ('a', '그럼 점 P의 좌표와 최소 거리는?'), ('s', '(2, 4)고, 루트 68이니까 2루트17이요.'), ('n', 'A6 인정 · 전부 「혼자」')]))
    w('<div class="sub">② 막히는 아이 (1회차) — 자주 빠지는 길로 감</div>')
    w(chat([('a', '움직이는 점 P를 어떻게 나타내고 시작할래?'), ('s', '거리 l을 구해서 미분하면 돼요.'),
            ('n', 'M1을 아직 안 지남 → M1 되묻기'),
            ('a', 'P는 곡선 y = x² 위에 있어. x좌표를 t라 하면 y좌표는?'), ('s', 't제곱이요.'),
            ('n', 'M1 「되묻기 뒤」 → 노트에 P(t, t²). 아이가 이미 거리를 말했으니 A2 묻는 말 → 거리 공식으로 답해 A2 「혼자」'),
            ('a', 'AP에는 √가 있어. 무엇을 가장 작게 만들면 될까? 왜 그래도 돼?'), ('s', '…루트를 미분해요?'),
            ('n', '자주 빠지는 길 → A3 되묻기'),
            ('a', 'AP가 가장 작은 t에서 AP²은 어때? AP가 음수가 될 수 있어?'), ('s', '모르겠어요.'),
            ('n', '두 번 막힘 → 짧은 설명(거리는 0 이상이라 AP가 가장 작은 t에서 AP²도 가장 작다) → A3 「설명 보고」, 노트에 f(t)'),
            ('a', 'f(t)가 가장 작아지는 t를 찾으려면 무엇을 해?'), ('s', '미분해서 0이요.'), ('n', 'A4 「혼자」 … 이하 같은 방식')]))
    w('<div class="sub">③ 다른 길로 가는 아이 — 길 B</div>')
    w(chat([('a', '움직이는 점 P를 어떻게 나타내고 시작할래?'), ('s', 'P를 (t, t²)로 놓고요, 제일 가까울 때는 AP가 접선이랑 수직이에요.'),
            ('n', 'M1 · B2 인정 → 길 B를 따라감'),
            ('a', '점 P에서의 접선의 기울기와 직선 AP의 기울기를 t로 나타내 볼래?'), ('s', '접선은 2t, AP는 t제곱 빼기 2 나누기 t 빼기 10이요.'),
            ('a', '두 직선이 수직이면 기울기 사이에 어떤 관계가 있어?'), ('s', '곱하면 −1이요.'),
            ('n', 'B3 · B4 인정 → 노트에 2t³ − 3t − 10 = 0 → (t − 2)(2t² + 4t + 5) = 0 → t = 2'),
            ('a', '수직이 되는 점이 t = 2 하나뿐이네. 그런데 수직이 되기만 하면 꼭 「가장 가까운」 점일까?'),
            ('n', '「한 번 더 생각해야 하는 지점」 — 교재 풀이(길 A)에는 없고 길 B에서만 생기는 확인. 못 하면 되묻기·짧은 설명')]))
    w('<h2 class="pb">회차마다 달라지는 것</h2><table><tr><th style="width:12%">회차</th><th style="width:30%">시작</th><th>계산</th><th style="width:22%">확인되는 것</th></tr>'
      '<tr><td>1회차<br>(약 4분)</td><td>앱이 M1부터 묻고 아이 말에 따라 지점을 건너뜀</td><td>앱이 풀이 노트에 식을 써 줌. <b>빈칸 1개</b> — 증감표의 f′(t) 부호 두 칸(− / +)을 아이가 누름</td><td>지점마다 연결이 되는지</td></tr>'
      '<tr><td>2회차<br>(약 6분)</td><td>숫자 바꾼 같은 유형 문제. 아이가 먼저 방법을 말하고 대화로</td><td>아이가 <b>연습장에 직접</b> 풀고 체크포인트 2곳만 입력: ① f′(t) = 0의 실근 ② 최소 거리(√ 키). 틀리면 그 단계 식을 보여 주고 「어디서 달라졌는지 찾아봐」 → 계산 실수 / 개념 오류를 가름</td><td>풀어내는 힘</td></tr>'
      '<tr><td>3회차<br>(약 2분)</td><td><b>먼저 부딪혀 보기</b> — 아무 도움 없이 「어떤 차례로 풀지」만 말함</td><td>계산 없음. 말한 전략을 지점 지도에 겹쳐 「혼자 간 지점」만 기록 → 못 간 첫 지점부터 대화로 이어 감</td><td>스스로 시작하는 힘</td></tr></table>')
    w('<div class="sub">2회차 숫자 바꾼 문제(검산함): 곡선 y = x² 위의 점 P와 점 (5, −1) 사이의 거리 최소 → P(1, 1), 최소 거리 2√5. '
      '실제 설계에서는 2회차를 같은 유형의 더 어려운 문제(자이스토리·올림포스 기출)로 바꾼다 — 이 견본은 진행 모습만 보여 준다.</div>')
    w('<h2>어른 화면 — 지점 지도에 색칠</h2><div class="box" style="text-align:center">%s</div>' %
      fig_map({'M1': 'ask', 'A2': 'solo', 'A3': 'tea', 'A4': 'solo', 'A5': 'app', 'A6': 'solo', 'B2': 'no', 'B3': 'no', 'B4': 'no', 'B5': 'no'}, 560))
    w('<div class="box"><b>선생님에게</b> 식 세우기(A2)·도함수(A4)는 혼자 했지만, <b>「도함수가 0인 점이 왜 최소인지」(A5) 판정이 비어 있음</b>. 거리의 제곱으로 바꾸는 까닭(A3)도 설명을 보고 넘어감. → 숨마쿰 176쪽 ③④, 증감표로 최대·최소 판정하는 문제 2~3개.<br>'
      '<b>학부모에게</b> 「식은 세우는데, 구한 값이 정말 가장 작은지 확인하는 단계를 아직 혼자 못 해요. 문제를 풀고 나서 \'이게 왜 최소야?\'라고 한 번 물어봐 주세요.」</div>')
    w('<h2>이 유형 묶음에서 같은 틀로 만들 문제(제안)</h2><table><tr><th>문제 꼴</th><th>이 꼴에만 있는 지점(함정)</th></tr>'
      '<tr><td>곡선 위의 점과 점·직선 사이 거리 최소 (이 견본)</td><td>√ 대신 제곱 · 수직 조건(교재 밖 길)</td></tr>'
      '<tr><td>곡선과 x축으로 둘러싸인 부분에 내접하는 직사각형 넓이 최대</td><td>변수를 어느 꼭짓점에 둘지 · <b>t의 범위(정의역)</b> 정하기</td></tr>'
      '<tr><td>종이 모서리를 잘라 만든 상자 부피 최대</td><td>잘라 낸 길이의 범위 · 양 끝 값과 비교</td></tr>'
      '<tr><td>구·원뿔에 내접하는 원뿔·원기둥 부피 최대</td><td>단면 그림으로 변수 하나에 묶기(피타고라스)</td></tr>'
      '<tr><td>닫힌구간에서 미정계수가 있는 함수의 최댓값</td><td>극값만 보지 않고 양 끝 값까지 비교</td></tr></table>')
    w('<div class="box"><b>봐 주실 것</b><ol>'
      '<li>「지점 지도 + 다음 질문 규칙」 방식이 원하신 「대답에 따라 유연하게 다음 질문」에 맞는지</li>'
      '<li>계산은 앱이 써 주고, 1회차는 빈칸 1개 · 2회차는 연습장 + 결과 입력으로 확인하는 방식이 괜찮은지</li>'
      '<li>길 B(수직 조건)처럼 교재 밖 풀이도 인정하고 따라가는 게 맞는지</li>'
      '<li>문제 하나에 이 정도(지점 10개 · 카드 · 대화 규칙)를 만드는 양 — 유형마다 대표 1~2문제만 이렇게 만들지</li></ol>'
      '<div class="lines"><span class="ln"></span><span class="ln"></span><span class="ln"></span></div></div>')
    w('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    bad = [n for n, ok in CHK if not ok]
    print('검산', len(CHK), '건 · 실패', bad)
    if bad: sys.exit(1)
    print(make_pdf(render(), '설계_고등_미적분1_최대최소활용_견본'))
