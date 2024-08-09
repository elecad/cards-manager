import {defineStore} from "pinia";
import {ref} from "vue";

export const useAlert = defineStore('drawer', () => {

    const isOpen = ref(false)
    const message = ref("")

    const openAlert = (text: string, time?: number) => {
        console.log("Open")
        message.value = text
        isOpen.value = true
        if (time)
            setTimeout(() => {
                isOpen.value = false
            }, time)
    }

    const closeAlert = () => {
        isOpen.value = false
    }

    return {openAlert, isOpen, message, closeAlert}
})