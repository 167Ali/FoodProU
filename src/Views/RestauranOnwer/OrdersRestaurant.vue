<template>
    <div class="page-container">
      <!-- Sidebar -->
      <SideBar class="sidebar" />
  
      <!-- Main Content Area -->
      <div class="content">
        <ViewAllOrdersAdm />
      </div>
    </div>
  </template>
  
  
  <script setup>
  import ViewAllOrdersAdm from '../../components/OtherComponents/AllOrders/OrdersMainScreen.vue';
  import SideBar from '@/components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
  </script>
  
  <style scoped>
  .page-container {
    display: flex; /* Flexbox layout */
    height: 100vh; /* Full page height */
  }
  
  .sidebar {
    width: 90px; /* Fixed width for sidebar */
    background-color: #f1f3f5; /* Light background color */
    min-height: 100vh; /* Ensure sidebar covers full height */
    position: fixed; /* Sidebar remains fixed on scroll */
    top: 0;
    left: 0;
    border-right: 1px solid #e0e0e0; /* Optional: border on right */
    z-index: 1000; /* Ensure it’s on top */
  }
  
  .content {
    margin-left: 90px; /* Space for the sidebar */
    flex-grow: 1; /* Allow content to take up the rest of the space */
    padding: 20px; /* Padding for the content area */
    overflow-y: auto; /* Scrollable content if it overflows */
    background-color: #fff; /* Background color for content area */
    height: 100%;
    box-sizing: border-box; /* Ensure padding is part of the width/height */
  }
  </style>    