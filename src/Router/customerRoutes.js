// src/router/customerRoutes.js

import RestaurantPage from '@/Views/Customer/RestaurantPage.vue';
import CheckOut from '@/Components/Customer/CheckOut.vue';
import AddtoCart from '@/Components/Customer/AddtoCart.vue';
import CategoryNavbar from '@/Components/Customer/CategoryNavbar.vue';
import DashboardResturantPage from '@/Views/Customer/DashboardResturantPage.vue';
import ProfileSettings from '@/Views/Customer/ProfileSettings.vue';
import FavoritesPage from '@/Views/Customer/Favs.vue';
import OrderScreen from '@/Views/Customer/OrderScreen.vue';
import OrderReorder from '@/Views/Customer/OrderReorder.vue';
import PrevorderDetails from '@/Views/Customer/PrevorderDetails.vue';
import OrderRating from '@/Components/Customer/OrderRating.vue';
import UserGuide from '@/Components/Customer/UserGuide.vue';

export default [
  {

    path: '/RestaurantPage/:id', // Updated to include :id
    name: 'RestaurantPage',
    component: RestaurantPage,
    props: true, // Enable passing route params as props

  },

  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOut
  },

  {
    path: '/catnvbr',
    name: 'categorynavbar',
    component: CategoryNavbar
  },
  {
    path: '/dashboardresturantpage',
    name: 'DashboardResturantPage',
    component: DashboardResturantPage,
    children: [
      {
        path: '/caart',
        name: 'addtocart',
        component: AddtoCart
      },
      {
        path: '/userguide',
        name: 'UserGuide',
        component: UserGuide
      },
    ]
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
    path: '/OrderReorder',
    name: 'OrderReorder',
    component: OrderReorder
  },
  {
    path: '/order-details/:id',
    name: 'PrevorderDetails',
    component: PrevorderDetails,
    props: true,
  },
  {
    path: '/OrderRating',
    name: 'OrderRating',
    component: OrderRating
  }
];
