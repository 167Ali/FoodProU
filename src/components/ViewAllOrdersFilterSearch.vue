<template>
    <div>
      <!-- Search Bar -->
      <div class="d-flex justify-content-center mb-4">
        <div class="input-group" style="max-width: 600px; width: 100%;">
         
          <input
            type="text"
            class="form-control search-input"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search orders..."
          />
          <button class="btn filter-btn" @click="openFilterModal">
            <i class="fa-solid fa-filter"></i>
          </button>
        </div>
      </div>
  
      <!-- Filter Modal -->
      <div
        class="modal fade"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 shadow-lg">
            <div class="modal-header">
              <h5 class="modal-title" id="filterModalLabel">Filter Options</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="filter-section">
                <!-- Status filter -->
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <select class="form-select" v-model="selectedStatus">
                    <option value="All">All</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
  
                <!-- Price Range filter -->
                <div class="mb-3">
                  <label class="form-label">Price Range</label>
                  <div class="d-flex justify-content-between">
                    <input
                      type="number"
                      class="form-control price-input"
                      v-model="priceRange[0]"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      class="form-control price-input"
                      v-model="priceRange[1]"
                      placeholder="Max"
                    />
                  </div>
                </div>
  
                <!-- Date Range filter -->
                <div class="mb-3">
                  <label class="form-label">Date Range</label>
                  <div class="row">
                    <div class="col-6 mb-2 mb-sm-0">
                      <input type="date" v-model="startDate" class="form-control" />
                    </div>
                    <div class="col-6">
                      <input type="date" v-model="endDate" class="form-control" />
                    </div>
                  </div>
                </div>
  
                <!-- Restaurant filter -->
                <div class="mb-3">
                  <label class="form-label">Restaurant</label>
                  <select v-model="selectedRestaurant" class="form-select">
                    <option value="">All</option>
                    <option v-for="restaurant in restaurantOptions" :key="restaurant" :value="restaurant">
                      {{ restaurant }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="clearFilter">Clear</button>
              <button type="button" class="btn btn-primary" @click="applyFilter" data-bs-dismiss="modal">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const searchQuery = ref('');
  const selectedStatus = ref('All');
  const startDate = ref('');
  const endDate = ref('');
  const selectedRestaurant = ref('');
  const priceRange = ref([0, 1000000]);
  const restaurantOptions = ref(['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D']);
  const emit = defineEmits(['filterApplied']);
  
  const handleSearch = () => {
    applyFilter();
  };
  
  const applyFilter = () => {
    const filterData = {
      searchQuery: searchQuery.value,
      selectedStatus: selectedStatus.value,
      priceRange: priceRange.value,
      startDate: startDate.value,
      endDate: endDate.value,
      selectedRestaurant: selectedRestaurant.value,
    };
  
    emit('filterApplied', filterData);
  };
  
  const clearFilter = () => {
    searchQuery.value = '';
    selectedStatus.value = 'All';
    priceRange.value = [0, 1000000];
    startDate.value = '';
    endDate.value = '';
    selectedRestaurant.value = '';
    applyFilter();
  };
  
  const openFilterModal = () => {
    const filterModal = new bootstrap.Modal(document.getElementById('filterModal'));
    filterModal.show();
  };
  </script>
  
  <style scoped>
  /* Enhanced Search Bar Styles */
  .input-group {
    width: 100%;
    margin-top: 10px;
  }
  
  .search-input {
    height: 50px;
    font-size: 1.1rem;
    border-radius: 10px; /* Rounded edges */
    padding: 0 15px;
    border: 1px solid #ced4da;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Softer shadow */
    transition: all 0.3s ease; /* Smooth transition */
 
  }
  

  
  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Glow effect on focus */
  }
  
  /* Enhanced Filter Button */
  .filter-btn {
    background-color: #00754A;
    color: white;
    border: none;
    border-radius: 0 25px 25px 0; /* Rounded edges */
    padding: 10px 15px;
    transition: background-color 0.3s ease, transform 0.2s ease; /* Animation */
  }
  
  .filter-btn:hover {
    background-color: #32eaa6;
    transform: translateY(-2px); /* Slight lift on hover */
  }
  
  /* Enhanced Modal Styles */
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
  
  /* Filter Section */
  .filter-section {
    padding: 15px;
  }
  
  /* Price Input */
  .price-input {
    width: 48%;
  }
  
  /* Form Label Styles */
  .form-label {
    font-weight: bold;
    color: #343a40;
  }
  
  /* Enhanced Modal Footer */
  .modal-footer {
    border-top: none;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .modal-dialog {
      max-width: 90%; /* Adjust for smaller screens */
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
  
    /* Stack date inputs on small screens */
    .modal-body .row {
      display: flex;
      flex-direction: column;
    }
  
    .modal-body .col-6 {
      width: 100%; /* Ensure full width on small screens */
    }
  }
  </style>
  