# -*- coding: utf-8 -*-
import io, json, re, os
SP = os.path.dirname(os.path.abspath(__file__))
SRC = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'
lines = io.open(SRC, encoding='utf-8').read().split('\n')

i_cur = next(i for i, l in enumerate(lines) if l.startswith('const DD_CURRICULUM'))
s = lines[i_cur].strip(); s = s[s.index('=')+1:].rstrip().rstrip(';')
cur = json.loads(s)

BS = chr(92)

def jsstr(txt, pos):
    q = txt[pos]; out = []; i = pos + 1
    esc = {'n': '\n', 't': '\t', BS: BS, "'": "'", '"': '"'}
    while i < len(txt):
        ch = txt[i]
        if ch == BS:
            nxt = txt[i+1]
            out.append(esc.get(nxt, nxt)); i += 2; continue
        if ch == q:
            return ''.join(out), i
        out.append(ch); i += 1
    return ''.join(out), i

def field(txt, name):
    m = re.search(r'\b' + name + r'\s*:\s*', txt)
    if not m: return ''
    p = m.end()
    if p < len(txt) and txt[p] in '"\'':
        return jsstr(txt, p)[0]
    return ''

kp = {}
kp_re = re.compile(r"""\s*DD_KEYPOINTS\[\s*ddConceptId\((['"])(.*?)\1\s*,\s*(['"])(.*?)\3\s*,\s*(['"])(.*?)\5\s*\)\s*\]\s*=\s*(\[.*\]);\s*$""")
for l in lines:
    m = kp_re.match(l)
    if m:
        arr = m.group(7)
        try:
            v = json.loads(arr)
        except Exception:
            v = []
            p = 0
            while p < len(arr):
                if arr[p] in '"\'':
                    val, end = jsstr(arr, p)
                    v.append(val); p = end + 1
                else:
                    p += 1
        kp[(m.group(2), m.group(4), m.group(6))] = v

cards = {}
card_re = re.compile(r"""\s*DD_CARDS\[\s*ddConceptId\((['"])(.*?)\1\s*,\s*(['"])(.*?)\3\s*,\s*(['"])(.*?)\5\s*\)\s*\]\s*=\s*\{""")
i = 0
while i < len(lines):
    m = card_re.match(lines[i])
    if m:
        key = (m.group(2), m.group(4), m.group(6))
        blob = []; j = i
        while j < len(lines) and j < i + 60:
            blob.append(lines[j])
            if re.match(r'\s*\};\s*$', lines[j]): break
            j += 1
        txt = '\n'.join(blob)
        bp = ''
        mb = re.search(r'basicProblem\s*:\s*\{', txt)
        if mb: bp = field(txt[mb.end():mb.end()+900], 'stem')
        cards[key] = {'concept': field(txt, 'concept'), 'basicProblem': bp,
                      'bookPage': field(txt, 'bookPage')}
        i = j
    i += 1

for g in ['e3-1', 'e3-2']:
    out = []
    for b in cur[g]['bigUnits']:
        for sm in b.get('smalls', []):
            low, high = [], []
            for t in sm.get('types', []):
                low += t.get('low', []); high += t.get('high', [])
            k = (g, b['name'], sm['name'])
            cd = cards.get(k, {})
            out.append({'grade': g, 'big': b['name'], 'small': sm['name'],
                        'concept': cd.get('concept', ''),
                        'basicProblem': cd.get('basicProblem', ''),
                        'keyPoints': kp.get(k, []),
                        'existingQuestions': (low + high)[:8]})
    io.open(os.path.join(SP, 'src_%s.json' % g), 'w', encoding='utf-8').write(
        json.dumps(out, ensure_ascii=False, indent=1))
    print(g, len(out), 'concepts | no-concept:', sum(1 for x in out if not x['concept']),
          '| no-kp:', sum(1 for x in out if not x['keyPoints']),
          '| no-q:', sum(1 for x in out if not x['existingQuestions']),
          '| no-bp:', sum(1 for x in out if not x['basicProblem']))
