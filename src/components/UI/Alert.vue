<script setup lang="ts">

import CancelIcon from "../../assets/icons/cancel.svg";
import {useAlert} from "../../store/useAlert.ts";

const alertState = useAlert()
</script>

<template>
  <div
      class="alert-wrapper bg-red-500 rounded-t-md shadow-sm p-2 flex items-center justify-center gap-3 w-full transition-transform duration-500"
      :class="{'open': alertState.isOpen}"
  >
    <CancelIcon class="fill-white w-6 h-6"/>
    <div class="alert-message text-md text-white text-center">{{ alertState.message }}</div>
  </div>
</template>

<style scoped>
.alert-wrapper {
  position: fixed;
  bottom: 0;
  transform: translateY(250%);
}

.alert-wrapper.open {
  transform: translateY(0);
}

@media (max-width: 370px) {
  .alert-message {
    @apply text-xs
  }
}
</style>