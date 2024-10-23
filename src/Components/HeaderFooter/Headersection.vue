<template>
  <div class="header-container">
    <div class="dropdown-container">
      <select id="restaurantFilter" class="form-select" @change="filterByRestaurant($event)">
        <option value="all">All Restaurants</option>
        <option value="restaurant1">Restaurant 1</option>
        <option value="restaurant2">Restaurant 2</option>
      </select>
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
.header-container {
  display: flex;
  justify-content: center;
  /* Center dropdown */
  margin-bottom: 20px;
  /* Space below header */
}

.dropdown-container {
  width: 300px;
  /* Fixed width for dropdown */
}

.form-select {
  width: 100%;
  /* Full width */
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border: none;
}</style>