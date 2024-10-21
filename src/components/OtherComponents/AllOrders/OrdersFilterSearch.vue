<template>
    <div>
        <!-- Search Bar -->
        <div class="d-flex justify-content-center mb-4">
            <div class="input-group" style="max-width: 600px; width: 100%;">
                <input type="text" class="form-control search-input" v-model="searchQuery" @input="handleSearch"
                    placeholder="Search orders..." />
                <button class="btn filter-btn" @click="openFilterModal">
                    <i class="fa-solid fa-filter"></i>
                </button>
            </div>
        </div>

        <!-- Filter Modal -->
        <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content rounded-4 shadow-lg">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterModalLabel">Filter Options</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="filter-section">
                            <!-- Order ID filter -->
                            <div class="mb-3">
                                <label class="form-label">Order ID</label>
                                <input type="text" class="form-control" v-model="orderIdFilter"
                                    placeholder="Filter by Order ID..." />
                            </div>

                              <!-- Status filter -->
                              <div class="mb-3">
                                <label class="form-label">Order Status</label>
                                <select class="form-select" v-model="statusFilter">
                                    <option value="">All</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                         <!-- Restaurant filter (Dropdown using prop) -->
                         <div class="mb-3">
                                <label class="form-label">Restaurant</label>
                                <select class="form-select" v-model="restaurantFilter">
                                    <option value="">Select a restaurant...</option>
                                    <option v-for="restaurant in restaurants" :key="restaurant" :value="restaurant">
                                        {{ restaurant }}
                                    </option>
                                </select>
                            </div>

                            <!-- Name filter -->
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" v-model="nameFilter"
                                    placeholder="Filter by name..." />
                            </div>

                            <!-- Phone filter -->
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="text" class="form-control" v-model="phoneFilter"
                                    placeholder="Filter by phone number..." />
                            </div>

                            <!-- Address filter -->
                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control" v-model="addressFilter"
                                    placeholder="Filter by address..." />
                            </div>

                           

                           <!-- Date filter -->
                           <div class="mb-3">
                                <label class="form-label">Order Date Range</label>
                                <div class="d-flex">
                                    <input type="date" class="form-control me-2" v-model="startDateFilter" />
                                    <input type="date" class="form-control" v-model="endDateFilter" />
                                </div>
                            </div>

                            <!-- Total Price Range filter -->
                            <div class="mb-3">
                                <label class="form-label">Total Price Range</label>
                                <div class="d-flex justify-content-between">
                                    <input type="number" class="form-control price-input" v-model="priceRange[0]"
                                        placeholder="Min" />
                                    <input type="number" class="form-control price-input" v-model="priceRange[1]"
                                        placeholder="Max" />
                                </div>
                            </div>

                            <!-- Food Commission Range filter -->
                            <div class="mb-3">
                                <label class="form-label">Food Commission Range</label>
                                <div class="d-flex justify-content-between">
                                    <input type="number" class="form-control price-input" v-model="commissionRange[0]"
                                        placeholder="Min" />
                                    <input type="number" class="form-control price-input" v-model="commissionRange[1]"
                                        placeholder="Max" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="clearFilter">Clear</button>
                        <button type="button" class="btn btn-primary" @click="applyFilter"
                            data-bs-dismiss="modal">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

// Accept restaurants as a prop
const props = defineProps({
    restaurants: {
        type: Array,
        required: true
    }
});

const searchQuery = ref('');
const orderIdFilter = ref('');
const nameFilter = ref('');
const phoneFilter = ref('');
const addressFilter = ref('');
const restaurantFilter = ref('');
const statusFilter = ref('');
const startDateFilter = ref('');
const endDateFilter = ref('');
const priceRange = ref([0, 1000000]);
const commissionRange = ref([0, 100]);
const emit = defineEmits(['filterApplied']);

const handleSearch = () => {
    applyFilter();
};

const applyFilter = () => {
    const filterData = {
        searchQuery: searchQuery.value,
        orderIdFilter: orderIdFilter.value,
        nameFilter: nameFilter.value,
        phoneFilter: phoneFilter.value,
        addressFilter: addressFilter.value,
        restaurantFilter: restaurantFilter.value,
        statusFilter: statusFilter.value,
        startDateFilter: startDateFilter.value,
        endDateFilter: endDateFilter.value,
        priceRange: priceRange.value,
        commissionRange: commissionRange.value,
    };
    emit('filterApplied', filterData);
};

const clearFilter = () => {
    // Clear all filters
    orderIdFilter.value = '';
    nameFilter.value = '';
    phoneFilter.value = '';
    addressFilter.value = '';
    restaurantFilter.value = '';
    statusFilter.value = '';
    dateFilter.value = '';
    priceRange.value = [0, 1000000];
    commissionRange.value = [0, 100];
};

// Method to open the filter modal
const openFilterModal = () => {
    const filterModal = new bootstrap.Modal(document.getElementById('filterModal'));
    filterModal.show();
};
</script>


<style scoped>
.input-group {
    width: 100%;
    margin-top: 10px;
}

.search-input {
    height: 50px;
    font-size: 1.1rem;
    border-radius: 10px;
    padding: 0 15px;
    border: 1px solid #ced4da;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.filter-btn {
    background-color: #00754A;
    color: white;
    border: none;
    border-radius: 0 25px 25px 0;
    padding: 10px 15px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.filter-btn:hover {
    background-color: #32eaa6;
    transform: translateY(-2px);
}

.modal-content {
    border-radius: 1rem;
    border: none;
}

.modal-header {
    border-bottom: 1px solid #dee2e6;
    background-color: #00754ac4;
}

.modal-title {
    font-size: 1.5rem;
    color: white;
}

.filter-section {
    padding: 15px;
    max-height: 300px;
    overflow-y: auto;
}

.price-input {
    width: 48%;
}

.form-label {
    font-weight: bold;
    color: #343a40;
}

.modal-footer {
    border-top: none;
}

@media (max-width: 768px) {
    .modal-dialog {
        max-width: 90%;
    }

    .search-input {
        font-size: 0.9rem;
    }

    .filter-btn {
        padding: 8px 12px;
    }

    .modal-title {
        font-size: 1.25rem;
    }

    .modal-body .row {
        display: flex;
        flex-direction: column;
    }

    .modal-body .col-6 {
        width: 100%;
    }
}
</style>
