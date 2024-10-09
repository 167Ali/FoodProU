<template>
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Customer Name</th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>View Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in filteredOrders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.customerName }}</td>
                    <td>{{ order.restaurant }}</td>
                    <td>{{ order.date }}</td>
                    <td>{{ order.status }}</td>
                    <td>{{ order.price }}</td>
                    <td><button class="btn btn-info">View Details</button></td>
                </tr>
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
</script>

<style scoped>
.table-responsive {
    max-height: 400px;
}
</style>
