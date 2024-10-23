import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Set your base URL here

export const fetchRestaurants = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/show-restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("biwhebcjwebcfjwn de",response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
