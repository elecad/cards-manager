<script setup lang="ts">

import Navigation from "../../components/Navigation.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import CheckBox from "../../components/UI/CheckBox.vue";
import Button from "../../components/UI/Button.vue";
import CheckIcon from "../../assets/icons/check.svg";
import BackIcon from "../../assets/icons/back.svg";
import FileIcon from "../../assets/icons/file.svg"

import {useOfflineMode} from "../../hooks/useOfflineMode.ts";

const {disable, isOffline, enable, cacheList, checkCache} = useOfflineMode()


const changeHandler = async () => {
  if (isOffline.value)
    await enable()
  else
    await disable()
}

const checkHandler = async () => {
  // const CACHE_MAP = "/src/assets/Barcode.png"
  // const response = await fetch(CACHE_MAP)
  // console.log("[C]", response)
  checkCache()
}

const getPathName = (fullUrl: string) => {
  return new URL(fullUrl).pathname
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


      <div class="h-96 bg-gray-200 rounded-md mb-4 p-3">
        <div v-for="cache in cacheList"
             class="w-full bg-gray-50 px-1 py-2 flex items-center justify-between rounded-md">
          <div class="flex items-center gap-3 text-sm">
            <FileIcon class="fill-slate-400"/>
            <div class="text-slate-600">{{ getPathName(cache.url) }}</div>
          </div>

          <div class="text-xl">
            <template v-if="cache.ok">
              ✅
            </template>
            <template v-else>
              ❌
            </template>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-evenly gap-6">
        <Button class="flex-2">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white flex-1" @click="checkHandler" :disabled="!isOffline">
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