<template>
    <div class="page-container">
         
      <div class="content">
        <!-- FilterAndSearch Component -->
        <FilterAndSearch @filterApplied="applyFilter" />
        
        <!-- Table Component showing filteredOrders -->
        <Table :filteredOrders="filteredOrders" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FilterAndSearch from '../../components/Admin/ViewAllOrdersFilterSearch.vue';
  import Table from '../../components/Admin/ViewAllOrdersTbl.vue';
  
  // Orders data
  const orders = ref([
    { id: 1, name: 'Ahmed Ali', phone: '0300-1234567', address: 'Karachi', resturant: "Cheezious", totalPrice: 1200, foodCommission: 50 },
    { id: 2, name: 'Sara Khan', phone: '0312-9876543', address: 'Lahore', resturant: "KBJS", totalPrice: 1500, foodCommission: 70 },
    { id: 3, name: 'Bilal Siddiqui', phone: '0345-5556677', address: 'Islamabad', resturant: "Ranchers", totalPrice: 1800, foodCommission: 80 },
    { id: 4, name: 'Asma Sheikh', phone: '0301-2345678', address: 'Quetta', resturant: "Burger O Clock", totalPrice: 1400, foodCommission: 60 },
    { id: 5, name: 'Hina Raza', phone: '0307-9988776', address: 'Peshawar', resturant: "Daily Deli", totalPrice: 2000, foodCommission: 90 },
    { id: 6, name: 'Zainab Farooq', phone: '0322-4442233', address: 'Faisalabad', resturant: "Burger Lab", totalPrice: 1600, foodCommission: 75 },
    { id: 7, name: 'Omer Malik', phone: '0302-1122334', address: 'Multan', resturant: "Howdy's", totalPrice: 1100, foodCommission: 55 }
  ]);
  
  const filteredOrders = ref([...orders.value]);
  
  // Apply filter logic
  const applyFilter = (filterData) => {
    filteredOrders.value = orders.value.filter((order) => {
      const matchesSearchQuery =
        !filterData.searchQuery ||
        order.name.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
        order.phone.includes(filterData.searchQuery) ||
        order.address.toLowerCase().includes(filterData.searchQuery.toLowerCase());
  
      const matchesName = !filterData.nameFilter || order.name.toLowerCase().includes(filterData.nameFilter.toLowerCase());
      const matchesPhone = !filterData.phoneFilter || order.phone.includes(filterData.phoneFilter);
      const matchesAddress = !filterData.addressFilter || order.address.toLowerCase().includes(filterData.addressFilter.toLowerCase());
  
      const matchesTotalPrice =
        order.totalPrice >= filterData.priceRange[0] && order.totalPrice <= filterData.priceRange[1];
  
      const matchesCommission =
        order.foodCommission >= filterData.commissionRange[0] && order.foodCommission <= filterData.commissionRange[1];
  
      return matchesSearchQuery && matchesName && matchesPhone && matchesAddress && matchesTotalPrice && matchesCommission;
    });
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex; /* Flexbox layout */
    height: 100vh; /* Full page height */
  }
  
  
  .content {
    flex-grow: 1; /* Content takes up remaining space */
    padding: 20px; /* Some padding for content area */
    overflow-y: auto; /* Scroll if content overflows vertically */
  }
  </style>  