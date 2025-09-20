<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LargeButton from './UI/LargeButton.vue'

// Add type definition for the Safari navigator extension
interface SafariNavigator extends Navigator {
	standalone?: boolean
}

const deferredPrompt = ref<any>(null)
const isInstallable = ref<boolean>(false)
const debugInfo = ref<string>('Ожидание события beforeinstallprompt...')

onMounted(() => {
	console.log(
		'InstallPWA компонент загружен, ожидание события beforeinstallprompt',
	)
	// Слушаем событие beforeinstallprompt
	window.addEventListener('beforeinstallprompt', (e: Event) => {
		console.log('Событие beforeinstallprompt сработало!', e)
		e.preventDefault()
		deferredPrompt.value = e
		isInstallable.value = true
		debugInfo.value = 'Приложение доступно для установки!'
	})

	// Дополнительная проверка на уже установленное приложение
	if (
		window.matchMedia('(display-mode: standalone)').matches ||
		(window.navigator as SafariNavigator).standalone === true
	) {
		debugInfo.value = 'Приложение уже установлено'
		console.log('Приложение уже установлено в режиме standalone')
	}
})

const installPWA = async () => {
	if (deferredPrompt.value) {
		deferredPrompt.value.prompt() // показываем запрос на установку
		debugInfo.value = 'Показываем запрос на установку...'

		const choiceResult = await deferredPrompt.value.userChoice

		// Проверка выбора пользователя
		if (choiceResult.outcome === 'accepted') {
			console.log('PWA установлено')
			debugInfo.value = 'PWA успешно установлено!'
		} else {
			console.log('PWA установка отменена')
			debugInfo.value = 'Установка PWA отменена пользователем'
		}

		// Сбрасываем событие
		deferredPrompt.value = null
		isInstallable.value = false
	}
}
</script>

<template>
	<div class="flex justify-center mt-4 mb-4 flex-col">
		<div v-if="isInstallable" class="w-full">
			<LargeButton
				@click="installPWA"
				class="flex items-center p-3 w-full transition border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 text-gray-600 active:border-blue-500 active:text-blue-500 duration-300 active:scale-95"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-8 h-8 mr-4 stroke-slate-400"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" y1="15" x2="12" y2="3" />
				</svg>
				<div class="text-md font-medium">Установить приложение</div>
			</LargeButton>
		</div>
		<!-- Отладочная информация (можно удалить в релизе) -->
		<div class="text-xs text-slate-500 mt-1 text-center">{{ debugInfo }}</div>
	</div>
</template>

<style scoped></style>
