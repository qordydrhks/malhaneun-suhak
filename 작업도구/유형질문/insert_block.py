# -*- coding: utf-8 -*-
"""만든 블록(block.js)을 dodream.html의 초4 DD_QSET 블록 바로 뒤에 끼워 넣는다.
   기존 데이터는 한 글자도 건드리지 않는다(격리 원칙)."""
import io, os, re

SP = os.path.dirname(os.path.abspath(__file__))
P = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'

block = io.open(os.path.join(SP, 'block.js'), encoding='utf-8').read()
src = io.open(P, encoding='utf-8').read()
assert 'DD_QSET[ ddConceptId("e5-1"' not in src, '이미 들어가 있다'

lines = src.split('\n')
# 초4 마지막 DD_QSET 줄을 찾고, 그 뒤 첫 '})();' 다음에 끼운다
last = max(i for i, l in enumerate(lines) if l.startswith('  DD_QSET[ ddConceptId("e4-'))
close = next(i for i in range(last, len(lines)) if lines[i].strip() == '})();')
print('초4 마지막 줄', last + 1, '/ 블록 끝', close + 1)

out = lines[:close + 1] + block.rstrip('\n').split('\n') + lines[close + 1:]
new = '\n'.join(out)

# 버전 올리기
old_v = "const APP_VERSION = 'v76.2-초4질문점검';"
new_v = "const APP_VERSION = 'v76.3-초5초6유형질문';"
assert new.count(old_v) == 1
new = new.replace(old_v, new_v)

io.open(P, 'w', encoding='utf-8').write(new)
print('넣은 줄 수', len(out) - len(lines), '/ 전체', len(lines), '->', len(out))
