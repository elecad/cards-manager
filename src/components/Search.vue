<script setup lang="ts">

import SearchIcon from "../assets/icons/search.svg";
import Input from "./UI/Input.vue";

const model = defineModel()
const emit = defineEmits<{
  (e: 'change'): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div
      class="search-wrapper w-full bg-gray-100 h-10 rounded-xl flex justify-start items-center px-3 transition-shadow duration-200">
    <SearchIcon class="search-icon text-gray-400 transition-colors" width="16px" height="16px"/>
    <input v-model="model" @input="() => {emit('change')}" @focus="() => {emit('focus')}" @blur="() => {emit('blur')}"
           class="w-full outline-none bg-transparent font-normal text-sm pl-2 h-full"
           type="search"
           placeholder="Поиск карты..."/>
  </div>
</template>

<style scoped>
.search-wrapper:has(input:focus) {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.search-wrapper:has(input:focus) > .search-icon {
  color: rgb(59 130 246);
}
</style>