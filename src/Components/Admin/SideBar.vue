<template>
  <div class="sidebar">
    <!-- Logo Icon -->
    <div class="logo-container">
      <font-awesome-icon :icon="['fas', 'utensils']" class="logo" />
    </div>

    <!-- Navigation -->
    <nav>
      <ul>
        <li>
          <router-link to="/admin-dashboard" class="nav-link">
            <font-awesome-icon :icon="['fas', 'home']" />
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/viewallorders" class="nav-link">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />
            <span>Orders</span>
          </router-link>
        </li>
        <li>
          <router-link to="/AdminFinanceDashboard" class="nav-link">
            <font-awesome-icon :icon="['fas', 'dollar-sign']" />
            <span>Revenue</span>
          </router-link>
        </li>
        <li>
          <router-link to="/ReviewsAdmin" class="nav-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <span>Reviews</span>
          </router-link>
        </li>
        <li>
          <button class="nav-link" @click="showLogoutModal">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </nav>

    <ModalComponent
      v-if="isLogoutModalVisible"
      title="Logging out?"
      message="Thanks for stopping by. See you again soon!"
      confirmText="Log out"
      cancelText="Cancel"
      :isVisible="isLogoutModalVisible"
      @close="closeLogoutModal"
      @confirm="confirmLogout"
      @cancel="closeLogoutModal"
    />
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUtensils,
  faHome,
  faShoppingCart,
  faSignOutAlt,
  faDollarSign,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import ModalComponent from '../OtherComponents/ConfirmationModal.vue'; // Adjust the path as necessary
import { useRouter } from 'vue-router';

library.add(faUtensils, faHome, faShoppingCart, faDollarSign, faSignOutAlt, faStar);

const router = useRouter(); // Initialize the router

// Reactive state for the logout modal
const isLogoutModalVisible = ref(false);

// Show the logout confirmation modal
const showLogoutModal = () => {
  isLogoutModalVisible.value = true;
};

// Close the logout confirmation modal
const closeLogoutModal = () => {
  isLogoutModalVisible.value = false;
};

// Handle logout confirmation
const confirmLogout = () => {
  // Remove the token and user info from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

};

</script>

<style scoped>
/* Main sidebar container */
.sidebar {
  width: 100px;
  height: 100vh;
  background-color: #1d1d1d; /* Dark sidebar background for contrast */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

/* Logo Container */
.logo-container {
  margin-bottom: 50px;
}

/* Sidebar logo icon */
.logo {
  font-size: 48px;
  color: #ffffff; /* White logo for better contrast */
}

/* Navigation styling */
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

/* Each navigation item */
.nav-link {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0;
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Icon inside the navigation links */
.nav-link font-awesome-icon {
  font-size: 24px;
}

/* Navigation text under the icons */
.nav-link span {
  font-size: 12px;
  margin-top: 5px;
}

/* Hover effects on navigation links */
.nav-link:hover {
  background-color: #00754a; /* Change background on hover */
  border-radius: 10px; /* Add subtle rounding on hover */
}

/* Add spacing between nav items */
li {
  margin-bottom: 20px;
}

/* On hover, the color becomes brighter */
.nav-link:hover span {
  color: #fff;
  font-weight: bold;
}
</style>