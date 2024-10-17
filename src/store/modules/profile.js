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
  // Fetch the profile from the API
  async fetchProfile({ commit }) {
    try {
      const response = await api.getProfile();
      // Commit only the `data` field from the API response
      commit('SET_PROFILE', response.data.data);  // Access `data.data` for profile info
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  async saveProfile({ commit }, profileData) {
    try {
      const response = await api.updateProfile(profileData);
      commit('SET_PROFILE', response.data);  // Update profile in store after saving
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
