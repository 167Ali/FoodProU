export default [
    {
        path: '/mainlanding',
        name: 'Main_landing',
        component: () => import('../views/Login_Signup/Main_Landing.vue')
    },
    {
        path: '/businesslanding',
        name: 'Business_Landing',
        component: () => import('../views/Login_Signup/Bussiness_Landing.vue')
    },
    {
        path: '/ModalHurara',
        name: 'ModalHurara',
        component: () => import('../components/OtherComponents/ModalHurara.vue')
    },
    {
        path: '/testingFileHurara',
        name: 'testingFileHurara',
        component: () => import('../components/testingFIleHurara.vue')
    },

];
