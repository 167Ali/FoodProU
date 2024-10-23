<template>
    <div class="card mb-3 order-card"
        :class="{ 'accepted-order-card': isAccepted, 'rejected-order-card': !isAccepted }">
        <img :src="order.image" class="card-img-top" :alt="`${order.user}'s order image`" />
        <div class="card-body d-flex flex-column">
            <div class="text-container">
                <h5 class="order-user">{{ order.user }}</h5>
                <p class="order-location">{{ order.location }}</p>
                <h5 class="text-price">$ {{ order.totalPrice.toFixed(2) }}</h5>
            </div>
            <button class="btn btn-order">View</button>
        </div>
    </div>
</template>

  
<script setup>
import { defineProps } from 'vue';

// Define props using Composition API
defineProps({
  order: {
    type: Object,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: true,
  },
});
</script>


<style scoped>
/* General Card Styles */
.card {
    width: 200px;
    height: 310px;
    background-color: var(--secondary-color, #fff);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border: none;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

/* Order Image Styles */
.card-img-top {
    width: 100%;
    height: 50%;
    object-fit: cover;
}

.text-container {
    text-align: center;
}

.order-user {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.order-location {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
}

.text-price {
    color: #28a745;
    font-weight: bold;
    font-size: 1.5rem;
}

/* Order Button */
.btn-order {
    background-color: #00754a;
    color: white;
    padding: 5px 15px;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    margin: 0 auto;
}

.card-body {
    padding: 5px;
}

.btn-order:hover {
    background-color: #3fcf9a;
}

/* Responsive */
@media (max-width: 768px) {
    .card {
        width: 90%;
        height: auto;
        margin-left: -20px;
    }

    .card-img-top {
        height: 150px;
    }

    .card-body {
        text-align: center;
        padding: 20px;
    }
}
</style>
