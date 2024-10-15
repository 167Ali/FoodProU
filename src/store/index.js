// store/index.js
import { createStore } from 'vuex';

import { menuCategory } from '../store/menu/menuCategory';
import { menuProduct } from '../store/menu/menuProduct';
import { menuChoices } from '../store/menu/menuChoices';
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
    auth: AuthStore,
    menuCategory,
    menuProduct,
    menuChoices
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
