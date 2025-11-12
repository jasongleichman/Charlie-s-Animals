// docs/sw.js — safe http/https-only caching
const CACHE_NAME = "ca-v1";
const CORE = ["./","./index.html","./assets/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const ok = CORE.filter(u => /^https?:/.test(new URL(u, self.location).href));
    await cache.addAll(ok);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (!url.startsWith("http")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    if (cached) return cached;

    try {
      const resp = await fetch(event.request);
      if (event.request.method === "GET" && new URL(url).origin === self.location.origin) {
        try { await cache.put(event.request, resp.clone()); } catch {}
      }
      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});
