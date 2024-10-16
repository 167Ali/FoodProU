<template>
  <div id="app">
    <LoginHeader />

    <div class="orders-container">
      <!-- Active Orders Section -->
      <div class="orders-section">
        <h2>Active Orders</h2>
        <div v-if="loadingActive" class="loading-message">Loading active orders...</div>
        <div v-if="!loadingActive && activeOrders.length === 0" class="no-orders">You have no active orders.</div>
        <div v-else>
          <div v-for="order in activeOrders" :key="order.id" class="order-card">
            <!-- Only display the image if order_items exists and has at least one item -->
            <img v-if="order.order_items && order.order_items.length > 0" :src="order.order_items[0].menu_item_image" alt="Order Image" class="order-image" />
            <div class="order-details">
              <h3>{{ order.restaurant_name }} – {{ order.branch_address }}</h3>
              <p class="delivery-info">Estimated Delivery: {{ order.estimated_delivery_time }}</p>
              <p class="order-id">Order #{{ order.id }}</p>
              <div v-if="order.order_items && order.order_items.length > 0">
                <h4>Items:</h4>
                <ul>
                  <li v-for="item in order.order_items" :key="item.id">
                    {{ item.menu_item_name }} - Rs. {{ item.item_price }} (Addon: {{ item.addon_name }})
                  </li>
                </ul>
              </div>
              <p class="price">Total: Rs. {{ order.total_amount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Past Orders Section -->
      <div class="orders-section">
        <h2>Past Orders</h2>
        <div v-if="loadingPast" class="loading-message">Loading past orders...</div>
        <div v-if="!loadingPast && pastOrders.length === 0" class="no-orders">You have no past orders.</div>
        <div v-else>
          <div v-for="order in pastOrders" :key="order.id" class="order-card">
            <!-- Only display the image if order_items exists and has at least one item -->
            <img v-if="order.order_items && order.order_items.length > 0" :src="order.order_items[0].menu_item_image" alt="Order Image" class="order-image" />
            <div class="order-details">
              <h3>{{ order.restaurant_name }} – {{ order.branch_address }}</h3>
              <p class="delivery-info">Delivered on {{ order.estimated_delivery_time }}</p>
              <p class="order-id">Order #{{ order.id }}</p>
              <div v-if="order.order_items && order.order_items.length > 0">
                <h4>Items:</h4>
                <ul>
                  <li v-for="item in order.order_items" :key="item.id">
                    {{ item.menu_item_name }} - Rs. {{ item.item_price }} (Addon: {{ item.addon_name }})
                  </li>
                </ul>
              </div>
              <p class="price">Total: Rs. {{ order.total_amount }}</p>
              <p class="rating">You rated this ⭐ {{ order.rating || 0 }}</p>
            </div>
            <button class="reorder-button" @click="goToPrevOrderDetails(order.id)">
              Select items to reorder
            </button>
          </div>
        </div>
      </div>
    </div>

    <PageFooter />
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

import { getActiveOrders, getPastOrders } from '../../Services/customer/OrderService';

import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';
const store = useStore();
const router = useRouter();
const activeOrders = ref([]);
const pastOrders = ref([]);
const loadingActive = ref(false);
const loadingPast = ref(false);

const fetchActiveOrders = async () => {
  loadingActive.value = true;
  try {
    activeOrders.value = await getActiveOrders();
  } catch (error) {
    console.error('Error fetching active orders:', error);
  } finally {
    loadingActive.value = false;
  }
};

const fetchPastOrders = async () => {
  loadingPast.value = true;
  try {
    pastOrders.value = await getPastOrders();
  } catch (error) {
    console.error('Error fetching past orders:', error);
  } finally {
    loadingPast.value = false;
  }
};

const goToPrevOrderDetails = (customerId) => {
  router.push({ name: 'PrevorderDetails', params: { id: customerId } });
};

onMounted(() => {
  fetchActiveOrders();
  fetchPastOrders();
});
// 

// Getting the orders from Vuex state
activeOrders.value = store.getters['order/activeOrders'];
pastOrders.value = store.getters['order/pastOrders'];
loadingActive.value = store.getters['order/loadingActive'];
loadingPast.value = store.getters['order/loadingPast'];

// Navigate to previous order details page
// const goToPrevOrderDetails = (customerId) => {
//   router.push({ name: 'PrevorderDetails', params: { id: customerId } });
// };

// Fetch orders when the component is mounted
// onMounted(() => {
//   fetchOrders();
// });
</script>

<style scoped>
.orders-container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.orders-section {
  margin-bottom: 40px;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #ececec;
  padding-bottom: 10px;
}

.loading-message {
  color: #888;
  font-size: 1.2rem;
}

.no-orders {
  color: #888;
  font-size: 1.2rem;
}

.order-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.order-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
}

.order-details {
  flex-grow: 1;
  margin-left: 20px;
}

.order-details h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.delivery-info {
  color: #777;
  margin: 5px 0;
  font-size: 0.9rem;
}

.order-id {
  color: #aaa;
  font-size: 0.9rem;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.rating {
  margin-top: 5px;
  font-size: 1rem;
  color: #ffcc00;
}

.reorder-button {
  background-color: #00754A;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.reorder-button:hover {
  background-color: #004c31;
}
</style>