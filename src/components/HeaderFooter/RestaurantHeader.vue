<template>
  <div class="restaurant-header" v-if="restaurant">
    <div class="logo-container">
      <img class="restaurant-logo" :src="getImageUrl(logo)" alt="Restaurant Logo" />
    </div>
    <div class="restaurant-info">
      <h1>{{ name }}</h1>
      <p class="categories">{{ categories.join(' • ') }}</p>
      <p class="details">Opening Hours: {{ openingTime }} - {{ closingTime }}</p>
      <div class="rating-row">
        <p class="rating">⭐ {{ rating }}</p>
        <SeeReviews />
        <Moreinfo />
      </div>
    </div>
    <button class="favourite-btn" @click="toggleLike">
      <span v-if="is_favorite" style="color: red">❤️ Added to Favourites</span>
      <span v-else>Add to Favourites</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useStore } from 'vuex'; // Import useStore from Vuex
import SeeReviews from '../Customer/SeeReviews.vue';
import Moreinfo from '../Customer/Moreinfo.vue';

const props = defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});

const store = useStore(); // Initialize Vuex store

// Compute properties based on the passed restaurant data
const logo = computed(() => props.restaurant?.logo_url || '');
const name = computed(() => props.restaurant?.name || '');
const categories = computed(() => props.restaurant ? [props.restaurant.cuisine] : []);
const rating = computed(() => props.restaurant?.average_rating || 0);
const openingTime = computed(() => props.restaurant?.opening_time || '');
const closingTime = computed(() => props.restaurant?.closing_time || '');
const is_favorite = computed(() => props.restaurant?.is_favorite|| '');
// Check if the restaurant is liked (in favorites)
const isLiked = ref(false);

// Function to toggle the liked state
const toggleLike = async () => {
  if (isLiked.value) {
    await store.dispatch('resturantDetails/removeFavoriteRestaurant', props.restaurant.id);
  } else {
    await store.dispatch('resturantDetails/addFavoriteRestaurant', props.restaurant.id);
  }
  isLiked.value = !isLiked.value; // Toggle the liked state
};

// Function to get the full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/path/to/default/image.jpg'; // Replace with your default image path
  }
};
</script>




<style scoped>
.restaurant-header {
  padding: 20px;
  justify-content: space-between;
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

.restaurant-info h1 {
  font-family: 'Agrandir';
  font-weight: bolder;
}

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
