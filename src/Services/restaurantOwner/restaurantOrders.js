// src/Services/restaurantOwner/restaurantOrders.js

// src/Services/restaurantOwner/restaurantOrders.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const restaurantOrderServices = {
  async getOrderSummary() {
    try {
      const response = await apiClient.get('/api/restaurant/orders'); // Fetch all orders
      return response.data; // Return the data
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error; // Rethrow for handling in the calling code
    }
  },

  // Optional: If you need to update an order's status
  async updateOrderStatus(orderId, status) {
    try {
      const response = await apiClient.patch(`/api/restaurant/orders/${orderId}`, { status }); // Update order status
      return response.data; // Return updated order data
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error; // Rethrow for handling in the calling code
    }
  },
};

export default restaurantOrderServices;
