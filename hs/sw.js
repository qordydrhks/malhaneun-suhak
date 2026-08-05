/* 가르치는 수학 · 고등 — 서비스 워커
   캐시 이름은 말하는 수학(dodream-…)과 반드시 달라야 합니다.
   앱을 새로 올릴 때마다 아래 숫자만 올리면 학생 기기가 새 버전을 받습니다. */
const CACHE = 'hs-concept-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('hs-concept-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // Supabase·AI 호출은 건드리지 않음

  // 화면 파일은 네트워크 먼저, 실패하면 캐시 (새 버전이 바로 반영되게)
  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
