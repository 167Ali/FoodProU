import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import ViewAllOrdersAdm from '@/views/Admin/ViewAllOrdersAdm.vue'
import AdminFinanceDashboard from '../components/Admin/AdminFinanceDashboard.vue'
import ReviewsAdmin from '@/components/Admin/ReviewsAdmin.vue'

export default [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
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
