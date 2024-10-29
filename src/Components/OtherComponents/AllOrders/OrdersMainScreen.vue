<template>
  <div>
    <FilterAndSearch @filterApplied="applyFilter" :restaurants="restaurants" />
    <Table :filteredOrders="filteredOrders" />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import FilterAndSearch from '@/Components/OtherComponents/AllOrders/OrdersFilterSearch.vue';
import Table from '@/Components/OtherComponents/AllOrders/OrdersTable.vue';
// Orders data with added date and status
import { useStore } from 'vuex';  // Import the Vuex store
const store = useStore();

const orders = computed(() => store.getters['AllOrdersAdm/allOrders'] || []);
const filteredOrders = ref();
const restaurants = ref();


onMounted(async () => {
  try {
    await store.dispatch('AllOrdersAdm/fetchOrders');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
watch(orders, (newOrders) => {
  if (Array.isArray(newOrders)) {
    //  filteredOrders.value = [...orders.value];
    filteredOrders.value = [...newOrders];
    restaurants.value = [...new Set(newOrders.map(order => order.restaurant))];
  }
}, { immediate: true });

const applyFilter = (filterData) => {
  filteredOrders.value = orders.value.filter((order) => {
    // Check if the search query matches any field
    const matchesSearchQuery =
      !filterData.searchQuery ||
      order.id.toString().includes(filterData.searchQuery) ||
      order.first_name.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
      order.phone_number.includes(filterData.searchQuery) ||
      order.customer_address.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
      // order.restaurant.toLowerCase().includes(filterData.searchQuery.toLowerCase()) ||
      order.total_amount.toString().includes(filterData.searchQuery) ||
      //order.foodCommission.toString().includes(filterData.searchQuery) ||
      order.created_at.includes(filterData.searchQuery) ||
      order.status.toLowerCase().includes(filterData.searchQuery.toLowerCase());

    // Filter specific fields individually (from the modal filters)
    const matchesOrderId = !filterData.orderIdFilter || order.id.toString().includes(filterData.orderIdFilter);
    const matchesName = !filterData.nameFilter || order.first_name.toLowerCase().includes(filterData.nameFilter.toLowerCase());
    const matchesPhone = !filterData.phoneFilter || order.phone_number.includes(filterData.phoneFilter);
    const matchesAddress = !filterData.addressFilter || order.customer_address.toLowerCase().includes(filterData.addressFilter.toLowerCase());

    // Restaurant filter
    //const matchesRestaurant = !filterData.restaurantFilter || order.restaurant.toLowerCase() === filterData.restaurantFilter.toLowerCase();

    const matchesTotalPrice =
      order.total_amount >= filterData.priceRange[0] && order.total_amount <= filterData.priceRange[1];

    //const matchesCommission =
    //order.foodCommission >= filterData.commissionRange[0] && order.foodCommission <= filterData.commissionRange[1];

    // Date range filtering
    const orderDate = new Date(order.created_at);
    const startDate = filterData.startDateFilter ? new Date(filterData.startDateFilter) : null;
    const endDate = filterData.endDateFilter ? new Date(filterData.endDateFilter) : null;

    // Adjusting matchesDateRange to include the end date correctly
    const matchesDateRange =
      (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    const matchesStatus = !filterData.statusFilter || order.status.toLowerCase() === filterData.statusFilter.toLowerCase();

    return matchesSearchQuery && matchesOrderId && matchesName && matchesPhone && matchesAddress && matchesTotalPrice && matchesDateRange && matchesStatus;
  });
};


</script>
