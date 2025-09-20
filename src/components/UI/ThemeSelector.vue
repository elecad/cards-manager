<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore, type ThemeMode } from '../../store/useThemeStore'

const themeStore = useThemeStore()

const options = [
	{ value: 'auto', label: 'Авто (Системная)' },
	{ value: 'light', label: 'Светлая' },
	{ value: 'dark', label: 'Тёмная' },
]

const selectedTheme = ref<ThemeMode>(themeStore.themeMode)

const changeTheme = (theme: ThemeMode) => {
	selectedTheme.value = theme
	themeStore.updateTheme(theme)
}
</script>

<template>
	<div class="theme-selector mt-2">
		<div class="grid grid-cols-3 gap-2">
			<div
				v-for="option in options"
				:key="option.value"
				class="theme-option p-3 border-2 rounded-lg text-center cursor-pointer transition-all"
				:class="{
					'border-blue-500 bg-blue-50 dark:bg-blue-950':
						selectedTheme === option.value,
					'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700':
						selectedTheme !== option.value,
				}"
				@click="changeTheme(option.value as ThemeMode)"
			>
				<div class="text-sm font-medium dark:text-gray-200">
					{{ option.label }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.theme-option:active {
	transform: scale(0.95);
}
</style>
