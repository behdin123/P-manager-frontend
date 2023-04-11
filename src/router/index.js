import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TemplatePageView from "../views/TemplatePageView.vue";
import { isLoggedIn } from '../modules/login.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Frontpage",
      component: () => import("../views/FrontPageView.vue"),
    },
    {
      path: "/Home",
      name: "Home",
      component: HomeView,
      meta: {
        requiresAuth: true, // Denne rute kræver autentifikation
      },
    },
    {
      path: "/template",
      name: "TemplatePageView",
      component: TemplatePageView,
      meta: {
        requiresAuth: true, // Denne rute kræver autentifikation
      },
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

router.beforeEach((to, from, next) => {

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Redirect the user to the login page if they are not logged in and the route requires authentication
  if (requiresAuth && !isLoggedIn.value) {
    next('/Home'); 
  } 
  // Allow navigation if there are no restrictions
  else {
    next(); 
  }
});

export default router;
