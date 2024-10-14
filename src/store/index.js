// store/index.js

import { createStore } from 'vuex';

import profileModule from './modules/profile'; 
import AuthStore from './Auth/AuthStore';
import order from './modules/order'; // import the order module
import Prevorder from './modules/PrevorderDetail';
import Resturantownerreviews from './modules/Resturantownerreviews';
import Reviews from './modules/customerReviews';
import axios from 'axios';



const store = createStore({
  modules: {
    order, // register the order module
    Prevorder,
    Resturantownerreviews,
    Reviews,
   profile: profileModule, 
    auth:AuthStore,
  },
  state: {

    token: localStorage.getItem('token') || null,

    user: { role: null, userId: null },  // Initialize user state

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

      state.user = { role: null, userId: null };  // Reset user state

      localStorage.removeItem('token');

      localStorage.removeItem('user');

    },

  },

  actions: {

    async login({ commit }, credentials) {
      try {
        // Send a POST request to the login API with the provided credentials
        const response = await axios.post('http://192.168.15.67:8000/api/login', credentials);

        // Destructure the access_token and user data from the response
        const { access_token, ...user } = response.data.data;

        // Commit the access token to the Vuex store
        commit('SET_TOKEN', access_token);

        // Commit the user information (excluding the token) to the Vuex store
        commit('SET_USER', user);

        // Optionally return the user's role and permissions for further use
        return {
          role: user.role,
          permissions: user.permissions || [] // Default to empty array if permissions are not provided
        };
      } catch (error) {
        // Log the error for debugging purposes
        console.error('Login error:', error.response?.data || error.message);

        // Optionally handle specific error responses (e.g., display a message to the user)
        if (error.response && error.response.status === 401) {
          throw new Error('Invalid credentials. Please try again.');
        } else {
          throw new Error('An unexpected error occurred. Please try again later.');
        }
      }
    },

    logout({ commit }) {

      commit('LOGOUT');

    },

    redirect(_, route) {

      // Assuming you have access to the router instance in your main.js

      this.$router.push(route);  // This won't work directly in Vuex

    }

  }

});

export default store;