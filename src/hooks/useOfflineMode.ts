import {ref} from "vue";

const LS_KEY = "offline-mode"

export const MESSAGES = {
    cache: "cache-start",
    clear: "clear",
    resources: "resources"
}

export const useOfflineMode = () => {
    const worker = ref<ServiceWorker | null>()

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
        // const worker = new Worker('/sw.js')
        // worker.addEventListener('message', (event) => {
        //     console.log(event)
        // })


        await navigator.serviceWorker.register('/sw.js')

        const ready = await navigator.serviceWorker.ready

        worker.value = ready.active
        localStorage.setItem(LS_KEY, JSON.stringify(true))

        worker.value?.postMessage(MESSAGES.cache)

        const channel = new BroadcastChannel('sw-messages');
        channel.addEventListener('message', event => {
            console.log('Received', event.data);
        });

    }

    const disable = async () => {

        console.log("[С] Удаление воркера")
        const services = await navigator.serviceWorker.getRegistrations()
        const activeWorker = services[0]
        await activeWorker.unregister()
        localStorage.setItem(LS_KEY, JSON.stringify(false))
    }


    // const getCurrentWorker = async () => {
    //     const [service] = await navigator.serviceWorker.getRegistrations()
    //     if (service.active)
    //         return service.active
    //     if (service.installing)
    //         return service.installing
    //
    // }


    return {enable, disable, isOffline}


}