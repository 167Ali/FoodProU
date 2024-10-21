// src/store/customer/ResturantRevinue.js

import { fetchRevenueData } from '../../Services/Resturant/resturantRevenue';

const state = () => ({
  totalRevenue: [],
  revenueDates: [],
  orderVolume: [],
  orderDates: [],
  loading: false,
  successMessage: '',
  errorMessage: '',
});

const getters = {
  getTotalRevenue: (state) => state.totalRevenue,
  getRevenueDates: (state) => state.revenueDates,
  getOrderVolume: (state) => state.orderVolume,
  getOrderDates: (state) => state.orderDates,
  isLoading: (state) => state.loading,
  successMessage: (state) => state.successMessage,
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  async fetchRevenueData({ commit }) {
    commit('FETCH_REVENUE_REQUEST');
    try {
      const data = await fetchRevenueData(); // Call the service function
      if (data.status === 200) {
        const revenueData = data.data;

        // Commit mutations to update the state
        commit('SET_TOTAL_REVENUE', revenueData.total_revenue.revenue);
        commit('SET_REVENUE_DATES', revenueData.total_revenue.created_at);
        commit('SET_ORDER_VOLUME', revenueData.order_volume.order_count);
        commit('SET_ORDER_DATES', revenueData.order_volume.order_date);
        commit('FETCH_REVENUE_SUCCESS', data.message || 'Revenue data fetched successfully.');
      } else {
        commit('FETCH_REVENUE_FAILURE', data.message || 'Failed to fetch revenue data');
      }
    } catch (error) {
      commit('FETCH_REVENUE_FAILURE', error.message || 'An error occurred while fetching revenue data.');
    }
  },
};

const mutations = {
  FETCH_REVENUE_REQUEST(state) {
    state.loading = true;
    state.successMessage = '';
    state.errorMessage = '';
  },
  FETCH_REVENUE_SUCCESS(state, message) {
    state.loading = false;
    state.successMessage = message;
  },
  FETCH_REVENUE_FAILURE(state, error) {
    state.loading = false;
    state.errorMessage = error;
  },
  SET_TOTAL_REVENUE(state, revenue) {
    state.totalRevenue = revenue;
  },
  SET_REVENUE_DATES(state, dates) {
    state.revenueDates = dates;
  },
  SET_ORDER_VOLUME(state, volume) {
    state.orderVolume = volume;
  },
  SET_ORDER_DATES(state, dates) {
    state.orderDates = dates;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
