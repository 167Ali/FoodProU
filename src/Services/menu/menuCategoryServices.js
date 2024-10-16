// import axios from 'axios';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xNS4yMDU6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE3Mjg4OTIyMzEsImV4cCI6MTcyODg5NTgzMSwibmJmIjoxNzI4ODkyMjMxLCJqdGkiOiJveFRudDRDVDBBY28yS3lkIiwic3ViIjoiMzUiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.X3OTJZUzIuFdErO7N2YiaO8ccD_DTUJdGwUiCeceM7g';
// export const addMenuCategoryService = (categoryData) => {
//     let restaurantid = 12;
//     const API_URL = `${import.meta.env.VITE_API_BASE_URL}/create-menu/${restaurantid}`;
//     return axios.post(API_URL, categoryData, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Pass the token here
//         }
//     });
// };
// export const displayMenuCategoryService = () => {
//     const API_URL = `${import.meta.env.VITE_API_BASE_URL}/get-count`;
//     return axios.get(API_URL, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Pass the token here
//         }
//     });
// };
import axios from 'axios';
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const addMenuCategoryService = (categoryData, restaurantid = 8) =>
    axios.post(`${baseURL}/api/create-menu/${restaurantid}`, categoryData, { headers });

export const displayMenuCategoryService = () =>
    axios.get(`${baseURL}/api/get-count`, { headers });
