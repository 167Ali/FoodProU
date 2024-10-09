<template>
    <div class="category-section mb-5 mt-2">
      <CategoryIcon :icon="['fas', 'map-marker-alt']" label="Nearest" />
      <CategoryIcon :icon="['fas', 'star']" label="Best Seller" />
      <CategoryIcon :icon="['fas', 'utensils']" label="New Food" />
      <CategoryIcon :icon="['fas', 'tags']" label="Discount" />
      <CategoryIcon :icon="['fas', 'apple-alt']" label="Healthy Choices" />
      <CategoryIcon :icon="['fas', 'ice-cream']" label="Desserts" />
      <CategoryIcon :icon="['fas', 'leaf']" label="Vegetarian" />
      <CategoryIcon :icon="['fas', 'pepper-hot']" label="Spicy Delights" />
    </div>
  </template>
  
  <script setup>
  import CategoryIcon from './CategoryIcon.vue'; // Adjust the path if needed
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { 
    faUtensils, 
    faMapMarkerAlt, 
    faStar, 
    faTags, 
    faAppleAlt, 
    faIceCream, 
    faLeaf, 
    faPepperHot 
  } from '@fortawesome/free-solid-svg-icons'; 
  
  // Add icons to the library within this component
  library.add(
    faUtensils, 
    faMapMarkerAlt, 
    faStar, 
    faTags, 
    faAppleAlt, 
    faIceCream, 
    faLeaf, 
    faPepperHot
  );
  </script>
  
  <style scoped>
  /* Container for the category icons */
  .category-section {
    display: flex;
    justify-content: space-around; /* Spread items horizontally */
    align-items: center; /* Vertically center items */
    padding: 10px 20px;
    border-radius: 10px;
    overflow-x: auto; /* Enable horizontal scrolling if needed */
    white-space: nowrap; /* Prevent wrapping */
  }
  
  /* Mobile-friendly adjustments */
  @media (max-width: 768px) {
    .category-section {
      padding: 10px;
      justify-content: flex-start; /* Left-align items on smaller screens */
      gap: 10px;
    }
  }
  </style>
  