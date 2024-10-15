// services/customer/customerProfile.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_H,
    headers: {
        'Content-Type': 'application/json',
        // Assuming you are using a token stored in local storage for authorization
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const api = {
    async updateProfile(profileData) {
        const response = await apiClient.patch('/api/customers/edit-profile', profileData);
        return response.data; // Return the response data for the store to handle
    },
};
