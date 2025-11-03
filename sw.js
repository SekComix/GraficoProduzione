const CACHE_NAME = 'grafico-produzione-cache-v3'; // Ho incrementato la versione a v3
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './logo.png',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js'
];

// 1. Installazione del Service Worker e salvataggio dei file in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache v3 aperta e file salvati');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Intercettazione delle richieste di rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è in cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, la richiede alla rete
        return fetch(event.request);
      })
  );
});

// 3. Attivazione e pulizia delle vecchie cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Cancella tutte le cache che non sono quella attuale (es. v1, v2)
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
