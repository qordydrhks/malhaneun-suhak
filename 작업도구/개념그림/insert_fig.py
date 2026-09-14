# -*- coding: utf-8 -*-
"""개념카드 그림(scenes_*.json)을 dodream.html 의 DD_FIGURES 블록에 넣는다.
   python insert_fig.py h1/scenes_A.json h1/scenes_B.json ...          -> 미리보기만
   python insert_fig.py ... --apply --ver v82.0-고1그림                  -> 실제 삽입
 · big/small 은 할 일 목록(todo_nofig_*.json)과 글자 대조 (한 글자만 달라도 카드를 못 찾는다)
 · 이미 DD_FIGURES 에 있는 키는 건너뛴다
 · skip 항목은 IIFE 뒤 '// [그림 못 넣음]' 주석으로
 · 작업 트리가 CRLF 라서 CRLF 로 쓴다"""
import io, json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SP = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(SP, '..', '..', 'dodream.html')
args = [a for a in sys.argv[1:]]
APPLY = '--apply' in args
NEWVER = args[args.index('--ver') + 1] if '--ver' in args else None
files = [a for a in args if a.endswith('.json')]

todo = json.load(io.open(os.path.join(SP, 'todo_nofig_2026-09-14.json'), encoding='utf-8'))
known = {(r['grade'], r['big'], r['small']) for r in todo}

rows = []
for f in files:
    rows += json.load(io.open(os.path.join(SP, f), encoding='utf-8'))
bad = [r['small'] for r in rows if (r['grade'], r['big'], r['small']) not in known]
assert not bad, '할 일 목록에 없는 개념: %s' % bad[:5]

src = io.open(P, encoding='utf-8', newline='').read().replace('\r\n', '\n')
L = src.split('\n')
start = next(i for i, l in enumerate(L) if l.strip() == 'const DD_FIGURES = {};')
close = next(i for i in range(start, len(L)) if L[i].strip() == '})();')
have = set(re.findall(r'DD_FIGURES\[ddConceptId\("([^"]*)","([^"]*)","([^"]*)"\)\]', '\n'.join(L[start:close])))

add, skips, dup = [], [], 0
for r in rows:
    k = (r['grade'], r['big'], r['small'])
    if 'skip' in r:
        skips.append('// [그림 못 넣음] %s · %s — %s' % (r['grade'], r['small'], r['skip']))
        continue
    if k in have:
        dup += 1
        continue
    have.add(k)
    add.append('  DD_FIGURES[ddConceptId("%s","%s","%s")] = %s;'
               % (k + (json.dumps(r['scene'], ensure_ascii=False),)))

last_note = max([i for i in range(close, min(close + 400, len(L))) if L[i].startswith('// [그림 못 넣음]')] or [close])
print('그림 %d개 추가 · 건너뜀(이미 있음) %d · 못 넣음 주석 %d' % (len(add), dup, len(skips)))

out = L[:close] + add + L[close:last_note + 1] + skips + L[last_note + 1:]
new = '\n'.join(out)
if NEWVER:
    m = re.search(r"const APP_VERSION = '[^']*';", new)
    new = new[:m.start()] + "const APP_VERSION = '%s';" % NEWVER + new[m.end():]

if APPLY:
    assert NEWVER, '--ver 필요'
    io.open(P, 'w', encoding='utf-8', newline='\r\n').write(new)
    b = open(P, 'rb').read()
    print('=> 삽입 완료 | CRLF %d / 줄바꿈 %d' % (b.count(b'\r\n'), b.count(b'\n')))
else:
    print('=> 미리보기만 함. 넣으려면 --apply --ver ...')
