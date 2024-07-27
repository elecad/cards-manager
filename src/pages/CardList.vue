<script setup lang="ts">
import WalletIcon from "../assets/icons/wallet.svg"
import AddCardIcon from "../assets/icons/add_card.svg"
import SettingsIcon from "../assets/icons/settings.svg"
import SearchIcon from "../assets/icons/search.svg"
import CardOffIcon from "../assets/icons/card_off.svg"
import {ref} from "vue";
import DrawerLayout from "../layouts/DrawerLayout.vue";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import Button from "../components/Button.vue";

const cards = ref(['Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют'])
const isEdit = ref(true)
</script>

<template>
  <DrawerLayout>
    <div vaul-drawer-wrapper="">
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


        <div class="sale-card-wrapper grid grid-cols-2 gap-2"
             v-sortable="{ disabled: isEdit, options: { animation: 300, dragoverBubble: true} }">

          <div v-for="card in cards" @click="() => {console.log(123)}"
               class="sale-card aspect-video rounded-xl whitespace-normal gap-1.5 flex justify-center items-center flex-col text-sm"
               style="background-color: rgb(246, 246, 247); border: 2px solid rgb(213, 213, 217)">
            <img src="../assets/logo/not-found.png" alt="Логотип" width="24" class="rounded"/>
            <div class="text-wrap break-all font-mono font-semibold">{{ card }}</div>
          </div>

        </div>


      </div>

    </div>
  </DrawerLayout>
</template>

<style scoped>
.navigation-bar {
  height: 64px;
}
</style>