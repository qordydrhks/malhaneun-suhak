# -*- coding: utf-8 -*-
"""대분수 '2와 1/3' 의 조사(와/과) 오타를 잡는다.
   숫자를 소리 내어 읽을 때 받침이 없으면 '와'(2 이, 4 사, 5 오, 9 구),
   받침이 있으면 '과'(1 일, 3 삼, 6 육, 7 칠, 8 팔, 10 십).
   실제 오타가 있는지 먼저 세어 보고, --fix 를 주면 고친다."""
import io, json, os, re, sys

SP = os.path.dirname(os.path.abspath(__file__))
VOWEL_END = set('2459')          # 와
CONS_END = set('136780')         # 과
FIX = '--fix' in sys.argv

pat = re.compile(r'(\d+)\s*(와|과)\s*(\d+/\d+)')

def check_text(t):
    out, bad = t, []
    def rep(m):
        num, part, frac = m.group(1), m.group(2), m.group(3)
        last = num[-1]
        want = '와' if last in VOWEL_END else ('과' if last in CONS_END else part)
        if want != part:
            bad.append(m.group(0))
            return '%s%s %s' % (num, want, frac)
        return m.group(0)
    out = pat.sub(rep, t)
    return out, bad

total_bad = []
for g in ['e5-1', 'e5-2', 'e6-1', 'e6-2']:
    p = os.path.join(SP, 'qset_%s.json' % g)
    if not os.path.exists(p):
        continue
    d = json.load(io.open(p, encoding='utf-8'))
    n = 0
    for it in d:
        for key in ('memory', 'understand', 'misconceptions'):
            for i, s in enumerate(it[key]):
                new, bad = check_text(s)
                if bad:
                    total_bad += ['%s %s' % (g, b) for b in bad]; n += len(bad); it[key][i] = new
        for q in it['questions']:
            for key in ('q', 'answerHint', 'basedOn'):
                if key in q:
                    new, bad = check_text(q[key])
                    if bad:
                        total_bad += ['%s %s' % (g, b) for b in bad]; n += len(bad); q[key] = new
    if FIX and n:
        io.open(p, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=1))
    print(g, '조사 오타', n, '건', '(고침)' if (FIX and n) else '')
io.open(os.path.join(SP, 'particle.txt'), 'w', encoding='utf-8').write(chr(10).join(total_bad))
