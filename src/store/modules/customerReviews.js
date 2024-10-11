// store/modules/reviews.js
import { submitReview } from '../../services/customer/ReviewService';

const state = {
  reviews: [],
  loading: false,
  error: null,
};

const getters = {
  reviews: (state) => state.reviews,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  ADD_REVIEW(state, review) {
    state.reviews.push(review);
  },
};

const actions = {
  async submitCustomerReview({ commit }, reviewData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await submitReview(reviewData);
      commit('ADD_REVIEW', response);
      alert('Review submitted successfully!');
    } catch (error) {
      commit('SET_ERROR', 'Failed to submit the review');
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};