<script setup lang="ts">


export interface CreateModeProps {
  header: string,
  label?: string,
}

const {header, label} = defineProps<CreateModeProps>()
</script>

<template>
  <div
      class="big-button-wrapper flex items-center justify-center p-3 w-full transition border-2 border-gray-300 border-dashed
      rounded-xl cursor-pointer bg-gray-50 text-gray-600  active:border-blue-500 active:text-blue-500 duration-300 active:scale-95">
    <div class="flex-1 mr-2">
      <div class="text-md font-medium">{{ header }}</div>
      <div class="text-xs font-medium text-slate-400">
        {{ label }}
      </div>
    </div>
    <slot/>
  </div>
</template>

<style>
.big-button-wrapper > svg {
  @apply h-8 w-8 fill-gray-400 transition duration-300;
}

.big-button-wrapper:active > svg {
  @apply fill-blue-500;
}

.big-button-wrapper.selected-big-button {
  @apply text-blue-500;
  @apply border-blue-500;
}

.big-button-wrapper.selected-big-button > svg {
  @apply fill-blue-600;
}


</style>