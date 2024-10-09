import { createRouter, createWebHistory } from 'vue-router'
import NavbarHeader from '../views/NavbarHeader.vue'
import Restaurantpage from '../views/RestaurantPage.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import CheckOut from '../components/CheckOut.vue'
import OrderReq from '../components/OrderRequest.vue'
import OrderReorder from '../views/OrderReorder.vue'
import PrevorderDetails from '../views/PrevorderDetails.vue' // Import new component
import ProfileSettings from '../views/ProfileSettings.vue'
import FavoritesPage from '../views/favs.vue'
import OrderScreen from '../views/OrderScreen.vue'
import ModalView from '../components/restOwnReciept.vue'
import RestOwnerProfile from '../components/restOwnerProfile.vue'

const routes = [
  {
    path: '/c',
    name: 'header',
    component: NavbarHeader,
    children: [
      {
        path: '/c',
        name: 'checkout',
        component: CheckOut
      },
      {
        path: '/orderreq',
        name: 'orderreq',
        component: OrderReq
      }
    ]
  },
  {
    path: '/rp',
    name: 'RestaurantPage',
    component: Restaurantpage
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/',
    name: 'Home',
    component: OrderReorder
  },
  {
    path: '/order-details/:id', // Define dynamic route with 'id' parameter
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true // Pass route params as props to the component
  },
  {
    path: '/ps',
    name: 'ProfileSettings',
    component: ProfileSettings
  },
  {
    path: '/fav',
    name: 'Favorites',
    component: FavoritesPage
  },
  {
    path: '/orderScreen',
    name: 'OrderScreen',
    component: OrderScreen
  },
  {
    path: '/modalView',
    name: 'ModalView',
    component: ModalView
  },
  {
    path: '/restOwnerProfile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
