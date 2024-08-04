import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: { requireAuth: false },
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { requireAuth: false },
    component: () => import("../views/SignIn/SignInView.vue"),
  },
  {
    path: "/",
    meta: { requireAuth: true },
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home/HomeView.vue"),
      },
    ],
  },
];
