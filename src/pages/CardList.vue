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
import {debounce} from "../helpers/Debounce.ts";
import SearchLogo from "../components/SearchLogo.vue";
import SearchNotFound from "../components/SearchNotFound.vue";
import {RoutesPath} from "../router/router.ts";
import SearchOffIcon from "../assets/icons/search_off.svg"
import Button from "../components/UI/Button.vue";
import {SortableEvent} from "sortablejs";

const drawerStore = useDrawer()
const cardStore = useCardStore()
const isSearch = ref(false)
const query = ref("")

cardStore.getAll()

const getIconPath = (icon: string) => `/src/assets/logo/${icon}`

const clickHandler = (_: MouseEvent, selectedCard: ISaleCard) => {
  cardStore.select(selectedCard)
  drawerStore.openDrawer()
}

const focusHandler = () => {
  isSearch.value = true
  console.log("Начало поиска")
}


const searchHandler = debounce(() => {
  console.log(query.value)
}, 150)

const blurHandler = () => {
  if (query.value.length)
    return
  isSearch.value = false
  console.log("Конец поиска")
}

const endSearch = () => {
  isSearch.value = false
  query.value = ""
}
const searchCards = computed(() => cardStore.cards.filter((c) => c.name.toLowerCase().includes(query.value.toLowerCase())))

const touchSort = async (event: SortableEvent) => {
  const newIndex = event.newIndex
  const oldIndex = event.oldIndex
  console.log(newIndex, oldIndex)
  if (newIndex == undefined)
    return
  if (oldIndex == undefined)
    return

  const newPosition = newIndex + 1
  const oldPosition = oldIndex + 1

  const touchCard = cardStore.getByPosition(oldPosition)
  const editCard = cardStore.getByPosition(newPosition)

  if (!touchCard)
    return
  if (!editCard)
    return

  await cardStore.update({...editCard, position: oldPosition})
  await cardStore.update({...touchCard, position: newPosition})
}
</script>

<template>
  <DrawerLayout>
    <div data-animated-background>
      <Navigation/>
      <div class="content px-5 pt-4">
        <Search v-model="query" @change="searchHandler" @focus="focusHandler" @blur="blurHandler"/>

        <Transition name="fade">
          <div v-if="isSearch">
            <h3 class="font-bold mt-6 mb-5">Поиск карт</h3>
            <SearchLogo v-if="query.length == 0" @endSearch="endSearch"/>
            <SearchNotFound v-else-if="searchCards.length == 0" @endSearch="endSearch"/>
            <template v-else>
              <div class="sale-card-wrapper grid grid-cols-2 gap-1.5">
                <SaleCard
                    v-for="card in searchCards"
                    :name="card.name"
                    :iconPath="getIconPath(card.icon)"
                    @click="clickHandler($event, card)"/>
              </div>
              <div class="flex items-center justify-center mt-16">
                <Button bg-color="bg-gray-100" text-color="text-gray-600" @click="endSearch">
                  <template v-slot:icon-left>
                    <SearchOffIcon class="fill-gray-600 w-6 h-6"/>
                  </template>
                  Закончить поиск
                </Button>
              </div>

            </template>

          </div>
          <div v-else>
            <h3 class="font-bold mt-6 mb-5">Мои карты</h3>
            <EmptyCardList v-if="cardStore.cards.length === 0 && !cardStore.isLoading"/>
            <template v-else>
              <TouchList class="sale-card-wrapper grid grid-cols-2 gap-1.5 mb-20" @endTouch="touchSort">
                <SaleCard v-for="card in cardStore.cards" :name="card.name" :iconPath="getIconPath(card.icon)"
                          @click="clickHandler($event, card)"/>
              </TouchList>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </DrawerLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  width: calc(100vw - 20px * 2);
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>