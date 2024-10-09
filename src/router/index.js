import { createRouter, createWebHistory } from 'vue-router';
import NavbarHeader from '../views/NavbarHeader.vue'
import Restaurantpage from '../views/Restaurantpage.vue'
import AdminDashboard from '../views/AdminDashboard.vue';
import CheckOut from '../components/CheckOut.vue'
import OrderReq from '../components/OrderRequest.vue'
const routes = [
    {
        path: '/c',
        name: 'header',
        component: NavbarHeader,
        children:[
          {
            path: '/c',
            name: 'checkout',
            component: CheckOut,
          },
          {
            path: '/orderreq',
            name: 'orderreq',
            component: OrderReq,
          },
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
        ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
