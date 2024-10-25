// src/Services/RestaurantService.js
import axios from 'axios';

// Create an axios instance for API calls
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this is set correctly in your environment variables
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is available in localStorage
  },
});

// Export API methods for restaurant operations
export const restaurantApi = {
  // Fetch owner's details and restaurant details
  async fetchOwnerDetails() {
    try {
      const response = await apiClient.get('/api/restaurant-details'); // Use the correct endpoint
      return response.data; // Return only the data
    } catch (error) {
      console.error('Error fetching owner details:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  },

  // Update owner's profile details
  async updateOwnerProfile(profileData) {
    try {
      const response = await apiClient.post('/api/update-restaurant', profileData);
      return response.data; // Return the response data after successful update
    } catch (error) {
      console.error('Error updating owner profile:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  },
};
