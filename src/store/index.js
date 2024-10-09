import { createStore } from 'vuex';


import profileModule from './modules/profile'; 

const store = createStore({
  modules: {
    profile: profileModule, 
    
  },
});

export default store;
