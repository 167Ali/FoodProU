import { fetchReviews, fetchRestaurants } from '../../Services/admin/ReviewadminServices';

const state = {
  reviews: [],
  filteredReviews: [],
  totalReviews: 0,
  averageRating: 0,
  growthPercentage: 0,
  restaurants: [],
  selectedRestaurant: '',
  loading: false,
  error: null,
};

const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
    state.filteredReviews = reviews; // Default to showing all reviews
  },
  SET_TOTAL_REVIEWS(state, total) {
    state.totalReviews = total;
  },
  SET_AVERAGE_RATING(state, rating) {
    state.averageRating = rating;
  },
  SET_GROWTH_PERCENTAGE(state, percentage) {
    state.growthPercentage = percentage;
  },
  SET_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants;
  },
  SET_SELECTED_RESTAURANT(state, restaurant) {
    state.selectedRestaurant = restaurant;
  },
  SET_FILTERED_REVIEWS(state, reviews) {
    state.filteredReviews = reviews;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchReviews({ commit }) {
    commit('SET_LOADING', true);
    try {
      const data = await fetchReviews();
      commit('SET_REVIEWS', data.reviews);
      commit('SET_TOTAL_REVIEWS', data.totalReviews);
      commit('SET_AVERAGE_RATING', data.averageRating);
      commit('SET_GROWTH_PERCENTAGE', data.growthPercentage);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch reviews');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchRestaurants({ commit }) {
    try {
      const data = await fetchRestaurants();
      commit('SET_RESTAURANTS', data.restaurants);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch restaurants');
    }
  },

  filterReviews({ commit, state }) {
    if (state.selectedRestaurant) {
      const filtered = state.reviews.filter(
        (review) => review.restaurant === state.selectedRestaurant
      );
      commit('SET_FILTERED_REVIEWS', filtered);
    } else {
      commit('SET_FILTERED_REVIEWS', state.reviews);
    }
  },

  setSelectedRestaurant({ commit, dispatch }, restaurant) {
    commit('SET_SELECTED_RESTAURANT', restaurant);
    dispatch('filterReviews'); // Call filter after selecting a restaurant
  },
};

const getters = {
  reviews: (state) => state.reviews,
  filteredReviews: (state) => state.filteredReviews,
  totalReviews: (state) => state.totalReviews,
  averageRating: (state) => state.averageRating,
  growthPercentage: (state) => state.growthPercentage,
  restaurants: (state) => state.restaurants,
  selectedRestaurant: (state) => state.selectedRestaurant,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};