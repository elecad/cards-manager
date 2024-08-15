<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const isOpen = defineModel({required: true, type: Boolean})
const drawerElement = ref<HTMLDivElement | undefined>(undefined)
const isSwipe = ref(false)
const animatedBackgroundElement = ref<HTMLDivElement | null>(null)
const themeColorMeta = ref<HTMLMetaElement | null>(null)
onMounted(() => {
  animatedBackgroundElement.value = document.querySelector("[data-animated-background]")
  themeColorMeta.value = document.querySelector('meta[name="theme-color"]')
})
let start = 0

const startSwipe = (event: TouchEvent) => {
  isSwipe.value = true
  start = event.touches[0].screenY
}

const processSwipe = (event: TouchEvent) => {
  if (!drawerElement.value)
    return
  const position = event.touches[0].screenY - start
  if (position > 0) {
    drawerElement.value.style.transform = `translateY(${position}px)`
  }
}

const endSwipe = (event: TouchEvent) => {
  if (!drawerElement.value)
    return
  const delta = event.changedTouches[0].screenY - start

  if (delta > 100) {
    isOpen.value = false
  }
  drawerElement.value.style.transform = ``
  isSwipe.value = false

}

const smooth = (x: number) => {
  return x < 0.5 ? 2 * x ** 2 : 1 - 2 * (1 - x) ** 2;
}

watch(isOpen, (newValue) => {
  if (animatedBackgroundElement.value) {
    document.body.classList.toggle('small-body')
  }
  themeColorMeta.value.content = newValue ? "rgba(0,0,0)" : "rgb(255,255,255)"
})

</script>

<template>
  <Teleport to="body">
    <div class="drawer-root z-20">
      <Transition>
        <div class="drawer-overlay fixed inset-0 bg-black/30" @click="isOpen = false"
             v-if="isOpen"></div>
      </Transition>
      <div
          class="drawer-wrapper bg-white flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 p-4"
          @touchstart="startSwipe"
          @touchmove="processSwipe"
          @touchend="endSwipe"
          :class="{'open': isOpen, '!transition-none': isSwipe}"
          ref="drawerElement"

      >
        <div class="mx-auto w-12 h-1.5 rounded-full bg-zinc-300 mb-8"/>
        <slot/>
      </div>
    </div>
  </Teleport>

</template>

<style scoped>
.drawer-wrapper {
  transition: transform .2s cubic-bezier(.32, .72, 0, 1);
  transform: translateY(110%);

}

.drawer-wrapper.open {
  transform: translateY(0);
}


/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>