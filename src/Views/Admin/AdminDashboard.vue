<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <SideBar />
    <router-view />
    <div class="main-content">
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
// Import your components
import SideBar from '@/Components/Admin/SideBar.vue'
import AdminHeader from '@/Components/Admin/AdminHeader.vue'
import DiscountBanner from '@/Components/Admin/DiscountBanner.vue'
import CategorySection from '@/Components/Admin/CategorySection.vue'
import RestaurantList from '@/Components/Admin/RestaurantList.vue'
import OrderDetail from '@/Components/Admin/OrderDetail.vue'
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
  scrollbar-width: none;
  /* For Firefox */
}

.main-content::-webkit-scrollbar {
  display: none;
  /* For Chrome, Safari, and Edge */
}
</style>
