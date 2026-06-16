const CACHE_NAME = 'aureo-cache-v2';
const ASSETS = [
  'index.html',
  'admin.html',
  'historial.html',
  'franquicias.html',
  'manifest.json',
  'icono-192.png',
  'icono-512.png'
];

// Instalar el Service Worker y guardar en caché los archivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Estrategia: Buscar primero en caché, si no está, ir a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

