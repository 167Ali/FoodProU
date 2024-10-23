import { fetchRestaurants } from '@/Services/admin/RestaurantsDataService';

const state = {
  restaurants: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async loadRestaurants({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const data = await fetchRestaurants();
      commit('SET_RESTAURANTS', data.data);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  getRestaurants(state) {
    return state.restaurants;
  },
  isLoading(state) {
    return state.loading;
  },
  getError(state) {
    return state.error;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
