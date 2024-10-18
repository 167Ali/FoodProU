import { submitReview } from '@/Services/customer/ReviewService'

const state = {
  loading: false,
  error: null,
  successMessage: null,
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  successMessage: (state) => state.successMessage,
};

const actions = {
  async submitCustomerReview({ commit }, reviewData) {
    commit('setLoading', true);
    commit('setError', null);
    commit('setSuccessMessage', null);

    try {
      const data = await submitReview(reviewData);
      commit('setSuccessMessage', 'Review submitted successfully!');
      console.log('Review submission response:', data);
    } catch (error) {
      commit('setError', 'Failed to submit the review. Please try again.');
    } finally {
      commit('setLoading', false);
    }
  },
};

const mutations = {
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, message) {
    state.error = message;
  },
  setSuccessMessage(state, message) {
    state.successMessage = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
