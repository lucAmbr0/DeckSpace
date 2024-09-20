const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    'style.css',
    'index.js',
    'assets/deck1/1.0.png',
    'assets/deck1/1.1.png',
    'assets/deck1/1.2.png',
    'assets/deck1/1.3.png',
    'assets/deck1/10.0.png',
    'assets/deck1/10.1.png',
    'assets/deck1/10.2.png',
    'assets/deck1/10.3.png',
    'assets/deck1/11.0.png',
    'assets/deck1/11.1.png',
    'assets/deck1/11.2.png',
    'assets/deck1/11.3.png',
    'assets/deck1/12.0.png',
    'assets/deck1/12.1.png',
    'assets/deck1/12.2.png',
    'assets/deck1/12.3.png',
    'assets/deck1/13.0.png',
    'assets/deck1/13.1.png',
    'assets/deck1/13.2.png',
    'assets/deck1/13.3.png',
    'assets/deck1/2.0.png',
    'assets/deck1/2.1.png',
    'assets/deck1/2.2.png',
    'assets/deck1/2.3.png',
    'assets/deck1/3.0.png',
    'assets/deck1/3.1.png',
    'assets/deck1/3.2.png',
    'assets/deck1/3.3.png',
    'assets/deck1/4.0.png',
    'assets/deck1/4.1.png',
    'assets/deck1/4.2.png',
    'assets/deck1/4.3.png',
    'assets/deck1/5.0.png',
    'assets/deck1/5.1.png',
    'assets/deck1/5.2.png',
    'assets/deck1/5.3.png',
    'assets/deck1/6.0.png',
    'assets/deck1/6.1.png',
    'assets/deck1/6.2.png',
    'assets/deck1/6.3.png',
    'assets/deck1/7.0.png',
    'assets/deck1/7.1.png',
    'assets/deck1/7.2.png',
    'assets/deck1/7.3.png',
    'assets/deck1/8.0.png',
    'assets/deck1/8.1.png',
    'assets/deck1/8.2.png',
    'assets/deck1/8.3.png',
    'assets/deck1/9.0.png',
    'assets/deck1/9.1.png',
    'assets/deck1/9.2.png',
    'assets/deck1/9.3.png',
    'assets/covered/back1.png',
    'assets/covered/back2.png',
    'assets/covered/back3.png',
    'assets/covered/back4.png',
    'assets/covered/back5.png',
    'assets/covered/back6.png',
    'assets/covered/back7.png',
    'assets/covered/back8.png',
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files  ');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Call fetch event

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(e.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    )
})