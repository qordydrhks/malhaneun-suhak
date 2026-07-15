// 말하는 수학 서비스워커
// 설치형 앱(PWA) 요건을 충족하기 위한 최소 구성.
// 네트워크 우선(network-first)이라 파일을 새로 올리면 바로 반영됩니다.
const CACHE = 'dodream-v26';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // 네트워크 우선, 실패 시(오프라인) 캐시 시도
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (e.request.method === 'GET' && res.ok && new URL(e.request.url).origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
