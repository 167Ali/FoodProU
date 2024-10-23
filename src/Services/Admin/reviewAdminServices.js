import axios from 'axios';

// Base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Using _H as in your example

// Function to retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to fetch both reviews and restaurants from the API
export const fetchReviewsAndRestaurants = async () => {
  try {
    const token = getToken(); // Get the token
    const response = await axios.get(`${API_BASE_URL}/api/restaurant-reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Returning the data directly
    return response.data; // API response structure assumed as: { status, message, data: { reviews, restaurants } }
  } catch (error) {
    console.error('Error fetching reviews and restaurants:', error.response ? error.response.data : error.message);
    throw error; // Re-throw for handling in Vuex
  }
};