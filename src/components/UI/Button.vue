<script setup lang="ts">

import {computed} from 'vue'

interface ButtonProps {
  size?: "normal" | "large",
  onlyIcon?: boolean,
  bgColor?: string,
  textColor?: string,
  iconFill?: string
}


const props = withDefaults(defineProps<ButtonProps>(), {
  size: "normal",
  bgColor: "bg-default",
  textColor: "text-gray-800",
  onlyIcon: false
})

const isNormal = computed(() => props.size == "normal")

const ripple = () => {

}

</script>

<template>
  <button
      @click="ripple"
      class="flex items-center justify-center outline-none rounded-xl gap-2 transition active:scale-90 shadow text-sm hover:opacity-90 active:opacity-100"
      :class="bgColor, textColor,
      {
        'ui-btn-normal-only-icon': isNormal && onlyIcon,
        'ui-btn-large-only-icon': !isNormal && onlyIcon,
        'p-4': !isNormal && !onlyIcon,
        'p-3': isNormal && !onlyIcon,
      }">

    <slot name="icon-left"/>
    <slot/>
    <slot name="icon-right"/>

  </button>
</template>

<style scoped>

.ui-btn-normal-only-icon {
  width: 40px;
  height: 40px;
}

.ui-btn-large-only-icon {
  width: 48px;
  height: 48px;
}

.bg-default {
  background-color: #eeeeef;
}


</style>