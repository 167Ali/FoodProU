// src/Services/Auth/AuthServices.js
import axios from 'axios';



// Use Vite's way of accessing environment variables

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Backend API URL



export const resetPassword = async (email) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });

        console.log('authservice', response);

        return response.data;

    } catch (error) {

        throw new Error(error.response?.data?.message || 'Reset password failed');

    }

};


export const setPassword = async (payload) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/api/reset-password`, payload);

        console.log('setPassword response', response);

        console.log("checkkkkkk");

        return response.data;

    } catch (error) {

        throw new Error(error.response?.data?.message || 'Set password failed');

    }

};



export const login = async (credentials) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);

        console.log('Login response', response);

        const { access_token, role, permissions } = response.data.data; // Adjust based on the response structure

        return { access_token, role, permissions }; // Return the relevant data

    } catch (error) {

        throw new Error(error.response?.data?.message || 'Login failed');

    }

};



export const register = async (formData) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/api/register`, formData);

        console.log('Registration response', response);

        const { access_token, ...user } = response.data.data;

        return { access_token, user };

    } catch (error) {

        throw new Error(error.response?.data?.message || 'Registration failed');

    }

};



// New business registration function

export const registerBusiness = async (formData) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/api/register-business`, formData);

        console.log(response.data);

        return response.data;

    } catch (error) {

        throw new Error(error.response?.data?.message || 'Business registration failed');

    }

};