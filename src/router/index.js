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

    path: '/Get_Started_page',

    name: 'Get_Started_page',

    component: Get_Started_page

  },

  {
    path: '/rewards',
    name: 'Rewards',

    component: () => import('../views/Customer/Rewards.vue')

  },
  {
    path:'/get-started-page',
    name:'Get_Started_page',
    component: Get_Started_page
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router