<script setup lang="ts">
</script>

<template>
  <Router-view v-slot="{ Component }">
    <Transition name="slide" mode="out-in">
        <Component :is="Component" />
    </Transition>
  </Router-view>
</template>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: opacity 1s;
  }

  .slide-enter-from, .slide-leave-to {
    opacity: 0;
  }
</style>
