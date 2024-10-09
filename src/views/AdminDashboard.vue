<template>
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <SideBar />
  
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
  import SideBar from '../components/SideBar.vue'
  import AdminHeader from '../components/AdminHeader.vue'
  import DiscountBanner from '../components/DiscountBanner.vue'
  import CategorySection from '../components/CategorySection.vue'
  import RestaurantList from '../components/RestaurantList.vue'
  import OrderDetail from '../components/OrderDetail.vue'
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
  