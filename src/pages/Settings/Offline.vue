<script setup lang="ts">

import Navigation from "../../components/Navigation.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import CheckBox from "../../components/UI/CheckBox.vue";
import Button from "../../components/UI/Button.vue";
import CheckIcon from "../../assets/icons/check.svg";
import BackIcon from "../../assets/icons/back.svg";

import {useOfflineMode} from "../../hooks/useOfflineMode.ts";

const {disable, isOffline, enable} = useOfflineMode()


const changeHandler = async () => {
  if (isOffline.value)
    await enable()
  else
    await disable()
}

const checkHandler = async () => {
  const CACHE_MAP = "/src/assets/Barcode.png"
  const response = await fetch(CACHE_MAP)
  console.log("[C]", response)
}
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
        <CheckBox v-model="isOffline" @change="changeHandler"/>
      </div>


      <div class="h-64 bg-gray-200 rounded-md mb-4"></div>

      <div class="flex items-center justify-evenly gap-6">
        <Button class="flex-2">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white flex-1" @click="checkHandler">
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