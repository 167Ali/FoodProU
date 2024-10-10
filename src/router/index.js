import { createRouter, createWebHistory } from 'vue-router'
import NavbarHeader from '../views/NavbarHeader.vue'
import Restaurantpage from '../views/Customer/RestaurantPage.vue'
import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import CheckOut from '../components/Customer/CheckOut.vue'
import OrderReq from '../components/RestaurantOwner/OrderRequest.vue'
import OrderReorder from '../views/Customer/OrderReorder.vue'
import PrevorderDetails from '../views/Customer/PrevorderDetails.vue' // Import new component
import ProfileSettings from '../views/Customer/ProfileSettings.vue'
import FavoritesPage from '../views/Customer/favs.vue'
import OrderScreen from '../views/Customer/OrderScreen.vue'
import ModalView from '../components/RestaurantOwner/restOwnReciept.vue'
import RestOwnerProfile from '../components/RestaurantOwner/restOwnerProfile.vue'
import ViewAllOrdersAdm from '../views/Admin/ViewAllOrdersAdm.vue'
import DashboardResturantPage from '../views/Customer/DashboardResturantPage.vue'
import Main_landing from '../views/Login_Signup/Main_Landing.vue'
import Business_Landing from '../views/Login_Signup/Bussiness_Landing.vue'
import AdminFinanceDashboard from '../components/Admin/AdminFinanceDashboard.vue'
import RestaurantOwner_Dashboard from '../views/RestauranOnwer/RestaurantOwner_Dashboard.vue'
import AddtoCart from '../components/AddtoCart.vue'
// import ProductAddToCart from '../components/Customer/ProductAddToCart.vue'
// import Moreinfo from '../components/Customer/Moreinfo.vue'
// import SeeReviews from '../components/Customer/SeeReviews.vue'

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
      },
      {
        path: '/caart',
        name: 'addtocard',
        component: AddtoCart
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
    path: '/AdminFinanceDashboard',
    name: 'AdminFinanceDashboard',
    component: AdminFinanceDashboard
  },
  {
    path: '/RestaurantOwnerDashboard',
    name: 'RestaurantOwner_Dashboard',
    component: RestaurantOwner_Dashboard
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
    path: '/mainlanding',
    name: 'Main_landing', // Change name to avoid duplicates
    component: Main_landing // This is fine if you need this route
  },
  {
    path: '/businesslanding',
    name: 'Business_Landing', // Change name to avoid duplicates
    component: Business_Landing // This is fine if you need this route
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu', // Change name to avoid duplicates
    component: () => import('../views/Menu/OwnerMenu.vue') // This is fine if you need this route
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
