// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import adminRoute from './adminRoutes'
import restaurantownerRoutes from './restaurantownerRoutes'
import customerRoutes from './customerRoutes'
import otherRoutes from './otherRoutes'
import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
import RecipeBlog from '../views/Customer/RecipeBlog.vue'
import Rewards from '../views/Customer/Rewards.vue'

const routes = [
  ...adminRoute,
  ...restaurantownerRoutes,
  ...customerRoutes,
  ...otherRoutes,
  
  {
    path: '/recipe-blog',
    name: 'RecipeBlog',
    component: RecipeBlog
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: Rewards
  },
  {
    path: '/get-started',
    name: 'Get_Started',
    component: Get_Started_page
  },
  // {
  //   path: '/test',
  //   name: 'test', 
  //   component: () => import('../components/Customer/TesterPage.vue') 
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router