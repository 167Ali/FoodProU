import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import ViewAllOrders from '@/views/Admin/OrdersAdm.vue'
import AdminFinanceDashboard from '../components/Admin/AdminFinanceDashboard.vue'
import ReviewsAdmin from '@/components/Admin/ReviewsAdmin.vue'
import AdminResturantPage from '@/components/Admin/AdminResturantPage.vue'

export default [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin-resturant-page',
    name: 'AdminResturantPage',
    component: AdminResturantPage,
  },
  {
    path: '/viewallordersAdm',
    name: 'ViewAllOrdersAdm', 
    component: ViewAllOrdersAdm 
  },
  {
    path: '/AdminFinanceDashboard',
    name: 'AdminFinanceDashboard',
    component: AdminFinanceDashboard
  },
  {
    path: '/ReviewsAdmin',
    name: 'ReviewsAdmin',
    component: ReviewsAdmin
  }
]
