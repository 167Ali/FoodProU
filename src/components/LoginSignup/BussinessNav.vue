<template>
    <div>
      
        <!-- Main Navbar -->
        <nav class="navbar">
            <div class="navbar-left">
                <!-- Logo -->
                <font-awesome-icon :icon="['fas', 'utensils']" class="logo" />
                <span class="brand-name">foodpro</span>
            </div>

            <div class="navbar-right">
                <!-- Log In  buttons -->
                <button class="auth-button login" @click="goToLogin">Log in</button>
                

            </div>
        </nav>
    </div>
</template>

<script>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginHeader',
    components: {
        FontAwesomeIcon,
    },
    setup() {
        const router = useRouter();
        const showBanner = ref(true);

        // Function to close the business banner
        const closeBanner = () => {
            showBanner.value = false;
        };

        // Navigation functions
        const goToLogin = () => {
            router.push('/login');
        };


        return {
            closeBanner,
            goToLogin,
            
        };
    },
};
</script>

<style scoped>


.close-icon {
    cursor: pointer;
    font-size: 20px;
}

/* Navbar */
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 50px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
}

/* Left Section (Logo) */
.navbar-left {
    display: flex;
    align-items: center;
}

.logo {
    font-size: 24px;
    margin-right: 10px;
    color: #00754a;
}

.brand-name {
    font-size: 22px;
    font-weight: bold;
    color: #00754a;
}

/* Right Section (Buttons and Icons) */
.navbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Auth Buttons */
.auth-button {
    border: 2px solid #00754a;
    color: #00754a;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
}

.auth-button.login:hover {
    background-color: #2e8d6a;
    color: white;
}

</style>  