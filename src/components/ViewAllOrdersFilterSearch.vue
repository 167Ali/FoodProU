<template>
    <div class="filter-search-container">
        <div class="d-flex w-100 mb-3">
            <input type="text" class="form-control me-2 flex-grow-1" v-model="searchQuery" @input="handleSearch"
                placeholder="Search..." style="height: 50px; font-size: 1.2rem;" />
            <button @click="toggleFilter" class="btn">
                <i class="fa-solid fa-filter fa-lg" style="color: #303640;"></i>
            </button>
        </div>

        <!-- Filter dropdown -->
        <div v-if="filterVisible" class="filter-dropdown p-3 border bg-light">
            <!-- Status filter -->
            <div class="mb-3">
                <label>Status:</label>
                <select class="form-select" v-model="selectedStatus">
                    <option value="All">All</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <!-- Price Range filter with input fields -->
            <div class="mb-3">
                <label>Price Range:</label>
                <div class="d-flex justify-content-between mb-2">
                    <input type="number" class="form-control text-center" v-model="priceRange[0]"
                        placeholder="Min Price" />
                    <input type="number" class="form-control text-center" v-model="priceRange[1]"
                        placeholder="Max Price" />
                </div>
            </div>

            <!-- Date filter -->
            <div class="mb-3">
                <label>Date Range:</label>
                <input type="date" v-model="startDate" class="form-control me-2" />
                <input type="date" v-model="endDate" class="form-control mt-2" />
            </div>

            <!-- Restaurant filter -->
            <div class="mb-3">
                <label>Restaurant:</label>
                <select v-model="selectedRestaurant" class="form-select">
                    <option value="">All</option>
                    <option v-for="restaurant in restaurantOptions" :key="restaurant" :value="restaurant">
                        {{ restaurant }}
                    </option>
                </select>
            </div>

            <!-- Action buttons -->
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger" @click="clearFilter">Clear Filter</button>
                <button class="btn btn-primary" @click="applyFilter">Apply Filter</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// Import necessary modules
import { ref, defineEmits } from 'vue';

// Declare data properties
const searchQuery = ref('');
const selectedStatus = ref('All');
const startDate = ref('');
const endDate = ref('');
const selectedRestaurant = ref('');
const filterVisible = ref(false);

// Price range input fields data
const priceRange = ref([0, 1000000]);  // Min price = 0, Max price = 1 Million

// Restaurant options for the filter
const restaurantOptions = ref(['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D']);

// Declare the emit function
const emit = defineEmits(['filterApplied']);

// Toggle visibility of filter dropdown
const handleSearch = () => {
    // Your search logic here
    applyFilter();
};
const toggleFilter = () => {
    filterVisible.value = !filterVisible.value;
};

// Emit the filter data to the parent
const applyFilter = () => {
    const filterData = {
        searchQuery: searchQuery.value,
        selectedStatus: selectedStatus.value,
        priceRange: priceRange.value,
        startDate: startDate.value,
        endDate: endDate.value,
        selectedRestaurant: selectedRestaurant.value,
    };

    // Emit the filter data to the parent
    emit('filterApplied', filterData);
};

// Clear all filter values
const clearFilter = () => {
    searchQuery.value = '';
    selectedStatus.value = 'All';
    priceRange.value = [0, 10000];  // Reset to default values
    startDate.value = '';
    endDate.value = '';
    selectedRestaurant.value = '';

    applyFilter();
};
</script>

<style scoped>
.filter-dropdown {
    max-width: 100%;
}

.form-control {
    max-width: 100%;
}
</style>
