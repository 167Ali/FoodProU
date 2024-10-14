import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite uses 'VITE_' prefix for env variables

export const getOwnerReviews = async (restaurantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Error fetching owner reviews:', error);
        throw error;
    }
};