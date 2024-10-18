import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL_H;
console.log('API Base URL:', baseURL); // To check if baseURL is being logged correctly

// Function to get the token from local storage or other secure storage
const getToken = () => {
  return localStorage.getItem('token'); // Ensure the token is stored in localStorage or similar
};

const favService = {
  getFavoriteRestaurants: () => {
    const token = getToken();
    console.log('Token being sent:', token); // Log the token to ensure it's being retrieved
    

    return axios.get(`${baseURL}/api/customers/favorites`, {
      headers: {
        Authorization: `Bearer ${token}` // Attach the token in the Authorization header
      }
    });
  }
};

export default favService;
