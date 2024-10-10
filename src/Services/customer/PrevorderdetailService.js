import axios from 'axios';

<<<<<<< HEAD:src/Services/PrevorderdetailService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite uses 'VITE_' prefix for env variables
>>>>>>> dc494b7fd631f769a3d79f4a3933a615370fffee:src/Services/customer/PrevorderdetailService.js

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
