// PolonceKart Service Worker
// index.html için "önce ağ" stratejisi: internet varsa her zaman en yeni sürüm iner,
// yoksa önbellekten çalışır. Diğer dosyalar önbellek-öncelikli.
const CACHE_VERSION = 'polonce-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Kurulum: tüm dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Aktivasyon: eski önbellekleri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = req.url.split('?')[0];
  const isIndex = req.mode === 'navigate' || url.endsWith('/index.html') || url.endsWith('/');
  if (isIndex) {
    // Önce ağ: güncel index.html'i indir, önbelleği tazele; çevrimdışıysa önbellekten ver
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        return resp;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Diğer dosyalar: önce önbellek, yoksa ağ
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).catch(() => caches.match('./index.html'));
    })
  );
});
