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
import SideBar from '../../components/Admin/SideBar.vue'
import AdminHeader from '../../components/Admin/AdminHeader.vue'
import DiscountBanner from '../../components/Admin/DiscountBanner.vue'
import CategorySection from '../../components/Admin/CategorySection.vue'
import RestaurantList from '../../components/Admin/RestaurantList.vue'
import OrderDetail from '../../components/Admin/OrderDetail.vue'
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
 scrollbar-width: none; /* For Firefox */
}

.main-content::-webkit-scrollbar {
 display: none; /* For Chrome, Safari, and Edge */
}
</style>
