<template>
  <div id="app">

    <LoginHeader />

    <div v-if="order" class="order-details-container">
      <!-- Left Section: Order Details -->
      <div class="order-info">
        <div class="order-card">
          <img :src="order.image" alt="Order Image" class="order-image" />
          <div class="order-summary">
            <h2>{{ order.restaurant }} – {{ order.location }}</h2>
            <p class="delivery-info">
              Delivered on {{ order.deliveryDate }}<br>Order #{{ order.customerId }}
            </p>

            <!-- Order From Section -->
            <div class="order-from">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Order from</p>
                <p>{{ order.restaurant }} - {{ order.location }}</p>
              </div>
            </div>

            <!-- Delivered To Section -->
            <div class="delivered-to">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Delivered to</p>
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
          <div class="payment-details">
            <p><span>Paid with</span> <span>{{ order.paymentMethod }} - Rs. {{ order.paymentAmount }}</span></p>

          </div>
        </div>
      </div>

      <!-- Right Section: Actions -->
      <div class="order-actions">
        <div class="action-card reorder-section">
          <p>Place this Order Again</p>
          <button class="reorder-button">Select items to reorder</button>
        </div>

        <div class="action-card invoice-section">
          <p>Need an invoice?</p>
          <button class="invoice-button" @click="downloadInvoice">Download invoice</button>
        </div>
        <OrderRating />
      </div>
    </div>

    <div v-else class="loading-message">
      <p v-if="error">{{ error }}</p>
      <p v-else>Loading order details...</p>
    </div>

    <PageFooter />
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getOrderDetails, downloadOrderInvoice } from '../../Services/Customer/prevOrderDetailService';
import LoginHeader from '../../Components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../Components/HeaderFooter/PageFooter.vue';
import OrderRating from '@/Components/Customer/OrderRating.vue';

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

// Fetch order details when component is mounted
const fetchOrderDetails = async () => {
  try {
    order.value = await getOrderDetails(props.id);
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
/* Same styles as before */
.order-details-container {

  display: flex;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.order-info {
  width: 38%;
  margin-left: 15%;
}

.order-card {
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  align-items: center;
  height: 300px;
}

.order-image {
  width: 80px;
  height: 80px;
  margin-top: -150px;
  border-radius: 10%;
  object-fit: cover;
}

.order-summary {
  margin-left: 50px;
}

.order-summary h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.delivery-info {
  color: #888;
  font-size: 0.95rem;
  margin: 10px 0;

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

.reorder-section p,
.invoice-section p {
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