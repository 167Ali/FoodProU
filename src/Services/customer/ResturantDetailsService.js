// Services/customer/ResturantDetailsService.js

import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Backend API URL

// Function to fetch restaurants
export const fetchRestaurants = async (params = {}) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      params: params,
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};

// Function to fetch deals
export const fetchDeals = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/deals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};

// Function to search restaurants
export const searchRestaurants = async (searchTerm) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/search-restaurant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search_term: searchTerm,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};

// Function to fetch restaurant menus
export const fetchRestaurantMenus = async (restaurantId) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menus`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("ghdbscfkjnc", response.data.data);
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};
