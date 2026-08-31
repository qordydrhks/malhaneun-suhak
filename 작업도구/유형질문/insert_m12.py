# -*- coding: utf-8 -*-
"""중1-2 유형별 질문 122개를 dodream.html에 격리 블록으로 넣는다."""
import io, json, os, re

SP = os.path.dirname(os.path.abspath(__file__))
P = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'

rows = []
for i in (1, 2, 3, 4):
    rows += json.load(io.open(os.path.join(SP, 'qset_m1-2_%d.json' % i), encoding='utf-8'))
assert len(rows) == 122, len(rows)

head = """
/* ============================================================
   [v77.1] 중1-2 유형별 질문 세트 (122개 개념 · 489문항)
   · 초4~초6과 같은 형식. 기존 low/high 질문은 그대로 두고 '나란히' 붙는다.
   · 다섯 유형은 선택 — 회상·이유는 개념마다 1개씩, 예·오류는 되도록,
     조건은 진짜 조건이 있는 개념에만(11개).
   · 도형 단원이라 '그림을 보고 답하는 질문'이 되지 않게 조건을 문장으로 다 썼다.
   ============================================================ */
(function(){
"""
lines = [head.rstrip('\n')]
for it in rows:
    obj = {'memory': it['memory'], 'understand': it['understand'],
           'misconceptions': it['misconceptions'], 'questions': it['questions']}
    lines.append('  DD_QSET[ ddConceptId("m1-2","%s","%s") ] = %s;'
                 % (it['big'], it['small'], json.dumps(obj, ensure_ascii=False)))
lines.append('})();')
block = '\n'.join(lines) + '\n'

src = io.open(P, encoding='utf-8').read()
assert 'DD_QSET[ ddConceptId("m1-2"' not in src, '이미 들어가 있다'
srclines = src.split('\n')
last = max(i for i, l in enumerate(srclines) if l.startswith('  DD_QSET[ ddConceptId("e6-'))
close = next(i for i in range(last, len(srclines)) if srclines[i].strip() == '})();')
out = srclines[:close + 1] + block.rstrip('\n').split('\n') + srclines[close + 1:]
new = '\n'.join(out)

old_v = "const APP_VERSION = 'v77.0-기준굳히기';"
new_v = "const APP_VERSION = 'v77.1-중1-2유형질문';"
assert new.count(old_v) == 1
new = new.replace(old_v, new_v)

io.open(P, 'w', encoding='utf-8').write(new)
print('넣은 줄', len(out) - len(srclines), '/ 개념', len(rows))
