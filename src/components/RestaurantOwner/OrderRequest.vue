<template>
  <div class="main-cont">
    <button @click="showModal = true" class="btn btn-primary">Orders</button>

    <!-- Modal for Order Requests -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3 v-if="!selectedOrder">New Orders</h3>
        <h3 v-if="selectedOrder">Order Details</h3>
        
        <div v-if="!selectedOrder" class="order-requests">
          <div v-for="(order, index) in orders" :key="index" class="order-card">
            <div class="order-details">
              <p><strong>Order ID:</strong> {{ order.id }}</p>
              <p><strong>Username:</strong> {{ order.username }}</p>
              <p><strong>Items:</strong> {{ order.items.join(', ') }}</p>
              <p><strong>Subtotal:</strong> Rs. {{ order.subtotal }}</p>
              <p><strong>Total:</strong> Rs. {{ order.total }}</p>
              <p><strong>Time remaining:</strong> <strong>{{ order.timer }}</strong> seconds</p>
            </div>
            <div class="order-actions">
              <button class="btn btn-success" @click="acceptOrder(order)">Accept</button>
              <button class="btn btn-danger" @click="rejectOrder(order)">Reject</button>
            </div>
          </div>
        </div>

        <div v-if="selectedOrder" class="order-details">
          <p><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
          <p><strong>Username:</strong> {{ selectedOrder.username }}</p>
          <p><strong>Items:</strong> {{ selectedOrder.items.join(', ') }}</p>
          <p><strong>Subtotal:</strong> Rs. {{ selectedOrder.subtotal }}</p>
          <p><strong>Total:</strong> Rs. {{ selectedOrder.total }}</p>
          <button @click="clearSelectedOrder">Back</button>
        </div>
      </div>
    </div>

    <div class="order-list">
      <h3>Accepted Orders</h3>
      <ul>
        <li v-for="(acceptedOrder, index) in acceptedOrders" :key="index">
          Order ID: {{ acceptedOrder.id }} - Username: {{ acceptedOrder.username }}
          <button @click="viewOrder(acceptedOrder)">View</button>
        </li>
      </ul>

      <h3>Rejected Orders</h3>
      <ul>
        <li v-for="(rejectedOrder, index) in rejectedOrders" :key="index">
          Order ID: {{ rejectedOrder.id }} - Username: {{ rejectedOrder.username }}
          <button @click="viewOrder(rejectedOrder)">View</button>
        </li>
      </ul>
    </div>
  </div>
</template>

    
    <script>
    export default {
      data() {
        return {
          showModal: false,
          selectedOrder: null, // Store the currently viewed order
          orders: [], // List of new orders
          acceptedOrders: [],
          rejectedOrders: [],
          interval: null,
        };
      },
      mounted() {
        this.populateDummyOrders();
      },
      methods: {
        populateDummyOrders() {
          // Generate some dummy orders
          for (let i = 1; i <= 5; i++) {
            this.orders.push({
              id: `#0${i}`,
              username: `User ${i}`,
              items: [`Item ${i}a`, `Item ${i}b`],
              subtotal: (i * 100).toFixed(2),
              total: (i * 120).toFixed(2),
              timer: 3000, // 3000 seconds timer
            });
          }
          this.startTimers();
        },
        startTimers() {
          this.orders.forEach((order) => {
            const orderInterval = setInterval(() => {
              if (order.timer > 0) {
                order.timer--;
              } else {
                this.rejectOrder(order);
                clearInterval(orderInterval); // Stop the timer if time runs out
              }
            }, 1000);
          });
        },
        acceptOrder(order) {
          this.acceptedOrders.push(order);
          this.orders = this.orders.filter((o) => o.id !== order.id);
          this.playAlertSound(); // Play sound when an order is accepted
        },
        rejectOrder(order) {
          this.rejectedOrders.push(order);
          this.orders = this.orders.filter((o) => o.id !== order.id);
          this.playAlertSound(); // Play sound when an order is rejected
        },
        viewOrder(order) {
          this.selectedOrder = order; // Set the selected order to show details
        },
        clearSelectedOrder() {
          this.selectedOrder = null; // Clear selected order
        },
        closeModal() {
          this.showModal = false; 
          this.clearSelectedOrder(); // Clear selection when closing modal
        },
        playAlertSound() {
          const audio = new Audio(new URL('@/assets/sounds/order_ringtone.wav', import.meta.url).href);
          audio.loop = true; // Set to loop
          audio.play().catch((error) => {
            console.error('Error playing audio:', error);
          });
        },
      },
    };
    </script>
    
    
  
    <style scoped>
    .main-cont {
      padding-top: 70px;
      height: 100vh;
      position: relative;
    }
    
    .modal {
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: end;
      align-items: center;
    }
    
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      position: relative;
      max-height: 400px;
      max-width: 500px;
      border: none;
      
    }
    
    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
    }
    
    .order-card {
      border: 1px solid #e0e0e0;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    .order-requests{
        overflow-y: auto;
    }
    .order-actions button {
      margin-right: 5px;
    }
    </style>
    
  