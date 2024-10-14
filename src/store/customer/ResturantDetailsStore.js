// store/customer/ResturantDetailsStore.js

import axios from 'axios';

const state = () => ({
  restaurants: [],
  deals: [],
  searchResults: [], // New state variable for search results
});

const getters = {
  allRestaurants: (state) => state.restaurants,
  allDeals: (state) => state.deals,
  searchResults: (state) => state.searchResults, // New getter for search results
};

const actions = {
  async fetchRestaurants({ commit }) {
    try {
      const response = await axios.get('http://192.168.15.90:8000/api/customers/restaurants');
      if (response.status === 200 && response.data.status === 200) {
        commit('setRestaurants', response.data.data);
      } else {
        console.error('Failed to fetch restaurants', response);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  },
  async fetchDeals({ commit }) {
    try {
      const response = await axios.get('http://192.168.15.90:8000/api/customers/deals');
      if (response.status === 200 && response.data.status === 200) {
        commit('setDeals', response.data.data);
      } else {
        console.error('Failed to fetch deals', response);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  },
  // New action for searching restaurants
  async searchRestaurants({ commit }, searchTerm) {
    try {
      const response = await axios.get(
        `http://192.168.15.90:8000/api/customers/search-restaurant?search_term=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (response.status === 200 && response.data.status === 200) {
        commit('setSearchResults', response.data.data);
        console.log(response.data.data);
      } else {
        console.error('Failed to search restaurants', response);
      }
    } catch (error) {
      console.error('Error searching restaurants:', error);
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
  // New mutation to set search results
  setSearchResults(state, results) {
    state.searchResults = results;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
