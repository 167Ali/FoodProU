// store/Admin/RevenueStore.js

import { fetchRevenueReports } from '../../Services/admin/RevenueService';

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
      const data = await fetchRevenueReports();
      console.log('Data received in store:', data); // Log data

      if (data.status === 200) {
        commit('setRevenueDetails', data.data.revenue_details);
        commit('setOrderVolumeDetails', data.data.order_volume_details);
      } else {
        console.error('Failed to fetch revenue reports', data);
      }
    } catch (error) {
      console.error('Error fetching revenue reports:', error);
    }
  },
};

const mutations = {
  setRevenueDetails(state, revenueDetails) {
    state.revenueDetails = revenueDetails;
    console.log('Revenue Details set in state:', state.revenueDetails); // Log state
  },
  setOrderVolumeDetails(state, orderVolumeDetails) {
    state.orderVolumeDetails = orderVolumeDetails;
    console.log('Order Volume Details set in state:', state.orderVolumeDetails); // Log state
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
