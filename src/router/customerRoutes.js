export default [
    {
        path: '/',
        name: 'RestaurantPage',
        component: () => import('../views/Customer/RestaurantPage.vue')
    },
    {
        path: '/OrderReorder',
        name: 'OrderReorder',
        component: () => import('../views/Customer/OrderReorder.vue')
    },
    {
        path: '/order-details/:id',
        name: 'PrevorderDetails',
        component: () => import('../views/Customer/PrevorderDetails.vue'),
        props: true
    },
    {
        path: '/profilesettings',
        name: 'ProfileSettings',
        component: () => import('../views/Customer/ProfileSettings.vue')
    },
    {
        path: '/favoritespage',
        name: 'FavoritesPage',
        component: () => import('../views/Customer/favs.vue')
    },
    {
        path: '/orderScreen',
        name: 'OrderScreen',
        component: () => import('../views/Customer/OrderScreen.vue')
    },
    {
        path: '/dashboardresturantpage',
        name: 'DashboardResturantPage',
        component: () => import('../views/Customer/DashboardResturantPage.vue')
    },
    {
        path: '/ProductAddToCart',
        name: 'ProductAddToCart',
        component: () => import('../components/Customer/ProductAddToCart.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../components/Customer/CheckOut.vue')
    },
];
