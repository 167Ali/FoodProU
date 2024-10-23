import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_AS;

class OrderService {
  async getApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-applications`);
      return response.data;
      // Adjust according to your API response structure
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }
  async getDeactivatedApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/show-deactivated-restaurants`);
      return response.data;
      // Adjust according to your API response structure
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }
  async acceptApplication(requestId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/accept-application/${requestId}`);
      return response.data; // Return the response data as needed
    } catch (error) {
      console.error('Error accepting application:', error);
      throw error;
    }
  }
  async rejectApplication(requestId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reject-application/${requestId}`);
      return response.data; // Return the response data as needed
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  }
  async activateApplication(requestId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/activate-restaurant/${requestId}`);
      return response.data; // Return the response data as needed
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  }
  async deactivateApplication(requestId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/deactivate-restaurant/${requestId}`);
      return response.data; // Return the response data as needed
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  }
}

export default new OrderService();