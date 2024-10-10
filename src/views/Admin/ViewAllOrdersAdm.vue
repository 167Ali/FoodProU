<template>
    <div>
        <FilterAndSearch @filterApplied="applyFilter" />
        <Table :filteredOrders="filteredOrders" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterAndSearch from '../../components/Admin/ViewAllOrdersFilterSearch.vue';
import Table from '../../components/Admin/ViewAllOrdersTbl.vue';

// Sample orders data (can be more complex with 100+ orders)
const orders = ref([
    { id: 1, customerName: 'John Doe', restaurant: 'Restaurant A', date: '2024-10-01', status: 'In Progress', price: 30 },
    { id: 2, customerName: 'Jane Smith', restaurant: 'Restaurant B', date: '2024-09-28', status: 'Completed', price: 50 },
    { id: 3, customerName: 'Michael Brown', restaurant: 'Restaurant C', date: '2024-09-25', status: 'Cancelled', price: 20 },
    { id: 4, customerName: 'Sarah Green', restaurant: 'Restaurant A', date: '2024-10-05', status: 'In Progress', price: 40 },
    // Add more orders...
]);

const filteredOrders = ref([...orders.value]);

// Apply filter logic
// Apply filter logic
const applyFilter = (filterData) => {
    filteredOrders.value = orders.value.filter((order) => {
        const matchesStatus = filterData.selectedStatus === 'All' || order.status === filterData.selectedStatus;
        const matchesPrice = order.price >= filterData.priceRange[0] && order.price <= filterData.priceRange[1];
        const matchesStartDate = !filterData.startDate || new Date(order.date) >= new Date(filterData.startDate);
        const matchesEndDate = !filterData.endDate || new Date(order.date) <= new Date(filterData.endDate);
        const matchesRestaurant = !filterData.selectedRestaurant || order.restaurant === filterData.selectedRestaurant;
        const matchesSearchQuery = !filterData.searchQuery || order.customerName.toLowerCase().includes(filterData.searchQuery.toLowerCase()) || order.restaurant.toLowerCase().includes(filterData.searchQuery.toLowerCase());

        return matchesStatus && matchesPrice && matchesStartDate && matchesEndDate && matchesRestaurant && matchesSearchQuery;
    });
};
</script>
