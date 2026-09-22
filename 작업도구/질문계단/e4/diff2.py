import json
import sys
O=json.load(open(sys.argv[1],encoding='utf-8'))
N=json.load(open(sys.argv[2],encoding='utf-8'))
print('old',O['exportedAt'],'new',N['exportedAt'],len(O['items']),len(N['items']))
o={i['id']:i for i in O['items']}
cur=lambda i:i.get('newQ') or i['q']
import collections
okc=collections.Counter()
for x in N['items']:
    y=o.get(x['id'])
    if not y: print('NEW',x['big'][:2],x['small'],x['kind'],'r',x['round'],'off',x['off'],'|',cur(x),'|A:',x.get('answer'),x.get('keys')); continue
    ch=[]
    if cur(x)!=cur(y): ch.append('Q: '+cur(y)+'\n      -> '+cur(x))
    if x['round']!=y['round']: ch.append('R %s->%s'%(y['round'],x['round']))
    if x['off']!=y['off']: ch.append('OFF %s->%s'%(y['off'],x['off']))
    if (x.get('answer') or '')!=(y.get('answer') or ''): ch.append('A: %s\n      -> %s'%(y.get('answer'),x.get('answer')))
    if (x.get('keys') or [])!=(y.get('keys') or []): ch.append('K: %s -> %s'%(y.get('keys'),x.get('keys')))
    if bool(x.get('ok'))!=bool(y.get('ok')): okc[(x['big'][:2],x.get('ok',False))]+=1
    if ch:
        print('==',x['big'][:2],x['small'],x['kind'],x.get('type',''),x['id'],'| r',x['round'],'off',x['off'])
        print('   now:',cur(x))
        for c in ch: print('   ',c)
for id_ in o:
    if id_ not in {i['id'] for i in N['items']}: print('GONE',o[id_]['small'],cur(o[id_]))
print('ok changes',dict(okc))
