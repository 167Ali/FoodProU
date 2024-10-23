<!-- MainPage.vue -->
<template>
    <div>
      <button @click="openModal" class="view-btn">View</button>
  
      <!-- Modal component -->
      <ModalComponent v-if="isModalOpen" :isOpen="isModalOpen" :orderDetails="orderDetails"
      @close="closeModal" @accept="handleAccept" @reject="handleReject"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ModalComponent from './testingThings3.vue';
  
  const isModalOpen = ref(false);
  
  // Sample order details to match the image
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
  
  // Open and close modal functions
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
    .view-btn{
      background-color: white;
      color: #00754A;
      border: 1.5px solid #00754A;
      border-radius: 50px;
      font-size: 14px;
      font-weight: bold;
      font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 0px 15px;
    }
    .view-btn:hover{
      background-color: #00754A;
      color: white
    }
  
  </style>