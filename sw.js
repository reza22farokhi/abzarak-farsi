const CACHE = 'abzarak-v3';
const PRECACHE = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './css/style.css',
  './manifest.json',
  './favicon.svg',
  './fonts/Vazirmatn-Regular.woff2',
  './fonts/Vazirmatn-Medium.woff2',
  './fonts/Vazirmatn-SemiBold.woff2',
  './fonts/Vazirmatn-Bold.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
        }
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
