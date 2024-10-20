// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import restaurantownerRoutes from './restaurantownerRoutes'
// Import route modules
import otherRoutes from './otherRoutes';
import adminRoute from './adminRoutes'
import customerRoutes from './customerRoutes'
import UserGuide from '../components/Customer/UserGuide.vue';
import RecipeBlog from '@/views/Customer/RecipeBlog.vue';
import Rewards from '../views/Customer/Rewards.vue';
import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
// import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
// import RecipeBlog from '../views/Customer/RecipeBlog.vue'
// import Rewards from '../views/Customer/Rewards.vue'
const routes = [
  ...otherRoutes,
  ...customerRoutes,
  ...restaurantownerRoutes,
  ...adminRoute,
  {
    name: 'UserGuide',
    path: '/user-guide',
    component: UserGuide
  },

  {
    name: 'RecipeBlog',
    path: '/recipe-blog',
    component: RecipeBlog
  },

  {
    name: 'Rewards',
    path: '/rewards',
    component: Rewards
  },
  {
    path: '/Get_Started_page',
    name: 'Get_Started_page',
    component: Get_Started_page
  },
]
// 
const router = createRouter({
  // 
  history: createWebHistory(),
  routes,
})
export default router;