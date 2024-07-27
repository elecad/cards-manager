<script setup lang="ts">

import Drawer from "../components/Drawer.vue";
import EditIcon from "../assets/icons/edit.svg"
import Button from "../components/Button.vue";
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
      <Drawer/>
    </div>
  </div>
</template>

<style scoped>
.floating-button-drawer {
  position: fixed;
  bottom: 0;
}
</style>