# -*- coding: utf-8 -*-
import io, json, re, os
SP = os.path.dirname(os.path.abspath(__file__))
src = io.open(r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html', encoding='utf-8').read()
lines = src.split('\n')

def parse_assign(line):
    s = line.strip()
    s = s[s.index('=') + 1:].rstrip().rstrip(';')
    return json.loads(s)

cur = parse_assign(lines[4010])
i62 = next(i for i, l in enumerate(lines) if l.strip().startswith("DD_CURRICULUM['e6-2']"))
cur['e6-2'] = parse_assign(lines[i62])

kp = {}
kp_re = re.compile(r'\s*DD_KEYPOINTS\[ddConceptId\("([^"]+)","([^"]+)","([^"]+)"\)\]\s*=\s*(\[.*\]);\s*$')
for l in lines:
    m = kp_re.match(l)
    if m:
        kp[(m.group(1), m.group(2), m.group(3))] = json.loads(m.group(4))

def field(txt, name):
    """concept: "..."  형태에서 값만 뽑는다 (JS 문자열 이스케이프 고려)."""
    key = name + ':'
    p = txt.find(key)
    if p < 0:
        return ''
    q = txt.find('"', p)
    if q < 0:
        return ''
    out = []
    i = q + 1
    while i < len(txt):
        ch = txt[i]
        if ch == '\\':
            out.append(txt[i:i + 2]); i += 2; continue
        if ch == '"':
            break
        out.append(ch); i += 1
    return ''.join(out)

cards = {}
card_re = re.compile(r'\s*DD_CARDS\[ *ddConceptId\("([^"]+)","([^"]+)","([^"]+)"\) *\] *= *\{')
i = 0
while i < len(lines):
    m = card_re.match(lines[i])
    if m:
        key = (m.group(1), m.group(2), m.group(3))
        blob = []
        j = i
        while j < len(lines) and j < i + 40:
            blob.append(lines[j])
            if re.match(r'\s*\};\s*$', lines[j]):
                break
            j += 1
        txt = '\n'.join(blob)
        cards[key] = {'concept': field(txt, 'concept'), 'stem': field(txt, 'stem')}
        i = j
    i += 1

for g in ['e5-1', 'e5-2', 'e6-1', 'e6-2']:
    out = []
    for b in cur[g]['bigUnits']:
        for sm in b.get('smalls', []):
            low, high = [], []
            for t in sm.get('types', []):
                low += t.get('low', [])
                high += t.get('high', [])
            k = (g, b['name'], sm['name'])
            cd = cards.get(k, {})
            out.append({
                'grade': g, 'big': b['name'], 'small': sm['name'],
                'concept': cd.get('concept', ''),
                'basicProblem': cd.get('stem', ''),
                'keyPoints': kp.get(k, []),
                'existingQuestions': (low + high)[:8],
            })
    p = os.path.join(SP, 'src_%s.json' % g)
    io.open(p, 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
    print(g, len(out), 'concepts, no-concept-text:', sum(1 for x in out if not x['concept']),
          ', no-keypoints:', sum(1 for x in out if not x['keyPoints']),
          ', no-questions:', sum(1 for x in out if not x['existingQuestions']))
