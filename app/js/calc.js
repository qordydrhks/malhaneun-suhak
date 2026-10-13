/* 새 앱 — ⚡ 계산 연습(마스터 10/13).
   · 퉁구리와 경주하는 혼자 연습. 학년·단원을 골라서(지금은 4·5·6학년 2학기). 만들기 힘든 단원은 뺐다(꺾은선그래프·합동과 대칭·공간과 입체).
   · 단순 계산 + 사고력 연산(삼각형 세기·겹친 띠·연속한 수의 합…) · 암산 수준 · 문제는 그때그때 숫자를 새로 만든다(외워서 못 맞히게).
   · 시작 전에 팁 쪽(어떻게 하면 빠르고 정확한지). 중간중간 '용어 맞히기'(뜻을 보고 어떤 낱말인지 고르기).
   · 퉁구리를 이기면 별빛 +10(하루 3번까지 — 개념 질문보다 작게). 기록: 진도 P.calc[단원키] = {plays, wins, best:{c, t}}
   · 계산 대결(⑤)이 같은 문제 생성기(C.round)를 쓴다. */
(() => {
  'use strict';
  const A = window.APP, E = A.E;
  const C = A.C = {};
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const R = (n, d) => { d = d || 1; if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return {n: n / g, d: d / g}; };
  const dec = (x, k) => R(Math.round(x * Math.pow(10, k)), Math.pow(10, k));      // 소수 → 분수(정확히)
  const eq = (a, b) => a.n * b.d === b.n * a.d;
  const JOSA = {0: '과', 1: '과', 2: '와', 3: '과', 4: '와', 5: '와', 6: '과', 7: '과', 8: '과', 9: '와'};
  const obj = x => (JOSA[String(x).slice(-1)] === '와' ? '를' : '을');                 // 수 뒤 을/를(끝자리 소리)
  const mixed = (w, n, d) => (w ? w + JOSA[String(w).slice(-1)] + ' ' : '') + n + '/' + d;   // mfmt 가 "2와 1/3"을 대분수로 그린다
  const fracStr = r => { if (r.d === 1) return String(r.n); const w = Math.floor(r.n / r.d), n = r.n - w * r.d; return mixed(w, n, r.d); };
  const decStr = r => { let x = r.n / r.d; return String(Math.round(x * 1e6) / 1e6); };
  const keepStr = (r, d) => { const n = r.n * d / r.d, w = Math.floor(n / d), m = n - w * d; return m ? mixed(w, m, d) : String(w); };
  C.show = (a, form, p) => form === 'frac' ? (p && p.keep ? keepStr(a, p.keep) : fracStr(a)) : (p && p.fix ? (a.n / a.d).toFixed(p.fix) : decStr(a));
  const deg = '°';

  // ── 문제 모양 ──  gen() → {q, a: 분수 값, form: 'int'|'dec'|'frac', fig?, unit?}
  const T = C.T = {};
  /* 4-2 ① 분수의 덧셈과 뺄셈 */
  T.f42a = {name: '분모가 같은 분수의 덧셈·뺄셈', sec: 10, gen() {
    const d = rnd(5, 12), a = rnd(1, d - 1), b = rnd(1, d - 1);
    if (Math.random() < .5 || a === b) return {q: `${a}/${d} + ${b}/${d}`, a: R(a + b, d), form: 'frac', keep: d};
    const [x, y] = a > b ? [a, b] : [b, a]; return {q: `${x}/${d} − ${y}/${d}`, a: R(x - y, d), form: 'frac', keep: d};
  }};
  T.f42b = {name: '대분수의 덧셈·뺄셈', sec: 16, gen() {
    const d = rnd(3, 9), w1 = rnd(2, 6), w2 = rnd(1, w1 - 1), n1 = rnd(1, d - 1), n2 = rnd(1, d - 1);
    const A1 = R(w1 * d + n1, d), A2 = R(w2 * d + n2, d);
    if (Math.random() < .5) return {q: `${mixed(w1, n1, d)} + ${mixed(w2, n2, d)}`, a: R(A1.n * A2.d + A2.n * A1.d, A1.d * A2.d), form: 'frac', keep: d};
    return {q: `${mixed(w1, n1, d)} − ${mixed(w2, n2, d)}`, a: R((w1 * d + n1) - (w2 * d + n2), d), form: 'frac', keep: d};
  }};
  T.f42c = {name: '자연수에서 분수 빼기', sec: 14, gen() {
    const W = rnd(2, 6), d = rnd(3, 9), w = rnd(0, W - 1), n = rnd(1, d - 1);
    return {q: `${W} − ${mixed(w, n, d)}`, a: R(W * d - (w * d + n), d), form: 'frac', keep: d};
  }};
  /* 4-2 ② 삼각형 */
  T.t42a = {name: '이등변삼각형의 각', sec: 12, gen() {
    if (Math.random() < .5) { const x = 2 * rnd(10, 70); return {q: `이등변삼각형에서 길이가 같은 두 변 사이의 각이 ${x}${deg}야. 나머지 두 각 중 한 각은 몇 도?`, a: R((180 - x) / 2), form: 'int', unit: deg}; }
    const y = rnd(25, 85); return {q: `이등변삼각형에서 크기가 같은 두 각 중 한 각이 ${y}${deg}야. 길이가 같은 두 변 사이의 각은 몇 도?`, a: R(180 - 2 * y), form: 'int', unit: deg};
  }};
  T.t42b = {name: '삼각형 세기', sec: 16, think: 1, gen() {
    const k = rnd(1, 5), W = 220, H = 130, xs = Array.from({length: k + 2}, (_, i) => 10 + i * (W - 20) / (k + 1));
    const fig = `<svg viewBox="0 0 ${W} ${H + 10}" width="${W}" height="${H + 10}" style="max-width:100%"><g fill="none" stroke="#2b3157" stroke-width="2.2" stroke-linejoin="round">
      <polygon points="${W / 2},8 10,${H} ${W - 10},${H}"/>${xs.slice(1, -1).map(x => `<line x1="${W / 2}" y1="8" x2="${x}" y2="${H}"/>`).join('')}</g></svg>`;
    return {q: '그림에서 찾을 수 있는 크고 작은 삼각형은 모두 몇 개?', fig, a: R((k + 1) * (k + 2) / 2), form: 'int', unit: '개'};
  }};
  /* 4-2 ③ 소수의 덧셈과 뺄셈 */
  T.d42a = {name: '소수의 덧셈·뺄셈', sec: 12, gen() {
    const x = rnd(105, 989) / 100, y = rnd(11, 89) / 10;
    if (Math.random() < .5) return {q: `${x} + ${y}`, a: dec(x + y, 2), form: 'dec'};
    const [p, q] = x > y ? [x, y] : [y, x]; return {q: `${p} − ${q}`, a: dec(p - q, 2), form: 'dec'};
  }};
  T.d42b = {name: '겹쳐 이은 띠의 길이', sec: 22, think: 1, gen() {
    const L = rnd(81, 159) / 10, n = rnd(3, 4), o = rnd(5, 19) / 10;
    return {q: `길이가 ${L} cm인 띠 ${n}장을 ${o} cm씩 겹치게 한 줄로 이었어. 이은 띠의 전체 길이는 몇 cm?`, a: dec(n * L - (n - 1) * o, 1), form: 'dec', unit: 'cm'};
  }};
  /* 4-2 ④ 사각형 */
  T.q42a = {name: '평행사변형·마름모의 각', sec: 10, gen() {
    const x = rnd(35, 145), sh = pick(['평행사변형', '마름모']);
    if (Math.random() < .5) return {q: `${sh}의 한 각이 ${x}${deg}야. 이 각과 이웃한 각은 몇 도?`, a: R(180 - x), form: 'int', unit: deg};
    return {q: `${sh}의 한 각이 ${x}${deg}야. 이 각과 마주 보는 각은 몇 도?`, a: R(x), form: 'int', unit: deg};
  }};
  T.q42b = {name: '마름모의 둘레', sec: 10, gen() {
    const s = rnd(4, 19);
    return Math.random() < .5 ? {q: `한 변이 ${s} cm인 마름모의 네 변의 길이의 합은 몇 cm?`, a: R(4 * s), form: 'int', unit: 'cm'}
                              : {q: `네 변의 길이의 합이 ${4 * s} cm인 마름모의 한 변은 몇 cm?`, a: R(s), form: 'int', unit: 'cm'};
  }};
  /* 4-2 ⑥ 다각형 */
  T.p42a = {name: '정다각형의 둘레', sec: 10, gen() {
    const n = rnd(5, 10), s = rnd(3, 15), nm = {5: '정오각형', 6: '정육각형', 7: '정칠각형', 8: '정팔각형', 9: '정구각형', 10: '정십각형'}[n];
    return Math.random() < .5 ? {q: `한 변이 ${s} cm인 ${nm}의 모든 변의 길이의 합은 몇 cm?`, a: R(n * s), form: 'int', unit: 'cm'}
                              : {q: `모든 변의 길이의 합이 ${n * s} cm인 ${nm}의 한 변은 몇 cm?`, a: R(s), form: 'int', unit: 'cm'};
  }};
  T.p42b = {name: '대각선의 수', sec: 14, think: 1, gen() {
    const n = rnd(4, 10), nm = {4: '사각형', 5: '오각형', 6: '육각형', 7: '칠각형', 8: '팔각형', 9: '구각형', 10: '십각형'}[n];
    return {q: `${nm}에 그을 수 있는 대각선은 모두 몇 개?`, a: R(n * (n - 3) / 2), form: 'int', unit: '개'};
  }};
  T.p42c = {name: '다각형의 각의 크기의 합', sec: 14, think: 1, gen() {
    const n = rnd(4, 8), nm = {4: '사각형', 5: '오각형', 6: '육각형', 7: '칠각형', 8: '팔각형'}[n];
    if (Math.random() < .5 || ![5, 6, 8].includes(n)) return {q: `${nm}의 모든 각의 크기의 합은 몇 도?`, a: R(180 * (n - 2)), form: 'int', unit: deg};
    return {q: `정${nm}의 한 각의 크기는 몇 도?`, a: R(180 * (n - 2) / n), form: 'int', unit: deg};
  }};
  /* 사고력 연산(학년 공통) */
  T.m1 = {name: '연속한 수의 합', sec: 18, think: 1, gen() {
    const a = rnd(1, 30), k = 2 * rnd(3, 8), b = a + k - 1;
    return {q: `${a} + ${a + 1} + ${a + 2} + … + ${b} (${a}부터 ${b}까지 연속한 수를 모두 더하기)`, a: R((a + b) * k / 2), form: 'int'};
  }};
  T.m2 = {name: '여러 수 한 번에 더하기', sec: 16, think: 1, gen() {
    const xs = Array.from({length: rnd(4, 5)}, () => rnd(12, 89));
    return {q: xs.join(' + '), a: R(xs.reduce((s, x) => s + x, 0)), form: 'int'};
  }};
  T.m3 = {name: '짝을 지어 더하기', sec: 14, think: 1, gen() {
    const p = rnd(12, 88), q = rnd(12, 88), xs = [p, 100 - q, 100 - p, q].sort(() => Math.random() - .5);
    return {q: xs.join(' + '), a: R(200), form: 'int'};
  }};
  /* 5-2 ① 수의 범위와 어림하기 */
  T.r52a = {name: '올림·버림·반올림', sec: 12, gen() {
    const n = rnd(1001, 98999), pl = pick([['십', 10], ['백', 100], ['천', 1000]]), how = pick(['올림', '버림', '반올림']);
    const f = how === '올림' ? Math.ceil : how === '버림' ? Math.floor : Math.round;
    return {q: `${n}${obj(n)} ${how}하여 ${pl[0]}의 자리까지 나타내면?`, a: R(f(n / pl[1]) * pl[1]), form: 'int'};
  }};
  T.r52b = {name: '소수 반올림', sec: 10, gen() {
    const x = rnd(1011, 9989) / 1000;
    return {q: `${x}${obj(x)} 반올림하여 소수 첫째 자리까지 나타내면?`, a: dec(Math.round(x * 10) / 10, 1), form: 'dec', fix: 1};
  }};
  /* 5-2 ② 분수의 곱셈 */
  T.f52a = {name: '(분수) × (자연수)', sec: 12, gen() {
    const d = rnd(3, 12), n = rnd(1, d - 1), k = rnd(2, 9);
    return Math.random() < .5 ? {q: `${n}/${d} × ${k}`, a: R(n * k, d), form: 'frac'} : {q: `${k} × ${n}/${d}`, a: R(n * k, d), form: 'frac'};
  }};
  T.f52b = {name: '(분수) × (분수)', sec: 14, gen() {
    const b = rnd(2, 9), d = rnd(2, 9), a = rnd(1, b - 1), c = rnd(1, d - 1);
    return {q: `${a}/${b} × ${c}/${d}`, a: R(a * c, b * d), form: 'frac'};
  }};
  T.f52c = {name: '대분수의 곱셈', sec: 20, gen() {
    const b = rnd(2, 5), a = rnd(1, b - 1), w = rnd(1, 3), k = rnd(2, 6);
    if (Math.random() < .5) return {q: `${mixed(w, a, b)} × ${k}`, a: R((w * b + a) * k, b), form: 'frac'};
    const d = rnd(2, 5), c = rnd(1, d - 1), v = rnd(1, 2);
    return {q: `${mixed(w, a, b)} × ${mixed(v, c, d)}`, a: R((w * b + a) * (v * d + c), b * d), form: 'frac'};
  }};
  /* 5-2 ④ 소수의 곱셈 */
  T.d52a = {name: '(소수) × (자연수)', sec: 12, gen() {
    const x = pick([rnd(2, 9) / 10, rnd(11, 99) / 10, rnd(101, 399) / 100]), k = rnd(2, 9);
    return {q: `${x} × ${k}`, a: dec(x * k, 2), form: 'dec'};
  }};
  T.d52b = {name: '(소수) × (소수)', sec: 14, gen() {
    const x = rnd(11, 59) / 10, y = pick([rnd(2, 9) / 10, rnd(11, 39) / 10]);
    return {q: `${x} × ${y}`, a: dec(x * y, 2), form: 'dec'};
  }};
  T.d52c = {name: '곱의 소수점 위치', sec: 10, think: 1, gen() {
    const a = rnd(12, 98), b = rnd(3, 9), p = pick([[10, 1], [100, 2], [10, 2]]);
    const x = a / p[0], y = p[1] === 2 && p[0] === 10 ? b / 10 : b;
    return {q: `${a} × ${b} = ${a * b}${obj(a * b)} 이용해서: ${x} × ${y}`, a: dec(x * y, 3), form: 'dec'};
  }};
  /* 5-2 ⑤ 직육면체 */
  T.b52a = {name: '모든 모서리 길이의 합', sec: 14, gen() {
    if (Math.random() < .35) { const s = rnd(3, 15); return {q: `한 모서리가 ${s} cm인 정육면체의 모든 모서리 길이의 합은 몇 cm?`, a: R(12 * s), form: 'int', unit: 'cm'}; }
    const x = rnd(2, 12), y = rnd(2, 12), z = rnd(2, 12);
    return {q: `가로 ${x} cm, 세로 ${y} cm, 높이 ${z} cm인 직육면체의 모든 모서리 길이의 합은 몇 cm?`, a: R(4 * (x + y + z)), form: 'int', unit: 'cm'};
  }};
  /* 5-2 ⑥ 평균 */
  T.a52a = {name: '평균 구하기', sec: 18, gen() {
    const k = rnd(4, 5), m = rnd(12, 40), xs = Array.from({length: k - 1}, () => m + rnd(-9, 9)); xs.push(m * k - xs.reduce((s, x) => s + x, 0));
    if (xs[k - 1] < 1) return T.a52a.gen();
    return {q: `${xs.join(', ')}의 평균은?`, a: R(m), form: 'int'};
  }};
  T.a52b = {name: '평균으로 모르는 값', sec: 18, think: 1, gen() {
    const k = rnd(4, 5), m = rnd(70, 92), xs = Array.from({length: k - 1}, () => m + rnd(-8, 8)), miss = m * k - xs.reduce((s, x) => s + x, 0);
    if (miss < 0 || miss > 100) return T.a52b.gen();
    return {q: `시험 ${k}번의 평균이 ${m}점이야. ${k - 1}번의 점수가 ${xs.join('점, ')}점이면 나머지 한 번은 몇 점?`, a: R(miss), form: 'int', unit: '점'};
  }};
  /* 6-2 ① 분수의 나눗셈 */
  T.f62a = {name: '분모가 같은 분수의 나눗셈', sec: 10, gen() {
    const d = rnd(5, 15), b = rnd(1, Math.max(1, Math.floor((d - 1) / 2))), a = rnd(b + 1, d - 1);
    return {q: `${a}/${d} ÷ ${b}/${d}`, a: R(a, b), form: 'frac'};
  }};
  T.f62b = {name: '(분수) ÷ (분수)', sec: 16, gen() {
    const b = rnd(2, 9), d = rnd(2, 9), a = rnd(1, b - 1), c = rnd(1, d - 1);
    return {q: `${a}/${b} ÷ ${c}/${d}`, a: R(a * d, b * c), form: 'frac'};
  }};
  T.f62c = {name: '(자연수) ÷ (분수)', sec: 12, gen() {
    const b = rnd(2, 9), a = rnd(1, b - 1), k = a * rnd(1, 6);
    return {q: `${k} ÷ ${a}/${b}`, a: R(k * b, a), form: 'frac'};
  }};
  /* 6-2 ② 소수의 나눗셈 */
  T.d62a = {name: '(소수) ÷ (소수)', sec: 12, gen() {
    const y = pick([rnd(2, 9) / 10, rnd(11, 25) / 10, rnd(2, 9) / 100]), q = rnd(2, 15), x = Math.round(y * q * 1000) / 1000;
    if (y % 1 === 0 || x % 1 === 0 && y >= 1) return T.d62a.gen();
    return {q: `${x} ÷ ${y}`, a: R(q), form: 'int'};
  }};
  T.d62b = {name: '(자연수) ÷ (소수)', sec: 12, gen() {
    const y = pick([0.2, 0.4, 0.5, 0.8, 1.2, 1.5, 2.5, 0.25, 0.75]), q = rnd(2, 12) * (y === 0.75 ? 4 : y === 0.25 ? 1 : 1), x = Math.round(y * q * 100) / 100;
    if (x % 1) return T.d62b.gen();
    return {q: `${x} ÷ ${y}`, a: R(q), form: 'int'};
  }};
  /* 6-2 ④ 비례식과 비례배분 */
  T.r62a = {name: '비례식에서 □ 구하기', sec: 14, gen() {
    const a = rnd(2, 9), b = rnd(2, 9), k = rnd(2, 8);
    return Math.random() < .5 ? {q: `${a} : ${b} = ${a * k} : □`, a: R(b * k), form: 'int'} : {q: `${a} : ${b} = □ : ${b * k}`, a: R(a * k), form: 'int'};
  }};
  T.r62b = {name: '비례배분', sec: 16, think: 1, gen() {
    let a = rnd(1, 7), b = rnd(1, 7); while (a === b || gcd(a, b) > 1) { a = rnd(1, 7); b = rnd(1, 7); }
    const k = rnd(3, 12), N = (a + b) * k, big = Math.random() < .5;
    return {q: `구슬 ${N}개를 형과 동생이 ${a} : ${b}${'036'.includes(String(b).slice(-1)) ? '으로' : '로'} 나누어 가지면 ${big ? '형' : '동생'}은 몇 개?`, a: R((big ? a : b) * k), form: 'int', unit: '개'};
  }};
  /* 6-2 ⑤ 원의 넓이 (원주율 3.14) */
  T.c62a = {name: '원주 구하기', sec: 14, gen() {
    const r = rnd(2, 15);
    return Math.random() < .5 ? {q: `지름이 ${2 * r} cm인 원의 원주는 몇 cm? (원주율 3.14)`, a: dec(2 * r * 3.14, 2), form: 'dec', unit: 'cm'}
                              : {q: `반지름이 ${r} cm인 원의 원주는 몇 cm? (원주율 3.14)`, a: dec(2 * r * 3.14, 2), form: 'dec', unit: 'cm'};
  }};
  T.c62b = {name: '원의 넓이 구하기', sec: 16, gen() {
    const r = rnd(2, 12);
    return {q: `반지름이 ${r} cm인 원의 넓이는 몇 cm²? (원주율 3.14)`, a: dec(r * r * 3.14, 2), form: 'dec', unit: 'cm²'};
  }};
  T.c62c = {name: '원주로 지름 구하기', sec: 14, think: 1, gen() {
    const dd = rnd(2, 30);
    return {q: `원주가 ${Math.round(dd * 314) / 100} cm인 원의 지름은 몇 cm? (원주율 3.14)`, a: R(dd), form: 'int', unit: 'cm'};
  }};
  /* 6-2 ⑥ 원기둥 */
  T.y62a = {name: '원기둥 전개도의 옆면', sec: 16, gen() {
    const r = rnd(2, 10), h = rnd(3, 15);
    return Math.random() < .5 ? {q: `밑면의 반지름이 ${r} cm인 원기둥의 전개도에서 옆면의 가로는 몇 cm? (원주율 3.14)`, a: dec(2 * r * 3.14, 2), form: 'dec', unit: 'cm'}
                              : {q: `밑면의 지름이 ${2 * r} cm, 높이가 ${h} cm인 원기둥의 전개도에서 옆면의 세로는 몇 cm?`, a: R(h), form: 'int', unit: 'cm'};
  }};

  // ── 팁(시작 전에 보는 쪽) ──
  C.TIP = {
    f42a: ['분모가 같으면 분모는 그대로 두고 분자끼리 더하거나 빼요.', '분자가 분모보다 커지면 대분수로 바꿀 수 있어요.', '3/7 + 5/7 = 8/7 = 1과 1/7'],
    f42b: ['자연수는 자연수끼리, 분수는 분수끼리 따로 계산해요.', '분수끼리 뺄 수 없으면 자연수에서 1을 받아내림해요. 1 = 5/5처럼 분수로 바꿔서!', '3과 1/5 − 1과 3/5 = 2와 6/5 − 1과 3/5 = 1과 3/5'],
    f42c: ['자연수에서 1을 분수로 바꿔요. 분모가 7이면 1 = 7/7.', '자연수 부분과 분수 부분을 따로 빼요.', '4 − 1과 2/7 = 3과 7/7 − 1과 2/7 = 2와 5/7'],
    t42a: ['이등변삼각형은 두 각의 크기가 같아요. 삼각형 세 각의 합은 180°.', '두 변 사이의 각을 알면: (180° − 그 각) ÷ 2', '같은 두 각 중 하나를 알면: 180° − (그 각 × 2)'],
    t42b: ['작은 삼각형 1개짜리, 2개를 합친 것, 3개를 합친 것…처럼 크기별로 세요.', '밑변이 3칸으로 나뉘면 3 + 2 + 1 = 6개.', '빠뜨리지도 두 번 세지도 않게 차례대로!'],
    d42a: ['소수점끼리 줄을 맞춰서 같은 자리끼리 계산해요.', '자릿수가 다르면 끝에 0을 붙여 생각해요: 2.4 = 2.40', '3.45 + 2.8 = 3.45 + 2.80 = 6.25'],
    d42b: ['띠를 이으면 겹치는 곳은 (띠 수 − 1)군데예요.', '전체 = 띠 길이 × 띠 수 − 겹친 길이 × (띠 수 − 1)', '10 cm 띠 3장을 2 cm씩 겹치면 30 − 4 = 26 cm'],
    q42a: ['평행사변형과 마름모는 마주 보는 두 각의 크기가 같아요.', '이웃한 두 각의 크기의 합은 180°예요.', '한 각이 70°면 이웃한 각 110°, 마주 보는 각 70°'],
    q42b: ['마름모는 네 변의 길이가 모두 같아요.', '둘레 = 한 변 × 4, 한 변 = 둘레 ÷ 4', '한 변 9 cm → 36 cm'],
    p42a: ['정다각형은 변의 길이가 모두 같아요.', '모든 변의 합 = 한 변 × 변의 수', '정육각형 한 변 5 cm → 30 cm'],
    p42b: ['한 꼭짓점에서는 자기와 이웃한 두 꼭짓점을 빼고 그어요: (변의 수 − 3)개.', '모든 꼭짓점에서 그으면 한 대각선을 두 번 세니까 ÷ 2.', '육각형: 6 × 3 ÷ 2 = 9개'],
    p42c: ['다각형을 한 꼭짓점에서 대각선으로 나누면 삼각형이 (변의 수 − 2)개 생겨요.', '각의 합 = 180° × (변의 수 − 2)', '정다각형 한 각 = 각의 합 ÷ 변의 수'],
    m1: ['맨 앞과 맨 뒤를 짝 지으면 합이 모두 같아요.', '(맨 앞 + 맨 뒤) × (수의 개수) ÷ 2', '3 + 4 + … + 10 = (3 + 10) × 8 ÷ 2 = 52'],
    m2: ['일의 자리끼리 먼저 더하고, 십의 자리끼리 더한 뒤 합쳐요.', '27 + 35 + 48 → 일의 자리 7 + 5 + 8 = 20, 십의 자리 20 + 30 + 40 = 90', '90 + 20 = 110'],
    m3: ['더해서 100이 되는 짝을 먼저 찾아요.', '순서를 바꿔 더해도 합은 같아요.', '37 + 48 + 63 + 52 = (37 + 63) + (48 + 52) = 200'],
    r52a: ['올림: 구하려는 자리 아래를 올려요. 버림: 아래를 버려요.', '반올림: 바로 아래 자리 숫자가 0~4면 버리고 5~9면 올려요.', '3462를 반올림하여 백의 자리까지 → 3500'],
    r52b: ['소수 첫째 자리까지: 소수 둘째 자리 숫자를 봐요.', '0~4면 버리고 5~9면 올려요.', '2.46 → 2.5'],
    f52a: ['분자에 자연수를 곱하고 분모는 그대로.', '곱하기 전에 약분할 수 있으면 먼저 약분해요.', '5/6 × 4 = 20/6 = 10/3 = 3과 1/3'],
    f52b: ['분자는 분자끼리, 분모는 분모끼리 곱해요.', '엇갈려서 약분하면 계산이 쉬워져요.', '3/4 × 2/9 = 6/36 = 1/6'],
    f52c: ['대분수는 가분수로 바꾼 뒤 곱해요.', '1과 1/2 = 3/2', '1과 1/2 × 4 = 3/2 × 4 = 6'],
    d52a: ['자연수처럼 곱한 뒤 소수점 아래 자리 수만큼 소수점을 찍어요.', '0.7 × 6: 7 × 6 = 42 → 4.2', '끝자리 0은 지워도 돼요: 2.5 × 4 = 10'],
    d52b: ['자연수처럼 곱한 뒤, 두 수의 소수점 아래 자리 수를 더한 만큼 소수점을 찍어요.', '1.2 × 0.4: 12 × 4 = 48 → 소수점 아래 2자리 → 0.48', ''],
    d52c: ['곱해지는 수와 곱하는 수의 소수점 아래 자리 수를 세요.', '그 수를 더한 만큼 곱에 소수점을 찍어요.', '23 × 4 = 92 → 2.3 × 0.4 = 0.92'],
    b52a: ['직육면체는 길이가 같은 모서리가 4개씩 3묶음.', '합 = (가로 + 세로 + 높이) × 4', '정육면체는 모서리 12개가 모두 같아요: 한 모서리 × 12'],
    a52a: ['평균 = 자료의 값을 모두 더한 수 ÷ 자료의 수', '기준을 정해 넘치는 것을 모자란 쪽에 나눠 주면 더 빨라요.', '18, 22, 20 → 20을 기준으로 −2 + 2 + 0 = 0 → 평균 20'],
    a52b: ['전체 합 = 평균 × 자료의 수', '모르는 값 = 전체 합 − 아는 값들의 합', '평균 80점 4번 → 합 320점'],
    f62a: ['분모가 같으면 분자끼리 나눠요.', '6/7 ÷ 2/7 = 6 ÷ 2 = 3', '나누어떨어지지 않으면 분수로: 5/9 ÷ 2/9 = 5/2'],
    f62b: ['나누는 분수의 분모와 분자를 바꾸어 곱해요.', '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6', '곱하기 전에 약분하면 쉬워요.'],
    f62c: ['자연수 ÷ 분수도 나누는 분수를 뒤집어 곱해요.', '6 ÷ 2/5 = 6 × 5/2 = 15', ''],
    d62a: ['나누는 수가 자연수가 되도록 두 수의 소수점을 똑같이 옮겨요.', '7.2 ÷ 0.8 = 72 ÷ 8 = 9', '0.06이면 두 자리 옮겨요: 0.42 ÷ 0.06 = 42 ÷ 6'],
    d62b: ['나누는 수의 소수점을 옮긴 만큼 자연수 뒤에 0을 붙여요.', '6 ÷ 0.4 = 60 ÷ 4 = 15', ''],
    r62a: ['비례식에서 외항의 곱과 내항의 곱은 같아요.', '앞의 비와 뒤의 비가 몇 배인지 보면 더 빨라요.', '3 : 4 = 12 : □ → 4배 → □ = 16'],
    r62b: ['전체를 a : b로 나누면 한쪽은 전체 × a/(a + b).', '전체를 (a + b)로 나눈 한 묶음을 먼저 구해요.', '35개를 3 : 4로 → 한 묶음 5개 → 15개, 20개'],
    c62a: ['원주 = 지름 × 원주율', '반지름을 주면 먼저 2배 해서 지름으로!', '× 3.14 = × 3 + × 0.14: 10 × 3.14 = 30 + 1.4 = 31.4'],
    c62b: ['원의 넓이 = 반지름 × 반지름 × 원주율', '5 × 5 = 25 → 25 × 3.14 = 78.5', '지름을 주면 반으로 나눠 반지름부터!'],
    c62c: ['지름 = 원주 ÷ 원주율', '3.14 × □ = 원주 → □를 어림해 보고 곱해서 확인해요.', '31.4 ÷ 3.14 = 10'],
    y62a: ['원기둥 전개도의 옆면은 직사각형이에요.', '옆면의 가로 = 밑면의 둘레(원주), 옆면의 세로 = 원기둥의 높이', '반지름 3 cm → 가로 6 × 3.14 = 18.84 cm']
  };

  // ── 학년·단원 ──
  C.GRADES = [
    {id: 'e4-2', name: '4학년 2학기', units: [
      {key: 'e42u1', title: '1. 분수의 덧셈과 뺄셈', types: ['f42a', 'f42b', 'f42c']},
      {key: 'e42u2', title: '2. 삼각형', types: ['t42a', 't42b']},
      {key: 'e42u3', title: '3. 소수의 덧셈과 뺄셈', types: ['d42a', 'd42b']},
      {key: 'e42u4', title: '4. 사각형', types: ['q42a', 'q42b']},
      {key: 'e42u6', title: '6. 다각형', types: ['p42a', 'p42b', 'p42c']},
      {key: 'e42m', title: '★ 사고력 연산', types: ['m1', 'm2', 'm3', 't42b', 'd42b']}]},
    {id: 'e5-2', name: '5학년 2학기', units: [
      {key: 'e52u1', title: '1. 수의 범위와 어림하기', types: ['r52a', 'r52b']},
      {key: 'e52u2', title: '2. 분수의 곱셈', types: ['f52a', 'f52b', 'f52c']},
      {key: 'e52u4', title: '4. 소수의 곱셈', types: ['d52a', 'd52b', 'd52c']},
      {key: 'e52u5', title: '5. 직육면체', types: ['b52a']},
      {key: 'e52u6', title: '6. 평균과 가능성', types: ['a52a', 'a52b']},
      {key: 'e52m', title: '★ 사고력 연산', types: ['m1', 'm2', 'm3', 'a52b', 'd52c']}]},
    {id: 'e6-2', name: '6학년 2학기', units: [
      {key: 'e62u1', title: '1. 분수의 나눗셈', types: ['f62a', 'f62b', 'f62c']},
      {key: 'e62u2', title: '2. 소수의 나눗셈', types: ['d62a', 'd62b']},
      {key: 'e62u4', title: '4. 비례식과 비례배분', types: ['r62a', 'r62b']},
      {key: 'e62u5', title: '5. 원의 넓이', types: ['c62a', 'c62b', 'c62c']},
      {key: 'e62u6', title: '6. 원기둥, 원뿔, 구', types: ['y62a']},
      {key: 'e62m', title: '★ 사고력 연산', types: ['m1', 'm2', 'm3', 'r62b', 'c62c']}]}
  ];
  C.unit = key => { for (const g of C.GRADES) for (const u of g.units) if (u.key === key) return {g, u}; return null; };

  // ── 용어 맞히기(교재 개념 쪽 문장) — 뜻 → 낱말 ──
  C.WORDS = {
    'e4-2': [['분자가 분모보다 작은 분수', '진분수'], ['분자가 분모와 같거나 분모보다 큰 분수', '가분수'], ['자연수와 진분수로 이루어진 분수', '대분수'],
      ['두 변의 길이가 같은 삼각형', '이등변삼각형'], ['세 변의 길이가 같은 삼각형', '정삼각형'], ['세 각이 모두 예각인 삼각형', '예각삼각형'], ['한 각이 둔각인 삼각형', '둔각삼각형'],
      ['0°보다 크고 직각보다 작은 각', '예각'], ['직각보다 크고 180°보다 작은 각', '둔각'],
      ['두 직선이 만나서 이루는 각이 직각일 때, 두 직선의 관계', '수직'], ['두 직선이 서로 수직일 때, 한 직선을 다른 직선에 대해 부르는 이름', '수선'], ['평행한 두 직선', '평행선'],
      ['평행한 변이 한 쌍이라도 있는 사각형', '사다리꼴'], ['마주 보는 두 쌍의 변이 서로 평행한 사각형', '평행사변형'], ['네 변의 길이가 모두 같은 사각형', '마름모'],
      ['수량을 점으로 표시하고, 그 점들을 선분으로 이어 그린 그래프', '꺾은선그래프'],
      ['선분으로만 둘러싸인 도형', '다각형'], ['변의 길이가 모두 같고, 각의 크기가 모두 같은 다각형', '정다각형'], ['다각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분', '대각선']],
    'e5-2': [['어떤 수와 같거나 큰 수', '이상'], ['어떤 수와 같거나 작은 수', '이하'], ['어떤 수보다 큰 수', '초과'], ['어떤 수보다 작은 수', '미만'],
      ['구하려는 자리 아래 수를 올려서 나타내는 방법', '올림'], ['구하려는 자리 아래 수를 버려서 나타내는 방법', '버림'], ['구하려는 자리 바로 아래 자리의 숫자가 0~4이면 버리고, 5~9이면 올려서 나타내는 방법', '반올림'],
      ['모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형의 관계', '합동'], ['합동인 두 도형을 포개었을 때 겹치는 점', '대응점'],
      ['한 직선을 따라 접었을 때 완전히 겹치는 도형', '선대칭도형'], ['선대칭도형을 접은 그 직선', '대칭축'],
      ['어떤 점을 중심으로 180° 돌렸을 때 처음 도형과 완전히 겹치는 도형', '점대칭도형'], ['점대칭도형에서 돌리는 중심이 되는 점', '대칭의 중심'],
      ['직사각형 6개로 둘러싸인 도형', '직육면체'], ['정사각형 6개로 둘러싸인 도형', '정육면체'], ['직육면체에서 면과 면이 만나는 선분', '모서리'], ['직육면체에서 모서리와 모서리가 만나는 점', '꼭짓점'],
      ['직육면체에서 서로 평행한 두 면', '밑면'], ['직육면체의 모서리를 잘라서 펼친 그림', '전개도'],
      ['자료의 값을 모두 더해 자료의 수로 나눈 값', '평균']],
    'e6-2': [['비율이 같은 두 비를 기호 =를 사용하여 나타낸 식', '비례식'], ['비례식에서 바깥쪽에 있는 두 항', '외항'], ['비례식에서 안쪽에 있는 두 항', '내항'],
      ['전체를 주어진 비로 배분하는 것', '비례배분'], ['비 3 : 5에서 기호 : 앞에 있는 3', '전항'], ['비 3 : 5에서 기호 : 뒤에 있는 5', '후항'],
      ['원의 둘레', '원주'], ['원의 지름에 대한 원주의 비율', '원주율'],
      ['두 면이 서로 평행하고 합동인 원으로 이루어진 기둥 모양의 입체도형', '원기둥'], ['평평한 면이 원이고 옆을 둘러싼 면이 굽은 면인 뿔 모양의 입체도형', '원뿔'], ['공 모양의 입체도형', '구'],
      ['원뿔에서 뿔의 꼭짓점과 밑면인 원의 둘레의 한 점을 이은 선분', '모선']]
  };
  C.word = gid => {
    const W = C.WORDS[gid]; if (!W || W.length < 4) return null;
    const [def, ans] = pick(W), others = W.map(x => x[1]).filter(x => x !== ans).sort(() => Math.random() - .5).slice(0, 3);
    return {word: 1, q: def, ans, choices: [ans].concat(others).sort(() => Math.random() - .5), sec: 7};
  };

  /* 한 판 = 10문제(용어 2문제 섞음). key = 단원 키 또는 'w:<학년>'(용어만) */
  C.round = (key, n) => {
    n = n || 10;
    if (key.startsWith('w:')) return Array.from({length: n}, () => C.word(key.slice(2)));
    const {g, u} = C.unit(key), out = [];
    const wpos = C.WORDS[g.id] ? [3, 7] : [];
    let last = '';
    for (let i = 0; i < n; i++) {
      if (wpos.includes(i)) { out.push(C.word(g.id)); continue; }
      let t = pick(u.types); if (u.types.length > 1 && t === last) t = pick(u.types.filter(x => x !== t));
      last = t; const p = T[t].gen(); p.type = t; p.sec = T[t].sec; out.push(p);
    }
    return out;
  };
  /* 답 확인: form 에 맞춰 넣은 값 → 분수 값으로 */
  C.parse = (inp, form) => {
    if (form === 'frac') {
      const w = +(inp.w || 0), n = inp.n === '' ? NaN : +inp.n, d = inp.d === '' ? NaN : +inp.d;
      if (!inp.n && !inp.d && inp.w) return R(w);
      if (!(d > 0) || isNaN(n)) return null;
      return R(w * d + n, d);
    }
    const s = String(inp.v || '').trim(); if (!/^\d+(\.\d+)?$/.test(s)) return null;
    const k = (s.split('.')[1] || '').length; return R(Math.round(parseFloat(s) * Math.pow(10, k)), Math.pow(10, k));
  };
  C.check = (p, inp) => { if (p.word) return inp.c === p.ans; const v = C.parse(inp, p.form); return !!(v && eq(v, p.a)); };
  /* 정답이지만 교재 모양이 아닐 때 한마디: 4학년(keep) = 가분수 → 대분수 / 5·6학년 = 약분·대분수 */
  C.better = (p, inp) => {
    if (p.form !== 'frac' || !inp.d) return '';
    const n = +inp.n, d = +inp.d;
    if (p.keep) return n >= d ? '대분수로 나타내면 ' + C.show(p.a, 'frac', p) : '';
    return gcd(n, d) === 1 && n < d ? '' : '약분하거나 대분수로 나타내면 ' + C.show(p.a, 'frac');
  };
  C.answerText = p => p.word ? p.ans : C.show(p.a, p.form, p) + (p.unit ? (p.unit === deg ? deg : ' ' + p.unit) : '');
  C.SPEED = {slow: ['느긋한 퉁구리', 1.5], mid: ['보통 퉁구리', 1], fast: ['날쌘 퉁구리', 0.7]};
  C.WIN_STARS = 10; C.WIN_MAX = 3;
})();
