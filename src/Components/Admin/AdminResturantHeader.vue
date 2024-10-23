<template>
    <div class="restaurant-header">
      <div class="d-flex align-items-center">
        <div class="logo-container">
          <img class="restaurant-logo" :src="logo" alt="Restaurant Logo" />
        </div>
        <div class="restaurant-info">
          <h1>{{ name }}</h1>
          <p class="categories">{{ categories.join(' • ') }}</p>
          <p class="details">Rs. {{ deliveryFee }} delivery • Min. order Rs. {{ minOrder }}</p>
  
          <!-- New container for rating, SeeReviews, and Moreinfo -->
          <div class="rating-row">
            <p class="rating">⭐ {{ rating }}</p>
            <SeeReviews />
            <Moreinfo />
          </div>
        </div>
      </div>
  
      <!-- Toggle Switch wrapped in a separate div -->
      <div class="button-container">
        <label class="toggle-switch">
          <input type="checkbox" :checked="restaurantStatus" @change="$emit('toggle-status')" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SeeReviews from '@/Components/Customer/SeeReviews.vue';
  import Moreinfo from '@/Components/Customer/Moreinfo.vue';
  
  const logo = ref('src/assets/logo.jpeg');
  const name = ref('Burger Lab — Johar Town South');
  const categories = ref(['Burgers', 'Fast Food', 'Western', 'Shakes']);
  const deliveryFee = ref(79);
  const minOrder = ref(249);
  const rating = ref(4.6);
  
  // Props
  const props = defineProps({
    restaurantStatus: {
      type: Boolean,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Logo Styling */
  .logo-container {
    flex-shrink: 0;
    margin-left: 24px;
  }
  
  .restaurant-logo {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  /* Restaurant Info */
  .restaurant-info {
    flex-grow: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .restaurant-info h1 {
    font-family: 'Agrandir';
    font-weight: bolder;
  }
  
  .categories,
  .details {
    margin: 5px 0;
  }
  
  /* Rating Row */
  .rating-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .rating {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff8c00;
  }
  
  /* Button Container */
  .button-container {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  
  /* Toggle Switch */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  /* Checked state */
  input:checked + .slider {
    background-color: #00754a;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .restaurant-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .restaurant-info {
      margin-left: 0;
      margin-top: 10px;
    }
  
    .button-container {
      margin-left: 0;
      margin-top: 10px;
    }
  }
  </style>  