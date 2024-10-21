<!-- src/components/Customer/RestaurantCard.vue -->
<template>
  <div class="card m-2">
    <div class="position-relative">
      <img :src="(restaurant.image)" class="card-img-top" alt="Restaurant Image">
      <!-- If there are any discounts, display them -->
      <div
        class="position-absolute top-0 start-0 m-2 d-flex flex-column"
        v-if="restaurant.discount && restaurant.discount > 0"
      >
        <span class="badge bg-success mb-1">
          {{ restaurant.discount }}% OFF
        </span>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.name }}</h5>
      <p class="card-cuisine text-muted mb-1">{{ restaurant.cuisine }}</p>
      <div class="card-info d-flex justify-content-between align-items-center mb-2">
        <span class="rating">{{ restaurant.rating }} ★</span>
      </div>
      <div class="delivery-info text-muted">
        <span>{{ restaurant.deliveryTime }}</span> ·
        <span>{{ formatDeliveryFee(restaurant.deliveryFee) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/path/to/default/image.jpg'; // Replace with your default image path
  }
  return `http://192.168.15.67:8000${imagePath}`;
};

const formatDeliveryFee = (fee) => {
  return fee === 0 ? 'Free Delivery' : `Rs.${fee} Delivery Fee`;
};
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
