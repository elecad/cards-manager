<script setup lang="ts">
import {onMounted, ref} from "vue";
import Sortable from 'sortablejs';

const rootElement = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!rootElement.value)
    return
  const sortable = new Sortable(rootElement.value, {
    animation: 200,
    delay: 300

  });
})


</script>

<template>
  <div class="touch-list" ref="rootElement">
    <slot/>
  </div>
</template>

<style scoped>

</style>