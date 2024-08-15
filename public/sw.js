const MESSAGES = {
    done: "cache-done",
    check: "cache-check",
    resource: "cache-resource",
}

const CACHE_KEY = "pwa-cache"
const CHANEL_KEY = "sw-chanel"

const CACHE_MAP = ["/Barcode.png", "/index.html", "/sw.js", "/vite.svg", "/zxing_reader.wasm", "/logo/absolute.png", "/logo/chitaj-gorod.png", "/logo/detskij-mir.png", "/logo/eldorado.png", "/logo/evropa.png", "/logo/funday.png", "/logo/imperiya-sumok.png", "/logo/kari.png", "/logo/lenta.png", "/logo/linia.png", "/logo/magnit.png", "/logo/not-found.png", "/logo/ostin.png", "/logo/planeta-zdorovya.png", "/logo/poryadok.png", "/logo/pyatyorochka.png", "/logo/sportmaster.png", "/logo/stalos.png", "/logo/vite.png", "/assets/index-DkHXRrSn.js", "/assets/index-FaYkmPtl.css"]
const chanel = new BroadcastChannel(CHANEL_KEY)

self.addEventListener('install', async (event) => {
    console.log('[W] Установка завершена успешно');
});

self.addEventListener('activate', async (event) => {
    console.log('[W] SW Активирован');
    for (const url of CACHE_MAP) {
        await cached(url)
        chanel.postMessage({type: MESSAGES.resource, url});
    }
    console.log('[W] Конец кэширования')
    await self.clients.claim()

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
        return cachedResponse
    } else {
        return await fetch(event.request.url);
    }
}

self.addEventListener('fetch', async (event) => {
    console.log('[W] Fetch', event.request.url);
    event.respondWith(fetchHandler(event))
})


chanel.addEventListener('message', async (event) => {
    const type = event.data
    if (type === MESSAGES.check) {
        console.log("[W] Проверка")
        for (const url of CACHE_MAP) {
            chanel.postMessage({type: MESSAGES.resource, url});
        }
    }
})






