

import { createStore } from 'vuex';
import profileModule from './modules/profile'; 
import { rewards } from './modules/rewards'; 
const store = createStore({
 modules: {
    profile: profileModule, 
    rewards,
    
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

