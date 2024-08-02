<script setup lang="ts">

import Button from "../components/UI/Button.vue";
import Logo from "../components/Logo.vue";
import BackIcon from "../assets/icons/back.svg";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ImageSearchIcon from "../assets/icons/image_search.svg";
import BigButton from "../components/UI/BigButton.vue";
import {useRouter} from "vue-router";

const {back} = useRouter()
</script>

<template>
  <DefaultLayout>
    <div class="content px-5 flex align-center justify-center flex-col !h-dvh gap-8">
      <Logo/>

      <BigButton header="Выбор изображения"
                 :labels="['Нажмите, чтобы выбрать изображение для поиска', 'Поддерживаются только изображения с штрих-кодом карты']">
        <ImageSearchIcon class="!w-10 !h-10"/>
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
  </DefaultLayout>
</template>

<style scoped>

</style>