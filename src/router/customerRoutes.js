// src/router/customerRoutes.js

import RestaurantPage from '../views/Customer/RestaurantPage.vue';
import CheckOut from '../components/Customer/CheckOut.vue';
// import AddtoCart from '../components/Customer/AddtoCart.vue';
import CategoryNavbar from '../components/Customer/CategoryNavbar.vue';
import DashboardResturantPage from '../views/Customer/DashboardResturantPage.vue';
import ProfileSettings from '../views/Customer/ProfileSettings.vue';
import FavoritesPage from '../views/Customer/favs.vue';
import OrderScreen from '../views/Customer/OrderScreen.vue';
import OrderReorder from '../views/Customer/OrderReorder.vue';
import PrevorderDetails from '../views/Customer/PrevorderDetails.vue';
import OrderRating from '@/components/Customer/OrderRating.vue';
import UserGuide from '@/components/Customer/UserGuide.vue';
import RecipeBlog from '../views/Customer/RecipeBlog.vue'
export default [
  {
    // M ALi route
    // path: '/restaurant/:restaurantId/menu',
    // name: 'RestaurantMenu',
    // component: Restaurantpage,
    // props: true 

    path: '/RestaurantPage/:id', 
    name: 'RestaurantPage',
    component: RestaurantPage,
    props: true, 

  },
  {
    path: '/recipe-blog',
    name: 'RecipeBlog',
    component: RecipeBlog
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
