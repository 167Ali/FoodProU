<template>
  <div class="favorite-restaurants">
    <FavoriteRestaurantCard
      v-for="restaurant in favoriteRestaurants"
      :key="restaurant.id"
      :name="restaurant.name"
      :logoPath="restaurant.logo_path"
      :cuisine="restaurant.cuisine"
      :openingTime="restaurant.opening_time"
      :closingTime="restaurant.closing_time"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import FavoriteRestaurantCard from '../../components/Customer/FavRestCard.vue'; // Ensure the correct path to the card component

const store = useStore();
const favoriteRestaurants = computed(() => store.state.favoriteStore.favoriteRestaurants);

onMounted(() => {
  store.dispatch('favoriteStore/getFavoriteRestaurants').then(() => {
    console.log('Favorite Restaurants:', favoriteRestaurants.value);
  });
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
