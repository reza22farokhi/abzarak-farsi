// Cache version - bump this when making major changes
const CACHE = 'abzarak-v117';
const PRECACHE = [
  './',
  './index.html',
  './css/style.css',
  './manifest.json',
  './favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).catch(() => {})
  );
  // ⚡ مهم: SW جدید بلافاصله فعال شود
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  // ⚡ مهم: کنترل فوری همه صفحات باز
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  const acceptHeader = e.request.headers.get('accept') || '';
  const isHtml = acceptHeader.includes('text/html') 
                 || e.request.url.endsWith('.html')
                 || e.request.url.endsWith('/')
                 || !e.request.url.split('/').pop().includes('.');

  if (isHtml) {
    // Network-First برای HTML
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
        }
        return resp;
      }).catch(() => 
        caches.match(e.request).then(cached => cached || caches.match('./index.html'))
      )
    );
  } else {
    // Cache-First برای استاتیک
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
          }
          return resp;
        });
      })
    );
  }
});
