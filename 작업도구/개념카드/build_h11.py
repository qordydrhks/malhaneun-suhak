# -*- coding: utf-8 -*-
"""고1-1(공통수학1) 블록 만들기 + dodream.html 삽입
     python build_h11.py            -> 미리보기만
     python build_h11.py --apply    -> 실제 삽입

앞 학년과 다른 점: h1-1은 앱에 옛 질문이 하나도 없다.
 → DD_MIGRATED_LEGACY_IDS 건드릴 것 없음. 대신 GRADES에 학년 자체를 새로 넣어야 한다
   (ddApplyLateGrade는 GRADES에 없는 학년이면 아무것도 안 하고 그냥 돌아간다).
"""
import json, io, os, sys

SC = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\qordy\Documents\GitHub\malhaneun-suhak"
HTML = os.path.join(REPO, "dodream.html")
APPLY = "--apply" in sys.argv
NEWVER = "v78.5-고1-1학기"
OLDVER = "v78.4-고1유형질문"
BASE_ID = 9100000          # 앞 학년들이 92~98만번대를 썼다. 91만번대가 비어 있다.

concepts = {c["id"]: c for c in
            json.load(io.open(os.path.join(SC, "concepts_h1-1.json"), encoding="utf-8"))}
cards = {}
for c in ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"]:
    f = os.path.join(SC, "cards_%s.json" % c)
    if not os.path.exists(f):
        sys.exit("!! 없는 조각: " + c)
    for card in json.load(io.open(f, encoding="utf-8")):
        cards[card["id"]] = card
assert sorted(cards) == list(range(1, 92)), "카드 91개가 아니다: %d" % len(cards)

# 소단원 이름은 에이전트 말을 믿지 않고 차례(concepts_h1-1.json)에서 다시 씌운다
_ren = 0
for i, c in cards.items():
    if c.get("small") != concepts[i]["small"]:
        print("  소단원 이름 교정 Q%03d: %r -> %r" % (i, c.get("small"), concepts[i]["small"]))
        c["small"], _ren = concepts[i]["small"], _ren + 1
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

# ---------- 1) DD_CURRICULUM (차례 순서 그대로) ----------
bigUnits, big_of, small_of = [], {}, {}
for i in range(1, 92):
    cc, card = concepts[i], cards[i]
    if not bigUnits or bigUnits[-1]["name"] != cc["big"]:
        bigUnits.append({"name": cc["big"], "middles": []})
    mids = bigUnits[-1]["middles"]
    if not mids or mids[-1]["name"] != cc["middle"]:
        mids.append({"name": cc["middle"], "smalls": []})
    mids[-1]["smalls"].append({"name": card["small"], "types": [{
        "name": card["small"].split(". ", 1)[1],
        "low": card["low"], "high": card["high"]}]})
    big_of[i], small_of[i] = cc["big"], card["small"]
course = {"name": "고1-1학기", "bigUnits": bigUnits}

n_mid = sum(len(b["middles"]) for b in bigUnits)
n_small = sum(len(m["smalls"]) for b in bigUnits for m in b["middles"])
print("대단원 %d / 중단원 %d / 소단원 %d" % (len(bigUnits), n_mid, n_small))
assert (len(bigUnits), n_mid, n_small) == (4, 30, 91)

# 말하기 질문 개수·기호 왕복 확인
for i in range(1, 92):
    for key in ("low", "high"):
        v = cards[i][key]
        assert len(v) == 3, "Q%03d %s %d개" % (i, key, len(v))
        for k, q in enumerate(v):
            assert q.startswith("①②③"[k]), "Q%03d %s[%d] 기호" % (i, key, k)
print("말하기 질문 %d개 (91×6) 확인" % (91 * 6))

# 편집기 코드 미리 계산 — 다른 학년과 겹치면 선생님 수정본이 엉킨다
codes = {}
for i in range(1, 92):
    code = "H11" + str(int(big_of[i].split(".")[0])) + str(i)
    codes.setdefault(code, []).append(i)
dupc = {k: v for k, v in codes.items() if len(v) > 1}
print("편집기 코드 %d개, 중복 %d건 %s" % (len(codes), len(dupc), dupc if dupc else ""))
assert not dupc


def js(x):
    return json.dumps(x, ensure_ascii=False)


lines = []
for i in range(1, 92):
    c = cards[i]
    key = '"h1-1",%s,%s' % (js(big_of[i]), js(small_of[i]))
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
    "   [%s] 고1-1학기 공통수학1 — 교재(숨마쿰 라우데 고1 1학기 공통수학) 개념 Q001~Q091" % NEWVER,
    "   · 이 학년은 앱에 옛 질문이 없어서 말하기 질문(low 3 / high 3)도 새로 썼다.",
    "   · 대단원 4 / 중단원 30 / 소단원 91. 소단원 번호는 대단원이 바뀌어도 01~91로 이어 붙였다.",
    "   · 교재 쪽수: 인쇄 쪽번호 그대로. (PDF 파일1은 인쇄 91·92쪽이 두 번 들어 있어",
    "     인쇄 93쪽부터 파일 인덱스가 2쪽 밀린다 — 쪽수는 인쇄된 번호로 확인했다.)",
    "   ============================================================ */",
    "DD_CURRICULUM['h1-1'] = " + js(course) + ";",
    "",
    "// 늦게 추가된 학년이라 applyDdCurriculum()을 못 탄다 → 여기서 직접 적용한다.",
    "ddApplyLateGrade('h1-1', %d);" % BASE_ID,
    "(function(){",
] + lines + ["})();", ""] + fig_comment + [""])

io.open(os.path.join(SC, "preview_h11.js"), "w", encoding="utf-8").write(block)
print("블록 %d줄 / %d자 -> preview_h11.js" % (block.count("\n"), len(block)))
print("그림 필요 표시 %d개: %s" % (len(figs), [i for i, _ in figs]))

# ---------- 삽입 ----------
src = io.open(HTML, encoding="utf-8").read()
ANCHOR = '\n  DD_CARDS[ ddConceptId("m2-1","1. 유리수와 순환소수","01. 유한소수와 무한소수") ] = {'
GRADE_ANCHOR = '  {id:"h1-2", name:"고1-2학기", units:[]},'
for name, bad in [
    ("h1-1 이미 있음", "DD_CURRICULUM['h1-1']" in src),
    ("카드 앵커 없음", ANCHOR not in src),
    ("GRADES 앵커 없음", GRADE_ANCHOR not in src),
    ("CE_PREFIX 앵커 없음", "'h1-2':'H12'" not in src),
    ("APP_VERSION 앵커 없음", "const APP_VERSION = '%s';" % OLDVER not in src),
]:
    if bad:
        sys.exit("!! " + name)

out = src.replace(GRADE_ANCHOR, '  {id:"h1-1", name:"고1-1학기", units:[]},\n' + GRADE_ANCHOR, 1)
out = out.replace(ANCHOR, "\n" + block + ANCHOR, 1)
out = out.replace("'h1-2':'H12'", "'h1-2':'H12', 'h1-1':'H11'", 1)
out = out.replace("const APP_VERSION = '%s';" % OLDVER,
                  "const APP_VERSION = '%s';" % NEWVER, 1)

if APPLY:
    # 이 저장소는 작업 트리가 CRLF다. newline=""를 주면 파일 전체가 LF로 바뀐다.
    io.open(HTML, "w", encoding="utf-8", newline="\r\n").write(out)
    b = open(HTML, "rb").read()
    print("=> 삽입 완료 (%d자 -> %d자) | CRLF %d / 줄바꿈 %d"
          % (len(src), len(out), b.count(b"\r\n"), b.count(b"\n")))
else:
    print("=> 미리보기만 함. 실제로 넣으려면 --apply")
