# -*- coding: utf-8 -*-
"""미리 만든 mission 문제(작업도구/질문설계/mis_e*.py) → 앱 데이터 app/data/mis_<학년>.js

· 단원 파일을 불러 U.check()(세트 수·보기·값 검산)를 다시 통과시킨 뒤, 그림을 SVG 글자로 그려 넣는다.
· 5지선다 = {kind:'mc', stem, choices[5], answer, explain, fig?}
· 누르기   = {kind:'tap', stem, fig(아이 화면), figAns(정답 주황), tap[누를 것들], explain}  — 그림 속 <g data-t="…"> 를 누른다.
· 열쇠 = '<소단원 코드>:r<회차>:<basic|hard>'  (mission.js 가 AI 세트보다 먼저 쓴다)
실행: python -X utf8 build_mis.py"""
import os, sys, json, importlib
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', '질문설계')
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)
import mis_e42_4 as B

UNITS = {'e4-2': ['mis_e42_1', 'mis_e42_2', 'mis_e42_3', 'mis_e42_u4', 'mis_e42_5', 'mis_e42_6'],
         'e5-2': ['mis_e52_1', 'mis_e52_2', 'mis_e52_3', 'mis_e52_4', 'mis_e52_5', 'mis_e52_6']}

def pic(f, w=520, h=330):
    return B.fsvg(f, w, h)[0]

for grade, mods in UNITS.items():
    out, n_mc, n_tap = {}, 0, 0
    for name in mods:
        U = importlib.import_module(name).U
        U.check()
        for p in U.Q:
            k = '%s:r%d:%s' % (p['code'], p['r'], p['lv'])
            if p['kind'] == 'mc':
                it = {'kind': 'mc', 'stem': p['stem'], 'choices': p['choices'], 'answer': p['answer'], 'explain': p['explain']}
                if p.get('fig'): it['fig'] = pic(p['fig']())
                n_mc += 1
            else:
                it = {'kind': 'tap', 'stem': p['stem'], 'fig': pic(p['fig']()), 'figAns': pic(p['fig'](tuple(p['tap']))),
                      'tap': list(p['tap']), 'explain': p['explain']}
                for t in p['tap']:
                    assert ('data-t="%s"' % t) in it['fig'], ('누를 것이 그림에 없음', p['stem'], t)
                n_tap += 1
            out.setdefault(k, []).append(it)
    js = 'window.APP_MIS = window.APP_MIS || {};\nAPP_MIS[%s] = %s;\n' % (json.dumps(grade), json.dumps(out, ensure_ascii=False, separators=(',', ':')))
    path = os.path.join(ROOT, 'app', 'data', 'mis_%s.js' % grade)
    open(path, 'w', encoding='utf-8', newline='\n').write(js)
    print('%s · 세트 %d · 5지 %d · 누르기 %d · %.0f KB → %s' % (grade, len(out), n_mc, n_tap, os.path.getsize(path) / 1024, os.path.relpath(path, ROOT)))
