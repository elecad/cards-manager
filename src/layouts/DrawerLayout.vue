<script setup lang="ts">

import Drawer from "../components/UI/Drawer.vue";
import EditIcon from "../assets/icons/edit.svg"
import Button from "../components/UI/Button.vue";
import {useUIStore} from "../store/useUIStore.ts";

const uiStore = useUIStore()

</script>

<template>
  <div class="drawer-layout w-full h-full">

    <slot/>

    <div class="floating-button-drawer flex justify-end items-center w-full p-5">
      <Button only-icon size="large" bg-color="bg-gray-300">
        <template v-slot:icon-left>
          <EditIcon class="fill-gray-700"/>
        </template>
      </Button>

    </div>

    <div class="drawer-wrapper">
      <Drawer v-model="uiStore.isOpen">
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
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