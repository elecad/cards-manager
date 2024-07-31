<script setup lang="ts">
interface InputProps {
  placeholder?: string
}

const {placeholder} = defineProps<InputProps>();

const model = defineModel()
</script>

<template>
  <div class="input-wrapper mt-6 border-2 rounded-[10px] px-3 transition">
    <input
        v-model="model"
        class="w-full h-10 outline-none  text-sm"
        :placeholder/>
  </div>
</template>

<style scoped>
.input-wrapper:has(input:focus) {
  @apply border-blue-600;
}
</style>