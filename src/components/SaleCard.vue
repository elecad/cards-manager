<script setup lang="ts">

interface SaleCardProps {
  name: string,
  icon?: string
}

const {name, icon} = defineProps<SaleCardProps>()
</script>

<template>
  <div class="transition-opacity">
    <div
        class="sale-card bg-gray-100 aspect-video rounded-xl whitespace-normal gap-1.5 flex justify-center items-center flex-col text-sm active:text-blue-500 border-2 border-gray-300 active:border-blue-500 active:scale-95 cursor-pointer duration-300">
      <img src="../assets/logo/not-found.png" alt="Логотип" width="24" class="rounded"/>
      <div class="text-wrap break-all font-mono font-semibold">{{ name }}</div>
    </div>
  </div>

</template>

<style scoped>
.sortable-ghost {
  opacity: 0;
}


.sortable-chosen > div {
  @apply text-blue-500;
  @apply scale-95;
  @apply border-blue-500;
}
</style>