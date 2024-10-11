// store/authStore.js (Vuex Example)

// import { login, resetPassword } from '@/services/authService';

// const state = {

//     user: null,

//     isAuthenticated: false,

//     error: null,

// };

// const mutations = {

//     SET_USER(state, user) {

//         state.user = user;

//         state.isAuthenticated = true;

//     },

//     SET_ERROR(state, error) {

//         state.error = error;

//     },

//     LOGOUT(state) {

//         state.user = null;

//         state.isAuthenticated = false;

//     },

// };

// const actions = {

//     async login({ commit }, { email, password }) {

//         try {
//             const userData = await login(email, password);
//             commit('SET_USER', userData);
//         } catch (error) {
//             commit('SET_ERROR', error.message);
//         }
//     },
//     async resetPassword({ commit }, { email }) {
//         try {
//             await resetPassword(email);
//         } catch (error) {
//             commit('SET_ERROR', error.message);
//         }
//     },
//     logout({ commit }) {
//         commit('LOGOUT');
//     },
// };
// const getters = {
//     isAuthenticated: (state) => state.isAuthenticated,
//     getUser: (state) => state.user,
//     getError: (state) => state.error,
// };
// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions,
//     getters,
// };