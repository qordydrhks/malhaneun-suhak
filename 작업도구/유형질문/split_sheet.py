# -*- coding: utf-8 -*-
"""check_h12.py가 만든 sheet_h12.txt를 조각별로 쪼개 읽기 좋게 만든다."""
import io, json, os
SP = os.path.dirname(os.path.abspath(__file__))
CH = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']

txt = io.open(os.path.join(SP, 'sheet_h12.txt'), encoding='utf-8').read()
blocks = txt.split('### ')
for c in CH:
    names = set(x['small'] for x in
                json.load(io.open(os.path.join(SP, 'qset_%s.json' % c), encoding='utf-8')))
    part = [b for b in blocks if b.split(' | ', 1)[-1].split('\n')[0] in names]
    p = os.path.join(SP, 'sheet_%s.txt' % c)
    io.open(p, 'w', encoding='utf-8').write(''.join('### ' + b for b in part))
    print('%s  개념 %2d  %3d KB' % (c, len(part), os.path.getsize(p) // 1024))
