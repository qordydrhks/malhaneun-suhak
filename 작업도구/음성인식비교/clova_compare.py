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
BOOST = '엇각,맞꼭지각,동위각,합동,닮음,닮음비,무게중심,중선,판별식,인수분해,이등변삼각형,평행사변형,대변,밑각,꼭짓점,이차방정식,공통,평행,SAS,ASA,SSS,루트,통분,표준형,원주각,중심각,음수,이상,미만,제곱,선분'

# 문장 → 꼭 알아들어야 할 낱말(같은 뜻의 다른 적기를 | 로) — 띄어쓰기 없애고 소문자로 비교. app/stt-compare.html 의 묶음 1·2 와 같은 문장
_F = lambda a, b, ka, kb: f'{b}/{a}|{a}분의{b}|{ka}분의{kb}'   # 분수 b/a 를 적는 여러 모양
TERMS = {
    # 묶음 1 (한글 위주)
    '삼각형 ABD와 삼각형 ACD에서 AB와 AC가 같고 AD는 공통이니까 SAS 합동이야': ['삼각형', 'abd|에이비디', 'acd|에이씨디', 'ab|에이비', 'ac|에이씨', 'ad|에이디', '공통', 'sas|에스에이에스', '합동'],
    'AB와 DC가 평행하니까 엇각인 각 BAC와 각 DCA가 같아': ['ab|에이비', 'dc|디씨', '평행', '엇각', 'bac|비에이씨', 'dca|디씨에이'],
    '맞꼭지각은 크기가 같으니까 각 AFH와 각 BFE가 같아': ['맞꼭지각', '크기', 'afh|에이에프에이치', 'bfe|비에프이'],
    '무게중심은 중선을 꼭짓점으로부터 2 대 1로 나눠': ['무게중심', '중선', '꼭짓점', '2대1|이대일|2:1'],
    '이차방정식에서 판별식이 0보다 크면 서로 다른 두 근을 가져': ['이차방정식|2차방정식', '판별식', '0보다|영보다', '서로다른두근|서로다른2근'],
    'x 제곱 더하기 5x 더하기 6을 인수분해하면 x 더하기 2 곱하기 x 더하기 3이야': ['x제곱|엑스제곱|x²|x\\^2', '5x|오엑스', '6|육', '인수분해', 'x더하기2|엑스더하기이|x\\+2', 'x더하기3|엑스더하기삼|x\\+3'],
    '닮음비가 2 대 3이면 넓이의 비는 4 대 9야': ['닮음비', '2대3|이대삼|2:3', '넓이의비|넓이비', '4대9|사대구|4:9'],
    '이등변삼각형의 두 밑각의 크기는 같아': ['이등변삼각형', '밑각', '크기'],
    '평행사변형은 두 쌍의 대변의 길이가 각각 같아': ['평행사변형', '두쌍|2쌍', '대변', '각각'],
    '동위각이 같으면 두 직선은 평행해': ['동위각', '두직선|2직선', '평행'],
    # 묶음 2 (식·분수·문자·기호)
    '√2 × √8 = √16 이니까 4야': ['루트2|√2|root2', '곱하기|×|\\*|x', '루트8|√8|root8', '루트16|√16|root16', '4야|사야|=4|는4|4이'],
    '3/4 + 1/6을 통분하면 9/12 + 2/12니까 11/12야': [_F(4, 3, '사', '삼'), _F(6, 1, '육', '일'), '통분', _F(12, 9, '십이', '구'), _F(12, 2, '십이', '이'), _F(12, 11, '십이', '십일')],
    '선분 AB의 길이는 선분 CD의 길이의 2/3배야': ['선분ab|선분에이비', '선분cd|선분씨디', _F(3, 2, '삼', '이')],
    '∠ABC = 35°이면 ∠ACB는 180°에서 ∠A와 ∠B를 뺀 값이야': ['각abc|∠abc|각에이비씨', '35도|35°|삼십오도', '각acb|∠acb|각에이씨비', '180도|180°|백팔십도', '각a와|∠a와|각에이와', '각b를|∠b를|각비를'],
    '△ABC ∽ △DEF이고 닮음비가 3 : 5니까 넓이의 비는 9 : 25야': ['삼각형abc|△abc|삼각형에이비씨', '삼각형def|△def|삼각형디이에프', '닮음', '닮음비', '3대5|3:5|삼대오', '넓이의비|넓이비', '9대25|9:25|구대이십오'],
    'y = 2x² − 4x + 1을 표준형으로 바꾸면 y = 2(x − 1)² − 1이니까 꼭짓점은 (1, −1)이야': ['y는|y=|와이는', '2x제곱|2엑스제곱|2x²|이엑스제곱', '4x|사엑스', '표준형', 'x빼기1|x-1|x−1|엑스빼기일|엑스빼기1|x마이너스1|x마이너스일|엑스마이너스일', '꼭짓점', '마이너스1|-1|−1|마이너스일'],
    'x ≥ 3이고 y < −2이면 xy는 항상 음수야': ['x가|엑스가|x는|엑스는', '3이상|삼이상|≥3', 'y가|와이가|y는|와이는', '마이너스2|-2|−2|마이너스이', '미만|<', 'xy|엑스와이', '음수'],
    'AB ∥ CD이면 ∠BAE와 ∠AEC는 엇각이라서 같아': ['ab|에이비', 'cd|씨디', '평행|∥', 'bae|비에이이', 'aec|에이이씨', '엇각'],
    'a² − b²은 (a + b)(a − b)로 인수분해돼': ['a제곱|에이제곱|a²', 'b제곱|비제곱|b²', 'a더하기b|에이더하기비|a\\+b|a플러스b|에이플러스비', 'a빼기b|에이빼기비|a-b|a−b|a마이너스b|에이마이너스비', '인수분해'],
    '원주각 ∠APB는 중심각 ∠AOB의 1/2이야': ['원주각', 'apb|에이피비', '중심각', 'aob|에이오비', _F(2, 1, '이', '일')],
}

def norm(t): return re.sub(r'\s+', '', (t or '').lower())

def score(ref, text):
    n = norm(text); terms = TERMS.get(ref, [])
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
    src = sys.argv[1] if len(sys.argv) > 1 else max(glob.glob(os.path.expanduser('~/Downloads/음성인식비교*.json')) + glob.glob(os.path.expanduser('~/Desktop/**/음성인식비교*.json'), recursive=True), key=os.path.getmtime)
    data = json.load(open(src, encoding='utf-8')); url, secret = read_key()
    rows, tot = [], {'b': [0, 0], 'c': [0, 0], 'cb': [0, 0]}
    for it in data['items']:
        ri = it['ref']
        wav = base64.b64decode(it['wav'])
        c, cs = clova(url, secret, wav, False); cb, cbs = clova(url, secret, wav, True)
        r = {'ref': it['ref'], 'b': it['browser'], 'c': c, 'cb': cb, 'cs': cs, 'cbs': cbs, 'len': len(wav) / 32000}
        for k in ('b', 'c', 'cb'):
            h, n, miss = score(ri, r[k]); r[k + '_s'] = (h, n, miss); tot[k][0] += h; tot[k][1] += n
        rows.append(r); print(f"{len(rows)}. 앱 {r['b_s'][0]}/{r['b_s'][1]} · CLOVA {r['c_s'][0]} · CLOVA+낱말 {r['cb_s'][0]}  ({cs:.1f}s / {cbs:.1f}s)")
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
