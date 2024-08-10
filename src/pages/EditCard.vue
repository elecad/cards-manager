<script setup lang="ts">

import DefaultLayout from "../layouts/DefaultLayout.vue";
import Input from "../components/UI/Input.vue";
import Textarea from "../components/UI/Textarea.vue";
import Button from "../components/UI/Button.vue";
import BackIcon from "../assets/icons/back.svg";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import Navigation from "../components/Navigation.vue";
import DeleteIcon from "../assets/icons/delete.svg";
import SaveIcon from "../assets/icons/save.svg"
import {ref} from "vue";
import {ISaleCard} from "../service/card.service.ts";
import {PlaceholderCard} from "../store/useCardStore.ts";

const {push} = useRouter()

const editedCard = ref<ISaleCard>(PlaceholderCard)

const routerState = history.state.prevDate as ISaleCard
if (!routerState) {
  push(RoutesPath.error)
} else {
  editedCard.value = routerState
}
</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-5 pt-4">
      <div class="flex items-center justify-between mb-3">
        <div class="font-bold text-inherit text-xl">Редактировать</div>
        <Button only-icon size="large"
                bg-color="bg-red-600"
                @click="() => {push(RoutesPath.edit)}"
        >
          <template v-slot:icon-left>
            <DeleteIcon class="fill-white"/>
          </template>
        </Button>
      </div>

      <div class="mb-3">
        <div class="text-sm font-medium mb-2">Название:</div>
        <Input v-model="editedCard.name" placeholder="Как будет называться карта?"/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">
          Осмысленное название позволяет найти иконку. Рекомендуется использовать название магазина
        </div>
      </div>

      <div class="mb-5">
        <div class="text-sm font-medium mb-2">Номер карты:</div>
        <Input v-model="editedCard.data" placeholder="Тут будет отображаться номер карты" readonly/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">Если вдруг номер
          отличается от того, что есть на Вашей карте, просканируйте карту снова!
        </div>
      </div>

      <div class="mb-5 flex items-center justify-center gap-3">
        <div class="rounded-2xl shadow-sm p-1 border-2">
          <img src="../assets/Barcode.png" alt="Штрих-код"/>
        </div>
        <div class="rounded-2xl shadow-sm p-3 border-2">
          <img src="../assets/logo/lenta.png" alt="Лого карты" class="rounded"/>
        </div>
      </div>


      <div class="mb-8">
        <div class="text-sm font-medium mb-2">Дополнительные данные о карте:</div>
        <Textarea placeholder="Что можно сохранить о карте?"/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">Здесь можно сохранить код списания
          бонусов, дату создания или другую дополнительную информацию
        </div>
      </div>

      <div class="flex items-center justify-evenly gap-6 mb-4">
        <Button class="flex-2">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white" class="flex-1" @click="() => push(RoutesPath.main)">
          <template v-slot:icon-right>
            <SaveIcon class="fill-white w-5 h-5"/>
          </template>
          Сохранить карту
        </Button>
      </div>
    </div>

  </DefaultLayout>
</template>

<style scoped>

</style>