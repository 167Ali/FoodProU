<template>
    <div class="table-responsive">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Customer Name</th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>View Details</th>
                </tr>
            </thead>
            <tbody>
                <transition-group name="fade" mode="out-in">
                    <tr v-for="order in filteredOrders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ order.customerName }}</td>
                        <td>{{ order.restaurant }}</td>
                        <td>{{ formatDate(order.date) }}</td>
                        <td :class="`status-${order.status.toLowerCase().replace(' ', '-')}`">
                            <strong>{{ order.status }}</strong>
                        </td>
                        <td>{{ formatCurrency(order.price) }}</td>
                        <td>
                            <button class="btn btn-details" @click="viewDetails(order)">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                        </td>
                    </tr>
                </transition-group>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    filteredOrders: {
        type: Array,
        required: true,
    },
});

// Format date function
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format currency function
const formatCurrency = (price) => {
    return `Rs ${price.toFixed(2)}`; 
};

// View details function
const viewDetails = (order) => {
    console.log('Viewing details for:', order);
};
</script>

<style scoped>
.table-responsive {
    max-height: 500px;
    /* Increased height for better visibility */
    overflow-y: auto;
    /* Add vertical scrolling */
    margin: 20px;
    /* Margin around the table */
    padding: 40px;
    border-radius: 10px;
    /* Rounded corners */
    background-color: #fdfdfd;
    
}

.table {
    width: 100%;
    /* Full width */
    border-collapse: collapse;
    /* Remove double borders */
}

thead th {
    background-color: #00754A;
    /* Soft blue header background */
    color: #ffffff;
    /* Header text color */
    padding: 15px;
    /* Padding for better spacing */
    text-align: left;
    /* Align text to left */
    font-weight: 600;
    /* Slightly bolder header text */
    border-bottom: 2px solid #00754A;
    /* Stronger border for emphasis */
}

tbody tr {
    transition: background-color 0.2s;
    /* Smooth transition for hover effect */
}

tbody tr:hover {
    background-color: #e8f0fe;
    /* Light blue on hover */
}

table td {
    padding: 12px;
    /* Padding for cells */
    border-bottom: 1px solid #ddd;
    /* Light border between rows */
    vertical-align: middle;
    /* Center align cells vertically */
    font-size: 14px;
    /* Base font size */
}

.status-in-progress {
    color: #ffa000;
    /* Orange for in-progress */
}

.status-completed {
    color: #388e3c;
    /* Green for completed */
}

.status-cancelled {
    color: #d32f2f;
    /* Red for cancelled */
}

.btn-details {
    display: inline-flex;
    align-items: center;
    background-color: #00754A;
    /* Button color */
    color: white;
    /* Button text color */
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    /* Button padding */
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    /* Transition for hover */
    font-size: 14px;
    /* Button font size */
}

.btn-details i {
    margin-right: 5px;
    /* Space between icon and text */
}

.btn-details:hover {
    background-color: #00754adc;
    /* Darker blue on hover */
    transform: scale(1.05);
    /* Scale up button on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    table {
        font-size: 12px;
        /* Smaller font for mobile */
    }

    .btn-details {
        font-size: 12px;
        /* Smaller button font */
    }

    thead th,
    tbody td {
        padding: 10px;
        /* Smaller padding for compactness */
    }
}

/* Animation styles */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>