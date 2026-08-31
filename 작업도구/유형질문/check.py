# -*- coding: utf-8 -*-
"""생성된 qset_*.json 을 기계적으로 점검하고, 사람이 읽을 검토 시트를 만든다."""
import io, json, os, re, sys, unicodedata

SP = os.path.dirname(os.path.abspath(__file__))
GRADES = ['e5-1', 'e5-2', 'e6-1', 'e6-2']
TYPES = {'recall', 'reason', 'example', 'condition', 'error'}

def load(p):
    return json.load(io.open(os.path.join(SP, p), encoding='utf-8'))

def norm(s):
    s = unicodedata.normalize('NFC', s)
    return re.sub(r'[\s\.\,\?\!·]', '', s)

def toks(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]+', unicodedata.normalize('NFC', s)))

def jac(a, b):
    A, B = toks(a), toks(b)
    if not A or not B:
        return 0.0
    return len(A & B) / float(len(A | B))

problems = []
sheet = []
stats = {}

for g in GRADES:
    fp = os.path.join(SP, 'qset_%s.json' % g)
    if not os.path.exists(fp):
        problems.append('[%s] 파일 없음' % g)
        continue
    src = load('src_%s.json' % g)
    out = load('qset_%s.json' % g)
    if len(out) != len(src):
        problems.append('[%s] 개념 수 불일치 %d vs %d' % (g, len(out), len(src)))
    srcmap = {(unicodedata.normalize('NFC', x['big']), unicodedata.normalize('NFC', x['small'])): x for x in src}
    tcnt = {}
    qtotal = 0
    seen_q = {}
    for item in out:
        big = unicodedata.normalize('NFC', item.get('big', ''))
        small = unicodedata.normalize('NFC', item.get('small', ''))
        tag = '%s|%s' % (g, small[:14])
        if (big, small) not in srcmap:
            problems.append('[%s] big/small 불일치: %r / %r' % (g, big[:20], small[:30]))
            s = {}
        else:
            s = srcmap[(big, small)]
        qs = item.get('questions', [])
        qtotal += len(qs)
        if not (3 <= len(qs) <= 5):
            problems.append('[%s] 질문 수 %d — %s' % (g, len(qs), small[:30]))
        mis = [unicodedata.normalize('NFC', m) for m in item.get('misconceptions', [])]
        if not item.get('memory') or not item.get('understand'):
            problems.append('[%s] memory/understand 비어 있음 — %s' % (g, small[:30]))
        hints = []
        for q in qs:
            t = q.get('type')
            tcnt[t] = tcnt.get(t, 0) + 1
            if t not in TYPES:
                problems.append('[%s] 알 수 없는 type %r — %s' % (g, t, small[:30]))
            txt = q.get('q', '')
            ah = q.get('answerHint', '')
            if t == 'error':
                b = unicodedata.normalize('NFC', q.get('basedOn', ''))
                if b not in mis:
                    problems.append('[%s] basedOn 불일치 — %s' % (g, small[:30]))
            # 표기 규칙
            for bad, name in [('\\', '역슬래시'), ('**', '마크다운굵게'), ('$', '달러'), ('\\frac', 'latex')]:
                if bad in txt or bad in ah:
                    problems.append('[%s] 표기 위반(%s) — %s' % (g, name, small[:30]))
            if re.search(r'\d\s*\*\s*\d', txt + ah):
                problems.append('[%s] 별표 곱셈 — %s' % (g, small[:30]))
            # 전 학년 중복 질문
            k = norm(txt)
            if k in seen_q:
                problems.append('[%s] 같은 질문 반복: %s / %s' % (g, seen_q[k][:18], small[:18]))
            seen_q[k] = small
            # 기존 질문과 유사
            for eq in s.get('existingQuestions', []):
                if jac(txt, eq) >= 0.72:
                    problems.append('[%s] 기존질문과 유사(%.2f) — %s' % (g, jac(txt, eq), small[:24]))
                    break
            hints.append((t, ah, txt))
        # 개념 안 answerHint 중복
        for i in range(len(hints)):
            for j in range(i + 1, len(hints)):
                r = jac(hints[i][1], hints[j][1])
                if r >= 0.7:
                    problems.append('[%s] 답 중복(%.2f) %s/%s — %s' % (g, r, hints[i][0], hints[j][0], small[:24]))
        # 사람이 읽을 시트
        sheet.append('### %s | %s | %s' % (g, big, small))
        sheet.append('  기억: ' + ' / '.join(item.get('memory', [])))
        sheet.append('  이해: ' + ' / '.join(item.get('understand', [])))
        sheet.append('  오해: ' + ' / '.join(mis))
        for q in qs:
            sheet.append('  [%s] %s' % (q.get('type'), q.get('q')))
            sheet.append('      → %s' % q.get('answerHint'))
        sheet.append('')
    stats[g] = (len(out), qtotal, tcnt)

io.open(os.path.join(SP, 'review_sheet.txt'), 'w', encoding='utf-8').write('\n'.join(sheet))
for g in GRADES:
    if g in stats:
        n, q, t = stats[g]
        print('%s: 개념 %d, 질문 %d, %s' % (g, n, q, json.dumps(t, ensure_ascii=False)))
io.open(os.path.join(SP, 'problems.txt'), 'w', encoding='utf-8').write(chr(10).join(problems))
print('---- problems: %d (see problems.txt) ----' % len(problems))
