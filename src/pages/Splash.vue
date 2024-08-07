<script setup lang="ts">

import WalletIcon from "../assets/icons/wallet.svg";
import ScaleTransition from "../components/UI/ScaleTransition.vue";
import {useCardStore} from "../store/useCardStore.ts";
import {watch} from "vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

const cardState = useCardStore()
const {push} = useRouter()
const initApp = async () => {
  await cardState.init()
  setTimeout(() => {
    push(RoutesPath.main)
  }, 500)
}
initApp()
</script>

<template>
  <div class="splash w-screen h-dvh bg-blue-700 flex items-center justify-center flex-col gap-2">
    <WalletIcon class="loading-icon fill-white w-20 h-20"/>
    <div class="text-center">
      <div class="text-3xl text-white font-bold">Картница</div>
      <div class="text-sm text-white">Удобно, быстро и без Интернета</div>
    </div>
  </div>
</template>

<style scoped>

</style>