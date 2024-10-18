import { reactive, toRefs } from 'vue';
import OrderService from '../../Services/admin/OrderService';

const state = reactive({
  orderItems: [],
  acceptedOrders: [],
  pendingOrders: [],
  declinedOrders: [],
  loading: false,
  error: null,
});

const actions = {
  async fetchOrderItems() {
    state.loading = true;
    state.error = null; // Reset error
    try {
      const data = await OrderService.getApplications();
      state.orderItems = data.data; // Assuming data.data is the array of orders

      // Filter orders based on status
      state.acceptedOrders = state.orderItems.filter(item => item.status === 'approved');
      state.pendingOrders = state.orderItems.filter(item => item.status === 'pending');
      state.declinedOrders = state.orderItems.filter(item => item.status === 'declined');
    } catch (error) {
      state.error = 'Failed to fetch order items';
      console.error(error);
    } finally {
      state.loading = false;
    }
  },
  async acceptApplication({ dispatch }, requestId) {
    console.log('Received requestId in acceptApplication:', requestId); // This should log the correct ID
    try {
      await OrderService.acceptApplication(requestId); // Call the service with requestId
      dispatch('fetchOrderItems'); // Refetch the order items
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  }
};

export function useOrderStore() {
  return {
    ...toRefs(state),
    fetchOrderItems: actions.fetchOrderItems,
    acceptApplication:actions.acceptApplication
  };
}