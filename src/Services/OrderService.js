import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite uses 'VITE_' prefix for env variables

export const getActiveOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/active-orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error;
    }
};

export const getPastOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/past-orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
};