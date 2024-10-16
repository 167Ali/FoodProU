<!-- BeforeLoginHeader.vue -->
<template>
    <div>
      <!-- Business Banner -->
      <div class="business-banner" v-if="showBanner">
        <div class="business-banner-content">
          <font-awesome-icon :icon="['fas', 'briefcase']" class="business-icon" />
          <span class="business-text">Do you need a business account?</span>
          <button class="signup-button" @click="goToBusinessSignup">SIGN UP NOW</button>
        </div>
      </div>
  
      <!-- Main Navbar -->
      <nav class="navbar">
        <div class="navbar-left">
          <font-awesome-icon :icon="['fas', 'utensils']" class="logo" />
          <span class="brand-name">foodpro</span>
        </div>
  
        <div class="navbar-right">
          <button class="auth-button login" @click="showLoginModal = true">Log in</button>
          <button class="auth-button signup" @click="showSignUpModal = true">Sign up</button>
          
        </div>
      </nav>
    </div>
    <LoginModal :showModal="showLoginModal" @close="closeLoginModal" />

<SignUpModal :showModal="showSignUpModal" @close="closeSignUpModal" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import LoginModal from '../../components/LoginSignup/User_login.vue';

import SignUpModal from '../../components/LoginSignup/User_signup.vue';

const router = useRouter();
const showBanner = ref(true);

// Navigation functions
const showLoginModal = ref(false);
const showSignUpModal = ref(false);
const closeLoginModal = () => {
  showLoginModal.value = false;
};
const closeSignUpModal = () => {
  showSignUpModal.value = false;
};

const goToBusinessSignup = () => {
    router.push('/businesslanding');
};
</script>


<style scoped>
/* Business Banner */
.business-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #00754a;
    color: #ffffff;
    padding: 10px 50px;
    position: relative;
}

.business-banner-content {
    display: flex;
    align-items: center;
    margin-left: 35%;
}

.business-icon {
    font-size: 24px;
    margin-right: 10px;
}

.business-text {
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
}

.signup-button {
    background: transparent;
    border: 2px solid #ffffff;
    color: #ffffff;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
}

.signup-button:hover {
    background: #ffffff;
    color: #00754a;
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

.auth-button.signup {
    background-color: #00754a;
    color: white;
}

.auth-button.login:hover,
.auth-button.signup:hover {
    background-color: #2e8d6a;
    color: white;
}

/* Language Selector */
.lang-selector {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.lang-selector span {
    font-size: 14px;
    font-weight: bold;
}

/* Cart Icon */
.cart-icon {
    font-size: 30px;
    cursor: pointer;
}
</style>