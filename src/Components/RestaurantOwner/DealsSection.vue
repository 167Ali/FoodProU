<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <SideBar class="sidebar" />
  
      <!-- Main Content -->
      <div class="container mt-5">
        <h2 class="text-center mb-4">Deals Management</h2>
  
        <!-- Form Section -->
        <form @submit.prevent="addDeal" class="mb-4">
          <div class="row g-3">
            <div class="col-12 col-md-4">
              <input
                type="text"
                v-model="deal.title"
                class="form-control"
                placeholder="Deal Title"
                required
              />
            </div>
            <div class="col-12 col-md-4">
              <input
                type="number"
                v-model="deal.discount"
                class="form-control"
                placeholder="Discount (%)"
                required
                min="1"
                max="100"
              />
            </div>
            <div class="col-12 col-md-4">
              <input
                type="text"
                v-model="deal.validity"
                @blur="validateDate"
                class="form-control"
                placeholder="Validity Date (YYYY-MM-DD)"
                required
              />
              <div v-if="invalidDate" class="text-danger">Invalid date format. Use YYYY-MM-DD.</div>
            </div>
          </div>
  
          <div class="row g-3 mt-3">
            <div class="col-12">
              <textarea
                v-model="deal.description"
                class="form-control"
                rows="3"
                placeholder="Deal Description"
                required
              ></textarea>
            </div>
            <div class="col-12 col-md-4 mt-3">
              <button
                type="submit"
                class="btn btn-success w-100"
                :disabled="invalidDate"
              >
                Add Deal
              </button>
            </div>
          </div>
        </form>
  
        <!-- Table Section -->
        <table class="table table-striped table-hover mt-4">
          <thead class="table-dark">
            <tr>
              <th>Title</th>
              <th>Discount (%)</th>
              <th>Validity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(deal, index) in deals" :key="index">
              <td>{{ deal.title }}</td>
              <td>{{ deal.discount }}</td>
              <td>{{ deal.validity }}</td>
              <td>{{ deal.description }}</td>
              <td>
                <button @click="editDeal(index)" class="btn btn-warning btn-sm me-2">Edit</button>
                <button @click="deleteDeal(index)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import SideBar from './RestaurantDashboard/SideBar.vue'; // Adjust this path to where your sidebar component is located

// State variables
const deal = ref({ title: '', discount: '', validity: '', description: '' });
const deals = ref([]);
const invalidDate = ref(false);

// Add a new deal
const addDeal = () => {
  if (isDealValid()) {
    deals.value.push({ ...deal.value });
    resetDeal();
  }
};

// Edit an existing deal
const editDeal = (index) => {
  deal.value = { ...deals.value[index] };
  deals.value.splice(index, 1);
};

// Delete a deal
const deleteDeal = (index) => {
  deals.value.splice(index, 1);
};

// Validate the date format
const validateDate = () => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  invalidDate.value = !dateRegex.test(deal.value.validity) || !isValidDate(deal.value.validity);
};

// Check if a date is valid
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Reset the deal form
const resetDeal = () => {
  deal.value = { title: '', discount: '', validity: '', description: '' };
  invalidDate.value = false;
};

// Check if the deal input is valid
const isDealValid = () => {
  return deal.value.title && deal.value.discount && deal.value.validity && deal.value.description && !invalidDate.value;
};
</script>
<style scoped>
/* Sidebar styles */
.sidebar {
  width: 90px; /* Adjusted width for sidebar */
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
}

/* Main content styles */
.container {
  max-width: 1000px;
  margin-left: 110px; /* Adjust for the sidebar */
}

h2 {
  color: #00754a;
}

/* Form row layout */
.form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Table customization */
.table {
  margin-top: 20px;
}

.table th,
.table td {
  text-align: center;
}

/* Button hover effects */
.btn {
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

/* Error message styling */
.text-danger {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .container {
    margin-left: 0;
    padding: 10px;
  }
}
</style>
  