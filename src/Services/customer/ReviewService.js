// service/customer/ReviewService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Set this environment variable

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};