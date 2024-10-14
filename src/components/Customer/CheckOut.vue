<template>
  <div class="container my-5">
    <div class="row">
      <!-- Left side: Delivery Address Section -->
      <div class="col-lg-7 mb-4">
        <div class="card p-4">
          <h3>Delivery address</h3>
          <router-link to="/orderreq">
            <a class="nxt-btn">Order Request</a>
          </router-link>
          <div class="map-container mb-3 mt-2">
            <img src="../../assets/images/Screenshot 2024-10-07 151047.png" alt="Map" class="img-fluid rounded">
          </div>
          <div>
            <i class="fa-solid fa-location-crosshairs"></i>
            <p class="address">
              <strong>Haris Boys Hostel Haji Muhammad Ali Road</strong>
              <br />
              Lahore
            </p>
          </div>
          <div class="mt-3">
            <textarea class="form-control" rows="3" placeholder="Note to rider - e.g., building, landmark"></textarea>
          </div>
          <hr>
          <p class="contactless-toggle">
            Contactless delivery
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </p>
        </div>
      </div>

      <!-- Right side: Order Summary Section -->
      <div class="col-lg-5">
        <div class="card p-4">
          <h3>Your order from</h3>
          <div class="order-placed-content">
            <p class="restaurant-name">Sam's Kitchen</p>
            <div class="order-item d-flex justify-content-between my-1">
              <p>1 × Classic Chicken Momos</p>
              <span>Rs. 400</span>
            </div>
            <div class="order-item d-flex justify-content-between my-1">
              <p>1 × Daal Chana</p>
              <span>Rs. 200</span>
            </div>
            <div class="order-item d-flex justify-content-between my-1">
              <p>1 × Roghni Naan</p>
              <span>Rs. 60</span>
            </div>
            <hr />
            <div class="price-breakdown">
              <p class="d-flex justify-content-between">Subtotal <span>Rs. 600</span></p>
              <p class="d-flex justify-content-between">Standard delivery <span>Free</span></p>
              <p class="d-flex justify-content-between">Service fee <span>Rs. 9.99</span></p>
              <p class="d-flex justify-content-between">VAT <span>Rs. 0</span></p>
            </div>
            <div>
              <div class="d-flex justify-content-between fw-bold">
                <p class="total">Total</p>
                <span class="total">Rs. 669.99</span>
              </div>
              <span class="total-inc">(Incl. VAT)</span>
            </div>
          </div>
          <!-- Apply Voucher Component -->
          <div class="apply-voucher mt-4">
            <h4>Apply Voucher</h4>
            <input type="text" v-model="appliedCode" class="form-control mb-3" placeholder="Enter Voucher Code" />
            <button @click="applyVoucher" class="btn btn-green">Apply</button>
            <p v-if="discountApplied" class="mt-2">Discount Applied: {{ discount }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Row (Row 2) for additional cards like Delivery options, Personal details, Payment) -->
    <div class="row">
      <div class="col-lg-7">
        <!-- Delivery Options Card -->
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="card-title">Delivery options</h4>
            <div class="form-check mt-3 delivery-check">
              <input class="form-check-input" type="radio" name="deliveryOption" id="standard" checked>
              <label class="form-check-label" for="standard">
                Standard 15 - 30 mins
              </label>
            </div>
          </div>
        </div>

        <!-- Personal Details Card -->
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="card-title">Personal details</h4>
            <p>Muhammad Umar</p>
            <p>rananuhammadumar111@gmail.com</p>
            <p>+92 3400413185</p>
          </div>
        </div>

        <!-- Payment Card -->
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="card-title">Payment</h4>
            <p>Available payment methods</p>
            <div class="form-check delivery-check">
              <input class="form-check-input" type="radio" name="paymentMethod" id="easypaisa" checked>
              <label class="form-check-label" for="easypaisa">
                Cash On Delivery (COD)
              </label>
            </div>
          </div>
        </div>

        <!-- Save and Continue Button -->
        <div class="mt-4">
          <button class="btn btn-green w-100">Place Order</button>
        </div>
        <div class="general-terms">
          <p>By making this purchase you agree to our terms and conditions.</p>
          <p>I agree that placing the order places me under an obligation to make a payment in accordance with the
            General Terms and Conditions.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "CheckOut",
  setup() {
    const appliedCode = ref('');
    const discount = ref(0);
    const vouchers = ref([{ code: 'SAVE10', discount: 10 }, { code: 'OFFER20', discount: 20 }]);
    const discountApplied = ref(false);

    const applyVoucher = () => {
      const found = vouchers.value.find(voucher => voucher.code === appliedCode.value);
      if (found) {
        discount.value = found.discount;
        discountApplied.value = true;
        alert(`Voucher applied! You received a ${discount.value}% discount.`);
      } else {
        alert('Invalid voucher code.');
        discountApplied.value = false;
      }
    };

    return { appliedCode, discount, applyVoucher, discountApplied };
  },
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

.my-5 {
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

.total {
  font-size: 1.5rem;
  margin-bottom: -5px;
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
  content: "";
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

.general-terms {
  margin-top: 20px;
  color: rgb(97, 97, 97);
  font-size: 12px;
}

.apply-voucher h4 {
  font-family: 'Agrandir', 'Open Sans', sans-serif;
  color: #00754a;
}

.apply-voucher .form-control {
  width: 80%;
}

.apply-voucher .btn {
  width: 18%;
}

.apply-voucher .mt-2 {
  color: green;
}</style>
