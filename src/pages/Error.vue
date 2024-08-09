<script setup lang="ts">

import Button from "../components/UI/Button.vue";
import ErrorIcon from "../assets/icons/error.svg";
import HomeIcon from "../assets/icons/home.svg";
import {RoutesPath} from "../router/router.ts";
import {useRouter} from "vue-router";

const {push} = useRouter()

</script>

<template>
  <div class="content px-5 flex items-center justify-center flex-col h-dvh gap-4">
    <ErrorIcon class="fill-gray-400 w-24 h-24"/>
    <div class="text-center text-xl text-gray-500 font-bold">Что-то пошло не так :(</div>

    <div class="text-center text text-gray-500">Нужно скорее возвращаться на работающую страницу</div>


    <div class="flex items-center justify-evenly gap-6 mt-5 w-full">
      <Button bg-color="bg-blue-600" text-color="text-white" @click="() => {push(RoutesPath.main)}">
        <template v-slot:icon-right>
          <HomeIcon class="fill-white w-6 h-6"/>
        </template>
        На главную страницу
      </Button>
    </div>

  </div>
</template>

<style scoped>

</style>