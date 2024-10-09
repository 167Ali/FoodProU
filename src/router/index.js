import { createRouter, createWebHistory } from 'vue-router';
import OrderReorder from '../views/OrderReorder.vue';
import PrevorderDetails from '../views/PrevorderDetails.vue'; // Import new component


const routes = [
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
