import { OrderDetails } from '../../Services/restaurantOwner/OrderDetailsServices';

export const orderDetails = {
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
                const response = await OrderDetails.ViewOrder();
                console.log(response.data.data.data);
                commit('SET_ORDERS', response.data.data.data);
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
