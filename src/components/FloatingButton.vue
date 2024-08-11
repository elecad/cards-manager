<script setup lang="ts">
import Button from "./UI/Button.vue";
import AddIcon from "../assets/icons/add.svg";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

interface FloatingButtonProps {
  closed?: boolean
}

const {closed} = defineProps<FloatingButtonProps>()
const {push} = useRouter()

</script>

<template>
  <div class="floating-button-drawer flex justify-end items-center z-1">
    <Transition>
      <Button v-if="!closed" only-icon size="large"
              bg-color="bg-blue-600" @click="() => {push(RoutesPath.select)}">
        <template v-slot:icon-left>
          <AddIcon class="fill-white"/>
        </template>
      </Button>
    </Transition>
  </div>

</template>

<style scoped>
.floating-button-drawer {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.v-enter-active,
.v-leave-active {
  @apply transition;
  @apply duration-200;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(150%);
  opacity: 0;
}
</style>