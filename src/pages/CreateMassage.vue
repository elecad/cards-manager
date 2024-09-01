<script setup lang="ts">

import DefaultLayout from "../layouts/DefaultLayout.vue";
import Logo from "../components/Logo.vue";
import Button from "../components/UI/Button.vue";
import HomeIcon from "../assets/icons/home.svg"
import SaleCard from "../components/SaleCard.vue";
import ScaleTransition from "../components/UI/ScaleTransition.vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import {ISaleCard} from "../service/card.service.ts";
import {computed, ref} from "vue";
import { RootURL } from "../config/buildConfig.ts";

const {replace} = useRouter()

const name = ref("")
const iconName = ref("")


const routerState = history.state.prevDate as Omit<ISaleCard, 'id'>

console.log(routerState)

if (!routerState) {
  console.log("Ошибка!!")
  replace(RoutesPath.error)

} else {
  name.value = routerState.name
  iconName.value = routerState.icon
}
const iconPath = computed(() => `${RootURL}/public/logo/${iconName.value}`
)

</script>

<template>
  <DefaultLayout>
    <Logo class="h-16"/>
    <div class="content px-5 flex-col flex items-stretch justify-center">
      <div class="card-wrapper px-8">
        <ScaleTransition :duration="300">
          <SaleCard :name="name" :iconPath="iconPath"/>
        </ScaleTransition>
      </div>
      <div class="mt-10 mb-6">
        <div class="text-center text-lg text-gray-500">Отлично, карта добавлена!
        </div>
        <div class="text-center text-xs text-slate-500">Теперь её можно использовать в
          магазине
        </div>
      </div>

      <div class="flex items-center justify-evenly gap-6">

        <Button bg-color="bg-blue-600" text-color="text-white" class="flex-1" @click="() => {replace(RoutesPath.main)}">
          <template v-slot:icon-right>
            <HomeIcon class="fill-white w-5 h-5"/>
          </template>
          Главный экран
        </Button>
      </div>
    </div>

  </DefaultLayout>
</template>

<style scoped>
.content {
  height: calc(100dvh - 64px);
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0);
}
</style>