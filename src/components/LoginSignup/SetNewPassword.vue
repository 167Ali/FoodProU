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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const newPassword = ref('');
const confirmPassword = ref('');

// Access the route to get token and email from URL
const route = useRoute();


const store = useStore();

// Computed properties to access Vuex store state
const loading = computed(() => store.getters['auth/isLoading']);
const successMessage = computed(() => store.getters['auth/successMessage']);
const errorMessage = computed(() => store.getters['auth/errorMessage']);

const handleSetPassword = async () => {
  // Clear previous messages
  store.commit('auth/CLEAR_MESSAGES');

  // Validate password fields
  if (newPassword.value !== confirmPassword.value) {
    // Commit error message to Vuex store
    store.commit('auth/SET_ERROR_MESSAGE', 'Passwords do not match. Please try again.');
    return;
  }

  // Prepare payload
  const payload = {
    token:  route.query.token,
    email:route.query.email ,
    password: newPassword.value,
    password_confirmation: confirmPassword.value,
  };
console.log(payload);

  try {
    // Dispatch Vuex action to set the new password
    await store.dispatch('auth/setPassword', payload);
    
    // Clear form fields on success
    newPassword.value = '';
    confirmPassword.value = '';
    
  } catch (error) {
    // Handle error
    console.error('Error resetting password:', error);
  }
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
  