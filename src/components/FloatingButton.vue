<script setup lang="ts">
import Button from "./UI/Button.vue";
import AddIcon from "../assets/icons/add.svg";

interface FloatingButtonProps {
  closed?: boolean
}

const {closed} = defineProps<FloatingButtonProps>()

</script>

<template>
  <Teleport to="body">
    <div class="floating-button-drawer flex justify-end items-center w-full p-5 z-1">
      <Transition>
        <Button v-if="!closed" only-icon size="large"
                bg-color="bg-blue-600">
          <template v-slot:icon-left>
            <AddIcon class="fill-white"/>
          </template>
        </Button>
      </Transition>
    </div>
  </Teleport>

</template>

<style scoped>
.floating-button-drawer {
  position: fixed;
  bottom: 0;
}

.v-enter-active,
.v-leave-active {
  @apply transition-transform;
  @apply duration-200;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(200%);
}
</style>