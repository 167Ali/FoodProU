<template>
    <div>
        <!-- Main Navbar -->
        <nav class="navbar">
            <div class="navbar-left">
                <!-- Logo -->
                <i class="fa-solid fa-utensils logo"></i>
                <span class="brand-name">foodpro For Bussiness</span>
            </div>

            <div class="navbar-right">

                <!-- Log In buttons -->
                 <p>Already have Account ?</p>
                <button class="auth-button login" @click="goToLogin">Log in</button>

            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

// Router instance
const router = useRouter();


// State management
const showBanner = ref(true);


// Function to close the business banner
const closeBanner = () => {
    showBanner.value = false;
};

// Navigation function
const goToLogin = () => {
    router.push('/');
};
</script>

<style scoped>
p{
margin-top: 10px;
}
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
