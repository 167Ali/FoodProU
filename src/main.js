import { createApp } from 'vue';
import App from './App.vue';
import store from './Store';
import router from './Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');