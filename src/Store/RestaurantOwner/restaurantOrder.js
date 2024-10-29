// src/store/modules/restaurantOrders.js
import restaurantOrderServices from '@/Services/Resturant/restaurantOrdersService';
const state = {
  isModalOpen: false,
  selectedOrder: null,

  
  currentOrders: [],
  acceptedOrders: [],
  rejectedOrders: [],
  orders: []
};

const mutations = {

  SET_MODAL_OPEN(state, isOpen) {
    state.isModalOpen = isOpen;
  },
  SET_SELECTED_ORDER(state, order) {
    state.selectedOrder = order;
  },


  SET_ORDERS(state, orders) {
    state.orders = orders;
    // Organize orders based on their status
    state.currentOrders = orders.filter(order => order.status === 'in_progress');
    state.acceptedOrders = orders.filter(order => order.status === 'delivered');
    state.rejectedOrders = orders.filter(order => order.status === 'canceled');
  },
  UPDATE_ORDER_STATUS(state, { orderId, status }) {
    // Find the order and update its status
    const order = state.orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
    }
    // Reorganize orders after updating
    state.currentOrders = state.orders.filter(order => order.status === 'in_progress');
    state.acceptedOrders = state.orders.filter(order => order.status === 'delivered');
    state.rejectedOrders = state.orders.filter(order => order.status === 'canceled');
  },
};

const actions = {

  openModal({ commit }, order) {
    commit('SET_SELECTED_ORDER', order);
    commit('SET_MODAL_OPEN', true);
  },
  closeModal({ commit }) {
    commit('SET_MODAL_OPEN', false);
    commit('SET_SELECTED_ORDER', null);
  },


  async fetchOrders({ commit }) {
    try {
      const response = await restaurantOrderServices.fetchOrders();
      commit('SET_ORDERS', response.data.data); // Assuming the orders are in `data.data`
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  },

  async updateOrderStatus({ commit }, { orderId, status }) {
    try {
      await restaurantOrderServices.updateOrderStatus(orderId, status); // Call the service to update
      commit('UPDATE_ORDER_STATUS', { orderId, status }); // Update the store after successful backend update
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  },

};


const getters = {

  isModalOpen: (state) => state.isModalOpen,
  selectedOrder: (state) => state.selectedOrder,


  ordersByStatus: (state) => (status) => {
    return state.orders.filter(order => order.status === status); // Filter orders based on status
  },

};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};