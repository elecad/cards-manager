<script setup lang="ts">

import SettingsIcon from "../assets/icons/settings.svg";
import AddCardIcon from "../assets/icons/add_card.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import Button from "./UI/Button.vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

const {push} = useRouter();

</script>

<template>
  <div class="navigation-bar flex px-6 justify-between items-center">
    <div class="flex hover:opacity-80 gap-1">
      <WalletIcon width="22px" height="22px" style="fill: black;"/>
      <p class="font-bold text-inherit">Картница</p>
    </div>

    <div class="buttons-wrapper flex gap-4">
      <Button only-icon bg-color="bg-blue-600" @click="() => {push(RoutesPath.select)}">
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