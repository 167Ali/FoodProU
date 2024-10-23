import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class OrderService {
  async getOrders() {
    
    try {
      const token = localStorage.getItem('orders');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${API_BASE_URL}/api/restaurant/orders`, { headers });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getAcceptedOrders() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/restaurant/orders?status=confirmed`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching accepted orders:', error);
      throw error;
    }
  }

  async getRejectedOrders() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/restaurant/orders?status=cancelled`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching rejected orders:', error);
      throw error;
    }
  }
}

export default new OrderService();