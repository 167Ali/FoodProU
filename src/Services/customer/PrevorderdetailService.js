import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_H;
const getToken = () => {
    const token = localStorage.getItem('token'); // The token is stored with the key 'token'
    console.log('JWT Token:', token); // Log the token to the console
    return token;
};
// Fetch order details
export const getOrderDetails = async (order_id) => {
    try {
        const token = getToken(); // Get the token from localStorage
      
        const response = await axios.get(`${API_BASE_URL}/api/orders/${order_id}/details`, {  // Corrected string interpolation
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the headers
            }
            
     });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error); // Updated error message to be more specific
        throw error;
    }
};


// Download order invoice
export const downloadOrderInvoice = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${customerId}/invoice`, {
            responseType: 'blob', // For binary data
        });

        // Validate if it's a PDF file
        const contentType = response.headers['content-type'];
        if (contentType !== 'application/pdf') {
            throw new Error('Unexpected content type, expected PDF');
        }

        // Process Blob for download
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Invoice_${customerId}.pdf`); // Set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Cleanup
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading invoice:', error);
        throw error;
    }
};