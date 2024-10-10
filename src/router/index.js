// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index'; // Import the Vuex store
import Hello from '../views/Main_Landing.vue';
import UserLogin from '../components/User_login.vue';
import UserSignup from '../components/User_signup.vue';
import RestaurantOwnerDashboard from '../views/RestaurantOwner_Dashboard.vue';
import AdminDashboard from '../views/Admin_Dashboard.vue';
import CustomerDashboard from '../views/Customer_Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hello,
  },
  {
    path: '/User_login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/User_signup',
    name: 'UserSignup',
    component: UserSignup,
  },
  {
    path: '/restaurant-owner-dashboard',
    name: 'RestaurantOwnerDashboard',
    component: RestaurantOwnerDashboard,
    meta: { requiresAuth: true, role: 'Restaurant Owner' },
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/customer-dashboard',
    name: 'CustomerDashboard',
    component: CustomerDashboard,
    meta: { requiresAuth: true, role: 'Customer' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to check user role and authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userRole = store.state.user.role;

  if (requiresAuth && !store.getters.isAuthenticated) {
    // Not authenticated, redirect to login
    next({ name: 'UserLogin' });
  } else if (requiresAuth && to.meta.role && userRole !== to.meta.role) {
    // Role doesn't match, redirect to appropriate dashboard
    if (store.getters.isAdmin) next({ name: 'AdminDashboard' });
    else if (store.getters.isCustomer) next({ name: 'CustomerDashboard' });
    else if (store.getters.isRestaurantOwner) next({ name: 'RestaurantOwnerDashboard' });
    else next('/');
  } else {
    next(); // Proceed to the route
  }
});

export default router;
