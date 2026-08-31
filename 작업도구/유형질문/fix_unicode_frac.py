# -*- coding: utf-8 -*-
"""유니코드 분수기호(½ ¼ ⅓ …)를 앱 표기 규칙(1과 1/2)으로 바꾸고,
   대분수의 '2와1/3' 처럼 붙어 있는 것을 '2와 1/3'으로 띄운다.
   MF_NOTATION 규칙: 분수는 슬래시 하나로. 유니코드 분수기호는 mfmt가 모른다."""
import io, json, os, re

SP = os.path.dirname(os.path.abspath(__file__))
FRAC = {'½': '1/2', '⅓': '1/3', '⅔': '2/3', '¼': '1/4', '¾': '3/4',
        '⅕': '1/5', '⅖': '2/5', '⅗': '3/5', '⅘': '4/5', '⅙': '1/6',
        '⅚': '5/6', '⅐': '1/7', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8'}
VOWEL_END = set('2459')   # 와
FRAC_RE = re.compile('([0-9]?)([' + ''.join(FRAC.keys()) + '])')
SPACE_RE = re.compile(r'(\d)(와|과)(\d+/\d+)')

stat = {'frac': 0, 'space': 0}

def conv(t):
    def rep(m):
        num, ch = m.group(1), m.group(2)
        stat['frac'] += 1
        if num:
            part = '와' if num in VOWEL_END else '과'
            return '%s%s %s' % (num, part, FRAC[ch])
        return FRAC[ch]
    t = FRAC_RE.sub(rep, t)

    def rep2(m):
        stat['space'] += 1
        return '%s%s %s' % (m.group(1), m.group(2), m.group(3))
    return SPACE_RE.sub(rep2, t)

for g in ['e5-1', 'e5-2', 'e6-1', 'e6-2']:
    p = os.path.join(SP, 'qset_%s.json' % g)
    d = json.load(io.open(p, encoding='utf-8'))
    for it in d:
        for key in ('memory', 'understand', 'misconceptions'):
            it[key] = [conv(s) for s in it[key]]
        for q in it['questions']:
            for key in ('q', 'answerHint', 'basedOn'):
                if key in q:
                    q[key] = conv(q[key])
    io.open(p, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=1))
print('유니코드 분수', stat['frac'], '건 / 붙어있던 대분수 띄우기', stat['space'], '건')
