import { fetchReviewsAndRestaurants } from '../../Services/admin/ReviewadminServices';

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
    state.filteredReviews = reviews;
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
  },
};

const actions = {
  async fetchReviews({ commit }) {
    commit('SET_LOADING', true);
    try {
      const data = await fetchReviewsAndRestaurants(); // Call the combined API

      // Log the entire response to see its structure
      console.log('API Response:', data);

      // Accessing reviews directly from the 'data' property
      const reviews = Array.isArray(data.data) ? data.data : []; // Ensure we get the array from the correct property
      console.log('Extracted Reviews:', reviews);

      // If reviews are still not an array, handle it gracefully
      if (!Array.isArray(reviews)) {
        throw new Error('Expected reviews to be an array');
      }

      // Extract unique restaurants
      const restaurants = Array.from(
        new Set(reviews.map(review => JSON.stringify(review.restaurant)))
      ).map(item => JSON.parse(item));

      // Log the unique restaurants
      console.log('Unique Restaurants:', restaurants);

      // Calculate total reviews and average rating
      const totalReviews = reviews.length;
      const averageRating = (
        reviews.reduce((sum, review) => sum + review.stars, 0) / totalReviews
      ).toFixed(1);

      const growthPercentage = 5; // Example static value, update as needed

      // Commit the extracted data
      commit('SET_REVIEWS', reviews);
      commit('SET_TOTAL_REVIEWS', totalReviews);
      commit('SET_AVERAGE_RATING', averageRating);
      commit('SET_GROWTH_PERCENTAGE', growthPercentage);
      commit('SET_RESTAURANTS', restaurants);

    } catch (error) {
      console.error('Error fetching reviews and restaurants:', error); // Log the error
      commit('SET_ERROR', 'Failed to fetch reviews and restaurants');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  filterReviews({ commit, state }) {
    if (state.selectedRestaurant) {
      const filtered = state.reviews.filter(
        review => review.restaurant.name === state.selectedRestaurant
      );
      commit('SET_FILTERED_REVIEWS', filtered);
    } else {
      commit('SET_FILTERED_REVIEWS', state.reviews);
    }
  },

  setSelectedRestaurant({ commit, dispatch }, restaurant) {
    commit('SET_SELECTED_RESTAURANT', restaurant);
    dispatch('filterReviews');
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