<template>
  <div class="container col-lg-8 d-flex justify-content-center align-items-center min-vh-100 ">
    <div class="row w-100 shadow-lg p-4 rounded">
      <!-- GIF Section -->
      <div class="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
        <img src="@/assets/setpassword.gif" alt="Forgot Password GIF" class="img-fluid" style="max-width: 80%;" />
      </div>

      <!-- Form Section -->
      <div class="col-md-5 d-flex flex-column justify-content-center p-4">
        <h3 class="mb-4 text-primary-custom">Forgot Your Password?</h3>
        <form @submit.prevent="handleForgotPassword">
          <div class="mb-3">
            <label for="email" class="form-label text-secondary-custom">Email Address</label>
            <input
              type="email"
              id="email"
              class="form-control shadow-sm"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary-custom w-100 shadow-sm" :disabled="loading">
            {{ loading ? 'Sending...' : 'Reset Password' }}
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
import { useStore } from 'vuex';

const email = ref('');
const store = useStore();

// Access the Vuex store's state using computed properties
const loading = computed(() => store.getters['auth/isLoading']);
const successMessage = computed(() => store.getters['auth/successMessage']);
const errorMessage = computed(() => store.getters['auth/errorMessage']);

const handleForgotPassword = async () => {
  await store.dispatch('auth/forgotPassword', email.value);
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: white; /* Light green background to complement the main theme */
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
