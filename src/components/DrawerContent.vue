<script setup lang="ts">

import Button from "./UI/Button.vue";
import EditIcon from "../assets/icons/edit.svg"
import Textarea from "./UI/Textarea.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";
import {useDrawer} from "../store/useDrawer.ts";


const {push} = useRouter()

const description = "Код списания: 236"
const isSecret = ref(true)

const drawerStore = useDrawer()

const message = computed(() =>
    isSecret.value ? description.replace(/./g, "*") : description
)

const goEditPage = () => {

  drawerStore.closeDrawer();
  setTimeout(() => {
    push(RoutesPath.edit)
  }, 100)
}

</script>

<template>
  <div class="drawer-content">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center justify-start gap-2">
        <img src="../assets/logo/magnit.png" alt="Лого карты" class="rounded w-6 h-6"/>
        <div class="card-name font-medium text-2xl">РазДваТриЧетыреПятьШ</div>
      </div>

      <Button only-icon size="large"
              bg-color="bg-slate-300"
              @click="goEditPage"
      >
        <template v-slot:icon-left>
          <EditIcon class="fill-black"/>
        </template>
      </Button>
    </div>

    <div class="mb-2 flex items-center justify-center gap-3">
      <div class="rounded-2xl shadow p-1 border-2 shadow-black/5">
        <img src="../assets/Barcode.png" alt="Штрих-код"/>
      </div>
    </div>
    <div class="text-center text-gray-500">2800001204845</div>

    <hr class="my-4"/>

    <div class="mb-4">
      <div class="text-sm font-medium mb-2">Дополнительные данные о карте:</div>
      <Textarea placeholder="Дополнительные данные о карте" readonly
                v-model="message" @click="() => {isSecret = !isSecret}"/>
      <div class="text-xs font-medium text-slate-500 mb-1 text-center mt-1">Для того, чтобы посмотреть дополнительную
        информацию, нажмите на засекреченное поле ввода
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Анимация закрытия при переходе на мобильную версию */
@media (max-width: 400px) {
  .card-name {
    @apply text-xl
  }
}

@media (max-width: 375px) {
  .card-name {
    @apply text-sm;
  }
}
</style>