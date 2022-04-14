import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export enum routeNames {
  home = '/',
  page1 = '/page1',
}

const Page1View = () => import('../views/Page1View.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routeNames.home,
      name: 'home',
      component: HomeView,
    },
    {
      path: routeNames.page1,
      name: 'page1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Page1View,
    },
  ],
});

export default router;
