import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import VueSortable from 'vue3-sortablejs'
import { createPinia } from 'pinia'
import { router } from './router/router.ts'
import { useThemeStore } from './store/useThemeStore.ts'

// Обработчик ошибок MediaSession API для предотвращения ошибок из расширений Chrome
if ('mediaSession' in navigator) {
	const originalSetActionHandler = navigator.mediaSession.setActionHandler
	navigator.mediaSession.setActionHandler = function (type, callback) {
		try {
			originalSetActionHandler.call(navigator.mediaSession, type, callback)
		} catch (error) {
			// Подавляем ошибки от расширений, таких как autoPip.js
			console.debug(
				`MediaSession API: Unsupported action '${type}' (likely from a browser extension)`,
			)
		}
	}
}

// Регистрация Service Worker для поддержки кэширования
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then((registration) => {
				console.log(
					'ServiceWorker registered successfully:',
					registration.scope,
				)
			})
			.catch((error) => {
				console.error('ServiceWorker registration failed:', error)
			})
	})
}

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(VueSortable)
app.use(pinia)

// Initialize theme
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
