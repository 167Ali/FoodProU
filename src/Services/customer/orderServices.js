import axios from 'axios';

// Get the token from localStorage and set up authorization headers
const tokenLocalStorage = localStorage.getItem('token');
console.log('Token from localStorage:', tokenLocalStorage); // Check if the token exists
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };

// Base URL for the API
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getOrderDetails = async () => {
  try {
    // Make the API call with authorization headers
    console.log('order ');
    const response = await axios.get(`${baseURL}/api/checkout-order-summary`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json', // Set content type
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching order summary:', error);
    throw error;
  }
};

export const placeOrderAPI = (checkoutData) => {
  return axios.post('/api/checkout', checkoutData);
};
// export const updateDeliveryAddress = async (newAddress) => {
//   try {
//     const response = await axios.post(`${baseURL}/api/customers/update-address`, 
//       { address: newAddress }, 
//       { headers }
//     );
//     return response;
//   } catch (error) {
//     console.error('Error updating delivery address:', error);
//     throw error;
//   }
// };

