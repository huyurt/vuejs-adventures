import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Home from "@/views/Main/Home.vue";
import TourLists from "@/views/AdminDashboard/TourLists.vue";
import TourPackages from "@/views/AdminDashboard/TourPackages.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/Main/About.vue"),
    },
    {
        path: "/admin-dashboard",
        component: () => import("@/views/AdminDashboard/index.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/AdminDashboard/DefaultContent.vue")
            },
            {
                path: "weather-forecast",
                component: () => import("@/views/AdminDashboard/WeatherForecast.vue")
            },
            {
                path: "tour-lists",
                component: TourLists
            },
            {
                path: "tour-packages",
                component: TourPackages
            },
        ]
    },
    {path: "*", redirect: "/"},
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
