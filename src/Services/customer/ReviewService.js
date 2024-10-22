// /src/Services/customer/ReviewService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H;

// Retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to submit a review
export const submitReview = async (reviewData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/api/customers/feedback`, {
      order_id: reviewData.order_id,
      rating: reviewData.rating,
      review: reviewData.review,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
        'Content-Type': 'application/json', // Ensure content-type is JSON
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error submitting review:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error for handling in Vuex or elsewhere
  }
};