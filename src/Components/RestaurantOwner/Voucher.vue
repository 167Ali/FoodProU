<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <SideBar class="sidebar" />
      
      <!-- Main Content -->
      <div class="container mt-5">
        <h2 class="text-center mb-4">Voucher Management</h2>
        
        <!-- Form Section -->
        <form @submit.prevent="addVoucher" class="mb-4">
          <div class="row g-3">
            <div class="col-md-4 col-sm-12">
              <input type="text" v-model="voucher.code" class="form-control" placeholder="Voucher Code" required />
            </div>
            <div class="col-md-4 col-sm-12">
              <input type="number" v-model="voucher.discount" class="form-control" placeholder="Discount (%)" required min="0" />
            </div>
            <div class="col-md-4 col-sm-12">
              <button type="submit" class="btn btn-success w-100">Add Voucher</button>
            </div>
          </div>
        </form>
  
        <!-- Table Section -->
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>Code</th>
              <th>Discount (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(voucher, index) in vouchers" :key="index">
              <td>{{ voucher.code }}</td>
              <td>{{ voucher.discount }}</td>
              <td>
                <button @click="editVoucher(index)" class="btn btn-warning btn-sm me-2">Edit</button>
                <button @click="deleteVoucher(index)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import SideBar from './RestaurantDashboard/SideBar.vue'; // Ensure the path to the SideBar component is correct

// State variables
const voucher = ref({ code: '', discount: '' });
const vouchers = ref([]);

// Add a new voucher
const addVoucher = () => {
    if (voucher.value.code && voucher.value.discount) {
        vouchers.value.push({ ...voucher.value });
        resetVoucher();
    }
};

// Edit an existing voucher
const editVoucher = (index) => {
    voucher.value = { ...vouchers.value[index] };
    vouchers.value.splice(index, 1);
};

// Delete a voucher
const deleteVoucher = (index) => {
    vouchers.value.splice(index, 1);
};

// Reset the voucher form
const resetVoucher = () => {
    voucher.value = { code: '', discount: '' };
};
</script>
<style scoped>
/* Sidebar styles */
.sidebar {
  width: 90px; /* Adjusted width for more spacing */
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #f1f3f5;
  padding: 20px;
  box-sizing: border-box;
}

/* Main container */
.container {
  max-width: 900px;
  margin-left: 100px; /* Adjust for sidebar space */
}

/* Form row layout */
.form-row {
  display: flex;
  justify-content: space-between;
}

/* Table customization */
.table {
  margin-top: 20px;
  border-radius: 0.5rem;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-striped tbody tr:hover {
  background-color: #eaeaea;
}

.table th, .table td {
  text-align: center;
}

/* Button hover effects */
.btn {
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-success {
  background-color: #28a745;
}

.btn-warning {
  background-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
}
</style>
  