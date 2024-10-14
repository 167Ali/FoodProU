<template>
    <div class="dashboard-container d-flex">
        <Sidebar />
        <div class="main-content flex-grow-1 p-4">
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
import { ref, computed } from "vue";
import Sidebar from '../../components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
import TopBar from '../../components/RestaurantOwner/RestaurantDashboard/Topbar.vue';
import Banner from '../../components/RestaurantOwner/RestaurantDashboard/Banner.vue';
import OrdersSection from '../../components/RestaurantOwner/RestaurantDashboard/OrderSection.vue';

export default {
    name: "Dashboard",
    components: {
        Sidebar,
        TopBar,
        Banner,
        OrdersSection,
    },
    setup() {
        const restaurantStatus = ref(true);
        const toggleRestaurantStatus = () => {
            restaurantStatus.value = !restaurantStatus.value;
        };

        const currentOrders = ref([
            { id: 1, user: "John Doe", location: "New York", totalPrice: 45.99, image: 'https://plus.unsplash.com/premium_photo-1676466901396-125e349e847e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2RzfGVufDB8fDB8fHww', accepted: true },
            { id: 2, user: "Jane Smith", location: "California", totalPrice: 30.49, image: 'https://images.unsplash.com/photo-1674555650084-ae4c3dcfe79c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2RzfGVufDB8fDB8fHww', accepted: false },
            { id: 3, user: "Michael Johnson", location: "Texas", totalPrice: 52.00, image: 'https://images.unsplash.com/photo-1516865131505-4dabf2efc692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: true },
            { id: 4, user: "Emily Davis", location: "Florida", totalPrice: 28.00, image: 'https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: false },
            { id: 5, user: "David Wilson", location: "Illinois", totalPrice: 60.00, image: 'https://plus.unsplash.com/premium_photo-1673809798817-457be4736fa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: true },
        ]);

        const acceptedOrders = computed(() => currentOrders.value.filter(order => order.accepted));
        const rejectedOrders = computed(() => currentOrders.value.filter(order => !order.accepted));

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

.right-sidebar {
    width: 300px;
}

.order-list {
    max-height: 600px;
    /* Ensure container can show 4 cards and then scroll */
    overflow-y: auto;
}

/* Custom scrollbar styling (optional) */
.order-list::-webkit-scrollbar {
    width: 6px;
}

.order-list::-webkit-scrollbar-thumb {
    background-color: #3e3e3e;
    border-radius: 4px;
}

.current-order-card {
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.current-order-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(97, 210, 144, 0.2);
}

.order-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.order-user {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 3px;
}

.order-location {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 2px;
}

.text-price {
    font-size: 0.85rem;
    color: #00754a;
    font-weight: bold;
}

.btn-order {
    background-color: #00754a;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 12px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
}

.btn-order:hover {
    background-color: #3fcf9a;
    transform: scale(1.05);
}
</style>
