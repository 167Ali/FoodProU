// /src/Services/RestaurantOwnerReviewsService.js
import axios from 'axios';

// Base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H;

// Retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to fetch restaurant owner reviews
export const fetchOwnerReviews = async (restaurantId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/api/my-reviews`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authorization
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the reviews data from the response
  } catch (error) {
    console.error('Error fetching restaurant reviews:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error for handling in Vuex
  }
};