const CACHE_NAME = 'aureo-cache-v3';
const ASSETS = [
  './index.html',
  './admin.html',
  './historial.html',
  './franquicias.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) return response;
      return fetch(e.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (e.request.url.startsWith('http')) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => caches.match('./index.html'));
    })
  );
});
