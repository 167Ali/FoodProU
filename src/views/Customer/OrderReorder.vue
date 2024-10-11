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
          <div v-for="order in activeOrders" :key="order.customerId" class="order-card">
            <img :src="order.image" alt="Order Image" class="order-image" />
            <div class="order-details">
              <h3>{{ order.restaurant }} – {{ order.location }}</h3>
              <p class="delivery-info">Delivered on {{ order.deliveryDate }}</p>
              <p class="order-id">Order #{{ order.customerId }}</p>
              <p>{{ order.items }}</p>
              <p class="price">Rs. {{ order.price }}</p>
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
          <div v-for="order in pastOrders" :key="order.customerId" class="order-card">
            <img :src="order.image" alt="Order Image" class="order-image" />
            <div class="order-details">
              <h3>{{ order.restaurant }} – {{ order.location }}</h3>
              <p class="delivery-info">Delivered on {{ order.deliveryDate }}</p>
              <p class="order-id">Order #{{ order.customerId }}</p>
              <p>{{ order.items }}</p>
              <p class="price">Rs. {{ order.price }}</p>
              <p class="rating">You rated this ⭐ {{ order.rating }}</p>
            </div>
            <button class="reorder-button" @click="goToPrevOrderDetails(order.customerId)">
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';

// Router instance
const router = useRouter();

// Vuex store instance
const store = useStore();

// Accessing state from the Vuex store
const activeOrders = ref([]);
const pastOrders = ref([]);
const loadingActive = ref(false);
const loadingPast = ref(false);

// Fetching orders using Vuex actions
const fetchOrders = async () => {
  await store.dispatch('order/fetchActiveOrders', 1); // assuming customerId is 1 for demo
  await store.dispatch('order/fetchPastOrders', 1);
};

// Getting the orders from Vuex state
activeOrders.value = store.getters['order/activeOrders'];
pastOrders.value = store.getters['order/pastOrders'];
loadingActive.value = store.getters['order/loadingActive'];
loadingPast.value = store.getters['order/loadingPast'];

// Navigate to previous order details page
const goToPrevOrderDetails = (customerId) => {
  router.push({ name: 'PrevorderDetails', params: { id: customerId } });
};

// Fetch orders when the component is mounted
onMounted(() => {
  fetchOrders();
});
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