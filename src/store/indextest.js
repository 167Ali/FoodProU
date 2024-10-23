/* eslint-disable no-unused-vars */
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        // token: localStorage.getItem('token') || null,
        // user: { role: null, userId: null }, // Initialize user state
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user.role === 'Admin',
        isCustomer: (state) => state.user.role === 'Customer',
        isRestaurantOwner: (state) => state.user.role === 'Restaurant Owner',
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        LOGOUT(state) {
            state.token = null;
            state.user = { role: null, userId: null }; // Reset user state
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('http://192.168.15.67:8000/api/login', credentials);
                const { access_token, role, permissions } = response.data.data; // Destructure role and permissions directly from data
                console.log(response);
                commit('SET_TOKEN', access_token);
                commit('SET_USER', { role, permissions }); // Store role and permissions in the user state
                return {
                    role,
                    permissions: permissions || []
                };
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);
                if (error.response && error.response.status === 401) {
                    throw new Error('Invalid credentials. Please try again.');
                } else {
                    throw new Error('An unexpected error occurred. Please try again later.');
                }
            }
        },
        async register({ commit }, formData) {
            try {
                const response = await axios.post('http://192.168.15.67:8000/api/register', formData);
                const { access_token, ...user } = response.data.data;
                commit('SET_TOKEN', access_token);
                commit('SET_USER', user);
                return user;
            } catch (error) {
                console.error('Registration error:', error.response?.data || error.message);
                throw new Error('Registration failed. Please try again.');
            }
        },
        async registerBusiness({ commit }, formData) {
            try {
                const response = await axios.post('http://192.168.15.67:8000/api/register-business', formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if necessary
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Business registration error:', error.response?.data || error.message);
                throw new Error('Business registration failed. Please try again.');
            }
        },
        logout({ commit }) {
            commit('LOGOUT');
        }
    }
});

export default store;
