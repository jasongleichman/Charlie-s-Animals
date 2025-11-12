// sw.js — safe http/https-only caching + basic app shell

const CACHE_NAME = "ca-v1";
const CORE = [
  "./",                 // docs/ root
  "./index.html",
  "./assets/manifest.json"
  // add other local, http(s) files you own (css/js) if you have them
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Only cache http/https URLs you control
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
  // Ignore non-http(s) schemes (chrome-extension, data, file, etc.)
  if (!url.startsWith("http")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    if (cached) return cached;

    try {
      const resp = await fetch(event.request);
      // Only cache GET + same-origin http(s)
      if (event.request.method === "GET" && new URL(url).origin === self.location.origin) {
        try { await cache.put(event.request, resp.clone()); } catch {}
      }
      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});
