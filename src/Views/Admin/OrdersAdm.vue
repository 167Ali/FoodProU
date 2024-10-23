<template>
  <div>
    <FilterAndSearch @filterApplied="applyFilter" :restaurants="restaurants" />
    <Table :filteredOrders="filteredOrders" />
    <div class="page-container">
      <!-- Sidebar -->
      <SideBar />

      <!-- Main Content -->
      <div class="content">
        <ViewAllOrdersAdm />
      </div>
    </div>
    </div>
</template>



<script setup>
import SideBar from '@/Components/Admin/SideBar.vue';
import ViewAllOrdersAdm from '../../Components/OtherComponents/AllOrders/OrdersMainScreen.vue';
</script>

<style scoped>
.page-container {
  display: flex; /* Flexbox layout */
  height: 100vh; /* Full page height */
}



/* Sidebar styling */


/* Main content area styling */
.content {
  margin-left: 90px;
  /* Leave space for the fixed sidebar */
  flex-grow: 1;
  /* Content takes up the remaining space */
  padding: 20px;
  /* Add some padding */
  overflow-y: auto;
  /* Scrollable if content is too large */
  background-color: #fff;
  /* Optional: background color for the content */
  height: 100%;
  box-sizing: border-box;
  /* Ensure padding is included in the total width/height */
}

.page-container {
  display: flex;
  height: 100vh;
  /* Full height */
}
</style>    