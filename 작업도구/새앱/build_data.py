# -*- coding: utf-8 -*-
"""새 앱 데이터 만들기 — 초4-2 (2026-10-08)
   python -X utf8 작업도구/새앱/build_data.py  → app/data/e4-2.js
 원천(정본은 전부 설계 파일 — 이 결과 파일은 직접 고치지 말 것)
   질문      작업도구/질문설계/e42_1 · e42_23 · e42_456 (마스터 PDF 검토 끝)
   핵심·계단  app_e42_data.KEYS · LAD · G · PRE_FROM
   도움      help_e42_1~6.H (되묻기·다시 묻기·키워드·짧은/긴 설명, 마스터 10/8 "확인했어 그대로 진행")
   그림      e42_common.fig(질문) · help_figs_e42_N.lfig(긴 설명) · AFIG(다시 묻기 새 그림)
   소단원 번호 app/data/units_e4-2.json — 옛 앱 GRADES 의 unit id·label(옛 선생님 화면이 새 기록을 읽게)
"""
import io, json, os, re, sys, importlib
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
QD = os.path.join(ROOT, '작업도구', '질문설계')
sys.path.insert(0, QD); sys.path.insert(0, HERE)
import e42_1, e42_23, e42_456, e42_common as C, app_e42_data as D

G = 'e4-2'
UNITS = [e42_1.UNIT, e42_23.U2, e42_23.U3, e42_456.U4, e42_456.U5, e42_456.U6]
OLD = json.loads(io.open(os.path.join(ROOT, 'app', 'data', 'units_%s.json' % G), encoding='utf-8').read())
rt = io.open(os.path.join(ROOT, 'rounds', 'data-%s.js' % G), encoding='utf-8').read()
ROUNDS = json.loads(rt[rt.index('= {') + 2: rt.rindex('}') + 1])

def clean_svg(h, w=340):
    if not h: return ''
    m = re.search(r'<svg[\s\S]*</svg>', h)
    if not m: return ''
    s = re.sub(r'\swidth="[\d.]+"', '', m.group(0), count=1)
    s = re.sub(r'\sstyle="[^"]*"', '', s, count=1) if s.startswith('<svg style') else s
    return s.replace('<svg ', '<svg class="fig" style="max-width:100%%;width:%dpx;height:auto" ' % w, 1)

def qfig(key):
    if not key: return ''
    return clean_svg(e42_1.DIST if key == 'dist' else C.fig(key))

# 다시 묻기가 '같은 그림에서 이름·숫자만 바꿈'(fig='same')인데 새 그림이 없는 것 — 원래 그림의 글자만 바꿔 쓴다
SAME = {('2-02', 3): ('iso_apex', {'40°': '30°'}), ('2-02', 4): ('iso_base', {'65°': '55°'}),
        ('2-03', 3): ('compass_eq', {'ㄱ': 'ㅁ', 'ㄴ': 'ㅂ', 'ㄷ': 'ㅅ'}), ('4-01', 4): ('line_pt', {'가': '나', 'ㄱ': 'ㅁ'}),
        ('4-02', 3): ('short_seg', {'ㄱ': 'ㅁ', 'ㄴ': 'ㅂ', 'ㄷ': 'ㅅ', 'ㄹ': 'ㅇ'}), ('4-06', 5): ('rhom_diag2', {}), ('5-02', 2): ('lg_temp_mid', {})}
def same_fig(key, rep):
    h = C.fig(key)
    for x, y in rep.items(): h = h.replace('>%s</text>' % x, '>%s</text>' % y)
    return clean_svg(h)

CALC = re.compile(r'\d+(?:\.\d+)?(?:/\d+)?\s*[+−\-×÷]\s*\d|몇 cm|몇 °|몇 도|얼마|구해|구하는')
out = {'grade': G, 'code': 'E4-2', 'name': '4학년 2학기', 'oldName': OLD['name'], 'bigs': []}
n = {'q': 0, 'help': 0, 'lad': 0, 'fig': 0, 'lfig': 0, 'afig': 0, 'calc': 0}
missing = []
for ui, U in enumerate(UNITS, 1):
    H = D.apply_alt(importlib.import_module('help_e42_%d' % ui).H)   # 같은 뜻의 다른 말(마스터 10/14) — 다시 묻기 핵심에도
    LF = importlib.import_module('help_figs_e42_%d' % ui)
    AF = getattr(LF, 'AFIG', {})
    bigname = U['big'] if 'big' in U else None
    big = {'no': ui, 'code': 'E4-2-%d' % ui, 'smalls': []}
    for si, s in enumerate(U['smalls'], 1):
        tag = '%d-%s' % (ui, s['no'])
        old = [u for u in OLD['units'] if u['big'].startswith('%d.' % ui) and u['small'].startswith(s['no'] + '.')]
        assert len(old) == 1, (tag, old)
        old = old[0]
        if not big.get('title'): big['title'] = old['big'].split('. ', 1)[1]
        rkey = '%s|%s|%s' % (G, old['big'], old['small'])
        assert rkey in ROUNDS, rkey
        ritems = ROUNDS[rkey]['items']
        a = [q for q in s['qs'] if q[0] < 3]; b = [q for q in s['qs'] if q[0] == 3]
        assert len(a) == len(ritems) == len(H[tag]) == len(D.KEYS[tag]), (tag, len(a), len(ritems), len(H[tag]))
        items = []
        for i, q in enumerate(a):
            h = H[tag][i]; it0 = ritems[i]
            assert it0['q'] == q[2], (tag, i)
            ag = dict(h['again'])
            afn = AF.get((tag, i))
            if afn:
                ag['fig'] = clean_svg(afn()); n['afig'] += 1
            elif (tag, i) in SAME:
                ag['fig'] = same_fig(*SAME[(tag, i)]); n['afig'] += 1
            else:
                if ag.get('fig'): missing.append('%s #%d 다시 묻기 그림(%s) 없음' % (tag, i + 1, ag['fig']))
                ag['fig'] = ''
            lf = clean_svg(LF.lfig(tag, i), 360)
            if lf: n['lfig'] += 1
            calc = bool(CALC.search(q[2])) and q[0] > 0
            it = {'id': it0['id'], 'r': max(1, q[0]), 'pre': (D.PRE_FROM[tag] if q[0] == 0 else ''), 'q': q[2], 'ans': q[3],
                  'keys': D.KEYS[tag][i], 'fig': qfig(q[5] if len(q) > 5 else None), 'calc': calc,
                  'help': {'ask': h['ask'], 'again': ag, 'kw': h['kw'], 'short': h['short'], 'long': h['long'], 'lfig': lf, 'src': h.get('src', '')}}
            assert len(h['ask']) == len(it['keys']), (tag, i, '되묻기 수 ≠ 핵심 수')
            if it['fig']: n['fig'] += 1
            n['calc'] += calc; n['q'] += 1; n['help'] += 1
            items.append(it)
        steps = []
        for i, q in enumerate(b):
            L = D.LAD[tag][i]; g = D.G[tag][i]
            assert len(g) == len(q[4]), (tag, i)
            steps.append({'id': 'ladder:%s:%d' % (rkey, i + 1), 'q': q[2], 'src': q[1],
                          'ideas': [{'t': g[j], 'ask': q[4][j]} for j in range(len(g))],
                          'teach': ' '.join(L['ideas']), 'again': L['again'], 'record': L['record'], 'miscon': L['miscon'],
                          'fig': qfig(q[5] if len(q) > 5 else None)})
            n['lad'] += 1
        big['smalls'].append({'no': s['no'], 'code': 'E4-2-%d-%d' % (ui, si), 'title': old['small'].split('. ', 1)[1], 'page': s.get('page', ''),
                              'key': rkey, 'unitId': old['id'], 'unitLabel': old['label'], 'quiz': ROUNDS[rkey].get('quiz', {'1': 3, '2': 2}), 'items': items, 'ladder': steps})
    out['bigs'].append(big)

import blackhole_e42
blackhole_e42.build(out['bigs'])

# 통과 기준(질문마다 — 마스터 10/12) : 글자 일부로 정확히 한 질문만 걸려야 한다
import pass_e42
for sub, need in pass_e42.NEED:
    hit = [it for b_ in out['bigs'] for s_ in b_['smalls'] for it in s_['items'] if sub in it['q']]
    assert len(hit) == 1, ('통과 기준 질문을 하나로 못 찾음', sub, len(hit))
    it = hit[0]
    assert all(0 <= i < len(it['keys']) for g in need for i in g), sub
    it['need'] = need
    ag = it['help']['again']
    if ag.get('keys') and len(ag['keys']) == len(it['keys']): ag['need'] = need   # 다음 날 다시 묻기도 같은 모양이면 같은 기준
    n['need'] = n.get('need', 0) + 1

js = ('/* 새 앱 데이터 — 초4-2. 만들기: 작업도구/새앱/build_data.py (직접 고치지 말 것) */\n'
      'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA["%s"] = %s;\n' % (G, json.dumps(out, ensure_ascii=False)))
p = os.path.join(ROOT, 'app', 'data', '%s.js' % G)
io.open(p, 'w', encoding='utf-8', newline='\n').write(js)
print(n, '%.0f KB' % (len(js.encode('utf-8')) / 1024))
for m in missing: print('⚠', m)
