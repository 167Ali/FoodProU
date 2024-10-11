// src/Services/Auth/AuthServices.js

import axios from 'axios';

// Use Vite's way of accessing environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Backend API URL

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
    console.log('authservice', response);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Reset password failed');
  }
};

export const setPassword = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reset-password`, payload);
    console.log('setPassword response', response);
    console.log("checkkkkkk");
    return response.data;
    
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Set password failed');
  }
};
