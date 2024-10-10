import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const getActiveOrders = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/customers/${customerId}/active-order`);
        return response.data;
    } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error;
    }
};

export const getPastOrders = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/customers/${customerId}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
};
