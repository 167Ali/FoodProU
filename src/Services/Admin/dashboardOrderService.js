import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

class OrderService {
    async getApplications() {
        try {
            const response = await axiosInstance.get('/api/get-applications');
            return response.data;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }

    async getDeactivatedApplications() {
        try {
            const response = await axiosInstance.get('/api/show-deactivated-restaurants');
            return response.data;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }

    async acceptApplication(requestId) {
        try {
            const response = await axiosInstance.post(`/api/accept-application/${requestId}`);
            console.log('Restaurant Accepted Successfully');
            return response.data;

        } catch (error) {
            console.error('Error accepting application:', error);
            throw error;
        }
    }

    async rejectApplication(requestId) {
        try {
            const response = await axiosInstance.post(`/api/reject-application/${requestId}`);
            return response.data;
        } catch (error) {
            console.error('Error rejecting application:', error);
            throw error;
        }
    }

    async activateApplication(requestId) {
        try {
            const response = await axiosInstance.post(`/api/activate-restaurant/${requestId}`);
            return response.data;
        } catch (error) {
            console.error('Error activating application:', error);
            throw error;
        }
    }

    async deactivateApplication(requestId) {
        try {
            const response = await axiosInstance.post(`/api/deactivate-restaurant/${requestId}`);
            return response.data;
        } catch (error) {
            console.error('Error deactivating application:', error);
            throw error;
        }
    }
}

export default new OrderService();