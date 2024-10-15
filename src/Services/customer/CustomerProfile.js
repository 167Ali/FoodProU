// services/profileService.js
import axios from 'axios';

const API_URL = 'http://192.168.15.90:8000/api/customers/';

export const updateProfile = async (profileData) => {
    try {
        const response = await axios.patch(`${API_URL}edit-profile`, profileData);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle the error appropriately
    }
};
