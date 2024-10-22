<!-- src/views/Customer/RestaurantPage.vue -->
<template>
  <div>
    <LoginHeader />
    <div class="restaurant-header">
      <!-- Pass restaurantData as a prop to RestaurantHeader -->
      <RestaurantHeader :restaurant="restaurantData" />
      <hr />
      <Deals />
    </div>
    <div>
      <CategoryNavbar />
    </div>
    <PageFooter />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex'; // Import useStore to access the store
import LoginHeader from '@/Components/HeaderFooter/LoginHeader.vue';
import RestaurantHeader from '@/Components/HeaderFooter/RestaurantHeader.vue';
import Deals from '@/Components/Customer/Deals.vue';
import CategoryNavbar from '@/Components/Customer/CategoryNavbar.vue';
import PageFooter from '@/Components/HeaderFooter/PageFooter.vue';

// Define props to receive the id
const props = defineProps({
  id: {
    type: String, // or Number, depending on your id type
    required: true,
  },
});

const store = useStore();

const restaurantData = ref(null); // Added: to store restaurant data

onMounted(() => {
  console.log('Restaurant ID:', props.id);
  // Dispatch an action to fetch restaurant menus
  store
    .dispatch('resturantDetails/fetchRestaurantMenus', props.id)
    .then(() => {
      // Access the fetched data from the store
      const menus = store.getters['resturantDetails/getRestaurantMenus'];
      console.log('Menus data:', menus);

      // Extract the restaurant data
      restaurantData.value = menus.restaurant;

      // Log the restaurant data to verify
      console.log('Restaurant data:', restaurantData.value);
    })
    .catch((error) => {
      console.error('Error fetching menus:', error);
    });
});
</script>

<style scoped>
.restaurant-header {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.restaurant-header hr {
  margin: 0;
  color: rgb(128, 127, 127);
  opacity: 0.1;
  font-weight: lighter;
  /* font-size: 1px; */
}
</style>
