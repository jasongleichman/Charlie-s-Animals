const CACHE = 'animal-words-v2';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE)); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(request);
    if (hit) return hit;
    try {
      const res = await fetch(request);
      if (res && res.ok && new URL(request.url).origin === location.origin) {
        cache.put(request, res.clone());
      }
      return res;
    } catch (e) {
      return hit || Response.error();
    }
  })());
});
