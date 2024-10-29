// Services/Admin/RevenueService.js

import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual base URL variable

// Function to fetch revenue reports
export const fetchRevenueReports = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurant-revenues`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching revenue reports:", error.response ? error.response.data : error.message);
    throw error;
  }
};