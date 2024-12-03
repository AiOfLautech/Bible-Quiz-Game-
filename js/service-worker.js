self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('bible-quiz-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/game.js',
        '/js/leaderboard.js',
        '/manifest.json',
        '/images/icon.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
