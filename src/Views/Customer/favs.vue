<template>
  <div class="favorite-restaurants">
    <Loader v-if="isLoading" />
    <FavoriteRestaurantCard v-for="restaurant in favoriteRestaurants" :key="restaurant.id" :restaurantId="restaurant.id"
      :name="restaurant.name" :logoPath="restaurant.logo_path" :cuisine="restaurant.cuisine"
      :openingTime="restaurant.opening_time" :closingTime="restaurant.closing_time" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import FavoriteRestaurantCard from '@/Components/Customer/FavRestCard.vue'; // Ensure the correct path to the card component
import Loader from '@/Components/OtherComponents/Loader.vue'; // Ensure the correct path to the loader component

const store = useStore();
const favoriteRestaurants = computed(() => store.state.favoriteStore.favoriteRestaurants);
const isLoading = ref(true); // State to track loading status

onMounted(async () => {
  try {
    await store.dispatch('favoriteStore/getFavoriteRestaurants');
  } catch (error) {
    console.error('Error fetching favorite restaurants:', error);
  } finally {
    isLoading.value = false; // Set loading to false after data is fetched
  }
});
</script>

<style scoped>
.favorite-restaurants {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>

<style scoped>
.favorite-restaurants {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
