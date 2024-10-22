<template>
    <div class="dashboard-container d-flex">
        <Sidebar />
        <div class="main-content">
            <TopBar :restaurant-status="restaurantStatus" @toggle-status="toggleRestaurantStatus" />
            <Banner />
            <OrdersSection :accepted-orders="acceptedOrders" :rejected-orders="rejectedOrders" />
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

<script>
import { ref, computed, onMounted } from "vue";
import { useOrderStore } from '@/store/restaurant/restaurantOrdersStore'; // Adjust the path as necessary
import Sidebar from '@/components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
import TopBar from '@/components/RestaurantOwner/RestaurantDashboard/Topbar.vue';
import Banner from '@/components/RestaurantOwner/RestaurantDashboard/Banner.vue';
import OrdersSection from '@/components/RestaurantOwner/RestaurantDashboard/OrderSection.vue';

export default {
    name: "Dashboard",
    components: {
        Sidebar,
        TopBar,
        Banner,
        OrdersSection,
    },
    setup() {
        const { currentOrders, acceptedOrders, rejectedOrders, fetchOrders } = useOrderStore();
        const restaurantStatus = ref(true);

        const toggleRestaurantStatus = () => {
            restaurantStatus.value = !restaurantStatus.value;
        };

        // Fetch orders when component is mounted
        onMounted(() => {
            fetchOrders();
        });

        return {
            restaurantStatus,
            toggleRestaurantStatus,
            currentOrders,
            acceptedOrders,
            rejectedOrders,
        };
    },
};
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