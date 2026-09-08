# -*- coding: utf-8 -*-
"""고1-2 유형별 질문(h1-2 133개)을 dodream.html에 격리 블록으로 넣는다.
   python insert_h12.py          -> 미리보기(block_h12.js만 저장)
   python insert_h12.py --apply  -> 실제 삽입"""
import io, json, os, sys

SP = os.path.dirname(os.path.abspath(__file__))
P = r'C:\Users\qordy\Documents\GitHub\malhaneun-suhak\dodream.html'
APPLY = '--apply' in sys.argv
NEWVER = 'v78.4-고1유형질문'
OLDVER = "const APP_VERSION = 'v78.3-중3유형질문';"

CH = [(c, 'h1-2') for c in ('D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7')]

rows = []
for c, g in CH:
    f = os.path.join(SP, 'qset_%s.json' % c)
    if not os.path.exists(f):
        sys.exit('!! 없는 조각: ' + c)
    for it in json.load(io.open(f, encoding='utf-8')):
        rows.append((g, it))

assert len(rows) == 133, '개념 수가 다르다: %d' % len(rows)
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
   [%s] 고1-2(공통수학2) 유형별 질문 세트 (133개 개념 · %d문항)
   · 앞 학년과 같은 형식. 기존 low/high 질문은 그대로 두고 '나란히' 붙는다.
   · 회상·이유는 개념마다 1개씩, 예·오류는 되도록, 조건은 진짜 조건이 있는 개념에만.
   · 좌표평면·원·함수 그래프·벤다이어그램은 그림을 떠올리기 쉬운 단원이라
     '그림을 보고 답하는 질문'이 되지 않게 좌표와 식을 전부 문장으로 썼다.
   · 다음 과정 내용(삼각함수·지수로그·수열·미적분·순열조합)은 쓰지 않았다.
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
io.open(os.path.join(SP, 'block_h12.js'), 'w', encoding='utf-8').write(block)
print('블록 %d줄 / %d자 -> block_h12.js  (개념 %d · 문항 %d)'
      % (len(lines), len(block), len(rows), qtotal))

src = io.open(P, encoding='utf-8').read()
if 'DD_QSET[ ddConceptId("h1-2"' in src:
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
