// src/Services/RestaurantService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch restaurant details based on the provided token.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} - The restaurant details.
 * @throws {Error} - Throws an error if the fetch fails.
 */
const fetchRestaurantDetails = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurant-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the data for further processing
  } catch (error) {
    throw new Error('Error fetching restaurant details: ' + error.message);
  }
};

export { fetchRestaurantDetails };
