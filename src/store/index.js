import { createStore } from 'vuex';



import profileModule from './modules/profile'; 
import { rewards } from './modules/rewards'; 
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
    rewards,
   profile: profileModule, 
    auth:AuthStore,

  },

  state: {

  },
  getters: {
  },
  mutations: {

  },
  actions: {
    // Define actions for async calls and committing mutations

  },
});

export default store;
