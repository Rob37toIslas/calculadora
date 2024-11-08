const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',               
  '/index.html',      
  '/manifest.json', 
  '/sw.js',   

  '/img/icons/icon192x192.png',  
  '/img/icons/icon512x512.png',  
  '/src/main.js',   
  '/src/app.vue',   
  '/src/components/modal.vue',  

  '/src/registerServiceWorker.js', 

  '/src/assets/12482.png', 
  '/src/assets/chido.jpg', 
  '/src/assets/images.jpeg', 
  '/src/assets/oyegelda.mp3', 
  '/src/assets/main.css', 
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
        return fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match(urlsToCache);
          }
        });
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
