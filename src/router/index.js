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
import AddtoCart from '../components/Customer/AddtoCart.vue'
import TestEr from '../components/Customer/testingThings.vue'
import ProductCart from '../components/Customer/ProductAddToCart.vue'
// import SeeReviews from '../components/Customer/SeeReviews.vue'
// import Rewards from '../views/Customer/Rewards.vue'

// import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
// import RecipeBlog from '../views/Customer/RecipeBlog.vue'
// import Rewards from '../views/Customer/Rewards.vue'
const routes = [
  ...otherRoutes,
  ...customerRoutes,
  ...restaurantownerRoutes,
  ...adminRoute,
  {
    path: '/prodo',
    name: 'ProductCart',
    component: ProductCart
  },
  // {
  //   path: '/review',
  //   name: 'SeeReviews',
  //   component: SeeReviews
  // },
  {
    path: '/test',
    name: 'TestEr',
    component: TestEr
  },
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
  {
    path: '/cart',
    name: 'addtocart',
    component: AddtoCart
  },
]
// 
const router = createRouter({
  // 
  history: createWebHistory(),
  routes,
})
export default router;