# -*- coding: utf-8 -*-
"""고1-1 카드 전수 검토용 덤프"""
import json, io, os, sys

SP = os.path.dirname(os.path.abspath(__file__))
CH = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"]

src = {}
for c in CH:
    for x in json.load(io.open(os.path.join(SP, "src_%s.json" % c), encoding="utf-8"))["concepts"]:
        src[x["id"]] = x

cards = {}
for c in CH:
    for card in json.load(io.open(os.path.join(SP, "cards_%s.json" % c), encoding="utf-8")):
        cards[card["id"]] = card

lo, hi = int(sys.argv[1]), int(sys.argv[2])
out = []
for i in sorted(cards):
    if not (lo <= i <= hi):
        continue
    c, s = cards[i], src[i]
    out.append("=" * 78)
    out.append("Q%03d  %s | %s | %s" % (i, s["big"], s["middle"], c["small"]))
    out.append("  [%s] fig=%s %s" % (c.get("bookPage", ""), c.get("figNeeded"), c.get("figNote", "")))
    out.append("  low : " + " / ".join(c["low"]))
    out.append("  high: " + " / ".join(c["high"]))
    out.append("  개념: " + c["concept"])
    out.append("  힌트: " + " || ".join(c["hints"]))
    out.append("  채점: " + " || ".join(c["keyPoints"]))
    bp = c["basicProblem"]
    out.append("  문제: " + bp["stem"])
    for k, ch in enumerate(bp["choices"]):
        out.append("      %s%d) %s" % ("*" if k == bp["answer"] else " ", k + 1, ch))
    out.append("  해설: " + bp["explain"])
txt = "\n".join(out)
io.open(os.path.join(SP, "review_%d_%d.txt" % (lo, hi)), "w", encoding="utf-8").write(txt)
print("%d~%d  %d개  %d자" % (lo, hi, sum(1 for i in cards if lo <= i <= hi), len(txt)))
