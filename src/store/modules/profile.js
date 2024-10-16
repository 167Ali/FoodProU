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
