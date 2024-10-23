// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import adminRoute from './adminRoutes'
import restaurantownerRoutes from './restaurantownerRoutes'
import customerRoutes from './customerRoutes'
import otherRoutes from './otherRoutes'

const routes = [
  ...adminRoute,
  ...restaurantownerRoutes,
  ...customerRoutes,
  ...otherRoutes,
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router