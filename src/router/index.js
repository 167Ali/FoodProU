import { createRouter, createWebHistory } from 'vue-router';

// Import the different route modules
import adminRoutes from './adminRoutes';
import customerRoutes from './customerRoutes';
import restaurantOwnerRoutes from './restaurantownerRoutes';
import otherRoutes from './otherRoutes'; // Miscellaneous routes

const routes = [
  ...adminRoutes,
  ...customerRoutes,
  ...restaurantOwnerRoutes,
  ...otherRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
