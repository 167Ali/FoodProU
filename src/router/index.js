
import { createRouter, createWebHistory } from 'vue-router';
import OrderReorder from '../views/OrderReorder.vue';
import PrevorderDetails from '../views/PrevorderDetails.vue'; // Import new component
import ProfileSettings from '../views/ProfileSettings.vue';
import FavoritesPage from '../views/favs.vue'
import OrderScreen from '../views/OrderScreen.vue'
import ModalView from '../components/restOwnReciept.vue'
import RestOwnerProfile from '../components/restOwnerProfile.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: OrderReorder,
  },
  {
    path: '/order-details/:id',  // Define dynamic route with 'id' parameter
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true, // Pass route params as props to the component
  },
{
    path: '/ps',
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

