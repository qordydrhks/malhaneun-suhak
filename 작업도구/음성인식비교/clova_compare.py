# -*- coding: utf-8 -*-
"""음성 인식 비교 (마스터 10/23) — 같은 녹음을 ① 지금 앱(브라우저 음성 인식) ② 네이버 CLOVA Speech(낱말 부스팅 없음/있음)로.

쓰는 법
  1) app/stt-compare.html 에서 녹음 → 「결과 내려받기」 (음성인식비교_….json 이 내려받기 폴더에)
  2) 이 폴더의 clova_key.txt 에 CLOVA 도메인의 INVOKE_URL 과 SECRET 을 마스터가 적는다(저장소에 안 올라감)
  3) python -X utf8 작업도구/음성인식비교/clova_compare.py [json 경로]   (경로를 빼면 내려받기 폴더의 가장 새 파일)
  → 같은 폴더에 비교결과_….html (문장마다 세 결과 · 꼭 들어가야 할 낱말을 몇 개 맞혔나)

CLOVA 무료(Free 플랜)는 한 달 20분 · 한 번에 15초 단위로 올림 → 10문장 × 2번 ≈ 5분.
"""
import base64, glob, html, json, os, re, sys, time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
BOOST = '엇각,맞꼭지각,동위각,합동,닮음,닮음비,무게중심,중선,판별식,인수분해,이등변삼각형,평행사변형,대변,밑각,꼭짓점,이차방정식,공통,평행,SAS,ASA,SSS'

REFS = [   # app/stt-compare.html 의 문장과 같은 차례
    '삼각형 ABD와 삼각형 ACD에서 AB와 AC가 같고 AD는 공통이니까 SAS 합동이야', 'AB와 DC가 평행하니까 엇각인 각 BAC와 각 DCA가 같아',
    '맞꼭지각은 크기가 같으니까 각 AFH와 각 BFE가 같아', '무게중심은 중선을 꼭짓점으로부터 2 대 1로 나눠', '이차방정식에서 판별식이 0보다 크면 서로 다른 두 근을 가져',
    'x 제곱 더하기 5x 더하기 6을 인수분해하면 x 더하기 2 곱하기 x 더하기 3이야', '닮음비가 2 대 3이면 넓이의 비는 4 대 9야', '이등변삼각형의 두 밑각의 크기는 같아',
    '평행사변형은 두 쌍의 대변의 길이가 각각 같아', '동위각이 같으면 두 직선은 평행해']

# 문장마다 꼭 알아들어야 할 낱말(같은 뜻의 다른 적기 포함) — 띄어쓰기 없애고 소문자로 비교
TERMS = [
    ['삼각형', 'abd|에이비디', 'acd|에이씨디', 'ab|에이비', 'ac|에이씨', 'ad|에이디', '공통', 'sas|에스에이에스', '합동'],
    ['ab|에이비', 'dc|디씨', '평행', '엇각', 'bac|비에이씨', 'dca|디씨에이'],
    ['맞꼭지각', '크기', 'afh|에이에프에이치', 'bfe|비에프이'],
    ['무게중심', '중선', '꼭짓점', '2대1|이대일|2:1'],
    ['이차방정식', '판별식', '0보다|영보다', '서로다른두근|서로다른2근'],
    ['x제곱|엑스제곱|x²|x\\^2', '5x|오엑스', '6|육', '인수분해', 'x더하기2|엑스더하기이|x\\+2', 'x더하기3|엑스더하기삼|x\\+3'],
    ['닮음비', '2대3|이대삼|2:3', '넓이의비|넓이비', '4대9|사대구|4:9'],
    ['이등변삼각형', '밑각', '크기'],
    ['평행사변형', '두쌍|2쌍', '대변', '각각'],
    ['동위각', '두직선|2직선', '평행'],
]

def norm(t): return re.sub(r'\s+', '', (t or '').lower())

def score(ref_i, text):
    n = norm(text); terms = TERMS[ref_i] if ref_i < len(TERMS) else []
    hit = [bool(re.search(t, n)) for t in terms]
    return sum(hit), len(terms), [t.split('|')[0] for t, h in zip(terms, hit) if not h]

def read_key():
    p = os.path.join(HERE, 'clova_key.txt'); kv = {}
    for line in open(p, encoding='utf-8'):
        if '=' in line and not line.strip().startswith('#'): k, v = line.split('=', 1); kv[k.strip()] = v.strip()
    if not kv.get('INVOKE_URL') or not kv.get('SECRET'): sys.exit('clova_key.txt 에 INVOKE_URL 과 SECRET 을 적어 주세요.')
    return kv['INVOKE_URL'].rstrip('/'), kv['SECRET']

def clova(url, secret, wav, boost):
    params = {'language': 'ko-KR', 'completion': 'sync', 'fullText': True, 'wordAlignment': False, 'diarization': {'enable': False}}
    if boost: params['boostings'] = [{'words': BOOST}]
    t0 = time.time()
    r = requests.post(url + '/recognizer/upload', headers={'X-CLOVASPEECH-API-KEY': secret},
                      files={'media': ('a.wav', wav, 'audio/wav'), 'params': (None, json.dumps(params, ensure_ascii=False), 'application/json')}, timeout=120)
    sec = time.time() - t0
    if r.status_code != 200: return f'(오류 {r.status_code}: {r.text[:200]})', sec
    return (r.json().get('text') or '').strip(), sec

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else max(glob.glob(os.path.expanduser('~/Downloads/음성인식비교_*.json')), key=os.path.getmtime)
    data = json.load(open(src, encoding='utf-8')); url, secret = read_key()
    rows, tot = [], {'b': [0, 0], 'c': [0, 0], 'cb': [0, 0]}
    for it in data['items']:
        ri = REFS.index(it['ref']) if it['ref'] in REFS else 0
        wav = base64.b64decode(it['wav'])
        c, cs = clova(url, secret, wav, False); cb, cbs = clova(url, secret, wav, True)
        r = {'ref': it['ref'], 'b': it['browser'], 'c': c, 'cb': cb, 'cs': cs, 'cbs': cbs, 'len': len(wav) / 32000}
        for k in ('b', 'c', 'cb'):
            h, n, miss = score(ri, r[k]); r[k + '_s'] = (h, n, miss); tot[k][0] += h; tot[k][1] += n
        rows.append(r); print(f"{ri + 1}. 앱 {r['b_s'][0]}/{r['b_s'][1]} · CLOVA {r['c_s'][0]} · CLOVA+낱말 {r['cb_s'][0]}  ({cs:.1f}s / {cbs:.1f}s)")
    pct = lambda k: f"{tot[k][0]}/{tot[k][1]} ({100 * tot[k][0] / max(1, tot[k][1]):.0f}%)"
    cell = lambda t, s: f"<td>{html.escape(t or '(못 알아들음)')}<br><small>꼭 들어갈 낱말 {s[0]}/{s[1]}{' · 빠짐: ' + html.escape(', '.join(s[2])) if s[2] else ''}</small></td>"
    body = ''.join(f"<tr><td><b>{html.escape(r['ref'])}</b><br><small>{r['len']:.1f}초 녹음</small></td>{cell(r['b'], r['b_s'])}{cell(r['c'], r['c_s'])}{cell(r['cb'], r['cb_s'])}</tr>" for r in rows)
    out = os.path.join(HERE, '비교결과_' + time.strftime('%m%d_%H%M') + '.html')
    open(out, 'w', encoding='utf-8').write(f"""<!doctype html><meta charset="utf-8"><title>음성 인식 비교</title>
<style>body{{font-family:'Malgun Gothic',sans-serif;margin:24px;color:#1c2230}}table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #ddd;padding:8px;vertical-align:top;font-size:14px}}th{{background:#f3f5f8}}small{{color:#666}}</style>
<h2>음성 인식 비교 — 같은 녹음 {len(rows)}문장</h2><p>꼭 들어가야 할 낱말을 맞힌 수: <b>지금 앱 {pct('b')}</b> · <b>CLOVA {pct('c')}</b> · <b>CLOVA + 수학 낱말 알려 줌 {pct('cb')}</b><br>
<small>녹음 기기: {html.escape(data.get('ua', ''))} · 원본 {html.escape(os.path.basename(src))}</small></p>
<table><tr><th>읽은 문장</th><th>지금 앱(브라우저)</th><th>CLOVA</th><th>CLOVA + 수학 낱말</th></tr>{body}</table>""")
    print('\n지금 앱', pct('b'), '· CLOVA', pct('c'), '· CLOVA+낱말', pct('cb')); print(out)

if __name__ == '__main__': main()
