import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.ts";
import VueSortable from "vue3-sortablejs";
import Vue3TouchEvents, {
    type Vue3TouchEventsOptions,
} from "vue3-touch-events";

const app  = createApp(App);
app.use(router)
app.use(VueSortable);
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false,
    longTapTimeInterval: 300
})
app.mount('#app')
