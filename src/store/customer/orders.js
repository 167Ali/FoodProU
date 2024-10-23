// 
import { getOrderDetails, placeOrderAPI } from '../../Services/customer/orderServices';

const state = {
  orderDetails: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_ORDER_DETAILS(state, orderDetails) {
    state.orderDetails = orderDetails;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },

};

const actions = {
  async getOrderDetails({ commit }) {
    commit('SET_LOADING', true);

    try {
    
      const response = await getOrderDetails();
      commit('SET_ORDER_DETAILS', response.data.data);
    } catch (error) {
      commit('SET_ERROR', error);
      console.error('Error fetching order details:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async placeOrder({ commit }, checkoutData) {
    try {
      await placeOrderAPI(checkoutData);
      // Handle success (e.g., redirect to order confirmation)
    } catch (error) {
      commit('SET_ERROR', error);
      console.error('Error placing order:', error);
    }
  },
};

const getters = {
  orderDetails: (state) => state.orderDetails,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};


// 