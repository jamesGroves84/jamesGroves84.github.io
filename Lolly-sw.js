// ServiceWorker //
var cacheName = 'c';
var filesToCache = [
    '/Lolly/',
    '/Lolly/index.htm',
    '/Lolly/css/base.css',
    '/Lolly/js/main.js'
];

// Cache all content //
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(filesToCache);
        })
    );
});

// Return Cached Content //
self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
});
// End of ServiceWorker //