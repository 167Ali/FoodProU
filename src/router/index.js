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
import ViewAllOrdersAdm from '../views/ViewAllOrdersAdm.vue'
import DashboardResturantPage from '../views/DashboardResturantPage.vue'

const routes = [
  {
    path: '/Navbarheader',
    name: 'Navbarheader',
    component: NavbarHeader,
    children: [
      {
        path: '/checkout',
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
    path: '/',
    name: 'RestaurantPage',
    component: Restaurantpage
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/dashboardresturantpage',
    name: 'DashboardResturantPage',
    component: DashboardResturantPage
  },
  {
    path: '/profilesettings',
    name: 'ProfileSettings',
    component: ProfileSettings
  },
  {
    path: '/favoritespage',
    name: 'Favoritespage',
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
    path: '/viewallorders',
    name: 'ViewAllOrdersAdm', // Change name to avoid duplicates
    component: ViewAllOrdersAdm // This is fine if you need this route
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu', // Change name to avoid duplicates
    component: () => import('../views/OwnerMenu.vue') // This is fine if you need this route
  },
  {
    path: '/restOwnerProfile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile

  },
  {
    path: '/OrderReorder',
    name: 'OrderReorder',
    component: OrderReorder,
  },
  {
    path: '/order-details/:id',  // Define dynamic route with 'id' parameter
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true, // Pass route params as props to the component
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
