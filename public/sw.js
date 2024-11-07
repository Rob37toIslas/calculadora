const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',                // URL base
  '/index.html',      // HTML principal
  '/manifest.json', 
  '/sw.js',   
  '/img/icons/icon192x192.png',  // Icono de la PWA
  '/img/icons/icon512x512.png',  // Icono de la PWA
  '/src/main.js',   
  '/src/assets/images.jpeg', // Otro icono necesario
  '/src/app.vue',   
  '/src/components/modal.vue',  
  '/src/registerServiceWorker.js', // Registro del SW
  '/src/assets/main.css',   // Archivo CSS principal
  '/src/assets/12482.jpg', // Otro icono necesario
  '/src/assets/chido.jpg', // Otro icono necesario
  '/src/assets/images.jpeg', // Otro icono necesario
  '/src/assets/oyegelda.mp3', // Otro icono necesario
  '/src/assets/main.css', // Otro icono necesario
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
