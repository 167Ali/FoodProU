<template>
    <div class="container py-3 mt-3 main-body">
      <div class="row g-3 container">
        <!-- Dropdown Menu -->
        <div class="col-md-4 container">
          <select id="restaurantFilter" class="form-select" @change="filterByRestaurant($event)">
            <option value="all">All Restaurants</option>
            <!-- Dynamically populate options from API -->
            <option value="restaurant1">Restaurant 1</option>
            <option value="restaurant2">Restaurant 2</option>
            <!-- Add more restaurant options as needed -->
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const filterByRestaurant = (event) => {
    const selectedRestaurant = event.target.value;
    console.log('Selected restaurant:', selectedRestaurant);
    // Handle filtering by restaurant here
  };
  </script>
  
  <style scoped>
  
  
  .form-select {
    border-radius: 15px; /* Matching border-radius for a smooth look */
    padding: 10px; /* Padding for better usability */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for dropdown */
    background-color: #f9f9f9; /* Light background color for dropdown */
    border: none; /* Remove default border for cleaner appearance */
  }
  
  @media (max-width: 768px) {
    .form-select {
      width: 100%; /* Make dropdown take full width on mobile */
    }
  }
  </style>

  <style scoped>
  .main-body{
    max-width: 1200px;
  }
</style>
  