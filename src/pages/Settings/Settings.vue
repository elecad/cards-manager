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
import BigButton from "../../components/UI/BigButton.vue";
import InfoIcon from "../../assets/icons/info.svg"
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


      <div class="flex items-center justify-between gap-3">
        <BigButton header="Оффлайн-доступ" class="px-1 h-32 !gap-1">
          <OfflineIcon class="w-10 h-10 fill-slate-300"/>
        </BigButton>
        <BigButton header="О приложении" class="px-1 h-32 !gap-1">
          <InfoIcon class="w-10 h-10 fill-slate-300"/>
        </BigButton>

      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>