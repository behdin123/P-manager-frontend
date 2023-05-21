import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isLoggedIn } from '../modules/Crud_operator/User/login.js';
import ProjectBoardComponent from '@/components/project/ProjectBoardComponent.vue';

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
        requiresAuth: true, // This route requires authentication
      },
    },
    {
      path: '/project/:id',
      name: 'ProjectBoard',
      component: ProjectBoardComponent,
      meta: {
        requiresAuth: true, // This route requires authentication
      },
    },
    {
      path: "/team",
      name: "team",
      component: () => import("../views/TeamView.vue"),
      meta: {
        requiresAuth: true, // This route requires authentication
      },
    },
  ],
});

router.beforeEach((to, from, next) => {

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Redirect the user to the login page if they are not logged in and the route requires authentication
  if (requiresAuth && !isLoggedIn.value) {
    next('/'); 
  } 
  // Allow navigation if there are no restrictions
  else {
    next(); 
  }
  
});

export default router;
