# -*- coding: utf-8 -*-
"""수 뒤 조사 점검 — 분수는 분자 소리(3/5은 · 2/7는), 소수·자연수는 마지막 자리 소리. 받침 ㄹ(1·7·8) 뒤는 '로'.
   python -X utf8 josa62.py e62_1.py …"""
import re, sys, io
BAT = {'0': 'o', '1': 'l', '2': '', '3': 'o', '4': '', '5': '', '6': 'o', '7': 'l', '8': 'l', '9': ''}
PAIRS = [('이에요', '예요'), ('이라서', '라서'), ('이라고', '라고'), ('이니까', '니까'), ('이고', '고'), ('이야', '야'), ('이면', '면'),
         ('으로', '로'), ('은', '는'), ('이', '가'), ('을', '를'), ('과', '와')]
ALT = sorted({p for a, b in PAIRS for p in (a, b)}, key=len, reverse=True)
R = re.compile(r'(\d+(?:\.\d+)?(?:/\d+)?)(' + '|'.join(ALT) + r')(?![가-힣])')
def want(num, part):
    n = num.split('/')[0] if '/' in num else num
    b = BAT[n[-1]]
    for a, c in PAIRS:
        if part in (a, c):
            if (a, c) == ('으로', '로'): return a if b == 'o' else c
            return a if b else c
for fn in sys.argv[1:]:
    for i, line in enumerate(io.open(fn, encoding='utf-8'), 1):
        for m in R.finditer(line):
            w = want(m.group(1), m.group(2))
            if w and w != m.group(2):
                print('%s:%d  %s%s → %s%s   …%s…' % (fn, i, m.group(1), m.group(2), m.group(1), w, line[max(0, m.start() - 12):m.end() + 6].strip()))

def fix(fn):
    s = io.open(fn, encoding='utf-8').read(); n = 0
    def rep(m):
        nonlocal n
        w = want(m.group(1), m.group(2))
        if w and w != m.group(2): n += 1; return m.group(1) + w
        return m.group(0)
    s = R.sub(rep, s); io.open(fn, 'w', encoding='utf-8', newline='').write(s); return n
