import { AllOrders } from '@/Services/Admin/allOrdersServices';

export const AllOrdersAdm = {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
    },
    actions: {
        async fetchOrders({ commit }) {
            try {
                const response = await AllOrders.ViewOrder();
                console.log("orders store ", response.data.data);
                commit('SET_ORDERS', response.data.data);
            } catch (error) {
                console.error('Error fetching Order:', error);
                throw error;
            }
        },
    },
    getters: {
        allOrders: (state) => state.orders,
    },
};
