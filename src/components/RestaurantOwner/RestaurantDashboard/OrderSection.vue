<template>
    <div class="orders-section">
        <!-- Accepted Orders -->
        <div class="accepted-orders mb-4">
            <h4 class="section-title">Accepted Orders</h4>
            <div class="orders-container">
                <OrderCard v-for="order in acceptedOrders" :key="order.id" :order="order" :is-accepted="true" />
            </div>
        </div>

        <!-- Rejected Orders -->
        <div class="rejected-orders mb-4">
            <h4 class="section-title">Rejected Orders</h4>
            <div class="orders-container">
                <OrderCard v-for="order in rejectedOrders" :key="order.id" :order="order" :is-accepted="false" />
            </div>
        </div>
    </div>
</template>
  
<script>
import OrderCard from './OrderCard.vue';

export default {
    name: "OrdersSection",
    components: {
        OrderCard,
    },
    props: {
        acceptedOrders: {
            type: Array,
            required: true,
        },
        rejectedOrders: {
            type: Array,
            required: true,
        },
    },
};
</script>
  
<style scoped>
/* General Orders Section Styles */


/* Title Styling */
.section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #343a40;
}

/* Orders Container for Flex Wrapping */
.orders-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

/* Styling specific to the Accepted and Rejected Orders sections */
.accepted-orders .section-title {
    color: #28a745;
}

.rejected-orders .section-title {
    color: #dc3545;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .orders-container {
        flex-direction: column;
        gap: 10px;
    }

    .section-title {
        font-size: 1.3rem;
    }
}
</style>