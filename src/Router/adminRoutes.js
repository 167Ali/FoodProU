// src/router/adminRoutes.js
import AdminDashboard from '../Views/Admin/AdminDashboard.vue';
import ViewAllOrders from '@/Views/Admin/OrdersAdm.vue';
import AdminFinanceDashboard from '../Components/Admin/AdminFinanceDashboard.vue';
import ReviewsAdmin from '@/Components/Admin/ReviewsAdmin.vue';

export default [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      role: 'Admin',
    },
  },
  {
    path: '/viewallorders',
    name: 'ViewAllOrders',
    component: ViewAllOrders,
    meta: {
      requiresAuth: true,
      role: 'Admin',
    },
  },
  {
    path: '/AdminFinanceDashboard',
    name: 'AdminFinanceDashboard',
    component: AdminFinanceDashboard,
    meta: {
      requiresAuth: true,
      role: 'Admin',
    },
  },
  {
    path: '/ReviewsAdmin',
    name: 'ReviewsAdmin',
    component: ReviewsAdmin,
    meta: {
      requiresAuth: true,
      role: 'Admin',
    },
  },
];
