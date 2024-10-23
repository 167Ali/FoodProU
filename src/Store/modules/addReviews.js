// /src/store/modules/reviews.js
import { submitReview } from '../../Services/Customer/reviewService';
// /src/store/modules/addreviews.js


const state = {
    loading: false,
    error: null,
    successMessage: null,
};

const mutations = {
    SET_LOADING(state, isLoading) {
        state.loading = isLoading;
    },
    SET_ERROR(state, errorMessage) {
        state.error = errorMessage;
    },
    SET_SUCCESS(state, message) {
        state.successMessage = message;
    },
};

const actions = {
    async submitCustomerReview({ commit }, reviewData) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        commit('SET_SUCCESS', null);

        try {
            await submitReview(reviewData); // Use the service to submit the review
            commit('SET_SUCCESS', 'Review submitted successfully!');
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Failed to submit the review.');
        } finally {
            commit('SET_LOADING', false);
        }
    },
};

const getters = {
    loading: (state) => state.loading,
    error: (state) => state.error,
    successMessage: (state) => state.successMessage,
};

export default {
    namespaced: true, // Ensure the module is namespaced
    state,
    mutations,
    actions,
    getters,
};