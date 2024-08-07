<script setup lang="ts">
import CardOffIcon from "../assets/icons/card_off.svg"
import Button from "./UI/Button.vue";
import {RoutesPath} from "../router/router.ts";
import AddIcon from "../assets/icons/add_card.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import {useRouter} from "vue-router";

const {push} = useRouter()
</script>


<template>
  <Transition>
    <div class="empty-card-list flex items-center justify-center h-[50vh]">
      <div class="flex gap-3 flex-col justify-center items-center animate-pulse">
        <WalletIcon class="loading-icon fill-gray-400 w-10 h-10"/>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


</style>