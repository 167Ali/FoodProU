// src/store/Auth/AuthStore.js

import { resetPassword, setPassword } from '../../Services/Auth/AuthService';

const state = () => ({
  loading: false,
  successMessage: '',
  errorMessage: '',
});

const mutations = {
  RESET_PASSWORD_REQUEST(state) {
    state.loading = true;
    state.successMessage = '';
    state.errorMessage = '';
  },
  RESET_PASSWORD_SUCCESS(state, message) {
    state.loading = false;
    state.successMessage = message;
  },
  RESET_PASSWORD_FAILURE(state, error) {
    state.loading = false;
    state.errorMessage = error;
  },
  SET_PASSWORD_REQUEST(state) {
    state.loading = true;
    state.successMessage = '';
    state.errorMessage = '';
  },
  SET_PASSWORD_SUCCESS(state, message) {
    state.loading = false;
    state.successMessage = message;
  },
  SET_PASSWORD_FAILURE(state, error) {
    state.loading = false;
    state.errorMessage = error;
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  },
  CLEAR_MESSAGES(state) {
    state.successMessage = '';
    state.errorMessage = '';
  },
};

const actions = {
  async forgotPassword({ commit }, email) {
    commit('RESET_PASSWORD_REQUEST');
    try {
      const response = await resetPassword(email);
      console.log(response);
      commit('RESET_PASSWORD_SUCCESS', response.message || 'Password reset link has been sent to your email.');
    } catch (error) {
      commit('RESET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.');
    }
  },
  async setPassword({ commit }, payload) {
    commit('SET_PASSWORD_REQUEST');
    try {
      const response = await setPassword(payload);
      console.log(response);
      commit('SET_PASSWORD_SUCCESS', response.message || 'Your password has been successfully set.');
    } catch (error) {
      commit('SET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.');
    }
  },
};

const getters = {
  isLoading: (state) => state.loading,
  successMessage: (state) => state.successMessage,
  errorMessage: (state) => state.errorMessage,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
