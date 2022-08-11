/* eslint-disable no-restricted-globals */
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

let ENABLE_DYNAMIC_CACHING = true;

const assets = [
    '/index.html',
    '/img/pills512.png',
    '/default-album.jpg',
    '/default-album-large.jpg',
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
            cache.addAll(assets).catch(err => console.log(err));
        })
    );
});

// fetch event
function handleError(evt) {
    console.log('hoho')
    if (evt.request.url.indexOf('/') > -1)
        return caches.match('/fallback.html');
}

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET')
        return;

    if (event.request.url.indexOf('.jpg') !== -1) {
        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            try {
                const response = await fetch(event.request);

                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                if (ENABLE_DYNAMIC_CACHING) {
                    const responseToCache = response.clone();
                    const cache = await caches.open(dynamicCacheName)
                    await cache.put(event.request, responseToCache);
                }

                return response;
            } catch (error) {
                return handleError(event);
            }

        })());
    }
});