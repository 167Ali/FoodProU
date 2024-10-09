<template>
    <div class="main d-flex flex-column justify-content-center align-items-start">
        <div class="content-wrapper ms-5">
            <h2 class="text-left mb-3">
                It's the food and groceries you love, <br />delivered
            </h2>
            <div class="button-group mb-5">
                <button class="btn btn-login me-3" @click="showLoginModal = true">Login</button>
                <button class="btn btn-signup" @click="showSignUpModal = true">Sign Up</button>
            </div>
        </div>
        <img src="../assets/landing_logo.png" alt="Landing Logo" class="logo" />
        <LoginModal :showModal="showLoginModal" @close="closeLoginModal" />
        <SignUpModal :showModal="showSignUpModal" @close="closeSignUpModal" />
    </div>
    </template>
    
      
    <script>
    import {
        defineComponent,
        ref
    } from 'vue';
    import LoginModal from '../components/User_login.vue';
    import SignUpModal from '../components/User_signup.vue';
    
    export default defineComponent({
        name: 'Main_Landing',
        components: {
            LoginModal,
            SignUpModal,
        },
        setup() {
            const showLoginModal = ref(false);
            const showSignUpModal = ref(false);
    
            const closeLoginModal = () => {
                showLoginModal.value = false;
            };
    
            const closeSignUpModal = () => {
                showSignUpModal.value = false;
            };
    
            return {
                showLoginModal,
                showSignUpModal,
                closeLoginModal,
                closeSignUpModal,
            };
        },
    });
    </script>
    
      
    <style scoped>
    .main {
        background-color: #bbbaba;
        /* Grey background color */
        width: 100%;
        height: 100vh;
        /* Full viewport height */
        position: relative;
        padding: 20px;
    }
    
    .content-wrapper {
        z-index: 1;
    }
    
    h2 {
        font-size: 2rem;
        color: rgb(0, 0, 0);
        font-weight: bolder;
    }
    
    .button-group button {
        width: 120px;
    }
    
    .btn-login {
        background-color: white;
        color: black;
        border: 2px solid black;
        font-weight: bolder;
    }
    
    .btn-login:hover {
        background-color: rgb(122, 122, 122);
        color: black;
        border: 2px solid black;
        font-weight: bolder;
    }
    
    .btn-signup {
        background-color: #00754A;
        /* Custom green color */
        color: white;
        border: none;
        font-weight: bolder;
    }
    
    .btn-signup:hover {
        background-color: #00925d;
        color: rgb(0, 0, 0);
        border: 2px solid rgb(0, 0, 0);
        font-weight: bolder;
    }
    
    .logo {
        position: absolute;
        bottom: 120px;
        right: 50px;
        width: 450px;
        height: 450px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 1024px) {
        .logo {
            width: 300px;
            height: 300px;
        }
    }
    
    @media (max-width: 768px) {
        h2 {
            font-size: 1.5rem;
        }
    
        .button-group button {
            width: 100px;
        }
    
        .logo {
            width: 200px;
            height: 200px;
        }
    }
    
    @media (max-width: 576px) {
        h2 {
            font-size: 1.2rem;
        }
    
        .button-group button {
            width: 90px;
            font-size: 0.8rem;
        }
    
        .logo {
            width: 150px;
            height: 150px;
            bottom: 80px;
            right: 20px;
        }
    }
    </style>
    