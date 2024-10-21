import favService from '../../Services/customer/FavScreen';
import restaurantService from '../../Services/customer/FavScreen'; // Assuming we'll create this service for fetching menus

const favoriteStore = {
  namespaced: true,
  state: {
    favoriteRestaurants: [],
    selectedRestaurantMenu: null, // New state to store the menu of the selected restaurant
  },
  mutations: {
    setFavoriteRestaurants(state, favoriteRestaurants) {
      state.favoriteRestaurants = favoriteRestaurants;
    },
    setSelectedRestaurantMenu(state, menu) {
      state.selectedRestaurantMenu = menu; // Mutate the state with fetched menu
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
    },
    async getRestaurantMenuById({ commit }, restaurantId) {
      try {
        const response = await restaurantService.getRestaurantMenu(restaurantId); // Use service to get the menu by ID
        console.log('Restaurant Menu Response:', response.data);
        if (response.data && response.data.data) {
          commit('setSelectedRestaurantMenu', response.data.data); // Commit the response to state
        } else {
          console.error('Menu data is not in expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching restaurant menu:', error);
      }
    }
  }
};

export default favoriteStore;
