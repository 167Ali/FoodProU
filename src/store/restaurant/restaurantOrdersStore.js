import { reactive, toRefs } from 'vue';
import OrderService from '../../Services/resturant/restaurantOrdersService';

const state = reactive({
  currentOrders: [],
  acceptedOrders: [],
  rejectedOrders: [],
});

const mutations = {
  SET_CURRENT_ORDERS(orders) {
    state.currentOrders = orders;
  },
  SET_ACCEPTED_ORDERS(orders) {
    state.acceptedOrders = orders;
  },
  SET_REJECTED_ORDERS(orders) {
    state.rejectedOrders = orders;
  },
};

const actions = {
  async fetchOrders() {
    try {
      const orders = await OrderService.getOrders();
      mutations.SET_CURRENT_ORDERS(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  async fetchAcceptedOrders() {
    try {
      const acceptedOrders = await OrderService.getAcceptedOrders();
      mutations.SET_ACCEPTED_ORDERS(acceptedOrders);
    } catch (error) {
      console.error('Error fetching accepted orders:', error);
    }
  },
  async fetchRejectedOrders() {
    try {
      const rejectedOrders = await OrderService.getRejectedOrders();
      mutations.SET_REJECTED_ORDERS(rejectedOrders);
    } catch (error) {
      console.error('Error fetching rejected orders:', error);
    }
  },
};

// Create the useOrderStore hook
export function useOrderStore() {
  return {
    ...toRefs(state),
    fetchOrders: actions.fetchOrders,
    fetchAcceptedOrders: actions.fetchAcceptedOrders,
    fetchRejectedOrders: actions.fetchRejectedOrders,
  };
}