<script setup lang="ts">
import AddCameraIcon from "../assets/icons/add_camera.svg"
import AddImageIcon from "../assets/icons/add_image.svg"
import {computed} from "vue";


export interface CreateModeProps {
  header: string,
  label: string,
  selected?: boolean,
  mode?: "camera" | "file"
}

const {header, label, mode} = defineProps<CreateModeProps>()

const isCamera = computed(() => mode === "camera")
</script>

<template>
  <div
      class="flex items-center justify-center flex-col w-full transition h-48 border-2 border-gray-300 border-dashed
      rounded-xl cursor-pointer bg-gray-50 text-gray-500 gap-3 active:border-blue-500 active:text-blue-500 duration-300 active:scale-95"
      :class="{'selected-mode': selected}">
    <AddCameraIcon v-if="isCamera" class="h-8 w-8 fill-gray-400 transition duration-300"/>
    <AddImageIcon v-else class="h-8 w-8 fill-gray-400 transition duration-300"/>
    <div class="text-center font-bold">{{ header }}</div>
    <div class="text-xs text-center px-2">{{ label }}
    </div>
  </div>
</template>

<style scoped>
.selected-mode {
  @apply text-blue-500;
  @apply border-blue-500;
}

.selected-mode > svg {
  @apply fill-blue-600;
}

</style>