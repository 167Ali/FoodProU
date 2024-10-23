// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import restaurantownerRoutes from './restaurantownerRoutes'
// Import route modules
import otherRoutes from './otherRoutes';
import adminRoute from './adminRoutes'
import customerRoutes from './customerRoutes'
import otherRoutes from './otherRoutes'

// import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
// import RecipeBlog from '../views/Customer/RecipeBlog.vue'
// import Rewards from '../views/Customer/Rewards.vue'
const routes = [
  ...otherRoutes,
  
]
// 
const router = createRouter({
  // 
  history: createWebHistory(),
  routes,
})
export default router;