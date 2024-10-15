// store/index.js
import { createStore } from 'vuex';
import { menuCategory } from '../store/menu/menuCategory';
import { menuProduct } from '../store/menu/menuProduct';
import { menuChoice } from '../store/menu/menuChoice';

export default createStore({
  modules: {
    menuCategory,
    menuProduct,
    menuChoice,
  },
});
