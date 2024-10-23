<template>
  <div>
    <!-- Hamburger Icon for Mobile -->
    <div class="d-lg-none" @click="toggleSidebar" role="button" aria-label="Toggle sidebar">
      <i class="fa-solid fa-bars"></i>
    </div>

    <!-- Offcanvas Sidebar for Mobile -->
    <div
      class="offcanvas offcanvas-start"
      id="offcanvasSidebar"
      tabindex="-1"
      aria-labelledby="offcanvasSidebarLabel"
      style="width: 90px;"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" @click="toggleSidebar" aria-label="Close" ref="closeButton"></button>
      </div>
      <div class="offcanvas-body">
        <nav class="sidebar d-flex flex-column align-items-center">
          <!-- Logo -->
          <img
            src="https://plus.unsplash.com/premium_photo-1674670904769-544b31893a15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyJTIwbGFifGVufDB8fDB8fHww"
            alt="Logo"
            class="logo my-4"
          />
          <!-- Navigation -->
          <ul class="nav flex-column w-100 text-center">
            <li class="nav-item mb-3" v-for="item in navItems" :key="item.icon">
              <router-link v-if="item.route !== '/'" :to="item.route" class="nav-link text-dark d-flex flex-column align-items-center">
                <i :class="item.icon + ' fs-3'"></i>
                <span class="item-label">{{ item.label }}</span>
              </router-link>
              <button v-else class="nav-link text-dark d-flex flex-column align-items-center" @click="showLogoutModal">
                <i :class="item.icon + ' fs-3'"></i>
                <span class="item-label">{{ item.label }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Fixed Sidebar for Desktop -->
    <nav class="sidebar d-none d-lg-flex flex-column align-items-center">
      <img
        src="https://plus.unsplash.com/premium_photo-1674670904769-544b31893a15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyJTIwbGFifGVufDB8fDB8fHww"
        alt="Logo"
        class="logo my-4"
      />
      <ul class="nav flex-column w-100 text-center">
        <li class="nav-item mb-3" v-for="item in navItems" :key="item.icon">
          <router-link v-if="item.route !== '/'" :to="item.route" class="nav-link text-dark d-flex flex-column align-items-center">
            <i :class="item.icon + ' fs-3'"></i>
            <span class="item-label">{{ item.label }}</span>
          </router-link>
          <button v-else class="nav-link text-dark d-flex flex-column align-items-center" @click="showLogoutModal">
            <i :class="item.icon + ' fs-3'"></i>
            <span class="item-label">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Logout Confirmation Modal -->
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
import { ref } from 'vue';
import ModalComponent from '@/components/OtherComponents/ConfirmationModal.vue'; // Adjust the path as necessary
import { useRouter } from 'vue-router';

// Sidebar navigation items
const navItems = ref([
  { icon: 'fas fa-home', label: 'Home', route: '/RestaurantOwnerDashboard' },
  { icon: 'fas fa-chart-line', label: 'Analytics', route: '/Resturantowner' },
  { icon: 'fas fa-utensils', label: 'Orders', route: '/ViewAllOrdersRes' },
  { icon: 'fas fa-star', label: 'Reviews', route: '/ResturantReviews' },
  { icon: 'fas fa-cogs', label: 'Settings', route: '/restOwnerProfile' },
  { icon: 'fas fa-sign-out-alt', label: 'Log Out', route: '/' }, // This will be the button for logging out
]);

// eslint-disable-next-line no-unused-vars
const router = useRouter(); // Initialize the router

// Function to toggle the sidebar (for mobile)
const toggleSidebar = () => {
  const sidebar = document.getElementById('offcanvasSidebar');
  // eslint-disable-next-line no-undef
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar) || new bootstrap.Offcanvas(sidebar);
  bsOffcanvas.toggle();
};

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
/* Sidebar styles */
.sidebar {
  width: 90px;
  background-color: #f1f3f5;
  min-height: 100vh;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #e0e0e0;
  padding-top: 2rem;
  transition: all 0.3s ease-in-out;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.nav {
  padding: 0;
  margin-top: 2rem;
}

.nav-item {
  width: 100%;
}

.nav-link {
  color: #495057;
  width: 100%;
  padding: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background-color: #e9ecef;
  border-radius: 12px;
  color: #007bff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.nav-link i {
  font-size: 1.6rem;
  margin-bottom: 5px;
}

.item-label {
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 5px;
  color: #6c757d;
}

.nav-link.active {
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.4);
}

.d-lg-none i {
  font-size: 30px;
  color: #000;
  margin-left: 25px;
  margin-top: 20px;
  transition: color 0.3s ease;
  cursor: pointer;
}

/* Responsive Styles */
@media (min-width: 992px) {
  .d-lg-none {
    display: none;
  }
}
</style>