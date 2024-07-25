<script setup lang="ts">
  import WalletIcon from "../assets/icons/wallet.svg"
  import AddCardIcon from "../assets/icons/add_card.svg"
  import SettingsIcon from "../assets/icons/settings.svg"
  import SearchIcon from "../assets/icons/search.svg"
  import CardOffIcon from "../assets/icons/card_off.svg"
  import {ref} from "vue";

  const cards = ref(['Тестовая карта 1', 'Тестовая карта 2', 'Тестовая карта 3', 'Тестовая карта 4'])
</script>

<template>
  <div class="navigation-bar flex px-6 justify-between items-center">
    <div class="flex hover:opacity-80 gap-1">
      <WalletIcon width="22px" height="22px" style="fill: black;"/>
      <p class="font-bold text-inherit" >Картница</p>
    </div>

    <div class="buttons-wrapper flex gap-4 ">
      <button class="flex items-center justify-center outline-none bg-primary text-primary-foreground rounded-xl" style="background-color: rgb(0, 111, 238);height: 40px; width: 40px"><AddCardIcon style="fill: white;"/></button>
      <button class="flex items-center justify-center outline-none bg-primary text-primary-foreground rounded-xl" style="background-color: rgb(238, 238, 239);height: 40px; width: 40px"><SettingsIcon style="fill: rgb(82, 82, 91);"/></button>
    </div>
  </div>

  <div class="content px-5 pt-4">

   <div class="w-full bg-gray-100 h-10 rounded-xl flex justify-start items-center px-3">
     <SearchIcon style="color: rgb(179, 179, 186)" width="16px" height="16px"/>
     <input class="w-full outline-none bg-transparent font-normal text-sm pl-2 h-full" type="search" placeholder="Поиск карты..."/>
   </div>

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




    <div class="sale-card-wrapper grid grid-cols-2 gap-2">

      <div v-for="card in cards" class="sale-card aspect-video rounded-xl whitespace-normal gap-1.5 flex justify-center items-center flex-col text-sm" style="background-color: rgb(246, 246, 247); border: 2px solid rgb(213, 213, 217)">
        <img src="../assets/logo/not-found.png" alt="Логотип" width="24" class="rounded"/>
        <div class="text-wrap break-all font-mono font-semibold">{{card}}</div>
      </div>

    </div>




  </div>

</template>

<style scoped>
.navigation-bar {
  height: 64px;
}
</style>