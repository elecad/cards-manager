import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import CardList from "../pages/CardList.vue";
import CreateCard from "../pages/CreateCard.vue";
import EditCard from "../pages/EditCard.vue";
import Camera from "../pages/Camera.vue";
import File from "../pages/File.vue";

export const RoutesPath = {
    main: "/",
    create: "/create",
    edit: "/edit",
    camera: "/camera",
    file: "/file"
}


export const routes: RouteRecordRaw[] = [
    {path: RoutesPath.main, component: CardList},
    {path: RoutesPath.create, component: CreateCard},
    {path: RoutesPath.edit, component: EditCard},
    {path: RoutesPath.camera, component: Camera},
    {path: RoutesPath.file, component: File}
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
