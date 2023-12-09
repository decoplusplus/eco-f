import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard.vue";
import useMainStore from "@/stores/user";

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
          meta: {
            requiresAuth: true,
          },
          component: () => import("../views/dashboard/index.vue"),
        },
        {
          path: "transactions",
          name: "transactions",
          meta: {
            requiresAuth: true,
          },
          component: () => import("../views/dashboard/transactions.vue"),
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
          meta: {
            guestOnly: true,
          },
          component: () => import("../views/auth/login.vue"),
        },
        {
          path: "register",
          name: "register",
          meta: {
            guestOnly: true,
          },
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

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (!to.meta.requiresAuth && !to.meta.guestOnly) {
    return next();
  }

  if (mainStore.fetchedInitialUser === true) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (mainStore.isLoggedIn === false) {
        next({ name: "login" });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
      if (mainStore.isLoggedIn === true) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    mainStore.getUserDetails().then(() => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (mainStore.isLoggedIn === false) {
          next({ name: "login" });
        } else {
          next();
        }
      } else if (to.matched.some((record) => record.meta.guestOnly)) {
        if (mainStore.isLoggedIn === true) {
          next({ name: "dashboard" });
        } else {
          next();
        }
      } else {
        next();
      }
    });
  }
});

export default router;
