<template>
    <div class="dashboard-container d-flex">
        <Sidebar />
        <div class="main-content">
            <TopBar :restaurant-status="restaurantStatus" @toggle-status="toggleRestaurantStatus" />
            <Banner />
            <OrdersSection :accepted-orders="acceptedOrders" :rejected-orders="rejectedOrders" />
            <OrderRequest />
        </div>
        <div class="right-sidebar p-4">
            <h4>Current Orders</h4>
            <div class="order-list">
                <div class="current-order-card card mb-3" v-for="order in currentOrders" :key="order.id">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <img :src="order.image" alt="Order Image" class="order-image me-3" />
                            <div>
                                <h5 class="order-user">{{ order.user }}</h5>
                                <p class="order-location">{{ order.location }}</p>
                                <p class="text-price">$ {{ order.totalPrice.toFixed(2) }}</p>
                            </div>
                        </div>
                        <button class="btn btn-order">View</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Importing components
import Sidebar from '@/Components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
import TopBar from '@/Components/RestaurantOwner/RestaurantDashboard/Topbar.vue';
import Banner from '@/Components/RestaurantOwner/RestaurantDashboard/Banner.vue';
import OrdersSection from '@/Components/RestaurantOwner/RestaurantDashboard/OrderSection.vue';
import OrderRequest from '@/Components/RestaurantOwner/RestaurantDashboard/OrderRequest.vue';

// Restaurant status toggle
const restaurantStatus = ref(true);
const toggleRestaurantStatus = () => {
    restaurantStatus.value = !restaurantStatus.value;
};

// Current orders
const currentOrders = ref([
    {
        id: 1,
        user: "John Doe",
        location: "New York",
        totalPrice: 45.99,
        image: "https://plus.unsplash.com/premium_photo-1676466901396-125e349e847e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2RzfGVufDB8fDB8fHww",
        accepted: true,
    },
    {
        id: 2,
        user: "Jane Smith",
        location: "California",
        totalPrice: 30.49,
        image: "https://images.unsplash.com/photo-1674555650084-ae4c3dcfe79c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2RzfGVufDB8fDB8fHww",
        accepted: false,
    },
    {
        id: 3,
        user: "Michael Johnson",
        location: "Texas",
        totalPrice: 52.0,
        image: "https://images.unsplash.com/photo-1516865131505-4dabf2efc692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
        accepted: true,
    },
    {
        id: 4,
        user: "Emily Davis",
        location: "Florida",
        totalPrice: 28.0,
        image: "https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
        accepted: false,
    },
    {
        id: 5,
        user: "David Wilson",
        location: "Illinois",
        totalPrice: 60.0,
        image: "https://plus.unsplash.com/premium_photo-1673809798817-457be4736fa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
        accepted: true,
    },
]);

console.log('hello');

// Filter accepted and rejected orders using computed properties
const acceptedOrders = computed(() => currentOrders.value.filter(order => order.accepted));
const rejectedOrders = computed(() => currentOrders.value.filter(order => !order.accepted));
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
