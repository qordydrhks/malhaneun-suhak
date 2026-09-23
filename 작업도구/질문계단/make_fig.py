# -*- coding: utf-8 -*-
"""질문에 그림 붙이기 — review/fig_<학년>.js 를 만든다.

⚠️ **질문은 건드리지 않는다.** 그림 표(window.QR_FIG)는 질문 번호로만 찾으므로,
   이미 있는 질문에 그림을 더하는 것뿐이다. plan·rounds 를 다시 만들 필요가 없다.
   (질문 문장까지 바꿔야 하면 그건 plan 블록으로 따로 한다 — 초6-2 3단원이 그 경우였다)

쓰는 법:  python -X utf8 make_fig.py <학년> <그림파일.py> <빈기기 내보내기.json>
  그림파일에는 FIGS(이름→SVG)와 MAP(대단원, 소단원, 질문꼬리, 그림이름)이 있어야 한다.
"""
import json, io, sys, os, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'

grade, figpy, exp = sys.argv[1], sys.argv[2], sys.argv[3]
_sp = importlib.util.spec_from_file_location('figs', figpy)
F = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(F)
E = json.load(open(exp, encoding='utf-8'))

key3 = {}
for x in E['items']:
    b, sm = x['big'].split('.')[0], x['small'].split('.')[0]
    if x['kind'] == 'ladder':
        key3[(b, sm, 'L' + x['id'].rsplit(':', 1)[1])] = x   # 계단은 L<칸번호> 로 찾는다
    else:
        key3[(b, sm, x['id'].split(':', 1)[1] if ':' in x['id'] else '')] = x

out, miss, off = {}, [], []
for big, small, tail, figname in F.MAP:
    x = key3.get((big, small, tail))
    if not x: miss.append('%s-%s %s' % (big, small, tail)); continue
    if x['off']: off.append('%s-%s %s' % (big, small, tail)); continue
    if figname not in F.FIGS: raise SystemExit('그림 없음: ' + figname)
    out[x['id']] = F.FIGS[figname]

if miss: raise SystemExit('질문 못 찾음: ' + ', '.join(miss))
if off:  print('⚠️ 빠져 있는 질문이라 그림을 안 붙임:', ', '.join(off))

lines = ['/* 🖼 질문에 붙는 그림 — %s (2026-09-23)' % grade,
         '   { 질문번호: {svg:"…"} }  질문 화면·계단·질문 고르기가 모두 이 표를 본다.',
         '   ⚠️ 이 파일을 손으로 고치지 말 것 — 원천은 %s, 만들기는 make_fig.py */' % os.path.basename(figpy),
         'window.QR_FIG = window.QR_FIG || {};',
         '(function(m){ for(var k in m) window.QR_FIG[k] = m[k]; })({']
for i, (qid, svg) in enumerate(out.items()):
    lines.append('  %s: { svg: %s }%s' % (json.dumps(qid, ensure_ascii=False),
                 json.dumps(svg, ensure_ascii=False), ',' if i < len(out) - 1 else ''))
lines.append('});')
p = ROOT + r'\review\fig_' + grade + '.js'
io.open(p, 'w', encoding='utf-8', newline='').write('\n'.join(lines) + '\n')
print('%s — 그림 %d개 붙임 → %s' % (grade, len(out), os.path.basename(p)))
for (b, s, t, f) in F.MAP:
    x = key3.get((b, s, t))
    if x and not x['off']:
        print('   %s-%s %-9s %-14s %s' % (b, s, t, f, (x.get('newQ') or x['q'])[:46]))
