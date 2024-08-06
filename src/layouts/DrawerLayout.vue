<script setup lang="ts">

import Drawer from "../components/UI/Drawer.vue";
import AddIcon from "../assets/icons/add.svg"
import Button from "../components/UI/Button.vue";
import {useUIStore} from "../store/useUIStore.ts";
import DrawerContent from "../components/DrawerContent.vue";
import FloatingButton from "../components/FloatingButton.vue";

const uiStore = useUIStore()

</script>

<template>
  <div class="drawer-layout w-full h-full inline-block">

    <slot/>

    <FloatingButton :closed="uiStore.isOpen"/>

    <div class="drawer-wrapper">
      <Drawer v-model="uiStore.isOpen">
        <DrawerContent/>
      </Drawer>

    </div>
  </div>
</template>

<style scoped>

</style>