<script setup lang="ts">
const props = withDefaults(defineProps<ButtonProps>(), {
  size: "normal",
  bgColor: "bg-default",
  textColor: "text-gray-800",
  onlyIcon: false
})
</script>

<template>
  <div @click="() => {console.log(123)}"
       class="sale-card aspect-video rounded-xl whitespace-normal gap-1.5 flex justify-center items-center flex-col text-sm"
       style="background-color: rgb(246, 246, 247); border: 2px solid rgb(213, 213, 217)">
    <img src="../assets/logo/not-found.png" alt="Логотип" width="24" class="rounded"/>
    <div class="text-wrap break-all font-mono font-semibold">{{ card }}</div>
  </div>
</template>

<style scoped>

</style>