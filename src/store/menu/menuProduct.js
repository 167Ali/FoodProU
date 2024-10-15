import { addProductService, editProductService, deleteProductService, displayProductsService } from '../../Services/menu/menuProductServices';

export const menuProduct = {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        ADD_PRODUCT(state, product) {
            state.products.push(product);
        },
        UPDATE_PRODUCT(state, updatedProduct) {
            const index = state.products.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.products.splice(index, 1, updatedProduct);
            }
        },
        DELETE_PRODUCT(state, productId) {
            state.products = state.products.filter(product => product.id !== productId);
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
    },
    actions: {
        async addProduct({ commit }, productData) {
            try {
                console.log("store id", productData)
                const response = await addProductService(productData.product, productData.categoryId);
                commit('ADD_PRODUCT', response.data);
            } catch (error) {
                console.error('Error adding product:', error);
                throw error;
            }
        },
        async editProduct({ commit }, { productId, productData }) {
            try {
                const response = await editProductService(productId, productData);
                commit('UPDATE_PRODUCT', response.data);
            } catch (error) {
                console.error('Error editing product:', error);
                throw error;
            }
        },
        async deleteProduct({ commit }, productId) {
            try {
                await deleteProductService(productId);
                commit('DELETE_PRODUCT', productId);
            } catch (error) {
                console.error('Error deleting product:', error);
                throw error;
            }
        },
        async displayProducts({ commit }) {
            try {
                const response = await displayProductsService();
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Error displaying products:', error);
                throw error;
            }
        },
    },
    getters: {
        allProducts: (state) => state.products,
    },
};
