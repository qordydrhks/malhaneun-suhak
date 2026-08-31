# -*- coding: utf-8 -*-
"""중1-2 4조각을 합쳐 기계 점검 + 사람이 읽을 시트를 만든다."""
import io, json, os, re, unicodedata

SP = os.path.dirname(os.path.abspath(__file__))
TYPES = {'recall', 'reason', 'example', 'condition', 'error'}
PIC = re.compile(r'그림|사진|아래 도형|다음 도형|다음 표|아래 표|아래 그래프|다음 그래프|도표')

def norm(s):
    return re.sub(r'[\s\.\,\?\!·]', '', unicodedata.normalize('NFC', s))

def toks(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]+', unicodedata.normalize('NFC', s)))

def jac(a, b):
    A, B = toks(a), toks(b)
    return len(A & B) / float(len(A | B)) if A and B else 0.0

src, out = [], []
for i in (1, 2, 3, 4):
    sp = os.path.join(SP, 'src_m1-2_%d.json' % i)
    qp = os.path.join(SP, 'qset_m1-2_%d.json' % i)
    src += json.load(io.open(sp, encoding='utf-8'))
    if os.path.exists(qp):
        out += json.load(io.open(qp, encoding='utf-8'))
    else:
        print('!! 조각%d 결과 없음' % i)

srcmap = {(unicodedata.normalize('NFC', x['big']), unicodedata.normalize('NFC', x['small'])): x for x in src}
problems, sheet, tcnt, seen = [], [], {}, {}
qtotal = 0

for it in out:
    big = unicodedata.normalize('NFC', it.get('big', ''))
    small = unicodedata.normalize('NFC', it.get('small', ''))
    s = srcmap.get((big, small))
    if s is None:
        problems.append('big/small 불일치: %r / %r' % (big[:16], small[:30])); s = {}
    for bad in ('middle', 'grade', 'qset'):
        if bad in it:
            problems.append('불필요한 키 %s — %s' % (bad, small[:24]))
    qs = it.get('questions', [])
    qtotal += len(qs)
    if not (3 <= len(qs) <= 5):
        problems.append('질문 수 %d — %s' % (len(qs), small[:30]))
    if not it.get('memory') or not it.get('understand'):
        problems.append('memory/understand 비어 있음 — %s' % small[:30])
    mis = [unicodedata.normalize('NFC', m) for m in it.get('misconceptions', [])]
    kinds = {}
    hints = []
    for q in qs:
        t = q.get('type'); kinds[t] = kinds.get(t, 0) + 1
        tcnt[t] = tcnt.get(t, 0) + 1
        if t not in TYPES:
            problems.append('알 수 없는 type %r — %s' % (t, small[:24]))
        txt, ah = q.get('q', ''), q.get('answerHint', '')
        if t == 'error' and unicodedata.normalize('NFC', q.get('basedOn', '')) not in mis:
            problems.append('basedOn 불일치 — %s' % small[:30])
        for bad, nm in [('\\', '역슬래시'), ('**', '마크다운'), ('$', '달러')]:
            if bad in txt or bad in ah:
                problems.append('표기 위반(%s) — %s' % (nm, small[:24]))
        m = PIC.search(txt)
        if m and not re.search(r'줄기와 잎|그림그래프|그림자', txt):
            problems.append('그림 참조 의심(%s) — %s :: %s' % (m.group(0), small[:20], txt[:40]))
        k = norm(txt)
        if k in seen:
            problems.append('같은 질문 반복: %s / %s' % (seen[k][:18], small[:18]))
        seen[k] = small
        for eq in s.get('existingQuestions', []):
            if jac(txt, eq) >= 0.72:
                problems.append('기존질문과 유사(%.2f) — %s' % (jac(txt, eq), small[:24])); break
        hints.append((t, ah))
    if kinds.get('recall', 0) != 1:
        problems.append('recall %d개 — %s' % (kinds.get('recall', 0), small[:30]))
    if kinds.get('reason', 0) != 1:
        problems.append('reason %d개 — %s' % (kinds.get('reason', 0), small[:30]))
    for i in range(len(hints)):
        for j in range(i + 1, len(hints)):
            r = jac(hints[i][1], hints[j][1])
            if r >= 0.7:
                problems.append('답 중복(%.2f) %s/%s — %s' % (r, hints[i][0], hints[j][0], small[:24]))
    sheet.append('### %s | %s' % (big, small))
    sheet.append('  기억: ' + ' / '.join(it.get('memory', [])))
    sheet.append('  이해: ' + ' / '.join(it.get('understand', [])))
    sheet.append('  오해: ' + ' / '.join(mis))
    for q in qs:
        sheet.append('  [%s] %s' % (q.get('type'), q.get('q')))
        sheet.append('      → %s' % q.get('answerHint'))
    sheet.append('')

io.open(os.path.join(SP, 'sheet_m1-2.txt'), 'w', encoding='utf-8').write(chr(10).join(sheet))
io.open(os.path.join(SP, 'problems_m12.txt'), 'w', encoding='utf-8').write(chr(10).join(problems))
print('concepts %d / questions %d' % (len(out), qtotal))
print('types', json.dumps(tcnt))
print('---- problems: %d (problems_m12.txt) ----' % len(problems))
