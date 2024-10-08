import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home', // Change name to avoid duplicates
    component: () => import('../views/DashboardResturantPage.vue') // Use relative path
  },
  {
    path: '/dashboardresturantpage',
    name: 'DashboardResturant', // Change name to avoid duplicates
    component: () => import('../views/DashboardResturantPage.vue') // This is fine if you need this route
  },
  {
    path: '/viewallorders',
    name: 'ViewAllOrdersAdm', // Change name to avoid duplicates
    component: () => import('../views/ViewAllOrdersAdm.vue') // This is fine if you need this route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
