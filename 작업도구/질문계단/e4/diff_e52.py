import json, sys
B = json.load(open(r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\작업도구\질문계단\e4\base_e5-2.json', encoding='utf-8'))
M = json.load(open(r'C:\Users\qordy\Desktop\질문고르기_e5-2_2026-09-22.json', encoding='utf-8'))
b = {i['id']: i for i in B['items']}
m = {i['id']: i for i in M['items']}
def cur(i): return i.get('newQ') or i['q']
out = []
for id_, x in m.items():
    y = b.get(id_)
    if not y:
        out.append(('NEW', x)); continue
    ch = []
    if cur(x) != cur(y): ch.append('Q: %s\n      -> %s' % (cur(y), cur(x)))
    if x['round'] != y['round']: ch.append('R %s->%s' % (y['round'], x['round']))
    if x['off'] != y['off']: ch.append('OFF %s->%s' % (y['off'], x['off']))
    if (x.get('answer') or '') != (y.get('answer') or ''): ch.append('A: %s\n      -> %s' % (y.get('answer'), x.get('answer')))
    if (x.get('keys') or []) != (y.get('keys') or []): ch.append('K: %s -> %s' % (y.get('keys'), x.get('keys')))
    if x['ord'] != y['ord']: ch.append('ord %s->%s' % (y['ord'], x['ord']))
    if bool(x.get('ok')) != bool(y.get('ok')): ch.append('ok %s->%s' % (bool(y.get('ok')), bool(x.get('ok'))))
    if ch: out.append((ch, x))
for id_ in b:
    if id_ not in m: print('GONE', id_, cur(b[id_]))
for c, x in out:
    if c == 'NEW':
        print('== NEW', x['small'], x['kind'], 'r', x['round'], 'off', x['off'], '|', cur(x), '| A:', x.get('answer'), x.get('keys')); continue
    only_ok = all(s.startswith('ok') for s in c)
    print('==', x['big'][:6], x['small'], x['kind'], x.get('type', ''), x['id'], '(ok only)' if only_ok else '')
    if not only_ok:
        print('   cur:', cur(x), '| r', x['round'], 'off', x['off'])
        for s in c: print('   ', s)
