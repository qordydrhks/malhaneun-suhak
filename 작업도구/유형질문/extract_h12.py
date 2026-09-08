# -*- coding: utf-8 -*-
"""고1-2(h1-2) 133개 개념의 원천 데이터를 뽑아 에이전트 입력으로 만든다.
   h1-2는 IIFE 안에 들여쓰기된 채로 대입돼 있어서 lstrip()으로 찾아야 한다."""
import io, json, re, os, ast

SP = os.path.dirname(os.path.abspath(__file__))
HTML = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'
lines = io.open(HTML, encoding='utf-8').read().split('\n')
GID = 'h1-2'
Q = r"""['"]"""

pre = "DD_CURRICULUM['%s'] = " % GID
raw = next(l.strip() for l in lines if l.strip().startswith(pre))
course = json.loads(raw[len(pre):].rstrip().rstrip(';'))


def field(txt, name):
    p = txt.find(name + ':')
    if p < 0:
        return ''
    i = p + len(name) + 1
    while i < len(txt) and txt[i] in ' \t':
        i += 1
    if i >= len(txt) or txt[i] not in '\'"':
        return ''
    quote, out, i = txt[i], [], i + 1
    while i < len(txt):
        ch = txt[i]
        if ch == chr(92):
            out.append(txt[i + 1] if i + 1 < len(txt) else '')
            i += 2
            continue
        if ch == quote:
            break
        out.append(ch)
        i += 1
    return ''.join(out)


kp, cards = {}, {}
kp_re = re.compile(r'\s*DD_KEYPOINTS\[\s*ddConceptId\(\s*%s(%s)%s\s*,\s*%s(.+?)%s\s*,\s*%s(.+?)%s\s*\)\s*\]\s*=\s*(\[.*\]);\s*$'
                   % (Q, GID, Q, Q, Q, Q, Q))
card_re = re.compile(r'\s*DD_CARDS\[\s*ddConceptId\(\s*%s(%s)%s\s*,\s*%s(.+?)%s\s*,\s*%s(.+?)%s\s*\)\s*\]\s*=\s*\{'
                     % (Q, GID, Q, Q, Q, Q, Q))
i = 0
while i < len(lines):
    m = kp_re.match(lines[i])
    if m:
        try:
            kp[(m.group(2), m.group(3))] = ast.literal_eval(m.group(4))
        except Exception:
            pass
    m = card_re.match(lines[i])
    if m:
        blob, j = [], i
        while j < len(lines) and j < i + 40:
            blob.append(lines[j])
            if re.match(r'\s*\};\s*$', lines[j]):
                break
            j += 1
        txt = '\n'.join(blob)
        cards[(m.group(2), m.group(3))] = {'concept': field(txt, 'concept'),
                                           'stem': field(txt, 'stem')}
        i = j
    i += 1

out = []
for b in course['bigUnits']:
    mids = b.get('middles') or [{'name': None, 'smalls': b.get('smalls', [])}]
    for mid in mids:
        for sm in mid['smalls']:
            low, high = [], []
            for t in sm.get('types', []):
                low += t.get('low', [])
                high += t.get('high', [])
            k = (b['name'], sm['name'])
            cd = cards.get(k, {})
            out.append({'big': b['name'], 'middle': mid['name'], 'small': sm['name'],
                        'concept': cd.get('concept', ''), 'basicProblem': cd.get('stem', ''),
                        'keyPoints': kp.get(k, []), 'existingQuestions': low + high})

print('개념', len(out),
      '| 개념설명없음', sum(1 for x in out if not x['concept']),
      '| 포인트없음', sum(1 for x in out if not x['keyPoints']),
      '| 기존질문없음', sum(1 for x in out if not x['existingQuestions']))
print()
for b in course['bigUnits']:
    mids = b.get('middles') or [{'name': None, 'smalls': b.get('smalls', [])}]
    print('==', b['name'])
    for m in mids:
        print('   -', m['name'], len(m['smalls']), '개')

# 중단원 단위로 묶어 조각을 만든다 (개당 20~28개 목표)
GROUPS = [
    ('D1', ['1. 평면좌표', '2. 직선의 방정식']),
    ('D2', ['3. 원의 방정식', '4. 도형의 이동']),
    ('D3', ['1. 집합의 뜻과 표현']),
    ('D4', ['2. 집합의 연산']),
    ('D5', ['3. 명제', '4. 명제의 증명']),
    ('D6', ['1. 함수', '2. 합성함수와 역함수']),
    ('D7', ['3. 유리함수', '4. 무리함수']),
]
print()
seen = set()
for name, mids in GROUPS:
    part = [x for x in out if x['middle'] in mids]
    if not part:
        print('!! 빈 조각', name, mids)
        continue
    seen |= set(x['small'] for x in part)
    io.open(os.path.join(SP, 'src_%s.json' % name), 'w', encoding='utf-8').write(
        json.dumps({'chunk': name, 'grade': GID, 'middles': mids, 'concepts': part},
                   ensure_ascii=False, indent=1))
    print(' %s : %d개 (%s)' % (name, len(part), ' + '.join(mids)))
miss = [x['small'] for x in out if x['small'] not in seen]
print('조각에 안 들어간 개념', len(miss), miss[:6])
