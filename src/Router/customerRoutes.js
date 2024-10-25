// src/router/customerRoutes.js
import RestaurantPage from '../Views/Customer/RestaurantPage.vue';
import CheckOut from '../Components/Customer/CheckOut.vue';
import CategoryNavbar from '../Components/Customer/CategoryNavbar.vue';
import DashboardResturantPage from '../Views/Customer/DashboardResturantPage.vue';
import ProfileSettings from '../Views/Customer/ProfileSettings.vue';
import FavoritesPage from '../Views/Customer/Favs.vue';
import OrderScreen from '../Views/Customer/OrderScreen.vue';
import OrderReorder from '../Views/Customer/OrderReorder.vue';
import PrevorderDetails from '../Views/Customer/PrevorderDetails.vue';
import OrderRating from '@/Components/Customer/OrderRating.vue';
import UserGuide from '@/Components/Customer/UserGuide.vue';
import RecipeBlog from '../Views/Customer/RecipeBlog.vue';
import Rewards from '@/Views/Customer/Rewards.vue';
export default [
  {
    path: '/RestaurantPage/:id',
    name: 'RestaurantPage',
    component: RestaurantPage,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/recipe-blog',
    name: 'RecipeBlog',
    component: RecipeBlog,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/Rewards',
    name: 'Rewards',
    component: Rewards,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOut,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/catnvbr',
    name: 'categorynavbar',
    component: CategoryNavbar,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/dashboardresturantpage',
    name: 'DashboardResturantPage',
    component: DashboardResturantPage,
    children: [
      {
        path: '/userguide',
        name: 'UserGuide',
        component: UserGuide,
        meta: {
          requiresAuth: true,
          role: 'Customer',
        },
      },
    ],
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/profilesettings',
    name: 'ProfileSettings',
    component: ProfileSettings,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/favoritespage',
    name: 'Favoritespage',
    component: FavoritesPage,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/orderScreen',
    name: 'OrderScreen',
    component: OrderScreen,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/OrderReorder',
    name: 'OrderReorder',
    component: OrderReorder,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/order-details/:id',
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
  {
    path: '/OrderRating',
    name: 'OrderRating',
    component: OrderRating,
    meta: {
      requiresAuth: true,
      role: 'Customer',
    },
  },
];
