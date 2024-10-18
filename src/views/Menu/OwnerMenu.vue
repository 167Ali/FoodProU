<template>
    <div class="layout-container">
      <!-- Sidebar Section -->
      <aside class="sidebar-container">
        <Sidebar />
      </aside>
  
      <!-- Main Content Section -->
      <main class="main-content">
        <MenuAndChoice />
      </main>
    </div>
  </template>
  
  <script setup>
  import MenuAndChoice from '../../components/Menu&Choices/MenuAndChoice.vue';
  import Sidebar from '../../components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
  </script>
  
  <style scoped>
  /* Layout container styles */
  .layout-container {
    display: flex;
    height: 100vh; /* Full viewport height */
  }
  
  /* Sidebar styles */
  .sidebar-container {
    width: 80px; /* Set a fixed width for the sidebar */
    
  }
  
  /* Main content styles */
  .main-content {
    flex-grow: 1; /* Take up the remaining space */
    
    background-color: #ffffff; /* Optional background color for main content */
    overflow-y: auto; /* Allows scrolling for overflow content */
  }
  </style>  