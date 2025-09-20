const MESSAGES = {
	done: 'cache-done',
	check: 'cache-check',
	resource: 'cache-resource',
}

const CACHE_KEY = 'pwa-resources-cache'
const CHANEL_KEY = 'sw-chanel'

// Add important app resources to cache
const CACHE_MAP = [
	'/',
	'/index.html',
	'/manifest.json',
	'/zxing_reader.wasm',
	'/src/main.ts',
	'/src/style.css',
	'/src/App.vue',
	// Важные JS-файлы и чанки
	'/src/router/router.ts',
	'/src/store/useCardStore.ts',
	'/src/hooks/useOfflineMode.ts',
	// Логотипы различных компаний
	'/logo/absolute.png',
	'/logo/chitaj-gorod.png',
	'/logo/detskij-mir.png',
	'/logo/eldorado.png',
	'/logo/evropa.png',
	'/logo/funday.png',
	'/logo/imperiya-sumok.png',
	'/logo/kari.png',
	'/logo/lenta.png',
	'/logo/linia.png',
	'/logo/magnit.png',
	'/logo/not-found.png',
	'/logo/ostin.png',
	'/logo/planeta-zdorovya.png',
	'/logo/poryadok.png',
	'/logo/pyatyorochka.png',
	'/logo/sportmaster.png',
	'/logo/stalos.png',
	'/logo/vite.png',
	// Ресурсы для PWA
	'/resources/android-chrome-192x192.png',
	'/resources/android-chrome-512x512.png',
	'/resources/android-chrome-maskable-192x192.png',
	'/resources/android-chrome-maskable-512x512.png',
	'/resources/apple-touch-icon.png',
	'/resources/favicon-32x32.png',
	'/resources/safari-pinned-tab.svg',
]

const chanel = new BroadcastChannel(CHANEL_KEY)

self.addEventListener('install', async (event) => {
	console.log('[W] Установка завершена успешно')

	// Cache core app shell and static assets during installation
	event.waitUntil(
		caches.open(CACHE_KEY).then(async (cache) => {
			try {
				// Добавляем статические файлы в кэш
				await cache.addAll(CACHE_MAP)
				console.log('[W] Core app shell cached successfully')

				// Динамически находим и кэшируем скрипты и стили, загруженные на страницу
				if (self.clients && self.clients.matchAll) {
					const clients = await self.clients.matchAll()
					for (const client of clients) {
						// Скрипт, который будет выполнен в контексте клиента
						const dynamicResources = await client
							.evaluate(() => {
								// Получаем все скрипты и стили на странице
								const scripts = Array.from(
									document.querySelectorAll('script[src]'),
								).map((s) => s.src)
								const styles = Array.from(
									document.querySelectorAll('link[rel="stylesheet"]'),
								).map((s) => s.href)
								// Добавляем другие ресурсы, которые могут быть важны
								return [...scripts, ...styles]
							})
							.catch((err) => {
								console.error('[W] Error getting dynamic resources:', err)
								return []
							})

						// Кэшируем найденные ресурсы
						for (const url of dynamicResources) {
							if (
								!url.startsWith('chrome-extension:') &&
								!url.startsWith('data:')
							) {
								try {
									const response = await fetch(url)
									if (response.ok) {
										await cache.put(url, response)
										console.log('[W] Dynamically cached:', url)
									}
								} catch (error) {
									console.error(
										'[W] Failed to cache dynamic resource:',
										url,
										error,
									)
								}
							}
						}
					}
				}

				chanel.postMessage({ type: MESSAGES.done })
			} catch (error) {
				console.error('[W] Error during installation caching:', error)
			}
		}),
	)
})

self.addEventListener('activate', async (event) => {
	console.log('[W] SW Активирован')

	// Clean up old caches
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_KEY) {
						console.log('[W] Removing old cache', key)
						return caches.delete(key)
					}
				}),
			)
		}),
	)

	// Notify about cached resources
	for (const url of CACHE_MAP) {
		chanel.postMessage({ type: MESSAGES.resource, url })
	}

	console.log('[W] Конец кэширования')
	await self.clients.claim()
})

const cached = async (url) => {
	const cache = await caches.open(CACHE_KEY)
	try {
		const response = await fetch(url)
		if (!response.ok) {
			console.error('[W] Ошибка кэширования', response)
			return
		}
		await cache.put(url, response)
	} catch (error) {
		console.error('[W] Failed to cache', url, error)
	}
}

const fetchHandler = async (event) => {
	// Cache-first strategy
	const cache = await caches.open(CACHE_KEY)
	const cachedResponse = await cache.match(event.request)

	if (cachedResponse) {
		console.log('[W] Returning from cache:', event.request.url)
		return cachedResponse
	}

	// Not in cache, try network
	try {
		console.log('[W] Not in cache, fetching:', event.request.url)
		const response = await fetch(event.request)

		// Cache the successful response for future
		if (response.ok) {
			// Проверяем, что URL не содержит chrome-extension
			const url = event.request.url
			if (!url.startsWith('chrome-extension:') && !url.startsWith('data:')) {
				try {
					const responseClone = response.clone()
					cache.put(event.request, responseClone)
					console.log('[W] Cached after fetch:', event.request.url)
				} catch (cacheError) {
					console.error('[W] Error caching response:', cacheError)
				}
			}
		}

		return response
	} catch (error) {
		console.error('[W] Fetch failed:', error)

		// For navigation requests, return index.html as fallback
		if (event.request.mode === 'navigate') {
			const fallbackResponse = await cache.match('/index.html')
			if (fallbackResponse) {
				return fallbackResponse
			}
		}

		// No cache, no network, return error
		console.error('[W] No cache or network available for:', event.request.url)
		return new Response('Network error occurred', {
			status: 503,
			statusText: 'Service Unavailable',
		})
	}
}

self.addEventListener('fetch', (event) => {
	console.log('[W] Fetch', event.request.url)
	event.respondWith(fetchHandler(event))
})

chanel.addEventListener('message', async (event) => {
	const type = event.data
	if (type === MESSAGES.check) {
		console.log('[W] Проверка')
		const cache = await caches.open(CACHE_KEY)
		const keys = await cache.keys()
		const urls = keys.map((request) => request.url)

		// Report all cached resources
		for (const url of urls) {
			chanel.postMessage({ type: MESSAGES.resource, url })
		}
	}
})
