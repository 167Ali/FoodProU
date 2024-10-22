// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
// Import route modules

import adminRoute from '@/Router/adminRoutes'

import restaurantownerRoutes from '@/Router/restaurantownerRoutes'

import customerRoutes from '@/Router/customerRoutes'

import otherRoutes from '@/Router/otherRoutes';
import getstarted from '@/Views/LoginSignup/GetStartedPage.vue'
import RecipeBlog from '@/Views/Customer/RecipeBlog.vue'
import Rewards from '@/Views/Customer/Rewards.vue'

const routes = [

  ...adminRoute,

  ...restaurantownerRoutes,

  ...customerRoutes,

  ...otherRoutes,

  {

    path: '/user-guide',

    name: 'UserGuide',

    component: () => import('../Components/Customer/UserGuide.vue')

  },

  {

    path: '/recipe-blog',

    name: 'RecipeBlog',

    component: RecipeBlog,

  },
  {
    path: '/getstarted',
    name: 'getstarted',
    component: getstarted
  },

  {

    path: '/rewards',

    name: 'Rewards',

    component: Rewards,

  },

]



const router = createRouter({

  history: createWebHistory(),

  routes

})



export default router