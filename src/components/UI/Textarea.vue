<script setup lang="ts">
interface TextareaProps {
  placeholder?: string
  readonly?: boolean
}

const {placeholder, readonly} = defineProps<TextareaProps>();
const model = defineModel()
</script>

<template>
  <div class="textarea-wrapper border-2 rounded-[10px] px-3 py-3 transition shadow-sm">
    <textarea v-model="model as string" class="w-full h-20 outline-none text-sm resize-none"
              :placeholder :readonly/>
  </div>
</template>

<style scoped>
.textarea-wrapper:has(textarea:focus) {
  @apply border-blue-600;
}
</style>