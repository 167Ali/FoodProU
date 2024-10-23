// src/router/login.js
import Main_landing from '../views/Login_Signup/Main_Landing.vue'
import Business_Landing from '../views/Login_Signup/Bussiness_Landing.vue'
import ModalHurara from '@/components/OtherComponents/ModalHurara.vue';
import testingFIleHurara from '@/components/testingFIleHurara.vue';
import Get_Started_page from '@/views/Login_Signup/Get_Started_page.vue'
import Rewards from '../views/Customer/Rewards.vue'

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
];
