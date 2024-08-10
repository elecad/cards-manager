<script setup lang="ts">

import {computed, ref} from "vue";
import DrawerLayout from "../layouts/DrawerLayout.vue";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import SaleCard from "../components/SaleCard.vue";
import {useDrawer} from "../store/useDrawer.ts";
import TouchList from "../components/UI/TouchList.vue";
import {useCardStore} from "../store/useCardStore.ts";
import EmptyCardList from "../components/EmptyCardList.vue";
import {ISaleCard} from "../service/card.service.ts";

const drawerStore = useDrawer()
const cardStore = useCardStore()

cardStore.getAll()

const getIconPath = (icon: string) => `/src/assets/logo/${icon}`

const clickHandler = (_: MouseEvent, selectedCard: ISaleCard) => {
  cardStore.select(selectedCard)
  drawerStore.openDrawer()
}

</script>

<template>
  <DrawerLayout>
    <div data-animated-background>
      <Navigation/>
      <div class="content px-5 pt-4">
        <Search/>
        <h3 class="font-bold mt-6 mb-5">Мои карты</h3>

        <!--        <Loading/>-->


        <EmptyCardList v-if="cardStore.cards.length === 0 && !cardStore.isLoading"/>
        <template v-else>
          <TouchList class="sale-card-wrapper grid grid-cols-2 gap-1.5 mb-20">
            <SaleCard v-for="card in cardStore.cards" :name="card.name" :iconPath="getIconPath(card.icon)"
                      @click="clickHandler($event, card)"/>
          </TouchList>
        </template>

      </div>
    </div>
  </DrawerLayout>
</template>

<style scoped>


</style>