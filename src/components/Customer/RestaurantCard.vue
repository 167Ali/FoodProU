<template>
    <div class="card m-2">
        <div class="position-relative">
            <img :src="image" class="card-img-top" alt="Restaurant Image">
            <div class="position-absolute top-0 start-0 m-2 d-flex flex-column">
                <span class="badge bg-success mb-1" v-for="(discount, index) in discounts" :key="index">
                    {{ discount }}
                </span>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-cuisine text-muted mb-1">{{ cuisine }}</p>
            <div class="card-info d-flex justify-content-between align-items-center mb-2">
                <span class="rating">⭐ {{ rating }} ({{ reviews }}+)</span>
                <span class="price">{{ price }}</span>
            </div>
            <div class="delivery-info text-muted">
                <span>{{ deliveryTime }} min</span> · <span>{{ deliveryFee }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    image: String,
    name: String,
    cuisine: String,
    rating: Number,
    reviews: Number,
    price: String,
    deliveryTime: Number,
    deliveryFee: String,
    discounts: Array
});
</script>

<style scoped>
.card {
    max-width: 550px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0.5rem;
}

.card:hover {
    transform: scale(1.02);
    cursor: pointer;
}

.card-img-top {
    height: 180px;
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

.discount-tag {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
}

.card-title {
    font-size: 1.125rem;
    font-weight: bold;
}

.card-cuisine {
    font-size: 0.875rem;
}

.rating,
.price {
    font-size: 0.875rem;
}

.delivery-info {
    font-size: 0.875rem;
}
</style>
