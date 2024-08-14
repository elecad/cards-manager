<script setup lang="ts">
import {onMounted, ref} from "vue";
import Sortable from "sortablejs";


const rootElement = ref<HTMLDivElement | null>(null)

const emit = defineEmits<{
  (e: 'endTouch', event: Sortable.SortableEvent): void
}>()

onMounted(() => {
  if (!rootElement.value)
    return

  new Sortable(rootElement.value, {
    animation: 200,
    delay: 300,
    onSort(event) {
      emit('endTouch', event)
    },

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