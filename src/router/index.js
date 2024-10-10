<<<<<<< HEAD
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index'; // Import the Vuex store
import Hello from '../views/Main_Landing.vue';
import UserLogin from '../components/User_login.vue';
import UserSignup from '../components/User_signup.vue';
import RestaurantOwnerDashboard from '../views/RestaurantOwner_Dashboard.vue';
import AdminDashboard from '../views/Admin_Dashboard.vue';
import CustomerDashboard from '../views/Customer_Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hello,
  },
  {
    path: '/User_login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/User_signup',
    name: 'UserSignup',
    component: UserSignup,
  },
  {
    path: '/restaurant-owner-dashboard',
    name: 'RestaurantOwnerDashboard',
    component: RestaurantOwnerDashboard,
    meta: { requiresAuth: true, role: 'Restaurant Owner' },
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/customer-dashboard',
    name: 'CustomerDashboard',
    component: CustomerDashboard,
    meta: { requiresAuth: true, role: 'Customer' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to check user role and authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userRole = store.state.user.role;

  if (requiresAuth && !store.getters.isAuthenticated) {
    // Not authenticated, redirect to login
    next({ name: 'UserLogin' });
  } else if (requiresAuth && to.meta.role && userRole !== to.meta.role) {
    // Role doesn't match, redirect to appropriate dashboard
    if (store.getters.isAdmin) next({ name: 'AdminDashboard' });
    else if (store.getters.isCustomer) next({ name: 'CustomerDashboard' });
    else if (store.getters.isRestaurantOwner) next({ name: 'RestaurantOwnerDashboard' });
    else next('/');
  } else {
    next(); // Proceed to the route
  }
});

export default router;
=======
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
>>>>>>> dc494b7fd631f769a3d79f4a3933a615370fffee
