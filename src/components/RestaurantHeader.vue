<template>
    <div class="restaurant-header">
      <div class="logo-container">
        <img class="restaurant-logo" :src="logo" alt="Restaurant Logo" />
      </div>
      <div class="restaurant-info">
        <h1>{{ name }}</h1>
        <p class="categories">{{ categories.join(' • ') }}</p>
        <p class="details">Rs. {{ deliveryFee }} delivery • Min. order Rs. {{ minOrder }}</p>
        <p class="rating">⭐ {{ rating }}</p>
      </div>
      <button class="favourite-btn">❤️ Add to Favourites</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import img from '../assets/logo.jpeg';
  
  const logo = ref(img)
  const name = ref('Burger Lab — Johar Town South')
  const categories = ref(['Burgers', 'Fast Food', 'Western', 'Shakes'])
  const deliveryFee = ref(79)
  const minOrder = ref(249)
  const rating = ref(4.6)
  </script>
  
  <style scoped>
  .restaurant-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #edefee;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container {
    flex-shrink: 0;
  }
  
  .restaurant-logo {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .restaurant-info {
    flex-grow: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .restaurant-info h1 {
    font-size: 1.8rem;
    margin: 0;
    color: #333;
  }
  
  .categories {
    font-size: 1rem;
    color: #888;
    margin: 5px 0;
  }
  
  .details {
    font-size: 1rem;
    color: #666;
  }
  
  .rating {
    font-size: 1.1rem;
    font-weight: bold;
    color: #ffcc00;
  }
  
  .favourite-btn {
    background-color: #1a8e63;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .favourite-btn:hover {
    background-color: #01b472;
  }
  
  @media (max-width: 768px) {
    .restaurant-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .restaurant-info {
      margin-left: 0;
      margin-top: 10px;
    }
  
    .favourite-btn {
      align-self: center;
      margin-top: 10px;
    }
  }
  </style>
  