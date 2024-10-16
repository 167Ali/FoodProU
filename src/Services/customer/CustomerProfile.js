// services/customer/customerProfile.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_H,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const api = {
  async getProfile() {
    const response = await apiClient.get('/api/customers/profile');  // Update with the correct endpoint
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await apiClient.patch('/api/customers/edit-profile', profileData);
    return response.data;
  },
};
