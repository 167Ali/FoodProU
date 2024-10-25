import axios from 'axios';

// Get the token from localStorage and set up authorization headers
const tokenLocalStorage = localStorage.getItem('token');
 // Check if the token exists
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };

// Base URL for the API
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Function to get order details with authorization headers
export const getOrderDetails = async () => {
  try {
    // Make the API call with authorization headers
    console.log('Fetching order details...');
    const response = await axios.get(`${baseURL}/api/checkout-order-summary`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json', // Set content type
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error('Error fetching order summary:', error);
    throw error;
  }
};

// Function to place an order with authorization headers and checkout data
export const placeOrderAPI = async (checkoutData) => {
  try {
    // Make the POST request with checkout data and authorization headers
    const response = await axios.post(
      `${baseURL}/api/checkout`,
      checkoutData,
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json', // Ensure content type
        },
      }
    );
    console.log('Order placed:', response.data);
    return response;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
