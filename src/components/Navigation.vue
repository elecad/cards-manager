<script setup lang="ts">

import SettingsIcon from "../assets/icons/settings.svg";
import AddCardIcon from "../assets/icons/add_card.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import Button from "./UI/Button.vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

const {push, replace} = useRouter();

</script>

<template>
  <div class="navigation-bar flex px-6 justify-between items-center">
    <div class="flex transition gap-1 active:scale-95  active::opacity-80" @click="replace(RoutesPath.main)">
      <WalletIcon width="22px" height="22px" class="fill-black"/>
      <p class="font-bold text-inherit">Картница <sup>βeta</sup></p>
    </div>

    <div class="buttons-wrapper flex gap-4">
      <Button only-icon bg-color="bg-blue-600" @click="() => {replace(RoutesPath.select)}">
        <template v-slot:icon-left>
          <AddCardIcon class="fill-white"/>
        </template>
      </Button>

      <Button only-icon @click="() => {push(RoutesPath.settings)}">
        <template v-slot:icon-left>
          <SettingsIcon class="fill-gray-600"/>
        </template>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.navigation-bar {
  height: 64px;
}
</style>