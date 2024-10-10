<template>
  <div class="restaurant-header">
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
    <button class="favourite-btn" @click="toggleLike">
      <span v-if="isLiked" style="color: red">❤️ Added to Favourites</span> <!-- Show heart only when liked -->
      <span v-else>Add to Favourites</span> <!-- Text when heart is not shown -->
    </button>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import img from '../assets/logo.jpeg';
import SeeReviews from '../Customer/SeeReviews.vue'
import Moreinfo from '../Customer/Moreinfo.vue'
const isLiked = ref(false)

// Function to toggle the liked state
const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const logo = ref(img)
const name = ref('Burger Lab — Johar Town South')
const categories = ref(['Burgers', 'Fast Food', 'Western', 'Shakes'])
const deliveryFee = ref(79)
const minOrder = ref(249)
const rating = ref(4.6)
</script>

<style scoped>
.restaurant-header {

  justify-content: space-between;

  padding: 20px;


}

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

.restaurant-info {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Add flexbox to rating-row */
.rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Add space between elements */
}

.rating {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff8c00;

}

.favourite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;
  margin-top: -50px;
}

.favourite-btn:hover {
  background-color: #f0f0f0;
  color: #222;
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