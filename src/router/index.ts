import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

type lazyComponent = Promise<typeof import('*.vue')>;

export enum routeNames {
  home = '/',
  page1 = '/page1',
}

const Page1View = (): lazyComponent => import('../views/Page1View.vue');

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
      component: Page1View,
    },
  ],
});

export default router;
