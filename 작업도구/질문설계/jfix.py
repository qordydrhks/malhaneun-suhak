# -*- coding: utf-8 -*-
"""josa62 규칙대로 수 뒤 조사를 고친다. 단 '이고'는 그대로(받침 없는 수 뒤 '이고'도 자연스러움 — CLAUDE.md)."""
import io, sys
sys.argv = sys.argv[:1] + []      # josa62 가 import 될 때 점검 루프가 돌지 않게
import josa62 as J
def fix(fn):
    s = io.open(fn, encoding='utf-8').read(); n = [0]
    def rep(m):
        if m.group(2) in ('이고', '고'): return m.group(0)
        w = J.want(m.group(1), m.group(2))
        if w and w != m.group(2): n[0] += 1; return m.group(1) + w
        return m.group(0)
    s = J.R.sub(rep, s); io.open(fn, 'w', encoding='utf-8', newline='').write(s); return n[0]
if __name__ == '__main__':
    import sys as S
    for f in S.argv_files if hasattr(S, 'argv_files') else []: pass
