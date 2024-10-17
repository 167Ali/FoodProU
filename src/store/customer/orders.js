import { getOrderDetails } from '@/Services/customer/OrderService';

const state = {
  orderDetails: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_ORDER_DETAILS(state, orderDetails) {
    state.orderDetails = orderDetails;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  UPDATE_ADDRESS(state, newAddress) {
    if (state.orderDetails && state.orderDetails.customer_details) {
      state.orderDetails.customer_details.delivery_address = newAddress;
    }
  },
};

const actions = {
  async getOrderDetails({ commit }) {
    commit('SET_LOADING', true);
    console.log('Fetching order details...'); // Add this line
    try {
      // Fetch order details with token
      const response = await getOrderDetails();
      console.log('Response:', response.data); // Log the response
      commit('SET_ORDER_DETAILS', response.data);
    } catch (error) {
      commit('SET_ERROR', error);
      console.error('Error fetching order details:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  orderDetails: (state) => state.orderDetails,
};

export default {
  namespaced: true, // Ensure the module is namespaced
  state,
  mutations,
  actions,
  getters,
};








// import { getOrderDetails } from '@/Services/customer/OrderService';

// const state = {
//   orderDetails: null,
//   loading: false,
//   error: null,
// };

// const mutations = {
//   SET_ORDER_DETAILS(state, orderDetails) {
//     state.orderDetails = orderDetails;
//   },
//   SET_LOADING(state, loading) {
//     state.loading = loading;
//   },
//   SET_ERROR(state, error) {
//     state.error = error;
//   },
//   UPDATE_ADDRESS(state, newAddress) {
//     if (state.orderDetails && state.orderDetails.customer_details) {
//       state.orderDetails.customer_details.delivery_address = newAddress;
//     }
//   },
// };

// const actions = {
//   async getOrderDetails({ commit }) {
//     commit('SET_LOADING', true);
//     console.log('Fetching order details...'); // Add this line
//     try {
//       // Fetch order details with token
//       const response = await getOrderDetails();
//       console.log('Response:', response.data); // Log the response
//       commit('SET_ORDER_DETAILS', response.data);
//     } catch (error) {
//       commit('SET_ERROR', error);
//       console.error('Error fetching order details:', error);
//     } finally {
//       commit('SET_LOADING', false);
//     }
//   },

//   // Uncomment this when you need to update the delivery address
//   // async updateAddress({ commit }, newAddress) {
//   //   try {
//   //     await updateDeliveryAddress(newAddress);
//   //     commit('UPDATE_ADDRESS', newAddress);
//   //   } catch (error) {
//   //     commit('SET_ERROR', error);
//   //   }
//   // },
// };

// const getters = {
//   orderDetails: (state) => state.orderDetails,
// };

// export default {
//   state,
//   mutations,
//   actions,
//   getters,
// };
