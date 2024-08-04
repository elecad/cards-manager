<script setup lang="ts">
import {ref} from "vue";

interface ScaleTransitionProps {
  duration?: number
}

const {duration} = defineProps<ScaleTransitionProps>();

const isVisible = ref(false)

setTimeout(() => {
  isVisible.value = true;
}, duration ?? 200)
</script>

<template>
  <div class="transition-wrapper opacity-0 transition-transform scale-0 rotate-45 duration-500 ease-in-out"
       :class="{'opacity-100': isVisible, 'scale-100': isVisible, '!rotate-0': isVisible}">
    <slot/>
  </div>

</template>

<style scoped>
</style>