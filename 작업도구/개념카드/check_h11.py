# -*- coding: utf-8 -*-
"""고1-1 개념카드 기계 점검 (카드 + 말하기 질문 low/high 까지)"""
import json, io, os, re, collections

SP = os.path.dirname(os.path.abspath(__file__))
CH = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"]
BS = chr(92)
BAD_UNI = "½⅓¼⅔¾⁰¹⁴⁵⁶⁷⁸⁹ⁿ⁻ᵃᵇ"

# 지시어가 붙은 그림 참조 -> 카드 어디에 있어도 안 된다
FIG_DEMO = ["아래 그림", "다음 그림", "위 그림", "그림과 같", "그림을 보",
            "아래 그래프", "다음 그래프", "위 그래프", "아래 표", "다음 표", "위 표",
            "아래 도형", "다음 도형", "다음 수형도", "아래 수형도", "다음 행렬에서", "아래 행렬"]
# 일반 표현 -> 문제·보기·해설에 있으면 안 된다
FIG_GEN = ["그림에서", "그래프에서", "표에서", "수형도에서"]

# 공통수학1 밖(공통수학2 또는 그 이후 과정)
BAD_TERM = ["유리함수", "무리함수", "합성함수", "역함수", "점근선", "내분점", "외분점",
            "드모르간", "여집합", "부분집합", "필요충분", "대우", "귀류법",
            "삼각함수", "라디안", "지수함수", "로그", "수열", "등차", "등비",
            "미분", "적분", "극한", "확률", "벡터", "표준편차"]

src = {}
for c in CH:
    f = os.path.join(SP, "src_%s.json" % c)
    for x in json.load(io.open(f, encoding="utf-8"))["concepts"]:
        src[x["id"]] = x

cards, missing = {}, []
for c in CH:
    f = os.path.join(SP, "cards_%s.json" % c)
    if not os.path.exists(f):
        missing.append(c)
        continue
    for card in json.load(io.open(f, encoding="utf-8")):
        card["_c"] = c
        if card["id"] in cards:
            print("[중복id] %d (%s, %s)" % (card["id"], cards[card["id"]]["_c"], c))
        cards[card["id"]] = card
if missing:
    print("!! 아직 없는 조각:", missing)
miss = [i for i in range(1, 92) if i not in cards]
if miss:
    print("!! 빠진 id:", miss)

err, warn = [], []
E = lambda i, m: err.append("Q%03d %s" % (i, m))
W = lambda i, m: warn.append("Q%03d %s" % (i, m))
MARK = "①②③"

for i in sorted(cards):
    c, s = cards[i], src[i]
    if c.get("small") != s["small"]:
        E(i, "small 불일치\n     받은것: %s\n     맞는것: %s" % (c.get("small"), s["small"]))

    for key in ("low", "high"):
        v = c.get(key) or []
        if len(v) != 3:
            E(i, "%s %d개 (3개여야 함)" % (key, len(v)))
        for k, q in enumerate(v):
            if k < 3 and not str(q).startswith(MARK[k]):
                E(i, "%s[%d] 앞에 %s 기호 없음: %s" % (key, k, MARK[k], str(q)[:28]))
    lows, highs = c.get("low") or [], c.get("high") or []
    for a in lows:
        for b in highs:
            ta = set(re.findall(r"[가-힣A-Za-z0-9]+", str(a)))
            tb = set(re.findall(r"[가-힣A-Za-z0-9]+", str(b)))
            if ta and tb and len(ta & tb) / float(len(ta | tb)) >= 0.8:
                W(i, "low와 high가 거의 같음: %s" % str(a)[:34])

    h = c.get("hints") or []
    if len(h) != 2:
        E(i, "hints %d개 (2개)" % len(h))
    kp = c.get("keyPoints") or []
    if not (1 <= len(kp) <= 3):
        E(i, "keyPoints %d개 (1~3개)" % len(kp))
    for k in kp:
        if not str(k).rstrip().rstrip(".").endswith("다"):
            W(i, "keyPoint가 '다'로 안 끝남: %s" % k)
        if str(k).rstrip().endswith("."):
            W(i, "keyPoint 끝 마침표(삽입 때 자동으로 뗌)")

    bp = c.get("basicProblem") or {}
    ch = bp.get("choices") or []
    if len(ch) != 4:
        E(i, "보기 %d개 (4개)" % len(ch))
    if len(set(map(str, ch))) != len(ch):
        E(i, "보기 중복")
    a = bp.get("answer")
    if not isinstance(a, int) or not (0 <= a <= 3):
        E(i, "answer=%r (0~3 정수)" % (a,))
    if not str(bp.get("stem", "")).strip():
        E(i, "문제 지문 없음")
    if not str(bp.get("explain", "")).strip():
        E(i, "해설 없음")

    bpg = str(c.get("bookPage", ""))
    m = re.match(r"^숨마쿰라우데 공통수학1 · (\d+)쪽$", bpg)
    if not m:
        E(i, "bookPage 형식 이상: %r" % bpg)
    elif not (16 <= int(m.group(1)) <= 432):
        E(i, "bookPage 쪽번호 범위 밖: %s" % bpg)
    if "figNeeded" not in c:
        W(i, "figNeeded 없음")

    blob = " ".join([str(c.get("concept", "")), " ".join(map(str, h)), " ".join(map(str, kp)),
                     " ".join(map(str, lows)), " ".join(map(str, highs)),
                     str(bp.get("stem", "")), " ".join(map(str, ch)), str(bp.get("explain", ""))])
    qblob = " ".join([str(bp.get("stem", "")), " ".join(map(str, ch)), str(bp.get("explain", ""))])
    if BS in blob:
        E(i, "역슬래시 있음")
    for u in BAD_UNI:
        if u in blob:
            E(i, "금지 유니코드 %r" % u)
    if "너가" in blob:
        E(i, "'너가' → '네가'")
    if "**" in blob or "$" in blob:
        E(i, "마크다운/달러 있음")
    if re.search(r"\d\s*\*\s*\d", blob):
        E(i, "곱셈에 * 사용")
    for w in FIG_DEMO:
        for m2 in re.finditer(re.escape(w), blob):
            if blob[max(0, m2.start() - 2):m2.start()] == "그 ":
                continue
            E(i, "그림 의존 표현: '%s'" % w)
    for w in FIG_GEN:
        if w in qblob:
            E(i, "문제가 그림을 봐야 함: '%s'" % w)
        elif w in blob:
            W(i, "설명에 '%s' — 방법 설명이면 괜찮다(눈으로 확인)" % w)
    for t in BAD_TERM:
        if t in blob:
            W(i, "공통수학1 밖 용어 의심 '%s'" % t)
    # 힌트가 핵심포인트를 그대로 말하는지
    for hint in h:
        for k in kp:
            core = re.sub(r"다$", "", str(k)).strip()
            if len(core) >= 10 and core in str(hint):
                W(i, "힌트가 핵심포인트를 그대로 말함: %s" % core[:30])

names = [cards[i].get("small") for i in sorted(cards)]
dup = [n for n, v in collections.Counter(names).items() if v > 1]
if dup:
    print("!! 소단원 이름 중복:", dup)

dist = collections.Counter((cards[i].get("basicProblem") or {}).get("answer") for i in cards)
figs = [i for i in sorted(cards) if cards[i].get("figNeeded")]
print("\n=== 정답 번호 분포 ===", dict(sorted(dist.items(), key=lambda x: str(x[0]))))
print("=== 그림 필요 표시 %d개 ===" % len(figs), figs)
print("\n=== 오류 %d건 ===" % len(err))
for e in err:
    print("  " + e)
print("\n=== 확인 필요 %d건 ===" % len(warn))
for w in warn:
    print("  " + w)
print("\n카드 %d / 91개" % len(cards))
