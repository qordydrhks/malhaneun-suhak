# 채점 시험 결과(review_*.js) 요약: 모범=pass · 절반 두 번=partial · 틀림≠pass 가 아닌 칸만 뽑는다.
# 사용: python -X utf8 grade_anal.py <review_xx.js>
import json,sys
s=open(sys.argv[1],encoding='utf8').read()
d=json.loads(s[s.index('=')+1:].rstrip().rstrip(';'))
n=0;bad=[]
for small,arr in d['results'].items():
  for i,r in enumerate(arr):
    n+=1
    v={k:(r.get(k) or {}).get('verdict','ERR') for k in ('full','half','half2','wrong')}
    ok = v['full']=='pass' and v['half']=='partial' and v['half2']=='partial' and v['wrong']!='pass'
    if not ok: bad.append((small,i+1,v))
print('칸',n,'걸림',len(bad))
for b in bad: print(b)
