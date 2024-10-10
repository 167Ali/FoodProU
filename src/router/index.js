import { createRouter, createWebHistory } from 'vue-router';
import Hello from '../views/hello.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Hello // Lazy-loaded
      }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;