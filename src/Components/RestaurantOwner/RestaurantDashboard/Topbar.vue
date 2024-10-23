<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="top-bar d-flex justify-content-between align-items-center mb-4">
      <!-- Left section: Restaurant Name -->
      <h2 class="restaurant-name me-3">Burger Lab</h2>
  
      <!-- Center section: Search Input -->
      <div class="search-container">
        <input type="text" class="form-control search-input" placeholder="Search for orders..." />
      </div>
  
      <!-- Right section: Toggle Button -->
      <button @click="$emit('toggle-status')" class="btn btn-toggle">
        {{ restaurantStatus ? "Deactivate" : "Activate" }}
      </button>
    </div>
  </template>
  
 <script setup>
   import { defineProps } from 'vue';
   // Define props using Composition API
   defineProps({
     restaurantStatus: {
       type: Boolean,
       required: true,
     },
   });
 </script>
  
<style scoped>
  /* Top Bar Container */
  .top-bar {
    padding: 15px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .restaurant-name {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(to right, #ff6b6b, #ffd93d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  
  /* Centering the Search Input */
  .search-container {
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
  }
  
  /* Search Input */
  .search-input {
    border-radius: 25px;
    border: 1px solid #ced4da;
    padding: 10px 15px;
    width: 100%;
    max-width: 450px;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.2);
  }
  
  /* Toggle Button */
  .btn-toggle {
    background-color: #00754a;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    font-weight: 600;
  }
  
  .btn-toggle:hover {
    background-color: #26af7d;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .restaurant-name {
      font-size: 2.5rem;
      margin-left: -35px;
      margin-bottom: 35px;
    }
  
    .search-input {
      width: 100%;
    }
    .search-container
    {
        padding-left: 15px;
        margin-right: 25px;
        margin-left: -75px;
    }
    .btn-toggle
    {
        margin-left: -65px;
    }
  }
</style>