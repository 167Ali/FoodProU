// src/router/login.js
import Main_landing from '@/Views/LoginSignup/MainLanding.vue'
import Business_Landing from '@/Views/LoginSignup/BussinessLanding.vue'
import Get_Started_page from '@/Views/LoginSignup/GetStartedPage.vue'
//import Rewards from '../views/Customer/Rewards.vue'

export default [
  {
    path: '/',
    name: 'Main_landing',
    component: Main_landing
  },
  {
    path: '/businesslanding',
    name: 'Business_Landing',
    component: Business_Landing
  },
 

// {
//   path: '/rewards',
//   name: 'Rewards',

//   component: () => import('../views/Customer/Rewards.vue')

// },
{
  path:'/getstarted',
  name:'Get_Started_page',
  component: Get_Started_page
},
];
