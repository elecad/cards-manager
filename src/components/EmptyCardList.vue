<script setup lang="ts">
import CardOffIcon from "../assets/icons/card_off.svg"
</script>

<template>
  Нет карт
  <div class="empty-card-list flex items-center justify-center flex-col text-gray-500 gap-9 mt-6">
    <div class="flex gap-3 flex-col justify-center items-center">
      <div class="text-xl">Тут ничего нет...</div>
      <CardOffIcon width="72px" height="72px" style="fill: rgba(82, 82, 91, 0.8);"/>
      <div class="text-sm">Ниже можно добавить новую карту</div>
    </div>

    <button class="text-white px-3 py-2 rounded-xl text-sm" style="background-color: rgb(0, 111, 238)">Добавить новую
      карту
    </button>
  </div>
</template>

<style scoped>

</style>