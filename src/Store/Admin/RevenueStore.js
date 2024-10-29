// store/Admin/RevenueStore.js

import { fetchRevenueReports } from '../../Services/Admin/RevenueService';

const state = () => ({
  revenueDetails: null,
  orderVolumeDetails: null,
});

const getters = {
  getRevenueDetails: (state) => state.revenueDetails,
  getOrderVolumeDetails: (state) => state.orderVolumeDetails,
};

const actions = {
  async fetchRevenueReports({ commit }) {
    try {
      const response = await fetchRevenueReports();
      if (response.status === 200) {
        commit('setRevenueDetails', response.data.data.revenue_details);
        commit('setOrderVolumeDetails', response.data.data.order_volume_details);

      } else {
        console.error('Failed to fetch revenue reports', response);
      }
    } catch (error) {
      console.error('Error fetching revenue reports:', error);
    }
  },
};

const mutations = {
  setRevenueDetails(state, revenueDetails) {
    state.revenueDetails = revenueDetails;
  },
  setOrderVolumeDetails(state, orderVolumeDetails) {
    state.orderVolumeDetails = orderVolumeDetails;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
