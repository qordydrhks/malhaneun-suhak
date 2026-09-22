import json,sys
F={i['id']:i for i in json.load(open(sys.argv[1],encoding='utf-8'))['items']}
M={i['id']:i for i in json.load(open(sys.argv[2],encoding='utf-8'))['items']}
cur=lambda i:i.get('newQ') or i['q']
n=0
for id_,m in M.items():
  f=F.get(id_)
  if not f: print('missing',m['small'],cur(m)); n+=1; continue
  d=[k for k in ('round','off') if f[k]!=m[k]]
  if cur(f)!=cur(m): d.append('q')
  if bool(f.get('ok'))!=bool(m.get('ok')): d.append('ok')
  if (f.get('answer') or '')!=(m.get('answer') or ''): d.append('ans')
  if (f.get('keys') or [])!=(m.get('keys') or []): d.append('keys')
  if d: n+=1; print(m['big'][:2],m['small'][:14],m['kind'],d,'|',cur(f)[:50])
for id_ in F:
  if id_ not in M: print('extra',F[id_]['small'][:14],F[id_]['round'],cur(F[id_])[:50])
print('diff',n)
