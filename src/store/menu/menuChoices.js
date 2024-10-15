// choiceStore.js
import { choiceService } from '@/services/choiceService';

const state = {
    choices: [], // List of choices
    loading: false, // Loading state
    error: null, // Error state
};

const getters = {
    allChoices: (state) => state.choices,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
};

const actions = {
    async fetchChoices({ commit }, menuId) {
        commit('setLoading', true);
        try {
            const response = await choiceService.getChoices(menuId);
            commit('setChoices', response.data);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async createChoice({ commit, dispatch }, { menuId, choiceData }) {
        commit('setLoading', true);
        try {
            await choiceService.createChoice(menuId, choiceData);
            // Refetch the updated list of choices
            dispatch('fetchChoices', menuId);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async updateChoice({ commit, dispatch }, { menuId, choiceId, choiceData }) {
        commit('setLoading', true);
        try {
            await choiceService.updateChoice(menuId, choiceId, choiceData);
            // Refetch the updated list of choices
            dispatch('fetchChoices', menuId);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async deleteChoice({ commit, dispatch }, { menuId, choiceId }) {
        commit('setLoading', true);
        try {
            await choiceService.deleteChoice(menuId, choiceId);
            // Refetch the updated list of choices
            dispatch('fetchChoices', menuId);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },
};

const mutations = {
    setChoices(state, choices) {
        state.choices = choices;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
