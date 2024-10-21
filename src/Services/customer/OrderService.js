import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H; // Vite uses 'VITE_' prefix for env variables

// Function to get JWT token from localStorage
const getToken = () => {
    const token = localStorage.getItem('token'); // The token is stored with the key 'token'
    console.log('JWT Token:', token); // Log the token to the console
    return token;
};

// Function to get active orders with JWT token
export const getActiveOrders = async (customerId) => {
    try {
        const token = getToken(); // Get the token from localStorage
       

        const response = await axios.get(`${API_BASE_URL}/api/orders/active-order`, {
            headers: {
                Authorization: `Bearer ${token}` // Pass the token in the headers
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error;
    }
};

// Function to get past orders with JWT token
export const getPastOrders = async (customerId) => {
    try {
        const token = getToken(); // Get the token from localStorage
      

        const response = await axios.get(`${API_BASE_URL}/api/orders/history`, {
            headers: {
                Authorization: `Bearer ${token}` // Pass the token in the headers
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
};