<script setup lang="ts">

import Drawer from "../components/UI/Drawer.vue";
import AddIcon from "../assets/icons/add.svg"
import Button from "../components/UI/Button.vue";
import {useUIStore} from "../store/useUIStore.ts";
import DrawerContent from "../components/DrawerContent.vue";

const uiStore = useUIStore()

</script>

<template>
  <div class="drawer-layout w-full h-full">

    <slot/>

    <div class="floating-button-drawer flex justify-end items-center w-full p-5">
      <Button only-icon size="large"
              bg-color="bg-blue-500">
        <template v-slot:icon-left>
          <AddIcon class="fill-white"/>
        </template>
      </Button>

    </div>

    <div class="drawer-wrapper">
      <Drawer v-model="uiStore.isOpen">
        <DrawerContent/>
      </Drawer>

    </div>
  </div>
</template>

<style scoped>
.floating-button-drawer {
  position: fixed;
  bottom: 0;
}
</style>