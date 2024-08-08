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
import {useFile} from "../hooks/useFile.ts";
import {useBarcode} from "../hooks/useBarcode.ts";

const {back} = useRouter()
const {fileToBlob} = useFile()
const {detect, generate} = useBarcode()
const fileElement = ref<HTMLInputElement | null>(null)
const isVisible = ref(false)

const supportedFormats = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"
]

const messageText = ref("Штрих-код не найден")

const clickHandler = () => {
  if (!fileElement.value)
    return
  fileElement.value.click()

}

const alert = (text: string) => {
  messageText.value = text
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 1500)
}

const loadHandler = async (event: Event) => {
  const element = event.target as HTMLInputElement
  if (!element.files)
    return

  const file = element.files[0];
  fileToBlob(file, async (blob) => {
    try {
      const codes = await detect(blob)
      if (!codes.length) {
        alert("Штрих-код не найден")
        return
      }
      const code = codes[0]
      const base64 = await generate(code.rawValue, code.format)
      console.log(base64)
    } catch (e) {
      console.error(e)
      alert("Данный формат файлов не поддерживается")
    }


  })
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
        <input @change="loadHandler" type="file" :accept="supportedFormats.join(',')"
               class="hidden"
               ref="fileElement">

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
      <div class="text-md text-white text-center">{{ messageText }}</div>
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