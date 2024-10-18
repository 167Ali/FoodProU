<template>
  <div class="restaurant-card">
    <img :src="logoUrl" alt="Restaurant Logo" v-if="logoUrl" />
    <div class="restaurant-details">
      <h3>{{ name }}</h3>
      <p>Cuisine: {{ cuisine }}</p>
      <p>Opening: {{ openingTime }}</p>
      <p>Closing: {{ closingTime }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  logoPath: String, // Ensure this prop is defined correctly
  cuisine: String,
  openingTime: String,
  closingTime: String
});

// Define logoUrl using logoPath correctly
const logoUrl = props.logoPath ? `http://192.168.15.90:8000/${props.logoPath}` : '/path/to/default-logo.png';
</script>

<style scoped>
.restaurant-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
}

.restaurant-details {
  text-align: center;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
