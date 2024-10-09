import {
  createRouter,
  createWebHistory
} from 'vue-router';

import ProfileSettings from '../views/ProfileSettings.vue';
import FavoritesPage from '../views/favs.vue'
import OrderScreen from '../views/OrderScreen.vue'


import ModalView from '../components/restOwnReciept.vue'
import RestOwnerProfile from '../components/restOwnerProfile.vue'





const routes = [{
    path: '/',
    name: 'ProfileSettings',
    component: ProfileSettings 
  },
  {
    path: '/fav',
    name: 'Favorites',
    component: FavoritesPage, 
  },
  {
    path: '/orderScreen',
    name: 'OrderScreen',
    component: OrderScreen, 
  },
  {
    path: '/modalView',
    name: 'ModalView',
    component: ModalView, 
  },
  {
    path: '/restOwnerProfile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile, 
  },
 
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;