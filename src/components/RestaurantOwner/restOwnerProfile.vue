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
                    <input type="text" v-model="ownerDetails.firstName" class="form-control" id="firstName"
                      placeholder="Enter first name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="lastName">Last Name</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-person-fill"></i></span>
                    <input type="text" v-model="ownerDetails.lastName" class="form-control" id="lastName"
                      placeholder="Enter last name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="phoneNumber">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text text-info"><i class="bi bi-telephone-fill"></i></span>
                    <input type="tel" v-model="ownerDetails.phoneNumber" class="form-control" id="phoneNumber"
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
                    <input type="text" v-model="ownerDetails.bankName" class="form-control" id="bankName"
                      placeholder="Enter bank name" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="iban">IBAN</label>
                  <div class="input-group">
                    <span class="input-group-text text-primary"><i class="bi bi-credit-card-fill"></i></span>
                    <input type="text" v-model="ownerDetails.iban" class="form-control" id="iban"
                      placeholder="Enter IBAN" pattern="^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="accountType">Account Type</label>
                  <div class="input-group">
                    <span class="input-group-text text-danger"><i class="bi bi-wallet"></i></span>
                    <select v-model="ownerDetails.accountType" class="form-control" id="accountType" required>
                      <option disabled value="">Select Account Type</option>
                      <option value="current">Current</option>
                      <option value="saving">Saving</option>
                    </select>
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
                    <input type="text" v-model="restaurantDetails.restaurantName" class="form-control"
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
                    <input type="text" v-model="restaurantDetails.postalCode" class="form-control" id="postalCode"
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
                    <input type="time" v-model="restaurantDetails.openingTime" class="form-control" id="openingTime"
                      required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="closingTime">Closing Time</label>
                  <div class="input-group">
                    <span class="input-group-text text-danger"><i class="bi bi-clock-fill"></i></span>
                    <input type="time" v-model="restaurantDetails.closingTime" class="form-control" id="closingTime"
                      required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="cuisineType">Cuisine Type</label>
                  <div class="input-group">
                    <span class="input-group-text text-info"><i class="bi bi-egg-fried"></i></span>
                    <input type="text" v-model="restaurantDetails.cuisineType" class="form-control" id="cuisineType"
                      placeholder="Enter cuisine type" required />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="businessType">Business Type</label>
                  <div class="input-group">
                    <span class="input-group-text text-warning"><i class="bi bi-briefcase-fill"></i></span>
                    <select v-model="restaurantDetails.businessType" class="form-control" id="businessType" required>
                      <option disabled value="">Select Business Type</option>
                      <option value="home">Home</option>
                      <option value="restaurant">Restaurant</option>
                    </select>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SideBar from './RestaurantDashboard/SideBar.vue';

const router = useRouter();

const ownerDetails = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  bankName: '',
  iban: '',
  accountType: ''
});

const restaurantDetails = ref({
  restaurantName: '',
  address: '',
  postalCode: '',
  city: '',
  openingTime: '',
  closingTime: '',
  cuisineType: '',
  businessType: ''
});

const updateDetails = () => {
  console.log("Owner Details:", ownerDetails.value);
  console.log("Restaurant Details:", restaurantDetails.value);
  // You can add your API call logic here
};

const goToChangePassword = () => {
  router.push({ path: '/setNewPassword' });
};
</script>


<style scoped>
/* Container padding */
.profile-update-container {
  padding: 20px;
}

/* Card styles */
.profile-update-card {
  transition: all 0.5s ease;
  opacity: 0;
  transform: translateY(20px);
}

.profile-update-card.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* Button hover effect */
.submit-btn {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #24cd5f;
  transform: scale(1.05);
}

.submit-btn.hover-effect {
  animation: hoverEffect 2s infinite alternate;
}

@keyframes hoverEffect {
  from {
    box-shadow: 0 0 5px rgba(0, 255, 21, 0.5);
  }

  to {
    box-shadow: 0 0 15px rgba(0, 255, 30, 0.8);
  }
}
</style>
