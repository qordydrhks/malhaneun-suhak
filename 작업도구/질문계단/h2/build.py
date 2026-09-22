# 고2 대수 질문 모음 → 미리보기 HTML + 유형 빠짐 점검
# spec_XX.py 마다 S = {개념Q번호: {'q': [(회차, 질문, 모범 답, [핵심], [유형])], 'L': [(질문, [아이디어], [유형])]}}
# 사용: python build.py spec_01 spec_03 ...   (인자가 없으면 spec_*.py 전부)
import json, io, html, sys, glob, importlib, os
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from map_types import M
QA = json.load(open(os.path.join(HERE, 'qa_daesu.json'), encoding='utf-8'))
Q = [q for s in QA for q in s['qs']]
SEC = []; n = 0
for s in QA:
    SEC.append((s['sec'], n + 1, n + len(s['qs']))); n += len(s['qs'])
TY = {k[0]: v for k, v in json.load(open(os.path.join(HERE, 'types_zai.json'), encoding='utf-8')).items() if not k.startswith('_')}
TNAME = {k: v for k, v in json.load(open(os.path.join(HERE, 'types_zai.json'), encoding='utf-8')).items() if not k.startswith('_')}
mods = sys.argv[1:] or sorted(os.path.basename(f)[:-3] for f in glob.glob(os.path.join(HERE, 'spec_*.py')))
S = {}
for m in mods: S.update(importlib.import_module(m).S)

# 점검: 형식 · 유형 번호 · 대응표와의 연결
err = []
cov = {}
for qn, v in S.items():
    assert 1 <= qn <= 115, qn
    for it in v['q']:
        r, q, a, k, ty = it
        if r not in (1, 2): err.append((qn, '회차', q))
        if not (1 <= len(k) <= 3): err.append((qn, '핵심 개수', q))
        for t in ty: cov.setdefault(t, []).append('%d번 %d회차' % (qn, r))
    for q, ids, ty in v.get('L', []):
        if len(ids) != 2: err.append((qn, '계단 아이디어는 2개', q))
        for t in ty: cov.setdefault(t, []).append('%d번 계단' % qn)
    for it in v['q']:
        for t in it[4]:
            if t[0] not in TY or not (1 <= int(t[1:]) <= len(TY[t[0]])): err.append((qn, '없는 유형', t))
# 다룬 개념Q 범위에 대응표상 걸린 유형이 빠졌는지
done = set(S)
need = []
for u, lst in M.items():
    for i, mm in enumerate(lst):
        tid = '%s%02d' % (u, i + 1)
        qs = [x for x in mm if x != 'X']
        if qs and all(x in done for x in qs) and tid not in cov: need.append(tid)
print('개념Q', len(S), '· 1회차', sum(1 for v in S.values() for x in v['q'] if x[0] == 1),
      '· 2회차', sum(1 for v in S.values() for x in v['q'] if x[0] == 2), '· 계단', sum(len(v.get('L', [])) for v in S.values()))
print('형식 문제', err[:20], '· 빠진 유형', need)

e = html.escape
def tag(ty): return ''.join(' <span class="t">%s</span>' % t for t in ty)
parts = []
for name, a, b in SEC:
    have = [qn for qn in range(a, b + 1) if qn in S]
    if not have: continue
    parts.append('<h2>%s</h2>' % e(name))
    for qn in have:
        v = S[qn]; qq = Q[qn - 1]
        parts.append('<section><h3>%d. %s <span class="pg">p.%d</span></h3>' % (qn, e(qq[0]), qq[1]))
        for r, q, ans, k, ty in v['q']:
            parts.append('<div class="it r%d"><b>%d회차</b> %s%s<div class="a">모범 답: %s</div><div class="k">꼭 말할 핵심: %s</div></div>' % (r, r, e(q), tag(ty), e(ans), ' · '.join(e(x) for x in k)))
        for q, ids, ty in v.get('L', []):
            parts.append('<div class="it L"><b>계단</b> %s%s<div class="k">통과 아이디어: %s</div></div>' % (e(q), tag(ty), ' · '.join(e(x) for x in ids)))
        parts.append('</section>')
units = sorted({t[0] for t in cov} | {x[0] for x in need})
cov_html = ''
for u in units:
    uname = [k for k in TNAME if k[0] == u][0]
    cov_html += '<h3>%s</h3><table><tr><th>유형</th><th>이름</th><th>짚는 질문</th></tr>' % e(uname)
    for i, t in enumerate(TY[u]):
        tid = '%s%02d' % (u, i + 1)
        cov_html += '<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (tid, e(t.lstrip('*!')), e(', '.join(cov.get(tid, ['— (다른 절에서)']))))
    cov_html += '</table>'
cnt1 = sum(1 for v in S.values() for x in v['q'] if x[0] == 1); cnt2 = sum(1 for v in S.values() for x in v['q'] if x[0] == 2); cntL = sum(len(v.get('L', [])) for v in S.values())
doc = '''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>고2 대수 질문</title>
<style>:root{--bg:#fff;--fg:#1d2433;--mut:#667;--l1:#eaf3ff;--l2:#fff4e5;--lL:#eefaf0;--bd:#dde}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#15181f;--fg:#e8ebf2;--mut:#9aa;--l1:#1c2a3d;--l2:#33291a;--lL:#1b2e21;--bd:#334}}
:root[data-theme="dark"]{--bg:#15181f;--fg:#e8ebf2;--mut:#9aa;--l1:#1c2a3d;--l2:#33291a;--lL:#1b2e21;--bd:#334}
body{background:var(--bg);color:var(--fg);font-family:system-ui,"Malgun Gothic",sans-serif;margin:0;padding:16px;line-height:1.55}
main{max-width:880px;margin:auto}h1{font-size:1.4em}h3{margin:18px 0 6px}.pg{color:var(--mut);font-size:.8em;font-weight:400}
.it{border:1px solid var(--bd);border-radius:10px;padding:8px 12px;margin:6px 0}.r1{background:var(--l1)}.r2{background:var(--l2)}.L{background:var(--lL)}
.a,.k{font-size:.92em;color:var(--mut);margin-top:3px}.t{font-size:.75em;border:1px solid var(--mut);border-radius:6px;padding:0 5px;margin-left:4px;color:var(--mut)}
table{border-collapse:collapse;width:100%;font-size:.92em}td,th{border:1px solid var(--bd);padding:4px 8px;text-align:left}</style></head><body><main>
<h1>고2 대수 질문</h1><p>개념Q ''' + str(len(S)) + ''' · 1회차 ''' + str(cnt1) + ''' · 2회차 ''' + str(cnt2) + ''' · 계단 ''' + str(cntL) + '''칸 · 빠진 유형 ''' + str(len(need)) + '''개</p>
<p>색: 파랑 1회차 · 주황 2회차 · 초록 3회차 계단 · 작은 글자 = 짚는 자이스토리 유형</p>''' + ''.join(parts) + '<h2>대표유형 빠짐없이</h2>' + cov_html + '</main></body></html>'
out = os.path.join(HERE, '질문_대수_' + '_'.join(m.replace('spec_', '') for m in mods) + '.html')
io.open(out, 'w', encoding='utf-8').write(doc)
print(out)
