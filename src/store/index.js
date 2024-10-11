

import { createStore } from 'vuex';
import profileModule from './modules/profile'; 
import AuthStore from './Auth/AuthStore';
const store = createStore({
 modules: {
    profile: profileModule, 
    auth:AuthStore
  },
  state:{
  },
  mutations: {

  },
  actions: {

  },
  getters: {
 
  },
});

export default store;

