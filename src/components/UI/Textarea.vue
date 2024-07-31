<script setup lang="ts">
interface TextareaProps {
  placeholder?: string
}

const {placeholder} = defineProps<TextareaProps>();
const model = defineModel()
</script>

<template>
  <div class="textarea-wrapper mt-6 border-2 rounded-[10px] px-3 py-3 transition">
    <textarea v-model="model" class="w-full h-28 outline-none text-sm resize-none"
              :placeholder/>
  </div>
</template>

<style scoped>
.textarea-wrapper:has(textarea:focus) {
  @apply border-blue-600;
}
</style>