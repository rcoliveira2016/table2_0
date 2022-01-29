import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/abas",
    name: "Abas",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Abas" */ "@/views/Abas.vue"),
    children: [
      {
        path: "/teste1",
        name: "Teste1",
        component: () =>
          import(/* webpackChunkName: "Abas" */ "@/views/Home.vue"),
      },
      {
        path: "/contador",
        name: "Contador",
        component: () =>
          import(/* webpackChunkName: "Contador" */ "@/views/Contador.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
