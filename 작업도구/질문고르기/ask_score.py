# -*- coding: utf-8 -*-
"""
🤔 표시(ask)가 마스터의 실제 수정을 얼마나 맞혔는지 재는 도구.

왜 필요한가
  2026-09-23 마스터 지시: "일일이 검수하는 게 비효율적이다."
  실측(검수 파일 비교) — 마스터가 읽은 질문 5개 중 4개는 아무것도 안 바뀌었다.
  그래서 Claude 가 "자신 없는 것"만 🤔 로 표시하고 마스터는 그것만 본다.
  이 도구는 그 표시가 쓸 만한지를 숫자로 답한다.

쓰는 법
  python -X utf8 ask_score.py <빈기기_내보내기.json> <마스터검수후_내보내기.json>

읽는 법
  적중률(recall) = 마스터가 실제로 바꾼 질문 중 🤔 표시가 있던 비율
     90% 이상  → 전수 검수를 그만두고 🤔 표시만 봐도 된다
     70~90%   → 표시를 늘리고 한 번 더 잰다
     70% 미만  → 지금처럼 전수 검수를 이어 간다
  헛 표시(precision) = 🤔 표시했는데 마스터가 손대지 않은 것.
     이건 낮아도 괜찮다 — 마스터가 "그대로 두자"고 답한 것도 판단을 받은 것이다.
"""
import json, sys, os


def load(path):
    d = json.load(open(path, encoding='utf-8'))
    return {it['id']: it for it in d.get('items', [])}, d.get('exportedAt', '')


def text(it):
    return it.get('newQ') or it.get('q') or ''


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    before, t0 = load(sys.argv[1])
    after,  t1 = load(sys.argv[2])
    print('이전  %s  (%d개)' % (os.path.basename(sys.argv[1]), len(before)))
    print('이후  %s  (%d개)  내보낸 시각 %s' % (os.path.basename(sys.argv[2]), len(after), t1))
    if t0 and t1 and t0 >= t1:
        print('⚠️  이후 파일이 더 오래됐어요. 파일 순서를 확인하세요.')

    changed, flagged, hit, miss, waste = [], [], [], [], []
    for qid, a in after.items():
        b = before.get(qid)
        ask = a.get('ask') or ''
        if ask:
            flagged.append(qid)
        if not b:
            continue                       # 마스터가 새로 추가한 질문은 세지 않는다
        diff = []
        if bool(a.get('off')) != bool(b.get('off')):
            diff.append('뺌' if a.get('off') else '되살림')
        if text(a) != text(b):
            diff.append('문장')
        if a.get('round') != b.get('round'):
            diff.append('회차')
        if (a.get('answer') or '') != (b.get('answer') or ''):
            diff.append('모범답')
        if diff:
            changed.append((qid, '·'.join(diff), a.get('small', ''), text(a)[:46]))
            (hit if ask else miss).append(qid)
        elif ask:
            waste.append(qid)

    n = len(changed)
    print()
    print('마스터가 실제로 바꾼 질문 : %d개' % n)
    print('🤔 표시한 질문            : %d개' % len(flagged))
    if n:
        print('  ├ 표시 안에 있었다(적중) : %d개  →  적중률 %.0f%%' % (len(hit), 100.0 * len(hit) / n))
        print('  └ 표시 밖이었다(놓침)    : %d개' % len(miss))
    print('표시했지만 그대로 둔 것    : %d개' % len(waste))

    if miss:
        print()
        print('── 놓친 것 (다음에 이런 걸 표시해야 한다) ' + '─' * 20)
        for qid in miss:
            a = after[qid]
            b = before[qid]
            d = [x for x in [
                ('뺌' if a.get('off') else '되살림') if bool(a.get('off')) != bool(b.get('off')) else '',
                '문장' if text(a) != text(b) else '',
                '회차 %s→%s' % (b.get('round'), a.get('round')) if a.get('round') != b.get('round') else '',
            ] if x]
            print('  [%-22s] %-26s %s' % (','.join(d), a.get('small', '')[:26], text(a)[:52]))
            if text(a) != text(b):
                print('      전: %s' % text(b)[:76])
                print('      후: %s' % text(a)[:76])
    print()
    if n and 100.0 * len(hit) / n >= 90:
        print('✅ 적중률 90% 이상 — 다음 학년부터는 🤔 표시만 보셔도 됩니다.')
    elif n:
        print('→ 아직 부족합니다. 놓친 것들의 공통점을 기준표에 더하고 표시를 늘린 뒤 한 번 더 재세요.')


if __name__ == '__main__':
    main()
