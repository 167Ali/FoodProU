<template>
    <div class="restaurant-item">
      <img :src="restaurant.image" alt="Restaurant Image" class="restaurant-image" />
      <div class="restaurant-details">
        <h3 class="restaurant-name">{{ restaurant.name }}</h3>
        <p class="restaurant-info">{{ restaurant.info }}</p>
        <p class="delivery-time">Delivery in {{ restaurant.deliveryTime }}</p>
        <div class="rating">
          <span class="rating-stars">⭐ {{ restaurant.rating }}</span>
          <span class="rating-count">{{ restaurant.reviews }}+ ratings</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    restaurant: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .restaurant-item {
    display: flex;
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    margin-bottom: 20px;
  }
  
  .restaurant-item:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .restaurant-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .restaurant-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .restaurant-name {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0;
  }
  
  .restaurant-info {
    color: #888;
    font-size: 0.9rem;
    margin: 5px 0;
  }
  
  .delivery-time {
    font-size: 0.9rem;
    color: #00754A;
    margin-bottom: 10px;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .rating-stars {
    font-size: 1rem;
    color: #FFD700;
  }
  
  .rating-count {
    color: #888;
    font-size: 0.9rem;
  }
  </style>
  