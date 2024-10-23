import { addProductService, editProductService, deleteProductService, displayProductsService } from '../../Services/Menu/menuProductServices';

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
                const response = await addProductService(productData.product, productData.categoryId);
                commit('ADD_PRODUCT', response.data);
                return response.data;
            } catch (error) {
                console.error('Error adding product:', error);
                throw error;
            }
        },
        async editProduct({ commit }, { productId, productData }) {
            try {
                const response = await editProductService(productId, productData);
                commit('UPDATE_PRODUCT', response.data);
                return response.data;
            } catch (error) {
                console.error('Error editing product:', error);
                throw error;
            }
        },
        async deleteProduct({ commit }, productId) {
            try {
                const response = await deleteProductService(productId);
                commit('DELETE_PRODUCT', productId);
                return response.data;
            } catch (error) {
                console.error('Error deleting product:', error);
                throw error;
            }
        },
        async displayProducts({ commit }, categoryId) {
            try {
                const response = await displayProductsService(categoryId);
                console.log("Display category ", response.data.data)
                commit('SET_PRODUCTS', response.data.data);
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
