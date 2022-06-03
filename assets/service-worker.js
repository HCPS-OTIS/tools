var GHPATH = '';
var APP_PREFIX = 'gppwa_';
var VERSION = 'version_002';
var URLS = [
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/chromebooks.html`,
    `${GHPATH}/windows.html`,
    `${GHPATH}/workorders.html`,
    `${GHPATH}/assets/style.css`,
    `${GHPATH}/assets/fonts/roboto/Roboto-Regular.ttf`,
    `${GHPATH}/assets/fonts/roboto/Roboto-Black.ttf`,
    `${GHPATH}/assets/fonts/roboto/Roboto-Bold.ttf`,
    `${GHPATH}/assets/fonts/roboto/Roboto-Medium.ttf`,
    `${GHPATH}/assets/fonts/roboto/Roboto-Light.ttf`,
    `${GHPATH}/assets/icon/apple-touch-icon-120x120.png`,
    `${GHPATH}/assets/icon/mstile-144x144.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-76x76.png`,
    `${GHPATH}/assets/icon/favicon-32x32.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-144x144.png`,
    `${GHPATH}/assets/icon/favicon.svg`,
    `${GHPATH}/assets/icon/apple-touch-icon-72x72.png`,
    `${GHPATH}/assets/icon/favicon-512.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-114x114.png`,
    `${GHPATH}/assets/icon/favicon-96x96.png`,
    `${GHPATH}/assets/icon/favicon-192.png`,
    `${GHPATH}/assets/icon/favicon-196x196.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-60x60.png`,
    `${GHPATH}/assets/icon/mstile-310x310.png`,
    `${GHPATH}/assets/icon/mstile-310x150.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-152x152.png`,
    `${GHPATH}/assets/icon/mstile-70x70.png`,
    `${GHPATH}/assets/icon/favicon.ico`,
    `${GHPATH}/assets/icon/favicon-16x16.png`,
    `${GHPATH}/assets/icon/favicon-128.png`,
    `${GHPATH}/assets/icon/apple-touch-icon-57x57.png`,
    `${GHPATH}/assets/icon/mstile-150x150.png`,
    `${GHPATH}/assets/script.js`
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
    console.log('Fetch request : ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('Responding with cache : ' + e.request.url);
                return request
            } else {
                console.log('File is not cached, fetching : ' + e.request.url);
                return fetch(e.request)
            }
        })
    )
})

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS)
        })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            var cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX)
            })
            cacheWhitelist.push(CACHE_NAME);
            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('Deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i])
                }
            }))
        })
    )
})