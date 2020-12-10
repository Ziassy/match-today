const CACHE_NAME = "football v-2";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/detail-teams.html",
  "/pages/home.html",
  "/pages/standing.html",
  "/pages/match.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/manifest.json",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/notification.js",
  "/js/team-sw.js",
  "/js/push.js",
  "/assets/icons/icon.png",
  "/assets/icons/icon-192x192.png",
  "/assets/images/57.svg",
  "/assets/images/58.svg",
  "/assets/images/61.svg",
  "/assets/images/62.svg",
  "/assets/images/64.svg",
  "/assets/images/65.svg",
  "/assets/images/66.svg",
  "/assets/images/67.svg",
  "/assets/images/68.svg",
  "/assets/images/73.svg",
  "/assets/images/76.svg",
  "/assets/images/328.svg",
  "/assets/images/338.svg",
  "/assets/images/340.svg",
  "/assets/images/346.svg",
  "/assets/images/354.svg",
  "/assets/images/356.svg",
  "/assets/images/397.svg",
  "/assets/images/563.svg",
  "/assets/images/1044.svg",
  "https://fonts.googleapis.com/icon?family=Material+Icons"

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  const base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'assets/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});