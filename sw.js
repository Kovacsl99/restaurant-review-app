const actualCacheName = 'restaurant_v1';

// Install service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(actualCacheName).then(function(cache) {
        return cache.addAll(
          [
            './',
            './css/styles.css',
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './js/dbhelper.js',
            './js/main.js',
            './js/restaurant_info.js',
            './sw.js',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
            'index.html',
            'restaurant.html'
          ]
        );
      })
    );
  });

// Activate sw and delete old cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != actualCacheName;
          }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch events handling
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
      })
      .catch(function(err) {
        console.log(err, event.request);
      })
    );
});
