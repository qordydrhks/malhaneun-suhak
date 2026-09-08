# -*- coding: utf-8 -*-
"""D1/D3/D4에서 기존 질문과 겹치는 새 질문을 짝지어 보여준다."""
import io, json, os, re, unicodedata, sys
SP = os.path.dirname(os.path.abspath(__file__))
CH = sys.argv[1:] or ['D1', 'D3', 'D4']


def toks(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]+', unicodedata.normalize('NFC', s)))


def jac(a, b):
    A, B = toks(a), toks(b)
    return len(A & B) / float(len(A | B)) if A and B else 0.0


out = []
for c in CH:
    src = {x['small']: x['existingQuestions']
           for x in json.load(io.open(os.path.join(SP, 'src_%s.json' % c), encoding='utf-8'))['concepts']}
    for it in json.load(io.open(os.path.join(SP, 'qset_%s.json' % c), encoding='utf-8')):
        for q in it['questions']:
            best, bq = 0.0, ''
            for eq in src.get(it['small'], []):
                r = jac(q['q'], eq)
                if r > best:
                    best, bq = r, eq
            if best >= 0.72:
                out.append((c, it['small'], q['type'], best, q['q'], bq))

print('겹침 %d건\n' % len(out))
for c, small, t, r, newq, oldq in out:
    print('[%s] %s  (%s, %.2f)' % (c, small, t, r))
    print('   기존: %s' % oldq)
    print('   새것: %s' % newq)
    print()
