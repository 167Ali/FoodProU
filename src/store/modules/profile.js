// src/store/modules/profile.js

import { updateProfile, updateEmail, updatePassword } from '../../Services/customer/CustomerProfile';

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
    // You can add more mutations if needed
};

const actions = {
    async saveProfile({ commit }, profileData) {
        try {
            const response = await updateProfile(profileData);
            commit('SET_PROFILE', response); // Update the store with the new profile data
        } catch (error) {
            console.error('Failed to save profile:', error);
            // Handle error appropriately (e.g., show a notification)
        }
    },
    async saveEmail({ commit }, emailData) {
        try {
            const response = await updateEmail(emailData);
            commit('SET_PROFILE', { email: response.email });
        } catch (error) {
            console.error('Failed to save email:', error);
            // Handle error appropriately
        }
    },
    async savePassword({ commit }, passwordData) {
        try {
            await updatePassword(passwordData);
            // Optionally handle any state updates if necessary
        } catch (error) {
            console.error('Failed to save password:', error);
            // Handle error appropriately
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
