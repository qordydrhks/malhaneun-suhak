# -*- coding: utf-8 -*-
"""초4-2 도형 그림 미리보기 HTML — 질문 문장과 그림을 나란히 (마스터 확인용)"""
import json, io, os, sys, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
R = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak'
_sp = importlib.util.spec_from_file_location('figs', R + r'\작업도구\질문계단\e4\figs_e42_도형.py')
F = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(F)
E = json.load(open(R + r'\작업도구\회차\export\e4-2_2026-09-23pre_빈기기.json', encoding='utf-8'))

key3 = {}
for x in E['items']:
    b, sm = x['big'].split('.')[0], x['small'].split('.')[0]
    t = 'L' + x['id'].rsplit(':', 1)[1] if x['kind'] == 'ladder' else x['id'].split(':', 1)[1]
    key3[(b, sm, t)] = x
def T(x): return x.get('newQ') or x.get('q') or ''

rows = []
for big, small, tail, fig in F.MAP:
    x = key3[(big, small, tail)]
    rows.append('<div class=c><div class=h>%s · %s <b>%s회차%s</b></div>'
                '<div class=q>%s</div><div class=f>%s</div>'
                '<div class=a>모범 답 · %s</div></div>'
                % (x['big'], x['small'], x['round'], ' · 🪜계단' if x['kind'] == 'ladder' else '',
                   T(x), F.FIGS[fig], (x.get('answer') or '')[:150]))

html = '''<!doctype html><meta charset="utf-8"><title>초4-2 도형 그림 22장</title>
<style>
 body{margin:0;background:#F6F4FB;font:15px/1.6 Pretendard,'맑은 고딕',sans-serif;color:#2A2350}
 header{padding:20px 22px;background:#fff;border-bottom:1px solid #E7E3F3}
 h1{margin:0 0 6px;font-size:19px} header p{margin:0;color:#6B6785;font-size:13.5px}
 .wrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px;padding:18px}
 .c{background:#fff;border:1px solid #E7E3F3;border-radius:13px;padding:13px 14px}
 .h{font-size:11.5px;color:#8A7BB0;margin-bottom:7px}
 .h b{color:#3B6FA8}
 .q{font-weight:700;margin-bottom:9px;font-size:14.5px}
 .f{max-width:300px;margin:0 auto 9px}
 .a{font-size:12.5px;color:#6B6785;border-top:1px dashed #E7E3F3;padding-top:7px}
</style>
<header><h1>초4-2 「삼각형 · 사각형 · 다각형」 질문 그림 22장</h1>
<p>질문 121개 중 <b>그림이 조건을 주는 22개</b>에만 붙였습니다.
뜻·성질을 묻는 질문(“이등변삼각형은 어떤 삼각형이야?”)에는 넣지 않았고,
구하는 각은 <b>?</b> 로 두어 그림이 답을 말하지 않게 했습니다.</p></header>
<div class=wrap>''' + '\n'.join(rows) + '</div>'

p = R + r'\작업도구\질문계단\e4\질문그림_초4-2_도형.html'
io.open(p, 'w', encoding='utf-8').write(html)
print(p, len(rows), '개')
