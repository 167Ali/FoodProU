// src/services/profileService.js
import axios from 'axios';

const BASE_URL = 'https://your-api-url.com/api'; // Replace with your API base URL

const updateProfile = async (token, customerId, profileData) => {
    const response = await axios.patch(
        `${BASE_URL}/customers/${customerId}`, 
        profileData, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

export default {
    updateProfile,
};
