<template>
  <div class="restaurant-card">
    <div class="logo-container">
      <img :src="logoUrl" alt="Restaurant Logo" v-if="logoUrl" />
    </div>
    <div class="restaurant-details">
      <h3>{{ name }}</h3>
      <p class="cuisine fw-bold"><i class="fas fa-utensils"></i> {{ cuisine }}</p>
      <div class="time-info">
        <p class="fw-bold"><i class="fas fa-door-open"></i> Opening:- <span class="time fw-light">{{ openingTime }}</span></p>
        <p class="fw-bold"><i class="fas fa-door-closed"></i> Closing:- <span class="time fw-light">{{ closingTime }}</span></p>
      </div>
    </div>
    <button class="view-more-btn">Explore</button>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  logoPath: String,
  cuisine: String,
  openingTime: String,
  closingTime: String
});

const logoUrl = props.logoPath ? `http://192.168.15.90:8000/${props.logoPath}` : '/path/to/default-logo.png';
</script>

<style scoped>
.restaurant-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;  
  max-width: 320px; /* Reduced card size */
  height: 380px;   /* Adjusted height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  align-items: flex-start;  /* Align content to the left */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 16px;
}

.restaurant-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.logo-container {
  width: 100%;
  height: 120px; /* Adjusted to rectangular size */
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.restaurant-details {
  text-align: left; /* Left align text inside the details */
  width: 100%;  /* Ensure it takes full width */
}

h3 {
  font-size: 1.4rem; /* Reduced font size */
  margin: 8px 0;
  color: #00754A;
  font-weight: bold;
}

.cuisine {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.cuisine i {
  margin-right: 6px;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem; /* Slightly reduced font size */
  color: #555;
}

.time-info p {
  display: flex;
  align-items: center;
}

.time-info i {
  margin-right: 6px;
}

.view-more-btn {
  background-color: #00754A;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;  /* Reduced padding */
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  align-self: flex-start;  /* Align the button to the left */
}

.view-more-btn:hover {
  background-color: #005f3c;
  transform: scale(1.05);
}
</style>
