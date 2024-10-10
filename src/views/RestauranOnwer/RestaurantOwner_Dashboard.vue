<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<div class="dashboard-container d-flex">
    <!-- Sidebar -->
    <nav class="sidebar bg-light d-flex flex-column align-items-center">
        <img src="https://via.placeholder.com/50" alt="Logo" class="my-4" />
        <ul class="nav flex-column text-center">
            <li class="nav-item mb-3">
                <a href="#" class="nav-link text-dark">
                    <i class="fas fa-home fs-4"></i>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="#" class="nav-link text-dark">
                    <i class="fas fa-chart-line fs-4"></i>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="#" class="nav-link text-dark">
                    <i class="fas fa-utensils fs-4"></i>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="#" class="nav-link text-dark">
                    <i class="fas fa-cogs fs-4"></i>
                </a>
            </li>
        </ul>
    </nav>

    <!-- Main Content -->
    <div class="main-content flex-grow-1 p-4">
        <!-- Top Bar -->
        <div class="top-bar d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
                <img src="https://via.placeholder.com/100x50" alt="Restaurant Logo" class="restaurant-logo me-3" />
                <input type="text" class="form-control search-input" placeholder="Search for orders..." />
            </div>
            <button @click="toggleRestaurantStatus" class="btn btn-toggle">
                {{ restaurantStatus ? 'Deactivate' : 'Activate' }}
            </button>
        </div>

        <!-- Banner -->
        <div class="banner mb-4 p-4 d-flex justify-content-between align-items-center">

            <!-- Banner -->
            <div class="banner mb-4">
                <img src="../../assets/bg3.gif" alt="Banner" class="img-fluid rounded" />
            </div>

        </div>

        <!-- Accepted and Rejected Orders Section -->
        <div class="orders-section">
            <!-- Accepted Orders -->
            <div class="accepted-orders mb-4">
                <h4>Accepted Orders</h4>
                <div class="accepted-orders-container d-flex flex-wrap">
                    <div class="card accepted-order-card mb-3 d-flex" v-for="order in acceptedOrders" :key="order.id">
                        <img :src="order.image" class="card-img" alt="Order Image" />
                        <div class="card-body">
                            <h5>{{ order.user }}</h5>
                            <p>{{ order.location }}</p>
                            <div class="order-details d-flex justify-content-between align-items-center">
                                <h5 class="text-price">$ {{ order.totalPrice }}</h5>
                                <button class="btn btn-order">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rejected Orders -->
            <div class="rejected-orders mb-4">
                <h4>Rejected Orders</h4>
                <div class="rejected-orders-container d-flex flex-wrap">
                    <div class="card rejected-order-card mb-3 d-flex" v-for="order in rejectedOrders" :key="order.id">
                        <img :src="order.image" class="card-img" alt="Order Image" />
                        <div class="card-body">
                            <h5>{{ order.user }}</h5>
                            <p>{{ order.location }}</p>
                            <div class="order-details d-flex justify-content-between align-items-center">
                                <h5 class="text-price">$ {{ order.totalPrice }}</h5>
                                <button class="btn btn-order">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Right Sidebar (Current Orders) -->
    <div class="right-sidebar p-4">
        <h4>Current Orders</h4>
        <div class="current-order-card card mb-3" v-for="order in currentOrders" :key="order.id">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <i class="fas fa-map-marker-alt fs-3 me-3"></i>
                    <div>
                        <h5>{{ order.user }}</h5>
                        <p class="small text-muted">{{ order.location }}</p>
                    </div>
                </div>
                <div class="order-total text-end">
                    <h5 class="text-price">$ {{ order.totalPrice }}</h5>
                </div>
                <button class="btn btn-order">View</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref
} from "vue";

export default {
    name: "App",
    setup() {
        const restaurantStatus = ref(true);
        const toggleRestaurantStatus = () => {
            restaurantStatus.value = !restaurantStatus.value;
        };

        // Dummy data
        const currentOrders = ref([{
                id: 1,
                user: "John Doe",
                location: "New York",
                totalPrice: 45.99
            },
            {
                id: 2,
                user: "Jane Smith",
                location: "California",
                totalPrice: 30.49
            },
            {
                id: 3,
                user: "Michael Johnson",
                location: "Texas",
                totalPrice: 52.00
            },
        ]);

        const acceptedOrders = ref([{
                id: 1,
                user: "John Doe",
                location: "New York",
                totalPrice: 45.99,
                image: 'https://via.placeholder.com/100'
            },
            {
                id: 2,
                user: "Jane Smith",
                location: "California",
                totalPrice: 30.49,
                image: 'https://via.placeholder.com/100'
            },
        ]);

        const rejectedOrders = ref([{
            id: 3,
            user: "Michael Johnson",
            location: "Texas",
            totalPrice: 52.00,
            image: 'https://via.placeholder.com/100'
        }, ]);

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
/* Color scheme */
:root {
    --main-color: #00754a;
    --secondary-color: #ffffff;
    --text-color: #333;
    --price-color: #ff9800;
}

/* Dashboard Layout */
.dashboard-container {
    display: flex;
    min-height: 100vh;
    background-color: var(--secondary-color);
}

/* Sidebar */
.sidebar {
    width: 80px;
    background-color: var(--main-color);
    min-height: 100vh;
    border-right: 1px solid #e3e3e3;
}

.sidebar img {
    width: 50px;
    height: 50px;
}

.nav-link {
    color: var(--secondary-color);
}

/* Main Content */
.main-content {
    flex-grow: 1;
}

/* Top Bar */
.top-bar {
    background-color: var(--secondary-color);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.restaurant-logo {
    width: 100px;
    height: 50px;
}

.search-input {
    width: 250px;
}

/* Banner */
.banner img {
    width: 1000px;
    height: 250px;
    object-fit:fill;
    border-radius: 10px;
}

.btn-toggle {
    background-color: var(--main-color);
    color: var(--secondary-color);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
}

.btn-toggle:hover {
    background-color: #005939;
}

/* Banner */
.banner {
    background-color: var(--main-color);
    border-radius: 20px;
    color: var(--secondary-color);
}

/* Cards */
.card {
    display: flex;
    background-color: var(--secondary-color);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: none;
}

.card-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
}

.card-body {
    flex-grow: 1;
    padding: 10px;
}

.order-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text-price {
    color: var(--price-color);
    font-weight: bold;
}

.btn-order {
    background-color: var(--main-color);
    color: var(--secondary-color);
    border-radius: 20px;
}

.btn-order:hover {
    background-color: #005939;
}

/* Current Orders */
.current-order-card .order-total {
    text-align: right;
}

@media (max-width: 768px) {
    .search-input {
        width: 180px;
    }

    .dashboard-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        height: 60px;
        flex-direction: row;
        justify-content: space-around;
    }

    .right-sidebar {
        width: 100%;
    }
}
</style>
