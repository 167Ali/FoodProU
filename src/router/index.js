import { createRouter, createWebHistory } from 'vue-router';
import NavbarHeader from '../views/NavbarHeader.vue';
import Restaurantpage from '../views/Customer/RestaurantPage.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import CheckOut from '../components/Customer/CheckOut.vue';
import OrderReq from '../components/RestaurantOwner/OrderRequest.vue';
import OrderReorder from '../views/Customer/OrderReorder.vue';
import PrevorderDetails from '../views/Customer/PrevorderDetails.vue'; // Import new component
import ProfileSettings from '../views/Customer/ProfileSettings.vue';
import FavoritesPage from '../views/Customer/favs.vue';
import OrderScreen from '../views/Customer/OrderScreen.vue';
import ModalView from '../components/RestaurantOwner/restOwnReciept.vue';
import RestOwnerProfile from '../components/RestaurantOwner/restOwnerProfile.vue';
import ViewAllOrdersAdm from '../views/Admin/ViewAllOrdersAdm.vue';
import DashboardResturantPage from '../views/Customer/DashboardResturantPage.vue';
import Main_landing from '../views/Login_Signup/Main_Landing.vue';
import Business_Landing from '../views/Login_Signup/Bussiness_Landing.vue';
import AdminFinanceDashboard from '../components/Admin/AdminFinanceDashboard.vue';
import RestaurantOwner_Dashboard from '../views/RestauranOnwer/RestaurantOwner_Dashboard.vue';
import AddtoCart from '../components/AddtoCart.vue';
import ResturantOwner from '@/components/RestaurantOwner/ResturantOwner.vue';
import RestaurantCard from '@/components/Customer/RestaurantCard.vue';
import hello from '@/views/hello.vue';

// Import additional routes
import adminRoutes from './adminRoutes';
import customerRoutes from './customerRoutes';
import restaurantOwnerRoutes from './restaurantownerRoutes';
import otherRoutes from './otherRoutes'; // Miscellaneous routes

const routes = [
  ...adminRoutes,
  ...customerRoutes,
  ...restaurantOwnerRoutes,
  ...otherRoutes,
  {
    path: '/Navbarheader',
    name: 'NavbarHeader',
    component: NavbarHeader,
    children: [
      {
        path: 'checkout',
        name: 'Checkout',
        component: CheckOut,
      },
      {
        path: 'orderreq',
        name: 'OrderReq',
        component: OrderReq,
      },
      {
        path: 'cart',
        name: 'AddToCart',
        component: AddtoCart,
      },
    ],
  },
  {
    path: '/RestaurantPage',
    name: 'RestaurantPage',
    component: Restaurantpage,
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    children: [
      {
        path: 'viewallorders',
        name: 'ViewAllOrdersAdm', // Avoid duplicates
        component: ViewAllOrdersAdm,
      },
    ],
  },
  {
    path: '/reset-password',
    name: 'SetNewPassword',
    component: hello,
  },
  {
    path: '/restaurant-card',
    name: 'RestaurantCard',
    component: RestaurantCard,
  },
  {
    path: '/admin-finance-dashboard',
    name: 'AdminFinanceDashboard',
    component: AdminFinanceDashboard,
  },
  {
    path: '/restaurant-owner-dashboard',
    name: 'RestaurantOwnerDashboard',
    component: RestaurantOwner_Dashboard,
    children: [
      {
        path: 'restaurant-owner',
        name: 'RestaurantOwner',
        component: ResturantOwner,
      },
    ],
  },
  {
    path: '/dashboardrestaurantpage',
    name: 'DashboardRestaurantPage',
    component: DashboardResturantPage,
  },
  {
    path: '/profile-settings',
    name: 'ProfileSettings',
    component: ProfileSettings,
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: FavoritesPage,
  },
  {
    path: '/order-screen',
    name: 'OrderScreen',
    component: OrderScreen,
  },
  {
    path: '/modal-view',
    name: 'ModalView',
    component: ModalView,
  },
  {
    path: '/main-landing',
    name: 'MainLanding',
    component: Main_landing,
  },
  {
    path: '/business-landing',
    name: 'BusinessLanding',
    component: Business_Landing,
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu',
    component: () => import('../views/Menu/OwnerMenu.vue'),
  },
  {
    path: '/restownerprofile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile,
  },
  {
    path: '/orderreorder',
    name: 'OrderReorder',
    component: OrderReorder,
  },
  {
    path: '/order-details/:id', // Define dynamic route with 'id' parameter
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true, // Pass route params as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
