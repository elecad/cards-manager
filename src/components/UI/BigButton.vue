<script setup lang="ts">


export interface CreateModeProps {
  header: string,
  label?: string,
  labels?: string[],
  selected?: boolean,
}

const {header, labels} = defineProps<CreateModeProps>()
</script>

<template>
  <div
      class="big-button-wrapper flex items-center justify-center flex-col w-full transition h-48 border-2 border-gray-300 border-dashed
      rounded-xl cursor-pointer bg-gray-50 text-gray-600 gap-3 active:border-blue-500 active:text-blue-500 duration-300 active:scale-95"
      :class="{'selected-big-button': selected}">
    <!--    <AddCameraIcon v-if="isCamera" class="h-8 w-8 fill-gray-400 transition duration-300"/>-->
    <!--    <AddImageIcon v-else class="h-8 w-8 fill-gray-400 transition duration-300"/>-->
    <slot/>
    <div class="text-center font-bold">{{ header }}</div>
    <div class="text-xs text-center px-2">
      <div>{{ label }}</div>
      <div v-for="l in labels">{{ l }}</div>
    </div>
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