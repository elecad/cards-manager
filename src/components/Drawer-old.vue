<script setup lang="ts">
import {DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot} from "vaul-vue";
import {useDrawerStore} from "../store/useDrawerStore.ts";
import {watch} from "vue";

const drawerStore = useDrawerStore()

watch(drawerStore, (o, n) => {
  console.log("Новое состояние", n.isOpen)
})

</script>

<template>
  <DrawerRoot should-scale-background v-model:open="drawerStore.isOpen">
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-black/40"/>

      <DrawerContent class="bg-white flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0">
        <div class="p-4 rounded-t-[10px] flex-1">
          <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8"/>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
          <div class="max-w-md mx-auto">
            123
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style scoped>

</style>