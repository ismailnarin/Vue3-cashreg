import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/MainComponent"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/personel-list",
    name: "personelList",
    component: () => import("@/views/PersonelList"),
  },
  {
    path: "/order-report",
    name: "orderReport",
    component: () => import("@/views/OrderReport"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authentication = store.getters["Auth/_isAuth"];
  const authRoutes = ["home"];
  if (authRoutes.indexOf(to.name) > -1 && !authentication) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
