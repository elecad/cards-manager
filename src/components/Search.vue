<script setup lang="ts">

import SearchIcon from "../assets/icons/search.svg";
</script>

<template>
  <div class="w-full bg-gray-100 h-10 rounded-xl flex justify-start items-center px-3">
    <SearchIcon style="color: rgb(179, 179, 186)" width="16px" height="16px"/>
    <input class="w-full outline-none bg-transparent font-normal text-sm pl-2 h-full" type="search" placeholder="Поиск карты..."/>
  </div>
</template>

<style scoped>

</style>