# -*- coding: utf-8 -*-
"""초4-2 설계 공통 — 인쇄용 HTML·PDF 만들기 + 설계용 작은 그림(조건만).
   질문 튜플: (회차, 핵심/출처, 질문, 모범 답, [되묻기…], 그림키)   회차 0 = 🌱 선수
"""
import html, io, os, subprocess, shutil, tempfile, math
HERE = os.path.dirname(os.path.abspath(__file__))
e = html.escape
RN = {0: ('🌱 선수', 'pre'), 1: ('1회차', 'r1'), 2: ('2회차', 'r2'), 3: ('3회차', 'r3')}

CSS = '''
:root{--ink:#1f2937;--sub:#5b6270;--line:#d8dce3;--acc:#2f5fb3;--pre:#15803d;--r1:#2563eb;--r2:#6d3fd0;--r3:#b45309;--warn:#fff7ed}
@page{size:A4;margin:10mm 12mm 10mm}
*{box-sizing:border-box}
body{margin:0;color:var(--ink);font:9.4pt/1.4 "Pretendard","Malgun Gothic",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-size:16pt;margin:0 0 2px}.sub{color:var(--sub);font-size:9pt}
.box{border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:7px 0}
.idea{border-left:4px solid var(--acc)}
.sum{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
.chip{display:inline-block;font-size:8.6pt;padding:1px 8px;border-radius:99px;border:1px solid var(--line);white-space:nowrap}
.pre{color:var(--pre);border-color:var(--pre)}.r1{color:var(--r1);border-color:var(--r1)}.r2{color:var(--r2);border-color:var(--r2)}.r3{color:var(--r3);border-color:var(--r3)}
.unit{break-before:page}
.bigtitle{break-before:page;font-size:15pt;font-weight:800;border-bottom:3px double var(--ink);padding-bottom:4px;margin-bottom:6px}
.uh{display:flex;align-items:baseline;gap:8px;border-bottom:2px solid var(--ink);padding-bottom:3px;margin-bottom:6px}
.uh b{font-size:13.5pt}.uh span{color:var(--sub);font-size:9pt}
.core{margin:0;padding:0;list-style:none}.core li{margin:1px 0}.core b{color:var(--acc);display:inline-block;width:16px}
.stuck{background:var(--warn);border-radius:6px;padding:4px 10px;margin:5px 0;font-size:9.1pt}
.lines .ln{display:block;border-bottom:1px solid #c9a36b;height:15px}
.rh{font-weight:700;font-size:10pt;margin:6px 0 2px;padding-left:6px;border-left:4px solid}
.q{break-inside:avoid;padding:3px 0 4px;border-bottom:1px dashed var(--line)}
.qh{display:flex;gap:6px;align-items:baseline}
.qn{font-weight:700;min-width:18px}.qt{font-weight:600}
.tag{font-size:8.2pt;color:var(--sub);white-space:nowrap;margin-left:auto}
.ans{margin:2px 0 0 24px;font-size:9.1pt;color:#374151}.ans:before{content:"→ ";color:var(--sub)}
.chk{display:flex;align-items:flex-end;gap:10px;margin:3px 0 0 24px;font-size:8.6pt;color:var(--sub);white-space:nowrap}
.chk .ln{flex:1;border-bottom:1px solid #aab;height:12px}
.hint{margin:2px 0 1px 24px;background:#f3f0ff;border-radius:6px;padding:2px 10px;font-size:8.6pt;line-height:1.35}.hint ol{margin:2px 0;padding-left:18px}
.fig{float:right;margin:0 0 4px 10px}.q{overflow:hidden}
ol.ask{margin:4px 0;padding-left:20px}
'''

# ── 설계용 그림 (조건만) ──
def _svg(w, h, body): return '<div class="fig"><svg viewBox="0 0 %d %d" width="%d" xmlns="http://www.w3.org/2000/svg" font-family="Malgun Gothic,sans-serif">%s</svg></div>' % (w, h, int(w * .68), body)
def _t(x, y, s, c='#374151', sz=13, a='middle'): return '<text x="%.1f" y="%.1f" font-size="%d" fill="%s" text-anchor="%s">%s</text>' % (x, y, sz, c, a, e(s))
def _poly(pts, fill='#eef3fb'): return '<polygon points="%s" fill="%s" stroke="#2f5fb3" stroke-width="2" stroke-linejoin="round"/>' % (' '.join('%.1f,%.1f' % p for p in pts), fill)
def _arc(c, a1, a2, r=20, col='#b45309'):
    x1, y1 = c[0] + r * math.cos(math.radians(a1)), c[1] - r * math.sin(math.radians(a1))
    x2, y2 = c[0] + r * math.cos(math.radians(a2)), c[1] - r * math.sin(math.radians(a2))
    return '<path d="M%.1f %.1f A%d %d 0 0 0 %.1f %.1f" fill="none" stroke="%s" stroke-width="1.8"/>' % (x1, y1, r, r, x2, y2, col)
def _tick(p, q):
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2; dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy); nx, ny = -dy / L * 6, dx / L * 6
    return '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#2f5fb3" stroke-width="2"/>' % (mx - nx, my - ny, mx + nx, my + ny)

def _tick2(p, q):   # 같은 길이 표시 두 줄 — 다른 길이 짝과 구별
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2; dx, dy = q[0] - p[0], q[1] - p[1]; L = math.hypot(dx, dy)
    ux, uy = dx / L * 3, dy / L * 3
    return _tick((p[0] - ux, p[1] - uy), (q[0] - ux, q[1] - uy)) + _tick((p[0] + ux, p[1] + uy), (q[0] + ux, q[1] + uy))

def fig(key):
    if key == 'iso_apex':   # 이등변: 꼭지각 40° 표시만
        A, B, C = (130, 18), (70, 168), (190, 168)
        return _svg(260, 190, _poly([A, B, C]) + _tick(A, B) + _tick(A, C) + _arc(A, 250, 290, 26) + _t(130, 62, '40°', '#b45309'))
    if key == 'iso_base':   # 이등변: 밑각 하나 65°
        A, B, C = (130, 30), (78, 168), (182, 168)
        return _svg(260, 190, _poly([A, B, C]) + _tick(A, B) + _tick(A, C) + _arc(B, 0, 69, 24) + _t(112, 160, '65°', '#b45309'))
    if key == 'iso_ext':    # 이등변 ㄱㄴ=ㄱㄷ, ㄴㄷ 늘인 선, 바깥 130°
        A, B, C = (120, 40), (60, 160), (180, 160)
        body = '<line x1="60" y1="160" x2="270" y2="160" stroke="#374151" stroke-width="1.6"/>' + _poly([A, B, C]) + _tick(A, B) + _tick(A, C)
        body += _arc(C, 0, 116, 20) + _t(214, 146, '130°', '#b45309') + _t(120, 30, 'ㄱ') + _t(50, 178, 'ㄴ') + _t(180, 180, 'ㄷ')
        return _svg(290, 190, body)
    if key == 'circ120':    # 원의 중심 ㅇ, 원 위 ㄱ ㄴ, 각 ㄱㅇㄴ 120°
        O = (130, 100); r = 80
        A = (O[0] + r * math.cos(math.radians(210)), O[1] - r * math.sin(math.radians(210)))
        B = (O[0] + r * math.cos(math.radians(330)), O[1] - r * math.sin(math.radians(330)))
        body = '<circle cx="130" cy="100" r="80" fill="none" stroke="#9aa3b2" stroke-width="1.6"/>' + _poly([O, A, B], '#fdf6ec')
        body += _arc(O, 210, 330, 18) + _t(130, 132, '120°', '#b45309') + '<circle cx="130" cy="100" r="3" fill="#374151"/>' + _t(130, 92, 'ㅇ') + _t(A[0] - 12, A[1] + 6, 'ㄱ') + _t(B[0] + 12, B[1] + 6, 'ㄴ')
        return _svg(260, 200, body)
    if key == 'eq_ext':     # 정삼각형, 한 변 늘인 선, 바깥 각 ?
        A, B, C = (100, 36), (40, 140), (160, 140)
        body = '<line x1="40" y1="140" x2="250" y2="140" stroke="#374151" stroke-width="1.6"/>' + _poly([A, B, C]) + _tick(A, B) + _tick(A, C) + _tick(B, C)
        body += _arc(C, 0, 120, 20) + _t(192, 124, '?', '#b45309', 15)
        return _svg(270, 160, body)
    if key == 'tri9':       # 작은 정삼각형 9개로 된 큰 정삼각형
        s = 60; h = s * math.sqrt(3) / 2; ox, oy = 110, 12; body = ''
        for row in range(3):
            for k in range(row + 1):
                x = ox - row * s / 2 + k * s; y = oy + row * h
                body += _poly([(x, y), (x - s / 2, y + h), (x + s / 2, y + h)], '#eef3fb')
        return _svg(220, 180, body)
    if key == 'iso25':      # 이등변 ㄱㄴㄷ, 밑각 ㄱㄴㄷ 25°
        A, B, C = (150, 60), (40, 120), (260, 120)
        body = _poly([A, B, C]) + _tick(A, B) + _tick(A, C) + _arc(B, 0, 29, 36) + _t(88, 114, '25°', '#b45309') + _t(150, 50, 'ㄱ') + _t(30, 136, 'ㄴ') + _t(270, 136, 'ㄷ')
        return _svg(300, 150, body)
    if key == 'circ4':      # 원 위 같은 간격 점 4개
        body = '<circle cx="100" cy="95" r="70" fill="none" stroke="#9aa3b2" stroke-width="1.6"/>' + ''.join('<circle cx="%.1f" cy="%.1f" r="5" fill="#374151"/>' % (100 + 70 * math.cos(math.radians(a)), 95 - 70 * math.sin(math.radians(a))) for a in (90, 180, 270, 0))
        return _svg(200, 190, body)
    if key == 'eq_mid':     # 정삼각형, 꼭짓점에서 마주 보는 변의 한가운데로 선분
        A, B, C = (120, 20), (40, 158), (200, 158)
        body = _poly([A, B, C]) + _tick(A, B) + _tick(A, C) + '<line x1="120" y1="20" x2="120" y2="158" stroke="#b45309" stroke-width="2" stroke-dasharray="6 4"/>'
        body += _tick2(B, (120, 158)) + _tick2((120, 158), C)   # 밑변 반쪽끼리는 두 줄 — 네 변이 다 같아 보이지 않게(마스터 10/1)
        return _svg(240, 172, body)
    if key == 'grid_iso':   # 모눈 위 선분 ㄴㄷ과 점 ①②③ — ①만 한가운데 바로 위
        g = 26; ox, oy = 14, 14; body = ''
        for i in range(7): body += '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#d6dbe6" stroke-width="1"/>' % (ox + i * g, oy, ox + i * g, oy + 6 * g)
        for j in range(7): body += '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#d6dbe6" stroke-width="1"/>' % (ox, oy + j * g, ox + 6 * g, oy + j * g)
        P = lambda c, r: (ox + c * g, oy + r * g)
        B, C = P(1, 5), P(5, 5)
        body += '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#2f5fb3" stroke-width="2.5"/>' % (B + C)
        body += _t(B[0], B[1] + 18, 'ㄴ') + _t(C[0], C[1] + 18, 'ㄷ')
        for (c, r), lab in (((3, 1), '①'), ((4, 2), '②'), ((1, 2), '③')):
            x, y = P(c, r); body += '<circle cx="%d" cy="%d" r="4" fill="#b45309"/>' % (x, y) + _t(x + 12, y - 6, lab, '#b45309', 13)
        return _svg(190, 196, body)
    if key == 'compass_eq': # 선분 ㄱㄴ, 양 끝에서 반지름 ㄱㄴ 인 원, 만나는 점 ㄷ
        A, B = (90, 150), (170, 150); r = 80; Cp = (130, 150 - r * math.sqrt(3) / 2)
        body = '<circle cx="90" cy="150" r="80" fill="none" stroke="#9aa3b2" stroke-width="1.4" stroke-dasharray="5 4"/>'
        body += '<circle cx="170" cy="150" r="80" fill="none" stroke="#9aa3b2" stroke-width="1.4" stroke-dasharray="5 4"/>'
        body += _poly([A, B, Cp], 'none') + ''.join('<circle cx="%.1f" cy="%.1f" r="3" fill="#374151"/>' % p for p in (A, B, Cp))
        body += _t(A[0] - 12, A[1] + 16, 'ㄱ') + _t(B[0] + 12, B[1] + 16, 'ㄴ') + _t(Cp[0], Cp[1] - 10, 'ㄷ')
        return _svg(260, 240, body)
    return ''

def render(units, title, src, ask, rules):
    o = []; w = o.append
    allq = [q for u in units for s in u['smalls'] for q in s['qs']]
    cnt = {r: sum(1 for q in allq if q[0] == r) for r in RN}
    w('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>%s</title><style>%s</style></head><body>' % (e(title), CSS))
    w('<h1>%s</h1><div class="sub">%s</div>' % (e(title), e(src)))
    w('<div class="sum">' + ''.join('<span class="chip %s">%s %d</span>' % (RN[r][1], RN[r][0], cnt[r]) for r in RN) + '<span class="chip">합계 %d</span></div>' % len(allq))
    w('<div class="box"><b>회차 기준</b><br>1회차 = 교재 개념 쪽에 적힌 것 · 2회차 = 교재엔 없지만 개념 하나로 답 · 3회차 = 개념 둘 이상(디딤돌 발전 문제·최상위S) · 숫자는 교재와 다르게 새로 정하고 모두 검산 · 3회차는 되묻기 순서 포함</div>')
    w('<div class="box"><b>1단원 검토에서 받은 수정을 이번 설계에 적용한 것</b><ul style="margin:3px 0;padding-left:18px">' + ''.join('<li>%s</li>' % e(r) for r in rules) + '</ul></div>')
    w('<div class="box"><b>봐 주실 것</b><ol class="ask">' + ''.join('<li>%s</li>' % e(a) for a in ask) + '</ol><div class="lines"><span class="ln"></span><span class="ln"></span><span class="ln"></span></div></div>')
    n = 0
    for u in units:
        w('<div class="bigtitle">%s</div>' % e(u['big']))
        w('<div class="box idea"><b>단원 한 줄</b><br>%s</div>' % e(u['idea']))
        for i, s in enumerate(u['smalls']):
            w('<section class="%s"><div class="uh"><b>%s. %s</b><span>교재 %s</span></div>' % ('unit' if i else '', s['no'], e(s['name']), s['page']))
            w('<ul class="core">' + ''.join('<li><b>%s</b>%s</li>' % (k, e(t)) for k, t in s['core']) + '</ul>')
            w('<div class="stuck"><b>막히는 곳</b> · %s<div class="lines" style="margin-top:2px">실제 수업에서 본 것:<span class="ln"></span></div></div>' % e(' · '.join(s['stuck'])))
            for r in (0, 1, 2, 3):
                qs = [q for q in s['qs'] if q[0] == r]
                if not qs: continue
                w('<div class="rh %s" style="border-color:currentColor">%s</div>' % (RN[r][1], RN[r][0]))
                for q in qs:
                    n += 1
                    tag = ('핵심 ' + q[1]) if q[1][:1] in 'ABC' else q[1]
                    w('<div class="q"><div class="qh"><span class="qn">%d.</span><span class="qt">%s</span><span class="tag">〔%s〕</span></div>' % (n, e(q[2]), e(tag)))
                    if len(q) > 5 and q[5]: w(fig(q[5]))
                    if len(q) > 4 and q[4]: w('<div class="hint"><b>💬 막히면 이 순서로 되묻기</b><ol>' + ''.join('<li>%s</li>' % e(h) for h in q[4]) + '</ol></div>')
                    w('<div class="ans">%s</div><div class="chk">☐ 좋아요 ☐ 고침 ☐ 뺌<span class="ln"></span></div></div>' % e(q[3]))
            w('</section>')
    w('</body></html>')
    return ''.join(o)

def make_pdf(html_text, name):
    out = os.path.join(HERE, name + '.html'); io.open(out, 'w', encoding='utf-8').write(html_text)
    tmp = os.path.join(tempfile.gettempdir(), 'claude', 'sheet'); os.makedirs(tmp, exist_ok=True)
    shutil.copy(out, os.path.join(tmp, 'u.html'))
    chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    subprocess.run([chrome, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-data-dir=' + os.path.join(tmp, 'prof'),
                    '--print-to-pdf=' + os.path.join(tmp, 'u.pdf'), 'file:///' + os.path.join(tmp, 'u.html').replace('\\', '/')], check=True, timeout=180)
    shutil.copy(os.path.join(tmp, 'u.pdf'), os.path.join(HERE, name + '.pdf'))
    return os.path.join(HERE, name + '.pdf')
