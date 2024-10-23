import RestaurantOwner_Dashboard from '@/Views/RestauranOnwer/RestaurantOwnerDashboard.vue'
import ResturantOwner from '@/Components/RestaurantOwner/ResturantOwner.vue'
import RestOwnerProfile from '@/Components/RestaurantOwner/RestOwnerProfile.vue'
import ResturantReviews from '@/Components/RestaurantOwner/ResturantReviews.vue'
import OrderReq from '@/Components/RestaurantOwner/RestaurantDashboard/OrderRequest.vue'
import ModalView from '@/Components/RestaurantOwner/RestOwnReciept.vue'
import OwnerMenu from '@/Views/Menu/OwnerMenu.vue'
import ViewAllOrdersRes from '@/Views/RestauranOnwer/OrdersRestaurant.vue'
import SetNewPassword from '@/Components/OtherComponents/SetNewPassword.vue'

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
    component: RestOwnerProfile,

  },
  {
    path: '/setNewPassword',  // Notice this is a relative path
    name: 'SetNewPassword',
    component: SetNewPassword  // Import this component
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