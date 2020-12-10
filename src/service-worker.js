importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

import "regenerator-runtime";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

if (workbox) {
    console.log(`Yay! Workbox is loaded`);
} else {
    console.log(`Boo! Workbox didn't load`);
}

precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/],
});

registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    new CacheFirst({
        cacheName: "images-cache",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);

registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    new StaleWhileRevalidate({
        cacheName: "api-response"
    })
);



self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: './icons/icon-192x192.png',
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