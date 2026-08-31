# -*- coding: utf-8 -*-
"""중1-2(m1-2) 122개 개념의 원천 데이터를 뽑아 에이전트 입력으로 만든다.
   ⚠️ m1-2는 다른 학년과 표기가 다르다 — 작은따옴표, 들여쓰기 없음. 둘 다 받게 짰다."""
import io, json, re, os, ast

SP = os.path.dirname(os.path.abspath(__file__))
src = io.open(r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html', encoding='utf-8').read()
lines = src.split('\n')

cur_i = next(i for i, l in enumerate(lines) if l.startswith('const DD_CURRICULUM = {'))
s = lines[cur_i].strip()
course = json.loads(s[s.index('=') + 1:].rstrip().rstrip(';'))['m1-2']

Q = r"""['"]"""   # 작은따옴표/큰따옴표 둘 다

kp = {}
kp_re = re.compile(r'\s*DD_KEYPOINTS\[\s*ddConceptId\(\s*%s(m1-2)%s\s*,\s*%s(.+?)%s\s*,\s*%s(.+?)%s\s*\)\s*\]\s*=\s*(\[.*\]);\s*$'
                   % (Q, Q, Q, Q, Q, Q))
for l in lines:
    m = kp_re.match(l)
    if m:
        try:
            kp[(m.group(2), m.group(3))] = ast.literal_eval(m.group(4))
        except Exception:
            pass

def field(txt, name):
    """concept: '...' 또는 "..." 에서 값만 뽑는다."""
    p = txt.find(name + ':')
    if p < 0:
        return ''
    i = p + len(name) + 1
    while i < len(txt) and txt[i] in ' \t':
        i += 1
    if i >= len(txt) or txt[i] not in '\'"':
        return ''
    quote = txt[i]
    out, i = [], i + 1
    while i < len(txt):
        ch = txt[i]
        if ch == '\\':
            out.append(txt[i + 1] if i + 1 < len(txt) else ''); i += 2; continue
        if ch == quote:
            break
        out.append(ch); i += 1
    return ''.join(out)

cards = {}
card_re = re.compile(r'\s*DD_CARDS\[\s*ddConceptId\(\s*%s(m1-2)%s\s*,\s*%s(.+?)%s\s*,\s*%s(.+?)%s\s*\)\s*\]\s*=\s*\{'
                     % (Q, Q, Q, Q, Q, Q))
i = 0
while i < len(lines):
    m = card_re.match(lines[i])
    if m:
        blob, j = [], i
        while j < len(lines) and j < i + 40:
            blob.append(lines[j])
            if re.match(r'\s*\};\s*$', lines[j]):
                break
            j += 1
        txt = '\n'.join(blob)
        cards[(m.group(2), m.group(3))] = {'concept': field(txt, 'concept'), 'stem': field(txt, 'stem')}
        i = j
    i += 1

out = []
for b in course['bigUnits']:
    mids = b.get('middles') or [{'name': None, 'smalls': b.get('smalls', [])}]
    for mid in mids:
        for sm in mid['smalls']:
            low, high = [], []
            for t in sm.get('types', []):
                low += t.get('low', []); high += t.get('high', [])
            k = (b['name'], sm['name'])
            cd = cards.get(k, {})
            out.append({
                'big': b['name'], 'middle': mid['name'], 'small': sm['name'],
                'concept': cd.get('concept', ''), 'basicProblem': cd.get('stem', ''),
                'keyPoints': kp.get(k, []), 'existingQuestions': (low + high)[:8],
            })

print('총', len(out), '개념 / 개념설명 없음', sum(1 for x in out if not x['concept']),
      '/ 포인트 없음', sum(1 for x in out if not x['keyPoints']),
      '/ 기존질문 없음', sum(1 for x in out if not x['existingQuestions']))

N = 4
size = (len(out) + N - 1) // N
for i in range(N):
    part = out[i * size:(i + 1) * size]
    p = os.path.join(SP, 'src_m1-2_%d.json' % (i + 1))
    io.open(p, 'w', encoding='utf-8').write(json.dumps(part, ensure_ascii=False, indent=1))
    print(' 조각%d: %d개' % (i + 1, len(part)))
