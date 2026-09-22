# figs.py → figs_all.json (브라우저에서 ddFig 로 그려 보는 용)
import json, io, sys, glob, importlib, os
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from figs import F
S = {}
for f in sorted(glob.glob(os.path.join(HERE, 'spec_*.py'))): S.update(importlib.import_module(os.path.basename(f)[:-3]).S)
out, miss = {}, []
for qn, lst in F.items():
    texts = [('q%d' % i, it[1]) for i, it in enumerate(S[qn]['q'])] + [('L%d' % i, it[0]) for i, it in enumerate(S[qn].get('L', []))]
    for sub, scene in lst:
        hit = [k for k, t in texts if sub in t]
        if len(hit) != 1: miss.append((qn, sub, hit)); continue
        out['%d|%s' % (qn, hit[0])] = scene
io.open(os.path.join(HERE, 'figs_all.json'), 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False))
print('그림', len(out), '못 찾음', miss)
