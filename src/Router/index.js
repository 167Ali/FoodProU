// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import adminRoute from './adminRoutes';
import restaurantownerRoutes from './restaurantownerRoutes';
import customerRoutes from './customerRoutes';
import otherRoutes from './otherRoutes';

const routes = [
  ...adminRoute,
  ...restaurantownerRoutes,
  ...customerRoutes,
  ...otherRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Retrieve token and user data from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Main_landing' }); // Redirect to the login page if not authenticated
  }

   // Role-based access control
   if (to.meta.role && user) {
    if (user.role !== to.meta.role) {
      // Redirect back to the current page if the role does not match
      return next(false);
    }
  }

  // Proceed to the next route if no conditions were met
  next();
});

export default router;
