/* 새 앱 — 첫 화면(로그인). 이야기: 우주 몬스터 퉁구리가 별빛을 삼키고 E4-2 은하에 숨었다.
   숫자 탐험대(숫자 친구들)가 우주의 언어인 수학으로 미션을 풀며 퉁구리를 쫓는다. (마스터 10/8)
   · 하늘(canvas): 반짝이는 별 · 가끔 별똥별 · 퉁구리 입으로 빨려 들어가는 별빛 알갱이
   · 퉁구리를 누르면 놀리는 말 · 탐험대 다섯이 줄지어 대기
   A.intro(onLogin) 로 그린다. 그림을 바꾸려면 app/img/tunguri.webp 만 바꾸면 된다. */
(() => {
  'use strict';
  const A = window.APP, esc = A.esc;
  const TAUNT = ['흥! 잡아 볼 테면 잡아 봐~', '별빛은 내 간식이야. 냠냠.', '수학? 그게 뭔데. 흥.', '여기까지 오다니… 제법인데?',
                 '나 찾으려면 문제 많이 풀어야 할걸?', '꺼억— 방금 별 하나 먹었어.', '…따, 딱히 무서운 건 아니거든!', '직선은 싫어. 빙글빙글 돌아서 숨을 거야.'];
  const SQUAD = ['exi', 'pola', 'aresi', 'iris', 'lemma'];
  let raf = 0;

  A.intro = (onLogin, msg) => {
    cancelAnimationFrame(raf);
    const root = document.getElementById('app');
    document.body.classList.add('intro-on');
    root.innerHTML = `<section class="lg">
      <canvas class="lg-sky" id="lgSky"></canvas>
      <div class="lg-top"><span class="lg-badge"><i></i>긴급 수배 · E4-2 은하</span></div>
      <div class="lg-stage" id="lgStage">
        <div class="lg-hud"><b></b><b></b><b></b><b></b><span class="scan"></span></div>
        <img class="lg-tung" id="lgTung" src="img/tunguri.webp" alt="우주 몬스터 퉁구리">
        <div class="lg-taunt" id="lgTaunt"></div>
        <div class="lg-wanted"><small>목표 발견</small><b>우주 몬스터 퉁구리</b><span>특기 · 별빛 삼키기 &nbsp;|&nbsp; 위험도 ★★★</span></div>
      </div>
      <h1 class="lg-title"><span>말하는</span> 수학</h1>
      <p class="lg-story">퉁구리가 은하의 별빛을 삼키고 숨어 버렸어!<br><b>우주의 언어, 수학</b>으로 미션을 풀어 별빛을 되찾자.</p>
      <div class="lg-squad">${SQUAD.map((id, i) => `<img src="../characters/img/${id}/base.webp" alt="" style="--d:${i * 0.18}s">`).join('')}</div>
      <form class="lg-form" id="lgForm" autocomplete="on">
        <div class="lg-ttl">숫자 탐험대 출동 준비</div>
        <label><span>탐험대원 이름</span><input id="ln" autocomplete="username" placeholder="이름"></label>
        <label><span>비밀 코드</span><input id="lp" type="password" autocomplete="current-password" placeholder="비밀번호"></label>
        <button class="lg-go" type="submit">출동!</button>
        <div class="lg-msg" id="lgMsg">${esc(msg || '')}</div>
      </form>
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
    // 퉁구리 놀리기
    const tung = document.getElementById('lgTung'), taunt = document.getElementById('lgTaunt');
    let ti = Math.floor(Math.random() * TAUNT.length), tt = 0;
    const say = () => { taunt.textContent = TAUNT[ti++ % TAUNT.length]; taunt.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => taunt.classList.remove('on'), 2600); };
    tung.onclick = () => { tung.classList.remove('boing'); void tung.offsetWidth; tung.classList.add('boing'); say(); };
    setTimeout(say, 1600);
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
    const mouth = () => {                       // 퉁구리 입(그림의 왼쪽 위 1/4쯤) — 화면 좌표
      const img = document.getElementById('lgTung'); if (!img) return null;
      const r = img.getBoundingClientRect(), c = cv.getBoundingClientRect();
      return {x: r.left - c.left + r.width * 0.22, y: r.top - c.top + r.height * 0.33};
    };
    const spawn = (mo) => {                     // 별빛 알갱이 — 화면 가장자리에서 입으로
      const a = Math.random() * 6.28, R = Math.max(W, H) * (0.35 + Math.random() * 0.3);
      dust.push({x: mo.x + Math.cos(a) * R, y: mo.y + Math.sin(a) * R, a, R, w: (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.6), life: 0});
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
        const mo = mouth();
        if (mo) {
          if (dust.length < 34 && Math.random() < 0.3) spawn(mo);
          for (const d of dust) {
            d.life += dt; d.R *= 0.985; d.a += d.w * dt / 1000 * (1 + 260 / (d.R + 20));
            d.x = mo.x + Math.cos(d.a) * d.R; d.y = mo.y + Math.sin(d.a) * d.R * 0.7;
            const al = Math.min(1, d.life / 500) * Math.min(1, d.R / 40);
            ctx.fillStyle = `rgba(255,220,130,${al})`; ctx.shadowColor = 'rgba(255,210,110,.9)'; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1.8, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
          }
          dust = dust.filter(d => d.R > 6);
        }
      }
      if (document.getElementById('lgSky')) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }
})();
