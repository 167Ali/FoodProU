import restaurantOrderServices from '@/Services/restaurantOwner/restaurantOrders';
// import { orderServices } from '../../Services/restaurantOwner/restaurantOrders'; 


const state = {
  currentOrders: [],
  acceptedOrders: [],
  rejectedOrders: [],
};

const mutations = {
  SET_ORDERS(state, orders) {
    state.currentOrders = orders;
    state.acceptedOrders = orders.filter(order => order.status === 'delivered');
    state.rejectedOrders = orders.filter(order => order.status !== 'delivered');
  },
};

const actions = {
  async fetchOrders({ commit }) {
    try {
      const response = await restaurantOrderServices.fetchOrders();
      commit('SET_ORDERS', response.data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  },
};


const getters = {
  ordersByStatus: (state) => (status) => {
    return state.orders.filter(order => order.status === status); // Filter orders based on status
  },
};


// const getters = {
//   currentOrders: state => state.currentOrders,
//   acceptedOrders: state => state.acceptedOrders,
//   rejectedOrders: state => state.rejectedOrders,
// };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
