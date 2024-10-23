<!-- ModalComponent.vue -->
<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content col-lg-5">
        <!-- <button class="close-btn" @click="closeModal"><i class="fa-regular fa-circle-xmark"></i></button> -->
        <button class="close-btn" @click="closeModal">×</button>
        <h3>Order ID</h3>
        <!-- <p><strong>{{ orderDetails.restaurant }}</strong></p> -->
  
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
          <button @click="acceptOrder" class="accept-btn">Accept</button>
          <button @click="rejectOrder" class="reject-btn">Reject</button>
        </div>
      </div>
    </div>

</template>
  
<script setup>
  // eslint-disable-next-line no-unused-vars
  import { ref } from 'vue';
  
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    isOpen: Boolean, // Prop to control modal visibility
    orderDetails: Object, // Order details to display
  });
  
  const emit = defineEmits(['close', 'accept', 'reject']);
  
  // Function to close modal
  const closeModal = () => {
    emit('close');
  };
  
  // Accept and reject functions
  const acceptOrder = () => {
    emit('accept');
  };
  
  const rejectOrder = () => {
    emit('reject');
  };
</script>
  
<style scoped>
  *{
    /* font-family: 'Agrandir', 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
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
    z-index: 10000;
  }
  
  .modal-content {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    background: white;
    padding: 20px;
    width: 500px;
    position: relative;
    border-radius: 10px;
    margin: 0px 10px;
    z-index: 10000;

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
  .item-list{
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }
  .item-list li{
    padding: 3px 0px;
  }
.action-buttons{
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
  }
  .accept-btn, .reject-btn{
    width: 46%;
    border: none;
    padding: 5px 0px;
    border-radius: 10px;
  }
  .accept-btn {
    background-color: green;
    color: white;
    /* opacity: 0.8; */
  }

.reject-btn {
    color: white;
    background-color: red;
    /* opacity: 0.8; */
  }
  /* .accept-btn:hover, .reject-btn:hover{
    opacity: 1;
  } */
</style>
  