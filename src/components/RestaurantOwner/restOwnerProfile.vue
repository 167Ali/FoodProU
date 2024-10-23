<template>
  <SideBar />
  <div class="profile-update-container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h3 class="card-title text-center mb-4">Update Your Profile</h3>
        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-success submit-btn hover-effect" @click="goToChangePassword">Change Password</button>
        </div> <br>

        <div class="row">
          <!-- Personal Details Card -->
          <div class="col-md-6 mb-4">
            <div class="card profile-update-card shadow-lg fade-in">
              <div class="card-body">
                <h5 class="section-title">Personal Details</h5>
                <div class="form-group mb-3">
                  <label for="firstName">First Name</label>
                  <div class="input-group">
                    <span class="input-group-text text-success"><i class="bi bi-person-fill"></i></span>
                    <input type="text" v-model="ownerDetails.first_name" class="form-control" id="firstName"
                      placeholder="Enter first name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="lastName">Last Name</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-person-fill"></i></span>
                    <input type="text" v-model="ownerDetails.last_name" class="form-control" id="lastName"
                      placeholder="Enter last name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="phoneNumber">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text text-info"><i class="bi bi-telephone-fill"></i></span>
                    <input type="tel" v-model="restaurantDetails.phoneNumber" class="form-control" id="phoneNumber"
                      placeholder="Enter phone number" required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bank Details Card -->
          <div class="col-md-6 mb-4">
            <div class="card profile-update-card shadow-lg fade-in">
              <div class="card-body">
                <h5 class="section-title">Bank Details</h5>
                <div class="form-group mb-3">
                  <label for="bankName">Bank Name</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-bank"></i></span>
                    <input type="text" v-model="restaurantDetails.bank_name" class="form-control" id="bankName"
                      placeholder="Enter bank name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="iban">IBAN</label>
                  <div class="input-group">
                    <span class="input-group-text text-primary"><i class="bi bi-credit-card-fill"></i></span>
                    <input type="text" v-model="restaurantDetails.iban" class="form-control" id="iban"
                      placeholder="Enter IBAN" pattern="^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="accountTitle">Account Title</label>
                  <div class="input-group">
                    <span class="input-group-text text-danger"><i class="bi bi-wallet"></i></span>
                    <input v-model="restaurantDetails.account_owner_title" type="text" class="form-control"
                      id="accountTitle" placeholder="Enter Account Title" required>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Restaurant Details Card -->
          <div class="col-md-6 mb-4">
            <div class="card profile-update-card shadow-lg fade-in">
              <div class="card-body">
                <h5 class="section-title">Restaurant Details</h5>
                <div class="form-group mb-3">
                  <label for="restaurantName">Restaurant Name</label>
                  <div class="input-group">
                    <span class="input-group-text text-success"><i class="bi bi-shop"></i></span>
                    <input type="text" v-model="restaurantDetails.restaurant_name" class="form-control"
                      id="restaurantName" placeholder="Enter restaurant name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="address">Address</label>
                  <div class="input-group">
                    <span class="input-group-text text-info"><i class="bi bi-geo-alt-fill"></i></span>
                    <input type="text" v-model="restaurantDetails.address" class="form-control" id="address"
                      placeholder="Enter address" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="postalCode">Postal Code</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-envelope"></i></span>
                    <input type="text" v-model="restaurantDetails.postal_code" class="form-control" id="postalCode"
                      placeholder="Enter postal code" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="city">City</label>
                  <div class="input-group">
                    <span class="input-group-text text-danger"><i class="bi bi-building"></i></span>
                    <input type="text" v-model="restaurantDetails.city" class="form-control" id="city"
                      placeholder="Enter city" required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Restaurant Timing Details Card -->
          <div class="col-md-6 mb-4">
            <div class="card profile-update-card shadow-lg fade-in">
              <div class="card-body">
                <h5 class="section-title">Restaurant Timing Details</h5>
                <div class="form-group mb-3">
                  <label for="openingTime">Opening Time</label>
                  <div class="input-group">
                    <span class="input-group-text text-success"><i class="bi bi-clock-fill"></i></span>
                    <input type="time" v-model="restaurantDetails.opening_time" class="form-control" id="openingTime"
                      required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="closingTime">Closing Time</label>
                  <div class="input-group">
                    <span class="input-group-text text-danger"><i class="bi bi-clock-fill"></i></span>
                    <input type="time" v-model="restaurantDetails.closing_time" class="form-control" id="closingTime"
                      required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="cuisineType">Cuisine Type</label>
                  <div class="input-group">
                    <span class="input-group-text text-info"><i class="bi bi-egg-fried"></i></span>
                    <input type="text" v-model="restaurantDetails.cuisine" class="form-control" id="cuisineType"
                      placeholder="Enter cuisine type" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="businessType">Business Type</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-briefcase-fill"></i></span>
                    <input v-model="restaurantDetails.business_type" type="text" class="form-control" id="businessType"
                      placeholder="Enter Business Type" required>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary w-100 rounded-pill submit-btn hover-effect"
            @click.prevent="updateDetails">Update Details</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Import useStore to access Vuex store
import { restaurantApi } from '@/Services/restaurantOwner/restaurantOwnerProfService'; // Import the restaurant service
import SideBar from '@/components/RestaurantOwner/RestaurantDashboard/SideBar.vue';

const router = useRouter();
const store = useStore(); // Access Vuex store

// Reactive state for owner and restaurant details
const ownerDetails = ref({
  first_name: '',
  last_name: '',
  phoneNumber: ''
});

const restaurantDetails = ref({
  restaurant_name: '',
  address: '',
  postal_code: '',
  city: '',
  opening_time: '',
  closing_time: '',
  cuisine: '',
  business_type: ''
});

// Fetch owner's details on mount
// Fetch owner's details on mount
onMounted(async () => {
  try {
    const response = await restaurantApi.fetchOwnerDetails(); // Call the service method to fetch data
    if (response && response.data) {
      // Adjust this to access the correct fields in the API response
      ownerDetails.value.first_name = response.data.first_name;
      ownerDetails.value.last_name = response.data.last_name;
      ownerDetails.value.phoneNumber = response.data.phoneNumber; // Assuming this field exists in your API response

      restaurantDetails.value.restaurant_name = response.data.restaurant_name;
      restaurantDetails.value.address = response.data.address;
      restaurantDetails.value.postal_code = response.data.postal_code;
      restaurantDetails.value.city = response.data.city;
      restaurantDetails.value.opening_time = response.data.opening_time;
      restaurantDetails.value.closing_time = response.data.closing_time;
      restaurantDetails.value.cuisine = response.data.cuisine;
      restaurantDetails.value.business_type = response.data.business_type;
      restaurantDetails.value.bank_name = response.data.bank_name;
      restaurantDetails.value.iban = response.data.iban;
      restaurantDetails.value.account_owner_title = response.data.account_owner_title;
    }
  } catch (error) {
    console.error("Failed to fetch owner details", error);
    // Optionally show an alert or toast message
  }
});


// Function to update details
const updateDetails = async () => {
  try {
    const response = await restaurantApi.updateOwnerDetails({
      owner: ownerDetails.value,
      restaurant: restaurantDetails.value
    });

    if (response.success) {
      alert("Profile updated successfully!");
      router.push('/some-route'); // Navigate to another route if needed
    }
  } catch (error) {
    console.error("Failed to update owner details", error);
    // Optionally show an alert or toast message
  }
};

// Function to navigate to the change password page
const goToChangePassword = () => {
  router.push('/change-password');
};
</script>

<style scoped>
/* Add your styles here */
.profile-update-container {
  max-width: 1200px;
  margin: auto;
}

.profile-update-card {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
}

.submit-btn {
  background-color: #00754A;
  color: white;
}

.hover-effect:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
