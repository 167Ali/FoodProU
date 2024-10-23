import axios from 'axios';
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;
const id = localStorage.getItem('id');

export const AllOrders = {
    ViewOrder() {
        return axios.get(`${baseURL}/api/get-all-orders`, { headers });
    },
}

