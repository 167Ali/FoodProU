import { api } from '@/Services/Customer/addToCart';

const state = {
  cartItems: [],
};

const mutations = {
  ADD_TO_CART(state, item) {
    state.cartItems.push(item);
  },
  // You can add more mutations for cart operations (remove, clear, etc.)
};

const actions = {
  async addToCart({ commit }, item) {
    try {
      const response = await api.addToCart(item);
      commit('ADD_TO_CART', response); // Assuming the response contains the added item
      return response;
    } catch (error) {
      // Handle error appropriately (e.g., show a notification)
      throw error;
    }
  },
};

const getters = {
  cartItems: (state) => state.cartItems,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};