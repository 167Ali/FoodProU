// store/modules/rewards.js
export const state = {
    totalPoints: 1000, // Default value for now
    availableRewards: [
      { id: 1, amount: 10, pointsRequired: 100 },
      { id: 2, amount: 50, pointsRequired: 500 },
      { id: 3, amount: 100, pointsRequired: 1000 },
    ],
  };
  
  export const getters = {
    totalPoints: (state) => state.totalPoints,
    availableRewards: (state) => state.availableRewards,
  };
  
  export const mutations = {
    REDEEM_POINTS(state, points) {
      state.totalPoints -= points;
    },
  };
  
  export const actions = {
    redeemReward({ commit }, points) {
      commit('REDEEM_POINTS', points);
    },
  };
  
  export const rewards = {
    namespaced: true, // Ensure namespaced is set to true
    state,
    getters,
    mutations,
    actions,
  };
  