import axios from 'axios';
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const addMenuCategoryService = (categoryData, restaurantid = 8) =>
    axios.post(`${baseURL}/api/create-menu/${restaurantid}`, categoryData, { headers });

export const displayMenuCategoryService = () =>
    axios.get(`${baseURL}/api/menu/count`, { headers });
