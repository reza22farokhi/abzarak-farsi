// ═══════════════════════════════════════
// NETWORK-FIRST Service Worker
// با پاک کردن کامل کش و بارگذاری مستقیم از شبکه
// ═══════════════════════════════════════
const CACHE_VERSION = 'abzarak-network-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // فقط GET
  if (e.request.method !== 'GET') return;
  
  // فایل‌های خارجی رو دست نزن
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  
  // همه چیز از شبکه، bypass کامل کش مرورگر
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .catch(() => caches.match(e.request))
  );
});
