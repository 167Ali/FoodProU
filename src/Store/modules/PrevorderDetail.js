import { getOrderDetails, downloadOrderInvoice } from '../../Services/Customer/prevOrderDetailService';

const state = {
  order: null,
  error: null,
  loading: false,
};

const getters = {
  order: (state) => state.order,
  error: (state) => state.error,
  loading: (state) => state.loading,
};

const actions = {
  async fetchOrderDetails({ commit }, customerId) {
    commit('setLoading', true);
    try {
      const order = await getOrderDetails(customerId);
      commit('setOrder', order);
    } catch (error) {
      commit('setError', error.message);
    } finally {
      commit('setLoading', false);
    }
  },
  async downloadInvoice({ commit }, customerId) {
    try {
      await downloadOrderInvoice(customerId);
    } catch (error) {
      commit('setError', error.message);
      throw error;
    }
  },
};

const mutations = {
  setOrder(state, order) {
    state.order = order;
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};