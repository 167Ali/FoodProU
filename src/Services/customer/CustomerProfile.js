// services/profileService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const updateProfile = async (profileData) => {
    try {
        const response = await axios.patch(`${API_URL}edit-profile`, profileData);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle the error appropriately
    }
};
