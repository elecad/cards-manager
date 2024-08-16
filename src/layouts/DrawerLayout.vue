<script setup lang="ts">

import Drawer from "../components/UI/Drawer.vue";
import {useDrawer} from "../store/useDrawer.ts";
import DrawerContent from "../components/DrawerContent.vue";
import FloatingButton from "../components/FloatingButton.vue";

const uiStore = useDrawer()


</script>

<template>
  <div class="drawer-layout w-full h-full inline-block" data-animated-background>
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