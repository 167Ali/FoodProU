import { getOrderDetails, placeOrderAPI } from '@/Services/Customer/checkoutServices';

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

};

const actions = {
  async getOrderDetails({ commit }) {
    commit('SET_LOADING', true);

    try {

      const response = await getOrderDetails();
      commit('SET_ORDER_DETAILS', response.data.data);
    } catch (error) {
      commit('SET_ERROR', error);
      console.error('Error fetching order details:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async placeOrder({ commit }, checkoutData) {
    try {
      await placeOrderAPI(checkoutData);
      // Handle success (e.g., redirect to order confirmation)
    } catch (error) {
      commit('SET_ERROR', error);
      console.error('Error placing order:', error);
    }
  },
};

const getters = {
  orderDetails: (state) => state.orderDetails,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};










// import { getOrderDetails } from '../../Services/customer/orderServices';

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
// };

// const getters = {
//   orderDetails: (state) => state.orderDetails,
// };

// export default {
//   namespaced: true, // Ensure the module is namespaced
//   state,
//   mutations,
//   actions,
//   getters,
// };








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








// {
//   "status": 200,
//   "message": "Order summary",
//   "data": {
//       "order_details": {
//           "items": [
//               {
//                   "menu_item_id": 2,
//                   "menu_item_name": "Spicy Biryani",
//                   "quantity": 1,
//                   "price": 500,
//                   "total_price": 500,
//                   "choice_names": "olive"
//               }
//           ],
//           "total": 500
//       },
//       "restaurant_details": {
//           "id": 8,
//           "name": "optp.",
//           "branch_id": 8
//       },
//       "delivery_details": {
//           "delivery_fee": 0,
//           "delivery_options": null
//       },
//       "payment_method": "Cash On Delivery",
//       "customer_details": {
//           "name": "Sarah Khane",
//           "email": "test_customer7@example.com",
//           "phone_number": "1234567890",
//           "delivery_address": null
//       }
//   }
// }



// {
//   "status": 200,
//   "message": "Order summary",
//   "data": {
//       "order_details": {
//           "items": [
//               {
//                   "menu_item_id": 2,
//                   "menu_item_name": "Spicy Biryani",
//                   "quantity": 1,
//                   "price": 500,
//                   "total_price": 500,
//                   "choice_names": "test changed"
//               },
//               {
//                   "menu_item_id": 3,
//                   "menu_item_name": "Spicy Biryani",
//                   "quantity": 1,
//                   "price": 500,
//                   "total_price": null,
//                   "choice_names": null
//               },
//               {
//                   "menu_item_id": 4,
//                   "menu_item_name": "Mutton Biryani",
//                   "quantity": 1,
//                   "price": 500,
//                   "total_price": null,
//                   "choice_names": null
//               }
//           ],
//           "total": 1500
//       },
//       "restaurant_details": {
//           "id": 8,
//           "name": "optp.",
//           "branch_id": 8
//       },
//       "delivery_details": {
//           "delivery_fee": 0,
//           "delivery_options": null
//       },
//       "payment_method": "Cash On Delivery",
//       "customer_details": {
//           "name": "Sarah Khane",
//           "email": "test_customer7@example.com",
//           "phone_number": "1234567890",
//           "delivery_address": "205 customer address"
//       }
//   }
// }

