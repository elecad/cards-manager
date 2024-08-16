<script setup lang="ts">

import DefaultLayout from "../layouts/DefaultLayout.vue";
import Logo from "../components/Logo.vue";
import Input from "../components/UI/Input.vue";
import Textarea from "../components/UI/Textarea.vue";
import AddCardIcon from "../assets/icons/add_card.svg";
import Button from "../components/UI/Button.vue";
import BackIcon from "../assets/icons/back.svg";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import {ISaleCardTransport} from "../service/card.service.ts";
import {computed, ref, watch} from "vue";
import {notFoundIcon, saleCardIconList} from "../config/cardPatterns.ts";
import {debounce} from "../helpers/Debounce.ts";
import Alert from "../components/UI/Alert.vue";
import {useAlert} from "../store/useAlert.ts";
import {ICreateCard, PlaceholderCreatedData, useCardStore} from "../store/useCardStore.ts";


const {replace} = useRouter()
const cardState = useCardStore()
const cardData = ref<ISaleCardTransport>(PlaceholderCreatedData)

const routerState = history.state.prevData as ISaleCardTransport

console.log(history.state)
if (!routerState) {
  replace(RoutesPath.error)
} else {
  cardData.value = routerState
}

const {openAlert, closeAlert} = useAlert()
const name = ref("")
const description = ref("")
const iconName = ref(notFoundIcon)
const isValidMinLenght = computed(() => name.value.length > 0)
const isValidMaxLenght = computed(() => name.value.length < 21)


watch(isValidMaxLenght, (newValue) => {
  if (!newValue)
    openAlert("Название должно быть меньше")
  else
    closeAlert()

})

const iconPath = computed(() => `/public/logo/${iconName.value}`)

const inputHandler = debounce(() => {
  const findIcon = saleCardIconList.find((el) => {
    const nameFix = name.value.trim().toLowerCase();
    const patternFix = el.pattern.trim().toLowerCase();
    return nameFix.includes(patternFix);
  });
  if (findIcon)
    iconName.value = findIcon.file
  else
    iconName.value = notFoundIcon
}, 300)


const createHandler = async () => {
  const isValid = isValidMinLenght.value && isValidMaxLenght.value
  if (!isValid) {
    return
  }

  const newCard: ICreateCard =
      {
        name: name.value,
        description: description.value,
        type: cardData.value.type,
        barcode: cardData.value.barcode,
        data: cardData.value.data,
        icon: iconName.value
      }
  await cardState.add(newCard)

  await replace({path: RoutesPath.complete, state: {prevDate: newCard}})
}

</script>

<template>
  <DefaultLayout>
    <Logo class="h-16"/>
    <div class="content px-5 pt-4">
      <div class="font-bold text-inherit text-xl mb-5">Добавление новой карты</div>

      <div class="mb-3">
        <div class="text-sm font-medium mb-2">Название:</div>
        <Input v-model="name" placeholder="Как будет называться карта?" @change="inputHandler"/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">
          Осмысленное название позволяет найти иконку. Рекомендуется использовать название магазина
        </div>
      </div>

      <div class="mb-5">
        <div class="text-sm font-medium mb-2">Номер карты:</div>
        <Input v-model="cardData.data" placeholder="Тут будет отображаться номер карты" readonly/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">Если вдруг номер
          отличается от того, что есть на Вашей карте, просканируйте карту снова!
        </div>
      </div>

      <div class="mb-5 flex items-center justify-center gap-3">
        <div class="rounded-2xl shadow-sm p-2 border-2">
          <img :src="cardData.barcode" alt="Штрих-код"/>
        </div>
        <div class="rounded-2xl shadow-sm p-3 border-2">
          <img :src="iconPath" alt="Лого карты" class="rounded"/>
        </div>
      </div>


      <div class="mb-8">
        <div class="text-sm font-medium mb-2">Дополнительные данные о карте:</div>
        <Textarea v-model="description" placeholder="Что можно сохранить о карте?"/>
        <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">Здесь можно сохранить код списания
          бонусов, дату создания или другую дополнительную информацию
        </div>
      </div>


      <div class="flex items-center justify-evenly gap-6 mb-4">
        <Button class="flex-2" @click="() => {replace(RoutesPath.select)}">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white" class="flex-1" @click="createHandler"
                :disabled="!(isValidMinLenght && isValidMaxLenght)">
          <template v-slot:icon-right>
            <AddCardIcon class="fill-white w-5 h-5"/>
          </template>
          Добавить карту
        </Button>
      </div>
    </div>
    <Alert/>
  </DefaultLayout>
</template>

<style scoped>

</style>