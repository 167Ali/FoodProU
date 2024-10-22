// store/index.js
import { createStore } from 'vuex';
import profileModule from './modules/profile';
import { menuCategory } from '../store/menu/menuCategory';
import { menuProduct } from '../store/menu/menuProduct';
import { menuChoice } from '../store/menu/menuChoice';
import { orderDetails } from '@/store/RestaurantOwner/orderDetails'
import { rewards } from './modules/rewards';
import AuthStore from './Auth/AuthStore';
import order from './modules/order'; 
import Prevorder from './modules/PrevorderDetail';
import AddReviews from './modules/AddReviews';
import Resturantownerreviews from './modules/Resturantownerstore';
import adminreviews from '../store/Admin/Reviewadminstore'; 

//import Reviews from './modules/customerReviews';
import axios from 'axios';
import ResturantDetailsStore from './customer/ResturantDetailsStore';
import ResturantRevinue from './customer/ResturantRevinue'; 
import orders from './customer/orders';
import favoriteStore from './customer/FavScreenCus';
import RevenueStore from '../store/Admin/RevenueStore';
const store = createStore({
  modules: {
    menuCategory,
    menuProduct,
    menuChoice,
    order, // register the order module
    Prevorder,
    orders, // Register the 'orders' module
    Resturantownerreviews,
    RevenueStore,
   // Reviews,
   AddReviews,
   adminreviews,
    rewards,
    profile: profileModule,
    auth: AuthStore,
    resturantDetails: ResturantDetailsStore,
    resturantRevinue: ResturantRevinue,
    favoriteStore,
    orderDetails, 

  },

  state: {

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
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post('http://192.168.15.67:8000/api/login', credentials);

        console.log('API Response:', response);

        const accessToken = response.data.data.access_token;
        const role = response.data.data.role;
        const userId = response.data.data.user_id;

        commit('SET_TOKEN', accessToken);
        commit('SET_USER', { role, userId });

        // Redirect based on user role
        if (role === 'Admin') {
          dispatch('redirect', { name: 'AdminDashboard' });
        } else if (role === 'Customer') {
          dispatch('redirect', { name: 'CustomerDashboard' });
        } else if (role === 'Restaurant Owner') {
          dispatch('redirect', { name: 'RestaurantOwnerDashboard' });
        } else {
          console.error('Unknown role:', role);
        }
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;  // Optionally handle this in your component
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
