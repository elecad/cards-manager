const MESSAGES = {
    done: "cache-done",
    check: "cache-check",
    resource: "cache-resource",
}

const CACHE_KEY = "pwa-resources-cache"
const CHANEL_KEY = "sw-chanel"

const CACHE_MAP = ["/cards-manager/","/cards-manager/index.html","/cards-manager/manifest.json","/cards-manager/sw.js","/cards-manager/vite.svg","/cards-manager/zxing_reader.wasm","/cards-manager/resources/android-chrome-192x192.png","/cards-manager/resources/android-chrome-512x512.png","/cards-manager/resources/android-chrome-maskable-192x192.png","/cards-manager/resources/android-chrome-maskable-512x512.png","/cards-manager/resources/apple-touch-icon.png","/cards-manager/resources/favicon-32x32.png","/cards-manager/resources/safari-pinned-tab.svg","/cards-manager/logo/absolute.png","/cards-manager/logo/chitaj-gorod.png","/cards-manager/logo/detskij-mir.png","/cards-manager/logo/eldorado.png","/cards-manager/logo/evropa.png","/cards-manager/logo/funday.png","/cards-manager/logo/imperiya-sumok.png","/cards-manager/logo/kari.png","/cards-manager/logo/lenta.png","/cards-manager/logo/linia.png","/cards-manager/logo/magnit.png","/cards-manager/logo/not-found.png","/cards-manager/logo/ostin.png","/cards-manager/logo/planeta-zdorovya.png","/cards-manager/logo/poryadok.png","/cards-manager/logo/pyatyorochka.png","/cards-manager/logo/sportmaster.png","/cards-manager/logo/stalos.png","/cards-manager/logo/vite.png","/cards-manager/assets/index-CB8kUqrT.js","/cards-manager/assets/index-DTkWloqM.css"]
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






