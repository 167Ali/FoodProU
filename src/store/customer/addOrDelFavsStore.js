// import { addFavoriteRestaurant, removeFavoriteRestaurant } from '@/Services/customer/addOrDelFavsService';

// const state = {
//   favoriteRestaurants: [],
// };

// const mutations = {
//   ADD_TO_FAVORITES(state, restaurantId) {
//     state.favoriteRestaurants.push(restaurantId);
//   },
//   REMOVE_FROM_FAVORITES(state, restaurantId) {
//     state.favoriteRestaurants = state.favoriteRestaurants.filter(id => id !== restaurantId);
//   },
// };

// const actions = {
//   async addFavorite({ commit }, restaurantId) {
//     try {
//       await addFavoriteRestaurant(restaurantId);
//       commit('ADD_TO_FAVORITES', restaurantId);
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//     }
//   },
//   async removeFavorite({ commit }, restaurantId) {
//     try {
//       await removeFavoriteRestaurant(restaurantId);
//       commit('REMOVE_FROM_FAVORITES', restaurantId);
//     } catch (error) {
//       console.error('Error removing from favorites:', error);
//     }
//   },
// };

// const getters = {
//   isFavorite: (state) => (restaurantId) => state.favoriteRestaurants.includes(restaurantId),
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters,
// };
