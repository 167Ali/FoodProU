import RestaurantOwner_Dashboard from '../views/RestauranOnwer/RestaurantOwner_Dashboard.vue'
import ResturantOwner from '@/components/RestaurantOwner/ResturantOwner.vue'
import RestOwnerProfile from '../components/RestaurantOwner/restOwnerProfile.vue'
import ResturantReviews from '@/components/RestaurantOwner/ResturantReviews.vue'
import OrderReq from '../components/RestaurantOwner/OrderRequest.vue'
import ModalView from '../components/RestaurantOwner/restOwnReciept.vue'
import OwnerMenu from '../views/Menu/OwnerMenu.vue'
import ViewAllOrdersRes from '@/views/RestauranOnwer/OrdersRestaurant.vue'
export default [
  {
    path: '/RestaurantOwnerDashboard',
    name: 'RestaurantOwner_Dashboard',
    component: RestaurantOwner_Dashboard,
   
  },
  {
    path: '/Resturantowner',
    name: 'RestaurantOwner',
    component: ResturantOwner
  },
  {
    path: '/ViewAllOrdersRes',
    name: 'ViewAllOrdersRes', 
    component: ViewAllOrdersRes 
  },
  {
    path: '/ResturantReviews',
    name: 'ResturantReviews',
    component: ResturantReviews
  },
  {
    path: '/restOwnerProfile',
    name: 'RestOwnerProfile',
    component: RestOwnerProfile
  },
  {
    path: '/orderreq',
    name: 'OrderReq',
    component: OrderReq
  },
  {
    path: '/modalView',
    name: 'ModalView',
    component: ModalView
  },
  {
    path: '/ownermenu',
    name: 'OwnerMenu',
    component: OwnerMenu
  }
]