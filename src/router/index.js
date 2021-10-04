import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/login.vue";
import Embalaje from "../views/embalaje/index.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Home,
  },
  {
    path: "/embalajes",
    name: "embalajes",
    component: Embalaje,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
