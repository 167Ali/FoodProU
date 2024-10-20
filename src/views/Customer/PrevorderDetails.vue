<template>
  <div id="app">
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

            <!-- Order From Section -->
            <div class="order-from">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Order from</p>
                <p>{{ order.restaurant }} - {{ order.restaurant_branch_address }}</p>
              </div>
            </div>

            <!-- Delivered To Section -->
            <div class="delivered-to">
              <i class="fa-solid fa-location-dot order-icon"></i>
              <div class="order-text">
                <p>Delivered to</p>
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

        <OrderRating :orderId="order.order_id" />
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
import { getOrderDetails, downloadOrderInvoice } from '../../Services/customer/PrevorderdetailService';
import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';
import OrderRating from '@/components/Customer/OrderRating.vue';

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
/* Container for order details */
.order-details-container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap on small screens */
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

/* Order Information Section (Left) */
.order-info {
  width: 38%;
  margin-left: 15%;
}

.order-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.order-image {
  width: 80px;
  height: 80px;
  border-radius: 10%;
  object-fit: cover;
}

.order-summary {
  margin-left: 50px;
   /* Center-align on smaller screens */
}

.order-summary h2 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.delivery-info {
  color: #888;
  font-size: 0.95rem;
  margin: 10px 0;
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
}
</style>
