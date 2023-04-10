import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TemplatePageView from "../views/TemplatePageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Home",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/",
      name: "Frontpage",
      component: () => import("../views/FrontPageView.vue"),
    },
    {
      path: "/template",
      name: "TemplatePageView",
      component: TemplatePageView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
