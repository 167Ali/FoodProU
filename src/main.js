import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; 
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; 

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(); // Keep it empty, as we will add icons in component files

const app = createApp(App);
app.use(store); 
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');

