import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.ts";
import VueSortable from "vue3-sortablejs";

const app  = createApp(App);
app.use(router)
app.use(VueSortable);
app.mount('#app')
