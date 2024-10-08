import { createRouter, createWebHistory } from 'vue-router';
import OrderReorder from '../views/OrderReorder.vue';
import PrevorderDetails from '../views/PrevorderDetails.vue'; // Import new component
import NavbarHeader from '../views/NavbarHeader.vue'
import Restaurantpage from '../views/Restaurantpage.vue'
import AdminDashboard from '../views/AdminDashboard.vue';
import CheckOut from '../components/CheckOut.vue'
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
      name: 'Home',
      component: OrderReorder,
    },
    {
      path: '/order-details/:id',  // Define dynamic route with 'id' parameter
      name: 'PrevorderDetails',
      component: PrevorderDetails,
      props: true, // Pass route params as props to the component
    },
    {
      path: '/OrderReorder',
      name: 'OrderReorder',
      component: OrderReorder,
    },
    {
      path: '/order-details/:id',  // Define dynamic route with 'id' parameter
      name: 'PrevorderDetails',
      component: PrevorderDetails,
      props: true, // Pass route params as props to the component
    },
 ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
