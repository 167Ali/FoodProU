<template>
  <div class="order-item">
    <img :src="item.image || 'default-image-url.jpg'" alt="Food Image" class="item-image" />
    <div class="item-details">
      <h4 class="item-name">{{ item.restaurant_name || item.name || 'Unknown Restaurant' }}</h4>
      <p class="item-status">{{ item.status || ' ' || 'No Status' }}</p>
      <p class="item-cuisine">{{ item.cuisine || 'Unknown Cuisine' }}</p>
      <p class="item-owner">
        {{ (item.first_name || ' ' || 'Unknown') + ' ' + (item.last_name || ' ' || 'Name') }}
      </p>
      <div class="button-container">
        <template v-if="currentStatus === 'deactivated'">
          <button class="accept-button" @click="activate_Application">Activate</button>
        </template>
        <template v-else>
          <button class="accept-button" @click="accept_Application">Accept</button>
          <button class="reject-button" v-if="item.status !== 'declined'" @click="reject_Application">
            Reject
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useOrderStore } from '../../Store/Admin/orderStore';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  currentStatus: { // Add a prop to receive the current status
    type: String,
    required: true
  }
});

const { acceptApplication, rejectApplication, activateApplication } = useOrderStore();

const accept_Application = async () => {
  const orderId = props.item.id;
  console.log('Order ID:', orderId);

  if (!orderId) {
    console.error('Order ID is undefined or null');
    return;
  }

  try {
    console.log(`Order accepted: ${orderId}`);
    await acceptApplication(orderId);
  } catch (error) {
    console.error(`Error accepting order: ${error}`);
  }
};

const reject_Application = async () => {
  const orderId = props.item.id;
  console.log('Order ID:', orderId);

  if (!orderId) {
    console.error('Order ID is undefined or null');
    return;
  }

  try {
    console.log(`Order rejected: ${orderId}`);
    await rejectApplication(orderId);
  } catch (error) {
    console.error(`Error rejecting order: ${error}`);
  }
};

const activate_Application = async () => {
  const orderId = props.item.id;
  console.log('Order ID:', orderId);

  if (!orderId) {
    console.error('Order ID is undefined or null');
    return;
  }

  try {
    console.log(`Order activated: ${orderId}`);
    // Call the actual method to activate the order
    await activateApplication(orderId);
  } catch (error) {
    console.error(`Error activating order: ${error}`);
  }

};

// eslint-disable-next-line no-unused-vars
const deactivate_Application = async () => {
  const orderId = props.item.id;
  console.log('Order ID:', orderId);

  if (!orderId) {
    console.error('Order ID is undefined or null');
    return;
  }

  try {
    console.log(`Order deactivated: ${orderId}`);
    // Call the actual method to deactivate the order
    // eslint-disable-next-line no-undef
    await deactivateApplication(orderId);
  } catch (error) {
    console.error(`Error deactivating order: ${error}`);
  }
};
</script>

<style scoped>
.order-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.item-name {
  font-size: 18px;
  font-weight: bold;
  color: #00754A;
  margin: 0;
}

.item-status {
  font-size: 14px;
  color: #888;
  margin: 5px 0;
}

.item-cuisine {
  font-size: 14px;
  color: #333;
  font-weight: normal;
}

.button-container {
  display: flex;
  margin-top: 10px;
}

.accept-button,
.reject-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
  transition: background-color 0.3s, transform 0.2s;
  width: 100px;
}

.accept-button {
  background-color: #4CAF50;
  color: white;
}

.accept-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.reject-button {
  background-color: #f44336;
  color: white;
}

.reject-button:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}
</style>