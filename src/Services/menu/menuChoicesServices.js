// choiceService.js
import axios from 'axios';

// Base URL for the API
const token = `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xNS4yMDU6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE3Mjg5MDg4NzAsImV4cCI6MTcyODkxMjQ3MCwibmJmIjoxNzI4OTA4ODcwLCJqdGkiOiI5aWFBN29ZSFdKUEF6M0RMIiwic3ViIjoiMjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.FDvCPiiYh5nQrKPpuSDAEdeTO1JKkA19guHWlagz2T4'}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Service for managing choices
export const choiceService = {
    // Create a new choice
    createChoice(menuId, choiceData) {
        return axios.post(`${baseURL}/add-item/menu/${menuId}/choices`, choiceData);
    },

    // Update an existing choice
    updateChoice(menuId, choiceId, choiceData) {
        return axios.put(`${baseURL}/menu/${menuId}/choices/${choiceId}`, choiceData);
    },

    // Delete a choice
    deleteChoice(menuId, choiceId) {
        return axios.delete(`${baseURL}/menu/${menuId}/choices/${choiceId}`);
    },

    // Get choices for a specific menu
    getChoices(menuId) {
        return axios.get(`${baseURL}/menu/${menuId}/choices`);
    },
};
