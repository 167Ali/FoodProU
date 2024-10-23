<template>
  <div>
      <FilterAndSearch @filterApplied="applyFilter" :restaurants="restaurants" />
      <Table :filteredOrders="filteredOrders" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import FilterAndSearch from './OrdersFilterSearch.vue';
import Table from './OrdersTable.vue';
// Orders data with added date and status
const orders = ref([
  { id: 1, name: 'Ahmed Ali', phone: '0300-1234567', address: 'Karachi', restaurant: "Cheezious", totalPrice: 1200, foodCommission: 50, status: 'In Progress', date: '10/10/2024' },
  { id: 2, name: 'Sara Khan', phone: '0312-9876543', address: 'Lahore', restaurant: "KBJS", totalPrice: 1500, foodCommission: 70, status: 'Completed', date: '10/09/2024' },
  { id: 3, name: 'Bilal Siddiqui', phone: '0345-5556677', address: 'Islamabad', restaurant: "Ranchers", totalPrice: 1800, foodCommission: 80, status: 'Cancelled', date: '10/08/2024' },
  { id: 4, name: 'Asma Sheikh', phone: '0301-2345678', address: 'Quetta', restaurant: "Burger O Clock", totalPrice: 1400, foodCommission: 60, status: 'In Progress', date: '10/07/2024' },
  { id: 5, name: 'Hina Raza', phone: '0307-9988776', address: 'Peshawar', restaurant: "Daily Deli", totalPrice: 2000, foodCommission: 90, status: 'Completed', date: '10/06/2024' },
  { id: 6, name: 'Zainab Farooq', phone: '0322-4442233', address: 'Faisalabad', restaurant: "Burger Lab", totalPrice: 1600, foodCommission: 75, status: 'Cancelled', date: '10/05/2024' },
  { id: 7, name: 'Omer Malik', phone: '0302-1122334', address: 'Multan', restaurant: "Howdy's", totalPrice: 1100, foodCommission: 55, status: 'In Progress', date: '10/04/2024' }
]);


const filteredOrders = ref([...orders.value]);

// Generate a unique list of restaurants
const restaurants = ref([...new Set(orders.value.map(order => order.restaurant))]);

// Apply filter logic
// Parent filter file
const applyFilter = (filterData) => {
  filteredOrders.value = orders.value.filter((order) => {
      // Check if the search query matches any field
      const matchesSearchQuery =
          !filterData.searchQuery ||
          order.id.toString().includes(filterData.searchQuery) ||
          order.name.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
          order.phone.includes(filterData.searchQuery) ||
          order.address.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
          order.restaurant.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
          order.totalPrice.toString().includes(filterData.searchQuery) ||
          order.foodCommission.toString().includes(filterData.searchQuery) ||
          order.date.includes(filterData.searchQuery) ||
          order.status.toLowerCase().includes(filterData.searchQuery.toLowerCase());

      // Filter specific fields individually (from the modal filters)
      const matchesOrderId = !filterData.orderIdFilter || order.id.toString().includes(filterData.orderIdFilter);
      const matchesName = !filterData.nameFilter || order.name.toLowerCase().includes(filterData.nameFilter.toLowerCase());
      const matchesPhone = !filterData.phoneFilter || order.phone.includes(filterData.phoneFilter);
      const matchesAddress = !filterData.addressFilter || order.address.toLowerCase().includes(filterData.addressFilter.toLowerCase());
      
      // Restaurant filter
      const matchesRestaurant = !filterData.restaurantFilter || order.restaurant.toLowerCase() === filterData.restaurantFilter.toLowerCase();

      const matchesTotalPrice =
          order.totalPrice >= filterData.priceRange[0] && order.totalPrice <= filterData.priceRange[1];
      
      const matchesCommission =
          order.foodCommission >= filterData.commissionRange[0] && order.foodCommission <= filterData.commissionRange[1];

      // Date range filtering
      const orderDate = new Date(order.date);
      const startDate = filterData.startDateFilter ? new Date(filterData.startDateFilter) : null;
      const endDate = filterData.endDateFilter ? new Date(filterData.endDateFilter) : null;

      // Adjusting matchesDateRange to include the end date correctly
      const matchesDateRange =
          (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

      const matchesStatus = !filterData.statusFilter || order.status.toLowerCase() === filterData.statusFilter.toLowerCase();

      return matchesSearchQuery && matchesOrderId && matchesName && matchesPhone && matchesAddress && matchesRestaurant && matchesTotalPrice && matchesCommission && matchesDateRange && matchesStatus;
  });
};


</script>

