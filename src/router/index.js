// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// Import route modules
import adminRoute from './adminRoutes'
import restaurantownerRoutes from './restaurantownerRoutes'
import customerRoutes from './customerRoutes'
import otherRoutes from './otherRoutes'
import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'

const routes = [
  ...adminRoute,
  ...restaurantownerRoutes,
  ...customerRoutes,
  ...otherRoutes,
  {
    path: '/user-guide',
    name: 'UserGuide',
    component: () => import('../components/Customer/UserGuide.vue')
  },
  {
    path: '/recipe-blog',
    name: 'RecipeBlog',
    component: () => import('../views/Customer/RecipeBlog.vue')
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: () => import('../views/Customer/Rewards.vue')
  },
  {
    path: '/get-started',
    name: 'Get_Started',
    component: () => import('../views/Login_Signup/Get_Started_page.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


