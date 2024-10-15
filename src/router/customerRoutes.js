import Restaurantpage from '../views/Customer/RestaurantPage.vue'
import CheckOut from '../components/Customer/CheckOut.vue'
import AddtoCart from '../components/AddtoCart.vue'
import CategoryNavbar from '../components/Customer/CategoryNavbar.vue'
import DashboardResturantPage from '../views/Customer/DashboardResturantPage.vue'
import ProfileSettings from '../views/Customer/ProfileSettings.vue'
import FavoritesPage from '../views/Customer/favs.vue'
import OrderScreen from '../views/Customer/OrderScreen.vue'
import OrderReorder from '../views/Customer/OrderReorder.vue'
import PrevorderDetails from '../views/Customer/PrevorderDetails.vue'
import OrderRating from '@/components/Customer/OrderRating.vue'

export default [
  {
    path: '/RestaurantPage',
    name: 'RestaurantPage',
    component: Restaurantpage
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOut
  },
  {
    path: '/caart',
    name: 'addtocart',
    component: AddtoCart
  },
  {
    path: '/catnvbr',
    name: 'categorynavbar',
    component: CategoryNavbar
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
]