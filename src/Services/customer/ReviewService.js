// /src/Services/customer/OrderService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H;

// Retrieve the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

// Function to submit a review
export const submitReview = async (reviewData) => {
  try {
    const token = getToken();
    console.log('Review Data:', reviewData);  // Log the review data to check
    const response = await axios.post(`${API_BASE_URL}/api/customers/feedback`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error; // Re-throw the error for handling in Vuex or elsewhere
  }
};