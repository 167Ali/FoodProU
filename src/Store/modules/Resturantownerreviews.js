// store/modules/reviews.js
//import { getOwnerReviews } from '../../Services/customer/PrevorderdetailService';

const state = {
    reviews: [],
    loading: false,
    error: null,
};

const mutations = {
    SET_REVIEWS(state, reviews) {
        state.reviews = reviews;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

const actions = {
    async fetchOwnerReviews({ commit }, restaurantId) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        try {
            const reviews = await getOwnerReviews(restaurantId);
            commit('SET_REVIEWS', reviews);
        } catch (error) {
            commit('SET_ERROR', error.message);
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