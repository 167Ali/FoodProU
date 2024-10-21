// store/customer/ResturantDetailsStore.js

import axios from 'axios';

const state = () => ({
  restaurants: [],
  deals: [],
  searchResults: [],
});

const getters = {
  allRestaurants: (state) => state.restaurants,
  allDeals: (state) => state.deals,
  searchResults: (state) => state.searchResults,
};

const actions = {
  async fetchRestaurants({ commit }) {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await axios.get('http://192.168.15.90:8000/api/restaurants', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
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
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.15.90:8000/api/deals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.status === 200) {
        commit('setDeals', response.data.data);
      } else {
        console.error('Failed to fetch deals', response);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  },
  async searchRestaurants({ commit }, searchTerm) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://192.168.15.90:8000/api/search-restaurant?search_term=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
