// src/router/restaurantownerRoutes.js
import RestaurantOwner_Dashboard from '@/Views/RestauranOnwer/RestaurantOwnerDashboard.vue';
import ResturantOwner from '@/Components/RestaurantOwner/ResturantOwner.vue';
import RestOwnerProfile from '@/Components/RestaurantOwner/RestOwnerProfile.vue';
import ResturantReviews from '@/Components/RestaurantOwner/ResturantReviews.vue';
import OrderReq from '@/Components/RestaurantOwner/RestaurantDashboard/OrderRequest.vue';
import ModalView from '@/Components/RestaurantOwner/RestOwnReciept.vue';
import OwnerMenu from '@/Views/Menu/OwnerMenu.vue';
import ViewAllOrdersRes from '@/Views/RestauranOnwer/OrdersRestaurant.vue';
import SetNewPassword from '@/Components/OtherComponents/SetNewPassword.vue';
import DealsSection from '@/Components/RestaurantOwner/DealsSection.vue';
import Voucher from '@/Components/RestaurantOwner/Voucher.vue';
export default [
  {
    path: '/RestaurantOwnerDashboard',
    name: 'RestaurantOwner_Dashboard',
    component: RestaurantOwner_Dashboard,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/Resturantowner',
    name: 'RestaurantOwner',
    component: ResturantOwner,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/DealsSection',
    name: 'DealsSection',
    component: DealsSection,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/Voucher',
    name: 'Voucher',
    component: Voucher,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/ViewAllOrdersRes',
    name: 'ViewAllOrdersRes',
    component: ViewAllOrdersRes,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/ResturantReviews',
    name: 'ResturantReviews',
    component: ResturantReviews,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/restOwnerProfile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/setNewPassword',
    name: 'SetNewPassword',
    component: SetNewPassword,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/orderreq',
    name: 'OrderReq',
    component: OrderReq,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/modalView',
    name: 'ModalView',
    component: ModalView,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu',
    component: OwnerMenu,
    meta: {
      requiresAuth: true,
      role: 'Restaurant Owner',
    },
  },
];
