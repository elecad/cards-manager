import {defineStore} from "pinia";
import {ref} from "vue";

export const useUIStore = defineStore('drawer', () => {

    const isOpen = ref(false)


    const openDrawer = () => {
        console.log("Open")
        isOpen.value = true
    }

    const closeDrawer = () => {
        console.log("Close")
        isOpen.value = false
    }


    return {isOpen, openDrawer, closeDrawer}
})