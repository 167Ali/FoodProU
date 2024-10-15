// store/modules/addMenuCategory.js
import { addMenuCategoryService, displayMenuCategoryService } from '../../Services/menu/menuCategoryServices';


export const menuCategory = {
    namespaced: true,
    state: {
        categories: [],
    },
    mutations: {
        ADD_CATEGORY(state, category) {
            state.categories.push(category);
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
    },
    actions: {
        async addCategory({ commit }, categoryData) {
            try {
                const response = await addMenuCategoryService(categoryData);
                commit('ADD_CATEGORY', response.data);
            } catch (error) {
                console.error('Error adding category:', error);
                throw error;
            }
        },
        async displayCategory({ commit }) {
            try {
                const response = await displayMenuCategoryService();
                console.log("DISPLAY CATEGORIES ", response.data)
                commit('SET_CATEGORIES', response.data);
            } catch (error) {
                console.error('Error Diplaying category:', error);
                throw error;
            }
        },
        setCategories({ commit }, categories) {
            commit('SET_CATEGORIES', categories);
        },
    },

    getters: {
        allCategories: (state) => state.categories,
    },
};
