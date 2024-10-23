import { reactive, toRefs } from 'vue';
import OrderService from '@/Services/Admin/orderService';

const state = reactive({
  orderItems: [],
  deactivatedOrders: [],
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
      const deactivated = await OrderService.getDeactivatedApplications();

      state.orderItems = data.data; // Assuming data.data is the array of orders

      // Filter orders based on status
      state.declinedOrders = state.orderItems.filter(item => item.status === 'declined');
      state.pendingOrders = state.orderItems.filter(item => item.status === 'pending');
      state.deactivatedOrders = deactivated.data;
    } catch (error) {
      state.error = 'Failed to fetch order items';
      console.error(error);
    } finally {
      state.loading = false;
    }
  },
  async acceptApplication(requestId) {
    console.log('Received requestId in acceptApplication:', requestId); // This should log the correct ID
    try {
      await OrderService.acceptApplication(requestId); // Call the service with requestId
      await actions.fetchOrderItems();
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  },
  async rejectApplication(requestId) {
    console.log('Received requestId in rejectApplication:', requestId); // This should log the correct ID
    try {
      await OrderService.rejectApplication(requestId); // Call the service with requestId
      await actions.fetchOrderItems();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  },
  async activateApplication(requestId) {
    console.log('Received requestId in activateApplication:', requestId); // This should log the correct ID
    try {
      await OrderService.activateApplication(requestId); // Call the service with requestId
      await actions.fetchOrderItems();
    } catch (error) {
      console.error('Error activating application:', error);
    }
  },
  async deactivateApplication(requestId) {
    console.log('Received requestId in deactivateApplication:', requestId); // This should log the correct ID
    try {
      await OrderService.deactivateApplication(requestId); // Call the service with requestId
      await actions.fetchOrderItems();
    } catch (error) {
      console.error('Error deactivating application:', error);
    }
  }

};

export function useOrderStore() {
  return {
    ...toRefs(state),
    fetchOrderItems: actions.fetchOrderItems,
    acceptApplication: actions.acceptApplication,
    rejectApplication: actions.rejectApplication,
    activateApplication: actions.activateApplication,
    deactivateApplication: actions.deactivateApplication,
  };
}