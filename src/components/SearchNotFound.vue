<script setup lang="ts">
import CardOffIcon from "../assets/icons/card_off.svg";
import Button from "./UI/Button.vue";
import SearchOffIcon from "../assets/icons/search_off.svg";

const emit = defineEmits<{
  (e: 'endSearch'): void
}>()
</script>


<template>
  <div class="empty-card-list flex items-center justify-center flex-col text-gray-500 gap-9 h-[40dvh]">
    <div class="flex gap-3 flex-col justify-center items-center">

      <CardOffIcon class="fill-gray-300 w-20 h-20"/>
      <div class="text-sm text-center mb-5">
        <div class="text-xl mb-1">Ничего не найдено</div>
        <div class="text-sm">Может стоит изменить запрос?</div>
      </div>
      <Button bg-color="bg-slate-500" text-color="text-gray-100" @click="() => {$emit('endSearch')}">
        <template v-slot:icon-left>
          <SearchOffIcon class="fill-gray-100 w-6 h-6"/>
        </template>
        Закончить поиск
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>