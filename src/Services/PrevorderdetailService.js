import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite uses 'VITE_' prefix for env variables

export const getOrderDetails = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export const downloadOrderInvoice = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${customerId}/invoice`, {
            responseType: 'blob', // Important for handling binary data
        });

        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${customerId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading invoice:', error);
        throw error;
    }
};
