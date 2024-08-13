<script setup lang="ts">

// Настройки:
//   Количество кард в ряд (1, 2, 3)
//   Тема: Тёмная, светлая
//   Оффлайн доступ
//   Импортировать карты и настройки приложения
// Число кард в сетке

import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Navigation from "../../components/Navigation.vue";
import OfflineIcon from "../../assets/icons/offline.svg";
import InfoIcon from "../../assets/icons/info.svg"
import HomeIcon from "../../assets/icons/home.svg"
import ShareIcon from "../../assets/icons/share.svg"
import {useRouter} from "vue-router";
import {RoutesPath} from "../../router/router.ts";
import LargeButton from "../../components/UI/LargeButton.vue";
import Button from "../../components/UI/Button.vue";

const {push} = useRouter()

</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-3 pt-4">
      <div class="font-bold text-inherit text-xl mb-6 pl-3">Настройки приложения</div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3 opacity-50">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Тёмная тема</div>
          <div class="text-xs font-medium text-slate-500">
            Изменяет внешний вид приложения
          </div>
        </div>
        <!--        <CheckBox disabled/>-->
        <div class="text-sm px-2 py-1 bg-blue-500 rounded text-white">В разработке</div>
      </div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3 opacity-50">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Уменьшить карты</div>
          <div class="text-xs font-medium text-slate-500">
            Карты становятся больше, удобно при большой диагонале устройства
          </div>
        </div>
        <!--        <CheckBox/>-->
        <div class="text-sm px-2 py-1 bg-blue-500 rounded text-white">В разработке</div>
      </div>

      <div class="setting-item flex items-center justify-between mb-4 px-2 py-3 opacity-50">
        <div class="flex-1 mr-2">
          <div class="text-md font-medium">Увеличить карты</div>
          <div class="text-xs font-medium text-slate-500">
            Карты становятся больше, удобно при маленькой диагонале устройства
          </div>
        </div>
        <!--        <CheckBox/>-->
        <div class="text-sm px-2 py-1 bg-blue-500 rounded text-white">В разработке</div>
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

        <LargeButton @click="() => {push(RoutesPath.share)}">
          <div class="flex items-center justify-center flex-col gap-2 text-center opacity-50">
            <ShareIcon class="w-8 h-8 fill-slate-400"/>
            <div class="text-md font-medium">Поделиться картами</div>
            <div class="text-xs font-medium text-slate-400">
              Быстрый перенос данных на другое устройство
            </div>
            <div class="text-sm px-2 py-1 bg-blue-500 rounded text-white">В разработке</div>
          </div>
        </LargeButton>
      </div>

      <LargeButton @click="() => {push(RoutesPath.about)}" class="mb-3">
        <div class="flex items-center justify-between">
          <div class="flex-1 mr-2">
            <div class="text-md font-medium">О приложении</div>
            <div class="text-xs font-medium text-slate-400">
              Информация о приложении и его авторе
            </div>
          </div>
          <InfoIcon class="w-8 h-8 fill-slate-400"/>
        </div>

      </LargeButton>

      <hr class="mb-6"/>


      <div class="flex items-center justify-center flex-col">
        <div class="text-sm font-medium text-slate-400 mb-4">Закончили настройку?</div>
        <Button bg-color="bg-slate-500" text-color="text-white" @click="() => push(RoutesPath.main)">
          <template v-slot:icon-right>
            <HomeIcon class="fill-white w-5 h-5"/>
          </template>
          Главный экран
        </Button>
      </div>

      <!--      <LargeButton @click="() => {push(RoutesPath.main)}">-->
      <!--        <div class="flex items-center justify-between">-->
      <!--          <div class="flex-1 mr-2">-->
      <!--            <div class="text-md font-medium">Вернуться на главный экран</div>-->
      <!--            <div class="text-xs font-medium text-slate-400">-->
      <!--              Закончили настройку?-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <HomeIcon class="w-8 h-8 fill-slate-400"/>-->
      <!--        </div>-->

      <!--      </LargeButton>-->


    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>