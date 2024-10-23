<template>
  <div id="app">
<<<<<<< HEAD
    <LoginHeader />

    <div v-if="order" class="order-details-container">
      <!-- Left Section: Order Details -->
      <div class="order-info">
        <div class="order-card">
          <img :src="order.order_image" alt="Order Image" class="order-image" />
          <div class="order-summary">
            <h2>{{ order.restaurant_name }} – {{ order.restaurant_branch_address }}</h2>
            <p class="delivery-info">
              Delivered on {{ order.delivery_date || 'Date not available' }}<br />
              Order #{{ order.order_id }}
            </p>

=======

    <LoginHeader />

    <div v-if="order" class="order-details-container">
      <!-- Left Section: Order Details -->
      <div class="order-info">
        <div class="order-card">
          <img :src="order.order_image" alt="Order Image" class="order-image" />
          <div class="order-summary">
            <h2>{{ order.restaurant }} – {{ order.location }}</h2>
            <p class="delivery-info">
              Delivered on {{ order.deliveryDate }}<br>Order #{{ order.customerId }}
            </p>

>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
            <!-- Order From Section -->
            <div class="order-from">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Order from</p>
<<<<<<< HEAD
                <p>{{ order.restaurant }} - {{ order.restaurant_branch_address }}</p>
=======
                <p>{{ order.restaurant }} - {{ order.location }}</p>
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
              </div>
            </div>

            <!-- Delivered To Section -->
            <div class="delivered-to">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Delivered to</p>
<<<<<<< HEAD
                <p>{{ order.customer_address }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-summary-details">
          <h3>Order summary</h3>
          <div class="order-items">
            <div v-for="item in order.order_items" :key="item.id" class="order-item">
              <p>{{ item.menu_item_name }} (x{{ item.quantity }}) - Rs. {{ item.total_price }}</p>
            </div>
          </div>
          <hr />
          <div class="order-pricing">
            <p><span>Subtotal:</span> <span>Rs. {{ subtotal }}</span></p>
            <p><span>Delivery fee:</span> <span>Rs. {{ deliveryFee }}</span></p>
            <p><strong>Total (incl. VAT):</strong> <strong>Rs. {{ total }}</strong></p>
          </div>
          <hr />
=======
                <p>{{ order.deliveryAddress }}</p>

              </div>
            </div>
          </div>

        </div>

        <div class="order-summary-details">
          <h3>Order summary</h3>
          <div class="order-items">
            <p>{{ order.items }}</p>
          </div>
          <hr />
          <div class="order-pricing">
            <p><span>Subtotal:</span> <span>Rs. {{ order.subtotal }}</span></p>
            <p><span>Delivery fee:</span> <span>Rs. {{ order.deliveryFee }}</span></p>
            <p><strong>Total (incl. VAT):</strong> <strong>Rs. {{ order.total }}</strong></p>
          </div>
          <hr />
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
          <div class="payment-details">
            <p><span>Paid with</span> <span>{{ paymentMethod }} - Rs. {{ paymentAmount }}</span></p>
          </div>
        </div>
      </div>

      <!-- Right Section: Actions -->
      <div class="order-actions">
        <div class="action-card reorder-section">
          <p>Place this Order Again</p>
          <button class="reorder-button">Select items to reorder</button>
        </div>

<<<<<<< HEAD
        <OrderRating :orderId="order.order_id" />
=======
        <div class="action-card invoice-section">
          <p>Need an invoice?</p>
          <button class="invoice-button" @click="downloadInvoice">Download invoice</button>
        </div>
        <OrderRating />
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
      </div>
    </div>

    <div v-else class="loading-message">
      <p v-if="error">{{ error }}</p>
      <p v-else>Loading order details...</p>
    </div>

    <PageFooter />
  </div>
<<<<<<< HEAD
=======

>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
</template>

<script setup>
import { ref, onMounted } from 'vue';
<<<<<<< HEAD
import { getOrderDetails, downloadOrderInvoice } from '../../Services/customer/PrevorderdetailService';
import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';
import OrderRating from '@/components/Customer/OrderRating.vue';
=======
import { getOrderDetails, downloadOrderInvoice } from '@/Services/Customer/prevOrderDetailService';
import LoginHeader from '@/Components/HeaderFooter/LoginHeader.vue';
import PageFooter from '@/Components/HeaderFooter/PageFooter.vue';
import OrderRating from '@/Components/Customer/OrderRating.vue';
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e

// Props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// Reactive data
const order = ref(null);
const error = ref(null);

<<<<<<< HEAD
// Extracted data for pricing
const subtotal = ref(0);
const deliveryFee = ref(79); // Assuming delivery fee is fixed or fetched separately
const total = ref(0);
const paymentMethod = ref("Cash On Delivery"); // Placeholder, adapt as per response
const paymentAmount = ref(0);

// Fetch order details when component is mounted
const fetchOrderDetails = async () => {
  try {
    const response = await getOrderDetails(props.id);
    order.value = response.data;

    // Calculate the subtotal and total based on order items
    subtotal.value = order.value.order_items.reduce((acc, item) => acc + item.total_price, 0);
    total.value = subtotal.value + deliveryFee.value; // Assuming total includes delivery fee and other charges
    paymentAmount.value = total.value; // Assuming the payment amount matches the total
=======
// Fetch order details when component is mounted
const fetchOrderDetails = async () => {
  try {
    order.value = await getOrderDetails(props.id);
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
  } catch (err) {
    error.value = err.message;
  }
};

// Handle invoice download
const downloadInvoice = async () => {
  try {
    await downloadOrderInvoice(props.id);
  } catch (err) {
    console.error(err.message);
    alert('Failed to download invoice');
  }
};

// Hook to fetch order details on mount
onMounted(() => {
  fetchOrderDetails();
});
</script>

<style scoped>
<<<<<<< HEAD
/* Container for order details */
.order-details-container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap on small screens */
=======
/* Same styles as before */
.order-details-container {

  display: flex;
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

<<<<<<< HEAD
/* Order Information Section (Left) */
=======
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
.order-info {
  width: 38%;
  margin-left: 15%;
}

.order-card {
  display: flex;
<<<<<<< HEAD
  flex-direction: column;
=======
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
<<<<<<< HEAD
=======
  align-items: center;
  height: 300px;
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
}

.order-image {
  width: 80px;
  height: 80px;
<<<<<<< HEAD
=======
  margin-top: -150px;
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
  border-radius: 10%;
  object-fit: cover;
}

.order-summary {
  margin-left: 50px;
<<<<<<< HEAD
   /* Center-align on smaller screens */
}

.order-summary h2 {
=======
}

.order-summary h2 {
  margin: 0;
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.delivery-info {
  color: #888;
  font-size: 0.95rem;
  margin: 10px 0;
<<<<<<< HEAD
}

/* Order from and delivered to sections */
.order-from,
.delivered-to {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
}

.order-icon {
  font-size: 1.2rem;
  color: #00754a;
  margin-right: 10px;
}

.order-text p {
  margin: 0;
  color: #555;
}

.order-from .order-text p:first-child,
.delivered-to .order-text p:first-child {
  font-weight: bold;
  color: #333;
}

/* Order Summary Details Section */
.order-summary-details {
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.order-summary-details h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.order-items,
.order-pricing,
.payment-details {
  margin-bottom: 10px;
}

.order-pricing,
.payment-details {
  font-size: 1rem;
  color: #555;
}

.order-pricing p,
.payment-details p {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.order-pricing p span,
.payment-details p span {
  text-align: right;
}

/* Order Actions Section (Right) */
.order-actions {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 20px;
}

.action-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.reorder-section p {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.reorder-button {
  background-color: #00754a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.reorder-button:hover {
  background-color: #00593c;
}

/* Loading Message */
.loading-message {
  text-align: center;
  font-size: 1.2rem;
  padding: 50px 0;
}

/* Media Queries for Responsiveness */
@media (max-width: 1200px) {
  .order-info {
    width: 45%;
    margin-left: 5%;
  }

  .order-actions {
    width: 45%;
    margin-left: 5%;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .order-info {
    width: 100%;
    margin-left: 0;
    margin-bottom: 20px;
  }

  .order-actions {
    width: 100%;
    padding: 0;
  }

  .order-card {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .order-summary {
    margin-left: 20px;
  }

  .order-image {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 576px) {
  .order-details-container {
    flex-direction: column;
    padding: 20px 10px;
  }

  .order-info,
  .order-actions {
    width: 100%;
    margin-left: 0;
    padding: 0;
  }

  .order-summary h2 {
=======

}

.order-from,
.delivered-to {

    display: flex;
    align-items: flex-start;
    margin: 10px 0;
    margin-left: -110px;
  }
  
  .order-icon {
    font-size: 1.2rem;
    color: #00754a;
    margin-right: 10px;
  }
  
  .order-text p {
    margin: 0;
    color: #555;
  }
  
  .order-from .order-text p:first-child,
  .delivered-to .order-text p:first-child {
    font-weight: bold;
    color: #333;
  }
  
  .order-summary-details {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .order-summary-details h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  
  .order-items,
  .order-pricing,
  .payment-details {
    margin-bottom: 10px;
  }
  
  .order-pricing,
  .payment-details {
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
    font-size: 1rem;
  }

  .order-pricing p,
  .payment-details p {
    font-size: 0.9rem;
  }

  .reorder-button {
    font-size: 0.9rem;
    padding: 10px;
  }

  .order-image {
    width: 50px;
    height: 50px;
  }
<<<<<<< HEAD
}
</style>
=======
  
  .invoice-button {
    background-color: #1fd46b;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .invoice-button:hover {
    background-color: #16a959;
  }
  
  .loading-message {
    text-align: center;
    font-size: 1.2rem;
    padding: 50px 0;
  }
  </style>
  
>>>>>>> 09d839506caadbd88c65305fc0f70e0dbe705e4e
