// src/store/modules/profile.js
import { fetchRestaurantDetails } from '../../Services/RestaurantOwner/restaurantOwnerProfService'; // Ensure correct import

const state = {
  ownerDetails: {},
  restaurantDetails: {},
};

const getters = {
  getOwnerDetails: (state) => state.ownerDetails,
  getRestaurantDetails: (state) => state.restaurantDetails,
};

const actions = {
  async fetchOwnerDetails({ commit }, token) {
    try {
      const response = await fetchRestaurantDetails(token);
      commit('SET_OWNER_DETAILS', response); // Use response directly since it already contains the necessary data
    } catch (error) {
      console.error(error.message);
    }
  },
};

const mutations = {
  SET_OWNER_DETAILS(state, details) {
    state.ownerDetails = {
      firstName: details.first_name,
      lastName: details.last_name,
      phoneNumber: details.phone_number, // Ensure this is included in your API response
      bankName: details.bank_name,
      iban: details.iban,
      accountTitle: details.account_owner_title,
    };

    state.restaurantDetails = {
      restaurantName: details.restaurant_name,
      address: details.address,
      postalCode: details.postal_code,
      city: details.city,
      openingTime: details.opening_time,
      closingTime: details.closing_time,
      cuisineType: details.cuisine,
      businessType: details.business_type,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
