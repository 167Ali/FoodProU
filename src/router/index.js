// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import adminRoute from './adminRoutes'
import restaurantownerRoutes from './restaurantownerRoutes'
import customerRoutes from './customerRoutes'
import otherRoutes from './otherRoutes'
import Get_Started_page from '../Views/LoginSignup/GetStartedPage.vue'
import Rewards from '../Views/Customer/Rewards.vue'

const routes = [
  ...adminRoute,
  ...restaurantownerRoutes,
  ...customerRoutes,
  ...otherRoutes,


  {

    path: '/Get_Started_page',

    name: 'Get_Started_page',

    component: Get_Started_page

  },

  {
    path: '/rewards',
    name: 'Rewards',

    component: Rewards,

  },
  {
    path: '/get-started-page',
    name: 'Get_Started_page',
    component: Get_Started_page
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router