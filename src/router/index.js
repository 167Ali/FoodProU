import { createRouter, createWebHistory } from 'vue-router';
import Restaurantpage from '../views/Restaurantpage.vue'
import AdminDashboard from '../views/AdminDashboard.vue';
const routes = [
    {
        path: '/',
        name: 'RestaurantPage',
        component: Restaurantpage
    },
    {
        path:'/admin-dashboard',
        name:'AdminDashboard',
        component:AdminDashboard
    },
 {
        path: '/hello',
        name: 'Home',
        component: Hello // Lazy-loaded
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;