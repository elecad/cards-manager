import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import CardList from "../pages/CardList.vue";
import EditCard from "../pages/EditCard.vue";
import Camera from "../pages/Camera.vue";
import File from "../pages/File.vue";
import SelectMode from "../pages/SelectMode.vue";
import CreateMassage from "../pages/CreateMassage.vue";
import Settings from "../pages/Settings/Settings.vue";
import Offline from "../pages/Settings/Offline.vue";
import About from "../pages/Settings/About.vue";
import Share from "../pages/Settings/Share.vue";
import Splash from "../pages/Splash.vue";
import CreateCard from "../pages/CreateCard.vue";
import Error from "../pages/Error.vue";

export const RoutesPath = {
    main: "/list",
    create: "/create",
    select: "/select",
    edit: "/edit",
    camera: "/camera",
    file: "/file",
    complete: "/complete",
    settings: "/settings",
    offlineSettings: "/settings/offline",
    about: "/settings/about",
    share: "/settings/share",
    splash: "/",
    error: "/error"
}


export const routes: RouteRecordRaw[] = [
    {path: RoutesPath.main, component: CardList},
    {path: RoutesPath.create, component: CreateCard},
    {path: RoutesPath.edit, component: EditCard},
    {path: RoutesPath.camera, component: Camera},
    {path: RoutesPath.file, component: File},
    {path: RoutesPath.select, component: SelectMode},
    {path: RoutesPath.complete, component: CreateMassage},
    {path: RoutesPath.settings, component: Settings},
    {path: RoutesPath.offlineSettings, component: Offline},
    {path: RoutesPath.about, component: About},
    {path: RoutesPath.share, component: Share},
    {path: RoutesPath.splash, component: Splash},
    {path: RoutesPath.error, component: Error},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
