<!-- src/views/Customer/DashboardResturantPage.vue -->
<template>
  <router-view></router-view>
  <LoginHeader />
  
  <div class="row me-xl-5 me-lg-2">
    <div class="d-none d-lg-block col-lg-3">
      <DashboardFilter @filterChanged="applyFilters" />
    </div>
    <div class="col-lg-9">
      <Searchbar />
      <discounts />
      <Cuisines />

      <div class="d-lg-none">
        <!-- Different placement of filter for non-lg screens -->
        <DashboardFilter @filterChanged="applyFilters" />
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" v-for="(restaurant, index) in restaurants" :key="index">
          <router-link :to="{ name: 'RestaurantPage', params: { id: restaurant.id } }" class="card-link">
            <RestaurantCard :restaurant="restaurant" />
          </router-link>
        </div>
      </div>
    </div>
    <PageFooter />
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import RestaurantCard from '../../components/Customer/RestaurantCard.vue';
  import DashboardFilter from '../../components/Customer/DashboardFilter.vue';
  import Searchbar from '../../components/OtherComponents/Searchbar.vue';
  import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
  import PageFooter from '../../components/HeaderFooter/PageFooter.vue';
  import discounts from '@/components/Customer/discounts.vue';
  import Cuisines from '@/components/Customer/Cuisines.vue';
  
  const store = useStore();
  
  // Get restaurants from the store
  const restaurants = computed(() => store.getters['resturantDetails/allRestaurants']);
  
  // Function to apply filters
  const applyFilters = (filters) => {
    console.log('Filters applied:', filters);
    store.dispatch('resturantDetails/fetchRestaurants', filters);
  };
  
  // Fetch all restaurants on mount
  onMounted(() => {
    store.dispatch('resturantDetails/fetchRestaurants');
  });
  </script>
  
  <style scoped></style>
  
