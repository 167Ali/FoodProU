// store/customer/ResturantDetailsStore.js

import {
  fetchRestaurants as fetchRestaurantsService,
  fetchDeals as fetchDealsService,
  searchRestaurants as searchRestaurantsService,
  fetchRestaurantMenus as fetchRestaurantMenusService,
  addFavoriteRestaurant as addFavoriteRestaurantService,
  removeFavoriteRestaurant as removeFavoriteRestaurantService,
} from '../../Services/customer/ResturantDetailsService';

const state = () => ({
  restaurants: [],
  deals: [],
  searchResults: [],
  restaurantMenus: {},
});

const getters = {
  allRestaurants: (state) => state.restaurants,
  allDeals: (state) => state.deals,
  searchResults: (state) => state.searchResults,
  getRestaurantMenus: (state) => state.restaurantMenus,
  
};

const actions = {
  async fetchRestaurants({ commit }, filters = {}) {
    try {
      // Build query parameters based on filters
      const params = {};

      // Quick Filters
      if (filters.quickFilters) {
        if (filters.quickFilters.ratings) {
          params.rating = 4;
        }
        if (filters.quickFilters.deals) {
          params.deal = 1;
        }
      }

      // Selected Cuisines
      if (filters.selectedCuisines && filters.selectedCuisines.length > 0) {
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

  async fetchRestaurantMenus({ commit }, restaurantId) {
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
  async addFavoriteRestaurant({ commit }, restaurantId) {
    try {
      const data = await addFavoriteRestaurantService(restaurantId);
      if (data.status === 200) {
        commit('addFavoriteRestaurant', restaurantId);
      } else {
        console.error('Failed to add favorite restaurant', data);
      }
    } catch (error) {
      console.error('Error adding favorite restaurant:', error);
    }
  },
  async removeFavoriteRestaurant({ commit }, restaurantId) {
    try {
      const data = await removeFavoriteRestaurantService(restaurantId);
      if (data.status === 200) {
        commit('removeFavoriteRestaurant', restaurantId);
      } else {
        console.error('Failed to remove favorite restaurant', data);
      }
    } catch (error) {
      console.error('Error removing favorite restaurant:', error);
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
  setRestaurantMenus(state, menus) {
    state.restaurantMenus = menus;
  },
  addFavoriteRestaurant(state, restaurantId) {
    if (!state.favoriteRestaurants.includes(restaurantId)) {
      state.favoriteRestaurants.push(restaurantId);
    }
  },
  removeFavoriteRestaurant(state, restaurantId) {
    state.favoriteRestaurants = state.favoriteRestaurants.filter((id) => id !== restaurantId);
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
