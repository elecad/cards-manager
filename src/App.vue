<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<RouterView v-slot="{ Component }">
		<div class="animation-wrapper bg-white">
			<Transition name="slide" mode="out-in">
				<Component :is="Component" />
			</Transition>
		</div>
	</RouterView>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: opacity 0.2s, transform 0.2s;
}

.slide-enter-from {
	opacity: 0;
	transform: scale(97%);
}

.slide-leave-to {
	opacity: 0;
	transform: scale(97%);
}
</style>
