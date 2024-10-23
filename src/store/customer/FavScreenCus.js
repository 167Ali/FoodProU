import favService from '../../Services/customer/FavScreen';

const favoriteStore = {
  namespaced: true,
  state: {
    favoriteRestaurants: []
  },
  mutations: {
    setFavoriteRestaurants(state, favoriteRestaurants) {
      state.favoriteRestaurants = favoriteRestaurants;
    }
  },
  actions: {
    async getFavoriteRestaurants({ commit }) {
      try {
        const response = await favService.getFavoriteRestaurants();
        console.log('API Response:', response.data); // Log the entire response
        if (response.data && response.data.data) {
          commit('setFavoriteRestaurants', response.data.data);
        } else {
          console.error('Data is not in expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
      }
    }
  }
  
};

export default favoriteStore;
