<script setup lang="ts">

import DefaultLayout from "../layouts/DefaultLayout.vue";
import Button from "../components/UI/Button.vue";
import BackIcon from "../assets/icons/back.svg";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import Logo from "../components/Logo.vue";
import BigButton from "../components/SelectItem.vue";
import AddCameraIcon from "../assets/icons/add_camera.svg";
import AddImageIcon from "../assets/icons/add_image.svg";

const {replace} = useRouter()


interface Modes {
  header: string
  label: string
  path: string
  icon: "camera" | "file"
}

const modes: Modes[] = [
  {
    header: "Карта рядом?",
    label: "Можно сканировать штрих-код карты с помощью камеры устройств",
    icon: "camera",
    path: RoutesPath.camera
  },
  {
    header: "Есть фото карты?",
    label: "Можно сканировать штрих-код с фотографии или скриншота карты",
    icon: "file",
    path: RoutesPath.file
  },
]
const selectedMode = ref(0)

const changeMode = (_: MouseEvent, mode: number) => {
  selectedMode.value = mode
}

const nextStage = () => {
  const current = modes[selectedMode.value]
  if (!current)
    return
  replace(current.path)
}
</script>

<template>
  <DefaultLayout>
    <div class="content px-5 flex align-center justify-center flex-col h-dvh gap-4">
      <Logo class="mb-3"/>
      <div class="text-center text-lg text-gray-500">Как добавить карту?</div>

      <BigButton v-for="({header, label, icon}, i) in modes" :header :label
                 @click="($event) => {changeMode($event, i); nextStage()}"
      >
        <AddCameraIcon v-if="icon == 'camera'" class="h-8 w-8 fill-gray-400"/>
        <AddImageIcon v-else class="h-8 w-8 fill-gray-400"/>
      </BigButton>


      <div class="flex items-center justify-evenly gap-6 mt-5">
        <Button class="flex-1" @click="() => {replace(RoutesPath.main)}">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <!--                <Button bg-color="bg-blue-600" text-color="text-white flex-1" @click="nextStage">-->
        <!--                  <template v-slot:icon-right>-->
        <!--                    <NextIcon class="fill-white w-4 h-4"/>-->
        <!--                  </template>-->
        <!--                  Далее-->
        <!--                </Button>-->
      </div>

    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>