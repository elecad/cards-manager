<script setup lang="ts">

import Button from "../components/UI/Button.vue";
import Logo from "../components/Logo.vue";
import BackIcon from "../assets/icons/back.svg";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ImageSearchIcon from "../assets/icons/image_search.svg";
import BigButton from "../components/SelectItem.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useFile} from "../hooks/useFile.ts";
import {useBarcode} from "../hooks/useBarcode.ts";
import {RoutesPath} from "../router/router.ts";
import CancelIcon from "../assets/icons/cancel.svg";

const {back} = useRouter()
const {fileToBlob} = useFile()
const {detect, generate} = useBarcode()
const fileElement = ref<HTMLInputElement | null>(null)
const {push} = useRouter()
const isOpenAlert = ref(false)
const alertMessage = ref("")


const supportedFormats = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"
]

const clickHandler = () => {
  if (!fileElement.value)
    return
  fileElement.value.click()

}

const openAlert = (text: string, time?: number) => {
  alertMessage.value = text
  isOpenAlert.value = true
  if (time)
    setTimeout(() => {
      isOpenAlert.value = false
    }, time)
}

const loadHandler = async (event: Event) => {

  const element = event.target as HTMLInputElement
  if (!element.files)
    return

  const file = element.files[0];
  fileToBlob(file, async (blob) => {
    try {
      const codes = await detect(blob)
      console.log(codes)
      if (!codes.length) {
        openAlert("Штрих-код не найден", 1500)
        return
      }
      const code = codes[0]
      const base64 = await generate(code.rawValue, code.format)
      push({
        path: RoutesPath.create, state: {
          prevData: {
            barcode: base64,
            type: code.format,
            data: code.rawValue
          }
        }
      })
    } catch (e) {
      console.error(e)
      openAlert("Данный формат файлов не поддерживается", 1500)
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
        :class="{'open': isOpenAlert}"
    >
      <CancelIcon class="fill-white w-6 h-6"/>
      <div class="alert-message text-md text-white text-center">{{ alertMessage }}</div>
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

@media (max-width: 370px) {
  .alert-message {
    @apply text-xs
  }
}
</style>