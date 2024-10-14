export default [
    {
        path: '/admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/Admin/AdminDashboard.vue')
    },
    {
        path: '/AdminFinanceDashboard',
        name: 'AdminFinanceDashboard',
        component: () => import('../components/Admin/AdminFinanceDashboard.vue')
    },
    {
        path: '/viewallorders',
        name: 'ViewAllOrdersAdm',
        component: () => import('../views/Admin/ViewAllOrdersAdm.vue')
    }
];
