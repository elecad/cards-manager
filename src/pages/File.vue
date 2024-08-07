<script setup lang="ts">

import Button from "../components/UI/Button.vue";
import Logo from "../components/Logo.vue";
import BackIcon from "../assets/icons/back.svg";
import CancelIcon from "../assets/icons/cancel.svg";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ImageSearchIcon from "../assets/icons/image_search.svg";
import BigButton from "../components/SelectItem.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";

const {back} = useRouter()
const fileElement = ref<HTMLInputElement | null>(null)
const isVisible = ref(false)

const clickHandler = () => {
  if (!fileElement.value)
    return
  fileElement.value.click()
  alert()

}

const alert = () => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 1500)
}

</script>

<template>
  <DefaultLayout>
    <div class="content px-5 flex align-center justify-center flex-col !h-dvh gap-8">
      <Logo/>

      <BigButton
          @click="clickHandler"
          header="Выбор изображения"
          :labels="['Нажмите, чтобы выбрать изображение для поиска', 'Поддерживаются только изображения с штрих-кодом карты']">
        <ImageSearchIcon class="!w-10 !h-10"/>
        <input type="file" accept="image/*" class="hidden" ref="fileElement">

      </BigButton>


      <div class="flex items-center justify-evenly gap-6 mt-5">
        <Button class="flex-1" @click="back">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
      </div>
    </div>

    <div
        class="alert-wrapper bg-red-500 rounded-t-md shadow-sm p-2 flex items-center justify-center gap-3 w-full transition-transform duration-500"
        :class="{'open': isVisible}"
    >
      <CancelIcon class="fill-white w-6 h-6"/>
      <div class="text-md text-white">Штрих-код не найден</div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.alert-wrapper {
  position: fixed;
  bottom: 0;
  transform: translateY(100%);
}

.alert-wrapper.open {
  transform: translateY(0);
}
</style>