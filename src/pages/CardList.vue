<script setup lang="ts">

import {ref} from "vue";
import DrawerLayout from "../layouts/DrawerLayout.vue";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import SaleCard from "../components/SaleCard.vue";
import {useUIStore} from "../store/useUIStore.ts";
import TouchList from "../components/UI/TouchList.vue";

const cards = ref(['Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют', 'Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют', 'Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют', 'Магнит', 'Планета Здоровья', 'Пятёрочка', 'Абсолют'])
const drawerStore = useUIStore()

const name = ref('')
const description = ref('')

</script>

<template>
  <DrawerLayout>
    <div data-animated-background>
      <Navigation/>
      <div class="content px-5 pt-4">
        <Search/>
        <h3 class="font-bold mt-6 mb-5">Мои карты</h3>
        <TouchList class="sale-card-wrapper grid grid-cols-2 gap-1.5">
          <SaleCard v-for="card in cards" :name="card" @click="drawerStore.openDrawer"/>
        </TouchList>
      </div>
    </div>
  </DrawerLayout>
</template>

<style scoped>


</style>