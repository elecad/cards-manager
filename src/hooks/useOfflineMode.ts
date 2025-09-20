import { ref } from 'vue'

const LS_KEY = 'offline-mode'
const CHANEL_KEY = 'sw-chanel'

const MESSAGES = {
	done: 'cache-done',
	check: 'cache-check',
	resource: 'cache-resource',
}

export const useOfflineMode = () => {
	const chanel = new BroadcastChannel(CHANEL_KEY)
	const cacheList = ref<Response[]>([])
	const isCacheReady = ref(false)

	chanel.addEventListener('message', async (event) => {
		const data = event.data
		console.log('[C]', data.type || data)

		if (data.type === MESSAGES.resource) {
			const url = data.url
			try {
				const response = await fetch(url)
				cacheList.value.push(response)
			} catch (error) {
				console.error('[C] Failed to fetch cached resource', url, error)
			}
		} else if (data.type === MESSAGES.done) {
			isCacheReady.value = true
			console.log('[C] Cache is ready')
		}
	})

	const initValue = () => {
		const stringValue = localStorage.getItem(LS_KEY) ?? 'null'
		try {
			return JSON.parse(stringValue) as boolean
		} catch {
			localStorage.setItem(LS_KEY, JSON.stringify(false))
			return false
		}
	}

	const isOffline = ref(initValue())

	const enable = async () => {
		// Проверяем, зарегистрирован ли уже service worker
		const swRegistration = await navigator.serviceWorker.getRegistration(
			'/sw.js',
		)

		if (!swRegistration) {
			await navigator.serviceWorker.register('/sw.js')
		}

		await navigator.serviceWorker.ready
		localStorage.setItem(LS_KEY, JSON.stringify(true))

		// Запрашиваем предварительное кэширование важных ресурсов
		await precacheImportantResources()

		location.reload()
	}

	const precacheImportantResources = async () => {
		// Список важных ресурсов для работы приложения
		const importantResources = [
			'/',
			'/index.html',
			'/manifest.json',
			'/zxing_reader.wasm',
			// Добавьте другие критические ресурсы здесь
		]

		try {
			for (const url of importantResources) {
				const response = await fetch(url)
				if (response.ok) {
					const cache = await caches.open('pwa-resources-cache')
					await cache.put(url, response)
					console.log('[C] Precached:', url)
				}
			}
		} catch (error) {
			console.error('[C] Precaching failed:', error)
		}
	}

	const disable = async () => {
		console.log('[С] Удаление воркера')
		const services = await navigator.serviceWorker.getRegistrations()
		for (const worker of services) {
			await worker.unregister()
		}

		localStorage.setItem(LS_KEY, JSON.stringify(false))

		const cacheKeys = await caches.keys()
		for (const key of cacheKeys) {
			await caches.delete(key)
		}

		location.reload()
	}

	const checkCache = () => {
		cacheList.value = []
		chanel.postMessage(MESSAGES.check)
	}

	return { enable, disable, isOffline, cacheList, checkCache, isCacheReady }
}
