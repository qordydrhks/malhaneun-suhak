# -*- coding: utf-8 -*-
"""초4-2 「1. 분수의 덧셈과 뺄셈」 설계 (2026-09-30, 새 방식 · 전부 교체용) — 이 파일이 정본.
   실행하면 인쇄용 HTML·PDF를 만든다:  python -X utf8 작업도구/질문설계/e42_1.py
   회차: 1=교재 개념 쪽 / 2=교재엔 없지만 개념 하나로 / 3=개념 둘 이상(디딤돌 발전 문제·최상위S). 숫자는 교재와 다르게 새로, 전부 검산.
"""
import html, io, os, subprocess, shutil, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
e = html.escape

UNIT = {'title': '초4-2 「1. 분수의 덧셈과 뺄셈」 질문 설계',
 'src': '디딤돌 기본 4-2 8~15쪽(개념) · 26~27쪽(발전 문제) · 최상위S 4-2 1단원(대표유형 1~8)',
 'idea': '분모가 같으면 조각의 크기가 같아서 분모는 그대로, 분자(조각 수)끼리 계산한다. 대분수는 자연수끼리·분수끼리 따로 계산하고, 분수끼리 뺄 수 없으면 자연수에서 1을 가분수로 바꾼다.',
 'note': '4학년은 약분을 아직 배우지 않아 답은 분모를 그대로 둔다 (예: 9/6 = 1과 3/6).',
 'smalls': [
 {'no': '01', 'name': '분수의 덧셈 (1) — 분모가 같은 진분수', 'page': '8쪽',
  'core': [('A', '1/8이 몇 개인지 세어 더한다 → 분모 그대로, 분자끼리'), ('B', '결과가 가분수면 대분수로'), ('C', '분모를 더하면 안 되는 이유 (조각 크기는 그대로)')],
  'stuck': ['분모끼리 더함', '가분수를 그대로 둠'],
  'qs': [
   (0, '선수', '분수 3/5에 대해 설명해 봐.', '1을 똑같이 5로 나눈 것 중의 3개예요. 1/5이 3개인 수예요.'),
   (1, 'A', '3/8 + 2/8을 계산하는 과정을 말해 봐.', '1/8이 3개와 2개라 모두 5개, 5/8. 분모는 그대로 두고 분자끼리 더해요.'),
   (1, 'B', '5/6 + 4/6을 계산했더니 9/6이 됐어. 어떻게 나타내?', '가분수라서 대분수로 바꿔 1과 3/6'),
   (2, 'C', '친구가 2/7 + 3/7 = 5/14라고 했어. 무엇이 틀렸는지 설명해 봐.', '분모끼리도 더했어요. 1/7 조각의 크기는 그대로라서 조각 수만 더해 5/7'),
   (2, 'A·B', '3/10 + 4/10 + 5/10처럼 세 분수를 더할 때는 어떻게 해?', '분자끼리 3 + 4 + 5 = 12 → 12/10 = 1과 2/10'),
   (3, '발전 5', '□/13 + 7/13의 계산 결과가 진분수일 때, □에 들어갈 수 있는 자연수는 모두 몇 개인지 어떤 순서로 구해?', '진분수는 분자가 분모보다 작아야 해 → □ + 7 < 13 → □는 1~5 → 5개', ['진분수는 분자와 분모가 어떤 관계야?', '□ + 7이 13보다 작아야 하면 □는 몇까지 될 수 있어?']),
   (3, '최상위 대표유형 8 · 규칙', '1/15 + 2/15 + 3/15 + … + 7/15처럼 분자가 1씩 커지는 분수들의 합은 어떤 순서로 구해?', '분모가 모두 같으니 분자끼리 더해 → 1 + 2 + … + 7 = 28 (1+7, 2+6, 3+5처럼 짝 지으면 쉬워) → 28/15 = 1과 13/15', ['분모가 모두 같으면 무엇끼리 더하면 돼?', '1부터 7까지 빠르게 더하려면 어떻게 짝을 지어 볼까?', '28/15는 가분수야. 어떻게 나타내?'])]},
 {'no': '02', 'name': '분수의 덧셈 (2) — 대분수', 'page': '10쪽',
  'core': [('A', '자연수끼리, 분수끼리'), ('B', '분수끼리 더한 결과가 가분수면 1을 자연수로 올린다'), ('C', '가분수로 바꿔 더하는 방법')],
  'stuck': ['3과 7/5처럼 가분수를 남김', '받아올린 1을 빠뜨림'],
  'qs': [
   (1, 'A', '2와 1/4 + 1과 2/4를 계산하는 과정을 말해 봐.', '자연수끼리 3, 분수끼리 3/4 → 3과 3/4'),
   (1, 'B', '1과 3/4 + 1과 2/4에서 분수끼리 더했더니 5/4가 되었어. 어떻게 해야 돼?', '5/4 = 1과 1/4이니까 1을 자연수로 올려 3과 1/4'),
   (1, 'C', '1과 5/7 + 2와 3/7을 가분수로 바꾸어 계산하는 과정을 말해 봐.', '12/7 + 17/7 = 29/7 = 4와 1/7'),
   (2, 'B', '2와 5/9 + 1과 4/9의 계산 결과는 자연수야. 계산하기 전에 어떻게 알 수 있어?', '분수끼리 5/9 + 4/9 = 9/9 = 1이라서 3 + 1 = 4'),
   (2, 'B', '친구가 1과 3/5 + 2와 4/5 = 3과 7/5라고 답했어. 왜 틀렸지?', '분수 부분 7/5가 가분수라서 1을 자연수로 올려야 해요. 7/5 = 1과 2/5이니까 4와 2/5'),
   (3, '발전 11', '오전에 1과 7/12시간, 오후에 8/12시간 동안 숙제를 했어. 모두 몇 시간 몇 분인지 어떤 순서로 구해?', '1과 15/12 = 2와 3/12시간 → 1/12시간은 5분이니까 3/12시간은 15분 → 2시간 15분', ['1과 7/12 + 8/12를 먼저 계산하면 몇 시간이야?', '1시간은 60분이야. 그럼 1/12시간은 몇 분이야?']),
   (3, '최상위 대표유형 2', '가로가 2와 4/9 cm이고, 세로는 가로보다 1과 7/9 cm 더 긴 직사각형의 네 변의 길이의 합은 어떤 순서로 구해?', '세로 = 2와 4/9 + 1과 7/9 = 4와 2/9 → 가로 + 세로 + 가로 + 세로 = 13과 3/9 cm', ['세로가 가로보다 더 길다고 했어. 세로는 어떻게 구해?', '직사각형의 네 변은 가로 2개, 세로 2개야. 어떻게 더하면 돼?']),
   (3, '최상위 대표유형 3 · 대분수 만들기', '수 카드 3, 5, 6, 8 중 2장을 골라 분모가 9인 대분수를 만들려고 해. 만들 수 있는 가장 큰 대분수와 가장 작은 대분수의 합은 어떤 순서로 구해?', '분모가 같은 대분수는 자연수 부분이 클수록 커 → 가장 큰 수 8과 6/9, 가장 작은 수 3과 5/9 → 합 11과 11/9 = 12와 2/9', ['분모가 같은 대분수는 무엇이 클수록 큰 수야?', '가장 큰 대분수를 만들려면 가장 큰 카드를 어디에 놓아? 분자에는?', '두 수를 더했더니 분수 부분이 가분수야. 어떻게 해?'])]},
 {'no': '03', 'name': '분수의 뺄셈 (1) — 진분수끼리, 1 − 진분수', 'page': '12쪽',
  'core': [('A', '분모 그대로, 분자끼리 뺀다'), ('B', '1 − 진분수: 1을 빼는 수와 분모가 같은 가분수로 바꾼다')],
  'stuck': ['1에서 분자를 바로 뺌', '1을 분모가 다른 가분수로 바꿈'],
  'qs': [
   (1, 'A', '5/7 − 2/7을 계산하는 과정을 말해 봐.', '1/7이 5개에서 2개를 빼면 3개, 3/7'),
   (1, 'B', '1 − 3/8은 어떻게 계산해?', '1을 8/8로 바꿔 8/8 − 3/8 = 5/8'),
   (2, 'B', '1 − 2/5를 계산할 때 1을 왜 5/5로 바꿔?', '빼는 수가 1/5 조각이라서, 1도 1/5 조각 5개로 봐야 조각끼리 뺄 수 있어요.'),
   (2, 'A', '9/11에서 어떤 수를 뺐더니 5/11이 되었어. 어떤 수는 어떻게 구해?', '9/11 − 5/11 = 4/11'),
   (3, '최상위 대표유형 1', '어떤 수에 3/11을 더해야 할 것을 잘못하여 뺐더니 5/11이 되었어. 바르게 계산한 값은 어떤 순서로 구해?', '어떤 수 = 5/11 + 3/11 = 8/11 → 바르게 8/11 + 3/11 = 11/11 = 1', ['잘못 계산한 식을 먼저 써 봐. 어떤 수에서 3/11을 뺐더니 5/11이야. 어떤 수는?', '이제 원래 하려던 계산은 뭐야?']),
   (3, '최상위 대표유형 5 · 기호 약속', '가★나 = 1 − 가 − 나라고 약속할 때, 2/9★3/9의 값은 어떤 순서로 구해?', '약속대로 1 − 2/9 − 3/9 → 1을 9/9로 바꿔 9/9 − 2/9 − 3/9 = 4/9', ['약속대로 가 자리에 2/9, 나 자리에 3/9을 넣으면 어떤 식이 돼?', '1에서 빼려면 1을 어떻게 바꿔야 해?'])]},
 {'no': '04', 'name': '분수의 뺄셈 (2) — 받아내림 없는 대분수, 자연수 − 대분수', 'page': '14쪽',
  'core': [('A', '자연수끼리, 분수끼리 뺀다'), ('B', '자연수 − 대분수: 자연수에서 1을 빼는 수의 분모에 맞춘 가분수로 바꾼다'), ('C', '가분수로 바꿔 빼기')],
  'stuck': ['4 − 1과 2/7 = 3과 2/7처럼 분수 부분을 그대로 가져옴'],
  'qs': [
   (1, 'A', '3과 4/5 − 1과 2/5를 계산하는 과정을 말해 봐.', '자연수끼리 2, 분수끼리 2/5 → 2와 2/5'),
   (1, 'B', '4 − 1과 2/7은 분수 부분이 없는데 어떻게 계산해?', '4를 3과 7/7로 바꿔 3과 7/7 − 1과 2/7 = 2와 5/7'),
   (2, 'C', '5 − 3과 2/5를 가분수로 바꾸어 계산하는 과정을 말해 봐.', '25/5 − 17/5 = 8/5 = 1과 3/5'),
   (1, 'B', '6 − 2와 3/8에서 6을 대분수로 바꿀 때 분모는 무엇에 맞춰?', '빼는 수의 분모 8에 맞춰 5와 8/8 → 3과 5/8'),
   (2, 'B', '친구가 4 − 1과 2/7 = 3과 2/7이라고 했어. 무엇이 틀렸어?', '2/7을 빼지 않고 오히려 붙였어요. 4를 3과 7/7로 바꿔야 해서 2와 5/7'),
   (3, '최상위 대표유형 4 · 🖼', '가에서 다까지 7과 2/9 km, 나에서 라까지 5와 4/9 km이고, 두 구간이 겹치는 나에서 다까지는 2와 1/9 km야. 가에서 라까지는 어떤 순서로 구해?', '두 거리를 더하면 겹친 부분을 두 번 센 거라서 한 번 빼 → 7과 2/9 + 5와 4/9 − 2와 1/9 = 10과 5/9 km', ['가~다와 나~라를 더하면 어느 부분이 두 번 들어가?', '두 번 들어간 부분은 어떻게 해야 해?'], 'dist'),
   (3, '발전 12', '2와 5/12시간 동안 운동하고 시계를 보니 오후 6시였어. 운동을 시작한 시각은 어떤 순서로 구해?', '6 − 2와 5/12 = 3과 7/12 → 7/12시간은 35분 → 오후 3시 35분', ['끝난 시각에서 운동한 시간을 빼면 무엇이 나와?', '6에서 2와 5/12를 빼려면 6을 어떻게 바꿔?', '7/12시간은 몇 분이야?'])]},
 {'no': '05', 'name': '분수의 뺄셈 (3) — 받아내림 있는 대분수', 'page': '15쪽',
  'core': [('A', '분수끼리 뺄 수 없으면 자연수에서 1을 가분수로 바꿔 받아내린다'), ('B', '가분수로 바꿔 빼기'), ('C', '받아내리면 분자에 분모만큼 더해진다')],
  'stuck': ['큰 분수에서 작은 분수를 거꾸로 뺌', '받아내린 뒤 자연수를 안 줄임'],
  'qs': [
   (1, 'A', '3과 1/4 − 1과 3/4에서 분수끼리 뺄 수 없어. 어떻게 해야 돼?', '3에서 1을 4/4로 바꿔 2와 5/4 → 2와 5/4 − 1과 3/4 = 1과 2/4'),
   (1, 'C', '3과 1/4에서 1을 받아내리면 분수 부분의 분자는 어떻게 바뀌어?', '4/4가 더해져서 1 + 4 = 5, 2와 5/4'),
   (1, 'B', '4와 2/6 − 1과 5/6을 가분수로 바꾸어 계산하는 과정을 말해 봐.', '26/6 − 11/6 = 15/6 = 2와 3/6'),
   (2, 'A', '친구가 5와 1/7 − 2와 4/7을 계산하면서 분수 부분을 4/7 − 1/7로 빼서 3과 3/7이라고 했어. 무엇이 틀렸어?', '빼는 순서를 거꾸로 했어요. 받아내려서 4와 8/7 − 2와 4/7 = 2와 4/7'),
   (2, 'A', '6과 2/9 − 3과 5/9는 받아내림이 필요해. 계산하기 전에 어떻게 알 수 있어?', '분수 부분 2/9가 5/9보다 작아서 분수끼리 뺄 수 없어요.'),
   (2, '단원 마무리', '분모가 같은 분수의 덧셈이나 뺄셈이 나오면 가장 먼저 무엇을 생각해야 해?', '분모는 그대로 두고 분자끼리 계산한다는 것. 대분수면 자연수끼리 계산하고, 분수끼리 뺄 수 없으면 받아내려요.'),
   (3, '최상위 대표유형 1', '어떤 수에서 1과 5/8을 빼야 할 것을 잘못하여 더했더니 4와 3/8이 되었어. 바르게 계산한 값은 어떤 순서로 구해?', '어떤 수 = 4와 3/8 − 1과 5/8 = 2와 6/8 (받아내림) → 바르게 2와 6/8 − 1과 5/8 = 1과 1/8', ['잘못 계산한 식을 먼저 써 봐. 어떤 수에 1과 5/8을 더했더니 4와 3/8이야. 어떤 수는?', '4와 3/8 − 1과 5/8에서 분수끼리 뺄 수 없어. 어떻게 해?', '이제 원래 하려던 계산은 뭐야?']),
   (3, '발전 9 · 대분수 만들기', '수 카드 3, 7, 4 중 2장을 골라 9 − □와 □/10의 차가 가장 크게 되는 뺄셈식을 만들려고 해. 어떤 순서로 생각해?', '차가 가장 크려면 빼는 수가 가장 작아야 해 → 가장 작은 대분수 3과 4/10 (자연수에 가장 작은 3, 분자에 그다음 4) → 9 − 3과 4/10 = 5와 6/10', ['9에서 뺀 결과가 가장 크려면 빼는 수가 어때야 해?', '분모가 10인 가장 작은 대분수를 만들려면 카드를 어디에 놓아?', '9 − 3과 4/10은 9를 어떻게 바꿔서 계산해?'])]},
 ],
 'ask': ['3회차 되묻기(💬) 순서가 적절한지 — 아이가 막힌 단계부터 하나씩 물어요',
         '새로 넣은 3회차 4개: 규칙 찾기(01) · 대분수 만들기(02·05) · 기호 약속(03)',
         '04-7 🖼 그림이 조건만 보여 주는지']}


DIST = """<div class="fig"><svg viewBox="0 0 560 130" width="420" xmlns="http://www.w3.org/2000/svg" font-family="Malgun Gothic,sans-serif">
<path d="M30 58 Q187 -18 345 58" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="5 4"/><text x="120" y="14" font-size="14" fill="#2563eb">7과 2/9 km</text>
<path d="M215 80 Q372 160 530 80" fill="none" stroke="#b45309" stroke-width="1.8" stroke-dasharray="5 4"/><text x="430" y="126" font-size="14" fill="#b45309">5와 4/9 km</text>
<line x1="30" y1="66" x2="530" y2="66" stroke="#374151" stroke-width="2"/>
<line x1="215" y1="66" x2="345" y2="66" stroke="#6d3fd0" stroke-width="5"/><text x="280" y="56" font-size="13" text-anchor="middle" fill="#6d3fd0">2와 1/9 km</text>
""" + ''.join('<circle cx="%d" cy="66" r="4.5" fill="#374151"/><text x="%d" y="%d" font-size="15" text-anchor="middle" fill="#374151">%s</text>' % (x, x + dx, 88, n) for x, dx, n in ((30, 0, '가'), (215, -12, '나'), (345, 12, '다'), (530, 0, '라'))) + """
</svg></div>"""

RN = {0: ('🌱 선수', 'pre'), 1: ('1회차', 'r1'), 2: ('2회차', 'r2'), 3: ('3회차', 'r3')}
CSS = '''
:root{--ink:#1f2937;--sub:#5b6270;--line:#d8dce3;--acc:#2f5fb3;--pre:#15803d;--r1:#2563eb;--r2:#6d3fd0;--r3:#b45309;--warn:#fff7ed}
@page{size:A4;margin:10mm 12mm 10mm}
*{box-sizing:border-box}
body{margin:0;color:var(--ink);font:9.4pt/1.4 "Pretendard","Malgun Gothic",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-size:17pt;margin:0 0 2px}.sub{color:var(--sub);font-size:9pt}
.box{border:1px solid var(--line);border-radius:8px;padding:9px 12px;margin:8px 0}
.idea{border-left:4px solid var(--acc)}
.sum{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
.chip{display:inline-block;font-size:8.6pt;padding:1px 8px;border-radius:99px;border:1px solid var(--line);white-space:nowrap}
.pre{color:var(--pre);border-color:var(--pre)}.r1{color:var(--r1);border-color:var(--r1)}.r2{color:var(--r2);border-color:var(--r2)}.r3{color:var(--r3);border-color:var(--r3)}
.unit{break-before:page}
.uh{display:flex;align-items:baseline;gap:8px;border-bottom:2px solid var(--ink);padding-bottom:3px;margin-bottom:6px}
.uh b{font-size:14pt}.uh span{color:var(--sub);font-size:9pt}
.core{margin:0;padding:0;list-style:none}.core li{margin:1px 0}.core b{color:var(--acc);display:inline-block;width:16px}
.stuck{background:var(--warn);border-radius:6px;padding:5px 10px;margin:6px 0;font-size:9.4pt}
.lines .ln{display:block;border-bottom:1px solid #c9a36b;height:16px}
.rh{font-weight:700;font-size:10pt;margin:6px 0 2px;padding-left:6px;border-left:4px solid}
.q{break-inside:avoid;padding:3px 0 4px;border-bottom:1px dashed var(--line)}
.qh{display:flex;gap:6px;align-items:baseline}
.qn{font-weight:700;min-width:16px}.qt{font-weight:600}
.tag{font-size:8.2pt;color:var(--sub);white-space:nowrap}
.ans{margin:2px 0 0 22px;font-size:9.4pt;color:#374151}.ans:before{content:"→ ";color:var(--sub)}
.chk{display:flex;align-items:flex-end;gap:10px;margin:4px 0 0 22px;font-size:8.8pt;color:var(--sub);white-space:nowrap}
.chk .ln{flex:1;border-bottom:1px solid #aab;height:12px}
ol.ask{margin:4px 0;padding-left:20px}
.hint{margin:2px 0 1px 22px;background:#f3f0ff;border-radius:6px;padding:2px 10px;font-size:8.6pt;line-height:1.35}.hint ol{margin:2px 0;padding-left:18px}
.fig{margin:4px 0 2px 22px;text-align:left}
'''

def render():
    u = UNIT; o = []; w = o.append
    cnt = {r: sum(1 for s in u['smalls'] for q in s['qs'] if q[0] == r) for r in RN}
    w('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>%s</title><style>%s</style></head><body>' % (e(u['title']), CSS))
    w('<h1>%s</h1><div class="sub">%s · 2026-09-30</div>' % (e(u['title']), e(u['src'])))
    w('<div class="sum">' + ''.join('<span class="chip %s">%s %d</span>' % (RN[r][1], RN[r][0], cnt[r]) for r in RN) + '<span class="chip">합계 %d</span></div>' % sum(cnt.values()))
    w('<div class="box idea"><b>단원 한 줄</b><br>%s<div class="sub" style="margin-top:4px">※ %s</div></div>' % (e(u['idea']), e(u['note'])))
    w('<div class="box"><b>회차 기준</b><br>1회차 = 교재 개념 쪽에 적힌 것 · 2회차 = 교재엔 없지만 개념 하나로 답 · 3회차 = 개념 둘 이상(디딤돌 발전 문제·최상위S) · 숫자는 교재와 다르게 새로 정하고 모두 검산</div>')
    w('<div class="box"><b>봐 주실 것</b><ol class="ask">' + ''.join('<li>%s</li>' % e(a) for a in u['ask']) + '</ol><div class="lines"><span class="ln"></span><span class="ln"></span><span class="ln"></span></div></div>')
    n = 0
    for s in u['smalls']:
        w('<section class="unit"><div class="uh"><b>%s. %s</b><span>교재 %s</span></div>' % (s['no'], e(s['name']), s['page']))
        w('<ul class="core">' + ''.join('<li><b>%s</b>%s</li>' % (k, e(t)) for k, t in s['core']) + '</ul>')
        w('<div class="stuck"><b>막히는 곳</b> · %s<div class="lines" style="margin-top:3px">실제 수업에서 본 것:<span class="ln"></span></div></div>' % e(' · '.join(s['stuck'])))
        for r in (0, 1, 2, 3):
            qs = [q for q in s['qs'] if q[0] == r]
            if not qs: continue
            w('<div class="rh %s" style="border-color:currentColor">%s</div>' % (RN[r][1], RN[r][0]))
            for q in qs:
                n += 1
                tag = ('핵심 ' + q[1]) if q[1][0] in 'ABC' else q[1]
                w('<div class="q"><div class="qh"><span class="qn">%d.</span><span class="qt">%s</span><span class="tag">〔%s〕</span></div>' % (n, e(q[2]), e(tag)))
                if len(q) > 5 and q[5] == 'dist': w(DIST)
                if len(q) > 4 and q[4]: w('<div class="hint"><b>💬 막히면 이 순서로 되묻기</b><ol>' + ''.join('<li>%s</li>' % e(h) for h in q[4]) + '</ol></div>')
                w('<div class="ans">%s</div><div class="chk">☐ 좋아요 ☐ 고침 ☐ 뺌<span class="ln"></span></div></div>' % e(q[3]))
        w('</section>')
    w('</body></html>')
    return ''.join(o)

if __name__ == '__main__':
    out = os.path.join(HERE, '설계_초4-2_1단원.html')
    io.open(out, 'w', encoding='utf-8').write(render())
    tmp = os.path.join(tempfile.gettempdir(), 'claude', 'sheet'); os.makedirs(tmp, exist_ok=True)
    shutil.copy(out, os.path.join(tmp, 'u.html'))
    chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    subprocess.run([chrome, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-data-dir=' + os.path.join(tmp, 'prof'),
                    '--print-to-pdf=' + os.path.join(tmp, 'u.pdf'), 'file:///' + os.path.join(tmp, 'u.html').replace('\\', '/')], check=True, timeout=120)
    shutil.copy(os.path.join(tmp, 'u.pdf'), os.path.join(HERE, '설계_초4-2_1단원.pdf'))
    print('ok', out)
