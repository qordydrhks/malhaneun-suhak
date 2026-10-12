# -*- coding: utf-8 -*-
"""help_e52_<n>.py 점검 — python -X utf8 check_help52.py 1  (check_help.py 를 초5-2 용으로)"""
import re, sys, importlib
import app_e52_data as D
n = sys.argv[1] if len(sys.argv) > 1 else '1'
H = importlib.import_module('help_e52_%s' % n).H
U = importlib.import_module('e52_%s' % n).U1 if n == '1' else None
STOP = set('그 그럼 이 수 있다 한다 것 두 한 는 은 이다 같다 이야 거야'.split())
def toks(s): return [t for t in re.findall(r'[가-힣A-Za-z0-9°①-⑨]+', s) if len(t) >= 2 and t not in STOP]
def nums(s): return set(re.findall(r'\d+(?:\.\d+)?(?:/\d+)?', s))
def sents(s): return [x for x in re.split(r'(?<=[.?!])\s+', s.strip()) if x]
bad = 0; total = 0
for s in U['smalls']:
    tag = '%s-%s' % (n, s['no']); qs = [q for q in s['qs'] if q[0] < 3]; hs = H.get(tag, [])
    if len(qs) != len(hs) or len(qs) != len(D.KEYS[tag]): print('개수 다름', tag, len(qs), len(hs), len(D.KEYS[tag])); bad += 1; continue
    for i, (q, h) in enumerate(zip(qs, hs)):
        total += 1; keys = D.KEYS[tag][i]; w = []
        if len(h['ask']) != len(keys): w.append('되묻기 수 %d≠핵심 %d' % (len(h['ask']), len(keys)))
        for k, a in zip(keys, h['ask']):
            hit = [t for t in toks(k) if t in a and not t.isdigit()]
            if hit: w.append('되묻기에 핵심 낱말 %s → "%s"' % (hit, a))
            if nums(k) & nums(a): w.append('되묻기에 답 숫자 → "%s"' % a)
        if len([x for x in sents(h['short']) if not re.search(r'학년.{0,9}배운', x)]) > 2: w.append('짧은 설명 %d문장' % len(sents(h['short'])))
        if nums(q[2]) and nums(q[2]) == nums(h['again']['q']): w.append('다시 묻기 숫자가 같음')
        if len(h['again']['keys']) != len(keys): w.append('다시 묻기 핵심 수 다름')
        ln = nums(h['long']) & nums(h['again']['q']) - {'0', '1', '10', '100', '1000'}
        if ln: w.append('긴 설명 숫자가 다시 묻기와 겹침 %s' % ln)
        if w: bad += 1; print('■', tag, i, q[2][:40]); [print('   -', x) for x in w]
    q3 = [q for q in s['qs'] if q[0] == 3]
    if len(q3) != len(D.LAD[tag]) or len(q3) != len(D.G[tag]): print('3회차 개수 다름', tag, len(q3), len(D.LAD[tag]), len(D.G[tag])); bad += 1
    for j, q in enumerate(q3):
        if not (len(q[4]) == len(D.LAD[tag][j]['ideas']) == len(D.G[tag][j])):
            print('3회차 되묻기·아이디어 수 다름', tag, j, len(q[4]), len(D.LAD[tag][j]['ideas']), len(D.G[tag][j])); bad += 1
        if any(re.search(r'\d', g) for g in D.G[tag][j]): print('G 에 숫자', tag, j)
print('질문 %d개 · 걸린 것 %d개' % (total, bad))
