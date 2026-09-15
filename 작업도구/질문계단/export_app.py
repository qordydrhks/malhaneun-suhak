# -*- coding: utf-8 -*-
"""검토가 끝난 계단 JSON → 앱이 읽는 데이터 파일 (ladder/data-<학년>.js).
   python export_app.py m3-1 m3/ladder_M1.json m3/ladder_M2.json m3/ladder_M3.json
 · 채점 시험용 칸(half, wrong, wrongKind)은 빼고 학생 화면·채점·기록에 필요한 것만 넣는다.
 · 키 = "학년|대단원|소단원" (DD_CURRICULUM 이름 그대로)."""
import io, json, os, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
grade, files = sys.argv[1], sys.argv[2:]
KEEP = ('kind', 'q', 'ideas', 'teach', 'again', 'fig', 'src', 'miscon', 'record')
data = {}
FIGS = {}
_fp = os.path.join(HERE, 'm3', 'figs_m31.json')   # 칸 전용 그림 (없으면 카드 그림을 쓴다)
if os.path.exists(_fp): FIGS = json.load(io.open(_fp, encoding='utf-8'))
for f in files:
    for it in json.load(io.open(os.path.join(HERE, f), encoding='utf-8')):
        if it.get('summary'):
            continue
        assert it['grade'] == grade, it['grade']
        key = '%s|%s|%s' % (it['grade'], it['big'], it['small'])
        assert key not in data, key
        steps = []
        for i, st in enumerate(it['steps'], 1):
            d = {k: st[k] for k in KEEP if k in st}
            fig = FIGS.get('%s|%d' % (it['small'][:3], i))
            if fig: d['figScene'] = fig
            steps.append(d)
        data[key] = steps
os.makedirs(os.path.join(ROOT, 'ladder'), exist_ok=True)
out = os.path.join(ROOT, 'ladder', 'data-%s.js' % grade)
body = ('/* 질문 계단 데이터 — 작업도구/질문계단/export_app.py 로 만든 파일. 직접 고치지 말 것. */\n'
        'window.DL_LADDERS = Object.assign(window.DL_LADDERS || {}, ' + json.dumps(data, ensure_ascii=False) + ');\n')
io.open(out, 'w', encoding='utf-8', newline='\r\n').write(body)
print('소단원 %d · 칸 %d → %s' % (len(data), sum(len(v) for v in data.values()), out))
