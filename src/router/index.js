import { createRouter, createWebHistory } from 'vue-router';
import NavbarHeader from '../views/NavbarHeader.vue'
import CheckOut from '../components/CheckOut.vue'
const routes = [
    {
        path: '/',
        name: 'header',
        component: NavbarHeader,
        children:[
          {
            path: '/',
            name: 'checkout',
            component: CheckOut,
          }
        ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;