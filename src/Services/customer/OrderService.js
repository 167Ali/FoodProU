import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite uses 'VITE_' prefix for env variables

export const getActiveOrders = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/active-order`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error;
    }
};

export const getPastOrders = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/history`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
};