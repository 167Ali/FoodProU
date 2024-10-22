<template>
  <div class="restaurant-header" v-if="restaurant">
    <div class="logo-container">
      <img class="restaurant-logo" :src="logo" alt="Restaurant Logo" />
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
      <span v-if="isFavorite">❤️ Remove from Favourites</span>
      <span v-else>Add to Favourites</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import SeeReviews from '../Customer/SeeReviews.vue';
import Moreinfo from '../Customer/Moreinfo.vue';

const props = defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const logo = computed(() => props.restaurant?.logo_url || '');
const name = computed(() => props.restaurant?.name || '');
const categories = computed(() => props.restaurant ? [props.restaurant.cuisine] : []);
const rating = computed(() => props.restaurant?.average_rating || 0);
const openingTime = computed(() => props.restaurant?.opening_time || '');
const closingTime = computed(() => props.restaurant?.closing_time || '');

const isFavorite = computed(() => store.getters['favoriteStore/isFavorite'](props.restaurant.id));

const toggleLike = () => {
  if (isFavorite.value) {
    store.dispatch('favoriteStore/removeFavorite', props.restaurant.id);
  } else {
    store.dispatch('favoriteStore/addFavorite', props.restaurant.id);
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
