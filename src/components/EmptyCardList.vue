<script setup lang="ts">
import CardOffIcon from "../assets/icons/card_off.svg"
import Button from "./UI/Button.vue";
import {RoutesPath} from "../router/router.ts";
import AddIcon from "../assets/icons/add_card.svg";
import {useRouter} from "vue-router";

const {push} = useRouter()
</script>


<template>
  <div class="empty-card-list flex items-center justify-center flex-col text-gray-500 gap-9 h-[50dvh]">
    <div class="flex gap-3 flex-col justify-center items-center">

      <CardOffIcon class="fill-gray-400 w-20 h-20"/>
      <div class="text-sm text-center">
        <div class="text-xl mb-1">Картница пуста...</div>
        <div class="text-sm">Ниже можно добавить новую карту</div>
      </div>

    </div>

    <Button bg-color="bg-blue-600" text-color="text-white" @click="() => push(RoutesPath.select)">
      <template v-slot:icon-right>
        <AddIcon class="fill-white w-5 h-5"/>
      </template>
      Добавить карту
    </Button>
  </div>
</template>

<style scoped>

</style>