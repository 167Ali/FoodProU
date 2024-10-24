<template>
    <div class="container col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
      <div class="row w-100 shadow-lg p-4 rounded">
        <!-- GIF Section -->
        <div class="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <img src="@/assets/setpassword.gif" alt="Set Password GIF" class="img-fluid" style="max-width: 80%;" />
        </div>
  
        <!-- Form Section -->
        <div class="col-md-5 d-flex flex-column justify-content-center p-4">
          <h3 class="mb-4 text-primary-custom">Set New Password</h3>
          <form @submit.prevent="handleSetPassword">
            <div class="mb-3">
              <label for="new-password" class="form-label text-secondary-custom">New Password</label>
              <input
                type="password"
                id="new-password"
                class="form-control shadow-sm"
                v-model="newPassword"
                placeholder="Enter new password"
                required
              />
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="form-label text-secondary-custom">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                class="form-control shadow-sm"
                v-model="confirmPassword"
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary-custom w-100 shadow-sm" :disabled="loading">
              {{ loading ? 'Processing...' : 'Set Password' }}
            </button>
            <a href="#" class="text-muted mt-3 d-block text-center">Back to Sign In</a>
            <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const handleSetPassword = async () => {
    loading.value = true;
    successMessage.value = '';
    errorMessage.value = '';
  
    // Validate password fields
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match. Please try again.';
      loading.value = false;
      return;
    }
  
    // Simulate an API call for setting the new password
    setTimeout(() => {
      successMessage.value = 'Your password has been successfully set.';
      loading.value = false;
    }, 2000);
  };
  </script>
  
  <style scoped>
  .container {
    min-height: 100vh;
    background-color: white;
  }
  
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  
  h3 {
    font-weight: bold;
  }
  
  .text-primary-custom {
    color: #00754A; /* Theme color for heading */
  }
  
  .text-secondary-custom {
    color: #555; /* Softer color for labels */
  }
  
  .btn-primary-custom {
    background-color: #00754A; /* Main theme color */
    border: none;
    color: #fff;
    transition: background-color 0.3s;
  }
  
  .btn-primary-custom:hover {
    background-color: #00563b; /* Slightly darker shade for hover effect */
  }
  
  .shadow-sm {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  .alert-success,
  .alert-danger {
    background-color: #e8f5e9;
    color: #00754A;
    border: none;
  }
  
  .bg-light {
    background-color: #f8f9fa !important;
  }
  
  .rounded {
    border-radius: 12px;
  }
  </style>