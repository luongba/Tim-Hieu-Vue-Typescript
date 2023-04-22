import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import About from "@/views/About/index.vue";
import Grapes from "@/views/Grapes/index.vue"
import AdminLayout from "@/layouts/AdminLayout.vue";
import LandingLayout from "@/layouts/LandingLayout.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        layout: AdminLayout,
        title: "Trang chủ",
      },
    },
    {
      path: "/grapes",
      name: "grape",
      component: Grapes,
      meta: {
        layout: AdminLayout,
        title: "Trang chủ",
      },
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        layout: LandingLayout,
        title: "Thông tin",
      },
      beforeEnter: (to: any, from: any, next: any) => {
        next();
      },
    },
  ],
});
