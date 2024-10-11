export default [
    {
        path: '/orderreq',
        name: 'orderreq',
        component: () => import('../components/RestaurantOwner/OrderRequest.vue')
    },
    {
        path: '/modalView',
        name: 'ModalView',
        component: () => import('../components/RestaurantOwner/restOwnReciept.vue')
    },
    {
        path: '/restOwnerProfile',
        name: 'RestOwnerProfile',
        component: () => import('../components/RestaurantOwner/restOwnerProfile.vue')
    },
    {
        path: '/RestaurantOwnerDashboard',
        name: 'RestaurantOwner_Dashboard',
        component: () => import('../views/RestauranOnwer/RestaurantOwner_Dashboard.vue')
    },
    {
        path: '/orderreq',
        name: 'orderreq',
        component: () => import('../components/RestaurantOwner/OrderRequest.vue')
    },
    {
        path: '/ownermenu',
        name: 'OwnerMenu',
        component: () => import('../views/Menu/OwnerMenu.vue')
    },
];
