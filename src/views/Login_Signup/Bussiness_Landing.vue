<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <div class="form-page d-flex">
    <!-- Left Image Section -->
    <div class="background-image"></div>

    <!-- Right Form Section -->
    <div class="form-container d-flex align-items-center justify-content-center">
      <div class="form-card">
        <h2 class="mb-4 text-center heading">Business Registration</h2>
        <form @submit.prevent="submitForm">
          <!-- Page 1: Personal Information -->
          <div v-if="currentPage === 1">
            <h4>Personal Information</h4>
            <div class="form-group mb-3 input-icon">
              <label for="first_name">First Name</label>
              <i class="fas fa-user text-primary"></i>
              <input type="text" v-model="form.first_name" class="form-control" id="first_name" placeholder="Enter your first name" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="last_name">Last Name</label>
              <i class="fas fa-user text-primary"></i>
              <input type="text" v-model="form.last_name" class="form-control" id="last_name" placeholder="Enter your last name" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="email">Email</label>
              <i class="fas fa-envelope text-danger"></i>
              <input type="email" v-model="form.email" class="form-control" id="email" placeholder="Enter your email address" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="password">Password</label>
              <i class="fas fa-lock text-warning"></i>
              <input type="password" v-model="form.password" class="form-control" id="password" placeholder="Create a password" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="password_confirmation">Confirm Password</label>
              <i class="fas fa-lock text-warning"></i>
              <input type="password" v-model="form.password_confirmation" class="form-control" id="password_confirmation" placeholder="Confirm your password" required />
            </div>
          </div>

          <!-- Page 2: Branch Information -->
          <div v-if="currentPage === 2">
            <h4>Branch Information</h4>
            <div class="form-group mb-3 input-icon">
              <label for="address">Address</label>
              <i class="fas fa-map-marker-alt text-danger"></i>
              <input type="text" v-model="form.address" class="form-control" id="address" placeholder="Enter the branch address" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="postal_code">Postal Code</label>
              <i class="fas fa-mail-bulk text-primary"></i>
              <input type="text" v-model="form.postal_code" class="form-control" id="postal_code" placeholder="Enter postal code" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="city">City</label>
              <i class="fas fa-city text-success"></i>
              <input type="text" v-model="form.city" class="form-control" id="city" placeholder="Enter city name" required />
            </div>
          </div>

          <!-- Page 3: Business Information -->
          <div v-if="currentPage === 3">
            <h4>Business Information</h4>
            <div class="form-group mb-3 input-icon">
              <label for="opening_time">Opening Time</label>
              <i class="fas fa-clock text-primary"></i>
              <input type="time" v-model="form.opening_time" class="form-control" id="opening_time" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="closing_time">Closing Time</label>
              <i class="fas fa-clock text-primary"></i>
              <input type="time" v-model="form.closing_time" class="form-control" id="closing_time" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="cuisine">Cuisine</label>
              <i class="fas fa-utensils text-success"></i>
              <select v-model="form.cuisine" class="form-control" id="cuisine" required>
                <option disabled value="">Select Cuisine</option>
                <option value="Chinese Cuisine">Chinese Cuisine</option>
                <option value="Indian Cuisine">Indian Cuisine</option>
                <option value="Italian Cuisine">Italian Cuisine</option>
                <option value="Middle Eastern Cuisine">Middle Eastern Cuisine</option>
                <option value="Turkish Cuisine">Turkish Cuisine</option>
                <option value="Thai Cuisine">Thai Cuisine</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Mexican Cuisine">Mexican Cuisine</option>
                <option value="American Cuisine">American Cuisine</option>
                <option value="Continental Cuisine">Continental Cuisine</option>
              </select>
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="logo">Logo</label>
              <i class="fas fa-image text-danger"></i>
              <input type="file" @change="handleFileUpload" class="form-control" id="logo" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="business_type">Business Type</label>
              <i class="fas fa-briefcase text-warning"></i>
              <select v-model="form.business_type" class="form-control" id="business_type" required>
                <option value="home">Home Based Kitchen</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
          </div>

          <!-- Page 4: Bank Information -->
          <div v-if="currentPage === 4">
            <h4>Bank Information</h4>
            <div class="form-group mb-3 input-icon">
              <label for="cnic">CNIC</label>
              <i class="fas fa-id-card text-info"></i>
              <input type="text" v-model="form.cnic" class="form-control" id="cnic" placeholder="Enter your CNIC number" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="bank_name">Bank Name</label>
              <i class="fas fa-university text-success"></i>
              <input type="text" v-model="form.bank_name" class="form-control" id="bank_name" placeholder="Enter your bank name" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="iban">IBAN</label>
              <i class="fas fa-money-check text-warning"></i>
              <input type="text" v-model="form.iban" class="form-control" id="iban" placeholder="Enter your IBAN" required />
            </div>
            <div class="form-group mb-3 input-icon">
              <label for="account_owner_title">Account Owner Title</label>
              <i class="fas fa-user-tie text-primary"></i>
              <input type="text" v-model="form.account_owner_title" class="form-control" id="account_owner_title" placeholder="Enter account owner title" required />
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="d-flex justify-content-between mt-4">
            <button type="button" class="btn btn-secondary" @click="prevPage" v-if="currentPage > 1">
              Previous
            </button>
            <button type="button" class="btn next-btn" @click="nextPage" v-if="currentPage < totalPages">
              Next
            </button>
            <button type="submit" class="btn btn-success" v-if="currentPage === totalPages">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ref
} from "vue";

export default {
  setup() {
      const currentPage = ref(1);
      const totalPages = 4;
      const form = ref({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          no_of_branches: "",
          address: "",
          postal_code: "",
          city: "",
          opening_time: "",
          closing_time: "",
          cuisine: "",
          logo: null,
          business_type: "",
          cnic: "",
          bank_name: "",
          iban: "",
          account_owner_title: "",
      });

      // Validate only fields relevant to the current page
      const nextPage = () => {
          if (validatePage()) {
              currentPage.value++;
          } else {
              alert("Please fill all the required fields.");
          }
      };

      const prevPage = () => {
          currentPage.value--;
      };

      const validatePage = () => {
          switch (currentPage.value) {
              case 1:
                  return (
                      form.value.first_name &&
                      form.value.last_name &&
                      form.value.email &&
                      form.value.password &&
                      form.value.password_confirmation
                  );
              case 2:
                  return (
                      form.value.no_of_branches &&
                      form.value.address &&
                      form.value.postal_code &&
                      form.value.city
                  );
              case 3:
                  return (
                      form.value.opening_time &&
                      form.value.closing_time &&
                      form.value.cuisine &&
                      form.value.logo &&
                      form.value.business_type
                  );
              case 4:
                  return (
                      form.value.cnic &&
                      form.value.bank_name &&
                      form.value.iban &&
                      form.value.account_owner_title
                  );
              default:
                  return false;
          }
      };

      const handleFileUpload = (event) => {
          const file = event.target.files[0];
          form.value.logo = file;
      };

      const submitForm = () => {
          console.log("Form data:", form.value);
          alert("Form Submitted!");
      };

      return {
          currentPage,
          totalPages,
          form,
          nextPage,
          prevPage,
          handleFileUpload,
          submitForm,
      };
  },
};
</script>

<style scoped>
.heading {
  color: #00754A;
}

.form-page {
  display: flex;
  height: 100vh;
}

.background-image {
  background: url('../assets/chef.gif') no-repeat center center;
  background-size: cover;
  width: 50%;
  background-color: #e6ebe7;
}

.form-container {

  width: 50%;
  background-color:#eff5f3;
}

.form-card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}

.form-group label {
  font-weight: bold;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.6rem;
  font-size: 0.9rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;

}

.next-btn {
  background-color: #00754A;
  color: white;
}

.next-btn:hover {
  background-color: #00a166;
  color: white;
}
.input-icon {
position: relative;
margin-bottom: 1.5rem; /* Spacing between input fields */
}

.input-icon i {
position: absolute;
left: 15px; /* Space from the left edge */
top: 70%;
transform: translateY(-50%); /* Center the icon vertically */
font-size: 1.2rem; /* Icon size */
color: #007bff; /* Icon color */
}

.input-icon input,
.input-icon select {
padding-left: 45px; /* Padding to make space for the icon */
border-radius: 0.25rem; /* Rounded corners */
border: 1px solid #ced4da; /* Border color */
transition: border-color 0.3s; /* Smooth border color transition */
}

.input-icon input:focus,
.input-icon select:focus {
border-color: #80bdff; /* Border color on focus */
outline: none; /* Remove default outline */
box-shadow: 0 0 0.2rem rgba(0,123,255,.25); /* Focus shadow effect */
}

label {
margin-bottom: 0.5rem; /* Space between label and input */
font-weight: 600; /* Bold labels */
color: #333; /* Label color */
}

/* Responsive Design */
@media (max-width: 768px) {
  .background-image {
      display: none;
  }

  .form-container {
      width: 100%;
  }

  .form-card {
      margin: 2rem auto;
      max-width: 90%;
  }
}

@media (max-width: 576px) {
  .form-card {
      padding: 1rem;
  }

  h2 {
      font-size: 1.5rem;
  }

  .btn {
      font-size: 0.8rem;
  }
}
</style>



