# -*- coding: utf-8 -*-
"""scenes_*.json 자체 점검.  사용법:  python check_scenes.py scenes_m3-1.json
앱의 DD_FIG_KEYS / ddFigCheck 와 같은 규칙을 파이썬으로 옮긴 것.
여기서 깨끗해야 앱에 넣는다 (앱에서 한 번 더 진짜로 그려서 검사한다)."""
import json, io, sys, re
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

KEYS = {
 'axes': ['xMin','xMax','yMin','yMax','scale','yScale','ox','oy','step','yStep','grid','ticks','origin'],
 'derive': ['name','type','point','over','a','b','t','center','r','through','deg','fn','x'],
 'shapes': ['points','close','style','fill','stroke','strokeWidth'],
 'angles': ['at','to','r','color','opacity','stroke','label','deg','labelOffset','textColor'],
 'rightAngles': ['at','to','size','stroke'],
 'parallelMarks': ['points','count','stroke'],
 'labels': ['point','at','text','dx','dy','color','dot','dotColor'],
 'curves': ['fn','color','from','to','fill','fillColor','style','width','label','labelAt','dx','dy'],
 'lines': ['x','y','through','color','width','style','label','dx','dy'],
 'circles': ['center','r','through','color','fill','fillOpacity','width','style'],
 'arcs': ['center','from','to','r','ccw','color','width','style','label'],
 'tickMarks': ['points','count','color'],
 'numberLine': ['min','max','step','points','ranges'],
}
NL_KEYS = {'points': ['x','label','open','color'], 'ranges': ['from','to','fromOpen','toOpen','color']}
TOP = set(list(KEYS.keys()) + ['title','caption','points'])
DERIVE_TYPES = {'reflect','mid','along','onCircle','onCurve','intersect','foot'}
FN_OK = re.compile(r'^[0-9xX+\-*/^(). ,a-z]*$')
FN_WORDS = re.compile(r'[a-wyzA-WYZ]+')
ALLOWED_FN_WORDS = {'sqrt','abs','sin','cos','tan','log','ln','exp','pi','x'}


def check_scene(sc, where, errs):
    if not isinstance(sc, dict):
        errs.append(where + ': scene 이 객체가 아님'); return
    for k in sc:
        if k not in TOP:
            errs.append('%s: 맨 위에 모르는 칸 "%s"' % (where, k))

    # 칸 이름 화이트리스트
    for sec, allowed in KEYS.items():
        v = sc.get(sec)
        if v is None: continue
        items = v if isinstance(v, list) else [v]
        for it in items:
            if not isinstance(it, dict): continue
            for k in it:
                if k not in allowed:
                    errs.append('%s: %s 에 모르는 칸 "%s" (허용: %s)' % (where, sec, k, ' '.join(allowed)))
    nl = sc.get('numberLine')
    if isinstance(nl, dict):
        for sub, allowed in NL_KEYS.items():
            for it in (nl.get(sub) or []):
                if isinstance(it, dict):
                    for k in it:
                        if k not in allowed:
                            errs.append('%s: numberLine.%s 에 모르는 칸 "%s"' % (where, sub, k))
        if not (isinstance(nl.get('min'), (int, float)) and isinstance(nl.get('max'), (int, float))):
            errs.append(where + ': numberLine 에 min/max 숫자가 필요')
        elif nl['max'] <= nl['min']:
            errs.append(where + ': numberLine 범위가 뒤집힘')
        for other in ('axes','points','shapes','curves','circles'):
            if sc.get(other): errs.append('%s: numberLine 과 %s 를 같이 쓰면 %s 는 무시됨' % (where, other, other))
        return  # 수직선은 여기서 끝

    # 그릴 것이 있나
    if not sc.get('axes') and not sc.get('points') and not sc.get('circles'):
        errs.append(where + ': 그릴 것이 없음 (axes·points·circles 중 하나는 필요)')

    ax = sc.get('axes')
    if ax is not None:
        for k in ('xMin','xMax','yMin','yMax'):
            if not isinstance(ax.get(k), (int, float)):
                errs.append('%s: axes.%s 가 숫자가 아님' % (where, k))
        if isinstance(ax.get('xMin'), (int,float)) and isinstance(ax.get('xMax'), (int,float)) and ax['xMax'] <= ax['xMin']:
            errs.append(where + ': axes 가로 범위가 뒤집힘')
        if isinstance(ax.get('yMin'), (int,float)) and isinstance(ax.get('yMax'), (int,float)) and ax['yMax'] <= ax['yMin']:
            errs.append(where + ': axes 세로 범위가 뒤집힘')

    # 점 이름
    names = set((sc.get('points') or {}).keys())
    for d in (sc.get('derive') or []):
        if isinstance(d, dict):
            if d.get('name'): names.add(d['name'])
            if d.get('type') not in DERIVE_TYPES:
                errs.append('%s: derive.type "%s" 는 없는 종류 (%s)' % (where, d.get('type'), ' '.join(sorted(DERIVE_TYPES))))

    for k, v in (sc.get('points') or {}).items():
        if not (isinstance(v, list) and len(v) == 2 and all(isinstance(n, (int, float)) for n in v)):
            errs.append('%s: points["%s"] 가 [x, y] 숫자쌍이 아님' % (where, k))
            continue
        if ax:
            if not (ax.get('xMin', 0) <= v[0] <= ax.get('xMax', 0) and ax.get('yMin', 0) <= v[1] <= ax.get('yMax', 0)):
                errs.append('%s: 점 %s%s 가 axes 범위 밖' % (where, k, v))
        else:
            if not (0 <= v[0] <= 560 and 0 <= v[1] <= 420):
                errs.append('%s: 점 %s%s 가 화면(가로 40~500, 세로 40~380) 밖' % (where, k, v))

    def ref(r, what):
        if isinstance(r, list): return
        if r not in names: errs.append('%s: %s 가 없는 점 "%s" 를 가리킴' % (where, what, r))

    for sh in (sc.get('shapes') or []):
        pts = sh.get('points') if isinstance(sh, dict) else None
        if not isinstance(pts, list) or len(pts) < 2:
            errs.append(where + ': shapes 에 점이 2개보다 적음')
        else:
            for r in pts: ref(r, 'shapes')
    for a in (sc.get('angles') or []) + (sc.get('rightAngles') or []):
        if not isinstance(a, dict) or a.get('at') is None or not isinstance(a.get('to'), list) or len(a['to']) < 2:
            errs.append(where + ': 각에 at 또는 to 두 점이 없음')
        else:
            ref(a['at'], '각'); [ref(r, '각') for r in a['to']]
    for c in (sc.get('circles') or []):
        if not isinstance(c, dict) or (c.get('r') is None and c.get('through') is None):
            errs.append(where + ': circles 에 r 도 through 도 없음')
        elif c.get('center') is None:
            errs.append(where + ': circles 에 center 가 없음')
        else:
            ref(c['center'], 'circles')
    for l in (sc.get('lines') or []):
        if not isinstance(l, dict) or (l.get('x') is None and l.get('y') is None and not l.get('through')):
            errs.append(where + ': lines 에 x·y·through 가 없음 (식은 curves 의 fn 으로!)')
        elif l.get('through'):
            for r in l['through']: ref(r, 'lines.through')
    for lb in (sc.get('labels') or []):
        if not isinstance(lb, dict) or (lb.get('point') is None and not isinstance(lb.get('at'), list)):
            errs.append(where + ': labels 에 point 도 at 도 없음')
        elif lb.get('point') is not None:
            ref(lb['point'], 'labels')
    for cv in (sc.get('curves') or []):
        if not isinstance(cv, dict) or cv.get('fn') is None:
            errs.append(where + ': curves 에 fn 이 없음'); continue
        if not sc.get('axes'):
            errs.append(where + ': curves 는 axes(좌표평면)가 있어야 그려짐')
        bad = [w for w in FN_WORDS.findall(str(cv['fn'])) if w not in ALLOWED_FN_WORDS]
        if bad:
            errs.append('%s: curves.fn 에 모르는 말 %s (쓸 수 있는 것: %s)' % (where, bad, ' '.join(sorted(ALLOWED_FN_WORDS))))
    for tm in (sc.get('tickMarks') or []) + (sc.get('parallelMarks') or []):
        p = tm.get('points') if isinstance(tm, dict) else None
        if not isinstance(p, list) or len(p) < 2:
            errs.append(where + ': tickMarks/parallelMarks 에 점 2개가 필요')
        else:
            for r in p: ref(r, 'tickMarks')
    if not sc.get('caption'):
        errs.append(where + ': caption 이 없음 (개념카드 그림은 설명을 꼭 넣을 것)')


def main(path):
    rows = json.load(io.open(path, encoding='utf-8'))
    if not isinstance(rows, list):
        print('[NG] 파일이 배열이 아님'); return 1
    errs, made, skipped = [], 0, 0
    seen = set()
    for i, r in enumerate(rows):
        where = '[%d] %s' % (i, (r.get('small') or '?')[:40])
        for k in ('grade', 'big', 'small'):
            if not r.get(k): errs.append(where + ': ' + k + ' 가 없음')
        key = (r.get('grade'), r.get('big'), r.get('small'))
        if key in seen: errs.append(where + ': 같은 개념이 두 번 나옴')
        seen.add(key)
        if r.get('skip'):
            skipped += 1; continue
        if 'scene' not in r:
            errs.append(where + ': scene 도 skip 도 없음'); continue
        made += 1
        check_scene(r['scene'], where, errs)
    print('개념 %d개 = 그림 %d + 건너뜀 %d' % (len(rows), made, skipped))
    if errs:
        print('[NG] 문제 %d건' % len(errs))
        for e in errs: print('  -', e)
        return 1
    print('[OK] 점검 통과')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else 'scenes.json'))
