# -*- coding: utf-8 -*-
"""qset_*.json 4개 -> dodream.html 에 넣을 격리 블록 문자열(block.js)을 만든다."""
import io, json, os

SP = os.path.dirname(os.path.abspath(__file__))
GRADES = ['e5-1', 'e5-2', 'e6-1', 'e6-2']

head = """
/* ============================================================
   [v76.3] 초5·초6 유형별 질문 세트 (122개 개념)
   · 초4(v76.1~76.2)와 같은 형식. 기존 low/high 질문은 그대로 두고 '나란히' 붙는다.
   · 다섯 유형은 선택 — 개념에 안 맞는 유형은 뺐다(개념당 3~5개).
   · memory = 기억 채점 기준 / understand = 이해 채점 기준 / misconceptions = 오답 이름표
   · 선생님 편집기에서 전부 수정할 수 있다(ce:overrides 의 qset 필드).
   ============================================================ */
(function(){
"""
lines = [head.rstrip('\n')]
total = 0
for g in GRADES:
    data = json.load(io.open(os.path.join(SP, 'qset_%s.json' % g), encoding='utf-8'))
    for it in data:
        obj = {
            'memory': it['memory'],
            'understand': it['understand'],
            'misconceptions': it['misconceptions'],
            'questions': it['questions'],
        }
        lines.append('  DD_QSET[ ddConceptId("%s","%s","%s") ] = %s;'
                     % (g, it['big'], it['small'], json.dumps(obj, ensure_ascii=False)))
        total += 1
lines.append('})();')
txt = '\n'.join(lines) + '\n'
io.open(os.path.join(SP, 'block.js'), 'w', encoding='utf-8').write(txt)
print('개념', total, '줄', len(lines), '글자', len(txt))
