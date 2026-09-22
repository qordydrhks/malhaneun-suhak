import json, io, sys
sys.stdout.reconfigure(encoding='utf-8')
E = json.load(io.open('../../회차/export/e6-2_blank.json', encoding='utf-8'))
cur = None; out = []
for i in E['items']:
    if i['kind'] == 'ladder': continue
    k = (i['big'], i['small'])
    if k != cur: out.append('## %s  %s' % (i['big'].split(' ')[0], i['small'])); cur = k
    out.append('  %s %s | %s' % (i['id'].split(':', 1)[1], (i.get('type') or i['kind'])[:4], i['q']))
io.open('dump_e62.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(out))
