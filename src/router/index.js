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
        {
          path: "account",
          name: "account",
          meta: {
            requiresAuth: true,
          },
          component: () => import("../views/dashboard/account.vue"),
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
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/404.vue"),
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
        return next({ name: "login" });
      } else {
        return next();
      }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
      if (mainStore.isLoggedIn === true) {
        return next({ name: "dashboard" });
      } else {
        return next();
      }
    } else {
      return next();
    }
  } else {
    mainStore.getUserDetails().then(() => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (mainStore.isLoggedIn === false) {
          return next({ name: "login" });
        } else {
          return next();
        }
      } else if (to.matched.some((record) => record.meta.guestOnly)) {
        if (mainStore.isLoggedIn === true) {
          return next({ name: "dashboard" });
        } else {
          return next();
        }
      } else {
        return next();
      }
    });
  }
});

export default router;
