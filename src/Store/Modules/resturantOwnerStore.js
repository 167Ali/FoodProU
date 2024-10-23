// /src/store/modules/restaurantownerreviews.js
import { fetchOwnerReviews } from '@/Services/RestaurantOwner/Resturantownerreviews';


const state = {
  reviews: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
  SET_ERROR(state, errorMessage) {
    state.error = errorMessage;
  },
};

const actions = {
  async fetchOwnerReviews({ commit }, restaurantId) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const reviews = await fetchOwnerReviews(restaurantId); // Use the service to fetch reviews
      commit('SET_REVIEWS', reviews); // Commit the reviews data to the state
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to load reviews.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  reviews: (state) => state.reviews,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
