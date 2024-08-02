<script setup lang="ts">
interface InputProps {
  placeholder?: string
  readonly?: boolean
}

const {placeholder, readonly} = defineProps<InputProps>();

const model = defineModel()
</script>

<template>
  <div class="input-wrapper border-2 rounded-[10px] px-3 transition shadow-sm">
    <input
        v-model="model"
        class="w-full h-10 outline-none  text-sm"
        :placeholder
        :readonly
    />
  </div>
</template>

<style scoped>
.input-wrapper:has(input:focus) {
  @apply border-blue-600;
}
</style>