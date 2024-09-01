import {ref} from "vue";


const LS_KEY = "offline-mode"
const CHANEL_KEY = "sw-chanel"

const MESSAGES = {
    done: "cache-done",
    check: "cache-check",
    resource: "cache-resource",
}


export const useOfflineMode = () => {
    const chanel = new BroadcastChannel(CHANEL_KEY)
    const cacheList = ref<Response[]>([])

    chanel.addEventListener("message", async (event) => {
        const type = event.data.type
        console.log("[C]", type)
        if (type === MESSAGES.resource) {
            const url = event.data.url
            const response = await fetch(url)
            cacheList.value.push(response)
        }
    })

    const initValue = () => {
        const stringValue = localStorage.getItem(LS_KEY) ?? "null"
        try {
            return JSON.parse(stringValue) as boolean
        } catch {
            localStorage.setItem(LS_KEY, JSON.stringify(false))
            return false
        }
    }

    const isOffline = ref(initValue())


    const enable = async () => {
        await navigator.serviceWorker.register('/sw.js')
        await navigator.serviceWorker.ready
        localStorage.setItem(LS_KEY, JSON.stringify(true))
        location.reload()
    }

    const disable = async () => {

        console.log("[С] Удаление воркера")
        const services = await navigator.serviceWorker.getRegistrations()
        for (const worker of services) {
            await worker.unregister()
        }
        localStorage.setItem(LS_KEY, JSON.stringify(false))
        const cacheKeys = await caches.keys()
        for (const key of cacheKeys) {
            await caches.delete(key)
        }

        location.reload()


    }

    const checkCache = () => {
        cacheList.value = []
        chanel.postMessage(MESSAGES.check)
    }


    return {enable, disable, isOffline, cacheList, checkCache}


}