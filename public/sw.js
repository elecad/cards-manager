const CACHE_KEY = "pwa-cache"
const MESSAGES = {
    cache: "cache-start",
    clear: "clear",
    resources: "resources"
}
const CACHE_MAP = ["/src/assets/Barcode.png"]


self.addEventListener('install', async (event) => {
    console.log('[W] Установка завершена успешно');


});

self.addEventListener('activate', (event) => {
    console.log('[W] SW Активирован');

});

const cached = async (url) => {
    const cache = await caches.open(CACHE_KEY)
    const response = await fetch(url)
    if (!response.ok) {
        console.error("[W] Ошибка кэширования", response)
        return
    }
    await cache.put(url, response)
}

const fetchHandler = async (event) => {
    const cache = await caches.open(CACHE_KEY)
    const cachedResponse = await cache.match(event.request.url)
    if (cachedResponse) {
        await cached(event.request.url)
        return cachedResponse
    } else {
        return await fetch(event.request.url);
    }
}

self.addEventListener('fetch', async (event) => {
    console.log("[W]", event.request)
    event.respondWith(fetchHandler(event))

})

self.addEventListener('message', async (event) => {
    console.log(self.clients)
    const type = event.data
    console.log('[W]', type)
    for (const url of CACHE_MAP) {
        await cached(url)
    }
    // From service-worker.js:
    const channel = new BroadcastChannel('sw-messages');
    channel.postMessage({title: 'Hello from SW'});
    console.log('[W] Конец кэширования')
})



