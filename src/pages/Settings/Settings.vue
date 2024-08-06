<script setup lang="ts">

// Настройки:
//   Количество кард в ряд (1, 2, 3)
//   Тема: Тёмная, светлая
//   Оффлайн доступ
//   Импортировать карты и настройки приложения
// Число кард в сетке

import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Navigation from "../../components/Navigation.vue";
import CheckBox from "../../components/UI/CheckBox.vue";
import OfflineIcon from "../../assets/icons/offline.svg";
import InfoIcon from "../../assets/icons/info.svg"
import HomeIcon from "../../assets/icons/home.svg"
import BigButton from "../../components/UI/BigButtonWithTemplate.vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../../router/router.ts";
import LargeButton from "../../components/UI/LargeButton.vue";

const {push} = useRouter()
</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-3 pt-4">
      <div class="font-bold text-inherit text-xl mb-6 pl-3">Настройки приложения</div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Тёмная тема</div>
          <div class="text-xs font-medium text-slate-500">
            Изменяет внешний вид приложения
          </div>
        </div>
        <CheckBox/>
      </div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Уменьшить карты</div>
          <div class="text-xs font-medium text-slate-500">
            Карты становятся больше, удобно при большой диагонале устройства
          </div>
        </div>
        <CheckBox/>
      </div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Увеличить карты</div>
          <div class="text-xs font-medium text-slate-500">
            Карты становятся больше, удобно при маленькой диагонале устройства
          </div>
        </div>
        <CheckBox/>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <LargeButton @click="() => {push(RoutesPath.offlineSettings)}">
          <div class="flex items-center justify-center flex-col gap-2 text-center">
            <OfflineIcon class="w-8 h-8 fill-slate-400"/>
            <div class="text-md font-medium">Оффлайн-доступ</div>
            <div class="text-xs font-medium text-slate-400">
              Доступ к web-приложению без активного подключения к Интернету
            </div>
          </div>
        </LargeButton>

        <LargeButton @click="() => {push(RoutesPath.about)}">
          <div class="flex items-center justify-center flex-col gap-2 text-center">
            <InfoIcon class="w-8 h-8 fill-slate-400"/>
            <div class="text-md font-medium">О приложении</div>
            <div class="text-xs font-medium text-slate-400">
              Информация о приложении и его авторе
            </div>
          </div>
        </LargeButton>
      </div>

      <hr class="mb-4"/>

      <LargeButton @click="() => {push(RoutesPath.main)}">
        <div class="flex items-center justify-between">
          <div class="flex-1 mr-2">
            <div class="text-md font-medium">Вернуться на главный экран</div>
            <div class="text-xs font-medium text-slate-400">
              Закончили настройку?
            </div>
          </div>
          <HomeIcon class="w-8 h-8 fill-slate-400"/>
        </div>

      </LargeButton>


    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>