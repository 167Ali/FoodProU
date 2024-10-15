// store/modules/profile.js
import { api } from '../../Services/customer/CustomerProfile'; // Import the API service

const state = {
    profile: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        isEmailVerified: false, // Adjust this based on your logic
    }
};

const mutations = {
    SET_PROFILE(state, profileData) {
        state.profile = { ...state.profile, ...profileData };
    },
};

const actions = {
    async saveProfile({ commit }, profileData) {
        try {
            // Make the API call to update the profile
            const response = await api.updateProfile(profileData);
            // Update the state with the new profile data
            commit('SET_PROFILE', response.data);
            return response; // Return the response for further handling
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error; // Rethrow the error for handling in the component
        }
    },
    // Add more actions for other profile-related functionalities if needed
};

const getters = {
    profile: (state) => state.profile,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
