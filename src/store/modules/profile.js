// src/store/modules/profile.js
import profileService from '../../Services/customer/CustomerProfile'; // Adjust the path as necessary
import { getToken, getCustomerId } from '../../utilies/auth'; // Utility functions to retrieve token and customer ID

const state = {
    profile: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        isEmailVerified: false,
    },
};

const mutations = {
    SET_PROFILE(state, profile) {
        state.profile = { ...state.profile, ...profile };
    },
};

const actions = {
    async saveProfile({ commit }, profileData) {
        const token = getToken(); // Function to get the auth token
        const customerId = getCustomerId(); // Function to get the customer ID
        try {
            const response = await profileService.updateProfile(token, customerId, profileData);
            commit('SET_PROFILE', response.data); // Update profile in Vuex store
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error; // Rethrow the error to handle it in the component
        }
    },

    async saveEmail({ commit }, { email }) {
        // Add logic for saving email if needed
        // This can also use the `saveProfile` action to update the email
    },

    async savePassword({ commit }, { currentPassword, newPassword }) {
        // Add logic for saving password if needed
    },
};

const getters = {
    profile: (state) => state.profile,
    isEmailVerified: (state) => state.profile.isEmailVerified,
    saveProfile:(state) => state.SET_PROFILE
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
