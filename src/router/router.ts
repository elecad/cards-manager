import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import CardList from "../pages/CardList.vue";
import CreateCard from "../pages/CreateCard.vue";
import EditCard from "../pages/EditCard.vue";
import Camera from "../pages/Camera.vue";


const routes: RouteRecordRaw[] = [
    { path: '/', component: CardList },
    { path: '/create', component: CreateCard },
    { path: '/edit', component: EditCard },
    { path: '/camera', component: Camera },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;