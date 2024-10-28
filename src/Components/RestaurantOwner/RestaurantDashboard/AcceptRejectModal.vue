
<template>
  <div>

    <div class="modal-overlay">
      <div class="modal-content col-lg-5">
        <button class="close-btn" @click="closeModal">×</button>
        <h3>Order ID: {{ selectedOrder?.id }}</h3>

        <ul class="item-list">
          <li v-for="(item, index) in selectedOrder?.order_items" :key="index" class="order-item d-flex justify-content-between my-1">
            {{ item.quantity }} × {{ item.menu_item_name }} <span>{{ item.price || 'N/A' }}</span>
          </li>
        </ul>

        <hr />
        <div class="price-details">
          <p class="order-item d-flex justify-content-between my-1">Subtotal <span>{{ selectedOrder?.total_amount }} Rs.</span></p>
          <p class="order-item d-flex justify-content-between my-1">Standard delivery <span>{{ selectedOrder?.delivery || 'Free' }}</span></p>
        </div>

        <h3 class="order-item d-flex justify-content-between my-1">Total <span class="total-price">{{ selectedOrder?.total_amount }} Rs.</span></h3>

        <!-- Accept and Reject Buttons (Only show if status is 'in_progress') -->
        <div class="action-buttons" v-if="selectedOrder?.status === 'in_progress'">
          <button @click="handleAccept" class="accept-btn">Accept</button>
          <button @click="handleReject" class="reject-btn">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Modal state and selected order data from Vuex
const selectedOrder = computed(() => store.getters['RestOrders/selectedOrder']);

// Close modal function
const closeModal = () => {
  store.dispatch('RestOrders/closeModal');
};

// Handle Accept and Reject actions
const handleAccept = () => {
  console.log('Order Accepted');
  closeModal();
};

const handleReject = () => {
  console.log('Order Rejected');
  closeModal();
};
</script>


<style scoped>
  *{
    font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
   }
  .view-btn {
    background-color: white;
    color: #00754A;
    border: 1.5px solid #00754A;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0px 15px;
  }

  .view-btn:hover {
    background-color: #00754A;
    color: white;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    background: white;
    padding: 20px;
    width: 500px;
    position: relative;
    border-radius: 10px;
    margin: 0px 10px;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    font-weight: bold;
    background-color: white;
    border: none;
    border: 1.5px solid rgba(0, 0, 0, 0.8);
    width: 30px;
    border-radius: 50px;
  }
  .close-btn:hover{
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }

  h3, .total-price {
    font-weight: bold;
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  .item-list li {
    padding: 3px 0px;
  }

  .action-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
  }

  .accept-btn, .reject-btn {
    width: 46%;
    border: none;
    padding: 5px 0px;
    border-radius: 10px;
  }

  .accept-btn {
    background-color: green;
    color: white;
  }

  .reject-btn {
    color: white;
    background-color: red;
  }
</style>
