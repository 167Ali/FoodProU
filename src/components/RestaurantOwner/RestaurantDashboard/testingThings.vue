<!-- MergedComponent.vue -->
<template>
  <div>
    <!-- View Button -->
    <button @click="openModal" class="view-btn">View</button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content col-lg-5">
        <button class="close-btn" @click="closeModal">×</button>
        <h3>Order ID</h3>

        <ul class="item-list">
          <li v-for="(item, index) in orderDetails.items" :key="index" class="order-item d-flex justify-content-between my-1">
            1 × {{ item.name }} <span>{{ item.price }}</span>
          </li>
        </ul>

        <hr />
        <div class="price-details">
          <p class="order-item d-flex justify-content-between my-1">Subtotal <span>{{ orderDetails.subtotal }}</span></p>
          <p class="order-item d-flex justify-content-between my-1">Standard delivery <span>{{ orderDetails.delivery }}</span></p>
        </div>

        <h3 class="order-item d-flex justify-content-between my-1">Total <span class="total-price">{{ orderDetails.total }}</span></h3>

        <!-- Accept and Reject Buttons -->
        <div class="action-buttons">
          <button @click="handleAccept" class="accept-btn">Accept</button>
          <button @click="handleReject" class="reject-btn">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// State to control modal visibility
const isModalOpen = ref(false);

// Sample order details
const orderDetails = ref({
  restaurant: "Sam's Kitchen",
  items: [
    { name: 'Classic Chicken Momos', price: 'Rs. 400' },
    { name: 'Daal Chana', price: 'Rs. 200' },
    { name: 'Roghni Naan', price: 'Rs. 60' }
  ],
  subtotal: 'Rs. 600',
  delivery: 'Free',
  total: 'Rs. 669.99'
});

// Functions to open and close the modal
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
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
    /* font-family: 'Agrandir', 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
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
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
    font-size: 25px;
    font-weight: bold;
    background-color: white;
    border: none;
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
