<template>
  <!-- Render content only if restaurant data is available -->
  <div class="restaurant-header" v-if="restaurant">
    <div class="logo-container">
      <img class="restaurant-logo" :src="(logo)" alt="Restaurant Logo" />
    </div>
    <div class="restaurant-info">
      <h1>{{ name }}</h1>
      <p class="categories">{{ categories.join(' • ') }}</p>
      <!-- Adjusted details -->
      <p class="details">Opening Hours: {{ openingTime }} - {{ closingTime }}</p>

      <!-- New container for rating, SeeReviews, and Moreinfo -->
      <div class="rating-row">
        <p class="rating">⭐ {{ rating }}</p>
        <SeeReviews />
        <Moreinfo />
      </div>
    </div>
    <button class="favourite-btn" @click="toggleLike">
      <span v-if="isLiked" style="color: red">❤️ Added to Favourites</span>
      <span v-else>Add to Favourites</span>
    </button>
  </div>
</template>


<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import SeeReviews from '@/Components/Customer/SeeReviews.vue';
import Moreinfo from '@/Components/Customer/Moreinfo.vue';

const props = defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});

// Compute properties based on the passed restaurant data
const logo = computed(() => props.restaurant?.logo_url || '');
const name = computed(() => props.restaurant?.name || '');
const categories = computed(() => props.restaurant ? [props.restaurant.cuisine] : []);
const rating = computed(() => props.restaurant?.average_rating || 0);
const openingTime = computed(() => props.restaurant?.opening_time || '');
const closingTime = computed(() => props.restaurant?.closing_time || '');

// Placeholder values for deliveryFee and minOrder if not available
const deliveryFee = ref(0); // Update as needed
const minOrder = ref(0); // Update as needed

const isLiked = ref(false);

// Function to toggle the liked state
const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

// Function to get the full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/path/to/default/image.jpg'; // Replace with your default image path
  }
  return imagePath.startsWith('http')
    ? imagePath
    : `${import.meta.env.VITE_API_BASE_URL}${imagePath}`; // Use your API base URL
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

/* Add flexbox to rating-row */
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
