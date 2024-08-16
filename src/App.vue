<script setup lang="ts">
</script>

<template>
  <Router-view v-slot="{ Component }">
    <div class="animation-wrapper bg-white">
      <Transition name="slide" mode="out-in">
        <Component :is="Component"/>
      </Transition>
    </div>
  </Router-view>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
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
