<script setup lang="ts">

import {ref} from "vue";
import DrawerLayout from "../layouts/DrawerLayout.vue";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import SaleCard from "../components/SaleCard.vue";
import {useUIStore} from "../store/useUIStore.ts";
import TouchList from "../components/UI/TouchList.vue";

const cards = ref(['Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют'])
const drawerStore = useUIStore()

</script>

<template>
  <DrawerLayout>
    <div data-animated-background>
      <Navigation/>

      <div class="content px-5 pt-4">

        <Search/>

        <h3 class="font-bold mt-6 mb-5">Мои карты</h3>

        <!--    Нет карт-->
        <!--    <div class="empty-card-list flex items-center justify-center flex-col text-gray-500 gap-9 mt-6">-->
        <!--      <div class="flex gap-3 flex-col justify-center items-center">-->
        <!--        <div class="text-xl">Тут ничего нет...</div>-->
        <!--        <CardOffIcon  width="72px" height="72px" style="fill: rgba(82, 82, 91, 0.8);"/>-->
        <!--        <div class="text-sm">Ниже можно добавить новую карту</div>-->
        <!--      </div>-->

        <!--      <button class="text-white px-3 py-2 rounded-xl text-sm" style="background-color: rgb(0, 111, 238)">Добавить новую карту</button>-->
        <!--    </div>-->


        <TouchList class="sale-card-wrapper grid grid-cols-2 gap-1.5">
          <SaleCard v-for="card in cards" :name="card" @click="drawerStore.openDrawer"/>
        </TouchList>


      </div>

    </div>
  </DrawerLayout>
</template>

<style scoped>
.navigation-bar {
  height: 64px;
}
</style>