<template>
  <div class="restaurant-card">
    <img :src="logoUrl" alt="Restaurant Logo" v-if="logoUrl" />
    <div class="restaurant-details">
      <h3>{{ name }}</h3>
      <p class="cuisine">Cuisine: <span>{{ cuisine }}</span></p>
      <div class="time-info">
        <p>Opening: <span class="time">{{ openingTime }}</span></p>
        <p>Closing: <span class="time">{{ closingTime }}</span></p>
      </div>
    </div>
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

// Define logoUrl using logoPath correctly
const logoUrl = props.logoPath ? `http://192.168.15.90:8000/${props.logoPath}` : '/path/to/default-logo.png';
</script>

<style scoped>
.restaurant-card {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 16px;
}

.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.restaurant-details {
  text-align: center;
}

h3 {
  font-size: 1.4rem;
  margin: 0;
  color: #00754A; /* Your specified color */
}

.cuisine {
  font-weight: 600;
  color: #555;
}

.time-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  font-style: italic;
  color: #777;
}
</style>
