# -*- coding: utf-8 -*-
"""고1-1 유형별 질문(h1-1 91개)을 dodream.html에 격리 블록으로 넣는다.
   python insert_h12.py          -> 미리보기(block_h11.js만 저장)
   python insert_h12.py --apply  -> 실제 삽입"""
import io, json, os, sys

SP = os.path.dirname(os.path.abspath(__file__))
P = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'
APPLY = '--apply' in sys.argv
NEWVER = 'v81.9-고1-1유형질문'
OLDVER = "const APP_VERSION = 'v81.8-질문그림';"

CH = [(c, 'h1-1') for c in ('E1', 'E2', 'E3', 'E4', 'E5', 'E6')]

rows = []
for c, g in CH:
    f = os.path.join(SP, 'qset_%s.json' % c)
    if not os.path.exists(f):
        sys.exit('!! 없는 조각: ' + c)
    for it in json.load(io.open(f, encoding='utf-8')):
        rows.append((g, it))

assert len(rows) == 91, '개념 수가 다르다: %d' % len(rows)
qtotal = sum(len(it['questions']) for _, it in rows)

# 원천과 big/small 글자 대조 (한 글자만 달라도 앱이 개념을 못 찾는다)
srcmap = set()
for c, g in CH:
    for x in json.load(io.open(os.path.join(SP, 'src_%s.json' % c), encoding='utf-8'))['concepts']:
        srcmap.add((g, x['big'], x['small']))
bad = [it['small'] for g, it in rows if (g, it['big'], it['small']) not in srcmap]
print('big/small 대조: %d/%d 통과' % (len(rows) - len(bad), len(rows)),
      ('실패 ' + str(bad[:3])) if bad else '')
assert not bad

head = """
/* ============================================================
   [%s] 고1-1(공통수학1) 유형별 질문 세트 (91개 개념 · %d문항)
   · 앞 학년과 같은 형식. 기존 low/high 질문은 그대로 두고 '나란히' 붙는다.
   · 회상·이유는 개념마다 1개씩, 예·오류는 되도록, 조건은 진짜 조건이 있는 개념에만.
   · 이차함수 그래프·행렬도 '그림을 보고 답하는 질문'이 되지 않게 식을 전부 문장으로 썼다.
   · 이 소단원들은 v81.3 규칙에 따라 기본(low) 질문이 학생에게 숨겨지고 깊이(high)+유형별 질문이 나온다.
   · 공통수학2 이후 내용(도형의 방정식·집합과 명제·함수·삼각함수·수열·미적분)은 쓰지 않았다.
   ============================================================ */
(function(){
""" % (NEWVER, qtotal)

lines = [head.rstrip('\n')]
for g, it in rows:
    obj = {'memory': it['memory'], 'understand': it['understand'],
           'misconceptions': it['misconceptions'], 'questions': it['questions']}
    lines.append('  DD_QSET[ ddConceptId("%s","%s","%s") ] = %s;'
                 % (g, it['big'], it['small'], json.dumps(obj, ensure_ascii=False)))
lines.append('})();')
block = '\n'.join(lines) + '\n'
io.open(os.path.join(SP, 'block_h11.js'), 'w', encoding='utf-8').write(block)
print('블록 %d줄 / %d자 -> block_h11.js  (개념 %d · 문항 %d)'
      % (len(lines), len(block), len(rows), qtotal))

src = io.open(P, encoding='utf-8').read()
if 'DD_QSET[ ddConceptId("h1-1"' in src:
    sys.exit('!! 이미 들어가 있다')
if src.count(OLDVER) != 1:
    sys.exit('!! APP_VERSION 앵커 없음')

srclines = src.split('\n')
last = max(i for i, l in enumerate(srclines) if l.startswith('  DD_QSET[ ddConceptId("'))
close = next(i for i in range(last, len(srclines)) if srclines[i].strip() == '})();')
out = srclines[:close + 1] + block.rstrip('\n').split('\n') + srclines[close + 1:]
new = '\n'.join(out).replace(OLDVER, "const APP_VERSION = '%s';" % NEWVER, 1)

if APPLY:
    # 이 저장소는 작업 트리가 CRLF다.
    io.open(P, 'w', encoding='utf-8', newline='\r\n').write(new)
    b = open(P, 'rb').read()
    print('=> 삽입 완료 (+%d줄) | CRLF %d / 줄바꿈 %d'
          % (len(out) - len(srclines), b.count(b'\r\n'), b.count(b'\n')))
else:
    print('=> 미리보기만 함. 실제로 넣으려면 --apply')
