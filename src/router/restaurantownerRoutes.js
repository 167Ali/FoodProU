import RestaurantOwner_Dashboard from '../views/RestauranOnwer/RestaurantOwner_Dashboard.vue'
import ResturantOwner from '@/components/RestaurantOwner/ResturantOwner.vue'
import RestOwnerProfile from '@/components/RestaurantOwner/restOwnerProfile.vue'
import ResturantReviews from '@/components/RestaurantOwner/ResturantReviews.vue'
import OrderReq from '../components/RestaurantOwner/OrderRequest.vue'
import ModalView from '../components/RestaurantOwner/restOwnReciept.vue'

export default [
  {
    path: '/RestaurantOwnerDashboard',
    name: 'RestaurantOwner_Dashboard',
    component: RestaurantOwner_Dashboard,
    children: [
      {
        path: '/Resturant-owner',
        name: 'RestaurantOwner',
        component: ResturantOwner
      },
      {
        path: '/restOwnerProfile',
        name: 'RestOwnerProfile',
        component: RestOwnerProfile
      },
    ]
  },
  {
    path: '/ResturantReviews',
    name: 'ResturantReviews',
    component: ResturantReviews
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
  }
]