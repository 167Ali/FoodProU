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
            <div class="current-order-card card mb-3" v-for="order in currentOrders" :key="order.id">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img :src="order.image" alt="Order Image" class="order-image me-3" />
                        <div>
                            <h5>{{ order.user }}</h5>
                            <p class="small text-muted">{{ order.location }}</p>
                        </div>
                    </div>
                    <div class="order-total text-end">
                        <h5 class="text-price">$ {{ order.totalPrice.toFixed(2) }}</h5>
                    </div>
                    <button class="btn btn-order">View</button>
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

        // Single array for current orders
        const currentOrders = ref([
            { id: 1, user: "John Doe", location: "New York", totalPrice: 45.99, image: 'https://plus.unsplash.com/premium_photo-1676466901396-125e349e847e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2RzfGVufDB8fDB8fHww', accepted: true },
            { id: 2, user: "Jane Smith", location: "California", totalPrice: 30.49, image: 'https://images.unsplash.com/photo-1674555650084-ae4c3dcfe79c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2RzfGVufDB8fDB8fHww', accepted: false },
            { id: 3, user: "Michael Johnson", location: "Texas", totalPrice: 52.00, image: 'https://images.unsplash.com/photo-1516865131505-4dabf2efc692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: true },
            { id: 4, user: "Emily Davis", location: "Florida", totalPrice: 28.00, image: 'https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: false },
            { id: 5, user: "David Wilson", location: "Illinois", totalPrice: 60.00, image: 'https://plus.unsplash.com/premium_photo-1673809798817-457be4736fa4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHN8ZW58MHx8MHx8fDA%3D', accepted: true },
        ]);

        // Computed properties for accepted and rejected orders
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
/* Main dashboard styles here */
.dashboard-container {
    display: flex;
    min-height: 100vh;
    background-color: var(--secondary-color);
}

/* Right Sidebar */
.right-sidebar {
    width: 300px;
    /* Adjust width as necessary */
}

/* Order Image */
.order-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}
</style>