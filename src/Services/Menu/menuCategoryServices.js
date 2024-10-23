import axios from 'axios';
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;
const id = localStorage.getItem('id');

export const addMenuCategoryService = (categoryData) =>
    axios.post(`${baseURL}/api/create-menu/${id}`, categoryData, { headers });

export const displayMenuCategoryService = () =>
    axios.get(`${baseURL}/api/menu/count`, { headers });
