<script setup lang="ts">
interface CheckBoxProps {
  disabled?: boolean
}

const model = defineModel()

const {disabled} = defineProps<CheckBoxProps>()
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="model" :disabled>
    <span class="slider"></span>
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s cubic-bezier(0, 1, 0.5, 1);
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s cubic-bezier(0, 1, 0.5, 1);
  border-radius: 50%;

}

input:checked + .slider {
  @apply bg-blue-600;
}


input:checked + .slider:before {
  transform: translateX(26px);
}


</style>