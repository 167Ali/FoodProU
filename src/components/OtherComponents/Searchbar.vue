<template>
    <div class="position-relative my-4">
      <div class="position-relative">
        <input
          type="text"
          class="form-control rounded-pill border-0 shadow-sm search ps-5"
          placeholder="Search for restaurants, cuisines, and dishes"
          v-model="searchQuery"
          @focus="onFocus"
          @blur="onBlur"
        />
        <i
          class="fa-solid fa-magnifying-glass fa-lg position-absolute"
          style="color: rgb(123, 123, 123); top: 50%; left: 15px; transform: translateY(-50%);"
        ></i>
      </div>
      <!-- Dropdown with search results -->
      <div class="dropdown mt-1 border-0 shadow-sm" v-if="showDropdown && searchResults.length">
        <div class="dropdown-menu show">
          <h6 class="dropdown-header">Search Results</h6>
          <div
            class="dropdown-item"
            v-for="(result, index) in searchResults"
            :key="index"
            @mousedown.prevent="selectResult(result)"
          >
            <img
              :src="getImageUrl(result.logo_path)"
              alt="Logo"
              style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; margin-right: 10px;"
            />
            {{ result.name }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import debounce from 'lodash/debounce';
  
  const store = useStore();
  
  const searchQuery = ref('');
  const showDropdown = ref(false);
  
  // Computed property to get search results from Vuex store
  const searchResults = computed(() => store.getters['resturantDetails/searchResults']);
  
  // Watch the search query and perform search
  const searchRestaurants = debounce(async (query) => {
    if (query.trim() !== '') {
      await store.dispatch('resturantDetails/searchRestaurants', query);
      showDropdown.value = true;
    } else {
      showDropdown.value = false;
    }
  }, 300); // Debounce to limit API calls
  
  watch(searchQuery, (newQuery) => {
    searchRestaurants(newQuery);
  });
  
  // Function to construct image URL
  const getImageUrl = (imagePath) => {
    return imagePath ? `http://192.168.15.90:8000/media/${imagePath}` : 'default-image-path.jpg';
  };
  
  // Handle focus and blur events
  function onFocus() {
    if (searchQuery.value.trim() !== '') {
      showDropdown.value = true;
    }
  }
  
  function onBlur() {
    setTimeout(() => {
      showDropdown.value = false;
    }, 200); // Delay to allow click event on dropdown items to register
  }
  
  // Handle selecting a search result
  function selectResult(result) {
    // You can navigate to the restaurant's page or perform any action here
    console.log('Selected restaurant:', result);
    searchQuery.value = result.name;
    showDropdown.value = false;
  }
  </script>
  
  <style scoped>
  .dropdown-menu {
    width: 100%;
    z-index: 1000;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .search {
    height: 60px;
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
  }
  </style>
  