// src/router/login.js
import Main_landing from '../views/Login_Signup/Main_Landing.vue'
import Business_Landing from '../views/Login_Signup/Bussiness_Landing.vue'
import ModalHurara from '@/components/OtherComponents/ModalHurara.vue';
import testingFIleHurara from '@/components/testingFIleHurara.vue';
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
  {
    path: '/ModalHurara',
    name: 'ModalHurara',
    component: ModalHurara 
},
{
    path: '/testingFileHurara',
    name: 'testingFileHurara',
    component: testingFIleHurara
},
];
