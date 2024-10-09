import { createRouter, createWebHistory } from 'vue-router';
import Restaurantpage from '../views/Restaurantpage.vue'
import AdminDashboard from '../views/AdminDashboard.vue';
const routes = [
    {
        path: '/rp',
        name: 'RestaurantPage',
        component: Restaurantpage
    },
    {
        path:'/admin-dashboard',
        name:'AdminDashboard',
        component:AdminDashboard
    },
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

