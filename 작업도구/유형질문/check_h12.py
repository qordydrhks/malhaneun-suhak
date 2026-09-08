# -*- coding: utf-8 -*-
"""고1-2 7조각(D1~D7)을 합쳐 기계 점검 + 사람이 읽을 시트를 만든다."""
import io, json, os, re, unicodedata

SP = os.path.dirname(os.path.abspath(__file__))
CH = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']
TYPES = {'recall', 'reason', 'example', 'condition', 'error'}
BS = chr(92)

# 그림을 가리키는 표현 (지시어가 붙은 것만)
PIC = re.compile(r'아래 그림|다음 그림|위 그림|그림과 같|그림을 보|그림에서'
                 r'|아래 그래프|다음 그래프|위 그래프|그래프에서'
                 r'|아래 표|다음 표|위 표|아래 도형|다음 도형|다음 산점도|아래 산점도|산점도에서|도표'
                 r'|아래 벤다이어그램|다음 벤다이어그램|위 벤다이어그램|벤다이어그램에서')
BAD_UNI = '½⅓¼⅔¾⁰¹⁴⁵⁶⁷⁸⁹ⁿ⁻ᵃᵇ'
# 중3에서 쓰면 안 되는 고등 용어 (판별식은 교재가 안 씀)
BAD_TERM = ['삼각함수', '라디안', '지수함수', '로그', '수열', '귀납법', '미분', '적분',
            '극한', '순열', '조합', '확률', '행렬', '벡터', '허수', '복소수']


def norm(s):
    return re.sub(r'[\s\.\,\?\!·]', '', unicodedata.normalize('NFC', s))


def toks(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]+', unicodedata.normalize('NFC', s)))


def jac(a, b):
    A, B = toks(a), toks(b)
    return len(A & B) / float(len(A | B)) if A and B else 0.0


src, out, missing = [], [], []
for c in CH:
    sp = os.path.join(SP, 'src_%s.json' % c)
    qp = os.path.join(SP, 'qset_%s.json' % c)
    src += json.load(io.open(sp, encoding='utf-8'))['concepts']
    if os.path.exists(qp):
        out += json.load(io.open(qp, encoding='utf-8'))
    else:
        missing.append(c)
if missing:
    print('!! 아직 없는 조각:', missing)

srcmap = {(unicodedata.normalize('NFC', x['big']), unicodedata.normalize('NFC', x['small'])): x
          for x in src}
problems, sheet, tcnt, seen = [], [], {}, {}
qtotal = 0
done = set()

for it in out:
    big = unicodedata.normalize('NFC', it.get('big', ''))
    small = unicodedata.normalize('NFC', it.get('small', ''))
    s = srcmap.get((big, small))
    if s is None:
        problems.append('big/small 불일치: %r / %r' % (big[:20], small[:36]))
        s = {}
    else:
        done.add((big, small))
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
    if not mis:
        problems.append('misconceptions 없음 — %s' % small[:30])
    kinds, hints = {}, []
    for q in qs:
        t = q.get('type')
        kinds[t] = kinds.get(t, 0) + 1
        tcnt[t] = tcnt.get(t, 0) + 1
        if t not in TYPES:
            problems.append('알 수 없는 type %r — %s' % (t, small[:24]))
        txt, ah = q.get('q', ''), q.get('answerHint', '')
        both = txt + ' ' + ah
        if t == 'error' and unicodedata.normalize('NFC', q.get('basedOn', '')) not in mis:
            problems.append('basedOn 불일치 — %s :: %s' % (small[:26], q.get('basedOn', '')[:36]))
        if BS in both:
            problems.append('역슬래시 — %s' % small[:24])
        if '**' in both or '$' in both:
            problems.append('마크다운/달러 — %s' % small[:24])
        for ch2 in BAD_UNI:
            if ch2 in both:
                problems.append('금지 유니코드 %r — %s' % (ch2, small[:24]))
        if '너가' in both:
            problems.append("'너가'→'네가' — %s" % small[:24])
        for term in BAD_TERM:
            if term in both:
                problems.append('교육과정 밖 용어 %r — %s' % (term, small[:24]))
        m = PIC.search(both)
        if m and both[max(0, m.start() - 2):m.start()] != '그 ':
            problems.append('그림 참조 의심(%s) — %s :: %s' % (m.group(0), small[:20], txt[:44]))
        k = norm(txt)
        if k in seen:
            problems.append('같은 질문 반복: %s / %s' % (seen[k][:20], small[:20]))
        seen[k] = small
        for eq in s.get('existingQuestions', []):
            r = jac(txt, eq)
            if r >= 0.72:
                problems.append('기존질문과 유사(%.2f) — %s :: %s' % (r, small[:24], txt[:40]))
                break
        hints.append((t, ah))
    if kinds.get('recall', 0) != 1:
        problems.append('recall %d개 — %s' % (kinds.get('recall', 0), small[:34]))
    if kinds.get('reason', 0) != 1:
        problems.append('reason %d개 — %s' % (kinds.get('reason', 0), small[:34]))
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
        sheet.append('      -> %s' % q.get('answerHint'))
    sheet.append('')

for k in srcmap:
    if k not in done:
        problems.append('결과에 빠진 개념: %s' % k[1][:40])

io.open(os.path.join(SP, 'sheet_h12.txt'), 'w', encoding='utf-8').write(chr(10).join(sheet))
io.open(os.path.join(SP, 'problems_h12.txt'), 'w', encoding='utf-8').write(chr(10).join(problems))
print('개념 %d / 원천 %d / 문항 %d' % (len(out), len(src), qtotal))
print('유형', json.dumps(tcnt, ensure_ascii=False))
print('---- 문제 %d건 (problems_h12.txt) ----' % len(problems))
for p in problems[:25]:
    print('  ' + p)
