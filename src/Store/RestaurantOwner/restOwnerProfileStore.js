// src/store/modules/ownerProfile.js
import { restaurantApi } from '@/Services/RestaurantOwner/restaurantOwnerProfService'; // Ensure the path is correct

const state = {
  ownerDetails: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_OWNER_DETAILS(state, details) {
    state.ownerDetails = details; // Directly set owner details to the state
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchOwnerProfile({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null); // Reset error before fetching
    try {
      const response = await restaurantApi.fetchOwnerDetails(); // Call the service to fetch details
      commit('SET_OWNER_DETAILS', response); // Commit the owner details from the response data
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch owner details'); // Commit any error
    } finally {
      commit('SET_LOADING', false); // Reset loading state
    }
  },

  // Action to update owner profile
  async updateOwnerProfile({ commit }, profileData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null); // Reset error before updating
    try {
      const response = await restaurantApi.updateOwnerProfile(profileData); // Call the service to update details
      commit('SET_OWNER_DETAILS', response); // Update state with the new owner details
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update owner profile'); // Commit any error
    } finally {
      commit('SET_LOADING', false); // Reset loading state
    }
  },
};

const getters = {
  ownerDetails: (state) => state.ownerDetails,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
