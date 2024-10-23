// services/customer/addToCart.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_H,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const api = {

  async addToCart(passwordData) {  // Ensure this method is correctly implemented
    const response = await apiClient.post('/api/add-to-cart', passwordData);
    return response.data;
  },
};