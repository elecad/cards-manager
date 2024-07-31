<script setup lang="ts">

import DefaultLayout from "../layouts/DefaultLayout.vue";
import Button from "../components/UI/Button.vue";
import Navigation from "../App.vue";
import NextIcon from "../assets/icons/next.svg";
import BackIcon from "../assets/icons/back.svg";
import CreateMode, {CreateModeProps} from "../components/CreateMode.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import {c} from "vite/dist/node/types.d-aGj9QkWt";

const {push} = useRouter()

interface Modes extends CreateModeProps {
  path: string
}

const modes: Modes[] = [
  {
    header: "Карта рядом?",
    label: "Можно сканировать штрих-код карты с помощью камеры устройств",
    mode: "camera",
    path: RoutesPath.camera
  },
  {
    header: "Есть фото карты?",
    label: "Можно сканировать штрих-код с фотографии или скриншота карты",
    mode: "file",
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
  push(current.path)
}
</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-5 flex align-center justify-center flex-col h-dvh gap-3">
      <div class="text-center text-xl text-gray-600">Каким способом добавить новую карту?</div>


      <CreateMode v-for="(m, i) in modes" :header="m.header" :label="m.label" :mode="m.mode"
                  :selected="i == selectedMode" @click="changeMode($event, i)"/>


      <div class="flex items-center justify-evenly gap-6 mt-3">
        <Button class="flex-1" @click="() => {push(RoutesPath.main)}">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white flex-1" @click="nextStage">
          <template v-slot:icon-right>
            <NextIcon class="fill-white w-4 h-4"/>
          </template>
          Далее
        </Button>
      </div>

    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>