import axios from 'axios';

// Base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Using _H as in your example

// Function to retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to fetch reviews with token authorization
export const fetchReviews = async () => {
  try {
    const token = getToken(); // Get the token
    const response = await axios.get(`${API_BASE_URL}/api/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching reviews:', error.response ? error.response.data : error.message);
    throw error; // Re-throw for handling in Vuex
  }
};

// Function to fetch restaurants with token authorization
export const fetchRestaurants = async () => {
  try {
    const token = getToken(); // Get the token
    const response = await axios.get(`${API_BASE_URL}/api/restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data; // Adjust according to your API response
  } catch (error) {
    console.error('Error fetching restaurants:', error.response ? error.response.data : error.message);
    throw error; // Re-throw for handling in Vuex
  }
};