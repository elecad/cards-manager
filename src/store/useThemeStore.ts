import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

const LS_KEY = 'theme-mode'

export const useThemeStore = defineStore('theme', () => {
	// Get initial theme from localStorage or default to 'auto'
	const initValue = (): ThemeMode => {
		const storedValue = localStorage.getItem(LS_KEY)
		if (storedValue && ['light', 'dark', 'auto'].includes(storedValue)) {
			return storedValue as ThemeMode
		}
		return 'auto'
	}

	const themeMode = ref<ThemeMode>(initValue())
	const isDarkMode = ref(false)

	// Apply theme based on system preference for 'auto' mode
	const applyThemeFromSystemPreference = () => {
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches
		isDarkMode.value = prefersDark
		document.documentElement.classList.toggle('dark', isDarkMode.value)
	}

	// Update theme
	const updateTheme = (mode: ThemeMode) => {
		themeMode.value = mode
		localStorage.setItem(LS_KEY, mode)

		if (mode === 'auto') {
			applyThemeFromSystemPreference()
		} else {
			isDarkMode.value = mode === 'dark'
			document.documentElement.classList.toggle('dark', isDarkMode.value)
		}
	}

	// Initialize theme
	const initTheme = () => {
		// Set up system preference listener for 'auto' mode
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		mediaQuery.addEventListener('change', (e) => {
			if (themeMode.value === 'auto') {
				isDarkMode.value = e.matches
				document.documentElement.classList.toggle('dark', isDarkMode.value)
			}
		})

		// Apply initial theme
		if (themeMode.value === 'auto') {
			applyThemeFromSystemPreference()
		} else {
			isDarkMode.value = themeMode.value === 'dark'
			document.documentElement.classList.toggle('dark', isDarkMode.value)
		}
	}

	// Watch for theme changes
	watch(themeMode, (newMode) => {
		updateTheme(newMode)
	})

	return {
		themeMode,
		isDarkMode,
		updateTheme,
		initTheme,
	}
})
