<script setup lang="ts">

import WalletIcon from "../assets/icons/wallet.svg";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

const {replace} = useRouter()
const initApp = () => {
  setTimeout(() => {
    replace(RoutesPath.main)
  }, 700)
}
initApp()
</script>

<template>
  <div class="splash w-screen h-dvh flex items-center justify-center flex-col gap-2">
    <WalletIcon class="loading-icon fill-gray-300 w-16 h-16"/>
    <div class="text-center">
      <div class="text-3xl text-gray-900 font-light">Картница</div>
      <div class="text-sm text-gray-500">Удобно, быстро и без Интернета</div>
    </div>
  </div>
</template>

<style scoped>

</style>