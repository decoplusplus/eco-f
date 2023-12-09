import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DashboardLayout,

      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/dashboard/index.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: () => import("../layouts/auth.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../views/auth/login.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("../views/auth/register.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () => import("../views/auth/forgot-password.vue"),
        },
        {
          path: "reset-password/:selector/:token",
          name: "reset-password",
          component: () => import("../views/auth/reset-password.vue"),
        },
      ],
    },
  ],
});

export default router;
