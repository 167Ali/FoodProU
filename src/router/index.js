import { createRouter, createWebHistory } from 'vue-router';
import NavbarHeader from '../views/NavbarHeader.vue'
import CheckOut from '../components/CheckOut.vue'
import OrderReq from '../components/OrderRequest.vue'
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
          },
          {
            path: '/orderreq',
            name: 'orderreq',
            component: OrderReq,
          }
        ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;