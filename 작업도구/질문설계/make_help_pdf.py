# -*- coding: utf-8 -*-
"""도움(되묻기·다시 묻기·키워드·짧은/긴 설명) 검토용 A4 PDF — python -X utf8 make_help_pdf.py 4
   → 작업도구/질문설계/도움_초4-2_4단원.pdf
"""
import html, importlib, sys
import e42_1, e42_23, e42_456, e42_common as C, app_e42_data as D
e = html.escape
n = sys.argv[1] if len(sys.argv) > 1 else '4'
H = importlib.import_module('help_e42_%s' % n).H
LF = importlib.import_module('help_figs_e42_%s' % n)
U = {'1': e42_1.UNIT, '2': e42_23.U2, '3': e42_23.U3, '4': e42_456.U4, '5': e42_456.U5, '6': e42_456.U6}[n]
RN = {0: '🌱 선수', 1: '1회차', 2: '2회차'}
FIGN = {'same': '그림: 원래 그림에서 이름·숫자만 바꿔 다시 그림', 'new': '그림: 배치가 다른 새 그림이 필요(⚑)'}

CSS = '''@page{size:A4;margin:10mm 11mm}
body{font:9.3pt/1.5 "Pretendard","Malgun Gothic",sans-serif;color:#1f2430;margin:0}
h1{font-size:15pt;margin:0}.sub{color:#5b6270;font-size:8.8pt;margin:2px 0 6px}
.box{border:1px solid #d6dae2;border-radius:6px;padding:6px 9px;margin:5px 0;background:#fafbfc;font-size:8.8pt}
.box b{font-weight:700}.ask{border-color:#e7c27a;background:#fffaf0}
h2{font-size:11pt;margin:12px 0 4px;padding-bottom:2px;border-bottom:1.6px solid #1f2430;break-after:avoid}
.card{border:1px solid #cfd4dd;border-radius:8px;margin:7px 0;break-inside:avoid;overflow:hidden}
.hd{display:flex;gap:8px;align-items:flex-start;padding:6px 9px;background:#f3f4f7}
.rn{flex:none;font-size:8pt;font-weight:700;border-radius:99px;padding:1px 7px;background:#1f2430;color:#fff;margin-top:1px}
.rn.r0{background:#3f8f4f}.rn.r2{background:#6b4fc4}
.q{font-weight:700;font-size:10pt}
.fig{flex:none;width:150px}.fig svg{width:100%;height:auto}
table{width:100%;border-collapse:collapse}td{border-top:1px solid #e3e6ec;padding:4px 9px;vertical-align:top}
td.k{width:76px;color:#5b6270;font-size:8.4pt;font-weight:700;white-space:nowrap}
.key{display:inline-block;margin-right:10px}.n{color:#b45309;font-weight:700}
.it td.k{color:#8a5a00}.kw span{display:inline-block;border:1px solid #e7c27a;border-radius:99px;padding:0 7px;margin:0 4px 2px 0;font-size:8.6pt;background:#fffaf0}
.mk{font-size:8.4pt;color:#5b6270;text-align:right;padding:3px 9px;border-top:1px dashed #d6dae2}
.note{font-size:8pt;color:#8a5a00}
.src{font-size:8pt;color:#5b6270;margin-top:1px}
.lf{margin:5px 0 2px;padding:6px 8px 4px;border:1px solid #eadfc8;border-radius:6px;background:#fffdf8}.lf svg{display:block}.af{border-style:dashed;background:#fbfcff}'''

def card(q, h, keys, lsvg='', asvg=''):
    fig = ''
    if len(q) > 5 and q[5]:
        try:
            fig = '<div class="fig">%s</div>' % C.fig(q[5])
        except Exception:
            fig = ''
    a = h['again']
    rows = [
        ('꼭 말할 핵심', ''.join('<span class="key"><span class="n">%s</span> %s</span>' % ('①②③'[j], e(k)) for j, k in enumerate(keys))),
        ('되묻기', '<br>'.join('<span class="n">%s 빠지면</span> %s' % ('①②③'[j], e(x)) for j, x in enumerate(h['ask']))),
        ('다시 묻기', e(a['q']) + ('<div class="lf af">%s</div>' % asvg if asvg else ('<br><span class="note">%s</span>' % FIGN[a['fig']] if a.get('fig') else '')) +
                     '<br><span style="color:#5b6270">모범 답: %s</span><br><span style="color:#5b6270">핵심: %s</span>' % (e(a['ans']), ' · '.join(e(k) for k in a['keys']))),
    ]
    items = [
        ('🔑 키워드', '<span class="kw">%s</span>' % ''.join('<span>%s</span>' % e(k) for k in h['kw'])),
        ('짧은 설명', e(h['short'])),
        ('긴 설명', e(h['long']) + ('<div class="lf">%s</div>' % lsvg if lsvg else '')),
    ]
    tr = ''.join('<tr><td class="k">%s</td><td>%s</td></tr>' % r for r in rows)
    ti = ''.join('<tr class="it"><td class="k">%s</td><td>%s</td></tr>' % r for r in items)
    return ('<div class="card"><div class="hd"><span class="rn r%d">%s</span><div style="flex:1"><div class="q">%s</div><div class="src">교재 %s</div></div>%s</div>'
            '<table>%s%s</table><div class="mk">☐ 좋아요 &nbsp; ☐ 고침 &nbsp; ☐ 뺌</div></div>') % (q[0], RN[q[0]], e(q[2]), e(h.get('src', '')), fig, tr, ti)

def build():
    BIG = U['big'].split('. ', 1)[-1] if 'big' in U else U['title'].split('「')[-1].split('」')[0].split('. ', 1)[-1]
    NF = sum(len(v) for v in LF.LFIG.values())
    o = ['<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>도움 검토</title><style>%s</style></head><body>' % CSS,
         '<h1>초4-2 %s단원 「%s」 — 1·2회차 도움 검토</h1>' % (n, e(BIG)),
         '<div class="sub">2026-10-06(3판 · 긴 설명에 그림) · 설계규칙.md 「되묻기 · 도움」 표대로 Claude 가 씀 · 질문마다 ☐좋아요 ☐고침 ☐뺌</div>',
         '<div class="box"><b>흐름</b> 질문 → 핵심별 판정 → 다 짚으면 통과 + 모범 답 / 빠진 핵심이 있으면 <b>그 핵심만 되묻기</b>(방향만) → '
         '그래도 모르면 아이가 <b>상점 아이템</b>으로 도움을 고름(🔑 키워드 &lt; 짧은 설명 &lt; 긴 설명, 값 차등) → 설명을 봤으면 원래 질문 대신 <b>다시 묻기</b>(숫자·이름만 바꿈)로 확인. '
         '아이템을 쓴 답은 어른 화면에 기록되고 점수는 아이템 없이 맞힌 것보다 적게. 틀린 생각을 말하면 "살짝 부족해" + 🔑 키워드만.</div>',
         '<div class="box ask"><b>봐 주실 것</b> ① 되묻기가 답을 흘리지 않는지 ② 짧은 설명·긴 설명이 쓸 만한지 ③ 다시 묻기가 "같은 것을 조금 바꿔 묻기"로 적당한지<br>'
         '<b>정한 것</b> · <b>짧은 설명은 말로만, 긴 설명은 그림과 함께</b>(그림 ' + str(NF) + '장) · 되묻기·짧은 설명·긴 설명은 <b>교재 개념 쪽의 문장 그대로</b>(질문마다 근거 쪽 표시) · 뜻을 묻는 질문의 다시 묻기는 <b>말투만 바꿈</b> '
         '<br><b>통과 인정</b> · 🔑 키워드만 보고 맞히면 오늘 통과(점수는 조금 낮게) · 짧은 설명·긴 설명을 봤으면 다음 날 다시 묻기로 통과 · 다시 묻기에 새 그림이 필요한 질문은 점선 상자에 그 그림을 같이 넣었어요.</div>']
    for s in U['smalls']:
        tag = '%s-%s' % (n, s['no'])
        qs = [q for q in s['qs'] if q[0] < 3]
        o.append('<h2>%s. %s</h2>' % (e(s['no']), e(s['title'] if 'title' in s else s.get('name', ''))))
        for i, q in enumerate(qs):
            af = getattr(LF, 'AFIG', {}).get((tag, i))
            o.append(card(q, H[tag][i], D.KEYS[tag][i], LF.lfig(tag, i), af() if af else ''))
    o.append('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    print(C.make_pdf(build(), '도움_초4-2_%s단원' % n))
