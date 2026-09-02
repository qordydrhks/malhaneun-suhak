# -*- coding: utf-8 -*-
"""qset_01..12.json 을 합쳐 기계 점검하고, 사람이 읽을 검토 시트를 만든다."""
import io, json, os, re, unicodedata

SP = os.path.dirname(os.path.abspath(__file__))
TYPES = {'recall', 'reason', 'example', 'condition', 'error'}
BS = chr(92)

def load(p):
    return json.load(io.open(os.path.join(SP, p), encoding='utf-8'))

def norm(s):
    return re.sub(r'[\s\.\,\?\!·]', '', unicodedata.normalize('NFC', s))

def toks(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]+', unicodedata.normalize('NFC', s)))

def jac(a, b):
    A, B = toks(a), toks(b)
    if not A or not B: return 0.0
    return len(A & B) / float(len(A | B))

# --- merge chunks ---
merged = {'e3-1': [], 'e3-2': []}
missing = []
for i in range(1, 13):
    fp = os.path.join(SP, 'qset_%02d.json' % i)
    if not os.path.exists(fp):
        missing.append(i); continue
    data = json.load(io.open(fp, encoding='utf-8'))
    g = 'e3-1' if i <= 6 else 'e3-2'
    merged[g] += data
if missing:
    print('!! 없는 파일:', missing)
for g in merged:
    io.open(os.path.join(SP, 'qset_%s.json' % g), 'w', encoding='utf-8').write(
        json.dumps(merged[g], ensure_ascii=False, indent=1))

problems = []
sheet = []
stats = {}
BAD_UNICODE = '½⅓¼¾⅔⅕⅖⅗⅘⅙⅐⅛²³'
OUT_OF_SCOPE = ['통분', '약분', '최소공배수', '최대공약수', '백분율', '평균', '원주율', '원주',
                '넓이', '부피', '반올림', '이등변삼각형', '정삼각형', '평행', '수직',
                '막대그래프', '꺾은선그래프', '비율', '소수점 아래 둘째']

for g in ['e3-1', 'e3-2']:
    src = load('src_%s.json' % g)
    out = merged[g]
    if len(out) != len(src):
        problems.append('[%s] 개념 수 불일치 %d vs %d' % (g, len(out), len(src)))
    srcmap = {(unicodedata.normalize('NFC', x['big']), unicodedata.normalize('NFC', x['small'])): x for x in src}
    tcnt = {}; qtotal = 0; seen_q = {}
    for item in out:
        big = unicodedata.normalize('NFC', item.get('big', ''))
        small = unicodedata.normalize('NFC', item.get('small', ''))
        if (big, small) not in srcmap:
            problems.append('[%s] big/small 불일치: %r / %r' % (g, big[:20], small[:30])); s = {}
        else:
            s = srcmap[(big, small)]
        qs = item.get('questions', [])
        qtotal += len(qs)
        if not (3 <= len(qs) <= 5):
            problems.append('[%s] 질문 수 %d — %s' % (g, len(qs), small[:30]))
        types_here = [q.get('type') for q in qs]
        for need in ('recall', 'reason'):
            if types_here.count(need) < 1:
                problems.append('[%s] %s 없음 — %s' % (g, need, small[:30]))
        for t in set(types_here):
            if types_here.count(t) > 1 and t != 'example':
                problems.append('[%s] %s 중복 %d개 — %s' % (g, t, types_here.count(t), small[:30]))
        mis = [unicodedata.normalize('NFC', m) for m in item.get('misconceptions', [])]
        if not item.get('memory') or not item.get('understand'):
            problems.append('[%s] memory/understand 비어 있음 — %s' % (g, small[:30]))
        hints = []
        for q in qs:
            t = q.get('type'); tcnt[t] = tcnt.get(t, 0) + 1
            if t not in TYPES:
                problems.append('[%s] 알 수 없는 type %r — %s' % (g, t, small[:30]))
            txt = q.get('q', ''); ah = q.get('answerHint', '')
            both = txt + ' ' + ah
            if t == 'error':
                b = unicodedata.normalize('NFC', q.get('basedOn', ''))
                if b not in mis:
                    problems.append('[%s] basedOn 불일치 — %s' % (g, small[:30]))
            for bad, name in [(BS, '역슬래시'), ('**', '마크다운굵게'), ('$', '달러')]:
                if bad in both:
                    problems.append('[%s] 표기 위반(%s) — %s' % (g, name, small[:30]))
            for ch in BAD_UNICODE:
                if ch in both:
                    problems.append('[%s] 유니코드기호 %s — %s' % (g, ch, small[:30]))
            if re.search(r'\d\s*\*\s*\d', both):
                problems.append('[%s] 별표 곱셈 — %s' % (g, small[:30]))
            for m in re.finditer(r'(\d+)\s*(와|과)\s*\d+/\d+', both):
                last = m.group(1)[-1]
                want = '와' if last in '2459' else ('과' if last in '136780' else m.group(2))
                if want != m.group(2):
                    problems.append('[%s] 대분수 조사 오타(%s) — %s' % (g, m.group(0), small[:30]))
            if re.search(r'그림에서|그림을 보고|아래 그림|위 그림|다음 그림', txt):
                problems.append('[%s] 그림 의존 질문 — %s' % (g, small[:30]))
            if re.search(r'\d+\.\d\d', both):
                problems.append('[%s] 소수 둘째 자리 — %s' % (g, small[:30]))
            for m in re.finditer(r'[-−](?=\d)', both):
                prev = both[:m.start()].rstrip()
                if not prev or not prev[-1].isdigit():
                    problems.append('[%s] 음수 의심 — %s' % (g, small[:30]))
                    break
            for w in OUT_OF_SCOPE:
                if w in both:
                    problems.append('[%s] 범위 밖 낱말(%s) — %s' % (g, w, small[:30]))
            if re.search(r'(있을까|맞을까|될까|일까요)\?$', txt) and '왜' not in txt:
                pass  # 참고용, 사람이 판단
            k = norm(txt)
            if k in seen_q:
                problems.append('[%s] 같은 질문 반복: %s / %s' % (g, seen_q[k][:18], small[:18]))
            seen_q[k] = small
            for eq in s.get('existingQuestions', []):
                if jac(txt, eq) >= 0.72:
                    problems.append('[%s] 기존질문과 유사(%.2f) — %s' % (g, jac(txt, eq), small[:24])); break
            hints.append((t, ah, txt))
        for i2 in range(len(hints)):
            for j2 in range(i2 + 1, len(hints)):
                r = jac(hints[i2][1], hints[j2][1])
                if r >= 0.7:
                    problems.append('[%s] 답 중복(%.2f) %s/%s — %s' % (g, r, hints[i2][0], hints[j2][0], small[:24]))
        sheet.append('### %s | %s | %s' % (g, big, small))
        sheet.append('  기억: ' + ' / '.join(item.get('memory', [])))
        sheet.append('  이해: ' + ' / '.join(item.get('understand', [])))
        sheet.append('  오해: ' + ' / '.join(mis))
        for q in qs:
            sheet.append('  [%s] %s' % (q.get('type'), q.get('q')))
            sheet.append('      -> %s' % q.get('answerHint'))
        sheet.append('')
    stats[g] = (len(out), qtotal, tcnt)

io.open(os.path.join(SP, 'review_sheet.txt'), 'w', encoding='utf-8').write('\n'.join(sheet))
io.open(os.path.join(SP, 'problems.txt'), 'w', encoding='utf-8').write('\n'.join(problems))
for g in ['e3-1', 'e3-2']:
    if g in stats:
        n, q, t = stats[g]
        print('%s: concepts %d, questions %d, %s' % (g, n, q, json.dumps(t)))
print('---- problems: %d (problems.txt) ----' % len(problems))
