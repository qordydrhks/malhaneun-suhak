# -*- coding: utf-8 -*-
"""정육면체 전개도 접기 계산 (2026-10-13) — 손으로 접어 셈하면 틀리기 쉬워서(10/7 주사위 때 실제로 틀림) 계산으로 확인한다.
   fold(cells) → {칸: 면 이름(+x·-x·+y·-y·+z·-z)} · 칸이 정육면체가 되지 않으면 None
   corners(cells) → {(격자 x, y): 3D 꼭짓점}  — 전개도 둘레의 점이 접었을 때 어느 꼭짓점이 되는지
   glue(cells) → 접었을 때 겹치는 둘레 선분 짝 [((p, q), (r, s)), …]  (p, q 등은 격자 점)
   칸 = (열, 행), 행은 아래로 커진다.
"""

def _add(a, b): return tuple(x + y for x, y in zip(a, b))
def _neg(a): return tuple(-x for x in a)

def _frames(cells):
    cells = list(cells); have = set(cells)
    root = cells[0]
    fr = {root: ((0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1))}   # O, U(열 방향), V(행 방향), W(안쪽)
    todo = [root]
    while todo:
        c = todo.pop()
        O, U, V, W = fr[c]
        nbs = {(c[0] + 1, c[1]): (_add(O, U), W, V, _neg(U)),
               (c[0] - 1, c[1]): (_add(O, W), _neg(W), V, U),
               (c[0], c[1] + 1): (_add(O, V), U, W, _neg(V)),
               (c[0], c[1] - 1): (_add(O, W), U, _neg(W), V)}
        for nb, f in nbs.items():
            if nb in have and nb not in fr:
                fr[nb] = f; todo.append(nb)
    return fr

def _pt(f, i, j):
    O, U, V, W = f
    return tuple(o + i * u + j * v for o, u, v in zip(O, U, V))

def faces(cells):
    """칸마다 면(꼭짓점 4개의 집합). 정육면체 전개도가 아니면 None"""
    fr = _frames(cells)
    if len(fr) != len(list(cells)): return None
    fs = {c: frozenset(_pt(f, i, j) for i in (0, 1) for j in (0, 1)) for c, f in fr.items()}
    if len(set(fs.values())) != len(fs): return None
    return fs

def is_net(cells): return len(list(cells)) == 6 and faces(cells) is not None

def opposite(cells):
    """마주 보는 칸 짝"""
    fs = faces(cells); out = []
    for a in fs:
        for b in fs:
            if a < b and not (fs[a] & fs[b]): out.append((a, b))
    return out

def corners(cells):
    fr = _frames(cells); m = {}
    for c, f in fr.items():
        for i in (0, 1):
            for j in (0, 1):
                m.setdefault((c[0] + i, c[1] + j), set()).add(_pt(f, i, j))
    return {k: next(iter(v)) for k, v in m.items() if len(v) == 1}

def boundary(cells):
    have = set(cells); segs = []
    for (c, r) in cells:
        for (dc, dr, p, q) in ((0, -1, (c, r), (c + 1, r)), (1, 0, (c + 1, r), (c + 1, r + 1)),
                               (0, 1, (c, r + 1), (c + 1, r + 1)), (-1, 0, (c, r), (c, r + 1))):
            if (c + dc, r + dr) not in have: segs.append((p, q))
    return segs

def glue(cells):
    cm = corners(cells); bs = boundary(cells); out = []; used = set()
    for a in bs:
        for b in bs:
            if a < b and a not in used and b not in used:
                if {cm[a[0]], cm[a[1]]} == {cm[b[0]], cm[b[1]]}:
                    out.append((a, b)); used.add(a); used.add(b)
    return out

if __name__ == '__main__':
    cross = [(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)]
    print(is_net(cross), opposite(cross))
    print(is_net([(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1)]))
    print(len(glue(cross)))
