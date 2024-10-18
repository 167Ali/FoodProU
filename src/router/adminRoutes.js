import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import ViewAllOrders from '@/views/Admin/OrdersAdm.vue'
import AdminFinanceDashboard from '../components/Admin/AdminFinanceDashboard.vue'
import ReviewsAdmin from '@/components/Admin/ReviewsAdmin.vue'

export default [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/viewallorders',
    name: 'ViewAllOrders', 
    component: ViewAllOrders 
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
