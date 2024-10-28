<!-- src/views/RestauranOnwer/RestaurantOwner_Dashboard.vue -->
<template>
    <div class="dashboard-container d-flex">
      <Sidebar />
      <div class="main-content">
        <TopBar :restaurant-status="restaurantStatus" @toggle-status="toggleRestaurantStatus" />
        <Banner />
        <!--  -->
        <!-- Accepted Orders Section -->
        <div class="accepted">
          <h4>Accepted Orders</h4>
          <div class="order-list">
            <div class="accepted-order-card card mb-3" v-for="order in acceptedOrders" :key="order.id">
              <div class="card-body d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="order-user">Order #{{ order.id }}</h5>
                    <p class="order-location">{{ order.user_name }}</p>
                    <p class="text-price">{{ order.total_amount }} Rs.</p>
                    <p class="order-location">{{ order.status }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Rejected Orders Section -->
        <div>
          <h4>Rejected Orders</h4>
          <div class="order-list">
            <div class="rejected-order-card card mb-3" v-for="order in rejectedOrders" :key="order.id">
              <div class="card-body d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="order-user">Order #{{ order.id }}</h5>
                    <p class="order-location">{{ order.user_name }}</p>
                    <p class="text-price">{{ order.total_amount }} Rs.</p>
                    <p class="order-location">{{ order.status }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Current Orders Section -->
      <div class="right-sidebar p-4">
        <h4>Current Orders</h4>
        <div class="order-list">
          <div class="current-order-card card mb-3" v-for="order in currentOrders" :key="order.id">
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div>
                  <h5 class="order-user">Order #{{ order.id }}</h5>
                  <p class="order-location">{{ order.user_name }}</p>
                  <p class="text-price">{{ order.total_amount }} Rs.</p>
                  <p class="order-location">{{ order.status }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <!-- <button @click="viewOrder(order)">View</button> -->
  <!-- <OrdersSection :accepted-orders="acceptedOrders" :rejected-orders="rejectedOrders" />   -->
  
  <script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    
    // Import components
    import Sidebar from '@/Components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
    import TopBar from '@/Components/RestaurantOwner/RestaurantDashboard/Topbar.vue';
    import Banner from '@/Components/RestaurantOwner/RestaurantDashboard/Banner.vue';
    
    // Vuex store
    const store = useStore();
    // 
    const restaurantStatus = ref(true);
    
    const toggleRestaurantStatus = () => {
      restaurantStatus.value = !restaurantStatus.value;
    };  
  
    
    // Fetch orders from the store
    onMounted(() => {
    // Dispatch the fetchOrders action from the restaurantOrders module
      store.dispatch('RestOrders/fetchOrders') // Note the correct namespace
      // console.log(Response.data)
      // .then(() => {
      //   console.log('Orders fetched successfully');
      // })
      // .catch((error) => {
      //   console.error('Error fetching orders:', error);
      // });
    });
  
  
    // const viewOrder = (order) => {
    //   store.dispatch('RestOrders/openModal', order);
    // };
    // Computed property for in_progress orders only
    
    // Computed properties for filtering orders by status
    const currentOrders = computed(() => store.getters['RestOrders/ordersByStatus']('in_progress'));
    const acceptedOrders = computed(() => store.getters['RestOrders/ordersByStatus']('delivered'));
    const rejectedOrders = computed(() => store.getters['RestOrders/ordersByStatus']('canceled'));
    // Computed properties for orders
    // const currentOrders = computed(() => store.getters['orders/currentOrders']);
    // const acceptedOrders = computed(() => store.getters['orders/acceptedOrders']);
    // const rejectedOrders = computed(() => store.getters['orders/rejectedOrders']);
  </script>
  
  
  <style scoped>
  .dashboard-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--secondary-color);
  }
  
  .main-content {
      flex-grow: 1;
      padding: 20px;
      margin-left: 100px;
  }
  
  .right-sidebar {
      width: 300px;
      z-index: 1;
  }
  
  .order-list {
      max-height: 600px;
      overflow-y: auto;
  }
  
  .current-order-card {
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .current-order-card:hover {
      transform: translateY(-5px);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .order-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
  }
  
  .order-user {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
  }
  
  .order-location {
      font-size: 0.9rem;
      color: #666;
  }
  
  .text-price {
      color: #28a745;
      font-weight: bold;
      font-size: 1.2rem;
  }
  
  .btn-order {
      background-color: #00754a;
      color: white;
      padding: 5px 15px;
      border: none;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
  }
  
  .btn-order:hover {
      background-color: #3fcf9a;
  }
  
      /* Responsive */
      @media (max-width: 768px) {
          .dashboard-container {
              flex-direction: column;
          }
      
          .right-sidebar {
              width: 100%;
              margin-top: 20px;
          }
      }
  </style>  