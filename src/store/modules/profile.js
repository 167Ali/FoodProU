// store/modules/profile.js
import { api } from '../../Services/customer/CustomerProfile';

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
  SET_PROFILE(state, profileData) {
    state.profile = { ...state.profile, ...profileData };
  },
};

const actions = {
    async fetchProfile({ commit }) {
        try {
          const response = await api.getProfile();
          // Extract the 'user' object from the response and commit it
          const userProfile = response.data.user; 
          commit('SET_PROFILE', userProfile); // Commit user data to the store
        } catch (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
      },

  async saveProfile({ commit }, profileData) {
    try {
      const response = await api.updateProfile(profileData);
      commit('SET_PROFILE', response.data);
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
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
