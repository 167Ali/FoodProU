// store/index.js
import { createStore } from 'vuex';
//import profileModule from './modules/profile';
import { menuCategory } from '../Store/Menu/menuCategory';
import { menuProduct } from '../Store/Menu/menuProduct';
import { menuChoice } from '../Store/Menu/menuChoice';
import { orderDetails } from '@/Store/RestaurantOwner/orderDetails'
import { rewards } from '@/Store/Modules/rewards';
import AuthStore from '@/Store/Auth/AuthStore';
import order from '@/Store/Modules/order'; 
import Prevorder from '@/Store/Modules/PrevorderDetail';
import AddReviews from '@/Store/Modules/AddReviews';
import Resturantownerreviews from '@/Store/Modules/Resturantownerreviews';
import adminreviews from '@/Store/Admin/Reviewadminstore'; 

//import Reviews from './modules/customerReviews';
import axios from 'axios';
import ResturantDetailsStore from '@/Store/Customer/ResturantDetailsStore';
import ResturantRevinue from '@/Store/Customer/resturantRevenue'; 
//import orders from '@/Store/customer/orders';
import favoriteStore from '@/Store/Customer/favScreenCus';
import RevenueStore from '../Store/Admin/RevenueStore';
const store = createStore({
  modules: {
    menuCategory,
    menuProduct,
    menuChoice,
    order, // register the order module
    Prevorder,
   // orders, // Register the 'orders' module
    Resturantownerreviews,
    RevenueStore,
   // Reviews,
   AddReviews,
   adminreviews,
    rewards,
   // profile: profileModule,
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
