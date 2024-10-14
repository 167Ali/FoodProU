// src/store/Auth/AuthStore.js

import { resetPassword, setPassword,login } from '../../Services/Auth/AuthService';

const state = () => ({

  loading: false,

  successMessage: '',

  errorMessage: '',

  token: localStorage.getItem('token') || null,

  user: { role: null, userId: null },

});

const mutations = {

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

  RESET_PASSWORD_REQUEST(state) {

    state.loading = true;

    state.successMessage = '';

    state.errorMessage = '';

  },

  RESET_PASSWORD_SUCCESS(state, message) {

    state.loading = false;

    state.successMessage = message;

  },

  RESET_PASSWORD_FAILURE(state, error) {

    state.loading = false;

    state.errorMessage = error;

  },

  SET_PASSWORD_REQUEST(state) {

    state.loading = true;

    state.successMessage = '';

    state.errorMessage = '';

  },

  SET_PASSWORD_SUCCESS(state, message) {

    state.loading = false;

    state.successMessage = message;

  },

  SET_PASSWORD_FAILURE(state, error) {

    state.loading = false;

    state.errorMessage = error;

  },

  SET_ERROR_MESSAGE(state, message) {

    state.errorMessage = message;

  },

  CLEAR_MESSAGES(state) {

    state.successMessage = '';

    state.errorMessage = '';

  },

};

const actions = {

  async forgotPassword({ commit }, email) {

    commit('RESET_PASSWORD_REQUEST');

    try {

      const response = await resetPassword(email);

      console.log(response);

      commit('RESET_PASSWORD_SUCCESS', response.message || 'Password reset link has been sent to your email.');

    } catch (error) {

      commit('RESET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.');

    }

  },

  async setPassword({ commit }, payload) {

    commit('SET_PASSWORD_REQUEST');

    try {

      const response = await setPassword(payload);

      console.log(response);

      commit('SET_PASSWORD_SUCCESS', response.message || 'Your password has been successfully set.');

    } catch (error) {

      commit('SET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.');

    }

  },

  async login({ commit }, credentials) {

    try {

        const { access_token, role, permissions } = await login(credentials); // Call the login service

        commit('SET_TOKEN', access_token);

        commit('SET_USER', { role, permissions }); // Store role and permissions in the user state

        return { role, permissions: permissions || [] };

    } catch (error) {

        console.error('Login error:', error.message);

        throw new Error(error.message);

    }

},

};

const getters = {

  isLoading: (state) => state.loading,

  successMessage: (state) => state.successMessage,

  errorMessage: (state) => state.errorMessage,

  isAdmin: (state) => state.user.role === 'Admin',

  isCustomer: (state) => state.user.role === 'Customer',

  isRestaurantOwner: (state) => state.user.role === 'Restaurant Owner',

};

export default {

  namespaced: true,

  state,

  mutations,

  actions,

  getters,

};



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