<script setup lang="ts">

import Navigation from "../../components/Navigation.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import WalletIcon from "../../assets/icons/wallet.svg";
import Button from "../../components/UI/Button.vue";
import CodeIcon from "../../assets/icons/code.svg";
import VkIcon from "../../assets/icons/vk-2.svg";
import TelegramIcon from "../../assets/icons/telegram.svg";
import GitHub from "../../assets/icons/github.svg";
import BackIcon from "../../assets/icons/back.svg";
import ScaleTransition from "../../components/UI/ScaleTransition.vue";
</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-3 pt-4">
      <div class="font-bold text-inherit text-xl mb-6 pl-3">О приложении</div>


      <div class="h-60 bg-gray-200 rounded-md mb-5 flex justify-center items-center flex-col gap-1 shadow">
        <ScaleTransition :duration="300">
          <div class="p-5 mb-3 bg-white rounded-xl shadow flex flex-col justify-center items-center">
            <WalletIcon class="w-10 h-10 fill-gray-700"/>
          </div>
        </ScaleTransition>

        <div class="font-bold text-gray-700">Картница v1.0</div>
        <div class="text-gray-500">Просто, быстро, без интернета</div>
        <div class="text-gray-500 text-sm">by Anton Dakhin 2024</div>

      </div>

      <div class="px-5 text-center text-gray-500 mb-4 font-mono">
        <span class="font-bold">Картница</span> - это способ для хранения скидочных карт абсолютно любых магазинов с
        открытым исходным
        кодом. Идеалогия
        проекта
        заключается в отсутсвии рекламы и сторонних сервисов, что позволяет приложению работать полностью без Интернета
      </div>

      <div class="flex items-center justify-evenly gap-3 flex-wrap mb-4">
        <Button bg-color="bg-gray-600" text-color="text-white">
          <template v-slot:icon-right>
            <CodeIcon class="fill-white w-5 h-5"/>
          </template>
          Исходный код проекта
        </Button>
      </div>


      <hr class="mb-4"/>

      <div class="px-5 text-center text-gray-500 mb-4 font-mono">Нашли баг? Понравилось приложение? Напишите об этом
        автору :)
      </div>


      <!--      <div class="flex items-center justify-evenly gap-6 flex-wrap">-->
      <!--        <Button class="flex-2">-->
      <!--          <template v-slot:icon-left>-->
      <!--            <BackIcon class="fill-gray-500 w-4 h-4"/>-->
      <!--          </template>-->
      <!--          Назад-->
      <!--        </Button>-->
      <!--        <Button bg-color="bg-blue-600" text-color="text-white">-->
      <!--          <template v-slot:icon-right>-->
      <!--            <CheckIcon class="fill-white w-6 h-6"/>-->
      <!--          </template>-->
      <!--          GitHub-->
      <!--        </Button>-->

      <!--        <Button bg-color="bg-blue-600" text-color="text-white">-->
      <!--          <template v-slot:icon-right>-->
      <!--            <CheckIcon class="fill-white w-6 h-6"/>-->
      <!--          </template>-->
      <!--          VK-->
      <!--        </Button>-->

      <!--        <Button bg-color="bg-blue-600" text-color="text-white">-->
      <!--          <template v-slot:icon-right>-->
      <!--            <CheckIcon class="fill-white w-6 h-6"/>-->
      <!--          </template>-->
      <!--          VK-->
      <!--        </Button>-->
      <!--      </div>-->


      <div class="flex items-center justify-evenly gap-3 flex-wrap mb-4">
        <Button bg-color="bg-gray-600" text-color="text-white">
          <template v-slot:icon-right>
            <GitHub class="fill-white w-6 h-6"/>
          </template>
          GitHub
        </Button>

        <Button bg-color="bg-blue-600" text-color="text-white">
          <template v-slot:icon-right>
            <VkIcon class="fill-white w-6 h-6"/>
          </template>
          VK
        </Button>

        <Button bg-color="bg-blue-500" text-color="text-white">
          <template v-slot:icon-right>
            <TelegramIcon class="fill-white w-6 h-6"/>
          </template>
          Telegram
        </Button>
      </div>

      <hr class="mb-4"/>

      <div class="flex items-center justify-evenly gap-3 flex-wrap mb-4">
        <Button bg-color="bg-indigo-600" text-color="text-white" class="flex-1">
          <template v-slot:icon-left>
            <BackIcon class="fill-white w-4 h-4"/>
          </template>
          Назад
        </Button>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>