<script setup lang="ts">

import Navigation from "../../components/Navigation.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import CheckBox from "../../components/UI/CheckBox.vue";
import Button from "../../components/UI/Button.vue";
import CheckIcon from "../../assets/icons/check.svg";
import BackIcon from "../../assets/icons/back.svg";
import Dexie, {EntityTable} from 'dexie';
import {onMounted, watch} from "vue";

import {cardService} from "../../service/card.service.ts";
import {useCardStore} from "../../store/useCardStore.ts";

interface ISaleCard {
  id: string
  name: string
  description: string
  barcode: string
  sharedData: {
    type: string
    data: string
  }
}

const {getAll, create, update, remove, get} = cardService()


// const db = new Dexie('myDatabase') as Dexie & {
//   saleCards: EntityTable<
//       ISaleCard,
//       'id' // primary key "id" (for the typings only)
//   >;
// };
//
// db.version(1).stores({
//   saleCards: '++id', // Primary key and indexed props
// });

onMounted(async () => {
  // const newCard = await create({
  //   name: "Тестовая карта",
  //   barcode: "123",
  //   description: "Код",
  //   sharedData: {data: "123", type: "test"}
  // })
  // console.log(newCard)
  //
  // const all = await getAll();
  // console.log(all)
  //
  // console.log(await get(5))
  //
  // console.log(await update(4, {name: "Тестовая карта 2"}))
  // console.log(await remove(4))


  // const test = await db.saleCards.add({
  //   id: await uuidv4(),
  //   name: 'Магнит',
  //   description: "Код списания: 234",
  //   barcode: "image",
  //   sharedData: {
  //     type: "QR",
  //     data: "1234"
  //   }
  // });
  // console.log(test)
  // const cards = await db.saleCards
  //     .toArray();
  // console.log(cards)
})

const store = useCardStore()


const action = async () => {
  store.add({name: "Тестовая карта", barcode: "123", description: "Тест", sharedData: {data: "123", type: "123"}})
  // console.log(store.get(5))
}

</script>

<template>
  <DefaultLayout>
    <Navigation/>
    <div class="content px-3 pt-4">
      <div class="font-bold text-inherit text-xl mb-6 pl-3">Поделиться</div>


      <div class="bg-gray-200 rounded-md mb-4 p-3">
        <div v-if="store.isLoading">Загрузка...</div>
        <div v-else class="grid-cols-2 grid gap-2 rounded">
          <div v-for="card in store.cards" class="flex items-center justify-center bg-gray-100">
            {{ card.name }}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-evenly gap-6">
        <Button class="flex-2">
          <template v-slot:icon-left>
            <BackIcon class="fill-gray-500 w-4 h-4"/>
          </template>
          Назад
        </Button>
        <Button bg-color="bg-blue-600" text-color="text-white flex-1" @click="action">
          <template v-slot:icon-right>
            <CheckIcon class="fill-white w-6 h-6"/>
          </template>
          Сделать действие
        </Button>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>