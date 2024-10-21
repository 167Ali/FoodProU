<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    
    <!-- Header Section -->
    <BussinessNav/>
    
    <!-- Signup Info Section -->
    <section class="signup-info py-5">
      <div class="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div class="signup-info-text mb-4 mb-lg-0">
          <h1>foodpro Signup</h1>
          <p>
            Want access to corporate food delivery, dine-in, allowances and gift cards? You're in the right place!
          </p>
          <ul class="list-unstyled">
            <li class="mb-2">
              <i class="fas fa-file-alt text-success"></i>
              <span>Take 5 mins to fill out our form</span>
            </li>
            <li>
              <i class="fas fa-clock text-success"></i>
              <span>Get a response within 1-2 business days</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  
    <!-- Main Form Section -->
    <div class="form-page py-5 bg-light">
      <div class="container d-flex align-items-center justify-content-center">
        <div class="form-card row no-gutters">
          <!-- Left Side Image (50% width) -->
          <div class="col-lg-6 form-image bg-white">
            <img src="../../assets/form.gif" alt="Form Side Image" class="img-fluid" />
          </div>
  
          <!-- Right Side Form (50% width) -->
          <div class="col-lg-6 form-content">
            <div class="form-container p-4">
              <form @submit.prevent="submitForm">
                <!-- Personal Information -->
                <div v-if="currentPage === 1">
                  <h4>Personal Information</h4>
                  <div class="form-group mb-3">
                    <label for="first_name">First Name</label>
                    <input 
                      :class="{'is-invalid': errors.first_name}" 
                      type="text" v-model="form.first_name" class="form-control" id="first_name" placeholder="Enter your first name" required />
                    <div v-if="errors.first_name" class="invalid-feedback">First name is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="last_name">Last Name</label>
                    <input 
                      :class="{'is-invalid': errors.last_name}" 
                      type="text" v-model="form.last_name" class="form-control" id="last_name" placeholder="Enter your last name" required />
                    <div v-if="errors.last_name" class="invalid-feedback">Last name is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="email">Email</label>
                    <input 
                      :class="{'is-invalid': errors.email}" 
                      type="email" v-model="form.email" class="form-control" id="email" placeholder="Enter your email address" required />
                    <div v-if="errors.email" class="invalid-feedback">Email is required.</div>
                  </div>
                </div>
  
                <!-- Business Information -->
                <div v-if="currentPage === 2">
                  <h4>Business Information</h4>
                  <div class="form-group mb-3">
                    <label for="restaurant_name">Restaurant Name</label>
                    <input 
                      :class="{'is-invalid': errors.restaurant_name}" 
                      type="text" v-model="form.restaurant_name" class="form-control" id="restaurant_name" placeholder="Enter restaurant name" required />
                    <div v-if="errors.restaurant_name" class="invalid-feedback">Restaurant name is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="opening_time">Opening Time</label>
                    <input 
                      :class="{'is-invalid': errors.opening_time}" 
                      type="time" v-model="form.opening_time" class="form-control" id="opening_time" required />
                    <div v-if="errors.opening_time" class="invalid-feedback">Opening time is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="closing_time">Closing Time</label>
                    <input 
                      :class="{'is-invalid': errors.closing_time}" 
                      type="time" v-model="form.closing_time" class="form-control" id="closing_time" required />
                    <div v-if="errors.closing_time" class="invalid-feedback">Closing time is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="cuisine">Cuisine</label>
                    <select 
                      :class="{'is-invalid': errors.cuisine}" 
                      v-model="form.cuisine" class="form-control" id="cuisine" required>
                      <option disabled value="">Select Cuisine</option>
                      <option value="Chinese Cuisine">Chinese Cuisine</option>
                      <option value="Indian Cuisine">Indian Cuisine</option>
                      <!-- Add other options -->
                    </select>
                    <div v-if="errors.cuisine" class="invalid-feedback">Cuisine is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="logo_path">Logo</label>
                    <input type="file" @change="handleFileUpload" class="form-control" id="logo_path" />
                  </div>
                  <div class="form-group mb-3">
                    <label for="business_type">Business Type</label>
                    <select 
                      :class="{'is-invalid': errors.business_type}" 
                      v-model="form.business_type" class="form-control" id="business_type" required>
                      <option value="">Select business type</option>
                      <option value="home">Home Based Kitchen</option>
                      <option value="restaurant">Restaurant</option>
                    </select>
                    <div v-if="errors.business_type" class="invalid-feedback">Business type is required.</div>
                  </div>
                </div>
  
                <!-- Address Information -->
                <div v-if="currentPage === 3">
                  <h4>Address Information</h4>
                  <div class="form-group mb-3">
                    <label for="address">Address</label>
                    <input 
                      :class="{'is-invalid': errors.address}" 
                      type="text" v-model="form.address" class="form-control" id="address" placeholder="Enter address" required />
                    <div v-if="errors.address" class="invalid-feedback">Address is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="postal_code">Postal Code</label>
                    <input 
                      :class="{'is-invalid': errors.postal_code}" 
                      type="text" v-model="form.postal_code" class="form-control" id="postal_code" placeholder="Enter postal code" required />
                    <div v-if="errors.postal_code" class="invalid-feedback">Postal code is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="city">City</label>
                    <input 
                      :class="{'is-invalid': errors.city}" 
                      type="text" v-model="form.city" class="form-control" id="city" placeholder="Enter city" required />
                    <div v-if="errors.city" class="invalid-feedback">City is required.</div>
                  </div>
                </div>
  
                <!-- Bank Information -->
                <div v-if="currentPage === 4">
                  <h4>Bank Information</h4>
                  <div class="form-group mb-3">
                    <label for="cnic">CNIC</label>
                    <input 
                      :class="{'is-invalid': errors.cnic}" 
                      type="text" v-model="form.cnic" class="form-control" id="cnic" placeholder="Enter CNIC (13 digits)" required />
                    <div v-if="errors.cnic" class="invalid-feedback">CNIC must be 13 digits.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="bank_name">Bank Name</label>
                    <input 
                      :class="{'is-invalid': errors.bank_name}" 
                      type="text" v-model="form.bank_name" class="form-control" id="bank_name" placeholder="Enter bank name" required />
                    <div v-if="errors.bank_name" class="invalid-feedback">Bank name is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="iban">IBAN</label>
                    <input 
                      :class="{'is-invalid': errors.iban}" 
                      type="text" v-model="form.iban" class="form-control" id="iban" placeholder="Enter IBAN" required />
                    <div v-if="errors.iban" class="invalid-feedback">IBAN is required.</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="account_owner_title">Account Owner Title</label>
                    <input 
                      :class="{'is-invalid': errors.account_owner_title}" 
                      type="text" v-model="form.account_owner_title" class="form-control" id="account_owner_title" placeholder="Enter account owner title" required />
                    <div v-if="errors.account_owner_title" class="invalid-feedback">Account owner title is required.</div>
                  </div>
                </div>
  
                <!-- Navigation Buttons -->
                <div class="form-navigation d-flex justify-content-between mt-4">
                  <button type="button" class="btn btn-secondary" @click="prevPage" v-if="currentPage > 1">Previous</button>
                  <button type="button" class="btn next-btn" @click="nextPage" v-if="currentPage < totalPages">Next</button>
                  <button type="submit" class="btn btn-success" v-if="currentPage === totalPages">
                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Toast Notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div class="toast" :class="{'show': showToast}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{ toastType === 'success' ? 'Success' : 'Error' }}</strong>
          <button type="button" class="btn-close" @click="showToast = false"></button>
        </div>
        <div class="toast-body">{{ toastMessage }}</div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import BussinessNav from '@/components/LoginSignup/BussinessNav.vue';

// Current page and total pages
const currentPage = ref(1);
const totalPages = 4;
const loading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');

// Form data
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  restaurant_name: '',
  opening_time: '',
  closing_time: '',
  cuisine: '',
  logo_path: '',
  business_type: '',
  address: '',
  postal_code: '',
  city: '',
  cnic: '',
  bank_name: '',
  iban: '',
  account_owner_title: '',
});

// Validation errors
const errors = ref({});

// Move to next page after validation
const nextPage = () => {
  if (validateForm(currentPage.value)) {
    currentPage.value++;
  }
};

// Move to previous page
const prevPage = () => {
  currentPage.value--;
};

// Validate form fields based on the current page
const validateForm = (page) => {
  errors.value = {}; // Clear existing errors
  switch (page) {
    case 1:
      if (!form.value.first_name) errors.value.first_name = true;
      if (!form.value.last_name) errors.value.last_name = true;
      if (!form.value.email) errors.value.email = true;
      break;
    case 2:
      if (!form.value.restaurant_name) errors.value.restaurant_name = true;
      if (!form.value.opening_time) errors.value.opening_time = true;
      if (!form.value.closing_time) errors.value.closing_time = true;
      if (!form.value.cuisine) errors.value.cuisine = true;
      if (!form.value.business_type) errors.value.business_type = true;
      break;
    case 3:
      if (!form.value.address) errors.value.address = true;
      if (!form.value.postal_code) errors.value.postal_code = true;
      if (!form.value.city) errors.value.city = true;
      break;
    case 4:
      if (!form.value.cnic || form.value.cnic.length !== 13) errors.value.cnic = true;
      if (!form.value.bank_name) errors.value.bank_name = true;
      if (!form.value.iban) errors.value.iban = true;
      if (!form.value.account_owner_title) errors.value.account_owner_title = true;
      break;
    default:
      return false;
  }
  return Object.keys(errors.value).length === 0;
};

// Handle file upload for logo_path
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  form.value.logo_path = file;
};

// Submit the form data
const submitForm = async () => {
  if (!validateForm(currentPage.value)) return;

  loading.value = true;
  try {
    // Simulate a form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    loading.value = false;
    toastMessage.value = 'Form Submitted Successfully!';
    toastType.value = 'success';
    showToast.value = true;
  } catch (error) {
    loading.value = false;
    toastMessage.value = 'Error Submitting Form!';
    toastType.value = 'error';
    showToast.value = true;
  }
};
</script>

<style scoped>

.modal-title {
    text-align: center;
    flex-grow: 1;
    font-weight: bolder;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    width: 400px;
    text-align: center;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
}

.modal-header h5 {
    margin: 0;
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 1.5rem;
}

.modal-body {
    padding: 20px 0;
}

.separator {
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    line-height: 0.1em;
    margin: 10px 0;
}

.separator:before {
    content: 'or';
    background: white;
    padding: 0 10px;
}

.btn-google {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 1px solid #ccc;
    width: 100%;
    text-align: left;
    padding: 10px;
    border: 2px solid black;
}

.btn-login {
    background-color: #00754A;
    color: white;
    font-weight: bolder;
}

.btn-login:hover {
    background-color: #00925d;
    font-weight: bolder;
}

.modal-footer {
    font-size: 0.85rem;
}

.modal-footer a {
    color: #00754A;
    text-decoration: none;
}
.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.875em;
}

/* Toast styling */
.toast-container {
  z-index: 1050;
}

.toast {
  background-color: #28a745;
  color: white;
}

.toast.show {
  display: block;
}
@media (max-width: 768px) {
    .modal-content {
        padding: 15px;
    }
}

@media (max-width: 576px) {
    .modal-header {
        flex-direction: column;
    }

    .modal-header h5 {
        margin-bottom: 10px;
    }

    .modal-body {
        padding: 10px 0;
    }

    .separator {
        margin: 5px 0;
    }
}

</style>