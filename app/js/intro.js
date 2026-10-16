/* 새 앱 — 첫 화면(로그인). 이야기: 우주 몬스터 퉁구리가 별빛을 삼키고 E4-2 은하에 숨었다.
   마스터 10/12: 첫 화면은 뚜삐와 퉁구리 둘만 — 뚜삐가 퉁구리를 잡으려고 쫓아가는 모습. 숫자 친구 고르기는 로그인 뒤에.
   · 하늘(canvas): 반짝이는 별 · 가끔 별똥별 · 퉁구리가 흘리는 별빛 가루(뚜삐가 그걸 따라 달린다)
   · 뚜삐가 다가가면 퉁구리가 쌩 달아난다(반복) · 퉁구리를 누르면 놀리는 말, 뚜삐를 누르면 한마디
   그림: app/img/tunguri.webp · app/img/ddoopi.webp (원본 작업도구/캐릭터/ddoopi_run_src.png) */
(() => {
  'use strict';
  const A = window.APP, esc = A.esc;
  const TAUNT = ['흥! 잡아 볼 테면 잡아 봐~', '별빛은 내 간식이야. 냠냠.', '수학? 그게 뭔데. 흥.', '여기까지 오다니… 제법인데?',
                 '나 찾으려면 문제 많이 풀어야 할걸?', '꺼억— 방금 별 하나 먹었어.', '…따, 딱히 무서운 건 아니거든!', '병아리한테 잡힐 내가 아니지!'];
  const CHEER = ['거기 서, 퉁구리!', '별빛 돌려줘!', '수학으로 꼭 잡을 거야!', '같이 쫓아가자!'];
  let raf = 0;

  A.intro = (onLogin, msg) => {
    cancelAnimationFrame(raf);
    const root = document.getElementById('app');
    document.body.classList.add('intro-on');
    root.innerHTML = `<section class="lg">
      <canvas class="lg-sky" id="lgSky"></canvas>
      <div class="lg-run" id="lgRun">
        <div class="lg-tw"><img class="lg-tung" id="lgTung" src="img/tunguri.webp" alt="우주 몬스터 퉁구리"></div>
        <div class="lg-dw"><img class="lg-dd" id="lgDd" src="img/ddoopi.webp" alt="뚜삐"></div>
        <div class="lg-taunt" id="lgTaunt"></div><div class="lg-cheer" id="lgCheer"></div>
      </div>
      <h1 class="lg-title"><span>말하는</span> 수학</h1>
      <p class="lg-story">퉁구리가 삼킨 별빛을 <b>수학</b>으로 되찾자!</p>
      <form class="lg-form" id="lgForm" autocomplete="on">
        <label><span>탐험대원 이름</span><input id="ln" autocomplete="username" placeholder="이름"></label>
        <label><span>비밀 코드</span><input id="lp" type="password" autocomplete="current-password" placeholder="비밀번호"></label>
        <button class="lg-go" type="submit">출동!</button>
        <div class="lg-msg" id="lgMsg">${esc(msg || '')}</div>
      </form>
      <div class="lg-links"><a class="lg-teacher" href="teacher.html">선생님</a><a class="lg-teacher" href="try.html">중등·고등 체험</a></div>
    </section>`;
    // 로그인
    const form = document.getElementById('lgForm'), m = document.getElementById('lgMsg');
    form.onsubmit = async e => {
      e.preventDefault();
      const n = document.getElementById('ln').value, p = document.getElementById('lp').value;
      if (!n.trim() || !p) { m.textContent = '이름과 비밀 코드를 넣어 줘.'; return; }
      m.textContent = '탐험대원 확인 중…';
      try { await A.login(n, p); stop(); await onLogin(); } catch (err) { m.textContent = err.message; }
    };
    // 말풍선
    const bubble = (el, arr, st) => { el.textContent = arr[st.i++ % arr.length]; el.classList.add('on'); clearTimeout(st.t); st.t = setTimeout(() => el.classList.remove('on'), 2400); };
    const tung = document.getElementById('lgTung'), dd = document.getElementById('lgDd');
    const ts = {i: Math.floor(Math.random() * TAUNT.length), t: 0}, cs = {i: 0, t: 0};
    tung.onclick = () => { tung.classList.remove('boing'); void tung.offsetWidth; tung.classList.add('boing'); bubble(document.getElementById('lgTaunt'), TAUNT, ts); };
    dd.onclick = () => { dd.classList.remove('jump'); void dd.offsetWidth; dd.classList.add('jump'); bubble(document.getElementById('lgCheer'), CHEER, cs); };
    setTimeout(() => document.getElementById('lgTaunt') && bubble(document.getElementById('lgTaunt'), TAUNT, ts), 1800);
    sky();
  };
  function stop() { cancelAnimationFrame(raf); document.body.classList.remove('intro-on'); }
  A.introStop = stop;

  // ── 하늘 ──
  function sky() {
    const cv = document.getElementById('lgSky'); if (!cv) return;
    const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, stars = [], dust = [], shoot = null, t0 = performance.now(), nextShoot = 2500;
    const fit = () => {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({length: Math.round(W * H / 5200)}, () => ({x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.25, p: Math.random() * 6.28, s: 0.6 + Math.random() * 1.6,
        c: Math.random() < 0.12 ? '255,214,140' : Math.random() < 0.2 ? '170,200,255' : '255,255,255'}));
    };
    fit(); addEventListener('resize', fit);
    const tail = () => {                        // 퉁구리 몸 아래쪽 — 훔친 별빛이 새어 나오는 곳
      const img = document.getElementById('lgTung'); if (!img) return null;
      const r = img.getBoundingClientRect(), c = cv.getBoundingClientRect();
      return {x: r.left - c.left + r.width * (0.25 + Math.random() * 0.35), y: r.top - c.top + r.height * (0.55 + Math.random() * 0.3)};
    };
    const loop = (now) => {
      const dt = Math.min(50, now - t0); t0 = now;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const tw = still ? 0.8 : 0.55 + 0.45 * Math.sin(s.p + now / 1000 * s.s);
        ctx.fillStyle = `rgba(${s.c},${tw})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
      }
      if (!still) {
        nextShoot -= dt;
        if (!shoot && nextShoot < 0) { shoot = {x: W * (0.3 + Math.random() * 0.7), y: Math.random() * H * 0.35, v: 0.9 + Math.random() * 0.5, l: 0}; nextShoot = 4000 + Math.random() * 5000; }
        if (shoot) {
          shoot.l += dt; const k = shoot.l / 900, x = shoot.x - k * 420 * shoot.v, y = shoot.y + k * 200 * shoot.v;
          const g = ctx.createLinearGradient(x, y, x + 90, y - 43); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y - 43); ctx.stroke();
          if (k > 1) shoot = null;
        }
        // 퉁구리가 흘리는 별빛 가루 — 왼쪽(뚜삐 쪽)으로 흩날리다 사라진다
        if (dust.length < 40 && Math.random() < 0.35) { const p = tail(); if (p) dust.push({x: p.x, y: p.y, vx: -(0.04 + Math.random() * 0.06), vy: -(0.005 + Math.random() * 0.02), life: 0, max: 1200 + Math.random() * 900, r: 1.2 + Math.random() * 1.4}); }
        for (const d of dust) {
          d.life += dt; d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 0.00002 * dt;
          const al = Math.min(1, d.life / 200) * Math.max(0, 1 - d.life / d.max);
          ctx.fillStyle = `rgba(255,222,130,${al})`; ctx.shadowColor = 'rgba(255,210,110,.9)'; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
        }
        dust = dust.filter(d => d.life < d.max);
      }
      if (document.getElementById('lgSky')) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }
})();
