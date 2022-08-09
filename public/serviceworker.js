/* eslint-disable no-restricted-globals */
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

const assets = [
    '/index.html',
    '/img/pills512.png',
    'home.json',
    'fallback.html',
    'fallback.css',
    '/resources/astronaut.png'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching assets');
            cache.addAll(assets).then(e => console.log(e)).catch(err => console.log(err));
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return fetchRes;
            });
        }).catch(() => {
            if (evt.request.url.indexOf('/') > -1) {
                return caches.match('/fallback.html');
            }
        })
    );
});