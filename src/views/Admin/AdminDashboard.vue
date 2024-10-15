<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <SideBar />

    <!-- Route-specific content will be displayed here -->
    <router-view />

    <!-- Conditionally hide main content based on route -->
    <div v-if="showMainContent" class="main-content">
      <!-- Header Section -->
      <AdminHeader />

      <!-- Banner Section -->
      <DiscountBanner />

      <!-- Category Section -->
      <CategorySection />

      <!-- Restaurant Listings -->
      <RestaurantList />
    </div>
    <!-- Order Detail -->
    <OrderDetail />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'; // Import Vue Router's useRoute
import { computed, watch } from 'vue';

// Import your components
import SideBar from '../../components/Admin/SideBar.vue';
import AdminHeader from '../../components/Admin/AdminHeader.vue';
import DiscountBanner from '../../components/Admin/DiscountBanner.vue';
import CategorySection from '../../components/Admin/CategorySection.vue';
import RestaurantList from '../../components/Admin/RestaurantList.vue';
import OrderDetail from '@/components/Admin/OrderDetail.vue';

// Use route to determine the current page
const route = useRoute();

// Log route data for debugging
console.log('Current Route:', route);

// Define a computed property to conditionally show main content
const showMainContent = computed(() => {
  // Show main content for specific routes only (e.g., dashboard or specific paths)
  return route.name === 'AdminDashboard' || route.path === '/admin/dashboard';
});

// Optionally, use `watch` to track route changes and log them
watch(route, (newRoute) => {
  console.log('Route changed:', newRoute);
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>