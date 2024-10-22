<template>
  <div class="page-container">
    <button class="btn btn-link offcanvas-toggle d-md-none" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasOrderDetail" aria-controls="offcanvasOrderDetail">
      <i class="fa-solid fa-bars"></i>
    </button>

    <div class="order-detail">
      <div class="order-sidebar d-none d-md-block">
        <h2 class="order-title">Restaurant Details</h2>
        <div class="order-status">
          <button class="status-btn" :class="{ active: currentStatus === 'pending' }"
            @click="setCurrentStatus('pending')">
            Pending
          </button>
          <button class="status-btn" :class="{ active: currentStatus === 'declined' }"
            @click="setCurrentStatus('declined')">
            Declined
          </button>
          <button class="status-btn" :class="{ active: currentStatus === 'deactivated' }"
            @click="setCurrentStatus('deactivated')">
            Deactivated
          </button>

        </div>

        <div class="order-items">
          <div v-if="loading">Loading...</div> <!-- Show loading indicator when fetching data -->
          <div v-else-if="filteredOrders.length > 0">
            <OrderItem v-for="item in filteredOrders" :key="item.id" :item="item" />
          </div>
          <div v-else>No orders found.</div> <!-- Show message when no orders are available -->
          <div v-if="error">{{ error }}</div> <!-- Display any errors -->
        </div>
      </div>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasOrderDetail"
        aria-labelledby="offcanvasOrderDetailLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasOrderDetailLabel">Order Details</h5>
        </div>
        <div class="offcanvas-body">
          <div class="order-status">
            <button class="status-btn" :class="{ active: currentStatus === 'pending' }"
              @click="setCurrentStatus('pending')">
              Pending
            </button>
            <button class="status-btn" :class="{ active: currentStatus === 'declined' }"
              @click="setCurrentStatus('declined')">
              Declined
            </button>
            <button class="status-btn" :class="{ active: currentStatus === 'rejected' }"
              @click="setCurrentStatus('rejected')">
              Rejected
            </button>
          </div>
          <div class="order-items">
            <div v-if="loading">Loading...</div> <!-- Show loading indicator when fetching data -->
            <div v-else-if="filteredOrders.length > 0">
              <OrderItem v-for="item in filteredOrders" :key="item.id" :item="item" />
            </div>
            <div v-else>No orders found.</div> <!-- Show message when no orders are available -->
            <div v-if="error">{{ error }}</div> <!-- Display any errors -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import OrderItem from '../../Components/Admin/OrderItem.vue';
import { useOrderStore } from '../../Store/Admin/OrderStore'; // Adjust the path as necessary

const { acceptedOrders, pendingOrders, declinedOrders, fetchOrderItems, loading, error } = useOrderStore();

const currentStatus = ref('declined');
const filteredOrders = computed(() => {
  switch (currentStatus.value) {
    case 'pending':
      return pendingOrders.value || []; // Ensure it's an array
    case 'declined':
      return declinedOrders.value || []; // Ensure it's an array
    // Add rejected orders logic if needed
    default:
      return [];
  }
});

const setCurrentStatus = (status) => {
  currentStatus.value = status; // Update the current status
};

onMounted(() => {
  fetchOrderItems(); // Fetch order items when the component mounts
});
</script>


<style scoped>
/* Container for the entire page */
.page-container {
  position: relative;
}

/* Container for the entire order detail section */
.order-detail {
  width: 100%;
  max-width: 350px;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

/* Sidebar for larger screens */
.order-sidebar {
  width: 100%;
  margin-top: 20px;
}

/* Off-canvas toggle button */
.offcanvas-toggle {
  position: fixed;
  /* Fix the button to stay in place on mobile */
  top: 17px;
  right: -5px;
  z-index: 1050;
  /* Ensure it’s on top */
  background-color: transparent;
  color: black;
  border: none;
  font-size: 32px;
}

/* Order title styling */
.order-title {
  text-align: center;
  margin-bottom: 20px;
  color: #00754A;
}

/* Order status buttons */
.order-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.status-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #f4f4f4;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.status-btn:last-child {
  margin-right: 0;
}

.status-btn:hover {
  background-color: #e2e2e2;
}

.status-btn.active {
  background-color: #00754A;
  color: #fff;
}

/* Order items container with scrolling capability */
.order-items {
  margin-top: 20px;
  max-height: 510px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px;
  /* Avoid clipping content due to scrollbar */
}

/* Scrollbar styling */
.order-items::-webkit-scrollbar {
  width: 6px;
}

.order-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* Responsive Adjustments */
@media (min-width: 768px) {

  /* Hide the off-canvas toggle button on larger screens */
  .offcanvas-toggle {
    display: none;
  }

  /* The sidebar should be visible on larger screens */
  .order-sidebar {
    display: block;
  }
}

@media (max-width: 767.98px) {

  /* Ensure the off-canvas toggle button is visible on mobile */
  .offcanvas-toggle {
    display: inline-block;
  }

  /* Hide the order sidebar on mobile screens */
  .order-sidebar {
    display: none;
  }
}
</style>