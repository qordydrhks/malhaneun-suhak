# -*- coding: utf-8 -*-
"""질문 계단 파일 기계 점검.  python check_ladder.py m3/ladder_M1.json m3/src_M1.json
모양 · 원천 대조 · 칸 수 · 앞 칸 의존 말 · 숫자 결과 통과 기준 의심 · 같은 질문 반복 의심을 본다.
여기서 깨끗해도 수학·말투는 사람이 전부 읽어야 한다."""
import io, json, re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

KINDS = {'뜻', '성질', '이유', '방법', '함정', '적용', '연결', '전략'}
DEP = re.compile(r'(방금|위에서|앞에서 말한|그럼 셋|아까|이전 질문)')

def main(lp, sp):
    L = json.load(io.open(lp, encoding='utf-8'))
    S = json.load(io.open(sp, encoding='utf-8'))
    src = {(r['grade'], r['big'], r['middle'], r['small']): r for r in S}
    bad = []
    seen = set()
    nsteps = 0
    for it in L:
        key = (it.get('grade'), it.get('big'), it.get('middle'), it.get('small'))
        if it.get('summary'):
            if not any(k[3] == it.get('attachTo') for k in src):
                bad.append('종합 계단의 attachTo 가 원천에 없음: %s' % (it.get('attachTo'),))
        elif key not in src:
            bad.append('원천에 없는 소단원: %s' % (it.get('small'),)); continue
        else:
            seen.add(key)
        steps = it.get('steps') or []
        nsteps += len(steps)
        if not 2 <= len(steps) <= 14:   # [2026-09-16 마스터] 칸 수를 미리 제한하지 않는다. 내용이 정한다
            bad.append('%s: 칸 수 %d' % (it['small'][:20], len(steps)))
        qs = []
        for i, s in enumerate(steps, 1):
            tag = '%s ⑴%d' % (it['small'][:14], i)
            for f in ('kind', 'q', 'ideas', 'teach', 'again', 'wrong', 'miscon', 'record'):
                if not s.get(f):
                    bad.append('%s: %s 없음' % (tag, f))
            if s.get('kind') not in KINDS:
                bad.append('%s: 이름표 %r' % (tag, s.get('kind')))
            ideas = s.get('ideas') or []
            if len(ideas) >= 2 and not s.get('half'):
                bad.append('%s: 아이디어가 2개 이상인데 절반 답 없음' % tag)
            if not 1 <= len(ideas) <= 3:
                bad.append('%s: 아이디어 %d개' % (tag, len(ideas)))
            for x in ideas:
                if not (isinstance(x, list) and len(x) == 2 and all(isinstance(y, str) and y.strip() for y in x)):
                    bad.append('%s: 아이디어 모양 %r' % (tag, x)); continue
                if re.fullmatch(r'\s*(답은\s*)?[-−]?\d+(\.\d+)?\s*(이다|야)?\s*', x[0]):
                    bad.append('%s: 숫자만 통과 기준? %r' % (tag, x[0]))
                if re.fullmatch(r'.*(할 수 있다|된다|그렇다|맞다)\.?', x[0]) and len(x[0]) < 14:
                    bad.append('%s: 예/아니요 아이디어? %r' % (tag, x[0]))
            if DEP.search(s.get('q', '')):
                bad.append('%s: 앞 칸 의존 말 %r' % (tag, DEP.search(s['q']).group(0)))
            q = re.sub(r'\s+', '', s.get('q', ''))
            for p in qs:
                a, b = set(q), set(p)
                if a and len(a & b) / len(a | b) > 0.85:
                    bad.append('%s: 옆 질문과 거의 같음' % tag)
            qs.append(q)
    miss = [k[3] for k in src if k not in seen]
    if miss:
        bad.append('빠진 소단원 %d: %s' % (len(miss), miss[:3]))
    print('소단원 %d / 원천 %d · 칸 %d' % (len(seen), len(src), nsteps))
    print('\n'.join(bad) if bad else '[OK] 기계 점검 통과')
    return 1 if bad else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1], sys.argv[2]))
