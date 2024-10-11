// // // services/authService.js

// import axios from 'axios';

// const API_BASE_URL = process.env.VITE_API_BASE_URL; // Backend API URL
// //12,

// export const addCategory = async (category) => {
//     try {

//         const response = await axios.post(`${API_BASE_URL}/auth/login`, { category });
//         return response.data;
//     } catch (error) {

//         throw new Error(error.response.data.message || 'Login failed');

//     }
// };


// // // Function for user login

// // export const login = async (email, password) => {

// //     try {

// //         const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

// //         return response.data;

// //     } catch (error) {

// //         throw new Error(error.response.data.message || 'Login failed');

// //     }

// // };

// // // Function for reset password

// // export const resetPassword = async (email) => {

// //     try {

// //         const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email });

// //         return response.data;

// //     } catch (error) {

// //         throw new Error(error.response.data.message || 'Reset password failed');

// //     }

// // };