// store/customer/ResturantDetailsStore.js

import {
  fetchRestaurants as fetchRestaurantsService,
  fetchDeals as fetchDealsService,
  searchRestaurants as searchRestaurantsService,
  fetchRestaurantMenus as fetchRestaurantMenusService, // Added
} from '../../Services/Customer/resturantDetailsService';

const state = () => ({
  restaurants: [],
  deals: [],
  searchResults: [],
  restaurantMenus: {}, // Added
});

const getters = {
  allRestaurants: (state) => state.restaurants,
  allDeals: (state) => state.deals,
  searchResults: (state) => state.searchResults,
  getRestaurantMenus: (state) => state.restaurantMenus, // Added
};

const actions = {
  async fetchRestaurants({ commit }, filters = {}) {
    try {
      // Build query parameters based on filters
      const params = {};

      // Quick Filters
      if (filters.quickFilters) {
        if (filters.quickFilters.ratings) {
          // For 'Ratings 4+', set rating=4
          params.rating = 4;
        }
        if (filters.quickFilters.deals) {
          // Backend expects 'deal' as boolean or integer (1 for true)
          params.deal = 1;
        }
      }

      // Selected Cuisines
      if (filters.selectedCuisines && filters.selectedCuisines.length > 0) {
        // Assuming the backend accepts multiple cuisines as comma-separated values
        params.cuisine = filters.selectedCuisines.join(',');
      }

      // Sort Option
      if (filters.sortOption && filters.sortOption !== 'relevance') {
        params.sort = filters.sortOption;
      }

      console.log('Fetching restaurants with params:', params);

      const data = await fetchRestaurantsService(params);

      console.log('Filtered data', data.data);

      if (data.status === 200) {
        commit('setRestaurants', data.data);
      } else {
        console.error('Failed to fetch restaurants', data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  },

  async fetchDeals({ commit }) {
    try {
      const data = await fetchDealsService();
      if (data.status === 200) {
        commit('setDeals', data.data);
      } else {
        console.error('Failed to fetch deals', data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  },

  async searchRestaurants({ commit }, searchTerm) {
    try {
      const data = await searchRestaurantsService(searchTerm);
      if (data.status === 200) {
        commit('setSearchResults', data.data);
        console.log(data.data);
      } else {
        console.error('Failed to search restaurants', data);
      }
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
  },

  async fetchRestaurantMenus({ commit }, restaurantId) { // Added
    try {
      const data = await fetchRestaurantMenusService(restaurantId);
      if (data.status === 200) {
        commit('setRestaurantMenus', data.data);
      } else {
        console.error('Failed to fetch restaurant menus', data);
      }
    } catch (error) {
      console.error('Error fetching restaurant menus:', error);
    }
  },
};

const mutations = {
  setRestaurants(state, restaurants) {
    state.restaurants = restaurants;
  },
  setDeals(state, deals) {
    state.deals = deals;
  },
  setSearchResults(state, results) {
    state.searchResults = results;
  },
  setRestaurantMenus(state, menus) { // Added
    state.restaurantMenus = menus;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
