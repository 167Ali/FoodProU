// src/router/login.js
import Main_landing from '@/Views/LoginSignup/MainLanding.vue'
import Business_Landing from '@/Views/LoginSignup/BussinessLanding.vue'

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
];
