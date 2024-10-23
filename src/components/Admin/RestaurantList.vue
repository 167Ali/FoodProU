<template>
  <div class="restaurant-list">
    <!-- Show loading spinner if data is still loading -->
    <div v-if="loading">Loading...</div>

    <!-- Show error message if there is an error -->
    <div v-if="error">{{ error }}</div>

    <!-- Display the restaurants once the data is loaded -->
    <RestaurantItem
      v-for="item in restaurants"
      :key="item.id"
      :restaurant="item"
      class="restaurant-item"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';  // Vuex store
import RestaurantItem from './RestaurantItem.vue';

// Use the Vuex store to access state and actions
const store = useStore();

const restaurants = computed(() => store.getters['restaurants/getRestaurants']);
const loading = computed(() => store.getters['restaurants/isLoading']);
const error = computed(() => store.getters['restaurants/getError']);

// Load restaurants when the component is mounted
onMounted(() => {
  store.dispatch('restaurants/loadRestaurants');
});
</script>

<style scoped>
.restaurant-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .restaurant-list {
    grid-template-columns: 1fr; /* Show one card per row on mobile */
  }
}

.restaurant-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.restaurant-item:hover {
  transform: scale(1.02); /* Slight scale on hover */
}

.restaurant-item img {
  width: 100%;
  height: 100%;
}

.restaurant-item .content {
  padding: 16px;
}

@media (min-width: 992px) {
  .restaurant-item {
    flex-direction: row; /* Adjust layout for larger screens if needed */
  }
}
</style>
