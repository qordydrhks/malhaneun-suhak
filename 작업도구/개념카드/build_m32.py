# 중3-2 블록 만들기 + dodream.html 삽입
#   python build_m32.py            -> 미리보기만
#   python build_m32.py --apply    -> 실제 삽입
import json, io, os, re, sys

SC = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\qordy\Documents\GitHub\malhaneun-suhak"
HTML = os.path.join(REPO, "dodream.html")
APPLY = "--apply" in sys.argv
NEWVER = "v78.2-중3-2학기"
BASE_ID = 9800000

# 대단원 이름은 번호식. 로마숫자를 쓰면 편집기 ceNum()이 못 읽는다.
STRUCT = [
    ("1. 삼각비", [("1. 삼각비", 1, 15), ("2. 삼각비의 활용", 16, 23)]),
    ("2. 원의 성질", [("1. 원과 직선", 24, 33), ("2. 원주각", 34, 43)]),
    ("3. 통계", [("1. 대푯값", 44, 49), ("2. 산포도와 상관관계", 50, 61)]),
]

legacy = json.load(io.open(os.path.join(SC, "legacy_m3-2.json"), encoding="utf-8"))
by_id = {e["id"]: e for e in legacy}

cards = {}
for c in ["B1", "B2", "B3", "B4", "B5", "B6"]:
    f = os.path.join(SC, "cards_%s.json" % c)
    if not os.path.exists(f):
        sys.exit("!! 없는 조각: " + c)
    for card in json.load(io.open(f, encoding="utf-8")):
        cards[card["id"]] = card
assert sorted(cards) == list(range(1, 62)), "카드 61개가 아니다: %d" % len(cards)

# 소단원 이름은 에이전트 말을 믿지 않고 옛 label에서 직접 만든다
_ren = 0
for i, c in cards.items():
    want = "%02d. %s" % (i, by_id[i]["label"].split(" · ", 1)[1])
    if c.get("small") != want:
        print("  소단원 이름 교정 Q%03d: %r -> %r" % (i, c.get("small"), want))
        c["small"], _ren = want, _ren + 1
print("소단원 이름 교정: %d건" % _ren)

# 핵심포인트 끝 마침표 제거(다른 학년이 전부 마침표 없음)
_strip = 0
for c in cards.values():
    kp = []
    for k in c["keyPoints"]:
        k2 = str(k).rstrip()
        if k2.endswith("."):
            k2, _strip = k2[:-1].rstrip(), _strip + 1
        kp.append(k2)
    c["keyPoints"] = kp
print("핵심포인트 끝 마침표 제거: %d건" % _strip)

# ---------- 1) DD_CURRICULUM ----------
big_of, small_of = {}, {}
bigUnits = []
for bname, mids in STRUCT:
    middles = []
    for mname, q0, q1 in mids:
        smalls = []
        for i in range(q0, q1 + 1):
            sname = cards[i]["small"]
            smalls.append({"name": sname, "types": [{
                "name": sname.split(". ", 1)[1],
                "low": by_id[i]["low"], "high": by_id[i]["high"]}]})
            big_of[i], small_of[i] = bname, sname
        middles.append({"name": mname, "smalls": smalls})
    bigUnits.append({"name": bname, "middles": middles})
course = {"name": "중3-2학기", "bigUnits": bigUnits}

bad = []
for b in course["bigUnits"]:
    for m in b["middles"]:
        for s in m["smalls"]:
            i = int(s["name"].split(".")[0])
            t = s["types"][0]
            if t["low"] != by_id[i]["low"] or t["high"] != by_id[i]["high"]:
                bad.append(i)
print("옛 질문 글자 대조: %d/61 통과" % (61 - len(bad)), ("실패 " + str(bad)) if bad else "")
assert not bad


def js(x):
    return json.dumps(x, ensure_ascii=False)


lines = []
for i in range(1, 62):
    c = cards[i]
    key = '"m3-2",%s,%s' % (js(big_of[i]), js(small_of[i]))
    bp = c["basicProblem"]
    lines.append('  DD_CARDS[ ddConceptId(%s) ] = {' % key)
    lines.append('    hints: %s,' % js(c["hints"]))
    lines.append('    concept: %s,' % js(c["concept"]))
    lines.append('    media: [],')
    lines.append('    basicProblem: { stem:%s, choices:%s, answer:%d, explain:%s, by:"app", scope:"me" },'
                 % (js(bp["stem"]), js(bp["choices"]), bp["answer"], js(bp["explain"])))
    lines.append('    bookPage: %s, by:"app", scope:"me"' % js(c["bookPage"]))
    lines.append('  };')
    lines.append('  DD_KEYPOINTS[ddConceptId(%s)] = %s;' % (key, js(c["keyPoints"])))

figs = [(i, c.get("figNote", "")) for i, c in sorted(cards.items()) if c.get("figNeeded")]
fig_comment = ["/* [나중 작업] 그림·그래프가 있으면 좋은 개념 — %s에서 표시만 해 둠." % NEWVER,
               "   붙일 때는 그 개념 DD_CARDS의 media에 {form:'ddfig', scene:{...}} 를 넣으면 된다.",
               "   (질문 화면·학습 공간 양쪽에 자동으로 나온다. 질문 문장은 안 고쳐도 된다.)"]
for i, note in figs:
    fig_comment.append("   Q%03d %s%s" % (i, cards[i]["small"], (" — " + note) if note else ""))
fig_comment.append("*/")

block = "\n".join([
    "",
    "/* ============================================================",
    "   [%s] 중3-2학기 — 교재(숨마쿰라우데 중학수학 개념기본서 3-하) 개념 Q001~Q061" % NEWVER,
    "   · 옛 M3_2_UNITS 61개의 말하기 질문(low/high)은 글자 그대로 옮겼다(재작성 아님. 61/61 대조 통과).",
    "   · 대단원 3 / 중단원 6 / 소단원 61. 교재 쪽수 오프셋 0(인쇄 쪽번호 = PDF 통합 인덱스).",
    "   ============================================================ */",
    "DD_CURRICULUM['m3-2'] = " + js(course) + ";",
    "",
    "// 늦게 추가된 학년이라 applyDdCurriculum()을 못 탄다 → 여기서 직접 적용한다.",
    "ddApplyLateGrade('m3-2', %d);" % BASE_ID,
    "(function(){",
] + lines + ["})();", ""] + fig_comment + [""])

io.open(os.path.join(SC, "preview_m32.js"), "w", encoding="utf-8").write(block)
print("블록 %d줄 / %d자 -> preview_m32.js" % (block.count("\n"), len(block)))
print("그림 필요 표시 %d개: %s" % (len(figs), [i for i, _ in figs]))

# ---------- 삽입 ----------
src = io.open(HTML, encoding="utf-8").read()
ANCHOR = '\n  DD_CARDS[ ddConceptId("m2-1","1. 유리수와 순환소수","01. 유한소수와 무한소수") ] = {'
for name, bad2 in [
    ("m3-2 이미 있음", "DD_CURRICULUM['m3-2']" in src),
    ("앵커 없음", ANCHOR not in src),
    ("MIGRATED 앵커 없음", "'m3-1': [1,2,3,4,5" not in src),
    ("CE_PREFIX 앵커 없음", "'m3-1':'M31'" not in src),
    ("APP_VERSION 앵커 없음", "const APP_VERSION = 'v78.1-중3-1학기';" not in src),
]:
    if bad2:
        sys.exit("!! " + name)

out = src.replace(ANCHOR, "\n" + block + ANCHOR, 1)
out = out.replace("'m3-1': [1,2,3,4,5",
                  "'m3-2': [%s], 'm3-1': [1,2,3,4,5" % ",".join(str(i) for i in range(1, 62)), 1)
out = out.replace("'m3-1':'M31'", "'m3-1':'M31', 'm3-2':'M32'", 1)
out = out.replace("const APP_VERSION = 'v78.1-중3-1학기';",
                  "const APP_VERSION = '%s';" % NEWVER, 1)

if APPLY:
    # 이 저장소는 작업 트리가 CRLF다. newline=""를 주면 파일 전체가 LF로 바뀐다.
    io.open(HTML, "w", encoding="utf-8", newline="\r\n").write(out)
    b = open(HTML, "rb").read()
    print("=> 삽입 완료 (%d자 -> %d자) | CRLF %d / 줄바꿈 %d"
          % (len(src), len(out), b.count(b"\r\n"), b.count(b"\n")))
else:
    print("=> 미리보기만 함. 실제로 넣으려면 --apply")
