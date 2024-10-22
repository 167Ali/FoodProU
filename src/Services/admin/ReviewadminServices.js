import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reviews`);
    return response.data; // Adjust according to your API response
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants`); // Adjust this endpoint
    return response.data; // Adjust according to your API response
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};