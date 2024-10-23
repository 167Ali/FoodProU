// Services/customer/ResturantDetailsService.js

import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Replace with your actual base URL

// Function to fetch restaurants
export const fetchRestaurants = async (params = {}) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch restaurant menus
export const fetchRestaurantMenus = async (restaurantId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched restaurant menus:", response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a restaurant to favorites
export const addFavoriteRestaurant = async (restaurantId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/customers/add-favorite-restaurant`,
      { restaurant_id: restaurantId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Function to remove a restaurant from favorites
export const removeFavoriteRestaurant = async (restaurantId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/customers/del-favorite-restaurant`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          restaurant_id: restaurantId
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

