// Services/Admin/RevenueService.js

import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Replace with your actual base URL variable

// Function to fetch revenue reports
export const fetchRevenueReports = async () => {
  const token = localStorage.getItem('token'); // Retrieve token if needed
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurant-revenues`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token if authentication is required
      },
    });
    console.log("admin revenue response:", response);
    
    return response; // Return the full Axios response
  } catch (error) {
    throw error;
  }
};
