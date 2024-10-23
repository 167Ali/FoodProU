<template>
  <LoginHeader />
  <div class="main-container">
    <div class="container">
      <!-- Delivery Address Section -->
      <div class="row">

        <div class="col-lg-7 mb-4">
          <div class="card p-4">
            <h3>Delivery address</h3>
            <!-- <router-link to="/orderreq"><a class="nxt-btn">Order Request</a></router-link> -->
            <div class="map-container mb-3 mt-2">

              <img src="../../assets/images/Screenshot 2024-10-07 151047.png" alt="Map" class="img-fluid rounded">
            </div>
            <div>
              <i class="fa-solid fa-location-crosshairs"></i>
              <p class="address">
                <strong>{{ currentAddress || 'No address provided' }}</strong>
                <br />
                <button v-if="!editAddress" @click="editAddress = true" class="address-change-btn">Change</button>
              <div v-else>
                <input type="text" v-model="newAddress" placeholder="Enter new address" class="updating-address">
                <button @click="updateAddress" class="updating-address-btn">Update</button>
              </div>
              </p>
            </div>
            <!-- Rider note section -->
            <div class="mt-3">
              <textarea class="form-control" rows="3" placeholder="Note to rider - e.g., building, landmark"></textarea>
            </div>

            <hr>
            <p class="contactless-toggle">
              Contactless delivery
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </p>
          </div>
        </div>

        <!-- Order Summary Section -->
        <div class="col-lg-5">
          <div class="card p-4">
            <h3>Your order from</h3>
            <div class="order-placed-content">
              <p class="restaurant-name">{{ orderDetails?.restaurant_details?.name }}</p>
              <div v-for="item in orderDetails?.order_details?.items" :key="item.menu_item_id"
                class="order-item d-flex justify-content-between my-1">
                <p>{{ item.quantity }} × {{ item.menu_item_name }}</p>
                <span>Rs. {{ item.total_price }}</span>
              </div>
              <hr />
              <div class="price-breakdown">
                <p class="d-flex justify-content-between">Subtotal <span>Rs. {{ orderDetails?.order_details?.total
                    }}</span></p>
                <!-- <p class="d-flex justify-content-between">Standard delivery <span>Free</span></p> -->
                <p class="d-flex justify-content-between">Standard delivery <span>Rs. {{
                  orderDetails?.delivery_details?.delivery_fee || 'Free' }}</span></p>
              </div>
              <!--  -->
              <div>
                <div class="d-flex justify-content-between fw-bold">
                  <p class="total">Total</p>
                  <span class="total" id="total-price">Rs. {{ orderDetails?.order_details?.total }}</span>
                </div>
                <span class="total-inc">(Incl. VAT)</span>
              </div>
            </div><!---->
          </div>
        </div>
      </div>

      <!-- Delivery options, personal details, payment, and place order button -->
      <div class="row">
        <div class="col-lg-7">

          <div class="card mb-4">
            <div class="card-body">
              <h4 class="card-title">Delivery options</h4>
              <div class="form-check mt-3 delivery-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="standard" checked />
                <label class="form-check-label" for="standard">Standard 30 - 45 mins</label>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="card mb-4">
            <div class="card-body">
              <h4 class="card-title">Personal details</h4>
              <p>{{ orderDetails?.customer_details?.name }}</p>
              <p>{{ orderDetails?.customer_details?.email }}</p>
              <p>{{ orderDetails?.customer_details?.phone_number }}</p>
            </div>
          </div>
          <!--  -->
          <div class="card mb-4">
            <div class="card-body">
              <h4 class="card-title">Payment</h4>
              <!--  -->
              <p>Available payment methods</p>
              <div class="form-check delivery-check">
                <input class="form-check-input" type="radio" name="paymentMethod" id="cod" checked />
                <label class="form-check-label" for="cod">{{ orderDetails?.payment_method }} (COD)</label>
                <!-- <label class="form-check-label" for="cod">Cash On Delivery (COD)</label> -->
              </div>

            </div>
          </div>
          <!--  -->
          <div class="mt-4">
            <button class="btn btn-green w-100" @click="placeOrder">Place Order</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <PageFooter />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoginHeader from '@/Components/HeaderFooter/LoginHeader.vue';
import PageFooter from '@/Components/HeaderFooter/PageFooter.vue';

const store = useStore();
const orderDetails = computed(() => store.getters['orders/orderDetails']);
const newAddress = ref('');
const editAddress = ref(false);
const currentAddress = ref(localStorage.getItem('deliveryAddress') || '');

// Fetch order details and set delivery address from local storage or API
onMounted(async () => {
  await store.dispatch('orders/getOrderDetails');
  const savedAddress = localStorage.getItem('deliveryAddress');
  if (!savedAddress && orderDetails.value?.customer_details?.delivery_address) {
    currentAddress.value = orderDetails.value.customer_details.delivery_address;
    localStorage.setItem('deliveryAddress', currentAddress.value);
  } else if (savedAddress) {
    currentAddress.value = savedAddress;
  }
});

// Update the delivery address and save it to local storage
const updateAddress = () => {
  if (newAddress.value) {
    currentAddress.value = newAddress.value;
    localStorage.setItem('deliveryAddress', newAddress.value);
    editAddress.value = false;
  }
};

// Handle place order and pass updated address to the API
const placeOrder = () => {
  const checkoutData = {
    address: currentAddress.value,
    // Other necessary checkout data (like items, payment method, etc.)
  };
  store.dispatch('orders/placeOrder', checkoutData);
};
</script>

<style scoped>
.card {
  border: none;
}

.card h3,
h4 {
  font-family: 'Agrandir', 'Open Sans', 'Helvetica Neue', sans-serif;
}

.main-container {
  background-color: #f7f7f7;
}

.container {
  padding: 60px 80px;
}

.map-container img {
  width: 100%;
  height: auto;
}

.fa-location-crosshairs,
.address {
  display: inline-block;
}

.fa-location-crosshairs {
  position: relative;
  bottom: 20px;
  margin: 10px;
  font-size: 20px;
}


.address-change-btn {
  border: 1px solid #00754a;
  border-radius: 50px;
  background-color: white;
  font-family: agrandir;
  font-weight: 600;
  font-size: 12px;
  color: #00754a;
}

.address-change-btn:hover {
  background-color: #00754a;
  color: white;
}

.updating-address {
  border-radius: 50px;
  border-width: 1px;
  padding: 1px 10px;
  margin-right: 3px;
  font-size: 12px;
  position: relative;
  top: 1px;
}

.updating-address-btn {
  border: 1px solid #00754a;
  border-radius: 50px;
  background-color: white;
  font-family: agrandir;
  font-weight: 600;
  font-size: 12px;
  color: #00754a;
  /* padding: 7px 12px 4px 12px; */
}

.updating-address-btn:hover {
  background-color: #00754a;
  color: white;
}

.total {
  font-size: 1.5rem;
  margin-bottom: -5px;
}

#total-price {
  color: #00754a;
}

.total-inc {
  font-size: 14px;
}

.switch {
  position: relative;
  top: 4.5px;
  display: inline-block;
  width: 35px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00754a68;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #00754ad9;
}

input:checked+.slider:before {
  transform: translateX(16px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.btn-green,
.btn-green:hover {
  background-color: #00754a;
  color: #fff;
}

.restaurant-name {
  font-weight: 500;
}

.order-placed-content {
  font-size: 15px;
}

.delivery-check {
  border: 1px solid rgb(53, 53, 53);
  padding: 20px 40px;
  border-radius: 10px;
}

/*  */
.general-terms {
  margin-top: 20px;
  color: rgb(97, 97, 97);
  font-size: 12px;
}

/* Full width layout on large screens */
@media (max-width: 992px) {
  .container {
    max-width: 100% !important;
    /* Overrides Bootstrap's max-width */
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  /* .row {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    
    .col-lg-7, .col-lg-5 {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .card {
      border: none;
    } */
}
</style>