# 숫자·분수·소수 바로 뒤 조사(가/이 · 는/은 · 를/을 · 와/과)가 읽는 소리 받침과 맞는지 점검
# 분수 a/b 는 "b분의 a" 로 읽으므로 분자 a 의 끝소리를 본다. 소수·자연수는 끝자리.
import re, sys, json, io
sys.stdout.reconfigure(encoding='utf-8')
BAT = {'0': True, '1': True, '2': False, '3': True, '4': False, '5': False, '6': True, '7': True, '8': True, '9': False}
def has_bat(num):
    num = num.replace(',', '')
    if '.' in num: return BAT[num[-1]]
    n = int(num)
    if n == 0: return True
    if n % 10: return BAT[str(n % 10)]
    if n % 100: return True      # 십
    if n % 1000: return True     # 백
    if n % 10000: return True    # 천
    return True                  # 만
PAIR = {'가': ('이', False), '이': ('가', True), '는': ('은', False), '은': ('는', True),
        '를': ('을', False), '을': ('를', True), '와': ('과', False), '과': ('와', True)}
RX = re.compile(r'(\d+(?:\.\d+)?)(?:/(\d+))?(가|이|는|은|를|을|와|과)(?![가-힣])|(\d+(?:\.\d+)?)(?:/(\d+))?(이|은|을|과)(?=[가-힣])')
def check(text):
    out = []
    for m in re.finditer(r'(\d[\d,]*(?:\.\d+)?)(/\d+)?(가|이|는|은|를|을|와|과)', text):
        num, frac, j = m.group(1), m.group(2), m.group(3)
        after = text[m.end():m.end() + 1]
        if re.match(r'[가-힣]', after): continue   # 뒤에 글자가 붙으면 조사가 아님(1가지·이상) 또는 서술격 '이고/이야' — 둘 다 건너뜀
        bat = has_bat(num)
        want = j if PAIR[j][1] == bat else PAIR[j][0]
        if want != j: out.append((m.group(0), num + (frac or '') + want))
    return out
if __name__ == '__main__':
    for path in sys.argv[1:]:
        s = io.open(path, encoding='utf-8').read()
        if path.endswith('.js'): s = s[s.index('data:') + 5: s.rindex('});')]
        d = json.loads(s)
        items = d['items'] if isinstance(d, dict) else [st for L in d for st in L['steps']]
        n = 0
        for it in items:
            for k in ('newQ', 'q', 'answer', 'teach', 'again'):
                v = it.get(k)
                if isinstance(v, str):
                    for bad, good in check(v): n += 1; print(path.split('\\')[-1][-22:], it.get('id', it.get('kind', '')), k, bad, '->', good, '|', v[:60])
            for kk in (it.get('keys') or []):
                for bad, good in check(kk): n += 1; print('  keys', bad, '->', good, kk)
        print(path[-24:], '의심', n)
