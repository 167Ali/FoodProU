import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Base URL from environment variable

const getToken = () => {
  const token = localStorage.getItem('token'); 
  console.log('JWT Token:', token); 
  return token;
};

// Function to submit a review
export const submitReview = async (reviewData) => {
  try {
    const token = getToken(); 
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};
