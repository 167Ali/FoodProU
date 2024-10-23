import { getActiveOrders, getPastOrders } from '../../Services/Customer/orderService';

const state = {
  activeOrders: [],
  pastOrders: [],
  loadingActive: false,
  loadingPast: false,
};

const mutations = {
  SET_ACTIVE_ORDERS(state, orders) {
    state.activeOrders = orders;
  },
  SET_PAST_ORDERS(state, orders) {
    state.pastOrders = orders;
  },
  SET_LOADING_ACTIVE(state, loading) {
    state.loadingActive = loading;
  },
  SET_LOADING_PAST(state, loading) {
    state.loadingPast = loading;
  },
};

const actions = {
  async fetchActiveOrders({ commit }, customerId) {
    commit('SET_LOADING_ACTIVE', true);
    try {
      const activeOrders = await getActiveOrders(customerId);
      commit('SET_ACTIVE_ORDERS', activeOrders);
    } catch (error) {
      console.error('Error fetching active orders:', error);
    } finally {
      commit('SET_LOADING_ACTIVE', false);
    }
  },
  async fetchPastOrders({ commit }, customerId) {
    commit('SET_LOADING_PAST', true);
    try {
      const pastOrders = await getPastOrders(customerId);
      commit('SET_PAST_ORDERS', pastOrders);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    } finally {
      commit('SET_LOADING_PAST', false);
    }
  },
};

const getters = {
  activeOrders: (state) => state.activeOrders,
  pastOrders: (state) => state.pastOrders,
  loadingActive: (state) => state.loadingActive,
  loadingPast: (state) => state.loadingPast,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};