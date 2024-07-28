import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.ts";
import VueSortable from "vue3-sortablejs";
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia()
app.use(router)
app.use(VueSortable)
app.use(pinia)
app.mount('#app')
