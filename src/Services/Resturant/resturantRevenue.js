// src/Services/resturant/resturantRevinue.js

import axios from 'axios';

// Use Vite's way of accessing environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Backend API URL

export const fetchRevenueData = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the JWT token
    const response = await axios.get(`${API_BASE_URL}/api/my-revenue`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log('fetchRevenueData response', response);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch revenue data');
  }
};
