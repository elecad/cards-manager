<script setup lang="ts">

import Navigation from "../../components/Navigation.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import CheckBox from "../../components/UI/CheckBox.vue";
import Button from "../../components/UI/Button.vue";
import NextIcon from "../../assets/icons/next.svg";
import CheckIcon from "../../assets/icons/check.svg";
import {RoutesPath} from "../../router/router.ts";
import AddCardIcon from "../../assets/icons/add_card.svg";
import BackIcon from "../../assets/icons/back.svg";
</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-3 pt-4">
      <div class="font-bold text-inherit text-xl mb-6 pl-3">Оффлайн-доступ</div>
      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Включить кэширование</div>
          <div class="text-xs font-medium text-slate-500">
            Доступ к картам можно получить без Интернета
          </div>
        </div>
        <CheckBox/>
      </div>


      <div class="h-64 bg-gray-200 rounded-md mb-4"></div>

      <div class="flex items-center justify-evenly gap-6">
        <Button class="flex-2">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white flex-1">
          <template v-slot:icon-right>
            <CheckIcon class="fill-white w-6 h-6"/>
          </template>
          Проверить кэш-файлы
        </Button>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>