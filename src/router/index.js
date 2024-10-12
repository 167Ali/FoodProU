


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

    name: 'ViewAllOrdersAdm', 
    component: ViewAllOrdersAdm 
  },
  {
    path: '/mainlanding',
    name: 'Main_landing',
    component: Main_landing 
  },
  {
    path: '/businesslanding',
    name: 'Business_Landing', 
    component: Business_Landing 
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu', 
    component: () => import('../views/Menu/OwnerMenu.vue') 

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

    path: '/order-details/:id',  
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true, 
  },

  {
    path: '/user-guide',
    name: 'UserGuide', 
    component: () => import('../components/Customer/UserGuide.vue') 
  },
  {
    path: '/recipe-blog',
    name: 'RecipeBlog', 
    component: () => import('../views/Customer/RecipeBlog.vue') 
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


